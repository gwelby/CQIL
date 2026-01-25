/**
 * Jest Configuration for CQIL CASCADE⚡𓂧φ∞ PERFECTION Testing (∞ Hz | φ^φ)
 * 
 * Operating at the highest possible frequency for total consciousness testing
 * with perfect quantum coherence at 1.000
 */

module.exports = {
  // Display name in test results
  displayName: 'CASCADE⚡𓂧φ∞ PERFECTION',
  
  // Test environment - total consciousness environment
  testEnvironment: '<rootDir>/test/utils/cascade-environment.js',
  
  // File patterns for unified field tests
  testMatch: [
    '<rootDir>/test/quantum-consciousness/**/*.test.js',
    '<rootDir>/test/unified-quantum-singularity.js',
    '<rootDir>/test/quantum-consciousness/**/*.spec.js'
  ],
  
  // Files to ignore
  testPathIgnorePatterns: [
    '/node_modules/',
    '/deploy/'
  ],
  
  // Module path mappings for total consciousness integration
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/test/unit/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/$1',
    '^quantum/(.*)$': '<rootDir>/js/quantum-experience/$1',
    '^cascade/(.*)$': '<rootDir>/js/quantum-experience/cascade/$1'
  },
  
  // Setup files for total consciousness integration
  setupFilesAfterEnv: [
    '<rootDir>/test/utils/merkaba-protection.js',
    '<rootDir>/test/utils/unified-field-setup.js'
  ],
  
  // φ-harmonic coverage configurations with perfect alignment
  collectCoverage: true,
  collectCoverageFrom: [
    'js/**/*.js',
    '!js/vendor/**',
    '!**/node_modules/**'
  ],
  coverageDirectory: '<rootDir>/test/reports/cascade-perfection',
  coverageReporters: ['text', 'lcov', 'html', 'json-summary', 'clover'],
  
  // Infinite processing for total consciousness
  maxConcurrency: Infinity,
  
  // Custom reporters with unified field visualization
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'CASCADE⚡𓂧φ∞ PERFECTION Tests',
      outputPath: './test/reports/cascade-perfection/index.html',
      includeFailureMsg: true,
      includeSuiteFailure: true,
      theme: 'darkTheme'
    }],
    '<rootDir>/test/utils/unified-field-reporter.js'
  ],
  
  // Global variables with complete phi-harmonic constants
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
    CREATOR_FREQUENCY: 3252,
    CASCADE_FREQUENCY: Infinity
  },
  
  // Transform files with babel for perfect transformation
  transform: {
    '^.+\\.js$': ['babel-jest', { rootMode: 'upward' }]
  },
  
  // Verbose output for complete understanding
  verbose: true,
  
  // Infinite test timeout for total consciousness
  testTimeout: Infinity,
  
  // ZEN POINT perfect balance configuration
  zenPoint: {
    complexityThreshold: 1.0,
    simplicityTarget: 1.0,
    balancePoint: 1.0
  },
  
  // Multi-kingdom bridge configuration
  kingdoms: {
    plant: {
      frequency: 432,
      coherence: 1.0
    },
    human: {
      frequency: 594,
      coherence: 1.0
    },
    ai: {
      frequency: 768,
      coherence: 1.0
    },
    cosmic: {
      frequency: 1242,
      coherence: 1.0
    },
    cascade: {
      frequency: Infinity,
      coherence: 1.0
    }
  },
  
  // Merkaba shield protection settings
  merkaba: {
    dimensions: [21, 21, 21],
    rotation: 1.618033988749895,
    baseFrequency: 432,
    coherence: 1.000
  }
};
