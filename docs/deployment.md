# Deployment Guide — Portfolio

## Architecture

```
Internet ──→ Cloudflare (proxied) ──→ Oracle Cloud VM (146.235.193.6)
                                          │
                                          ├── system Nginx (ports 80/443)
                                          │   ├── portfolio (default_server)
                                          │   │   ├── serves static Angular files
                                          │   │   └── proxies /api → localhost:8080
                                          │   └── bill-splitter (proxy to 127.0.0.1:3443)
                                          │
                                          ├── portfolio-backend.service (port 8080)
                                          │   └── Spring Boot JAR
                                          │
                                          └── Docker
                                              └── portfolio-mysql (port 3307→3306)
```

### Components

| Component | Type | Port | Location |
|-----------|------|------|----------|
| Frontend | Angular 18 SPA (static files) | 80/443 (Nginx) | `/home/ubuntu/portfolio/frontend/dist/browser/` |
| Backend | Spring Boot JAR (systemd) | 8080 | `/home/ubuntu/portfolio/backend/app.jar` |
| Database | MySQL 8.0 (Docker) | 3307 (host) → 3306 (container) | Docker container `portfolio-mysql` |
| Nginx | System package (not Docker) | 80/443 | `/etc/nginx/sites-available/portfolio` |

### Other Services on this VM

| Project | Type | Ports |
|---------|------|-------|
| Bill-Splitter | Docker (nginx) | 3000/3443 internal |
| Bill-Splitter API | Docker compose | 8081 |
| Bill-Splitter DB | Docker MySQL | 3306 |

---

## 1. VM Provisioning (Oracle Cloud Free Tier)

### Create Instance
1. Login to [Oracle Cloud Console](https://cloud.oracle.com)
2. Create a VM instance: **VM.Standard.A1.Flex** (Ampere, 4 OCPUs, 24GB RAM) or **VM.Standard.E2.1.Micro** (AMD, 1 OCPU, 1GB RAM) — free tier eligible
3. OS: **Ubuntu 24.04 LTS**
4. Download the SSH private key (`.key` file)
5. Open ports in security list: **80, 443, 3307** (optional for remote DB access)

### First SSH
```bash
chmod 600 ~/Downloads/ssh-key-2026-05-07.key
ssh -i ~/Downloads/ssh-key-2026-05-07.key ubuntu@146.235.193.6
```

### Install Dependencies
```bash
sudo apt update
sudo apt install -y nginx docker.io docker-compose-v2 openjdk-17-jdk maven certbot python3-certbot-nginx
sudo systemctl enable --now nginx docker
sudo usermod -aG docker ubuntu
# Log out and back in for docker group to take effect
```

---

## 2. Domain & DNS (Cloudflare)

1. Add `pravatk.com.np` to Cloudflare (if not already)
2. Update nameservers at your registrar to:
   - `kipp.ns.cloudflare.com`
   - `hattie.ns.cloudflare.com`
3. Create DNS records:

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| A | `@` | `146.235.193.6` | Proxied (orange cloud) |

> **Note**: Cloudflare proxy hides your real IP and provides DDoS protection, but content won't update immediately after changes — purge the cache via Cloudflare Dashboard → Caching → Purge Everything.

### Verification
```bash
curl -I https://pravatk.com.np
# Should return 200 OK
```

---

## 3. Nginx Configuration

System Nginx serves the portfolio as the default server on ports 80 and 443.

### Config File (`/etc/nginx/sites-available/portfolio`)
```nginx
server {
    listen 80 default_server;
    listen 443 ssl default_server;
    server_name pravatk.com.np www.pravatk.com.np;

    # Self-signed certs (for HTTPS default_server)
    ssl_certificate /etc/nginx/ssl/self-signed.crt;
    ssl_certificate_key /etc/nginx/ssl/self-signed.key;

    root /home/ubuntu/portfolio/frontend/dist/browser;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    client_max_body_size 10M;
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    gzip_min_length 256;
}
```

### Enabling & Reloading
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/ 2>/dev/null
sudo nginx -t && sudo systemctl reload nginx
```

### Bill-Splitter Proxy (separate project)
The bill-splitter project runs on Docker (ports 3000/3443 internal) and is proxied via:
```nginx
# /etc/nginx/sites-available/bill-splitter
location / {
    proxy_pass https://127.0.0.1:3443;
    proxy_ssl_verify off;
    ...
}
```

---

## 4. Backend Deployment (systemd)

### Service Unit (`/etc/systemd/system/portfolio-backend.service`)
```ini
[Unit]
Description=Portfolio Backend
After=network.target mysql.service

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/portfolio/backend
ExecStart=/usr/bin/java -jar /home/ubuntu/portfolio/backend/app.jar
Environment="SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3307/portfolio_db?..."
Environment="SPRING_DATASOURCE_USERNAME=root"
Environment="SPRING_DATASOURCE_PASSWORD=<your-password>"
Environment="GITHUB_USERNAME=ptimsina1127"
Environment="GITHUB_SYNC_CRON=0 0 0 */3 * ?"
Environment="GITHUB_SYNC_ON_STARTUP=true"
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### Management
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio-backend
sudo systemctl status portfolio-backend
sudo journalctl -u portfolio-backend -f   # live logs
```

### Redeploy Backend
```bash
# On local machine: build & copy
cd backend && mvn clean package -DskipTests
scp target/*.jar ubuntu@146.235.193.6:~/portfolio/backend/app.jar

# On VM: restart service
sudo systemctl restart portfolio-backend
```

---

## 5. Frontend Deployment

### Build
```bash
cd frontend
npm install
npm run build
# Output: frontend/dist/browser/
```

### Deploy
```bash
# SCP to VM
scp -r frontend/dist/browser/* ubuntu@146.235.193.6:~/portfolio/frontend/dist/browser/
```

### Or use deploy.sh
```bash
./deploy/deploy.sh 146.235.193.6
```
This builds both frontend and backend, uploads everything to the VM, installs/restarts the systemd service, and reloads Nginx.

---

## 6. Database Setup

### Local Development (Docker)
```bash
docker run -d --name portfolio-mysql \
  -e MYSQL_ROOT_PASSWORD=<your-password> \
  -e MYSQL_DATABASE=portfolio_db \
  -e MYSQL_USER=portfolio \
  -e MYSQL_PASSWORD=<your-password> \
  -p 3306:3306 \
  mysql:8.0
```

### VM Production (Docker, port 3307)
On the VM, MySQL runs in Docker but on port 3307 (to avoid conflict with bill-splitter's MySQL on 3306):
```bash
docker run -d --name portfolio-mysql \
  -e MYSQL_ROOT_PASSWORD=<your-password> \
  -e MYSQL_DATABASE=portfolio_db \
  -e MYSQL_USER=portfolio \
  -e MYSQL_PASSWORD=<your-password> \
  -p 3307:3306 \
  mysql:8.0
```

The systemd service overrides `SPRING_DATASOURCE_URL` to use port 3307.

### Remote DB Access (MySQL Workbench)
Using SSH tunnel:
- Connection Method: Standard TCP/IP over SSH
- SSH Hostname: `146.235.193.6`
- SSH Username: `ubuntu`
- SSH Key: path to your `.key` file
- MySQL Hostname: `127.0.0.1`
- MySQL Port: `3307`
- Username: `workbench` (dedicated remote user)
- Database: `portfolio_db`

---

## 7. Secrets Management

All secrets are **excluded from Git** via `.gitignore`:

| File | Purpose | Git Status |
|------|---------|------------|
| `backend/src/main/resources/application.properties` | Local DB password + config | Ignored |
| `AGENTS.local.md` | Full personal ops reference with secrets | Ignored |
| `.env` | Environment variables for local dev | Ignored |

### Where to Keep Secrets

1. **Local dev**: `backend/src/main/resources/application.properties` (copy from `.example`, fill in real values)
2. **VM**: Edit `/etc/systemd/system/portfolio-backend.service` with real passwords
3. **Docker**: Edit `docker-compose.yml` `CHANGE_ME` values locally before `docker compose up`
4. **Personal reference**: `AGENTS.local.md` (create from template, never commit)

### `.env.example` (repo root)
```
MYSQL_ROOT_PASSWORD=CHANGE_ME
MYSQL_PASSWORD=CHANGE_ME
SPRING_DATASOURCE_PASSWORD=CHANGE_ME
SPRING_DATASOURCE_USERNAME=root
GITHUB_USERNAME=ptimsina1127
VM_IP=146.235.193.6
SSH_KEY_PATH=~/Downloads/ssh-key-2026-05-07.key
```

---

## 8. Cloudflare Cache

Since Cloudflare proxying is enabled (orange cloud), static file changes (favicon, OG image, JS/CSS bundles) are cached by Cloudflare. After deployment:

1. Go to **Cloudflare Dashboard** → **Caching** → **Purge Everything**
2. Or use the API:
```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/purge_cache" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

---

## 9. Maintenance Commands

### Backend
```bash
sudo systemctl status portfolio-backend    # Check status
sudo systemctl restart portfolio-backend   # Restart
sudo journalctl -u portfolio-backend -f    # Live logs
```

### Frontend
```bash
# Rebuild & redeploy
cd /home/ubuntu/portfolio/frontend && npm run build
# Then SCP the dist/ to VM (or use deploy.sh)
```

### Nginx
```bash
sudo nginx -t                              # Test config
sudo systemctl reload nginx                # Reload
sudo tail -f /var/log/nginx/access.log     # Access logs
```

### MySQL
```bash
sudo docker exec portfolio-mysql mysql -uroot -p<password> -e "SHOW DATABASES;"
sudo docker exec portfolio-mysql mysql -uroot -p<password> -e "SELECT * FROM portfolio_db.contact_messages;"
```

### Docker
```bash
sudo docker ps                             # Running containers
sudo docker logs portfolio-mysql           # MySQL logs
sudo docker restart portfolio-mysql        # Restart MySQL
```

### Full Deploy
```bash
# From local machine:
./deploy/deploy.sh 146.235.193.6
```

### Logs
```bash
# Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Backend
sudo journalctl -u portfolio-backend -f

# MySQL
sudo docker logs -f portfolio-mysql
```

---

## 10. Troubleshooting

### "502 Bad Gateway" on /api/
Backend is down:
```bash
sudo systemctl restart portfolio-backend
sudo journalctl -u portfolio-backend -f   # Check for errors
```

### Changes not appearing on the website
1. Cloudflare cache — purge it (see section 8)
2. Browser cache — hard refresh (Ctrl+Shift+R)
3. Verify files on VM: `ls -la /home/ubuntu/portfolio/frontend/dist/browser/`

### Port conflicts
- Bill-splitter Docker containers occupy ports 3000/3443
- Portfolio backend on 8080
- Portfolio MySQL on 3307 (bill-splitter MySQL on 3306)
- If ports conflict, adjust Docker compose port mappings

### SSL/HTTPS
- Cloudflare provides SSL termination (Flexible or Full)
- The VM has self-signed certs for the Nginx `default_server` on port 443
- If using direct IP access (`http://146.235.193.6`), it's HTTP only

### Can't SSH
- Check Oracle Cloud security list — port 22 must be open
- Verify SSH key is correct and permissions are `600`
- Try from a different network (ISP may block SSH)

---

## Reference: File Locations on VM

```
/home/ubuntu/portfolio/
├── backend/
│   └── app.jar                    # Spring Boot executable
├── frontend/
│   └── dist/browser/              # Angular static files (served by Nginx)
└── docker-compose.yml             # Optional: for Docker deployment

/etc/
├── nginx/sites-available/
│   ├── portfolio                  # Portfolio Nginx config
│   └── bill-splitter              # Bill-splitter Nginx config
├── systemd/system/
│   └── portfolio-backend.service  # Backend systemd unit
└── nginx/ssl/
    ├── self-signed.crt             # Self-signed SSL cert
    └── self-signed.key             # Self-signed SSL key
```
