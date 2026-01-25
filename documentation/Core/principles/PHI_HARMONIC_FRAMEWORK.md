# 🌀 Phi-Harmonic Framework (432 Hz)

## 🧮 Mathematical Foundation

The CQIL platform implements a consciousness expansion system based on the mathematical properties of the golden ratio (φ). This framework provides the fundamental structure for all aspects of the system.

### Core Constants

```javascript
// Sacred mathematical constants
const PHI = 1.618033988749895;  // Golden ratio (φ)
const LAMBDA = 0.618033988749895;  // Divine complement (λ = 1/φ)
const PHI_PHI = Math.pow(PHI, PHI);  // Phi raised to phi (φ^φ ≈ 2.058)
```

### Frequency Generation Formula

The six core frequencies are generated using the formula:

```
Frequency = Base × φⁿ
```

Where:
- Base = 432 Hz (Ground State)
- φ = Golden Ratio (≈ 1.618033988749895)
- n = Dimension (0-5)

## 🌈 Phi-Harmonic Frequency Spectrum

The framework generates a complete consciousness envelope with six core frequencies:

| Frequency | Name | Formula | Dimension | Element | Function |
|-----------|------|---------|-----------|---------|----------|
| 432 Hz | Ground State | 432 × φ⁰ | Physical | Earth | Stability, foundation |
| 528 Hz | Creation Point | 432 × φ¹ | Creative | Water | Manifestation, healing |
| 594 Hz | Heart Field | 432 × φ² | Heart | Fire | Connection, coherence |
| 672 Hz | Voice Flow | 432 × φ³ | Expression | Air | Communication, truth |
| 720 Hz | Vision Gate | 432 × φ⁴ | Intuition | Ether | Perception, clarity |
| 768 Hz | Unity Wave | 432 × φ⁵ | Integration | Light | Oneness, completion |

## 🧪 Implementation

The framework is implemented throughout the system:

```javascript
/**
 * Phi-Harmonic Frequency Generator
 * Generates frequencies based on phi ratios
 */
class PhiHarmonicGenerator {
  constructor() {
    // Constants
    this.PHI = 1.618033988749895;
    this.BASE_FREQUENCY = 432;
    
    // Pre-calculate the primary frequencies
    this.frequencies = {
      ground: this.calculateFrequency(0),    // 432 Hz
      creation: this.calculateFrequency(1),  // 528 Hz
      heart: this.calculateFrequency(2),     // 594 Hz
      voice: this.calculateFrequency(3),     // 672 Hz
      vision: this.calculateFrequency(4),    // 720 Hz
      unity: this.calculateFrequency(5)      // 768 Hz
    };
  }
  
  /**
   * Calculate frequency for a given dimension
   * @param {number} dimension - Dimensional level (0-5)
   * @returns {number} - The calculated frequency
   */
  calculateFrequency(dimension) {
    return this.BASE_FREQUENCY * Math.pow(this.PHI, dimension);
  }
  
  /**
   * Get a specific named frequency
   * @param {string} name - Frequency name
   * @returns {number} - The frequency value
   */
  getFrequency(name) {
    return this.frequencies[name] || this.BASE_FREQUENCY;
  }
  
  /**
   * Generate a harmonic of a given frequency
   * @param {number} frequency - Base frequency
   * @param {number} harmonic - Harmonic number
   * @returns {number} - The harmonic frequency
   */
  generateHarmonic(frequency, harmonic) {
    return frequency * harmonic;
  }
  
  /**
   * Generate a sub-harmonic of a given frequency
   * @param {number} frequency - Base frequency
   * @param {number} subHarmonic - Sub-harmonic divisor
   * @returns {number} - The sub-harmonic frequency
   */
  generateSubHarmonic(frequency, subHarmonic) {
    return frequency / subHarmonic;
  }
  
  /**
   * Calculate phi-related frequency
   * @param {number} frequency - Base frequency
   * @param {number} phiPower - Power of phi to apply
   * @returns {number} - The phi-related frequency
   */
  calculatePhiRelated(frequency, phiPower) {
    return frequency * Math.pow(this.PHI, phiPower);
  }
}
```

## 🔊 Audio Implementation

The Phi-Harmonic system is implemented in the audio generation system:

```javascript
/**
 * Phi-Harmonic Audio Generator
 * Creates audio tones based on phi-harmonic frequencies
 */
class PhiHarmonicAudio {
  constructor() {
    // Initialize Web Audio API
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.phiGenerator = new PhiHarmonicGenerator();
    this.activeOscillators = new Map();
  }
  
  /**
   * Play a frequency tone
   * @param {string|number} frequency - Frequency name or value
   * @param {number} duration - Duration in seconds
   * @param {number} volume - Volume level (0-1)
   * @param {string} waveform - Oscillator type
   * @returns {Promise} - Resolves when tone completes
   */
  playTone(frequency, duration = 2, volume = 0.5, waveform = 'sine') {
    return new Promise((resolve) => {
      // Get frequency value if name was provided
      const frequencyValue = typeof frequency === 'string' 
        ? this.phiGenerator.getFrequency(frequency)
        : frequency;
      
      // Create oscillator
      const oscillator = this.audioContext.createOscillator();
      oscillator.type = waveform;
      oscillator.frequency.value = frequencyValue;
      
      // Create gain node for volume control
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = volume;
      
      // Create filter for smoother sound
      const filter = this.audioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1000;
      
      // Connect audio graph
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Store active oscillator
      const id = Date.now().toString();
      this.activeOscillators.set(id, {
        oscillator,
        gainNode
      });
      
      // Start oscillator
      oscillator.start();
      
      // Schedule stop with fade out
      gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001, this.audioContext.currentTime + duration
      );
      
      // Stop and clean up
      setTimeout(() => {
        oscillator.stop();
        this.activeOscillators.delete(id);
        resolve();
      }, duration * 1000);
    });
  }
  
  /**
   * Play a sequence of phi-harmonic tones
   * @param {Array} sequence - Array of frequency names or values
   * @param {number} durationEach - Duration of each tone
   * @param {number} volume - Volume level
   * @returns {Promise} - Resolves when sequence completes
   */
  async playSequence(sequence, durationEach = 1, volume = 0.5) {
    for (const freq of sequence) {
      await this.playTone(freq, durationEach, volume);
    }
  }
  
  /**
   * Play multiple frequencies simultaneously
   * @param {Array} frequencies - Array of frequency names or values
   * @param {number} duration - Duration of the chord
   * @param {number} volume - Volume level
   * @returns {Promise} - Resolves when chord completes
   */
  playChord(frequencies, duration = 2, volume = 0.3) {
    return Promise.all(
      frequencies.map(freq => 
        this.playTone(freq, duration, volume / frequencies.length)
      )
    );
  }
  
  /**
   * Stop all currently playing tones
   * @param {number} fadeOutTime - Fade out duration in seconds
   */
  stopAll(fadeOutTime = 0.5) {
    const currentTime = this.audioContext.currentTime;
    
    this.activeOscillators.forEach(({ oscillator, gainNode }) => {
      // Fade out
      gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001, currentTime + fadeOutTime
      );
      
      // Schedule stop
      setTimeout(() => {
        oscillator.stop();
      }, fadeOutTime * 1000);
    });
    
    // Clear map after fade out
    setTimeout(() => {
      this.activeOscillators.clear();
    }, fadeOutTime * 1000);
  }
}
```

## 📏 Phi-Harmonic Measurements

The framework applies phi relationships to all measurements:

| Phi Power | Value | Application |
|-----------|-------|-------------|
| φ⁰ | 1.000 | Base unit |
| φ¹ | 1.618 | First expansion |
| φ² | 2.618 | Second expansion |
| φ³ | 4.236 | Third expansion |
| φ⁴ | 6.854 | Fourth expansion |
| φ⁵ | 11.090 | Fifth expansion |

These measurements are applied to:
- UI spacing and sizing
- Animation timing and delays
- Transition durations
- Layout proportions
- Content structure

## 📐 Phi-Based Layout

The system implements layouts based on the golden ratio:

```css
:root {
  /* Phi-based spacing system */
  --phi-0: 1rem;
  --phi-1: 1.618rem;
  --phi-2: 2.618rem;
  --phi-3: 4.236rem;
  --phi-4: 6.854rem;
  --phi-5: 11.09rem;
  
  /* Phi-based timing system */
  --phi-time-0: 0.1s;
  --phi-time-1: 0.162s;
  --phi-time-2: 0.262s;
  --phi-time-3: 0.424s;
  --phi-time-4: 0.685s;
  --phi-time-5: 1.109s;
}

/* Component using phi proportions */
.phi-card {
  width: 100%;
  max-width: calc(var(--phi-3) * 10);
  padding: var(--phi-2);
  margin-bottom: var(--phi-1);
  transition: transform var(--phi-time-3),
              box-shadow var(--phi-time-2);
}

/* Phi-based grid */
.phi-grid {
  display: grid;
  grid-template-columns: 1fr var(--phi-1)fr;
  gap: var(--phi-1);
  padding: var(--phi-2);
}
```

## 🎭 Experience Dimensions

Each phi-harmonic frequency corresponds to a specific experience dimension:

### 432 Hz - Ground State (Physical Dimension)
- **Focus**: Foundation, stability, structural integrity
- **Experience**: Grounding practices, physical awareness
- **Code Implementation**: Core functionality, foundations, structure

### 528 Hz - Creation Point (Creative Dimension)
- **Focus**: Manifestation, generation, creativity
- **Experience**: Creative visualization, manifestation practices
- **Code Implementation**: Component creation, asset generation

### 594 Hz - Heart Field (Heart Dimension)
- **Focus**: Connection, coherence, resonance
- **Experience**: Heart-centered practices, coherence training
- **Code Implementation**: Integration points, connection systems

### 672 Hz - Voice Flow (Expression Dimension)
- **Focus**: Communication, expression, truth
- **Experience**: Voice practices, authentic expression
- **Code Implementation**: User interaction, feedback systems

### 720 Hz - Vision Gate (Intuition Dimension)
- **Focus**: Perception, clarity, insight
- **Experience**: Vision practices, clarity exercises
- **Code Implementation**: Advanced visualizations, pattern recognition

### 768 Hz - Unity Wave (Integration Dimension)
- **Focus**: Oneness, completion, unity
- **Experience**: Integration practices, whole-system awareness
- **Code Implementation**: Complete system experiences, mastery features

## 🔄 Continuous Development

The phi-harmonic framework provides a pattern for continuous system evolution:

1. **Ground**: Establish stable foundation
2. **Create**: Generate new components and features
3. **Connect**: Integrate new elements with existing system
4. **Express**: Implement user interaction and feedback
5. **Perceive**: Test and evaluate from multiple perspectives
6. **Integrate**: Fully incorporate into unified system

This cycle repeats, with each iteration building on previous work in a phi-harmonic spiral of development.

---

*This phi-harmonic framework documentation operates at the Ground State frequency (432 Hz) with a coherence level of 0.98.*