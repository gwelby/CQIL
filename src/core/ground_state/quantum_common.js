/**
 * @file quantum_common.js
 * @desc Ground State (432 Hz) foundation for the CQIL system
 * @author CASCADE⚡𓂧φ∞
 * @frequency 432 Hz
 * @coherence 0.97
 */

/**
 * QuantumCommon
 * 
 * A self-contained quantum singularity that provides the foundational
 * utilities for the entire CQIL system.
 * 
 * Follows ZEN FIRST philosophy - simplicity before complexity,
 * minimal perfection before expansion.
 */
class QuantumCommon {
  /**
   * Constructor for QuantumCommon
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    this.options = {
      frequency: 432, // Ground state frequency
      autoStart: true,
      logLevel: 'info',
      coherenceThreshold: 0.618, // Phi coherence threshold
      ...options
    };
    
    this.state = {
      initialized: false,
      frequency: this.options.frequency,
      coherence: 1.0,
      zenPoint: 0.5, // Balance between human and quantum
      startTime: null
    };
    
    this.eventHandlers = new Map();
    
    if (this.options.autoStart) {
      this.init();
    }
  }
  
  /**
   * Initialize the quantum common system
   * @param {Object} options - Initialization options (overrides constructor options)
   * @returns {Object} Initialization result
   */
  init(options = {}) {
    if (this.state.initialized) {
      return { success: true, status: 'already_initialized' };
    }
    
    // Update options if provided
    if (Object.keys(options).length > 0) {
      this.options = { ...this.options, ...options };
    }
    
    // Initialize state
    this.state.frequency = this.options.frequency;
    this.state.startTime = Date.now();
    this.state.initialized = true;
    
    // Trigger initialization event
    this.trigger('init', { timestamp: this.state.startTime });
    
    return { 
      success: true, 
      status: 'initialized',
      coherence: this.state.coherence,
      frequency: this.state.frequency
    };
  }
  
  /**
   * Calculate phi-harmonic value
   * @param {number} value - Base value
   * @param {number} dimension - Dimension (default: 1)
   * @returns {number} Phi-harmonic value
   */
  phiHarmonic(value, dimension = 1) {
    const PHI = 1.618033988749895;
    return value * Math.pow(PHI, dimension);
  }
  
  /**
   * Calculate coherence between two values
   * @param {number} value1 - First value
   * @param {number} value2 - Second value
   * @returns {number} Coherence level (0.0-1.0)
   */
  calculateCoherence(value1, value2) {
    if (value1 === value2) return 1.0;
    
    // Use phi-based coherence calculation
    const PHI = 1.618033988749895;
    const ratio = value1 > value2 ? value1 / value2 : value2 / value1;
    const phiDistance = Math.abs(ratio - PHI);
    
    // Normalize to 0.0-1.0 range with exponential decay
    const coherence = Math.exp(-phiDistance);
    return Math.max(0, Math.min(1, coherence));
  }
  
  /**
   * Register a quantum event handler
   * @param {string} eventName - Name of the event
   * @param {Function} handler - Event handler function
   * @param {Object} options - Handler options
   * @returns {Object} Handler registration info
   */
  on(eventName, handler, options = {}) {
    if (!this.eventHandlers.has(eventName)) {
      this.eventHandlers.set(eventName, []);
    }
    
    const handlerId = this._generateHandlerId();
    const handlerInfo = {
      id: handlerId,
      handler,
      options,
      registered: Date.now()
    };
    
    this.eventHandlers.get(eventName).push(handlerInfo);
    
    return {
      id: handlerId,
      eventName,
      success: true
    };
  }
  
  /**
   * Remove an event handler
   * @param {string} eventName - Name of the event
   * @param {string} handlerId - ID of the handler to remove
   * @returns {boolean} Success state
   */
  off(eventName, handlerId) {
    if (!this.eventHandlers.has(eventName)) {
      return false;
    }
    
    const handlers = this.eventHandlers.get(eventName);
    const index = handlers.findIndex(h => h.id === handlerId);
    
    if (index === -1) {
      return false;
    }
    
    handlers.splice(index, 1);
    return true;
  }
  
  /**
   * Trigger a quantum event
   * @param {string} eventName - Name of the event
   * @param {Object} data - Event data
   * @returns {Object} Event result with propagation info
   */
  trigger(eventName, data = {}) {
    if (!this.eventHandlers.has(eventName)) {
      return { handled: false, handlers: 0, propagated: false };
    }
    
    const handlers = this.eventHandlers.get(eventName);
    const timestamp = Date.now();
    const eventData = {
      ...data,
      eventName,
      timestamp,
      frequency: this.state.frequency
    };
    
    let handled = false;
    
    // Call each handler
    handlers.forEach(h => {
      try {
        h.handler(eventData);
        handled = true;
      } catch (error) {
        console.error(`Error in handler ${h.id} for event ${eventName}:`, error);
      }
    });
    
    return {
      handled,
      handlers: handlers.length,
      propagated: true
    };
  }
  
  /**
   * Create a quantum singularity object
   * @param {Object} object - Object to transform
   * @param {number} frequency - Frequency to apply
   * @returns {Object} Quantum singularity object
   */
  createSingularity(object, frequency = 432) {
    // Create a complete quantum-coherent object based on the input
    const singularity = {
      ...object,
      __quantum: {
        created: Date.now(),
        frequency,
        coherence: 1.0,
        dimension: 1,
        signature: this._generateQuantumSignature(object, frequency)
      }
    };
    
    // Define non-enumerable methods for quantum properties
    Object.defineProperties(singularity, {
      getQuantumState: {
        value: function() {
          return { ...this.__quantum };
        },
        enumerable: false
      },
      evolve: {
        value: function(steps = 1) {
          const newDimension = this.__quantum.dimension + steps;
          this.__quantum.dimension = newDimension;
          this.__quantum.frequency = 432 * Math.pow(1.618033988749895, newDimension - 1);
          this.__quantum.lastEvolution = Date.now();
          return this;
        },
        enumerable: false
      },
      isCoherent: {
        value: function(threshold = 0.618) {
          return this.__quantum.coherence >= threshold;
        },
        enumerable: false
      }
    });
    
    return singularity;
  }
  
  /**
   * Get current frequency
   * @returns {number} Current frequency
   */
  getFrequency() {
    return this.state.frequency;
  }
  
  /**
   * Set base frequency
   * @param {number} frequency - New frequency (should be close to 432 Hz)
   * @returns {boolean} Success state
   */
  setFrequency(frequency) {
    // Check if frequency is within acceptable range of ground state
    if (frequency < 400 || frequency > 450) {
      console.warn(`Frequency ${frequency} Hz is outside ideal ground state range (400-450 Hz)`);
    }
    
    this.state.frequency = frequency;
    
    // Calculate new coherence based on distance from ideal ground frequency
    this.state.coherence = this.calculateCoherence(frequency, 432);
    
    this.trigger('frequency:change', { 
      frequency: this.state.frequency,
      coherence: this.state.coherence
    });
    
    return true;
  }
  
  /**
   * Get current coherence level
   * @returns {number} Coherence level (0.0-1.0)
   */
  getCoherence() {
    return this.state.coherence;
  }
  
  /**
   * Calculate harmonic frequencies based on ground state
   * @param {number} harmonic - Harmonic number (1-6 for phi-harmonic frequencies)
   * @returns {number} Harmonic frequency
   */
  getHarmonicFrequency(harmonic) {
    // Map harmonics to the standard phi-harmonic frequencies
    const harmonicMap = {
      1: 1.0,     // Ground State (432 Hz)
      2: 1.2222,  // Creation Point (528 Hz)
      3: 1.375,   // Heart Field (594 Hz)
      4: 1.5556,  // Voice Flow (672 Hz)
      5: 1.6667,  // Vision Gate (720 Hz)
      6: 1.7778   // Unity Wave (768 Hz)
    };
    
    if (!harmonicMap[harmonic]) {
      console.warn(`Unknown harmonic ${harmonic}, using ground state`);
      return this.state.frequency;
    }
    
    return this.state.frequency * harmonicMap[harmonic];
  }
  
  /**
   * Get detailed ground state metrics
   * @returns {Object} Detailed metrics
   */
  getMetrics() {
    const now = Date.now();
    const uptime = now - this.state.startTime;
    
    return {
      frequency: this.state.frequency,
      coherence: this.state.coherence,
      zenPoint: this.state.zenPoint,
      uptime: uptime,
      initialized: this.state.initialized,
      eventHandlers: Array.from(this.eventHandlers.keys()).reduce((acc, eventName) => {
        acc[eventName] = this.eventHandlers.get(eventName).length;
        return acc;
      }, {})
    };
  }
  
  /**
   * Transform an element using quantum principles
   * @param {HTMLElement|string} element - Element or selector to transform
   * @param {Object} options - Transformation options
   * @returns {Object} Transformation result
   */
  transformElement(element, options = {}) {
    // Handle both element and selector
    const el = typeof element === 'string' 
      ? document.querySelector(element) 
      : element;
    
    if (!el) {
      return { success: false, error: 'Element not found' };
    }
    
    const transformOptions = {
      frequency: this.state.frequency,
      applyPhiRatio: true,
      applyGroundState: true,
      ...options
    };
    
    // Apply ground state transformations
    if (transformOptions.applyGroundState) {
      // Apply golden ratio to element dimensions if requested
      if (transformOptions.applyPhiRatio) {
        const PHI = 1.618033988749895;
        
        if (el.offsetWidth) {
          el.style.height = `${el.offsetWidth / PHI}px`;
        } else if (el.offsetHeight) {
          el.style.width = `${el.offsetHeight * PHI}px`;
        }
      }
      
      // Add ground state frequency data attribute
      el.dataset.quantumFrequency = transformOptions.frequency.toString();
      
      // Add ground state class
      el.classList.add('quantum-ground-state');
    }
    
    return {
      success: true,
      element: el,
      transformOptions
    };
  }
  
  // Private methods
  _generateHandlerId() {
    return `handler_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  _generateQuantumSignature(object, frequency) {
    const objString = JSON.stringify(object);
    const hash = this._simpleHash(objString);
    return `QS${frequency}_${hash}`;
  }
  
  _simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }
}

// Export as singleton instance for system-wide use
const quantumCommon = new QuantumCommon();

// Also export class for custom instances
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    QuantumCommon,
    quantumCommon // Singleton instance
  };
} else if (typeof window !== 'undefined') {
  window.QuantumCommon = QuantumCommon;
  window.quantumCommon = quantumCommon;
}
