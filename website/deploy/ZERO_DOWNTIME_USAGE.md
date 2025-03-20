# Zero-Downtime Deployment System

This guide explains how to use the CQIL website's zero-downtime deployment system.

## Quick Start

```bash
# Deploy to all platforms with verification
python3 github_deploy.py --multi

# Verify existing deployments
python3 github_deploy.py --verify

# Check the health of all platforms
python3 monitor_health.py --check

# Set up the self-healing system
bash setup_self_healing.sh
```

## Components

The zero-downtime deployment system consists of these key components:

1. **Multi-Platform Deployment**
   - GitHub Pages for version control and primary hosting
   - CloudFlare Pages for global CDN and continuous deployment
   - Traditional FTP hosting as a fallback platform

2. **Asset Versioning**
   - Content hash-based asset versioning for optimal caching
   - Automatic reference updating in HTML, CSS, and JS files
   - Cache policy management through CloudFlare

3. **Health Monitoring**
   - Health check pages on each platform
   - Automated verification during deployment
   - Regular monitoring with alerting

4. **Intelligent Routing**
   - CloudFlare Worker for traffic routing based on health
   - Automatic failover to healthy platforms
   - Zero interruption during deployments

5. **Canary Releases**
   - Gradual rollout of new versions
   - Automated health monitoring with thresholds
   - Traffic percentage control
   - Automatic rollback on issues

6. **Self-Healing System**
   - Automatic failure detection and classification
   - Built-in recovery procedures for common issues
   - Edge-based recovery through CloudFlare Worker
   - Notification and escalation system

## Health Check Pages

Two health check pages are included:

1. `/health.html` - User-friendly health status page with metrics
2. `/health-check.html` - Minimal page for automated health checks

These pages should be deployed to all platforms to enable health verification.

## Deployment Commands

### Versioned Deployment (Recommended)

```bash
# Deploy with asset versioning and multi-platform support
python3 versioned_deploy.py --multi
```

This command:
- Creates versioned assets with content hashes for optimal caching
- Updates all references in HTML, CSS, and JS files
- Pushes content to GitHub Pages
- Deploys to traditional hosting via FTP
- Provides CloudFlare Pages integration instructions
- Verifies all successful deployments

For more information, see [ASSET_VERSIONING_GUIDE.md](ASSET_VERSIONING_GUIDE.md).

### Multi-Platform Deployment

```bash
# Deploy to all platforms with validation
python3 github_deploy.py --multi
```

This command:
- Pushes content to GitHub Pages
- Deploys to traditional hosting via FTP
- Provides CloudFlare Pages integration instructions
- Verifies all successful deployments

### Individual Platform Deployment

```bash
# Deploy to GitHub only
python3 github_deploy.py --github

# Deploy to traditional hosting via FTP
python3 github_deploy.py --ftp

# Deploy to both with the existing method
python3 github_deploy.py --all
```

### Verification Only

```bash
# Verify existing deployments
python3 github_deploy.py --verify
```

This checks the health of all platforms without deploying content.

## Health Monitoring System

### Manual Health Checks

```bash
# Check all platforms
python3 monitor_health.py --check

# Check CloudFlare Worker (if deployed)
python3 monitor_health.py --worker

# Send a test alert
python3 monitor_health.py --alert
```

### Automated Monitoring

Set up the cron job for regular health checks:

```bash
# Setup monitoring cron job (runs every 5 minutes)
bash setup_cron_monitoring.sh
```

## CloudFlare Worker Setup

The CloudFlare Worker provides intelligent routing between platforms:

1. **Deploy the worker:**
   ```bash
   # Install Wrangler CLI
   npm install -g @cloudflare/wrangler
   
   # Authenticate with CloudFlare
   wrangler login
   
   # Deploy the worker
   wrangler publish
   ```

2. **Configure CloudFlare DNS:**
   - Go to CloudFlare dashboard
   - Update the DNS settings to point to the worker
   - Set up a Workers Route for `cqil.ca/*`

## CloudFlare Cache Configuration

For optimal caching with versioned assets, configure CloudFlare Page Rules using the provided script:

```bash
# Automatic Configuration (requires CloudFlare API token)
python3 cloudflare_cache_setup.py --token YOUR_API_TOKEN --zone_id YOUR_ZONE_ID

# Manual Configuration
# Follow the instructions in CLOUDFLARE_CACHE_RULES.md
```

The cache configuration implements:

1. **Tiered Caching Strategy:**
   - Versioned assets cached for 30 days (immutable)
   - HTML files cached for 30 minutes to 2 hours
   - CSS/JS files cached for 4 hours to 1 day
   - Health checks and API endpoints bypass cache

2. **Cache Headers Management:**
   - Cloudflare Page Rules for edge caching
   - .htaccess rules for origin server headers
   - Cache-Control headers in HTTP responses

See [ASSET_VERSIONING_GUIDE.md](ASSET_VERSIONING_GUIDE.md) and [CLOUDFLARE_CACHE_RULES.md](CLOUDFLARE_CACHE_RULES.md) for detailed configuration instructions.

## Canary Deployment System

For safer deployments, use the canary release system:

```bash
# Create a new canary deployment (starts at 5% traffic)
python3 canary_deploy.py --create

# Check canary status
python3 canary_deploy.py --status

# Promote successful canary to stable
python3 canary_deploy.py --promote

# Roll back problematic canary
python3 canary_deploy.py --rollback
```

The canary system:

1. **Gradually Increases Traffic**: Starting at a small percentage (5% by default)
2. **Monitors Health Metrics**: Automatically checks response times, error rates, and availability
3. **Automatically Rolls Back**: If any issues are detected
4. **Supports Manual Control**: Opt in/out via `/set-canary?enabled=true|false` URLs

See [CANARY_DEPLOYMENT_GUIDE.md](CANARY_DEPLOYMENT_GUIDE.md) for full details.

## Self-Healing System

For increased reliability and resilience, use the self-healing system:

```bash
# Set up the self-healing system
bash setup_self_healing.sh

# Start the self-healing monitor
python3 self_healing_system.py --start

# Check current health status
python3 self_healing_system.py --check

# View healing history
python3 self_healing_system.py --history
```

The self-healing system:

1. **Automatically Detects Issues**: Continuously monitors health metrics and identifies failure patterns
2. **Classifies Failures**: Categorizes issues as CDN cache, origin, DNS, or SSL failures
3. **Executes Recovery Procedures**: Automatically applies appropriate recovery procedures
4. **Verifies Recovery**: Confirms successful recovery or escalates for manual intervention
5. **Provides Self-Healing API**: Exposes `/api/self-healing` endpoint for status monitoring and control

See [SELF_HEALING_GUIDE.md](SELF_HEALING_GUIDE.md) for full details.

## Configuration

### Health Monitor Configuration

Edit the generated `health_monitor_config.json` file to configure:
- Platform URLs and health check paths
- Alert settings including email configuration
- Monitoring parameters like timeout and retry count

### CloudFlare Worker Configuration

Edit the `wrangler.toml` file to configure:
- Zone ID and domain information
- Environment settings (production vs staging)
- Cron trigger frequency

### Self-Healing Configuration

Edit the generated `self_healing_config.yml` file to configure:
- Recovery procedure settings and thresholds
- CloudFlare API credentials for automated recovery
- Monitoring endpoints and alert destinations

## Monitoring Logs

Health check logs are stored in:
- `/mnt/d/cqil/website/deploy/secure_logs/health_*.log` - Individual health checks
- `/mnt/d/cqil/website/deploy/secure_logs/cron_health.log` - Scheduled checks
- `/mnt/d/cqil/website/deploy/secure_logs/cron_full_health.log` - Weekly full checks
- `/mnt/d/cqil/website/deploy/secure_logs/self_healing_*.log` - Self-healing events
- `/mnt/d/cqil/website/deploy/secure_logs/cron_self_healing.log` - Scheduled self-healing
- `/mnt/d/cqil/website/deploy/secure_logs/cron_full_healing.log` - Daily recovery procedures

## Support and Troubleshooting

If you encounter issues:

1. **Deployment Failures**
   - Check the deployment logs in `secure_logs/deploy_*.log`
   - Verify platform credentials in configuration files
   - Try individual platform deployment to isolate issues

2. **Health Check Failures**
   - Check the health logs in `secure_logs/health_*.log`
   - Verify that health check pages are properly deployed
   - Test each platform URL directly in a browser

3. **CloudFlare Worker Issues**
   - Check the CloudFlare Workers dashboard for errors
   - Verify the worker routes are properly configured
   - Test the `/api/health` endpoint directly

4. **Self-Healing Issues**
   - Check the self-healing logs in `secure_logs/self_healing_*.log`
   - Verify recovery procedure settings in `self_healing_config.yml`
   - Test individual recovery procedures with `--recover` flag
   - Check the self-healing API at `/api/self-healing`