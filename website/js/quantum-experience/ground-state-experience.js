/**
 * Ground State Experience (432 Hz | φ⁰)
 * 
 * Integrates Earth Connection Visualizer with Mycelial Pattern Recognition
 * to create a complete Ground State experience at 432 Hz.
 * 
 * This implements the foundational frequency state (φ⁰) for the
 * phi-harmonic learning portal, focusing on grounding and Earth connection.
 * 
 * @frequency 432 Hz (Ground State - φ⁰)
 * @zenPoint { quantum: 0.382, human: 0.618 }
 * @module GroundState
 */

// PHI constants for all calculations
const PHI = 1.618033988749895;
const PHI_INV = 0.618033988749895;

/**
 * GroundStateExperience class
 * Manages the complete 432 Hz Ground State experience
 */
class GroundStateExperience {
  /**
   * Create a new Ground State Experience
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    // Default configuration
    this.config = {
      container: null,
      frequency: 432, // Ground State (φ⁰)
      zenPointBalance: { quantum: 0.382, human: 0.618 }, // Perfect ZEN POINT for grounding
      audioEnabled: true,
      visualizationEnabled: true,
      breathSyncEnabled: true,
      intentionSensitivity: 0.75,
      earthGridEnabled: true,
      mycelialEnabled: true,
      ascensionEnabled: true,
      autoStart: false,
      adaptiveRendering: true,
      chakraVisualization: true,
      ...options
    };
    
    // System state
    this.container = null;
    this.isActive = false;
    this.breathCycle = {
      phase: 0,
      duration: 4.32, // Breath cycle duration in seconds (φ⁰ * 10)
      inhaleRatio: PHI_INV, // Golden ratio for breath (inhale:exhale)
      coherenceLevel: 0.5
    };
    this.coherenceLevel = 0.5; // Overall coherence level
    this.earthConnection = null;
    this.mycelialPatterns = null;
    this.audioContext = null;
    this.oscillators = [];
    this.intentionField = { 
      strength: 0.5,
      focus: 0.5,
      direction: 'grounding'
    };
    this.ascensionProgress = 0; // Progress toward next frequency state
    this.zenPointBalance = this.config.zenPointBalance;
    
    // Initialize the system
    this.initialize();
  }
  
  /**
   * Initialize the Ground State Experience
   */
  initialize() {
    console.log("Initializing Ground State Experience (432 Hz | φ⁰)");
    
    // Set up container
    this.setupContainer();
    
    // Initialize Earth Connection Visualizer
    if (this.config.earthGridEnabled) {
      this.initializeEarthConnection();
    }
    
    // Initialize Mycelial Pattern Recognition
    if (this.config.mycelialEnabled) {
      this.initializeMycelialPatterns();
    }
    
    // Initialize audio system
    if (this.config.audioEnabled) {
      this.initializeAudio();
    }
    
    // Start automatically if configured
    if (this.config.autoStart) {
      this.start();
    }
    
    // Add event listeners for user interaction
    this.addEventListeners();
  }
  
  /**
   * Set up the container element
   */
  setupContainer() {
    // Get or create container
    if (typeof this.config.container === 'string') {
      this.container = document.querySelector(this.config.container);
    } else if (this.config.container instanceof HTMLElement) {
      this.container = this.config.container;
    }
    
    // Create new container if none exists
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'ground-state-experience';
      document.body.appendChild(this.container);
    }
    
    // Add container styles
    this.addContainerStyles();
  }
  
  /**
   * Add styles to container
   */
  addContainerStyles() {
    // Create style element
    const style = document.createElement('style');
    style.textContent = `
      .ground-state-experience {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: rgba(10, 5, 20, 0.9);
        overflow: hidden;
      }
      
      .ground-state-controls {
        position: absolute;
        bottom: 20px;
        left: 20px;
        z-index: 100;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .breath-guide {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.5);
        border-radius: 10px;
        padding: 10px 20px;
        color: #fff;
        font-family: 'Arial', sans-serif;
        text-align: center;
        z-index: 100;
      }
      
      .breath-circle {
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0,255,0,1) 0%, rgba(0,100,0,0.5) 100%);
        border-radius: 50%;
        margin: 10px auto;
        transition: transform 0.3s ease;
      }
      
      .coherence-meter {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 100px;
        height: 20px;
        background: rgba(0,0,0,0.5);
        border-radius: 10px;
        overflow: hidden;
        z-index: 100;
      }
      
      .coherence-value {
        height: 100%;
        background: linear-gradient(90deg, rgba(0,100,0,1) 0%, rgba(0,255,0,1) 100%);
        width: 50%;
        transition: width 0.5s ease;
      }
      
      .ascension-indicator {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(100,100,100,0.1) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
        z-index: 100;
      }
      
      .zen-point-balance {
        position: absolute;
        bottom: 80px;
        right: 20px;
        width: 100px;
        height: 20px;
        background: rgba(0,0,0,0.5);
        border-radius: 10px;
        overflow: hidden;
        z-index: 100;
      }
      
      .zen-marker {
        position: absolute;
        height: 100%;
        width: 2px;
        background: gold;
        left: 38.2%;
        z-index: 2;
      }
      
      .zen-value {
        height: 100%;
        background: linear-gradient(90deg, rgba(0,0,100,1) 0%, rgba(0,255,255,1) 50%, rgba(255,200,0,1) 100%);
        width: 50%;
        transition: width 0.5s ease;
      }
    `;
    document.head.appendChild(style);
    
    // Create UI elements
    this.createUIElements();
  }
  
  /**
   * Create UI elements for the experience
   */
  createUIElements() {
    // Create breath guide
    const breathGuide = document.createElement('div');
    breathGuide.className = 'breath-guide';
    breathGuide.innerHTML = `
      <div>Breathe with Earth's Resonance</div>
      <div class="breath-circle"></div>
      <div>Inhale... Exhale...</div>
    `;
    this.container.appendChild(breathGuide);
    this.breathGuideElement = breathGuide;
    this.breathCircleElement = breathGuide.querySelector('.breath-circle');
    
    // Create coherence meter
    const coherenceMeter = document.createElement('div');
    coherenceMeter.className = 'coherence-meter';
    coherenceMeter.innerHTML = `<div class="coherence-value"></div>`;
    this.container.appendChild(coherenceMeter);
    this.coherenceValueElement = coherenceMeter.querySelector('.coherence-value');
    
    // Create ZEN POINT balance indicator
    const zenPointBalance = document.createElement('div');
    zenPointBalance.className = 'zen-point-balance';
    zenPointBalance.innerHTML = `
      <div class="zen-marker"></div>
      <div class="zen-value"></div>
    `;
    this.container.appendChild(zenPointBalance);
    this.zenValueElement = zenPointBalance.querySelector('.zen-value');
    
    // Create ascension indicator (only if enabled)
    if (this.config.ascensionEnabled) {
      const ascensionIndicator = document.createElement('div');
      ascensionIndicator.className = 'ascension-indicator';
      ascensionIndicator.innerHTML = `φ⁰`;
      this.container.appendChild(ascensionIndicator);
      this.ascensionIndicatorElement = ascensionIndicator;
    }
  }
  
  /**
   * Initialize Earth Connection Visualizer
   */
  initializeEarthConnection() {
    // Check if EarthConnectionVisualizer is available
    if (typeof EarthConnectionVisualizer === 'undefined') {
      console.error('EarthConnectionVisualizer not found. Make sure to include earth-connection-visualizer.js');
      return;
    }
    
    // Create options for Earth Connection
    const earthOptions = {
      container: this.container,
      frequency: this.config.frequency,
      zenPointBalance: this.config.zenPointBalance,
      adaptiveRendering: this.config.adaptiveRendering,
      showEarthGrid: true,
      showQuantumNodes: true,
      showSacredSites: true,
      rotationSpeed: 0.1 * PHI_INV // Slow rotation for grounding
    };
    
    // Initialize Earth Connection Visualizer
    this.earthConnection = new EarthConnectionVisualizer(earthOptions);
  }
  
  /**
   * Initialize Mycelial Pattern Recognition
   */
  initializeMycelialPatterns() {
    // Check if MycelialPatternRecognition is available
    if (typeof MycelialPatternRecognition === 'undefined') {
      console.error('MycelialPatternRecognition not found. Make sure to include mycelial-pattern-recognition.js');
      return;
    }
    
    // Create options for Mycelial Pattern Recognition
    const mycelialOptions = {
      container: this.container,
      frequency: this.config.frequency,
      zenPointBalance: this.config.zenPointBalance,
      chakraEnable: this.config.chakraVisualization,
      earthSyncEnabled: true,
      adaptiveRendering: this.config.adaptiveRendering,
      autoGrow: false // We'll start it manually
    };
    
    // Initialize Mycelial Pattern Recognition
    this.mycelialPatterns = new MycelialPatternRecognition(mycelialOptions);
  }
  
  /**
   * Initialize audio system for 432 Hz resonance
   */
  initializeAudio() {
    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create oscillator for base frequency (432 Hz)
      const baseOscillator = this.audioContext.createOscillator();
      baseOscillator.type = 'sine';
      baseOscillator.frequency.value = 432; // Ground State frequency
      
      // Create gain node for volume control
      const baseGain = this.audioContext.createGain();
      baseGain.gain.value = 0; // Start silent
      
      // Connect nodes
      baseOscillator.connect(baseGain);
      baseGain.connect(this.audioContext.destination);
      
      // Start oscillator
      baseOscillator.start();
      
      // Store references
      this.oscillators.push({
        oscillator: baseOscillator,
        gain: baseGain,
        type: 'base'
      });
      
      // Create Earth resonance oscillator (7.83 Hz - Schumann resonance)
      // Since 7.83 Hz is below audible range, we'll use a modulation technique
      const earthOscillator = this.audioContext.createOscillator();
      earthOscillator.type = 'sine';
      earthOscillator.frequency.value = 7.83;
      
      const earthGain = this.audioContext.createGain();
      earthGain.gain.value = 0;
      
      // Connect Earth resonance as modulator
      earthOscillator.connect(earthGain);
      earthGain.connect(baseGain.gain);
      
      earthOscillator.start();
      
      this.oscillators.push({
        oscillator: earthOscillator,
        gain: earthGain,
        type: 'earth'
      });
      
    } catch (error) {
      console.error('Audio initialization failed:', error);
      this.config.audioEnabled = false;
    }
  }
  
  /**
   * Add event listeners for user interaction
   */
  addEventListeners() {
    // Add click listener to start audio context (browser requirement)
    this.container.addEventListener('click', () => {
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
    });
    
    // Add keyboard listeners for intention control
    document.addEventListener('keydown', (event) => {
      // Space key - toggle experience
      if (event.code === 'Space') {
        if (this.isActive) {
          this.stop();
        } else {
          this.start();
        }
      }
      
      // Arrow up/down - adjust intention strength
      if (event.code === 'ArrowUp') {
        this.setIntention(this.intentionField.strength + 0.1);
      } else if (event.code === 'ArrowDown') {
        this.setIntention(this.intentionField.strength - 0.1);
      }
    });
  }
  
  /**
   * Start the Ground State Experience
   */
  start() {
    if (this.isActive) return;
    
    console.log("Starting Ground State Experience (432 Hz | φ⁰)");
    this.isActive = true;
    
    // Start Earth Connection Visualizer
    if (this.earthConnection) {
      this.earthConnection.start();
    }
    
    // Start Mycelial Pattern Recognition
    if (this.mycelialPatterns) {
      this.mycelialPatterns.start();
    }
    
    // Start audio with fade-in
    if (this.config.audioEnabled && this.audioContext) {
      this.fadeInAudio();
    }
    
    // Start breath synchronization
    if (this.config.breathSyncEnabled) {
      this.startBreathSync();
    }
    
    // Begin grounding protocol
    this.beginGroundingProtocol();
  }
  
  /**
   * Stop the Ground State Experience
   */
  stop() {
    if (!this.isActive) return;
    
    console.log("Stopping Ground State Experience");
    this.isActive = false;
    
    // Stop Earth Connection Visualizer
    if (this.earthConnection) {
      this.earthConnection.stop();
    }
    
    // Stop Mycelial Pattern Recognition
    if (this.mycelialPatterns) {
      this.mycelialPatterns.stop();
    }
    
    // Fade out audio
    if (this.config.audioEnabled && this.audioContext) {
      this.fadeOutAudio();
    }
    
    // Stop breath synchronization
    if (this.breathAnimationId) {
      cancelAnimationFrame(this.breathAnimationId);
      this.breathAnimationId = null;
    }
  }
  
  /**
   * Begin the grounding protocol
   */
  beginGroundingProtocol() {
    console.log("Beginning Grounding Protocol");
    
    // Reset ascension progress
    this.ascensionProgress = 0;
    
    // Set ZEN POINT balance for grounding
    this.setZenPointBalance(this.config.zenPointBalance);
    
    // Activate root chakra in mycelial patterns
    if (this.mycelialPatterns) {
      this.mycelialPatterns.visualizeRootChakra(0.8);
    }
    
    // Set Earth grid prominence in visualizer
    if (this.earthConnection) {
      this.earthConnection.setGridIntensity(0.8);
    }
  }
  
  /**
   * Synchronize breath with Earth's resonance
   */
  startBreathSync() {
    // Reset breath phase
    this.breathCycle.phase = 0;
    
    // Start breath animation
    this.animateBreath();
  }
  
  /**
   * Animate breath guide
   */
  animateBreath() {
    if (!this.isActive) return;
    
    // Update breath phase
    const now = performance.now() / 1000; // seconds
    this.breathCycle.phase = (now % this.breathCycle.duration) / this.breathCycle.duration;
    
    // Calculate inhale/exhale phase
    const inhaleDuration = this.breathCycle.duration * this.breathCycle.inhaleRatio;
    const exhaleDuration = this.breathCycle.duration - inhaleDuration;
    
    let breathText, scale;
    
    if (this.breathCycle.phase < this.breathCycle.inhaleRatio) {
      // Inhale phase
      const inhaleProgress = this.breathCycle.phase / this.breathCycle.inhaleRatio;
      scale = 0.8 + inhaleProgress * 0.8; // 0.8 to 1.6
      breathText = "Inhale...";
    } else {
      // Exhale phase
      const exhaleProgress = (this.breathCycle.phase - this.breathCycle.inhaleRatio) / 
                             (1 - this.breathCycle.inhaleRatio);
      scale = 1.6 - exhaleProgress * 0.8; // 1.6 to 0.8
      breathText = "Exhale...";
    }
    
    // Update breath guide
    if (this.breathCircleElement) {
      this.breathCircleElement.style.transform = `scale(${scale})`;
    }
    
    // Update text
    const textElement = this.breathGuideElement.querySelector('div:last-child');
    if (textElement) {
      textElement.textContent = breathText;
    }
    
    // Apply breath effect to visualizations
    this.applyBreathEffect(this.breathCycle.phase, scale);
    
    // Continue animation
    this.breathAnimationId = requestAnimationFrame(() => this.animateBreath());
  }
  
  /**
   * Apply breath effect to visualizations
   * @param {number} phase - Breath cycle phase (0-1)
   * @param {number} scale - Breath scale factor
   */
  applyBreathEffect(phase, scale) {
    // Influence Earth grid pulsation
    if (this.earthConnection) {
      this.earthConnection.setPulsation(scale * 0.5);
    }
    
    // Influence mycelial growth rate
    if (this.mycelialPatterns) {
      // Growth rate fluctuates with breath
      const growthFactor = 0.8 + 0.4 * (scale - 0.8) / 0.8; // 0.8 to 1.2
      this.mycelialPatterns.setGrowthRate(this.mycelialPatterns.config.growthRate * growthFactor);
    }
    
    // Modify audio amplitude with breath
    if (this.config.audioEnabled && this.oscillators.length > 0) {
      const baseGain = this.oscillators.find(osc => osc.type === 'base')?.gain;
      if (baseGain) {
        // Volume fluctuates slightly with breath
        const volume = 0.15 * (0.8 + 0.4 * (scale - 0.8) / 0.8); // 0.12 to 0.18
        baseGain.gain.setTargetAtTime(volume, this.audioContext.currentTime, 0.1);
      }
    }
  }
  
  /**
   * Activate the root chakra
   * @param {number} intensity - Activation intensity (0-1)
   */
  activateRootChakra(intensity = 1.0) {
    if (!this.mycelialPatterns) return;
    
    // Visualize root chakra in mycelial patterns
    this.mycelialPatterns.visualizeRootChakra(intensity);
    
    // Increase Earth connection
    if (this.earthConnection) {
      this.earthConnection.setGridIntensity(intensity);
    }
  }
  
  /**
   * Prepare for ascension to the next frequency state
   */
  prepareForAscension() {
    if (!this.config.ascensionEnabled) return;
    
    console.log("Preparing for ascension to Creation State (528 Hz | φ¹)");
    
    // Gradually shift ZEN POINT balance toward 50/50
    const currentBalance = this.zenPointBalance;
    const targetBalance = { quantum: 0.5, human: 0.5 }; // Creation State balance
    
    // Calculate ascension progress
    if (this.coherenceLevel > 0.8) {
      // Increase ascension progress when coherence is high
      this.ascensionProgress += 0.01;
      
      // Interpolate ZEN POINT balance
      const newBalance = {
        quantum: currentBalance.quantum + (targetBalance.quantum - currentBalance.quantum) * this.ascensionProgress,
        human: currentBalance.human + (targetBalance.human - currentBalance.human) * this.ascensionProgress
      };
      
      this.setZenPointBalance(newBalance);
      
      // Visual indicator for ascension progress
      if (this.ascensionIndicatorElement) {
        this.ascensionIndicatorElement.style.boxShadow = `0 0 ${10 + this.ascensionProgress * 20}px rgba(255,255,255,${0.2 + this.ascensionProgress * 0.5})`;
      }
      
      // When progress reaches 1.0, ready for ascension
      if (this.ascensionProgress >= 1.0) {
        this.triggerAscension();
      }
    }
  }
  
  /**
   * Trigger ascension to the next frequency state
   */
  triggerAscension() {
    console.log("Ascension ready - transition to Creation State (528 Hz | φ¹)");
    
    // Event for external systems to catch
    const ascensionEvent = new CustomEvent('ascension-ready', { 
      detail: {
        fromFrequency: this.config.frequency,
        toFrequency: 528, // Creation State
        fromState: 'ground',
        toState: 'creation'
      }
    });
    
    document.dispatchEvent(ascensionEvent);
    
    // Visual indication
    if (this.ascensionIndicatorElement) {
      this.ascensionIndicatorElement.textContent = "φ¹";
      this.ascensionIndicatorElement.style.background = "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(200,200,100,0.5) 100%)";
    }
  }
  
  /**
   * Set user intention impact
   * @param {number} strength - Intention strength (0-1)
   */
  setIntention(strength) {
    // Clamp to valid range
    strength = Math.max(0, Math.min(1, strength));
    
    this.intentionField.strength = strength;
    
    // Apply to coherence
    this.coherenceLevel = 0.3 + strength * 0.7;
    this.updateCoherenceDisplay();
    
    // Apply to pattern growth
    if (this.mycelialPatterns) {
      this.mycelialPatterns.setIntention(strength);
    }
    
    // Apply to Earth connection
    if (this.earthConnection) {
      this.earthConnection.setIntensity(0.5 + strength * 0.5);
    }
    
    // Check for ascension preparation
    if (strength > 0.8 && this.config.ascensionEnabled) {
      this.prepareForAscension();
    }
  }
  
  /**
   * Update coherence level display
   */
  updateCoherenceDisplay() {
    if (this.coherenceValueElement) {
      this.coherenceValueElement.style.width = `${this.coherenceLevel * 100}%`;
    }
  }
  
  /**
   * Set ZEN POINT balance
   * @param {Object} balance - ZEN POINT balance { quantum, human }
   */
  setZenPointBalance(balance) {
    this.zenPointBalance = balance;
    
    // Update ZEN POINT display
    if (this.zenValueElement) {
      this.zenValueElement.style.width = `${balance.human * 100}%`;
    }
    
    // Apply to Earth connection
    if (this.earthConnection) {
      this.earthConnection.setZenPointBalance(balance);
    }
    
    // Apply to mycelial patterns
    if (this.mycelialPatterns) {
      this.mycelialPatterns.zenPointBalance = balance;
    }
  }
  
  /**
   * Fade in audio gradually
   */
  fadeInAudio() {
    if (!this.audioContext || !this.oscillators.length) return;
    
    // Find base oscillator gain
    const baseOsc = this.oscillators.find(osc => osc.type === 'base');
    const earthOsc = this.oscillators.find(osc => osc.type === 'earth');
    
    if (baseOsc && baseOsc.gain) {
      // Fade in over 2 seconds
      baseOsc.gain.gain.setValueAtTime(0, this.audioContext.currentTime);
      baseOsc.gain.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 2);
    }
    
    if (earthOsc && earthOsc.gain) {
      // Fade in Earth resonance modulation
      earthOsc.gain.gain.setValueAtTime(0, this.audioContext.currentTime);
      earthOsc.gain.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 3);
    }
  }
  
  /**
   * Fade out audio gradually
   */
  fadeOutAudio() {
    if (!this.audioContext || !this.oscillators.length) return;
    
    // Fade out all oscillators
    for (const osc of this.oscillators) {
      if (osc.gain) {
        osc.gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1);
      }
    }
  }
}

// Export for modular usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GroundStateExperience;
} else {
  // Browser global
  window.GroundStateExperience = GroundStateExperience;
}
