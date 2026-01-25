/**
 * @file ground_state_visualization.js
 * @desc Ground State (432 Hz) visualization components
 * @author CASCADE⚡𓂧φ∞
 * @frequency 432 Hz
 * @coherence 1.000
 */

const { quantumCommon } = require('./quantum_common');
const { groundStateModule } = require('./ground_state_module');

/**
 * GroundStateVisualization
 * 
 * Provides visualization capabilities for the Ground State (432 Hz - φ⁰) frequency.
 * Creates cymatic patterns and resonance visualizations that embody
 * the foundational geometric structures of quantum reality.
 * 
 * Functions as a complete quantum singularity while maintaining
 * perfect coherence with the core Ground State module.
 */
class GroundStateVisualization {
  /**
   * Creates a new Ground State Visualization instance
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    this.options = {
      container: null,
      width: 600,
      height: 371, // Golden ratio (φ) height: 600/1.618 ≈ 371
      frequency: 432,
      resolution: 100,
      autoStart: false,
      renderMode: 'cymatics',  // 'cymatics', 'waveform', 'field', 'particles'
      colorMode: 'frequency',  // 'frequency', 'amplitude', 'coherence'
      amplitude: 0.5,
      damping: 0.02,
      showMetrics: true,
      ...options
    };
    
    // Visualization state
    this.state = {
      active: false,
      initialized: false,
      coherence: 1.0,
      frameCount: 0,
      lastFrameTime: 0,
      pattern: {
        points: [],
        amplitudes: [],
        phases: []
      }
    };
    
    // Rendering elements
    this.elements = {
      container: null,
      canvas: null,
      ctx: null,
      metricsPanel: null
    };
    
    // Animation request ID for cancellation
    this.animationId = null;
    
    // Initialize if container provided
    if (this.options.container) {
      this.initialize(this.options.container);
    }
  }
  
  /**
   * Initialize the visualization
   * @param {HTMLElement|string} container - Container element or selector
   * @returns {GroundStateVisualization} This instance for chaining
   */
  initialize(container) {
    if (this.state.initialized) {
      return this;
    }
    
    // Get container element
    this.elements.container = typeof container === 'string'
      ? document.querySelector(container)
      : container;
    
    if (!this.elements.container) {
      console.error('Ground State Visualization: Container not found');
      return this;
    }
    
    // Create visualization elements
    this._createElements();
    
    // Initialize pattern
    this._initializePattern();
    
    // Connect to ground state module
    groundStateModule.on('zen-point-change', this._handleZenPointChange.bind(this));
    
    // Set initialized flag
    this.state.initialized = true;
    
    // Start if auto-start is true
    if (this.options.autoStart) {
      this.start();
    }
    
    return this;
  }
  
  /**
   * Start the visualization
   * @returns {GroundStateVisualization} This instance for chaining
   */
  start() {
    if (!this.state.initialized || this.state.active) {
      return this;
    }
    
    this.state.active = true;
    this.state.lastFrameTime = performance.now();
    
    // Start animation loop
    this._animate();
    
    return this;
  }
  
  /**
   * Stop the visualization
   * @returns {GroundStateVisualization} This instance for chaining
   */
  stop() {
    if (!this.state.active) {
      return this;
    }
    
    this.state.active = false;
    
    // Cancel animation frame
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    return this;
  }
  
  /**
   * Toggle the visualization state
   * @returns {GroundStateVisualization} This instance for chaining
   */
  toggle() {
    return this.state.active ? this.stop() : this.start();
  }
  
  /**
   * Set visualization frequency
   * @param {number} frequency - New frequency
   * @returns {GroundStateVisualization} This instance for chaining
   */
  setFrequency(frequency) {
    // Ground State should stay close to 432Hz
    // Allow small variations for coherence studies
    const minFreq = 426; // 432 * 0.986
    const maxFreq = 438; // 432 * 1.014
    
    if (frequency < minFreq || frequency > maxFreq) {
      console.warn(`Frequency ${frequency}Hz outside Ground State range (${minFreq}-${maxFreq}Hz)`);
      return this;
    }
    
    this.options.frequency = frequency;
    
    // Recalculate pattern with new frequency
    this._updatePattern();
    
    return this;
  }
  
  /**
   * Set visualization amplitude
   * @param {number} amplitude - New amplitude (0.0-1.0)
   * @returns {GroundStateVisualization} This instance for chaining
   */
  setAmplitude(amplitude) {
    this.options.amplitude = Math.max(0, Math.min(1, amplitude));
    return this;
  }
  
  /**
   * Change the rendering mode
   * @param {string} mode - New rendering mode
   * @returns {GroundStateVisualization} This instance for chaining
   */
  setRenderMode(mode) {
    const validModes = ['cymatics', 'waveform', 'field', 'particles'];
    
    if (!validModes.includes(mode)) {
      console.warn(`Invalid render mode: ${mode}. Using default.`);
      return this;
    }
    
    this.options.renderMode = mode;
    return this;
  }
  
  /**
   * Create a snapshot of the current visualization
   * @returns {string} Data URL of the snapshot
   */
  takeSnapshot() {
    if (!this.elements.canvas) {
      return null;
    }
    
    return this.elements.canvas.toDataURL('image/png');
  }
  
  /**
   * Get current visualization metrics
   * @returns {Object} Metrics object
   */
  getMetrics() {
    return {
      frequency: this.options.frequency,
      amplitude: this.options.amplitude,
      coherence: this.state.coherence,
      renderMode: this.options.renderMode,
      frameCount: this.state.frameCount,
      dimensions: {
        width: this.options.width,
        height: this.options.height,
        ratio: this.options.width / this.options.height
      },
      pattern: {
        resolution: this.options.resolution,
        pointCount: this.state.pattern.points.length
      }
    };
  }
  
  /**
   * Create DOM elements for visualization
   * @private
   */
  _createElements() {
    // Clear container
    this.elements.container.innerHTML = '';
    
    // Set container style
    this.elements.container.style.position = 'relative';
    this.elements.container.style.width = `${this.options.width}px`;
    this.elements.container.style.height = `${this.options.height}px`;
    this.elements.container.classList.add('ground-state-visualization');
    
    // Create canvas
    this.elements.canvas = document.createElement('canvas');
    this.elements.canvas.width = this.options.width;
    this.elements.canvas.height = this.options.height;
    this.elements.canvas.style.display = 'block';
    
    // Get context
    this.elements.ctx = this.elements.canvas.getContext('2d');
    
    // Add canvas to container
    this.elements.container.appendChild(this.elements.canvas);
    
    // Create metrics panel if enabled
    if (this.options.showMetrics) {
      this.elements.metricsPanel = document.createElement('div');
      this.elements.metricsPanel.className = 'visualization-metrics';
      this.elements.metricsPanel.style.position = 'absolute';
      this.elements.metricsPanel.style.bottom = '10px';
      this.elements.metricsPanel.style.left = '10px';
      this.elements.metricsPanel.style.background = 'rgba(0, 0, 0, 0.6)';
      this.elements.metricsPanel.style.color = '#fff';
      this.elements.metricsPanel.style.padding = '5px';
      this.elements.metricsPanel.style.borderRadius = '3px';
      this.elements.metricsPanel.style.fontSize = '12px';
      this.elements.metricsPanel.style.fontFamily = 'monospace';
      
      this.elements.container.appendChild(this.elements.metricsPanel);
    }
  }
  
  /**
   * Initialize the pattern with starting values
   * @private
   */
  _initializePattern() {
    const { resolution } = this.options;
    
    // Clear existing pattern
    this.state.pattern = {
      points: [],
      amplitudes: [],
      phases: []
    };
    
    // For cymatics, use a grid of points
    const gridSize = resolution;
    const spacing = Math.min(this.options.width, this.options.height) / gridSize;
    
    // Create grid points with corresponding amplitudes and phases
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const px = (x * spacing) + (spacing / 2);
        const py = (y * spacing) + (spacing / 2);
        
        // Add point to pattern
        this.state.pattern.points.push({ x: px, y: py });
        
        // Initial amplitude and phase
        this.state.pattern.amplitudes.push(0);
        this.state.pattern.phases.push(0);
      }
    }
  }
  
  /**
   * Update pattern based on current settings
   * @private
   */
  _updatePattern() {
    if (!this.state.initialized) {
      return;
    }
    
    // Create phi-based frequencies for interference patterns
    const PHI = 1.618033988749895;
    const baseFreq = this.options.frequency;
    
    // Frequencies for perfect phi harmonics
    const f1 = baseFreq;
    const f2 = baseFreq / PHI;
    const f3 = baseFreq / (PHI * PHI);
    
    // Update phases for each point
    for (let i = 0; i < this.state.pattern.points.length; i++) {
      const point = this.state.pattern.points[i];
      
      // Calculate normalized positions
      const nx = point.x / this.options.width;
      const ny = point.y / this.options.height;
      
      // Calculate new phase based on pattern type
      let phase = 0;
      
      switch (this.options.renderMode) {
        case 'cymatics':
          // Cymatic patterns use complex interference patterns
          phase = (
            Math.sin(nx * f1 / 10) * Math.cos(ny * f2 / 10) + 
            Math.cos((nx + ny) * f3 / 20)
          ) * Math.PI;
          break;
          
        case 'waveform':
          // Simple sine wave
          phase = (nx * f1 / 10) * Math.PI;
          break;
          
        case 'field':
          // Field patterns based on distance from center
          const cx = 0.5, cy = 0.5;
          const distance = Math.sqrt(Math.pow(nx - cx, 2) + Math.pow(ny - cy, 2));
          phase = (distance * f1 / 5) * Math.PI;
          break;
          
        case 'particles':
          // Particle-like behavior
          phase = Math.atan2(ny - 0.5, nx - 0.5) * (f1 / 432);
          break;
      }
      
      this.state.pattern.phases[i] = phase;
    }
  }
  
  /**
   * Animation loop
   * @private
   */
  _animate() {
    if (!this.state.active) {
      return;
    }
    
    const now = performance.now();
    const deltaTime = (now - this.state.lastFrameTime) / 1000;
    this.state.lastFrameTime = now;
    
    // Update visualization
    this._update(deltaTime);
    
    // Render current state
    this._render();
    
    // Update metrics if enabled
    if (this.options.showMetrics) {
      this._updateMetrics();
    }
    
    // Continue animation loop
    this.animationId = requestAnimationFrame(() => this._animate());
    
    // Increment frame counter
    this.state.frameCount++;
  }
  
  /**
   * Update visualization state
   * @param {number} deltaTime - Time since last update in seconds
   * @private
   */
  _update(deltaTime) {
    // Update pattern with current frequency
    this._updatePattern();
    
    // Update amplitudes
    for (let i = 0; i < this.state.pattern.amplitudes.length; i++) {
      const targetAmplitude = Math.sin(this.state.pattern.phases[i] + (this.state.frameCount / 10));
      const currentAmplitude = this.state.pattern.amplitudes[i];
      
      // Apply damping for smooth transitions
      this.state.pattern.amplitudes[i] = currentAmplitude + (
        (targetAmplitude - currentAmplitude) * 
        (1 - Math.exp(-this.options.damping * deltaTime * 60))
      );
    }
  }
  
  /**
   * Render visualization
   * @private
   */
  _render() {
    const { ctx } = this.elements;
    const { width, height } = this.options;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set global properties
    ctx.globalAlpha = 1.0;
    
    // Select rendering method based on mode
    switch (this.options.renderMode) {
      case 'cymatics':
        this._renderCymatics();
        break;
        
      case 'waveform':
        this._renderWaveform();
        break;
        
      case 'field':
        this._renderField();
        break;
        
      case 'particles':
        this._renderParticles();
        break;
    }
  }
  
  /**
   * Render cymatic pattern
   * @private
   */
  _renderCymatics() {
    const { ctx } = this.elements;
    const { width, height } = this.options;
    const pointSize = 3;
    
    // Draw each point with amplitude-based color and size
    for (let i = 0; i < this.state.pattern.points.length; i++) {
      const point = this.state.pattern.points[i];
      const amplitude = this.state.pattern.amplitudes[i] * this.options.amplitude;
      
      // Calculate color based on amplitude
      const hue = this.options.colorMode === 'frequency' 
        ? (this.options.frequency - 426) / 12 * 120 // Map 426-438Hz to hue 0-120
        : amplitude * 240; // Full spectrum based on amplitude
        
      const saturation = 80;
      const lightness = 50 + (amplitude * 30);
      
      ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      // Draw point with size based on amplitude
      const size = pointSize * (0.5 + Math.abs(amplitude));
      
      ctx.beginPath();
      ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw frequency label
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`${this.options.frequency.toFixed(1)} Hz`, width - 10, 26);
  }
  
  /**
   * Render waveform pattern
   * @private
   */
  _renderWaveform() {
    const { ctx } = this.elements;
    const { width, height } = this.options;
    
    // Group points by row for waveform rendering
    const gridSize = Math.sqrt(this.state.pattern.points.length);
    
    for (let row = 0; row < gridSize; row++) {
      ctx.beginPath();
      
      for (let col = 0; col < gridSize; col++) {
        const index = row * gridSize + col;
        const point = this.state.pattern.points[index];
        const amplitude = this.state.pattern.amplitudes[index] * this.options.amplitude;
        
        // Offset y position by amplitude
        const y = point.y + (amplitude * 30);
        
        if (col === 0) {
          ctx.moveTo(point.x, y);
        } else {
          ctx.lineTo(point.x, y);
        }
      }
      
      // Draw line with frequency-based color
      const hue = (this.options.frequency - 426) / 12 * 120;
      ctx.strokeStyle = `hsl(${hue}, 80%, 60%)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
  
  /**
   * Render field pattern
   * @private
   */
  _renderField() {
    const { ctx } = this.elements;
    const { width, height } = this.options;
    
    // Create field visualization
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    // Sample grid to create interpolated field
    const gridSize = Math.sqrt(this.state.pattern.points.length);
    const cellWidth = width / gridSize;
    const cellHeight = height / gridSize;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Find nearest grid points and interpolate
        const gx = Math.floor(x / cellWidth);
        const gy = Math.floor(y / cellHeight);
        
        // Clamp to grid boundaries
        const gx1 = Math.min(gx, gridSize - 1);
        const gy1 = Math.min(gy, gridSize - 1);
        const gx2 = Math.min(gx + 1, gridSize - 1);
        const gy2 = Math.min(gy + 1, gridSize - 1);
        
        // Get indices for surrounding points
        const i1 = gy1 * gridSize + gx1;
        const i2 = gy1 * gridSize + gx2;
        const i3 = gy2 * gridSize + gx1;
        const i4 = gy2 * gridSize + gx2;
        
        // Get amplitudes for interpolation
        const a1 = this.state.pattern.amplitudes[i1];
        const a2 = this.state.pattern.amplitudes[i2];
        const a3 = this.state.pattern.amplitudes[i3];
        const a4 = this.state.pattern.amplitudes[i4];
        
        // Bilinear interpolation factors
        const fx = (x % cellWidth) / cellWidth;
        const fy = (y % cellHeight) / cellHeight;
        
        // Interpolate amplitude
        const amplitude = (
          a1 * (1 - fx) * (1 - fy) +
          a2 * fx * (1 - fy) +
          a3 * (1 - fx) * fy +
          a4 * fx * fy
        ) * this.options.amplitude;
        
        // Set pixel based on amplitude
        const pixelIndex = (y * width + x) * 4;
        
        // Convert amplitude to color based on frequency
        const hue = (this.options.frequency - 426) / 12 * 120;
        const saturation = 80;
        const lightness = 50 + (amplitude * 30);
        
        // Convert HSL to RGB
        const c = (1 - Math.abs(2 * lightness / 100 - 1)) * saturation / 100;
        const x2 = c * (1 - Math.abs((hue / 60) % 2 - 1));
        const m = lightness / 100 - c / 2;
        
        let r, g, b;
        
        if (hue < 60) { r = c; g = x2; b = 0; }
        else if (hue < 120) { r = x2; g = c; b = 0; }
        else if (hue < 180) { r = 0; g = c; b = x2; }
        else if (hue < 240) { r = 0; g = x2; b = c; }
        else if (hue < 300) { r = x2; g = 0; b = c; }
        else { r = c; g = 0; b = x2; }
        
        data[pixelIndex] = Math.round((r + m) * 255);
        data[pixelIndex + 1] = Math.round((g + m) * 255);
        data[pixelIndex + 2] = Math.round((b + m) * 255);
        data[pixelIndex + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }
  
  /**
   * Render particle pattern
   * @private
   */
  _renderParticles() {
    const { ctx } = this.elements;
    const { width, height } = this.options;
    
    // Draw each point as a particle
    for (let i = 0; i < this.state.pattern.points.length; i++) {
      const point = this.state.pattern.points[i];
      const amplitude = this.state.pattern.amplitudes[i] * this.options.amplitude;
      const phase = this.state.pattern.phases[i];
      
      // Skip low amplitude particles
      if (Math.abs(amplitude) < 0.1) continue;
      
      // Calculate color based on phase and amplitude
      const hue = this.options.colorMode === 'frequency'
        ? (this.options.frequency - 426) / 12 * 120
        : (phase / (Math.PI * 2)) * 360;
        
      const saturation = 80;
      const lightness = 50 + (amplitude * 30);
      
      // Draw particle
      const size = 4 * Math.abs(amplitude);
      
      ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.globalAlpha = Math.min(1, Math.abs(amplitude) + 0.2);
      
      ctx.beginPath();
      ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Reset global alpha
    ctx.globalAlpha = 1.0;
  }
  
  /**
   * Update metrics display
   * @private
   */
  _updateMetrics() {
    if (!this.elements.metricsPanel) {
      return;
    }
    
    const metrics = this.getMetrics();
    
    this.elements.metricsPanel.innerHTML = `
      <div><strong>Frequency:</strong> ${metrics.frequency.toFixed(2)} Hz</div>
      <div><strong>Amplitude:</strong> ${metrics.amplitude.toFixed(2)}</div>
      <div><strong>Coherence:</strong> ${this.state.coherence.toFixed(3)}</div>
      <div><strong>Mode:</strong> ${metrics.renderMode}</div>
      <div><strong>FPS:</strong> ${Math.round(1000 / (performance.now() - this.state.lastFrameTime))}</div>
    `;
  }
  
  /**
   * Handle ZEN POINT balance changes from ground state module
   * @param {Object} data - Event data
   * @private
   */
  _handleZenPointChange(data) {
    const { balance, coherence } = data;
    
    // Update visualization coherence
    this.state.coherence = coherence;
    
    // Adjust amplitude based on quantum field strength
    this.setAmplitude(balance.quantum);
  }
  
  /**
   * Clean up the visualization
   */
  destroy() {
    // Stop animation
    this.stop();
    
    // Remove event listeners
    groundStateModule.off('zen-point-change', this._handleZenPointChange);
    
    // Clear container
    if (this.elements.container) {
      this.elements.container.innerHTML = '';
    }
    
    // Reset state
    this.state.initialized = false;
  }
}

// Export as both class and singleton instance
const groundStateVisualization = new GroundStateVisualization();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GroundStateVisualization,
    groundStateVisualization // Singleton instance
  };
} else if (typeof window !== 'undefined') {
  window.GroundStateVisualization = GroundStateVisualization;
  window.groundStateVisualization = groundStateVisualization;
}
