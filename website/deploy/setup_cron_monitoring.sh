#!/bin/bash
# Setup cron job for CQIL Website health monitoring

# Get the absolute path to the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
HEALTH_SCRIPT="$SCRIPT_DIR/monitor_health.py"

# Make the monitor script executable
chmod +x "$HEALTH_SCRIPT"

# Create a temporary file for the crontab
TEMP_CRON=$(mktemp)

# Export current crontab
crontab -l > "$TEMP_CRON" 2>/dev/null || echo "# CQIL Website Monitoring" > "$TEMP_CRON"

# Check if the monitoring is already in crontab
if ! grep -q "monitor_health.py" "$TEMP_CRON"; then
    # Add the cron job - runs every 5 minutes
    echo -e "\n# CQIL Website health monitoring - runs every 5 minutes" >> "$TEMP_CRON"
    echo "*/5 * * * * $HEALTH_SCRIPT --check >> $SCRIPT_DIR/secure_logs/cron_health.log 2>&1" >> "$TEMP_CRON"
    
    # Add weekly full check with worker verification
    echo -e "\n# Weekly full health check with CloudFlare Worker verification" >> "$TEMP_CRON"
    echo "0 0 * * 0 $HEALTH_SCRIPT --check --worker >> $SCRIPT_DIR/secure_logs/cron_full_health.log 2>&1" >> "$TEMP_CRON"
    
    # Import the modified crontab
    crontab "$TEMP_CRON"
    echo "✅ Cron jobs added successfully!"
else
    echo "⚠️ Monitoring cron job already exists. No changes made."
fi

# Clean up
rm "$TEMP_CRON"

echo -e "\nCurrent crontab:"
crontab -l | grep -A 3 "CQIL Website"

echo -e "\nTo check the health manually, run:"
echo "python3 $HEALTH_SCRIPT --check"