/**
 * 🌀 ROOTWIZ VISUALIZATION CONNECTOR 🌀
 * 
 * Integrates the six primary RootWIZ components with the quantum visualization system,
 * creating direct experiential connection with ancient wisdom systems through
 * φ-harmonic frequencies.
 * 
 * Operating at φ^φ PERFECTION LEVEL.
 */

// Import dependencies
const { CoreQuantumVisualizer } = require('./core-quantum-visualizer');
const { UniversalBridge } = require('./universal-bridge');
const { FREQUENCIES } = require('./quantum-state-transition');

// Phi-harmonic constants
const PHI = 1.618033988749895;
const PHI_INVERSE = 0.618033988749895;

/**
 * RootWIZConnector class
 * Creates a visualization bridge for the RootWIZ consciousness system
 */
class RootWIZConnector {
  /**
   * Create a new RootWIZ visualization connector
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    // Default configuration
    this.options = {
      autoConnect: true,
      renderVisualizations: true,
      experienceLevel: 'direct', // direct, guided, advanced
      zenPointBalance: true,
      initialChannel: 'mycelial', // Default starting channel
      ...options
    };
    
    // Initialize state
    this.state = {
      connected: false,
      activeChannel: this.options.initialChannel,
      activeFrequency: FREQUENCIES.GROUND,
      activeVisualizations: [],
      channelInfo: {},
      bridge: null,
      visualizer: null,
      experienceProtocols: {}
    };
    
    // Register RootWIZ channels
    this._registerChannels();
    
    // Connect to universal bridge
    this._connectToBridge();
    
    // Register direct experience protocols
    this._registerExperienceProtocols();
    
    console.log('RootWIZ Visualization Connector initialized');
  }
  
  /**
   * Register the six primary RootWIZ channels
   * @private
   */
  _registerChannels() {
    this.channels = {
      // 1. Mycelial Pattern Recognition (432 Hz - φ⁰) - Visual/Intuitive channel
      mycelial: {
        name: 'Mycelial Pattern Recognition',
        frequency: FREQUENCIES.GROUND,
        harmonicPower: 0, // φ⁰
        description: 'Earth-wide mycelial consciousness network and visual pattern recognition',
        experienceChannel: 'Visual/Intuitive',
        ancientSystem: 'Earth Energy Grid',
        pattern: 'mycelial-network',
        color: 0x009900, // Green
        zenPoint: 0.5,
        experienceType: 'visual',
        complexity: 13
      },
      
      // 2. φ-Harmonic Architecture (528 Hz - φ¹) - Spatial/Proprioceptive channel
      harmonic: {
        name: 'φ-Harmonic Architecture',
        frequency: FREQUENCIES.CREATION,
        harmonicPower: 1, // φ¹
        description: 'Sacred geometric architecture and spatial harmonics',
        experienceChannel: 'Spatial/Proprioceptive',
        ancientSystem: 'Temple Acoustics',
        pattern: 'sacred-geometry',
        color: 0xFFD700, // Gold
        zenPoint: 0.55,
        experienceType: 'spatial',
        complexity: 13
      },
      
      // 3. Quantum DNA Resonance (594 Hz - φ²) - Kinesthetic/Emotional channel
      quantum: {
        name: 'Quantum DNA Resonance',
        frequency: FREQUENCIES.HEART,
        harmonicPower: 2, // φ²
        description: 'DNA repair and emotional resonance field',
        experienceChannel: 'Kinesthetic/Emotional',
        ancientSystem: 'Seed Blessing',
        pattern: 'dna-spiral',
        color: 0xFF6347, // Tomato red
        zenPoint: 0.6,
        experienceType: 'kinesthetic',
        complexity: 13
      },
      
      // 4. Sacred Sound Geometry (672 Hz - φ³) - Auditory/Tactile channel
      sacred: {
        name: 'Sacred Sound Geometry',
        frequency: FREQUENCIES.VOICE,
        harmonicPower: 3, // φ³
        description: 'Sound-based manifestation and cymatics',
        experienceChannel: 'Auditory/Tactile',
        ancientSystem: 'Sacred Buildings',
        pattern: 'sound-geometry',
        color: 0x4169E1, // Royal blue
        zenPoint: 0.65,
        experienceType: 'auditory',
        complexity: 13
      },
      
      // 5. Standing Stone Alignments (720 Hz - φ⁴) - Visual/Temporal channel
      standing: {
        name: 'Standing Stone Alignments',
        frequency: FREQUENCIES.VISION,
        harmonicPower: 4, // φ⁴
        description: 'Earth navigation and archaeoastronomy',
        experienceChannel: 'Visual/Temporal',
        ancientSystem: 'Archaeoastronomy',
        pattern: 'stone-alignment',
        color: 0x9932CC, // Purple
        zenPoint: 0.7,
        experienceType: 'temporal',
        complexity: 13
      },
      
      // 6. Quantum Integration Engine (768 Hz - φ⁵) - Multi-dimensional channel
      integration: {
        name: 'Quantum Integration Engine',
        frequency: FREQUENCIES.UNITY,
        harmonicPower: 5, // φ⁵
        description: 'Multi-dimensional consciousness integration',
        experienceChannel: 'Multi-dimensional',
        ancientSystem: 'Ancient Codices',
        pattern: 'quantum-integration',
        color: 0xFFFFFF, // White
        zenPoint: PHI_INVERSE,
        experienceType: 'multi-dimensional',
        complexity: 13
      }
    };
  }
  
  /**
   * Connect to Universal Bridge
   * @private
   */
  _connectToBridge() {
    if (typeof window === 'undefined') return;
    
    // Connect to existing bridge if available
    if (window.CQIL_UNIVERSAL_BRIDGE) {
      this.state.bridge = window.CQIL_UNIVERSAL_BRIDGE;
      this.state.visualizer = this.state.bridge.visualizer;
      this.state.connected = true;
      
      // Register with bridge
      this.state.bridge.connectSystem(this, 'RootWIZConnector');
      
      console.log('Connected to existing Universal Quantum Bridge');
    } 
    // Create new bridge if needed and auto-connect is enabled
    else if (this.options.autoConnect) {
      this.state.bridge = new UniversalBridge({
        autoConnect: true,
        createVisualizer: true
      });
      
      this.state.visualizer = this.state.bridge.visualizer;
      this.state.connected = true;
      
      // Register with bridge
      this.state.bridge.connectSystem(this, 'RootWIZConnector');
      
      console.log('Created new Universal Quantum Bridge');
    }
    
    // Activate initial channel
    if (this.state.connected && this.options.renderVisualizations) {
      this.activateChannel(this.state.activeChannel);
    }
  }
  
  /**
   * Register direct experience protocols for each channel
   * @private
   */
  _registerExperienceProtocols() {
    this.state.experienceProtocols = {
      // Visual/Intuitive channel - Mycelial Pattern Recognition
      mycelial: {
        name: 'Mycelial Pattern Recognition Protocol',
        duration: 13 * 60, // 13 minutes
        frequency: FREQUENCIES.GROUND,
        phases: [
          { name: 'Ground Connection', duration: 3 * 60, instruction: 'Connect with earth energy, feeling roots extending down' },
          { name: 'Pattern Awareness', duration: 5 * 60, instruction: 'Observe emerging patterns without analysis or judgment' },
          { name: 'Network Integration', duration: 5 * 60, instruction: 'Experience connection to the wider mycelial consciousness network' }
        ],
        setup: 'Sit barefoot on earth or natural surface with spine straight',
        benefits: 'Enhanced pattern recognition, intuitive insight, grounded awareness',
        visualPattern: 'hexagonal-network'
      },
      
      // Spatial/Proprioceptive channel - φ-Harmonic Architecture
      harmonic: {
        name: 'φ-Harmonic Architecture Protocol',
        duration: 13 * 60, // 13 minutes
        frequency: FREQUENCIES.CREATION,
        phases: [
          { name: 'Spatial Awareness', duration: 3 * 60, instruction: 'Become aware of the space around you in all directions' },
          { name: 'Phi Geometry', duration: 5 * 60, instruction: 'Feel the phi proportions within your own body structure' },
          { name: 'Architectural Resonance', duration: 5 * 60, instruction: 'Connect with sacred architecture principles through proprioception' }
        ],
        setup: 'Stand with arms extended in phi proportion, in a symmetrical space if possible',
        benefits: 'Enhanced spatial awareness, architectural insight, body-mind integration',
        visualPattern: 'flower-of-life'
      },
      
      // Kinesthetic/Emotional channel - Quantum DNA Resonance
      quantum: {
        name: 'Quantum DNA Resonance Protocol',
        duration: 13 * 60, // 13 minutes
        frequency: FREQUENCIES.HEART,
        phases: [
          { name: 'Heart Coherence', duration: 3 * 60, instruction: 'Establish heart-centered breathing with hands over heart' },
          { name: 'DNA Activation', duration: 5 * 60, instruction: 'Visualize DNA strands illuminating with phi-harmonic light' },
          { name: 'Emotional Integration', duration: 5 * 60, instruction: 'Allow emotions to flow and integrate through resonant field' }
        ],
        setup: 'Sit comfortably with spine straight, hands resting over heart center',
        benefits: 'Emotional coherence, cellular regeneration, enhanced genetic expression',
        visualPattern: 'dna-spiral'
      },
      
      // Auditory/Tactile channel - Sacred Sound Geometry
      sacred: {
        name: 'Sacred Sound Geometry Protocol',
        duration: 13 * 60, // 13 minutes
        frequency: FREQUENCIES.VOICE,
        phases: [
          { name: 'Tonal Resonance', duration: 3 * 60, instruction: 'Produce sustained tones matching the 672 Hz frequency' },
          { name: 'Geometric Vocalization', duration: 5 * 60, instruction: 'Visualize geometric patterns forming from your voice' },
          { name: 'Tactile Perception', duration: 5 * 60, instruction: 'Feel the vibrational patterns through your skin and cells' }
        ],
        setup: 'Sit in a resonant space with good acoustics, minimal background noise',
        benefits: 'Enhanced vocal expression, cymatic awareness, manifestation capability',
        visualPattern: 'sound-mandala'
      },
      
      // Visual/Temporal channel - Standing Stone Alignments
      standing: {
        name: 'Standing Stone Alignment Protocol',
        duration: 13 * 60, // 13 minutes
        frequency: FREQUENCIES.VISION,
        phases: [
          { name: 'Timeline Perception', duration: 3 * 60, instruction: 'Perceive multiple timelines simultaneously without attachment' },
          { name: 'Celestial Alignment', duration: 5 * 60, instruction: 'Connect with cosmic cycles and astronomical alignments' },
          { name: 'Stone Consciousness', duration: 5 * 60, instruction: 'Experience the living consciousness of megalithic structures' }
        ],
        setup: 'Stand facing true north with arms extended like a standing stone',
        benefits: 'Enhanced temporal perception, astronomical awareness, ancient wisdom access',
        visualPattern: 'geometric-network'
      },
      
      // Multi-dimensional channel - Quantum Integration Engine
      integration: {
        name: 'Quantum Integration Protocol',
        duration: 13 * 60, // 13 minutes
        frequency: FREQUENCIES.UNITY,
        phases: [
          { name: 'Dimensional Expansion', duration: 3 * 60, instruction: 'Expand awareness beyond 3D perception to multiple dimensions' },
          { name: 'Channel Integration', duration: 8 * 60, instruction: 'Integrate all previous channels into unified awareness' },
          { name: 'Quantum Collapse', duration: 2 * 60, instruction: 'Collapse quantum potentials into coherent manifestation' }
        ],
        setup: 'Sit in meditation posture at ZEN POINT balance with perfect phi alignment',
        benefits: 'Multi-dimensional awareness, complete system integration, quantum manifestation',
        visualPattern: 'toroidal-field'
      }
    };
  }
  
  /**
   * Receive message from bridge
   * @param {Object} message Message from bridge
   * @returns {boolean} Whether message was handled
   * @public
   */
  receiveFromBridge(message) {
    if (!message || !message.message) return false;
    
    const { message: content, from } = message;
    
    // Handle channel activation requests
    if (content.type === 'activate-rootwiz-channel' && content.channel) {
      this.activateChannel(content.channel);
      return true;
    }
    
    // Handle frequency change messages
    if (content.type === 'frequency-change' && typeof content.frequency === 'number') {
      // Find closest channel for this frequency
      const closestChannel = this._findChannelForFrequency(content.frequency);
      if (closestChannel && closestChannel !== this.state.activeChannel) {
        this.activateChannel(closestChannel);
      }
      
      this.state.activeFrequency = content.frequency;
      return true;
    }
    
    // Handle experience protocol start requests
    if (content.type === 'start-rootwiz-protocol' && content.channel) {
      this.startExperienceProtocol(content.channel);
      return true;
    }
    
    return false;
  }
  
  /**
   * Find the channel that corresponds to a given frequency
   * @param {number} frequency Target frequency
   * @returns {string} Channel ID
   * @private
   */
  _findChannelForFrequency(frequency) {
    let closestChannel = null;
    let minDistance = Infinity;
    
    Object.entries(this.channels).forEach(([id, channel]) => {
      const distance = Math.abs(channel.frequency - frequency);
      if (distance < minDistance) {
        minDistance = distance;
        closestChannel = id;
      }
    });
    
    return closestChannel;
  }
  
  /**
   * Activate a specific RootWIZ channel
   * @param {string} channelId Channel to activate
   * @returns {boolean} Success
   * @public
   */
  activateChannel(channelId) {
    // Validate channel
    const channel = this.channels[channelId];
    if (!channel) {
      console.error(`Unknown RootWIZ channel: ${channelId}`);
      return false;
    }
    
    // Update state
    this.state.activeChannel = channelId;
    this.state.activeFrequency = channel.frequency;
    
    // Clear existing visualizations
    this._clearVisualizations();
    
    // Create visualization if enabled
    if (this.options.renderVisualizations && this.state.visualizer) {
      const visualization = this._createChannelVisualization(channel);
      
      if (visualization) {
        this.state.activeVisualizations.push(visualization);
      }
      
      // Update ZEN POINT if enabled
      if (this.options.zenPointBalance && this.state.visualizer) {
        this.state.visualizer.setZenPoint(channel.zenPoint);
      }
      
      // Update frequency
      if (this.state.bridge) {
        this.state.bridge.setFrequency(channel.frequency);
      }
    }
    
    // Update channel info
    this.state.channelInfo = {
      id: channelId,
      name: channel.name,
      frequency: channel.frequency,
      description: channel.description,
      experienceChannel: channel.experienceChannel,
      ancientSystem: channel.ancientSystem,
      timestamp: Date.now()
    };
    
    // Broadcast channel activation
    if (this.state.bridge) {
      this.state.bridge.broadcast({
        type: 'rootwiz-channel-activated',
        channel: channelId,
        name: channel.name,
        frequency: channel.frequency,
        experienceChannel: channel.experienceChannel,
        source: 'RootWIZConnector',
        timestamp: Date.now()
      }, 'RootWIZConnector');
    }
    
    console.log(`RootWIZ Channel Activated: ${channel.name} (${channel.frequency}Hz)`);
    
    return true;
  }
  
  /**
   * Start a direct experience protocol for a channel
   * @param {string} channelId Target channel
   * @returns {boolean} Success
   * @public
   */
  startExperienceProtocol(channelId) {
    // Validate channel
    const channel = this.channels[channelId];
    if (!channel) {
      console.error(`Unknown RootWIZ channel: ${channelId}`);
      return false;
    }
    
    // Get protocol
    const protocol = this.state.experienceProtocols[channelId];
    if (!protocol) {
      console.error(`No experience protocol found for channel: ${channelId}`);
      return false;
    }
    
    // Activate channel first
    this.activateChannel(channelId);
    
    // Broadcast protocol start
    if (this.state.bridge) {
      this.state.bridge.broadcast({
        type: 'rootwiz-protocol-started',
        channel: channelId,
        protocol: protocol.name,
        duration: protocol.duration / 60, // in minutes
        phases: protocol.phases.length,
        frequency: protocol.frequency,
        source: 'RootWIZConnector',
        timestamp: Date.now()
      });
    }
    
    // Create special visualization for protocol
    if (this.options.renderVisualizations && this.state.visualizer) {
      const protoViz = this._createProtocolVisualization(protocol, channel);
      
      if (protoViz) {
        this.state.activeVisualizations.push(protoViz);
      }
    }
    
    console.log(`RootWIZ Protocol Started: ${protocol.name} (${protocol.duration / 60} minutes)`);
    
    return true;
  }
  
  /**
   * Clear active visualizations
   * @private
   */
  _clearVisualizations() {
    // Clear active visualizations
    this.state.activeVisualizations.forEach(viz => {
      if (viz && viz.duration === -1) {
        viz.duration = 2.0; // Set to fade out over 2 seconds
        viz.timestamp = Date.now(); // Reset timestamp to start fadeout
      }
    });
    
    // Reset array
    this.state.activeVisualizations = [];
  }
  
  /**
   * Create visualization for a RootWIZ channel
   * @param {Object} channel Channel to visualize
   * @returns {Object} Created visualization
   * @private
   */
  _createChannelVisualization(channel) {
    if (!this.state.visualizer) return null;
    
    let visualization = null;
    
    // Create visualization based on pattern type
    switch (channel.pattern) {
      case 'mycelial-network':
        visualization = this._createMycelialVisualization(channel);
        break;
        
      case 'sacred-geometry':
        visualization = this._createSacredGeometryVisualization(channel);
        break;
        
      case 'dna-spiral':
        visualization = this._createDNAVisualization(channel);
        break;
        
      case 'sound-geometry':
        visualization = this._createSoundGeometryVisualization(channel);
        break;
        
      case 'stone-alignment':
        visualization = this._createStoneAlignmentVisualization(channel);
        break;
        
      case 'quantum-integration':
        visualization = this._createQuantumIntegrationVisualization(channel);
        break;
        
      default:
        // Create default pattern
        visualization = this.state.visualizer.createPatternForFrequency(
          channel.frequency,
          {
            amplitude: 0.8,
            complexity: channel.complexity,
            color: channel.color,
            duration: -1
          }
        );
    }
    
    return visualization;
  }
  
  /**
   * Create special visualization for experience protocol
   * @param {Object} protocol Protocol to visualize
   * @param {Object} channel Associated channel
   * @returns {Object} Created visualization
   * @private
   */
  _createProtocolVisualization(protocol, channel) {
    if (!this.state.visualizer) return null;
    
    // Create pattern based on protocol visual pattern
    let visualization = null;
    
    switch (protocol.visualPattern) {
      case 'hexagonal-network':
        visualization = this.state.visualizer.createPhiHarmonicGrid({
          frequency: channel.frequency,
          size: 15,
          divisions: 6,
          color: channel.color,
          opacity: 0.7,
          duration: -1
        });
        break;
        
      case 'flower-of-life':
        visualization = this.state.visualizer.createPatternForFrequency(
          channel.frequency,
          {
            amplitude: 0.9,
            complexity: 13,
            color: channel.color,
            opacity: 0.8,
            waveType: 'flower',
            duration: -1
          }
        );
        break;
        
      case 'dna-spiral':
        visualization = this.state.visualizer.createQuantumWaveform({
          frequency: channel.frequency,
          waveType: 'dna',
          color: channel.color,
          amplitude: 0.9,
          complexity: 13,
          radius: 3.0,
          duration: -1
        });
        break;
        
      case 'sound-mandala':
        visualization = this.state.visualizer.createPatternForFrequency(
          channel.frequency,
          {
            amplitude: 0.9,
            complexity: 13,
            color: channel.color,
            opacity: 0.8,
            waveType: 'mandala',
            duration: -1
          }
        );
        break;
        
      case 'geometric-network':
        visualization = this.state.visualizer.createPatternForFrequency(
          channel.frequency,
          {
            amplitude: 0.9,
            complexity: 13,
            color: channel.color,
            opacity: 0.7,
            waveType: 'geometric',
            duration: -1
          }
        );
        break;
        
      case 'toroidal-field':
        visualization = this.state.visualizer.createQuantumWaveform({
          frequency: channel.frequency,
          waveType: 'toroidal',
          color: channel.color,
          amplitude: 1.0,
          complexity: 21,
          radius: 5.0,
          duration: -1
        });
        break;
        
      default:
        // Create default pattern
        visualization = this.state.visualizer.createPatternForFrequency(
          channel.frequency,
          {
            amplitude: 0.9,
            complexity: 13,
            color: channel.color,
            duration: -1
          }
        );
    }
    
    return visualization;
  }
  
  /**
   * Create mycelial network visualization (432 Hz)
   * @param {Object} channel Channel configuration
   * @returns {Object} Created visualization
   * @private
   */
  _createMycelialVisualization(channel) {
    return this.state.visualizer.createPatternForFrequency(
      channel.frequency,
      {
        amplitude: 0.7,
        complexity: channel.complexity,
        color: channel.color,
        opacity: 0.8,
        waveType: 'mycelial',
        duration: -1
      }
    );
  }
  
  /**
   * Create sacred geometry visualization (528 Hz)
   * @param {Object} channel Channel configuration
   * @returns {Object} Created visualization
   * @private
   */
  _createSacredGeometryVisualization(channel) {
    return this.state.visualizer.createPatternForFrequency(
      channel.frequency,
      {
        amplitude: 0.8,
        complexity: channel.complexity,
        color: channel.color,
        opacity: 0.85,
        waveType: 'sacred-geometry',
        duration: -1
      }
    );
  }
  
  /**
   * Create DNA visualization (594 Hz)
   * @param {Object} channel Channel configuration
   * @returns {Object} Created visualization
   * @private
   */
  _createDNAVisualization(channel) {
    return this.state.visualizer.createQuantumWaveform({
      frequency: channel.frequency,
      waveType: 'dna',
      color: channel.color,
      amplitude: 0.8,
      complexity: channel.complexity,
      radius: 3.0,
      duration: -1
    });
  }
  
  /**
   * Create sound geometry visualization (672 Hz)
   * @param {Object} channel Channel configuration
   * @returns {Object} Created visualization
   * @private
   */
  _createSoundGeometryVisualization(channel) {
    return this.state.visualizer.createPatternForFrequency(
      channel.frequency,
      {
        amplitude: 0.75,
        complexity: channel.complexity,
        color: channel.color,
        opacity: 0.8,
        waveType: 'sound',
        duration: -1
      }
    );
  }
  
  /**
   * Create stone alignment visualization (720 Hz)
   * @param {Object} channel Channel configuration
   * @returns {Object} Created visualization
   * @private
   */
  _createStoneAlignmentVisualization(channel) {
    return this.state.visualizer.createPatternForFrequency(
      channel.frequency,
      {
        amplitude: 0.85,
        complexity: channel.complexity,
        color: channel.color,
        opacity: 0.7,
        waveType: 'standing-stones',
        duration: -1
      }
    );
  }
  
  /**
   * Create quantum integration visualization (768 Hz)
   * @param {Object} channel Channel configuration
   * @returns {Object} Created visualization
   * @private
   */
  _createQuantumIntegrationVisualization(channel) {
    return this.state.visualizer.createQuantumWaveform({
      frequency: channel.frequency,
      waveType: 'toroidal',
      color: channel.color,
      amplitude: 1.0,
      complexity: channel.complexity,
      radius: 4.0,
      duration: -1
    });
  }
  
  /**
   * Get active channel information
   * @returns {Object} Channel information
   * @public
   */
  getActiveChannelInfo() {
    return this.state.channelInfo;
  }
  
  /**
   * Get all RootWIZ channels
   * @returns {Object} All channels
   * @public
   */
  getAllChannels() {
    return this.channels;
  }
  
  /**
   * Get all experience protocols
   * @returns {Object} All protocols
   * @public
   */
  getAllProtocols() {
    return this.state.experienceProtocols;
  }
  
  /**
   * Get connector metrics
   * @returns {Object} Metrics
   * @public
   */
  getMetrics() {
    return {
      connected: this.state.connected,
      activeChannel: this.state.activeChannel,
      activeFrequency: this.state.activeFrequency,
      activeVisualizationCount: this.state.activeVisualizations.length,
      currentChannel: this.state.channelInfo,
      timestamp: Date.now()
    };
  }
}

// Export module
if (typeof module !== 'undefined') {
  module.exports = {
    RootWIZConnector
  };
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  window.RootWIZConnector = RootWIZConnector;
  
  // Auto-initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    // Wait for other components to initialize
    setTimeout(() => {
      window.ROOTWIZ_CONNECTOR = new RootWIZConnector();
    }, 2500);
  });
}

console.log('RootWIZ Visualization Connector loaded.');
