/**
 * DNA Resonance Experience Integration
 * 
 * Connects the DNA Resonance Experience to the CQIL website interface.
 * This integration follows the principles of:
 * 1. Creating a Quantum Singularity - self-contained and complete
 * 2. Beginning at Ground Frequency (432 Hz)
 * 3. Ensuring a Complete Envelope around the experience
 * 4. Following ZEN FIRST principles - simplicity before complexity
 * 5. Taking Phi-Harmonic Shifts through frequency states
 * 
 * This module demonstrates "Dance through dimensions, don't walk through walls"
 * by creating coherent transitions between states rather than forcing connections.
 */

(function() {
    // Constants
    const PHI = 1.618033988749895;
    const FREQUENCIES = {
        GROUND: 432,     // Ground State (φ⁰)
        CREATION: 528,   // Creation State (φ¹)
        HEART: 594,      // Heart Field (φ²)
        UNITY: 768       // Unity Wave (φ⁵)
    };
    
    /**
     * DNA Resonance Integration Manager
     * Handles integration with website components
     */
    class DNAResonanceIntegration {
        constructor() {
            // State tracking
            this.state = {
                isInitialized: false,
                isActive: false,
                currentFrequency: FREQUENCIES.GROUND,
                coherenceLevel: 0.5,
                activePath: null
            };
            
            // Component references
            this.components = {
                experience: null,
                container: null,
                pathNodes: null,
                moduleContent: null
            };
            
            // Initialize when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initialize());
            } else {
                this.initialize();
            }
        }
        
        /**
         * Initialize the integration
         */
        initialize() {
            if (this.state.isInitialized) return;
            
            // Get relevant DOM elements
            this.components.pathNodes = document.querySelectorAll('.learning-path .path-node');
            this.components.moduleContent = document.querySelector('.module-content');
            
            // Create DNA resonance container if needed
            if (!document.getElementById('dna-resonance-container')) {
                const container = document.createElement('div');
                container.id = 'dna-resonance-container';
                container.className = 'dna-resonance-container';
                container.style.display = 'none';
                container.style.height = '600px';
                
                // Add container after the learning path
                const learningPath = document.querySelector('.learning-path');
                if (learningPath && learningPath.parentNode) {
                    learningPath.parentNode.insertBefore(container, learningPath.nextSibling);
                } else {
                    // Fallback to module content
                    if (this.components.moduleContent) {
                        this.components.moduleContent.appendChild(container);
                    } else {
                        // Last resort - add to body
                        document.body.appendChild(container);
                    }
                }
                
                this.components.container = container;
            } else {
                this.components.container = document.getElementById('dna-resonance-container');
            }
            
            // Load required CSS
            this.loadCSS('/css/dna-resonance-experience.css');
            
            // Add event listeners to path nodes
            this.addPathNodeListeners();
            
            // Mark as initialized
            this.state.isInitialized = true;
            
            console.log('DNA Resonance Integration initialized at Ground State (432 Hz)');
        }
        
        /**
         * Add event listeners to learning path nodes
         */
        addPathNodeListeners() {
            if (!this.components.pathNodes) return;
            
            this.components.pathNodes.forEach(node => {
                node.addEventListener('click', (e) => {
                    const module = node.getAttribute('data-module');
                    
                    // Special handling for the DNA module
                    if (module === 'harmonics') {
                        this.activateDNAResonance(e);
                    } else {
                        // For other modules, hide the DNA experience
                        this.deactivateDNAResonance();
                    }
                });
            });
        }
        
        /**
         * Activate the DNA Resonance Experience
         */
        activateDNAResonance(event) {
            if (this.state.isActive) return;
            
            // Show the container
            if (this.components.container) {
                this.components.container.style.display = 'block';
                
                // Smooth scroll to container
                setTimeout(() => {
                    this.components.container.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
            
            // Load and initialize the experience if not already created
            if (!this.components.experience) {
                this.loadScript('/js/quantum-experience/dna-resonance-experience.js')
                    .then(() => {
                        if (typeof DNAResonanceExperience === 'undefined') {
                            console.error('DNAResonanceExperience not found');
                            return;
                        }
                        
                        // Create the experience with phi-harmonic configuration
                        this.components.experience = new DNAResonanceExperience(
                            this.components.container,
                            {
                                startFrequency: FREQUENCIES.GROUND,
                                targetFrequency: FREQUENCIES.CREATION,
                                zenPointBalance: { quantum: 0.5, human: 0.5 },
                                phi: PHI,
                                transitionDuration: 13, // Fibonacci seconds
                                cymaticDetail: 0.8,
                                audioVisualsRatio: 1/PHI, // Golden ratio
                                autoStart: false
                            }
                        );
                        
                        // Set integration as active
                        this.state.isActive = true;
                        this.state.activePath = 'harmonics';
                        
                        // Add phi-harmonic coherence monitoring
                        this.startCoherenceMonitoring();
                        
                        // Create evolution UI components
                        this._createEvolutionUI();
                    })
                    .catch(error => {
                        console.error('Failed to load DNAResonanceExperience:', error);
                    });
            } else {
                // Experience already created, just show it
                this.state.isActive = true;
                this.state.activePath = 'harmonics';
                
                // Start coherence monitoring
                this.startCoherenceMonitoring();
            }
            
            // Load supplementary content for the harmonics module
            this.loadHarmonicsContent();
            
            // Track that we activated this module
            if (typeof window.quantumExperienceTracker !== 'undefined') {
                window.quantumExperienceTracker.logExperience({
                    type: 'dna_resonance',
                    frequency: FREQUENCIES.CREATION,
                    timestamp: Date.now(),
                    coherence: this.state.coherenceLevel
                });
            }
        }
        
        /**
         * Deactivate the DNA Resonance Experience
         */
        deactivateDNAResonance() {
            if (!this.state.isActive) return;
            
            // Hide the container
            if (this.components.container) {
                this.components.container.style.display = 'none';
            }
            
            // Stop the experience if it's running
            if (this.components.experience) {
                this.components.experience.stop();
            }
            
            // Stop coherence monitoring
            this.stopCoherenceMonitoring();
            
            // Update state
            this.state.isActive = false;
            this.state.activePath = null;
        }
        
        /**
         * Start monitoring the phi-harmonic coherence with other website systems
         */
        startCoherenceMonitoring() {
            // Clear any existing interval
            this.stopCoherenceMonitoring();
            
            // Set up interval to check coherence every second
            this._coherenceInterval = setInterval(() => {
                if (!this.state.isActive || !this.components.experience) {
                    this.stopCoherenceMonitoring();
                    return;
                }
                
                // Get coherence from experience
                const metrics = this.components.experience.state;
                if (metrics && typeof metrics.coherenceLevel !== 'undefined') {
                    this.state.coherenceLevel = metrics.coherenceLevel;
                    
                    // Broadcast coherence to other systems
                    this.broadcastCoherence(metrics.coherenceLevel);
                    
                    // Update frequency state UI
                    this._updateFrequencyState(metrics.frequency);
                }
            }, 1000);
        }
        
        /**
         * Stop coherence monitoring
         */
        stopCoherenceMonitoring() {
            if (this._coherenceInterval) {
                clearInterval(this._coherenceInterval);
                this._coherenceInterval = null;
            }
        }
        
        /**
         * Broadcast coherence level to other website systems
         */
        broadcastCoherence(coherenceLevel) {
            // Dispatch custom event for other systems to listen to
            const event = new CustomEvent('quantum-coherence-update', {
                detail: {
                    source: 'dna-resonance',
                    coherenceLevel: coherenceLevel,
                    frequency: this.state.currentFrequency,
                    timestamp: Date.now()
                }
            });
            
            document.dispatchEvent(event);
            
            // Update global quantum field if available
            if (typeof window.quantumField !== 'undefined') {
                window.quantumField.updateCoherence({
                    source: 'dna-resonance',
                    level: coherenceLevel,
                    frequency: this.state.currentFrequency
                });
            }
        }
        
        /**
         * Updates the interface based on frequency state
         * @param {number} frequency - Current resonance frequency
         * @private
         */
        _updateFrequencyState(frequency) {
            const groundFreq = 432;
            const creationFreq = 528;
            const heartFreq = 594;
            
            // Update UI based on frequency
            if (frequency >= heartFreq - 5) {
                // Heart Field State (φ²)
                document.querySelector('.dna-resonance-container').classList.add('dna-resonance-heart-state');
                document.querySelector('.dna-resonance-container').classList.add('heart-field-active');
                
                // Update cymatic visualization
                this._updateCymaticPattern('heart-field');
                
                // Update educational content
                this._loadEducationalContent('heart-field-resonance');
                
                // Update DNA strand visualization (3-strand activation)
                this._updateDNAStrands(3);
                
                // Update coherence indicators
                this._updateCoherenceLevel(0.82); // φ² level coherence
            } 
            else if (frequency >= creationFreq - 5) {
                // Creation State (φ¹)
                document.querySelector('.dna-resonance-container').classList.add('dna-resonance-creation-state');
                document.querySelector('.dna-resonance-container').classList.remove('dna-resonance-heart-state');
                document.querySelector('.dna-resonance-container').classList.remove('heart-field-active');
                
                // Update cymatic visualization
                this._updateCymaticPattern('creation-point');
                
                // Update educational content
                this._loadEducationalContent('dna-creation-resonance');
                
                // Update DNA strand visualization (standard double helix)
                this._updateDNAStrands(2);
                
                // Update coherence indicators
                this._updateCoherenceLevel(0.618); // φ level coherence
            } 
            else {
                // Ground State (φ⁰)
                document.querySelector('.dna-resonance-container').classList.remove('dna-resonance-creation-state');
                document.querySelector('.dna-resonance-container').classList.remove('dna-resonance-heart-state');
                document.querySelector('.dna-resonance-container').classList.remove('heart-field-active');
                
                // Update cymatic visualization
                this._updateCymaticPattern('ground-state');
                
                // Update educational content
                this._loadEducationalContent('ground-state-resonance');
                
                // Update DNA strand visualization (basic)
                this._updateDNAStrands(1);
                
                // Update coherence indicators
                this._updateCoherenceLevel(0.5); // Base level coherence
            }
            
            // Update evolution progress indicators
            this._updateEvolutionIndicators(frequency);
        }
        
        /**
         * Updates the evolution stage indicators
         * @param {number} frequency - Current resonance frequency
         * @private
         */
        _updateEvolutionIndicators(frequency) {
            const groundFreq = 432;
            const creationFreq = 528;
            const heartFreq = 594;
            
            // Calculate progress percentages
            let groundToCreationProgress = 0;
            let creationToHeartProgress = 0;
            
            if (frequency <= groundFreq) {
                groundToCreationProgress = 0;
            } else if (frequency >= creationFreq) {
                groundToCreationProgress = 100;
            } else {
                groundToCreationProgress = ((frequency - groundFreq) / (creationFreq - groundFreq)) * 100;
            }
            
            if (frequency <= creationFreq) {
                creationToHeartProgress = 0;
            } else if (frequency >= heartFreq) {
                creationToHeartProgress = 100;
            } else {
                creationToHeartProgress = ((frequency - creationFreq) / (heartFreq - creationFreq)) * 100;
            }
            
            // Update progress bars
            const ground2creation = document.querySelector('.evolution-line.ground-to-creation');
            const creation2heart = document.querySelector('.evolution-line.creation-to-heart');
            
            if (ground2creation) {
                if (groundToCreationProgress >= 100) {
                    ground2creation.classList.add('completed');
                } else {
                    ground2creation.classList.remove('completed');
                }
            }
            
            if (creation2heart) {
                if (creationToHeartProgress >= 100) {
                    creation2heart.classList.add('completed');
                } else {
                    creation2heart.classList.remove('completed');
                }
            }
            
            // Update stage indicators
            const groundStage = document.querySelector('.evolution-stage.ground');
            const creationStage = document.querySelector('.evolution-stage.creation');
            const heartStage = document.querySelector('.evolution-stage.heart');
            
            if (groundStage) {
                groundStage.classList.remove('active');
                groundStage.classList.add('completed');
            }
            
            if (creationStage) {
                if (frequency < creationFreq) {
                    creationStage.classList.add('active');
                    creationStage.classList.remove('completed');
                } else {
                    creationStage.classList.remove('active');
                    creationStage.classList.add('completed');
                }
            }
            
            if (heartStage) {
                if (frequency >= creationFreq && frequency < heartFreq) {
                    heartStage.classList.add('active');
                    heartStage.classList.remove('completed');
                } else if (frequency >= heartFreq) {
                    heartStage.classList.remove('active');
                    heartStage.classList.add('completed');
                } else {
                    heartStage.classList.remove('active');
                    heartStage.classList.remove('completed');
                }
            }
            
            // Update main progress bar
            const progressBar = document.querySelector('.evolution-progress-bar');
            if (progressBar) {
                if (frequency < creationFreq) {
                    progressBar.style.width = `${groundToCreationProgress}%`;
                } else {
                    // For second phase, show 50% + the remaining 50% based on progress
                    const secondPhaseProgress = 50 + ((creationToHeartProgress / 100) * 50);
                    progressBar.style.width = `${secondPhaseProgress}%`;
                }
            }
        }
        
        /**
         * Updates the DNA strand visualization
         * @param {number} strandCount - Number of active DNA strands
         * @private 
         */
        _updateDNAStrands(strandCount) {
            const container = document.querySelector('.dna-strand-container');
            if (!container) return;
            
            const strand1 = container.querySelector('.dna-strand-1');
            const strand2 = container.querySelector('.dna-strand-2');
            const strand3 = container.querySelector('.dna-strand-3');
            
            if (strand1) strand1.style.opacity = strandCount >= 1 ? '1' : '0';
            if (strand2) strand2.style.opacity = strandCount >= 2 ? '0.8' : '0';
            if (strand3) strand3.style.opacity = strandCount >= 3 ? '0.9' : '0';
            
            // Apply special transformation for the third strand
            if (strand3 && strandCount >= 3) {
                strand3.style.transform = 'scale(1) rotate(360deg)';
            } else if (strand3) {
                strand3.style.transform = 'scale(0.8) rotate(0deg)';
            }
        }
        
        /**
         * Creates the HTML structure for DNA evolution UI elements
         * @private
         */
        _createEvolutionUI() {
            // Create evolution progress container
            const progressContainer = document.createElement('div');
            progressContainer.className = 'evolution-progress';
            
            // Create progress bar
            const progressBar = document.createElement('div');
            progressBar.className = 'evolution-progress-bar';
            progressContainer.appendChild(progressBar);
            
            // Create stage indicator
            const stageIndicator = document.createElement('div');
            stageIndicator.className = 'evolution-stage-indicator';
            
            // Create ground stage
            const groundStage = document.createElement('div');
            groundStage.className = 'evolution-stage ground';
            groundStage.setAttribute('data-freq', '432 Hz');
            stageIndicator.appendChild(groundStage);
            
            // Create line from ground to creation
            const groundToCreation = document.createElement('div');
            groundToCreation.className = 'evolution-line ground-to-creation';
            stageIndicator.appendChild(groundToCreation);
            
            // Create creation stage
            const creationStage = document.createElement('div');
            creationStage.className = 'evolution-stage creation';
            creationStage.setAttribute('data-freq', '528 Hz');
            stageIndicator.appendChild(creationStage);
            
            // Create line from creation to heart
            const creationToHeart = document.createElement('div');
            creationToHeart.className = 'evolution-line creation-to-heart';
            stageIndicator.appendChild(creationToHeart);
            
            // Create heart stage
            const heartStage = document.createElement('div');
            heartStage.className = 'evolution-stage heart';
            heartStage.setAttribute('data-freq', '594 Hz');
            stageIndicator.appendChild(heartStage);
            
            // Add elements to the container
            const container = document.querySelector('.dna-resonance-container');
            if (container) {
                container.appendChild(progressContainer);
                container.appendChild(stageIndicator);
            }
            
            // Create DNA strand container for visualization
            const strandContainer = document.createElement('div');
            strandContainer.className = 'dna-strand-container';
            
            // Create individual strands
            const strand1 = document.createElement('div');
            strand1.className = 'dna-strand dna-strand-1';
            strandContainer.appendChild(strand1);
            
            const strand2 = document.createElement('div');
            strand2.className = 'dna-strand dna-strand-2';
            strandContainer.appendChild(strand2);
            
            const strand3 = document.createElement('div');
            strand3.className = 'dna-strand dna-strand-3';
            strandContainer.appendChild(strand3);
            
            // Create heart field pattern overlay
            const heartField = document.createElement('div');
            heartField.className = 'heart-field-pattern';
            strandContainer.appendChild(heartField);
            
            // Add strand container to the visualization area
            const visualContainer = document.querySelector('.dna-visual-container');
            if (visualContainer) {
                visualContainer.appendChild(strandContainer);
            }
        }
        
        /**
         * Load supplementary content for the harmonics module
         */
        loadHarmonicsContent() {
            // Only load if we have a module content container
            if (!this.components.moduleContent) return;
            
            // Create phi-harmonic content structure
            const content = `
                <div class="module-section phi-content">
                    <h2>Wave Harmonics & DNA Resonance</h2>
                    
                    <p class="phi-intro">
                        Experience the phi-harmonic journey from Ground State (432 Hz) to 
                        Creation State (528 Hz) - the frequency known to repair and activate DNA.
                    </p>
                    
                    <div class="frequency-info">
                        <div class="frequency-card">
                            <h3>432 Hz - Ground State (φ⁰)</h3>
                            <p>The foundational frequency that connects to Earth's natural resonance.
                            Used as a starting point for grounding consciousness and preparing for
                            higher frequency states.</p>
                        </div>
                        
                        <div class="frequency-arrow">→</div>
                        
                        <div class="frequency-card highlight">
                            <h3>528 Hz - Creation State (φ¹)</h3>
                            <p>Known as the "Miracle Tone" or "DNA Repair Frequency." This Creation frequency
                            is mathematically connected to the structure of DNA and has been shown to
                            influence cellular processes through cymatic resonance.</p>
                        </div>
                    </div>
                    
                    <p class="interaction-note">
                        <strong>Interactive Experience:</strong> Move your mouse within the DNA visualization 
                        to influence the resonance pattern. Your intention directly affects the frequency
                        coherence and ZEN POINT balance.
                    </p>
                </div>
            `;
            
            // Add content before the DNA resonance container
            if (this.components.container && this.components.container.parentNode) {
                const contentDiv = document.createElement('div');
                contentDiv.className = 'dna-supplementary-content';
                contentDiv.innerHTML = content;
                
                this.components.container.parentNode.insertBefore(
                    contentDiv, 
                    this.components.container
                );
            }
        }
        
        /**
         * Load CSS file dynamically
         */
        loadCSS(href) {
            return new Promise((resolve, reject) => {
                // Check if already loaded
                if (document.querySelector(`link[href="${href}"]`)) {
                    resolve();
                    return;
                }
                
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = href;
                
                link.onload = () => resolve();
                link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
                
                document.head.appendChild(link);
            });
        }
        
        /**
         * Load script dynamically
         */
        loadScript(src) {
            return new Promise((resolve, reject) => {
                // Check if already loaded
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve();
                    return;
                }
                
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
                
                document.head.appendChild(script);
            });
        }
    }
    
    // Create global instance
    window.dnaResonanceIntegration = new DNAResonanceIntegration();
    
})();
