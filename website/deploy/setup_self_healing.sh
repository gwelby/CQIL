#!/bin/bash
# Setup script for CQIL Website Self-Healing System

echo "=== CQIL Website Self-Healing System Setup ==="
echo

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is required but not installed. Please install Python 3 and try again."
    exit 1
fi

# Check if Wrangler CLI is installed
if ! command -v wrangler &> /dev/null; then
    echo "WARNING: Wrangler CLI is not installed. It is recommended for CloudFlare Worker deployment."
    echo "You can install it with: npm install -g @cloudflare/wrangler"
    echo
    read -p "Continue anyway? (y/n): " continue_without_wrangler
    if [[ $continue_without_wrangler != "y" ]]; then
        exit 1
    fi
fi

# Make the script executable
chmod +x self_healing_system.py

# Create the config file if it doesn't exist
if [ ! -f "self_healing_config.yml" ]; then
    echo "Creating default configuration..."
    python3 self_healing_system.py --setup
else
    echo "Configuration file already exists."
fi

# Setup Cron Job for continuous monitoring
echo
echo "=== Setting up Cron Job for Self-Healing System ==="
echo "This will add a cron job to run the self-healing system every 5 minutes."
read -p "Would you like to set up the cron job? (y/n): " setup_cron

if [[ $setup_cron == "y" ]]; then
    # Create a temporary file for the new crontab
    TEMP_CRON=$(mktemp)
    
    # Export current crontab
    crontab -l > "$TEMP_CRON" 2>/dev/null
    
    # Check if the cron job already exists
    if grep -q "self_healing_system.py" "$TEMP_CRON"; then
        echo "Self-healing cron job already exists."
    else
        # Add the new cron job
        echo "# CQIL Website Self-Healing System - Run every 5 minutes" >> "$TEMP_CRON"
        echo "*/5 * * * * cd $(pwd) && $(which python3) $(pwd)/self_healing_system.py --check >> $(pwd)/secure_logs/cron_self_healing.log 2>&1" >> "$TEMP_CRON"
        
        # Add weekly full check
        echo "# CQIL Website Self-Healing System - Run full check daily at 3:00 AM" >> "$TEMP_CRON"
        echo "0 3 * * * cd $(pwd) && $(which python3) $(pwd)/self_healing_system.py --recover cdn_cache >> $(pwd)/secure_logs/cron_full_healing.log 2>&1" >> "$TEMP_CRON"
        echo "15 3 * * * cd $(pwd) && $(which python3) $(pwd)/self_healing_system.py --recover origin >> $(pwd)/secure_logs/cron_full_healing.log 2>&1" >> "$TEMP_CRON"
        
        # Install the new crontab
        crontab "$TEMP_CRON"
        echo "Cron job installed successfully!"
    fi
    
    # Remove the temporary file
    rm "$TEMP_CRON"
else
    echo "Skipping cron job setup."
fi

# Deploy CloudFlare Worker
echo
echo "=== CloudFlare Worker Setup ==="
echo "The self-healing system includes a CloudFlare Worker for edge-based recovery."

if command -v wrangler &> /dev/null; then
    read -p "Would you like to deploy the CloudFlare Worker? (y/n): " deploy_worker
    
    if [[ $deploy_worker == "y" ]]; then
        # Authenticate with CloudFlare if needed
        if ! wrangler whoami &> /dev/null; then
            echo "Please authenticate with CloudFlare:"
            wrangler login
        fi
        
        # Deploy the worker
        echo "Deploying CloudFlare Self-Healing Worker..."
        wrangler publish cloudflare-self-healing-worker.js
        
        echo "CloudFlare Worker deployed successfully!"
        echo
        echo "IMPORTANT: Remember to set up a Workers Route for your domain in the CloudFlare dashboard."
    else
        echo "Skipping CloudFlare Worker deployment."
    fi
else
    echo "Wrangler CLI not found. Skipping CloudFlare Worker deployment."
    echo "You can manually deploy the worker using the CloudFlare dashboard."
fi

# Final instructions
echo
echo "=== Self-Healing System Setup Complete ==="
echo
echo "The self-healing system is now installed. You can start it manually with:"
echo "  python3 self_healing_system.py --start"
echo
echo "To check the current health status:"
echo "  python3 self_healing_system.py --check"
echo
echo "To view the healing history:"
echo "  python3 self_healing_system.py --history"
echo
echo "For more information, run:"
echo "  python3 self_healing_system.py --help"
echo
echo "Log files will be stored in:"
echo "  $(pwd)/secure_logs/self_healing_*.log"
echo

# Make the setup script executable
chmod +x setup_self_healing.sh

echo "Setup complete!"