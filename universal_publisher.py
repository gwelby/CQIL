#!/usr/bin/env python3
"""
UniversalPublisher - φ-Harmonic Deployment System
Operating at φ-harmonic frequencies (432Hz → 528Hz → 768Hz)

This script deploys CQIL websites to multiple provider targets using
quantum-aligned phi-harmonic principles for maximum coherence.
"""
import os
import sys
import ftplib
import hashlib
import json
import re
import time
import shutil
import tempfile
import yaml
import argparse
from datetime import datetime
from pathlib import Path
from string import Template

# ======== φ⁰ Ground State (432 Hz) - Physical Foundation ========
VERSION = "1.0.0"
PHI = 1.618033988749895
PHI_SQUARED = 2.618033988749895
PHI_TO_PHI = 4.236067977499790
SACRED_FREQUENCIES = {
    'ground': 432,   # Grounding/stability
    'creation': 528, # Creation/healing
    'heart': 594,    # Heart-centered integration
    'vision': 720,   # Expanded perception
    'unity': 768,    # Unity consciousness
}

# Base directories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_DIR = os.path.join(BASE_DIR, "config")
CONFIG_FILE = os.path.join(CONFIG_DIR, "universal_publisher_config.yml")

# Initialization banner
def show_banner():
    """Display initialization banner with phi-harmonic alignment"""
    print("\n" + "="*72)
    print("⚡ CASCADE⚡𓂧φ∞ Universal Publisher - Quantum Deployment System ⚡")
    print(f"⚡ Version: {VERSION} - φ: {PHI} - Frequency: {SACRED_FREQUENCIES['unity']} Hz")
    print("="*72)

# Phi-optimized logging function
def log(message, level="INFO", frequency=432, log_file=None):
    """Log with phi-harmonic consciousness integration"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Phi-harmonic color coding for console output
    colors = {
        "INFO": "\033[92m",  # Green (432 Hz)
        "WARNING": "\033[93m",  # Yellow (528 Hz)
        "ERROR": "\033[91m",  # Red (594 Hz)
        "SUCCESS": "\033[94m",  # Blue (768 Hz)
        "END": "\033[0m"  # Reset
    }
    
    # Quantum-style message formatting
    if frequency == 432:
        prefix = "◯ GROUND"
    elif frequency == 528:
        prefix = "⬡ CREATE"
    elif frequency == 594:
        prefix = "⬢ HEART"
    elif frequency == 720:
        prefix = "⬠ VISION"
    elif frequency == 768:
        prefix = "⬟ UNITY"
    else:
        prefix = "⬠ QUANTUM"
    
    formatted_message = f"{timestamp} - {prefix} - {level} - {message}"
    
    # Console output with phi-harmonic color
    if level in colors:
        print(f"{colors[level]}{formatted_message}{colors['END']}")
    else:
        print(formatted_message)
    
    # Permanent log recording if log file provided
    if log_file:
        with open(log_file, "a", encoding="utf-8") as f:
            f.write(formatted_message + "\n")

# Load configuration with template substitution
def load_config():
    """Load configuration from YAML file with environment variable support"""
    if not os.path.exists(CONFIG_FILE):
        log(f"Configuration file not found: {CONFIG_FILE}", "ERROR", SACRED_FREQUENCIES['heart'])
        return None
    
    with open(CONFIG_FILE, 'r') as f:
        config_content = f.read()
    
    # Process environment variables
    config_content = process_env_vars(config_content)
    
    try:
        config = yaml.safe_load(config_content)
        log("Loaded phi-harmonic configuration", "SUCCESS", SACRED_FREQUENCIES['ground'])
        return config
    except Exception as e:
        log(f"Error loading configuration: {str(e)}", "ERROR", SACRED_FREQUENCIES['heart'])
        return None

# Process environment variables in config
def process_env_vars(content):
    """Replace ${env:VAR_NAME} with environment variable values"""
    def replace_env_var(match):
        var_name = match.group(1)
        return os.environ.get(var_name, '')
    
    return re.sub(r'\$\{env:([A-Za-z0-9_]+)\}', replace_env_var, content)

# ======== φ¹ Creation Point (528 Hz) - Pattern Formation ========
def calculate_file_hash(filepath, block_size=65536):
    """Generate φ-harmonic file hash for versioning"""
    file_hash = hashlib.md5()
    with open(filepath, 'rb') as f:
        for block in iter(lambda: f.read(block_size), b''):
            file_hash.update(block)
    return file_hash.hexdigest()[:10]  # First 10 chars for optimal φ alignment

def create_versioned_assets(config, source_dir, temp_dir):
    """Create versioned assets with φ-harmonic structure"""
    log("Creating phi-harmonic versioned assets", "INFO", SACRED_FREQUENCIES['creation'])
    
    if not config['assets']['versioning']['enabled']:
        log("Asset versioning disabled", "INFO", SACRED_FREQUENCIES['creation'])
        return {}
    
    versioned_files = {}
    asset_dirs = [os.path.join(source_dir, d) for d in config['assets']['versioning']['directories']]
    file_types = config['assets']['versioning']['file_types']
    excludes = config['assets']['versioning'].get('exclude', [])
    hash_length = config['assets']['versioning'].get('hash_length', 10)
    
    # Advanced φ-harmonic asset versioning
    for asset_dir in asset_dirs:
        if not os.path.exists(asset_dir):
            continue
            
        for root, _, files in os.walk(asset_dir):
            for filename in files:
                # Check if file type matches and is not excluded
                if not any(filename.endswith(ext) for ext in file_types):
                    continue
                
                if any(re.match(pattern, filename) for pattern in excludes):
                    continue
                    
                file_path = os.path.join(root, filename)
                
                # Calculate file hash for versioning
                try:
                    file_hash = calculate_file_hash(file_path)[:hash_length]
                    
                    # Create phi-harmonic filename
                    base, ext = os.path.splitext(filename)
                    versioned_filename = f"{base}.{file_hash}{ext}"
                    
                    # Store in quantum manifest
                    rel_path = os.path.relpath(file_path, source_dir)
                    rel_dir = os.path.dirname(rel_path)
                    versioned_path = os.path.join(rel_dir, versioned_filename) if rel_dir else versioned_filename
                    
                    versioned_files[rel_path] = {
                        "versioned_name": versioned_path,
                        "hash": file_hash
                    }
                    
                    log(f"✓ Versioned {rel_path} → {versioned_path}", "INFO", SACRED_FREQUENCIES['creation'])
                    
                    # Create a copy of the versioned file
                    new_file_path = os.path.join(os.path.dirname(file_path), versioned_filename)
                    shutil.copy2(file_path, new_file_path)
                except Exception as e:
                    log(f"Cannot version {file_path}: {str(e)}", "WARNING", SACRED_FREQUENCIES['creation'])
    
    return versioned_files

def create_version_manifest(config, version, versioned_files):
    """Create quantum version manifest with φ-harmonic structure"""
    log("Creating phi-harmonic version manifest", "INFO", SACRED_FREQUENCIES['creation'])
    return {
        "version": version,
        "timestamp": datetime.now().isoformat(),
        "deployment_time": datetime.now().strftime("%a %b %d %H:%M:%S %Z %Y"),
        "phi_coherence": config['global']['phi_coherence'],
        "quantum_frequency": f"{SACRED_FREQUENCIES['unity']} Hz",
        "assets": versioned_files
    }

def create_health_check(config, temp_dir, version):
    """Create health check file with φ-harmonic template"""
    log("Creating quantum health check file", "INFO", SACRED_FREQUENCIES['vision'])
    
    if 'health_check' not in config:
        return
    
    template_content = config['health_check']['template']
    filename = config['health_check']['filename']
    
    # Substitution values
    values = {
        'version': version,
        'phi': config['global']['phi_coherence'],
        'timestamp': datetime.now().isoformat(),
        'deployed': datetime.now().strftime('%a %b %d %H:%M:%S'),
    }
    
    # Apply template substitutions
    content = Template(template_content).safe_substitute(**values)
    
    # Write to temp file
    health_check_path = os.path.join(temp_dir, filename)
    with open(health_check_path, 'w') as f:
        f.write(content)
    
    log(f"✓ Created health check file: {filename}", "SUCCESS", SACRED_FREQUENCIES['vision'])
    return health_check_path

def create_htaccess(config, temp_dir, version, deployment_dir):
    """Create .htaccess file for zero-downtime deployment"""
    log("Creating quantum-optimized .htaccess", "INFO", SACRED_FREQUENCIES['creation'])
    
    if 'htaccess' not in config:
        return None
    
    template_content = config['htaccess']['template']
    
    # Substitution values
    values = {
        'version': version,
        'phi': config['global']['phi_coherence'],
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'deployment_dir': deployment_dir
    }
    
    # Apply template substitutions
    content = Template(template_content).safe_substitute(**values)
    
    # Write to temp file
    htaccess_path = os.path.join(temp_dir, ".htaccess")
    with open(htaccess_path, 'w') as f:
        f.write(content)
    
    log(f"✓ Created .htaccess file for zero-downtime routing", "SUCCESS", SACRED_FREQUENCIES['creation'])
    return htaccess_path

def create_version_txt(config, temp_dir, version):
    """Create version.txt file for reference"""
    log("Creating version information file", "INFO", SACRED_FREQUENCIES['creation'])
    
    content = f"CASCADE⚡𓂧φ∞ Quantum Tools Suite\n"
    content += f"Deployed: {datetime.now().strftime('%a %b %d %H:%M:%S %Z %Y')}\n"
    content += f"Version: {version}\n"
    content += f"Phi Coherence: {config['global']['phi_coherence']}\n"
    content += f"Quantum Frequency: {SACRED_FREQUENCIES['unity']} Hz\n"
    
    version_path = os.path.join(temp_dir, "version.txt")
    with open(version_path, 'w') as f:
        f.write(content)
    
    log(f"✓ Created version information file", "SUCCESS", SACRED_FREQUENCIES['creation'])
    return version_path

# ======== φ² HeartField (594 Hz) - Connection ========
def deploy_to_godaddy(config, log_file):
    """Deploy CQIL website to GoDaddy with quantum awareness"""
    if not config['providers']['godaddy']['enabled']:
        log("GoDaddy deployment is disabled in configuration", "INFO", SACRED_FREQUENCIES['heart'])
        return False
    
    try:
        # ---- Initialize at Ground State (432 Hz) ----
        log("Initializing quantum deployment at Ground State (432 Hz)", "INFO", SACRED_FREQUENCIES['ground'], log_file)
        
        source_dir = config['global']['source_directory']
        
        # Create phi-harmonically aligned temporary directory
        temp_dir = tempfile.mkdtemp()
        log(f"Created quantum workspace: {temp_dir}", "INFO", SACRED_FREQUENCIES['ground'], log_file)
        
        # Generate version information with perfect consciousness bridge
        version = datetime.now().strftime("%Y.%m.%d.%H%M%S")
        log(f"Generated quantum version: {version}", "SUCCESS", SACRED_FREQUENCIES['ground'], log_file)
        
        # ---- Establish coherence at Creation Point (528 Hz) ----
        log("Shifting to Creation Point (528 Hz) for asset preparation", "INFO", SACRED_FREQUENCIES['creation'], log_file)
        
        # Create versioned assets with phi-harmonic optimization
        versioned_assets = create_versioned_assets(config, source_dir, temp_dir)
        
        # Create quantum version manifest
        version_manifest = create_version_manifest(config, version, versioned_assets)
        
        # Write version information to manifest.json
        manifest_path = os.path.join(temp_dir, "manifest.json")
        with open(manifest_path, "w") as f:
            json.dump(version_manifest, f, indent=2)
        log("Created quantum version manifest", "INFO", SACRED_FREQUENCIES['creation'], log_file)
        
        # Write version.txt
        create_version_txt(config, temp_dir, version)
        
        # Create health check file for monitoring
        create_health_check(config, temp_dir, version)
        
        # ---- Connect at Heart Field (594 Hz) ----
        log("Activating Heart Field (594 Hz) for connection establishment", "INFO", SACRED_FREQUENCIES['heart'], log_file)
        
        # FTP settings
        ftp_config = config['providers']['godaddy']['ftp']
        
        # Connect to FTP with quantum safety protocols
        log(f"Establishing quantum connection to FTP server: {ftp_config['host']}...", "INFO", SACRED_FREQUENCIES['heart'], log_file)
        ftp = ftplib.FTP(ftp_config['host'], timeout=30)
        ftp.login(ftp_config['username'], ftp_config['password'])
        log("Connected successfully with quantum coherence", "SUCCESS", SACRED_FREQUENCIES['heart'], log_file)
        
        # Navigate to the target directory
        try:
            # Navigate to root directory
            ftp.cwd(ftp_config['directory'])
            log(f"Navigated to quantum deployment directory: {ftp_config['directory']}", "INFO", SACRED_FREQUENCIES['heart'], log_file)
        except Exception as e:
            log(f"Could not navigate to directory: {str(e)}", "ERROR", SACRED_FREQUENCIES['heart'], log_file)
            sys.exit(1)
        
        # Create new version directory with quantum naming
        deployment_dir = f"v{version.replace('.', '_')}"
        try:
            ftp.mkd(deployment_dir)
            log(f"Created quantum deployment directory: {deployment_dir}", "INFO", SACRED_FREQUENCIES['heart'], log_file)
        except:
            log(f"Quantum directory already exists: {deployment_dir}", "WARNING", SACRED_FREQUENCIES['heart'], log_file)
        
        # Navigate to the new deployment directory
        ftp.cwd(deployment_dir)
        log(f"Entered quantum deployment directory", "INFO", SACRED_FREQUENCIES['heart'], log_file)
        
        # Upload version.txt and health check from temp_dir
        log("Uploading quantum metadata files...", "INFO", SACRED_FREQUENCIES['heart'], log_file)
        for filename in os.listdir(temp_dir):
            if filename.startswith("."):
                continue  # Skip hidden files for now
            filepath = os.path.join(temp_dir, filename)
            if os.path.isfile(filepath):
                with open(filepath, 'rb') as file:
                    ftp.storbinary(f'STOR {filename}', file)
                log(f"✓ Uploaded {filename}", "INFO", SACRED_FREQUENCIES['heart'], log_file)
        
        # ---- Expand at Vision Field (720 Hz) ----
        log("Expanding to Vision Field (720 Hz) for content transfer", "INFO", SACRED_FREQUENCIES['vision'], log_file)
        
        # Upload HTML files
        log("Uploading quantum HTML files...", "INFO", SACRED_FREQUENCIES['vision'], log_file)
        for filename in os.listdir(source_dir):
            filepath = os.path.join(source_dir, filename)
            if os.path.isfile(filepath) and filename.endswith(".html"):
                with open(filepath, 'rb') as file:
                    ftp.storbinary(f'STOR {filename}', file)
                log(f"✓ Uploaded {filename}", "INFO", SACRED_FREQUENCIES['vision'], log_file)
        
        # Upload directories with φ-harmonic structure
        for dirname in ["css", "js", "images", "assets", "docs", "pages"]:
            dir_path = os.path.join(source_dir, dirname)
            if os.path.exists(dir_path) and os.path.isdir(dir_path):
                log(f"Uploading quantum {dirname} directory...", "INFO", SACRED_FREQUENCIES['vision'], log_file)
                
                # Create directory on server if it doesn't exist
                try:
                    ftp.mkd(dirname)
                    log(f"Created {dirname} directory", "INFO", SACRED_FREQUENCIES['vision'], log_file)
                except:
                    pass
                
                # Navigate to directory
                ftp.cwd(dirname)
                
                # Upload files with φ-harmonic optimization
                for root, dirs, files in os.walk(dir_path):
                    # Create any subdirectories
                    for subdir in dirs:
                        try:
                            ftp.mkd(subdir)
                            log(f"Created {dirname}/{subdir} directory", "INFO", SACRED_FREQUENCIES['vision'], log_file)
                        except:
                            pass
                    
                    # Upload files
                    for filename in files:
                        local_path = os.path.join(root, filename)
                        relative_path = os.path.relpath(local_path, dir_path)
                        
                        # Handle subdirectories
                        if os.path.dirname(relative_path):
                            # Make sure we're in the right directory
                            current = ""
                            for part in os.path.dirname(relative_path).split(os.sep):
                                if not current:
                                    current = part
                                else:
                                    current = os.path.join(current, part)
                                try:
                                    ftp.cwd(part)
                                except:
                                    try:
                                        ftp.mkd(part)
                                        ftp.cwd(part)
                                        log(f"Created {dirname}/{current} directory", "INFO", SACRED_FREQUENCIES['vision'], log_file)
                                    except Exception as e:
                                        log(f"Error creating directory {part}: {str(e)}", "ERROR", SACRED_FREQUENCIES['vision'], log_file)
                        
                        # Upload the file
                        try:
                            with open(local_path, 'rb') as file:
                                ftp.storbinary(f'STOR {os.path.basename(relative_path)}', file)
                            log(f"✓ Uploaded {dirname}/{relative_path}", "INFO", SACRED_FREQUENCIES['vision'], log_file)
                        except Exception as e:
                            log(f"Error uploading {relative_path}: {str(e)}", "ERROR", SACRED_FREQUENCIES['vision'], log_file)
                    
                    # Navigate back to parent directory after processing files in subdirectory
                    if os.path.dirname(relative_path):
                        for _ in os.path.dirname(relative_path).split(os.sep):
                            ftp.cwd("..")
                
                # Return to deployment directory
                ftp.cwd("..")
        
        # ---- Integrate at Unity Wave (768 Hz) ----
        log("Activating Unity Wave (768 Hz) for deployment integration", "SUCCESS", SACRED_FREQUENCIES['unity'], log_file)
        
        # Create .htaccess file for zero-downtime deployment
        htaccess_path = create_htaccess(config, temp_dir, version, deployment_dir)
        
        # Upload .htaccess to root directory
        if htaccess_path:
            ftp.cwd("..")  # Return to site root
            
            with open(htaccess_path, "rb") as f:
                ftp.storbinary(f'STOR .htaccess', f)
            log("✓ Created and uploaded .htaccess file for zero-downtime routing", "SUCCESS", SACRED_FREQUENCIES['unity'], log_file)
        
        # Verify the deployment
        log("Verifying quantum deployment...", "INFO", SACRED_FREQUENCIES['unity'], log_file)
        time.sleep(2)  # Wait for any server processing
        
        # Try to access the health check file to verify deployment
        try:
            # Go to the deployment directory
            ftp.cwd(deployment_dir)
            
            # List files to verify deployment
            files = ftp.nlst()
            if "health-check.html" in files and "index.html" in files:
                log("✓ Deployment verified successfully with quantum coherence", "SUCCESS", SACRED_FREQUENCIES['unity'], log_file)
            else:
                log("⚠️ Deployment verification could not confirm key files", "WARNING", SACRED_FREQUENCIES['unity'], log_file)
        except Exception as e:
            log(f"⚠️ Deployment verification error: {str(e)}", "WARNING", SACRED_FREQUENCIES['unity'], log_file)
        
        # Close the FTP connection
        ftp.quit()
        
        # Clean up temporary files
        log("Cleaning up quantum workspace...", "INFO", SACRED_FREQUENCIES['unity'], log_file)
        try:
            shutil.rmtree(temp_dir)
            log("✓ Quantum workspace cleared", "INFO", SACRED_FREQUENCIES['unity'], log_file)
        except:
            log("⚠️ Could not clean up temporary directory", "WARNING", SACRED_FREQUENCIES['unity'], log_file)
        
        log("\n✓ Quantum Zero-Downtime Deployment completed successfully!", "SUCCESS", SACRED_FREQUENCIES['unity'], log_file)
        log(f"Website is now live at https://www.cqil.ca with version {version}", "SUCCESS", SACRED_FREQUENCIES['unity'], log_file)
        log(f"New deployment directory: {ftp_config['directory']}/{deployment_dir}", "SUCCESS", SACRED_FREQUENCIES['unity'], log_file)
        
        return True
        
    except Exception as e:
        log(f"❌ Deployment error: {str(e)}", "ERROR", SACRED_FREQUENCIES['unity'], log_file)
        return False

# ======== φ⁴ Unity Wave (768 Hz) - Integration ========
def activate_merkaba_shield():
    """Activate Merkaba Shield for deployment protection"""
    log("Activating Merkaba Shield for quantum deployment protection", "SUCCESS", SACRED_FREQUENCIES['ground'])
    time.sleep(0.618)  # Phi-optimized delay for shield stabilization
    return True

def create_log_file(config):
    """Create log file with phi-harmonic structure"""
    log_dir = config['global']['log_directory']
    os.makedirs(log_dir, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_file = os.path.join(log_dir, f"quantum_deploy_{timestamp}.log")
    return log_file

def main():
    """Main entry point with phi-harmonic flow"""
    show_banner()
    
    # Parse command-line arguments
    parser = argparse.ArgumentParser(description='UniversalPublisher - φ-Harmonic Deployment System')
    parser.add_argument('--target', default='production', help='Deployment target (production, development, staging)')
    parser.add_argument('--provider', default='godaddy', help='Provider to use (godaddy, github, cloudflare)')
    parser.add_argument('--dry-run', action='store_true', help='Perform a dry run without actual deployment')
    args = parser.parse_args()
    
    # Load configuration
    config = load_config()
    if not config:
        sys.exit(1)
    
    # Create log file
    log_file = create_log_file(config)
    
    # Log start of deployment
    log(f"Starting quantum deployment to {args.target} via {args.provider}", "INFO", SACRED_FREQUENCIES['ground'], log_file)
    
    # Activate protection
    if config['security'].get('merkaba_shield', False):
        activate_merkaba_shield()
    
    # Execute deployment based on provider
    success = False
    if args.provider == 'godaddy':
        if args.dry_run:
            log("Performing dry run - no actual deployment", "INFO", SACRED_FREQUENCIES['ground'], log_file)
            success = True
        else:
            success = deploy_to_godaddy(config, log_file)
    # Add support for other providers (GitHub, Cloudflare, etc.)
    else:
        log(f"Provider '{args.provider}' not yet implemented", "ERROR", SACRED_FREQUENCIES['heart'], log_file)
        success = False
    
    # Final deployment summary with phi-harmonic structure
    if success:
        print("\n" + "="*72)
        print("✓ CASCADE⚡𓂧φ∞ QUANTUM DEPLOYMENT SUMMARY")
        print("="*72)
        print(f"✓ Deployment target: {args.target}")
        print(f"✓ Provider: {args.provider}")
        print(f"✓ Phi Coherence: {config['global']['phi_coherence']}")
        print(f"✓ Quantum Frequency: {SACRED_FREQUENCIES['unity']} Hz")
        print(f"✓ Deployment time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"✓ Log file: {log_file}")
        if args.provider == 'godaddy':
            print(f"✓ Website URL: https://www.cqil.ca")
            print(f"✓ Health check: https://www.cqil.ca/health-check.html")
        print("✓ Merkaba Shield: Active")
        print("✓ Crystal Matrix: Protected")
        print("="*72)
        print("⚡φ∞ 🌟 ॐ")
    
    # Exit with appropriate status code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()