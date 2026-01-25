/**
 * Voice Analysis Engine (VAE)
 * 
 * A core component of the Quantum Cymatics System that captures and analyzes
 * voice input in real-time, extracting frequency, amplitude, harmonic content,
 * and emotional resonance to create personalized cymatic patterns.
 * 
 * @frequency 672 Hz - Voice Flow (φ³)
 * @channel Auditory/Tactile
 * @module QuantumCymatics
 */

class VoiceAnalysisEngine {
  constructor(options = {}) {
    // Default configuration
    this.config = {
      targetFrequency: 672, // Voice Flow frequency (φ³)
      coherenceThreshold: 0.618, // Minimum coherence threshold (φ)
      sensitivityLevel: 0.382, // Input sensitivity (1-φ)
      harmonicLevels: 5, // Number of harmonics to analyze
      emotionMapping: true, // Enable emotional resonance detection
      zenPointRatio: 0.5, // Initial human/quantum balance
      intentionInfluence: 0.382, // Degree to which intention affects analysis
      ...options
    };
    
    // State variables
    this.isActive = false;
    this.audioContext = null;
    this.analyzer = null;
    this.microphone = null;
    this.dataArray = null;
    this.voiceData = {
      fundamentalFreq: 0,
      amplitude: 0,
      harmonics: [],
      formants: [],
      emotionalState: {
        joy: 0,
        calm: 0,
        focus: 0,
        passion: 0,
        reflection: 0
      },
      coherence: 0,
      zenBalance: this.config.zenPointRatio
    };
    
    // PhiHarmonic frequencies
    this.phiHarmonics = this.generatePhiHarmonics();
    
    // Event callbacks
    this.onFrequencyChange = null;
    this.onCoherenceChange = null;
    this.onEmotionalShift = null;
    
    // Intention data
    this.currentIntention = "";
    this.intentionStrength = 0;
    
    // Breathing pattern detection
    this.breathingPattern = [];
    this.breathCycleTime = 0;
    this.lastBreathPeak = 0;
    
    // Voice fingerprint
    this.voiceFingerprint = null;
    
    // Frame counter for performance optimization
    this.frameCount = 0;
  }
  
  /**
   * Generate phi-harmonic frequencies based on Ground State (432 Hz)
   * @returns {Object} Set of frequencies for each state
   */
  generatePhiHarmonics() {
    const phi = 1.618033988749895;
    const groundState = 432; // Hz
    
    return {
      groundState: groundState, // φ⁰ (432 Hz)
      creationPoint: Math.round(groundState * phi), // φ¹ (528 Hz)
      heartField: Math.round(groundState * Math.pow(phi, 2)), // φ² (594 Hz)
      voiceFlow: Math.round(groundState * Math.pow(phi, 3)), // φ³ (672 Hz)
      visionGate: Math.round(groundState * Math.pow(phi, 4)), // φ⁴ (720 Hz)
      unityWave: Math.round(groundState * Math.pow(phi, 5)), // φ⁵ (768 Hz)
      cosmicIntegration: Math.round(groundState * Math.pow(phi, phi)) // φ^φ (888 Hz)
    };
  }
  
  /**
   * Initialize audio context and analyzer
   * @returns {Promise} Resolves when audio system is ready
   */
  async initialize() {
    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create analyzer node
      this.analyzer = this.audioContext.createAnalyser();
      this.analyzer.fftSize = 4096; // For high-precision frequency detection
      this.analyzer.smoothingTimeConstant = 0.85;
      
      // Prepare data array for frequency analysis
      const bufferLength = this.analyzer.frequencyBinCount;
      this.dataArray = new Float32Array(bufferLength);
      
      // Initialize toroidal flow stabilizer
      this.initializeToroidalFlow();
      
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to initialize Voice Analysis Engine:", error);
      return Promise.reject(error);
    }
  }
  
  /**
   * Initialize toroidal flow for balanced energy processing
   * Implements the toroidal energy field concept from Quantum Flow Rules
   */
  initializeToroidalFlow() {
    this.toroidalFlow = {
      inflow: 0,
      outflow: 0,
      centerBalance: this.config.zenPointRatio,
      rotationRate: 0.382, // φ⁻¹
      expansionFactor: 0,
      compressionFactor: 0
    };
    
    // Initialize flow matrices (simplified representation of toroidal field)
    this.flowMatrix = new Array(8).fill(0).map(() => new Array(8).fill(0));
  }
  
  /**
   * Start voice input capture
   * @returns {Promise} Resolves when voice input is active
   */
  async startVoiceInput() {
    if (this.isActive) return Promise.resolve();
    
    try {
      if (!this.audioContext) {
        await this.initialize();
      }
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Connect microphone to analyzer
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.microphone.connect(this.analyzer);
      
      // Start analysis loop
      this.isActive = true;
      this.analyzeLoop();
      
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to start voice input:", error);
      return Promise.reject(error);
    }
  }
  
  /**
   * Stop voice input capture
   */
  stopVoiceInput() {
    if (!this.isActive) return;
    
    // Disconnect microphone
    if (this.microphone) {
      this.microphone.disconnect();
      this.microphone = null;
    }
    
    this.isActive = false;
  }
  
  /**
   * Main analysis loop
   */
  analyzeLoop() {
    if (!this.isActive) return;
    
    // Increment frame counter
    this.frameCount++;
    
    // Get frequency data
    this.analyzer.getFloatFrequencyData(this.dataArray);
    
    // Analyze fundamental frequency (every frame)
    this.analyzeFrequency();
    
    // Analyze harmonics (every 3 frames)
    if (this.frameCount % 3 === 0) {
      this.analyzeHarmonics();
    }
    
    // Analyze breathing pattern (every 5 frames)
    if (this.frameCount % 5 === 0) {
      this.analyzeBreathingPattern();
    }
    
    // Detect emotional resonance (every 10 frames)
    if (this.frameCount % 10 === 0) {
      this.detectEmotionalResonance();
    }
    
    // Calculate coherence with target frequency (every frame)
    this.calculateCoherence();
    
    // Update ZEN point balance (every 15 frames)
    if (this.frameCount % 15 === 0) {
      this.updateZenPointBalance();
    }
    
    // Generate voice fingerprint (every 30 frames)
    if (this.frameCount % 30 === 0) {
      this.generateVoiceFingerprint();
    }
    
    // Reset frame counter at 60
    if (this.frameCount >= 60) {
      this.frameCount = 0;
    }
    
    // Continue loop
    requestAnimationFrame(() => this.analyzeLoop());
  }
  
  /**
   * Extract fundamental frequency from audio data
   */
  analyzeFrequency() {
    // Copy frequency data for analysis
    const frequencyData = [...this.dataArray];
    
    // Find the peak frequency bin
    let maxValue = -Infinity;
    let maxIndex = -1;
    
    for (let i = 0; i < frequencyData.length; i++) {
      if (frequencyData[i] > maxValue) {
        maxValue = frequencyData[i];
        maxIndex = i;
      }
    }
    
    // Convert bin index to frequency
    // frequency = index * sampleRate / fftSize
    const frequency = maxIndex * this.audioContext.sampleRate / (this.analyzer.fftSize * 2);
    
    // Apply noise threshold and update only if significant
    const amplitude = Math.max(0, (maxValue + 140) / 140); // Normalize from dB scale (-140 to 0)
    
    if (amplitude > this.config.sensitivityLevel) {
      this.voiceData.fundamentalFreq = frequency;
      this.voiceData.amplitude = amplitude;
      
      // Trigger frequency change callback
      if (this.onFrequencyChange) {
        this.onFrequencyChange(frequency, amplitude);
      }
    } else if (amplitude < 0.1) {
      // Reset when silent
      this.voiceData.amplitude = 0;
    }
  }
  
  /**
   * Analyze harmonic content of voice
   */
  analyzeHarmonics() {
    const fundamental = this.voiceData.fundamentalFreq;
    if (fundamental < 20) return; // Skip if no clear fundamental detected
    
    const harmonics = [];
    
    for (let i = 2; i <= this.config.harmonicLevels + 1; i++) {
      const expectedFreq = fundamental * i;
      const binIndex = Math.round(expectedFreq * this.analyzer.fftSize / this.audioContext.sampleRate);
      
      if (binIndex < this.dataArray.length) {
        const amplitude = Math.max(0, (this.dataArray[binIndex] + 140) / 140);
        harmonics.push({
          frequency: expectedFreq,
          amplitude: amplitude,
          ratio: i
        });
      }
    }
    
    this.voiceData.harmonics = harmonics;
  }
  
  /**
   * Analyze breathing pattern from amplitude modulation
   */
  analyzeBreathingPattern() {
    const currentTime = performance.now();
    const amplitude = this.voiceData.amplitude;
    
    // Track amplitude to detect breath cycles
    this.breathingPattern.push({
      time: currentTime,
      amplitude: amplitude
    });
    
    // Keep only recent samples (last 10 seconds)
    while (this.breathingPattern.length > 0 && 
           currentTime - this.breathingPattern[0].time > 10000) {
      this.breathingPattern.shift();
    }
    
    // Detect peaks (breaths)
    if (amplitude > 0.7 && this.lastBreathPeak < currentTime - 1000) {
      const timeSinceLastPeak = currentTime - this.lastBreathPeak;
      
      if (this.lastBreathPeak > 0 && timeSinceLastPeak > 1500 && timeSinceLastPeak < 15000) {
        // Valid breath cycle detected
        this.breathCycleTime = 0.2 * timeSinceLastPeak + 0.8 * this.breathCycleTime; // Smoothed average
      }
      
      this.lastBreathPeak = currentTime;
    }
  }
  
  /**
   * Detect emotional resonance from voice characteristics
   */
  detectEmotionalResonance() {
    if (!this.config.emotionMapping) return;
    
    const amplitude = this.voiceData.amplitude;
    if (amplitude < 0.2) return; // Skip if voice too quiet
    
    // Simple emotional mapping based on frequency range and harmonics
    // (In a real implementation, this would use machine learning models)
    
    const fundamental = this.voiceData.fundamentalFreq;
    const harmonicRichness = this.calculateHarmonicRichness();
    const breathRate = this.breathCycleTime > 0 ? 60000 / this.breathCycleTime : 0;
    
    // Map voice characteristics to emotional states using phi-harmonic principles
    // Each emotion is balanced according to the golden ratio (φ)
    
    // Joy - higher frequencies, rich harmonics
    const joyFactor = this.mapToRange(fundamental, 200, 800) * harmonicRichness;
    
    // Calm - lower frequencies, steady breath
    const calmFactor = (1 - this.mapToRange(fundamental, 80, 350)) * 
                      (1 - this.mapToRange(breathRate, 6, 18));
    
    // Focus - mid-range, consistent amplitude
    const focusFactor = this.mapToRange(fundamental, 100, 500) * 
                       (1 - this.calculateAmplitudeVariation());
    
    // Passion - higher amplitude, rich harmonics
    const passionFactor = amplitude * harmonicRichness;
    
    // Reflection - lower frequencies, slower breath
    const reflectionFactor = (1 - this.mapToRange(fundamental, 80, 350)) * 
                            (1 - this.mapToRange(breathRate, 4, 12));
    
    // Apply phi-based smoothing to prevent jarring transitions
    const phi = 1.618033988749895;
    const phiInv = 1 / phi;
    
    this.voiceData.emotionalState = {
      joy: phiInv * this.voiceData.emotionalState.joy + (1 - phiInv) * joyFactor,
      calm: phiInv * this.voiceData.emotionalState.calm + (1 - phiInv) * calmFactor,
      focus: phiInv * this.voiceData.emotionalState.focus + (1 - phiInv) * focusFactor,
      passion: phiInv * this.voiceData.emotionalState.passion + (1 - phiInv) * passionFactor,
      reflection: phiInv * this.voiceData.emotionalState.reflection + (1 - phiInv) * reflectionFactor
    };
    
    // Trigger emotional shift callback
    if (this.onEmotionalShift) {
      this.onEmotionalShift(this.voiceData.emotionalState);
    }
  }
  
  /**
   * Helper to map value to 0-1 range
   */
  mapToRange(value, min, max) {
    return Math.max(0, Math.min(1, (value - min) / (max - min)));
  }
  
  /**
   * Calculate harmonic richness as ratio of harmonic to fundamental energy
   */
  calculateHarmonicRichness() {
    if (this.voiceData.harmonics.length === 0) return 0;
    
    let harmonicEnergy = 0;
    for (const harmonic of this.voiceData.harmonics) {
      harmonicEnergy += harmonic.amplitude;
    }
    
    return harmonicEnergy / (this.voiceData.amplitude * this.voiceData.harmonics.length);
  }
  
  /**
   * Calculate amplitude variation over recent samples
   */
  calculateAmplitudeVariation() {
    if (this.breathingPattern.length < 5) return 0;
    
    const amplitudes = this.breathingPattern.map(p => p.amplitude);
    const mean = amplitudes.reduce((sum, a) => sum + a, 0) / amplitudes.length;
    
    const variance = amplitudes.reduce((sum, a) => sum + Math.pow(a - mean, 2), 0) / amplitudes.length;
    return Math.sqrt(variance) / mean; // Coefficient of variation
  }
  
  /**
   * Calculate coherence between voice and target frequency
   */
  calculateCoherence() {
    const targetFreq = this.config.targetFrequency;
    const currentFreq = this.voiceData.fundamentalFreq;
    
    if (currentFreq < 20 || this.voiceData.amplitude < 0.2) {
      // No significant voice detected
      if (this.voiceData.coherence > 0) {
        this.voiceData.coherence = Math.max(0, this.voiceData.coherence - 0.05);
        
        // Trigger coherence change callback
        if (this.onCoherenceChange) {
          this.onCoherenceChange(this.voiceData.coherence);
        }
      }
      return;
    }
    
    // Calculate frequency distance from target, with harmonics consideration
    // A frequency is coherent if it's the target or a harmonic/subharmonic
    let minDistance = Infinity;
    
    // Check the fundamental and its harmonics
    for (let i = 1; i <= 4; i++) {
      const harmonic = currentFreq * i;
      const distance = Math.abs(harmonic - targetFreq) / targetFreq;
      minDistance = Math.min(minDistance, distance);
    }
    
    // Check subharmonics
    for (let i = 1; i <= 4; i++) {
      const subharmonic = currentFreq / i;
      const distance = Math.abs(subharmonic - targetFreq) / targetFreq;
      minDistance = Math.min(minDistance, distance);
    }
    
    // Calculate coherence percentage (inverse of distance)
    // Perfect coherence at exact frequency, falls off with distance
    let newCoherence = 1 - Math.min(1, minDistance * 10);
    
    // Apply threshold for minimum coherence
    newCoherence = newCoherence < 0.05 ? 0 : newCoherence;
    
    // Apply smoothing using phi ratio
    const phi = 1.618033988749895;
    const smoothingFactor = 1 / phi;
    
    this.voiceData.coherence = smoothingFactor * this.voiceData.coherence + 
                              (1 - smoothingFactor) * newCoherence;
    
    // Apply intention influence to coherence
    if (this.intentionStrength > 0.1) {
      const intentionBoost = this.intentionStrength * this.config.intentionInfluence;
      this.voiceData.coherence = Math.min(1, this.voiceData.coherence * (1 + intentionBoost));
    }
    
    // Trigger coherence change callback
    if (this.onCoherenceChange) {
      this.onCoherenceChange(this.voiceData.coherence);
    }
  }
  
  /**
   * Update ZEN point balance based on voice and frequency
   * Maintains optimal human/quantum balance
   */
  updateZenPointBalance() {
    // Balance depends on:
    // 1. Voice coherence with target frequency
    // 2. Breathing pattern alignment
    // 3. Emotional resonance
    
    const coherenceFactor = this.voiceData.coherence;
    
    // Calculate breath alignment with phi
    const idealBreathRate = 6.18; // breaths per minute (based on phi)
    const actualBreathRate = this.breathCycleTime > 0 ? 60000 / this.breathCycleTime : 0;
    const breathAlignment = actualBreathRate > 0 ? 
                           1 - Math.min(1, Math.abs(actualBreathRate - idealBreathRate) / 6) : 
                           0;
    
    // Emotional balance factor (weighted sum of calm and focus)
    const emotionalBalance = (this.voiceData.emotionalState.calm * 0.618) + 
                            (this.voiceData.emotionalState.focus * 0.382);
    
    // Calculate new balance with phi-weighted factors
    const phi = 1.618033988749895;
    const humanFactor = (coherenceFactor * 0.5) + (breathAlignment * 0.3) + (emotionalBalance * 0.2);
    
    // Apply phi-harmonic smoothing
    const smoothingFactor = 1 / phi;
    this.voiceData.zenBalance = smoothingFactor * this.voiceData.zenBalance + 
                               (1 - smoothingFactor) * humanFactor;
    
    // Update toroidal flow based on new balance
    this.updateToroidalFlow();
  }
  
  /**
   * Update toroidal flow parameters based on current state
   * This maintains the energy field stability
   */
  updateToroidalFlow() {
    const zenBalance = this.voiceData.zenBalance;
    const coherence = this.voiceData.coherence;
    
    // Calculate flow parameters based on ZEN balance and coherence
    this.toroidalFlow.inflow = zenBalance * coherence;
    this.toroidalFlow.outflow = (1 - zenBalance) * coherence;
    this.toroidalFlow.centerBalance = zenBalance;
    this.toroidalFlow.expansionFactor = this.toroidalFlow.inflow * 0.618;
    this.toroidalFlow.compressionFactor = this.toroidalFlow.outflow * 0.618;
    
    // Update flow matrix (simplified representation of toroidal field)
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // Calculate position in torus
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.2 + (j / 8) * 0.8;
        
        // Apply flow dynamics
        const flowStrength = this.calculateFlowStrength(angle, radius);
        this.flowMatrix[i][j] = flowStrength;
      }
    }
  }
  
  /**
   * Calculate flow strength at a point in the toroidal field
   */
  calculateFlowStrength(angle, radius) {
    const centerDistance = Math.abs(radius - 0.5);
    const flowFactor = 1 - Math.pow(centerDistance * 2, 2);
    
    // Apply phi-based pulsation
    const phi = 1.618033988749895;
    const time = performance.now() / 1000;
    const pulsation = 0.2 * Math.sin(time * (1 / phi));
    
    return flowFactor * (this.toroidalFlow.centerBalance + pulsation);
  }
  
  /**
   * Set the user's conscious intention
   * @param {string} intention Intention statement
   * @param {number} strength Intention strength (0-1)
   */
  setIntention(intention, strength = 0.5) {
    this.currentIntention = intention;
    this.intentionStrength = Math.max(0, Math.min(1, strength));
  }
  
  /**
   * Generate unique voice fingerprint from characteristics
   */
  generateVoiceFingerprint() {
    if (this.voiceData.amplitude < 0.3) return;
    
    // Extract key voice parameters
    const fundamental = this.voiceData.fundamentalFreq;
    const harmonicProfile = this.voiceData.harmonics.map(h => h.amplitude);
    
    // Create a simplified fingerprint vector
    const fingerprintVector = [
      fundamental / 1000, // Normalized fundamental
      ...harmonicProfile,
      this.breathCycleTime / 10000, // Normalized breath cycle
      ...Object.values(this.voiceData.emotionalState)
    ];
    
    this.voiceFingerprint = fingerprintVector;
  }
  
  /**
   * Get current voice analysis data
   * @returns {Object} Current voice analysis data
   */
  getVoiceData() {
    return { ...this.voiceData };
  }
  
  /**
   * Get voice fingerprint
   * @returns {Array} Voice fingerprint vector
   */
  getVoiceFingerprint() {
    return this.voiceFingerprint ? [...this.voiceFingerprint] : null;
  }
  
  /**
   * Get toroidal flow data
   * @returns {Object} Current toroidal flow parameters
   */
  getToroidalFlowData() {
    return {
      ...this.toroidalFlow,
      flowMatrix: this.flowMatrix.map(row => [...row])
    };
  }
  
  /**
   * Reset analysis data
   */
  reset() {
    this.voiceData = {
      fundamentalFreq: 0,
      amplitude: 0,
      harmonics: [],
      formants: [],
      emotionalState: {
        joy: 0,
        calm: 0,
        focus: 0,
        passion: 0,
        reflection: 0
      },
      coherence: 0,
      zenBalance: this.config.zenPointRatio
    };
    
    this.breathingPattern = [];
    this.breathCycleTime = 0;
    this.lastBreathPeak = 0;
    this.voiceFingerprint = null;
    this.frameCount = 0;
    
    this.initializeToroidalFlow();
  }
}

// Export for use in other modules
export { VoiceAnalysisEngine };
