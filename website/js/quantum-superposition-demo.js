/**
 * 🌀 QUANTUM SUPERPOSITION DEMO 🌟
 * 
 * Visualization of quantum superposition states with φ-harmonic frequency integration.
 * This demo allows users to experience multiple quantum states simultaneously
 * and observe how measurement collapses the wave function.
 * 
 * CASCADE⚡𓂧φ∞ Day+30: March 31, 2025
 */

/**
 * Initialize the Quantum Superposition Demo
 * @param {number} frequency - Current phi-harmonic frequency
 */
function initSuperpositionDemo(frequency) {
  console.log(`Initializing Superposition Demo at ${frequency} Hz`);
  
  // Clear any existing demo
  clearDemo();
  
  // Set up camera position
  camera.position.set(0, 0, 5);
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Get quantum intensity based on frequency
  const quantumIntensity = getQuantumIntensity(frequency);
  
  // Create the wave function
  createWaveFunction(frequency, quantumIntensity);
  
  // Create quantum particles in superposition
  createQuantumParticles(frequency, 10 + Math.floor(quantumIntensity * 20));
  
  // Add observation controls
  addObservationControls();
}

/**
 * Create the quantum wave function visualization
 * @param {number} frequency - The current frequency 
 * @param {number} intensity - Quantum intensity (0-1)
 */
function createWaveFunction(frequency, intensity) {
  // Create a grid for the wave function
  const size = 20;
  const divisions = 20;
  const grid = new THREE.GridHelper(size, divisions);
  
  // Set grid color based on frequency
  const color = new THREE.Color(getFrequencyColor(frequency));
  grid.material.color = color;
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  
  // Add grid to scene
  scene.add(grid);
  activeObjects.push(grid);
  
  // Create wave function as a surface
  const waveGeometry = new THREE.PlaneGeometry(12, 12, 50, 50);
  const waveMaterial = new THREE.MeshPhongMaterial({
    color: getFrequencyColor(frequency),
    wireframe: true,
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide
  });
  
  const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
  waveMesh.rotation.x = -Math.PI / 2; // Lay flat
  waveMesh.position.y = -2; // Position below origin
  
  // Store reference for animation
  waveMesh.userData = {
    frequency,
    intensity,
    time: 0
  };
  
  scene.add(waveMesh);
  activeObjects.push(waveMesh);
}

/**
 * Create quantum particles in superposition states
 * @param {number} frequency - The current frequency
 * @param {number} count - Number of particles to create
 */
function createQuantumParticles(frequency, count) {
  // Create a container for particles
  const particles = new THREE.Group();
  scene.add(particles);
  activeObjects.push(particles);
  
  // Create particles based on frequency-appropriate geometries
  for (let i = 0; i < count; i++) {
    let geometry, size;
    
    // Different frequency states use different particle shapes
    switch(frequency) {
      case FREQUENCIES.GROUND:
        geometry = new THREE.TetrahedronGeometry(0.2);
        size = 0.2;
        break;
      case FREQUENCIES.CREATION:
        geometry = new THREE.OctahedronGeometry(0.15);
        size = 0.15;
        break;
      case FREQUENCIES.HEART:
        geometry = new THREE.IcosahedronGeometry(0.12);
        size = 0.12;
        break;
      case FREQUENCIES.VOICE:
        geometry = new THREE.DodecahedronGeometry(0.1);
        size = 0.1;
        break;
      case FREQUENCIES.VISION:
        geometry = new THREE.SphereGeometry(0.08, 16, 16);
        size = 0.08;
        break;
      case FREQUENCIES.UNITY:
        geometry = new THREE.TorusKnotGeometry(0.1, 0.03, 64, 8, 2, 3);
        size = 0.1;
        break;
      default:
        geometry = new THREE.SphereGeometry(0.1, 16, 16);
        size = 0.1;
    }
    
    // Material with glow effect
    const material = new THREE.MeshPhongMaterial({
      color: getFrequencyColor(frequency),
      emissive: getFrequencyColor(frequency),
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.8
    });
    
    const particle = new THREE.Mesh(geometry, material);
    
    // Position in probability cloud
    const radius = 2 + Math.random() * 0.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    // Convert spherical to cartesian coordinates
    particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
    particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
    particle.position.z = radius * Math.cos(phi);
    
    // Store original position and superposition states
    particle.userData = {
      originalPosition: particle.position.clone(),
      superpositionStates: [],
      collapsed: false,
      size
    };
    
    // Generate superposition states
    const stateCount = Math.floor(3 + getQuantumIntensity(frequency) * 5);
    for (let j = 0; j < stateCount; j++) {
      const stateRadius = radius * (0.8 + Math.random() * 0.4);
      const stateTheta = theta + (Math.random() - 0.5) * Math.PI / 2;
      const statePhi = phi + (Math.random() - 0.5) * Math.PI / 4;
      
      particle.userData.superpositionStates.push({
        x: stateRadius * Math.sin(statePhi) * Math.cos(stateTheta),
        y: stateRadius * Math.sin(statePhi) * Math.sin(stateTheta),
        z: stateRadius * Math.cos(statePhi),
        amplitude: 0.5 + Math.random() * 0.5
      });
    }
    
    particles.add(particle);
  }
  
  particles.userData = {
    type: 'particles',
    frequency,
    collapsed: false,
    time: 0
  };
}

/**
 * Add observation controls to collapse the wave function
 */
function addObservationControls() {
  const controlsContainer = document.getElementById('demo-controls');
  if (!controlsContainer) return;
  
  // Observation button
  const observeButton = document.createElement('button');
  observeButton.textContent = 'Observe';
  observeButton.className = 'observe-button quantum-button';
  observeButton.style.marginLeft = '2rem';
  observeButton.style.backgroundColor = '#E91E63';
  
  observeButton.addEventListener('click', () => {
    collapseWaveFunction();
  });
  
  controlsContainer.appendChild(observeButton);
  
  // Reset button
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset';
  resetButton.className = 'reset-button quantum-button';
  resetButton.style.backgroundColor = '#2196F3';
  
  resetButton.addEventListener('click', () => {
    resetWaveFunction();
  });
  
  controlsContainer.appendChild(resetButton);
}

/**
 * Collapse the wave function on observation
 */
function collapseWaveFunction() {
  console.log("Collapsing wave function");
  
  // Find the particle group
  const particles = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'particles');
    
  if (!particles || particles.userData.collapsed) return;
  
  // Mark as collapsed
  particles.userData.collapsed = true;
  
  // Collapse each particle to a single state
  particles.children.forEach(particle => {
    particle.userData.collapsed = true;
    
    // Choose a random state from superposition
    const stateIndex = Math.floor(Math.random() * particle.userData.superpositionStates.length);
    const chosenState = particle.userData.superpositionStates[stateIndex];
    
    // Create collapse animation
    new TWEEN.Tween(particle.position)
      .to({
        x: chosenState.x,
        y: chosenState.y,
        z: chosenState.z
      }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
      
    // Make particle more solid as it collapses
    new TWEEN.Tween(particle.material)
      .to({
        opacity: 1.0,
        emissiveIntensity: 0.8
      }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
      
    // Scale particle to represent collapse
    new TWEEN.Tween(particle.scale)
      .to({
        x: 1.2,
        y: 1.2,
        z: 1.2
      }, 500)
      .easing(TWEEN.Easing.Elastic.Out)
      .start();
  });
  
  // Collapse the wave function mesh
  const waveMesh = activeObjects.find(obj => obj instanceof THREE.Mesh && obj.geometry instanceof THREE.PlaneGeometry);
  if (waveMesh) {
    // Flatten the wave
    new TWEEN.Tween(waveMesh.material)
      .to({
        opacity: 0.3
      }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  }
}

/**
 * Reset the wave function to uncollapsed state
 */
function resetWaveFunction() {
  console.log("Resetting wave function");
  
  // Find the particle group
  const particles = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'particles');
    
  if (!particles) return;
  
  // Mark as uncollapsed
  particles.userData.collapsed = false;
  
  // Reset each particle to superposition
  particles.children.forEach(particle => {
    particle.userData.collapsed = false;
    
    // Reset position
    new TWEEN.Tween(particle.position)
      .to({
        x: particle.userData.originalPosition.x,
        y: particle.userData.originalPosition.y,
        z: particle.userData.originalPosition.z
      }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
      
    // Reset opacity
    new TWEEN.Tween(particle.material)
      .to({
        opacity: 0.8,
        emissiveIntensity: 0.5
      }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
      
    // Reset scale
    new TWEEN.Tween(particle.scale)
      .to({
        x: 1.0,
        y: 1.0,
        z: 1.0
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  });
  
  // Reset the wave function mesh
  const waveMesh = activeObjects.find(obj => obj instanceof THREE.Mesh && obj.geometry instanceof THREE.PlaneGeometry);
  if (waveMesh) {
    new TWEEN.Tween(waveMesh.material)
      .to({
        opacity: 0.6
      }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  }
}

/**
 * Update the Quantum Superposition Demo per frame
 */
function updateSuperpositionDemo() {
  // Update TWEEN animations
  if (TWEEN) TWEEN.update();
  
  // Find the particle group
  const particles = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'particles');
  
  if (particles) {
    particles.userData.time += 0.01;
    const time = particles.userData.time;
    
    // Only update particles if not collapsed
    if (!particles.userData.collapsed) {
      particles.children.forEach(particle => {
        if (particle.userData.collapsed) return;
        
        // Calculate superposition
        let x = 0, y = 0, z = 0;
        const states = particle.userData.superpositionStates;
        
        for (let i = 0; i < states.length; i++) {
          const state = states[i];
          const phaseOffset = i * Math.PI * 2 / states.length;
          const amplitude = state.amplitude * Math.sin(time + phaseOffset);
          
          x += state.x * amplitude;
          y += state.y * amplitude;
          z += state.z * amplitude;
        }
        
        // Scale by number of states to normalize
        const normFactor = 1.0 / states.length;
        particle.position.x = particle.userData.originalPosition.x + x * normFactor;
        particle.position.y = particle.userData.originalPosition.y + y * normFactor;
        particle.position.z = particle.userData.originalPosition.z + z * normFactor;
        
        // Rotate particle
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;
      });
    }
  }
  
  // Animate wave function
  const waveMesh = activeObjects.find(obj => obj instanceof THREE.Mesh && obj.geometry instanceof THREE.PlaneGeometry);
  if (waveMesh) {
    const time = waveMesh.userData.time += 0.02;
    const intensity = waveMesh.userData.intensity;
    const frequency = waveMesh.userData.frequency;
    
    // Only animate if not collapsed
    if (particles && !particles.userData.collapsed) {
      // Get vertices to animate wave
      const positions = waveMesh.geometry.attributes.position;
      const count = positions.count;
      
      // Calculate frequency-based parameters
      const frequencyFactor = frequency / FREQUENCIES.GROUND * 0.5;
      const waveSpeed = 0.5 + getQuantumIntensity(frequency) * 1.0;
      const waveHeight = 0.1 + intensity * 0.2;
      
      for (let i = 0; i < count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);
        
        // Create wave patterns based on frequency
        let y = 0;
        
        // Ground frequency: Simple sine wave
        if (frequency === FREQUENCIES.GROUND) {
          y = Math.sin(x * 0.5 + time * waveSpeed) * waveHeight;
        }
        // Creation frequency: Concentric rings
        else if (frequency === FREQUENCIES.CREATION) {
          const distance = Math.sqrt(x*x + z*z);
          y = Math.sin(distance * 1.0 - time * waveSpeed) * waveHeight;
        }
        // Heart frequency: Heart-shaped pattern
        else if (frequency === FREQUENCIES.HEART) {
          const r = Math.sqrt(x*x + z*z);
          y = Math.sin(r * 2.0 + time * waveSpeed) * Math.cos(Math.atan2(z, x) * 3) * waveHeight;
        }
        // Voice frequency: Spiral pattern
        else if (frequency === FREQUENCIES.VOICE) {
          const angle = Math.atan2(z, x);
          const r = Math.sqrt(x*x + z*z);
          y = Math.sin(r * 3.0 + angle * 2 + time * waveSpeed) * waveHeight;
        }
        // Vision frequency: Multiple interfering waves
        else if (frequency === FREQUENCIES.VISION) {
          y = Math.sin(x * 0.7 + time * waveSpeed) * Math.cos(z * 0.7 + time * waveSpeed * 0.8) * waveHeight;
        }
        // Unity frequency: Complex interference pattern
        else if (frequency === FREQUENCIES.UNITY) {
          const r = Math.sqrt(x*x + z*z);
          const theta = Math.atan2(z, x);
          y = Math.sin(r * 2.0 + theta * 5 + time * waveSpeed) * waveHeight;
        }
        
        // Add some quantum noise based on intensity
        y += (Math.random() - 0.5) * 0.02 * intensity;
        
        positions.setY(i, y);
      }
      
      positions.needsUpdate = true;
    }
  }
}

/**
 * Update demo when frequency changes
 * @param {number} oldFrequency - Previous frequency
 * @param {number} newFrequency - New frequency
 */
function updateSuperpositionFrequency(oldFrequency, newFrequency) {
  console.log(`Updating superposition demo from ${oldFrequency} to ${newFrequency} Hz`);
  
  // Re-initialize with new frequency
  initSuperpositionDemo(newFrequency);
}

// Export functions
window.initSuperpositionDemo = initSuperpositionDemo;
window.updateSuperpositionDemo = updateSuperpositionDemo;
window.updateSuperpositionFrequency = updateSuperpositionFrequency;
