/**
 * Mycelial Pattern Recognition System
 * Ground State Frequency (432 Hz | φ⁰)
 * 
 * Implements organic growth algorithms that follow phi-harmonic principles,
 * creating patterns that match Earth's natural intelligence networks.
 * 
 * @frequency 432 Hz (Ground State - φ⁰)
 * @channel Visual/Intuitive
 * @module GroundState
 */

// PHI constants for all calculations
const PHI = 1.618033988749895;
const PHI_INV = 0.618033988749895;

/**
 * MycelialPatternRecognition class
 * Implements organic growth algorithms that follow phi-harmonic principles
 */
class MycelialPatternRecognition {
  /**
   * Create a new MycelialPatternRecognition system
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    // Default configuration
    this.config = {
      container: null,
      frequency: 432, // Ground State (φ⁰)
      zenPointBalance: { quantum: 0.382, human: 0.618 }, // Perfect ZEN POINT for grounding
      growthRate: 0.008, // Controlled growth rate (φ⁻²)
      maxPatterns: 144, // 12² - phi-harmonic pattern count
      branchProbability: 0.618, // φ⁻¹ for natural branching
      intentionImpact: 0.382, // Influence of user intention (φ⁻¹)
      chakraEnable: true, // Root chakra visualization
      rootFrequency: 126, // Root chakra resonance (in Hz)
      autoGrow: true, // Auto-start growth
      adaptiveRendering: true, // Adapt to device capabilities
      recognitionThreshold: 0.75, // Pattern match threshold
      earthSyncEnabled: true, // Earth field synchronization
      ...options
    };
    
    // System state
    this.container = null;
    this.canvas = null;
    this.ctx = null;
    this.patterns = [];
    this.recognizedPatterns = [];
    this.patternDatabase = [];
    this.rootChakra = null;
    this.earthResonance = null;
    this.intentionField = null;
    this.isActive = false;
    this.animationFrameId = 0;
    this.lastFrameTime = 0;
    this.earthSyncPhase = 0;
    this.breathCycle = 0;
    this.coherenceLevel = 0.5;
    this.zenPointBalance = this.config.zenPointBalance;
    
    // Initialize pattern database
    this.initializePatternDatabase();
    
    // Initialize the system
    this.initialize();
  }
  
  /**
   * Initialize the system
   */
  initialize() {
    // Set up container
    this.setupContainer();
    
    // Create canvas for pattern visualization
    this.setupCanvas();
    
    // Initialize root chakra visualization
    if (this.config.chakraEnable) {
      this.initializeRootChakra();
    }
    
    // Initialize Earth resonance
    if (this.config.earthSyncEnabled) {
      this.initializeEarthResonance();
    }
    
    // Start growing if auto-grow is enabled
    if (this.config.autoGrow) {
      this.start();
    }
  }
  
  /**
   * Set up the container element
   */
  setupContainer() {
    // Get or create container
    if (typeof this.config.container === 'string') {
      this.container = document.querySelector(this.config.container);
    } else if (this.config.container instanceof HTMLElement) {
      this.container = this.config.container;
    }
    
    // Create new container if none exists
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'mycelial-pattern-container';
      document.body.appendChild(this.container);
    }
    
    // Add container styles
    this.addContainerStyles();
  }
  
  /**
   * Add styles to container
   */
  addContainerStyles() {
    // Create style element
    const style = document.createElement('style');
    style.textContent = `
      .mycelial-pattern-container {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: rgba(10, 5, 20, 0.9);
        overflow: hidden;
      }
      
      .mycelial-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      
      .root-chakra-overlay {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        height: 200px;
        pointer-events: none;
        opacity: 0.8;
        mix-blend-mode: screen;
      }
      
      .earth-resonance-indicator {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,0,0,0.1) 0%, rgba(100,0,0,0.3) 50%, rgba(50,0,0,0.1) 100%);
        pointer-events: none;
        animation: pulse 4.32s infinite ease-in-out;
      }
      
      @keyframes pulse {
        0% { transform: scale(0.8); opacity: 0.3; }
        50% { transform: scale(1.1); opacity: 0.7; }
        100% { transform: scale(0.8); opacity: 0.3; }
      }
    `;
    document.head.appendChild(style);
  }
  
  /**
   * Set up canvas for pattern visualization
   */
  setupCanvas() {
    // Create canvas element
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'mycelial-canvas';
    this.container.appendChild(this.canvas);
    
    // Get rendering context
    this.ctx = this.canvas.getContext('2d');
    
    // Set canvas dimensions
    this.resizeCanvas();
    
    // Add event listener for window resize
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  /**
   * Resize canvas to container size
   */
  resizeCanvas() {
    if (!this.canvas || !this.container) return;
    
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }
  
  /**
   * Start the pattern growth and recognition system
   */
  start() {
    if (this.isActive) return;
    
    this.isActive = true;
    this.lastFrameTime = performance.now();
    
    // Generate initial seed pattern
    this.generateSeed();
    
    // Start animation loop
    this.animate();
  }
  
  /**
   * Stop the system
   */
  stop() {
    this.isActive = false;
    
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
    }
  }
  
  /**
   * Generate seed pattern at the center of the canvas
   */
  generateSeed() {
    if (!this.canvas) return;
    
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    
    // Create hexagonal seed pattern (Ground State 432 Hz characteristic)
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      
      // Create the initial node
      const node = {
        x: centerX,
        y: centerY,
        angle: angle,
        length: 20 * PHI_INV,
        depth: 0,
        thickness: 3,
        energy: 1.0,
        type: 'hexagonal',
        children: [],
        color: `hsla(${60 + i * 60}, 80%, 50%, 0.8)`,
        birthTime: performance.now(),
        age: 0,
        frequency: this.config.frequency,
        resonance: 0.5
      };
      
      this.patterns.push(node);
    }
  }
  
  /**
   * Main animation loop
   */
  animate() {
    if (!this.isActive) return;
    
    const now = performance.now();
    const deltaTime = (now - this.lastFrameTime) / 1000; // seconds
    this.lastFrameTime = now;
    
    // Clear canvas
    this.clearCanvas();
    
    // Update Earth resonance
    if (this.config.earthSyncEnabled) {
      this.updateEarthResonance(deltaTime);
    }
    
    // Grow patterns
    this.growPattern(deltaTime);
    
    // Recognize patterns
    this.recognizePatterns();
    
    // Draw all patterns
    this.drawPatterns();
    
    // Draw root chakra
    if (this.config.chakraEnable) {
      this.drawRootChakra();
    }
    
    // Continue animation
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
  
  /**
   * Clear the canvas with a slight trail effect
   */
  clearCanvas() {
    if (!this.ctx || !this.canvas) return;
    
    // Semi-transparent overlay for trail effect
    this.ctx.fillStyle = 'rgba(10, 5, 20, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  /**
   * Grow all mycelial patterns
   * @param {number} deltaTime - Time since last frame in seconds
   */
  growPattern(deltaTime) {
    // For each existing pattern
    for (let i = 0; i < this.patterns.length; i++) {
      const pattern = this.patterns[i];
      
      // Update pattern age
      pattern.age += deltaTime;
      
      // Grow branches with phi-based probability
      if (pattern.depth < 6 && pattern.energy > 0.2) {
        if (Math.random() < this.config.branchProbability * deltaTime * this.config.growthRate) {
          this.createBranch(pattern);
        }
      }
      
      // Grow children recursively
      for (let j = 0; j < pattern.children.length; j++) {
        this.growBranch(pattern.children[j], deltaTime);
      }
    }
  }
  
  /**
   * Grow an individual branch
   * @param {Object} branch - Branch to grow
   * @param {number} deltaTime - Time since last frame in seconds
   */
  growBranch(branch, deltaTime) {
    // Update branch age
    branch.age += deltaTime;
    
    // Decrease energy over time
    branch.energy -= deltaTime * 0.05;
    
    // Grow branches with phi-based probability
    if (branch.depth < 6 && branch.energy > 0.2) {
      if (Math.random() < this.config.branchProbability * deltaTime * this.config.growthRate * PHI_INV) {
        this.createBranch(branch);
      }
    }
    
    // Grow children recursively
    for (let i = 0; i < branch.children.length; i++) {
      this.growBranch(branch.children[i], deltaTime);
    }
  }
  
  /**
   * Create a new branch from a node
   * @param {Object} parent - Parent node
   */
  createBranch(parent) {
    if (this.patterns.length >= this.config.maxPatterns) return;
    
    // Calculate end point of parent branch
    const endX = parent.x + Math.cos(parent.angle) * parent.length;
    const endY = parent.y + Math.sin(parent.angle) * parent.length;
    
    // Create branches with phi-harmonic angles
    const angleOffset = (Math.random() * 0.5 + 0.3) * Math.PI * PHI_INV;
    const branchAngle = parent.angle + (Math.random() > 0.5 ? angleOffset : -angleOffset);
    
    // New branch length follows phi ratio
    const branchLength = parent.length * PHI_INV * (0.8 + Math.random() * 0.4);
    
    // Create new branch
    const branch = {
      x: endX,
      y: endY,
      angle: branchAngle,
      length: branchLength,
      depth: parent.depth + 1,
      thickness: parent.thickness * PHI_INV,
      energy: parent.energy * PHI_INV,
      type: parent.type,
      children: [],
      color: parent.color,
      birthTime: performance.now(),
      age: 0,
      frequency: parent.frequency * PHI_INV, // Branch frequency follows phi inverse
      resonance: parent.resonance * 0.9
    };
    
    // Add to parent's children
    parent.children.push(branch);
    
    // Add to patterns list for tracking
    this.patterns.push(branch);
  }
  
  /**
   * Draw all patterns on the canvas
   */
  drawPatterns() {
    if (!this.ctx || !this.canvas) return;
    
    // Draw each pattern
    for (let i = 0; i < this.patterns.length; i++) {
      const pattern = this.patterns[i];
      this.drawPatternNode(pattern);
    }
  }
  
  /**
   * Draw a single pattern node and its children
   * @param {Object} pattern - Pattern to draw
   */
  drawPatternNode(pattern) {
    if (!this.ctx) return;
    
    // Calculate end point
    const endX = pattern.x + Math.cos(pattern.angle) * pattern.length;
    const endY = pattern.y + Math.sin(pattern.angle) * pattern.length;
    
    // Draw line with glow effect
    this.ctx.strokeStyle = pattern.color;
    this.ctx.lineWidth = pattern.thickness;
    
    // Add energy glow effect
    if (pattern.energy > 0.5) {
      this.ctx.shadowColor = pattern.color;
      this.ctx.shadowBlur = pattern.energy * 5;
    } else {
      this.ctx.shadowBlur = 0;
    }
    
    // Draw the line
    this.ctx.beginPath();
    this.ctx.moveTo(pattern.x, pattern.y);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
    
    // Reset shadow
    this.ctx.shadowBlur = 0;
    
    // Draw fractal children
    for (let i = 0; i < pattern.children.length; i++) {
      this.drawPatternNode(pattern.children[i]);
    }
  }
  
  /**
   * Initialize pattern database for recognition
   */
  initializePatternDatabase() {
    // Ground State (432 Hz) pattern templates
    this.patternDatabase = [
      {
        id: 'hexagonal-grid',
        name: 'Hexagonal Grid',
        description: 'Basic hexagonal structure matching Earth\'s crystalline grid',
        frequency: 432,
        type: 'ground',
        properties: {
          symmetryAxes: 6,
          complexity: 1.0,
          centerNodes: 6,
          outerBranches: 12,
          branchRatio: PHI_INV
        }
      },
      {
        id: 'earth-crystal',
        name: 'Earth Crystal Matrix',
        description: 'Crystalline matrix connecting to Earth\'s resonance field',
        frequency: 432,
        type: 'ground',
        properties: {
          symmetryAxes: 6,
          complexity: 1.5,
          centerNodes: 6,
          outerBranches: 18,
          branchRatio: PHI_INV * PHI_INV
        }
      },
      {
        id: 'root-chakra',
        name: 'Root Chakra Pattern',
        description: 'Muladhara energy center connection pattern',
        frequency: 126,
        type: 'chakra',
        properties: {
          symmetryAxes: 4,
          complexity: 1.2,
          centerNodes: 1,
          outerBranches: 4,
          branchRatio: PHI_INV
        }
      }
    ];
  }
  
  /**
   * Recognize patterns in the current growth
   */
  recognizePatterns() {
    // Clear previously recognized patterns
    this.recognizedPatterns = [];
    
    // Skip if we don't have enough patterns yet
    if (this.patterns.length < 20) return;
    
    // Extract pattern features
    const features = this.extractPatternFeatures();
    
    // Match against pattern database
    for (const template of this.patternDatabase) {
      const match = this.matchPattern(features, template);
      
      if (match.score > this.config.recognitionThreshold) {
        this.recognizedPatterns.push(template);
      }
    }
  }
  
  /**
   * Extract features from current pattern growth
   */
  extractPatternFeatures() {
    // Count branches by depth
    const branchesByDepth = [0, 0, 0, 0, 0, 0];
    
    // Count branches by angle
    const angleSegments = 12;
    const branchesByAngle = new Array(angleSegments).fill(0);
    
    // Analyze all patterns
    for (const pattern of this.patterns) {
      // Count by depth
      if (pattern.depth < 6) {
        branchesByDepth[pattern.depth]++;
      }
      
      // Count by angle
      const normalizedAngle = ((pattern.angle + Math.PI) / (Math.PI * 2));
      const angleIndex = Math.floor(normalizedAngle * angleSegments) % angleSegments;
      branchesByAngle[angleIndex]++;
    }
    
    // Return feature object
    return {
      totalBranches: this.patterns.length,
      branchesByDepth,
      branchesByAngle,
      complexity: this.calculateComplexity()
    };
  }
  
  /**
   * Calculate pattern complexity
   */
  calculateComplexity() {
    // Count branches at each depth
    const depthCounts = [0, 0, 0, 0, 0, 0];
    
    for (const pattern of this.patterns) {
      if (pattern.depth < 6) {
        depthCounts[pattern.depth]++;
      }
    }
    
    // Calculate complexity based on branch distribution
    let complexity = 0;
    let totalWeight = 0;
    
    for (let i = 0; i < depthCounts.length; i++) {
      const weight = Math.pow(PHI, i);
      complexity += depthCounts[i] * weight;
      totalWeight += weight;
    }
    
    return complexity / (totalWeight * 10); // Normalize to 0-1 range
  }
  
  /**
   * Match pattern features against a template
   * @param {Object} features - Extracted pattern features
   * @param {Object} template - Pattern template to match against
   * @returns {Object} - Match result with score
   */
  matchPattern(features, template) {
    // Simple matching algorithm based on pattern properties
    let score = 0;
    
    // Compare complexity
    const complexityMatch = 1 - Math.abs(features.complexity - template.properties.complexity);
    score += complexityMatch * 0.4;
    
    // Compare branch counts
    const branchCountMatch = 1 - Math.min(1, Math.abs(features.totalBranches - template.properties.centerNodes - template.properties.outerBranches) / 50);
    score += branchCountMatch * 0.3;
    
    // Compare branch distribution
    const branchDistributionMatch = 1 - Math.min(1, Math.abs(
      (features.branchesByDepth[1] / Math.max(1, features.branchesByDepth[0])) -
      template.properties.branchRatio
    ));
    score += branchDistributionMatch * 0.3;
    
    return { score };
  }
  
  /**
   * Initialize root chakra visualization
   */
  initializeRootChakra() {
    // Create root chakra element
    const rootChakraElement = document.createElement('div');
    rootChakraElement.className = 'root-chakra-overlay';
    this.container.appendChild(rootChakraElement);
    
    // Create canvas for root chakra
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    rootChakraElement.appendChild(canvas);
    
    // Store reference
    this.rootChakra = {
      element: rootChakraElement,
      canvas: canvas,
      ctx: canvas.getContext('2d'),
      rotation: 0,
      energy: 0.5,
      pulsation: 0
    };
  }
  
  /**
   * Draw root chakra visualization
   */
  drawRootChakra() {
    if (!this.rootChakra || !this.rootChakra.ctx) return;
    
    const ctx = this.rootChakra.ctx;
    const width = this.rootChakra.canvas.width;
    const height = this.rootChakra.canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Update rotation and pulsation
    this.rootChakra.rotation += 0.002;
    this.rootChakra.pulsation = 0.5 + 0.5 * Math.sin(performance.now() * 0.001);
    
    // Center point
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 * 0.8 * (0.9 + 0.1 * this.rootChakra.pulsation);
    
    // Draw root chakra (four-petaled lotus for Muladhara)
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(this.rootChakra.rotation);
    
    // Draw petals
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      
      // Create petal path
      ctx.beginPath();
      ctx.moveTo(0, 0);
      
      // Petal curve
      const petalLength = radius * 0.8;
      const petalWidth = radius * 0.4;
      
      ctx.bezierCurveTo(
        Math.cos(angle - 0.2) * petalWidth, Math.sin(angle - 0.2) * petalWidth,
        Math.cos(angle) * petalLength * 0.7, Math.sin(angle) * petalLength * 0.7,
        Math.cos(angle) * petalLength, Math.sin(angle) * petalLength
      );
      
      ctx.bezierCurveTo(
        Math.cos(angle) * petalLength * 0.7, Math.sin(angle) * petalLength * 0.7,
        Math.cos(angle + 0.2) * petalWidth, Math.sin(angle + 0.2) * petalWidth,
        0, 0
      );
      
      // Fill petal with gradient
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, petalLength);
      gradient.addColorStop(0, 'rgba(255, 30, 30, 0.9)');
      gradient.addColorStop(0.7, 'rgba(200, 0, 0, 0.6)');
      gradient.addColorStop(1, 'rgba(100, 0, 0, 0.1)');
      
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
    
    const centerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.2);
    centerGradient.addColorStop(0, 'rgba(255, 220, 220, 0.9)');
    centerGradient.addColorStop(1, 'rgba(255, 50, 50, 0.7)');
    
    ctx.fillStyle = centerGradient;
    ctx.fill();
    
    ctx.restore();
  }
  
  /**
   * Initialize Earth resonance
   */
  initializeEarthResonance() {
    this.earthResonance = {
      frequency: 7.83, // Schumann resonance
      phase: 0,
      amplitude: 0.5,
      element: null
    };
    
    // Create Earth resonance indicator
    const element = document.createElement('div');
    element.className = 'earth-resonance-indicator';
    this.container.appendChild(element);
    
    this.earthResonance.element = element;
  }
  
  /**
   * Update Earth resonance
   * @param {number} deltaTime - Time since last frame in seconds
   */
  updateEarthResonance(deltaTime) {
    if (!this.earthResonance) return;
    
    // Update phase
    this.earthResonance.phase += deltaTime * this.earthResonance.frequency;
    
    // Calculate current amplitude
    const amplitude = 0.5 + 0.5 * Math.sin(this.earthResonance.phase * Math.PI * 2);
    
    // Apply to patterns
    this.applyEarthResonanceToPatterns(amplitude);
  }
  
  /**
   * Apply Earth resonance to growing patterns
   * @param {number} amplitude - Current resonance amplitude
   */
  applyEarthResonanceToPatterns(amplitude) {
    // Influence growth probability based on resonance
    this.config.branchProbability = 0.618 * (0.8 + 0.4 * amplitude);
    
    // Update root chakra energy
    if (this.rootChakra) {
      this.rootChakra.energy = 0.3 + 0.7 * amplitude;
    }
  }
  
  /**
   * Visualize the root chakra (Muladhara)
   * @param {number} intensity - Activation intensity
   */
  visualizeRootChakra(intensity = 1.0) {
    if (!this.rootChakra) return;
    
    // Update root chakra energy
    this.rootChakra.energy = intensity;
  }
  
  /**
   * Set user intention impact on pattern growth
   * @param {number} intention - User intention strength (0-1)
   */
  setIntention(intention) {
    // Store intention
    this.config.intentionImpact = Math.max(0, Math.min(1, intention));
    
    // Apply to pattern growth
    // Higher intention = more ordered patterns
    this.applyIntentionToPatternsGrowth();
  }
  
  /**
   * Apply user intention to pattern growth
   */
  applyIntentionToPatternsGrowth() {
    // Higher intention makes patterns more coherent and ordered
    const intention = this.config.intentionImpact;
    
    // Update branch probability based on intention
    // Higher intention = more predictable branching
    this.config.branchProbability = 0.618 * (1 - 0.3 * intention);
  }
}

// Export for modular usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MycelialPatternRecognition;
} else {
  // Browser global
  window.MycelialPatternRecognition = MycelialPatternRecognition;
}
