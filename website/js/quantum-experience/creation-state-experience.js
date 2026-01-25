/**
 * Creation State Experience (528 Hz - φ¹)
 * 
 * Main controller for the Creation State experience, integrating multiple components including:
 * - Flower of Life Visualizer
 * - Pattern Recognition System
 * - Breath Synchronizer
 * - DNA Resonator
 * 
 * This experience operates at 528 Hz (the φ¹ Creation State frequency) and focuses on 
 * pattern recognition, creation, and DNA resonance.
 * 
 * @module quantum-experience/creation-state-experience
 */
class CreationStateExperience {
    /**
     * Creates a new Creation State Experience
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        // Default configuration
        this.config = {
            container: null,
            frequency: 528, // Creation state frequency (φ¹)
            zenPointBalance: {
                quantum: 0.5,
                human: 0.5
            },
            audioEnabled: true,
            breathSyncEnabled: true,
            patternRecognitionEnabled: true,
            flowerOfLifeEnabled: true,
            dnaResonanceEnabled: true,
            ascensionEnabled: true,
            autoStart: false,
            enableAudio: true,
            enableDNAResonator: true,
            resonanceFactor: 0.75
        };
        
        // Apply user options
        Object.keys(options).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(this.config, key)) {
                if (typeof this.config[key] === 'object' && !Array.isArray(this.config[key]) && this.config[key] !== null) {
                    this.config[key] = {...this.config[key], ...options[key]};
                } else {
                    this.config[key] = options[key];
                }
            }
        });
        
        // Constants
        this.PHI = 1.618033988749895;
        
        // State tracking
        this.state = {
            isActive: false,
            isAudioInitialized: false,
            isVisualInitialized: false,
            currentBreathPhase: 'rest',
            intentionStrength: 0.5,
            intentionFocus: 0.5,
            intentionClarity: 0.5,
            ascensionReady: false,
            audioError: null
        };
        
        // Audio nodes
        this.audioContext = null;
        this.audioNodes = {
            baseOscillator: null,
            phiOscillator: null,
            baseGain: null,
            phiGain: null,
            masterGain: null,
            analyser: null
        };
        
        // Components
        this.flowerOfLifeVisualizer = null;
        this.patternRecognitionSystem = null;
        this.breathSynchronizer = null;
        this.dnaResonator = null;
        
        // Metrics
        this.metrics = {
            intentionClarity: 0,
            breathSynchronization: 0,
            patternStability: 0,
            zenBalance: 0,
            phiResonance: 0
        };
        
        // Animation tracking
        this.animationFrame = null;
        this.lastFrameTime = 0;
        
        // Canvas and context
        this.canvas = null;
        this.ctx = null;
        
        // Initialize the experience
        this._init();
    }
    
    /**
     * Initialize the experience
     * @private
     */
    _init() {
        // Initialize container and canvas
        this._initContainer();
        
        // Initialize audio context if audio is enabled
        if (this.config.audioEnabled) {
            this._initAudio();
        }
        
        // Initialize components
        this._initComponents();
        
        // Automatically start if configured
        if (this.config.autoStart) {
            this.start();
        }
    }
    
    /**
     * Initialize the container and canvas
     * @private
     */
    _initContainer() {
        // Handle string selector or direct element reference
        if (typeof this.config.container === 'string') {
            this.config.container = document.querySelector(this.config.container);
        }
        
        // Return if no container
        if (!this.config.container) {
            console.warn('CreationStateExperience: No container provided');
            return;
        }
        
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'creation-state-canvas phi-harmonic-visual';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        
        // Add phi-harmonic data attributes
        this.canvas.setAttribute('data-phi-state', 'creation');
        this.canvas.setAttribute('data-phi-frequency', '528');
        this.canvas.setAttribute('data-phi-power', '1');
        
        // Get container dimensions
        const rect = this.config.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // Get rendering context
        this.ctx = this.canvas.getContext('2d');
        
        // Append canvas to container
        this.config.container.appendChild(this.canvas);
        
        // Set up event listeners
        this._setupEventListeners();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (this.config.container && this.canvas) {
                try {
                    const rect = this.config.container.getBoundingClientRect();
                    this.canvas.width = rect.width;
                    this.canvas.height = rect.height;
                    
                    // Resize components if implemented
                    if (this.flowerOfLifeVisualizer && typeof this.flowerOfLifeVisualizer.resize === 'function') {
                        this.flowerOfLifeVisualizer.resize();
                    }
                    
                    if (this.patternRecognitionSystem && typeof this.patternRecognitionSystem.resize === 'function') {
                        this.patternRecognitionSystem.resize();
                    }
                } catch (error) {
                    console.warn('CreationStateExperience: Error handling resize', error);
                }
            }
        });
    }
    
    /**
     * Set up event listeners for user interactions
     * @private
     */
    _setupEventListeners() {
        if (!this.canvas) return;
        
        // Track interaction state
        const interactionState = {
            isMouseDown: false,
            lastX: 0,
            lastY: 0,
            intentionStrength: 0.5,
            intentionHoldStartTime: 0
        };
        
        // Mouse/touch down - start intention focus
        const handleStart = (x, y) => {
            interactionState.isMouseDown = true;
            interactionState.lastX = x;
            interactionState.lastY = y;
            interactionState.intentionStrength = 0.5;
            interactionState.intentionHoldStartTime = performance.now();
            
            // Trigger initial ripple effect
            if (this.flowerOfLifeVisualizer && typeof this.flowerOfLifeVisualizer.triggerRipple === 'function') {
                try {
                    // Normalize coordinates (0-1)
                    const normX = x / this.canvas.width;
                    const normY = y / this.canvas.height;
                    this.flowerOfLifeVisualizer.triggerRipple(normX, normY, 0.5);
                } catch (error) {
                    console.warn('CreationStateExperience: Error triggering ripple', error);
                }
            }
            
            // Update focus point in pattern recognition system
            if (this.patternRecognitionSystem && typeof this.patternRecognitionSystem.updateFocusPoint === 'function') {
                try {
                    // Normalize coordinates (0-1)
                    const normX = x / this.canvas.width;
                    const normY = y / this.canvas.height;
                    this.patternRecognitionSystem.updateFocusPoint(normX, normY);
                } catch (error) {
                    console.warn('CreationStateExperience: Error updating focus point', error);
                }
            }
        };
        
        // Mouse/touch move - update intention focus
        const handleMove = (x, y) => {
            if (!interactionState.isMouseDown) return;
            
            // Calculate movement distance
            const dx = x - interactionState.lastX;
            const dy = y - interactionState.lastY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Update last position
            interactionState.lastX = x;
            interactionState.lastY = y;
            
            // Increase intention strength based on movement (up to 1.0)
            const intentionDelta = distance / 100; // Scale factor
            interactionState.intentionStrength = Math.min(1.0, interactionState.intentionStrength + intentionDelta);
            
            // Update intention state
            this.state.intentionStrength = interactionState.intentionStrength;
            this.state.intentionFocus = 0.5 + (interactionState.intentionStrength * 0.5);
            
            // Calculate hold duration - affects intention clarity
            const holdDuration = performance.now() - interactionState.intentionHoldStartTime;
            this.state.intentionClarity = Math.min(1.0, holdDuration / 5000); // Max after 5 seconds
            
            // Trigger additional ripple effects with movement
            if (distance > 20 && this.flowerOfLifeVisualizer && typeof this.flowerOfLifeVisualizer.triggerRipple === 'function') {
                try {
                    // Normalize coordinates (0-1)
                    const normX = x / this.canvas.width;
                    const normY = y / this.canvas.height;
                    this.flowerOfLifeVisualizer.triggerRipple(normX, normY, interactionState.intentionStrength);
                } catch (error) {
                    console.warn('CreationStateExperience: Error triggering ripple during movement', error);
                }
            }
            
            // Update focus point in pattern recognition system
            if (this.patternRecognitionSystem && typeof this.patternRecognitionSystem.updateFocusPoint === 'function') {
                try {
                    // Normalize coordinates (0-1)
                    const normX = x / this.canvas.width;
                    const normY = y / this.canvas.height;
                    this.patternRecognitionSystem.updateFocusPoint(normX, normY);
                } catch (error) {
                    console.warn('CreationStateExperience: Error updating focus point during movement', error);
                }
            }
        };
        
        // Mouse/touch up - end intention focus
        const handleEnd = () => {
            interactionState.isMouseDown = false;
            
            // Apply intention to components if held long enough
            const holdDuration = performance.now() - interactionState.intentionHoldStartTime;
            if (holdDuration > 500) { // Minimum 500ms to register as intentional
                // Notify DNA resonator of intention peak
                if (this.dnaResonator && typeof this.dnaResonator.applyIntention === 'function') {
                    try {
                        this.dnaResonator.applyIntention({
                            strength: this.state.intentionStrength,
                            focus: this.state.intentionFocus,
                            clarity: this.state.intentionClarity
                        });
                    } catch (error) {
                        console.warn('CreationStateExperience: Error applying intention to DNA resonator', error);
                    }
                }
                
                // Gradually reduce intention strength over time
                const reduceIntention = () => {
                    if (this.state.intentionStrength > 0.2) {
                        this.state.intentionStrength *= 0.95;
                        setTimeout(reduceIntention, 200);
                    }
                };
                
                reduceIntention();
            }
        };
        
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => {
            e.preventDefault();
            handleStart(e.offsetX, e.offsetY);
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            e.preventDefault();
            handleMove(e.offsetX, e.offsetY);
        });
        
        this.canvas.addEventListener('mouseup', () => {
            handleEnd();
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            handleEnd();
        });
        
        // Touch events
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            handleStart(touch.clientX - rect.left, touch.clientY - rect.top);
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            handleMove(touch.clientX - rect.left, touch.clientY - rect.top);
        });
        
        this.canvas.addEventListener('touchend', () => {
            handleEnd();
        });
        
        this.canvas.addEventListener('touchcancel', () => {
            handleEnd();
        });
    }
    
    /**
     * Initialize the audio context and nodes
     * @private
     */
    _initAudio() {
        // Skip if already initialized or audio is disabled
        if (this.audioContext || !this.config.enableAudio) {
            return;
        }
        
        try {
            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Set up base oscillator at Creation State frequency (528 Hz)
            this.audioNodes.baseOscillator = this.audioContext.createOscillator();
            this.audioNodes.baseOscillator.type = 'sine';
            this.audioNodes.baseOscillator.frequency.value = 528; // Creation State - 528 Hz (φ¹)
            
            // Set up phi-harmonic oscillators
            this.audioNodes.phiOscillator = this.audioContext.createOscillator();
            this.audioNodes.phiOscillator.type = 'sine';
            
            // Calculate phi-harmonic frequencies based on the Creation State
            // phi^2 = 2.618033988749895 × 528 Hz ≈ 1382.3 Hz
            const phiSquared = 2.618033988749895;
            this.audioNodes.phiOscillator.frequency.value = 528 * phiSquared;
            
            // Create gain nodes for volume control
            this.audioNodes.baseGain = this.audioContext.createGain();
            this.audioNodes.baseGain.gain.value = 0.1; // Start quiet
            
            this.audioNodes.phiGain = this.audioContext.createGain();
            this.audioNodes.phiGain.gain.value = 0.06; // Slightly quieter than base
            
            // Master gain control
            this.audioNodes.masterGain = this.audioContext.createGain();
            this.audioNodes.masterGain.gain.value = 0; // Start silent
            
            // Create analyzer for visualizations
            this.audioNodes.analyser = this.audioContext.createAnalyser();
            this.audioNodes.analyser.fftSize = 2048;
            this.audioNodes.analyser.smoothingTimeConstant = 0.85;
            
            // Connect oscillators to their gain nodes
            this.audioNodes.baseOscillator.connect(this.audioNodes.baseGain);
            this.audioNodes.phiOscillator.connect(this.audioNodes.phiGain);
            
            // Connect gain nodes to master gain
            this.audioNodes.baseGain.connect(this.audioNodes.masterGain);
            this.audioNodes.phiGain.connect(this.audioNodes.masterGain);
            
            // Connect master gain to analyzer and destination
            this.audioNodes.masterGain.connect(this.audioNodes.analyser);
            this.audioNodes.masterGain.connect(this.audioContext.destination);
            
            // Initialize DNAResonator if enabled
            if (this.config.enableDNAResonator !== false) {
                try {
                    // Initialize with phi-harmonic configuration
                    const dnaConfig = {
                        baseFrequency: 528, // Creation State φ¹
                        phiRatio: 1.618033988749895, // φ
                        phiSquared: 2.618033988749895, // φ²
                        phiToPhi: 4.236067977499790, // φ^φ
                        resonanceFactor: this.config.resonanceFactor || 0.75
                    };
                    
                    this.dnaResonator = new DNAResonator(this.audioContext, dnaConfig);
                    
                    // Connect DNA Resonator output to master gain
                    if (this.dnaResonator.outputNode) {
                        this.dnaResonator.outputNode.connect(this.audioNodes.masterGain);
                    }
                    
                    console.log('CreationStateExperience: DNA Resonator initialized successfully');
                } catch (error) {
                    console.warn('CreationStateExperience: Failed to initialize DNA Resonator', error);
                    this.dnaResonator = null;
                }
            }
            
            // Start oscillators (they'll be silent due to 0 master gain)
            this.audioNodes.baseOscillator.start();
            this.audioNodes.phiOscillator.start();
            
            this.state.isAudioInitialized = true;
        } catch (error) {
            console.error('CreationStateExperience: Audio initialization failed', error);
            this.state.audioError = error.message;
        }
    }
    
    /**
     * Initialize components
     * @private
     */
    _initComponents() {
        // Initialize Flower of Life Visualizer if enabled
        if (this.config.flowerOfLifeEnabled && this.ctx) {
            try {
                // Check if FlowerOfLifeVisualizer is available globally
                if (typeof FlowerOfLifeVisualizer === 'function') {
                    this.flowerOfLifeVisualizer = new FlowerOfLifeVisualizer({
                        ctx: this.ctx,
                        frequency: this.config.frequency,
                        zenPointBalance: this.config.zenPointBalance
                    });
                } else {
                    // Create minimal placeholder implementation
                    this.flowerOfLifeVisualizer = {
                        update: (deltaTime, audioData) => {
                            // Simple placeholder implementation
                        },
                        render: () => {
                            if (this.ctx) {
                                this._drawPlaceholderFlowerOfLife();
                            }
                        },
                        setIntention: () => { return this; },
                        getCoherenceFactor: () => 0.5,
                        triggerRipple: () => { return this; },
                        updateFocusPoint: () => { return this; },
                        destroy: () => { }
                    };
                }
            } catch (error) {
                console.warn('CreationStateExperience: Could not initialize Flower of Life Visualizer', error);
                // Create minimal placeholder implementation
                this.flowerOfLifeVisualizer = {
                    update: () => { },
                    render: () => {
                        if (this.ctx) {
                            this._drawPlaceholderFlowerOfLife();
                        }
                    },
                    setIntention: () => { return this; },
                    getCoherenceFactor: () => 0.5,
                    triggerRipple: () => { return this; },
                    updateFocusPoint: () => { return this; },
                    destroy: () => { }
                };
            }
        }
        
        // Initialize Pattern Recognition System if enabled
        if (this.config.patternRecognitionEnabled && this.ctx) {
            try {
                // Check if PatternRecognitionSystem is available globally
                if (typeof PatternRecognitionSystem === 'function') {
                    this.patternRecognitionSystem = new PatternRecognitionSystem({
                        ctx: this.ctx,
                        frequency: this.config.frequency,
                        zenPointBalance: this.config.zenPointBalance
                    });
                } else {
                    // Create minimal placeholder implementation
                    this.patternRecognitionSystem = {
                        update: (deltaTime, audioData) => {
                            // Simple placeholder implementation
                        },
                        render: () => {
                            if (this.ctx) {
                                this._drawPlaceholderPatternRecognition();
                            }
                        },
                        setIntention: () => { return this; },
                        getCoherenceFactor: () => 0.5,
                        getSynchronizationFactor: () => 0.5,
                        destroy: () => { }
                    };
                }
            } catch (error) {
                console.warn('CreationStateExperience: Could not initialize Pattern Recognition System', error);
                // Create minimal placeholder implementation
                this.patternRecognitionSystem = {
                    update: () => { },
                    render: () => {
                        if (this.ctx) {
                            this._drawPlaceholderPatternRecognition();
                        }
                    },
                    setIntention: () => { return this; },
                    getCoherenceFactor: () => 0.5,
                    getSynchronizationFactor: () => 0.5,
                    destroy: () => { }
                };
            }
        }
        
        // Initialize Breath Synchronizer if enabled
        if (this.config.breathSyncEnabled) {
            try {
                // Check if BreathSynchronizer is available globally
                if (typeof BreathSynchronizer === 'function') {
                    this.breathSynchronizer = new BreathSynchronizer({
                        baseFrequency: this.config.frequency,
                        zenPointBalance: this.config.zenPointBalance
                    });
                } else {
                    // Create minimal placeholder implementation
                    this.breathSynchronizer = {
                        start: () => { return this; },
                        stop: () => { return this; },
                        getState: () => ({ phase: 'rest', progress: 0 }),
                        getCoherenceFactor: () => 0.5,
                        setZenPointBalance: () => { return this; },
                        destroy: () => { }
                    };
                }
            } catch (error) {
                console.warn('CreationStateExperience: Could not initialize Breath Synchronizer', error);
                // Create minimal placeholder implementation
                this.breathSynchronizer = {
                    start: () => { return this; },
                    stop: () => { return this; },
                    getState: () => ({ phase: 'rest', progress: 0 }),
                    getCoherenceFactor: () => 0.5,
                    setZenPointBalance: () => { return this; },
                    destroy: () => { }
                };
            }
        }
        
        // Initialize DNA Resonator if enabled
        if (this.config.dnaResonanceEnabled && this.audioContext) {
            try {
                // Check if DNAResonator is available globally
                if (typeof DNAResonator === 'function') {
                    this.dnaResonator = new DNAResonator(this.audioContext, {
                        baseFrequency: this.config.frequency,
                        zenPointBalance: this.config.zenPointBalance
                    });
                    
                    // Connect to master gain
                    if (this.audioNodes.masterGain) {
                        this.dnaResonator.connect(this.audioNodes.masterGain);
                    }
                }
            } catch (error) {
                console.warn('CreationStateExperience: Could not initialize DNA Resonator', error);
            }
        }
    }
    
    /**
     * Start the Creation State experience
     * @returns {CreationStateExperience} This instance for chaining
     */
    start() {
        if (this.state.isActive) {
            return this;
        }
        
        this.state.isActive = true;
        
        // Start audio if enabled
        if (this.config.audioEnabled && this.audioContext) {
            try {
                // Resume audio context if suspended
                if (this.audioContext.state === 'suspended') {
                    this.audioContext.resume();
                }
                
                // Start oscillators
                if (this.audioNodes.baseOscillator && this.audioNodes.masterGain) {
                    this.audioNodes.baseOscillator.start();
                    
                    // Start harmonic oscillators
                    this.audioNodes.harmonics.forEach(osc => {
                        if (osc && typeof osc.start === 'function') {
                            osc.start();
                        }
                    });
                    
                    // Fade in master gain
                    const now = this.audioContext.currentTime;
                    this.audioNodes.masterGain.gain.setValueAtTime(0, now);
                    this.audioNodes.masterGain.gain.linearRampToValueAtTime(0.3, now + 1.5);
                }
            } catch (error) {
                console.warn('CreationStateExperience: Error starting audio', error);
            }
        }
        
        // Start breath synchronizer
        if (this.breathSynchronizer && typeof this.breathSynchronizer.start === 'function') {
            try {
                this.breathSynchronizer.start();
            } catch (error) {
                console.warn('CreationStateExperience: Error starting breath synchronizer', error);
            }
        }
        
        // Start DNA Resonator
        if (this.dnaResonator && typeof this.dnaResonator.start === 'function') {
            try {
                this.dnaResonator.start();
            } catch (error) {
                console.warn('CreationStateExperience: Error starting DNA Resonator', error);
            }
        }
        
        // Initialize ascension state
        this.state.ascensionReady = false;
        
        // Start animation loop for visualizations
        this._startAnimationLoop();
        
        return this;
    }
    
    /**
     * Stop the Creation State experience
     * @returns {CreationStateExperience} This instance for chaining
     */
    stop() {
        if (!this.state.isActive) {
            return this;
        }
        
        this.state.isActive = false;
        
        // Stop audio
        if (this.audioContext && this.audioNodes.masterGain) {
            try {
                // Fade out master gain
                const now = this.audioContext.currentTime;
                this.audioNodes.masterGain.gain.linearRampToValueAtTime(
                    0, 
                    now + 0.5
                );
                
                // Stop oscillators after fade out
                setTimeout(() => {
                    try {
                        if (this.audioNodes.baseOscillator && typeof this.audioNodes.baseOscillator.stop === 'function') {
                            this.audioNodes.baseOscillator.stop();
                        }
                        
                        // Stop harmonic oscillators
                        this.audioNodes.harmonics.forEach(osc => {
                            if (osc && typeof osc.stop === 'function') {
                                osc.stop();
                            }
                        });
                    } catch (stopError) {
                        console.warn('CreationStateExperience: Error stopping oscillators', stopError);
                    }
                }, 600);
            } catch (error) {
                console.warn('CreationStateExperience: Error stopping audio', error);
            }
        }
        
        // Stop breath synchronizer
        if (this.breathSynchronizer && typeof this.breathSynchronizer.stop === 'function') {
            try {
                this.breathSynchronizer.stop();
            } catch (error) {
                console.warn('CreationStateExperience: Error stopping breath synchronizer', error);
            }
        }
        
        // Stop DNA Resonator
        if (this.dnaResonator && typeof this.dnaResonator.stop === 'function') {
            try {
                this.dnaResonator.stop();
            } catch (error) {
                console.warn('CreationStateExperience: Error stopping DNA Resonator', error);
            }
        }
        
        // Stop animation frame
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        
        return this;
    }
    
    /**
     * Start the animation loop
     * @private
     */
    _startAnimationLoop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Local variables for animation loop
        let audioData = null;
        const animate = () => {
            if (!this.state.isActive) {
                return;
            }
            
            // Calculate time delta for animations
            const now = performance.now();
            const deltaTime = now - (this.lastFrameTime || now);
            this.lastFrameTime = now;
            
            // Get audio data if available
            if (this.audioNodes.analyser) {
                try {
                    // Create data array if needed
                    if (!audioData) {
                        audioData = new Uint8Array(this.audioNodes.analyser.frequencyBinCount);
                    }
                    
                    // Get current frequency data
                    this.audioNodes.analyser.getByteFrequencyData(audioData);
                } catch (error) {
                    console.warn('CreationStateExperience: Error getting audio data', error);
                    audioData = null;
                }
            }
            
            // Update metrics and components
            try {
                // Calculate overall coherence
                const currentCoherence = this._calculateCoherence();
                
                // Update components with current state
                this._updateComponents();
                
                // Adjust audio based on coherence
                if (this.audioNodes.masterGain && this.audioContext) {
                    // Scale master gain based on coherence (0.1 - 0.5)
                    const targetGain = 0.1 + currentCoherence * 0.4;
                    
                    // Smooth transition
                    const now = this.audioContext.currentTime;
                    this.audioNodes.masterGain.gain.linearRampToValueAtTime(
                        targetGain, 
                        now + 0.5
                    );
                }
            } catch (error) {
                console.warn('CreationStateExperience: Error in animation loop', error);
            }
            
            // Continue animation loop
            this.animationFrame = requestAnimationFrame(animate);
        };
        
        // Start animation loop
        this.animationFrame = requestAnimationFrame(animate);
    }
    
    /**
     * Update components
     * @private
     */
    _updateComponents() {
        // Update Flower of Life visualization
        if (this.flowerOfLifeVisualizer && typeof this.flowerOfLifeVisualizer.update === 'function') {
            try {
                this.flowerOfLifeVisualizer.update({
                    intention: {
                        strength: this.state.intentionStrength,
                        focus: this.state.intentionFocus,
                        clarity: this.state.intentionClarity
                    },
                    breathCycle: this.breathSynchronizer ? this.breathSynchronizer.getState() : { phase: 'rest', progress: 0 },
                    coherenceLevel: this.metrics.intentionClarity
                });
                
                if (this.ctx) {
                    this.flowerOfLifeVisualizer.render();
                }
            } catch (error) {
                console.warn('Error updating Flower of Life visualizer:', error);
            }
        }
        
        // Update Pattern Recognition system
        if (this.patternRecognitionSystem && typeof this.patternRecognitionSystem.update === 'function') {
            try {
                this.patternRecognitionSystem.update({
                    intention: {
                        strength: this.state.intentionStrength,
                        focus: this.state.intentionFocus,
                        clarity: this.state.intentionClarity
                    },
                    coherenceLevel: this.metrics.patternStability,
                    phase: this.state.currentBreathPhase
                });
                
                if (this.ctx) {
                    this.patternRecognitionSystem.render();
                }
            } catch (error) {
                console.warn('Error updating Pattern Recognition system:', error);
            }
        }
        
        // Update DNA Resonator
        if (this.dnaResonator && typeof this.dnaResonator.update === 'function') {
            try {
                // Extract audio data from analyzer if available
                let audioData = null;
                if (this.audioNodes.analyser) {
                    audioData = new Uint8Array(this.audioNodes.analyser.frequencyBinCount);
                    this.audioNodes.analyser.getByteFrequencyData(audioData);
                }
                
                this.dnaResonator.update({
                    intention: {
                        strength: this.state.intentionStrength,
                        focus: this.state.intentionFocus,
                        clarity: this.state.intentionClarity
                    },
                    coherenceLevel: this.metrics.phiResonance,
                    zenPointBalance: this.config.zenPointBalance,
                    audioData: audioData
                });
            } catch (error) {
                console.warn('Error updating DNA Resonator:', error);
            }
        }
        
        // Update Breath Synchronizer
        if (this.breathSynchronizer && typeof this.breathSynchronizer.update === 'function') {
            try {
                this.breathSynchronizer.update({
                    zenPointBalance: this.config.zenPointBalance,
                    coherenceLevel: this.metrics.breathSynchronization
                });
                
                // Update current breath phase from breath synchronizer
                if (this.breathSynchronizer.getState) {
                    const breathState = this.breathSynchronizer.getState();
                    if (breathState && breathState.phase) {
                        this.state.currentBreathPhase = breathState.phase;
                    }
                }
            } catch (error) {
                console.warn('Error updating Breath Synchronizer:', error);
            }
        }
    }
    
    /**
     * Calculate coherence level based on all components
     * @private
     */
    _calculateCoherence() {
        // Start with base coherence from ZEN POINT balance
        const zenBalanceCoherence = this._calculateZenBalanceCoherence();
        let totalCoherence = zenBalanceCoherence;
        let factors = 1; // Count of factors contributing to coherence
        
        // Get breath synchronizer coherence
        if (this.breathSynchronizer && typeof this.breathSynchronizer.getCoherenceFactor === 'function') {
            try {
                const breathCoherence = this.breathSynchronizer.getCoherenceFactor();
                if (typeof breathCoherence === 'number' && !isNaN(breathCoherence)) {
                    totalCoherence += breathCoherence;
                    factors++;
                    
                    // Update breath synchronization metric
                    this.metrics.breathSynchronization = breathCoherence;
                }
            } catch (error) {
                console.warn('Error getting breath coherence factor:', error);
            }
        }
        
        // Get pattern recognition coherence
        if (this.patternRecognitionSystem && typeof this.patternRecognitionSystem.getCoherenceFactor === 'function') {
            try {
                const patternCoherence = this.patternRecognitionSystem.getCoherenceFactor();
                if (typeof patternCoherence === 'number' && !isNaN(patternCoherence)) {
                    totalCoherence += patternCoherence;
                    factors++;
                    
                    // Update pattern stability metric
                    this.metrics.patternStability = patternCoherence;
                }
            } catch (error) {
                console.warn('Error getting pattern coherence factor:', error);
            }
        }
        
        // Get flower of life coherence
        if (this.flowerOfLifeVisualizer && typeof this.flowerOfLifeVisualizer.getCoherenceFactor === 'function') {
            try {
                const flowerCoherence = this.flowerOfLifeVisualizer.getCoherenceFactor();
                if (typeof flowerCoherence === 'number' && !isNaN(flowerCoherence)) {
                    totalCoherence += flowerCoherence;
                    factors++;
                    
                    // Update intention clarity metric (primarily driven by flower of life)
                    this.metrics.intentionClarity = flowerCoherence;
                }
            } catch (error) {
                console.warn('Error getting flower of life coherence factor:', error);
            }
        }
        
        // Get DNA resonator coherence
        if (this.dnaResonator && typeof this.dnaResonator.getCoherenceFactor === 'function') {
            try {
                const dnaCoherence = this.dnaResonator.getCoherenceFactor();
                if (typeof dnaCoherence === 'number' && !isNaN(dnaCoherence)) {
                    totalCoherence += dnaCoherence;
                    factors++;
                    
                    // Update phi resonance metric
                    this.metrics.phiResonance = dnaCoherence;
                }
            } catch (error) {
                console.warn('Error getting DNA resonator coherence factor:', error);
            }
        }
        
        // Update zen balance metric
        this.metrics.zenBalance = zenBalanceCoherence;
        
        // Calculate average coherence
        const avgCoherence = factors > 0 ? totalCoherence / factors : 0.5;
        
        // Check for ascension readiness
        // Creation State (ϕ¹) to Heart Field (ϕ²) transition at 594 Hz
        if (avgCoherence >= 0.8 && !this.state.ascensionReady) {
            this.state.ascensionReady = true;
            
            try {
                // Dispatch event to notify of ascension readiness
                document.dispatchEvent(new CustomEvent('ascension-ready', {
                    detail: {
                        experience: 'creation-state',
                        coherenceLevel: avgCoherence,
                        fromState: 'creation',
                        toState: 'heart',
                        fromFrequency: 528, // Creation state (ϕ¹)
                        toFrequency: 594    // Heart field (ϕ²)
                    }
                }));
            } catch (error) {
                console.warn('Error dispatching ascension-ready event:', error);
            }
        } else if (avgCoherence < 0.75 && this.state.ascensionReady) {
            // Reset ascension readiness if coherence drops below threshold
            this.state.ascensionReady = false;
        }
        
        return avgCoherence;
    }
    
    /**
     * Calculate ZEN POINT balance coherence factor
     * @returns {Number} Coherence factor from 0-1
     * @private
     */
    _calculateZenBalanceCoherence() {
        const { quantum, human } = this.config.zenPointBalance;
        
        // Perfect balance for Creation State is 0.5/0.5
        const quantumDeviation = Math.abs(quantum - 0.5);
        const humanDeviation = Math.abs(human - 0.5);
        
        // Total deviation from perfect balance
        const totalDeviation = quantumDeviation + humanDeviation;
        
        // Convert to coherence factor (0-1)
        return Math.max(0, 1 - totalDeviation * 2);
    }
    
    /**
     * Set intention for the Creation State experience
     * @param {Object} intention - Intention configuration
     * @param {Number} [intention.strength] - Intention strength (0-1)
     * @param {Number} [intention.focus] - Intention focus (0-1)
     * @param {Number} [intention.clarity] - Intention clarity (0-1)
     * @returns {CreationStateExperience} This instance for chaining
     */
    setIntention(intention) {
        // Update intention field
        this.state.intentionStrength = intention.strength || this.state.intentionStrength;
        this.state.intentionFocus = intention.focus || this.state.intentionFocus;
        this.state.intentionClarity = intention.clarity || this.state.intentionClarity;
        
        return this;
    }
    
    /**
     * Set ZEN POINT balance
     * @param {Object} balance - ZEN POINT balance
     * @param {Number} balance.quantum - Quantum field balance (0-1)
     * @param {Number} balance.human - Human field balance (0-1)
     * @returns {CreationStateExperience} This instance for chaining
     */
    setZenPointBalance(balance) {
        // Update ZEN POINT balance
        this.config.zenPointBalance = balance;
        
        return this;
    }
    
    /**
     * Get current coherence level
     * @returns {Number} Coherence level (0-1)
     */
    getCoherenceLevel() {
        return this.metrics.intentionClarity;
    }
    
    /**
     * Clean up resources
     */
    destroy() {
        // Stop experience if active
        if (this.state.isActive) {
            this.stop();
        }
        
        // Stop and disconnect audio nodes
        if (this.audioContext) {
            Object.values(this.audioNodes).forEach(node => {
                if (node.stop) node.stop();
                if (node.disconnect) node.disconnect();
            });
            
            // Close audio context
            this.audioContext.close();
        }
        
        // Destroy components
        if (this.flowerOfLifeVisualizer && typeof this.flowerOfLifeVisualizer.destroy === 'function') {
            this.flowerOfLifeVisualizer.destroy();
        }
        
        if (this.patternRecognitionSystem && typeof this.patternRecognitionSystem.destroy === 'function') {
            this.patternRecognitionSystem.destroy();
        }
        
        if (this.breathSynchronizer && typeof this.breathSynchronizer.destroy === 'function') {
            this.breathSynchronizer.destroy();
        }
        
        if (this.dnaResonator && typeof this.dnaResonator.destroy === 'function') {
            this.dnaResonator.destroy();
        }
        
        // Remove event listeners
        window.removeEventListener('resize', () => {
            if (this.config.container && this.canvas) {
                const rect = this.config.container.getBoundingClientRect();
                this.canvas.width = rect.width;
                this.canvas.height = rect.height;
            }
        });
        
        if (this.canvas) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
    
    /**
     * Draw placeholder Flower of Life pattern
     * @private
     */
    _drawPlaceholderFlowerOfLife() {
        if (!this.ctx) return;
        
        const canvas = this.ctx.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.45;
        
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.lineWidth = 1;
        
        // Draw outer circle
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Draw inner circles
        const petals = 6;
        const petalRadius = radius / 2;
        
        for (let i = 0; i < petals; i++) {
            const angle = (Math.PI * 2 / petals) * i;
            const x = centerX + Math.cos(angle) * petalRadius;
            const y = centerY + Math.sin(angle) * petalRadius;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, petalRadius, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }
    
    /**
     * Draw placeholder Pattern Recognition visual
     * @private
     */
    _drawPlaceholderPatternRecognition() {
        if (!this.ctx) return;
        
        const canvas = this.ctx.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const size = Math.min(canvas.width, canvas.height) * 0.4;
        
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(200, 255, 200, 0.4)';
        this.ctx.lineWidth = 1;
        
        // Draw spiral pattern
        this.ctx.beginPath();
        const turns = 5;
        const pointsPerTurn = 20;
        const totalPoints = turns * pointsPerTurn;
        const PHI = 1.618033988749895;
        
        for (let i = 0; i <= totalPoints; i++) {
            const progress = i / totalPoints;
            const angle = turns * progress * Math.PI * 2;
            const radius = size * progress * 0.95;
            
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        this.ctx.stroke();
        
        // Draw a few connecting lines to create a network appearance
        this.ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle1 = Math.random() * Math.PI * 2;
            const angle2 = Math.random() * Math.PI * 2;
            const radius1 = Math.random() * size * 0.9;
            const radius2 = Math.random() * size * 0.9;
            
            const x1 = centerX + Math.cos(angle1) * radius1;
            const y1 = centerY + Math.sin(angle1) * radius1;
            const x2 = centerX + Math.cos(angle2) * radius2;
            const y2 = centerY + Math.sin(angle2) * radius2;
            
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
        }
        
        this.ctx.stroke();
        this.ctx.restore();
    }
}

// Export the class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CreationStateExperience;
} else {
    window.CreationStateExperience = CreationStateExperience;
}
