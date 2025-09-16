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

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   error "This script should not be run as root for security reasons"
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Update system
log "Updating system packages..."
sudo apt-get update && sudo apt-get upgrade -y

# Install essential packages
log "Installing essential packages..."
sudo apt-get install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Install Docker if not present
if ! command_exists docker; then
    log "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    info "Docker installed. You may need to log out and back in for group changes to take effect."
else
    log "Docker is already installed"
fi

# Install Docker Compose if not present
if ! command_exists docker-compose; then
    log "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    log "Docker Compose is already installed"
fi

# Install FFmpeg (backup if Docker container fails)
if ! command_exists ffmpeg; then
    log "Installing FFmpeg..."
    sudo apt-get install -y ffmpeg
else
    log "FFmpeg is already installed"
fi

# Install Node.js and npm (for local development)
if ! command_exists node; then
    log "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    log "Node.js is already installed"
fi

# Install nginx (reverse proxy)
if ! command_exists nginx; then
    log "Installing Nginx..."
    sudo apt-get install -y nginx
    sudo systemctl enable nginx
else
    log "Nginx is already installed"
fi

# Create necessary directories
log "Creating directories..."
sudo mkdir -p /var/www/yttmp3.com
sudo mkdir -p /var/log/yttmp3
sudo mkdir -p /etc/nginx/sites-available
sudo mkdir -p /etc/nginx/sites-enabled

# Set up firewall
log "Configuring UFW firewall..."
sudo ufw --force enable
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload

# Set up environment file
if [ ! -f .env.local ]; then
    log "Creating .env.local file..."
    cp .env.example .env.local
    warn "Please edit .env.local with your production values"
fi

# Build and start the application
log "Building Docker images..."
docker-compose build

log "Starting services..."
docker-compose up -d

# Wait for services to be ready
log "Waiting for services to be ready..."
sleep 30

# Test the application
if curl -f -s http://localhost:3000/api/health > /dev/null; then
    log "✅ Application is running successfully!"
    log "🌐 Access your application at: http://localhost:3000"
else
    error "❌ Application health check failed. Check the logs with: docker-compose logs"
fi

# Display useful information
echo -e "\n${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "\n${BLUE}Useful commands:${NC}"
echo -e "  📊 View logs:           docker-compose logs -f"
echo -e "  🔄 Restart services:    docker-compose restart"
echo -e "  🛑 Stop services:       docker-compose down"
echo -e "  📈 View status:         docker-compose ps"
echo -e "  🔍 Health check:        curl http://localhost:3000/api/health"

echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "  1. Configure your domain DNS to point to this server"
echo -e "  2. Set up SSL certificate using certbot"
echo -e "  3. Configure Nginx reverse proxy for production"
echo -e "  4. Set up monitoring and logging"
echo -e "  5. Configure automated backups"

log "Setup complete! 🚀"

# Check if running as root and configure accordingly
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
echo "  • Deploy the YouTube MP3 converter"
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