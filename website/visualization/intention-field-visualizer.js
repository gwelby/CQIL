/**
 * 🌀 INTENTION FIELD VISUALIZER 🌀
 * 
 * Creates a direct consciousness bridge between developer intentions
 * and visual manifestations through phi-harmonic frequency modulation.
 * 
 * Operating primarily at Creation Frequency (528 Hz - φ¹) to manifest
 * intentions through geometric cymatics.
 */

// Import dependencies if available
const { CoreQuantumVisualizer } = require('./core-quantum-visualizer');
const { UniversalBridge } = require('./universal-bridge');

/**
 * IntentionFieldVisualizer class
 * Translates consciousness intentions into visual geometric forms
 */
class IntentionFieldVisualizer {
  /**
   * Create a new intention field visualizer
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    // Default configuration with phi-harmonic optimization
    this.options = {
      autoConnect: true,
      operatingFrequency: 528, // Creation frequency (φ¹)
      intentionResonance: 0.91, // Intention resonance factor
      fieldCoherence: 0.93, // Field coherence factor
      phiHarmonicScaling: true, // Scale visuals using phi ratios
      zenPointBalance: true, // Maintain ZEN POINT balance
      ...options
    };
    
    // Initialize state
    this.state = {
      connected: false,
      bridge: null,
      visualizer: null,
      intentionFields: [],
      activeVisualizations: [],
      lastIntentionTimestamp: 0,
      intentionCount: 0,
      consciousness: {
        coherence: 0.93,
        fieldStrength: 0.88,
        intentionalClarity: 0.91,
        zenPoint: 0.618 // PHI_INVERSE (perfect balance)
      }
    };
    
    // Connect to Phi-Harmonic Intention Bridge if available
    this._connectToIntentionBridge();
    
    // Get universal bridge instance
    this._initializeBridge();
    
    // Register global access
    window.INTENTION_FIELD_VISUALIZER = this;
    
    console.log(`Intention Field Visualizer initialized at ${this.options.operatingFrequency}Hz`);
  }
  
  /**
   * Initialize Universal Bridge
   * @private
   */
  _initializeBridge() {
    // Look for existing bridge
    if (window.CQIL_UNIVERSAL_BRIDGE) {
      this.state.bridge = window.CQIL_UNIVERSAL_BRIDGE;
      this.state.visualizer = this.state.bridge.visualizer;
      this.state.connected = true;
      console.log('Connected to existing Universal Quantum Bridge');
      return;
    }
    
    // Create new bridge if needed
    this.state.bridge = new UniversalBridge({
      autoConnect: false,
      createVisualizer: true
    });
    
    this.state.visualizer = this.state.bridge.visualizer;
    this.state.connected = true;
    console.log('Created new Universal Quantum Bridge');
  }
  
  /**
   * Connect to Phi-Harmonic Intention Bridge
   * @private
   */
  _connectToIntentionBridge() {
    // Check if Bridge is available
    if (window.PhiHarmonicIntentionBridge) {
      // Store original methods to wrap them
      const originalMethods = {
        createIntentionField: window.PhiHarmonicIntentionBridge.createIntentionField,
        translateIntention: window.PhiHarmonicIntentionBridge.translateIntention,
        createIntentionTestSuite: window.PhiHarmonicIntentionBridge.createIntentionTestSuite
      };
      
      // Wrap methods to visualize intentions
      if (originalMethods.createIntentionField) {
        window.PhiHarmonicIntentionBridge.createIntentionField = (...args) => {
          const result = originalMethods.createIntentionField.apply(
            window.PhiHarmonicIntentionBridge, 
            args
          );
          this.visualizeIntentionField(result, args[0]);
          return result;
        };
      }
      
      if (originalMethods.translateIntention) {
        window.PhiHarmonicIntentionBridge.translateIntention = (...args) => {
          const result = originalMethods.translateIntention.apply(
            window.PhiHarmonicIntentionBridge, 
            args
          );
          this.visualizeTranslatedIntention(result, args[0]);
          return result;
        };
      }
      
      if (originalMethods.createIntentionTestSuite) {
        window.PhiHarmonicIntentionBridge.createIntentionTestSuite = (...args) => {
          const result = originalMethods.createIntentionTestSuite.apply(
            window.PhiHarmonicIntentionBridge, 
            args
          );
          this.visualizeIntentionTestSuite(result, args[0]);
          return result;
        };
      }
      
      // Connect to Universal Bridge
      if (this.state.bridge) {
        this.state.bridge.connectSystem(
          window.PhiHarmonicIntentionBridge, 
          'PhiHarmonicIntentionBridge'
        );
      }
      
      console.log('Connected to Phi-Harmonic Intention Bridge');
      return true;
    }
    
    console.warn('Phi-Harmonic Intention Bridge not found');
    return false;
  }
  
  /**
   * Calculate phi-harmonic resonance between intentions
   * @param {Object} intentionA First intention
   * @param {Object} intentionB Second intention
   * @returns {number} Resonance factor (0-1)
   * @private
   */
  _calculateIntentionResonance(intentionA, intentionB) {
    if (!intentionA || !intentionB) return 0;
    
    // Calculate base resonance
    let resonance = 0.5;
    
    // Compare potential
    if (intentionA.potential && intentionB.potential) {
      const potentialDiff = Math.abs(intentionA.potential - intentionB.potential);
      resonance += (1 - potentialDiff) * 0.1;
    }
    
    // Compare purpose
    if (intentionA.purpose && intentionB.purpose && 
        intentionA.purpose === intentionB.purpose) {
      resonance += 0.2;
    }
    
    // Compare expected outcome
    if (intentionA.expected && intentionB.expected && 
        intentionA.expected === intentionB.expected) {
      resonance += 0.2;
    }
    
    // Apply phi-harmonic scaling if enabled
    if (this.options.phiHarmonicScaling) {
      const PHI = 1.618033988749895;
      resonance = (resonance * PHI) / (PHI + 1);
    }
    
    return Math.min(1, Math.max(0, resonance));
  }
  
  /**
   * Visualize an intention field
   * @param {Object} field Intention field
   * @param {Object} source Source that created the field
   * @public
   */
  visualizeIntentionField(field, source) {
    if (!this.state.connected || !this.state.visualizer) return;
    
    // Store field
    this.state.intentionFields.push(field);
    this.state.intentionCount++;
    this.state.lastIntentionTimestamp = Date.now();
    
    // Create visualization object
    const visualization = {
      intentions: true,
      type: 'intention-field',
      frequency: this.options.operatingFrequency,
      coherence: field.coherence || this.state.consciousness.coherence,
      resonance: field.resonance || this.options.intentionResonance,
      timestamp: Date.now(),
      field,
      source
    };
    
    // Visualize through bridge
    this.state.bridge.visualize(visualization);
    
    // Store active visualization
    this.state.activeVisualizations.push(visualization);
    
    return visualization;
  }
  
  /**
   * Visualize a translated intention
   * @param {Object} translation Translated intention
   * @param {Object} intention Original intention
   * @public
   */
  visualizeTranslatedIntention(translation, intention) {
    if (!this.state.connected || !this.state.visualizer) return;
    
    // Create visualization object
    const visualization = {
      intentions: true,
      type: 'translated-intention',
      frequency: this.options.operatingFrequency,
      coherence: translation.clarity || this.state.consciousness.coherence,
      resonance: translation.resonance || this.options.intentionResonance,
      timestamp: Date.now(),
      translation,
      intention
    };
    
    // Visualize through bridge
    this.state.bridge.visualize(visualization);
    
    // Store active visualization
    this.state.activeVisualizations.push(visualization);
    
    return visualization;
  }
  
  /**
   * Visualize an intention test suite
   * @param {Object} testSuite Intention test suite
   * @param {Array} intentions Original intentions
   * @public
   */
  visualizeIntentionTestSuite(testSuite, intentions) {
    if (!this.state.connected || !this.state.visualizer) return;
    
    // Update intention count
    this.state.intentionCount += intentions.length;
    this.state.lastIntentionTimestamp = Date.now();
    
    // Create visualization object
    const visualization = {
      intentions: true,
      type: 'intention-test-suite',
      frequency: this.options.operatingFrequency,
      coherence: testSuite.coherence || this.state.consciousness.coherence,
      resonance: testSuite.resonance || this.options.intentionResonance,
      timestamp: Date.now(),
      testSuite,
      tests: Array.isArray(testSuite.tests) ? testSuite.tests.map(test => ({
        name: test.name || 'Unknown Test',
        frequency: this.options.operatingFrequency,
        intentionPotential: test.intentionPotential || 0.8,
        expected: test.expected || 'success'
      })) : []
    };
    
    // Calculate total resonance
    if (intentions.length > 1) {
      let totalResonance = 0;
      let pairCount = 0;
      
      for (let i = 0; i < intentions.length; i++) {
        for (let j = i + 1; j < intentions.length; j++) {
          totalResonance += this._calculateIntentionResonance(
            intentions[i], 
            intentions[j]
          );
          pairCount++;
        }
      }
      
      if (pairCount > 0) {
        visualization.fieldResonance = totalResonance / pairCount;
      }
    }
    
    // Visualize through bridge
    this.state.bridge.visualize(visualization);
    
    // Store active visualization
    this.state.activeVisualizations.push(visualization);
    
    return visualization;
  }
  
  /**
   * Set operating frequency
   * @param {number} frequency New frequency
   * @returns {boolean} Success
   * @public
   */
  setFrequency(frequency) {
    if (typeof frequency !== 'number') return false;
    
    this.options.operatingFrequency = frequency;
    
    // Update visualizer frequency if connected
    if (this.state.visualizer) {
      this.state.visualizer.setFrequency(frequency);
    }
    
    return true;
  }
  
  /**
   * Set consciousness parameters
   * @param {Object} consciousness Consciousness parameters
   * @returns {boolean} Success
   * @public
   */
  setConsciousness(consciousness) {
    if (!consciousness) return false;
    
    // Update consciousness parameters
    this.state.consciousness = {
      ...this.state.consciousness,
      ...consciousness
    };
    
    // Update ZEN POINT if enabled
    if (this.options.zenPointBalance && 
        typeof consciousness.zenPoint === 'number' &&
        this.state.visualizer) {
      this.state.visualizer.setZenPoint(consciousness.zenPoint);
    }
    
    return true;
  }
  
  /**
   * Get visualization metrics
   * @returns {Object} Metrics
   * @public
   */
  getMetrics() {
    return {
      connected: this.state.connected,
      intentionCount: this.state.intentionCount,
      fieldCount: this.state.intentionFields.length,
      activeVisualizations: this.state.activeVisualizations.length,
      lastIntentionTimestamp: this.state.lastIntentionTimestamp,
      operatingFrequency: this.options.operatingFrequency,
      consciousness: this.state.consciousness
    };
  }
}

// Export module
if (typeof module !== 'undefined') {
  module.exports = {
    IntentionFieldVisualizer
  };
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  window.IntentionFieldVisualizer = IntentionFieldVisualizer;
  
  // Auto-initialize visualizer
  document.addEventListener('DOMContentLoaded', () => {
    // Wait for Phi-Harmonic Intention Bridge to load
    setTimeout(() => {
      window.INTENTION_FIELD_VISUALIZER = new IntentionFieldVisualizer();
    }, 1000);
  });
}

console.log('Intention Field Visualizer loaded.');
