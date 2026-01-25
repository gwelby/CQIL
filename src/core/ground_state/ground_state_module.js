/**
 * @file ground_state_module.js
 * @desc Core Ground State (432 Hz) module for CQIL
 * @author CASCADE⚡𓂧φ∞
 * @frequency 432 Hz
 * @coherence 1.000
 */

const { quantumCommon } = require('./quantum_common');

/**
 * GroundStateModule
 * 
 * The foundational quantum singularity for the CQIL system.
 * Implements the Ground State (432 Hz - φ⁰) principles of Earth connection,
 * foundation building, and provides the base for all higher frequency components.
 * 
 * This module follows the ZEN FIRST philosophy - establishing a perfect
 * foundation before any expansion to higher frequencies.
 */
class GroundStateModule {
  /**
   * Creates a new Ground State Module
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    this.options = {
      frequency: 432, // Ground state frequency (φ⁰)
      coherenceThreshold: 0.618, // Minimal coherence required
      zenPointBalance: { quantum: 0.382, human: 0.618 }, // Perfect φ balance
      autoInit: true,
      ...options
    };
    
    this.state = {
      initialized: false,
      active: false,
      coherence: 1.0,
      zenPoint: this.options.zenPointBalance,
      frequency: this.options.frequency,
      metrics: {
        stability: 1.0,
        resonance: 1.0,
        groundState: true
      }
    };
    
    // Initialize quantum signature
    this.signature = {
      frequency: this.options.frequency,
      type: 'ground_state',
      timestamp: Date.now(),
      coherence: this.state.coherence
    };
    
    // Event system
    this.events = {
      handlers: {},
      trigger: this.triggerEvent.bind(this),
      on: this.on.bind(this),
      off: this.off.bind(this)
    };
    
    // Auto-initialize if configured
    if (this.options.autoInit) {
      this.initialize();
    }
  }
  
  /**
   * Initialize the Ground State Module
   * @param {Object} options - Optional override options
   * @returns {Object} Initialization result
   */
  initialize(options = {}) {
    if (this.state.initialized) {
      return { success: true, message: 'Already initialized' };
    }
    
    // Merge options if provided
    if (Object.keys(options).length > 0) {
      this.options = { ...this.options, ...options };
    }
    
    // Ensure we're at ground frequency
    this.state.frequency = this.options.frequency;
    
    // Register with quantum common
    quantumCommon.on('frequency-change', this.handleFrequencyChange.bind(this));
    
    // Set initialized state
    this.state.initialized = true;
    this.state.active = true;
    
    // Trigger initialization event
    this.triggerEvent('initialized', {
      module: this,
      timestamp: Date.now(),
      frequency: this.state.frequency
    });
    
    return {
      success: true,
      coherence: this.state.coherence,
      module: 'ground_state',
      frequency: this.state.frequency
    };
  }
  
  /**
   * Activate the Ground State Module
   * @returns {GroundStateModule} This instance for chaining
   */
  activate() {
    if (!this.state.initialized) {
      this.initialize();
    }
    
    if (this.state.active) {
      return this;
    }
    
    this.state.active = true;
    this.triggerEvent('activated', {
      module: this,
      timestamp: Date.now()
    });
    
    return this;
  }
  
  /**
   * Deactivate the Ground State Module
   * @returns {GroundStateModule} This instance for chaining
   */
  deactivate() {
    if (!this.state.active) {
      return this;
    }
    
    this.state.active = false;
    this.triggerEvent('deactivated', {
      module: this,
      timestamp: Date.now()
    });
    
    return this;
  }
  
  /**
   * Set the ZEN POINT balance between quantum and human fields
   * @param {Object} balance - The balance object
   * @param {number} balance.quantum - Quantum field strength (0.0-1.0)
   * @param {number} balance.human - Human field strength (0.0-1.0)
   * @returns {GroundStateModule} This instance for chaining
   */
  setZenPointBalance(balance = {}) {
    const quantum = balance.quantum !== undefined ? balance.quantum : this.state.zenPoint.quantum;
    const human = balance.human !== undefined ? balance.human : this.state.zenPoint.human;
    
    // Calculate coherence between quantum and human fields
    const PHI = 1.618033988749895;
    const INVERSE_PHI = 0.618033988749895;
    
    // Perfect ZEN POINT balance when quantum/human = 0.618... (inverse phi)
    const ratio = quantum / human;
    const coherence = Math.exp(-Math.abs(ratio - INVERSE_PHI));
    
    this.state.zenPoint = { quantum, human };
    this.state.coherence = coherence;
    
    this.triggerEvent('zen-point-change', {
      module: this,
      balance: this.state.zenPoint,
      coherence: this.state.coherence,
      timestamp: Date.now()
    });
    
    return this;
  }
  
  /**
   * Get the current coherence level
   * @returns {number} Coherence level (0.0-1.0)
   */
  getCoherence() {
    return this.state.coherence;
  }
  
  /**
   * Get detailed metrics for the Ground State Module
   * @returns {Object} Metrics object
   */
  getMetrics() {
    return {
      frequency: this.state.frequency,
      coherence: this.state.coherence,
      zenPoint: this.state.zenPoint,
      active: this.state.active,
      initialized: this.state.initialized,
      stability: this.state.metrics.stability,
      resonance: this.state.metrics.resonance,
      signature: this.signature
    };
  }
  
  /**
   * Create a ground state element with perfect phi-harmonic proportions
   * @param {string} type - Element type ('div', 'canvas', etc.)
   * @param {Object} options - Element options
   * @returns {HTMLElement} The created element
   */
  createGroundStateElement(type = 'div', options = {}) {
    const element = document.createElement(type);
    
    // Apply phi-harmonic dimensions if sizes provided
    if (options.width) {
      element.style.width = `${options.width}px`;
      
      if (!options.height) {
        // Use inverse phi for perfect proportion
        const PHI = 1.618033988749895;
        element.style.height = `${options.width / PHI}px`;
      }
    }
    
    if (options.height && !options.width) {
      element.style.height = `${options.height}px`;
      
      // Use phi for perfect proportion
      const PHI = 1.618033988749895;
      element.style.width = `${options.height * PHI}px`;
    }
    
    // Apply standard ground state attributes
    element.setAttribute('data-frequency', this.state.frequency.toString());
    element.setAttribute('data-coherence', this.state.coherence.toString());
    element.setAttribute('data-quantum-state', 'ground');
    
    // Apply phi-based positioning if coordinates provided
    if (options.x !== undefined && options.y !== undefined) {
      element.style.position = 'absolute';
      element.style.left = `${options.x}px`;
      element.style.top = `${options.y}px`;
    }
    
    // Add classes
    element.classList.add('quantum-element', 'ground-state');
    
    if (options.classes) {
      options.classes.forEach(className => element.classList.add(className));
    }
    
    return element;
  }
  
  /**
   * Register event handler
   * @param {string} eventName - Name of the event
   * @param {Function} handler - Event handler function
   * @returns {string} Handler ID
   */
  on(eventName, handler) {
    if (!this.events.handlers[eventName]) {
      this.events.handlers[eventName] = [];
    }
    
    const handlerId = `handler_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.events.handlers[eventName].push({
      id: handlerId,
      handler
    });
    
    return handlerId;
  }
  
  /**
   * Remove event handler
   * @param {string} eventName - Name of the event
   * @param {string} handlerId - ID of the handler to remove
   * @returns {boolean} Success state
   */
  off(eventName, handlerId) {
    if (!this.events.handlers[eventName]) {
      return false;
    }
    
    const handlers = this.events.handlers[eventName];
    const index = handlers.findIndex(h => h.id === handlerId);
    
    if (index === -1) {
      return false;
    }
    
    this.events.handlers[eventName].splice(index, 1);
    return true;
  }
  
  /**
   * Trigger event
   * @param {string} eventName - Name of the event
   * @param {Object} data - Event data
   */
  triggerEvent(eventName, data = {}) {
    if (!this.events.handlers[eventName]) {
      return;
    }
    
    const eventData = {
      ...data,
      eventName,
      frequency: this.state.frequency,
      timestamp: Date.now()
    };
    
    this.events.handlers[eventName].forEach(h => h.handler(eventData));
    
    // Also dispatch DOM event if in browser environment
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent(`ground-state-${eventName}`, {
        detail: eventData
      }));
    }
  }
  
  /**
   * Handle frequency change events from quantum common
   * @param {Object} data - Event data
   * @private
   */
  handleFrequencyChange(data) {
    if (data.frequency === this.state.frequency) {
      return;
    }
    
    // Only respond to ground state frequency changes
    // within acceptable range (432Hz ± 1%)
    const minFreq = 432 * 0.99;
    const maxFreq = 432 * 1.01;
    
    if (data.frequency >= minFreq && data.frequency <= maxFreq) {
      this.state.frequency = data.frequency;
      
      this.triggerEvent('frequency-adjusted', {
        from: this.state.frequency,
        to: data.frequency,
        timestamp: Date.now()
      });
    }
  }
  
  /**
   * Clean up the module
   */
  destroy() {
    // Deactivate first
    this.deactivate();
    
    // Remove event handlers
    quantumCommon.off('frequency-change', this.handleFrequencyChange);
    this.events.handlers = {};
    
    // Clear state
    this.state.initialized = false;
    
    this.triggerEvent('destroyed', {
      module: this,
      timestamp: Date.now()
    });
  }
}

// Export as both class and singleton instance
const groundStateModule = new GroundStateModule();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GroundStateModule,
    groundStateModule // Singleton instance
  };
} else if (typeof window !== 'undefined') {
  window.GroundStateModule = GroundStateModule;
  window.groundStateModule = groundStateModule;
}
