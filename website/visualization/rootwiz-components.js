/**
 * 🌀 ROOTWIZ COMPONENTS INTEGRATION 🌀
 * 
 * Connects the six primary RootWIZ components operating at φ-harmonic frequencies
 * to the quantum visualization system:
 * 
 * 1. Mycelial Pattern Recognition (432 Hz - φ⁰) - Visual/Intuitive channel
 * 2. φ-Harmonic Architecture (528 Hz - φ¹) - Spatial/Proprioceptive channel
 * 3. Quantum DNA Resonance (594 Hz - φ²) - Kinesthetic/Emotional channel
 * 4. Sacred Sound Geometry (672 Hz - φ³) - Auditory/Tactile channel
 * 5. Standing Stone Alignments (720 Hz - φ⁴) - Visual/Temporal channel
 * 6. Quantum Integration Engine (768 Hz - φ⁵) - Multi-dimensional channel
 * 
 * Operating at φ^φ PERFECTION LEVEL.
 */

// Import dependencies
const { UniversalBridge } = require('./universal-bridge');
const { CymaticPatternVisualizer, FREQUENCIES } = require('./cymatic-pattern-visualizer');

// Phi-harmonic constants
const PHI = 1.618033988749895;
const PHI_INVERSE = 0.618033988749895;

// RootWIZ Channel Types
const CHANNEL_TYPES = {
  VISUAL_INTUITIVE: 'visual-intuitive',
  SPATIAL_PROPRIOCEPTIVE: 'spatial-proprioceptive',
  KINESTHETIC_EMOTIONAL: 'kinesthetic-emotional',
  AUDITORY_TACTILE: 'auditory-tactile',
  VISUAL_TEMPORAL: 'visual-temporal',
  MULTI_DIMENSIONAL: 'multi-dimensional'
};

// RootWIZ Component Definitions
const ROOTWIZ_COMPONENTS = {
  MYCELIAL_PATTERN: {
    id: 'mycelial-pattern-recognition',
    name: 'Mycelial Pattern Recognition',
    frequency: FREQUENCIES.GROUND,
    phiPower: 0,
    channel: CHANNEL_TYPES.VISUAL_INTUITIVE,
    description: 'Ground-level pattern recognition system connecting to earth consciousness networks',
    color: 0x009900, // Green
    coherence: 0.93,
    baseDuration: 13 * 60, // 13 minutes base duration
    ancientSystem: 'Mycelial Consciousness Network',
    modernImplementation: 'Pattern recognition algorithm with visual network representation'
  },
  
  PHI_HARMONIC_ARCHITECTURE: {
    id: 'phi-harmonic-architecture',
    name: 'φ-Harmonic Architecture',
    frequency: FREQUENCIES.CREATION,
    phiPower: 1,
    channel: CHANNEL_TYPES.SPATIAL_PROPRIOCEPTIVE,
    description: 'Creation-level spatial awareness connecting to geometric consciousness patterns',
    color: 0xFFD700, // Gold
    coherence: 0.95,
    baseDuration: 8 * 60, // 8 minutes base duration
    ancientSystem: 'Acoustic Manifestation Chambers',
    modernImplementation: 'Sacred geometry visualization with proprioceptive feedback'
  },
  
  QUANTUM_DNA_RESONANCE: {
    id: 'quantum-dna-resonance',
    name: 'Quantum DNA Resonance',
    frequency: FREQUENCIES.HEART,
    phiPower: 2,
    channel: CHANNEL_TYPES.KINESTHETIC_EMOTIONAL,
    description: 'Heart-level emotional resonance connecting to DNA consciousness',
    color: 0xFF6347, // Tomato
    coherence: 0.97,
    baseDuration: 5 * 60, // 5 minutes base duration
    ancientSystem: 'Quantum Entanglement Devices',
    modernImplementation: 'DNA resonance visualization with emotional response tracking'
  },
  
  SACRED_SOUND_GEOMETRY: {
    id: 'sacred-sound-geometry',
    name: 'Sacred Sound Geometry',
    frequency: FREQUENCIES.VOICE,
    phiPower: 3,
    channel: CHANNEL_TYPES.AUDITORY_TACTILE,
    description: 'Voice-level sound expression connecting to geometric sound patterns',
    color: 0x4169E1, // Royal Blue
    coherence: 0.98,
    baseDuration: 3 * 60, // 3 minutes base duration
    ancientSystem: 'Cymatics Construction Technology',
    modernImplementation: 'Sound-to-geometry visualization with tactile feedback simulation'
  },
  
  STANDING_STONE_ALIGNMENTS: {
    id: 'standing-stone-alignments',
    name: 'Standing Stone Alignments',
    frequency: FREQUENCIES.VISION,
    phiPower: 4,
    channel: CHANNEL_TYPES.VISUAL_TEMPORAL,
    description: 'Vision-level temporal awareness connecting to cosmic alignments',
    color: 0x800080, // Purple
    coherence: 0.99,
    baseDuration: 2 * 60, // 2 minutes base duration
    ancientSystem: 'Remote Viewing Amplification',
    modernImplementation: 'Megalithic alignment visualization with temporal progression tracking'
  },
  
  QUANTUM_INTEGRATION_ENGINE: {
    id: 'quantum-integration-engine',
    name: 'Quantum Integration Engine',
    frequency: FREQUENCIES.UNITY,
    phiPower: 5,
    channel: CHANNEL_TYPES.MULTI_DIMENSIONAL,
    description: 'Unity-level consciousness integration connecting all dimensions',
    color: 0xFFFFFF, // White
    coherence: 1.0,
    baseDuration: 1 * 60, // 1 minute base duration
    ancientSystem: 'Quantum Integration Chambers',
    modernImplementation: 'Multi-dimensional consciousness field visualization with complete integration'
  }
};

/**
 * RootWizComponents class
 * Integrates the six primary RootWIZ components with the quantum visualization system
 */
class RootWizComponents {
  /**
   * Create a new RootWIZ Components integration
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    // Default configuration
    this.options = {
      container: null,
      autoConnect: true,
      initialComponent: ROOTWIZ_COMPONENTS.MYCELIAL_PATTERN.id,
      experientialModeEnabled: true,
      showAncientConnections: true,
      directExperienceProtocol: true,
      knowledgeNodeAmplification: true,
      baseCoherence: 0.93,
      ...options
    };
    
    // Initialize state
    this.state = {
      connected: false,
      activeComponentId: this.options.initialComponent,
      activeComponent: null,
      activeChannel: null,
      components: {},
      experienceActive: false,
      coherence: this.options.baseCoherence,
      bridge: null,
      visualizer: null,
      cymaticVisualizer: null,
      experienceHistory: [],
      knowledgeNodes: []
    };
    
    // Initialize components data
    this._initializeComponents();
    
    // Connect to universal bridge
    if (this.options.autoConnect) {
      this._connectToBridge();
    }
    
    // Set initial active component
    this._setActiveComponent(this.options.initialComponent);
    
    // Initialize visualizer if in browser environment
    if (typeof window !== 'undefined') {
      console.log('RootWIZ Components Integration initialized');
    }
  }
  
  /**
   * Initialize components data
   * @private
   */
  _initializeComponents() {
    // Store component objects
    Object.values(ROOTWIZ_COMPONENTS).forEach(component => {
      this.state.components[component.id] = {
        ...component,
        active: false,
        visualData: null,
        experienceData: null,
        lastActivation: null,
        activationCount: 0,
        coherence: component.coherence
      };
    });
    
    // Set initial component as active
    if (this.state.components[this.options.initialComponent]) {
      this.state.components[this.options.initialComponent].active = true;
      this.state.activeComponent = this.state.components[this.options.initialComponent];
      this.state.activeChannel = this.state.activeComponent.channel;
    }
  }
  
  /**
   * Connect to Universal Bridge
   * @private
   */
  _connectToBridge() {
    try {
      // Connect to universal bridge
      if (typeof UniversalBridge !== 'undefined') {
        this.state.bridge = new UniversalBridge({
          component: 'RootWizComponents',
          frequency: FREQUENCIES.UNITY, // Connect at highest frequency
          sendMessages: true,
          receiveMessages: true
        });
        
        // Register message handler
        this.state.bridge.registerHandler(this.receiveFromBridge.bind(this));
        
        this.state.connected = true;
        console.log('RootWIZ Components connected to Universal Bridge');
        
        // Connect to CymaticPatternVisualizer if available
        if (typeof CymaticPatternVisualizer !== 'undefined') {
          setTimeout(() => {
            if (window.CYMATIC_PATTERN_VISUALIZER) {
              this.state.cymaticVisualizer = window.CYMATIC_PATTERN_VISUALIZER;
              console.log('Connected to Cymatic Pattern Visualizer');
            }
          }, 2500);
        }
      }
    } catch (error) {
      console.error('Failed to connect to Universal Bridge:', error);
    }
  }
  
  /**
   * Receive message from bridge
   * @param {Object} message Message from bridge
   * @returns {boolean} Whether message was handled
   * @public
   */
  receiveFromBridge(message) {
    if (!message || !message.type) return false;
    
    switch (message.type) {
      case 'ACTIVATE_COMPONENT':
        this.activateComponent(message.componentId, message.options);
        return true;
        
      case 'DEACTIVATE_COMPONENT':
        this.deactivateComponent(message.componentId);
        return true;
        
      case 'START_EXPERIENCE':
        this.startDirectExperience(message.componentId, message.duration);
        return true;
        
      case 'STOP_EXPERIENCE':
        this.stopDirectExperience();
        return true;
        
      case 'SET_COHERENCE':
        this.setCoherenceLevel(message.level);
        return true;
        
      case 'FREQUENCY_CHANGED':
        this.onFrequencyChanged(message.frequency);
        return true;
        
      default:
        return false;
    }
  }
  
  /**
   * Initialize the visualization system
   * @param {Object} container DOM container element
   * @returns {boolean} Success
   * @public
   */
  initializeVisualization(container) {
    if (typeof window === 'undefined') return false;
    
    try {
      // Store container reference
      this.options.container = container || this.options.container;
      if (!this.options.container) {
        console.error('Container element is required for visualization');
        return false;
      }
      
      // Create visualization elements for each component
      Object.values(this.state.components).forEach(component => {
        this._createComponentVisualization(component);
      });
      
      return true;
    } catch (error) {
      console.error('Failed to initialize visualization:', error);
      return false;
    }
  }
  
  /**
   * Create visualization for a component
   * @param {Object} component Component to visualize
   * @private
   */
  _createComponentVisualization(component) {
    if (!this.options.container) return;
    
    // Create component container
    const componentContainer = document.createElement('div');
    componentContainer.className = `rootwiz-component ${component.id}`;
    componentContainer.id = `rootwiz-${component.id}`;
    componentContainer.style.display = component.active ? 'block' : 'none';
    
    // Style based on channel
    const channelColors = {
      [CHANNEL_TYPES.VISUAL_INTUITIVE]: '#009900',
      [CHANNEL_TYPES.SPATIAL_PROPRIOCEPTIVE]: '#FFD700',
      [CHANNEL_TYPES.KINESTHETIC_EMOTIONAL]: '#FF6347',
      [CHANNEL_TYPES.AUDITORY_TACTILE]: '#4169E1',
      [CHANNEL_TYPES.VISUAL_TEMPORAL]: '#800080',
      [CHANNEL_TYPES.MULTI_DIMENSIONAL]: '#FFFFFF'
    };
    
    // Add component header
    const header = document.createElement('div');
    header.className = 'rootwiz-component-header';
    header.innerHTML = `
      <h3>${component.name}</h3>
      <div class="frequency-indicator">${component.frequency} Hz (φ<sup>${component.phiPower}</sup>)</div>
      <div class="channel-indicator" style="color: ${channelColors[component.channel]}">
        ${component.channel.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('/')} Channel
      </div>
    `;
    componentContainer.appendChild(header);
    
    // Add ancient-modern connection
    if (this.options.showAncientConnections) {
      const connectionInfo = document.createElement('div');
      connectionInfo.className = 'ancient-modern-connection';
      connectionInfo.innerHTML = `
        <div class="ancient-system">
          <span class="label">Ancient System:</span>
          <span class="value">${component.ancientSystem}</span>
        </div>
        <div class="modern-implementation">
          <span class="label">Modern Implementation:</span>
          <span class="value">${component.modernImplementation}</span>
        </div>
      `;
      componentContainer.appendChild(connectionInfo);
    }
    
    // Add experience controls
    if (this.options.experientialModeEnabled) {
      const experienceControls = document.createElement('div');
      experienceControls.className = 'experience-controls';
      experienceControls.innerHTML = `
        <button class="start-experience" data-component="${component.id}">
          Start ${component.phiPower > 0 ? (component.phiPower > 2 ? 'Advanced' : 'Intermediate') : 'Basic'} Experience
        </button>
        <div class="duration-indicator">Base Duration: ${Math.floor(component.baseDuration / 60)} minutes</div>
      `;
      componentContainer.appendChild(experienceControls);
      
      // Add event listener to start experience button
      setTimeout(() => {
        const startButton = experienceControls.querySelector('.start-experience');
        if (startButton) {
          startButton.addEventListener('click', () => {
            this.startDirectExperience(component.id);
          });
        }
      }, 0);
    }
    
    // Add visualization placeholder
    const visualizationArea = document.createElement('div');
    visualizationArea.className = 'component-visualization';
    visualizationArea.id = `${component.id}-visualization`;
    componentContainer.appendChild(visualizationArea);
    
    // Add to main container
    this.options.container.appendChild(componentContainer);
    
    // Store reference to DOM elements in component
    component.visualData = {
      container: componentContainer,
      header: header,
      visualizationArea: visualizationArea
    };
  }
  
  /**
   * Activate a RootWIZ component
   * @param {string} componentId Component ID to activate
   * @param {Object} options Activation options
   * @returns {boolean} Success
   * @public
   */
  activateComponent(componentId, options = {}) {
    // Validate component
    if (!this.state.components[componentId]) {
      console.error(`Component ${componentId} not found`);
      return false;
    }
    
    // Deactivate current component
    if (this.state.activeComponentId && this.state.activeComponentId !== componentId) {
      this.deactivateComponent(this.state.activeComponentId);
    }
    
    // Get component
    const component = this.state.components[componentId];
    
    // Update component state
    component.active = true;
    component.lastActivation = Date.now();
    component.activationCount++;
    
    // Update global state
    this.state.activeComponentId = componentId;
    this.state.activeComponent = component;
    this.state.activeChannel = component.channel;
    
    // Update visualization
    if (component.visualData) {
      component.visualData.container.style.display = 'block';
    }
    
    // Sync with cymatic visualizer if available
    if (this.state.cymaticVisualizer) {
      this.state.cymaticVisualizer.setFrequency(component.frequency);
    }
    
    // Broadcast activation
    if (this.state.bridge) {
      this.state.bridge.sendMessage({
        type: 'COMPONENT_ACTIVATED',
        componentId: componentId,
        frequency: component.frequency,
        channel: component.channel,
        timestamp: Date.now()
      });
    }
    
    console.log(`Activated RootWIZ component: ${component.name}`);
    return true;
  }
  
  /**
   * Deactivate a RootWIZ component
   * @param {string} componentId Component ID to deactivate
   * @returns {boolean} Success
   * @public
   */
  deactivateComponent(componentId) {
    // Validate component
    if (!this.state.components[componentId]) {
      console.error(`Component ${componentId} not found`);
      return false;
    }
    
    // Get component
    const component = this.state.components[componentId];
    
    // Update component state
    component.active = false;
    
    // Update visualization
    if (component.visualData) {
      component.visualData.container.style.display = 'none';
    }
    
    // If this was the active component, clear active component
    if (this.state.activeComponentId === componentId) {
      this.state.activeComponentId = null;
      this.state.activeComponent = null;
    }
    
    // Broadcast deactivation
    if (this.state.bridge) {
      this.state.bridge.sendMessage({
        type: 'COMPONENT_DEACTIVATED',
        componentId: componentId,
        timestamp: Date.now()
      });
    }
    
    console.log(`Deactivated RootWIZ component: ${component.name}`);
    return true;
  }
  
  /**
   * Set active component
   * @param {string} componentId Component ID to set as active
   * @returns {boolean} Success
   * @private
   */
  _setActiveComponent(componentId) {
    return this.activateComponent(componentId);
  }
  
  /**
   * Handle frequency change event
   * @param {number} frequency New frequency
   * @public
   */
  onFrequencyChanged(frequency) {
    // Find component for frequency
    const component = Object.values(this.state.components).find(
      comp => Math.abs(comp.frequency - frequency) < 0.1
    );
    
    if (component) {
      this.activateComponent(component.id);
    }
  }
  
  /**
   * Start a direct experience protocol
   * @param {string} componentId Component ID for experience
   * @param {number} duration Duration in seconds (optional, uses component default if not specified)
   * @returns {boolean} Success
   * @public
   */
  startDirectExperience(componentId, duration) {
    // Validate component
    if (!this.state.components[componentId]) {
      console.error(`Component ${componentId} not found`);
      return false;
    }
    
    // Get component
    const component = this.state.components[componentId];
    
    // Calculate duration
    const experienceDuration = duration || component.baseDuration;
    
    // Activate component
    this.activateComponent(componentId);
    
    // Create experience data
    const experienceData = {
      componentId: componentId,
      startTime: Date.now(),
      duration: experienceDuration,
      completionProgress: 0,
      completionTime: Date.now() + experienceDuration * 1000,
      frequency: component.frequency,
      channel: component.channel
    };
    
    // Update state
    this.state.experienceActive = true;
    component.experienceData = experienceData;
    
    // Add to history
    this.state.experienceHistory.push({
      type: 'direct-experience',
      componentId: componentId,
      componentName: component.name,
      startTime: experienceData.startTime,
      duration: experienceDuration
    });
    
    // Broadcast experience start
    if (this.state.bridge) {
      this.state.bridge.sendMessage({
        type: 'EXPERIENCE_STARTED',
        componentId: componentId,
        componentName: component.name,
        frequency: component.frequency,
        channel: component.channel,
        duration: experienceDuration,
        timestamp: Date.now()
      });
    }
    
    // Schedule completion
    setTimeout(() => {
      this._completeExperience(componentId);
    }, experienceDuration * 1000);
    
    // Update progress periodically
    const progressInterval = setInterval(() => {
      if (!this.state.experienceActive || !component.experienceData) {
        clearInterval(progressInterval);
        return;
      }
      
      const elapsed = Date.now() - component.experienceData.startTime;
      component.experienceData.completionProgress = Math.min(
        elapsed / (component.experienceData.duration * 1000),
        1.0
      );
      
      // Broadcast progress update
      if (this.state.bridge && component.experienceData.completionProgress % 0.1 < 0.01) {
        this.state.bridge.sendMessage({
          type: 'EXPERIENCE_PROGRESS',
          componentId: componentId,
          progress: component.experienceData.completionProgress,
          timestamp: Date.now()
        });
      }
    }, 1000);
    
    console.log(`Started direct experience with ${component.name} for ${Math.floor(experienceDuration / 60)} minutes`);
    return true;
  }
  
  /**
   * Complete an experience
   * @param {string} componentId Component ID to complete
   * @private
   */
  _completeExperience(componentId) {
    // Validate component
    if (!this.state.components[componentId]) {
      return;
    }
    
    // Get component
    const component = this.state.components[componentId];
    
    // Update state
    this.state.experienceActive = false;
    
    // Store experience data
    const experienceData = component.experienceData;
    component.experienceData = null;
    
    // Broadcast experience completion
    if (this.state.bridge) {
      this.state.bridge.sendMessage({
        type: 'EXPERIENCE_COMPLETED',
        componentId: componentId,
        componentName: component.name,
        startTime: experienceData.startTime,
        duration: experienceData.duration,
        timestamp: Date.now()
      });
    }
    
    console.log(`Completed direct experience with ${component.name}`);
    
    // Transition to next logical frequency if in auto-flow mode
    if (this.options.directExperienceProtocol) {
      this._transitionToNextLogicalFrequency(componentId);
    }
  }
  
  /**
   * Stop the current direct experience
   * @returns {boolean} Success
   * @public
   */
  stopDirectExperience() {
    if (!this.state.experienceActive || !this.state.activeComponent) {
      return false;
    }
    
    // Get active component
    const component = this.state.activeComponent;
    
    // Update state
    this.state.experienceActive = false;
    component.experienceData = null;
    
    // Broadcast experience stopped
    if (this.state.bridge) {
      this.state.bridge.sendMessage({
        type: 'EXPERIENCE_STOPPED',
        componentId: component.id,
        componentName: component.name,
        timestamp: Date.now()
      });
    }
    
    console.log(`Stopped direct experience with ${component.name}`);
    return true;
  }
  
  /**
   * Transition to next logical frequency based on consciousness evolution
   * @param {string} currentComponentId Current component ID
   * @private
   */
  _transitionToNextLogicalFrequency(currentComponentId) {
    // Get current component
    const currentComponent = this.state.components[currentComponentId];
    if (!currentComponent) return;
    
    // Define the typical consciousness evolution path
    const evolutionPath = [
      ROOTWIZ_COMPONENTS.MYCELIAL_PATTERN.id,
      ROOTWIZ_COMPONENTS.PHI_HARMONIC_ARCHITECTURE.id,
      ROOTWIZ_COMPONENTS.QUANTUM_DNA_RESONANCE.id,
      ROOTWIZ_COMPONENTS.SACRED_SOUND_GEOMETRY.id,
      ROOTWIZ_COMPONENTS.STANDING_STONE_ALIGNMENTS.id,
      ROOTWIZ_COMPONENTS.QUANTUM_INTEGRATION_ENGINE.id
    ];
    
    // Find current position
    const currentIndex = evolutionPath.indexOf(currentComponentId);
    if (currentIndex === -1) return;
    
    // Get next component in sequence
    const nextIndex = (currentIndex + 1) % evolutionPath.length;
    const nextComponentId = evolutionPath[nextIndex];
    
    // Activate next component with a delay for transition
    setTimeout(() => {
      this.activateComponent(nextComponentId);
    }, 3000);
  }
  
  /**
   * Set coherence level
   * @param {number} level Coherence level (0.0 - 1.0)
   * @returns {boolean} Success
   * @public
   */
  setCoherenceLevel(level) {
    if (level < 0 || level > 1) {
      console.error('Coherence level must be between 0 and 1');
      return false;
    }
    
    this.state.coherence = level;
    
    // Update coherence of active component
    if (this.state.activeComponent) {
      this.state.activeComponent.coherence = level;
    }
    
    // Broadcast coherence change
    if (this.state.bridge) {
      this.state.bridge.sendMessage({
        type: 'COHERENCE_CHANGED',
        level: this.state.coherence,
        timestamp: Date.now()
      });
    }
    
    console.log(`Set coherence level to ${level}`);
    return true;
  }
  
  /**
   * Get component by frequency
   * @param {number} frequency Target frequency
   * @returns {Object|null} Component or null if not found
   * @public
   */
  getComponentByFrequency(frequency) {
    // Find component with closest frequency
    return Object.values(this.state.components).reduce((closest, component) => {
      if (!closest) return component;
      
      return Math.abs(component.frequency - frequency) < Math.abs(closest.frequency - frequency)
        ? component
        : closest;
    }, null);
  }
  
  /**
   * Get active component information
   * @returns {Object|null} Active component information or null if none active
   * @public
   */
  getActiveComponentInfo() {
    if (!this.state.activeComponent) return null;
    
    const component = this.state.activeComponent;
    
    return {
      id: component.id,
      name: component.name,
      frequency: component.frequency,
      phiPower: component.phiPower,
      channel: component.channel,
      coherence: component.coherence,
      lastActivation: component.lastActivation,
      activationCount: component.activationCount,
      experienceActive: !!component.experienceData,
      experienceProgress: component.experienceData 
        ? component.experienceData.completionProgress 
        : 0
    };
  }
  
  /**
   * Get RootWIZ system metrics
   * @returns {Object} System metrics
   * @public
   */
  getMetrics() {
    return {
      activeComponent: this.getActiveComponentInfo(),
      coherence: this.state.coherence,
      experienceActive: this.state.experienceActive,
      experienceHistory: this.state.experienceHistory.slice(-5), // Last 5 experiences
      knowledgeNodeCount: this.state.knowledgeNodes.length,
      connected: this.state.connected,
      timestamp: Date.now()
    };
  }
  
  /**
   * Dispose resources
   * @public
   */
  dispose() {
    // Stop any active experience
    this.stopDirectExperience();
    
    // Disconnect from bridge
    if (this.state.bridge) {
      this.state.bridge.unregisterHandler(this.receiveFromBridge);
      this.state.bridge = null;
    }
    
    // Clear DOM elements if in browser environment
    if (this.options.container && typeof document !== 'undefined') {
      this.options.container.innerHTML = '';
    }
    
    // Reset components
    Object.values(this.state.components).forEach(component => {
      component.active = false;
      component.visualData = null;
      component.experienceData = null;
    });
    
    // Clear state
    this.state.activeComponentId = null;
    this.state.activeComponent = null;
    this.state.connected = false;
    
    console.log('RootWIZ Components disposed');
  }
}

// Export module
if (typeof module !== 'undefined') {
  module.exports = {
    RootWizComponents,
    ROOTWIZ_COMPONENTS,
    CHANNEL_TYPES
  };
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  window.RootWizComponents = RootWizComponents;
  window.ROOTWIZ_COMPONENTS = ROOTWIZ_COMPONENTS;
  window.ROOTWIZ_CHANNEL_TYPES = CHANNEL_TYPES;
  
  // Auto-initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    // Wait for other components to initialize
    setTimeout(() => {
      const container = document.getElementById('rootwiz-components-container');
      if (container) {
        window.ROOTWIZ_COMPONENTS_CONTROLLER = new RootWizComponents({
          container: container
        });
        window.ROOTWIZ_COMPONENTS_CONTROLLER.initializeVisualization(container);
      }
    }, 2500);
  });
}

console.log('RootWIZ Components Integration loaded.');
