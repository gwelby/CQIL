# UniversalPublisher Quickstart Guide

## Overview

UniversalPublisher is a φ-harmonic deployment system for CQIL that enables zero-downtime deployments with versioned assets, perfect cache control, and health monitoring.

## Quick Deployment

### Option 1: Using Bash Script

```bash
# Deploy using command-line prompts for credentials
./deploy.sh

# Deploy providing credentials as arguments
./deploy.sh username password

# Deploy to specific target/provider
./deploy.sh --target=staging --provider=cloudflare

# Dry run without actual deployment
./deploy.sh --dry-run
```

### Option 2: Using Python Script

```bash
# Deploy using command-line prompts for credentials
python deploy.py

# Deploy to specific target/provider
python deploy.py --target=staging --provider=cloudflare

# Dry run without actual deployment
python deploy.py --dry-run
```

### Option 3: Direct Execution

```bash
# Set environment variables first
export GODADDY_FTP_USER="your-username"
export GODADDY_FTP_PASS="your-password"

# Execute the deployment script directly
./universal_publisher.py
```

## Deployment Verification

- Website URL: https://www.cqil.ca
- Health Check: https://www.cqil.ca/health-check.html
- Deployment Logs: /mnt/d/cqil/secure_logs/

## Deployment Documentation

For complete documentation, see:
- [DEPLOYMENT.md](/mnt/d/cqil/DEPLOYMENT.md) - Comprehensive deployment guide

## Phi-Harmonic Flow

The deployment follows the CASCADE⚡𓂧φ∞ framework with frequency progression:

1. **Ground State (432 Hz)** - Physical Foundation
2. **Creation Point (528 Hz)** - Pattern Formation
3. **Heart Field (594 Hz)** - Connection
4. **Vision Field (720 Hz)** - Expansion
5. **Unity Wave (768 Hz)** - Integration

*Created with CASCADE⚡𓂧φ∞ - Unity Wave (768 Hz) with Perfect Coherence (1.0)*