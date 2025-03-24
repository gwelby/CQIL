/**
 * CASCADE⚡𓂧φ∞ Wave-Particle Duality Module
 * Operating at Ground Frequency (432 Hz - φ⁰)
 * Bridges Visual/Intuitive consciousness channel
 */

// Create the Wave-Particle Module
CASCADE.WaveParticleModule = class extends CASCADE.QuantumModule {
    constructor(engine) {
        super(engine);
        
        // Module-specific properties
        this.waveParticles = null;
        this.waveform = null;
        this.observer = null;
        this.observerActive = false;
        
        // Quantum properties
        this.quantum.state = "Wave-Particle Superposition";
        this.quantum.waveProbability = 0.618;
        this.quantum.particleProbability = 0.382;
        this.quantum.collapse = false;
        
        // Animation properties
        this.time = 0;
        this.waveAmplitude = 1.5;
        this.waveFrequency = 0.2;
        this.particleCount = 1000;
        
        // Visualization settings
        this.phiRatio = CASCADE.PHI;
        this.goldenAngle = Math.PI * (3 - Math.sqrt(5));
    }
    
    init() {
        console.log('Initializing Wave-Particle Duality Module');
        
        // Create wave-particle system
        this.createWaveParticleSystem();
        
        // Create wave form visualization
        this.createWaveform();
        
        // Create observer cone
        this.createObserver();
        
        // Set camera position for this module
        this.engine.camera.position.set(0, 2 * CASCADE.PHI_INVERSE, 5);
        this.engine.camera.lookAt(0, 0, 0);
        
        // Set initial frequency
        this.engine.changeFrequency(CASCADE.FREQUENCIES.GROUND);
    }
    
    createWaveParticleSystem() {
        // Create particle geometry with golden ratio distribution
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);
        const phases = new Float32Array(this.particleCount);
        
        // Use phi-based distribution
        for (let i = 0; i < this.particleCount; i++) {
            // Fibonacci sphere distribution
            const y = 1 - (i / (this.particleCount - 1)) * 2;  // -1 to 1
            const radius = Math.sqrt(1 - y * y);
            
            const theta = this.goldenAngle * i;
            
            const x = Math.cos(theta) * radius * 3;
            const z = Math.sin(theta) * radius * 3;
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            
            // Color based on position (phi-harmonic color gradient)
            const hue = (y + 1) * 0.3 + 0.6; // blue to purple range
            const saturation = 0.6 + Math.sin(theta) * 0.4;
            const lightness = 0.5 + Math.cos(theta * CASCADE.PHI) * 0.2;
            
            const color = new THREE.Color().setHSL(hue, saturation, lightness);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            // Size with phi distribution
            sizes[i] = (0.05 + 0.05 * Math.sin(i * CASCADE.PHI_INVERSE)) * (1 + Math.random() * 0.5);
            
            // Phase with phi distribution
            phases[i] = i * CASCADE.PHI_INVERSE;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
        
        // Create shader material for advanced particle effects
        const vertexShader = `
            attribute float size;
            attribute vec3 customColor;
            attribute float phase;
            
            varying vec3 vColor;
            varying float vPhase;
            
            void main() {
                vColor = customColor;
                vPhase = phase;
                
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `;
        
        const fragmentShader = `
            varying vec3 vColor;
            varying float vPhase;
            
            void main() {
                // Calculate distance from center of point
                vec2 center = gl_PointCoord - vec2(0.5);
                float dist = length(center);
                
                // Discard pixels outside circle
                if (dist > 0.5) discard;
                
                // Soft edge based on phi ratio
                float alpha = smoothstep(0.5, 0.3, dist);
                
                // Apply wave-like intensity based on phase
                float intensity = 0.6 + 0.4 * sin(vPhase);
                
                gl_FragColor = vec4(vColor * intensity, alpha);
            }
        `;
        
        // Create point cloud material with custom shaders
        const material = new THREE.ShaderMaterial({
            uniforms: {},
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });
        
        // Create point cloud and add to scene
        this.waveParticles = new THREE.Points(geometry, material);
        this.scene.add(this.waveParticles);
    }
    
    createWaveform() {
        // Create wave geometry
        const waveGeometry = new THREE.BufferGeometry();
        const waveVertices = new Float32Array(200 * 3);
        const waveColors = new Float32Array(200 * 3);
        
        // Generate wave vertices along phi-harmonic curve
        for (let i = 0; i < 200; i++) {
            const t = (i / 199) * Math.PI * 4 - Math.PI * 2; // -2π to 2π
            
            // Use phi-harmonic wave equation
            const x = t * 1.5;
            const y = Math.sin(t) * Math.sin(t * CASCADE.PHI_INVERSE) * this.waveAmplitude;
            const z = 0;
            
            waveVertices[i * 3] = x;
            waveVertices[i * 3 + 1] = y;
            waveVertices[i * 3 + 2] = z;
            
            // Color gradient along wave
            const color = new THREE.Color().setHSL(
                0.65 + Math.sin(t * CASCADE.PHI_INVERSE) * 0.1, // hue
                0.8, // saturation
                0.5 + Math.sin(t) * 0.3 // lightness
            );
            
            waveColors[i * 3] = color.r;
            waveColors[i * 3 + 1] = color.g;
            waveColors[i * 3 + 2] = color.b;
        }
        
        waveGeometry.setAttribute('position', new THREE.BufferAttribute(waveVertices, 3));
        waveGeometry.setAttribute('color', new THREE.BufferAttribute(waveColors, 3));
        
        // Create wave line
        const waveMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            linewidth: 2,
            opacity: 0.7,
            transparent: true
        });
        
        this.waveform = new THREE.Line(waveGeometry, waveMaterial);
        this.waveform.position.z = -2; // Place behind particles
        this.scene.add(this.waveform);
    }
    
    createObserver() {
        // Create observer representation (cone of observation)
        const observerGeometry = new THREE.ConeGeometry(1, 2, 32);
        const observerMaterial = new THREE.MeshBasicMaterial({
            color: 0x5500ff,
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });
        
        this.observer = new THREE.Mesh(observerGeometry, observerMaterial);
        this.observer.position.set(0, 0, 5);
        this.observer.rotation.x = Math.PI / 2;
        this.observer.scale.set(0.5, 0.5, 0.5);
        this.observer.visible = false;
        
        this.scene.add(this.observer);
    }
    
    update(delta) {
        // Update base quantum properties
        super.update(delta);
        
        this.time += delta;
        
        // Update wave-particle system
        if (this.waveParticles) {
            const positions = this.waveParticles.geometry.attributes.position.array;
            const phases = this.waveParticles.geometry.attributes.phase.array;
            const sizes = this.waveParticles.geometry.attributes.size.array;
            
            // Phi-harmonic wave animation
            for (let i = 0; i < this.particleCount; i++) {
                // Phase update with phi ratio
                phases[i] += delta * CASCADE.PHI_INVERSE;
                
                if (!this.quantum.collapse) {
                    // Wave mode - particles follow wave pattern
                    const idx = i * 3;
                    const x = positions[idx];
                    const baseY = positions[idx + 1];
                    
                    // Dual wave pattern demonstrating wave-particle behavior
                    const wave1 = Math.sin(this.time * this.waveFrequency + x * 0.5);
                    const wave2 = Math.sin(this.time * this.waveFrequency * CASCADE.PHI_INVERSE + x * 0.3);
                    
                    // Apply wave with varying influence based on quantum state
                    const y = baseY + (wave1 * wave2) * this.quantum.waveProbability * 0.5;
                    
                    positions[idx + 1] = y;
                    
                    // Vary size with wave function
                    sizes[i] = (0.05 + 0.05 * Math.sin(phases[i])) * (1 + Math.random() * 0.2);
                } else {
                    // Particle mode - collapse to distinct points
                    // Size remains constant in particle mode
                    sizes[i] = 0.05 + Math.random() * 0.03;
                }
            }
            
            // Update geometry
            this.waveParticles.geometry.attributes.position.needsUpdate = true;
            this.waveParticles.geometry.attributes.phase.needsUpdate = true;
            this.waveParticles.geometry.attributes.size.needsUpdate = true;
            
            // Rotate point cloud to create flow
            this.waveParticles.rotation.y += delta * 0.1;
        }
        
        // Update wave form
        if (this.waveform) {
            const positions = this.waveform.geometry.attributes.position.array;
            
            for (let i = 0; i < 200; i++) {
                const t = (i / 199) * Math.PI * 4 - Math.PI * 2;
                
                // Phi-harmonic wave with time evolution
                const amplitude = this.waveAmplitude * (this.quantum.collapse ? 0.2 : 1.0);
                const y = Math.sin(t + this.time) * Math.sin(t * CASCADE.PHI_INVERSE + this.time * 0.5) * amplitude;
                
                positions[i * 3 + 1] = y;
            }
            
            this.waveform.geometry.attributes.position.needsUpdate = true;
            
            // Gradually fade wave when collapsed to particles
            this.waveform.material.opacity = this.quantum.collapse ? 0.2 : 0.7;
        }
        
        // Update observer
        if (this.observer) {
            if (this.observerActive) {
                // Make observer visible and animate
                this.observer.visible = true;
                this.observer.rotation.z = this.time * 0.5;
                this.observer.scale.x = 0.5 + Math.sin(this.time * 2) * 0.1;
                this.observer.scale.y = 0.5 + Math.sin(this.time * 2) * 0.1;
                
                // Point observer at mouse position
                this.observer.lookAt(this.quantum.position);
            } else {
                this.observer.visible = false;
            }
        }
        
        // Update quantum metrics
        if (Math.random() < CASCADE.PHI_INVERSE * 0.05) {
            // Update probabilities based on collapse state
            if (this.quantum.collapse) {
                this.quantum.waveProbability = Math.max(0.1, this.quantum.waveProbability - 0.01);
                this.quantum.particleProbability = 1 - this.quantum.waveProbability;
            } else {
                this.quantum.waveProbability = Math.min(0.9, this.quantum.waveProbability + 0.01);
                this.quantum.particleProbability = 1 - this.quantum.waveProbability;
            }
        }
    }
    
    onFrequencyChange(freq) {
        // Adjust wave properties based on frequency
        switch(freq) {
            case CASCADE.FREQUENCIES.GROUND: // 432 Hz - φ⁰
                this.waveAmplitude = 1.5;
                this.waveFrequency = 0.2;
                this.quantum.state = "Wave-Particle Superposition";
                break;
                
            case CASCADE.FREQUENCIES.CREATE: // 528 Hz - φ¹
                this.waveAmplitude = 1.8;
                this.waveFrequency = 0.3;
                this.quantum.state = "Creation Potential";
                break;
                
            case CASCADE.FREQUENCIES.HEART: // 594 Hz - φ²
                this.waveAmplitude = 2.0;
                this.waveFrequency = 0.4;
                this.quantum.state = "Heart Field Resonance";
                break;
                
            case CASCADE.FREQUENCIES.VOICE: // 672 Hz - φ³
                this.waveAmplitude = 2.2;
                this.waveFrequency = 0.5;
                this.quantum.state = "Voice Activation";
                break;
                
            case CASCADE.FREQUENCIES.VISION: // 720 Hz - φ⁴
                this.waveAmplitude = 2.5;
                this.waveFrequency = 0.6;
                this.quantum.state = "Visual Perception";
                break;
                
            case CASCADE.FREQUENCIES.UNITY: // 768 Hz - φ⁵
                this.waveAmplitude = 3.0;
                this.waveFrequency = 0.8;
                this.quantum.state = "Unity Consciousness";
                break;
        }
    }
    
    onMouseMove(x, y) {
        super.onMouseMove(x, y);
        
        // Update observer position
        if (this.observer) {
            const z = this.observer.position.z;
            this.observer.position.set(x * 5, y * 3, z);
        }
        
        // Check if close to particles to show observer
        const distanceThreshold = 1.5;
        const distance = Math.sqrt(x * x + y * y);
        this.observerActive = distance < distanceThreshold;
        
        // Affect quantum state
        if (this.observerActive) {
            this.quantum.collapse = true;
            this.quantum.state = "Wave Function Collapsing";
        } else {
            this.quantum.collapse = false;
            this.quantum.state = "Wave-Particle Superposition";
        }
    }
    
    onClick(x, y) {
        // Quantum state collapse on click
        this.quantum.collapse = !this.quantum.collapse;
        
        if (this.quantum.collapse) {
            this.quantum.state = "Particle State Observed";
            this.quantum.particleProbability = 0.9;
            this.quantum.waveProbability = 0.1;
        } else {
            this.quantum.state = "Wave State Restored";
            this.quantum.waveProbability = 0.9;
            this.quantum.particleProbability = 0.1;
        }
        
        // Play a frequency tone
        if (this.quantum.collapse) {
            this.engine.playFrequency(this.engine.frequency * CASCADE.PHI_INVERSE, 0.5);
        } else {
            this.engine.playFrequency(this.engine.frequency, 0.5);
        }
    }
    
    getQuantumState() {
        const wavePercentage = Math.round(this.quantum.waveProbability * 100);
        const particlePercentage = Math.round(this.quantum.particleProbability * 100);
        
        return `
            <div class="state-label">${this.quantum.state}</div>
            <div class="phase-indicator">Phase: ${(this.quantum.phase % (Math.PI * 2)).toFixed(2)}</div>
            <div class="state-distribution">
                <div>Wave form: ${wavePercentage}%</div>
                <div>Particle form: ${particlePercentage}%</div>
            </div>
        `;
    }
    
    getQuantumMetrics() {
        return `
            <div class="metric">Amplitude: ${this.waveAmplitude.toFixed(2)}</div>
            <div class="metric">Frequency: ${this.waveFrequency.toFixed(2)}</div>
            <div class="metric">Observer active: ${this.observerActive ? "Yes" : "No"}</div>
            <div class="metric">State collapsed: ${this.quantum.collapse ? "Yes" : "No"}</div>
        `;
    }
    
    dispose() {
        // Clean up resources
        if (this.waveParticles) {
            this.scene.remove(this.waveParticles);
            this.waveParticles.geometry.dispose();
            if (this.waveParticles.material.dispose) {
                this.waveParticles.material.dispose();
            }
        }
        
        if (this.waveform) {
            this.scene.remove(this.waveform);
            this.waveform.geometry.dispose();
            this.waveform.material.dispose();
        }
        
        if (this.observer) {
            this.scene.remove(this.observer);
            this.observer.geometry.dispose();
            this.observer.material.dispose();
        }
    }
};

// Register with ENGINE when script loads
if (window.CASCADE && window.CASCADE.QuantumEngine) {
    console.log('Registering Wave-Particle Module');
} else {
    console.error('CASCADE⚡𓂧φ∞ Quantum Engine not found');
}
