/**
 * Pattern Recognition System
 * 
 * Component for generating and recognizing phi-harmonic patterns in the Creation State (528 Hz - φ¹).
 * Supports pattern evolution through user intention and provides coherence metrics.
 * 
 * @module quantum-experience/pattern-recognition-system
 */
class PatternRecognitionSystem {
    /**
     * Creates a new Pattern Recognition System
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        // Initialize with default options
        this.config = {
            container: null,
            ctx: null,
            frequency: 528, // φ¹ Creation State frequency
            phi: 1.618033988749895,
            patternComplexity: 0.5,
            intentionResponsive: true,
            zenPointBalance: {
                quantum: 0.5,
                human: 0.5
            }
        };
        
        // Apply user options
        Object.keys(options).forEach(key => {
            if (this.config.hasOwnProperty(key)) {
                if (typeof this.config[key] === 'object' && !Array.isArray(this.config[key])) {
                    this.config[key] = {...this.config[key], ...options[key]};
                } else {
                    this.config[key] = options[key];
                }
            }
        });
        
        // Pattern types
        this.patternTypes = ['spiral', 'wave', 'branch', 'network', 'crystal', 'toroid'];
        this.currentPatternType = 'spiral';
        
        // State tracking
        this.state = {
            isActive: false,
            coherenceLevel: 0.5,
            synchronizationLevel: 0.5,
            evolutionStage: 0,
            recognitionLevel: 0
        };
        
        // Intention field
        this.intention = {
            strength: 0.5,
            focus: 0.5,
            clarity: 0.5,
            direction: 'evolution'
        };
        
        // Pattern elements
        this.elements = [];
        
        // Animation properties
        this.lastFrameTime = 0;
        this.animationFrameId = null;
        
        // Initialize if container and context are provided
        if (this.config.container && !this.config.ctx) {
            this._initCanvas();
        }
    }
    
    // Initialize canvas if not provided
    _initCanvas() {
        if (!this.config.container) return;
        
        // Check if container is a string (selector) or DOM element
        const container = typeof this.config.container === 'string' 
            ? document.querySelector(this.config.container) 
            : this.config.container;
            
        if (!container) return;
        
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth || 800;
        canvas.height = container.clientHeight || 600;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        
        // Add canvas to container
        container.appendChild(canvas);
        
        // Get context
        this.config.ctx = canvas.getContext('2d');
        
        // Handle resize
        window.addEventListener('resize', () => {
            if (container && canvas) {
                canvas.width = container.clientWidth || 800;
                canvas.height = container.clientHeight || 600;
            }
        });
    }
    
    // Start the system
    start() {
        if (this.state.isActive) return this;
        
        this.state.isActive = true;
        this._generateInitialPattern();
        this._startAnimation();
        
        return this;
    }
    
    // Stop the system
    stop() {
        this.state.isActive = false;
        
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        
        return this;
    }
    
    // Start animation loop
    _startAnimation() {
        this.lastFrameTime = performance.now();
        
        const animate = (timestamp) => {
            if (!this.state.isActive) return;
            
            const deltaTime = (timestamp - this.lastFrameTime) / 1000;
            this.lastFrameTime = timestamp;
            
            this._update(deltaTime);
            this._render();
            
            this.animationFrameId = requestAnimationFrame(animate);
        };
        
        this.animationFrameId = requestAnimationFrame(animate);
    }
    
    // Generate initial pattern based on current type
    _generateInitialPattern() {
        this.elements = [];
        
        const count = Math.floor(30 * this.config.patternComplexity);
        
        for (let i = 0; i < count; i++) {
            this.elements.push(this._createPatternElement());
        }
    }
    
    // Create a pattern element
    _createPatternElement() {
        if (!this.config.ctx) return null;
        
        const canvas = this.config.ctx.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const size = Math.min(canvas.width, canvas.height) * 0.4;
        
        // Different properties based on pattern type
        const props = {};
        
        switch (this.currentPatternType) {
            case 'spiral':
                props.angle = Math.random() * Math.PI * 2;
                props.radius = Math.random() * size * 0.8;
                props.rotationSpeed = (0.1 + Math.random() * 0.2) * (Math.random() > 0.5 ? 1 : -1);
                props.growthRate = 0.02 + Math.random() * 0.05;
                break;
                
            case 'wave':
                props.amplitude = 5 + Math.random() * 20;
                props.frequency = 0.01 + Math.random() * 0.05;
                props.phase = Math.random() * Math.PI * 2;
                props.speed = 0.02 + Math.random() * 0.1;
                break;
                
            case 'branch':
                props.angle = Math.random() * Math.PI * 2;
                props.length = 10 + Math.random() * 30;
                props.width = 1 + Math.random() * 3;
                props.branchProbability = 0.1 + Math.random() * 0.2;
                props.branchAngle = Math.PI / 4 + Math.random() * Math.PI / 4;
                props.growthRate = 0.5 + Math.random();
                break;
                
            case 'network':
                props.connections = [];
                props.connectionCount = Math.floor(1 + Math.random() * 3);
                props.connectionRange = 50 + Math.random() * 100;
                props.oscillationRate = 0.1 + Math.random() * 0.5;
                break;
                
            case 'crystal':
                props.sides = Math.floor(3 + Math.random() * 5);
                props.size = 5 + Math.random() * 15;
                props.growthRate = 0.05 + Math.random() * 0.2;
                props.rotationSpeed = (0.05 + Math.random() * 0.1) * (Math.random() > 0.5 ? 1 : -1);
                break;
                
            case 'toroid':
                props.majorRadius = 30 + Math.random() * 50;
                props.minorRadius = 5 + Math.random() * 15;
                props.tubularSegments = Math.floor(5 + Math.random() * 10);
                props.radialSegments = Math.floor(5 + Math.random() * 10);
                props.rotationX = Math.random() * Math.PI * 2;
                props.rotationY = Math.random() * Math.PI * 2;
                props.rotationSpeedX = (0.01 + Math.random() * 0.05) * (Math.random() > 0.5 ? 1 : -1);
                props.rotationSpeedY = (0.01 + Math.random() * 0.05) * (Math.random() > 0.5 ? 1 : -1);
                break;
                
            default:
                props.x = centerX + (Math.random() * 2 - 1) * size * 0.8;
                props.y = centerY + (Math.random() * 2 - 1) * size * 0.8;
                props.size = 2 + Math.random() * 8;
        }
        
        // Base element properties
        return {
            type: this.currentPatternType,
            x: centerX,
            y: centerY,
            opacity: 0.1 + Math.random() * 0.5,
            color: `rgba(170, 255, 200, ${0.2 + Math.random() * 0.6})`,
            properties: props,
            age: 0,
            lifespan: 100 + Math.random() * 200,
            relatedElements: []
        };
    }
    
    // Update all pattern elements
    _update(deltaTime) {
        if (!this.state.isActive || !this.config.ctx) return;
        
        const canvas = this.config.ctx.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Apply ZEN POINT balance to update behavior
        this._applyZenPointBalance();
        
        // Update existing elements
        for (let i = this.elements.length - 1; i >= 0; i--) {
            const element = this.elements[i];
            
            // Age the element
            element.age += deltaTime;
            
            // Remove expired elements
            if (element.age > element.lifespan) {
                this.elements.splice(i, 1);
                continue;
            }
            
            // Update element based on type
            this._updateElement(element, deltaTime, centerX, centerY);
        }
        
        // Potentially create new elements based on intention
        if (this.config.intentionResponsive && Math.random() < 0.05 * this.intention.strength) {
            this.elements.push(this._createPatternElement());
        }
        
        // Evolve the pattern if needed
        this._evolvePattern(deltaTime);
        
        // Calculate coherence level
        this._calculateCoherence();
        
        // Calculate pattern recognition level
        this._calculateRecognition();
    }
    
    // Apply ZEN POINT balance effects
    _applyZenPointBalance() {
        const { quantum, human } = this.config.zenPointBalance;
        
        // Quantum affects pattern complexity and coherence
        if (quantum > 0.6) {
            // More quantum means more complex patterns
            this.config.patternComplexity = 0.5 + (quantum - 0.5);
            
            // If we have fewer elements than desired, add more
            const desiredCount = Math.floor(30 * this.config.patternComplexity);
            if (this.elements.length < desiredCount) {
                const newCount = Math.floor(Math.min(3, desiredCount - this.elements.length));
                for (let i = 0; i < newCount; i++) {
                    if (Math.random() < 0.2) {
                        this.elements.push(this._createPatternElement());
                    }
                }
            }
        }
        
        // Human affects pattern stability and recognition
        if (human > 0.6) {
            // More human means more stable patterns
            const stableCount = Math.floor(this.elements.length * (human - 0.5));
            for (let i = 0; i < stableCount; i++) {
                if (this.elements[i]) {
                    this.elements[i].lifespan *= 1.001; // Extend lifespan slightly
                }
            }
        }
    }
    
    // Update a single element based on its type
    _updateElement(element, deltaTime, centerX, centerY) {
        // Use intention to affect element behavior
        const intentionEffect = this.intention.clarity * 0.5;
        
        switch (element.type) {
            case 'spiral':
                element.properties.angle += element.properties.rotationSpeed * deltaTime;
                element.properties.radius += element.properties.growthRate * deltaTime * (1 + intentionEffect);
                
                element.x = centerX + Math.cos(element.properties.angle) * element.properties.radius;
                element.y = centerY + Math.sin(element.properties.angle) * element.properties.radius;
                break;
                
            case 'wave':
                element.properties.phase += element.properties.speed * deltaTime;
                element.x = (element.x + element.properties.speed * deltaTime * 50) % (this.config.ctx.canvas.width + 100) - 50;
                element.y = centerY + Math.sin(element.properties.phase) * element.properties.amplitude * (1 + intentionEffect);
                break;
                
            case 'branch':
                if (element.properties.length < 100 && Math.random() < element.properties.branchProbability * deltaTime) {
                    // Create a new branch
                    const newBranch = this._createPatternElement();
                    newBranch.type = 'branch';
                    newBranch.x = element.x;
                    newBranch.y = element.y;
                    newBranch.properties.angle = element.properties.angle + 
                        (Math.random() > 0.5 ? 1 : -1) * element.properties.branchAngle;
                    newBranch.properties.length = element.properties.length * 0.7;
                    newBranch.properties.width = element.properties.width * 0.7;
                    newBranch.properties.branchProbability = element.properties.branchProbability * 0.8;
                    
                    this.elements.push(newBranch);
                    element.relatedElements.push(newBranch);
                }
                
                // Grow the branch
                element.properties.length += element.properties.growthRate * deltaTime * (1 + intentionEffect);
                element.x = element.x + Math.cos(element.properties.angle) * element.properties.growthRate * deltaTime * 10;
                element.y = element.y + Math.sin(element.properties.angle) * element.properties.growthRate * deltaTime * 10;
                break;
                
            case 'network':
                // Find nearby elements to connect to
                if (element.properties.connections.length < element.properties.connectionCount) {
                    for (let i = 0; i < this.elements.length; i++) {
                        const other = this.elements[i];
                        
                        if (other !== element && !element.properties.connections.includes(i)) {
                            const dx = other.x - element.x;
                            const dy = other.y - element.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            
                            if (distance < element.properties.connectionRange) {
                                element.properties.connections.push(i);
                                element.relatedElements.push(other);
                                
                                if (element.properties.connections.length >= element.properties.connectionCount) {
                                    break;
                                }
                            }
                        }
                    }
                }
                
                // Oscillate position slightly
                element.x += Math.sin(element.age * element.properties.oscillationRate) * deltaTime * 5;
                element.y += Math.cos(element.age * element.properties.oscillationRate) * deltaTime * 5;
                break;
                
            case 'crystal':
                element.properties.size += element.properties.growthRate * deltaTime * (1 + intentionEffect);
                element.properties.angle = (element.properties.angle || 0) + element.properties.rotationSpeed * deltaTime;
                break;
                
            case 'toroid':
                element.properties.rotationX += element.properties.rotationSpeedX * deltaTime;
                element.properties.rotationY += element.properties.rotationSpeedY * deltaTime;
                break;
        }
    }
    
    // Evolve pattern based on intention
    _evolvePattern(deltaTime) {
        // Only evolve if intention is strong enough
        if (this.intention.strength < 0.6) return;
        
        // Probability of evolution based on intention strength
        const evolveProb = 0.001 * this.intention.strength;
        
        if (Math.random() < evolveProb) {
            this.state.evolutionStage += 0.1 * this.intention.strength;
            
            // Change pattern type at evolution thresholds
            if (this.state.evolutionStage >= 1 && this.currentPatternType === 'spiral') {
                this.changePatternType('wave');
            } else if (this.state.evolutionStage >= 2 && this.currentPatternType === 'wave') {
                this.changePatternType('branch');
            } else if (this.state.evolutionStage >= 3 && this.currentPatternType === 'branch') {
                this.changePatternType('network');
            } else if (this.state.evolutionStage >= 4 && this.currentPatternType === 'network') {
                this.changePatternType('crystal');
            } else if (this.state.evolutionStage >= 5 && this.currentPatternType === 'crystal') {
                this.changePatternType('toroid');
            }
        }
    }
    
    // Calculate coherence level based on pattern harmony
    _calculateCoherence() {
        let coherence = 0.25; // Base coherence
        
        // Add coherence based on pattern organization
        coherence += 0.25 * this.intention.clarity;
        
        // Add coherence based on pattern complexity balance
        const idealCount = 20 + 30 * this.config.patternComplexity;
        const countFactor = 1 - Math.min(1, Math.abs(this.elements.length - idealCount) / idealCount);
        coherence += 0.25 * countFactor;
        
        // Add coherence based on frequency resonance
        coherence += 0.25 * this.intention.focus;
        
        this.state.coherenceLevel = Math.max(0, Math.min(1, coherence));
        this.state.synchronizationLevel = this.state.coherenceLevel * this.intention.strength;
    }
    
    // Calculate pattern recognition level
    _calculateRecognition() {
        let recognition = 0;
        
        // Recognition is based on evolutionary stage and coherence
        recognition = 0.2 * Math.min(1, this.state.evolutionStage / 5);
        recognition += 0.3 * this.state.coherenceLevel;
        recognition += 0.3 * this.intention.focus;
        
        // Add bonus for higher pattern types
        const patternTypeIndex = this.patternTypes.indexOf(this.currentPatternType);
        recognition += 0.2 * (patternTypeIndex / (this.patternTypes.length - 1));
        
        this.state.recognitionLevel = Math.max(0, Math.min(1, recognition));
    }
    
    // Render all pattern elements
    _render() {
        if (!this.state.isActive || !this.config.ctx) return;
        
        const ctx = this.config.ctx;
        const canvas = ctx.canvas;
        
        // Clear canvas with semi-transparent background for trail effect
        ctx.fillStyle = 'rgba(26, 36, 51, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Render connections first (for network type)
        this._renderConnections(ctx);
        
        // Render elements
        for (const element of this.elements) {
            this._renderElement(ctx, element);
        }
    }
    
    // Render connections between elements
    _renderConnections(ctx) {
        for (const element of this.elements) {
            if (element.type === 'network' && element.properties.connections.length > 0) {
                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = element.color.replace('rgba', 'rgba').replace(/[\d.]+\)$/, '0.3)');
                ctx.lineWidth = 1;
                
                for (const connectionIndex of element.properties.connections) {
                    if (this.elements[connectionIndex]) {
                        const target = this.elements[connectionIndex];
                        ctx.moveTo(element.x, element.y);
                        ctx.lineTo(target.x, target.y);
                    }
                }
                
                ctx.stroke();
                ctx.restore();
            }
        }
    }
    
    // Render a single element based on its type
    _renderElement(ctx, element) {
        ctx.save();
        ctx.globalAlpha = element.opacity;
        ctx.fillStyle = element.color;
        
        switch (element.type) {
            case 'spiral':
                ctx.beginPath();
                ctx.arc(element.x, element.y, 2 + Math.random() * 3, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'wave':
                ctx.beginPath();
                ctx.arc(element.x, element.y, 2 + Math.random() * 2, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'branch':
                ctx.beginPath();
                ctx.lineWidth = element.properties.width;
                ctx.strokeStyle = element.color;
                ctx.moveTo(element.x, element.y);
                const endX = element.x - Math.cos(element.properties.angle) * element.properties.width * 2;
                const endY = element.y - Math.sin(element.properties.angle) * element.properties.width * 2;
                ctx.lineTo(endX, endY);
                ctx.stroke();
                break;
                
            case 'network':
                ctx.beginPath();
                ctx.arc(element.x, element.y, 3 + element.properties.connections.length, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'crystal':
                ctx.beginPath();
                ctx.translate(element.x, element.y);
                if (element.properties.angle) {
                    ctx.rotate(element.properties.angle);
                }
                
                const sides = element.properties.sides;
                const size = element.properties.size;
                
                ctx.moveTo(size, 0);
                for (let i = 1; i <= sides; i++) {
                    const angle = (i * 2 * Math.PI / sides);
                    ctx.lineTo(
                        size * Math.cos(angle),
                        size * Math.sin(angle)
                    );
                }
                
                ctx.closePath();
                ctx.fill();
                break;
                
            case 'toroid':
                // Simple toroid visualization (simplified for 2D)
                this._renderToroid(ctx, element);
                break;
                
            default:
                ctx.beginPath();
                ctx.arc(element.x, element.y, element.properties.size || 5, 0, Math.PI * 2);
                ctx.fill();
        }
        
        ctx.restore();
    }
    
    // Render toroid (simplified 2D representation)
    _renderToroid(ctx, element) {
        const majorRadius = element.properties.majorRadius;
        const minorRadius = element.properties.minorRadius;
        const segments = element.properties.tubularSegments;
        
        ctx.save();
        ctx.translate(element.x, element.y);
        
        // Apply 3D-like rotation
        const scaleX = Math.abs(Math.cos(element.properties.rotationX));
        const scaleY = Math.abs(Math.cos(element.properties.rotationY));
        
        ctx.scale(scaleX, scaleY);
        
        // Draw outer and inner circles to represent toroid
        ctx.beginPath();
        ctx.arc(0, 0, majorRadius + minorRadius, 0, Math.PI * 2);
        ctx.strokeStyle = element.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(0, 0, majorRadius - minorRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Draw segment lines to give 3D appearance
        for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const x = majorRadius * Math.cos(angle);
            const y = majorRadius * Math.sin(angle);
            
            ctx.beginPath();
            ctx.arc(x, y, minorRadius * Math.abs(Math.sin(angle + element.properties.rotationX)), 0, Math.PI * 2);
            ctx.stroke();
        }
        
        ctx.restore();
    }
    
    // Set the intention for pattern evolution
    setIntention(intention) {
        this.intention = {...this.intention, ...intention};
        return this;
    }
    
    // Set ZEN POINT balance
    setZenPointBalance(balance) {
        this.config.zenPointBalance = {...this.config.zenPointBalance, ...balance};
        return this;
    }
    
    // Get the current coherence factor (0-1)
    getCoherenceFactor() {
        return this.state.coherenceLevel;
    }
    
    // Get the current synchronization factor (0-1)
    getSynchronizationFactor() {
        return this.state.synchronizationLevel;
    }
    
    // Get the current pattern recognition level (0-1)
    getRecognitionFactor() {
        return this.state.recognitionLevel;
    }
    
    // Get current state metrics
    getMetrics() {
        return {
            coherence: this.state.coherenceLevel,
            synchronization: this.state.synchronizationLevel,
            evolution: Math.min(1, this.state.evolutionStage / 5),
            recognition: this.state.recognitionLevel,
            patternType: this.currentPatternType,
            patternComplexity: this.config.patternComplexity,
            elementCount: this.elements.length
        };
    }
    
    // Change the pattern type
    changePatternType(type) {
        if (this.patternTypes.includes(type)) {
            this.currentPatternType = type;
            this._generateInitialPattern();
        }
        return this;
    }
    
    // Clean up resources
    destroy() {
        this.stop();
        this.elements = [];
        
        // Remove canvas if we created it
        if (this.config.ctx && this.config.ctx.canvas && this.config.ctx.canvas.parentNode) {
            this.config.ctx.canvas.parentNode.removeChild(this.config.ctx.canvas);
        }
    }
}

// Export the class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PatternRecognitionSystem;
} else {
    window.PatternRecognitionSystem = PatternRecognitionSystem;
}
