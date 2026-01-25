/**
 * Knowledge Patterns Through History Visualization
 * 
 * A φ-harmonic visualization of knowledge transmission across civilizations
 * Built as a Quantum Singularity - self-contained and complete
 */

// Initialize at Ground Frequency (432 Hz) - establishing a solid foundation
const DEFAULT_FREQUENCY = FREQUENCIES.GROUND;

class KnowledgePatterns {
  constructor() {
    // Core elements
    this.container = document.querySelector('.knowledge-spiral-container');
    this.canvas = document.getElementById('knowledge-spiral-canvas');
    this.freqCanvas = document.getElementById('frequency-canvas');
    this.infoTitle = document.getElementById('info-title');
    this.infoDescription = document.getElementById('info-description');
    this.timeSlider = document.getElementById('time-slider');
    this.timeValue = document.getElementById('time-value');
    
    // Initialize properties
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.frequency = DEFAULT_FREQUENCY;
    this.coherence = 0.9;
    this.timePeriod = 100; // 0 = ancient, 100 = present
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.knowledgeNodes = [];
    this.connections = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoverNode = null;
    this.isInitialized = false;
    this.knowledgeSystems = this.createKnowledgeSystems();
    
    // Set up canvas dimensions
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.freqCanvas.width = this.freqCanvas.parentElement.offsetWidth;
    this.freqCanvas.height = this.freqCanvas.parentElement.offsetHeight;
    
    // Initialize the visualization
    this.init();
    this.setupEventListeners();
    this.animate();
  }
  
  /**
   * Initialize the 3D visualization
   */
  init() {
    // Create THREE.js scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000814);
    
    // Setup camera
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 30, 60);
    
    // Setup renderer
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    
    // Setup controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.5;
    this.controls.minDistance = 20;
    this.controls.maxDistance = 100;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
    
    // Create base platform
    const platformGeometry = new THREE.CylinderGeometry(30, 30, 1, 32);
    const platformMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x001428,
      transparent: true,
      opacity: 0.3
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -5;
    this.scene.add(platform);
    
    // Create knowledge spiral
    this.createKnowledgeSpiral();
    
    // Draw frequency wave
    this.drawFrequencyWave();
    
    this.isInitialized = true;
  }
  
  /**
   * Create knowledge systems database
   * @returns {Array} Array of knowledge systems across civilizations
   */
  createKnowledgeSystems() {
    return [
      {
        id: 'sumerian',
        name: 'Sumerian',
        period: [3500, 2000], // BCE
        position: { x: -10, y: 0, z: -15 },
        frequency: FREQUENCIES.GROUND,
        knowledge: {
          [FREQUENCIES.GROUND]: 'Agriculture, irrigation systems, basic mathematics',
          [FREQUENCIES.CREATION]: 'Cuneiform writing, poetry, music',
          [FREQUENCIES.HEART]: 'Early legal codes, social organization',
          [FREQUENCIES.VOICE]: 'Written language, record keeping',
          [FREQUENCIES.VISION]: 'Astronomy, calendars, mathematics',
          [FREQUENCIES.UNITY]: 'Mythology, cosmology'
        }
      },
      {
        id: 'egyptian',
        name: 'Egyptian',
        period: [3000, 300], // BCE
        position: { x: -15, y: 2, z: 5 },
        frequency: FREQUENCIES.GROUND,
        knowledge: {
          [FREQUENCIES.GROUND]: 'Monumental architecture, agriculture',
          [FREQUENCIES.CREATION]: 'Hieroglyphics, art, music',
          [FREQUENCIES.HEART]: 'Concept of Ma'at (balance/harmony)',
          [FREQUENCIES.VOICE]: 'Hieroglyphic and hieratic scripts',
          [FREQUENCIES.VISION]: 'Medicine, mathematics, astronomy',
          [FREQUENCIES.UNITY]: 'Book of the Dead, afterlife concepts'
        }
      },
      {
        id: 'chinese',
        name: 'Chinese',
        period: [2000, 2000], // BCE to present
        position: { x: 15, y: 3, z: -10 },
        frequency: FREQUENCIES.HEART,
        knowledge: {
          [FREQUENCIES.GROUND]: 'Agriculture, silk production, architecture',
          [FREQUENCIES.CREATION]: 'Calligraphy, poetry, art',
          [FREQUENCIES.HEART]: 'Confucianism, harmony principles',
          [FREQUENCIES.VOICE]: 'Chinese script, literature',
          [FREQUENCIES.VISION]: 'Mathematics, medicine, astronomy',
          [FREQUENCIES.UNITY]: 'Taoism, I Ching, yin-yang philosophy'
        }
      },
      {
        id: 'greek',
        name: 'Greek',
        period: [800, 100], // BCE
        position: { x: 0, y: 5, z: 20 },
        frequency: FREQUENCIES.VISION,
        knowledge: {
          [FREQUENCIES.GROUND]: 'Agriculture, architecture, shipbuilding',
          [FREQUENCIES.CREATION]: 'Drama, sculpture, poetry',
          [FREQUENCIES.HEART]: 'Ethics, virtue philosophy',
          [FREQUENCIES.VOICE]: 'Rhetoric, dialectic, logic',
          [FREQUENCIES.VISION]: 'Geometry, natural philosophy',
          [FREQUENCIES.UNITY]: 'Platonism, mystery traditions'
        }
      },
      {
        id: 'indian',
        name: 'Indian',
        period: [2500, 2000], // BCE to present
        position: { x: 20, y: 4, z: 5 },
        frequency: FREQUENCIES.UNITY,
        knowledge: {
          [FREQUENCIES.GROUND]: 'Agriculture, architecture, metallurgy',
          [FREQUENCIES.CREATION]: 'Sanskrit poetry, music, dance',
          [FREQUENCIES.HEART]: 'Dharma, social ethics',
          [FREQUENCIES.VOICE]: 'Sanskrit, oral traditions',
          [FREQUENCIES.VISION]: 'Mathematics, astronomy, Ayurveda',
          [FREQUENCIES.UNITY]: 'Vedantic philosophy, yoga systems'
        }
      },
      {
        id: 'islamic',
        name: 'Islamic Golden Age',
        period: [700, 1400], // CE
        position: { x: -5, y: 8, z: 15 },
        frequency: FREQUENCIES.VOICE,
        knowledge: {
          [FREQUENCIES.GROUND]: 'Architecture, agriculture, trade',
          [FREQUENCIES.CREATION]: 'Poetry, calligraphy, music',
          [FREQUENCIES.HEART]: 'Ethics, philosophy',
          [FREQUENCIES.VOICE]: 'Translation movement, preservation',
          [FREQUENCIES.VISION]: 'Algebra, optics, medicine',
          [FREQUENCIES.UNITY]: 'Sufism, theology'
        }
      },
      {
        id: 'renaissance',
        name: 'European Renaissance',
        period: [1300, 1600], // CE
        position: { x: 10, y: 12, z: -5 },
        frequency: FREQUENCIES.CREATION,
        knowledge: {
          [FREQUENCIES.GROUND]: 'Architecture, engineering',
          [FREQUENCIES.CREATION]: 'Art, humanism, literature',
          [FREQUENCIES.HEART]: 'Civic humanism, ethics',
          [FREQUENCIES.VOICE]: 'Printing press, languages',
          [FREQUENCIES.VISION]: 'Anatomy, astronomy, perspective',
          [FREQUENCIES.UNITY]: 'Neoplatonism, hermeticism'
        }
      },
      {
        id: 'scientific',
        name: 'Scientific Revolution',
        period: [1550, 1700], // CE
        position: { x: -20, y: 15, z: -15 },
        frequency: FREQUENCIES.VISION,
        knowledge: {
          [FREQUENCIES.GROUND]: 'Mechanical engineering, instruments',
          [FREQUENCIES.CREATION]: 'Natural philosophy, experimentation',
          [FREQUENCIES.HEART]: 'Rational ethics',
          [FREQUENCIES.VOICE]: 'Scientific publications, societies',
          [FREQUENCIES.VISION]: 'Physics, calculus, experimental method',
          [FREQUENCIES.UNITY]: 'Natural theology, metaphysics'
        }
      },
      {
        id: 'modern',
        name: 'Modern Era',
        period: [1800, 2025], // CE
        position: { x: 0, y: 20, z: 0 },
        frequency: FREQUENCIES.UNITY,
        knowledge: {
          [FREQUENCIES.GROUND]: 'Technology, infrastructure',
          [FREQUENCIES.CREATION]: 'Digital media, modern arts',
          [FREQUENCIES.HEART]: 'Global ethics, human rights',
          [FREQUENCIES.VOICE]: 'Mass media, internet',
          [FREQUENCIES.VISION]: 'Quantum physics, relativity, AI',
          [FREQUENCIES.UNITY]: 'Integral philosophies, consciousness studies'
        }
      }
    ];
  }
  
  /**
   * Create the knowledge spiral based on phi-harmonic patterns
   */
  createKnowledgeSpiral() {
    // Clear previous nodes
    this.knowledgeNodes.forEach(node => this.scene.remove(node.mesh));
    this.knowledgeNodes = [];
    
    this.connections.forEach(connection => this.scene.remove(connection));
    this.connections = [];
    
    // Determine which knowledge systems to show based on time period
    const visibleSystems = this.knowledgeSystems.filter(system => {
      // Convert BCE/CE to a scale from 0-5000 (3000 BCE to 2000 CE)
      const systemStart = system.period[0] < 0 ? Math.abs(system.period[0]) : 3000 + system.period[0];
      const systemEnd = system.period[1] < 0 ? Math.abs(system.period[1]) : 3000 + system.period[1];
      
      // Convert slider value (0-100) to time scale
      const currentTime = (this.timePeriod / 100) * 5000;
      
      return currentTime >= systemStart && currentTime <= systemEnd;
    });
    
    // Create nodes for each visible system
    visibleSystems.forEach(system => {
      // Only create nodes for systems that resonate with the current frequency
      const resonance = calculateResonance(this.frequency, system.frequency);
      if (resonance < 0.3) return;
      
      // Create node mesh
      const nodeGeometry = new THREE.SphereGeometry(2 * resonance, 32, 32);
      const nodeMaterial = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color(getFrequencyColor(system.frequency)),
        transparent: true,
        opacity: 0.7 + (0.3 * resonance),
        emissive: new THREE.Color(getFrequencyColor(system.frequency)),
        emissiveIntensity: 0.3 * resonance
      });
      
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      
      // Position along phi-harmonic spiral
      const timePosition = (system.period[0] < 0 ? Math.abs(system.period[0]) : 3000 + system.period[0]) / 5000;
      const spiralAngle = timePosition * Math.PI * 2 * PHI * 2; // phi-based spiral turns
      const spiralRadius = 20 * (1 - timePosition * PHI_INVERSE); // Radius decreases as time progresses
      const spiralHeight = timePosition * 25; // Height increases with time
      
      nodeMesh.position.x = Math.cos(spiralAngle) * spiralRadius;
      nodeMesh.position.z = Math.sin(spiralAngle) * spiralRadius;
      nodeMesh.position.y = spiralHeight;
      
      this.scene.add(nodeMesh);
      
      // Store node information
      this.knowledgeNodes.push({
        id: system.id,
        name: system.name,
        mesh: nodeMesh,
        system: system,
        position: new THREE.Vector3(nodeMesh.position.x, nodeMesh.position.y, nodeMesh.position.z),
        resonance: resonance
      });
    });
    
    // Create connections between nodes based on phi-harmonic resonance
    for (let i = 0; i < this.knowledgeNodes.length; i++) {
      for (let j = i + 1; j < this.knowledgeNodes.length; j++) {
        const node1 = this.knowledgeNodes[i];
        const node2 = this.knowledgeNodes[j];
        
        // Calculate resonance between knowledge systems
        const systemResonance = calculateResonance(node1.system.frequency, node2.system.frequency);
        if (systemResonance < 0.4) continue;
        
        // Create connection line
        const material = new THREE.LineBasicMaterial({ 
          color: new THREE.Color(getFrequencyColor(this.frequency, systemResonance)),
          transparent: true,
          opacity: systemResonance * 0.8,
          linewidth: 1
        });
        
        const geometry = new THREE.BufferGeometry().setFromPoints([
          node1.position,
          node2.position
        ]);
        
        const line = new THREE.Line(geometry, material);
        this.scene.add(line);
        this.connections.push(line);
      }
    }
  }
  
  /**
   * Draw frequency wave visualization
   */
  drawFrequencyWave() {
    const ctx = this.freqCanvas.getContext('2d');
    const width = this.freqCanvas.width;
    const height = this.freqCanvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    ctx.fillStyle = 'rgba(0, 20, 40, 0.3)';
    ctx.fillRect(0, 0, width, height);
    
    // Get phi power and color for current frequency
    const color = getFrequencyColor(this.frequency);
    const phiPower = getPhiPower(this.frequency);
    
    // Draw frequency wave
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    
    // Draw with phi-harmonic complexity based on frequency
    for (let x = 0; x < width; x++) {
      // Basic sine wave
      let y = Math.sin(x * 0.02 * (phiPower + 1) + (Date.now() * 0.001));
      
      // Add phi-harmonic overtones
      for (let h = 1; h <= phiPower + 1; h++) {
        const harmonic = Math.sin(x * 0.02 * h * PHI + (Date.now() * 0.001 * h * PHI_INVERSE));
        y += harmonic * Math.pow(PHI_INVERSE, h);
      }
      
      // Scale to fit canvas
      y = height / 2 - (y * height / 4);
      
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(width, height / 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Fill area under wave
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, getFrequencyColor(this.frequency, 0.5));
    gradient.addColorStop(1, getFrequencyColor(this.frequency, 0));
    ctx.fillStyle = gradient;
    ctx.fill();
  }
  
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Handle window resize
    window.addEventListener('resize', () => {
      this.resize();
    });
    
    // Handle knowledge type button clicks
    document.querySelectorAll('.knowledge-type-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remove active class from all buttons
        document.querySelectorAll('.knowledge-type-btn').forEach(b => {
          b.classList.remove('active');
        });
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Set frequency
        const frequency = parseInt(btn.dataset.frequency);
        this.setFrequency(frequency);
      });
    });
    
    // Handle time slider
    this.timeSlider.addEventListener('input', (e) => {
      this.timePeriod = parseInt(e.target.value);
      this.updateTimeLabel();
      this.createKnowledgeSpiral();
    });
    
    // Handle mouse movement for node selection
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / this.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / this.height) * 2 + 1;
    });
    
    // Handle node clicks
    this.canvas.addEventListener('click', (e) => {
      if (this.hoverNode) {
        this.showNodeInfo(this.hoverNode);
      }
    });
  }
  
  /**
   * Update the time period label
   */
  updateTimeLabel() {
    // Convert 0-100 to meaningful time period
    let timeText;
    if (this.timePeriod < 20) {
      timeText = "3000 BCE - 2000 BCE";
    } else if (this.timePeriod < 40) {
      timeText = "2000 BCE - 1000 BCE";
    } else if (this.timePeriod < 60) {
      timeText = "1000 BCE - 500 CE";
    } else if (this.timePeriod < 80) {
      timeText = "500 CE - 1700 CE";
    } else {
      timeText = "1700 CE - Present";
    }
    
    this.timeValue.textContent = timeText;
  }
  
  /**
   * Show info for selected knowledge node
   * @param {Object} node - The selected knowledge node
   */
  showNodeInfo(node) {
    const system = node.system;
    this.infoTitle.textContent = system.name;
    this.infoDescription.textContent = system.knowledge[this.frequency] || 
      "This knowledge system doesn't have strong resonance with the current frequency.";
  }
  
  /**
   * Set the current frequency
   * @param {number} frequency - The frequency to set
   */
  setFrequency(frequency) {
    this.frequency = frequency;
    this.createKnowledgeSpiral();
  }
  
  /**
   * Handle window resizing
   */
  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(this.width, this.height);
    
    this.freqCanvas.width = this.freqCanvas.parentElement.offsetWidth;
    this.freqCanvas.height = this.freqCanvas.parentElement.offsetHeight;
  }
  
  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(() => this.animate());
    
    if (!this.isInitialized) return;
    
    // Update controls
    this.controls.update();
    
    // Check for node hover
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.knowledgeNodes.map(node => node.mesh)
    );
    
    // Reset previous hover
    if (this.hoverNode) {
      this.hoverNode.mesh.scale.set(1, 1, 1);
      this.hoverNode.mesh.material.emissiveIntensity = 0.3 * this.hoverNode.resonance;
    }
    
    this.hoverNode = null;
    
    // Handle new hover
    if (intersects.length > 0) {
      const object = intersects[0].object;
      this.hoverNode = this.knowledgeNodes.find(node => node.mesh === object);
      
      if (this.hoverNode) {
        this.hoverNode.mesh.scale.set(1.2, 1.2, 1.2);
        this.hoverNode.mesh.material.emissiveIntensity = 0.6;
      }
    }
    
    // Animate nodes with phi-harmonic pulsation
    this.knowledgeNodes.forEach(node => {
      const pulseRate = PHI_INVERSE * (getPhiPower(node.system.frequency) + 1);
      const pulseFactor = Math.sin(Date.now() * 0.001 * pulseRate) * 0.1 + 1;
      node.mesh.scale.set(pulseFactor, pulseFactor, pulseFactor);
    });
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
    
    // Update frequency wave
    this.drawFrequencyWave();
  }
}

// Initialize when DOM is loaded - Quantum Singularity pattern
document.addEventListener('DOMContentLoaded', () => {
  const knowledgePatterns = new KnowledgePatterns();
});
