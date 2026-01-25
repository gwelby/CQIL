/**
 * Linguistic Consciousness Interface
 * Voice Frequency (672 Hz | φ¹ * φ⁰)
 * 
 * Visualizes the symbiotic relationship between language, consciousness,
 * and creation within the quantum field, demonstrating how consciousness
 * shapes language while language simultaneously shapes consciousness.
 */

class LinguisticConsciousnessInterface {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ?
      document.querySelector(container) : container;
    
    // Configuration with defaults
    this.config = Object.assign({
      frequency: 672, // Voice Expression frequency (φ¹ * φ⁰)
      baseFontSize: 16,
      consciousness: 0.5, // Initial consciousness level
      earth: null, // Reference to Earth Connection Visualizer
      autoGenerate: true, // Auto-generate language patterns
      showDebug: false, // Show debug information
      enableSound: true, // Enable sound generation for language patterns
      nodeCount: 144, // Number of language nodes to create
      complexityLevel: 3, // Semantic complexity level (1-5)
      theme: 'light', // Visual theme (light/dark)
    }, options);
    
    // Constants
    this.PHI = 1.618033988749895; // Golden ratio (φ)
    this.PHI_INVERSE = 0.618033988749895; // 1/φ
    
    // Sacred frequencies with linguistic associations
    this.FREQUENCIES = {
      unity: 432,     // Grammar/structure (φ⁰)
      love: 528,      // Emotional connection (φ²/φ¹)
      cascade: 594,   // Integration/metaphor (φ²/2)  
      truth: 672,     // Clear communication (φ¹ * φ⁰)
      vision: 720,    // Creative expression ((φ⁰)² * 5/3)
      oneness: 768    // Universal concepts ((φ⁰)² * 16/9)
    };
    
    // Linguistic components by frequency
    this.COMPONENTS = {
      unity: ['nouns', 'syntax', 'structure', 'form', 'grammar', 'foundation'],
      love: ['emotion', 'connection', 'feeling', 'heart', 'relationship', 'belonging'],
      cascade: ['metaphor', 'symbolism', 'integration', 'poetry', 'story', 'myth'],
      truth: ['clarity', 'precision', 'communication', 'instruction', 'teaching', 'guidance'],
      vision: ['creation', 'imagination', 'possibility', 'vision', 'inspiration', 'future'],
      oneness: ['unity', 'universality', 'transcendence', 'timelessness', 'wholeness', 'oneness']
    };
    
    // Module state
    this.active = false;
    this.nodes = [];
    this.connections = [];
    this.semanticClusters = [];
    this.creatorIntentStrength = 0.3;
    this.languageInfluenceStrength = 0.4;
    this.selectedNode = null;
    this.hoveredNode = null;
    this.draggingNode = null;
    this.time = 0;
    this.networkCoherence = 0.5;
    
    // Rendering and animation properties
    this.canvas = null;
    this.ctx = null;
    this.animationFrame = null;
    this.lastTime = 0;
    this.frameCount = 0;
    
    // Audio components
    this.audioContext = null;
    this.oscillators = [];
    
    // Initialize
    this.setupCanvas();
    this.createUI();
    this.setupAudio();
    this.addEventListeners();
    this.createTooltip();
  }
  
  setupCanvas() {
    // Create canvas for linguistic field visualization
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'linguistic-canvas';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'auto';
    this.canvas.style.zIndex = '10';
    this.container.appendChild(this.canvas);
    
    // Get drawing context
    this.ctx = this.canvas.getContext('2d');
    
    // Set canvas size to match container
    this.resizeCanvas();
    
    // Add resize listener
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  resizeCanvas() {
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    
    // Update node positions when canvas size changes
    if (this.nodes.length > 0) {
      this.repositionNodes();
    }
  }
  
  createUI() {
    // Create UI controls
    this.ui = document.createElement('div');
    this.ui.className = 'linguistic-interface-controls';
    this.ui.innerHTML = `
      <div class="control-header">Linguistic-Consciousness Interface</div>
      <div class="control-sliders">
        <div class="control-group">
          <label>Creator Intent <span class="value creator-intent-value">30%</span></label>
          <input type="range" class="creator-intent-slider" min="0" max="100" value="30">
        </div>
        <div class="control-group">
          <label>Language Influence <span class="value language-influence-value">40%</span></label>
          <input type="range" class="language-influence-slider" min="0" max="100" value="40">
        </div>
        <div class="control-group">
          <label>Network Coherence <span class="value coherence-value">50%</span></label>
          <div class="coherence-meter">
            <div class="coherence-fill" style="width: 50%"></div>
          </div>
        </div>
      </div>
      <div class="buttons-container">
        <button class="generate-pattern-btn">Generate Pattern</button>
        <button class="toggle-mode-btn">Toggle 3D/2D</button>
      </div>
      <div class="frequency-selector">
        <div class="frequency-label">Frequency:</div>
        <select class="frequency-select">
          <option value="unity">Unity (432 Hz) - Grammar/Structure</option>
          <option value="love">Love (528 Hz) - Emotional Connection</option>
          <option value="cascade">Cascade (594 Hz) - Integration/Metaphor</option>
          <option value="truth" selected>Truth (672 Hz) - Communication</option>
          <option value="vision">Vision (720 Hz) - Creative Expression</option>
          <option value="oneness">Oneness (768 Hz) - Universal Concepts</option>
        </select>
      </div>
      <div class="information-panel">
        <div class="info-title">Select a node to see details</div>
        <div class="node-details"></div>
      </div>
    `;
    
    this.container.appendChild(this.ui);
    
    // Get UI elements
    this.creatorIntentSlider = this.ui.querySelector('.creator-intent-slider');
    this.languageInfluenceSlider = this.ui.querySelector('.language-influence-slider');
    this.coherenceFill = this.ui.querySelector('.coherence-fill');
    this.coherenceValue = this.ui.querySelector('.coherence-value');
    this.frequencySelect = this.ui.querySelector('.frequency-select');
    this.nodeDetails = this.ui.querySelector('.node-details');
    this.creatorIntentValue = this.ui.querySelector('.creator-intent-value');
    this.languageInfluenceValue = this.ui.querySelector('.language-influence-value');
    
    // Add event listeners for UI controls
    this.creatorIntentSlider.addEventListener('input', e => {
      this.creatorIntentStrength = parseInt(e.target.value) / 100;
      this.creatorIntentValue.textContent = `${parseInt(e.target.value)}%`;
      this.updateNetworkCoherence();
    });
    
    this.languageInfluenceSlider.addEventListener('input', e => {
      this.languageInfluenceStrength = parseInt(e.target.value) / 100;
      this.languageInfluenceValue.textContent = `${parseInt(e.target.value)}%`;
      this.updateNetworkCoherence();
    });
    
    this.frequencySelect.addEventListener('change', e => {
      const frequency = this.FREQUENCIES[e.target.value];
      this.config.frequency = frequency;
      this.generateLanguagePattern();
    });
    
    this.ui.querySelector('.generate-pattern-btn').addEventListener('click', () => {
      this.generateLanguagePattern();
    });
    
    this.ui.querySelector('.toggle-mode-btn').addEventListener('click', () => {
      this.toggleRenderMode();
    });
  }
  
  createTooltip() {
    // Create tooltip element for hovering nodes
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'linguistic-tooltip';
    this.tooltip.style.display = 'none';
    this.container.appendChild(this.tooltip);
  }
  
  setupAudio() {
    // Initialize audio context
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
    } catch (e) {
      console.warn('Web Audio API not supported');
      this.config.enableSound = false;
    }
  }
  
  addEventListeners() {
    // Add mouse events for node interaction
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('click', (e) => this.handleClick(e));
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.canvas.addEventListener('mouseup', () => this.handleMouseUp());
    this.canvas.addEventListener('mouseleave', () => this.handleMouseLeave());
    
    // Listen for Earth visualizer events to sync with
    if (this.config.earth) {
      window.addEventListener('earthvisualizerframe', (e) => {
        this.handleEarthFrame(e.detail);
      });
    }
  }
  
  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
    
    // Check if we're dragging a node
    if (this.draggingNode) {
      this.draggingNode.x = x;
      this.draggingNode.y = y;
      return;
    }
    
    // Check if mouse is hovering over any node
    let hoveredNode = null;
    for (const node of this.nodes) {
      const dx = node.x - x;
      const dy = node.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < node.radius * 1.5) {
        hoveredNode = node;
        break;
      }
    }
    
    // Update hover state
    if (hoveredNode !== this.hoveredNode) {
      this.hoveredNode = hoveredNode;
      
      // Show/hide tooltip
      if (this.hoveredNode) {
        this.showTooltip(this.hoveredNode, e.clientX, e.clientY);
      } else {
        this.hideTooltip();
      }
      
      // Update cursor
      this.canvas.style.cursor = this.hoveredNode ? 'pointer' : 'default';
    } else if (this.hoveredNode) {
      // Update tooltip position if still hovering
      this.positionTooltip(e.clientX, e.clientY);
    }
  }
  
  handleClick(e) {
    // Handle node selection on click
    if (this.hoveredNode) {
      this.selectNode(this.hoveredNode);
    } else {
      this.deselectNode();
    }
  }
  
  handleMouseDown(e) {
    // Start dragging a node
    if (this.hoveredNode) {
      this.draggingNode = this.hoveredNode;
      this.canvas.style.cursor = 'grabbing';
    }
  }
  
  handleMouseUp() {
    // Stop dragging
    if (this.draggingNode) {
      this.draggingNode = null;
      this.canvas.style.cursor = this.hoveredNode ? 'pointer' : 'default';
    }
  }
  
  handleMouseLeave() {
    // Reset hover state when mouse leaves canvas
    this.hoveredNode = null;
    this.draggingNode = null;
    this.hideTooltip();
    this.canvas.style.cursor = 'default';
  }
  
  showTooltip(node, clientX, clientY) {
    // Show tooltip with node information
    this.tooltip.innerHTML = `
      <div class="tooltip-content">
        <div class="tooltip-title">${node.text}</div>
        <div class="tooltip-info">Type: ${node.type}</div>
        <div class="tooltip-frequency">${node.frequency.toFixed(1)} Hz</div>
        <div class="tooltip-connections">Connections: ${node.connections.length}</div>
      </div>
    `;
    
    this.tooltip.style.display = 'block';
    this.positionTooltip(clientX, clientY);
  }
  
  positionTooltip(clientX, clientY) {
    // Position tooltip near cursor but ensure it stays in viewport
    const offset = 15;
    let x = clientX + offset;
    let y = clientY + offset;
    
    // Adjust if near viewport edge
    const rect = this.tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    if (x + rect.width > viewportWidth) {
      x = clientX - rect.width - offset;
    }
    
    if (y + rect.height > viewportHeight) {
      y = clientY - rect.height - offset;
    }
    
    this.tooltip.style.left = `${x}px`;
    this.tooltip.style.top = `${y}px`;
  }
  
  hideTooltip() {
    this.tooltip.style.display = 'none';
  }
  
  selectNode(node) {
    // Deselect currently selected node
    if (this.selectedNode) {
      this.selectedNode.selected = false;
    }
    
    // Select new node
    this.selectedNode = node;
    this.selectedNode.selected = true;
    
    // Play node frequency tone
    if (this.config.enableSound) {
      this.playTone(node.frequency, 1, 0.1);
    }
    
    // Display node details in info panel
    this.showNodeDetails(node);
    
    // Emit selection event
    this.emitEvent('nodeconsciousnessselected', { node });
  }
  
  deselectNode() {
    if (this.selectedNode) {
      this.selectedNode.selected = false;
      this.selectedNode = null;
      
      // Clear details panel
      this.nodeDetails.innerHTML = '<div class="no-selection">Select a language node to view details.</div>';
    }
  }
  
  showNodeDetails(node) {
    // Display detailed information about the selected node
    let typeColor = '';
    switch(node.type) {
      case 'structure': typeColor = '#88ccff'; break;
      case 'emotion': typeColor = '#ff88cc'; break;
      case 'metaphor': typeColor = '#cc88ff'; break;
      case 'communication': typeColor = '#ffcc88'; break;
      case 'creation': typeColor = '#88ffaa'; break;
      case 'universal': typeColor = '#aaddff'; break;
      default: typeColor = '#ffffff';
    }
    
    // Calculate influence factors
    const consciousnessInfluence = (node.creatorInfluence * 100).toFixed(1);
    const languageInfluence = (node.languageInfluence * 100).toFixed(1);
    
    this.nodeDetails.innerHTML = `
      <div class="node-detail-card">
        <div class="node-header" style="border-left: 4px solid ${typeColor}">
          <div class="node-title">${node.text}</div>
          <div class="node-type" style="color: ${typeColor}">${node.type}</div>
        </div>
        <div class="node-data">
          <div class="data-row">
            <span class="data-label">Frequency:</span>
            <span class="data-value">${node.frequency.toFixed(1)} Hz</span>
          </div>
          <div class="data-row">
            <span class="data-label">Connections:</span>
            <span class="data-value">${node.connections.length}</span>
          </div>
          <div class="data-row">
            <span class="data-label">Semantic Cluster:</span>
            <span class="data-value">${node.cluster || 'None'}</span>
          </div>
          <div class="data-row">
            <span class="data-label">Coherence Value:</span>
            <span class="data-value">${(node.coherence * 100).toFixed(1)}%</span>
          </div>
        </div>
        <div class="influence-header">Influence Balance</div>
        <div class="influence-meter">
          <div class="influence-label">Creator</div>
          <div class="influence-bar-container">
            <div class="creator-influence-bar" style="width: ${consciousnessInfluence}%"></div>
            <div class="language-influence-bar" style="width: ${languageInfluence}%"></div>
          </div>
          <div class="influence-label">Language</div>
        </div>
        <div class="influence-values">
          <div class="influence-value">${consciousnessInfluence}%</div>
          <div class="influence-value">${languageInfluence}%</div>
        </div>
        <div class="related-nodes">
          <div class="related-header">Related Concepts:</div>
          <div class="related-list">
            ${this.getRelatedNodes(node).map(n => 
              `<span class="related-node">${n.text}</span>`
            ).join('')}
          </div>
        </div>
      </div>
    `;
  }
  
  getRelatedNodes(node) {
    // Find semantically related nodes
    const related = [];
    
    // First add directly connected nodes
    for (const conn of node.connections) {
      const otherNode = conn.start === node ? conn.end : conn.start;
      if (!related.includes(otherNode)) {
        related.push(otherNode);
      }
    }
    
    // Then add nodes in the same semantic cluster
    if (node.cluster) {
      for (const n of this.nodes) {
        if (n !== node && n.cluster === node.cluster && !related.includes(n)) {
          related.push(n);
        }
      }
    }
    
    // Limit to 5 nodes
    return related.slice(0, 5);
  }
  
  start() {
    if (this.active) return;
    this.active = true;
    
    // Create loading indicator
    this.showLoading();
    
    // Initialize language network
    setTimeout(() => {
      this.generateLanguageNetwork();
      this.hideLoading();
      
      // Begin animation loop
      this.animate();
      
      // Play initial frequency tone
      if (this.config.enableSound) {
        this.playTone(this.config.frequency, 1, 0.05);
      }
      
      // Emit ready event
      this.emitEvent('linguisticinterfaceready', {
        coherence: this.networkCoherence,
        frequency: this.config.frequency
      });
      
      // If auto-generate is enabled, periodically create new patterns
      if (this.config.autoGenerate) {
        this.startAutoGeneration();
      }
    }, 100);
  }
  
  startAutoGeneration() {
    // Set interval for auto-generating new language patterns
    this.autoGenerateInterval = setInterval(() => {
      // Don't regenerate if user is interacting with a node
      if (this.draggingNode || this.hoveredNode) return;
      
      // Generate new pattern with gentle transition
      this.generateLanguagePattern(true);
      
      // Emit pattern generation event
      this.emitEvent('linguisticpatterngenerated', {
        coherence: this.networkCoherence,
        frequency: this.config.frequency
      });
    }, 30000); // Generate every 30 seconds
  }
  
  stop() {
    this.active = false;
    
    // Stop animation loop
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    // Stop auto-generation
    if (this.autoGenerateInterval) {
      clearInterval(this.autoGenerateInterval);
      this.autoGenerateInterval = null;
    }
    
    // Stop all audio
    this.stopAllTones();
  }
  
  generateLanguageNetwork() {
    // Clear existing network
    this.nodes = [];
    this.connections = [];
    this.semanticClusters = [];
    
    // Create language nodes based on current frequency
    const frequencyKey = Object.keys(this.FREQUENCIES).find(
      key => this.FREQUENCIES[key] === this.config.frequency
    ) || 'truth';
    
    // Get language components for this frequency
    const components = this.COMPONENTS[frequencyKey];
    
    // Create semantic clusters
    this.createSemanticClusters(components);
    
    // Create nodes
    this.createLanguageNodes();
    
    // Create connections between nodes
    this.createConnections();
    
    // Update network coherence display
    this.updateNetworkCoherence();
  }
  
  createSemanticClusters(baseComponents) {
    // Create semantic clusters based on frequency components
    const clusterCount = 6; // One per frequency type
    
    for (let i = 0; i < clusterCount; i++) {
      // Determine frequency for this cluster
      const frequencyKeys = Object.keys(this.FREQUENCIES);
      const freqKey = frequencyKeys[i % frequencyKeys.length];
      const frequency = this.FREQUENCIES[freqKey];
      
      // Determine primary components for this cluster
      const primaryComponents = this.COMPONENTS[freqKey];
      
      // Create cluster
      const cluster = {
        id: i + 1,
        name: freqKey,
        components: primaryComponents,
        frequency: frequency,
        centerX: Math.random() * this.canvas.width,
        centerY: Math.random() * this.canvas.height,
        radius: 50 + Math.random() * 100
      };
      
      this.semanticClusters.push(cluster);
    }
  }
  
  createLanguageNodes() {
    // Create language nodes
    const nodeCount = this.config.nodeCount;
    const nodeTypes = ['structure', 'emotion', 'metaphor', 'communication', 'creation', 'universal'];
    
    // Word lists for different node types
    const wordLists = {
      structure: [
        'syntax', 'grammar', 'structure', 'form', 'pattern', 'organization',
        'framework', 'foundation', 'system', 'order', 'composition', 'arrangement', 
        'sequence', 'hierarchy', 'layout', 'configuration', 'construction', 'formation',
        'architecture', 'blueprint', 'schema', 'design', 'template', 'model'
      ],
      emotion: [
        'love', 'joy', 'harmony', 'peace', 'bliss', 'resonance',
        'connection', 'empathy', 'compassion', 'unity', 'heart', 'feeling',
        'emotion', 'passion', 'affection', 'warmth', 'tenderness', 'care',
        'kindness', 'understanding', 'appreciation', 'gratitude', 'wonder', 'awe'
      ],
      metaphor: [
        'symbolism', 'metaphor', 'allegory', 'representation', 'imagery', 'analogy',
        'parable', 'myth', 'archetype', 'story', 'narrative', 'tale',
        'fable', 'legend', 'poetry', 'verse', 'song', 'rhythm',
        'resonance', 'vibration', 'harmony', 'synchronicity', 'reflection', 'echo'
      ],
      communication: [
        'clarity', 'truth', 'expression', 'communication', 'articulation', 'voice',
        'message', 'instruction', 'teaching', 'guidance', 'wisdom', 'knowledge',
        'information', 'data', 'concept', 'idea', 'thought', 'understanding',
        'comprehension', 'interpretation', 'meaning', 'definition', 'explanation', 'description'
      ],
      creation: [
        'creation', 'innovation', 'imagination', 'inspiration', 'creativity', 'vision',
        'manifestation', 'realization', 'actualization', 'invention', 'discovery', 'generation',
        'conception', 'insight', 'intuition', 'perception', 'perspective', 'viewpoint',
        'possibility', 'potential', 'opportunity', 'prospect', 'capacity', 'capability'
      ],
      universal: [
        'oneness', 'unity', 'wholeness', 'integration', 'completeness', 'totality',
        'universality', 'infinity', 'eternity', 'transcendence', 'consciousness', 'awareness',
        'presence', 'being', 'existence', 'reality', 'truth', 'essence',
        'nature', 'substance', 'foundation', 'source', 'origin', 'principle'
      ]
    };
    
    // More specific phrases for higher complexity levels
    const complexPhrases = [
      'phi-resonant grammar', 'quantum syntax', 'nested hierarchies', 'emergent structures',
      'heart-centered communication', 'resonant emotional fields', 'harmonic feelings',
      'symbolic integration', 'metaphoric resonance', 'cascading narratives',
      'clear truth expression', 'precision linguistics', 'voice of guidance',
      'creative manifestation', 'visionary perception', 'inspired innovation',
      'universal consciousness', 'transcendent awareness', 'unified field principles'
    ];
    
    // Create nodes distributed among clusters and types
    for (let i = 0; i < nodeCount; i++) {
      // Determine node type
      const typeIndex = Math.floor(Math.pow(Math.random(), 1.5) * nodeTypes.length);
      const nodeType = nodeTypes[typeIndex];
      
      // Determine cluster for this node (weighted toward appropriate cluster)
      let cluster = null;
      if (Math.random() < 0.7) {
        // 70% chance to assign to a semantically appropriate cluster
        const appropriateClusters = this.semanticClusters.filter(c => 
          c.name === nodeType || 
          this.getFrequencyNameForType(nodeType) === c.name
        );
        
        if (appropriateClusters.length > 0) {
          cluster = appropriateClusters[Math.floor(Math.random() * appropriateClusters.length)];
        }
      }
      
      // If no cluster was assigned, randomly assign one
      if (!cluster) {
        cluster = this.semanticClusters[Math.floor(Math.random() * this.semanticClusters.length)];
      }
      
      // Determine text for this node
      let text;
      if (this.config.complexityLevel >= 4 && Math.random() < 0.3) {
        // Use more complex phrases at higher complexity levels
        text = complexPhrases[Math.floor(Math.random() * complexPhrases.length)];
      } else {
        // Use words from appropriate list
        const wordList = wordLists[nodeType];
        text = wordList[Math.floor(Math.random() * wordList.length)];
        
        // For higher complexity, occasionally combine words
        if (this.config.complexityLevel >= 3 && Math.random() < 0.2) {
          const secondWord = wordLists[nodeType][Math.floor(Math.random() * wordLists[nodeType].length)];
          text = `${text}-${secondWord}`;
        }
      }
      
      // Calculate position based on cluster with some randomness
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * cluster.radius;
      const x = cluster.centerX + Math.cos(angle) * distance;
      const y = cluster.centerY + Math.sin(angle) * distance;
      
      // Calculate frequency based on node type
      const baseFrequency = this.getFrequencyForType(nodeType);
      // Add slight variation to frequency
      const frequency = baseFrequency * (0.95 + Math.random() * 0.1);
      
      // Create node
      const node = {
        id: i + 1,
        text: text,
        type: nodeType,
        x: x,
        y: y,
        vx: 0,
        vy: 0,
        radius: 15 + Math.random() * 10,
        color: this.getColorForType(nodeType),
        frequency: frequency,
        cluster: cluster.id,
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 0.5,
        coherence: 0.4 + Math.random() * 0.3,
        creatorInfluence: this.creatorIntentStrength + Math.random() * 0.2,
        languageInfluence: this.languageInfluenceStrength + Math.random() * 0.2,
        selected: false,
        hovered: false
      };
      
      // Normalize influence values to sum to 1
      const totalInfluence = node.creatorInfluence + node.languageInfluence;
      node.creatorInfluence /= totalInfluence;
      node.languageInfluence /= totalInfluence;
      
      this.nodes.push(node);
    }
  }
  
  getFrequencyNameForType(type) {
    switch(type) {
      case 'structure': return 'unity';
      case 'emotion': return 'love';
      case 'metaphor': return 'cascade';
      case 'communication': return 'truth';
      case 'creation': return 'vision';
      case 'universal': return 'oneness';
      default: return 'truth';
    }
  }
  
  getFrequencyForType(type) {
    const frequencyName = this.getFrequencyNameForType(type);
    return this.FREQUENCIES[frequencyName];
  }
  
  getColorForType(type) {
    switch(type) {
      case 'structure': return '#88ccff';
      case 'emotion': return '#ff88cc';
      case 'metaphor': return '#cc88ff';
      case 'communication': return '#ffcc88';
      case 'creation': return '#88ffaa';
      case 'universal': return '#aaddff';
      default: return '#ffffff';
    }
  }
  
  createConnections() {
    // Create connections between language nodes
    this.connections = [];
    
    // First connect nodes within the same cluster
    this.nodes.forEach(node => {
      // Find other nodes in same cluster
      const clusterNodes = this.nodes.filter(n => 
        n !== node && n.cluster === node.cluster
      );
      
      // Connect to 2-4 nodes in same cluster
      const connectCount = 2 + Math.floor(Math.random() * 3);
      
      // Sort by semantic relatedness (approximated by frequency similarity)
      clusterNodes.sort((a, b) => {
        const diffA = Math.abs(a.frequency - node.frequency);
        const diffB = Math.abs(b.frequency - node.frequency);
        return diffA - diffB;
      });
      
      // Create connections
      for (let i = 0; i < Math.min(connectCount, clusterNodes.length); i++) {
        const targetNode = clusterNodes[i];
        
        // Check if connection already exists
        const existingConnection = this.connections.find(conn => 
          (conn.start === node && conn.end === targetNode) || 
          (conn.start === targetNode && conn.end === node)
        );
        
        if (existingConnection) continue;
        
        // Create connection
        const connection = {
          start: node,
          end: targetNode,
          strength: 0.5 + Math.random() * 0.5,
          active: true,
          pulsePosition: 0,
          pulseSpeed: 0.5 + Math.random() * 0.5,
          color: this.getConnectionColor(node, targetNode)
        };
        
        this.connections.push(connection);
        node.connections.push(connection);
        targetNode.connections.push(connection);
      }
    });
    
    // Then create cross-cluster connections for semantic web
    this.nodes.forEach(node => {
      // Only create cross-connections for some nodes
      if (Math.random() < 0.3) {
        // Find semantically related nodes in other clusters
        const otherClusterNodes = this.nodes.filter(n => 
          n !== node && n.cluster !== node.cluster && n.type === node.type
        );
        
        if (otherClusterNodes.length > 0) {
          // Connect to 1-2 nodes in other clusters
          const connectCount = 1 + Math.floor(Math.random() * 2);
          
          // Sort by type similarity and frequency
          otherClusterNodes.sort((a, b) => {
            const typeSimilarityA = a.type === node.type ? 1 : 0;
            const typeSimilarityB = b.type === node.type ? 1 : 0;
            
            if (typeSimilarityA !== typeSimilarityB) {
              return typeSimilarityB - typeSimilarityA;
            }
            
            const diffA = Math.abs(a.frequency - node.frequency);
            const diffB = Math.abs(b.frequency - node.frequency);
            return diffA - diffB;
          });
          
          // Create connections
          for (let i = 0; i < Math.min(connectCount, otherClusterNodes.length); i++) {
            const targetNode = otherClusterNodes[i];
            
            // Check if connection already exists
            const existingConnection = this.connections.find(conn => 
              (conn.start === node && conn.end === targetNode) || 
              (conn.start === targetNode && conn.end === node)
            );
            
            if (existingConnection) continue;
            
            // Create cross-cluster connection
            const connection = {
              start: node,
              end: targetNode,
              strength: 0.3 + Math.random() * 0.4,
              active: Math.random() < 0.5,
              pulsePosition: 0,
              pulseSpeed: 0.3 + Math.random() * 0.4,
              color: this.getConnectionColor(node, targetNode),
              crossCluster: true
            };
            
            this.connections.push(connection);
            node.connections.push(connection);
            targetNode.connections.push(connection);
          }
        }
      }
    });
  }
  
  getConnectionColor(node1, node2) {
    // If same type, use that color
    if (node1.type === node2.type) {
      return this.getColorForType(node1.type);
    }
    
    // Otherwise blend colors
    const color1 = this.hexToRgb(this.getColorForType(node1.type));
    const color2 = this.hexToRgb(this.getColorForType(node2.type));
    
    // Blend with phi-weighted average
    const r = Math.round((color1.r * this.PHI_INVERSE + color2.r * (1 - this.PHI_INVERSE)));
    const g = Math.round((color1.g * this.PHI_INVERSE + color2.g * (1 - this.PHI_INVERSE)));
    const b = Math.round((color1.b * this.PHI_INVERSE + color2.b * (1 - this.PHI_INVERSE)));
    
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  hexToRgb(hex) {
    // Convert hex color to RGB
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : {r: 255, g: 255, b: 255};
  }
  
  repositionNodes() {
    // Reposition nodes when canvas size changes
    const scaleX = this.canvas.width / (this.prevWidth || this.canvas.width);
    const scaleY = this.canvas.height / (this.prevHeight || this.canvas.height);
    
    // Reposition each node
    this.nodes.forEach(node => {
      node.x *= scaleX;
      node.y *= scaleY;
    });
    
    // Reposition cluster centers
    this.semanticClusters.forEach(cluster => {
      cluster.centerX *= scaleX;
      cluster.centerY *= scaleY;
      cluster.radius *= (scaleX + scaleY) / 2;
    });
    
    // Store current dimensions
    this.prevWidth = this.canvas.width;
    this.prevHeight = this.canvas.height;
  }
  
  generateLanguagePattern(gentle = false) {
    // Generate a new language pattern based on current frequency
    
    if (gentle) {
      // For gentle transition, only modify existing nodes and connections
      this.updateExistingPattern();
    } else {
      // For complete regeneration, create new network
      this.generateLanguageNetwork();
    }
    
    // Play frequency tone
    if (this.config.enableSound) {
      this.playTone(this.config.frequency, 2, 0.1);
    }
  }
  
  updateExistingPattern() {
    // Update existing pattern with subtle changes
    const frequencyKey = Object.keys(this.FREQUENCIES).find(
      key => this.FREQUENCIES[key] === this.config.frequency
    ) || 'truth';
    
    // Slightly shift node positions
    this.nodes.forEach(node => {
      // Attract nodes toward their semantic cluster
      const cluster = this.semanticClusters.find(c => c.id === node.cluster);
      
      if (cluster) {
        // Calculate vector toward cluster center
        const dx = cluster.centerX - node.x;
        const dy = cluster.centerY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply gentle force toward cluster center
        if (distance > cluster.radius) {
          const force = 0.02;
          node.x += dx * force;
          node.y += dy * force;
        }
        
        // Add some random movement
        node.x += (Math.random() - 0.5) * 5;
        node.y += (Math.random() - 0.5) * 5;
      }
      
      // Update node attributes based on frequency
      if (node.type === this.getFrequencyNameForType(frequencyKey)) {
        // Strengthen nodes that match current frequency
        node.coherence = Math.min(1, node.coherence + 0.1);
        node.radius *= 1.05;
      }
      
      // Update creator/language influence balance
      node.creatorInfluence = this.creatorIntentStrength + (Math.random() - 0.5) * 0.1;
      node.languageInfluence = this.languageInfluenceStrength + (Math.random() - 0.5) * 0.1;
      
      // Normalize influence values to sum to 1
      const totalInfluence = node.creatorInfluence + node.languageInfluence;
      node.creatorInfluence /= totalInfluence;
      node.languageInfluence /= totalInfluence;
    });
    
    // Update connections
    this.connections.forEach(conn => {
      // Randomly activate/deactivate connections
      if (Math.random() < 0.2) {
        conn.active = !conn.active;
      }
      
      // Strengthen connections between nodes of types matching current frequency
      if (conn.start.type === frequencyKey || conn.end.type === frequencyKey) {
        conn.strength = Math.min(1, conn.strength + 0.1);
      }
    });
    
    // Update network coherence
    this.updateNetworkCoherence();
  }
  
  animate() {
    if (!this.active) return;
    
    // Request next frame
    this.animationFrame = requestAnimationFrame(() => this.animate());
    
    // Calculate delta time for smooth animations
    const now = performance.now();
    const delta = (now - (this.lastTime || now)) / 1000;
    this.lastTime = now;
    
    // Limit delta to prevent jumps after inactivity
    const cappedDelta = Math.min(delta, 0.1);
    
    // Update time
    this.time += cappedDelta;
    
    // Update frame counter
    this.frameCount = (this.frameCount || 0) + 1;
    
    // Apply physics
    this.updatePhysics(cappedDelta);
    
    // Render frame
    this.render();
    
    // Emit frame event for external synchronization
    if (this.frameCount % 30 === 0) {
      this.emitEvent('linguisticinterfaceframe', { 
        time: this.time, 
        coherence: this.networkCoherence 
      });
    }
  }
  
  updatePhysics(delta) {
    // Apply physics simulation to nodes
    
    // Apply forces between nodes
    for (let i = 0; i < this.nodes.length; i++) {
      const node1 = this.nodes[i];
      
      // Skip if being dragged
      if (node1 === this.draggingNode) continue;
      
      // Apply cluster center gravity
      const cluster = this.semanticClusters.find(c => c.id === node1.cluster);
      if (cluster) {
        // Vector toward cluster center
        const dx = cluster.centerX - node1.x;
        const dy = cluster.centerY - node1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Stronger gravity if far from center
        const gravity = 0.1 * Math.max(0, distance - cluster.radius) / 100;
        node1.vx += dx * gravity * delta;
        node1.vy += dy * gravity * delta;
      }
      
      // Apply forces from other nodes
      for (let j = i + 1; j < this.nodes.length; j++) {
        const node2 = this.nodes[j];
        
        // Skip if being dragged
        if (node2 === this.draggingNode) continue;
        
        // Calculate distance between nodes
        const dx = node2.x - node1.x;
        const dy = node2.y - node1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Skip if too far apart
        if (distance > 200) continue;
        
        // Check if nodes are connected
        const connection = node1.connections.find(conn => 
          conn.start === node2 || conn.end === node2
        );
        
        if (connection && connection.active) {
          // Apply attractive force for connected nodes
          const strength = connection.strength * 0.5;
          const forceMagnitude = strength * (distance - (node1.radius + node2.radius) * 2) * 0.01;
          
          const forceX = dx * forceMagnitude * delta;
          const forceY = dy * forceMagnitude * delta;
          
          node1.vx += forceX;
          node1.vy += forceY;
          node2.vx -= forceX;
          node2.vy -= forceY;
        } else {
          // Apply repulsive force for non-connected nodes
          const minDistance = (node1.radius + node2.radius) * 2;
          
          if (distance < minDistance) {
            const forceMagnitude = 5 * (1 - distance / minDistance) / distance;
            
            const forceX = dx * forceMagnitude * delta;
            const forceY = dy * forceMagnitude * delta;
            
            node1.vx -= forceX;
            node1.vy -= forceY;
            node2.vx += forceX;
            node2.vy += forceY;
          }
        }
      }
      
      // Apply bounding forces to keep nodes in canvas
      const margin = node1.radius * 2;
      
      if (node1.x < margin) node1.vx += (margin - node1.x) * 0.1 * delta;
      if (node1.x > this.canvas.width - margin) node1.vx -= (node1.x - (this.canvas.width - margin)) * 0.1 * delta;
      if (node1.y < margin) node1.vy += (margin - node1.y) * 0.1 * delta;
      if (node1.y > this.canvas.height - margin) node1.vy -= (node1.y - (this.canvas.height - margin)) * 0.1 * delta;
      
      // Apply damping (friction)
      node1.vx *= 0.95;
      node1.vy *= 0.95;
      
      // Update position
      node1.x += node1.vx;
      node1.y += node1.vy;
    }
    
    // Update connection pulses
    this.connections.forEach(conn => {
      if (conn.active) {
        conn.pulsePosition += conn.pulseSpeed * delta * 0.5;
        if (conn.pulsePosition > 1) {
          conn.pulsePosition = 0;
          
          // Randomly deactivate non-critical connections
          if (Math.random() < 0.05 && !conn.start.selected && !conn.end.selected) {
            conn.active = Math.random() < this.networkCoherence;
          }
        }
      } else if (Math.random() < 0.01 * this.networkCoherence) {
        // Randomly activate inactive connections
        conn.active = true;
      }
    });
  }
  
  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw debug info
    if (this.config.showDebug) {
      this.drawDebugInfo();
    }
    
    // Draw connections
    this.drawConnections();
    
    // Draw nodes
    this.drawNodes();
  }
  
  drawConnections() {
    // Draw connections between nodes
    this.connections.forEach(conn => {
      // Skip inactive connections
      if (!conn.active && !conn.start.selected && !conn.end.selected) return;
      
      const start = conn.start;
      const end = conn.end;
      
      // Get connection color
      let color = conn.color;
      
      // If either node is selected, brighten the connection
      if (start.selected || end.selected) {
        color = this.brightenColor(color, 50);
      }
      
      // Set line properties
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = conn.strength * 3;
      
      // Draw line
      this.ctx.beginPath();
      this.ctx.moveTo(start.x, start.y);
      this.ctx.lineTo(end.x, end.y);
      this.ctx.stroke();
      
      // Draw pulse if active
      if (conn.active) {
        this.drawConnectionPulse(conn);
      }
    });
  }
  
  drawConnectionPulse(conn) {
    // Draw pulse traveling along connection
    const start = conn.start;
    const end = conn.end;
    
    // Calculate pulse position
    const pulsePos = conn.pulsePosition;
    const x = start.x + (end.x - start.x) * pulsePos;
    const y = start.y + (end.y - start.y) * pulsePos;
    
    // Draw pulse
    const pulseSize = 4 * conn.strength;
    this.ctx.fillStyle = conn.color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Add glow effect
    const glow = this.ctx.createRadialGradient(x, y, pulseSize, x, y, pulseSize * 3);
    glow.addColorStop(0, conn.color);
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    this.ctx.fillStyle = glow;
    this.ctx.beginPath();
    this.ctx.arc(x, y, pulseSize * 3, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  drawNodes() {
    // Draw language nodes
    this.nodes.forEach(node => {
      // Calculate pulse effect
      const pulse = Math.sin(this.time * node.pulseSpeed + node.pulsePhase) * 0.2 + 1;
      const radius = node.radius * pulse;
      
      // Create gradient fill
      const gradient = this.ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, radius * 1.5
      );
      
      // Get base color
      let color = node.color;
      
      // If selected or hovered, brighten the node
      if (node === this.selectedNode) {
        color = this.brightenColor(color, 100);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.6, color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      } else if (node === this.hoveredNode) {
        color = this.brightenColor(color, 50);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.7, color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      } else {
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
      }
      
      // Draw node
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, radius * 1.5, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw inner core
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, radius * 0.7, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw node text
      if (node === this.selectedNode || node === this.hoveredNode) {
        this.drawNodeText(node);
      }
      
      // Draw selection indicator if selected
      if (node === this.selectedNode) {
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, radius * 1.8, 0, Math.PI * 2);
        this.ctx.stroke();
      }
    });
  }
  
  drawNodeText(node) {
    // Draw text for node
    this.ctx.font = 'bold 14px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    
    // Add text background for readability
    const textWidth = this.ctx.measureText(node.text).width;
    const padding = 4;
    
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(
      node.x - textWidth/2 - padding,
      node.y + node.radius*1.5,
      textWidth + padding*2,
      20
    );
    
    // Draw text
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText(node.text, node.x, node.y + node.radius*1.5 + 10);
  }
  
  drawDebugInfo() {
    // Draw debug information
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(10, 10, 300, 100);
    
    this.ctx.font = '12px monospace';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    
    this.ctx.fillText(`Nodes: ${this.nodes.length}`, 20, 20);
    this.ctx.fillText(`Connections: ${this.connections.length}`, 20, 40);
    this.ctx.fillText(`Frequency: ${this.config.frequency} Hz`, 20, 60);
    this.ctx.fillText(`Coherence: ${(this.networkCoherence*100).toFixed(1)}%`, 20, 80);
  }
  
  brightenColor(color, amount) {
    // Brighten a color by the specified amount
    if (color.startsWith('#')) {
      const rgb = this.hexToRgb(color);
      return `rgb(${Math.min(255, rgb.r + amount)}, ${Math.min(255, rgb.g + amount)}, ${Math.min(255, rgb.b + amount)})`;
    } else if (color.startsWith('rgb')) {
      const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        return `rgb(${Math.min(255, parseInt(rgbMatch[1]) + amount)}, ${Math.min(255, parseInt(rgbMatch[2]) + amount)}, ${Math.min(255, parseInt(rgbMatch[3]) + amount)})`;
      }
    }
    
    return color;
  }
  
  updateNetworkCoherence() {
    // Calculate network coherence based on active connections and node states
    const activeConnectionRatio = this.connections.filter(c => c.active).length / this.connections.length;
    
    // Weight by creator/language balance
    const creatorFactor = this.creatorIntentStrength * 0.6;
    const languageFactor = this.languageInfluenceStrength * 0.4;
    
    // Calculate coherence
    this.networkCoherence = (activeConnectionRatio * 0.4) + (creatorFactor + languageFactor) / 2;
    
    // Update coherence display
    if (this.coherenceFill && this.coherenceValue) {
      const percentage = Math.round(this.networkCoherence * 100);
      this.coherenceFill.style.width = `${percentage}%`;
      this.coherenceValue.textContent = `${percentage}%`;
      
      // Update color based on coherence level
      const hue = 200 + (this.networkCoherence * 60); // Blue to teal/green
      this.coherenceFill.style.backgroundColor = `hsl(${hue}, 80%, 50%)`;
    }
    
    // Emit event for synchronization with Earth visualizer
    this.emitEvent('linguisticcoherenceupdate', { coherence: this.networkCoherence });
  }
  
  toggleRenderMode() {
    this.config.renderMode = this.config.renderMode === '3d' ? '2d' : '3d';
    
    // Emit event for any connected visualizers
    this.emitEvent('linguisticrendermode', { mode: this.config.renderMode });
  }
  
  handleEarthFrame(detail) {
    // Receive updates from Earth visualizer if connected
    if (detail.coherence !== undefined) {
      // Sync coherence with Earth if earth has higher coherence
      if (detail.coherence > this.networkCoherence) {
        this.networkCoherence = this.networkCoherence * 0.8 + detail.coherence * 0.2;
        this.updateNetworkCoherence();
      }
    }
  }
  
  showLoading() {
    // Show loading indicator
    this.loadingIndicator = document.createElement('div');
    this.loadingIndicator.className = 'linguistic-loading';
    this.loadingIndicator.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text">Initializing Linguistic Network</div>
    `;
    this.container.appendChild(this.loadingIndicator);
  }
  
  hideLoading() {
    // Hide loading indicator
    if (this.loadingIndicator) {
      this.loadingIndicator.classList.add('loading-complete');
      setTimeout(() => {
        if (this.loadingIndicator && this.loadingIndicator.parentNode) {
          this.loadingIndicator.parentNode.removeChild(this.loadingIndicator);
        }
      }, 500);
    }
  }
  
  playTone(frequency, duration = 2, volume = 0.1) {
    if (!this.audioContext || !this.config.enableSound) return;
    
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
    if (!this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    this.oscillators = this.oscillators.filter(osc => osc.endTime > now);
  }
  
  emitEvent(name, detail) {
    // Emit custom event
    const event = new CustomEvent(name, { detail });
    this.container.dispatchEvent(event);
    window.dispatchEvent(event);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add CSS styles
  const style = document.createElement('style');
  style.textContent = `
    .linguistic-interface-controls {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 280px;
      background-color: rgba(0, 20, 40, 0.7);
      color: #ffffff;
      padding: 10px;
      border-radius: 5px;
      font-size: 14px;
      z-index: 100;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    
    .control-header {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
      text-align: center;
      color: #88ccff;
    }
    
    .control-sliders {
      margin-bottom: 10px;
    }
    
    .control-group {
      margin-bottom: 8px;
    }
    
    .control-group label {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      font-size: 12px;
    }
    
    .value {
      font-weight: bold;
      color: #88ffaa;
    }
    
    input[type="range"] {
      width: 100%;
      height: 6px;
      -webkit-appearance: none;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
      outline: none;
    }
    
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #88ccff;
    }
    
    .coherence-meter {
      height: 8px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      margin: 5px 0;
      overflow: hidden;
    }
    
    .coherence-fill {
      height: 100%;
      width: 50%;
      background-color: #5599ff;
      transition: width 0.3s ease, background-color 0.3s ease;
    }
    
    .buttons-container {
      display: flex;
      gap: 8px;
      margin-bottom: 10px;
    }
    
    .buttons-container button {
      flex: 1;
      padding: 6px 0;
      background-color: rgba(0, 80, 120, 0.5);
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .buttons-container button:hover {
      background-color: rgba(0, 100, 150, 0.8);
    }
    
    .frequency-selector {
      margin-bottom: 10px;
    }
    
    .frequency-label {
      font-size: 12px;
      margin-bottom: 4px;
      color: #88ccff;
    }
    
    .frequency-select {
      width: 100%;
      padding: 5px;
      background-color: rgba(0, 40, 80, 0.5);
      color: white;
      border: 1px solid rgba(136, 204, 255, 0.3);
      border-radius: 4px;
      font-size: 12px;
    }
    
    .information-panel {
      background-color: rgba(0, 40, 80, 0.5);
      border-radius: 4px;
      padding: 8px;
    }
    
    .info-title {
      font-size: 12px;
      color: #88ccff;
      margin-bottom: 5px;
      text-align: center;
    }
    
    .node-details {
      font-size: 12px;
    }
    
    .no-selection {
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
      font-style: italic;
      font-size: 12px;
    }
    
    .node-detail-card {
      border-radius: 3px;
      overflow: hidden;
    }
    
    .node-header {
      padding: 6px;
      margin-bottom: 5px;
    }
    
    .node-title {
      font-weight: bold;
      margin-bottom: 3px;
    }
    
    .node-type {
      font-size: 11px;
      font-style: italic;
    }
    
    .node-data {
      margin-bottom: 8px;
    }
    
    .data-row {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      margin-bottom: 3px;
    }
    
    .data-label {
      color: rgba(255, 255, 255, 0.7);
    }
    
    .influence-header {
      font-size: 11px;
      color: #88ccff;
      margin-bottom: 4px;
      text-align: center;
    }
    
    .influence-meter {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
    }
    
    .influence-label {
      font-size: 10px;
      width: 60px;
      color: rgba(255, 255, 255, 0.7);
    }
    
    .influence-label:last-child {
      text-align: right;
    }
    
    .influence-bar-container {
      flex: 1;
      height: 8px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      overflow: hidden;
      position: relative;
    }
    
    .creator-influence-bar {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background-color: #88ccff;
    }
    
    .language-influence-bar {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      background-color: #ff88cc;
    }
    
    .influence-values {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 8px;
    }
    
    .related-nodes {
      margin-top: 8px;
    }
    
    .related-header {
      font-size: 11px;
      color: #88ccff;
      margin-bottom: 4px;
    }
    
    .related-list {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    
    .related-node {
      font-size: 10px;
      background-color: rgba(136, 204, 255, 0.2);
      padding: 2px 6px;
      border-radius: 10px;
    }
    
    .linguistic-tooltip {
      position: absolute;
      background-color: rgba(0, 20, 40, 0.9);
      color: white;
      padding: 8px;
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
    }
    
    .tooltip-title {
      font-weight: bold;
      margin-bottom: 2px;
      color: #88ccff;
    }
    
    .tooltip-info {
      font-size: 11px;
      margin-bottom: 2px;
    }
    
    .tooltip-frequency {
      font-size: 11px;
      color: #88ffaa;
    }
    
    .linguistic-loading {
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
    
    .linguistic-loading.loading-complete {
      opacity: 0;
      pointer-events: none;
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
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
    
    /* Responsive design */
    @media (max-width: 768px) {
      .linguistic-interface-controls {
        top: auto;
        bottom: 80px;
        right: 10px;
        width: 240px;
        font-size: 12px;
      }
      
      .control-header {
        font-size: 14px;
      }
      
      .control-group label {
        font-size: 11px;
      }
      
      .buttons-container button {
        font-size: 11px;
        padding: 5px 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Check for container
  const container = document.getElementById('linguistic-consciousness-container');
  if (container) {
    // Find Earth visualizer if available
    const earthVisualizer = window.earthVisualizer;
    
    // Initialize interface
    setTimeout(() => {
      window.linguisticInterface = new LinguisticConsciousnessInterface(container, {
        earth: earthVisualizer
      });
      window.linguisticInterface.start();
    }, 500);
  }
});