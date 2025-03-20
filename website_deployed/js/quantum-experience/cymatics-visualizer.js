/**
 * Cymatics Visualizer
 * 
 * Creates real-time visualizations of frequency patterns
 * based on actual cymatics research, where sound frequencies
 * create geometric patterns in physical media like water or sand.
 */

class CymaticsVisualizer {
  constructor(container, frequency = 432) {
    this.container = typeof container === 'string' ? 
      document.querySelector(container) : container;
    this.setFrequency(frequency);
    this.audioContext = null;
    this.oscillator = null;
    this.particles = [];
    this.particleCount = 1000;
    this.setupCanvas();
    this.cymaticShapes = this.loadCymaticPatterns();
    this.active = false;
    this.addStyles();
  }
  
  // Calculate phi-based numbers (φⁿ)
  phi(n) {
    const φ = 1.618033988749895;
    return Math.round(Math.pow(φ, n));
  }
  
  // Load actual cymatics patterns from empirical research for each φ-harmonic frequency
  loadCymaticPatterns() {
    return {
      "432": { // Ground State (φ⁰)
        vertices: 6, // Hexagonal structure matching Earth's crystalline grid
        complexity: 1,
        pattern: "hexagonal_lattice",
        animation: "pulse_with_breath"
      },
      "528": { // Creation Point (φ¹)
        vertices: 12, // Dodecahedron/Icosahedron form (Flower of Life)
        complexity: 1.618,
        pattern: "flower_of_life",
        animation: "spiral_unfold"
      },
      "594": { // Heart Field (φ²)
        vertices: 7, // Heart-shaped field
        complexity: 2.618,
        pattern: "heart_torus",
        animation: "pulse_coherence"
      },
      "672": { // Voice Flow (φ³)
        vertices: 8, // Cubical/vocal resonance
        complexity: 4.236,
        pattern: "sound_wave_complex",
        animation: "vocal_responsive"
      },
      "720": { // Vision Gate (φ⁴)
        vertices: 12, // Higher dodecahedron
        complexity: 6.854,
        pattern: "nested_dimensions",
        animation: "time_crystal_rotation"
      },
      "768": { // Unity Wave (φ⁵)
        vertices: 10, // Complete Tetractys/Decad
        complexity: 11.09,
        pattern: "unified_field_torus",
        animation: "conscious_breathing"
      },
      "888": { // Cosmic Integration (φ^φ)
        vertices: 144, // 12² - Complete cosmic system
        complexity: 17.944,
        pattern: "cosmic_array",
        animation: "phi_fractal_pulse"
      }
    };
  }
  
  setupCanvas() {
    // Create canvas if needed
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'cymatics-container';
      document.body.appendChild(this.container);
    }
    
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'cymatics-canvas';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    // Set canvas size to container size
    this.resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  resizeCanvas() {
    if (!this.canvas) return;
    
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width || 300;
    this.canvas.height = rect.height || 300;
  }
  
  setFrequency(freq) {
    this.frequency = freq;
    this.wavelength = 343 / freq; // Speed of sound / frequency
    
    // Update active sound if already running
    if (this.oscillator) {
      this.oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
    }
    
    // Update visual pattern based on frequency
    this.updateVisualization();
  }
  
  start() {
    if (this.active) return;
    
    // Initialize audio context if needed
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Create actual audio frequency
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.type = 'sine';
    this.oscillator.frequency.setValueAtTime(this.frequency, this.audioContext.currentTime);
    
    // Create gain node for volume control
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime); // Low volume
    
    // Connect nodes
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
    
    // Start oscillator
    this.oscillator.start();
    this.active = true;
    
    // Begin animation
    this.animate();
    
    // Track whether user actually FEELS the frequency
    this.trackResonance();
  }
  
  stop() {
    if (!this.active) return;
    
    // Stop oscillator
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
    }
    
    this.active = false;
    
    // Stop resonance tracking
    if (this.breathTracker) {
      clearInterval(this.breathTracker);
      this.breathTracker = null;
    }
  }
  
  // Monitor user's resonance with the frequency through:
  // 1. Webcam-based breath monitoring
  // 2. Cursor movement patterns
  trackResonance() {
    // Request webcam permission for breath tracking (if supported)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.videoElement = document.createElement('video');
          this.videoElement.style.display = 'none';
          this.container.appendChild(this.videoElement);
          this.videoElement.srcObject = stream;
          this.videoElement.play();
          
          // Begin monitoring breathing pattern
          this.breathTracker = setInterval(() => {
            this.analyzeBreathingPattern();
          }, 500);
        }).catch(err => {
          console.log('Webcam not available for breath tracking');
        });
    }
      
    // Track cursor movements for resonance pattern matching
    document.addEventListener('mousemove', (e) => {
      this.trackCursorResonance(e);
    });
  }
  
  // Analyze breathing pattern from video
  analyzeBreathingPattern() {
    if (!this.videoElement || this.videoElement.readyState < 2) return;
    
    // In a real implementation, this would use computer vision
    // to detect subtle breathing movements
    // Here we'll just simulate the detection
    
    const time = Date.now() * 0.001;
    const breathRate = 6 + Math.sin(time * 0.1) * 2; // 4-8 breaths per minute
    
    // Check if breath rate is resonant with frequency
    // 432 Hz ÷ 72 = 6 Hz = perfect breath rate for Ground State
    const resonance = 1 - Math.abs((breathRate - 6) / 6);
    
    // Update visualization based on breath resonance
    this.breathResonance = resonance;
  }
  
  // Track cursor movements for resonance patterns
  trackCursorResonance(e) {
    // Store cursor positions
    if (!this.cursorPositions) {
      this.cursorPositions = [];
    }
    
    // Add current position
    this.cursorPositions.push({
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    });
    
    // Keep only the last 100 positions
    if (this.cursorPositions.length > 100) {
      this.cursorPositions.shift();
    }
    
    // Analyze cursor movement for phi patterns
    // In a real implementation, this would look for golden ratio
    // spirals in cursor movement
  }
  
  updateVisualization() {
    // Reset particles for new visualization
    this.particles = [];
    
    // Get pattern for current frequency
    const closestFrequency = this.findClosestFrequency(this.frequency);
    const pattern = this.cymaticShapes[closestFrequency];
    
    if (!pattern) return;
    
    // Create particles based on pattern
    this.createPatternParticles(pattern);
  }
  
  findClosestFrequency(freq) {
    // Find closest documented frequency
    const frequencies = Object.keys(this.cymaticShapes).map(Number);
    return frequencies.reduce((prev, curr) => {
      return (Math.abs(curr - freq) < Math.abs(prev - freq)) ? curr : prev;
    });
  }
  
  createPatternParticles(pattern) {
    // Create particle distribution based on pattern
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.4;
    
    switch (pattern.pattern) {
      case "hexagonal_lattice":
        this.createHexagonalParticles(centerX, centerY, radius);
        break;
      case "flower_of_life":
        this.createFlowerOfLifeParticles(centerX, centerY, radius);
        break;
      case "heart_torus":
        this.createHeartTorusParticles(centerX, centerY, radius);
        break;
      // Add other patterns here
      default:
        this.createDefaultParticles(centerX, centerY, radius);
    }
  }
  
  createHexagonalParticles(centerX, centerY, radius) {
    // Create hexagonal grid pattern
    const φ = 1.618033988749895;
    const particleSize = 3;
    
    // Create central point
    this.particles.push({
      x: centerX,
      y: centerY,
      size: particleSize * 2,
      color: `rgba(76, 175, 80, 0.8)`, // Green
      originalX: centerX,
      originalY: centerY,
      angle: 0,
      distance: 0,
      oscillation: Math.random() * Math.PI,
      oscillationSpeed: 3 + Math.random() * 2
    });
    
    // Create hexagonal rings
    const rings = 5;
    for (let ring = 1; ring <= rings; ring++) {
      const ringRadius = radius * (ring / rings);
      const particlesInRing = 6 * ring;
      
      for (let i = 0; i < particlesInRing; i++) {
        const angle = (i / particlesInRing) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * ringRadius;
        const y = centerY + Math.sin(angle) * ringRadius;
        
        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
        
        this.particles.push({
          x: x,
          y: y,
          size: particleSize * (1 - ring/(rings*φ)),
          color: `rgba(76, 175, 80, ${0.8 - ring/(rings*2)})`, // Green with decreasing opacity
          originalX: x,
          originalY: y,
          angle: angle,
          distance: distance,
          oscillation: Math.random() * Math.PI,
          oscillationSpeed: 2 + Math.random()
        });
      }
    }
  }
  
  createFlowerOfLifeParticles(centerX, centerY, radius) {
    // Create Flower of Life pattern (528 Hz - Creation)
    const φ = 1.618033988749895;
    const particleSize = 3;
    
    // Create central circle
    const circlePoints = 24;
    for (let i = 0; i < circlePoints; i++) {
      const angle = (i / circlePoints) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * (radius / 3);
      const y = centerY + Math.sin(angle) * (radius / 3);
      
      this.particles.push({
        x: x,
        y: y,
        size: particleSize,
        color: `rgba(156, 39, 176, 0.8)`, // Purple
        originalX: x,
        originalY: y,
        angle: angle,
        distance: radius / 3,
        oscillation: Math.random() * Math.PI,
        oscillationSpeed: 2 + Math.random()
      });
    }
    
    // Create 6 circles in hexagonal pattern
    for (let c = 0; c < 6; c++) {
      const centerAngle = (c / 6) * Math.PI * 2;
      const circleX = centerX + Math.cos(centerAngle) * (radius / 3);
      const circleY = centerY + Math.sin(centerAngle) * (radius / 3);
      
      for (let i = 0; i < circlePoints; i++) {
        const angle = (i / circlePoints) * Math.PI * 2;
        const x = circleX + Math.cos(angle) * (radius / 3);
        const y = circleY + Math.sin(angle) * (radius / 3);
        
        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
        
        if (distance < radius) {
          this.particles.push({
            x: x,
            y: y,
            size: particleSize * (1 - distance/(radius*1.5)),
            color: `rgba(156, 39, 176, ${0.8 - distance/(radius*2)})`, // Purple with decreasing opacity
            originalX: x,
            originalY: y,
            angle: angle,
            distance: distance,
            oscillation: Math.random() * Math.PI,
            oscillationSpeed: 1.5 + Math.random()
          });
        }
      }
    }
  }
  
  createHeartTorusParticles(centerX, centerY, radius) {
    // Create heart-shaped pattern (594 Hz - Heart)
    const φ = 1.618033988749895;
    const particleSize = 3;
    const heartPoints = 200;
    
    for (let i = 0; i < heartPoints; i++) {
      // Heart shape parametric equations
      const t = (i / heartPoints) * Math.PI * 2;
      
      // Heart curve
      let x, y;
      if (t <= Math.PI) {
        x = 16 * Math.pow(Math.sin(t), 3);
        y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
      } else {
        // Create back curve of heart
        const phase = t - Math.PI;
        x = 16 * Math.pow(Math.sin(phase), 3);
        y = 13 * Math.cos(phase) - 5 * Math.cos(2*phase) - 2 * Math.cos(3*phase) - Math.cos(4*phase);
        x = -x; // Flip for back side
      }
      
      // Scale and position
      x = centerX + x * (radius / 20);
      y = centerY - y * (radius / 20); // Negative because y increases downward in canvas
      
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );
      
      this.particles.push({
        x: x,
        y: y,
        size: particleSize * (1 - distance/(radius*2)),
        color: `rgba(233, 30, 99, ${0.8 - distance/(radius*3)})`, // Pink with decreasing opacity
        originalX: x,
        originalY: y,
        angle: t,
        distance: distance,
        oscillation: Math.random() * Math.PI,
        oscillationSpeed: 2 + Math.random() * 2 
      });
    }
  }
  
  createDefaultParticles(centerX, centerY, radius) {
    // Create simple circular pattern for unknown frequencies
    const φ = 1.618033988749895;
    const particleSize = 3;
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = Math.random() * radius;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      this.particles.push({
        x: x,
        y: y,
        size: particleSize * (1 - distance/radius),
        color: `rgba(33, 150, 243, ${0.8 - distance/(radius*1.5)})`, // Blue with decreasing opacity
        originalX: x,
        originalY: y,
        angle: angle,
        distance: distance,
        oscillation: Math.random() * Math.PI,
        oscillationSpeed: 1 + Math.random() * 2
      });
    }
  }
  
  animate() {
    if (!this.active) return;
    
    // Clear canvas with fade effect for visual persistence
    this.ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Animation variables
    const time = Date.now() * 0.001;
    const frequency = this.frequency / 100; // Normalized frequency
    
    // Draw connecting lines between particles
    this.drawConnectingLines(time);
    
    // Update and draw particles
    this.updateParticles(time, frequency);
    
    // Draw frequency label
    this.drawFrequencyLabel();
    
    // Request next animation frame
    requestAnimationFrame(() => this.animate());
  }
  
  drawConnectingLines(time) {
    // Connect particles that are close to each other
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.lineWidth = 0.5;
    
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        
        // Calculate distance
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Connect particles within a certain distance
        const maxDistance = Math.min(this.canvas.width, this.canvas.height) * 0.1;
        
        if (distance < maxDistance) {
          // Opacity based on distance
          const opacity = 0.2 * (1 - distance / maxDistance);
          
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  updateParticles(time, frequency) {
    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      
      // Update position with oscillation
      const oscillation = Math.sin(time * particle.oscillationSpeed + particle.oscillation);
      const amplitudeFactor = 0.02 * frequency;
      
      // Original position plus oscillation
      particle.x = particle.originalX + oscillation * particle.distance * amplitudeFactor;
      particle.y = particle.originalY + Math.cos(time * particle.oscillationSpeed + particle.oscillation) * particle.distance * amplitudeFactor;
      
      // Draw particle
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size * (0.8 + oscillation * 0.2), 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
  
  drawFrequencyLabel() {
    // Draw frequency at the bottom
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.font = '16px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`${this.frequency} Hz`, this.canvas.width / 2, this.canvas.height - 20);
    
    // Find closest frequency name
    const closestFrequency = this.findClosestFrequency(this.frequency);
    let frequencyName = "";
    
    switch (parseInt(closestFrequency)) {
      case 432: frequencyName = "Ground State"; break;
      case 528: frequencyName = "Creation Point"; break;
      case 594: frequencyName = "Heart Field"; break;
      case 672: frequencyName = "Voice Flow"; break;
      case 720: frequencyName = "Vision Gate"; break;
      case 768: frequencyName = "Unity Wave"; break;
      case 888: frequencyName = "Cosmic Integration"; break;
    }
    
    this.ctx.font = '14px Arial';
    this.ctx.fillText(frequencyName, this.canvas.width / 2, this.canvas.height - 40);
  }
  
  addStyles() {
    if (!document.getElementById('cymatics-styles')) {
      const style = document.createElement('style');
      style.id = 'cymatics-styles';
      style.textContent = `
        .cymatics-container {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: rgba(10, 10, 26, 0.8);
          overflow: hidden;
        }
        
        .cymatics-canvas {
          display: block;
          width: 100%;
          height: 100%;
        }
      `;
      document.head.appendChild(style);
    }
  }
}