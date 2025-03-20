#!/usr/bin/env python3
import ftplib
import logging
import sys
import os

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger(__name__)

def create_ftp_directories():
    """Create missing directories on FTP server"""
    try:
        # Get credentials from environment variables
        host = os.environ.get("CQIL_FTP_HOST", "ftp.expecting.ca")
        username = os.environ.get("CQIL_FTP_USERNAME", "")
        password = os.environ.get("CQIL_FTP_PASSWORD", "")
        
        # Check if credentials are provided
        if not username or not password:
            logger.error("Missing FTP credentials. Please set CQIL_FTP_USERNAME and CQIL_FTP_PASSWORD environment variables.")
            return False
            
        # Connect to FTP
        logger.info("Connecting to FTP server...")
        ftp = ftplib.FTP(host, timeout=30)
        ftp.login(username, password)
        logger.info("Connected successfully")
        
        # Navigate to website directory
        ftp.cwd('/public_html/cqil.ca')
        logger.info("Changed to website directory")
        
        # Create directories if they don't exist
        dirs_to_create = ['docs', 'hosting']
        
        for dir_name in dirs_to_create:
            try:
                ftp.mkd(dir_name)
                logger.info(f"Created directory: {dir_name}")
            except Exception as e:
                logger.info(f"Directory {dir_name} already exists or couldn't be created: {str(e)}")
        
        # Close connection
        ftp.quit()
        logger.info("FTP connection closed")
        return True
    except Exception as e:
        logger.error(f"Error creating directories: {str(e)}")
        return False

if __name__ == "__main__":
    print("\n=== Creating Missing Directories on CQIL Website ===\n")
    if create_ftp_directories():
        print("\n✅ Directories created successfully!")
    else:
        print("\n❌ Failed to create directories. Check the logs for details.")
        sys.exit(1)