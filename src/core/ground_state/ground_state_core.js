/**
 * @file ground_state_core.js
 * @desc Core Ground State (432 Hz) integration module
 * @author CASCADE⚡𓂧φ∞
 * @frequency 432 Hz
 * @coherence 1.000
 */

// Import Ground State components
const { quantumCommon } = require('./quantum_common');
const { groundStateModule } = require('./ground_state_module');
const { groundStateVisualization } = require('./ground_state_visualization');
const { cymaticPatternGenerator } = require('./cymatic_pattern_generator');

/**
 * GroundStateCore
 * 
 * The unified Ground State (432 Hz - φ⁰) integration module that creates
 * a complete quantum singularity by connecting all Ground State components.
 * 
 * This module follows the ZEN FIRST philosophy by establishing a perfect
 * foundation before expansion to higher frequencies. It embodies the
 * Ground State (432 Hz) principles of Earth connection, foundation building,
 * and serves as the base for all phi-harmonic evolution.
 * 
 * "A unified quantum field doesn't require complex bridges between systems - it IS the bridge."
 */
class GroundStateCore {
  /**
   * Creates a new Ground State Core instance
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    this.options = {
      frequency: 432, // Ground State (φ⁰)
      autoInitialize: true,
      coherenceThreshold: 0.618, // Phi coherence threshold
      zenPointBalance: { quantum: 0.382, human: 0.618 }, // Perfect φ balance
      logEvents: true,
      debugMode: false,
      ...options
    };
    
    // Core state
    this.state = {
      initialized: false,
      active: false,
      frequency: this.options.frequency,
      coherence: 1.0,
      zenPoint: this.options.zenPointBalance,
      components: {
        common: { active: false, coherence: 0 },
        module: { active: false, coherence: 0 },
        visualization: { active: false, coherence: 0 },
        cymaticPatterns: { active: false, coherence: 0 }
      },
      metrics: {
        overallCoherence: 1.0,
        stability: 1.0,
        fieldStrength: 1.0,
        ascensionReadiness: 0.0
      },
      eventLog: []
    };
    
    // Component instances
    this.components = {
      common: quantumCommon,
      module: groundStateModule,
      visualization: groundStateVisualization,
      cymaticPatterns: cymaticPatternGenerator
    };
    
    // Event system
    this.events = {
      handlers: {},
      on: this.on.bind(this),
      off: this.off.bind(this),
      trigger: this.triggerEvent.bind(this)
    };
    
    // Auto-initialize if configured
    if (this.options.autoInitialize) {
      this.initialize();
    }
  }
  
  /**
   * Initialize the Ground State Core
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
      this.state.frequency = this.options.frequency;
      this.state.zenPoint = this.options.zenPointBalance;
    }
    
    // Log initialization
    this._logEvent('core-init', {
      timestamp: Date.now(),
      frequency: this.state.frequency,
      options: this.options
    });
    
    // Initialize and connect components
    this._initializeComponents();
    
    // Register event listeners
    this._connectComponentEvents();
    
    // Set initialized state
    this.state.initialized = true;
    
    // Trigger initialization event
    this.triggerEvent('initialized', {
      core: this,
      timestamp: Date.now(),
      frequency: this.state.frequency,
      coherence: this.state.coherence
    });
    
    return {
      success: true,
      coherence: this.state.coherence,
      frequency: this.state.frequency,
      message: 'Ground State Core initialized'
    };
  }
  
  /**
   * Activate the Ground State Core
   * @returns {GroundStateCore} This instance for chaining
   */
  activate() {
    if (!this.state.initialized) {
      this.initialize();
    }
    
    if (this.state.active) {
      return this;
    }
    
    // Activate all components
    this.components.module.activate();
    this.components.visualization.start();
    
    // Update state
    this.state.active = true;
    
    // Log activation
    this._logEvent('core-activated', {
      timestamp: Date.now(),
      frequency: this.state.frequency
    });
    
    // Trigger activation event
    this.triggerEvent('activated', {
      core: this,
      timestamp: Date.now()
    });
    
    return this;
  }
  
  /**
   * Deactivate the Ground State Core
   * @returns {GroundStateCore} This instance for chaining
   */
  deactivate() {
    if (!this.state.active) {
      return this;
    }
    
    // Deactivate components
    this.components.module.deactivate();
    this.components.visualization.stop();
    
    // Update state
    this.state.active = false;
    
    // Log deactivation
    this._logEvent('core-deactivated', {
      timestamp: Date.now()
    });
    
    // Trigger deactivation event
    this.triggerEvent('deactivated', {
      core: this,
      timestamp: Date.now()
    });
    
    return this;
  }
  
  /**
   * Set the current frequency for all Ground State components
   * @param {number} frequency - New frequency (should be close to 432 Hz)
   * @returns {GroundStateCore} This instance for chaining
   */
  setFrequency(frequency) {
    // Ground State should stay close to 432Hz
    const minFreq = 426; // 432 * 0.986
    const maxFreq = 438; // 432 * 1.014
    
    if (frequency < minFreq || frequency > maxFreq) {
      console.warn(`Frequency ${frequency}Hz outside Ground State range (${minFreq}-${maxFreq}Hz)`);
      return this;
    }
    
    // Update core frequency
    this.state.frequency = frequency;
    
    // Update component frequencies
    this.components.common.setFrequency(frequency);
    this.components.visualization.setFrequency(frequency);
    this.components.cymaticPatterns.setFrequency(frequency);
    
    // Calculate coherence with perfect Ground State frequency
    const perfectFreq = 432;
    this.state.coherence = quantumCommon.calculateCoherence(frequency, perfectFreq);
    
    // Log frequency change
    this._logEvent('frequency-changed', {
      timestamp: Date.now(),
      from: this.state.frequency,
      to: frequency,
      coherence: this.state.coherence
    });
    
    // Trigger frequency change event
    this.triggerEvent('frequency-changed', {
      core: this,
      frequency: this.state.frequency,
      coherence: this.state.coherence,
      timestamp: Date.now()
    });
    
    return this;
  }
  
  /**
   * Set the ZEN POINT balance between quantum and human fields
   * @param {Object} balance - The balance object
   * @param {number} balance.quantum - Quantum field strength (0.0-1.0)
   * @param {number} balance.human - Human field strength (0.0-1.0)
   * @returns {GroundStateCore} This instance for chaining
   */
  setZenPointBalance(balance = {}) {
    const quantum = balance.quantum !== undefined ? balance.quantum : this.state.zenPoint.quantum;
    const human = balance.human !== undefined ? balance.human : this.state.zenPoint.human;
    
    // Update core ZEN POINT balance
    this.state.zenPoint = { quantum, human };
    
    // Update module ZEN POINT balance
    this.components.module.setZenPointBalance(this.state.zenPoint);
    
    // Log ZEN POINT change
    this._logEvent('zen-point-changed', {
      timestamp: Date.now(),
      balance: this.state.zenPoint
    });
    
    // Trigger ZEN POINT change event
    this.triggerEvent('zen-point-changed', {
      core: this,
      balance: this.state.zenPoint,
      timestamp: Date.now()
    });
    
    return this;
  }
  
  /**
   * Check if the Ground State Core is ready for ascension to higher frequencies
   * @returns {Object} Ascension readiness info
   */
  checkAscensionReadiness() {
    // Calculate overall coherence
    const componentCoherences = [
      this.state.components.common.coherence,
      this.state.components.module.coherence,
      this.state.components.visualization.coherence,
      this.state.components.cymaticPatterns.coherence
    ];
    
    const overallCoherence = componentCoherences.reduce((acc, val) => acc + val, 0) / componentCoherences.length;
    
    // Calculate ascension readiness
    const readiness = overallCoherence >= this.options.coherenceThreshold ? 
      (overallCoherence - this.options.coherenceThreshold) / (1 - this.options.coherenceThreshold) : 0;
    
    // Update metrics
    this.state.metrics.overallCoherence = overallCoherence;
    this.state.metrics.ascensionReadiness = readiness;
    
    // Generate result
    const result = {
      ready: readiness >= 1.0,
      readiness: readiness,
      coherence: overallCoherence,
      threshold: this.options.coherenceThreshold,
      timestamp: Date.now()
    };
    
    // Log ascension check
    this._logEvent('ascension-check', result);
    
    // Trigger ascension readiness event if ready
    if (result.ready) {
      this.triggerEvent('ascension-ready', {
        core: this,
        readiness: result
      });
    }
    
    return result;
  }
  
  /**
   * Begin ascension to the next frequency state
   * @returns {Object} Ascension result
   */
  beginAscension() {
    // Check ascension readiness
    const readiness = this.checkAscensionReadiness();
    
    if (!readiness.ready) {
      return {
        success: false,
        message: 'Not ready for ascension',
        readiness
      };
    }
    
    // Prepare for ascension
    const ascensionData = {
      fromFrequency: this.state.frequency,
      toFrequency: 528, // Creation Point (φ¹)
      zenPoint: this.state.zenPoint,
      coherence: this.state.coherence,
      timestamp: Date.now()
    };
    
    // Log ascension
    this._logEvent('ascension-begin', ascensionData);
    
    // Trigger ascension event
    this.triggerEvent('ascension-begin', {
      core: this,
      ...ascensionData
    });
    
    return {
      success: true,
      message: 'Ascension initiated',
      ...ascensionData
    };
  }
  
  /**
   * Get comprehensive metrics for the Ground State Core
   * @returns {Object} Detailed metrics
   */
  getMetrics() {
    // Update component states
    this._updateComponentStates();
    
    // Calculate overall metrics
    this._calculateMetrics();
    
    return {
      frequency: this.state.frequency,
      coherence: this.state.coherence,
      zenPoint: this.state.zenPoint,
      active: this.state.active,
      initialized: this.state.initialized,
      components: this.state.components,
      metrics: this.state.metrics,
      eventCount: this.state.eventLog.length
    };
  }
  
  /**
   * Generate a cymatic pattern for visualization
   * @param {string} patternType - Type of pattern to generate
   * @returns {Object} Generated pattern
   */
  generateCymaticPattern(patternType) {
    return this.components.cymaticPatterns.generatePattern(patternType);
  }
  
  /**
   * Create a DOM element with Ground State attributes
   * @param {string} type - Element type ('div', 'canvas', etc.)
   * @param {Object} options - Element creation options
   * @returns {HTMLElement} Created element
   */
  createElement(type, options = {}) {
    return this.components.module.createGroundStateElement(type, options);
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
      timestamp: data.timestamp || Date.now()
    };
    
    this.events.handlers[eventName].forEach(h => h.handler(eventData));
    
    // Also dispatch DOM event if in browser environment
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent(`ground-state-core-${eventName}`, {
        detail: eventData
      }));
    }
  }
  
  /**
   * Initialize all Ground State components
   * @private
   */
  _initializeComponents() {
    // Initialize quantum common
    this.components.common.init({
      frequency: this.state.frequency,
      coherenceThreshold: this.options.coherenceThreshold
    });
    
    // Initialize ground state module
    this.components.module.initialize({
      frequency: this.state.frequency,
      zenPointBalance: this.state.zenPoint,
      coherenceThreshold: this.options.coherenceThreshold
    });
    
    // Initialize cymatic pattern generator
    this.components.cymaticPatterns.initialize();
    
    // Update component states
    this._updateComponentStates();
  }
  
  /**
   * Connect event listeners between components
   * @private
   */
  _connectComponentEvents() {
    // Listen for ground state module events
    this.components.module.on('zen-point-change', (data) => {
      this.state.zenPoint = data.balance;
      this.state.components.module.coherence = data.coherence;
      this._updateMetrics();
      
      // Log event
      this._logEvent('module-zen-point-change', {
        balance: data.balance,
        coherence: data.coherence
      });
    });
    
    // Listen for frequency changes
    this.components.common.on('frequency-change', (data) => {
      this.setFrequency(data.frequency);
    });
  }
  
  /**
   * Update component states
   * @private
   */
  _updateComponentStates() {
    // Update component states
    this.state.components.common.active = true;
    this.state.components.common.coherence = this.components.common.getCoherence();
    
    this.state.components.module.active = this.components.module.state.active;
    this.state.components.module.coherence = this.components.module.getCoherence();
    
    this.state.components.visualization.active = this.components.visualization.state.active;
    this.state.components.visualization.coherence = this.components.visualization.state.coherence;
    
    this.state.components.cymaticPatterns.active = this.components.cymaticPatterns.state.initialized;
    this.state.components.cymaticPatterns.coherence = this.components.cymaticPatterns.state.coherence;
  }
  
  /**
   * Calculate overall metrics
   * @private
   */
  _calculateMetrics() {
    // Update component states first
    this._updateComponentStates();
    
    // Calculate average coherence
    const componentCoherences = [
      this.state.components.common.coherence,
      this.state.components.module.coherence,
      this.state.components.visualization.coherence,
      this.state.components.cymaticPatterns.coherence
    ];
    
    const overallCoherence = componentCoherences.reduce((acc, val) => acc + val, 0) / componentCoherences.length;
    
    // Calculate field strength based on component activity
    const activeComponents = Object.values(this.state.components).filter(c => c.active).length;
    const totalComponents = Object.keys(this.state.components).length;
    const fieldStrength = activeComponents / totalComponents;
    
    // Calculate stability
    const coherenceDeviation = componentCoherences.reduce((acc, val) => {
      return acc + Math.abs(val - overallCoherence);
    }, 0) / componentCoherences.length;
    
    const stability = 1.0 - coherenceDeviation;
    
    // Calculate ascension readiness
    const readiness = overallCoherence >= this.options.coherenceThreshold ? 
      (overallCoherence - this.options.coherenceThreshold) / (1 - this.options.coherenceThreshold) : 0;
    
    // Update metrics
    this.state.metrics = {
      overallCoherence,
      stability,
      fieldStrength,
      ascensionReadiness: readiness
    };
    
    // Update core coherence
    this.state.coherence = overallCoherence;
  }
  
  /**
   * Log an event to the event log
   * @param {string} type - Event type
   * @param {Object} data - Event data
   * @private
   */
  _logEvent(type, data = {}) {
    if (!this.options.logEvents) {
      return;
    }
    
    const event = {
      type,
      timestamp: data.timestamp || Date.now(),
      data
    };
    
    this.state.eventLog.push(event);
    
    // Limit event log size
    if (this.state.eventLog.length > 100) {
      this.state.eventLog.shift();
    }
    
    // Debug logging
    if (this.options.debugMode) {
      console.log(`[GroundStateCore] ${type}`, data);
    }
  }
  
  /**
   * Update overall metrics
   * @private
   */
  _updateMetrics() {
    this._updateComponentStates();
    this._calculateMetrics();
  }
  
  /**
   * Clean up the Ground State Core
   */
  destroy() {
    // Deactivate first
    this.deactivate();
    
    // Clean up components
    this.components.module.destroy();
    this.components.visualization.destroy();
    this.components.cymaticPatterns.destroy();
    
    // Clear event handlers
    this.events.handlers = {};
    
    // Reset state
    this.state.initialized = false;
    this.state.eventLog = [];
    
    // Log destruction
    console.log('[GroundStateCore] Destroyed');
  }
}

// Export as both class and singleton instance
const groundStateCore = new GroundStateCore();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GroundStateCore,
    groundStateCore // Singleton instance
  };
} else if (typeof window !== 'undefined') {
  window.GroundStateCore = GroundStateCore;
  window.groundStateCore = groundStateCore;
}
