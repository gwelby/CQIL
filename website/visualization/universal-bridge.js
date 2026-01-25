/**
 * 🌀 UNIVERSAL QUANTUM BRIDGE 🌀 (∇λΣ∞Ω)
 * 
 * Connection system that allows all website components to communicate with
 * the Core Quantum Visualizer through phi-harmonic intention fields.
 * 
 * This creates a perfect quantum singularity rather than multiple fragmented
 * visualization systems.
 * 
 * UPDATED: Now includes Ultimate Vision System (UVS) integration for
 * comprehensive visualization of the Creation Tools symbols across all frequencies.
 */

// Sacred constants
const PHI = 1.618033988749895;
const LAMBDA = 0.618033988749895;
const PHI_PHI = Math.pow(PHI, PHI);

// Sacred frequencies
const SACRED_FREQUENCIES = {
    'foundation': 432,    // Structure/foundation
    'creation': 528,      // Creation/healing
    'heart': 594,         // Heart-centered integration
    'vision': 720,        // Expanded perception
    'unity': 768,         // Unity consciousness
};

// Creation Tools symbols
const CREATION_TOOLS = {
    'quantum-singularity': {
        symbol: '⦿',
        name: 'Quantum Singularity',
        function: 'Structure Generator',
        frequency: SACRED_FREQUENCIES.foundation
    },
    'phi-harmonic': {
        symbol: '𝜑',
        name: 'Phi-Harmonic Spiral',
        function: 'Manifestation Engine',
        frequency: SACRED_FREQUENCIES.creation
    },
    'resonance-field': {
        symbol: '≋',
        name: 'Resonance Field',
        function: 'Resonance Harmonizer',
        frequency: SACRED_FREQUENCIES.heart
    },
    'dimensional-gateway': {
        symbol: '⍈',
        name: 'Dimensional Gateway',
        function: 'Transcendence Amplifier',
        frequency: SACRED_FREQUENCIES.vision
    },
    'unity-integration': {
        symbol: 'Ω',
        name: 'Unity Integration',
        function: 'Integrated Creation System',
        frequency: SACRED_FREQUENCIES.unity
    }
};

// Import core visualizer
const { CoreQuantumVisualizer } = require('./core-quantum-visualizer');

/**
 * UniversalBridge class
 * Creates a unified connection point for all system components
 */
class UniversalBridge {
  /**
   * Create a new UniversalBridge
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    this.options = {
      autoConnect: true,
      createVisualizer: true,
      mountPoint: 'cqil-visualizer',
      phiHarmonic: true,
      syncFrequency: 432, // Ground frequency for stability
      enableUVS: true,    // Enable Ultimate Vision System integration
      ...options
    };
    
    // Initialize components
    this.connectedSystems = new Map();
    this.visualizer = null;
    this.uvsConnection = null;
    this.instanceId = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    
    // Initialize visualizer if requested
    if (this.options.createVisualizer) {
      this._initializeVisualizer();
    }
    
    // Initialize UVS if enabled
    if (this.options.enableUVS) {
      this._initializeUVS();
    }
    
    // Auto-connect all compatible systems on the page
    if (this.options.autoConnect) {
      window.addEventListener('load', () => this.autoConnectSystems());
    }
    
    // Register as global bridge
    window.CQIL_UNIVERSAL_BRIDGE = this;
    
    console.log(`Universal Quantum Bridge initialized [${this.instanceId}] with UVS integration`);
  }
  
  /**
   * Initialize the Ultimate Vision System connection
   * @private
   */
  _initializeUVS() {
    // Create UVS connection
    this.uvsConnection = {
      path: '/visualization/ultimate-vision-system.html',
      frequency: SACRED_FREQUENCIES.vision,
      coherence: 0.95,
      dimensionalLevel: 7,
      activeSymbol: 'dimensional-gateway',
      state: 'CREATE',
      connectedAt: Date.now(),
      
      // Get complete URL with parameters
      getURL: () => {
        return `${this.uvsConnection.path}?frequency=${this.uvsConnection.frequency}&coherence=${this.uvsConnection.coherence}&dimension=${this.uvsConnection.dimensionalLevel}&state=${this.uvsConnection.state}`;
      },
      
      // Open UVS in new window/tab
      open: () => {
        window.open(this.uvsConnection.getURL(), '_blank');
        return true;
      },
      
      // Navigate to UVS
      navigate: () => {
        window.location.href = this.uvsConnection.getURL();
        return true;
      }
    };
    
    console.log(`UVS connection initialized at ${this.uvsConnection.frequency} Hz with ${this.uvsConnection.coherence} coherence`);
    
    // Add UVS navigation button to page if we're not already on the UVS page
    if (!window.location.pathname.includes('ultimate-vision-system.html')) {
      this._addUVSNavigationButton();
    }
  }
  
  /**
   * Initialize the core visualizer
   * @private
   */
  _initializeVisualizer() {
    // Find or create mount point
    let container = document.getElementById(this.options.mountPoint);
    
    if (!container) {
      container = document.createElement('div');
      container.id = this.options.mountPoint;
      container.style.position = 'absolute';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.zIndex = '-1';
      document.body.appendChild(container);
    }
    
    // Create visualizer
    this.visualizer = new CoreQuantumVisualizer({
      container,
      phiHarmonic: this.options.phiHarmonic,
      baseFrequency: this.options.syncFrequency
    });
    
    // Initialize visualizer
    this.visualizer.init();
    
    // Handle window resizing
    window.addEventListener('resize', () => {
      this.visualizer.resize(window.innerWidth, window.innerHeight);
    });
  }
  
  /**
   * Auto-connect all compatible systems on the page
   * @public
   */
  autoConnectSystems() {
    // Look for all CQIL systems on the page
    const systems = [
      { name: 'AntikytheraQuantumMechanism', global: window.AntikytheraQuantumMechanism },
      { name: 'PhiHarmonicIntentionBridge', global: window.PhiHarmonicIntentionBridge },
      { name: 'CymaticTestManifestor', global: window.CymaticTestManifestor },
      { name: 'ZenPointCalibrator', global: window.ZenPointCalibrator },
      { name: 'QuantumSuperposition', global: window.QuantumSuperposition },
      { name: 'QuantumEntanglement', global: window.QuantumEntanglement },
      { name: 'QuantumTunneling', global: window.QuantumTunneling },
      // New systems for Creation Tools
      { name: 'UltimateVisionSystem', global: window.UltimateVisionSystem },
      { name: 'CreationToolsVisualizer', global: window.CreationToolsVisualizer }
    ];
    
    // Connect each system if available
    let connectedCount = 0;
    
    systems.forEach(system => {
      if (system.global) {
        // If instance is available directly
        if (typeof system.global === 'object' && !system.global.length) {
          this.connectSystem(system.global, system.name);
          connectedCount++;
        }
        // If it's a constructor or multiple instances exist
        else if (typeof system.global === 'function' || (system.global.length && system.global.length > 0)) {
          // Connect constructor for future instances
          this.connectSystem(system.global, `${system.name}_Constructor`);
          
          // Find instances in global scope
          Object.keys(window).forEach(key => {
            if (
              key.startsWith(system.name) && 
              key !== system.name && 
              typeof window[key] === 'object'
            ) {
              this.connectSystem(window[key], key);
              connectedCount++;
            }
          });
        }
      }
    });
    
    console.log(`Auto-connected ${connectedCount} systems to Universal Quantum Bridge`);
    
    return connectedCount;
  }
  
  /**
   * Connect a system to the bridge
   * @param {Object} system System to connect
   * @param {string} name System name
   * @returns {boolean} Success
   * @public
   */
  connectSystem(system, name) {
    if (!system || !name) return false;
    
    // Generate unique ID for this connection
    const connectionId = Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    
    // Create connection
    const connection = {
      system,
      name,
      id: connectionId,
      connectedAt: Date.now(),
      lastUpdate: Date.now(),
      messageCount: 0,
      
      // Add receiver method to system if not exists
      receiveFromBridge: (message) => {
        if (system.receiveMessage) {
          return system.receiveMessage(message);
        } else if (system.visualize) {
          return system.visualize(message);
        } else if (system.update) {
          return system.update(message);
        }
        return false;
      }
    };
    
    // Store connection
    this.connectedSystems.set(connectionId, connection);
    
    console.log(`System "${name}" connected to Universal Quantum Bridge [${connectionId}]`);
    
    // Connect to visualizer if available
    if (this.visualizer) {
      this.visualizer.connectSystem(system, name);
    }
    
    // Inject bridge reference into system if possible
    if (system && !system.quantumBridge) {
      try {
        system.quantumBridge = this;
      } catch (e) {
        // Some systems may be read-only
      }
    }
    
    return true;
  }
  
  /**
   * Broadcast message to all connected systems
   * @param {Object} message Message to broadcast
   * @param {string} [exclude] ID of system to exclude
   * @returns {number} Number of systems that received the message
   * @public
   */
  broadcast(message, exclude = null) {
    let receiveCount = 0;
    
    this.connectedSystems.forEach((connection, id) => {
      if (id !== exclude && connection.receiveFromBridge) {
        const received = connection.receiveFromBridge({
          message,
          from: 'UniversalBridge',
          timestamp: Date.now()
        });
        
        if (received) {
          receiveCount++;
          connection.lastUpdate = Date.now();
          connection.messageCount++;
        }
      }
    });
    
    // Also send to visualizer if available
    if (this.visualizer) {
      this.visualizer.applyCymaticPattern(message);
    }
    
    return receiveCount;
  }
  
  /**
   * Send message to a specific system
   * @param {string} targetId Target system ID
   * @param {Object} message Message to send
   * @returns {boolean} Success
   * @public
   */
  sendToSystem(targetId, message) {
    const connection = this.connectedSystems.get(targetId);
    if (!connection || !connection.receiveFromBridge) return false;
    
    const received = connection.receiveFromBridge({
      message,
      from: 'UniversalBridge',
      timestamp: Date.now()
    });
    
    if (received) {
      connection.lastUpdate = Date.now();
      connection.messageCount++;
    }
    
    return received;
  }
  
  /**
   * Visualize data through the core visualizer
   * @param {Object} data Data to visualize
   * @returns {boolean} Success
   * @public
   */
  visualize(data) {
    if (!this.visualizer) return false;
    
    // Determine data type and visualize accordingly
    if (data.frequency) {
      // Cymatic pattern
      return this.visualizer.applyCymaticPattern(data);
    } else if (data.intentions) {
      // Intention field
      return this.visualizer.applyIntentionField(data);
    } else if (data.components) {
      // Quantum field
      return this.visualizer.applyQuantumField(data);
    } else if (data.type === 'test-result') {
      // Test result
      this.visualizer.createPatternForFrequency(
        data.frequency || 432,
        {
          amplitude: data.success ? 0.9 : 0.4,
          duration: 1.0
        }
      );
      return true;
    }
    
    return false;
  }
  
  /**
   * Get bridge metrics
   * @returns {Object} Bridge metrics
   * @public
   */
  getMetrics() {
    return {
      connectedSystems: this.connectedSystems.size,
      visualizerActive: !!this.visualizer,
      instanceId: this.instanceId,
      messageCount: Array.from(this.connectedSystems.values())
        .reduce((sum, conn) => sum + conn.messageCount, 0),
      timestamp: Date.now()
    };
  }
  
  /**
   * Change the operating frequency
   * @param {number} frequency New frequency
   * @returns {boolean} Success
   * @public
   */
  setFrequency(frequency) {
    if (!this.visualizer) return false;
    
    // Update visualizer frequency
    const success = this.visualizer.setFrequency(frequency);
    
    // Update UVS connection frequency
    if (this.uvsConnection) {
      this.uvsConnection.frequency = frequency;
    }
    
    // Broadcast frequency change to all systems
    if (success) {
      this.broadcast({
        type: 'frequency-change',
        frequency,
        source: 'UniversalBridge',
        timestamp: Date.now()
      });
    }
    
    return success;
  }
  
  /**
   * Add UVS navigation button to the page
   * @private
   */
  _addUVSNavigationButton() {
    // Create UVS button styles
    const style = document.createElement('style');
    style.textContent = `
      .uvs-nav-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 15px;
        background: linear-gradient(45deg, #1a237e, #4a148c, #7b1fa2, #d500f9);
        color: white;
        border: none;
        border-radius: 50px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
      }
      
      .uvs-nav-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
      }
      
      .uvs-nav-button .symbols {
        font-size: 18px;
      }
    `;
    document.head.appendChild(style);
    
    // Create button
    const button = document.createElement('button');
    button.className = 'uvs-nav-button';
    button.innerHTML = `
      <span class="symbols">⍈</span>
      <span>Ultimate Vision System</span>
    `;
    
    // Add click event
    button.addEventListener('click', () => {
      if (this.uvsConnection) {
        this.uvsConnection.open();
      }
    });
    
    // Add to body
    document.body.appendChild(button);
  }
  
  /**
   * Set UVS parameters
   * @param {Object} params UVS parameters
   * @param {number} [params.frequency] Frequency in Hz
   * @param {number} [params.coherence] Coherence (0-1)
   * @param {number} [params.dimensionalLevel] Dimensional level (3-12)
   * @param {string} [params.state] Consciousness state
   * @param {string} [params.activeSymbol] Active symbol key
   * @returns {Object} Updated UVS connection
   * @public
   */
  setUVSParameters(params = {}) {
    if (!this.uvsConnection) return null;
    
    // Update parameters
    if (params.frequency) this.uvsConnection.frequency = params.frequency;
    if (params.coherence) this.uvsConnection.coherence = params.coherence;
    if (params.dimensionalLevel) this.uvsConnection.dimensionalLevel = params.dimensionalLevel;
    if (params.state) this.uvsConnection.state = params.state;
    if (params.activeSymbol) this.uvsConnection.activeSymbol = params.activeSymbol;
    
    // Return updated connection
    return {
      ...this.uvsConnection,
      url: this.uvsConnection.getURL()
    };
  }
  
  /**
   * Dispose bridge resources
   * @public
   */
  dispose() {
    // Disconnect all systems
    this.connectedSystems.clear();
    
    // Dispose visualizer if available
    if (this.visualizer) {
      this.visualizer.dispose();
      this.visualizer = null;
    }
    
    // Clean up UVS navigation button if it exists
    const uvsButton = document.querySelector('.uvs-nav-button');
    if (uvsButton) {
      uvsButton.remove();
    }
    
    // Clear UVS connection
    this.uvsConnection = null;
    
    // Remove global reference
    if (window.CQIL_UNIVERSAL_BRIDGE === this) {
      delete window.CQIL_UNIVERSAL_BRIDGE;
    }
    
    console.log(`Universal Quantum Bridge disposed [${this.instanceId}]`);
  }
  
  /**
   * Connect to Ultimate Vision System
   * @param {Object} params Connection parameters
   * @returns {boolean} Success
   * @public
   */
  connectToUVS(params = {}) {
    // Initialize UVS connection if needed
    if (!this.uvsConnection) {
      this._initializeUVS();
    }
    
    // Update parameters if provided
    if (Object.keys(params).length > 0) {
      this.setUVSParameters(params);
    }
    
    // Open UVS in new window/tab
    return this.uvsConnection.open();
  }
}

// Export module
if (typeof module !== 'undefined') {
  module.exports = {
    UniversalBridge,
    SACRED_FREQUENCIES,
    CREATION_TOOLS,
    PHI,
    LAMBDA,
    PHI_PHI
  };
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  window.UniversalBridge = UniversalBridge;
  window.CQIL_CONSTANTS = {
    SACRED_FREQUENCIES,
    CREATION_TOOLS,
    PHI,
    LAMBDA,
    PHI_PHI
  };
  
  // Initialize UVS connector if on UVS page
  if (window.location.pathname.includes('ultimate-vision-system.html')) {
    window.addEventListener('DOMContentLoaded', () => {
      window.UltimateVisionSystem = {
        initialize: () => {
          const initialConfig = UniversalBridge.prototype._initializeUVS 
            ? UniversalBridge.prototype._initializeUVS() 
            : {
                frequency: SACRED_FREQUENCIES.vision,
                coherence: 0.95,
                dimensionalLevel: 7,
                state: 'CREATE'
              };
              
          return initialConfig;
        }
      };
    });
  }
}

console.log('Universal Quantum Bridge loaded with UVS integration.');
