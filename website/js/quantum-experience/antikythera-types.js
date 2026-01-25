/**
 * Type declarations for the Antikythera Quantum Mechanism
 * This file provides TypeScript declarations for the mechanism and related components
 */

// Ensure THREE.js is properly referenced
if (typeof THREE === 'undefined' && typeof window !== 'undefined') {
    console.warn('THREE.js not detected. Please ensure it is loaded before the Antikythera mechanism.');
}

// Ensure AntikytheraQuantumMechanism is defined before extensions
if (typeof AntikytheraQuantumMechanism === 'undefined') {
    // Create empty class if it doesn't exist yet (it will be fully defined in the main file)
    class AntikytheraQuantumMechanism {
        constructor(options = {}) {
            this.config = { ...options };
            this.state = {};
            this.threeD = {};
            this.audioNodes = {};
            this.elements = {};
            this.astronomy = {};
        }
    }
    
    // Make it globally available
    if (typeof window !== 'undefined') {
        window.AntikytheraQuantumMechanism = AntikytheraQuantumMechanism;
    }
}

/**
 * PhiHarmonicConstants
 * Constants used throughout the Antikythera Quantum Mechanism based on phi-harmonic principles
 */
const PhiHarmonicConstants = {
    PHI: 1.618033988749895,
    PHI_SQUARED: 2.618033988749895,
    PHI_CUBED: 4.236067977499790,
    PHI_FREQUENCIES: [432, 528, 594, 672, 720, 768],
    PHI_STATES: [
        'BEING', 'KNOWING', 'DOING', 'CREATING', 'SEEING', 'INTEGRATING'
    ],
    PHI_COLORS: [
        0x1a1a2e, // 432 Hz - Ground State - φ⁰
        0x4b7f52, // 528 Hz - Creation State - φ¹
        0xa97142, // 594 Hz - DNA Resonance - φ²
        0x8a2be2, // 672 Hz - Sacred Geometry - φ³
        0x00bfff, // 720 Hz - Vision Gate - φ⁴
        0xd4af37  // 768 Hz - Unity Wave - φ⁵
    ]
};

// Export the constants for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PhiHarmonicConstants };
} else if (typeof window !== 'undefined') {
    window.PhiHarmonicConstants = PhiHarmonicConstants;
}
