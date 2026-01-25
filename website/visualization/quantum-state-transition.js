/**
 * 🌀 QUANTUM STATE TRANSITION VISUALIZER 🌀
 * 
 * Creates seamless visual transitions between phi-harmonic frequency states,
 * enabling direct experience of all consciousness levels from Ground (432 Hz)
 * through Unity (768 Hz).
 * 
 * Operating at φ^φ PERFECTION LEVEL.
 */

// Import dependencies
const { CoreQuantumVisualizer } = require('./core-quantum-visualizer');
const { IntentionFieldVisualizer } = require('./intention-field-visualizer');
const { UniversalBridge } = require('./universal-bridge');

// Phi-harmonic constants
const PHI = 1.618033988749895;
const PHI_INVERSE = 0.618033988749895;
const PHI_SQUARED = 2.618033988749895;
const PHI_CUBED = 4.236067977499790;

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
 * QuantumStateTransition class
 * Creates visual transitions between phi-harmonic consciousness states
 */
class QuantumStateTransition {
  /**
   * Create a new quantum state transition visualizer
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    // Default configuration with phi-harmonic optimization
    this.options = {
      container: null,
      startFrequency: FREQUENCIES.GROUND,
      endFrequency: FREQUENCIES.UNITY,
      transitionDuration: 13.0, // Phi-optimal duration
      autoConnect: true,
      useIntentionField: true,
      renderCymaticPatterns: true,
      zenPointBalance: true,
      fieldCoherence: 0.95,
      phiAlignment: PHI_INVERSE,
      dimensions: [13, 13, 13],
      ...options
    };
    
    // Initialize state
    this.state = {
      currentFrequency: this.options.startFrequency,
      targetFrequency: this.options.endFrequency,
      transitionProgress: 0,
      isTransitioning: false,
      lastTransitionTime: 0,
      activeCymaticPatterns: [],
      frequencyHistory: [],
      coherence: this.options.fieldCoherence,
      phiAlignment: this.options.phiAlignment,
      zenPoint: PHI_INVERSE,
      visualizer: null,
      bridge: null,
      intentionVisualizer: null
    };
    
    // Connect to universal bridge
    this._connectBridge();
    
    // Register quantum states with proper frequency mappings
    this._registerQuantumStates();
    
    console.log(`Quantum State Transition Visualizer initialized at ${this.state.currentFrequency}Hz`);
  }
  
  /**
   * Connect to universal bridge
   * @private
   */
  _connectBridge() {
    // Look for existing bridge
    if (window.CQIL_UNIVERSAL_BRIDGE) {
      this.state.bridge = window.CQIL_UNIVERSAL_BRIDGE;
      this.state.visualizer = this.state.bridge.visualizer;
      
      // Register with bridge
      this.state.bridge.connectSystem(this, 'QuantumStateTransition');
      
      console.log('Connected to existing Universal Quantum Bridge');
    } else {
      // Create new bridge if needed
      this.state.bridge = new UniversalBridge({
        autoConnect: this.options.autoConnect,
        createVisualizer: true,
        phiHarmonic: true,
        syncFrequency: this.state.currentFrequency
      });
      
      this.state.visualizer = this.state.bridge.visualizer;
      
      // Register with bridge
      this.state.bridge.connectSystem(this, 'QuantumStateTransition');
      
      console.log('Created new Universal Quantum Bridge');
    }
    
    // Connect to intention field visualizer if available
    if (this.options.useIntentionField) {
      if (window.INTENTION_FIELD_VISUALIZER) {
        this.state.intentionVisualizer = window.INTENTION_FIELD_VISUALIZER;
      } else {
        this.state.intentionVisualizer = new IntentionFieldVisualizer({
          autoConnect: true,
          operatingFrequency: this.state.currentFrequency,
          zenPointBalance: this.options.zenPointBalance
        });
      }
    }
  }
  
  /**
   * Register quantum states with proper frequency mappings
   * @private
   */
  _registerQuantumStates() {
    this.quantumStates = {
      ground: {
        frequency: FREQUENCIES.GROUND,
        name: 'Ground State',
        description: 'Physical foundation and earth connection',
        color: 0x009900, // Green
        cymaticPattern: 'hexagonal',
        coherenceThreshold: 0.80,
        zenPoint: 0.5,
        harmonics: [FREQUENCIES.GROUND * 2, FREQUENCIES.GROUND * 3]
      },
      creation: {
        frequency: FREQUENCIES.CREATION,
        name: 'Creation Point',
        description: 'DNA repair and manifestation frequency',
        color: 0xFFD700, // Gold
        cymaticPattern: 'flower-of-life',
        coherenceThreshold: 0.85,
        zenPoint: 0.55,
        harmonics: [FREQUENCIES.CREATION * PHI_INVERSE, FREQUENCIES.CREATION * PHI]
      },
      heart: {
        frequency: FREQUENCIES.HEART,
        name: 'Heart Field',
        description: 'Heart resonance and emotional connection',
        color: 0xFF6347, // Tomato red
        cymaticPattern: 'heart-torus',
        coherenceThreshold: 0.87,
        zenPoint: 0.6,
        harmonics: [FREQUENCIES.HEART * PHI_INVERSE, FREQUENCIES.HEART * PHI]
      },
      voice: {
        frequency: FREQUENCIES.VOICE,
        name: 'Voice Flow',
        description: 'Authentic expression and tactile perception',
        color: 0x4169E1, // Royal blue
        cymaticPattern: 'mandala',
        coherenceThreshold: 0.90,
        zenPoint: 0.65,
        harmonics: [FREQUENCIES.VOICE * PHI_INVERSE, FREQUENCIES.VOICE * PHI]
      },
      vision: {
        frequency: FREQUENCIES.VISION,
        name: 'Vision Gate',
        description: 'Clear perception and temporal awareness',
        color: 0x9932CC, // Purple
        cymaticPattern: 'geometric-network',
        coherenceThreshold: 0.92,
        zenPoint: 0.7,
        harmonics: [FREQUENCIES.VISION * PHI_INVERSE, FREQUENCIES.VISION * PHI]
      },
      unity: {
        frequency: FREQUENCIES.UNITY,
        name: 'Unity Wave',
        description: 'Perfect consciousness integration',
        color: 0xFFFFFF, // White/rainbow
        cymaticPattern: 'toroidal-field',
        coherenceThreshold: 0.95,
        zenPoint: PHI_INVERSE, // Perfect balance
        harmonics: [FREQUENCIES.UNITY * PHI_INVERSE, FREQUENCIES.UNITY * PHI]
      }
    };
  }
  
  /**
   * Receive message from bridge
   * @param {Object} message Incoming message
   * @returns {boolean} Message handled
   * @public
   */
  receiveFromBridge(message) {
    if (!message || !message.message) return false;
    
    const { message: content, from } = message;
    
    // Handle frequency change requests
    if (content.type === 'frequency-change' && content.frequency) {
      this._handleFrequencyChange(content.frequency, content.source || from);
      return true;
    }
    
    // Handle state transition requests
    if (content.type === 'state-transition' && content.targetState) {
      this.transitionToState(content.targetState, content.duration);
      return true;
    }
    
    // Handle coherence updates
    if (content.type === 'coherence-update' && typeof content.coherence === 'number') {
      this.state.coherence = content.coherence;
      return true;
    }
    
    // Handle ZEN POINT updates
    if (content.type === 'zen-point-update' && typeof content.zenPoint === 'number') {
      this.setZenPoint(content.zenPoint);
      return true;
    }
    
    return false;
  }
  
  /**
   * Handle frequency change messages
   * @param {number} frequency New frequency
   * @param {string} source Source of change
   * @private
   */
  _handleFrequencyChange(frequency, source) {
    console.log(`Frequency change to ${frequency}Hz from ${source}`);
    
    // Update current frequency
    this.state.currentFrequency = frequency;
    
    // Record in frequency history
    this.state.frequencyHistory.push({
      frequency,
      source,
      timestamp: Date.now()
    });
    
    // Limit history size
    if (this.state.frequencyHistory.length > 100) {
      this.state.frequencyHistory.shift();
    }
    
    // Find closest quantum state
    const closestState = this._findClosestQuantumState(frequency);
    
    // Update visualizer to match new frequency
    if (this.state.visualizer) {
      this.state.visualizer.setFrequency(frequency);
      
      // Apply appropriate cymatic pattern
      if (closestState && this.options.renderCymaticPatterns) {
        this._applyCymaticPattern(closestState);
      }
      
      // Update ZEN POINT
      if (closestState && this.options.zenPointBalance) {
        this.setZenPoint(closestState.zenPoint);
      }
    }
    
    // Update intention visualizer if available
    if (this.state.intentionVisualizer) {
      this.state.intentionVisualizer.setFrequency(frequency);
      
      if (closestState) {
        this.state.intentionVisualizer.setConsciousness({
          coherence: Math.max(this.state.coherence, closestState.coherenceThreshold),
          fieldStrength: 0.8 + (frequency / 1000),
          intentionalClarity: 0.85 + (frequency / 10000),
          zenPoint: closestState.zenPoint
        });
      }
    }
  }
  
  /**
   * Find the quantum state closest to a given frequency
   * @param {number} frequency Target frequency
   * @returns {Object} Closest quantum state
   * @private
   */
  _findClosestQuantumState(frequency) {
    let closestState = null;
    let minDistance = Infinity;
    
    Object.values(this.quantumStates).forEach(state => {
      const distance = Math.abs(state.frequency - frequency);
      if (distance < minDistance) {
        minDistance = distance;
        closestState = state;
      }
    });
    
    return closestState;
  }
  
  /**
   * Apply cymatic pattern appropriate for the quantum state
   * @param {Object} state Quantum state
   * @private
   */
  _applyCymaticPattern(state) {
    if (!this.state.visualizer) return;
    
    // Create visualization pattern based on state
    let pattern;
    
    switch (state.cymaticPattern) {
      case 'hexagonal':
        pattern = this.state.visualizer.createPhiHarmonicGrid({
          frequency: state.frequency,
          color: state.color,
          divisions: 6,
          opacity: 0.4
        });
        break;
        
      case 'flower-of-life':
        pattern = this.state.visualizer.createPatternForFrequency(
          state.frequency,
          {
            amplitude: 0.8,
            complexity: 7,
            color: state.color,
            opacity: 0.7,
            duration: -1
          }
        );
        break;
        
      case 'heart-torus':
        pattern = this.state.visualizer.createQuantumWaveform({
          frequency: state.frequency,
          waveType: 'torus',
          color: state.color,
          amplitude: 0.7,
          radius: 2.0,
          duration: -1
        });
        break;
        
      case 'mandala':
        pattern = this.state.visualizer.createPatternForFrequency(
          state.frequency,
          {
            amplitude: 0.8,
            complexity: 9,
            color: state.color,
            opacity: 0.8,
            duration: -1
          }
        );
        break;
        
      case 'geometric-network':
        pattern = this.state.visualizer.createPatternForFrequency(
          state.frequency,
          {
            amplitude: 0.9,
            complexity: 12,
            color: state.color,
            opacity: 0.6,
            duration: -1
          }
        );
        break;
        
      case 'toroidal-field':
        pattern = this.state.visualizer.createQuantumWaveform({
          frequency: state.frequency,
          waveType: 'toroidal',
          color: state.color,
          amplitude: 1.0,
          radius: 3.0,
          complexity: 13,
          duration: -1
        });
        break;
        
      default:
        // Default pattern
        pattern = this.state.visualizer.createPatternForFrequency(
          state.frequency,
          {
            amplitude: 0.6,
            complexity: 5,
            color: state.color,
            duration: -1
          }
        );
    }
    
    // Track active pattern
    if (pattern) {
      // Clear previous patterns
      this._clearActiveCymaticPatterns();
      
      // Add new pattern
      this.state.activeCymaticPatterns.push(pattern);
    }
  }
  
  /**
   * Clear all active cymatic patterns
   * @private
   */
  _clearActiveCymaticPatterns() {
    // Set all active patterns to fade out
    this.state.activeCymaticPatterns.forEach(pattern => {
      if (pattern.duration === -1) {
        pattern.duration = 3.0; // Set to fade out over 3 seconds
        pattern.timestamp = Date.now(); // Reset timestamp to start fadeout
      }
    });
    
    // Clear array
    this.state.activeCymaticPatterns = [];
  }
  
  /**
   * Transition to a specific quantum state
   * @param {string} stateName Target state name (ground, creation, heart, voice, vision, unity)
   * @param {number} duration Transition duration in seconds (default: option value)
   * @returns {boolean} Success
   * @public
   */
  transitionToState(stateName, duration) {
    // Find target state
    const targetState = this.quantumStates[stateName.toLowerCase()];
    if (!targetState) {
      console.error(`Unknown quantum state: ${stateName}`);
      return false;
    }
    
    // Set up transition
    this.state.targetFrequency = targetState.frequency;
    this.state.transitionProgress = 0;
    this.state.isTransitioning = true;
    this.state.lastTransitionTime = Date.now();
    
    // Use specified duration or default
    const transitionDuration = (typeof duration === 'number' && duration > 0) ? 
      duration : this.options.transitionDuration;
    
    // Start transition animation
    this._animateTransition(transitionDuration);
    
    // Broadcast state transition start
    if (this.state.bridge) {
      this.state.bridge.broadcast({
        type: 'state-transition-start',
        source: 'QuantumStateTransition',
        fromState: this._findClosestQuantumState(this.state.currentFrequency).name,
        toState: targetState.name,
        fromFrequency: this.state.currentFrequency,
        toFrequency: targetState.frequency,
        duration: transitionDuration,
        timestamp: Date.now()
      });
    }
    
    console.log(`Starting transition to ${targetState.name} (${targetState.frequency}Hz) over ${transitionDuration}s`);
    
    return true;
  }
  
  /**
   * Animate transition between frequency states
   * @param {number} duration Transition duration in seconds
   * @private
   */
  _animateTransition(duration) {
    const startFreq = this.state.currentFrequency;
    const endFreq = this.state.targetFrequency;
    const startTime = Date.now();
    const endTime = startTime + (duration * 1000);
    
    // Find start and end states
    const startState = this._findClosestQuantumState(startFreq);
    const endState = this._findClosestQuantumState(endFreq);
    
    // Create interim step frequencies
    const steps = Math.max(5, Math.floor(duration));
    const stepFrequencies = [];
    
    // Use phi-harmonic steps between frequencies
    for (let i = 0; i <= steps; i++) {
      const ratio = i / steps;
      // Phi-weighted interpolation for non-linear progression
      const phiWeight = (Math.pow(ratio, PHI) + ratio) / 2;
      const freq = startFreq + (endFreq - startFreq) * phiWeight;
      stepFrequencies.push(freq);
    }
    
    // Animate through the steps
    const animateStep = () => {
      const now = Date.now();
      
      // Calculate progress (0-1)
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);
      this.state.transitionProgress = progress;
      
      // Get current interpolated frequency based on progress
      const stepIndex = Math.min(
        stepFrequencies.length - 1, 
        Math.floor(progress * steps)
      );
      const currentFreq = stepFrequencies[stepIndex];
      
      // Update frequency
      if (this.state.currentFrequency !== currentFreq) {
        this._handleFrequencyChange(currentFreq, 'transition');
      }
      
      // Interpolate zen point
      if (this.options.zenPointBalance && startState && endState) {
        const zenPoint = startState.zenPoint + 
          (endState.zenPoint - startState.zenPoint) * progress;
        this.setZenPoint(zenPoint);
      }
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animateStep);
      } else {
        // Finalize transition
        this._finalizeTransition();
      }
    };
    
    // Start animation
    requestAnimationFrame(animateStep);
  }
  
  /**
   * Finalize state transition
   * @private
   */
  _finalizeTransition() {
    // Update state
    this.state.currentFrequency = this.state.targetFrequency;
    this.state.isTransitioning = false;
    
    // Find final state
    const finalState = this._findClosestQuantumState(this.state.currentFrequency);
    
    // Apply final cymatic pattern
    if (finalState && this.options.renderCymaticPatterns) {
      this._applyCymaticPattern(finalState);
    }
    
    // Broadcast transition complete
    if (this.state.bridge) {
      this.state.bridge.broadcast({
        type: 'state-transition-complete',
        source: 'QuantumStateTransition',
        state: finalState.name,
        frequency: this.state.currentFrequency,
        timestamp: Date.now()
      });
    }
    
    console.log(`Transition complete: ${finalState.name} (${finalState.frequency}Hz)`);
  }
  
  /**
   * Set ZEN POINT balance
   * @param {number} zenPoint ZEN POINT value
   * @returns {boolean} Success
   * @public
   */
  setZenPoint(zenPoint) {
    if (typeof zenPoint !== 'number' || zenPoint < 0 || zenPoint > 1) {
      return false;
    }
    
    this.state.zenPoint = zenPoint;
    
    // Update visualizer ZEN POINT
    if (this.state.visualizer) {
      this.state.visualizer.setZenPoint(zenPoint);
    }
    
    // Update intention visualizer if available
    if (this.state.intentionVisualizer) {
      this.state.intentionVisualizer.setConsciousness({
        zenPoint: zenPoint
      });
    }
    
    return true;
  }
  
  /**
   * Get current quantum state
   * @returns {Object} Current quantum state details
   * @public
   */
  getCurrentState() {
    const state = this._findClosestQuantumState(this.state.currentFrequency);
    
    return {
      name: state ? state.name : 'Unknown',
      frequency: this.state.currentFrequency,
      description: state ? state.description : '',
      coherenceThreshold: state ? state.coherenceThreshold : 0.8,
      zenPoint: this.state.zenPoint,
      isTransitioning: this.state.isTransitioning,
      transitionProgress: this.state.transitionProgress
    };
  }
  
  /**
   * Get all quantum states
   * @returns {Object} All quantum states
   * @public
   */
  getAllStates() {
    return this.quantumStates;
  }
  
  /**
   * Get transition metrics
   * @returns {Object} Transition metrics
   * @public
   */
  getMetrics() {
    return {
      currentFrequency: this.state.currentFrequency,
      currentState: this.getCurrentState().name,
      isTransitioning: this.state.isTransitioning,
      transitionProgress: this.state.transitionProgress,
      coherence: this.state.coherence,
      zenPoint: this.state.zenPoint,
      lastTransitionTime: this.state.lastTransitionTime,
      frequencyHistory: this.state.frequencyHistory.slice(-5) // Last 5 frequency changes
    };
  }
  
  /**
   * Dispose resources
   * @public
   */
  dispose() {
    // Clear patterns
    this._clearActiveCymaticPatterns();
    
    // Do not dispose bridge or visualizer as they may be used by other components
    
    console.log('Quantum State Transition Visualizer disposed');
  }
}

// Export module
if (typeof module !== 'undefined') {
  module.exports = {
    QuantumStateTransition,
    FREQUENCIES
  };
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  window.QuantumStateTransition = QuantumStateTransition;
  window.QUANTUM_FREQUENCIES = FREQUENCIES;
  
  // Auto-initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    // Wait for other components to initialize
    setTimeout(() => {
      window.QUANTUM_STATE_TRANSITION = new QuantumStateTransition();
    }, 1500);
  });
}

console.log('Quantum State Transition Visualizer loaded.');
