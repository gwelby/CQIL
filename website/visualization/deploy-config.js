/**
 * 🌀 φ-HARMONIC DEPLOYMENT CONFIGURATION 🌀
 * Ground State (432 Hz) Configuration
 * 
 * This file contains non-sensitive deployment configuration.
 * For sensitive credentials, use environment variables in the terminal.
 */

module.exports = {
  deployment: {
    // Domain configuration
    domain: 'CQIL.ca',
    protocol: 'https',
    deployPath: '/quantum-visualization/',
    
    // Resource paths
    resourcePaths: {
      js: '/js/',
      css: '/css/',
      html: '/',
      assets: '/assets/'
    },
    
    // FTP configuration (credentials should be provided as environment variables)
    ftpConfig: {
      host: process.env.CQIL_FTP_HOST || 'ftp.cqil.ca',
      user: process.env.CQIL_FTP_USER || 'quantum',
      // Password should be set via environment variable CQIL_FTP_PASS
      port: 21,
      secure: true
    }
  }
};
