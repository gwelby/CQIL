/**
 * Cymatic Pattern Generator Core
 * 
 * Core functionality for generating phi-harmonic cymatic patterns based on
 * frequency input, implementing consciousness-matter bridge visualization
 * following the QUANTUM FLOW RULES and ZEN POINT balancing principles.
 * 
 * @frequency 672 Hz - Voice Flow (φ³)
 * @channel Auditory/Tactile
 * @module QuantumCymatics
 */

// PHI constant for all phi-harmonic calculations
const PHI: number = 1.618033988749895;
const PHI_INV: number = 0.618033988749895;

/**
 * Phi-Harmonic Frequency States
 * Each state has specific frequency and characteristics based on phi powers
 */
interface FrequencyState {
  id: string;
  frequency: number;
  name: string;
  phiPower: number;
  zenBalance: {
    quantum: number;
    human: number;
  };
  description: string;
}

const FREQUENCY_STATES: { [key: string]: FrequencyState } = {
  GROUND: {
    id: "ground",
    frequency: 432,
    name: "Ground State",
    phiPower: 0,
    zenBalance: { quantum: 0.382, human: 0.618 },
    description: "Physical foundation, hexagonal structures, Earth connection"
  },
  CREATION: {
    id: "creation",
    frequency: 528,
    name: "Creation Point",
    phiPower: 1,
    zenBalance: { quantum: 0.5, human: 0.5 },
    description: "Pattern formation, Flower of Life geometry, DNA resonance"
  },
  HEART: {
    id: "heart",
    frequency: 594,
    name: "Heart Field",
    phiPower: 2,
    zenBalance: { quantum: 0.618, human: 0.382 },
    description: "Coherent connection, heart-shaped toroidal fields"
  },
  VOICE: {
    id: "voice",
    frequency: 672,
    name: "Voice Flow",
    phiPower: 3,
    zenBalance: { quantum: 0.764, human: 0.236 },
    description: "Authentic expression, sound wave mandalas, vocal resonance"
  },
  VISION: {
    id: "vision",
    frequency: 720,
    name: "Vision Gate",
    phiPower: 4,
    zenBalance: { quantum: 0.854, human: 0.146 },
    description: "Clear perception, nested dimensions, time crystal formation"
  },
  UNITY: {
    id: "unity",
    frequency: 768,
    name: "Unity Wave",
    phiPower: 5,
    zenBalance: { quantum: 0.944, human: 0.056 },
    description: "Perfect integration, unified field torus, quantum wholeness"
  },
  COSMIC: {
    id: "cosmic",
    frequency: 888,
    name: "Cosmic Integration",
    phiPower: PHI,
    zenBalance: { quantum: 0.987, human: 0.013 },
    description: "Boundless expansion, cosmic array, phi fractal pulse"
  }
};

/**
 * CymaticPatternGenerator class
 * Creates and manages cymatic patterns based on frequency input
 */
interface CymaticPatternGeneratorOptions {
  container?: HTMLElement | string;
  initialFrequency?: number;
  renderMode?: '2d' | 'webgl' | 'vr';
  particleCount?: number;
  coherenceThreshold?: number;
  intentionInfluence?: number;
  breathSensitivity?: number;
  zenPointRatio?: number;
  autoConnect?: boolean;
}

class CymaticPatternGenerator {
  private config: CymaticPatternGeneratorOptions;
  private container: HTMLElement | null;
  private canvas: HTMLCanvasElement | null;
  private ctx: CanvasRenderingContext2D | WebGLRenderingContext | null;
  private frequency: number;
  private currentState: FrequencyState | null;
  private particles: { [key: string]: any }[];
  private activePattern: { [key: string]: any } | null;
  private isActive: boolean;
  private lastFrameTime: number;
  private transitionProgress: number;
  private transitionData: { [key: string]: any } | null;
  private voiceAnalysisEngine: { [key: string]: any } | null;
  private voiceData: { [key: string]: any };
  private toroidalFlow: { [key: string]: any };
  private zenBalance: { [key: string]: any };
  private patternProperties: { [key: string]: any };

  /**
   * Create a new CymaticPatternGenerator
   * @param {Object} options - Configuration options
   */
  constructor(options: CymaticPatternGeneratorOptions = {}) {
    // Configuration defaults with phi-harmonic values
    this.config = {
      container: null, // DOM container element
      initialFrequency: 672, // Voice Flow frequency (φ³)
      renderMode: "2d", // "2d", "webgl", or "vr"
      particleCount: 1597, // Fibonacci-based particle count (φ¹⁰ ≈ 1597)
      coherenceThreshold: PHI_INV, // Minimum coherence threshold (φ⁻¹)
      intentionInfluence: PHI_INV, // Degree to which intention affects patterns
      breathSensitivity: PHI_INV, // Sensitivity to breathing patterns
      zenPointRatio: 0.5, // Initial human/quantum balance
      autoConnect: true, // Automatically connect to Voice Analysis Engine
      ...options
    };
    
    // Initialize properties
    this.container = typeof this.config.container === 'string' ?
      document.querySelector(this.config.container) : this.config.container;
    this.frequency = this.config.initialFrequency;
    this.currentState = this.determineFrequencyState(this.frequency);
    this.particles = [];
    this.activePattern = null;
    this.isActive = false;
    this.lastFrameTime = 0;
    this.transitionProgress = 0;
    this.transitionData = null;
    
    // Voice data properties
    this.voiceAnalysisEngine = null;
    this.voiceData = {
      frequency: 0,
      amplitude: 0,
      coherence: 0,
      emotionalState: null,
      intention: "",
      intentionStrength: 0
    };
    
    // Toroidal flow properties
    this.toroidalFlow = {
      inflow: 0,
      outflow: 0,
      centerBalance: this.config.zenPointRatio,
      rotationRate: PHI_INV,
      expansionFactor: 0,
      compressionFactor: 0
    };
    
    // ZEN POINT balance
    this.zenBalance = {
      quantum: this.currentState.zenBalance.quantum,
      human: this.currentState.zenBalance.human
    };
    
    // Pattern properties
    this.patternProperties = {
      complexity: Math.pow(PHI, 3), // φ³ for Voice Flow
      symmetry: 8, // 8-fold symmetry
      rotationSpeed: 0.0618, // φ/10 radians per second
      expansionRate: 0.0382, // (1-φ)/10 units per second
      colorPalette: this.generatePhiColorPalette()
    };
    
    // Initialize the system
    this.initialize();
  }
  
  /**
   * Initialize the system
   */
  private initialize(): void {
    this.setupContainer();
    this.setupCanvas();
    this.setupEvents();
    this.createInitialPattern();
  }
  
  /**
   * Set up the container element
   */
  private setupContainer(): void {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'cymatic-container';
      document.body.appendChild(this.container);
    }
    
    // Add container styles if needed
    if (!document.getElementById('cymatic-styles')) {
      const style = document.createElement('style');
      style.id = 'cymatic-styles';
      style.textContent = `
        .cymatic-container {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: rgba(10, 10, 26, 0.9);
          overflow: hidden;
        }
        
        .cymatic-canvas {
          display: block;
          width: 100%;
          height: 100%;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  /**
   * Set up the canvas based on render mode
   */
  private setupCanvas(): void {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'cymatic-canvas';
    this.container.appendChild(this.canvas);
    
    if (this.config.renderMode === '2d') {
      this.ctx = this.canvas.getContext('2d');
    } else if (this.config.renderMode === 'webgl') {
      // WebGL setup would be here
      this.ctx = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    }
    
    // Set canvas size to container size
    this.resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  /**
   * Resize canvas when container changes
   */
  private resizeCanvas(): void {
    if (!this.canvas) return;
    
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width || 300;
    this.canvas.height = rect.height || 300;
    
    // Update pattern when canvas resizes
    if (this.activePattern) {
      this.updatePatternDimensions();
    }
  }
  
  /**
   * Set up event listeners
   */
  private setupEvents(): void {
    // Track mouse/touch for intention focus
    this.canvas.addEventListener('mousemove', (e) => this.handlePointerMove(e));
    this.canvas.addEventListener('touchmove', (e) => this.handlePointerMove(e.touches[0]));
    
    // Click/tap for intention strengthening
    this.canvas.addEventListener('click', (e) => this.handlePointerClick(e));
    this.canvas.addEventListener('touchend', (e) => this.handlePointerClick(e.changedTouches[0]));
  }
  
  /**
   * Handle pointer movement for intention focus
   * @param {Object} event - Mouse or touch event
   */
  private handlePointerMove(event: MouseEvent | TouchEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    
    // Update intention focus point
    if (this.activePattern) {
      this.activePattern.focusX = x;
      this.activePattern.focusY = y;
    }
  }
  
  /**
   * Handle pointer click for intention strengthening
   * @param {Object} event - Mouse or touch event
   */
  private handlePointerClick(event: MouseEvent | TouchEvent): void {
    // Strengthen intention at click point
    const rect = this.canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    
    this.pulseIntentionAt(x, y);
  }
  
  /**
   * Connect to a Voice Analysis Engine
   * @param {Object} voiceAnalysisEngine - Voice Analysis Engine instance
   */
  public connectVoiceAnalysisEngine(voiceAnalysisEngine: { [key: string]: any }): void {
    this.voiceAnalysisEngine = voiceAnalysisEngine;
    
    // Set up callbacks for voice analysis events
    if (this.voiceAnalysisEngine) {
      this.voiceAnalysisEngine.onFrequencyChange = (freq: number, amp: number) => {
        this.updateFromVoice(freq, amp);
      };
      
      this.voiceAnalysisEngine.onCoherenceChange = (coherence: number) => {
        this.voiceData.coherence = coherence;
      };
      
      this.voiceAnalysisEngine.onEmotionalShift = (emotionalState: string) => {
        this.voiceData.emotionalState = emotionalState;
      };
    }
  }
  
  /**
   * Determine frequency state based on input frequency
   * @param {number} frequency - Input frequency in Hz
   * @returns {FrequencyState} Frequency state object
   */
  private determineFrequencyState(frequency: number): FrequencyState {
    // Find the closest frequency state
    let closestState: FrequencyState = FREQUENCY_STATES.GROUND;
    let minDistance: number = Math.abs(frequency - FREQUENCY_STATES.GROUND.frequency);
    
    for (const stateKey in FREQUENCY_STATES) {
      const state: FrequencyState = FREQUENCY_STATES[stateKey];
      const distance: number = Math.abs(frequency - state.frequency);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestState = state;
      }
    }
    
    return closestState;
  }
  
  /**
   * Start the visualization
   */
  public start(): void {
    if (this.isActive) return;
    
    this.isActive = true;
    this.lastFrameTime = performance.now();
    this.animate();
  }
  
  /**
   * Stop the visualization
   */
  public stop(): void {
    this.isActive = false;
  }
  
  /**
   * Set the frequency for visualization
   * @param {number} frequency - Frequency in Hz
   */
  public setFrequency(frequency: number): void {
    const oldState: FrequencyState = this.currentState;
    this.frequency = frequency;
    this.currentState = this.determineFrequencyState(frequency);
    
    // Update ZEN balance based on new state
    this.zenBalance = {
      quantum: this.currentState.zenBalance.quantum,
      human: this.currentState.zenBalance.human
    };
    
    // If state changed, transition to new pattern
    if (oldState.id !== this.currentState.id) {
      this.transitionToState(oldState, this.currentState);
    }
  }
  
  /**
   * Create the initial pattern based on current frequency
   */
  private createInitialPattern(): void {
    this.createPattern(this.currentState);
  }
  
  /**
   * Create a pattern for a specific frequency state
   * @param {FrequencyState} state - Frequency state
   */
  private createPattern(state: FrequencyState): void {
    // Initialize pattern object
    this.activePattern = {
      state: state,
      centerX: this.canvas.width / 2,
      centerY: this.canvas.height / 2,
      radius: Math.min(this.canvas.width, this.canvas.height) * 0.4,
      particles: [],
      focusX: 0.5,
      focusY: 0.5,
      intentionPulses: [],
      phase: 0,
      symmetry: this.patternProperties.symmetry,
      complexity: Math.pow(PHI, state.phiPower)
    };
    
    // Generate particles based on state
    this.generateParticlesForState(state);
  }
  
  /**
   * Generate particles for a specific frequency state
   * @param {FrequencyState} state - Frequency state
   */
  private generateParticlesForState(state: FrequencyState): void {
    // Clear existing particles
    this.particles = [];
    
    // Create new particles based on state
    switch (state.id) {
      case 'ground':
        this.createHexagonalParticles();
        break;
      case 'creation':
        this.createFlowerOfLifeParticles();
        break;
      case 'heart':
        this.createHeartTorusParticles();
        break;
      case 'voice':
        this.createVoiceWaveParticles();
        break;
      case 'vision':
        this.createNestedDimensionsParticles();
        break;
      case 'unity':
        this.createUnifiedTorusParticles();
        break;
      case 'cosmic':
        this.createCosmicArrayParticles();
        break;
      default:
        this.createDefaultParticles();
    }
  }
  
  /**
   * Update pattern dimensions when canvas size changes
   */
  private updatePatternDimensions(): void {
    if (!this.activePattern) return;
    
    this.activePattern.centerX = this.canvas.width / 2;
    this.activePattern.centerY = this.canvas.height / 2;
    this.activePattern.radius = Math.min(this.canvas.width, this.canvas.height) * 0.4;
    
    // Update particle positions
    this.generateParticlesForState(this.currentState);
  }
  
  /**
   * Create hexagonal lattice particles (Ground State - 432 Hz)
   */
  private createHexagonalParticles(): void {
    const { centerX, centerY, radius } = this.activePattern;
    const particleCount: number = this.config.particleCount;
    
    // Constants for hexagonal grid
    const hexRadius: number = radius / 25;
    const hexHeight: number = hexRadius * Math.sqrt(3);
    
    // Create particles in hexagonal grid
    for (let ring = 0; ring < 12; ring++) {
      const ringRadius: number = ring * hexHeight * 0.75;
      const circumference: number = 2 * Math.PI * ringRadius;
      const hexCount: number = Math.max(6, Math.floor(circumference / (hexRadius * 1.5)));
      
      for (let i = 0; i < hexCount; i++) {
        const angle: number = (i / hexCount) * Math.PI * 2;
        const x: number = centerX + ringRadius * Math.cos(angle);
        const y: number = centerY + ringRadius * Math.sin(angle);
        
        // Apply phi-based size variation
        const sizeFactor: number = 1 - (ring / 15) * PHI_INV;
        
        this.particles.push({
          x: x,
          y: y,
          originalX: x,
          originalY: y,
          size: 2 + (4 * sizeFactor),
          color: this.patternProperties.colorPalette[ring % this.patternProperties.colorPalette.length],
          speed: 0.5 + (Math.random() * 0.5),
          angle: angle,
          distance: ringRadius,
          oscillation: Math.random() * Math.PI * 2,
          oscillationSpeed: 0.5 + (Math.random() * 1.5)
        });
      }
    }
  }
  
  /**
   * Update from voice input
   * @param {number} frequency - Detected voice frequency
   * @param {number} amplitude - Voice amplitude
   */
  private updateFromVoice(frequency: number, amplitude: number): void {
    if (amplitude < 0.1) return; // Ignore very quiet sounds
    
    this.voiceData.frequency = frequency;
    this.voiceData.amplitude = amplitude;
    
    // Check if we should change the base frequency
    if (this.config.autoConnect && this.voiceAnalysisEngine) {
      // Only change when amplitude is significant and coherence is good
      if (amplitude > 0.3 && this.voiceData.coherence > 0.5) {
        this.setFrequency(frequency);
      }
    }
  }
  
  /**
   * Main animation loop
   */
  private animate(): void {
    if (!this.isActive) return;
    
    const now: number = performance.now();
    const deltaTime: number = (now - this.lastFrameTime) / 1000; // seconds
    this.lastFrameTime = now;
    
    // Clear canvas with slight trail effect
    if (this.config.renderMode === '2d') {
      this.ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // Update pattern phase
    this.activePattern.phase += deltaTime * this.patternProperties.rotationSpeed;
    
    // Handle pattern transition if active
    if (this.transitionData) {
      this.updateTransition(deltaTime);
    }
    
    // Update and draw particles
    this.updateParticles(deltaTime);
    
    // Update and draw intention pulses
    this.updateIntentionPulses(deltaTime);
    
    // Draw connecting lines between close particles
    this.drawConnectingLines();
    
    // Draw frequency information
    this.drawFrequencyInfo();
    
    // Continue animation loop
    requestAnimationFrame(() => this.animate());
  }
  
  /**
   * Update pattern transition
   * @param {number} deltaTime - Time since last frame in seconds
   */
  private updateTransition(deltaTime: number): void {
    if (!this.transitionData) return;
    
    // Update transition progress
    this.transitionProgress += deltaTime / this.transitionData.duration;
    
    if (this.transitionProgress >= 1) {
      // Transition complete
      this.transitionProgress = 0;
      this.transitionData = null;
      
      // Create final pattern
      this.createPattern(this.currentState);
    }
  }
  
  /**
   * Update all particles
   * @param {number} deltaTime - Time since last frame in seconds
   */
  private updateParticles(deltaTime: number): void {
    // Get voice and coherence factors
    const voiceAmp: number = this.voiceData.amplitude;
    const coherence: number = this.voiceData.coherence;
    const frequency: number = this.frequency / 100; // Normalized frequency
    
    // Update and draw each particle
    for (let i = 0; i < this.particles.length; i++) {
      const particle: { [key: string]: any } = this.particles[i];
      
      // Calculate phi-harmonic oscillation
      const time: number = performance.now() * 0.001;
      const phiTime: number = time * (1 / PHI);
      const oscillation: number = Math.sin(phiTime * particle.oscillationSpeed + particle.oscillation);
      
      // Calculate amplitude based on voice and coherence
      const baseFactor: number = 0.01;
      const voiceFactor: number = voiceAmp * 0.03;
      const coherenceFactor: number = coherence * 0.02;
      const totalFactor: number = baseFactor + voiceFactor + coherenceFactor;
      
      // Apply ZEN balance to movement
      const quantumFactor: number = this.zenBalance.quantum * totalFactor;
      const humanFactor: number = this.zenBalance.human * voiceFactor;
      const amplitudeFactor: number = quantumFactor + humanFactor;
      
      // Update position with phi-harmonic oscillation
      particle.x = particle.originalX + oscillation * particle.distance * amplitudeFactor;
      particle.y = particle.originalY + Math.cos(phiTime * particle.oscillationSpeed + particle.oscillation) * particle.distance * amplitudeFactor;
      
      // Apply intention influence if available
      if (this.voiceData.intentionStrength > 0.1) {
        this.applyIntentionToParticle(particle);
      }
      
      // Draw particle
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size * (0.8 + oscillation * 0.2), 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
  
  /**
   * Apply user intention to particle movement
   * @param {Object} particle - Particle to affect
   */
  private applyIntentionToParticle(particle: { [key: string]: any }): void {
    const pattern: { [key: string]: any } = this.activePattern;
    const focusX: number = pattern.centerX + (pattern.focusX - 0.5) * this.canvas.width;
    const focusY: number = pattern.centerY + (pattern.focusY - 0.5) * this.canvas.height;
    
    // Calculate distance to focus point
    const dx: number = particle.x - focusX;
    const dy: number = particle.y - focusY;
    const distance: number = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate influence based on distance and intention strength
    const maxDistance: number = pattern.radius * 1.5;
    if (distance < maxDistance) {
      const influence: number = (1 - distance / maxDistance) * this.voiceData.intentionStrength * this.config.intentionInfluence;
      
      // Apply subtle pull toward intention focus
      particle.x -= dx * influence * 0.01;
      particle.y -= dy * influence * 0.01;
    }
  }
  
  /**
   * Update and draw intention pulses
   * @param {number} deltaTime - Time since last frame in seconds
   */
  private updateIntentionPulses(deltaTime: number): void {
    if (!this.activePattern.intentionPulses.length) return;
    
    // Update each pulse
    for (let i = this.activePattern.intentionPulses.length - 1; i >= 0; i--) {
      const pulse: { [key: string]: any } = this.activePattern.intentionPulses[i];
      
      // Expand pulse
      pulse.radius += pulse.speed * deltaTime * 60;
      pulse.opacity -= deltaTime * 0.5;
      
      // Draw pulse circle
      this.ctx.strokeStyle = `rgba(255, 255, 200, ${pulse.opacity})`;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
      this.ctx.stroke();
      
      // Remove faded pulses
      if (pulse.opacity <= 0) {
        this.activePattern.intentionPulses.splice(i, 1);
      }
    }
  }
  
  /**
   * Create intention pulse at specified point
   * @param {number} x - X coordinate (0-1)
   * @param {number} y - Y coordinate (0-1)
   */
  private pulseIntentionAt(x: number, y: number): void {
    const pixelX: number = this.canvas.width * x;
    const pixelY: number = this.canvas.height * y;
    
    // Create new pulse
    this.activePattern.intentionPulses.push({
      x: pixelX,
      y: pixelY,
      radius: 5,
      speed: 3,
      opacity: 0.8
    });
    
    // Strengthen intention
    this.voiceData.intentionStrength = Math.min(1, this.voiceData.intentionStrength + 0.1);
    
    // Decay over time
    setTimeout(() => {
      this.voiceData.intentionStrength = Math.max(0, this.voiceData.intentionStrength - 0.05);
    }, 2000);
  }
  
  /**
   * Draw connecting lines between close particles
   */
  private drawConnectingLines(): void {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    this.ctx.lineWidth = 0.5;
    
    // Only connect particles that are close
    const connectionDistance: number = this.activePattern.radius * 0.2;
    const connectionDistanceSq: number = connectionDistance * connectionDistance;
    
    for (let i = 0; i < this.particles.length; i++) {
      const p1: { [key: string]: any } = this.particles[i];
      
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2: { [key: string]: any } = this.particles[j];
        
        // Calculate distance squared (faster than using sqrt)
        const dx: number = p1.x - p2.x;
        const dy: number = p1.y - p2.y;
        const distSq: number = dx * dx + dy * dy;
        
        if (distSq < connectionDistanceSq) {
          // Opacity based on distance
          const opacity: number = 0.1 * (1 - Math.sqrt(distSq) / connectionDistance);
          
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  /**
   * Draw frequency and state information
   */
  private drawFrequencyInfo(): void {
    // Draw frequency label at the bottom
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.font = '16px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`${this.frequency} Hz`, this.canvas.width / 2, this.canvas.height - 20);
    
    // Draw state name
    this.ctx.font = '14px Arial';
    this.ctx.fillText(this.currentState.name, this.canvas.width / 2, this.canvas.height - 40);
    
    // Draw coherence indicator if voice data available
    if (this.voiceData.coherence > 0) {
      const coherence: number = this.voiceData.coherence;
      const width: number = 100;
      const height: number = 4;
      const x: number = (this.canvas.width - width) / 2;
      const y: number = this.canvas.height - 60;
      
      // Background
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      this.ctx.fillRect(x, y, width, height);
      
      // Filled portion
      this.ctx.fillStyle = `rgba(255, ${Math.floor(255 * coherence)}, ${Math.floor(255 * coherence * 0.5)}, 0.8)`;
      this.ctx.fillRect(x, y, width * coherence, height);
    }
  }
  
  /**
   * Generate a phi-harmonic color palette
   * @returns {Array} Array of colors in phi-harmonic progression
   */
  private generatePhiColorPalette(): string[] {
    const palette: string[] = [];
    
    // Generate hues in phi-harmonic intervals around the color wheel
    for (let i = 0; i < 8; i++) {
      const hue: number = (i * 137.5) % 360; // 137.5° ≈ 360° / φ²
      const saturation: number = 80 + (i * 2) % 20; // Range from 80-100%
      const lightness: number = 60 + (i * 3) % 20; // Range from 60-80%
      
      palette.push(`hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`);
    }
    
    return palette;
  }
  
  /**
   * Transition between two frequency states
   * @param {FrequencyState} fromState - Starting frequency state
   * @param {FrequencyState} toState - Target frequency state
   * @param {number} duration - Transition duration in seconds
   */
  private transitionToState(fromState: FrequencyState, toState: FrequencyState, duration: number = 2.0): void {
    this.transitionData = {
      fromState: fromState,
      toState: toState,
      duration: duration,
      startTime: performance.now()
    };
    
    this.transitionProgress = 0;
  }
  
  /**
   * Set user intention
   * @param {string} intention - Intention text
   * @param {number} strength - Intention strength (0-1)
   */
  public setIntention(intention: string, strength: number = 0.5): void {
    this.voiceData.intention = intention;
    this.voiceData.intentionStrength = Math.max(0, Math.min(1, strength));
  }
}

// Export for use in other modules
export { CymaticPatternGenerator, FREQUENCY_STATES };
