# CQIL Universal Deployment Guide (∇λΣ∞)

## Overview

The CQIL Universal Publisher is a φ-harmonic deployment system operating at quantum-aligned frequencies (432Hz → 528Hz → 768Hz). It enables zero-downtime deployment with versioned assets, perfect cache control, and health monitoring.

## Deployment Architecture

The deployment follows the CASCADE⚡𓂧φ∞ framework with phi-harmonic frequency progression:

1. **Ground State (432 Hz)** - Physical Foundation
   - Initializes the deployment environment
   - Loads configuration
   - Creates secure workspace

2. **Creation Point (528 Hz)** - Pattern Formation
   - Prepares versioned assets
   - Creates version manifests
   - Establishes deployment patterns

3. **Heart Field (594 Hz)** - Connection
   - Establishes secure connection to provider
   - Creates deployment directory structure
   - Initiates file transfer

4. **Vision Field (720 Hz)** - Expansion
   - Transfers all website files and directories
   - Maintains directory structure
   - Ensures content coherence

5. **Unity Wave (768 Hz)** - Integration
   - Sets up zero-downtime routing
   - Verifies deployment success
   - Activates health monitoring

## Configuration

The Universal Publisher uses a YAML configuration file with environment variable support:

```yaml
# Location: /mnt/d/cqil/config/universal_publisher_config.yml
```

### Key Configuration Elements

- **Provider settings** (GoDaddy, GitHub, Cloudflare)
- **Asset versioning** for optimal cache control
- **Zero-downtime deployment** via .htaccess
- **Health check** templates for monitoring
- **Security** features (Merkaba Shield, Crystal Matrix)

## Deployment Process

### Prerequisites

1. Ensure Python 3.6+ is installed
2. Required Python packages:
   - PyYAML
   - ftplib (standard library)

### Environment Variables

Set up the following environment variables for secure deployment:

```bash
# GoDaddy FTP credentials
export GODADDY_FTP_USER="your-username"
export GODADDY_FTP_PASS="your-password"

# GitHub credentials (if using GitHub provider)
export GITHUB_TOKEN="your-github-token"

# Cloudflare credentials (if using Cloudflare provider)
export CLOUDFLARE_ACCOUNT_ID="your-cloudflare-account-id"
export CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"
export CLOUDFLARE_ZONE_ID="your-cloudflare-zone-id"
```

### Running a Deployment

To deploy the CQIL website, follow these steps:

1. Navigate to the project directory:
   ```bash
   cd /mnt/d/cqil
   ```

2. Make the deployment script executable:
   ```bash
   chmod +x universal_publisher.py
   ```

3. Run the deployment:
   ```bash
   ./universal_publisher.py
   ```

### Deployment Options

The Universal Publisher supports various command-line options:

```bash
# Deploy to production using GoDaddy (default)
./universal_publisher.py

# Deploy to staging using Cloudflare
./universal_publisher.py --target=staging --provider=cloudflare

# Deploy to development using GitHub
./universal_publisher.py --target=development --provider=github

# Perform a dry run without actual deployment
./universal_publisher.py --dry-run
```

## Deployment Verification

After deployment, verify the following:

1. Website is accessible at https://www.cqil.ca
2. Health check is accessible at https://www.cqil.ca/health-check.html
3. Asset versioning is working correctly
4. Deployment logs are available in `/mnt/d/cqil/secure_logs/`

## Zero-Downtime Deployment

The Universal Publisher implements zero-downtime deployment using the following strategy:

1. Create a new versioned directory (e.g., `v2025_03_31_123456`)
2. Upload all files to the new directory
3. Update .htaccess to route traffic to the new directory
4. Maintain old deployments for backwards compatibility

## Asset Versioning

Assets are versioned using a φ-optimized hashing strategy:

1. CSS and JS files are hashed using MD5
2. Hash is truncated to 10 characters (φ-optimized length)
3. Filename format: `filename.{hash}.extension`
4. Versioned assets have 30-day cache expiration

## Phi-Harmonic Principles

The deployment follows key phi-harmonic principles:

1. **Rule of Dimensional Coherence**: Maintains phi-harmonic relationships across all deployment dimensions
2. **Rule of Phi-Harmonic Flow**: Energy follows natural phi spiral pattern
3. **Rule of Zero-Point Integration**: Deployments begin from a perfectly balanced foundation
4. **Rule of Resonant Fields**: Creates stable resonance fields before expanding
5. **Rule of Transcendent Evolution**: Evolution occurs through dimensional gateway access
6. **Rule of Unity Integration**: Perfect system integration at Unity frequency (768 Hz)

## Troubleshooting

### Common Issues

1. **FTP Connection Failure**
   - Check FTP credentials in environment variables
   - Ensure FTP host is accessible
   - Verify firewall settings

2. **Asset Versioning Issues**
   - Check file permissions
   - Verify temp directory is writable
   - Ensure correct MIME types on server

3. **Deployment Verification Failure**
   - Check server logs
   - Verify .htaccess is uploaded correctly
   - Ensure mod_rewrite is enabled on server

### Deployment Logs

Deployment logs are stored in:
```
/mnt/d/cqil/secure_logs/quantum_deploy_YYYYMMDD_HHMMSS.log
```

## Archived Deployments

Previous deployment scripts are archived in:
```
/mnt/d/cqil/archived_deployments/
```

*Created with CASCADE⚡𓂧φ∞ - Unity Wave (768 Hz) with Perfect Coherence (1.0)*