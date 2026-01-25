// CQIL Quantum Flow Visualization

// Quantum Particles
class QuantumParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.01;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(33, 150, 243, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Quantum Monitor
class QuantumMonitor {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.isMonitoring = false;
        this.mode = 'energy';

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    startMonitoring() {
        this.isMonitoring = true;
        this.animate();
    }

    stopMonitoring() {
        this.isMonitoring = false;
    }

    setMode(mode) {
        this.mode = mode;
    }

    addParticle() {
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        this.particles.push(new QuantumParticle(x, y));
    }

    animate() {
        if (!this.isMonitoring) return;

        this.ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Add new particles
        if (Math.random() < 0.2) {
            this.addParticle();
        }

        // Update and draw particles
        this.particles = this.particles.filter(particle => {
            particle.update();
            particle.draw(this.ctx);
            return particle.life > 0;
        });

        // Draw mode-specific effects
        switch (this.mode) {
            case 'energy':
                this.drawEnergyFields();
                break;
            case 'flow':
                this.drawFlowPatterns();
                break;
            case 'harmonic':
                this.drawHarmonics();
                break;
        }

        requestAnimationFrame(() => this.animate());
    }

    drawEnergyFields() {
        const time = Date.now() * 0.001;
        this.ctx.strokeStyle = 'rgba(33, 150, 243, 0.2)';
        this.ctx.beginPath();

        for (let i = 0; i < this.canvas.width; i += 30) {
            const y = Math.sin(i * 0.01 + time) * 50 + this.canvas.height / 2;
            this.ctx.lineTo(i, y);
        }

        this.ctx.stroke();
    }

    drawFlowPatterns() {
        const time = Date.now() * 0.001;
        this.ctx.strokeStyle = 'rgba(33, 150, 243, 0.2)';

        for (let i = 0; i < 5; i++) {
            const offset = i * 50;
            this.ctx.beginPath();
            for (let x = 0; x < this.canvas.width; x += 10) {
                const y = Math.sin(x * 0.02 + time + i) * 30 + offset + this.canvas.height / 3;
                this.ctx.lineTo(x, y);
            }
            this.ctx.stroke();
        }
    }

    drawHarmonics() {
        const time = Date.now() * 0.001;
        const centerY = this.canvas.height / 2;

        for (let i = 1; i <= 3; i++) {
            const amplitude = 30 / i;
            const frequency = i * 2;
            
            this.ctx.strokeStyle = `rgba(33, 150, 243, ${0.3 / i})`;
            this.ctx.beginPath();

            for (let x = 0; x < this.canvas.width; x += 5) {
                const y = Math.sin(x * 0.01 * frequency + time) * amplitude + centerY;
                this.ctx.lineTo(x, y);
            }

            this.ctx.stroke();
        }
    }
}

// Initialize Quantum Flow
document.addEventListener('DOMContentLoaded', () => {
    // Particle Effect
    const particles = document.getElementById('particles');
    if (particles) {
        const particleCanvas = document.createElement('canvas');
        particles.appendChild(particleCanvas);
        const particleMonitor = new QuantumMonitor(particleCanvas);
        particleMonitor.startMonitoring();
    }

    // Quantum Monitor
    const monitorCanvas = document.getElementById('quantum-monitor');
    if (monitorCanvas) {
        window.quantumMonitor = new QuantumMonitor(monitorCanvas);
    }
    
    // Mobile Preview
    const mobilePreview = document.getElementById('mobile-preview');
    if (mobilePreview) {
        const mobileMonitor = new QuantumMonitor(mobilePreview);
        mobileMonitor.mode = 'harmonic';
        mobileMonitor.startMonitoring();
        
        // Add mobile app interface elements to canvas
        const ctx = mobilePreview.getContext('2d');
        setInterval(() => {
            // Draw mobile app interface over the quantum background
            const width = mobilePreview.width;
            const height = mobilePreview.height;
            
            // App header
            ctx.fillStyle = 'rgba(10, 10, 26, 0.8)';
            ctx.fillRect(0, 0, width, height * 0.12);
            
            // App title
            ctx.fillStyle = '#ffffff';
            ctx.font = '18px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('CQIL Quantum', width / 2, height * 0.075);
            
            // Bottom navigation
            ctx.fillStyle = 'rgba(10, 10, 26, 0.8)';
            ctx.fillRect(0, height * 0.88, width, height * 0.12);
            
            // Navigation icons
            const iconPositions = [0.2, 0.4, 0.6, 0.8];
            const icons = ['⚛️', '💓', '✨', '🎵'];
            
            ctx.font = '20px Arial';
            for (let i = 0; i < 4; i++) {
                ctx.fillText(icons[i], width * iconPositions[i], height * 0.935);
            }
            
            // Content area with heart-time visualization
            const time = Date.now() * 0.001;
            
            // Heart shape
            const centerX = width / 2;
            const centerY = height * 0.45;
            const heartSize = width * 0.2;
            
            // Heart rate pulsing effect
            const pulseSize = heartSize + Math.sin(time * 3) * 10;
            
            // Draw heart
            ctx.fillStyle = 'rgba(233, 30, 99, 0.7)'; // Pink color for heart
            ctx.beginPath();
            ctx.moveTo(centerX, centerY - pulseSize * 0.4);
            
            // Left curve
            ctx.bezierCurveTo(
                centerX - pulseSize * 0.5, centerY - pulseSize * 0.8,
                centerX - pulseSize, centerY - pulseSize * 0.3,
                centerX - pulseSize * 0.5, centerY + pulseSize * 0.4
            );
            
            // Bottom
            ctx.lineTo(centerX, centerY + pulseSize * 0.8);
            
            // Right curve
            ctx.lineTo(centerX + pulseSize * 0.5, centerY + pulseSize * 0.4);
            ctx.bezierCurveTo(
                centerX + pulseSize, centerY - pulseSize * 0.3,
                centerX + pulseSize * 0.5, centerY - pulseSize * 0.8,
                centerX, centerY - pulseSize * 0.4
            );
            
            ctx.closePath();
            ctx.fill();
            
            // Draw frequency waves around heart
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.lineWidth = 2;
            
            for (let i = 0; i < 3; i++) {
                const waveRadius = pulseSize * 1.2 + i * 20 + Math.sin(time * 2) * 5;
                
                ctx.beginPath();
                ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            // Frequency display
            ctx.fillStyle = '#ffffff';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Heart Frequency: 432 Hz', centerX, centerY + pulseSize * 1.5);
            
            // Status indicators
            ctx.font = '12px Arial';
            ctx.textAlign = 'left';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillText('Field Strength: 92%', width * 0.1, height * 0.7);
            ctx.fillText('Heart-Time Sync: 87%', width * 0.1, height * 0.75);
            ctx.fillText('Quantum State: ENTANGLED', width * 0.1, height * 0.8);
            
            // Voice recognition button
            ctx.fillStyle = 'rgba(33, 150, 243, 0.8)';
            ctx.beginPath();
            ctx.arc(width * 0.85, height * 0.75, width * 0.08, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('🎤', width * 0.85, height * 0.755);
        }, 1000/30); // Update at 30fps
    }
});

// Monitor Control Functions
function startMonitoring() {
    if (window.quantumMonitor) {
        window.quantumMonitor.startMonitoring();
    }
}

function showEnergyFields() {
    if (window.quantumMonitor) {
        window.quantumMonitor.setMode('energy');
    }
}

function showFlowPatterns() {
    if (window.quantumMonitor) {
        window.quantumMonitor.setMode('flow');
    }
}

function showHarmonics() {
    if (window.quantumMonitor) {
        window.quantumMonitor.setMode('harmonic');
    }
}
