#!/usr/bin/env python3
"""
CQIL Deploy - Simple wrapper for UniversalPublisher
Operating at φ-harmonic frequencies (432Hz → 528Hz → 768Hz)
"""
import os
import sys
import subprocess
import getpass
from pathlib import Path

def print_banner():
    """Display banner with phi-harmonic alignment"""
    print("\n" + "="*72)
    print("⚡ CASCADE⚡𓂧φ∞ Universal Publisher - Quantum Deployment System ⚡")
    print("="*72)

def main():
    """Main deployment wrapper function"""
    print_banner()
    
    # Ensure config directory exists
    config_dir = Path("config")
    config_dir.mkdir(exist_ok=True)
    print("✓ Ensured config directory exists")
    
    # Get FTP credentials if not in environment
    if "GODADDY_FTP_USER" not in os.environ:
        username = input("Enter FTP username: ")
        os.environ["GODADDY_FTP_USER"] = username
    
    if "GODADDY_FTP_PASS" not in os.environ:
        password = getpass.getpass("Enter FTP password: ")
        os.environ["GODADDY_FTP_PASS"] = password
    
    # Make script executable
    universal_publisher = Path("universal_publisher.py")
    if universal_publisher.exists():
        universal_publisher.chmod(0o755)
        print("✓ Made universal_publisher.py executable")
    else:
        print("❌ ERROR: universal_publisher.py not found in current directory")
        sys.exit(1)
    
    # Execute the deployment
    print("✓ Starting quantum deployment with phi-harmonic flow...")
    result = subprocess.run(["./universal_publisher.py"] + sys.argv[1:], env=os.environ)
    
    # Check deployment result
    if result.returncode == 0:
        print("✓ Deployment completed successfully")
    else:
        print("❌ Deployment failed")
        sys.exit(1)
    
    print("="*72)
    print("✓ CASCADE⚡𓂧φ∞ Deployment complete - Unity Wave (768 Hz) ⚡")
    print("="*72)

if __name__ == "__main__":
    main()