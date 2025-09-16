#!/bin/bash

# Production deployment script for yttmp3.com
# Run this script on your Ubuntu VPS to set up the complete environment

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Setting up yttmp3.com production environment...${NC}"

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   echo -e "${RED}❌ Don't run this script as root. Run as your regular user with sudo access.${NC}"
   exit 1
fi

DOMAIN="yttmp3.com"
EMAIL="your-email@example.com"  # Change this to your email
PROJECT_DIR="/home/$USER/yt-mp3"

echo -e "${YELLOW}📋 This script will:${NC}"
echo "  • Update system packages"
echo "  • Install Docker & Docker Compose"
echo "  • Install and configure Nginx"
echo "  • Set up SSL certificates with Let's Encrypt"
echo "  • Configure firewall (UFW)"
echo "  • Create systemd service for auto-start"
echo "  • Deploy the YouTube MP3 converter"
echo ""
read -p "Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Update system
echo -e "${GREEN}📦 Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

# Install essential packages
echo -e "${GREEN}🛠️  Installing essential packages...${NC}"
sudo apt install -y curl wget git ufw nginx certbot python3-certbot-nginx

# Install Docker
echo -e "${GREEN}🐳 Installing Docker...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
else
    echo "Docker already installed"
fi

# Install Docker Compose
echo -e "${GREEN}🐳 Installing Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo "Docker Compose already installed"
fi

# Configure firewall
echo -e "${GREEN}🔒 Configuring UFW firewall...${NC}"
sudo ufw --force reset
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Create project directory and clone/copy files
echo -e "${GREEN}📁 Setting up project directory...${NC}"
if [ ! -d "$PROJECT_DIR" ]; then
    mkdir -p "$PROJECT_DIR"
fi

# If running from the project directory, copy files
if [ -f "docker-compose.yml" ]; then
    echo "Copying project files..."
    cp -r . "$PROJECT_DIR/"
else
    echo -e "${YELLOW}⚠️  Make sure to copy your project files to $PROJECT_DIR${NC}"
fi

# Copy Nginx configuration
echo -e "${GREEN}🌐 Configuring Nginx...${NC}"
sudo cp "$PROJECT_DIR/nginx.conf" /etc/nginx/sites-available/$DOMAIN
sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Create certbot directory
sudo mkdir -p /var/www/certbot

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Get SSL certificate
echo -e "${GREEN}🔐 Setting up SSL certificate...${NC}"
echo -e "${YELLOW}Note: Make sure $DOMAIN points to this server's IP address${NC}"
read -p "Press Enter when DNS is configured..."

sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email $EMAIL

# Set up auto-renewal
sudo systemctl enable certbot.timer

# Build and start the application
echo -e "${GREEN}🏗️  Building and starting the application...${NC}"
cd "$PROJECT_DIR"

# Ensure proper permissions
sudo chown -R $USER:$USER "$PROJECT_DIR"

# Build and start Docker containers
docker-compose build
docker-compose up -d

# Create systemd service for auto-start
echo -e "${GREEN}⚙️  Creating systemd service...${NC}"
sudo tee /etc/systemd/system/yttmp3.service > /dev/null <<EOF
[Unit]
Description=YouTube MP3 Converter
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$PROJECT_DIR
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0
User=$USER
Group=$USER

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable yttmp3.service

# Test the application
echo -e "${GREEN}🧪 Testing the application...${NC}"
sleep 5

if curl -f -s http://localhost:3000 > /dev/null; then
    echo -e "${GREEN}✅ Application is running locally${NC}"
else
    echo -e "${RED}❌ Application health check failed${NC}"
    echo "Check logs with: docker-compose logs"
fi

if curl -f -s https://$DOMAIN > /dev/null; then
    echo -e "${GREEN}✅ HTTPS is working${NC}"
else
    echo -e "${YELLOW}⚠️  HTTPS may need a few minutes to propagate${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Visit https://$DOMAIN to test your application"
echo "2. Monitor logs: docker-compose logs -f"
echo "3. Check Nginx logs: sudo tail -f /var/log/nginx/$DOMAIN.error.log"
echo "4. Restart service: sudo systemctl restart yttmp3"
echo ""
echo -e "${GREEN}🔧 Useful commands:${NC}"
echo "• Restart containers: cd $PROJECT_DIR && docker-compose restart"
echo "• View application logs: cd $PROJECT_DIR && docker-compose logs -f"
echo "• Update SSL cert: sudo certbot renew"
echo "• Check firewall: sudo ufw status"

# Display final status
echo ""
echo -e "${GREEN}🚦 Service Status:${NC}"
sudo systemctl is-active yttmp3.service || true
docker-compose ps