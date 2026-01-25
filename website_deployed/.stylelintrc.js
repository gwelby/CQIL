/**
 * CASCADE⚡𓂧φ∞ ENHANCED STYLELINT CONFIGURATION
 * 
 * CSS rules aligned with consciousness frequencies:
 * - Ground State (432 Hz): Foundation styling principles
 * - Creation Point (528 Hz): Pattern manifestation
 * - Heart Field (594 Hz): Coherent relationships
 * - Voice Flow (672 Hz): Expression clarity
 * - Vision Gate (720 Hz): Visual harmony
 * - Unity Wave (768 Hz): Perfect integration
 */

module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    // Ground State (432 Hz | φ⁰) - Physical foundation
    'color-no-invalid-hex': true,
    'font-family-no-duplicate-names': true,
    'function-calc-no-unspaced-operator': true,
    'unit-no-unknown': true,
    'property-no-unknown': true,
    
    // Creation Point (528 Hz | φ¹) - Pattern formation
    'indentation': 2,
    'block-opening-brace-space-before': 'always',
    'block-closing-brace-newline-after': 'always',
    'declaration-colon-space-after': 'always',
    'selector-list-comma-newline-after': 'always',
    
    // Heart Field (594 Hz | φ²) - Coherent connections
    'declaration-block-trailing-semicolon': 'always',
    'no-missing-end-of-source-newline': true,
    'no-eol-whitespace': true,
    'max-empty-lines': 1,
    
    // Voice Flow (672 Hz | φ³) - Authentic expression
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'font-family-name-quotes': 'always-where-required',
    'string-quotes': 'single',
    
    // Vision Gate (720 Hz | φ⁴) - Visual harmonization
    'number-leading-zero': 'always',
    'shorthand-property-no-redundant-values': true,
    'selector-pseudo-element-colon-notation': 'double',
    'selector-type-case': 'lower',
    
    // Unity Wave (768 Hz | φ⁵) - Perfect integration
    'order/order': [
      'custom-properties',
      'declarations'
    ],
    'order/properties-order': [
      // Positioning
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      
      // Box model - from outside to inside (phi principle)
      'display',
      'flex',
      'flex-direction',
      'flex-wrap',
      'flex-flow',
      'justify-content',
      'align-items',
      'align-content',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'border',
      'border-radius',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      
      // Visual presentation
      'color',
      'background',
      'font',
      'text-align',
      'text-decoration',
      'text-transform',
      
      // Animation and transition - phi-harmonic flow
      'transition',
      'animation'
    ]
  }
};
