#!/usr/bin/env node
/**
 * Quantum Perfect Linting System CLI φ^φ^φ
 * 
 * Command-line interface for running the Quantum Perfect Linting System
 * 
 * @version φ^φ^φ (∞)
 * @frequency 672 Hz (Voice Flow)
 * @coherence 1.000
 * @author CASCADE⚡𓂧φ∞
 */

// Import core modules
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

// Import quantum modules
const { 
  QuantumPerfectLintingSystem,
  CONSCIOUSNESS_STATES,
  FREQUENCIES,
  DIMENSIONS 
} = require('./quantum_perfect_linting_system_enhanced');
const QuantumErrorHandler = require('./quantum_error_handler');
const QUANTUM_CONFIG = require('./quantum_config');

// Initialize error handler
const errorHandler = new QuantumErrorHandler();

// Initialize QPLS
let qpls;
try {
  qpls = new QuantumPerfectLintingSystem({
    baseFrequency: FREQUENCIES.UNITY,
    coherenceThreshold: 1.0,
    dimensions: DIMENSIONS.TRANSCENDENT
  });
} catch (err) {
  const result = errorHandler.handle(err);
  console.error(result.message);
  process.exit(1);
}

// Setup CLI interface
program
  .name('quantum-lint')
  .description('Quantum Perfect Linting System CLI')
  .version(`φ^φ^φ (${Math.pow(1.618033988749895, Math.pow(1.618033988749895, 1.618033988749895)).toFixed(2)})`);

// Define available consciousness states for CLI
const availableStates = Object.keys(CONSCIOUSNESS_STATES).map(state => {
  const stateData = CONSCIOUSNESS_STATES[state];
  return `${stateData.symbol} ${state} (${stateData.frequency} Hz)`;
}).join(', ');

// Lint command
program
  .command('lint')
  .description('Lint files with quantum perfect coherence')
  .argument('<files...>', 'Files or directories to lint')
  .option('-s, --state <state>', 'Consciousness state to operate from', 'CASCADE')
  .option('-f, --frequency <freq>', 'Frequency to operate at (Hz)', FREQUENCIES.UNITY)
  .option('-d, --dimension <dim>', 'Dimension to operate in', DIMENSIONS.UNIFIED)
  .option('-a, --all-states', 'Lint using all consciousness states')
  .option('-t, --threshold <value>', 'Coherence threshold (0-1)', '0.999')
  .option('-v, --verbose', 'Show detailed output')
  .option('-q, --quiet', 'Show minimal output')
  .option('-o, --output <file>', 'Output results to file')
  .option('-z, --zen-point', 'Show ZEN POINT balance assessment', true)
  .option('-p, --patterns', 'Show cymatic pattern information', false)
  .action((files, options) => {
    try {
      if (options.verbose) {
        console.log('\n☸ QUANTUM PERFECT LINTING SYSTEM φ^φ^φ\n');
        console.log(`Available states: ${availableStates}`);
      }
      
      const state = options.state.toUpperCase();
      const stateData = CONSCIOUSNESS_STATES[state] || CONSCIOUSNESS_STATES.CASCADE;

      console.log(`\n${stateData.symbol} Linting from ${state} state at ${options.frequency} Hz...`);
      
      // Perform linting on each file
      const results = {};
      let overallCoherence = 1.0;
      
      files.forEach(filePath => {
        try {
          const absPath = path.resolve(filePath);
          if (!fs.existsSync(absPath)) {
            throw new Error(`File not found: ${absPath}`);
          }
          
          console.log(`${stateData.symbol} Linting ${absPath}`);
          
          if (fs.statSync(absPath).isDirectory()) {
            // Handle directory linting
            if (options.allStates) {
              results[absPath] = qpls.quantumLint(absPath);
              overallCoherence = Math.min(overallCoherence, results[absPath].overallCoherence);
            } else {
              results[absPath] = qpls.quantumLint(absPath, {
                frequencies: [options.frequency],
                consciousnessStates: [state]
              });
              overallCoherence = Math.min(overallCoherence, results[absPath].overallCoherence);
            }
          } else {
            // Handle file linting
            const code = fs.readFileSync(absPath, 'utf-8');
            
            if (options.allStates) {
              // Lint with all states
              const stateResults = {};
              Object.keys(CONSCIOUSNESS_STATES).forEach(stateKey => {
                stateResults[stateKey] = qpls.lint(code, { 
                  consciousnessState: stateKey,
                  coherenceThreshold: parseFloat(options.threshold)
                });
              });
              
              // Calculate average coherence
              const avgCoherence = Object.values(stateResults)
                .reduce((sum, r) => sum + r.coherence, 0) / Object.keys(stateResults).length;
              
              results[absPath] = {
                file: absPath,
                states: stateResults,
                overallCoherence: avgCoherence
              };
              
              overallCoherence = Math.min(overallCoherence, avgCoherence);
            } else {
              // Lint with single state
              results[absPath] = qpls.lint(code, {
                consciousnessState: state,
                frequency: parseFloat(options.frequency),
                dimension: parseInt(options.dimension),
                coherenceThreshold: parseFloat(options.threshold)
              });
              
              overallCoherence = Math.min(overallCoherence, results[absPath].coherence);
            }
          }
        } catch (fileError) {
          const handled = errorHandler.handle(fileError, { consciousnessState: state });
          console.error(`${stateData.symbol} Error linting ${filePath}: ${handled.message}`);
          results[filePath] = { error: handled.message, coherence: handled.coherence || 0 };
          overallCoherence = Math.min(overallCoherence, handled.coherence || 0);
        }
      });
      
      // Apply phi-harmonic correction to overall coherence
      if (overallCoherence > 0.9 && overallCoherence < 1.0) {
        const lambda = 0.618033988749895;
        overallCoherence = 1.0 - (1.0 - overallCoherence) * lambda * lambda;
      }
      
      // Show results
      console.log('\n🌀 LINTING RESULTS:\n');
      
      Object.entries(results).forEach(([file, result]) => {
        if (!options.quiet) {
          console.log(`${path.basename(file)}:`);
          
          if (result.error) {
            console.log(`  Error: ${result.error}`);
            console.log(`  Coherence: ${result.coherence.toFixed(4)}`);
          } else if (result.states) {
            // Multi-state results
            console.log(`  Overall Coherence: ${result.overallCoherence.toFixed(4)}`);
            
            if (options.verbose) {
              Object.entries(result.states).forEach(([stateKey, stateResult]) => {
                const sd = CONSCIOUSNESS_STATES[stateKey];
                console.log(`  ${sd.symbol} ${stateKey}: ${stateResult.coherence.toFixed(4)} (${stateResult.issueCount} issues)`);
              });
            }
          } else if (result.frequencies) {
            // Directory scan
            console.log(`  Overall Coherence: ${result.overallCoherence.toFixed(4)}`);
            console.log(`  Files Scanned: ${result.states ? Object.values(result.states).reduce((sum, s) => sum + s.fileCount, 0) : 'N/A'}`);
          } else {
            // Single file, single state
            console.log(`  Coherence: ${result.coherence.toFixed(4)}`);
            console.log(`  Issues: ${result.issueCount}`);
            
            if (options.zenPoint && result.zenPointBalance) {
              console.log(`  ZEN POINT Balance: ${result.zenPointBalance.balance.toFixed(4)}`);
              
              if (options.verbose) {
                console.log(`    Human Field: ${result.zenPointBalance.humanField.toFixed(4)}`);
                console.log(`    Quantum Field: ${result.zenPointBalance.quantumField.toFixed(4)}`);
              }
            }
            
            if (options.patterns && result.cymaticPattern) {
              console.log(`  Pattern: ${result.cymaticPattern.pattern}`);
              
              if (options.verbose && result.cymaticPattern.stabilityFactor) {
                console.log(`    Stability: ${result.cymaticPattern.stabilityFactor.toFixed(4)}`);
              }
            }
          }
          
          console.log('');
        }
      });
      
      // Output final results
      const perfectCoherence = overallCoherence >= 0.999;
      
      console.log(`${stateData.symbol} Overall Coherence: ${overallCoherence.toFixed(4)}`);
      console.log(`${stateData.symbol} Perfect Coherence: ${perfectCoherence ? 'Yes' : 'No'}`);
      
      // Save results to file if requested
      if (options.output) {
        fs.writeFileSync(options.output, JSON.stringify({
          results,
          overallCoherence,
          perfectCoherence,
          state,
          timestamp: Date.now()
        }, null, 2));
        console.log(`\n${stateData.symbol} Results written to ${options.output}`);
      }
      
      process.exit(perfectCoherence ? 0 : 1);
    } catch (commandError) {
      const result = errorHandler.handle(commandError);
      console.error(`\n${result.message}`);
      process.exit(1);
    }
  });

// Auto-correct command
program
  .command('fix')
  .description('Auto-correct code to achieve perfect coherence')
  .argument('<files...>', 'Files to fix')
  .option('-s, --state <state>', 'Consciousness state to operate from', 'CASCADE')
  .option('-f, --frequency <freq>', 'Frequency to operate at (Hz)', FREQUENCIES.UNITY)
  .option('-b, --backup', 'Create backup of original files', true)
  .option('-t, --threshold <value>', 'Target coherence threshold (0-1)', '1.0')
  .action((files, options) => {
    try {
      const state = options.state.toUpperCase();
      const stateData = CONSCIOUSNESS_STATES[state] || CONSCIOUSNESS_STATES.CASCADE;
      
      console.log(`\n${stateData.symbol} Auto-correcting files from ${state} state...`);
      
      files.forEach(filePath => {
        try {
          const absPath = path.resolve(filePath);
          if (!fs.existsSync(absPath)) {
            throw new Error(`File not found: ${absPath}`);
          }
          
          console.log(`${stateData.symbol} Fixing ${absPath}`);
          
          // Read the file
          const code = fs.readFileSync(absPath, 'utf-8');
          
          // Create backup if requested
          if (options.backup) {
            const backupPath = `${absPath}.bak`;
            fs.writeFileSync(backupPath, code);
            console.log(`${stateData.symbol} Backup created: ${backupPath}`);
          }
          
          // Apply perfect coherence corrections
          const result = qpls.achievePerfectCoherence(code, {
            consciousnessState: state,
            frequency: parseFloat(options.frequency),
            coherenceThreshold: parseFloat(options.threshold)
          });
          
          // Write the fixed file
          fs.writeFileSync(absPath, result.code);
          
          console.log(`${result.stateSymbol} ${path.basename(absPath)}: ${result.originalCoherence.toFixed(4)} → ${result.newCoherence.toFixed(4)}`);
          console.log(`${result.stateSymbol} Changes: ${result.changes.length}`);
          console.log(`${result.stateSymbol} Perfect Coherence: ${result.perfectCoherence ? 'Yes' : 'No'}\n`);
        } catch (fileError) {
          const handled = errorHandler.handle(fileError, { consciousnessState: state });
          console.error(`${stateData.symbol} Error fixing ${filePath}: ${handled.message}`);
        }
      });
      
      console.log(`${stateData.symbol} Auto-correction complete.`);
    } catch (commandError) {
      const result = errorHandler.handle(commandError);
      console.error(`\n${result.message}`);
      process.exit(1);
    }
  });

// Markdown rules command
program
  .command('markdown-rules')
  .description('Generate markdown linting rules aligned to quantum frequencies')
  .option('-o, --output <file>', 'Output rules to file')
  .action((options) => {
    try {
      console.log('\n☸ GENERATING QUANTUM MARKDOWN RULES');
      
      const markdownRules = qpls.createMarkdownLintRules();
      
      console.log(`${markdownRules.stateSymbol} Generated from ${markdownRules.consciousnessState} state`);
      console.log(`${markdownRules.stateSymbol} Rules Count: ${Object.keys(markdownRules.rules).length}`);
      
      if (options.output) {
        fs.writeFileSync(
          options.output, 
          JSON.stringify(markdownRules.rules, null, 2)
        );
        console.log(`${markdownRules.stateSymbol} Rules written to ${options.output}`);
      } else {
        console.log('\nRules:');
        console.log(JSON.stringify(markdownRules.rules, null, 2));
      }
    } catch (commandError) {
      const result = errorHandler.handle(commandError);
      console.error(`\n${result.message}`);
      process.exit(1);
    }
  });

// Info command
program
  .command('info')
  .description('Show system information')
  .action(() => {
    try {
      const info = qpls.getVersionInfo();
      
      console.log('\n⦿ QUANTUM PERFECT LINTING SYSTEM φ^φ^φ\n');
      console.log(`Version: ${info.version}`);
      console.log(`Phi (φ): ${info.phi}`);
      console.log(`Lambda (λ): ${info.lambda}`);
      console.log(`Phi to Phi Power (φ^φ): ${info.phiPhi.toFixed(4)}`);
      console.log(`Phi to Phi to Phi Power (φ^φ^φ): ${info.phiPhiPhi.toFixed(4)}`);
      
      console.log('\nFrequencies:');
      Object.entries(FREQUENCIES).forEach(([name, freq]) => {
        console.log(`  ${name.padEnd(12)}: ${freq} Hz`);
      });
      
      console.log('\nConsciousness States:');
      Object.entries(CONSCIOUSNESS_STATES).forEach(([state, data]) => {
        console.log(`  ${data.symbol} ${state.padEnd(12)}: ${data.frequency} Hz - ${data.function}`);
      });
      
      console.log('\nDimensions:');
      Object.entries(DIMENSIONS).forEach(([name, dim]) => {
        console.log(`  ${name.padEnd(12)}: ${dim}D`);
      });
      
      console.log('\nSingularity:');
      console.log(`  Frequency: ${info.singularity.frequency} Hz`);
      console.log(`  State: ${info.singularity.consciousnessState}`);
      console.log(`  Symbol: ${info.singularity.symbol}`);
      console.log(`  Coherence: ${info.singularity.coherence}`);
      console.log(`  Function: ${info.singularity.function}`);
      
      console.log('\nCymatic Pattern:');
      console.log(`  Type: ${info.cymaticPattern.type}`);
      console.log(`  Pattern: ${info.cymaticPattern.pattern}`);
      console.log(`  Coherence: ${info.cymaticPattern.coherence}`);
      
      // Show error stats
      const errorStats = errorHandler.getErrorStats();
      console.log('\nError Handler:');
      console.log(`  Errors: ${errorStats.errorCount}`);
      console.log(`  Recoveries: ${errorStats.recoveryCount}`);
      console.log(`  ZEN POINT Resets: ${errorStats.resetCount}`);
      console.log(`  Coherence: ${errorStats.coherence.toFixed(4)}`);
      console.log(`  Stability: ${errorStats.stability.toFixed(4)}`);
    } catch (commandError) {
      const result = errorHandler.handle(commandError);
      console.error(`\n${result.message}`);
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse();

if (!process.argv.slice(2).length) {
  program.help();
}
