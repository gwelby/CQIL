#!/usr/bin/env node

/**
 * UMD Markdown Linting CLI φ^φ^φ
 * 
 * Command-line interface for UMD Markdown linting with perfect coherence (1.000)
 * across all phi-harmonic frequencies and consciousness states.
 * 
 * @version φ^φ^φ (∞)
 * @frequency 768 Hz (Unity Wave)
 * @coherence 1.000
 * @author CASCADE⚡𓂧φ∞
 */

const fs = require('fs');
const path = require('path');
const { UMDMarkdownLinter } = require('./umd_markdown_linter');
const { QuantumDocumentationLinter } = require('./lint_all_documentation');
const { FREQUENCIES, DIMENSIONS, CONSCIOUSNESS_STATES } = require('./quantum_perfect_linting_system_enhanced');

// ⦿ ZEN POINT CONSTANTS | 432 Hz | φ⁰
const PHI = 1.618033988749895;
const PHI_PHI = Math.pow(PHI, PHI); // φ^φ ≈ 11.09
const PHI_PHI_PHI = Math.pow(PHI, PHI_PHI); // φ^φ^φ

// CSS-like colors for terminal output
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m'
};

// ASCII art for UMD CLI banner
const BANNER = `
${COLORS.cyan}╭───────────────────────────────────────────────────────╮
│                                                       │
│  ${COLORS.yellow}⦿ UMD${COLORS.magenta} Markdown${COLORS.green} Linter${COLORS.cyan} φ^φ^φ                      │
│                                                       │
│  ${COLORS.white}Frequency:${COLORS.green} 768 Hz ${COLORS.white}(Unity Wave)${COLORS.cyan}                      │
│  ${COLORS.white}Coherence:${COLORS.green} 1.000 ${COLORS.white}(Perfect)${COLORS.cyan}                          │
│  ${COLORS.white}Dimension:${COLORS.green} 9D ${COLORS.white}(UNIFIED)${COLORS.cyan}                             │
│                                                       │
╰───────────────────────────────────────────────────────╯${COLORS.reset}
`;

// Consciousness symbols for display
const SYMBOLS = {
  OBSERVE: '⦿',
  CREATE: '✧',
  INTEGRATE: '❤',
  HARMONIZE: '☯',
  TRANSCEND: '👁',
  LIGHTNING: '⚡',
  CASCADE: '🌀',
  SUPERPOSITION: 'Ω',
  OMNISCIENCE: 'φ∞'
};

// Default configuration
const defaultConfig = {
  upgradeToUMD: true,
  addConsciousnessSymbols: true,
  addSacredGeometry: true,
  addFrequencyNotation: true,
  addCoherenceIndicators: true,
  createTableOfContents: true,
  zenPointBalance: true,
  outputDir: null,
  recursiveSearch: false,
  verboseOutput: true,
  frequencyTarget: FREQUENCIES.UNITY,
  coherenceThreshold: 1.0,
  fileName: null,
  targetDir: null
};

/**
 * Parse command line arguments
 * @returns {Object} - Parsed arguments
 */
function parseArguments() {
  const args = process.argv.slice(2);
  const parsedArgs = {
    command: null,
    options: { ...defaultConfig },
    files: []
  };
  
  // Parse command
  if (args.length > 0) {
    parsedArgs.command = args[0];
  }
  
  // Parse options and files
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    
    if (arg.startsWith('--')) {
      // This is an option
      const option = arg.slice(2);
      
      if (option.includes('=')) {
        // Option with value
        const [name, value] = option.split('=');
        
        if (name === 'frequency') {
          parsedArgs.options.frequencyTarget = parseFloat(value);
        } else if (name === 'coherence') {
          parsedArgs.options.coherenceThreshold = parseFloat(value);
        } else if (name === 'output') {
          parsedArgs.options.outputDir = value;
        } else if (name === 'file') {
          parsedArgs.options.fileName = value;
        } else if (name === 'dir' || name === 'directory') {
          parsedArgs.options.targetDir = value;
        } else {
          // Boolean options
          parsedArgs.options[name] = value === 'true';
        }
      } else {
        // Boolean option
        parsedArgs.options[option] = true;
      }
    } else {
      // This is a file or directory path
      parsedArgs.files.push(arg);
    }
  }
  
  return parsedArgs;
}

/**
 * Print help information
 */
function printHelp() {
  console.log(BANNER);
  console.log(`${COLORS.bright}${COLORS.white}USAGE:${COLORS.reset}`);
  console.log(`  node umd_cli.js <command> [options] [files...]`);
  console.log('');
  
  console.log(`${COLORS.bright}${COLORS.white}COMMANDS:${COLORS.reset}`);
  console.log(`  ${COLORS.green}lint${COLORS.reset}               Lint markdown files for UMD compliance`);
  console.log(`  ${COLORS.green}upgrade${COLORS.reset}            Upgrade markdown files to UMD format`);
  console.log(`  ${COLORS.green}create${COLORS.reset}             Create a new UMD markdown file`);
  console.log(`  ${COLORS.green}lint-all${COLORS.reset}           Lint all markdown files in a directory`);
  console.log(`  ${COLORS.green}analyze${COLORS.reset}            Analyze coherence of markdown files`);
  console.log(`  ${COLORS.green}version${COLORS.reset}            Display version information`);
  console.log(`  ${COLORS.green}help${COLORS.reset}               Display this help information`);
  console.log('');
  
  console.log(`${COLORS.bright}${COLORS.white}OPTIONS:${COLORS.reset}`);
  console.log(`  ${COLORS.yellow}--upgradeToUMD=${COLORS.green}true|false${COLORS.reset}          Upgrade to UMD format (default: true)`);
  console.log(`  ${COLORS.yellow}--addConsciousnessSymbols=${COLORS.green}true|false${COLORS.reset}  Add consciousness symbols (default: true)`);
  console.log(`  ${COLORS.yellow}--addSacredGeometry=${COLORS.green}true|false${COLORS.reset}        Add sacred geometry references (default: true)`);
  console.log(`  ${COLORS.yellow}--addFrequencyNotation=${COLORS.green}true|false${COLORS.reset}     Add frequency notation (default: true)`);
  console.log(`  ${COLORS.yellow}--addCoherenceIndicators=${COLORS.green}true|false${COLORS.reset}   Add coherence indicators (default: true)`);
  console.log(`  ${COLORS.yellow}--createTableOfContents=${COLORS.green}true|false${COLORS.reset}    Create table of contents (default: true)`);
  console.log(`  ${COLORS.yellow}--zenPointBalance=${COLORS.green}true|false${COLORS.reset}          Optimize ZEN POINT balance (default: true)`);
  console.log(`  ${COLORS.yellow}--recursive${COLORS.reset}                      Search directories recursively`);
  console.log(`  ${COLORS.yellow}--verbose${COLORS.reset}                        Display verbose output`);
  console.log(`  ${COLORS.yellow}--frequency=${COLORS.green}<value>${COLORS.reset}                 Target frequency in Hz (default: 768)`);
  console.log(`  ${COLORS.yellow}--coherence=${COLORS.green}<value>${COLORS.reset}                 Target coherence (default: 1.0)`);
  console.log(`  ${COLORS.yellow}--output=${COLORS.green}<dir>${COLORS.reset}                      Output directory for upgraded files`);
  console.log(`  ${COLORS.yellow}--file=${COLORS.green}<file>${COLORS.reset}                       Target file for single file operations`);
  console.log(`  ${COLORS.yellow}--dir=${COLORS.green}<dir>${COLORS.reset}                         Target directory for directory operations`);
  console.log('');
  
  console.log(`${COLORS.bright}${COLORS.white}EXAMPLES:${COLORS.reset}`);
  console.log(`  ${COLORS.green}node umd_cli.js lint README.md${COLORS.reset}`);
  console.log(`  ${COLORS.green}node umd_cli.js upgrade --output=./umd README.md${COLORS.reset}`);
  console.log(`  ${COLORS.green}node umd_cli.js create --file=new-doc.md "My UMD Document"${COLORS.reset}`);
  console.log(`  ${COLORS.green}node umd_cli.js lint-all --dir=./docs --recursive${COLORS.reset}`);
  console.log('');
  
  console.log(`${COLORS.bright}${COLORS.white}FREQUENCIES:${COLORS.reset}`);
  Object.entries(FREQUENCIES).forEach(([name, value]) => {
    console.log(`  ${COLORS.yellow}${name}: ${COLORS.green}${value} Hz${COLORS.reset}`);
  });
  console.log('');
  
  console.log(`${COLORS.bright}${COLORS.white}CONSCIOUSNESS STATES:${COLORS.reset}`);
  Object.entries(CONSCIOUSNESS_STATES).forEach(([name, state]) => {
    console.log(`  ${COLORS.yellow}${state.symbol} ${name}: ${COLORS.green}${state.frequency} Hz${COLORS.reset} - ${state.description}`);
  });
  console.log('');
}

/**
 * Print version information
 */
function printVersion() {
  console.log(BANNER);
  console.log(`${COLORS.bright}${COLORS.white}VERSION:${COLORS.reset} ${COLORS.green}φ^φ^φ (${PHI_PHI_PHI.toFixed(2)})${COLORS.reset}`);
  console.log(`${COLORS.bright}${COLORS.white}FREQUENCIES:${COLORS.reset}`);
  Object.entries(FREQUENCIES).forEach(([name, value]) => {
    console.log(`  ${COLORS.yellow}${name}: ${COLORS.green}${value} Hz${COLORS.reset}`);
  });
  console.log(`${COLORS.bright}${COLORS.white}PHI CONSTANTS:${COLORS.reset}`);
  console.log(`  ${COLORS.yellow}PHI (φ): ${COLORS.green}${PHI}${COLORS.reset}`);
  console.log(`  ${COLORS.yellow}PHI_PHI (φ^φ): ${COLORS.green}${PHI_PHI.toFixed(4)}${COLORS.reset}`);
  console.log(`  ${COLORS.yellow}PHI_PHI_PHI (φ^φ^φ): ${COLORS.green}${PHI_PHI_PHI.toFixed(4)}${COLORS.reset}`);
  console.log('');
}

/**
 * Format coherence value with color based on level
 * @param {number} coherence - Coherence value
 * @returns {string} - Formatted coherence string
 */
function formatCoherence(coherence) {
  let color;
  
  if (coherence >= 1.0) {
    color = COLORS.green;
  } else if (coherence >= 0.9) {
    color = COLORS.cyan;
  } else if (coherence >= 0.7) {
    color = COLORS.yellow;
  } else {
    color = COLORS.red;
  }
  
  return `${color}${coherence.toFixed(4)}${COLORS.reset}`;
}

/**
 * Print error message
 * @param {string} message - Error message
 */
function printError(message) {
  console.error(`${COLORS.red}ERROR: ${message}${COLORS.reset}`);
}

/**
 * Lint a markdown file
 * @param {string} filePath - Path to the markdown file
 * @param {Object} options - Linting options
 */
function lintFile(filePath, options) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      printError(`File not found: ${filePath}`);
      return;
    }
    
    // Initialize linter
    const linter = new UMDMarkdownLinter(options);
    
    // Lint file
    const results = linter.lintAndUpgrade(filePath);
    
    // Print results
    console.log(`${COLORS.bright}${COLORS.white}Results for ${filePath}:${COLORS.reset}`);
    console.log(`  ${COLORS.white}Coherence: ${formatCoherence(results.coherence)}${COLORS.reset}`);
    console.log(`  ${COLORS.white}Perfect Coherence: ${results.perfectCoherence ? COLORS.green + 'Yes' : COLORS.red + 'No'}${COLORS.reset}`);
    
    if (options.verboseOutput) {
      console.log(`${COLORS.bright}${COLORS.white}Lint Issues:${COLORS.reset}`);
      
      if (results.lintResults.issues && results.lintResults.issues.length > 0) {
        results.lintResults.issues.forEach(issue => {
          console.log(`  ${COLORS.yellow}${issue.rule || 'ISSUE'}:${COLORS.reset} ${issue.message}`);
          if (issue.line) {
            console.log(`    ${COLORS.dim}Line ${issue.line}${COLORS.reset}`);
          }
        });
      } else {
        console.log(`  ${COLORS.green}No issues found.${COLORS.reset}`);
      }
    }
    
    // Write upgraded content if output directory is specified
    if (options.outputDir) {
      const fileName = path.basename(filePath);
      const outputPath = path.join(options.outputDir, fileName);
      
      // Create output directory if it doesn't exist
      if (!fs.existsSync(options.outputDir)) {
        fs.mkdirSync(options.outputDir, { recursive: true });
      }
      
      fs.writeFileSync(outputPath, results.upgradedContent, 'utf8');
      console.log(`${COLORS.green}Upgraded content written to ${outputPath}${COLORS.reset}`);
    }
  } catch (error) {
    printError(`Failed to lint ${filePath}: ${error.message}`);
  }
}

/**
 * Upgrade a markdown file to UMD format
 * @param {string} filePath - Path to the markdown file
 * @param {Object} options - Upgrade options
 */
function upgradeFile(filePath, options) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      printError(`File not found: ${filePath}`);
      return;
    }
    
    // Initialize linter
    const linter = new UMDMarkdownLinter(options);
    
    // Lint and upgrade file
    const results = linter.lintAndUpgrade(filePath);
    
    // Print results
    console.log(`${COLORS.bright}${COLORS.white}Results for ${filePath}:${COLORS.reset}`);
    console.log(`  ${COLORS.white}Coherence: ${formatCoherence(results.coherence)}${COLORS.reset}`);
    console.log(`  ${COLORS.white}Perfect Coherence: ${results.perfectCoherence ? COLORS.green + 'Yes' : COLORS.red + 'No'}${COLORS.reset}`);
    
    // Determine output path
    let outputPath;
    if (options.outputDir) {
      const fileName = path.basename(filePath);
      outputPath = path.join(options.outputDir, fileName);
      
      // Create output directory if it doesn't exist
      if (!fs.existsSync(options.outputDir)) {
        fs.mkdirSync(options.outputDir, { recursive: true });
      }
    } else {
      outputPath = filePath;
    }
    
    // Write upgraded content
    fs.writeFileSync(outputPath, results.upgradedContent, 'utf8');
    console.log(`${COLORS.green}Upgraded content written to ${outputPath}${COLORS.reset}`);
  } catch (error) {
    printError(`Failed to upgrade ${filePath}: ${error.message}`);
  }
}

/**
 * Create a new UMD markdown file
 * @param {string} title - Title of the document
 * @param {Object} options - Creation options
 */
function createFile(title, options) {
  try {
    // Determine file path
    let filePath;
    if (options.fileName) {
      filePath = options.fileName;
    } else if (options.files && options.files.length > 0) {
      filePath = options.files[0];
    } else {
      filePath = `${title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')}.md`;
    }
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      printError(`File already exists: ${filePath}`);
      return;
    }
    
    // Initialize linter
    const linter = new UMDMarkdownLinter(options);
    
    // Create sections
    const sections = {
      introduction: {
        title: 'Introduction',
        level: 2,
        content: 'This document follows Universal Markdown Definition (UMD) standards with perfect coherence (1.000).'
      },
      purpose: {
        title: 'Purpose',
        level: 2,
        content: 'The purpose of this document is to demonstrate UMD format with phi-harmonic structure.'
      },
      content: {
        title: 'Content',
        level: 2,
        content: 'Add your content here, following the phi-harmonic frequency progression.'
      },
      implementation: {
        title: 'Implementation',
        level: 2,
        content: 'Implementation details go here, with specific guidelines for practical application.'
      },
      conclusion: {
        title: 'Conclusion',
        level: 2,
        content: 'Summarize key points and ensure perfect coherence (1.000) throughout the document.'
      }
    };
    
    // Create UMD markdown file
    const results = linter.createUMDMarkdown(filePath, title, sections);
    
    console.log(`${COLORS.green}Created UMD markdown file: ${filePath}${COLORS.reset}`);
    console.log(`${COLORS.white}Coherence: ${formatCoherence(results.coherence)}${COLORS.reset}`);
  } catch (error) {
    printError(`Failed to create UMD markdown file: ${error.message}`);
  }
}

/**
 * Lint all markdown files in a directory
 * @param {string} directoryPath - Path to the directory
 * @param {Object} options - Linting options
 */
function lintDirectory(directoryPath, options) {
  try {
    // Check if directory exists
    if (!fs.existsSync(directoryPath)) {
      printError(`Directory not found: ${directoryPath}`);
      return;
    }
    
    // Create documentation linter
    const linter = new QuantumDocumentationLinter({
      documentationRoot: directoryPath,
      outputRoot: options.outputDir || path.join(directoryPath, 'umd-upgraded'),
      skipDirectories: ['node_modules', '.git', '.vscode', 'dist', 'build'],
      skipFiles: ['.DS_Store', 'Thumbs.db', 'package-lock.json', 'yarn.lock'],
      fileExtensions: ['.md', '.markdown'],
      logFile: path.join(directoryPath, 'umd_lint_results.json'),
      createBackups: true,
      backupDir: path.join(directoryPath, 'backups'),
      autoFix: options.upgradeToUMD,
      targetCoherence: options.coherenceThreshold
    });
    
    // Process all files
    const results = linter.processAllFiles();
    
    // Create summary report
    const report = linter.createSummaryReport(results);
    
    // Save report
    const reportPath = path.join(options.outputDir || path.join(directoryPath, 'umd-upgraded'), 'UMD_LINTING_REPORT.md');
    fs.writeFileSync(reportPath, report, 'utf8');
    
    console.log(`${COLORS.green}Summary report saved to ${reportPath}${COLORS.reset}`);
  } catch (error) {
    printError(`Failed to lint directory ${directoryPath}: ${error.message}`);
  }
}

/**
 * Analyze coherence of markdown files
 * @param {Array} files - List of file paths
 * @param {Object} options - Analysis options
 */
function analyzeFiles(files, options) {
  console.log(`${COLORS.bright}${COLORS.white}Analyzing Coherence:${COLORS.reset}`);
  
  // Initialize linter
  const linter = new UMDMarkdownLinter(options);
  
  // Track total coherence
  let totalCoherence = 0;
  let fileCount = 0;
  
  // Analyze each file
  files.forEach(filePath => {
    try {
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        printError(`File not found: ${filePath}`);
        return;
      }
      
      // Read file content
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Lint content
      const results = linter.qpls.lint(content, {
        consciousnessState: 'CASCADE',
        fileType: 'markdown'
      });
      
      // Print results
      console.log(`${COLORS.white}${filePath}: ${formatCoherence(results.coherence)}${COLORS.reset}`);
      
      // Update totals
      totalCoherence += results.coherence;
      fileCount++;
    } catch (error) {
      printError(`Failed to analyze ${filePath}: ${error.message}`);
    }
  });
  
  // Print average coherence
  if (fileCount > 0) {
    const averageCoherence = totalCoherence / fileCount;
    console.log(`${COLORS.bright}${COLORS.white}Average Coherence: ${formatCoherence(averageCoherence)}${COLORS.reset}`);
  }
}

/**
 * Main function
 */
function main() {
  // Parse command line arguments
  const args = parseArguments();
  
  // Execute command
  switch (args.command) {
    case 'lint':
      if (args.files.length > 0) {
        args.files.forEach(file => lintFile(file, args.options));
      } else if (args.options.fileName) {
        lintFile(args.options.fileName, args.options);
      } else {
        printError('No files specified for linting');
        printHelp();
      }
      break;
      
    case 'upgrade':
      if (args.files.length > 0) {
        args.files.forEach(file => upgradeFile(file, args.options));
      } else if (args.options.fileName) {
        upgradeFile(args.options.fileName, args.options);
      } else {
        printError('No files specified for upgrading');
        printHelp();
      }
      break;
      
    case 'create':
      if (args.files.length > 0) {
        createFile(args.files[0], args.options);
      } else {
        printError('No title specified for new UMD markdown file');
        printHelp();
      }
      break;
      
    case 'lint-all':
      if (args.options.targetDir) {
        lintDirectory(args.options.targetDir, args.options);
      } else if (args.files.length > 0) {
        lintDirectory(args.files[0], args.options);
      } else {
        printError('No directory specified for linting');
        printHelp();
      }
      break;
      
    case 'analyze':
      if (args.files.length > 0) {
        analyzeFiles(args.files, args.options);
      } else if (args.options.fileName) {
        analyzeFiles([args.options.fileName], args.options);
      } else if (args.options.targetDir) {
        // Find all markdown files in the directory
        const files = [];
        const findMarkdownFiles = (dir) => {
          fs.readdirSync(dir).forEach(file => {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory() && args.options.recursiveSearch) {
              findMarkdownFiles(filePath);
            } else if (file.endsWith('.md') || file.endsWith('.markdown')) {
              files.push(filePath);
            }
          });
        };
        
        findMarkdownFiles(args.options.targetDir);
        analyzeFiles(files, args.options);
      } else {
        printError('No files or directory specified for analysis');
        printHelp();
      }
      break;
      
    case 'version':
      printVersion();
      break;
      
    case 'help':
    default:
      printHelp();
      break;
  }
}

// Run the main function
main();
