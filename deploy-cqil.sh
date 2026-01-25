#!/bin/bash
# Custom deployment script for CQIL.ca

echo "=== CQIL Website Deployment Script ==="
echo "Starting deployment to cqil.ca..."

# Directory paths
SOURCE_DIR="/mnt/d/cqil/website_deployed"
TEMP_DIR="/tmp/cqil_deploy"

# FTP credentials
FTP_HOST="ftp.expecting.ca"
FTP_USER="mig@expecting.ca"
FTP_PASS="Zqc%TeG*WVkMvYZuIf2rGA9wMk"
FTP_DIR="/public_html/cqil.ca"

# Create temp directory
echo "Creating temporary deployment directory..."
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# Copy files to temp directory, excluding specific patterns
echo "Copying files to temporary directory (excluding node_modules and other large directories)..."
rsync -av --exclude=".git" --exclude="node_modules" --exclude="deploy" \
  --exclude="secure_logs/*.log" --exclude=".vscode" \
  "$SOURCE_DIR/" "$TEMP_DIR/"

# Update version file
echo "Updating version information..."
VERSION=$(date +%Y.%m.%Y%m%d_%H%M%S)
cat > "$TEMP_DIR/version.txt" << EOF
Quantum Tools Suite
Deployed: $(date)
Version: $VERSION
Powered by quantum-common.js
EOF

# Create deployment script
echo "Creating FTP deployment script..."
cat > "$TEMP_DIR/ftp_commands.txt" << EOF
open $FTP_HOST
user $FTP_USER $FTP_PASS
cd $FTP_DIR
lcd $TEMP_DIR
prompt
mput *
mkdir assets
cd assets
lcd assets
mput *
cd ..
mkdir components
cd components
lcd ../components
mput *
cd ..
mkdir css
cd css
lcd ../css
mput *
cd ..
mkdir js
cd js
lcd ../js
mput *
cd ..
mkdir pages
cd pages
lcd ../pages
mput *
cd ..
mkdir docs
cd docs
lcd ../docs
mput *
cd ..
quit
EOF

# Execute FTP upload
echo "Uploading files to $FTP_HOST..."
lftp -f "$TEMP_DIR/ftp_commands.txt"

if [ $? -eq 0 ]; then
  echo "✅ Deployment completed successfully!"
  echo "Website is now live at https://cqil.ca"
else
  echo "❌ Deployment failed. Please check error messages above."
fi

# Clean up
echo "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

echo "Deployment process finished."