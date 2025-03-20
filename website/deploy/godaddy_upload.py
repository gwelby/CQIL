#!/usr/bin/env python3
import ftplib
import os
import sys
import yaml
import logging
from pathlib import Path
from datetime import datetime

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('godaddy_upload.log'),
        logging.StreamHandler(sys.stdout)
    ]
)

class GoDaddyUploader:
    def __init__(self, config_path='godaddy_config.yml'):
        self.config = self._load_config(config_path)
        self.logger = logging.getLogger(__name__)
        self.ftp = None

    def _load_config(self, config_path):
        """Load FTP configuration"""
        with open(config_path, 'r') as f:
            return yaml.safe_load(f)

    def connect(self):
        """Establish FTP connection to expecting.ca for cqil.ca site"""
        try:
            # Try with explicit timeout to avoid hanging
            self.ftp = ftplib.FTP(
                self.config['ftp']['host'],
                self.config['ftp']['username'],
                self.config['ftp']['password'],
                timeout=30
            )
            self.logger.info(f"Connected to {self.config['ftp']['host']}")
            
            # Navigate to cqil.ca directory within public_html
            try:
                self.ftp.cwd('/public_html')
                self.logger.info("Changed to public_html directory")
                
                # Check if cqil.ca exists, create if not
                try:
                    self.ftp.cwd('cqil.ca')
                    self.logger.info("Changed to cqil.ca directory")
                except:
                    try:
                        self.ftp.mkd('cqil.ca')
                        self.ftp.cwd('cqil.ca')
                        self.logger.info("Created and changed to cqil.ca directory")
                    except Exception as e:
                        self.logger.error(f"Could not create cqil.ca directory: {str(e)}")
                        return False
            except Exception as e:
                self.logger.error(f"Could not navigate to public_html: {str(e)}")
                return False
                
            return True
        except Exception as e:
            self.logger.error(f"Connection failed: {str(e)}")
            return False

    def backup_remote(self):
        """Create backup of current website with improved error handling"""
        try:
            # Create a backup directory with timestamp in the current directory
            backup_dir = f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            try:
                self.ftp.mkd(backup_dir)
                self.logger.info(f"Created backup directory: {backup_dir}")
            except Exception as e:
                self.logger.warning(f"Could not create backup directory: {str(e)}")
                # Continue anyway, it's not critical
            
            # Simplified backup function that only copies files in the root
            # This is safer than recursive backups which can fail
            try:
                # List all files in the current directory
                items = self.ftp.nlst()
                self.logger.info(f"Found {len(items)} items to backup")
                
                backed_up = 0
                for item in items:
                    if item in ['.', '..', backup_dir]:
                        continue
                    
                    try:
                        # Check if it's a file or directory
                        try:
                            # Try to change to the item as a directory
                            self.ftp.cwd(item)
                            # If we get here, it's a directory - skip for simplicity
                            self.ftp.cwd('..')  # Go back to parent
                            self.logger.info(f"Skipping directory: {item}")
                        except:
                            # It's a file, create a backup copy
                            with open('temp_backup_file', 'wb') as local_file:
                                self.ftp.retrbinary(f'RETR {item}', local_file.write)
                            
                            # Upload to backup directory
                            with open('temp_backup_file', 'rb') as local_file:
                                self.ftp.storbinary(f'STOR {backup_dir}/{item}', local_file)
                            
                            # Delete temp file
                            os.remove('temp_backup_file')
                            backed_up += 1
                            self.logger.info(f"Backed up file: {item}")
                    except Exception as file_e:
                        self.logger.warning(f"Could not backup item {item}: {str(file_e)}")
                
                self.logger.info(f"Backup completed: {backed_up} files backed up to {backup_dir}")
                return True
            except Exception as list_e:
                self.logger.warning(f"Could not list files for backup: {str(list_e)}")
                # Continue with upload anyway
                return True
                
        except Exception as e:
            self.logger.error(f"Backup failed: {str(e)}")
            # Continue with upload anyway
            return True

    def upload_files(self):
        """Upload website files"""
        try:
            local_dir = Path(self.config['local']['web_root'])
            
            def upload_directory(local_path, remote_path=''):
                for item in local_path.iterdir():
                    if item.name in self.config['exclude']:
                        continue
                        
                    remote_item = f"{remote_path}/{item.name}"
                    
                    if item.is_file():
                        with open(item, 'rb') as f:
                            self.ftp.storbinary(f'STOR {remote_item}', f)
                            self.logger.info(f"Uploaded {remote_item}")
                    elif item.is_dir():
                        try:
                            self.ftp.mkd(remote_item)
                        except:
                            pass  # Directory might already exist
                        upload_directory(item, remote_item)

            # Start upload from root
            upload_directory(local_dir)
            return True
        except Exception as e:
            self.logger.error(f"Upload failed: {str(e)}")
            return False

    def deploy(self):
        """Run full deployment process"""
        try:
            if not self.connect():
                return False

            steps = [
                (self.backup_remote, "Backup"),
                (self.upload_files, "Upload")
            ]

            for step_func, step_name in steps:
                self.logger.info(f"Starting {step_name} step...")
                if not step_func():
                    self.logger.error(f"{step_name} step failed")
                    return False
                self.logger.info(f"{step_name} step completed")

            self.logger.info("Deployment completed successfully")
            return True
        finally:
            if self.ftp:
                self.ftp.quit()

if __name__ == "__main__":
    uploader = GoDaddyUploader()
    if uploader.deploy():
        print("Website deployed successfully to GoDaddy!")
    else:
        print("Deployment failed! Check godaddy_upload.log for details")
        sys.exit(1)
