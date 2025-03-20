#!/bin/bash

# CQIL Website Launcher
# This script provides an easy way to deploy and launch the CQIL website locally

echo "=== CQIL Website Launcher ==="
echo "This script will deploy and launch the website locally"
echo

# Check if Python is installed
if command -v python3 &>/dev/null; then
    PYTHON=python3
elif command -v python &>/dev/null; then
    PYTHON=python
else
    echo "❌ Error: Python is not installed or not in your PATH"
    echo "Please install Python 3 and try again."
    exit 1
fi

# Define terminal colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Deploy and launch the website
echo -e "${YELLOW}Launching CQIL Website...${NC}"
echo "This may take a few seconds..."

# Launch website manager
cd "$(dirname "$0")"
"$PYTHON" deploy/website_manager.py --launch

# Script will remain running until the user presses Ctrl+C
# as the website_manager.py script will keep running in foreground