# Portfolio Project — Session Reference

## Infrastructure
- **Server**: Oracle Cloud free tier (192.9.251.245, Ubuntu 24.04)
- **Domain**: `pravatk.com.np` → Cloudflare (proxied, orange cloud)
- **Other domain**: `groupbillsplit.me` (bill-splitter project, also on same VM)

## DNS
- Nameservers: `kipp.ns.cloudflare.com` / `hattie.ns.cloudflare.com`
- A record: `pravatk.com.np` → `192.9.251.245` (proxied through Cloudflare)
- Alternative access: `http://192.9.251.245` (raw IP, always works)

## Architecture

### Portfolio (this repo)
| Component | Location | Port |
|-----------|----------|------|
| Frontend (Angular) | Nginx serves `/home/ubuntu/portfolio/frontend/dist/browser/` | 80/443 (system Nginx) |
| Backend (Spring Boot) | systemd service `portfolio-backend.service` | 8080 |
| Database (MySQL) | Docker container `portfolio-mysql` | 3307 (host) → 3306 (container) |

### Bill-Splitter (separate project, same VM)
| Component | Location | Port |
|-----------|----------|------|
| Frontend | Docker container | 3000 (host) → 80 (container) |
| Backend | Docker compose | 8080 (container, not exposed) |
| Database | Docker MySQL | 3306 (container) |

### Nginx (system, not Docker)
- Configs: `/etc/nginx/sites-available/{portfolio, bill-splitter}`
- Portfolio is `default_server` on ports 80 and 443 (self-signed SSL)
- Bill-splitter proxied to `http://127.0.0.1:3000`

## Recent Changes Made
1. **Deployed portfolio to new Oracle VM (192.9.251.245)**
   - Installed deps (Java 17, Maven, Docker, Nginx, certbot)
   - Started MySQL Docker on port 3307
   - Built & deployed backend (systemd) and frontend (Nginx)
   - Generated self-signed SSL certs for `listen 443 default_server`
   - Nginx serves portfolio as default_server, proxies bill-splitter to `http://127.0.0.1:3000`
2. Updated DNS: `pravatk.com.np` → `192.9.251.245`

## Key Files
- `backend/src/main/resources/application.properties` — Local dev config (port 3306)
- `deploy/portfolio-backend.service` — VM systemd service (overrides to port 3307)
- `deploy/nginx.conf` — Nginx deployment template
- `frontend/src/app/models/skill.data.ts` — Editable skills
- `frontend/src/app/models/experience.data.ts` — Editable experience

## Useful Commands
```bash
# Check backend status
sudo systemctl status portfolio-backend

# Restart backend
sudo systemctl restart portfolio-backend

# Rebuild frontend (on VM)
cd /home/ubuntu/portfolio/frontend && npm run build

# Rebuild backend (on VM)
cd /home/ubuntu/portfolio/backend && mvn clean package -DskipTests

# Reload Nginx
sudo nginx -t && sudo systemctl reload nginx

# Check logs
sudo tail -f /var/log/nginx/access.log
sudo journalctl -u portfolio-backend -f
```
