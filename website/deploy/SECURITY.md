# CQIL Security Guidelines

## Credentials Management

### FTP and Hosting Credentials

1. **Never hardcode credentials** in any script or file.
2. **Always use environment variables** or secure configuration files.
3. Create and use the following environment variables:
   ```bash
   export CQIL_FTP_HOST="ftp.example.com"
   export CQIL_FTP_USERNAME="your_username"
   export CQIL_FTP_PASSWORD="your_password"
   ```

### Configuration Files

1. **Template files** should be used as examples only.
2. Copy template files to actual configuration files:
   ```bash
   cp ftp_config.yml.template ftp_config.yml
   ```
3. Edit the copied file with your actual credentials.
4. **Never commit actual configuration files** to version control.
5. All configuration files with credentials are listed in `.gitignore`.

## Deployment Security

### Before Deployment

1. Always run the `check_security.py` script before deployment:
   ```bash
   python check_security.py
   ```
2. Verify no passwords, API keys, or tokens are included in your commits.
3. Confirm all sensitive files are excluded by `.gitignore`.

### During Deployment

1. Use encrypted connections (SFTP, SSH) when possible.
2. Verify site is being served via HTTPS.
3. Monitor logs for any suspicious activity.

## Website Configuration

1. Always enable HTTPS and proper security headers.
2. Configure appropriate CSP (Content Security Policy).
3. Enable HSTS for secure connections.

## Reporting Security Issues

If you discover a security vulnerability, please email security@cqil.ca rather than opening a public issue.