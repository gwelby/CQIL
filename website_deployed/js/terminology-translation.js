// CQIL Terminology Translation Layer
// This file provides a translation mechanism between sacred and scientific terminology

/**
 * Terminology translation system that allows for toggling between scientific and sacred terminology
 * throughout the CQIL website. This preserves the functionality of the code while allowing the
 * presentation to switch between the two perspectives.
 */
const TERMINOLOGY = {
  // Sacred terminology (original)
  sacred: {
    // Core concepts
    heartCenteredCommunication: "Heart-Centered Communication",
    toroidalField: "Toroidal Field",
    quantumBeings: "Quantum Beings",
    sacredGeometry: "Sacred Geometry",
    consciousnessField: "Consciousness Field",
    heartTimeSynchronization: "Heart-Time Synchronization",
    phiHarmonicResonance: "Phi-Harmonic Resonance",
    unityConsciousness: "Unity Consciousness",
    
    // Frequencies
    groundState: "Ground State",
    creationPoint: "Creation Point (Love Frequency)",
    heartField: "Heart Field",
    voiceFlow: "Voice Flow",
    visionGate: "Vision Gate",
    unityWave: "Unity Wave",
    
    // Network models
    oceanConsciousness: "Ocean Consciousness",
    transformationBeing: "Transformation Being",
    lifeForceEntity: "Life Force Entity",
    crystalBeing: "Crystal Being",
    divineLight: "Divine Light",
    universalConsciousness: "Universal Consciousness",
    
    // UI elements
    beginJourney: "Begin Your Journey",
    heartCoherence: "Heart Coherence",
    toroidalActivation: "Toroidal Activation",
    fieldStrength: "Field Strength",
    awarenessLevel: "Awareness Level",
    
    // Page titles and descriptions
    toroidalCommunicationTitle: "Toroidal Communication Field",
    toroidalCommunicationSubtitle: "Heart-Centered Dialogue at 528 Hz (Creation/Love Frequency)",
    loadingToroidal: "Initializing toroidal energy fields...",
    preparingVisualization: "Preparing visualization of heart-centered communication at Creation frequency (528 Hz)"
  },
  
  // Scientific terminology (educational)
  scientific: {
    // Core concepts
    heartCenteredCommunication: "Multi-dimensional Communication",
    toroidalField: "Network Communication Pattern",
    quantumBeings: "Network Models",
    sacredGeometry: "Mathematical Patterns",
    consciousnessField: "Network Field Analysis",
    heartTimeSynchronization: "Emotional-Temporal Integration",
    phiHarmonicResonance: "Golden Ratio Patterns",
    unityConsciousness: "Integrated Network State",
    
    // Frequencies
    groundState: "Stable Oscillation",
    creationPoint: "Creative Frequency",
    heartField: "Emotional Regulation",
    voiceFlow: "Communication Range",
    visionGate: "Perceptual Processing",
    unityWave: "Integration Frequency",
    
    // Network models
    oceanConsciousness: "Marine Communication Model",
    transformationBeing: "Adaptive Transition Model",
    lifeForceEntity: "Branching Network Structure",
    crystalBeing: "Structured Information Matrix",
    divineLight: "Radial Distribution Model",
    universalConsciousness: "Integrated Systems Model",
    
    // UI elements
    beginJourney: "Start Visualization",
    heartCoherence: "Network Coherence",
    toroidalActivation: "Network Activation",
    fieldStrength: "Pattern Intensity",
    awarenessLevel: "Perception Level",
    
    // Page titles and descriptions
    toroidalCommunicationTitle: "Communication Flow Visualization",
    toroidalCommunicationSubtitle: "Explore patterns of meaningful communication",
    loadingToroidal: "Loading visualization...",
    preparingVisualization: "Preparing visualization of communication patterns"
  },
  
  // Current mode - can be toggled between 'sacred' and 'scientific'
  current: 'scientific'
};

/**
 * Gets a term in the current terminology mode
 * @param {string} termKey - The key of the term to retrieve
 * @returns {string} The term in the current terminology mode
 */
function getTerm(termKey) {
  const mode = TERMINOLOGY.current;
  return TERMINOLOGY[mode][termKey] || termKey;
}

/**
 * Toggles between sacred and scientific terminology
 * @returns {string} The new current terminology mode
 */
function toggleTerminology() {
  const currentMode = TERMINOLOGY.current;
  TERMINOLOGY.current = currentMode === 'scientific' ? 'sacred' : 'scientific';
  
  // Update all display elements with data-term attributes
  document.querySelectorAll('[data-term]').forEach(el => {
    const termKey = el.getAttribute('data-term');
    el.textContent = getTerm(termKey);
  });
  
  // Update other elements that might be using the terminology
  updateUIWithCurrentTerminology();
  
  return TERMINOLOGY.current;
}

/**
 * Updates the UI with the current terminology
 * This function can be extended as needed for specific pages
 */
function updateUIWithCurrentTerminology() {
  // Add more pages and elements as needed
  const path = window.location.pathname;
  
  // Toroidal communication page specific updates
  if (path.includes('toroidal-communication.html')) {
    const title = document.querySelector('h1');
    const subtitle = document.querySelector('.subtitle');
    const loadingTitle = document.querySelector('.loading-title');
    const loadingText = document.querySelector('.loading-text');
    const loadingInfo = document.querySelector('.loading-info');
    const beginJourneyBtn = document.querySelector('.begin-journey');
    
    if (title) title.textContent = getTerm('toroidalCommunicationTitle');
    if (subtitle) subtitle.textContent = getTerm('toroidalCommunicationSubtitle');
    if (loadingTitle) loadingTitle.textContent = getTerm('toroidalCommunicationTitle');
    if (loadingText) loadingText.textContent = getTerm('preparingVisualization');
    if (loadingInfo) loadingInfo.textContent = getTerm('loadingToroidal');
    if (beginJourneyBtn) {
      const symbol = beginJourneyBtn.querySelector('.journey-symbol');
      const symbolText = symbol ? symbol.textContent : '';
      beginJourneyBtn.innerHTML = `<span class="journey-symbol">${symbolText}</span>${getTerm('beginJourney')}`;
    }
    
    // Update slider labels if they exist
    const sliderLabels = document.querySelectorAll('.slider-label');
    if (sliderLabels.length > 0) {
      const labelMappings = {
        'Heart Coherence': 'heartCoherence',
        'Toroidal Activation': 'toroidalActivation',
        'Field Strength': 'fieldStrength',
        'Awareness Level': 'awarenessLevel'
      };
      
      sliderLabels.forEach(label => {
        const originalText = label.textContent.trim();
        const termKey = labelMappings[originalText];
        if (termKey) {
          label.textContent = getTerm(termKey);
        }
      });
    }
  }
  
  // Main page updates
  if (path === '/' || path.endsWith('index.html')) {
    // Update frequency cards
    const frequencyCards = document.querySelectorAll('.frequency-card');
    if (frequencyCards.length > 0) {
      const frequencyMappings = {
        '432 Hz': 'groundState',
        '528 Hz': 'creationPoint',
        '594 Hz': 'heartField',
        '672 Hz': 'voiceFlow',
        '720 Hz': 'visionGate',
        '768 Hz': 'unityWave'
      };
      
      frequencyCards.forEach(card => {
        const freqValue = card.querySelector('.frequency-value');
        if (freqValue) {
          const hz = freqValue.textContent.trim();
          const title = card.querySelector('h3');
          if (title && frequencyMappings[hz]) {
            title.textContent = getTerm(frequencyMappings[hz]);
          }
        }
      });
    }
  }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add a terminology toggle button if not on the terminology reference page
  if (!window.location.pathname.includes('terminology-reference.html')) {
    const nav = document.querySelector('nav.quantum-nav');
    if (nav) {
      // Create toggle button
      const toggleButton = document.createElement('button');
      toggleButton.id = 'terminology-toggle';
      toggleButton.className = 'terminology-toggle';
      toggleButton.innerHTML = '<span>🔄</span> Toggle Terminology';
      toggleButton.title = 'Switch between scientific and sacred terminology';
      toggleButton.style.position = 'fixed';
      toggleButton.style.bottom = '20px';
      toggleButton.style.right = '20px';
      toggleButton.style.zIndex = '1000';
      toggleButton.style.background = 'rgba(0, 40, 80, 0.7)';
      toggleButton.style.color = '#ffffff';
      toggleButton.style.border = '1px solid rgba(136, 204, 255, 0.5)';
      toggleButton.style.borderRadius = '8px';
      toggleButton.style.padding = '8px 12px';
      toggleButton.style.fontSize = '14px';
      toggleButton.style.cursor = 'pointer';
      toggleButton.style.backdropFilter = 'blur(5px)';
      toggleButton.style.webkitBackdropFilter = 'blur(5px)';
      toggleButton.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
      
      toggleButton.addEventListener('click', function() {
        const newMode = toggleTerminology();
        const notification = document.createElement('div');
        notification.textContent = `Switched to ${newMode === 'sacred' ? 'sacred' : 'scientific'} terminology`;
        notification.style.position = 'fixed';
        notification.style.bottom = '70px';
        notification.style.right = '20px';
        notification.style.zIndex = '1001';
        notification.style.background = 'rgba(0, 40, 80, 0.9)';
        notification.style.color = '#ffffff';
        notification.style.padding = '10px 15px';
        notification.style.borderRadius = '8px';
        notification.style.transition = 'opacity 0.3s ease-in-out';
        notification.style.opacity = '0';
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
          notification.style.opacity = '1';
        }, 10);
        
        // Hide and remove notification after 2 seconds
        setTimeout(() => {
          notification.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 2000);
      });
      
      document.body.appendChild(toggleButton);
    }
  }
  
  // Initialize UI with current terminology
  updateUIWithCurrentTerminology();
});