/**
 * Cymatic Canvas Renderer
 * 
 * Creates the canvas element and WebGL context for rendering
 * phi-harmonic cymatic patterns at quantum frequencies.
 * 
 * Follows ZEN FIRST principle - beginning at Ground State (432 Hz)
 */

class CymaticCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = null;
        this.width = 0;
        this.height = 0;
        this.currentFrequency = 432; // Ground State
        
        // Phi-harmonic ratios
        this.phi = 1.618033988749895;
        this.phiInverse = 0.618033988749895;
        this.phiSquared = 2.618033988749895;
        this.phiCubed = 4.236067977499790;
        
        this.initialize();
    }
    
    initialize() {
        if (!this.canvas) {
            console.error('Canvas element not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        // Add event listener for window resize
        window.addEventListener('resize', () => this.resize());
        
        // Initial render at Ground State
        this.render(432);
    }
    
    resize() {
        const container = this.canvas.parentElement;
        this.width = container.clientWidth;
        this.height = container.clientHeight;
        
        // Set canvas dimensions
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // Re-render at current frequency
        this.render(this.currentFrequency);
    }
    
    render(frequency) {
        this.currentFrequency = frequency;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw corresponding pattern based on frequency
        switch(frequency) {
            case 432: this.drawGroundPattern(); break;
            case 528: this.drawCreationPattern(); break;
            case 594: this.drawHeartPattern(); break;
            case 672: this.drawVoicePattern(); break;
            case 720: this.drawVisionPattern(); break;
            case 768: this.drawUnityPattern(); break;
            default: this.drawGroundPattern(); // Default to Ground State
        }
    }
    
    // Ground State Pattern (432 Hz) - Hexagonal structures
    drawGroundPattern() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(this.width, this.height) * 0.4;
        
        // Draw hexagonal grid
        this.ctx.strokeStyle = '#3D8C40';
        this.ctx.lineWidth = 2;
        
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 / 6) * i;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius * 0.2, 0, Math.PI * 2);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
        
        // Center point
        this.ctx.fillStyle = '#3D8C40';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius * 0.1, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    // Creation Point Pattern (528 Hz) - Flower of Life
    drawCreationPattern() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(this.width, this.height) * 0.35;
        
        this.ctx.strokeStyle = '#D4AF37';
        this.ctx.lineWidth = 2;
        
        // Draw Flower of Life pattern
        const circleRadius = radius / 3;
        
        // Center circle
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Surrounding circles
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 / 6) * i;
            const x = centerX + Math.cos(angle) * circleRadius * this.phi;
            const y = centerY + Math.sin(angle) * circleRadius * this.phi;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        
        // Outer circle
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    
    // Heart Field Pattern (594 Hz) - Heart-shaped patterns
    drawHeartPattern() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const size = Math.min(this.width, this.height) * 0.4;
        
        this.ctx.strokeStyle = '#FF5E8F';
        this.ctx.fillStyle = 'rgba(255, 94, 143, 0.2)';
        this.ctx.lineWidth = 2;
        
        // Draw heart
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY + size * 0.3);
        
        // Left curve
        this.ctx.bezierCurveTo(
            centerX - size * 0.5, centerY, 
            centerX - size * 0.5, centerY - size * 0.5, 
            centerX, centerY - size * 0.5
        );
        
        // Right curve
        this.ctx.bezierCurveTo(
            centerX + size * 0.5, centerY - size * 0.5, 
            centerX + size * 0.5, centerY, 
            centerX, centerY + size * 0.3
        );
        
        this.ctx.fill();
        this.ctx.stroke();
        
        // Inner pattern
        this.ctx.strokeStyle = 'rgba(255, 94, 143, 0.6)';
        
        for (let i = 1; i <= 3; i++) {
            const scale = 1 - (i * 0.2);
            
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY + size * 0.3 * scale);
            
            // Left curve
            this.ctx.bezierCurveTo(
                centerX - size * 0.5 * scale, centerY, 
                centerX - size * 0.5 * scale, centerY - size * 0.5 * scale, 
                centerX, centerY - size * 0.5 * scale
            );
            
            // Right curve
            this.ctx.bezierCurveTo(
                centerX + size * 0.5 * scale, centerY - size * 0.5 * scale, 
                centerX + size * 0.5 * scale, centerY, 
                centerX, centerY + size * 0.3 * scale
            );
            
            this.ctx.stroke();
        }
    }
    
    // Voice Flow Pattern (672 Hz) - Complex mandala-like structures
    drawVoicePattern() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(this.width, this.height) * 0.4;
        
        this.ctx.strokeStyle = '#5E8FFF';
        this.ctx.lineWidth = 2;
        
        // Draw complex mandala
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 / 12) * i;
            const x1 = centerX + Math.cos(angle) * radius * 0.5;
            const y1 = centerY + Math.sin(angle) * radius * 0.5;
            const x2 = centerX + Math.cos(angle) * radius;
            const y2 = centerY + Math.sin(angle) * radius;
            
            // Draw petal shape
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.quadraticCurveTo(x1, y1, x2, y2);
            this.ctx.quadraticCurveTo(
                centerX + Math.cos(angle + Math.PI/12) * radius * 0.8,
                centerY + Math.sin(angle + Math.PI/12) * radius * 0.8,
                centerX, centerY
            );
            this.ctx.strokeStyle = 'rgba(94, 143, 255, 0.6)';
            this.ctx.fillStyle = 'rgba(94, 143, 255, 0.1)';
            this.ctx.fill();
            this.ctx.stroke();
        }
        
        // Central circle
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius * 0.2, 0, Math.PI * 2);
        this.ctx.strokeStyle = '#5E8FFF';
        this.ctx.stroke();
    }
    
    // Vision Gate Pattern (720 Hz) - Multi-dimensional networks
    drawVisionPattern() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const size = Math.min(this.width, this.height) * 0.4;
        
        this.ctx.strokeStyle = '#9768D1';
        this.ctx.lineWidth = 2;
        
        // Draw star tetrahedron (2D representation)
        const points = [
            // Top triangle
            { x: centerX, y: centerY - size * 0.5 },
            { x: centerX - size * 0.4, y: centerY + size * 0.2 },
            { x: centerX + size * 0.4, y: centerY + size * 0.2 },
            
            // Bottom triangle
            { x: centerX, y: centerY + size * 0.5 },
            { x: centerX - size * 0.4, y: centerY - size * 0.2 },
            { x: centerX + size * 0.4, y: centerY - size * 0.2 }
        ];
        
        // Draw top triangle
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        this.ctx.lineTo(points[1].x, points[1].y);
        this.ctx.lineTo(points[2].x, points[2].y);
        this.ctx.closePath();
        this.ctx.strokeStyle = 'rgba(151, 104, 209, 0.8)';
        this.ctx.fillStyle = 'rgba(151, 104, 209, 0.2)';
        this.ctx.fill();
        this.ctx.stroke();
        
        // Draw bottom triangle
        this.ctx.beginPath();
        this.ctx.moveTo(points[3].x, points[3].y);
        this.ctx.lineTo(points[4].x, points[4].y);
        this.ctx.lineTo(points[5].x, points[5].y);
        this.ctx.closePath();
        this.ctx.strokeStyle = 'rgba(151, 104, 209, 0.8)';
        this.ctx.fillStyle = 'rgba(151, 104, 209, 0.2)';
        this.ctx.fill();
        this.ctx.stroke();
        
        // Connect points
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        this.ctx.lineTo(points[3].x, points[3].y);
        this.ctx.moveTo(points[1].x, points[1].y);
        this.ctx.lineTo(points[5].x, points[5].y);
        this.ctx.moveTo(points[2].x, points[2].y);
        this.ctx.lineTo(points[4].x, points[4].y);
        this.ctx.strokeStyle = 'rgba(151, 104, 209, 0.5)';
        this.ctx.stroke();
    }
    
    // Unity Wave Pattern (768 Hz) - Perfect toroidal energy fields
    drawUnityPattern() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(this.width, this.height) * 0.4;
        
        // Create toroid effect with gradients
        const gradient = this.ctx.createRadialGradient(
            centerX, centerY, radius * 0.2,
            centerX, centerY, radius
        );
        
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)');
        gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        // Draw outer circle
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        // Create phi-harmonic rings
        const ringRadii = [
            radius * 0.2,
            radius * 0.2 * this.phi,
            radius * 0.2 * this.phiSquared,
            radius * 0.2 * this.phiCubed
        ];
        
        ringRadii.forEach(r => {
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        });
        
        // Central point
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fill();
    }
}

// Export for module usage
if (typeof window !== 'undefined') {
    window.CymaticCanvas = CymaticCanvas;
}
