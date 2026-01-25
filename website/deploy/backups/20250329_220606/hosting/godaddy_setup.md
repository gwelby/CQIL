# CQIL GoDaddy Hosting Setup Guide

## 1. GoDaddy Hosting Setup

### Login to GoDaddy
1. Go to godaddy.com
2. Login to your account
3. Navigate to "My Products" -> "Web Hosting"

### Configure Hosting
1. Select your hosting plan
2. Click "Manage"
3. Go to "File Manager"

### Upload Files
```bash
# Method 1: File Manager
1. Click "Upload"
2. Select all files from your local /website folder
3. Maintain directory structure:
   - /public_html/
     ├── index.html
     ├── css/
     ├── js/
     ├── pages/
     └── docs/

# Method 2: FTP Upload (Recommended)
1. Get FTP credentials from GoDaddy:
   - Host: ftp.cqil.ca
   - Username: your_username
   - Password: your_password
   - Port: 21

2. Use FileZilla:
   - Download FileZilla
   - Enter FTP credentials
   - Drag files from local /website to /public_html
```

## 2. GitHub Repository Setup

### Public Repository
```bash
# Create public repo for website
1. Go to github.com/new
2. Name: CQIL
3. Description: "Cascade Quantum Integration Library - Public Website"
4. Public: Yes
5. Add README: Yes
6. Add .gitignore: Node

# Initialize local repo
git init
git add .
git commit -m "Initial CQIL website commit"
git remote add origin https://github.com/GWelby/CQIL.git
git push -u origin main
```

### Private Repository
```bash
# Create private repo for sensitive code
1. Go to github.com/new
2. Name: CQIL-Private
3. Description: "CQIL Private Development"
4. Private: Yes
5. Add README: Yes
6. Add .gitignore: Python

# Setup private repo
mkdir CQIL-Private
cd CQIL-Private
git init
git add .
git commit -m "Initial private commit"
git remote add origin https://github.com/GWelby/CQIL-Private.git
git push -u origin main
```

## 3. Repository Structure
```
CQIL (Public)
├── website/          # Public website
├── examples/         # Public examples
├── docs/            # Public documentation
└── README.md        # Public info

CQIL-Private
├── src/             # Private source code
├── tests/           # Private tests
├── configs/         # Private configurations
└── README.md        # Private documentation
```

## 4. Domain Configuration

### GoDaddy DNS Settings
1. Go to Domain Manager
2. Select cqil.ca
3. Click "DNS"
4. Add/Update records:
```yaml
# A Records
Type  Name   Value           TTL
A     @      [Server IP]     600
A     www    [Server IP]     600

# CNAME Records
Type   Name   Value          TTL
CNAME  docs   cqil.ca        600
CNAME  api    cqil.ca        600
```

## 5. SSL Certificate

### Install SSL (GoDaddy)
1. Go to SSL Certificates
2. Click "Install Certificate"
3. Select cqil.ca
4. Follow installation wizard

### Force HTTPS
Add to .htaccess in public_html:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## 6. Maintenance

### Regular Updates
```bash
# Local development
1. Make changes
2. Test locally
3. Commit to GitHub

# Update website
1. Login to GoDaddy
2. Use File Manager or FTP
3. Upload changed files
```

### Backup Strategy
1. GitHub serves as code backup
2. Download regular backup from GoDaddy
3. Keep local copy of all files

## 7. Security Best Practices

### File Permissions
```bash
# Set correct permissions
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
```

### Private Content
1. Never upload private keys
2. Keep sensitive data in private repo
3. Use .gitignore for private files

## 8. Monitoring

### Setup Monitoring
1. Enable GoDaddy monitoring
2. Set up email alerts
3. Monitor:
   - Uptime
   - SSL expiry
   - Domain expiry
   - Server health
