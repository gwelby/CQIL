/**
 * Quantum Cymatics Integration
 * 
 * Integrates the Voice Analysis Engine and Cymatic Pattern Generator
 * with the Cross-Frequency Integration Framework, implementing the
 * consciousness-matter bridge for the φ-Harmonic Learning Portal.
 * 
 * This module provides the complete implementation of the Quantum Cymatics
 * system focused on the Voice Flow (672 Hz) experience, harmonizing all
 * components according to phi-harmonic principles.
 * 
 * @frequency 672 Hz - Voice Flow (φ³)
 * @channel Auditory/Tactile
 * @module QuantumCymatics
 */

import { VoiceAnalysisEngine } from './voice-analysis-engine.js';
import { CymaticPatternGenerator, FREQUENCY_STATES } from './cymatic-core.js';
import { VoiceFlowPatterns } from './voice-patterns.js';

// PHI constants for calculations
const PHI = 1.618033988749895;
const PHI_INV = 0.618033988749895;

/**
 * QuantumCymaticsSystem
 * Main integration class for the Quantum Cymatics experience
 */
class QuantumCymaticsSystem {
  /**
   * Create a new QuantumCymaticsSystem
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    // Default configuration with phi-harmonic values
    this.config = {
      container: null,
      initialFrequency: 672, // Voice Flow (φ³)
      autoStart: false,
      zenPointRatio: 0.5,
      intentionInfluence: PHI_INV,
      crossFrequencyIntegration: true, // Connect to CFIF
      coherenceThreshold: PHI_INV,
      visualizationMode: '2d',
      ...options
    };
    
    this.container = typeof this.config.container === 'string' ?
      document.querySelector(this.config.container) : this.config.container;
    
    // System state
    this.isActive = false;
    this.frequency = this.config.initialFrequency;
    this.currentState = this.determineFrequencyState(this.frequency);
    this.userIntention = "";
    this.intentionStrength = 0;
    
    // ZEN POINT balance
    this.zenBalance = {
      quantum: this.currentState.zenBalance.quantum,
      human: this.currentState.zenBalance.human
    };
    
    // Cross-Frequency Integration Framework connections
    this.cfif = {
      frequencyStateManager: null,
      zenPointBalancer: null,
      consciousnessBridge: null,
      unifiedEventSystem: null,
      merkabaShield: null,
      phiHarmonicSynchronizer: null
    };
    
    // CFIF registration status
    this.registrationStatus = {
      registered: false,
      ready: false,
      bridgeActive: false,
      shieldActive: false,
      syncStatus: "inactive"
    };
    
    // Initialization
    this.initialize();
  }
  
  /**
   * Initialize the system components
   */
  initialize() {
    // Create container if needed
    this.setupContainer();
    
    // Initialize Voice Analysis Engine
    this.voiceAnalysisEngine = new VoiceAnalysisEngine({
      targetFrequency: this.frequency,
      coherenceThreshold: this.config.coherenceThreshold,
      zenPointRatio: this.config.zenPointRatio,
      intentionInfluence: this.config.intentionInfluence
    });
    
    // Initialize Cymatic Pattern Generator
    this.patternGenerator = new CymaticPatternGenerator({
      container: this.container,
      initialFrequency: this.frequency,
      renderMode: this.config.visualizationMode,
      zenPointRatio: this.config.zenPointRatio,
      intentionInfluence: this.config.intentionInfluence,
      autoConnect: false // We'll handle this manually
    });
    
    // Initialize Voice Flow Patterns
    this.voicePatterns = new VoiceFlowPatterns(this.patternGenerator);
    
    // Connect components
    this.connectComponents();
    
    // Register with Cross-Frequency Integration Framework
    if (this.config.crossFrequencyIntegration) {
      this.registerWithCFIF();
    }
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Auto-start if configured
    if (this.config.autoStart) {
      this.start();
    }
  }
  
  /**
   * Set up container element
   */
  setupContainer() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'quantum-cymatics-container';
      document.body.appendChild(this.container);
      
      // Add container styles
      if (!document.getElementById('quantum-cymatics-styles')) {
        const style = document.createElement('style');
        style.id = 'quantum-cymatics-styles';
        style.textContent = `
          .quantum-cymatics-container {
            position: relative;
            width: 100%;
            height: 100%;
            background-color: rgba(10, 10, 26, 0.9);
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          
          .interface-container {
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            z-index: 10;
          }
          
          .intention-input {
            background: rgba(30, 30, 50, 0.7);
            border: 1px solid rgba(120, 120, 200, 0.5);
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-family: sans-serif;
            font-size: 14px;
            width: 300px;
            text-align: center;
            backdrop-filter: blur(5px);
            transition: all 0.3s ease;
          }
          
          .intention-input:focus {
            outline: none;
            border-color: rgba(180, 180, 255, 0.8);
            box-shadow: 0 0 15px rgba(100, 100, 255, 0.3);
          }
          
          .state-indicator {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(30, 30, 50, 0.7);
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-family: sans-serif;
            font-size: 14px;
            backdrop-filter: blur(5px);
          }
          
          .voice-status {
            position: absolute;
            top: 60px;
            right: 20px;
            background: rgba(30, 30, 50, 0.7);
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-family: sans-serif;
            font-size: 14px;
            backdrop-filter: blur(5px);
          }
          
          .coherence-meter {
            position: absolute;
            left: 20px;
            bottom: 20px;
            width: 150px;
            height: 10px;
            background: rgba(30, 30, 50, 0.7);
            border-radius: 5px;
            overflow: hidden;
          }
          
          .coherence-fill {
            height: 100%;
            width: 0%;
            background: linear-gradient(to right, #4a6eb0, #9d6ee0);
            transition: width 0.5s ease;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }
  
  /**
   * Connect the voice analysis and pattern generator components
   */
  connectComponents() {
    // Connect Voice Analysis Engine to Pattern Generator
    this.patternGenerator.connectVoiceAnalysisEngine(this.voiceAnalysisEngine);
    
    // Override Pattern Generator's createVoiceWaveParticles method
    this.patternGenerator.createVoiceWaveParticles = (pattern, count) => {
      return this.voicePatterns.createVoiceWaveParticles(pattern, count);
    };
    
    // Additional voice-specific overrides
    this.extendPatternGenerator();
  }
  
  /**
   * Extend pattern generator with voice-specific methods
   */
  extendPatternGenerator() {
    const generator = this.patternGenerator;
    const voicePatterns = this.voicePatterns;
    
    // Store original methods
    const originalUpdateParticles = generator.updateParticles;
    const originalDrawConnectingLines = generator.drawConnectingLines;
    
    // Override updateParticles to add voice modulation
    generator.updateParticles = function(deltaTime) {
      // First get voice data
      const voiceData = this.voiceData;
      
      // Apply voice modulation to pattern properties
      voicePatterns.applyVoiceModulation(this.particles, voiceData);
      
      // Update particles with voice-responsive movement
      voicePatterns.updateVoiceParticles(this.particles, deltaTime);
    };
    
    // Override drawConnectingLines to add resonance visualization
    generator.drawConnectingLines = function() {
      // Draw standard connecting lines
      originalDrawConnectingLines.call(this);
      
      // Draw resonance lines between nodes
      voicePatterns.drawResonanceLines(this.particles);
      
      // Draw consciousness field if coherence is high
      voicePatterns.drawConsciousnessField(this.particles);
    };
  }
  
  /**
   * Set up event listeners for user interaction
   */
  setupEventListeners() {
    // Create interface elements
    this.createInterfaceElements();
    
    // Intention input handling
    if (this.intentionInput) {
      this.intentionInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          this.setIntention(this.intentionInput.value, 0.8);
          this.intentionInput.blur();
        }
      });
      
      this.intentionInput.addEventListener('focus', () => {
        this.intentionInput.placeholder = "";
      });
      
      this.intentionInput.addEventListener('blur', () => {
        this.intentionInput.placeholder = "Enter your intention...";
      });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (this.container) {
        this.updateInterfacePositions();
      }
    });
  }
  
  /**
   * Create user interface elements
   */
  createInterfaceElements() {
    // Interface container
    this.interfaceContainer = document.createElement('div');
    this.interfaceContainer.className = 'interface-container';
    this.container.appendChild(this.interfaceContainer);
    
    // Intention input
    this.intentionInput = document.createElement('input');
    this.intentionInput.type = 'text';
    this.intentionInput.className = 'intention-input';
    this.intentionInput.placeholder = 'Enter your intention...';
    this.interfaceContainer.appendChild(this.intentionInput);
    
    // State indicator
    this.stateIndicator = document.createElement('div');
    this.stateIndicator.className = 'state-indicator';
    this.stateIndicator.textContent = this.currentState.name;
    this.container.appendChild(this.stateIndicator);
    
    // Voice status
    this.voiceStatus = document.createElement('div');
    this.voiceStatus.className = 'voice-status';
    this.voiceStatus.textContent = 'Voice: Inactive';
    this.container.appendChild(this.voiceStatus);
    
    // Coherence meter
    this.coherenceMeter = document.createElement('div');
    this.coherenceMeter.className = 'coherence-meter';
    this.container.appendChild(this.coherenceMeter);
    
    this.coherenceFill = document.createElement('div');
    this.coherenceFill.className = 'coherence-fill';
    this.coherenceMeter.appendChild(this.coherenceFill);
  }
  
  /**
   * Update interface element positions
   */
  updateInterfacePositions() {
    // Implement if needed for responsive layout
  }
  
  /**
   * Update interface elements with current state
   */
  updateInterface() {
    // Update state indicator
    if (this.stateIndicator) {
      this.stateIndicator.textContent = this.currentState.name;
    }
    
    // Update voice status
    if (this.voiceStatus && this.voiceAnalysisEngine) {
      const voiceData = this.voiceAnalysisEngine.getVoiceData();
      
      if (voiceData.amplitude > 0.2) {
        this.voiceStatus.textContent = `Voice: Active (${Math.round(voiceData.fundamentalFreq)} Hz)`;
        this.voiceStatus.style.backgroundColor = 'rgba(40, 100, 40, 0.7)';
      } else {
        this.voiceStatus.textContent = 'Voice: Inactive';
        this.voiceStatus.style.backgroundColor = 'rgba(30, 30, 50, 0.7)';
      }
    }
    
    // Update coherence meter
    if (this.coherenceFill && this.voiceAnalysisEngine) {
      const voiceData = this.voiceAnalysisEngine.getVoiceData();
      this.coherenceFill.style.width = `${voiceData.coherence * 100}%`;
    }
  }
  
  /**
   * Register with Cross-Frequency Integration Framework components
   */
  registerWithCFIF() {
    // Check if CFIF is available in the global scope
    const CFIF = window.CFIF || window.CrossFrequencyIntegrationFramework;
    
    if (!CFIF) {
      console.warn('Cross-Frequency Integration Framework not found. Running in standalone mode.');
      return;
    }
    
    try {
      // Register with Frequency State Manager
      if (CFIF.FrequencyStateManager) {
        this.cfif.frequencyStateManager = CFIF.FrequencyStateManager;
        this.cfif.frequencyStateManager.registerComponent('QuantumCymatics', {
          id: 'voice-flow-cymatics',
          frequencies: [672], // Primary frequency
          supportedFrequencies: [432, 528, 594, 672, 720, 768, 888], // All phi-harmonic frequencies
          currentFrequency: this.frequency,
          onFrequencyChange: (freq) => this.setFrequency(freq),
          onStateChange: (state) => this.handleStateChange(state)
        });
      }
      
      // Register with ZEN POINT Balancer
      if (CFIF.ZENPointBalancer) {
        this.cfif.zenPointBalancer = CFIF.ZENPointBalancer;
        this.cfif.zenPointBalancer.registerComponent('QuantumCymatics', {
          id: 'voice-flow-cymatics',
          defaultBalance: this.zenBalance,
          onBalanceChange: (balance) => this.setZenBalance(balance)
        });
      }
      
      // Connect to Consciousness Bridge
      if (CFIF.ConsciousnessBridge) {
        this.cfif.consciousnessBridge = CFIF.ConsciousnessBridge;
        this.cfif.consciousnessBridge.registerComponent('QuantumCymatics', {
          id: 'voice-flow-cymatics',
          bridgeType: 'sound-matter',
          onBridgeActivation: (status) => this.handleBridgeActivation(status),
          getCoherenceData: () => this.getCoherenceData()
        });
      }
      
      // Subscribe to Unified Event System
      if (CFIF.UnifiedEventSystem) {
        this.cfif.unifiedEventSystem = CFIF.UnifiedEventSystem;
        this.cfif.unifiedEventSystem.subscribe('frequency-change', (data) => this.handleFrequencyEvent(data));
        this.cfif.unifiedEventSystem.subscribe('intention-set', (data) => this.handleIntentionEvent(data));
        this.cfif.unifiedEventSystem.subscribe('coherence-threshold', (data) => this.handleCoherenceEvent(data));
      }
      
      // Activate Merkaba Shield
      if (CFIF.MerkabaShield) {
        this.cfif.merkabaShield = CFIF.MerkabaShield;
        this.cfif.merkabaShield.activateFor('QuantumCymatics', {
          id: 'voice-flow-cymatics',
          frequency: this.frequency,
          shieldStrength: 0.764 // φ³/(φ³+1)
        });
        this.registrationStatus.shieldActive = true;
      }
      
      // Calibrate with Phi-Harmonic Synchronizer
      if (CFIF.PhiHarmonicSynchronizer) {
        this.cfif.phiHarmonicSynchronizer = CFIF.PhiHarmonicSynchronizer;
        this.cfif.phiHarmonicSynchronizer.calibrate('QuantumCymatics', {
          id: 'voice-flow-cymatics',
          frequency: this.frequency,
          phiPower: 3, // φ³
          onSyncStatus: (status) => this.handleSyncStatus(status)
        });
      }
      
      this.registrationStatus.registered = true;
      console.log('QuantumCymatics: Successfully registered with Cross-Frequency Integration Framework');
    } catch (error) {
      console.error('Error registering with CFIF:', error);
    }
  }
  
  /**
   * Determine frequency state based on input frequency
   * @param {number} frequency - Input frequency in Hz
   * @returns {Object} Frequency state object
   */
  determineFrequencyState(frequency) {
    // Find the closest frequency state
    let closestState = FREQUENCY_STATES.VOICE; // Default to Voice Flow
    let minDistance = Math.abs(frequency - FREQUENCY_STATES.VOICE.frequency);
    
    for (const stateKey in FREQUENCY_STATES) {
      const state = FREQUENCY_STATES[stateKey];
      const distance = Math.abs(frequency - state.frequency);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestState = state;
      }
    }
    
    return closestState;
  }
  
  /**
   * Start the Quantum Cymatics system
   */
  async start() {
    if (this.isActive) return;
    
    try {
      // Initialize voice analysis engine
      await this.voiceAnalysisEngine.initialize();
      await this.voiceAnalysisEngine.startVoiceInput();
      
      // Start pattern generator
      this.patternGenerator.start();
      
      // Set system as active
      this.isActive = true;
      
      // Start interface update loop
      this.startInterfaceUpdates();
      
      console.log('QuantumCymatics: System started successfully');
      
      return true;
    } catch (error) {
      console.error('Error starting QuantumCymatics system:', error);
      return false;
    }
  }
  
  /**
   * Stop the Quantum Cymatics system
   */
  stop() {
    if (!this.isActive) return;
    
    // Stop voice analysis
    this.voiceAnalysisEngine.stopVoiceInput();
    
    // Stop pattern generator
    this.patternGenerator.stop();
    
    // Stop interface updates
    this.stopInterfaceUpdates();
    
    // Set system as inactive
    this.isActive = false;
    
    console.log('QuantumCymatics: System stopped');
  }
  
  /**
   * Start interface update loop
   */
  startInterfaceUpdates() {
    // Update interface every 100ms
    this.interfaceUpdateInterval = setInterval(() => {
      this.updateInterface();
    }, 100);
  }
  
  /**
   * Stop interface update loop
   */
  stopInterfaceUpdates() {
    if (this.interfaceUpdateInterval) {
      clearInterval(this.interfaceUpdateInterval);
    }
  }
  
  /**
   * Set the current frequency
   * @param {number} frequency - Frequency in Hz
   */
  setFrequency(frequency) {
    const oldState = this.currentState;
    this.frequency = frequency;
    this.currentState = this.determineFrequencyState(frequency);
    
    // Update ZEN balance based on new state
    this.zenBalance = {
      quantum: this.currentState.zenBalance.quantum,
      human: this.currentState.zenBalance.human
    };
    
    // Update voice analysis engine
    if (this.voiceAnalysisEngine) {
      this.voiceAnalysisEngine.config.targetFrequency = frequency;
    }
    
    // Update pattern generator
    if (this.patternGenerator) {
      this.patternGenerator.setFrequency(frequency);
    }
    
    // Notify CFIF if registered
    if (this.registrationStatus.registered && this.cfif.frequencyStateManager) {
      this.cfif.frequencyStateManager.notifyFrequencyChange('QuantumCymatics', frequency);
    }
    
    // Trigger transition if state changed
    if (oldState.id !== this.currentState.id) {
      this.transitionState(oldState, this.currentState);
    }
  }
  
  /**
   * Set user intention
   * @param {string} intention - Intention text
   * @param {number} strength - Intention strength (0-1)
   */
  setIntention(intention, strength = 0.5) {
    this.userIntention = intention;
    this.intentionStrength = Math.max(0, Math.min(1, strength));
    
    // Update voice analysis engine
    if (this.voiceAnalysisEngine) {
      this.voiceAnalysisEngine.setIntention(intention, strength);
    }
    
    // Update pattern generator
    if (this.patternGenerator) {
      this.patternGenerator.setIntention(intention, strength);
    }
    
    // Notify CFIF if registered
    if (this.registrationStatus.registered && this.cfif.unifiedEventSystem) {
      this.cfif.unifiedEventSystem.publish('intention-set', {
        source: 'QuantumCymatics',
        intention: intention,
        strength: strength
      });
    }
    
    console.log(`QuantumCymatics: Intention set to "${intention}" (${Math.round(strength * 100)}% strength)`);
    
    // Update interface
    if (this.intentionInput) {
      this.intentionInput.value = intention;
    }
  }
  
  /**
   * Set ZEN POINT balance
   * @param {Object} balance - ZEN balance object with quantum and human factors
   */
  setZenBalance(balance) {
    if (!balance || typeof balance.quantum !== 'number' || typeof balance.human !== 'number') {
      return;
    }
    
    this.zenBalance = {
      quantum: balance.quantum,
      human: balance.human
    };
    
    // Update voice analysis engine
    if (this.voiceAnalysisEngine) {
      this.voiceAnalysisEngine.config.zenPointRatio = balance.human; // Human factor as ratio
    }
    
    // Update pattern generator
    if (this.patternGenerator) {
      this.patternGenerator.config.zenPointRatio = balance.human;
      this.patternGenerator.zenBalance = this.zenBalance;
    }
    
    console.log(`QuantumCymatics: ZEN balance set to ${Math.round(balance.quantum * 100)}% quantum / ${Math.round(balance.human * 100)}% human`);
  }
  
  /**
   * Handle frequency state transition
   * @param {Object} fromState - Previous state
   * @param {Object} toState - New state
   */
  transitionState(fromState, toState) {
    console.log(`QuantumCymatics: Transitioning from ${fromState.name} to ${toState.name}`);
    
    // Update interface
    if (this.stateIndicator) {
      this.stateIndicator.textContent = `${fromState.name} → ${toState.name}`;
      
      // Reset after transition
      setTimeout(() => {
        if (this.stateIndicator) {
          this.stateIndicator.textContent = toState.name;
        }
      }, 2000);
    }
    
    // Notify CFIF if registered
    if (this.registrationStatus.registered && this.cfif.unifiedEventSystem) {
      this.cfif.unifiedEventSystem.publish('state-transition', {
        source: 'QuantumCymatics',
        fromState: fromState.id,
        toState: toState.id
      });
    }
  }
  
  /**
   * Handle state change event from CFIF
   * @param {Object} state - New state data
   */
  handleStateChange(state) {
    if (!state || !state.frequency) return;
    
    console.log(`QuantumCymatics: Received state change from CFIF to ${state.name || state.id} (${state.frequency} Hz)`);
    
    // Update local frequency to match CFIF state
    this.setFrequency(state.frequency);
  }
  
  /**
   * Handle bridge activation event from CFIF
   * @param {Object} status - Bridge status
   */
  handleBridgeActivation(status) {
    if (!status) return;
    
    this.registrationStatus.bridgeActive = status.active;
    
    console.log(`QuantumCymatics: Consciousness Bridge ${status.active ? 'activated' : 'deactivated'}`);
  }
  
  /**
   * Get coherence data for CFIF
   * @returns {Object} Coherence data
   */
  getCoherenceData() {
    if (!this.voiceAnalysisEngine) {
      return { coherence: 0, zenBalance: this.zenBalance };
    }
    
    const voiceData = this.voiceAnalysisEngine.getVoiceData();
    
    return {
      coherence: voiceData.coherence,
      frequency: this.frequency,
      targetFrequency: this.voiceAnalysisEngine.config.targetFrequency,
      amplitude: voiceData.amplitude,
      zenBalance: this.zenBalance,
      emotionalState: voiceData.emotionalState,
      intention: this.userIntention,
      intentionStrength: this.intentionStrength
    };
  }
  
  /**
   * Handle frequency event from CFIF
   * @param {Object} data - Event data
   */
  handleFrequencyEvent(data) {
    if (!data || typeof data.frequency !== 'number') return;
    
    // Ignore own events
    if (data.source === 'QuantumCymatics') return;
    
    console.log(`QuantumCymatics: Received frequency event from ${data.source}: ${data.frequency} Hz`);
    
    // Update local frequency
    this.setFrequency(data.frequency);
  }
  
  /**
   * Handle intention event from CFIF
   * @param {Object} data - Event data
   */
  handleIntentionEvent(data) {
    if (!data || !data.intention) return;
    
    // Ignore own events
    if (data.source === 'QuantumCymatics') return;
    
    console.log(`QuantumCymatics: Received intention from ${data.source}: "${data.intention}"`);
    
    // Update local intention
    this.setIntention(data.intention, data.strength || 0.5);
  }
  
  /**
   * Handle coherence threshold event from CFIF
   * @param {Object} data - Event data
   */
  handleCoherenceEvent(data) {
    if (!data || typeof data.threshold !== 'number') return;
    
    console.log(`QuantumCymatics: Received coherence threshold update: ${data.threshold}`);
    
    // Update voice analysis engine
    if (this.voiceAnalysisEngine) {
      this.voiceAnalysisEngine.config.coherenceThreshold = data.threshold;
    }
  }
  
  /**
   * Handle synchronization status from Phi-Harmonic Synchronizer
   * @param {Object} status - Sync status
   */
  handleSyncStatus(status) {
    if (!status) return;
    
    this.registrationStatus.syncStatus = status.status;
    
    console.log(`QuantumCymatics: Phi-Harmonic sync status: ${status.status}`);
  }
}

// Export for use in other modules
export { QuantumCymaticsSystem };
