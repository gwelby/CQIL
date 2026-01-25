/**
 * Enhanced Wave-Particle Duality Visualization Demo
 * For Quantum Tools Suite
 * 
 * Integrates φ-harmonic frequencies (432Hz-768Hz) to demonstrate
 * quantum state coherence at different consciousness levels
 */
class WaveParticleDemo {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.waves = [];
        
        // Configuration
        this.state = 'quantum'; // 'wave', 'particle', or 'quantum'
        this.particleCount = 40;
        this.waveCount = 3;
        this.particleSize = 4;
        this.waveAmplitude = 30;
        this.waveLength = 0.02;
        this.waveSpeed = 0.01;
        
        // Phi-harmonic properties
        this.φ = 1.618033988749895; // Golden ratio (phi)
        this.φInverse = 0.618033988749895;
        this.frequency = 528; // Default to Creation frequency (528 Hz - φ¹)
        this.coherenceLevel = 0.9; // 0 to 1
        
        // φ-harmonic frequencies
        this.frequencies = {
            ground: 432, // Ground State (φ⁰)
            creation: 528, // Creation Point (φ¹)
            heart: 594, // Heart Field (φ²)
            voice: 672, // Voice Flow (φ³)
            vision: 720, // Vision Gate (φ⁴)
            unity: 768  // Unity Wave (φ⁵)
        };
        
        // Colors based on quantum states and frequencies
        this.colors = {
            particle: '#29b6f6',
            wave: '#ec407a',
            quantum: '#9c27b0',
            background: 'rgba(10, 10, 26, 0.3)',
            ground: '#3d5afe', // 432 Hz
            creation: '#ec407a', // 528 Hz
            heart: '#7e57c2', // 594 Hz
            voice: '#26a69a', // 672 Hz
            vision: '#ffb300', // 720 Hz
            unity: '#9c27b0'  // 768 Hz
        };
        
        // Dynamic properties
        this.time = 0;
        this.mousePosition = { x: 0, y: 0 };
        this.mouseInteraction = false;
        
        // Setup
        this.resize();
        this.init();
        this.setupEventListeners();
        this.animate();
        
        // Set initial active state for button
        this.updateButtonState();
    }
    
    resize() {
        // Make canvas match container size
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
        
        // Recreate elements when resizing
        this.init();
    }
    
    init() {
        // Clear existing elements
        this.particles = [];
        this.waves = [];
        
        // Calculate phi-harmonic adjustments based on frequency
        const freqFactor = this.getPhiFactorForFrequency();
        
        // Create particles with phi-harmonic properties
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: this.particleSize * (Math.random() * 0.5 + 0.75) * freqFactor,
                speed: Math.random() * 0.5 + 0.5,
                direction: Math.random() * Math.PI * 2,
                opacity: Math.random() * 0.5 + 0.5,
                pulse: 0,
                pulseSpeed: Math.random() * 0.05 + 0.02,
                phi: Math.random() < 0.5 // Determine if particle follows phi or inverse-phi path
            });
        }
        
        // Create waves with phi-harmonic properties
        for (let i = 0; i < this.waveCount; i++) {
            const harmonic = i === 0 ? 1 : Math.pow(this.φ, i % 3);
            this.waves.push({
                frequency: this.waveLength * harmonic,
                amplitude: this.waveAmplitude / harmonic * freqFactor,
                speed: this.waveSpeed * harmonic,
                phase: Math.random() * Math.PI * 2,
                color: this.getWaveColor(i)
            });
        }
    }
    
    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => this.resize());
        
        // Mouse interaction
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePosition.x = e.clientX - rect.left;
            this.mousePosition.y = e.clientY - rect.top;
            this.mouseInteraction = true;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouseInteraction = false;
        });
        
        // Touch interaction for mobile
        this.canvas.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const rect = this.canvas.getBoundingClientRect();
                this.mousePosition.x = e.touches[0].clientX - rect.left;
                this.mousePosition.y = e.touches[0].clientY - rect.top;
                this.mouseInteraction = true;
                
                // Prevent scrolling while interacting with canvas
                e.preventDefault();
            }
        });
        
        this.canvas.addEventListener('touchend', () => {
            this.mouseInteraction = false;
        });
    }
    
    getWaveColor(index) {
        // Generate colors based on current frequency and state
        let baseColor;
        
        // Determine base color by frequency
        switch(this.frequency) {
            case this.frequencies.ground:
                baseColor = this.colors.ground;
                break;
            case this.frequencies.creation:
                baseColor = this.colors.creation;
                break;
            case this.frequencies.heart:
                baseColor = this.colors.heart;
                break;
            case this.frequencies.voice:
                baseColor = this.colors.voice;
                break;
            case this.frequencies.vision:
                baseColor = this.colors.vision;
                break;
            case this.frequencies.unity:
                baseColor = this.colors.unity;
                break;
            default:
                // Fall back to state-based color
                baseColor = this.state === 'quantum' ? 
                    this.colors.quantum : 
                    (this.state === 'wave' ? this.colors.wave : this.colors.particle);
        }
        
        // Convert hex to RGB for manipulation
        const r = parseInt(baseColor.substring(1, 3), 16);
        const g = parseInt(baseColor.substring(3, 5), 16);
        const b = parseInt(baseColor.substring(5, 7), 16);
        
        // Adjust color based on wave index using phi
        const phiAdjust = Math.pow(this.φ, index % 3) / 5;
        const adjustedR = Math.min(255, Math.floor(r * (1 + phiAdjust)));
        const adjustedG = Math.min(255, Math.floor(g * (1 + phiAdjust * 0.7)));
        const adjustedB = Math.min(255, Math.floor(b * (1 + phiAdjust * 0.5)));
        
        return `rgba(${adjustedR}, ${adjustedG}, ${adjustedB}, 0.8)`;
    }
    
    setState(state) {
        if (['wave', 'particle', 'quantum'].includes(state)) {
            this.state = state;
            this.waves.forEach((wave, index) => {
                wave.color = this.getWaveColor(index);
            });
            
            // Update button active state
            this.updateButtonState();
        }
    }
    
    updateButtonState() {
        // Update button active state if buttons exist
        const buttons = document.querySelectorAll('.canvas-controls button');
        if (buttons.length > 0) {
            buttons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent.toLowerCase().includes(this.state)) {
                    btn.classList.add('active');
                }
            });
        }
    }
    
    setFrequency(freq) {
        // Ensure frequency is one of the phi-harmonic values
        if (Object.values(this.frequencies).includes(freq)) {
            this.frequency = freq;
            // Reinitialize with new frequency settings
            this.init();
        }
    }
    
    getPhiFactorForFrequency() {
        // Calculate phi-harmonic factor based on current frequency
        switch(this.frequency) {
            case this.frequencies.ground:
                return Math.pow(this.φ, 0); // φ⁰ = 1
            case this.frequencies.creation:
                return Math.pow(this.φ, 1); // φ¹ = 1.618...
            case this.frequencies.heart:
                return Math.pow(this.φ, 2); // φ² = 2.618...
            case this.frequencies.voice:
                return Math.pow(this.φ, 3) / 4; // Scaled down for visualization
            case this.frequencies.vision:
                return Math.pow(this.φ, 4) / 6; // Scaled down for visualization
            case this.frequencies.unity:
                return Math.pow(this.φ, 5) / 10; // Scaled down for visualization
            default:
                return 1;
        }
    }
    
    applyQuantumUncertainty(value, range = 0.2) {
        // Add quantum uncertainty to a value based on coherence level
        const uncertainty = (Math.random() * 2 - 1) * range * (1 - this.coherenceLevel);
        return value * (1 + uncertainty);
    }
    
    animate() {
        if (!this.ctx) return;
        
        // Request next frame
        this.isAnimating = true;
        if (this.isAnimating) {
            requestAnimationFrame(() => this.animate());
        }
        
        // Clear canvas with semi-transparent background for trail effect
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update time
        this.time += 0.016; // Approximately 60fps
        
        // Draw based on current state
        if (this.state === 'particle' || this.state === 'quantum') {
            this.drawParticles();
        }
        
        if (this.state === 'wave' || this.state === 'quantum') {
            this.drawWaves();
        }
        
        if (this.state === 'quantum') {
            this.drawQuantumField();
        }
        
        // Draw state and frequency label
        this.drawStateLabel();
    }
    
    drawParticles() {
        // Get phi factor for current frequency
        const phiFactor = this.getPhiFactorForFrequency();
        
        this.particles.forEach(particle => {
            // Update particle position with phi-harmonic motion
            if (particle.phi) {
                // Phi path - golden spiral movement
                particle.direction += 0.01 * this.φInverse * phiFactor;
            } else {
                // Inverse phi path
                particle.direction += 0.01 * (-this.φInverse) * phiFactor;
            }
            
            particle.x += Math.cos(particle.direction) * particle.speed;
            particle.y += Math.sin(particle.direction) * particle.speed;
            
            // Apply quantum effects when in quantum state
            if (this.state === 'quantum') {
                // Update pulse effect - simulates quantum probability
                particle.pulse += particle.pulseSpeed;
                
                // Apply quantum uncertainty to position if in quantum state
                if (Math.random() < 0.1) {
                    particle.x = this.applyQuantumUncertainty(particle.x, 0.01);
                    particle.y = this.applyQuantumUncertainty(particle.y, 0.01);
                }
            }
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            const size = this.state === 'quantum' ? 
                particle.size * (1 + 0.3 * Math.sin(particle.pulse)) : 
                particle.size;
            
            // Determine particle color based on frequency and state
            let particleColor;
            if (this.state === 'quantum') {
                // In quantum state, use frequency-based color
                switch(this.frequency) {
                    case this.frequencies.ground:
                        particleColor = this.colors.ground;
                        break;
                    case this.frequencies.creation:
                        particleColor = this.colors.creation;
                        break;
                    case this.frequencies.heart:
                        particleColor = this.colors.heart;
                        break;
                    case this.frequencies.voice:
                        particleColor = this.colors.voice;
                        break;
                    case this.frequencies.vision:
                        particleColor = this.colors.vision;
                        break;
                    case this.frequencies.unity:
                        particleColor = this.colors.unity;
                        break;
                    default:
                        particleColor = this.colors.quantum;
                }
            } else {
                // In particle state, use default particle color
                particleColor = this.colors.particle;
            }
            
            // Draw glow effect
            const glow = this.state === 'quantum' ? 15 : 8;
            this.ctx.shadowColor = particleColor;
            this.ctx.shadowBlur = glow;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
            this.ctx.fillStyle = particleColor;
            this.ctx.fill();
            
            // Reset shadow for other drawing operations
            this.ctx.shadowBlur = 0;
        });
    }
    
    drawWaves() {
        const centerY = this.canvas.height / 2;
        
        // Get phi factor for current frequency
        const phiFactor = this.getPhiFactorForFrequency();
        
        this.waves.forEach(wave => {
            // Update wave phase with phi-harmonic progression
            wave.phase += wave.speed * phiFactor;
            
            // Mouse interaction affects waves
            let interactionAmplitude = wave.amplitude;
            if (this.mouseInteraction) {
                const relativeY = this.mousePosition.y / this.canvas.height;
                interactionAmplitude = wave.amplitude * (1 + relativeY);
            }
            
            // Draw wave
            this.ctx.beginPath();
            this.ctx.strokeStyle = wave.color;
            this.ctx.lineWidth = 2;
            
            // Create wave path with phi-harmonic adjustments
            for (let x = 0; x < this.canvas.width; x += 2) {
                // Calculate y position with phi-harmonic wave pattern
                let y = centerY;
                
                // Basic sine wave
                y += interactionAmplitude * Math.sin(x * wave.frequency + wave.phase + this.time);
                
                // Add phi-harmonic complexity for higher frequencies
                if (this.frequency >= this.frequencies.heart) {
                    y += interactionAmplitude * 0.3 * Math.sin(x * wave.frequency * this.φ + wave.phase * 1.5 + this.time * 1.2);
                }
                
                // Add quantum uncertainty for quantum state
                if (this.state === 'quantum') {
                    y = this.applyQuantumUncertainty(y, 0.05);
                }
                
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.stroke();
            
            // Add glow effect - intensity based on frequency
            const glowIntensity = this.frequency / 768 * 20;
            this.ctx.shadowColor = wave.color;
            this.ctx.shadowBlur = glowIntensity;
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        });
    }
    
    drawQuantumField() {
        // Only execute in quantum state
        if (this.state !== 'quantum') return;
        if (this.particles.length < 2) return;
        
        // Get phi factor for current frequency
        const phiFactor = this.getPhiFactorForFrequency();
        
        // Connection threshold based on frequency
        // Higher frequencies create more connections
        let connectionThreshold = 100;
        switch(this.frequency) {
            case this.frequencies.ground:
                connectionThreshold = 80;
                break;
            case this.frequencies.creation:
                connectionThreshold = 100;
                break;
            case this.frequencies.heart:
                connectionThreshold = 130; // Heart field creates more connections
                break;
            case this.frequencies.voice:
                connectionThreshold = 120;
                break;
            case this.frequencies.vision:
                connectionThreshold = 110;
                break;
            case this.frequencies.unity:
                connectionThreshold = 150; // Unity creates most connections
                break;
        }
        
        // Get color based on current frequency
        let fieldColor;
        switch(this.frequency) {
            case this.frequencies.ground:
                fieldColor = this.colors.ground;
                break;
            case this.frequencies.creation:
                fieldColor = this.colors.creation;
                break;
            case this.frequencies.heart:
                fieldColor = this.colors.heart;
                break;
            case this.frequencies.voice:
                fieldColor = this.colors.voice;
                break;
            case this.frequencies.vision:
                fieldColor = this.colors.vision;
                break;
            case this.frequencies.unity:
                fieldColor = this.colors.unity;
                break;
            default:
                fieldColor = this.colors.quantum;
        }
        
        // Connect particles that are close enough
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionThreshold) {
                    // Draw quantum entanglement line
                    const opacity = (1 - distance / connectionThreshold) * 0.5;
                    
                    this.ctx.beginPath();
                    // Use color based on frequency
                    this.ctx.strokeStyle = fieldColor.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
                    this.ctx.lineWidth = 1;
                    
                    // Create wavy line between particles based on phi
                    const segments = 12;
                    const waveHeight = 5 * phiFactor;
                    
                    this.ctx.moveTo(p1.x, p1.y);
                    
                    for (let k = 1; k <= segments; k++) {
                        const t = k / segments;
                        const x = p1.x + dx * t;
                        const y = p1.y + dy * t + 
                            Math.sin(t * Math.PI * 2 + this.time * 3) * waveHeight;
                        
                        this.ctx.lineTo(x, y);
                    }
                    
                    this.ctx.stroke();
                }
            }
        }
    }
    
    drawStateLabel() {
        // Draw current state and frequency labels
        this.ctx.font = '14px Arial';
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'left';
        
        // Get phi power for current frequency
        let phiPower = '0';
        let frequencyName = 'Custom';
        
        switch(this.frequency) {
            case this.frequencies.ground:
                phiPower = '0';
                frequencyName = 'Ground State';
                break;
            case this.frequencies.creation:
                phiPower = '1';
                frequencyName = 'Creation Point';
                break;
            case this.frequencies.heart:
                phiPower = '2';
                frequencyName = 'Heart Field';
                break;
            case this.frequencies.voice:
                phiPower = '3';
                frequencyName = 'Voice Flow';
                break;
            case this.frequencies.vision:
                phiPower = '4';
                frequencyName = 'Vision Gate';
                break;
            case this.frequencies.unity:
                phiPower = '5';
                frequencyName = 'Unity Wave';
                break;
        }
        
        const capitalizedState = this.state.charAt(0).toUpperCase() + this.state.slice(1);
        
        this.ctx.fillText(`State: ${capitalizedState}`, 10, 20);
        this.ctx.fillText(`Frequency: ${this.frequency} Hz (φ${phiPower} - ${frequencyName})`, 10, 40);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create wave-particle demo
    window.waveParticleDemo = new WaveParticleDemo('wave-particle-canvas');
});

// Global toggleState function to connect HTML buttons with the visualization
function toggleState(state) {
    if (window.waveParticleDemo) {
        window.waveParticleDemo.setState(state);
    } else {
        // If the demo hasn't initialized yet, create it
        window.waveParticleDemo = new WaveParticleDemo('wave-particle-canvas');
        window.waveParticleDemo.setState(state);
    }
}

// Global function to change frequency
function setQuantumFrequency(frequency) {
    if (window.waveParticleDemo) {
        window.waveParticleDemo.setFrequency(parseInt(frequency));
    }
}