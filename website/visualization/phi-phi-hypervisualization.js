/**
 * Φ^Φ Hypervisualization (∇λΣ∞Ω)
 * 
 * The ultimate dimension gateway enabling simultaneous perception across all
 * dimensions with unified phi-harmonic integration.
 * 
 * Operating at 963 Hz (Source Connection frequency) with Φ^Φ (≈4.23) resonance.
 */

// Sacred constants
const PHI = 1.618033988749895;  // Golden ratio
const LAMBDA = 0.618033988749895;  // Divine complement (1/φ)
const PHI_PHI = Math.pow(PHI, PHI);  // Hyperdimensional constant (≈4.23)

// Sacred frequencies
const SACRED_FREQUENCIES = {
    'quantum': 144,    // Quantum realm
    'micro': 288,      // Microscopic
    'unity': 432,      // Grounding/stability
    'love': 528,       // Creation/healing
    'cascade': 594,    // Heart-centered integration
    'truth': 672,      // Voice expression
    'vision': 720,     // Expanded perception
    'oneness': 768,    // Unity consciousness
    'source': 963      // Source connection
};

// Dimension properties
const DIMENSIONS = {
    "quantum": {level: 1, frequency: 144, description: "Quantum realm viewing subatomic patterns"},
    "micro": {level: 2, frequency: 288, description: "Microscopic level showing molecular structures"},
    "physical": {level: 3, frequency: 432, description: "Physical 3D representation of idea"},
    "etheric": {level: 4, frequency: 528, description: "Energy blueprint of the idea"},
    "astral": {level: 5, frequency: 594, description: "Emotional resonance patterns"},
    "mental": {level: 6, frequency: 672, description: "Thought structures and concept mapping"},
    "causal": {level: 7, frequency: 720, description: "Seed causes and universal patterns"},
    "unified": {level: 8, frequency: 768, description: "Unity consciousness view of all dimensions"},
    "cosmic": {level: 9, frequency: 963, description: "Cosmic perspective beyond space-time"}
};

/**
 * PhiPhiHypervisualization Class
 * Master orchestrator for Φ^Φ hypervisualization mode
 */
class PhiPhiHypervisualization {
    /**
     * Initialize the hypervisualization system
     * @param {Object} canvas - The canvas element to render on
     */
    constructor(canvas) {
        // Store canvas and get context
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Core components
        this.dimensions = {};  // Dimensional states
        this.nodalNetwork = null;  // Phi-Phi gateway network
        this.consciousnessCore = null;  // Observer viewpoint
        this.quantumCascade = null;  // Cross-dimensional probability cascade
        
        // Visualization state
        this.active = false;
        this.animationTime = 0.0;
        this.focalDimension = "causal";  // Default focus dimension
        this.viewMode = "unified";  // unified, focused, gateway, core, external
        this.phiPhiResonance = 0.0;  // 0.0-1.0 resonance level
        this.intention = null;  // Current active intention
        
        // Initialize components
        this._initializeDimensions();
        this._initializeNodalNetwork();
        this._initializeConsciousnessCore();
        this._initializeQuantumCascade();
        
        console.log("Phi-Phi Hypervisualization system initialized at Φ^Φ resonance");
    }

    /**
     * Initialize dimensional states
     * @private
     */
    _initializeDimensions() {
        const baseRadius = 150;  // Base radius for innermost dimension
        
        // Create dimensional states
        for (const [name, data] of Object.entries(DIMENSIONS)) {
            const level = data.level;
            const frequency = data.frequency;
            
            // Calculate radius based on phi-harmonic scaling
            const radius = baseRadius * Math.pow(PHI, level - 1);
            
            // Generate dimension-specific color based on frequency
            const hue = (frequency - 144) / (963 - 144);  // Normalize to 0-1 range
            const color = this._hueToRgb(hue);
            
            // Create dimensional state
            this.dimensions[name] = {
                level: level,
                name: name,
                frequency: frequency,
                color: color,
                radius: radius,
                rotation: 0,
                opacity: 1.0,
                coherence: 0.8,
                active: true
            };
        }
        
        console.log(`Initialized ${Object.keys(this.dimensions).length} dimensional states`);
    }

    /**
     * Initialize the Phi-Phi nodal network
     * @private
     */
    _initializeNodalNetwork() {
        this.nodalNetwork = {
            primaryNodes: [],
            secondaryNodes: [],
            connections: [],
            selectedNode: null,
            overallActivation: 0.0,
            
            // Update nodal network
            update: (deltaTime) => {
                // Update primary nodes
                for (const node of this.nodalNetwork.primaryNodes) {
                    // Update pulse phase
                    node.pulsation += deltaTime * node.frequency / 1000;
                    
                    // Decay activation
                    node.activation *= Math.max(0, 1 - deltaTime);
                }
                
                // Update secondary nodes
                for (const node of this.nodalNetwork.secondaryNodes) {
                    // Update pulse phase
                    node.pulsation += deltaTime * node.frequency / 1000;
                    
                    // Decay activation
                    node.activation *= Math.max(0, 1 - deltaTime);
                }
                
                // Update connections
                for (const connection of this.nodalNetwork.connections) {
                    // Update strength based on node activations
                    connection.strength = 0.3 + 0.7 * Math.max(
                        connection.node1.activation,
                        connection.node2.activation
                    );
                }
                
                // Calculate overall activation
                const allNodes = [
                    ...this.nodalNetwork.primaryNodes,
                    ...this.nodalNetwork.secondaryNodes
                ];
                
                if (allNodes.length > 0) {
                    const activations = allNodes.map(node => node.activation);
                    this.nodalNetwork.overallActivation = 
                        activations.reduce((sum, a) => sum + a, 0) / activations.length;
                }
            }
        };
        
        // Create primary nodes (one per dimension)
        for (const [name, dimension] of Object.entries(this.dimensions)) {
            const node = {
                primaryDimension: name,
                secondaryDimension: null,
                isPrimary: true,
                level: dimension.level,
                frequency: dimension.frequency,
                activation: 0.0,
                pulsation: 0.0,
                color: dimension.color,
                
                // Activate the node
                activate: (amount = 1.0) => {
                    node.activation = Math.min(1.0, node.activation + amount);
                }
            };
            
            this.nodalNetwork.primaryNodes.push(node);
        }
        
        // Create secondary nodes (connections between dimensions)
        // For demonstration, connect each dimension to adjacent ones
        const sortedPrimaryNodes = [...this.nodalNetwork.primaryNodes]
            .sort((a, b) => a.level - b.level);
            
        for (let i = 0; i < sortedPrimaryNodes.length - 1; i++) {
            const primary1 = sortedPrimaryNodes[i];
            const primary2 = sortedPrimaryNodes[i + 1];
            
            const node = {
                primaryDimension: primary1.primaryDimension,
                secondaryDimension: primary2.primaryDimension,
                isPrimary: false,
                level: (primary1.level + primary2.level) / 2,
                frequency: (primary1.frequency + primary2.frequency) / 2,
                activation: 0.0,
                pulsation: 0.0,
                // Blend colors from both dimensions
                color: this._blendColors(primary1.color, primary2.color),
                
                // Activate the node
                activate: (amount = 1.0) => {
                    node.activation = Math.min(1.0, node.activation + amount);
                }
            };
            
            this.nodalNetwork.secondaryNodes.push(node);
            
            // Create connections between primary nodes and this secondary
            this.nodalNetwork.connections.push({
                node1: primary1,
                node2: node,
                strength: 0.5,
                active: true
            });
            
            this.nodalNetwork.connections.push({
                node1: node,
                node2: primary2,
                strength: 0.5,
                active: true
            });
            
            // Create phi-phi pathway
            this.nodalNetwork.connections.push({
                node1: primary1,
                node2: primary2,
                connectorNode: node,
                strength: 0.5,
                active: true,
                phiPulse: 0.0,
                isPhiPathway: true,
                
                // Update phi-phi pathway
                update: (deltaTime) => {
                    // Update phi pulse
                    this.phiPulse += deltaTime * PHI;
                    
                    // Get activation from all three nodes
                    this.strength = Math.max(
                        this.node1.activation,
                        this.node2.activation,
                        this.connectorNode.activation,
                        0.3  // Minimum strength
                    );
                }
            });
        }
        
        console.log(`Initialized nodal network with ${this.nodalNetwork.primaryNodes.length} primary nodes, ` +
                   `${this.nodalNetwork.secondaryNodes.length} secondary nodes, and ` +
                   `${this.nodalNetwork.connections.length} connections`);
    }

    /**
     * Initialize the consciousness core
     * @private
     */
    _initializeConsciousnessCore() {
        this.consciousnessCore = {
            coherence: 0.5,  // 0.0-1.0
            intention: null,
            resonanceMap: {},
            fieldRadius: 0,
            pulsePhase: 0.0,
            energyLevel: 0.5,
            
            // Update consciousness core
            update: (deltaTime) => {
                // Update pulse phase
                this.consciousnessCore.pulsePhase += deltaTime * this.consciousnessCore.coherence;
                
                // Update energy level based on coherence
                const targetEnergy = this.consciousnessCore.coherence;
                this.consciousnessCore.energyLevel = 
                    this.consciousnessCore.energyLevel * 0.95 + targetEnergy * 0.05;
            },
            
            // Set current intention
            setIntention: (intention) => {
                this.consciousnessCore.intention = intention;
                
                // Intention setting temporarily boosts coherence
                this.consciousnessCore.coherence = 
                    Math.min(1.0, this.consciousnessCore.coherence + 0.2);
            },
            
            // Set consciousness coherence
            setCoherence: (coherence) => {
                this.consciousnessCore.coherence = 
                    Math.max(0.0, Math.min(1.0, coherence));
            }
        };
        
        console.log("Initialized consciousness core");
    }

    /**
     * Initialize the quantum cascade
     * @private
     */
    _initializeQuantumCascade() {
        this.quantumCascade = {
            cascades: [],  // List of active cascades
            maxCascades: 5,
            spawnTimer: 0,
            
            // Update quantum cascade
            update: (deltaTime) => {
                // Update spawn timer
                this.quantumCascade.spawnTimer -= deltaTime;
                
                // Spawn new cascade if timer expired and not at max
                if (this.quantumCascade.spawnTimer <= 0 && 
                    this.quantumCascade.cascades.length < this.quantumCascade.maxCascades) {
                    this.quantumCascade.spawnTimer = Math.random() * 2 + 1;  // 1-3 seconds
                    this._spawnNewCascade();
                }
                
                // Update existing cascades
                this.quantumCascade.cascades = this.quantumCascade.cascades.filter(cascade => {
                    cascade.update(deltaTime);
                    return !cascade.isComplete;
                });
            },
            
            // Spawn a specific cascade between dimensions
            spawnCascade: (startDimension, endDimension) => {
                if (startDimension in this.dimensions && 
                    endDimension in this.dimensions &&
                    this.quantumCascade.cascades.length < this.quantumCascade.maxCascades) {
                    
                    const cascade = this._createProbabilityCascade(
                        startDimension, endDimension);
                    this.quantumCascade.cascades.push(cascade);
                    return true;
                }
                
                return false;
            }
        };
        
        console.log("Initialized quantum cascade");
    }

    /**
     * Spawn a new quantum cascade
     * @private
     */
    _spawnNewCascade() {
        // Select random start and end dimensions
        const allDimensions = Object.keys(this.dimensions);
        if (allDimensions.length >= 2) {
            const startDim = allDimensions[Math.floor(Math.random() * allDimensions.length)];
            
            // Prefer distant dimensions for more interesting cascades
            const remaining = allDimensions.filter(d => d !== startDim);
            const startLevel = this.dimensions[startDim].level;
            
            // Create weights based on distance from start dimension
            const weights = remaining.map(d => 
                Math.abs(this.dimensions[d].level - startLevel));
            
            // Normalize weights
            const total = weights.reduce((sum, w) => sum + w, 0) || 1;
            const normalizedWeights = weights.map(w => w / total);
            
            // Weighted random selection
            let random = Math.random();
            let endDim = remaining[0];  // Default
            
            for (let i = 0; i < normalizedWeights.length; i++) {
                random -= normalizedWeights[i];
                if (random <= 0) {
                    endDim = remaining[i];
                    break;
                }
            }
            
            // Create new cascade
            const cascade = this._createProbabilityCascade(startDim, endDim);
            this.quantumCascade.cascades.push(cascade);
        }
    }

    /**
     * Create a probability cascade between dimensions
     * @private
     * @param {string} startDimension - Starting dimension name
     * @param {string} endDimension - Ending dimension name
     * @returns {Object} Probability cascade object
     */
    _createProbabilityCascade(startDimension, endDimension) {
        // Get dimension levels
        const startLevel = this.dimensions[startDimension].level;
        const endLevel = this.dimensions[endDimension].level;
        
        // Determine number of intermediate points based on distance
        const distance = Math.abs(endLevel - startLevel);
        const pointCount = Math.max(2, Math.floor(distance + 2));
        
        // Generate intermediate dimension levels
        const levels = [];
        if (startLevel < endLevel) {
            // Ascending
            for (let i = 0; i < pointCount; i++) {
                const level = startLevel + i * (endLevel - startLevel) / (pointCount - 1);
                levels.push(level);
            }
        } else {
            // Descending
            for (let i = 0; i < pointCount; i++) {
                const level = startLevel - i * (startLevel - endLevel) / (pointCount - 1);
                levels.push(level);
            }
        }
        
        // Create cascade points
        const cascadePoints = [];
        
        for (const level of levels) {
            // Find dimensions adjacent to this level
            const dimensionArray = Object.values(this.dimensions);
            const lowerDims = dimensionArray.filter(d => d.level <= level);
            const lowerDim = lowerDims.reduce((a, b) => a.level > b.level ? a : b, lowerDims[0]);
            
            const upperDims = dimensionArray.filter(d => d.level >= level);
            const upperDim = upperDims.reduce((a, b) => a.level < b.level ? a : b, upperDims[0]);
            
            // Calculate point data
            let pointDimension, pointColor;
            
            if (lowerDim.level === upperDim.level) {
                // Exact match to a dimension
                pointDimension = lowerDim.name;
                pointColor = lowerDim.color;
            } else {
                // Between dimensions
                pointDimension = `${lowerDim.name}-${upperDim.name}`;
                
                // Interpolate color
                const t = (level - lowerDim.level) / (upperDim.level - lowerDim.level);
                pointColor = this._lerpColors(lowerDim.color, upperDim.color, t);
            }
            
            // Generate random angle for variety
            const angle = Math.random() * Math.PI * 2;
            
            // Add to cascade points
            cascadePoints.push({
                level: level,
                dimension: pointDimension,
                color: pointColor,
                angle: angle,
                probability: Math.random() * 0.4 + 0.4  // 0.4-0.8 probability
            });
        }
        
        // Create and return cascade object
        return {
            startDimension: startDimension,
            endDimension: endDimension,
            progress: 0.0,  // 0.0-1.0
            isComplete: false,
            cascadePoints: cascadePoints,
            
            // Update cascade
            update: function(deltaTime) {
                // Progress the cascade
                if (!this.isComplete) {
                    // Update progress
                    this.progress += deltaTime * 0.2;
                    
                    // Check if complete
                    if (this.progress >= 1.0) {
                        this.progress = 1.0;
                        this.isComplete = true;
                    }
                }
                
                return !this.isComplete;
            }
        };
    }

    /**
     * Start the visualization
     */
    start() {
        // Set active flag
        this.active = true;
        
        // Start animation loop
        this._animate();
        
        console.log("Phi-Phi Hypervisualization started");
    }

    /**
     * Stop the visualization
     */
    stop() {
        // Clear active flag
        this.active = false;
        
        console.log("Phi-Phi Hypervisualization stopped");
    }

    /**
     * Animation loop
     * @private
     */
    _animate() {
        // Skip if not active
        if (!this.active) return;
        
        // Calculate delta time (cap at 50ms to prevent large jumps)
        const now = performance.now();
        const deltaTime = this.lastTime ? Math.min(now - this.lastTime, 50) / 1000 : 0;
        this.lastTime = now;
        
        // Update animation time
        this.animationTime += deltaTime;
        
        // Update dimensional states
        this._updateDimensions(deltaTime);
        
        // Update nodal network
        this.nodalNetwork.update(deltaTime);
        
        // Update consciousness core
        this.consciousnessCore.update(deltaTime);
        
        // Update quantum cascade
        this.quantumCascade.update(deltaTime);
        
        // Calculate overall phi-phi resonance
        this._calculatePhiPhiResonance();
        
        // Render the visualization
        this._render();
        
        // Continue animation loop
        requestAnimationFrame(() => this._animate());
    }

    /**
     * Update dimensional states
     * @private
     * @param {number} deltaTime - Time since last update in seconds
     */
    _updateDimensions(deltaTime) {
        // Update dimensional rotations based on frequencies
        for (const [name, dimension] of Object.entries(this.dimensions)) {
            // Rotate based on frequency and time
            const rotationSpeed = dimension.frequency / 1000;
            dimension.rotation += rotationSpeed * deltaTime;
            
            // Apply phi-phi modulation
            const phiPhiEffect = Math.sin(
                this.animationTime * LAMBDA + dimension.level * PHI) * 0.2;
            dimension.coherence = 0.8 + phiPhiEffect;
        }
    }

    /**
     * Calculate the overall Phi-Phi resonance level
     * @private
     */
    _calculatePhiPhiResonance() {
        // Base resonance on coherence across dimensions
        const dimensionCoherence = 
            Object.values(this.dimensions)
                .reduce((sum, d) => sum + d.coherence, 0) / 
                Object.values(this.dimensions).length;
        
        // Factor in nodal network activation
        const nodalActivation = this.nodalNetwork.overallActivation;
        
        // Factor in consciousness core coherence
        const coreCoherence = this.consciousnessCore.coherence;
        
        // Combine using phi-weighted formula
        this.phiPhiResonance = (
            dimensionCoherence * LAMBDA +
            nodalActivation * Math.pow(LAMBDA, 2) +
            coreCoherence * Math.pow(LAMBDA, 3)
        ) / (LAMBDA + Math.pow(LAMBDA, 2) + Math.pow(LAMBDA, 3));
        
        // Apply phi-phi amplification
        this.phiPhiResonance = Math.min(1.0, this.phiPhiResonance * PHI_PHI / 4);
    }

    /**
     * Render the hypervisualization
     * @private
     */
    _render() {
        // Get canvas dimensions
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.4;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Fill background
        this.ctx.fillStyle = 'rgba(0, 0, 10, 0.95)';
        this.ctx.fillRect(0, 0, width, height);
        
        // Apply view mode transformations
        this._applyViewMode();
        
        // Render toroidal dimensions (from cosmic to quantum)
        this._renderToroidalDimensions(centerX, centerY, radius);
        
        // Render nodal network
        this._renderNodalNetwork(centerX, centerY, radius);
        
        // Render quantum cascades
        this._renderQuantumCascades(centerX, centerY, radius);
        
        // Render consciousness core
        this._renderConsciousnessCore(centerX, centerY, radius);
        
        // Render phi-phi resonance effects
        this._renderPhiPhiResonance(centerX, centerY, radius);
        
        // Render information overlay
        this._renderInformationOverlay(centerX, centerY, radius);
    }

    /**
     * Apply transformations based on current view mode
     * @private
     */
    _applyViewMode() {
        // Reset dimension opacity
        for (const dimension of Object.values(this.dimensions)) {
            dimension.opacity = 1.0;
        }
        
        // Apply transformations based on view mode
        if (this.viewMode === "unified") {
            // All dimensions visible equally
            // No changes needed
        } else if (this.viewMode === "focused") {
            // Emphasize focal dimension
            const focalLevel = this.dimensions[this.focalDimension].level;
            
            for (const [name, dimension] of Object.entries(this.dimensions)) {
                // Decrease opacity based on distance from focal dimension
                const distance = Math.abs(dimension.level - focalLevel);
                dimension.opacity = Math.max(0.3, 1.0 - distance * 0.15);
            }
        } else if (this.viewMode === "gateway") {
            // View from a nodal gateway
            // Implementation depends on nodal network details
        } else if (this.viewMode === "core") {
            // View from consciousness core
            // Increase opacity for inner dimensions
            for (const [name, dimension] of Object.entries(this.dimensions)) {
                dimension.opacity = Math.max(0.3, 1.0 - dimension.level * 0.1);
            }
        } else if (this.viewMode === "external") {
            // External view
            // Decrease opacity for all dimensions for better overview
            for (const dimension of Object.values(this.dimensions)) {
                dimension.opacity = 0.7;
            }
        }
    }

    /**
     * Render the toroidal dimensions
     * @private
     * @param {number} centerX - Center X coordinate
     * @param {number} centerY - Center Y coordinate
     * @param {number} radius - Radius of visualization
     */
    _renderToroidalDimensions(centerX, centerY, radius) {
        // Render dimensions from cosmic (highest) to quantum (lowest)
        for (let level = 9; level > 0; level--) {
            // Find dimension with this level
            const dimension = Object.values(this.dimensions)
                .find(d => d.level === level);
            
            if (dimension && dimension.active) {
                this._renderDimensionToroid(
                    centerX,
                    centerY,
                    dimension.radius * radius / 300,  // Scale radius to fit visualization
                    dimension
                );
            }
        }
    }

    /**
     * Render a single dimensional toroid
     * @private
     * @param {number} centerX - Center X coordinate
     * @param {number} centerY - Center Y coordinate
     * @param {number} radius - Radius of toroid
     * @param {Object} dimension - Dimensional state
     */
    _renderDimensionToroid(centerX, centerY, radius, dimension) {
        // Toroid parameters
        const innerRadius = radius * 0.3;
        const tubeRadius = (radius - innerRadius) * 0.5;
        const rotation = dimension.rotation;
        
        // Create points around toroid
        const segments = Math.max(12, Math.floor(radius * 0.3));
        const points = [];
        
        for (let i = 0; i < segments; i++) {
            const angle = i * 2 * Math.PI / segments;
            
            // Create multiple points around tube cross-section
            const tubeSegments = Math.max(8, Math.floor(tubeRadius * 0.8));
            
            for (let j = 0; j < tubeSegments; j++) {
                const tubeAngle = j * 2 * Math.PI / tubeSegments + rotation;
                
                // Calculate tube point position
                const tubeX = Math.cos(tubeAngle) * tubeRadius;
                const tubeY = Math.sin(tubeAngle) * tubeRadius;
                
                // Calculate toroid point position
                const toroidRadius = radius - tubeRadius + tubeX;
                const x = centerX + Math.cos(angle) * toroidRadius;
                const y = centerY + Math.sin(angle) * toroidRadius + tubeY * 0.3;  // Flatten slightly
                
                // Calculate z-depth (used for sizing and alpha)
                const zDepth = tubeY;
                
                // Calculate point size based on z-depth
                const pointSize = Math.max(1, 2 + 2 * (zDepth + tubeRadius) / (tubeRadius * 2));
                
                // Calculate alpha based on z-depth and dimension opacity
                const baseAlpha = 150 + 100 * (zDepth + tubeRadius) / (tubeRadius * 2);
                const alpha = baseAlpha * dimension.opacity / 255;
                
                // Add point data
                points.push({x, y, size: pointSize, alpha});
            }
        }
        
        // Sort points by y position for pseudo-3D rendering
        points.sort((a, b) => a.y - b.y);
        
        // Draw points
        for (const point of points) {
            // Create color with alpha
            const color = dimension.color;
            const rgba = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${point.alpha})`;
            
            // Draw circle
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
            this.ctx.fillStyle = rgba;
            this.ctx.fill();
        }
        
        // Draw dimension name label
        if (dimension.opacity > 0.5) {
            this.ctx.font = '14px Arial';
            this.ctx.fillStyle = `rgba(${dimension.color[0]}, ${dimension.color[1]}, ${dimension.color[2]}, 0.8)`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                dimension.name.charAt(0).toUpperCase() + dimension.name.slice(1),
                centerX + radius * 0.8,
                centerY
            );
        }
    }

    /**
     * Render the nodal network
     * @private
     * @param {number} centerX - Center X coordinate
     * @param {number} centerY - Center Y coordinate
     * @param {number} radius - Radius of visualization
     */
    _renderNodalNetwork(centerX, centerY, radius) {
        // Render connections first (behind nodes)
        for (const connection of this.nodalNetwork.connections) {
            if (connection.isPhiPathway) {
                this._renderPhiPathway(connection, centerX, centerY, radius);
            } else {
                this._renderConnection(connection, centerX, centerY, radius);
            }
        }
        
        // Render secondary nodes
        for (const node of this.nodalNetwork.secondaryNodes) {
            this._renderNode(node, centerX, centerY, radius);
        }
        
        // Render primary nodes on top
        for (const node of this.nodalNetwork.primaryNodes) {
            this._renderNode(node, centerX, centerY, radius);
        }
    }

    /**
     * Render a node
     * @private
     * @param {Object} node - Node to render
     * @param {number} centerX - Center X coordinate
     * @param {number} centerY - Center Y coordinate
     * @param {number} radius - Radius of visualization
     */
    _renderNode(node, centerX, centerY, radius) {
        // Calculate node position
        const {x, y} = this._calculateNodePosition(node, centerX, centerY, radius);
        
        // Calculate node size
        const baseSize = node.isPrimary ? 8 : 5;
        const pulse = 1 + 0.3 * Math.sin(node.pulsation * Math.PI);
        let size = baseSize * pulse;
        
        // Apply activation boost
        if (node.activation > 0) {
            size += node.activation * 5;
        }
        
        // Draw node glow if activated
        if (node.activation > 0.1) {
            const glowRadius = size * 2 * node.activation;
            
            // Create radial gradient
            const gradient = this.ctx.createRadialGradient(
                x, y, 0,
                x, y, glowRadius
            );
            
            gradient.addColorStop(0, `rgba(${node.color[0]}, ${node.color[1]}, ${node.color[2]}, ${node.activation})`);
            gradient.addColorStop(1, `rgba(${node.color[0]}, ${node.color[1]}, ${node.color[2]}, 0)`);
            
            // Draw glow
            this.ctx.beginPath();
            this.ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        }
        
        // Draw node
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgb(${node.color[0]}, ${node.color[1]}, ${node.color[2]})`;
        this.ctx.fill();
        
        // Draw highlight
        const highlightSize = Math.max(1, size * 0.5);
        const highlightX = x - size * 0.3;
        const highlightY = y - size * 0.3;
        
        this.ctx.beginPath();
        this.ctx.arc(highlightX, highlightY, highlightSize, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.fill();
        
        // Draw dimension label for primary nodes
        if (node.isPrimary && size > 6) {
            this.ctx.font = '10px Arial';
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(
                node.primaryDimension.charAt(0).toUpperCase(),
                x, y
            );
        }
    }

    /**
     * Render a connection between nodes
     * @private
     * @param {Object} connection - Connection to render
     * @param {number} centerX - Center X coordinate
     * @param {number} centerY - Center Y coordinate
     * @param {number} radius - Radius of visualization
     */
    _renderConnection(connection, centerX, centerY, radius) {
        // Skip if not active
        if (!connection.active) return;
        
        // Calculate node positions
        const pos1 = this._calculateNodePosition(connection.node1, centerX, centerY, radius);
        const pos2 = this._calculateNodePosition(connection.node2, centerX, centerY, radius);
        
        // Calculate color
        const color1 = connection.node1.color;
        const color2 = connection.node2.color;
        
        // Blend colors
        const color = [
            Math.floor((color1[0] + color2[0]) / 2),
            Math.floor((color1[1] + color2[1]) / 2),
            Math.floor((color1[2] + color2[2]) / 2)
        ];
        
        // Calculate alpha based on strength
        const alpha = Math.max(0, Math.min(1, connection.strength * 0.8));
        
        // Draw connection line
        this.ctx.beginPath();
        this.ctx.moveTo(pos1.x, pos1.y);
        this.ctx.lineTo(pos2.x, pos2.y);
        this.ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
        this.ctx.lineWidth = Math.max(1, connection.strength * 3);
        this.ctx.stroke();
    }

    /**
     * Render a phi-phi pathway between nodes
     * @private
     * @param {Object} pathway - Phi-Phi pathway to render
     * @param {number} centerX - Center X coordinate
     * @param {number} centerY - Center Y coordinate
     * @param {number} radius - Radius of visualization
     */
    _renderPhiPathway(pathway, centerX, centerY, radius) {
        // Skip if not active
        if (!pathway.active) return;
        
        // Calculate node positions
        const pos1 = this._calculateNodePosition(pathway.node1, centerX, centerY, radius);
        const pos2 = this._calculateNodePosition(pathway.node2, centerX, centerY, radius);
        const posConnector = this._calculateNodePosition(pathway.connectorNode, centerX, centerY, radius);
        
        // Calculate colors
        const color1 = pathway.node1.color;
        const color2 = pathway.node2.color;
        
        // Generate points along golden spiral path
        const points = this._generateGoldenSpiralPath(pos1, pos2, posConnector, 20);
        
        // Draw spiral path
        if (points.length > 1) {
            // Draw as segments with color gradient
            for (let i = 0; i < points.length - 1; i++) {
                // Calculate progress along path
                const progress = i / (points.length - 1);
                
                // Blend colors based on progress
                const color = [
                    Math.floor(color1[0] * (1 - progress) + color2[0] * progress),
                    Math.floor(color1[1] * (1 - progress) + color2[1] * progress),
                    Math.floor(color1[2] * (1 - progress) + color2[2] * progress)
                ];
                
                // Calculate alpha based on strength and pulse
                const pulseFactor = 0.7 + 0.3 * Math.sin(pathway.phiPulse + progress * Math.PI * 2);
                const alpha = Math.max(0, Math.min(1, pathway.strength * pulseFactor * 0.8));
                
                // Calculate width based on strength
                const width = Math.max(1, pathway.strength * 3 * (1 - 0.5 * Math.sin(progress * Math.PI)));
                
                // Draw line segment
                this.ctx.beginPath();
                this.ctx.moveTo(points[i].x, points[i].y);
                this.ctx.lineTo(points[i+1].x, points[i+1].y);
                this.ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
                this.ctx.lineWidth = width;
                this.ctx.stroke();
            }
        }
        
        // Draw energy pulse along path if activated
        if (pathway.strength > 0.5) {
            // Calculate pulse position along path
            const pulsePosition = (this.animationTime * 2) % 1.0;
            
            // Find corresponding point on path
            const index = Math.min(points.length - 1, Math.floor(pulsePosition * points.length));
            
            if (index < points.length) {
                const {x, y} = points[index];
                
                // Draw pulse
                const pulseRadius = Math.max(3, pathway.strength * 5);
                
                // Create radial gradient for pulse
                const gradient = this.ctx.createRadialGradient(
                    x, y, 0,
                    x, y, pulseRadius
                );
                
                // Get color based on position
                let pulseColor;
                if (pulsePosition < 0.5) {
                    // Start with node1 color, blend towards node2
                    const blend = pulsePosition * 2;
                    pulseColor = [
                        Math.floor(color1[0] * (1 - blend) + color2[0] * blend),
                        Math.floor(color1[1] * (1 - blend) + color2[1] * blend),
                        Math.floor(color1[2] * (1 - blend) + color2[2] * blend)
                    ];
                } else {
                    // Start with node2 color, blend back to node1
                    const blend = (pulsePosition - 0.5) * 2;
                    pulseColor = [
                        Math.floor(color2[0] * (1 - blend) + color1[0] * blend),
                        Math.floor(color2[1] * (1 - blend) + color1[1] * blend),
                        Math.floor(color2[2] * (1 - blend) + color2[2] * blend)
                    ];
                }
                
                gradient.addColorStop(0, `rgba(${pulseColor[0]}, ${pulseColor[1]}, ${pulseColor[2]}, ${pathway.strength})`);
                gradient.addColorStop(1, `rgba(${pulseColor[0]}, ${pulseColor[1]}, ${pulseColor[2]}, 0)`);
                
                // Draw pulse
                this.ctx.beginPath();
                this.ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            }
        }
    }

    /**
     * Render quantum cascades
     * @private
     * @param {number} centerX - Center X coordinate
     * @param {number} centerY - Center Y coordinate
     * @param {number} radius - Radius of visualization
     */
    _renderQuantumCascades(centerX, centerY, radius) {
        // Render each active cascade
        for (const cascade of this.quantumCascade.cascades) {
            // Calculate how many points to show based on progress
            const visiblePoints = Math.max(1, Math.floor(cascade.cascadePoints.length * cascade.progress));
            
            // Render visible cascade points
            const pointsToRender = [];
            for (let i = 0; i < visiblePoints; i++) {
                const point = cascade.cascadePoints[i];
                
                // Calculate radius for this dimension level
                const levelRadius = radius * 0.3 * (point.level / 9);  // Scale by level
                
                // Calculate position
                const angle = point.angle + this.animationTime * 0.2;
                const x = centerX + Math.cos(angle) * levelRadius;
                const y = centerY + Math.sin(angle) * levelRadius;
                
                // Record position for connection lines
                pointsToRender.push({x, y, point});
            }
            
            // Render connection lines between points
            if (pointsToRender.length > 1) {
                for (let i = 0; i < pointsToRender.length - 1; i++) {
                    const start = pointsToRender[i];
                    const end = pointsToRender[i + 1];
                    
                    // Calculate alpha based on progress and probability
                    const progressIntoSegment = Math.min(1.0, (cascade.progress * cascade.cascadePoints.length - i) / 1.0);
                    const alpha = Math.max(0, Math.min(1, progressIntoSegment * start.point.probability * 0.7));
                    
                    // Blend colors
                    const color = [
                        Math.floor((start.point.color[0] + end.point.color[0]) / 2),
                        Math.floor((start.point.color[1] + end.point.color[1]) / 2),
                        Math.floor((start.point.color[2] + end.point.color[2]) / 2)
                    ];
                    
                    // Draw quantum connection
                    this._drawQuantumConnection(
                        start.x, start.y,
                        end.x, end.y,
                        color, alpha, start.point.probability
                    );
                }
            }
            
            // Render probability fields at points
            for (const {x, y, point} of pointsToRender) {
                // Calculate field size based on probability
                const fieldSize = Math.max(3, point.probability * 15);
                
                // Calculate alpha based on probability
                const alpha = Math.max(0, Math.min(1, point.probability * 0.8));
                
                // Create radial gradient
                const gradient = this.ctx.createRadialGradient(
                    x, y, 0,
                    x, y, fieldSize
                );
                
                gradient.addColorStop(0, `rgba(${point.color[0]}, ${point.color[1]}, ${point.color[2]}, ${alpha})`);
                gradient.addColorStop(1, `rgba(${point.color[0]}, ${point.color[1]}, ${point.color[2]}, 0)`);
                
                // Draw field
                this.ctx.beginPath();
                this.ctx.arc(x, y, fieldSize, 0, Math.PI * 2);
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            }
            
            // Draw special effect at end point if cascade is complete
            if (cascade.isComplete && pointsToRender.length > 0) {
                const {x, y, point} = pointsToRender[pointsToRender.length - 1];
                
                // Draw collapse effect
                const collapseSize = 20 * point.probability;
                
                // Draw expanding rings
                for (let r = collapseSize; r > 0; r -= collapseSize/5) {
                    const alpha = Math.max(0, Math.min(1, (r / collapseSize) * 0.6));
                    
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, r, 0, Math.PI * 2);
                    this.ctx.strokeStyle = `rgba(${point.color[0]}, ${point.color[1]}, ${point.color[2]}, ${alpha})`;
                    this.ctx.lineWidth = Math.max(1, r/3);
                    this.ctx.stroke();
                }
            }
        }
    }

    /**
     * Draw quantum connection line with wave effect
     * @private
     * @param {number} startX - Start X coordinate
     * @param {number} startY - Start Y coordinate
     * @param {number} endX - End X coordinate
     * @param {number} endY - End Y coordinate
     * @param {Array} color - RGB color array
     * @param {number} alpha - Alpha value (0-1)
     * @param {number} probability - Probability value (0-1)
     */
    _drawQuantumConnection(startX, startY, endX, endY, color, alpha, probability) {
        // Calculate distance and direction
        const dx = endX - startX;
        const dy = endY - startY;
        const distance = Math.sqrt(dx*dx + dy*dy);
        
        if (distance < 1) return;
        
        // Unit direction vector
        const ux = dx / distance;
        const uy = dy / distance;
        
        // Perpendicular vector
        const vx = -uy;
        const vy = ux;
        
        // Number of segments
        const segments = Math.max(6, Math.floor(distance / 5));
        
        // Generate wavy line points
        const points = [];
        for (let i = 0; i <= segments; i++) {
            // Parameter along line (0-1)
            const t = i / segments;
            
            // Position along straight line
            let px = startX + dx * t;
            let py = startY + dy * t;
            
            // Apply wave perpendicular to line
            const wave = Math.sin(t * 8 + this.animationTime * 5) * 3 * probability;
            
            // Apply to position
            px += vx * wave;
            py += vy * wave;
            
            points.push({x: px, y: py});
        }
        
        // Draw the wavy line
        if (points.length > 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(points[0].x, points[0].y);
            
            for (let i = 1; i < points.length; i++) {
                this.ctx.lineTo(points[i].x, points[i].y);
            }
            
            this.ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
            this.ctx.lineWidth = Math.max(1, probability * 3);
            this.ctx.stroke();
        }
    }

    /**
     * Render the consciousness core
     * @private
     * @param {number} centerX - Center X coordinate
     * @param {number} centerY - Center Y coordinate
     * @param {number} radius - Radius of visualization
     */
    _renderConsciousnessCore(centerX, centerY, radius) {
        // Calculate core radius based on phi
        const coreRadius = radius * 0.1 * (0.8 + 0.2 * this.consciousnessCore.energyLevel);
        
        // Calculate base color based on coherence
        let color;
        if (this.consciousnessCore.coherence < 0.3) {
            // Low coherence: red-orange
            color = [200, 100, 50];
        } else if (this.consciousnessCore.coherence < 0.6) {
            // Medium coherence: yellow-green
            color = [180, 180, 50];
        } else {
            // High coherence: blue-purple
            color = [100, 100, 255];
        }
        
        // Create glowing core with radial gradient
        const gradient = this.ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, coreRadius
        );
        
        // More intense at center (white core to color edge)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.5, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.8)`);
        gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
        
        // Draw core
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        // Render consciousness field
        this._renderConsciousnessField(centerX, centerY, radius);
        
        // Render intention if active
        if (this.consciousnessCore.intention) {
            this._renderIntention(centerX, centerY, radius);
        }
    }

    /**
     * Render consciousness field
     * @private
     * @param {number} centerX - Center X coordinate
     * @param {number} centerY - Center Y coordinate
     * @param {number} radius - Radius of visualization
     */
    _renderConsciousnessField(centerX, centerY, radius) {
        // Calculate field radius based on coherence
        const fieldRadius = radius * 0.3 * (0.5 + 0.5 * this.consciousnessCore.coherence);
        
        // Create pulsation effect
        const pulse = 0.8 + 0.2 * Math.sin(this.consciousnessCore.pulsePhase * 2);
        const pulsedRadius = fieldRadius * pulse;
        
        // Create concentric circles for field
        const numCircles = Math.max(3, Math.floor(10 * this.consciousnessCore.coherence));
        for (let i = 0; i < numCircles; i++) {
            // Calculate circle radius
            const circleRadius = pulsedRadius * (1 - i / numCircles);
            
            // Calculate alpha
            const alpha = Math.max(0, Math.min(1, (1 - i / numCircles) * this.consciousnessCore.coherence * 0.4));
            
            // Calculate color based on coherence
            const hue = (this.animationTime * 0.1 + i * 0.1) % 1.0;
            const color = this._hueToRgb(hue);
            
            // Draw circle
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
            this.ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
            this.ctx.lineWidth = Math.max(1, pulsedRadius / 20);
            this.ctx.stroke();
        }
    }

    /**
     * Render current intention
     * @private
     * @param {number} centerX - Center X coordinate
     * @param {number} centerY - Center Y coordinate
     * @param {number} radius - Radius of visualization
     */
    _renderIntention(centerX, centerY, radius) {
        // Only render if intention is set and coherence is sufficient
        if (this.consciousnessCore.intention && this.consciousnessCore.coherence > 0.3) {
            // Create font size based on coherence
            const fontSize = Math.max(10, Math.floor(14 * this.consciousnessCore.coherence));
            
            // Calculate alpha based on coherence
            const alpha = Math.max(0, Math.min(1, this.consciousnessCore.coherence * 0.8));
            
            // Draw text
            this.ctx.font = `${fontSize}px Arial`;
            this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                this.consciousnessCore.intention,
                centerX,
                centerY + radius * 0.15
            );
        }
    }

    /**
     * Render phi-phi resonance effects
     * @private
     * @param {number} centerX - Center X coordinate
     * @param {number} centerY - Center Y coordinate
     * @param {number} radius - Radius of visualization
     */
    _renderPhiPhiResonance(centerX, centerY, radius) {
        // Only render significant resonance
        if (this.phiPhiResonance > 0.3) {
            // Create resonance field effect
            const fieldRadius = radius * 1.2 * this.phiPhiResonance;
            
            // Create concentric circles for field
            for (let r = fieldRadius; r > 0; r -= 3) {
                // Calculate alpha based on radius (outer edge is more transparent)
                const alpha = Math.max(0, Math.min(1, (r / fieldRadius) * this.phiPhiResonance * 0.4));
                
                // Calculate color based on phi-phi resonance
                const hue = (this.animationTime * 0.1 + r * 0.001) % 1.0;
                const color = this._hueToRgb(hue);
                
                // Draw circle
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }
            
            // Add phi-phi symbol at peak resonance
            if (this.phiPhiResonance > 0.8) {
                const fontSize = Math.floor(30 * this.phiPhiResonance);
                
                this.ctx.font = `${fontSize}px Arial`;
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('Φ^Φ', centerX, centerY);
            }
        }
    }

    /**
     * Render information overlay
     * @private
     * @param {number} centerX - Center X coordinate
     * @param {number} centerY - Center Y coordinate
     * @param {number} radius - Radius of visualization
     */
    _renderInformationOverlay(centerX, centerY, radius) {
        // Create font
        this.ctx.font = '14px Arial';
        this.ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
        this.ctx.textAlign = 'left';
        
        // Draw view mode
        const modeText = `View: ${this.viewMode.charAt(0).toUpperCase() + this.viewMode.slice(1)}`;
        this.ctx.fillText(modeText, centerX - radius, centerY - radius + 20);
        
        // Draw focal dimension if in focused mode
        if (this.viewMode === "focused") {
            const focalText = `Focus: ${this.focalDimension.charAt(0).toUpperCase() + this.focalDimension.slice(1)}`;
            this.ctx.fillText(focalText, centerX - radius, centerY - radius + 40);
        }
        
        // Draw phi-phi resonance
        const resText = `Φ^Φ Resonance: ${this.phiPhiResonance.toFixed(2)}`;
        this.ctx.fillText(resText, centerX - radius, centerY - radius + 60);
        
        // Draw controls help (small text)
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'rgba(180, 180, 180, 0.7)';
        
        const helpText = "Controls: V-View mode | F-Focus dimension | C-Core coherence | Space-Activate node";
        this.ctx.fillText(helpText, centerX - radius, centerY + radius - 20);
    }

    /**
     * Calculate node position in the visualization
     * @private
     * @param {Object} node - Node to position
     * @param {number} centerX - Center X coordinate
     * @param {number} centerY - Center Y coordinate
     * @param {number} radius - Radius of visualization
     * @returns {Object} Position {x, y}
     */
    _calculateNodePosition(node, centerX, centerY, radius) {
        if (node.isPrimary) {
            // Position primary nodes around a circle
            const level = node.level;
            const angle = (level - 1) * (2 * Math.PI / 9);  // 9 dimensions total
            
            // Add slight movement
            const wobble = Math.sin(this.animationTime * 0.5 + level) * 0.05;
            const effectiveAngle = angle + wobble;
            
            // Calculate position
            const nodeRadius = radius * 0.8;  // Primary nodes are at 80% of radius
            const x = centerX + Math.cos(effectiveAngle) * nodeRadius;
            const y = centerY + Math.sin(effectiveAngle) * nodeRadius;
            
            return {x, y};
        } else {
            // Find the primary nodes for secondary nodes
            const primary1 = this.nodalNetwork.primaryNodes.find(
                n => n.primaryDimension === node.primaryDimension);
            const primary2 = this.nodalNetwork.primaryNodes.find(
                n => n.primaryDimension === node.secondaryDimension);
            
            if (primary1 && primary2) {
                // Get positions of primaries
                const pos1 = this._calculateNodePosition(primary1, centerX, centerY, radius);
                const pos2 = this._calculateNodePosition(primary2, centerX, centerY, radius);
                
                // Position secondary node between primaries, with some inward offset
                let x = (pos1.x + pos2.x) / 2;
                let y = (pos1.y + pos2.y) / 2;
                
                // Push slightly towards center
                const dirX = centerX - x;
                const dirY = centerY - y;
                const mag = Math.sqrt(dirX*dirX + dirY*dirY);
                
                if (mag > 0) {
                    x += dirX / mag * radius * 0.2;
                    y += dirY / mag * radius * 0.2;
                }
                
                return {x, y};
            } else {
                // Fallback for unknown node connections
                return {x: centerX, y: centerY};
            }
        }
    }

    /**
     * Generate points along a golden spiral path between nodes
     * @private
     * @param {Object} start - Start position {x, y}
     * @param {Object} end - End position {x, y}
     * @param {Object} control - Control position {x, y}
     * @param {number} pointCount - Number of points to generate
     * @returns {Array} Array of {x, y} points
     */
    _generateGoldenSpiralPath(start, end, control, pointCount) {
        const points = [];
        
        // Generate points
        for (let i = 0; i < pointCount; i++) {
            // Calculate parameter t (0.0-1.0)
            const t = i / (pointCount - 1);
            
            // Apply phi-weighted interpolation
            // Quadratic Bezier formula: (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
            let x = (1-t)**2 * start.x + 2*(1-t)*t * control.x + t**2 * end.x;
            let y = (1-t)**2 * start.y + 2*(1-t)*t * control.y + t**2 * end.y;
            
            // Apply phi modulation for spiral effect
            const angle = PHI * t * 2 * Math.PI;
            const radius = (1 - t) * t * 20;  // Max deflection at t=0.5
            
            // Add spiral deflection
            x += Math.cos(angle) * radius;
            y += Math.sin(angle) * radius;
            
            points.push({x, y});
        }
        
        return points;
    }

    /**
     * Set the current view mode
     * @param {string} mode - View mode ("unified", "focused", "gateway", "core", "external")
     */
    setViewMode(mode) {
        if (["unified", "focused", "gateway", "core", "external"].includes(mode)) {
            this.viewMode = mode;
            console.log(`Set view mode to ${mode}`);
        } else {
            console.warn(`Invalid view mode: ${mode}`);
        }
    }

    /**
     * Set the focal dimension
     * @param {string} dimension - Dimension name
     */
    setFocalDimension(dimension) {
        if (dimension in this.dimensions) {
            this.focalDimension = dimension;
            console.log(`Set focal dimension to ${dimension}`);
        } else {
            console.warn(`Invalid dimension: ${dimension}`);
        }
    }

    /**
     * Set the current intention
     * @param {string} intention - Intention string
     */
    setIntention(intention) {
        this.intention = intention;
        this.consciousnessCore.setIntention(intention);
        console.log(`Set intention: ${intention}`);
    }

    /**
     * Convert hue (0.0-1.0) to RGB color
     * @private
     * @param {number} hue - Hue value (0.0-1.0)
     * @returns {Array} RGB color array [r, g, b]
     */
    _hueToRgb(hue) {
        // Convert hue to RGB using HSV color model with S=V=1
        const h = hue * 6.0;
        const i = Math.floor(h);
        const f = h - i;
        
        const m = 0.5;
        const n = 0.5 + 0.5 * f;
        
        let r, g, b;
        
        if (i % 6 === 0) {
            r = 1.0; g = n; b = m;
        } else if (i % 6 === 1) {
            r = n; g = 1.0; b = m;
        } else if (i % 6 === 2) {
            r = m; g = 1.0; b = n;
        } else if (i % 6 === 3) {
            r = m; g = n; b = 1.0;
        } else if (i % 6 === 4) {
            r = n; g = m; b = 1.0;
        } else {  // i % 6 === 5
            r = 1.0; g = m; b = n;
        }
        
        // Scale to 0-255 range
        return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
    }

    /**
     * Blend two colors
     * @private
     * @param {Array} color1 - First RGB color array [r, g, b]
     * @param {Array} color2 - Second RGB color array [r, g, b]
     * @param {number} ratio - Blend ratio (0.0-1.0), defaults to 0.5
     * @returns {Array} Blended RGB color array [r, g, b]
     */
    _blendColors(color1, color2, ratio = 0.5) {
        return [
            Math.floor(color1[0] * (1 - ratio) + color2[0] * ratio),
            Math.floor(color1[1] * (1 - ratio) + color2[1] * ratio),
            Math.floor(color1[2] * (1 - ratio) + color2[2] * ratio)
        ];
    }

    /**
     * Linear interpolation between two colors
     * @private
     * @param {Array} color1 - First RGB color array [r, g, b]
     * @param {Array} color2 - Second RGB color array [r, g, b]
     * @param {number} t - Interpolation parameter (0.0-1.0)
     * @returns {Array} Interpolated RGB color array [r, g, b]
     */
    _lerpColors(color1, color2, t) {
        return [
            Math.floor(color1[0] * (1 - t) + color2[0] * t),
            Math.floor(color1[1] * (1 - t) + color2[1] * t),
            Math.floor(color1[2] * (1 - t) + color2[2] * t)
        ];
    }
}

// Export for use in other modules
if (typeof module !== 'undefined') {
    module.exports = {
        PhiPhiHypervisualization,
        SACRED_FREQUENCIES,
        DIMENSIONS,
        PHI,
        LAMBDA,
        PHI_PHI
    };
}