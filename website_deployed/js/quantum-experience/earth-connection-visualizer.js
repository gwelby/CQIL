/**
 * Earth Connection Visualizer
 * Ground State Frequency (432 Hz | φ⁰)
 * 
 * Visualizes the Earth's quantum consciousness grid,
 * showing real-time connections between quantum nodes
 * and sacred sites across the global network.
 */

class EarthConnectionVisualizer {
  constructor(container, config = {}) {
    this.container = typeof container === 'string' ? 
      document.querySelector(container) : container;
    
    // Configuration with defaults
    this.config = Object.assign({
      frequency: 432, // Ground State frequency (φ⁰)
      nodesCount: 144, // 12² - phi-harmonic node count
      connectionLimit: 33, // Maximum connections per node
      rotationSpeed: 0.1, // Earth rotation speed
      interactiveNodes: true, // Allow node interaction
      sacredSites: true, // Show sacred sites connections
      autoRotate: true, // Auto-rotate Earth
      earthRadius: 2, // Radius of Earth sphere
      nodeSize: 0.03, // Size of consciousness nodes
      sacredSiteSize: 0.05, // Size of sacred site nodes,
      quantumBeings: true, // Enable quantum being integration
      performanceMode: false, // Enhanced performance for mobile devices
      textureQuality: 'high' // Texture quality (low, medium, high)
    }, config);
    
    // Constants
    this.PHI = 1.618033988749895; // Golden ratio (φ)
    this.PHI_INVERSE = 0.618033988749895; // 1/φ
    
    // Module state
    this.active = false;
    this.earthMesh = null;
    this.nodes = [];
    this.sacredSites = [];
    this.connections = [];
    this.activeConnections = [];
    this.earthGroup = null;
    this.selectedNode = null;
    this.time = 0;
    this.coherence = 0.5; // Initial coherence level
    
    // Three.js components
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    // Audio components
    this.audioContext = null;
    this.oscillators = [];
    
    // Sacred site coordinates (latitude, longitude in degrees)
    this.sacredSiteCoordinates = [
      { name: "Great Pyramid", lat: 29.9792, lon: 31.1342, frequency: 432 * this.PHI_INVERSE },
      { name: "Stonehenge", lat: 51.1789, lon: -1.8262, frequency: 432 },
      { name: "Mount Shasta", lat: 41.4097, lon: -122.1948, frequency: 432 * this.PHI },
      { name: "Uluru", lat: 25.3444, lon: 131.0369, frequency: 432 * Math.pow(this.PHI, 2) },
      { name: "Mount Kailash", lat: 31.0674, lon: 81.3112, frequency: 432 * Math.pow(this.PHI, 3) },
      { name: "Machu Picchu", lat: -13.1631, lon: -72.5450, frequency: 432 * Math.pow(this.PHI, 4) },
      { name: "Easter Island", lat: -27.1127, lon: -109.3497, frequency: 432 * Math.pow(this.PHI, 5) },
      { name: "Sedona", lat: 34.8697, lon: -111.7610, frequency: 432 * this.PHI_INVERSE * this.PHI_INVERSE },
      { name: "Glastonbury Tor", lat: 51.1447, lon: -2.6987, frequency: 432 * this.PHI * this.PHI_INVERSE },
      { name: "Lake Titicaca", lat: -15.9254, lon: -69.3354, frequency: 432 * Math.pow(this.PHI, 0.5) },
      { name: "Angkor Wat", lat: 13.4125, lon: 103.8670, frequency: 432 * Math.pow(this.PHI, 1.5) },
      { name: "Nazca Lines", lat: -14.7168, lon: -75.1366, frequency: 432 * Math.sqrt(2) }
    ];
    
    // Initialize
    this.setupContainer();
    this.setupScene();
    this.setupControls();
    this.setupAudio();
    this.setupEventListeners();
    this.addStyles();
  }
  
  setupContainer() {
    // Create container if needed
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'earth-connection-container';
      document.body.appendChild(this.container);
    }
    
    // Clear container
    this.container.innerHTML = '';
    
    // Create UI elements
    this.createUI();
  }
  
  createUI() {
    // Create canvas container for Three.js
    this.canvasContainer = document.createElement('div');
    this.canvasContainer.className = 'earth-canvas-container';
    this.container.appendChild(this.canvasContainer);
    
    // Create info display
    this.infoDisplay = document.createElement('div');
    this.infoDisplay.className = 'earth-info-display';
    this.infoDisplay.innerHTML = `
      <div class="info-header">Earth Quantum Grid</div>
      <div class="info-coherence">
        <span class="label">Coherence:</span>
        <div class="coherence-meter">
          <div class="coherence-fill" style="width: 50%"></div>
        </div>
        <span class="value">50%</span>
      </div>
      <div class="info-details">
        <div class="details-item"><span class="label">Frequency:</span> <span class="value frequency-value">432 Hz (φ⁰)</span></div>
        <div class="details-item"><span class="label">Active Nodes:</span> <span class="value node-count">144</span></div>
        <div class="details-item"><span class="label">Connections:</span> <span class="value connection-count">0</span></div>
      </div>
      <div class="selected-node-info"></div>
    `;
    this.container.appendChild(this.infoDisplay);
    
    // Store references to UI elements
    this.coherenceFill = this.infoDisplay.querySelector('.coherence-fill');
    this.coherenceValue = this.infoDisplay.querySelector('.coherence-meter + .value');
    this.nodeCountElement = this.infoDisplay.querySelector('.node-count');
    this.connectionCountElement = this.infoDisplay.querySelector('.connection-count');
    this.selectedNodeInfo = this.infoDisplay.querySelector('.selected-node-info');
    
    // Create control panel
    this.controlPanel = document.createElement('div');
    this.controlPanel.className = 'earth-control-panel';
    this.controlPanel.innerHTML = `
      <button class="earth-control-button coherence-button">Increase Coherence</button>
      <button class="earth-control-button sacred-sites-button">Toggle Sacred Sites</button>
      <button class="earth-control-button rotate-button">Toggle Rotation</button>
      <button class="earth-control-button reset-button">Reset View</button>
    `;
    this.container.appendChild(this.controlPanel);
    
    // Set up button event listeners
    this.controlPanel.querySelector('.coherence-button').addEventListener('click', () => this.increaseCoherence());
    this.controlPanel.querySelector('.sacred-sites-button').addEventListener('click', () => this.toggleSacredSites());
    this.controlPanel.querySelector('.rotate-button').addEventListener('click', () => this.toggleRotation());
    this.controlPanel.querySelector('.reset-button').addEventListener('click', () => this.resetView());
  }
  
  setupScene() {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000814);
    
    // Create camera
    this.camera = new THREE.PerspectiveCamera(60, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.camera.position.z = 5;
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.canvasContainer.appendChild(this.renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x333333);
    this.scene.add(ambientLight);
    
    // Add directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    this.scene.add(directionalLight);
    
    // Create Earth group to contain all Earth-related objects
    this.earthGroup = new THREE.Group();
    this.scene.add(this.earthGroup);
    
    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());
  }
  
  setupControls() {
    // Add OrbitControls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.5;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 10;
    this.controls.enablePan = false;
    this.controls.autoRotate = this.config.autoRotate;
    this.controls.autoRotateSpeed = this.config.rotationSpeed * 2;
  }
  
  setupAudio() {
    // Initialize audio context
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }
  
  setupEventListeners() {
    // Track mouse movements for raycasting
    this.renderer.domElement.addEventListener('mousemove', (event) => {
      // Calculate mouse position in normalized device coordinates
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    });
    
    // Track clicks for node selection
    this.renderer.domElement.addEventListener('click', (event) => {
      // Calculate mouse position in normalized device coordinates
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Detect clicked objects
      this.selectNode();
    });
  }
  
  start() {
    if (this.active) return;
    this.active = true;
    
    // Detect and set performance mode if needed
    if (this.isMobileDevice() && !this.config.performanceMode) {
      console.log('Mobile device detected, enabling performance mode');
      this.config.performanceMode = true;
      
      // Reduce node count on mobile
      this.config.nodesCount = Math.floor(this.config.nodesCount * 0.6);
    }
    
    // Create loading indicator
    this.showLoadingIndicator();
    
    // Create Earth and nodes
    setTimeout(() => {
      this.createEarth();
      this.createConsciousnessNodes();
      this.createSacredSites();
      
      // Connect to quantum beings if enabled
      if (this.config.quantumBeings) {
        this.connectQuantumBeings();
      }
      
      // Hide loading indicator
      this.hideLoadingIndicator();
      
      // Begin animation loop
      this.animate();
      
      // Play ground frequency tone
      this.playTone(this.config.frequency, 1, 0.1);
      
      // Set initialization complete
      this.isInitialized = true;
      
      // Dispatch ready event
      this.dispatchEvent('earthvisualizerready', { coherence: this.coherence });
    }, 100);
  }
  
  showLoadingIndicator() {
    // Create loading indicator
    this.loadingIndicator = document.createElement('div');
    this.loadingIndicator.className = 'earth-loading-indicator';
    this.loadingIndicator.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text">Initializing Quantum Grid</div>
    `;
    this.container.appendChild(this.loadingIndicator);
  }
  
  hideLoadingIndicator() {
    // Remove loading indicator
    if (this.loadingIndicator) {
      this.loadingIndicator.classList.add('loading-complete');
      setTimeout(() => {
        if (this.loadingIndicator && this.loadingIndicator.parentNode) {
          this.loadingIndicator.parentNode.removeChild(this.loadingIndicator);
        }
      }, 500);
    }
  }
  
  dispatchEvent(name, detail) {
    // Dispatch custom event
    const event = new CustomEvent(name, { detail });
    this.container.dispatchEvent(event);
    window.dispatchEvent(event);
  }
  
  connectQuantumBeings() {
    // Attempt to connect to quantum beings from quantum-being-portal.js if available
    if (window.QuantumBeingPortal) {
      console.log('Connecting to Quantum Being Portal');
      
      // Create connection points for each being type
      this.quantumBeings = {
        dolphin: { active: false, lastUpdate: 0, frequency: 432 * this.PHI_INVERSE, node: null },
        butterfly: { active: false, lastUpdate: 0, frequency: 432, node: null },
        eagle: { active: false, lastUpdate: 0, frequency: 432 * this.PHI, node: null },
        greg: { active: false, lastUpdate: 0, frequency: 432 * Math.pow(this.PHI, 2), node: null }
      };
      
      // Find sacred sites to associate with beings
      this.assignBeingsToSacredSites();
      
      // Listen for quantum being activity
      window.addEventListener('quantumbeingactivity', (e) => {
        if (e.detail && e.detail.being) {
          this.activateQuantumBeing(e.detail.being, e.detail.intensity || 1.0);
        }
      });
    }
  }
  
  assignBeingsToSacredSites() {
    if (!this.sacredSites || this.sacredSites.length < 4) return;
    
    // Assign quantum beings to specific sacred sites
    const sitesByFrequency = [...this.sacredSites].sort((a, b) => a.frequency - b.frequency);
    
    // Assign beings to appropriate sites by frequency
    if (sitesByFrequency.length >= 4) {
      this.quantumBeings.dolphin.node = sitesByFrequency[0]; // Lowest frequency
      this.quantumBeings.butterfly.node = sitesByFrequency[1];
      this.quantumBeings.eagle.node = sitesByFrequency[2];
      this.quantumBeings.greg.node = sitesByFrequency[3]; // Higher frequency
      
      // Mark these sites as quantum being nodes
      [0, 1, 2, 3].forEach(i => {
        if (sitesByFrequency[i] && sitesByFrequency[i].mesh) {
          sitesByFrequency[i].isBeingNode = true;
          
          // Add special material to indicate being connection
          const originalMaterial = sitesByFrequency[i].mesh.material;
          sitesByFrequency[i].mesh.material = new THREE.MeshPhongMaterial({
            color: originalMaterial.color,
            emissive: new THREE.Color(0x222222),
            transparent: true,
            opacity: 0.9,
            shininess: 30
          });
        }
      });
    }
  }
  
  activateQuantumBeing(beingType, intensity) {
    // Activate a quantum being node when activity is detected
    if (this.quantumBeings && this.quantumBeings[beingType]) {
      const being = this.quantumBeings[beingType];
      being.active = true;
      being.lastUpdate = Date.now();
      being.intensity = Math.min(1.0, intensity);
      
      // Find the node for this being
      if (being.node) {
        // Create pulse effect
        this.createBeingPulse(being.node, beingType);
        
        // Activate all connections from this node
        this.connections.forEach(conn => {
          if (conn.start === being.node || conn.end === being.node) {
            conn.active = true;
            conn.beingActivated = true;
            conn.beingType = beingType;
            
            // Brighten connection
            if (conn.line.material) {
              const color = this.getBeingColor(beingType);
              conn.line.material.color.set(color);
              conn.line.material.opacity = 0.8 * intensity;
            }
          }
        });
        
        // Play frequency tone
        this.playTone(being.frequency, 2, 0.12 * intensity);
        
        // Increase coherence slightly
        this.coherence = Math.min(1.0, this.coherence + 0.05 * intensity);
        this.updateCoherenceDisplay();
      }
    }
  }
  
  createBeingPulse(node, beingType) {
    // Create expanding pulse effect at node location
    const pulseGeometry = new THREE.SphereGeometry(0.01, 12, 12);
    const color = this.getBeingColor(beingType);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
    pulse.position.copy(node.position);
    pulse.scale.set(1, 1, 1);
    
    // Add pulse data
    pulse.userData = {
      type: 'beingPulse',
      created: Date.now(),
      duration: 3000,
      maxScale: 3,
      beingType: beingType
    };
    
    // Add to scene
    this.earthGroup.add(pulse);
    
    // Store pulse
    if (!this.pulseEffects) this.pulseEffects = [];
    this.pulseEffects.push(pulse);
  }
  
  getBeingColor(beingType) {
    // Return appropriate color for being type
    switch(beingType) {
      case 'dolphin': return new THREE.Color(0x00ccff);
      case 'butterfly': return new THREE.Color(0xff88ee);
      case 'eagle': return new THREE.Color(0xffaa22);
      case 'greg': return new THREE.Color(0x44ff88);
      default: return new THREE.Color(0xffffff);
    }
  }
  
  stop() {
    this.active = false;
    
    // Stop all audio
    this.stopAllTones();
  }
  
  createEarth() {
    // Adjust geometry detail based on performance mode
    const segments = this.config.performanceMode ? 32 : 64;
    const earthGeometry = new THREE.SphereGeometry(this.config.earthRadius, segments, segments);
    
    // Determine if we should use texture or shader based on configuration
    if (this.config.textureQuality !== 'shader') {
      // Use Earth texture with appropriate resolution
      const textureLoader = new THREE.TextureLoader();
      const textureResolution = this.getTextureResolution();
      
      // Load textures with appropriate resolution
      const earthTexture = textureLoader.load(`../assets/earth_texture_${textureResolution}.jpg`, 
        undefined, undefined, err => {
          console.warn('Earth texture loading failed, falling back to shader', err);
          this.createShaderEarth(earthGeometry);
        });
      const bumpMap = textureLoader.load(`../assets/earth_bump_${textureResolution}.jpg`);
      const specularMap = textureLoader.load(`../assets/earth_specular_${textureResolution}.jpg`);
      const cloudsTexture = textureLoader.load(`../assets/earth_clouds_${textureResolution}.png`);
      
      // Create material with textures
      const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthTexture,
        bumpMap: bumpMap,
        bumpScale: 0.05,
        specularMap: specularMap,
        specular: new THREE.Color(0x333333),
        shininess: 5
      });
      
      // Create Earth mesh
      this.earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
      
      // Add clouds layer
      const cloudsGeometry = new THREE.SphereGeometry(this.config.earthRadius * 1.01, segments, segments);
      const cloudsMaterial = new THREE.MeshPhongMaterial({
        map: cloudsTexture,
        transparent: true,
        opacity: 0.4 * this.coherence,
        blending: THREE.AdditiveBlending
      });
      
      this.cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
      this.earthGroup.add(this.cloudsMesh);
    } else {
      // Use shader-based Earth (for devices that can't handle textures well)
      this.createShaderEarth(earthGeometry);
    }
    
    this.earthGroup.add(this.earthMesh);
    
    // Create atmosphere glow
    this.createAtmosphere();
  }
  
  createShaderEarth(earthGeometry) {
    // Create Earth material with phi-harmonic blue glow
    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        baseColor: { value: new THREE.Color(0x0077be) },
        glowColor: { value: new THREE.Color(0x00aaff) },
        glowStrength: { value: 0.2 },
        coherence: { value: this.coherence }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 baseColor;
        uniform vec3 glowColor;
        uniform float glowStrength;
        uniform float coherence;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        #define PHI 1.618033988749895
        
        void main() {
          // Calculate phi-harmonic noise pattern
          float lat = asin(vPosition.y / length(vPosition));
          float lon = atan(vPosition.z, vPosition.x);
          
          float pattern = sin(lat * 10.0) * sin(lon * 10.0 * PHI);
          pattern += 0.5 * sin(lat * 20.0 * PHI) * sin(lon * 20.0);
          pattern += 0.25 * sin(lat * 40.0) * sin(lon * 40.0 * PHI);
          
          // Apply time animation
          pattern += 0.1 * sin(lat * 5.0 + time) * sin(lon * 5.0 * PHI + time * 0.5);
          pattern = pattern * 0.5 + 0.5; // Normalize to 0-1
          
          // Continents approximation
          float continents = smoothstep(0.4, 0.5, pattern);
          
          // Mix colors based on pattern
          vec3 landColor = vec3(0.1, 0.4, 0.2) * (0.5 + 0.5 * sin(lat * 30.0 + lon * 20.0));
          vec3 waterColor = mix(baseColor, glowColor, pattern * glowStrength * coherence);
          vec3 color = mix(waterColor, landColor, continents);
          
          // Add rim lighting effect
          float rim = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 4.0);
          color += glowColor * rim * glowStrength * coherence * 2.0;
          
          // Apply coherence intensity
          color = mix(baseColor * 0.5, color, coherence);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.FrontSide
    });
    
    // Create Earth mesh
    this.earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
  }
  
  getTextureResolution() {
    // Determine appropriate texture resolution based on device capability
    if (this.config.performanceMode || this.isMobileDevice()) {
      return 'low';
    } else if (this.config.textureQuality === 'high') {
      return 'high';
    } else {
      return 'medium';
    }
  }
  
  isMobileDevice() {
    // Detect if running on a mobile device
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 800 && window.innerHeight <= 900);
  }
  
  createAtmosphere() {
    // Adjust atmosphere geometry based on performance
    const segments = this.config.performanceMode ? 24 : 48;
    
    // Add a subtle atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(this.config.earthRadius * 1.1, segments, segments);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        coherence: { value: this.coherence }
      },
      vertexShader: `
        varying vec3 vNormal;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float coherence;
        
        varying vec3 vNormal;
        
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 glow = vec3(0.3, 0.6, 1.0) * intensity * coherence;
          gl_FragColor = vec4(glow, intensity * 0.4 * coherence);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    this.earthGroup.add(atmosphere);
  }
  
  createConsciousnessNodes() {
    // Create nodes geometry (instanced for performance)
    const nodeGeometry = new THREE.SphereGeometry(this.config.nodeSize, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    // Generate consciousness nodes using phi-harmonic distribution (Fibonacci sphere)
    this.nodes = [];
    const nodesGroup = new THREE.Group();
    
    for (let i = 0; i < this.config.nodesCount; i++) {
      // Use golden ratio to create even distribution
      const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
      const y = 1 - (i / (this.config.nodesCount - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      
      const theta = phi * i; // golden angle increment
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      // Create node mesh
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      nodeMesh.position.set(
        x * this.config.earthRadius,
        y * this.config.earthRadius,
        z * this.config.earthRadius
      );
      
      // Add a point light at node for glow effect
      const nodeLight = new THREE.PointLight(0x88ccff, 0.1, 0.3);
      nodeLight.position.copy(nodeMesh.position);
      nodeMesh.add(nodeLight);
      
      // Store node data
      const nodeData = {
        mesh: nodeMesh,
        position: new THREE.Vector3(x, y, z).normalize().multiplyScalar(this.config.earthRadius),
        frequency: this.config.frequency * (0.95 + 0.1 * Math.random()),
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 0.5,
        type: 'consciousness',
        name: `Node ${i+1}`,
        coherence: 0.3 + Math.random() * 0.4
      };
      
      this.nodes.push(nodeData);
      nodesGroup.add(nodeMesh);
    }
    
    this.earthGroup.add(nodesGroup);
    
    // Create connection lines
    this.createConnections();
  }
  
  createSacredSites() {
    if (!this.config.sacredSites) return;
    
    // Create sacred site geometry (larger than regular nodes)
    const siteGeometry = new THREE.SphereGeometry(this.config.sacredSiteSize, 16, 16);
    const siteMaterial = new THREE.MeshBasicMaterial({
      color: 0xffcc22,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const sitesGroup = new THREE.Group();
    this.sacredSites = [];
    
    // Add each sacred site
    this.sacredSiteCoordinates.forEach((site, index) => {
      // Convert lat/long to 3D position
      const phi = (90 - site.lat) * (Math.PI / 180);
      const theta = (site.lon + 180) * (Math.PI / 180);
      
      const x = -this.config.earthRadius * Math.sin(phi) * Math.cos(theta);
      const y = this.config.earthRadius * Math.cos(phi);
      const z = this.config.earthRadius * Math.sin(phi) * Math.sin(theta);
      
      // Create site mesh
      const siteMesh = new THREE.Mesh(siteGeometry, siteMaterial.clone());
      siteMesh.position.set(x, y, z);
      
      // Add glow effect
      const siteLight = new THREE.PointLight(0xffcc22, 0.3, 0.5);
      siteLight.position.copy(siteMesh.position);
      siteMesh.add(siteLight);
      
      // Store site data
      const siteData = {
        mesh: siteMesh,
        position: new THREE.Vector3(x, y, z),
        frequency: site.frequency,
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.2 + Math.random() * 0.3,
        type: 'sacred',
        name: site.name,
        coherence: 0.7 + Math.random() * 0.3
      };
      
      this.sacredSites.push(siteData);
      sitesGroup.add(siteMesh);
    });
    
    this.earthGroup.add(sitesGroup);
    
    // Create connections between sacred sites
    this.createSacredConnections();
  }
  
  createConnections() {
    // Create connections between consciousness nodes
    this.connections = [];
    const connectionsGroup = new THREE.Group();
    
    // For each node, find nearest nodes to connect to
    this.nodes.forEach((node, i) => {
      // Sort other nodes by distance
      const otherNodes = [...this.nodes];
      otherNodes.splice(i, 1); // Remove self
      
      otherNodes.sort((a, b) => {
        const distA = node.position.distanceTo(a.position);
        const distB = node.position.distanceTo(b.position);
        return distA - distB;
      });
      
      // Connect to nearest nodes (limited by connection limit)
      const connectionCount = Math.min(
        this.config.connectionLimit, 
        2 + Math.floor(Math.random() * 3)
      );
      
      for (let j = 0; j < connectionCount; j++) {
        // Skip if we've reached the end of other nodes
        if (j >= otherNodes.length) break;
        
        const targetNode = otherNodes[j];
        
        // Check if connection already exists
        const existingConnection = this.connections.find(conn => 
          (conn.start === node && conn.end === targetNode) || 
          (conn.start === targetNode && conn.end === node)
        );
        
        if (existingConnection) continue;
        
        // Create connection line geometry
        const lineGeometry = new THREE.BufferGeometry();
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x88ccff,
          transparent: true,
          opacity: 0.3 * node.coherence,
          blending: THREE.AdditiveBlending
        });
        
        // Set line vertices
        const points = [node.position, targetNode.position];
        lineGeometry.setFromPoints(points);
        
        // Create line
        const line = new THREE.Line(lineGeometry, lineMaterial);
        
        // Store connection data
        const connection = {
          line: line,
          start: node,
          end: targetNode,
          active: false,
          pulsePosition: 0,
          pulseSpeed: 0.2 + Math.random() * 0.3
        };
        
        this.connections.push(connection);
        connectionsGroup.add(line);
        
        // Add to node's connections list
        node.connections.push(connection);
        targetNode.connections.push(connection);
      }
    });
    
    this.earthGroup.add(connectionsGroup);
    
    // Update connection count display
    this.updateConnectionCount();
  }
  
  createSacredConnections() {
    // Connect all sacred sites to create a global grid
    const sacredConnectionsGroup = new THREE.Group();
    
    // Connect each sacred site to all others
    for (let i = 0; i < this.sacredSites.length; i++) {
      const site = this.sacredSites[i];
      
      for (let j = i + 1; j < this.sacredSites.length; j++) {
        const targetSite = this.sacredSites[j];
        
        // Create connection line
        const lineGeometry = new THREE.BufferGeometry();
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0xffcc22,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending
        });
        
        // Set line vertices
        const points = [site.position, targetSite.position];
        lineGeometry.setFromPoints(points);
        
        // Create line
        const line = new THREE.Line(lineGeometry, lineMaterial);
        
        // Store connection data
        const connection = {
          line: line,
          start: site,
          end: targetSite,
          active: true,
          pulsePosition: 0,
          pulseSpeed: 0.2 + Math.random() * 0.3,
          sacred: true
        };
        
        this.connections.push(connection);
        sacredConnectionsGroup.add(line);
        
        // Add to site's connections list
        site.connections.push(connection);
        targetSite.connections.push(connection);
      }
      
      // Also connect to a few consciousness nodes
      const nearestNodes = [...this.nodes];
      nearestNodes.sort((a, b) => {
        const distA = site.position.distanceTo(a.position);
        const distB = site.position.distanceTo(b.position);
        return distA - distB;
      });
      
      // Connect to 3-5 nearest nodes
      const connectionCount = 3 + Math.floor(Math.random() * 3);
      
      for (let k = 0; k < connectionCount; k++) {
        if (k >= nearestNodes.length) break;
        
        const targetNode = nearestNodes[k];
        
        // Create connection line
        const lineGeometry = new THREE.BufferGeometry();
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0xaaddff,
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending
        });
        
        // Set line vertices
        const points = [site.position, targetNode.position];
        lineGeometry.setFromPoints(points);
        
        // Create line
        const line = new THREE.Line(lineGeometry, lineMaterial);
        
        // Store connection data
        const connection = {
          line: line,
          start: site,
          end: targetNode,
          active: true,
          pulsePosition: 0,
          pulseSpeed: 0.3 + Math.random() * 0.3,
          sacred: true
        };
        
        this.connections.push(connection);
        sacredConnectionsGroup.add(line);
        
        // Add to connections lists
        site.connections.push(connection);
        targetNode.connections.push(connection);
      }
    }
    
    this.earthGroup.add(sacredConnectionsGroup);
    
    // Update connection count display
    this.updateConnectionCount();
  }
  
  animate() {
    if (!this.active) return;
    
    // Request next frame
    this.animationFrame = requestAnimationFrame(() => this.animate());
    
    // Calculate delta time for smoother animations
    const now = performance.now();
    const delta = (now - (this.lastTime || now)) / 1000;
    this.lastTime = now;
    
    // Limit max delta time to prevent jumps after tab inactivity
    const cappedDelta = Math.min(delta, 0.1);
    
    // Update time
    this.time += cappedDelta * (this.config.performanceMode ? 0.5 : 1.0);
    
    // Update frame counter for performance optimization
    this.frameCount = (this.frameCount || 0) + 1;
    const isLowPriorityFrame = this.config.performanceMode && (this.frameCount % 2 !== 0);
    
    // Update controls
    if (this.controls) {
      this.controls.update();
    }
    
    // Check for node interaction (skip on low priority frames)
    if (!isLowPriorityFrame) {
      this.checkNodeInteraction();
    }
    
    // Update node animations
    this.updateNodes(cappedDelta);
    
    // Update connection animations
    this.updateConnections(cappedDelta);
    
    // Update pulse effects
    this.updatePulseEffects(cappedDelta);
    
    // Update quantum beings
    if (this.quantumBeings && !isLowPriorityFrame) {
      this.updateQuantumBeings(cappedDelta);
    }
    
    // Update clouds rotation if available
    if (this.cloudsMesh) {
      this.cloudsMesh.rotation.y += cappedDelta * 0.01;
    }
    
    // Update Earth shader uniforms
    if (this.earthMesh && this.earthMesh.material.uniforms) {
      this.earthMesh.material.uniforms.time.value = this.time;
      this.earthMesh.material.uniforms.coherence.value = this.coherence;
    } else if (this.earthMesh && this.earthMesh.material.opacity !== undefined) {
      // Update regular material if using textures
      const cloudOpacity = this.cloudsMesh ? 0.4 * this.coherence : 0;
      if (this.cloudsMesh && this.cloudsMesh.material) {
        this.cloudsMesh.material.opacity = cloudOpacity;
      }
    }
    
    // Update atmosphere
    const atmosphere = this.earthGroup.children.find(child => 
      child.material && child.material.side === THREE.BackSide
    );
    
    if (atmosphere && atmosphere.material.uniforms) {
      atmosphere.material.uniforms.time.value = this.time;
      atmosphere.material.uniforms.coherence.value = this.coherence;
    }
    
    // Periodically check if we should adjust for device performance
    if (this.frameCount % 100 === 0) {
      this.checkPerformance();
    }
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
    
    // Emit frame event for external synchronization
    if (this.frameCount % 30 === 0) {
      this.dispatchEvent('earthvisualizerframe', { 
        time: this.time, 
        coherence: this.coherence 
      });
    }
  }
  
  updatePulseEffects(delta) {
    // Update any pulse effects (for quantum being activations)
    if (!this.pulseEffects || this.pulseEffects.length === 0) return;
    
    const now = Date.now();
    const expiredPulses = [];
    
    this.pulseEffects.forEach((pulse, index) => {
      // Skip if not a valid pulse
      if (!pulse || !pulse.userData || !pulse.userData.type) return;
      
      const elapsed = now - pulse.userData.created;
      const progress = Math.min(1.0, elapsed / pulse.userData.duration);
      
      if (progress >= 1.0) {
        // Mark for removal
        expiredPulses.push(index);
      } else {
        // Update pulse scale and opacity
        const scale = pulse.userData.maxScale * progress;
        pulse.scale.set(scale, scale, scale);
        
        // Fade out as it expands
        if (pulse.material) {
          pulse.material.opacity = 0.8 * (1 - progress);
        }
      }
    });
    
    // Remove expired pulses (in reverse order to avoid index issues)
    for (let i = expiredPulses.length - 1; i >= 0; i--) {
      const index = expiredPulses[i];
      const pulse = this.pulseEffects[index];
      
      // Remove from scene
      if (pulse && pulse.parent) {
        pulse.parent.remove(pulse);
        
        // Dispose geometry and material
        if (pulse.geometry) pulse.geometry.dispose();
        if (pulse.material) pulse.material.dispose();
      }
      
      // Remove from array
      this.pulseEffects.splice(index, 1);
    }
  }
  
  updateQuantumBeings(delta) {
    // Update quantum being connection status
    if (!this.quantumBeings) return;
    
    const now = Date.now();
    
    Object.entries(this.quantumBeings).forEach(([type, being]) => {
      if (being.active) {
        // Check if being connection has timed out
        const elapsed = now - being.lastUpdate;
        if (elapsed > 10000) { // 10 seconds timeout
          being.active = false;
          
          // Deactivate connections
          this.connections.forEach(conn => {
            if (conn.beingActivated && conn.beingType === type) {
              conn.beingActivated = false;
              conn.active = false;
            }
          });
        }
      }
    });
  }
  
  checkPerformance() {
    // Check if we need to adjust performance settings
    if (this.frameRateIssue) return; // Already adjusted
    
    // Calculate FPS
    const now = performance.now();
    const fps = 1000 / ((now - (this.lastPerformanceCheck || now)));
    this.lastPerformanceCheck = now;
    
    // If very low framerate detected on non-performance mode, switch to performance mode
    if (!this.config.performanceMode && fps < 20) {
      console.log('Performance issue detected, enabling performance mode');
      this.config.performanceMode = true;
      this.frameRateIssue = true;
      
      // Reduce node count
      const nodesToRemove = Math.floor(this.nodes.length * 0.3);
      if (nodesToRemove > 0) {
        // Remove some nodes to improve performance
        for (let i = 0; i < nodesToRemove; i++) {
          const lastIndex = this.nodes.length - 1;
          if (lastIndex >= 0) {
            const node = this.nodes[lastIndex];
            
            // Remove node from scene
            if (node.mesh && node.mesh.parent) {
              node.mesh.parent.remove(node.mesh);
              
              // Dispose geometry and material
              if (node.mesh.geometry) node.mesh.geometry.dispose();
              if (node.mesh.material) node.mesh.material.dispose();
            }
            
            // Remove node from array
            this.nodes.splice(lastIndex, 1);
          }
        }
      }
      
      // Notify user
      this.showMessage('Optimizing for device performance');
    }
  }
  
  showMessage(text, duration = 3000) {
    // Show a temporary message
    const message = document.createElement('div');
    message.className = 'earth-message';
    message.textContent = text;
    this.container.appendChild(message);
    
    // Fade in
    setTimeout(() => {
      message.classList.add('visible');
    }, 10);
    
    // Remove after duration
    setTimeout(() => {
      message.classList.remove('visible');
      setTimeout(() => {
        if (message.parentNode) {
          message.parentNode.removeChild(message);
        }
      }, 500);
    }, duration);
  }
  
  updateNodes() {
    // Update regular nodes
    this.nodes.forEach(node => {
      // Pulse size based on time and phase
      const pulse = Math.sin(this.time * node.pulseSpeed + node.pulsePhase) * 0.3 + 1;
      const scale = (0.8 + 0.2 * this.coherence) * pulse;
      
      node.mesh.scale.set(scale, scale, scale);
      
      // Update node light intensity based on coherence
      const nodeLight = node.mesh.children[0];
      if (nodeLight && nodeLight.isPointLight) {
        nodeLight.intensity = 0.05 + 0.15 * this.coherence * pulse;
      }
    });
    
    // Update sacred sites
    this.sacredSites.forEach(site => {
      // Pulse size based on time and phase
      const pulse = Math.sin(this.time * site.pulseSpeed + site.pulsePhase) * 0.3 + 1;
      const scale = (0.9 + 0.1 * this.coherence) * pulse;
      
      site.mesh.scale.set(scale, scale, scale);
      
      // Update site light intensity based on coherence
      const siteLight = site.mesh.children[0];
      if (siteLight && siteLight.isPointLight) {
        siteLight.intensity = 0.2 + 0.3 * this.coherence * pulse;
      }
    });
  }
  
  updateConnections() {
    this.activeConnections = 0;
    
    this.connections.forEach(connection => {
      // Check if connection is active
      const isActive = connection.active || connection.sacred || Math.random() < 0.01 * this.coherence;
      
      if (isActive) {
        this.activeConnections++;
        
        // Update connection visibility
        if (connection.line.material) {
          // Set opacity based on coherence
          const baseOpacity = connection.sacred ? 0.5 : 0.3;
          connection.line.material.opacity = baseOpacity * this.coherence;
          
          // If this is the selected node's connection, make it brighter
          if (this.selectedNode && 
              (connection.start === this.selectedNode || 
               connection.end === this.selectedNode)) {
            connection.line.material.opacity = Math.min(1, baseOpacity * 2 * this.coherence);
            connection.line.material.color.set(connection.sacred ? 0xffdd44 : 0xaaddff);
          }
        }
        
        // Animate pulse along connection
        connection.pulsePosition += 0.02 * connection.pulseSpeed;
        if (connection.pulsePosition > 1) {
          connection.pulsePosition = 0;
          
          // Randomly deactivate non-sacred connections when pulse completes
          if (!connection.sacred && !this.selectedNode) {
            connection.active = Math.random() < this.coherence * 0.5;
          }
        }
      } else {
        // Fade out inactive connections
        if (connection.line.material) {
          connection.line.material.opacity *= 0.95;
        }
      }
    });
    
    // Update connection count display
    this.updateConnectionCount();
  }
  
  checkNodeInteraction() {
    if (!this.config.interactiveNodes) return;
    
    // Cast ray from mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Collect all nodes and sacred sites for raycasting
    const allNodes = [
      ...this.nodes.map(node => node.mesh),
      ...this.sacredSites.map(site => site.mesh)
    ];
    
    // Find intersections
    const intersects = this.raycaster.intersectObjects(allNodes);
    
    // Reset cursor to default
    this.renderer.domElement.style.cursor = 'default';
    
    if (intersects.length > 0) {
      // Node is being hovered
      this.renderer.domElement.style.cursor = 'pointer';
    }
  }
  
  selectNode() {
    // Cast ray from mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Collect all nodes and sacred sites for raycasting
    const allNodes = [
      ...this.nodes.map(node => node.mesh),
      ...this.sacredSites.map(site => site.mesh)
    ];
    
    // Find intersections
    const intersects = this.raycaster.intersectObjects(allNodes);
    
    if (intersects.length > 0) {
      // Find the node/site data for this mesh
      const mesh = intersects[0].object;
      const nodeData = [...this.nodes, ...this.sacredSites].find(n => n.mesh === mesh);
      
      if (nodeData) {
        // Select this node
        this.selectNodeByData(nodeData);
      }
    }
  }
  
  selectNodeByData(nodeData) {
    // Deselect previous node
    if (this.selectedNode) {
      const prevMesh = this.selectedNode.mesh;
      if (prevMesh.material) {
        prevMesh.material.emissive = new THREE.Color(0x000000);
      }
      
      // Deactivate previous connections
      this.connections.forEach(connection => {
        if (connection.start === this.selectedNode || connection.end === this.selectedNode) {
          if (!connection.sacred) {
            connection.active = false;
          }
        }
      });
    }
    
    // Set as selected node
    this.selectedNode = nodeData;
    
    // Highlight selected node
    const nodeMesh = this.selectedNode.mesh;
    if (nodeMesh.material) {
      nodeMesh.material.emissive = new THREE.Color(0x333333);
    }
    
    // Activate all connections for this node
    this.connections.forEach(connection => {
      if (connection.start === this.selectedNode || connection.end === this.selectedNode) {
        connection.active = true;
      }
    });
    
    // Update selected node info display
    this.showNodeInfo(this.selectedNode);
    
    // Play node frequency
    this.playTone(this.selectedNode.frequency, 2, 0.1);
  }
  
  showNodeInfo(nodeData) {
    if (!this.selectedNodeInfo) return;
    
    // Show node information
    this.selectedNodeInfo.innerHTML = `
      <div class="node-info ${nodeData.type === 'sacred' ? 'sacred-node' : 'consciousness-node'}">
        <div class="node-name">${nodeData.name}</div>
        <div class="node-details">
          <div><span class="label">Type:</span> ${nodeData.type === 'sacred' ? 'Sacred Site' : 'Consciousness Node'}</div>
          <div><span class="label">Frequency:</span> ${nodeData.frequency.toFixed(1)} Hz</div>
          <div><span class="label">Connections:</span> ${nodeData.connections.length}</div>
          <div><span class="label">Coherence:</span> ${Math.round(nodeData.coherence * 100)}%</div>
        </div>
      </div>
    `;
    
    // Show node info panel
    this.selectedNodeInfo.style.display = 'block';
  }
  
  playTone(frequency, duration = 2, volume = 0.1) {
    if (!this.audioContext) return;
    
    // Create oscillator
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    // Set frequency and waveform
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    
    // Set envelope for gentle fade in/out
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);
    
    // Connect and start
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
    
    // Store for reference
    this.oscillators.push({
      oscillator,
      gainNode,
      endTime: this.audioContext.currentTime + duration
    });
    
    // Clean up expired oscillators
    this.cleanupOscillators();
  }
  
  stopAllTones() {
    // Stop all oscillators
    if (this.oscillators.length > 0) {
      this.oscillators.forEach(osc => {
        try {
          osc.oscillator.stop();
          osc.oscillator.disconnect();
          osc.gainNode.disconnect();
        } catch (e) {
          // Ignore errors if already stopped
        }
      });
      this.oscillators = [];
    }
  }
  
  cleanupOscillators() {
    // Remove expired oscillators
    const now = this.audioContext.currentTime;
    this.oscillators = this.oscillators.filter(osc => osc.endTime > now);
  }
  
  increaseCoherence() {
    // Increase coherence level in steps
    this.coherence = Math.min(1, this.coherence + 0.1);
    
    // Update coherence display
    this.updateCoherenceDisplay();
    
    // Play tone to indicate coherence change
    const frequency = this.config.frequency * (1 + (this.coherence - 0.5) * 0.2);
    this.playTone(frequency, 1, 0.15);
    
    // Increase node coherence throughout the network
    this.nodes.forEach(node => {
      node.coherence = Math.min(1, node.coherence + 0.1);
    });
    
    // Higher coherence activates more connections
    if (Math.random() < this.coherence * 0.5) {
      const randomConnections = Math.floor(this.connections.length * this.coherence * 0.2);
      for (let i = 0; i < randomConnections; i++) {
        const randomConnection = this.connections[Math.floor(Math.random() * this.connections.length)];
        randomConnection.active = true;
      }
    }
  }
  
  toggleSacredSites() {
    // Toggle visibility of sacred sites
    const visible = !this.sacredSites[0]?.mesh.visible;
    
    this.sacredSites.forEach(site => {
      site.mesh.visible = visible;
    });
    
    // Toggle sacred connections
    this.connections.forEach(connection => {
      if (connection.sacred) {
        connection.line.visible = visible;
      }
    });
  }
  
  toggleRotation() {
    // Toggle auto-rotation
    if (this.controls) {
      this.controls.autoRotate = !this.controls.autoRotate;
    }
  }
  
  resetView() {
    // Reset camera position and rotation
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(0, 0, 0);
    
    // Reset controls
    if (this.controls) {
      this.controls.reset();
    }
    
    // Deselect node
    if (this.selectedNode) {
      const prevMesh = this.selectedNode.mesh;
      if (prevMesh.material) {
        prevMesh.material.emissive = new THREE.Color(0x000000);
      }
      this.selectedNode = null;
    }
    
    // Hide node info
    if (this.selectedNodeInfo) {
      this.selectedNodeInfo.style.display = 'none';
    }
  }
  
  updateCoherenceDisplay() {
    if (!this.coherenceFill || !this.coherenceValue) return;
    
    // Update coherence meter
    const percentage = Math.round(this.coherence * 100);
    this.coherenceFill.style.width = `${percentage}%`;
    this.coherenceValue.textContent = `${percentage}%`;
    
    // Update color based on coherence level
    const hue = 200 + (this.coherence * 60); // Blue to teal/green
    this.coherenceFill.style.backgroundColor = `hsl(${hue}, 80%, 50%)`;
  }
  
  updateConnectionCount() {
    if (!this.connectionCountElement) return;
    
    // Update connection count display
    this.connectionCountElement.textContent = this.activeConnections;
  }
  
  onWindowResize() {
    // Update renderer and camera on window resize
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
  
  addStyles() {
    if (!document.getElementById('earth-connection-styles')) {
      const style = document.createElement('style');
      style.id = 'earth-connection-styles';
      style.textContent = `
        .earth-connection-container {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: #000814;
          background: linear-gradient(to bottom, #000814 0%, #001428 100%);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        
        .earth-canvas-container {
          flex: 1;
          width: 100%;
          height: 100%;
        }
        
        .earth-info-display {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: rgba(0, 20, 40, 0.7);
          color: #ffffff;
          padding: 10px;
          border-radius: 5px;
          font-size: 14px;
          min-width: 220px;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          z-index: 100;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .info-header {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 10px;
          text-align: center;
          color: #88ccff;
        }
        
        .info-coherence {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .coherence-meter {
          flex: 1;
          height: 10px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 5px;
          margin: 0 10px;
          overflow: hidden;
        }
        
        .coherence-fill {
          height: 100%;
          width: 50%;
          background-color: #5599ff;
          transition: width 0.3s ease, background-color 0.3s ease;
        }
        
        .info-details {
          margin-bottom: 10px;
        }
        
        .details-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        
        .label {
          color: #88ccff;
        }
        
        .frequency-value {
          color: #88ffcc;
        }
        
        .selected-node-info {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          display: none;
        }
        
        .node-info {
          padding: 8px;
          border-radius: 3px;
          background-color: rgba(0, 40, 80, 0.5);
        }
        
        .sacred-node {
          background-color: rgba(80, 60, 0, 0.5);
          border-left: 3px solid #ffcc22;
        }
        
        .consciousness-node {
          background-color: rgba(0, 40, 80, 0.5);
          border-left: 3px solid #88ccff;
        }
        
        .node-name {
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .node-details {
          font-size: 12px;
        }
        
        .earth-control-panel {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          padding: 8px;
          background-color: rgba(0, 20, 40, 0.7);
          border-radius: 5px;
          flex-wrap: wrap;
          justify-content: center;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          z-index: 100;
        }
        
        .earth-control-button {
          padding: 8px 12px;
          background-color: rgba(0, 80, 120, 0.5);
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .earth-control-button:hover {
          background-color: rgba(0, 100, 150, 0.8);
          transform: translateY(-2px);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        
        .earth-control-button:active {
          transform: translateY(0);
          box-shadow: none;
        }
        
        /* Loading indicator */
        .earth-loading-indicator {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 8, 20, 0.8);
          z-index: 1000;
          color: white;
          transition: opacity 0.5s ease;
        }
        
        .earth-loading-indicator.loading-complete {
          opacity: 0;
          pointer-events: none;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(136, 204, 255, 0.3);
          border-radius: 50%;
          border-top-color: #88ccff;
          animation: spin 1s ease-in-out infinite;
          margin-bottom: 15px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .loading-text {
          font-size: 16px;
          color: #88ccff;
        }
        
        /* Message notification */
        .earth-message {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%) translateY(-50px);
          background-color: rgba(0, 20, 40, 0.9);
          color: white;
          padding: 10px 20px;
          border-radius: 30px;
          font-size: 14px;
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          z-index: 500;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          text-align: center;
        }
        
        .earth-message.visible {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        
        /* Quantum being connection indicator */
        .being-connection-indicator {
          position: absolute;
          bottom: 60px;
          right: 10px;
          background-color: rgba(0, 20, 40, 0.7);
          padding: 8px;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          font-size: 12px;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 100;
        }
        
        .being-connection-indicator.active {
          opacity: 1;
        }
        
        .being-indicator {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .being-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #333;
        }
        
        .being-status.active {
          background-color: #44ff88;
          box-shadow: 0 0 5px #44ff88;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .earth-info-display {
            top: auto;
            bottom: 10px;
            left: 10px;
            max-width: calc(100% - 20px);
            font-size: 12px;
          }
          
          .earth-control-panel {
            bottom: auto;
            top: 10px;
            max-width: calc(100% - 20px);
          }
          
          .earth-control-button {
            font-size: 11px;
            padding: 6px 10px;
          }
          
          .info-header {
            font-size: 14px;
          }
          
          .being-connection-indicator {
            bottom: auto;
            top: 60px;
            right: 10px;
          }
        }
        
        /* Touch device optimizations */
        @media (hover: none) {
          .earth-control-button:hover {
            transform: none;
            box-shadow: none;
            background-color: rgba(0, 80, 120, 0.5);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  createBeingConnectionIndicator() {
    // Create indicators for quantum being connections
    if (!this.quantumBeings) return;
    
    this.beingIndicator = document.createElement('div');
    this.beingIndicator.className = 'being-connection-indicator';
    this.beingIndicator.innerHTML = `
      <div class="being-indicator">
        <div class="being-status" data-being="dolphin"></div>
        <span>Dolphin</span>
      </div>
      <div class="being-indicator">
        <div class="being-status" data-being="butterfly"></div>
        <span>Butterfly</span>
      </div>
      <div class="being-indicator">
        <div class="being-status" data-being="eagle"></div>
        <span>Eagle</span>
      </div>
      <div class="being-indicator">
        <div class="being-status" data-being="greg"></div>
        <span>Greg</span>
      </div>
    `;
    this.container.appendChild(this.beingIndicator);
    
    // Show indicator if quantum beings enabled
    setTimeout(() => {
      if (this.beingIndicator && this.config.quantumBeings) {
        this.beingIndicator.classList.add('active');
      }
    }, 2000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if Three.js is available
  if (!window.THREE) {
    console.error('Three.js is required for Earth Connection Visualizer');
    
    // Add Three.js script if not loaded
    const threeScript = document.createElement('script');
    threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r132/three.min.js';
    document.head.appendChild(threeScript);
    
    // Add OrbitControls
    const orbitScript = document.createElement('script');
    orbitScript.src = 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/controls/OrbitControls.js';
    document.head.appendChild(orbitScript);
  }
  
  // Check for container
  const container = document.getElementById('earth-connection-container');
  if (container) {
    // Initialize visualizer (after a short delay to ensure dependencies are loaded)
    setTimeout(() => {
      window.earthVisualizer = new EarthConnectionVisualizer(container);
      window.earthVisualizer.start();
    }, 500);
  }
});