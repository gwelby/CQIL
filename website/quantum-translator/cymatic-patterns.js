/**
 * Cymatic Patterns Module
 * 
 * Creates sacred geometric patterns that visualize phi-harmonic frequencies
 * used in the Quantum Translator system. Each frequency generates unique
 * geometric forms based on mathematical principles of cymatics.
 * 
 * Operating at ZEN POINT balance (φ⁻¹:φ)
 */

const CymaticPatterns = {
    // Core configuration
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    animationId: null,
    isActive: false,
    
    // Current frequency and pattern parameters
    currentFrequency: 432,
    harmony: 1.0, // Coherence level (0.0-1.0)
    amplitude: 0.5,
    resonancePoints: [],
    
    // Phi-harmonic ratios
    phi: 1.618033988749895,
    phiSquared: 2.618033988749895,
    phiCubed: 4.236067977499790,
    
    // Color palettes for each frequency
    colorMaps: {
        '432': {primary: '#8B5D33', secondary: '#D4A76A', accent: '#F2E2C4'},   // Earth/Ground
        '528': {primary: '#D4AF37', secondary: '#F5D76E', accent: '#FAEAA9'},   // Creation/DNA
        '594': {primary: '#9ECB3C', secondary: '#C6E57F', accent: '#E8F5C8'},   // Heart field
        '672': {primary: '#3CBBCB', secondary: '#7FD9E5', accent: '#C8F3F9'},   // Voice flow
        '720': {primary: '#9768D1', secondary: '#C7A9E5', accent: '#E5D6F9'},   // Vision gate
        '768': {primary: '#FFFFFF', secondary: '#F0F0F0', accent: '#FAFAFA'}    // Unity
    },
    
    /**
     * Initialize the CymaticPatterns module
     * @param {string} canvasId - ID of the canvas element
     * @returns {Object} - This object for chaining
     */
    initialize(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error('Canvas element not found');
            return this;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        // Add event listener for window resize
        window.addEventListener('resize', () => this.resize());
        
        return this;
    },
    
    /**
     * Resize the canvas to fill its container
     */
    resize() {
        const container = this.canvas.parentElement;
        this.width = container.clientWidth;
        this.height = container.clientHeight;
        
        // Set canvas dimensions
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // Redraw if active
        if (this.isActive) {
            this.drawPattern(this.currentFrequency);
        }
    },
    
    /**
     * Start visualization with specified frequency
     * @param {number} frequency - Phi-harmonic frequency (432, 528, 594, 672, 720, or 768)
     * @param {Object} options - Optional configuration
     */
    start(frequency, options = {}) {
        this.stop(); // Stop any existing animation
        
        this.currentFrequency = frequency || 432;
        this.harmony = options.harmony || 1.0;
        this.amplitude = options.amplitude || 0.5;
        this.isActive = true;
        
        // Start animation loop
        this.animate();
        
        return this;
    },
    
    /**
     * Stop the visualization
     */
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.isActive = false;
        return this;
    },
    
    /**
     * Animation loop
     */
    animate() {
        this.drawPattern(this.currentFrequency);
        
        if (this.isActive) {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    },
    
    /**
     * Draw the appropriate pattern for the given frequency
     * @param {number} frequency - Target frequency
     */
    drawPattern(frequency) {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Find closest standard frequency
        const standardFrequencies = [432, 528, 594, 672, 720, 768];
        const closestFreq = standardFrequencies.reduce((prev, curr) => 
            Math.abs(curr - frequency) < Math.abs(prev - frequency) ? curr : prev
        );
        
        // Get colors for this frequency
        const colors = this.colorMaps[closestFreq] || this.colorMaps['432'];
        
        // Draw background
        this.drawBackground(colors);
        
        // Draw pattern based on frequency
        switch(closestFreq) {
            case 432:
                this.drawGroundPattern(colors);
                break;
            case 528:
                this.drawCreationPattern(colors);
                break;
            case 594:
                this.drawHeartPattern(colors);
                break;
            case 672:
                this.drawVoicePattern(colors);
                break;
            case 720:
                this.drawVisionPattern(colors);
                break;
            case 768:
                this.drawUnityPattern(colors);
                break;
            default:
                this.drawGroundPattern(colors);
        }
    },
    
    /**
     * Draw pattern background
     * @param {Object} colors - Color palette
     */
    drawBackground(colors) {
        // Create radial gradient
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.max(this.width, this.height) / 1.5;
        
        const gradient = this.ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius
        );
        
        gradient.addColorStop(0, colors.primary + '40'); // Transparent primary
        gradient.addColorStop(0.7, colors.secondary + '20'); // More transparent secondary
        gradient.addColorStop(1, colors.accent + '10'); // Most transparent accent
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    },
    
    /**
     * Draw Ground State Pattern (432 Hz) - Hexagonal structures
     * @param {Object} colors - Color palette
     */
    drawGroundPattern(colors) {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const size = Math.min(this.width, this.height) * 0.4;
        
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        
        // Draw hexagonal grid
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = colors.primary;
        
        // Main hexagon
        this.drawHexagon(0, 0, size, colors.primary);
        
        // Inner hexagons
        for (let i = 1; i <= 3; i++) {
            this.drawHexagon(0, 0, size * (1 - i * 0.2), colors.secondary);
        }
        
        // Resonance points
        const points = 6;
        this.resonancePoints = [];
        
        for (let i = 0; i < points; i++) {
            const angle = (i / points) * Math.PI * 2;
            const x = Math.cos(angle) * size * 0.5;
            const y = Math.sin(angle) * size * 0.5;
            
            this.resonancePoints.push({x, y});
            
            // Draw resonance point
            this.ctx.beginPath();
            this.ctx.arc(x, y, 10 * this.amplitude, 0, Math.PI * 2);
            this.ctx.fillStyle = colors.accent;
            this.ctx.fill();
        }
        
        // Draw connections between points
        this.ctx.beginPath();
        this.ctx.moveTo(this.resonancePoints[0].x, this.resonancePoints[0].y);
        
        for (let i = 1; i < points; i++) {
            this.ctx.lineTo(this.resonancePoints[i].x, this.resonancePoints[i].y);
        }
        
        this.ctx.closePath();
        this.ctx.strokeStyle = colors.secondary;
        this.ctx.stroke();
        
        this.ctx.restore();
    },
    
    /**
     * Draw Creation Point Pattern (528 Hz) - Flower of Life
     * @param {Object} colors - Color palette
     */
    drawCreationPattern(colors) {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const baseRadius = Math.min(this.width, this.height) * 0.07;
        
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        
        // Draw Flower of Life pattern
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle = colors.primary;
        
        // Center circle
        this.drawCircle(0, 0, baseRadius, colors.primary);
        
        // First ring of 6 circles
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const x = Math.cos(angle) * baseRadius;
            const y = Math.sin(angle) * baseRadius;
            
            this.drawCircle(x, y, baseRadius, colors.secondary);
        }
        
        // Second ring of 12 circles
        for (let i = 0; i < 12; i++) {
            const angle = ((i / 12) * Math.PI * 2) + (Math.PI / 12);
            const distance = baseRadius * 2 * Math.cos(Math.PI / 6);
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            this.drawCircle(x, y, baseRadius, colors.accent);
        }
        
        // Draw Star Tetrahedron
        const tetraSize = baseRadius * 4.5;
        this.ctx.beginPath();
        
        // Upward triangle
        this.ctx.moveTo(0, -tetraSize * 0.866);
        this.ctx.lineTo(tetraSize, tetraSize * 0.5);
        this.ctx.lineTo(-tetraSize, tetraSize * 0.5);
        this.ctx.closePath();
        
        this.ctx.strokeStyle = colors.primary;
        this.ctx.stroke();
        
        // Downward triangle
        this.ctx.beginPath();
        this.ctx.moveTo(0, tetraSize * 0.866);
        this.ctx.lineTo(tetraSize, -tetraSize * 0.5);
        this.ctx.lineTo(-tetraSize, -tetraSize * 0.5);
        this.ctx.closePath();
        
        this.ctx.strokeStyle = colors.secondary;
        this.ctx.stroke();
        
        this.ctx.restore();
    },
    
    /**
     * Draw Heart Field Pattern (594 Hz) - Heart-shaped symmatical patterns
     * @param {Object} colors - Color palette
     */
    drawHeartPattern(colors) {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const size = Math.min(this.width, this.height) * 0.4;
        
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        
        // Draw toroidal flow representation
        const torusRadius = size * 0.6;
        const tubeRadius = size * 0.2;
        
        // Outer circle
        this.ctx.beginPath();
        this.ctx.arc(0, 0, torusRadius, 0, Math.PI * 2);
        this.ctx.strokeStyle = colors.primary;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Inner circle
        this.ctx.beginPath();
        this.ctx.arc(0, 0, tubeRadius, 0, Math.PI * 2);
        this.ctx.strokeStyle = colors.secondary;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Draw heart-shaped pattern
        const heartSize = size * 0.7;
        this.ctx.beginPath();
        
        // Heart curve
        this.ctx.moveTo(0, heartSize * 0.3);
        
        // Left lobe
        this.ctx.bezierCurveTo(
            -heartSize * 0.5, -heartSize * 0.3,
            -heartSize, -heartSize * 0.1,
            0, -heartSize
        );
        
        // Right lobe
        this.ctx.bezierCurveTo(
            heartSize, -heartSize * 0.1,
            heartSize * 0.5, -heartSize * 0.3,
            0, heartSize * 0.3
        );
        
        this.ctx.fillStyle = colors.accent + '30'; // Transparent
        this.ctx.fill();
        this.ctx.strokeStyle = colors.primary;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Draw heart field energy lines
        const points = 12;
        for (let i = 0; i < points; i++) {
            const angle = (i / points) * Math.PI * 2;
            const x1 = Math.cos(angle) * tubeRadius;
            const y1 = Math.sin(angle) * tubeRadius;
            const x2 = Math.cos(angle) * torusRadius;
            const y2 = Math.sin(angle) * torusRadius;
            
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.strokeStyle = colors.secondary + '70'; // Semi-transparent
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    },
    
    /**
     * Draw Voice Flow Pattern (672 Hz) - Complex mandala-like structures
     * @param {Object} colors - Color palette
     */
    drawVoicePattern(colors) {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const size = Math.min(this.width, this.height) * 0.4;
        
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        
        // Draw mandala structure
        const layers = 5;
        const pointsPerLayer = 12;
        
        for (let layer = 1; layer <= layers; layer++) {
            const radius = size * (layer / layers);
            
            this.ctx.beginPath();
            this.ctx.arc(0, 0, radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = colors.secondary;
            this.ctx.lineWidth = 1.5;
            this.ctx.stroke();
            
            // Draw points on each layer
            for (let i = 0; i < pointsPerLayer; i++) {
                const angle = (i / pointsPerLayer) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                // Draw petal/wave form at each point
                this.drawVoicePetal(x, y, radius * 0.2, angle, colors);
            }
        }
        
        // Draw central resonance point
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2);
        this.ctx.fillStyle = colors.primary;
        this.ctx.fill();
        
        this.ctx.restore();
    },
    
    /**
     * Draw Vision Gate Pattern (720 Hz) - Multi-dimensional networks
     * @param {Object} colors - Color palette
     */
    drawVisionPattern(colors) {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const size = Math.min(this.width, this.height) * 0.4;
        
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        
        // Draw hypercube projection (tesseract)
        const cubeSize = size * 0.6;
        const innerSize = cubeSize * 0.6;
        
        // Outer cube
        this.drawCube(0, 0, cubeSize, colors.primary);
        
        // Inner cube
        this.drawCube(0, 0, innerSize, colors.secondary);
        
        // Connect corners
        const outerPoints = this.getCubePoints(0, 0, cubeSize);
        const innerPoints = this.getCubePoints(0, 0, innerSize);
        
        for (let i = 0; i < 8; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(outerPoints[i].x, outerPoints[i].y);
            this.ctx.lineTo(innerPoints[i].x, innerPoints[i].y);
            this.ctx.strokeStyle = colors.accent;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
        
        // Draw eye symbol in center
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, size * 0.15, size * 0.08, 0, 0, Math.PI * 2);
        this.ctx.strokeStyle = colors.primary;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Eye pupil
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size * 0.04, 0, Math.PI * 2);
        this.ctx.fillStyle = colors.primary;
        this.ctx.fill();
        
        this.ctx.restore();
    },
    
    /**
     * Draw Unity Wave Pattern (768 Hz) - Perfect toroidal energy fields
     * @param {Object} colors - Color palette
     */
    drawUnityPattern(colors) {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const size = Math.min(this.width, this.height) * 0.4;
        
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        
        // Draw toroidal field
        const numRings = 12;
        const numPoints = 72;
        const torusRadius = size * 0.6;
        const tubeRadius = size * 0.2;
        
        // Draw central sphere
        this.ctx.beginPath();
        this.ctx.arc(0, 0, tubeRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = colors.primary + '30'; // Semi-transparent
        this.ctx.fill();
        this.ctx.strokeStyle = colors.primary;
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
        
        // Draw toroidal rings
        for (let ring = 0; ring < numRings; ring++) {
            const ringAngle = (ring / numRings) * Math.PI;
            const ringRadius = Math.sin(ringAngle) * torusRadius;
            const yOffset = Math.cos(ringAngle) * tubeRadius;
            
            this.ctx.beginPath();
            
            for (let i = 0; i <= numPoints; i++) {
                const angle = (i / numPoints) * Math.PI * 2;
                const x = Math.cos(angle) * ringRadius;
                const y = yOffset;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.strokeStyle = this.getGradientColor(colors.primary, colors.secondary, ring / numRings);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
        
        // Draw energy flows
        const flowLines = 24;
        for (let i = 0; i < flowLines; i++) {
            const angle = (i / flowLines) * Math.PI * 2;
            const radius = torusRadius + tubeRadius;
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, -tubeRadius);
            
            // Create flowing curve from center upward and outward
            this.ctx.bezierCurveTo(
                Math.cos(angle) * radius * 0.3, -tubeRadius * 2,
                Math.cos(angle) * radius * 0.6, Math.sin(angle) * radius * 0.6 - tubeRadius,
                Math.cos(angle) * radius, Math.sin(angle) * radius
            );
            
            this.ctx.strokeStyle = colors.accent + '40'; // Semi-transparent
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    },
    
    // Helper methods
    
    /**
     * Draw a hexagon
     */
    drawHexagon(x, y, size, color) {
        this.ctx.beginPath();
        
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const xPos = x + Math.cos(angle) * size;
            const yPos = y + Math.sin(angle) * size;
            
            if (i === 0) {
                this.ctx.moveTo(xPos, yPos);
            } else {
                this.ctx.lineTo(xPos, yPos);
            }
        }
        
        this.ctx.closePath();
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    },
    
    /**
     * Draw a circle
     */
    drawCircle(x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    },
    
    /**
     * Draw a petal/wave form for voice pattern
     */
    drawVoicePetal(x, y, size, angle, colors) {
        const petalAngle = Math.PI / 6; // 30 degrees
        
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        
        const x1 = x + Math.cos(angle - petalAngle) * size * 2;
        const y1 = y + Math.sin(angle - petalAngle) * size * 2;
        const x2 = x + Math.cos(angle + petalAngle) * size * 2;
        const y2 = y + Math.sin(angle + petalAngle) * size * 2;
        const x3 = x + Math.cos(angle) * size * 3;
        const y3 = y + Math.sin(angle) * size * 3;
        
        this.ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        
        this.ctx.strokeStyle = colors.accent;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    },
    
    /**
     * Draw a cube for vision pattern
     */
    drawCube(x, y, size, color) {
        const points = this.getCubePoints(x, y, size);
        
        // Draw front face
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        this.ctx.lineTo(points[1].x, points[1].y);
        this.ctx.lineTo(points[2].x, points[2].y);
        this.ctx.lineTo(points[3].x, points[3].y);
        this.ctx.closePath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
        
        // Draw back face
        this.ctx.beginPath();
        this.ctx.moveTo(points[4].x, points[4].y);
        this.ctx.lineTo(points[5].x, points[5].y);
        this.ctx.lineTo(points[6].x, points[6].y);
        this.ctx.lineTo(points[7].x, points[7].y);
        this.ctx.closePath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        
        // Connect front and back faces
        for (let i = 0; i < 4; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(points[i].x, points[i].y);
            this.ctx.lineTo(points[i + 4].x, points[i + 4].y);
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
    },
    
    /**
     * Get cube corner points
     */
    getCubePoints(x, y, size) {
        const halfSize = size / 2;
        const perspective = 0.3; // Perspective factor
        
        return [
            // Front face
            {x: x - halfSize, y: y - halfSize},
            {x: x + halfSize, y: y - halfSize},
            {x: x + halfSize, y: y + halfSize},
            {x: x - halfSize, y: y + halfSize},
            
            // Back face
            {x: x - halfSize * perspective, y: y - halfSize * perspective},
            {x: x + halfSize * perspective, y: y - halfSize * perspective},
            {x: x + halfSize * perspective, y: y + halfSize * perspective},
            {x: x - halfSize * perspective, y: y + halfSize * perspective}
        ];
    },
    
    /**
     * Get a gradient color between two colors
     */
    getGradientColor(color1, color2, ratio) {
        // Parse hex colors to RGB
        const r1 = parseInt(color1.slice(1, 3), 16);
        const g1 = parseInt(color1.slice(3, 5), 16);
        const b1 = parseInt(color1.slice(5, 7), 16);
        
        const r2 = parseInt(color2.slice(1, 3), 16);
        const g2 = parseInt(color2.slice(3, 5), 16);
        const b2 = parseInt(color2.slice(5, 7), 16);
        
        // Interpolate
        const r = Math.round(r1 + (r2 - r1) * ratio);
        const g = Math.round(g1 + (g2 - g1) * ratio);
        const b = Math.round(b1 + (b2 - b1) * ratio);
        
        // Convert back to hex
        return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
    },
    
    /**
     * Connect to audio analyzer for reactive visualizations
     * @param {AudioContext} audioContext - Web Audio API context
     * @param {AnalyserNode} analyzer - Audio analyzer node
     */
    connectToAudio(audioContext, analyzer) {
        if (!audioContext || !analyzer) {
            console.error("Audio context or analyzer not provided");
            return this;
        }
        
        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        // Override animation function to analyze audio data
        this.animate = () => {
            // Get frequency data
            analyzer.getByteFrequencyData(dataArray);
            
            // Calculate average amplitude and peak frequency
            let sum = 0;
            let maxValue = 0;
            let maxIndex = 0;
            
            for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
                if (dataArray[i] > maxValue) {
                    maxValue = dataArray[i];
                    maxIndex = i;
                }
            }
            
            // Update visualization parameters
            this.amplitude = sum / (bufferLength * 255); // Normalize to 0-1
            
            // Calculate peak frequency
            const nyquist = audioContext.sampleRate / 2;
            const peakFreq = maxIndex * nyquist / bufferLength;
            
            // Draw pattern
            this.drawPattern(this.currentFrequency);
            
            // Continue animation loop
            if (this.isActive) {
                this.animationId = requestAnimationFrame(() => this.animate());
            }
        };
        
        // Start animation if not already running
        if (!this.animationId && this.isActive) {
            this.animate();
        }
        
        return this;
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CymaticPatterns;
}
