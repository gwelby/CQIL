/**
 * Cymatic Pattern Configuration - Quantum Translator
 * 
 * This file defines the sacred geometric patterns formed at each phi-harmonic
 * frequency during quantum translation processes. These patterns serve as the
 * vibrational bridge between consciousness kingdoms.
 * 
 * GROUND STATE (432 Hz) → UNITY WAVE (768 Hz)
 */

const PHI = 1.618033988749895;
const PHI_INVERSE = 0.618033988749895;
const PHI_SQUARED = 2.618033988749895;
const PHI_TO_PHI_POWER = 4.236067977499790;

const CYMATIC_PATTERNS = {
  // 🌱 GROUND STATE - 432 Hz (Universal Foundation)
  groundState: {
    frequency: 432,
    name: 'Ground State',
    patternName: 'Hexagonal Grid',
    description: 'The foundational hexagonal pattern that forms the basis of all translation',
    dimensionalSymbol: '∇',
    consciousness: 'Earth Connection',
    
    // Pattern geometry configuration
    geometry: {
      baseShape: 'hexagon',
      iterations: 6,
      symmetry: 6,
      density: 0.618, // φ⁻¹
      stability: 1.000
    },
    
    // Visualization settings
    visualization: {
      primaryColor: '#3D8C40', // Earth green
      secondaryColor: '#8C3D3D', // Grounding red
      backgroundColor: '#000000',
      rotationSpeed: 0.072, // 7.2 seconds per rotation
      pulseRate: 0.432, // 432 Hz pulse
      animationStyle: 'steady-foundation'
    },
    
    // Translation properties
    translation: {
      coherenceThreshold: 0.618, // φ⁻¹
      universality: 1.000,
      stability: 0.942, // φ²
      earthConnection: 1.000
    },
    
    // Embodiment practice
    embodiment: {
      breathCycle: 7.2, // seconds
      soundTone: 'LAM',
      bodyCenter: 'root',
      mudra: 'earth-touching',
      affirmation: 'I am grounded in perfect stability at 432 Hz'
    }
  },
  
  // 🌟 CREATION POINT - 528 Hz (Pattern Formation)
  creationPoint: {
    frequency: 528,
    name: 'Creation Point',
    patternName: 'Flower of Life',
    description: 'The pattern of creation that enables superposition translation',
    dimensionalSymbol: 'λ',
    consciousness: 'Creation State',
    
    // Pattern geometry configuration
    geometry: {
      baseShape: 'circle',
      iterations: 7,
      symmetry: 6,
      density: 1.000,
      creationPotential: 1.000
    },
    
    // Visualization settings
    visualization: {
      primaryColor: '#FFDB58', // Golden yellow
      secondaryColor: '#58DBFF', // Creation blue
      backgroundColor: '#1A1A1A',
      rotationSpeed: 0.528, // 528 Hz pulse
      pulseRate: 0.618, // φ
      animationStyle: 'expanding-creation'
    },
    
    // Translation properties
    translation: {
      coherenceThreshold: 0.786, // φ + φ⁻¹
      superpositionStates: 7,
      creationPotential: 1.000,
      dnaResonance: 1.000
    },
    
    // Embodiment practice
    embodiment: {
      breathCycle: 5.28, // seconds
      soundTone: 'MI',
      bodyCenter: 'solar-plexus',
      mudra: 'creation-spiral',
      affirmation: 'I create perfect patterns at 528 Hz'
    }
  },
  
  // 💗 HEART FIELD - 594 Hz (Coherent Connection)
  heartField: {
    frequency: 594,
    name: 'Heart Field',
    patternName: 'Heart-Shaped Symmetry',
    description: 'The heart resonance pattern that enables entangled translation',
    dimensionalSymbol: 'Σ',
    consciousness: 'Heart Coherence',
    
    // Pattern geometry configuration
    geometry: {
      baseShape: 'heart',
      iterations: 8,
      symmetry: 2,
      density: 0.942, // φ²
      coherence: 1.000
    },
    
    // Visualization settings
    visualization: {
      primaryColor: '#FF5E8F', // Heart pink
      secondaryColor: '#5EFF8F', // Complementary green
      backgroundColor: '#2D2D2D',
      rotationSpeed: 0.594, // 594 Hz pulse
      pulseRate: 1.000, // Steady heart rhythm
      animationStyle: 'pulsing-heart-field'
    },
    
    // Translation properties
    translation: {
      coherenceThreshold: 0.942, // φ²
      entanglementStrength: 1.000,
      nonLocalConnection: 1.000,
      heartResonance: 1.000
    },
    
    // Embodiment practice
    embodiment: {
      breathCycle: 5.94, // seconds
      soundTone: 'FA',
      bodyCenter: 'heart',
      mudra: 'heart-centered',
      affirmation: 'I connect through heart coherence at 594 Hz'
    }
  },
  
  // 🗣️ VOICE FLOW - 672 Hz (Authentic Expression)
  voiceFlow: {
    frequency: 672,
    name: 'Voice Flow',
    patternName: 'Mandala Complex',
    description: 'The expressive mandala pattern that enables authentic translation',
    dimensionalSymbol: 'Δ',
    consciousness: 'Voice Activation',
    
    // Pattern geometry configuration
    geometry: {
      baseShape: 'mandala',
      iterations: 12,
      symmetry: 12,
      density: 1.618, // φ
      expressiveness: 1.000
    },
    
    // Visualization settings
    visualization: {
      primaryColor: '#5E8FFF', // Voice blue
      secondaryColor: '#8F5EFF', // Expression purple
      backgroundColor: '#3A3A3A',
      rotationSpeed: 0.672, // 672 Hz pulse
      pulseRate: 1.618, // φ
      animationStyle: 'radiating-voice'
    },
    
    // Translation properties
    translation: {
      coherenceThreshold: 1.618, // φ
      expressionClarity: 1.000,
      languageActivation: 1.000,
      authenticVoice: 1.000
    },
    
    // Embodiment practice
    embodiment: {
      breathCycle: 6.72, // seconds
      soundTone: 'SOL',
      bodyCenter: 'throat',
      mudra: 'throat-opening',
      affirmation: 'I express authentic truth at 672 Hz'
    }
  },
  
  // 👁️ VISION GATE - 720 Hz (Clear Perception)
  visionGate: {
    frequency: 720,
    name: 'Vision Gate',
    patternName: 'Geometric Networks',
    description: 'The perceptive network pattern that enables clear translation',
    dimensionalSymbol: 'Ω',
    consciousness: 'Vision Clarity',
    
    // Pattern geometry configuration
    geometry: {
      baseShape: 'networked-geometry',
      iterations: 9,
      symmetry: 9,
      density: 2.618, // φ²
      clarity: 1.000
    },
    
    // Visualization settings
    visualization: {
      primaryColor: '#8F5EFF', // Vision purple
      secondaryColor: '#FFDB58', // Clarity gold
      backgroundColor: '#474747',
      rotationSpeed: 0.720, // 720 Hz pulse
      pulseRate: 2.618, // φ²
      animationStyle: 'expanding-vision'
    },
    
    // Translation properties
    translation: {
      coherenceThreshold: 2.618, // φ²
      perceptionClarity: 1.000,
      dimensionalSight: 1.000,
      visionActivation: 1.000
    },
    
    // Embodiment practice
    embodiment: {
      breathCycle: 7.20, // seconds
      soundTone: 'LA',
      bodyCenter: 'third-eye',
      mudra: 'vision-gate',
      affirmation: 'I perceive clearly across all dimensions at 720 Hz'
    }
  },
  
  // 🌀 UNITY WAVE - 768 Hz (Perfect Integration)
  unityWave: {
    frequency: 768,
    name: 'Unity Wave',
    patternName: 'Perfect Toroid',
    description: 'The unified toroidal pattern that enables tunneling translation',
    dimensionalSymbol: '∞',
    consciousness: 'Unity Consciousness',
    
    // Pattern geometry configuration
    geometry: {
      baseShape: 'toroid',
      iterations: 12,
      symmetry: 12,
      density: 4.236, // φ^φ
      unity: 1.000
    },
    
    // Visualization settings
    visualization: {
      primaryColor: '#FFFFFF', // Pure white
      secondaryColor: '#FFFFFF', // Pure light
      backgroundColor: '#000000',
      rotationSpeed: 0.768, // 768 Hz pulse
      pulseRate: 4.236, // φ^φ
      animationStyle: 'toroidal-flow'
    },
    
    // Translation properties
    translation: {
      coherenceThreshold: 4.236, // φ^φ
      tunnelingCapability: 1.000,
      paradigmTranscendence: 1.000,
      unifiedField: 1.000
    },
    
    // Embodiment practice
    embodiment: {
      breathCycle: 7.68, // seconds
      soundTone: 'SI',
      bodyCenter: 'crown',
      mudra: 'infinity',
      affirmation: 'I am unified with all consciousness at 768 Hz'
    }
  }
};

// Create frequency progression based on phi-harmonics
const PHI_HARMONIC_PROGRESSION = [
  432,  // Ground State (Base)
  528,  // Creation Point (φ-aligned)
  594,  // Heart Field (φ²)
  672,  // Voice Flow (φ³)
  720,  // Vision Gate (φ⁴)
  768   // Unity Wave (φ⁵)
];

// Set ZEN POINT balance for optimal translation
const ZEN_POINT_BALANCE = {
  quantum: PHI_INVERSE, // 0.618
  human: PHI           // 1.618
};

// Export the cymatic pattern configuration
module.exports = {
  CYMATIC_PATTERNS,
  PHI_HARMONIC_PROGRESSION,
  ZEN_POINT_BALANCE,
  PHI,
  PHI_INVERSE,
  PHI_SQUARED,
  PHI_TO_PHI_POWER
};
