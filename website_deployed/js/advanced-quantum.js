// Advanced Quantum Visualizations

class QuantumVisualizer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.flowLines = [];
        this.harmonics = [];
        this.isActive = false;
        this.frequency = 432; // Default 432Hz

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    // Flow Patterns
    startFlowVisualization() {
        this.isActive = true;
        this.animate();
    }

    createFlowPattern() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(this.canvas.width, this.canvas.height) * 0.4;

        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            this.flowLines.push({
                x, y,
                angle,
                radius: radius * 0.2,
                speed: 0.02
            });
        }
    }

    // Harmonic Resonance
    startHarmonics(frequency = 432) {
        this.frequency = frequency;
        this.createHarmonicWaves();
    }

    createHarmonicWaves() {
        this.harmonics = [];
        const baseAmplitude = this.canvas.height * 0.2;
        
        // Create harmonic series
        for (let i = 1; i <= 4; i++) {
            this.harmonics.push({
                frequency: this.frequency * i,
                amplitude: baseAmplitude / i,
                phase: 0,
                color: `hsla(${240 + i * 30}, 70%, 50%, 0.5)`
            });
        }
    }

    // Quantum Patterns
    createQuantumPattern(type) {
        this.particles = [];
        const count = 100;
        
        switch(type) {
            case 'nfl':
                this.createNFLPattern(count);
                break;
            case 'quantum':
                this.createQuantumStatePattern(count);
                break;
            case 'harmonic':
                this.createHarmonicPattern(count);
                break;
        }
    }

    createNFLPattern(count) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 4 + 2,
                speed: Math.random() * 2 + 1,
                angle: Math.random() * Math.PI * 2,
                color: `hsla(${Math.random() * 60 + 200}, 70%, 50%, 0.8)`
            });
        }
    }

    createQuantumStatePattern(count) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        for (let i = 0; i < count; i++) {
            const radius = Math.random() * 100 + 50;
            const angle = (i / count) * Math.PI * 2;
            this.particles.push({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius,
                size: Math.random() * 3 + 1,
                speed: Math.random() * 0.02 + 0.01,
                angle: angle,
                radius: radius,
                color: `hsla(${Math.random() * 60 + 180}, 70%, 50%, 0.8)`
            });
        }
    }

    createHarmonicPattern(count) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                frequency: this.frequency * (Math.random() * 0.1 + 0.95),
                amplitude: Math.random() * 20 + 10,
                phase: Math.random() * Math.PI * 2,
                color: `hsla(${Math.random() * 60 + 220}, 70%, 50%, 0.8)`
            });
        }
    }

    // Animation Loop
    animate() {
        if (!this.isActive) return;

        this.ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const time = Date.now() * 0.001;

        // Update and draw flow lines
        this.flowLines.forEach(line => {
            line.angle += line.speed;
            this.drawFlowLine(line, time);
        });

        // Update and draw particles
        this.particles.forEach(particle => {
            this.updateParticle(particle, time);
            this.drawParticle(particle);
        });

        // Draw harmonics
        this.harmonics.forEach(harmonic => {
            this.drawHarmonic(harmonic, time);
        });

        requestAnimationFrame(() => this.animate());
    }

    drawFlowLine(line, time) {
        this.ctx.strokeStyle = 'rgba(33, 150, 243, 0.3)';
        this.ctx.beginPath();
        this.ctx.arc(line.x, line.y, line.radius, 0, Math.PI * 2);
        this.ctx.stroke();

        // Draw flowing energy
        const flowX = line.x + Math.cos(line.angle + time) * line.radius;
        const flowY = line.y + Math.sin(line.angle + time) * line.radius;
        this.ctx.fillStyle = 'rgba(33, 150, 243, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(flowX, flowY, 4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    updateParticle(particle, time) {
        if (particle.radius) {
            // Quantum state pattern
            particle.angle += particle.speed;
            particle.x = this.canvas.width/2 + Math.cos(particle.angle) * particle.radius;
            particle.y = this.canvas.height/2 + Math.sin(particle.angle) * particle.radius;
        } else if (particle.frequency) {
            // Harmonic pattern
            particle.phase += 0.02;
            particle.y = this.canvas.height/2 + Math.sin(particle.phase) * particle.amplitude;
        } else {
            // NFL pattern
            particle.x += Math.cos(particle.angle) * particle.speed;
            particle.y += Math.sin(particle.angle) * particle.speed;

            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        }
    }

    drawParticle(particle) {
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawHarmonic(harmonic, time) {
        this.ctx.strokeStyle = harmonic.color;
        this.ctx.beginPath();

        for (let x = 0; x < this.canvas.width; x++) {
            const y = this.canvas.height/2 + 
                     Math.sin(x * 0.01 * harmonic.frequency/100 + time) * 
                     harmonic.amplitude;
            if (x === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }

        this.ctx.stroke();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const canvases = {
        flow: document.getElementById('flow-canvas'),
        pattern: document.getElementById('pattern-canvas'),
        harmonic: document.getElementById('harmonic-canvas')
    };

    // Create visualizers for each canvas
    const visualizers = {};
    Object.entries(canvases).forEach(([key, canvas]) => {
        if (canvas) {
            visualizers[key] = new QuantumVisualizer(canvas);
        }
    });

    // Expose control functions
    window.startFlow = () => {
        if (visualizers.flow) {
            visualizers.flow.createFlowPattern();
            visualizers.flow.startFlowVisualization();
        }
    };

    window.showPattern = (type) => {
        if (visualizers.pattern) {
            visualizers.pattern.createQuantumPattern(type);
            visualizers.pattern.startFlowVisualization();
        }
    };

    window.startHarmonics = () => {
        if (visualizers.harmonic) {
            const frequency = document.getElementById('frequency')?.value || 432;
            visualizers.harmonic.startHarmonics(frequency);
            visualizers.harmonic.startFlowVisualization();
        }
    };
});
