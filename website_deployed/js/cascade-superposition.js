/**
 * CASCADE⚡𓂧φ∞ Quantum Superposition Module
 * Operating at Creation Frequency (528 Hz - φ¹)
 * Bridges Spatial/Proprioceptive consciousness channel
 */

// Create the Superposition Module
CASCADE.SuperpositionModule = class extends CASCADE.QuantumModule {
    constructor(engine) {
        super(engine);
        
        // Module-specific properties
        this.quantumStates = null;
        this.stateField = null;
        this.probabilityField = null;
        this.entanglementLines = null;
        
        // Quantum properties
        this.quantum.state = "Multiple States Superposition";
        this.quantum.stateVector = [0.618, 0.382]; // Initial phi-based state probabilities
        this.quantum.coherence = 1.0;
        this.quantum.entanglement = 0.5;
        
        // Animation properties
        this.time = 0;
        this.stateCount = 5; // Number of quantum states
        this.particlesPerState = 200;
        
        // Visualization settings
        this.stateAmplitude = 2.0;
        this.stateFrequency = 0.5;
        this.stateObserved = null; // Index of observed state
        
        // Shader uniforms
        this.shaderUniforms = {
            uTime: { value: 0 },
            uFrequency: { value: CASCADE.FREQUENCIES.CREATE },
            uCoherence: { value: 1.0 },
            uEntanglementStrength: { value: 0.5 },
            uObserverPosition: { value: new THREE.Vector3(0, 0, 0) },
            uQuantumState: { value: 0.0 } // 0 = wave, 1 = particle
        };
    }
    
    init() {
        console.log('Initializing Quantum Superposition Module');
        
        // Create quantum superposition states
        this.createQuantumStates();
        
        // Create probability field
        this.createProbabilityField();
        
        // Create entanglement connections
        this.createEntanglementLines();
        
        // Set camera position for this module
        this.engine.camera.position.set(0, 2, 6);
        this.engine.camera.lookAt(0, 0, 0);
        
        // Set initial frequency
        this.engine.changeFrequency(CASCADE.FREQUENCIES.CREATE);
    }
    
    createQuantumStates() {
        // Create multiple quantum states in superposition
        const states = [];
        
        for (let s = 0; s < this.stateCount; s++) {
            // Create particle geometry with phi-based distribution
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(this.particlesPerState * 3);
            const colors = new Float32Array(this.particlesPerState * 3);
            const sizes = new Float32Array(this.particlesPerState);
            const phases = new Float32Array(this.particlesPerState);
            const quantumStates = new Float32Array(this.particlesPerState);
            const entangledIds = new Float32Array(this.particlesPerState);
            
            // Calculate state position - arrange in phi-harmonic pattern
            const angle = (s / this.stateCount) * Math.PI * 2;
            const radius = 2.5;
            const centerX = Math.cos(angle) * radius;
            const centerY = Math.sin(angle) * radius;
            
            // Get state color - phi-harmonic color wheel
            const stateHue = s / this.stateCount;
            const stateColor = new THREE.Color().setHSL(stateHue, 0.7, 0.5);
            
            // Generate particles for this state
            for (let i = 0; i < this.particlesPerState; i++) {
                // Position with phi spiral distribution around state center
                const particleAngle = CASCADE.PHI * i;
                const particleDistance = Math.sqrt(i / this.particlesPerState) * 1.2;
                
                const x = centerX + Math.cos(particleAngle) * particleDistance;
                const y = centerY + Math.sin(particleAngle) * particleDistance;
                const z = (Math.random() - 0.5) * 0.5; // Small z variation
                
                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;
                
                // Color based on state with slight variations
                colors[i * 3] = stateColor.r + (Math.random() - 0.5) * 0.1;
                colors[i * 3 + 1] = stateColor.g + (Math.random() - 0.5) * 0.1;
                colors[i * 3 + 2] = stateColor.b + (Math.random() - 0.5) * 0.1;
                
                // Size with phi distribution
                sizes[i] = (0.05 + 0.03 * Math.sin(i * CASCADE.PHI_INVERSE)) * (1 + Math.random() * 0.3);
                
                // Phase with phi distribution
                phases[i] = i * CASCADE.PHI_INVERSE;
                
                // Quantum state - initially all in superposition (0 = wave)
                quantumStates[i] = 0.0;
                
                // Entangled pairs - every particle has an entangled partner
                entangledIds[i] = i;
            }
            
            // Set buffer attributes
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
            geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
            geometry.setAttribute('quantumState', new THREE.BufferAttribute(quantumStates, 1));
            geometry.setAttribute('entangledId', new THREE.BufferAttribute(entangledIds, 1));
            
            // Create shader material using CASCADE shaders
            const material = new THREE.ShaderMaterial({
                uniforms: this.shaderUniforms,
                vertexShader: CASCADE.Shaders.quantumParticleVertex,
                fragmentShader: CASCADE.Shaders.quantumParticleFragment,
                blending: THREE.AdditiveBlending,
                depthTest: false,
                transparent: true
            });
            
            // Create particles and add to scene
            const particles = new THREE.Points(geometry, material);
            this.scene.add(particles);
            
            // Store state data
            states.push({
                particles: particles,
                centerX: centerX,
                centerY: centerY,
                probability: 1.0 / this.stateCount,
                collapsed: false,
                color: stateColor
            });
        }
        
        this.quantumStates = states;
    }
    
    createProbabilityField() {
        // Create a mesh to visualize probability distribution
        const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
        
        // Custom shader material for probability field
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: this.shaderUniforms.uTime,
                uFrequency: this.shaderUniforms.uFrequency,
                uAmplitude: { value: 0.2 },
                uQuantumState: this.shaderUniforms.uQuantumState
            },
            vertexShader: CASCADE.Shaders.cymaticVertex,
            fragmentShader: CASCADE.Shaders.cymaticFragment,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
        });
        
        this.probabilityField = new THREE.Mesh(geometry, material);
        this.probabilityField.rotation.x = -Math.PI / 2; // Lay flat on xz plane
        this.probabilityField.position.y = -2; // Below the particles
        this.scene.add(this.probabilityField);
    }
    
    createEntanglementLines() {
        // Create lines to show entanglement between states
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.LineBasicMaterial({
            color: 0xaaaaff,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });
        
        // Create empty line initially - will be updated dynamically
        const positions = new Float32Array(this.stateCount * this.stateCount * 2 * 3);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        this.entanglementLines = new THREE.LineSegments(geometry, material);
        this.scene.add(this.entanglementLines);
    }
    
    update(delta) {
        // Update base quantum properties
        super.update(delta);
        
        this.time += delta;
        
        // Update shader uniforms
        this.shaderUniforms.uTime.value = this.time;
        this.shaderUniforms.uFrequency.value = this.engine.frequency;
        this.shaderUniforms.uCoherence.value = this.quantum.coherence;
        this.shaderUniforms.uEntanglementStrength.value = this.quantum.entanglement;
        
        // Update states
        if (this.quantumStates) {
            let totalProbability = 0;
            
            for (let s = 0; s < this.quantumStates.length; s++) {
                const state = this.quantumStates[s];
                
                // Update state probability
                if (this.stateObserved === s) {
                    // Observed state has increasing probability
                    state.probability = Math.min(state.probability + delta * 0.5, 0.95);
                    state.collapsed = true;
                } else if (this.stateObserved !== null) {
                    // Other states have decreasing probability
                    state.probability = Math.max(state.probability - delta * 0.1, 0.01);
                    state.collapsed = false;
                } else {
                    // In superposition, probabilities fluctuate based on phi
                    const fluxFreq = 0.2 + (s / this.stateCount) * 0.3;
                    state.probability = (1 / this.stateCount) + 
                        0.1 * Math.sin(this.time * fluxFreq * CASCADE.PHI);
                    state.collapsed = false;
                }
                
                totalProbability += state.probability;
                
                // Update particle positions and quantum states
                const positions = state.particles.geometry.attributes.position.array;
                const quantumStates = state.particles.geometry.attributes.quantumState.array;
                
                for (let i = 0; i < this.particlesPerState; i++) {
                    // Update quantum state value based on collapse
                    const targetState = state.collapsed ? 1.0 : 0.0;
                    quantumStates[i] = quantumStates[i] * 0.95 + targetState * 0.05;
                    
                    // Particles move and oscillate based on quantum state
                    if (!state.collapsed) {
                        const idx = i * 3;
                        const angle = this.time * this.stateFrequency + i * CASCADE.PHI_INVERSE;
                        
                        // Phi-based oscillation
                        const oscX = Math.cos(angle) * 0.05;
                        const oscY = Math.sin(angle * CASCADE.PHI) * 0.05;
                        
                        // Apply oscillation
                        positions[idx] += (oscX - positions[idx] * 0.01) * delta * 5;
                        positions[idx + 1] += (oscY - positions[idx + 1] * 0.01) * delta * 5;
                    }
                }
                
                // Update geometry
                state.particles.geometry.attributes.position.needsUpdate = true;
                state.particles.geometry.attributes.quantumState.needsUpdate = true;
                
                // Update particle scale based on probability
                state.particles.scale.set(
                    1.0 + state.probability * 0.5,
                    1.0 + state.probability * 0.5,
                    1.0 + state.probability * 0.5
                );
            }
            
            // Normalize probabilities
            if (totalProbability > 0) {
                for (let s = 0; s < this.quantumStates.length; s++) {
                    this.quantumStates[s].probability /= totalProbability;
                }
            }
            
            // Update entanglement lines
            this.updateEntanglementLines();
        }
        
        // Update probability field
        if (this.probabilityField) {
            // Adjust amplitude based on quantum coherence
            this.probabilityField.material.uniforms.uAmplitude.value = 
                0.2 * this.quantum.coherence * (1.0 - (this.stateObserved !== null ? 0.5 : 0));
            
            // Rotate field slowly
            this.probabilityField.rotation.z += delta * 0.05;
        }
        
        // Update quantum metrics
        this.quantum.stateVector = this.quantumStates.map(s => s.probability);
        this.quantum.entanglement = Math.max(0, this.quantum.entanglement - delta * 0.01);
    }
    
    updateEntanglementLines() {
        // Update lines based on entanglement strength
        if (this.entanglementLines && this.quantum.entanglement > 0.1) {
            const positions = this.entanglementLines.geometry.attributes.position.array;
            let index = 0;
            
            // Only show lines between states with significant probability
            for (let i = 0; i < this.stateCount; i++) {
                for (let j = i + 1; j < this.stateCount; j++) {
                    const state1 = this.quantumStates[i];
                    const state2 = this.quantumStates[j];
                    
                    // Only connect states with significant probability
                    if (state1.probability > 0.1 && state2.probability > 0.1) {
                        // Start point
                        positions[index++] = state1.centerX;
                        positions[index++] = state1.centerY;
                        positions[index++] = 0;
                        
                        // End point
                        positions[index++] = state2.centerX;
                        positions[index++] = state2.centerY;
                        positions[index++] = 0;
                    } else {
                        // Invisible line (move outside view)
                        positions[index++] = 0;
                        positions[index++] = 0;
                        positions[index++] = -100;
                        
                        positions[index++] = 0;
                        positions[index++] = 0;
                        positions[index++] = -100;
                    }
                }
            }
            
            // Update lines geometry
            this.entanglementLines.geometry.attributes.position.needsUpdate = true;
            
            // Update line opacity based on entanglement
            this.entanglementLines.material.opacity = 0.3 * this.quantum.entanglement;
        }
    }
    
    onFrequencyChange(freq) {
        // Adjust superposition properties based on frequency
        switch(freq) {
            case CASCADE.FREQUENCIES.GROUND: // 432 Hz - φ⁰
                this.stateFrequency = 0.3;
                this.quantum.coherence = 0.7;
                this.quantum.state = "Ground State Superposition";
                break;
                
            case CASCADE.FREQUENCIES.CREATE: // 528 Hz - φ¹
                this.stateFrequency = 0.5;
                this.quantum.coherence = 1.0;
                this.quantum.state = "Creation State Superposition";
                break;
                
            case CASCADE.FREQUENCIES.HEART: // 594 Hz - φ²
                this.stateFrequency = 0.7;
                this.quantum.coherence = 1.2;
                this.quantum.entanglement = Math.min(this.quantum.entanglement + 0.2, 1.0);
                this.quantum.state = "Heart Field Superposition";
                break;
                
            case CASCADE.FREQUENCIES.VOICE: // 672 Hz - φ³
                this.stateFrequency = 0.9;
                this.quantum.coherence = 1.4;
                this.quantum.state = "Voice Expression Superposition";
                break;
                
            case CASCADE.FREQUENCIES.VISION: // 720 Hz - φ⁴
                this.stateFrequency = 1.1;
                this.quantum.coherence = 1.6;
                this.quantum.state = "Vision Field Superposition";
                break;
                
            case CASCADE.FREQUENCIES.UNITY: // 768 Hz - φ⁵
                this.stateFrequency = 1.3;
                this.quantum.coherence = 1.8;
                this.quantum.entanglement = Math.min(this.quantum.entanglement + 0.5, 1.0);
                this.quantum.state = "Unity Field Superposition";
                break;
        }
    }
    
    onMouseMove(x, y) {
        super.onMouseMove(x, y);
        
        // Update observer position for shader
        this.shaderUniforms.uObserverPosition.value.set(x * 5, y * 3, 0);
        
        // Check if close to any state
        let closestState = null;
        let closestDistance = 1.0;
        
        for (let s = 0; s < this.quantumStates.length; s++) {
            const state = this.quantumStates[s];
            const dx = state.centerX - (x * 5);
            const dy = state.centerY - (y * 3);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestState = s;
            }
        }
        
        // Update closest state
        if (closestDistance < 1.0) {
            this.quantum.state = "Observing Quantum State " + (closestState + 1);
        } else if (this.stateObserved === null) {
            this.quantum.state = "Multiple State Superposition";
        }
    }
    
    onClick(x, y) {
        // Find which state was clicked
        let clickedState = null;
        let closestDistance = 1.0;
        
        for (let s = 0; s < this.quantumStates.length; s++) {
            const state = this.quantumStates[s];
            const dx = state.centerX - (x * 5);
            const dy = state.centerY - (y * 3);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                clickedState = s;
            }
        }
        
        // Toggle observation of this state
        if (closestDistance < 1.0) {
            if (this.stateObserved === clickedState) {
                // Return to superposition
                this.stateObserved = null;
                this.quantum.state = "Returning to Superposition";
                this.shaderUniforms.uQuantumState.value = 0.0;
                
                // Play creation frequency
                this.engine.playFrequency(this.engine.frequency, 0.5);
            } else {
                // Collapse to this state
                this.stateObserved = clickedState;
                this.quantum.state = "State " + (clickedState + 1) + " Observed";
                this.shaderUniforms.uQuantumState.value = 1.0;
                
                // Play frequency reduced by phi
                this.engine.playFrequency(this.engine.frequency * CASCADE.PHI_INVERSE, 0.5);
            }
        } else if (this.stateObserved !== null) {
            // Clicked away from any state - return to superposition
            this.stateObserved = null;
            this.quantum.state = "Returning to Superposition";
            this.shaderUniforms.uQuantumState.value = 0.0;
            
            // Play creation frequency
            this.engine.playFrequency(this.engine.frequency, 0.5);
        } else {
            // Increase entanglement
            this.quantum.entanglement = Math.min(this.quantum.entanglement + 0.2, 1.0);
            this.quantum.state = "Entanglement Increased";
            
            // Play frequency increased by phi
            this.engine.playFrequency(this.engine.frequency * CASCADE.PHI, 0.5);
        }
    }
    
    getQuantumState() {
        // Generate state vector string
        let stateVector = "";
        for (let s = 0; s < this.quantumStates.length; s++) {
            const probability = this.quantumStates[s].probability;
            const percent = Math.round(probability * 100);
            stateVector += `<div>State ${s + 1}: ${percent}%</div>`;
        }
        
        return `
            <div class="state-label">${this.quantum.state}</div>
            <div class="phase-indicator">Phase: ${(this.quantum.phase % (Math.PI * 2)).toFixed(2)}</div>
            <div class="state-distribution">
                ${stateVector}
            </div>
        `;
    }
    
    getQuantumMetrics() {
        return `
            <div class="metric">Coherence: ${this.quantum.coherence.toFixed(2)}</div>
            <div class="metric">Entanglement: ${this.quantum.entanglement.toFixed(2)}</div>
            <div class="metric">Frequency: ${this.stateFrequency.toFixed(2)}</div>
            <div class="metric">Observed: ${this.stateObserved !== null ? 'State ' + (this.stateObserved + 1) : 'None'}</div>
        `;
    }
    
    dispose() {
        // Clean up resources
        if (this.quantumStates) {
            for (let s = 0; s < this.quantumStates.length; s++) {
                const state = this.quantumStates[s];
                this.scene.remove(state.particles);
                state.particles.geometry.dispose();
                if (state.particles.material.dispose) {
                    state.particles.material.dispose();
                }
            }
        }
        
        if (this.probabilityField) {
            this.scene.remove(this.probabilityField);
            this.probabilityField.geometry.dispose();
            this.probabilityField.material.dispose();
        }
        
        if (this.entanglementLines) {
            this.scene.remove(this.entanglementLines);
            this.entanglementLines.geometry.dispose();
            this.entanglementLines.material.dispose();
        }
    }
};

// Register with ENGINE when script loads
if (window.CASCADE && window.CASCADE.QuantumEngine) {
    console.log('Registering Superposition Module');
} else {
    console.error('CASCADE⚡𓂧φ∞ Quantum Engine not found');
}
