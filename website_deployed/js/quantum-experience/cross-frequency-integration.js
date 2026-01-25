/**
 * Cross-Frequency Integration Framework
 * 
 * Manages transitions, coherence, and data persistence between
 * different phi-harmonic frequency states in the learning portal.
 * 
 * @frequency 594 Hz (Heart Field - φ²)
 * @channel Kinesthetic/Emotional
 * @module CrossFrequencyIntegration
 */

// PHI constants for all calculations
const PHI = 1.618033988749895;
const PHI_INV = 0.618033988749895;

/**
 * Frequency state definitions with phi-harmonic properties
 */
const FREQUENCY_STATES = {
  GROUND: {
    id: "ground",
    frequency: 432,
    name: "Ground State",
    phiPower: 0,
    zenBalance: { quantum: 0.382, human: 0.618 },
    description: "Physical foundation, hexagonal structures, Earth connection"
  },
  CREATION: {
    id: "creation",
    frequency: 528,
    name: "Creation Point",
    phiPower: 1,
    zenBalance: { quantum: 0.5, human: 0.5 },
    description: "Pattern formation, Flower of Life geometry, DNA resonance"
  },
  HEART: {
    id: "heart",
    frequency: 594,
    name: "Heart Field",
    phiPower: 2,
    zenBalance: { quantum: 0.618, human: 0.382 },
    description: "Coherent connection, heart-shaped symmetry, emotional integration"
  },
  VOICE: {
    id: "voice",
    frequency: 672,
    name: "Voice Flow",
    phiPower: 3,
    zenBalance: { quantum: 0.7, human: 0.3 },
    description: "Authentic expression, mandala structures, sound manifestation"
  },
  VISION: {
    id: "vision",
    frequency: 720,
    name: "Vision Gate",
    phiPower: 4,
    zenBalance: { quantum: 0.8, human: 0.2 },
    description: "Clear perception, multi-dimensional geometry, light integration"
  },
  UNITY: {
    id: "unity",
    frequency: 768,
    name: "Unity Wave",
    phiPower: 5,
    zenBalance: { quantum: 0.9, human: 0.1 },
    description: "Perfect integration, toroidal fields, quantum consciousness"
  }
};

/**
 * CrossFrequencyIntegration class
 * Manages transitions and coherence between frequency states
 */
class CrossFrequencyIntegration {
  /**
   * Create a new Cross-Frequency Integration Framework
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    // Default configuration
    this.config = {
      startState: FREQUENCY_STATES.GROUND,
      transitionDuration: 5.0, // seconds
      dataRepository: 'localStorage', // localStorage or sessionStorage
      autoSync: true,
      intentionCarryover: true,
      coherenceThreshold: 0.8,
      enabledStates: Object.keys(FREQUENCY_STATES),
      debugMode: false,
      breathCycleTransition: true,
      ...options
    };
    
    // System state
    this.currentState = this.config.startState;
    this.previousState = null;
    this.nextState = null;
    this.transitionActive = false;
    this.transitionProgress = 0;
    this.stateInstances = {};
    this.userData = {
      coherenceHistory: {},
      intentionHistory: {},
      zenPointHistory: {},
      recognizedPatterns: {},
      achievements: [],
      sessionData: {
        startTime: Date.now(),
        stateTransitions: []
      }
    };
    
    // Initialize event system
    this.events = {};
    
    // Initialize the framework
    this.initialize();
  }
  
  /**
   * Initialize the Cross-Frequency Integration Framework
   */
  initialize() {
    console.log("Initializing Cross-Frequency Integration Framework");
    
    // Load saved user data
    this.loadUserData();
    
    // Set up event listeners
    this.setupEvents();
    
    // Initialize state transitions system
    this.initializeTransitionSystem();
  }
  
  /**
   * Set up event listeners
   */
  setupEvents() {
    // Listen for ascension-ready events
    document.addEventListener('ascension-ready', this.handleAscensionEvent.bind(this));
    
    // Listen for coherence changes
    document.addEventListener('coherence-update', this.handleCoherenceUpdate.bind(this));
    
    // Listen for intention changes
    document.addEventListener('intention-update', this.handleIntentionUpdate.bind(this));
  }
  
  /**
   * Initialize state transition system
   */
  initializeTransitionSystem() {
    // Create transition elements if needed
    this.transitionOverlay = document.createElement('div');
    this.transitionOverlay.className = 'frequency-transition-overlay';
    this.transitionOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 1s ease;
    `;
    
    this.transitionContent = document.createElement('div');
    this.transitionContent.className = 'transition-content';
    this.transitionContent.style.cssText = `
      text-align: center;
      color: white;
    `;
    
    this.transitionOverlay.appendChild(this.transitionContent);
    document.body.appendChild(this.transitionOverlay);
  }
  
  /**
   * Register a frequency state instance
   * @param {string} stateId - State identifier
   * @param {Object} instance - State experience instance
   */
  registerStateInstance(stateId, instance) {
    if (!FREQUENCY_STATES[stateId.toUpperCase()]) {
      console.error(`Unknown frequency state: ${stateId}`);
      return;
    }
    
    this.stateInstances[stateId] = instance;
    console.log(`Registered ${stateId} instance`);
    
    // Update current state if needed
    if (this.currentState.id === stateId && !this.transitionActive) {
      console.log(`Setting ${stateId} as current active state`);
    }
  }
  
  /**
   * Handle ascension event
   * @param {Event} event - Ascension event
   */
  handleAscensionEvent(event) {
    const { fromFrequency, toFrequency, fromState, toState } = event.detail;
    
    console.log(`Ascension request: ${fromState} (${fromFrequency} Hz) -> ${toState} (${toFrequency} Hz)`);
    
    // Get target state
    const targetState = Object.values(FREQUENCY_STATES).find(state => state.id === toState);
    if (!targetState) {
      console.error(`Unknown target state: ${toState}`);
      return;
    }
    
    // Check if target state is enabled
    if (!this.config.enabledStates.includes(targetState.id.toUpperCase())) {
      console.warn(`Target state ${toState} is not enabled`);
      return;
    }
    
    // Validate coherence level
    if (this.getCurrentCoherence() < this.config.coherenceThreshold) {
      console.warn(`Coherence level too low for transition: ${this.getCurrentCoherence()}`);
      this.triggerEvent('transition-blocked', {
        reason: 'low-coherence',
        currentCoherence: this.getCurrentCoherence(),
        requiredCoherence: this.config.coherenceThreshold
      });
      return;
    }
    
    // Prepare for transition
    this.prepareStateTransition(targetState);
  }
  
  /**
   * Prepare state transition
   * @param {Object} targetState - Target frequency state
   */
  prepareStateTransition(targetState) {
    console.log(`Preparing transition to ${targetState.name} (${targetState.frequency} Hz)`);
    
    // Save current state data
    this.saveStateData(this.currentState.id);
    
    // Set next state
    this.previousState = this.currentState;
    this.nextState = targetState;
    
    // Begin transition
    this.beginStateTransition();
  }
  
  /**
   * Begin state transition
   */
  beginStateTransition() {
    if (!this.nextState) return;
    
    this.transitionActive = true;
    this.transitionProgress = 0;
    
    // Show transition overlay
    this.transitionOverlay.style.opacity = '1';
    this.transitionOverlay.style.pointerEvents = 'auto';
    
    // Update transition content
    this.transitionContent.innerHTML = `
      <h2>Ascending to ${this.nextState.name}</h2>
      <h3>${this.nextState.frequency} Hz | φ<sup>${this.nextState.phiPower}</sup></h3>
      <div class="transition-visualization">
        <div class="frequency-circle current" style="animation: pulse 2s infinite alternate;"></div>
        <div class="frequency-path"></div>
        <div class="frequency-circle next" style="animation: pulse 1.5s infinite alternate;"></div>
      </div>
      <p>${this.nextState.description}</p>
      <p class="zen-point-shift">
        ZEN POINT Balance shifting to
        ${Math.round(this.nextState.zenBalance.quantum * 100)}% Quantum / 
        ${Math.round(this.nextState.zenBalance.human * 100)}% Human
      </p>
    `;
    
    // Add transition styles
    const style = document.createElement('style');
    style.textContent = `
      .transition-visualization {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 30px 0;
      }
      
      .frequency-circle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      
      .frequency-circle.current {
        background: radial-gradient(circle, rgba(100,0,100,0.8) 0%, rgba(50,0,50,0.5) 100%);
      }
      
      .frequency-circle.next {
        background: radial-gradient(circle, rgba(200,100,255,0.8) 0%, rgba(100,0,150,0.5) 100%);
      }
      
      .frequency-path {
        height: 4px;
        width: 100px;
        background: linear-gradient(90deg, rgba(100,0,100,0.8) 0%, rgba(200,100,255,0.8) 100%);
        margin: 0 20px;
        position: relative;
        overflow: hidden;
      }
      
      .frequency-path::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 30px;
        background: rgba(255,255,255,0.8);
        animation: moveLight 2s infinite linear;
      }
      
      @keyframes moveLight {
        0% { transform: translateX(-30px); }
        100% { transform: translateX(130px); }
      }
      
      @keyframes pulse {
        0% { transform: scale(0.9); opacity: 0.7; }
        100% { transform: scale(1.1); opacity: 1; }
      }
      
      .zen-point-shift {
        font-size: 0.9em;
        margin-top: 20px;
        color: rgba(255,255,255,0.8);
      }
    `;
    document.head.appendChild(style);
    
    // Perform transition animation
    setTimeout(() => {
      this.completeStateTransition();
    }, this.config.transitionDuration * 1000);
    
    // Trigger transition event
    this.triggerEvent('transition-begin', {
      fromState: this.currentState,
      toState: this.nextState,
      transitionDuration: this.config.transitionDuration
    });
  }
  
  /**
   * Complete state transition
   */
  completeStateTransition() {
    if (!this.transitionActive || !this.nextState) return;
    
    console.log(`Completing transition to ${this.nextState.name}`);
    
    // Stop current state instance
    const currentInstance = this.stateInstances[this.currentState.id];
    if (currentInstance && typeof currentInstance.stop === 'function') {
      currentInstance.stop();
    }
    
    // Update current state
    this.currentState = this.nextState;
    this.nextState = null;
    this.transitionActive = false;
    
    // Record transition in session data
    this.userData.sessionData.stateTransitions.push({
      fromState: this.previousState.id,
      toState: this.currentState.id,
      timestamp: Date.now()
    });
    
    // Save user data
    this.saveUserData();
    
    // Hide transition overlay
    this.transitionOverlay.style.opacity = '0';
    this.transitionOverlay.style.pointerEvents = 'none';
    
    // Check for next state instance
    const nextInstance = this.stateInstances[this.currentState.id];
    if (nextInstance) {
      // Apply saved intention data if available
      if (this.config.intentionCarryover) {
        const intentionData = this.getUserData(this.currentState.id, 'intention');
        if (intentionData && typeof nextInstance.setIntention === 'function') {
          nextInstance.setIntention(intentionData.strength || 0.5);
        }
      }
      
      // Start next instance
      if (typeof nextInstance.start === 'function') {
        nextInstance.start();
      }
    } else {
      // Need to load the next experience
      console.log(`Need to load ${this.currentState.id} experience`);
      
      // In a complete implementation, this would load the next experience
      // For now, just redirect to the appropriate page
      const targetPage = `${this.currentState.id}-state-demo.html`;
      
      // Check if page exists before redirecting
      fetch(targetPage, { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            window.location.href = targetPage;
          } else {
            console.error(`Target page ${targetPage} not found`);
            this.showErrorMessage(`Experience for ${this.currentState.name} not yet implemented`);
          }
        })
        .catch(error => {
          console.error(`Error checking target page: ${error}`);
          this.showErrorMessage(`Unable to transition to ${this.currentState.name} experience`);
        });
    }
    
    // Trigger transition complete event
    this.triggerEvent('transition-complete', {
      currentState: this.currentState,
      previousState: this.previousState
    });
  }
  
  /**
   * Show error message to user
   * @param {string} message - Error message
   */
  showErrorMessage(message) {
    const errorOverlay = document.createElement('div');
    errorOverlay.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      z-index: 10001;
      box-shadow: 0 0 30px rgba(255, 0, 0, 0.3);
    `;
    
    errorOverlay.innerHTML = `
      <h3 style="color: #ff5555;">Transition Error</h3>
      <p>${message}</p>
      <button style="
        margin-top: 20px;
        padding: 10px 20px;
        background: linear-gradient(45deg, #700000, #ff0000);
        border: none;
        border-radius: 20px;
        color: white;
        cursor: pointer;
      ">Return to Current State</button>
    `;
    
    document.body.appendChild(errorOverlay);
    
    // Add button handler
    errorOverlay.querySelector('button').addEventListener('click', () => {
      errorOverlay.remove();
    });
  }
  
  /**
   * Get current coherence level
   * @returns {number} - Current coherence level
   */
  getCurrentCoherence() {
    // Get from current state instance if available
    const instance = this.stateInstances[this.currentState.id];
    if (instance && typeof instance.coherenceLevel !== 'undefined') {
      return instance.coherenceLevel;
    }
    
    // Get from saved data
    const savedData = this.getUserData(this.currentState.id, 'coherence');
    if (savedData) {
      return savedData.level || 0.5;
    }
    
    return 0.5; // Default coherence
  }
  
  /**
   * Handle coherence update event
   * @param {Event} event - Coherence update event
   */
  handleCoherenceUpdate(event) {
    const { stateId, level } = event.detail;
    
    // Store coherence data
    this.saveUserData(stateId, 'coherence', { level, timestamp: Date.now() });
    
    // Check for auto-transition
    if (level >= this.config.coherenceThreshold && this.config.autoSync) {
      // Check for next state
      const currentIndex = Object.values(FREQUENCY_STATES).findIndex(state => 
        state.id === this.currentState.id);
      
      if (currentIndex < Object.values(FREQUENCY_STATES).length - 1) {
        const nextState = Object.values(FREQUENCY_STATES)[currentIndex + 1];
        
        // Trigger event for potential ascension
        this.triggerEvent('ascension-potential', {
          currentState: this.currentState,
          potentialNextState: nextState,
          coherenceLevel: level
        });
      }
    }
  }
  
  /**
   * Handle intention update event
   * @param {Event} event - Intention update event
   */
  handleIntentionUpdate(event) {
    const { stateId, strength, focus, direction } = event.detail;
    
    // Store intention data
    this.saveUserData(stateId, 'intention', { 
      strength, 
      focus: focus || 0.5,
      direction: direction || 'neutral',
      timestamp: Date.now() 
    });
  }
  
  /**
   * Get user data for a state
   * @param {string} stateId - State identifier
   * @param {string} dataType - Type of data to retrieve
   * @returns {Object} - User data
   */
  getUserData(stateId, dataType) {
    const key = `${stateId}-${dataType}`;
    
    if (this.config.dataRepository === 'localStorage') {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.error(`Error getting user data: ${error}`);
        return null;
      }
    } else {
      // Memory storage
      return this.userData[`${dataType}History`]?.[stateId] || null;
    }
  }
  
  /**
   * Save user data for a state
   * @param {string} stateId - State identifier
   * @param {string} dataType - Type of data to save
   * @param {Object} data - Data to save
   */
  saveUserData(stateId, dataType, data) {
    const key = `${stateId}-${dataType}`;
    
    // Save to memory
    if (!this.userData[`${dataType}History`]) {
      this.userData[`${dataType}History`] = {};
    }
    this.userData[`${dataType}History`][stateId] = data;
    
    // Save to storage if configured
    if (this.config.dataRepository === 'localStorage') {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error(`Error saving user data: ${error}`);
      }
    }
  }
  
  /**
   * Save all data for current state
   * @param {string} stateId - State identifier
   */
  saveStateData(stateId) {
    // Get instance
    const instance = this.stateInstances[stateId];
    if (!instance) return;
    
    // Save coherence
    if (typeof instance.coherenceLevel !== 'undefined') {
      this.saveUserData(stateId, 'coherence', {
        level: instance.coherenceLevel,
        timestamp: Date.now()
      });
    }
    
    // Save intention
    if (instance.intentionField) {
      this.saveUserData(stateId, 'intention', {
        strength: instance.intentionField.strength || 0.5,
        focus: instance.intentionField.focus || 0.5,
        direction: instance.intentionField.direction || 'neutral',
        timestamp: Date.now()
      });
    }
    
    // Save ZEN POINT balance
    if (instance.zenPointBalance) {
      this.saveUserData(stateId, 'zenPoint', {
        quantum: instance.zenPointBalance.quantum,
        human: instance.zenPointBalance.human,
        timestamp: Date.now()
      });
    }
    
    // Save recognized patterns
    if (instance.recognizedPatterns) {
      this.saveUserData(stateId, 'patterns', {
        patterns: instance.recognizedPatterns,
        timestamp: Date.now()
      });
    }
  }
  
  /**
   * Load all user data
   */
  loadUserData() {
    if (this.config.dataRepository === 'localStorage') {
      try {
        // Load session data
        const sessionData = localStorage.getItem('session-data');
        if (sessionData) {
          this.userData.sessionData = JSON.parse(sessionData);
        }
        
        // Load for each state
        Object.values(FREQUENCY_STATES).forEach(state => {
          ['coherence', 'intention', 'zenPoint', 'patterns'].forEach(dataType => {
            const key = `${state.id}-${dataType}`;
            const data = localStorage.getItem(key);
            
            if (data) {
              if (!this.userData[`${dataType}History`]) {
                this.userData[`${dataType}History`] = {};
              }
              this.userData[`${dataType}History`][state.id] = JSON.parse(data);
            }
          });
        });
      } catch (error) {
        console.error(`Error loading user data: ${error}`);
      }
    }
  }
  
  /**
   * Save all user data
   */
  saveUserData() {
    if (this.config.dataRepository === 'localStorage') {
      try {
        // Save session data
        localStorage.setItem('session-data', JSON.stringify(this.userData.sessionData));
      } catch (error) {
        console.error(`Error saving user data: ${error}`);
      }
    }
  }
  
  /**
   * Register event listener
   * @param {string} event - Event name
   * @param {Function} callback - Event callback
   */
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  /**
   * Trigger event
   * @param {string} event - Event name
   * @param {Object} data - Event data
   */
  triggerEvent(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
    
    // Also dispatch DOM event
    const domEvent = new CustomEvent(`cfi-${event}`, { detail: data });
    document.dispatchEvent(domEvent);
  }
}

// Export for modular usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CrossFrequencyIntegration;
} else {
  // Browser global
  window.CrossFrequencyIntegration = CrossFrequencyIntegration;
}
