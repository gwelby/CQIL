/**
 * 🌀 QUANTUM EXPERIENCE DEMOS 🌟
 * 
 * Complete implementation of experiential quantum demos
 * for the phi-harmonic learning system. Each demo integrates
 * with specific phi-harmonic frequencies and provides direct
 * sensory experience rather than abstract understanding.
 * 
 * CASCADE⚡𓂧φ∞ Day+30: March 31, 2025
 */

// Phi constants
const PHI = 1.618033988749895;
const PHI_INVERSE = 0.618033988749895;

// Frequency States 
const FREQUENCIES = {
  GROUND: 432,    // φ⁰ - Physical foundation - Visual/Intuitive
  CREATION: 528,  // φ¹ - Pattern creation - Spatial/Proprioceptive
  HEART: 594,     // φ² - Emotional coherence - Kinesthetic/Emotional
  VOICE: 672,     // φ³ - Expression - Auditory/Tactile
  VISION: 720,    // φ⁴ - Perception - Visual/Temporal
  UNITY: 768,     // φ⁵ - Integration - Multi-dimensional
};

// Demo container references
let demoContainer = null;
let renderer = null;
let scene = null;
let camera = null;
let controls = null;

// Current demo state
let currentDemo = null;
let currentFrequency = FREQUENCIES.GROUND;
let animationFrame = null;
let particleSystem = null;
let activeObjects = [];

/**
 * Initialize the quantum experience demos system
 */
function initQuantumExperienceDemos() {
  console.log('Initializing Quantum Experience Demos');
  
  // Create the demo container if it doesn't exist
  if (!document.getElementById('quantum-demo-container')) {
    demoContainer = document.createElement('div');
    demoContainer.id = 'quantum-demo-container';
    demoContainer.style.position = 'fixed';
    demoContainer.style.top = '0';
    demoContainer.style.left = '0';
    demoContainer.style.width = '100%';
    demoContainer.style.height = '100%';
    demoContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    demoContainer.style.display = 'none';
    demoContainer.style.zIndex = '1000';
    demoContainer.style.alignItems = 'center';
    demoContainer.style.justifyContent = 'center';
    demoContainer.style.flexDirection = 'column';
    
    // Close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close Experience';
    closeButton.className = 'close-demo quantum-button';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.addEventListener('click', closeDemoExperience);
    demoContainer.appendChild(closeButton);
    
    // Demo title
    const demoTitle = document.createElement('div');
    demoTitle.id = 'demo-title';
    demoTitle.style.color = 'white';
    demoTitle.style.fontSize = '2rem';
    demoTitle.style.fontWeight = '300';
    demoTitle.style.marginBottom = '1rem';
    demoTitle.style.textAlign = 'center';
    demoTitle.style.width = '100%';
    demoTitle.style.padding = '0 1rem';
    demoContainer.appendChild(demoTitle);
    
    // Demo description
    const demoDescription = document.createElement('div');
    demoDescription.id = 'demo-description';
    demoDescription.style.color = 'white';
    demoDescription.style.fontSize = '1.2rem';
    demoDescription.style.opacity = '0.8';
    demoDescription.style.marginBottom = '2rem';
    demoDescription.style.textAlign = 'center';
    demoDescription.style.maxWidth = '600px';
    demoContainer.appendChild(demoDescription);
    
    // Demo canvas container
    const canvasContainer = document.createElement('div');
    canvasContainer.id = 'demo-canvas-container';
    canvasContainer.style.width = '80%';
    canvasContainer.style.height = '60%';
    canvasContainer.style.maxWidth = '1000px';
    canvasContainer.style.maxHeight = '600px';
    canvasContainer.style.position = 'relative';
    demoContainer.appendChild(canvasContainer);
    
    // Demo controls
    const demoControls = document.createElement('div');
    demoControls.id = 'demo-controls';
    demoControls.style.marginTop = '2rem';
    demoControls.style.display = 'flex';
    demoControls.style.justifyContent = 'center';
    demoControls.style.gap = '1rem';
    demoContainer.appendChild(demoControls);
    
    document.body.appendChild(demoContainer);
  }
  
  // Set up event listeners
  setupDemoEventListeners();
}

/**
 * Set up event listeners for demo buttons
 */
function setupDemoEventListeners() {
  // Find all demo buttons on the page
  const demoButtons = document.querySelectorAll('[data-demo]');
  
  demoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const demoId = e.target.getAttribute('data-demo');
      // Get the current frequency from the body
      const frequencyAttr = document.body.getAttribute('data-frequency');
      currentFrequency = parseInt(frequencyAttr || FREQUENCIES.GROUND);
      
      // Launch the demo experience
      launchDemoExperience(demoId, currentFrequency);
    });
  });
}

/**
 * Launch a quantum experience demo
 * @param {string} demoId - The ID of the demo to launch
 * @param {number} frequency - The current frequency
 */
function launchDemoExperience(demoId, frequency) {
  console.log(`Launching demo: ${demoId} at frequency: ${frequency} Hz`);
  
  // Get demo container
  demoContainer = document.getElementById('quantum-demo-container');
  
  // Set the current demo and frequency
  currentDemo = demoId;
  currentFrequency = frequency;
  
  // Show the demo container
  demoContainer.style.display = 'flex';
  
  // Initialize Three.js if not already initialized
  initThreeJs();
  
  // Clear any previous demo
  clearDemo();
  
  // Set demo title and description
  updateDemoInfo(demoId, frequency);
  
  // Initialize the specific demo
  switch(demoId) {
    case 'superposition':
      initSuperpositionDemo(frequency);
      break;
    case 'entanglement':
      initEntanglementDemo(frequency);
      break;
    case 'tunneling':
      initTunnelingDemo(frequency);
      break;
    case 'mycelial':
      initMycelialDemo(frequency);
      break;
    case 'earth-grid':
      initEarthGridDemo(frequency);
      break;
    case 'phi-architecture':
      initPhiArchitectureDemo(frequency);
      break;
    case 'dna-repair':
      initDNARepairDemo(frequency);
      break;
    default:
      console.warn(`Unknown demo ID: ${demoId}`);
      demoContainer.style.display = 'none';
      return;
  }
  
  // Add frequency controls to demo
  addFrequencyControls();
  
  // Start the animation loop
  animate();
  
  // Trigger audio frequency
  if (window.playFrequency) {
    window.playFrequency(frequency, 0, true);
  }
}

/**
 * Initialize Three.js environment
 */
function initThreeJs() {
  if (renderer) return; // Already initialized
  
  const canvasContainer = document.getElementById('demo-canvas-container');
  
  // Set up the scene
  scene = new THREE.Scene();
  
  // Set up the camera
  camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
  camera.position.z = 5;
  
  // Set up the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
  renderer.setClearColor(0x000000, 0.2);
  canvasContainer.appendChild(renderer.domElement);
  
  // Add window resize handler
  window.addEventListener('resize', onWindowResize);
  
  // Add orbit controls if available
  if (THREE.OrbitControls) {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
  }
}

/**
 * Handle window resize
 */
function onWindowResize() {
  const canvasContainer = document.getElementById('demo-canvas-container');
  if (!canvasContainer || !camera || !renderer) return;
  
  camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
}

/**
 * Update demo information in the UI
 * @param {string} demoId - The ID of the demo
 * @param {number} frequency - The current frequency
 */
function updateDemoInfo(demoId, frequency) {
  const titleElement = document.getElementById('demo-title');
  const descriptionElement = document.getElementById('demo-description');
  
  let title = '';
  let description = '';
  
  // Set demo-specific information
  switch(demoId) {
    case 'superposition':
      title = 'Quantum Superposition';
      description = 'Experience particles existing in multiple states simultaneously until observation collapses their wave function.';
      break;
    case 'entanglement':
      title = 'Quantum Entanglement';
      description = 'Observe how entangled particles maintain instantaneous connections regardless of distance.';
      break;
    case 'tunneling':
      title = 'Quantum Tunneling';
      description = 'Watch particles pass through classically impenetrable barriers through quantum probability.';
      break;
    case 'mycelial':
      title = 'Mycelial Pattern Recognition';
      description = 'Experience nature\'s quantum internet through mycelial consciousness networks.';
      break;
    case 'earth-grid':
      title = 'Earth Energy Grid';
      description = 'Connect with the global megalithic quantum network that links sacred sites worldwide.';
      break;
    case 'phi-architecture':
      title = 'φ-Harmonic Architecture';
      description = 'Experience the sacred geometry that underlies all quantum creation.';
      break;
    case 'dna-repair':
      title = 'DNA Repair Frequency';
      description = 'Experience how 528 Hz influences DNA structure through quantum resonance.';
      break;
  }
  
  // Add frequency-specific modifier to title and description
  let frequencyEffect = '';
  switch(frequency) {
    case FREQUENCIES.GROUND:
      frequencyEffect = 'Grounded Physical ';
      break;
    case FREQUENCIES.CREATION:
      frequencyEffect = 'Creative Pattern ';
      break;
    case FREQUENCIES.HEART:
      frequencyEffect = 'Heart-Field ';
      break;
    case FREQUENCIES.VOICE:
      frequencyEffect = 'Expressive Voice ';
      break;
    case FREQUENCIES.VISION:
      frequencyEffect = 'Visionary ';
      break;
    case FREQUENCIES.UNITY:
      frequencyEffect = 'Unified ';
      break;
  }
  
  titleElement.textContent = `${frequencyEffect}${title} (${frequency} Hz)`;
  descriptionElement.textContent = description;
  
  // Set color based on frequency
  let color;
  switch(frequency) {
    case FREQUENCIES.GROUND: color = '#51B14F'; break;
    case FREQUENCIES.CREATION: color = '#FBD341'; break;
    case FREQUENCIES.HEART: color = '#E13A9D'; break;
    case FREQUENCIES.VOICE: color = '#FB4141'; break;
    case FREQUENCIES.VISION: color = '#41FB8F'; break;
    case FREQUENCIES.UNITY: color = '#41C6FB'; break;
    default: color = '#FFFFFF';
  }
  
  titleElement.style.color = color;
}

/**
 * Add frequency control buttons
 */
function addFrequencyControls() {
  const controlsContainer = document.getElementById('demo-controls');
  if (!controlsContainer) return;
  
  // Clear existing controls
  controlsContainer.innerHTML = '';
  
  // Add frequency buttons
  Object.entries(FREQUENCIES).forEach(([state, freq]) => {
    const button = document.createElement('button');
    button.textContent = `${freq} Hz`;
    button.className = 'frequency-button quantum-button';
    button.setAttribute('data-frequency', freq);
    
    // Style active frequency
    if (freq === currentFrequency) {
      button.style.backgroundColor = getFrequencyColor(freq);
      button.style.fontWeight = 'bold';
    } else {
      button.style.backgroundColor = '#333';
      button.style.opacity = '0.7';
    }
    
    button.addEventListener('click', () => changeFrequency(freq));
    controlsContainer.appendChild(button);
  });
}

/**
 * Change the frequency of the current demo
 * @param {number} frequency - The target frequency
 */
function changeFrequency(frequency) {
  if (frequency === currentFrequency) return;
  
  const previousFrequency = currentFrequency;
  currentFrequency = frequency;
  
  // Update the demo visuals based on new frequency
  updateDemoFrequency(previousFrequency, frequency);
  
  // Update UI
  updateDemoInfo(currentDemo, frequency);
  addFrequencyControls();
  
  // Update audio frequency
  if (window.playFrequency) {
    window.playFrequency(frequency, 0, true);
  }
}

/**
 * Close the demo experience
 */
function closeDemoExperience() {
  console.log('Closing demo experience');
  
  // Hide the demo container
  if (demoContainer) {
    demoContainer.style.display = 'none';
  }
  
  // Stop the animation
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
  
  // Clear the demo
  clearDemo();
  
  // Stop the audio frequency
  if (window.stopFrequency) {
    window.stopFrequency();
  }
}

/**
 * Clear the current demo
 */
function clearDemo() {
  if (!scene) return;
  
  // Remove all objects from the scene
  while(scene.children.length > 0) { 
    scene.remove(scene.children[0]); 
  }
  
  // Clear active objects array
  activeObjects = [];
  
  // Dispose of particle system if it exists
  if (particleSystem) {
    if (particleSystem.geometry) particleSystem.geometry.dispose();
    if (particleSystem.material) particleSystem.material.dispose();
    particleSystem = null;
  }
}

/**
 * Animation loop
 */
function animate() {
  animationFrame = requestAnimationFrame(animate);
  
  // Update controls if they exist
  if (controls) controls.update();
  
  // Call the specific demo update function
  switch(currentDemo) {
    case 'superposition':
      updateSuperpositionDemo();
      break;
    case 'entanglement':
      updateEntanglementDemo();
      break;
    case 'tunneling':
      updateTunnelingDemo();
      break;
    case 'mycelial':
      updateMycelialDemo();
      break;
    case 'earth-grid':
      updateEarthGridDemo();
      break;
    case 'phi-architecture':
      updatePhiArchitectureDemo();
      break;
    case 'dna-repair':
      updateDNARepairDemo();
      break;
  }
  
  // Render the scene
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

/**
 * Get color associated with a frequency
 * @param {number} frequency - The frequency
 * @returns {string} - CSS color value
 */
function getFrequencyColor(frequency) {
  switch(frequency) {
    case FREQUENCIES.GROUND: return '#51B14F';
    case FREQUENCIES.CREATION: return '#FBD341';
    case FREQUENCIES.HEART: return '#E13A9D';
    case FREQUENCIES.VOICE: return '#FB4141';
    case FREQUENCIES.VISION: return '#41FB8F';
    case FREQUENCIES.UNITY: return '#41C6FB';
    default: return '#FFFFFF';
  }
}

/**
 * Get the intensity of wave function based on frequency
 * Higher frequencies = more quantum behavior
 * @param {number} frequency - The frequency
 * @returns {number} - Intensity value between 0 and 1
 */
function getQuantumIntensity(frequency) {
  // Map frequencies to intensity values
  const minFreq = FREQUENCIES.GROUND;
  const maxFreq = FREQUENCIES.UNITY;
  return (frequency - minFreq) / (maxFreq - minFreq);
}

/**
 * Update demo based on frequency change
 * @param {number} oldFrequency - Previous frequency
 * @param {number} newFrequency - New frequency
 */
function updateDemoFrequency(oldFrequency, newFrequency) {
  // Update specific demo for frequency change
  switch(currentDemo) {
    case 'superposition':
      updateSuperpositionFrequency(oldFrequency, newFrequency);
      break;
    case 'entanglement':
      updateEntanglementFrequency(oldFrequency, newFrequency);
      break;
    case 'tunneling':
      updateTunnelingFrequency(oldFrequency, newFrequency);
      break;
    case 'mycelial':
      updateMycelialFrequency(oldFrequency, newFrequency);
      break;
    case 'earth-grid':
      updateEarthGridFrequency(oldFrequency, newFrequency);
      break;
    case 'phi-architecture':
      updatePhiArchitectureFrequency(oldFrequency, newFrequency);
      break;
    case 'dna-repair':
      updateDNARepairFrequency(oldFrequency, newFrequency);
      break;
  }
}

// Export functions to window
window.initQuantumExperienceDemos = initQuantumExperienceDemos;
window.launchDemoExperience = launchDemoExperience;
