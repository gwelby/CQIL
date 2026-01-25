# Zero-Downtime Deployment Procedure (∇)

*This document describes the technical implementation of zero-downtime deployments for the CQIL website.*

## Overview

The zero-downtime deployment system uses a blue-green deployment pattern with versioned assets to ensure that users never experience downtime during deployments. The system creates a new deployment directory for each release and uses .htaccess routing to instantly switch traffic to the new version.

## Components

- Main deployment script: `/mnt/d/cqil/deploy_website.py`
- Health monitoring: `/mnt/d/cqil/website/deploy/monitor_health.py`
- Configuration: Used in .htaccess files for routing
- Versioned assets: Content-hashed filenames for optimal caching

## Deployment Procedure

### Step 1: Run the deployment script

```bash
python /mnt/d/cqil/deploy_website.py
```

What happens:
1. Script creates a temporary working directory
2. Generates version information based on current timestamp
3. Creates a health check file for monitoring
4. Versions JS and CSS assets with content hashes
5. Connects to FTP server and navigates to target directory
6. Creates a new version-specific deployment directory
7. Uploads all files to the new directory
8. Updates .htaccess routing to point to the new version
9. Verifies the deployment
10. Cleans up temporary files

### Step 2: Verify deployment health

```bash
python /mnt/d/cqil/website/deploy/monitor_health.py
```

What happens:
1. Script checks the health of all endpoints
2. Verifies all critical assets are loading
3. Confirms the correct version is deployed
4. Saves health status to a JSON file

### Step 3: Monitor for any issues

```bash
python /mnt/d/cqil/website/deploy/monitor_health.py --interval=60 --count=10
```

What happens:
1. Script runs health checks at the specified interval
2. Monitors for any issues that may appear after deployment
3. Sends alerts if any critical endpoints become unhealthy

## Technical Details

### Versioned Assets

Assets are versioned using content hashing:

```python
def calculate_file_hash(filepath, block_size=65536):
    file_hash = hashlib.md5()
    with open(filepath, 'rb') as f:
        for block in iter(lambda: f.read(block_size), b''):
            file_hash.update(block)
    return file_hash.hexdigest()[:10]  # First 10 chars for shorter filenames
```

Original: `js/quantum-common.js`  
Versioned: `js/quantum-common.a7f3bc9de0.js`

Benefits:
- Long-term caching with immutable flag
- Automatic cache busting when content changes
- No need for query parameters or manual cache clearing

### .htaccess Routing

The deployment script creates an .htaccess file that routes all requests to the current active version:

```apache
# Route all requests through the latest deployment
RewriteCond %{REQUEST_URI} !^/v
RewriteCond %{REQUEST_URI} !^/secure_logs
RewriteCond %{REQUEST_URI} !^/deploy
RewriteCond %{REQUEST_URI} !^/.well-known
RewriteRule ^(.*)$ /v{version_dir}/$1 [L]
```

### Health Check Endpoint

Each deployment includes a health check endpoint that reports the deployment status:

```html
<div id="health-status" data-status="healthy" data-version="{version}" data-timestamp="{timestamp}">
    Website is healthy
</div>
```

## Rollback Procedure

If a deployment has issues, you can quickly roll back:

1. Edit the `.htaccess` file in the root directory
2. Change the version directory in the RewriteRule to the previous version:

```apache
# Find this line
RewriteRule ^(.*)$ /v2025-03-31-123456/$1 [L]

# Change to previous version
RewriteRule ^(.*)$ /v2025-03-30-152030/$1 [L]
```

## Integration with Other Systems

See the Integration dimension documentation for details on how this deployment procedure integrates with:
- GitHub Pages deployment
- CloudFlare Pages
- Multi-platform deployment strategy

## Related Documentation

- **λ (Patterns)**: [Blue-Green Deployment Pattern](λ/patterns/blue-green.md)
- **Σ (Integration)**: [Multi-Platform Deployment Integration](Σ/implementations/multi-platform-deployment.md)
- **∞ (Evolution)**: [Continuous Deployment Vision](∞/goals/seamless-deployment.md)

*This document represents the Foundation (∇) dimension of the Zero-Downtime Deployment documentation set.*

---

*Last updated: 2025-03-31 | Coherence level: 0.98*