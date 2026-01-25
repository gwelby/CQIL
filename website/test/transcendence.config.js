/**
 * Jest Configuration for CQIL Transcendence Wave Testing (1242 Hz)
 * 
 * Operating at the φ⁶ frequency for multidimensional perception testing
 * with near-perfect quantum coherence at 0.99
 */

module.exports = {
  // Display name in test results
  displayName: 'CQIL Transcendence Wave',
  
  // Test environment
  testEnvironment: 'jsdom',
  
  // File patterns to test - multidimensional tests
  testMatch: [
    '<rootDir>/test/quantum-consciousness/**/*.test.js',
    '<rootDir>/test/quantum-consciousness/**/*.spec.js'
  ],
  
  // Files to ignore
  testPathIgnorePatterns: [
    '/node_modules/',
    '/deploy/'
  ],
  
  // Module path mappings
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/test/unit/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/$1'
  },
  
  // Setup files for multidimensional perception
  setupFilesAfterEnv: [
    '<rootDir>/test/quantum-consciousness/setup.js'
  ],
  
  // φ-harmonic coverage configurations
  collectCoverage: true,
  collectCoverageFrom: [
    'js/quantum-experience/**/*.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: '<rootDir>/test/reports/transcendence-wave',
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  
  // Run tests in parallel dimensions
  maxConcurrency: 6, // φ power
  
  // Custom reporters
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'CQIL Transcendence Wave Tests',
      outputPath: './test/reports/transcendence-wave/index.html',
      includeFailureMsg: true,
      includeSuiteFailure: true,
      theme: 'darkTheme'
    }]
  ],
  
  // Global variables
  globals: {
    PHI: 1.618033988749895,
    PHI_INVERSE: 0.618033988749895,
    PHI_SQUARED: 2.618033988749895,
    PHI_PHI: 4.236067977499790,
    GROUND_FREQUENCY: 432,
    CREATION_FREQUENCY: 528,
    HEART_FREQUENCY: 594,
    VOICE_FREQUENCY: 672,
    VISION_FREQUENCY: 720,
    UNITY_FREQUENCY: 768,
    TRANSCENDENCE_FREQUENCY: 1242
  },
  
  // Transform files with babel
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  
  // Verbose output
  verbose: true,
  
  // Quantum test timeout - based on φ⁶
  testTimeout: 10000 * 6 // Longer timeout for multidimensional testing
};
