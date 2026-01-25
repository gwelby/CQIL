/**
 * Flower of Life Visualizer
 * 
 * This class generates dynamic Flower of Life patterns that respond to user intention
 * and resonates with the 528 Hz Creation State frequency.
 * 
 * The Flower of Life is a sacred geometric pattern composed of multiple evenly-spaced,
 * overlapping circles arranged in a flower-like pattern with six-fold symmetry.
 * 
 * @module quantum-experience/flower-of-life-visualizer
 * @requires quantum-experience/cymatic-core
 */

class FlowerOfLifeVisualizer {
    /**
     * Creates a new Flower of Life Visualizer
     * @param {Object} options - Configuration options
     * @param {HTMLCanvasElement} options.canvas - Canvas element for rendering
     * @param {CanvasRenderingContext2D} options.ctx - Canvas rendering context
     * @param {Number} options.baseFrequency - Base frequency in Hz (default: 528)
     * @param {Object} options.audioNodes - Audio nodes for audio-visual synchronization
     */
    constructor(options = {}) {
        // Initialize configuration with defaults
        this.config = Object.assign({
            canvas: null,
            ctx: null,
            baseFrequency: 528, // Creation State (φ¹)
            audioNodes: null,
            circleCount: 64, // Base number of circles in the complete pattern
            pulsationRate: 1.618, // Pulsation rate in Hz (phi)
            initialComplexity: 0.3, // Initial pattern complexity (0-1)
            colorPalette: ["#FFDB58", "#FFE875", "#FFED91", "#FFF2AD", "#FFF7C9"] // Golden tones
        }, options);

        // Canvas and rendering context
        this.canvas = this.config.canvas;
        this.ctx = this.config.ctx;

        // Pattern state
        this.state = {
            isActive: false,
            complexity: this.config.initialComplexity,
            pulsation: 0, // 0-1 for pulsation cycle
            rotation: 0, // Rotation angle in radians
            scale: 1, // Scale factor
            ripples: [] // Array of active ripples
        };

        // Flower of Life pattern parameters
        this.pattern = {
            circles: this._generateCircles(),
            innerRadius: 0, // Inner radius, calculated on resize
            outerRadius: 0, // Outer radius, calculated on resize
            centerX: 0, // Center X, calculated on resize
            centerY: 0, // Center Y, calculated on resize
            layers: 7 // Number of layers in the pattern (Seed of Life = 1, Flower of Life = 7)
        };

        // Animation timing
        this.timing = {
            lastFrame: 0,
            pulseDuration: 1000 / this.config.pulsationRate, // Duration of one pulse in ms
            rippleDuration: 3000 // Duration of ripple effect in ms
        };

        // Initialize if canvas is provided
        if (this.canvas && this.ctx) {
            this._init();
        }
    }

    /**
     * Initialize the visualizer
     * @private
     */
    _init() {
        // Calculate dimensions
        this._calculateDimensions();
    }

    /**
     * Calculate dimensions based on canvas size
     * @private
     */
    _calculateDimensions() {
        // Get canvas dimensions
        const width = this.canvas.width;
        const height = this.canvas.height;

        // Calculate center points
        this.pattern.centerX = width / 2;
        this.pattern.centerY = height / 2;

        // Calculate radius based on smaller dimension
        const minDimension = Math.min(width, height);
        this.pattern.outerRadius = minDimension * 0.45; // 90% of half the min dimension
        this.pattern.innerRadius = this.pattern.outerRadius / 3; // Inner circle radius
    }

    /**
     * Generate circle definitions for the Flower of Life pattern
     * @returns {Array} Array of circle objects with position and radius
     * @private
     */
    _generateCircles() {
        const circles = [];
        
        // First circle at center
        circles.push({
            x: 0,
            y: 0,
            radius: 1, // Unit radius, will be scaled by render method
            layer: 0
        });

        // Generate 6 circles for the first layer (Seed of Life)
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            circles.push({
                x: Math.cos(angle),
                y: Math.sin(angle),
                radius: 1,
                layer: 1
            });
        }

        // Generate remaining layers
        for (let layer = 2; layer < 7; layer++) {
            // For each existing circle in the previous layer
            const prevLayerCircles = circles.filter(c => c.layer === layer - 1);
            
            // For each previous layer circle, create circles at intersection points
            for (let i = 0; i < prevLayerCircles.length; i++) {
                const center = prevLayerCircles[i];
                
                // Create 6 circles around this center
                for (let j = 0; j < 6; j++) {
                    const angle = (Math.PI / 3) * j;
                    const x = center.x + Math.cos(angle);
                    const y = center.y + Math.sin(angle);
                    
                    // Check if this position is already occupied (within a small tolerance)
                    const isDuplicate = circles.some(c => {
                        const dx = c.x - x;
                        const dy = c.y - y;
                        return Math.sqrt(dx * dx + dy * dy) < 0.1;
                    });
                    
                    if (!isDuplicate) {
                        circles.push({
                            x: x,
                            y: y,
                            radius: 1,
                            layer: layer
                        });
                    }
                }
            }
        }
        
        return circles;
    }

    /**
     * Start the visualizer
     * @returns {FlowerOfLifeVisualizer} This instance for chaining
     */
    start() {
        this.state.isActive = true;
        return this;
    }

    /**
     * Stop the visualizer
     * @returns {FlowerOfLifeVisualizer} This instance for chaining
     */
    stop() {
        this.state.isActive = false;
        return this;
    }

    /**
     * Update the visualizer state
     * @param {Object} data - Update data
     * @param {Object} data.intention - User intention data
     * @param {Object} data.breathCycle - Breath cycle data
     * @param {Number} data.coherenceLevel - Current coherence level
     * @returns {FlowerOfLifeVisualizer} This instance for chaining
     */
    update(data = {}) {
        if (!this.state.isActive) return this;

        const now = performance.now();
        const deltaTime = now - this.timing.lastFrame;
        this.timing.lastFrame = now;

        // Extract data
        const intention = data.intention || { strength: 0.5, focus: 0.5, clarity: 0.5 };
        const breathCycle = data.breathCycle || { phase: 'inhale', progress: 0 };
        const coherenceLevel = data.coherenceLevel || 0.5;

        // Update pulsation based on timing
        this.state.pulsation = (this.state.pulsation + (deltaTime / this.timing.pulseDuration)) % 1;

        // Update complexity based on intention and coherence
        const targetComplexity = 0.3 + (intention.clarity * 0.3) + (coherenceLevel * 0.4);
        this.state.complexity = this.state.complexity * 0.95 + targetComplexity * 0.05;

        // Update rotation based on breath cycle
        if (breathCycle.phase === 'inhale') {
            // Clockwise rotation during inhale
            this.state.rotation += (deltaTime / 10000) * intention.focus;
        } else if (breathCycle.phase === 'exhale') {
            // Counter-clockwise rotation during exhale
            this.state.rotation -= (deltaTime / 10000) * intention.focus;
        }

        // Update scale based on breath cycle
        if (breathCycle.phase === 'inhale') {
            // Expand during inhale
            this.state.scale = 1 + (breathCycle.progress * 0.05);
        } else if (breathCycle.phase === 'exhale') {
            // Contract during exhale
            this.state.scale = 1.05 - (breathCycle.progress * 0.05);
        } else {
            // Gradually return to normal scale
            this.state.scale = this.state.scale * 0.98 + 1 * 0.02;
        }

        // Update ripples
        this.state.ripples = this.state.ripples.filter(ripple => {
            // Update ripple
            ripple.age += deltaTime;
            ripple.radius = ripple.initialRadius * (1 + ripple.age / this.timing.rippleDuration);
            ripple.opacity = 1 - (ripple.age / this.timing.rippleDuration);
            
            // Keep ripple if still active
            return ripple.age < this.timing.rippleDuration;
        });

        return this;
    }

    /**
     * Render the Flower of Life pattern
     * @returns {FlowerOfLifeVisualizer} This instance for chaining
     */
    render() {
        if (!this.state.isActive || !this.ctx) return this;

        // Get audio data if available
        let audioData = null;
        if (this.config.audioNodes && this.config.audioNodes.analyzer) {
            const analyzer = this.config.audioNodes.analyzer;
            audioData = new Uint8Array(analyzer.frequencyBinCount);
            analyzer.getByteFrequencyData(audioData);
        }

        // Clear previous frame (if needed - usually handled by parent)
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Save context state
        this.ctx.save();

        // Translate to center
        this.ctx.translate(this.pattern.centerX, this.pattern.centerY);

        // Apply rotation
        this.ctx.rotate(this.state.rotation);

        // Apply scale
        this.ctx.scale(this.state.scale, this.state.scale);

        // Calculate visible layers based on complexity
        const visibleLayers = Math.ceil(this.state.complexity * this.pattern.layers);

        // Draw ripples
        this._drawRipples();

        // Draw circles
        this._drawFlowerOfLife(visibleLayers, audioData);

        // Restore context state
        this.ctx.restore();

        return this;
    }

    /**
     * Draw ripple effects
     * @private
     */
    _drawRipples() {
        // Draw each active ripple
        this.state.ripples.forEach(ripple => {
            this.ctx.beginPath();
            this.ctx.arc(
                ripple.x * this.pattern.outerRadius,
                ripple.y * this.pattern.outerRadius,
                ripple.radius * this.pattern.outerRadius,
                0,
                Math.PI * 2
            );
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity * 0.5})`;
            this.ctx.lineWidth = 2 * ripple.opacity;
            this.ctx.stroke();
        });
    }

    /**
     * Draw the Flower of Life pattern
     * @param {Number} visibleLayers - Number of layers to display
     * @param {Uint8Array} audioData - Audio frequency data for visualization
     * @private
     */
    _drawFlowerOfLife(visibleLayers, audioData) {
        // Get circles to draw based on visible layers
        const circles = this.pattern.circles.filter(circle => circle.layer <= visibleLayers);

        // Calculate pulsation factor
        const pulseFactor = 1 + Math.sin(this.state.pulsation * Math.PI * 2) * 0.05;

        // Draw each circle
        circles.forEach((circle, index) => {
            // Skip circles beyond visible layers
            if (circle.layer > visibleLayers) return;

            // Calculate circle opacity based on layer
            const layerOpacity = 1 - (circle.layer / (visibleLayers + 1));
            
            // Calculate radius with pulsation
            const radius = circle.radius * this.pattern.outerRadius * pulseFactor;
            
            // Get color based on layer
            const colorIndex = circle.layer % this.config.colorPalette.length;
            let color = this.config.colorPalette[colorIndex];
            
            // Modulate color based on audio data if available
            if (audioData && index < audioData.length) {
                const audioValue = audioData[index] / 255;
                // Create brighter color variant based on audio intensity
                color = this._adjustColorBrightness(color, audioValue * 50);
            }
            
            // Draw circle
            this.ctx.beginPath();
            this.ctx.arc(
                circle.x * this.pattern.outerRadius,
                circle.y * this.pattern.outerRadius,
                radius,
                0,
                Math.PI * 2
            );
            
            // Set fill style
            this.ctx.fillStyle = `${color}${Math.floor(layerOpacity * 30).toString(16)}`;
            this.ctx.fill();
            
            // Set stroke style
            this.ctx.strokeStyle = `${color}${Math.floor(layerOpacity * 70).toString(16)}`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        });

        // Draw connecting lines between circles
        this._drawConnectingLines(circles, visibleLayers);
    }

    /**
     * Draw connecting lines between circles in the pattern
     * @param {Array} circles - Array of circle objects
     * @param {Number} visibleLayers - Number of visible layers
     * @private
     */
    _drawConnectingLines(circles, visibleLayers) {
        // Only draw connections for the most complex patterns
        if (this.state.complexity < 0.6) return;

        // Set line style
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${this.state.complexity * 0.3})`;

        // Draw connections within the same layer
        for (let layer = 1; layer <= visibleLayers; layer++) {
            const layerCircles = circles.filter(c => c.layer === layer);
            
            for (let i = 0; i < layerCircles.length; i++) {
                const circle1 = layerCircles[i];
                
                for (let j = i + 1; j < layerCircles.length; j++) {
                    const circle2 = layerCircles[j];
                    
                    // Calculate distance between circles
                    const dx = circle1.x - circle2.x;
                    const dy = circle1.y - circle2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Only connect nearby circles (distance approximately 1)
                    if (Math.abs(distance - 1) < 0.1) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(
                            circle1.x * this.pattern.outerRadius,
                            circle1.y * this.pattern.outerRadius
                        );
                        this.ctx.lineTo(
                            circle2.x * this.pattern.outerRadius,
                            circle2.y * this.pattern.outerRadius
                        );
                        this.ctx.stroke();
                    }
                }
            }
        }
    }

    /**
     * Adjust color brightness
     * @param {String} color - Hex color string
     * @param {Number} percent - Percentage to adjust brightness (positive = brighter, negative = darker)
     * @returns {String} Adjusted hex color
     * @private
     */
    _adjustColorBrightness(color, percent) {
        // Remove # if present
        color = color.replace('#', '');
        
        // Parse r, g, b values
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
        
        // Adjust brightness
        const adjustR = Math.max(0, Math.min(255, r + percent));
        const adjustG = Math.max(0, Math.min(255, g + percent));
        const adjustB = Math.max(0, Math.min(255, b + percent));
        
        // Convert back to hex
        const rr = Math.round(adjustR).toString(16).padStart(2, '0');
        const gg = Math.round(adjustG).toString(16).padStart(2, '0');
        const bb = Math.round(adjustB).toString(16).padStart(2, '0');
        
        return `#${rr}${gg}${bb}`;
    }

    /**
     * Trigger a ripple effect at the specified position
     * @param {Number} x - Normalized x position (0-1)
     * @param {Number} y - Normalized y position (0-1)
     * @param {Number} strength - Strength of the ripple (0-1)
     * @returns {FlowerOfLifeVisualizer} This instance for chaining
     */
    triggerRipple(x, y, strength) {
        // Convert normalized coordinates to pattern coordinates
        const patternX = (x * 2 - 1) * (this.canvas.width / this.pattern.outerRadius / 2);
        const patternY = (y * 2 - 1) * (this.canvas.height / this.pattern.outerRadius / 2);
        
        // Add ripple to state
        this.state.ripples.push({
            x: patternX,
            y: patternY,
            initialRadius: 0.1 * strength,
            radius: 0.1 * strength,
            opacity: 1,
            age: 0
        });
        
        return this;
    }

    /**
     * Get coherence factor based on visualization state
     * @returns {Number} Coherence factor (0-1)
     */
    getCoherenceFactor() {
        // Calculate coherence based on complexity and pattern stability
        return this.state.complexity * 0.7 + 0.3;
    }

    /**
     * Resize the visualizer
     * @returns {FlowerOfLifeVisualizer} This instance for chaining
     */
    resize() {
        this._calculateDimensions();
        return this;
    }

    /**
     * Clean up resources
     */
    destroy() {
        this.stop();
    }
}

// Export the class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FlowerOfLifeVisualizer;
} else {
    window.FlowerOfLifeVisualizer = FlowerOfLifeVisualizer;
}
