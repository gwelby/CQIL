/**
 * Breath Synchronizer
 * 
 * Component for synchronizing breath patterns with phi-harmonic frequencies
 * to enhance flow state and quantum coherence in Creation State experience.
 * 
 * @module quantum-experience/breath-synchronizer
 */
class BreathSynchronizer {
    /**
     * Creates a new Breath Synchronizer
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        // Initialize with default options
        this.config = {
            baseFrequency: 528, // Creation state frequency (φ¹)
            phi: 1.618033988749895,
            breathCycleDuration: 10, // seconds
            phaseRatios: {
                inhale: 0.382, // 1/φ² (roughly)
                holdIn: 0.236, // 1/φ³ (roughly)
                exhale: 0.236, // 1/φ³ (roughly)
                rest: 0.146    // remainder to complete cycle
            },
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
        
        // State tracking
        this.state = {
            isActive: false,
            currentPhase: 'Rest',
            phaseProgress: 0,
            cycleProgress: 0,
            elapsedTime: 0,
            phaseDurations: this._calculatePhaseDurations()
        };
        
        // Animation frame tracking
        this.animationFrameId = null;
        this.lastFrameTime = 0;
    }
    
    // Calculate phase durations in seconds
    _calculatePhaseDurations() {
        const { breathCycleDuration, phaseRatios } = this.config;
        
        return {
            inhale: breathCycleDuration * phaseRatios.inhale,
            holdIn: breathCycleDuration * phaseRatios.holdIn,
            exhale: breathCycleDuration * phaseRatios.exhale,
            rest: breathCycleDuration * phaseRatios.rest
        };
    }
    
    // Start the breath synchronization
    start() {
        if (this.state.isActive) return this;
        
        this.state.isActive = true;
        this.lastFrameTime = performance.now();
        this._animate();
        
        return this;
    }
    
    // Stop the breath synchronization
    stop() {
        this.state.isActive = false;
        
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        
        return this;
    }
    
    // Reset the breath cycle
    reset() {
        this.state.currentPhase = 'Rest';
        this.state.phaseProgress = 0;
        this.state.cycleProgress = 0;
        this.state.elapsedTime = 0;
        
        // Recalculate phase durations
        this.state.phaseDurations = this._calculatePhaseDurations();
        
        return this;
    }
    
    // Animation loop
    _animate() {
        if (!this.state.isActive) return;
        
        const now = performance.now();
        const deltaTime = (now - this.lastFrameTime) / 1000; // seconds
        this.lastFrameTime = now;
        
        this._update(deltaTime);
        
        this.animationFrameId = requestAnimationFrame(() => this._animate());
    }
    
    // Update breath cycle
    _update(deltaTime) {
        this.state.elapsedTime += deltaTime;
        
        const { inhale, holdIn, exhale, rest } = this.state.phaseDurations;
        const cycleDuration = inhale + holdIn + exhale + rest;
        
        // Calculate cycle progress (0 to 1 for full cycle)
        this.state.cycleProgress = (this.state.elapsedTime % cycleDuration) / cycleDuration;
        
        // Determine current phase and its progress
        let elapsedInCycle = this.state.elapsedTime % cycleDuration;
        
        if (elapsedInCycle < inhale) {
            this.state.currentPhase = 'Inhale';
            this.state.phaseProgress = elapsedInCycle / inhale;
        } else if (elapsedInCycle < inhale + holdIn) {
            this.state.currentPhase = 'Hold';
            this.state.phaseProgress = (elapsedInCycle - inhale) / holdIn;
        } else if (elapsedInCycle < inhale + holdIn + exhale) {
            this.state.currentPhase = 'Exhale';
            this.state.phaseProgress = (elapsedInCycle - inhale - holdIn) / exhale;
        } else {
            this.state.currentPhase = 'Rest';
            this.state.phaseProgress = (elapsedInCycle - inhale - holdIn - exhale) / rest;
        }
    }
    
    // Set the breath cycle duration
    setBreathCycleDuration(duration) {
        this.config.breathCycleDuration = duration;
        this.state.phaseDurations = this._calculatePhaseDurations();
        return this;
    }
    
    // Set ZEN POINT balance
    setZenPointBalance(balance) {
        this.config.zenPointBalance = {...this.config.zenPointBalance, ...balance};
        
        // Adjust breath cycle based on ZEN POINT balance
        this._adjustBreathCycleForZenPoint();
        
        return this;
    }
    
    // Adjust breath cycle based on ZEN POINT balance
    _adjustBreathCycleForZenPoint() {
        const { quantum, human } = this.config.zenPointBalance;
        
        // Base durations
        const baseDuration = this.config.breathCycleDuration;
        
        // As quantum increases, lengthen the hold phases
        // As human increases, emphasize the inhale/exhale phases
        this.config.phaseRatios = {
            inhale: 0.382 * (0.8 + 0.4 * human),
            holdIn: 0.236 * (0.8 + 0.4 * quantum),
            exhale: 0.236 * (0.8 + 0.4 * human),
            rest: 0.146 * (0.8 + 0.4 * quantum)
        };
        
        // Normalize ratios to sum to 1
        const sum = Object.values(this.config.phaseRatios).reduce((a, b) => a + b, 0);
        Object.keys(this.config.phaseRatios).forEach(key => {
            this.config.phaseRatios[key] /= sum;
        });
        
        // Recalculate phase durations
        this.state.phaseDurations = this._calculatePhaseDurations();
    }
    
    // Get current state
    getState() {
        return {
            isActive: this.state.isActive,
            phase: this.state.currentPhase,
            progress: this.state.phaseProgress,
            cycleProgress: this.state.cycleProgress
        };
    }
    
    // Get coherence factor (0-1)
    getCoherenceFactor() {
        if (!this.state.isActive) return 0;
        
        // Coherence is highest during hold phases and lowest during transitions
        let phaseFactor;
        
        switch (this.state.currentPhase) {
            case 'Hold':
                phaseFactor = 0.9 + 0.1 * Math.sin(this.state.phaseProgress * Math.PI);
                break;
            case 'Rest':
                phaseFactor = 0.7 + 0.3 * Math.sin(this.state.phaseProgress * Math.PI);
                break;
            case 'Inhale':
            case 'Exhale':
                phaseFactor = 0.5 + 0.5 * Math.sin(this.state.phaseProgress * Math.PI);
                break;
            default:
                phaseFactor = 0.5;
        }
        
        return phaseFactor;
    }
    
    // Clean up resources
    destroy() {
        this.stop();
    }
}

// Export the class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BreathSynchronizer;
} else {
    window.BreathSynchronizer = BreathSynchronizer;
}
