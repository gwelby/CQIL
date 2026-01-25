/**
 * Quantum Translator Interface
 * 
 * Provides the user interface and integration layer for the Quantum Translator system,
 * connecting sound generation, cymatic visualization, and translation functionality.
 * 
 * Operating at ZEN POINT balance (φ⁻¹:φ)
 */

const QuantumInterface = {
    // Core components
    soundGenerator: null,
    cymaticPatterns: null,
    translationEngine: null,
    
    // Interface state
    initialized: false,
    currentView: 'translator', // translator, settings, insights
    zenBalanced: false,
    
    // DOM elements
    elements: {
        translator: null,
        settings: null,
        insights: null,
        sourceKingdom: null,
        targetKingdom: null,
        translationMethod: null,
        coherenceDisplay: null,
        startButton: null,
        stopButton: null,
        frequencyDisplay: null,
        cymaticCanvas: null,
        insightsContainer: null
    },
    
    /**
     * Initialize the Quantum Interface
     * @returns {Object} - This object for chaining
     */
    initialize() {
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.bindElements();
            this.initializeComponents();
            this.bindEvents();
            
            this.initialized = true;
            this.showView('translator');
            
            // Begin at Ground State (432 Hz) to establish foundation
            this.setGroundState();
            
            console.log('Quantum Interface initialized at Ground State (432 Hz)');
        });
        
        return this;
    },
    
    /**
     * Bind DOM elements to object properties
     */
    bindElements() {
        // Views
        this.elements.translator = document.getElementById('translator-view');
        this.elements.settings = document.getElementById('settings-view');
        this.elements.insights = document.getElementById('insights-view');
        
        // Controls
        this.elements.sourceKingdom = document.getElementById('source-kingdom');
        this.elements.targetKingdom = document.getElementById('target-kingdom');
        this.elements.translationMethod = document.getElementById('translation-method');
        this.elements.coherenceDisplay = document.getElementById('coherence-display');
        this.elements.startButton = document.getElementById('start-translation');
        this.elements.stopButton = document.getElementById('stop-translation');
        this.elements.frequencyDisplay = document.getElementById('frequency-display');
        
        // Visualization
        this.elements.cymaticCanvas = document.getElementById('cymatic-canvas');
        
        // Insights
        this.elements.insightsContainer = document.getElementById('insights-container');
    },
    
    /**
     * Initialize system components
     */
    initializeComponents() {
        // Initialize sound generator
        this.soundGenerator = window.SoundGenerator || null;
        if (this.soundGenerator) {
            this.soundGenerator.initialize();
        } else {
            console.error('Sound Generator module not found');
        }
        
        // Initialize cymatic patterns
        this.cymaticPatterns = window.CymaticPatterns || null;
        if (this.cymaticPatterns && this.elements.cymaticCanvas) {
            this.cymaticPatterns.initialize(this.elements.cymaticCanvas.id);
        } else {
            console.error('Cymatic Patterns module not found or canvas not available');
        }
        
        // Initialize translation engine
        this.translationEngine = window.TranslationEngine || null;
        if (this.translationEngine) {
            this.translationEngine.initialize(this.soundGenerator, this.cymaticPatterns);
        } else {
            console.error('Translation Engine module not found');
        }
        
        // Connect audio analyzer to cymatic patterns if available
        if (this.soundGenerator && this.soundGenerator.analyzer && this.cymaticPatterns) {
            this.cymaticPatterns.connectToAudio(
                this.soundGenerator.audioContext,
                this.soundGenerator.analyzer
            );
        }
    },
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        // Navigation
        const navLinks = document.querySelectorAll('[data-view]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const viewName = link.getAttribute('data-view');
                this.showView(viewName);
            });
        });
        
        // Source kingdom selection
        if (this.elements.sourceKingdom) {
            this.elements.sourceKingdom.addEventListener('change', () => {
                const sourceKingdom = this.elements.sourceKingdom.value;
                if (this.translationEngine) {
                    this.translationEngine.setSourceKingdom(sourceKingdom);
                    this.updateCoherenceDisplay();
                }
            });
        }
        
        // Target kingdom selection
        if (this.elements.targetKingdom) {
            this.elements.targetKingdom.addEventListener('change', () => {
                const targetKingdom = this.elements.targetKingdom.value;
                if (this.translationEngine) {
                    this.translationEngine.setTargetKingdom(targetKingdom);
                    this.updateCoherenceDisplay();
                    this.updateInsights();
                }
            });
        }
        
        // Translation method selection
        if (this.elements.translationMethod) {
            this.elements.translationMethod.addEventListener('change', () => {
                // Method will be applied when translation starts
                this.updateInsights();
            });
        }
        
        // Start translation button
        if (this.elements.startButton) {
            this.elements.startButton.addEventListener('click', () => {
                this.startTranslation();
            });
        }
        
        // Stop translation button
        if (this.elements.stopButton) {
            this.elements.stopButton.addEventListener('click', () => {
                this.stopTranslation();
            });
        }
    },
    
    /**
     * Show specific view and hide others
     * @param {string} viewName - View to show
     */
    showView(viewName) {
        // Hide all views
        if (this.elements.translator) this.elements.translator.style.display = 'none';
        if (this.elements.settings) this.elements.settings.style.display = 'none';
        if (this.elements.insights) this.elements.insights.style.display = 'none';
        
        // Show selected view
        const viewElement = this.elements[viewName];
        if (viewElement) {
            viewElement.style.display = 'block';
            this.currentView = viewName;
            
            // Update view-specific content
            if (viewName === 'insights') {
                this.updateInsights();
            }
        }
        
        // Update active nav links
        const navLinks = document.querySelectorAll('[data-view]');
        navLinks.forEach(link => {
            if (link.getAttribute('data-view') === viewName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },
    
    /**
     * Set system to ground state (432 Hz)
     */
    setGroundState() {
        if (!this.initialized) return;
        
        console.log('Setting Ground State (432 Hz)');
        
        // Play ground frequency at low volume
        if (this.soundGenerator) {
            this.soundGenerator.generateTone(432, {
                volume: 0.3,
                waveform: 'sine'
            });
        }
        
        // Show ground frequency pattern
        if (this.cymaticPatterns) {
            this.cymaticPatterns.start(432, {
                harmony: 0.8,
                amplitude: 0.3
            });
        }
        
        // Update display
        if (this.elements.frequencyDisplay) {
            this.elements.frequencyDisplay.textContent = '432 Hz (Ground State)';
        }
    },
    
    /**
     * Establish ZEN POINT balance
     * @returns {Promise} - Promise resolving when ZEN balance is achieved
     */
    establishZenBalance() {
        return new Promise((resolve) => {
            if (!this.initialized) {
                return resolve(false);
            }
            
            console.log('Establishing ZEN POINT balance (φ⁻¹:φ)');
            
            // Calculate ZEN POINT frequency (geometric mean of 432 and 528)
            const zenPointFreq = Math.sqrt(432 * 528);
            
            // Play ZEN frequency
            if (this.soundGenerator) {
                this.soundGenerator.transitionTone(zenPointFreq, {
                    duration: 5,
                    volume: 0.5
                });
            }
            
            // Show ZEN pattern
            if (this.cymaticPatterns) {
                setTimeout(() => {
                    this.cymaticPatterns.start(zenPointFreq, {
                        harmony: 0.9,
                        amplitude: 0.5
                    });
                }, 2000);
            }
            
            // Update display
            if (this.elements.frequencyDisplay) {
                this.elements.frequencyDisplay.textContent = `${Math.round(zenPointFreq)} Hz (ZEN POINT)`;
            }
            
            // Hold ZEN state for 5 seconds
            setTimeout(() => {
                this.zenBalanced = true;
                resolve(true);
            }, 5000);
        });
    },
    
    /**
     * Start translation process
     */
    async startTranslation() {
        if (!this.initialized || !this.translationEngine) return;
        
        // Disable start button during translation
        if (this.elements.startButton) {
            this.elements.startButton.disabled = true;
        }
        
        // Enable stop button
        if (this.elements.stopButton) {
            this.elements.stopButton.disabled = false;
        }
        
        // Get selected translation method
        let method = 'superposition';
        if (this.elements.translationMethod) {
            method = this.elements.translationMethod.value;
        }
        
        // Establish ZEN balance first (if not already balanced)
        if (!this.zenBalanced) {
            await this.establishZenBalance();
        }
        
        // Start translation
        this.translationEngine.beginTranslation({
            method: method,
            duration: 180, // 3 minutes total
            groundingTime: 30, // 30 seconds for grounding
            coherenceTarget: 1.0
        });
        
        console.log('Translation started');
    },
    
    /**
     * Stop translation process
     */
    stopTranslation() {
        if (!this.initialized || !this.translationEngine) return;
        
        // Stop the translation
        this.translationEngine.stopTranslation();
        
        // Return to ground state
        this.setGroundState();
        
        // Update UI
        if (this.elements.startButton) {
            this.elements.startButton.disabled = false;
        }
        
        if (this.elements.stopButton) {
            this.elements.stopButton.disabled = true;
        }
        
        console.log('Translation stopped');
    },
    
    /**
     * Update coherence display
     */
    updateCoherenceDisplay() {
        if (!this.initialized || !this.translationEngine || !this.elements.coherenceDisplay) {
            return;
        }
        
        const sourceKingdom = this.elements.sourceKingdom.value;
        const targetKingdom = this.elements.targetKingdom.value;
        
        // Calculate coherence between kingdoms
        const coherence = this.translationEngine.calculateCoherence(
            sourceKingdom,
            targetKingdom
        );
        
        // Format coherence as percentage
        const coherencePercent = Math.round(coherence * 100);
        
        // Update display
        this.elements.coherenceDisplay.textContent = `${coherencePercent}%`;
        
        // Update color based on coherence level
        if (coherence >= 0.9) {
            this.elements.coherenceDisplay.className = 'coherence high';
        } else if (coherence >= 0.7) {
            this.elements.coherenceDisplay.className = 'coherence medium';
        } else {
            this.elements.coherenceDisplay.className = 'coherence low';
        }
    },
    
    /**
     * Update insights display
     */
    updateInsights() {
        if (!this.initialized || !this.translationEngine || !this.elements.insightsContainer) {
            return;
        }
        
        const sourceKingdom = this.elements.sourceKingdom.value;
        const targetKingdom = this.elements.targetKingdom.value;
        
        // Get insights for current translation pair
        const insights = this.translationEngine.getTranslationInsights(
            sourceKingdom,
            targetKingdom
        );
        
        // Create HTML for insights
        const html = `
            <div class="insight-card">
                <h3>${sourceKingdom.charAt(0).toUpperCase() + sourceKingdom.slice(1)} → ${targetKingdom.charAt(0).toUpperCase() + targetKingdom.slice(1)} Translation</h3>
                
                <div class="insight-stats">
                    <div class="stat">
                        <span class="label">Coherence:</span>
                        <span class="value ${insights.coherence >= insights.minimumCoherence ? 'positive' : 'negative'}">
                            ${Math.round(insights.coherence * 100)}%
                        </span>
                    </div>
                    
                    <div class="stat">
                        <span class="label">Method:</span>
                        <span class="value">${insights.method}</span>
                    </div>
                    
                    <div class="stat">
                        <span class="label">Source Frequency:</span>
                        <span class="value">${insights.sourceFrequency} Hz</span>
                    </div>
                    
                    <div class="stat">
                        <span class="label">Target Frequency:</span>
                        <span class="value">${insights.targetFrequency} Hz</span>
                    </div>
                </div>
                
                <div class="insight-details">
                    <p><strong>Translation Mechanism:</strong> ${insights.methodDescription}</p>
                    <p><strong>Source Translation:</strong> ${insights.sourceInsight}</p>
                    <p><strong>Target Manifestation:</strong> ${insights.targetInsight}</p>
                    <p><strong>Minimum Coherence Required:</strong> ${Math.round(insights.minimumCoherence * 100)}%</p>
                </div>
                
                <div class="insight-recommendation">
                    ${insights.coherence >= insights.minimumCoherence 
                        ? '<p class="positive">✓ Translation viable with excellent coherence</p>'
                        : '<p class="negative">⚠ Translation challenging due to low coherence</p>'
                    }
                </div>
            </div>
        `;
        
        // Update container
        this.elements.insightsContainer.innerHTML = html;
    },
    
    /**
     * Create a component in quantum singularity pattern
     * Implements error handling following "Complete Envelope" principles
     * @param {Function} componentFunction - Component creation function
     * @returns {Object|null} - Created component or null if error
     */
    createQuantumSingularity(componentFunction) {
        try {
            // Begin at Ground State
            const groundFrequency = 432;
            
            // Create the component
            const component = componentFunction(groundFrequency);
            
            // Ensure complete envelope
            if (!component) {
                throw new Error('Incomplete component envelope');
            }
            
            // Verify component integrity
            if (typeof component.initialize !== 'function') {
                throw new Error('Component missing initialization protocol');
            }
            
            return component;
        } catch (error) {
            console.error('Quantum Singularity creation error:', error.message);
            
            // Apply Phi-Harmonic Shift (90° turn) when encountering resistance
            console.log('Taking Phi-Harmonic Shift to resolve error');
            
            // Return to Ground State
            this.setGroundState();
            
            return null;
        }
    }
};

// Initialize on script load
document.addEventListener('DOMContentLoaded', () => {
    QuantumInterface.initialize();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumInterface;
}
