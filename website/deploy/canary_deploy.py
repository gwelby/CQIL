#!/usr/bin/env python3
"""
CQIL Website Canary Deployment System

This script implements a canary release system for the CQIL website,
allowing for gradual rollout of new versions with automatic monitoring
and rollback capabilities.
"""

import os
import sys
import json
import time
import yaml
import logging
import argparse
import threading
import subprocess
from pathlib import Path
from datetime import datetime, timedelta
from colorama import init, Fore, Style

# Initialize colorama for colored output
init()

class CanaryDeployment:
    def __init__(self):
        self.setup_logging()
        self.load_config()
        
        # Set paths
        self.website_dir = Path('/mnt/d/cqil/website')
        self.canary_dir = Path('/mnt/d/cqil/website_canary')
        self.stable_dir = Path('/mnt/d/cqil/website_stable')
        
        # Default canary settings
        self.initial_percentage = 5
        self.target_percentage = 100
        self.increment = 20  # Percentage points to increase each time
        self.check_duration = 300  # Seconds to monitor at each level
        self.monitoring_interval = 60  # Seconds between health checks
        
        # Deployment state
        self.canary_active = False
        self.current_percentage = 0
        self.current_version = None
        self.canary_start_time = None
        self.monitoring_thread = None
        
        # Load other scripts
        self.versioned_deploy_path = self.website_dir / 'deploy' / 'versioned_deploy.py'
        self.github_deploy_path = self.website_dir / 'deploy' / 'github_deploy.py'
        self.cf_worker_path = self.website_dir / 'deploy' / 'cloudflare-canary-worker.js'
    
    def setup_logging(self):
        """Configure logging"""
        log_dir = Path(__file__).parent / 'secure_logs'
        log_dir.mkdir(exist_ok=True)
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_dir / f'canary_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def load_config(self):
        """Load configuration"""
        try:
            config_path = Path(__file__).parent / 'canary_config.yml'
            
            if not config_path.exists():
                # Create default config if doesn't exist
                default_config = {
                    'canary': {
                        'initial_percentage': 5,
                        'target_percentage': 100,
                        'increment': 20,
                        'check_duration': 300,
                        'monitoring_interval': 60,
                        'auto_rollback': True,
                        'rollback_thresholds': {
                            'error_rate': 2.0,  # Percentage
                            'response_time': 1000,  # Milliseconds
                            'availability': 99.0,  # Percentage
                        }
                    },
                    'monitoring': {
                        'endpoints': [
                            {'name': 'home', 'path': '/'},
                            {'name': 'golden-age', 'path': '/pages/golden-age.html'},
                            {'name': 'experiments', 'path': '/pages/experiments.html'}
                        ],
                        'regions': ['us-east', 'eu-west', 'ap-east'],
                        'alert_email': 'alerts@cqil.ca'
                    },
                    'platforms': {
                        'cloudflare': {
                            'canary_url': 'https://canary.cqil.pages.dev',
                            'stable_url': 'https://cqil.pages.dev'
                        },
                        'github': {
                            'canary_branch': 'canary',
                            'stable_branch': 'main',
                            'canary_url': 'https://gwelby.github.io/cqil-website-canary',
                            'stable_url': 'https://gwelby.github.io/cqil-website'
                        },
                        'traditional': {
                            'canary_dir': '/canary',
                            'stable_dir': '/',
                            'canary_url': 'https://canary.cqil.ca',
                            'stable_url': 'https://cqil.ca'
                        }
                    }
                }
                
                with open(config_path, 'w') as f:
                    yaml.dump(default_config, f, default_flow_style=False)
                
                print(f"{Fore.YELLOW}Created default canary config at {config_path}. Please review and edit as needed.{Style.RESET_ALL}")
            
            # Load the config
            with open(config_path) as f:
                self.config = yaml.safe_load(f)
            
            # Apply config values
            canary_config = self.config.get('canary', {})
            self.initial_percentage = canary_config.get('initial_percentage', 5)
            self.target_percentage = canary_config.get('target_percentage', 100)
            self.increment = canary_config.get('increment', 20)
            self.check_duration = canary_config.get('check_duration', 300)
            self.monitoring_interval = canary_config.get('monitoring_interval', 60)
            
            self.logger.info("Canary configuration loaded successfully")
        except Exception as e:
            self.logger.error(f"Failed to load configuration: {e}")
            print(f"{Fore.RED}Failed to load configuration: {e}{Style.RESET_ALL}")
            sys.exit(1)
    
    def create_canary_worker(self):
        """Create or update the CloudFlare Worker for canary routing"""
        try:
            worker_template = '''/**
 * CQIL Website Canary Release Router
 * 
 * This Cloudflare Worker routes a percentage of traffic to the canary version
 * of the website, allowing for gradual rollout of new versions.
 */

// Current canary settings - Updated by canary_deploy.py
const CANARY_CONFIG = {
  isActive: {{IS_ACTIVE}},
  percentage: {{PERCENTAGE}},
  version: "{{VERSION}}",
  startTime: "{{START_TIME}}",
  canaryOrigins: [
    { name: "cloudflare", url: "{{CLOUDFLARE_CANARY_URL}}" },
    { name: "github", url: "{{GITHUB_CANARY_URL}}" },
    { name: "traditional", url: "{{TRADITIONAL_CANARY_URL}}" }
  ],
  stableOrigins: [
    { name: "cloudflare", url: "{{CLOUDFLARE_STABLE_URL}}" },
    { name: "github", url: "{{GITHUB_STABLE_URL}}" },
    { name: "traditional", url: "{{TRADITIONAL_STABLE_URL}}" }
  ]
};

// Event listener for incoming requests
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Determine if the request should go to canary
 * @param {Request} request - Incoming request
 * @returns {boolean} - Whether to route to canary
 */
function shouldRouteToCanary(request) {
  if (!CANARY_CONFIG.isActive || CANARY_CONFIG.percentage <= 0) {
    return false;
  }
  
  // Always route to canary if the cookie is set
  const cookie = request.headers.get('cookie') || '';
  if (cookie.includes('canary=true')) {
    return true;
  }
  
  // Always route to stable if the cookie is explicitly set to false
  if (cookie.includes('canary=false')) {
    return false;
  }

  // Check if user is in the canary percentage
  const clientIP = request.headers.get('cf-connecting-ip') || '';
  const userAgent = request.headers.get('user-agent') || '';
  
  // Create a deterministic but random-seeming value from the IP and user agent
  const combinedString = clientIP + userAgent + CANARY_CONFIG.version;
  
  // Generate a hash of the string and take modulo 100
  // Simple hash for demonstration
  let hash = 0;
  for (let i = 0; i < combinedString.length; i++) {
    hash = ((hash << 5) - hash) + combinedString.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  const value = Math.abs(hash % 100);
  
  // If value is less than the percentage, route to canary
  return value < CANARY_CONFIG.percentage;
}

/**
 * Check the health of a specific origin
 * @param {string} url - URL to health check endpoint
 * @returns {Promise<boolean>} - Whether the origin is healthy
 */
async function checkOriginHealth(url) {
  try {
    const healthCheckUrl = `${url}/health-check.html`;
    const response = await fetch(healthCheckUrl, {
      cf: {
        cacheTtl: 60,
        cacheEverything: false
      }
    });
    
    if (response.status === 200) {
      const text = await response.text();
      return text.includes('data-status="healthy"');
    }
    return false;
  } catch (e) {
    console.error(`Health check failed for ${url}: ${e.message}`);
    return false;
  }
}

/**
 * Get healthy origins for a group (canary or stable)
 * @param {Array} origins - List of origins to check
 * @returns {Promise<Array>} - List of healthy origins
 */
async function getHealthyOrigins(origins) {
  const results = await Promise.all(
    origins.map(async (origin) => {
      const healthy = await checkOriginHealth(origin.url);
      return {
        ...origin,
        healthy
      };
    })
  );
  
  return results.filter(origin => origin.healthy);
}

/**
 * Main request handler
 * @param {Request} request - Incoming request
 * @returns {Promise<Response>} - Response to return
 */
async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Handle canary API endpoint
  if (url.pathname === '/api/canary') {
    return handleCanaryApiRequest();
  }
  
  // Set canary cookie if requested
  if (url.pathname === '/set-canary') {
    const params = url.searchParams;
    const enabled = params.get('enabled') === 'true';
    return handleSetCanaryRequest(request, enabled);
  }
  
  // Determine if this request should go to canary
  const useCanary = shouldRouteToCanary(request);
  
  // Get healthy origins for the selected environment
  const targetOrigins = useCanary ? 
    CANARY_CONFIG.canaryOrigins : 
    CANARY_CONFIG.stableOrigins;
  
  const healthyOrigins = await getHealthyOrigins(targetOrigins);
  
  // If no healthy origins in the selected environment, fallback to the other
  if (healthyOrigins.length === 0) {
    console.log(`No healthy origins found for ${useCanary ? 'canary' : 'stable'}, trying fallback`);
    const fallbackOrigins = useCanary ? 
      CANARY_CONFIG.stableOrigins : 
      CANARY_CONFIG.canaryOrigins;
    
    const fallbackHealthyOrigins = await getHealthyOrigins(fallbackOrigins);
    
    if (fallbackHealthyOrigins.length === 0) {
      // Both environments are unhealthy, return error
      return new Response('Service temporarily unavailable. Our team has been notified.', { 
        status: 503,
        headers: { 
          'Content-Type': 'text/plain',
          'Retry-After': '60'
        }
      });
    }
    
    // Use the fallback healthy origin
    const targetOrigin = fallbackHealthyOrigins[0];
    return routeToOrigin(request, url, targetOrigin, !useCanary);
  }
  
  // Use a healthy origin from the selected environment
  const targetOrigin = healthyOrigins[0];
  return routeToOrigin(request, url, targetOrigin, useCanary);
}

/**
 * Route request to a specific origin
 * @param {Request} request - Original request
 * @param {URL} url - Parsed URL
 * @param {Object} origin - Target origin
 * @param {boolean} isCanary - Whether this is a canary origin
 * @returns {Promise<Response>} - Response from origin
 */
async function routeToOrigin(request, url, origin, isCanary) {
  // Construct the full URL to the resource on the target origin
  const targetUrl = `${origin.url}${url.pathname}${url.search}`;
  
  // Clone the request to modify it
  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  });
  
  // Add debugging headers
  newRequest.headers.set('X-Routed-By', 'CQIL-Canary-Router');
  newRequest.headers.set('X-Environment', isCanary ? 'canary' : 'stable');
  newRequest.headers.set('X-Origin', origin.name);
  
  const response = await fetch(newRequest);
  
  // Clone the response to add headers
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('X-Served-By', origin.name);
  newResponse.headers.set('X-Environment', isCanary ? 'canary' : 'stable');
  
  return newResponse;
}

/**
 * Handle canary API request
 * @returns {Promise<Response>} - Canary status response
 */
async function handleCanaryApiRequest() {
  // Check health of all origins
  const canaryOrigins = await Promise.all(
    CANARY_CONFIG.canaryOrigins.map(async (origin) => {
      const healthy = await checkOriginHealth(origin.url);
      return {
        name: origin.name,
        url: origin.url,
        healthy
      };
    })
  );
  
  const stableOrigins = await Promise.all(
    CANARY_CONFIG.stableOrigins.map(async (origin) => {
      const healthy = await checkOriginHealth(origin.url);
      return {
        name: origin.name,
        url: origin.url,
        healthy
      };
    })
  );
  
  return new Response(JSON.stringify({
    canary: {
      active: CANARY_CONFIG.isActive,
      percentage: CANARY_CONFIG.percentage,
      version: CANARY_CONFIG.version,
      startTime: CANARY_CONFIG.startTime,
      origins: canaryOrigins
    },
    stable: {
      origins: stableOrigins
    },
    timestamp: new Date().toISOString()
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=60'
    }
  });
}

/**
 * Handle setting the canary cookie
 * @param {Request} request - Original request
 * @param {boolean} enabled - Whether to enable canary
 * @returns {Promise<Response>} - Response with cookie set
 */
async function handleSetCanaryRequest(request, enabled) {
  // Get the referrer or default to the root
  const referrer = request.headers.get('referer') || '/';
  
  // Create response that redirects back to the referrer
  const response = new Response(null, {
    status: 302,
    headers: {
      'Location': referrer,
      'Set-Cookie': `canary=${enabled ? 'true' : 'false'}; path=/; max-age=86400; Secure;`,
      'Cache-Control': 'no-store'
    }
  });
  
  return response;
}
'''
            
            # Replace placeholders with actual values
            worker_content = worker_template.replace('{{IS_ACTIVE}}', str(self.canary_active).lower())
            worker_content = worker_content.replace('{{PERCENTAGE}}', str(self.current_percentage))
            worker_content = worker_content.replace('{{VERSION}}', str(self.current_version or 'none'))
            worker_content = worker_content.replace('{{START_TIME}}', str(self.canary_start_time or ''))
            
            # Replace platform URLs
            platforms = self.config.get('platforms', {})
            
            # CloudFlare URLs
            cf_config = platforms.get('cloudflare', {})
            worker_content = worker_content.replace('{{CLOUDFLARE_CANARY_URL}}', cf_config.get('canary_url', 'https://canary.cqil.pages.dev'))
            worker_content = worker_content.replace('{{CLOUDFLARE_STABLE_URL}}', cf_config.get('stable_url', 'https://cqil.pages.dev'))
            
            # GitHub URLs
            gh_config = platforms.get('github', {})
            worker_content = worker_content.replace('{{GITHUB_CANARY_URL}}', gh_config.get('canary_url', 'https://gwelby.github.io/cqil-website-canary'))
            worker_content = worker_content.replace('{{GITHUB_STABLE_URL}}', gh_config.get('stable_url', 'https://gwelby.github.io/cqil-website'))
            
            # Traditional URLs
            trad_config = platforms.get('traditional', {})
            worker_content = worker_content.replace('{{TRADITIONAL_CANARY_URL}}', trad_config.get('canary_url', 'https://canary.cqil.ca'))
            worker_content = worker_content.replace('{{TRADITIONAL_STABLE_URL}}', trad_config.get('stable_url', 'https://cqil.ca'))
            
            # Write the worker file
            with open(self.cf_worker_path, 'w') as f:
                f.write(worker_content)
            
            self.logger.info(f"Created/updated CloudFlare Worker at {self.cf_worker_path}")
            return True
        except Exception as e:
            self.logger.error(f"Failed to create CloudFlare Worker: {e}")
            print(f"{Fore.RED}Failed to create CloudFlare Worker: {e}{Style.RESET_ALL}")
            return False
    
    def create_canary_deployment(self):
        """Create a canary deployment"""
        try:
            print(f"\n{Fore.CYAN}=== Creating Canary Deployment ==={Style.RESET_ALL}")
            
            # Generate version identifier
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            self.current_version = f"canary-{timestamp}"
            self.canary_start_time = datetime.now().isoformat()
            
            # Create canary directory if it doesn't exist
            if not self.canary_dir.exists():
                self.canary_dir.mkdir(exist_ok=True, parents=True)
            
            # Run versioned deployment to the canary directory
            print(f"{Fore.CYAN}Running versioned deployment for canary...{Style.RESET_ALL}")
            
            # Assuming the versioned_deploy.py has been modified to accept an output directory
            cmd = [
                sys.executable, 
                str(self.versioned_deploy_path), 
                '--output', str(self.canary_dir),
                '--version', self.current_version
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode != 0:
                raise Exception(f"Versioned deployment failed: {result.stderr}")
            
            print(f"{Fore.GREEN}Successfully created versioned deployment for canary{Style.RESET_ALL}")
            
            # Create/update CloudFlare Worker
            self.canary_active = True
            self.current_percentage = self.initial_percentage
            if not self.create_canary_worker():
                return False
            
            # Deploy to all platforms
            if not self.deploy_canary():
                return False
            
            print(f"\n{Fore.GREEN}Canary deployment created successfully!{Style.RESET_ALL}")
            print(f"Version: {self.current_version}")
            print(f"Initial traffic percentage: {self.current_percentage}%")
            
            return True
        except Exception as e:
            self.logger.error(f"Failed to create canary deployment: {e}")
            print(f"{Fore.RED}Failed to create canary deployment: {e}{Style.RESET_ALL}")
            return False
    
    def deploy_canary(self):
        """Deploy canary version to all platforms"""
        try:
            print(f"\n{Fore.CYAN}=== Deploying Canary to All Platforms ==={Style.RESET_ALL}")
            
            # Deploy to GitHub canary repository
            print(f"{Fore.CYAN}Deploying to GitHub...{Style.RESET_ALL}")
            platforms = self.config.get('platforms', {})
            github_config = platforms.get('github', {})
            canary_branch = github_config.get('canary_branch', 'canary')
            
            cmd = [
                sys.executable, 
                str(self.github_deploy_path), 
                '--github',
                '--source', str(self.canary_dir),
                '--branch', canary_branch
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode != 0:
                self.logger.warning(f"GitHub deployment warning: {result.stderr}")
                print(f"{Fore.YELLOW}GitHub deployment warning: {result.stderr}{Style.RESET_ALL}")
            
            # Deploy to CloudFlare Pages
            print(f"{Fore.CYAN}Preparing CloudFlare Pages deployment...{Style.RESET_ALL}")
            print(f"{Fore.YELLOW}CloudFlare Pages deployment requires CI/CD integration.{Style.RESET_ALL}")
            print("Please ensure your CloudFlare Pages project is configured to deploy the canary branch.")
            
            # Deploy to traditional hosting (canary subdirectory)
            print(f"{Fore.CYAN}Deploying to traditional hosting canary directory...{Style.RESET_ALL}")
            traditional_config = platforms.get('traditional', {})
            canary_dir = traditional_config.get('canary_dir', '/canary')
            
            cmd = [
                sys.executable, 
                str(self.github_deploy_path), 
                '--ftp',
                '--source', str(self.canary_dir),
                '--target-dir', canary_dir
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode != 0:
                self.logger.warning(f"Traditional hosting deployment warning: {result.stderr}")
                print(f"{Fore.YELLOW}Traditional hosting deployment warning: {result.stderr}{Style.RESET_ALL}")
            
            print(f"{Fore.GREEN}Canary deployment to all platforms completed{Style.RESET_ALL}")
            return True
        except Exception as e:
            self.logger.error(f"Failed to deploy canary: {e}")
            print(f"{Fore.RED}Failed to deploy canary: {e}{Style.RESET_ALL}")
            return False
    
    def start_canary_monitoring(self):
        """Start monitoring the canary deployment"""
        try:
            if not self.canary_active:
                print(f"{Fore.YELLOW}No active canary deployment to monitor{Style.RESET_ALL}")
                return False
            
            print(f"\n{Fore.CYAN}=== Starting Canary Monitoring ==={Style.RESET_ALL}")
            
            if self.monitoring_thread and self.monitoring_thread.is_alive():
                print(f"{Fore.YELLOW}Monitoring already active{Style.RESET_ALL}")
                return True
            
            # Start monitoring in a separate thread
            self.monitoring_thread = threading.Thread(
                target=self._monitor_canary_deployment,
                daemon=True
            )
            self.monitoring_thread.start()
            
            print(f"{Fore.GREEN}Canary monitoring started{Style.RESET_ALL}")
            print(f"Initial percentage: {self.current_percentage}%")
            print(f"Target percentage: {self.target_percentage}%")
            print(f"Increment: {self.increment}% every {self.check_duration} seconds")
            
            return True
        except Exception as e:
            self.logger.error(f"Failed to start canary monitoring: {e}")
            print(f"{Fore.RED}Failed to start canary monitoring: {e}{Style.RESET_ALL}")
            return False
    
    def _monitor_canary_deployment(self):
        """Monitoring thread for the canary deployment"""
        try:
            self.logger.info(f"Starting canary monitoring for version {self.current_version}")
            
            next_percentage = self.current_percentage
            
            while self.canary_active and next_percentage < self.target_percentage:
                # Monitor current percentage for check_duration
                start_time = datetime.now()
                end_time = start_time + timedelta(seconds=self.check_duration)
                
                print(f"{Fore.CYAN}Monitoring canary at {self.current_percentage}% until {end_time.strftime('%H:%M:%S')}{Style.RESET_ALL}")
                
                # Initialize metrics
                total_checks = 0
                successful_checks = 0
                response_times = []
                error_count = 0
                
                # Monitor for check_duration
                while datetime.now() < end_time and self.canary_active:
                    # Perform health checks on canary endpoints
                    platforms = self.config.get('platforms', {})
                    monitoring_config = self.config.get('monitoring', {})
                    endpoints = monitoring_config.get('endpoints', [])
                    
                    for platform, config in platforms.items():
                        canary_url = config.get('canary_url', '')
                        if not canary_url:
                            continue
                        
                        for endpoint in endpoints:
                            path = endpoint.get('path', '/')
                            url = f"{canary_url.rstrip('/')}{path}"
                            
                            try:
                                # Check the endpoint
                                import requests
                                start = time.time()
                                response = requests.get(url, timeout=10)
                                end = time.time()
                                
                                total_checks += 1
                                
                                if response.status_code == 200:
                                    successful_checks += 1
                                    response_times.append((end - start) * 1000)  # Convert to ms
                                else:
                                    error_count += 1
                                    self.logger.warning(f"Canary check failed for {url}: HTTP {response.status_code}")
                            except Exception as e:
                                total_checks += 1
                                error_count += 1
                                self.logger.error(f"Canary check error for {url}: {e}")
                    
                    # Sleep before next check
                    time.sleep(self.monitoring_interval)
                
                # Calculate metrics
                if total_checks > 0:
                    availability = (successful_checks / total_checks) * 100
                    error_rate = (error_count / total_checks) * 100
                    avg_response_time = sum(response_times) / len(response_times) if response_times else 0
                    
                    print(f"\n{Fore.CYAN}Canary Metrics at {self.current_percentage}%:{Style.RESET_ALL}")
                    print(f"Availability: {availability:.2f}%")
                    print(f"Error Rate: {error_rate:.2f}%")
                    print(f"Avg Response Time: {avg_response_time:.2f}ms")
                    
                    # Check against thresholds
                    thresholds = self.config.get('canary', {}).get('rollback_thresholds', {})
                    error_threshold = thresholds.get('error_rate', 2.0)
                    response_threshold = thresholds.get('response_time', 1000)
                    availability_threshold = thresholds.get('availability', 99.0)
                    
                    if error_rate > error_threshold:
                        self.logger.error(f"Canary error rate {error_rate:.2f}% exceeds threshold {error_threshold}%")
                        print(f"{Fore.RED}Error rate exceeds threshold. Rolling back.{Style.RESET_ALL}")
                        self.rollback_canary()
                        return
                    
                    if avg_response_time > response_threshold:
                        self.logger.error(f"Canary response time {avg_response_time:.2f}ms exceeds threshold {response_threshold}ms")
                        print(f"{Fore.RED}Response time exceeds threshold. Rolling back.{Style.RESET_ALL}")
                        self.rollback_canary()
                        return
                    
                    if availability < availability_threshold:
                        self.logger.error(f"Canary availability {availability:.2f}% below threshold {availability_threshold}%")
                        print(f"{Fore.RED}Availability below threshold. Rolling back.{Style.RESET_ALL}")
                        self.rollback_canary()
                        return
                    
                    # Increase percentage if all checks pass
                    next_percentage = min(self.current_percentage + self.increment, self.target_percentage)
                    self.current_percentage = next_percentage
                    
                    # Update CloudFlare Worker
                    self.create_canary_worker()
                    
                    print(f"{Fore.GREEN}Increased canary traffic to {self.current_percentage}%{Style.RESET_ALL}")
                else:
                    self.logger.warning("No canary checks were performed")
                    print(f"{Fore.YELLOW}No canary checks were performed{Style.RESET_ALL}")
            
            # If we've reached the target percentage, promote the canary
            if self.canary_active and self.current_percentage >= self.target_percentage:
                print(f"{Fore.GREEN}Canary deployment successful at {self.current_percentage}%{Style.RESET_ALL}")
                print("Ready for promotion to stable")
            
            self.logger.info("Canary monitoring completed")
        except Exception as e:
            self.logger.error(f"Canary monitoring error: {e}")
            print(f"{Fore.RED}Canary monitoring error: {e}{Style.RESET_ALL}")
            # Try to rollback on error
            self.rollback_canary()
    
    def rollback_canary(self):
        """Roll back the canary deployment"""
        try:
            print(f"\n{Fore.CYAN}=== Rolling Back Canary Deployment ==={Style.RESET_ALL}")
            
            if not self.canary_active:
                print(f"{Fore.YELLOW}No active canary deployment to roll back{Style.RESET_ALL}")
                return True
            
            # Set canary to inactive and 0%
            self.canary_active = False
            self.current_percentage = 0
            
            # Update CloudFlare Worker
            self.create_canary_worker()
            
            print(f"{Fore.GREEN}Canary deployment rolled back{Style.RESET_ALL}")
            self.logger.info(f"Canary deployment {self.current_version} rolled back")
            
            return True
        except Exception as e:
            self.logger.error(f"Failed to roll back canary: {e}")
            print(f"{Fore.RED}Failed to roll back canary: {e}{Style.RESET_ALL}")
            return False
    
    def promote_canary(self):
        """Promote the canary deployment to stable"""
        try:
            print(f"\n{Fore.CYAN}=== Promoting Canary to Stable ==={Style.RESET_ALL}")
            
            if not self.canary_active:
                print(f"{Fore.YELLOW}No active canary deployment to promote{Style.RESET_ALL}")
                return False
            
            # Check if canary is at 100%
            if self.current_percentage < 100:
                print(f"{Fore.YELLOW}Canary is only at {self.current_percentage}%, not 100%{Style.RESET_ALL}")
                choice = input("Promote anyway? (y/n): ").lower()
                if choice != 'y':
                    return False
            
            # Copy canary to stable
            if self.canary_dir.exists() and not self.stable_dir.exists():
                self.stable_dir.mkdir(exist_ok=True, parents=True)
            
            # Deploy to all stable environments
            print(f"{Fore.CYAN}Deploying canary to stable environments...{Style.RESET_ALL}")
            
            # Use github_deploy.py to deploy to all platforms but with the canary directory as source
            cmd = [
                sys.executable, 
                str(self.github_deploy_path), 
                '--multi',
                '--source', str(self.canary_dir)
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode != 0:
                self.logger.warning(f"Stable deployment warning: {result.stderr}")
                print(f"{Fore.YELLOW}Stable deployment warning: {result.stderr}{Style.RESET_ALL}")
            
            # Roll back canary to avoid confusion
            self.canary_active = False
            self.current_percentage = 0
            self.create_canary_worker()
            
            print(f"{Fore.GREEN}Canary version {self.current_version} successfully promoted to stable{Style.RESET_ALL}")
            self.logger.info(f"Canary version {self.current_version} promoted to stable")
            
            return True
        except Exception as e:
            self.logger.error(f"Failed to promote canary: {e}")
            print(f"{Fore.RED}Failed to promote canary: {e}{Style.RESET_ALL}")
            return False
    
    def check_canary_status(self):
        """Check the status of the current canary deployment"""
        try:
            print(f"\n{Fore.CYAN}=== Canary Deployment Status ==={Style.RESET_ALL}")
            
            if not self.canary_active:
                print(f"{Fore.YELLOW}No active canary deployment{Style.RESET_ALL}")
                return True
            
            print(f"Version: {self.current_version}")
            print(f"Start Time: {self.canary_start_time}")
            print(f"Traffic Percentage: {self.current_percentage}%")
            print(f"Target Percentage: {self.target_percentage}%")
            
            # Check if monitoring is active
            if self.monitoring_thread and self.monitoring_thread.is_alive():
                print(f"{Fore.GREEN}Monitoring: Active{Style.RESET_ALL}")
            else:
                print(f"{Fore.YELLOW}Monitoring: Inactive{Style.RESET_ALL}")
            
            # Show current traffic distribution
            platforms = self.config.get('platforms', {})
            
            print(f"\n{Fore.CYAN}Traffic Distribution:{Style.RESET_ALL}")
            print(f"Canary ({self.current_percentage}%):")
            for platform, config in platforms.items():
                canary_url = config.get('canary_url', '')
                if canary_url:
                    print(f"  - {platform}: {canary_url}")
            
            print(f"Stable ({100 - self.current_percentage}%):")
            for platform, config in platforms.items():
                stable_url = config.get('stable_url', '')
                if stable_url:
                    print(f"  - {platform}: {stable_url}")
            
            return True
        except Exception as e:
            self.logger.error(f"Failed to check canary status: {e}")
            print(f"{Fore.RED}Failed to check canary status: {e}{Style.RESET_ALL}")
            return False

def main():
    """Main function with command-line arguments"""
    parser = argparse.ArgumentParser(description='CQIL Website Canary Deployment System')
    parser.add_argument('--create', action='store_true', help='Create a new canary deployment')
    parser.add_argument('--monitor', action='store_true', help='Start monitoring an existing canary deployment')
    parser.add_argument('--rollback', action='store_true', help='Roll back the canary deployment')
    parser.add_argument('--promote', action='store_true', help='Promote canary to stable')
    parser.add_argument('--status', action='store_true', help='Check canary deployment status')
    parser.add_argument('--percentage', type=int, help='Initial traffic percentage for canary')
    parser.add_argument('--increment', type=int, help='Percentage increment for canary')
    parser.add_argument('--duration', type=int, help='Check duration in seconds')
    
    args = parser.parse_args()
    
    # Create canary deployment instance
    canary = CanaryDeployment()
    
    # Apply command line overrides
    if args.percentage is not None:
        canary.initial_percentage = args.percentage
    
    if args.increment is not None:
        canary.increment = args.increment
    
    if args.duration is not None:
        canary.check_duration = args.duration
    
    # Process commands
    if args.create:
        canary.create_canary_deployment()
        canary.start_canary_monitoring()
    elif args.monitor:
        canary.start_canary_monitoring()
    elif args.rollback:
        canary.rollback_canary()
    elif args.promote:
        canary.promote_canary()
    elif args.status:
        canary.check_canary_status()
    else:
        # If no arguments, show help
        parser.print_help()
    
    return 0

if __name__ == "__main__":
    sys.exit(main())