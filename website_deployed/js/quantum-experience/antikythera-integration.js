/**
 * AntikytheraQuantumMechanism Integration Module
 * Integrates all components of the Antikythera Quantum Mechanism and connects with other quantum experience components
 */

// Extend the AntikytheraQuantumMechanism prototype with integration methods
(function() {
    // Reference to the prototype
    const proto = AntikytheraQuantumMechanism.prototype;
    
    // Constants
    const PHI = 1.618033988749895;  // Golden ratio (φ)
    const TWO_PI = Math.PI * 2;
    
    // Phi-harmonic frequencies 
    const PHI_FREQUENCIES = [432, 528, 594, 672, 720, 768]; // φ⁰ to φ⁵
    
    /**
     * Connect to other quantum experience components
     * @private
     */
    proto._connectQuantumComponents = function() {
        // Connect to DNA Resonator if available
        this._connectDNAResonator();
        
        // Connect to Flower of Life Visualizer if available
        this._connectFlowerOfLifeVisualizer();
        
        // Connect to Pattern Recognition System if available
        this._connectPatternRecognitionSystem();
        
        // Connect to Breath Synchronizer if available
        this._connectBreathSynchronizer();
        
        console.log('AntikytheraQuantumMechanism: Connected to quantum components');
    };
    
    /**
     * Connect to DNA Resonator
     * @private
     */
    proto._connectDNAResonator = function() {
        if (!this.config.dnaResonator) return;
        
        try {
            // Listen for frequency changes from DNA Resonator
            if (typeof this.config.dnaResonator.addFrequencyChangeListener === 'function') {
                this.config.dnaResonator.addFrequencyChangeListener((frequency) => {
                    // Map DNA Resonator frequency to nearest phi-harmonic frequency
                    const phiFreq = this._getNearestPhiFrequency(frequency);
                    
                    // Update mechanism frequency
                    this.setFrequency(phiFreq);
                });
            }
            
            // Connect our audio context to DNA Resonator if possible
            if (this.audioNodes.context && 
                this.config.dnaResonator.audioContext !== this.audioNodes.context &&
                typeof this.config.dnaResonator.connectExternalAudioContext === 'function') {
                
                this.config.dnaResonator.connectExternalAudioContext(this.audioNodes.context);
            }
            
            console.log('AntikytheraQuantumMechanism: Connected to DNA Resonator');
            
        } catch (error) {
            console.error('Error connecting to DNA Resonator:', error);
        }
    };
    
    /**
     * Connect to Flower of Life Visualizer
     * @private
     */
    proto._connectFlowerOfLifeVisualizer = function() {
        if (!this.config.flowerOfLifeVisualizer) return;
        
        try {
            // Send celestial alignment data to Flower of Life Visualizer
            if (typeof this.config.flowerOfLifeVisualizer.setCelestialAlignment === 'function') {
                // Update visualizer with our alignment data
                const updateInterval = setInterval(() => {
                    if (this.state.celestialAlignment !== undefined) {
                        this.config.flowerOfLifeVisualizer.setCelestialAlignment(
                            this.state.celestialAlignment
                        );
                    }
                }, 1000);
                
                // Store interval ID for cleanup
                this.state.flowerOfLifeUpdateInterval = updateInterval;
            }
            
            // Listen for intention events from the Flower of Life Visualizer
            if (typeof this.config.flowerOfLifeVisualizer.addIntentionListener === 'function') {
                this.config.flowerOfLifeVisualizer.addIntentionListener((data) => {
                    // Apply intention to our mechanism
                    if (data && typeof data.strength === 'number') {
                        this.applyIntention(
                            data.strength, 
                            data.focusX || 0.5, 
                            data.focusY || 0.5
                        );
                    }
                });
            }
            
            console.log('AntikytheraQuantumMechanism: Connected to Flower of Life Visualizer');
            
        } catch (error) {
            console.error('Error connecting to Flower of Life Visualizer:', error);
        }
    };
    
    /**
     * Connect to Pattern Recognition System
     * @private
     */
    proto._connectPatternRecognitionSystem = function() {
        if (!this.config.patternRecognitionSystem) return;
        
        try {
            // Register our planetary positions as a pattern source
            if (typeof this.config.patternRecognitionSystem.registerPatternSource === 'function') {
                this.config.patternRecognitionSystem.registerPatternSource({
                    name: 'AntikytheraCelestialPatterns',
                    getPattern: () => {
                        // Only provide data if we have valid positions
                        if (!this.astronomy || !this.astronomy.positions) return null;
                        
                        // Extract pattern data from positions
                        const positions = this.astronomy.positions;
                        return {
                            sunLongitude: positions.sun.longitude,
                            moonLongitude: positions.moon.longitude,
                            mercuryLongitude: positions.planets.mercury.longitude,
                            venusLongitude: positions.planets.venus.longitude,
                            marsLongitude: positions.planets.mars.longitude,
                            jupiterLongitude: positions.planets.jupiter.longitude,
                            saturnLongitude: positions.planets.saturn.longitude,
                            lunarPhase: positions.lunarPhase,
                            coherence: this.state.coherence
                        };
                    }
                });
            }
            
            // Listen for pattern matches
            if (typeof this.config.patternRecognitionSystem.addPatternMatchListener === 'function') {
                this.config.patternRecognitionSystem.addPatternMatchListener((match) => {
                    // React to pattern matches
                    if (match && match.confidence > 0.7) {
                        // Create a resonance ripple
                        this._createResonanceRipple(0.5, 0.5, match.confidence);
                    }
                });
            }
            
            console.log('AntikytheraQuantumMechanism: Connected to Pattern Recognition System');
            
        } catch (error) {
            console.error('Error connecting to Pattern Recognition System:', error);
        }
    };
    
    /**
     * Connect to Breath Synchronizer
     * @private
     */
    proto._connectBreathSynchronizer = function() {
        if (!this.config.breathSynchronizer) return;
        
        try {
            // Synchronize mechanism pulsations with breath
            if (typeof this.config.breathSynchronizer.addBreathListener === 'function') {
                this.config.breathSynchronizer.addBreathListener((breathData) => {
                    if (!breathData) return;
                    
                    // Apply breath phase to quantum field
                    if (this.threeD.resonanceField) {
                        // Inhale expands, exhale contracts
                        const scaleFactor = 0.9 + (0.2 * breathData.phase);
                        this.threeD.resonanceField.scale.set(
                            scaleFactor,
                            scaleFactor,
                            1 + (0.1 * breathData.phase)
                        );
                    }
                    
                    // Adjust audio gain based on breath intensity
                    if (this.config.enableAudio && 
                        this.audioNodes.masterGain && 
                        breathData.intensity !== undefined) {
                        
                        const gain = 0.3 + (breathData.intensity * 0.5);
                        this.audioNodes.masterGain.gain.linearRampToValueAtTime(
                            gain,
                            this.audioNodes.context.currentTime + 0.1
                        );
                    }
                });
            }
            
            console.log('AntikytheraQuantumMechanism: Connected to Breath Synchronizer');
            
        } catch (error) {
            console.error('Error connecting to Breath Synchronizer:', error);
        }
    };
    
    /**
     * Get the nearest phi-harmonic frequency to the input frequency
     * @param {Number} frequency - Input frequency
     * @returns {Number} - Nearest phi-harmonic frequency
     * @private
     */
    proto._getNearestPhiFrequency = function(frequency) {
        if (!frequency || typeof frequency !== 'number') {
            return 528; // Default to Creation state
        }
        
        // Find the closest phi-harmonic frequency
        let closest = PHI_FREQUENCIES[1]; // Default to Creation state (528 Hz)
        let minDiff = Math.abs(frequency - closest);
        
        for (const phiFreq of PHI_FREQUENCIES) {
            const diff = Math.abs(frequency - phiFreq);
            if (diff < minDiff) {
                minDiff = diff;
                closest = phiFreq;
            }
        }
        
        return closest;
    };
    
    /**
     * Set the quantum coherence level directly
     * @param {Number} coherence - Coherence level (0-1)
     * @public
     */
    proto.setCoherence = function(coherence) {
        // Validate and set coherence
        this.state.coherence = Math.min(1, Math.max(0, coherence));
        
        // Apply coherence effects
        this._applyCoherenceEffects();
        
        // Render scene
        this._renderScene();
    };
    
    /**
     * Get current astronomical data
     * @returns {Object} - Current astronomical data
     * @public
     */
    proto.getAstronomicalData = function() {
        if (!this.astronomy || !this.astronomy.positions) {
            return null;
        }
        
        // Return copy of astronomical data
        return {
            sun: { ...this.astronomy.positions.sun },
            moon: { ...this.astronomy.positions.moon },
            planets: {
                mercury: { ...this.astronomy.positions.planets.mercury },
                venus: { ...this.astronomy.positions.planets.venus },
                mars: { ...this.astronomy.positions.planets.mars },
                jupiter: { ...this.astronomy.positions.planets.jupiter },
                saturn: { ...this.astronomy.positions.planets.saturn }
            },
            lunarPhase: this.astronomy.positions.lunarPhase,
            celestialAlignment: this.state.celestialAlignment,
            coherence: this.state.coherence,
            eclipses: this.astronomy.eclipses ? [...this.astronomy.eclipses] : []
        };
    };
    
    /**
     * Execute a time lapse animation that shows celestial movements over time
     * @param {Number} days - Number of days to advance
     * @param {Number} duration - Duration of the animation in milliseconds
     * @param {Function} onComplete - Callback when animation completes
     * @public
     */
    proto.executeTimeLapse = function(days, duration = 5000, onComplete) {
        // Store current date
        const startDate = new Date(this.state.currentDate);
        
        // Calculate end date
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + days);
        
        // Animation variables
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(1, elapsed / duration);
            
            // Calculate current date based on progress
            const currentDays = days * progress;
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + currentDays);
            
            // Update mechanism date
            this.setDate(currentDate);
            
            // Continue animation if not complete
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else if (typeof onComplete === 'function') {
                onComplete();
            }
        };
        
        // Start animation
        animate();
    };
    
    /**
     * Create a phi-harmonic sequence that aligns astronomical positions with audio
     * @param {Number} duration - Duration of sequence in milliseconds
     * @param {Boolean} includeAudio - Whether to include audio sequence
     * @public
     */
    proto.createPhiHarmonicSequence = function(duration = 10000, includeAudio = true) {
        // Store current state
        const originalDate = new Date(this.state.currentDate);
        const originalAudioState = this.config.enableAudio;
        
        // Enable audio if requested
        if (includeAudio) {
            this.config.enableAudio = true;
            this._startAudio();
        }
        
        // Create sequence of phi-harmonic frequency shifts
        const frequencies = [432, 528, 594, 672, 720, 768]; // φ⁰ to φ⁵
        const stepDuration = duration / frequencies.length;
        
        // Start sequence
        let step = 0;
        const runSequence = () => {
            if (step >= frequencies.length) {
                // Restore original date and complete
                this.setDate(originalDate);
                this.config.enableAudio = originalAudioState;
                return;
            }
            
            // Set current frequency
            this.setFrequency(frequencies[step]);
            
            // Move date forward by phi days
            this.modifyDateByDays(PHI);
            
            // Schedule next step
            setTimeout(runSequence, stepDuration);
            step++;
        };
        
        // Start the sequence
        runSequence();
    };
    
})();
