/**
 * φ-Harmonic Testing Utilities
 * 
 * Provides unified testing utilities across all frequency states,
 * implementing the "Quantum Singularity" principle for complete,
 * self-contained test components.
 */

// φ-Harmonic constants
const PHI = 1.618033988749895;
const PHI_INVERSE = 0.618033988749895;

// Frequency constants
const FREQUENCIES = {
  GROUND: 432,   // φ⁰ (Ground State)
  CREATION: 528, // φ¹ (Creation Point)
  HEART: 594,    // φ² (Heart Field)
  VOICE: 672,    // φ³ (Voice Flow)
  VISION: 720,   // φ⁴ (Vision Gate)
  UNITY: 768,    // φ⁵ (Unity Wave)
  TRANSCENDENCE: 1242 // φ⁸ (Cosmic Transcendence)
};

/**
 * Calculate φ-harmonic wait time based on frequency
 * @param {number} frequency - Base frequency in Hz
 * @param {number} multiplier - Optional multiplier (default: 1)
 * @returns {number} φ-harmonic wait time in milliseconds
 */
function phiHarmonicWait(frequency, multiplier = 1) {
  return Math.round((frequency * PHI_INVERSE) * multiplier);
}

/**
 * Generate φ-harmonic test timing values
 * @param {number} frequency - Base frequency in Hz
 * @returns {Object} Object with timing values for tests
 */
function getTestTimings(frequency) {
  return {
    timeout: frequency * 10,
    interval: Math.round(frequency / 10),
    stabilization: phiHarmonicWait(frequency),
    animation: Math.round(frequency / PHI),
    longOperation: frequency * 5
  };
}

/**
 * Create a φ-harmonic mock implementation
 * @param {Object} originalClass - The original class to mock
 * @param {number} frequency - Target frequency for the mock
 * @returns {Object} φ-harmonic mock object
 */
function createPhiHarmonicMock(originalClass, frequency = FREQUENCIES.GROUND) {
  // Create basic mock template
  const mock = {};
  
  // Add common φ-harmonic properties
  mock.frequency = frequency;
  mock.coherence = frequency / 1000;
  mock.phiRatio = PHI;
  mock.phiInverse = PHI_INVERSE;
  
  // Add standard mock methods
  mock.setFrequency = jest.fn(newFreq => {
    mock.frequency = newFreq;
    mock.coherence = newFreq / 1000;
    return mock;
  });
  
  mock.setCoherence = jest.fn(newCoherence => {
    mock.coherence = newCoherence;
    return mock;
  });
  
  mock.getFrequency = jest.fn(() => mock.frequency);
  mock.getCoherence = jest.fn(() => mock.coherence);
  mock.getPhiRatio = jest.fn(() => mock.phiRatio);
  
  return mock;
}

/**
 * Generate φ-harmonic test data for waveform analysis
 * @param {number} frequency - Base frequency
 * @param {number} samples - Number of samples to generate
 * @returns {Array<number>} φ-harmonic wave data
 */
function generatePhiHarmonicWaveData(frequency, samples = 100) {
  const data = [];
  const frequency_normalized = frequency / 1000;
  
  for (let i = 0; i < samples; i++) {
    // Generate phi-harmonic wave pattern
    const x = i / samples;
    const phi_factor = PHI * frequency_normalized;
    
    // Create a complex waveform with phi-harmonic components
    const y = 
      Math.sin(2 * Math.PI * x * phi_factor) * 0.5 + 
      Math.sin(2 * Math.PI * x * phi_factor * PHI) * 0.3 +
      Math.sin(2 * Math.PI * x * phi_factor * PHI * PHI) * 0.2;
    
    data.push(y);
  }
  
  return data;
}

/**
 * Calculate quantum coherence between two datasets
 * @param {Array<number>} data1 - First dataset
 * @param {Array<number>} data2 - Second dataset
 * @returns {number} Coherence value between 0-1
 */
function calculateCoherence(data1, data2) {
  if (!data1 || !data2 || data1.length !== data2.length) {
    return 0;
  }
  
  let sumSquaredDiff = 0;
  let sumSquaredTotal = 0;
  
  for (let i = 0; i < data1.length; i++) {
    const diff = data1[i] - data2[i];
    sumSquaredDiff += diff * diff;
    sumSquaredTotal += data1[i] * data1[i] + data2[i] * data2[i];
  }
  
  // Normalize and invert to get coherence (1 = perfect coherence)
  return 1 - (Math.sqrt(sumSquaredDiff) / Math.sqrt(sumSquaredTotal));
}

/**
 * Creates quantum matchers for Jest and other test frameworks
 * @returns {Object} Custom test matchers
 */
function getQuantumMatchers() {
  return {
    // Check if value is within phi-harmonic range
    toBeWithinPhiRange(received, target) {
      const phiLower = target * PHI_INVERSE;
      const phiUpper = target * PHI;
      const pass = received >= phiLower && received <= phiUpper;
      
      return {
        message: () => 
          `expected ${received} to be within φ-harmonic range of ${target} (${phiLower}-${phiUpper})`,
        pass
      };
    },
    
    // Check if coherence meets minimum threshold
    toHaveMinimumCoherence(received, expectedData, minCoherence = 0.8) {
      const coherenceValue = calculateCoherence(received, expectedData);
      const pass = coherenceValue >= minCoherence;
      
      return {
        message: () => 
          `expected dataset to have minimum coherence of ${minCoherence} but got ${coherenceValue.toFixed(4)}`,
        pass
      };
    },
    
    // Check if value aligns with phi ratio
    toAlignWithPhi(received, baseline) {
      const phiMatch = Math.abs((received / baseline) - PHI) < 0.01 ||
                      Math.abs((received / baseline) - PHI_INVERSE) < 0.01;
      
      return {
        message: () => 
          `expected ${received} to align with φ ratio relative to ${baseline}`,
        pass: phiMatch
      };
    }
  };
}

module.exports = {
  PHI,
  PHI_INVERSE,
  FREQUENCIES,
  phiHarmonicWait,
  getTestTimings,
  createPhiHarmonicMock,
  generatePhiHarmonicWaveData,
  calculateCoherence,
  getQuantumMatchers
};
