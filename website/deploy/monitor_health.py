#!/usr/bin/env python3
import os
import sys
import requests
import time
import json
import logging
from datetime import datetime
import argparse
import re
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from colorama import init, Fore, Style

# Initialize colorama for colored output
init()

# Set up logging
os.makedirs("secure_logs", exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(f'secure_logs/health_monitor_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

class HealthMonitor:
    def __init__(self, config=None):
        """Initialize the health monitor with optional config"""
        # Default configuration
        self.config = {
            "endpoints": [
                {
                    "name": "Primary (cqil.ca)",
                    "url": "https://cqil.ca",
                    "health_path": "/health-check.html",
                    "timeout": 5,
                    "critical": True
                },
                {
                    "name": "GitHub Pages",
                    "url": "https://gwelby.github.io/cqil-website",
                    "health_path": "/health-check.html",
                    "timeout": 5,
                    "critical": False
                },
                {
                    "name": "CloudFlare Pages",
                    "url": "https://cqil.pages.dev",
                    "health_path": "/health-check.html",
                    "timeout": 5,
                    "critical": False
                }
            ],
            "check_interval": 60,  # seconds
            "check_count": -1,     # -1 for continuous monitoring
            "alert_threshold": 3,  # consecutive failures before alerting
            "check_assets": True,  # whether to check asset loading
            "verbose": True,
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
            }
        }
        
        # Merge with provided config if any
        if config:
            self.config.update(config)
            
        # Track endpoint status
        self.endpoint_status = {}
        for endpoint in self.config["endpoints"]:
            self.endpoint_status[endpoint["name"]] = {
                "status": "unknown",
                "consecutive_failures": 0,
                "last_check_time": None,
                "response_time": None,
                "version": None,
                "errors": []
            }
            
    def print_status(self, message, status="info"):
        """Print status message with appropriate color"""
        if status == "ok":
            print(f"{Fore.GREEN}{message}{Style.RESET_ALL}")
        elif status == "warning":
            print(f"{Fore.YELLOW}{message}{Style.RESET_ALL}")
        elif status == "error":
            print(f"{Fore.RED}{message}{Style.RESET_ALL}")
        elif status == "info":
            print(f"{Fore.CYAN}{message}{Style.RESET_ALL}")
        else:
            print(message)
            
    def check_endpoint_health(self, endpoint):
        """Check health of a single endpoint"""
        name = endpoint["name"]
        url = endpoint["url"]
        health_url = f"{url}{endpoint['health_path']}"
        timeout = endpoint.get("timeout", 5)
        
        try:
            # Record start time
            start_time = time.time()
            
            # Make request to health check URL
            response = requests.get(health_url, timeout=timeout)
            
            # Calculate response time
            response_time = time.time() - start_time
            
            # Check if response is successful
            if response.status_code == 200:
                # Check if response contains expected health indicator
                if 'data-status="healthy"' in response.text:
                    # Update status
                    self.endpoint_status[name]["status"] = "healthy"
                    self.endpoint_status[name]["consecutive_failures"] = 0
                    self.endpoint_status[name]["response_time"] = response_time
                    self.endpoint_status[name]["last_check_time"] = datetime.now().isoformat()
                    
                    # Try to extract version info
                    version_match = re.search(r'data-version="([^"]+)"', response.text)
                    if version_match:
                        self.endpoint_status[name]["version"] = version_match.group(1)
                        
                    return True, f"✅ {name} is healthy (response time: {response_time:.2f}s)"
                else:
                    # Health check didn't contain expected indicator
                    self.endpoint_status[name]["status"] = "unhealthy"
                    self.endpoint_status[name]["consecutive_failures"] += 1
                    self.endpoint_status[name]["response_time"] = response_time
                    self.endpoint_status[name]["last_check_time"] = datetime.now().isoformat()
                    self.endpoint_status[name]["errors"].append("Missing health indicator")
                    
                    return False, f"❌ {name} is unhealthy - missing health indicator (response time: {response_time:.2f}s)"
            else:
                # Non-200 response
                self.endpoint_status[name]["status"] = "unhealthy"
                self.endpoint_status[name]["consecutive_failures"] += 1
                self.endpoint_status[name]["response_time"] = response_time
                self.endpoint_status[name]["last_check_time"] = datetime.now().isoformat()
                self.endpoint_status[name]["errors"].append(f"HTTP {response.status_code}")
                
                return False, f"❌ {name} is unhealthy - HTTP {response.status_code} (response time: {response_time:.2f}s)"
                
        except requests.exceptions.RequestException as e:
            # Request exception
            self.endpoint_status[name]["status"] = "error"
            self.endpoint_status[name]["consecutive_failures"] += 1
            self.endpoint_status[name]["last_check_time"] = datetime.now().isoformat()
            self.endpoint_status[name]["errors"].append(str(e))
            
            return False, f"❌ {name} is unreachable - {str(e)}"
            
    def check_assets(self, endpoint):
        """Check if key assets are loading properly"""
        name = endpoint["name"]
        url = endpoint["url"]
        timeout = endpoint.get("timeout", 5)
        
        # Key assets to check
        key_assets = [
            "/js/quantum-common.js",
            "/css/style.css",
            "/index.html"
        ]
        
        results = []
        for asset in key_assets:
            asset_url = f"{url}{asset}"
            try:
                # Record start time
                start_time = time.time()
                
                # Make request to asset URL
                response = requests.get(asset_url, timeout=timeout)
                
                # Calculate response time
                response_time = time.time() - start_time
                
                # Check if response is successful
                if response.status_code == 200:
                    results.append({
                        "asset": asset,
                        "status": "ok",
                        "response_time": response_time,
                        "size": len(response.content)
                    })
                else:
                    results.append({
                        "asset": asset,
                        "status": "error",
                        "status_code": response.status_code,
                        "response_time": response_time
                    })
            except requests.exceptions.RequestException as e:
                results.append({
                    "asset": asset,
                    "status": "error",
                    "error": str(e)
                })
                
        # Store asset check results
        self.endpoint_status[name]["assets"] = results
        
        # Count failures
        failures = sum(1 for r in results if r["status"] != "ok")
        if failures == 0:
            return True, f"✅ All assets loading correctly for {name}"
        else:
            return False, f"⚠️ {failures}/{len(results)} assets failed to load for {name}"
            
    def run_health_check(self):
        """Run a complete health check across all endpoints"""
        print(f"\n{Fore.CYAN}=== CQIL Website Health Check - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} ==={Style.RESET_ALL}")
        
        all_healthy = True
        
        for endpoint in self.config["endpoints"]:
            # Check endpoint health
            is_healthy, health_message = self.check_endpoint_health(endpoint)
            
            if is_healthy:
                self.print_status(health_message, "ok")
                
                # If enabled, also check assets
                if self.config["check_assets"]:
                    assets_ok, assets_message = self.check_assets(endpoint)
                    if assets_ok:
                        self.print_status(f"  {assets_message}", "ok")
                    else:
                        self.print_status(f"  {assets_message}", "warning")
            else:
                if endpoint.get("critical", False):
                    self.print_status(health_message, "error")
                    all_healthy = False
                else:
                    self.print_status(health_message, "warning")
                    
            # Print version if available
            version = self.endpoint_status[endpoint["name"]].get("version")
            if version:
                self.print_status(f"  Version: {version}", "info")
                
        # Print overall status
        if all_healthy:
            self.print_status("\n✅ All critical endpoints are healthy!", "ok")
        else:
            self.print_status("\n❌ One or more critical endpoints are unhealthy!", "error")
            
        # Return health status
        return all_healthy
        
    def start_monitoring(self):
        """Start continuous health monitoring"""
        print(f"\n{Fore.CYAN}=== CQIL Website Health Monitoring Started ==={Style.RESET_ALL}")
        print(f"Checking {len(self.config['endpoints'])} endpoints every {self.config['check_interval']} seconds")
        print("Press Ctrl+C to stop monitoring\n")
        
        check_count = 0
        try:
            while True:
                check_count += 1
                
                # Check if we've reached the max count
                if self.config["check_count"] > 0 and check_count > self.config["check_count"]:
                    break
                    
                # Run health check
                all_healthy = self.run_health_check()
                
                # Send alerts if needed
                self.check_for_alerts()
                
                # Save status to file
                self.save_status()
                
                # Wait for next check
                if self.config["check_count"] < 0 or check_count < self.config["check_count"]:
                    time.sleep(self.config["check_interval"])
                    
        except KeyboardInterrupt:
            print(f"\n{Fore.YELLOW}Health monitoring stopped by user{Style.RESET_ALL}")
            
        print(f"\n{Fore.CYAN}Health monitoring completed after {check_count} checks{Style.RESET_ALL}")
        
    def check_for_alerts(self):
        """Check if any alerts need to be sent"""
        for name, status in self.endpoint_status.items():
            # Check if endpoint has consecutive failures beyond threshold
            if status.get("consecutive_failures", 0) >= self.config["alert_threshold"]:
                # Get endpoint config
                endpoint = next((e for e in self.config["endpoints"] if e["name"] == name), None)
                
                if endpoint and endpoint.get("critical", False):
                    logger.error(f"ALERT: {name} has been unhealthy for {status['consecutive_failures']} consecutive checks")
                    self.print_status(f"\n⚠️ ALERT: {name} has been unhealthy for {status['consecutive_failures']} consecutive checks", "error")
                    
                    # Send email alert if enabled
                    if self.config["alerts"]["enabled"]:
                        self.send_alert({name: status})
                    
    def send_alert(self, problem_endpoints):
        """Send alert email for unhealthy endpoints"""
        try:
            email_config = self.config["alerts"]["email"]
            
            # Skip if password is not set
            if email_config["smtp_password"] == "YOUR_PASSWORD":
                logger.warning("Email alerts disabled - smtp_password not configured")
                self.print_status("Email alerts disabled - smtp_password not configured", "warning")
                return
                
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
  <th>Endpoint</th>
  <th>Status</th>
  <th>Consecutive Failures</th>
  <th>Last Error</th>
</tr>
"""
            
            for name, status in problem_endpoints.items():
                errors = status.get("errors", [])
                last_error = errors[-1] if errors else "Unknown error"
                
                body += f"""
<tr bgcolor="#fce8e6">
  <td>{name}</td>
  <td>{status.get("status", "unknown")}</td>
  <td>{status.get("consecutive_failures", 0)}</td>
  <td>{last_error}</td>
</tr>
"""
            
            body += """
</table>

<p>Please investigate these issues as soon as possible.</p>

<p>-- CQIL Health Monitor</p>
"""
            
            msg.attach(MIMEText(body, "html"))
            
            # Send email
            with smtplib.SMTP(email_config["smtp_server"], email_config["smtp_port"]) as server:
                server.starttls()
                server.login(email_config["smtp_user"], email_config["smtp_password"])
                server.send_message(msg)
                
            logger.info(f"Health alert sent to {', '.join(email_config['to'])}")
            self.print_status(f"Health alert sent to {', '.join(email_config['to'])}", "info")
            
        except Exception as e:
            logger.error(f"Failed to send alert: {e}")
            self.print_status(f"Failed to send alert: {e}", "error")
            
    def save_status(self):
        """Save current status to a JSON file"""
        status = {
            "timestamp": datetime.now().isoformat(),
            "endpoints": self.endpoint_status,
            "all_healthy": all(s["status"] == "healthy" for name, s in self.endpoint_status.items() 
                             if next((e for e in self.config["endpoints"] if e["name"] == name), {}).get("critical", False))
        }
        
        with open("secure_logs/health_status.json", "w") as f:
            json.dump(status, f, indent=2)
            
    def check_deployment_versions(self):
        """Check for deployment version differences across platforms"""
        print(f"\n{Fore.CYAN}=== Checking Deployment Versions ==={Style.RESET_ALL}")
        
        versions = {}
        for endpoint in self.config["endpoints"]:
            name = endpoint["name"]
            url = endpoint["url"]
            version_url = f"{url}/version.txt"
            
            try:
                response = requests.get(version_url, timeout=5)
                if response.status_code == 200:
                    # Extract version info
                    version_text = response.text
                    version_match = re.search(r'Version: ([^\n]+)', version_text)
                    if version_match:
                        version = version_match.group(1)
                        versions[name] = {
                            "version": version,
                            "text": version_text
                        }
                        self.print_status(f"{name}: Version {version}", "ok")
                    else:
                        versions[name] = {
                            "version": "Unknown",
                            "text": version_text
                        }
                        self.print_status(f"{name}: Could not parse version", "warning")
                else:
                    versions[name] = {
                        "version": None,
                        "error": f"HTTP {response.status_code}"
                    }
                    self.print_status(f"{name}: Could not fetch version (HTTP {response.status_code})", "error")
            except Exception as e:
                versions[name] = {
                    "version": None,
                    "error": str(e)
                }
                self.print_status(f"{name}: Error fetching version - {str(e)}", "error")
        
        # Check if versions match
        unique_versions = set(v.get("version") for v in versions.values() if v.get("version"))
        if len(unique_versions) == 1:
            self.print_status("\n✅ All platforms have the same version!", "ok")
        else:
            self.print_status("\n⚠️ Platform versions differ!", "warning")
            
        return versions

def main():
    """Main function to run the health monitor"""
    parser = argparse.ArgumentParser(description="CQIL Website Health Monitor")
    parser.add_argument("--interval", type=int, default=60, help="Check interval in seconds (default: 60)")
    parser.add_argument("--count", type=int, default=-1, help="Number of checks to run, -1 for continuous (default: -1)")
    parser.add_argument("--assets", action="store_true", help="Check asset loading")
    parser.add_argument("--verbose", action="store_true", help="Verbose output")
    parser.add_argument("--primary-only", action="store_true", help="Only check primary endpoint")
    parser.add_argument("--versions", action="store_true", help="Check deployment versions across platforms")
    parser.add_argument("--alert-test", action="store_true", help="Send a test alert")
    
    args = parser.parse_args()
    
    # Create config from args
    config = {
        "check_interval": args.interval,
        "check_count": args.count,
        "check_assets": args.assets,
        "verbose": args.verbose
    }
    
    # If primary-only flag is set, modify endpoints
    if args.primary_only:
        config["endpoints"] = [
            {
                "name": "Primary (cqil.ca)",
                "url": "https://cqil.ca",
                "health_path": "/health-check.html",
                "timeout": 5,
                "critical": True
            }
        ]
    
    # Create monitor
    monitor = HealthMonitor(config)
    
    # If no specific action is requested, show help and run a single health check
    if not any([args.versions, args.alert_test]) and args.count == -1:
        # Run just one check by default if no specific action
        config["check_count"] = 1
        monitor = HealthMonitor(config)
        monitor.run_health_check()
        return 0
    
    # Check versions if requested
    if args.versions:
        monitor.check_deployment_versions()
        return 0
        
    # Send test alert if requested
    if args.alert_test:
        test_status = {
            "Primary (cqil.ca)": {
                "status": "unhealthy",
                "consecutive_failures": 3,
                "errors": ["Test alert - please disregard"]
            }
        }
        monitor.send_alert(test_status)
        return 0
    
    # Start monitoring
    monitor.start_monitoring()
    return 0
    
if __name__ == "__main__":
    main()