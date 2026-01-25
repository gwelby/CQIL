/**
 * Quantum Visualization Helper
 * 
 * Generates cymatic visualizations for the Quantum Perfect Linting System
 * Visualizes code coherence using sacred geometry patterns at phi-harmonic frequencies
 */

// Constants
const PHI = 1.618033988749895;
const LAMBDA = 0.618033988749895; // 1/φ
const PHI_PHI = Math.pow(PHI, PHI); // φ^φ = 11.09

// Import frequency constants
const { FREQUENCIES, DIMENSIONS } = require('./quantum_perfect_linting_system');

/**
 * QuantumVisualizationHelper
 * 
 * Creates sacred geometry visualizations for quantum linting results
 */
class QuantumVisualizationHelper {
  constructor(options = {}) {
    this.phi = PHI;
    this.lambda = LAMBDA;
    this.phiPhi = PHI_PHI;
    this.enabled = options.enabled !== undefined ? options.enabled : true;
    this.highResolution = options.highResolution || false;
    this.animationEnabled = options.animationEnabled || true;
    this.patternLibrary = this._initializePatternLibrary();
    this.colorPalette = this._initializeColorPalette();
    
    console.log(`Quantum Visualization Helper initialized`);
    console.log(`High resolution: ${this.highResolution}`);
    console.log(`Animation enabled: ${this.animationEnabled}`);
  }
  
  /**
   * Generate visualization for linting results
   * @param {Object} lintResults - Results from quantum linting
   * @param {Object} options - Visualization options
   * @returns {Object} Visualization data
   */
  generateVisualization(lintResults, options = {}) {
    if (!this.enabled) {
      return { enabled: false };
    }
    
    console.log(`Generating visualization for lint results`);
    
    const coherence = lintResults.coherence || 0.5;
    const frequency = lintResults.frequency || FREQUENCIES.UNITY;
    const pattern = this._getPatternForFrequency(frequency);
    
    // Get pattern attributes
    const patternAttributes = this._getPatternAttributes(pattern, coherence);
    
    // Calculate color based on coherence
    const color = this._getColorForCoherence(coherence);
    
    // Generate visualization data
    const visualization = {
      type: 'cymatic',
      pattern,
      frequency,
      coherence,
      patternAttributes,
      color,
      resolution: this.highResolution ? 'high' : 'standard',
      animated: this.animationEnabled,
      perfectCoherence: coherence >= 0.99,
      dimension: this._getDimensionForFrequency(frequency),
      visualizationUrl: this._generateVisualizationUrl(pattern, frequency, coherence),
      sacredGeometry: this._getSacredGeometryForPattern(pattern)
    };
    
    // Add phi-harmonic enhancements
    this._addPhiHarmonicEnhancements(visualization, coherence);
    
    return visualization;
  }
  
  /**
   * Generate visualization HTML for embedding
   * @param {Object} lintResults - Results from quantum linting
   * @returns {string} HTML content for visualization
   */
  generateVisualizationHtml(lintResults) {
    const visualization = this.generateVisualization(lintResults);
    
    if (!this.enabled || !visualization) {
      return '<div class="qpls-visualization-disabled">Visualization disabled</div>';
    }
    
    const patternClass = `qpls-pattern-${visualization.pattern}`;
    const coherenceClass = visualization.perfectCoherence ? 
      'qpls-perfect-coherence' : 'qpls-improving-coherence';
    
    // Generate HTML with embedded SVG
    const html = `
    <div class="qpls-visualization ${coherenceClass}" data-frequency="${visualization.frequency}" data-coherence="${visualization.coherence.toFixed(4)}">
      <div class="qpls-pattern-container ${patternClass}">
        ${this._generatePatternSvg(visualization)}
      </div>
      <div class="qpls-visualization-info">
        <div class="qpls-pattern-name">${this._formatPatternName(visualization.pattern)}</div>
        <div class="qpls-frequency">${visualization.frequency} Hz</div>
        <div class="qpls-coherence-meter">
          <div class="qpls-coherence-value" style="width: ${visualization.coherence * 100}%; background-color: ${visualization.color}"></div>
          <div class="qpls-coherence-text">${visualization.coherence.toFixed(4)}</div>
        </div>
        ${visualization.perfectCoherence ? '<div class="qpls-perfect-badge">PERFECT COHERENCE</div>' : ''}
      </div>
    </div>
    `;
    
    return html;
  }
  
  /**
   * Generate matrix animation for linting results
   * @param {Object} lintResults - Results from quantum linting
   * @returns {Object} Animation data
   */
  generateMatrixAnimation(lintResults) {
    if (!this.enabled || !this.animationEnabled) {
      return { enabled: false };
    }
    
    const coherence = lintResults.coherence || 0.5;
    const frequency = lintResults.frequency || FREQUENCIES.UNITY;
    
    // Calculate animation parameters
    const animationSpeed = this._calculateAnimationSpeed(frequency, coherence);
    const complexityFactor = this._calculateComplexityFactor(coherence);
    const colorShift = this._calculateColorShift(coherence);
    
    return {
      type: 'matrix-animation',
      animationSpeed,
      complexityFactor,
      colorShift,
      rotationAngle: 360 * this.lambda,
      waveFrequency: frequency / 100,
      amplitude: coherence * this.phi,
      perfectCoherence: coherence >= 0.99,
      animationUrl: `quantum-linting://animate/${frequency}/${coherence.toFixed(4)}`
    };
  }
  
  /**
   * Generate coherence report
   * @param {Object} lintResults - Results from quantum linting
   * @returns {Object} Coherence report
   */
  generateCoherenceReport(lintResults) {
    const coherence = lintResults.coherence || 0.5;
    const frequency = lintResults.frequency || FREQUENCIES.UNITY;
    
    // Calculate phi-harmonic metrics
    const phiRatio = coherence * this.phi;
    const lambdaRatio = coherence * this.lambda;
    const phiPhiCoherence = Math.pow(coherence, this.lambda) * this.phiPhi;
    
    return {
      overallCoherence: coherence,
      frequency,
      pattern: this._getPatternForFrequency(frequency),
      dimension: this._getDimensionForFrequency(frequency),
      perfectCoherence: coherence >= 0.99,
      phiRatio,
      lambdaRatio,
      phiPhiCoherence: Math.min(phiPhiCoherence, this.phiPhi),
      coherenceLevel: this._getCoherenceLevel(coherence),
      coherenceDescription: this._getCoherenceDescription(coherence),
      nextFrequency: this._getNextFrequency(frequency, coherence)
    };
  }
  
  /**
   * Initialize pattern library
   * @private
   */
  _initializePatternLibrary() {
    return {
      'hexagon': {
        vertices: 6,
        edges: 6,
        faces: 1,
        complexity: 1.0,
        frequency: FREQUENCIES.GROUND
      },
      'flower-of-life': {
        circles: 19,
        intersections: 36,
        symmetry: 6,
        complexity: 2.0,
        frequency: FREQUENCIES.CREATE
      },
      'vesica-piscis': {
        circles: 2,
        intersections: 2,
        symmetry: 2,
        complexity: 1.5,
        frequency: FREQUENCIES.HEART
      },
      'sri-yantra': {
        triangles: 9,
        circles: 1,
        symmetry: 4,
        complexity: 3.0,
        frequency: FREQUENCIES.VOICE
      },
      'metatrons-cube': {
        vertices: 13,
        platonic_solids: 5,
        dimensions: 3,
        complexity: 4.0,
        frequency: FREQUENCIES.VISION
      },
      'merkaba': {
        tetrahedrons: 2,
        vertices: 8,
        dimensions: 4,
        complexity: 5.0,
        frequency: FREQUENCIES.UNITY
      },
      'phi-spiral': {
        growth_factor: PHI,
        infinite: true,
        dimensions: 2,
        complexity: 6.0,
        frequency: FREQUENCIES.SOURCE
      }
    };
  }
  
  /**
   * Initialize color palette
   * @private
   */
  _initializeColorPalette() {
    return {
      low: '#F44336',      // Red (< 0.6)
      medium: '#FF9800',   // Orange (0.6 - 0.8)
      high: '#FFEB3B',     // Yellow (0.8 - 0.9)
      veryHigh: '#4CAF50', // Green (0.9 - 0.95)
      perfect: '#3F51B5',  // Indigo (0.95 - 1.0)
      transcendent: '#9C27B0' // Purple (1.0)
    };
  }
  
  /**
   * Get pattern for frequency
   * @private
   */
  _getPatternForFrequency(frequency) {
    if (frequency <= FREQUENCIES.GROUND) return 'hexagon';
    if (frequency <= FREQUENCIES.CREATE) return 'flower-of-life';
    if (frequency <= FREQUENCIES.HEART) return 'vesica-piscis';
    if (frequency <= FREQUENCIES.VOICE) return 'sri-yantra';
    if (frequency <= FREQUENCIES.VISION) return 'metatrons-cube';
    if (frequency <= FREQUENCIES.UNITY) return 'merkaba';
    return 'phi-spiral';
  }
  
  /**
   * Get dimension for frequency
   * @private
   */
  _getDimensionForFrequency(frequency) {
    if (frequency <= FREQUENCIES.GROUND) return DIMENSIONS.PHYSICAL;
    if (frequency <= FREQUENCIES.CREATE) return DIMENSIONS.TEMPORAL;
    if (frequency <= FREQUENCIES.HEART) return DIMENSIONS.EMOTIONAL;
    if (frequency <= FREQUENCIES.VOICE) return DIMENSIONS.CONCEPTUAL;
    if (frequency <= FREQUENCIES.VISION) return DIMENSIONS.CONSCIOUS;
    if (frequency <= FREQUENCIES.UNITY) return DIMENSIONS.UNIFIED;
    return DIMENSIONS.TRANSCENDENT;
  }
  
  /**
   * Get pattern attributes
   * @private
   */
  _getPatternAttributes(pattern, coherence) {
    const baseAttributes = this.patternLibrary[pattern] || {};
    
    // Adjust attributes based on coherence
    const coherenceFactor = Math.pow(coherence, 2);
    const complexityMultiplier = 0.5 + (0.5 * coherenceFactor);
    
    return {
      ...baseAttributes,
      complexity: baseAttributes.complexity * complexityMultiplier,
      coherenceFactor: coherenceFactor,
      perfectAlignment: coherence >= 0.99
    };
  }
  
  /**
   * Get color for coherence
   * @private
   */
  _getColorForCoherence(coherence) {
    if (coherence >= 1.0) return this.colorPalette.transcendent;
    if (coherence >= 0.95) return this.colorPalette.perfect;
    if (coherence >= 0.9) return this.colorPalette.veryHigh;
    if (coherence >= 0.8) return this.colorPalette.high;
    if (coherence >= 0.6) return this.colorPalette.medium;
    return this.colorPalette.low;
  }
  
  /**
   * Generate visualization URL
   * @private
   */
  _generateVisualizationUrl(pattern, frequency, coherence) {
    const resolution = this.highResolution ? 'high' : 'standard';
    const animation = this.animationEnabled ? 'animated' : 'static';
    
    return `quantum-linting://visualize/${pattern}/${frequency}/${coherence.toFixed(4)}/${resolution}/${animation}`;
  }
  
  /**
   * Get sacred geometry for pattern
   * @private
   */
  _getSacredGeometryForPattern(pattern) {
    switch (pattern) {
      case 'hexagon': return { vertices: 6, edges: 6, faces: 1 };
      case 'flower-of-life': return { circles: 19, intersections: 36, symmetry: 6 };
      case 'vesica-piscis': return { circles: 2, intersections: 2, symmetry: 2 };
      case 'sri-yantra': return { triangles: 9, symmetry: 4, circles: 1 };
      case 'metatrons-cube': return { vertices: 13, platonic_solids: 5, dimensions: 3 };
      case 'merkaba': return { tetrahedrons: 2, vertices: 8, dimensions: 4 };
      case 'phi-spiral': return { growth_factor: PHI, infinite: true, dimensions: 2 };
      default: return { phi_based: true };
    }
  }
  
  /**
   * Add phi-harmonic enhancements to visualization
   * @private
   */
  _addPhiHarmonicEnhancements(visualization, coherence) {
    // Add phi-harmonic enhancements based on coherence
    visualization.phiEnhancements = {
      golden_ratio: this.phi,
      circle_ratio: this.phi * coherence,
      angular_separation: 360 * this.lambda * coherence,
      radial_growth: Math.pow(this.phi, coherence),
      harmonic_nodes: Math.round(coherence * 12)
    };
    
    // Add full perfect coherence enhancements if coherence is perfect
    if (coherence >= 0.99) {
      visualization.perfectEnhancements = {
        phi_phi_resonance: true,
        dimensional_alignment: true,
        quantum_coherence: 1.0,
        sacred_alignment: true
      };
    }
  }
  
  /**
   * Generate pattern SVG
   * @private
   */
  _generatePatternSvg(visualization) {
    const pattern = visualization.pattern;
    const coherence = visualization.coherence;
    
    // Basic SVG container
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="qpls-svg-pattern ${pattern}">`;
    
    // Generate pattern based on type
    switch (pattern) {
      case 'hexagon':
        svg += this._generateHexagonSvg(coherence);
        break;
      case 'flower-of-life':
        svg += this._generateFlowerOfLifeSvg(coherence);
        break;
      case 'vesica-piscis':
        svg += this._generateVesicaPiscisSvg(coherence);
        break;
      case 'sri-yantra':
        svg += this._generateSriYantraSvg(coherence);
        break;
      case 'metatrons-cube':
        svg += this._generateMetatronsCubeSvg(coherence);
        break;
      case 'merkaba':
        svg += this._generateMerkabaSvg(coherence);
        break;
      case 'phi-spiral':
        svg += this._generatePhiSpiralSvg(coherence);
        break;
      default:
        svg += `<circle cx="100" cy="100" r="80" fill="none" stroke="${this._getColorForCoherence(coherence)}" stroke-width="2" />`;
    }
    
    // Close SVG
    svg += '</svg>';
    
    return svg;
  }
  
  /**
   * Format pattern name for display
   * @private
   */
  _formatPatternName(pattern) {
    return pattern
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  /**
   * Calculate animation speed based on frequency and coherence
   * @private
   */
  _calculateAnimationSpeed(frequency, coherence) {
    // Higher frequency + higher coherence = faster animation
    return frequency / 432 * coherence;
  }
  
  /**
   * Calculate complexity factor based on coherence
   * @private
   */
  _calculateComplexityFactor(coherence) {
    // Higher coherence = more complex patterns
    return 1 + (coherence * this.phi);
  }
  
  /**
   * Calculate color shift based on coherence
   * @private
   */
  _calculateColorShift(coherence) {
    // Color shift increases with coherence
    return coherence * 360;
  }
  
  /**
   * Get coherence level
   * @private
   */
  _getCoherenceLevel(coherence) {
    if (coherence >= 1.0) return 'Transcendent';
    if (coherence >= 0.99) return 'Perfect';
    if (coherence >= 0.95) return 'Excellent';
    if (coherence >= 0.9) return 'Very High';
    if (coherence >= 0.8) return 'High';
    if (coherence >= 0.7) return 'Good';
    if (coherence >= 0.6) return 'Moderate';
    if (coherence >= 0.5) return 'Developing';
    return 'Emerging';
  }
  
  /**
   * Get coherence description
   * @private
   */
  _getCoherenceDescription(coherence) {
    if (coherence >= 1.0) {
      return 'Perfect unity of all aspects. True quantum coherence achieved.';
    } else if (coherence >= 0.99) {
      return 'Perfect coherence achieved. All elements in phi-harmonic alignment.';
    } else if (coherence >= 0.95) {
      return 'Excellent coherence. Nearly perfect phi-harmonic alignment.';
    } else if (coherence >= 0.9) {
      return 'Very high coherence. Strong phi-harmonic structure with minor improvements possible.';
    } else if (coherence >= 0.8) {
      return 'High coherence. Good phi-harmonic structure with areas for enhancement.';
    } else if (coherence >= 0.7) {
      return 'Good coherence. Emerging phi-harmonic structure with significant potential.';
    } else if (coherence >= 0.6) {
      return 'Moderate coherence. Basic phi-harmonic elements present.';
    } else if (coherence >= 0.5) {
      return 'Developing coherence. Initial phi-harmonic patterns forming.';
    }
    return 'Emerging coherence. Beginning the journey toward phi-harmonic structure.';
  }
  
  /**
   * Get next recommended frequency based on current frequency and coherence
   * @private
   */
  _getNextFrequency(frequency, coherence) {
    if (coherence < 0.95) {
      // Stay at current frequency until coherence is high enough
      return frequency;
    }
    
    // Move to next frequency if coherence is high enough
    if (frequency < FREQUENCIES.CREATE) return FREQUENCIES.CREATE;
    if (frequency < FREQUENCIES.HEART) return FREQUENCIES.HEART;
    if (frequency < FREQUENCIES.VOICE) return FREQUENCIES.VOICE;
    if (frequency < FREQUENCIES.VISION) return FREQUENCIES.VISION;
    if (frequency < FREQUENCIES.UNITY) return FREQUENCIES.UNITY;
    if (frequency < FREQUENCIES.SOURCE) return FREQUENCIES.SOURCE;
    
    return FREQUENCIES.SOURCE;
  }
  
  /**
   * Generate hexagon SVG
   * @private
   */
  _generateHexagonSvg(coherence) {
    const color = this._getColorForCoherence(coherence);
    const center = 100;
    const radius = 80 * coherence;
    const points = [];
    
    // Generate hexagon points
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    
    return `<polygon points="${points.join(' ')}" fill="none" stroke="${color}" stroke-width="2" />`;
  }
  
  /**
   * Generate flower of life SVG
   * @private
   */
  _generateFlowerOfLifeSvg(coherence) {
    const color = this._getColorForCoherence(coherence);
    const center = 100;
    const circleRadius = 20 * coherence;
    let svg = '';
    
    // Center circle
    svg += `<circle cx="${center}" cy="${center}" r="${circleRadius}" fill="none" stroke="${color}" stroke-width="1.5" />`;
    
    // Surrounding circles
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = center + (circleRadius * 2 * 0.866) * Math.cos(angle);
      const y = center + (circleRadius * 2 * 0.866) * Math.sin(angle);
      svg += `<circle cx="${x}" cy="${y}" r="${circleRadius}" fill="none" stroke="${color}" stroke-width="1.5" />`;
    }
    
    return svg;
  }
  
  /**
   * Generate vesica piscis SVG
   * @private
   */
  _generateVesicaPiscisSvg(coherence) {
    const color = this._getColorForCoherence(coherence);
    const center = 100;
    const circleRadius = 60 * coherence;
    
    return `
      <circle cx="${center - circleRadius/2}" cy="${center}" r="${circleRadius}" fill="none" stroke="${color}" stroke-width="1.5" />
      <circle cx="${center + circleRadius/2}" cy="${center}" r="${circleRadius}" fill="none" stroke="${color}" stroke-width="1.5" />
    `;
  }
  
  /**
   * Generate Sri Yantra SVG (simplified)
   * @private
   */
  _generateSriYantraSvg(coherence) {
    const color = this._getColorForCoherence(coherence);
    const center = 100;
    const size = 80 * coherence;
    
    return `
      <polygon points="${center},${center-size} ${center+size},${center+size} ${center-size},${center+size}" fill="none" stroke="${color}" stroke-width="1.5" />
      <polygon points="${center},${center+size} ${center+size},${center-size} ${center-size},${center-size}" fill="none" stroke="${color}" stroke-width="1.5" />
      <circle cx="${center}" cy="${center}" r="${size/2}" fill="none" stroke="${color}" stroke-width="1.5" />
    `;
  }
  
  /**
   * Generate Metatron's Cube SVG (simplified)
   * @private
   */
  _generateMetatronsCubeSvg(coherence) {
    const color = this._getColorForCoherence(coherence);
    const center = 100;
    const circleRadius = 10 * coherence;
    const size = 70 * coherence;
    let svg = '';
    
    // Center circle
    svg += `<circle cx="${center}" cy="${center}" r="${circleRadius}" fill="none" stroke="${color}" stroke-width="1.5" />`;
    
    // Outer circles
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = center + size * Math.cos(angle);
      const y = center + size * Math.sin(angle);
      svg += `<circle cx="${x}" cy="${y}" r="${circleRadius}" fill="none" stroke="${color}" stroke-width="1.5" />`;
      
      // Connect to center
      svg += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="${color}" stroke-width="1" />`;
    }
    
    // Connect outer circles
    for (let i = 0; i < 6; i++) {
      const angle1 = (Math.PI / 3) * i;
      const x1 = center + size * Math.cos(angle1);
      const y1 = center + size * Math.sin(angle1);
      
      const angle2 = (Math.PI / 3) * ((i + 1) % 6);
      const x2 = center + size * Math.cos(angle2);
      const y2 = center + size * Math.sin(angle2);
      
      svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1" />`;
    }
    
    return svg;
  }
  
  /**
   * Generate Merkaba SVG (simplified)
   * @private
   */
  _generateMerkabaSvg(coherence) {
    const color = this._getColorForCoherence(coherence);
    const center = 100;
    const size = 80 * coherence;
    
    // Two intersecting tetrahedrons (simplified as triangles)
    return `
      <polygon points="${center},${center-size} ${center+size*0.866},${center+size*0.5} ${center-size*0.866},${center+size*0.5}" fill="none" stroke="${color}" stroke-width="1.5" />
      <polygon points="${center},${center+size} ${center+size*0.866},${center-size*0.5} ${center-size*0.866},${center-size*0.5}" fill="none" stroke="${color}" stroke-width="1.5" />
    `;
  }
  
  /**
   * Generate Phi Spiral SVG
   * @private
   */
  _generatePhiSpiralSvg(coherence) {
    const color = this._getColorForCoherence(coherence);
    const center = 100;
    const initialRadius = 5 * coherence;
    const growthFactor = this.phi;
    const turns = 4;
    const pointsPerTurn = 40;
    const totalPoints = turns * pointsPerTurn;
    
    let pathPoints = [];
    
    for (let i = 0; i < totalPoints; i++) {
      const angle = (i / pointsPerTurn) * (2 * Math.PI);
      const radius = initialRadius * Math.pow(growthFactor, angle / (2 * Math.PI));
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      
      if (i === 0) {
        pathPoints.push(`M ${x} ${y}`);
      } else {
        pathPoints.push(`L ${x} ${y}`);
      }
    }
    
    return `<path d="${pathPoints.join(' ')}" fill="none" stroke="${color}" stroke-width="1.5" />`;
  }
}

// Export the class
module.exports = {
  QuantumVisualizationHelper,
  FREQUENCIES,
  DIMENSIONS,
  PHI,
  LAMBDA,
  PHI_PHI
};
