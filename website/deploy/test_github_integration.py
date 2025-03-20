#!/usr/bin/env python3
import os
import sys
import unittest
from unittest.mock import patch, MagicMock
from pathlib import Path
import yaml

# Add the current directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import the module to test
from github_deploy import GitHubIntegration

class TestGitHubIntegration(unittest.TestCase):
    """Test cases for GitHubIntegration class"""

    def setUp(self):
        """Set up test environment"""
        # Create a mock config for testing
        self.test_config = {
            'github': {
                'token': 'test_token',
                'owner': 'test_owner',
                'repo': 'test_repo',
                'branch': 'main'
            },
            'deploy': {
                'auto_deploy': True,
                'deploy_branch': 'main',
                'webhooks_enabled': False
            }
        }
        
        # Create a temporary test config file
        self.test_config_path = Path(__file__).parent / 'test_github_config.yml'
        with open(self.test_config_path, 'w') as f:
            yaml.dump(self.test_config, f)
            
        # Patch the load_config method to use our test config
        self.patcher = patch('github_deploy.GitHubIntegration.load_config')
        self.mock_load_config = self.patcher.start()
        
        # Create the instance with mocked configuration
        self.integration = GitHubIntegration()
        self.integration.github_config = self.test_config
        self.integration.logger = MagicMock()
        
    def tearDown(self):
        """Clean up after tests"""
        # Remove the test config file
        if self.test_config_path.exists():
            self.test_config_path.unlink()
            
        # Stop the patcher
        self.patcher.stop()
        
    @patch('github_deploy.Github')
    def test_connect_to_github(self, mock_github):
        """Test GitHub connection"""
        # Mock the Github class and its methods
        mock_user = MagicMock()
        mock_user.login = 'test_owner'
        mock_github.return_value.get_user.return_value = mock_user
        
        # Call the method
        result = self.integration.connect_to_github()
        
        # Assertions
        self.assertIsNotNone(result)
        mock_github.assert_called_once_with('test_token')
        mock_github.return_value.get_user.assert_called_once()
        
    @patch('github_deploy.Github')
    def test_create_repository_existing_repo(self, mock_github):
        """Test repository creation when repo already exists"""
        # Mock the Github class and its methods
        mock_user = MagicMock()
        mock_repo = MagicMock()
        mock_repo.html_url = 'https://github.com/test_owner/test_repo'
        
        # Set up the mock to return the mock_user for the specific call we want to test
        mock_github.return_value.get_user = MagicMock()
        mock_github.return_value.get_user.side_effect = lambda username=None: mock_user
        
        # Set up the mock_user to return mock_repo
        mock_user.get_repo.return_value = mock_repo
        
        # Call the method
        result = self.integration.create_repository()
        
        # Assertions
        self.assertEqual(result, mock_repo)
        mock_github.assert_called_once_with('test_token')
        mock_user.get_repo.assert_called_once_with('test_repo')
        
    def test_push_to_github(self):
        """Test pushing website to GitHub"""
        # Mock all necessary methods and functions
        with patch('subprocess.run') as mock_run:
            # Mock the create_repository method
            self.integration.create_repository = MagicMock(return_value=MagicMock())
            self.integration.setup_github_pages = MagicMock(return_value=True)
            
            # Mock Path.exists for .git directory
            with patch('pathlib.Path.exists', return_value=True):
                # Mock subprocess.run
                mock_run.return_value.returncode = 0
                
                # Call the method
                result = self.integration.push_to_github()
                
                # Assertions
                self.assertTrue(result)
                self.integration.create_repository.assert_called_once()
                self.integration.setup_github_pages.assert_called_once()
            
    def test_setup_cloudflare_pages(self):
        """Test CloudFlare Pages setup information"""
        # This is a simple test for a method that just outputs information
        result = self.integration.setup_cloudflare_pages()
        self.assertTrue(result)

if __name__ == '__main__':
    unittest.main()