import asyncio
import logging
from pathlib import Path
import cloudflare
from godaddypy import Client as GoDaddyClient, Account as GoDaddyAccount
from cryptography.fernet import Fernet
import yaml
import os
from datetime import datetime
import ftplib
import requests
from colorama import init, Style, Fore
import sys

# Initialize colorama
init()

class SecureAPIManager:
    def __init__(self):
        self.setup_logging()
        self.load_config()
        self.setup_apis()
        
    def setup_logging(self):
        """Configure logging"""
        log_dir = Path(__file__).parent / 'secure_logs'
        log_dir.mkdir(exist_ok=True)
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_dir / f'deploy_{datetime.now():%Y%m%d_%H%M%S}.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger('SecureAPIManager')
        
    def load_config(self):
        """Load and decrypt configuration"""
        config_path = Path(__file__).parent / 'secure_config.yml'
        with open(config_path) as f:
            self.config = yaml.safe_load(f)
            
        # Create secrets directory if not exists
        secrets_dir = Path(__file__).parent / '.secure'
        secrets_dir.mkdir(exist_ok=True)
            
        # Generate encryption key if not exists
        key_path = secrets_dir / 'encryption.key'
        if not key_path.exists():
            key = Fernet.generate_key()
            key_path.write_bytes(key)
        
        self.cipher = Fernet(key_path.read_bytes())

    def setup_apis(self):
        """Initialize APIs"""
        try:
            # Initialize Cloudflare
            token = self.config['cloudflare']['api_token']
            try:
                token = self.decrypt(token)
            except:
                # Token is not encrypted yet
                pass
                
            self.cf = cloudflare.Cloudflare(api_token=token)
            
            # Initialize GoDaddy client
            api_key = self.config['godaddy']['api_key']
            api_secret = self.config['godaddy']['api_secret']
            try:
                api_key = self.decrypt(api_key)
                api_secret = self.decrypt(api_secret)
            except:
                # Credentials are not encrypted yet
                pass
                
            account = GoDaddyAccount(api_key=api_key, api_secret=api_secret)
            self.godaddy = GoDaddyClient(account)
            
            print(f"{Fore.GREEN}* API initialization successful{Style.RESET_ALL}")
            
        except Exception as e:
            print(f"{Fore.RED}* API Setup Error: {str(e)}{Style.RESET_ALL}")
            raise

    def encrypt(self, data: str) -> str:
        """Encrypt sensitive data"""
        return self.cipher.encrypt(data.encode()).decode()

    def decrypt(self, encrypted_data: str) -> str:
        """Decrypt sensitive data"""
        return self.cipher.decrypt(encrypted_data.encode()).decode()

    async def configure_domain(self, domain: str = 'cqil.ca'):
        """Configure domain settings for CQIL"""
        print(f"{Fore.CYAN}* Configuring {domain}...{Style.RESET_ALL}")
        
        try:
            # Get or create Cloudflare zone
            zones = self.cf.zones.get(params={'name': domain})
            if not zones:
                print(f"* Creating new zone for {domain}")
                zone = self.cf.zones.post(data={
                    'name': domain,
                    'account': {'id': self.config['cloudflare']['account_id']},
                    'jump_start': True
                })
                zone_id = zone['id']
            else:
                zone_id = zones[0]['id']
                
            # Configure DNS records
            print("* Setting up DNS records...")
            dns_records = [
                {
                    'name': '@',
                    'type': 'A',
                    'content': self.config['godaddy']['server_ip'],
                    'proxied': True
                },
                {
                    'name': 'www',
                    'type': 'CNAME',
                    'content': 'cqil.ca',
                    'proxied': True
                }
            ]
            
            # Add email records if needed
            if self.config.get('email', {}).get('enabled', True):
                dns_records.extend([
                    {
                        'name': 'mail',
                        'type': 'CNAME',
                        'content': 'mx.zoho.com',
                        'proxied': False
                    }
                ])
                
                mx_records = [
                    {'name': '@', 'type': 'MX', 'priority': 10, 'content': 'mx.zoho.com'},
                    {'name': '@', 'type': 'MX', 'priority': 20, 'content': 'mx2.zoho.com'}
                ]
                dns_records.extend(mx_records)
                
                txt_records = [
                    {'name': '@', 'type': 'TXT', 'content': 'v=spf1 include:zoho.com ~all'}
                ]
                dns_records.extend(txt_records)
            
            # Add/update all records
            existing_records = self.cf.zones.dns_records.get(zone_id)
            for record in dns_records:
                record_exists = False
                for existing in existing_records:
                    if existing['type'] == record['type'] and existing['name'] == record['name']:
                        self.cf.zones.dns_records.put(zone_id, existing['id'], data=record)
                        record_exists = True
                        break
                if not record_exists:
                    self.cf.zones.dns_records.post(zone_id, data=record)
            
            # Configure SSL and security settings
            print("* Configuring SSL and security...")
            self.cf.zones.settings.ssl.patch(zone_id, value='full')
            self.cf.zones.settings.always_use_https.patch(zone_id, value='on')
            self.cf.zones.settings.security_level.patch(zone_id, value='medium')
            
            # Configure performance settings
            print("* Optimizing performance...")
            self.cf.zones.settings.cache_level.patch(zone_id, value='aggressive')
            self.cf.zones.settings.browser_cache_ttl.patch(zone_id, value=14400)
            self.cf.zones.settings.minify.patch(zone_id, value={
                'css': 'on',
                'html': 'on',
                'js': 'on'
            })
            self.cf.zones.settings.brotli.patch(zone_id, value='on')
            
            print(f"{Fore.GREEN}* Domain configuration completed successfully!{Style.RESET_ALL}")
            return True
            
        except Exception as e:
            print(f"{Fore.RED}* Domain configuration error: {str(e)}{Style.RESET_ALL}")
            self.logger.error(f"Domain configuration failed: {str(e)}")
            return False

    async def deploy_via_ftp(self):
        """Deploy website files via FTP"""
        try:
            print(f"{Fore.CYAN}* Starting FTP deployment...{Style.RESET_ALL}")
            
            # Get source directory containing website files
            local_root = Path(self.config['deployment']['local_root'])
            source_dir = local_root / self.config['deployment'].get('source_dir', '')
            
            if not source_dir.exists():
                raise Exception(f"Source directory not found: {source_dir}")
            
            print(f"* Using source directory: {source_dir}")
            
            # Connect to FTP server
            print("* Connecting to FTP server...")
            print(f"  Host: {self.config['ftp']['host']}")
            print(f"  Username: {self.config['ftp']['username']}")
            
            # Create FTP connection
            ftp = ftplib.FTP()
            ftp.set_debuglevel(2)  # Enable debugging
            ftp.connect(self.config['ftp']['host'], 21)
            print("* Connected to server")
            
            # Try to enable UTF-8 encoding
            try:
                ftp.sendcmd('OPTS UTF8 ON')
            except:
                pass
                
            # Login
            print("* Attempting login...")
            ftp.login(self.config['ftp']['username'], self.config['ftp']['password'])
            print("* Login successful")
            
            # Enable passive mode
            ftp.set_pasv(True)
            
            # Navigate to root directory
            print(f"* Navigating to {self.config['ftp']['root_dir']}...")
            ftp.cwd(self.config['ftp']['root_dir'])
            
            # Upload files
            print("* Uploading files...")
            exclude = set(self.config['deployment']['exclude'])
            
            def upload_dir(local_dir: Path, remote_dir: str = ""):
                """Recursively upload directory"""
                for item in local_dir.iterdir():
                    # Skip excluded items
                    if item.name in exclude or any(item.match(pat) for pat in exclude):
                        continue
                        
                    remote_path = f"{remote_dir}/{item.name}" if remote_dir else item.name
                    
                    if item.is_file():
                        with open(item, 'rb') as f:
                            ftp.storbinary(f'STOR {remote_path}', f)
                            print(f"  Uploaded: {remote_path}")
                            
                    elif item.is_dir():
                        try:
                            ftp.mkd(remote_path)
                        except:
                            pass  # Directory might already exist
                        upload_dir(item, remote_path)
            
            # Start upload from source directory
            upload_dir(source_dir)
            
            # Set file permissions
            print("* Setting file permissions...")
            files_perm = str(self.config['security']['file_permissions']['files'])
            dirs_perm = str(self.config['security']['file_permissions']['directories'])
            
            # Set permissions for index.html if it exists
            try:
                ftp.sendcmd(f'SITE CHMOD {files_perm} {self.config["ftp"]["root_dir"]}/index.html')
            except:
                pass
            
            # Close connection
            ftp.quit()
            
            print(f"{Fore.GREEN}* FTP deployment completed successfully!{Style.RESET_ALL}")
            return True
            
        except Exception as e:
            print(f"{Fore.RED}* FTP deployment failed: {str(e)}{Style.RESET_ALL}")
            self.logger.error(f"FTP deployment failed: {str(e)}")
            return False

    async def deploy_website(self, domain: str = 'cqil.ca'):
        """Deploy the website"""
        try:
            print(f"{Fore.CYAN}* Starting {domain} deployment...{Style.RESET_ALL}")
            
            # 1. Deploy files via FTP
            if not await self.deploy_via_ftp():
                raise Exception("FTP deployment failed")
            
            # 2. Configure domain and DNS
            if not await self.configure_domain(domain):
                raise Exception("Domain configuration failed")
            
            # 3. Clear Cloudflare cache
            print("* Clearing Cloudflare cache...")
            zones = self.cf.zones.get(params={'name': domain})
            if zones:
                self.cf.zones.purge_cache.post(zones[0]['id'], data={'purge_everything': True})
            
            print(f"{Fore.GREEN}* Deployment completed successfully!{Style.RESET_ALL}")
            return True
            
        except Exception as e:
            print(f"{Fore.RED}* Deployment failed: {str(e)}{Style.RESET_ALL}")
            self.logger.error(f"Deployment failed: {str(e)}")
            return False

    async def fix_403_error(self, domain: str):
        """Automated fix for 403 errors"""
        try:
            print(f"{Fore.CYAN}* Attempting to fix 403 error for {domain}...{Style.RESET_ALL}")
            
            # 1. Check Cloudflare SSL settings
            zones = self.cf.zones.get(params={'name': domain})
            if not zones:
                raise Exception(f"No Cloudflare zone found for {domain}")
            
            zone_id = zones[0]['id']
            print("* Configuring SSL settings...")
            
            # Set SSL to Full
            self.cf.zones.settings.ssl.patch(zone_id, value='full')
            print("* SSL set to Full")
            
            # Enable HTTPS
            self.cf.zones.settings.always_use_https.patch(zone_id, value='on')
            print("* HTTPS enforced")
            
            # 2. Clear Cloudflare cache
            print("* Clearing Cloudflare cache...")
            self.cf.zones.purge_cache.post(zone_id, data={'purge_everything': True})
            
            # 3. Check DNS records
            print("* Verifying DNS records...")
            records = self.cf.zones.dns_records.get(zone_id)
            a_record_found = False
            for record in records:
                if record['type'] == 'A' and record['name'] == domain:
                    if record['content'] != self.config['godaddy']['server_ip']:
                        # Update A record
                        self.cf.zones.dns_records.put(zone_id, record['id'], data={
                            'type': 'A',
                            'name': domain,
                            'content': self.config['godaddy']['server_ip'],
                            'proxied': True
                        })
                        print(f"* Updated A record to point to {self.config['godaddy']['server_ip']}")
                    a_record_found = True
                    break
            
            if not a_record_found:
                # Create A record
                self.cf.zones.dns_records.post(zone_id, data={
                    'type': 'A',
                    'name': domain,
                    'content': self.config['godaddy']['server_ip'],
                    'proxied': True
                })
                print("* Created new A record")
            
            # 4. Fix file permissions
            print("* Checking file permissions...")
            await self.fix_file_permissions()
            
            print(f"{Fore.GREEN}* 403 error fix attempts completed{Style.RESET_ALL}")
            print("\nIf you still see the 403 error, please:")
            print("1. Clear your browser cache")
            print("2. Try accessing the site in incognito mode")
            print("3. Wait a few minutes for DNS changes to propagate")
            return True
            
        except Exception as e:
            print(f"{Fore.RED}* Failed to fix 403 error: {str(e)}{Style.RESET_ALL}")
            self.logger.error(f"Failed to fix 403 error: {str(e)}")
            return False

    async def fix_file_permissions(self):
        """Fix file permissions on the server"""
        try:
            print("* Setting correct file permissions...")
            
            # Set default permissions
            files_perm = self.config['security']['file_permissions']['files']
            dirs_perm = self.config['security']['file_permissions']['directories']
            
            # Create commands to fix permissions
            commands = [
                f'find {self.config["godaddy"]["hosting"]["home_dir"]}/public_html -type f -exec chmod {files_perm} {{}} \\;',
                f'find {self.config["godaddy"]["hosting"]["home_dir"]}/public_html -type d -exec chmod {dirs_perm} {{}} \\;'
            ]
            
            print(f"* Setting file permissions to {files_perm}")
            print(f"* Setting directory permissions to {dirs_perm}")
            print("\nPlease run these commands in your GoDaddy hosting control panel or via SSH:")
            for cmd in commands:
                print(f"\n{cmd}")
            
            return True
            
        except Exception as e:
            print(f"{Fore.RED}* Failed to fix file permissions: {str(e)}{Style.RESET_ALL}")
            self.logger.error(f"Failed to fix file permissions: {str(e)}")
            return False

async def main():
    manager = SecureAPIManager()
    await manager.deploy_website('cqil.ca')

if __name__ == "__main__":
    asyncio.run(main())
