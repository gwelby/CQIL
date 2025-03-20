#!/usr/bin/env python3
import os
import sys
import paramiko
import yaml
import logging
from datetime import datetime
from pathlib import Path

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('deploy.log'),
        logging.StreamHandler(sys.stdout)
    ]
)

class WebsiteDeployer:
    def __init__(self, config_path='config.yml'):
        self.config = self._load_config(config_path)
        self.ssh = paramiko.SSHClient()
        self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        self.logger = logging.getLogger(__name__)

    def _load_config(self, config_path):
        """Load SSH and deployment configuration"""
        with open(config_path, 'r') as f:
            return yaml.safe_load(f)

    def connect(self):
        """Establish SSH connection"""
        try:
            self.ssh.connect(
                hostname=self.config['ssh']['host'],
                username=self.config['ssh']['username'],
                key_filename=self.config['ssh']['key_path'],
                port=self.config['ssh'].get('port', 22)
            )
            self.logger.info(f"Connected to {self.config['ssh']['host']}")
            return True
        except Exception as e:
            self.logger.error(f"Connection failed: {str(e)}")
            return False

    def backup_remote(self):
        """Create backup of current website"""
        try:
            backup_dir = f"/backup/website_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            cmd = f"mkdir -p {backup_dir} && cp -r {self.config['remote']['web_root']}/* {backup_dir}/"
            stdin, stdout, stderr = self.ssh.exec_command(cmd)
            if stderr.read():
                self.logger.error(f"Backup failed: {stderr.read().decode()}")
                return False
            self.logger.info(f"Backup created at {backup_dir}")
            return True
        except Exception as e:
            self.logger.error(f"Backup failed: {str(e)}")
            return False

    def upload_files(self):
        """Upload website files via SFTP"""
        try:
            sftp = self.ssh.open_sftp()
            local_dir = Path(self.config['local']['web_root'])
            remote_dir = self.config['remote']['web_root']

            # Upload files
            for local_path in local_dir.rglob('*'):
                if local_path.is_file():
                    relative_path = local_path.relative_to(local_dir)
                    remote_path = f"{remote_dir}/{relative_path}"
                    
                    # Create remote directory if needed
                    remote_dirname = os.path.dirname(remote_path)
                    self.ssh.exec_command(f"mkdir -p {remote_dirname}")
                    
                    # Upload file
                    sftp.put(str(local_path), remote_path)
                    self.logger.info(f"Uploaded {relative_path}")

            sftp.close()
            return True
        except Exception as e:
            self.logger.error(f"Upload failed: {str(e)}")
            return False

    def set_permissions(self):
        """Set correct file permissions"""
        try:
            cmds = [
                f"find {self.config['remote']['web_root']} -type f -exec chmod 644 {{}} \\;",
                f"find {self.config['remote']['web_root']} -type d -exec chmod 755 {{}} \\;"
            ]
            for cmd in cmds:
                stdin, stdout, stderr = self.ssh.exec_command(cmd)
                if stderr.read():
                    self.logger.error(f"Permission setting failed: {stderr.read().decode()}")
                    return False
            self.logger.info("Permissions set successfully")
            return True
        except Exception as e:
            self.logger.error(f"Permission setting failed: {str(e)}")
            return False

    def clear_cache(self):
        """Clear website cache if configured"""
        try:
            if 'cache_dir' in self.config['remote']:
                cmd = f"rm -rf {self.config['remote']['cache_dir']}/*"
                stdin, stdout, stderr = self.ssh.exec_command(cmd)
                if stderr.read():
                    self.logger.error(f"Cache clearing failed: {stderr.read().decode()}")
                    return False
                self.logger.info("Cache cleared successfully")
            return True
        except Exception as e:
            self.logger.error(f"Cache clearing failed: {str(e)}")
            return False

    def deploy(self):
        """Run full deployment process"""
        try:
            if not self.connect():
                return False

            steps = [
                (self.backup_remote, "Backup"),
                (self.upload_files, "Upload"),
                (self.set_permissions, "Permissions"),
                (self.clear_cache, "Cache")
            ]

            for step_func, step_name in steps:
                self.logger.info(f"Starting {step_name} step...")
                if not step_func():
                    self.logger.error(f"{step_name} step failed")
                    return False
                self.logger.info(f"{step_name} step completed")

            self.logger.info("Deployment completed successfully")
            
            # Print website URL for easy access
            print(f"\nWebsite deployed successfully to: http://{self.config['ssh']['host']}")
            if 'domain' in self.config.get('cloudflare', {}):
                print(f"Or use the domain: https://{self.config['cloudflare']['domain']}")
            
            return True
        finally:
            self.ssh.close()

if __name__ == "__main__":
    deployer = WebsiteDeployer()
    if deployer.deploy():
        print("Website deployed successfully!")
    else:
        print("Deployment failed! Check deploy.log for details")
        sys.exit(1)
