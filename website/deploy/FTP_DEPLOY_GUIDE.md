# CQIL FTP Deployment Guide

This guide explains how to deploy the CQIL website to the expecting.ca hosting server.

## FTP Configuration

The CQIL website is hosted within the expecting.ca hosting account, in a subfolder structure. Here are the key details:

- **FTP Host**: ftp.expecting.ca 
- **FTP Username**: mig@expecting.ca
- **FTP Password**: Zqc%TeG*WVkMvYZuIf2rGA9wMk
- **Remote Directory**: /public_html/cqil.ca

## Deployment Options

### Option 1: Easy Automated Deployment

The simplest way to deploy is using the deploy_now.py script:

```bash
cd /mnt/d/cqil/website/deploy
python3 deploy_now.py --ftp
```

This will automatically:
1. Connect to the FTP server using the configured credentials
2. Navigate to /public_html/cqil.ca directory
3. Upload all website files, creating directories as needed

### Option 2: GoDaddy Upload Script

For a more comprehensive deployment with backup:

```bash
cd /mnt/d/cqil/website/deploy
python3 godaddy_upload.py
```

This script will:
1. Connect to the FTP server
2. Create a backup of the existing files
3. Upload all new files

### Option 3: Interactive Deployment

If you need to use different credentials:

```bash
cd /mnt/d/cqil/website/deploy
python3 deploy_now.py --ftp-interactive
```

This will prompt you for:
- FTP host
- FTP username 
- FTP password

### Option 4: Manual FileZilla Upload

For manual control, you can use FileZilla:

1. Open FileZilla
2. Enter the connection details:
   - Host: ftp.expecting.ca
   - Username: mig@expecting.ca
   - Password: Zqc%TeG*WVkMvYZuIf2rGA9wMk
   - Port: 21
3. Navigate to /public_html/cqil.ca in the remote site
4. Upload files from the local website directory

## Troubleshooting

### Authentication Issues
- Verify that you're using the correct username: mig@expecting.ca
- The password should include special characters: Zqc%TeG*WVkMvYZuIf2rGA9wMk
- Try reconnecting if timeouts occur

### Directory Issues
- The website should be in /public_html/cqil.ca directory
- The script will create this directory if it doesn't exist

### Permission Issues
- Files should have 644 permissions
- Directories should have 755 permissions

## Post-Deployment

After deployment, visit your website at:
- http://cqil.ca

If you're using Cloudflare, you might need to clear the cache after deployment.

## Additional Information

For more deployment options, including local deployment:
- See [LOCAL_DEPLOY.md](LOCAL_DEPLOY.md) for local testing
- See [CLOUDFLARE_FIX.md](CLOUDFLARE_FIX.md) if you encounter Cloudflare issues