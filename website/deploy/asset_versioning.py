#!/usr/bin/env python3
"""
CQIL Website Asset Versioning System

This script generates versioned assets by adding content hashes to filenames
and updates references in HTML, CSS, and JS files. This enables aggressive
caching while ensuring users always get the latest content.
"""

import os
import sys
import re
import json
import hashlib
import shutil
import logging
import argparse
from pathlib import Path
from datetime import datetime
from colorama import init, Fore, Style

# Initialize colorama for colored output
init()

class AssetVersioning:
    def __init__(self, website_dir=None, target_dir=None, version=None):
        self.setup_logging()
        self.website_dir = Path(website_dir) if website_dir else Path('/mnt/d/cqil/website')
        self.target_dir = Path(target_dir) if target_dir else Path('/mnt/d/cqil/website_versioned')
        
        # Define asset directories and file extensions
        self.asset_dirs = ['css', 'js', 'img', 'assets', 'images']
        self.css_exts = ['.css', '.scss', '.less']
        self.js_exts = ['.js', '.jsx', '.ts', '.tsx']
        self.html_exts = ['.html', '.htm']
        self.img_exts = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico']
        
        # Version string (custom or auto-generated)
        version_str = version if version else datetime.now().strftime('%Y%m%d%H%M%S')
        
        # Manifest to track original to versioned file mappings
        self.manifest = {
            'version': version_str,
            'timestamp': datetime.now().isoformat(),
            'assets': {}
        }
        
        # Cache headers for different file types
        self.cache_headers = {
            'versioned': {
                'Cache-Control': 'public, max-age=2592000, immutable',  # 30 days
            },
            'html': {
                'Cache-Control': 'public, max-age=1800',  # 30 minutes
            },
            'css_js': {
                'Cache-Control': 'public, max-age=14400',  # 4 hours
            },
            'default': {
                'Cache-Control': 'public, max-age=3600',  # 1 hour
            },
            'health': {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
            'api': {
                'Cache-Control': 'max-age=120',  # 2 minutes
            }
        }
    
    def setup_logging(self):
        """Configure logging"""
        log_dir = Path(__file__).parent / 'secure_logs'
        log_dir.mkdir(exist_ok=True)
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_dir / f'versioning_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def calculate_file_hash(self, file_path):
        """Calculate a content hash for a file"""
        hasher = hashlib.md5()
        with open(file_path, 'rb') as f:
            buf = f.read(65536)  # Read in 64k chunks
            while len(buf) > 0:
                hasher.update(buf)
                buf = f.read(65536)
        return hasher.hexdigest()[:10]  # Use first 10 chars of hash
    
    def copy_directory_structure(self):
        """Create the target directory structure"""
        try:
            if self.target_dir.exists():
                shutil.rmtree(self.target_dir)
            
            # Create target directory
            self.target_dir.mkdir(exist_ok=True, parents=True)
            
            print(f"{Fore.GREEN}Created target directory: {self.target_dir}{Style.RESET_ALL}")
            self.logger.info(f"Created target directory: {self.target_dir}")
            
            return True
        except Exception as e:
            self.logger.error(f"Failed to create directory structure: {e}")
            print(f"{Fore.RED}Failed to create directory structure: {e}{Style.RESET_ALL}")
            return False
    
    def copy_and_version_assets(self, dry_run=False):
        """Copy all files and version assets"""
        try:
            if not dry_run and not self.copy_directory_structure():
                return False
            
            print(f"\n{Fore.CYAN}=== Copying and Versioning Assets ==={Style.RESET_ALL}")
            
            # Track which asset files will be versioned
            asset_files = []
            
            # First pass: identify all asset files to version
            for root, dirs, files in os.walk(self.website_dir):
                rel_path = os.path.relpath(root, self.website_dir)
                
                # Skip if it's the target directory or hidden directory
                if root.startswith(str(self.target_dir)) or any(part.startswith('.') for part in Path(rel_path).parts):
                    continue
                    
                # Identify assets to version
                for file in files:
                    file_path = Path(root) / file
                    file_ext = file_path.suffix.lower()
                    
                    # Determine if this is an asset file to version
                    is_asset = (
                        any(asset_dir in file_path.parts for asset_dir in self.asset_dirs) or
                        file_ext in self.css_exts + self.js_exts + self.img_exts
                    )
                    
                    if is_asset:
                        asset_files.append(file_path)
            
            # Second pass: copy and version files
            total_files = 0
            versioned_files = 0
            
            for root, dirs, files in os.walk(self.website_dir):
                rel_path = os.path.relpath(root, self.website_dir)
                
                # Skip if it's the target directory or hidden directory
                if root.startswith(str(self.target_dir)) or any(part.startswith('.') for part in Path(rel_path).parts):
                    continue
                
                # Create corresponding directory in target
                target_root = self.target_dir / rel_path
                if not dry_run:
                    target_root.mkdir(exist_ok=True, parents=True)
                
                # Process files
                for file in files:
                    file_path = Path(root) / file
                    file_ext = file_path.suffix.lower()
                    rel_file_path = file_path.relative_to(self.website_dir)
                    
                    # Determine if this is an asset file to version
                    is_asset = file_path in asset_files
                    
                    if is_asset:
                        # Version the asset file
                        content_hash = self.calculate_file_hash(file_path)
                        versioned_name = f"{file_path.stem}.{content_hash}{file_path.suffix}"
                        target_path = target_root / versioned_name
                        
                        # Add to manifest
                        original_path = str(rel_file_path).replace('\\', '/')
                        versioned_path = str(target_path.relative_to(self.target_dir)).replace('\\', '/')
                        self.manifest['assets'][original_path] = versioned_path
                        
                        if not dry_run:
                            shutil.copy2(file_path, target_path)
                        
                        versioned_files += 1
                        self.logger.info(f"Versioned: {rel_file_path} -> {versioned_name}")
                        
                        if versioned_files % 20 == 0 or total_files % 100 == 0:
                            print(f"{Fore.GREEN}Versioned {versioned_files} assets of {total_files} total files{Style.RESET_ALL}")
                    else:
                        # Just copy the file without versioning
                        target_path = target_root / file
                        
                        if not dry_run:
                            shutil.copy2(file_path, target_path)
                    
                    total_files += 1
            
            # Write the manifest file
            manifest_path = self.target_dir / 'version-manifest.json'
            if not dry_run:
                with open(manifest_path, 'w') as f:
                    json.dump(self.manifest, f, indent=2)
            
            print(f"\n{Fore.GREEN}Completed: Versioned {versioned_files} assets of {total_files} total files{Style.RESET_ALL}")
            self.logger.info(f"Completed: Versioned {versioned_files} assets of {total_files} total files")
            
            return True
        except Exception as e:
            self.logger.error(f"Failed to copy and version assets: {e}")
            print(f"{Fore.RED}Failed to copy and version assets: {e}{Style.RESET_ALL}")
            return False
    
    def update_references(self, dry_run=False):
        """Update references to versioned assets in HTML, CSS and JS files"""
        try:
            print(f"\n{Fore.CYAN}=== Updating References to Versioned Assets ==={Style.RESET_ALL}")
            
            # Get all HTML, CSS, and JS files in the target directory
            html_files = []
            css_files = []
            js_files = []
            
            for root, _, files in os.walk(self.target_dir):
                for file in files:
                    file_path = Path(root) / file
                    file_ext = file_path.suffix.lower()
                    
                    if file_ext in self.html_exts:
                        html_files.append(file_path)
                    elif file_ext in self.css_exts:
                        css_files.append(file_path)
                    elif file_ext in self.js_exts:
                        js_files.append(file_path)
            
            # Create lookup dictionaries for replacements
            # Original path -> versioned path
            replacements = {}
            for orig_path, versioned_path in self.manifest['assets'].items():
                orig_basename = os.path.basename(orig_path)
                orig_dirname = os.path.dirname(orig_path)
                
                # Add multiple variants of the path for replacement
                replacements[orig_path] = versioned_path  # Full path: css/style.css -> css/style.abcdef.css
                replacements[orig_basename] = os.path.basename(versioned_path)  # Just filename: style.css -> style.abcdef.css
                
                # Handle relative paths and directory structures
                for asset_dir in self.asset_dirs:
                    if asset_dir in orig_path:
                        rel_to_dir = orig_path.split(asset_dir + '/')[-1]
                        replacements[rel_to_dir] = versioned_path.split(asset_dir + '/')[-1]
            
            # Update HTML files
            updated_files = 0
            for file_path in html_files + css_files + js_files:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                original_content = content
                
                # Update references in href, src attributes and CSS url() functions
                for orig_path, versioned_path in replacements.items():
                    # Skip references to HTML files
                    if any(orig_path.endswith(ext) for ext in self.html_exts):
                        continue
                    
                    # Handle various formats of references
                    content = re.sub(r'(href=["\'])' + re.escape(orig_path) + r'(["\'])', r'\1' + versioned_path + r'\2', content)
                    content = re.sub(r'(src=["\'])' + re.escape(orig_path) + r'(["\'])', r'\1' + versioned_path + r'\2', content)
                    content = re.sub(r'(url\(["\']?)' + re.escape(orig_path) + r'(["\']?\))', r'\1' + versioned_path + r'\2', content)
                    
                    # Handle import statements in CSS and JS
                    content = re.sub(r'(@import\s+["\'])' + re.escape(orig_path) + r'(["\'])', r'\1' + versioned_path + r'\2', content)
                
                # Only write if content changed
                if content != original_content:
                    if not dry_run:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(content)
                    
                    updated_files += 1
                    self.logger.info(f"Updated references in: {file_path.relative_to(self.target_dir)}")
            
            print(f"{Fore.GREEN}Updated references in {updated_files} files{Style.RESET_ALL}")
            self.logger.info(f"Updated references in {updated_files} files")
            
            return True
        except Exception as e:
            self.logger.error(f"Failed to update references: {e}")
            print(f"{Fore.RED}Failed to update references: {e}{Style.RESET_ALL}")
            return False
    
    def get_cache_headers(self, filename):
        """Get the appropriate cache headers for a file based on its type and versioning"""
        # Check if this is a versioned file
        if re.search(r'\.[0-9a-f]{10}\.', filename):
            return self.cache_headers['versioned']
        
        # Check for health files
        if 'health' in filename:
            return self.cache_headers['health']
        
        # Check for API files
        if '/api/' in filename:
            return self.cache_headers['api']
        
        # Check for HTML files
        if any(filename.endswith(ext) for ext in self.html_exts):
            return self.cache_headers['html']
        
        # Check for CSS/JS files
        if any(filename.endswith(ext) for ext in self.css_exts + self.js_exts):
            return self.cache_headers['css_js']
        
        # Default for all other files
        return self.cache_headers['default']
    
    def write_cache_headers_metadata(self, dry_run=False):
        """Write cache headers metadata file for all files in the target directory"""
        try:
            print(f"\n{Fore.CYAN}=== Setting Cache Headers ==={Style.RESET_ALL}")
            
            # Create cache headers mapping
            cache_headers_mapping = {}
            
            for root, _, files in os.walk(self.target_dir):
                for file in files:
                    file_path = Path(root) / file
                    rel_path = file_path.relative_to(self.target_dir)
                    headers = self.get_cache_headers(str(rel_path))
                    
                    cache_headers_mapping[str(rel_path).replace('\\', '/')] = headers
            
            # Write cache headers mapping to a file
            cache_headers_path = self.target_dir / 'cache-headers.json'
            if not dry_run:
                with open(cache_headers_path, 'w') as f:
                    json.dump(cache_headers_mapping, f, indent=2)
            
            # Count header types
            header_counts = {}
            for _, headers in cache_headers_mapping.items():
                cache_control = headers.get('Cache-Control', 'unknown')
                header_counts[cache_control] = header_counts.get(cache_control, 0) + 1
            
            # Print summary
            print(f"{Fore.GREEN}Cache headers metadata created for {len(cache_headers_mapping)} files:{Style.RESET_ALL}")
            for header, count in header_counts.items():
                print(f"  {header}: {count} files")
            
            return True
        except Exception as e:
            self.logger.error(f"Failed to write cache headers metadata: {e}")
            print(f"{Fore.RED}Failed to write cache headers metadata: {e}{Style.RESET_ALL}")
            return False
    
    def create_versioned_website(self, dry_run=False):
        """Main method to version assets and update references"""
        try:
            print(f"\n{Fore.CYAN}=== Creating Versioned Website ==={Style.RESET_ALL}")
            print(f"Source directory: {self.website_dir}")
            print(f"Target directory: {self.target_dir}")
            
            if dry_run:
                print(f"{Fore.YELLOW}Running in DRY RUN mode - no files will be created{Style.RESET_ALL}")
            
            # Step 1: Copy and version assets
            if not self.copy_and_version_assets(dry_run):
                return False
            
            # Step 2: Update references to versioned assets
            if not self.update_references(dry_run):
                return False
            
            # Step 3: Write cache headers metadata
            if not self.write_cache_headers_metadata(dry_run):
                return False
            
            # Success
            print(f"\n{Fore.GREEN}Successfully created versioned website!{Style.RESET_ALL}")
            print(f"Source: {self.website_dir}")
            print(f"Target: {self.target_dir}")
            
            if not dry_run:
                print(f"\nVersion manifest created at: {self.target_dir / 'version-manifest.json'}")
                print(f"Cache headers metadata created at: {self.target_dir / 'cache-headers.json'}")
                print(f"Asset mappings:")
                for i, (orig, versioned) in enumerate(list(self.manifest['assets'].items())[:5]):
                    print(f"  {orig} -> {versioned}")
                
                if len(self.manifest['assets']) > 5:
                    print(f"  ... and {len(self.manifest['assets']) - 5} more assets")
            
            return True
        except Exception as e:
            self.logger.error(f"Failed to create versioned website: {e}")
            print(f"{Fore.RED}Failed to create versioned website: {e}{Style.RESET_ALL}")
            return False

def main():
    """Main function with command-line arguments"""
    parser = argparse.ArgumentParser(description='CQIL Website Asset Versioning')
    parser.add_argument('--source', type=str, help='Source website directory')
    parser.add_argument('--target', type=str, help='Target directory for versioned website')
    parser.add_argument('--dry-run', action='store_true', help='Dry run (no files created)')
    parser.add_argument('--version', type=str, help='Specific version identifier to use')
    
    args = parser.parse_args()
    
    versioning = AssetVersioning(
        website_dir=args.source,
        target_dir=args.target,
        version=args.version
    )
    
    success = versioning.create_versioned_website(dry_run=args.dry_run)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())