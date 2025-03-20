# Self-Healing System Guide

This guide explains how to use the CQIL website's self-healing system, which automatically detects and recovers from common failure scenarios.

## Overview

The self-healing system provides automatic recovery from common website failures including:

1. **CDN Cache Failures**: Problems with cached content, stale content, or cache configuration
2. **Origin Failures**: Issues with specific platforms or origins being unreachable
3. **DNS Failures**: Problems with DNS resolution or configuration
4. **SSL Failures**: Certificate problems, SSL handshake failures, or encryption issues

The system works by continuously monitoring the health of all deployment platforms and automatically executing appropriate recovery procedures when issues are detected.

## Quick Start

```bash
# Set up the self-healing system
bash setup_self_healing.sh

# Start the self-healing monitor
python3 self_healing_system.py --start

# Check current health status
python3 self_healing_system.py --check

# View healing history
python3 self_healing_system.py --history

# Run a specific recovery procedure
python3 self_healing_system.py --recover cdn_cache
```

## Components

The self-healing system consists of these key components:

1. **Health Monitoring**
   - Continuous health checks across all platforms
   - Failure detection and classification
   - Metric collection and threshold evaluation

2. **Recovery Procedures**
   - CDN cache purging and warming
   - Origin failover and redeployment
   - DNS configuration verification
   - SSL certificate management

3. **CloudFlare Worker**
   - Edge-based failure detection
   - Automatic traffic routing to healthy origins
   - Real-time recovery capabilities

4. **Notification System**
   - Alerts on detected issues
   - Recovery status reporting
   - Escalation for manual intervention when needed

## Recovery Procedures

The system implements the following automated recovery procedures:

### CDN Cache Recovery

When cache-related issues are detected:
1. Purges the CloudFlare cache to remove stale or corrupt content
2. Pre-warms critical URLs to ensure fresh content is cached
3. Verifies that the cache is properly serving content

### Origin Recovery

When origin failures are detected:
1. Attempts redeployment to the affected platforms
2. Updates the CloudFlare Worker to route around failed origins
3. Verifies successful recovery through health checks

### DNS Recovery

When DNS issues are detected:
1. Checks CloudFlare DNS settings for misconfiguration
2. Verifies CloudFlare Worker is functioning properly
3. Checks for DNS propagation issues across regions

### SSL Recovery

When SSL certificate issues are detected:
1. Checks SSL certificate status on affected platforms
2. Updates CloudFlare SSL settings if needed
3. Attempts to refresh certificates or reconfigure SSL

## Configuration

The self-healing system is configured via `self_healing_config.yml`. Key configuration options include:

### General Settings

```yaml
self_healing:
  enabled: true                  # Enable/disable the entire system
  check_interval: 300            # How often to check health (seconds)
  healing_cooldown: 1800         # Minimum time between healing attempts (seconds)
  max_auto_healing_attempts: 3   # Maximum auto-healing attempts per issue
  auto_rollback_on_failure: true # Automatically rollback if healing fails
```

### Monitoring Settings

```yaml
monitoring:
  endpoints:
    - name: home
      path: /
    - name: golden-age
      path: /pages/golden-age.html
  thresholds:
    error_rate: 1.0        # Percentage
    response_time: 800     # Milliseconds
    availability: 99.5     # Percentage
```

### Recovery Procedure Settings

```yaml
recovery_procedures:
  cdn_cache_failure:
    enabled: true
    max_attempts: 3
    cooldown: 900  # 15 minutes
  origin_failure:
    enabled: true
    max_attempts: 3
    cooldown: 900  # 15 minutes
```

## CloudFlare Worker

The self-healing system includes a CloudFlare Worker (`cloudflare-self-healing-worker.js`) that provides edge-based recovery capabilities. This worker:

1. Performs health checks from the edge
2. Routes traffic to healthy origins
3. Executes recovery procedures at the edge
4. Provides real-time health status via API endpoints

### Worker API Endpoints

The worker exposes the following API endpoints:

- `/api/health`: Get the current health status of all origins
- `/api/self-healing`: Get the status of the self-healing system
- `/api/self-healing/admin`: Admin endpoint for controlling the self-healing system

### Deploying the Worker

Deploy the worker using the Wrangler CLI:

```bash
# Authenticate with CloudFlare
wrangler login

# Deploy the worker
wrangler publish cloudflare-self-healing-worker.js
```

Then set up a Workers Route in the CloudFlare dashboard to direct traffic to the worker.

## Monitoring Logs

Self-healing logs are stored in:
- `/mnt/d/cqil/website/deploy/secure_logs/self_healing_*.log` - Individual healing events
- `/mnt/d/cqil/website/deploy/secure_logs/cron_self_healing.log` - Scheduled checks
- `/mnt/d/cqil/website/deploy/secure_logs/cron_full_healing.log` - Daily full recovery checks

## Command Line Usage

The self-healing system provides a command-line interface for manual operation:

```
usage: self_healing_system.py [-h] [--setup] [--start] [--stop] [--check] [--history]
                             [--recover {cdn_cache,origin,dns,ssl}]

CQIL Website Self-Healing System

optional arguments:
  -h, --help            show this help message and exit
  --setup               Set up the self-healing system
  --start               Start the self-healing monitor
  --stop                Stop the self-healing monitor
  --check               Run a manual health check
  --history             Show healing history
  --recover {cdn_cache,origin,dns,ssl}
                        Run a specific recovery procedure
```

## Integration with Existing Systems

The self-healing system integrates with the existing zero-downtime deployment architecture:

- Works alongside the **Multi-Platform Foundation** (Phase 1)
- Leverages the **Versioned Deployments** system (Phase 2)
- Uses data from the **Advanced Monitoring** system (Phase 3)
- Complements the **Canary Releases** system (Phase 4)

## Troubleshooting

If you encounter issues with the self-healing system:

1. **System Not Responding to Failures**
   - Check that the system is enabled in the configuration
   - Verify that the monitoring thread is running (`--check`)
   - Check the logs for any errors

2. **Recovery Procedures Failing**
   - Verify API credentials in the configuration
   - Check permissions for cache purging and deployment
   - Look for specific error messages in the logs

3. **CloudFlare Worker Issues**
   - Check the CloudFlare Workers dashboard for errors
   - Verify the worker routes are properly configured
   - Test the API endpoints directly

4. **System Performance**
   - Adjust check intervals if the system is too resource-intensive
   - Modify cooldown periods to prevent excessive healing attempts
   - Configure thresholds to match your performance expectations