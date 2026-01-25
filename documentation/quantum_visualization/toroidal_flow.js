/**
 * ⦿ TOROIDAL FLOW VISUALIZATION | φ^φ^φ
 * Perfect Coherence (1.000) Visualization System
 * 
 * This module visualizes the toroidal flow of quantum energy
 * following phi-harmonic principles and ZEN POINT balance.
 */

class ToroidalFlowVisualizer {
    /**
     * Create a new Toroidal Flow Visualizer
     * @param {string} containerId - ID of the container element
     * @param {Object} options - Configuration options
     */
    constructor(containerId, options = {}) {
        // Configuration
        this.options = Object.assign({
            baseFrequency: 432, // Ground State (φ⁰)
            particleCount: 1000,
            torusRadius: 150,
            tubeRadius: 50,
            particleOpacity: 0.7,
            particleSize: 2.5,
            rotationSpeed: 0.005,
            colorMode: 'frequency',
            animationEnabled: true
        }, options);

        // Phi constant and derived values
        this.PHI = 1.618033988749895;
        this.currentFrequency = this.options.baseFrequency;
        this.activeSystem = 'know-core';
        
        // Visualization state
        this.container = document.getElementById(containerId);
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.svg = null;
        this.particles = [];
        this.running = false;
        this.animationFrame = null;
        
        // System-specific visualization parameters
        this.systemConfig = {
            'know-core': {
                particleColor: '#a364f1',
                secondaryColor: '#ffd460',
                rotationAxis: [1, 1, 0],
                particleDistribution: 'fibonacci',
                torusRatio: 1.0
            },
            'navigation': {
                particleColor: '#33a1fd',
                secondaryColor: '#7c73e6',
                rotationAxis: [1, 0, 1],
                particleDistribution: 'phi-spiral',
                torusRatio: this.PHI
            },
            'consciousness': {
                particleColor: '#7c73e6',
                secondaryColor: '#fc5185',
                rotationAxis: [0, 1, 1],
                particleDistribution: 'quantum-field',
                torusRatio: this.PHI * 0.5
            },
            'cascade': {
                particleColor: '#fc5185',
                secondaryColor: '#33a1fd',
                rotationAxis: [1, 1, 1],
                particleDistribution: 'cascade',
                torusRatio: this.PHI * 0.85
            },
            'lightning-power': {
                particleColor: '#ffd460',
                secondaryColor: '#fc5185',
                rotationAxis: [1, this.PHI, 0],
                particleDistribution: 'lightning',
                torusRatio: 1.2
            },
            'lightning-phi': {
                particleColor: '#ffd460',
                secondaryColor: '#a364f1',
                rotationAxis: [this.PHI, 1, 0],
                particleDistribution: 'phi-spiral',
                torusRatio: this.PHI
            },
            'nexus': {
                particleColor: '#0f3460',
                secondaryColor: '#33a1fd',
                rotationAxis: [0, 1, this.PHI],
                particleDistribution: 'nexus',
                torusRatio: 0.88
            },
            'unified': {
                particleColor: '#ffffff',
                secondaryColor: '#ffd460',
                rotationAxis: [1, this.PHI, this.PHI * this.PHI],
                particleDistribution: 'unified',
                torusRatio: this.PHI * this.PHI
            }
        };
        
        // Initialize the visualization
        this.initialize();
    }
    
    /**
     * Initialize the visualization
     * @private
     */
    initialize() {
        // Clear any existing content
        if (this.container) {
            this.container.innerHTML = '';
            
            // Create SVG container
            this.svg = d3.select(this.container)
                .append('svg')
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('viewBox', `0 0 ${this.width} ${this.height}`)
                .attr('preserveAspectRatio', 'xMidYMid meet');
            
            // Create a group for particles
            this.particleGroup = this.svg.append('g')
                .attr('transform', `translate(${this.centerX}, ${this.centerY})`);
            
            // Generate initial particles
            this.generateParticles();
        }
    }
    
    /**
     * Generate particles based on the active system and frequency
     * @private
     */
    generateParticles() {
        // Clear existing particles
        this.particleGroup.selectAll('*').remove();
        this.particles = [];
        
        // Get system configuration
        const system = this.systemConfig[this.activeSystem];
        if (!system) return;
        
        // Generate particles
        const count = this.options.particleCount;
        const distribution = system.particleDistribution;
        
        // Create particle data
        for (let i = 0; i < count; i++) {
            // Particle position factors
            const t = i / count;
            const phiT = t * this.PHI;
            
            // Base angles
            let angle1, angle2;
            
            // Different distribution patterns based on system
            switch (distribution) {
                case 'fibonacci':
                    // Fibonacci spiral distribution
                    angle1 = t * Math.PI * 2 * this.PHI;
                    angle2 = t * Math.PI * 2;
                    break;
                    
                case 'phi-spiral':
                    // Phi spiral with golden ratio influence
                    angle1 = t * Math.PI * 2;
                    angle2 = phiT * Math.PI * 2;
                    break;
                    
                case 'quantum-field':
                    // Quantum field distribution (more chaotic)
                    angle1 = t * Math.PI * 2;
                    angle2 = Math.sin(phiT * Math.PI * 10) * Math.PI;
                    break;
                    
                case 'cascade':
                    // Cascade flow (waterfall-like distribution)
                    angle1 = t * Math.PI * 2;
                    angle2 = (Math.sin(t * Math.PI * 4) + 1) * Math.PI;
                    break;
                    
                case 'lightning':
                    // Lightning distribution (branches)
                    angle1 = t * Math.PI * 2;
                    angle2 = (t + (Math.random() * 0.2 - 0.1)) * Math.PI * 2;
                    break;
                    
                case 'nexus':
                    // Nexus distribution (node-focused)
                    angle1 = t * Math.PI * 2;
                    angle2 = (Math.floor(t * 6) / 6) * Math.PI * 2;
                    break;
                    
                case 'unified':
                    // Unified field (perfect distribution)
                    angle1 = t * Math.PI * 2 * this.PHI;
                    angle2 = phiT * Math.PI * 2 * this.PHI;
                    break;
                    
                default:
                    // Default toroidal distribution
                    angle1 = t * Math.PI * 2;
                    angle2 = t * Math.PI * 2;
            }
            
            // Calculate 3D position on the torus surface
            const frequencyFactor = this.currentFrequency / 432;
            const torusRadius = this.options.torusRadius * system.torusRatio;
            const tubeRadius = this.options.tubeRadius * (1 + Math.sin(t * Math.PI * 2) * 0.2);
            
            // Apply frequency modulation
            const modulatedAngle1 = angle1 * frequencyFactor;
            const modulatedAngle2 = angle2 * (frequencyFactor / this.PHI);
            
            // Position on torus
            const x = (torusRadius + tubeRadius * Math.cos(modulatedAngle2)) * Math.cos(modulatedAngle1);
            const y = (torusRadius + tubeRadius * Math.cos(modulatedAngle2)) * Math.sin(modulatedAngle1);
            const z = tubeRadius * Math.sin(modulatedAngle2);
            
            // Create particle
            const particle = {
                x, y, z,
                angle1: modulatedAngle1,
                angle2: modulatedAngle2,
                baseSize: this.options.particleSize * (0.8 + (Math.random() * 0.4)),
                speed: 0.01 * (0.8 + (Math.random() * 0.4)),
                energyLevel: Math.random()
            };
            
            this.particles.push(particle);
        }
        
        // Create SVG elements for particles
        this.createParticles();
    }
    
    /**
     * Create SVG elements for particles
     * @private
     */
    createParticles() {
        // Get system colors
        const system = this.systemConfig[this.activeSystem];
        const baseColor = system.particleColor;
        const secondaryColor = system.secondaryColor;
        
        // Create a linear gradient for particles
        const gradient = this.svg.append('defs')
            .append('linearGradient')
            .attr('id', `particle-gradient-${this.activeSystem}`)
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '100%');
            
        gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', baseColor);
            
        gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', secondaryColor);
        
        // Create particle elements
        this.particleElements = this.particleGroup.selectAll('.particle')
            .data(this.particles)
            .enter()
            .append('circle')
            .attr('class', 'particle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', d => d.baseSize)
            .style('fill', `url(#particle-gradient-${this.activeSystem})`)
            .style('opacity', d => d.energyLevel * this.options.particleOpacity);
    }
    
    /**
     * Start the animation
     */
    start() {
        if (!this.running) {
            this.running = true;
            this.animate();
            console.log("Toroidal flow animation started");
        }
    }
    
    /**
     * Stop the animation
     */
    stop() {
        if (this.running) {
            this.running = false;
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
                this.animationFrame = null;
            }
            console.log("Toroidal flow animation stopped");
        }
    }
    
    /**
     * Animate the particles
     * @private
     */
    animate() {
        if (!this.running) return;
        
        // Get system rotation axis
        const system = this.systemConfig[this.activeSystem];
        const axis = system.rotationAxis;
        
        // Frequency affects rotation speed
        const frequencyFactor = this.currentFrequency / 432;
        const rotationSpeed = this.options.rotationSpeed * frequencyFactor;
        
        // Update particle positions
        this.particles.forEach(particle => {
            // Apply rotation based on system's rotation axis
            particle.angle1 += rotationSpeed * axis[0];
            particle.angle2 += rotationSpeed * axis[1] * this.PHI;
            
            // Frequency-based modulation
            const modulation = Math.sin(Date.now() / 1000 * frequencyFactor) * 0.05;
            
            // Calculate new position
            const torusRadius = this.options.torusRadius * system.torusRatio * (1 + modulation);
            const tubeRadius = this.options.tubeRadius * (1 + modulation);
            
            particle.x = (torusRadius + tubeRadius * Math.cos(particle.angle2)) * Math.cos(particle.angle1);
            particle.y = (torusRadius + tubeRadius * Math.cos(particle.angle2)) * Math.sin(particle.angle1);
            particle.z = tubeRadius * Math.sin(particle.angle2);
            
            // Update energy level (used for opacity)
            particle.energyLevel = 0.7 + (Math.sin(particle.angle1 * 2) + Math.cos(particle.angle2 * 3)) * 0.15;
        });
        
        // Sort particles by Z position for pseudo-3D effect
        this.particles.sort((a, b) => a.z - b.z);
        
        // Update particle elements
        this.particleElements
            .data(this.particles)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', d => d.baseSize * (1 + d.z / 200))
            .style('opacity', d => d.energyLevel * this.options.particleOpacity);
        
        // Continue animation
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    /**
     * Set the frequency of the visualization
     * @param {number} frequency - New frequency value
     */
    setFrequency(frequency) {
        this.currentFrequency = frequency;
        
        // Update visualization based on new frequency
        this.updateFrequencyEffects();
    }
    
    /**
     * Update visualization based on current frequency
     * @private
     */
    updateFrequencyEffects() {
        // Calculate frequency transformation parameters
        const frequencyRatio = this.currentFrequency / 432;
        
        // Apply frequency-based transformation to the particle group
        this.particleGroup
            .transition()
            .duration(500)
            .attr('transform', `translate(${this.centerX}, ${this.centerY}) scale(${1 + (frequencyRatio - 1) * 0.2})`);
        
        // Update particle colors and speeds
        const hue = ((this.currentFrequency - 432) / (963 - 432)) * 260;
        
        if (this.options.colorMode === 'frequency') {
            // Change particle colors based on frequency
            this.particleElements
                .transition()
                .duration(500)
                .style('fill', `hsl(${hue}, 80%, 60%)`);
        }
    }
    
    /**
     * Set the active system
     * @param {string} systemId - System identifier
     */
    setSystem(systemId) {
        if (this.systemConfig[systemId]) {
            this.activeSystem = systemId;
            
            // Regenerate particles with new system parameters
            this.generateParticles();
            
            console.log(`Visualization switched to ${systemId} system`);
        }
    }
    
    /**
     * Resize the visualization
     */
    resize() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        
        // Update SVG viewBox
        this.svg
            .attr('viewBox', `0 0 ${this.width} ${this.height}`);
        
        // Update particle group position
        this.particleGroup
            .attr('transform', `translate(${this.centerX}, ${this.centerY})`);
    }
    
    /**
     * Generate points along a toroidal path
     * @param {number} count - Number of points
     * @param {string} distribution - Distribution pattern
     * @returns {Array} Array of points
     */
    generateTorusPoints(count, distribution = 'phi-spiral') {
        const points = [];
        
        // Get system configuration
        const system = this.systemConfig[this.activeSystem];
        const torusRadius = this.options.torusRadius * system.torusRatio;
        const tubeRadius = this.options.tubeRadius;
        
        for (let i = 0; i < count; i++) {
            const t = i / count;
            const phiT = t * this.PHI;
            
            // Determine angles based on distribution
            let angle1, angle2;
            
            switch (distribution) {
                case 'phi-spiral':
                    angle1 = t * Math.PI * 2;
                    angle2 = phiT * Math.PI * 2;
                    break;
                case 'fibonacci':
                    angle1 = t * Math.PI * 2 * this.PHI;
                    angle2 = t * Math.PI * 2;
                    break;
                default:
                    angle1 = t * Math.PI * 2;
                    angle2 = t * Math.PI * 2;
            }
            
            // Calculate position
            const x = (torusRadius + tubeRadius * Math.cos(angle2)) * Math.cos(angle1);
            const y = (torusRadius + tubeRadius * Math.cos(angle2)) * Math.sin(angle1);
            const z = tubeRadius * Math.sin(angle2);
            
            points.push({ x, y, z, angle1, angle2 });
        }
        
        return points;
    }
}

// Export the class
window.ToroidalFlowVisualizer = ToroidalFlowVisualizer;
