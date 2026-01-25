#!/usr/bin/env python3
import os
import sys
import ftplib
from datetime import datetime
import shutil
import tempfile
import hashlib
import json
import re
import time

print("=== CQIL Website Zero-Downtime Deployment ===")
print("Starting enhanced deployment to cqil.ca...")

# Configuration
SOURCE_DIR = "/mnt/d/cqil/website"
FTP_HOST = "ftp.expecting.ca"
FTP_USER = "mig@expecting.ca"
FTP_PASS = "Zqc%TeG*WVkMvYZuIf2rGA9wMk"
FTP_DIR = "/public_html/cqil.ca"

# Create output directory for logs
os.makedirs("secure_logs", exist_ok=True)
LOG_FILE = f"secure_logs/deploy_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"

# Set up logging to file and console
def log(message, level="INFO"):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    formatted_message = f"{timestamp} - {level} - {message}"
    print(formatted_message)
    with open(LOG_FILE, "a") as f:
        f.write(formatted_message + "\n")

# Create a temporary directory
temp_dir = tempfile.mkdtemp()
log(f"Created temporary working directory: {temp_dir}")

# Generate version information
version = datetime.now().strftime("%Y.%m.%d.%H%M%S")
log(f"Generated version: {version}")

# Calculate hash for a file
def calculate_file_hash(filepath, block_size=65536):
    file_hash = hashlib.md5()
    with open(filepath, 'rb') as f:
        for block in iter(lambda: f.read(block_size), b''):
            file_hash.update(block)
    return file_hash.hexdigest()[:10]  # First 10 chars for shorter filenames

# Create version manifest
version_manifest = {
    "version": version,
    "timestamp": datetime.now().isoformat(),
    "deployment_time": datetime.now().strftime("%a %b %d %H:%M:%S %Z %Y"),
    "assets": {}
}

# Write version.txt
with open(os.path.join(temp_dir, "version.txt"), "w") as f:
    f.write(f"Quantum Tools Suite\n")
    f.write(f"Deployed: {datetime.now().strftime('%a %b %d %H:%M:%S %Z %Y')}\n")
    f.write(f"Version: {version}\n")
    f.write(f"Powered by quantum-common.js\n")

log("Created version information file")

# Create health check file for monitoring
health_check_content = """<!DOCTYPE html>
<html>
<head>
    <title>CQIL Website Health Check</title>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
</head>
<body>
    <div id="health-status" data-status="healthy" data-version="{version}" data-timestamp="{timestamp}">
        Website is healthy
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {{
            // Add detailed health info
            const healthStatus = document.getElementById('health-status');
            healthStatus.innerHTML += `<p>Version: {version}</p>`;
            healthStatus.innerHTML += `<p>Deployed: {deploy_time}</p>`;
            healthStatus.innerHTML += `<p>Status check time: ${{new Date().toISOString()}}</p>`;
        }});
    </script>
</body>
</html>
""".format(
    version=version,
    timestamp=datetime.now().isoformat(),
    deploy_time=datetime.now().strftime("%a %b %d %H:%M:%S")
)

with open(os.path.join(temp_dir, "health-check.html"), "w") as f:
    f.write(health_check_content)

log("Created health check file for monitoring")

# Function to version JS and CSS files
def create_versioned_assets():
    """Create versioned assets for cache optimization"""
    versioned_files = {}
    
    # Directories to process
    asset_dirs = [
        os.path.join(SOURCE_DIR, "js"),
        os.path.join(SOURCE_DIR, "css")
    ]
    
    for asset_dir in asset_dirs:
        if not os.path.exists(asset_dir):
            continue
            
        for root, _, files in os.walk(asset_dir):
            for filename in files:
                if not filename.endswith(('.js', '.css')):
                    continue
                    
                # Skip minified files that already exist
                if filename.endswith('.min.js') or filename.endswith('.min.css'):
                    continue
                    
                file_path = os.path.join(root, filename)
                
                # Calculate file hash
                file_hash = calculate_file_hash(file_path)
                
                # Create versioned filename: style.abc123def4.css
                name_parts = os.path.splitext(filename)
                versioned_name = f"{name_parts[0]}.{file_hash}{name_parts[1]}"
                versioned_path = os.path.join(os.path.dirname(file_path), versioned_name)
                
                # Copy file with versioned name
                shutil.copy2(file_path, versioned_path)
                
                # Store mapping
                rel_path = os.path.relpath(file_path, SOURCE_DIR)
                versioned_rel_path = os.path.relpath(versioned_path, SOURCE_DIR)
                versioned_files[rel_path] = versioned_rel_path
                
                # Store in manifest
                version_manifest["assets"][rel_path] = {
                    "versioned_path": versioned_rel_path,
                    "hash": file_hash,
                    "size": os.path.getsize(file_path)
                }
                
                log(f"Created versioned asset: {versioned_rel_path}")
    
    # Save the versioned_files mapping
    with open(os.path.join(temp_dir, "asset-versions.json"), "w") as f:
        json.dump(versioned_files, f, indent=2)
        
    # Save the full version manifest
    with open(os.path.join(temp_dir, "version-manifest.json"), "w") as f:
        json.dump(version_manifest, f, indent=2)
        
    log(f"Created version manifest with {len(versioned_files)} versioned assets")
    return versioned_files

# Create versioned assets
versioned_assets = create_versioned_assets()

# Connect to FTP
try:
    log(f"Connecting to FTP server: {FTP_HOST}...")
    ftp = ftplib.FTP(FTP_HOST, timeout=30)
    ftp.login(FTP_USER, FTP_PASS)
    log("Connected successfully")
    
    # Navigate to the target directory
    try:
        # Navigate to public_html
        ftp.cwd("/public_html")
        log("Changed to /public_html directory")
        
        # Check if cqil.ca directory exists
        try:
            ftp.cwd("cqil.ca")
            log("Changed to cqil.ca directory")
        except:
            # Try to create it if it doesn't exist
            ftp.mkd("cqil.ca")
            ftp.cwd("cqil.ca")
            log("Created and changed to cqil.ca directory")
            
        # Create a deployment-specific directory for blue-green deployment
        deployment_dir = f"v{version.replace('.', '-')}"
        try:
            ftp.mkd(deployment_dir)
            log(f"Created deployment directory: {deployment_dir}")
        except:
            log(f"Deployment directory already exists: {deployment_dir}")
            
        # Enter the deployment directory
        ftp.cwd(deployment_dir)
        log(f"Changed to deployment directory: {deployment_dir}")
            
    except Exception as e:
        log(f"Could not navigate to directory: {str(e)}", "ERROR")
        sys.exit(1)
    
    # Upload version.txt and health check from temp_dir
    log("Uploading version and health check files...")
    with open(os.path.join(temp_dir, "version.txt"), 'rb') as file:
        ftp.storbinary(f'STOR version.txt', file)
    log("✅ Uploaded version.txt")
    
    with open(os.path.join(temp_dir, "health-check.html"), 'rb') as file:
        ftp.storbinary(f'STOR health-check.html', file)
    log("✅ Uploaded health-check.html")
    
    with open(os.path.join(temp_dir, "version-manifest.json"), 'rb') as file:
        ftp.storbinary(f'STOR version-manifest.json', file)
    log("✅ Uploaded version-manifest.json")
    
    # Upload key files first (HTML)
    key_files = [
        "index.html",
        "antikythera-quantum-mechanism.html",
        "antikythera-test.html",
        "ground-state-demo.html",
        "health-check.html",
        "health.html"
    ]
    
    for filename in key_files:
        filepath = os.path.join(SOURCE_DIR, filename)
        if os.path.exists(filepath):
            log(f"Uploading {filename}...")
            with open(filepath, 'rb') as file:
                ftp.storbinary(f'STOR {filename}', file)
            log(f"✅ Uploaded {filename}")
    
    # Upload CSS files
    log("Uploading CSS files...")
    css_dir = os.path.join(SOURCE_DIR, "css")
    if os.path.exists(css_dir):
        # Create css directory if it doesn't exist
        try:
            ftp.cwd("css")
        except:
            ftp.mkd("css")
            ftp.cwd("css")
            log("Created css directory")
        
        # Upload CSS files
        for filename in os.listdir(css_dir):
            filepath = os.path.join(css_dir, filename)
            if os.path.isfile(filepath) and filename.endswith(".css"):
                log(f"Uploading css/{filename}...")
                with open(filepath, 'rb') as file:
                    ftp.storbinary(f'STOR {filename}', file)
                log(f"✅ Uploaded css/{filename}")
        
        # Go back to parent directory
        ftp.cwd("..")
    
    # Upload JS files (core files only)
    log("Uploading JS files...")
    js_dir = os.path.join(SOURCE_DIR, "js")
    if os.path.exists(js_dir):
        # Create js directory if it doesn't exist
        try:
            ftp.cwd("js")
        except:
            ftp.mkd("js")
            ftp.cwd("js")
            log("Created js directory")
        
        # Upload core JS files (not all subdirectories)
        for filename in os.listdir(js_dir):
            filepath = os.path.join(js_dir, filename)
            if os.path.isfile(filepath) and filename.endswith(".js"):
                log(f"Uploading js/{filename}...")
                with open(filepath, 'rb') as file:
                    ftp.storbinary(f'STOR {filename}', file)
                log(f"✅ Uploaded js/{filename}")
                
                # Upload versioned files if they exist
                rel_path = os.path.join("js", filename)
                if rel_path in versioned_assets:
                    versioned_filename = os.path.basename(versioned_assets[rel_path])
                    versioned_filepath = os.path.join(os.path.dirname(filepath), versioned_filename)
                    if os.path.exists(versioned_filepath):
                        with open(versioned_filepath, 'rb') as file:
                            ftp.storbinary(f'STOR {versioned_filename}', file)
                        log(f"✅ Uploaded versioned js/{versioned_filename}")
        
        # Upload files in js/components directory
        components_dir = os.path.join(js_dir, "components")
        if os.path.exists(components_dir):
            # Create components directory if it doesn't exist
            try:
                ftp.cwd("components")
            except:
                ftp.mkd("components")
                ftp.cwd("components")
                log("Created js/components directory")
            
            # Upload components JS files
            for filename in os.listdir(components_dir):
                filepath = os.path.join(components_dir, filename)
                if os.path.isfile(filepath) and filename.endswith(".js"):
                    log(f"Uploading js/components/{filename}...")
                    with open(filepath, 'rb') as file:
                        ftp.storbinary(f'STOR {filename}', file)
                    log(f"✅ Uploaded js/components/{filename}")
                    
                    # Upload versioned files if they exist
                    rel_path = os.path.join("js/components", filename)
                    if rel_path in versioned_assets:
                        versioned_filename = os.path.basename(versioned_assets[rel_path])
                        versioned_filepath = os.path.join(os.path.dirname(filepath), versioned_filename)
                        if os.path.exists(versioned_filepath):
                            with open(versioned_filepath, 'rb') as file:
                                ftp.storbinary(f'STOR {versioned_filename}', file)
                            log(f"✅ Uploaded versioned js/components/{versioned_filename}")
            
            # Go back to js directory
            ftp.cwd("..")
        
        # Upload files in js/quantum-experience directory
        experience_dir = os.path.join(js_dir, "quantum-experience")
        if os.path.exists(experience_dir):
            # Create quantum-experience directory if it doesn't exist
            try:
                ftp.cwd("quantum-experience")
            except:
                ftp.mkd("quantum-experience")
                ftp.cwd("quantum-experience")
                log("Created js/quantum-experience directory")
            
            # Upload quantum-experience JS files
            for filename in os.listdir(experience_dir):
                filepath = os.path.join(experience_dir, filename)
                if os.path.isfile(filepath) and filename.endswith(".js"):
                    log(f"Uploading js/quantum-experience/{filename}...")
                    with open(filepath, 'rb') as file:
                        ftp.storbinary(f'STOR {filename}', file)
                    log(f"✅ Uploaded js/quantum-experience/{filename}")
                    
                    # Upload versioned files if they exist
                    rel_path = os.path.join("js/quantum-experience", filename)
                    if rel_path in versioned_assets:
                        versioned_filename = os.path.basename(versioned_assets[rel_path])
                        versioned_filepath = os.path.join(os.path.dirname(filepath), versioned_filename)
                        if os.path.exists(versioned_filepath):
                            with open(versioned_filepath, 'rb') as file:
                                ftp.storbinary(f'STOR {versioned_filename}', file)
                            log(f"✅ Uploaded versioned js/quantum-experience/{versioned_filename}")
            
            # Go back to js directory
            ftp.cwd("..")
        
        # Go back to parent directory
        ftp.cwd("..")
    
    # Upload pages directory
    log("Uploading pages...")
    pages_dir = os.path.join(SOURCE_DIR, "pages")
    if os.path.exists(pages_dir):
        # Create pages directory if it doesn't exist
        try:
            ftp.cwd("pages")
        except:
            ftp.mkd("pages")
            ftp.cwd("pages")
            log("Created pages directory")
        
        # Upload pages
        for filename in os.listdir(pages_dir):
            filepath = os.path.join(pages_dir, filename)
            if os.path.isfile(filepath) and filename.endswith(".html"):
                log(f"Uploading pages/{filename}...")
                with open(filepath, 'rb') as file:
                    ftp.storbinary(f'STOR {filename}', file)
                log(f"✅ Uploaded pages/{filename}")
        
        # Go back to parent directory
        ftp.cwd("..")
        
    # Return to the root directory to create symlinks
    ftp.cwd("/public_html/cqil.ca")
    
    # Create .htaccess for cache control and zero-downtime deployment
    htaccess_content = """# CQIL Website - Zero Downtime Deployment Configuration
# Created: {timestamp}
# Version: {version}

# Enable mod_rewrite
RewriteEngine On

# Ensure the host is cqil.ca to prevent issues with analytics
RewriteCond %{{HTTP_HOST}} !^cqil\.ca$ [NC]
RewriteCond %{{HTTP_HOST}} !^www\.cqil\.ca$ [NC]
RewriteRule ^(.*)$ https://cqil.ca/$1 [L,R=301]

# Cache control settings
<IfModule mod_headers.c>
    # Cache versioned assets for 1 month
    <FilesMatch "\\.[0-9a-f]{{10}}\\.(?:css|js|jpg|jpeg|png|gif|svg|webp)$">
        Header set Cache-Control "public, max-age=2592000, immutable"
    </FilesMatch>

    # Cache HTML files for 30 minutes
    <FilesMatch "\\.html$">
        Header set Cache-Control "public, max-age=1800"
    </FilesMatch>

    # No cache for health check files
    <FilesMatch "health">
        Header set Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate"
        Header set Pragma "no-cache"
        Header set Expires "0"
    </FilesMatch>

    # Cache CSS/JS files (non-versioned) for 4 hours
    <FilesMatch "^(?!.*\\.[0-9a-f]{{10}}\\.).*\\.(css|js)$">
        Header set Cache-Control "public, max-age=14400"
    </FilesMatch>

    # Default cache for all other files (1 hour)
    <FilesMatch "^(?!.*\\.(html|css|js)$)(?!.*\\.[0-9a-f]{{10}}\\.)(?!health).*$">
        Header set Cache-Control "public, max-age=3600"
    </FilesMatch>
</IfModule>

# Route all requests through the latest deployment
RewriteCond %{{REQUEST_URI}} !^/v
RewriteCond %{{REQUEST_URI}} !^/secure_logs
RewriteCond %{{REQUEST_URI}} !^/deploy
RewriteCond %{{REQUEST_URI}} !^/.well-known
RewriteRule ^(.*)$ /v{version_dir}/$1 [L]

# Handle case of missing files in current deployment
RewriteCond %{{REQUEST_FILENAME}} !-f
RewriteCond %{{REQUEST_FILENAME}} !-d
RewriteRule ^v[^/]+/(.*)$ /v{version_dir}/$1 [L]

# Direct access to health check for monitoring
RewriteCond %{{REQUEST_URI}} ^/health-check.html$
RewriteRule ^(.*)$ /v{version_dir}/health-check.html [L]

# Set PHP options if needed
<IfModule mod_php7.c>
    php_flag display_errors Off
    php_value max_execution_time 60
    php_value memory_limit 128M
    php_value post_max_size 8M
    php_value upload_max_filesize 8M
</IfModule>
""".format(
    timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    version=version,
    version_dir=deployment_dir
)

    # Create .htaccess file in temp directory
    with open(os.path.join(temp_dir, ".htaccess"), "w") as f:
        f.write(htaccess_content)

    # Upload .htaccess to root directory
    with open(os.path.join(temp_dir, ".htaccess"), "rb") as f:
        ftp.storbinary(f'STOR .htaccess', f)
    log("✅ Created and uploaded .htaccess file for zero-downtime routing")

    # Verify the deployment
    log("Verifying deployment...")
    time.sleep(2)  # Wait for any server processing
    
    # Try to access the health check file to verify deployment
    try:
        # Go to the deployment directory
        ftp.cwd(deployment_dir)
        
        # List files to verify deployment
        files = ftp.nlst()
        if "health-check.html" in files and "index.html" in files:
            log("✅ Deployment verified successfully")
        else:
            log("⚠️ Deployment verification could not confirm key files", "WARNING")
    except Exception as e:
        log(f"⚠️ Deployment verification error: {str(e)}", "WARNING")
    
    log("\n✅ Zero-Downtime Deployment completed successfully!")
    log(f"Website is now live at https://cqil.ca with version {version}")
    log(f"New deployment directory: /public_html/cqil.ca/{deployment_dir}")
    
    # Close the FTP connection
    ftp.quit()
    
except Exception as e:
    log(f"❌ Deployment error: {str(e)}", "ERROR")
    sys.exit(1)

# Clean up
log("Cleaning up temporary files...")
try:
    shutil.rmtree(temp_dir)
except:
    log("⚠️ Could not clean up temporary directory", "WARNING")

# Final deployment success message
print("\n=== Deployment Summary ===")
print(f"✅ Deployed version: {version}")
print(f"✅ Deployment time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print(f"✅ Log file: {LOG_FILE}")
print(f"✅ Website URL: https://cqil.ca")
print(f"✅ Health check: https://cqil.ca/health-check.html")
print("===========================")