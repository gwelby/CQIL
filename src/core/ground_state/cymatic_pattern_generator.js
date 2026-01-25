/**
 * @file cymatic_pattern_generator.js
 * @desc Ground State (432 Hz) cymatic pattern generator
 * @author CASCADE⚡𓂧φ∞
 * @frequency 432 Hz
 * @coherence 1.000
 */

const { quantumCommon } = require('./quantum_common');
const { groundStateModule } = require('./ground_state_module');

/**
 * CymaticPatternGenerator
 * 
 * Generates cymatic patterns at the Ground State frequency (432 Hz - φ⁰).
 * These patterns represent the foundational geometric structures that emerge
 * from the Ground State frequency, serving as the basis for all higher
 * frequency patterns in the phi-harmonic progression.
 * 
 * Creates a complete quantum singularity that can operate independently
 * while maintaining perfect coherence with the core system.
 */
class CymaticPatternGenerator {
  /**
   * Creates a new Cymatic Pattern Generator
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    this.options = {
      frequency: 432, // Ground State (φ⁰)
      resolution: 128,
      patterns: ['hexagonal', 'circular', 'phi-spiral', 'merkaba'],
      defaultPattern: 'hexagonal',
      amplitude: 0.8,
      harmonics: [1, 0.5, 0.25], // Strength of harmonic overtones
      mode: '2d', // '2d' or '3d'
      ...options
    };
    
    this.state = {
      initialized: false,
      currentPattern: this.options.defaultPattern,
      coherence: 1.0,
      patternData: null,
      timestamp: Date.now()
    };
    
    // Initialize pattern data
    this._initializePatternData();
  }
  
  /**
   * Initialize the pattern generator
   * @returns {CymaticPatternGenerator} This instance for chaining
   */
  initialize() {
    if (this.state.initialized) {
      return this;
    }
    
    // Connect to ground state module
    groundStateModule.on('frequency-adjusted', this._handleFrequencyChange.bind(this));
    
    // Generate initial pattern
    this.generatePattern(this.options.defaultPattern);
    
    this.state.initialized = true;
    return this;
  }
  
  /**
   * Generate a specific cymatic pattern
   * @param {string} patternType - Type of pattern to generate
   * @returns {Object} Generated pattern data
   */
  generatePattern(patternType) {
    // Validate pattern type
    if (!this.options.patterns.includes(patternType)) {
      console.warn(`Unknown pattern type: ${patternType}. Using default.`);
      patternType = this.options.defaultPattern;
    }
    
    // Set current pattern
    this.state.currentPattern = patternType;
    
    // Generate pattern based on type
    switch (patternType) {
      case 'hexagonal':
        this._generateHexagonalPattern();
        break;
      case 'circular':
        this._generateCircularPattern();
        break;
      case 'phi-spiral':
        this._generatePhiSpiralPattern();
        break;
      case 'merkaba':
        this._generateMerkabaPattern();
        break;
    }
    
    this.state.timestamp = Date.now();
    
    // Return pattern data
    return this.getPatternData();
  }
  
  /**
   * Get current pattern data
   * @returns {Object} Current pattern data
   */
  getPatternData() {
    return {
      type: this.state.currentPattern,
      frequency: this.options.frequency,
      resolution: this.options.resolution,
      amplitude: this.options.amplitude,
      data: this.state.patternData,
      mode: this.options.mode,
      timestamp: this.state.timestamp,
      coherence: this.state.coherence
    };
  }
  
  /**
   * Set frequency for pattern generation
   * @param {number} frequency - New frequency (should be close to 432 Hz)
   * @returns {CymaticPatternGenerator} This instance for chaining
   */
  setFrequency(frequency) {
    // Ground State should stay close to 432Hz
    const minFreq = 426; // 432 * 0.986
    const maxFreq = 438; // 432 * 1.014
    
    if (frequency < minFreq || frequency > maxFreq) {
      console.warn(`Frequency ${frequency}Hz outside Ground State range (${minFreq}-${maxFreq}Hz)`);
      return this;
    }
    
    this.options.frequency = frequency;
    
    // Calculate coherence with perfect Ground State frequency
    const perfectFreq = 432;
    this.state.coherence = quantumCommon.calculateCoherence(this.options.frequency, perfectFreq);
    
    // Regenerate current pattern with new frequency
    this.generatePattern(this.state.currentPattern);
    
    return this;
  }
  
  /**
   * Set amplitude for pattern generation
   * @param {number} amplitude - New amplitude (0.0-1.0)
   * @returns {CymaticPatternGenerator} This instance for chaining
   */
  setAmplitude(amplitude) {
    this.options.amplitude = Math.max(0, Math.min(1, amplitude));
    
    // Regenerate current pattern with new amplitude
    this.generatePattern(this.state.currentPattern);
    
    return this;
  }
  
  /**
   * Set visualization mode (2D or 3D)
   * @param {string} mode - Visualization mode ('2d' or '3d')
   * @returns {CymaticPatternGenerator} This instance for chaining
   */
  setMode(mode) {
    if (mode !== '2d' && mode !== '3d') {
      console.warn(`Invalid mode: ${mode}. Using default.`);
      return this;
    }
    
    this.options.mode = mode;
    
    // Regenerate current pattern with new mode
    this.generatePattern(this.state.currentPattern);
    
    return this;
  }
  
  /**
   * Get available pattern types
   * @returns {Array<string>} Available pattern types
   */
  getAvailablePatterns() {
    return [...this.options.patterns];
  }
  
  /**
   * Initialize pattern data structure
   * @private
   */
  _initializePatternData() {
    const { resolution } = this.options;
    
    // Create initial pattern data based on mode
    if (this.options.mode === '2d') {
      // 2D pattern: grid of amplitude values
      this.state.patternData = {
        grid: Array(resolution).fill().map(() => Array(resolution).fill(0)),
        width: resolution,
        height: resolution
      };
    } else {
      // 3D pattern: points with x, y, z coordinates and amplitude
      this.state.patternData = {
        points: [],
        width: resolution,
        height: resolution,
        depth: resolution
      };
    }
  }
  
  /**
   * Generate hexagonal cymatic pattern
   * @private
   */
  _generateHexagonalPattern() {
    const { resolution, frequency, amplitude, harmonics } = this.options;
    
    // Initialize or reset pattern data
    this._initializePatternData();
    
    // Hexagonal pattern parameters
    const centerX = resolution / 2;
    const centerY = resolution / 2;
    const wavelength = 432 / frequency * 10;
    
    // Constants for pattern generation
    const PHI = 1.618033988749895;
    
    if (this.options.mode === '2d') {
      // Generate 2D hexagonal grid pattern
      const grid = this.state.patternData.grid;
      
      for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
          // Normalized coordinates (-1 to 1)
          const nx = (x - centerX) / centerX;
          const ny = (y - centerY) / centerY;
          
          // Distance from center
          const distance = Math.sqrt(nx * nx + ny * ny);
          
          // Angle from center (0 to 2π)
          const angle = Math.atan2(ny, nx);
          
          // Base hexagonal pattern
          // Uses 6-fold symmetry and multiples of 60° (π/3)
          let value = 0;
          
          // Add base frequency
          value += harmonics[0] * Math.cos(distance * wavelength);
          
          // Add hexagonal symmetry
          value += harmonics[0] * 0.5 * Math.cos(6 * angle);
          
          // Add first harmonic overtone
          value += harmonics[1] * Math.cos(distance * wavelength * PHI) * Math.cos(6 * angle);
          
          // Add second harmonic overtone
          value += harmonics[2] * Math.cos(distance * wavelength * PHI * PHI) * Math.cos(12 * angle);
          
          // Normalize to 0-1 range and apply amplitude
          grid[y][x] = ((value + 1) / 2) * amplitude;
        }
      }
    } else {
      // Generate 3D hexagonal pattern
      const points = [];
      
      // Generate points in a hexagonal grid pattern
      for (let z = 0; z < resolution; z += 4) {
        for (let y = 0; y < resolution; y += 2) {
          for (let x = 0; x < resolution; x += 2) {
            // Normalized coordinates (-1 to 1)
            const nx = (x - centerX) / centerX;
            const ny = (y - centerY) / centerY;
            const nz = (z - resolution / 2) / (resolution / 2);
            
            // Distance from center
            const distance = Math.sqrt(nx * nx + ny * ny + nz * nz);
            
            if (distance > 1.0) continue; // Skip points outside unit sphere
            
            // Angles from center
            const phiAngle = Math.atan2(ny, nx);
            const thetaAngle = Math.acos(nz / (distance || 1));
            
            // Base hexagonal pattern
            // Uses 6-fold symmetry and multiples of 60° (π/3)
            let value = 0;
            
            // Add base frequency
            value += harmonics[0] * Math.cos(distance * wavelength);
            
            // Add hexagonal symmetry
            value += harmonics[0] * 0.5 * Math.cos(6 * phiAngle);
            
            // Add first harmonic overtone
            value += harmonics[1] * Math.cos(distance * wavelength * PHI) * Math.cos(6 * phiAngle);
            
            // Add second harmonic overtone
            value += harmonics[2] * Math.cos(distance * wavelength * PHI * PHI) * Math.cos(12 * phiAngle);
            
            // Normalize to 0-1 range and apply amplitude
            const pointAmplitude = ((value + 1) / 2) * amplitude;
            
            // Only add points with significant amplitude
            if (pointAmplitude > 0.1) {
              points.push({
                x, y, z,
                amplitude: pointAmplitude
              });
            }
          }
        }
      }
      
      this.state.patternData.points = points;
    }
  }
  
  /**
   * Generate circular cymatic pattern
   * @private
   */
  _generateCircularPattern() {
    const { resolution, frequency, amplitude, harmonics } = this.options;
    
    // Initialize or reset pattern data
    this._initializePatternData();
    
    // Circular pattern parameters
    const centerX = resolution / 2;
    const centerY = resolution / 2;
    const wavelength = 432 / frequency * 8;
    
    // Constants for pattern generation
    const PHI = 1.618033988749895;
    
    if (this.options.mode === '2d') {
      // Generate 2D circular grid pattern
      const grid = this.state.patternData.grid;
      
      for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
          // Normalized coordinates (-1 to 1)
          const nx = (x - centerX) / centerX;
          const ny = (y - centerY) / centerY;
          
          // Distance from center
          const distance = Math.sqrt(nx * nx + ny * ny);
          
          // Skip points outside unit circle
          if (distance > 1.0) {
            grid[y][x] = 0;
            continue;
          }
          
          // Base circular pattern - concentric rings
          let value = 0;
          
          // Add base frequency - concentric rings
          value += harmonics[0] * Math.cos(distance * wavelength);
          
          // Add first harmonic overtone
          value += harmonics[1] * Math.cos(distance * wavelength * PHI);
          
          // Add second harmonic overtone
          value += harmonics[2] * Math.cos(distance * wavelength * PHI * PHI);
          
          // Normalize to 0-1 range and apply amplitude
          grid[y][x] = ((value + 1) / 2) * amplitude;
        }
      }
    } else {
      // Generate 3D circular pattern
      const points = [];
      
      // Generate points in a spherical pattern
      for (let z = 0; z < resolution; z += 4) {
        for (let y = 0; y < resolution; y += 2) {
          for (let x = 0; x < resolution; x += 2) {
            // Normalized coordinates (-1 to 1)
            const nx = (x - centerX) / centerX;
            const ny = (y - centerY) / centerY;
            const nz = (z - resolution / 2) / (resolution / 2);
            
            // Distance from center
            const distance = Math.sqrt(nx * nx + ny * ny + nz * nz);
            
            if (distance > 1.0) continue; // Skip points outside unit sphere
            
            // Base spherical pattern - concentric shells
            let value = 0;
            
            // Add base frequency - concentric shells
            value += harmonics[0] * Math.cos(distance * wavelength);
            
            // Add first harmonic overtone
            value += harmonics[1] * Math.cos(distance * wavelength * PHI);
            
            // Add second harmonic overtone
            value += harmonics[2] * Math.cos(distance * wavelength * PHI * PHI);
            
            // Normalize to 0-1 range and apply amplitude
            const pointAmplitude = ((value + 1) / 2) * amplitude;
            
            // Only add points with significant amplitude
            if (pointAmplitude > 0.1) {
              points.push({
                x, y, z,
                amplitude: pointAmplitude
              });
            }
          }
        }
      }
      
      this.state.patternData.points = points;
    }
  }
  
  /**
   * Generate phi spiral cymatic pattern
   * @private
   */
  _generatePhiSpiralPattern() {
    const { resolution, frequency, amplitude, harmonics } = this.options;
    
    // Initialize or reset pattern data
    this._initializePatternData();
    
    // Phi spiral parameters
    const centerX = resolution / 2;
    const centerY = resolution / 2;
    const wavelength = 432 / frequency * 5;
    
    // Constants for pattern generation
    const PHI = 1.618033988749895;
    
    if (this.options.mode === '2d') {
      // Generate 2D phi spiral pattern
      const grid = this.state.patternData.grid;
      
      for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
          // Normalized coordinates (-1 to 1)
          const nx = (x - centerX) / centerX;
          const ny = (y - centerY) / centerY;
          
          // Distance from center
          const distance = Math.sqrt(nx * nx + ny * ny);
          
          // Skip points outside unit circle
          if (distance > 1.0) {
            grid[y][x] = 0;
            continue;
          }
          
          // Angle from center (0 to 2π)
          const angle = Math.atan2(ny, nx);
          
          // Base phi spiral pattern
          let value = 0;
          
          // Add base frequency - phi spiral
          value += harmonics[0] * Math.cos(distance * wavelength + angle * PHI);
          
          // Add first harmonic overtone
          value += harmonics[1] * Math.cos(distance * wavelength * PHI + angle * PHI * PHI);
          
          // Add second harmonic overtone
          value += harmonics[2] * Math.cos(distance * wavelength * PHI * PHI + angle * PHI);
          
          // Normalize to 0-1 range and apply amplitude
          grid[y][x] = ((value + 1) / 2) * amplitude;
        }
      }
    } else {
      // Generate 3D phi spiral pattern
      const points = [];
      
      // Generate points in a spherical pattern
      for (let z = 0; z < resolution; z += 4) {
        for (let y = 0; y < resolution; y += 2) {
          for (let x = 0; x < resolution; x += 2) {
            // Normalized coordinates (-1 to 1)
            const nx = (x - centerX) / centerX;
            const ny = (y - centerY) / centerY;
            const nz = (z - resolution / 2) / (resolution / 2);
            
            // Distance from center
            const distance = Math.sqrt(nx * nx + ny * ny + nz * nz);
            
            if (distance > 1.0) continue; // Skip points outside unit sphere
            
            // Spherical coordinates
            const phiAngle = Math.atan2(ny, nx);
            const thetaAngle = Math.acos(nz / (distance || 1));
            
            // Base phi spiral pattern in 3D
            let value = 0;
            
            // Add base frequency - phi spiral in 3D
            value += harmonics[0] * Math.cos(distance * wavelength + phiAngle * PHI + thetaAngle);
            
            // Add first harmonic overtone
            value += harmonics[1] * Math.cos(distance * wavelength * PHI + phiAngle * PHI + thetaAngle * PHI);
            
            // Add second harmonic overtone
            value += harmonics[2] * Math.cos(distance * wavelength * PHI * PHI + phiAngle + thetaAngle * PHI);
            
            // Normalize to 0-1 range and apply amplitude
            const pointAmplitude = ((value + 1) / 2) * amplitude;
            
            // Only add points with significant amplitude
            if (pointAmplitude > 0.1) {
              points.push({
                x, y, z,
                amplitude: pointAmplitude
              });
            }
          }
        }
      }
      
      this.state.patternData.points = points;
    }
  }
  
  /**
   * Generate merkaba cymatic pattern
   * @private
   */
  _generateMerkabaPattern() {
    const { resolution, frequency, amplitude, harmonics } = this.options;
    
    // Initialize or reset pattern data
    this._initializePatternData();
    
    // Merkaba pattern parameters
    const centerX = resolution / 2;
    const centerY = resolution / 2;
    const wavelength = 432 / frequency * 7;
    
    // Constants for pattern generation
    const PHI = 1.618033988749895;
    
    if (this.options.mode === '2d') {
      // Generate 2D merkaba-like pattern
      const grid = this.state.patternData.grid;
      
      for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
          // Normalized coordinates (-1 to 1)
          const nx = (x - centerX) / centerX;
          const ny = (y - centerY) / centerY;
          
          // Distance from center
          const distance = Math.sqrt(nx * nx + ny * ny);
          
          // Skip points outside unit circle
          if (distance > 1.0) {
            grid[y][x] = 0;
            continue;
          }
          
          // Angle from center (0 to 2π)
          const angle = Math.atan2(ny, nx);
          
          // Base merkaba pattern (two overlapping triangular fields)
          let value = 0;
          
          // Add base frequency - first triangular field
          value += harmonics[0] * Math.cos(3 * angle + distance * wavelength);
          
          // Add inverse triangular field
          value += harmonics[0] * Math.cos(3 * (angle + Math.PI) + distance * wavelength);
          
          // Add first harmonic overtone
          value += harmonics[1] * Math.cos(6 * angle + distance * wavelength * PHI);
          
          // Add second harmonic overtone
          value += harmonics[2] * Math.cos(12 * angle + distance * wavelength * PHI * PHI);
          
          // Normalize to 0-1 range and apply amplitude
          grid[y][x] = ((value + 1) / 2) * amplitude;
        }
      }
    } else {
      // Generate 3D merkaba pattern
      const points = [];
      
      // Generate points forming a merkaba structure (two interlaced tetrahedra)
      for (let z = 0; z < resolution; z += 3) {
        for (let y = 0; y < resolution; y += 3) {
          for (let x = 0; x < resolution; x += 3) {
            // Normalized coordinates (-1 to 1)
            const nx = (x - centerX) / centerX;
            const ny = (y - centerY) / centerY;
            const nz = (z - resolution / 2) / (resolution / 2);
            
            // Distance from center
            const distance = Math.sqrt(nx * nx + ny * ny + nz * nz);
            
            if (distance > 1.0) continue; // Skip points outside unit sphere
            
            // Spherical coordinates
            const phiAngle = Math.atan2(ny, nx);
            const thetaAngle = Math.acos(nz / (distance || 1));
            
            // Base merkaba pattern in 3D
            let value = 0;
            
            // First tetrahedron
            const tetra1 = Math.cos(3 * phiAngle + thetaAngle * 2);
            
            // Second tetrahedron (rotated 180°)
            const tetra2 = Math.cos(3 * (phiAngle + Math.PI) + thetaAngle * 2);
            
            // Combine tetrahedra with distance-based waves
            value += harmonics[0] * (tetra1 + tetra2) * 0.5 * Math.cos(distance * wavelength);
            
            // Add first harmonic overtone
            value += harmonics[1] * (tetra1 - tetra2) * 0.5 * Math.cos(distance * wavelength * PHI);
            
            // Add second harmonic overtone - create more complex structure
            value += harmonics[2] * Math.cos(6 * phiAngle + thetaAngle * 3) * Math.cos(distance * wavelength * PHI * PHI);
            
            // Normalize to 0-1 range and apply amplitude
            const pointAmplitude = ((value + 1) / 2) * amplitude;
            
            // Only add points with significant amplitude
            if (pointAmplitude > 0.15) {
              points.push({
                x, y, z,
                amplitude: pointAmplitude
              });
            }
          }
        }
      }
      
      this.state.patternData.points = points;
    }
  }
  
  /**
   * Handle frequency change events from ground state module
   * @param {Object} data - Event data
   * @private
   */
  _handleFrequencyChange(data) {
    this.setFrequency(data.to);
  }
  
  /**
   * Clean up the pattern generator
   */
  destroy() {
    // Remove event listeners
    groundStateModule.off('frequency-adjusted', this._handleFrequencyChange);
    
    // Reset state
    this.state.initialized = false;
    this.state.patternData = null;
  }
}

// Export as both class and singleton instance
const cymaticPatternGenerator = new CymaticPatternGenerator();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CymaticPatternGenerator,
    cymaticPatternGenerator // Singleton instance
  };
} else if (typeof window !== 'undefined') {
  window.CymaticPatternGenerator = CymaticPatternGenerator;
  window.cymaticPatternGenerator = cymaticPatternGenerator;
}
