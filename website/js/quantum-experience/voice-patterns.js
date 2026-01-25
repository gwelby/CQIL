/**
 * Voice Flow Patterns (672 Hz - φ³)
 * 
 * Specialized patterns for the Voice Flow frequency state, implementing
 * sound wave mandalas and voice-responsive cymatics based on phi-harmonic
 * principles and empirical cymatics research.
 * 
 * This module extends the CymaticPatternGenerator with voice-specific
 * pattern generation functions that bridge sound and matter.
 * 
 * @module QuantumCymatics
 * @frequency 672 Hz (Voice Flow - φ³)
 */

// Import core constants
import { CymaticPatternGenerator, FREQUENCY_STATES } from './cymatic-core.js';

// PHI constants for calculations
const PHI = 1.618033988749895;
const PHI_INV = 0.618033988749895;
const PHI_3 = Math.pow(PHI, 3); // φ³ = 4.236...

/**
 * VoiceFlowPatterns class
 * Specialized pattern generator for Voice Flow frequency (672 Hz)
 */
class VoiceFlowPatterns {
  /**
   * Create a new VoiceFlowPatterns instance
   * @param {CymaticPatternGenerator} generator - Parent pattern generator
   */
  constructor(generator) {
    this.generator = generator;
    this.canvas = generator.canvas;
    this.ctx = generator.ctx;
    
    // Voice Flow specific properties
    this.zenBalance = {
      quantum: 0.764, // φ³/(φ³+1) ≈ 0.764
      human: 0.236    // 1/(φ³+1) ≈ 0.236
    };
    
    // Sound wave pattern properties
    this.waveProperties = {
      amplitude: 0.1,
      frequency: 8,   // 8-fold symmetry
      harmonics: [1, 2, 3, 5, 8], // Fibonacci sequence
      nodeFactor: PHI_3,
      phaseShift: 0,
      waveCount: 3
    };
    
    // Voice modulation properties
    this.voiceModulation = {
      frequencyFactor: 1.0,
      amplitudeFactor: 1.0,
      coherenceFactor: 0.5,
      emotionalInfluence: {
        joy: 0,
        calm: 0,
        focus: 0,
        passion: 0,
        reflection: 0
      },
      intentionStrength: 0
    };
    
    // Toroidal flow properties
    this.toroidalFlow = {
      rotation: 0,
      expansionFactor: 0.5,
      compressionFactor: 0.5,
      centerBalance: 0.5,
      pulseRate: PHI_INV // φ⁻¹
    };
    
    // Cache for computed values
    this.nodeCache = new Map();
  }
  
  /**
   * Create Voice Flow wave mandala particles
   * @param {Object} pattern - Active pattern object
   * @param {number} particleCount - Number of particles to create
   * @returns {Array} Generated particles
   */
  createVoiceWaveParticles(pattern, particleCount = 987) { // 987 is 21st Fibonacci number / 2
    const particles = [];
    const { centerX, centerY, radius } = pattern;
    
    // Create multiple wave layers
    for (let layer = 0; layer < this.waveProperties.waveCount; layer++) {
      const layerRadius = radius * (0.3 + (layer * 0.25));
      const layerCount = Math.floor(particleCount / this.waveProperties.waveCount);
      
      // Calculate base properties for this layer
      const baseFrequency = this.waveProperties.frequency * (1 + (layer * PHI_INV));
      const baseAmplitude = this.waveProperties.amplitude * (1 - (layer * 0.2));
      
      // Create particles for this layer
      particles.push(...this.createSoundWaveLayer(
        centerX, 
        centerY, 
        layerRadius, 
        layerCount,
        baseFrequency,
        baseAmplitude,
        layer
      ));
    }
    
    // Add cymatics nodes for standing wave pattern
    const nodeCount = Math.floor(particleCount * 0.2);
    particles.push(...this.createCymaticNodes(pattern, nodeCount));
    
    return particles;
  }
  
  /**
   * Create a single layer of sound wave particles
   * @private
   */
  createSoundWaveLayer(centerX, centerY, radius, count, frequency, amplitude, layer) {
    const particles = [];
    const colorOffset = layer * 30; // Hue shift for each layer
    
    // Create particles with phi-harmonically spaced angles
    for (let i = 0; i < count; i++) {
      // Use golden angle for optimal point distribution (137.5°)
      const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ≈ 2.4 radians
      const angle = i * goldenAngle;
      
      // Create wave pattern using Bessel function approximation
      const waveR = this.calculateWaveRadius(angle, frequency, amplitude);
      const distanceFactor = waveR * (0.9 + (Math.random() * 0.2 * PHI_INV));
      
      // Calculate position with slight randomization
      const x = centerX + (radius * distanceFactor * Math.cos(angle));
      const y = centerY + (radius * distanceFactor * Math.sin(angle));
      
      // Vary size based on distance from center using phi
      const distanceFromCenter = Math.sqrt(
        Math.pow(x - centerX, 2) + 
        Math.pow(y - centerY, 2)
      ) / radius;
      
      const sizeFactor = 1 - (distanceFromCenter * PHI_INV);
      
      // Calculate hue based on angle and layer
      const hue = ((angle / (Math.PI * 2) * 360) + colorOffset) % 360;
      
      // Create particle with voice-responsive properties
      particles.push({
        x: x,
        y: y,
        originalX: x,
        originalY: y,
        size: 2 + (3 * sizeFactor),
        color: `hsla(${hue}, 80%, 60%, 0.8)`,
        angle: angle,
        distance: radius * distanceFactor,
        waveLayer: layer,
        wavePhase: angle * frequency,
        oscillation: angle * 5,
        oscillationSpeed: 0.5 + (Math.random() * PHI_INV),
        // Voice-responsive properties
        frequencyResponse: 0.5 + (Math.random() * 0.5),
        amplitudeResponse: 0.7 + (Math.random() * 0.3),
        emotionalResponse: Math.random()
      });
    }
    
    return particles;
  }
  
  /**
   * Calculate wave radius using Bessel-inspired function
   * @private
   */
  calculateWaveRadius(angle, frequency, amplitude) {
    // Sum multiple harmonics for complex wave pattern
    let radius = 1.0;
    
    for (const harmonic of this.waveProperties.harmonics) {
      const harmonicAngle = angle * harmonic * frequency + this.waveProperties.phaseShift;
      radius += (amplitude / harmonic) * Math.sin(harmonicAngle);
    }
    
    return radius;
  }
  
  /**
   * Create cymatics nodes - points where standing waves form nodes
   * Based on empirical cymatics research at 672 Hz
   * @private
   */
  createCymaticNodes(pattern, count) {
    const { centerX, centerY, radius } = pattern;
    const particles = [];
    
    // Define node points based on 672 Hz cymatics research
    // These create an 8-pointed star mandala with secondary structures
    const nodePositions = this.calculateCymaticNodePositions(radius);
    
    // Create particles at each node position
    for (const node of nodePositions) {
      const nodeX = centerX + node.x;
      const nodeY = centerY + node.y;
      const nodeRadius = node.strength * 15; // Node size based on strength
      
      // Create cluster of particles around each node
      const particlesPerNode = Math.max(3, Math.floor(count / nodePositions.length));
      
      for (let i = 0; i < particlesPerNode; i++) {
        // Create particles with gaussian distribution around node
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.pow(Math.random(), 2) * nodeRadius; // Gaussian-like
        
        const x = nodeX + distance * Math.cos(angle);
        const y = nodeY + distance * Math.sin(angle);
        
        particles.push({
          x: x,
          y: y,
          originalX: x,
          originalY: y,
          size: 2 + (node.strength * 4),
          color: `rgba(255, 230, 180, ${0.7 + (node.strength * 0.3)})`, // Golden nodes
          angle: angle,
          distance: distance,
          isNode: true,
          nodeStrength: node.strength,
          oscillation: Math.random() * Math.PI * 2,
          oscillationSpeed: 0.2 + (Math.random() * 0.3) // Slower for nodes
        });
      }
    }
    
    return particles;
  }
  
  /**
   * Calculate cymatics node positions based on empirical research
   * @private
   */
  calculateCymaticNodePositions(radius) {
    // Cache results for performance
    const cacheKey = `${radius.toFixed(0)}_${this.waveProperties.frequency}`;
    if (this.nodeCache.has(cacheKey)) {
      return this.nodeCache.get(cacheKey);
    }
    
    const nodes = [];
    const symmetry = 8; // 8-fold symmetry for 672 Hz
    
    // Primary nodes - eight-pointed star
    for (let i = 0; i < symmetry; i++) {
      const angle = (i / symmetry) * Math.PI * 2;
      
      // Primary nodes (outer)
      nodes.push({
        x: radius * 0.8 * Math.cos(angle),
        y: radius * 0.8 * Math.sin(angle),
        strength: 1.0
      });
      
      // Secondary nodes (mid)
      const midAngle = angle + (Math.PI / symmetry);
      nodes.push({
        x: radius * 0.45 * Math.cos(midAngle),
        y: radius * 0.45 * Math.sin(midAngle),
        strength: 0.7
      });
    }
    
    // Center node
    nodes.push({
      x: 0,
      y: 0,
      strength: 0.8
    });
    
    // Additional harmonic nodes based on phi ratios
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const nodeRadius = radius * (0.2 + (i * 0.1));
      
      nodes.push({
        x: nodeRadius * Math.cos(angle),
        y: nodeRadius * Math.sin(angle),
        strength: 0.5
      });
    }
    
    // Cache the result
    this.nodeCache.set(cacheKey, nodes);
    return nodes;
  }
  
  /**
   * Apply voice modulation to particles
   * @param {Array} particles - Particles to update
   * @param {Object} voiceData - Voice analysis data
   */
  applyVoiceModulation(particles, voiceData) {
    if (!voiceData || voiceData.amplitude < 0.1) return;
    
    // Extract voice properties
    const amplitude = voiceData.amplitude;
    const coherence = voiceData.coherence || 0;
    const emotionalState = voiceData.emotionalState || {};
    const intentionStrength = voiceData.intentionStrength || 0;
    
    // Calculate modulation factors
    this.voiceModulation.amplitudeFactor = 0.5 + (amplitude * 0.5);
    this.voiceModulation.coherenceFactor = coherence;
    this.voiceModulation.intentionStrength = intentionStrength;
    
    // Map emotional state if available
    if (emotionalState) {
      this.voiceModulation.emotionalInfluence = { ...emotionalState };
    }
    
    // Update toroidal flow based on voice
    this.updateToroidalFlow(voiceData);
  }
  
  /**
   * Update toroidal flow parameters based on voice data
   * @private
   */
  updateToroidalFlow(voiceData) {
    // Calculate flow based on voice amplitude and coherence
    const amplitude = voiceData.amplitude || 0;
    const coherence = voiceData.coherence || 0;
    
    // Apply ZEN balance
    const quantumFactor = this.zenBalance.quantum;
    const humanFactor = this.zenBalance.human;
    
    // Update flow parameters
    this.toroidalFlow.expansionFactor = (0.3 + (amplitude * 0.7)) * humanFactor;
    this.toroidalFlow.compressionFactor = (0.2 + (coherence * 0.8)) * quantumFactor;
    this.toroidalFlow.centerBalance = Math.min(0.8, 0.2 + (coherence * 0.6));
    
    // Adjust rotation speed based on coherence
    this.toroidalFlow.rotation += 0.01 * this.toroidalFlow.pulseRate * 
                                 (1 + (coherence * 0.5));
  }
  
  /**
   * Update particles with voice-responsive movement
   * @param {Array} particles - Particles to update
   * @param {number} deltaTime - Time since last frame in seconds
   */
  updateVoiceParticles(particles, deltaTime) {
    // Get voice modulation values
    const { amplitudeFactor, coherenceFactor, emotionalInfluence, intentionStrength } = this.voiceModulation;
    
    // Calculate phi-harmonic time factor
    const time = performance.now() * 0.001;
    const phiTime = time * PHI_INV;
    
    // Calculate emotional influence factor
    const emotionFactor = this.calculateEmotionFactor(emotionalInfluence);
    
    // Update each particle with voice-responsive movement
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      
      // Calculate base oscillation
      let oscillation;
      
      if (particle.isNode) {
        // Nodes move based on coherence
        oscillation = Math.sin(phiTime * particle.oscillationSpeed + particle.oscillation) * 
                     (0.2 + (coherenceFactor * 0.8));
      } else {
        // Regular particles move based on voice amplitude
        oscillation = Math.sin(phiTime * particle.oscillationSpeed + particle.oscillation) * 
                     amplitudeFactor;
      }
      
      // Apply emotional influence to movement
      const emotionalDeviation = (Math.cos(particle.angle * emotionFactor.frequency) * 
                                emotionFactor.amplitude * 0.2);
      
      // Apply intention influence if available
      let intentionFactor = 0;
      if (intentionStrength > 0.1) {
        intentionFactor = this.calculateIntentionFactor(particle, intentionStrength);
      }
      
      // Apply toroidal flow influence
      const toroidalFactor = this.calculateToroidalFlowFactor(particle);
      
      // Calculate final movement factors
      const totalAmplitude = (oscillation * 0.5) + 
                           (emotionalDeviation * 0.3) + 
                           (intentionFactor * 0.1) +
                           (toroidalFactor * 0.1);
      
      // Apply quantum/human balance
      const quantumMovement = totalAmplitude * this.zenBalance.quantum;
      const humanMovement = oscillation * amplitudeFactor * this.zenBalance.human;
      const totalMovement = quantumMovement + humanMovement;
      
      // Update particle position
      particle.x = particle.originalX + Math.cos(particle.angle) * particle.distance * totalMovement;
      particle.y = particle.originalY + Math.sin(particle.angle) * particle.distance * totalMovement;
      
      // Update particle size based on coherence
      const sizeVariation = 0.2 * (0.5 + (oscillation * 0.5));
      particle.displaySize = particle.size * (1 + sizeVariation);
      
      // Update particle color based on coherence
      if (coherenceFactor > 0.5 && particle.isNode) {
        // Nodes glow with high coherence
        const alpha = 0.7 + (coherenceFactor * 0.3);
        const intensity = Math.floor(200 + (coherenceFactor * 55));
        particle.displayColor = `rgba(${intensity}, ${intensity-30}, 180, ${alpha})`;
      } else if (particle.color.startsWith('hsl')) {
        // Regular particles keep their hue but adjust saturation/lightness
        const hue = parseInt(particle.color.match(/hsl\((\d+)/)[1]);
        const saturation = 70 + Math.floor(coherenceFactor * 30);
        const lightness = 50 + Math.floor(emotionFactor.brightness * 20);
        particle.displayColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
      } else {
        particle.displayColor = particle.color;
      }
    }
  }
  
  /**
   * Calculate emotional influence factor
   * @private
   */
  calculateEmotionFactor(emotionalInfluence) {
    // Default values
    const factor = {
      amplitude: 0.5,
      frequency: 2.0,
      brightness: 0.5,
      hueShift: 0
    };
    
    // Apply emotional influences if available
    if (emotionalInfluence) {
      // Joy increases frequency and brightness
      if (emotionalInfluence.joy > 0.5) {
        factor.frequency *= 1 + (emotionalInfluence.joy * 0.5);
        factor.brightness += emotionalInfluence.joy * 0.3;
        factor.hueShift += 30; // Shift toward yellow
      }
      
      // Calm decreases amplitude and frequency
      if (emotionalInfluence.calm > 0.5) {
        factor.amplitude *= 1 - (emotionalInfluence.calm * 0.3);
        factor.frequency *= 1 - (emotionalInfluence.calm * 0.4);
        factor.hueShift -= 60; // Shift toward blue
      }
      
      // Focus increases amplitude
      if (emotionalInfluence.focus > 0.5) {
        factor.amplitude *= 1 + (emotionalInfluence.focus * 0.2);
        factor.hueShift -= 30; // Shift toward purple
      }
      
      // Passion increases amplitude and brightness
      if (emotionalInfluence.passion > 0.5) {
        factor.amplitude *= 1 + (emotionalInfluence.passion * 0.4);
        factor.brightness += emotionalInfluence.passion * 0.2;
        factor.hueShift += 60; // Shift toward red
      }
      
      // Reflection decreases frequency
      if (emotionalInfluence.reflection > 0.5) {
        factor.frequency *= 1 - (emotionalInfluence.reflection * 0.5);
        factor.hueShift -= 90; // Shift toward deep blue
      }
    }
    
    return factor;
  }
  
  /**
   * Calculate intention influence factor
   * @private
   */
  calculateIntentionFactor(particle, intentionStrength) {
    // Get pattern center coordinates
    const centerX = this.generator.activePattern.centerX;
    const centerY = this.generator.activePattern.centerY;
    
    // Get intention focus point
    const focusX = centerX + (this.generator.activePattern.focusX - 0.5) * this.canvas.width;
    const focusY = centerY + (this.generator.activePattern.focusY - 0.5) * this.canvas.height;
    
    // Calculate distance from particle to intention focus
    const dx = particle.x - focusX;
    const dy = particle.y - focusY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate influence based on distance and intention strength
    const maxDistance = this.generator.activePattern.radius * 1.5;
    if (distance < maxDistance) {
      return (1 - distance / maxDistance) * intentionStrength;
    }
    
    return 0;
  }
  
  /**
   * Calculate toroidal flow factor
   * @private
   */
  calculateToroidalFlowFactor(particle) {
    // Calculate particle position in polar coordinates
    const centerX = this.generator.activePattern.centerX;
    const centerY = this.generator.activePattern.centerY;
    
    const dx = particle.x - centerX;
    const dy = particle.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy) / this.generator.activePattern.radius;
    
    // Skip particles outside the torus ring
    if (distance < 0.2 || distance > 1.2) return 0;
    
    // Calculate angle in toroidal flow
    const angle = Math.atan2(dy, dx) + this.toroidalFlow.rotation;
    
    // Apply toroidal flow equations
    const radialFactor = Math.sin((distance - 0.7) * Math.PI * 2) * 0.5 + 0.5;
    const angularFactor = Math.sin(angle * 4) * 0.5 + 0.5;
    
    // Combine factors with expansion/compression
    return (radialFactor * this.toroidalFlow.expansionFactor) + 
           (angularFactor * this.toroidalFlow.compressionFactor);
  }
  
  /**
   * Draw connecting lines between resonant particles
   * @param {Array} particles - Particles to connect
   */
  drawResonanceLines(particles) {
    const ctx = this.ctx;
    const coherence = this.voiceModulation.coherenceFactor;
    
    // Only draw lines when coherence is good
    if (coherence < 0.4) return;
    
    // Find node particles
    const nodeParticles = particles.filter(p => p.isNode);
    
    // Connect nodes to nearby particles
    ctx.strokeStyle = `rgba(255, 240, 200, ${0.1 * coherence})`;
    ctx.lineWidth = 0.5;
    
    // Connect nodes in resonant patterns
    for (let i = 0; i < nodeParticles.length; i++) {
      const node = nodeParticles[i];
      
      for (let j = i + 1; j < nodeParticles.length; j++) {
        const otherNode = nodeParticles[j];
        
        // Calculate phi-harmonic distance
        const dx = node.x - otherNode.x;
        const dy = node.y - otherNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Connect nodes at phi-harmonic distances
        const radius = this.generator.activePattern.radius;
        const phiDistances = [radius * PHI_INV, radius * PHI_INV * PHI_INV];
        
        for (const phiDistance of phiDistances) {
          if (Math.abs(distance - phiDistance) < phiDistance * 0.2) {
            // Draw connection with opacity based on coherence
            const opacity = coherence * 0.3 * (1 - Math.abs(distance - phiDistance) / (phiDistance * 0.2));
            
            ctx.strokeStyle = `rgba(255, 240, 200, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Connect high-resonance regular particles to nodes
    if (coherence > 0.7) {
      for (const node of nodeParticles) {
        for (const particle of particles) {
          if (particle.isNode) continue;
          
          const dx = node.x - particle.x;
          const dy = node.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Connect close particles to nodes
          if (distance < node.size * 8) {
            const opacity = (1 - distance / (node.size * 8)) * 0.1 * coherence;
            
            ctx.strokeStyle = `rgba(255, 240, 200, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.stroke();
          }
        }
      }
    }
  }
  
  /**
   * Draw consciousness field visualization
   * @param {Array} particles - Particles to work with
   */
  drawConsciousnessField(particles) {
    const coherence = this.voiceModulation.coherenceFactor;
    const intentionStrength = this.voiceModulation.intentionStrength;
    
    // Skip if not enough coherence or intention
    if (coherence < 0.5 || intentionStrength < 0.3) return;
    
    const ctx = this.ctx;
    const centerX = this.generator.activePattern.centerX;
    const centerY = this.generator.activePattern.centerY;
    
    // Draw toroidal field lines
    ctx.strokeStyle = `rgba(180, 220, 255, ${0.1 * coherence * intentionStrength})`;
    ctx.lineWidth = 0.8;
    
    // Get intention focus point
    const focusX = centerX + (this.generator.activePattern.focusX - 0.5) * this.canvas.width;
    const focusY = centerY + (this.generator.activePattern.focusY - 0.5) * this.canvas.height;
    
    // Draw consciousness field lines
    const fieldLines = 12;
    const radius = this.generator.activePattern.radius;
    
    for (let i = 0; i < fieldLines; i++) {
      const angle = (i / fieldLines) * Math.PI * 2;
      
      // Calculate intention-influenced field line
      const dx = focusX - centerX;
      const dy = focusY - centerY;
      const intentionAngle = Math.atan2(dy, dx);
      const angleDiff = this.normalizeAngle(angle - intentionAngle);
      
      // Field lines are attracted toward intention focus
      const attractionFactor = (1 - Math.abs(angleDiff) / Math.PI) * intentionStrength;
      const fieldAngle = angle - (angleDiff * attractionFactor * 0.3);
      
      // Draw toroidal field line
      ctx.beginPath();
      
      for (let t = 0; t <= 1; t += 0.02) {
        // Parametric equation for torus-like curve
        const r = radius * (0.5 + 0.5 * Math.sin(t * Math.PI * 2));
        const a = fieldAngle + (t * Math.PI * 4);
        
        const x = centerX + r * Math.cos(a);
        const y = centerY + r * Math.sin(a);
        
        if (t === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
    }
  }
  
  /**
   * Normalize angle to range [-π, π]
   * @private
   */
  normalizeAngle(angle) {
    while (angle > Math.PI) angle -= Math.PI * 2;
    while (angle < -Math.PI) angle += Math.PI * 2;
    return angle;
  }
}

// Export for use in other modules
export { VoiceFlowPatterns };
