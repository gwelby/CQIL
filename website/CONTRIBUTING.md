# Contributing to CQIL Website

Thank you for considering contributing to the CQIL website! This guide will help you get started.

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/gwelby/cqil-website.git
   cd cqil-website
   ```

2. Install deployment tools dependencies:
   ```bash
   cd deploy
   pip install -r requirements.txt
   ```

3. Setup local deployment for testing:
   ```bash
   python deploy_now.py --local
   ```

4. Start a local server to test your changes:
   ```bash
   cd /mnt/d/cqil/website_deployed
   python -m http.server 8888
   ```

## Making Changes

### Website Structure

The website follows this general structure:
```
/
├── index.html          # Main page
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   ├── interactive-features.js
│   ├── quantum-experience.js
│   └── ai-quantum-coach.js
├── pages/
│   ├── golden-age.html
│   ├── experiments.html
│   └── examples.html
└── img/
    └── various images
```

### Coding Standards

1. **HTML**:
   - Use semantic HTML5 elements
   - Validate HTML using W3C Validator
   - Keep indentation consistent (2 spaces)

2. **CSS**:
   - Follow BEM naming convention where possible
   - Organize CSS by components
   - Use responsive design principles

3. **JavaScript**:
   - Write clean, well-commented code
   - Prefer vanilla JavaScript where possible
   - Document complex functions

## Deployment Process

1. Test your changes locally
2. Deploy to the test environment:
   ```bash
   cd deploy
   python deploy_now.py --local
   ```

3. Deploy to the live site via GitHub and CloudFlare Pages:
   ```bash
   python github_deploy.py --all
   ```

4. Monitor the site after deployment to ensure everything works correctly

## Pull Request Process

1. Create a new branch for your feature or fix
2. Make your changes and commit them
3. Push the branch to your fork
4. Submit a pull request with a clear description of the changes

## Quantum Principles

When contributing to the CQIL website, keep in mind these core principles:

1. **Clarity**: Information should be presented clearly
2. **Accessibility**: Content should be accessible to all
3. **Inspiration**: Design should inspire quantum learning
4. **Engagement**: Interactive elements should engage users
5. **Phi Principle**: Follow the golden ratio (1.618) in design where possible

## Questions?

If you have any questions about contributing, please contact the repository owner.

Thank you for helping make the CQIL website better!