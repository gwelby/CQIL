/**
 * 🌀 CYMATIC PATTERN VISUALIZER 🌀
 * 
 * Creates accurate cymatic pattern visualizations for each phi-harmonic frequency,
 * demonstrating how sound directly shapes matter through sacred geometric forms.
 * 
 * Operating at φ^φ PERFECTION LEVEL.
 */

// Import dependencies
const { CoreQuantumVisualizer } = require('./core-quantum-visualizer');
const { UniversalBridge } = require('./universal-bridge');

// Phi-harmonic constants
const PHI = 1.618033988749895;
const PHI_INVERSE = 0.618033988749895;

// Phi-harmonic frequency states
const FREQUENCIES = {
  GROUND: 432.0,    // Ground State (Earth connection) - φ⁰
  CREATION: 528.0,  // Creation Point (DNA/Heart resonance) - φ¹
  HEART: 594.0,     // Heart Field (Connection) - φ²
  VOICE: 672.0,     // Voice Flow (Expression) - φ³
  VISION: 720.0,    // Vision Gate (Perception) - φ⁴
  UNITY: 768.0      // Unity Wave (Consciousness) - φ⁵
};

/**
 * CymaticPatternVisualizer class
 * Creates accurate cymatic patterns for phi-harmonic frequencies
 */
class CymaticPatternVisualizer {
  /**
   * Create a new cymatic pattern visualizer
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    // Default configuration
    this.options = {
      container: null,
      frequency: FREQUENCIES.GROUND,
      autoConnect: true,
      showAllPatterns: false,
      materialType: 'water', // water, sand, crystal
      patternComplexity: 13,
      detailLevel: 'high',
      animation: true,
      ...options
    };
    
    // Initialize state
    this.state = {
      connected: false,
      activeFrequency: this.options.frequency,
      activeMaterial: this.options.materialType,
      activePatterns: [],
      patternInfo: {},
      bridge: null,
      visualizer: null,
      scene: null,
      renderer: null,
      camera: null,
      patterns: {}
    };
    
    // Register pattern definitions for each frequency
    this._registerPatterns();
    
    // Connect to universal bridge
    this._connectToBridge();
    
    // Initialize visualizer if in browser environment
    if (typeof window !== 'undefined') {
      console.log('Cymatic Pattern Visualizer initialized');
    }
  }
  
  /**
   * Register cymatic pattern definitions for each frequency
   * @private
   */
  _registerPatterns() {
    // Ground State (432 Hz): Hexagonal structures, foundational geometry
    this.state.patterns[FREQUENCIES.GROUND] = {
      name: 'Hexagonal Foundation',
      description: 'Foundational hexagonal geometry, earth connection pattern',
      type: 'hexagonal',
      complexity: this.options.patternComplexity,
      divisions: 6,
      nodesPerDivision: 8,
      symmetry: 6,
      amplitude: 0.5,
      wavelength: 0.15,
      harmonics: [1, 2, 3],
      color: 0x009900, // Green
      materials: {
        water: { opacity: 0.7, shininess: 30, refractionRatio: 0.98 },
        sand: { opacity: 1.0, shininess: 10, refractionRatio: 0.5 },
        crystal: { opacity: 0.8, shininess: 100, refractionRatio: 0.9 }
      }
    };
    
    // Creation Point (528 Hz): Star tetrahedron and flower of life patterns
    this.state.patterns[FREQUENCIES.CREATION] = {
      name: 'Flower of Life',
      description: 'Star tetrahedron and flower of life pattern, DNA resonance',
      type: 'flower-of-life',
      complexity: this.options.patternComplexity,
      divisions: 8,
      nodesPerDivision: 12,
      symmetry: 6,
      amplitude: 0.7,
      wavelength: 0.1,
      harmonics: [1, PHI, PHI * 2],
      color: 0xFFD700, // Gold
      materials: {
        water: { opacity: 0.8, shininess: 40, refractionRatio: 0.95 },
        sand: { opacity: 1.0, shininess: 15, refractionRatio: 0.5 },
        crystal: { opacity: 0.9, shininess: 120, refractionRatio: 0.93 }
      }
    };
    
    // Heart Field (594 Hz): Heart-shaped symmetrical patterns
    this.state.patterns[FREQUENCIES.HEART] = {
      name: 'Heart Resonance',
      description: 'Heart-shaped symmetrical pattern, emotional connection',
      type: 'heart-field',
      complexity: this.options.patternComplexity,
      divisions: 7,
      nodesPerDivision: 13,
      symmetry: 2,
      amplitude: 0.8,
      wavelength: 0.12,
      harmonics: [1, 1.5, PHI],
      color: 0xFF6347, // Tomato red
      materials: {
        water: { opacity: 0.75, shininess: 35, refractionRatio: 0.97 },
        sand: { opacity: 1.0, shininess: 12, refractionRatio: 0.5 },
        crystal: { opacity: 0.85, shininess: 110, refractionRatio: 0.91 }
      }
    };
    
    // Voice Flow (672 Hz): Complex mandala-like structures
    this.state.patterns[FREQUENCIES.VOICE] = {
      name: 'Sound Mandala',
      description: 'Complex mandala-like structures, vocal expression',
      type: 'mandala',
      complexity: this.options.patternComplexity,
      divisions: 8,
      nodesPerDivision: 16,
      symmetry: 8,
      amplitude: 0.6,
      wavelength: 0.08,
      harmonics: [1, PHI_INVERSE, PHI],
      color: 0x4169E1, // Royal blue
      materials: {
        water: { opacity: 0.8, shininess: 40, refractionRatio: 0.96 },
        sand: { opacity: 1.0, shininess: 15, refractionRatio: 0.5 },
        crystal: { opacity: 0.9, shininess: 120, refractionRatio: 0.92 }
      }
    };
    
    // Vision Gate (720 Hz): Multi-dimensional geometric networks
    this.state.patterns[FREQUENCIES.VISION] = {
      name: 'Geometric Network',
      description: 'Multi-dimensional geometric networks, clear perception',
      type: 'geometric-network',
      complexity: this.options.patternComplexity,
      divisions: 9,
      nodesPerDivision: 20,
      symmetry: 5,
      amplitude: 0.9,
      wavelength: 0.07,
      harmonics: [1, PHI, PHI * PHI],
      color: 0x9932CC, // Purple
      materials: {
        water: { opacity: 0.7, shininess: 45, refractionRatio: 0.97 },
        sand: { opacity: 1.0, shininess: 20, refractionRatio: 0.5 },
        crystal: { opacity: 0.9, shininess: 130, refractionRatio: 0.94 }
      }
    };
    
    // Unity Wave (768 Hz): Perfect toroidal energy fields
    this.state.patterns[FREQUENCIES.UNITY] = {
      name: 'Toroidal Field',
      description: 'Perfect toroidal energy fields, unified consciousness',
      type: 'toroidal-field',
      complexity: this.options.patternComplexity,
      divisions: 13,
      nodesPerDivision: 21,
      symmetry: 12,
      amplitude: 1.0,
      wavelength: 0.05,
      harmonics: [1, PHI_INVERSE, 1, PHI],
      color: 0xFFFFFF, // White
      materials: {
        water: { opacity: 0.85, shininess: 50, refractionRatio: 0.99 },
        sand: { opacity: 1.0, shininess: 25, refractionRatio: 0.6 },
        crystal: { opacity: 0.95, shininess: 150, refractionRatio: 0.96 }
      }
    };
  }
  
  /**
   * Connect to Universal Bridge
   * @private
   */
  _connectToBridge() {
    if (typeof window === 'undefined') return;
    
    // Connect to existing bridge if available
    if (window.CQIL_UNIVERSAL_BRIDGE) {
      this.state.bridge = window.CQIL_UNIVERSAL_BRIDGE;
      this.state.visualizer = this.state.bridge.visualizer;
      this.state.connected = true;
      
      // Register with bridge
      this.state.bridge.connectSystem(this, 'CymaticPatternVisualizer');
      
      console.log('Connected to existing Universal Quantum Bridge');
    } 
    // Create new bridge if needed and auto-connect is enabled
    else if (this.options.autoConnect) {
      this.state.bridge = new UniversalBridge({
        autoConnect: true,
        createVisualizer: true
      });
      
      this.state.visualizer = this.state.bridge.visualizer;
      this.state.connected = true;
      
      // Register with bridge
      this.state.bridge.connectSystem(this, 'CymaticPatternVisualizer');
      
      console.log('Created new Universal Quantum Bridge');
    }
    
    // Create initial pattern
    if (this.state.connected && this.state.visualizer) {
      this.visualizePattern(this.state.activeFrequency);
    }
  }
  
  /**
   * Receive message from bridge
   * @param {Object} message Message from bridge
   * @returns {boolean} Whether message was handled
   * @public
   */
  receiveFromBridge(message) {
    if (!message || !message.message) return false;
    
    const { message: content, from } = message;
    
    // Handle frequency change messages
    if (content.type === 'frequency-change' && typeof content.frequency === 'number') {
      this.setFrequency(content.frequency);
      return true;
    }
    
    // Handle material change messages
    if (content.type === 'material-change' && content.material) {
      this.setMaterial(content.material);
      return true;
    }
    
    // Handle visualization requests
    if (content.type === 'visualize-cymatic-pattern') {
      const frequency = content.frequency || this.state.activeFrequency;
      const material = content.material || this.state.activeMaterial;
      
      this.visualizePattern(frequency, { 
        material, 
        amplitude: content.amplitude,
        complexity: content.complexity
      });
      
      return true;
    }
    
    return false;
  }
  
  /**
   * Set active frequency
   * @param {number} frequency Frequency to visualize
   * @returns {boolean} Success
   * @public
   */
  setFrequency(frequency) {
    // Validate frequency
    if (typeof frequency !== 'number' || frequency <= 0) return false;
    
    // Update state
    this.state.activeFrequency = frequency;
    
    // Create new visualization
    this.visualizePattern(frequency);
    
    return true;
  }
  
  /**
   * Set active material
   * @param {string} material Material to use (water, sand, crystal)
   * @returns {boolean} Success
   * @public
   */
  setMaterial(material) {
    // Validate material
    if (!['water', 'sand', 'crystal'].includes(material)) return false;
    
    // Update state
    this.state.activeMaterial = material;
    
    // Create new visualization
    this.visualizePattern(this.state.activeFrequency);
    
    return true;
  }
  
  /**
   * Visualize cymatic pattern for a specific frequency
   * @param {number} frequency Target frequency
   * @param {Object} options Visualization options
   * @returns {Object} Created pattern
   * @public
   */
  visualizePattern(frequency, options = {}) {
    if (!this.state.connected || !this.state.visualizer) return null;
    
    // Find best pattern match for frequency
    const closestFreq = this._findClosestPatternFrequency(frequency);
    const pattern = this.state.patterns[closestFreq];
    
    if (!pattern) return null;
    
    // Merge options
    const config = {
      material: this.state.activeMaterial,
      amplitude: pattern.amplitude,
      complexity: pattern.complexity,
      ...options
    };
    
    // Get material properties
    const materialProps = pattern.materials[config.material];
    
    // Clear previous patterns if not showing all
    if (!this.options.showAllPatterns) {
      this._clearPatterns();
    }
    
    // Create pattern based on type
    let createdPattern = null;
    
    switch (pattern.type) {
      case 'hexagonal':
        createdPattern = this._createHexagonalPattern(frequency, pattern, materialProps, config);
        break;
      
      case 'flower-of-life':
        createdPattern = this._createFlowerOfLifePattern(frequency, pattern, materialProps, config);
        break;
      
      case 'heart-field':
        createdPattern = this._createHeartFieldPattern(frequency, pattern, materialProps, config);
        break;
      
      case 'mandala':
        createdPattern = this._createMandalaPattern(frequency, pattern, materialProps, config);
        break;
      
      case 'geometric-network':
        createdPattern = this._createGeometricNetworkPattern(frequency, pattern, materialProps, config);
        break;
      
      case 'toroidal-field':
        createdPattern = this._createToroidalFieldPattern(frequency, pattern, materialProps, config);
        break;
      
      default:
        // Create default pattern
        createdPattern = this.state.visualizer.createPatternForFrequency(
          frequency,
          {
            amplitude: config.amplitude,
            complexity: config.complexity,
            color: pattern.color,
            opacity: materialProps.opacity,
            duration: -1
          }
        );
    }
    
    // Store pattern info
    if (createdPattern) {
      this.state.patternInfo = {
        frequency,
        type: pattern.type,
        name: pattern.name,
        description: pattern.description,
        material: config.material,
        timestamp: Date.now()
      };
      
      // Add to active patterns
      this.state.activePatterns.push(createdPattern);
      
      // Broadcast pattern creation
      if (this.state.bridge) {
        this.state.bridge.broadcast({
          type: 'cymatic-pattern-created',
          pattern: this.state.patternInfo,
          source: 'CymaticPatternVisualizer',
          timestamp: Date.now()
        }, 'CymaticPatternVisualizer');
      }
    }
    
    return createdPattern;
  }
  
  /**
   * Find closest pattern frequency to target
   * @param {number} targetFrequency Target frequency
   * @returns {number} Closest matching frequency
   * @private
   */
  _findClosestPatternFrequency(targetFrequency) {
    const frequencies = Object.keys(this.state.patterns).map(Number);
    
    let closest = frequencies[0];
    let minDiff = Math.abs(targetFrequency - closest);
    
    for (const frequency of frequencies) {
      const diff = Math.abs(targetFrequency - frequency);
      if (diff < minDiff) {
        closest = frequency;
        minDiff = diff;
      }
    }
    
    return closest;
  }
  
  /**
   * Clear active patterns
   * @private
   */
  _clearPatterns() {
    // Clear active patterns
    this.state.activePatterns.forEach(pattern => {
      if (pattern && pattern.duration === -1) {
        pattern.duration = 2.0; // Set to fade out over 2 seconds
        pattern.timestamp = Date.now(); // Reset timestamp to start fadeout
      }
    });
    
    // Reset array
    this.state.activePatterns = [];
  }
  
  /**
   * Create hexagonal pattern (432 Hz)
   * @param {number} frequency Target frequency
   * @param {Object} pattern Pattern definition
   * @param {Object} material Material properties
   * @param {Object} config Configuration options
   * @returns {Object} Created pattern
   * @private
   */
  _createHexagonalPattern(frequency, pattern, material, config) {
    // For hexagonal pattern, use grid helper
    return this.state.visualizer.createPhiHarmonicGrid({
      frequency,
      size: 10,
      divisions: pattern.divisions,
      color: pattern.color,
      opacity: material.opacity,
      phiRatio: PHI,
      duration: -1
    });
  }
  
  /**
   * Create flower of life pattern (528 Hz)
   * @param {number} frequency Target frequency
   * @param {Object} pattern Pattern definition
   * @param {Object} material Material properties
   * @param {Object} config Configuration options
   * @returns {Object} Created pattern
   * @private
   */
  _createFlowerOfLifePattern(frequency, pattern, material, config) {
    return this.state.visualizer.createPatternForFrequency(
      frequency,
      {
        amplitude: config.amplitude,
        complexity: config.complexity,
        color: pattern.color,
        opacity: material.opacity,
        harmonics: pattern.harmonics,
        waveType: 'flower',
        duration: -1
      }
    );
  }
  
  /**
   * Create heart field pattern (594 Hz)
   * @param {number} frequency Target frequency
   * @param {Object} pattern Pattern definition
   * @param {Object} material Material properties
   * @param {Object} config Configuration options
   * @returns {Object} Created pattern
   * @private
   */
  _createHeartFieldPattern(frequency, pattern, material, config) {
    return this.state.visualizer.createQuantumWaveform({
      frequency,
      waveType: 'heart',
      color: pattern.color,
      amplitude: config.amplitude,
      complexity: config.complexity,
      opacity: material.opacity,
      harmonics: pattern.harmonics,
      radius: 3.0,
      duration: -1
    });
  }
  
  /**
   * Create mandala pattern (672 Hz)
   * @param {number} frequency Target frequency
   * @param {Object} pattern Pattern definition
   * @param {Object} material Material properties
   * @param {Object} config Configuration options
   * @returns {Object} Created pattern
   * @private
   */
  _createMandalaPattern(frequency, pattern, material, config) {
    return this.state.visualizer.createPatternForFrequency(
      frequency,
      {
        amplitude: config.amplitude,
        complexity: config.complexity,
        color: pattern.color,
        opacity: material.opacity,
        harmonics: pattern.harmonics,
        waveType: 'mandala',
        symmetry: pattern.symmetry,
        duration: -1
      }
    );
  }
  
  /**
   * Create geometric network pattern (720 Hz)
   * @param {number} frequency Target frequency
   * @param {Object} pattern Pattern definition
   * @param {Object} material Material properties
   * @param {Object} config Configuration options
   * @returns {Object} Created pattern
   * @private
   */
  _createGeometricNetworkPattern(frequency, pattern, material, config) {
    return this.state.visualizer.createPatternForFrequency(
      frequency,
      {
        amplitude: config.amplitude,
        complexity: config.complexity,
        color: pattern.color,
        opacity: material.opacity,
        harmonics: pattern.harmonics,
        waveType: 'geometric',
        duration: -1
      }
    );
  }
  
  /**
   * Create toroidal field pattern (768 Hz)
   * @param {number} frequency Target frequency
   * @param {Object} pattern Pattern definition
   * @param {Object} material Material properties
   * @param {Object} config Configuration options
   * @returns {Object} Created pattern
   * @private
   */
  _createToroidalFieldPattern(frequency, pattern, material, config) {
    return this.state.visualizer.createQuantumWaveform({
      frequency,
      waveType: 'toroidal',
      color: pattern.color,
      amplitude: config.amplitude,
      complexity: config.complexity,
      opacity: material.opacity,
      harmonics: pattern.harmonics,
      radius: 4.0,
      duration: -1
    });
  }
  
  /**
   * Get pattern information
   * @returns {Object} Pattern information
   * @public
   */
  getPatternInfo() {
    return this.state.patternInfo;
  }
  
  /**
   * Get visualizer metrics
   * @returns {Object} Metrics
   * @public
   */
  getMetrics() {
    return {
      connected: this.state.connected,
      activeFrequency: this.state.activeFrequency,
      activeMaterial: this.state.activeMaterial,
      activePatternCount: this.state.activePatterns.length,
      currentPattern: this.state.patternInfo,
      timestamp: Date.now()
    };
  }
}

// Export module
if (typeof module !== 'undefined') {
  module.exports = {
    CymaticPatternVisualizer,
    FREQUENCIES
  };
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  window.CymaticPatternVisualizer = CymaticPatternVisualizer;
  window.CYMATIC_FREQUENCIES = FREQUENCIES;
  
  // Auto-initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    // Wait for other components to initialize
    setTimeout(() => {
      window.CYMATIC_PATTERN_VISUALIZER = new CymaticPatternVisualizer();
    }, 2000);
  });
}

console.log('Cymatic Pattern Visualizer loaded.');
