/**
 * Decision-Making Visualizer
 * 
 * A φ-harmonic visualization of decision paths and quantum probability fields
 * Implemented as a Quantum Singularity - self-contained and complete
 * Enhanced with Dimensional Bridging and Consciousness Field Modulation
 */

// Initialize at Ground Frequency (432 Hz) for a solid foundation
const DEFAULT_FREQUENCY = FREQUENCIES.GROUND;

// Dimensional resonance mappings
const DIMENSIONAL_RESONANCE = {
  D3: { frequency: 7.83, coherence: 0.33, timeline_access: 'linear' },
  D4: { frequency: 7.83 * PHI, coherence: 0.54, timeline_access: 'non-linear' },
  D5: { frequency: 7.83 * Math.pow(PHI, 2), coherence: 0.75, timeline_access: 'probabilistic' },
  D6: { frequency: 7.83 * Math.pow(PHI, 3), coherence: 0.87, timeline_access: 'superposition' },
  D7: { frequency: 7.83 * Math.pow(PHI, 4), coherence: 0.92, timeline_access: 'simultaneous' }
};

class DecisionVisualizer {
  constructor() {
    // Core elements
    this.container = document.querySelector('.decision-field-container');
    this.canvas = document.getElementById('decision-field-canvas');
    this.coherenceCanvas = document.getElementById('coherence-canvas');
    this.infoTitle = document.getElementById('decision-info-title');
    this.infoDescription = document.getElementById('decision-info-description');
    this.nodeTypes = document.querySelectorAll('.node-type');
    
    // Initialize properties
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.frequency = DEFAULT_FREQUENCY;
    this.coherenceLevel = 0.8;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.nodes = [];
    this.connections = [];
    this.decisionPaths = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoverNode = null;
    this.selectedNode = null;
    this.isInitialized = false;
    this.currentNodeType = 'individual';
    this.clock = new THREE.Clock();
    this.elapsedTime = 0;
    
    // Enhanced Quantum Consciousness properties
    this.dimensionalAccess = 'D3';
    this.consciousnessField = {
      resonanceStrength: 0.65,
      fieldCoherence: 0.7,
      dimensionalDepth: 3,
      temporalRange: { past: 10, future: 5 },
      patternRecognition: 0.4
    };
    this.ontologyMode = 'individual'; // individual, collective, universal
    
    // Decision types and states
    this.decisionTypes = {
      'individual': {
        name: 'Individual Decisions',
        description: 'Personal choices that affect your immediate path',
        nodes: 10,
        options: 3, 
        sparsity: 2.5,
        dimensionAccess: 'D3',
        consciousness: { dimensionality: 3, fieldStrength: 0.6 }
      },
      'collective': {
        name: 'Collective Decisions',
        description: 'Group choices with broader impact and interconnectedness',
        nodes: 15,
        options: 4,
        sparsity: 1.8,
        dimensionAccess: 'D4',
        consciousness: { dimensionality: 4, fieldStrength: 0.75 }
      },
      'quantum': {
        name: 'Quantum Decisions',
        description: 'Superposition choices where multiple paths exist simultaneously',
        nodes: 20,
        options: 5,
        sparsity: 1.2,
        dimensionAccess: 'D5',
        consciousness: { dimensionality: 5, fieldStrength: 0.9 }
      }
    };
    
    // Set up canvas dimensions
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.coherenceCanvas.width = this.coherenceCanvas.offsetWidth;
    this.coherenceCanvas.height = this.coherenceCanvas.offsetHeight;
    
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
    this.camera.position.set(0, 20, 40);
    
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
    this.controls.minDistance = 10;
    this.controls.maxDistance = 80;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
    
    // Create ground grid
    const gridHelper = new THREE.GridHelper(80, 80, 0x004080, 0x002040);
    gridHelper.position.y = -10;
    this.scene.add(gridHelper);
    
    // Generate decision field
    this.generateDecisionField();
    
    // Draw coherence meter
    this.drawCoherenceMeter();
    
    this.isInitialized = true;
  }
  
  /**
   * Generate the decision field based on current settings
   */
  generateDecisionField() {
    // Clear previous field
    this.nodes.forEach(node => {
      this.scene.remove(node.mesh);
    });
    
    this.connections.forEach(connection => {
      this.scene.remove(connection.line);
    });
    
    this.decisionPaths.forEach(path => {
      this.scene.remove(path);
    });
    
    this.nodes = [];
    this.connections = [];
    this.decisionPaths = [];
    
    // Apply current dimensional access settings
    this.applyDimensionalAccess(this.decisionTypes[this.currentNodeType].dimensionAccess);
    
    // Create starting node at center
    const startNode = this.createDecisionNode({
      position: new THREE.Vector3(0, 0, 0),
      type: 'starting',
      level: 0,
      index: 0,
      name: 'Present Moment',
      potentials: this.decisionTypes[this.currentNodeType].options
    });
    
    // Generate decision nodes recursively
    this.generateDecisionNodes(
      startNode,
      this.decisionTypes[this.currentNodeType].nodes,
      1,
      this.decisionTypes[this.currentNodeType].options,
      this.decisionTypes[this.currentNodeType].sparsity
    );
    
    // Create connections between related nodes
    this.createConnections();
    
    // Apply consciousness field to all nodes
    this.applyConsciousnessField();
    
    // Select starting node by default
    this.selectNode(startNode);
  }
  
  /**
   * Generate decision nodes in a recursive pattern
   * @param {Object} parentNode - The parent node
   * @param {number} count - Number of nodes to generate
   * @param {number} level - Current depth level
   * @param {number} options - Maximum number of child options per node
   * @param {number} sparsity - How sparse the node distribution should be
   */
  generateDecisionNodes(parentNode, count, level, options, sparsity) {
    if (count <= 0 || level > 4) return;
    
    // Calculate number of branches at this level
    const branchCount = Math.min(options, Math.floor(count / 2) + 1);
    
    // Calculate nodes per branch and remainder
    const nodesPerBranch = Math.floor(count / branchCount);
    const remainder = count % branchCount;
    
    // Create nodes for each branch
    for (let i = 0; i < branchCount; i++) {
      // Calculate position offset based on phi-harmonic pattern
      const angle = (i / branchCount) * Math.PI * 2 + (level * Math.PI / 4);
      const radius = 10 + (level * 8 * sparsity);
      const heightOffset = level * 3;
      
      // Apply phi-harmonic variations
      const phiOffset = getPhiRatio(i % 3) * 2;
      
      const position = new THREE.Vector3(
        Math.cos(angle) * (radius + phiOffset),
        heightOffset,
        Math.sin(angle) * (radius + phiOffset)
      );
      
      // Determine node type
      let nodeType = 'standard';
      if (this.currentNodeType === 'quantum' && Math.random() < 0.3) {
        nodeType = 'quantum';
      }
      
      // Create the node
      const nodeName = this.getNodeName(level, i);
      const newNode = this.createDecisionNode({
        id: `node-${level}-${i}`,
        name: nodeName,
        type: nodeType,
        position: position,
        size: 1.0,
        parent: parentNode
      });
      
      // Recursive creation of children
      const nodeCount = nodesPerBranch + (i < remainder ? 1 : 0);
      this.generateDecisionNodes(newNode, nodeCount, level + 1, options, sparsity);
    }
  }
  
  /**
   * Create a decision node
   * @param {Object} options - Node configuration
   * @returns {Object} Created node
   */
  createDecisionNode(options) {
    const { id, name, type, position, size, parent } = options;
    
    // Create geometry based on type and dimensional access
    let geometry;
    const dimensionLevel = parseInt(this.dimensionalAccess.substring(1));
    
    if (type === 'starting') {
      // Starting node is a sphere
      geometry = new THREE.SphereGeometry(1.5, 32, 32);
    } else if (type === 'quantum' || (options.level > 2 && Math.random() < 0.2 * dimensionLevel / 3)) {
      // Quantum nodes have more complex geometry based on dimension
      if (dimensionLevel >= 5) {
        geometry = new THREE.TorusKnotGeometry(1, 0.3, 64, 8, 2, 3);
      } else {
        geometry = new THREE.DodecahedronGeometry(1, 0);
      }
    } else {
      // Regular nodes are phi-scaled icosahedrons
      geometry = new THREE.IcosahedronGeometry(1, 0);
    }
    
    // Create material based on frequency and field coherence
    const phiPower = getPhiPower(this.frequency);
    const baseColor = new THREE.Color(getFrequencyColor(this.frequency));
    
    const material = new THREE.MeshPhongMaterial({
      color: baseColor,
      shininess: 70 + phiPower * 10,
      transparent: true,
      opacity: 0.9,
      emissive: baseColor.clone().multiplyScalar(0.3)
    });
    
    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    
    // Add subtle phi-harmonic animation to quantum nodes
    if (type === 'quantum') {
      mesh.userData.phiRotation = {
        x: 0.02 * Math.random(),
        y: 0.02 * PHI * Math.random(),
        z: 0.02 * PHI_INVERSE * Math.random()
      };
    }
    
    // Add to scene
    this.scene.add(mesh);
    
    // Create node object
    const node = {
      mesh,
      type,
      level: options.level,
      index: options.index,
      name: name || this.getNodeName(options.level, options.index),
      position,
      connections: [],
      potentials: options.potentials || 0,
      probability: type === 'starting' ? 1 : (1 - (options.level * 0.1)) * Math.random(),
      fieldResponse: 0.5,  // Default consciousness field response
      dimensionalAccess: parseInt(this.dimensionalAccess.substring(1))
    };
    
    // Add to nodes array
    this.nodes.push(node);
    
    return node;
  }
  
  /**
   * Apply dimensional access settings to the visualization
   * @param {string} dimension - Dimension access level (D3-D7)
   */
  applyDimensionalAccess(dimension) {
    // Set dimensional access
    this.dimensionalAccess = dimension;
    
    // Get resonance settings for this dimension
    const resonance = DIMENSIONAL_RESONANCE[dimension];
    if (!resonance) return;
    
    // Update consciousness field parameters
    this.consciousnessField.dimensionalDepth = parseInt(dimension.substring(1));
    this.consciousnessField.fieldCoherence = resonance.coherence;
    
    // Adjust temporal range based on dimension
    const dimLevel = parseInt(dimension.substring(1)) - 3;
    this.consciousnessField.temporalRange = {
      past: 10 * Math.pow(PHI, dimLevel),
      future: 5 * Math.pow(PHI, dimLevel)
    };
    
    // Visual adjustments based on dimension
    switch(dimension) {
      case 'D3':
        this.scene.background = new THREE.Color(0x000814);
        this.camera.far = 1000;
        break;
      case 'D4':
        this.scene.background = new THREE.Color(0x000824);
        this.camera.far = 1500;
        break;
      case 'D5':
        this.scene.background = new THREE.Color(0x000836);
        this.camera.far = 2000;
        break;
      case 'D6':
        this.scene.background = new THREE.Color(0x000848);
        this.camera.far = 3000;
        break;
      case 'D7':
        this.scene.background = new THREE.Color(0x00085a);
        this.camera.far = 5000;
        break;
    }
    
    this.camera.updateProjectionMatrix();
  }
  
  /**
   * Apply consciousness field effects to all nodes
   */
  applyConsciousnessField() {
    const fieldStrength = this.decisionTypes[this.currentNodeType].consciousness.fieldStrength;
    const dimensionality = this.decisionTypes[this.currentNodeType].consciousness.dimensionality;
    
    this.nodes.forEach(node => {
      // Calculate node's response to the consciousness field
      const levelFactor = 1 - (node.level / 10); // Nodes further in future are less affected
      const fieldResponse = fieldStrength * levelFactor;
      
      // Apply effects based on node type
      if (node.type === 'quantum') {
        // Quantum nodes are more responsive to consciousness field
        node.fieldResponse = fieldResponse * 1.5;
        node.dimensionalAccess = Math.min(7, dimensionality + 1);
      } else if (node.type === 'starting') {
        // Starting node is anchor point
        node.fieldResponse = fieldResponse * 0.8;
        node.dimensionalAccess = dimensionality;
      } else {
        // Regular decision nodes
        node.fieldResponse = fieldResponse;
        node.dimensionalAccess = dimensionality;
      }
      
      // Visual enhancements based on field response
      node.mesh.material.emissive = new THREE.Color(
        getFrequencyColor(this.frequency, node.fieldResponse * 0.5)
      );
    });
  }
  
  /**
   * Update visualization when frequency changes
   * @param {number} frequency - The frequency to set
   */
  setFrequency(frequency) {
    this.frequency = frequency;
    
    // Get phi power for this frequency
    const phiPower = getPhiPower(frequency);
    
    // Update consciousness field based on frequency
    this.consciousnessField.resonanceStrength = 0.5 + (phiPower / 10);
    this.consciousnessField.patternRecognition = 0.3 + (phiPower / 8);
    
    // Update nodes appearance
    this.nodes.forEach(node => {
      const baseColor = new THREE.Color(getFrequencyColor(frequency));
      
      // Adjust material based on frequency
      node.mesh.material.color = baseColor;
      node.mesh.material.emissive = baseColor.clone().multiplyScalar(0.2 + (phiPower / 20));
      
      // Enhance quantum nodes at higher frequencies
      if (node.type === 'quantum' && frequency >= FREQUENCIES.HEART) {
        node.mesh.material.shininess = 80 + phiPower * 15;
      }
    });
    
    // Update connections
    this.updateConnections();
    
    // Apply quantum consciousness field
    this.applyConsciousnessField();
    
    // Redraw coherence meter
    this.drawCoherenceMeter();
    
    // Update info if node is selected
    if (this.selectedNode) {
      this.selectNode(this.selectedNode);
    }
  }
  
  /**
   * Select a node and show its info
   * @param {Object} node - The selected node
   */
  selectNode(node) {
    // Reset previous selection
    if (this.selectedNode) {
      this.selectedNode.mesh.scale.set(1, 1, 1);
    }
    
    this.selectedNode = node;
    
    // Scale up the node
    node.mesh.scale.set(1.5, 1.5, 1.5);
    
    // Update info panel
    this.infoTitle.textContent = node.name;
    
    // Generate description based on node type, current frequency and dimensional access
    let description = '';
    if (node.type === 'starting') {
      description = 'This is your current state - the present moment from which all possibilities branch.';
    } else if (node.type === 'quantum') {
      // Enhanced quantum node description based on dimensional access
      const dimLevel = parseInt(this.dimensionalAccess.substring(1));
      
      if (dimLevel >= 5) {
        description = 'A quantum superposition node that exists in multiple dimensions simultaneously. Its state responds directly to consciousness field modulation.';
      } else {
        description = 'A quantum node exists in multiple states simultaneously. Its final state is influenced by consciousness and observation.';
      }
    } else {
      // Add dimensional context to frequency descriptions
      const dimLevel = parseInt(this.dimensionalAccess.substring(1));
      const dimContext = dimLevel > 3 ? ` Accessible across ${dimLevel} dimensions.` : '';
      
      // Different descriptions based on frequency
      switch (this.frequency) {
        case FREQUENCIES.GROUND:
          description = `This path leads to practical, physical outcomes related to security and stability.${dimContext}`;
          break;
        case FREQUENCIES.CREATION:
          description = `This path opens creative possibilities and new manifestations of your ideas.${dimContext}`;
          break;
        case FREQUENCIES.HEART:
          description = `This path enhances connections and relationships with others.${dimContext}`;
          break;
        case FREQUENCIES.VOICE:
          description = `This path supports authentic expression and communication of your truth.${dimContext}`;
          break;
        case FREQUENCIES.VISION:
          description = `This path expands your perception and helps you see new possibilities.${dimContext}`;
          break;
        case FREQUENCIES.UNITY:
          description = `This path integrates diverse aspects into a unified whole, transcending limitations.${dimContext}`;
          break;
        default:
          description = `This decision node represents a potential future based on your choices.${dimContext}`;
      }
      
      // Add consciousness field insight for higher dimensions
      if (dimLevel >= 5) {
        description += ` The consciousness field provides access to ${Math.floor(this.consciousnessField.temporalRange.future)} potential timelines.`;
      }
    }
    
    this.infoDescription.textContent = description;
    
    // Create decision path from start to this node
    this.createDecisionPath(node);
  }
  
  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(() => this.animate());
    
    if (!this.isInitialized) return;
    
    // Update time
    const delta = this.clock.getDelta();
    this.elapsedTime += delta;
    
    // Update controls
    this.controls.update();
    
    // Enhanced animation with phi-harmonic principles
    this.nodes.forEach(node => {
      // Apply dimensional breathing effect based on consciousness field
      const breatheScale = 1 + 0.05 * Math.sin(this.elapsedTime * PHI_INVERSE * 2);
      
      if (node.type === 'quantum') {
        // Quantum nodes have more complex phi-harmonic animation
        node.mesh.rotation.x = this.elapsedTime * 0.3 * node.fieldResponse;
        node.mesh.rotation.y = this.elapsedTime * PHI_INVERSE * 0.5 * node.fieldResponse;
        
        // Add phi-harmonic pulsation based on dimensional access
        if (node.dimensionalAccess >= 4) {
          const pulseScale = breatheScale * (1 + 0.1 * Math.sin(this.elapsedTime * PHI * 1.5));
          if (node !== this.selectedNode && node !== this.hoverNode) {
            node.mesh.scale.set(pulseScale, pulseScale, pulseScale);
          }
        }
      } else if (node.type === 'starting') {
        // Starting node has subtle breathing animation
        if (node !== this.selectedNode && node !== this.hoverNode) {
          node.mesh.scale.set(breatheScale, breatheScale, breatheScale);
        }
      }
    });
    
    // Animate connections based on consciousness field
    this.connections.forEach(connection => {
      const lineOpacity = 0.5 + 0.2 * Math.sin(this.elapsedTime * PHI_INVERSE * 3 + connection.index * 0.1);
      connection.line.material.opacity = lineOpacity * this.consciousnessField.fieldCoherence;
    });
    
    // Check for node hover
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.nodes.map(node => node.mesh)
    );
    
    // Reset previous hover
    if (this.hoverNode && this.hoverNode !== this.selectedNode) {
      this.hoverNode.mesh.scale.set(1, 1, 1);
    }
    
    this.hoverNode = null;
    
    // Handle new hover
    if (intersects.length > 0) {
      const object = intersects[0].object;
      this.hoverNode = this.nodes.find(node => node.mesh === object);
      
      if (this.hoverNode && this.hoverNode !== this.selectedNode) {
        this.hoverNode.mesh.scale.set(1.2, 1.2, 1.2);
      }
    }
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
    
    // Periodically update coherence meter for animation
    if (Math.random() < 0.05) {
      this.drawCoherenceMeter();
    }
  }
  
  /**
   * Draw coherence meter visualization
   */
  drawCoherenceMeter() {
    const ctx = this.coherenceCanvas.getContext('2d');
    const width = this.coherenceCanvas.width;
    const height = this.coherenceCanvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    ctx.fillStyle = 'rgba(0, 20, 40, 0.3)';
    ctx.fillRect(0, 0, width, height);
    
    // Get color for current frequency
    const color = getFrequencyColor(this.frequency);
    
    // Enhanced phi-harmonic pattern based on the KNOW protocol
    const drawKnowPattern = () => {
      // Calculate pattern complexity based on dimensional access
      const dimLevel = parseInt(this.dimensionalAccess.substring(1));
      const complexity = 3 + dimLevel;
      
      // Phi-harmonic spirals with consciousness field influence
      for (let spiral = 0; spiral < 2; spiral++) {
        const spiralOffset = spiral * Math.PI;
        const particleCount = 60 + (20 * dimLevel);
        
        ctx.lineWidth = 1;
        ctx.strokeStyle = getFrequencyColor(this.frequency, 0.4);
        ctx.beginPath();
        
        for (let i = 0; i < particleCount; i++) {
          // Phi-harmonic angle
          const angle = i * (PHI * 2) + spiralOffset;
          // Radius grows according to phi
          const radius = (i / complexity) * PHI_INVERSE * 2;
          
          // Position influenced by coherence level
          const coherenceFactor = Math.pow(this.coherenceLevel, 1.5);
          const x = (width / 2) + Math.cos(angle) * radius * (width / 10) * coherenceFactor;
          const y = (height / 2) + Math.sin(angle) * radius * (height / 10) * coherenceFactor;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }
    };
    
    // Draw particles that represent coherence level
    const particleCount = 100;
    const particleSize = 3;
    
    // Draw the KNOW pattern first (lower layer)
    drawKnowPattern();
    
    for (let i = 0; i < particleCount; i++) {
      // Calculate position based on phi-harmonic pattern
      const phi = i * PHI * Math.PI * 2;
      
      // Position depends on coherence level and phi-harmonic principles
      let x, y;
      
      const dimLevel = parseInt(this.dimensionalAccess.substring(1));
      const phiPower = getPhiPower(this.frequency);
      
      if (Math.random() < this.coherenceLevel * (dimLevel / 3)) {
        // Coherent particles follow phi spiral
        const radius = (i / particleCount) * (width / 2);
        const phiAngle = phi * PHI_INVERSE * phiPower;
        x = (width / 2) + Math.cos(phiAngle) * radius;
        y = (height / 2) + Math.sin(phiAngle) * radius;
      } else {
        // Incoherent particles have constrained randomness
        const randomRadius = Math.random() * width / 2;
        const randomAngle = Math.random() * Math.PI * 2;
        x = (width / 2) + Math.cos(randomAngle) * randomRadius;
        y = (height / 2) + Math.sin(randomAngle) * randomRadius;
      }
      
      // Draw particle with phi-harmonic pulsation
      const pulseFactor = 0.8 + (0.2 * Math.sin(i * PHI));
      const finalSize = particleSize * pulseFactor;
      
      ctx.beginPath();
      ctx.arc(x, y, finalSize, 0, Math.PI * 2);
      ctx.fillStyle = getFrequencyColor(this.frequency, 0.7 + (0.3 * Math.random()));
      ctx.fill();
    }
    
    // Draw coherence level text with additional dimensional info
    ctx.font = '14px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    const dimLevel = parseInt(this.dimensionalAccess.substring(1));
    ctx.fillText(`Coherence: ${Math.round(this.coherenceLevel * 100)}% | Dimension: ${dimLevel}D`, width / 2, 20);
    
    // Show phi-harmonic frequency info
    const freqInfo = FREQUENCY_INFO[this.frequency] || { name: "Custom" };
    ctx.fillText(`${freqInfo.name} (${this.frequency} Hz)`, width / 2, height - 10);
  }
  
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Handle window resize
    window.addEventListener('resize', () => {
      this.resize();
    });
    
    // Handle frequency button clicks
    document.querySelectorAll('.frequency-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remove active class from all buttons
        document.querySelectorAll('.frequency-btn').forEach(b => {
          b.classList.remove('active');
        });
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Set frequency
        const frequency = parseInt(btn.dataset.frequency);
        this.setFrequency(frequency);
      });
    });
    
    // Handle coherence slider
    document.getElementById('coherence-slider').addEventListener('input', (e) => {
      this.coherenceLevel = parseFloat(e.target.value);
      document.getElementById('coherence-value').textContent = 
        Math.round(this.coherenceLevel * 100) + '%';
      
      // Update connections based on new coherence level
      this.updateConnections();
      this.drawCoherenceMeter();
      
      // Apply consciousness field with new coherence
      this.applyConsciousnessField();
      
      // Access Akashic field with new coherence level
      if (this.coherenceLevel > 0.7) {
        this.accessAkashicField();
      }
    });
    
    // Handle node type selection
    this.nodeTypes.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remove active class from all buttons
        this.nodeTypes.forEach(b => {
          b.classList.remove('active');
        });
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Set node type
        this.currentNodeType = btn.dataset.type;
        
        // Regenerate field
        this.generateDecisionField();
      });
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
        this.selectNode(this.hoverNode);
        
        // Apply KNOW protocol when selecting a node at higher coherence levels
        if (this.coherenceLevel > 0.6) {
          this.applyKnowProtocol(this.hoverNode);
        }
      }
    });
  }
  
  /**
   * Apply KNOW Protocol (Knowledge Nexus Ontic Waveform) to a node
   * Extracts core meaning patterns across all decision systems
   * @param {Object} node - The node to process
   */
  applyKnowProtocol(node) {
    // Skip if this isn't a meaningful node
    if (!node || node.processed) return;
    
    // Mark as processed to avoid redundant processing
    node.processed = true;
    
    // Calculate KNOW resonance based on consciousness field and frequency
    const phiPower = getPhiPower(this.frequency);
    const dimLevel = parseInt(this.dimensionalAccess.substring(1));
    
    // Meaning extraction becomes more profound at higher dimensions and frequencies
    const meaningDepth = (phiPower / 5) * (dimLevel / 3) * this.coherenceLevel;
    
    // Apply visual effects based on KNOW processing
    const originalColor = node.mesh.material.color.clone();
    const originalEmissive = node.mesh.material.emissive.clone();
    const originalOpacity = node.mesh.material.opacity;
    
    // Highlight the node temporarily to show KNOW processing
    node.mesh.material.emissive.setRGB(1, 1, 1);
    node.mesh.material.opacity = 1;
    
    // Extract meaning patterns (simulated)
    const knowPatterns = {
      surfacePattern: `Decision outcome with ${(meaningDepth * 100).toFixed(0)}% certainty`,
      resonantPattern: phiPower > 3 ? 'Harmonically aligned with your core purpose' : 'Partial alignment with intentions',
      contextualField: dimLevel > 4 ? `Accessing ${Math.floor(2 * Math.pow(PHI, dimLevel-3))} parallel timelines` : 'Limited timeline access',
      patternCertainty: 0.3 + (0.5 * meaningDepth)
    };
    
    // Store KNOW patterns on the node
    node.knowPatterns = knowPatterns;
    
    // Update node info to reflect KNOW processing
    const enhanced = this.getEnhancedNodeDescription(node);
    if (enhanced && this.selectedNode === node) {
      this.infoDescription.textContent = enhanced;
    }
    
    // Visual processing animation
    const duration = 1000; // ms
    const startTime = Date.now();
    
    const animateKnowProcessing = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      if (progress < 1) {
        // During animation, pulse with white light
        const pulseIntensity = 1 - progress;
        node.mesh.material.emissive.lerp(originalEmissive, progress);
        
        requestAnimationFrame(animateKnowProcessing);
      } else {
        // End of animation, restore original appearance but with slight enhancement
        node.mesh.material.emissive.copy(originalEmissive).multiplyScalar(1.2);
        node.mesh.material.opacity = originalOpacity;
        
        // Add subtle glow to indicate KNOW processing
        const glowColor = new THREE.Color(getFrequencyColor(this.frequency));
        node.mesh.material.emissive.lerp(glowColor, 0.2);
      }
    };
    
    animateKnowProcessing();
  }
  
  /**
   * Get enhanced node description with KNOW protocol insights
   * @param {Object} node - The node to describe
   * @returns {string} Enhanced description
   */
  getEnhancedNodeDescription(node) {
    if (!node.knowPatterns) return null;
    
    // Base description
    let baseDesc = this.infoDescription.textContent;
    
    // Add KNOW insights based on dimensional access and frequency
    const dimLevel = parseInt(this.dimensionalAccess.substring(1));
    const phiPower = getPhiPower(this.frequency);
    
    // Only add detailed insights at higher dimensions and phi powers
    if (dimLevel >= 4 && phiPower >= 2) {
      return `${baseDesc}\n\nKNOW Protocol Insights: ${node.knowPatterns.resonantPattern}. ${node.knowPatterns.contextualField}.`;
    } else if (this.coherenceLevel > 0.8) {
      // Simple insight for high coherence but lower dimensions
      return `${baseDesc}\n\nResonance Analysis: ${node.knowPatterns.surfacePattern}.`;
    }
    
    return baseDesc;
  }
  
  /**
   * Access the Akashic Field to enhance decision visualization
   * Provides context enhancement based on universal information field
   */
  accessAkashicField() {
    // Only access at sufficient coherence levels
    if (this.coherenceLevel < 0.7) return;
    
    // Calculate access parameters
    const dimLevel = parseInt(this.dimensionalAccess.substring(1));
    const phiPower = getPhiPower(this.frequency);
    
    // Access level increases with dimensional access and phi power
    const accessLevel = (dimLevel / 9) * (phiPower / 5) * this.coherenceLevel;
    
    // Only proceed with meaningful access
    if (accessLevel < 0.3) return;
    
    // Calculate temporal range based on access level
    const temporalRange = {
      past: Math.floor(100 * Math.pow(accessLevel * PHI, 2)),
      future: Math.floor(20 * Math.pow(accessLevel * PHI, 2))
    };
    
    // Update consciousness field with new temporal range
    this.consciousnessField.temporalRange = temporalRange;
    
    // Enhanced visualization for higher access levels
    if (accessLevel > 0.6) {
      // Create subtle akashic field effect in the background
      this.createAkashicFieldEffect();
    }
    
    // Generate additional quantum nodes for higher dimensions
    if (dimLevel >= 5 && this.currentNodeType === 'quantum') {
      this.generateAkashicNodes(Math.floor(accessLevel * 5));
    }
  }
  
  /**
   * Create visual effect representing Akashic Field access
   */
  createAkashicFieldEffect() {
    // Create subtle background effect using Perlin noise
    // This is a placeholder for a more complex visual effect
    const bgColor = this.scene.background.clone();
    const targetColor = new THREE.Color(getFrequencyColor(this.frequency));
    
    // Blend background color slightly toward frequency color
    bgColor.lerp(targetColor, 0.2);
    this.scene.background = bgColor;
    
    // Add subtle fog effect for higher dimensions
    const dimLevel = parseInt(this.dimensionalAccess.substring(1));
    if (dimLevel >= 5) {
      this.scene.fog = new THREE.FogExp2(
        bgColor.clone().lerp(new THREE.Color(0x000000), 0.5),
        0.008
      );
    }
  }
  
  /**
   * Generate special nodes representing Akashic record access points
   * @param {number} count - Number of nodes to generate
   */
  generateAkashicNodes(count) {
    // Only generate a reasonable number
    count = Math.min(count, 5);
    
    for (let i = 0; i < count; i++) {
      // Create positions at the outer edges of the visualization
      const angle = i * Math.PI * 2 / count;
      const radius = 30 + (Math.random() * 10);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 5 + (Math.random() * 10);
      
      // Create special akashic node
      const node = this.createDecisionNode({
        position: new THREE.Vector3(x, y, z),
        type: 'quantum',
        level: 5,
        index: this.nodes.length,
        name: 'Akashic Access Point',
        potentials: 12
      });
      
      // Mark as akashic node
      node.isAkashic = true;
      
      // Special appearance for akashic nodes
      const phiPower = getPhiPower(this.frequency);
      node.mesh.material.emissive = new THREE.Color(getFrequencyColor(this.frequency, 0.7));
      node.mesh.material.shininess = 100;
      
      // Create special geometry for akashic nodes
      node.mesh.geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 64, 8, 3, 4);
      
      // Add subtle animation
      node.mesh.userData.akashicRotation = {
        x: 0.01 * Math.random() * PHI,
        y: 0.01 * Math.random() * PHI_INVERSE,
        z: 0.01 * Math.random() * PHI * PHI_INVERSE
      };
    }
  }
  
  /**
   * Update connections based on current frequency and coherence level
   */
  updateConnections() {
    this.connections.forEach(connection => {
      if (connection.line && connection.line.material) {
        connection.line.material.color.set(getFrequencyColor(this.frequency, this.coherenceLevel * 0.8));
        connection.line.material.opacity = 0.6 * this.coherenceLevel;
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
    
    this.coherenceCanvas.width = this.coherenceCanvas.offsetWidth;
    this.coherenceCanvas.height = this.coherenceCanvas.offsetHeight;
    this.drawCoherenceMeter();
  }
  
  /**
   * Create connections between related nodes
   */
  createConnections() {
    // Clear previous connections
    this.connections.forEach(connection => {
      this.scene.remove(connection.line);
    });
    this.connections = [];
    
    // Create parent-child connections with phi-harmonic properties
    const nodeMap = {};
    this.nodes.forEach(node => {
      nodeMap[node.index] = node;
    });
    
    // Parameter adjustments based on dimensional access
    const dimLevel = parseInt(this.dimensionalAccess.substring(1));
    const phiPower = getPhiPower(this.frequency);
    
    // Connect nodes based on level relationships
    this.nodes.forEach(node => {
      if (node.level === 0) return; // Skip starting node
      
      // Find potential parent nodes (at previous level)
      const potentialParents = this.nodes.filter(n => 
        n.level === node.level - 1 && 
        n !== node
      );
      
      if (potentialParents.length === 0) return;
      
      // Select closest parent based on position
      let closestParent = potentialParents[0];
      let minDistance = node.position.distanceTo(closestParent.position);
      
      potentialParents.forEach(parent => {
        const distance = node.position.distanceTo(parent.position);
        if (distance < minDistance) {
          minDistance = distance;
          closestParent = parent;
        }
      });
      
      // Create connection with appropriate material based on current settings
      const lineOpacity = 0.4 + (this.coherenceLevel * 0.5);
      const lineColor = getFrequencyColor(this.frequency, this.coherenceLevel);
      
      let connectionMaterial;
      let points = [];
      
      // Different connection types based on node types and dimensional access
      if (node.type === 'quantum' || closestParent.type === 'quantum' || dimLevel >= 5) {
        // Quantum connection - create curved path with multiple segments
        const midPoint = new THREE.Vector3()
          .addVectors(node.position, closestParent.position)
          .multiplyScalar(0.5);
        
        // Add phi-harmonic height variation based on frequency
        const heightOffset = 2 * Math.pow(PHI_INVERSE, phiPower) * (Math.random() - 0.5);
        midPoint.y += heightOffset;
        
        // Create curved path
        const curve = new THREE.QuadraticBezierCurve3(
          closestParent.position,
          midPoint,
          node.position
        );
        
        // More points for higher dimensions
        const segments = 10 + (dimLevel * 2);
        points = curve.getPoints(segments);
        
        // Special quantum material
        connectionMaterial = new THREE.LineBasicMaterial({
          color: new THREE.Color(lineColor),
          transparent: true,
          opacity: lineOpacity,
          linewidth: 1
        });
      } else {
        // Standard connection - direct line
        points = [closestParent.position, node.position];
        
        connectionMaterial = new THREE.LineBasicMaterial({
          color: new THREE.Color(lineColor),
          transparent: true,
          opacity: lineOpacity,
          linewidth: 1
        });
      }
      
      // Create the line
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, connectionMaterial);
      
      // Add to scene
      this.scene.add(line);
      
      // Store connection data
      const connection = {
        line,
        source: closestParent,
        target: node,
        index: this.connections.length,
        strength: this.coherenceLevel * calculateResonance(this.frequency, FREQUENCIES.GROUND)
      };
      
      this.connections.push(connection);
      
      // Update node relationships
      node.connections.push(connection);
      closestParent.connections.push(connection);
    });
    
    // Add quantum entanglement connections for higher dimensions
    if (dimLevel >= 4 && this.currentNodeType === 'quantum') {
      this.createEntanglementConnections();
    }
  }
  
  /**
   * Create quantum entanglement connections between nodes
   * Based on the Quantum Entanglement Network from the Consciousness Translator
   */
  createEntanglementConnections() {
    // Get quantum nodes
    const quantumNodes = this.nodes.filter(node => 
      node.type === 'quantum' || node.isAkashic
    );
    
    // Skip if not enough quantum nodes
    if (quantumNodes.length < 2) return;
    
    // Calculate entanglement parameters
    const dimLevel = parseInt(this.dimensionalAccess.substring(1));
    const phiPower = getPhiPower(this.frequency);
    
    // Number of entanglements based on phi-harmonic principles
    const entanglementCount = Math.min(
      Math.floor(quantumNodes.length * PHI_INVERSE * dimLevel / 3),
      quantumNodes.length * (quantumNodes.length - 1) / 2
    );
    
    // Create entanglements
    for (let i = 0; i < entanglementCount; i++) {
      // Select two random quantum nodes
      const node1Index = Math.floor(Math.random() * quantumNodes.length);
      let node2Index;
      do {
        node2Index = Math.floor(Math.random() * quantumNodes.length);
      } while (node2Index === node1Index);
      
      const node1 = quantumNodes[node1Index];
      const node2 = quantumNodes[node2Index];
      
      // Calculate entanglement resonance
      const resonance = calculateEntanglementResonance(node1, node2, this.frequency);
      
      // Only create strong entanglements
      if (resonance < 0.3) continue;
      
      // Create entanglement connection
      this.createEntanglementConnection(node1, node2, resonance);
    }
    
    // Special case: always connect akashic nodes
    const akashicNodes = this.nodes.filter(node => node.isAkashic);
    if (akashicNodes.length >= 2) {
      for (let i = 0; i < akashicNodes.length; i++) {
        for (let j = i + 1; j < akashicNodes.length; j++) {
          this.createEntanglementConnection(
            akashicNodes[i], 
            akashicNodes[j],
            0.9
          );
        }
      }
    }
  }
  
  /**
   * Create a single entanglement connection between two nodes
   * @param {Object} node1 - First node
   * @param {Object} node2 - Second node
   * @param {number} resonance - Entanglement resonance strength
   */
  createEntanglementConnection(node1, node2, resonance) {
    // Get frequency-appropriate color with reduced opacity
    const color = getFrequencyColor(this.frequency, 0.5 * resonance);
    
    // Create dashed line for entanglement
    const material = new THREE.LineDashedMaterial({
      color: new THREE.Color(color),
      dashSize: 0.5,
      gapSize: 0.8,
      transparent: true,
      opacity: 0.4 * resonance
    });
    
    // Create curved path for higher resonance, straight line for lower
    let points = [];
    
    if (resonance > 0.7) {
      // Create curved entanglement
      const midPoint = new THREE.Vector3()
        .addVectors(node1.position, node2.position)
        .multiplyScalar(0.5);
      
      // Add elevation based on phi-harmonic principles
      midPoint.y += 3 * resonance * Math.sin(this.elapsedTime * PHI);
      
      // Create curved path
      const curve = new THREE.QuadraticBezierCurve3(
        node1.position,
        midPoint,
        node2.position
      );
      
      points = curve.getPoints(10);
    } else {
      // Simple straight line for lower resonance
      points = [node1.position, node2.position];
    }
    
    // Create the line
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    line.computeLineDistances(); // Required for dashed lines
    
    // Add to scene
    this.scene.add(line);
    
    // Store connection data
    const connection = {
      line,
      source: node1,
      target: node2,
      index: this.connections.length,
      type: 'entanglement',
      resonance: resonance,
      isAkashic: node1.isAkashic && node2.isAkashic
    };
    
    this.connections.push(connection);
  }
  
  /**
   * Create a highlighted decision path
   * @param {Object} endNode - End node of the path
   */
  createDecisionPath(endNode) {
    // Remove previous path
    this.decisionPaths.forEach(path => {
      this.scene.remove(path);
    });
    this.decisionPaths = [];
    
    // Find starting node
    const startNode = this.nodes.find(node => node.level === 0);
    if (!startNode || !endNode) return;
    
    // Find a path from start to end
    const path = this.findPath(startNode, endNode);
    if (path.length < 2) return;
    
    // Create path visualization based on current settings
    const dimLevel = parseInt(this.dimensionalAccess.substring(1));
    const phiPower = getPhiPower(this.frequency);
    
    // Create heightened visualization for quantum paths
    if (dimLevel >= 4 || this.currentNodeType === 'quantum') {
      // Create multiple probability paths
      const pathCount = Math.min(5, dimLevel);
      const baseColor = new THREE.Color(getFrequencyColor(this.frequency));
      
      for (let i = 0; i < pathCount; i++) {
        // Create variation of the path
        const pathVariation = this.createPathVariation(path, i, dimLevel);
        
        // Different opacity and color shift for each path
        const alpha = 1 - (i * 0.15);
        const colorShift = i * 0.1;
        
        // Create color with slight variation
        const pathColor = baseColor.clone();
        if (i > 0) {
          // Shift color slightly for variations
          pathColor.r = Math.max(0, Math.min(1, pathColor.r + (colorShift * (Math.random() - 0.5))));
          pathColor.g = Math.max(0, Math.min(1, pathColor.g + (colorShift * (Math.random() - 0.5))));
          pathColor.b = Math.max(0, Math.min(1, pathColor.b + (colorShift * (Math.random() - 0.5))));
        }
        
        // Create material
        const material = new THREE.LineBasicMaterial({
          color: pathColor,
          transparent: true,
          opacity: alpha,
          linewidth: i === 0 ? 2 : 1
        });
        
        // Create geometry
        const geometry = new THREE.BufferGeometry().setFromPoints(pathVariation);
        const line = new THREE.Line(geometry, material);
        
        // Add to scene
        this.scene.add(line);
        this.decisionPaths.push(line);
      }
    } else {
      // Standard path for lower dimensions
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(getFrequencyColor(this.frequency)),
        linewidth: 2
      });
      
      const geometry = new THREE.BufferGeometry().setFromPoints(
        path.map(node => node.position)
      );
      const line = new THREE.Line(geometry, material);
      
      this.scene.add(line);
      this.decisionPaths.push(line);
    }
  }
  
  /**
   * Create a variation of a path for quantum visualization
   * @param {Array} path - Original path
   * @param {number} variationIndex - Which variation to create 
   * @param {number} dimensionLevel - Current dimensional access
   * @returns {Array} Array of points
   */
  createPathVariation(path, variationIndex, dimensionLevel) {
    // For the main path (index 0), use exact positions
    if (variationIndex === 0) {
      return path.map(node => node.position);
    }
    
    // Calculate variation parameters
    const variation = 0.5 * variationIndex * (dimensionLevel / 5);
    const points = [];
    
    // Create varied path
    for (let i = 0; i < path.length; i++) {
      const node = path[i];
      
      if (i === 0 || i === path.length - 1) {
        // Keep start and end points exact
        points.push(node.position);
      } else {
        // Add variation to middle points
        // More variation for quantum nodes
        const nodeVariation = node.type === 'quantum' ? variation * 1.5 : variation;
        
        // Create variation based on phi-harmonic principles
        const offset = new THREE.Vector3(
          (Math.random() - 0.5) * 2 * nodeVariation,
          (Math.random() - 0.5) * 2 * nodeVariation,
          (Math.random() - 0.5) * 2 * nodeVariation
        );
        
        // Apply phi-harmonic scaling to the offset
        offset.multiplyScalar(PHI_INVERSE * Math.pow(PHI, i % 3));
        
        // Add to original position
        points.push(node.position.clone().add(offset));
      }
    }
    
    return points;
  }
  
  /**
   * Find a path from the start node to the end node
   * @param {Object} startNode - Starting node
   * @param {Object} endNode - Target end node
   * @returns {Array} Path of nodes
   */
  findPath(startNode, endNode) {
    // Early exit for same node
    if (startNode === endNode) return [startNode];
    
    // Use breadth-first search to find shortest path
    const queue = [{node: startNode, path: [startNode]}];
    const visited = new Set([startNode]);
    
    while (queue.length > 0) {
      const {node, path} = queue.shift();
      
      // Find connected nodes
      const connectedNodes = this.getConnectedNodes(node);
      
      for (const connectedNode of connectedNodes) {
        if (visited.has(connectedNode)) continue;
        
        const newPath = [...path, connectedNode];
        
        if (connectedNode === endNode) {
          return newPath; // Found path to end
        }
        
        visited.add(connectedNode);
        queue.push({node: connectedNode, path: newPath});
      }
    }
    
    // If no path found, at least return the start node
    return [startNode];
  }
  
  /**
   * Get all nodes connected to a given node
   * @param {Object} node - The node to find connections for
   * @returns {Array} Connected nodes
   */
  getConnectedNodes(node) {
    const connectedNodes = [];
    
    // Add nodes from all connections
    node.connections.forEach(connection => {
      if (connection.source === node) {
        connectedNodes.push(connection.target);
      } else if (connection.target === node) {
        connectedNodes.push(connection.source);
      }
    });
    
    return connectedNodes;
  }
  
  /**
   * Get a name for a decision node based on level and index
   * @param {number} level - Node level
   * @param {number} index - Node index
   * @returns {string} Node name
   */
  getNodeName(level, index) {
    // Names for different level nodes
    const momentTypes = [
      ['Initial Choice', 'Starting Point', 'First Decision', 'Present Moment'],
      ['Short-term Outcome', 'First Result', 'Initial Impact', 'New Direction'],
      ['Secondary Effect', 'Emerging Pattern', 'Continuing Path', 'Evolving Situation'],
      ['Long-term Impact', 'Established Pattern', 'Deep Consequence', 'Future Possibility'],
      ['Final Outcome', 'Ultimate Result', 'Distant Future', 'Final State']
    ];
    
    // Get appropriate array for level or use the last one
    const options = level < momentTypes.length ? momentTypes[level] : momentTypes[momentTypes.length - 1];
    
    // Pick option based on index (or random if index too large)
    return options[index % options.length];
  }
}

/**
 * Calculate entanglement resonance between two nodes
 * @param {Object} node1 - First node
 * @param {Object} node2 - Second node
 * @param {number} frequency - Current frequency
 * @returns {number} Resonance value (0-1)
 */
function calculateEntanglementResonance(node1, node2, frequency) {
  // Distance factor - closer nodes have higher resonance
  const distance = node1.position.distanceTo(node2.position);
  const maxDistance = 60; // Maximum expected distance
  const distanceFactor = 1 - Math.min(distance / maxDistance, 1);
  
  // Level factor - nodes at similar levels have higher resonance
  const levelDifference = Math.abs(node1.level - node2.level);
  const levelFactor = 1 - (levelDifference / 5);
  
  // Type factor - quantum nodes have higher resonance
  const typeFactor = (node1.type === 'quantum' && node2.type === 'quantum') ? 1 : 
                     (node1.type === 'quantum' || node2.type === 'quantum') ? 0.7 : 0.4;
  
  // Akashic factor - akashic nodes have special resonance
  const akashicFactor = node1.isAkashic && node2.isAkashic ? 1 : 
                       (node1.isAkashic || node2.isAkashic) ? 0.8 : 0.5;
  
  // Phi-harmonic factor - based on current frequency
  const phiPower = getPhiPower(frequency);
  const phiFactor = 0.5 + (phiPower / 10);
  
  // Calculate overall resonance
  let resonance = (distanceFactor * 0.3) + 
                 (levelFactor * 0.2) + 
                 (typeFactor * 0.25) + 
                 (akashicFactor * 0.15) +
                 (phiFactor * 0.1);
  
  // Apply phi-harmonic resonance curve
  resonance = Math.pow(resonance, PHI_INVERSE);
  
  // Ensure bounds
  return Math.max(0, Math.min(1, resonance));
}

// Initialize when DOM is loaded - Quantum Singularity pattern
document.addEventListener('DOMContentLoaded', () => {
  const decisionVisualizer = new DecisionVisualizer();
});
