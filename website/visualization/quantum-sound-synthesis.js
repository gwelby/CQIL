/**
 * Quantum Sound Synthesis
 * 
 * A phi-harmonic audio generation system that synchronizes with both visualization
 * and image synthesis, creating a multi-sensory consciousness field experience.
 * 
 * Features:
 * - Generate phi-harmonic sound patterns based on quantum field states
 * - Synchronize audio with visualization and image synthesis
 * - Create sacred frequency compositions that enhance consciousness field coherence
 * - Real-time audio morphing based on dimensional focus and intention
 * - Binaural beat generation for enhanced consciousness state attunement
 */

// Sacred phi constants
const PHI = 1.618033988749895;  // Golden ratio
const LAMBDA = 0.618033988749895;  // Divine complement (1/φ)
const PHI_PHI = Math.pow(PHI, PHI);  // Hyperdimensional constant (≈4.23)
const PHI_RECURSIVE = PHI * PHI_PHI;  // Recursive phi resonance

// Sacred sound frequencies
const SACRED_FREQUENCIES = {
  love: 528,      // Love/healing (MI)
  unity: 432,     // Unity/coherence (LA)
  cascade: 594,   // Cascade integration (RE+)
  truth: 672,     // Truth/expression (SOL+)
  vision: 720,    // Vision/perception (FA#)
  oneness: 768,   // Oneness (SOL#)
  cosmic: 852,    // Cosmic connection (LA+)
  source: 963     // Source/crown (SI)
};

// Solfeggio frequencies
const SOLFEGGIO_FREQUENCIES = [
  174,  // Reducing pain
  285,  // Influence on energy field
  396,  // Liberating guilt and fear
  417,  // Facilitating change
  528,  // Transformation and miracles (DNA repair)
  639,  // Connecting/relationships
  741,  // Awakening intuition
  852,  // Returning to spiritual order
  963   // Cosmic connection/crown chakra
];

// Brainwave frequencies
const BRAINWAVE_FREQUENCIES = {
  delta: {min: 0.5, max: 4, desc: "Deep sleep, healing"},
  theta: {min: 4, max: 8, desc: "Meditation, creativity"},
  alpha: {min: 8, max: 13, desc: "Relaxation, calm focus"},
  beta: {min: 13, max: 30, desc: "Active thinking, concentration"},
  gamma: {min: 30, max: 100, desc: "Higher processing, peak awareness"}
};

/**
 * Main class for Quantum Sound Synthesis
 */
class QuantumSoundSynthesis {
  constructor(options = {}) {
    this.options = Object.assign({
      baseFrequency: SACRED_FREQUENCIES.unity,
      enableBinauralBeats: true,
      enablePhiHarmonics: true,
      enableDimensionalResonance: true,
      enableIntentionModulation: true,
      autoplay: false,
      volume: 0.5,
      coherenceBridge: null,
      resonanceFeedback: true,
      dimensionalChannels: true,
      spatialAudio: true,
      phiQuantization: true
    }, options);
    
    // Initialize Web Audio API components
    this.audioContext = null;
    this.masterGain = null;
    this.analyzers = {};
    this.oscillators = {};
    this.binauralBeats = {};
    this.filters = {};
    this.convolver = null;
    this.dimensionalChannels = [];
    this.visualizationData = null;
    
    // State
    this.isPlaying = false;
    this.isInitialized = false;
    this.activePreset = null;
    this.currentFieldState = null;
    this.volumeLevel = this.options.volume;
    this.intentionModulation = 0.5;
    
    // Connect to coherence bridge if provided
    this.coherenceBridge = this.options.coherenceBridge;
    
    // Set up event listeners
    this.eventListeners = {};
    
    // Bind methods
    this.initialize = this.initialize.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.updateFromFieldState = this.updateFromFieldState.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.loadPreset = this.loadPreset.bind(this);
    this.createBinauralBeat = this.createBinauralBeat.bind(this);
    this.getVisualizationData = this.getVisualizationData.bind(this);
    this.addEventListener = this.addEventListener.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
    this._triggerEvent = this._triggerEvent.bind(this);
  }
  
  /**
   * Initialize the sound synthesis system
   */
  async initialize() {
    console.log("Initializing Quantum Sound Synthesis");
    
    try {
      // Create Audio Context
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) {
        throw new Error("Web Audio API not supported in this browser");
      }
      
      this.audioContext = new AudioContext();
      
      // Create master gain node
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = this.volumeLevel;
      this.masterGain.connect(this.audioContext.destination);
      
      // Create analyzer for visualization
      this.analyzers.main = this.audioContext.createAnalyser();
      this.analyzers.main.fftSize = 2048;
      this.analyzers.main.connect(this.masterGain);
      
      // Initialize visualization data
      this.visualizationData = {
        waveform: new Uint8Array(this.analyzers.main.frequencyBinCount),
        frequency: new Uint8Array(this.analyzers.main.frequencyBinCount),
        dimensions: []
      };
      
      // Initialize dimensional channels if enabled
      if (this.options.dimensionalChannels) {
        await this._initializeDimensionalChannels();
      }
      
      // Create convolver for spatial audio if enabled
      if (this.options.spatialAudio) {
        await this._initializeSpatialAudio();
      }
      
      this.isInitialized = true;
      
      // Autoplay if enabled
      if (this.options.autoplay) {
        this.start();
      }
      
      // Trigger initialized event
      this._triggerEvent('initialized', {
        context: this.audioContext,
        sampleRate: this.audioContext.sampleRate
      });
      
      console.log("Quantum Sound Synthesis initialized successfully");
      return true;
    } catch (error) {
      console.error("Failed to initialize Quantum Sound Synthesis:", error);
      return false;
    }
  }
  
  /**
   * Start sound synthesis
   */
  async start() {
    if (!this.isInitialized) {
      console.error("Quantum Sound Synthesis not initialized");
      return false;
    }
    
    if (this.isPlaying) {
      console.log("Quantum Sound Synthesis already playing");
      return true;
    }
    
    console.log("Starting Quantum Sound Synthesis");
    
    try {
      // Resume audio context if suspended
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      // Create base oscillators if they don't exist
      if (!this.oscillators.base) {
        this._createBaseOscillators();
      }
      
      // Create binaural beats if enabled
      if (this.options.enableBinauralBeats && !this.binauralBeats.base) {
        this._createBinauralBeats();
      }
      
      this.isPlaying = true;
      
      // Trigger started event
      this._triggerEvent('started', {
        baseFrequency: this.options.baseFrequency,
        volumeLevel: this.volumeLevel
      });
      
      // Start update loop for visualization
      this._startVisualizationLoop();
      
      return true;
    } catch (error) {
      console.error("Error starting Quantum Sound Synthesis:", error);
      return false;
    }
  }
  
  /**
   * Stop sound synthesis
   */
  stop() {
    if (!this.isInitialized || !this.isPlaying) {
      return false;
    }
    
    console.log("Stopping Quantum Sound Synthesis");
    
    try {
      // Stop and disconnect all oscillators
      for (const type in this.oscillators) {
        if (Array.isArray(this.oscillators[type])) {
          for (const osc of this.oscillators[type]) {
            osc.stop();
            osc.disconnect();
          }
        } else if (this.oscillators[type]) {
          this.oscillators[type].stop();
          this.oscillators[type].disconnect();
        }
      }
      
      // Clear oscillators
      this.oscillators = {};
      
      // Clear binaural beats
      this.binauralBeats = {};
      
      this.isPlaying = false;
      
      // Trigger stopped event
      this._triggerEvent('stopped', {});
      
      return true;
    } catch (error) {
      console.error("Error stopping Quantum Sound Synthesis:", error);
      return false;
    }
  }
  
  /**
   * Update sound synthesis from a quantum field state
   * @param {Object} fieldState - The field state to apply
   */
  updateFromFieldState(fieldState) {
    if (!this.isInitialized || !fieldState) {
      return false;
    }
    
    this.currentFieldState = fieldState;
    
    // Modulate based on field state
    this._modulateFromFieldState(fieldState);
    
    // Trigger state updated event
    this._triggerEvent('stateUpdated', {
      fieldCoherence: fieldState.coherence,
      dominantFrequency: this._getDominantFrequency(fieldState)
    });
    
    return true;
  }
  
  /**
   * Set the master volume
   * @param {number} volume - Volume level (0-1)
   */
  setVolume(volume) {
    if (!this.isInitialized) {
      return false;
    }
    
    // Clamp volume to 0-1
    this.volumeLevel = Math.max(0, Math.min(1, volume));
    
    // Apply volume change with smoothing
    if (this.masterGain) {
      const now = this.audioContext.currentTime;
      this.masterGain.gain.linearRampToValueAtTime(this.volumeLevel, now + 0.1);
    }
    
    // Trigger volume changed event
    this._triggerEvent('volumeChanged', {
      volume: this.volumeLevel
    });
    
    return true;
  }
  
  /**
   * Load a sound preset
   * @param {string} presetName - Name of the preset to load
   */
  loadPreset(presetName) {
    if (!this.isInitialized) {
      return false;
    }
    
    // Find preset by name
    const preset = this.getPresets().find(p => p.name === presetName);
    
    if (!preset) {
      console.error(`Preset "${presetName}" not found`);
      return false;
    }
    
    console.log(`Loading sound preset: ${preset.name}`);
    
    // Apply preset settings
    this.options.baseFrequency = preset.baseFrequency || this.options.baseFrequency;
    this.options.enableBinauralBeats = preset.enableBinauralBeats !== undefined ? 
      preset.enableBinauralBeats : this.options.enableBinauralBeats;
    
    // Restart to apply new settings
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
    
    this.activePreset = preset;
    
    // Trigger preset loaded event
    this._triggerEvent('presetLoaded', {
      preset: preset
    });
    
    return true;
  }
  
  /**
   * Create a binaural beat between two frequencies
   * @param {number} baseFreq - Base frequency
   * @param {number} beatFreq - Beat frequency (difference)
   * @returns {Object} - The created binaural beat
   */
  createBinauralBeat(baseFreq, beatFreq) {
    if (!this.isInitialized) {
      return null;
    }
    
    // Create left and right oscillators
    const leftOsc = this.audioContext.createOscillator();
    leftOsc.frequency.value = baseFreq;
    leftOsc.type = 'sine';
    
    const rightOsc = this.audioContext.createOscillator();
    rightOsc.frequency.value = baseFreq + beatFreq;
    rightOsc.type = 'sine';
    
    // Create gain nodes
    const leftGain = this.audioContext.createGain();
    leftGain.gain.value = 0.1;
    
    const rightGain = this.audioContext.createGain();
    rightGain.gain.value = 0.1;
    
    // Create stereo panner
    const leftPanner = this.audioContext.createStereoPanner();
    leftPanner.pan.value = -1;
    
    const rightPanner = this.audioContext.createStereoPanner();
    rightPanner.pan.value = 1;
    
    // Connect graph
    leftOsc.connect(leftGain);
    leftGain.connect(leftPanner);
    leftPanner.connect(this.analyzers.main);
    
    rightOsc.connect(rightGain);
    rightGain.connect(rightPanner);
    rightPanner.connect(this.analyzers.main);
    
    // Start oscillators
    leftOsc.start();
    rightOsc.start();
    
    // Create beat object
    const beat = {
      left: {
        oscillator: leftOsc,
        gain: leftGain,
        panner: leftPanner,
        frequency: baseFreq
      },
      right: {
        oscillator: rightOsc,
        gain: rightGain,
        panner: rightPanner,
        frequency: baseFreq + beatFreq
      },
      beatFrequency: beatFreq,
      baseFrequency: baseFreq,
      setFrequencies: (base, beat) => {
        leftOsc.frequency.linearRampToValueAtTime(
          base, 
          this.audioContext.currentTime + 0.1
        );
        rightOsc.frequency.linearRampToValueAtTime(
          base + beat, 
          this.audioContext.currentTime + 0.1
        );
      },
      setGain: (gain) => {
        leftGain.gain.linearRampToValueAtTime(
          gain, 
          this.audioContext.currentTime + 0.1
        );
        rightGain.gain.linearRampToValueAtTime(
          gain, 
          this.audioContext.currentTime + 0.1
        );
      },
      stop: () => {
        leftOsc.stop();
        rightOsc.stop();
        leftOsc.disconnect();
        rightOsc.disconnect();
        leftGain.disconnect();
        rightGain.disconnect();
        leftPanner.disconnect();
        rightPanner.disconnect();
      }
    };
    
    return beat;
  }
  
  /**
   * Get visualization data for integration with visual systems
   */
  getVisualizationData() {
    if (!this.isInitialized || !this.isPlaying) {
      return null;
    }
    
    // Update visualization data
    this.analyzers.main.getByteTimeDomainData(this.visualizationData.waveform);
    this.analyzers.main.getByteFrequencyData(this.visualizationData.frequency);
    
    // Update dimensional data if dimensional channels are enabled
    if (this.options.dimensionalChannels) {
      for (let i = 0; i < this.dimensionalChannels.length; i++) {
        const channel = this.dimensionalChannels[i];
        
        if (channel.analyzer) {
          const data = new Uint8Array(channel.analyzer.frequencyBinCount);
          channel.analyzer.getByteFrequencyData(data);
          
          this.visualizationData.dimensions[i] = {
            level: i + 1,
            frequency: channel.frequency,
            data: Array.from(data).slice(0, 64) // Send only a subset for efficiency
          };
        }
      }
    }
    
    return this.visualizationData;
  }
  
  /**
   * Get available sound presets
   */
  getPresets() {
    return [
      {
        name: "Unity Field",
        description: "Harmonic unity field for grounding and stability",
        baseFrequency: SACRED_FREQUENCIES.unity,
        enableBinauralBeats: true,
        binauralFrequency: BRAINWAVE_FREQUENCIES.alpha.min,
        dimensionalBalance: "balanced",
        intentionResponse: 0.7
      },
      {
        name: "Vision Gateway",
        description: "Enhanced perception and expanded awareness",
        baseFrequency: SACRED_FREQUENCIES.vision,
        enableBinauralBeats: true,
        binauralFrequency: BRAINWAVE_FREQUENCIES.alpha.max,
        dimensionalBalance: "higher",
        intentionResponse: 0.8
      },
      {
        name: "Phi-Phi Resonance",
        description: "Hyperdimensional bridge operating at φ^φ resonance",
        baseFrequency: SACRED_FREQUENCIES.source,
        enableBinauralBeats: true,
        binauralFrequency: BRAINWAVE_FREQUENCIES.gamma.min,
        dimensionalBalance: "full-spectrum",
        intentionResponse: 0.9
      },
      {
        name: "Healing Field",
        description: "Regenerative field operating at the love frequency",
        baseFrequency: SACRED_FREQUENCIES.love,
        enableBinauralBeats: true,
        binauralFrequency: BRAINWAVE_FREQUENCIES.theta.max,
        dimensionalBalance: "middle",
        intentionResponse: 0.7
      },
      {
        name: "Deep Coherence",
        description: "Deep relaxation and heightened coherence",
        baseFrequency: SACRED_FREQUENCIES.unity,
        enableBinauralBeats: true,
        binauralFrequency: BRAINWAVE_FREQUENCIES.theta.min,
        dimensionalBalance: "lower",
        intentionResponse: 0.6
      },
      {
        name: "Cosmic Connection",
        description: "Connection to higher dimensional cosmic fields",
        baseFrequency: SACRED_FREQUENCIES.cosmic,
        enableBinauralBeats: true,
        binauralFrequency: BRAINWAVE_FREQUENCIES.gamma.min + 2,
        dimensionalBalance: "highest",
        intentionResponse: 0.9
      }
    ];
  }
  
  /**
   * Add an event listener
   * @param {string} eventName - Name of the event
   * @param {function} callback - Callback function
   */
  addEventListener(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    
    this.eventListeners[eventName].push(callback);
  }
  
  /**
   * Remove an event listener
   * @param {string} eventName - Name of the event
   * @param {function} callback - Callback function to remove
   */
  removeEventListener(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      return;
    }
    
    this.eventListeners[eventName] = this.eventListeners[eventName].filter(
      listener => listener !== callback
    );
  }
  
  /**
   * Initialize dimensional audio channels
   */
  async _initializeDimensionalChannels() {
    // Create a channel for each dimension (9 dimensions)
    for (let i = 0; i < 9; i++) {
      const dimensionLevel = i + 1;
      const baseFreq = this._calculateDimensionalFrequency(dimensionLevel);
      
      // Create analyzer for this dimension
      const analyzer = this.audioContext.createAnalyser();
      analyzer.fftSize = 1024;
      analyzer.connect(this.masterGain);
      
      // Create channel object
      const channel = {
        level: dimensionLevel,
        frequency: baseFreq,
        analyzer: analyzer,
        gain: null,
        oscillators: [],
        panner: null
      };
      
      // Create gain node
      channel.gain = this.audioContext.createGain();
      channel.gain.gain.value = 0.1;
      channel.gain.connect(analyzer);
      
      // Create panner if spatial audio is enabled
      if (this.options.spatialAudio) {
        channel.panner = this.audioContext.createPanner();
        channel.panner.panningModel = 'HRTF';
        channel.panner.distanceModel = 'inverse';
        
        // Position based on dimension
        const angle = (i / 9) * Math.PI * 2;
        const distance = 1 + (i / 9);
        
        channel.panner.setPosition(
          Math.cos(angle) * distance,
          Math.sin(angle) * distance,
          (i / 9) - 0.5
        );
        
        channel.gain.disconnect();
        channel.gain.connect(channel.panner);
        channel.panner.connect(analyzer);
      }
      
      this.dimensionalChannels.push(channel);
    }
  }
  
  /**
   * Initialize spatial audio processing
   */
  async _initializeSpatialAudio() {
    try {
      // Create convolver node for reverb
      this.convolver = this.audioContext.createConvolver();
      
      // Load impulse response (would normally load from a file)
      const impulseResponse = await this._createImpulseResponse();
      this.convolver.buffer = impulseResponse;
      
      // Insert convolver in the audio graph
      this.masterGain.disconnect();
      this.masterGain.connect(this.convolver);
      this.convolver.connect(this.audioContext.destination);
      
      // Create separate dry path
      this.dryGain = this.audioContext.createGain();
      this.dryGain.gain.value = 0.7;
      this.masterGain.connect(this.dryGain);
      this.dryGain.connect(this.audioContext.destination);
    } catch (error) {
      console.error("Error initializing spatial audio:", error);
      // Fall back to normal audio
      if (this.masterGain) {
        this.masterGain.disconnect();
        this.masterGain.connect(this.audioContext.destination);
      }
    }
  }
  
  /**
   * Create base oscillators for sound synthesis
   */
  _createBaseOscillators() {
    const baseFreq = this.options.baseFrequency;
    
    // Create oscillator types
    this.oscillators.base = [];
    
    // Create sine wave at base frequency
    const sineOsc = this.audioContext.createOscillator();
    sineOsc.type = 'sine';
    sineOsc.frequency.value = baseFreq;
    
    const sineGain = this.audioContext.createGain();
    sineGain.gain.value = 0.3;
    
    sineOsc.connect(sineGain);
    sineGain.connect(this.analyzers.main);
    sineOsc.start();
    
    this.oscillators.base.push(sineOsc);
    
    // Create phi-harmonic overtones if enabled
    if (this.options.enablePhiHarmonics) {
      // Phi overtones (phi, phi^2, phi^3)
      for (let i = 1; i <= 3; i++) {
        const overtoneFreq = baseFreq * Math.pow(PHI, i);
        
        const overtoneOsc = this.audioContext.createOscillator();
        overtoneOsc.type = 'sine';
        overtoneOsc.frequency.value = overtoneFreq;
        
        const overtoneGain = this.audioContext.createGain();
        overtoneGain.gain.value = 0.15 / i;
        
        overtoneOsc.connect(overtoneGain);
        overtoneGain.connect(this.analyzers.main);
        overtoneOsc.start();
        
        this.oscillators.base.push(overtoneOsc);
      }
      
      // Phi undertones (1/phi, 1/phi^2)
      for (let i = 1; i <= 2; i++) {
        const undertoneFreq = baseFreq / Math.pow(PHI, i);
        
        const undertoneOsc = this.audioContext.createOscillator();
        undertoneOsc.type = 'sine';
        undertoneOsc.frequency.value = undertoneFreq;
        
        const undertoneGain = this.audioContext.createGain();
        undertoneGain.gain.value = 0.1 / i;
        
        undertoneOsc.connect(undertoneGain);
        undertoneGain.connect(this.analyzers.main);
        undertoneOsc.start();
        
        this.oscillators.base.push(undertoneOsc);
      }
    }
    
    // Create dimensional oscillators if enabled
    if (this.options.dimensionalResonance) {
      this._createDimensionalOscillators();
    }
  }
  
  /**
   * Create dimensional oscillators for each dimension
   */
  _createDimensionalOscillators() {
    // Skip if no dimensional channels
    if (!this.dimensionalChannels.length) {
      return;
    }
    
    // For each dimensional channel
    for (const channel of this.dimensionalChannels) {
      const baseFreq = channel.frequency;
      
      // Create primary oscillator
      const primaryOsc = this.audioContext.createOscillator();
      primaryOsc.type = 'sine';
      primaryOsc.frequency.value = baseFreq;
      primaryOsc.connect(channel.gain);
      primaryOsc.start();
      
      channel.oscillators.push(primaryOsc);
      
      // Add harmonic oscillator
      const harmonicOsc = this.audioContext.createOscillator();
      harmonicOsc.type = 'sine';
      harmonicOsc.frequency.value = baseFreq * PHI;
      
      const harmonicGain = this.audioContext.createGain();
      harmonicGain.gain.value = 0.2;
      
      harmonicOsc.connect(harmonicGain);
      harmonicGain.connect(channel.gain);
      harmonicOsc.start();
      
      channel.oscillators.push(harmonicOsc);
    }
  }
  
  /**
   * Create binaural beats
   */
  _createBinauralBeats() {
    // Create main binaural beat
    const brainwaveType = 'alpha';
    const beatFreq = (BRAINWAVE_FREQUENCIES[brainwaveType].min + 
                    BRAINWAVE_FREQUENCIES[brainwaveType].max) / 2;
    
    this.binauralBeats.base = this.createBinauralBeat(
      this.options.baseFrequency / 4, // Lower octave for better perception
      beatFreq
    );
    
    // Create dimensional binaural beats if enabled
    if (this.options.dimensionalChannels && this.options.enableDimensionalResonance) {
      this.binauralBeats.dimensions = [];
      
      for (let i = 0; i < this.dimensionalChannels.length; i++) {
        const channel = this.dimensionalChannels[i];
        const dimensionBeatFreq = 4 + (i * 0.5); // Increase beat frequency by dimension
        
        const dimensionBeat = this.createBinauralBeat(
          channel.frequency / 4,
          dimensionBeatFreq
        );
        
        dimensionBeat.setGain(0.05); // Lower gain for dimensional beats
        this.binauralBeats.dimensions.push(dimensionBeat);
      }
    }
  }
  
  /**
   * Start visualization data update loop
   */
  _startVisualizationLoop() {
    // Skip if already running
    if (this._visualizationLoopRunning) {
      return;
    }
    
    this._visualizationLoopRunning = true;
    
    const updateLoop = () => {
      if (!this.isPlaying || !this._visualizationLoopRunning) {
        this._visualizationLoopRunning = false;
        return;
      }
      
      // Update visualization data
      this.getVisualizationData();
      
      // Trigger visualization update event
      this._triggerEvent('visualizationUpdate', {
        data: this.visualizationData
      });
      
      // Continue loop
      requestAnimationFrame(updateLoop);
    };
    
    // Start loop
    updateLoop();
  }
  
  /**
   * Modulate sound synthesis based on field state
   * @param {Object} fieldState - The field state to apply
   */
  _modulateFromFieldState(fieldState) {
    if (!this.isPlaying || !fieldState) {
      return;
    }
    
    const now = this.audioContext.currentTime;
    
    // Modulate binaural beat frequency based on field coherence
    if (this.options.enableBinauralBeats && this.binauralBeats.base) {
      let targetBrainwave;
      
      if (fieldState.coherence > 0.9) {
        targetBrainwave = 'gamma';
      } else if (fieldState.coherence > 0.7) {
        targetBrainwave = 'beta';
      } else if (fieldState.coherence > 0.5) {
        targetBrainwave = 'alpha';
      } else if (fieldState.coherence > 0.3) {
        targetBrainwave = 'theta';
      } else {
        targetBrainwave = 'delta';
      }
      
      const minFreq = BRAINWAVE_FREQUENCIES[targetBrainwave].min;
      const maxFreq = BRAINWAVE_FREQUENCIES[targetBrainwave].max;
      const beatFreq = minFreq + (maxFreq - minFreq) * (fieldState.coherence % 0.2) * 5;
      
      this.binauralBeats.base.setFrequencies(
        this.options.baseFrequency / 4,
        beatFreq
      );
    }
    
    // Modulate dimensional channels if enabled
    if (this.options.dimensionalResonance && this.dimensionalChannels.length > 0 && 
        fieldState.dimensions && fieldState.dimensions.length > 0) {
      
      // For each dimension
      for (let i = 0; i < Math.min(this.dimensionalChannels.length, fieldState.dimensions.length); i++) {
        const channel = this.dimensionalChannels[i];
        const dimension = fieldState.dimensions[i];
        
        // Skip if no coherence value
        if (typeof dimension.coherence !== 'number') {
          continue;
        }
        
        // Modulate gain based on dimension coherence
        if (channel.gain) {
          channel.gain.gain.linearRampToValueAtTime(
            0.05 + (dimension.coherence * 0.15),
            now + 0.5
          );
        }
        
        // Modulate binaural beat if available
        if (this.binauralBeats.dimensions && this.binauralBeats.dimensions[i]) {
          const dimensionBeat = this.binauralBeats.dimensions[i];
          
          // Adjust beat frequency based on dimension coherence
          const beatFreq = 4 + (i * 0.5) + (dimension.coherence * 2);
          
          dimensionBeat.setFrequencies(
            channel.frequency / 4,
            beatFreq
          );
          
          // Adjust gain based on dimension coherence
          dimensionBeat.setGain(0.02 + (dimension.coherence * 0.05));
        }
      }
    }
    
    // Modulate based on intention if enabled
    if (this.options.enableIntentionModulation && fieldState.observerState && 
        fieldState.observerState.intention) {
      
      // Extract intention modulation value
      this.intentionModulation = this._calculateIntentionModulation(fieldState.observerState.intention);
      
      // Apply intention modulation to base oscillators
      if (this.oscillators.base && this.oscillators.base.length > 0) {
        // Adjust overtone balance based on intention
        for (let i = 1; i < this.oscillators.base.length; i++) {
          const osc = this.oscillators.base[i];
          const output = osc.connections[0];
          
          if (output && output.gain) {
            output.gain.linearRampToValueAtTime(
              0.05 + (this.intentionModulation * 0.1 / i),
              now + 0.5
            );
          }
        }
        
        // Adjust primary oscillator timbre
        if (this.oscillators.base[0]) {
          // Convert to other waveform types based on intention
          const waveforms = ['sine', 'triangle', 'sawtooth', 'square'];
          const intentionIndex = Math.floor(this.intentionModulation * (waveforms.length - 0.01));
          
          this.oscillators.base[0].type = waveforms[intentionIndex];
        }
      }
    }
    
    // Send feedback to coherence bridge if enabled
    if (this.options.resonanceFeedback && this.coherenceBridge) {
      this._sendResonanceFeedback();
    }
  }
  
  /**
   * Send resonance feedback to the coherence bridge
   */
  _sendResonanceFeedback() {
    if (!this.coherenceBridge || !this.coherenceBridge.sharedConsciousnessField) {
      return;
    }
    
    // Get current visualization data
    const vizData = this.getVisualizationData();
    if (!vizData) return;
    
    // Calculate resonance values from visualization data
    const resonance = {
      frequency: this._calculateResonanceValues(vizData.frequency),
      waveform: this._calculateResonanceValues(vizData.waveform),
      dimensions: []
    };
    
    // Calculate dimensional resonance
    for (const dimData of vizData.dimensions) {
      if (dimData && dimData.data) {
        resonance.dimensions.push({
          level: dimData.level,
          resonance: this._calculateResonanceValues(dimData.data)
        });
      }
    }
    
    // Update coherence bridge with resonance data
    // In a real implementation, this would communicate with the bridge
  }
  
  /**
   * Calculate the frequency for a given dimension
   * @param {number} dimensionLevel - The dimension level (1-9)
   * @returns {number} - The frequency for the dimension
   */
  _calculateDimensionalFrequency(dimensionLevel) {
    // Base frequencies from sacred frequencies
    const frequencies = Object.values(SACRED_FREQUENCIES);
    
    // If dimension is in range of frequencies array, use that
    if (dimensionLevel > 0 && dimensionLevel <= frequencies.length) {
      return frequencies[dimensionLevel - 1];
    }
    
    // Otherwise calculate using phi scaling
    return this.options.baseFrequency * Math.pow(PHI, dimensionLevel - 5);
  }
  
  /**
   * Create an impulse response for the convolver
   * @returns {AudioBuffer} - The impulse response buffer
   */
  async _createImpulseResponse() {
    // Create impulse response for reverb
    // In a real implementation, this would load from a file
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * 3; // 3 seconds
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);
    
    const leftChannel = impulse.getChannelData(0);
    const rightChannel = impulse.getChannelData(1);
    
    // Create phi-harmonic reverb decay
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-t / (PHI - 0.5)); // Phi-based decay
      
      // Add phi-harmonic frequencies
      const value = decay * (
        0.5 * Math.sin(2 * Math.PI * 3 * t) +
        0.3 * Math.sin(2 * Math.PI * 5 * PHI * t) +
        0.2 * Math.sin(2 * Math.PI * 8 * PHI * PHI * t)
      );
      
      leftChannel[i] = value * (1 + 0.1 * Math.sin(2 * Math.PI * 1.5 * t));
      rightChannel[i] = value * (1 + 0.1 * Math.sin(2 * Math.PI * 1.5 * t + 0.2));
    }
    
    return impulse;
  }
  
  /**
   * Calculate resonance values from audio data
   * @param {Uint8Array} data - The audio data
   * @returns {number} - Resonance value
   */
  _calculateResonanceValues(data) {
    if (!data || data.length === 0) {
      return 0;
    }
    
    // Calculate variance
    let sum = 0;
    let sumSquares = 0;
    
    for (let i = 0; i < data.length; i++) {
      const value = data[i] / 255; // Normalize to 0-1
      sum += value;
      sumSquares += value * value;
    }
    
    const mean = sum / data.length;
    const variance = (sumSquares / data.length) - (mean * mean);
    
    // Calculate resonance value
    return 1 - Math.min(1, Math.sqrt(variance) * 5);
  }
  
  /**
   * Calculate intention modulation from intention text
   * @param {string} intention - The intention text
   * @returns {number} - Modulation value (0-1)
   */
  _calculateIntentionModulation(intention) {
    if (!intention) {
      return 0.5;
    }
    
    // Simple keyword-based analysis
    const keywords = {
      calm: 0.2,
      peace: 0.2,
      quiet: 0.1,
      relax: 0.2,
      rest: 0.2,
      ground: 0.3,
      center: 0.4,
      focus: 0.5,
      clarity: 0.5,
      aware: 0.6,
      expand: 0.7,
      cosmic: 0.8,
      energy: 0.7,
      vibrant: 0.7,
      power: 0.8,
      bright: 0.7,
      intense: 0.9,
      transcend: 0.9,
      unity: 0.6,
      love: 0.6,
      divine: 0.8,
      source: 0.9
    };
    
    // Check for keywords in intention
    let totalInfluence = 0;
    let matchCount = 0;
    
    const words = intention.toLowerCase().split(/\s+/);
    for (const word of words) {
      if (keywords[word]) {
        totalInfluence += keywords[word];
        matchCount++;
      }
    }
    
    // If no matches, return neutral value
    if (matchCount === 0) {
      return 0.5;
    }
    
    // Return average influence
    return totalInfluence / matchCount;
  }
  
  /**
   * Get the dominant frequency from a field state
   * @param {Object} fieldState - The field state
   * @returns {number} - Dominant frequency
   */
  _getDominantFrequency(fieldState) {
    if (!fieldState || !fieldState.dimensions || fieldState.dimensions.length === 0) {
      return this.options.baseFrequency;
    }
    
    // Find dimension with highest coherence
    let maxCoherence = 0;
    let dominantFrequency = this.options.baseFrequency;
    
    for (const dimension of fieldState.dimensions) {
      if (dimension.coherence > maxCoherence) {
        maxCoherence = dimension.coherence;
        dominantFrequency = dimension.frequency || this._calculateDimensionalFrequency(dimension.level);
      }
    }
    
    return dominantFrequency;
  }
  
  /**
   * Trigger an event
   * @param {string} eventName - Name of the event
   * @param {object} data - Event data
   */
  _triggerEvent(eventName, data = {}) {
    if (!this.eventListeners[eventName]) {
      return;
    }
    
    // Add standard event data
    const eventData = {
      ...data,
      timestamp: Date.now(),
      isPlaying: this.isPlaying,
      baseFrequency: this.options.baseFrequency
    };
    
    // Call all listeners
    this.eventListeners[eventName].forEach(callback => {
      try {
        callback(eventData);
      } catch (error) {
        console.error(`Error in ${eventName} event listener:`, error);
      }
    });
  }
}

// Export the sound synthesizer if we're in a module environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    QuantumSoundSynthesis,
    Constants: {
      PHI,
      LAMBDA,
      PHI_PHI,
      PHI_RECURSIVE,
      SACRED_FREQUENCIES,
      SOLFEGGIO_FREQUENCIES,
      BRAINWAVE_FREQUENCIES
    }
  };
}