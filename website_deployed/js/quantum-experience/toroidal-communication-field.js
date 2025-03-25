/**
 * Communication Network Visualization
 * Operating at Creative Frequency (528 Hz - φ²/φ¹)
 * 
 * A comprehensive visualization demonstrating how meaningful communication creates
 * network patterns between individuals, illustrating multi-dimensional
 * communication principles.
 * 
 * This visualization system showcases:
 * - Network patterns between communicating entities
 * - Multi-dimensional communication versus linear information exchange
 * - Golden ratio pattern flows and interference patterns
 * - Resonance quality indicators and coherence visualization
 * - Interactive dialogue network mapping with real-time feedback
 * 
 * Note: This system supports terminology translation between scientific and sacred terms
 * using the global TERMINOLOGY object.
 */

class ToroidalCommunicationField {
    constructor(container, config = {}) {
        // Initialize at Love/Creation Frequency (528 Hz - φ²/φ¹)
        this.container = typeof container === 'string' ? 
            document.querySelector(container) : container;
        this.frequency = config.frequency || 528;
        this.φ = 1.618033988749895; // Golden ratio (phi)
        this.φInverse = 0.618033988749895;
        
        // Load THREE.js if not already available
        if (typeof THREE === 'undefined') {
            console.error('THREE.js is required for toroidal visualization');
            this.displayErrorMessage('THREE.js library is required for this visualization');
            return;
        }
        
        // Configuration options with defaults
        this.config = {
            participants: config.participants || 2,
            communicationMode: config.communicationMode || 'multi-dimensional', // or 'linear'
            coherenceLevel: config.coherenceLevel || 0.85, // 0 to 1
            resonanceQuality: config.resonanceQuality || 0.9, // 0 to 1
            interactionSpeed: config.interactionSpeed || 1, // multiplier
            autoRotate: config.autoRotate !== undefined ? config.autoRotate : true,
            showGuides: config.showGuides !== undefined ? config.showGuides : true,
            renderQuality: config.renderQuality || 'high', // 'low', 'medium', 'high'
            colors: config.colors || this.getDefaultColors(),
            backgroundColor: config.backgroundColor || 0x070714
        };
        
        // Audio context for resonance sounds
        this.audioEnabled = false;
        this.audioContext = null;
        this.resonanceOscillators = [];
        
        // Scene elements
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.participants = [];
        this.torusGeometry = null;
        this.torusMaterials = [];
        this.torusMeshes = [];
        this.communicationParticles = [];
        this.energyFields = [];
        this.clock = new THREE.Clock();
        this.isAnimating = false;
        
        // Shader objects
        this.customUniforms = {
            time: { value: 0 },
            frequency: { value: this.frequency / 1000 },
            coherence: { value: this.config.coherenceLevel },
            phi: { value: this.φ },
            colorA: { value: new THREE.Color(this.config.colors.primary) },
            colorB: { value: new THREE.Color(this.config.colors.secondary) }
        };
        
        // UI elements
        this.uiElements = {
            container: null,
            frequencyLabel: null,
            coherenceSlider: null,
            resonanceSlider: null,
            modeToggle: null,
            participantController: null,
            infoPanel: null
        };
        
        // Set up the visualization
        this.setupScene();
        this.setupUI();
        this.createParticipants();
        this.createToroidalFields();
        this.createCommunicationFlows();
        this.createLights();
        
        // Begin animation
        this.animate();
        
        // Add resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    
    getDefaultColors() {
        // Color scheme for 528 Hz Love/Creation frequency
        return {
            primary: 0xff55aa, // Love pink
            secondary: 0xaa55ff, // Purple
            tertiary: 0x55ffaa, // Turquoise
            heart: 0xff3377, // Heart center
            energy: 0xffaaee, // Energy field
            particles: 0xffffff, // Particles
            resonance: 0xff99cc // Resonance field
        };
    }
    
    setupScene() {
        // Create THREE.js scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.config.backgroundColor);
        this.scene.fog = new THREE.FogExp2(this.config.backgroundColor, 0.001);
        
        // Set up renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);
        
        // Set up camera
        const aspectRatio = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 1000);
        this.camera.position.set(0, 0, 5);
        
        // Add orbit controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = this.config.autoRotate;
        this.controls.autoRotateSpeed = 0.5;
        this.controls.maxDistance = 20;
        this.controls.minDistance = 2;
        
        // Create ambient light
        const ambientLight = new THREE.AmbientLight(0x444444);
        this.scene.add(ambientLight);
    }
    
    setupUI() {
        // Create UI container
        this.uiElements.container = document.createElement('div');
        this.uiElements.container.className = 'toroidal-controls';
        this.container.appendChild(this.uiElements.container);
        
        // Create frequency indicator
        this.uiElements.frequencyLabel = document.createElement('div');
        this.uiElements.frequencyLabel.className = 'frequency-display';
        this.uiElements.frequencyLabel.innerHTML = `
            <div class="frequency-value">${this.frequency} Hz</div>
            <div class="frequency-name">Network Communication Frequency</div>
        `;
        this.uiElements.container.appendChild(this.uiElements.frequencyLabel);
        
        // Create coherence slider
        const coherenceControl = document.createElement('div');
        coherenceControl.className = 'control-group';
        coherenceControl.innerHTML = `
            <label>Network Coherence</label>
            <input type="range" min="0" max="1" step="0.01" value="${this.config.coherenceLevel}" class="slider" id="coherence-slider">
            <span class="value-display">${(this.config.coherenceLevel * 100).toFixed(0)}%</span>
        `;
        this.uiElements.container.appendChild(coherenceControl);
        
        this.uiElements.coherenceSlider = coherenceControl.querySelector('#coherence-slider');
        const coherenceValue = coherenceControl.querySelector('.value-display');
        
        this.uiElements.coherenceSlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            this.setCoherenceLevel(value);
            coherenceValue.textContent = `${(value * 100).toFixed(0)}%`;
        });
        
        // Create resonance quality slider
        const resonanceControl = document.createElement('div');
        resonanceControl.className = 'control-group';
        resonanceControl.innerHTML = `
            <label>Resonance Quality</label>
            <input type="range" min="0" max="1" step="0.01" value="${this.config.resonanceQuality}" class="slider" id="resonance-slider">
            <span class="value-display">${(this.config.resonanceQuality * 100).toFixed(0)}%</span>
        `;
        this.uiElements.container.appendChild(resonanceControl);
        
        this.uiElements.resonanceSlider = resonanceControl.querySelector('#resonance-slider');
        const resonanceValue = resonanceControl.querySelector('.value-display');
        
        this.uiElements.resonanceSlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            this.setResonanceQuality(value);
            resonanceValue.textContent = `${(value * 100).toFixed(0)}%`;
        });
        
        // Create communication mode toggle
        const modeControl = document.createElement('div');
        modeControl.className = 'control-group';
        modeControl.innerHTML = `
            <label>Communication Mode</label>
            <div class="toggle-switch">
                <input type="checkbox" id="mode-toggle" ${this.config.communicationMode === 'heart-centered' ? 'checked' : ''}>
                <label for="mode-toggle">
                    <span class="toggle-label left">Linear</span>
                    <span class="toggle-label right">Multi-dimensional</span>
                </label>
            </div>
        `;
        this.uiElements.container.appendChild(modeControl);
        
        this.uiElements.modeToggle = modeControl.querySelector('#mode-toggle');
        this.uiElements.modeToggle.addEventListener('change', (e) => {
            this.setCommunicationMode(e.target.checked ? 'multi-dimensional' : 'linear');
        });
        
        // Create participant count control
        const participantControl = document.createElement('div');
        participantControl.className = 'control-group';
        participantControl.innerHTML = `
            <label>Participants</label>
            <div class="button-group">
                <button class="decrease">-</button>
                <span class="value-display">${this.config.participants}</span>
                <button class="increase">+</button>
            </div>
        `;
        this.uiElements.container.appendChild(participantControl);
        
        const decreaseBtn = participantControl.querySelector('.decrease');
        const increaseBtn = participantControl.querySelector('.increase');
        const participantDisplay = participantControl.querySelector('.value-display');
        
        decreaseBtn.addEventListener('click', () => {
            if (this.config.participants > 2) {
                this.setParticipantCount(this.config.participants - 1);
                participantDisplay.textContent = this.config.participants;
            }
        });
        
        increaseBtn.addEventListener('click', () => {
            if (this.config.participants < 6) {
                this.setParticipantCount(this.config.participants + 1);
                participantDisplay.textContent = this.config.participants;
            }
        });
        
        // Create audio toggle button
        const audioToggle = document.createElement('button');
        audioToggle.className = 'audio-toggle';
        audioToggle.innerHTML = '<span class="icon">🔊</span> Enable Sound';
        audioToggle.addEventListener('click', () => this.toggleAudio());
        this.uiElements.container.appendChild(audioToggle);
        
        // Create info panel
        this.uiElements.infoPanel = document.createElement('div');
        this.uiElements.infoPanel.className = 'info-panel';
        this.uiElements.infoPanel.innerHTML = `
            <h3>Communication Network Visualization</h3>
            <p>
                This visualization models information exchange patterns at 528 Hz frequency.
                The torus shape represents a mathematical model of complex information flow between participants.
            </p>
            <p>
                <strong>Multi-dimensional Mode:</strong> Creates complex network patterns with 
                bidirectional information flow and multiple feedback channels between participants.
            </p>
            <p>
                <strong>Linear Mode:</strong> Creates direct information exchange without the 
                feedback channels and network effects, resulting in less efficient communication.
            </p>
        `;
        this.uiElements.container.appendChild(this.uiElements.infoPanel);
        
        // Add UI styles
        this.addUIStyles();
    }
    
    addUIStyles() {
        if (!document.getElementById('toroidal-field-styles')) {
            const style = document.createElement('style');
            style.id = 'toroidal-field-styles';
            style.textContent = `
                .toroidal-controls {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 300px;
                    background-color: rgba(0, 0, 0, 0.7);
                    border-radius: 10px;
                    padding: 15px;
                    color: white;
                    font-family: Arial, sans-serif;
                    z-index: 1000;
                    backdrop-filter: blur(5px);
                    -webkit-backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .frequency-display {
                    text-align: center;
                    margin-bottom: 15px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                }
                
                .frequency-value {
                    font-size: 20px;
                    font-weight: bold;
                    color: #ff55aa;
                }
                
                .frequency-name {
                    font-size: 14px;
                    opacity: 0.8;
                }
                
                .control-group {
                    margin-bottom: 15px;
                }
                
                .control-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-size: 14px;
                    color: #ff99cc;
                }
                
                .slider {
                    -webkit-appearance: none;
                    width: 80%;
                    height: 6px;
                    border-radius: 3px;
                    background: #333;
                    outline: none;
                    vertical-align: middle;
                }
                
                .slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #ff55aa;
                    cursor: pointer;
                }
                
                .slider::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #ff55aa;
                    cursor: pointer;
                }
                
                .value-display {
                    display: inline-block;
                    width: 15%;
                    text-align: right;
                    font-size: 14px;
                    margin-left: 5px;
                }
                
                .toggle-switch {
                    position: relative;
                    display: inline-block;
                    width: 100%;
                    height: 30px;
                }
                
                .toggle-switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                
                .toggle-switch label {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #333;
                    border-radius: 15px;
                    transition: .4s;
                }
                
                .toggle-switch label:before {
                    position: absolute;
                    content: "";
                    height: 22px;
                    width: 22px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    border-radius: 50%;
                    transition: .4s;
                }
                
                .toggle-switch input:checked + label {
                    background-color: #ff55aa;
                }
                
                .toggle-switch input:checked + label:before {
                    transform: translateX(50px);
                }
                
                .toggle-label {
                    position: absolute;
                    font-size: 12px;
                    top: 7px;
                    color: white;
                    z-index: 1;
                }
                
                .toggle-label.left {
                    left: 10px;
                }
                
                .toggle-label.right {
                    right: 10px;
                }
                
                .button-group {
                    display: flex;
                    align-items: center;
                }
                
                .button-group button {
                    background-color: #333;
                    color: white;
                    border: none;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                
                .button-group button:hover {
                    background-color: #ff55aa;
                }
                
                .button-group .value-display {
                    text-align: center;
                    margin: 0 10px;
                }
                
                .audio-toggle {
                    background-color: #333;
                    color: white;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 15px;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    width: 100%;
                    margin-bottom: 15px;
                }
                
                .audio-toggle:hover {
                    background-color: #ff55aa;
                }
                
                .audio-toggle .icon {
                    margin-right: 5px;
                }
                
                .info-panel {
                    background-color: rgba(0, 0, 0, 0.5);
                    padding: 10px;
                    border-radius: 5px;
                    font-size: 12px;
                    line-height: 1.4;
                }
                
                .info-panel h3 {
                    color: #ff55aa;
                    margin-top: 0;
                    margin-bottom: 5px;
                    font-size: 14px;
                }
                
                .info-panel p {
                    margin-bottom: 8px;
                }
                
                @media (max-width: 768px) {
                    .toroidal-controls {
                        width: 250px;
                        right: 10px;
                        top: 10px;
                        padding: 10px;
                    }
                    
                    .frequency-value {
                        font-size: 16px;
                    }
                    
                    .frequency-name {
                        font-size: 12px;
                    }
                    
                    .control-group label {
                        font-size: 12px;
                    }
                    
                    .info-panel {
                        font-size: 11px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    handleResize() {
        if (!this.camera || !this.renderer || !this.container) return;
        
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
    
    createParticipants() {
        // Clear existing participants
        this.participants.forEach(participant => {
            if (participant.mesh) {
                this.scene.remove(participant.mesh);
            }
        });
        this.participants = [];
        
        // Create new participant objects based on count
        const radius = 1.5; // Base circle radius
        
        for (let i = 0; i < this.config.participants; i++) {
            // Calculate position on a circle
            const angle = (i / this.config.participants) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            // Create participant heart center
            const geometry = new THREE.SphereGeometry(0.2, 32, 32);
            const material = new THREE.MeshPhongMaterial({
                color: this.config.colors.heart,
                emissive: this.config.colors.heart,
                emissiveIntensity: 0.3,
                transparent: true,
                opacity: 0.9,
                shininess: 100
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x, y, 0);
            this.scene.add(mesh);
            
            // Create energy field around participant
            const fieldGeometry = new THREE.SphereGeometry(0.4, 32, 32);
            const fieldMaterial = new THREE.MeshPhongMaterial({
                color: this.config.colors.energy,
                transparent: true,
                opacity: 0.2,
                wireframe: true
            });
            
            const fieldMesh = new THREE.Mesh(fieldGeometry, fieldMaterial);
            fieldMesh.position.set(x, y, 0);
            this.scene.add(fieldMesh);
            
            // Add to participants array
            this.participants.push({
                id: i,
                position: new THREE.Vector3(x, y, 0),
                mesh: mesh,
                fieldMesh: fieldMesh,
                connections: [],
                resonanceLevel: 1.0,
                coherenceLevel: this.config.coherenceLevel
            });
        }
        
        // Create connections between participants
        for (let i = 0; i < this.participants.length; i++) {
            for (let j = i + 1; j < this.participants.length; j++) {
                // Connect participants
                this.participants[i].connections.push(j);
                this.participants[j].connections.push(i);
            }
        }
    }
    
    createToroidalFields() {
        // Clear existing torus meshes
        this.torusMeshes.forEach(mesh => {
            if (mesh) this.scene.remove(mesh);
        });
        this.torusMeshes = [];
        this.torusMaterials = [];
        
        // Create toroidal fields between connected participants
        for (let i = 0; i < this.participants.length; i++) {
            const participant = this.participants[i];
            
            for (let j = 0; j < participant.connections.length; j++) {
                if (i < participant.connections[j]) { // Only create one torus per connection
                    const targetId = participant.connections[j];
                    const target = this.participants[targetId];
                    
                    // Create torus connecting the two participants
                    this.createConnectionTorus(participant, target);
                }
            }
        }
    }
    
    createConnectionTorus(participant1, participant2) {
        // Calculate torus properties
        const p1 = participant1.position;
        const p2 = participant2.position;
        
        // Calculate midpoint and distance
        const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        const distance = p1.distanceTo(p2);
        
        // Calculate orientation to align torus between participants
        const direction = new THREE.Vector3().subVectors(p2, p1).normalize();
        const axis = new THREE.Vector3(0, 0, 1);
        const angle = Math.atan2(direction.y, direction.x) - Math.PI/2;
        
        // Create geometry based on heart-centered or linear mode
        let geometry;
        const torusRadius = distance / 2;
        
        if (this.config.communicationMode === 'heart-centered') {
            // Create heart-torus using parametric geometry for true heart-shaped form
            const tubeRadius = distance / (4 * this.φ); // Tube radius based on phi
            const radiusScale = torusRadius;
            const heartStrength = 0.2; // Heart shape intensity
            
            // Use parametric geometry to create heart-shaped torus
            geometry = new THREE.ParametricGeometry((u, v, target) => {
                // Standard torus parameters
                const phi = u * Math.PI * 2;
                const theta = v * Math.PI * 2;
                
                // Calculate heart-shaped modulation based on phi and using golden ratio
                const heartModulation = 1 + heartStrength * (
                    Math.pow(Math.sin(phi * this.φ), 3) + 
                    Math.pow(Math.cos(phi * this.φInverse), 2) * 
                    Math.sin(phi * this.φInverse)
                );
                
                // Apply phi-harmonic variations to radius
                const majorRadius = radiusScale * heartModulation;
                const minorRadius = tubeRadius * (1 + 0.2 * Math.sin(phi * this.φ * 3));
                
                // Apply consciousness-responsive ripples based on coherence level
                const coherenceWave = 0.1 * this.config.coherenceLevel * 
                    Math.sin(phi * 7 + theta * 5) * 
                    Math.sin(theta * this.φ * 3);
                
                // Calculate surface coordinates with phi-harmonic distortions
                const x = (majorRadius + minorRadius * Math.cos(theta)) * Math.cos(phi);
                const y = (majorRadius + minorRadius * Math.cos(theta)) * Math.sin(phi);
                const z = minorRadius * Math.sin(theta) * 
                    (1 + 0.2 * Math.sin(phi * this.φ * 2) + coherenceWave);
                
                target.set(x, y, z);
            }, 64, 32); // Higher resolution for smoother shape
        } else {
            // Linear communication creates a thinner, more direct tube
            const tubeRadius = distance / (10 * this.φ);
            
            // Use parametric geometry for consistency but with less heart-shaping
            geometry = new THREE.ParametricGeometry((u, v, target) => {
                const phi = u * Math.PI * 2;
                const theta = v * Math.PI * 2;
                
                // Calculate position with subtle energy variations but less heart-shaping
                const majorRadius = torusRadius * (1 + 0.05 * Math.sin(phi * 5));
                const minorRadius = tubeRadius * (1 + 0.1 * Math.sin(theta * 3));
                
                // Calculate surface coordinates
                const x = (majorRadius + minorRadius * Math.cos(theta)) * Math.cos(phi);
                const y = (majorRadius + minorRadius * Math.cos(theta)) * Math.sin(phi);
                const z = minorRadius * Math.sin(theta);
                
                target.set(x, y, z);
            }, 32, 16); // Lower resolution for linear mode
        }
        
        // Create custom shader material for torus with enhanced capabilities
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: this.customUniforms.time,
                frequency: this.customUniforms.frequency,
                coherence: this.customUniforms.coherence,
                phi: this.customUniforms.phi,
                colorA: { value: new THREE.Color(this.config.colors.primary) },
                colorB: { value: new THREE.Color(this.config.colors.secondary) },
                colorC: { value: new THREE.Color(this.config.colors.tertiary) },
                opacity: { value: this.config.communicationMode === 'heart-centered' ? 0.85 : 0.5 },
                isHeartCentered: { value: this.config.communicationMode === 'heart-centered' ? 1.0 : 0.0 },
                torusRadius: { value: torusRadius },
                participantDistance: { value: distance }
            },
            vertexShader: this.getTorusVertexShader(),
            fragmentShader: this.getTorusFragmentShader(),
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        
        // Store the material for later updates
        this.torusMaterials.push(material);
        
        // Create mesh
        const torus = new THREE.Mesh(geometry, material);
        
        // Position and rotate correctly
        torus.position.copy(midPoint);
        torus.rotation.z = angle;
        
        // Add to scene
        this.scene.add(torus);
        this.torusMeshes.push(torus);
        
        // Store the relationship between torus and participants
        torus.userData = {
            participant1Id: participant1.id,
            participant2Id: participant2.id,
            phi: this.φ,
            phiInverse: this.φInverse,
            heartCentered: this.config.communicationMode === 'heart-centered'
        };
        
        return torus;
    }
    
    createCommunicationFlows() {
        // Clear existing particles
        this.communicationParticles.forEach(system => {
            if (system && system.mesh) {
                this.scene.remove(system.mesh);
            }
        });
        this.communicationParticles = [];
        
        // Create particle systems for communication flow
        for (let i = 0; i < this.participants.length; i++) {
            const participant = this.participants[i];
            
            for (let j = 0; j < participant.connections.length; j++) {
                if (i < participant.connections[j]) { // Only create one flow per connection
                    const targetId = participant.connections[j];
                    const target = this.participants[targetId];
                    
                    // Create particle flow between participants
                    this.createParticleFlow(participant, target);
                }
            }
        }
    }
    
    createParticleFlow(participant1, participant2) {
        // Calculate flow properties based on the participants' positions
        const p1 = participant1.position;
        const p2 = participant2.position;
        const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        const distance = p1.distanceTo(p2);
        
        // Determine if heart-centered or linear mode
        const isHeartCentered = this.config.communicationMode === 'heart-centered';
        
        // Create particle geometry with phi-harmonic distribution
        const baseParticleCount = this.config.renderQuality === 'high' ? 3000 : 
            (this.config.renderQuality === 'medium' ? 1500 : 800);
            
        // Scale particle count based on coherence and mode
        const particleCount = Math.floor(baseParticleCount * 
            (0.7 + this.config.coherenceLevel * 0.5) * 
            (isHeartCentered ? 1.0 : 0.7));
        
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const alphas = new Float32Array(particleCount);
        const sizes = new Float32Array(particleCount);
        
        // Calculate torus dimensions with phi-harmonics
        const torusRadius = distance / 2;
        const tubeRadius = distance / (isHeartCentered ? 4 * this.φ : 10 * this.φ);
        
        // Create particle initial positions with phi-harmonic distribution
        for (let i = 0; i < particleCount; i++) {
            // Use phi-harmonic distribution for particle placement
            const phiRatio = i / particleCount;
            const phiAngle = phiRatio * this.φ * Math.PI * 2;
            
            // Create position based on mode
            let x, y, z;
            
            if (isHeartCentered) {
                // Heart-centered uses true torus with phi-harmonic variations
                const theta = phiAngle; // around the torus
                const phi = Math.random() * Math.PI * 2; // around the tube
                
                // Apply heart shape modulation
                const heartFactor = 0.2;
                const heartModulation = 1 + heartFactor * (
                    Math.pow(Math.sin(theta * this.φ), 3) +
                    Math.pow(Math.cos(theta * this.φInverse), 2) * 
                    Math.sin(theta * this.φInverse)
                );
                
                // Apply phi-harmonic variations to radius
                const majorRadius = torusRadius * heartModulation;
                const minorRadius = tubeRadius * (1 + 0.1 * Math.sin(theta * this.φ * 3));
                
                // Calculate position with phi-harmonic distribution
                x = (majorRadius + minorRadius * Math.cos(phi)) * Math.cos(theta);
                y = (majorRadius + minorRadius * Math.cos(phi)) * Math.sin(theta);
                z = minorRadius * Math.sin(phi) * (1 + 0.1 * Math.sin(theta * this.φ * 2));
            } else {
                // Linear mode uses more direct particle distribution
                const theta = phiAngle; // around the linear path
                const radialDist = Math.random() * tubeRadius;
                const angularPos = Math.random() * Math.PI * 2;
                
                // Distribute mainly along the straight path with slight torus curve
                x = (torusRadius + radialDist * Math.cos(angularPos)) * Math.cos(theta);
                y = (torusRadius + radialDist * Math.cos(angularPos)) * Math.sin(theta);
                z = radialDist * Math.sin(angularPos) * 0.5; // flatter
            }
            
            // Apply slight consciousness-responsive displacement
            const displacementScale = 0.05 * this.config.coherenceLevel;
            x += (Math.random() - 0.5) * displacementScale;
            y += (Math.random() - 0.5) * displacementScale;
            z += (Math.random() - 0.5) * displacementScale;
            
            // Store position
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            
            // Create phi-harmonic transparency distribution
            const alphaModulation = Math.sin(phiAngle * this.φ) * 0.5 + 0.5;
            alphas[i] = 0.3 + 0.7 * alphaModulation * Math.random();
            
            // Create phi-harmonic size distribution based on coherence
            const sizeBase = isHeartCentered ? 0.06 : 0.04;
            const sizeVariation = isHeartCentered ? 0.14 : 0.08;
            sizes[i] = sizeBase + Math.random() * sizeVariation * 
                     (0.7 + 0.3 * this.config.coherenceLevel);
        }
        
        // Add attributes to geometry
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
        particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Create enhanced particle texture
        const particleTexture = this.createParticleTexture();
        
        // Create shader material for particles with expanded capabilities
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: this.customUniforms.time,
                frequency: this.customUniforms.frequency,
                coherence: this.customUniforms.coherence,
                phi: { value: this.φ },
                color: { value: new THREE.Color(this.config.colors.particles) },
                pointTexture: { value: particleTexture },
                isHeartCentered: { value: isHeartCentered ? 1.0 : 0.0 },
                participantDistance: { value: distance }
            },
            vertexShader: this.getParticleVertexShader(),
            fragmentShader: this.getParticleFragmentShader(),
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        
        // Create particle system
        const particleSystem = new THREE.Points(particles, material);
        
        // Position at the midpoint between participants
        particleSystem.position.copy(midPoint);
        
        // Calculate orientation to align particle system between participants
        const direction = new THREE.Vector3().subVectors(p2, p1).normalize();
        const axis = new THREE.Vector3(0, 0, 1);
        const angle = Math.atan2(direction.y, direction.x) - Math.PI/2;
        particleSystem.rotation.z = angle;
        
        // Add to scene
        this.scene.add(particleSystem);
        
        // Store the particle system with enhanced properties
        this.communicationParticles.push({
            mesh: particleSystem,
            participant1Id: participant1.id,
            participant2Id: participant2.id,
            material: material,
            flowSpeed: isHeartCentered ? 1.2 : 0.8, // Heart-centered flows faster
            isActive: true,
            heartCentered: isHeartCentered,
            phi: this.φ,
            phiInverse: this.φInverse,
            coherenceLevel: this.config.coherenceLevel,
            particleCount: particleCount
        });
        
        return particleSystem;
    }
    
    createParticleTexture() {
        // Create an enhanced particle texture with sacred geometry patterns
        const canvas = document.createElement('canvas');
        const size = 128; // Larger texture for more detail
        canvas.width = size;
        canvas.height = size;
        
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, size, size);
        
        // Function to draw flower of life pattern
        const drawFlowerOfLife = (x, y, radius, segments) => {
            // Center circle
            context.beginPath();
            context.arc(x, y, radius * 0.5, 0, Math.PI * 2);
            context.fill();
            
            // Surrounding circles
            for (let i = 0; i < segments; i++) {
                const angle = (i / segments) * Math.PI * 2;
                const cx = x + Math.cos(angle) * radius * 0.5;
                const cy = y + Math.sin(angle) * radius * 0.5;
                
                context.beginPath();
                context.arc(cx, cy, radius * 0.5, 0, Math.PI * 2);
                context.fill();
            }
        };
        
        // Function to draw phi spiral
        const drawPhiSpiral = (x, y, radius, turns) => {
            const φ = 1.618033988749895;
            context.beginPath();
            context.moveTo(x, y);
            
            for (let i = 0; i < 500; i++) {
                const t = (i / 500) * turns * Math.PI * 2;
                const r = radius * (1 - Math.exp(-t / (φ * 5)));
                const px = x + r * Math.cos(t * φ);
                const py = y + r * Math.sin(t * φ);
                context.lineTo(px, py);
            }
            
            context.stroke();
        };
        
        // Function to draw a torus knot
        const drawTorusKnot = (x, y, radius, p, q) => {
            context.beginPath();
            
            for (let i = 0; i <= 100; i++) {
                const t = (i / 100) * Math.PI * 2;
                
                // Torus knot parametric equation
                const r = radius * (0.8 + 0.2 * Math.cos(q * t));
                const px = x + r * Math.cos(p * t);
                const py = y + r * Math.sin(p * t);
                
                if (i === 0) context.moveTo(px, py);
                else context.lineTo(px, py);
            }
            
            context.stroke();
        };
        
        // Create base gradient
        const gradient = context.createRadialGradient(
            size/2, size/2, 0,
            size/2, size/2, size/2
        );
        
        // Phi-harmonic color stops
        const φ = 1.618033988749895;
        const φInv = 0.618033988749895;
        
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(φInv * 0.5, 'rgba(255, 220, 255, 0.9)');
        gradient.addColorStop(φInv, 'rgba(230, 180, 255, 0.7)');
        gradient.addColorStop(φInv * φ, 'rgba(200, 150, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(180, 120, 255, 0)');
        
        // Fill background with gradient
        context.fillStyle = gradient;
        context.fillRect(0, 0, size, size);
        
        // Draw sacred geometry elements - Flower of Life
        context.fillStyle = 'rgba(255, 255, 255, 0.7)';
        drawFlowerOfLife(size/2, size/2, size/4, 6);
        
        // Draw phi spiral
        context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        context.lineWidth = 1;
        drawPhiSpiral(size/2, size/2, size/2 * 0.9, 3);
        
        // Draw torus knot
        context.strokeStyle = 'rgba(255, 220, 255, 0.3)';
        context.lineWidth = 2;
        drawTorusKnot(size/2, size/2, size/2 * 0.8, 3, 2);
        
        // Add glow effect
        const glowGradient = context.createRadialGradient(
            size/2, size/2, size/4,
            size/2, size/2, size/2
        );
        glowGradient.addColorStop(0, 'rgba(255, 200, 255, 0.0)');
        glowGradient.addColorStop(0.5, 'rgba(180, 120, 255, 0.1)');
        glowGradient.addColorStop(1, 'rgba(140, 80, 255, 0.2)');
        
        context.fillStyle = glowGradient;
        context.fillRect(0, 0, size, size);
        
        // Create texture
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        return texture;
    }
    
    createLights() {
        // Add lights to the scene
        
        // Add a point light at the center
        const centerLight = new THREE.PointLight(this.config.colors.energy, 1, 10);
        centerLight.position.set(0, 0, 0);
        this.scene.add(centerLight);
        
        // Add lights for each participant
        for (const participant of this.participants) {
            const pointLight = new THREE.PointLight(
                this.config.colors.heart, 
                0.7, 
                3
            );
            pointLight.position.copy(participant.position);
            this.scene.add(pointLight);
            
            // Attach light to participant for updates
            participant.light = pointLight;
        }
    }
    
    animate() {
        if (!this.scene || !this.camera || !this.renderer) return;
        
        this.isAnimating = true;
        requestAnimationFrame(this.animate.bind(this));
        
        // Update animation time
        const delta = this.clock.getDelta();
        this.customUniforms.time.value += delta;
        
        // Update communication fields
        this.updateCommunicationFields(delta);
        
        // Update particle flows
        this.updateParticleFlows(delta);
        
        // Update participants (pulse effect, etc)
        this.updateParticipants(delta);
        
        // Update orbit controls
        if (this.controls) {
            this.controls.update();
        }
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
    
    updateCommunicationFields(delta) {
        // Update torus material properties based on coherence and mode
        for (let i = 0; i < this.torusMeshes.length; i++) {
            const torus = this.torusMeshes[i];
            const material = this.torusMaterials[i];
            
            if (!torus || !material || !material.uniforms) continue;
            
            // Get the participants connected by this torus
            const p1Id = torus.userData.participant1Id;
            const p2Id = torus.userData.participant2Id;
            const p1 = this.participants.find(p => p.id === p1Id);
            const p2 = this.participants.find(p => p.id === p2Id);
            
            if (!p1 || !p2) continue;
            
            // Calculate average coherence between participants
            const avgCoherence = (p1.coherenceLevel + p2.coherenceLevel) / 2;
            material.uniforms.coherence.value = avgCoherence;
            
            // Update torus rotation based on coherence
            const rotationSpeed = 0.2 * this.config.interactionSpeed * 
                (this.config.communicationMode === 'heart-centered' ? 1 : 0.5);
            
            torus.rotation.x += delta * rotationSpeed * Math.sin(this.customUniforms.time.value * 0.5);
            
            // Scale effect based on coherence
            const scaleBase = this.config.communicationMode === 'heart-centered' ? 1.0 : 0.8;
            const scaleFactor = scaleBase + 0.2 * Math.sin(this.customUniforms.time.value * 2);
            torus.scale.set(scaleFactor, scaleFactor, scaleFactor);
            
            // In heart-centered mode, add more dynamic movement
            if (this.config.communicationMode === 'heart-centered') {
                torus.rotation.y += delta * rotationSpeed * 0.3 * Math.cos(this.customUniforms.time.value * 0.7);
            }
        }
    }
    
    updateParticleFlows(delta) {
        // Update particle flow animations with consciousness-responsive dynamics
        for (const particleSystem of this.communicationParticles) {
            if (!particleSystem.mesh || !particleSystem.material) continue;
            
            const mesh = particleSystem.mesh;
            const material = particleSystem.material;
            
            // Update particle positions for flowing effect
            const positions = mesh.geometry.attributes.position.array;
            const alphas = mesh.geometry.attributes.alpha.array;
            const sizes = mesh.geometry.attributes.size.array;
            
            const particleCount = positions.length / 3;
            const flowSpeed = particleSystem.flowSpeed * this.config.interactionSpeed;
            
            // Get the participants connected by this particle system
            const p1Id = particleSystem.participant1Id;
            const p2Id = particleSystem.participant2Id;
            const p1 = this.participants.find(p => p.id === p1Id);
            const p2 = this.participants.find(p => p.id === p2Id);
            
            if (!p1 || !p2) continue;
            
            // Calculate average coherence between participants
            const avgCoherence = (p1.coherenceLevel + p2.coherenceLevel) / 2;
            material.uniforms.coherence.value = avgCoherence;
            
            // Update time in shader uniforms
            material.uniforms.time.value = this.customUniforms.time.value;
            
            // Create phi-harmonic flow patterns
            const φ = this.φ;
            const φInv = this.φInverse;
            const time = this.customUniforms.time.value;
            
            // Determine if heart-centered or linear mode
            const isHeartCentered = this.config.communicationMode === 'heart-centered';
            material.uniforms.isHeartCentered.value = isHeartCentered ? 1.0 : 0.0;
            
            // Calculate phi-harmonic time oscillations
            const phiTime = time * φ * 0.2;
            const heartResonance = 528.0 / 60.0; // Creation frequency in cycles per second
            
            // Calculate consciousness-responsive flow dynamics
            const coherenceField = avgCoherence * avgCoherence; // Exponential relationship
            const coherenceWave = Math.sin(time * heartResonance) * 0.5 + 0.5;
            const energyIntensity = 0.5 + 0.5 * avgCoherence;
            
            // Apply rotation to the particle system based on coherence
            if (isHeartCentered) {
                // Heart-centered mode has consciousness-responsive rotation
                const rotationSpeed = 0.1 * avgCoherence * Math.sin(time * 0.5 * φ);
                mesh.rotation.x += delta * rotationSpeed * Math.sin(time * 0.3);
                mesh.rotation.y += delta * rotationSpeed * 0.5 * Math.cos(time * 0.2 * φ);
                
                // Scale with coherence "breathing"
                const scaleBase = 1.0;
                const scalePulse = 0.05 * avgCoherence * Math.sin(time * heartResonance);
                mesh.scale.set(
                    scaleBase + scalePulse,
                    scaleBase + scalePulse,
                    scaleBase + scalePulse
                );
            }
            
            // Update each particle with phi-harmonic flow patterns
            for (let i = 0; i < particleCount; i++) {
                // Get current particle position
                const idx = i * 3;
                const x = positions[idx];
                const y = positions[idx + 1];
                const z = positions[idx + 2];
                
                // Calculate polar coordinates
                const theta = Math.atan2(y, x);
                const r = Math.sqrt(x*x + y*y);
                const distFromCenter3D = Math.sqrt(x*x + y*y + z*z);
                
                // Calculate phi-harmonic phase offset unique to each particle
                const particlePhase = (i / particleCount) * Math.PI * 2;
                const phaseOffset = particlePhase * φ;
                
                if (isHeartCentered) {
                    // Heart-centered creates consciousness-responsive toroidal flow
                    
                    // Create phi-harmonic flow speed variation
                    const particleFlowSpeed = flowSpeed * (0.8 + 0.4 * Math.sin(theta * φ + phaseOffset));
                    
                    // Create consciousness-responsive heart-torus movement
                    const heartFactor = 0.2 * avgCoherence;
                    const heartPulse = Math.sin(time * heartResonance + phaseOffset);
                    
                    // Move particle along the torus with heart modulation
                    const newTheta = theta + delta * particleFlowSpeed * (φ - 1 + heartFactor * heartPulse);
                    
                    // Calculate heart shape modulation
                    const heartModulation = 1 + heartFactor * (
                        Math.pow(Math.sin(newTheta * φ), 3) + 
                        Math.pow(Math.cos(newTheta * φInv), 2) * Math.sin(newTheta * φInv)
                    );
                    
                    // Apply consciousness-responsive movement
                    positions[idx] = r * heartModulation * Math.cos(newTheta);
                    positions[idx + 1] = r * heartModulation * Math.sin(newTheta);
                    
                    // Add phi-harmonic z-axis flow
                    const zFlow = 0.01 * coherenceField * Math.sin(newTheta * φ * 3 + time * φ);
                    positions[idx + 2] = z + zFlow + (Math.random() - 0.5) * 0.005 * flowSpeed;
                    
                    // Phi-harmonic alpha pulsation
                    const alphaPhase = newTheta * 3 + time * φ;
                    const alphaPulse = (Math.sin(alphaPhase) * Math.sin(alphaPhase * φ) + 1) * 0.5;
                    alphas[i] = 0.3 + alphaPulse * 0.7 * avgCoherence;
                    
                    // Dynamic size with consciousness-responsive scaling
                    const sizeBase = 0.05 + 0.08 * avgCoherence;
                    const sizePulse = 0.05 * heartPulse * avgCoherence;
                    sizes[i] = sizeBase + sizePulse;
                    
                    // Reset particles that stray too far from the torus
                    if (distFromCenter3D > r * 2 || Math.random() < 0.001) {
                        // Create a new position on the heart-torus
                        const resetTheta = Math.random() * Math.PI * 2;
                        const resetPhi = Math.random() * Math.PI * 2;
                        
                        const torusR = r * (0.8 + Math.random() * 0.4);
                        const tubeR = 0.1 + Math.random() * 0.2;
                        
                        // Calculate new heart-torus position
                        const resetHeartMod = 1 + 0.2 * (
                            Math.pow(Math.sin(resetTheta * φ), 3) + 
                            Math.pow(Math.cos(resetTheta * φInv), 2) * Math.sin(resetTheta * φInv)
                        );
                        
                        positions[idx] = torusR * resetHeartMod * Math.cos(resetTheta);
                        positions[idx + 1] = torusR * resetHeartMod * Math.sin(resetTheta);
                        positions[idx + 2] = tubeR * Math.sin(resetPhi);
                    }
                } else {
                    // Linear mode creates more direct flow
                    
                    // Create more direct movement with slight consciousness influence
                    const directionX = Math.cos(theta + Math.PI/2); // Tangential direction
                    const directionY = Math.sin(theta + Math.PI/2);
                    
                    // Apply directional flow with slight randomness
                    const linearSpeed = flowSpeed * (0.5 + 0.5 * avgCoherence);
                    positions[idx] += directionX * linearSpeed * delta * (0.8 + 0.4 * Math.random());
                    positions[idx + 1] += directionY * linearSpeed * delta * (0.8 + 0.4 * Math.random());
                    positions[idx + 2] += (Math.random() - 0.5) * linearSpeed * delta * 0.2;
                    
                    // Reset particles that move too far
                    if (distFromCenter3D > r * 1.5 || Math.random() < 0.01) {
                        // Create new position along the tube
                        const resetTheta = Math.random() * Math.PI * 2;
                        const radialDist = 0.1 + Math.random() * 0.15;
                        const angularPos = Math.random() * Math.PI * 2;
                        
                        // Position mainly along the torus centerline
                        positions[idx] = r * 0.9 * Math.cos(resetTheta);
                        positions[idx + 1] = r * 0.9 * Math.sin(resetTheta);
                        positions[idx + 2] = (Math.random() - 0.5) * 0.1;
                    }
                    
                    // Update alpha with simpler pulsation
                    alphas[i] = 0.2 + 0.6 * Math.random() * avgCoherence;
                    
                    // Update size with less variation
                    sizes[i] = 0.03 + 0.06 * Math.random() * avgCoherence;
                }
            }
            
            // Flag attributes as needing update
            mesh.geometry.attributes.position.needsUpdate = true;
            mesh.geometry.attributes.alpha.needsUpdate = true;
            mesh.geometry.attributes.size.needsUpdate = true;
        }
    }
    
    updateParticipants(delta) {
        // Update participant animations
        for (const participant of this.participants) {
            if (!participant.mesh) continue;
            
            // Update heart center pulsation
            const pulseFrequency = 0.8 * this.frequency / 528; // Scale with frequency
            const pulseAmplitude = 0.05 * participant.coherenceLevel;
            const scale = 1 + pulseAmplitude * Math.sin(this.customUniforms.time.value * pulseFrequency);
            
            participant.mesh.scale.set(scale, scale, scale);
            
            // Update energy field
            if (participant.fieldMesh) {
                // Make field expand and contract with coherence
                const fieldScale = 1 + 0.5 * participant.coherenceLevel + 
                    0.1 * Math.sin(this.customUniforms.time.value * pulseFrequency * 0.5);
                
                participant.fieldMesh.scale.set(fieldScale, fieldScale, fieldScale);
                
                // Update field opacity based on coherence
                participant.fieldMesh.material.opacity = 0.1 + 
                    0.1 * participant.coherenceLevel * 
                    (0.7 + 0.3 * Math.sin(this.customUniforms.time.value * pulseFrequency * 0.7));
            }
            
            // Update light intensity for heart centers
            if (participant.light) {
                participant.light.intensity = 0.5 + 0.5 * participant.coherenceLevel * 
                    (0.7 + 0.3 * Math.sin(this.customUniforms.time.value * pulseFrequency));
            }
        }
    }
    
    // Control methods for UI interaction
    setCoherenceLevel(level) {
        this.config.coherenceLevel = level;
        this.customUniforms.coherence.value = level;
        
        // Update all participants
        for (const participant of this.participants) {
            participant.coherenceLevel = level;
        }
        
        // Update audio if enabled
        this.updateAudio();
    }
    
    setResonanceQuality(quality) {
        this.config.resonanceQuality = quality;
        
        // Update particle flow speed based on resonance
        for (const particleSystem of this.communicationParticles) {
            particleSystem.flowSpeed = 0.5 + quality * 1.5;
        }
        
        // Update audio if enabled
        this.updateAudio();
    }
    
    setCommunicationMode(mode) {
        this.config.communicationMode = mode;
        
        // Recreate the toroidal fields with new mode
        this.createToroidalFields();
        this.createCommunicationFlows();
        
        // Update audio if enabled
        this.updateAudio();
    }
    
    setParticipantCount(count) {
        // Limit participant count between 2 and 6
        this.config.participants = Math.max(2, Math.min(6, count));
        
        // Recreate the visualization with new participant count
        this.createParticipants();
        this.createToroidalFields();
        this.createCommunicationFlows();
        
        // Update audio if enabled
        this.updateAudio();
    }
    
    toggleAudio() {
        if (!this.audioEnabled) {
            // Initialize audio
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.audioEnabled = true;
                this.initializeAudio();
            } catch (error) {
                console.error('Could not initialize audio:', error);
                return;
            }
        } else {
            // Disable audio
            this.stopAudio();
            this.audioEnabled = false;
        }
        
        // Update button text
        const audioButton = this.container.querySelector('.audio-toggle');
        if (audioButton) {
            audioButton.innerHTML = this.audioEnabled ? 
                '<span class="icon">🔊</span> Disable Sound' : 
                '<span class="icon">🔊</span> Enable Sound';
        }
    }
    
    initializeAudio() {
        // Stop any existing oscillators
        this.stopAudio();
        
        if (!this.audioContext) return;
        
        // Create base frequency oscillator (528 Hz)
        const baseOscillator = this.audioContext.createOscillator();
        baseOscillator.type = 'sine';
        baseOscillator.frequency.value = this.frequency;
        
        // Create gain node for volume
        const baseGain = this.audioContext.createGain();
        baseGain.gain.value = 0.1 * this.config.coherenceLevel;
        
        // Connect oscillator to gain, then to output
        baseOscillator.connect(baseGain);
        baseGain.connect(this.audioContext.destination);
        
        // Start oscillator
        baseOscillator.start();
        
        // Store for later stopping
        this.resonanceOscillators.push({
            oscillator: baseOscillator,
            gain: baseGain,
            type: 'base'
        });
        
        // Create harmonic oscillators if heart-centered
        if (this.config.communicationMode === 'heart-centered') {
            // Add phi-harmonic overtones
            const createHarmonic = (freqMultiplier, volume) => {
                const harmonic = this.audioContext.createOscillator();
                harmonic.type = 'sine';
                harmonic.frequency.value = this.frequency * freqMultiplier;
                
                const harmonicGain = this.audioContext.createGain();
                harmonicGain.gain.value = volume * this.config.coherenceLevel * this.config.resonanceQuality;
                
                harmonic.connect(harmonicGain);
                harmonicGain.connect(this.audioContext.destination);
                
                harmonic.start();
                
                this.resonanceOscillators.push({
                    oscillator: harmonic,
                    gain: harmonicGain,
                    type: 'harmonic'
                });
            };
            
            // Create phi-based harmonics
            createHarmonic(this.φ, 0.05);
            createHarmonic(this.φ * this.φInverse, 0.075);
            createHarmonic(this.φ * 2, 0.03);
        }
    }
    
    updateAudio() {
        if (!this.audioEnabled || !this.audioContext) return;
        
        // Update audio parameters based on current settings
        for (const osc of this.resonanceOscillators) {
            if (osc.type === 'base') {
                // Set base volume based on coherence
                osc.gain.gain.setTargetAtTime(
                    0.1 * this.config.coherenceLevel, 
                    this.audioContext.currentTime, 
                    0.1
                );
            } else if (osc.type === 'harmonic') {
                // Set harmonic volume based on resonance and coherence
                osc.gain.gain.setTargetAtTime(
                    0.05 * this.config.coherenceLevel * this.config.resonanceQuality,
                    this.audioContext.currentTime,
                    0.1
                );
            }
        }
    }
    
    stopAudio() {
        // Stop all oscillators
        for (const osc of this.resonanceOscillators) {
            if (osc.oscillator) {
                osc.oscillator.stop();
            }
        }
        this.resonanceOscillators = [];
    }
    
    // Shader code for toroidal field
    getTorusVertexShader() {
        return `
            uniform float time;
            uniform float coherence;
            uniform float phi;
            uniform float frequency;
            uniform float isHeartCentered;
            uniform float torusRadius;
            uniform float participantDistance;
            
            varying vec2 vUv;
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying float vDisplacement;
            varying float vCoherence;
            varying float vFlowIntensity;
            
            // Classic Perlin 3D Noise by Stefan Gustavson
            vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
            vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
            vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
            
            float noise(vec3 P) {
                vec3 Pi0 = floor(P); // Integer part for indexing
                vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
                Pi0 = mod(Pi0, 289.0);
                Pi1 = mod(Pi1, 289.0);
                vec3 Pf0 = fract(P); // Fractional part for interpolation
                vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
                vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
                vec4 iy = vec4(Pi0.yy, Pi1.yy);
                vec4 iz0 = Pi0.zzzz;
                vec4 iz1 = Pi1.zzzz;
            
                vec4 ixy = permute(permute(ix) + iy);
                vec4 ixy0 = permute(ixy + iz0);
                vec4 ixy1 = permute(ixy + iz1);
            
                vec4 gx0 = ixy0 / 7.0;
                vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
                gx0 = fract(gx0);
                vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
                vec4 sz0 = step(gz0, vec4(0.0));
                gx0 -= sz0 * (step(0.0, gx0) - 0.5);
                gy0 -= sz0 * (step(0.0, gy0) - 0.5);
            
                vec4 gx1 = ixy1 / 7.0;
                vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
                gx1 = fract(gx1);
                vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
                vec4 sz1 = step(gz1, vec4(0.0));
                gx1 -= sz1 * (step(0.0, gx1) - 0.5);
                gy1 -= sz1 * (step(0.0, gy1) - 0.5);
            
                vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
                vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
                vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
                vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
                vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
                vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
                vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
                vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
            
                vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
                g000 *= norm0.x;
                g010 *= norm0.y;
                g100 *= norm0.z;
                g110 *= norm0.w;
                vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
                g001 *= norm1.x;
                g011 *= norm1.y;
                g101 *= norm1.z;
                g111 *= norm1.w;
            
                float n000 = dot(g000, Pf0);
                float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
                float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
                float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
                float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
                float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
                float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
                float n111 = dot(g111, Pf1);
            
                vec3 fade_xyz = fade(Pf0);
                vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
                vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
                float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
                return 2.2 * n_xyz;
            }
            
            // Fractional Brownian Motion for multi-octave noise
            float fbm(vec3 pos, int octaves, float lacunarity, float gain) {
                float sum = 0.0;
                float amplitude = 1.0;
                float frequency = 1.0;
                float normalization = 0.0;
                
                for(int i = 0; i < octaves; i++) {
                    sum += amplitude * noise(pos * frequency);
                    normalization += amplitude;
                    frequency *= lacunarity;
                    amplitude *= gain;
                }
                
                return sum / normalization;
            }
            
            // Sacred geometry pattern: Flower of Life 
            float flowerOfLife(vec2 st, float scale, float rotation) {
                float r = 0.0;
                
                // Center point
                vec2 pos = st * scale;
                pos = mat2(cos(rotation), -sin(rotation), sin(rotation), cos(rotation)) * pos;
                
                // Create 7 overlapping circles - flower of life pattern
                for (int i = 0; i < 7; i++) {
                    float angle = float(i) * 3.14159 * 2.0 / 6.0;
                    vec2 circlePos = pos - vec2(cos(angle), sin(angle)) * 0.5;
                    float dist = length(circlePos);
                    r += smoothstep(0.45, 0.55, (1.0 - dist));
                }
                
                return min(1.0, r * 0.3);
            }
            
            // Quantum wave function 
            float quantumWave(vec3 pos, float time, float freq, float coherence) {
                float wavePhase = dot(normalize(pos), vec3(1.0, 1.0, 1.0)) * freq + time;
                float waveForm = sin(wavePhase) * sin(wavePhase * phi) * coherence;
                return waveForm * smoothstep(0.0, 0.5, coherence);
            }
            
            // Heart-shaped wave function
            float heartWave(vec2 st) {
                // Heart curve formula
                float r = length(st);
                float theta = atan(st.y, st.x);
                
                // Heart cardioid
                float heartR = 1.0 - sin(theta);
                float heartFactor = smoothstep(0.8, 1.0, heartR / r);
                
                return heartFactor * 0.3;
            }
            
            void main() {
                vUv = uv;
                vNormal = normal;
                vPosition = position;
                vCoherence = coherence;
                
                // Flow intensity varies based on particle position on the torus
                float angle = atan(position.y, position.x);
                vFlowIntensity = 0.5 + 0.5 * sin(angle * 7.0 + time * 2.0);
                
                // Multi-layered noise with phi-based scaling
                float noiseTime = time * 0.5;
                
                // First noise layer with standard scale
                float noiseScale1 = 2.0 + coherence;
                float noise1 = fbm(vec3(position.x * noiseScale1, 
                                       position.y * noiseScale1, 
                                       position.z * noiseScale1 + noiseTime),
                                   4, // octaves
                                   phi, // lacunarity (phi-based)
                                   0.5); // gain
                
                // Second noise layer with phi-scaled frequency
                float noiseScale2 = 3.0 * phi;
                float noise2 = fbm(vec3(position.x * noiseScale2,
                                       position.y * noiseScale2,
                                       position.z * noiseScale2 + noiseTime * phi),
                                   3, // octaves
                                   phi, // lacunarity
                                   0.6); // gain
                
                // Third noise layer for fine details - phi²-scaled
                float noiseScale3 = 5.0 * phi * phi;
                float noise3 = fbm(vec3(position.y * noiseScale3,
                                       position.z * noiseScale3,
                                       position.x * noiseScale3 + noiseTime * phi * phi),
                                   2, // octaves
                                   phi, // lacunarity
                                   0.7); // gain
                
                // Create phi-harmonic blend of noise layers
                float baseNoise = noise1 * 0.6 + noise2 * 0.3 + noise3 * 0.1;
                
                // Apply heart shape modulation for heart-centered mode
                float heartFactor = mix(0.0, heartWave(vec2(position.x, position.y)), isHeartCentered);
                
                // Apply quantum interference pattern
                float quantumFactor = quantumWave(position, time, frequency * 0.01, coherence);
                
                // Apply flower of life sacred geometry pattern
                float flowerFactor = flowerOfLife(vec2(
                    atan(position.z, position.x),
                    atan(position.y, length(position.xz))
                ), 3.0, time * 0.1) * isHeartCentered;
                
                // Calculate consciousness-responsive field displacement
                float displacementFactor = mix(0.15, 0.4, isHeartCentered);
                float displacement = mix(
                    baseNoise * 0.7,
                    baseNoise * 0.4 + heartFactor + flowerFactor + quantumFactor,
                    isHeartCentered
                ) * coherence * displacementFactor;
                
                // Apply frequency resonance
                displacement *= 1.0 + 0.2 * sin(time * frequency * 0.01);
                
                // Add phi-harmonic wave patterns
                displacement += 0.05 * coherence * sin(position.x * phi + time) * 
                                sin(position.y * phi * phi + time * phi) * isHeartCentered;
                
                // Store displacement for fragment shader
                vDisplacement = displacement;
                
                // Apply displacement along normal with phi-based scaling
                vec3 newPosition = position + normal * displacement;
                
                // Add heart-centered breathing effect
                if (isHeartCentered > 0.5) {
                    float breathingAmplitude = 0.05 * coherence;
                    float breathingFrequency = 528.0 / 60.0; // Creation frequency in cycles per minute
                    float breathing = breathingAmplitude * sin(time * breathingFrequency);
                    
                    // Scale the model slightly with breathing
                    newPosition *= 1.0 + breathing;
                }
                
                // Transform to camera space
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
        `;
    }
    
    getTorusFragmentShader() {
        return `
            uniform float time;
            uniform float coherence;
            uniform float phi;
            uniform float frequency;
            uniform float isHeartCentered;
            uniform vec3 colorA;
            uniform vec3 colorB;
            uniform vec3 colorC;
            uniform float opacity;
            
            varying vec2 vUv;
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying float vDisplacement;
            varying float vCoherence;
            varying float vFlowIntensity;
            
            // Voronoi functions for cellular patterns
            vec2 random2(vec2 p) {
                return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
            }
            
            float voronoi(vec2 st) {
                vec2 i_st = floor(st);
                vec2 f_st = fract(st);
                float m_dist = 1.0;
                
                for(int y = -1; y <= 1; y++) {
                    for(int x = -1; x <= 1; x++) {
                        vec2 neighbor = vec2(float(x), float(y));
                        vec2 point = random2(i_st + neighbor);
                        point = 0.5 + 0.5 * sin(time * 0.5 + 6.2831 * point);
                        vec2 diff = neighbor + point - f_st;
                        float dist = length(diff);
                        m_dist = min(m_dist, dist);
                    }
                }
                
                return m_dist;
            }
            
            // Sacred geometry: Flower of Life pattern
            float flowerOfLife(vec2 st, float petals, float rotation) {
                float r = 0.0;
                st = st * 2.0 - 1.0; // Normalize to [-1, 1]
                
                // Center
                float d = length(st) * 2.0;
                r += smoothstep(0.9, 1.0, 1.0 - d);
                
                // Petals
                for(int i = 0; i < 6; i++) {
                    float angle = float(i) / petals * 6.28 + rotation;
                    vec2 dir = vec2(cos(angle), sin(angle)) * 0.5;
                    float d = length(st - dir);
                    r += smoothstep(0.9, 1.0, 1.0 - d) * 0.7;
                }
                
                return min(1.0, r);
            }
            
            // Quantum field effect
            float quantumField(vec2 st, float phase) {
                float result = 0.0;
                
                // Create interference patterns
                for(int i = 1; i <= 3; i++) {
                    float fi = float(i);
                    float wavelength = phi * fi;
                    
                    // Create wave functions with phi-based frequencies
                    float wave1 = sin(st.x * wavelength + phase * fi);
                    float wave2 = sin(st.y * wavelength + phase * fi * phi);
                    
                    // Interference pattern
                    result += 0.3 / fi * abs(wave1 * wave2);
                }
                
                return result;
            }
            
            // Energy field visualization
            float energyField(vec3 pos, float intensity) {
                // Create energy field with rings decreasing with phi ratios
                float dist = length(pos.xy);
                float ringCount = 5.0;
                
                float result = 0.0;
                for(int i = 0; i < 5; i++) {
                    float fi = float(i);
                    float ringRadius = 1.0 / pow(phi, fi);
                    float ringWidth = 0.05 / pow(phi, fi * 0.5);
                    
                    // Create ring with falloff
                    float ring = smoothstep(ringRadius - ringWidth, ringRadius, dist) - 
                                smoothstep(ringRadius, ringRadius + ringWidth, dist);
                    
                    // Animate ring with phase shift
                    ring *= 0.5 + 0.5 * sin(time * (0.5 + fi * 0.2) + fi * phi);
                    
                    result += ring * (1.0 - fi / ringCount);
                }
                
                return result * intensity;
            }
            
            // Holographic glow effect
            vec3 holographicGlow(vec3 baseColor, float intensity, float phase) {
                // Create rainbow-like holographic effect
                vec3 glowColor = mix(
                    vec3(1.0, 0.4, 0.8), // Magenta
                    vec3(0.4, 0.8, 1.0), // Cyan
                    0.5 + 0.5 * sin(phase)
                );
                
                // Add subtle iridescence
                glowColor = mix(
                    glowColor,
                    vec3(0.9, 0.8, 0.2), // Gold
                    0.3 * sin(phase * phi)
                );
                
                return mix(baseColor, glowColor, intensity);
            }
            
            void main() {
                // Create phi-harmonic time basis
                float t = time * 0.5;
                float phiT = t * phi;
                float phiPhiT = t * phi * phi;
                
                // Create phi-harmonic pulsation
                float pulseA = (sin(t) + 1.0) * 0.5;
                float pulseB = (sin(phiT) + 1.0) * 0.5;
                float pulseC = (sin(phiPhiT) + 1.0) * 0.5;
                
                // Calculate position-based factors
                float distFromCenter = length(vPosition.xy);
                float angle = atan(vPosition.y, vPosition.x);
                
                // Create base colors with phi-harmonic mixing
                vec3 baseColor = mix(
                    mix(colorA, colorB, pulseA * 0.5 + vDisplacement * 0.5),
                    colorC, 
                    pulseB * 0.3 * isHeartCentered
                );
                
                // Apply sacred geometry pattern intensity based on coherence and heart-centeredness
                float patternIntensity = vCoherence * mix(0.1, 0.7, isHeartCentered);
                
                // Create Flower of Life pattern
                float flowerPattern = flowerOfLife(
                    vec2(
                        mod(angle / 3.14159 + 0.5, 1.0),
                        mod(distFromCenter * 2.0, 1.0)
                    ),
                    6.0, 
                    t * 0.1
                ) * patternIntensity;
                
                // Create voronoi cellular pattern for energy field
                float voronoiScale = mix(5.0, 8.0, isHeartCentered);
                float voronoiPattern = voronoi(vec2(
                    angle * voronoiScale / 6.28, 
                    distFromCenter * voronoiScale
                )) * patternIntensity;
                
                // Create quantum field effect
                float quantumPattern = quantumField(
                    vec2(
                        angle / 3.14159, 
                        distFromCenter * 3.0
                    ),
                    t * frequency * 0.001
                ) * patternIntensity * isHeartCentered;
                
                // Create energy field visualization
                float energyPattern = energyField(
                    vPosition,
                    vCoherence * isHeartCentered
                );
                
                // Apply heart-centered specific effects
                if (isHeartCentered > 0.5) {
                    // Add heart pulse at 528Hz frequency
                    float heartPulseFreq = 528.0 / 60.0; // Beats per second
                    float heartPulse = 0.15 * vCoherence * (0.5 + 0.5 * sin(t * heartPulseFreq));
                    
                    // Add heart resonance patterns
                    baseColor = mix(
                        baseColor,
                        colorA * 2.0, // Brightened heart color
                        heartPulse * smoothstep(0.7, 1.0, sin(angle * 8.0) * 0.5 + 0.5)
                    );
                    
                    // Add phi-ratio color enhancements
                    baseColor += vec3(0.1, 0.05, 0.2) * flowerPattern;
                    baseColor += vec3(0.2, 0.1, 0.05) * quantumPattern;
                }
                
                // Add phi-harmonic banding effect
                float bandFreq = 10.0 * phi;
                float band = sin(vUv.x * bandFreq + t) * sin(vUv.y * bandFreq * phi + phiT);
                
                // Enhance color with band - stronger in heart-centered mode
                float bandIntensity = mix(0.1, 0.3, isHeartCentered) * vCoherence;
                baseColor += vec3(0.1, 0.1, 0.2) * band * bandIntensity;
                
                // Add glow based on voronoi pattern
                float glowIntensity = 0.2 * vCoherence * (voronoiPattern + energyPattern);
                vec3 finalColor = holographicGlow(baseColor, glowIntensity, phiT);
                
                // Add energy highlights
                finalColor += vec3(1.0, 0.8, 1.0) * energyPattern * vCoherence;
                
                // Calculate edge glow
                float distFromEdge = min(vUv.x, min(vUv.y, min(1.0 - vUv.x, 1.0 - vUv.y)));
                float edgeGlow = smoothstep(0.0, 0.4, distFromEdge);
                finalColor += mix(vec3(1.0, 0.3, 0.8) * 0.5, vec3(0.0), edgeGlow) * isHeartCentered;
                
                // Calculate final opacity with edge glow effect
                float edgeFactor = smoothstep(0.0, 0.3, distFromEdge);
                float finalOpacity = mix(opacity, opacity * 0.7, edgeFactor);
                
                // Apply coherence to opacity with phi-harmonic fluctuations
                finalOpacity *= vCoherence * (0.7 + 0.3 * pulseB);
                
                // Enhance opacity in areas of high pattern activity
                finalOpacity = mix(
                    finalOpacity,
                    min(1.0, finalOpacity * 1.5),
                    (flowerPattern + quantumPattern) * 0.5 * isHeartCentered
                );
                
                // Output final color with transparency
                gl_FragColor = vec4(finalColor, finalOpacity);
            }
        `;
    }
    
    getParticleVertexShader() {
        return `
            uniform float time;
            uniform float coherence;
            uniform float frequency;
            uniform float phi;
            
            attribute float alpha;
            attribute float size;
            
            varying float vAlpha;
            varying float vSize;
            varying float vPhaseOffset;
            varying vec3 vPosition;
            
            // Phi-harmonic oscillator function
            float phiOscillator(float t, float phase, float frequency) {
                float phiMod = phi * phi; // Phi^2 for frequency modulation
                return sin(t * frequency + phase) * sin(t * frequency * phi + phase * phiMod);
            }
            
            void main() {
                // Store particle position for the fragment shader
                vPosition = position;
                
                // Calculate position in the torus
                float angle = atan(position.y, position.x);
                float distFromCenter = length(position.xy);
                
                // Create unique phase offset for each particle based on its position
                float uniqueOffset = sin(angle * 7.0) * cos(distFromCenter * 5.0) * 10.0;
                vPhaseOffset = uniqueOffset;
                
                // Animate alpha based on position and time
                // This creates wave-like pulsations of opacity through the particle system
                float alphaModulation = 0.6 + 0.4 * phiOscillator(time, uniqueOffset, 0.5);
                vAlpha = alpha * alphaModulation * coherence;
                
                // Create phi-harmonic size variations
                float baseSize = size * (0.8 + 0.4 * coherence);
                float sizeModulation = 1.0 + 0.3 * sin(time * frequency * 0.01 + uniqueOffset);
                vSize = baseSize * sizeModulation;
                
                // Apply subtle position displacement for more organic flow
                // Using phi-harmonic motion with resonance at 528 Hz (love/creation frequency)
                float heartResonance = 528.0 / 100.0; // Scaled for reasonable visual effect
                float displacementStrength = 0.05 * coherence;
                
                // Create phi-harmonic displacement vector
                vec3 displacement = vec3(
                    sin(time * heartResonance + position.x * phi),
                    cos(time * heartResonance * phi + position.y),
                    sin(time * heartResonance * phi * phi + position.z * phi)
                ) * displacementStrength;
                
                // Apply displacement to create moving flow effect
                vec3 newPosition = position + displacement;
                
                // Transform to camera space with organic flowing movement
                vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
                
                // Set point size based on coherence, size attribute, and distance to camera
                gl_PointSize = vSize * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `;
    }
    
    getParticleFragmentShader() {
        return `
            uniform vec3 color;
            uniform sampler2D pointTexture;
            uniform float coherence;
            uniform float phi;
            uniform float time;
            uniform float frequency;
            
            varying float vAlpha;
            varying float vSize;
            varying float vPhaseOffset;
            varying vec3 vPosition;
            
            // Energy color mapping based on frequency and position
            vec3 energyColor(float energy, float phase) {
                // Base creation frequency (528 Hz) colors (pink/magenta to turquoise)
                vec3 lowEnergy = vec3(1.0, 0.4, 0.8); // Pink/magenta
                vec3 highEnergy = vec3(0.4, 1.0, 0.8); // Turquoise
                
                // Mix colors based on energy level with phi-harmonic oscillation
                vec3 baseColor = mix(lowEnergy, highEnergy, energy);
                
                // Add gold/yellow highlights at phi-harmonic peaks
                float highlight = pow(sin(phase * phi) * 0.5 + 0.5, 2.0) * energy;
                vec3 highlightColor = vec3(1.0, 0.9, 0.4); // Golden
                
                return mix(baseColor, highlightColor, highlight * 0.3);
            }
            
            // Sacred geometry pattern for particles
            float sacredPattern(vec2 uv, float phase) {
                // Create phi-based sacred geometry pattern
                float pattern = 0.0;
                
                // Flower of life pattern
                for (int i = 0; i < 6; i++) {
                    float angle = float(i) / 6.0 * 3.14159 * 2.0 + phase;
                    vec2 center = vec2(cos(angle), sin(angle)) * 0.35;
                    float dist = length(uv - center);
                    pattern += smoothstep(0.3, 0.1, dist) * 0.2;
                }
                
                // Add central pattern
                float centerDist = length(uv);
                pattern += smoothstep(0.2, 0.0, centerDist) * 0.5;
                
                // Add phi spiral-inspired pattern
                float spiralAngle = atan(uv.y, uv.x);
                float spiralDist = length(uv);
                pattern += 0.1 * smoothstep(0.05, 0.0, 
                    abs(spiralDist - (0.1 + 0.3 * (0.5 + 0.5 * sin(spiralAngle * phi + phase))))
                );
                
                return min(1.0, pattern);
            }
            
            void main() {
                // Get the base texture color with sacred geometry enhancement
                vec4 texColor = texture2D(pointTexture, gl_PointCoord);
                
                // Calculate energy level based on coherence and position
                float energyLevel = coherence * (0.5 + 0.5 * sin(vPhaseOffset + time * 0.5));
                
                // Create phi-harmonic phase for color variation
                float phase = time * (frequency / 1000.0) + vPhaseOffset;
                
                // Generate energy colors based on frequency resonance
                vec3 particleColor = energyColor(energyLevel, phase);
                
                // Apply sacred geometry pattern based on position
                float pattern = sacredPattern(gl_PointCoord * 2.0 - 1.0, phase);
                
                // Mix with base color
                vec3 finalColor = mix(
                    color * particleColor,
                    particleColor * 1.5, // Brighter for pattern areas
                    pattern * coherence
                );
                
                // Calculate final alpha with coherence and pattern enhancement
                float finalAlpha = vAlpha * texColor.a;
                
                // Add subtle glow for higher energy/coherence particles
                finalColor += vec3(1.0, 0.7, 1.0) * pattern * energyLevel * 0.3;
                
                // Apply consciousness-responsive brightness
                finalColor *= (0.8 + 0.4 * coherence);
                
                // Output final color
                gl_FragColor = vec4(finalColor, finalAlpha);
            }
        `;
    }
    
    // Clean up resources
    dispose() {
        // Stop animation
        this.isAnimating = false;
        
        // Stop audio
        this.stopAudio();
        
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        
        // Dispose of Three.js resources
        if (this.scene) {
            this.scene.traverse(object => {
                if (object.geometry) object.geometry.dispose();
                
                if (object.material) {
                    if (object.material.map) object.material.map.dispose();
                    object.material.dispose();
                }
            });
        }
        
        // Clear references
        if (this.renderer) {
            this.renderer.dispose();
            this.container.removeChild(this.renderer.domElement);
        }
        
        // Remove UI elements
        if (this.uiElements.container) {
            this.container.removeChild(this.uiElements.container);
        }
    }
    
    // Display error message if setup fails
    displayErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.position = 'absolute';
        errorDiv.style.top = '50%';
        errorDiv.style.left = '50%';
        errorDiv.style.transform = 'translate(-50%, -50%)';
        errorDiv.style.color = 'white';
        errorDiv.style.backgroundColor = 'rgba(200, 0, 0, 0.7)';
        errorDiv.style.padding = '20px';
        errorDiv.style.borderRadius = '5px';
        errorDiv.style.fontFamily = 'Arial, sans-serif';
        errorDiv.style.zIndex = '1000';
        errorDiv.innerHTML = `<strong>Error:</strong> ${message}`;
        
        this.container.appendChild(errorDiv);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if THREE.js is available
    if (typeof THREE === 'undefined') {
        console.error('THREE.js library is required for Toroidal Communication Field');
        // Try to load THREE.js dynamically
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = initToroidalField;
        script.onerror = () => console.error('Failed to load THREE.js library');
        document.head.appendChild(script);
        
        // Load OrbitControls
        const orbitScript = document.createElement('script');
        orbitScript.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.min.js';
        document.head.appendChild(orbitScript);
    } else {
        // THREE.js already available
        initToroidalField();
    }
});

function initToroidalField() {
    const container = document.getElementById('toroidal-container');
    if (container) {
        window.toroidalField = new ToroidalCommunicationField(container, {
            frequency: 528,
            coherenceLevel: 0.85,
            resonanceQuality: 0.9,
            participants: 2,
            communicationMode: 'heart-centered',
            autoRotate: true
        });
    }
}