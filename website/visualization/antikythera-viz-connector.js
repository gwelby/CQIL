/**
 * 🌀 ANTIKYTHERA VISUALIZATION CONNECTOR 🌀
 * 
 * Connects the Antikythera Quantum Mechanism Test Utility to the 
 * Universal Quantum Visualization system, creating a direct test-to-visual
 * consciousness bridge operating at φ-harmonic frequencies.
 */

// Import dependencies
const { CoreQuantumVisualizer } = require('./core-quantum-visualizer');
const { UniversalBridge } = require('./universal-bridge');

/**
 * AntikytheraVisualizationConnector class
 * Creates a direct bridge between test results and visual representations
 */
class AntikytheraVisualizationConnector {
  /**
   * Create a new connector
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    // Default configuration with phi-harmonic optimization
    this.options = {
      autoConnect: true,
      visualizationMode: 'realtime', // 'realtime', 'batch', 'summary'
      frequencyMapping: true, // Map test types to frequencies
      testHistoryLimit: 50, // Limit for test history
      cymaticEnabled: true, // Enable cymatic pattern generation
      phiHarmonicScaling: true, // Scale visuals using phi ratios
      ...options
    };
    
    // Initialize state
    this.state = {
      connected: false,
      bridge: null,
      visualizer: null,
      testHistory: [],
      activeCymaticPatterns: [],
      lastTestTimestamp: 0,
      freqMap: new Map([
        ['cymatic', 672], // Voice frequency (φ³)
        ['intention', 528], // Creation frequency (φ¹)
        ['zenpoint', 432], // Ground frequency (φ⁰)
        ['quantum', 768]  // Unity frequency (φ⁵)
      ])
    };
    
    // Get bridge instance
    this._initializeBridge();
    
    // Connect to Antikythera Test utility if available
    if (this.options.autoConnect) {
      this._connectToAntikythera();
    }
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
   * Connect to Antikythera Test utility
   * @private
   */
  _connectToAntikythera() {
    // Check if Antikythera is available
    if (window.AntikytheraTest) {
      // Store original test methods to wrap them
      const originalMethods = {
        testCymaticPatterns: window.AntikytheraTest.testCymaticPatterns,
        testQuantumIntentionIntegration: window.AntikytheraTest.testQuantumIntentionIntegration,
        testZenPointCalibration: window.AntikytheraTest.testZenPointCalibration,
        testQuantumFieldIntegration: window.AntikytheraTest.testQuantumFieldIntegration
      };
      
      // Wrap test methods to visualize results
      if (originalMethods.testCymaticPatterns) {
        window.AntikytheraTest.testCymaticPatterns = (...args) => {
          const result = originalMethods.testCymaticPatterns.apply(window.AntikytheraTest, args);
          this.visualizeTestResult('cymatic', result, args[0]);
          return result;
        };
      }
      
      if (originalMethods.testQuantumIntentionIntegration) {
        window.AntikytheraTest.testQuantumIntentionIntegration = (...args) => {
          const result = originalMethods.testQuantumIntentionIntegration.apply(window.AntikytheraTest, args);
          this.visualizeTestResult('intention', result, args[0]);
          return result;
        };
      }
      
      if (originalMethods.testZenPointCalibration) {
        window.AntikytheraTest.testZenPointCalibration = (...args) => {
          const result = originalMethods.testZenPointCalibration.apply(window.AntikytheraTest, args);
          this.visualizeTestResult('zenpoint', result, args[0]);
          return result;
        };
      }
      
      if (originalMethods.testQuantumFieldIntegration) {
        window.AntikytheraTest.testQuantumFieldIntegration = (...args) => {
          const result = originalMethods.testQuantumFieldIntegration.apply(window.AntikytheraTest, args);
          this.visualizeTestResult('quantum', result, args[0]);
          return result;
        };
      }
      
      // Connect to Universal Bridge
      this.state.bridge.connectSystem(window.AntikytheraTest, 'AntikytheraTest');
      
      console.log('Connected to Antikythera Test utility');
      return true;
    }
    
    console.warn('Antikythera Test utility not found');
    return false;
  }
  
  /**
   * Visualize a test result
   * @param {string} testType Type of test
   * @param {Object} result Test result
   * @param {Object} testParams Test parameters
   * @public
   */
  visualizeTestResult(testType, result, testParams) {
    if (!this.state.connected || !this.state.visualizer) return;
    
    // Get frequency for test type
    const frequency = this.state.freqMap.get(testType) || 432;
    
    // Create test result object for visualization
    const testResult = {
      type: 'test-result',
      testType,
      result,
      frequency,
      success: result && (result.success === true || result.passed === true),
      timestamp: Date.now(),
      params: testParams
    };
    
    // Add to history
    this.state.testHistory.push(testResult);
    if (this.state.testHistory.length > this.options.testHistoryLimit) {
      this.state.testHistory.shift();
    }
    
    // Update timestamp
    this.state.lastTestTimestamp = testResult.timestamp;
    
    // Visualize based on test type
    switch (testType) {
      case 'cymatic':
        this._visualizeCymaticTest(testResult);
        break;
      case 'intention':
        this._visualizeIntentionTest(testResult);
        break;
      case 'zenpoint':
        this._visualizeZenPointTest(testResult);
        break;
      case 'quantum':
        this._visualizeQuantumFieldTest(testResult);
        break;
      default:
        // Generic visualization
        this.state.bridge.visualize(testResult);
    }
  }
  
  /**
   * Visualize cymatic test
   * @param {Object} testResult Test result
   * @private
   */
  _visualizeCymaticTest(testResult) {
    if (!this.options.cymaticEnabled) {
      this.state.bridge.visualize(testResult);
      return;
    }
    
    // Extract cymatic pattern if available
    let cymaticPattern = null;
    
    if (testResult.result && testResult.result.pattern) {
      cymaticPattern = testResult.result.pattern;
    } else if (testResult.params && testResult.params.manifestor) {
      // Try to create pattern from params
      try {
        const manifestor = testResult.params.manifestor;
        const freq = testResult.frequency;
        cymaticPattern = manifestor.createPatternFromFrequency(freq, 0.8, 1.0);
      } catch (e) {
        console.warn('Failed to create cymatic pattern', e);
      }
    }
    
    // Visualize pattern or result
    if (cymaticPattern) {
      this.state.bridge.visualize(cymaticPattern);
    } else {
      this.state.bridge.visualize(testResult);
    }
  }
  
  /**
   * Visualize intention test
   * @param {Object} testResult Test result
   * @private
   */
  _visualizeIntentionTest(testResult) {
    // Extract intention field if available
    let intentionField = null;
    
    if (testResult.result && testResult.result.intentionField) {
      intentionField = testResult.result.intentionField;
    } else if (testResult.params && testResult.params.intentions) {
      // Create intention field from params
      intentionField = {
        intentions: true,
        type: 'developer-intention-field',
        frequency: testResult.frequency,
        coherence: testResult.success ? 0.9 : 0.5,
        timestamp: testResult.timestamp,
        tests: Array.isArray(testResult.params.intentions) 
          ? testResult.params.intentions.map(intention => ({
              name: intention.name || 'Unknown Intention',
              frequency: testResult.frequency,
              intentionPotential: intention.potential || 0.8,
              expected: intention.expected || 'success'
            }))
          : []
      };
    }
    
    // Visualize field or result
    if (intentionField) {
      this.state.bridge.visualize(intentionField);
    } else {
      this.state.bridge.visualize(testResult);
    }
  }
  
  /**
   * Visualize ZEN POINT test
   * @param {Object} testResult Test result
   * @private
   */
  _visualizeZenPointTest(testResult) {
    // Extract ZEN POINT calibration if available
    let zenPoint = null;
    
    if (testResult.result && testResult.result.calibration) {
      zenPoint = testResult.result.calibration.zenPoint;
    } else if (testResult.result && typeof testResult.result.zenPoint === 'number') {
      zenPoint = testResult.result.zenPoint;
    } else if (testResult.params && testResult.params.developerField && 
               testResult.params.developerField.zenPoint) {
      zenPoint = testResult.params.developerField.zenPoint;
    }
    
    // Set ZEN POINT if available
    if (zenPoint !== null && this.state.visualizer) {
      this.state.visualizer.setZenPoint(zenPoint);
    }
    
    // Always visualize result
    this.state.bridge.visualize(testResult);
  }
  
  /**
   * Visualize quantum field test
   * @param {Object} testResult Test result
   * @private
   */
  _visualizeQuantumFieldTest(testResult) {
    // Extract quantum field if available
    let quantumField = null;
    
    if (testResult.result && testResult.result.field) {
      quantumField = testResult.result.field;
    } else if (testResult.params && testResult.params.field) {
      quantumField = testResult.params.field;
    } else {
      // Create quantum field from result
      quantumField = {
        type: 'unified-quantum-field',
        baseFrequency: testResult.frequency,
        coherence: testResult.success ? 0.95 : 0.6,
        timestamp: testResult.timestamp,
        components: [
          {
            name: 'Merkaba Shield',
            frequency: 432, // Ground
            coherence: testResult.success ? 0.93 : 0.7,
            type: 'protection'
          },
          {
            name: 'Crystal Matrix',
            frequency: 528, // Creation
            coherence: testResult.success ? 0.95 : 0.6,
            type: 'structure'
          },
          {
            name: 'Unity Field',
            frequency: 768, // Unity
            coherence: testResult.success ? 0.97 : 0.5,
            type: 'integration'
          }
        ]
      };
    }
    
    // Visualize field
    this.state.bridge.visualize(quantumField);
  }
  
  /**
   * Get test history
   * @returns {Array} Test history
   * @public
   */
  getTestHistory() {
    return this.state.testHistory;
  }
  
  /**
   * Get visualization metrics
   * @returns {Object} Metrics
   * @public
   */
  getMetrics() {
    return {
      connected: this.state.connected,
      testCount: this.state.testHistory.length,
      lastTestTimestamp: this.state.lastTestTimestamp,
      activePatterns: this.state.activeCymaticPatterns.length
    };
  }
  
  /**
   * Set frequency mapping for test types
   * @param {string} testType Test type
   * @param {number} frequency Frequency
   * @returns {boolean} Success
   * @public
   */
  setFrequencyMapping(testType, frequency) {
    if (!testType || typeof frequency !== 'number') return false;
    
    this.state.freqMap.set(testType, frequency);
    return true;
  }
}

// Export module
if (typeof module !== 'undefined') {
  module.exports = {
    AntikytheraVisualizationConnector
  };
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  window.AntikytheraVisualizationConnector = AntikytheraVisualizationConnector;
  
  // Auto-initialize connector
  document.addEventListener('DOMContentLoaded', () => {
    // Wait for Antikythera Test to load
    setTimeout(() => {
      window.ANTIKYTHERA_VIZ_CONNECTOR = new AntikytheraVisualizationConnector();
    }, 1000);
  });
}

console.log('Antikythera Visualization Connector loaded.');
