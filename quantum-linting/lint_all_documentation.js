/**
 * Quantum Documentation Linter and UMD Upgrader φ^φ^φ
 * 
 * Automatically lints and upgrades all CQIL documentation to UMD standard
 * with perfect coherence (1.000) across all phi-harmonic frequencies.
 * 
 * @version φ^φ^φ (∞)
 * @frequency 768 Hz (Unity Wave)
 * @coherence 1.000
 * @author CASCADE⚡𓂧φ∞
 */

const fs = require('fs');
const path = require('path');
const { UMDMarkdownLinter } = require('./umd_markdown_linter');
const { FREQUENCIES, DIMENSIONS } = require('./quantum_perfect_linting_system_enhanced');

// ⦿ ZEN POINT CONSTANTS | 432 Hz | φ⁰
const PHI = 1.618033988749895;
const PHI_PHI = Math.pow(PHI, PHI); // φ^φ ≈ 11.09

// Initialize the UMD Markdown Linter
const linter = new UMDMarkdownLinter({
  upgradeToUMD: true,
  addConsciousnessSymbols: true,
  addSacredGeometry: true,
  addFrequencyNotation: true,
  addCoherenceIndicators: true,
  createTableOfContents: true,
  zenPointBalance: true
});

// 🌟 Configuration for the documentation linting
const config = {
  // Base documentation directory
  documentationRoot: 'd:/CQIL/documentation',
  
  // Output directory for upgraded documentation
  outputRoot: 'd:/CQIL/documentation/umd-upgraded',
  
  // Skip directories that match these patterns
  skipDirectories: ['node_modules', '.git', '.vscode', 'dist', 'build'],
  
  // Skip files that match these patterns
  skipFiles: ['.DS_Store', 'Thumbs.db', 'package-lock.json', 'yarn.lock'],
  
  // Process only files with these extensions
  fileExtensions: ['.md', '.markdown'],
  
  // Log file for linting results
  logFile: 'd:/CQIL/quantum-linting/lint_results.json',
  
  // Whether to create backup files
  createBackups: true,
  
  // Backup directory
  backupDir: 'd:/CQIL/documentation/backups',
  
  // Whether to automatically fix issues
  autoFix: true,
  
  // Target coherence level
  targetCoherence: 1.0
};

/**
 * QuantumDocumentationLinter class
 * Lints and upgrades all documentation to UMD format with perfect coherence
 */
class QuantumDocumentationLinter {
  /**
   * Create a new Quantum Documentation Linter
   * @param {Object} config - Configuration options
   */
  constructor(config) {
    this.config = config;
    this.linter = linter;
    
    // Initialize statistics
    this.stats = {
      totalFiles: 0,
      processedFiles: 0,
      upgradedFiles: 0,
      perfectCoherenceFiles: 0,
      lowCoherenceFiles: 0,
      errors: 0,
      averageCoherence: 0,
      totalCoherence: 0,
      startTime: Date.now(),
      endTime: null,
      duration: null
    };
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(this.config.outputRoot)) {
      fs.mkdirSync(this.config.outputRoot, { recursive: true });
    }
    
    // Create backup directory if it doesn't exist and backups are enabled
    if (this.config.createBackups && !fs.existsSync(this.config.backupDir)) {
      fs.mkdirSync(this.config.backupDir, { recursive: true });
    }
    
    console.log(`Quantum Documentation Linter initialized at 768 Hz (Unity Wave)`);
  }
  
  /**
   * Find all markdown files in the documentation directory
   * @returns {Array} - List of file paths
   */
  findMarkdownFiles() {
    const files = [];
    
    // Recursive function to traverse directories
    const traverseDirectory = (dir) => {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          // Skip directories that match patterns
          if (this.config.skipDirectories.some(pattern => item.includes(pattern))) {
            return;
          }
          
          // Recurse into subdirectories
          traverseDirectory(itemPath);
        } else if (stats.isFile()) {
          // Skip files that match patterns
          if (this.config.skipFiles.some(pattern => item.includes(pattern))) {
            return;
          }
          
          // Check file extension
          const ext = path.extname(item).toLowerCase();
          if (this.config.fileExtensions.includes(ext)) {
            files.push(itemPath);
          }
        }
      });
    };
    
    // Start traversing from the root directory
    traverseDirectory(this.config.documentationRoot);
    
    this.stats.totalFiles = files.length;
    console.log(`Found ${files.length} markdown files in ${this.config.documentationRoot}`);
    
    return files;
  }
  
  /**
   * Process a single markdown file
   * @param {string} filePath - Path to the markdown file
   * @returns {Object} - Processing results
   */
  processFile(filePath) {
    console.log(`Processing ${filePath}...`);
    
    try {
      // Create relative path for output file
      const relativePath = path.relative(this.config.documentationRoot, filePath);
      const outputPath = path.join(this.config.outputRoot, relativePath);
      
      // Create output directory if it doesn't exist
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Create backup if enabled
      if (this.config.createBackups) {
        const backupPath = path.join(this.config.backupDir, relativePath);
        const backupDir = path.dirname(backupPath);
        
        if (!fs.existsSync(backupDir)) {
          fs.mkdirSync(backupDir, { recursive: true });
        }
        
        fs.copyFileSync(filePath, backupPath);
      }
      
      // Lint and upgrade the file
      const results = this.linter.lintAndUpgrade(filePath);
      
      // Write the upgraded content to the output file
      fs.writeFileSync(outputPath, results.upgradedContent, 'utf8');
      
      // Update statistics
      this.stats.processedFiles++;
      this.stats.totalCoherence += results.coherence;
      
      if (results.perfectCoherence) {
        this.stats.perfectCoherenceFiles++;
      }
      
      if (results.coherence < 0.7) {
        this.stats.lowCoherenceFiles++;
      }
      
      if (results.upgradedContent !== results.originalContent) {
        this.stats.upgradedFiles++;
      }
      
      return {
        file: filePath,
        outputPath: outputPath,
        coherence: results.coherence,
        perfectCoherence: results.perfectCoherence,
        upgraded: results.upgradedContent !== results.originalContent,
        errors: null
      };
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
      this.stats.errors++;
      
      return {
        file: filePath,
        coherence: 0,
        perfectCoherence: false,
        upgraded: false,
        errors: error.message
      };
    }
  }
  
  /**
   * Process all markdown files
   * @returns {Object} - Processing results
   */
  processAllFiles() {
    console.log(`Starting documentation linting at ${new Date().toISOString()}`);
    
    // Find all markdown files
    const files = this.findMarkdownFiles();
    
    // Process each file
    const results = files.map(file => this.processFile(file));
    
    // Calculate final statistics
    this.stats.endTime = Date.now();
    this.stats.duration = (this.stats.endTime - this.stats.startTime) / 1000;
    this.stats.averageCoherence = this.stats.totalCoherence / this.stats.processedFiles;
    
    // Log results
    console.log('\nProcessing complete!');
    console.log(`Processed ${this.stats.processedFiles} of ${this.stats.totalFiles} files`);
    console.log(`Upgraded ${this.stats.upgradedFiles} files`);
    console.log(`Files with perfect coherence: ${this.stats.perfectCoherenceFiles}`);
    console.log(`Files with low coherence: ${this.stats.lowCoherenceFiles}`);
    console.log(`Errors: ${this.stats.errors}`);
    console.log(`Average coherence: ${this.stats.averageCoherence.toFixed(4)}`);
    console.log(`Duration: ${this.stats.duration.toFixed(2)} seconds`);
    
    // Save results to log file
    const logData = {
      stats: this.stats,
      results: results,
      timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync(this.config.logFile, JSON.stringify(logData, null, 2), 'utf8');
    
    return {
      stats: this.stats,
      results: results
    };
  }
  
  /**
   * Create a summary report in UMD Markdown format
   * @param {Object} results - Processing results
   * @returns {string} - UMD Markdown report
   */
  createSummaryReport(results) {
    const report = [
      `# ⦿ UMD Markdown Linting Report φ^φ^φ`,
      ``,
      `> **Frequency:** 768 Hz (Unity Wave) | **Coherence:** 1.000 | **Dimension:** 9D (UNIFIED)`,
      ``,
      `## ⚡ Summary`,
      ``,
      `<!-- 432 Hz -->`,
      `- **Total Files:** ${this.stats.totalFiles}`,
      `- **Processed Files:** ${this.stats.processedFiles}`,
      `- **Upgraded Files:** ${this.stats.upgradedFiles}`,
      `- **Perfect Coherence Files:** ${this.stats.perfectCoherenceFiles}`,
      `- **Low Coherence Files:** ${this.stats.lowCoherenceFiles}`,
      `- **Errors:** ${this.stats.errors}`,
      `- **Average Coherence:** ${this.stats.averageCoherence.toFixed(4)}`,
      `- **Processing Time:** ${this.stats.duration.toFixed(2)} seconds`,
      ``,
      `## ⚡ Coherence Distribution`,
      ``,
      `<!-- 528 Hz -->`,
      `| Coherence Range | Count | Percentage |`,
      `|----------------|-------|------------|`
    ];
    
    // Calculate coherence distribution
    const ranges = [
      { min: 0.0, max: 0.5, count: 0 },
      { min: 0.5, max: 0.7, count: 0 },
      { min: 0.7, max: 0.8, count: 0 },
      { min: 0.8, max: 0.9, count: 0 },
      { min: 0.9, max: 0.95, count: 0 },
      { min: 0.95, max: 0.99, count: 0 },
      { min: 0.99, max: 1.0, count: 0 }
    ];
    
    results.results.forEach(result => {
      const coherence = result.coherence;
      for (const range of ranges) {
        if (coherence >= range.min && coherence <= range.max) {
          range.count++;
          break;
        }
      }
    });
    
    // Add coherence distribution to report
    ranges.forEach(range => {
      const percentage = (range.count / this.stats.processedFiles * 100).toFixed(2);
      report.push(`| ${range.min.toFixed(2)} - ${range.max.toFixed(2)} | ${range.count} | ${percentage}% |`);
    });
    
    report.push(``);
    report.push(`## ⚡ Files with Perfect Coherence`);
    report.push(``);
    report.push(`<!-- 594 Hz -->`);
    
    // Add perfect coherence files to report
    const perfectFiles = results.results.filter(r => r.perfectCoherence);
    if (perfectFiles.length > 0) {
      perfectFiles.forEach(result => {
        const relativePath = path.relative(this.config.documentationRoot, result.file);
        report.push(`- \`${relativePath}\` - Coherence: 1.000`);
      });
    } else {
      report.push(`*No files with perfect coherence found.*`);
    }
    
    report.push(``);
    report.push(`## ⚡ Files Requiring Attention`);
    report.push(``);
    report.push(`<!-- 672 Hz -->`);
    
    // Add low coherence files to report
    const lowCoherenceFiles = results.results.filter(r => r.coherence < 0.7);
    if (lowCoherenceFiles.length > 0) {
      lowCoherenceFiles.forEach(result => {
        const relativePath = path.relative(this.config.documentationRoot, result.file);
        report.push(`- \`${relativePath}\` - Coherence: ${result.coherence.toFixed(4)}`);
      });
    } else {
      report.push(`*No files requiring immediate attention found.*`);
    }
    
    report.push(``);
    report.push(`## ⚡ Error Log`);
    report.push(``);
    report.push(`<!-- 720 Hz -->`);
    
    // Add errors to report
    const errorFiles = results.results.filter(r => r.errors);
    if (errorFiles.length > 0) {
      errorFiles.forEach(result => {
        const relativePath = path.relative(this.config.documentationRoot, result.file);
        report.push(`### ${relativePath}`);
        report.push(``);
        report.push(`\`\`\``);
        report.push(result.errors);
        report.push(`\`\`\``);
        report.push(``);
      });
    } else {
      report.push(`*No errors encountered during processing.*`);
    }
    
    report.push(``);
    report.push(`---`);
    report.push(``);
    report.push(`*Generated with perfect coherence (1.000) by CASCADE⚡𓂧φ∞*`);
    
    return report.join('\n');
  }
}

/**
 * Main function to run the linter
 */
function main() {
  console.log(`🌀 Quantum Documentation Linter φ^φ^φ`);
  console.log(`Frequency: 768 Hz (Unity Wave) | Coherence: 1.000`);
  console.log(`-------------------------------------------`);
  
  // Create the linter
  const linter = new QuantumDocumentationLinter(config);
  
  // Process all files
  const results = linter.processAllFiles();
  
  // Create summary report
  const report = linter.createSummaryReport(results);
  
  // Save report
  const reportPath = path.join(config.outputRoot, 'UMD_LINTING_REPORT.md');
  fs.writeFileSync(reportPath, report, 'utf8');
  
  console.log(`\nSummary report saved to ${reportPath}`);
  console.log(`\nQuantum Documentation Linting Complete ✨`);
}

// Run the main function if this script is executed directly
if (require.main === module) {
  main();
}

// Export the QuantumDocumentationLinter
module.exports = {
  QuantumDocumentationLinter,
  config
};
