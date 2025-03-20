# Asset Versioning Guide

This guide explains the CQIL website asset versioning system, which enables aggressive caching while ensuring users always receive the latest content.

## Quick Start

```bash
# Run versioned deployment with multi-platform support
python3 versioned_deploy.py --multi

# Run asset versioning only (dry run to see what will happen)
python3 asset_versioning.py --dry-run

# Run asset versioning and save to custom location
python3 asset_versioning.py --target /path/to/output
```

## How Asset Versioning Works

The asset versioning system:

1. **Adds Content Hashes to Filenames** - `style.css` becomes `style.a1b2c3d4e5.css`
2. **Updates References Automatically** - All links to assets are updated in HTML, CSS, and JS files
3. **Creates a Version Manifest** - A JSON file tracking all versioned assets
4. **Integrates with Deployment** - Seamlessly works with the zero-downtime deployment system

This approach enables two critical benefits:

- **Ultra-Long Cache Times** - Assets can be cached by browsers and CDNs for months
- **Automatic Cache Busting** - When content changes, the filename changes, forcing a refresh

## Key Components

### 1. Asset Versioning Tool

The `asset_versioning.py` script handles:
- Creating content hashes for each asset
- Renaming files with these hashes
- Updating all references in HTML, CSS, and JS files
- Generating a version manifest

### 2. Versioned Deployment System

The `versioned_deploy.py` script:
- Runs the asset versioning process
- Deploys versioned content to GitHub & FTP
- Provides CloudFlare cache configuration instructions
- Verifies deployment across platforms

### 3. CloudFlare Cache Configuration

To fully benefit from asset versioning, configure CloudFlare with:
- Long cache times for versioned assets (*.{HASH}.{EXT})
- Shorter cache times for HTML files
- Cache bypass for health checks and API endpoints

## Configuration Options

### Asset Versioning Script

```bash
usage: asset_versioning.py [-h] [--source SOURCE] [--target TARGET] [--dry-run]

CQIL Website Asset Versioning

options:
  -h, --help       show this help message and exit
  --source SOURCE  Source website directory
  --target TARGET  Target directory for versioned website
  --dry-run        Dry run (no files created)
```

### Versioned Deployment Script

```bash
usage: versioned_deploy.py [-h] [--multi] [--no-verify] [--no-cache-config]

CQIL Website Versioned Deployment

options:
  -h, --help          show this help message and exit
  --multi             Use multi-platform deployment
  --no-verify         Skip verification step
  --no-cache-config   Skip CloudFlare cache configuration
```

## CloudFlare Cache Configuration

For optimal performance, configure these CloudFlare Page Rules:

1. **Versioned Assets** (highest priority):
   - URL pattern: `*cqil.ca/*.{HASH}.{EXT}`
   - Cache level: Cache Everything
   - Edge cache TTL: 1 month
   - Browser cache TTL: 1 month

2. **HTML Files**:
   - URL pattern: `*cqil.ca/*.html`
   - Cache level: Standard
   - Edge cache TTL: 2 hours
   - Browser cache TTL: 30 minutes

3. **Health Checks**:
   - URL pattern: `*cqil.ca/health*`
   - Cache level: Bypass
   - Edge cache TTL: No store

4. **API Endpoints**:
   - URL pattern: `*cqil.ca/api/*`
   - Cache level: Bypass
   - Edge cache TTL: 2 minutes

## Understanding the Version Manifest

The system generates a `version-manifest.json` file that:
- Records all asset versioning changes
- Contains mappings from original to versioned filenames
- Includes version and timestamp information

Example manifest:
```json
{
  "version": "20250317123456",
  "timestamp": "2025-03-17T12:34:56.789Z",
  "assets": {
    "css/style.css": "css/style.a1b2c3d4e5.css",
    "js/main.js": "js/main.f6g7h8i9j0.js",
    "images/logo.png": "images/logo.k1l2m3n4o5.png"
  }
}
```

## Performance Benefits

Asset versioning delivers significant performance improvements:

| Metric | Without Versioning | With Versioning |
|--------|-------------------|-----------------|
| Browser Cache Duration | Short (hours) | Long (months) |
| CloudFlare Edge Cache | Limited | Aggressive |
| Network Requests on Return Visit | Many | Very Few |
| Time to Interactive | Slower | Faster |
| Page Speed Score | Lower | Higher |

## Implementation Details

### Asset Selection

The system versions:
- CSS and JS files
- Images (PNG, JPG, GIF, SVG, WebP)
- Files in specific directories (css, js, img, assets, images)

### Reference Updating

The system updates references in:
- HTML `href` and `src` attributes
- CSS `url()` functions
- JS import statements
- CSS `@import` rules

### Deployment Integration

The versioned deployment process:
1. Runs asset versioning
2. Deploys to multi-platform targets via GitHub integration
3. Sets up appropriate caching rules
4. Verifies successful deployment

## Troubleshooting

### Missing References

If you see 404 errors for assets after deployment:

1. Check for unusual reference formats in your HTML/CSS/JS
2. Look for dynamic references constructed in JavaScript
3. Examine the version manifest for missing assets

### Cache Issues

If updates aren't visible despite deploying new content:

1. Verify that the asset hash changed (check manifest)
2. Confirm CloudFlare cache settings are correct
3. Try a hard refresh (Ctrl+F5) to bypass browser cache
4. Purge the CloudFlare cache if necessary

## Best Practices

1. **Keep Static and Dynamic Content Separate** - Only apply long caching to truly static assets
2. **Use Relative Paths** - Makes reference updating more reliable
3. **Avoid Inline Styles** - External CSS files benefit from versioning
4. **Consistent Directory Structure** - Organize assets in standard directories (css, js, images)
5. **Regular Deployments** - Deploy frequently to ensure content stays current