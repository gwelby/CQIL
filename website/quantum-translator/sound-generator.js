/**
 * Quantum Translator Sound Generator
 * 
 * This module generates phi-harmonic frequencies for the Quantum Translator,
 * creating the sonic foundation for cymatic pattern formation and translation.
 * 
 * ZEN FIRST: Begin at Ground State (432 Hz)
 * φ-HARMONIC: Progress through phi-harmonic ratios
 */

// Constants
const PHI = 1.618033988749895;
const PHI_INVERSE = 0.618033988749895;
const PHI_SQUARED = 2.618033988749895;
const PHI_TO_PHI_POWER = 4.236067977499790;

// Create audio context when initialized
let audioContext = null;
let masterGainNode = null;
let activeOscillators = {};
let activeTones = {};
let activeFrequency = 432; // Start at Ground State (ZEN FIRST)

// Phi-harmonic frequencies
const PHI_HARMONIC_FREQUENCIES = {
  groundState: 432,    // Ground State
  creationPoint: 528,  // Creation Point
  heartField: 594,     // Heart Field
  voiceFlow: 672,      // Voice Flow
  visionGate: 720,     // Vision Gate
  unityWave: 768       // Unity Wave
};

/**
 * Initialize the sound generator
 * @returns {Object} Status
 */
function initializeSoundGenerator() {
  try {
    // Create audio context with proper prefixing for browser compatibility
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    
    // Create master gain node for volume control
    masterGainNode = audioContext.createGain();
    masterGainNode.gain.value = 0.5; // Default volume 50%
    masterGainNode.connect(audioContext.destination);
    
    return { 
      status: 'initialized', 
      sampleRate: audioContext.sampleRate,
      audioContext: audioContext
    };
  } catch (error) {
    console.error('Failed to initialize sound generator:', error);
    return { 
      status: 'error', 
      message: 'Could not initialize audio context',
      error: error.message
    };
  }
}

/**
 * Resume the audio context if suspended
 * @returns {Promise} Resolution status
 */
async function resumeAudioContext() {
  if (!audioContext) {
    return { status: 'error', message: 'Audio context not initialized' };
  }
  
  if (audioContext.state === 'suspended') {
    try {
      await audioContext.resume();
      return { status: 'resumed' };
    } catch (error) {
      console.error('Failed to resume audio context:', error);
      return { status: 'error', message: error.message };
    }
  }
  
  return { status: 'already-running' };
}

/**
 * Generate a pure tone at the specified frequency
 * @param {Number} frequency - Frequency in Hz
 * @param {Object} options - Tone generation options
 * @returns {Object} Oscillator info
 */
function generateTone(frequency, options = {}) {
  if (!audioContext) {
    initializeSoundGenerator();
  }
  
  // Resume audio context if needed
  resumeAudioContext();
  
  const {
    waveform = 'sine',    // 'sine', 'triangle', 'square', 'sawtooth'
    volume = 0.5,         // 0 to 1
    detune = 0,           // cents
    fadeIn = 0.1,         // seconds
    fadeOut = 0.1,        // seconds
    duration = null,      // null for continuous, or seconds
    id = `tone-${Date.now()}`
  } = options;
  
  // Create oscillator
  const oscillator = audioContext.createOscillator();
  oscillator.type = waveform;
  oscillator.frequency.value = frequency;
  
  if (detune !== 0) {
    oscillator.detune.value = detune;
  }
  
  // Create gain node for this oscillator
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0; // Start silent for fade in
  
  // Connect oscillator to its gain node, then to master gain
  oscillator.connect(gainNode);
  gainNode.connect(masterGainNode);
  
  // Fade in
  const now = audioContext.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + fadeIn);
  
  // Start oscillator
  oscillator.start();
  
  // If duration is specified, schedule stop
  if (duration !== null) {
    // Schedule fade out
    gainNode.gain.setValueAtTime(volume, now + duration - fadeOut);
    gainNode.gain.linearRampToValueAtTime(0, now + duration);
    
    // Schedule stop
    oscillator.stop(now + duration + 0.01); // Small buffer after fade
    
    // Clean up after stop
    oscillator.onended = () => {
      delete activeOscillators[id];
      delete activeTones[id];
    };
  }
  
  // Store active oscillator and its gain node
  activeOscillators[id] = {
    oscillator,
    gainNode,
    frequency,
    waveform,
    startTime: now
  };
  
  activeTones[id] = {
    frequency,
    waveform,
    volume,
    detune,
    duration,
    id
  };
  
  return {
    id,
    frequency,
    waveform,
    status: 'playing'
  };
}

/**
 * Stop a specific tone
 * @param {String} id - Tone identifier
 * @param {Number} fadeOut - Fade out time in seconds
 * @returns {Object} Status
 */
function stopTone(id, fadeOut = 0.1) {
  if (!activeOscillators[id]) {
    return { status: 'error', message: 'Tone not found' };
  }
  
  const { oscillator, gainNode } = activeOscillators[id];
  const now = audioContext.currentTime;
  
  // Fade out
  gainNode.gain.setValueAtTime(gainNode.gain.value, now);
  gainNode.gain.linearRampToValueAtTime(0, now + fadeOut);
  
  // Schedule stop
  oscillator.stop(now + fadeOut + 0.01);
  
  // Clean up
  oscillator.onended = () => {
    delete activeOscillators[id];
    delete activeTones[id];
  };
  
  return { status: 'stopping', id };
}

/**
 * Stop all active tones
 * @param {Number} fadeOut - Fade out time in seconds
 * @returns {Object} Status
 */
function stopAllTones(fadeOut = 0.1) {
  const toneIds = Object.keys(activeOscillators);
  
  if (toneIds.length === 0) {
    return { status: 'no-tones-active' };
  }
  
  toneIds.forEach(id => stopTone(id, fadeOut));
  
  return { status: 'stopping-all', count: toneIds.length };
}

/**
 * Change the master volume
 * @param {Number} volume - Volume level (0 to 1)
 * @returns {Object} Status
 */
function setMasterVolume(volume) {
  if (!masterGainNode) {
    return { status: 'error', message: 'Sound generator not initialized' };
  }
  
  // Ensure volume is between 0 and 1
  const safeVolume = Math.max(0, Math.min(1, volume));
  masterGainNode.gain.value = safeVolume;
  
  return { status: 'volume-set', volume: safeVolume };
}

/**
 * Generate a phi-harmonic frequency
 * @param {String} frequencyName - Name of the phi-harmonic frequency
 * @param {Object} options - Tone generation options
 * @returns {Object} Oscillator info
 */
function generatePhiHarmonicFrequency(frequencyName, options = {}) {
  const frequency = PHI_HARMONIC_FREQUENCIES[frequencyName];
  
  if (!frequency) {
    return { 
      status: 'error', 
      message: 'Unknown frequency name',
      validFrequencies: Object.keys(PHI_HARMONIC_FREQUENCIES)
    };
  }
  
  return generateTone(frequency, {
    ...options,
    id: `phi-${frequencyName}-${Date.now()}`
  });
}

/**
 * Generate phi-harmonic overtones for a base frequency
 * @param {Number} baseFrequency - Base frequency in Hz
 * @param {Object} options - Overtone generation options
 * @returns {Object} Overtone info
 */
function generatePhiHarmonicOvertones(baseFrequency, options = {}) {
  const {
    includePhiInverse = true,   // φ⁻¹ (0.618)
    includePhi = true,          // φ (1.618)
    includePhiSquared = false,  // φ² (2.618)
    includePhiToPhi = false,    // φ^φ (4.236)
    volume = 0.3,               // Main volume for overtones
    duration = null,            // null for continuous, or seconds
    waveform = 'sine'           // Waveform type
  } = options;
  
  const overtones = [];
  const overtoneGroup = `overtones-${Date.now()}`;
  
  // Generate the overtones
  if (includePhiInverse) {
    const frequency = baseFrequency * PHI_INVERSE;
    const tone = generateTone(frequency, {
      volume: volume * 0.6,
      waveform,
      duration,
      id: `${overtoneGroup}-phi-inverse`
    });
    overtones.push({ ratio: 'φ⁻¹', frequency, tone });
  }
  
  if (includePhi) {
    const frequency = baseFrequency * PHI;
    const tone = generateTone(frequency, {
      volume: volume * 0.5,
      waveform,
      duration,
      id: `${overtoneGroup}-phi`
    });
    overtones.push({ ratio: 'φ', frequency, tone });
  }
  
  if (includePhiSquared) {
    const frequency = baseFrequency * PHI_SQUARED;
    const tone = generateTone(frequency, {
      volume: volume * 0.4,
      waveform,
      duration,
      id: `${overtoneGroup}-phi-squared`
    });
    overtones.push({ ratio: 'φ²', frequency, tone });
  }
  
  if (includePhiToPhi) {
    const frequency = baseFrequency * PHI_TO_PHI_POWER;
    const tone = generateTone(frequency, {
      volume: volume * 0.3,
      waveform,
      duration,
      id: `${overtoneGroup}-phi-to-phi`
    });
    overtones.push({ ratio: 'φ^φ', frequency, tone });
  }
  
  return {
    baseFrequency,
    overtoneGroup,
    overtones,
    status: 'playing'
  };
}

/**
 * Generate a binaural beat between two frequencies
 * @param {Number} baseFrequency - Base frequency in Hz
 * @param {Number} beatFrequency - Beat frequency in Hz
 * @param {Object} options - Binaural beat options
 * @returns {Object} Binaural beat info
 */
function generateBinauralBeat(baseFrequency, beatFrequency, options = {}) {
  const {
    volume = 0.5,
    waveform = 'sine',
    duration = null,
    pan = 0.7 // 0 = center, 1 = full stereo separation
  } = options;
  
  if (!audioContext) {
    initializeSoundGenerator();
  }
  
  // Resume audio context if needed
  resumeAudioContext();
  
  // Create two oscillators, slightly different in frequency
  const freq1 = baseFrequency;
  const freq2 = baseFrequency + beatFrequency;
  
  // Create stereo panner for each oscillator
  const pannerLeft = audioContext.createStereoPanner();
  const pannerRight = audioContext.createStereoPanner();
  
  // Set pan values
  pannerLeft.pan.value = -pan;
  pannerRight.pan.value = pan;
  
  // Create gain nodes for each oscillator
  const gainLeft = audioContext.createGain();
  const gainRight = audioContext.createGain();
  
  gainLeft.gain.value = volume;
  gainRight.gain.value = volume;
  
  // Create the oscillators
  const oscLeft = audioContext.createOscillator();
  const oscRight = audioContext.createOscillator();
  
  oscLeft.type = waveform;
  oscRight.type = waveform;
  
  oscLeft.frequency.value = freq1;
  oscRight.frequency.value = freq2;
  
  // Connect everything
  oscLeft.connect(gainLeft);
  gainLeft.connect(pannerLeft);
  pannerLeft.connect(masterGainNode);
  
  oscRight.connect(gainRight);
  gainRight.connect(pannerRight);
  pannerRight.connect(masterGainNode);
  
  // Start oscillators
  const now = audioContext.currentTime;
  oscLeft.start(now);
  oscRight.start(now);
  
  // Generate a unique ID
  const id = `binaural-${Date.now()}`;
  
  // Store in active oscillators
  activeOscillators[`${id}-left`] = {
    oscillator: oscLeft,
    gainNode: gainLeft,
    frequency: freq1,
    waveform,
    startTime: now
  };
  
  activeOscillators[`${id}-right`] = {
    oscillator: oscRight,
    gainNode: gainRight,
    frequency: freq2,
    waveform,
    startTime: now
  };
  
  // If duration is specified, schedule stop
  if (duration !== null) {
    oscLeft.stop(now + duration);
    oscRight.stop(now + duration);
    
    // Clean up after stop
    oscLeft.onended = () => {
      delete activeOscillators[`${id}-left`];
    };
    
    oscRight.onended = () => {
      delete activeOscillators[`${id}-right`];
      delete activeTones[id];
    };
  }
  
  // Store in active tones
  activeTones[id] = {
    type: 'binaural',
    baseFrequency,
    beatFrequency,
    leftFrequency: freq1,
    rightFrequency: freq2,
    volume,
    waveform,
    pan,
    duration,
    id
  };
  
  return {
    id,
    baseFrequency,
    beatFrequency,
    status: 'playing'
  };
}

/**
 * Stop a binaural beat
 * @param {String} id - Binaural beat identifier
 * @param {Number} fadeOut - Fade out time in seconds
 * @returns {Object} Status
 */
function stopBinauralBeat(id, fadeOut = 0.1) {
  const leftId = `${id}-left`;
  const rightId = `${id}-right`;
  
  if (!activeOscillators[leftId] || !activeOscillators[rightId]) {
    return { status: 'error', message: 'Binaural beat not found' };
  }
  
  stopTone(leftId, fadeOut);
  stopTone(rightId, fadeOut);
  
  delete activeTones[id];
  
  return { status: 'stopping', id };
}

/**
 * Generate sound for a specific frequency in the phi-harmonic progression
 * @param {Number} frequency - Target frequency
 * @param {Object} options - Sound generation options
 * @returns {Object} Sound generation status
 */
function generateFrequencySound(frequency, options = {}) {
  // Stop any currently playing sounds
  stopAllTones(0.5);
  
  const {
    waveform = 'sine',
    volume = 0.5,
    duration = null,
    includeOvertones = true,
    includeBinauralBeat = false,
    binauralBeatFrequency = 7.83 // Schumann resonance
  } = options;
  
  // Update the active frequency
  activeFrequency = frequency;
  
  // Play the main frequency
  const mainTone = generateTone(frequency, {
    waveform,
    volume,
    duration,
    id: `main-${frequency}`
  });
  
  const result = {
    frequency,
    mainTone,
    overtones: null,
    binauralBeat: null,
    status: 'playing'
  };
  
  // Add phi-harmonic overtones if requested
  if (includeOvertones) {
    // Determine which overtones to include based on frequency
    const overtoneOptions = {
      includePhiInverse: true,
      includePhi: true,
      includePhiSquared: frequency >= 528, // Only for Creation Point and above
      includePhiToPhi: frequency >= 768,   // Only for Unity Wave
      volume: volume * 0.3,
      duration,
      waveform
    };
    
    result.overtones = generatePhiHarmonicOvertones(frequency, overtoneOptions);
  }
  
  // Add binaural beat if requested
  if (includeBinauralBeat) {
    result.binauralBeat = generateBinauralBeat(frequency, binauralBeatFrequency, {
      volume: volume * 0.4,
      waveform,
      duration,
      pan: 0.7
    });
  }
  
  return result;
}

// Export the sound generation API
window.quantumSound = {
  initialize: initializeSoundGenerator,
  resumeAudio: resumeAudioContext,
  generateTone,
  stopTone,
  stopAllTones,
  setVolume: setMasterVolume,
  generatePhiHarmonicFrequency,
  generatePhiHarmonicOvertones,
  generateBinauralBeat,
  stopBinauralBeat,
  generateFrequencySound,
  
  // Frequency constants
  frequencies: PHI_HARMONIC_FREQUENCIES,
  
  // Utility to get current state
  getState: () => ({
    initialized: !!audioContext,
    context: audioContext ? {
      state: audioContext.state,
      sampleRate: audioContext.sampleRate
    } : null,
    activeTones: Object.keys(activeTones).length,
    activeFrequency
  })
};
