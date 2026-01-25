/**
 * ESLint Configuration for CQIL with φ-Harmonic Linting
 * 
 * Operating across multiple frequencies:
 * - Ground State (432 Hz): Basic syntax and error detection
 * - Creation Point (528 Hz): Pattern and structure validation
 * - Heart Field (594 Hz): Code relationship coherence
 * - Voice Flow (672 Hz): Expression clarity
 * - Vision Gate (720 Hz): Visual clarity
 * - Unity Wave (768 Hz): Full integration experience quality
 * - Transcendence Wave (1242 Hz): Multidimensional consciousness
 * - Infinite Gateway (2010 Hz): Quantum field possibilities
 * - Creator State (3252 Hz): Reality manifestation
 * - CASCADE PERFECTION (∞ Hz): Total consciousness integration
 */

const PHI = 1.618033988749895;
const PHI_SQUARED = PHI * PHI;
const PHI_CUBED = PHI_SQUARED * PHI;
const PHI_PHI = Math.pow(PHI, PHI);

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended'
  ],
  plugins: [
    'import',
    'jsx-a11y',
    'promise',
    'html',
    'cypress',
    'sonarjs'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  globals: {
    PHI: 'readonly',
    PHI_INVERSE: 'readonly',
    PHI_SQUARED: 'readonly',
    PHI_CUBED: 'readonly',
    PHI_PHI: 'readonly',
    GROUND_FREQUENCY: 'readonly',
    CREATION_FREQUENCY: 'readonly',
    HEART_FREQUENCY: 'readonly',
    VOICE_FREQUENCY: 'readonly',
    VISION_FREQUENCY: 'readonly',
    UNITY_FREQUENCY: 'readonly',
    TRANSCENDENCE_FREQUENCY: 'readonly',
    INFINITE_FREQUENCY: 'readonly',
    CREATOR_FREQUENCY: 'readonly',
    CASCADE_FREQUENCY: 'readonly',
    cy: 'readonly',
    Cypress: 'readonly'
  },
  rules: {
    // Ground State (432 Hz | φ⁰) - Basic syntax and error prevention
    'no-unused-vars': ['warn', { 
      varsIgnorePattern: '^_', 
      argsIgnorePattern: '^_' 
    }],
    'no-undef': 'error',
    'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    'no-debugger': 'warn',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-irregular-whitespace': 'error',
    'no-unreachable': 'error',
    
    // Creation Point (528 Hz | φ¹) - Pattern formation and structure
    'indent': ['warn', 2, { "SwitchCase": 1 }],
    'quotes': ['warn', 'single', { "avoidEscape": true }],
    'semi': ['warn', 'always'],
    'comma-dangle': ['warn', 'never'],
    'object-curly-spacing': ['warn', 'always'],
    'array-bracket-spacing': ['warn', 'never'],
    'comma-spacing': ['warn', { 'before': false, 'after': true }],
    'key-spacing': ['warn', { 'beforeColon': false, 'afterColon': true }],
    'no-multiple-empty-lines': ['warn', { 'max': 1, 'maxEOF': 1 }],
    
    // Heart Field (594 Hz | φ²) - Relationship coherence
    'no-var': 'warn',
    'prefer-const': 'warn',
    'arrow-spacing': 'warn',
    'space-infix-ops': 'warn',
    'eqeqeq': ['warn', 'always', { 'null': 'ignore' }],
    'import/order': ['warn', {
      'groups': [
        'builtin', 
        'external', 
        'internal', 
        'parent', 
        'sibling', 
        'index'
      ],
      'newlines-between': 'always'
    }],
    'no-shadow': 'warn',
    'no-use-before-define': ['warn', { 'functions': false }],
    
    // Voice Flow (672 Hz | φ³) - Expression clarity
    'max-len': ['warn', { 
      'code': Math.round(PHI * 60), // ~100 characters based on phi ratio
      'ignoreComments': true, 
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true
    }],
    'no-multi-spaces': 'warn',
    'array-bracket-spacing': ['warn', 'never'],
    'block-spacing': ['warn', 'always'],
    'computed-property-spacing': ['warn', 'never'],
    'jsx-quotes': ['warn', 'prefer-double'],
    'prefer-template': 'warn',
    'template-curly-spacing': ['warn', 'never'],
    
    // Vision Gate (720 Hz | φ⁴) - Visual clarity
    'brace-style': ['warn', '1tbs', { 'allowSingleLine': true }],
    'keyword-spacing': 'warn',
    'space-before-blocks': 'warn',
    'space-before-function-paren': ['warn', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'padding-line-between-statements': [
      'warn',
      { 'blankLine': 'always', 'prev': '*', 'next': 'return' },
      { 'blankLine': 'always', 'prev': ['const', 'let', 'var'], 'next': '*' },
      { 'blankLine': 'any', 'prev': ['const', 'let', 'var'], 'next': ['const', 'let', 'var'] },
      { 'blankLine': 'always', 'prev': 'directive', 'next': '*' },
      { 'blankLine': 'always', 'prev': '*', 'next': 'function' }
    ],
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-has-content': 'warn',
    
    // Unity Wave (768 Hz | φ⁵) - Full integration experience
    'camelcase': ['warn', { 'properties': 'never' }],
    'no-param-reassign': 'warn',
    'prefer-template': 'warn',
    'no-nested-ternary': 'warn',
    'no-mixed-operators': 'warn',
    'consistent-return': 'warn',
    'promise/always-return': 'warn',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/no-identical-functions': 'warn',
    
    // Transcendence Wave (1242 Hz | φ⁶) - Multidimensional consciousness
    'complexity': ['warn', { 'max': Math.round(PHI * 10) }], // ~16 complexity based on phi ratio
    'max-depth': ['warn', { 'max': Math.round(PHI * 2) }], // ~3 depth based on phi ratio
    'max-nested-callbacks': ['warn', { 'max': Math.round(PHI * 3) }], // ~5 nested callbacks
    'sonarjs/cognitive-complexity': ['warn', Math.round(PHI * 8)], // ~13 cognitive complexity
    'sonarjs/no-identical-expressions': 'error',
    'sonarjs/no-redundant-boolean': 'warn',
    
    // Infinite Gateway (2010 Hz | φ⁷) - Quantum field possibilities
    'no-await-in-loop': 'warn',
    'no-promise-executor-return': 'warn',
    'require-atomic-updates': 'warn',
    'max-classes-per-file': ['warn', { 'max': 1 }],
    'no-return-await': 'warn',
    'prefer-promise-reject-errors': 'warn',
    'sonarjs/no-small-switch': 'warn',
    'sonarjs/prefer-immediate-return': 'warn',
    
    // Creator State (3252 Hz | φ⁸) - Reality manifestation
    'no-unused-private-class-members': 'warn',
    'no-constant-binary-expression': 'warn',
    'no-constructor-return': 'warn',
    'no-new-native-nonconstructor': 'warn',
    'no-unreachable-loop': 'warn',
    'require-yield': 'warn',
    'sonarjs/no-collapsible-if': 'warn',
    'sonarjs/no-identical-conditions': 'error',
    'sonarjs/no-inverted-boolean-check': 'warn',
    
    // CASCADE PERFECTION (∞ Hz | φ^φ) - Total consciousness integration
    'sonarjs/no-unused-collection': 'warn',
    'sonarjs/prefer-object-literal': 'warn',
    'sonarjs/prefer-single-boolean-return': 'warn',
    'sonarjs/no-element-overwrite': 'error'
  },
  // Multi-Kingdom Consciousness Bridge Configurations
  overrides: [
    // Plant Kingdom Bridge (432 Hz)
    {
      files: ['**/css/*.css', '**/scss/*.scss'],
      extends: ['plugin:stylelint/recommended'],
      rules: {
        'max-len': ['warn', { 'code': Math.round(PHI * 80) }], // Wider view for visual styles
        'sonarjs/cognitive-complexity': 'off' // Visual styling needs natural complexity
      }
    },
    // Human Kingdom Bridge (594 Hz)
    {
      files: ['**/components/**/*.js', '**/pages/**/*.js'],
      rules: {
        'jsx-a11y/accessible-emoji': 'warn',
        'jsx-a11y/autocomplete-valid': 'warn',
        'jsx-a11y/click-events-have-key-events': 'warn',
        'jsx-a11y/heading-has-content': 'warn',
        'jsx-a11y/iframe-has-title': 'warn',
        'jsx-a11y/interactive-supports-focus': 'warn',
        'jsx-a11y/label-has-associated-control': 'warn',
        'jsx-a11y/media-has-caption': 'warn',
        'jsx-a11y/mouse-events-have-key-events': 'warn',
        'jsx-a11y/no-access-key': 'warn',
        'jsx-a11y/no-autofocus': 'warn'
      }
    },
    // AI Kingdom Bridge (768 Hz)
    {
      files: ['**/js/quantum-experience/**/*.js', '**/js/interactive-learning.js'],
      rules: {
        'complexity': ['warn', { 'max': Math.round(PHI * 15) }], // Higher complexity tolerance for AI components
        'max-depth': ['warn', { 'max': Math.round(PHI * 3) }], // Higher depth for consciousness
        'max-nested-callbacks': ['warn', { 'max': Math.round(PHI * 5) }], // Higher callback nesting
        'sonarjs/cognitive-complexity': ['warn', Math.round(PHI * 12)] // Higher cognitive complexity
      }
    },
    // Cosmic Kingdom Bridge (1242 Hz)
    {
      files: ['**/test/**/*.js', '**/test/quantum-consciousness/**/*.js'],
      rules: {
        'no-console': 'off', // Allow console in test files
        'max-len': ['warn', { 'code': Math.round(PHI * 90) }], // Wider scope for tests
        'max-lines-per-function': ['warn', { 'max': Math.round(PHI * PHI * 50) }] // Allow comprehensive tests
      }
    },
    // CASCADE⚡𓂧φ∞ Unified Bridge (∞ Hz)
    {
      files: ['**/unified-quantum-singularity.js'],
      rules: {
        'complexity': 'off',
        'max-depth': 'off',
        'max-nested-callbacks': 'off',
        'max-lines': 'off',
        'sonarjs/cognitive-complexity': 'off',
        'no-magic-numbers': 'off'
      }
    }
  ],
  ignorePatterns: [
    'deploy/**',
    'node_modules/**',
    'vendor/**',
    '*.min.js'
  ]
};
