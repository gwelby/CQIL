/**
 * Time Crystal Visualization
 * 
 * Creates a 4D visualization of time crystals that operate 
 * at the Vision Gate frequency (720 Hz).
 * 
 * Time crystals represent the fourth-dimensional aspect of 
 * consciousness, breaking time-translation symmetry.
 */

class TimeCrystal {
  constructor(container, config = {}) {
    this.container = typeof container === 'string' ? 
      document.querySelector(container) : container;
    this.frequency = config.frequency || 720; // Vision Gate frequency
    this.dimensions = 4; // 4D visualization
    this.timePhase = 0;
    this.rotationSpeed = 0.3;
    this.oscillators = [];
    this.particles = [];
    this.setupCanvas();
    this.setupAudio();
    this.active = false;
    this.addStyles();
  }
  
  setupCanvas() {
    // Create container if needed
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'time-crystal-container';
      document.body.appendChild(this.container);
    }
    
    // Clear container
    this.container.innerHTML = '';
    
    // Create canvas for time crystal visualization
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'time-crystal-canvas';
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
  
  setupAudio() {
    // Initialize audio context
    this.audioContext = null;
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }
  
  start() {
    if (this.active) return;
    this.active = true;
    
    // Create the crystal structure
    this.createCrystalStructure();
    
    // Play time crystal resonance
    this.playTimeCrystalResonance();
    
    // Begin animation
    this.animate();
  }
  
  stop() {
    this.active = false;
    
    // Stop audio
    this.stopResonance();
  }
  
  createCrystalStructure() {
    // Create 4D time crystal structure
    const φ = 1.618033988749895;
    
    // Clear particles
    this.particles = [];
    
    // Create the 4D hypercube (tesseract) vertices
    this.createTesseractVertices();
    
    // Add time crystal nodes at phi-harmonic positions within the tesseract
    this.addPhiHarmonicNodes();
    
    // Create quantum entanglement between nodes
    this.createQuantumEntanglements();
  }
  
  createTesseractVertices() {
    // Create 4D hypercube vertices
    const size = Math.min(this.canvas.width, this.canvas.height) * 0.25;
    
    // 16 vertices of a tesseract (4D hypercube)
    const vertices = [];
    for (let x = -1; x <= 1; x += 2) {
      for (let y = -1; y <= 1; y += 2) {
        for (let z = -1; z <= 1; z += 2) {
          for (let w = -1; w <= 1; w += 2) {
            vertices.push({
              x: x * size,
              y: y * size,
              z: z * size,
              w: w * size,
              color: `rgba(0, 188, 212, 0.8)`, // Cyan
              size: 4,
              type: 'vertex'
            });
          }
        }
      }
    }
    
    this.particles.push(...vertices);
  }
  
  addPhiHarmonicNodes() {
    // Add phi-harmonic nodes within the tesseract
    const φ = 1.618033988749895;
    const size = Math.min(this.canvas.width, this.canvas.height) * 0.25;
    
    // Golden ratio positions
    const phiPositions = [
      { x: 0, y: 0, z: 0, w: 0 }, // Center
      { x: 1/φ, y: 1/φ, z: 0, w: 0 },
      { x: -1/φ, y: -1/φ, z: 0, w: 0 },
      { x: 0, y: 0, z: 1/φ, w: 1/φ },
      { x: 0, y: 0, z: -1/φ, w: -1/φ },
      { x: 1/φ, y: 0, z: 0, w: 1/φ },
      { x: -1/φ, y: 0, z: 0, w: -1/φ },
      { x: 0, y: 1/φ, z: 1/φ, w: 0 },
      { x: 0, y: -1/φ, z: -1/φ, w: 0 },
      // Phi²-based positions
      { x: 1/φ/φ, y: 1/φ/φ, z: 1/φ/φ, w: 1/φ/φ },
      { x: -1/φ/φ, y: -1/φ/φ, z: -1/φ/φ, w: -1/φ/φ }
    ];
    
    // Create nodes at phi positions
    phiPositions.forEach((pos, i) => {
      this.particles.push({
        x: pos.x * size,
        y: pos.y * size,
        z: pos.z * size,
        w: pos.w * size,
        color: i === 0 ? `rgba(255, 255, 255, 0.9)` : `rgba(0, 188, 212, 0.9)`,
        size: i === 0 ? 8 : 6,
        type: 'node',
        oscillation: Math.random() * Math.PI * 2,
        oscillationSpeed: 0.5 + Math.random() * 0.5
      });
    });
  }
  
  createQuantumEntanglements() {
    // Create quantum connections between nodes
    const nodeParticles = this.particles.filter(p => p.type === 'node');
    
    for (let i = 0; i < nodeParticles.length; i++) {
      for (let j = i + 1; j < nodeParticles.length; j++) {
        this.particles.push({
          from: i,
          to: j,
          type: 'connection',
          strength: Math.random(),
          color: `rgba(0, 188, 212, 0.3)`,
          oscillation: Math.random() * Math.PI * 2,
          oscillationSpeed: 0.2 + Math.random() * 0.3
        });
      }
    }
  }
  
  playTimeCrystalResonance() {
    if (!this.audioContext) return;
    
    // Stop existing oscillators
    this.stopResonance();
    
    // Create the time crystal frequency (720 Hz) with harmonics
    const φ = 1.618033988749895;
    
    // Base oscillator at Vision Gate frequency (720 Hz)
    this.createOscillator(this.frequency, 'sine', 0.04);
    
    // Phi-harmonic overtones
    this.createOscillator(this.frequency / φ, 'sine', 0.02); // 445 Hz
    this.createOscillator(this.frequency * (1/φ/φ), 'sine', 0.01); // 275 Hz
    
    // Phi-harmonic higher frequencies
    this.createOscillator(this.frequency * φ, 'sine', 0.02); // 1165 Hz
    this.createOscillator(this.frequency * φ * φ, 'triangle', 0.01); // 1886 Hz
    
    // Time crystal modulation
    this.createTimeCrystalModulation();
  }
  
  createOscillator(freq, type, volume) {
    if (!this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    oscillator.frequency.value = freq;
    oscillator.type = type;
    
    gain.gain.value = volume;
    
    oscillator.connect(gain);
    gain.connect(this.audioContext.destination);
    
    oscillator.start();
    this.oscillators.push({
      oscillator: oscillator,
      gain: gain,
      frequency: freq
    });
  }
  
  createTimeCrystalModulation() {
    if (!this.audioContext) return;
    
    // LFO for time crystal modulation
    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    
    // Set LFO at very slow frequency (0.1 Hz) - 10 second cycle
    lfo.frequency.value = 0.1;
    lfo.type = 'sine';
    
    lfoGain.gain.value = 0.2;
    
    lfo.connect(lfoGain);
    
    // Connect LFO to other oscillators' gain nodes for gentle modulation
    this.oscillators.forEach(osc => {
      if (osc.gain) {
        lfoGain.connect(osc.gain.gain);
      }
    });
    
    lfo.start();
    this.oscillators.push({
      oscillator: lfo,
      gain: lfoGain,
      frequency: 0.1,
      isLFO: true
    });
  }
  
  stopResonance() {
    // Stop all oscillators
    if (this.oscillators.length > 0) {
      this.oscillators.forEach(osc => {
        if (osc.oscillator) {
          osc.oscillator.stop();
          osc.oscillator.disconnect();
        }
        if (osc.gain) {
          osc.gain.disconnect();
        }
      });
      this.oscillators = [];
    }
  }
  
  animate() {
    if (!this.active) return;
    
    // Clear canvas with fade effect
    this.ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update time phase
    this.timePhase += 0.005;
    
    // Rotation matrices for 4D to 3D projection
    const rotation = this.calculateRotationMatrices();
    
    // Project 4D particles to 3D and then to 2D
    const projectedParticles = this.projectParticles(rotation);
    
    // Draw connections
    this.drawConnections(projectedParticles);
    
    // Draw particles
    this.drawParticles(projectedParticles);
    
    // Draw frequency and title
    this.drawTitle();
    
    // Continue animation
    requestAnimationFrame(() => this.animate());
  }
  
  calculateRotationMatrices() {
    // Time variables
    const time = Date.now() * 0.001;
    const φ = 1.618033988749895;
    
    // Create 4D rotation matrices
    // For XY plane
    const angleXY = time * 0.1;
    const cosXY = Math.cos(angleXY);
    const sinXY = Math.sin(angleXY);
    
    // For ZW plane (4D)
    const angleZW = time * 0.2;
    const cosZW = Math.cos(angleZW);
    const sinZW = Math.sin(angleZW);
    
    // For XZ plane
    const angleXZ = time * 0.15;
    const cosXZ = Math.cos(angleXZ);
    const sinXZ = Math.sin(angleXZ);
    
    // For YW plane (another 4D rotation)
    const angleYW = time * 0.12;
    const cosYW = Math.cos(angleYW);
    const sinYW = Math.sin(angleYW);
    
    return {
      xy: { cos: cosXY, sin: sinXY },
      zw: { cos: cosZW, sin: sinZW },
      xz: { cos: cosXZ, sin: sinXZ },
      yw: { cos: cosYW, sin: sinYW }
    };
  }
  
  projectParticles(rotation) {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const distance = 5; // Distance from camera to 3D origin
    const scale = 1; // Scale factor
    
    return this.particles.map(particle => {
      if (particle.type === 'connection') {
        return particle; // Connections handled separately
      }
      
      // 4D coordinates
      let { x, y, z, w } = particle;
      
      // Apply 4D rotations
      
      // XY rotation
      let x1 = x * rotation.xy.cos - y * rotation.xy.sin;
      let y1 = x * rotation.xy.sin + y * rotation.xy.cos;
      
      // ZW rotation
      let z1 = z * rotation.zw.cos - w * rotation.zw.sin;
      let w1 = z * rotation.zw.sin + w * rotation.zw.cos;
      
      // XZ rotation
      let x2 = x1 * rotation.xz.cos - z1 * rotation.xz.sin;
      let z2 = x1 * rotation.xz.sin + z1 * rotation.xz.cos;
      
      // YW rotation
      let y2 = y1 * rotation.yw.cos - w1 * rotation.yw.sin;
      let w2 = y1 * rotation.yw.sin + w1 * rotation.yw.cos;
      
      // Apply time crystal oscillation to particles
      if (particle.type === 'node') {
        const timeFactor = Math.sin(this.timePhase + particle.oscillation) * 0.1;
        x2 += x2 * timeFactor;
        y2 += y2 * timeFactor;
        z2 += z2 * timeFactor;
        w2 += w2 * timeFactor;
      }
      
      // 4D to 3D projection (perspective division using w)
      const wFactor = 1 + w2 * 0.2;
      const x3 = x2 / wFactor;
      const y3 = y2 / wFactor;
      const z3 = z2 / wFactor;
      
      // 3D to 2D projection (perspective)
      const perspective = distance / (distance - z3);
      const x2d = centerX + x3 * perspective * scale;
      const y2d = centerY + y3 * perspective * scale;
      
      // Size adjustment based on depth
      const sizeAdjust = 0.5 + perspective * 0.5;
      
      // Color adjustment based on w coordinate
      let color = particle.color;
      if (color.startsWith('rgba')) {
        const baseColor = color.replace(/rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/, 'rgba($1,$2,$3,');
        const opacity = Math.max(0.1, Math.min(0.9, 0.6 + w2 * 0.1));
        color = baseColor + opacity + ')';
      }
      
      // Return projected coordinates with metadata
      return {
        ...particle,
        x2d,
        y2d,
        z3,
        color,
        projectedSize: particle.size * sizeAdjust
      };
    });
  }
  
  drawConnections(projectedParticles) {
    const nodes = projectedParticles.filter(p => p.type === 'node');
    const connections = this.particles.filter(p => p.type === 'connection');
    
    connections.forEach(conn => {
      if (conn.from < nodes.length && conn.to < nodes.length) {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        
        // Skip if either node is behind the viewer
        if (from.z3 > 0 || to.z3 > 0) return;
        
        // Skip connections that would go through the center
        if (Math.abs(from.x2d - to.x2d) > this.canvas.width * 0.7 ||
            Math.abs(from.y2d - to.y2d) > this.canvas.height * 0.7) return;
        
        // Connection strength varies with time
        const timeFactor = Math.sin(this.timePhase + conn.oscillation) * 0.5 + 0.5;
        const strength = conn.strength * timeFactor;
        
        // Color based on connection strength
        const alpha = 0.1 + strength * 0.4;
        this.ctx.strokeStyle = conn.color.replace(/rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/, 
                                                `rgba($1,$2,$3,${alpha})`);
        
        // Line width based on connection strength
        this.ctx.lineWidth = 1 + strength;
        
        // Draw connection
        this.ctx.beginPath();
        this.ctx.moveTo(from.x2d, from.y2d);
        this.ctx.lineTo(to.x2d, to.y2d);
        this.ctx.stroke();
      }
    });
  }
  
  drawParticles(projectedParticles) {
    // Sort particles by z depth for proper rendering
    const sortedParticles = projectedParticles
      .filter(p => p.type !== 'connection')
      .sort((a, b) => b.z3 - a.z3);
    
    sortedParticles.forEach(particle => {
      // Draw particle
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x2d, particle.y2d, particle.projectedSize, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw glow for nodes
      if (particle.type === 'node') {
        this.ctx.beginPath();
        this.ctx.arc(particle.x2d, particle.y2d, particle.projectedSize * 2, 0, Math.PI * 2);
        
        const glowColor = particle.color.replace(/rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/, 
                                              'rgba($1,$2,$3,0.2)');
        this.ctx.fillStyle = glowColor;
        this.ctx.fill();
      }
    });
  }
  
  drawTitle() {
    // Draw frequency and title at the bottom
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.font = '16px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`Vision Gate - ${this.frequency} Hz`, this.canvas.width / 2, this.canvas.height - 20);
    
    // Draw subtitle
    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this.ctx.fillText(`Time Crystal Visualization`, this.canvas.width / 2, this.canvas.height - 40);
  }
  
  addStyles() {
    if (!document.getElementById('time-crystal-styles')) {
      const style = document.createElement('style');
      style.id = 'time-crystal-styles';
      style.textContent = `
        .time-crystal-container {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: rgba(10, 10, 26, 0.8);
          overflow: hidden;
        }
        
        .time-crystal-canvas {
          display: block;
          width: 100%;
          height: 100%;
        }
      `;
      document.head.appendChild(style);
    }
  }
}