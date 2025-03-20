# CQIL Cloudflare Setup Guide

## 1. Domain Registration
1. Go to Cloudflare Registrar (cloudflare.com/products/registrar)
2. Register cqil.ca (~$12/year)
3. Benefits:
   - Free WHOIS privacy
   - No markup on renewals
   - Built-in security

## 2. DNS Configuration
```yaml
# A Records
Type  Name   Value           Proxy Status
A     @      185.199.108.153  Proxied    # GitHub Pages
A     www    185.199.108.153  Proxied    # GitHub Pages

# CNAME Records
Type   Name   Value                     Proxy Status
CNAME  docs   gwelby.github.io         Proxied
CNAME  api    gwelby.github.io         Proxied

# MX Records for Email
Type  Name  Priority  Value                    Proxy Status
MX    @     1        aspmx.l.google.com       DNS only
MX    @     5        alt1.aspmx.l.google.com  DNS only
MX    @     5        alt2.aspmx.l.google.com  DNS only
```

## 3. Security Settings
```yaml
# SSL/TLS
SSL Mode: Full (strict)
Always Use HTTPS: On
Min TLS Version: 1.2
TLS 1.3: On

# Security Headers
HSTS: On
CSP: On
XSS Protection: On
```

## 4. Performance Settings
```yaml
# Caching
Cache Level: Standard
Browser Cache TTL: 4 hours
Always Online: On

# Optimization
Auto Minify: CSS, JS, HTML
Brotli: On
Rocket Loader: On
```

## 5. Page Rules
```yaml
# Force HTTPS
URL: http://*cqil.ca/*
Setting: Always Use HTTPS

# Cache API Docs
URL: cqil.ca/docs/*
Settings: 
  - Cache Level: Cache Everything
  - Edge Cache TTL: 2 hours
```

## 6. Workers (Optional)
```javascript
// Quantum Analytics Worker
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Add quantum analytics
  // Track flow patterns
  // Monitor usage
}
```

## 7. Email Setup
1. Configure Google Workspace:
   ```yaml
   Domain: cqil.ca
   Primary Email: contact@cqil.ca
   Alias Emails:
     - support@cqil.ca
     - info@cqil.ca
   ```

2. Verify Domain:
   - Add TXT record from Google
   - Add MX records (shown above)

## 8. Security Best Practices
1. Enable 2FA on Cloudflare
2. Use Cloudflare Access for admin areas
3. Configure Web Application Firewall (WAF)
4. Enable Rate Limiting
5. Monitor Security Events

## 9. Monitoring
1. Enable Cloudflare Analytics
2. Set up Health Checks
3. Configure Alerts for:
   - SSL expiration
   - Domain expiration
   - Security events
   - Performance issues
