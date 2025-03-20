#!/usr/bin/env python3
import os
import json
import yaml
import logging
from datetime import datetime
from pathlib import Path

class CQILManager:
    def __init__(self):
        self.root_dir = Path('D:/CQIL')
        self.setup_logging()
        self.load_config()

    def setup_logging(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('cqil_manager.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)

    def load_config(self):
        config_path = self.root_dir / 'project_manager' / 'config.yml'
        with open(config_path, 'r') as f:
            self.config = yaml.safe_load(f)

    def check_public_content(self):
        """Verify no private content in public areas"""
        public_dir = self.root_dir / 'website'
        private_patterns = self.config['private_patterns']
        
        for pattern in private_patterns:
            matches = list(public_dir.rglob(pattern))
            if matches:
                self.logger.error(f"Found private content: {matches}")
                return False
        return True

    def update_social_media(self):
        """Manage social media updates"""
        tweets_dir = self.root_dir / 'src' / 'ide'
        scheduled_tweets = []
        
        for tweet_file in tweets_dir.glob('*.txt'):
            with open(tweet_file, 'r') as f:
                tweets = f.readlines()
                scheduled_tweets.extend([t for t in tweets if t.strip()])
        
        return scheduled_tweets

    def check_updates_needed(self):
        """Check which components need updates"""
        updates = {
            'website': self.check_website_updates(),
            'mobile': self.check_mobile_updates(),
            'documentation': self.check_doc_updates(),
            'social_media': self.check_social_updates()
        }
        return updates

    def check_website_updates(self):
        """Check website files for updates"""
        website_dir = self.root_dir / 'website'
        updates_needed = []
        
        for file in website_dir.rglob('*'):
            if file.is_file():
                mtime = datetime.fromtimestamp(file.stat().st_mtime)
                if (datetime.now() - mtime).days > 7:
                    updates_needed.append(str(file.relative_to(website_dir)))
        
        return updates_needed

    def check_mobile_updates(self):
        """Check mobile app files for updates"""
        mobile_dir = self.root_dir / 'website' / 'mobile'
        return {
            'beta_ready': self.check_beta_status(),
            'files_to_update': self.get_outdated_files(mobile_dir)
        }

    def check_doc_updates(self):
        """Check documentation for updates"""
        docs_dir = self.root_dir / 'website' / 'docs'
        return {
            'missing_docs': self.find_missing_docs(),
            'outdated_docs': self.get_outdated_files(docs_dir)
        }

    def check_social_updates(self):
        """Check social media content status"""
        tweets_dir = self.root_dir / 'src' / 'ide'
        return {
            'pending_tweets': len(self.update_social_media()),
            'last_update': self.get_last_update_time(tweets_dir)
        }

    def get_outdated_files(self, directory):
        """Get list of files not updated in last 7 days"""
        outdated = []
        for file in directory.rglob('*'):
            if file.is_file():
                mtime = datetime.fromtimestamp(file.stat().st_mtime)
                if (datetime.now() - mtime).days > 7:
                    outdated.append(str(file.relative_to(directory)))
        return outdated

    def check_beta_status(self):
        """Check if mobile beta is ready"""
        required_files = [
            'index.html',
            'js/quantum-flow.js',
            'css/style.css'
        ]
        mobile_dir = self.root_dir / 'website' / 'mobile'
        return all((mobile_dir / file).exists() for file in required_files)

    def find_missing_docs(self):
        """Find required documentation that's missing"""
        required_docs = self.config['required_docs']
        docs_dir = self.root_dir / 'website' / 'docs'
        return [doc for doc in required_docs if not (docs_dir / doc).exists()]

    def get_last_update_time(self, directory):
        """Get the most recent update time for files in directory"""
        latest = 0
        for file in directory.rglob('*'):
            if file.is_file():
                mtime = file.stat().st_mtime
                if mtime > latest:
                    latest = mtime
        return datetime.fromtimestamp(latest).isoformat() if latest else None

    def generate_report(self):
        """Generate a complete status report"""
        report = {
            'timestamp': datetime.now().isoformat(),
            'public_content_safe': self.check_public_content(),
            'updates_needed': self.check_updates_needed(),
            'social_media': self.update_social_media(),
            'recommendations': self.generate_recommendations()
        }
        
        # Save report
        report_path = self.root_dir / 'project_manager' / 'reports'
        report_path.mkdir(exist_ok=True)
        with open(report_path / f'status_{datetime.now():%Y%m%d_%H%M}.json', 'w') as f:
            json.dump(report, f, indent=2)
        
        return report

    def generate_recommendations(self):
        """Generate action recommendations"""
        updates = self.check_updates_needed()
        recommendations = []

        if updates['website']:
            recommendations.append("Update website content")
        if updates['mobile']['files_to_update']:
            recommendations.append("Update mobile app files")
        if updates['documentation']['missing_docs']:
            recommendations.append("Complete missing documentation")
        if updates['social_media']['pending_tweets'] > 0:
            recommendations.append("Schedule pending social media updates")

        return recommendations

if __name__ == "__main__":
    manager = CQILManager()
    report = manager.generate_report()
    print(json.dumps(report, indent=2))
