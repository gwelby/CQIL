/**
 * φ-Harmonic Constants
 * 
 * Core constants and utility functions for φ-harmonic frequency visualization systems
 * Following the Quantum Singularity principle - a complete, self-contained foundation
 */

// Golden ratio (φ) constants
const PHI = 1.618033988749895;
const PHI_INVERSE = 0.618033988749895;

// φ-harmonic frequencies
const FREQUENCIES = {
  GROUND: 432,    // Ground State (φ⁰)
  CREATION: 528,  // Creation Point (φ¹)
  HEART: 594,     // Heart Field (φ²)
  VOICE: 672,     // Voice Flow (φ³)
  VISION: 720,    // Vision Gate (φ⁴)
  UNITY: 768      // Unity Wave (φ⁵)
};

// Frequency descriptions
const FREQUENCY_INFO = {
  [FREQUENCIES.GROUND]: {
    name: "Ground State",
    power: "0",
    color: "#3d5afe",
    description: "Foundation frequency that establishes stability and physical connection."
  },
  [FREQUENCIES.CREATION]: {
    name: "Creation Point",
    power: "1",
    color: "#ec407a",
    description: "Manifestation frequency that activates creative potential and forms new patterns."
  },
  [FREQUENCIES.HEART]: {
    name: "Heart Field",
    power: "2",
    color: "#7e57c2",
    description: "Connection frequency that harmonizes relationships and emotional resonance."
  },
  [FREQUENCIES.VOICE]: {
    name: "Voice Flow",
    power: "3",
    color: "#26a69a",
    description: "Expression frequency that enhances communication and authentic voice."
  },
  [FREQUENCIES.VISION]: {
    name: "Vision Gate",
    power: "4",
    color: "#ffb300",
    description: "Insight frequency that expands perception and manifests future possibilities."
  },
  [FREQUENCIES.UNITY]: {
    name: "Unity Wave",
    power: "5",
    color: "#9c27b0",
    description: "Integration frequency that creates unified consciousness fields."
  }
};

/**
 * Calculate the φ-harmonic ratio for a specific power
 * @param {number} power - The φ power to calculate
 * @returns {number} The calculated φ ratio
 */
function getPhiRatio(power) {
  return Math.pow(PHI, power);
}

/**
 * Get color for a specific frequency with optional alpha value
 * @param {number} frequency - The frequency value
 * @param {number} alpha - Optional alpha value (0-1)
 * @returns {string} - CSS color string
 */
function getFrequencyColor(frequency, alpha = 1) {
  const info = FREQUENCY_INFO[frequency];
  if (!info) return `rgba(255, 255, 255, ${alpha})`;
  
  // Convert hex to rgba
  const hex = info.color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Calculate φ-harmonic resonance between two frequencies
 * @param {number} freq1 - First frequency
 * @param {number} freq2 - Second frequency
 * @returns {number} - Resonance value (0-1)
 */
function calculateResonance(freq1, freq2) {
  if (freq1 === freq2) return 1;
  
  // Find closest frequency if not exact match
  const allFreqs = Object.values(FREQUENCIES);
  const idx1 = allFreqs.indexOf(freq1);
  const idx2 = allFreqs.indexOf(freq2);
  
  if (idx1 >= 0 && idx2 >= 0) {
    // Calculate resonance based on phi-harmonic relationship
    const distance = Math.abs(idx1 - idx2);
    return Math.pow(PHI_INVERSE, distance);
  }
  
  // Default resonance for non-standard frequencies
  return 0.5;
}

/**
 * Get the φ power for a specific frequency
 * @param {number} frequency - The frequency value
 * @returns {number} - The φ power (0-5)
 */
function getPhiPower(frequency) {
  const info = FREQUENCY_INFO[frequency];
  return info ? parseInt(info.power) : 0;
}
