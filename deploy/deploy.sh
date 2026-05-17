#!/bin/bash
set -e

DOMAIN="myprojects.com.np"
VM_IP=$1

if [ -z "$VM_IP" ]; then
    echo "Usage: ./deploy.sh <VM_IP_ADDRESS>"
    echo "Example: ./deploy.sh 123.123.123.123"
    exit 1
fi

echo "=== Deploying Portfolio to $VM_IP ==="

# 1. Build frontend
echo ""
echo "[1/5] Building Angular frontend..."
cd frontend
npm run build
cd ..

# 2. Build backend
echo ""
echo "[2/5] Building Spring Boot backend..."
cd backend
mvn package -DskipTests
cd ..

# 3. Upload to VM
echo ""
echo "[3/5] Uploading to VM..."
ssh ubuntu@$VM_IP "mkdir -p ~/portfolio/backend ~/portfolio/frontend"
scp backend/target/*.jar ubuntu@$VM_IP:~/portfolio/backend/app.jar
scp -r frontend/dist/* ubuntu@$VM_IP:~/portfolio/frontend/

# 4. Setup backend service
echo ""
echo "[4/5] Setting up backend service..."
ssh ubuntu@$VM_IP << 'EOF'
    # Create systemd service
    sudo tee /etc/systemd/system/portfolio-backend.service > /dev/null << 'SERVICEEOF'
[Unit]
Description=Portfolio Backend
After=network.target mysql.service

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/portfolio/backend
ExecStart=/usr/bin/java -jar /home/ubuntu/portfolio/backend/app.jar
Environment="SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/portfolio_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true"
Environment="SPRING_DATASOURCE_USERNAME=portfolio"
Environment="SPRING_DATASOURCE_PASSWORD=CHANGE_ME"
Environment="GITHUB_USERNAME=ptimsina1127"
Environment="GITHUB_SYNC_CRON=0 0 0 */3 * ?"
Environment="GITHUB_SYNC_ON_STARTUP=true"
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
SERVICEEOF

    sudo systemctl daemon-reload
    sudo systemctl enable portfolio-backend
    sudo systemctl restart portfolio-backend
    echo "Backend service status:"
    sudo systemctl status portfolio-backend --no-pager | head -10
EOF

# 5. Setup Nginx
echo ""
echo "[5/5] Setting up Nginx..."
ssh ubuntu@$VM_IP << 'EOF'
    sudo tee /etc/nginx/sites-available/portfolio > /dev/null << 'NGINXEOF'
server {
    listen 80;
    server_name myprojects.com.np www.myprojects.com.np;

    root /home/ubuntu/portfolio/frontend/browser;
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
NGINXEOF

    # Enable site and reload
    if [ ! -f /etc/nginx/sites-enabled/portfolio ]; then
        sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
    fi
    sudo nginx -t && sudo systemctl reload nginx
EOF

echo ""
echo "=== Deployment complete! ==="
echo "Frontend: http://$DOMAIN"
echo "Backend:  http://$VM_IP:8080/api/projects"
echo ""
echo "Next: Run 'sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN' on the VM for HTTPS."
