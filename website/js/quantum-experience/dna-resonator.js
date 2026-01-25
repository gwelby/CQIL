/**
 * DNA Resonator
 * 
 * Audio component that generates phi-harmonic frequencies based on 528 Hz
 * DNA resonance principles, using Fibonacci sequences and golden ratio.
 * Part of the Creation State (528 Hz - φ¹) experience.
 * 
 * @module quantum-experience/dna-resonator
 */
class DNAResonator {
    /**
     * Creates a new DNA Resonator
     * @param {AudioContext} audioContext - Web Audio API context
     * @param {Object} options - Configuration options
     */
    constructor(audioContext, options = {}) {
        if (!audioContext) {
            throw new Error("AudioContext is required for DNAResonator");
        }
        
        this.audioContext = audioContext;
        
        // Initialize with default options
        this.config = {
            baseFrequency: 528, // Creation state frequency (φ¹)
            phi: 1.618033988749895,
            volume: 0.3,
            oscillatorType: 'sine',
            zenPointBalance: {
                quantum: 0.5,
                human: 0.5
            }
        };
        
        // Apply user options
        Object.keys(options).forEach(key => {
            if (this.config.hasOwnProperty(key)) {
                if (typeof this.config[key] === 'object' && !Array.isArray(this.config[key])) {
                    this.config[key] = {...this.config[key], ...options[key]};
                } else {
                    this.config[key] = options[key];
                }
            }
        });
        
        // Audio nodes
        this.nodes = {
            oscillators: [],
            gains: [],
            filter: null,
            masterGain: null
        };
        
        // State tracking
        this.state = {
            isActive: false,
            coherence: 0.5,
            resonance: 0.5,
            intention: {
                strength: 0.5,
                clarity: 0.5,
                focus: 0.5
            }
        };
        
        // DNA frequency ratios (based on Fibonacci and phi)
        this.frequencyRatios = this._calculateFrequencyRatios();
        
        // Initialize audio nodes
        this._initAudioNodes();
    }
    
    // Calculate frequency ratios based on phi/Fibonacci
    _calculateFrequencyRatios() {
        const PHI = this.config.phi;
        
        // Primary phi-harmonic ratios
        const phiRatios = [
            1 / (PHI * PHI),  // φ⁻²
            1 / PHI,          // φ⁻¹
            1,                // φ⁰ (base)
            PHI,              // φ¹
            PHI * PHI         // φ²
        ];
        
        // Fibonacci sequence ratios (1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...)
        const fibonacci = [1, 1];
        for (let i = 2; i < 12; i++) {
            fibonacci[i] = fibonacci[i-1] + fibonacci[i-2];
        }
        
        // Generate ratios from Fibonacci sequence
        const fibRatios = [];
        for (let i = 0; i < fibonacci.length - 1; i++) {
            fibRatios.push(fibonacci[i] / fibonacci[i+1]); // Descending ratios
        }
        for (let i = 1; i < fibonacci.length; i++) {
            fibRatios.push(fibonacci[i] / fibonacci[0]); // Ascending ratios
        }
        
        // Combine and filter to audible range when multiplied by base frequency
        return [...new Set([...phiRatios, ...fibRatios])]
            .filter(ratio => {
                const freq = this.config.baseFrequency * ratio;
                return freq >= 20 && freq <= 20000; // Audible range
            })
            .sort((a, b) => a - b);
    }
    
    // Initialize audio nodes
    _initAudioNodes() {
        // Create filter
        this.nodes.filter = this.audioContext.createBiquadFilter();
        this.nodes.filter.type = 'bandpass';
        this.nodes.filter.frequency.value = this.config.baseFrequency;
        this.nodes.filter.Q.value = 1.0;
        
        // Create master gain
        this.nodes.masterGain = this.audioContext.createGain();
        this.nodes.masterGain.gain.value = 0;
        
        // Connect filter to master gain
        this.nodes.filter.connect(this.nodes.masterGain);
    }
    
    // Generate oscillators based on DNA frequencies
    _generateOscillators() {
        // Clear existing oscillators
        this._clearOscillators();
        
        // Create oscillators for each ratio
        this.frequencyRatios.forEach((ratio, index) => {
            const freq = this.config.baseFrequency * ratio;
            
            // Create oscillator
            const osc = this.audioContext.createOscillator();
            osc.type = this.config.oscillatorType;
            osc.frequency.value = freq;
            
            // Create individual gain for this oscillator
            const gain = this.audioContext.createGain();
            gain.gain.value = 0;
            
            // Connect oscillator to its gain, then to filter
            osc.connect(gain);
            gain.connect(this.nodes.filter);
            
            // Store references
            this.nodes.oscillators.push(osc);
            this.nodes.gains.push(gain);
        });
    }
    
    // Clear all oscillators
    _clearOscillators() {
        // Stop and disconnect all oscillators
        this.nodes.oscillators.forEach(osc => {
            try {
                osc.stop();
                osc.disconnect();
            } catch (error) {
                // Ignore errors for oscillators that haven't started
            }
        });
        
        // Disconnect all gains
        this.nodes.gains.forEach(gain => {
            try {
                gain.disconnect();
            } catch (error) {
                // Ignore disconnection errors
            }
        });
        
        // Reset arrays
        this.nodes.oscillators = [];
        this.nodes.gains = [];
    }
    
    // Connect output to destination
    connect(destination) {
        if (!destination) return this;
        
        try {
            this.nodes.masterGain.disconnect();
        } catch (error) {
            // Ignore disconnection errors
        }
        
        this.nodes.masterGain.connect(destination);
        return this;
    }
    
    // Start the resonator
    start() {
        if (this.state.isActive) return this;
        
        this.state.isActive = true;
        
        // Generate oscillators
        this._generateOscillators();
        
        // Start all oscillators
        this.nodes.oscillators.forEach(osc => {
            try {
                osc.start();
            } catch (error) {
                // Ignore errors for oscillators that are already running
            }
        });
        
        // Fade in master gain
        const now = this.audioContext.currentTime;
        this.nodes.masterGain.gain.setValueAtTime(0, now);
        this.nodes.masterGain.gain.linearRampToValueAtTime(
            this.config.volume, 
            now + 2
        );
        
        // Set gain values based on intention
        this._updateGainValues();
        
        return this;
    }
    
    // Stop the resonator
    stop() {
        if (!this.state.isActive) return this;
        
        this.state.isActive = false;
        
        // Fade out master gain
        const now = this.audioContext.currentTime;
        this.nodes.masterGain.gain.setValueAtTime(this.nodes.masterGain.gain.value, now);
        this.nodes.masterGain.gain.linearRampToValueAtTime(0, now + 1);
        
        // Schedule oscillator cleanup after fade out
        setTimeout(() => {
            this._clearOscillators();
        }, 1100);
        
        return this;
    }
    
    // Set intention values
    setIntention(intention) {
        if (!intention) return this;
        
        this.state.intention = {...this.state.intention, ...intention};
        
        // Update gain values based on new intention
        if (this.state.isActive) {
            this._updateGainValues();
        }
        
        return this;
    }
    
    // Set ZEN POINT balance
    setZenPointBalance(balance) {
        if (!balance) return this;
        
        this.config.zenPointBalance = {...this.config.zenPointBalance, ...balance};
        
        // Apply ZEN POINT balance effects
        this._applyZenPointBalance();
        
        return this;
    }
    
    // Apply ZEN POINT balance effects
    _applyZenPointBalance() {
        const { quantum, human } = this.config.zenPointBalance;
        
        // Quantum affects filter resonance and frequency spread
        const quantumFactor = Math.pow(quantum, 2);
        this.nodes.filter.Q.setValueAtTime(
            1.0 + 9.0 * quantumFactor,
            this.audioContext.currentTime
        );
        
        // Human affects oscillator type and harmonics
        if (human > 0.7) {
            // More human -> richer timbre
            this._updateOscillatorTypes('triangle');
        } else if (human < 0.3) {
            // More quantum -> purer tones
            this._updateOscillatorTypes('sine');
        } else {
            // Balanced
            this._updateOscillatorTypes(this.config.oscillatorType);
        }
    }
    
    // Update oscillator types
    _updateOscillatorTypes(type) {
        // Can't change oscillator type after it's started, so we'll
        // need to regenerate them if we're active
        if (this.state.isActive) {
            const wasActive = this.state.isActive;
            this.stop();
            
            // Set the new type
            this.config.oscillatorType = type;
            
            // Restart after a brief pause to allow cleanup
            setTimeout(() => {
                if (wasActive) {
                    this.start();
                }
            }, 100);
        } else {
            // Just update the config for next start
            this.config.oscillatorType = type;
        }
    }
    
    // Update gain values based on intention
    _updateGainValues() {
        if (!this.state.isActive || !this.nodes.gains.length) return;
        
        const baseGain = 0.2 * this.state.intention.strength;
        const now = this.audioContext.currentTime;
        
        // Redistribute energy based on intention focus
        // Higher focus = more energy in primary frequencies
        // Lower focus = more evenly distributed energy
        const focusFactor = this.state.intention.focus;
        const primaryIndex = Math.floor(this.nodes.gains.length / 2);
        
        // Update individual oscillator gains
        this.nodes.gains.forEach((gain, index) => {
            // Calculate distance from primary frequency (normalized 0-1)
            const distFromCenter = Math.abs(index - primaryIndex) / this.nodes.gains.length;
            
            // Calculate gain based on focus and distance from center
            // High focus = center frequencies louder, others quieter
            // Low focus = more even distribution
            const intentionGain = baseGain * (1 - (distFromCenter * focusFactor));
            
            // Add some randomness based on clarity
            // Lower clarity = more random fluctuations
            const randomFactor = 1 - (0.4 * (1 - this.state.intention.clarity));
            const finalGain = intentionGain * (randomFactor + Math.random() * (1 - randomFactor));
            
            // Apply gain change with slight randomized timing for natural feel
            gain.gain.setValueAtTime(gain.gain.value, now);
            gain.gain.linearRampToValueAtTime(
                Math.max(0, finalGain),
                now + 0.5 + Math.random() * 1.5
            );
        });
        
        // Update state coherence level
        this.state.coherence = 0.3 + (0.7 * this.state.intention.clarity * this.state.intention.focus);
        
        // Update state resonance level
        this.state.resonance = 0.3 + (0.7 * this.state.intention.strength * this.state.intention.focus);
    }
    
    // Update based on audio analysis
    update(audioData) {
        if (!this.state.isActive || !audioData) return;
        
        // If we have dominant frequency analysis
        if (audioData.dominantFrequency && audioData.clarity) {
            // Find closest phi-harmonic frequency
            const targetFreq = this._findClosestPhiHarmonicFrequency(audioData.dominantFrequency);
            
            // Update filter frequency with smoothing
            const now = this.audioContext.currentTime;
            this.nodes.filter.frequency.setValueAtTime(this.nodes.filter.frequency.value, now);
            this.nodes.filter.frequency.linearRampToValueAtTime(
                targetFreq,
                now + 0.5
            );
            
            // Update resonance based on audio clarity
            this.state.coherence = Math.max(this.state.coherence, audioData.clarity);
        }
    }
    
    // Find closest phi-harmonic frequency to an input frequency
    _findClosestPhiHarmonicFrequency(frequency) {
        // Generate all possible phi-harmonic frequencies
        const phiHarmonics = this.frequencyRatios.map(ratio => this.config.baseFrequency * ratio);
        
        // Find closest match
        let closest = this.config.baseFrequency;
        let minDistance = Math.abs(frequency - closest);
        
        for (const harmonic of phiHarmonics) {
            const distance = Math.abs(frequency - harmonic);
            if (distance < minDistance) {
                closest = harmonic;
                minDistance = distance;
            }
        }
        
        return closest;
    }
    
    // Get coherence factor (0-1)
    getCoherenceFactor() {
        return this.state.coherence;
    }
    
    // Get resonance factor (0-1)
    getResonanceFactor() {
        return this.state.resonance;
    }
    
    // Get metrics
    getMetrics() {
        return {
            isActive: this.state.isActive,
            coherence: this.state.coherence,
            resonance: this.state.resonance,
            baseFrequency: this.config.baseFrequency,
            harmonicCount: this.nodes.oscillators.length,
            zenPointBalance: this.config.zenPointBalance
        };
    }
    
    // Set volume (0-1)
    setVolume(volume) {
        if (typeof volume !== 'number' || volume < 0 || volume > 1) return this;
        
        this.config.volume = volume;
        
        if (this.state.isActive) {
            const now = this.audioContext.currentTime;
            this.nodes.masterGain.gain.setValueAtTime(this.nodes.masterGain.gain.value, now);
            this.nodes.masterGain.gain.linearRampToValueAtTime(volume, now + 0.5);
        }
        
        return this;
    }
    
    // Clean up resources
    destroy() {
        this.stop();
        
        // Clean up all audio nodes
        this._clearOscillators();
        
        try {
            this.nodes.filter.disconnect();
            this.nodes.masterGain.disconnect();
        } catch (error) {
            // Ignore disconnection errors
        }
    }
}

// Export the class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DNAResonator;
} else {
    window.DNAResonator = DNAResonator;
}
