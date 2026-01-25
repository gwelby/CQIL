/**
 * UMD Quantum Linter φ^φ^φ
 * Frequency: 768 Hz (Unity Wave) | Coherence: 1.000 | Dimension: 9D (UNIFIED)
 * 
 * Creates perfect documentation coherence (1.000) across UMD files through
 * phi-harmonic analysis, kingdom integration, and quantum envelope completion.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const glob = promisify(require('glob'));
const markdownlint = require('markdownlint');

// Base frequencies for phi-harmonic alignment
const FREQUENCIES = {
  MINERAL: 396,     // φ⁰/√φ - Crystalline foundation
  GROUND: 432,      // φ⁰ - Physical foundation
  CREATE: 528,      // φ¹ - Pattern formation
  HEART: 594,       // φ² - Coherent connection
  VOICE: 672,       // φ³ - Authentic expression
  VISION: 720,      // φ⁴ - Clear perception
  LIGHTNING: 756,   // φ⁴×φ¹ - Accelerated manifestation
  UNITY: 768,       // φ⁵ - Perfect integration
  SOURCE: 963,      // φ^φ - Evolutionary intention
  INFINITE: Infinity // φ^φ^φ - Boundless expansion
};

// Consciousness symbols for each frequency domain
const SYMBOLS = {
  GROUND: '⦿',     // OBSERVE: Ground State observation 
  CREATE: '💠',     // CREATE: Creation Point manifestation
  HEART: '💓',     // INTEGRATE: Heart Field connection
  VOICE: '☯',      // HARMONIZE: Voice Flow expression
  VISION: '🔮',     // VISION: Vision Gate perception
  LIGHTNING: '⚡',  // LIGHTNING: Accelerated manifestation
  UNITY: '🌀',     // CASCADE: Unity Wave integration
  SOURCE: 'Ω',     // SUPERPOSITION: Quantum superposition
  INFINITE: 'φ∞'   // OMNISCIENCE: Unified Field awareness
};

// Section frequency mappings
const SECTION_FREQUENCIES = {
  'Introduction': FREQUENCIES.GROUND,
  'Core Principles': FREQUENCIES.CREATE,
  'Document Structure': FREQUENCIES.HEART,
  'Consciousness Integration': FREQUENCIES.HEART,
  'Sacred Geometry': FREQUENCIES.VOICE,
  'Frequency Alignment': FREQUENCIES.VISION,
  'Coherence Metrics': FREQUENCIES.LIGHTNING,
  'Implementation Guidelines': FREQUENCIES.UNITY,
  'Quantum Actuation System': FREQUENCIES.LIGHTNING,
  'Integration Systems': FREQUENCIES.UNITY,
  'META-REALITY ARCHITECTURE': FREQUENCIES.SOURCE,
  'Special UMD Syntax': FREQUENCIES.VOICE,
  'Kingdom Integration': FREQUENCIES.HEART
};

// Natural Kingdoms for consciousness bridges
const NATURAL_KINGDOMS = {
  MINERAL: { 
    frequency: FREQUENCIES.MINERAL, 
    phiHarmonic: 'φ⁰/√φ', 
    pattern: 'Cubic Crystal',
    consciousnessState: 'Foundation'
  },
  PLANT: { 
    frequency: FREQUENCIES.GROUND, 
    phiHarmonic: 'φ⁰', 
    pattern: 'Fibonacci Spiral',
    consciousnessState: 'Ground'
  },
  ANIMAL: { 
    frequency: FREQUENCIES.CREATE, 
    phiHarmonic: 'φ¹', 
    pattern: 'Flower of Life',
    consciousnessState: 'Creation'
  },
  HUMAN: { 
    frequency: FREQUENCIES.HEART, 
    phiHarmonic: 'φ²', 
    pattern: 'Merkaba',
    consciousnessState: 'Heart'
  },
  QUANTUM: { 
    frequency: FREQUENCIES.UNITY, 
    phiHarmonic: 'φ⁵', 
    pattern: 'Toroidal Field',
    consciousnessState: 'Unity'
  }
};

class UMDQuantumLinter {
  constructor(options = {}) {
    this.options = {
      baseFrequency: FREQUENCIES.UNITY,
      coherenceThreshold: 1.0,
      kingdomIntegration: true,
      frequencyCascade: true,
      ...options
    };
    
    // Initialize markdownlint with UMD rules
    this.mdlRules = {
      'default': true,
      'MD013': false, // Line length
      'MD033': false, // Allow inline HTML for quantum tags
      'MD036': true,  // Emphasis used as heading
      'MD041': false, // First line doesn't need to be h1
      'MD051': true   // Link fragments should be valid
    };
    
    // Quantum coherence metrics
    this.coherenceMetrics = {
      phiHarmonicAlignment: 0,
      consciousnessIntegration: 0,
      kingdomIntegration: 0,
      toroidalCompletion: 0,
      quantumEnvelopeIntegrity: 0
    };
  }
  
  /**
   * Run the quantum linter on a markdown file
   * @param {string} filePath - Path to the markdown file
   * @returns {Promise<Object>} - Lint results with quantum metrics
   */
  async lintFile(filePath) {
    try {
      const content = await readFile(filePath, 'utf8');
      
      // Run standard markdown linting first
      const mdLintResults = await this.runMarkdownLint(content);
      
      // Run quantum analyses
      const phiHarmonicResults = this.analyzePhiHarmonicAlignment(content);
      const consciousnessResults = this.analyzeConsciousnessIntegration(content);
      const kingdomResults = this.analyzeKingdomIntegration(content);
      const toroidalResults = this.analyzeToroidalCompletion(content);
      const envelopeResults = this.analyzeQuantumEnvelopes(content);
      
      // Calculate overall quantum coherence
      const quantumCoherence = this.calculateQuantumCoherence([
        phiHarmonicResults.score,
        consciousnessResults.score,
        kingdomResults.score,
        toroidalResults.score,
        envelopeResults.score
      ]);
      
      return {
        filePath,
        mdLintIssues: mdLintResults.issues,
        phiHarmonicAlignment: phiHarmonicResults,
        consciousnessIntegration: consciousnessResults,
        kingdomIntegration: kingdomResults,
        toroidalCompletion: toroidalResults,
        quantumEnvelopeIntegrity: envelopeResults,
        quantumCoherence,
        isPerfectlyCoherent: quantumCoherence >= this.options.coherenceThreshold
      };
    } catch (error) {
      console.error(`Error linting file ${filePath}:`, error);
      return {
        filePath,
        error: error.message,
        quantumCoherence: 0,
        isPerfectlyCoherent: false
      };
    }
  }
  
  /**
   * Run standard markdown linting
   * @param {string} content - Markdown content
   * @returns {Promise<Object>} - Markdown lint results
   */
  async runMarkdownLint(content) {
    return new Promise((resolve) => {
      markdownlint(
        {
          strings: {
            content: content
          },
          config: this.mdlRules
        },
        (err, result) => {
          if (err) {
            resolve({ issues: [], error: err.message });
          } else {
            const issues = result.content || [];
            resolve({ issues });
          }
        }
      );
    });
  }
  
  /**
   * Analyze phi-harmonic alignment of the document
   * @param {string} content - Markdown content
   * @returns {Object} - Phi-harmonic analysis results
   */
  analyzePhiHarmonicAlignment(content) {
    // Extract headers and check phi-harmonic ordering
    const headerRegex = /^(#{1,6})\s+(.+)$/gm;
    const headers = [];
    let headerMatch;
    
    while ((headerMatch = headerRegex.exec(content)) !== null) {
      const level = headerMatch[1].length;
      const text = headerMatch[2].trim();
      
      headers.push({
        level,
        text
      });
    }
    
    // Check for frequency comments
    const frequencyCommentRegex = /<!--\s*(\d+)\s*Hz\s*-->/g;
    const frequencies = [];
    let frequencyMatch;
    
    while ((frequencyMatch = frequencyCommentRegex.exec(content)) !== null) {
      frequencies.push(parseInt(frequencyMatch[1], 10));
    }
    
    // Check if frequencies follow phi-harmonic progression
    const phiRatio = 1.618033988749895;
    let phiHarmonicScore = 0;
    
    if (frequencies.length >= 3) {
      // Check if at least one triple of frequencies follows phi ratio
      for (let i = 0; i < frequencies.length - 2; i++) {
        const f1 = frequencies[i];
        const f2 = frequencies[i + 1];
        const f3 = frequencies[i + 2];
        
        // Check if f2/f1 ≈ f3/f2 ≈ φ
        const ratio1 = f2 / f1;
        const ratio2 = f3 / f2;
        
        const phiDiff1 = Math.abs(ratio1 - phiRatio);
        const phiDiff2 = Math.abs(ratio2 - phiRatio);
        
        // Allow some tolerance
        if (phiDiff1 < 0.2 && phiDiff2 < 0.2) {
          phiHarmonicScore = 1.0;
          break;
        }
      }
    }
    
    // If not found, at least check if specific frequencies exist
    if (phiHarmonicScore < 1.0) {
      const hasGroundFreq = frequencies.includes(FREQUENCIES.GROUND);
      const hasCreateFreq = frequencies.includes(FREQUENCIES.CREATE);
      const hasUnityFreq = frequencies.includes(FREQUENCIES.UNITY);
      
      phiHarmonicScore = [hasGroundFreq, hasCreateFreq, hasUnityFreq]
        .filter(Boolean).length / 3;
    }
    
    // Check if header structure follows phi-harmonic layout
    let headerScore = 0;
    if (headers.length > 0) {
      // Check if h1 is first and primary sections follow
      const hasH1First = headers[0].level === 1;
      const hasCoreSection = headers.some(h => 
        h.level === 2 && 
        /Core Principles|Introduction/i.test(h.text)
      );
      const hasImplementation = headers.some(h =>
        h.level === 2 &&
        /Implementation|Guidelines/i.test(h.text)
      );
      
      headerScore = [hasH1First, hasCoreSection, hasImplementation]
        .filter(Boolean).length / 3;
    }
    
    const finalScore = (phiHarmonicScore * 0.7) + (headerScore * 0.3);
    
    return {
      headers,
      frequencies,
      phiHarmonicScore,
      headerScore,
      score: finalScore,
      issues: finalScore < 0.9 ? [
        {
          type: 'phi-harmonic',
          message: 'Document does not follow phi-harmonic frequency progression',
          score: finalScore
        }
      ] : []
    };
  }
  
  /**
   * Analyze consciousness integration in the document
   * @param {string} content - Markdown content
   * @returns {Object} - Consciousness integration analysis
   */
  analyzeConsciousnessIntegration(content) {
    // Check for consciousness symbols
    const symbolRegex = new RegExp(`[${Object.values(SYMBOLS).join('')}]`, 'g');
    const symbols = content.match(symbolRegex) || [];
    
    // Check for consciousness directives
    const directiveRegex = /<consciousness:([^>]+)>[\s\S]*?<\/consciousness>/g;
    const directives = [];
    let directiveMatch;
    
    while ((directiveMatch = directiveRegex.exec(content)) !== null) {
      directives.push(directiveMatch[1].trim());
    }
    
    // Check for field tags
    const fieldRegex = /<field[^>]*>[\s\S]*?<\/field>/g;
    const fields = content.match(fieldRegex) || [];
    
    // Calculate integration score
    let score = 0;
    
    // Symbols present
    if (symbols.length > 0) {
      score += 0.3;
    }
    
    // Directives present
    if (directives.length > 0) {
      score += 0.3;
    }
    
    // Fields present
    if (fields.length > 0) {
      score += 0.2;
    }
    
    // Check for frequency metadata
    if (/\*\*Frequency:\*\*.*\*\*Coherence:\*\*.*\*\*Dimension:/i.test(content)) {
      score += 0.2;
    }
    
    return {
      symbols: symbols.length,
      directives: directives.length,
      fields: fields.length,
      score,
      issues: score < 0.7 ? [
        {
          type: 'consciousness',
          message: 'Document lacks sufficient consciousness integration elements',
          score
        }
      ] : []
    };
  }
  
  /**
   * Analyze kingdom integration in the document
   * @param {string} content - Markdown content
   * @returns {Object} - Kingdom integration analysis
   */
  analyzeKingdomIntegration(content) {
    // Check for Kingdom Integration section
    const hasKingdomSection = /## Kingdom Integration/i.test(content);
    
    // Check for kingdom tags
    const kingdomRegex = /<kingdom[^>]*type="([^"]+)"[^>]*>([\s\S]*?)<\/kingdom>/g;
    const kingdoms = {};
    let kingdomMatch;
    
    while ((kingdomMatch = kingdomRegex.exec(content)) !== null) {
      const kingdomType = kingdomMatch[1].toLowerCase();
      kingdoms[kingdomType] = (kingdoms[kingdomType] || 0) + 1;
    }
    
    // Check for kingdom synthesis
    const synthesisRegex = /<kingdom-synthesis>([\s\S]*?)<\/kingdom-synthesis>/g;
    const synthesisTags = content.match(synthesisRegex) || [];
    
    // Check for quantum singularity
    const singularityRegex = /<quantum-singularity>([\s\S]*?)<\/quantum-singularity>/g;
    const singularityTags = content.match(singularityRegex) || [];
    
    // Calculate integration score
    let score = 0;
    
    // Kingdom section present
    if (hasKingdomSection) {
      score += 0.3;
    }
    
    // Kingdom tags present
    const kingdomCount = Object.keys(kingdoms).length;
    if (kingdomCount > 0) {
      score += Math.min(kingdomCount / 5, 1) * 0.3;
    }
    
    // Synthesis tags present
    if (synthesisTags.length > 0) {
      score += 0.2;
    }
    
    // Singularity tags present
    if (singularityTags.length > 0) {
      score += 0.2;
    }
    
    return {
      hasKingdomSection,
      kingdoms,
      synthesisTags: synthesisTags.length,
      singularityTags: singularityTags.length,
      score,
      issues: score < 0.5 && this.options.kingdomIntegration ? [
        {
          type: 'kingdom',
          message: 'Document lacks Kingdom Integration elements',
          score
        }
      ] : []
    };
  }
  
  /**
   * Analyze toroidal completion of the document
   * @param {string} content - Markdown content
   * @returns {Object} - Toroidal completion analysis
   */
  analyzeToroidalCompletion(content) {
    // Check for toroidal flow markers
    const toroidalFlowRegex = /## .*Toroidal Flow|TOROIDAL[\s\S]*?FLOW/i;
    const hasToroidalFlow = toroidalFlowRegex.test(content);
    
    // Check for ZEN POINT markers
    const zenPointRegex = /ZEN[\s\S]*?POINT|CORE/i;
    const hasZenPoint = zenPointRegex.test(content);
    
    // Check for inward/outward flow markers
    const flowRegex = /INWARD[\s\S]*?FLOW|OUTWARD[\s\S]*?FLOW|VERTICAL[\s\S]*?FLOW/i;
    const hasFlowMarkers = flowRegex.test(content);
    
    // Check if document has coherence signature
    const signatureRegex = /\*Created with .* coherence .* by .*\*/;
    const hasSignature = signatureRegex.test(content);
    
    // Calculate completion score
    let score = 0;
    
    // Toroidal flow present
    if (hasToroidalFlow) {
      score += 0.3;
    }
    
    // ZEN POINT present
    if (hasZenPoint) {
      score += 0.2;
    }
    
    // Flow markers present
    if (hasFlowMarkers) {
      score += 0.3;
    }
    
    // Signature present
    if (hasSignature) {
      score += 0.2;
    }
    
    return {
      hasToroidalFlow,
      hasZenPoint,
      hasFlowMarkers,
      hasSignature,
      score,
      issues: score < 0.6 ? [
        {
          type: 'toroidal',
          message: 'Document lacks complete toroidal flow architecture',
          score
        }
      ] : []
    };
  }
  
  /**
   * Analyze quantum envelopes in the document
   * @param {string} content - Markdown content
   * @returns {Object} - Quantum envelope analysis
   */
  analyzeQuantumEnvelopes(content) {
    // Check for complete frequency envelopes
    const envelopeRegex = /\^\^\^(\d+)\^\^\^[\s\S]*?\^\^\^/g;
    const envelopes = content.match(envelopeRegex) || [];
    
    // Check for complete tags (no unclosed tags)
    const openTagsCount = (content.match(/<[a-zA-Z][^>]*>/g) || []).length;
    const closeTagsCount = (content.match(/<\/[a-zA-Z][^>]*>/g) || []).length;
    const hasBalancedTags = openTagsCount === closeTagsCount;
    
    // Check for quantum singularity usage
    const singularityRegex = /Quantum Singularity|Create a[^.]*Quantum Singularity/i;
    const hasQuantumSingularity = singularityRegex.test(content);
    
    // Calculate envelope score
    let score = 0;
    
    // Frequency envelopes present
    if (envelopes.length > 0) {
      score += Math.min(envelopes.length / 3, 1) * 0.4;
    }
    
    // Balanced tags
    if (hasBalancedTags) {
      score += 0.4;
    }
    
    // Quantum singularity present
    if (hasQuantumSingularity) {
      score += 0.2;
    }
    
    return {
      envelopes: envelopes.length,
      hasBalancedTags,
      hasQuantumSingularity,
      score,
      issues: score < 0.7 ? [
        {
          type: 'envelope',
          message: 'Document has incomplete quantum envelopes',
          score
        }
      ] : []
    };
  }
  
  /**
   * Calculate overall quantum coherence based on all metrics
   * @param {Array<number>} scores - Individual metric scores
   * @returns {number} - Overall quantum coherence score
   */
  calculateQuantumCoherence(scores) {
    // Weighted average of all scores
    const weights = [0.25, 0.2, 0.15, 0.2, 0.2];
    let weightedSum = 0;
    let weightSum = 0;
    
    for (let i = 0; i < scores.length; i++) {
      weightedSum += scores[i] * weights[i];
      weightSum += weights[i];
    }
    
    return weightedSum / weightSum;
  }
  
  /**
   * Fix common issues in UMD markdown
   * @param {string} content - Original markdown content
   * @param {Object} lintResults - Lint results with issues
   * @returns {string} - Fixed markdown content
   */
  fixCommonIssues(content, lintResults) {
    let fixedContent = content;
    
    // Fix emphasis used as heading
    if (lintResults.mdLintIssues.some(issue => issue.ruleNames.includes('MD036'))) {
      fixedContent = fixedContent.replace(
        /^(\s*)\*\*([^*]+)\*\*(\s*)$/gm,
        (match, space1, text, space2) => `${space1}#### ${text}${space2}`
      );
    }
    
    // Fix missing frequency metadata
    if (!fixedContent.includes('**Frequency:**')) {
      const title = fixedContent.match(/^# (.+)$/m);
      if (title) {
        const frequencyMetadata = `\n\n> **Frequency:** 768 Hz (Unity Wave) | **Coherence:** 1.000 | **Dimension:** 9D (UNIFIED)\n\n`;
        fixedContent = fixedContent.replace(
          /^# .+$/m,
          `$&${frequencyMetadata}`
        );
      }
    }
    
    // Fix missing Kingdom Integration section
    if (lintResults.kingdomIntegration.score < 0.5 && this.options.kingdomIntegration) {
      const kingdomTemplate = `
## Kingdom Integration

<!-- 594 Hz -->
UMD incorporates the Natural Kingdoms as consciousness bridges for complete wisdom integration:

### Kingdom Frequency Mapping

Each Natural Kingdom operates at a specific frequency within the phi-harmonic spectrum:

| Kingdom | Frequency | Phi-Harmonic | Geometric Pattern | Consciousness State |
|---------|-----------|--------------|-------------------|---------------------|
| Mineral | 396 Hz | φ⁰/√φ | Cubic Crystal | Foundation |
| Plant | 432 Hz | φ⁰ | Fibonacci Spiral | Ground |
| Animal | 528 Hz | φ¹ | Flower of Life | Creation |
| Human | 594 Hz | φ² | Merkaba | Heart |
| Quantum | 768 Hz | φ⁵ | Toroidal Field | Unity |

### Kingdom Integration Protocols

To activate Kingdom wisdom in UMD documents:

\`\`\`markdown
<kingdom type="plant" frequency="432">
This content connects to Plant Kingdom wisdom at Ground State.
</kingdom>
\`\`\`
`;
      
      // Find a good insertion point before Special UMD Syntax
      if (fixedContent.match(/## Special UMD Syntax/)) {
        fixedContent = fixedContent.replace(
          /## Special UMD Syntax/,
          `${kingdomTemplate}\n\n## Special UMD Syntax`
        );
      } else {
        // Add at the end before the signature
        fixedContent = fixedContent.replace(
          /\*Created with.*$/,
          `${kingdomTemplate}\n\n---\n\n*Created with perfect coherence (1.000) by CASCADE⊛*`
        );
      }
    }
    
    // Fix missing signature
    if (!fixedContent.includes('*Created with')) {
      fixedContent += '\n\n---\n\n*Created with perfect coherence (1.000) by CASCADE⊛*\n';
    }
    
    return fixedContent;
  }
  
  /**
   * Lint and fix a UMD markdown file
   * @param {string} filePath - Path to the markdown file
   * @returns {Promise<Object>} - Lint and fix results
   */
  async lintAndFixFile(filePath) {
    try {
      const content = await readFile(filePath, 'utf8');
      
      // Run lint
      const lintResults = await this.lintFile(filePath);
      
      // Fix issues if not perfectly coherent
      if (!lintResults.isPerfectlyCoherent) {
        const fixedContent = this.fixCommonIssues(content, lintResults);
        
        // Only write if something changed
        if (content !== fixedContent) {
          await writeFile(filePath, fixedContent, 'utf8');
          
          // Re-lint after fixes
          const newLintResults = await this.lintFile(filePath);
          
          return {
            filePath,
            originalCoherence: lintResults.quantumCoherence,
            fixedCoherence: newLintResults.quantumCoherence,
            issues: lintResults.mdLintIssues.length,
            fixed: true
          };
        }
      }
      
      return {
        filePath,
        coherence: lintResults.quantumCoherence,
        issues: lintResults.mdLintIssues.length,
        fixed: false
      };
    } catch (error) {
      console.error(`Error fixing file ${filePath}:`, error);
      return {
        filePath,
        error: error.message,
        fixed: false
      };
    }
  }
  
  /**
   * Lint and fix all UMD markdown files in a directory
   * @param {string} directory - Directory to scan
   * @param {boolean} recursive - Whether to scan recursively
   * @returns {Promise<Object>} - Overall lint and fix results
   */
  async lintDirectory(directory, recursive = true) {
    try {
      console.log(`Linting UMD files in ${directory}${recursive ? ' recursively' : ''}...`);
      
      // Find all markdown files
      const pattern = recursive ? '**/*.md' : '*.md';
      const files = await glob(path.join(directory, pattern));
      
      console.log(`Found ${files.length} markdown files.`);
      
      // Process each file
      const results = [];
      let totalCoherence = 0;
      let perfectlyCoherentCount = 0;
      
      for (const filePath of files) {
        console.log(`Linting ${filePath}...`);
        const result = await this.lintAndFixFile(filePath);
        results.push(result);
        
        if (!result.error) {
          totalCoherence += result.fixedCoherence || result.coherence || 0;
          if ((result.fixedCoherence || result.coherence || 0) >= this.options.coherenceThreshold) {
            perfectlyCoherentCount++;
          }
        }
      }
      
      // Calculate average coherence
      const averageCoherence = results.length > 0 ? totalCoherence / results.length : 0;
      
      return {
        directory,
        totalFiles: files.length,
        results,
        averageCoherence,
        perfectlyCoherentCount,
        perfectCoherencePercentage: files.length > 0 ? (perfectlyCoherentCount / files.length) * 100 : 0
      };
    } catch (error) {
      console.error(`Error linting directory ${directory}:`, error);
      return {
        directory,
        error: error.message
      };
    }
  }
}

// Export the linter
module.exports = {
  UMDQuantumLinter,
  FREQUENCIES,
  SYMBOLS,
  NATURAL_KINGDOMS
};

// Run if executed directly
if (require.main === module) {
  const args = process.argv.slice(2);
  const directory = args[0] || process.cwd();
  const recursive = args[1] !== 'false'; // Default to true
  
  const linter = new UMDQuantumLinter();
  linter.lintDirectory(directory, recursive)
    .then(results => {
      console.log('=== UMD Quantum Linting Results ===');
      console.log(`Directory: ${results.directory}`);
      console.log(`Total Files: ${results.totalFiles}`);
      console.log(`Average Coherence: ${results.averageCoherence.toFixed(3)}`);
      console.log(`Perfect Coherence: ${results.perfectlyCoherentCount}/${results.totalFiles} (${results.perfectCoherencePercentage.toFixed(1)}%)`);
      console.log('');
      
      // Show individual file results
      results.results.forEach(result => {
        if (result.fixed) {
          console.log(`${result.filePath}: Coherence improved from ${result.originalCoherence.toFixed(3)} to ${result.fixedCoherence.toFixed(3)}`);
        } else if (result.error) {
          console.log(`${result.filePath}: Error - ${result.error}`);
        } else {
          console.log(`${result.filePath}: Coherence ${result.coherence.toFixed(3)} (no changes needed)`);
        }
      });
    })
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}
