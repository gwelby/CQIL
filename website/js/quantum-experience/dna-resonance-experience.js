/**
 * DNA Resonance Experience
 * 
 * A complete quantum singularity that integrates audio resonance with visual DNA patterns
 * and cymatic visualizations. Follows the phi-harmonic progression from Ground State (432 Hz)
 * to Creation State (528 Hz) and Heart Field (594 Hz).
 * 
 * This module creates a self-contained experience that embodies the principle:
 * "Dance through dimensions, don't walk through walls" by providing a coherent
 * experience rather than forcing connections between separate components.
 * 
 * @module quantum-experience/dna-resonance-experience
 */

class DNAResonanceExperience {
    /**
     * Creates a new DNA Resonance Experience
     * @param {HTMLElement|string} container - Container element or selector
     * @param {Object} options - Configuration options
     */
    constructor(container, options = {}) {
        // Initialize with default options
        this.config = {
            startFrequency: 432, // Ground State (φ⁰)
            creationFrequency: 528, // Creation State (φ¹)
            heartFrequency: 594, // Heart Field (φ²)
            zenPointBalance: { quantum: 0.5, human: 0.5 },
            phi: 1.618033988749895,
            initialTransitionDuration: 13, // Fibonacci seconds for transition
            evolutionDuration: 21, // Fibonacci seconds for DNA evolution
            cymaticDetail: 0.8, // Detail level of cymatic patterns
            audioVisualsRatio: 0.618, // Golden ratio balance between components
            autoStart: false,
            evolutionEnabled: true
        };
        
        // Apply user options
        Object.assign(this.config, options);
        
        // Get container
        this.container = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
            
        if (!this.container) {
            throw new Error('Container element not found');
        }
        
        // State tracking
        this.state = {
            currentFrequency: this.config.startFrequency,
            intentionStrength: 0.5,
            coherenceLevel: 0.5,
            zenBalance: 0.5,
            isActive: false,
            transitionProgress: 0,
            evolutionProgress: 0,
            evolutionStage: 0, // 0=Ground, 1=Creation, 2=Heart
            cymaticPatterns: [],
            dnaStrands: 2, // Start with 2 strands
            readyForEvolution: false
        };
        
        // Component references
        this.components = {
            resonator: null,
            visualizer: null,
            cymaticCanvas: null,
            intentionSlider: null,
            frequencyDisplay: null,
            coherenceDisplay: null
        };
        
        // Initialize the experience
        this._initialize();
    }
    
    /**
     * Initialize the DNA Resonance Experience
     * @private
     */
    _initialize() {
        // Create structure
        this._createContainer();
        
        // Create audio context
        this._createAudioContext();
        
        // Initialize components
        this._initResonator();
        this._initVisualizer();
        this._initCymaticVisualizer();
        this._initControls();
        
        // Autostart if configured
        if (this.config.autoStart) {
            this.start();
        }
    }
    
    /**
     * Create container structure
     * @private
     */
    _createContainer() {
        // Clear container
        this.container.innerHTML = '';
        this.container.classList.add('dna-resonance-experience');
        
        // Create layout
        const layout = `
            <div class="dna-resonance-header">
                <h2>DNA Resonance Experience</h2>
                <div class="frequency-display">
                    <span class="current-frequency"></span> Hz
                </div>
            </div>
            
            <div class="dna-resonance-main">
                <div class="dna-visual-container"></div>
                <div class="cymatic-container">
                    <canvas class="cymatic-canvas"></canvas>
                </div>
            </div>
            
            <div class="dna-resonance-controls">
                <div class="control-group">
                    <label>Intention Strength</label>
                    <input type="range" class="intention-slider" min="0" max="1" step="0.01" value="0.5">
                </div>
                
                <div class="zen-point-display">
                    <div class="zen-point-label">ZEN POINT BALANCE</div>
                    <div class="zen-point-indicator">
                        <div class="human-side">Human</div>
                        <div class="balance-marker"></div>
                        <div class="quantum-side">Quantum</div>
                    </div>
                </div>
                
                <div class="coherence-display">
                    <div class="coherence-label">Coherence</div>
                    <div class="coherence-meter">
                        <div class="coherence-fill"></div>
                    </div>
                    <div class="coherence-value">0.5</div>
                </div>
                
                <button class="start-button">Begin Experience</button>
                <button class="stop-button" disabled>End Experience</button>
            </div>
        `;
        
        this.container.innerHTML = layout;
        
        // Store references to elements
        this.components.visualContainer = this.container.querySelector('.dna-visual-container');
        this.components.cymaticCanvas = this.container.querySelector('.cymatic-canvas');
        this.components.intentionSlider = this.container.querySelector('.intention-slider');
        this.components.frequencyDisplay = this.container.querySelector('.current-frequency');
        this.components.coherenceDisplay = this.container.querySelector('.coherence-display');
        this.components.coherenceMeter = this.container.querySelector('.coherence-fill');
        this.components.coherenceValue = this.container.querySelector('.coherence-value');
        this.components.startButton = this.container.querySelector('.start-button');
        this.components.stopButton = this.container.querySelector('.stop-button');
        this.components.balanceMarker = this.container.querySelector('.balance-marker');
        
        // Set initial displays
        this.components.frequencyDisplay.textContent = this.state.currentFrequency.toFixed(1);
        
        // Add event listeners
        this._addEventListeners();
    }
    
    /**
     * Add event listeners to controls
     * @private
     */
    _addEventListeners() {
        // Intention slider
        this.components.intentionSlider.addEventListener('input', (e) => {
            this.setIntention(parseFloat(e.target.value));
        });
        
        // Start button
        this.components.startButton.addEventListener('click', () => {
            this.start();
        });
        
        // Stop button
        this.components.stopButton.addEventListener('click', () => {
            this.stop();
        });
        
        // Capture intention through mouse movement on visualizer
        this.components.visualContainer.addEventListener('mousemove', (e) => {
            if (!this.state.isActive) return;
            
            const rect = this.components.visualContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Use movement to enhance intention and ZEN balance
            const intentionFactor = (y * 0.5) + 0.25; // 0.25 to 0.75 range
            const balanceFactor = (x * 0.5) + 0.25;   // 0.25 to 0.75 range
            
            // Apply with smoothing
            this.state.intentionStrength = (this.state.intentionStrength * 0.9) + (intentionFactor * 0.1);
            this.state.zenBalance = (this.state.zenBalance * 0.9) + (balanceFactor * 0.1);
            
            // Update interface
            this.components.intentionSlider.value = this.state.intentionStrength;
            this._updateZenBalance();
            
            // Apply to components
            if (this.components.resonator) {
                this.components.resonator.setIntention({
                    strength: this.state.intentionStrength,
                    clarity: 0.5 + (this.state.coherenceLevel * 0.5),
                    focus: 0.5
                });
                
                this.components.resonator.setZenPointBalance({
                    quantum: 1 - this.state.zenBalance,
                    human: this.state.zenBalance
                });
            }
        });
    }
    
    /**
     * Create audio context
     * @private
     */
    _createAudioContext() {
        if (typeof window === 'undefined') return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.audioContext = null;
        }
    }
    
    /**
     * Initialize the DNA Resonator component
     * @private
     */
    _initResonator() {
        if (!this.audioContext) return;
        
        // Dynamically import the DNAResonator
        this._loadScript('/js/quantum-experience/dna-resonator.js')
            .then(() => {
                if (typeof DNAResonator === 'undefined') {
                    console.error('DNAResonator not found');
                    return;
                }
                
                // Create resonator with Ground State frequency
                this.components.resonator = new DNAResonator(this.audioContext, {
                    baseFrequency: this.config.startFrequency,
                    volume: 0.1,
                    zenPointBalance: this.config.zenPointBalance
                });
            })
            .catch(error => {
                console.error('Failed to load DNAResonator:', error);
            });
    }
    
    /**
     * Initialize the DNA Visualizer component
     * @private
     */
    _initVisualizer() {
        // Dynamically import the DNAResonance visualizer
        this._loadScript('/js/quantum-experience/dna-resonance.js')
            .then(() => {
                if (typeof DNAResonance === 'undefined') {
                    console.error('DNAResonance not found');
                    return;
                }
                
                // Create visualizer
                this.components.visualizer = new DNAResonance(
                    this.components.visualContainer,
                    {
                        frequency: this.config.startFrequency
                    }
                );
            })
            .catch(error => {
                console.error('Failed to load DNAResonance:', error);
            });
    }
    
    /**
     * Initialize the Cymatic Visualizer component
     * @private
     */
    _initCymaticVisualizer() {
        const canvas = this.components.cymaticCanvas;
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Prepare cymatic rendering
        this._renderCymaticPatterns = () => {
            if (!ctx || !this.state.isActive) return;
            
            const width = canvas.width;
            const height = canvas.height;
            
            // Clear with fade effect
            ctx.fillStyle = 'rgba(10, 10, 35, 0.1)';
            ctx.fillRect(0, 0, width, height);
            
            // Get parameters
            const frequency = this.state.currentFrequency;
            const intensity = this.state.intentionStrength;
            const coherence = this.state.coherenceLevel;
            const detail = this.config.cymaticDetail;
            
            // Generate cymatic pattern based on current frequency and phi ratios
            const time = Date.now() * 0.001;
            const center = { x: width / 2, y: height / 2 };
            const radius = Math.min(width, height) * 0.4;
            
            // Frequency normalized to 0-1 range for visualization purposes
            const freqNorm = (frequency - 432) / (594 - 432);
            
            // Number of nodes increases with frequency
            const nodeCount = 8 + Math.floor(freqNorm * 13); // 8 to 21 nodes (Fibonacci)
            
            // Draw cymatic pattern
            ctx.save();
            ctx.translate(center.x, center.y);
            
            // Base circle
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `hsla(${240 + freqNorm * 60}, 70%, 60%, ${0.3 + coherence * 0.7})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
            // Draw standing wave pattern
            for (let i = 0; i < nodeCount; i++) {
                const angle = (i / nodeCount) * Math.PI * 2;
                const wavePhase = time * (1 + freqNorm * 2) + i * (Math.PI * 2 / nodeCount);
                
                // Inner pattern - varies with frequency
                const innerRadius = radius * (0.2 + 0.3 * Math.sin(wavePhase) * coherence);
                const x1 = Math.cos(angle) * innerRadius;
                const y1 = Math.sin(angle) * innerRadius;
                
                // Outer pattern - static, represents frequency ratios
                const x2 = Math.cos(angle) * radius;
                const y2 = Math.sin(angle) * radius;
                
                // Draw line connecting inner and outer patterns
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = `hsla(${240 + freqNorm * 120}, 80%, 60%, ${0.1 + intensity * 0.4})`;
                ctx.lineWidth = 1 + intensity;
                ctx.stroke();
                
                // Add resonance nodes at inner points
                ctx.beginPath();
                ctx.arc(x1, y1, 2 + intensity * 4, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${240 + freqNorm * 120}, 90%, 70%, ${0.5 + intensity * 0.5})`;
                ctx.fill();
            }
            
            // Add phi-spiral as overlay (varies with ZEN POINT balance)
            const spiralPoints = 34; // Fibonacci number
            const spiralTurns = 3 + this.state.zenBalance * 2;
            const spiralGrowth = 0.1 + this.state.zenBalance * 0.05;
            
            ctx.beginPath();
            
            for (let i = 0; i < spiralPoints; i++) {
                const t = (i / (spiralPoints - 1)) * spiralTurns * Math.PI * 2;
                const r = Math.exp(spiralGrowth * t) * 3;
                const x = Math.cos(t) * r;
                const y = Math.sin(t) * r;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.strokeStyle = `hsla(${120 + this.state.zenBalance * 120}, 70%, 60%, ${0.3 + coherence * 0.7})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
            ctx.restore();
            
            // Continue animation
            requestAnimationFrame(this._renderCymaticPatterns);
        };
    }
    
    /**
     * Initialize controls and displays
     * @private
     */
    _initControls() {
        // Start with updates
        this._updateFrequencyDisplay();
        this._updateCoherenceDisplay();
        this._updateZenBalance();
    }
    
    /**
     * Update frequency display
     * @private
     */
    _updateFrequencyDisplay() {
        if (!this.components.frequencyDisplay) return;
        this.components.frequencyDisplay.textContent = this.state.currentFrequency.toFixed(1);
    }
    
    /**
     * Update coherence display
     * @private
     */
    _updateCoherenceDisplay() {
        if (!this.components.coherenceMeter || !this.components.coherenceValue) return;
        
        // Update meter
        const percent = this.state.coherenceLevel * 100;
        this.components.coherenceMeter.style.width = `${percent}%`;
        
        // Color based on coherence level (red to green)
        const hue = this.state.coherenceLevel * 120;
        this.components.coherenceMeter.style.backgroundColor = `hsl(${hue}, 80%, 50%)`;
        
        // Update value
        this.components.coherenceValue.textContent = this.state.coherenceLevel.toFixed(2);
    }
    
    /**
     * Update ZEN balance display
     * @private
     */
    _updateZenBalance() {
        if (!this.components.balanceMarker) return;
        
        // Position the marker based on balance (0=quantum, 1=human)
        const position = this.state.zenBalance * 100;
        this.components.balanceMarker.style.left = `${position}%`;
    }
    
    /**
     * Set intention strength and update components
     * @param {number} strength - Intention strength from 0-1
     */
    setIntention(strength) {
        if (typeof strength !== 'number' || strength < 0 || strength > 1) return;
        
        this.state.intentionStrength = strength;
        
        // Update resonator if available
        if (this.components.resonator) {
            this.components.resonator.setIntention({
                strength: strength,
                clarity: 0.5 + (this.state.coherenceLevel * 0.5),
                focus: 0.5
            });
        }
    }
    
    /**
     * Start the experience
     */
    start() {
        if (this.state.isActive) return;
        this.state.isActive = true;
        
        // Update buttons
        this.components.startButton.disabled = true;
        this.components.stopButton.disabled = false;
        
        // Start resonator
        if (this.components.resonator) {
            this.components.resonator.start();
        }
        
        // Start visualizer
        if (this.components.visualizer) {
            this.components.visualizer.start();
        }
        
        // Start cymatic visualization
        this._renderCymaticPatterns();
        
        // Begin frequency transition from Ground State to Creation State
        this._startFrequencyTransition();
        
        // Begin coherence tracking
        this._startCoherenceTracking();
    }
    
    /**
     * Stop the experience
     */
    stop() {
        if (!this.state.isActive) return;
        this.state.isActive = false;
        
        // Update buttons
        this.components.startButton.disabled = false;
        this.components.stopButton.disabled = true;
        
        // Stop resonator
        if (this.components.resonator) {
            this.components.resonator.stop();
        }
        
        // Stop visualizer
        if (this.components.visualizer) {
            this.components.visualizer.stop();
        }
        
        // Stop transition
        if (this._transitionInterval) {
            clearInterval(this._transitionInterval);
            this._transitionInterval = null;
        }
        
        // Stop coherence tracking
        if (this._coherenceInterval) {
            clearInterval(this._coherenceInterval);
            this._coherenceInterval = null;
        }
    }
    
    /**
     * Start transition from Ground State to Creation State
     * @private
     */
    _startFrequencyTransition() {
        if (this._transitionInterval) {
            clearInterval(this._transitionInterval);
        }
        
        const startFreq = this.config.startFrequency;
        const creationFreq = this.config.creationFrequency;
        const heartFreq = this.config.heartFrequency;
        const duration = this.config.initialTransitionDuration * 1000; // ms
        const updateRate = 50; // ms
        const steps = duration / updateRate;
        let step = 0;
        
        this.state.transitionProgress = 0;
        
        // Use phi-harmonic curve instead of linear
        const getPhiHarmonicValue = (progress) => {
            // Smooth phi-harmonic S-curve
            return progress < 0.5
                ? 2 * Math.pow(progress, 2)
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        };
        
        this._transitionInterval = setInterval(() => {
            if (!this.state.isActive) {
                clearInterval(this._transitionInterval);
                return;
            }
            
            step++;
            const linearProgress = step / steps;
            const progress = getPhiHarmonicValue(linearProgress);
            
            // Calculate new frequency along phi-harmonic curve
            this.state.currentFrequency = startFreq + (creationFreq - startFreq) * progress;
            this.state.transitionProgress = progress;
            
            // Update displays
            this._updateFrequencyDisplay();
            
            // Update resonator frequency
            if (this.components.resonator) {
                // The resonator doesn't have a direct setFrequency method,
                // but we could implement one or recreate the oscillators
            }
            
            // Complete when we reach the target
            if (step >= steps) {
                clearInterval(this._transitionInterval);
                this._transitionInterval = null;
                
                // Finalize frequency
                this.state.currentFrequency = creationFreq;
                this._updateFrequencyDisplay();
                
                // Check if evolution is enabled
                if (this.config.evolutionEnabled) {
                    this._startEvolution();
                }
            }
        }, updateRate);
    }
    
    /**
     * Start DNA evolution
     * @private
     */
    _startEvolution() {
        if (this._evolutionInterval) {
            clearInterval(this._evolutionInterval);
        }
        
        const evolutionDuration = this.config.evolutionDuration * 1000; // ms
        const updateRate = 50; // ms
        const steps = evolutionDuration / updateRate;
        let step = 0;
        
        this.state.evolutionProgress = 0;
        this.state.evolutionStage = 1; // Move to Creation State
        
        // Use phi-harmonic curve instead of linear
        const getPhiHarmonicValue = (progress) => {
            // Smooth phi-harmonic S-curve
            return progress < 0.5
                ? 2 * Math.pow(progress, 2)
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        };
        
        this._evolutionInterval = setInterval(() => {
            if (!this.state.isActive) {
                clearInterval(this._evolutionInterval);
                return;
            }
            
            step++;
            const linearProgress = step / steps;
            const progress = getPhiHarmonicValue(linearProgress);
            
            // Calculate new frequency along phi-harmonic curve
            this.state.currentFrequency = this.config.creationFrequency + (this.config.heartFrequency - this.config.creationFrequency) * progress;
            this.state.evolutionProgress = progress;
            
            // Update displays
            this._updateFrequencyDisplay();
            
            // Update resonator frequency
            if (this.components.resonator) {
                // The resonator doesn't have a direct setFrequency method,
                // but we could implement one or recreate the oscillators
            }
            
            // Complete when we reach the target
            if (step >= steps) {
                clearInterval(this._evolutionInterval);
                this._evolutionInterval = null;
                
                // Finalize frequency
                this.state.currentFrequency = this.config.heartFrequency;
                this._updateFrequencyDisplay();
                
                // Update evolution stage
                this.state.evolutionStage = 2; // Move to Heart Field
            }
        }, updateRate);
    }
    
    /**
     * Start tracking coherence
     * @private
     */
    _startCoherenceTracking() {
        if (this._coherenceInterval) {
            clearInterval(this._coherenceInterval);
        }
        
        // Update every 100ms
        this._coherenceInterval = setInterval(() => {
            if (!this.state.isActive) {
                clearInterval(this._coherenceInterval);
                return;
            }
            
            // In a real implementation, we would analyze audio and user interaction
            // For this demo, we'll simulate coherence based on transition progress and intention
            const baseCoherence = 0.3 + (this.state.transitionProgress * 0.4);
            const intentionFactor = this.state.intentionStrength * 0.3;
            const fluctuation = Math.sin(Date.now() * 0.001) * 0.05;
            
            this.state.coherenceLevel = Math.min(0.99, Math.max(0.01, 
                baseCoherence + intentionFactor + fluctuation
            ));
            
            // Update display
            this._updateCoherenceDisplay();
            
            // Update resonator
            if (this.components.resonator) {
                this.components.resonator.setIntention({
                    strength: this.state.intentionStrength,
                    clarity: 0.5 + (this.state.coherenceLevel * 0.5),
                    focus: 0.5
                });
            }
            
        }, 100);
    }
    
    /**
     * Load script dynamically
     * @private
     * @param {string} src - Script URL
     * @returns {Promise} - Resolves when script is loaded
     */
    _loadScript(src) {
        return new Promise((resolve, reject) => {
            if (typeof document === 'undefined') {
                reject(new Error('Document not available'));
                return;
            }
            
            // Check if script is already loaded
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

// Export the class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DNAResonanceExperience;
} else {
    window.DNAResonanceExperience = DNAResonanceExperience;
}
