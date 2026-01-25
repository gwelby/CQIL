/**
 * AntikytheraQuantumMechanism.js
 * A phi-harmonic enhanced visualization of the ancient Antikythera Mechanism
 * Integrates with quantum experience components for a multidimensional experience
 */

class AntikytheraQuantumMechanism {
    // Phi constant and its powers - used throughout for resonant proportions
    static PHI = 1.618033988749895;
    static PHI_SQUARED = 2.618033988749895;
    static PHI_CUBED = 4.236067977499790;
    
    // Creation frequency - aligned with Creation State experience (528 Hz)
    static CREATION_FREQUENCY = 528;
    
    // Astronomical constants
    static EARTH_YEAR_DAYS = 365.2421897; // Julian year in days
    static METONIC_CYCLE_YEARS = 19;
    static SAROS_CYCLE_DAYS = 6585.3213;  // Eclipse cycle
    
    /**
     * Constructor for the Antikythera Quantum Mechanism
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        // Default configuration
        this.config = {
            container: null,              // DOM element to contain the visualization
            width: 800,                   // Default width
            height: 600,                  // Default height
            enableAudio: true,            // Enable audio resonance
            enableQuantumEffects: true,   // Enable quantum visual effects
            enableCrossSection: false,    // Show cross-section view
            theme: 'ancient',             // Visual theme ('ancient', 'quantum', 'hybrid')
            startDate: new Date(),        // Initial date to display
            autoRotate: false,            // Auto-rotation of mechanism
            rotationSpeed: 1,             // Days per second when auto-rotating
            audioContext: null,           // WebAudio context (will create if null)
            dnaResonator: null,           // Optional DNA Resonator component
            flowerOfLifeVisualizer: null, // Optional Flower of Life Visualizer
            debugMode: false              // Enable debug information
        };
        
        // Apply user options
        Object.assign(this.config, options);
        
        // State tracking
        this.state = {
            isInitialized: false,
            isActive: false,
            isAnimating: false,
            currentDate: new Date(this.config.startDate),
            lastUpdateTime: 0,
            animationFrame: null,
            coherence: 0.5,               // Quantum coherence level (0-1)
            intentionFocus: 0.5,          // User intention focus (0-1)
            celestialAlignment: 0,        // Current alignment strength (0-1)
            currentView: 'front',         // Current view ('front', 'back', 'cross-section')
            orbitScale: 1,                // Scale factor for orbital displays
            metonicYear: 0,               // Current year in Metonic cycle
            eclipseData: null,            // Current eclipse predictions
            zodiacSignsVisible: true,     // Show zodiac signs
            phiHarmonicVisible: false,    // Show phi-harmonic relationships
            errorState: null              // Error state if any
        };
        
        // 3D objects and scenes
        this.threeD = {
            scene: null,
            camera: null,
            renderer: null,
            controls: null,
            lights: [],
            gears: [],
            dials: [],
            pointers: [],
            labels: [],
            particles: null,
            resonanceField: null
        };
        
        // Audio nodes
        this.audioNodes = {
            context: null,
            masterGain: null,
            oscillators: [],
            resonators: [],
            analyser: null
        };
        
        // DOM elements
        this.elements = {
            container: null,
            canvas: null,
            infoDisplay: null,
            controlPanel: null,
            dateDisplay: null,
            celestialInfo: null
        };
        
        // Astronomical calculation engine
        this.astronomy = {
            positions: {},           // Current celestial positions
            ephemeris: {},           // Ephemeris data
            eclipses: []             // Eclipse predictions
        };
        
        // Initialize if container provided
        if (this.config.container) {
            this.init();
        }
    }
    
    /**
     * Initialize the mechanism
     * @public
     */
    init() {
        if (this.state.isInitialized) {
            return;
        }
        
        try {
            // Handle string container selector
            if (typeof this.config.container === 'string') {
                this.config.container = document.querySelector(this.config.container);
            }
            
            if (!this.config.container) {
                throw new Error('Valid container element is required');
            }
            
            this.elements.container = this.config.container;
            
            // Initialize components
            this._initDOMElements();
            this._initThreeJS();
            this._initMechanism();
            this._initAudio();
            this._initEventListeners();
            
            // Calculate initial state
            this._updateAstronomicalCalculations();
            this._updateMechanismState();
            
            // Mark as initialized
            this.state.isInitialized = true;
            
            // Start animation loop if auto-rotate is enabled
            if (this.config.autoRotate) {
                this.start();
            } else {
                // Still render once to show initial state
                this._renderScene();
            }
            
            console.log('AntikytheraQuantumMechanism: Initialized successfully');
        } catch (error) {
            console.error('AntikytheraQuantumMechanism: Initialization failed', error);
            this.state.errorState = error.message;
        }
    }
    
    /**
     * Start the mechanism animation
     * @public
     */
    start() {
        if (!this.state.isInitialized) {
            this.init();
        }
        
        if (this.state.isActive) {
            return;
        }
        
        this.state.isActive = true;
        this.state.isAnimating = this.config.autoRotate;
        
        // Start audio if enabled
        if (this.config.enableAudio) {
            this._startAudio();
        }
        
        // Start animation loop
        this._startAnimationLoop();
        
        console.log('AntikytheraQuantumMechanism: Started');
    }
    
    /**
     * Stop the mechanism animation
     * @public
     */
    stop() {
        if (!this.state.isActive) {
            return;
        }
        
        this.state.isActive = false;
        this.state.isAnimating = false;
        
        // Stop animation frame
        if (this.state.animationFrame) {
            cancelAnimationFrame(this.state.animationFrame);
            this.state.animationFrame = null;
        }
        
        // Stop audio
        this._stopAudio();
        
        console.log('AntikytheraQuantumMechanism: Stopped');
    }
    
    /**
     * Set the current date
     * @param {Date} date - New date to set
     * @public
     */
    setDate(date) {
        this.state.currentDate = new Date(date);
        this._updateAstronomicalCalculations();
        this._updateMechanismState();
        this._renderScene();
        
        // Update info displays
        this._updateInfoDisplays();
    }
    
    /**
     * Modify the current date by a number of days
     * @param {Number} days - Days to add (can be negative)
     * @public
     */
    modifyDateByDays(days) {
        const newDate = new Date(this.state.currentDate);
        newDate.setDate(newDate.getDate() + days);
        this.setDate(newDate);
    }
    
    /**
     * Toggle auto-rotation of the mechanism
     * @returns {Boolean} - New animation state
     * @public
     */
    toggleAnimation() {
        this.state.isAnimating = !this.state.isAnimating;
        return this.state.isAnimating;
    }
    
    /**
     * Change the current view of the mechanism
     * @param {String} view - View type ('front', 'back', 'cross-section') 
     * @public
     */
    changeView(view) {
        if (['front', 'back', 'cross-section'].includes(view)) {
            this.state.currentView = view;
            this._updateCameraPosition();
            this._renderScene();
        }
    }
    
    /**
     * Set visibility of zodiac signs
     * @param {Boolean} visible - Whether zodiac signs should be visible
     * @public
     */
    setZodiacVisible(visible) {
        this.state.zodiacSignsVisible = visible;
        this._updateVisibility();
        this._renderScene();
    }
    
    /**
     * Set visibility of phi-harmonic relationships
     * @param {Boolean} visible - Whether phi-harmonic relationships should be visible
     * @public
     */
    setPhiHarmonicVisible(visible) {
        this.state.phiHarmonicVisible = visible;
        this._updateVisibility();
        this._renderScene();
    }
    
    /**
     * Apply a burst of user intention to the mechanism
     * @param {Number} strength - Strength of intention (0-1)
     * @param {Number} x - X coordinate of intention focus (normalized 0-1)
     * @param {Number} y - Y coordinate of intention focus (normalized 0-1)
     * @public
     */
    applyIntention(strength, x, y) {
        this.state.intentionFocus = Math.min(1, Math.max(0, strength));
        
        // Create a ripple effect at the focus point
        if (this.threeD.resonanceField) {
            // Implementation will be in the _createResonanceRipple method
            this._createResonanceRipple(x, y, strength);
        }
        
        // Adjust audio based on intention if audio enabled
        if (this.config.enableAudio && this.audioNodes.masterGain) {
            const gain = 0.2 + (strength * 0.6); // Scale 0.2-0.8
            this.audioNodes.masterGain.gain.linearRampToValueAtTime(
                gain,
                this.audioNodes.context.currentTime + 0.1
            );
        }
        
        // Connect with DNA Resonator if available
        if (this.config.dnaResonator && typeof this.config.dnaResonator.applyIntention === 'function') {
            this.config.dnaResonator.applyIntention({
                strength: strength,
                focus: 0.5 + (strength * 0.5),
                clarity: 0.7
            });
        }
    }
    
    /**
     * Resize the mechanism to fit its container
     * @public
     */
    resize() {
        if (!this.state.isInitialized || !this.elements.container) {
            return;
        }
        
        const rect = this.elements.container.getBoundingClientRect();
        this.config.width = rect.width;
        this.config.height = rect.height;
        
        // Update THREE.js renderer size
        if (this.threeD.renderer && this.threeD.camera) {
            this.threeD.renderer.setSize(this.config.width, this.config.height);
            
            // Update camera aspect ratio
            if (this.threeD.camera.isPerspectiveCamera) {
                this.threeD.camera.aspect = this.config.width / this.config.height;
                this.threeD.camera.updateProjectionMatrix();
            }
        }
        
        // Re-render scene
        this._renderScene();
    }
    
    /**
     * Clean up and destroy the mechanism instance
     * @public
     */
    destroy() {
        // Stop any ongoing animations
        this.stop();
        
        // Remove event listeners
        window.removeEventListener('resize', this._boundResizeHandler);
        
        // Dispose of Three.js resources
        if (this.threeD.scene) {
            this._disposeThreeJSResources(this.threeD.scene);
        }
        
        // Clean up audio nodes
        this._cleanupAudio();
        
        // Remove DOM elements
        if (this.elements.canvas && this.elements.canvas.parentNode) {
            this.elements.canvas.parentNode.removeChild(this.elements.canvas);
        }
        
        if (this.elements.infoDisplay && this.elements.infoDisplay.parentNode) {
            this.elements.infoDisplay.parentNode.removeChild(this.elements.infoDisplay);
        }
        
        if (this.elements.controlPanel && this.elements.controlPanel.parentNode) {
            this.elements.controlPanel.parentNode.removeChild(this.elements.controlPanel);
        }
        
        // Clear reference to container
        this.elements.container = null;
        
        console.log('AntikytheraQuantumMechanism: Destroyed');
    }
    
    // Private methods will be implemented in antikythera-mechanism-core.js

}

// Export the class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AntikytheraQuantumMechanism };
} else {
    window.AntikytheraQuantumMechanism = AntikytheraQuantumMechanism;
}
