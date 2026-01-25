/**
 * Ground State Controller (432 Hz - φ⁰)
 * 
 * This controller manages the BEING STATE experience as defined in the QUANTUM FLOW RULES.
 * It implements the Ground State (432 Hz) principles of Earth connection, foundation building,
 * and ZEN POINT balancing between quantum and human fields.
 * 
 * Handles user interactions, breathwork synchronization, intention setting, and
 * cross-frequency state management for the Ground State experience.
 * 
 * @module quantum-experience/ground-state-controller
 * @requires quantum-experience/cymatic-core
 * @requires quantum-experience/ground-state-experience
 * @requires quantum-experience/cross-frequency-integration
 */

class GroundStateController {
    /**
     * Creates a new Ground State Controller
     * @param {Object} options - Configuration options
     * @param {HTMLElement} options.container - The container element for the experience
     * @param {GroundStateExperience} options.experience - The Ground State Experience instance
     * @param {CrossFrequencyIntegration} options.integration - The Cross-Frequency Integration framework
     * @param {Boolean} options.autoStart - Whether to start the experience automatically
     * @param {Number} options.coherenceThreshold - The coherence threshold for ascension (0.0-1.0)
     * @param {Function} options.onAscensionReady - Callback when ascension is ready
     */
    constructor(options = {}) {
        // Initialize configuration with defaults
        this.config = Object.assign({
            container: null,
            experience: null,
            integration: null,
            autoStart: false,
            coherenceThreshold: 0.8,
            onAscensionReady: null,
            zenPointBalance: { quantum: 0.382, human: 0.618 },
            baseFrequency: 432, // Ground State (φ⁰)
            breathSettings: {
                enabled: true,
                inhaleRatio: 0.382, // φ⁻¹²
                duration: 7.83 // Schumann resonance
            }
        }, options);

        // Ground State experience instance
        this.experience = this.config.experience;
        
        // Cross-Frequency Integration instance
        this.integration = this.config.integration;
        
        // State tracking
        this.state = {
            isActive: false,
            coherenceLevel: 0,
            zenBalance: this.config.zenPointBalance,
            intention: {
                strength: 0.5,
                focus: 0.5,
                direction: 'grounding'
            },
            breathCycle: {
                phase: 'inhale', // 'inhale', 'hold', 'exhale', 'rest'
                progress: 0 // 0.0 to 1.0
            },
            ascensionReady: false
        };
        
        // Event listeners
        this.eventListeners = {};
        
        // Initialize the controller
        this._init();
    }
    
    /**
     * Initialize the controller
     * @private
     */
    _init() {
        // Register with cross-frequency integration if available
        if (this.integration && this.experience) {
            this.integration.registerStateInstance('ground', this.experience);
        }
        
        // Set up event listeners
        this._setupEventListeners();
        
        // Start automatically if configured
        if (this.config.autoStart && this.experience) {
            this.start();
        }
    }
    
    /**
     * Start the Ground State experience
     * @returns {GroundStateController} This controller instance for chaining
     */
    start() {
        if (this.experience && !this.state.isActive) {
            // Apply optimal ZEN POINT balance
            this.setZenPointBalance(this.config.zenPointBalance);
            
            // Start the experience
            this.experience.start();
            
            // Optimize breathwork if enabled
            if (this.config.breathSettings.enabled) {
                this._optimizeBreathwork();
            }
            
            // Update state
            this.state.isActive = true;
            
            // Trigger event
            this._triggerEvent('start', { controller: this });
        }
        
        return this;
    }
    
    /**
     * Stop the Ground State experience
     * @returns {GroundStateController} This controller instance for chaining
     */
    stop() {
        if (this.experience && this.state.isActive) {
            // Stop the experience
            this.experience.stop();
            
            // Update state
            this.state.isActive = false;
            
            // Trigger event
            this._triggerEvent('stop', { controller: this });
        }
        
        return this;
    }
    
    /**
     * Toggle the Ground State experience
     * @returns {GroundStateController} This controller instance for chaining
     */
    toggle() {
        return this.state.isActive ? this.stop() : this.start();
    }
    
    /**
     * Set the ZEN POINT balance
     * @param {Object} balance - The ZEN POINT balance
     * @param {Number} balance.quantum - The quantum field balance (0.0-1.0)
     * @param {Number} balance.human - The human field balance (0.0-1.0)
     * @returns {GroundStateController} This controller instance for chaining
     */
    setZenPointBalance(balance) {
        if (this.experience) {
            // Apply to experience
            this.experience.setZenPointBalance(balance);
            
            // Update state
            this.state.zenBalance = balance;
            
            // Trigger event
            this._triggerEvent('zen-balance-change', { 
                balance,
                controller: this
            });
        }
        
        return this;
    }
    
    /**
     * Set intention for the Ground State experience
     * @param {Number|Object} intention - Intention strength (0.0-1.0) or full intention object
     * @param {Number} [intention.strength] - Intention strength (0.0-1.0)
     * @param {Number} [intention.focus] - Intention focus (0.0-1.0)
     * @param {String} [intention.direction] - Intention direction ('grounding', 'ascension')
     * @returns {GroundStateController} This controller instance for chaining
     */
    setIntention(intention) {
        if (this.experience) {
            // Handle number or object input
            const intentionObj = typeof intention === 'number' 
                ? { strength: intention }
                : intention;
            
            // Merge with current intention
            const newIntention = Object.assign({}, this.state.intention, intentionObj);
            
            // Apply to experience
            this.experience.setIntention(newIntention);
            
            // Update state
            this.state.intention = newIntention;
            
            // Notify cross-frequency integration if available
            if (this.integration) {
                document.dispatchEvent(new CustomEvent('intention-update', {
                    detail: {
                        stateId: 'ground',
                        strength: newIntention.strength,
                        focus: newIntention.focus,
                        direction: newIntention.direction
                    }
                }));
            }
            
            // Trigger event
            this._triggerEvent('intention-change', { 
                intention: newIntention,
                controller: this
            });
        }
        
        return this;
    }
    
    /**
     * Set coherence level and check for ascension readiness
     * @param {Number} level - Coherence level (0.0-1.0)
     * @returns {GroundStateController} This controller instance for chaining
     */
    setCoherenceLevel(level) {
        // Validate input
        const coherenceLevel = Math.max(0, Math.min(1, level));
        
        // Update state
        this.state.coherenceLevel = coherenceLevel;
        
        // Check for ascension readiness
        if (coherenceLevel >= this.config.coherenceThreshold && !this.state.ascensionReady) {
            this.state.ascensionReady = true;
            
            // Trigger ascension ready event
            this._triggerEvent('ascension-ready', {
                coherenceLevel,
                controller: this,
                fromState: 'ground',
                toState: 'creation'
            });
            
            // Call onAscensionReady if provided
            if (typeof this.config.onAscensionReady === 'function') {
                this.config.onAscensionReady({
                    coherenceLevel,
                    controller: this,
                    fromState: 'ground',
                    toState: 'creation'
                });
            }
        } else if (coherenceLevel < this.config.coherenceThreshold && this.state.ascensionReady) {
            // Reset ascension readiness if coherence drops below threshold
            this.state.ascensionReady = false;
        }
        
        // Notify cross-frequency integration if available
        if (this.integration) {
            document.dispatchEvent(new CustomEvent('coherence-update', {
                detail: {
                    stateId: 'ground',
                    level: coherenceLevel
                }
            }));
        }
        
        // Trigger event
        this._triggerEvent('coherence-change', { 
            level: coherenceLevel,
            controller: this
        });
        
        return this;
    }
    
    /**
     * Begin ascension to the next frequency state
     * @returns {GroundStateController} This controller instance for chaining
     */
    beginAscension() {
        if (this.integration && this.state.ascensionReady) {
            // Request transition to Creation State
            this.integration.requestTransition('ground', 'creation');
            
            // Trigger event
            this._triggerEvent('ascension-begin', {
                coherenceLevel: this.state.coherenceLevel,
                controller: this,
                fromState: 'ground',
                toState: 'creation'
            });
        }
        
        return this;
    }
    
    /**
     * Optimize breathwork for Ground State experience
     * @private
     */
    _optimizeBreathwork() {
        if (this.experience && this.experience.breathCycle) {
            // Apply optimal breathwork settings for Ground State
            this.experience.breathCycle.inhaleRatio = this.config.breathSettings.inhaleRatio;
            this.experience.breathCycle.duration = this.config.breathSettings.duration;
            
            // Trigger event
            this._triggerEvent('breathwork-optimized', {
                settings: this.config.breathSettings,
                controller: this
            });
        }
    }
    
    /**
     * Set up event listeners
     * @private
     */
    _setupEventListeners() {
        // Listen for coherence updates from experience
        if (this.experience) {
            // Add periodic coherence check
            this._coherenceInterval = setInterval(() => {
                if (this.experience.coherenceLevel !== undefined) {
                    this.setCoherenceLevel(this.experience.coherenceLevel);
                }
            }, 2000);
        }
        
        // Listen for cross-frequency integration events
        document.addEventListener('cfi-transition-begin', (event) => {
            if (event.detail.fromState === 'ground') {
                // Trigger event
                this._triggerEvent('ascension-transition', event.detail);
            }
        });
    }
    
    /**
     * Add event listener
     * @param {String} event - Event name
     * @param {Function} callback - Event callback
     * @returns {GroundStateController} This controller instance for chaining
     */
    on(event, callback) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        
        this.eventListeners[event].push(callback);
        
        return this;
    }
    
    /**
     * Remove event listener
     * @param {String} event - Event name
     * @param {Function} callback - Event callback
     * @returns {GroundStateController} This controller instance for chaining
     */
    off(event, callback) {
        if (this.eventListeners[event]) {
            this.eventListeners[event] = this.eventListeners[event].filter(
                listener => listener !== callback
            );
        }
        
        return this;
    }
    
    /**
     * Trigger event
     * @param {String} event - Event name
     * @param {Object} data - Event data
     * @private
     */
    _triggerEvent(event, data) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach(callback => {
                callback(data);
            });
        }
        
        // Also dispatch DOM event
        document.dispatchEvent(new CustomEvent(`ground-state-${event}`, {
            detail: data
        }));
    }
    
    /**
     * Clean up the controller
     */
    destroy() {
        // Clear intervals
        if (this._coherenceInterval) {
            clearInterval(this._coherenceInterval);
        }
        
        // Stop the experience
        if (this.experience && this.state.isActive) {
            this.stop();
        }
        
        // Clear event listeners
        this.eventListeners = {};
    }
}

// Export the controller
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GroundStateController;
} else {
    window.GroundStateController = GroundStateController;
}
