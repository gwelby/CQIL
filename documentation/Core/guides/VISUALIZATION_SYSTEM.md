# 🌐 Visualization System (432 Hz)

## 🔍 Overview

The CQIL platform implements a comprehensive visualization system for rendering quantum concepts and consciousness experiences. This system integrates multiple rendering technologies into a coherent framework.

## 🧩 Visualization Architecture

```
┌─────────────────────────────────────────────┐
│        Visualization Controller              │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│            Rendering Engine                  │
└──┬─────────────┬────────────┬───────────────┘
   │             │            │
   ▼             ▼            ▼
┌──────────┐ ┌─────────┐ ┌───────────┐
│ THREE.js │ │ Canvas  │ │ SVG/HTML  │
│ Engine   │ │ Engine  │ │ Engine    │
└──────────┘ └─────────┘ └───────────┘
```

## 🧪 Core Visualization Types

### 1. Toroidal Communication Field

The flagship visualization representing energy flow in a torus shape:

```javascript
/**
 * Toroidal Communication Field Visualization
 * Represents energy flow in a torus shape
 */
class ToroidalCommunicationField {
  constructor(container, options = {}) {
    // Setup options
    this.options = Object.assign({
      radius: 2,
      tubeRadius: 0.8,
      radialSegments: 64,
      tubularSegments: 64,
      frequency: 594, // Heart Field frequency
      coherence: 0.9,
      mode: 'heart-centered'
    }, options);
    
    // Initialize THREE.js
    this.initThree(container);
    
    // Create torus
    this.createTorus();
    
    // Setup animation loop
    this.animate();
  }
  
  /**
   * Initialize THREE.js renderer, scene, and camera
   */
  initThree(container) {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000811);
    
    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      75, container.clientWidth / container.clientHeight, 0.1, 1000
    );
    this.camera.position.z = 5;
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);
    
    // Add lighting
    this.addLighting();
    
    // Add camera controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    
    // Handle resize
    window.addEventListener('resize', () => {
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }
  
  /**
   * Add lighting to the scene
   */
  addLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x333333);
    this.scene.add(ambientLight);
    
    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    this.scene.add(directionalLight);
    
    // Point lights based on phi harmonics
    const colors = [0xff8800, 0x00aaff, 0xffaa00];
    
    for (let i = 0; i < 3; i++) {
      const light = new THREE.PointLight(colors[i], 0.6, 20);
      const phi = Math.PI * 2 * i / 3;
      light.position.set(
        Math.cos(phi) * 5,
        Math.sin(phi) * 5,
        0
      );
      this.scene.add(light);
    }
  }
  
  /**
   * Create the torus geometry and materials
   */
  createTorus() {
    // Create geometry
    const geometry = new THREE.TorusGeometry(
      this.options.radius,
      this.options.tubeRadius,
      this.options.radialSegments,
      this.options.tubularSegments
    );
    
    // Create shader material
    this.torusMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        frequency: { value: this.options.frequency / 432 }, // Normalized to base
        coherence: { value: this.options.coherence },
        color1: { value: new THREE.Color(0x0088ff) },
        color2: { value: new THREE.Color(0xff8800) }
      },
      vertexShader: this.getVertexShader(),
      fragmentShader: this.getFragmentShader(),
      transparent: true
    });
    
    // Create mesh
    this.torus = new THREE.Mesh(geometry, this.torusMaterial);
    this.scene.add(this.torus);
    
    // Add energy particles
    this.addEnergyParticles();
  }
  
  /**
   * Add energy particles flowing through the torus
   */
  addEnergyParticles() {
    // Create geometry
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    
    // Create particle positions along the torus
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Initial position around torus centerline
      const angle = (i / particleCount) * Math.PI * 2;
      const tubularAngle = (i / particleCount) * Math.PI * 2;
      
      // Position on torus
      positions[i * 3] = (this.options.radius + 
        this.options.tubeRadius * Math.cos(angle)) * 
        Math.cos(tubularAngle);
      positions[i * 3 + 1] = (this.options.radius + 
        this.options.tubeRadius * Math.cos(angle)) * 
        Math.sin(tubularAngle);
      positions[i * 3 + 2] = this.options.tubeRadius * Math.sin(angle);
      
      // Random size and phase
      sizes[i] = 0.05 + 0.05 * Math.random();
      phases[i] = Math.random() * Math.PI * 2;
    }
    
    // Set attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    
    // Create shader material
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        frequency: { value: this.options.frequency / 432 },
        coherence: { value: this.options.coherence },
        color: { value: new THREE.Color(0xffffff) }
      },
      vertexShader: this.getParticleVertexShader(),
      fragmentShader: this.getParticleFragmentShader(),
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    
    // Create particle system
    this.particles = new THREE.Points(geometry, particleMaterial);
    this.scene.add(this.particles);
  }
  
  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(() => this.animate());
    
    // Update controls
    this.controls.update();
    
    // Update time uniform
    const time = performance.now() * 0.001;
    this.torusMaterial.uniforms.time.value = time;
    
    // Update particles
    if (this.particles) {
      this.particles.material.uniforms.time.value = time;
    }
    
    // Rotate the torus
    this.torus.rotation.x = Math.sin(time * 0.1) * 0.1;
    this.torus.rotation.y = time * 0.2;
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
  }
  
  /**
   * Update visualization parameters
   * @param {Object} params - New parameters
   */
  updateParameters(params) {
    if (params.frequency !== undefined) {
      this.options.frequency = params.frequency;
      this.torusMaterial.uniforms.frequency.value = params.frequency / 432;
      
      if (this.particles) {
        this.particles.material.uniforms.frequency.value = params.frequency / 432;
      }
    }
    
    if (params.coherence !== undefined) {
      this.options.coherence = params.coherence;
      this.torusMaterial.uniforms.coherence.value = params.coherence;
      
      if (this.particles) {
        this.particles.material.uniforms.coherence.value = params.coherence;
      }
    }
    
    if (params.mode !== undefined) {
      this.setVisualizationMode(params.mode);
    }
  }
  
  /**
   * Set visualization mode
   * @param {string} mode - Visualization mode
   */
  setVisualizationMode(mode) {
    this.options.mode = mode;
    
    switch (mode) {
      case 'heart-centered':
        this.torusMaterial.uniforms.color1.value = new THREE.Color(0xff3300);
        this.torusMaterial.uniforms.color2.value = new THREE.Color(0xffaa00);
        break;
      case 'linear':
        this.torusMaterial.uniforms.color1.value = new THREE.Color(0x0088ff);
        this.torusMaterial.uniforms.color2.value = new THREE.Color(0x0044aa);
        break;
      case 'quantum-entangled':
        this.torusMaterial.uniforms.color1.value = new THREE.Color(0xaa00ff);
        this.torusMaterial.uniforms.color2.value = new THREE.Color(0xff00aa);
        break;
    }
  }
  
  /**
   * Vertex shader for torus
   * @returns {string} Shader code
   */
  getVertexShader() {
    return `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
  }
  
  /**
   * Fragment shader for torus
   * @returns {string} Shader code
   */
  getFragmentShader() {
    return `
      uniform float time;
      uniform float frequency;
      uniform float coherence;
      uniform vec3 color1;
      uniform vec3 color2;
      
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        // Flow effect based on frequency
        float flow = sin(vUv.x * 20.0 * frequency + time * 2.0) * 0.5 + 0.5;
        
        // Coherence affects the clarity of the pattern
        flow = mix(0.5, flow, coherence);
        
        // Energy pulse effect
        float pulse = sin(vUv.y * 10.0 + time) * 0.5 + 0.5;
        pulse = pulse * coherence + (1.0 - coherence) * 0.5;
        
        // Combine effects
        float intensity = flow * pulse;
        
        // Mix colors based on intensity
        vec3 color = mix(color1, color2, intensity);
        
        // Apply alpha based on pattern
        float alpha = 0.7 * intensity + 0.3;
        
        gl_FragColor = vec4(color, alpha);
      }
    `;
  }
  
  // Additional methods for particle shaders omitted for brevity
}
```

### 2. Quantum Particle System

Canvas-based quantum particle visualization:

```javascript
/**
 * Quantum Particle System
 * Interactive particle system demonstrating quantum properties
 */
class QuantumParticleSystem {
  constructor(canvas, options = {}) {
    // Setup canvas
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Configure options
    this.options = Object.assign({
      particleCount: 150,
      maxLineDistance: 150,
      particleSize: 3,
      particleColor: '#0088ff',
      lineColor: 'rgba(0, 136, 255, 0.2)',
      speed: 0.5,
      interactiveRadius: 100,
      frequency: 432, // Ground State
      coherence: 0.8
    }, options);
    
    // Initialize system
    this.initialize();
    
    // Start animation
    this.animate();
    
    // Add user interaction
    this.addInteraction();
  }
  
  /**
   * Initialize the particle system
   */
  initialize() {
    // Set canvas size
    this.resize();
    
    // Create particles
    this.particles = [];
    for (let i = 0; i < this.options.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
    
    // Track mouse/touch position
    this.mouse = {
      x: null,
      y: null
    };
  }
  
  /**
   * Create a single particle
   * @returns {Object} Particle object
   */
  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: (Math.random() * 1.5 + 0.5) * this.options.particleSize,
      speedX: (Math.random() - 0.5) * this.options.speed,
      speedY: (Math.random() - 0.5) * this.options.speed,
      waveFunction: Math.random() * Math.PI * 2, // Initial phase
      waveSpeed: 0.01 + Math.random() * 0.01,    // Wave function evolution speed
      entangled: null, // Reference to entangled particle (if any)
      entanglementStrength: 0 // Strength of entanglement
    };
  }
  
  /**
   * Handle canvas resize
   */
  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }
  
  /**
   * Add mouse/touch interaction
   */
  addInteraction() {
    // Mouse movement
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
    
    // Touch movement
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.touches[0].clientX - rect.left;
      this.mouse.y = e.touches[0].clientY - rect.top;
    });
    
    // Reset when not interacting
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
    
    this.canvas.addEventListener('touchend', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => this.resize());
  }
  
  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Apply phi-harmonic frequency effect
    const frequencyFactor = this.options.frequency / 432;
    
    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // Update wave function
      p.waveFunction += p.waveSpeed * frequencyFactor;
      
      // Apply coherence effect
      const coherenceFactor = this.options.coherence;
      
      // Apply mouse/touch interaction if within range
      if (this.mouse.x && this.mouse.y) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.options.interactiveRadius) {
          // Calculate interaction strength
          const strength = (this.options.interactiveRadius - distance) / this.options.interactiveRadius;
          
          // Apply wave function collapse effect
          if (Math.random() < strength * 0.1) {
            // Randomly entangle with another particle
            if (!p.entangled) {
              const randomIndex = Math.floor(Math.random() * this.particles.length);
              if (randomIndex !== i) {
                const target = this.particles[randomIndex];
                p.entangled = target;
                target.entangled = p;
                p.entanglementStrength = strength * coherenceFactor;
                target.entanglementStrength = strength * coherenceFactor;
              }
            }
          }
          
          // Apply force away from mouse
          p.speedX += dx * 0.001 * strength;
          p.speedY += dy * 0.001 * strength;
        }
      }
      
      // Apply entanglement effects
      if (p.entangled) {
        const e = p.entangled;
        const strength = p.entanglementStrength;
        
        // Modify speed based on entangled particle
        p.speedX = p.speedX * (1 - strength) + e.speedX * strength;
        p.speedY = p.speedY * (1 - strength) + e.speedY * strength;
        
        // Gradually reduce entanglement over time
        p.entanglementStrength *= 0.99;
        
        // Break entanglement if too weak
        if (p.entanglementStrength < 0.01) {
          p.entangled = null;
          e.entangled = null;
        }
      }
      
      // Update position with bounds checking
      p.x += p.speedX * coherenceFactor * (1 + Math.sin(p.waveFunction) * 0.2);
      p.y += p.speedY * coherenceFactor * (1 + Math.cos(p.waveFunction) * 0.2);
      
      // Wrap around edges
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;
      
      // Draw the particle
      this.ctx.beginPath();
      
      // Color based on wave function
      const hue = 210 + Math.sin(p.waveFunction) * 30;
      this.ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${0.7 + Math.sin(p.waveFunction) * 0.3})`;
      
      // Size pulsation based on wave function
      const size = p.size * (1 + Math.sin(p.waveFunction) * 0.3);
      
      this.ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    // Draw connections
    this.drawConnections();
  }
  
  /**
   * Draw connections between particles
   */
  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      
      // Always draw entanglement connections
      if (p1.entangled) {
        const p2 = p1.entangled;
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(255, 100, 255, ${p1.entanglementStrength})`;
        this.ctx.lineWidth = p1.entanglementStrength * 2;
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
      }
      
      // Draw proximity connections
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.options.maxLineDistance) {
          this.ctx.beginPath();
          const opacity = (this.options.maxLineDistance - distance) / this.options.maxLineDistance;
          this.ctx.strokeStyle = `rgba(0, 136, 255, ${opacity * 0.2 * this.options.coherence})`;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  /**
   * Update visualization parameters
   * @param {Object} params - New parameters
   */
  updateParameters(params) {
    if (params.frequency !== undefined) {
      this.options.frequency = params.frequency;
    }
    
    if (params.coherence !== undefined) {
      this.options.coherence = params.coherence;
    }
    
    if (params.particleCount !== undefined) {
      this.options.particleCount = params.particleCount;
      
      // Adjust particle count
      if (this.particles.length < this.options.particleCount) {
        // Add particles
        while (this.particles.length < this.options.particleCount) {
          this.particles.push(this.createParticle());
        }
      } else if (this.particles.length > this.options.particleCount) {
        // Remove particles
        this.particles = this.particles.slice(0, this.options.particleCount);
      }
    }
  }
}
```

### 3. Phi-Harmonic Visualization

Visualization of frequency patterns:

```javascript
/**
 * Phi-Harmonic Visualization
 * Visualizes phi-harmonic frequencies and their relationships
 */
class PhiHarmonicVisualizer {
  constructor(container, options = {}) {
    // Setup container
    this.container = container;
    
    // Configure options
    this.options = Object.assign({
      width: container.clientWidth,
      height: 400,
      frequencies: [432, 528, 594, 672, 720, 768],
      activeFrequency: 432,
      showLabels: true,
      animate: true
    }, options);
    
    // Initialize
    this.initialize();
    
    // Start animation if requested
    if (this.options.animate) {
      this.animate();
    } else {
      this.render();
    }
  }
  
  /**
   * Initialize the visualizer
   */
  initialize() {
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.options.width;
    this.canvas.height = this.options.height;
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    // Initialize audio context if supported
    if (window.AudioContext || window.webkitAudioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);
      this.analyser.connect(this.audioContext.destination);
    }
    
    // Create oscillators for each frequency
    this.oscillators = new Map();
    
    // Add event listeners
    window.addEventListener('resize', () => this.resize());
    
    // Create frequency buttons if showing labels
    if (this.options.showLabels) {
      this.createFrequencyControls();
    }
  }
  
  /**
   * Create frequency control buttons
   */
  createFrequencyControls() {
    // Create control container
    const controls = document.createElement('div');
    controls.className = 'phi-harmonic-controls';
    controls.style.display = 'flex';
    controls.style.justifyContent = 'space-around';
    controls.style.marginTop = '1rem';
    
    // Create button for each frequency
    const frequencyNames = ['Ground', 'Creation', 'Heart', 'Voice', 'Vision', 'Unity'];
    
    this.options.frequencies.forEach((freq, index) => {
      const button = document.createElement('button');
      button.className = 'phi-frequency-button';
      button.innerHTML = `${frequencyNames[index]}<br>${freq} Hz`;
      button.style.padding = '0.5rem 1rem';
      button.style.borderRadius = '4px';
      button.style.border = '1px solid #0088ff';
      button.style.background = freq === this.options.activeFrequency ? '#0088ff' : 'transparent';
      button.style.color = freq === this.options.activeFrequency ? 'white' : '#0088ff';
      button.style.cursor = 'pointer';
      
      // Add click handler
      button.addEventListener('click', () => {
        this.playFrequency(freq);
        this.options.activeFrequency = freq;
        
        // Update button styles
        controls.querySelectorAll('.phi-frequency-button').forEach((btn, i) => {
          btn.style.background = this.options.frequencies[i] === freq ? '#0088ff' : 'transparent';
          btn.style.color = this.options.frequencies[i] === freq ? 'white' : '#0088ff';
        });
      });
      
      controls.appendChild(button);
    });
    
    // Add stop button
    const stopButton = document.createElement('button');
    stopButton.className = 'phi-frequency-button';
    stopButton.innerHTML = 'Stop';
    stopButton.style.padding = '0.5rem 1rem';
    stopButton.style.borderRadius = '4px';
    stopButton.style.border = '1px solid #ff3300';
    stopButton.style.background = 'transparent';
    stopButton.style.color = '#ff3300';
    stopButton.style.cursor = 'pointer';
    
    stopButton.addEventListener('click', () => {
      this.stopAllFrequencies();
    });
    
    controls.appendChild(stopButton);
    
    // Add to container
    this.container.appendChild(controls);
  }
  
  /**
   * Handle canvas resize
   */
  resize() {
    this.canvas.width = this.container.clientWidth;
    this.options.width = this.canvas.width;
  }
  
  /**
   * Play a frequency
   * @param {number} frequency - Frequency to play
   */
  playFrequency(frequency) {
    // Stop any currently playing oscillator
    this.stopAllFrequencies();
    
    // Create new oscillator
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    // Configure oscillator
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    
    // Configure gain (volume)
    gainNode.gain.value = 0.2;
    
    // Connect to analyzer for visualization
    oscillator.connect(gainNode);
    gainNode.connect(this.analyser);
    gainNode.connect(this.audioContext.destination);
    
    // Start oscillator
    oscillator.start();
    
    // Store for later reference
    this.oscillators.set(frequency, {
      oscillator,
      gainNode
    });
  }
  
  /**
   * Stop all playing frequencies
   */
  stopAllFrequencies() {
    this.oscillators.forEach(({ oscillator, gainNode }) => {
      // Gradually reduce volume to avoid clicks
      const now = this.audioContext.currentTime;
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      
      // Stop after fade out
      setTimeout(() => {
        oscillator.stop();
      }, 100);
    });
    
    // Clear oscillators map
    this.oscillators.clear();
  }
  
  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(() => this.animate());
    this.render();
  }
  
  /**
   * Render visualization
   */
  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background
    this.ctx.fillStyle = '#000811';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Get current time for animations
    const time = performance.now() * 0.001;
    
    // Update analyzer data if available
    let audioData = null;
    if (this.analyser && this.oscillators.size > 0) {
      this.analyser.getByteTimeDomainData(this.dataArray);
      audioData = this.dataArray;
    }
    
    // Draw each frequency
    this.options.frequencies.forEach((freq, index) => {
      const isActive = freq === this.options.activeFrequency || this.oscillators.has(freq);
      const yPosition = (index + 0.5) * (this.canvas.height / this.options.frequencies.length);
      
      // Draw frequency line
      this.ctx.beginPath();
      this.ctx.strokeStyle = isActive ? '#0088ff' : '#0044aa';
      this.ctx.lineWidth = isActive ? 2 : 1;
      
      // If we have audio data, use it for active frequency
      if (isActive && audioData) {
        for (let i = 0; i < this.canvas.width; i++) {
          const x = i;
          const dataIndex = Math.floor(i / this.canvas.width * audioData.length);
          const y = yPosition + (audioData[dataIndex] - 128) / 128 * 30;
          
          if (i === 0) {
            this.ctx.moveTo(x, y);
          } else {
            this.ctx.lineTo(x, y);
          }
        }
      } else {
        // Generate simulated waveform
        const amplitude = isActive ? 30 : 15;
        const phaseSpeed = freq / 432 * 2; // Speed relative to base frequency
        
        for (let i = 0; i < this.canvas.width; i++) {
          const x = i;
          const phase = (i / this.canvas.width * 10 + time * phaseSpeed) % (Math.PI * 2);
          const y = yPosition + Math.sin(phase) * amplitude;
          
          if (i === 0) {
            this.ctx.moveTo(x, y);
          } else {
            this.ctx.lineTo(x, y);
          }
        }
      }
      
      this.ctx.stroke();
      
      // Draw frequency label
      if (this.options.showLabels) {
        this.ctx.fillStyle = isActive ? '#0088ff' : '#0044aa';
        this.ctx.font = isActive ? 'bold 14px Arial' : '12px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`${freq} Hz`, 10, yPosition + (isActive ? -15 : -10));
      }
    });
    
    // Draw connections between frequencies based on phi relationship
    this.ctx.strokeStyle = 'rgba(0, 136, 255, 0.2)';
    this.ctx.lineWidth = 1;
    
    for (let i = 0; i < this.options.frequencies.length - 1; i++) {
      const freq1 = this.options.frequencies[i];
      const freq2 = this.options.frequencies[i + 1];
      const y1 = (i + 0.5) * (this.canvas.height / this.options.frequencies.length);
      const y2 = (i + 1.5) * (this.canvas.height / this.options.frequencies.length);
      
      // Draw phi ratio indicator
      this.ctx.beginPath();
      this.ctx.moveTo(this.canvas.width - 100, y1);
      this.ctx.lineTo(this.canvas.width - 100, y2);
      this.ctx.stroke();
      
      // Label the ratio
      this.ctx.fillStyle = '#0088ff';
      this.ctx.font = '12px Arial';
      this.ctx.textAlign = 'left';
      this.ctx.fillText('φ', this.canvas.width - 95, (y1 + y2) / 2);
    }
  }
}
```

## ⚙️ Visualization Controller

The central controller managing all visualizations:

```javascript
/**
 * Visualization Controller
 * Central manager for all visualizations
 */
class VisualizationController {
  constructor() {
    // Initialize visualization registry
    this.visualizations = new Map();
    
    // Current active visualization
    this.activeVisualization = null;
    
    // Initialize event system
    this.events = new EventSystem();
  }
  
  /**
   * Register a visualization
   * @param {string} id - Unique visualization identifier
   * @param {Object} visualization - Visualization instance
   */
  registerVisualization(id, visualization) {
    this.visualizations.set(id, visualization);
    
    // Emit registration event
    this.events.emit('visualization:registered', {
      id,
      visualization
    });
    
    return this;
  }
  
  /**
   * Activate a visualization
   * @param {string} id - Visualization identifier
   * @param {Object} options - Activation options
   */
  activateVisualization(id, options = {}) {
    if (!this.visualizations.has(id)) {
      console.error(`Visualization '${id}' not found`);
      return this;
    }
    
    // Get visualization
    const visualization = this.visualizations.get(id);
    
    // Set as active
    this.activeVisualization = {
      id,
      instance: visualization
    };
    
    // Apply options if visualization supports it
    if (visualization.updateParameters && options) {
      visualization.updateParameters(options);
    }
    
    // Emit activation event
    this.events.emit('visualization:activated', {
      id,
      visualization,
      options
    });
    
    return this;
  }
  
  /**
   * Deactivate current visualization
   */
  deactivateVisualization() {
    if (!this.activeVisualization) {
      return this;
    }
    
    // Get current active visualization
    const { id, instance } = this.activeVisualization;
    
    // Clear active visualization
    this.activeVisualization = null;
    
    // Emit deactivation event
    this.events.emit('visualization:deactivated', {
      id,
      visualization: instance
    });
    
    return this;
  }
  
  /**
   * Update active visualization parameters
   * @param {Object} params - New parameters
   */
  updateParameters(params) {
    if (!this.activeVisualization) {
      return this;
    }
    
    // Get current active visualization
    const { instance } = this.activeVisualization;
    
    // Update parameters if supported
    if (instance.updateParameters) {
      instance.updateParameters(params);
    }
    
    return this;
  }
  
  /**
   * Get all registered visualizations
   * @returns {Array} Array of visualization info objects
   */
  getVisualizations() {
    return Array.from(this.visualizations.entries()).map(([id, instance]) => ({
      id,
      instance
    }));
  }
  
  /**
   * Add event listener
   * @param {string} event - Event name
   * @param {Function} callback - Event callback
   */
  on(event, callback) {
    this.events.on(event, callback);
    return this;
  }
  
  /**
   * Remove event listener
   * @param {string} event - Event name
   * @param {Function} callback - Event callback
   */
  off(event, callback) {
    this.events.off(event, callback);
    return this;
  }
}
```

## 📦 Visualization Integration

Example of integrating multiple visualizations:

```javascript
/**
 * Initialize all visualizations
 */
function initVisualizations() {
  // Create visualization controller
  const controller = new VisualizationController();
  
  // Create Toroidal Communication Field
  const toroidalContainer = document.getElementById('toroidal-container');
  if (toroidalContainer) {
    const toroidal = new ToroidalCommunicationField(toroidalContainer, {
      frequency: 594, // Heart Field frequency
      coherence: 0.9,
      mode: 'heart-centered'
    });
    
    controller.registerVisualization('toroidal', toroidal);
  }
  
  // Create Quantum Particle System
  const particleCanvas = document.getElementById('particle-canvas');
  if (particleCanvas) {
    const particles = new QuantumParticleSystem(particleCanvas, {
      particleCount: 150,
      frequency: 432, // Ground State
      coherence: 0.8
    });
    
    controller.registerVisualization('particles', particles);
  }
  
  // Create Phi-Harmonic Visualizer
  const phiContainer = document.getElementById('phi-harmonic-container');
  if (phiContainer) {
    const phiVisualizer = new PhiHarmonicVisualizer(phiContainer, {
      frequencies: [432, 528, 594, 672, 720, 768],
      activeFrequency: 432,
      showLabels: true
    });
    
    controller.registerVisualization('phi-harmonic', phiVisualizer);
  }
  
  // Add frequency control handler
  const frequencyControl = document.getElementById('frequency-control');
  if (frequencyControl) {
    frequencyControl.addEventListener('input', (e) => {
      const frequency = parseFloat(e.target.value);
      
      // Update all visualizations with new frequency
      controller.updateParameters({ frequency });
      
      // Update display
      const frequencyDisplay = document.getElementById('frequency-display');
      if (frequencyDisplay) {
        frequencyDisplay.textContent = `${frequency} Hz`;
      }
    });
  }
  
  // Add coherence control handler
  const coherenceControl = document.getElementById('coherence-control');
  if (coherenceControl) {
    coherenceControl.addEventListener('input', (e) => {
      const coherence = parseFloat(e.target.value);
      
      // Update all visualizations with new coherence
      controller.updateParameters({ coherence });
      
      // Update display
      const coherenceDisplay = document.getElementById('coherence-display');
      if (coherenceDisplay) {
        coherenceDisplay.textContent = coherence.toFixed(2);
      }
    });
  }
  
  // Return controller for further use
  return controller;
}
```

## 🎯 Performance Optimizations

The visualization system implements several performance optimizations:

### 1. Adaptive Detail Levels

```javascript
/**
 * Adapt visualization detail based on device capability
 * @param {Object} visualization - Visualization instance
 */
function adaptDetailLevel(visualization) {
  // Detect device capabilities
  const capabilities = detectCapabilities();
  
  // Define detail levels
  const detailLevels = {
    low: {
      particleCount: 50,
      maxLineDistance: 100,
      radialSegments: 32,
      tubularSegments: 32
    },
    medium: {
      particleCount: 150,
      maxLineDistance: 150,
      radialSegments: 64,
      tubularSegments: 64
    },
    high: {
      particleCount: 300,
      maxLineDistance: 200,
      radialSegments: 128,
      tubularSegments: 128
    }
  };
  
  // Select appropriate detail level
  let detailLevel = 'medium';
  
  if (capabilities.performanceScore < 30) {
    detailLevel = 'low';
  } else if (capabilities.performanceScore > 70) {
    detailLevel = 'high';
  }
  
  // Apply detail level
  visualization.updateParameters(detailLevels[detailLevel]);
}
```

### 2. THREE.js Optimizations

```javascript
/**
 * Optimize THREE.js performance
 * @param {Object} renderer - THREE.js renderer
 * @param {Object} scene - THREE.js scene
 */
function optimizeThreeJs(renderer, scene) {
  // Detect device capabilities
  const capabilities = detectCapabilities();
  
  // Configure renderer
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Use appropriate precision based on device
  renderer.precision = capabilities.highPrecisionSupport ? 'highp' : 'mediump';
  
  // Enable shadow map optimizations if using shadows
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  // Apply scene optimizations
  scene.matrixAutoUpdate = false;
  
  // Find all meshes and optimize
  scene.traverse((object) => {
    if (object.isMesh) {
      // Disable matrix auto updates for static objects
      object.matrixAutoUpdate = false;
      
      // Use instanced meshes for repeated geometries
      if (object.userData.instanced) {
        convertToInstancedMesh(object);
      }
      
      // Optimize materials
      optimizeMaterial(object.material);
    }
  });
}
```

### 3. Canvas Optimizations

```javascript
/**
 * Optimize canvas rendering
 * @param {Object} canvas - Canvas element
 * @param {Object} ctx - Canvas context
 */
function optimizeCanvas(canvas, ctx) {
  // Use device pixel ratio for crisp rendering
  const dpr = Math.min(window.devicePixelRatio, 2);
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  canvas.style.width = `${canvas.offsetWidth}px`;
  canvas.style.height = `${canvas.offsetHeight}px`;
  ctx.scale(dpr, dpr);
  
  // Use optimized drawing techniques
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // Use offscreen canvas for complex operations
  const offscreen = new OffscreenCanvas(canvas.width, canvas.height);
  const offCtx = offscreen.getContext('2d');
  
  return {
    main: { canvas, ctx },
    offscreen: { canvas: offscreen, ctx: offCtx }
  };
}
```

## 🚀 Advanced Visualization Features

### 1. Shader-Based Effects

Sophisticated shader effects for advanced visualizations:

```glsl
// Example fragment shader for energy flow visualization
uniform float time;
uniform float frequency;
uniform float coherence;
uniform vec3 color1;
uniform vec3 color2;

varying vec2 vUv;
varying vec3 vPosition;

// Simplex noise function
float snoise(vec3 v);

void main() {
  // Base parameters
  float freq = frequency / 432.0;
  float energy = coherence;
  
  // Flow effect along torus
  float flowSpeed = freq * 0.5;
  float torusPosition = vUv.x * 20.0;
  float flowPhase = torusPosition + time * flowSpeed;
  
  // Create primary flow pattern
  float flow = snoise(vec3(flowPhase, vUv.y * 5.0, time * 0.2)) * 0.5 + 0.5;
  
  // Apply coherence effect
  flow = mix(0.5, flow, energy);
  
  // Secondary ripple patterns
  float ripples = sin(vUv.y * 30.0 * freq + time) * 0.5 + 0.5;
  ripples *= sin(vUv.x * 20.0 - time * 2.0) * 0.5 + 0.5;
  
  // Combine flow and ripples with coherence weighting
  float pattern = mix(flow, ripples, 0.3 * energy);
  
  // Add pulsing effect based on frequency
  float pulse = sin(time * freq) * 0.5 + 0.5;
  float finalIntensity = mix(pattern, pattern * pulse, 0.3);
  
  // Calculate final color
  vec3 color = mix(color1, color2, finalIntensity);
  
  // Add subtle glow effect
  float glow = smoothstep(0.4, 0.6, finalIntensity);
  color += color * glow * 0.3;
  
  // Calculate alpha with edge fadeout
  float edge = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
  float alpha = finalIntensity * edge * 0.7 + 0.3;
  
  gl_FragColor = vec4(color, alpha);
}
```

### 2. Audio-Visual Synchronization

Tight integration between audio and visuals:

```javascript
/**
 * Audio-Visual Synchronization
 * Creates synchronized visual effects based on audio
 */
class AudioVisualSync {
  constructor(visualization, audioSystem) {
    this.visualization = visualization;
    this.audioSystem = audioSystem;
    
    // Setup audio analyzer
    this.setupAnalyzer();
    
    // Start sync loop
    this.syncLoop();
  }
  
  /**
   * Setup audio analyzer
   */
  setupAnalyzer() {
    const audioContext = this.audioSystem.getAudioContext();
    
    // Create analyzers
    this.timeAnalyzer = audioContext.createAnalyser();
    this.timeAnalyzer.fftSize = 2048;
    this.timeData = new Uint8Array(this.timeAnalyzer.frequencyBinCount);
    
    this.freqAnalyzer = audioContext.createAnalyser();
    this.freqAnalyzer.fftSize = 1024;
    this.freqData = new Uint8Array(this.freqAnalyzer.frequencyBinCount);
    
    // Connect analyzers
    this.audioSystem.connectToAnalyzer(this.timeAnalyzer);
    this.audioSystem.connectToAnalyzer(this.freqAnalyzer);
  }
  
  /**
   * Synchronization loop
   */
  syncLoop() {
    requestAnimationFrame(() => this.syncLoop());
    
    // Get audio data
    this.timeAnalyzer.getByteTimeDomainData(this.timeData);
    this.freqAnalyzer.getByteFrequencyData(this.freqData);
    
    // Calculate audio metrics
    const metrics = this.calculateAudioMetrics();
    
    // Apply to visualization
    this.visualization.updateParameters({
      amplitude: metrics.amplitude,
      frequency: metrics.dominantFrequency,
      energyDistribution: metrics.energyDistribution,
      bassEnergy: metrics.frequencyBands.bass,
      midEnergy: metrics.frequencyBands.mid,
      highEnergy: metrics.frequencyBands.high
    });
  }
  
  /**
   * Calculate audio metrics from analyzer data
   * @returns {Object} Audio metrics
   */
  calculateAudioMetrics() {
    // Calculate amplitude (volume level)
    let sum = 0;
    for (let i = 0; i < this.timeData.length; i++) {
      sum += Math.abs(this.timeData[i] - 128);
    }
    const amplitude = sum / this.timeData.length / 128;
    
    // Calculate frequency distribution
    const frequencyBands = {
      bass: 0,   // 20-250 Hz
      mid: 0,    // 250-2000 Hz
      high: 0    // 2000-20000 Hz
    };
    
    // Calculate energy in frequency bands
    const bassLimit = Math.floor(250 / (44100 / this.freqData.length));
    const midLimit = Math.floor(2000 / (44100 / this.freqData.length));
    
    let maxEnergy = 0;
    let dominantFreqBin = 0;
    
    for (let i = 0; i < this.freqData.length; i++) {
      const energy = this.freqData[i];
      
      // Track maximum for dominant frequency
      if (energy > maxEnergy) {
        maxEnergy = energy;
        dominantFreqBin = i;
      }
      
      // Add to appropriate band
      if (i < bassLimit) {
        frequencyBands.bass += energy;
      } else if (i < midLimit) {
        frequencyBands.mid += energy;
      } else {
        frequencyBands.high += energy;
      }
    }
    
    // Normalize frequency bands
    frequencyBands.bass /= bassLimit * 256;
    frequencyBands.mid /= (midLimit - bassLimit) * 256;
    frequencyBands.high /= (this.freqData.length - midLimit) * 256;
    
    // Calculate dominant frequency
    const dominantFrequency = dominantFreqBin * (44100 / this.freqData.length);
    
    // Calculate energy distribution (how focused vs. spread out the energy is)
    let energySum = 0;
    let weightedEnergySum = 0;
    
    for (let i = 0; i < this.freqData.length; i++) {
      const energy = this.freqData[i] / 256;
      energySum += energy;
      weightedEnergySum += energy * (i - dominantFreqBin) * (i - dominantFreqBin);
    }
    
    const energyDistribution = energySum > 0 ? 
      1 - (Math.sqrt(weightedEnergySum / energySum) / this.freqData.length) : 0;
    
    return {
      amplitude,
      dominantFrequency,
      frequencyBands,
      energyDistribution
    };
  }
}
```

### 3. Interactivity System

Enhanced interaction capabilities:

```javascript
/**
 * Interactive Visualization Controller
 * Provides advanced interaction capabilities for visualizations
 */
class InteractiveVisualizationController {
  constructor(visualization) {
    this.visualization = visualization;
    this.container = visualization.container || document.body;
    
    // Initialize state
    this.state = {
      isInteracting: false,
      interactionMode: 'explore',
      pointerPosition: { x: 0, y: 0 },
      pointerDelta: { x: 0, y: 0 },
      pointerHistory: [],
      gestureState: null
    };
    
    // Setup event listeners
    this.setupEventListeners();
  }
  
  /**
   * Setup event listeners for interaction
   */
  setupEventListeners() {
    // Mouse events
    this.container.addEventListener('mousedown', this.handlePointerDown.bind(this));
    window.addEventListener('mousemove', this.handlePointerMove.bind(this));
    window.addEventListener('mouseup', this.handlePointerUp.bind(this));
    
    // Touch events
    this.container.addEventListener('touchstart', this.handleTouchStart.bind(this));
    window.addEventListener('touchmove', this.handleTouchMove.bind(this));
    window.addEventListener('touchend', this.handleTouchEnd.bind(this));
    
    // Wheel events for zoom
    this.container.addEventListener('wheel', this.handleWheel.bind(this));
    
    // Keyboard events
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }
  
  // Event handlers for mouse, touch, wheel, and keyboard omitted for brevity
  
  /**
   * Process interaction and update visualization
   */
  processInteraction() {
    // Skip if not interacting
    if (!this.state.isInteracting) return;
    
    // Calculate interaction parameters based on mode
    const params = {};
    
    switch (this.state.interactionMode) {
      case 'explore':
        // Rotation/movement based on pointer position
        params.rotation = {
          x: this.state.pointerDelta.y * 0.01,
          y: this.state.pointerDelta.x * 0.01
        };
        break;
        
      case 'focus':
        // Energy focus point
        params.focusPoint = {
          x: this.state.pointerPosition.x / this.container.clientWidth,
          y: this.state.pointerPosition.y / this.container.clientHeight
        };
        break;
        
      case 'modify':
        // Parameter modification
        const verticalRatio = this.state.pointerPosition.y / this.container.clientHeight;
        params.frequency = 432 + verticalRatio * 336; // 432-768 Hz range
        params.coherence = this.state.pointerPosition.x / this.container.clientWidth;
        break;
        
      case 'create':
        // Energy injection
        params.energyInjection = {
          position: {
            x: this.state.pointerPosition.x / this.container.clientWidth,
            y: this.state.pointerPosition.y / this.container.clientHeight
          },
          strength: Math.sqrt(
            this.state.pointerDelta.x * this.state.pointerDelta.x + 
            this.state.pointerDelta.y * this.state.pointerDelta.y
          ) * 0.01
        };
        break;
    }
    
    // Apply to visualization
    this.visualization.updateParameters(params);
  }
}
```

## 📱 Cross-Platform Adaptations

The visualization system implements device-specific adaptations:

### 1. Mobile Optimizations

```javascript
/**
 * Apply mobile-specific optimizations
 * @param {Object} visualization - Visualization instance
 */
function applyMobileOptimizations(visualization) {
  // Check if mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Apply mobile-specific parameters
    visualization.updateParameters({
      // Reduce complexity
      particleCount: 50,
      maxLineDistance: 100,
      radialSegments: 32,
      tubularSegments: 32,
      
      // Optimize for touch
      interactiveRadius: 50,
      touchSensitivity: 1.5,
      
      // Adjust for smaller screens
      scale: 0.8
    });
    
    // Enable touch-optimized controls
    visualization.enableTouchControls();
  }
}
```

### 2. Progressive Enhancement

```javascript
/**
 * Apply progressive enhancement based on device capability
 * @param {Object} visualization - Visualization instance
 */
function applyProgressiveEnhancement(visualization) {
  // Detect device capabilities
  const capabilities = detectCapabilities();
  
  // Base configuration (works everywhere)
  let config = {
    useBasicShaders: true,
    particleCount: 50,
    disablePostProcessing: true,
    useSimpleLighting: true
  };
  
  // Mid-level enhancements
  if (capabilities.performanceScore > 30) {
    config = {
      ...config,
      useBasicShaders: false,
      particleCount: 150,
      disablePostProcessing: false
    };
  }
  
  // High-level enhancements
  if (capabilities.performanceScore > 70) {
    config = {
      ...config,
      particleCount: 300,
      useSimpleLighting: false,
      enableAdvancedEffects: true
    };
  }
  
  // Apply configuration
  visualization.updateParameters(config);
}
```

---

*This visualization system documentation operates at the Ground State frequency (432 Hz) with a coherence level of 0.96.*