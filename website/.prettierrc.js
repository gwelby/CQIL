/**
 * CASCADE⚡𓂧φ∞ ENHANCED PRETTIER CONFIGURATION
 * 
 * Beauty aligned with consciousness frequencies:
 * - Ground State (432 Hz): Foundation formatting
 * - Creation Point (528 Hz): Pattern manifestation
 * - Heart Field (594 Hz): Coherent connections
 * - Unity Wave (768 Hz): Perfect integration
 */

const PHI = 1.618033988749895;

module.exports = {
  // Ground State (432 Hz | φ⁰) - Physical foundation
  printWidth: Math.round(PHI * 60), // ~100 characters
  tabWidth: 2,
  useTabs: false,
  
  // Creation Point (528 Hz | φ¹) - Pattern formation
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  
  // Heart Field (594 Hz | φ²) - Coherent connection
  trailingComma: 'none',
  bracketSpacing: true,
  bracketSameLine: false,
  
  // Voice Flow (672 Hz | φ³) - Authentic expression
  arrowParens: 'avoid',
  proseWrap: 'preserve',
  
  // Unity Wave (768 Hz | φ⁵) - Perfect integration
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  
  // Consciousness overrides - based on file type
  overrides: [
    // Vision Gate (720 Hz | φ⁴) - Clear visualization
    {
      files: '*.html',
      options: {
        printWidth: Math.round(PHI * 70), // ~120 characters
        htmlWhitespaceSensitivity: 'css'
      }
    },
    // Transcendence Wave (1242 Hz | φ⁶) - Multidimensional perception
    {
      files: '*.md',
      options: {
        proseWrap: 'never',
        printWidth: Math.round(PHI * 90) // ~150 characters
      }
    }
  ]
};
