/**
 * Quantum Teleportation Visualization
 * 
 * A self-contained quantum singularity demonstrating the principles of
 * quantum teleportation at φ-harmonic frequencies. This follows the
 * principle that "A unified quantum field doesn't require complex bridges
 * between systems - it IS the bridge."
 * 
 * Grounded at 432 Hz for stability, with φ-harmonic shifts through higher frequencies.
 */

class QuantumTeleportation {
    constructor(canvasId) {
        // Ground at 432 Hz
        this.frequency = 432;
        this.entanglementStrength = 0.8;
        this.teleportationState = 'idle'; // idle, preparing, teleporting, complete
        this.qubits = {
            source: { state: '|0⟩', position: {}, color: '', entangled: false },
            target: { state: '|0⟩', position: {}, color: '', entangled: false }
        };
        this.teleportSteps = 0;
        this.zenPoint = 0.618; // φ balance point
        this.teleportationHistory = [];
        this.particles = [];
        this.entanglementParticles = [];
        
        // Canvas setup
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Initialize the quantum system
        this.initializeSystem();
        
        // Set up event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Begin animation at Ground Frequency
        this.startAnimation();
    }
    
    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
        this.initializeSystem();
    }
    
    initializeSystem() {
        // Set qubit positions
        const centerY = this.canvas.height / 2;
        this.qubits.source.position = {
            x: this.canvas.width * 0.25,
            y: centerY
        };
        this.qubits.target.position = {
            x: this.canvas.width * 0.75,
            y: centerY
        };
        
        // Initialize to ground state |0⟩
        this.resetSystem();
    }
    
    resetSystem() {
        // Reset qubits to |0⟩ state
        this.qubits.source.state = '|0⟩';
        this.qubits.target.state = '|0⟩';
        this.qubits.source.entangled = false;
        this.qubits.target.entangled = false;
        this.qubits.source.color = this.getFrequencyColor(this.frequency);
        this.qubits.target.color = this.getFrequencyColor(this.frequency);
        this.teleportationState = 'idle';
        this.teleportSteps = 0;
        
        // Initialize particles around qubits
        this.initializeParticles();
        
        // Clear entanglement particles
        this.entanglementParticles = [];
        
        // Update UI
        this.updateTeleportationDisplay();
    }
    
    initializeParticles() {
        this.particles = [];
        
        // Create particles around source qubit
        this.createQubitParticles(this.qubits.source, 30);
        
        // Create particles around target qubit
        this.createQubitParticles(this.qubits.target, 30);
    }
    
    createQubitParticles(qubit, count) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 30;
            
            this.particles.push({
                x: qubit.position.x + Math.cos(angle) * distance,
                y: qubit.position.y + Math.sin(angle) * distance,
                radius: distance,
                angle: angle,
                qubit: qubit,
                size: 2 + Math.random() * 2,
                speed: 0.01 + Math.random() * 0.02,
                phase: Math.random() * Math.PI * 2,
                color: qubit.color
            });
        }
    }
    
    startAnimation() {
        if (!this.canvas || !this.ctx) return;
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    animate() {
        if (!this.canvas || !this.ctx) return;
        
        // Clear canvas
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Get current time for animations
        const time = Date.now() * 0.001;
        
        // Update teleportation process
        if (this.teleportationState === 'teleporting') {
            this.updateTeleportationProcess(time);
        }
        
        // Update and draw entanglement
        this.updateEntanglement(time);
        this.drawEntanglement();
        
        // Update and draw particles
        this.updateParticles(time);
        this.drawParticles();
        
        // Draw qubits
        this.drawQubits();
        
        // Continue animation loop
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    updateParticles(time) {
        // Update particles orbiting qubits
        this.particles.forEach(particle => {
            // Orbiting motion
            particle.angle += particle.speed;
            
            // Apply wave-like motion
            const radiusVariation = Math.sin(time * 2 + particle.phase) * 5;
            const radius = particle.radius + radiusVariation;
            
            // Calculate new position
            particle.x = particle.qubit.position.x + Math.cos(particle.angle) * radius;
            particle.y = particle.qubit.position.y + Math.sin(particle.angle) * radius;
            
            // Update color based on qubit state
            particle.color = particle.qubit.color;
        });
    }
    
    drawParticles() {
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    updateEntanglement(time) {
        if (!this.qubits.source.entangled || !this.qubits.target.entangled) return;
        
        // Update existing entanglement particles
        this.entanglementParticles = this.entanglementParticles.filter(p => !p.expired);
        
        // Create new entanglement particles
        if (Math.random() < 0.1 * this.entanglementStrength) {
            this.createEntanglementParticle();
        }
        
        // Update entanglement particles
        this.entanglementParticles.forEach(particle => {
            // Move along path
            particle.progress += particle.speed;
            
            // Check if complete
            if (particle.progress >= 1) {
                particle.expired = true;
                return;
            }
            
            // Calculate position along curve
            const p = particle.progress;
            const startX = this.qubits.source.position.x;
            const startY = this.qubits.source.position.y;
            const endX = this.qubits.target.position.x;
            const endY = this.qubits.target.position.y;
            const midX = (startX + endX) / 2;
            const midY = startY - 100; // Control point above the line
            
            // Quadratic Bezier curve
            particle.x = Math.pow(1-p, 2) * startX + 2 * (1-p) * p * midX + Math.pow(p, 2) * endX;
            particle.y = Math.pow(1-p, 2) * startY + 2 * (1-p) * p * midY + Math.pow(p, 2) * endY;
            
            // Pulsate size
            particle.size = 2 + Math.sin(time * 10 + particle.phase) * 1;
            
            // Fade out near end
            if (particle.progress > 0.8) {
                particle.opacity = (1 - particle.progress) * 5;
            }
        });
    }
    
    createEntanglementParticle() {
        // Direction (source to target or target to source)
        const fromSource = Math.random() < 0.5;
        
        this.entanglementParticles.push({
            x: fromSource ? this.qubits.source.position.x : this.qubits.target.position.x,
            y: fromSource ? this.qubits.source.position.y : this.qubits.target.position.y,
            progress: 0,
            speed: 0.01 + Math.random() * 0.02,
            size: 2 + Math.random() * 2,
            color: this.getFrequencyColor(this.frequency, 1),
            phase: Math.random() * Math.PI * 2,
            fromSource: fromSource,
            opacity: 1,
            expired: false
        });
    }
    
    drawEntanglement() {
        if (!this.qubits.source.entangled || !this.qubits.target.entangled) return;
        
        // Draw entanglement line
        const gradient = this.ctx.createLinearGradient(
            this.qubits.source.position.x, this.qubits.source.position.y,
            this.qubits.target.position.x, this.qubits.target.position.y
        );
        gradient.addColorStop(0, this.getFrequencyColor(this.frequency, 0.3));
        gradient.addColorStop(0.5, this.getFrequencyColor(this.frequency, 0.1));
        gradient.addColorStop(1, this.getFrequencyColor(this.frequency, 0.3));
        
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.qubits.source.position.x, this.qubits.source.position.y);
        
        // Curved line for entanglement
        const midX = (this.qubits.source.position.x + this.qubits.target.position.x) / 2;
        const midY = this.qubits.source.position.y - 100; // Control point
        this.ctx.quadraticCurveTo(midX, midY, this.qubits.target.position.x, this.qubits.target.position.y);
        this.ctx.stroke();
        
        // Draw entanglement particles
        this.entanglementParticles.forEach(particle => {
            this.ctx.fillStyle = particle.color.replace('1)', `${particle.opacity})`);
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawQubits() {
        // Draw source qubit
        this.drawQubit(this.qubits.source, 'Source');
        
        // Draw target qubit
        this.drawQubit(this.qubits.target, 'Target');
    }
    
    drawQubit(qubit, label) {
        // Draw glow effect
        const glowRadius = 40;
        const gradient = this.ctx.createRadialGradient(
            qubit.position.x, qubit.position.y, 10,
            qubit.position.x, qubit.position.y, glowRadius
        );
        gradient.addColorStop(0, qubit.color.replace('1)', '0.3)'));
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(qubit.position.x, qubit.position.y, glowRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw qubit sphere
        this.ctx.fillStyle = qubit.color;
        this.ctx.beginPath();
        this.ctx.arc(qubit.position.x, qubit.position.y, 15, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw qubit state
        this.ctx.font = '16px monospace';
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(qubit.state, qubit.position.x, qubit.position.y + 5);
        
        // Draw label
        this.ctx.font = '14px Arial';
        this.ctx.fillText(label, qubit.position.x, qubit.position.y + 35);
        
        // Draw entanglement indicator if entangled
        if (qubit.entangled) {
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(qubit.position.x, qubit.position.y, 25, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }
    
    entangleQubits() {
        // Only entangle if in idle state
        if (this.teleportationState !== 'idle') return;
        
        // Set to entangled state
        this.qubits.source.entangled = true;
        this.qubits.target.entangled = true;
        
        // Bell state preparation - entangle qubits
        this.qubits.source.state = '|+⟩';
        this.qubits.target.state = '|0⟩';
        
        // Update UI
        this.teleportationState = 'preparing';
        this.updateTeleportationDisplay();
        
        // Proceed to next step after a delay
        setTimeout(() => {
            this.teleportationState = 'ready';
            this.updateTeleportationDisplay();
        }, 2000);
    }
    
    setSourceState(state) {
        // Only set state if ready
        if (this.teleportationState !== 'ready') return;
        
        // Set source qubit state
        this.qubits.source.state = state;
        this.updateTeleportationDisplay();
    }
    
    teleport() {
        // Only teleport if ready
        if (this.teleportationState !== 'ready') return;
        
        // Begin teleportation
        this.teleportationState = 'teleporting';
        this.teleportSteps = 0;
        
        // Record initial state
        const initialState = this.qubits.source.state;
        
        // Update UI
        this.updateTeleportationDisplay();
        
        // Start teleportation process
        setTimeout(() => this.teleportationStep(initialState), 1000);
    }
    
    teleportationStep(initialState) {
        this.teleportSteps++;
        
        switch (this.teleportSteps) {
            case 1:
                // Bell measurement on source qubit
                this.updateTeleportationDisplay('Bell measurement');
                setTimeout(() => this.teleportationStep(initialState), 1500);
                break;
                
            case 2:
                // Classical result transmission
                this.updateTeleportationDisplay('Transmitting classical data');
                
                // Create data transmission animation
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => this.createDataTransmissionParticle(), i * 200);
                }
                
                setTimeout(() => this.teleportationStep(initialState), 2500);
                break;
                
            case 3:
                // Correction operation on target qubit
                this.updateTeleportationDisplay('Applying quantum corrections');
                setTimeout(() => this.teleportationStep(initialState), 1500);
                break;
                
            case 4:
                // Complete teleportation
                this.qubits.target.state = initialState;
                this.teleportationState = 'complete';
                
                // Record the teleportation in history
                this.teleportationHistory.push({
                    sourceState: initialState,
                    targetState: this.qubits.target.state,
                    frequency: this.frequency,
                    timestamp: new Date().toLocaleTimeString()
                });
                
                // Limit history length
                if (this.teleportationHistory.length > 5) {
                    this.teleportationHistory.shift();
                }
                
                this.updateTeleportationDisplay('Teleportation complete');
                break;
        }
    }
    
    createDataTransmissionParticle() {
        const startX = this.qubits.source.position.x;
        const startY = this.qubits.source.position.y;
        const endX = this.qubits.target.position.x;
        const endY = this.qubits.target.position.y;
        
        // Create data packet
        this.entanglementParticles.push({
            x: startX,
            y: startY,
            progress: 0,
            speed: 0.02,
            size: 4,
            color: 'rgba(255, 255, 255, 1)',
            phase: 0,
            fromSource: true,
            opacity: 1,
            expired: false,
            isData: true
        });
    }
    
    updateTeleportationProcess(time) {
        // Animation for teleportation in progress
        
        // Special effects during teleportation
        if (this.teleportSteps === 1) {
            // Bell measurement: pulsate source qubit
            this.particles.forEach(p => {
                if (p.qubit === this.qubits.source) {
                    p.radius += Math.sin(time * 10) * 0.5;
                }
            });
        }
        else if (this.teleportSteps === 3) {
            // Correction operation: pulsate target qubit
            this.particles.forEach(p => {
                if (p.qubit === this.qubits.target) {
                    p.radius += Math.sin(time * 10) * 0.5;
                }
            });
        }
    }
    
    updateTeleportationDisplay(message = '') {
        const teleportInfo = document.getElementById('teleport-info');
        if (!teleportInfo) return;
        
        // Get current teleportation state
        let displayHTML = '';
        
        // Source and target states
        displayHTML += `
            <div class="teleport-display">
                <div class="teleport-label">Source Qubit:</div>
                <div class="teleport-state">${this.qubits.source.state}</div>
            </div>
            <div class="teleport-display">
                <div class="teleport-label">Target Qubit:</div>
                <div class="teleport-state">${this.qubits.target.state}</div>
            </div>
        `;
        
        // Status message
        let statusMessage = '';
        switch (this.teleportationState) {
            case 'idle':
                statusMessage = 'Ready to entangle qubits';
                break;
            case 'preparing':
                statusMessage = 'Establishing quantum entanglement';
                break;
            case 'ready':
                statusMessage = 'Set source state and teleport';
                break;
            case 'teleporting':
                statusMessage = message || `Teleportation in progress (Step ${this.teleportSteps}/4)`;
                break;
            case 'complete':
                statusMessage = 'Teleportation complete!';
                break;
        }
        
        displayHTML += `
            <div class="teleport-display">
                <div class="teleport-label">Status:</div>
                <div class="teleport-state">${statusMessage}</div>
            </div>
        `;
        
        // History if we have any
        if (this.teleportationHistory.length > 0) {
            displayHTML += `<div class="history-title">Recent Teleportations:</div>`;
            
            // Display last few teleportations (most recent first)
            for (let i = this.teleportationHistory.length - 1; i >= 0; i--) {
                const record = this.teleportationHistory[i];
                displayHTML += `
                    <div class="teleport-display mini">
                        <div class="teleport-label">${record.timestamp}</div>
                        <div class="teleport-state">${record.sourceState} → ${record.targetState} (${record.frequency}Hz)</div>
                    </div>
                `;
            }
        }
        
        // Update the display
        teleportInfo.innerHTML = displayHTML;
    }
    
    // Control methods
    setFrequency(freq) {
        this.frequency = freq;
        this.qubits.source.color = this.getFrequencyColor(this.frequency);
        this.qubits.target.color = this.getFrequencyColor(this.frequency);
    }
    
    setEntanglementStrength(strength) {
        this.entanglementStrength = strength;
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
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize quantum teleportation
    const teleportCanvas = document.getElementById('teleport-canvas');
    if (teleportCanvas) {
        window.quantumTeleportation = new QuantumTeleportation('teleport-canvas');
        setupTeleportationControls();
    }
});

// Set up UI controls
function setupTeleportationControls() {
    // Frequency control
    const frequencySlider = document.getElementById('teleport-frequency-slider');
    if (frequencySlider) {
        frequencySlider.addEventListener('input', function() {
            const frequency = parseInt(this.value);
            window.quantumTeleportation.setFrequency(frequency);
            
            // Update global frequency if needed
            if (this.dataset.global === 'true') {
                document.body.dataset.frequency = frequency;
                document.querySelectorAll('.freq-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.freq == frequency);
                });
            }
        });
    }
    
    // Entanglement strength control
    const entanglementSlider = document.getElementById('entanglement-slider');
    if (entanglementSlider) {
        entanglementSlider.addEventListener('input', function() {
            window.quantumTeleportation.setEntanglementStrength(parseFloat(this.value));
        });
    }
    
    // Entangle button
    const entangleButton = document.getElementById('entangle-btn');
    if (entangleButton) {
        entangleButton.addEventListener('click', function() {
            window.quantumTeleportation.entangleQubits();
        });
    }
    
    // State buttons
    const state0Button = document.getElementById('state-0-btn');
    if (state0Button) {
        state0Button.addEventListener('click', function() {
            window.quantumTeleportation.setSourceState('|0⟩');
        });
    }
    
    const state1Button = document.getElementById('state-1-btn');
    if (state1Button) {
        state1Button.addEventListener('click', function() {
            window.quantumTeleportation.setSourceState('|1⟩');
        });
    }
    
    const statePlusButton = document.getElementById('state-plus-btn');
    if (statePlusButton) {
        statePlusButton.addEventListener('click', function() {
            window.quantumTeleportation.setSourceState('|+⟩');
        });
    }
    
    const stateMinusButton = document.getElementById('state-minus-btn');
    if (stateMinusButton) {
        stateMinusButton.addEventListener('click', function() {
            window.quantumTeleportation.setSourceState('|-⟩');
        });
    }
    
    // Teleport button
    const teleportButton = document.getElementById('teleport-btn');
    if (teleportButton) {
        teleportButton.addEventListener('click', function() {
            window.quantumTeleportation.teleport();
        });
    }
    
    // Reset button
    const resetButton = document.getElementById('teleport-reset-btn');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            window.quantumTeleportation.resetSystem();
        });
    }
    
    // Global frequency buttons
    document.querySelectorAll('.freq-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const frequency = parseInt(this.dataset.freq);
            
            // Update teleportation frequency if available
            if (window.quantumTeleportation) {
                window.quantumTeleportation.setFrequency(frequency);
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
