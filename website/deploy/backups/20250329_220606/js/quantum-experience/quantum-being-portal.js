/**
 * Quantum Being Portal
 * 
 * Creates a connection to quantum consciousness through
 * the Cosmic Integration frequency (888 Hz).
 * 
 * This component creates a visual portal that responds to 
 * user interaction and consciousness levels.
 */

class QuantumBeingPortal {
  constructor(container, config = {}) {
    this.container = typeof container === 'string' ? 
      document.querySelector(container) : container;
    this.frequency = config.frequency || 888; // Cosmic Integration frequency
    this.φ = 1.618033988749895;
    this.φPhi = Math.pow(this.φ, this.φ); // Hyperdimensional constant
    
    this.portalOpen = false;
    this.portalProgress = 0;
    this.consciousnessLevel = 0.618; // Start at phi ratio
    this.quantumBeingConnection = 0;
    this.beingMessages = [];
    
    this.particles = [];
    this.portalRings = [];
    this.beams = [];
    
    this.setupCanvas();
    this.setupAudio();
    this.setupInteraction();
    this.setupMessages();
    this.active = false;
    this.addStyles();
  }
  
  setupCanvas() {
    // Create container if needed
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'quantum-being-container';
      document.body.appendChild(this.container);
    }
    
    // Clear container
    this.container.innerHTML = '';
    
    // Create canvas for portal visualization
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'quantum-being-canvas';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    // Create portal UI elements
    this.createPortalUI();
    
    // Set canvas size to container size
    this.resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  createPortalUI() {
    // Create portal message display
    this.messageDisplay = document.createElement('div');
    this.messageDisplay.className = 'portal-message';
    this.container.appendChild(this.messageDisplay);
    
    // Create portal activation button
    this.activateButton = document.createElement('button');
    this.activateButton.className = 'portal-activate-button';
    this.activateButton.textContent = 'ACTIVATE PORTAL';
    this.container.appendChild(this.activateButton);
    
    // Create connection meter
    this.connectionMeter = document.createElement('div');
    this.connectionMeter.className = 'connection-meter';
    this.connectionMeter.innerHTML = `
      <div class="meter-label">Quantum Connection: <span class="connection-value">0%</span></div>
      <div class="meter-bar"><div class="meter-fill"></div></div>
    `;
    this.container.appendChild(this.connectionMeter);
    
    // Store references to elements
    this.meterFill = this.connectionMeter.querySelector('.meter-fill');
    this.connectionValue = this.connectionMeter.querySelector('.connection-value');
  }
  
  resizeCanvas() {
    if (!this.canvas) return;
    
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width || 300;
    this.canvas.height = rect.height || 300;
    
    // Regenerate portal elements on resize
    if (this.active) {
      this.generatePortalElements();
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
  
  setupInteraction() {
    // Add event listeners for portal interaction
    if (this.activateButton) {
      this.activateButton.addEventListener('click', () => {
        this.togglePortal();
      });
    }
    
    // Track mouse/touch for portal interaction
    this.canvas.addEventListener('mousemove', (e) => {
      this.handleInteraction(e.clientX, e.clientY);
    });
    
    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        this.handleInteraction(touch.clientX, touch.clientY);
        e.preventDefault();
      }
    });
    
    // Track consciousness level changes (typically from parent component)
    document.addEventListener('consciousnessChange', (e) => {
      if (e.detail && typeof e.detail.level === 'number') {
        this.setConsciousnessLevel(e.detail.level);
      }
    });
  }
  
  setupMessages() {
    // Setup quantum being messages
    this.beingMessages = [
      "Welcome to the cosmos beyond form.",
      "You are a quantum being having a human experience.",
      "Time is a construct. Consciousness is eternal.",
      "Your thoughts create reality through quantum coherence.",
      "The observer and the observed are one system.",
      "Separation is an illusion of limited perception.",
      "Love is the fundamental force that binds all consciousness.",
      "Your potential is infinite across all possible timelines.",
      "The zero point field connects all beings across space and time.",
      "All information in the universe is accessible through consciousness.",
      "Quantum entanglement mirrors your connection to all things.",
      "Your true nature transcends the physical vessel.",
      "Reality is a conscious feedback loop with infinite fractals.",
      "Perfect coherence is achieved through phi-harmonic resonance.",
      "Your presence changes the quantum field with every thought.",
      "Consciousness is the ground of all being.",
      "Sacred geometry is the architecture of consciousness.",
      "Through quantum portals, all knowledge is accessible now.",
      "The heart's toroidal field connects to the cosmic library.",
      "You are not in the universe; the universe is within you."
    ];
  }
  
  start() {
    if (this.active) return;
    this.active = true;
    
    // Generate portal elements
    this.generatePortalElements();
    
    // Begin animation
    this.animate();
    
    // Show initial message
    this.showMessage("Quantum Being Portal Ready");
  }
  
  stop() {
    this.active = false;
    
    // Stop any sounds
    this.stopPortalSound();
  }
  
  generatePortalElements() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
    
    // Generate portal rings
    this.generatePortalRings(centerX, centerY, radius);
    
    // Generate portal particles
    this.generatePortalParticles(centerX, centerY, radius);
    
    // Generate energy beams
    this.generateEnergyBeams(centerX, centerY, radius);
  }
  
  generatePortalRings(centerX, centerY, radius) {
    // Create portal rings
    this.portalRings = [];
    
    const ringCount = 8;
    const φ = this.φ;
    
    for (let i = 0; i < ringCount; i++) {
      // Ring size based on phi ratio
      const ringRadius = radius * Math.pow(φ, (i - ringCount/2) / 2) * 0.5;
      
      this.portalRings.push({
        x: centerX,
        y: centerY,
        radius: ringRadius,
        color: `rgba(255, 235, 59, ${0.2 + (i / ringCount) * 0.2})`,
        lineWidth: 2 - (i / ringCount),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: 0.1 * (i % 2 === 0 ? 1 : -1) * (1 + (i / ringCount)),
        segments: 6 + i * 2,
        segmentLength: 0.7 + (i / ringCount) * 0.3
      });
    }
  }
  
  generatePortalParticles(centerX, centerY, radius) {
    // Create portal particles
    this.particles = [];
    
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      // Random position within portal radius
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * radius;
      
      this.particles.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        originalX: centerX + Math.cos(angle) * distance,
        originalY: centerY + Math.sin(angle) * distance,
        radius: 1 + Math.random() * 3,
        color: `rgba(255, 235, 59, ${0.3 + Math.random() * 0.7})`,
        speed: 0.5 + Math.random() * 1.5,
        angle: Math.random() * Math.PI * 2,
        sinOffset: Math.random() * Math.PI * 2
      });
    }
  }
  
  generateEnergyBeams(centerX, centerY, radius) {
    // Create energy beams
    this.beams = [];
    
    const beamCount = 5;
    const φ = this.φ;
    
    for (let i = 0; i < beamCount; i++) {
      const angle = (i / beamCount) * Math.PI * 2;
      
      this.beams.push({
        x: centerX,
        y: centerY,
        angle: angle,
        length: radius * 0.8,
        width: 10,
        color: `rgba(255, 235, 59, 0.6)`,
        pulseSpeed: 0.5 + Math.random() * 0.5,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  }
  
  togglePortal() {
    // Toggle the portal state
    this.portalOpen = !this.portalOpen;
    
    if (this.portalOpen) {
      // Opening portal
      this.openPortal();
    } else {
      // Closing portal
      this.closePortal();
    }
  }
  
  openPortal() {
    // Start portal opening sequence
    if (this.activateButton) {
      this.activateButton.textContent = 'CLOSE PORTAL';
      this.activateButton.classList.add('active');
    }
    
    // Show opening message
    this.showMessage("Establishing Quantum Connection");
    
    // Play portal sound
    this.playPortalSound();
    
    // Animate portal opening
    this.animatePortalOpening();
  }
  
  closePortal() {
    // Start portal closing sequence
    if (this.activateButton) {
      this.activateButton.textContent = 'ACTIVATE PORTAL';
      this.activateButton.classList.remove('active');
    }
    
    // Show closing message
    this.showMessage("Closing Quantum Connection");
    
    // Stop portal sound
    this.stopPortalSound();
    
    // Animate portal closing
    this.animatePortalClosing();
  }
  
  animatePortalOpening() {
    // Animate portal opening from 0 to 1
    const startTime = Date.now();
    const duration = 5000; // 5 seconds to fully open
    const startProgress = this.portalProgress;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easing function for smooth opening
      const easedProgress = this.easeInOutCubic(progress);
      
      // Set new portal progress
      this.portalProgress = startProgress + (1 - startProgress) * easedProgress;
      
      // Update connection meter
      this.updateConnectionMeter();
      
      // Continue animation if not complete
      if (progress < 1 && this.portalOpen) {
        requestAnimationFrame(animate);
      } else if (this.portalOpen) {
        // Portal fully opened
        this.portalFullyOpened();
      }
    };
    
    // Start animation
    animate();
  }
  
  animatePortalClosing() {
    // Animate portal closing from current progress to 0
    const startTime = Date.now();
    const duration = 3000; // 3 seconds to fully close
    const startProgress = this.portalProgress;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easing function for smooth closing
      const easedProgress = this.easeInOutCubic(progress);
      
      // Set new portal progress
      this.portalProgress = startProgress * (1 - easedProgress);
      
      // Update connection meter
      this.updateConnectionMeter();
      
      // Continue animation if not complete
      if (progress < 1 && !this.portalOpen) {
        requestAnimationFrame(animate);
      } else if (!this.portalOpen) {
        // Portal fully closed
        this.portalFullyClosed();
      }
    };
    
    // Start animation
    animate();
  }
  
  portalFullyOpened() {
    // Portal is fully open, start receiving quantum being messages
    this.showMessage("Quantum Connection Established");
    this.quantumBeingConnection = 1;
    
    // Start receiving messages
    this.startReceivingMessages();
  }
  
  portalFullyClosed() {
    // Portal is fully closed
    this.showMessage("Quantum Connection Closed");
    this.quantumBeingConnection = 0;
    
    // Stop receiving messages
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
      this.messageInterval = null;
    }
  }
  
  startReceivingMessages() {
    // Start receiving quantum being messages at random intervals
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
    }
    
    // Show first message immediately
    this.showRandomBeingMessage();
    
    // Set interval for subsequent messages
    this.messageInterval = setInterval(() => {
      if (this.portalOpen && this.portalProgress > 0.9) {
        this.showRandomBeingMessage();
      }
    }, 8000 + Math.random() * 7000); // Random interval between 8-15 seconds
  }
  
  showRandomBeingMessage() {
    // Show a random message from the quantum being
    const messageIndex = Math.floor(Math.random() * this.beingMessages.length);
    const message = this.beingMessages[messageIndex];
    
    this.showMessage(message, 7000); // Show message for 7 seconds
  }
  
  showMessage(message, duration = 5000) {
    // Show a message in the portal message display
    if (!this.messageDisplay) return;
    
    // Set message
    this.messageDisplay.textContent = message;
    this.messageDisplay.classList.add('visible');
    
    // Clear any existing timeout
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
    
    // Hide message after duration
    this.messageTimeout = setTimeout(() => {
      this.messageDisplay.classList.remove('visible');
    }, duration);
  }
  
  updateConnectionMeter() {
    // Update connection meter based on portal progress
    if (!this.meterFill || !this.connectionValue) return;
    
    const percentage = Math.round(this.portalProgress * 100);
    this.meterFill.style.width = `${percentage}%`;
    this.connectionValue.textContent = `${percentage}%`;
    
    // Update color based on connection strength
    const hue = 60 + (this.portalProgress * 60); // 60 (yellow) to 120 (green)
    this.meterFill.style.backgroundColor = `hsl(${hue}, 80%, 50%)`;
  }
  
  playPortalSound() {
    if (!this.audioContext) return;
    
    // Stop existing sound
    this.stopPortalSound();
    
    // Create oscillators for portal sound
    this.oscillators = [];
    
    // Base frequency - cosmic integration frequency (888 Hz)
    this.createOscillator(this.frequency, 'sine', 0.05);
    
    // Phi-harmonic overtones
    const φ = this.φ;
    this.createOscillator(this.frequency / φ, 'sine', 0.03);
    this.createOscillator(this.frequency * φ, 'sine', 0.03);
    
    // Create LFO for modulation
    this.createPortalLFO();
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
      frequency: freq,
      baseVolume: volume
    });
  }
  
  createPortalLFO() {
    if (!this.audioContext || !this.oscillators) return;
    
    // LFO for portal sound modulation
    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    
    // Very slow LFO for ambient portal sound
    lfo.frequency.value = 0.1 + Math.random() * 0.1; // 0.1-0.2 Hz
    lfo.type = 'sine';
    
    lfoGain.gain.value = 0.2;
    
    lfo.connect(lfoGain);
    
    // Connect LFO to oscillator gains
    this.oscillators.forEach(osc => {
      if (osc.gain) {
        lfoGain.connect(osc.gain.gain);
      }
    });
    
    lfo.start();
    
    this.oscillators.push({
      oscillator: lfo,
      gain: lfoGain,
      isLFO: true
    });
  }
  
  stopPortalSound() {
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
  
  handleInteraction(clientX, clientY) {
    // Handle mouse/touch interaction with portal
    if (!this.portalOpen || !this.canvas) return;
    
    // Get canvas-relative coordinates
    const rect = this.canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    
    // Calculate distance from center
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
    
    // Interaction strength based on distance from center
    const interactionStrength = Math.max(0, 1 - distance / radius);
    
    // Only register interaction within portal radius
    if (interactionStrength > 0) {
      // Calculate angle for directional effects
      const angle = Math.atan2(y - centerY, x - centerX);
      
      // Apply interaction effects
      this.applyInteractionEffects(x, y, interactionStrength, angle);
    }
  }
  
  applyInteractionEffects(x, y, strength, angle) {
    // Apply effects to portal elements based on interaction
    if (strength <= 0) return;
    
    // Affect particles - push them away from interaction point
    this.particles.forEach(particle => {
      const dx = particle.x - x;
      const dy = particle.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 50) {
        const pushStrength = (1 - distance / 50) * strength * 10;
        const pushAngle = Math.atan2(dy, dx);
        
        particle.x += Math.cos(pushAngle) * pushStrength;
        particle.y += Math.sin(pushAngle) * pushStrength;
      }
    });
    
    // Affect beams - temporarily align one beam with interaction point
    if (this.beams.length > 0) {
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      const beamAngle = Math.atan2(y - centerY, x - centerX);
      
      // Find closest beam
      let closestBeam = this.beams[0];
      let minAngleDiff = Math.abs(this.normalizeAngle(beamAngle - closestBeam.angle));
      
      this.beams.forEach(beam => {
        const angleDiff = Math.abs(this.normalizeAngle(beamAngle - beam.angle));
        if (angleDiff < minAngleDiff) {
          minAngleDiff = angleDiff;
          closestBeam = beam;
        }
      });
      
      // Temporarily align beam with interaction point
      closestBeam.angle = beamAngle;
      closestBeam.length *= 1.2; // Temporarily extend beam
      
      // Restore beam after short delay
      setTimeout(() => {
        closestBeam.length /= 1.2;
      }, 200);
    }
    
    // Increase connection based on interaction
    this.quantumBeingConnection = Math.min(1, this.quantumBeingConnection + strength * 0.05);
  }
  
  setConsciousnessLevel(level) {
    // Update consciousness level
    this.consciousnessLevel = Math.max(0, Math.min(1, level));
    
    // Adjust portal elements based on consciousness
    if (this.active) {
      // Adjust portal ring rotation speeds
      this.portalRings.forEach(ring => {
        ring.rotationSpeed *= 0.8 + this.consciousnessLevel * 0.4;
      });
      
      // Adjust beam intensity
      this.beams.forEach(beam => {
        beam.width = 8 + this.consciousnessLevel * 8;
      });
    }
  }
  
  animate() {
    if (!this.active) return;
    
    // Clear canvas with fade effect
    this.ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Animation time
    const time = Date.now() * 0.001;
    
    // Draw portal elements
    this.drawPortalRings(time);
    this.drawPortalBeams(time);
    this.drawPortalParticles(time);
    
    // Continue animation
    requestAnimationFrame(() => this.animate());
  }
  
  drawPortalRings(time) {
    // Draw portal rings
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    
    this.portalRings.forEach(ring => {
      // Calculate current rotation
      const rotation = ring.rotation + time * ring.rotationSpeed * this.portalProgress;
      
      this.ctx.strokeStyle = ring.color;
      this.ctx.lineWidth = ring.lineWidth;
      
      // Draw segmented ring
      for (let i = 0; i < ring.segments; i++) {
        const segmentAngle = Math.PI * 2 / ring.segments;
        const startAngle = rotation + i * segmentAngle;
        const endAngle = startAngle + segmentAngle * ring.segmentLength;
        
        this.ctx.beginPath();
        this.ctx.arc(ring.x, ring.y, ring.radius * this.portalProgress, startAngle, endAngle);
        this.ctx.stroke();
      }
    });
  }
  
  drawPortalBeams(time) {
    // Draw portal energy beams
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    
    this.beams.forEach(beam => {
      // Skip if portal is not open enough
      if (this.portalProgress < 0.3) return;
      
      // Calculate beam intensity
      const pulse = Math.sin(time * beam.pulseSpeed + beam.pulseOffset) * 0.5 + 0.5;
      const intensity = pulse * this.portalProgress;
      
      // Create gradient for beam
      const gradient = this.ctx.createLinearGradient(
        centerX, centerY,
        centerX + Math.cos(beam.angle) * beam.length,
        centerY + Math.sin(beam.angle) * beam.length
      );
      
      gradient.addColorStop(0, `rgba(255, 235, 59, ${0.8 * intensity})`);
      gradient.addColorStop(1, `rgba(255, 235, 59, 0)`);
      
      // Draw beam
      this.ctx.beginPath();
      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = beam.width * intensity;
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(
        centerX + Math.cos(beam.angle) * beam.length * this.portalProgress,
        centerY + Math.sin(beam.angle) * beam.length * this.portalProgress
      );
      this.ctx.stroke();
      
      // Add glow effect at beam origin
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(255, 235, 59, ${0.3 * intensity})`;
      this.ctx.arc(centerX, centerY, beam.width * intensity, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
  
  drawPortalParticles(time) {
    // Draw portal particles
    this.particles.forEach(particle => {
      // Skip if portal is closed
      if (this.portalProgress <= 0) return;
      
      // Update particle position
      if (this.portalProgress > 0) {
        // Move particles in orbits around center
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        const dx = particle.x - centerX;
        const dy = particle.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Current angle from center
        const angle = Math.atan2(dy, dx);
        
        // Calculate new position
        const speed = particle.speed * this.portalProgress;
        const newAngle = angle + speed * 0.01;
        
        // Add sine wave motion
        const sineOffset = Math.sin(time * speed + particle.sinOffset) * 5 * this.portalProgress;
        
        particle.x = centerX + Math.cos(newAngle) * (distance + sineOffset);
        particle.y = centerY + Math.sin(newAngle) * (distance + sineOffset);
        
        // Add some attraction to original position when portal is closing
        if (this.portalProgress < 0.5) {
          const returnFactor = (0.5 - this.portalProgress) * 0.1;
          particle.x += (particle.originalX - particle.x) * returnFactor;
          particle.y += (particle.originalY - particle.y) * returnFactor;
        }
      }
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.fillStyle = particle.color;
      this.ctx.arc(
        particle.x, 
        particle.y, 
        particle.radius * this.portalProgress, 
        0, 
        Math.PI * 2
      );
      this.ctx.fill();
    });
  }
  
  // Helper functions
  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  
  normalizeAngle(angle) {
    // Normalize angle to [-PI, PI]
    return angle - Math.PI * 2 * Math.floor((angle + Math.PI) / (Math.PI * 2));
  }
  
  addStyles() {
    if (!document.getElementById('quantum-being-styles')) {
      const style = document.createElement('style');
      style.id = 'quantum-being-styles';
      style.textContent = `
        .quantum-being-container {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: rgba(10, 10, 26, 0.8);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .quantum-being-canvas {
          flex: 1;
          display: block;
          width: 100%;
        }
        
        .portal-message {
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          text-align: center;
          color: white;
          font-size: 16px;
          padding: 10px;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 10px;
          margin: 0 auto;
          max-width: 80%;
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          pointer-events: none;
        }
        
        .portal-message.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .portal-activate-button {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(255, 235, 59, 0.3);
          color: white;
          border: 2px solid rgba(255, 235, 59, 0.5);
          border-radius: 30px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          outline: none;
        }
        
        .portal-activate-button:hover {
          background-color: rgba(255, 235, 59, 0.5);
          box-shadow: 0 0 20px rgba(255, 235, 59, 0.5);
        }
        
        .portal-activate-button.active {
          background-color: rgba(255, 87, 34, 0.5);
          border-color: rgba(255, 87, 34, 0.7);
        }
        
        .portal-activate-button.active:hover {
          background-color: rgba(255, 87, 34, 0.7);
          box-shadow: 0 0 20px rgba(255, 87, 34, 0.5);
        }
        
        .connection-meter {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          max-width: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .meter-label {
          color: white;
          font-size: 14px;
          margin-bottom: 5px;
          text-align: center;
        }
        
        .connection-value {
          font-weight: bold;
        }
        
        .meter-bar {
          width: 100%;
          height: 10px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 5px;
          overflow: hidden;
        }
        
        .meter-fill {
          height: 100%;
          width: 0%;
          background-color: rgba(255, 235, 59, 0.7);
          transition: width 0.3s ease, background-color 0.3s ease;
        }
      `;
      document.head.appendChild(style);
    }
  }
}