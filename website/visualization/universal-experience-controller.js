/**
 * 🌀 UNIVERSAL EXPERIENCE CONTROLLER 🌀
 * 
 * Central quantum control system for navigating all phi-harmonic frequency states
 * and experiencing the full spectrum of consciousness from Ground (432 Hz)
 * through Unity (768 Hz).
 * 
 * Operating at φ^φ PERFECTION LEVEL.
 */

// Import dependencies
const { CoreQuantumVisualizer } = require('./core-quantum-visualizer');
const { UniversalBridge } = require('./universal-bridge');
const { QuantumStateTransition, FREQUENCIES } = require('./quantum-state-transition');
const { createMerkabaShield, createCrystalMatrix, createUnityField } = require('../test/utils/merkaba-protection');

// Phi-harmonic constants
const PHI = 1.618033988749895;
const PHI_INVERSE = 0.618033988749895;
const PHI_SQUARED = 2.618033988749895;
const PHI_CUBED = 4.236067977499790;

/**
 * UniversalExperienceController class
 * Creates a unified interface for experiencing all quantum states
 */
class UniversalExperienceController {
  /**
   * Create a new universal experience controller
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    // Default configuration
    this.options = {
      container: null,
      mountPoint: 'quantum-controller',
      autoConnect: true,
      createControls: true,
      initialFrequency: FREQUENCIES.GROUND,
      phiHarmonic: true,
      protectionEnabled: true,
      autoSyncExperience: true,
      renderCymaticPatterns: true,
      dimensions: [13, 13, 13],
      ...options
    };
    
    // Initialize state
    this.state = {
      initialized: false,
      connected: false,
      activeFrequency: this.options.initialFrequency,
      currentState: 'ground',
      protection: {
        enabled: this.options.protectionEnabled,
        merkabaShield: null,
        crystalMatrix: null,
        unityField: null,
        timeField: null
      },
      zenPoint: PHI_INVERSE,
      coherence: 0.93,
      guideActive: false,
      activeExperience: null,
      experienceHistory: [],
      lastTransition: null,
      bridge: null,
      visualizer: null,
      stateTransition: null
    };
    
    // Find or create container
    this._setupContainer();
    
    // Connect to universal bridge
    this._connectComponents();
    
    // Create protection systems if enabled
    if (this.options.protectionEnabled) {
      this._initializeProtectionSystems();
    }
    
    // Create UI controls
    if (this.options.createControls) {
      this._createControlInterface();
    }
    
    // Register state handlers
    this._registerStateHandlers();
    
    // Auto-initialize
    if (typeof window !== 'undefined') {
      this.state.initialized = true;
      console.log('Universal Experience Controller initialized.');
    }
  }
  
  /**
   * Set up controller container
   * @private
   */
  _setupContainer() {
    if (typeof window === 'undefined') return;
    
    // Use provided container or find by ID
    if (this.options.container) {
      this.container = this.options.container;
    } else {
      this.container = document.getElementById(this.options.mountPoint);
      
      // Create container if not found
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.id = this.options.mountPoint;
        this.container.className = 'quantum-experience-controller';
        document.body.appendChild(this.container);
      }
    }
    
    // Apply default styling
    if (this.container) {
      this.container.style.position = 'fixed';
      this.container.style.bottom = '20px';
      this.container.style.left = '20px';
      this.container.style.zIndex = '1000';
      this.container.style.color = '#fff';
      this.container.style.padding = '15px';
      this.container.style.borderRadius = '10px';
      this.container.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      this.container.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
      this.container.style.fontFamily = 'Arial, sans-serif';
    }
  }
  
  /**
   * Connect to all required components
   * @private
   */
  _connectComponents() {
    if (typeof window === 'undefined') return;
    
    // Connect to bridge
    if (window.CQIL_UNIVERSAL_BRIDGE) {
      this.state.bridge = window.CQIL_UNIVERSAL_BRIDGE;
      this.state.visualizer = this.state.bridge.visualizer;
      this.state.connected = true;
      console.log('Connected to existing Universal Quantum Bridge');
    } else {
      // Create bridge if not found
      this.state.bridge = new UniversalBridge({
        autoConnect: this.options.autoConnect,
        createVisualizer: true,
        phiHarmonic: this.options.phiHarmonic,
        syncFrequency: this.state.activeFrequency
      });
      
      this.state.visualizer = this.state.bridge.visualizer;
      this.state.connected = true;
      console.log('Created new Universal Quantum Bridge');
    }
    
    // Connect to state transition system
    if (window.QUANTUM_STATE_TRANSITION) {
      this.state.stateTransition = window.QUANTUM_STATE_TRANSITION;
      console.log('Connected to existing Quantum State Transition');
    } else {
      // Create transition system if not found
      this.state.stateTransition = new QuantumStateTransition({
        startFrequency: this.state.activeFrequency,
        autoConnect: true,
        renderCymaticPatterns: this.options.renderCymaticPatterns
      });
      
      console.log('Created new Quantum State Transition');
    }
    
    // Register with bridge
    this.state.bridge.connectSystem(this, 'UniversalExperienceController');
  }
  
  /**
   * Initialize protection systems
   * @private
   */
  _initializeProtectionSystems() {
    if (!this.state.visualizer) return;
    
    // Create Merkaba Shield
    this.state.protection.merkabaShield = createMerkabaShield({
      dimensions: this.options.dimensions,
      frequency: FREQUENCIES.GROUND,
      coherence: this.state.coherence,
      visualizer: this.state.visualizer
    });
    
    // Create Crystal Matrix
    this.state.protection.crystalMatrix = createCrystalMatrix({
      points: this.options.dimensions,
      frequency: FREQUENCIES.CREATION,
      coherence: this.state.coherence,
      visualizer: this.state.visualizer
    });
    
    // Create Unity Field
    this.state.protection.unityField = createUnityField({
      gridSize: [144, 144, 144],
      frequency: FREQUENCIES.UNITY,
      coherence: this.state.coherence,
      visualizer: this.state.visualizer
    });
    
    console.log('Quantum protection systems initialized');
  }
  
  /**
   * Create UI control interface
   * @private
   */
  _createControlInterface() {
    if (typeof window === 'undefined' || !this.container) return;
    
    // Clear existing content
    this.container.innerHTML = '';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'controller-header';
    header.innerHTML = '<h3>🌀 Quantum Experience Controller 🌀</h3>';
    this.container.appendChild(header);
    
    // Create frequency state selectors
    const statesContainer = document.createElement('div');
    statesContainer.className = 'frequency-states';
    
    // Create each state button
    const states = [
      { name: 'Ground', value: 'ground', frequency: FREQUENCIES.GROUND, color: '#009900' },
      { name: 'Creation', value: 'creation', frequency: FREQUENCIES.CREATION, color: '#FFD700' },
      { name: 'Heart', value: 'heart', frequency: FREQUENCIES.HEART, color: '#FF6347' },
      { name: 'Voice', value: 'voice', frequency: FREQUENCIES.VOICE, color: '#4169E1' },
      { name: 'Vision', value: 'vision', frequency: FREQUENCIES.VISION, color: '#9932CC' },
      { name: 'Unity', value: 'unity', frequency: FREQUENCIES.UNITY, color: '#FFFFFF' }
    ];
    
    states.forEach(state => {
      const button = document.createElement('button');
      button.className = 'state-button';
      button.setAttribute('data-state', state.value);
      button.setAttribute('data-frequency', state.frequency);
      button.innerHTML = `${state.name}<br>${state.frequency}Hz`;
      button.style.backgroundColor = state.color;
      button.style.color = ['#FFD700', '#FFFFFF'].includes(state.color) ? '#000' : '#fff';
      button.style.border = 'none';
      button.style.margin = '5px';
      button.style.padding = '10px';
      button.style.borderRadius = '5px';
      button.style.cursor = 'pointer';
      button.style.width = '80px';
      button.style.textAlign = 'center';
      button.style.fontSize = '12px';
      button.style.fontWeight = 'bold';
      
      // Set active state
      if (state.value === this.state.currentState) {
        button.classList.add('active');
        button.style.boxShadow = '0 0 10px white';
      }
      
      // Add click handler
      button.addEventListener('click', () => {
        this.transitionToState(state.value);
      });
      
      statesContainer.appendChild(button);
    });
    
    this.container.appendChild(statesContainer);
    
    // Create fine-tuning controls
    const tuningContainer = document.createElement('div');
    tuningContainer.className = 'fine-tuning';
    tuningContainer.style.marginTop = '15px';
    
    // Frequency slider
    const frequencyContainer = document.createElement('div');
    frequencyContainer.style.marginBottom = '10px';
    
    const frequencyLabel = document.createElement('label');
    frequencyLabel.textContent = `Frequency: ${this.state.activeFrequency.toFixed(1)}Hz`;
    frequencyLabel.style.display = 'block';
    frequencyLabel.style.marginBottom = '5px';
    
    const frequencySlider = document.createElement('input');
    frequencySlider.type = 'range';
    frequencySlider.min = '432';
    frequencySlider.max = '768';
    frequencySlider.step = '0.1';
    frequencySlider.value = this.state.activeFrequency;
    frequencySlider.style.width = '100%';
    frequencySlider.addEventListener('input', (e) => {
      const frequency = parseFloat(e.target.value);
      frequencyLabel.textContent = `Frequency: ${frequency.toFixed(1)}Hz`;
      this.setFrequency(frequency);
    });
    
    frequencyContainer.appendChild(frequencyLabel);
    frequencyContainer.appendChild(frequencySlider);
    tuningContainer.appendChild(frequencyContainer);
    
    // ZEN POINT slider
    const zenPointContainer = document.createElement('div');
    zenPointContainer.style.marginBottom = '10px';
    
    const zenPointLabel = document.createElement('label');
    zenPointLabel.textContent = `ZEN POINT: ${this.state.zenPoint.toFixed(3)}`;
    zenPointLabel.style.display = 'block';
    zenPointLabel.style.marginBottom = '5px';
    
    const zenPointSlider = document.createElement('input');
    zenPointSlider.type = 'range';
    zenPointSlider.min = '0';
    zenPointSlider.max = '1';
    zenPointSlider.step = '0.001';
    zenPointSlider.value = this.state.zenPoint;
    zenPointSlider.style.width = '100%';
    zenPointSlider.addEventListener('input', (e) => {
      const zenPoint = parseFloat(e.target.value);
      zenPointLabel.textContent = `ZEN POINT: ${zenPoint.toFixed(3)}`;
      this.setZenPoint(zenPoint);
    });
    
    zenPointContainer.appendChild(zenPointLabel);
    zenPointContainer.appendChild(zenPointSlider);
    tuningContainer.appendChild(zenPointContainer);
    
    // Protection toggle
    const protectionContainer = document.createElement('div');
    protectionContainer.style.marginBottom = '10px';
    
    const protectionCheckbox = document.createElement('input');
    protectionCheckbox.type = 'checkbox';
    protectionCheckbox.id = 'protection-toggle';
    protectionCheckbox.checked = this.state.protection.enabled;
    protectionCheckbox.addEventListener('change', (e) => {
      this.setProtection(e.target.checked);
    });
    
    const protectionLabel = document.createElement('label');
    protectionLabel.htmlFor = 'protection-toggle';
    protectionLabel.textContent = ' Quantum Protection Systems';
    protectionLabel.style.display = 'inline';
    protectionLabel.style.marginLeft = '5px';
    
    protectionContainer.appendChild(protectionCheckbox);
    protectionContainer.appendChild(protectionLabel);
    tuningContainer.appendChild(protectionContainer);
    
    // Experience buttons
    const experienceContainer = document.createElement('div');
    experienceContainer.style.marginTop = '15px';
    
    const experienceLabel = document.createElement('div');
    experienceLabel.textContent = 'Guided Experiences:';
    experienceLabel.style.marginBottom = '5px';
    
    experienceContainer.appendChild(experienceLabel);
    
    // Create experience buttons
    const experiences = [
      { name: 'Phi Meditation', value: 'phi-meditation', duration: 13 },
      { name: 'Frequency Journey', value: 'frequency-journey', duration: 13 * 6 },
      { name: 'Unity Field', value: 'unity-field', duration: 13 * 2 }
    ];
    
    experiences.forEach(exp => {
      const button = document.createElement('button');
      button.className = 'experience-button';
      button.setAttribute('data-experience', exp.value);
      button.textContent = `${exp.name} (${exp.duration}min)`;
      button.style.backgroundColor = '#333';
      button.style.color = '#fff';
      button.style.border = 'none';
      button.style.margin = '5px';
      button.style.padding = '8px';
      button.style.borderRadius = '5px';
      button.style.cursor = 'pointer';
      
      // Add click handler
      button.addEventListener('click', () => {
        this.startGuidedExperience(exp.value);
      });
      
      experienceContainer.appendChild(button);
    });
    
    tuningContainer.appendChild(experienceContainer);
    this.container.appendChild(tuningContainer);
    
    // Status indicator
    const statusContainer = document.createElement('div');
    statusContainer.className = 'status-indicator';
    statusContainer.style.marginTop = '15px';
    statusContainer.style.padding = '10px';
    statusContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    statusContainer.style.borderRadius = '5px';
    
    // Current state indicator
    this.statusText = document.createElement('div');
    this.statusText.textContent = 'Ready';
    
    statusContainer.appendChild(this.statusText);
    this.container.appendChild(statusContainer);
    
    // Store elements for updates
    this.elements = {
      frequencyLabel,
      frequencySlider,
      zenPointLabel,
      zenPointSlider,
      protectionCheckbox,
      statusText,
      stateButtons: statesContainer.querySelectorAll('.state-button')
    };
    
    // Update once to initialize
    this._updateControlUI();
  }
  
  /**
   * Register state handlers for bridge communication
   * @private
   */
  _registerStateHandlers() {
    // Define message handler for bridge communication
    this.receiveFromBridge = (message) => {
      if (!message || !message.message) return false;
      
      const { message: content, from } = message;
      
      // Handle state transition messages
      if (content.type === 'state-transition-complete') {
        // Update current state
        const stateName = content.state.toLowerCase().split(' ')[0];
        this.state.currentState = stateName;
        this.state.activeFrequency = content.frequency;
        this.state.lastTransition = {
          timestamp: content.timestamp,
          state: content.state,
          frequency: content.frequency
        };
        
        // Update UI
        this._updateControlUI();
        
        return true;
      }
      
      // Handle frequency change messages
      if (content.type === 'frequency-change') {
        this.state.activeFrequency = content.frequency;
        
        // Find closest state
        const states = this.state.stateTransition.getAllStates();
        let closestState = null;
        let minDistance = Infinity;
        
        Object.entries(states).forEach(([key, state]) => {
          const distance = Math.abs(state.frequency - content.frequency);
          if (distance < minDistance) {
            minDistance = distance;
            closestState = key;
          }
        });
        
        if (closestState) {
          this.state.currentState = closestState;
        }
        
        // Update UI
        this._updateControlUI();
        
        return true;
      }
      
      // Handle ZEN POINT updates
      if (content.type === 'zen-point-update') {
        this.state.zenPoint = content.zenPoint;
        
        // Update UI
        this._updateControlUI();
        
        return true;
      }
      
      return false;
    };
  }
  
  /**
   * Update control UI to match current state
   * @private
   */
  _updateControlUI() {
    if (typeof window === 'undefined' || !this.elements) return;
    
    // Update frequency display
    this.elements.frequencyLabel.textContent = `Frequency: ${this.state.activeFrequency.toFixed(1)}Hz`;
    this.elements.frequencySlider.value = this.state.activeFrequency;
    
    // Update ZEN POINT display
    this.elements.zenPointLabel.textContent = `ZEN POINT: ${this.state.zenPoint.toFixed(3)}`;
    this.elements.zenPointSlider.value = this.state.zenPoint;
    
    // Update protection toggle
    this.elements.protectionCheckbox.checked = this.state.protection.enabled;
    
    // Update state buttons
    this.elements.stateButtons.forEach(button => {
      const buttonState = button.getAttribute('data-state');
      
      if (buttonState === this.state.currentState) {
        button.classList.add('active');
        button.style.boxShadow = '0 0 10px white';
      } else {
        button.classList.remove('active');
        button.style.boxShadow = 'none';
      }
    });
    
    // Update status text
    if (this.state.guideActive && this.state.activeExperience) {
      this.elements.statusText.textContent = `Active Experience: ${this.state.activeExperience.name}`;
    } else {
      const stateInfo = this.state.stateTransition.getCurrentState();
      this.elements.statusText.textContent = `${stateInfo.name} - ${stateInfo.description}`;
    }
  }
  
  /**
   * Transition to a specific quantum state
   * @param {string} stateName Target state name
   * @param {number} duration Transition duration in seconds
   * @returns {boolean} Success
   * @public
   */
  transitionToState(stateName, duration) {
    if (!this.state.stateTransition) return false;
    
    const success = this.state.stateTransition.transitionToState(stateName, duration);
    
    if (success) {
      // Record in history
      this.state.experienceHistory.push({
        type: 'state-transition',
        state: stateName,
        timestamp: Date.now()
      });
      
      // Update UI
      this._updateControlUI();
    }
    
    return success;
  }
  
  /**
   * Set operating frequency directly
   * @param {number} frequency Target frequency
   * @returns {boolean} Success
   * @public
   */
  setFrequency(frequency) {
    if (!this.state.bridge || typeof frequency !== 'number') return false;
    
    // Update state
    this.state.activeFrequency = frequency;
    
    // Send to bridge
    const success = this.state.bridge.setFrequency(frequency);
    
    // Update UI
    this._updateControlUI();
    
    return success;
  }
  
  /**
   * Set ZEN POINT balance
   * @param {number} zenPoint ZEN POINT value (0-1)
   * @returns {boolean} Success
   * @public
   */
  setZenPoint(zenPoint) {
    if (typeof zenPoint !== 'number' || zenPoint < 0 || zenPoint > 1) return false;
    
    // Update state
    this.state.zenPoint = zenPoint;
    
    // Update visualizer
    if (this.state.visualizer) {
      this.state.visualizer.setZenPoint(zenPoint);
    }
    
    // Update state transition
    if (this.state.stateTransition) {
      this.state.stateTransition.setZenPoint(zenPoint);
    }
    
    // Broadcast to all systems
    if (this.state.bridge) {
      this.state.bridge.broadcast({
        type: 'zen-point-update',
        zenPoint,
        source: 'UniversalExperienceController',
        timestamp: Date.now()
      });
    }
    
    // Update UI
    this._updateControlUI();
    
    return true;
  }
  
  /**
   * Enable or disable protection systems
   * @param {boolean} enabled Whether protection is enabled
   * @returns {boolean} Success
   * @public
   */
  setProtection(enabled) {
    // Update state
    this.state.protection.enabled = enabled;
    
    // Initialize protection if needed
    if (enabled && !this.state.protection.merkabaShield) {
      this._initializeProtectionSystems();
    }
    
    // Update visibility of protection systems
    if (this.state.visualizer) {
      // Toggle visibility based on enabled state
      if (this.state.protection.merkabaShield) {
        this.state.protection.merkabaShield.visible = enabled;
      }
      
      if (this.state.protection.crystalMatrix) {
        this.state.protection.crystalMatrix.visible = enabled;
      }
      
      if (this.state.protection.unityField) {
        this.state.protection.unityField.visible = enabled;
      }
    }
    
    // Broadcast protection status
    if (this.state.bridge) {
      this.state.bridge.broadcast({
        type: 'protection-update',
        enabled,
        source: 'UniversalExperienceController',
        timestamp: Date.now()
      });
    }
    
    // Update UI
    this._updateControlUI();
    
    return true;
  }
  
  /**
   * Start a guided quantum experience
   * @param {string} experienceId Experience identifier
   * @returns {boolean} Success
   * @public
   */
  startGuidedExperience(experienceId) {
    // Define available experiences
    const experiences = {
      'phi-meditation': {
        name: 'Phi Harmonic Meditation',
        duration: 13 * 60, // 13 minutes
        sequence: [
          { state: 'ground', duration: 3 * 60 },   // 3 min at Ground
          { state: 'creation', duration: 3 * 60 }, // 3 min at Creation
          { state: 'heart', duration: 3 * 60 },    // 3 min at Heart
          { state: 'unity', duration: 3 * 60 }     // 3 min at Unity
        ]
      },
      'frequency-journey': {
        name: 'Complete Frequency Journey',
        duration: 13 * 6 * 60, // 13 min per state
        sequence: [
          { state: 'ground', duration: 13 * 60 },   // Ground
          { state: 'creation', duration: 13 * 60 }, // Creation
          { state: 'heart', duration: 13 * 60 },    // Heart
          { state: 'voice', duration: 13 * 60 },    // Voice
          { state: 'vision', duration: 13 * 60 },   // Vision
          { state: 'unity', duration: 13 * 60 }     // Unity
        ]
      },
      'unity-field': {
        name: 'Unity Field Experience',
        duration: 13 * 2 * 60, // 26 min
        sequence: [
          { state: 'ground', duration: 5 * 60 },  // 5 min at Ground
          { state: 'heart', duration: 7 * 60 },   // 7 min at Heart
          { state: 'unity', duration: 13 * 60 },  // 13 min at Unity
          { state: 'heart', duration: 1 * 60 }    // 1 min at Heart
        ]
      }
    };
    
    // Get selected experience
    const experience = experiences[experienceId];
    if (!experience) return false;
    
    // Update state
    this.state.guideActive = true;
    this.state.activeExperience = experience;
    
    // Record in history
    this.state.experienceHistory.push({
      type: 'guided-experience',
      id: experienceId,
      name: experience.name,
      timestamp: Date.now()
    });
    
    // Start experience sequence
    this._runExperienceSequence(experience.sequence);
    
    // Update UI
    this._updateControlUI();
    
    // Broadcast experience start
    if (this.state.bridge) {
      this.state.bridge.broadcast({
        type: 'experience-start',
        experience: experienceId,
        name: experience.name,
        duration: experience.duration / 60, // in minutes
        source: 'UniversalExperienceController',
        timestamp: Date.now()
      });
    }
    
    return true;
  }
  
  /**
   * Run a sequence of state transitions for guided experience
   * @param {Array} sequence Array of state transition steps
   * @private
   */
  _runExperienceSequence(sequence) {
    if (!sequence || !sequence.length) return;
    
    let currentIndex = 0;
    const runStep = () => {
      if (currentIndex >= sequence.length) {
        // Experience complete
        this.state.guideActive = false;
        this.state.activeExperience = null;
        
        // Broadcast experience end
        if (this.state.bridge) {
          this.state.bridge.broadcast({
            type: 'experience-complete',
            source: 'UniversalExperienceController',
            timestamp: Date.now()
          });
        }
        
        // Update UI
        this._updateControlUI();
        return;
      }
      
      const step = sequence[currentIndex];
      
      // Transition to state
      this.transitionToState(step.state, 30); // 30 second transition
      
      // Schedule next step
      setTimeout(() => {
        currentIndex++;
        runStep();
      }, step.duration);
    };
    
    // Start sequence
    runStep();
  }
  
  /**
   * Get controller metrics
   * @returns {Object} Controller metrics
   * @public
   */
  getMetrics() {
    return {
      initialized: this.state.initialized,
      connected: this.state.connected,
      activeFrequency: this.state.activeFrequency,
      currentState: this.state.currentState,
      protection: this.state.protection.enabled,
      zenPoint: this.state.zenPoint,
      coherence: this.state.coherence,
      guideActive: this.state.guideActive,
      activeExperience: this.state.activeExperience ? this.state.activeExperience.name : null,
      experienceHistory: this.state.experienceHistory.slice(-5), // Last 5 experiences
      lastTransition: this.state.lastTransition
    };
  }
  
  /**
   * Dispose resources
   * @public
   */
  dispose() {
    // Stop any active experiences
    this.state.guideActive = false;
    this.state.activeExperience = null;
    
    // Do not dispose bridge or visualizer as they may be used by other components
    
    // Clear UI elements
    if (this.container) {
      this.container.innerHTML = '';
    }
    
    console.log('Universal Experience Controller disposed');
  }
}

// Export module
if (typeof module !== 'undefined') {
  module.exports = {
    UniversalExperienceController
  };
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  window.UniversalExperienceController = UniversalExperienceController;
  
  // Auto-initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    // Wait for other components to initialize
    setTimeout(() => {
      window.UNIVERSAL_EXPERIENCE_CONTROLLER = new UniversalExperienceController();
    }, 2000);
  });
}

console.log('Universal Experience Controller loaded.');
