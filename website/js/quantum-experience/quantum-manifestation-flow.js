/**
 * Quantum Manifestation Flow
 * Creation/Love Frequency (528 Hz | φ²/φ¹)
 * 
 * Visualizes the journey from thought to physical reality,
 * demonstrating how consciousness uses language and emotion as
 * a crystallization mechanism before manifesting through
 * heart-centered intention in 3D reality.
 */

class QuantumManifestationFlow {
  constructor(container, config = {}) {
    this.container = typeof container === 'string' ? 
      document.querySelector(container) : container;
    
    // Configuration with defaults
    this.config = Object.assign({
      frequency: 'love', // Creation frequency (528 Hz)
      frequencyValue: 528,
      heartCoherence: 0.7, // Heart field coherence
      thoughtClarity: 0.5, // Thought field clarity
      emotionalAlignment: 0.6, // Emotional alignment
      manifestationPower: 0.5, // Manifestation power level
      stages: {
        thought: true,
        language: true,
        emotion: true,
        reality: true
      },
      autoFlow: true,
      showLabels: true,
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
    
    // Stages with positional and visual settings
    this.STAGES = {
      thought: {
        position: new THREE.Vector3(0, 4, 0),
        color: 0xaaddff, // Blue - Thought realm
        radius: 1.5,
        particleDensity: 0.8,
        particleSize: 0.04,
        visible: true
      },
      language: {
        position: new THREE.Vector3(3, 1.5, 0),
        color: 0xffcc88, // Orange - Language crystallization
        radius: 1.2,
        particleDensity: 1.2,
        particleSize: 0.05,
        visible: true
      },
      emotion: {
        position: new THREE.Vector3(-3, 1.5, 0),
        color: 0xff88cc, // Pink - Emotional field
        radius: 1.8,
        particleDensity: 1.1,
        particleSize: 0.06,
        visible: true
      },
      reality: {
        position: new THREE.Vector3(0, -3, 0),
        color: 0x88ccff, // Lighter blue - Physical reality
        radius: 2.2,
        particleDensity: 1.5,
        particleSize: 0.05,
        visible: true
      }
    };
    
    // Flow patterns between stages
    this.FLOW_PATTERNS = {
      // Thought → Language
      thoughtToLanguage: {
        width: 0.08,
        particleSpeed: 2.0,
        particleSize: 0.05,
        color: 0xaabbff,
        flowRate: 0.7
      },
      // Thought → Emotion
      thoughtToEmotion: {
        width: 0.1,
        particleSpeed: 1.8,
        particleSize: 0.06,
        color: 0xffaabb,
        flowRate: 0.8
      },
      // Language + Emotion → Reality
      languageEmotionToReality: {
        width: 0.15,
        particleSpeed: 2.2,
        particleSize: 0.08,
        color: 0xffaacc,
        flowRate: 0.6
      }
    };
    
    // Module state
    this.active = false;
    this.stages = {};
    this.flows = {};
    this.manifestationField = null;
    this.heartCenter = null;
    this.labels = {};
    this.time = 0;
    this.frameCount = 0;
    this.manifestationParticles = [];
    
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
    this.scene.fog = new THREE.FogExp2(0x000814, 0.03);
    
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
    
    // Create heart center (the creation/manifestation point)
    this.heartCenter = this.createHeartCenter();
    this.scene.add(this.heartCenter);
    
    // Setup OrbitControls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.5;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 20;
    this.controls.autoRotate = this.config.autoFlow;
    this.controls.autoRotateSpeed = 0.3;
    
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
          float pulse = sin(time * 0.3 + position.x * 0.05 + position.y * 0.05 + position.z * 0.05) * 0.1 + 0.9;
          
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
  
  createHeartCenter() {
    // Create heart center - the source of manifestation energy
    const group = new THREE.Group();
    
    // Heart center geometry
    const radius = 0.6;
    const heartGeometry = new THREE.SphereGeometry(radius, 32, 32);
    
    // Shader material with pulsing effect
    const heartMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        frequency: { value: this.config.frequencyValue },
        baseColor: { value: new THREE.Color(0xff88cc) }, // Pink for heart center
        coherence: { value: this.config.heartCoherence },
        pulseSpeed: { value: 1.2 }
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
        uniform float coherence;
        uniform float pulseSpeed;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        #define PHI 1.618033988749895
        
        void main() {
          // Normalize frequency to 0-1 range (432-768 Hz)
          float normFreq = (frequency - 432.0) / 336.0;
          
          // Heart pulse pattern - more organic and less regular
          float heartBeat = sin(time * pulseSpeed) * sin(time * pulseSpeed * 4.0);
          float heartPulse = pow(heartBeat * 0.5 + 0.5, 2.0) * coherence;
          
          // Add phi-harmonic patterns flowing out from center
          float pattern = sin(length(vPosition) * PHI - time * pulseSpeed);
          pattern = pattern * 0.5 + 0.5;
          
          // Calculate rim lighting for heart glow
          float rim = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          
          // Mix colors based on pulse and pattern
          vec3 glowColor = baseColor * (1.0 + heartPulse * pattern);
          
          // Add rim lighting
          vec3 finalColor = mix(baseColor, glowColor, rim * coherence);
          
          // Overall intensity controlled by coherence
          finalColor *= 0.7 + coherence * 0.5;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: true
    });
    
    const heart = new THREE.Mesh(heartGeometry, heartMaterial);
    group.add(heart);
    
    // Add a point light that pulses with the heart
    const heartLight = new THREE.PointLight(0xff88cc, 1.0, 10);
    heartLight.position.set(0, 0, 0);
    group.add(heartLight);
    
    // Add glow effect using sprite
    const spriteMaterial = new THREE.SpriteMaterial({
      map: this.generateGlowTexture(),
      color: 0xff88cc,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(3, 3, 1);
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
  
  createStages() {
    // Create all stage fields
    Object.keys(this.STAGES).forEach(stageKey => {
      const stageData = this.STAGES[stageKey];
      stageData.visible = this.config.stages[stageKey];
      
      // Create stage visualization
      this.createStage(stageKey, stageData);
      
      // Create stage label
      if (this.config.showLabels) {
        this.createStageLabel(stageKey, stageData);
      }
    });
    
    // Create flows between stages
    this.createFlows();
    
    // Create manifestation field
    this.createManifestationField();
  }
  
  createStage(key, data) {
    // Create a stage sphere with particle system
    const stage = new THREE.Group();
    
    // Set position from configuration
    stage.position.copy(data.position);
    
    // Particle system for stage visualization
    const particleCount = Math.floor(data.radius * data.radius * 150 * data.particleDensity);
    const particles = new THREE.BufferGeometry();
    
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);
    
    const colorObj = new THREE.Color(data.color);
    const r = colorObj.r;
    const g = colorObj.g;
    const b = colorObj.b;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Distribute particles in a sphere with phi-harmonic distribution
      const phi = Math.acos(2 * Math.random() - 1) - Math.PI / 2;
      const theta = this.PHI * Math.PI * i; // Golden angle in radians
      
      const radius3 = data.radius * Math.pow(Math.random(), 1/3); // Cube root for volume distribution
      
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
        coherence: { value: this.getStageCoherence(key) }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        
        uniform float time;
        uniform float frequency;
        uniform float pixelRatio;
        uniform float coherence;
        
        varying vec3 vColor;
        varying float vAlpha;
        
        #define PHI 1.618033988749895
        
        void main() {
          vColor = color;
          
          // Calculate normalized position
          vec3 nPos = normalize(position);
          
          // Phi-based movement
          float freqFactor = frequency / 528.0; // Normalize to 528Hz (creation)
          float timeFactor = time * freqFactor;
          
          // Create organic movement based on position and phi
          float xWave = sin(timeFactor * 0.5 + nPos.x * PHI) * coherence;
          float yWave = cos(timeFactor * 0.4 + nPos.y * PHI) * coherence;
          float zWave = sin(timeFactor * 0.3 + nPos.z * PHI) * coherence;
          
          // Combine waves with original position
          vec3 newPos = position;
          newPos.x += xWave * 0.1 * length(position);
          newPos.y += yWave * 0.1 * length(position);
          newPos.z += zWave * 0.1 * length(position);
          
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
    stage.add(particleSystem);
    
    // Add core sphere
    const coreGeometry = new THREE.SphereGeometry(data.radius * 0.2, 16, 16);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: data.color,
      emissive: new THREE.Color(data.color).multiplyScalar(0.5),
      transparent: true,
      opacity: 0.7
    });
    
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    stage.add(core);
    
    // Add point light
    const stageLight = new THREE.PointLight(data.color, 0.5, data.radius * 3);
    stageLight.position.set(0, 0, 0);
    stage.add(stageLight);
    
    // Set visibility
    stage.visible = data.visible;
    
    // Add to scene and store reference
    this.scene.add(stage);
    this.stages[key] = {
      group: stage,
      particles: particleSystem,
      core: core,
      light: stageLight,
      data: data
    };
  }
  
  createStageLabel(stageKey, stageData) {
    // Create text label for stage
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    
    const context = canvas.getContext('2d');
    context.fillStyle = 'rgba(0, 0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.font = 'bold 32px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Create gradient based on stage color
    const hexColor = '#' + new THREE.Color(stageData.color).getHexString();
    
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
    gradient.addColorStop(0.5, hexColor);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.7)');
    
    context.fillStyle = gradient;
    
    // Stage display names
    const displayNames = {
      thought: 'Thought Origin',
      language: 'Language Structure',
      emotion: 'Emotional Energy',
      reality: 'Physical Manifestation'
    };
    
    context.fillText(displayNames[stageKey], canvas.width / 2, canvas.height / 2);
    
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
    
    // Position label above stage
    const labelPosition = stageData.position.clone();
    const direction = labelPosition.clone().normalize();
    const distance = stageData.radius * 1.3;
    labelPosition.add(direction.multiplyScalar(distance));
    
    sprite.position.copy(labelPosition);
    sprite.visible = stageData.visible;
    
    // Add to scene and store reference
    this.scene.add(sprite);
    this.labels[stageKey] = sprite;
  }
  
  createFlows() {
    // Create flow paths between stages
    
    // Thought → Language Flow
    if (this.stages.thought && this.stages.language) {
      this.createFlow('thoughtToLanguage', 
        this.stages.thought.group.position,
        this.stages.language.group.position,
        this.FLOW_PATTERNS.thoughtToLanguage
      );
    }
    
    // Thought → Emotion Flow
    if (this.stages.thought && this.stages.emotion) {
      this.createFlow('thoughtToEmotion', 
        this.stages.thought.group.position,
        this.stages.emotion.group.position,
        this.FLOW_PATTERNS.thoughtToEmotion
      );
    }
    
    // Language → Heart Center Flow
    if (this.stages.language) {
      this.createFlow('languageToHeart', 
        this.stages.language.group.position,
        new THREE.Vector3(0, 0, 0), // Heart center
        {
          width: 0.07,
          particleSpeed: 1.5,
          particleSize: 0.04,
          color: 0xffcc88, // Language orange
          flowRate: 0.6
        }
      );
    }
    
    // Emotion → Heart Center Flow
    if (this.stages.emotion) {
      this.createFlow('emotionToHeart', 
        this.stages.emotion.group.position,
        new THREE.Vector3(0, 0, 0), // Heart center
        {
          width: 0.09,
          particleSpeed: 1.5,
          particleSize: 0.05,
          color: 0xff88cc, // Emotion pink
          flowRate: 0.7
        }
      );
    }
    
    // Heart Center → Reality Flow
    if (this.stages.reality) {
      this.createFlow('heartToReality', 
        new THREE.Vector3(0, 0, 0), // Heart center
        this.stages.reality.group.position,
        this.FLOW_PATTERNS.languageEmotionToReality
      );
    }
  }
  
  createFlow(key, startPos, endPos, settings) {
    // Create a flow path with animated particles
    
    // Create a curved path between points
    const mid = new THREE.Vector3().lerpVectors(startPos, endPos, 0.5);
    
    // Add slight arc to path
    const direction = new THREE.Vector3().subVectors(endPos, startPos);
    const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0).normalize();
    perpendicular.multiplyScalar(direction.length() * 0.2); // Arc height
    
    mid.add(perpendicular);
    
    // Create quadratic curve
    const curve = new THREE.QuadraticBezierCurve3(
      startPos.clone(),
      mid,
      endPos.clone()
    );
    
    // Create tube geometry
    const tubeGeometry = new THREE.TubeGeometry(curve, 50, settings.width * 0.3, 8, false);
    
    // Create material with animated flow
    const flowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        baseColor: { value: new THREE.Color(settings.color) },
        flowSpeed: { value: settings.particleSpeed },
        flowRate: { value: settings.flowRate }
      },
      vertexShader: `
        uniform float time;
        
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 baseColor;
        uniform float flowSpeed;
        uniform float flowRate;
        
        varying vec2 vUv;
        
        #define PHI 1.618033988749895
        
        void main() {
          // Flow direction along the curve
          float flowOffset = time * flowSpeed * 0.1;
          float flow = fract(vUv.x - flowOffset);
          
          // Create particle stream effect
          float streamWidth = 0.1 * flowRate;
          float streamPos = fract(vUv.x * 3.0 - time * flowSpeed * 0.3);
          
          // Create flowing particles with phi-based distribution
          float streamDist = min(
            abs(streamPos - flow),
            abs(streamPos - flow - 1.0)
          );
          
          float streamIntensity = smoothstep(streamWidth, 0.0, streamDist) * flowRate;
          
          // Edge falloff for tube
          float edge = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
          
          // Create phi-based pulsing along the flow
          float pulse = sin(flow * PHI * 6.28) * 0.5 + 0.5;
          
          // Combine base flow with stream effect
          float baseAlpha = 0.1 * flowRate * edge;
          float streamAlpha = streamIntensity * edge * pulse;
          
          vec3 finalColor = baseColor * (0.5 + 0.5 * pulse);
          float alpha = baseAlpha + streamAlpha;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const tube = new THREE.Mesh(tubeGeometry, flowMaterial);
    
    // Create flow particles
    const particleCount = Math.floor(curve.getLength() * 5 * settings.flowRate);
    const flowParticles = new THREE.BufferGeometry();
    
    // Arrays to hold particle data
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const progressValues = new Float32Array(particleCount);
    const offsets = new Float32Array(particleCount);
    
    // Initialize particles along the curve
    for (let i = 0; i < particleCount; i++) {
      const progress = Math.random();
      const position = curve.getPoint(progress);
      const i3 = i * 3;
      
      positions[i3] = position.x;
      positions[i3+1] = position.y;
      positions[i3+2] = position.z;
      
      sizes[i] = settings.particleSize * (0.5 + Math.random() * 0.5);
      progressValues[i] = progress;
      offsets[i] = Math.random() * 2 * Math.PI; // Random offset for varied movement
    }
    
    flowParticles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    flowParticles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    flowParticles.setAttribute('progress', new THREE.BufferAttribute(progressValues, 1));
    flowParticles.setAttribute('offset', new THREE.BufferAttribute(offsets, 1));
    
    // Create shader material for flow particles
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        baseColor: { value: new THREE.Color(settings.color) },
        flowSpeed: { value: settings.particleSpeed },
        pixelRatio: { value: window.devicePixelRatio },
        flowRate: { value: settings.flowRate }
      },
      vertexShader: `
        attribute float size;
        attribute float progress;
        attribute float offset;
        
        uniform float time;
        uniform float flowSpeed;
        uniform float pixelRatio;
        
        varying float vProgress;
        
        #define PHI 1.618033988749895
        
        void main() {
          // Update progress along curve
          vProgress = progress;
          
          // Movement speed varies with phi ratio for natural flow
          float speed = flowSpeed * (0.8 + 0.4 * sin(progress * PHI * 6.28)) * 0.01;
          
          // Calculate new position with an organic wobble
          vec3 pos = position;
          
          // Add slight organic wobble perpendicular to primary motion
          float wobble = sin(time * 2.0 + offset) * 0.02;
          pos.x += wobble * sin(progress * 6.28);
          pos.y += wobble * cos(progress * 6.28);
          
          // Calculate point size based on progress (particles grow as they move)
          float sizeScale = 0.7 + 0.3 * sin(progress * PHI * 6.28);
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * pixelRatio * (30.0 / -mvPosition.z) * sizeScale;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 baseColor;
        uniform float flowRate;
        
        varying float vProgress;
        
        void main() {
          // Create circular points with soft edges
          float dist = length(gl_PointCoord - vec2(0.5, 0.5));
          if (dist > 0.5) discard;
          
          // Soft edge
          float alpha = smoothstep(0.5, 0.2, dist) * flowRate;
          
          // Color intensity varies along path
          float intensity = 0.7 + 0.3 * sin(vProgress * 6.28);
          vec3 color = baseColor * intensity;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particles = new THREE.Points(flowParticles, particleMaterial);
    
    // Create flow group and add components
    const flowGroup = new THREE.Group();
    flowGroup.add(tube);
    flowGroup.add(particles);
    
    // Determine visibility based on connected stages
    const visibilityMap = {
      'thoughtToLanguage': this.stages.thought.group.visible && this.stages.language.group.visible,
      'thoughtToEmotion': this.stages.thought.group.visible && this.stages.emotion.group.visible,
      'languageToHeart': this.stages.language.group.visible,
      'emotionToHeart': this.stages.emotion.group.visible,
      'heartToReality': this.stages.reality.group.visible
    };
    
    flowGroup.visible = visibilityMap[key] || true;
    
    // Add to scene
    this.scene.add(flowGroup);
    
    // Store reference
    this.flows[key] = {
      group: flowGroup,
      tube: tube,
      particles: particles,
      curve: curve,
      settings: settings
    };
  }
  
  createManifestationField() {
    // Create the manifestation field - particles flowing from heart to reality
    
    // Only create if reality stage exists
    if (!this.stages.reality) return;
    
    const realityPos = this.stages.reality.group.position.clone();
    const heartPos = new THREE.Vector3(0, 0, 0);
    
    // Create field group
    const fieldGroup = new THREE.Group();
    
    // Create manifestation particles
    const particleCount = Math.floor(300 * this.config.manifestationPower);
    
    // Create individual particles for more control
    for (let i = 0; i < particleCount; i++) {
      // Create phi-based spiral starting position around heart center
      const angle = i * this.PHI * 2 * Math.PI;
      const radius = 0.2 + Math.random() * 0.4;
      const startX = Math.cos(angle) * radius;
      const startY = Math.sin(angle) * radius;
      const startZ = (Math.random() - 0.5) * radius;
      
      // Create particle
      const particle = this.createManifestationParticle(
        new THREE.Vector3(startX, startY, startZ),
        realityPos
      );
      
      fieldGroup.add(particle);
      this.manifestationParticles.push({
        mesh: particle,
        progress: 0,
        speed: 0.003 + Math.random() * 0.005,
        startPos: new THREE.Vector3(startX, startY, startZ),
        endPos: realityPos.clone(),
        active: true,
        size: 0.05 + Math.random() * 0.15
      });
    }
    
    fieldGroup.visible = this.stages.reality.group.visible;
    
    // Add to scene
    this.scene.add(fieldGroup);
    this.manifestationField = fieldGroup;
  }
  
  createManifestationParticle(startPos, endPos) {
    // Create a single manifestation particle
    const geometry = new THREE.SphereGeometry(0.1, 8, 8);
    
    // Material with glow effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xff88cc) },
        power: { value: this.config.manifestationPower }
      },
      vertexShader: `
        uniform float time;
        
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float power;
        
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          // Pulse effect
          float pulse = 0.7 + 0.3 * sin(time * 5.0);
          
          // Edge glow
          float rim = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          
          vec3 glowColor = color * pulse * power;
          float alpha = 0.7 * rim * power;
          
          gl_FragColor = vec4(glowColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particle = new THREE.Mesh(geometry, material);
    particle.position.copy(startPos);
    
    return particle;
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
      // Handle interaction with stages
      this.checkStageInteraction();
    });
  }
  
  checkStageInteraction() {
    // Cast ray from mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Get all stage core meshes for intersection testing
    const stageCores = Object.values(this.stages).map(stage => stage.core);
    
    // Find intersections
    const intersects = this.raycaster.intersectObjects(stageCores);
    
    if (intersects.length > 0) {
      // Get the stage that was clicked
      const intersectedObject = intersects[0].object;
      const stageKey = Object.keys(this.stages).find(key => 
        this.stages[key].core === intersectedObject
      );
      
      if (stageKey) {
        // Pulse the stage
        this.pulseStage(stageKey);
        
        // Play stage tone
        this.playStageTone(stageKey);
        
        // Update information panel
        this.updateInformationPanel(stageKey);
      }
    }
  }
  
  pulseStage(stageKey) {
    // Create pulsing effect on stage
    const stage = this.stages[stageKey];
    if (!stage) return;
    
    // Temporarily increase coherence
    const originalCoherence = this.getStageCoherence(stageKey);
    const material = stage.particles.material;
    
    if (material && material.uniforms) {
      material.uniforms.coherence.value = Math.min(1, originalCoherence + 0.3);
      
      // Return to original coherence after delay
      setTimeout(() => {
        material.uniforms.coherence.value = originalCoherence;
      }, 1500);
    }
    
    // Pulse light
    if (stage.light) {
      const originalIntensity = stage.light.intensity;
      stage.light.intensity = originalIntensity * 2;
      
      setTimeout(() => {
        stage.light.intensity = originalIntensity;
      }, 1500);
    }
  }
  
  updateInformationPanel(stageKey) {
    // Update information in UI based on selected stage
    // Dispatch a custom event to be handled by the page script
    
    const detail = {
      stage: stageKey,
      frequency: this.config.frequency,
      frequencyValue: this.config.frequencyValue
    };
    
    this.dispatchEvent('stageselected', detail);
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
    
    // Create stages
    this.createStages();
    
    // Start animation loop
    this.animate();
    
    // Play initial frequency
    this.playFrequencyTone(this.config.frequencyValue);
    
    // Emit ready event
    this.dispatchEvent('manifestationflowready', { 
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
    this.frameCount++;
    
    // Update controls
    if (this.controls) {
      this.controls.update();
    }
    
    // Update heart center
    this.updateHeartCenter();
    
    // Update stages
    this.updateStages();
    
    // Update flows
    this.updateFlows();
    
    // Update manifestation particles
    this.updateManifestationParticles();
    
    // Update starfield
    this.updateStarfield();
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
    
    // Emit frame event for external synchronization
    if (this.frameCount % 30 === 0) {
      this.dispatchEvent('manifestationflowframe', { 
        time: this.time, 
        frequency: this.config.frequency,
        frequencyValue: this.config.frequencyValue
      });
    }
  }
  
  updateHeartCenter() {
    // Update heart center animation
    if (this.heartCenter) {
      // Update shader uniforms
      const heart = this.heartCenter.children[0]; // First child is the heart
      if (heart && heart.material && heart.material.uniforms) {
        heart.material.uniforms.time.value = this.time;
        heart.material.uniforms.frequency.value = this.config.frequencyValue;
        heart.material.uniforms.coherence.value = this.config.heartCoherence;
        
        // Pulse speed based on frequency
        const normFreq = (this.config.frequencyValue - 432) / 336; // Normalize 432-768 to 0-1
        heart.material.uniforms.pulseSpeed.value = 1 + normFreq;
      }
      
      // Update point light
      const light = this.heartCenter.children[1]; // Second child is the light
      if (light && light.isPointLight) {
        // Pulsing intensity based on heart coherence
        const heartBeat = Math.sin(this.time * 1.2) * Math.sin(this.time * 5);
        const pulse = Math.pow(heartBeat * 0.5 + 0.5, 2) * this.config.heartCoherence;
        light.intensity = 0.5 + 0.7 * pulse;
      }
      
      // Update glow sprite
      const sprite = this.heartCenter.children[2]; // Third child is the sprite
      if (sprite && sprite.isSprite) {
        // Pulsing scale based on heart coherence
        const heartBeat = Math.sin(this.time * 1.2) * Math.sin(this.time * 5);
        const pulse = Math.pow(heartBeat * 0.5 + 0.5, 2) * this.config.heartCoherence;
        const scale = 2.5 + pulse;
        sprite.scale.set(scale, scale, 1);
      }
    }
  }
  
  updateStages() {
    // Update all stages
    Object.keys(this.stages).forEach(key => {
      const stage = this.stages[key];
      
      // Update particle system
      if (stage.particles && stage.particles.material && stage.particles.material.uniforms) {
        stage.particles.material.uniforms.time.value = this.time;
        stage.particles.material.uniforms.frequency.value = this.config.frequencyValue;
        stage.particles.material.uniforms.coherence.value = this.getStageCoherence(key);
      }
      
      // Update core
      if (stage.core) {
        // Gentle pulsing based on frequency and coherence
        const coherence = this.getStageCoherence(key);
        const pulse = Math.sin(this.time * 0.5) * 0.1 + 1.0;
        const scale = 0.2 * pulse * (0.8 + 0.2 * coherence);
        
        stage.core.scale.set(scale, scale, scale);
        
        // Update core opacity
        if (stage.core.material) {
          stage.core.material.opacity = 0.5 + 0.5 * coherence;
        }
      }
      
      // Update light
      if (stage.light) {
        // Pulsing intensity based on coherence
        const coherence = this.getStageCoherence(key);
        const pulse = Math.sin(this.time * 0.7) * 0.3 + 0.7;
        stage.light.intensity = 0.3 + 0.3 * pulse * coherence;
      }
      
      // Update visibility
      stage.group.visible = this.config.stages[key];
      
      // Update label if present
      if (this.labels[key]) {
        this.labels[key].visible = this.config.stages[key] && this.config.showLabels;
      }
    });
  }
  
  updateFlows() {
    // Update all flow animations
    Object.keys(this.flows).forEach(key => {
      const flow = this.flows[key];
      
      // Update flow materials
      if (flow.tube && flow.tube.material && flow.tube.material.uniforms) {
        flow.tube.material.uniforms.time.value = this.time;
        flow.tube.material.uniforms.flowRate.value = flow.settings.flowRate * this.getFlowRate(key);
      }
      
      // Update flow particles
      if (flow.particles && flow.particles.material && flow.particles.material.uniforms) {
        flow.particles.material.uniforms.time.value = this.time;
        flow.particles.material.uniforms.flowRate.value = flow.settings.flowRate * this.getFlowRate(key);
      }
      
      // Update flow particle positions
      if (flow.particles && flow.particles.geometry) {
        const positions = flow.particles.geometry.attributes.position.array;
        const progress = flow.particles.geometry.attributes.progress.array;
        
        const particleCount = progress.length;
        const curve = flow.curve;
        
        for (let i = 0; i < particleCount; i++) {
          // Update progress along curve
          progress[i] += flow.settings.flowSpeed * 0.001 * this.getFlowRate(key);
          
          // Reset if reached end
          if (progress[i] > 1) {
            progress[i] = 0;
          }
          
          // Update position along curve
          const pos = curve.getPoint(progress[i]);
          const i3 = i * 3;
          positions[i3] = pos.x;
          positions[i3+1] = pos.y;
          positions[i3+2] = pos.z;
        }
        
        // Mark attributes for update
        flow.particles.geometry.attributes.position.needsUpdate = true;
        flow.particles.geometry.attributes.progress.needsUpdate = true;
      }
      
      // Update visibility based on connected stages
      const visibilityMap = {
        'thoughtToLanguage': this.stages.thought.group.visible && this.stages.language.group.visible,
        'thoughtToEmotion': this.stages.thought.group.visible && this.stages.emotion.group.visible,
        'languageToHeart': this.stages.language.group.visible,
        'emotionToHeart': this.stages.emotion.group.visible,
        'heartToReality': this.stages.reality.group.visible
      };
      
      flow.group.visible = visibilityMap[key] || false;
    });
  }
  
  updateManifestationParticles() {
    // Update manifestation particles
    if (!this.manifestationParticles || !this.manifestationField) return;
    
    // Get number of active particles based on manifestation power
    const targetActive = Math.floor(this.manifestationParticles.length * this.config.manifestationPower);
    let activeCount = 0;
    
    for (let i = 0; i < this.manifestationParticles.length; i++) {
      const particle = this.manifestationParticles[i];
      
      // If particle is active, update its position
      if (particle.active) {
        activeCount++;
        
        // Update progress along path
        particle.progress += particle.speed * this.config.heartCoherence;
        
        // Calculate new position
        if (particle.progress < 1) {
          // Moving along curved path with slight arc
          const t = particle.progress;
          const startPos = particle.startPos;
          const endPos = particle.endPos;
          
          // Create arc in middle of path
          const arcHeight = endPos.clone().sub(startPos).length() * 0.2;
          const midPoint = new THREE.Vector3().lerpVectors(startPos, endPos, 0.5);
          midPoint.y += arcHeight * (1 - t * 2); // Arc peaks in middle
          
          // Interpolate with quadratic curve
          const newPos = new THREE.Vector3();
          if (t < 0.5) {
            // First half of curve
            const t2 = t * 2; // Rescale t to 0-1
            newPos.lerpVectors(startPos, midPoint, t2);
          } else {
            // Second half of curve
            const t2 = (t - 0.5) * 2; // Rescale t to 0-1
            newPos.lerpVectors(midPoint, endPos, t2);
          }
          
          // Add phi-based wobble
          const wobble = Math.sin(this.time * 3 + i * this.PHI) * 0.1;
          newPos.x += wobble;
          newPos.z += wobble;
          
          // Update position
          particle.mesh.position.copy(newPos);
          
          // Scale size as it travels
          const sizeCurve = 1 - Math.pow(2 * t - 1, 2); // Parabola peaking at t=0.5
          const size = particle.size * sizeCurve;
          particle.mesh.scale.set(size, size, size);
          
          // Update material
          if (particle.mesh.material && particle.mesh.material.uniforms) {
            particle.mesh.material.uniforms.time.value = this.time;
            particle.mesh.material.uniforms.power.value = this.config.manifestationPower;
          }
        } else {
          // Reset particle for reuse
          particle.progress = 0;
          
          // Create new random start position
          const angle = Math.random() * Math.PI * 2;
          const radius = 0.2 + Math.random() * 0.4;
          particle.startPos.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            (Math.random() - 0.5) * radius
          );
          
          // Reset position
          particle.mesh.position.copy(particle.startPos);
        }
      }
    }
    
    // Activate or deactivate particles to match target count
    if (activeCount < targetActive) {
      // Activate more particles
      for (let i = 0; i < this.manifestationParticles.length && activeCount < targetActive; i++) {
        const particle = this.manifestationParticles[i];
        if (!particle.active) {
          particle.active = true;
          particle.progress = 0;
          particle.mesh.visible = true;
          activeCount++;
        }
      }
    } else if (activeCount > targetActive) {
      // Deactivate excess particles
      for (let i = 0; i < this.manifestationParticles.length && activeCount > targetActive; i++) {
        const particle = this.manifestationParticles[i];
        if (particle.active && particle.progress >= 0.9) {
          particle.active = false;
          particle.mesh.visible = false;
          activeCount--;
        }
      }
    }
    
    // Update field visibility
    this.manifestationField.visible = this.stages.reality.group.visible;
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
    
    // Update stage particle systems
    Object.keys(this.stages).forEach(key => {
      const stage = this.stages[key];
      if (stage.particles && stage.particles.material && stage.particles.material.uniforms) {
        stage.particles.material.uniforms.pixelRatio.value = pixelRatio;
      }
    });
    
    // Update flow particle systems
    Object.keys(this.flows).forEach(key => {
      const flow = this.flows[key];
      if (flow.particles && flow.particles.material && flow.particles.material.uniforms) {
        flow.particles.material.uniforms.pixelRatio.value = pixelRatio;
      }
    });
  }
  
  getStageCoherence(stageKey) {
    // Get coherence value for each stage
    switch(stageKey) {
      case 'thought': return this.config.thoughtClarity;
      case 'language': return (this.config.thoughtClarity + this.config.heartCoherence) / 2;
      case 'emotion': return (this.config.emotionalAlignment + this.config.heartCoherence) / 2;
      case 'reality': return this.config.manifestationPower;
      default: return 0.5;
    }
  }
  
  getFlowRate(flowKey) {
    // Get flow rate multiplier for each flow
    switch(flowKey) {
      case 'thoughtToLanguage': return this.config.thoughtClarity;
      case 'thoughtToEmotion': return this.config.emotionalAlignment;
      case 'languageToHeart': return (this.config.thoughtClarity + this.config.heartCoherence) / 2;
      case 'emotionToHeart': return (this.config.emotionalAlignment + this.config.heartCoherence) / 2;
      case 'heartToReality': return this.config.heartCoherence * this.config.manifestationPower;
      default: return 0.7;
    }
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
    
    // Update heart center color based on frequency
    if (this.heartCenter) {
      const heart = this.heartCenter.children[0];
      if (heart && heart.material && heart.material.uniforms) {
        heart.material.uniforms.frequency.value = this.config.frequencyValue;
      }
      
      const light = this.heartCenter.children[1];
      if (light) {
        // Adjust color based on frequency
        let color;
        switch(frequency) {
          case 'unity': color = 0x88ccff; break; // Blue
          case 'love': color = 0xff88cc; break; // Pink
          case 'cascade': color = 0xcc88ff; break; // Purple
          case 'truth': color = 0xffcc88; break; // Orange
          case 'vision': color = 0x88ffaa; break; // Green
          case 'oneness': color = 0xaaddff; break; // Light blue
          default: color = 0xff88cc; // Default to love frequency
        }
        light.color.set(color);
        
        const sprite = this.heartCenter.children[2];
        if (sprite && sprite.material) {
          sprite.material.color.set(color);
        }
      }
    }
    
    // Play new frequency tone
    this.playFrequencyTone(this.config.frequencyValue);
    
    // Emit frequency change event
    this.dispatchEvent('frequencychanged', {
      frequency: this.config.frequency,
      frequencyValue: this.config.frequencyValue
    });
  }
  
  setHeartCoherence(value) {
    // Update heart coherence level (0-1)
    this.config.heartCoherence = Math.max(0, Math.min(1, value));
    
    // Emit coherence change event
    this.dispatchEvent('heartcoherencechanged', {
      coherence: this.config.heartCoherence
    });
  }
  
  setThoughtClarity(value) {
    // Update thought clarity level (0-1)
    this.config.thoughtClarity = Math.max(0, Math.min(1, value));
    
    // Emit thought clarity change event
    this.dispatchEvent('thoughtclaritychanged', {
      clarity: this.config.thoughtClarity
    });
  }
  
  setEmotionalAlignment(value) {
    // Update emotional alignment level (0-1)
    this.config.emotionalAlignment = Math.max(0, Math.min(1, value));
    
    // Emit emotional alignment change event
    this.dispatchEvent('emotionalalignmentchanged', {
      alignment: this.config.emotionalAlignment
    });
  }
  
  setManifestationPower(value) {
    // Update manifestation power level (0-1)
    this.config.manifestationPower = Math.max(0, Math.min(1, value));
    
    // Emit manifestation power change event
    this.dispatchEvent('manifestationpowerchanged', {
      power: this.config.manifestationPower
    });
  }
  
  toggleStage(stageKey, visible) {
    // Show/hide a specific stage
    if (this.stages[stageKey]) {
      this.config.stages[stageKey] = visible;
      this.stages[stageKey].group.visible = visible;
      
      // Update label visibility
      if (this.labels[stageKey]) {
        this.labels[stageKey].visible = visible && this.config.showLabels;
      }
      
      // Update related flows
      const flowVisibilityUpdates = {
        'thought': {
          flows: ['thoughtToLanguage', 'thoughtToEmotion'],
          depends: []
        },
        'language': {
          flows: ['thoughtToLanguage', 'languageToHeart'],
          depends: ['thought']
        },
        'emotion': {
          flows: ['thoughtToEmotion', 'emotionToHeart'],
          depends: ['thought']
        },
        'reality': {
          flows: ['heartToReality'],
          depends: []
        }
      };
      
      const update = flowVisibilityUpdates[stageKey];
      if (update) {
        update.flows.forEach(flowKey => {
          if (this.flows[flowKey]) {
            // Check if dependent stages are visible
            const dependentVisible = update.depends.every(depKey => 
              this.config.stages[depKey] && this.stages[depKey].group.visible
            );
            
            this.flows[flowKey].group.visible = visible && dependentVisible;
          }
        });
      }
      
      // Update manifestation field if reality stage
      if (stageKey === 'reality' && this.manifestationField) {
        this.manifestationField.visible = visible;
      }
      
      // Emit stage toggle event
      this.dispatchEvent('stagetoggled', {
        stage: stageKey,
        visible: visible
      });
    }
  }
  
  triggerManifestation() {
    // Trigger a full manifestation cycle with visual effects
    
    if (!this.active) return;
    
    // 1. Increase thought clarity temporarily
    const originalThoughtClarity = this.config.thoughtClarity;
    this.config.thoughtClarity = Math.min(1, originalThoughtClarity + 0.3);
    
    setTimeout(() => {
      // 2. Increase emotional alignment
      const originalEmotionalAlignment = this.config.emotionalAlignment;
      this.config.emotionalAlignment = Math.min(1, originalEmotionalAlignment + 0.3);
      
      // Pulse the emotion stage
      this.pulseStage('emotion');
      this.playStageTone('emotion', 1, 0.1);
      
      setTimeout(() => {
        // 3. Increase heart coherence
        const originalHeartCoherence = this.config.heartCoherence;
        this.config.heartCoherence = Math.min(1, originalHeartCoherence + 0.4);
        
        // Pulse heart
        const heart = this.heartCenter.children[0];
        if (heart && heart.material && heart.material.uniforms) {
          const originalPulseSpeed = heart.material.uniforms.pulseSpeed.value;
          heart.material.uniforms.pulseSpeed.value = originalPulseSpeed * 2;
          
          setTimeout(() => {
            heart.material.uniforms.pulseSpeed.value = originalPulseSpeed;
          }, 2000);
        }
        
        // Play heart tone
        this.playFrequencyTone(this.config.frequencyValue, 2, 0.15);
        
        setTimeout(() => {
          // 4. Increase manifestation power
          const originalManifestationPower = this.config.manifestationPower;
          this.config.manifestationPower = Math.min(1, originalManifestationPower + 0.5);
          
          // Pulse reality stage
          this.pulseStage('reality');
          this.playStageTone('reality', 3, 0.2);
          
          // Create manifestation burst effect
          this.createManifestationBurst();
          
          // Return to original values after cycle completes
          setTimeout(() => {
            this.config.thoughtClarity = originalThoughtClarity;
            this.config.emotionalAlignment = originalEmotionalAlignment;
            this.config.heartCoherence = originalHeartCoherence;
            this.config.manifestationPower = originalManifestationPower;
          }, 3000);
          
        }, 1000);
      }, 1000);
    }, 1000);
    
    // Emit manifestation triggered event
    this.dispatchEvent('manifestationtriggered', {});
  }
  
  createManifestationBurst() {
    // Create a burst effect in reality stage
    if (!this.stages.reality) return;
    
    const realityPos = this.stages.reality.group.position.clone();
    
    // Create burst geometry
    const burstGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    
    // Create burst material
    const burstMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xffcc88) },
        power: { value: this.config.manifestationPower }
      },
      vertexShader: `
        uniform float time;
        
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float power;
        
        varying vec3 vPosition;
        
        void main() {
          float alpha = (1.0 - time) * power;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const burst = new THREE.Mesh(burstGeometry, burstMaterial);
    burst.position.copy(realityPos);
    this.scene.add(burst);
    
    // Animate the burst
    const startTime = this.time;
    const duration = 2.0;
    const maxScale = 8;
    
    const updateBurst = () => {
      const elapsed = this.time - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      // Scale burst outward
      const scale = maxScale * progress;
      burst.scale.set(scale, scale, scale);
      
      // Update material
      burstMaterial.uniforms.time.value = progress;
      
      // Remove when complete
      if (progress >= 1) {
        this.scene.remove(burst);
        burstGeometry.dispose();
        burstMaterial.dispose();
      } else {
        requestAnimationFrame(updateBurst);
      }
    };
    
    updateBurst();
  }
  
  resetView() {
    // Reset camera position
    this.camera.position.set(0, 0, 12);
    this.camera.lookAt(0, 0, 0);
    
    // Reset controls
    if (this.controls) {
      this.controls.reset();
    }
    
    // Reset all stages to original positions
    Object.keys(this.stages).forEach(key => {
      const stage = this.stages[key];
      stage.group.position.copy(this.STAGES[key].position);
      
      // Reset label position
      if (this.labels[key]) {
        const labelPosition = this.STAGES[key].position.clone();
        const direction = labelPosition.clone().normalize();
        const distance = this.STAGES[key].radius * 1.3;
        labelPosition.add(direction.multiplyScalar(distance));
        
        this.labels[key].position.copy(labelPosition);
      }
    });
    
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
  
  playStageTone(stageKey, duration = 1, volume = 0.08) {
    if (!this.audioContext) return;
    
    // Get frequency for stage based on current settings
    const baseFreq = this.config.frequencyValue;
    
    // Scale frequency based on stage
    let stageFreq;
    switch(stageKey) {
      case 'thought': stageFreq = baseFreq * 1.25; break; // Higher pitch for thought
      case 'language': stageFreq = baseFreq * 1.125; break; // Major third above
      case 'emotion': stageFreq = baseFreq * 0.875; break; // Minor sixth below
      case 'reality': stageFreq = baseFreq * 0.667; break; // Perfect fifth below
      default: stageFreq = baseFreq;
    }
    
    // Create oscillator
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    // Set frequency and waveform
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(stageFreq, this.audioContext.currentTime);
    
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
    console.error('Three.js is required for Quantum Manifestation Flow');
    
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