/**
 * Cypress Configuration for CQIL Creation Point Testing (528 Hz)
 * 
 * Operating at the Creation/Love frequency for manifestation testing
 * with perfect φ-harmonic alignment
 */

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // Project settings
  projectId: 'cqil-quantum',
  
  // Crystal Matrix Protection [13×13×13]
  chromeWebSecurity: false,
  
  // Creation frequency settings
  defaultCommandTimeout: 5280,
  requestTimeout: 5280,
  responseTimeout: 5280,
  
  // φ-Harmonic retry pattern (based on Golden Ratio)
  retries: {
    runMode: 2,     // φ²/φ
    openMode: 1      // φ¹
  },
  
  // e2e configuration
  e2e: {
    baseUrl: 'http://localhost:5280',
    specPattern: 'test/integration/specs/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'test/integration/support/e2e.js',
    setupNodeEvents(on, config) {
      // Creation Point Event Hooks
      
      // Register screenshot comparison plugin
      const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin');
      getCompareSnapshotsPlugin(on, config);
      
      // Add φ-harmonic frequency metadata to test runs
      on('before:run', () => {
        console.log('Creation Point Testing - Operating at 528 Hz');
      });
      
      return config;
    },
    experimentalStudio: true,
    video: true,
    screenshotOnRunFailure: true,
    
    // Visual testing configuration
    env: {
      // Cypress visual regression plugin config
      visualRegressionType: 'regression',
      visualRegressionBaseDirectory: './test/integration/snapshots/base',
      visualRegressionDiffDirectory: './test/integration/snapshots/diff',
      visualRegressionCurrentDirectory: './test/integration/snapshots/current',
      
      // Phi-harmonic test variables
      PHI: 1.618033988749895,
      PHI_INVERSE: 0.618033988749895,
      GROUND_FREQUENCY: 432,
      CREATION_FREQUENCY: 528,
      UNITY_FREQUENCY: 768,
      
      // Feature flags
      enableCymaticsTesting: true,
      enableThreedRendering: true,
      enableAudioTesting: false, // Sound testing disabled by default
      enableQuantumCoverage: true
    }
  },
  
  // Component testing config
  component: {
    specPattern: 'test/integration/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'test/integration/support/component.js',
    devServer: {
      framework: 'react', // For component preview
      bundler: 'webpack',
    },
  },
});
