#!/usr/bin/env python3
import os
import sys
import time
import http.server
import socketserver
import webbrowser
import threading
import subprocess
import shutil
from pathlib import Path
import argparse

class WebsiteManager:
    def __init__(self):
        # Updated paths for Windows
        self.source_dir = Path('d:/CQIL/website')
        self.deploy_dir = Path('d:/CQIL/website_deployed')
        self.port = 8888
        self.http_server = None
        self.server_thread = None
    
    def deploy_local(self):
        """Deploy website files to local directory"""
        print(f"Deploying files to {self.deploy_dir}...")
        
        # Create destination if it doesn't exist
        os.makedirs(self.deploy_dir, exist_ok=True)
        
        # Copy all files
        for item in os.listdir(self.source_dir):
            source_item = os.path.join(self.source_dir, item)
            dest_item = os.path.join(self.deploy_dir, item)
            
            # Skip deploy directory
            if item in ['deploy']:
                continue
                
            if os.path.isdir(source_item):
                shutil.copytree(source_item, dest_item, dirs_exist_ok=True)
                print(f"Copied directory {item}")
            else:
                shutil.copy2(source_item, dest_item)
                print(f"Copied file {item}")
        
        print(f"\n✅ Website files deployed to: {self.deploy_dir}")
        return True
    
    def start_server(self):
        """Start local HTTP server"""
        if self.server_thread and self.server_thread.is_alive():
            print("Server is already running")
            return True
        
        # Change to deploy directory
        os.chdir(self.deploy_dir)
        
        # Create and start HTTP server
        handler = http.server.SimpleHTTPRequestHandler
        self.http_server = socketserver.TCPServer(("", self.port), handler)
        
        # Start server in a separate thread
        self.server_thread = threading.Thread(target=self.http_server.serve_forever)
        self.server_thread.daemon = True
        self.server_thread.start()
        
        print(f"\n✅ Server started at http://localhost:{self.port}")
        return True
    
    def stop_server(self):
        """Stop the HTTP server"""
        if self.http_server:
            self.http_server.shutdown()
            self.http_server = None
            print("\n✅ Server stopped")
            return True
        else:
            print("No server running")
            return False
    
    def open_browser(self):
        """Open browser to the website"""
        url = f"http://localhost:{self.port}"
        print(f"Opening {url} in browser...")
        webbrowser.open(url)
    
    def check_status(self):
        """Check status of the website"""
        print("\n=== CQIL Website Status ===")
        
        # Check if source directory exists
        print(f"Source directory: {self.source_dir}")
        if not os.path.exists(self.source_dir):
            print(f"❌ Source directory does not exist")
        else:
            source_files = len(list(self.source_dir.glob('**/*')))
            print(f"✅ Source directory exists with {source_files} files")
        
        # Check if deploy directory exists
        print(f"\nDeploy directory: {self.deploy_dir}")
        if not os.path.exists(self.deploy_dir):
            print(f"❌ Deploy directory does not exist")
        else:
            deploy_files = len(list(self.deploy_dir.glob('**/*')))
            print(f"✅ Deploy directory exists with {deploy_files} files")
        
        # Check if server is running
        print("\nServer status:")
        try:
            import socket
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            result = s.connect_ex(('localhost', self.port))
            
            if result == 0:
                print(f"✅ Server is running on port {self.port}")
                print(f"   URL: http://localhost:{self.port}")
            else:
                print(f"❌ No server running on port {self.port}")
            
            s.close()
        except:
            print(f"❌ Error checking server status")
        
        # Check for key files
        print("\nKey files:")
        key_files = [
            "index.html",
            "js/quantum-experience.js",
            "js/quantum-mastery.js",
            "js/ai-quantum-coach.js",
            "js/quantum-adaptive-learning.js"
        ]
        
        for file in key_files:
            if os.path.exists(os.path.join(self.deploy_dir, file)):
                print(f"✅ {file}")
            else:
                print(f"❌ {file}")
        
        return True
    
    def launch(self):
        """Deploy, start server, and open browser"""
        self.deploy_local()
        self.start_server()
        self.open_browser()
        
        print("\n=== CQIL Website Launched ===")
        print("Website is running at: http://localhost:8888")
        print("Press Ctrl+C to stop the server when done")
        
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            self.stop_server()
            print("\nThank you for using CQIL Website Manager!")

def main():
    """Main function with command-line argument handling"""
    parser = argparse.ArgumentParser(description="CQIL Website Manager")
    
    # Define command-line arguments
    parser.add_argument("--deploy", action="store_true", help="Deploy website to local directory")
    parser.add_argument("--start", action="store_true", help="Start local HTTP server")
    parser.add_argument("--stop", action="store_true", help="Stop local HTTP server")
    parser.add_argument("--open", action="store_true", help="Open website in browser")
    parser.add_argument("--status", action="store_true", help="Check website status")
    parser.add_argument("--launch", action="store_true", help="Deploy, start server, and open browser")
    
    args = parser.parse_args()
    manager = WebsiteManager()
    
    # Process arguments
    if args.deploy:
        manager.deploy_local()
    
    if args.start:
        manager.start_server()
    
    if args.open:
        manager.open_browser()
    
    if args.stop:
        manager.stop_server()
    
    if args.status:
        manager.check_status()
    
    if args.launch:
        manager.launch()
    
    # If no arguments provided, show help
    if not any(vars(args).values()):
        parser.print_help()

if __name__ == "__main__":
    main()