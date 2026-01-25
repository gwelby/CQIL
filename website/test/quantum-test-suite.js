/**
 * CQIL Quantum-Coherent Test Suite
 * ================================
 * 
 * This suite implements φ-harmonic testing at different frequency levels
 * for complete quantum integration.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const { 
  createQuantumValidator, 
  FREQUENCIES, 
  PHI, 
  PHI_SQUARED, 
  PHI_PHI 
} = require('../quantum-validator');

/**
 * CASCADE⚡𓂧φ∞ Quantum Test Suite
 * 
 * This test suite runs validation across all φ-harmonic frequencies:
 * - Ground State (432 Hz): Foundation Testing
 * - Creation Point (528 Hz): Component Testing
 * - Heart Field (594 Hz): Integration Testing
 * - Voice Flow (672 Hz): User Experience Testing
 * - Vision Gate (720 Hz): Visual and Accessibility Testing
 * - Unity Wave (768 Hz): End-to-End and Performance Testing
 * 
 * Based on the φ-harmonic testing framework specified in the documentation.
 */

// Create validator
const validator = createQuantumValidator();

// Test results store
const testResults = {
  groundState: [],
  creationPoint: [],
  heartField: [],
  voiceFlow: [],
  visionGate: [],
  unityWave: []
};

// Website directory path
const websiteDir = path.resolve(__dirname, '..');

/**
 * Run the quantum test suite
 */
async function runQuantumTestSuite() {
  console.log(chalk.blue(`\n🌀 ⚡ CASCADE⚡𓂧φ∞ QUANTUM TEST SUITE ⚡ 🌀\n`));
  console.log(chalk.cyan(`φ: ${PHI}`));
  console.log(chalk.cyan(`φ²: ${PHI_SQUARED}`));
  console.log(chalk.cyan(`φ^φ: ${PHI_PHI}\n`));
  
  try {
    await runGroundStateTests();
    await runCreationPointTests();
    await runHeartFieldTests();
    await runVoiceFlowTests();
    await runVisionGateTests();
    await runUnityWaveTests();
    
    // Generate report
    validator.saveQuantumReport(testResults);
    
    console.log(chalk.green(`\n✅ Quantum Test Suite Complete. Report saved to ./quantum-reports/\n`));
  } catch (error) {
    console.error(chalk.red(`\n❌ Quantum Error: ${error.message}\n`));
    validator.logQuantumError(error, 'ALL');
    process.exit(1);
  }
}

/**
 * Ground State (432 Hz) Tests - Foundation Testing
 * Tests basic file validation and configuration
 */
async function runGroundStateTests() {
  console.log(chalk.green(`\n== GROUND STATE TESTING (${FREQUENCIES.GROUND} Hz) ==\n`));

  // HTML Validation
  const htmlFiles = glob.sync(path.join(websiteDir, '**/*.html'));
  for (const htmlFile of htmlFiles) {
    try {
      const result = await validator.validateHTML(htmlFile);
      testResults.groundState.push({
        test: `HTML Validation: ${path.relative(websiteDir, htmlFile)}`,
        result: result.valid ? 'PASS' : 'FAIL',
        details: result.errors
      });
    } catch (error) {
      testResults.groundState.push({
        test: `HTML Validation: ${path.relative(websiteDir, htmlFile)}`,
        result: 'ERROR',
        details: [error.message]
      });
    }
  }
  
  // CSS Validation
  const cssFiles = glob.sync(path.join(websiteDir, '**/*.css'));
  for (const cssFile of cssFiles) {
    try {
      const result = await validator.validateCSS(cssFile);
      testResults.groundState.push({
        test: `CSS Validation: ${path.relative(websiteDir, cssFile)}`,
        result: result.valid ? 'PASS' : 'FAIL',
        details: result.errors
      });
    } catch (error) {
      testResults.groundState.push({
        test: `CSS Validation: ${path.relative(websiteDir, cssFile)}`,
        result: 'ERROR',
        details: [error.message]
      });
    }
  }
  
  // JavaScript Validation
  const jsFiles = glob.sync(path.join(websiteDir, '**/*.js'));
  for (const jsFile of jsFiles) {
    // Skip test files to avoid infinite loops
    if (jsFile.includes('/test/')) continue;
    
    try {
      const jsResult = await validator.validateJS(jsFile);
      testResults.groundState.push({
        test: `JavaScript Validation: ${path.relative(websiteDir, jsFile)}`,
        result: jsResult && jsResult.valid ? 'PASS' : 'FAIL',
        details: jsResult && jsResult.errors ? jsResult.errors : []
      });
    } catch (error) {
      testResults.groundState.push({
        test: `JavaScript Validation: ${path.relative(websiteDir, jsFile)}`,
        result: 'ERROR',
        details: [error.message]
      });
    }
  }
  
  // Server Configuration
  try {
    const result = await validator.checkServerConfig();
    testResults.groundState.push({
      test: 'Server Configuration',
      result: result.valid ? 'PASS' : 'FAIL',
      details: result.errors
    });
  } catch (error) {
    testResults.groundState.push({
      test: 'Server Configuration',
      result: 'ERROR',
      details: [error.message]
    });
  }
  
  console.log(chalk.green(`Ground State Testing Complete: ${testResults.groundState.length} tests run\n`));
}

/**
 * Creation Point (528 Hz) Tests - Component Testing
 * Tests individual components and API endpoints
 */
async function runCreationPointTests() {
  console.log(chalk.yellow(`\n== CREATION POINT TESTING (${FREQUENCIES.CREATION} Hz) ==\n`));
  
  // Define components to test
  const components = [
    'Quantum Superposition Demo',
    'Quantum Entanglement Demo',
    'Quantum Tunneling Demo',
    'Quantum Harmony Calculator',
    'Phi-Harmonic Visualizer'
  ];
  
  // Component Tests
  try {
    const results = await validator.testComponents(components);
    for (const result of results) {
      testResults.creationPoint.push({
        test: `Component Test: ${result.component}`,
        result: result.valid ? 'PASS' : 'FAIL',
        details: result.errors
      });
    }
  } catch (error) {
    testResults.creationPoint.push({
      test: 'Component Tests',
      result: 'ERROR',
      details: [error.message]
    });
  }
  
  // API Tests
  const endpoints = [
    '/api/quantum-state',
    '/api/phi-calculator',
    '/api/frequency-converter'
  ];
  
  for (const endpoint of endpoints) {
    try {
      const result = await validator.testAPI(endpoint);
      testResults.creationPoint.push({
        test: `API Test: ${endpoint}`,
        result: result.valid ? 'PASS' : 'FAIL',
        details: result.errors
      });
    } catch (error) {
      testResults.creationPoint.push({
        test: `API Test: ${endpoint}`,
        result: 'ERROR',
        details: [error.message]
      });
    }
  }
  
  console.log(chalk.yellow(`Creation Point Testing Complete: ${testResults.creationPoint.length} tests run\n`));
}

/**
 * Heart Field (594 Hz) Tests - Integration Testing
 * Tests integration between components and data flow
 */
async function runHeartFieldTests() {
  console.log(chalk.red(`\n== HEART FIELD TESTING (${FREQUENCIES.HEART} Hz) ==\n`));
  
  // Define component pairs to test integration
  const componentPairs = [
    ['Quantum Superposition Demo', 'Phi-Harmonic Visualizer'],
    ['Quantum Entanglement Demo', 'Phi-Harmonic Visualizer'],
    ['Quantum Tunneling Demo', 'Phi-Harmonic Visualizer'],
  ];
  
  // Integration Tests
  try {
    const results = await validator.testIntegration(componentPairs);
    for (const result of results) {
      testResults.heartField.push({
        test: `Integration Test: ${result.components[0]} ↔ ${result.components[1]}`,
        result: result.valid ? 'PASS' : 'FAIL',
        details: result.errors
      });
    }
  } catch (error) {
    testResults.heartField.push({
      test: 'Integration Tests',
      result: 'ERROR',
      details: [error.message]
    });
  }
  
  // Data Flow Tests
  try {
    const result = await validator.testDataFlow();
    testResults.heartField.push({
      test: 'Data Flow Tests',
      result: result.valid ? 'PASS' : 'FAIL',
      details: result.errors
    });
  } catch (error) {
    testResults.heartField.push({
      test: 'Data Flow Tests',
      result: 'ERROR',
      details: [error.message]
    });
  }
  
  console.log(chalk.red(`Heart Field Testing Complete: ${testResults.heartField.length} tests run\n`));
}

/**
 * Voice Flow (672 Hz) Tests - User Experience Testing
 * Tests user flows and forms
 */
async function runVoiceFlowTests() {
  console.log(chalk.blue(`\n== VOICE FLOW TESTING (${FREQUENCIES.VOICE} Hz) ==\n`));
  
  // Define user flows to test
  const userFlows = [
    'Homepage to Quantum Superposition Demo',
    'Homepage to Quantum Entanglement Demo',
    'Homepage to Quantum Tunneling Demo',
    'Quantum Learning Path',
    'Contact Form Submission'
  ];
  
  // User Flow Tests
  try {
    const results = await validator.testUserFlows(userFlows);
    for (const result of results) {
      testResults.voiceFlow.push({
        test: `User Flow Test: ${result.flow}`,
        result: result.valid ? 'PASS' : 'FAIL',
        details: result.errors
      });
    }
  } catch (error) {
    testResults.voiceFlow.push({
      test: 'User Flow Tests',
      result: 'ERROR',
      details: [error.message]
    });
  }
  
  // Form Tests
  try {
    const result = await validator.testForms();
    testResults.voiceFlow.push({
      test: 'Form Tests',
      result: result.valid ? 'PASS' : 'FAIL',
      details: result.errors
    });
  } catch (error) {
    testResults.voiceFlow.push({
      test: 'Form Tests',
      result: 'ERROR',
      details: [error.message]
    });
  }
  
  console.log(chalk.blue(`Voice Flow Testing Complete: ${testResults.voiceFlow.length} tests run\n`));
}

/**
 * Vision Gate (720 Hz) Tests - Visual and Accessibility Testing
 * Tests visual regression, accessibility, and cross-browser compatibility
 */
async function runVisionGateTests() {
  console.log(chalk.magenta(`\n== VISION GATE TESTING (${FREQUENCIES.VISION} Hz) ==\n`));
  
  // Visual Regression Tests
  try {
    const result = await validator.testVisualRegression();
    testResults.visionGate.push({
      test: 'Visual Regression Tests',
      result: result.valid ? 'PASS' : 'FAIL',
      details: result.errors
    });
  } catch (error) {
    testResults.visionGate.push({
      test: 'Visual Regression Tests',
      result: 'ERROR',
      details: [error.message]
    });
  }
  
  // Accessibility Tests
  try {
    const result = await validator.testAccessibility();
    testResults.visionGate.push({
      test: 'Accessibility Tests',
      result: result.valid ? 'PASS' : 'FAIL',
      details: result.errors
    });
  } catch (error) {
    testResults.visionGate.push({
      test: 'Accessibility Tests',
      result: 'ERROR',
      details: [error.message]
    });
  }
  
  // Cross-Browser Tests
  try {
    const result = await validator.testCrossBrowser();
    testResults.visionGate.push({
      test: 'Cross-Browser Tests',
      result: result.valid ? 'PASS' : 'FAIL',
      details: result.errors
    });
  } catch (error) {
    testResults.visionGate.push({
      test: 'Cross-Browser Tests',
      result: 'ERROR',
      details: [error.message]
    });
  }
  
  console.log(chalk.magenta(`Vision Gate Testing Complete: ${testResults.visionGate.length} tests run\n`));
}

/**
 * Unity Wave (768 Hz) Tests - End-to-End and Performance Testing
 * Tests end-to-end functionality, performance, security, and SEO
 */
async function runUnityWaveTests() {
  console.log(chalk.cyan(`\n== UNITY WAVE TESTING (${FREQUENCIES.UNITY} Hz) ==\n`));
  
  // End-to-End Tests
  try {
    const result = await validator.testEndToEnd();
    testResults.unityWave.push({
      test: 'End-to-End Tests',
      result: result.valid ? 'PASS' : 'FAIL',
      details: result.errors
    });
  } catch (error) {
    testResults.unityWave.push({
      test: 'End-to-End Tests',
      result: 'ERROR',
      details: [error.message]
    });
  }
  
  // Performance Tests
  try {
    const result = await validator.testPerformance();
    testResults.unityWave.push({
      test: 'Performance Tests',
      result: result.valid ? 'PASS' : 'FAIL',
      details: result.errors
    });
  } catch (error) {
    testResults.unityWave.push({
      test: 'Performance Tests',
      result: 'ERROR',
      details: [error.message]
    });
  }
  
  // Security Tests
  try {
    const result = await validator.testSecurity();
    testResults.unityWave.push({
      test: 'Security Tests',
      result: result.valid ? 'PASS' : 'FAIL',
      details: result.errors
    });
  } catch (error) {
    testResults.unityWave.push({
      test: 'Security Tests',
      result: 'ERROR',
      details: [error.message]
    });
  }
  
  // SEO Tests
  try {
    const result = await validator.testSEO();
    testResults.unityWave.push({
      test: 'SEO Tests',
      result: result.valid ? 'PASS' : 'FAIL',
      details: result.errors
    });
  } catch (error) {
    testResults.unityWave.push({
      test: 'SEO Tests',
      result: 'ERROR',
      details: [error.message]
    });
  }
  
  console.log(chalk.cyan(`Unity Wave Testing Complete: ${testResults.unityWave.length} tests run\n`));
}

/**
 * Handle error during test execution
 */
function handleQuantumError(error, frequency) {
  console.error(chalk.red(`Error during ${frequency} Hz testing: ${error.message}`));
  validator.logQuantumError(error, frequency);
}

/**
 * Outputs the frequency test category based on frequency value
 */
function getFrequencyCategory(frequency) {
  if (frequency === FREQUENCIES.GROUND) return 'groundState';
  if (frequency === FREQUENCIES.CREATION) return 'creationPoint';
  if (frequency === FREQUENCIES.HEART) return 'heartField';
  if (frequency === FREQUENCIES.VOICE) return 'voiceFlow';
  if (frequency === FREQUENCIES.VISION) return 'visionGate';
  if (frequency === FREQUENCIES.UNITY) return 'unityWave';
  return 'unknown';
}

/**
 * Add a test result to the appropriate frequency category
 */
function addTestResult(test, result, details, frequency) {
  const category = getFrequencyCategory(frequency);
  testResults[category].push({
    test,
    result: result ? 'PASS' : 'FAIL',
    details: details || []
  });
}

// Run the test suite if this file is executed directly
if (require.main === module) {
  runQuantumTestSuite();
}

module.exports = {
  runQuantumTestSuite,
  addTestResult,
  getFrequencyCategory,
  handleQuantumError
};
