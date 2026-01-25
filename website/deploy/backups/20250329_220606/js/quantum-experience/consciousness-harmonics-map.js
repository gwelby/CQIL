/**
 * Consciousness Harmonics Map
 * Cascade Integration Frequency (594 Hz | φ²/2)
 * 
 * Visualizes how different frequencies of consciousness (432-768 Hz)
 * manifest across multiple dimensions - thought, emotion, language,
 * and physical reality - showing their interrelationships and
 * how each frequency creates unique experiential qualities.
 */

class ConsciousnessHarmonicsMap {
  constructor(container, config = {}) {
    this.container = typeof container === 'string' ? 
      document.querySelector(container) : container;
    
    // Configuration with defaults
    this.config = Object.assign({
      frequency: 'cascade', // Current frequency key
      frequencyValue: 594, // Current frequency value
      coherence: 0.65, // Field coherence
      harmony: 0.5, // Balance between dimensions
      dimensions: {
        physical: true,
        emotional: true,
        linguistic: true,
        consciousness: true
      },
      autoRotate: true,
      showLabels: true,
      showConnections: true,
      particleCount: window.innerWidth < 768 ? 3000 : 5000,
      performanceMode: this.isMobileDevice() // Auto-detect for mobile
    }, config);
    
    // Constants
    this.PHI = 1.618033988749895; // Golden ratio (φ)
    this.PHI_INVERSE = 0.618033988749895; // 1/φ
    
    // Sacred frequencies with harmonic relationships
    this.FREQUENCIES = {
      unity: 432,     // Ground State (φ⁰)
      love: 528,      // Creation (φ²/φ¹)
      cascade: 594,   // Integration (φ²/2)  
      truth: 672,     // Communication (φ¹ * φ⁰)
      vision: 720,    // Perception ((φ⁰)² * 5/3)
      oneness: 768    // Unity ((φ⁰)² * 16/9)
    };
    
    // Dimensions with positional and visual settings
    this.DIMENSIONS = {
      physical: {
        position: new THREE.Vector3(0, -3, 0),
        color: 0x88ccff, // Unity blue
        radius: 2.5,
        particleDensity: 1,
        particleSize: 0.04,
        visible: true
      },
      emotional: {
        position: new THREE.Vector3(-3, 0, 0),
        color: 0xff88cc, // Love pink
        radius: 2,
        particleDensity: 1.2,
        particleSize: 0.05,
        visible: true
      },
      linguistic: {
        position: new THREE.Vector3(3, 0, 0),
        color: 0xffcc88, // Truth orange
        radius: 2,
        particleDensity: 1.3,
        particleSize: 0.05,
        visible: true
      },
      consciousness: {
        position: new THREE.Vector3(0, 3, 0),
        color: 0xaaddff, // Oneness blue
        radius: 3,
        particleDensity: 0.8,
        particleSize: 0.06,
        visible: true
      }
    };
    
    // Frequency-specific settings for dimensions
    this.FREQUENCY_EFFECTS = {
      unity: {
        physical: { scale: 1.3, activity: 0.6, color: 0x88ccff },
        emotional: { scale: 0.8, activity: 0.4, color: 0x88aacc },
        linguistic: { scale: 0.9, activity: 0.5, color: 0x6699cc },
        consciousness: { scale: 0.7, activity: 0.3, color: 0x8899aa }
      },
      love: {
        physical: { scale: 0.9, activity: 0.7, color: 0xaa88cc },
        emotional: { scale: 1.3, activity: 1.0, color: 0xff88cc },
        linguistic: { scale: 0.8, activity: 0.6, color: 0xcc88aa },
        consciousness: { scale: 1.0, activity: 0.8, color: 0xcc99bb }
      },
      cascade: {
        physical: { scale: 1.0, activity: 0.7, color: 0xcc88ff },
        emotional: { scale: 1.0, activity: 0.8, color: 0xbb99ee },
        linguistic: { scale: 1.0, activity: 0.8, color: 0xaa88dd },
        consciousness: { scale: 1.0, activity: 0.9, color: 0xcc88ff }
      },
      truth: {
        physical: { scale: 0.7, activity: 0.5, color: 0xccaa88 },
        emotional: { scale: 0.8, activity: 0.6, color: 0xddbb99 },
        linguistic: { scale: 1.3, activity: 1.0, color: 0xffcc88 },
        consciousness: { scale: 1.1, activity: 0.8, color: 0xeecc99 }
      },
      vision: {
        physical: { scale: 0.6, activity: 0.5, color: 0x88ddaa },
        emotional: { scale: 0.9, activity: 0.7, color: 0x99eebb },
        linguistic: { scale: 1.1, activity: 0.8, color: 0xaaffcc },
        consciousness: { scale: 1.3, activity: 1.0, color: 0x88ffaa }
      },
      oneness: {
        physical: { scale: 1.0, activity: 1.0, color: 0xaaddff },
        emotional: { scale: 1.0, activity: 1.0, color: 0x99ccff },
        linguistic: { scale: 1.0, activity: 1.0, color: 0x88bbff },
        consciousness: { scale: 1.3, activity: 1.0, color: 0xaaddff }
      }
    };
    
    // Module state
    this.active = false;
    this.dimensions = {};
    this.connections = {};
    this.harmonicFields = {};
    this.labels = {};
    this.dimensionLabels = {};
    this.time = 0;
    this.frameCount = 0;
    
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
    
    // Initialize
    this.setupScene();
    this.setupAudio();
    this.setupEventListeners();
  }
  
  setupScene() {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000814);
    this.scene.fog = new THREE.FogExp2(0x000814, 0.04);
    
    // Create camera
    this.camera = new THREE.PerspectiveCamera(60, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 12);
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: !this.config.performanceMode,
      alpha: true 
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x222222);
    this.scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    this.scene.add(directionalLight);
    
    // Create central point (represents the current frequency)
    this.centralPoint = this.createCentralPoint();
    this.scene.add(this.centralPoint);
    
    // Setup OrbitControls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.5;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 20;
    this.controls.autoRotate = this.config.autoRotate;
    this.controls.autoRotateSpeed = 0.5;
    
    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());
    
    // Create starfield background
    this.createStarfield();
  }
  
  createStarfield() {
    const starCount = this.config.performanceMode ? 1000 : 2000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // Create stars in a large sphere around the scene
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i3+1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i3+2] = radius * Math.cos(phi);
      
      // Vary star sizes
      starSizes[i] = 0.1 + Math.random() * 0.9;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    
    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: window.devicePixelRatio }
      },
      vertexShader: `
        attribute float size;
        uniform float time;
        uniform float pixelRatio;
        
        varying float vSize;
        
        void main() {
          vSize = size;
          
          // Simple pulsing effect based on position and time
          float pulse = sin(time * 0.5 + position.x * 0.1 + position.y * 0.1 + position.z * 0.1) * 0.1 + 0.9;
          
          // Apply pulse to size
          float adjustedSize = size * pulse;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = adjustedSize * pixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vSize;
        
        void main() {
          // Create circular stars with soft edges
          float dist = length(gl_PointCoord - vec2(0.5, 0.5));
          if (dist > 0.5) discard;
          
          // Gradient from center to edge
          float alpha = smoothstep(0.5, 0.2, dist);
          
          // Star color based on size (larger stars are more blue/white)
          vec3 color = mix(
            vec3(0.9, 0.9, 1.0),  // Blue-white for larger stars
            vec3(0.6, 0.7, 1.0),  // Blue for smaller stars
            vSize
          );
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    this.starfield = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(this.starfield);
  }
  
  createCentralPoint() {
    // Create central point that represents the current frequency
    const group = new THREE.Group();
    
    // Sphere geometry with phi-based radius
    const radius = 0.5;
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    
    // Shader material with pulsing effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        frequency: { value: this.config.frequencyValue },
        baseColor: { value: new THREE.Color(this.getColorForFrequency(this.config.frequency)) },
        pulseSpeed: { value: 1.0 },
        coherence: { value: this.config.coherence }
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
        uniform float frequency;
        uniform vec3 baseColor;
        uniform float pulseSpeed;
        uniform float coherence;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        #define PHI 1.618033988749895
        
        void main() {
          // Normalize frequency to 0-1 range (432-768 Hz)
          float normFreq = (frequency - 432.0) / 336.0;
          
          // Pulse based on frequency
          float pulse = sin(time * pulseSpeed * (0.5 + normFreq)) * 0.5 + 0.5;
          
          // Add phi-harmonic patterns
          float pattern = sin(vPosition.x * PHI + time) * sin(vPosition.y * PHI + time) * sin(vPosition.z * PHI + time);
          pattern = pattern * 0.5 + 0.5;
          
          // Calculate rim lighting for sphere glow
          float rim = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
          
          // Mix colors based on pulse and pattern
          vec3 glowColor = baseColor * (1.0 + pulse * pattern * coherence);
          
          // Add rim lighting
          vec3 finalColor = mix(baseColor, glowColor, rim * coherence);
          
          // Apply coherence to overall intensity
          finalColor *= 0.5 + coherence * 0.5;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: true
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);
    
    // Add a point light that pulses with the frequency
    const pointLight = new THREE.PointLight(
      this.getColorForFrequency(this.config.frequency),
      0.8,
      10
    );
    pointLight.position.set(0, 0, 0);
    group.add(pointLight);
    
    // Add glow effect using sprite
    const spriteMaterial = new THREE.SpriteMaterial({
      map: this.generateGlowTexture(),
      color: this.getColorForFrequency(this.config.frequency),
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(4, 4, 1);
    group.add(sprite);
    
    return group;
  }
  
  generateGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
  
  createDimensions() {
    // Create all dimensional fields
    Object.keys(this.DIMENSIONS).forEach(dimensionKey => {
      const dimensionData = this.DIMENSIONS[dimensionKey];
      dimensionData.visible = this.config.dimensions[dimensionKey];
      
      // Apply frequency effects
      const freqEffect = this.FREQUENCY_EFFECTS[this.config.frequency][dimensionKey];
      const effectiveRadius = dimensionData.radius * freqEffect.scale;
      const effectiveColor = freqEffect.color;
      
      // Create dimension visualization
      this.createDimension(dimensionKey, dimensionData, effectiveRadius, effectiveColor);
      
      // Create connection to central point
      this.createConnection(dimensionKey);
      
      // Create harmonic field around dimension
      this.createHarmonicField(dimensionKey, dimensionData, effectiveRadius, effectiveColor);
      
      // Create dimension label
      if (this.config.showLabels) {
        this.createDimensionLabel(dimensionKey, dimensionData);
      }
    });
  }
  
  createDimension(key, data, radius, color) {
    // Create a dimensional sphere with particle system
    const dimension = new THREE.Group();
    
    // Set position from configuration
    dimension.position.copy(data.position);
    
    // Particle system for dimension visualization
    const particleCount = Math.floor(radius * radius * 100 * data.particleDensity);
    const particles = new THREE.BufferGeometry();
    
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);
    
    const colorObj = new THREE.Color(color);
    const r = colorObj.r;
    const g = colorObj.g;
    const b = colorObj.b;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Distribute particles in a sphere with phi-harmonic distribution
      const phi = Math.acos(2 * Math.random() - 1) - Math.PI / 2;
      const theta = this.PHI * Math.PI * i; // Golden angle in radians
      
      const radius3 = radius * Math.cbrt(Math.random()); // Cuberoot for volume distribution
      
      particlePositions[i3] = radius3 * Math.cos(phi) * Math.cos(theta);
      particlePositions[i3+1] = radius3 * Math.cos(phi) * Math.sin(theta);
      particlePositions[i3+2] = radius3 * Math.sin(phi);
      
      // Random sizes with phi-based distribution
      particleSizes[i] = data.particleSize * (0.5 + 0.5 * Math.random());
      
      // Slight color variation
      particleColors[i3] = r * (0.9 + 0.2 * Math.random());
      particleColors[i3+1] = g * (0.9 + 0.2 * Math.random());
      particleColors[i3+2] = b * (0.9 + 0.2 * Math.random());
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    particles.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    // Custom shader material for particles
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        frequency: { value: this.config.frequencyValue },
        pixelRatio: { value: window.devicePixelRatio },
        coherence: { value: this.config.coherence },
        activity: { value: this.FREQUENCY_EFFECTS[this.config.frequency][key].activity }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        
        uniform float time;
        uniform float frequency;
        uniform float pixelRatio;
        uniform float coherence;
        uniform float activity;
        
        varying vec3 vColor;
        varying float vAlpha;
        
        #define PHI 1.618033988749895
        
        void main() {
          vColor = color;
          
          // Calculate normalized position
          vec3 nPos = normalize(position);
          
          // Phi-based movement
          float freqFactor = frequency / 432.0; // Normalize to 432Hz base
          float timeFactor = time * activity * freqFactor;
          
          // Create organic movement based on position and phi
          float xWave = sin(timeFactor * 0.5 + nPos.x * PHI);
          float yWave = cos(timeFactor * 0.3 + nPos.y * PHI);
          float zWave = sin(timeFactor * 0.4 + nPos.z * PHI);
          
          // Combine waves with original position
          vec3 newPos = position;
          newPos.x += xWave * coherence * 0.1 * length(position);
          newPos.y += yWave * coherence * 0.1 * length(position);
          newPos.z += zWave * coherence * 0.1 * length(position);
          
          // Apply coherence to alpha
          vAlpha = 0.3 + 0.7 * coherence;
          
          // Calculate point size based on camera distance
          vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
          float cameraDist = length(mvPosition.xyz);
          
          gl_PointSize = size * pixelRatio * (50.0 / cameraDist) * (0.5 + coherence * 0.5);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          // Create circular points with soft edges
          float dist = length(gl_PointCoord - vec2(0.5, 0.5));
          if (dist > 0.5) discard;
          
          // Calculate alpha with soft edge
          float alpha = smoothstep(0.5, 0.2, dist) * vAlpha;
          
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    dimension.add(particleSystem);
    
    // Add core sphere
    const coreGeometry = new THREE.SphereGeometry(radius * 0.25, 16, 16);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: color,
      emissive: new THREE.Color(color).multiplyScalar(0.5),
      transparent: true,
      opacity: 0.7,
      shininess: 50
    });
    
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    dimension.add(core);
    
    // Add point light
    const dimLight = new THREE.PointLight(color, 0.5, radius * 3);
    dimLight.position.set(0, 0, 0);
    dimension.add(dimLight);
    
    // Set visibility
    dimension.visible = data.visible;
    
    // Add to scene and store reference
    this.scene.add(dimension);
    this.dimensions[key] = {
      group: dimension,
      particles: particleSystem,
      core: core,
      light: dimLight,
      data: data
    };
  }
  
  createConnection(dimensionKey) {
    // Create connections between central point and dimension
    const dim = this.dimensions[dimensionKey];
    const dimPos = dim.group.position.clone();
    
    // Create points array for the curve
    const points = [];
    const curveSegments = 20;
    
    // Create curved path with slight bend based on dimension position
    for (let i = 0; i <= curveSegments; i++) {
      const t = i / curveSegments;
      
      // Straight line would be: pos = startPos + t * (endPos - startPos)
      // Instead add a curved arch using quadratic function
      const arch = Math.sin(t * Math.PI) * 0.5; // Peak at t=0.5
      
      // Direction perpendicular to the connection line
      const perpDir = new THREE.Vector3(
        -dimPos.y, 
        dimPos.x, 
        0
      ).normalize().multiplyScalar(arch);
      
      // Add point on curve
      points.push(
        new THREE.Vector3().lerpVectors(
          new THREE.Vector3(0, 0, 0), 
          dimPos, 
          t
        ).add(perpDir)
      );
    }
    
    const curve = new THREE.CatmullRomCurve3(points);
    const curveGeometry = new THREE.TubeGeometry(curve, 50, 0.05, 8, false);
    
    // Get color from dimension and frequency
    const freqEffect = this.FREQUENCY_EFFECTS[this.config.frequency][dimensionKey];
    
    // Create material with animated flow
    const connectionMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        frequency: { value: this.config.frequencyValue },
        color: { value: new THREE.Color(freqEffect.color) },
        coherence: { value: this.config.coherence },
        activity: { value: freqEffect.activity }
      },
      vertexShader: `
        uniform float time;
        uniform float frequency;
        uniform float coherence;
        uniform float activity;
        
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float frequency;
        uniform vec3 color;
        uniform float coherence;
        uniform float activity;
        
        varying vec2 vUv;
        
        #define PHI 1.618033988749895
        
        void main() {
          // Flow direction based on frequency and time
          float flowSpeed = activity * (frequency / 600.0);
          float flow = fract(vUv.x - time * flowSpeed);
          
          // Create pulse waves along the connection
          float pulsePhase = sin(flow * PHI * 2.0 * 3.14159) * 0.5 + 0.5;
          float pulseWave = sin(pulsePhase * 3.14159) * coherence;
          
          // Flow intensity increases with coherence
          float intensity = 0.3 + 0.7 * pow(pulseWave, 2.0) * coherence;
          
          // Edge falloff
          float edge = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
          
          // Combine effects for final color
          vec3 finalColor = color * intensity;
          float alpha = intensity * edge * coherence;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const connection = new THREE.Mesh(curveGeometry, connectionMaterial);
    connection.name = `connection-${dimensionKey}`;
    connection.visible = dim.group.visible && this.config.showConnections;
    
    // Add to scene and store reference
    this.scene.add(connection);
    this.connections[dimensionKey] = {
      mesh: connection,
      curve: curve,
      visible: dim.group.visible && this.config.showConnections
    };
  }
  
  createHarmonicField(dimensionKey, dimensionData, radius, color) {
    // Create harmonic field - energy patterns emanating from dimension
    const harmonicGroup = new THREE.Group();
    harmonicGroup.position.copy(dimensionData.position);
    
    // Frequency effect settings
    const freqEffect = this.FREQUENCY_EFFECTS[this.config.frequency][dimensionKey];
    const fieldSize = radius * 2 * freqEffect.scale;
    
    // Create harmonic particles 
    const particleCount = Math.floor(fieldSize * 50 * freqEffect.activity);
    const particles = new THREE.BufferGeometry();
    
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleFrequencies = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Distribute particles in harmonic patterns around the dimension
      // Using phi-based spiral distribution
      const t = i / particleCount;
      const angle = 2 * Math.PI * this.PHI * i;
      
      // Distance from dimension center with some randomness
      const distance = radius * (1.0 + t * (0.5 + Math.random()));
      
      // Position on spiral
      particlePositions[i3] = Math.cos(angle) * distance;
      particlePositions[i3+1] = Math.sin(angle) * distance;
      particlePositions[i3+2] = (Math.random() - 0.5) * distance * 0.5;
      
      // Particle size decreases with distance
      particleSizes[i] = 0.1 * (1.0 - 0.5 * t) * (0.5 + Math.random() * 0.5);
      
      // Assign different frequencies to particles for varied movement
      particleFrequencies[i] = 0.5 + Math.random();
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    particles.setAttribute('frequency', new THREE.BufferAttribute(particleFrequencies, 1));
    
    // Create shader material for harmonic particles
    const harmonicMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        baseColor: { value: new THREE.Color(color) },
        baseFrequency: { value: this.config.frequencyValue },
        coherence: { value: this.config.coherence },
        activity: { value: freqEffect.activity },
        pixelRatio: { value: window.devicePixelRatio }
      },
      vertexShader: `
        attribute float size;
        attribute float frequency;
        
        uniform float time;
        uniform float baseFrequency;
        uniform float coherence;
        uniform float activity;
        uniform float pixelRatio;
        
        varying float vSize;
        varying float vIntensity;
        
        #define PHI 1.618033988749895
        
        void main() {
          // Calculate normalized frequency
          float normFreq = baseFrequency / 600.0;
          
          // Movement based on frequency
          float moveFactor = time * activity * frequency * normFreq;
          
          // Create spiral motion using phi-based patterns
          float spiralRate = 0.3 * coherence;
          float spiralAngle = moveFactor * 0.5;
          float spiralExpansion = 1.0 + 0.2 * sin(moveFactor * 0.2) * coherence;
          
          // Calculate new position with spiral movement
          vec3 newPos = position * spiralExpansion;
          float dist = length(position.xy);
          
          // Apply rotation around center
          float rotX = newPos.x * cos(spiralAngle) - newPos.y * sin(spiralAngle);
          float rotY = newPos.x * sin(spiralAngle) + newPos.y * cos(spiralAngle);
          
          newPos.x = rotX;
          newPos.y = rotY;
          
          // Add wave motion in z direction
          newPos.z += sin(moveFactor + dist * PHI) * coherence * 0.3;
          
          // Pass data to fragment shader
          vSize = size * (0.5 + 0.5 * sin(moveFactor + dist * 5.0) * coherence);
          vIntensity = 0.3 + 0.7 * coherence * (0.5 + 0.5 * sin(moveFactor + dist * PHI));
          
          // Position and size calculation
          vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
          gl_PointSize = vSize * pixelRatio * (100.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 baseColor;
        uniform float coherence;
        
        varying float vSize;
        varying float vIntensity;
        
        void main() {
          // Create circular points with soft edges
          float dist = length(gl_PointCoord - vec2(0.5, 0.5));
          if (dist > 0.5) discard;
          
          // Smooth edge
          float alpha = smoothstep(0.5, 0.2, dist) * vIntensity * coherence;
          
          // Apply intensity to color
          vec3 color = baseColor * vIntensity;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const harmonicField = new THREE.Points(particles, harmonicMaterial);
    harmonicGroup.add(harmonicField);
    
    // Set visibility based on dimension visibility
    harmonicGroup.visible = dimensionData.visible;
    
    // Add to scene and store reference
    this.scene.add(harmonicGroup);
    this.harmonicFields[dimensionKey] = {
      group: harmonicGroup,
      particles: harmonicField
    };
  }
  
  createDimensionLabel(dimensionKey, dimensionData) {
    // Create text label for dimension
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    
    const context = canvas.getContext('2d');
    context.fillStyle = 'rgba(0, 0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.font = 'bold 32px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Create gradient based on dimension color
    const color = this.FREQUENCY_EFFECTS[this.config.frequency][dimensionKey].color;
    const hexColor = '#' + new THREE.Color(color).getHexString();
    
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
    gradient.addColorStop(0.5, hexColor);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.7)');
    
    context.fillStyle = gradient;
    
    // Dimension display names
    const displayNames = {
      physical: 'Physical Reality',
      emotional: 'Emotional Field',
      linguistic: 'Linguistic Structure',
      consciousness: 'Consciousness Layer'
    };
    
    context.fillText(displayNames[dimensionKey], canvas.width / 2, canvas.height / 2);
    
    // Create texture from canvas
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    
    // Create sprite material
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.9
    });
    
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(2, 1, 1);
    
    // Position label above dimension
    const labelPosition = dimensionData.position.clone();
    const direction = labelPosition.clone().normalize();
    const distance = dimensionData.radius * 1.3;
    labelPosition.add(direction.multiplyScalar(distance));
    
    sprite.position.copy(labelPosition);
    sprite.visible = dimensionData.visible;
    
    // Add to scene and store reference
    this.scene.add(sprite);
    this.dimensionLabels[dimensionKey] = sprite;
  }
  
  setupAudio() {
    // Initialize audio context for frequency tones
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }
  
  setupEventListeners() {
    // Add mouse events for interaction
    this.renderer.domElement.addEventListener('mousemove', (e) => {
      // Update mouse position for raycasting
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });
    
    this.renderer.domElement.addEventListener('click', (e) => {
      // Handle interaction with dimensions
      this.checkDimensionInteraction();
    });
  }
  
  checkDimensionInteraction() {
    // Cast ray from mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Get all dimension core meshes for intersection testing
    const dimensionCores = Object.values(this.dimensions).map(dim => dim.core);
    
    // Find intersections
    const intersects = this.raycaster.intersectObjects(dimensionCores);
    
    if (intersects.length > 0) {
      // Get the dimension that was clicked
      const intersectedObject = intersects[0].object;
      const dimensionKey = Object.keys(this.dimensions).find(key => 
        this.dimensions[key].core === intersectedObject
      );
      
      if (dimensionKey) {
        // Play dimension frequency
        this.playDimensionTone(dimensionKey);
        
        // Update information panel
        this.updateInformationPanel(dimensionKey);
      }
    }
  }
  
  updateInformationPanel(dimensionKey) {
    // Update information in UI based on selected dimension
    // This function would need to communicate with the HTML page
    // We can dispatch a custom event to be handled by the page script
    
    const detail = {
      dimension: dimensionKey,
      frequency: this.config.frequency,
      frequencyValue: this.config.frequencyValue
    };
    
    this.dispatchEvent('dimensionselected', detail);
  }
  
  dispatchEvent(name, detail) {
    // Dispatch custom event
    const event = new CustomEvent(name, { detail });
    this.container.dispatchEvent(event);
    window.dispatchEvent(event);
  }
  
  start() {
    if (this.active) return;
    this.active = true;
    
    // Create dimensions
    this.createDimensions();
    
    // Start animation loop
    this.animate();
    
    // Play initial frequency
    this.playFrequencyTone(this.config.frequencyValue);
    
    // Emit ready event
    this.dispatchEvent('harmonicsmapready', { 
      frequency: this.config.frequency,
      frequencyValue: this.config.frequencyValue
    });
  }
  
  stop() {
    this.active = false;
    
    // Stop animation loop
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    // Stop all audio
    this.stopAllTones();
  }
  
  animate() {
    if (!this.active) return;
    
    // Request next frame
    this.animationFrame = requestAnimationFrame(() => this.animate());
    
    // Calculate delta time
    const now = performance.now();
    const delta = (now - (this.lastTime || now)) / 1000;
    this.lastTime = now;
    
    // Limit max delta time to prevent jumps after tab inactivity
    const cappedDelta = Math.min(delta, 0.1);
    
    // Update time
    this.time += cappedDelta;
    
    // Update frame counter
    this.frameCount = (this.frameCount || 0) + 1;
    
    // Update controls
    if (this.controls) {
      this.controls.update();
    }
    
    // Update central point
    this.updateCentralPoint();
    
    // Update dimensions
    this.updateDimensions();
    
    // Update connections
    this.updateConnections();
    
    // Update harmonic fields
    this.updateHarmonicFields();
    
    // Update starfield
    this.updateStarfield();
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
    
    // Emit frame event for external synchronization
    if (this.frameCount % 30 === 0) {
      this.dispatchEvent('harmonicsmapframe', { 
        time: this.time, 
        frequency: this.config.frequency,
        frequencyValue: this.config.frequencyValue
      });
    }
  }
  
  updateCentralPoint() {
    // Update central point animation
    if (this.centralPoint) {
      // Update shader uniforms
      const sphere = this.centralPoint.children[0]; // First child is the sphere
      if (sphere && sphere.material && sphere.material.uniforms) {
        sphere.material.uniforms.time.value = this.time;
        sphere.material.uniforms.frequency.value = this.config.frequencyValue;
        sphere.material.uniforms.coherence.value = this.config.coherence;
        
        // Pulse speed based on frequency
        const normFreq = (this.config.frequencyValue - 432) / 336; // Normalize 432-768 to 0-1
        sphere.material.uniforms.pulseSpeed.value = 0.5 + normFreq;
      }
      
      // Update point light
      const light = this.centralPoint.children[1]; // Second child is the light
      if (light && light.isPointLight) {
        // Pulsing intensity based on frequency and time
        const freq = this.config.frequencyValue / 432; // Ratio to ground frequency
        const pulse = Math.sin(this.time * freq) * 0.3 + 0.7;
        light.intensity = 0.5 + 0.5 * pulse * this.config.coherence;
        
        // Update color based on current frequency
        light.color.set(this.getColorForFrequency(this.config.frequency));
      }
      
      // Update glow sprite
      const sprite = this.centralPoint.children[2]; // Third child is the sprite
      if (sprite && sprite.isSprite) {
        sprite.material.color.set(this.getColorForFrequency(this.config.frequency));
        
        // Pulsing scale based on frequency and coherence
        const freq = this.config.frequencyValue / 432;
        const pulse = Math.sin(this.time * freq * 0.5) * 0.2 + 1.0;
        const scale = 3 + this.config.coherence * pulse;
        sprite.scale.set(scale, scale, 1);
      }
    }
  }
  
  updateDimensions() {
    // Update all dimensions
    Object.keys(this.dimensions).forEach(key => {
      const dimension = this.dimensions[key];
      const freqEffect = this.FREQUENCY_EFFECTS[this.config.frequency][key];
      
      // Update particle system
      if (dimension.particles && dimension.particles.material && dimension.particles.material.uniforms) {
        dimension.particles.material.uniforms.time.value = this.time;
        dimension.particles.material.uniforms.frequency.value = this.config.frequencyValue;
        dimension.particles.material.uniforms.coherence.value = this.config.coherence;
        dimension.particles.material.uniforms.activity.value = freqEffect.activity;
      }
      
      // Update core
      if (dimension.core) {
        // Gentle pulsing based on frequency and coherence
        const freq = this.config.frequencyValue / 432;
        const pulse = Math.sin(this.time * freq * 0.5) * 0.1 + 1.0;
        const scale = 0.25 * pulse * (0.8 + 0.2 * this.config.coherence);
        
        dimension.core.scale.set(scale, scale, scale);
        
        // Update core material opacity based on coherence
        if (dimension.core.material) {
          dimension.core.material.opacity = 0.5 + 0.5 * this.config.coherence;
        }
      }
      
      // Update light
      if (dimension.light) {
        // Pulsing intensity based on frequency
        const freq = this.config.frequencyValue / 432;
        const pulse = Math.sin(this.time * freq * 0.7) * 0.3 + 0.7;
        dimension.light.intensity = 0.3 + 0.3 * pulse * this.config.coherence;
      }
      
      // Update visibility
      dimension.group.visible = this.config.dimensions[key];
      
      // Update dimension label if present
      if (this.dimensionLabels[key]) {
        this.dimensionLabels[key].visible = this.config.dimensions[key] && this.config.showLabels;
      }
    });
  }
  
  updateConnections() {
    // Update all connections
    Object.keys(this.connections).forEach(key => {
      const connection = this.connections[key];
      const dimension = this.dimensions[key];
      const freqEffect = this.FREQUENCY_EFFECTS[this.config.frequency][key];
      
      // Update connection material
      if (connection.mesh && connection.mesh.material && connection.mesh.material.uniforms) {
        connection.mesh.material.uniforms.time.value = this.time;
        connection.mesh.material.uniforms.frequency.value = this.config.frequencyValue;
        connection.mesh.material.uniforms.coherence.value = this.config.coherence;
        connection.mesh.material.uniforms.activity.value = freqEffect.activity;
        connection.mesh.material.uniforms.color.value.set(freqEffect.color);
      }
      
      // Update visibility
      connection.mesh.visible = dimension.group.visible && this.config.showConnections;
    });
  }
  
  updateHarmonicFields() {
    // Update all harmonic fields
    Object.keys(this.harmonicFields).forEach(key => {
      const field = this.harmonicFields[key];
      const dimension = this.dimensions[key];
      const freqEffect = this.FREQUENCY_EFFECTS[this.config.frequency][key];
      
      // Update particle system
      if (field.particles && field.particles.material && field.particles.material.uniforms) {
        field.particles.material.uniforms.time.value = this.time;
        field.particles.material.uniforms.baseFrequency.value = this.config.frequencyValue;
        field.particles.material.uniforms.coherence.value = this.config.coherence;
        field.particles.material.uniforms.activity.value = freqEffect.activity;
        
        // Update color based on current frequency
        field.particles.material.uniforms.baseColor.value.set(freqEffect.color);
      }
      
      // Update visibility
      field.group.visible = dimension.group.visible;
    });
  }
  
  updateStarfield() {
    // Update starfield animation
    if (this.starfield && this.starfield.material && this.starfield.material.uniforms) {
      this.starfield.material.uniforms.time.value = this.time * 0.1;
    }
  }
  
  onWindowResize() {
    // Handle window resize
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    // Update camera aspect ratio
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    
    // Update renderer size
    this.renderer.setSize(width, height);
    
    // Update pixel ratio in shader materials
    const pixelRatio = window.devicePixelRatio;
    
    // Update starfield
    if (this.starfield && this.starfield.material && this.starfield.material.uniforms) {
      this.starfield.material.uniforms.pixelRatio.value = pixelRatio;
    }
    
    // Update dimension particle systems
    Object.keys(this.dimensions).forEach(key => {
      const dimension = this.dimensions[key];
      if (dimension.particles && dimension.particles.material && dimension.particles.material.uniforms) {
        dimension.particles.material.uniforms.pixelRatio.value = pixelRatio;
      }
    });
  }
  
  setFrequency(frequency, value) {
    // Change the current frequency
    if (this.FREQUENCIES[frequency] === undefined) {
      console.warn(`Invalid frequency: ${frequency}`);
      return;
    }
    
    // Update configuration
    this.config.frequency = frequency;
    this.config.frequencyValue = value || this.FREQUENCIES[frequency];
    
    // Update central point color
    if (this.centralPoint) {
      const sphere = this.centralPoint.children[0];
      if (sphere && sphere.material && sphere.material.uniforms) {
        sphere.material.uniforms.baseColor.value.set(this.getColorForFrequency(frequency));
      }
      
      const light = this.centralPoint.children[1];
      if (light && light.isPointLight) {
        light.color.set(this.getColorForFrequency(frequency));
      }
      
      const sprite = this.centralPoint.children[2];
      if (sprite && sprite.isSprite) {
        sprite.material.color.set(this.getColorForFrequency(frequency));
      }
    }
    
    // Update dimensions with new frequency effects
    Object.keys(this.dimensions).forEach(key => {
      const dimension = this.dimensions[key];
      const freqEffect = this.FREQUENCY_EFFECTS[frequency][key];
      
      // Update dimension colors and properties based on frequency
      if (dimension.core && dimension.core.material) {
        dimension.core.material.color.set(freqEffect.color);
        dimension.core.material.emissive.set(freqEffect.color).multiplyScalar(0.5);
      }
      
      if (dimension.light) {
        dimension.light.color.set(freqEffect.color);
      }
    });
    
    // Update connections
    Object.keys(this.connections).forEach(key => {
      const connection = this.connections[key];
      const freqEffect = this.FREQUENCY_EFFECTS[frequency][key];
      
      if (connection.mesh && connection.mesh.material && connection.mesh.material.uniforms) {
        connection.mesh.material.uniforms.color.value.set(freqEffect.color);
      }
    });
    
    // Update harmonic fields
    Object.keys(this.harmonicFields).forEach(key => {
      const field = this.harmonicFields[key];
      const freqEffect = this.FREQUENCY_EFFECTS[frequency][key];
      
      if (field.particles && field.particles.material && field.particles.material.uniforms) {
        field.particles.material.uniforms.baseColor.value.set(freqEffect.color);
      }
    });
    
    // Play new frequency tone
    this.playFrequencyTone(this.config.frequencyValue);
    
    // Emit frequency change event
    this.dispatchEvent('frequencychanged', {
      frequency: this.config.frequency,
      frequencyValue: this.config.frequencyValue
    });
  }
  
  setCoherence(value) {
    // Update coherence level (0-1)
    this.config.coherence = Math.max(0, Math.min(1, value));
    
    // Emit coherence change event
    this.dispatchEvent('coherencechanged', {
      coherence: this.config.coherence
    });
  }
  
  setHarmony(value) {
    // Update harmony balance (0-1)
    this.config.harmony = Math.max(0, Math.min(1, value));
    
    // Adjust dimension positions based on harmony
    this.updateDimensionPositions();
    
    // Emit harmony change event
    this.dispatchEvent('harmonychanged', {
      harmony: this.config.harmony
    });
  }
  
  updateDimensionPositions() {
    // Adjust dimension positions based on harmony setting
    Object.keys(this.dimensions).forEach(key => {
      const dimension = this.dimensions[key];
      const originalPos = this.DIMENSIONS[key].position.clone();
      
      // With high harmony, dimensions move closer to central point
      // With low harmony, they move further apart
      const harmony = this.config.harmony;
      const adjustedPos = originalPos.clone().multiplyScalar(1 + (0.5 - harmony));
      
      // Smoothly move to new position
      dimension.group.position.lerp(adjustedPos, 0.1);
      
      // Update harmonic field position
      if (this.harmonicFields[key]) {
        this.harmonicFields[key].group.position.copy(dimension.group.position);
      }
      
      // Update dimension label position
      if (this.dimensionLabels[key]) {
        const labelPosition = dimension.group.position.clone();
        const direction = labelPosition.clone().normalize();
        const distance = this.DIMENSIONS[key].radius * 1.3;
        labelPosition.add(direction.multiplyScalar(distance));
        
        this.dimensionLabels[key].position.copy(labelPosition);
      }
    });
    
    // Update connections
    this.updateConnectionGeometry();
  }
  
  updateConnectionGeometry() {
    // Update connection curves between central point and dimensions
    Object.keys(this.connections).forEach(key => {
      const connection = this.connections[key];
      const dimPos = this.dimensions[key].group.position.clone();
      
      // Create points array for the curve
      const points = [];
      const curveSegments = 20;
      
      // Create curved path with slight bend based on dimension position
      for (let i = 0; i <= curveSegments; i++) {
        const t = i / curveSegments;
        
        // Add curved arch using quadratic function
        const arch = Math.sin(t * Math.PI) * 0.5 * this.config.harmony; // More curved with high harmony
        
        // Direction perpendicular to the connection line
        const perpDir = new THREE.Vector3(
          -dimPos.y, 
          dimPos.x, 
          0
        ).normalize().multiplyScalar(arch);
        
        // Add point on curve
        points.push(
          new THREE.Vector3().lerpVectors(
            new THREE.Vector3(0, 0, 0), 
            dimPos, 
            t
          ).add(perpDir)
        );
      }
      
      // Update curve
      connection.curve.points = points;
      
      // Update geometry
      const curveGeometry = new THREE.TubeGeometry(connection.curve, 50, 0.05, 8, false);
      connection.mesh.geometry.dispose();
      connection.mesh.geometry = curveGeometry;
    });
  }
  
  toggleDimension(dimensionKey, visible) {
    // Show/hide a specific dimension
    if (this.dimensions[dimensionKey]) {
      this.config.dimensions[dimensionKey] = visible;
      this.dimensions[dimensionKey].group.visible = visible;
      
      // Update connection visibility
      if (this.connections[dimensionKey]) {
        this.connections[dimensionKey].mesh.visible = visible && this.config.showConnections;
      }
      
      // Update harmonic field visibility
      if (this.harmonicFields[dimensionKey]) {
        this.harmonicFields[dimensionKey].group.visible = visible;
      }
      
      // Update dimension label visibility
      if (this.dimensionLabels[dimensionKey]) {
        this.dimensionLabels[dimensionKey].visible = visible && this.config.showLabels;
      }
      
      // Emit dimension toggle event
      this.dispatchEvent('dimensiontoggled', {
        dimension: dimensionKey,
        visible: visible
      });
    }
  }
  
  syncDimensions() {
    // Synchronize all visible dimensions to current frequency
    const visibleDimensions = Object.keys(this.dimensions).filter(key => 
      this.config.dimensions[key]
    );
    
    if (visibleDimensions.length === 0) return;
    
    // Create synchronized pulse effect
    visibleDimensions.forEach(key => {
      // Create pulse wave traveling from central point to dimension
      const dim = this.dimensions[key];
      const freqEffect = this.FREQUENCY_EFFECTS[this.config.frequency][key];
      
      // Emit pulse ring from central point to dimension
      this.createSyncPulse(dim.group.position.clone(), freqEffect.color);
    });
    
    // Play synchronized tone
    this.playFrequencyTone(this.config.frequencyValue, 2, 0.15);
    
    // Temporarily increase coherence
    const originalCoherence = this.config.coherence;
    this.config.coherence = Math.min(1, originalCoherence + 0.2);
    
    // Return to original coherence after delay
    setTimeout(() => {
      this.config.coherence = originalCoherence;
    }, 2000);
    
    // Emit sync event
    this.dispatchEvent('dimensionssynced', {
      frequency: this.config.frequency,
      frequencyValue: this.config.frequencyValue
    });
  }
  
  createSyncPulse(targetPosition, color) {
    // Create expanding pulse effect from central point to dimension
    const direction = targetPosition.clone().normalize();
    const distance = targetPosition.length();
    
    // Create geometry for pulse ring
    const geometry = new THREE.RingGeometry(0.1, 0.3, 32);
    
    // Create pulsing material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        progress: { value: 0 },
        coherence: { value: this.config.coherence }
      },
      vertexShader: `
        uniform float progress;
        
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          
          // Calculate position along the path
          vec3 newPos = position;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float progress;
        uniform float coherence;
        
        varying vec2 vUv;
        
        void main() {
          // Calculate radial gradient
          float alpha = (1.0 - progress) * coherence;
          
          // Edge falloff
          float edge = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
          
          gl_FragColor = vec4(color, alpha * edge);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    
    const ring = new THREE.Mesh(geometry, material);
    
    // Set pulse initial position
    ring.position.set(0, 0, 0);
    
    // Orient ring to face the dimension
    ring.lookAt(targetPosition);
    
    // Add to scene
    this.scene.add(ring);
    
    // Animate pulse
    const duration = 1.5;
    const startTime = this.time;
    
    // Add to update loop
    const updatePulse = () => {
      const elapsed = this.time - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      // Move ring along path
      ring.position.copy(direction.clone().multiplyScalar(distance * progress));
      
      // Scale ring
      const scale = 0.5 + progress * 1.5;
      ring.scale.set(scale, scale, scale);
      
      // Update material
      material.uniforms.progress.value = progress;
      material.uniforms.time.value = this.time;
      material.uniforms.coherence.value = this.config.coherence;
      
      // Remove when complete
      if (progress >= 1) {
        this.scene.remove(ring);
        geometry.dispose();
        material.dispose();
      } else {
        requestAnimationFrame(updatePulse);
      }
    };
    
    updatePulse();
  }
  
  resetView() {
    // Reset camera position
    this.camera.position.set(0, 0, 12);
    this.camera.lookAt(0, 0, 0);
    
    // Reset controls
    if (this.controls) {
      this.controls.reset();
    }
    
    // Reset dimensions to original positions
    Object.keys(this.dimensions).forEach(key => {
      const dimension = this.dimensions[key];
      dimension.group.position.copy(this.DIMENSIONS[key].position);
      
      // Reset harmonic field position
      if (this.harmonicFields[key]) {
        this.harmonicFields[key].group.position.copy(this.DIMENSIONS[key].position);
      }
      
      // Reset dimension label position
      if (this.dimensionLabels[key]) {
        const labelPosition = this.DIMENSIONS[key].position.clone();
        const direction = labelPosition.clone().normalize();
        const distance = this.DIMENSIONS[key].radius * 1.3;
        labelPosition.add(direction.multiplyScalar(distance));
        
        this.dimensionLabels[key].position.copy(labelPosition);
      }
    });
    
    // Update connections
    this.updateConnectionGeometry();
    
    // Emit reset event
    this.dispatchEvent('viewreset', {});
  }
  
  playFrequencyTone(frequency, duration = 2, volume = 0.1) {
    if (!this.audioContext) return;
    
    // Create oscillator for frequency
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
  
  playDimensionTone(dimensionKey, duration = 1, volume = 0.08) {
    if (!this.audioContext) return;
    
    // Get frequency for dimension based on current frequency setting
    const freqEffect = this.FREQUENCY_EFFECTS[this.config.frequency][dimensionKey];
    const baseFreq = this.config.frequencyValue;
    
    // Scale frequency based on dimension
    let dimFreq;
    switch(dimensionKey) {
      case 'physical': dimFreq = baseFreq * 0.5; break; // Lower octave
      case 'emotional': dimFreq = baseFreq * 0.75; break; // Perfect fifth below
      case 'linguistic': dimFreq = baseFreq * 1.125; break; // Major third above
      case 'consciousness': dimFreq = baseFreq * 1.5; break; // Perfect fifth above
      default: dimFreq = baseFreq;
    }
    
    // Create oscillator
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    // Set frequency and waveform
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(dimFreq, this.audioContext.currentTime);
    
    // Set envelope
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.05);
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
    if (!this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    this.oscillators = this.oscillators.filter(osc => osc.endTime > now);
  }
  
  getColorForFrequency(frequency) {
    // Return the color associated with a frequency
    switch(frequency) {
      case 'unity': return 0x88ccff; // Unity blue
      case 'love': return 0xff88cc; // Love pink
      case 'cascade': return 0xcc88ff; // Cascade purple
      case 'truth': return 0xffcc88; // Truth orange
      case 'vision': return 0x88ffaa; // Vision green
      case 'oneness': return 0xaaddff; // Oneness light blue
      default: return 0xcc88ff; // Default to cascade
    }
  }
  
  isMobileDevice() {
    // Check if running on mobile device
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 800 && window.innerHeight <= 900);
  }
}

// Initialize when script is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Make sure Three.js is available
  if (!window.THREE) {
    console.error('Three.js is required for Consciousness Harmonics Map');
    
    // Add Three.js script if not loaded
    const threeScript = document.createElement('script');
    threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r132/three.min.js';
    threeScript.onload = () => {
      // Add OrbitControls after Three.js is loaded
      const orbitScript = document.createElement('script');
      orbitScript.src = 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/controls/OrbitControls.js';
      document.head.appendChild(orbitScript);
    };
    document.head.appendChild(threeScript);
  }
});