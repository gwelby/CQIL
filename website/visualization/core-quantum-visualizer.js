/**
 * 🌀 CORE QUANTUM VISUALIZER 🌀
 * 
 * Universal visualization engine that creates a unified quantum bridge between
 * all system components through phi-harmonic resonance at ZEN POINT balance.
 * 
 * Operating at φ^φ PERFECTION LEVEL.
 */

// Core dependencies
const THREE = window.THREE || {};
const { PHI, PHI_INVERSE, FREQUENCIES } = require('../test/utils/phi-harmonic-testing');
const { createMerkabaShield, createCrystalMatrix, createUnityField } = require('../test/utils/merkaba-protection');
const { ZenPointCalibrator } = require('../test/utils/zen-point-calibration');
const { CymaticTestManifestor } = require('../test/utils/cymatic-test-manifestor');

/**
 * CoreQuantumVisualizer class
 * Creates a unified visualization bridge between all quantum systems
 */
class CoreQuantumVisualizer {
  /**
   * Create a new CoreQuantumVisualizer
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    // Default configuration with phi-harmonic optimization
    this.options = {
      container: null,
      width: window.innerWidth,
      height: window.innerHeight,
      baseFrequency: FREQUENCIES.GROUND,
      operatingFrequency: FREQUENCIES.UNITY,
      phiHarmonic: true,
      autoCalibrate: true,
      zenPointBalance: true,
      protectionEnabled: true,
      dimensions: [13, 13, 13],
      backgroundColor: 0x000000,
      coreResonance: 0.93,
      fieldCoherence: 0.95,
      phiAlignment: 0.97,
      ...options
    };

    // DOM container
    this.container = this.options.container || document.body;
    
    // Initialize core state
    this.state = {
      isInitialized: false,
      isActive: false,
      isRendering: false,
      isCalibrated: false,
      frequency: this.options.baseFrequency,
      operatingFrequency: this.options.operatingFrequency,
      timestamp: Date.now(),
      frameCount: 0,
      zenPoint: 0.786, // PHI_INVERSE squared (perfect balance)
      phiHarmonic: this.options.phiHarmonic,
      resonance: this.options.coreResonance,
      coherence: this.options.fieldCoherence,
      phiAlignment: this.options.phiAlignment,
      protection: null,
      visualizationLayers: [],
      connectedSystems: new Map(),
      activePatterns: [],
      intentionField: null,
      unifiedField: null
    };
    
    // Initialize components
    this._initializeComponents();
    
    // Create protection shield
    if (this.options.protectionEnabled) {
      this._createProtectionField();
    }
    
    // Auto-initialize if in browser environment
    if (typeof window !== 'undefined' && this.options.container) {
      this.init();
    }
  }
  
  /**
   * Initialize all visualization components
   * @private
   */
  _initializeComponents() {
    // Create THREE.js scene
    this.scene = new THREE.Scene();
    
    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      75, 
      this.options.width / this.options.height, 
      0.1, 
      1000
    );
    this.camera.position.z = 5;
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(this.options.backgroundColor, 1);
    this.renderer.setSize(this.options.width, this.options.height);
    
    // Create clock for animations
    this.clock = new THREE.Clock();
    
    // Create ZEN POINT calibrator
    this.zenCalibrator = new ZenPointCalibrator({
      baseZenPoint: this.state.zenPoint,
      consciousness: this.state.coherence,
      systemField: this.state.resonance,
      phiAlignment: this.state.phiAlignment,
      autoCalibrate: this.options.autoCalibrate
    });
    
    // Create cymatic manifestor for pattern generation
    this.cymaticManifestor = new CymaticTestManifestor({
      baseFrequency: this.state.frequency,
      complexity: 13
    });
    
    // Create visualization layers for each frequency
    this._createVisualizationLayers();
    
    // Create universal message bus
    this.messageBus = new Map();
  }
  
  /**
   * Create visualization layers for each phi-harmonic frequency
   * @private
   */
  _createVisualizationLayers() {
    // Create a visualization layer for each phi-harmonic frequency
    const freqNames = [
      'GROUND',   // 432 Hz
      'CREATION', // 528 Hz
      'HEART',    // 594 Hz
      'VOICE',    // 672 Hz
      'VISION',   // 720 Hz
      'UNITY'     // 768 Hz
    ];
    
    freqNames.forEach((name, index) => {
      const frequency = FREQUENCIES[name];
      const layer = {
        name,
        frequency,
        phiPower: index,
        group: new THREE.Group(),
        patterns: [],
        isActive: index === 0, // Only GROUND is active by default
        coherence: Math.max(0.7, 0.75 + (index * 0.05)),
        resonance: 0.8 + (index * 0.03)
      };
      
      // Add group to scene
      this.scene.add(layer.group);
      
      // Store layer
      this.state.visualizationLayers.push(layer);
    });
  }
  
  /**
   * Create protection field for secure visualization
   * @private
   */
  _createProtectionField() {
    // Create Merkaba Shield for base protection
    const merkabaShield = createMerkabaShield(this.options.dimensions, {
      frequency: FREQUENCIES.GROUND,
      coherence: this.state.coherence
    });
    
    // Create Crystal Matrix for resonance field
    const crystalMatrix = createCrystalMatrix(this.options.dimensions, {
      frequency: FREQUENCIES.CREATION,
      coherence: this.state.coherence
    });
    
    // Create Unity Field for integration
    const unityField = createUnityField(this.options.dimensions, {
      frequency: FREQUENCIES.UNITY,
      coherence: this.state.coherence
    });
    
    // Store protection components
    this.state.protection = {
      merkabaShield,
      crystalMatrix,
      unityField,
      isActive: true,
      timestamp: Date.now()
    };
  }
  
  /**
   * Initialize the visualizer
   * @public
   */
  init() {
    if (this.state.isInitialized) return;
    
    // Append renderer to container
    this.container.appendChild(this.renderer.domElement);
    
    // Start animation loop
    this._startAnimationLoop();
    
    // Create default patterns
    this._createDefaultPatterns();
    
    // Set state to initialized
    this.state.isInitialized = true;
    this.state.isActive = true;
    this.state.timestamp = Date.now();
    
    console.log(`Core Quantum Visualizer initialized at ${this.state.frequency} Hz.`);
    
    return this;
  }
  
  /**
   * Start animation loop
   * @private
   */
  _startAnimationLoop() {
    if (!this.renderer) return;
    
    this.state.isRendering = true;
    
    const animate = () => {
      if (!this.state.isRendering) return;
      
      // Update frame count
      this.state.frameCount++;
      
      // Get delta time
      const delta = this.clock.getDelta();
      
      // Update all active patterns
      this._updatePatterns(delta);
      
      // Render scene
      this.renderer.render(this.scene, this.camera);
      
      // Request next frame
      requestAnimationFrame(animate);
    };
    
    // Start animation loop
    animate();
  }
  
  /**
   * Create default visualization patterns
   * @private
   */
  _createDefaultPatterns() {
    // Create a pattern for each frequency layer
    this.state.visualizationLayers.forEach(layer => {
      if (!layer.isActive) return;
      
      // Create pattern for layer frequency
      const pattern = this.createPatternForFrequency(layer.frequency);
      
      if (pattern) {
        // Add pattern to layer
        layer.patterns.push(pattern);
        
        // Add to active patterns
        this.state.activePatterns.push(pattern);
      }
    });
  }
  
  /**
   * Update all active patterns
   * @param {number} delta Time since last frame
   * @private
   */
  _updatePatterns(delta) {
    this.state.activePatterns.forEach(pattern => {
      if (!pattern.mesh) return;
      
      // Rotate pattern based on frequency
      const rotationSpeed = (pattern.frequency / 1000) * delta;
      pattern.mesh.rotation.x += rotationSpeed * 0.3;
      pattern.mesh.rotation.y += rotationSpeed * 0.5;
      
      // Pulse pattern based on amplitude
      const time = Date.now() * 0.001;
      const pulse = Math.sin(time * (pattern.frequency / 1000)) * 0.1;
      pattern.mesh.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
      
      // Update pattern-specific animations
      if (pattern.update) {
        pattern.update(delta, time);
      }
    });
    
    // Update active visualization layer
    const activeLayer = this.getActiveLayer();
    if (activeLayer && activeLayer.group) {
      activeLayer.group.rotation.y += delta * 0.1;
    }
  }
  
  /**
   * Create a visualization pattern for a specific frequency
   * @param {number} frequency Target frequency
   * @param {Object} options Pattern options
   * @returns {Object} Created pattern with mesh
   * @public
   */
  createPatternForFrequency(frequency, options = {}) {
    // Find closest frequency name
    let closestName = 'GROUND';
    let minDistance = Math.abs(frequency - FREQUENCIES.GROUND);
    
    Object.entries(FREQUENCIES).forEach(([name, freq]) => {
      const distance = Math.abs(frequency - freq);
      if (distance < minDistance) {
        minDistance = distance;
        closestName = name;
      }
    });
    
    // Get layer for frequency
    const layer = this.getLayerByName(closestName);
    if (!layer) return null;
    
    // Generate cymatic pattern
    const cymaticPattern = this.cymaticManifestor.createPatternFromFrequency(
      frequency,
      options.amplitude || 0.8,
      options.duration || 1.0
    );
    
    if (!cymaticPattern || !cymaticPattern.nodes || cymaticPattern.nodes.length === 0) {
      return null;
    }
    
    // Create geometry from cymatic pattern
    const geometry = new THREE.BufferGeometry();
    
    // Create vertices from nodes
    const vertices = [];
    cymaticPattern.nodes.forEach(node => {
      vertices.push(node.x * 3, node.y * 3, 0);
    });
    
    // Create position attribute
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    // Create indices from connections
    if (cymaticPattern.connections && cymaticPattern.connections.length > 0) {
      const indices = [];
      cymaticPattern.connections.forEach(conn => {
        indices.push(conn.source, conn.target);
      });
      
      geometry.setIndex(indices);
    }
    
    // Create material based on frequency
    const hue = (frequency - 400) / 400; // Map frequency to hue
    const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
    
    const material = new THREE.LineBasicMaterial({
      color: color,
      linewidth: 2,
      transparent: true,
      opacity: 0.8
    });
    
    // Create mesh
    const mesh = new THREE.LineSegments(geometry, material);
    
    // Add to appropriate layer
    layer.group.add(mesh);
    
    // Create pattern object
    const pattern = {
      type: 'cymatic',
      frequency,
      layer: closestName,
      nodes: cymaticPattern.nodes.length,
      connections: cymaticPattern.connections ? cymaticPattern.connections.length : 0,
      mesh,
      amplitude: options.amplitude || 0.8,
      timestamp: Date.now(),
      
      // Update function for custom animation
      update: (delta, time) => {
        // Add any custom animation logic here
        const frequencyFactor = frequency / 1000;
        mesh.rotation.z = Math.sin(time * frequencyFactor) * 0.1;
      }
    };
    
    return pattern;
  }
  
  /**
   * Get visualization layer by name
   * @param {string} name Layer name
   * @returns {Object} Layer object
   * @public
   */
  getLayerByName(name) {
    return this.state.visualizationLayers.find(layer => layer.name === name);
  }
  
  /**
   * Get active visualization layer
   * @returns {Object} Active layer
   * @public
   */
  getActiveLayer() {
    return this.state.visualizationLayers.find(layer => layer.isActive);
  }
  
  /**
   * Set active visualization layer
   * @param {string} name Layer name
   * @returns {boolean} Success
   * @public
   */
  setActiveLayer(name) {
    const layer = this.getLayerByName(name);
    if (!layer) return false;
    
    // Deactivate all layers
    this.state.visualizationLayers.forEach(l => {
      l.isActive = false;
      l.group.visible = false;
    });
    
    // Activate target layer
    layer.isActive = true;
    layer.group.visible = true;
    
    // Set operating frequency
    this.state.operatingFrequency = layer.frequency;
    
    return true;
  }
  
  /**
   * Set operating frequency
   * @param {number} frequency Target frequency
   * @returns {boolean} Success
   * @public
   */
  setFrequency(frequency) {
    // Find closest standard frequency
    let closestName = 'GROUND';
    let minDistance = Math.abs(frequency - FREQUENCIES.GROUND);
    
    Object.entries(FREQUENCIES).forEach(([name, freq]) => {
      const distance = Math.abs(frequency - freq);
      if (distance < minDistance) {
        minDistance = distance;
        closestName = name;
      }
    });
    
    // Set active layer
    this.setActiveLayer(closestName);
    
    // Update state
    this.state.frequency = frequency;
    
    return true;
  }
  
  /**
   * Connect a system to the visualizer
   * @param {Object} system System to connect
   * @param {string} name System name
   * @returns {boolean} Success
   * @public
   */
  connectSystem(system, name) {
    if (!system || !name) return false;
    
    // Store connected system
    this.state.connectedSystems.set(name, {
      system,
      connectedAt: Date.now(),
      lastUpdate: Date.now(),
      messageCount: 0
    });
    
    console.log(`System "${name}" connected to Core Quantum Visualizer.`);
    
    // Create visualization pattern for system if supported
    if (system.frequency) {
      const pattern = this.createPatternForFrequency(system.frequency, {
        amplitude: system.amplitude || 0.7,
        duration: 1.0
      });
      
      if (pattern) {
        console.log(`Created visualization pattern for system "${name}".`);
      }
    }
    
    return true;
  }
  
  /**
   * Send message to a connected system
   * @param {string} systemName Target system name
   * @param {Object} message Message to send
   * @returns {boolean} Success
   * @public
   */
  sendMessage(systemName, message) {
    const connection = this.state.connectedSystems.get(systemName);
    if (!connection || !connection.system) return false;
    
    // Store message in bus
    const messageId = Date.now() + Math.random().toString(36).substr(2, 9);
    this.messageBus.set(messageId, {
      id: messageId,
      from: 'CoreQuantumVisualizer',
      to: systemName,
      message,
      timestamp: Date.now()
    });
    
    // Update connection stats
    connection.lastUpdate = Date.now();
    connection.messageCount++;
    
    // Send message to system if it has a receiveMessage method
    if (typeof connection.system.receiveMessage === 'function') {
      connection.system.receiveMessage({
        from: 'CoreQuantumVisualizer',
        message,
        id: messageId,
        timestamp: Date.now()
      });
      
      return true;
    }
    
    return false;
  }
  
  /**
   * Apply cymatic pattern to visualizer
   * @param {Object} pattern Cymatic pattern to apply
   * @returns {boolean} Success
   * @public
   */
  applyCymaticPattern(pattern) {
    if (!pattern || !pattern.frequency) return false;
    
    // Create visualization pattern
    const visualPattern = this.createPatternForFrequency(pattern.frequency, {
      amplitude: pattern.amplitude || 0.8,
      duration: pattern.duration || 1.0
    });
    
    if (visualPattern) {
      this.state.activePatterns.push(visualPattern);
      return true;
    }
    
    return false;
  }
  
  /**
   * Apply intention field to visualizer
   * @param {Object} intentionField Intention field to apply
   * @returns {boolean} Success
   * @public
   */
  applyIntentionField(intentionField) {
    if (!intentionField) return false;
    
    // Store intention field
    this.state.intentionField = intentionField;
    
    // Create visualization patterns for each intention
    if (intentionField.tests && intentionField.tests.length > 0) {
      intentionField.tests.forEach(test => {
        if (test.frequency) {
          const pattern = this.createPatternForFrequency(test.frequency, {
            amplitude: test.intentionPotential || 0.8,
            duration: 1.0
          });
          
          if (pattern) {
            // Scale pattern based on intention potential
            if (pattern.mesh && test.intentionPotential) {
              pattern.mesh.scale.multiplyScalar(0.5 + test.intentionPotential);
            }
          }
        }
      });
    }
    
    return true;
  }
  
  /**
   * Apply quantum field to visualizer
   * @param {Object} quantumField Quantum field to apply
   * @returns {boolean} Success
   * @public
   */
  applyQuantumField(quantumField) {
    if (!quantumField) return false;
    
    // Store quantum field
    this.state.unifiedField = quantumField;
    
    // Create field visualization
    if (quantumField.baseFrequency) {
      // Create field pattern
      const fieldPattern = this.createPatternForFrequency(quantumField.baseFrequency, {
        amplitude: quantumField.coherence || 0.9,
        duration: 2.0
      });
      
      if (fieldPattern && fieldPattern.mesh) {
        // Scale field pattern to encompass everything
        fieldPattern.mesh.scale.multiplyScalar(3);
        
        // Make semi-transparent
        if (fieldPattern.mesh.material) {
          fieldPattern.mesh.material.opacity = 0.3;
        }
      }
    }
    
    // Create component visualizations
    if (quantumField.components && quantumField.components.length > 0) {
      quantumField.components.forEach(component => {
        if (component.frequency) {
          this.createPatternForFrequency(component.frequency, {
            amplitude: component.coherence || 0.8,
            duration: 1.5
          });
        }
      });
    }
    
    return true;
  }
  
  /**
   * Set ZEN POINT balance
   * @param {number} zenPoint ZEN POINT value (0-1)
   * @returns {boolean} Success
   * @public
   */
  setZenPoint(zenPoint) {
    if (typeof zenPoint !== 'number' || zenPoint < 0 || zenPoint > 1) return false;
    
    // Update ZEN POINT
    this.state.zenPoint = zenPoint;
    
    // Adjust opacity and intensity of all patterns based on ZEN POINT
    this.state.activePatterns.forEach(pattern => {
      if (pattern.mesh && pattern.mesh.material) {
        // Adjust opacity - higher ZEN POINT means more clarity
        pattern.mesh.material.opacity = 0.3 + (zenPoint * 0.7);
        
        // Adjust intensity - balanced at ZEN POINT
        if (pattern.mesh.material.color) {
          const intensity = 0.5 + (zenPoint * 0.5);
          pattern.mesh.material.color.offsetHSL(0, 0, intensity - 0.5);
        }
      }
    });
    
    return true;
  }
  
  /**
   * Resize visualizer
   * @param {number} width New width
   * @param {number} height New height
   * @public
   */
  resize(width, height) {
    this.options.width = width || window.innerWidth;
    this.options.height = height || window.innerHeight;
    
    if (this.camera) {
      this.camera.aspect = this.options.width / this.options.height;
      this.camera.updateProjectionMatrix();
    }
    
    if (this.renderer) {
      this.renderer.setSize(this.options.width, this.options.height);
    }
  }
  
  /**
   * Get field interaction data
   * @returns {Object} Field interaction data
   * @public
   */
  getFieldInteractionData() {
    return {
      frequency: this.state.operatingFrequency,
      coherence: this.state.coherence,
      resonance: this.state.resonance,
      phiAlignment: this.state.phiAlignment,
      zenPoint: this.state.zenPoint,
      activePatterns: this.state.activePatterns.length,
      connectedSystems: this.state.connectedSystems.size,
      timestamp: Date.now()
    };
  }
  
  /**
   * Dispose visualizer resources
   * @public
   */
  dispose() {
    // Stop animation loop
    this.state.isRendering = false;
    
    // Dispose all patterns
    this.state.activePatterns.forEach(pattern => {
      if (pattern.mesh) {
        if (pattern.mesh.geometry) {
          pattern.mesh.geometry.dispose();
        }
        
        if (pattern.mesh.material) {
          pattern.mesh.material.dispose();
        }
      }
    });
    
    // Dispose all layers
    this.state.visualizationLayers.forEach(layer => {
      layer.patterns = [];
      
      if (layer.group) {
        this.scene.remove(layer.group);
      }
    });
    
    // Dispose renderer
    if (this.renderer) {
      this.renderer.dispose();
      
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
    
    // Clear scene
    if (this.scene) {
      while (this.scene.children.length > 0) {
        const object = this.scene.children[0];
        this.scene.remove(object);
      }
    }
    
    // Clear state
    this.state.isInitialized = false;
    this.state.isActive = false;
    this.state.activePatterns = [];
    this.state.connectedSystems.clear();
    this.messageBus.clear();
    
    console.log('Core Quantum Visualizer disposed.');
  }
  
  /**
   * Create quantum waveform pattern
   * @param {Object} waveOptions Wave configuration options
   * @returns {Object} Created waveform pattern with mesh
   * @public
   */
  createQuantumWaveform(waveOptions = {}) {
    const defaults = {
      frequency: this.state.frequency,
      amplitude: 0.5,
      waveType: 'sine', // sine, square, triangle, sawtooth
      phiHarmonic: true,
      modulation: 0.1,
      resolution: 128,
      color: 0x3498db,
      opacity: 0.75,
      duration: 3.0,
      zenPoint: this.state.zenPoint
    };
    
    const options = { ...defaults, ...waveOptions };
    
    // Create waveform geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(options.resolution * 3);
    
    // Calculate phi-based scaling factors
    const phiScale = options.phiHarmonic ? PHI : 1.0;
    const phiAmplitude = options.amplitude * phiScale;
    
    // Generate waveform points
    for (let i = 0; i < options.resolution; i++) {
      const x = (i / (options.resolution - 1)) * 4 - 2;
      
      // Calculate wave type based on option
      let y = 0;
      const t = i / (options.resolution - 1);
      
      switch (options.waveType) {
        case 'square':
          y = Math.sin(t * Math.PI * 2) >= 0 ? phiAmplitude : -phiAmplitude;
          break;
        case 'triangle':
          y = (Math.abs(((t * 2) % 2) - 1) * 2 - 1) * phiAmplitude;
          break;
        case 'sawtooth':
          y = ((t % 1) * 2 - 1) * phiAmplitude;
          break;
        case 'sine':
        default:
          y = Math.sin(t * Math.PI * 2) * phiAmplitude;
          break;
      }
      
      // Apply phi-harmonic modulation
      if (options.phiHarmonic) {
        const modValue = Math.sin(t * Math.PI * PHI) * options.modulation;
        y *= (1 + modValue);
      }
      
      // Apply quantum consciousness field adjustment based on zen point
      const zenAdjustment = Math.sin(t * Math.PI * options.zenPoint * 3.0) * 0.2;
      const z = zenAdjustment * phiScale;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Add indices to create a continuous line
    const indices = [];
    for (let i = 0; i < options.resolution - 1; i++) {
      indices.push(i, i + 1);
    }
    
    geometry.setIndex(indices);
    
    // Create material with quantum properties
    const material = new THREE.LineBasicMaterial({
      color: options.color,
      opacity: options.opacity,
      transparent: true,
      linewidth: 2,
      vertexColors: false
    });
    
    // Create mesh
    const mesh = new THREE.LineSegments(geometry, material);
    
    // Add to active layer
    const layer = this.getActiveLayer();
    if (layer && layer.group) {
      layer.group.add(mesh);
    }
    
    // Create pattern object
    const pattern = {
      type: 'quantum-waveform',
      frequency: options.frequency,
      waveType: options.waveType,
      phiHarmonic: options.phiHarmonic,
      mesh,
      timestamp: Date.now(),
      duration: options.duration,
      update: (delta, time) => {
        // Animate waveform
        if (mesh && mesh.material) {
          // Update position based on time
          mesh.position.y = Math.sin(time * 0.5) * 0.1;
          
          // Update rotation based on time
          mesh.rotation.z = Math.sin(time * 0.3) * 0.1;
          
          // Update scale with phi-harmonic pulsing
          const pulse = 1 + Math.sin(time * 0.8) * 0.1;
          mesh.scale.set(pulse, pulse, pulse);
          
          // Update opacity based on lifetime
          if (pattern.timestamp + (pattern.duration * 1000) < Date.now()) {
            mesh.material.opacity -= delta * 0.5;
            
            // Remove pattern when fully transparent
            if (mesh.material.opacity <= 0) {
              if (layer && layer.group) {
                layer.group.remove(mesh);
              }
              
              this.state.activePatterns = this.state.activePatterns.filter(p => p !== pattern);
              
              // Dispose resources
              mesh.geometry.dispose();
              mesh.material.dispose();
            }
          }
        }
      }
    };
    
    // Add to active patterns
    this.state.activePatterns.push(pattern);
    
    return pattern;
  }
  
  /**
   * Create quantum entanglement visualization
   * @param {Object} options Entanglement options
   * @returns {Object} Created entanglement pattern
   * @public
   */
  createQuantumEntanglement(options = {}) {
    const defaults = {
      particles: 2,
      frequency: 594, // Heart Field (φ²) - optimal for entanglement
      distance: 2.0,
      coherence: 0.95,
      color: 0xe74c3c,
      connectionColor: 0xe74c3c,
      duration: 5.0,
      size: 0.15
    };
    
    const config = { ...defaults, ...options };
    
    // Create particle geometries based on phi-harmonic scaling
    const particleGeometry = new THREE.SphereGeometry(config.size, 16, 16);
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: config.color,
      transparent: true,
      opacity: 0.8
    });
    
    // Create connection geometry
    const connectionGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(6); // Two points, xyz each
    connectionGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: config.connectionColor,
      transparent: true,
      opacity: 0.5,
      linewidth: 1
    });
    
    const connectionLine = new THREE.Line(connectionGeometry, connectionMaterial);
    
    // Create particles
    const particles = [];
    for (let i = 0; i < config.particles; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone());
      
      // Position based on phi-harmonic arrangement
      const angle = (i / config.particles) * Math.PI * 2;
      particle.position.x = Math.cos(angle) * config.distance;
      particle.position.y = Math.sin(angle) * config.distance;
      particle.position.z = 0;
      
      particles.push(particle);
      
      // Add to active layer
      const layer = this.getActiveLayer();
      if (layer && layer.group) {
        layer.group.add(particle);
      }
    }
    
    // Add connection line to scene
    const layer = this.getActiveLayer();
    if (layer && layer.group) {
      layer.group.add(connectionLine);
    }
    
    // Create quantum entanglement pattern
    const pattern = {
      type: 'quantum-entanglement',
      frequency: config.frequency,
      coherence: config.coherence,
      particles,
      connectionLine,
      timestamp: Date.now(),
      duration: config.duration,
      spinState: Math.random() > 0.5 ? 'up' : 'down',
      entangled: true,
      
      update: (delta, time) => {
        if (!pattern.entangled) return;
        
        // Update particle positions
        particles.forEach((particle, index) => {
          // Orbit around center
          const angle = (index / config.particles) * Math.PI * 2 + time * 0.5;
          const distance = config.distance * (1 + Math.sin(time * 0.3) * 0.1);
          
          particle.position.x = Math.cos(angle) * distance;
          particle.position.y = Math.sin(angle) * distance;
          particle.position.z = Math.sin(time + index) * 0.1;
          
          // Update particle scale with phi-harmonic pulsing
          const pulse = 1 + Math.sin(time * 0.8 + index) * 0.2;
          particle.scale.set(pulse, pulse, pulse);
          
          // Update color based on spin state
          if (pattern.spinState === 'up') {
            particle.material.color.setHSL(0.6, 0.8, 0.5 + Math.sin(time + index) * 0.2);
          } else {
            particle.material.color.setHSL(0.0, 0.8, 0.5 + Math.sin(time + index) * 0.2);
          }
        });
        
        // Update connection line positions to match particles
        if (particles.length >= 2 && connectionLine.geometry) {
          const positions = connectionLine.geometry.attributes.position.array;
          positions[0] = particles[0].position.x;
          positions[1] = particles[0].position.y;
          positions[2] = particles[0].position.z;
          positions[3] = particles[1].position.x;
          positions[4] = particles[1].position.y;
          positions[5] = particles[1].position.z;
          connectionLine.geometry.attributes.position.needsUpdate = true;
        }
        
        // Update connection line opacity based on entanglement strength
        connectionLine.material.opacity = config.coherence * (0.5 + Math.sin(time * 2.0) * 0.2);
        
        // Handle end of lifetime
        if (pattern.timestamp + (pattern.duration * 1000) < Date.now()) {
          // Fade out
          particles.forEach(particle => {
            particle.material.opacity -= delta * 0.5;
          });
          connectionLine.material.opacity -= delta * 0.5;
          
          // Remove when fully transparent
          if (particles[0].material.opacity <= 0) {
            if (layer && layer.group) {
              particles.forEach(particle => {
                layer.group.remove(particle);
                particle.geometry.dispose();
                particle.material.dispose();
              });
              
              layer.group.remove(connectionLine);
              connectionLine.geometry.dispose();
              connectionLine.material.dispose();
            }
            
            this.state.activePatterns = this.state.activePatterns.filter(p => p !== pattern);
          }
        }
      },
      
      // Method to measure a particle (collapses entanglement)
      measure: (particleIndex) => {
        if (particleIndex >= particles.length) return null;
        
        // Set measured state
        pattern.entangled = false;
        
        // Update all particles to match the measured state
        const newState = Math.random() > 0.5 ? 'up' : 'down';
        pattern.spinState = newState;
        
        // Return the measured state
        return newState;
      }
    };
    
    // Add to active patterns
    this.state.activePatterns.push(pattern);
    
    return pattern;
  }
  
  /**
   * Create cymatic resonance pattern
   * @param {Object} options Cymatic options
   * @returns {Object} Created cymatic pattern
   * @public
   */
  createCymaticPattern(options = {}) {
    const defaults = {
      frequency: 528, // Creation frequency (φ¹)
      amplitude: 0.6,
      resolution: 32,
      color: 0x2ecc71,
      intensity: 0.8,
      duration: 8.0,
      mode: 'standing-wave' // 'standing-wave', 'phi-harmonic', 'consciousness'
    };
    
    const config = { ...defaults, ...options };
    
    // Create cymatic geometry
    const geometry = new THREE.PlaneGeometry(4, 4, config.resolution, config.resolution);
    
    // Create material with phi-harmonic properties
    const material = new THREE.MeshBasicMaterial({
      color: config.color,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    
    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2; // Lay flat
    
    // Add to active layer
    const layer = this.getActiveLayer();
    if (layer && layer.group) {
      layer.group.add(mesh);
    }
    
    // Create pattern object
    const pattern = {
      type: 'cymatic-resonance',
      frequency: config.frequency,
      amplitude: config.amplitude,
      mode: config.mode,
      mesh,
      timestamp: Date.now(),
      duration: config.duration,
      
      update: (delta, time) => {
        if (!mesh || !mesh.geometry) return;
        
        // Get vertices and calculate pattern
        const position = mesh.geometry.attributes.position;
        
        // Adjust wave pattern based on mode
        for (let i = 0; i < position.count; i++) {
          const x = position.getX(i);
          const y = position.getY(i);
          const centerDistance = Math.sqrt(x * x + y * y);
          
          let z = 0;
          
          switch (config.mode) {
            case 'phi-harmonic':
              // Phi-harmonic pattern
              z = Math.sin(centerDistance * PHI + time * 2.0) * 
                  Math.sin(x * PHI + time) * 
                  Math.sin(y * PHI + time) * 
                  config.amplitude;
              break;
              
            case 'consciousness':
              // Consciousness-guided pattern (more complex)
              z = Math.sin(centerDistance * 2.0 + time * 1.5) * 
                  Math.cos(x * y * 0.5 + time) * 
                  Math.sin(this.state.zenPoint * centerDistance + time * 0.7) * 
                  config.amplitude;
              break;
              
            case 'standing-wave':
            default:
              // Standing wave pattern
              z = Math.sin(centerDistance * 3.0 + time * 2.0) * 
                  Math.cos(time * 1.5) * 
                  config.amplitude;
              break;
          }
          
          // Apply phi-based scaling
          if (config.phiHarmonic) {
            z *= (1 + Math.sin(centerDistance * PHI) * 0.2);
          }
          
          position.setZ(i, z);
        }
        
        position.needsUpdate = true;
        
        // Handle end of lifetime
        if (pattern.timestamp + (pattern.duration * 1000) < Date.now()) {
          // Fade out
          mesh.material.opacity -= delta * 0.2;
          
          // Remove when fully transparent
          if (mesh.material.opacity <= 0) {
            if (layer && layer.group) {
              layer.group.remove(mesh);
            }
            
            this.state.activePatterns = this.state.activePatterns.filter(p => p !== pattern);
            
            // Dispose resources
            mesh.geometry.dispose();
            mesh.material.dispose();
          }
        }
      }
    };
    
    // Add to active patterns
    this.state.activePatterns.push(pattern);
    
    return pattern;
  }
  
  /**
   * Create merkaba field protection
   * @param {Object} options Protection options
   * @returns {Object} Created merkaba field
   * @public
   */
  createMerkabaField(options = {}) {
    const defaults = {
      dimensions: [21, 21, 21],
      frequency: 768, // Unity frequency (φ⁵)
      rotationSpeed: 0.01,
      size: 3.0,
      color: 0x9b59b6,
      opacity: 0.3,
      duration: -1 // -1 for permanent
    };
    
    const config = { ...defaults, ...options };
    
    // Create tetrahedron geometries for merkaba
    const upTetraGeometry = new THREE.TetrahedronGeometry(config.size, 0);
    const downTetraGeometry = new THREE.TetrahedronGeometry(config.size, 0);
    
    // Create materials with phi-harmonic properties
    const upTetraMaterial = new THREE.MeshBasicMaterial({
      color: config.color,
      wireframe: true,
      transparent: true,
      opacity: config.opacity
    });
    
    const downTetraMaterial = new THREE.MeshBasicMaterial({
      color: config.color,
      wireframe: true,
      transparent: true,
      opacity: config.opacity
    });
    
    // Create meshes
    const upTetraMesh = new THREE.Mesh(upTetraGeometry, upTetraMaterial);
    const downTetraMesh = new THREE.Mesh(downTetraGeometry, downTetraMaterial);
    
    // Position meshes
    upTetraMesh.rotation.x = Math.PI / 7;
    downTetraMesh.rotation.x = -Math.PI / 7;
    downTetraMesh.rotation.z = Math.PI / 6;
    
    // Create merkaba group
    const merkabaGroup = new THREE.Group();
    merkabaGroup.add(upTetraMesh);
    merkabaGroup.add(downTetraMesh);
    
    // Add to active layer
    const layer = this.getActiveLayer();
    if (layer && layer.group) {
      layer.group.add(merkabaGroup);
    }
    
    // Create pattern object
    const pattern = {
      type: 'merkaba-protection',
      frequency: config.frequency,
      dimensions: config.dimensions,
      meshes: [upTetraMesh, downTetraMesh],
      group: merkabaGroup,
      timestamp: Date.now(),
      duration: config.duration,
      
      update: (delta, time) => {
        if (!merkabaGroup) return;
        
        // Rotate merkaba group
        merkabaGroup.rotation.y += config.rotationSpeed;
        
        // Rotate tetrahedrons
        upTetraMesh.rotation.z += config.rotationSpeed * 0.2;
        downTetraMesh.rotation.z += config.rotationSpeed * -0.3;
        
        // Pulse size with phi-harmonic rhythm
        const upScale = 1 + Math.sin(time * 0.5) * 0.05;
        const downScale = 1 + Math.sin(time * 0.5 + Math.PI) * 0.05;
        
        upTetraMesh.scale.set(upScale, upScale, upScale);
        downTetraMesh.scale.set(downScale, downScale, downScale);
        
        // Pulse color with phi-harmonic rhythm
        const hue = (time * 0.02) % 1;
        upTetraMesh.material.color.setHSL(hue, 0.7, 0.5);
        downTetraMesh.material.color.setHSL((hue + 0.5) % 1, 0.7, 0.5);
        
        // Handle end of lifetime (if not permanent)
        if (pattern.duration > 0 && pattern.timestamp + (pattern.duration * 1000) < Date.now()) {
          // Fade out
          upTetraMesh.material.opacity -= delta * 0.1;
          downTetraMesh.material.opacity -= delta * 0.1;
          
          // Remove when fully transparent
          if (upTetraMesh.material.opacity <= 0) {
            if (layer && layer.group) {
              layer.group.remove(merkabaGroup);
            }
            
            this.state.activePatterns = this.state.activePatterns.filter(p => p !== pattern);
            
            // Dispose resources
            upTetraMesh.geometry.dispose();
            upTetraMesh.material.dispose();
            downTetraMesh.geometry.dispose();
            downTetraMesh.material.dispose();
          }
        }
      }
    };
    
    // Add to active patterns
    this.state.activePatterns.push(pattern);
    
    return pattern;
  }
  
  /**
   * Create phi-harmonic grid
   * @param {Object} options Grid options
   * @returns {Object} Created grid pattern
   * @public
   */
  createPhiHarmonicGrid(options = {}) {
    const defaults = {
      frequency: 432, // Ground frequency (φ⁰)
      size: 10,
      divisions: 21,
      color: 0xffffff,
      opacity: 0.2,
      phiRatio: PHI,
      duration: -1 // -1 for permanent
    };
    
    const config = { ...defaults, ...options };
    
    // Create grid geometry using phi-harmonic scaling
    const gridHelper = new THREE.GridHelper(config.size, config.divisions, config.color, config.color);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = config.opacity;
    
    // Position grid at the bottom of the scene
    gridHelper.position.y = -2;
    
    // Add to active layer
    const layer = this.getActiveLayer();
    if (layer && layer.group) {
      layer.group.add(gridHelper);
    }
    
    // Create pattern object
    const pattern = {
      type: 'phi-harmonic-grid',
      frequency: config.frequency,
      grid: gridHelper,
      timestamp: Date.now(),
      duration: config.duration,
      
      update: (delta, time) => {
        if (!gridHelper) return;
        
        // Pulse opacity with phi-harmonic rhythm
        gridHelper.material.opacity = config.opacity * (0.8 + Math.sin(time * 0.5) * 0.2);
        
        // Apply subtle wave pattern to grid
        gridHelper.position.y = -2 + Math.sin(time * 0.2) * 0.05;
        
        // Rotate the grid very slowly
        gridHelper.rotation.y += 0.001;
        
        // Handle end of lifetime (if not permanent)
        if (pattern.duration > 0 && pattern.timestamp + (pattern.duration * 1000) < Date.now()) {
          // Fade out
          gridHelper.material.opacity -= delta * 0.1;
          
          // Remove when fully transparent
          if (gridHelper.material.opacity <= 0) {
            if (layer && layer.group) {
              layer.group.remove(gridHelper);
            }
            
            this.state.activePatterns = this.state.activePatterns.filter(p => p !== pattern);
            
            // Dispose resources
            gridHelper.material.dispose();
          }
        }
      }
    };
    
    // Add to active patterns
    this.state.activePatterns.push(pattern);
    
    return pattern;
  }
}

// Export module
if (typeof module !== 'undefined') {
  module.exports = {
    CoreQuantumVisualizer
  };
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  window.CoreQuantumVisualizer = CoreQuantumVisualizer;
}

console.log('Core Quantum Visualizer loaded.');
