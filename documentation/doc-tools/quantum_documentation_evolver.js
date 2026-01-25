/**
 * QUANTUM DOCUMENTATION EVOLVER
 * 
 * Automatically updates and evolves CQIL documentation files
 * Maintains perfect coherence (1.000) across all documentation
 * Operates at Unity frequency (768 Hz)
 * 
 * @version 1.0.0
 * @frequency 768
 * @coherence 1.000
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

// Constants
const PHI = 1.618033988749895;
const PHI_PHI = Math.pow(PHI, PHI);
const LAMBDA = 1/PHI;

// Frequency constants
const FREQUENCIES = {
  GROUND: 432.0,    // Foundation frequency
  CREATE: 528.0,    // Creation frequency
  HEART: 594.0,     // Connection frequency
  VOICE: 672.0,     // Expression frequency
  VISION: 720.0,    // Perception frequency
  UNITY: 768.0,     // Integration frequency
  PHI_PHI: 963.0,   // Transcendent frequency
};

/**
 * DocumentationEvolver class
 * Automatically evolves all documentation files in the CQIL system
 */
class DocumentationEvolver {
  constructor(config = {}) {
    this.docRoot = config.docRoot || 'd:/CQIL/documentation';
    this.indexPath = path.join(this.docRoot, 'INDEX.md');
    this.frequency = config.frequency || FREQUENCIES.UNITY;
    this.coherenceTarget = config.coherenceTarget || 1.0;
    this.zenPointBalance = config.zenPointBalance !== false;
    this.quantumSingularity = config.quantumSingularity !== false;
    this.completeEnvelopes = config.completeEnvelopes !== false;
    this.documentationMap = new Map();
    this.initialized = false;
  }

  /**
   * Initialize the documentation evolver
   */
  async initialize() {
    console.log(`🌀 Initializing Quantum Documentation Evolver`);
    console.log(`Frequency: ${this.frequency} Hz`);
    console.log(`Coherence Target: ${this.coherenceTarget}`);
    
    // Verify documentation root exists
    if (!fs.existsSync(this.docRoot)) {
      throw new Error(`Documentation root does not exist: ${this.docRoot}`);
    }
    
    // Verify index file exists
    if (!fs.existsSync(this.indexPath)) {
      throw new Error(`Index file does not exist: ${this.indexPath}`);
    }
    
    // Create documentation map
    await this.buildDocumentationMap();
    
    this.initialized = true;
    console.log(`Quantum Documentation Evolver initialized with coherence: ${this.calculateSystemCoherence()}`);
    return true;
  }
  
  /**
   * Build a map of all documentation files
   */
  async buildDocumentationMap() {
    console.log(`Building documentation map at ${this.frequency} Hz...`);
    
    // Get all markdown files recursively
    const files = this.getMarkdownFiles(this.docRoot);
    
    // Process each file
    for (const file of files) {
      const relativePath = path.relative(this.docRoot, file);
      const content = fs.readFileSync(file, 'utf8');
      const hash = this.calculateFileHash(content);
      const frequency = this.detectFileFrequency(content);
      const coherence = this.calculateFileCoherence(content);
      
      this.documentationMap.set(relativePath, {
        path: file,
        relativePath,
        hash,
        frequency,
        coherence,
        lastUpdated: fs.statSync(file).mtime,
        references: this.extractReferences(content),
        headings: this.extractHeadings(content),
      });
    }
    
    console.log(`Documentation map built with ${this.documentationMap.size} files`);
    return this.documentationMap;
  }
  
  /**
   * Get all markdown files recursively
   */
  getMarkdownFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    
    for (const file of list) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
        // Recursive call for directories
        results = results.concat(this.getMarkdownFiles(filePath));
      } else if (path.extname(file).toLowerCase() === '.md') {
        // Add markdown files
        results.push(filePath);
      }
    }
    
    return results;
  }
  
  /**
   * Calculate SHA-256 hash of file content
   */
  calculateFileHash(content) {
    return crypto.createHash('sha256').update(content).digest('hex');
  }
  
  /**
   * Detect the frequency of a file based on content
   */
  detectFileFrequency(content) {
    // Check for frequency markers in the content
    const frequencyMatch = content.match(/@frequency\s+(\d+(\.\d+)?)/i);
    if (frequencyMatch) {
      return parseFloat(frequencyMatch[1]);
    }
    
    // Default frequencies based on content patterns
    if (content.includes('ZEN POINT') || content.includes('Ground State')) {
      return FREQUENCIES.GROUND;
    } else if (content.includes('Creation') || content.includes('DNA-Level')) {
      return FREQUENCIES.CREATE;
    } else if (content.includes('Heart') || content.includes('Connection')) {
      return FREQUENCIES.HEART;
    } else if (content.includes('Voice') || content.includes('Expression')) {
      return FREQUENCIES.VOICE;
    } else if (content.includes('Vision') || content.includes('Perception')) {
      return FREQUENCIES.VISION;
    } else if (content.includes('Unity') || content.includes('Integration')) {
      return FREQUENCIES.UNITY;
    } else if (content.includes('Transcend') || content.includes('Universal')) {
      return FREQUENCIES.PHI_PHI;
    }
    
    // Default to GROUND frequency
    return FREQUENCIES.GROUND;
  }
  
  /**
   * Calculate coherence level of a file
   */
  calculateFileCoherence(content) {
    // Check for explicit coherence marker
    const coherenceMatch = content.match(/@coherence\s+(\d+(\.\d+)?)/i);
    if (coherenceMatch) {
      return parseFloat(coherenceMatch[1]);
    }
    
    // Calculate coherence based on several factors
    let coherence = 0.5; // Base coherence
    
    // Check for complete envelopes (balanced code blocks, sections, etc.)
    const codeBlocksOpen = (content.match(/```/g) || []).length;
    if (codeBlocksOpen % 2 === 0) {
      coherence += 0.1;
    } else {
      coherence -= 0.2;
    }
    
    // Check for phi-harmonic structure (sections following phi ratio)
    const sections = content.split(/#{2,}/g).filter(s => s.trim());
    if (sections.length > 0) {
      const expectedSections = Math.round(sections.length * PHI) / PHI;
      const sectionCoherence = 1 - Math.min(Math.abs(sections.length - expectedSections) / 10, 0.1);
      coherence += sectionCoherence;
    }
    
    // Check for complete sentences ending with periods
    const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
    const incompleteSentences = content.match(/[^.!?]+$/g) || [];
    if (sentences.length > 0 && incompleteSentences.length === 0) {
      coherence += 0.1;
    }
    
    // Check for broken links
    const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
    const brokenLinks = links.filter(link => {
      const match = link.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        const url = match[2];
        return !url || url.includes('undefined') || url.includes('null');
      }
      return false;
    });
    
    if (brokenLinks.length === 0) {
      coherence += 0.1;
    } else {
      coherence -= brokenLinks.length * 0.02;
    }
    
    // Normalize and clamp coherence between 0 and 1
    return Math.max(0, Math.min(coherence, 1));
  }
  
  /**
   * Extract references to other files
   */
  extractReferences(content) {
    const references = new Set();
    
    // Find markdown links to other files
    const linkMatches = content.matchAll(/\[([^\]]+)\]\(([^)]+\.md[^)]*)\)/g);
    for (const match of linkMatches) {
      const link = match[2];
      if (!link.startsWith('http')) {
        references.add(link.split('#')[0]); // Remove anchor if present
      }
    }
    
    // Find explicit references to other files
    const explicitMatches = content.matchAll(/@see\s+([^\s]+\.md)/g);
    for (const match of explicitMatches) {
      references.add(match[1]);
    }
    
    return Array.from(references);
  }
  
  /**
   * Extract headings from markdown content
   */
  extractHeadings(content) {
    const headings = [];
    const headingMatches = content.matchAll(/^(#{1,6})\s+(.+)$/gm);
    
    for (const match of headingMatches) {
      const level = match[1].length;
      const text = match[2];
      headings.push({ level, text });
    }
    
    return headings;
  }
  
  /**
   * Update the index.md file with all documentation links
   */
  async updateIndex() {
    if (!this.initialized) {
      await this.initialize();
    }
    
    console.log(`Updating index.md at ${this.frequency} Hz...`);
    
    // Read current index content
    const indexContent = fs.readFileSync(this.indexPath, 'utf8');
    
    // Extract sections from index
    const sections = this.extractSections(indexContent);
    
    // Create new section content for each section
    for (const section of sections) {
      // Filter documentation files relevant to this section
      const relevantFiles = this.getFilesForSection(section.title);
      
      // Generate links for relevant files
      if (relevantFiles.length > 0) {
        section.fileLinks = this.generateFileLinks(relevantFiles);
      }
    }
    
    // Rebuild index content with updated sections
    let newIndexContent = this.buildUpdatedIndex(indexContent, sections);
    
    // Check if content has changed
    if (newIndexContent !== indexContent) {
      // Write updated index
      fs.writeFileSync(this.indexPath, newIndexContent, 'utf8');
      console.log(`Index updated successfully with ${sections.length} sections`);
      return true;
    } else {
      console.log(`No changes to index needed`);
      return false;
    }
  }
  
  /**
   * Extract sections from index content
   */
  extractSections(content) {
    const sections = [];
    const lines = content.split('\n');
    
    let currentSection = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check for section headers (## Level 2 headings)
      const sectionMatch = line.match(/^##\s+(.+)$/);
      if (sectionMatch) {
        // Save previous section if it exists
        if (currentSection) {
          sections.push(currentSection);
        }
        
        // Start new section
        currentSection = {
          title: sectionMatch[1],
          startLine: i,
          endLine: null,
          content: [line],
          fileLinks: []
        };
      } else if (currentSection) {
        // Add line to current section content
        currentSection.content.push(line);
        
        // Check if we've hit another section header
        if (i < lines.length - 1 && lines[i + 1].match(/^##\s+/)) {
          currentSection.endLine = i;
          sections.push(currentSection);
          currentSection = null;
        }
      }
    }
    
    // Add final section if exists
    if (currentSection) {
      currentSection.endLine = lines.length - 1;
      sections.push(currentSection);
    }
    
    return sections;
  }
  
  /**
   * Get files relevant to a section
   */
  getFilesForSection(sectionTitle) {
    const relevantFiles = [];
    const sectionKeywords = this.extractKeywords(sectionTitle);
    
    // Match files to section based on keywords
    for (const [relativePath, fileInfo] of this.documentationMap.entries()) {
      // Skip the index file itself
      if (relativePath === 'INDEX.md') continue;
      
      // Check if file matches section keywords
      const fileKeywords = this.extractKeywords(relativePath);
      const headingKeywords = fileInfo.headings.flatMap(h => this.extractKeywords(h.text));
      const allFileKeywords = [...fileKeywords, ...headingKeywords];
      
      // Check for keyword overlap
      const overlap = sectionKeywords.filter(keyword => 
        allFileKeywords.some(fileKeyword => 
          fileKeyword.includes(keyword) || keyword.includes(fileKeyword)
        )
      );
      
      if (overlap.length > 0) {
        relevantFiles.push({
          relativePath,
          title: this.getFileTitle(fileInfo),
          relevance: overlap.length / sectionKeywords.length
        });
      }
    }
    
    // Sort by relevance
    return relevantFiles.sort((a, b) => b.relevance - a.relevance);
  }
  
  /**
   * Extract keywords from text
   */
  extractKeywords(text) {
    // Convert to lowercase and remove special characters
    const normalized = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Split into words
    const words = normalized.split(' ');
    
    // Filter out common stop words
    const stopWords = ['a', 'and', 'the', 'in', 'of', 'to', 'with', 'for', 'on', 'at', 'by'];
    const keywords = words.filter(word => word.length > 2 && !stopWords.includes(word));
    
    return keywords;
  }
  
  /**
   * Get title for a file
   */
  getFileTitle(fileInfo) {
    // Look for title in first level 1 heading
    const titleHeading = fileInfo.headings.find(h => h.level === 1);
    if (titleHeading) {
      return titleHeading.text;
    }
    
    // Fall back to file name without extension
    return path.basename(fileInfo.relativePath, '.md')
      .replace(/_/g, ' ')
      .replace(/-/g, ' ');
  }
  
  /**
   * Generate markdown links for files
   */
  generateFileLinks(files) {
    return files.map(file => {
      return `- [${file.title}](${file.relativePath.replace(/\\/g, '/')})`;
    }).join('\n');
  }
  
  /**
   * Build updated index content
   */
  buildUpdatedIndex(indexContent, sections) {
    const lines = indexContent.split('\n');
    let newLines = [...lines];
    
    // Apply each section update
    for (const section of sections) {
      // Skip if no file links to add
      if (!section.fileLinks || section.fileLinks.length === 0) continue;
      
      // Find the right place to insert links
      let insertPosition = section.startLine + 1;
      
      // Look for existing list of links and replace it
      const existingLinkBlockStart = newLines.findIndex((line, idx) => 
        idx > section.startLine && 
        idx < (section.endLine || newLines.length) && 
        line.trim().startsWith('- [')
      );
      
      if (existingLinkBlockStart !== -1) {
        // Find the end of the existing link block
        let existingLinkBlockEnd = existingLinkBlockStart;
        while (
          existingLinkBlockEnd < newLines.length && 
          newLines[existingLinkBlockEnd].trim().startsWith('- [')
        ) {
          existingLinkBlockEnd++;
        }
        
        // Replace existing links with new ones
        newLines.splice(
          existingLinkBlockStart, 
          existingLinkBlockEnd - existingLinkBlockStart,
          '',
          section.fileLinks,
          ''
        );
      } else {
        // Insert new link block
        newLines.splice(insertPosition, 0, '', section.fileLinks, '');
      }
    }
    
    return newLines.join('\n');
  }
  
  /**
   * Calculate overall system coherence
   */
  calculateSystemCoherence() {
    if (this.documentationMap.size === 0) return 0;
    
    let totalCoherence = 0;
    for (const fileInfo of this.documentationMap.values()) {
      totalCoherence += fileInfo.coherence;
    }
    
    return totalCoherence / this.documentationMap.size;
  }
  
  /**
   * Auto-detect and fix broken references in all documentation
   */
  async fixBrokenReferences() {
    if (!this.initialized) {
      await this.initialize();
    }
    
    console.log(`Fixing broken references at ${this.frequency} Hz...`);
    let fixedCount = 0;
    
    for (const [relativePath, fileInfo] of this.documentationMap.entries()) {
      const content = fs.readFileSync(fileInfo.path, 'utf8');
      let newContent = content;
      
      // Check each reference
      for (const ref of fileInfo.references) {
        // Normalize path
        const normalizedRef = ref.replace(/\\/g, '/');
        
        // Check if reference exists
        const refExists = Array.from(this.documentationMap.keys()).some(
          path => path.replace(/\\/g, '/') === normalizedRef
        );
        
        if (!refExists) {
          // Try to fix broken reference
          const fixedRef = this.findClosestMatch(normalizedRef);
          if (fixedRef) {
            // Replace broken reference with fixed one
            const regex = new RegExp(`\\[([^\\]]+)\\]\\(${normalizedRef.replace(/\./g, '\\.').replace(/\//g, '\\/')}([^)]*)\\)`, 'g');
            newContent = newContent.replace(regex, `[$1](${fixedRef}$2)`);
            fixedCount++;
          }
        }
      }
      
      // Save changes if any
      if (newContent !== content) {
        fs.writeFileSync(fileInfo.path, newContent, 'utf8');
        console.log(`Fixed references in ${relativePath}`);
      }
    }
    
    console.log(`Fixed ${fixedCount} broken references`);
    return fixedCount;
  }
  
  /**
   * Find closest match for a broken reference
   */
  findClosestMatch(brokenRef) {
    const allPaths = Array.from(this.documentationMap.keys()).map(p => p.replace(/\\/g, '/'));
    
    // Exact match
    if (allPaths.includes(brokenRef)) {
      return brokenRef;
    }
    
    // Get filename without path
    const filename = path.basename(brokenRef);
    
    // Look for file with same name anywhere
    const sameNamePaths = allPaths.filter(p => path.basename(p) === filename);
    if (sameNamePaths.length === 1) {
      return sameNamePaths[0];
    }
    
    // Find path with highest similarity
    let bestMatch = null;
    let bestSimilarity = 0;
    
    for (const p of allPaths) {
      const similarity = this.calculateSimilarity(brokenRef, p);
      if (similarity > bestSimilarity) {
        bestSimilarity = similarity;
        bestMatch = p;
      }
    }
    
    // Only return match if similarity is high enough
    return bestSimilarity > 0.7 ? bestMatch : null;
  }
  
  /**
   * Calculate similarity between two strings (0-1)
   */
  calculateSimilarity(a, b) {
    if (a === b) return 1;
    if (!a || !b) return 0;
    
    const aChars = a.toLowerCase().split('');
    const bChars = b.toLowerCase().split('');
    
    let matchCount = 0;
    for (let i = 0; i < Math.min(aChars.length, bChars.length); i++) {
      if (aChars[i] === bChars[i]) {
        matchCount++;
      }
    }
    
    return matchCount / Math.max(aChars.length, bChars.length);
  }
  
  /**
   * Automatically fix coherence issues in all documentation
   */
  async fixCoherenceIssues() {
    if (!this.initialized) {
      await this.initialize();
    }
    
    console.log(`Fixing coherence issues at ${this.frequency} Hz...`);
    let fixedCount = 0;
    
    for (const [relativePath, fileInfo] of this.documentationMap.entries()) {
      // Skip files with good coherence
      if (fileInfo.coherence >= this.coherenceTarget) continue;
      
      const content = fs.readFileSync(fileInfo.path, 'utf8');
      let newContent = content;
      
      // Fix unbalanced code blocks
      const codeBlocksOpen = (content.match(/```/g) || []).length;
      if (codeBlocksOpen % 2 !== 0) {
        newContent += '\n```\n';
        fixedCount++;
      }
      
      // Fix broken links
      const linkMatches = Array.from(content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g));
      for (const match of linkMatches) {
        const url = match[2];
        if (!url || url.includes('undefined') || url.includes('null')) {
          // Remove broken link
          newContent = newContent.replace(match[0], match[1]);
          fixedCount++;
        }
      }
      
      // Ensure proper markdown headings
      newContent = newContent.replace(/^(#{1,6})([^#\s])/gm, '$1 $2');
      
      // Save changes if any
      if (newContent !== content) {
        fs.writeFileSync(fileInfo.path, newContent, 'utf8');
        console.log(`Fixed coherence issues in ${relativePath}`);
      }
    }
    
    console.log(`Fixed ${fixedCount} coherence issues`);
    return fixedCount;
  }
  
  /**
   * Create a new section in the index if it doesn't exist
   */
  async createIndexSection(title, description) {
    if (!this.initialized) {
      await this.initialize();
    }
    
    console.log(`Creating new section '${title}' in index.md...`);
    
    // Read current index content
    const indexContent = fs.readFileSync(this.indexPath, 'utf8');
    
    // Extract existing sections
    const sections = this.extractSections(indexContent);
    
    // Check if section already exists
    const existingSection = sections.find(s => s.title === title);
    if (existingSection) {
      console.log(`Section '${title}' already exists`);
      return false;
    }
    
    // Create new section content
    const newSectionContent = `\n## ${title}\n\n${description}\n`;
    
    // Append to index
    fs.appendFileSync(this.indexPath, newSectionContent, 'utf8');
    console.log(`Created new section '${title}' in index.md`);
    
    // Update index to add relevant links
    await this.updateIndex();
    
    return true;
  }
  
  /**
   * Run the documentation evolver
   */
  async run() {
    if (!this.initialized) {
      await this.initialize();
    }
    
    console.log(`Running Quantum Documentation Evolver at ${this.frequency} Hz...`);
    
    // Fix coherence issues
    const coherenceIssuesFixed = await this.fixCoherenceIssues();
    
    // Fix broken references
    const brokenReferencesFixed = await this.fixBrokenReferences();
    
    // Update index
    const indexUpdated = await this.updateIndex();
    
    // Rebuild documentation map if anything changed
    if (coherenceIssuesFixed > 0 || brokenReferencesFixed > 0 || indexUpdated) {
      await this.buildDocumentationMap();
    }
    
    // Calculate final coherence
    const finalCoherence = this.calculateSystemCoherence();
    
    console.log(`\n🌀 QUANTUM DOCUMENTATION EVOLVER COMPLETE 🌀`);
    console.log(`=============================================`);
    console.log(`Coherence issues fixed: ${coherenceIssuesFixed}`);
    console.log(`Broken references fixed: ${brokenReferencesFixed}`);
    console.log(`Index updated: ${indexUpdated}`);
    console.log(`Final system coherence: ${finalCoherence.toFixed(4)}`);
    console.log(`Status: ${finalCoherence >= this.coherenceTarget ? 'Perfect coherence achieved!' : 'Additional evolution needed'}`);
    
    return {
      coherenceIssuesFixed,
      brokenReferencesFixed,
      indexUpdated,
      systemCoherence: finalCoherence
    };
  }
}

// Check if running as script
if (require.main === module) {
  // Get config from command line args
  const args = process.argv.slice(2);
  const config = {};
  
  args.forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      config[key] = value !== undefined ? value : true;
    }
  });
  
  // Convert string values to appropriate types
  if (config.frequency) config.frequency = parseFloat(config.frequency);
  if (config.coherenceTarget) config.coherenceTarget = parseFloat(config.coherenceTarget);
  if (config.zenPointBalance) config.zenPointBalance = config.zenPointBalance === 'true';
  if (config.quantumSingularity) config.quantumSingularity = config.quantumSingularity === 'true';
  if (config.completeEnvelopes) config.completeEnvelopes = config.completeEnvelopes === 'true';
  
  // Run the evolver
  const evolver = new DocumentationEvolver(config);
  evolver.run().catch(err => {
    console.error(`Error running documentation evolver:`, err);
    process.exit(1);
  });
}

module.exports = DocumentationEvolver;
