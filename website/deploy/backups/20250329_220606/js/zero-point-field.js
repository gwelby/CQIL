/**
 * Zero-Point Field Visualization
 * 
 * This creates a quantum singularity that demonstrates zero-point energy
 * and vacuum fluctuations at the φ-harmonic frequencies.
 */

class ZeroPointField {
    constructor(canvasId) {
        // Initialize at Ground State (432 Hz)
        this.frequency = 432;
        this.fieldStrength = 0.7;
        this.vacuumFluctuation = 0.3;
        this.fieldNodes = [];
        this.virtualParticles = [];
        this.zenPoint = 0.618; // φ balance point
        this.energyLevel = 0;
        this.isActive = false;
        
        // Canvas setup
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Set up field
        this.initializeField();
        
        // Event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Begin at Ground Frequency
        this.startAnimation();
    }
    
    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
        this.initializeField();
    }
    
    initializeField() {
        const gridSize = Math.min(this.canvas.width, this.canvas.height) / 20;
        const cols = Math.ceil(this.canvas.width / gridSize);
        const rows = Math.ceil(this.canvas.height / gridSize);
        
        // Create field nodes
        this.fieldNodes = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                this.fieldNodes.push({
                    x: x * gridSize,
                    y: y * gridSize,
                    originalX: x * gridSize,
                    originalY: y * gridSize,
                    energy: 0,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }
        
        // Reset virtual particles
        this.virtualParticles = [];
        
        // Reset energy level
        this.energyLevel = 0;
    }
    
    startAnimation() {
        if (!this.canvas || !this.ctx) return;
        this.isActive = true;
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    animate() {
        if (!this.canvas || !this.ctx || !this.isActive) return;
        
        // Clear canvas
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Get the current time for animations
        const time = Date.now() * 0.001;
        
        // Update and draw field
        this.updateField(time);
        this.drawField();
        
        // Update and draw virtual particles
        this.updateVirtualParticles(time);
        this.drawVirtualParticles();
        
        // Update energy readings
        this.updateEnergyReadings();
        
        // Continue animation loop
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    updateField(time) {
        const frequencyFactor = this.frequency / 432;
        
        // Update field nodes
        this.fieldNodes.forEach(node => {
            // Calculate base field energy based on frequency
            const fieldEnergy = Math.sin(time * frequencyFactor + node.phase) * this.fieldStrength;
            
            // Add vacuum fluctuations
            const fluctuation = (Math.random() * 2 - 1) * this.vacuumFluctuation;
            
            // Set node energy
            node.energy = fieldEnergy + fluctuation;
        });
        
        // Occasionally create virtual particle pairs
        if (Math.random() < 0.05 * this.vacuumFluctuation && this.virtualParticles.length < 50) {
            this.createVirtualParticlePair();
        }
    }
    
    drawField() {
        // Connect field nodes to visualize quantum field
        const connectionDistance = Math.min(this.canvas.width, this.canvas.height) / 15;
        
        this.ctx.lineWidth = 0.5;
        
        // Draw field connections
        for (let i = 0; i < this.fieldNodes.length; i++) {
            const node1 = this.fieldNodes[i];
            
            for (let j = i + 1; j < this.fieldNodes.length; j++) {
                const node2 = this.fieldNodes[j];
                
                const dx = node2.x - node1.x;
                const dy = node2.y - node1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const energyAvg = (node1.energy + node2.energy) / 2;
                    const opacity = (1 - distance / connectionDistance) * 0.3 * (0.5 + Math.abs(energyAvg) * 0.5);
                    
                    // Get color based on energy
                    this.ctx.strokeStyle = this.getEnergyColor(energyAvg, opacity);
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(node1.x, node1.y);
                    this.ctx.lineTo(node2.x, node2.y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Draw field nodes
        this.fieldNodes.forEach(node => {
            const energyMagnitude = Math.abs(node.energy);
            const nodeSize = 1 + energyMagnitude * 3;
            
            this.ctx.fillStyle = this.getEnergyColor(node.energy, 0.8);
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    createVirtualParticlePair() {
        // Create a particle-antiparticle pair at a random location
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2;
        const lifespan = 1 + Math.random() * 2; // seconds
        
        // Particle
        this.virtualParticles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: 2 + Math.random() * 2,
            color: this.getFrequencyColor(this.frequency, 0.8),
            isAntiparticle: false,
            birthTime: Date.now() * 0.001,
            lifespan: lifespan
        });
        
        // Antiparticle (opposite direction)
        this.virtualParticles.push({
            x: x,
            y: y,
            vx: -Math.cos(angle) * speed,
            vy: -Math.sin(angle) * speed,
            size: 2 + Math.random() * 2,
            color: this.getAntiparticleColor(this.frequency, 0.8),
            isAntiparticle: true,
            birthTime: Date.now() * 0.001,
            lifespan: lifespan
        });
    }
    
    updateVirtualParticles(time) {
        // Filter out expired particles
        this.virtualParticles = this.virtualParticles.filter(particle => {
            const age = time - particle.birthTime;
            return age < particle.lifespan;
        });
        
        // Update positions
        this.virtualParticles.forEach(particle => {
            // Get age ratio (0-1)
            const age = time - particle.birthTime;
            const ageRatio = age / particle.lifespan;
            
            // Slow down as they recombine
            const speedFactor = 1 - ageRatio;
            
            // Update position
            particle.x += particle.vx * speedFactor;
            particle.y += particle.vy * speedFactor;
            
            // Keep in bounds
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
        });
    }
    
    drawVirtualParticles() {
        const time = Date.now() * 0.001;
        
        this.virtualParticles.forEach(particle => {
            // Calculate opacity based on age
            const age = time - particle.birthTime;
            const ageRatio = age / particle.lifespan;
            const opacity = 1 - ageRatio;
            
            // Calculate size with subtle pulsation
            const pulse = Math.sin(time * 10 + particle.birthTime) * 0.2 + 1;
            const size = particle.size * pulse * (1 - ageRatio * 0.5);
            
            // Set color with age-based opacity
            const color = particle.isAntiparticle ? 
                this.getAntiparticleColor(this.frequency, opacity) : 
                this.getFrequencyColor(this.frequency, opacity);
            
            // Draw particle
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw a subtle glow
            const glowSize = size * 3;
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, size,
                particle.x, particle.y, glowSize
            );
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    updateEnergyReadings() {
        // Calculate current energy level
        const totalEnergy = this.fieldNodes.reduce((sum, node) => sum + Math.abs(node.energy), 0);
        const avgEnergy = totalEnergy / this.fieldNodes.length;
        this.energyLevel = avgEnergy * this.fieldStrength;
        
        // Calculate φ-harmonic ratios
        const frequencyRatio = this.frequency / 432;
        const energyRatio = this.energyLevel / this.zenPoint;
        
        // Update UI
        const energyReadings = document.getElementById('energy-readings');
        if (energyReadings) {
            // Convert to scientific notation with 3 decimal places
            const energyValue = (this.energyLevel * 1e-19).toExponential(3);
            const fluctuationLevel = (this.vacuumFluctuation * frequencyRatio).toFixed(3);
            const virtualPairs = this.virtualParticles.length / 2;
            
            energyReadings.innerHTML = `
                <div class="energy-stat">
                    <div class="stat-label">Zero-Point Energy:</div>
                    <div class="stat-value">${energyValue} J</div>
                </div>
                <div class="energy-stat">
                    <div class="stat-label">Quantum Fluctuation:</div>
                    <div class="stat-value">${fluctuationLevel}</div>
                </div>
                <div class="energy-stat">
                    <div class="stat-label">Virtual Particle Pairs:</div>
                    <div class="stat-value">${virtualPairs}</div>
                </div>
                <div class="energy-stat">
                    <div class="stat-label">φ-Harmonic Balance:</div>
                    <div class="stat-value">${(energyRatio * 100).toFixed(1)}%</div>
                </div>
            `;
        }
    }
    
    // Control methods
    setFrequency(freq) {
        this.frequency = freq;
    }
    
    setFieldStrength(strength) {
        this.fieldStrength = strength;
    }
    
    setVacuumFluctuation(level) {
        this.vacuumFluctuation = level;
    }
    
    activate() {
        this.isActive = true;
        if (!this.animationFrame) {
            this.startAnimation();
        }
    }
    
    deactivate() {
        this.isActive = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }
    
    reset() {
        this.initializeField();
    }
    
    // Helper methods
    getFrequencyColor(freq, opacity = 0.8) {
        // Color mapping based on φ-harmonic frequencies
        let hue, saturation, lightness;
        
        if (freq <= 432) {
            hue = 220; // Ground - blue
        } else if (freq <= 528) {
            hue = 280; // Creation - purple
        } else if (freq <= 594) {
            hue = 350; // Heart - red/pink
        } else if (freq <= 672) {
            hue = 30;  // Voice - orange
        } else if (freq <= 720) {
            hue = 120; // Vision - green
        } else {
            hue = 270; // Unity - violet
        }
        
        return `hsla(${hue}, 80%, 50%, ${opacity})`;
    }
    
    getAntiparticleColor(freq, opacity = 0.8) {
        // Complementary color to the frequency color
        let hue;
        
        if (freq <= 432) {
            hue = 40;  // Complement to blue
        } else if (freq <= 528) {
            hue = 100; // Complement to purple
        } else if (freq <= 594) {
            hue = 170; // Complement to red/pink
        } else if (freq <= 672) {
            hue = 210; // Complement to orange
        } else if (freq <= 720) {
            hue = 300; // Complement to green
        } else {
            hue = 90;  // Complement to violet
        }
        
        return `hsla(${hue}, 80%, 50%, ${opacity})`;
    }
    
    getEnergyColor(energy, opacity = 0.8) {
        // Map energy value to color
        let hue;
        
        if (energy > 0) {
            // Positive energy (warm colors)
            hue = 0 + (1 - energy) * 60; // Red to yellow
        } else {
            // Negative energy (cool colors)
            hue = 180 + (1 + energy) * 60; // Cyan to blue
        }
        
        return `hsla(${hue}, 80%, 50%, ${opacity})`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize zero-point field
    const zpfCanvas = document.getElementById('zpf-canvas');
    if (zpfCanvas) {
        window.zeroPointField = new ZeroPointField('zpf-canvas');
        setupZPFControls();
    }
});

// Set up UI controls
function setupZPFControls() {
    // Frequency control
    const frequencySlider = document.getElementById('zpf-frequency-slider');
    if (frequencySlider) {
        frequencySlider.addEventListener('input', function() {
            const frequency = parseInt(this.value);
            window.zeroPointField.setFrequency(frequency);
            
            // Update global frequency if needed
            if (this.dataset.global === 'true') {
                document.body.dataset.frequency = frequency;
                document.querySelectorAll('.freq-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.freq == frequency);
                });
            }
        });
    }
    
    // Field strength control
    const fieldStrengthSlider = document.getElementById('field-strength-slider');
    if (fieldStrengthSlider) {
        fieldStrengthSlider.addEventListener('input', function() {
            window.zeroPointField.setFieldStrength(parseFloat(this.value));
        });
    }
    
    // Vacuum fluctuation control
    const fluctuationSlider = document.getElementById('fluctuation-slider');
    if (fluctuationSlider) {
        fluctuationSlider.addEventListener('input', function() {
            window.zeroPointField.setVacuumFluctuation(parseFloat(this.value));
        });
    }
    
    // Activate button
    const activateButton = document.getElementById('zpf-activate');
    if (activateButton) {
        activateButton.addEventListener('click', function() {
            window.zeroPointField.activate();
            this.classList.add('active');
            document.getElementById('zpf-deactivate')?.classList.remove('active');
        });
    }
    
    // Deactivate button
    const deactivateButton = document.getElementById('zpf-deactivate');
    if (deactivateButton) {
        deactivateButton.addEventListener('click', function() {
            window.zeroPointField.deactivate();
            this.classList.add('active');
            document.getElementById('zpf-activate')?.classList.remove('active');
        });
    }
    
    // Reset button
    const resetButton = document.getElementById('zpf-reset');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            window.zeroPointField.reset();
        });
    }
    
    // Global frequency buttons
    document.querySelectorAll('.freq-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const frequency = parseInt(this.dataset.freq);
            
            // Update zpf frequency if available
            if (window.zeroPointField) {
                window.zeroPointField.setFrequency(frequency);
            }
            
            // Update slider if it exists
            if (frequencySlider) {
                frequencySlider.value = frequency;
            }
            
            // Update global frequency state
            document.body.dataset.frequency = frequency;
            
            // Update active state on buttons
            document.querySelectorAll('.freq-btn').forEach(b => {
                b.classList.toggle('active', b === this);
            });
        });
    });
}
