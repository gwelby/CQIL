#!/usr/bin/env python3
"""
CQIL Website Versioned Deployment System

This script integrates asset versioning with the zero-downtime deployment process,
creating optimized websites that can be cached aggressively while ensuring
users always get the latest content.
"""

import os
import sys
import json
import shutil
import logging
import argparse
import subprocess
import requests
from pathlib import Path
from datetime import datetime
from asset_versioning import AssetVersioning
from colorama import init, Fore, Style

# Initialize colorama for colored output
init()

class VersionedDeployment:
    def __init__(self):
        self.setup_logging()
        
        # Paths
        self.website_dir = Path('/mnt/d/cqil/website')
        self.temp_dir = Path('/mnt/d/cqil/website_versioned')
        self.deployed_dir = Path('/mnt/d/cqil/website_deployed')
        
        # Load GitHub deployment script if exists
        self.github_deploy_path = Path(__file__).parent / 'github_deploy.py'
        
    def setup_logging(self):
        """Configure logging"""
        log_dir = Path(__file__).parent / 'secure_logs'
        log_dir.mkdir(exist_ok=True)
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_dir / f'versioned_deploy_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def create_versioned_website(self, version=None):
        """Create a versioned copy of the website"""
        try:
            print(f"\n{Fore.CYAN}=== Creating Versioned Website ==={Style.RESET_ALL}")
            
            # Initialize asset versioning
            versioning = AssetVersioning(
                website_dir=self.website_dir,
                target_dir=self.temp_dir,
                version=version
            )
            
            # Create versioned website
            success = versioning.create_versioned_website()
            
            if not success:
                self.logger.error("Failed to create versioned website")
                print(f"{Fore.RED}Failed to create versioned website{Style.RESET_ALL}")
                return False
            
            # Get versioning manifest
            manifest_path = self.temp_dir / 'version-manifest.json'
            if manifest_path.exists():
                with open(manifest_path) as f:
                    self.version_manifest = json.load(f)
                self.logger.info(f"Loaded version manifest with {len(self.version_manifest['assets'])} assets")
            else:
                self.logger.warning("Version manifest not found")
                self.version_manifest = None
            
            return True
        except Exception as e:
            self.logger.error(f"Failed to create versioned website: {e}")
            print(f"{Fore.RED}Failed to create versioned website: {e}{Style.RESET_ALL}")
            return False
    
    def copy_to_deploy_dir(self):
        """Copy versioned website to deployment directory"""
        try:
            print(f"\n{Fore.CYAN}=== Copying to Deployment Directory ==={Style.RESET_ALL}")
            
            if self.deployed_dir.exists():
                shutil.rmtree(self.deployed_dir)
            
            # Copy versioned website to deployment directory
            shutil.copytree(self.temp_dir, self.deployed_dir)
            
            print(f"{Fore.GREEN}Copied versioned website to {self.deployed_dir}{Style.RESET_ALL}")
            self.logger.info(f"Copied versioned website to {self.deployed_dir}")
            
            return True
        except Exception as e:
            self.logger.error(f"Failed to copy to deployment directory: {e}")
            print(f"{Fore.RED}Failed to copy to deployment directory: {e}{Style.RESET_ALL}")
            return False
    
    def run_github_deploy(self, multi=False):
        """Run the GitHub deployment script"""
        try:
            if not self.github_deploy_path.exists():
                self.logger.warning(f"GitHub deployment script not found at {self.github_deploy_path}")
                print(f"{Fore.YELLOW}GitHub deployment script not found at {self.github_deploy_path}{Style.RESET_ALL}")
                return False
            
            print(f"\n{Fore.CYAN}=== Running GitHub Deployment ==={Style.RESET_ALL}")
            
            # Determine which command to run
            cmd = [sys.executable, str(self.github_deploy_path)]
            if multi:
                cmd.append('--multi')
            else:
                cmd.append('--all')
            
            # Run the command
            print(f"Running: {' '.join(cmd)}")
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                print(f"{Fore.GREEN}GitHub deployment successful{Style.RESET_ALL}")
                self.logger.info("GitHub deployment successful")
                return True
            else:
                print(f"{Fore.RED}GitHub deployment failed{Style.RESET_ALL}")
                print(f"Error: {result.stderr}")
                self.logger.error(f"GitHub deployment failed: {result.stderr}")
                return False
        except Exception as e:
            self.logger.error(f"Failed to run GitHub deployment: {e}")
            print(f"{Fore.RED}Failed to run GitHub deployment: {e}{Style.RESET_ALL}")
            return False
    
    def configure_cloudflare_cache(self):
        """Configure CloudFlare cache settings for versioned assets"""
        try:
            print(f"\n{Fore.CYAN}=== Configuring CloudFlare Cache Settings ==={Style.RESET_ALL}")
            
            # Check if the cache headers file exists
            cache_headers_path = self.deployed_dir / 'cache-headers.json'
            if cache_headers_path.exists():
                with open(cache_headers_path, 'r') as f:
                    cache_headers = json.load(f)
                
                # Count header types
                header_counts = {}
                for _, headers in cache_headers.items():
                    cache_control = headers.get('Cache-Control', 'unknown')
                    header_counts[cache_control] = header_counts.get(cache_control, 0) + 1
                
                # Print summary of cache headers
                print(f"{Fore.GREEN}Cache headers prepared for {len(cache_headers)} files:{Style.RESET_ALL}")
                for header, count in header_counts.items():
                    print(f"  {header}: {count} files")
            
            # Check if the documentation exists
            cloudflare_rules_path = Path(__file__).parent / 'CLOUDFLARE_CACHE_RULES.md'
            if cloudflare_rules_path.exists():
                print(f"\n{Fore.GREEN}Detailed CloudFlare cache configuration instructions are available at:{Style.RESET_ALL}")
                print(f"  {cloudflare_rules_path}")
                print(f"\n{Fore.YELLOW}Please follow these instructions to configure CloudFlare Page Rules.{Style.RESET_ALL}")
            else:
                # Fallback to inline instructions if the document doesn't exist
                print(f"{Fore.YELLOW}CloudFlare cache configuration requires manual setup.{Style.RESET_ALL}")
                print("Please configure the following in your CloudFlare dashboard:")
                print("")
                print("1. Health Check Bypass (Highest Priority):")
                print("   - URL Pattern: *cqil.ca/health*")
                print("   - Cache Level: Bypass")
                print("   - Edge Cache TTL: No store")
                print("   - Browser Cache TTL: No store")
                print("")
                print("2. API Endpoints Bypass:")
                print("   - URL Pattern: *cqil.ca/api/*")
                print("   - Cache Level: Bypass")
                print("   - Edge Cache TTL: 2 minutes")
                print("   - Browser Cache TTL: No store")
                print("")
                print("3. Versioned Assets (Long-term Cache):")
                print("   - URL Pattern: *cqil.ca/*.[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f].*")
                print("   - Cache Level: Cache Everything")
                print("   - Edge Cache TTL: 1 month (2592000 seconds)")
                print("   - Browser Cache TTL: 1 month")
                print("")
                print("4. HTML Files (Short-term Cache):")
                print("   - URL Pattern: *cqil.ca/*.html")
                print("   - Cache Level: Standard")
                print("   - Edge Cache TTL: 2 hours (7200 seconds)")
                print("   - Browser Cache TTL: 30 minutes (1800 seconds)")
                print("")
                print("5. CSS/JS Files (Medium-term Cache for Non-versioned):")
                print("   - URL Pattern: *cqil.ca/*.(css|js)")
                print("   - Cache Level: Standard")
                print("   - Edge Cache TTL: 1 day (86400 seconds)")
                print("   - Browser Cache TTL: 4 hours (14400 seconds)")
                print("")
                print("6. General Content (Default Rule):")
                print("   - URL Pattern: *cqil.ca/*")
                print("   - Cache Level: Standard")
                print("   - Edge Cache TTL: 4 hours (14400 seconds)")
                print("   - Browser Cache TTL: 1 hour (3600 seconds)")
            
            # Verification steps
            print(f"\n{Fore.CYAN}After configuring the page rules, verify with these commands:{Style.RESET_ALL}")
            print("curl -I https://cqil.ca/css/style.[hash].css  # Should have 1 month cache")
            print("curl -I https://cqil.ca/index.html            # Should have 30min-2hr cache")
            print("curl -I https://cqil.ca/health-check.html     # Should have no-cache headers")
            print("curl -I https://cqil.ca/api/health            # Should have 2min cache or no-cache")
            
            self.logger.info("Provided CloudFlare cache configuration instructions")
            return True
        except Exception as e:
            self.logger.error(f"Failed to configure CloudFlare cache: {e}")
            print(f"{Fore.RED}Failed to configure CloudFlare cache: {e}{Style.RESET_ALL}")
            return False
    
    def verify_deployment(self):
        """Verify the deployment across all platforms"""
        try:
            print(f"\n{Fore.CYAN}=== Verifying Deployment ==={Style.RESET_ALL}")
            
            # Run the GitHub verification
            cmd = [sys.executable, str(self.github_deploy_path), '--verify']
            print(f"Running: {' '.join(cmd)}")
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            output = result.stdout + result.stderr
            
            # Print the output
            print(output)
            
            # Check if verification was successful
            if "Overall Verification: ✅ Passed" in output:
                print(f"{Fore.GREEN}Deployment verification successful{Style.RESET_ALL}")
                self.logger.info("Deployment verification successful")
                return True
            else:
                print(f"{Fore.YELLOW}Deployment verification had issues - check the output above{Style.RESET_ALL}")
                self.logger.warning("Deployment verification had issues")
                return False
            
        except Exception as e:
            self.logger.error(f"Failed to verify deployment: {e}")
            print(f"{Fore.RED}Failed to verify deployment: {e}{Style.RESET_ALL}")
            return False
    
    def run_versioned_deployment(self, multi=False, verify=True, cache_config=True, version=None):
        """Run the full versioned deployment process"""
        try:
            print(f"\n{Fore.CYAN}=== CQIL Website Versioned Deployment ==={Style.RESET_ALL}")
            print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            
            # Step 1: Create versioned website
            if not self.create_versioned_website(version=version):
                return False
            
            # Step 2: Copy to deployment directory
            if not self.copy_to_deploy_dir():
                return False
            
            # Step 3: Run GitHub deployment (only if not using a custom output directory)
            if self.temp_dir == Path('/mnt/d/cqil/website_versioned'):
                if not self.run_github_deploy(multi=multi):
                    print(f"{Fore.YELLOW}GitHub deployment had issues, but continuing...{Style.RESET_ALL}")
            else:
                print(f"{Fore.YELLOW}Skipping GitHub deployment as custom output directory is being used{Style.RESET_ALL}")
            
            # Step 4: Configure CloudFlare cache (instructions)
            if cache_config:
                self.configure_cloudflare_cache()
            
            # Step 5: Verify deployment (only if not using a custom output directory)
            if verify and self.temp_dir == Path('/mnt/d/cqil/website_versioned'):
                self.verify_deployment()
            
            # Success
            print(f"\n{Fore.GREEN}Versioned deployment completed!{Style.RESET_ALL}")
            
            # Display manifest summary if available
            if self.version_manifest:
                print(f"\nVersion: {self.version_manifest['version']}")
                print(f"Timestamp: {self.version_manifest['timestamp']}")
                print(f"Versioned assets: {len(self.version_manifest['assets'])}")
            
            return True
        except Exception as e:
            self.logger.error(f"Versioned deployment failed: {e}")
            print(f"{Fore.RED}Versioned deployment failed: {e}{Style.RESET_ALL}")
            return False

def main():
    """Main function with command-line arguments"""
    parser = argparse.ArgumentParser(description='CQIL Website Versioned Deployment')
    parser.add_argument('--multi', action='store_true', help='Use multi-platform deployment')
    parser.add_argument('--no-verify', action='store_true', help='Skip verification step')
    parser.add_argument('--no-cache-config', action='store_true', help='Skip CloudFlare cache configuration')
    parser.add_argument('--output', type=str, help='Output directory for versioned website')
    parser.add_argument('--version', type=str, help='Specific version identifier to use')
    
    args = parser.parse_args()
    
    deployment = VersionedDeployment()
    
    # If output directory is specified, override the default
    if args.output:
        deployment.temp_dir = Path(args.output)
        deployment.deployed_dir = Path(args.output)
    
    # If version is specified, we'll pass it to the asset versioning process
    version = args.version if args.version else None
    
    success = deployment.run_versioned_deployment(
        multi=args.multi,
        verify=not args.no_verify,
        cache_config=not args.no_cache_config,
        version=version
    )
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())