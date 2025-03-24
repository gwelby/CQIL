# CQIL Website Deployment

Secure deployment solutions for the CQIL website with multiple deployment options.

> **IMPORTANT UPDATE**: The recommended deployment method is now the UniversalPublisher system. See the [new deployment guide](/ftp_check/deploy_guide.md) for details.

## Quick Start

### UniversalPublisher Deployment (Recommended)

```bash
# Navigate to the UniversalPublisher directory
cd /mnt/d/Projects/UniversalPublisher

# Deploy CQIL website with all optimizations
./publish deploy cqil.ca
```

Benefits:
- Automated backups before deployment
- Only uploads changed files (hash comparison for speed)
- Better security (credentials stored securely)
- Cloudflare cache purging integration
- Full logging and error handling

### Local Deployment and Testing

```bash
# Deploy to local test directory and view instructions
python deploy_now.py --local

# Open website directly in Windows Explorer:
# Navigate to D:\cqil\website_deployed and double-click index.html
```

### FTP Deployment (Legacy)

```bash
# Deploy via FTP with automated settings
python deploy_now.py --ftp

# OR deploy via FTP with interactive prompts
python deploy_now.py
```

### GitHub and CloudFlare Pages Deployment

```bash
# Deploy to GitHub repository
python github_deploy.py --github

# Deploy to both GitHub and FTP (recommended)
python github_deploy.py --all

# Show CloudFlare Pages integration instructions
python github_deploy.py --cloudflare
```

Read the full documentation in [GITHUB_DEPLOY.md](GITHUB_DEPLOY.md)

### SSH Deployment (Production)

```bash
# Full SSH-based deployment with security features
python deploy.py
```

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configuration options:
   - `deploy_now.py`: Fast deployment for testing
   - `godaddy_upload.py`: GoDaddy-specific deployment
   - `github_deploy.py`: GitHub and CloudFlare Pages integration
   - `deploy.py`: Full production deployment with SSH

3. Update configuration files according to your environment:
   - `config.yml`: SSH configuration for production deployment
   - `godaddy_config.yml`: FTP credentials for GoDaddy hosting
   - `secure_config.yml`: API tokens for Cloudflare and GoDaddy
   - `github_config.yml`: GitHub personal access token and repository settings

## Features

- Multiple deployment options (local, FTP, SSH, GitHub)
- CloudFlare Pages integration for automatic deployments
- Automatic backup before deployment
- File upload with directory creation
- Permission management
- Cache clearing
- Detailed logging with timestamped files
- Error handling and recovery
- Cloudflare integration for DNS and security

## Directory Structure

```
deploy/
├── deploy.py            # SSH deployment script
├── deploy_now.py        # Quick deployment script
├── godaddy_upload.py    # GoDaddy deployment script
├── github_deploy.py     # GitHub integration script
├── secure_api_manager.py # API management for Cloudflare/GoDaddy
├── config.yml           # SSH configuration
├── godaddy_config.yml   # GoDaddy FTP configuration
├── github_config.yml    # GitHub configuration
├── secure_config.yml    # API tokens and security configuration
├── requirements.txt     # Python dependencies
├── README.md            # Main documentation
├── GITHUB_DEPLOY.md     # GitHub deployment guide
├── CLOUDFLARE_FIX.md    # Troubleshooting for CloudFlare issues
└── secure_logs/         # Timestamped deployment logs
```

## Deployment Options

| Method | Best For | Command |
|--------|----------|---------|
| **UniversalPublisher** | **Recommended for all uses** | `cd /mnt/d/Projects/UniversalPublisher && ./publish deploy cqil.ca` |
| Local | Testing | `python deploy_now.py --local` |
| FTP | Legacy quick updates | `python deploy_now.py --ftp` |
| GitHub | Version control | `python github_deploy.py --github` |
| CloudFlare Pages | Automated deployment | Setup via `python github_deploy.py --cloudflare` |
| SSH | Production deployment | `python deploy.py` |

## Security Recommendations

1. Use SSH keys for production deployment (no passwords)
2. Keep API tokens and credentials secure
3. Use specific users for deployment with limited permissions
4. Set proper file permissions (644 for files, 755 for directories)
5. Enable SSL/TLS for all connections
6. Implement Cloudflare security features
7. Use .gitignore to prevent sensitive files from being committed to GitHub

## Testing the Website

### Website Content Testing

After deployment, test your website:

1. **Local testing**:
   ```bash
   cd /mnt/d/cqil/website_deployed && python3 -m http.server 8888
   ```
   Then open http://127.0.0.1:8888 in your browser.

2. **Direct file access**:
   - Open Windows Explorer to: D:\cqil\website_deployed
   - Double-click on index.html

3. **Key pages to test**:
   - Main page: index.html
   - Golden Age page: pages/golden-age.html
   - Experiments page: pages/experiments.html
   - Examples page: pages/examples.html
   - Mobile preview: mobile/index.html

### Integration Testing

Test the GitHub integration functionality:

```bash
# Run the GitHub integration tests
cd /mnt/d/cqil/website/deploy && python3 test_github_integration.py

# Test with specific GitHub integration features
cd /mnt/d/cqil/website/deploy && python3 github_deploy.py --setup

# Perform a dry run of the GitHub deployment
cd /mnt/d/cqil/website/deploy && python3 github_deploy.py --github
```

Note: You need a valid GitHub token in `github_config.yml` before running the actual deployment.

## Troubleshooting

1. Connection issues:
   - Check credentials and connection settings
   - Verify server hostname and ports
   - Check firewall settings

2. Upload failures:
   - Check disk space on server
   - Verify file permissions
   - Test with smaller file sets first

3. Cloudflare 403 errors:
   - See CLOUDFLARE_FIX.md for detailed solutions
   - Check SSL mode in Cloudflare settings
   - Clear cache after deployment

4. GitHub deployment issues:
   - See GITHUB_DEPLOY.md for detailed troubleshooting
   - Verify your GitHub token has the correct permissions
   - Check your CloudFlare Pages configuration