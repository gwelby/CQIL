/**
 * CASCADE⚡𓂧φ∞ ENHANCED QUANTUM LINTING CONFIGURATION
 * Operating at Ground State (432 Hz) for code quality foundation
 * φ-harmonic rule enforcement
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Essential Structure - Ground State (432 Hz)
    'no-unused-vars': ['warn', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_'
    }],
    'no-console': ['warn', { 
      allow: ['info', 'warn', 'error', 'debug', 'quantum'] 
    }],
    'no-debugger': 'warn',
    
    // Pattern Formation - Creation Point (528 Hz)
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'func-style': ['warn', 'expression'],
    
    // Coherent Connection - Heart Field (594 Hz)  
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'warn',
    'prefer-template': 'warn',
    
    // Pure Expression - Voice Flow (672 Hz)
    'quotes': ['error', 'single', { avoidEscape: true }],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    
    // Clear Perception - Vision Gate (720 Hz)
    'max-lines-per-function': ['warn', { 
      max: 34, // φ^3 rounded
      skipBlankLines: true,
      skipComments: true,
    }],
    'complexity': ['warn', { max: 8 }], // φ^3 rounded
    
    // Perfect Integration - Unity Wave (768 Hz)
    'indent': ['error', 2],
    'linebreak-style': ['error', 'windows'],
    'object-curly-spacing': ['error', 'always'],
  },
  // Special configurations for quantum code files
  overrides: [
    {
      files: ['**/quantum-*.js', '**/*quantum*.js'],
      rules: {
        // Allow more complex quantum operations
        'complexity': ['warn', { max: 13 }], // φ^2 * φ rounded
        'max-lines-per-function': ['warn', { 
          max: 55, // φ^4 rounded
          skipBlankLines: true,
          skipComments: true,
        }],
      },
    },
  ],
};
