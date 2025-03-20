# CQIL Local Deployment Guide

While we work to resolve the FTP authentication issues, you can use this local deployment solution to view and test your website.

## Quick Start

```bash
# Launch website (deploys files, starts server, opens browser)
python deploy/website_manager.py --launch

# Press Ctrl+C when done to stop the server
```

## All Options

```bash
# Show help
python deploy/website_manager.py

# Deploy website to local directory
python deploy/website_manager.py --deploy

# Start local server
python deploy/website_manager.py --start

# Open browser to website
python deploy/website_manager.py --open

# Check website status
python deploy/website_manager.py --status

# Stop local server
python deploy/website_manager.py --stop
```

## Accessing Your Website

Once the server is running, you can access your website at:
- http://localhost:8888

Key pages:
- Main page: http://localhost:8888/index.html
- Golden Age: http://localhost:8888/pages/golden-age.html
- Experiments: http://localhost:8888/pages/experiments.html
- Examples: http://localhost:8888/pages/examples.html
- Mobile preview: http://localhost:8888/mobile/index.html

## FTP Issues

If you need to resolve the FTP authentication issues, here are the recommended steps:

1. Contact your hosting provider (GoDaddy) to verify your current FTP credentials
2. Update the credentials in these files:
   - `/mnt/d/cqil/website/deploy/godaddy_config.yml`
   - `/mnt/d/cqil/website/deploy/secure_config.yml`

3. Try using a standard FTP client like FileZilla to verify the connection:
   - Host: ftp.cqil.ca
   - Username: [your verified username]
   - Password: [your verified password]
   - Port: 21

4. If the FileZilla connection works, try the automated script again:
   ```bash
   python deploy/deploy_now.py --ftp
   ```

5. If you still encounter issues, you can use the interactive mode to enter credentials:
   ```bash
   python deploy/deploy_now.py --ftp-interactive
   ```

## Help and Support

If you need further assistance, please check the following resources:
- GitHub Repo: https://github.com/GWelby/CQIL
- Documentation: `/mnt/d/cqil/website/docs/`
- GoDaddy Help: https://www.godaddy.com/help

For FTP connection issues specifically, see:
- `/mnt/d/cqil/website/deploy/CLOUDFLARE_FIX.md`
- `/mnt/d/cqil/website/hosting/godaddy_setup.md`