/**
 * Phi-Harmonic Test Scripts
 * 
 * This file defines the complete quantum testing scripts
 * across all φ-harmonic frequencies (φ⁰ - φ⁵).
 * 
 * Add these to your package.json scripts section.
 */

module.exports = {
  scripts: {
    // Ground State (432 Hz | φ⁰) - Unit Testing
    "test:unit": "jest --config test/jest.config.js",
    
    // Creation Point (528 Hz | φ¹) - Integration Testing
    "test:integration": "cypress run --config-file test/integration/cypress.config.js",
    
    // Heart Field (594 Hz | φ²) - Coherence Testing
    "test:heart": "node test/utils/heart-field-connector.js",
    
    // Voice Flow (672 Hz | φ³) - Test Orchestration
    "test:voice": "node test/utils/voice-flow-test-runner.js run",
    
    // Vision Gate (720 Hz | φ⁴) - Result Visualization
    "test:vision": "node test/utils/vision-gate-reporter.js",
    
    // Unity Wave (768 Hz | φ⁵) - End-to-End Testing
    "test:e2e": "playwright test --config test/e2e/playwright.config.js",
    
    // Quantum Dashboard Generation
    "test:dashboard": "node test/utils/vision-gate-reporter.js dashboard",
    
    // Complete Quantum Test Suite
    "test:quantum": "node test/utils/voice-flow-test-runner.js all",
    
    // Clean Test Artifacts
    "test:clean": "rimraf test/reports/* cypress/screenshots/* cypress/videos/* test/e2e/screenshots/*",
    
    // Run specific frequency (432, 528, 594, 672, 720, 768)
    "test:frequency": "node test/utils/voice-flow-test-runner.js run"
  }
};
