#!/usr/bin/env python3
"""
CQIL Website Health Monitor

This script monitors the health of all CQIL website platforms and sends alerts
if any issues are detected.
"""

import requests
import smtplib
import json
import logging
import argparse
import sys
import os
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from colorama import init, Fore, Style

# Initialize colorama for colored output
init()

class HealthMonitor:
    def __init__(self, config_path=None):
        self.setup_logging()
        self.load_config(config_path)
        
    def setup_logging(self):
        """Configure logging"""
        log_dir = Path(__file__).parent / 'secure_logs'
        log_dir.mkdir(exist_ok=True)
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_dir / f'health_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def load_config(self, config_path=None):
        """Load configuration"""
        try:
            if not config_path:
                config_path = Path(__file__).parent / 'health_monitor_config.json'
                
            if not config_path.exists():
                # Create default config
                default_config = {
                    "platforms": {
                        "github": {
                            "url": "https://gwelby.github.io/cqil-website",
                            "health_path": "/health-check.html"
                        },
                        "cloudflare": {
                            "url": "https://cqil.pages.dev",
                            "health_path": "/health-check.html"
                        },
                        "traditional": {
                            "url": "https://cqil.ca",
                            "health_path": "/health-check.html"
                        }
                    },
                    "alerts": {
                        "enabled": True,
                        "email": {
                            "from": "alerts@cqil.ca",
                            "to": ["admin@cqil.ca"],
                            "smtp_server": "smtp.cqil.ca",
                            "smtp_port": 587,
                            "smtp_user": "alerts@cqil.ca",
                            "smtp_password": "YOUR_PASSWORD"
                        }
                    },
                    "monitoring": {
                        "timeout": 10,
                        "retries": 3,
                        "check_interval": 300  # 5 minutes
                    }
                }
                
                with open(config_path, 'w') as f:
                    json.dump(default_config, f, indent=2)
                
                print(f"{Fore.YELLOW}Created default configuration at {config_path}{Style.RESET_ALL}")
                print(f"{Fore.YELLOW}Please update the SMTP settings and other configuration options{Style.RESET_ALL}")
            
            with open(config_path) as f:
                self.config = json.load(f)
                
            self.logger.info(f"Loaded configuration from {config_path}")
                
        except Exception as e:
            self.logger.error(f"Failed to load configuration: {e}")
            print(f"{Fore.RED}Failed to load configuration: {e}{Style.RESET_ALL}")
            sys.exit(1)
    
    def check_platform_health(self, name, platform):
        """Check health of a single platform"""
        url = f"{platform['url']}{platform['health_path']}"
        retries = self.config["monitoring"]["retries"]
        timeout = self.config["monitoring"]["timeout"]
        
        self.logger.info(f"Checking health of {name} at {url}")
        print(f"Checking {name} health at {url}...")
        
        for attempt in range(retries):
            try:
                response = requests.get(url, timeout=timeout)
                
                if response.status_code == 200 and "data-status=\"healthy\"" in response.text:
                    self.logger.info(f"{name} is healthy")
                    print(f"{Fore.GREEN}{name.capitalize()}: ✅ Healthy{Style.RESET_ALL}")
                    return True, response.status_code, None
                else:
                    error = f"Health check failed: status code {response.status_code}"
                    self.logger.warning(f"{name} health check failed: {error}")
                    if attempt == retries - 1:  # Last attempt
                        print(f"{Fore.RED}{name.capitalize()}: ❌ Failed - {error}{Style.RESET_ALL}")
                        return False, response.status_code, error
            except Exception as e:
                error = str(e)
                self.logger.warning(f"{name} health check attempt {attempt+1} failed: {error}")
                if attempt == retries - 1:  # Last attempt
                    print(f"{Fore.RED}{name.capitalize()}: ❌ Failed - {error}{Style.RESET_ALL}")
                    return False, None, error
                
            # Only wait if this isn't the last attempt
            if attempt < retries - 1:
                print(f"  Retry {attempt+1}/{retries}...")
        
        # Should never reach here
        return False, None, "Unknown error"
    
    def check_all_platforms(self):
        """Check health of all platforms"""
        results = {}
        overall_success = True
        
        print(f"\n{Fore.CYAN}=== CQIL Website Health Check ==={Style.RESET_ALL}")
        print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        
        for name, platform in self.config["platforms"].items():
            healthy, status_code, error = self.check_platform_health(name, platform)
            results[name] = {
                "healthy": healthy,
                "status_code": status_code,
                "error": error,
                "time": datetime.now().isoformat()
            }
            
            if not healthy:
                overall_success = False
        
        # Log results
        self.logger.info(f"Health check results: {json.dumps(results)}")
        
        # Print summary
        print(f"\n{Fore.CYAN}Overall Status: {'✅ Healthy' if overall_success else '❌ Issues Detected'}{Style.RESET_ALL}")
        
        # Send alerts if needed
        if not overall_success and self.config["alerts"]["enabled"]:
            self.send_alert(results)
        
        return overall_success, results
    
    def send_alert(self, results):
        """Send alert if there are unhealthy platforms"""
        try:
            email_config = self.config["alerts"]["email"]
            
            # Create message
            msg = MIMEMultipart()
            msg["From"] = email_config["from"]
            msg["To"] = ", ".join(email_config["to"])
            msg["Subject"] = "⚠️ CQIL Website Health Alert"
            
            # Build email body
            body = f"""
<h2>CQIL Website Health Alert</h2>
<p>The following issues were detected during health monitoring at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}:</p>

<table border="1" cellpadding="5" cellspacing="0">
<tr>
  <th>Platform</th>
  <th>Status</th>
  <th>Details</th>
</tr>
"""
            
            for name, result in results.items():
                status = "✅ Healthy" if result["healthy"] else "❌ Unhealthy"
                details = "OK" if result["healthy"] else result["error"]
                row_color = "#e6f4ea" if result["healthy"] else "#fce8e6"
                
                body += f"""
<tr bgcolor="{row_color}">
  <td>{name.capitalize()}</td>
  <td>{status}</td>
  <td>{details}</td>
</tr>
"""
            
            body += """
</table>

<p>Please investigate these issues as soon as possible.</p>

<p>-- CQIL Health Monitor</p>
"""
            
            msg.attach(MIMEText(body, "html"))
            
            # Skip actual sending if SMTP password is not set
            if email_config["smtp_password"] == "YOUR_PASSWORD":
                self.logger.warning("SMTP password not configured - skipping email alert")
                print(f"{Fore.YELLOW}SMTP password not configured - skipping email alert{Style.RESET_ALL}")
                return
            
            # Send email
            with smtplib.SMTP(email_config["smtp_server"], email_config["smtp_port"]) as server:
                server.starttls()
                server.login(email_config["smtp_user"], email_config["smtp_password"])
                server.send_message(msg)
                
            self.logger.info(f"Health alert sent to {', '.join(email_config['to'])}")
            print(f"{Fore.GREEN}Health alert sent to {', '.join(email_config['to'])}{Style.RESET_ALL}")
            
        except Exception as e:
            self.logger.error(f"Failed to send alert: {e}")
            print(f"{Fore.RED}Failed to send alert: {e}{Style.RESET_ALL}")
    
    def check_cloudflare_worker(self):
        """Check the CloudFlare Worker health API"""
        try:
            print(f"\n{Fore.CYAN}=== Checking CloudFlare Health Router ==={Style.RESET_ALL}")
            
            # Use the traditional URL by default
            url = "https://cqil.ca/api/health"
            
            print(f"Fetching health data from {url}...")
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                print(f"{Fore.GREEN}CloudFlare Health Router API: ✅ Operational{Style.RESET_ALL}")
                
                # Parse the health data
                if data.get("primaryOrigin"):
                    primary = data["primaryOrigin"]
                    print(f"Primary origin: {Fore.GREEN}{primary['name']}{Style.RESET_ALL} ({primary['url']})")
                    
                    # Show all origins
                    print("\nPlatform status:")
                    for origin in data.get("origins", []):
                        status = f"{Fore.GREEN}✅ Healthy{Style.RESET_ALL}" if origin.get("healthy") else f"{Fore.RED}❌ Unhealthy{Style.RESET_ALL}"
                        print(f"  {origin['name'].capitalize()}: {status}")
                else:
                    print(f"{Fore.RED}No healthy origins found!{Style.RESET_ALL}")
                
                return True, data
            else:
                print(f"{Fore.RED}CloudFlare Health Router API: ❌ Error (Status: {response.status_code}){Style.RESET_ALL}")
                return False, None
                
        except Exception as e:
            print(f"{Fore.RED}CloudFlare Health Router Check Failed: {e}{Style.RESET_ALL}")
            return False, None

def main():
    """Main function with command-line arguments"""
    parser = argparse.ArgumentParser(description='CQIL Website Health Monitor')
    parser.add_argument('--check', action='store_true', help='Check all platform health')
    parser.add_argument('--worker', action='store_true', help='Check CloudFlare Worker health router')
    parser.add_argument('--config', type=str, help='Path to custom configuration file')
    parser.add_argument('--alert', action='store_true', help='Send test alert')
    
    args = parser.parse_args()
    
    # Create monitor
    config_path = Path(args.config) if args.config else None
    monitor = HealthMonitor(config_path)
    
    # If no arguments provided, show help
    if not any([args.check, args.worker, args.alert]):
        parser.print_help()
        return 0
    
    # Process arguments
    if args.check:
        monitor.check_all_platforms()
        
    if args.worker:
        monitor.check_cloudflare_worker()
        
    if args.alert:
        # Generate fake results with one unhealthy platform
        results = {
            "github": {
                "healthy": True,
                "status_code": 200,
                "error": None,
                "time": datetime.now().isoformat()
            },
            "cloudflare": {
                "healthy": True,
                "status_code": 200,
                "error": None,
                "time": datetime.now().isoformat()
            },
            "traditional": {
                "healthy": False,
                "status_code": 503,
                "error": "Test alert - please ignore",
                "time": datetime.now().isoformat()
            }
        }
        monitor.send_alert(results)
    
    return 0

if __name__ == "__main__":
    sys.exit(main())