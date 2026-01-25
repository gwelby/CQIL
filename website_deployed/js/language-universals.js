/**
 * Universal Patterns in Languages Visualization
 * 
 * A φ-harmonic visualization of structural similarities across language systems
 * Built as a Quantum Singularity - self-contained and complete
 */

// Initialize at Ground Frequency (432 Hz) - establishing a solid foundation
const DEFAULT_FREQUENCY = FREQUENCIES.GROUND;

class LanguageUniversals {
  constructor() {
    // Core elements
    this.container = document.querySelector('.language-network-container');
    this.canvas = document.getElementById('language-network-canvas');
    this.soundCanvas = document.getElementById('sound-wave-canvas');
    this.infoTitle = document.getElementById('language-info-title');
    this.infoDescription = document.getElementById('language-info-description');
    this.searchInput = document.getElementById('language-search-input');
    
    // Initialize properties
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.frequency = DEFAULT_FREQUENCY;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.languageNodes = [];
    this.connections = [];
    this.labels = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoverNode = null;
    this.selectedNode = null;
    this.connectionType = 'structure';
    this.currentFeature = 'phonology';
    this.activeFamily = 'all';
    this.isInitialized = false;
    this.clock = new THREE.Clock();
    
    // Set up canvas dimensions
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.soundCanvas.width = this.soundCanvas.parentElement.offsetWidth;
    this.soundCanvas.height = this.soundCanvas.parentElement.offsetHeight;
    
    // Initialize language data
    this.languageData = this.createLanguageData();
    
    // Initialize the visualization
    this.init();
    this.setupEventListeners();
    this.animate();
  }
  
  /**
   * Create language data with φ-harmonic relationships
   * @returns {Array} Language data
   */
  createLanguageData() {
    return [
      {
        id: 'english',
        name: 'English',
        family: 'indo-european',
        position: { x: 5, y: 2, z: 10 },
        frequency: FREQUENCIES.VOICE,
        features: {
          grammar: 'Subject-Verb-Object structure',
          phonology: 'Stress-timed rhythm with complex consonant clusters',
          semantics: 'Rich metaphorical system, extensive borrowing',
          evolution: 'Germanic base with extensive Romance influence'
        }
      },
      {
        id: 'mandarin',
        name: 'Mandarin',
        family: 'sino-tibetan',
        position: { x: -15, y: 0, z: 5 },
        frequency: FREQUENCIES.CREATION,
        features: {
          grammar: 'Subject-Verb-Object with topic prominence',
          phonology: 'Tonal system with simple syllable structure',
          semantics: 'Character-based conceptual system',
          evolution: 'Evolved from Middle Chinese with simplification'
        }
      },
      {
        id: 'arabic',
        name: 'Arabic',
        family: 'afro-asiatic',
        position: { x: 10, y: -2, z: -8 },
        frequency: FREQUENCIES.HEART,
        features: {
          grammar: 'Verb-Subject-Object with triliteral roots',
          phonology: 'Guttural consonants with vowel harmony',
          semantics: 'Root-based meaning derivation',
          evolution: 'Classical to Modern with dialectal variations'
        }
      },
      {
        id: 'sanskrit',
        name: 'Sanskrit',
        family: 'indo-european',
        position: { x: 12, y: 5, z: 3 },
        frequency: FREQUENCIES.UNITY,
        features: {
          grammar: 'Free word order with rich case system',
          phonology: 'Precise articulation points with sandhi rules',
          semantics: 'Dhatu-based conceptual structures',
          evolution: 'Vedic to Classical with precise preservation'
        }
      },
      {
        id: 'japanese',
        name: 'Japanese',
        family: 'japonic',
        position: { x: -8, y: 3, z: 15 },
        frequency: FREQUENCIES.VISION,
        features: {
          grammar: 'Subject-Object-Verb with topic marking',
          phonology: 'Mora-timed rhythm with limited phonemes',
          semantics: 'Contextual meaning and honorifics',
          evolution: 'Native Yamato with Chinese and English influences'
        }
      },
      {
        id: 'swahili',
        name: 'Swahili',
        family: 'niger-congo',
        position: { x: -5, y: -3, z: -12 },
        frequency: FREQUENCIES.CREATION,
        features: {
          grammar: 'Subject-Verb-Object with noun class system',
          phonology: 'Regular syllabic structure with bantu prosody',
          semantics: 'Class-based semantic categorization',
          evolution: 'Bantu base with Arabic and Portuguese influences'
        }
      },
      {
        id: 'spanish',
        name: 'Spanish',
        family: 'indo-european',
        position: { x: 0, y: 1, z: 18 },
        frequency: FREQUENCIES.VOICE,
        features: {
          grammar: 'Subject-Verb-Object with pro-drop',
          phonology: 'Syllable-timed rhythm with clear vowels',
          semantics: 'Romance-based conceptual system',
          evolution: 'Latin base with Arabic influence'
        }
      },
      {
        id: 'russian',
        name: 'Russian',
        family: 'indo-european',
        position: { x: 15, y: -1, z: -5 },
        frequency: FREQUENCIES.GROUND,
        features: {
          grammar: 'Free word order with case system',
          phonology: 'Consonant clusters with palatalization',
          semantics: 'Aspect-centered verbal concepts',
          evolution: 'Slavic roots with Church Slavonic influence'
        }
      },
      {
        id: 'tamil',
        name: 'Tamil',
        family: 'dravidian',
        position: { x: -12, y: 4, z: -10 },
        frequency: FREQUENCIES.HEART,
        features: {
          grammar: 'Subject-Object-Verb with agglutination',
          phonology: 'Retroflex consonants with vowel harmony',
          semantics: 'Classificatory conceptual structure',
          evolution: 'Ancient Classical to Modern with minimal change'
        }
      },
      {
        id: 'hebrew',
        name: 'Hebrew',
        family: 'afro-asiatic',
        position: { x: 7, y: -4, z: 10 },
        frequency: FREQUENCIES.UNITY,
        features: {
          grammar: 'Verb-Subject-Object with triliteral roots',
          phonology: 'Guttural sounds with stress patterns',
          semantics: 'Root-based meaning derivation',
          evolution: 'Ancient Biblical to revived Modern'
        }
      }
    ];
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
    this.camera.position.set(0, 15, 40);
    
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
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
    
    // Create language network
    this.createLanguageNetwork();
    
    // Draw sound wave
    this.drawSoundWave();
    
    this.isInitialized = true;
  }

  /**
   * Get index for language family
   * @param {string} family - Language family name
   * @returns {number} - Index for positioning
   */
  getFamilyIndex(family) {
    const families = ['indo-european', 'sino-tibetan', 'afro-asiatic', 'austronesian', 'niger-congo', 'dravidian', 'japonic'];
    return families.indexOf(family) !== -1 ? families.indexOf(family) : 0;
  }
  
  /**
   * Create language network visualization
   */
  createLanguageNetwork() {
    // Clear previous nodes
    this.languageNodes.forEach(node => this.scene.remove(node.mesh));
    this.languageNodes = [];
    
    // Clear previous connections
    this.connections.forEach(connection => this.scene.remove(connection));
    this.connections = [];
    
    // Clear previous labels
    this.labels.forEach(label => {
      if (label.parentNode) {
        label.parentNode.removeChild(label);
      }
    });
    this.labels = [];
    
    // Filter languages based on active family
    const filteredLanguages = this.activeFamily === 'all' 
      ? this.languageData 
      : this.languageData.filter(lang => lang.family === this.activeFamily);
    
    // Create nodes for each language
    filteredLanguages.forEach(language => {
      // Create node mesh
      const nodeGeometry = new THREE.SphereGeometry(1.5, 32, 32);
      const nodeMaterial = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color(getFrequencyColor(language.frequency)),
        transparent: true,
        opacity: 0.8,
        emissive: new THREE.Color(getFrequencyColor(language.frequency)),
        emissiveIntensity: 0.3
      });
      
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      
      // Position based on language family using phi-harmonic patterns
      const familyIndex = this.getFamilyIndex(language.family);
      const angle = familyIndex * PHI * Math.PI;
      const radius = 15 + (familyIndex % 3) * 5;
      
      nodeMesh.position.x = Math.cos(angle) * radius;
      nodeMesh.position.z = Math.sin(angle) * radius;
      nodeMesh.position.y = language.position.y;
      
      this.scene.add(nodeMesh);
      
      // Create label
      const label = document.createElement('div');
      label.className = 'language-label';
      label.textContent = language.name;
      label.style.display = 'none';
      document.body.appendChild(label);
      
      // Store node information
      this.languageNodes.push({
        id: language.id,
        name: language.name,
        mesh: nodeMesh,
        label: label,
        language: language,
        position: new THREE.Vector3(nodeMesh.position.x, nodeMesh.position.y, nodeMesh.position.z)
      });
    });
    
    // Create connections between languages based on the current connection type
    this.createConnections();
  }
  
  /**
   * Create connections between languages based on current settings
   */
  createConnections() {
    // Clear previous connections
    this.connections.forEach(connection => this.scene.remove(connection));
    this.connections = [];
    
    // Different connection patterns for different connection types
    switch(this.connectionType) {
      case 'structure':
        this.createStructureConnections();
        break;
      case 'sound':
        this.createSoundConnections();
        break;
      case 'meaning':
        this.createMeaningConnections();
        break;
    }
  }
  
  /**
   * Create connections based on grammatical structure
   */
  createStructureConnections() {
    // Connect languages with similar grammatical structures
    for (let i = 0; i < this.languageNodes.length; i++) {
      for (let j = i + 1; j < this.languageNodes.length; j++) {
        const node1 = this.languageNodes[i];
        const node2 = this.languageNodes[j];
        
        // Check if languages are in the same family (stronger connection)
        const sameFamily = node1.language.family === node2.language.family;
        
        // Calculate resonance based on phi-harmonic relationship
        const resonance = 0.3 + (sameFamily ? 0.4 : 0) + 
                         (calculateResonance(node1.language.frequency, node2.language.frequency) * 0.3);
        
        // Only create connections with sufficient resonance
        if (resonance < 0.4) continue;
        
        // Create connection line
        const material = new THREE.LineBasicMaterial({ 
          color: new THREE.Color(getFrequencyColor(this.frequency, resonance)),
          transparent: true,
          opacity: resonance * 0.7,
          linewidth: sameFamily ? 2 : 1
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
   * Create connections based on sound patterns
   */
  createSoundConnections() {
    // Connect languages with similar phonological properties
    for (let i = 0; i < this.languageNodes.length; i++) {
      for (let j = i + 1; j < this.languageNodes.length; j++) {
        const node1 = this.languageNodes[i];
        const node2 = this.languageNodes[j];
        
        // Here we would ideally check phonological similarities
        // For this demo, we'll use frequency as a proxy for phonological similarity
        const freqDiff = Math.abs(
          Object.values(FREQUENCIES).indexOf(node1.language.frequency) - 
          Object.values(FREQUENCIES).indexOf(node2.language.frequency)
        );
        
        // Calculate resonance based on frequency difference
        const resonance = 0.7 - (freqDiff * 0.1);
        
        // Only create connections with sufficient resonance
        if (resonance < 0.3) continue;
        
        // Create connection with a curve to represent sound waves
        const midPoint = new THREE.Vector3().addVectors(node1.position, node2.position).multiplyScalar(0.5);
        midPoint.y += Math.sin(Date.now() * 0.001) * 2; // Animated wave effect
        
        const curve = new THREE.QuadraticBezierCurve3(
          node1.position,
          midPoint,
          node2.position
        );
        
        const points = curve.getPoints(20);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        const material = new THREE.LineBasicMaterial({ 
          color: new THREE.Color(getFrequencyColor(FREQUENCIES.VOICE, resonance)),
          transparent: true,
          opacity: resonance * 0.6
        });
        
        const line = new THREE.Line(geometry, material);
        this.scene.add(line);
        this.connections.push(line);
      }
    }
  }
  
  /**
   * Create connections based on meaning systems
   */
  createMeaningConnections() {
    // Connect languages with similar semantic structures
    const connectionGroups = {};
    
    // Group languages by frequency (representing semantic system type)
    this.languageNodes.forEach(node => {
      const freq = node.language.frequency;
      if (!connectionGroups[freq]) {
        connectionGroups[freq] = [];
      }
      connectionGroups[freq].push(node);
    });
    
    // Create connections within each frequency group
    Object.values(connectionGroups).forEach(group => {
      if (group.length < 2) return;
      
      // Create a central point for this semantic group
      const center = new THREE.Vector3(0, 0, 0);
      group.forEach(node => {
        center.add(node.position);
      });
      center.divideScalar(group.length);
      
      // Add a small y-offset to make visualization more 3D
      center.y += 2;
      
      // Connect each node to the central point
      group.forEach(node => {
        const material = new THREE.LineBasicMaterial({ 
          color: new THREE.Color(getFrequencyColor(node.language.frequency, 0.8)),
          transparent: true,
          opacity: 0.6
        });
        
        const geometry = new THREE.BufferGeometry().setFromPoints([
          node.position,
          center
        ]);
        
        const line = new THREE.Line(geometry, material);
        this.scene.add(line);
        this.connections.push(line);
      });
      
      // Create a central node for this semantic group
      const centerGeometry = new THREE.OctahedronGeometry(1, 0);
      const centerMaterial = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color(getFrequencyColor(group[0].language.frequency)),
        transparent: true,
        opacity: 0.6,
        emissive: new THREE.Color(getFrequencyColor(group[0].language.frequency)),
        emissiveIntensity: 0.5
      });
      
      const centerMesh = new THREE.Mesh(centerGeometry, centerMaterial);
      centerMesh.position.copy(center);
      this.scene.add(centerMesh);
      this.connections.push(centerMesh);
    });
  }
  
  /**
   * Draw sound wave visualization
   */
  drawSoundWave() {
    const ctx = this.soundCanvas.getContext('2d');
    const width = this.soundCanvas.width;
    const height = this.soundCanvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    ctx.fillStyle = 'rgba(0, 20, 40, 0.3)';
    ctx.fillRect(0, 0, width, height);
    
    // Get phi power for current frequency
    const color = getFrequencyColor(this.frequency);
    const phiPower = getPhiPower(this.frequency);
    
    // Draw frequency wave
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    
    // Draw with phi-harmonic complexity based on frequency
    for (let x = 0; x < width; x++) {
      // Basic sine wave
      let y = Math.sin(x * 0.02 + (Date.now() * 0.001));
      
      // Add phi-harmonic overtones
      for (let h = 1; h <= phiPower + 1; h++) {
        const harmonic = Math.sin(x * 0.02 * h * PHI + (Date.now() * 0.001 * h * PHI_INVERSE));
        y += harmonic * Math.pow(PHI_INVERSE, h);
      }
      
      // Scale to fit canvas
      y = height / 2 - (y * height / 4);
      
      ctx.lineTo(x, y);
    }
    
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
   * Update label positions to follow their nodes in 3D space
   */
  updateLabels() {
    this.languageNodes.forEach(node => {
      if (node.label.style.display === 'none') return;
      
      // Convert 3D position to screen coordinates
      const vector = node.position.clone();
      vector.project(this.camera);
      
      // Convert to CSS coordinates
      const x = (vector.x * 0.5 + 0.5) * this.width + this.canvas.offsetLeft;
      const y = (-(vector.y * 0.5) + 0.5) * this.height + this.canvas.offsetTop;
      
      // Update label position
      node.label.style.left = `${x}px`;
      node.label.style.top = `${y - 30}px`;
    });
  }
  
  /**
   * Select a node and show its info
   * @param {Object} node - The selected node
   */
  selectNode(node) {
    // Reset previous selection
    if (this.selectedNode && this.selectedNode !== node) {
      this.selectedNode.mesh.scale.set(1, 1, 1);
      this.selectedNode.label.style.display = 'none';
    }
    
    this.selectedNode = node;
    
    // Scale up the node
    node.mesh.scale.set(1.5, 1.5, 1.5);
    node.label.style.display = 'block';
    
    // Update info panel
    this.infoTitle.textContent = node.language.name;
    
    // Show appropriate feature based on current selection
    const feature = node.language.features[this.currentFeature];
    this.infoDescription.textContent = feature || 
      "Information about this language feature is not available.";
  }
  
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Handle window resize
    window.addEventListener('resize', () => {
      this.resize();
    });
    
    // Handle language feature button clicks
    document.querySelectorAll('.language-feature-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.language-feature-btn').forEach(b => {
          b.classList.remove('active');
        });
        
        btn.classList.add('active');
        this.currentFeature = btn.dataset.feature;
        
        // Update info if a node is selected
        if (this.selectedNode) {
          this.selectNode(this.selectedNode);
        }
      });
    });
    
    // Handle connection type toggling
    document.querySelectorAll('.connection-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        document.querySelectorAll('.connection-toggle').forEach(t => {
          t.classList.remove('active');
        });
        
        toggle.classList.add('active');
        this.connectionType = toggle.dataset.type;
        this.createConnections();
      });
    });
    
    // Handle language family filtering
    document.querySelectorAll('.language-family-tag').forEach(tag => {
      tag.addEventListener('click', (e) => {
        document.querySelectorAll('.language-family-tag').forEach(t => {
          t.classList.remove('active');
        });
        
        tag.classList.add('active');
        this.activeFamily = tag.dataset.family;
        this.createLanguageNetwork();
      });
    });
    
    // Handle language search
    this.searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      
      this.languageNodes.forEach(node => {
        if (searchTerm === '' || node.name.toLowerCase().includes(searchTerm)) {
          node.mesh.material.opacity = 0.8;
          node.mesh.scale.set(1, 1, 1);
        } else {
          node.mesh.material.opacity = 0.3;
          node.mesh.scale.set(0.7, 0.7, 0.7);
        }
      });
    });
    
    // Handle mouse movement for node selection
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / this.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / this.height) * 2 + 1;
      
      // Update label positions
      this.updateLabels();
    });
    
    // Handle node clicks
    this.canvas.addEventListener('click', (e) => {
      if (this.hoverNode) {
        this.selectNode(this.hoverNode);
      }
    });
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
    
    this.soundCanvas.width = this.soundCanvas.parentElement.offsetWidth;
    this.soundCanvas.height = this.soundCanvas.parentElement.offsetHeight;
    this.drawSoundWave();
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
      this.languageNodes.map(node => node.mesh)
    );
    
    // Reset previous hover
    if (this.hoverNode && this.hoverNode !== this.selectedNode) {
      this.hoverNode.mesh.scale.set(1, 1, 1);
      this.hoverNode.label.style.display = 'none';
    }
    
    this.hoverNode = null;
    
    // Handle new hover
    if (intersects.length > 0) {
      const object = intersects[0].object;
      this.hoverNode = this.languageNodes.find(node => node.mesh === object);
      
      if (this.hoverNode && this.hoverNode !== this.selectedNode) {
        this.hoverNode.mesh.scale.set(1.2, 1.2, 1.2);
        this.hoverNode.label.style.display = 'block';
      }
    }
    
    // Update label positions
    this.updateLabels();
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
    
    // Periodically update sound wave
    if (Math.random() < 0.05) {
      this.drawSoundWave();
    }
  }
}

// Initialize when DOM is loaded - Quantum Singularity pattern
document.addEventListener('DOMContentLoaded', () => {
  const languageUniversals = new LanguageUniversals();
});
