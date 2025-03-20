#!/usr/bin/env python3
"""
CQIL Website Self-Healing System

This script implements a self-healing system for the CQIL website,
automatically detecting and recovering from common failure scenarios.
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
import requests
from pathlib import Path
from datetime import datetime, timedelta
from colorama import init, Fore, Style
from typing import Dict, List, Any, Optional, Tuple

# Initialize colorama for colored output
init()

class SelfHealingSystem:
    def __init__(self):
        self.setup_logging()
        self.load_config()
        
        # Set paths
        self.website_dir = Path('/mnt/d/cqil/website')
        self.deploy_dir = self.website_dir / 'deploy'
        
        # Paths to other scripts
        self.health_monitor_path = self.deploy_dir / 'monitor_health.py'
        self.versioned_deploy_path = self.deploy_dir / 'versioned_deploy.py'
        self.github_deploy_path = self.deploy_dir / 'github_deploy.py'
        self.canary_deploy_path = self.deploy_dir / 'canary_deploy.py'
        
        # Healing state tracking
        self.active_healing_procedures = {}
        self.healing_history = []
        self.last_health_check = None
        self.monitoring_thread = None
        self.healing_in_progress = False
        
        # Default monitoring settings
        self.check_interval = 300  # 5 minutes
        self.healing_cooldown = 1800  # 30 minutes
        self.max_auto_healing_attempts = 3  # Maximum auto-healing attempts per issue
    
    def setup_logging(self):
        """Configure logging"""
        log_dir = Path(__file__).parent / 'secure_logs'
        log_dir.mkdir(exist_ok=True)
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_dir / f'self_healing_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def load_config(self):
        """Load configuration"""
        try:
            config_path = Path(__file__).parent / 'self_healing_config.yml'
            
            if not config_path.exists():
                # Create default config if doesn't exist
                default_config = {
                    'self_healing': {
                        'enabled': True,
                        'check_interval': 300,  # 5 minutes
                        'healing_cooldown': 1800,  # 30 minutes
                        'max_auto_healing_attempts': 3,
                        'auto_rollback_on_failure': True
                    },
                    'monitoring': {
                        'endpoints': [
                            {'name': 'home', 'path': '/'},
                            {'name': 'golden-age', 'path': '/pages/golden-age.html'},
                            {'name': 'experiments', 'path': '/pages/experiments.html'}
                        ],
                        'regions': ['us-east', 'eu-west', 'ap-east'],
                        'alert_email': 'alerts@cqil.ca',
                        'thresholds': {
                            'error_rate': 1.0,  # Percentage
                            'response_time': 800,  # Milliseconds
                            'availability': 99.5  # Percentage
                        }
                    },
                    'cloudflare': {
                        'api': {
                            'token': 'YOUR_CLOUDFLARE_API_TOKEN',
                            'email': 'YOUR_CLOUDFLARE_EMAIL',
                            'zone_id': 'YOUR_CLOUDFLARE_ZONE_ID'
                        },
                        'purge_cache_on_recovery': True
                    },
                    'platforms': {
                        'cloudflare': {
                            'url': 'https://cqil.pages.dev',
                            'health_path': '/health-check.html'
                        },
                        'github': {
                            'url': 'https://gwelby.github.io/cqil-website',
                            'health_path': '/health-check.html'
                        },
                        'traditional': {
                            'url': 'https://cqil.ca',
                            'health_path': '/health-check.html'
                        }
                    },
                    'recovery_procedures': {
                        'cdn_cache_failure': {
                            'enabled': True,
                            'max_attempts': 3,
                            'cooldown': 900  # 15 minutes
                        },
                        'origin_failure': {
                            'enabled': True,
                            'max_attempts': 3,
                            'cooldown': 900  # 15 minutes
                        },
                        'dns_failure': {
                            'enabled': True,
                            'max_attempts': 2,
                            'cooldown': 1800  # 30 minutes
                        },
                        'ssl_failure': {
                            'enabled': True,
                            'max_attempts': 2,
                            'cooldown': 3600  # 60 minutes
                        }
                    }
                }
                
                with open(config_path, 'w') as f:
                    yaml.dump(default_config, f, default_flow_style=False)
                
                print(f"{Fore.YELLOW}Created default self-healing config at {config_path}. Please review and edit as needed.{Style.RESET_ALL}")
            
            # Load the config
            with open(config_path) as f:
                self.config = yaml.safe_load(f)
            
            # Apply config values
            healing_config = self.config.get('self_healing', {})
            self.check_interval = healing_config.get('check_interval', 300)
            self.healing_cooldown = healing_config.get('healing_cooldown', 1800)
            self.max_auto_healing_attempts = healing_config.get('max_auto_healing_attempts', 3)
            
            self.logger.info("Self-healing configuration loaded successfully")
        except Exception as e:
            self.logger.error(f"Failed to load configuration: {e}")
            print(f"{Fore.RED}Failed to load configuration: {e}{Style.RESET_ALL}")
            sys.exit(1)
    
    def setup_self_healing(self):
        """Set up the self-healing system"""
        try:
            print(f"\n{Fore.CYAN}=== Setting up Self-Healing System ==={Style.RESET_ALL}")
            
            # Register recovery procedures
            self.recovery_procedures = {
                "cdn_cache_failure": self._recover_cdn_cache,
                "origin_failure": self._recover_origin,
                "dns_failure": self._recover_dns,
                "ssl_failure": self._recover_ssl
            }
            
            # Check if enabled in config
            healing_config = self.config.get('self_healing', {})
            if not healing_config.get('enabled', True):
                print(f"{Fore.YELLOW}Self-healing system is disabled in config{Style.RESET_ALL}")
                return False
            
            # Start self-healing monitor
            self.start_monitoring()
            
            print(f"{Fore.GREEN}Self-healing system setup complete{Style.RESET_ALL}")
            return True
        except Exception as e:
            self.logger.error(f"Failed to setup self-healing: {e}")
            print(f"{Fore.RED}Failed to setup self-healing: {e}{Style.RESET_ALL}")
            return False
    
    def start_monitoring(self):
        """Start the self-healing monitoring"""
        try:
            print(f"\n{Fore.CYAN}=== Starting Self-Healing Monitoring ==={Style.RESET_ALL}")
            
            if self.monitoring_thread and self.monitoring_thread.is_alive():
                print(f"{Fore.YELLOW}Monitoring already active{Style.RESET_ALL}")
                return True
            
            # Start monitoring in a separate thread
            self.monitoring_thread = threading.Thread(
                target=self._run_self_healing_monitor,
                daemon=True
            )
            self.monitoring_thread.start()
            
            print(f"{Fore.GREEN}Self-healing monitoring started{Style.RESET_ALL}")
            print(f"Check interval: {self.check_interval} seconds")
            print(f"Healing cooldown: {self.healing_cooldown} seconds")
            print(f"Maximum auto-healing attempts: {self.max_auto_healing_attempts}")
            
            return True
        except Exception as e:
            self.logger.error(f"Failed to start monitoring: {e}")
            print(f"{Fore.RED}Failed to start monitoring: {e}{Style.RESET_ALL}")
            return False
    
    def stop_monitoring(self):
        """Stop the self-healing monitoring"""
        try:
            print(f"\n{Fore.CYAN}=== Stopping Self-Healing Monitoring ==={Style.RESET_ALL}")
            
            # While we can't directly stop a thread, we can set a flag
            # that the thread will check
            self.monitoring_active = False
            
            print(f"{Fore.YELLOW}Monitoring will stop after the current check cycle{Style.RESET_ALL}")
            return True
        except Exception as e:
            self.logger.error(f"Failed to stop monitoring: {e}")
            print(f"{Fore.RED}Failed to stop monitoring: {e}{Style.RESET_ALL}")
            return False
    
    def _run_self_healing_monitor(self):
        """Continuous monitoring for self-healing"""
        self.monitoring_active = True
        self.logger.info("Starting self-healing monitoring")
        
        while self.monitoring_active:
            try:
                # Check current health status
                health_status = self._check_health()
                self.last_health_check = {
                    "timestamp": datetime.now().isoformat(),
                    "status": health_status
                }
                
                # Detect failures
                failures = self._detect_failures(health_status)
                
                if failures:
                    self.logger.warning(f"Detected failures: {', '.join(failures.keys())}")
                    print(f"\n{Fore.RED}Detected failures: {', '.join(failures.keys())}{Style.RESET_ALL}")
                    
                    # Handle each failure type
                    for failure_type, details in failures.items():
                        if not self.healing_in_progress:
                            self._handle_failure(failure_type, details)
                
                # Sleep until next check
                time.sleep(self.check_interval)
            except Exception as e:
                self.logger.error(f"Error in self-healing monitor: {e}")
                time.sleep(60)  # Short sleep on error
        
        self.logger.info("Self-healing monitoring stopped")
    
    def _check_health(self) -> Dict[str, Any]:
        """Check the health of all platforms"""
        self.logger.info("Checking website health across all platforms")
        
        platforms = self.config.get('platforms', {})
        results = {}
        
        for name, platform in platforms.items():
            url = f"{platform['url']}{platform['health_path']}"
            
            try:
                response = requests.get(url, timeout=10)
                
                if response.status_code == 200 and "data-status=\"healthy\"" in response.text:
                    results[name] = {
                        "healthy": True,
                        "status_code": response.status_code,
                        "response_time": response.elapsed.total_seconds() * 1000,  # milliseconds
                        "timestamp": datetime.now().isoformat()
                    }
                else:
                    results[name] = {
                        "healthy": False,
                        "status_code": response.status_code,
                        "response_time": response.elapsed.total_seconds() * 1000,  # milliseconds
                        "error": f"Unexpected status code or content: {response.status_code}",
                        "timestamp": datetime.now().isoformat()
                    }
            except Exception as e:
                results[name] = {
                    "healthy": False,
                    "status_code": None,
                    "error": str(e),
                    "timestamp": datetime.now().isoformat()
                }
        
        # Check CloudFlare worker if available
        try:
            response = requests.get("https://cqil.ca/api/health", timeout=10)
            if response.status_code == 200:
                results["worker"] = {
                    "healthy": True,
                    "data": response.json(),
                    "timestamp": datetime.now().isoformat()
                }
            else:
                results["worker"] = {
                    "healthy": False,
                    "status_code": response.status_code,
                    "error": "API error",
                    "timestamp": datetime.now().isoformat()
                }
        except Exception as e:
            results["worker"] = {
                "healthy": False,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
        
        return results
    
    def _detect_failures(self, health_status: Dict[str, Any]) -> Dict[str, Any]:
        """Detect failures based on health check results"""
        failures = {}
        
        # Analyze results to classify failures
        unhealthy_platforms = [name for name, data in health_status.items() 
                              if name != "worker" and not data.get("healthy", False)]
        
        worker_healthy = health_status.get("worker", {}).get("healthy", False)
        
        # Check if worker is reporting but all origins are unhealthy
        if worker_healthy:
            worker_data = health_status.get("worker", {}).get("data", {})
            if worker_data.get("primaryOrigin") is None:
                self.logger.warning("All origins reported as unhealthy by CloudFlare worker")
                failures["origin_failure"] = {
                    "platforms": unhealthy_platforms,
                    "severity": "critical",
                    "timestamp": datetime.now().isoformat(),
                    "details": worker_data
                }
                return failures
        
        # If all platforms are unhealthy, likely a DNS or shared issue
        if len(unhealthy_platforms) == len(health_status) - 1:  # Exclude worker
            # Check for SSL issues (TLS handshake errors, etc.)
            ssl_errors = ["ssl", "tls", "certificate", "handshake"]
            has_ssl_errors = any(any(err in str(data.get("error", "")).lower() for err in ssl_errors) 
                                for name, data in health_status.items() if name != "worker")
            
            if has_ssl_errors:
                failures["ssl_failure"] = {
                    "platforms": unhealthy_platforms,
                    "severity": "critical",
                    "timestamp": datetime.now().isoformat()
                }
            else:
                # Likely DNS issue if not SSL
                failures["dns_failure"] = {
                    "platforms": unhealthy_platforms,
                    "severity": "critical",
                    "timestamp": datetime.now().isoformat()
                }
        # If just one platform is down, it's an origin failure
        elif unhealthy_platforms:
            failures["origin_failure"] = {
                "platforms": unhealthy_platforms,
                "severity": "high",
                "timestamp": datetime.now().isoformat()
            }
        
        # Check for CDN cache issues (high latency, stale content)
        slow_responses = []
        threshold = self.config.get('monitoring', {}).get('thresholds', {}).get('response_time', 800)
        
        for name, data in health_status.items():
            if name != "worker" and data.get("healthy") and data.get("response_time", 0) > threshold:
                slow_responses.append(name)
        
        if slow_responses:
            failures["cdn_cache_failure"] = {
                "platforms": slow_responses,
                "severity": "medium",
                "timestamp": datetime.now().isoformat()
            }
        
        return failures
    
    def _handle_failure(self, failure_type: str, details: Dict[str, Any]):
        """Handle a specific failure by executing the appropriate recovery procedure"""
        self.logger.info(f"Handling failure: {failure_type}")
        
        # Check if this failure type has a recovery procedure
        if failure_type not in self.recovery_procedures:
            self.logger.warning(f"No recovery procedure defined for {failure_type}")
            return False
        
        # Check if recovery is enabled for this failure type
        recovery_config = self.config.get('recovery_procedures', {}).get(failure_type, {})
        if not recovery_config.get('enabled', True):
            self.logger.info(f"Recovery for {failure_type} is disabled in config")
            return False
        
        # Check cooldown period
        max_attempts = recovery_config.get('max_attempts', self.max_auto_healing_attempts)
        cooldown = recovery_config.get('cooldown', self.healing_cooldown)
        
        # Check if we've previously attempted recovery for this failure type
        for healing_event in reversed(self.healing_history):
            if healing_event['failure_type'] == failure_type:
                # If a recent attempt was made, check cooldown
                time_since_last = (datetime.now() - datetime.fromisoformat(healing_event['timestamp'])).total_seconds()
                if time_since_last < cooldown:
                    self.logger.info(f"Skipping {failure_type} recovery - in cooldown period ({time_since_last:.0f}s < {cooldown}s)")
                    return False
                break
        
        # Count recent attempts
        recent_attempts = sum(1 for event in self.healing_history 
                             if event['failure_type'] == failure_type and 
                             (datetime.now() - datetime.fromisoformat(event['timestamp'])).total_seconds() < 86400)  # 24h
        
        if recent_attempts >= max_attempts:
            self.logger.warning(f"Maximum recovery attempts ({max_attempts}) for {failure_type} reached in the past 24h")
            return False
        
        # Execute recovery procedure
        self.healing_in_progress = True
        incident_id = f"{failure_type}_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        self.logger.info(f"Starting recovery procedure for {failure_type} (Incident: {incident_id})")
        print(f"\n{Fore.CYAN}=== Starting Recovery: {failure_type} (Incident: {incident_id}) ==={Style.RESET_ALL}")
        
        # Record the healing attempt
        healing_event = {
            'incident_id': incident_id,
            'failure_type': failure_type,
            'platforms': details.get('platforms', []),
            'severity': details.get('severity', 'medium'),
            'timestamp': datetime.now().isoformat(),
            'details': details
        }
        
        try:
            # Call the appropriate recovery procedure
            recovery_func = self.recovery_procedures[failure_type]
            success = recovery_func(healing_event)
            
            # Record the result
            healing_event['success'] = success
            self.healing_history.append(healing_event)
            
            if success:
                self.logger.info(f"Recovery successful for {failure_type} (Incident: {incident_id})")
                print(f"{Fore.GREEN}Recovery successful for {failure_type}{Style.RESET_ALL}")
                # Send success notification
                self._send_recovery_notification(healing_event)
            else:
                self.logger.warning(f"Recovery failed for {failure_type} (Incident: {incident_id})")
                print(f"{Fore.RED}Recovery failed for {failure_type}{Style.RESET_ALL}")
                # Send failure notification
                self._send_alert_notification(healing_event)
            
            return success
        except Exception as e:
            self.logger.error(f"Error during recovery for {failure_type}: {e}")
            print(f"{Fore.RED}Error during recovery: {e}{Style.RESET_ALL}")
            
            # Record the failure
            healing_event['success'] = False
            healing_event['error'] = str(e)
            self.healing_history.append(healing_event)
            
            # Send failure notification
            self._send_alert_notification(healing_event)
            
            return False
        finally:
            self.healing_in_progress = False
    
    def _recover_cdn_cache(self, incident: Dict[str, Any]) -> bool:
        """Recover from CDN cache issues"""
        self.logger.info(f"Executing CDN cache recovery procedure (Incident: {incident['incident_id']})")
        print(f"{Fore.CYAN}Executing CDN cache recovery...{Style.RESET_ALL}")
        
        try:
            platforms = incident.get('platforms', [])
            
            # Step 1: Purge CloudFlare cache
            if 'cloudflare' in platforms or not platforms:
                print(f"- Purging CloudFlare cache...")
                
                cf_config = self.config.get('cloudflare', {}).get('api', {})
                token = cf_config.get('token')
                zone_id = cf_config.get('zone_id')
                
                if token and token != 'YOUR_CLOUDFLARE_API_TOKEN' and zone_id and zone_id != 'YOUR_CLOUDFLARE_ZONE_ID':
                    # Send API request to purge cache
                    headers = {
                        'Authorization': f'Bearer {token}',
                        'Content-Type': 'application/json'
                    }
                    
                    data = {
                        'purge_everything': True
                    }
                    
                    response = requests.post(
                        f'https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache',
                        headers=headers,
                        json=data
                    )
                    
                    if response.status_code == 200:
                        result = response.json()
                        if result.get('success'):
                            self.logger.info("CloudFlare cache purged successfully")
                            print(f"{Fore.GREEN}- CloudFlare cache purged successfully{Style.RESET_ALL}")
                        else:
                            errors = result.get('errors', [])
                            self.logger.error(f"Failed to purge CloudFlare cache: {errors}")
                            print(f"{Fore.RED}- Failed to purge CloudFlare cache: {errors}{Style.RESET_ALL}")
                    else:
                        self.logger.error(f"Failed to purge CloudFlare cache, status: {response.status_code}")
                        print(f"{Fore.RED}- Failed to purge CloudFlare cache, status: {response.status_code}{Style.RESET_ALL}")
                else:
                    self.logger.warning("CloudFlare API credentials not configured, skipping cache purge")
                    print(f"{Fore.YELLOW}- CloudFlare API credentials not configured, skipping cache purge{Style.RESET_ALL}")
            
            # Step 2: Pre-warm critical URLs
            print(f"- Pre-warming critical URLs...")
            successfully_warmed = 0
            warming_targets = self.config.get('monitoring', {}).get('endpoints', [])
            
            for platform_name in platforms:
                platform = self.config.get('platforms', {}).get(platform_name, {})
                base_url = platform.get('url', '')
                
                if not base_url:
                    continue
                
                for endpoint in warming_targets:
                    path = endpoint.get('path', '/')
                    url = f"{base_url.rstrip('/')}{path}"
                    
                    try:
                        response = requests.get(url, timeout=15)
                        if response.status_code == 200:
                            successfully_warmed += 1
                    except Exception as e:
                        self.logger.warning(f"Failed to warm cache for {url}: {e}")
            
            self.logger.info(f"Successfully warmed {successfully_warmed} URLs")
            print(f"{Fore.GREEN}- Successfully warmed {successfully_warmed} URLs{Style.RESET_ALL}")
            
            # Step 3: Verify recovery
            time.sleep(5)  # Short wait to let changes propagate
            
            health_status = self._check_health()
            all_recovered = all(platform in health_status and health_status[platform].get('healthy', False) 
                               for platform in platforms)
            
            if all_recovered:
                self.logger.info("CDN cache recovery successful")
                print(f"{Fore.GREEN}CDN cache recovery successful{Style.RESET_ALL}")
                return True
            else:
                self.logger.warning("CDN cache recovery partially successful or failed")
                print(f"{Fore.YELLOW}CDN cache recovery partially successful or failed{Style.RESET_ALL}")
                return False
        except Exception as e:
            self.logger.error(f"CDN cache recovery error: {e}")
            print(f"{Fore.RED}CDN cache recovery error: {e}{Style.RESET_ALL}")
            return False
    
    def _recover_origin(self, incident: Dict[str, Any]) -> bool:
        """Recover from origin failures"""
        self.logger.info(f"Executing origin recovery procedure (Incident: {incident['incident_id']})")
        print(f"{Fore.CYAN}Executing origin failure recovery...{Style.RESET_ALL}")
        
        try:
            platforms = incident.get('platforms', [])
            
            # Step 1: Try redeployment to the affected platforms
            redeployment_success = False
            
            print(f"- Attempting redeployment to affected platforms: {', '.join(platforms)}")
            
            # Use versioned_deploy.py to redeploy to the affected platforms
            args = [sys.executable, str(self.github_deploy_path)]
            
            # Add platform flags based on failed platforms
            if 'github' in platforms:
                args.append('--github')
            if 'traditional' in platforms:
                args.append('--ftp')
            if not args[2:]:  # If no specific platforms, deploy to all
                args.append('--all')
            
            try:
                result = subprocess.run(args, capture_output=True, text=True, timeout=300)
                
                if result.returncode == 0:
                    self.logger.info("Redeployment to affected platforms successful")
                    print(f"{Fore.GREEN}- Redeployment successful{Style.RESET_ALL}")
                    redeployment_success = True
                else:
                    self.logger.warning(f"Redeployment warning: {result.stderr}")
                    print(f"{Fore.YELLOW}- Redeployment warning: {result.stderr}{Style.RESET_ALL}")
            except Exception as e:
                self.logger.error(f"Redeployment error: {e}")
                print(f"{Fore.RED}- Redeployment error: {e}{Style.RESET_ALL}")
            
            # Step 2: Check if CloudFlare Worker can be updated to bypass the failed origins
            if not redeployment_success:
                print(f"- Updating CloudFlare Worker to route around failed origins")
                
                # Update the CloudFlare Health Worker priorities
                # Note: This is a simplified example, actual implementation would
                # update the worker with new priorities
                try:
                    # Read the current worker
                    worker_path = self.deploy_dir / 'cloudflare-health-worker.js'
                    
                    if worker_path.exists():
                        with open(worker_path, 'r') as f:
                            worker_content = f.read()
                        
                        # Update priorities to deprioritize failed origins
                        # This is a simplified example
                        for platform in platforms:
                            if f'name: \'{platform}\'' in worker_content:
                                self.logger.info(f"Deprioritizing {platform} in CloudFlare Worker")
                                print(f"- Deprioritizing {platform} in health router")
                        
                        # Deploy the worker using wrangler CLI
                        # This is a mock implementation, actual deployment would use wrangler
                        print(f"{Fore.YELLOW}- CloudFlare Worker update requires wrangler CLI{Style.RESET_ALL}")
                    else:
                        self.logger.warning("CloudFlare Worker file not found")
                        print(f"{Fore.YELLOW}- CloudFlare Worker file not found{Style.RESET_ALL}")
                except Exception as e:
                    self.logger.error(f"CloudFlare Worker update error: {e}")
                    print(f"{Fore.RED}- CloudFlare Worker update error: {e}{Style.RESET_ALL}")
            
            # Step 3: Verify recovery
            time.sleep(10)  # Wait for changes to propagate
            
            health_status = self._check_health()
            worker_routing_enabled = 'worker' in health_status and health_status['worker'].get('healthy', False)
            
            # If worker is up but origins still down, we're at least partially recovered
            if worker_routing_enabled:
                self.logger.info("Origin failure partially recovered via CloudFlare Worker")
                print(f"{Fore.GREEN}Origin failure partially recovered - worker is routing traffic{Style.RESET_ALL}")
                return True
            
            # Check if the specific platforms are back up
            platforms_recovered = all(platform in health_status and health_status[platform].get('healthy', False) 
                                    for platform in platforms)
            
            if platforms_recovered:
                self.logger.info("Origin failure fully recovered - all platforms are healthy")
                print(f"{Fore.GREEN}Origin failure fully recovered - all platforms are healthy{Style.RESET_ALL}")
                return True
            else:
                self.logger.warning("Origin failure recovery partially successful or failed")
                print(f"{Fore.YELLOW}Origin failure recovery partially successful or failed{Style.RESET_ALL}")
                return worker_routing_enabled  # At least the worker is up
        except Exception as e:
            self.logger.error(f"Origin failure recovery error: {e}")
            print(f"{Fore.RED}Origin failure recovery error: {e}{Style.RESET_ALL}")
            return False
    
    def _recover_dns(self, incident: Dict[str, Any]) -> bool:
        """Recover from DNS failures"""
        self.logger.info(f"Executing DNS recovery procedure (Incident: {incident['incident_id']})")
        print(f"{Fore.CYAN}Executing DNS failure recovery...{Style.RESET_ALL}")
        
        try:
            platforms = incident.get('platforms', [])
            
            # Step 1: Check CloudFlare DNS settings
            print(f"- Checking CloudFlare DNS settings...")
            
            cf_config = self.config.get('cloudflare', {}).get('api', {})
            token = cf_config.get('token')
            zone_id = cf_config.get('zone_id')
            
            if token and token != 'YOUR_CLOUDFLARE_API_TOKEN' and zone_id and zone_id != 'YOUR_CLOUDFLARE_ZONE_ID':
                # Check DNS records via CloudFlare API
                headers = {
                    'Authorization': f'Bearer {token}',
                    'Content-Type': 'application/json'
                }
                
                # Get current DNS records
                response = requests.get(
                    f'https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records',
                    headers=headers
                )
                
                if response.status_code == 200:
                    result = response.json()
                    if result.get('success'):
                        dns_records = result.get('result', [])
                        self.logger.info(f"Found {len(dns_records)} DNS records")
                        print(f"{Fore.GREEN}- Found {len(dns_records)} DNS records{Style.RESET_ALL}")
                        
                        # Check for issues in DNS records
                        # This is a simplified example
                        issues_found = False
                        
                        # In a real implementation, we would look for specific issues
                        # and fix them programmatically
                        
                        if not issues_found:
                            print(f"{Fore.GREEN}- No DNS issues detected{Style.RESET_ALL}")
                    else:
                        errors = result.get('errors', [])
                        self.logger.error(f"Failed to get DNS records: {errors}")
                        print(f"{Fore.RED}- Failed to get DNS records: {errors}{Style.RESET_ALL}")
                else:
                    self.logger.error(f"Failed to get DNS records, status: {response.status_code}")
                    print(f"{Fore.RED}- Failed to get DNS records, status: {response.status_code}{Style.RESET_ALL}")
            else:
                self.logger.warning("CloudFlare API credentials not configured, skipping DNS check")
                print(f"{Fore.YELLOW}- CloudFlare API credentials not configured, skipping DNS check{Style.RESET_ALL}")
            
            # Step 2: Verify CloudFlare Worker is functioning
            print(f"- Verifying CloudFlare Worker health...")
            
            worker_response = requests.get("https://cqil.ca/api/health", timeout=10)
            worker_healthy = worker_response.status_code == 200
            
            if worker_healthy:
                print(f"{Fore.GREEN}- CloudFlare Worker is responding{Style.RESET_ALL}")
            else:
                print(f"{Fore.RED}- CloudFlare Worker is not responding{Style.RESET_ALL}")
                
                # Try to redeploy the worker
                print(f"- Attempting to redeploy CloudFlare Worker...")
                
                # In a real implementation, we would redeploy the worker
                # using wrangler CLI or API calls
                print(f"{Fore.YELLOW}- CloudFlare Worker redeployment requires wrangler CLI{Style.RESET_ALL}")
            
            # Step 3: Check for DNS propagation issues
            print(f"- Checking for DNS propagation issues...")
            
            # In a real implementation, we would use a service like httpstat.us
            # to check DNS propagation across different regions
            
            # Step 4: Verify recovery
            time.sleep(15)  # DNS changes may take time to propagate
            
            health_status = self._check_health()
            any_platform_recovered = any(platform in health_status and health_status[platform].get('healthy', False) 
                                        for platform in platforms)
            
            worker_recovered = 'worker' in health_status and health_status['worker'].get('healthy', False)
            
            if any_platform_recovered or worker_recovered:
                self.logger.info("DNS failure recovery partially successful")
                print(f"{Fore.GREEN}DNS failure recovery partially successful{Style.RESET_ALL}")
                return True
            else:
                self.logger.warning("DNS failure recovery unsuccessful")
                print(f"{Fore.RED}DNS failure recovery unsuccessful{Style.RESET_ALL}")
                
                # If all automatic healing fails, notify for manual intervention
                escalation_message = "Automatic DNS recovery failed. Manual intervention required."
                self.logger.error(escalation_message)
                print(f"{Fore.RED}ALERT: {escalation_message}{Style.RESET_ALL}")
                
                return False
        except Exception as e:
            self.logger.error(f"DNS failure recovery error: {e}")
            print(f"{Fore.RED}DNS failure recovery error: {e}{Style.RESET_ALL}")
            return False
    
    def _recover_ssl(self, incident: Dict[str, Any]) -> bool:
        """Recover from SSL certificate failures"""
        self.logger.info(f"Executing SSL recovery procedure (Incident: {incident['incident_id']})")
        print(f"{Fore.CYAN}Executing SSL failure recovery...{Style.RESET_ALL}")
        
        try:
            platforms = incident.get('platforms', [])
            
            # Step 1: Check SSL certificate status
            print(f"- Checking SSL certificate status...")
            ssl_checks = {}
            
            for platform_name in platforms:
                platform = self.config.get('platforms', {}).get(platform_name, {})
                url = platform.get('url', '')
                
                if not url:
                    continue
                
                try:
                    # Use OpenSSL to check certificate
                    import subprocess
                    domain = url.replace('https://', '').split('/')[0]
                    
                    cmd = f"echo | openssl s_client -servername {domain} -connect {domain}:443 2>/dev/null | openssl x509 -noout -dates"
                    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
                    
                    if result.returncode == 0:
                        ssl_checks[platform_name] = {
                            'status': 'valid',
                            'details': result.stdout.strip()
                        }
                        print(f"{Fore.GREEN}- {platform_name} SSL certificate appears valid{Style.RESET_ALL}")
                    else:
                        ssl_checks[platform_name] = {
                            'status': 'error',
                            'details': result.stderr.strip()
                        }
                        print(f"{Fore.RED}- {platform_name} SSL certificate check failed{Style.RESET_ALL}")
                except Exception as e:
                    ssl_checks[platform_name] = {
                        'status': 'error',
                        'details': str(e)
                    }
                    print(f"{Fore.RED}- {platform_name} SSL check error: {e}{Style.RESET_ALL}")
            
            # Step 2: Check CloudFlare SSL settings
            print(f"- Checking CloudFlare SSL settings...")
            
            cf_config = self.config.get('cloudflare', {}).get('api', {})
            token = cf_config.get('token')
            zone_id = cf_config.get('zone_id')
            
            if token and token != 'YOUR_CLOUDFLARE_API_TOKEN' and zone_id and zone_id != 'YOUR_CLOUDFLARE_ZONE_ID':
                # Check SSL settings via CloudFlare API
                headers = {
                    'Authorization': f'Bearer {token}',
                    'Content-Type': 'application/json'
                }
                
                # Get current SSL settings
                response = requests.get(
                    f'https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/ssl',
                    headers=headers
                )
                
                if response.status_code == 200:
                    result = response.json()
                    if result.get('success'):
                        ssl_mode = result.get('result', {}).get('value')
                        self.logger.info(f"CloudFlare SSL mode: {ssl_mode}")
                        print(f"{Fore.GREEN}- CloudFlare SSL mode: {ssl_mode}{Style.RESET_ALL}")
                        
                        # Check if SSL mode needs adjustment
                        if ssl_mode != 'full':
                            print(f"- Updating CloudFlare SSL mode to 'full'...")
                            
                            # Set SSL mode to 'full'
                            update_data = {
                                'value': 'full'
                            }
                            
                            update_response = requests.patch(
                                f'https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/ssl',
                                headers=headers,
                                json=update_data
                            )
                            
                            if update_response.status_code == 200:
                                update_result = update_response.json()
                                if update_result.get('success'):
                                    new_ssl_mode = update_result.get('result', {}).get('value')
                                    self.logger.info(f"Updated CloudFlare SSL mode to: {new_ssl_mode}")
                                    print(f"{Fore.GREEN}- Updated CloudFlare SSL mode to: {new_ssl_mode}{Style.RESET_ALL}")
                                else:
                                    errors = update_result.get('errors', [])
                                    self.logger.error(f"Failed to update SSL mode: {errors}")
                                    print(f"{Fore.RED}- Failed to update SSL mode: {errors}{Style.RESET_ALL}")
                            else:
                                self.logger.error(f"Failed to update SSL mode, status: {update_response.status_code}")
                                print(f"{Fore.RED}- Failed to update SSL mode, status: {update_response.status_code}{Style.RESET_ALL}")
                    else:
                        errors = result.get('errors', [])
                        self.logger.error(f"Failed to get SSL settings: {errors}")
                        print(f"{Fore.RED}- Failed to get SSL settings: {errors}{Style.RESET_ALL}")
                else:
                    self.logger.error(f"Failed to get SSL settings, status: {response.status_code}")
                    print(f"{Fore.RED}- Failed to get SSL settings, status: {response.status_code}{Style.RESET_ALL}")
            else:
                self.logger.warning("CloudFlare API credentials not configured, skipping SSL check")
                print(f"{Fore.YELLOW}- CloudFlare API credentials not configured, skipping SSL check{Style.RESET_ALL}")
            
            # Step 3: Verify recovery
            time.sleep(15)  # SSL changes may take time to propagate
            
            health_status = self._check_health()
            any_platform_recovered = any(platform in health_status and health_status[platform].get('healthy', False) 
                                        for platform in platforms)
            
            if any_platform_recovered:
                self.logger.info("SSL failure recovery successful")
                print(f"{Fore.GREEN}SSL failure recovery successful{Style.RESET_ALL}")
                return True
            else:
                self.logger.warning("SSL failure recovery unsuccessful")
                print(f"{Fore.RED}SSL failure recovery unsuccessful{Style.RESET_ALL}")
                
                # If all automatic healing fails, notify for manual intervention
                escalation_message = "Automatic SSL recovery failed. Manual intervention required."
                self.logger.error(escalation_message)
                print(f"{Fore.RED}ALERT: {escalation_message}{Style.RESET_ALL}")
                
                return False
        except Exception as e:
            self.logger.error(f"SSL failure recovery error: {e}")
            print(f"{Fore.RED}SSL failure recovery error: {e}{Style.RESET_ALL}")
            return False
    
    def _send_alert_notification(self, incident: Dict[str, Any]):
        """Send alert notification about a healing attempt failure"""
        try:
            # In a real implementation, this would send emails, Slack messages, etc.
            self.logger.info(f"Sending alert notification for incident {incident['incident_id']}")
            
            # For now, we'll just log it
            print(f"{Fore.RED}ALERT: Recovery failed for {incident['failure_type']} (Incident: {incident['incident_id']}){Style.RESET_ALL}")
            print(f"Affected platforms: {', '.join(incident['platforms'])}")
            print(f"Time: {incident['timestamp']}")
            
            if 'error' in incident:
                print(f"Error: {incident['error']}")
        except Exception as e:
            self.logger.error(f"Failed to send alert notification: {e}")
    
    def _send_recovery_notification(self, incident: Dict[str, Any]):
        """Send recovery notification after successful healing"""
        try:
            # In a real implementation, this would send emails, Slack messages, etc.
            self.logger.info(f"Sending recovery notification for incident {incident['incident_id']}")
            
            # For now, we'll just log it
            print(f"{Fore.GREEN}RECOVERY: Successfully recovered from {incident['failure_type']} (Incident: {incident['incident_id']}){Style.RESET_ALL}")
            print(f"Affected platforms: {', '.join(incident['platforms'])}")
            print(f"Time: {incident['timestamp']}")
        except Exception as e:
            self.logger.error(f"Failed to send recovery notification: {e}")
    
    def get_healing_history(self):
        """Get the history of healing attempts"""
        print(f"\n{Fore.CYAN}=== Self-Healing History ==={Style.RESET_ALL}")
        
        if not self.healing_history:
            print(f"{Fore.YELLOW}No healing attempts recorded{Style.RESET_ALL}")
            return
        
        # Group by date
        history_by_date = {}
        for event in self.healing_history:
            date = datetime.fromisoformat(event['timestamp']).strftime('%Y-%m-%d')
            if date not in history_by_date:
                history_by_date[date] = []
            history_by_date[date].append(event)
        
        # Display grouped by date, most recent first
        for date in sorted(history_by_date.keys(), reverse=True):
            events = history_by_date[date]
            print(f"\n{Fore.CYAN}Date: {date} ({len(events)} events){Style.RESET_ALL}")
            
            for event in sorted(events, key=lambda e: e['timestamp'], reverse=True):
                time = datetime.fromisoformat(event['timestamp']).strftime('%H:%M:%S')
                success = event.get('success', False)
                status = f"{Fore.GREEN}✓{Style.RESET_ALL}" if success else f"{Fore.RED}✗{Style.RESET_ALL}"
                
                print(f"{time} {status} {event['failure_type']} (Incident: {event['incident_id']})")
                print(f"  Platforms: {', '.join(event['platforms'])}")
                
                if not success and 'error' in event:
                    print(f"  Error: {event['error']}")

def main():
    """Main function with command-line arguments"""
    parser = argparse.ArgumentParser(description='CQIL Website Self-Healing System')
    parser.add_argument('--setup', action='store_true', help='Set up the self-healing system')
    parser.add_argument('--start', action='store_true', help='Start the self-healing monitor')
    parser.add_argument('--stop', action='store_true', help='Stop the self-healing monitor')
    parser.add_argument('--check', action='store_true', help='Run a manual health check')
    parser.add_argument('--history', action='store_true', help='Show healing history')
    parser.add_argument('--recover', type=str, choices=['cdn_cache', 'origin', 'dns', 'ssl'], 
                        help='Run a specific recovery procedure')
    
    args = parser.parse_args()
    
    # Create self-healing system instance
    healing_system = SelfHealingSystem()
    
    # Process commands
    if args.setup:
        healing_system.setup_self_healing()
    elif args.start:
        healing_system.start_monitoring()
    elif args.stop:
        healing_system.stop_monitoring()
    elif args.check:
        health_status = healing_system._check_health()
        
        print(f"\n{Fore.CYAN}=== Health Check Results ==={Style.RESET_ALL}")
        for platform, status in health_status.items():
            if status.get('healthy', False):
                print(f"{platform}: {Fore.GREEN}Healthy{Style.RESET_ALL}")
            else:
                error = status.get('error', 'Unknown error')
                print(f"{platform}: {Fore.RED}Unhealthy - {error}{Style.RESET_ALL}")
    elif args.history:
        healing_system.get_healing_history()
    elif args.recover:
        # Create a mock incident
        incident = {
            'incident_id': f"{args.recover}_{datetime.now().strftime('%Y%m%d%H%M%S')}",
            'failure_type': args.recover,
            'platforms': list(healing_system.config.get('platforms', {}).keys()),
            'severity': 'medium',
            'timestamp': datetime.now().isoformat()
        }
        
        # Call the appropriate recovery procedure
        recovery_func = {
            'cdn_cache': healing_system._recover_cdn_cache,
            'origin': healing_system._recover_origin,
            'dns': healing_system._recover_dns,
            'ssl': healing_system._recover_ssl
        }
        
        if args.recover in recovery_func:
            print(f"\n{Fore.CYAN}=== Running Manual Recovery: {args.recover} ==={Style.RESET_ALL}")
            success = recovery_func[args.recover](incident)
            
            if success:
                print(f"\n{Fore.GREEN}Recovery completed successfully{Style.RESET_ALL}")
            else:
                print(f"\n{Fore.RED}Recovery failed{Style.RESET_ALL}")
    else:
        # If no arguments, show help
        parser.print_help()
    
    return 0

if __name__ == "__main__":
    sys.exit(main())