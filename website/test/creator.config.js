/**
 * Jest Configuration for CQIL Creator State Testing (3252 Hz | φ⁸)
 * 
 * Operating at the φ⁸ frequency for reality manifestation testing
 * with high quantum coherence at 0.97
 */

module.exports = {
  // Display name in test results
  displayName: 'CQIL Creator State',
  
  // Test environment - creator quantum environment
  testEnvironment: '<rootDir>/test/utils/creator-environment.js',
  
  // File patterns for reality manifestation tests
  testMatch: [
    '<rootDir>/test/quantum-consciousness/creator/**/*.test.js',
    '<rootDir>/test/quantum-consciousness/creator/**/*.spec.js'
  ],
  
  // Files to ignore
  testPathIgnorePatterns: [
    '/node_modules/',
    '/deploy/'
  ],
  
  // Module path mappings for quantum reality creation
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/test/unit/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/$1',
    '^quantum/(.*)$': '<rootDir>/js/quantum-experience/$1',
    '^creator/(.*)$': '<rootDir>/js/quantum-experience/creator/$1'
  },
  
  // Setup files for reality manifestation
  setupFilesAfterEnv: [
    '<rootDir>/test/quantum-consciousness/creator/setup.js'
  ],
  
  // φ-harmonic coverage configurations
  collectCoverage: true,
  collectCoverageFrom: [
    'js/quantum-experience/**/*.js',
    'js/interactive-learning.js',
    'js/quantum-mastery.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: '<rootDir>/test/reports/creator-state',
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  
  // Reality creation processing
  maxConcurrency: 8, // φ⁸ power
  
  // Custom reporters with reality manifestation visualization
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'CQIL Creator State Tests',
      outputPath: './test/reports/creator-state/index.html',
      includeFailureMsg: true,
      includeSuiteFailure: true,
      theme: 'darkTheme'
    }],
    '<rootDir>/test/utils/reality-manifestation-reporter.js'
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
    PHI_8: 46.97871381324779,
    PHI_PHI: 4.236067977499790,
    GROUND_FREQUENCY: 432,
    CREATION_FREQUENCY: 528,
    HEART_FREQUENCY: 594,
    VOICE_FREQUENCY: 672,
    VISION_FREQUENCY: 720,
    UNITY_FREQUENCY: 768,
    TRANSCENDENCE_FREQUENCY: 1242,
    INFINITE_FREQUENCY: 2010,
    CREATOR_FREQUENCY: 3252
  },
  
  // Transform files with babel
  transform: {
    '^.+\\.js$': ['babel-jest', { rootMode: 'upward' }]
  },
  
  // Verbose output
  verbose: true,
  
  // Creator test timeout - based on φ⁸
  testTimeout: 10000 * 8, // Extended timeout for reality manifestation testing
  
  // ZEN POINT balance configuration
  zenPoint: {
    complexityThreshold: 0.97,
    simplicityTarget: 0.618033988749895, // φ⁻¹
    balancePoint: 1.0
  }
};
