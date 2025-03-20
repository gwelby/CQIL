# Canary Deployment System Guide

This guide explains how to use the CQIL Canary Deployment System for gradually rolling out new website versions with automated health monitoring and automatic rollback.

## Overview

Canary deployment is a technique for reducing deployment risk by initially exposing a new version to a small percentage of users, and then gradually increasing exposure while monitoring for issues.

Our system implements:

1. **Traffic Splitting**: Routes a configurable percentage of traffic to the canary version
2. **Health Monitoring**: Automatically monitors canary health metrics
3. **Gradual Rollout**: Incrementally increases traffic to the canary version
4. **Automatic Rollback**: Reverts to stable version if issues are detected
5. **Promotion**: Promotes successful canary to stable when fully validated

## Quick Start

```bash
# Create a new canary deployment starting at 5% traffic
python3 canary_deploy.py --create

# Check the status of the current canary
python3 canary_deploy.py --status

# Manually roll back a problematic canary
python3 canary_deploy.py --rollback

# Promote a successful canary to stable
python3 canary_deploy.py --promote
```

## Canary Deployment Process

### 1. Create a Canary Deployment

Running `python3 canary_deploy.py --create` will:

1. Create a versioned copy of the website with asset versioning
2. Deploy this version to canary environments across platforms:
   - GitHub Pages (canary branch)
   - CloudFlare Pages (canary environment)
   - Traditional hosting (canary subdirectory)
3. Configure the CloudFlare Worker to route a small percentage of traffic (default 5%)
4. Start health monitoring with automatic traffic increases

You can customize the initial percentage:

```bash
python3 canary_deploy.py --create --percentage 10
```

### 2. Monitor Canary Health

The system automatically monitors the health of the canary deployment by:

- Checking response times
- Measuring availability
- Tracking error rates
- Comparing with configured thresholds

If all metrics remain healthy for the check duration (default 5 minutes), traffic to the canary is automatically increased by the increment amount (default 20%).

### 3. Rollback on Issues

If any health metrics exceed their thresholds, the system will:

1. Automatically stop routing traffic to the canary
2. Log the issue with detailed metrics
3. Return all traffic to the stable version
4. Preserve the canary version for debugging

You can manually trigger a rollback:

```bash
python3 canary_deploy.py --rollback
```

### 4. Promote Successful Canary

Once a canary receives 100% of traffic and remains stable, it can be promoted to become the new stable version:

```bash
python3 canary_deploy.py --promote
```

This will:

1. Deploy the canary version to all stable environments
2. Reset the canary system for the next deployment
3. Update all platforms with the new stable version

## Configuration

The system is configured through `canary_config.yml`:

```yaml
canary:
  initial_percentage: 5         # Starting traffic percentage
  target_percentage: 100        # Final traffic percentage
  increment: 20                 # Percentage increase per step
  check_duration: 300           # Seconds to monitor at each level
  monitoring_interval: 60       # Seconds between health checks
  auto_rollback: true           # Enable automatic rollback
  rollback_thresholds:
    error_rate: 2.0             # Maximum acceptable error rate (%)
    response_time: 1000         # Maximum acceptable response time (ms)
    availability: 99.0          # Minimum acceptable availability (%)

monitoring:
  endpoints:                    # Endpoints to check
    - name: home
      path: /
    - name: golden-age
      path: /pages/golden-age.html
    - name: experiments
      path: /pages/experiments.html
  regions:                      # Geographic regions for testing
    - us-east
    - eu-west
    - ap-east
  alert_email: alerts@cqil.ca   # Where to send alerts

platforms:                      # Platform-specific configuration
  cloudflare:
    canary_url: https://canary.cqil.pages.dev
    stable_url: https://cqil.pages.dev
  github:
    canary_branch: canary
    stable_branch: main
    canary_url: https://gwelby.github.io/cqil-website-canary
    stable_url: https://gwelby.github.io/cqil-website
  traditional:
    canary_dir: /canary
    stable_dir: /
    canary_url: https://canary.cqil.ca
    stable_url: https://cqil.ca
```

## CloudFlare Worker

Traffic splitting is managed by a CloudFlare Worker (`cloudflare-canary-worker.js`) that:

1. Routes traffic based on configured percentage
2. Maintains session consistency with cookies
3. Provides canary opt-in/opt-out functionality
4. Handles health checking and failover
5. Exposes an API for canary status

The worker is automatically updated during canary deployments.

### User Opt-In/Opt-Out

Users can manually opt into or out of the canary version by visiting:

- `/set-canary?enabled=true` - Always use the canary version
- `/set-canary?enabled=false` - Always use the stable version

These preferences are stored in a cookie for 24 hours.

## Canary API

The worker exposes a canary status API at `/api/canary` that returns:

```json
{
  "canary": {
    "active": true,
    "percentage": 25,
    "version": "canary-20250318123456",
    "startTime": "2025-03-18T12:34:56.789Z",
    "origins": [
      {
        "name": "cloudflare",
        "url": "https://canary.cqil.pages.dev",
        "healthy": true
      },
      {
        "name": "github",
        "url": "https://gwelby.github.io/cqil-website-canary",
        "healthy": true
      },
      {
        "name": "traditional",
        "url": "https://canary.cqil.ca",
        "healthy": false
      }
    ]
  },
  "stable": {
    "origins": [
      {
        "name": "cloudflare",
        "url": "https://cqil.pages.dev",
        "healthy": true
      },
      {
        "name": "github",
        "url": "https://gwelby.github.io/cqil-website",
        "healthy": true
      },
      {
        "name": "traditional",
        "url": "https://cqil.ca",
        "healthy": true
      }
    ]
  },
  "timestamp": "2025-03-18T12:45:00.000Z"
}
```

## Troubleshooting

### Common Issues

1. **Canary Not Receiving Traffic**
   - Verify the CloudFlare Worker is deployed
   - Check that the canary URLs are accessible
   - Verify the worker is properly configured in CloudFlare

2. **Monitoring Shows False Positives**
   - Adjust thresholds in `canary_config.yml`
   - Increase the monitoring interval
   - Check if test endpoints are representative

3. **Traffic Not Increasing**
   - Verify the monitoring thread is running
   - Check logs for threshold violations
   - Ensure the check duration is appropriate

### Logs

Canary deployment logs are stored in:
- `/mnt/d/cqil/website/deploy/secure_logs/canary_*.log`

## Advanced Usage

### Custom Rollout Strategy

```bash
# Create with custom percentages and increments
python3 canary_deploy.py --create --percentage 2 --increment 10 --duration 600
```

### Manual Monitoring

```bash
# Start monitoring an existing canary deployment
python3 canary_deploy.py --monitor
```

### Integration with CI/CD

The canary system can be integrated with CI/CD pipelines:

```yaml
deploy_canary:
  stage: deploy
  script:
    - python3 canary_deploy.py --create --percentage 5
  only:
    - develop

promote_canary:
  stage: promote
  script:
    - python3 canary_deploy.py --promote
  when: manual
  only:
    - develop
```