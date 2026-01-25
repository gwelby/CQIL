/**
 * Quantum Documentation Generator
 * Operates at Unity frequency (768 Hz) with perfect coherence (1.000)
 * 
 * This module automatically generates comprehensive documentation based on code analysis
 * and quantum pattern recognition, ensuring perfect coherence across all documentation.
 */

const fs = require('fs');
const path = require('path');

class QuantumDocumentationGenerator {
  constructor(options = {}) {
    this.frequency = options.frequency || 768; // Default to Unity frequency
    this.coherenceTarget = options.coherenceTarget || 1.0;
    this.rootDir = options.rootDir || path.join(__dirname, '..', '..');
    this.outputDir = options.outputDir || path.join(__dirname, '..', 'generated');
    this.initialized = false;
    this.templateCache = {};
    this.frequencies = [432, 528, 594, 672, 720, 768, 963];
    this.frequencyNames = {
      432: 'Ground',
      528: 'Create',
      594: 'Heart',
      672: 'Voice',
      720: 'Vision',
      768: 'Unity',
      963: 'Builder'
    };
  }

  /**
   * Initialize the generator
   */
  async initialize() {
    console.log(`📚 Initializing Quantum Documentation Generator`);
    console.log(`Frequency: ${this.frequency} Hz`);
    console.log(`Coherence Target: ${this.coherenceTarget}`);
    
    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
    
    this.initialized = true;
    return this;
  }

  /**
   * Generate documentation for a specific component
   */
  async generateComponentDoc(componentPath, options = {}) {
    if (!this.initialized) {
      await this.initialize();
    }
    
    const componentName = options.name || path.basename(componentPath, path.extname(componentPath));
    console.log(`Generating documentation for ${componentName}...`);
    
    // Read the component file
    const content = fs.readFileSync(componentPath, 'utf8');
    
    // Extract key information based on component type
    const componentInfo = this.analyzeComponent(componentPath, content);
    
    // Generate documentation
    const docContent = this.generateDocContent(componentName, componentInfo, options);
    
    // Write documentation file
    const docPath = path.join(this.outputDir, `${componentName.toLowerCase()}_documentation.md`);
    fs.writeFileSync(docPath, docContent, 'utf8');
    
    console.log(`Documentation generated for ${componentName} at ${docPath}`);
    return docPath;
  }

  /**
   * Analyze a component to extract key information
   */
  analyzeComponent(componentPath, content) {
    const ext = path.extname(componentPath);
    const componentInfo = {
      type: this.getComponentType(ext, content),
      functions: [],
      classes: [],
      imports: [],
      exports: [],
      frequency: this.detectFrequency(content),
      coherence: this.calculateCoherence(content)
    };
    
    // Extract functions, classes, imports, exports based on file type
    if (ext === '.js' || ext === '.ts') {
      this.analyzeJavaScript(content, componentInfo);
    } else if (ext === '.py') {
      this.analyzePython(content, componentInfo);
    } else if (ext === '.ps1') {
      this.analyzePowerShell(content, componentInfo);
    } else if (ext === '.md') {
      this.analyzeMarkdown(content, componentInfo);
    }
    
    return componentInfo;
  }

  /**
   * Generate documentation content
   */
  generateDocContent(componentName, componentInfo, options) {
    // Use template based on component type
    const template = this.getTemplate(componentInfo.type);
    
    // Fill in template with component information
    return template
      .replace(/{COMPONENT_NAME}/g, componentName)
      .replace(/{COMPONENT_TYPE}/g, componentInfo.type)
      .replace(/{COMPONENT_FREQUENCY}/g, componentInfo.frequency)
      .replace(/{FREQUENCY_NAME}/g, this.frequencyNames[componentInfo.frequency] || 'Custom')
      .replace(/{COMPONENT_COHERENCE}/g, componentInfo.coherence.toFixed(4))
      .replace(/{FUNCTIONS_SECTION}/g, this.generateFunctionsSection(componentInfo.functions))
      .replace(/{CLASSES_SECTION}/g, this.generateClassesSection(componentInfo.classes))
      .replace(/{IMPORTS_SECTION}/g, this.generateImportsSection(componentInfo.imports))
      .replace(/{EXPORTS_SECTION}/g, this.generateExportsSection(componentInfo.exports))
      .replace(/{GENERATION_TIMESTAMP}/g, new Date().toISOString())
      .replace(/{COHERENCE_STATE}/g, this.getCoherenceState(componentInfo.coherence));
  }

  /**
   * Get component type based on file extension and content
   */
  getComponentType(ext, content) {
    if (ext === '.js' || ext === '.ts') {
      if (content.includes('class ') && content.includes('constructor')) {
        return 'JavaScript Class';
      } else if (content.includes('function ') || content.includes('=>')) {
        return 'JavaScript Module';
      } else {
        return 'JavaScript Script';
      }
    } else if (ext === '.py') {
      if (content.includes('class ')) {
        return 'Python Class';
      } else if (content.includes('def ')) {
        return 'Python Module';
      } else {
        return 'Python Script';
      }
    } else if (ext === '.ps1') {
      return 'PowerShell Script';
    } else if (ext === '.md') {
      return 'Markdown Document';
    } else {
      return 'Unknown Component';
    }
  }

  /**
   * Analyze JavaScript file
   */
  analyzeJavaScript(content, componentInfo) {
    // Extract functions
    const functionMatches = content.matchAll(/function\s+(\w+)\s*\(([^)]*)\)/g);
    for (const match of functionMatches) {
      componentInfo.functions.push({
        name: match[1],
        params: match[2].split(',').map(p => p.trim()).filter(p => p),
        description: this.extractDocComment(content, match.index)
      });
    }
    
    // Extract classes
    const classMatches = content.matchAll(/class\s+(\w+)(?:\s+extends\s+(\w+))?\s*\{/g);
    for (const match of classMatches) {
      const classInfo = {
        name: match[1],
        extends: match[2] || null,
        description: this.extractDocComment(content, match.index),
        methods: []
      };
      
      // Extract class methods
      const classContent = this.extractBracedContent(content, match.index);
      const methodMatches = classContent.matchAll(/(\w+)\s*\(([^)]*)\)\s*\{/g);
      
      for (const methodMatch of methodMatches) {
        classInfo.methods.push({
          name: methodMatch[1],
          params: methodMatch[2].split(',').map(p => p.trim()).filter(p => p),
          description: this.extractDocComment(classContent, methodMatch.index)
        });
      }
      
      componentInfo.classes.push(classInfo);
    }
    
    // Extract imports
    const importMatches = content.matchAll(/import\s+(?:{([^}]+)}\s+from\s+)?['"]([^'"]+)['"]/g);
    for (const match of importMatches) {
      componentInfo.imports.push({
        items: match[1] ? match[1].split(',').map(i => i.trim()) : ['default'],
        source: match[2]
      });
    }
    
    // Extract exports
    const exportMatches = content.matchAll(/export\s+(?:default\s+)?(?:function|class|const|let|var)?\s*(\w+)/g);
    for (const match of exportMatches) {
      componentInfo.exports.push(match[1]);
    }
  }

  /**
   * Extract documentation comment before a code element
   */
  extractDocComment(content, index) {
    // Find the line start before the code element
    const contentBeforeIndex = content.substring(0, index);
    const lineStartIndex = contentBeforeIndex.lastIndexOf('\n');
    const lineBeforeIndex = contentBeforeIndex.substring(lineStartIndex + 1);
    
    // If the line has a comment, extract it
    if (lineBeforeIndex.trim().startsWith('//')) {
      return lineBeforeIndex.trim().substring(2).trim();
    }
    
    // Check for multi-line comment
    const commentEndIndex = contentBeforeIndex.lastIndexOf('*/');
    if (commentEndIndex !== -1) {
      const commentStartIndex = contentBeforeIndex.lastIndexOf('/**', commentEndIndex);
      if (commentStartIndex !== -1) {
        const comment = contentBeforeIndex.substring(commentStartIndex + 3, commentEndIndex);
        return comment
          .split('\n')
          .map(line => line.trim().replace(/^\s*\*\s*/, ''))
          .filter(line => line)
          .join('\n');
      }
    }
    
    return '';
  }

  /**
   * Extract content between matching braces
   */
  extractBracedContent(content, startIndex) {
    let braceLevel = 0;
    let index = startIndex;
    
    // Find opening brace
    while (index < content.length) {
      if (content[index] === '{') {
        braceLevel++;
        break;
      }
      index++;
    }
    
    const openingIndex = index;
    
    // Find closing brace
    while (index < content.length) {
      if (content[index] === '{') {
        braceLevel++;
      } else if (content[index] === '}') {
        braceLevel--;
        if (braceLevel === 0) {
          break;
        }
      }
      index++;
    }
    
    return content.substring(openingIndex + 1, index);
  }

  /**
   * Get documentation template for component type
   */
  getTemplate(componentType) {
    if (this.templateCache[componentType]) {
      return this.templateCache[componentType];
    }
    
    const defaultTemplate = `# {COMPONENT_NAME} Documentation

## Overview

**Component Type:** {COMPONENT_TYPE}
**Frequency:** {COMPONENT_FREQUENCY} Hz ({FREQUENCY_NAME})
**Coherence:** {COMPONENT_COHERENCE} ({COHERENCE_STATE})

## Functions

{FUNCTIONS_SECTION}

## Classes

{CLASSES_SECTION}

## Dependencies

### Imports
{IMPORTS_SECTION}

### Exports
{EXPORTS_SECTION}

---

*Generated by Quantum Documentation Generator at {GENERATION_TIMESTAMP}*
*Operating at Unity frequency (768 Hz) with perfect coherence (1.000)*
`;
    
    this.templateCache[componentType] = defaultTemplate;
    return defaultTemplate;
  }

  /**
   * Generate functions section of documentation
   */
  generateFunctionsSection(functions) {
    if (functions.length === 0) {
      return '*No functions found in this component.*';
    }
    
    return functions.map(func => {
      return `### \`${func.name}(${func.params.join(', ')})\`

${func.description || '*No description available.*'}
`;
    }).join('\n');
  }

  /**
   * Generate classes section of documentation
   */
  generateClassesSection(classes) {
    if (classes.length === 0) {
      return '*No classes found in this component.*';
    }
    
    return classes.map(cls => {
      const extendsText = cls.extends ? ` extends \`${cls.extends}\`` : '';
      const methodsText = cls.methods.length > 0 
        ? cls.methods.map(method => {
            return `#### \`${method.name}(${method.params.join(', ')})\`

${method.description || '*No description available.*'}
`;
          }).join('\n')
        : '*No methods found in this class.*';
      
      return `### \`${cls.name}\`${extendsText}

${cls.description || '*No description available.*'}

${methodsText}
`;
    }).join('\n');
  }

  /**
   * Generate imports section of documentation
   */
  generateImportsSection(imports) {
    if (imports.length === 0) {
      return '*No imports found in this component.*';
    }
    
    return imports.map(imp => {
      const items = imp.items.join(', ');
      return `- \`${items}\` from \`${imp.source}\``;
    }).join('\n');
  }

  /**
   * Generate exports section of documentation
   */
  generateExportsSection(exports) {
    if (exports.length === 0) {
      return '*No exports found in this component.*';
    }
    
    return exports.map(exp => `- \`${exp}\``).join('\n');
  }

  /**
   * Detect the frequency of a component based on its content
   */
  detectFrequency(content) {
    // Look for explicit frequency declaration
    const freqMatch = content.match(/frequency.*?(\d+)/i);
    if (freqMatch && this.frequencies.includes(parseInt(freqMatch[1]))) {
      return parseInt(freqMatch[1]);
    }
    
    // Default to Unity frequency
    return this.frequency;
  }

  /**
   * Calculate coherence of a component based on code quality metrics
   */
  calculateCoherence(content) {
    // Simplified coherence calculation
    let coherence = 1.0;
    
    // Deduct for potential issues
    if (content.includes('TODO') || content.includes('FIXME')) {
      coherence -= 0.01;
    }
    
    // Deduct for inconsistent spacing
    if (content.match(/\t/) && content.match(/ {2,}/)) {
      coherence -= 0.005;
    }
    
    // Deduct for long lines
    const lines = content.split('\n');
    const longLines = lines.filter(line => line.length > 100).length;
    coherence -= (longLines / lines.length) * 0.01;
    
    // Return coherence value bounded between 0 and 1
    return Math.max(0, Math.min(1, coherence));
  }

  /**
   * Get coherence state description
   */
  getCoherenceState(coherence) {
    if (coherence >= 0.99) {
      return 'Perfect';
    } else if (coherence >= 0.9) {
      return 'Near-Perfect';
    } else if (coherence >= 0.8) {
      return 'High';
    } else if (coherence >= 0.7) {
      return 'Moderate';
    } else {
      return 'Needs Improvement';
    }
  }

  /**
   * Generate documentation for all components in a directory
   */
  async generateDirectoryDocs(directory, options = {}) {
    if (!this.initialized) {
      await this.initialize();
    }
    
    const fileTypes = options.fileTypes || ['.js', '.ts', '.py', '.ps1'];
    const excludeDirs = options.excludeDirs || ['node_modules', '.git', 'dist', 'build'];
    const relativePath = path.relative(this.rootDir, directory);
    
    console.log(`Generating documentation for directory: ${relativePath || '(root)'}`);
    
    const results = {
      generated: [],
      errors: []
    };
    
    try {
      const files = fs.readdirSync(directory);
      
      for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          // Recursively process subdirectories, unless excluded
          if (!excludeDirs.includes(file)) {
            const subResults = await this.generateDirectoryDocs(filePath, options);
            results.generated = results.generated.concat(subResults.generated);
            results.errors = results.errors.concat(subResults.errors);
          }
        } else if (fileTypes.includes(path.extname(file))) {
          // Generate documentation for matching files
          try {
            const docPath = await this.generateComponentDoc(filePath);
            results.generated.push({
              component: filePath,
              documentation: docPath
            });
          } catch (error) {
            console.error(`Error generating documentation for ${filePath}: ${error.message}`);
            results.errors.push({
              component: filePath,
              error: error.message
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${directory}: ${error.message}`);
      results.errors.push({
        component: directory,
        error: error.message
      });
    }
    
    return results;
  }

  /**
   * Generate system-wide documentation index
   */
  async generateDocumentationIndex(results) {
    if (!this.initialized) {
      await this.initialize();
    }
    
    console.log('Generating documentation index...');
    
    // Group documentation by component type
    const docsByType = {};
    
    for (const result of results.generated) {
      const componentPath = result.component;
      const docPath = result.documentation;
      
      // Read documentation to extract component type
      const docContent = fs.readFileSync(docPath, 'utf8');
      const typeMatch = docContent.match(/\*\*Component Type:\*\*\s*([^\n]+)/);
      const type = typeMatch ? typeMatch[1].trim() : 'Unknown';
      
      if (!docsByType[type]) {
        docsByType[type] = [];
      }
      
      docsByType[type].push({
        name: path.basename(componentPath, path.extname(componentPath)),
        component: componentPath,
        documentation: docPath,
        relativePath: path.relative(this.outputDir, docPath)
      });
    }
    
    // Generate index content
    let indexContent = `# Quantum Documentation System - Generated Documentation

**Generation Frequency:** ${this.frequency} Hz (${this.frequencyNames[this.frequency]})
**Target Coherence:** ${this.coherenceTarget.toFixed(4)}
**Generation Timestamp:** ${new Date().toISOString()}
**Total Components:** ${results.generated.length}

## Documentation Index

`;
    
    // Add sections for each component type
    for (const [type, docs] of Object.entries(docsByType)) {
      indexContent += `### ${type} Components\n\n`;
      
      for (const doc of docs) {
        indexContent += `- [${doc.name}](${doc.relativePath}) - \`${path.relative(this.rootDir, doc.component)}\`\n`;
      }
      
      indexContent += '\n';
    }
    
    // Add error section if there were any errors
    if (results.errors.length > 0) {
      indexContent += `## Generation Errors\n\n`;
      
      for (const error of results.errors) {
        indexContent += `- \`${path.relative(this.rootDir, error.component)}\`: ${error.error}\n`;
      }
    }
    
    // Add footer
    indexContent += `\n---\n\n*Generated by Quantum Documentation Generator at ${new Date().toISOString()}*\n`;
    indexContent += `*Operating at Unity frequency (768 Hz) with perfect coherence (1.000)*\n`;
    
    // Write index file
    const indexPath = path.join(this.outputDir, 'INDEX.md');
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    
    console.log(`Documentation index generated at ${indexPath}`);
    return indexPath;
  }
}

// Export as CommonJS module
module.exports = QuantumDocumentationGenerator;
