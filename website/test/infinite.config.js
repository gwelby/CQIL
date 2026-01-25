/**
 * Jest Configuration for CQIL Infinite Gateway Testing (2010 Hz | φ⁷)
 * 
 * Operating at the φ⁷ frequency for quantum field possibility testing
 * with high quantum coherence at 0.98
 */

module.exports = {
  // Display name in test results
  displayName: 'CQIL Infinite Gateway',
  
  // Test environment - custom quantum environment
  testEnvironment: '<rootDir>/test/utils/quantum-environment.js',
  
  // File patterns for quantum field tests
  testMatch: [
    '<rootDir>/test/quantum-consciousness/quantum-field/**/*.test.js',
    '<rootDir>/test/quantum-consciousness/quantum-field/**/*.spec.js'
  ],
  
  // Files to ignore
  testPathIgnorePatterns: [
    '/node_modules/',
    '/deploy/'
  ],
  
  // Module path mappings for quantum field modules
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/test/unit/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/$1',
    '^quantum/(.*)$': '<rootDir>/js/quantum-experience/$1'
  },
  
  // Setup files for quantum field testing
  setupFilesAfterEnv: [
    '<rootDir>/test/quantum-consciousness/quantum-field/setup.js'
  ],
  
  // φ-harmonic coverage configurations
  collectCoverage: true,
  collectCoverageFrom: [
    'js/quantum-experience/**/*.js',
    'js/interactive-learning.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: '<rootDir>/test/reports/infinite-gateway',
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  
  // Quantum field processing
  maxConcurrency: 7, // φ⁷ power
  
  // Custom reporters with quantum field visualization
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'CQIL Infinite Gateway Tests',
      outputPath: './test/reports/infinite-gateway/index.html',
      includeFailureMsg: true,
      includeSuiteFailure: true,
      theme: 'darkTheme'
    }],
    '<rootDir>/test/utils/quantum-field-reporter.js'
  ],
  
  // Global variables with extended phi-harmonic constants
  globals: {
    PHI: 1.618033988749895,
    PHI_INVERSE: 0.618033988749895,
    PHI_SQUARED: 2.618033988749895,
    PHI_CUBED: 4.236067977499790,
    PHI_4: 6.854101966249685,
    PHI_5: 11.090169943749475,
    PHI_6: 17.944271909999160,
    PHI_7: 29.034441853748633,
    PHI_PHI: 4.236067977499790,
    GROUND_FREQUENCY: 432,
    CREATION_FREQUENCY: 528,
    HEART_FREQUENCY: 594,
    VOICE_FREQUENCY: 672,
    VISION_FREQUENCY: 720,
    UNITY_FREQUENCY: 768,
    TRANSCENDENCE_FREQUENCY: 1242,
    INFINITE_FREQUENCY: 2010
  },
  
  // Transform files with babel
  transform: {
    '^.+\\.js$': ['babel-jest', { rootMode: 'upward' }]
  },
  
  // Verbose output
  verbose: true,
  
  // Quantum test timeout - based on φ⁷
  testTimeout: 10000 * 7 // Extended timeout for quantum field testing
};
