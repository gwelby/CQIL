/**
 * Enhanced Wave-Particle Duality Visualization Demo
 * For Quantum Tools Suite
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
        this.colors = {
            particle: '#29b6f6',
            wave: '#ec407a',
            quantum: '#9c27b0',
            background: 'rgba(10, 10, 26, 0.3)'
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
        
        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: this.particleSize * (Math.random() * 0.5 + 0.75),
                speed: Math.random() * 0.5 + 0.5,
                direction: Math.random() * Math.PI * 2,
                opacity: Math.random() * 0.5 + 0.5,
                pulse: 0,
                pulseSpeed: Math.random() * 0.05 + 0.02
            });
        }
        
        // Create waves
        for (let i = 0; i < this.waveCount; i++) {
            this.waves.push({
                frequency: this.waveLength * (i + 1),
                amplitude: this.waveAmplitude / (i + 1),
                speed: this.waveSpeed * (i + 1),
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
        // Generate colors for different waves in a gradient
        const baseColor = this.state === 'quantum' ? 
            this.colors.quantum : 
            (this.state === 'wave' ? this.colors.wave : this.colors.particle);
        
        // Convert hex to RGB and adjust based on index
        const r = parseInt(baseColor.slice(1, 3), 16);
        const g = parseInt(baseColor.slice(3, 5), 16);
        const b = parseInt(baseColor.slice(5, 7), 16);
        
        const adjustFactor = 0.1 * index;
        
        return `rgba(${r}, ${g}, ${b}, ${0.8 - adjustFactor})`;
    }
    
    setState(state) {
        // Valid states: 'wave', 'particle', 'quantum'
        if (['wave', 'particle', 'quantum'].includes(state)) {
            this.state = state;
            
            // Update wave colors
            this.waves.forEach((wave, index) => {
                wave.color = this.getWaveColor(index);
            });
        }
    }
    
    applyQuantumUncertainty(value, range = 0.2) {
        // Add quantum uncertainty effect
        return value * (1 + (Math.random() * range * 2 - range));
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Clear canvas with slight fade for trail effect
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Increment time
        this.time += 0.01;
        
        // Draw based on current state
        if (this.state === 'particle' || this.state === 'quantum') {
            this.drawParticles();
        }
        
        if (this.state === 'wave' || this.state === 'quantum') {
            this.drawWaves();
        }
        
        // Draw quantum field effect if in quantum state
        if (this.state === 'quantum') {
            this.drawQuantumField();
        }
        
        // Draw state label
        this.drawStateLabel();
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            // Update particle position
            if (this.state === 'quantum') {
                // Add quantum uncertainty to movement
                particle.direction += (Math.random() - 0.5) * 0.2;
                particle.speed = this.applyQuantumUncertainty(particle.speed);
            }
            
            particle.x += Math.cos(particle.direction) * particle.speed;
            particle.y += Math.sin(particle.direction) * particle.speed;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.direction = Math.PI - particle.direction;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.direction = -particle.direction;
            }
            
            // Pulse effect
            particle.pulse += particle.pulseSpeed;
            const pulseFactor = Math.sin(particle.pulse) * 0.2 + 1;
            
            // Mouse interaction
            let interactionFactor = 1;
            if (this.mouseInteraction) {
                const dx = particle.x - this.mousePosition.x;
                const dy = particle.y - this.mousePosition.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    // Particles react to mouse proximity
                    const repel = this.state === 'particle' ? 1 : -1;
                    particle.direction = Math.atan2(dy, dx) + (repel * Math.PI);
                    particle.speed = Math.max(particle.speed, 2);
                    interactionFactor = 1.5;
                }
            }
            
            // Draw particle
            const size = particle.size * pulseFactor * interactionFactor;
            const color = this.state === 'quantum' ? this.colors.quantum : this.colors.particle;
            
            // Glow effect
            const glow = this.ctx.createRadialGradient(
                particle.x, particle.y, size * 0.2,
                particle.x, particle.y, size * 2
            );
            glow.addColorStop(0, color);
            glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            this.ctx.beginPath();
            this.ctx.fillStyle = glow;
            this.ctx.arc(particle.x, particle.y, size * 2, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Core
            this.ctx.beginPath();
            this.ctx.fillStyle = color;
            this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Highlight
            this.ctx.beginPath();
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            this.ctx.arc(
                particle.x - size * 0.3,
                particle.y - size * 0.3,
                size * 0.2, 0, Math.PI * 2
            );
            this.ctx.fill();
        });
    }
    
    drawWaves() {
        const centerY = this.canvas.height / 2;
        
        this.waves.forEach(wave => {
            // Update wave phase
            wave.phase += wave.speed;
            
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
            
            // Create wave path
            for (let x = 0; x < this.canvas.width; x += 2) {
                const y = centerY + interactionAmplitude * 
                    Math.sin(x * wave.frequency + wave.phase + this.time);
                
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.stroke();
            
            // Add glow effect
            this.ctx.shadowColor = wave.color;
            this.ctx.shadowBlur = 10;
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        });
    }
    
    drawQuantumField() {
        // Draw quantum field visualization - connects waves and particles
        if (this.particles.length < 2) return;
        
        // Only connect particles that are close enough
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    // Draw quantum entanglement line
                    const opacity = (1 - distance / 100) * 0.5;
                    
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(156, 39, 176, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    
                    // Create wavy line between particles
                    const segments = 12;
                    const waveHeight = 5;
                    
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
        // Draw current state label
        this.ctx.font = '14px Arial';
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`State: ${this.state.charAt(0).toUpperCase() + this.state.slice(1)}`, 10, 20);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create wave-particle demo
    window.waveParticleDemo = new WaveParticleDemo('wave-particle-canvas');
    
    // Handle control buttons
    document.querySelectorAll('.canvas-controls button').forEach(button => {
        button.addEventListener('click', () => {
            const state = button.textContent.toLowerCase().split(' ')[0];
            window.waveParticleDemo.setState(state);
            
            // Update button active state
            document.querySelectorAll('.canvas-controls button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
    });
});