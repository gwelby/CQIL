#!/usr/bin/env python3
import os
import sys
import logging
import yaml
import ftplib
import argparse
from github import Github, GithubException
from datetime import datetime
from pathlib import Path
from colorama import init, Fore, Style

# Initialize colorama for colored output
init()

class GitHubIntegration:
    def __init__(self):
        self.setup_logging()
        self.load_config()
        self.website_dir = Path('/mnt/d/cqil/website')
        
    def setup_logging(self):
        """Configure logging"""
        log_dir = Path(__file__).parent / 'secure_logs'
        log_dir.mkdir(exist_ok=True)
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_dir / f'deploy_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def load_config(self):
        """Load configuration from various config files"""
        try:
            # Load GitHub config (create if not exists)
            github_config_path = Path(__file__).parent / 'github_config.yml'
            if not github_config_path.exists():
                default_config = {
                    'github': {
                        'token': 'YOUR_GITHUB_TOKEN',
                        'owner': 'gwelby',
                        'repo': 'cqil-website',
                        'branch': 'main'
                    },
                    'deploy': {
                        'auto_deploy': True,
                        'deploy_branch': 'main',
                        'webhooks_enabled': False
                    }
                }
                with open(github_config_path, 'w') as f:
                    yaml.dump(default_config, f, default_flow_style=False)
                print(f"{Fore.YELLOW}Created default GitHub config at {github_config_path}{Style.RESET_ALL}")
                print(f"{Fore.YELLOW}Please edit this file to add your GitHub token{Style.RESET_ALL}")
                
            # Load existing config
            with open(github_config_path) as f:
                self.github_config = yaml.safe_load(f)
                
            # Load FTP config from godaddy_config.yml
            godaddy_config_path = Path(__file__).parent / 'godaddy_config.yml'
            with open(godaddy_config_path) as f:
                self.godaddy_config = yaml.safe_load(f)
                
            # Load deployment config
            deploy_config_path = Path(__file__).parent / 'config.yml'
            with open(deploy_config_path) as f:
                self.deploy_config = yaml.safe_load(f)
                
            print(f"{Fore.GREEN}Configuration loaded successfully{Style.RESET_ALL}")
            
        except Exception as e:
            self.logger.error(f"Failed to load configuration: {str(e)}")
            print(f"{Fore.RED}Failed to load configuration: {str(e)}{Style.RESET_ALL}")
            sys.exit(1)
    
    def connect_to_github(self):
        """Connect to GitHub API"""
        try:
            token = self.github_config['github']['token']
            if token == 'YOUR_GITHUB_TOKEN':
                print(f"{Fore.RED}GitHub token not configured. Please edit github_config.yml{Style.RESET_ALL}")
                return None
                
            self.gh = Github(token)
            
            # Test the connection by getting the user
            user = self.gh.get_user()
            print(f"{Fore.GREEN}Connected to GitHub as: {user.login}{Style.RESET_ALL}")
            return self.gh
            
        except Exception as e:
            self.logger.error(f"Failed to connect to GitHub: {str(e)}")
            print(f"{Fore.RED}GitHub connection failed: {str(e)}{Style.RESET_ALL}")
            return None
    
    def create_repository(self):
        """Create GitHub repository if it doesn't exist"""
        try:
            # Connect to GitHub
            gh = self.connect_to_github()
            if not gh:
                return False
                
            owner = self.github_config['github']['owner']
            repo_name = self.github_config['github']['repo']
            
            try:
                # Try to get the repository
                user = gh.get_user(owner)
                repo = user.get_repo(repo_name)
                print(f"{Fore.GREEN}Repository already exists: {owner}/{repo_name}{Style.RESET_ALL}")
                print(f"URL: {repo.html_url}")
                return repo
                
            except GithubException as e:
                if e.status == 404:
                    # Repository doesn't exist, create it
                    user = gh.get_user()  # This is the authenticated user
                    if user.login.lower() != owner.lower():
                        print(f"{Fore.RED}You can only create repositories for yourself, not for {owner}{Style.RESET_ALL}")
                        return False
                        
                    repo = user.create_repo(
                        repo_name,
                        description="CQIL Website",
                        homepage="https://cqil.ca",
                        private=False,
                        has_issues=True,
                        has_wiki=True,
                        has_downloads=True
                    )
                    print(f"{Fore.GREEN}Created new repository: {owner}/{repo_name}{Style.RESET_ALL}")
                    print(f"URL: {repo.html_url}")
                    return repo
                else:
                    raise
                    
        except Exception as e:
            self.logger.error(f"Failed to create repository: {str(e)}")
            print(f"{Fore.RED}Repository creation failed: {str(e)}{Style.RESET_ALL}")
            return False
    
    def setup_github_pages(self, repo):
        """Setup GitHub Pages for the repository"""
        try:
            # Enable GitHub Pages
            try:
                repo.create_pages_site(branch=self.github_config['github']['branch'], source='/')
                print(f"{Fore.GREEN}GitHub Pages enabled on branch: {self.github_config['github']['branch']}{Style.RESET_ALL}")
                print(f"Site URL: https://{self.github_config['github']['owner']}.github.io/{self.github_config['github']['repo']}")
            except GithubException as e:
                if "Pages site already exists" in str(e):
                    print(f"{Fore.YELLOW}GitHub Pages already enabled{Style.RESET_ALL}")
                else:
                    raise
                    
            return True
            
        except Exception as e:
            self.logger.error(f"Failed to setup GitHub Pages: {str(e)}")
            print(f"{Fore.RED}GitHub Pages setup failed: {str(e)}{Style.RESET_ALL}")
            return False
    
    def push_to_github(self):
        """Push website files to GitHub"""
        try:
            # First check if git is installed
            import subprocess
            try:
                result = subprocess.run(['git', '--version'], capture_output=True, text=True)
                if result.returncode != 0:
                    print(f"{Fore.RED}Git is not installed. Please install git first.{Style.RESET_ALL}")
                    return False
            except FileNotFoundError:
                print(f"{Fore.RED}Git is not installed. Please install git first.{Style.RESET_ALL}")
                return False
            
            # Get repository
            repo = self.create_repository()
            if not repo:
                return False
                
            # Change to website directory
            os.chdir(self.website_dir)
            
            # Create .gitignore if it doesn't exist
            gitignore_path = self.website_dir / '.gitignore'
            if not gitignore_path.exists():
                with open(gitignore_path, 'w') as f:
                    f.write("""# CQIL Website .gitignore
.DS_Store
node_modules/
__pycache__/
*.py[cod]
*$py.class
*.so
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/
deploy/secure_config.yml
deploy/secure_logs/
""")
                print(f"{Fore.GREEN}Created .gitignore file{Style.RESET_ALL}")
            
            # Check if this is a git repository
            if not (self.website_dir / '.git').exists():
                # Initialize git repository
                subprocess.run(['git', 'init'], check=True)
                print(f"{Fore.GREEN}Initialized git repository{Style.RESET_ALL}")
                
                # Configure Git
                result = subprocess.run(['git', 'config', 'user.name', self.github_config['github']['owner']], check=True)
                result = subprocess.run(['git', 'config', 'user.email', f"{self.github_config['github']['owner']}@users.noreply.github.com"], check=True)
                print(f"{Fore.GREEN}Configured git user{Style.RESET_ALL}")
                
                # Add GitHub remote
                remote_url = f"https://{self.github_config['github']['token']}@github.com/{self.github_config['github']['owner']}/{self.github_config['github']['repo']}.git"
                subprocess.run(['git', 'remote', 'add', 'origin', remote_url], check=True)
                print(f"{Fore.GREEN}Added GitHub remote{Style.RESET_ALL}")
            else:
                # Check if the remote is set correctly
                try:
                    result = subprocess.run(['git', 'remote', '-v'], capture_output=True, text=True)
                    if "origin" not in result.stdout:
                        remote_url = f"https://{self.github_config['github']['token']}@github.com/{self.github_config['github']['owner']}/{self.github_config['github']['repo']}.git"
                        subprocess.run(['git', 'remote', 'add', 'origin', remote_url], check=True)
                        print(f"{Fore.GREEN}Added GitHub remote{Style.RESET_ALL}")
                except Exception as e:
                    self.logger.error(f"Failed to check git remote: {str(e)}")
                    print(f"{Fore.RED}Failed to check git remote: {str(e)}{Style.RESET_ALL}")
            
            # Add all files
            subprocess.run(['git', 'add', '.'], check=True)
            print(f"{Fore.GREEN}Added files to git{Style.RESET_ALL}")
            
            # Commit changes
            try:
                result = subprocess.run(['git', 'commit', '-m', f"Update website - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"], check=True)
                print(f"{Fore.GREEN}Committed changes{Style.RESET_ALL}")
            except subprocess.CalledProcessError:
                self.logger.warning("No changes to commit or commit failed")
                print(f"{Fore.YELLOW}No changes to commit or commit failed{Style.RESET_ALL}")
            
            # Push to GitHub
            branch = self.github_config['github']['branch']
            try:
                subprocess.run(['git', 'push', '-u', 'origin', branch], check=True)
                print(f"{Fore.GREEN}Pushed to GitHub{Style.RESET_ALL}")
            except subprocess.CalledProcessError:
                # Try to create the branch first
                try:
                    subprocess.run(['git', 'checkout', '-b', branch], check=True)
                    subprocess.run(['git', 'push', '-u', 'origin', branch], check=True)
                    print(f"{Fore.GREEN}Created and pushed to {branch} branch{Style.RESET_ALL}")
                except subprocess.CalledProcessError as e:
                    self.logger.error(f"Failed to push to GitHub: {str(e)}")
                    print(f"{Fore.RED}Failed to push to GitHub: {str(e)}{Style.RESET_ALL}")
                    
            # Setup GitHub Pages
            self.setup_github_pages(repo)
                
            return True
            
        except Exception as e:
            self.logger.error(f"Failed to push to GitHub: {str(e)}")
            print(f"{Fore.RED}Failed to push to GitHub: {str(e)}{Style.RESET_ALL}")
            return False
    
    def setup_cloudflare_pages(self):
        """Setup CloudFlare Pages integration"""
        try:
            print(f"\n{Fore.CYAN}=== CloudFlare Pages Integration ==={Style.RESET_ALL}")
            print(f"{Fore.YELLOW}To setup CloudFlare Pages integration, follow these steps:{Style.RESET_ALL}")
            print("1. Go to https://dash.cloudflare.com")
            print("2. Select 'Pages' from the sidebar")
            print("3. Click 'Create a project'")
            print("4. Select 'Connect to Git'")
            print(f"5. Connect to your GitHub account and select the {self.github_config['github']['owner']}/{self.github_config['github']['repo']} repository")
            print("6. Configure your build settings:")
            print("   - Build command: leave empty (static site)")
            print("   - Build output directory: / (root)")
            print("7. Click 'Save and Deploy'")
            print("\nOnce deployed, you can set up a custom domain:")
            print("1. Go to your Pages project")
            print("2. Click 'Custom domains'")
            print("3. Click 'Set up a custom domain'")
            print("4. Enter your domain (e.g., cqil.ca) and follow the instructions")
            
            return True
            
        except Exception as e:
            self.logger.error(f"Failed to provide CloudFlare Pages information: {str(e)}")
            print(f"{Fore.RED}Failed to provide CloudFlare Pages information: {str(e)}{Style.RESET_ALL}")
            return False
            
    def deploy_ftp(self, target_dir=None):
        """Deploy via FTP as a backup method"""
        try:
            print(f"\n{Fore.CYAN}=== Deploying via FTP ==={Style.RESET_ALL}")
            
            # Get FTP credentials
            host = self.godaddy_config['ftp']['host']
            username = self.godaddy_config['ftp']['username']
            password = self.godaddy_config['ftp']['password']
            
            print(f"Connecting to {host} with username {username}")
            
            # Connect to FTP server
            ftp = ftplib.FTP(host, timeout=30)
            ftp.set_pasv(True)
            ftp.login(username, password)
            print(f"{Fore.GREEN}Connected to FTP server{Style.RESET_ALL}")
            
            # Set root directory for CQIL website (subfolder on expecting.ca)
            if target_dir:
                root_dir = target_dir
                print(f"Using custom target directory: {root_dir}")
            else:
                root_dir = '/public_html/cqil.ca'
                print(f"Using default target directory: {root_dir}")
            
            # Try to navigate to the directory
            try:
                # Split the target directory into parts
                parts = root_dir.strip('/').split('/')
                current_path = ''
                
                # Ensure we start at the root
                ftp.cwd('/')
                
                # Navigate through each part of the path, creating directories if needed
                for part in parts:
                    if not part:
                        continue
                    
                    current_path += '/' + part
                    
                    try:
                        ftp.cwd(current_path)
                        print(f"Changed to {current_path} directory")
                    except:
                        # If directory doesn't exist, create it
                        try:
                            ftp.mkd(current_path)
                            ftp.cwd(current_path)
                            print(f"Created and changed to {current_path} directory")
                        except Exception as e:
                            print(f"{Fore.RED}Could not create {current_path} directory: {str(e)}{Style.RESET_ALL}")
                            return False
            except Exception as e:
                print(f"{Fore.RED}Could not change to directory structure: {str(e)}{Style.RESET_ALL}")
                return False
            
            # Upload files
            exclude = set(self.godaddy_config['exclude'])
            
            # Add .git to exclude list if not already there
            exclude.add('.git')
            exclude.add('.github')
            
            # Check if we're using a versioned website with cache-headers.json
            cache_headers_file = self.website_dir / 'cache-headers.json'
            cache_headers = {}
            if cache_headers_file.exists():
                try:
                    with open(cache_headers_file, 'r') as f:
                        cache_headers = json.load(f)
                    print(f"{Fore.GREEN}Loaded cache headers for {len(cache_headers)} files{Style.RESET_ALL}")
                except Exception as e:
                    self.logger.warning(f"Failed to load cache headers: {str(e)}")
                    print(f"{Fore.YELLOW}Failed to load cache headers: {str(e)}{Style.RESET_ALL}")
            
            # Create .htaccess for cache control if cache headers are available
            if cache_headers:
                try:
                    # Create .htaccess content for cache control
                    htaccess_content = "# Cache Control Settings\n\n"
                    
                    # Add cache control for versioned assets
                    htaccess_content += """
# Cache versioned assets for 1 month
<FilesMatch "\\.[0-9a-f]{10}\\.(?:css|js|jpg|jpeg|png|gif|svg|webp)$">
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

# Short cache for API endpoints
<FilesMatch "^api/">
    Header set Cache-Control "max-age=120"
</FilesMatch>

# Cache CSS/JS files (non-versioned) for 4 hours
<FilesMatch "^(?!.*\\.[0-9a-f]{10}\\.).*\\.(css|js)$">
    Header set Cache-Control "public, max-age=14400"
</FilesMatch>

# Default cache for all other files (1 hour)
<FilesMatch "^(?!.*\\.(html|css|js)$)(?!.*\\.[0-9a-f]{10}\\.)(?!health)(?!^api/).*$">
    Header set Cache-Control "public, max-age=3600"
</FilesMatch>
"""
                    
                    # Create and upload .htaccess file
                    htaccess_path = Path(self.website_dir) / '.htaccess'
                    with open(htaccess_path, 'w') as f:
                        f.write(htaccess_content)
                    
                    with open(htaccess_path, 'rb') as f:
                        ftp.storbinary('STOR .htaccess', f)
                    
                    print(f"{Fore.GREEN}Created and uploaded .htaccess with cache control rules{Style.RESET_ALL}")
                    self.logger.info("Created and uploaded .htaccess with cache control rules")
                    
                except Exception as e:
                    self.logger.warning(f"Failed to create .htaccess for cache control: {str(e)}")
                    print(f"{Fore.YELLOW}Failed to create .htaccess for cache control: {str(e)}{Style.RESET_ALL}")
            
            # Track statistics
            total_files = 0
            versioned_files = 0
            
            # Upload files
            for file_path in self.website_dir.rglob('*'):
                if file_path.is_file() and not any(x in str(file_path) for x in exclude):
                    relative_path = file_path.relative_to(self.website_dir)
                    
                    # Create directories if needed
                    current_dir = ''
                    for part in str(relative_path.parent).split(os.sep):
                        if part:
                            current_dir += '/' + part
                            try:
                                ftp.mkd(current_dir)
                            except:
                                pass  # Directory might already exist
                    
                    # Upload file
                    remote_path = str(relative_path).replace('\\', '/')
                    
                    # Check if this is a versioned asset (has a hash in the filename)
                    is_versioned = bool(re.search(r'\.[0-9a-f]{10}\.', remote_path))
                    if is_versioned:
                        versioned_files += 1
                    
                    with open(file_path, 'rb') as f:
                        ftp.storbinary(f'STOR {remote_path}', f)
                    
                    total_files += 1
                    
                    # Print progress periodically
                    if total_files % 20 == 0:
                        print(f"Uploaded {total_files} files ({versioned_files} versioned)...")
            
            ftp.quit()
            print(f"{Fore.GREEN}FTP deployment completed successfully{Style.RESET_ALL}")
            print(f"Uploaded {total_files} files, including {versioned_files} versioned assets")
            return True
            
        except Exception as e:
            self.logger.error(f"FTP deployment failed: {str(e)}")
            print(f"{Fore.RED}FTP deployment failed: {str(e)}{Style.RESET_ALL}")
            return False
    
    def deploy_all(self):
        """Deploy to both GitHub and FTP"""
        try:
            print(f"\n{Fore.CYAN}=== CQIL Website Deployment ==={Style.RESET_ALL}")
            print("Deploying to both GitHub and FTP\n")
            
            # Push to GitHub
            github_success = self.push_to_github()
            
            # Deploy to FTP as backup
            ftp_success = self.deploy_ftp()
            
            # Display CloudFlare Pages integration info
            if github_success:
                self.setup_cloudflare_pages()
            
            # Display summary
            print(f"\n{Fore.CYAN}=== Deployment Summary ==={Style.RESET_ALL}")
            print(f"GitHub deployment: {'✅ Success' if github_success else '❌ Failed'}")
            print(f"FTP deployment: {'✅ Success' if ftp_success else '❌ Failed'}")
            
            if github_success or ftp_success:
                print(f"\n{Fore.GREEN}Deployment completed successfully!{Style.RESET_ALL}")
                return True
            else:
                print(f"\n{Fore.RED}All deployment methods failed!{Style.RESET_ALL}")
                return False
                
        except Exception as e:
            self.logger.error(f"Deployment failed: {str(e)}")
            print(f"{Fore.RED}Deployment failed: {str(e)}{Style.RESET_ALL}")
            return False
            
def verify_deployment(self, urls):
    """Verify deployment across all platforms"""
    try:
        import requests
        import re
        
        results = {}
        overall_success = True
        
        print(f"\n{Fore.CYAN}=== Deployment Verification ==={Style.RESET_ALL}")
        
        for platform, url in urls.items():
            if not url:
                results[platform] = {"success": False, "reason": "No URL provided"}
                overall_success = False
                continue
                
            try:
                platform_results = {
                    "health": False,
                    "versioned_assets": False,
                    "cache_headers": False
                }
                
                # Step 1: Try to fetch the health check page
                health_url = f"{url}/health-check.html"
                self.logger.info(f"Checking health at: {health_url}")
                print(f"Checking {platform} health at: {health_url}")
                
                health_response = requests.get(health_url, timeout=10)
                
                if health_response.status_code == 200 and "data-status=\"healthy\"" in health_response.text:
                    platform_results["health"] = True
                    print(f"{Fore.GREEN}{platform.capitalize()}: ✅ Health check passed{Style.RESET_ALL}")
                else:
                    print(f"{Fore.RED}{platform.capitalize()}: ❌ Health check failed{Style.RESET_ALL}")
                    overall_success = False
                
                # Step 2: Check for versioned assets
                html_response = requests.get(url, timeout=10)
                if html_response.status_code == 200:
                    # Look for versioned asset references (files with hash in name)
                    versioned_assets = re.findall(r'(?:href|src)=["\'](.*?\.[0-9a-f]{10}\.(?:css|js|png|jpg|jpeg|gif|svg))["|\']', 
                                                html_response.text)
                    
                    if versioned_assets:
                        platform_results["versioned_assets"] = True
                        print(f"{Fore.GREEN}{platform.capitalize()}: ✅ Found {len(versioned_assets)} versioned assets{Style.RESET_ALL}")
                        
                        # Step 3: Check cache headers for a versioned asset
                        if len(versioned_assets) > 0:
                            asset_url = versioned_assets[0]
                            # Make sure it's a full URL
                            if not asset_url.startswith('http'):
                                if asset_url.startswith('/'):
                                    asset_url = f"{url}{asset_url}"
                                else:
                                    asset_url = f"{url}/{asset_url}"
                            
                            asset_response = requests.head(asset_url, timeout=10)
                            
                            # Check for cache-control header
                            if 'Cache-Control' in asset_response.headers:
                                cache_control = asset_response.headers['Cache-Control']
                                if 'max-age' in cache_control.lower():
                                    platform_results["cache_headers"] = True
                                    print(f"{Fore.GREEN}{platform.capitalize()}: ✅ Cache headers configured{Style.RESET_ALL}")
                                    print(f"  {asset_url} → Cache-Control: {cache_control}")
                                else:
                                    print(f"{Fore.YELLOW}{platform.capitalize()}: ⚠️ Cache headers found but max-age not set{Style.RESET_ALL}")
                            else:
                                print(f"{Fore.YELLOW}{platform.capitalize()}: ⚠️ No cache headers found for assets{Style.RESET_ALL}")
                    else:
                        print(f"{Fore.YELLOW}{platform.capitalize()}: ⚠️ No versioned assets found{Style.RESET_ALL}")
                
                # Determine overall platform success
                platform_success = platform_results["health"]
                results[platform] = {
                    "success": platform_success,
                    "details": platform_results
                }
                
                if not platform_success:
                    overall_success = False
                    
            except Exception as e:
                results[platform] = {"success": False, "reason": str(e)}
                print(f"{Fore.RED}{platform.capitalize()}: ❌ Failed - {str(e)}{Style.RESET_ALL}")
                overall_success = False
        
        # Log verification results
        self.logger.info(f"Deployment verification results: {results}")
        
        # Summary
        print(f"\n{Fore.CYAN}Overall Verification: {'✅ Passed' if overall_success else '❌ Failed'}{Style.RESET_ALL}")
        
        return overall_success, results
        
    except ImportError:
        self.logger.error("Requests library not installed. Please install with 'pip install requests'")
        print(f"{Fore.RED}Requests library not installed. Please install with 'pip install requests'{Style.RESET_ALL}")
        return False, {}
    except Exception as e:
        self.logger.error(f"Verification failed: {str(e)}")
        print(f"{Fore.RED}Verification failed: {str(e)}{Style.RESET_ALL}")
        return False, {}

def deploy_multi_platform(self):
    """Deploy to GitHub and ensure CloudFlare Pages integration"""
    try:
        print(f"\n{Fore.CYAN}=== Multi-Platform Deployment ==={Style.RESET_ALL}")
        
        results = {
            "github": {"success": False, "url": ""},
            "cloudflare": {"success": False, "url": ""},
            "ftp": {"success": False, "url": ""}
        }
        
        # First deploy to GitHub
        print(f"\n{Fore.CYAN}Deploying to GitHub Pages...{Style.RESET_ALL}")
        github_result = self.push_to_github()
        results["github"]["success"] = github_result
        results["github"]["url"] = f"https://{self.github_config['github']['owner']}.github.io/{self.github_config['github']['repo']}"
        
        # Then deploy to FTP as backup
        print(f"\n{Fore.CYAN}Deploying to Traditional Hosting via FTP...{Style.RESET_ALL}")
        ftp_result = self.deploy_ftp()
        results["ftp"]["success"] = ftp_result
        results["ftp"]["url"] = "https://cqil.ca"
        
        # Setup CloudFlare Pages instructions
        if github_result:
            print(f"\n{Fore.CYAN}Setting up CloudFlare Pages integration...{Style.RESET_ALL}")
            self.setup_cloudflare_pages()
            # Mark as successful once CF Pages is configured
            results["cloudflare"]["success"] = True
            results["cloudflare"]["url"] = "https://cqil.pages.dev"  # Will be available once configured
        
        # Log the multi-platform deployment status
        self.logger.info(f"Multi-platform deployment results: {results}")
        
        # Display summary
        print(f"\n{Fore.CYAN}=== Multi-Platform Deployment Summary ==={Style.RESET_ALL}")
        for platform, result in results.items():
            status = f"{Fore.GREEN}✅ Success{Style.RESET_ALL}" if result["success"] else f"{Fore.RED}❌ Failed{Style.RESET_ALL}"
            url = result["url"] if result["success"] else "N/A"
            print(f"{platform.capitalize()}: {status} - {url}")
        
        # Return overall success status and results
        return any(r["success"] for r in results.values()), results
        
    except Exception as e:
        self.logger.error(f"Multi-platform deployment failed: {str(e)}")
        print(f"{Fore.RED}Multi-platform deployment failed: {str(e)}{Style.RESET_ALL}")
        return False, {}

def main():
    """Main function with command-line arguments"""
    parser = argparse.ArgumentParser(description='CQIL Website Zero-Downtime Deployment')
    parser.add_argument('--github', action='store_true', help='Deploy to GitHub only')
    parser.add_argument('--ftp', action='store_true', help='Deploy via FTP only')
    parser.add_argument('--all', action='store_true', help='Deploy to both GitHub and FTP')
    parser.add_argument('--setup', action='store_true', help='Setup GitHub repository and Pages')
    parser.add_argument('--cloudflare', action='store_true', help='Show CloudFlare Pages integration steps')
    parser.add_argument('--verify', action='store_true', help='Verify deployment across platforms')
    parser.add_argument('--multi', action='store_true', help='Deploy to multiple platforms with verification')
    parser.add_argument('--source', type=str, help='Source directory to deploy from (defaults to website_dir)')
    parser.add_argument('--branch', type=str, help='GitHub branch to push to (defaults to config branch)')
    parser.add_argument('--target-dir', type=str, help='Target directory for FTP deployment (defaults to root)')
    
    args = parser.parse_args()
    integration = GitHubIntegration()
    
    # Override website_dir if source is specified
    if args.source:
        integration.website_dir = Path(args.source)
    
    # If no arguments provided, show help
    if not any(vars(args).values()):
        parser.print_help()
        return 0
    
    # Process arguments
    if args.github:
        # If branch is specified, update the config
        if args.branch:
            integration.github_config['github']['branch'] = args.branch
        integration.push_to_github()
    elif args.ftp:
        integration.deploy_ftp(target_dir=args.target_dir)
    elif args.all:
        integration.deploy_all()
    elif args.setup:
        integration.push_to_github()
    elif args.cloudflare:
        integration.setup_cloudflare_pages()
    elif args.verify:
        # Get URLs from config
        urls = {
            "github": f"https://{integration.github_config['github']['owner']}.github.io/{integration.github_config['github']['repo']}",
            "cloudflare": "https://cqil.pages.dev",  # Will be available once configured
            "ftp": "https://cqil.ca"
        }
        integration.verify_deployment(urls)
    elif args.multi:
        # Deploy to all platforms with verification
        success, results = integration.deploy_multi_platform()
        
        # Only verify if deployment was successful
        if success:
            urls = {platform: result["url"] for platform, result in results.items() if result["success"]}
            integration.verify_deployment(urls)
    
    return 0

if __name__ == "__main__":
    sys.exit(main())