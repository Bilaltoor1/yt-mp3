#!/bin/bash

# Production deployment script for yttmp3.com
# Run this script on your Ubuntu VPS to set up the complete environment

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" >&2
    exit 1
}

warn() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

echo -e "${GREEN}🚀 Setting up yttmp3.com production environment...${NC}"

# Check if running as root and set variables accordingly
if [[ $EUID -eq 0 ]]; then
   echo -e "${YELLOW}⚠️  Running as root. Creating dedicated user for better security...${NC}"
   RUNNING_AS_ROOT=true
   DEPLOY_USER="yttmp3"
   PROJECT_DIR="/opt/yt-mp3"
else
   RUNNING_AS_ROOT=false
   DEPLOY_USER="$USER"
   PROJECT_DIR="/home/$USER/yt-mp3"
fi

DOMAIN="yttmp3.com"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Prompt for email if not set
echo -e "${YELLOW}📧 Enter your email for SSL certificate (Let's Encrypt):${NC}"
read -p "Email: " EMAIL
if [[ -z "$EMAIL" ]]; then
    EMAIL="admin@yttmp3.com"
    echo "Using default: $EMAIL"
fi

echo -e "${YELLOW}📋 This script will:${NC}"
echo "  • Update system packages"
echo "  • Install Docker & Docker Compose"
echo "  • Install and configure Nginx"
echo "  • Set up SSL certificates with Let's Encrypt"
echo "  • Configure firewall (UFW)"
echo "  • Create systemd service for auto-start"
echo "  • Deploy the audio/video converter"

echo ""
read -p "Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Update system
echo -e "${GREEN}📦 Updating system packages...${NC}"
apt update && apt upgrade -y

# Create dedicated user if running as root
if [[ $RUNNING_AS_ROOT == true ]]; then
    echo -e "${GREEN}👤 Creating dedicated user: $DEPLOY_USER${NC}"
    if ! id "$DEPLOY_USER" &>/dev/null; then
        useradd -m -s /bin/bash -G docker $DEPLOY_USER
        echo "$DEPLOY_USER ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/$DEPLOY_USER
    fi
fi

# Install essential packages
echo -e "${GREEN}🛠️  Installing essential packages...${NC}"
apt install -y curl wget git ufw nginx certbot python3-certbot-nginx

# Install FFmpeg with all codecs
echo -e "${GREEN}🎵 Installing FFmpeg with multimedia codecs...${NC}"
apt install -y ffmpeg libavcodec-extra

# Verify FFmpeg installation
if command -v ffmpeg &> /dev/null; then
    echo -e "${GREEN}✅ FFmpeg installed successfully${NC}"
    ffmpeg -version | head -1
    echo "Available audio codecs:"
    ffmpeg -codecs 2>/dev/null | grep -E "(mp3|aac|vorbis|flac)" | head -5
else
    echo -e "${RED}❌ FFmpeg installation failed${NC}"
fi

# Install Docker
echo -e "${GREEN}🐳 Installing Docker...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    if [[ $RUNNING_AS_ROOT == true ]]; then
        usermod -aG docker $DEPLOY_USER
    else
        usermod -aG docker $USER
    fi
    rm get-docker.sh
else
    echo "Docker already installed"
fi

# Install Docker Compose
echo -e "${GREEN}🐳 Installing Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
else
    echo "Docker Compose already installed"
fi

# Configure firewall
echo -e "${GREEN}🔒 Configuring UFW firewall...${NC}"
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

# Create project directory and copy files
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

# Set proper ownership
if [[ $RUNNING_AS_ROOT == true ]]; then
    chown -R $DEPLOY_USER:$DEPLOY_USER "$PROJECT_DIR"
fi

# Copy Nginx configuration
echo -e "${GREEN}🌐 Configuring Nginx...${NC}"
cp "$PROJECT_DIR/nginx.conf" /etc/nginx/sites-available/$DOMAIN
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Create certbot directory
mkdir -p /var/www/certbot

# Start Nginx
systemctl start nginx
systemctl enable nginx

# Get SSL certificate
echo -e "${GREEN}🔐 Setting up SSL certificate...${NC}"
echo -e "${YELLOW}Note: Make sure $DOMAIN points to this server's IP address${NC}"
read -p "Press Enter when DNS is configured..."

certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email $EMAIL

# Set up auto-renewal
systemctl enable certbot.timer

# Build and start the application
echo -e "${GREEN}🏗️  Building and starting the application...${NC}"
cd "$PROJECT_DIR"

# Ensure proper permissions
chown -R $DEPLOY_USER:$DEPLOY_USER "$PROJECT_DIR"

# Build and start Docker containers as the deploy user
if [[ $RUNNING_AS_ROOT == true ]]; then
    su - $DEPLOY_USER -c "cd $PROJECT_DIR && docker-compose build && docker-compose up -d"
else
    docker-compose build
    docker-compose up -d
fi

# Create systemd service for auto-start
echo -e "${GREEN}⚙️  Creating systemd service...${NC}"
tee /etc/systemd/system/yttmp3.service > /dev/null <<EOF
[Unit]
Description=Audio/Video Converter
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$PROJECT_DIR
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0
User=$DEPLOY_USER
Group=$DEPLOY_USER

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable yttmp3.service

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
echo "• Update SSL cert: certbot renew"
echo "• Check firewall: ufw status"
if [[ $RUNNING_AS_ROOT == true ]]; then
    echo "• Switch to deploy user: su - $DEPLOY_USER"
    echo "• Deploy user home: $PROJECT_DIR"
fi

# Display final status
echo ""
echo -e "${GREEN}🚦 Service Status:${NC}"
systemctl is-active yttmp3.service || true
if [[ $RUNNING_AS_ROOT == true ]]; then
    su - $DEPLOY_USER -c "cd $PROJECT_DIR && docker-compose ps"
else
    docker-compose ps
fi