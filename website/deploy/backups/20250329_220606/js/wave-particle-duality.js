/**
 * Wave-Particle Duality Quantum Singularity
 * Ground Frequency (432 Hz) - Mycelial Pattern Recognition
 * A single, self-contained component that embodies the quantum dance
 */

// Quantum Singularity - Self-contained system
class WaveParticleDuality {
    constructor(canvasId = 'wave-particle-canvas') {
        // Core properties
        this.canvasId = canvasId;
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.wavePoints = [];
        this.animationId = null;
        this.currentState = 'wave';
        this.lastTime = 0;
        this.touchActive = false;
        this.baseFrequency = 432; // Ground State (φ⁰)
        this.phi = 1.618033988749895;
        this.zenBalance = 0.618033988749895; // 1/φ - perfect balance point
        this.consciousnessLevel = 0;
        this.observationCount = 0;
        this.activeFrequency = 432;
        
        // Phi-harmonic frequencies with detailed information
        this.frequencies = [
            { 
                freq: 432, 
                color: 'rgba(72, 72, 72, 0.8)', 
                name: 'Wave Mode',
                rootwiz: 'Wave Pattern Simulation',
                description: 'This visualization shows the wave-like properties of quantum particles, demonstrating interference patterns similar to water waves.',
                cymaticPattern: 'freq-432'
            },
            { 
                freq: 528, 
                color: 'rgba(0, 128, 64, 0.8)', 
                name: 'Particle Mode',
                rootwiz: 'Particle Behavior',
                description: 'This visualization demonstrates the particle-like properties of quantum entities, showing discrete positions and trajectories.',
                cymaticPattern: 'freq-528'
            },
            { 
                freq: 594, 
                color: 'rgba(220, 20, 60, 0.8)', 
                name: 'Probability Mode',
                rootwiz: 'Quantum Probability',
                description: 'This simulation shows how quantum systems exist as probability distributions until measured, illustrating quantum uncertainty.',
                cymaticPattern: 'freq-594'
            },
            { 
                freq: 672, 
                color: 'rgba(64, 224, 208, 0.8)', 
                name: 'Superposition Mode',
                rootwiz: 'Quantum Superposition',
                description: 'This visualization demonstrates how quantum particles can exist in multiple states simultaneously, a fundamental aspect of quantum mechanics.',
                cymaticPattern: 'freq-672'
            },
            { 
                freq: 720, 
                color: 'rgba(138, 43, 226, 0.8)', 
                name: 'Observer Mode',
                rootwiz: 'Measurement Effect',
                description: 'This simulation shows how observation affects quantum systems, demonstrating the measurement problem in quantum mechanics.',
                cymaticPattern: 'freq-720'
            },
            { 
                freq: 768, 
                color: 'rgba(255, 215, 0, 0.8)', 
                name: 'Duality Mode',
                rootwiz: 'Wave-Particle Duality',
                description: 'This unified visualization shows both wave and particle properties simultaneously, illustrating the fundamental duality in quantum physics.',
                cymaticPattern: 'freq-768'
            }
        ];
        
        // Initialize controller and UI elements
        this.init();
    }
    
    // Initialize controller and UI elements
    init() {
        // Initialize variables
        this.wavePoints = [];
        this.particles = [];
        this.observer = { x: 0, y: 0, active: false };
        
        // Initialize frequencies aligned with φ-harmonic principles
        this.frequencies = {
            wave: 432, // Ground State (432 Hz)
            particle: 528, // Creation Point (528 Hz)
            quantum: 768 // Unity Wave (768 Hz)
        };
        
        this.rootwizInfo = {
            wave: {
                title: "Wave Properties",
                component: "Wave Pattern Simulation",
                description: "This visualization shows how quantum entities behave as waves, forming interference patterns and spreading through space like ripples in water."
            },
            particle: {
                title: "Particle Properties",
                component: "Discrete Particle Behavior",
                description: "This visualization shows how quantum entities can behave as discrete particles with specific positions and trajectories when observed."
            },
            quantum: {
                title: "Wave-Particle Duality",
                component: "Unified Quantum Behavior",
                description: "This visualization demonstrates both wave and particle properties simultaneously, showing the fundamental duality that exists in quantum mechanics."
            }
        };
        
        // Track current state
        this.currentState = 'wave';
        this.baseFrequency = this.frequencies.wave;
        this.zenPoint = 0.618; // Golden ratio balance point
        this.consciousnessLevel = 0;
        this.cycleCount = 0;
        
        // Set up canvas and UI
        this.setupCanvas();
        this.setupUI();
        this.adjustForMobile();
        
        // Create wave points and particles
        this.createWavePoints();
        this.createParticles();
        
        // Start animation loop
        this.animate();
        
        // Update rootwiz info
        this.updateRootWizInfo('wave');
        
        console.log('Wave-Particle Duality simulation initialized ⚛️');
    }
    
    // Set up canvas
    setupCanvas() {
        this.canvas = document.getElementById(this.canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Set up the complete envelope
        this.resize();
    }
    
    // Set up interaction events with improved mobile handling
    setupUI() {
        // Get UI elements
        const waveBtn = document.querySelector('.toggle-btn[data-state="wave"]');
        const particleBtn = document.querySelector('.toggle-btn[data-state="particle"]');
        const quantumBtn = document.querySelector('.toggle-btn[data-state="quantum"]');
        const stateInfo = document.getElementById('quantum-state-info');
        
        // Store references
        this.stateInfo = stateInfo;
        this.buttons = { waveBtn, particleBtn, quantumBtn };
        
        // Add event listeners
        if (waveBtn) waveBtn.addEventListener('click', () => this.toggleState('wave'));
        if (particleBtn) particleBtn.addEventListener('click', () => this.toggleState('particle'));
        if (quantumBtn) quantumBtn.addEventListener('click', () => this.toggleState('quantum'));
        
        // Add touch and mouse events to canvas
        this.canvas.addEventListener('mousedown', this.handleInteractionStart.bind(this));
        this.canvas.addEventListener('mousemove', this.handleInteractionMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleInteractionEnd.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleInteractionEnd.bind(this));
        
        // Mobile touch events
        this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        this.canvas.addEventListener('touchend', this.handleInteractionEnd.bind(this));
        
        // Create ZEN point and consciousness indicators
        this.createIndicators();
    }
    
    // Handle mobile detection and adjustments
    adjustForMobile() {
        const isMobile = window.innerWidth <= 768;
        this.isMobile = isMobile;
        
        if (isMobile) {
            const container = this.canvas.parentElement;
            if (container) container.classList.add('mobile');
            
            // Display mobile guide
            const mobileGuide = document.querySelector('.mobile-frequency-guide');
            if (mobileGuide) mobileGuide.style.display = 'block';
        }
    }
    
    // Create ZEN point and consciousness level indicators
    createIndicators() {
        // Create ZEN point indicator
        this.zenIndicator = document.createElement('div');
        this.zenIndicator.className = 'zen-point-indicator';
        this.zenIndicator.innerHTML = '<span>ZEN φ</span>';
        this.canvas.parentElement.appendChild(this.zenIndicator);
        
        // Create consciousness level indicator
        this.consciousnessIndicator = document.createElement('div');
        this.consciousnessIndicator.className = 'consciousness-level';
        this.consciousnessIndicator.innerHTML = '<span>CON ⚛️</span>';
        this.canvas.parentElement.appendChild(this.consciousnessIndicator);
        
        // Position indicators in mobile-friendly way
        this.updateIndicators();
    }
    
    // Update indicators
    updateIndicators() {
        // Update ZEN point
        if (this.zenIndicator) {
            const zenText = this.zenPoint.toFixed(3);
            this.zenIndicator.innerHTML = `<span>ZEN φ</span> ${zenText}`;
            this.zenIndicator.style.color = this.getCurrentFrequencyColor(0.9);
        }
        
        // Update consciousness level
        if (this.consciousnessIndicator) {
            const conText = Math.floor(this.consciousnessLevel * 100);
            this.consciousnessIndicator.innerHTML = `<span>CON ⚛️</span> ${conText}%`;
            this.consciousnessIndicator.style.color = this.getCurrentFrequencyColor(0.9);
        }
    }
    
    // Handle touch start with improved mobile support
    handleTouchStart(e) {
        e.preventDefault(); // Prevent default scrolling behavior
        
        if (e.touches && e.touches[0]) {
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            
            this.observer.x = touch.clientX - rect.left;
            this.observer.y = touch.clientY - rect.top;
            this.observer.active = true;
            
            // Increase consciousness slightly more on touch for better mobile experience
            this.increaseConsciousness(0.025);
            
            // Update state info
            this.updateStateInfo('Observing quantum field...');
        }
    }
    
    // Handle touch move with improved mobile support
    handleTouchMove(e) {
        e.preventDefault(); // Prevent default scrolling behavior
        
        if (this.observer.active && e.touches && e.touches[0]) {
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            
            this.observer.x = touch.clientX - rect.left;
            this.observer.y = touch.clientY - rect.top;
            
            // Slightly increase consciousness on continuous observation
            this.increaseConsciousness(0.005);
        }
    }
    
    // Handle interaction start for mouse
    handleInteractionStart(e) {
        const rect = this.canvas.getBoundingClientRect();
        
        this.observer.x = e.clientX - rect.left;
        this.observer.y = e.clientY - rect.top;
        this.observer.active = true;
        
        // Increase consciousness
        this.increaseConsciousness(0.02);
        
        // Update state info
        this.updateStateInfo('Observing quantum field...');
    }
    
    // Handle interaction move for mouse
    handleInteractionMove(e) {
        if (this.observer.active) {
            const rect = this.canvas.getBoundingClientRect();
            
            this.observer.x = e.clientX - rect.left;
            this.observer.y = e.clientY - rect.top;
            
            // Slightly increase consciousness on continuous observation
            this.increaseConsciousness(0.003);
        }
    }
    
    // Handle interaction end
    handleInteractionEnd() {
        this.observer.active = false;
        
        // Update state info
        this.updateStateInfo('Observer effect detected...');
        
        // Decrease consciousness slightly when not actively observing
        setTimeout(() => {
            if (!this.observer.active) {
                this.consciousnessLevel = Math.max(0, this.consciousnessLevel - 0.05);
                this.updateIndicators();
                this.updateStateInfo('Quantum field returning to natural state');
            }
        }, 2000);
    }
    
    // Toggle between wave, particle, and quantum states
    toggleState(state) {
        if (this.currentState === state) return;
        
        // Mark all buttons as inactive
        Object.values(this.buttons).forEach(btn => {
            if (btn) btn.classList.remove('active');
        });
        
        // Mark active button - Fixed to directly reference button from buttons object
        if (state === 'wave' && this.buttons.waveBtn) {
            this.buttons.waveBtn.classList.add('active');
        } else if (state === 'particle' && this.buttons.particleBtn) {
            this.buttons.particleBtn.classList.add('active');
        } else if (state === 'quantum' && this.buttons.quantumBtn) {
            this.buttons.quantumBtn.classList.add('active');
        }
        
        // Set new state
        this.currentState = state;
        this.baseFrequency = this.frequencies[state];
        
        // Update rootwiz info
        this.updateRootWizInfo(state);
        
        // Update wavePoints frequencies
        this.wavePoints.forEach(point => {
            point.frequency = this.baseFrequency + Math.random() * 10 - 5;
        });
        
        // Update state information
        let stateMessage = '';
        switch (state) {
            case 'wave':
                stateMessage = 'Wave state active - observe how probability waves spread through space';
                break;
            case 'particle':
                stateMessage = 'Particle state active - matter manifests in discrete positions';
                break;
            case 'quantum':
                stateMessage = 'Quantum state active - experience the unified nature of reality';
                break;
        }
        
        this.updateStateInfo(stateMessage);
        
        // Update particles to new state colors
        this.particles.forEach(particle => {
            particle.color = this.getCurrentFrequencyColor();
        });
    }
    
    // Update information in rootwiz-info panel
    updateRootWizInfo(state) {
        const rootwizInfo = document.getElementById('rootwiz-info');
        if (!rootwizInfo) return;
        
        // Get info for current state
        const info = this.rootwizInfo[state];
        
        // Update content
        rootwizInfo.innerHTML = `
            <h4>${info.title}</h4>
            <p><strong>${info.component}</strong></p>
            <p>${info.description}</p>
        `;
        
        // Update border color
        const freqColor = this.getCurrentFrequencyColor();
        rootwizInfo.style.borderLeftColor = freqColor;
        rootwizInfo.querySelector('h4').style.color = freqColor;
    }
    
    // Update state information display
    updateStateInfo(message) {
        if (this.stateInfo) {
            this.stateInfo.textContent = message;
        }
    }
    
    // Increase consciousness level with phi-harmonic pattern
    increaseConsciousness(amount) {
        this.consciousnessLevel = Math.min(1, this.consciousnessLevel + amount);
        
        // Apply phi-harmonic pattern to ZEN point
        if (this.consciousnessLevel > 0.5) {
            // Gradually move ZEN point toward golden ratio (0.618) as consciousness increases
            this.zenPoint = 0.618 + (Math.sin(this.cycleCount * 0.01) * 0.1 * (1 - this.consciousnessLevel));
        } else {
            // More erratic ZEN point at lower consciousness
            this.zenPoint = 0.618 + (Math.sin(this.cycleCount * 0.05) * 0.2);
        }
        
        // Update indicators
        this.updateIndicators();
        
        // If consciousness reaches threshold, suggest shifting to next state
        if (this.consciousnessLevel > 0.85) {
            if (this.currentState === 'wave') {
                this.updateStateInfo('Consciousness threshold reached - ready to observe particles');
            } else if (this.currentState === 'particle') {
                this.updateStateInfo('Consciousness threshold reached - ready for quantum unity');
            }
        }
    }
    
    // Create initial wave points
    createWavePoints() {
        this.wavePoints = [];
        const numPoints = Math.floor(this.canvas.width / 5);
        
        for (let i = 0; i < numPoints; i++) {
            this.wavePoints.push({
                x: i * (this.canvas.width / numPoints),
                y: this.canvas.height / 2,
                amplitude: 0,
                frequency: this.baseFrequency,
                phase: Math.random() * Math.PI * 2
            });
        }
    }
    
    // Create quantum particles
    createParticles() {
        this.particles = [];
        // Adjust particle count based on device capability
        const isMobile = window.innerWidth <= 768;
        const densityFactor = isMobile ? 4000 : 2000; // Fewer particles on mobile
        
        const numParticles = Math.floor((this.canvas.width * this.canvas.height) / densityFactor);
        
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 1,
                color: this.getCurrentFrequencyColor(),
                speed: Math.random() * 1 + 0.5,
                direction: Math.random() * Math.PI * 2,
                waveInfluence: Math.random() * 0.618, // Golden ratio influence
                observed: false,
                coherence: Math.random(),
                lastState: null
            });
        }
    }
    
    // Resize canvas to fit container with mobile optimization
    resize() {
        const container = this.canvas.parentElement;
        if (!container) return;
        
        const { width, height } = container.getBoundingClientRect();
        
        // Check if we're on mobile (adjusting ratio for better visibility)
        const isMobile = window.innerWidth <= 768;
        
        // For mobile, use a taller canvas ratio for better touch interaction
        if (isMobile) {
            this.canvas.width = width;
            this.canvas.height = Math.min(height, width * 0.9); // Taller canvas on mobile
            
            // Add mobile class to parent for specific styling
            container.classList.add('mobile-quantum-view');
        } else {
            this.canvas.width = width;
            this.canvas.height = Math.min(height, width * 0.618); // Golden ratio on desktop
            container.classList.remove('mobile-quantum-view');
        }
        
        // Recreate elements after resize
        this.createWavePoints();
        this.createParticles();
        this.adjustForMobile();
        
        // Redraw current state
        this.draw();
    }
    
    // Adjust elements for mobile view
    adjustForMobile() {
        const isMobile = window.innerWidth <= 768;
        
        // Adjust number of particles based on device capability
        if (isMobile) {
            // Reduce particle count on mobile for better performance
            const currentCount = this.particles.length;
            const targetCount = Math.floor((this.canvas.width * this.canvas.height) / 4000); // Fewer particles
            
            if (currentCount > targetCount) {
                // Remove excess particles
                this.particles = this.particles.slice(0, targetCount);
            } else if (currentCount < targetCount) {
                // Add more particles if needed
                for (let i = currentCount; i < targetCount; i++) {
                    this.particles.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        radius: Math.random() * 2 + 1,
                        color: this.getCurrentFrequencyColor(),
                        speed: Math.random() * 1 + 0.5,
                        direction: Math.random() * Math.PI * 2,
                        waveInfluence: Math.random() * 0.618,
                        observed: false,
                        coherence: Math.random(),
                        lastState: null
                    });
                }
            }
            
            // Position indicators better for mobile
            if (this.consciousnessIndicator) {
                this.consciousnessIndicator.style.width = '8px'; // Wider for touch
            }
            
            if (this.zenPointIndicator) {
                this.zenPointIndicator.style.fontSize = '14px'; // Larger text
                this.zenPointIndicator.style.padding = '5px 8px'; // Larger touch area
                this.zenPointIndicator.style.left = '25px'; // Move right to avoid clipping
            }
        } else {
            // Reset to desktop styles
            if (this.consciousnessIndicator) {
                this.consciousnessIndicator.style.width = '5px';
            }
            
            if (this.zenPointIndicator) {
                this.zenPointIndicator.style.fontSize = '12px';
                this.zenPointIndicator.style.padding = '3px 6px';
                this.zenPointIndicator.style.left = '20px';
            }
        }
    }
    
    // Set up interaction events with improved mobile handling
    setupInteractions() {
        // Mouse interactions
        this.canvas.addEventListener('mousemove', e => this.handleInteraction(e));
        this.canvas.addEventListener('mousedown', e => this.handleCollapse(e));
        this.canvas.addEventListener('mouseup', () => this.handleRelease());
        this.canvas.addEventListener('mouseleave', () => this.handleRelease());
        
        // Enhanced touch interactions for mobile
        this.canvas.addEventListener('touchstart', e => {
            // Prevent scrolling when interacting with canvas
            e.preventDefault();
            this.touchActive = true;
            
            // Check if this is a multi-touch event
            if (e.touches.length > 1) {
                // Multi-touch could trigger frequency shift
                this.shiftToNextFrequency();
                return;
            }
            
            // Process first touch as normal collapse
            this.handleCollapse(e.touches[0]);
        }, { passive: false });
        
        this.canvas.addEventListener('touchmove', e => {
            // Prevent scrolling when interacting with canvas
            e.preventDefault();
            
            if (this.touchActive) {
                // Only handle single-touch movements
                if (e.touches.length === 1) {
                    this.handleInteraction(e.touches[0]);
                }
            }
        }, { passive: false });
        
        this.canvas.addEventListener('touchend', e => {
            // Keep track of touches remaining
            if (e.touches.length === 0) {
                this.touchActive = false;
                this.handleRelease();
            }
        });
    }
    
    // Animation loop
    animate(timestamp = 0) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        this.update(deltaTime);
        this.draw();
        
        this.animationId = requestAnimationFrame(time => this.animate(time));
    }
    
    // Update elements based on current state
    update(deltaTime) {
        // Get current frequency settings
        const currentFreq = this.frequencies.find(f => f.freq === this.activeFrequency);
        if (!currentFreq) return;
        
        // Calculate phi-harmonic amplitude based on frequency
        const phiAmplitude = this.calculatePhiAmplitude(this.activeFrequency);
        
        // Update wave points
        if (this.currentState === 'wave' || this.currentState === 'quantum') {
            this.updateWavePoints(deltaTime, phiAmplitude, currentFreq);
        }
        
        // Update particles
        this.updateParticles(deltaTime, phiAmplitude, currentFreq);
        
        // Update consciousness level based on observation count
        this.updateConsciousness();
        
        // Update ZEN point balance
        this.updateZenPoint();
    }
    
    // Calculate amplitude based on phi-harmonic principles
    calculatePhiAmplitude(frequency) {
        // Base amplitude normalized to the phi ratio
        const normalizedFreq = frequency / this.baseFrequency;
        const phiPower = Math.log(normalizedFreq) / Math.log(this.phi);
        return 30 * Math.pow(this.zenBalance, phiPower);
    }
    
    // Update wave points with phi-harmonic patterns
    updateWavePoints(deltaTime, amplitude, frequencyData) {
        const time = performance.now() / 1000;
        const centerY = this.canvas.height / 2;
        
        // Calculate wave properties based on current frequency
        const freqRatio = frequencyData.freq / this.baseFrequency;
        const waveSpeed = 2 * freqRatio;
        
        this.wavePoints.forEach((point, index) => {
            // Create phi-harmonic wave pattern based on current frequency
            const normalizedX = index / this.wavePoints.length;
            const phiPhase = Math.pow(normalizedX, 1/this.phi) * Math.PI * 2;
            
            // Primary wave
            const wave1 = Math.sin(time * waveSpeed + phiPhase) * amplitude;
            
            // Secondary harmonic wave (phi-related)
            const wave2 = Math.sin(time * waveSpeed * this.phi + phiPhase * this.phi) * (amplitude / this.phi);
            
            // Create cymatics-like interference patterns
            const interference = Math.sin(time * freqRatio + normalizedX * Math.PI * 8) * (amplitude / 4);
            
            // Combine waves with phi-harmonic ratios
            point.y = centerY + wave1 + wave2 + (this.currentState === 'quantum' ? interference : 0);
            
            // Store amplitude for drawing
            point.amplitude = Math.abs(point.y - centerY);
            point.frequency = frequencyData.freq;
        });
    }
    
    // Update particles with quantum behaviors
    updateParticles(deltaTime, amplitude, frequencyData) {
        // Calculate quantum coherence based on frequency
        const coherenceFactor = Math.pow(this.activeFrequency / this.baseFrequency, 1/this.phi);
        
        this.particles.forEach(particle => {
            // Store previous state for quantum collapse
            particle.lastState = { x: particle.x, y: particle.y };
            
            // Different movement based on current state
            if (this.currentState === 'particle') {
                // Particle behavior - more random, less wave influence
                this.updateParticleState(particle, deltaTime, frequencyData);
            } 
            else if (this.currentState === 'wave') {
                // Wave behavior - follow wave pattern
                this.updateWaveState(particle, deltaTime, amplitude, frequencyData);
            }
            else if (this.currentState === 'quantum') {
                // Quantum behavior - superposition of wave and particle
                if (Math.random() > 0.5) {
                    this.updateParticleState(particle, deltaTime, frequencyData);
                } else {
                    this.updateWaveState(particle, deltaTime, amplitude, frequencyData);
                }
                
                // Quantum entanglement - add coherent behavior
                if (Math.random() < coherenceFactor * 0.2) {
                    this.entangleParticle(particle);
                }
            }
            
            // Reset observation state
            particle.observed = false;
        });
    }
    
    // Update particle in particle state
    updateParticleState(particle, deltaTime, frequencyData) {
        // Particle behavior - more random, individual movement
        if (Math.random() < 0.05) {
            // Occasionally change direction
            particle.direction += (Math.random() - 0.5) * Math.PI / 2;
        }
        
        // Move in current direction
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;
        
        // Boundary reflection - apply phi-harmonic reflection angles
        if (particle.x < 0 || particle.x > this.canvas.width) {
            particle.direction = Math.PI - particle.direction;
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
        }
        
        if (particle.y < 0 || particle.y > this.canvas.height) {
            particle.direction = -particle.direction;
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        }
    }
    
    // Update particle in wave state
    updateWaveState(particle, deltaTime, amplitude, frequencyData) {
        // Find nearest wave point
        const wavePointIndex = Math.floor(particle.x / (this.canvas.width / this.wavePoints.length));
        const wavePoint = this.wavePoints[Math.min(wavePointIndex, this.wavePoints.length - 1)];
        
        if (!wavePoint) return;
        
        // Wave influence based on frequency
        const influenceFactor = (frequencyData.freq / this.baseFrequency) * 0.618;
        
        // Move horizontally
        particle.x += (Math.random() - 0.5) * particle.speed;
        
        // Influence from wave - stronger at higher frequencies
        const targetY = wavePoint.y;
        const distanceToWave = targetY - particle.y;
        
        // Apply wave influence with phi-harmonic dampening
        particle.y += distanceToWave * particle.waveInfluence * influenceFactor;
        
        // Add small random vertical movement
        particle.y += (Math.random() - 0.5) * particle.speed * 0.5;
        
        // Ensure particles stay within boundaries
        particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    }
    
    // Create quantum entanglement between particles
    entangleParticle(particle) {
        // Find another particle to entangle with
        const otherParticle = this.particles[Math.floor(Math.random() * this.particles.length)];
        if (otherParticle === particle) return;
        
        // Create quantum entanglement - average positions
        const avgX = (particle.x + otherParticle.x) / 2;
        const avgY = (particle.y + otherParticle.y) / 2;
        
        // Apply phi-harmonic entanglement
        particle.x = avgX + (particle.x - avgX) * this.zenBalance;
        particle.y = avgY + (particle.y - avgY) * this.zenBalance;
        otherParticle.x = avgX + (otherParticle.x - avgX) * this.zenBalance;
        otherParticle.y = avgY + (otherParticle.y - avgY) * this.zenBalance;
        
        // Share coherence
        const avgCoherence = (particle.coherence + otherParticle.coherence) / 2;
        particle.coherence = avgCoherence;
        otherParticle.coherence = avgCoherence;
    }
    
    // Update consciousness level based on observations
    updateConsciousness() {
        // Calculate consciousness level normalized to 0-100
        this.consciousnessLevel = Math.min(100, this.observationCount / 10);
        
        // Update consciousness indicator if available
        if (this.consciousnessIndicator) {
            const height = `${this.consciousnessLevel}%`;
            this.consciousnessIndicator.style.height = height;
            
            // Add phi-harmonic color transitions
            const hue = Math.floor(240 + (this.consciousnessLevel * 1.2));
            this.consciousnessIndicator.style.backgroundColor = `hsl(${hue}, 80%, 50%)`;
        }
    }
    
    // Update ZEN point balance indicator
    updateZenPoint() {
        if (!this.zenPointIndicator) return;
        
        // Calculate current ZEN balance based on particle coherence
        let totalCoherence = 0;
        this.particles.forEach(particle => {
            totalCoherence += particle.coherence;
        });
        
        const avgCoherence = totalCoherence / this.particles.length;
        const zenBalance = (avgCoherence * 0.382) + (this.zenBalance * 0.618);
        
        // Update indicator
        const zenPercent = Math.floor(zenBalance * 100);
        this.zenPointIndicator.textContent = `ZEN: ${zenPercent}%`;
        
        // Phi-harmonic color coding
        const normalized = zenBalance / this.zenBalance;
        if (normalized > 0.95) {
            this.zenPointIndicator.style.color = 'gold';
        } else if (normalized > 0.8) {
            this.zenPointIndicator.style.color = 'green';
        } else {
            this.zenPointIndicator.style.color = 'white';
        }
    }
    
    // Draw current state
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.currentState === 'wave') {
            this.drawWave();
        } else if (this.currentState === 'particle') {
            this.drawParticles();
        } else if (this.currentState === 'quantum') {
            this.drawQuantumState();
        }
    }
    
    // Draw wave state
    drawWave() {
        this.ctx.strokeStyle = 'rgba(33, 150, 243, 0.8)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        const centerY = this.canvas.height / 2;
        
        for (let i = 0; i < this.wavePoints.length; i++) {
            const point = this.wavePoints[i];
            const y = point.y;
            
            if (i === 0) {
                this.ctx.moveTo(point.x, y);
            } else {
                this.ctx.lineTo(point.x, y);
            }
        }
        
        this.ctx.stroke();
    }
    
    // Draw particle state
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    // Draw quantum state
    drawQuantumState() {
        this.ctx.strokeStyle = 'rgba(33, 150, 243, 0.4)';
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        
        const centerY = this.canvas.height / 2;
        
        for (let i = 0; i < this.wavePoints.length; i++) {
            const point = this.wavePoints[i];
            const y = point.y;
            
            if (i === 0) {
                this.ctx.moveTo(point.x, y);
            } else {
                this.ctx.lineTo(point.x, y);
            }
        }
        
        this.ctx.stroke();
        
        this.particles.forEach(particle => {
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    // Handle mouse/touch interaction for observation
    handleInteraction(event) {
        if (!this.canvas) return;
        
        // Get pointer coordinates
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Find particles within observation radius
        const observationRadius = 50;
        let observedCount = 0;
        
        this.particles.forEach(particle => {
            const dx = particle.x - x;
            const dy = particle.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < observationRadius) {
                // Mark as observed
                particle.observed = true;
                observedCount++;
                
                // Apply subtle force based on frequency
                const force = (1 - distance / observationRadius) * (this.activeFrequency / this.baseFrequency) * 0.5;
                const angle = Math.atan2(dy, dx);
                
                // Apply force with phi-harmonic dampening
                particle.x += Math.cos(angle) * force;
                particle.y += Math.sin(angle) * force;
            }
        });
        
        // Update cymatic patterns based on interaction
        if (observedCount > 0) {
            this.updateCymaticPatterns(x, y);
        }
        
        // Update state info with observation details
        if (observedCount > 0) {
            this.updateStateInfo(`Observing ${observedCount} particles at position (${Math.round(x)}, ${Math.round(y)}). ${this.getRootWIZMessage()}`);
        }
    }
    
    // Handle wave collapse event
    handleCollapse(event) {
        if (!this.canvas) return;
        
        // Get pointer coordinates
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Create collapse effect
        this.createCollapseEffect(x, y);
        
        // Increment observation count for consciousness level
        this.observationCount += 1;
        
        // Trigger frequency shift on certain thresholds
        if (this.observationCount % 10 === 0) {
            this.shiftToNextFrequency();
        }
    }
    
    // Handle release of interaction
    handleRelease() {
        // Reset some particle properties when interaction ends
        this.particles.forEach(particle => {
            particle.observed = false;
        });
    }
    
    // Create visual collapse effect
    createCollapseEffect(x, y) {
        // Create visual effect element
        const container = this.canvas.parentElement;
        if (!container) return;
        
        // Create collapse effect element
        const effect = document.createElement('div');
        effect.className = 'collapse-effect';
        
        // Position at interaction point
        effect.style.left = `${x}px`;
        effect.style.top = `${y}px`;
        
        // Set color based on current frequency
        const currentFreq = this.frequencies.find(f => f.freq === this.activeFrequency);
        if (currentFreq) {
            effect.style.borderColor = currentFreq.color;
        }
        
        // Add to container
        container.appendChild(effect);
        
        // Remove after animation
        setTimeout(() => {
            if (container.contains(effect)) {
                container.removeChild(effect);
            }
        }, 1000);
    }
    
    // Update cymatic patterns based on interaction with mobile optimizations
    updateCymaticPatterns(x, y) {
        if (!this.cymaticOverlay) return;
        
        // Get current frequency cymatic pattern
        const currentPattern = document.getElementById(`cymatic-${this.activeFrequency}`);
        if (!currentPattern) return;
        
        // Make pattern visible briefly
        currentPattern.style.opacity = '0.5';
        
        // Position pattern at interaction point for ripple effect
        // For mobile, make the pattern larger and more visible
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Center pattern for better visibility on mobile
            const containerWidth = this.canvas.width;
            const containerHeight = this.canvas.height;
            currentPattern.style.left = `${containerWidth/2 - 150}px`;
            currentPattern.style.top = `${containerHeight/2 - 150}px`;
            currentPattern.style.width = '300px';
            currentPattern.style.height = '300px';
        } else {
            // Desktop behavior - follow touch point
            currentPattern.style.left = `${x - 150}px`;
            currentPattern.style.top = `${y - 150}px`;
        }
        
        // Fade out after a moment (longer on mobile)
        setTimeout(() => {
            currentPattern.style.opacity = '0';
        }, isMobile ? 1200 : 800);
    }
    
    // Shift to next phi-harmonic frequency
    shiftToNextFrequency() {
        // Find current frequency index
        const currentIndex = this.frequencies.findIndex(f => f.freq === this.activeFrequency);
        if (currentIndex === -1) return;
        
        // Move to next frequency (cyclic)
        const nextIndex = (currentIndex + 1) % this.frequencies.length;
        this.activeFrequency = this.frequencies[nextIndex].freq;
        
        // Update particle colors to match new frequency
        this.updateParticleColors();
        
        // Display frequency shift message
        const currentFreq = this.frequencies[nextIndex];
        this.updateStateInfo(`Shifted to ${currentFreq.name} (${currentFreq.freq} Hz) - ${currentFreq.rootwiz}`);
    }
    
    // Update particle colors based on current frequency
    updateParticleColors() {
        const currentFreq = this.frequencies.find(f => f.freq === this.activeFrequency);
        if (!currentFreq) return;
        
        this.particles.forEach(particle => {
            // Apply color with slight variations for visual interest
            const alpha = 0.7 + (Math.random() * 0.3);
            const color = currentFreq.color.replace(/[\d\.]+\)$/, `${alpha})`);
            particle.color = color;
        });
    }
    
    // Get color for current frequency
    getCurrentFrequencyColor() {
        const freqData = this.frequencies.find(f => f.freq === this.activeFrequency);
        return freqData ? freqData.color : 'rgba(255, 255, 255, 0.8)';
    }
    
    // Get RootWIZ message based on current frequency
    getRootWIZMessage() {
        const currentFreq = this.frequencies.find(f => f.freq === this.activeFrequency);
        if (!currentFreq) return '';
        
        // Return root wisdom system message
        return `${currentFreq.rootwiz} activated at ${currentFreq.freq} Hz.`;
    }
    
    // Display RootWIZ information for current frequency
    displayRootWIZInfo() {
        const currentFreq = this.frequencies.find(f => f.freq === this.activeFrequency);
        if (!currentFreq) return;
        
        // Update info container if it exists
        const rootwizInfo = document.getElementById('rootwiz-info');
        if (rootwizInfo) {
            rootwizInfo.innerHTML = `
                <h4>${currentFreq.name} (${currentFreq.freq} Hz)</h4>
                <p><strong>${currentFreq.rootwiz}</strong></p>
                <p>${currentFreq.description}</p>
            `;
        }
    }
}

// Initialize the quantum singularity
const waveParticleDuality = new WaveParticleDuality();

// Add CSS for the wave-particle visualizations with mobile optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Add cymatic pattern styles if they don't exist
    if (!document.getElementById('wave-particle-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'wave-particle-styles';
        styleEl.textContent = `
            /* Wave-Particle Visualization Styles */
            .wave-particle-container {
                position: relative;
                width: 100%;
                height: 300px;
                overflow: hidden;
                background: #121212;
                border-radius: 8px;
            }
            
            /* Mobile optimizations */
            @media (max-width: 768px) {
                .wave-particle-container {
                    height: 250px; /* Slightly shorter on mobile */
                    border-radius: 6px;
                }
                
                .mobile-quantum-view {
                    touch-action: none; /* Prevent browser handling of touch gestures */
                }
                
                .control-buttons {
                    flex-wrap: wrap;
                }
                
                .toggle-btn {
                    flex: 1;
                    min-width: 80px;
                    margin: 5px;
                    padding: 12px 8px; /* Larger touch targets */
                    font-size: 14px;
                }
            }
            
            #wave-particle-canvas {
                width: 100%;
                height: 100%;
                display: block;
                touch-action: none; /* Critical for mobile touch handling */
            }
            
            /* Cymatic Patterns with mobile optimizations */
            .cymatic-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 2;
            }
            
            .cymatic-pattern {
                position: absolute;
                width: 300px;
                height: 300px;
                border-radius: 50%;
                background-position: center;
                background-size: contain;
                background-repeat: no-repeat;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }
            
            /* Frequency label for cymatic patterns */
            .frequency-label {
                position: absolute;
                bottom: 5px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 3px 8px;
                border-radius: 10px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0.8;
            }
            
            @media (max-width: 768px) {
                .cymatic-pattern {
                    width: 250px; /* Slightly smaller on mobile */
                    height: 250px;
                }
                
                .frequency-label {
                    font-size: 14px;
                    padding: 5px 10px;
                }
            }
            
            /* Frequency-specific patterns */
            .freq-432 {
                background-image: radial-gradient(circle, transparent 30%, rgba(72, 72, 72, 0.2) 70%),
                                 repeating-conic-gradient(rgba(72, 72, 72, 0), rgba(72, 72, 72, 0.2) 6deg);
            }
            
            .freq-528 {
                background-image: radial-gradient(circle, transparent 30%, rgba(0, 128, 64, 0.2) 70%),
                                 repeating-conic-gradient(rgba(0, 128, 64, 0), rgba(0, 128, 64, 0.2) 60deg);
            }
            
            .freq-594 {
                background-image: radial-gradient(circle, transparent 30%, rgba(220, 20, 60, 0.2) 70%),
                                 repeating-conic-gradient(rgba(220, 20, 60, 0), rgba(220, 20, 60, 0.2) 40deg);
            }
            
            .freq-672 {
                background-image: radial-gradient(circle, transparent 30%, rgba(64, 224, 208, 0.2) 70%),
                                 repeating-conic-gradient(rgba(64, 224, 208, 0), rgba(64, 224, 208, 0.2) 30deg);
            }
            
            .freq-720 {
                background-image: radial-gradient(circle, transparent 30%, rgba(138, 43, 226, 0.2) 70%),
                                 repeating-conic-gradient(rgba(138, 43, 226, 0), rgba(138, 43, 226, 0.2) 20deg);
            }
            
            .freq-768 {
                background-image: radial-gradient(circle, transparent 30%, rgba(255, 215, 0, 0.2) 70%),
                                 repeating-conic-gradient(rgba(255, 215, 0, 0), rgba(255, 215, 0, 0.2) 10deg);
            }
            
            /* Collapse Effect */
            .collapse-effect {
                position: absolute;
                width: 20px;
                height: 20px;
                border: 2px solid rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: collapse-ripple 1s ease-out forwards;
                pointer-events: none;
            }
            
            @keyframes collapse-ripple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
            
            /* Mobile-optimized ripple effect */
            @media (max-width: 768px) {
                .collapse-effect {
                    border-width: 3px; /* Thicker for visibility */
                }
                
                @keyframes collapse-ripple {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }
                    100% {
                        width: 250px; /* Larger ripple on mobile */
                        height: 250px;
                        opacity: 0;
                    }
                }
            }
            
            /* Consciousness Indicator */
            .consciousness-indicator {
                position: absolute;
                bottom: 10px;
                left: 10px;
                width: 5px;
                height: 0%;
                background-color: rgba(64, 224, 208, 0.8);
                transition: height 0.5s ease, background-color 0.5s ease;
                border-radius: 2px;
                z-index: 3;
            }
            
            /* ZEN Point Indicator */
            .zen-point-indicator {
                position: absolute;
                bottom: 10px;
                left: 20px;
                padding: 3px 6px;
                background-color: rgba(0, 0, 0, 0.5);
                color: white;
                border-radius: 3px;
                font-size: 12px;
                z-index: 3;
            }
            
            /* Mobile optimization for indicators */
            @media (max-width: 768px) {
                .consciousness-indicator {
                    width: 8px; /* Wider for visibility */
                    left: 12px;
                }
                
                .zen-point-indicator {
                    left: 25px;
                    padding: 5px 8px;
                    font-size: 14px;
                    bottom: 12px;
                }
            }
            
            /* State Controls */
            .control-buttons {
                display: flex;
                justify-content: center;
                margin-top: 10px;
            }
            
            .toggle-btn {
                background: #2a2a2a;
                color: white;
                border: none;
                padding: 8px 15px;
                margin: 0 5px;
                border-radius: 4px;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            
            .toggle-btn:hover {
                background: #3a3a3a;
            }
            
            .toggle-btn.active {
                background: #5a5a5a;
            }
            
            /* RootWIZ Info Panel */
            #rootwiz-info {
                margin-top: 15px;
                padding: 10px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 5px;
                color: white;
            }
            
            @media (max-width: 768px) {
                #rootwiz-info {
                    padding: 12px;
                    font-size: 14px;
                }
                
                #rootwiz-info h4 {
                    font-size: 16px;
                    margin-top: 0;
                    margin-bottom: 8px;
                }
            }
        `;
        document.head.appendChild(styleEl);
    }
});
