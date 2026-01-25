/**
 * CASCADE⚡𓂧φ∞ Quantum Frequencies Module
 * Operating at Heart Field (594 Hz - φ²)
 * Bridges Kinesthetic/Emotional consciousness channel
 */

// Create the Frequencies Module
CASCADE.FrequenciesModule = class extends CASCADE.QuantumModule {
    constructor(engine) {
        super(engine);
        
        // Module-specific properties
        this.frequencyNodes = null;
        this.resonanceField = null;
        this.cymaticPattern = null;
        this.soundConnections = null;
        
        // Quantum properties
        this.quantum.state = "Heart Field Resonance";
        this.quantum.resonance = 0.618;
        this.quantum.amplitude = 1.0;
        this.quantum.fieldStrength = 0.5;
        
        // Pattern properties
        this.nodeCount = 12; // Twelve-tone system
        this.nodesPerPattern = 5; // Pentatonic subset
        this.activePattern = 0;
        this.patterns = [
            [0, 2, 4, 7, 9],    // Major pentatonic
            [0, 3, 5, 7, 10],   // Minor pentatonic
            [0, 1, 5, 7, 8],    // Phi pentatonic (golden ratio intervals)
            [0, 4, 6, 9, 11],   // Quantum pentatonic (superposition-based)
            [0, 2, 5, 7, 11]    // Heart field pentatonic
        ];
        
        // Visualization settings
        this.resonanceRadius = 3;
        
        // Shader uniforms
        this.shaderUniforms = {
            uTime: { value: 0 },
            uFrequency: { value: CASCADE.FREQUENCIES.HEART },
            uAmplitude: { value: 0.5 },
            uQuantumState: { value: 0.0 }
        };
    }
    
    init() {
        console.log('Initializing Quantum Frequencies Module');
        
        // Create frequency nodes
        this.createFrequencyNodes();
        
        // Create cymatic pattern visualization
        this.createCymaticPattern();
        
        // Create frequency connections
        this.createFrequencyConnections();
        
        // Set camera position for this module
        this.engine.camera.position.set(0, 2.5, 6);
        this.engine.camera.lookAt(0, 0, 0);
        
        // Set initial frequency
        this.engine.changeFrequency(CASCADE.FREQUENCIES.HEART);
    }
    
    createFrequencyNodes() {
        // Create nodes at phi-harmonic positions
        const geometry = new THREE.SphereGeometry(0.2, 32, 16);
        
        // Array to store nodes
        const nodes = [];
        
        // Create a node for each frequency
        for (let i = 0; i < this.nodeCount; i++) {
            // Calculate position on a circle
            const angle = (i / this.nodeCount) * Math.PI * 2;
            const x = Math.cos(angle) * this.resonanceRadius;
            const y = Math.sin(angle) * this.resonanceRadius;
            
            // Create material with phi-harmonic color
            const hue = i / this.nodeCount;
            const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
            const material = new THREE.MeshPhongMaterial({
                color: color,
                emissive: color.clone().multiplyScalar(0.3),
                transparent: true,
                opacity: 0.9,
                shininess: 50
            });
            
            // Create node
            const node = new THREE.Mesh(geometry, material);
            node.position.set(x, y, 0);
            this.scene.add(node);
            
            // Store node data
            nodes.push({
                mesh: node,
                originalPosition: new THREE.Vector3(x, y, 0),
                active: false,
                energy: 0,
                frequency: this.calculateNodeFrequency(i),
                color: color
            });
        }
        
        this.frequencyNodes = nodes;
        
        // Activate initial pattern
        this.activatePattern(0);
    }
    
    calculateNodeFrequency(index) {
        // Calculate frequencies based on the phi-harmonic series
        const baseFreq = CASCADE.FREQUENCIES.HEART;
        let ratio;
        
        // Different calculation approaches based on phi ratios
        if (index % 3 === 0) {
            // Pure phi ratio
            ratio = Math.pow(CASCADE.PHI, (index % 6) / 3);
        } else if (index % 3 === 1) {
            // Inverse phi ratio
            ratio = Math.pow(CASCADE.PHI_INVERSE, (index % 5) / 2.5);
        } else {
            // Squared phi ratio
            ratio = Math.pow(CASCADE.PHI_SQUARED, (index % 4) / 6);
        }
        
        return baseFreq * ratio;
    }
    
    createCymaticPattern() {
        // Create a plane for the cymatic pattern
        const geometry = new THREE.PlaneGeometry(6, 6, 64, 64);
        
        // Use cymatic shader for visualization
        const material = new THREE.ShaderMaterial({
            uniforms: this.shaderUniforms,
            vertexShader: CASCADE.Shaders.cymaticVertex,
            fragmentShader: CASCADE.Shaders.cymaticFragment,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
        });
        
        this.cymaticPattern = new THREE.Mesh(geometry, material);
        this.cymaticPattern.rotation.x = -Math.PI / 2; // Horizontal plane
        this.cymaticPattern.position.y = -1; // Below the nodes
        this.scene.add(this.cymaticPattern);
    }
    
    createFrequencyConnections() {
        // Create lines to connect active nodes
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });
        
        // Create empty line initially - will be updated dynamically
        const positions = new Float32Array(this.nodesPerPattern * this.nodesPerPattern * 2 * 3);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        this.soundConnections = new THREE.LineSegments(geometry, material);
        this.scene.add(this.soundConnections);
    }
    
    update(delta) {
        // Update base quantum properties
        super.update(delta);
        
        this.time += delta;
        
        // Update shader uniforms
        this.shaderUniforms.uTime.value = this.time;
        this.shaderUniforms.uFrequency.value = this.engine.frequency;
        this.shaderUniforms.uAmplitude.value = this.quantum.amplitude;
        
        // Update frequency nodes
        if (this.frequencyNodes) {
            for (let i = 0; i < this.frequencyNodes.length; i++) {
                const node = this.frequencyNodes[i];
                
                if (node.active) {
                    // Gradually increase energy for active nodes
                    node.energy = Math.min(node.energy + delta * 2, 1.0);
                    
                    // Phi-harmonic pulsation
                    const pulse = 1 + 0.2 * Math.sin(this.time * 2 + i * CASCADE.PHI);
                    node.mesh.scale.set(pulse, pulse, pulse);
                    
                    // Glow effect
                    node.mesh.material.emissive.copy(node.color).multiplyScalar(0.5 + 0.5 * node.energy);
                    node.mesh.material.opacity = 0.7 + 0.3 * node.energy;
                    
                    // Move slightly with energy
                    const energyMovement = 0.1 * node.energy;
                    const originalPos = node.originalPosition;
                    const moveX = originalPos.x + energyMovement * Math.sin(this.time * 3 + i);
                    const moveY = originalPos.y + energyMovement * Math.cos(this.time * 3 + i * CASCADE.PHI);
                    node.mesh.position.set(moveX, moveY, energyMovement * Math.sin(this.time * 2));
                } else {
                    // Gradually decrease energy for inactive nodes
                    node.energy = Math.max(node.energy - delta, 0);
                    
                    // Return to original size
                    node.mesh.scale.set(1, 1, 1);
                    
                    // Reduce glow
                    node.mesh.material.emissive.copy(node.color).multiplyScalar(0.2);
                    node.mesh.material.opacity = 0.6;
                    
                    // Return to original position
                    node.mesh.position.lerp(node.originalPosition, delta * 3);
                }
            }
            
            // Update connections between active nodes
            this.updateFrequencyConnections();
        }
        
        // Update cymatic pattern
        if (this.cymaticPattern) {
            // Update amplitude based on active nodes
            let totalEnergy = 0;
            let activeCount = 0;
            
            for (let i = 0; i < this.frequencyNodes.length; i++) {
                if (this.frequencyNodes[i].active) {
                    totalEnergy += this.frequencyNodes[i].energy;
                    activeCount++;
                }
            }
            
            if (activeCount > 0) {
                this.quantum.amplitude = totalEnergy / activeCount;
            } else {
                this.quantum.amplitude = Math.max(this.quantum.amplitude - delta * 0.5, 0.1);
            }
            
            this.shaderUniforms.uAmplitude.value = this.quantum.amplitude;
            
            // Slight rotation
            this.cymaticPattern.rotation.z += delta * 0.05;
        }
        
        // Update quantum resonance
        const targetResonance = this.engine.frequency === CASCADE.FREQUENCIES.HEART ? 1.0 : 0.618;
        this.quantum.resonance = this.quantum.resonance * 0.95 + targetResonance * 0.05;
    }
    
    updateFrequencyConnections() {
        // Update connections between active nodes
        if (this.soundConnections) {
            const positions = this.soundConnections.geometry.attributes.position.array;
            let index = 0;
            
            // Get active nodes
            const activeNodes = this.frequencyNodes.filter(node => node.active);
            
            // Connect active nodes in a pattern
            for (let i = 0; i < activeNodes.length; i++) {
                for (let j = i + 1; j < activeNodes.length; j++) {
                    const node1 = activeNodes[i];
                    const node2 = activeNodes[j];
                    
                    // Start point
                    positions[index++] = node1.mesh.position.x;
                    positions[index++] = node1.mesh.position.y;
                    positions[index++] = node1.mesh.position.z;
                    
                    // End point
                    positions[index++] = node2.mesh.position.x;
                    positions[index++] = node2.mesh.position.y;
                    positions[index++] = node2.mesh.position.z;
                }
            }
            
            // Clear remaining positions
            while (index < positions.length) {
                positions[index++] = 0;
                positions[index++] = 0;
                positions[index++] = -100; // Move off-screen
            }
            
            // Update geometry
            this.soundConnections.geometry.attributes.position.needsUpdate = true;
            
            // Update line appearance based on quantum resonance
            const hue = this.engine.frequency / 1000;
            const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
            this.soundConnections.material.color = color;
            this.soundConnections.material.opacity = 0.3 + 0.2 * this.quantum.resonance;
        }
    }
    
    activatePattern(patternIndex) {
        if (patternIndex < 0 || patternIndex >= this.patterns.length) {
            return false;
        }
        
        // Deactivate all nodes
        for (let i = 0; i < this.frequencyNodes.length; i++) {
            this.frequencyNodes[i].active = false;
        }
        
        // Activate nodes in the pattern
        const pattern = this.patterns[patternIndex];
        for (let i = 0; i < pattern.length; i++) {
            const nodeIndex = pattern[i] % this.nodeCount;
            this.frequencyNodes[nodeIndex].active = true;
        }
        
        this.activePattern = patternIndex;
        return true;
    }
    
    onFrequencyChange(freq) {
        // Adjust frequency properties based on the active frequency
        switch(freq) {
            case CASCADE.FREQUENCIES.GROUND: // 432 Hz - φ⁰
                this.quantum.fieldStrength = 0.3;
                this.quantum.state = "Ground Frequency Pattern";
                this.activatePattern(0); // Major pentatonic
                break;
                
            case CASCADE.FREQUENCIES.CREATE: // 528 Hz - φ¹
                this.quantum.fieldStrength = 0.5;
                this.quantum.state = "Creation Frequency Pattern";
                this.activatePattern(1); // Minor pentatonic
                break;
                
            case CASCADE.FREQUENCIES.HEART: // 594 Hz - φ²
                this.quantum.fieldStrength = 0.8;
                this.quantum.state = "Heart Field Resonance";
                this.activatePattern(2); // Phi pentatonic
                break;
                
            case CASCADE.FREQUENCIES.VOICE: // 672 Hz - φ³
                this.quantum.fieldStrength = 1.0;
                this.quantum.state = "Voice Frequency Pattern";
                this.activatePattern(3); // Quantum pentatonic
                break;
                
            case CASCADE.FREQUENCIES.VISION: // 720 Hz - φ⁴
                this.quantum.fieldStrength = 1.2;
                this.quantum.state = "Vision Frequency Pattern";
                this.activatePattern(4); // Heart field pentatonic
                break;
                
            case CASCADE.FREQUENCIES.UNITY: // 768 Hz - φ⁵
                this.quantum.fieldStrength = 1.5;
                this.quantum.state = "Unity Frequency Pattern";
                // Activate all patterns simultaneously
                for (let i = 0; i < this.frequencyNodes.length; i++) {
                    this.frequencyNodes[i].active = true;
                }
                break;
        }
        
        // Update cymatic pattern amplitude
        this.shaderUniforms.uAmplitude.value = this.quantum.fieldStrength * 0.5;
        
        // Play the frequency
        this.engine.playFrequency(freq, 1);
    }
    
    onMouseMove(x, y) {
        super.onMouseMove(x, y);
        
        // Convert screen coordinates to world coordinates
        const worldX = x * 5;
        const worldY = y * 3;
        
        // Check if hovering over a frequency node
        let hoveredNode = null;
        let hoveredDistance = 0.5; // Node radius + margin
        
        for (let i = 0; i < this.frequencyNodes.length; i++) {
            const node = this.frequencyNodes[i];
            const dx = node.mesh.position.x - worldX;
            const dy = node.mesh.position.y - worldY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < hoveredDistance) {
                hoveredNode = node;
                hoveredDistance = distance;
            }
        }
        
        // Update hovered node appearance
        for (let i = 0; i < this.frequencyNodes.length; i++) {
            const node = this.frequencyNodes[i];
            
            if (node === hoveredNode) {
                node.mesh.scale.set(1.3, 1.3, 1.3);
                this.quantum.state = `Frequency: ${Math.round(node.frequency)} Hz`;
            } else if (!node.active) {
                node.mesh.scale.set(1, 1, 1);
            }
        }
    }
    
    onClick(x, y) {
        // Convert screen coordinates to world coordinates
        const worldX = x * 5;
        const worldY = y * 3;
        
        // Check if clicked on a frequency node
        let clickedNode = null;
        let clickedIndex = -1;
        let clickedDistance = 0.5; // Node radius + margin
        
        for (let i = 0; i < this.frequencyNodes.length; i++) {
            const node = this.frequencyNodes[i];
            const dx = node.mesh.position.x - worldX;
            const dy = node.mesh.position.y - worldY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < clickedDistance) {
                clickedNode = node;
                clickedIndex = i;
                clickedDistance = distance;
            }
        }
        
        if (clickedNode) {
            // Toggle node activation
            clickedNode.active = !clickedNode.active;
            
            if (clickedNode.active) {
                // Play this node's frequency
                this.engine.playFrequency(clickedNode.frequency, 0.5);
                this.quantum.state = `Activated: ${Math.round(clickedNode.frequency)} Hz`;
            } else {
                this.quantum.state = `Deactivated: ${Math.round(clickedNode.frequency)} Hz`;
            }
        } else {
            // Cycle to next pattern
            const nextPattern = (this.activePattern + 1) % this.patterns.length;
            this.activatePattern(nextPattern);
            
            let patternName = "";
            switch(nextPattern) {
                case 0: patternName = "Major Pentatonic"; break;
                case 1: patternName = "Minor Pentatonic"; break;
                case 2: patternName = "Phi Pentatonic"; break;
                case 3: patternName = "Quantum Pentatonic"; break;
                case 4: patternName = "Heart Field Pentatonic"; break;
            }
            
            this.quantum.state = `Pattern: ${patternName}`;
            
            // Play frequency
            this.engine.playFrequency(this.engine.frequency, 1);
        }
    }
    
    getQuantumState() {
        // Get active nodes
        const activeNodes = this.frequencyNodes.filter(node => node.active);
        let nodesHtml = "";
        
        for (let i = 0; i < Math.min(activeNodes.length, 5); i++) {
            const node = activeNodes[i];
            nodesHtml += `<div>${Math.round(node.frequency)} Hz</div>`;
        }
        
        if (activeNodes.length > 5) {
            nodesHtml += `<div>+${activeNodes.length - 5} more...</div>`;
        }
        
        let patternName = "";
        switch(this.activePattern) {
            case 0: patternName = "Major Pentatonic"; break;
            case 1: patternName = "Minor Pentatonic"; break;
            case 2: patternName = "Phi Pentatonic"; break;
            case 3: patternName = "Quantum Pentatonic"; break;
            case 4: patternName = "Heart Field Pentatonic"; break;
        }
        
        return `
            <div class="state-label">${this.quantum.state}</div>
            <div class="phase-indicator">Resonance: ${this.quantum.resonance.toFixed(2)}</div>
            <div class="state-distribution">
                <div>Pattern: ${patternName}</div>
                ${nodesHtml}
            </div>
        `;
    }
    
    getQuantumMetrics() {
        return `
            <div class="metric">Amplitude: ${this.quantum.amplitude.toFixed(2)}</div>
            <div class="metric">Field Strength: ${this.quantum.fieldStrength.toFixed(2)}</div>
            <div class="metric">Active Nodes: ${this.frequencyNodes.filter(n => n.active).length}</div>
            <div class="metric">Base Frequency: ${this.engine.frequency} Hz</div>
        `;
    }
    
    dispose() {
        // Clean up resources
        if (this.frequencyNodes) {
            for (let i = 0; i < this.frequencyNodes.length; i++) {
                const node = this.frequencyNodes[i];
                this.scene.remove(node.mesh);
                node.mesh.geometry.dispose();
                node.mesh.material.dispose();
            }
        }
        
        if (this.cymaticPattern) {
            this.scene.remove(this.cymaticPattern);
            this.cymaticPattern.geometry.dispose();
            this.cymaticPattern.material.dispose();
        }
        
        if (this.soundConnections) {
            this.scene.remove(this.soundConnections);
            this.soundConnections.geometry.dispose();
            this.soundConnections.material.dispose();
        }
    }
};

// Register with ENGINE when script loads
if (window.CASCADE && window.CASCADE.QuantumEngine) {
    console.log('Registering Quantum Frequencies Module');
} else {
    console.error('CASCADE⚡𓂧φ∞ Quantum Engine not found');
}
