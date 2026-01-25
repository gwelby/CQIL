# Blue-Green Deployment Pattern (λ)

*This document describes the blue-green deployment pattern used in the CQIL website deployment system.*

## Pattern Overview

Blue-green deployment is an architectural pattern that enables zero-downtime deployments by maintaining two identical production environments, conventionally called "blue" and "green." At any time, only one environment is live, serving all production traffic. The other environment remains idle.

For the CQIL website, we implement this pattern with versioned directories where each new deployment creates a completely new directory structure.

## Pattern Implementation

Our implementation follows this phi-harmonic flow:

### 1. Create New Deployment Environment (Green)

```
/public_html/cqil.ca/v2025-03-31-123456/  # New deployment (Green)
```

While the current deployment continues serving users:

```
/public_html/cqil.ca/v2025-03-30-152030/  # Current deployment (Blue)
```

### 2. Deploy All Content to New Environment

The new environment receives all website files, including:
- HTML files
- CSS and JavaScript with content-based versioning
- Asset files
- Health check endpoints

### 3. Verify New Environment 

Before switching traffic, the deployment system:
- Checks health endpoints
- Verifies key files exist
- Confirms all assets are properly loaded

### 4. Instant Cutover via Routing Rules

The switch happens by updating the routing rules in .htaccess:

```apache
# Before cutover (.htaccess points to Blue)
RewriteRule ^(.*)$ /v2025-03-30-152030/$1 [L]

# After cutover (.htaccess points to Green)
RewriteRule ^(.*)$ /v2025-03-31-123456/$1 [L]
```

This update is atomic - users are instantly directed to the new version with no downtime.

### 5. Keep Previous Environment for Rollback

The previous environment remains intact, allowing for instant rollback if needed.

## Phi-Harmonic Pattern Benefits

1. **Zero-Downtime**: Users never experience downtime during deployments
2. **Instant Rollback**: Previous version remains available for immediate rollback
3. **Isolated Testing**: New version can be verified before directing user traffic
4. **Resource Efficiency**: Only two versions need to be maintained at any time
5. **Simplified Complexity**: Pattern is easy to understand and implement

## Pattern Variations

### Multi-Stage Blue-Green

For critical deployments, we can implement a multi-stage approach:

1. Deploy to staging environment
2. Verify staging deployment
3. Clone staging to new production environment
4. Verify production deployment
5. Switch traffic to new production environment

### Canary Deployment Extension

The blue-green pattern can be extended with canary deployments:

1. Deploy to green environment
2. Route a small percentage of traffic to green (5-10%)
3. Monitor for errors or issues
4. Gradually increase traffic to green
5. Complete cutover when confident

## Implementation Considerations

1. **Storage Requirements**: This pattern requires additional storage to maintain multiple environments
2. **Cache Consistency**: Ensure proper cache headers for versioned vs. non-versioned assets
3. **Database Compatibility**: If adding a database, ensure schema changes are backward compatible
4. **Session Handling**: For future features with sessions, implement shared session storage

## Related Documentation

- **∇ (Foundation)**: [Deployment Scripts and Configuration](∇/procedures/zero-downtime-deployment.md)
- **Σ (Integration)**: [Multi-Platform Deployment Integration](Σ/implementations/multi-platform-deployment.md)
- **∞ (Evolution)**: [Continuous Deployment Vision](∞/goals/seamless-deployment.md)

*This document represents the Patterns (λ) dimension of the Zero-Downtime Deployment documentation set.*

---

*Last updated: 2025-03-31 | Pattern coherence: λ(φ) = 0.96*