/**
 * Quantum Probability Visualization
 * 
 * A self-contained quantum singularity that demonstrates superposition
 * and the collapse of quantum states through observation.
 * 
 * Creating a complete envelope following ZEN FIRST principles:
 * - Ground at 432 Hz (stability)
 * - Create at 528 Hz (manifestation)
 * - Heart at 594 Hz (connection)
 * - Voice at 672 Hz (expression)
 * - Vision at 720 Hz (perception)
 * - Unity at 768 Hz (integration)
 */

class QuantumProbability {
    constructor(canvasId) {
        // Ground at 432 Hz (initialize fundamental parameters)
        this.frequency = 432;
        this.coherence = 0.8;    // Quantum coherence level (0-1)
        this.particles = [];     // Quantum particles
        this.observationStrength = 0; // How strongly we're observing (collapsing the wave function)
        this.isCollapsed = false;
        this.collapsedState = null;
        this.possibleStates = ['|0⟩', '|1⟩']; // Base quantum states
        this.superpositionAngle = 0;  // For visualization of state rotation
        this.zenPoint = 0.618;   // φ-balance point
        this.observationHistory = []; // Track previous observations
        
        // Canvas setup
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Create initial quantum states
        this.initializeQuantumState();
        
        // Set up event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Begin animation at Ground Frequency
        this.startAnimation();
    }
    
    // Ensure canvas is properly sized
    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
        this.initializeQuantumState();
    }
    
    // Initialize the quantum state
    initializeQuantumState() {
        this.particles = [];
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
        
        // Create probability cloud particles
        const particleCount = 200;
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            // Gaussian distribution around center
            const distance = this.gaussianRandom() * radius * 0.8;
            
            this.particles.push({
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance,
                originalX: centerX + Math.cos(angle) * distance,
                originalY: centerY + Math.sin(angle) * distance,
                size: 2 + Math.random() * 3,
                color: this.getFrequencyColor(this.frequency),
                phase: Math.random() * Math.PI * 2,
                velocity: { x: 0, y: 0 },
                state: Math.random() > 0.5 ? 0 : 1, // Quantum state (|0⟩ or |1⟩)
                superposition: true // Initially in superposition
            });
        }
        
        // Reset observation state
        this.isCollapsed = false;
        this.collapsedState = null;
        this.observationHistory = [];
    }
    
    // Gaussian random for more realistic probability distributions
    gaussianRandom(mean = 0, std = 1) {
        // Box-Muller transform for Gaussian distribution
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        return z0 * std + mean;
    }
    
    // Animation loop
    startAnimation() {
        if (!this.canvas || !this.ctx) return;
        
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    animate() {
        if (!this.canvas || !this.ctx) return;
        
        // Clear canvas with slight fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Get the current time for animations
        const time = Date.now() * 0.001;
        
        // Update quantum state
        this.updateQuantumState(time);
        
        // Draw probability cloud
        this.drawProbabilityCloud(time);
        
        // Draw quantum state representation
        this.drawQuantumStateRepresentation(time);
        
        // Draw observation results if collapsed
        if (this.isCollapsed) {
            this.drawObservationResults();
        }
        
        // Continue animation loop
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    updateQuantumState(time) {
        const frequencyFactor = this.frequency / 432;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Update superposition angle based on frequency
        this.superpositionAngle = (time * frequencyFactor) % (Math.PI * 2);
        
        // Check if observation caused collapse
        if (this.observationStrength > 0.7 && !this.isCollapsed) {
            this.collapseWaveFunction();
        } else if (this.observationStrength < 0.1 && this.isCollapsed) {
            // Reset to superposition if observation strength is very low
            this.isCollapsed = false;
            this.collapsedState = null;
        }
        
        // Update particles
        this.particles.forEach(particle => {
            if (this.isCollapsed) {
                // If wave function collapsed, move particles to represent the collapsed state
                this.updateCollapsedParticle(particle, centerX, centerY, time);
            } else {
                // Otherwise update as superposition
                this.updateSuperpositionParticle(particle, centerX, centerY, time);
            }
        });
    }
    
    updateSuperpositionParticle(particle, centerX, centerY, time) {
        // Wave-like motion in superposition
        const frequency = this.frequency / 100;
        const coherenceFactor = this.coherence;
        
        // Quantum fluctuations based on coherence
        const randomFactor = (1 - coherenceFactor) * (Math.random() * 2 - 1);
        
        // Calculate distance from center
        const dx = particle.x - centerX;
        const dy = particle.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Wave function behavior
        const waveOffset = Math.sin(time * frequency + particle.phase) * 5 * coherenceFactor;
        const angle = Math.atan2(dy, dx);
        
        // Apply wave motion
        particle.velocity.x = (Math.cos(angle) * waveOffset - dx * 0.02) + randomFactor;
        particle.velocity.y = (Math.sin(angle) * waveOffset - dy * 0.02) + randomFactor;
        
        // Apply velocity
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        
        // Apply soft boundary around center
        const maxDist = Math.min(this.canvas.width, this.canvas.height) * 0.4;
        if (dist > maxDist) {
            particle.x = centerX + (dx / dist) * maxDist;
            particle.y = centerY + (dy / dist) * maxDist;
        }
    }
    
    updateCollapsedParticle(particle, centerX, centerY, time) {
        // If collapsed, particles move toward their respective state positions
        let targetX, targetY;
        
        if (this.collapsedState === 0) {
            // State |0⟩ position (left)
            targetX = centerX - this.canvas.width * 0.15;
            targetY = centerY;
        } else {
            // State |1⟩ position (right)
            targetX = centerX + this.canvas.width * 0.15;
            targetY = centerY;
        }
        
        // Move toward target with some quantum jitter
        const dx = targetX - particle.x;
        const dy = targetY - particle.y;
        const jitter = (1 - this.observationStrength) * Math.random() * 2;
        
        particle.velocity.x = dx * 0.05 + (Math.random() - 0.5) * jitter;
        particle.velocity.y = dy * 0.05 + (Math.random() - 0.5) * jitter;
        
        // Apply velocity
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
    }
    
    drawProbabilityCloud(time) {
        // Draw connecting lines between particles that are close
        this.ctx.strokeStyle = this.getFrequencyColor(this.frequency, 0.1);
        this.ctx.lineWidth = 0.5;
        
        for (let i = 0; i < this.particles.length; i++) {
            const p1 = this.particles[i];
            
            // Draw quantum connections (entanglement)
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                // Connect nearby particles
                const connectionThreshold = Math.min(this.canvas.width, this.canvas.height) * 0.08;
                if (dist < connectionThreshold) {
                    const opacity = (1 - dist / connectionThreshold) * 0.2 * this.coherence;
                    this.ctx.strokeStyle = this.getFrequencyColor(this.frequency, opacity);
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Draw particles
        this.particles.forEach(particle => {
            // Particle size oscillation
            const sizePulse = Math.sin(time * 3 + particle.phase) * 0.3 + 1;
            const displaySize = particle.size * sizePulse;
            
            // Set color based on state and superposition
            let color;
            if (this.isCollapsed) {
                // Use a single color when collapsed
                color = this.getFrequencyColor(this.frequency, 0.8);
            } else {
                // In superposition, use color gradient based on probability
                const stateProbability = (Math.sin(this.superpositionAngle + particle.phase) + 1) / 2;
                const hue = this.getStateHue(stateProbability);
                color = `hsla(${hue}, 80%, 50%, 0.8)`;
            }
            
            // Draw the particle
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, displaySize, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawQuantumStateRepresentation(time) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height * 0.85;
        const radius = Math.min(this.canvas.width, this.canvas.height) * 0.1;
        
        // Draw Bloch sphere representation
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.lineWidth = 1;
        
        // Draw sphere
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Draw equator
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Draw main axes
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - radius, centerY);
        this.ctx.lineTo(centerX + radius, centerY);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY - radius);
        this.ctx.lineTo(centerX, centerY + radius);
        this.ctx.stroke();
        
        // Draw state vector
        const stateX = Math.sin(this.superpositionAngle) * radius;
        const stateY = Math.cos(this.superpositionAngle) * radius;
        
        this.ctx.strokeStyle = this.getFrequencyColor(this.frequency, 0.8);
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(centerX + stateX, centerY - stateY);
        this.ctx.stroke();
        
        // Draw state vector endpoint
        this.ctx.fillStyle = this.getFrequencyColor(this.frequency, 1);
        this.ctx.beginPath();
        this.ctx.arc(centerX + stateX, centerY - stateY, 5, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw state labels
        this.ctx.font = '14px monospace';
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.textAlign = 'center';
        
        // |0⟩ state (bottom)
        this.ctx.fillText('|0⟩', centerX, centerY + radius + 20);
        
        // |1⟩ state (top)
        this.ctx.fillText('|1⟩', centerX, centerY - radius - 10);
        
        // Current state probabilities
        if (!this.isCollapsed) {
            const prob0 = Math.cos(this.superpositionAngle / 2) ** 2;
            const prob1 = Math.sin(this.superpositionAngle / 2) ** 2;
            
            // Format probabilities to 2 decimal places
            const probText = `|ψ⟩ = ${Math.sqrt(prob0).toFixed(2)}|0⟩ + ${Math.sqrt(prob1).toFixed(2)}|1⟩`;
            this.ctx.fillText(probText, centerX, centerY + radius + 40);
        } else {
            // Collapsed state
            const stateText = `|ψ⟩ = |${this.collapsedState}⟩`;
            this.ctx.fillText(stateText, centerX, centerY + radius + 40);
        }
    }
    
    drawObservationResults() {
        // Display collapsed state info
        const resultDisplay = document.getElementById('results-display');
        if (resultDisplay) {
            resultDisplay.innerHTML = `
                <div>
                    <span>Observed State: </span>
                    <span style="font-weight: bold; color: ${this.getFrequencyColor(this.frequency, 1)}">
                        |${this.collapsedState}⟩
                    </span>
                </div>
                <div style="margin-top: 10px;">
                    <span>Observation Count: ${this.observationHistory.length}</span>
                </div>
                <div style="margin-top: 5px;">
                    <span>|0⟩ Frequency: ${this.getStateFrequency(0).toFixed(2)}%</span>
                </div>
                <div>
                    <span>|1⟩ Frequency: ${this.getStateFrequency(1).toFixed(2)}%</span>
                </div>
            `;
        }
    }
    
    collapseWaveFunction() {
        // Only collapse if not already collapsed
        if (this.isCollapsed) return;
        
        // Calculate probability of |0⟩ and |1⟩ based on current superposition angle
        const prob0 = Math.cos(this.superpositionAngle / 2) ** 2;
        
        // Collapse to |0⟩ or |1⟩ based on probability
        this.collapsedState = Math.random() < prob0 ? 0 : 1;
        this.isCollapsed = true;
        
        // Record the observation
        this.observationHistory.push(this.collapsedState);
        
        // Limit history length
        if (this.observationHistory.length > 100) {
            this.observationHistory.shift();
        }
        
        // Update UI
        this.drawObservationResults();
    }
    
    getStateFrequency(state) {
        if (this.observationHistory.length === 0) return 0;
        
        const count = this.observationHistory.filter(s => s === state).length;
        return (count / this.observationHistory.length) * 100;
    }
    
    // Control methods
    setFrequency(freq) {
        this.frequency = freq;
    }
    
    setCoherence(value) {
        this.coherence = value;
    }
    
    setObservationStrength(value) {
        this.observationStrength = value;
    }
    
    resetState() {
        this.isCollapsed = false;
        this.collapsedState = null;
        this.initializeQuantumState();
    }
    
    observe() {
        this.setObservationStrength(1.0);
        setTimeout(() => {
            // Auto-decrease observation strength after a while
            this.setObservationStrength(0.0);
        }, 2000);
    }
    
    // Helper methods
    getFrequencyColor(freq, opacity = 0.8) {
        // Color mapping based on φ-harmonic frequencies
        let hue, saturation, lightness;
        
        if (freq <= 432) {
            // Ground state - deep blue (432 Hz)
            hue = 220;
            saturation = 80;
            lightness = 40;
        } else if (freq <= 528) {
            // Creation point - purple (528 Hz)
            hue = 280;
            saturation = 70;
            lightness = 45;
        } else if (freq <= 594) {
            // Heart field - red/pink (594 Hz)
            hue = 350;
            saturation = 75;
            lightness = 50;
        } else if (freq <= 672) {
            // Voice flow - orange (672 Hz)
            hue = 30;
            saturation = 80;
            lightness = 55;
        } else if (freq <= 720) {
            // Vision gate - green (720 Hz)
            hue = 120;
            saturation = 70;
            lightness = 45;
        } else {
            // Unity wave - violet (768 Hz)
            hue = 270;
            saturation = 80;
            lightness = 60;
        }
        
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
    }
    
    getStateHue(probability) {
        // |0⟩ state color (blue) to |1⟩ state color (red)
        return 240 - probability * 240;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const probabilityCanvas = document.getElementById('probability-canvas');
    if (probabilityCanvas) {
        window.quantumProbability = new QuantumProbability('probability-canvas');
        
        // Set up UI controls
        setupProbabilityControls();
    }
});

// Set up UI controls
function setupProbabilityControls() {
    // Frequency control
    const frequencySlider = document.getElementById('prob-frequency-slider');
    if (frequencySlider) {
        frequencySlider.addEventListener('input', function() {
            const frequency = parseInt(this.value);
            window.quantumProbability.setFrequency(frequency);
            
            // Update global frequency if requested
            if (this.dataset.global === 'true') {
                document.body.dataset.frequency = frequency;
                
                // Update all frequency buttons
                document.querySelectorAll('.freq-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.freq == frequency);
                });
            }
        });
    }
    
    // Coherence control
    const coherenceSlider = document.getElementById('coherence-slider');
    if (coherenceSlider) {
        coherenceSlider.addEventListener('input', function() {
            window.quantumProbability.setCoherence(parseFloat(this.value));
        });
    }
    
    // Observation control
    const observationSlider = document.getElementById('observation-slider');
    if (observationSlider) {
        observationSlider.addEventListener('input', function() {
            window.quantumProbability.setObservationStrength(parseFloat(this.value));
        });
    }
    
    // Observe button
    const observeButton = document.getElementById('observe-btn');
    if (observeButton) {
        observeButton.addEventListener('click', function() {
            window.quantumProbability.observe();
        });
    }
    
    // Reset button
    const resetButton = document.getElementById('reset-btn');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            window.quantumProbability.resetState();
        });
    }
    
    // Global frequency buttons
    document.querySelectorAll('.freq-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const frequency = parseInt(this.dataset.freq);
            
            // Update slider if exists
            if (frequencySlider) {
                frequencySlider.value = frequency;
            }
            
            // Update quantum probability
            if (window.quantumProbability) {
                window.quantumProbability.setFrequency(frequency);
            }
            
            // Update global frequency state
            document.body.dataset.frequency = frequency;
            
            // Update active state
            document.querySelectorAll('.freq-btn').forEach(b => {
                b.classList.toggle('active', b === this);
            });
        });
    });
}
