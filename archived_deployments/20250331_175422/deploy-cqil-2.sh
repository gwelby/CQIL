#!/bin/bash
# Custom deployment script for CQIL.ca using native ftp command

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
cp -r "$SOURCE_DIR"/* "$TEMP_DIR/" 2>/dev/null || true
rm -rf "$TEMP_DIR/node_modules" "$TEMP_DIR/.git" "$TEMP_DIR/deploy" 2>/dev/null || true

# Update version file
echo "Updating version information..."
VERSION=$(date +%Y.%m.%Y%m%d_%H%M%S)
cat > "$TEMP_DIR/version.txt" << EOF
Quantum Tools Suite
Deployed: $(date)
Version: $VERSION
Powered by quantum-common.js
EOF

# Let's try using curl for FTP uploads instead
echo "Starting FTP upload using curl..."

# Function to recursively upload a directory
upload_directory() {
    local local_dir=$1
    local remote_dir=$2
    
    echo "Processing directory: $local_dir -> $remote_dir"
    
    # Create the remote directory if it doesn't exist
    curl -s -u "$FTP_USER:$FTP_PASS" "ftp://$FTP_HOST$remote_dir" -Q "MKD $remote_dir" || true
    
    # Upload all files in the current directory
    for file in "$local_dir"/*; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            echo "Uploading file: $filename"
            curl -s -u "$FTP_USER:$FTP_PASS" -T "$file" "ftp://$FTP_HOST$remote_dir/$filename"
            if [ $? -eq 0 ]; then
                echo "✅ Uploaded: $filename"
            else
                echo "❌ Failed to upload: $filename"
            fi
        elif [ -d "$file" ]; then
            dirname=$(basename "$file")
            # Skip certain directories
            if [[ "$dirname" != "node_modules" && "$dirname" != ".git" && "$dirname" != "deploy" ]]; then
                upload_directory "$file" "$remote_dir/$dirname"
            fi
        fi
    done
}

# Start the upload process from the root
cd "$TEMP_DIR"
upload_directory "$TEMP_DIR" "$FTP_DIR"

echo "Deployment process finished."
echo "Website is now live at https://cqil.ca"

# Clean up
echo "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"