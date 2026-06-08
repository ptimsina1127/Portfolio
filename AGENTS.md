# Portfolio Project — Session Reference

## Infrastructure
- **Server**: Oracle Cloud free tier (146.235.193.6, Ubuntu 24.04)
- **Domain**: `pravatk.com.np` → Cloudflare (proxied, orange cloud)
- **Other domain**: `khoipaisa.duckdns.org` (bill-splitter project)

## DNS
- Nameservers: `kipp.ns.cloudflare.com` / `hattie.ns.cloudflare.com`
- A record: `pravatk.com.np` → `146.235.193.6` (proxied through Cloudflare)
- Alternative access: `http://146.235.193.6` (raw IP, always works)

## Architecture

### Portfolio (this repo)
| Component | Location | Port |
|-----------|----------|------|
| Frontend (Angular) | Nginx serves `/home/ubuntu/portfolio/frontend/dist/browser/` | 80/443 (system Nginx) |
| Backend (Spring Boot) | systemd service `portfolio-backend.service` | 8080 |
| Database (MySQL) | Docker container `portfolio-mysql` | 3307 (host) → 3306 (container) |

### Bill-Splitter (separate project)
| Component | Location | Port |
|-----------|----------|------|
| Frontend | Docker container (nginx) | 3000/3443 (internal) |
| Backend | Docker compose | 8081 |
| Database | Docker MySQL | 3306 |

### Nginx (system, not Docker)
- Configs: `/etc/nginx/sites-available/{portfolio, bill-splitter}`
- Portfolio is `default_server` on ports 80 and 443 (self-signed SSL)
- Bill-splitter proxied to `https://127.0.0.1:3443` with `proxy_ssl_verify off;`

## Recent Changes Made
1. Added `pravatk.com.np` domain support (CORS + Nginx server_name)
2. Set up Cloudflare DNS proxying
3. Fixed HTTPS default_server on port 443 (self-signed cert)
4. Committed & pushed all changes to GitHub
5. Reverted application.properties to port 3306 (local dev default)
6. Added placeholder resume PDF, then uploaded real resume
7. Created `workbench` MySQL user for remote DB access

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
