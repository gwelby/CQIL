/**
 * CASCADE⚡𓂧φ∞ Unity Wave Module
 * Operating at Unity Frequency (768 Hz - φ⁵)
 * 
 * ZEN FIRST implementation:
 * - Complete Envelope: Self-contained quantum singularity
 * - Minimal Perfection: Simple, focused implementation
 * - Field IS the Bridge: No forced connections
 * - Phi-Harmonic: Pure mathematical relationships
 */

// Initialize CASCADE namespace if it doesn't exist
window.CASCADE = window.CASCADE || {};

// Unity Wave Module - Multidimensional Integration
CASCADE.UnityModule = class extends CASCADE.QuantumModule {
    constructor(engine) {
        super(engine);
        
        // Quantum state properties
        this.quantum.state = "Unity Field";
        this.quantum.coherence = 1.0;
        this.quantum.entanglement = 1.0;
        
        // Minimal perfect implementation
        this.unityField = null;
        this.phiPoints = [];
        this.pointCount = 144; // 12² - perfect for phi-harmonics
        
        // ZEN center
        this.zenPoint = new THREE.Vector3(0, 0, 0);
        
        // Shader uniforms
        this.uniforms = {
            time: { value: 0 },
            frequency: { value: CASCADE.FREQUENCIES.UNITY / 1000 },
            phi: { value: CASCADE.PHI },
            mousePosition: { value: new THREE.Vector2(0, 0) },
            coherence: { value: 1.0 }
        };
    }
    
    init() {
        console.log('Initializing Unity Wave Module at 768 Hz');
        
        // Set camera position for perfect viewing
        this.camera.position.set(0, 0, 5);
        this.camera.lookAt(this.zenPoint);
        
        // Create single, complete quantum field
        this.createUnityField();
        
        // Play unity frequency as initial greeting
        this.engine.playFrequency(CASCADE.FREQUENCIES.UNITY, 3, 0.08);
    }
    
    // Create a single, perfect unity field
    createUnityField() {
        // Create container group
        this.unityField = new THREE.Group();
        this.scene.add(this.unityField);
        
        // Single geometry for all points (ZEN FIRST - one vessel)
        const geometry = new THREE.BufferGeometry();
        
        // Generate positions based on Fibonacci sphere for perfect distribution
        const positions = new Float32Array(this.pointCount * 3);
        const colors = new Float32Array(this.pointCount * 3);
        const sizes = new Float32Array(this.pointCount);
        const phases = new Float32Array(this.pointCount);
        
        // Phi-harmonic distribution on sphere
        for (let i = 0; i < this.pointCount; i++) {
            // Perfect Fibonacci sphere distribution
            const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
            const y = 1 - (i / (this.pointCount - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);
            const theta = phi * i;
            
            // Position with perfect phi-harmonic spacing
            positions[i * 3] = radius * Math.cos(theta) * 3;
            positions[i * 3 + 1] = y * 3;
            positions[i * 3 + 2] = radius * Math.sin(theta) * 3;
            
            // Create color based on position in phi sequence
            const hue = (i / this.pointCount + 0.45) % 1.0; // Blueish to purple spectrum
            const sat = 0.7 + 0.3 * Math.sin(i * 0.1);
            const light = 0.5 + 0.2 * Math.sin(i * 0.2);
            
            // Convert HSL to RGB
            const color = new THREE.Color().setHSL(hue, sat, light);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            // Size with phi ratio for harmony
            sizes[i] = 0.05 + 0.05 * Math.sin(i * CASCADE.PHI_INVERSE);
            
            // Phase with phi distribution
            phases[i] = (i * CASCADE.PHI_INVERSE) % (Math.PI * 2);
        }
        
        // Set attributes
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
        
        // Use a simple but powerful shader for points
        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: `
                uniform float time;
                uniform float phi;
                uniform float frequency;
                uniform float coherence;
                
                attribute float size;
                attribute float phase;
                attribute vec3 color;
                
                varying vec3 vColor;
                varying float vPhase;
                
                void main() {
                    // Quantum oscillation based on phi
                    float t = time * frequency * 6.28;
                    float oscillation = sin(t + phase) * coherence;
                    
                    // Apply phi-harmonic movement
                    vec3 pos = position;
                    pos += normalize(position) * oscillation * 0.3;
                    
                    // Project position
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                    
                    // Point size with phi relationship
                    gl_PointSize = size * (70.0 / -mvPosition.z) * (1.0 + 0.3 * oscillation);
                    
                    // Pass color and phase to fragment shader
                    vColor = color;
                    vPhase = phase;
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform float frequency;
                uniform float coherence;
                
                varying vec3 vColor;
                varying float vPhase;
                
                void main() {
                    // Calculate distance from center for circular points
                    vec2 center = gl_PointCoord - vec2(0.5);
                    float dist = length(center);
                    
                    // Soft edge for points
                    float strength = 1.0 - smoothstep(0.4, 0.5, dist);
                    
                    // Apply phi-harmonic glow
                    float glow = 0.6 + 0.4 * sin(time * frequency * 3.14 + vPhase);
                    vec3 color = vColor * glow;
                    
                    // Apply alpha based on coherence
                    float alpha = strength * coherence;
                    
                    // Final color
                    gl_FragColor = vec4(color, alpha);
                    
                    // Discard fragments outside point
                    if (dist > 0.5) discard;
                }
            `,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            vertexColors: true
        });
        
        // Create the particles as a single system
        const particles = new THREE.Points(geometry, material);
        this.unityField.add(particles);
        
        // Create simple unity field sphere
        const sphereGeometry = new THREE.IcosahedronGeometry(2.5, 1);
        const sphereMaterial = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: `
                uniform float time;
                uniform float phi;
                uniform float frequency;
                uniform float coherence;
                
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    // Apply subtle movement
                    vec3 pos = position;
                    float movement = sin(time * frequency * 3.14) * 0.05 * coherence;
                    pos += normal * movement;
                    
                    // Project position
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                    
                    // Pass data to fragment shader
                    vNormal = normal;
                    vPosition = position;
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform float phi;
                uniform float frequency;
                uniform float coherence;
                
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    // Subtle grid pattern
                    vec3 normal = normalize(vNormal);
                    
                    // Phi-based color
                    float hue = 0.65 + 0.1 * sin(time * frequency * 1.57);
                    float sat = 0.7;
                    float light = 0.5 + 0.1 * sin(dot(normal, vec3(1.0)) + time);
                    
                    // Convert HSL to RGB
                    float h = hue * 6.0;
                    float f = fract(h);
                    float p = light * (1.0 - sat);
                    float q = light * (1.0 - sat * f);
                    float t = light * (1.0 - sat * (1.0 - f));
                    
                    vec3 rgb;
                    if (h < 1.0) rgb = vec3(light, t, p);
                    else if (h < 2.0) rgb = vec3(q, light, p);
                    else if (h < 3.0) rgb = vec3(p, light, t);
                    else if (h < 4.0) rgb = vec3(p, q, light);
                    else if (h < 5.0) rgb = vec3(t, p, light);
                    else rgb = vec3(light, p, q);
                    
                    // Grid pattern
                    float grid = max(
                        step(0.98, sin(vPosition.x * 8.0) * sin(vPosition.y * 8.0) * sin(vPosition.z * 8.0)),
                        step(0.95, sin(vPosition.x * 16.0) * sin(vPosition.y * 16.0) * sin(vPosition.z * 16.0))
                    );
                    
                    // Combine colors
                    vec3 finalColor = mix(rgb * 0.2, rgb, grid);
                    
                    // Apply glow based on normal
                    float rim = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 4.0);
                    finalColor += vec3(0.3, 0.4, 0.9) * rim * coherence;
                    
                    // Final color with very subtle transparency
                    gl_FragColor = vec4(finalColor, 0.05 * coherence);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            wireframe: false,
            depthWrite: false
        });
        
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.unityField.add(sphere);
    }
    
    // Update method 
    update(delta) {
        // Update time uniform for shaders
        this.uniforms.time.value += delta * 0.5;
        
        // Update all unity field elements
        if (this.unityField) {
            // Apply phi-harmonic motion to each point
            this.phiPoints.forEach((point, index) => {
                const time = this.uniforms.time.value;
                const phiOffset = index * (Math.PI * 2 / this.pointCount);
                
                // φ-based movement patterns
                const x = Math.cos(time + phiOffset) * (1 + Math.sin(time * CASCADE.PHI) * 0.2);
                const y = Math.sin(time + phiOffset) * (1 + Math.cos(time * CASCADE.PHI) * 0.2);
                const z = Math.sin(time * CASCADE.PHI + phiOffset) * 0.5;
                
                // Update point position with perfect φ harmony
                point.position.set(x, y, z);
            });
            
            // Ensure proper rotation of the unity field
            this.unityField.rotation.x += delta * 0.1;
            this.unityField.rotation.y += delta * 0.15;
        }
        
        // Request next frame update to ensure continuous animation
        requestAnimationFrame(() => this.render());
    }
    
    // Frequency change handler
    onFrequencyChange(freq) {
        // Update frequency uniform
        this.uniforms.frequency.value = freq / 1000;
        
        // Play the tone
        this.engine.playFrequency(freq, 1, 0.05);
        
        // Adjust coherence based on frequency alignment with Unity
        // Full coherence at Unity frequency (768 Hz)
        const freqRatio = freq / CASCADE.FREQUENCIES.UNITY;
        this.quantum.coherence = Math.pow(freqRatio, 5);
        
        // Perfect coherence at Unity frequency
        if (freq === CASCADE.FREQUENCIES.UNITY) {
            this.quantum.coherence = 1.0;
        }
    }
    
    // Mouse movement handler
    onMouseMove(x, y) {
        // Update mouse position uniform
        this.uniforms.mousePosition.value.set(x, y);
        
        // Subtle field movement toward mouse
        const targetX = x * 0.2;
        const targetY = -y * 0.2;
        this.unityField.rotation.y += (targetX - this.unityField.rotation.y) * 0.01;
        this.unityField.rotation.x += (targetY - this.unityField.rotation.x) * 0.01;
    }
    
    // Click handler
    onClick(x, y) {
        // Brief coherence pulse
        const originalCoherence = this.quantum.coherence;
        this.quantum.coherence = 1.5;
        
        // Restore original coherence after 500ms
        setTimeout(() => {
            this.quantum.coherence = originalCoherence;
        }, 500);
        
        // Play unity frequency
        this.engine.playFrequency(CASCADE.FREQUENCIES.UNITY, 2, 0.1);
    }
    
    // Get quantum state display HTML
    getQuantumState() {
        const coherencePercent = Math.round(this.quantum.coherence * 100);
        const phasePercent = Math.round((this.quantum.phase / (Math.PI * 2)) * 100);
        
        return `
            <div class="state-label phi-unity">Unity Field (768 Hz - φ⁵)</div>
            <div class="phase-indicator">Coherence: ${coherencePercent}%</div>
            <div class="state-distribution">
                <div>Multi-dimensional Channel</div>
                <div>Phase: ${phasePercent}%</div>
                <div>Points: ${this.pointCount}</div>
            </div>
        `;
    }
    
    // Get quantum metrics display HTML
    getQuantumMetrics() {
        return `
            <div class="metric">Frequency: ${this.engine.frequency} Hz</div>
            <div class="metric">φ-Ratio: ${CASCADE.PHI.toFixed(3)}</div>
            <div class="metric">Time: ${this.time.toFixed(2)}s</div>
        `;
    }
    
    // Clean up resources
    dispose() {
        // Remove unity field
        if (this.unityField) {
            this.scene.remove(this.unityField);
        }
        
        // Dispose of geometries and materials
        this.unityField.traverse(object => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) object.material.dispose();
        });
    }
};

// Register module with CASCADE
document.addEventListener('DOMContentLoaded', function() {
    if (window.CASCADE && window.THREE) {
        console.log('Registering Unity Wave Module');
    }
});
