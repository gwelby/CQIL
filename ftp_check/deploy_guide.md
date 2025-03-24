# CQIL Website Deployment Guide

## Using UniversalPublisher (Recommended)

The UniversalPublisher is a comprehensive deployment solution that offers numerous advantages over the previous deployment method, including better security, automated backups, and Cloudflare integration.

### Initial Setup

CQIL has been configured in the UniversalPublisher. The configuration includes:
- FTP connection details
- Cloudflare CDN integration
- Automated backups
- File hash checking (only uploads changed files)
- Email routing setup

### Deploying the Website

To deploy CQIL website using UniversalPublisher:

```bash
# Navigate to the UniversalPublisher directory
cd /mnt/d/Projects/UniversalPublisher

# View available domains (to verify cqil.ca is configured)
./publish list

# Check status and configuration details
./publish info cqil.ca

# Deploy the website
./publish deploy cqil.ca
```

### Benefits of UniversalPublisher

1. **Better Security**
   - Credentials stored in a single secure location
   - Proper handling of sensitive information
   - No hardcoded passwords in scripts

2. **Improved Reliability**
   - Automatic backups before deployment
   - Hash-based file comparison (only uploads changed files)
   - Retry logic for failed uploads
   - Detailed logging

3. **Performance Optimization**
   - Cloudflare cache purging after deployment
   - Skips unchanged files for faster deployment
   - Creates directories as needed

4. **Additional Features**
   - Email routing configuration
   - Multi-domain management
   - Website health monitoring
   - Integration with Cloudflare Workers

## Legacy Deployment Method (Not Recommended)

The previous deployment method using `website/deploy/deploy_now.py` is still available but not recommended:

```bash
cd /mnt/d/CQIL
python3 website/deploy/deploy_now.py --ftp
```

This method lacks many of the security features and optimizations provided by UniversalPublisher.

## Security Best Practices

1. Never store credentials in code repositories
2. Use environment variables for sensitive information
3. Set up proper .gitignore rules
4. Keep deployment separate from website code
5. Use secure connections (FTPS/SFTP where available)

## Troubleshooting

If you encounter issues with deployment:

1. Check the logs in `/mnt/d/Projects/UniversalPublisher/logs/`
2. Verify FTP credentials are correct
3. Ensure you have the proper permissions on the server
4. Verify local path exists and contains website files
5. For Cloudflare issues, check the API token has proper permissions