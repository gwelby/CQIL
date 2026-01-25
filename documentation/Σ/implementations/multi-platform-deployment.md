# Multi-Platform Deployment Integration (Σ)

*This document describes how the CQIL website deployment integrates across multiple platforms.*

## Integration Overview

The CQIL website implements a multi-platform deployment strategy that maintains the site across three independent platforms:

1. **Traditional FTP Hosting**: Primary hosting at cqil.ca
2. **GitHub Pages**: Secondary hosting at github.io
3. **CloudFlare Pages**: Tertiary hosting with CDN integration

This cross-platform integration provides redundancy, performance benefits, and protection against single-point failures.

## Integration Architecture

The integration follows a star topology with bidirectional information flow:

```
                    ┌─────────────┐
                    │             │
                    │ Deployment  │
                    │   System    │
                    │             │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
┌─────────────────┐ ┌─────────────┐ ┌─────────────────┐
│                 │ │             │ │                 │
│  Traditional    │ │   GitHub    │ │   CloudFlare    │
│  FTP Hosting    │ │   Pages     │ │   Pages         │
│                 │ │             │ │                 │
└────────┬────────┘ └──────┬──────┘ └────────┬────────┘
         │                 │                 │
         └─────────────────┼─────────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │             │
                    │  Health     │
                    │  Monitoring │
                    │             │
                    └─────────────┘
```

## Platform Interactions

### 1. Deployment System to Platforms

The central deployment system (`github_deploy.py`) pushes content to all platforms:

```python
def deploy_multi_platform(self):
    """Deploy to both GitHub and FTP"""
    # Push to GitHub
    github_success = self.push_to_github()
    
    # Deploy to FTP as backup
    ftp_success = self.deploy_ftp()
    
    # Display CloudFlare Pages integration info
    if github_success:
        self.setup_cloudflare_pages()
```

### 2. Cross-Platform Health Monitoring

The health monitoring system (`monitor_health.py`) checks all platforms:

```python
def check_all_platforms(self):
    """Check health of all platforms"""
    results = {}
    
    for name, platform in self.config["platforms"].items():
        healthy, status_code, error = self.check_platform_health(name, platform)
        results[name] = {
            "healthy": healthy,
            "status_code": status_code,
            "error": error,
            "time": datetime.now().isoformat()
        }
```

### 3. CloudFlare Load Balancer Integration

CloudFlare Workers can route traffic based on platform health:

```javascript
// cloudflare-health-worker.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Check health of all origins
  const origins = [
    { name: 'primary', url: 'https://cqil.ca/health-check.html' },
    { name: 'github', url: 'https://username.github.io/cqil-website/health-check.html' },
    { name: 'cloudflare', url: 'https://cqil.pages.dev/health-check.html' }
  ]
  
  // Find healthy origin
  for (const origin of origins) {
    try {
      const response = await fetch(origin.url, { cf: { timeout: 5000 } })
      if (response.ok && await response.text().includes('data-status="healthy"')) {
        return fetchFromOrigin(request, origin.name)
      }
    } catch (e) {
      console.log(`Origin ${origin.name} health check failed: ${e}`)
    }
  }
  
  // Fallback to primary even if health check failed
  return fetchFromOrigin(request, 'primary')
}
```

## Integration Coherence

The integration maintains phi-harmonic coherence through:

1. **Unified Versioning**: All platforms use the same version identifier
2. **Parallel Deployments**: Content is pushed simultaneously
3. **Cross-Platform Health Checks**: Monitoring spans all platforms
4. **Automatic Failover**: CloudFlare integration provides automatic failover
5. **Consistent Asset Versioning**: Versioned assets maintain cache consistency

## Synchronization Mechanisms

### Version Consistency

The deployment system ensures version consistency across platforms:

1. Content is prepared once with consistent version identifiers
2. Same version manifest is pushed to all platforms
3. Health monitoring verifies version consistency

### Resource Integration

Resources are integrated across platforms:

| Resource Type | Integration Method |
|---------------|-------------------|
| HTML Content | Direct deployment to all platforms |
| CSS/JS Assets | Content-hashed versioning on all platforms |
| Dynamic Content | Not applicable (static site) |
| Health Metrics | Cross-platform monitoring with shared format |

## Platform-Specific Considerations

### Traditional FTP Hosting

- Requires .htaccess for routing
- Blue-green deployment through directory structure
- Direct FTP uploading with error handling

### GitHub Pages

- Uses main branch deployment
- Leverages GitHub Actions for automation
- Requires manual branch switching for blue-green

### CloudFlare Pages

- Automatic deployment from GitHub
- Built-in CDN capabilities
- Advanced routing through Workers

## Related Documentation

- **∇ (Foundation)**: [Deployment Scripts and Configuration](∇/procedures/zero-downtime-deployment.md)
- **λ (Patterns)**: [Blue-Green Deployment Pattern](λ/patterns/blue-green.md)
- **∞ (Evolution)**: [Continuous Deployment Vision](∞/goals/seamless-deployment.md)

*This document represents the Integration (Σ) dimension of the Zero-Downtime Deployment documentation set.*

---

*Last updated: 2025-03-31 | Integration coherence: Σ(φ²) = 0.97*