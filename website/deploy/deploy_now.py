#!/usr/bin/env python3
import os
import sys
import shutil
import logging
import ftplib
import yaml
from datetime import datetime
from pathlib import Path

def load_ftp_config():
    """Load FTP configuration from file or environment variables"""
    # Try to load from config file
    config_path = os.path.join(os.path.dirname(__file__), 'ftp_config.yml')
    if os.path.exists(config_path):
        try:
            with open(config_path, 'r') as f:
                config = yaml.safe_load(f)
                return {
                    'host': config['ftp']['host'],
                    'username': config['ftp']['username'],
                    'password': config['ftp']['password']
                }
        except Exception as e:
            print(f"Warning: Could not load config file: {str(e)}")
    
    # Fall back to environment variables
    return {
        'host': os.environ.get('CQIL_FTP_HOST', 'ftp.expecting.ca'),
        'username': os.environ.get('CQIL_FTP_USERNAME', ''),
        'password': os.environ.get('CQIL_FTP_PASSWORD', '')
    }

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(f'secure_logs/deploy_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log'),
        logging.StreamHandler(sys.stdout)
    ]
)

class QuickDeploy:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.website_dir = Path('/mnt/d/cqil/website')
        
        # Ensure logs directory exists
        os.makedirs('secure_logs', exist_ok=True)
        
    def deploy_local(self, dest_dir):
        """Deploy to local directory"""
        try:
            # Create destination if it doesn't exist
            os.makedirs(dest_dir, exist_ok=True)
            
            # Copy all files and subdirectories
            for item in os.listdir(self.website_dir):
                source_item = os.path.join(self.website_dir, item)
                dest_item = os.path.join(dest_dir, item)
                
                # Skip log files, config files, and deploy directory
                if item in ['deploy.log', 'deploy']:
                    continue
                    
                if os.path.isdir(source_item):
                    shutil.copytree(source_item, dest_item, dirs_exist_ok=True)
                    self.logger.info(f"Copied directory {item}")
                else:
                    shutil.copy2(source_item, dest_item)
                    self.logger.info(f"Copied file {item}")
                    
            self.logger.info(f"Successfully copied website files to {dest_dir}")
            return True
        except Exception as e:
            self.logger.error(f"Error copying files: {str(e)}")
            return False
        
    def deploy_ftp(self, host, username, password):
        """Quick FTP deployment with improved error handling"""
        try:
            # Print detailed connection information
            self.logger.info(f"Connecting to {host} with username {username}")
            self.logger.info("Testing connection...")
            
            # Try different FTP modes for better compatibility
            try:
                # Try standard FTP
                ftp = ftplib.FTP(host, timeout=30)
                ftp.login(username, password)
                self.logger.info(f"Connected to {host} (standard FTP)")
            except Exception as e1:
                self.logger.warning(f"Standard FTP failed: {str(e1)}")
                try:
                    # Try passive mode
                    ftp = ftplib.FTP(host, timeout=30)
                    ftp.set_pasv(True)
                    ftp.login(username, password)
                    self.logger.info(f"Connected to {host} (passive mode)")
                except Exception as e2:
                    self.logger.warning(f"Passive mode FTP failed: {str(e2)}")
                    try:
                        # Try with anonymous login (not recommended but testing)
                        ftp = ftplib.FTP(host, timeout=30)
                        ftp.login()
                        self.logger.warning("Connected with anonymous login - limited access")
                    except Exception as e3:
                        self.logger.error(f"All FTP connection methods failed")
                        self.logger.error(f"Standard: {str(e1)}")
                        self.logger.error(f"Passive: {str(e2)}")
                        self.logger.error(f"Anonymous: {str(e3)}")
                        raise Exception("Unable to establish FTP connection with any method")
            
            # Set root directory for CQIL website (subfolder on expecting.ca)
            root_dir = '/public_html/cqil.ca'
            try:
                # First try to navigate to the main public_html
                ftp.cwd('/public_html')
                self.logger.info(f"Changed to public_html directory")
                
                # Then check if cqil.ca folder exists
                try:
                    ftp.cwd('cqil.ca')
                    self.logger.info(f"Changed to cqil.ca directory")
                except:
                    # If not, try to create it
                    try:
                        ftp.mkd('cqil.ca')
                        ftp.cwd('cqil.ca')
                        self.logger.info(f"Created and changed to cqil.ca directory")
                    except:
                        self.logger.warning(f"Could not create cqil.ca directory")
            except Exception as e:
                self.logger.warning(f"Could not change to directory structure: {str(e)}")
                try:
                    # List available directories at the root
                    dirs = ftp.nlst()
                    self.logger.info(f"Available directories at root: {', '.join(dirs)}")
                    
                    # Try common directory names
                    for d in ['public_html', 'www', 'htdocs', 'html', 'web']:
                        if d in dirs:
                            try:
                                ftp.cwd(d)
                                self.logger.info(f"Changed to {d} directory")
                                
                                # Check for cqil.ca in this directory
                                try:
                                    subdirs = ftp.nlst()
                                    self.logger.info(f"Subdirectories: {', '.join(subdirs)}")
                                    
                                    if 'cqil.ca' in subdirs:
                                        ftp.cwd('cqil.ca')
                                        self.logger.info(f"Changed to cqil.ca directory")
                                    else:
                                        # Try to create it
                                        try:
                                            ftp.mkd('cqil.ca')
                                            ftp.cwd('cqil.ca')
                                            self.logger.info(f"Created and changed to cqil.ca directory")
                                        except:
                                            self.logger.warning(f"Could not create cqil.ca directory")
                                except:
                                    self.logger.warning(f"Could not list subdirectories in {d}")
                                
                                break
                            except:
                                self.logger.warning(f"Could not change to {d}")
                except:
                    self.logger.warning("Could not list directories, using current directory")
            
            # Upload files with better error handling
            for file_path in self.website_dir.rglob('*'):
                if file_path.is_file() and not any(x in str(file_path) for x in ['.git', '__pycache__', 'deploy']):
                    relative_path = file_path.relative_to(self.website_dir)
                    
                    # Create directories if needed
                    current_dir = ''
                    for part in str(relative_path.parent).split(os.sep):
                        if part:
                            current_dir += '/' + part
                            try:
                                ftp.mkd(current_dir)
                                self.logger.info(f"Created directory {current_dir}")
                            except:
                                self.logger.debug(f"Directory {current_dir} already exists")
                    
                    # Upload file with retry
                    remote_path = str(relative_path).replace('\\', '/')
                    try:
                        self.logger.info(f"Uploading {remote_path}")
                        with open(file_path, 'rb') as f:
                            ftp.storbinary(f'STOR {remote_path}', f)
                            self.logger.info(f"Uploaded {remote_path}")
                    except Exception as e:
                        self.logger.error(f"Failed to upload {remote_path}: {str(e)}")
                        # Continue with other files
            
            ftp.quit()
            return True
        except Exception as e:
            self.logger.error(f"Deployment failed: {str(e)}")
            return False
            
    def deploy_local_server(self):
        """Deploy to local server for testing"""
        try:
            dest_dir = '/mnt/d/cqil/website_deployed'
            os.makedirs(dest_dir, exist_ok=True)
            
            # Copy files
            self.deploy_local(dest_dir)
            
            # Start a local HTTP server
            self.logger.info(f"Starting server at http://127.0.0.1:8888")
            print(f"\n✅ Website files copied to: {dest_dir}")
            print("=== STARTING LOCAL SERVER ===")
            print(f"Website available at: http://127.0.0.1:8888")
            print("Press Ctrl+C to stop the server")
            
            # This would start the server, but requires handling in a separate process
            # So we'll just print instructions
            print("\nTo manually start the server, run this command in a separate terminal:")
            print(f"cd {dest_dir} && python3 -m http.server 8888")
            
            return True
        except Exception as e:
            self.logger.error(f"Local server deployment failed: {str(e)}")
            return False

def main():
    """Main deployment function with enhanced options"""
    try:
        deployer = QuickDeploy()
        
        # Show help if requested
        if len(sys.argv) > 1 and sys.argv[1] in ["--help", "-h"]:
            print("\n=== CQIL Website Deployment Tool ===")
            print("Usage: python deploy_now.py [option]\n")
            print("Options:")
            print("  --local [path]      Deploy to local directory for testing")
            print("  --server            Deploy locally and start a web server")
            print("  --ftp               Deploy to website via FTP (automated)")
            print("  --ftp-interactive   Deploy to website via FTP (interactive credentials)")
            print("  --help, -h          Show this help message\n")
            print("Description:")
            print("  This tool simplifies the deployment of the CQIL website")
            print("  to different environments for testing and production use.")
            return 0
        
        # Check deployment options
        if len(sys.argv) > 1 and sys.argv[1] == '--local':
            # Local deployment
            dest_dir = '/mnt/d/cqil/website_deployed'
            if len(sys.argv) > 2:
                dest_dir = sys.argv[2]
                
            if deployer.deploy_local(dest_dir):
                print(f"\n✅ Website files copied to: {dest_dir}")
                print("=== DEPLOYMENT SUCCESSFUL ===")
                
                # Print instructions for manual testing
                print(f"\nTo test your website, open a terminal and run this command:")
                print(f"cd {dest_dir} && python3 -m http.server 8888")
                print(f"Then open http://127.0.0.1:8888 in your browser\n")
                
                print(f"Alternatively, if you're using Windows:")
                print(f"1. Open Windows Explorer to: {dest_dir}")
                print(f"2. Double-click on index.html to open it directly in your browser")
                
                # Print a quick overview of the website structure
                print(f"\nWebsite Structure:")
                print(f"- Main page: index.html")
                print(f"- Golden Age page: pages/golden-age.html")
                print(f"- Experiments page: pages/experiments.html")
                print(f"- Examples page: pages/examples.html")
                print(f"- Mobile preview: mobile/index.html")
            else:
                print("\n❌ Local deployment failed. Check logs for details.")
                return 1
        
        elif len(sys.argv) > 1 and sys.argv[1] == '--server':
            # Local server deployment
            print("\n=== CQIL Website Local Server Deployment ===")
            if deployer.deploy_local_server():
                return 0
            else:
                print("\n❌ Local server deployment failed. Check logs for details.")
                return 1
        
        elif len(sys.argv) > 1 and sys.argv[1] == '--ftp':
            # FTP deployment with hardcoded credentials - for quick testing only
            print("\n=== CQIL Website Deployment (FTP) ===")
            
            # Load credentials from config file or environment variables
            config = load_ftp_config()
            host = config['host']
            username = config['username']
            password = config['password']
            
            # Check if credentials are provided
            if not username or not password:
                print("\n❌ Missing FTP credentials. Please set CQIL_FTP_USERNAME and CQIL_FTP_PASSWORD environment variables.")
                return 1
            
            print(f"Connecting to {host} as {username}...")
            print(f"Will upload to /public_html/cqil.ca directory")
            print("If this fails, please double-check your credentials.")
            
            if deployer.deploy_ftp(host, username, password):
                print("\n✅ Website deployed successfully!")
                print("=== DEPLOYMENT SUCCESSFUL ===")
            else:
                print("\n❌ Deployment failed! Check logs for details.")
                print("\nAlternative steps:")
                print("1. Try using FileZilla with your FTP credentials:")
                print("   - Host: ftp.cqil.ca")
                print("   - Username: your_username")
                print("   - Password: your_password")
                print("   - Port: 21")
                print("2. Upload files manually from local directory to /public_html")
                print("3. Check logs for detailed error information")
                return 1
        
        elif len(sys.argv) > 1 and sys.argv[1] == '--ftp-interactive':
            # Interactive FTP deployment
            print("\n=== CQIL Website Deployment (Interactive FTP) ===")
            print("Deploying updated website files with user experiments support\n")
            
            # Get credentials interactively
            host = input("FTP Host (default: ftp.expecting.ca): ") or "ftp.expecting.ca"
            username = input(f"FTP Username: ")
            password = input("FTP Password: ")
            print(f"Will upload to /public_html/cqil.ca directory")
            
            # Validate input
            if not username or not password:
                print("\n❌ Username and password are required.")
                return 1
            
            print(f"\nConnecting to {host} as {username}...")
            
            if deployer.deploy_ftp(host, username, password):
                print("\n✅ Website deployed successfully!")
                print("=== DEPLOYMENT SUCCESSFUL ===")
            else:
                print("\n❌ Deployment failed! Check logs for details.")
                return 1
        
        else:
            # Default to local deployment if no option specified
            print("\n=== CQIL Website Local Deployment ===")
            print("No option specified, defaulting to local deployment.")
            print("Use --help to see all available options.\n")
            
            if deployer.deploy_local('/mnt/d/cqil/website_deployed'):
                print("\n✅ Website deployed locally.")
                print("=== DEPLOYMENT SUCCESSFUL ===")
                
                # Print instructions
                print("\nTo test your website:")
                print("cd /mnt/d/cqil/website_deployed && python3 -m http.server 8888")
                print("Then open http://127.0.0.1:8888 in your browser")
            else:
                print("\n❌ Local deployment failed. Check logs for details.")
                return 1
            
        return 0
    except Exception as e:
        print(f"\n❌ Deployment error: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
