#!/bin/bash
set -e

DOMAIN="pravatk.com.np"

echo "=== One-time VM Setup Script ==="
echo "Run this on your Oracle Cloud VM before deploying."

# 1. System packages
echo ""
echo "[1/4] Installing system packages..."
sudo apt update
sudo apt install openjdk-17-jdk maven certbot python3-certbot-nginx -y

# 2. Create MySQL database
echo ""
echo "[2/4] Setting up MySQL database..."
sudo mysql << 'SQL'
CREATE DATABASE IF NOT EXISTS portfolio_db;
CREATE USER IF NOT EXISTS 'portfolio'@'localhost' IDENTIFIED BY 'CHANGE_ME';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio'@'localhost';
FLUSH PRIVILEGES;
SQL

# 3. Create directory structure
echo ""
echo "[3/4] Creating directories..."
mkdir -p ~/portfolio/backend ~/portfolio/frontend

# 4. Print next steps
echo ""
echo "[4/4] VM setup complete!"
echo ""
echo "=== Next Steps ==="
echo "1. Point your DNS A record for $DOMAIN to this VM's public IP"
echo "2. From your local machine, run: ./deploy.sh <THIS_VM_IP>"
echo "3. After deployment, enable HTTPS:"
echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
echo "VM IP: $(curl -s ifconfig.me || hostname -I | awk '{print $1}')"
