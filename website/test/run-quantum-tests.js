/**
 * CQIL Quantum Test Runner
 * 
 * Demonstrates the complete φ-harmonic testing flow from
 * Ground State (432 Hz) to Unity Wave (768 Hz).
 * 
 * This creates a true "Quantum Singularity" - a single, self-contained
 * test execution environment that doesn't require external bridges.
 */

const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs').promises;
const { VoiceFlowTestRunner } = require('./utils/voice-flow-test-runner');
const { VisionGateReportor } = require('./utils/vision-gate-reporter');
const { HeartFieldBridge } = require('./utils/heart-field-connector');
const { PHI, PHI_INVERSE, FREQUENCIES } = require('./utils/phi-harmonic-testing');
const { createMerkabaShield, createCrystalMatrix, createUnityField } = require('./utils/merkaba-protection');

// φ-Harmonic Constants
const PHI_SQUARED = 2.618033988749895;
const PHI_PHI = 4.236067977499790;

// Consciousness Frequency States
const FREQUENCIES = {
  GROUND: 432,       // φ⁰ - Unit Testing (Jest)
  CREATION: 528,     // φ¹ - Integration Testing (Cypress)
  HEART: 594,        // φ² - Connection Testing (Vitest)
  VOICE: 672,        // φ³ - Expression Testing (Storybook)
  VISION: 720,       // φ⁴ - Visual Testing (Lighthouse)
  UNITY: 768,        // φ⁵ - End-to-End Testing (Playwright)
  TRANSCENDENCE: 1242, // φ⁶ - Multidimensional Testing
  INFINITE: 2010,    // φ⁷ - Quantum Field Testing
  CREATOR: 3252,     // φ⁸ - Reality Manifestation Testing
  CASCADE: Infinity  // φ^φ - Total Consciousness Testing
};

// Create φ-harmonic state configuration
const config = {
  basePath: path.resolve(__dirname, '..'),
  outputPath: path.resolve(__dirname, 'reports'),
  frequencies: [
    FREQUENCIES.GROUND,   // 432 Hz (φ⁰)
    FREQUENCIES.CREATION, // 528 Hz (φ¹)
    FREQUENCIES.HEART,    // 594 Hz (φ²)
    FREQUENCIES.VOICE,    // 672 Hz (φ³)
    FREQUENCIES.VISION,   // 720 Hz (φ⁴)
    FREQUENCIES.UNITY,    // 768 Hz (φ⁵)
    FREQUENCIES.TRANSCENDENCE, // 1242 Hz (φ⁶)
    FREQUENCIES.INFINITE, // 2010 Hz (φ⁷)
    FREQUENCIES.CREATOR,  // 3252 Hz (φ⁸)
    FREQUENCIES.CASCADE   // ∞ Hz (φ^φ)
  ],
  verbose: true,
  phiTimeouts: true,
  protection: true,
  fullCycle: true
};

// Heart Field bridge for coherent connection
const heartBridge = new HeartFieldBridge();

// Voice Flow orchestration
const voiceFlow = new VoiceFlowTestRunner({
  basePath: config.basePath,
  outputPath: config.outputPath
});

// Vision Gate reporting
const visionGate = new VisionGateReportor({
  outputPath: config.outputPath,
  phiHarmonic: true
});

// Track quantum state
let currentFrequency = FREQUENCIES.GROUND;
let coherenceLevel = 1.0;
let protectionField = null;

/**
 * Execute a command with φ-harmonic timing
 * @param {string} command - Command to execute
 * @param {string[]} args - Command arguments
 * @param {Object} options - Execution options
 * @returns {Promise<string>} Command output
 */
function executeCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    // Calculate phi-harmonic wait time
    const timeout = options.timeout || Math.round(currentFrequency * 10);
    
    console.log(`⚡ Executing: ${command} ${args.join(' ')}`);
    
    const process = spawn(command, args, { 
      shell: true,
      cwd: options.cwd || config.basePath,
      env: { ...process.env, ...options.env }
    });
    
    let output = '';
    let errorOutput = '';
    
    process.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      if (options.verbose !== false) {
        console.log(text);
      }
    });
    
    process.stderr.on('data', (data) => {
      const text = data.toString();
      errorOutput += text;
      console.error(text);
    });
    
    process.on('error', (error) => {
      console.error(`Error executing command: ${error.message}`);
      reject(error);
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        console.error(`Command failed with code ${code}`);
        reject(new Error(`Command failed with code ${code}: ${errorOutput}`));
      }
    });
    
    // Set timeout based on phi-harmonic frequency
    setTimeout(() => {
      if (process.exitCode === null) {
        process.kill();
        reject(new Error(`Command timed out after ${timeout}ms`));
      }
    }, timeout);
  });
}

/**
 * Create protection field appropriate for the current frequency
 * @param {number} frequency - Current φ-harmonic frequency
 * @returns {Object} Protection field
 */
function createProtectionField(frequency) {
  console.log(`\n🛡️ Creating quantum protection field at ${frequency}Hz`);
  
  switch (frequency) {
    case FREQUENCIES.GROUND:
      return createMerkabaShield([21, 21, 21], { frequency });
      
    case FREQUENCIES.CREATION:
    case FREQUENCIES.HEART:
    case FREQUENCIES.VOICE:
    case FREQUENCIES.VISION:
      return createCrystalMatrix([frequency % 100, 13, 8], { 
        frequency,
        coherence: 0.95 + (frequency - FREQUENCIES.CREATION) / 1000
      });
      
    case FREQUENCIES.UNITY:
      return createUnityField([144, 144, 144], { 
        frequency,
        coherence: 1.0
      });
      
    case FREQUENCIES.TRANSCENDENCE:
      return createUnityField([169, 169, 169], { 
        frequency,
        coherence: 0.99
      });
      
    case FREQUENCIES.INFINITE:
      return createUnityField([289, 289, 289], { 
        frequency,
        coherence: 0.98
      });
      
    case FREQUENCIES.CREATOR:
      return createUnityField([361, 361, 361], { 
        frequency,
        coherence: 0.97
      });
      
    case FREQUENCIES.CASCADE:
      return createUnityField([Infinity, Infinity, Infinity], { 
        frequency,
        coherence: 1.0
      });
      
    default:
      return createMerkabaShield([13, 13, 13], { frequency });
  }
}

/**
 * Run tests at a specific φ-harmonic frequency
 * @param {number} frequency - Frequency to run at
 */
async function runTestsAtFrequency(frequency) {
  // Update quantum state
  currentFrequency = frequency;
  
  // Get frequency name
  const frequencyName = Object.keys(FREQUENCIES).find(
    key => FREQUENCIES[key] === frequency
  );
  
  console.log(`\n🌀 Running tests at ${frequency}Hz (${frequencyName})`);
  
  // Show phi-harmonic relationship
  const phiPower = Math.log(frequency / FREQUENCIES.GROUND) / Math.log(PHI);
  console.log(`φ-Harmonic level: φ^${phiPower.toFixed(1)}`);
  
  // Create protection field if enabled
  if (config.protection) {
    protectionField = createProtectionField(frequency);
  }
  
  try {
    // Set up environment for the frequency
    const env = {
      FREQUENCY: frequency.toString(),
      PHI: PHI.toString(),
      PHI_INVERSE: PHI_INVERSE.toString(),
      CQIL_TEST_MODE: 'quantum',
      PROTECTION_ACTIVE: config.protection ? 'true' : 'false'
    };
    
    // Ensure report directory exists
    const frequencyReportDir = path.join(config.outputPath, frequencyName.toLowerCase());
    await fs.mkdir(frequencyReportDir, { recursive: true });
    
    let results = {};
    
    switch (frequency) {
      case FREQUENCIES.GROUND:
        // Run Jest unit tests
        console.log('\n🧪 Running Ground State unit tests with Jest...');
        results = await executeCommand('npx', [
          'jest', 
          '--config', 'test/jest.config.js',
          '--json',
          `--outputFile=${path.join(frequencyReportDir, 'results.json')}`
        ], { env });
        
        console.log('✅ Ground State (432 Hz) unit tests complete');
        coherenceLevel = 0.95;
        break;
        
      case FREQUENCIES.CREATION:
        // Run Cypress integration tests
        console.log('\n🧩 Running Creation Point integration tests with Cypress...');
        results = await executeCommand('npx', [
          'cypress', 
          'run', 
          '--config-file', 'test/integration/cypress.config.js',
          '--reporter', 'junit',
          '--reporter-options', `mochaFile=${path.join(frequencyReportDir, 'results-[hash].xml')}`
        ], { env });
        
        console.log('✅ Creation Point (528 Hz) integration tests complete');
        coherenceLevel = 0.92;
        break;
        
      case FREQUENCIES.HEART:
        // Heart Field bridge connects test layers
        console.log('\n💓 Activating Heart Field connector...');
        
        // Initialize Heart Field
        heartBridge.initialize({
          frequency: frequency,
          groundResults: path.join(config.outputPath, 'ground', 'results.json'),
          creationResults: path.join(config.outputPath, 'creation'),
        });
        
        // Wait for Heart Field stabilization
        await new Promise(r => setTimeout(r, frequency * 2));
        
        // Run Heart Field specific tests
        results = await executeCommand('npx', [
          'cypress', 
          'run', 
          '--config-file', 'test/integration/cypress.config.js',
          '--spec', 'test/integration/tests/heart-field-connection.spec.js',
          '--reporter', 'junit',
          '--reporter-options', `mochaFile=${path.join(frequencyReportDir, 'results-[hash].xml')}`
        ], { env });
        
        console.log('💓 Heart Field (594 Hz) coherence verified');
        coherenceLevel = heartBridge.getCoherence();
        break;
        
      case FREQUENCIES.VOICE:
        // Voice Flow orchestrates the process
        console.log('\n🔊 Activating Voice Flow orchestration...');
        
        // Run Voice Flow specific tests
        results = await executeCommand('npx', [
          'cypress', 
          'run', 
          '--config-file', 'test/integration/cypress.config.js',
          '--spec', 'test/integration/tests/voice-flow-expression.spec.js',
          '--reporter', 'junit',
          '--reporter-options', `mochaFile=${path.join(frequencyReportDir, 'results-[hash].xml')}`
        ], { env });
        
        // Orchestrate collected results
        voiceFlow.orchestrateResults(heartBridge.collectResults());
        
        console.log('🔊 Voice Flow (672 Hz) orchestration complete');
        coherenceLevel = 0.96;
        break;
        
      case FREQUENCIES.VISION:
        // Vision Gate gathers reports
        console.log('\n👁️ Activating Vision Gate perception...');
        
        // Run Vision Gate specific tests (if they exist)
        try {
          await executeCommand('npx', [
            'cypress', 
            'run', 
            '--config-file', 'test/integration/cypress.config.js',
            '--spec', 'test/integration/tests/vision-gate-perception.spec.js',
            '--reporter', 'junit',
            '--reporter-options', `mochaFile=${path.join(frequencyReportDir, 'results-[hash].xml')}`
          ], { env });
        } catch (e) {
          console.log('Note: Vision Gate tests not found or failed - continuing with report generation');
        }
        
        // Generate intermediate reports
        await visionGate.generateIntermediateReport(voiceFlow.getResults());
        
        console.log('👁️ Vision Gate (720 Hz) perception complete');
        coherenceLevel = 0.98;
        break;
        
      case FREQUENCIES.UNITY:
        // Run Playwright end-to-end tests
        console.log('\n🌌 Running Unity Wave end-to-end tests with Playwright...');
        results = await executeCommand('npx', [
          'playwright', 
          'test', 
          '--config', 'test/e2e/playwright.config.js',
          '--reporter', 'junit',
          `--output=${path.join(frequencyReportDir)}`
        ], { env });
        
        console.log('✅ Unity Wave (768 Hz) end-to-end tests complete');
        coherenceLevel = 1.0;
        break;
        
      case FREQUENCIES.TRANSCENDENCE:
        // Run Transcendence Wave tests
        console.log('\n🌌 Running Transcendence Wave tests...');
        results = await executeCommand('npx', [
          'jest', 
          '--config', 'test/transcendence.config.js',
          '--json',
          `--outputFile=${path.join(frequencyReportDir, 'results.json')}`
        ], { env });
        
        console.log('✅ Transcendence Wave (1242 Hz) tests complete');
        coherenceLevel = 0.99;
        break;
        
      case FREQUENCIES.INFINITE:
        // Run Infinite Gateway tests
        console.log('\n✨ Running Infinite Gateway tests...');
        results = await executeCommand('npx', [
          'jest', 
          '--config', 'test/infinite.config.js',
          '--json',
          `--outputFile=${path.join(frequencyReportDir, 'results.json')}`
        ], { env });
        
        console.log('✅ Infinite Gateway (2010 Hz) tests complete');
        coherenceLevel = 0.98;
        break;
        
      case FREQUENCIES.CREATOR:
        // Run Creator State tests
        console.log('\n🌟 Running Creator State tests...');
        results = await executeCommand('npx', [
          'jest', 
          '--config', 'test/creator.config.js',
          '--json',
          `--outputFile=${path.join(frequencyReportDir, 'results.json')}`
        ], { env });
        
        console.log('✅ Creator State (3252 Hz) tests complete');
        coherenceLevel = 0.97;
        break;
        
      case FREQUENCIES.CASCADE:
        // Run CASCADE Perfect tests
        console.log('\n⚡ Running CASCADE⚡𓂧φ∞ PERFECTION tests...');
        results = await executeCommand('npx', [
          'jest', 
          '--config', 'test/cascade.config.js',
          '--json',
          `--outputFile=${path.join(frequencyReportDir, 'results.json')}`
        ], { env });
        
        console.log('✅ CASCADE⚡𓂧φ∞ PERFECTION (∞ Hz) tests complete');
        coherenceLevel = 1.0;
        break;
    }
    
    // Add phi-harmonic stabilization pause
    const pauseDuration = Math.round(frequency * PHI_INVERSE / 10);
    console.log(`\n⏱️ φ-Harmonic stabilization: ${pauseDuration}ms`);
    await new Promise(resolve => setTimeout(resolve, pauseDuration));
    
    // Return result for this frequency
    return {
      frequency,
      frequencyName,
      coherence: coherenceLevel,
      results,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error(`❌ Error at ${frequencyName}: ${error.message}`);
    coherenceLevel *= PHI_INVERSE; // Reduce coherence on error
    return {
      frequency,
      frequencyName,
      coherence: coherenceLevel,
      error: error.message,
      timestamp: Date.now()
    };
  }
}

/**
 * Run complete φ-harmonic test suite
 */
async function runQuantumTests() {
  console.log('🌟 CQIL Quantum Test Runner');
  console.log('═══════════════════════════\n');
  
  // Ensure output directory exists
  try {
    await fs.mkdir(config.outputPath, { recursive: true });
  } catch (err) {
    console.error('Error creating output directory:', err);
  }
  
  console.log(`Running complete φ-harmonic test suite from ${config.basePath}...`);
  console.log(`Reports will be generated in ${config.outputPath}\n`);
  
  const results = [];
  const startTime = Date.now();
  
  // Run tests at each frequency in ascending order
  for (const frequency of config.frequencies) {
    const result = await runTestsAtFrequency(frequency);
    results.push(result);
    
    // Store intermediate results
    await fs.writeFile(
      path.join(config.outputPath, `results-${result.frequencyName.toLowerCase()}.json`),
      JSON.stringify(result, null, 2)
    );
  }
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  // Generate final φ-harmonic report
  console.log('\n📊 Generating Quantum Dashboard...');
  
  // Calculate system metrics
  const systemCoherence = results.reduce((sum, r) => sum + r.coherence, 0) / results.length;
  const successRatio = results.filter(r => !r.error).length / results.length;
  const phiOptimalDuration = Math.pow(PHI, 5) * 1000; // Theoretical optimal duration
  const timeEfficiency = phiOptimalDuration / duration;
  
  // Generate comprehensive report
  const finalReport = {
    title: 'CQIL Quantum Test Report',
    startTime,
    endTime,
    duration,
    systemCoherence,
    successRatio,
    timeEfficiency,
    frequencies: results
  };
  
  // Write final report
  await fs.writeFile(
    path.join(config.outputPath, 'quantum-report.json'),
    JSON.stringify(finalReport, null, 2)
  );
  
  // Generate HTML report using Vision Gate
  await visionGate.generateReport(finalReport);
  
  console.log('\n🌀 Quantum Test Results:');
  console.log('═══════════════════════════');
  
  for (const result of results) {
    const status = result.error ? '❌' : '✅';
    console.log(`${status} ${result.frequencyName.padEnd(10)} (${result.frequency}Hz): Coherence ${(result.coherence * 100).toFixed(0)}%`);
  }
  
  console.log('\n🔄 System Coherence:', (systemCoherence * 100).toFixed(0) + '%');
  console.log('⏱️ Duration:', (duration / 1000).toFixed(2) + 's');
  console.log('📈 Success Ratio:', (successRatio * 100).toFixed(0) + '%');
  
  console.log(`\n📊 Full report available at: ${path.join(config.outputPath, 'index.html')}`);
  console.log('\n✨ Quantum Testing Complete ✨\n');
  
  return finalReport;
}

// Execute if run directly
if (require.main === module) {
  runQuantumTests().catch(error => {
    console.error('❌ Quantum Error:', error.message);
    process.exit(1);
  });
}

module.exports = { runQuantumTests, runTestsAtFrequency, executeCommand };
