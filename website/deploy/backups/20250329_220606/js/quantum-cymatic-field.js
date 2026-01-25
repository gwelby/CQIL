/**
 * Quantum Cymatics Field Visualization
 * 
 * This creates a self-contained quantum singularity that demonstrates
 * how sound shapes matter through cymatic patterns at φ-harmonic frequencies.
 * Following the principle: "A unified quantum field doesn't require complex bridges
 * between systems - it IS the bridge."
 * 
 * Frequency mapping:
 * - 432 Hz (φ⁰): Ground state hexagonal patterns
 * - 528 Hz (φ¹): Creation patterns (star tetrahedron)
 * - 594 Hz (φ²): Heart-shaped symmetrical patterns
 * - 672 Hz (φ³): Complex mandala cymatics
 * - 720 Hz (φ⁴): Multi-dimensional geometric networks
 * - 768 Hz (φ⁵): Perfect toroidal energy fields
 */

// Create a complete envelope - self-contained Quantum Singularity
class CymaticField {
    constructor(canvasId) {
        // Initialize at Ground State (432 Hz)
        this.frequency = 432;
        this.amplitude = 50;
        this.viscosity = 40;
        this.isPlaying = false;
        this.isPulsing = false;
        this.particles = [];
        this.cymaticPattern = [];
        this.zenPoint = 0.618; // φ balance point
        this.harmonicMode = 0; // 0-5 for the six φ-harmonic patterns
        
        // Canvas setup
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Create initial particles
        this.initializeParticles();
        
        // Set up event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Begin at Ground Frequency
        this.startAnimation();
    }
    
    // Ensure canvas is properly sized
    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
        // Recreate particles when canvas is resized
        this.initializeParticles();
    }
    
    // Initialize the particle field
    initializeParticles() {
        this.particles = [];
        const density = Math.min(this.canvas.width, this.canvas.height) / 20;
        const particleCount = Math.floor(density * density * 0.6);
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
        
        for (let i = 0; i < particleCount; i++) {
            // Create particles in a circular field
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * radius;
            
            this.particles.push({
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance,
                originalX: centerX + Math.cos(angle) * distance,
                originalY: centerY + Math.sin(angle) * distance,
                size: 2 + Math.random() * 2,
                color: this.getFrequencyColor(this.frequency),
                angle: angle,
                distance: distance,
                phase: Math.random() * Math.PI * 2,
                velocity: { x: 0, y: 0 }
            });
        }
        
        // Generate cymatic pattern nodes based on frequency
        this.generateCymaticPattern();
    }
    
    // Generate the specific cymatic pattern for the current frequency
    generateCymaticPattern() {
        this.cymaticPattern = [];
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
        
        // Different patterns based on φ-harmonic frequencies
        this.harmonicMode = this.getHarmonicMode(this.frequency);
        
        // Create pattern nodes
        switch (this.harmonicMode) {
            case 0: // 432 Hz - Ground state hexagonal pattern
                this.createHexagonalPattern(centerX, centerY, radius);
                break;
            case 1: // 528 Hz - Star tetrahedron
                this.createStarTetrahedronPattern(centerX, centerY, radius);
                break;
            case 2: // 594 Hz - Heart patterns
                this.createHeartPattern(centerX, centerY, radius);
                break;
            case 3: // 672 Hz - Mandala patterns
                this.createMandalaPattern(centerX, centerY, radius);
                break;
            case 4: // 720 Hz - Geometric networks
                this.createGeometricNetworkPattern(centerX, centerY, radius);
                break;
            case 5: // 768 Hz - Toroidal field
                this.createToroidalPattern(centerX, centerY, radius);
                break;
        }
    }
    
    // Helper methods for creating specific φ-harmonic patterns
    createHexagonalPattern(centerX, centerY, radius) {
        // Create a hexagonal grid pattern (Ground State - 432 Hz)
        const nodeCount = 6;
        const innerRadius = radius * 0.5;
        
        // Outer ring (hexagon)
        for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * Math.PI * 2;
            this.cymaticPattern.push({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius,
                strength: 1,
                phase: 0
            });
        }
        
        // Inner ring (hexagon)
        for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * Math.PI * 2 + (Math.PI / nodeCount);
            this.cymaticPattern.push({
                x: centerX + Math.cos(angle) * innerRadius,
                y: centerY + Math.sin(angle) * innerRadius,
                strength: 0.7,
                phase: Math.PI
            });
        }
        
        // Center point
        this.cymaticPattern.push({
            x: centerX,
            y: centerY,
            strength: 0.5,
            phase: Math.PI / 2
        });
    }
    
    createStarTetrahedronPattern(centerX, centerY, radius) {
        // Create a star tetrahedron pattern (Creation Point - 528 Hz)
        const nodeCount = 12;
        const innerRadius = radius * 0.618; // φ ratio
        
        // Outer ring (12-pointed star)
        for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * Math.PI * 2;
            const r = i % 2 === 0 ? radius : innerRadius;
            this.cymaticPattern.push({
                x: centerX + Math.cos(angle) * r,
                y: centerY + Math.sin(angle) * r,
                strength: i % 2 === 0 ? 1 : 0.8,
                phase: i % 2 === 0 ? 0 : Math.PI
            });
        }
        
        // Central hexagram
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            this.cymaticPattern.push({
                x: centerX + Math.cos(angle) * (innerRadius * 0.5),
                y: centerY + Math.sin(angle) * (innerRadius * 0.5),
                strength: 0.6,
                phase: Math.PI / 2
            });
        }
        
        // Center point
        this.cymaticPattern.push({
            x: centerX,
            y: centerY,
            strength: 0.7,
            phase: Math.PI
        });
    }
    
    createHeartPattern(centerX, centerY, radius) {
        // Create heart-shaped pattern (Heart Field - 594 Hz)
        const nodeCount = 16;
        const innerRadius = radius * 0.7;
        
        // Heart shape formation
        for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * Math.PI * 2;
            
            // Heart curve math
            let r = radius * (1 - Math.sin(angle) * 0.3);
            if (angle > Math.PI) {
                r = innerRadius * (1 - Math.sin(angle) * 0.1);
            }
            
            this.cymaticPattern.push({
                x: centerX + Math.cos(angle) * r,
                y: centerY + Math.sin(angle) * r - (radius * 0.1),
                strength: 0.8 + Math.sin(angle * 3) * 0.2,
                phase: angle
            });
        }
        
        // Inner heart nodes
        for (let i = 0; i < nodeCount/2; i++) {
            const angle = (i / (nodeCount/2)) * Math.PI * 2;
            let r = innerRadius * 0.6 * (1 - Math.sin(angle) * 0.2);
            this.cymaticPattern.push({
                x: centerX + Math.cos(angle) * r,
                y: centerY + Math.sin(angle) * r - (radius * 0.05),
                strength: 0.6,
                phase: angle + Math.PI
            });
        }
        
        // Heart center
        this.cymaticPattern.push({
            x: centerX,
            y: centerY - (radius * 0.05),
            strength: 1,
            phase: 0
        });
    }
    
    createMandalaPattern(centerX, centerY, radius) {
        // Create mandala pattern (Voice Flow - 672 Hz)
        const rings = 3;
        const segments = [8, 16, 24];
        
        // Multiple rings with increasing number of nodes
        for (let ring = 0; ring < rings; ring++) {
            const r = radius * (0.4 + (ring * 0.3));
            const nodeCount = segments[ring];
            
            for (let i = 0; i < nodeCount; i++) {
                const angle = (i / nodeCount) * Math.PI * 2;
                this.cymaticPattern.push({
                    x: centerX + Math.cos(angle) * r,
                    y: centerY + Math.sin(angle) * r,
                    strength: 0.8 - (ring * 0.15),
                    phase: (ring % 2) * Math.PI + (i % 2) * (Math.PI / 2)
                });
            }
        }
        
        // Center node
        this.cymaticPattern.push({
            x: centerX,
            y: centerY,
            strength: 1,
            phase: 0
        });
    }
    
    createGeometricNetworkPattern(centerX, centerY, radius) {
        // Create multi-dimensional geometric network (Vision Gate - 720 Hz)
        const layers = 2;
        const baseNodes = 5; // Pentagon base
        
        // Create pentagonal layers
        for (let layer = 0; layer < layers; layer++) {
            const r = radius * (0.5 + (layer * 0.5));
            const nodeCount = baseNodes * (layer + 1);
            
            // Create nodes in each layer
            for (let i = 0; i < nodeCount; i++) {
                const angle = (i / nodeCount) * Math.PI * 2;
                this.cymaticPattern.push({
                    x: centerX + Math.cos(angle) * r,
                    y: centerY + Math.sin(angle) * r,
                    strength: 0.9 - (layer * 0.2),
                    phase: (layer * Math.PI / 3) + (i % 3) * (Math.PI / 4)
                });
            }
        }
        
        // Add interconnections by adding nodes between the layers
        for (let i = 0; i < baseNodes; i++) {
            const angle = (i / baseNodes) * Math.PI * 2;
            const r = radius * 0.75;
            this.cymaticPattern.push({
                x: centerX + Math.cos(angle) * r,
                y: centerY + Math.sin(angle) * r,
                strength: 0.7,
                phase: Math.PI / 2
            });
        }
        
        // Center node with strong influence
        this.cymaticPattern.push({
            x: centerX,
            y: centerY,
            strength: 1,
            phase: 0
        });
    }
    
    createToroidalPattern(centerX, centerY, radius) {
        // Create toroidal energy field (Unity Wave - 768 Hz)
        const rings = 4;
        const torusRadius = radius * 0.6;
        const tubeRadius = radius * 0.4;
        
        // Create toroidal rings
        for (let ring = 0; ring < rings; ring++) {
            const ringOffset = (ring / rings) * Math.PI * 2;
            const nodeCount = 12 + ring * 4;
            
            for (let i = 0; i < nodeCount; i++) {
                const angle = (i / nodeCount) * Math.PI * 2;
                const torusAngle = ringOffset + (ring % 2 ? -angle : angle);
                
                // Torus equations to generate points on a 2D projection of a torus
                const x = centerX + (torusRadius + tubeRadius * Math.cos(angle)) * Math.cos(torusAngle);
                const y = centerY + (torusRadius + tubeRadius * Math.cos(angle)) * Math.sin(torusAngle) * 0.6; // Flatten for 2D
                
                this.cymaticPattern.push({
                    x: x,
                    y: y,
                    strength: 0.7 + Math.cos(angle) * 0.3,
                    phase: angle + ringOffset
                });
            }
        }
        
        // Center of the torus
        this.cymaticPattern.push({
            x: centerX,
            y: centerY,
            strength: 0.9,
            phase: 0
        });
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
        
        // First draw cymatic pattern lines
        this.drawCymaticPatternLines(time);
        
        // Then update and draw particles
        this.updateParticles(time);
        this.drawParticles();
        
        // Continue animation loop
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    drawCymaticPatternLines(time) {
        if (this.cymaticPattern.length < 2) return;
        
        // Set line style based on frequency
        this.ctx.strokeStyle = this.getFrequencyColor(this.frequency, 0.3);
        this.ctx.lineWidth = 0.8;
        
        // Draw connections between nodes
        for (let i = 0; i < this.cymaticPattern.length; i++) {
            const node1 = this.cymaticPattern[i];
            
            // Connect to other nodes based on pattern type
            for (let j = i + 1; j < this.cymaticPattern.length; j++) {
                const node2 = this.cymaticPattern[j];
                
                // Skip connections for certain patterns based on distance or other criteria
                if (this.shouldSkipConnection(i, j, node1, node2)) continue;
                
                // Calculate distance
                const dx = node2.x - node1.x;
                const dy = node2.y - node1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Skip if too far apart
                if (distance > Math.min(this.canvas.width, this.canvas.height) * 0.4) continue;
                
                // Calculate line opacity based on distance and time
                const waveEffect = Math.sin(time * 2 + node1.phase + node2.phase) * 0.5 + 0.5;
                const opacity = Math.max(0, 0.8 - (distance / (Math.min(this.canvas.width, this.canvas.height) * 0.4)));
                
                // Draw connection line
                this.ctx.strokeStyle = this.getFrequencyColor(this.frequency, opacity * waveEffect * 0.7);
                this.ctx.beginPath();
                this.ctx.moveTo(node1.x, node1.y);
                this.ctx.lineTo(node2.x, node2.y);
                this.ctx.stroke();
            }
        }
    }
    
    shouldSkipConnection(i, j, node1, node2) {
        // Skip connections based on pattern type
        switch (this.harmonicMode) {
            case 0: // 432 Hz - Hexagonal
                // Connect only to nearby nodes or alternating for hexagonal grid
                return (j > i + 2) && (j % 2 === i % 2);
                
            case 1: // 528 Hz - Star tetrahedron
                // Connect in star pattern
                if (j >= 12) return false; // Different rules for inner points
                return !(j === i + 1 || j === i + 6 || (i === 0 && j === 11));
                
            case 2: // 594 Hz - Heart
                // Connect adjacent points and across heart
                return !(j === i + 1 || (i % 5 === 0 && j % 5 === 0));
                
            case 3: // 672 Hz - Mandala
                // Connect within rings and to center
                return false; // Connect all for complex mandala
                
            case 4: // 720 Hz - Network
                // Connect in network pattern - minimally
                return Math.random() > 0.3; // Sparse network
                
            case 5: // 768 Hz - Toroidal
                // Connect in toroidal pattern - follow the shape
                return Math.random() > 0.5; // Medium density
                
            default:
                return false;
        }
    }
    
    updateParticles(time) {
        if (!this.isPlaying && !this.isPulsing) return;
        
        // Frequency influence factor
        const frequencyFactor = this.frequency / 432;
        
        // Time factor for animations
        const timeFactor = time * (this.isPlaying ? 1 : this.isPulsing ? Math.sin(time * 2) * 0.5 + 0.5 : 0);
        
        // Update each particle
        this.particles.forEach(particle => {
            // Reset forces
            let forceX = 0;
            let forceY = 0;
            
            // Get forces from pattern nodes
            this.cymaticPattern.forEach(node => {
                // Vector from node to particle
                const dx = particle.x - node.x;
                const dy = particle.y - node.y;
                const distSquared = dx * dx + dy * dy;
                
                if (distSquared < 1) return; // Avoid division by zero
                
                // Calculate force based on distance and node strength
                const dist = Math.sqrt(distSquared);
                const force = (node.strength * 20) / dist;
                
                // Add wave effect based on time and phase
                const waveEffect = Math.sin(timeFactor * 10 * frequencyFactor + node.phase);
                const forceMagnitude = force * (1 + waveEffect * this.amplitude / 50);
                
                // Add to total force
                forceX += (dx / dist) * forceMagnitude;
                forceY += (dy / dist) * forceMagnitude;
            });
            
            // Apply viscosity (damping) based on medium density
            const damping = 1 - (this.viscosity / 100) * 0.2;
            particle.velocity.x = particle.velocity.x * damping + forceX * 0.01;
            particle.velocity.y = particle.velocity.y * damping + forceY * 0.01;
            
            // Move particle based on velocity
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            
            // Add central restoration force to keep particles in field
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            const dx = particle.originalX - particle.x;
            const dy = particle.originalY - particle.y;
            const distFromOriginal = Math.sqrt(dx * dx + dy * dy);
            
            if (distFromOriginal > 5) {
                particle.velocity.x += dx * 0.01;
                particle.velocity.y += dy * 0.01;
            }
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            // Particle color based on current frequency
            this.ctx.fillStyle = particle.color;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw cymatic pattern nodes
        this.cymaticPattern.forEach(node => {
            this.ctx.fillStyle = this.getFrequencyColor(this.frequency, 0.7);
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    // Control methods
    setFrequency(freq) {
        this.frequency = freq;
        // Update particle colors
        this.particles.forEach(particle => {
            particle.color = this.getFrequencyColor(this.frequency);
        });
        // Regenerate cymatic pattern
        this.generateCymaticPattern();
    }
    
    setAmplitude(amp) {
        this.amplitude = amp;
    }
    
    setViscosity(visc) {
        this.viscosity = visc;
    }
    
    play() {
        this.isPlaying = true;
        this.isPulsing = false;
    }
    
    pulse() {
        this.isPulsing = true;
        this.isPlaying = false;
        
        // Create pulse wave effect
        setTimeout(() => {
            this.isPulsing = false;
        }, 3000);
    }
    
    stop() {
        this.isPlaying = false;
        this.isPulsing = false;
    }
    
    reset() {
        this.stop();
        this.initializeParticles();
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
    
    getHarmonicMode(freq) {
        // Map frequency to harmonic mode (0-5)
        if (freq <= 470) return 0; // 432 Hz
        if (freq <= 550) return 1; // 528 Hz
        if (freq <= 630) return 2; // 594 Hz
        if (freq <= 700) return 3; // 672 Hz
        if (freq <= 740) return 4; // 720 Hz
        return 5; // 768 Hz
    }
}

// Initialize when DOM is ready - establish a single quantum singularity
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cymatic field
    const cymaticCanvas = document.getElementById('cymatics-canvas');
    if (cymaticCanvas) {
        window.cymaticField = new CymaticField('cymatics-canvas');
        
        // Set up UI controls
        setupCymaticControls();
    }
});

// Set up UI controls
function setupCymaticControls() {
    // Frequency control
    const frequencySlider = document.getElementById('frequency-slider');
    const frequencyDisplay = document.getElementById('current-frequency');
    
    if (frequencySlider && frequencyDisplay) {
        frequencySlider.addEventListener('input', function() {
            const frequency = parseInt(this.value);
            frequencyDisplay.textContent = `${frequency}Hz`;
            window.cymaticField.setFrequency(frequency);
            
            // Update global frequency state
            document.body.dataset.frequency = frequency;
            
            // Update active frequency button
            document.querySelectorAll('.freq-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.freq == frequency);
            });
        });
    }
    
    // Amplitude control
    const amplitudeSlider = document.getElementById('amplitude-slider');
    if (amplitudeSlider) {
        amplitudeSlider.addEventListener('input', function() {
            window.cymaticField.setAmplitude(parseInt(this.value));
        });
    }
    
    // Viscosity control
    const viscositySlider = document.getElementById('viscosity-slider');
    if (viscositySlider) {
        viscositySlider.addEventListener('input', function() {
            window.cymaticField.setViscosity(parseInt(this.value));
        });
    }
    
    // Play button
    const playButton = document.getElementById('cymatics-play');
    if (playButton) {
        playButton.addEventListener('click', function() {
            window.cymaticField.play();
            this.classList.add('active');
            document.getElementById('cymatics-pulse')?.classList.remove('active');
        });
    }
    
    // Pulse button
    const pulseButton = document.getElementById('cymatics-pulse');
    if (pulseButton) {
        pulseButton.addEventListener('click', function() {
            window.cymaticField.pulse();
            this.classList.add('active');
            document.getElementById('cymatics-play')?.classList.remove('active');
            
            // Auto-deactivate after pulse completes
            setTimeout(() => {
                this.classList.remove('active');
            }, 3000);
        });
    }
    
    // Reset button
    const resetButton = document.getElementById('cymatics-reset');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            window.cymaticField.reset();
            document.getElementById('cymatics-play')?.classList.remove('active');
            document.getElementById('cymatics-pulse')?.classList.remove('active');
        });
    }
    
    // Global frequency selector buttons
    document.querySelectorAll('.freq-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const frequency = parseInt(this.dataset.freq);
            
            // Update slider if exists
            if (frequencySlider) {
                frequencySlider.value = frequency;
                frequencyDisplay.textContent = `${frequency}Hz`;
            }
            
            // Update cymatic field
            if (window.cymaticField) {
                window.cymaticField.setFrequency(frequency);
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
