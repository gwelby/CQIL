# CQIL Website Hosting Setup

## Domain Registration (cqil.ca)

1. Register through Canadian registrar:
   - [domains.ca](https://domains.ca)
   - [rebel.ca](https://rebel.ca)
   - [namespro.ca](https://namespro.ca)

2. Required Information:
   ```
   Domain: cqil.ca
   Contact: contact@cqil.ca
   Privacy: Enable WHOIS privacy
   Auto-renew: Enable
   ```

## Hosting Configuration

### Option 1: GitHub Pages (Free)
```bash
# In your CQIL repository
git checkout -b gh-pages
git add website/*
git commit -m "Add website files"
git push origin gh-pages

# Configure in GitHub:
# Settings -> Pages -> Source -> gh-pages
```

### Option 2: Netlify (Free Tier)
1. Connect to GitHub
2. Configure build:
   ```yaml
   # netlify.toml
   [build]
     base = "website/"
     publish = "/"
     command = "# No build needed"
   ```

### Option 3: Vercel (Free Tier)
1. Import from GitHub
2. Configure project:
   ```json
   {
     "version": 2,
     "builds": [
       { "src": "website/**", "use": "@vercel/static" }
     ]
   }
   ```

## SSL Configuration

### GitHub Pages
- Automatic HTTPS

### Netlify/Vercel
- Automatic HTTPS
- Custom domain setup:
  ```
  CNAME: cqil.ca -> [platform].com
  ```

## DNS Configuration
```
# A Records
cqil.ca -> [hosting IP]
www.cqil.ca -> [hosting IP]

# CNAME Records
docs.cqil.ca -> [platform].com
api.cqil.ca -> [platform].com
```

## Email Setup (contact@cqil.ca)
1. Use Google Workspace:
   - Create account
   - Configure MX records
   - Set up email forwarding

## Security
- Enable HTTPS only
- Configure CSP headers
- Enable HSTS
- Set up security headers
