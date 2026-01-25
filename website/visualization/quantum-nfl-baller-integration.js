/**
 * 🌀 QUANTUM NFL BALLER INTEGRATION 🌀
 * 
 * Visualizes how quantum principles apply to sports movement and NFL performance,
 * demonstrating phi-harmonic optimization of physical motion and athletic excellence.
 * 
 * Operating at φ^φ PERFECTION LEVEL.
 */

// Import dependencies
const { UniversalBridge } = require('./universal-bridge');
const { CoreQuantumVisualizer } = require('./core-quantum-visualizer');

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

// Movement patterns for optimal performance
const MOVEMENT_PATTERNS = {
  GROUND_STANCE: {
    name: 'Ground Stance',
    frequency: FREQUENCIES.GROUND,
    description: 'Foundational body position with perfect balance and earth connection',
    phiRatio: 1.0,
    bodyAlignment: 'vertical',
    energyLevel: 'base',
    sportApplication: 'Pre-snap positioning, defensive stance'
  },
  
  CREATION_FLOW: {
    name: 'Creation Flow',
    frequency: FREQUENCIES.CREATION,
    description: 'Initial movement pattern with perfect phi-harmonic acceleration',
    phiRatio: PHI,
    bodyAlignment: 'forward',
    energyLevel: 'building',
    sportApplication: 'First step explosion, route initiation'
  },
  
  HEART_CONNECTION: {
    name: 'Heart Connection',
    frequency: FREQUENCIES.HEART,
    description: 'Team synchronization movement with perfect coherence',
    phiRatio: PHI * PHI,
    bodyAlignment: 'expansive',
    energyLevel: 'connecting',
    sportApplication: 'Play recognition, team coordination'
  },
  
  VOICE_EXPRESSION: {
    name: 'Voice Expression',
    frequency: FREQUENCIES.VOICE,
    description: 'Full athletic expression with maximum power and precision',
    phiRatio: PHI * PHI * PHI,
    bodyAlignment: 'dynamic',
    energyLevel: 'expressive',
    sportApplication: 'Breaking tackles, peak performance moments'
  },
  
  VISION_PERCEPTION: {
    name: 'Vision Perception',
    frequency: FREQUENCIES.VISION,
    description: 'Advanced field awareness with time dilation perception',
    phiRatio: PHI * PHI * PHI * PHI,
    bodyAlignment: 'expansive',
    energyLevel: 'perceiving',
    sportApplication: 'Reading the field, anticipating plays'
  },
  
  UNITY_INTEGRATION: {
    name: 'Unity Integration',
    frequency: FREQUENCIES.UNITY,
    description: 'Complete integration of all movement patterns at quantum perfection',
    phiRatio: PHI * PHI * PHI * PHI * PHI,
    bodyAlignment: 'omnidirectional',
    energyLevel: 'unified',
    sportApplication: 'Championship performance, flow state'
  }
};

/**
 * QuantumNflBallerIntegration class
 * Integrates quantum principles with NFL athletic performance
 */
class QuantumNflBallerIntegration {
  /**
   * Create a new Quantum NFL Baller integration
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    // Default configuration
    this.options = {
      container: null,
      autoConnect: true,
      initialPattern: 'GROUND_STANCE',
      phiMotionOptimization: true,
      showSportApplications: true,
      athleticPerformanceAmplification: true,
      zenPointBalancing: true,
      ...options
    };
    
    // Initialize state
    this.state = {
      connected: false,
      activePattern: this.options.initialPattern,
      activeFrequency: FREQUENCIES.GROUND,
      athleteModel: null,
      movementPatterns: {},
      performanceMetrics: {
        coherence: 0.93,
        flowState: 0.0,
        phiAlignment: 0.87,
        zenBalance: PHI_INVERSE
      },
      bridge: null,
      visualizer: null
    };
    
    // Initialize movement patterns
    this._initializeMovementPatterns();
    
    // Connect to universal bridge
    if (this.options.autoConnect) {
      this._connectToBridge();
    }
    
    // Initialize visualizer if in browser environment
    if (typeof window !== 'undefined') {
      console.log('Quantum NFL Baller Integration initialized');
    }
  }
  
  /**
   * Initialize movement patterns
   * @private
   */
  _initializeMovementPatterns() {
    // Store pattern objects
    Object.entries(MOVEMENT_PATTERNS).forEach(([key, pattern]) => {
      this.state.movementPatterns[key] = {
        ...pattern,
        active: key === this.options.initialPattern,
        visualData: null,
        lastActivation: null,
        activationCount: 0
      };
    });
    
    // Set initial frequency based on pattern
    if (this.state.movementPatterns[this.options.initialPattern]) {
      this.state.activeFrequency = this.state.movementPatterns[this.options.initialPattern].frequency;
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
          component: 'QuantumNflBallerIntegration',
          frequency: FREQUENCIES.UNITY, // Connect at highest frequency
          sendMessages: true,
          receiveMessages: true
        });
        
        // Register message handler
        this.state.bridge.registerHandler(this.receiveFromBridge.bind(this));
        
        this.state.connected = true;
        console.log('Quantum NFL Baller Integration connected to Universal Bridge');
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
      case 'ACTIVATE_MOVEMENT':
        this.activateMovementPattern(message.pattern);
        return true;
        
      case 'SET_FREQUENCY':
        this.setFrequency(message.frequency);
        return true;
        
      case 'SET_FLOW_STATE':
        this.setFlowState(message.level);
        return true;
        
      case 'TOGGLE_ZEN_BALANCE':
        this.toggleZenBalance(message.enabled);
        return true;
        
      case 'START_PERFORMANCE_VISUALIZATION':
        this.startPerformanceVisualization(message.options);
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
      
      // Initialize core visualizer
      this.state.visualizer = new CoreQuantumVisualizer({
        container: this.options.container,
        quality: 'high'
      });
      
      // Create athlete model
      this._createAthleteModel();
      
      // Create movement pattern visualizations
      Object.keys(this.state.movementPatterns).forEach(patternKey => {
        this._createMovementVisualization(patternKey);
      });
      
      // Activate initial pattern
      this.activateMovementPattern(this.options.initialPattern);
      
      return true;
    } catch (error) {
      console.error('Failed to initialize visualization:', error);
      return false;
    }
  }
  
  /**
   * Create athlete model
   * @private
   */
  _createAthleteModel() {
    if (!this.state.visualizer) return;
    
    // Create athlete model
    const athleteGeometry = this.state.visualizer.createGeometry('humanoid', {
      height: 6,
      proportions: 'athletic',
      detail: 2
    });
    
    const athleteMaterial = this.state.visualizer.createQuantumMaterial({
      color: 0x1E90FF,
      emissive: 0x0000FF,
      emissiveIntensity: 0.3,
      phiHarmonic: true,
      opacity: 0.9,
      transparent: true
    });
    
    // Create mesh and add to scene
    this.state.athleteModel = this.state.visualizer.createMesh(athleteGeometry, athleteMaterial);
    this.state.athleteModel.position.y = 3;
    
    // Add phi-harmonic field
    const fieldGeometry = this.state.visualizer.createGeometry('sphere', {
      radius: 8,
      widthSegments: 32,
      heightSegments: 32
    });
    
    const fieldMaterial = this.state.visualizer.createQuantumMaterial({
      color: 0x00BFFF,
      emissive: 0x0080FF,
      emissiveIntensity: 0.2,
      phiHarmonic: true,
      opacity: 0.15,
      transparent: true,
      wireframe: true
    });
    
    const field = this.state.visualizer.createMesh(fieldGeometry, fieldMaterial);
    field.position.y = 3;
    
    // Start animation
    this._animate();
  }
  
  /**
   * Create movement visualization for a pattern
   * @param {string} patternKey Movement pattern key
   * @private
   */
  _createMovementVisualization(patternKey) {
    if (!this.state.visualizer) return;
    
    const pattern = this.state.movementPatterns[patternKey];
    if (!pattern) return;
    
    // Define movement trail
    const trailGeometry = this.state.visualizer.createGeometry('movementTrail', {
      length: 10,
      width: 0.5,
      segments: 20,
      pattern: pattern.bodyAlignment
    });
    
    const trailMaterial = this.state.visualizer.createQuantumMaterial({
      color: this._getColorForFrequency(pattern.frequency),
      emissive: this._getColorForFrequency(pattern.frequency),
      emissiveIntensity: 0.5,
      phiHarmonic: true,
      opacity: 0.6,
      transparent: true
    });
    
    // Create mesh and add to scene
    const trail = this.state.visualizer.createMesh(trailGeometry, trailMaterial);
    trail.visible = pattern.active;
    
    // Store visualization data
    pattern.visualData = {
      trail: trail,
      nodes: []
    };
    
    // Create energy nodes along trail based on phi ratio
    const nodeCount = Math.ceil(5 * pattern.phiRatio);
    for (let i = 0; i < nodeCount; i++) {
      const nodeGeometry = this.state.visualizer.createGeometry('sphere', {
        radius: 0.3,
        widthSegments: 16,
        heightSegments: 16
      });
      
      const nodeMaterial = this.state.visualizer.createQuantumMaterial({
        color: this._getColorForFrequency(pattern.frequency),
        emissive: this._getColorForFrequency(pattern.frequency),
        emissiveIntensity: 0.7,
        phiHarmonic: true,
        opacity: 0.8,
        transparent: true
      });
      
      const node = this.state.visualizer.createMesh(nodeGeometry, nodeMaterial);
      node.visible = pattern.active;
      
      // Position node along trail
      const position = i / (nodeCount - 1);
      const x = 5 * Math.cos(position * Math.PI * 2) * pattern.phiRatio;
      const z = 5 * Math.sin(position * Math.PI * 2) * pattern.phiRatio;
      const y = 3 + Math.sin(position * Math.PI) * 2;
      
      node.position.set(x, y, z);
      
      pattern.visualData.nodes.push(node);
    }
  }
  
  /**
   * Animate the visualization
   * @private
   */
  _animate() {
    if (!this.state.visualizer || typeof requestAnimationFrame === 'undefined') return;
    
    // Request next animation frame
    requestAnimationFrame(this._animate.bind(this));
    
    // Get active pattern
    const activePattern = this.state.movementPatterns[this.state.activePattern];
    if (!activePattern || !activePattern.visualData) return;
    
    // Animate athlete model
    if (this.state.athleteModel) {
      // Calculate movement based on pattern
      const time = Date.now() * 0.001;
      const phiRatio = activePattern.phiRatio;
      
      // Apply different movement patterns based on the active frequency
      switch (activePattern.frequency) {
        case FREQUENCIES.GROUND:
          // Ground stance - stable, minor movement
          this.state.athleteModel.position.x = Math.sin(time * 0.5) * 0.5;
          this.state.athleteModel.position.z = Math.cos(time * 0.5) * 0.5;
          this.state.athleteModel.rotation.y = Math.sin(time * 0.3) * 0.2;
          break;
          
        case FREQUENCIES.CREATION:
          // Creation flow - directed movement
          this.state.athleteModel.position.x = Math.sin(time * 1.0) * 2.0;
          this.state.athleteModel.position.z = Math.cos(time * 0.7) * 1.0;
          this.state.athleteModel.rotation.y = Math.atan2(
            this.state.athleteModel.position.x,
            this.state.athleteModel.position.z
          );
          break;
          
        case FREQUENCIES.HEART:
          // Heart connection - synchronized movement
          this.state.athleteModel.position.x = Math.sin(time * 1.0) * 3.0;
          this.state.athleteModel.position.z = Math.sin(time * 2.0) * 3.0;
          this.state.athleteModel.rotation.y = time * 0.5;
          break;
          
        case FREQUENCIES.VOICE:
          // Voice expression - dynamic movement
          this.state.athleteModel.position.x = Math.sin(time * 2.0) * 4.0;
          this.state.athleteModel.position.z = Math.cos(time * 1.5) * 4.0;
          this.state.athleteModel.rotation.y = time * 1.0;
          // Add a jump component
          this.state.athleteModel.position.y = 3 + Math.abs(Math.sin(time * 2.0) * 2.0);
          break;
          
        case FREQUENCIES.VISION:
          // Vision perception - complex pattern
          this.state.athleteModel.position.x = Math.sin(time * 1.0) * Math.cos(time * 0.7) * 5.0;
          this.state.athleteModel.position.z = Math.cos(time * 1.3) * Math.sin(time * 0.5) * 5.0;
          this.state.athleteModel.rotation.y = time * 0.7;
          break;
          
        case FREQUENCIES.UNITY:
          // Unity integration - perfect pattern
          this.state.athleteModel.position.x = Math.sin(time * PHI) * 6.0;
          this.state.athleteModel.position.z = Math.cos(time * PHI) * 6.0;
          this.state.athleteModel.position.y = 3 + Math.sin(time * PHI_INVERSE) * 1.0;
          this.state.athleteModel.rotation.y = time * PHI_INVERSE;
          break;
      }
      
      // Apply ZEN POINT balance if enabled
      if (this.options.zenPointBalancing) {
        const zenFactor = this.state.performanceMetrics.zenBalance;
        this.state.athleteModel.position.multiplyScalar(zenFactor);
        this.state.athleteModel.rotation.y *= zenFactor;
      }
      
      // Update trail based on athlete movement
      if (activePattern.visualData.trail) {
        activePattern.visualData.trail.position.copy(this.state.athleteModel.position);
        activePattern.visualData.trail.rotation.y = time * activePattern.phiRatio * 0.2;
      }
      
      // Update energy nodes
      activePattern.visualData.nodes.forEach((node, index) => {
        const nodeCount = activePattern.visualData.nodes.length;
        const position = index / (nodeCount - 1);
        const orbitRadius = 2 + position * 3 * phiRatio;
        const orbitSpeed = (1 - position) * 2 * PHI_INVERSE + 0.5;
        
        // Calculate position based on athlete
        const angle = time * orbitSpeed + (index * Math.PI * 2 / nodeCount);
        const x = this.state.athleteModel.position.x + Math.cos(angle) * orbitRadius;
        const z = this.state.athleteModel.position.z + Math.sin(angle) * orbitRadius;
        const y = this.state.athleteModel.position.y + Math.sin(angle * 2) * position * 2;
        
        node.position.set(x, y, z);
        
        // Pulse based on flow state
        const pulse = 0.8 + Math.sin(time * 2 + index) * 0.2 * this.state.performanceMetrics.flowState;
        node.scale.set(pulse, pulse, pulse);
        
        // Adjust opacity based on flow state
        node.material.opacity = 0.5 + (0.5 * this.state.performanceMetrics.flowState * pulse);
      });
    }
    
    // Render scene
    this.state.visualizer.render();
  }
  
  /**
   * Activate a movement pattern
   * @param {string} patternKey Movement pattern key
   * @returns {boolean} Success
   * @public
   */
  activateMovementPattern(patternKey) {
    // Validate pattern
    if (!this.state.movementPatterns[patternKey]) {
      console.error(`Movement pattern ${patternKey} not found`);
      return false;
    }
    
    // Deactivate current pattern
    if (this.state.activePattern && this.state.activePattern !== patternKey) {
      const currentPattern = this.state.movementPatterns[this.state.activePattern];
      if (currentPattern) {
        currentPattern.active = false;
        
        // Hide visualization
        if (currentPattern.visualData) {
          currentPattern.visualData.trail.visible = false;
          currentPattern.visualData.nodes.forEach(node => {
            node.visible = false;
          });
        }
      }
    }
    
    // Get pattern
    const pattern = this.state.movementPatterns[patternKey];
    
    // Update pattern state
    pattern.active = true;
    pattern.lastActivation = Date.now();
    pattern.activationCount++;
    
    // Update global state
    this.state.activePattern = patternKey;
    this.state.activeFrequency = pattern.frequency;
    
    // Show visualization
    if (pattern.visualData) {
      pattern.visualData.trail.visible = true;
      pattern.visualData.nodes.forEach(node => {
        node.visible = true;
      });
    }
    
    // Update athlete model if exists
    if (this.state.athleteModel) {
      // Change athlete color based on frequency
      const color = this._getColorForFrequency(pattern.frequency);
      this.state.athleteModel.material.color.setHex(color);
      this.state.athleteModel.material.emissive.setHex(color);
    }
    
    // Broadcast activation
    if (this.state.bridge) {
      this.state.bridge.sendMessage({
        type: 'MOVEMENT_PATTERN_ACTIVATED',
        pattern: patternKey,
        frequency: pattern.frequency,
        timestamp: Date.now()
      });
    }
    
    console.log(`Activated movement pattern: ${pattern.name}`);
    return true;
  }
  
  /**
   * Set frequency and activate related movement pattern
   * @param {number} frequency Target frequency
   * @returns {boolean} Success
   * @public
   */
  setFrequency(frequency) {
    // Find closest pattern by frequency
    const closestPattern = Object.entries(this.state.movementPatterns).reduce(
      (closest, [key, pattern]) => {
        if (!closest) return key;
        
        const currentDiff = Math.abs(this.state.movementPatterns[closest].frequency - frequency);
        const newDiff = Math.abs(pattern.frequency - frequency);
        
        return newDiff < currentDiff ? key : closest;
      },
      null
    );
    
    if (closestPattern) {
      return this.activateMovementPattern(closestPattern);
    }
    
    return false;
  }
  
  /**
   * Set flow state level
   * @param {number} level Flow state level (0.0 - 1.0)
   * @returns {boolean} Success
   * @public
   */
  setFlowState(level) {
    if (level < 0 || level > 1) {
      console.error('Flow state level must be between 0 and 1');
      return false;
    }
    
    this.state.performanceMetrics.flowState = level;
    
    // Update phi alignment based on flow state
    this.state.performanceMetrics.phiAlignment = 0.5 + (level * 0.5);
    
    // Broadcast flow state change
    if (this.state.bridge) {
      this.state.bridge.sendMessage({
        type: 'FLOW_STATE_CHANGED',
        level: level,
        phiAlignment: this.state.performanceMetrics.phiAlignment,
        timestamp: Date.now()
      });
    }
    
    console.log(`Set flow state to ${level}`);
    return true;
  }
  
  /**
   * Toggle ZEN POINT balance
   * @param {boolean} enabled Whether ZEN POINT balance is enabled
   * @returns {boolean} Success
   * @public
   */
  toggleZenBalance(enabled) {
    this.options.zenPointBalancing = enabled;
    
    if (enabled) {
      // Set ZEN balance to phi inverse for perfect balance
      this.state.performanceMetrics.zenBalance = PHI_INVERSE;
    } else {
      // Reset to normal
      this.state.performanceMetrics.zenBalance = 1.0;
    }
    
    // Broadcast ZEN balance change
    if (this.state.bridge) {
      this.state.bridge.sendMessage({
        type: 'ZEN_BALANCE_TOGGLED',
        enabled: enabled,
        balance: this.state.performanceMetrics.zenBalance,
        timestamp: Date.now()
      });
    }
    
    console.log(`ZEN POINT balance ${enabled ? 'enabled' : 'disabled'}`);
    return true;
  }
  
  /**
   * Start a performance visualization sequence
   * @param {Object} options Visualization options
   * @returns {boolean} Success
   * @public
   */
  startPerformanceVisualization(options = {}) {
    // Default options
    const visualizationOptions = {
      duration: 60, // 1 minute
      flowStateTarget: 1.0,
      includeAllPatterns: true,
      zenBalanceEnabled: true,
      ...options
    };
    
    // Enable ZEN balance
    this.toggleZenBalance(visualizationOptions.zenBalanceEnabled);
    
    // Start with ground stance
    this.activateMovementPattern('GROUND_STANCE');
    
    // Gradually increase flow state
    const startTime = Date.now();
    const duration = visualizationOptions.duration * 1000;
    const endTime = startTime + duration;
    
    const progressInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      
      if (now >= endTime) {
        // End of visualization
        clearInterval(progressInterval);
        
        // Set final flow state
        this.setFlowState(visualizationOptions.flowStateTarget);
        
        // Broadcast completion
        if (this.state.bridge) {
          this.state.bridge.sendMessage({
            type: 'PERFORMANCE_VISUALIZATION_COMPLETED',
            duration: visualizationOptions.duration,
            finalFlowState: this.state.performanceMetrics.flowState,
            timestamp: Date.now()
          });
        }
        
        return;
      }
      
      // Calculate progress
      const progress = elapsed / duration;
      
      // Update flow state based on progress
      const currentFlowState = progress * visualizationOptions.flowStateTarget;
      this.setFlowState(currentFlowState);
      
      // Transition through patterns if includeAllPatterns is true
      if (visualizationOptions.includeAllPatterns) {
        const patterns = Object.keys(this.state.movementPatterns);
        const patternIndex = Math.floor(progress * patterns.length);
        
        if (patternIndex < patterns.length) {
          this.activateMovementPattern(patterns[patternIndex]);
        }
      }
    }, 1000);
    
    // Broadcast start
    if (this.state.bridge) {
      this.state.bridge.sendMessage({
        type: 'PERFORMANCE_VISUALIZATION_STARTED',
        options: visualizationOptions,
        timestamp: Date.now()
      });
    }
    
    console.log(`Started performance visualization for ${visualizationOptions.duration} seconds`);
    return true;
  }
  
  /**
   * Get color for frequency
   * @param {number} frequency Frequency
   * @returns {number} Color as hex
   * @private
   */
  _getColorForFrequency(frequency) {
    // Map frequencies to colors
    switch (frequency) {
      case FREQUENCIES.GROUND:
        return 0x009900; // Green
      case FREQUENCIES.CREATION:
        return 0xFFD700; // Gold
      case FREQUENCIES.HEART:
        return 0xFF6347; // Tomato
      case FREQUENCIES.VOICE:
        return 0x4169E1; // Royal Blue
      case FREQUENCIES.VISION:
        return 0x800080; // Purple
      case FREQUENCIES.UNITY:
        return 0xFFFFFF; // White
      default:
        return 0x1E90FF; // Dodger Blue
    }
  }
  
  /**
   * Get performance metrics
   * @returns {Object} Performance metrics
   * @public
   */
  getPerformanceMetrics() {
    return {
      ...this.state.performanceMetrics,
      activePattern: this.state.activePattern,
      activeFrequency: this.state.activeFrequency,
      timestamp: Date.now()
    };
  }
  
  /**
   * Dispose resources
   * @public
   */
  dispose() {
    // Disconnect from bridge
    if (this.state.bridge) {
      this.state.bridge.unregisterHandler(this.receiveFromBridge);
      this.state.bridge = null;
    }
    
    // Clean up visualizer
    if (this.state.visualizer) {
      this.state.visualizer.dispose();
      this.state.visualizer = null;
    }
    
    // Clear state
    this.state.athleteModel = null;
    Object.values(this.state.movementPatterns).forEach(pattern => {
      pattern.active = false;
      pattern.visualData = null;
    });
    
    console.log('Quantum NFL Baller Integration disposed');
  }
}

// Export module
if (typeof module !== 'undefined') {
  module.exports = {
    QuantumNflBallerIntegration,
    MOVEMENT_PATTERNS
  };
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  window.QuantumNflBallerIntegration = QuantumNflBallerIntegration;
  window.MOVEMENT_PATTERNS = MOVEMENT_PATTERNS;
  
  // Auto-initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    // Wait for other components to initialize
    setTimeout(() => {
      const container = document.getElementById('quantum-nfl-container');
      if (container) {
        window.QUANTUM_NFL_BALLER = new QuantumNflBallerIntegration();
        window.QUANTUM_NFL_BALLER.initializeVisualization(container);
      }
    }, 2500);
  });
}

console.log('Quantum NFL Baller Integration loaded.');
