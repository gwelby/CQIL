#!/bin/bash
# Deployment script for Quantum Tools Suite

echo "=========================================="
echo "  Quantum Tools Suite Deployment Tool"
echo "=========================================="
echo "Starting deployment at $(date)"

# Create timestamp for backup
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/mnt/d/CQIL/website/deploy/backups/${TIMESTAMP}"

# Create backup directory
mkdir -p $BACKUP_DIR
echo "Created backup directory: $BACKUP_DIR"

# Backup current deployed files
if [ -d "/mnt/d/CQIL/website_deployed" ]; then
    echo "Backing up current deployment..."
    cp -r /mnt/d/CQIL/website_deployed/* $BACKUP_DIR/
    echo "Backup completed."
else
    echo "Creating initial deployment directory structure..."
    mkdir -p /mnt/d/CQIL/website_deployed
fi

# Verify quantum-tools.css exists
if [ ! -f "/mnt/d/CQIL/website/css/quantum-tools.css" ]; then
    echo "ERROR: quantum-tools.css not found. Deployment halted."
    exit 1
fi

# Verify wave-particle-demo.js exists
if [ ! -f "/mnt/d/CQIL/website/js/wave-particle-demo.js" ]; then
    echo "ERROR: wave-particle-demo.js not found. Deployment halted."
    exit 1
fi

# Verify quantum-common.js exists
if [ ! -f "/mnt/d/CQIL/website/js/quantum-common.js" ]; then
    echo "ERROR: quantum-common.js not found. Deployment halted."
    exit 1
fi

# Create directory structure
echo "Creating directory structure..."
mkdir -p /mnt/d/CQIL/website_deployed/css
mkdir -p /mnt/d/CQIL/website_deployed/js
mkdir -p /mnt/d/CQIL/website_deployed/js/components
mkdir -p /mnt/d/CQIL/website_deployed/js/quantum-experience
mkdir -p /mnt/d/CQIL/website_deployed/pages
mkdir -p /mnt/d/CQIL/website_deployed/docs
mkdir -p /mnt/d/CQIL/website_deployed/images
mkdir -p /mnt/d/CQIL/website_deployed/assets
mkdir -p /mnt/d/CQIL/website_deployed/secure_logs

# Copy the main HTML files
echo "Copying HTML files..."
cp /mnt/d/CQIL/website/index.html /mnt/d/CQIL/website_deployed/
cp /mnt/d/CQIL/website/health.html /mnt/d/CQIL/website_deployed/ 2>/dev/null || echo "health.html not found, skipping"
cp /mnt/d/CQIL/website/health-check.html /mnt/d/CQIL/website_deployed/ 2>/dev/null || echo "health-check.html not found, skipping"

# Copy CSS files
echo "Copying CSS files..."
cp /mnt/d/CQIL/website/css/*.css /mnt/d/CQIL/website_deployed/css/

# Copy JavaScript files
echo "Copying JavaScript files..."
cp /mnt/d/CQIL/website/js/*.js /mnt/d/CQIL/website_deployed/js/

# Copy JS component files if they exist
echo "Copying JS component files..."
cp /mnt/d/CQIL/website/js/components/*.js /mnt/d/CQIL/website_deployed/js/components/ 2>/dev/null || echo "No component JS files found, skipping"

# Copy JS quantum-experience files if they exist
echo "Copying quantum-experience JS files..."
cp /mnt/d/CQIL/website/js/quantum-experience/*.js /mnt/d/CQIL/website_deployed/js/quantum-experience/ 2>/dev/null || echo "No quantum-experience JS files found, skipping"

# Copy page files
echo "Copying page files..."
cp /mnt/d/CQIL/website/pages/*.html /mnt/d/CQIL/website_deployed/pages/

# Copy documentation
echo "Copying documentation..."
cp /mnt/d/CQIL/website/docs/*.md /mnt/d/CQIL/website_deployed/docs/ 2>/dev/null || echo "No documentation files found, skipping"

# Copy images if they exist
echo "Copying images..."
cp -r /mnt/d/CQIL/website/images/* /mnt/d/CQIL/website_deployed/images/ 2>/dev/null || echo "No image files found, skipping"

# Copy assets if they exist
echo "Copying assets..."
cp -r /mnt/d/CQIL/website/assets/* /mnt/d/CQIL/website_deployed/assets/ 2>/dev/null || echo "No asset files found, skipping"

# Create deployment log
echo "Creating deployment log..."
DEPLOY_LOG="/mnt/d/CQIL/website_deployed/secure_logs/deploy_${TIMESTAMP}.log"
echo "Deployment initiated at $(date)" > $DEPLOY_LOG
echo "Files deployed:" >> $DEPLOY_LOG
find /mnt/d/CQIL/website_deployed -type f | sort >> $DEPLOY_LOG
echo "Deployment completed at $(date)" >> $DEPLOY_LOG

# Create version file
echo "Creating version file..."
VERSION_FILE="/mnt/d/CQIL/website_deployed/version.txt"
echo "Quantum Tools Suite" > $VERSION_FILE
echo "Deployed: $(date)" >> $VERSION_FILE
echo "Version: 2025.03.${TIMESTAMP}" >> $VERSION_FILE
echo "Powered by quantum-common.js" >> $VERSION_FILE

echo "=========================================="
echo "  Deployment completed successfully"
echo "  Version: 2025.03.${TIMESTAMP}"
echo "  Deployment log: $DEPLOY_LOG"
echo "=========================================="

# Open the site in a browser if possible
if command -v xdg-open &> /dev/null; then
    echo "Opening website in browser..."
    xdg-open /mnt/d/CQIL/website_deployed/index.html
elif command -v open &> /dev/null; then
    echo "Opening website in browser..."
    open /mnt/d/CQIL/website_deployed/index.html
elif command -v start &> /dev/null; then
    echo "Opening website in browser..."
    start /mnt/d/CQIL/website_deployed/index.html
else
    echo "Website deployed to: /mnt/d/CQIL/website_deployed/index.html"
    echo "Please open it manually in your browser."
fi