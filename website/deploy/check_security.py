#!/usr/bin/env python3
"""
Security checker for CQIL website deployment
Scans for potential security issues before deployment
"""

import os
import re
import sys
from pathlib import Path

# Sensitive patterns to check for
SENSITIVE_PATTERNS = [
    r'password\s*=\s*["\'](?!.*\$\{)(?!\$\{\{\s*[a-zA-Z_]+\s*\}\})(?!YOUR_PASSWORD)([^"\']+)["\']',
    r'password:\s*["\'](?!.*\$\{)(?!\$\{\{\s*[a-zA-Z_]+\s*\}\})(?!YOUR_PASSWORD)([^"\']+)["\']',
    r'apikey\s*=\s*["\']([^"\']+)["\']',
    r'api_key\s*=\s*["\']([^"\']+)["\']',
    r'secret\s*=\s*["\']([^"\']+)["\']',
    r'token\s*=\s*["\']([^"\']+)["\']',
    r'ftp\.login\(["\']([^"\']+)["\'],\s*["\']([^"\']+)["\']',
]

# Files to exclude
EXCLUDE_DIRS = [
    '.git',
    'node_modules',
    '__pycache__',
    'venv',
    'env',
]

# File patterns to check
FILE_PATTERNS = [
    '*.py',
    '*.js',
    '*.html',
    '*.md',
    '*.yml',
    '*.yaml',
    '*.json',
    '*.sh',
    '*.bat',
]

def check_file(file_path):
    """Check a single file for sensitive patterns"""
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        try:
            content = f.read()
            line_num = 0
            issues = []
            
            for line in content.split('\n'):
                line_num += 1
                
                for pattern in SENSITIVE_PATTERNS:
                    matches = re.search(pattern, line)
                    if matches:
                        # Check if this is just a template placeholder
                        if "YOUR_" in line or "{{" in line or "${" in line or "example" in line.lower():
                            continue
                        
                        # Check if this is a comment
                        if line.strip().startswith('#') or line.strip().startswith('//'):
                            continue
                            
                        issues.append((line_num, line.strip()))
            
            return issues
        except Exception as e:
            return [(0, f"Error reading file: {str(e)}")]

def scan_directory(directory):
    """Scan a directory for sensitive patterns"""
    issues_found = False
    
    for root, dirs, files in os.walk(directory):
        # Skip excluded directories
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        for file in files:
            file_path = os.path.join(root, file)
            
            # Check if file matches any pattern
            if any(fnmatch(file, pattern) for pattern in FILE_PATTERNS):
                issues = check_file(file_path)
                
                if issues:
                    issues_found = True
                    print(f"\n⚠️ Sensitive information found in {file_path}:")
                    for line_num, line in issues:
                        print(f"  Line {line_num}: {line}")
    
    return issues_found

def fnmatch(name, pattern):
    """Simple file pattern matching"""
    if pattern.startswith('*'):
        return name.endswith(pattern[1:])
    return name == pattern

def main():
    """Main function to check security"""
    website_dir = Path(__file__).parent.parent
    
    print(f"🔒 Checking security for {website_dir}")
    print("Scanning for sensitive information...")
    
    issues_found = scan_directory(website_dir)
    
    if issues_found:
        print("\n❌ Security check failed! Please fix the issues above before deployment.")
        return 1
    else:
        print("\n✅ Security check passed! No obvious sensitive information found.")
        print("Note: This is a basic check. Always review your code manually too.")
        return 0

if __name__ == "__main__":
    sys.exit(main())