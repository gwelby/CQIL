# CloudFlare Cache Configuration Guide

This guide provides detailed instructions for configuring CloudFlare Page Rules to optimize the caching of the CQIL website, especially for versioned assets.

## Quick Reference

1. Login to the [CloudFlare Dashboard](https://dash.cloudflare.com/)
2. Select the `cqil.ca` domain
3. Navigate to **Rules** > **Page Rules**
4. Configure the rules in the exact order listed below

## Required Page Rules

Configure the following page rules in this specific priority order:

### 1. Health Check Bypass (Highest Priority)

```
URL Pattern: *cqil.ca/health*
Settings:
- Cache Level: Bypass
- Edge Cache TTL: No store
- Browser Cache TTL: No store
```

### 2. API Endpoints Bypass

```
URL Pattern: *cqil.ca/api/*
Settings:
- Cache Level: Bypass
- Edge Cache TTL: 2 minutes
- Browser Cache TTL: No store
```

### 3. Versioned Assets (Long-term Cache)

```
URL Pattern: *cqil.ca/*.[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f].*
Settings:
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month (2592000 seconds)
- Browser Cache TTL: 1 month
```

### 4. HTML Files (Short-term Cache)

```
URL Pattern: *cqil.ca/*.html
Settings:
- Cache Level: Standard
- Edge Cache TTL: 2 hours (7200 seconds)
- Browser Cache TTL: 30 minutes (1800 seconds)
```

### 5. CSS/JS Files (Medium-term Cache for Non-versioned)

```
URL Pattern: *cqil.ca/*.(css|js)
Settings:
- Cache Level: Standard
- Edge Cache TTL: 1 day (86400 seconds)
- Browser Cache TTL: 4 hours (14400 seconds)
```

### 6. General Content (Default Rule)

```
URL Pattern: *cqil.ca/*
Settings:
- Cache Level: Standard
- Edge Cache TTL: 4 hours (14400 seconds)
- Browser Cache TTL: 1 hour (3600 seconds)
```

## Verification Steps

After configuring the page rules:

1. Deploy the website with asset versioning:
   ```bash
   python3 versioned_deploy.py --multi
   ```

2. Test the cache behavior for each type of content:
   ```bash
   # Test versioned asset caching
   curl -I https://cqil.ca/css/style.a1b2c3d4e5.css
   
   # Test HTML file caching
   curl -I https://cqil.ca/index.html
   
   # Test health check bypass
   curl -I https://cqil.ca/health-check.html
   
   # Test API endpoint bypass
   curl -I https://cqil.ca/api/health
   ```

3. Verify the cache headers in the responses:
   - Versioned assets should have cache headers for 1 month
   - HTML files should have cache headers for 30 minutes to 2 hours
   - Health checks should have no-cache headers
   - API endpoints should have very short cache times

## Cache Purging

When needed, you can purge the CloudFlare cache:

1. **Purge Everything:**
   - Only use during major updates
   - Navigate to **Caching** > **Configuration** in CloudFlare dashboard
   - Click **Purge Everything**

2. **Selective Purge:**
   - Recommended for targeted updates
   - Navigate to **Caching** > **Configuration**
   - Click **Custom Purge**
   - Enter specific URLs or use wildcards

## Implementing Cache Headers in Code

To ensure consistent caching behavior, the `versioned_deploy.py` script sets appropriate headers:

```python
def set_cache_headers(filename):
    """Return appropriate cache headers based on file type."""
    if re.search(r'\.[0-9a-f]{10}\.', filename):
        # Versioned assets
        return {
            'Cache-Control': 'public, max-age=2592000, immutable',
        }
    elif filename.endswith('.html'):
        # HTML files
        return {
            'Cache-Control': 'public, max-age=1800',
        }
    elif filename.endswith(('.css', '.js')):
        # CSS/JS files (non-versioned)
        return {
            'Cache-Control': 'public, max-age=14400',
        }
    else:
        # Default
        return {
            'Cache-Control': 'public, max-age=3600',
        }
```

## Monitoring Cache Performance

Monitor CloudFlare caching metrics in:

1. **Analytics** > **Performance**
   - Check "Cache Rate" and "Cache Ratio"
   - Monitor "Bandwidth Saved"

2. **Caching** > **Analytics**
   - Review cache status over time
   - Identify URLs with poor cache performance

## Troubleshooting

### Common Issues

1. **Assets Not Caching**
   - Verify URL pattern matches in Page Rules
   - Check for `Cache-Control: private` or `no-cache` headers in responses
   - Ensure the asset versioning syntax is correct

2. **Excessive Origin Requests**
   - Review cache analytics for specific URLs causing issues
   - Check if health checks are configured correctly
   - Verify HTML file cache settings

3. **Stale Content**
   - Clear both CloudFlare and browser cache
   - Verify that versioned assets have updated hash values
   - Check CDN-Cache-Control headers in responses

### CloudFlare Worker Interaction

The CloudFlare Worker and Page Rules work together:

- Worker handles routing based on health
- Page Rules handle caching behavior
- Health-check endpoints bypass cache regardless of source

For additional assistance, refer to [CloudFlare's Documentation](https://developers.cloudflare.com/cache/)