# GitHub Integration for CQIL Website

This guide explains how to use the GitHub integration for deploying your CQIL website.

## 🔹 Quick Start

```bash
# Deploy to GitHub and FTP
python github_deploy.py --all

# Deploy to GitHub only
python github_deploy.py --github

# Deploy to FTP only
python github_deploy.py --ftp

# Setup GitHub repository and show CloudFlare Pages integration
python github_deploy.py --setup --cloudflare
```

## 🔹 Initial Setup

1. Create a GitHub Personal Access Token (classic):
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Give it a name like "CQIL Website Deployment"
   - Select the `repo` scope
   - Click "Generate token" and copy the token

2. Create your configuration file:
   ```bash
   cp github_config.yml.template github_config.yml
   ```

3. Edit the configuration file:
   ```bash
   nano github_config.yml
   ```
   
4. Add your GitHub token to the configuration file:
   ```yaml
   github:
     token: "your_token_here"
     owner: "gwelby"
     repo: "cqil-website"
     branch: "main"
   ```

5. Run the setup command:
   ```bash
   python github_deploy.py --setup
   ```

## 🔹 CloudFlare Pages Integration

To use CloudFlare Pages for automatic deployments:

1. Push your website to GitHub:
   ```bash
   python github_deploy.py --github
   ```

2. Follow the CloudFlare Pages setup instructions:
   ```bash
   python github_deploy.py --cloudflare
   ```

3. In CloudFlare dashboard:
   - Go to Pages
   - Create a new project
   - Connect to your GitHub repository
   - Configure build settings (usually empty for static sites)
   - Deploy

4. Setup your custom domain in CloudFlare Pages:
   - Go to your Pages project
   - Click "Custom domains"
   - Add your domain (e.g., cqil.ca)
   - Follow the verification steps
   
## 🔹 Deployment Options

### Deploy to GitHub Only

This option pushes your website to GitHub, which is useful if you're using CloudFlare Pages for deployments:

```bash
python github_deploy.py --github
```

### Deploy via FTP Only

This option deploys your website directly to your hosting via FTP, bypassing GitHub:

```bash
python github_deploy.py --ftp
```

### Deploy to Both GitHub and FTP

This option deploys to both GitHub and FTP, ensuring your website is available in both places:

```bash
python github_deploy.py --all
```

## 🔹 Workflow Integration

You can integrate this with your existing workflows:

### Basic Workflow

1. Make changes to your website
2. Test locally
3. Deploy to GitHub: `python github_deploy.py --github`
4. CloudFlare Pages will automatically deploy from GitHub

### Comprehensive Workflow

1. Make changes to your website
2. Test locally with `python deploy_now.py --server`
3. Deploy to both GitHub and FTP: `python github_deploy.py --all`
4. Verify your deployment with the monitoring system:
   ```bash
   cd /mnt/d/Projects/UniversalPublisher
   ./publish.sh monitor check cqil.ca
   ```

## 🔹 Testing and Verifying

### Automated Tests

We've added automated tests to verify the GitHub integration functionality:

```bash
# Run the GitHub integration tests
python3 test_github_integration.py
```

These tests mock the GitHub API and verify that our integration code works correctly.

### Manual Testing

Before deploying to production, test the integration:

1. Test GitHub repository connection:
   ```bash
   python github_deploy.py --setup
   ```
   
2. Test CloudFlare Pages configuration:
   ```bash
   python github_deploy.py --cloudflare
   ```

3. Verify website locally before deploying:
   ```bash
   python deploy_now.py --local
   cd /mnt/d/cqil/website_deployed && python3 -m http.server 8888
   ```

## 🔹 Troubleshooting

- **GitHub Authentication Errors**: Verify your token has the correct permissions and is correctly entered in github_config.yml
- **FTP Deployment Failures**: Try the traditional FTP deployment with `python deploy_now.py --ftp`
- **CloudFlare Pages Issues**: Check your CloudFlare Pages project settings and deployment logs
- **Token Issues**: If you see "GitHub token not configured" errors, make sure you've copied the token to github_config.yml
- **Git Not Found**: If you see "Git is not installed", install git with `apt-get install git` or `yum install git`
- **Repository Access Issues**: Ensure your token has the 'repo' scope and your GitHub account has the correct permissions

## 🔹 Security Notes

- Never commit your github_config.yml file with your token
- The .gitignore file has been configured to exclude this file
- Use environment variables for CI/CD pipelines instead of hardcoded tokens
- Regularly rotate your GitHub tokens for better security
- Consider using GitHub Actions secrets for automated deployments