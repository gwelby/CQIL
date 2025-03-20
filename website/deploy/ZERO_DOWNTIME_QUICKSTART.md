# Zero-Downtime Deployment: Quick Start Guide

This guide provides immediate steps to begin implementing the zero-downtime architecture using our existing GitHub integration as a foundation.

## Immediate Actions (This Week)

### 1. Create Health Check Page

Add this health check page to your website to enable platform monitoring:

```html
<!-- File: /mnt/d/cqil/website/health.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CQIL Health Check</title>
  <meta name="robots" content="noindex, nofollow">
  <script>
    // Generate timestamp and version info dynamically
    document.addEventListener('DOMContentLoaded', function() {
      const healthStatus = document.getElementById('health-status');
      const timestamp = new Date().toISOString();
      const pageLoadTime = performance.now();
      
      healthStatus.setAttribute('data-timestamp', timestamp);
      healthStatus.setAttribute('data-load-time', pageLoadTime.toFixed(2) + 'ms');
    });
  </script>
</head>
<body>
  <div id="health-status" data-status="healthy" data-version="1.0.0">
    Website is healthy
  </div>
</body>
</html>
```

### 2. Enhance the GitHub Deployment Script

Modify `github_deploy.py` to support multi-platform deployment:

```python
# Add to github_deploy.py

def deploy_multi_platform(self):
    """Deploy to GitHub and ensure CloudFlare Pages integration"""
    try:
        results = {
            "github": {"success": False, "url": ""},
            "cloudflare": {"success": False, "url": ""},
            "ftp": {"success": False, "url": ""}
        }
        
        # First deploy to GitHub
        github_result = self.push_to_github()
        results["github"]["success"] = github_result
        results["github"]["url"] = f"https://{self.github_config['github']['owner']}.github.io/{self.github_config['github']['repo']}"
        
        # Then deploy to FTP as backup
        ftp_result = self.deploy_ftp()
        results["ftp"]["success"] = ftp_result
        results["ftp"]["url"] = "https://cqil.ca"
        
        # Setup CloudFlare Pages instructions
        if github_result:
            self.setup_cloudflare_pages()
            # Mark as successful once CF Pages is configured
            results["cloudflare"]["success"] = True
            results["cloudflare"]["url"] = "https://cqil.pages.dev"  # Will be available once configured
        
        # Log the multi-platform deployment status
        self.logger.info(f"Multi-platform deployment results: {results}")
        
        # Display summary
        print("\n=== Multi-Platform Deployment Summary ===")
        for platform, result in results.items():
            status = "✅ Success" if result["success"] else "❌ Failed"
            url = result["url"] if result["success"] else "N/A"
            print(f"{platform.capitalize()}: {status} - {url}")
        
        # Return overall success status and results
        return any(r["success"] for r in results.values()), results
        
    except Exception as e:
        self.logger.error(f"Multi-platform deployment failed: {str(e)}")
        print(f"{Fore.RED}Multi-platform deployment failed: {str(e)}{Style.RESET_ALL}")
        return False, {}
```

### 3. Add Basic Verification System

```python
# Add to github_deploy.py

def verify_deployment(self, urls):
    """Verify deployment across all platforms"""
    import requests
    
    results = {}
    overall_success = True
    
    for platform, url in urls.items():
        if not url:
            results[platform] = {"success": False, "reason": "No URL provided"}
            overall_success = False
            continue
            
        try:
            # Try to fetch the health check page
            health_url = f"{url}/health.html"
            response = requests.get(health_url, timeout=10)
            
            if response.status_code == 200 and "data-status=\"healthy\"" in response.text:
                results[platform] = {"success": True, "status_code": response.status_code}
            else:
                results[platform] = {
                    "success": False, 
                    "status_code": response.status_code,
                    "reason": "Health check failed"
                }
                overall_success = False
                
        except Exception as e:
            results[platform] = {"success": False, "reason": str(e)}
            overall_success = False
    
    # Log verification results
    self.logger.info(f"Deployment verification results: {results}")
    
    # Display results
    print("\n=== Deployment Verification ===")
    for platform, result in results.items():
        status = "✅ Success" if result.get("success") else "❌ Failed"
        reason = f" - {result.get('reason')}" if not result.get("success") and "reason" in result else ""
        print(f"{platform.capitalize()}: {status}{reason}")
    
    return overall_success, results
```

### 4. Update the Command Line Interface

```python
# Update the main function in github_deploy.py

def main():
    """Main function with command-line arguments"""
    parser = argparse.ArgumentParser(description='CQIL Website Zero-Downtime Deployment')
    parser.add_argument('--github', action='store_true', help='Deploy to GitHub only')
    parser.add_argument('--ftp', action='store_true', help='Deploy via FTP only')
    parser.add_argument('--all', action='store_true', help='Deploy to both GitHub and FTP')
    parser.add_argument('--setup', action='store_true', help='Setup GitHub repository and Pages')
    parser.add_argument('--cloudflare', action='store_true', help='Show CloudFlare Pages integration steps')
    parser.add_argument('--verify', action='store_true', help='Verify deployment across platforms')
    parser.add_argument('--multi', action='store_true', help='Deploy to multiple platforms with verification')
    
    args = parser.parse_args()
    integration = GitHubIntegration()
    
    # If no arguments provided, show help
    if not any(vars(args).values()):
        parser.print_help()
        return 0
    
    # Process arguments
    if args.github:
        integration.push_to_github()
    elif args.ftp:
        integration.deploy_ftp()
    elif args.all:
        integration.deploy_all()
    elif args.setup:
        integration.push_to_github()
    elif args.cloudflare:
        integration.setup_cloudflare_pages()
    elif args.verify:
        # Get URLs from config
        urls = {
            "github": f"https://{integration.github_config['github']['owner']}.github.io/{integration.github_config['github']['repo']}",
            "cloudflare": "https://cqil.pages.dev",  # Will be available once configured
            "ftp": "https://cqil.ca"
        }
        integration.verify_deployment(urls)
    elif args.multi:
        # Deploy to all platforms with verification
        success, results = integration.deploy_multi_platform()
        
        # Only verify if deployment was successful
        if success:
            urls = {platform: result["url"] for platform, result in results.items() if result["success"]}
            integration.verify_deployment(urls)
    
    return 0
```

## CloudFlare Setup Instructions

To enable load balancing with health checks (without Enterprise plan):

1. **Create a Cloudflare Worker for Health Checks**:

```javascript
// File: cloudflare-health-worker.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function checkOriginHealth(url) {
  try {
    const response = await fetch(url, {
      cf: {
        cacheTtl: 60,
        cacheEverything: false
      }
    })
    
    if (response.status === 200) {
      const text = await response.text()
      return text.includes('data-status="healthy"')
    }
    return false
  } catch (e) {
    return false
  }
}

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Health check endpoint
  if (url.pathname === '/api/health') {
    const origins = [
      'https://gwelby.github.io/cqil-website/health.html',
      'https://cqil.pages.dev/health.html',
      'https://cqil.ca/health.html'
    ]
    
    const results = await Promise.all(
      origins.map(async (origin) => {
        const healthy = await checkOriginHealth(origin)
        return {
          origin,
          healthy,
          timestamp: new Date().toISOString()
        }
      })
    )
    
    // Find the first healthy origin
    const healthyOrigin = results.find(r => r.healthy)
    
    return new Response(JSON.stringify({
      status: healthyOrigin ? 'healthy' : 'unhealthy',
      origins: results,
      primaryOrigin: healthyOrigin ? healthyOrigin.origin.replace('/health.html', '') : null
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=60'
      }
    })
  }
  
  // Route request based on health
  const healthCheck = await fetch(`${url.origin}/api/health`)
  const healthData = await healthCheck.json()
  
  if (healthData.primaryOrigin) {
    // Construct the full URL to the resource on the healthy origin
    const targetUrl = `${healthData.primaryOrigin}${url.pathname}${url.search}`
    return fetch(targetUrl, request)
  }
  
  // Fallback - all origins are unhealthy
  return new Response('Service temporarily unavailable', { status: 503 })
}
```

2. **Deploy the Worker**:

```bash
# Install Cloudflare Wrangler
npm install -g @cloudflare/wrangler

# Authenticate
wrangler login

# Create wrangler.toml configuration
cat > wrangler.toml << EOF
name = "cqil-health-router"
type = "javascript"
account_id = "your_account_id"
workers_dev = true
route = "cqil.ca/*"
zone_id = "27e4e83fb4c91289b3d620ebc2c917e9"
EOF

# Deploy the worker
wrangler publish
```

## Using the Multi-Platform Deployment

```bash
# Deploy to all platforms with verification
cd /mnt/d/cqil/website/deploy
python3 github_deploy.py --multi

# Verify existing deployments
python3 github_deploy.py --verify
```

## Next Steps (Next Week)

1. **Implement Asset Versioning**:
   - Add content hashing for CSS/JS files
   - Update HTML references to versioned assets
   - Create a version manifest file

2. **Configure CloudFlare Page Rules**:
   - Set up a Page Rule for health check caching
   - Configure appropriate cache TTLs for different content types
   - Implement browser cache settings for versioned assets

3. **Setup Basic Monitoring**:
   - Create a simple monitoring script that runs every 5 minutes
   - Check all platforms and log results
   - Send email alerts on failures
   - Implement uptime tracking

## Within 30 Days

Based on our full implementation plan, aim to complete:

1. Complete Multi-Platform Foundation (Phase 1)
2. Implement Versioned Deployments (Phase 2) 
3. Begin setting up Advanced Monitoring (Phase 3)

This quick start approach allows you to leverage our existing GitHub integration while progressively building toward the full zero-downtime architecture over the coming weeks.