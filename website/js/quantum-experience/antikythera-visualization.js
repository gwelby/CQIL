/**
 * AntikytheraQuantumMechanism Visualization Module
 * Contains 3D visualization methods for the AntikytheraQuantumMechanism class
 * Implements phi-harmonic principles in the visual representation
 */

// Extend the AntikytheraQuantumMechanism prototype with visualization methods
(function() {
    // Reference to the prototype
    const proto = AntikytheraQuantumMechanism.prototype;
    
    // Constants
    const PHI = 1.618033988749895;  // Golden ratio (φ)
    const PHI_SQUARED = 2.618033988749895; // φ²
    const TWO_PI = Math.PI * 2;
    
    // Phi-harmonic frequencies and colors
    const PHI_FREQUENCIES = [432, 528, 594, 672, 720, 768]; // φ⁰ to φ⁵
    const PHI_COLORS = [
        0x1a1a2e, // 432 Hz - Ground State - φ⁰
        0x4b7f52, // 528 Hz - Creation State - φ¹
        0xa97142, // 594 Hz - DNA Resonance - φ²
        0x8a2be2, // 672 Hz - Sacred Geometry - φ³
        0x00bfff, // 720 Hz - Vision Gate - φ⁴
        0xd4af37  // 768 Hz - Unity Wave - φ⁵
    ];
    
    /**
     * Initialize 3D visualization
     * @private
     */
    proto._initVisualization = function() {
        if (!this.elements.canvas || !this.elements.container) {
            console.error('Container or canvas element missing');
            return;
        }
        
        try {
            // Check if Three.js is loaded
            if (typeof THREE === 'undefined') {
                console.warn('Three.js not loaded, attempting to load dynamically');
                this._loadThreeJS();
                return;
            }
            
            // Create scene
            this.threeD.scene = new THREE.Scene();
            this.threeD.scene.background = new THREE.Color(0x0a0a14);
            
            // Create camera
            const aspect = this.config.width / this.config.height;
            this.threeD.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 2000);
            this.threeD.camera.position.set(0, 0, 150);
            
            // Create renderer
            this.threeD.renderer = new THREE.WebGLRenderer({
                canvas: this.elements.canvas,
                antialias: true,
                alpha: true
            });
            this.threeD.renderer.setSize(this.config.width, this.config.height);
            this.threeD.renderer.setPixelRatio(window.devicePixelRatio);
            
            // Add orbit controls
            this.threeD.controls = new THREE.OrbitControls(
                this.threeD.camera, 
                this.threeD.renderer.domElement
            );
            this.threeD.controls.enableDamping = true;
            this.threeD.controls.dampingFactor = 0.05;
            this.threeD.controls.rotateSpeed = 0.5;
            
            // Create lighting
            this._createLighting();
            
            // Create mechanism
            this._createMechanism();
            
            // Create quantum field
            if (this.config.enableQuantumEffects) {
                this._createQuantumField();
            }
            
            // Initialize state
            this.state.isInitialized = true;
            this._renderScene();
            
        } catch (error) {
            console.error('Error initializing 3D visualization:', error);
            this.state.errorState = error.message;
        }
    };
    
    /**
     * Create lighting for the scene
     * @private
     */
    proto._createLighting = function() {
        // Main directional light (sun-like)
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(50, 50, 50);
        this.threeD.scene.add(mainLight);
        this.threeD.lights.push(mainLight);
        
        // Ambient light for overall illumination
        const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
        this.threeD.scene.add(ambientLight);
        this.threeD.lights.push(ambientLight);
        
        // Add phi-harmonic point lights
        for (let i = 0; i < 3; i++) {
            const phiAngle = TWO_PI * i / PHI;
            const pointLight = new THREE.PointLight(PHI_COLORS[1], 0.5, 200);
            const x = 30 * Math.cos(phiAngle);
            const y = 30 * Math.sin(phiAngle);
            pointLight.position.set(x, y, 30);
            this.threeD.scene.add(pointLight);
            this.threeD.lights.push(pointLight);
        }
    };
    
    /**
     * Create the 3D mechanism
     * @private
     */
    proto._createMechanism = function() {
        // Create the main frame
        this._createFrame();
        
        // Create the gears
        this._createGears();
        
        // Create the dials
        this._createDials();
        
        // Create zodiac ring
        this._createZodiacRing();
        
        // Create planets
        this._createPlanets();
        
        // Create decorative elements
        this._createDecorativeElements();
    };
    
    /**
     * Create mechanism frame
     * @private
     */
    proto._createFrame = function() {
        // Create main frame (back plate)
        const frameGeometry = new THREE.CylinderGeometry(60, 60, 10, 32);
        const frameMaterial = new THREE.MeshPhongMaterial({
            color: 0x2c2c3e,
            metalness: 0.7,
            roughness: 0.3
        });
        
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.rotation.x = Math.PI / 2;
        this.threeD.scene.add(frame);
        
        // Create front glass (transparent)
        const glassGeometry = new THREE.CylinderGeometry(58, 58, 2, 32);
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.0,
            roughness: 0.1,
            transparent: true,
            opacity: 0.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });
        
        const glass = new THREE.Mesh(glassGeometry, glassMaterial);
        glass.position.z = 25;
        glass.rotation.x = Math.PI / 2;
        this.threeD.scene.add(glass);
        
        // Create a ring around the mechanism
        const ringGeometry = new THREE.TorusGeometry(60, 3, 16, 100);
        const ringMaterial = new THREE.MeshPhongMaterial({
            color: 0xa97142, // φ² Resonance color
            metalness: 0.7,
            roughness: 0.2
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        this.threeD.scene.add(ring);
        
        // Add phi-harmonic decorative markings to the frame
        this._addPhiMarkings(frame);
    };
    
    /**
     * Add phi-harmonic markings to an object
     * @param {THREE.Object3D} object - Object to add markings to
     * @private
     */
    proto._addPhiMarkings = function(object) {
        // Create a group for markings
        const markingsGroup = new THREE.Group();
        
        // Add phi-spaced markers around the circumference
        const markerCount = 21; // Fibonacci number
        
        for (let i = 0; i < markerCount; i++) {
            const angle = (i * TWO_PI * PHI) % TWO_PI;
            const radius = 60;
            
            // Calculate marker position
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            
            // Create marker geometry
            const markerGeometry = new THREE.BoxGeometry(1, 5, 2);
            const markerMaterial = new THREE.MeshPhongMaterial({
                color: PHI_COLORS[i % PHI_COLORS.length]
            });
            
            const marker = new THREE.Mesh(markerGeometry, markerMaterial);
            marker.position.set(x, 0, y);
            marker.rotation.y = angle;
            
            markingsGroup.add(marker);
        }
        
        // Create phi spiral
        const spiralPoints = [];
        const spiralSteps = 89; // Fibonacci number
        
        for (let i = 0; i < spiralSteps; i++) {
            const angle = 0.1 * i;
            const radius = 0.2 * i * (1 / PHI);
            const x = radius * Math.cos(angle);
            const y = 0.1;
            const z = radius * Math.sin(angle);
            
            spiralPoints.push(new THREE.Vector3(x, y, z));
        }
        
        const spiralGeometry = new THREE.BufferGeometry().setFromPoints(spiralPoints);
        const spiralMaterial = new THREE.LineBasicMaterial({
            color: PHI_COLORS[1], // Creation color
            linewidth: 2
        });
        
        const spiral = new THREE.Line(spiralGeometry, spiralMaterial);
        spiral.position.y = 5;
        markingsGroup.add(spiral);
        
        // Add markings to the scene
        this.threeD.scene.add(markingsGroup);
    };
    
    /**
     * Create mechanism gears
     * @private
     */
    proto._createGears = function() {
        const gearGroup = new THREE.Group();
        
        // Create main drive gear
        const mainGear = this._createGear(40, 60, 0x3c3c5c);
        mainGear.position.z = 5;
        gearGroup.add(mainGear);
        this.threeD.gears.push({
            mesh: mainGear,
            radius: 40,
            teeth: 60,
            angle: 0,
            speed: 1 / 365.25, // 1 revolution per year
            axis: new THREE.Vector3(0, 0, 1),
            parent: null
        });
        
        // Create sun gear
        const sunGear = this._createGear(15, 30, 0xd4af37);
        sunGear.position.set(0, 0, 10);
        gearGroup.add(sunGear);
        this.threeD.gears.push({
            mesh: sunGear,
            radius: 15,
            teeth: 30,
            angle: 0,
            speed: 1, // 1 revolution per day
            axis: new THREE.Vector3(0, 0, 1),
            parent: null
        });
        
        // Create moon gear
        const moonGear = this._createGear(10, 24, 0xaaaaaa);
        moonGear.position.set(25, 0, 15);
        gearGroup.add(moonGear);
        this.threeD.gears.push({
            mesh: moonGear,
            radius: 10,
            teeth: 24,
            angle: 0,
            speed: 1 / 29.5305, // Synodic month
            axis: new THREE.Vector3(0, 0, 1),
            parent: 0 // Main gear is parent
        });
        
        // Add planetary gears
        const planetPositions = [
            {name: 'Mercury', radius: 6, teeth: 18, color: 0xbbbbbb, distance: 20, speed: 1/87.969},
            {name: 'Venus', radius: 8, teeth: 20, color: 0xeedd99, distance: 30, speed: 1/224.701},
            {name: 'Mars', radius: 7, teeth: 22, color: 0xdd4422, distance: 35, speed: 1/686.98},
            {name: 'Jupiter', radius: 12, teeth: 28, color: 0xddaa88, distance: 40, speed: 1/4332.59},
            {name: 'Saturn', radius: 11, teeth: 26, color: 0xccbb99, distance: 45, speed: 1/10759.22}
        ];
        
        // Create planetary gears
        for (let i = 0; i < planetPositions.length; i++) {
            const planet = planetPositions[i];
            const angle = TWO_PI * i / planetPositions.length;
            
            const x = planet.distance * Math.cos(angle);
            const y = planet.distance * Math.sin(angle);
            
            const planetGear = this._createGear(planet.radius, planet.teeth, planet.color);
            planetGear.position.set(x, y, 15);
            gearGroup.add(planetGear);
            
            this.threeD.gears.push({
                mesh: planetGear,
                radius: planet.radius,
                teeth: planet.teeth,
                angle: angle,
                speed: planet.speed,
                axis: new THREE.Vector3(0, 0, 1),
                parent: 0, // Main gear is parent
                name: planet.name
            });
        }
        
        // Add intermediate phi gears (connecting gears with teeth ratios based on phi)
        const phiGearPositions = [
            {radius: 10 * PHI_SQUARED, teeth: 34, color: PHI_COLORS[0], position: new THREE.Vector3(-20, 15, 10)},
            {radius: 10 * PHI, teeth: 21, color: PHI_COLORS[1], position: new THREE.Vector3(20, 15, 10)},
            {radius: 10, teeth: 13, color: PHI_COLORS[2], position: new THREE.Vector3(0, -25, 10)}
        ];
        
        for (const gear of phiGearPositions) {
            const phiGear = this._createGear(gear.radius, gear.teeth, gear.color);
            phiGear.position.copy(gear.position);
            gearGroup.add(phiGear);
            
            this.threeD.gears.push({
                mesh: phiGear,
                radius: gear.radius,
                teeth: gear.teeth,
                angle: 0,
                speed: PHI / 365.25, // Phi-related speed
                axis: new THREE.Vector3(0, 0, 1),
                parent: 0 // Main gear is parent
            });
        }
        
        // Add gearGroup to scene
        this.threeD.scene.add(gearGroup);
    };
    
    /**
     * Create a single gear
     * @param {Number} radius - Gear radius
     * @param {Number} teeth - Number of teeth
     * @param {Number} color - Gear color
     * @returns {THREE.Mesh} - Gear mesh
     * @private
     */
    proto._createGear = function(radius, teeth, color) {
        // Create a TorusGeometry as the base of the gear
        const gearGeometry = new THREE.TorusGeometry(radius, radius * 0.1, 8, teeth);
        const gearMaterial = new THREE.MeshPhongMaterial({
            color: color,
            metalness: 0.8,
            roughness: 0.2,
            side: THREE.DoubleSide
        });
        
        const gear = new THREE.Mesh(gearGeometry, gearMaterial);
        
        // Add teeth to the gear
        const teethGroup = new THREE.Group();
        const toothHeight = radius * 0.15;
        const toothWidth = 2 * Math.PI * radius / teeth * 0.5;
        
        for (let i = 0; i < teeth; i++) {
            const angle = (i / teeth) * Math.PI * 2;
            const toothGeometry = new THREE.BoxGeometry(toothWidth, toothHeight, radius * 0.1);
            const tooth = new THREE.Mesh(toothGeometry, gearMaterial);
            
            // Position the tooth at the edge of the gear
            tooth.position.x = (radius + toothHeight / 2) * Math.cos(angle);
            tooth.position.y = (radius + toothHeight / 2) * Math.sin(angle);
            tooth.rotation.z = angle;
            
            teethGroup.add(tooth);
        }
        
        // Create a group for the complete gear
        const completeGear = new THREE.Group();
        completeGear.add(gear);
        completeGear.add(teethGroup);
        
        // Add a central hole
        const holeGeometry = new THREE.CylinderGeometry(radius * 0.2, radius * 0.2, radius * 0.2, 16);
        const holeMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000,
            metalness: 0.5,
            roughness: 0.5
        });
        
        const hole = new THREE.Mesh(holeGeometry, holeMaterial);
        hole.rotation.x = Math.PI / 2;
        completeGear.add(hole);
        
        // Rotate gear to face forward
        completeGear.rotation.x = Math.PI / 2;
        
        return completeGear;
    };
    
    /**
     * Create quantum field visualization
     * @private
     */
    proto._createQuantumField = function() {
        // Create a group for quantum field effects
        this.threeD.quantumField = new THREE.Group();
        this.threeD.scene.add(this.threeD.quantumField);
        
        // Create phi-harmonic resonance patterns
        this._createResonancePatterns();
        
        // Create quantum entanglement visualizations
        this._createEntanglementLines();
        
        // Create time crystal visualization
        this._createTimeCrystal();
        
        // Create quantum probability field
        this._createProbabilityField();
    };
    
    /**
     * Create phi-harmonic resonance patterns
     * @private
     */
    proto._createResonancePatterns = function() {
        // Create a group for resonance patterns
        const resonanceGroup = new THREE.Group();
        this.threeD.quantumField.add(resonanceGroup);
        this.threeD.resonancePatterns = resonanceGroup;
        
        // Create patterns for each phi-harmonic frequency
        for (let i = 0; i < PHI_FREQUENCIES.length; i++) {
            const frequency = PHI_FREQUENCIES[i];
            const color = PHI_COLORS[i];
            const phiPower = Math.pow(PHI, i);
            
            // Create a cymatic pattern geometry based on frequency
            const segments = 64;
            const geometry = new THREE.BufferGeometry();
            const vertices = [];
            const colors = [];
            
            for (let j = 0; j < segments; j++) {
                const angle = (j / segments) * TWO_PI;
                
                // Calculate radius based on cymatic pattern formula
                // r = base * (1 + sum(amp_n * sin(n * theta + phase_n)))
                const baseRadius = 30 + (i * 5);
                let radius = baseRadius;
                
                // Add frequency-based variations (cymatic patterns)
                for (let n = 1; n <= i + 3; n++) {
                    const ampFactor = 0.15 * Math.pow(0.7, n);
                    const amplitude = baseRadius * ampFactor;
                    const phase = (n * frequency % 360) * (Math.PI / 180);
                    radius += amplitude * Math.sin(n * angle + phase);
                }
                
                // Position vertex
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const z = 5 + (i * 2); // Stack patterns at different depths
                
                vertices.push(x, y, z);
                
                // Add color with slight variation
                const colorObj = new THREE.Color(color);
                colors.push(colorObj.r, colorObj.g, colorObj.b);
            }
            
            // Connect the last point to the first to close the loop
            vertices.push(vertices[0], vertices[1], vertices[2]);
            colors.push(colors[0], colors[1], colors[2]);
            
            // Create geometry attributes
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            
            // Create material for the pattern
            const material = new THREE.LineBasicMaterial({
                vertexColors: true,
                linewidth: 2,
                transparent: true,
                opacity: 0.1 + (i * 0.1) // Higher frequencies are more visible
            });
            
            // Create the line and add to group
            const pattern = new THREE.Line(geometry, material);
            pattern.userData = {
                frequency: frequency,
                phiPower: i,
                baseScale: 1.0,
                baseOpacity: material.opacity
            };
            
            resonanceGroup.add(pattern);
            
            // Store reference to pattern
            this.threeD.resonancePatterns[frequency] = pattern;
        }
        
        // Initially hide all patterns except for the current frequency
        this._updateResonancePatterns();
    };
    
    /**
     * Create quantum entanglement visualization lines
     * @private
     */
    proto._createEntanglementLines = function() {
        // Create a group for entanglement lines
        const entanglementGroup = new THREE.Group();
        this.threeD.quantumField.add(entanglementGroup);
        this.threeD.entanglementLines = entanglementGroup;
        
        // We'll create lines between celestial bodies based on quantum entanglement
        const linesMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });
        
        // Create entanglement pairs (initially empty)
        const pairs = [
            { name: 'sun-moon', points: [new THREE.Vector3(), new THREE.Vector3()], color: 0xd4af37 },
            { name: 'mercury-venus', points: [new THREE.Vector3(), new THREE.Vector3()], color: 0x1a1a2e },
            { name: 'earth-mars', points: [new THREE.Vector3(), new THREE.Vector3()], color: 0x4b7f52 }
        ];
        
        // Create line for each pair
        pairs.forEach(pair => {
            const geometry = new THREE.BufferGeometry().setFromPoints(pair.points);
            const material = new THREE.LineBasicMaterial({
                color: pair.color,
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending
            });
            
            const line = new THREE.Line(geometry, material);
            line.userData = { pairName: pair.name, points: pair.points };
            entanglementGroup.add(line);
        });
    };
    
    /**
     * Create time crystal visualization
     * @private
     */
    proto._createTimeCrystal = function() {
        // Create time crystal geometry
        const size = 5;
        const crystalGeometry = new THREE.TetrahedronGeometry(size);
        
        // Create material with time-varying properties
        const crystalMaterial = new THREE.MeshPhongMaterial({
            color: 0x8a2be2,
            emissive: 0x3a0a6e,
            specular: 0xffffff,
            shininess: 100,
            transparent: true,
            opacity: 0.7
        });
        
        // Create mesh
        const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
        crystal.position.set(0, 0, -20);
        
        // Add to quantum field
        this.threeD.quantumField.add(crystal);
        this.threeD.timeCrystal = crystal;
        
        // Create orbital rings around time crystal
        const ringCount = 3;
        const rings = [];
        
        for (let i = 0; i < ringCount; i++) {
            const ringGeometry = new THREE.TorusGeometry(
                size + 2 + (i * 3), // Radius
                0.1, // Tube radius
                16, // Radial segments
                64 // Tubular segments
            );
            
            const ringMaterial = new THREE.MeshPhongMaterial({
                color: PHI_COLORS[i * 2],
                emissive: PHI_COLORS[i * 2],
                emissiveIntensity: 0.2,
                transparent: true,
                opacity: 0.5 - (i * 0.1)
            });
            
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            
            // Rotate each ring differently
            ring.rotation.x = Math.PI / 2 + (i * Math.PI / 4);
            ring.rotation.y = i * Math.PI / 3;
            
            crystal.add(ring);
            rings.push(ring);
        }
        
        this.threeD.timeCrystalRings = rings;
    };
    
    /**
     * Create quantum probability field
     * @private
     */
    proto._createProbabilityField = function() {
        // Create particle system for quantum probability field
        const particleCount = 500;
        const particles = new THREE.BufferGeometry();
        
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        // Create particles at random positions with colors based on phi frequencies
        for (let i = 0; i < particleCount; i++) {
            // Random position within a sphere
            const radius = 50 + (Math.random() * 30);
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
            
            // Random color based on phi frequencies
            const colorIndex = Math.floor(Math.random() * PHI_COLORS.length);
            const color = new THREE.Color(PHI_COLORS[colorIndex]);
            
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            // Random size
            sizes[i] = 0.5 + (Math.random() * 2);
        }
        
        // Set geometry attributes
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
        particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Create shader material for particles
        const particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0xffffff) },
                pointTexture: { value: new THREE.TextureLoader().load('/CQIL/assets/textures/particle.png') },
                time: { value: 0.0 },
                coherence: { value: 0.5 }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 customColor;
                varying vec3 vColor;
                uniform float time;
                uniform float coherence;
                
                void main() {
                    vColor = customColor;
                    
                    // Add slight movement based on time and coherence
                    vec3 posModified = position;
                    float timeScale = time * 0.2;
                    float coherenceFactor = mix(0.2, 0.05, coherence);
                    
                    posModified.x += sin(position.z * 0.1 + timeScale) * coherenceFactor * position.y;
                    posModified.y += cos(position.x * 0.1 + timeScale) * coherenceFactor * position.z;
                    posModified.z += sin(position.y * 0.1 + timeScale) * coherenceFactor * position.x;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(posModified, 1.0);
                    gl_PointSize = size * coherence * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                uniform sampler2D pointTexture;
                uniform float coherence;
                
                varying vec3 vColor;
                
                void main() {
                    gl_FragColor = vec4(color * vColor, coherence * 0.6);
                    gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
                }
            `,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });
        
        // Create particle system
        const particleSystem = new THREE.Points(particles, particleMaterial);
        this.threeD.quantumField.add(particleSystem);
        this.threeD.probabilityField = particleSystem;
    };
    
    /**
     * Update quantum visualization based on coherence
     * @private
     */
    proto._updateCoherence = function() {
        if (!this.threeD.quantumField || !this.state.coherence) return;
        
        const coherence = this.state.coherence;
        
        // Update resonance patterns
        this._updateResonancePatterns();
        
        // Update time crystal
        if (this.threeD.timeCrystal) {
            // Scale and rotation based on coherence
            const scale = 1 + (coherence * 0.5);
            this.threeD.timeCrystal.scale.set(scale, scale, scale);
            
            // Update emission intensity
            this.threeD.timeCrystal.material.emissiveIntensity = 0.2 + (coherence * 0.8);
            
            // Update rings
            this.threeD.timeCrystalRings.forEach((ring, i) => {
                ring.rotation.z += (0.002 * (i + 1) * coherence);
                ring.material.opacity = 0.2 + (coherence * 0.3);
            });
        }
        
        // Update probability field
        if (this.threeD.probabilityField) {
            const material = this.threeD.probabilityField.material;
            material.uniforms.time.value += 0.05;
            material.uniforms.coherence.value = coherence;
        }
        
        // Update entanglement lines
        this._updateEntanglementLines();
    };
    
    /**
     * Update phi-harmonic resonance patterns
     * @private
     */
    proto._updateResonancePatterns = function() {
        // If the patterns haven't been created yet, skip
        if (!this.threeD.resonancePatterns) return;
        
        // Get current frequency
        const currentFrequency = this.config.frequency || 528; // Default to Creation frequency
        
        // Update each pattern's visibility based on proximity to current frequency
        for (let i = 0; i < PHI_FREQUENCIES.length; i++) {
            const frequency = PHI_FREQUENCIES[i];
            const pattern = this.threeD.resonancePatterns[frequency];
            
            if (!pattern) continue;
            
            // Calculate visibility based on frequency proximity
            const frequencyDiff = Math.abs(frequency - currentFrequency);
            const maxDiff = 200;
            const proximityFactor = Math.max(0, 1 - (frequencyDiff / maxDiff));
            
            // Also factor in coherence
            const coherenceFactor = this.state.coherence || 0.5;
            const combinedFactor = proximityFactor * coherenceFactor;
            
            // Update pattern
            pattern.material.opacity = pattern.userData.baseOpacity * combinedFactor;
            
            // Adjust scale slightly based on coherence
            const scaleAdjust = 1 + (coherenceFactor * 0.2);
            pattern.scale.set(scaleAdjust, scaleAdjust, 1);
            
            // Rotate pattern based on frequency
            pattern.rotation.z += 0.001 * (i + 1) * coherenceFactor;
        }
    };
    
    /**
     * Update entanglement lines between celestial objects
     * @private
     */
    proto._updateEntanglementLines = function() {
        if (!this.threeD.entanglementLines) return;
        
        // Get positions of celestial bodies
        const celestialPositions = this._getCelestialPositions();
        if (!celestialPositions) return;
        
        // Get current coherence
        const coherence = this.state.coherence || 0.5;
        
        // Update each entanglement line
        this.threeD.entanglementLines.children.forEach(line => {
            const pairName = line.userData.pairName;
            const points = line.userData.points;
            
            // Get celestial body positions
            const [body1, body2] = pairName.split('-');
            const pos1 = celestialPositions[body1];
            const pos2 = celestialPositions[body2];
            
            if (pos1 && pos2) {
                // Update line points
                points[0].copy(pos1);
                points[1].copy(pos2);
                
                // Update line geometry
                line.geometry.setFromPoints(points);
                
                // Update line opacity based on coherence and special relationship
                let lineOpacity = coherence * 0.3;
                
                // Special case for sun-moon pair (showing lunar phase)
                if (pairName === 'sun-moon' && this.astronomy && this.astronomy.positions) {
                    // Enhance opacity during special alignments (like new/full moon)
                    const lunarPhase = this.astronomy.positions.lunarPhase;
                    const alignment = 1 - (Math.min(Math.abs(lunarPhase), Math.abs(lunarPhase - 1)) * 2);
                    lineOpacity *= (1 + alignment);
                }
                
                line.material.opacity = lineOpacity;
            }
        });
    };
    
    /**
     * Helper method to get celestial body positions
     * @returns {Object} - Map of celestial body positions
     * @private
     */
    proto._getCelestialPositions = function() {
        // If we don't have gears representing celestial bodies, return null
        if (!this.threeD.gears || this.threeD.gears.length < 3) return null;
        
        const positions = {};
        
        // Map gear names to positions
        this.threeD.gears.forEach(gear => {
            if (gear.name && gear.mesh) {
                // Get world position of the gear
                const position = new THREE.Vector3();
                gear.mesh.getWorldPosition(position);
                positions[gear.name.toLowerCase()] = position;
            }
        });
        
        // Add sun at center if not already present
        if (!positions.sun) {
            positions.sun = new THREE.Vector3(0, 0, 0);
        }
        
        return positions;
    };
    
    /**
     * Update gears animation
     * @param {Number} deltaTime - Time since last update in seconds
     * @private
     */
    proto._updateGears = function(deltaTime) {
        if (!this.threeD.gears || !this.state.isAnimating) return;
        
        // Calculate time scale based on animation speed
        const timeScale = this.config.animationSpeed * deltaTime;
        
        // Update each gear rotation
        this.threeD.gears.forEach(gear => {
            // Skip if no mesh
            if (!gear.mesh) return;
            
            // Calculate rotation angle
            const rotationAmount = gear.speed * timeScale;
            
            // Create rotation quaternion
            const rotationQ = new THREE.Quaternion();
            rotationQ.setFromAxisAngle(gear.axis, rotationAmount);
            
            // Apply rotation
            gear.mesh.quaternion.multiply(rotationQ);
            
            // Update gear angle
            gear.angle = (gear.angle + rotationAmount) % TWO_PI;
        });
    };
    
    /**
     * Update animation frame
     * @param {Number} deltaTime - Time since last update in seconds
     * @private
     */
    proto._updateAnimation = function(deltaTime) {
        // Update gears
        this._updateGears(deltaTime);
        
        // Update quantum effects
        if (this.config.enableQuantumEffects) {
            this._updateCoherence();
        }
        
        // Update astronomical displays
        this._updateAstronomicalDisplays();
        
        // Update controls
        if (this.threeD.controls) {
            this.threeD.controls.update();
        }
    };
    
    /**
     * Update astronomical displays
     * @private
     */
    proto._updateAstronomicalDisplays = function() {
        // Skip if we don't have astronomical data
        if (!this.astronomy || !this.astronomy.positions) return;
        
        // Update sun position
        if (this.threeD.sunObject) {
            // Sun is fixed at center in this visualization
        }
        
        // Update moon position
        if (this.threeD.moonObject && this.astronomy.positions.moon) {
            const moonPosition = this._calculateMoonPosition();
            if (moonPosition) {
                this.threeD.moonObject.position.copy(moonPosition);
            }
            
            // Update moon phase visualization
            this._updateMoonPhase();
        }
        
        // Update planet positions
        if (this.threeD.planetObjects && this.astronomy.positions.planets) {
            for (const planet in this.astronomy.positions.planets) {
                if (this.threeD.planetObjects[planet]) {
                    const planetPosition = this._calculatePlanetPosition(planet);
                    if (planetPosition) {
                        this.threeD.planetObjects[planet].position.copy(planetPosition);
                    }
                }
            }
        }
    };
    
    /**
     * Map a frequency to a phi-harmonic color
     * @param {Number} frequency - Input frequency
     * @returns {Number} - Color hex value
     * @private
     */
    proto._getFrequencyColor = function(frequency) {
        // Find closest phi-harmonic frequency
        let closestIndex = 0;
        let closestDiff = Infinity;
        
        for (let i = 0; i < PHI_FREQUENCIES.length; i++) {
            const diff = Math.abs(PHI_FREQUENCIES[i] - frequency);
            if (diff < closestDiff) {
                closestDiff = diff;
                closestIndex = i;
            }
        }
        
        return PHI_COLORS[closestIndex];
    };
    
    /**
     * Set visualization frequency
     * @param {Number} frequency - Phi-harmonic frequency
     * @public
     */
    proto.setVisualizationFrequency = function(frequency) {
        // Get nearest phi-harmonic frequency
        const nearestPhiFreq = this._getNearestPhiFrequency(frequency);
        
        // Update config
        this.config.frequency = nearestPhiFreq;
        
        // Update canvas attributes
        if (this.elements.canvas) {
            const phiIndex = PHI_FREQUENCIES.indexOf(nearestPhiFreq);
            if (phiIndex >= 0) {
                const phiStates = ['ground', 'creation', 'heart', 'voice', 'vision', 'unity'];
                this.elements.canvas.setAttribute('data-phi-state', phiStates[phiIndex]);
                this.elements.canvas.setAttribute('data-phi-frequency', String(nearestPhiFreq));
                this.elements.canvas.setAttribute('data-phi-power', String(phiIndex));
            }
        }
        
        // Update audio frequency if enabled
        if (this.config.enableAudio && this.audioNodes.oscillators) {
            this._updateAudioFrequencies();
        }
        
        // Update visualization elements
        if (this.threeD.scene) {
            // Update background color slightly based on frequency
            const bgColor = new THREE.Color(0x0a0a14);
            const freqColor = new THREE.Color(this._getFrequencyColor(nearestPhiFreq));
            bgColor.lerp(freqColor, 0.05);
            this.threeD.scene.background = bgColor;
            
            // Update resonance patterns
            this._updateResonancePatterns();
        }
    };
    
    /**
     * Helper method to find nearest phi-harmonic frequency
     * @param {Number} frequency - Input frequency
     * @returns {Number} - Nearest phi-harmonic frequency
     * @private
     */
    proto._getNearestPhiFrequency = function(frequency) {
        if (!frequency) return 528; // Default to Creation frequency
        
        let nearest = PHI_FREQUENCIES[0];
        let minDiff = Math.abs(frequency - nearest);
        
        for (let i = 1; i < PHI_FREQUENCIES.length; i++) {
            const diff = Math.abs(frequency - PHI_FREQUENCIES[i]);
            if (diff < minDiff) {
                minDiff = diff;
                nearest = PHI_FREQUENCIES[i];
            }
        }
        
        return nearest;
    };
})();
