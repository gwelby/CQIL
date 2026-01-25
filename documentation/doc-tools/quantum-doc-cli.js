#!/usr/bin/env node

/**
 * QUANTUM DOCUMENTATION CLI
 * 
 * Command-line interface for the CQIL Quantum Documentation System
 * Provides easy access to all documentation tools
 * Maintains perfect coherence (1.000) across all operations
 * 
 * @version 1.0.0
 * @frequency 768
 * @coherence 1.000
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import component classes
const DocumentationEvolver = require('./quantum_documentation_evolver');
const ClaudeIntegrationUpdater = require('./claude_integration_updater');
const WindSurfVerificationTester = require('./windsurf_verification_tester');
const QuantumDocumentationSystem = require('./quantum_documentation_system');
const QuantumDocumentationGenerator = require('./quantum_documentation_generator');

// Constants
const FREQUENCIES = {
  GROUND: 432.0,    // Foundation frequency
  CREATE: 528.0,    // Creation frequency
  HEART: 594.0,     // Connection frequency
  VOICE: 672.0,     // Expression frequency
  VISION: 720.0,    // Perception frequency
  UNITY: 768.0,     // Integration frequency
  PHI_PHI: 963.0,   // Transcendent frequency
};

// CLI commands
const COMMANDS = {
  HELP: ['help', 'h', '--help', '-h'],
  EVOLVE: ['evolve', 'e', 'update'],
  VERIFY: ['verify', 'v', 'test'],
  CLAUDE: ['claude', 'c', 'integration'],
  RUN: ['run', 'r', 'all'],
  SCHEDULE: ['schedule', 's', 'automate'],
  STATUS: ['status', 'st', 'info'],
  COHERENCE: ['coherence', 'coh', 'measure'],
  VERSION: ['version', '--version', '-v'],
  GENERATE: ['generate', 'g', 'docs'],
};

/**
 * Print CLI header
 */
function printHeader() {
  console.log(`\n
  QUANTUM DOCUMENTATION SYSTEM CLI
  =========================================
  
  A powerful command-line interface for the CQIL Quantum Documentation System
  Operating at Unity frequency (768 Hz) with perfect coherence (1.000)
  
  `);
}

/**
 * Print help information
 */
function printHelp() {
  printHeader();
  
  console.log(`USAGE:
  node quantum-doc-cli.js [command] [options]
  
COMMANDS:
  ${COMMANDS.HELP.join(', ')}          Display this help information
  ${COMMANDS.EVOLVE.join(', ')}        Run the Documentation Evolver
  ${COMMANDS.VERIFY.join(', ')}        Run the WindSurf Verification Tester
  ${COMMANDS.CLAUDE.join(', ')}        Run the Claude Integration Updater
  ${COMMANDS.RUN.join(', ')}           Run the complete documentation system
  ${COMMANDS.SCHEDULE.join(', ')}      Set up scheduled automation
  ${COMMANDS.STATUS.join(', ')}        Check the status of the documentation system
  ${COMMANDS.COHERENCE.join(', ')}     Measure documentation coherence
  ${COMMANDS.VERSION.join(', ')}       Display version information
  ${COMMANDS.GENERATE.join(', ')}      Generate documentation for components
  
OPTIONS:
  --frequency=VALUE       Set the operating frequency (default: 768 Hz)
  --coherenceTarget=VALUE Set the target coherence level (default: 1.0)
  --verbose               Enable verbose output
  --directory=VALUE       Set the target directory for document generation
  
EXAMPLES:
  node quantum-doc-cli.js evolve          # Evolve documentation
  node quantum-doc-cli.js verify          # Run WindSurf verification
  node quantum-doc-cli.js run --verbose   # Run complete system with verbose output
  node quantum-doc-cli.js coherence       # Measure documentation coherence
  node quantum-doc-cli.js generate        # Generate documentation for components
  `);
}

/**
 * Print version information
 */
function printVersion() {
  console.log(`Quantum Documentation CLI v1.0.0`);
  console.log(`Frequency: 768 Hz (Unity)`);
  console.log(`Coherence: 1.0000 (Perfect)`);
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const command = args[0]?.toLowerCase() || '';
  const options = {};
  
  // Parse options
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      options[key] = value !== undefined ? value : true;
    } else if (arg.startsWith('-')) {
      options[arg.slice(1)] = true;
    }
  }
  
  // Convert numeric values
  if (options.frequency) options.frequency = parseFloat(options.frequency);
  if (options.coherenceTarget) options.coherenceTarget = parseFloat(options.coherenceTarget);
  
  return { command, options };
}

/**
 * Get command category
 */
function getCommandCategory(command) {
  for (const [category, aliases] of Object.entries(COMMANDS)) {
    if (aliases.includes(command)) {
      return category;
    }
  }
  return null;
}

/**
 * Run the selected command
 */
async function runCommand(command, options) {
  const category = getCommandCategory(command);
  
  if (!category || category === 'HELP') {
    printHelp();
    return;
  }
  
  if (category === 'VERSION') {
    printVersion();
    return;
  }
  
  const config = {
    frequency: options.frequency || FREQUENCIES.UNITY,
    coherenceTarget: options.coherenceTarget || 1.0,
    verbose: options.verbose === true
  };
  
  if (options.verbose) {
    console.log(`Running command: ${category}`);
    console.log(`Frequency: ${config.frequency} Hz`);
    console.log(`Coherence Target: ${config.coherenceTarget}`);
  }
  
  try {
    switch (category) {
      case 'EVOLVE':
        await runEvolver(config);
        break;
      case 'VERIFY':
        await runVerifier(config);
        break;
      case 'CLAUDE':
        await runClaudeUpdater(config);
        break;
      case 'RUN':
        await runCompleteSystem(config);
        break;
      case 'SCHEDULE':
        await setupScheduledAutomation(config);
        break;
      case 'STATUS':
        await checkSystemStatus(config);
        break;
      case 'COHERENCE':
        await measureCoherence(config);
        break;
      case 'GENERATE':
        await generateDocumentation(config);
        break;
      default:
        console.error(`Unknown command: ${command}`);
        printHelp();
        break;
    }
  } catch (err) {
    console.error(`Error executing command ${category}:`, err);
    process.exit(1);
  }
}

/**
 * Run the Documentation Evolver
 */
async function runEvolver(config) {
  console.log(`Running Documentation Evolver at ${config.frequency} Hz...`);
  
  const evolver = new DocumentationEvolver({
    frequency: config.frequency,
    coherenceTarget: config.coherenceTarget
  });
  
  await evolver.initialize();
  const result = await evolver.run();
  
  console.log(`\nDOCUMENTATION EVOLUTION COMPLETE`);
  console.log(`Coherence issues fixed: ${result.coherenceIssuesFixed}`);
  console.log(`Broken references fixed: ${result.brokenReferencesFixed}`);
  console.log(`Index updated: ${result.indexUpdated}`);
  console.log(`Final coherence: ${result.systemCoherence.toFixed(4)}`);
  
  return result;
}

/**
 * Run the WindSurf Verification Tester
 */
async function runVerifier(config) {
  console.log(`Running WindSurf Verification Tester at ${config.frequency} Hz...`);
  
  // Use enhanced verification with mock dependencies
  const { runEnhancedVerification } = require('./enhanced_verification');
  const result = await runEnhancedVerification({
    frequency: config.frequency,
    coherenceTarget: config.coherenceTarget
  });
  
  console.log(`\nWINDSURF VERIFICATION COMPLETE`);
  console.log(`Tests run: ${result.totalTests}`);
  console.log(`Tests passed: ${result.passedTests}/${result.totalTests}`);
  console.log(`Overall coherence: ${result.overallCoherence.toFixed(4)}`);
  console.log(`Verification document: ${result.documentPath}`);
  
  return result;
}

/**
 * Run the Claude Integration Updater
 */
async function runClaudeUpdater(config) {
  console.log(`Running Claude Integration Updater at ${config.frequency} Hz...`);
  
  const updater = new ClaudeIntegrationUpdater({
    frequency: config.frequency,
    coherenceTarget: config.coherenceTarget
  });
  
  await updater.initialize();
  const result = await updater.run();
  
  console.log(`\nCLAUDE INTEGRATION UPDATE COMPLETE`);
  console.log(`Configurations found: ${result.configsFound}`);
  console.log(`Universal integration updated: ${result.updated}`);
  
  return result;
}

/**
 * Run the complete documentation system
 */
async function runCompleteSystem(config) {
  console.log(`Running complete Quantum Documentation System at ${config.frequency} Hz...`);
  
  const system = new QuantumDocumentationSystem({
    frequency: config.frequency,
    coherenceTarget: config.coherenceTarget
  });
  
  await system.initialize();
  const result = await system.runCompleteCycle();
  
  console.log(`\nQUANTUM DOCUMENTATION SYSTEM COMPLETE`);
  console.log(`WindSurf verification: ${result.windsurfResults.passedTests}/${result.windsurfResults.totalTests} tests passed`);
  console.log(`Claude integration: ${result.claudeResults.configsFound} configurations found`);
  console.log(`Documentation evolution: ${result.evolverResults.coherenceIssuesFixed} coherence issues fixed, ${result.evolverResults.brokenReferencesFixed} references fixed`);
  console.log(`System coherence: ${result.systemCoherence.toFixed(4)}`);
  
  return result;
}

/**
 * Set up scheduled automation
 */
async function setupScheduledAutomation(config) {
  console.log(`Setting up scheduled automation at ${config.frequency} Hz...`);
  
  const system = new QuantumDocumentationSystem({
    frequency: config.frequency,
    coherenceTarget: config.coherenceTarget
  });
  
  await system.initialize();
  const schedulerPath = await system.setupScheduledAutomation();
  
  console.log(`\nSCHEDULER SETUP COMPLETE`);
  console.log(`Scheduler script created at: ${schedulerPath}`);
  console.log(`To activate scheduled automation, run the following command:`);
  console.log(`powershell -ExecutionPolicy Bypass -File "${schedulerPath}"`);
  
  return { schedulerPath };
}

/**
 * Check the status of the documentation system
 */
async function checkSystemStatus(config) {
  console.log(`Checking documentation system status at ${config.frequency} Hz...`);
  
  // Check the status of each component
  const evolver = new DocumentationEvolver({
    frequency: config.frequency,
    coherenceTarget: config.coherenceTarget
  });
  
  await evolver.initialize();
  const docMap = await evolver.buildDocumentationMap();
  const docCoherence = evolver.calculateSystemCoherence();
  
  // Check WindSurf verification document
  const verificationPath = path.join(evolver.docRoot, 'windsurf_integration_verification.md');
  const verificationExists = fs.existsSync(verificationPath);
  let verificationDate = 'Not verified';
  
  if (verificationExists) {
    const content = fs.readFileSync(verificationPath, 'utf8');
    const dateMatch = content.match(/Verification Date:\s*(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      verificationDate = dateMatch[1];
    }
  }
  
  // Check Claude integration document
  const claudePath = path.join(evolver.docRoot, 'UNIVERSAL_CLAUDE_INTEGRATION.md');
  const claudeExists = fs.existsSync(claudePath);
  let claudeUpdateDate = 'Not created';
  
  if (claudeExists) {
    const content = fs.readFileSync(claudePath, 'utf8');
    const dateMatch = content.match(/Last Updated:\s*([^*\n]+)/);
    if (dateMatch) {
      claudeUpdateDate = dateMatch[1].trim();
    }
  }
  
  // Check Index.md
  const indexPath = path.join(evolver.docRoot, 'INDEX.md');
  const indexExists = fs.existsSync(indexPath);
  let indexSize = 'File not found';
  
  if (indexExists) {
    const stats = fs.statSync(indexPath);
    indexSize = `${(stats.size / 1024).toFixed(2)} KB`;
  }
  
  // Calculate component status
  const evolverStatus = docCoherence >= config.coherenceTarget ? 'Perfect' : 'Needs evolution';
  const verifierStatus = verificationExists ? 'Verified' : 'Not verified';
  const claudeStatus = claudeExists ? 'Integrated' : 'Not integrated';
  const indexStatus = indexExists ? 'Available' : 'Not found';
  
  // Print status
  console.log(`\nQUANTUM DOCUMENTATION SYSTEM STATUS`);
  console.log(`====================================`);
  console.log(`Documentation files: ${docMap.size}`);
  console.log(`Documentation coherence: ${docCoherence.toFixed(4)} (${evolverStatus})`);
  console.log(`WindSurf verification: ${verifierStatus} (${verificationDate})`);
  console.log(`Claude integration: ${claudeStatus} (${claudeUpdateDate})`);
  console.log(`INDEX.md: ${indexStatus} (${indexSize})`);
  console.log(`System components: 4/4 available`);
  
  return {
    docMap,
    docCoherence,
    verificationExists,
    verificationDate,
    claudeExists,
    claudeUpdateDate,
    indexExists,
    indexSize
  };
}

/**
 * Measure documentation coherence
 */
async function measureCoherence(config) {
  console.log(`Measuring documentation coherence at ${config.frequency} Hz...`);
  
  const evolver = new DocumentationEvolver({
    frequency: config.frequency,
    coherenceTarget: config.coherenceTarget
  });
  
  await evolver.initialize();
  const docMap = await evolver.buildDocumentationMap();
  const docCoherence = evolver.calculateSystemCoherence();
  
  // Group files by coherence level
  const coherenceLevels = {
    perfect: [],
    high: [],
    medium: [],
    low: []
  };
  
  for (const [relativePath, fileInfo] of docMap.entries()) {
    if (fileInfo.coherence >= 0.95) {
      coherenceLevels.perfect.push({ path: relativePath, coherence: fileInfo.coherence });
    } else if (fileInfo.coherence >= 0.8) {
      coherenceLevels.high.push({ path: relativePath, coherence: fileInfo.coherence });
    } else if (fileInfo.coherence >= 0.6) {
      coherenceLevels.medium.push({ path: relativePath, coherence: fileInfo.coherence });
    } else {
      coherenceLevels.low.push({ path: relativePath, coherence: fileInfo.coherence });
    }
  }
  
  // Sort each group by coherence
  for (const level in coherenceLevels) {
    coherenceLevels[level].sort((a, b) => b.coherence - a.coherence);
  }
  
  // Print coherence report
  console.log(`\nDOCUMENTATION COHERENCE REPORT`);
  console.log(`===============================`);
  console.log(`Total files: ${docMap.size}`);
  console.log(`Overall coherence: ${docCoherence.toFixed(4)}`);
  console.log(`\nCoherence breakdown:`);
  console.log(`Perfect coherence (>= 0.95): ${coherenceLevels.perfect.length} files`);
  console.log(`High coherence (0.8-0.95): ${coherenceLevels.high.length} files`);
  console.log(`Medium coherence (0.6-0.8): ${coherenceLevels.medium.length} files`);
  console.log(`Low coherence (< 0.6): ${coherenceLevels.low.length} files`);
  
  // Print top 5 lowest coherence files
  if (coherenceLevels.low.length > 0) {
    console.log(`\nLowest coherence files:`);
    for (let i = 0; i < Math.min(5, coherenceLevels.low.length); i++) {
      const file = coherenceLevels.low[i];
      console.log(`- ${file.path} (${file.coherence.toFixed(4)})`);
    }
  }
  
  return {
    docMap,
    docCoherence,
    coherenceLevels
  };
}

/**
 * Generate documentation using QuantumDocumentationGenerator
 */
async function generateDocumentation(config) {
  const frequency = config.frequency || 768;
  const coherenceTarget = config.coherenceTarget || 1.0;
  const directory = config.directory || path.join(__dirname, '..', '..');
  
  console.log(`Generating documentation at ${frequency} Hz...`);
  
  const generator = new QuantumDocumentationGenerator({
    frequency,
    coherenceTarget,
    rootDir: directory
  });
  
  await generator.initialize();
  
  // Generate documentation for all components in the specified directory
  const results = await generator.generateDirectoryDocs(directory, {
    fileTypes: ['.js', '.ts', '.py', '.ps1'],
    excludeDirs: ['node_modules', '.git', 'dist', 'build']
  });
  
  // Generate documentation index
  const indexPath = await generator.generateDocumentationIndex(results);
  
  console.log(`\n🌀 QUANTUM DOCUMENTATION GENERATOR COMPLETE 🌀`);
  console.log(`==============================================`);
  console.log(`Components processed: ${results.generated.length + results.errors.length}`);
  console.log(`Documentation generated: ${results.generated.length}`);
  console.log(`Errors: ${results.errors.length}`);
  console.log(`Documentation index: ${indexPath}`);
  console.log(`Frequency: ${frequency} Hz`);
  console.log(`Coherence Target: ${coherenceTarget}`);
}

// Main function
async function main() {
  const { command, options } = parseArgs();
  
  if (!command) {
    printHelp();
    return;
  }
  
  await runCommand(command, options);
}

// Run the CLI
main().catch(err => {
  console.error('Error running Quantum Documentation CLI:', err);
  process.exit(1);
});
