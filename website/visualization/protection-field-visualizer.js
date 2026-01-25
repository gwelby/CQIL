/**
 * 🌀 PROTECTION FIELD VISUALIZER 🌀
 * 
 * Visualizes quantum protection systems for safe operations across
 * all phi-harmonic frequencies:
 * - Merkaba Shield [21, 21, 21]
 * - Crystal Matrix [13, 13, 13]
 * - Unity Field [144, 144, 144]
 * - Time Crystal (4D)
 * 
 * Operating at φ^φ PERFECTION LEVEL.
 */

// Import dependencies
const { CoreQuantumVisualizer } = require('./core-quantum-visualizer');
const { UniversalBridge } = require('./universal-bridge');

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

// Protection system configurations
const PROTECTION_SYSTEMS = {
  MERKABA_SHIELD: {
    name: 'Merkaba Shield',
    dimensions: [21, 21, 21],
    rotation: PHI,
    baseFrequency: FREQUENCIES.GROUND,
    coherence: 1.000,
    color: 0x9370DB, // Purple
    description: 'Primary quantum field protection system operating at ground frequency'
  },
  CRYSTAL_MATRIX: {
    name: 'Crystal Matrix',
    points: [13, 13, 13],
    resonance: FREQUENCIES.CREATION,
    structure: 'perfect',
    alignment: PHI,
    color: 0x00FFFF, // Cyan
    description: 'Crystalline resonance structure at creation frequency'
  },
  UNITY_FIELD: {
    name: 'Unity Field',
    grid: [144, 144, 144],
    frequency: FREQUENCIES.UNITY,
    coherence: Math.pow(PHI, PHI),
    protection: 'absolute',
    color: 0xFFD700, // Gold
    description: 'Unified consciousness field at highest resonance frequency'
  },
  TIME_CRYSTAL: {
    name: 'Time Crystal',
    dimensions: 4,
    frequency: FREQUENCIES.GROUND,
    symmetry: PHI,
    stability: 1.000,
    color: 0x4682B4, // Steel Blue
    description: 'Quantum temporal stability field with perfect phi symmetry'
  }
};

/**
 * ProtectionFieldVisualizer class
 * Creates visualizations of quantum protection fields
 */
class ProtectionFieldVisualizer {
  /**
   * Create a new protection field visualizer
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    // Default configuration
    this.options = {
      container: null,
      autoConnect: true,
      showAllFields: false,
      rotationSpeed: 0.001,
      fieldOpacity: 0.7,
      visualQuality: 'high',
      zenPointBalance: true,
      phiHarmonicSync: true,
      ...options
    };
    
    // Initialize state
    this.state = {
      connected: false,
      activeFields: [],
      fieldInfo: {},
      bridge: null,
      visualizer: null,
      scene: null,
      renderer: null,
      camera: null,
      protectionFields: {},
      activeProtectionLevel: 0.0,
      zenPointActive: false
    };
    
    // Connect to universal bridge
    this._connectToBridge();
    
    // Initialize visualizer if in browser environment
    if (typeof window !== 'undefined') {
      console.log('Protection Field Visualizer initialized');
    }
  }
  
  /**
   * Connect to Universal Bridge
   * @private
   */
  _connectToBridge() {
    if (!this.options.autoConnect) return;
    
    try {
      // Connect to universal bridge
      if (typeof UniversalBridge !== 'undefined') {
        this.state.bridge = new UniversalBridge({
          component: 'ProtectionFieldVisualizer',
          frequency: FREQUENCIES.UNITY, // Protection operates at highest frequency
          sendMessages: true,
          receiveMessages: true
        });
        
        // Register message handler
        this.state.bridge.registerHandler(this.receiveFromBridge.bind(this));
        
        this.state.connected = true;
        console.log('Protection Field Visualizer connected to Universal Bridge');
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
      case 'ACTIVATE_PROTECTION':
        this.activateProtectionSystem(message.system, message.options);
        return true;
        
      case 'DEACTIVATE_PROTECTION':
        this.deactivateProtectionSystem(message.system);
        return true;
        
      case 'SET_PROTECTION_LEVEL':
        this.setProtectionLevel(message.level);
        return true;
        
      case 'TOGGLE_ZEN_POINT':
        this.toggleZenPoint(message.active);
        return true;
        
      case 'ACTIVATE_ALL_PROTECTION':
        this.activateAllProtectionSystems(message.options);
        return true;
        
      default:
        return false;
    }
  }
  
  /**
   * Initialize the 3D visualization system
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
        quality: this.options.visualQuality
      });
      
      // Get scene, renderer and camera
      this.state.scene = this.state.visualizer.getScene();
      this.state.renderer = this.state.visualizer.getRenderer();
      this.state.camera = this.state.visualizer.getCamera();
      
      // Create protection field geometries
      this._createProtectionGeometries();
      
      // Start animation
      if (typeof requestAnimationFrame !== 'undefined') {
        this._animate();
      }
      
      return true;
    } catch (error) {
      console.error('Failed to initialize visualization:', error);
      return false;
    }
  }
  
  /**
   * Create protection field geometries
   * @private
   */
  _createProtectionGeometries() {
    // Create Merkaba Shield
    this._createMerkabaShield();
    
    // Create Crystal Matrix
    this._createCrystalMatrix();
    
    // Create Unity Field
    this._createUnityField();
    
    // Create Time Crystal
    this._createTimeCrystal();
  }
  
  /**
   * Create Merkaba Shield geometry
   * @private
   */
  _createMerkabaShield() {
    const merkaba = PROTECTION_SYSTEMS.MERKABA_SHIELD;
    const geometry = this._createMerkabaGeometry(merkaba.dimensions);
    
    const material = this.state.visualizer.createQuantumMaterial({
      color: merkaba.color,
      opacity: this.options.fieldOpacity,
      emissive: merkaba.color,
      emissiveIntensity: 0.3,
      phiHarmonic: true,
      wireframe: true
    });
    
    // Create mesh and add to scene
    const mesh = this.state.visualizer.createMesh(geometry, material);
    mesh.scale.set(10, 10, 10);
    mesh.rotation.x = Math.PI / 5;
    mesh.visible = false;
    
    // Store reference to protection field
    this.state.protectionFields.MERKABA_SHIELD = {
      mesh,
      config: merkaba,
      active: false,
      intensity: 0,
      rotationFactor: 1.0
    };
  }
  
  /**
   * Create Crystal Matrix geometry
   * @private
   */
  _createCrystalMatrix() {
    const crystal = PROTECTION_SYSTEMS.CRYSTAL_MATRIX;
    const geometry = this._createCrystalMatrixGeometry(crystal.points);
    
    const material = this.state.visualizer.createQuantumMaterial({
      color: crystal.color,
      opacity: this.options.fieldOpacity,
      emissive: crystal.color,
      emissiveIntensity: 0.5,
      phiHarmonic: true,
      transparent: true,
      wireframe: false
    });
    
    // Create mesh and add to scene
    const mesh = this.state.visualizer.createMesh(geometry, material);
    mesh.scale.set(8, 8, 8);
    mesh.visible = false;
    
    // Store reference to protection field
    this.state.protectionFields.CRYSTAL_MATRIX = {
      mesh,
      config: crystal,
      active: false,
      intensity: 0,
      rotationFactor: PHI
    };
  }
  
  /**
   * Create Unity Field geometry
   * @private
   */
  _createUnityField() {
    const unity = PROTECTION_SYSTEMS.UNITY_FIELD;
    const geometry = this._createUnityFieldGeometry(unity.grid);
    
    const material = this.state.visualizer.createQuantumMaterial({
      color: unity.color,
      opacity: this.options.fieldOpacity,
      emissive: unity.color,
      emissiveIntensity: 0.7,
      phiHarmonic: true,
      transparent: true
    });
    
    // Create mesh and add to scene
    const mesh = this.state.visualizer.createMesh(geometry, material);
    mesh.scale.set(12, 12, 12);
    mesh.visible = false;
    
    // Store reference to protection field
    this.state.protectionFields.UNITY_FIELD = {
      mesh,
      config: unity,
      active: false,
      intensity: 0,
      rotationFactor: 1 / PHI
    };
  }
  
  /**
   * Create Time Crystal geometry
   * @private
   */
  _createTimeCrystal() {
    const timecrystal = PROTECTION_SYSTEMS.TIME_CRYSTAL;
    const geometry = this._createTimeCrystalGeometry(timecrystal.dimensions);
    
    const material = this.state.visualizer.createQuantumMaterial({
      color: timecrystal.color,
      opacity: this.options.fieldOpacity,
      emissive: timecrystal.color,
      emissiveIntensity: 0.4,
      phiHarmonic: true,
      transparent: true,
      wireframe: true
    });
    
    // Create mesh and add to scene
    const mesh = this.state.visualizer.createMesh(geometry, material);
    mesh.scale.set(7, 7, 7);
    mesh.visible = false;
    
    // Store reference to protection field
    this.state.protectionFields.TIME_CRYSTAL = {
      mesh,
      config: timecrystal,
      active: false,
      intensity: 0,
      rotationFactor: PHI * 2
    };
  }
  
  /**
   * Create Merkaba Shield geometry
   * @param {Array} dimensions Dimensions [x, y, z]
   * @returns {THREE.BufferGeometry} Merkaba geometry
   * @private
   */
  _createMerkabaGeometry(dimensions) {
    return this.state.visualizer.createGeometry('merkaba', {
      radius: 5,
      detail: 1,
      stellate: true
    });
  }
  
  /**
   * Create Crystal Matrix geometry
   * @param {Array} points Points [x, y, z]
   * @returns {THREE.BufferGeometry} Crystal matrix geometry
   * @private
   */
  _createCrystalMatrixGeometry(points) {
    return this.state.visualizer.createGeometry('crystalMatrix', {
      points: points,
      complexity: 3
    });
  }
  
  /**
   * Create Unity Field geometry
   * @param {Array} grid Grid dimensions [x, y, z]
   * @returns {THREE.BufferGeometry} Unity field geometry
   * @private
   */
  _createUnityFieldGeometry(grid) {
    return this.state.visualizer.createGeometry('toroidal', {
      radius: 5,
      tubeRadius: 2.5,
      radialSegments: 16,
      tubularSegments: 100,
      arc: Math.PI * 2
    });
  }
  
  /**
   * Create Time Crystal geometry
   * @param {number} dimensions Number of dimensions
   * @returns {THREE.BufferGeometry} Time crystal geometry
   * @private
   */
  _createTimeCrystalGeometry(dimensions) {
    return this.state.visualizer.createGeometry('tesseract', {
      size: 5,
      detail: 1
    });
  }
  
  /**
   * Activate protection system
   * @param {string} systemName Name of protection system
   * @param {Object} options Activation options
   * @returns {boolean} Success
   * @public
   */
  activateProtectionSystem(systemName, options = {}) {
    if (!this.state.protectionFields[systemName]) {
      console.error(`Protection system ${systemName} not found`);
      return false;
    }
    
    const system = this.state.protectionFields[systemName];
    
    // Set options
    system.intensity = options.intensity || 1.0;
    system.rotationFactor = options.rotationFactor || system.rotationFactor;
    
    // Activate system
    system.active = true;
    system.mesh.visible = true;
    
    // Add to active fields
    if (!this.state.activeFields.includes(systemName)) {
      this.state.activeFields.push(systemName);
    }
    
    // Notify bridge
    if (this.state.bridge) {
      this.state.bridge.sendMessage({
        type: 'PROTECTION_ACTIVATED',
        system: systemName,
        timestamp: Date.now()
      });
    }
    
    console.log(`Activated protection system: ${systemName}`);
    return true;
  }
  
  /**
   * Deactivate protection system
   * @param {string} systemName Name of protection system
   * @returns {boolean} Success
   * @public
   */
  deactivateProtectionSystem(systemName) {
    if (!this.state.protectionFields[systemName]) {
      console.error(`Protection system ${systemName} not found`);
      return false;
    }
    
    const system = this.state.protectionFields[systemName];
    
    // Deactivate system
    system.active = false;
    system.mesh.visible = false;
    
    // Remove from active fields
    this.state.activeFields = this.state.activeFields.filter(name => name !== systemName);
    
    // Notify bridge
    if (this.state.bridge) {
      this.state.bridge.sendMessage({
        type: 'PROTECTION_DEACTIVATED',
        system: systemName,
        timestamp: Date.now()
      });
    }
    
    console.log(`Deactivated protection system: ${systemName}`);
    return true;
  }
  
  /**
   * Activate all protection systems
   * @param {Object} options Activation options
   * @returns {boolean} Success
   * @public
   */
  activateAllProtectionSystems(options = {}) {
    Object.keys(PROTECTION_SYSTEMS).forEach(systemName => {
      this.activateProtectionSystem(systemName, options);
    });
    
    this.state.activeProtectionLevel = 1.0;
    
    // Notify bridge
    if (this.state.bridge) {
      this.state.bridge.sendMessage({
        type: 'ALL_PROTECTION_ACTIVATED',
        level: this.state.activeProtectionLevel,
        timestamp: Date.now()
      });
    }
    
    console.log('Activated all protection systems');
    return true;
  }
  
  /**
   * Set protection level
   * @param {number} level Protection level (0.0 - 1.0)
   * @returns {boolean} Success
   * @public
   */
  setProtectionLevel(level) {
    if (level < 0 || level > 1) {
      console.error('Protection level must be between 0 and 1');
      return false;
    }
    
    this.state.activeProtectionLevel = level;
    
    // Calculate which systems should be active based on level
    if (level >= 0.25) {
      this.activateProtectionSystem('MERKABA_SHIELD', { intensity: level });
    } else {
      this.deactivateProtectionSystem('MERKABA_SHIELD');
    }
    
    if (level >= 0.5) {
      this.activateProtectionSystem('CRYSTAL_MATRIX', { intensity: level });
    } else {
      this.deactivateProtectionSystem('CRYSTAL_MATRIX');
    }
    
    if (level >= 0.75) {
      this.activateProtectionSystem('TIME_CRYSTAL', { intensity: level });
    } else {
      this.deactivateProtectionSystem('TIME_CRYSTAL');
    }
    
    if (level >= 0.9) {
      this.activateProtectionSystem('UNITY_FIELD', { intensity: level });
    } else {
      this.deactivateProtectionSystem('UNITY_FIELD');
    }
    
    // Notify bridge
    if (this.state.bridge) {
      this.state.bridge.sendMessage({
        type: 'PROTECTION_LEVEL_CHANGED',
        level: this.state.activeProtectionLevel,
        timestamp: Date.now()
      });
    }
    
    console.log(`Set protection level to ${level}`);
    return true;
  }
  
  /**
   * Toggle ZEN POINT balance
   * @param {boolean} active Whether ZEN POINT is active
   * @returns {boolean} Success
   * @public
   */
  toggleZenPoint(active) {
    this.state.zenPointActive = active;
    
    // Notify bridge
    if (this.state.bridge) {
      this.state.bridge.sendMessage({
        type: 'ZEN_POINT_TOGGLED',
        active: this.state.zenPointActive,
        timestamp: Date.now()
      });
    }
    
    console.log(`ZEN POINT balance ${active ? 'activated' : 'deactivated'}`);
    return true;
  }
  
  /**
   * Animate protection fields
   * @private
   */
  _animate() {
    if (!this.state.visualizer) return;
    
    // Request next animation frame
    requestAnimationFrame(this._animate.bind(this));
    
    // Update each active protection field
    this.state.activeFields.forEach(fieldName => {
      const field = this.state.protectionFields[fieldName];
      
      if (field && field.active) {
        // Rotate based on system's rotation factor
        field.mesh.rotation.y += this.options.rotationSpeed * field.rotationFactor;
        field.mesh.rotation.z += this.options.rotationSpeed * field.rotationFactor / PHI;
        
        // Pulse opacity and scale based on intensity
        const pulse = Math.sin(Date.now() * 0.001) * 0.1 + 0.9;
        field.mesh.material.opacity = this.options.fieldOpacity * field.intensity * pulse;
        
        // Adjust emissive intensity
        field.mesh.material.emissiveIntensity = 0.3 + (field.intensity * 0.3 * pulse);
        
        // Scale slightly with pulse
        const scaleFactor = 1 + (pulse * 0.05);
        field.mesh.scale.set(
          field.mesh.scale.x * scaleFactor,
          field.mesh.scale.y * scaleFactor,
          field.mesh.scale.z * scaleFactor
        );
        
        // Apply ZEN POINT balance effects if active
        if (this.state.zenPointActive) {
          // Harmonize rotation with phi
          field.mesh.rotation.x += this.options.rotationSpeed * PHI_INVERSE;
          
          // Add phi-harmonic pulse
          const phiPulse = Math.sin(Date.now() * 0.001 * PHI_INVERSE) * 0.2 + 0.8;
          field.mesh.material.emissiveIntensity *= phiPulse;
        }
      }
    });
    
    // Render scene
    this.state.visualizer.render();
  }
  
  /**
   * Get protection system status
   * @returns {Object} Status information
   * @public
   */
  getProtectionStatus() {
    return {
      activeFields: this.state.activeFields,
      protectionLevel: this.state.activeProtectionLevel,
      zenPointActive: this.state.zenPointActive,
      activeSystems: this.state.activeFields.map(name => {
        const system = this.state.protectionFields[name];
        return {
          name: system.config.name,
          intensity: system.intensity,
          frequency: system.config.frequency || system.config.baseFrequency,
          coherence: system.config.coherence || 1.0
        };
      })
    };
  }
  
  /**
   * Dispose resources
   * @public
   */
  dispose() {
    // Deactivate all protection systems
    Object.keys(this.state.protectionFields).forEach(name => {
      this.deactivateProtectionSystem(name);
    });
    
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
    this.state.activeFields = [];
    this.state.protectionFields = {};
    this.state.scene = null;
    this.state.renderer = null;
    this.state.camera = null;
    
    console.log('Protection Field Visualizer disposed');
  }
}

// Export module
if (typeof module !== 'undefined') {
  module.exports = {
    ProtectionFieldVisualizer,
    PROTECTION_SYSTEMS
  };
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  window.ProtectionFieldVisualizer = ProtectionFieldVisualizer;
  window.PROTECTION_SYSTEMS = PROTECTION_SYSTEMS;
  
  // Auto-initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    // Wait for other components to initialize
    setTimeout(() => {
      const container = document.getElementById('protection-field-container');
      if (container) {
        window.PROTECTION_FIELD_VISUALIZER = new ProtectionFieldVisualizer();
        window.PROTECTION_FIELD_VISUALIZER.initializeVisualization(container);
        
        // Activate Merkaba Shield by default for basic protection
        window.PROTECTION_FIELD_VISUALIZER.activateProtectionSystem('MERKABA_SHIELD');
      }
    }, 2000);
  });
}

console.log('Protection Field Visualizer loaded.');
