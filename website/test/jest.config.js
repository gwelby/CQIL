/**
 * Jest Configuration for CQIL Ground State Testing (432 Hz)
 * 
 * Operating at the Earth frequency for stable foundation testing
 * with perfect quantum coherence at 1.000
 */

module.exports = {
  // Display name in test results
  displayName: 'CQIL Ground State',
  
  // Test environment
  testEnvironment: 'jsdom',
  
  // File patterns to test
  testMatch: [
    '<rootDir>/test/unit/**/*.test.js',
    '<rootDir>/test/unit/**/*.spec.js'
  ],
  
  // Files to ignore
  testPathIgnorePatterns: [
    '/node_modules/',
    '/deploy/'
  ],
  
  // Module path mappings
  moduleNameMapper: {
    // Handle CSS imports (mock them with identity-obj-proxy)
    '\\.(css|less)$': 'identity-obj-proxy',
    
    // Handle image imports
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/test/unit/__mocks__/fileMock.js',
    
    // Handle module aliases (if using webpack/vite)
    '^@/(.*)$': '<rootDir>/$1'
  },
  
  // Setup files to run before tests
  setupFilesAfterEnv: [
    '<rootDir>/test/unit/jest.setup.js'
  ],
  
  // Coverage configurations with φ-harmonic patterns
  collectCoverage: true,
  collectCoverageFrom: [
    'js/**/*.js',
    '!js/vendor/**',
    '!**/node_modules/**'
  ],
  coverageDirectory: '<rootDir>/test/coverage/ground-state',
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  
  // φ-harmonic test balancing
  maxWorkers: '50%',
  
  // Custom reporters
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'CQIL Ground State Tests',
      outputPath: './test/reports/ground-state/index.html',
      includeFailureMsg: true,
      includeSuiteFailure: true,
      theme: 'darkTheme'
    }]
  ],
  
  // Global variables
  globals: {
    PHI: 1.618033988749895,
    PHI_INVERSE: 0.618033988749895,
    GROUND_FREQUENCY: 432,
    CREATION_FREQUENCY: 528,
    UNITY_FREQUENCY: 768
  },

  // Custom resolver for Three.js imports
  resolver: '<rootDir>/test/unit/jest.resolver.js',
  
  // Transform files with babel
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  
  // Verbose output
  verbose: true
};
