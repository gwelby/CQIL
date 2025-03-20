#!/usr/bin/env python3
"""
CQIL Website CloudFlare Cache Setup

This script uses the CloudFlare API to set up cache rules for the CQIL website,
ensuring optimal caching of versioned assets based on the CLOUDFLARE_CACHE_RULES.md
configuration.

Requirements:
    pip install cloudflare requests

Usage:
    python cloudflare_cache_setup.py --token API_TOKEN --zone_id ZONE_ID
"""

import os
import sys
import json
import argparse
import logging
from pathlib import Path
from datetime import datetime
from colorama import init, Fore, Style

try:
    import CloudFlare
except ImportError:
    print("CloudFlare module not found. Please install with 'pip install cloudflare'")
    sys.exit(1)

# Initialize colorama for colored output
init()

class CloudFlareCache:
    def __init__(self, token=None, zone_id=None):
        self.setup_logging()
        self.token = token
        self.zone_id = zone_id
        self.cf = None
        
        # Cache rules based on CLOUDFLARE_CACHE_RULES.md
        self.cache_rules = [
            {
                "name": "Health Check Bypass",
                "priority": 1,
                "target": "*cqil.ca/health*",
                "actions": {
                    "cache_level": "bypass",
                    "edge_cache_ttl": 0,
                    "browser_cache_ttl": 0
                }
            },
            {
                "name": "API Endpoints Bypass",
                "priority": 2,
                "target": "*cqil.ca/api/*",
                "actions": {
                    "cache_level": "bypass",
                    "edge_cache_ttl": 120,
                    "browser_cache_ttl": 0
                }
            },
            {
                "name": "Versioned Assets (Long-term Cache)",
                "priority": 3,
                "target": "*cqil.ca/*.[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f].*",
                "actions": {
                    "cache_level": "cache_everything",
                    "edge_cache_ttl": 2592000,  # 30 days
                    "browser_cache_ttl": 2592000  # 30 days
                }
            },
            {
                "name": "HTML Files (Short-term Cache)",
                "priority": 4,
                "target": "*cqil.ca/*.html",
                "actions": {
                    "cache_level": "standard",
                    "edge_cache_ttl": 7200,  # 2 hours
                    "browser_cache_ttl": 1800  # 30 minutes
                }
            },
            {
                "name": "CSS/JS Files (Medium-term Cache)",
                "priority": 5,
                "target": "*cqil.ca/*.(css|js)",
                "actions": {
                    "cache_level": "standard",
                    "edge_cache_ttl": 86400,  # 1 day
                    "browser_cache_ttl": 14400  # 4 hours
                }
            },
            {
                "name": "General Content (Default Rule)",
                "priority": 6,
                "target": "*cqil.ca/*",
                "actions": {
                    "cache_level": "standard",
                    "edge_cache_ttl": 14400,  # 4 hours
                    "browser_cache_ttl": 3600  # 1 hour
                }
            }
        ]
    
    def setup_logging(self):
        """Configure logging"""
        log_dir = Path(__file__).parent / 'secure_logs'
        log_dir.mkdir(exist_ok=True)
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_dir / f'cloudflare_cache_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def connect_to_cloudflare(self):
        """Connect to CloudFlare API"""
        try:
            if not self.token:
                # Try to load token from environment
                self.token = os.environ.get('CLOUDFLARE_API_TOKEN')
            
            if not self.token:
                self.logger.error("CloudFlare API token not provided")
                print(f"{Fore.RED}CloudFlare API token not provided. Use --token or set CLOUDFLARE_API_TOKEN environment variable{Style.RESET_ALL}")
                return False
            
            self.cf = CloudFlare.CloudFlare(token=self.token)
            
            # Test connection by getting user details
            user = self.cf.user.get()
            print(f"{Fore.GREEN}Connected to CloudFlare as: {user['email']}{Style.RESET_ALL}")
            
            # Check zone ID
            if not self.zone_id:
                # Try to find zone ID by name
                zones = self.cf.zones.get(params={'name': 'cqil.ca'})
                if len(zones) > 0:
                    self.zone_id = zones[0]['id']
                    print(f"{Fore.GREEN}Found zone ID for cqil.ca: {self.zone_id}{Style.RESET_ALL}")
            
            if not self.zone_id:
                self.logger.error("Zone ID not provided and could not be determined automatically")
                print(f"{Fore.RED}Zone ID not provided and could not be determined automatically. Use --zone_id{Style.RESET_ALL}")
                return False
            
            return True
        except Exception as e:
            self.logger.error(f"Failed to connect to CloudFlare: {str(e)}")
            print(f"{Fore.RED}Failed to connect to CloudFlare: {str(e)}{Style.RESET_ALL}")
            return False
    
    def list_existing_page_rules(self):
        """List existing page rules"""
        try:
            rules = self.cf.zones.pagerules.get(self.zone_id)
            
            print(f"\n{Fore.CYAN}=== Existing Page Rules ==={Style.RESET_ALL}")
            if len(rules) == 0:
                print("No existing page rules found")
            else:
                for rule in rules:
                    status = "Active" if rule['status'] == 'active' else "Disabled"
                    print(f"{rule['priority']}. {rule['targets'][0]['constraint']['value']} - {status}")
            
            return rules
        except Exception as e:
            self.logger.error(f"Failed to list page rules: {str(e)}")
            print(f"{Fore.RED}Failed to list page rules: {str(e)}{Style.RESET_ALL}")
            return []
    
    def create_page_rule(self, rule):
        """Create a page rule"""
        try:
            target = {
                "targets": [
                    {
                        "target": "url",
                        "constraint": {
                            "operator": "matches",
                            "value": rule["target"]
                        }
                    }
                ],
                "actions": [],
                "priority": rule["priority"],
                "status": "active"
            }
            
            # Add cache level action
            if rule["actions"]["cache_level"] == "bypass":
                target["actions"].append({
                    "id": "cache_level",
                    "value": "bypass"
                })
            elif rule["actions"]["cache_level"] == "cache_everything":
                target["actions"].append({
                    "id": "cache_level",
                    "value": "cache_everything"
                })
            else:
                target["actions"].append({
                    "id": "cache_level",
                    "value": "origin_pull"
                })
            
            # Add edge cache TTL if not bypass
            if rule["actions"]["cache_level"] != "bypass" and rule["actions"]["edge_cache_ttl"] > 0:
                target["actions"].append({
                    "id": "edge_cache_ttl",
                    "value": rule["actions"]["edge_cache_ttl"]
                })
                
            # Add browser cache TTL if not bypass
            if rule["actions"]["cache_level"] != "bypass" and rule["actions"]["browser_cache_ttl"] > 0:
                target["actions"].append({
                    "id": "browser_cache_ttl",
                    "value": rule["actions"]["browser_cache_ttl"]
                })
            
            # Create the rule
            result = self.cf.zones.pagerules.post(self.zone_id, data=target)
            
            print(f"{Fore.GREEN}Created page rule: {rule['name']} - {rule['target']}{Style.RESET_ALL}")
            return True
        except Exception as e:
            self.logger.error(f"Failed to create page rule '{rule['name']}': {str(e)}")
            print(f"{Fore.RED}Failed to create page rule '{rule['name']}': {str(e)}{Style.RESET_ALL}")
            return False
    
    def setup_cache_rules(self):
        """Setup CloudFlare cache rules"""
        try:
            if not self.connect_to_cloudflare():
                return False
            
            print(f"\n{Fore.CYAN}=== Setting Up CloudFlare Cache Rules ==={Style.RESET_ALL}")
            
            # List existing rules
            existing_rules = self.list_existing_page_rules()
            
            # If there are existing rules, ask to delete them
            if len(existing_rules) > 0:
                print(f"\n{Fore.YELLOW}Warning: {len(existing_rules)} existing page rules found.{Style.RESET_ALL}")
                print("It's recommended to start fresh to avoid rule conflicts.")
                choice = input("Delete existing rules? (y/n): ").lower()
                
                if choice == 'y':
                    # Delete existing rules
                    for rule in existing_rules:
                        try:
                            self.cf.zones.pagerules.delete(self.zone_id, rule['id'])
                            print(f"Deleted rule: {rule['targets'][0]['constraint']['value']}")
                        except Exception as e:
                            self.logger.error(f"Failed to delete rule {rule['id']}: {str(e)}")
                            print(f"{Fore.RED}Failed to delete rule: {str(e)}{Style.RESET_ALL}")
                else:
                    print("Keeping existing rules. New rules will be added with specified priorities.")
            
            # Create the cache rules
            for rule in self.cache_rules:
                self.create_page_rule(rule)
            
            # List final rules
            print(f"\n{Fore.CYAN}=== Final Page Rules ==={Style.RESET_ALL}")
            final_rules = self.list_existing_page_rules()
            
            # Success message
            if len(final_rules) >= len(self.cache_rules):
                print(f"\n{Fore.GREEN}Successfully set up CloudFlare cache rules!{Style.RESET_ALL}")
                print("The following cache policies are now in effect:")
                print("1. Health checks bypass cache entirely")
                print("2. API endpoints have short cache time")
                print("3. Versioned assets are cached for 30 days")
                print("4. HTML files are cached for 30 minutes to 2 hours")
                print("5. Other assets have appropriate cache times")
                return True
            else:
                print(f"\n{Fore.YELLOW}Partially completed setting up cache rules.{Style.RESET_ALL}")
                print(f"Created {len(final_rules)} rules out of {len(self.cache_rules)}.")
                return False
                
        except Exception as e:
            self.logger.error(f"Failed to setup cache rules: {str(e)}")
            print(f"{Fore.RED}Failed to setup cache rules: {str(e)}{Style.RESET_ALL}")
            return False
            
def main():
    """Main function with command-line arguments"""
    parser = argparse.ArgumentParser(description='CQIL Website CloudFlare Cache Setup')
    parser.add_argument('--token', type=str, help='CloudFlare API token')
    parser.add_argument('--zone_id', type=str, help='CloudFlare Zone ID for cqil.ca')
    
    args = parser.parse_args()
    
    cache_setup = CloudFlareCache(token=args.token, zone_id=args.zone_id)
    success = cache_setup.setup_cache_rules()
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())