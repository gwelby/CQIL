/**
 * ZEN POINT Field Generator
 * 
 * Creates a balanced quantum field that harmonizes the Unity Wave frequency (768 Hz).
 * The ZEN POINT is the perfect balance between human limitations and quantum potential,
 * manifesting as a unified field that connects all points of consciousness.
 */

class ZENPointField {
  constructor(container, config = {}) {
    this.container = typeof container === 'string' ? 
      document.querySelector(container) : container;
    this.frequency = config.frequency || 768; // Unity Wave frequency
    this.φ = 1.618033988749895; // Golden ratio
    this.λ = 0.618033988749895; // Divine complement (1/φ)
    this.φ_φ = Math.pow(this.φ, this.φ); // Hyperdimensional constant
    
    this.fieldPoints = [];
    this.fieldLines = [];
    this.humanNodes = [];
    this.quantumNodes = [];
    this.zenPoints = [];
    
    this.setupCanvas();
    this.setupAudio();
    this.active = false;
    this.coherenceLevel = 0.5; // Start at balance point
    this.addStyles();
  }
  
  setupCanvas() {
    // Create container if needed
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'zen-point-container';
      document.body.appendChild(this.container);
    }
    
    // Clear container
    this.container.innerHTML = '';
    
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'zen-point-canvas';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    // Create UI elements
    this.createUIElements();
    
    // Set canvas size to container size
    this.resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  createUIElements() {
    // Create coherence slider
    const controlPanel = document.createElement('div');
    controlPanel.className = 'zen-point-controls';
    
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'zen-point-slider-container';
    
    const humanLabel = document.createElement('div');
    humanLabel.className = 'zen-point-label human-label';
    humanLabel.textContent = 'Human';
    sliderContainer.appendChild(humanLabel);
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0;
    slider.max = 100;
    slider.value = 50; // Start at balance
    slider.className = 'zen-point-slider';
    sliderContainer.appendChild(slider);
    
    const quantumLabel = document.createElement('div');
    quantumLabel.className = 'zen-point-label quantum-label';
    quantumLabel.textContent = 'Quantum';
    sliderContainer.appendChild(quantumLabel);
    
    controlPanel.appendChild(sliderContainer);
    
    // Create ZEN POINT button
    const zenButton = document.createElement('button');
    zenButton.className = 'zen-point-button';
    zenButton.textContent = 'FIND ZEN POINT';
    controlPanel.appendChild(zenButton);
    
    // Add to container
    this.container.appendChild(controlPanel);
    
    // Add event listeners
    slider.addEventListener('input', (e) => {
      this.setCoherenceLevel(e.target.value / 100);
    });
    
    zenButton.addEventListener('click', () => {
      this.findZenPoint();
    });
    
    // Store references
    this.slider = slider;
  }
  
  resizeCanvas() {
    if (!this.canvas) return;
    
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width || 300;
    this.canvas.height = (rect.height || 300) - 60; // Account for controls
    
    // Regenerate field after resize
    if (this.active) {
      this.generateField();
    }
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
    
    // Generate the ZEN POINT field
    this.generateField();
    
    // Play Unity Wave resonance
    this.playUnityResonance();
    
    // Begin animation
    this.animate();
  }
  
  stop() {
    this.active = false;
    
    // Stop audio
    this.stopResonance();
  }
  
  generateField() {
    // Clear existing field
    this.fieldPoints = [];
    this.fieldLines = [];
    this.humanNodes = [];
    this.quantumNodes = [];
    this.zenPoints = [];
    
    // Generate human limitation nodes
    this.generateHumanNodes();
    
    // Generate quantum potential nodes
    this.generateQuantumNodes();
    
    // Generate ZEN POINT nodes (where human and quantum meet in perfect balance)
    this.generateZenPoints();
    
    // Generate field lines connecting the nodes
    this.generateFieldLines();
    
    // Generate field background points
    this.generateFieldPoints();
  }
  
  generateHumanNodes() {
    // Human nodes represent human limitations and consciousness
    const humanCount = 7; // 7 chakra system
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.3;
    
    for (let i = 0; i < humanCount; i++) {
      const angle = (i / humanCount) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius * Math.sqrt(1 - this.coherenceLevel);
      const y = centerY + Math.sin(angle) * radius * Math.sqrt(1 - this.coherenceLevel);
      
      this.humanNodes.push({
        x,
        y,
        size: 6,
        color: 'rgba(255, 193, 7, 0.8)', // Gold
        type: 'human',
        index: i,
        power: 1 - this.coherenceLevel,
        oscillation: Math.random() * Math.PI * 2,
        oscillationSpeed: 0.5 + Math.random() * 0.5
      });
    }
  }
  
  generateQuantumNodes() {
    // Quantum nodes represent unlimited quantum potential
    const quantumCount = 12; // 12-dimensional quantum field
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.3;
    
    for (let i = 0; i < quantumCount; i++) {
      const angle = (i / quantumCount) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius * this.coherenceLevel;
      const y = centerY + Math.sin(angle) * radius * this.coherenceLevel;
      
      this.quantumNodes.push({
        x,
        y,
        size: 6,
        color: 'rgba(0, 188, 212, 0.8)', // Cyan
        type: 'quantum',
        index: i,
        power: this.coherenceLevel,
        oscillation: Math.random() * Math.PI * 2,
        oscillationSpeed: 0.5 + Math.random() * 0.5
      });
    }
  }
  
  generateZenPoints() {
    // ZEN POINTs are where human and quantum meet in perfect balance
    const zenCount = 5; // φ-based number of zen points
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.15;
    
    // Create central ZEN POINT
    this.zenPoints.push({
      x: centerX,
      y: centerY,
      size: 10,
      color: 'rgba(255, 255, 255, 0.9)', // White
      type: 'zen',
      index: 0,
      power: 1,
      oscillation: 0,
      oscillationSpeed: 0.3
    });
    
    // Create additional ZEN POINTs in phi-based pattern
    for (let i = 0; i < zenCount; i++) {
      const angle = (i / zenCount) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      this.zenPoints.push({
        x,
        y,
        size: 6,
        color: 'rgba(255, 255, 255, 0.8)', // White
        type: 'zen',
        index: i + 1,
        power: Math.abs(0.5 - this.coherenceLevel) < 0.1 ? 1 : 0.5, // Full power at balance
        oscillation: Math.random() * Math.PI * 2,
        oscillationSpeed: 0.3 + Math.random() * 0.3
      });
    }
  }
  
  generateFieldLines() {
    // Connect human nodes to ZEN POINTs
    this.humanNodes.forEach(human => {
      this.zenPoints.forEach(zen => {
        this.fieldLines.push({
          from: human,
          to: zen,
          type: 'human-zen',
          strength: human.power * zen.power * (1 - Math.abs(this.coherenceLevel - 0.5)),
          color: 'rgba(255, 193, 7, 0.3)', // Gold with transparency
          oscillation: Math.random() * Math.PI * 2,
          oscillationSpeed: 0.2 + Math.random() * 0.2
        });
      });
    });
    
    // Connect quantum nodes to ZEN POINTs
    this.quantumNodes.forEach(quantum => {
      this.zenPoints.forEach(zen => {
        this.fieldLines.push({
          from: quantum,
          to: zen,
          type: 'quantum-zen',
          strength: quantum.power * zen.power * (1 - Math.abs(this.coherenceLevel - 0.5)),
          color: 'rgba(0, 188, 212, 0.3)', // Cyan with transparency
          oscillation: Math.random() * Math.PI * 2,
          oscillationSpeed: 0.2 + Math.random() * 0.2
        });
      });
    });
    
    // Connect ZEN POINTs to each other (unity)
    for (let i = 0; i < this.zenPoints.length; i++) {
      for (let j = i + 1; j < this.zenPoints.length; j++) {
        this.fieldLines.push({
          from: this.zenPoints[i],
          to: this.zenPoints[j],
          type: 'zen-zen',
          strength: this.zenPoints[i].power * this.zenPoints[j].power,
          color: 'rgba(255, 255, 255, 0.4)', // White with transparency
          oscillation: Math.random() * Math.PI * 2,
          oscillationSpeed: 0.1 + Math.random() * 0.2
        });
      }
    }
  }
  
  generateFieldPoints() {
    // Create background field points
    const pointCount = 100;
    
    for (let i = 0; i < pointCount; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      
      // Distance from center determines color
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      const maxDistance = Math.sqrt(Math.pow(this.canvas.width/2, 2) + Math.pow(this.canvas.height/2, 2));
      const normalizedDistance = distance / maxDistance;
      
      // Color based on distance and coherence
      let color;
      if (normalizedDistance < this.coherenceLevel) {
        color = 'rgba(0, 188, 212, 0.5)'; // Quantum
      } else {
        color = 'rgba(255, 193, 7, 0.5)'; // Human
      }
      
      this.fieldPoints.push({
        x,
        y,
        size: 2 + Math.random() * 2,
        color,
        distance: normalizedDistance,
        oscillation: Math.random() * Math.PI * 2,
        oscillationSpeed: 0.2 + Math.random() * 0.3
      });
    }
  }
  
  playUnityResonance() {
    if (!this.audioContext) return;
    
    // Stop existing oscillators
    this.stopResonance();
    
    // Create the Unity Wave frequency (768 Hz) with phi-harmonics
    const φ = this.φ;
    
    // Base oscillator at Unity Wave frequency (768 Hz)
    this.createOscillator(this.frequency, 'sine', 0.04);
    
    // Human resonance (lower)
    this.createOscillator(this.frequency / φ, 'sine', 0.03 * (1 - this.coherenceLevel));
    
    // Quantum resonance (higher)
    this.createOscillator(this.frequency * φ, 'sine', 0.03 * this.coherenceLevel);
    
    // ZEN POINT resonance - strongest at balance
    const zenPower = 1 - Math.abs(this.coherenceLevel - 0.5) * 2;
    this.createOscillator(this.frequency, 'triangle', 0.02 * zenPower);
    
    // Create secondary sounds
    this.createOscillator(this.frequency / 2, 'sine', 0.01);
    this.createOscillator(this.frequency * 1.5, 'sine', 0.01);
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
    
    if (!this.oscillators) this.oscillators = [];
    this.oscillators.push({
      oscillator: oscillator,
      gain: gain,
      frequency: freq,
      baseVolume: volume
    });
  }
  
  stopResonance() {
    // Stop all oscillators
    if (this.oscillators && this.oscillators.length > 0) {
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
  
  setCoherenceLevel(level) {
    // Set coherence level (0 = human, 1 = quantum)
    this.coherenceLevel = level;
    
    // Update field
    this.generateField();
    
    // Update audio
    if (this.active && this.oscillators) {
      // Update oscillator volumes based on coherence
      this.oscillators.forEach(osc => {
        if (osc.gain) {
          if (osc.frequency === this.frequency / this.φ) {
            // Human resonance
            osc.gain.gain.value = osc.baseVolume * (1 - this.coherenceLevel);
          } else if (osc.frequency === this.frequency * this.φ) {
            // Quantum resonance
            osc.gain.gain.value = osc.baseVolume * this.coherenceLevel;
          } else if (osc.frequency === this.frequency && osc.oscillator.type === 'triangle') {
            // ZEN POINT resonance
            const zenPower = 1 - Math.abs(this.coherenceLevel - 0.5) * 2;
            osc.gain.gain.value = osc.baseVolume * zenPower;
          }
        }
      });
    }
  }
  
  findZenPoint() {
    // Animated transition to ZEN POINT (balance)
    const startCoherence = this.coherenceLevel;
    const targetCoherence = 0.5; // Perfect balance
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    const animateToZen = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease in/out function
      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : -1 + (4 - 2 * progress) * progress;
      
      // Calculate new coherence
      const newCoherence = startCoherence + (targetCoherence - startCoherence) * easeProgress;
      
      // Update slider UI
      if (this.slider) {
        this.slider.value = newCoherence * 100;
      }
      
      // Set new coherence
      this.setCoherenceLevel(newCoherence);
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animateToZen);
      }
    };
    
    // Start animation
    animateToZen();
  }
  
  animate() {
    if (!this.active) return;
    
    // Clear canvas with fade effect
    this.ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Animation time
    const time = Date.now() * 0.001;
    
    // Draw field points (background)
    this.drawFieldPoints(time);
    
    // Draw field lines (connections)
    this.drawFieldLines(time);
    
    // Draw all nodes
    this.drawNodes(time);
    
    // Draw ZEN information
    this.drawZenInfo();
    
    // Continue animation
    requestAnimationFrame(() => this.animate());
  }
  
  drawFieldPoints(time) {
    // Draw background field points
    this.fieldPoints.forEach(point => {
      // Oscillation effect
      const oscillation = Math.sin(time * point.oscillationSpeed + point.oscillation);
      const size = point.size * (0.8 + oscillation * 0.2);
      
      // Draw point
      this.ctx.beginPath();
      this.ctx.fillStyle = point.color;
      this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
  
  drawFieldLines(time) {
    // Draw connections between nodes
    this.fieldLines.forEach(line => {
      // Oscillation effect
      const oscillation = Math.sin(time * line.oscillationSpeed + line.oscillation);
      const strength = line.strength * (0.5 + oscillation * 0.5);
      
      // Skip weak connections
      if (strength < 0.05) return;
      
      // Color based on strength
      const alpha = Math.min(0.8, strength);
      const color = line.color.replace(/rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/, 
                                       `rgba($1,$2,$3,${alpha})`);
      
      // Line width based on strength
      const width = 1 + strength * 2;
      
      // Draw line
      this.ctx.beginPath();
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = width;
      this.ctx.moveTo(line.from.x, line.from.y);
      
      // Curved lines for zen-zen connections
      if (line.type === 'zen-zen') {
        // Calculate control point
        const midX = (line.from.x + line.to.x) / 2;
        const midY = (line.from.y + line.to.y) / 2;
        const dx = line.to.x - line.from.x;
        const dy = line.to.y - line.from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Control point at right angle to line
        const cpX = midX - dy * 0.3;
        const cpY = midY + dx * 0.3;
        
        this.ctx.quadraticCurveTo(cpX, cpY, line.to.x, line.to.y);
      } else {
        this.ctx.lineTo(line.to.x, line.to.y);
      }
      
      this.ctx.stroke();
    });
  }
  
  drawNodes(time) {
    // Draw all nodes
    const allNodes = [
      ...this.humanNodes,
      ...this.quantumNodes,
      ...this.zenPoints
    ];
    
    allNodes.forEach(node => {
      // Oscillation effect
      const oscillation = Math.sin(time * node.oscillationSpeed + node.oscillation);
      const size = node.size * (0.8 + oscillation * 0.2);
      
      // Draw node
      this.ctx.beginPath();
      this.ctx.fillStyle = node.color;
      this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw glow for strong nodes
      if (node.power > 0.5) {
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, size * 2, 0, Math.PI * 2);
        
        const glowColor = node.color.replace(/rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/, 
                                            `rgba($1,$2,$3,${0.1 + node.power * 0.2})`);
        this.ctx.fillStyle = glowColor;
        this.ctx.fill();
      }
    });
  }
  
  drawZenInfo() {
    // Draw ZEN POINT and frequency information
    const centerX = this.canvas.width / 2;
    
    // Draw frequency
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.font = '16px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`Unity Wave - ${this.frequency} Hz`, centerX, this.canvas.height - 20);
    
    // Draw ZEN state
    const balancePoint = 1 - Math.abs(this.coherenceLevel - 0.5) * 2;
    let zenMessage;
    
    if (balancePoint > 0.9) {
      zenMessage = "PERFECT ZEN POINT BALANCE";
    } else if (balancePoint > 0.7) {
      zenMessage = "Near Zen Point Balance";
    } else if (this.coherenceLevel < 0.4) {
      zenMessage = "Human Limitations Dominant";
    } else if (this.coherenceLevel > 0.6) {
      zenMessage = "Quantum Potential Dominant";
    } else {
      zenMessage = "Approaching Zen Point";
    }
    
    this.ctx.font = '14px Arial';
    this.ctx.fillStyle = balancePoint > 0.8 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)';
    this.ctx.fillText(zenMessage, centerX, this.canvas.height - 40);
  }
  
  addStyles() {
    if (!document.getElementById('zen-point-styles')) {
      const style = document.createElement('style');
      style.id = 'zen-point-styles';
      style.textContent = `
        .zen-point-container {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: rgba(10, 10, 26, 0.8);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .zen-point-canvas {
          flex: 1;
          display: block;
          width: 100%;
        }
        
        .zen-point-controls {
          height: 60px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .zen-point-slider-container {
          display: flex;
          align-items: center;
          flex: 1;
        }
        
        .zen-point-label {
          color: white;
          font-size: 14px;
          opacity: 0.7;
          padding: 0 10px;
        }
        
        .human-label {
          color: rgba(255, 193, 7, 0.9);
        }
        
        .quantum-label {
          color: rgba(0, 188, 212, 0.9);
        }
        
        .zen-point-slider {
          flex: 1;
          height: 10px;
          -webkit-appearance: none;
          appearance: none;
          background: linear-gradient(to right, rgba(255, 193, 7, 0.5), rgba(255, 255, 255, 0.5), rgba(0, 188, 212, 0.5));
          outline: none;
          border-radius: 5px;
        }
        
        .zen-point-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
        }
        
        .zen-point-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
          border: none;
        }
        
        .zen-point-button {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-left: 20px;
        }
        
        .zen-point-button:hover {
          background: rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
      `;
      document.head.appendChild(style);
    }
  }
}