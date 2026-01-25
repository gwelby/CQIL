#!/usr/bin/env python3
import os
import sys
import ftplib
from datetime import datetime
import shutil
import tempfile

print("=== CQIL Website Deployment Script ===")
print("Starting deployment to cqil.ca...")

# Configuration
SOURCE_DIR = "/mnt/d/cqil/website_deployed"
FTP_HOST = "ftp.expecting.ca"
FTP_USER = "mig@expecting.ca"
FTP_PASS = "Zqc%TeG*WVkMvYZuIf2rGA9wMk"
FTP_DIR = "/public_html/cqil.ca"

# Create a temporary directory
temp_dir = tempfile.mkdtemp()
print(f"Creating temporary directory: {temp_dir}")

# Update version file
version = datetime.now().strftime("%Y.%m.%Y%m%d_%H%M%S")
with open(os.path.join(SOURCE_DIR, "version.txt"), "w") as f:
    f.write(f"Quantum Tools Suite\n")
    f.write(f"Deployed: {datetime.now().strftime('%a %b %d %H:%M:%S %Z %Y')}\n")
    f.write(f"Version: {version}\n")
    f.write(f"Powered by quantum-common.js\n")

print("Updated version information")

# Connect to FTP
try:
    print(f"Connecting to FTP server: {FTP_HOST}...")
    ftp = ftplib.FTP(FTP_HOST, timeout=30)
    ftp.login(FTP_USER, FTP_PASS)
    print("Connected successfully")
    
    # Navigate to the target directory
    try:
        ftp.cwd("/public_html")
        print("Changed to /public_html directory")
        
        # Check if cqil.ca directory exists
        try:
            ftp.cwd("cqil.ca")
            print("Changed to cqil.ca directory")
        except:
            # Try to create it if it doesn't exist
            ftp.mkd("cqil.ca")
            ftp.cwd("cqil.ca")
            print("Created and changed to cqil.ca directory")
    except Exception as e:
        print(f"Could not navigate to directory: {str(e)}")
        sys.exit(1)
    
    # Upload key files first (HTML and CSS)
    key_files = [
        "index.html",
        "antikythera-quantum-mechanism.html",
        "antikythera-test.html",
        "ground-state-demo.html",
        "health-check.html",
        "health.html",
        "version.txt"
    ]
    
    for filename in key_files:
        filepath = os.path.join(SOURCE_DIR, filename)
        if os.path.exists(filepath):
            print(f"Uploading {filename}...")
            with open(filepath, 'rb') as file:
                ftp.storbinary(f'STOR {filename}', file)
            print(f"✅ Uploaded {filename}")
    
    # Upload CSS files
    print("Uploading CSS files...")
    css_dir = os.path.join(SOURCE_DIR, "css")
    if os.path.exists(css_dir):
        # Create css directory if it doesn't exist
        try:
            ftp.cwd("css")
        except:
            ftp.mkd("css")
            ftp.cwd("css")
            print("Created css directory")
        
        # Upload CSS files
        for filename in os.listdir(css_dir):
            filepath = os.path.join(css_dir, filename)
            if os.path.isfile(filepath) and filename.endswith(".css"):
                print(f"Uploading css/{filename}...")
                with open(filepath, 'rb') as file:
                    ftp.storbinary(f'STOR {filename}', file)
                print(f"✅ Uploaded css/{filename}")
        
        # Go back to parent directory
        ftp.cwd("..")
    
    # Upload JS files (core files only)
    print("Uploading JS files...")
    js_dir = os.path.join(SOURCE_DIR, "js")
    if os.path.exists(js_dir):
        # Create js directory if it doesn't exist
        try:
            ftp.cwd("js")
        except:
            ftp.mkd("js")
            ftp.cwd("js")
            print("Created js directory")
        
        # Upload core JS files (not all subdirectories)
        for filename in os.listdir(js_dir):
            filepath = os.path.join(js_dir, filename)
            if os.path.isfile(filepath) and filename.endswith(".js"):
                print(f"Uploading js/{filename}...")
                with open(filepath, 'rb') as file:
                    ftp.storbinary(f'STOR {filename}', file)
                print(f"✅ Uploaded js/{filename}")
        
        # Go back to parent directory
        ftp.cwd("..")
    
    # Upload pages directory
    print("Uploading pages...")
    pages_dir = os.path.join(SOURCE_DIR, "pages")
    if os.path.exists(pages_dir):
        # Create pages directory if it doesn't exist
        try:
            ftp.cwd("pages")
        except:
            ftp.mkd("pages")
            ftp.cwd("pages")
            print("Created pages directory")
        
        # Upload pages
        for filename in os.listdir(pages_dir):
            filepath = os.path.join(pages_dir, filename)
            if os.path.isfile(filepath) and filename.endswith(".html"):
                print(f"Uploading pages/{filename}...")
                with open(filepath, 'rb') as file:
                    ftp.storbinary(f'STOR {filename}', file)
                print(f"✅ Uploaded pages/{filename}")
        
        # Go back to parent directory
        ftp.cwd("..")
    
    print("\n✅ Deployment completed successfully!")
    print("Website is now live at https://cqil.ca")
    
    # Close the FTP connection
    ftp.quit()
    
except Exception as e:
    print(f"❌ Deployment error: {str(e)}")
    sys.exit(1)

# Clean up
print("Cleaning up...")
try:
    shutil.rmtree(temp_dir)
except:
    pass