/**
 * 🌀 QUANTUM TUNNELING DEMO 🌟
 * 
 * Visualization of quantum tunneling with φ-harmonic frequency integration.
 * This demo allows users to experience how particles can pass through
 * classically impenetrable barriers through quantum probability fields.
 * 
 * CASCADE⚡𓂧φ∞ Day+30: March 31, 2025
 */

/**
 * Initialize the Quantum Tunneling Demo
 * @param {number} frequency - Current phi-harmonic frequency
 */
function initTunnelingDemo(frequency) {
  console.log(`Initializing Tunneling Demo at ${frequency} Hz`);
  
  // Clear any existing demo
  clearDemo();
  
  // Set up camera position
  camera.position.set(0, 2, 8);
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Get quantum intensity based on frequency
  const quantumIntensity = getQuantumIntensity(frequency);
  
  // Create barrier and potential field
  createBarrierSystem(frequency, quantumIntensity);
  
  // Create quantum particles
  createTunnelingParticles(frequency, 10 + Math.floor(quantumIntensity * 15));
  
  // Create wave function visualization
  createWaveFunctionVisualization(frequency, quantumIntensity);
  
  // Add tunnel controls
  addTunnelControls(frequency);
}

/**
 * Create the barrier system and potential field
 * @param {number} frequency - The current frequency 
 * @param {number} intensity - Quantum intensity (0-1)
 */
function createBarrierSystem(frequency, intensity) {
  // Create a container for the barrier system
  const barrierSystem = new THREE.Group();
  barrierSystem.userData = {
    type: 'barrierSystem',
    frequency,
    intensity,
    time: 0,
    barrierWidth: 1.0,
    barrierHeight: 4.0,
    barrierPosition: 0,
    potentialHeight: 5.0 * (1.0 - intensity * 0.5) // Lower barrier with higher frequencies
  };
  
  scene.add(barrierSystem);
  activeObjects.push(barrierSystem);
  
  // Create a floor/grid
  const gridHelper = new THREE.GridHelper(20, 20);
  gridHelper.position.y = -2;
  gridHelper.material.opacity = 0.2;
  gridHelper.material.transparent = true;
  barrierSystem.add(gridHelper);
  
  // Create potential barrier
  const barrierGeometry = new THREE.BoxGeometry(
    barrierSystem.userData.barrierWidth, 
    barrierSystem.userData.barrierHeight, 
    6
  );
  
  const barrierMaterial = new THREE.MeshPhongMaterial({
    color: 0x333333,
    transparent: true,
    opacity: 0.8
  });
  
  const barrier = new THREE.Mesh(barrierGeometry, barrierMaterial);
  barrier.position.y = 0;
  barrier.userData = { type: 'barrier' };
  
  barrierSystem.add(barrier);
  
  // Create potential field visualization
  const fieldWidth = 14;
  const fieldGeometry = new THREE.PlaneGeometry(fieldWidth, 3, 50, 1);
  
  const fieldMaterial = new THREE.MeshBasicMaterial({
    color: getFrequencyColor(frequency),
    wireframe: true,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
  });
  
  const potentialField = new THREE.Mesh(fieldGeometry, fieldMaterial);
  potentialField.rotation.x = Math.PI / 2;
  potentialField.position.y = -0.5;
  potentialField.position.z = 0;
  potentialField.userData = { type: 'potentialField' };
  
  barrierSystem.add(potentialField);
  
  // Update potential field to show barrier
  updatePotentialField(potentialField, barrierSystem.userData);
  
  // Add left and right labels
  const createLabel = (text, x) => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 50;
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.font = 'Bold 24px Arial';
    context.fillText(text, 10, 30);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide
    });
    
    const geometry = new THREE.PlaneGeometry(2, 0.5);
    const label = new THREE.Mesh(geometry, material);
    label.position.set(x, 2, 0);
    
    return label;
  };
  
  const leftLabel = createLabel('Incident', -5);
  const rightLabel = createLabel('Tunneled', 5);
  barrierSystem.add(leftLabel);
  barrierSystem.add(rightLabel);
}

/**
 * Update the potential field visualization
 * @param {THREE.Mesh} field - The potential field mesh
 * @param {Object} params - Barrier system parameters
 */
function updatePotentialField(field, params) {
  if (!field || !field.geometry) return;
  
  const positions = field.geometry.attributes.position;
  const count = positions.count;
  
  const barrierWidth = params.barrierWidth;
  const barrierPos = params.barrierPosition;
  const potentialHeight = params.potentialHeight;
  
  for (let i = 0; i < count; i++) {
    const x = positions.getX(i);
    
    // Calculate potential at this point
    let potential = 0;
    
    // If within barrier, set to potential height
    if (Math.abs(x - barrierPos) < barrierWidth / 2) {
      potential = potentialHeight;
    }
    
    // Set y position to show potential
    positions.setY(i, potential);
  }
  
  positions.needsUpdate = true;
}

/**
 * Create particles for quantum tunneling
 * @param {number} frequency - The current frequency
 * @param {number} count - Number of particles to create
 */
function createTunnelingParticles(frequency, count) {
  // Create a container for all particles
  const particleSystem = new THREE.Group();
  particleSystem.userData = {
    type: 'tunnelingParticles',
    frequency,
    time: 0,
    particleSpeed: 0.05,
    tunnelProbability: getQuantumIntensity(frequency) * 0.6, // Higher frequencies tunnel more
    particleEnergy: 1.0 + getQuantumIntensity(frequency) * 2.0, // Higher frequencies = more energy
    particleCount: count
  };
  
  scene.add(particleSystem);
  activeObjects.push(particleSystem);
  
  // Determine particle properties based on frequency
  let geometry, size, particleColor;
  
  switch(frequency) {
    case FREQUENCIES.GROUND:
      geometry = new THREE.SphereGeometry(0.15, 8, 8);
      size = 0.15;
      particleColor = getFrequencyColor(frequency);
      break;
    case FREQUENCIES.CREATION:
      geometry = new THREE.OctahedronGeometry(0.12);
      size = 0.12;
      particleColor = getFrequencyColor(frequency);
      break;
    case FREQUENCIES.HEART:
      geometry = new THREE.TetrahedronGeometry(0.14);
      size = 0.14;
      particleColor = getFrequencyColor(frequency);
      break;
    case FREQUENCIES.VOICE:
      geometry = new THREE.DodecahedronGeometry(0.1);
      size = 0.1;
      particleColor = getFrequencyColor(frequency);
      break;
    case FREQUENCIES.VISION:
      geometry = new THREE.IcosahedronGeometry(0.09);
      size = 0.09;
      particleColor = getFrequencyColor(frequency);
      break;
    case FREQUENCIES.UNITY:
      geometry = new THREE.TorusKnotGeometry(0.08, 0.02);
      size = 0.08;
      particleColor = getFrequencyColor(frequency);
      break;
    default:
      geometry = new THREE.SphereGeometry(0.1, 16, 16);
      size = 0.1;
      particleColor = getFrequencyColor(frequency);
  }
  
  // Create multiple particles
  for (let i = 0; i < count; i++) {
    const material = new THREE.MeshPhongMaterial({
      color: particleColor,
      emissive: particleColor,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.8
    });
    
    const particle = new THREE.Mesh(geometry, material);
    
    // Position particles on the left side
    particle.position.x = -7 - Math.random() * 3;
    particle.position.y = -1 + Math.random() * 2;
    particle.position.z = -2 + Math.random() * 4;
    
    // Particle data
    particle.userData = {
      id: i,
      originalSize: size,
      velocity: new THREE.Vector3(
        particleSystem.userData.particleSpeed * (0.8 + Math.random() * 0.4),
        0,
        0
      ),
      energy: particleSystem.userData.particleEnergy * (0.9 + Math.random() * 0.2),
      tunneled: false,
      active: true,
      waveProbability: 0,
      waveAmplitude: 0
    };
    
    particleSystem.add(particle);
  }
}

/**
 * Create wave function visualization
 * @param {number} frequency - The current frequency
 * @param {number} intensity - Quantum intensity
 */
function createWaveFunctionVisualization(frequency, intensity) {
  // Create a container for wave function
  const waveSystem = new THREE.Group();
  waveSystem.userData = {
    type: 'waveFunction',
    frequency,
    intensity,
    time: 0,
    waveAmplitude: 0.5 + intensity * 0.5, // Higher frequencies have larger waves
    wavePeriod: 2.0 - intensity * 1.0 // Higher frequencies have shorter periods
  };
  
  scene.add(waveSystem);
  activeObjects.push(waveSystem);
  
  // Create wave function line
  const wavePoints = [];
  const waveSegments = 100;
  const waveWidth = 16;
  
  for (let i = 0; i < waveSegments; i++) {
    const x = -waveWidth/2 + i * (waveWidth / (waveSegments-1));
    wavePoints.push(new THREE.Vector3(x, 0, 0));
  }
  
  const waveGeometry = new THREE.BufferGeometry().setFromPoints(wavePoints);
  const waveMaterial = new THREE.LineBasicMaterial({ 
    color: getFrequencyColor(frequency),
    transparent: true,
    opacity: 0.7
  });
  
  const waveLine = new THREE.Line(waveGeometry, waveMaterial);
  waveLine.position.y = 1.5;
  waveLine.position.z = 0;
  
  waveSystem.add(waveLine);
  
  // Create wave function probability field
  const planeGeometry = new THREE.PlaneGeometry(waveWidth, 1, waveSegments-1, 1);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: getFrequencyColor(frequency),
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide
  });
  
  const waveField = new THREE.Mesh(planeGeometry, planeMaterial);
  waveField.position.y = 1;
  waveField.position.z = 0;
  
  waveSystem.add(waveField);
}

/**
 * Add controls for tunneling demo
 * @param {number} frequency - Current frequency
 */
function addTunnelControls(frequency) {
  const controlsContainer = document.getElementById('demo-controls');
  if (!controlsContainer) return;
  
  // Get barrier system and particle system
  const barrierSystem = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'barrierSystem');
    
  const particleSystem = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'tunnelingParticles');
    
  if (!barrierSystem || !particleSystem) return;
  
  // Get current values
  const barrierWidth = barrierSystem.userData.barrierWidth;
  const particleEnergy = particleSystem.userData.particleEnergy;
  
  // Barrier width controls
  const widthLabel = document.createElement('div');
  widthLabel.textContent = 'Barrier Width:';
  widthLabel.style.color = 'white';
  widthLabel.style.marginLeft = '1rem';
  
  const widthSlider = document.createElement('input');
  widthSlider.type = 'range';
  widthSlider.min = '0.5';
  widthSlider.max = '3';
  widthSlider.step = '0.1';
  widthSlider.value = barrierWidth.toString();
  
  widthSlider.addEventListener('input', (e) => {
    const newWidth = parseFloat(e.target.value);
    updateBarrierWidth(newWidth);
  });
  
  // Particle energy controls
  const energyLabel = document.createElement('div');
  energyLabel.textContent = 'Particle Energy:';
  energyLabel.style.color = 'white';
  energyLabel.style.marginLeft = '1rem';
  
  const energySlider = document.createElement('input');
  energySlider.type = 'range';
  energySlider.min = '0.5';
  energySlider.max = '3';
  energySlider.step = '0.1';
  energySlider.value = particleEnergy.toString();
  
  energySlider.addEventListener('input', (e) => {
    const newEnergy = parseFloat(e.target.value);
    updateParticleEnergy(newEnergy);
  });
  
  // Add controls
  const barrierControl = document.createElement('div');
  barrierControl.style.display = 'flex';
  barrierControl.style.alignItems = 'center';
  barrierControl.appendChild(widthLabel);
  barrierControl.appendChild(widthSlider);
  
  const energyControl = document.createElement('div');
  energyControl.style.display = 'flex';
  energyControl.style.alignItems = 'center';
  energyControl.appendChild(energyLabel);
  energyControl.appendChild(energySlider);
  
  controlsContainer.appendChild(barrierControl);
  controlsContainer.appendChild(energyControl);
  
  // Reset Button
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset Particles';
  resetButton.className = 'reset-button quantum-button';
  resetButton.style.backgroundColor = '#2196F3';
  resetButton.style.marginLeft = '1rem';
  
  resetButton.addEventListener('click', () => {
    resetTunnelingParticles();
  });
  
  controlsContainer.appendChild(resetButton);
}

/**
 * Update barrier width
 * @param {number} width - New barrier width
 */
function updateBarrierWidth(width) {
  // Get barrier system
  const barrierSystem = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'barrierSystem');
    
  if (!barrierSystem) return;
  
  // Update barrier width in userData
  barrierSystem.userData.barrierWidth = width;
  
  // Update actual barrier width
  const barrier = barrierSystem.children.find(child => 
    child.userData && child.userData.type === 'barrier');
    
  if (barrier) {
    // Recreate barrier with new width
    const newGeometry = new THREE.BoxGeometry(
      width, 
      barrierSystem.userData.barrierHeight, 
      6
    );
    
    barrier.geometry.dispose();
    barrier.geometry = newGeometry;
  }
  
  // Update potential field
  const potentialField = barrierSystem.children.find(child => 
    child.userData && child.userData.type === 'potentialField');
    
  if (potentialField) {
    updatePotentialField(potentialField, barrierSystem.userData);
  }
}

/**
 * Update particle energy
 * @param {number} energy - New particle energy
 */
function updateParticleEnergy(energy) {
  // Get particle system
  const particleSystem = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'tunnelingParticles');
    
  if (!particleSystem) return;
  
  // Update particle energy in userData
  particleSystem.userData.particleEnergy = energy;
  
  // Update energy for each particle
  particleSystem.children.forEach(particle => {
    particle.userData.energy = energy * (0.9 + Math.random() * 0.2);
    
    // Adjust particle color based on energy
    let energyColor;
    if (energy < 1.0) {
      // Low energy - cooler color
      energyColor = new THREE.Color(0x3f51b5);
    } else if (energy < 2.0) {
      // Medium energy - current frequency color
      energyColor = new THREE.Color(getFrequencyColor(currentFrequency));
    } else {
      // High energy - hotter color
      energyColor = new THREE.Color(0xff5722);
    }
    
    // Update particle color
    particle.material.color = energyColor;
    particle.material.emissive = energyColor;
  });
}

/**
 * Reset tunneling particles
 */
function resetTunnelingParticles() {
  // Get particle system
  const particleSystem = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'tunnelingParticles');
    
  if (!particleSystem) return;
  
  // Reset particles
  particleSystem.children.forEach(particle => {
    // Reset position to left side
    particle.position.x = -7 - Math.random() * 3;
    particle.position.y = -1 + Math.random() * 2;
    particle.position.z = -2 + Math.random() * 4;
    
    // Reset particle data
    particle.userData.tunneled = false;
    particle.userData.active = true;
    particle.userData.waveProbability = 0;
    particle.userData.waveAmplitude = 0;
    
    // Reset opacity
    particle.material.opacity = 0.8;
  });
}

/**
 * Update the Quantum Tunneling Demo per frame
 */
function updateTunnelingDemo() {
  // Update TWEEN animations
  if (TWEEN) TWEEN.update();
  
  // Get barrier system
  const barrierSystem = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'barrierSystem');
    
  // Get particle system
  const particleSystem = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'tunnelingParticles');
    
  // Get wave function system
  const waveSystem = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'waveFunction');
    
  if (!barrierSystem || !particleSystem || !waveSystem) return;
  
  // Update time
  barrierSystem.userData.time += 0.01;
  particleSystem.userData.time += 0.01;
  waveSystem.userData.time += 0.01;
  
  // Get barrier parameters
  const barrierWidth = barrierSystem.userData.barrierWidth;
  const barrierPos = barrierSystem.userData.barrierPosition;
  const potentialHeight = barrierSystem.userData.potentialHeight;
  
  // Get particle parameters
  const tunnelProbability = particleSystem.userData.tunnelProbability;
  const particleEnergy = particleSystem.userData.particleEnergy;
  
  // Get barrier mesh
  const barrier = barrierSystem.children.find(child => 
    child.userData && child.userData.type === 'barrier');
    
  // Calculate threshold distance for tunneling
  const tunnelThreshold = barrierWidth / 2;
  
  // Update particles
  particleSystem.children.forEach(particle => {
    if (!particle.userData.active) return;
    
    // Current particle properties
    const pos = particle.position;
    const vel = particle.userData.velocity;
    const energy = particle.userData.energy;
    
    // Calculate distance to barrier center
    const distToBarrier = Math.abs(pos.x - barrierPos);
    
    // If particle is approaching the barrier from the left
    if (pos.x < barrierPos && !particle.userData.tunneled) {
      // Move particle
      pos.x += vel.x;
      
      // If particle is at the barrier
      if (distToBarrier <= tunnelThreshold) {
        // Calculate tunneling probability based on:
        // - Barrier width (thicker = less tunneling)
        // - Particle energy (higher = more tunneling)
        // - Current frequency (higher = more tunneling)
        
        // Simplified quantum tunneling probability equation
        const energyRatio = energy / potentialHeight;
        const widthFactor = barrierWidth * 2;
        
        // Base probability affected by frequency-dependent tunnelProbability
        let probability = Math.exp(-widthFactor * Math.sqrt(1 - energyRatio)) * tunnelProbability;
        
        // Ensure probability is between 0 and 1
        probability = Math.max(0, Math.min(1, probability));
        
        // Store for wave function visualization
        particle.userData.waveProbability = probability;
        
        // For particles with energy greater than potential, always tunnel
        if (energy > potentialHeight) {
          probability = 1;
        }
        
        // Determine if particle tunnels
        if (Math.random() < probability) {
          // Tunnel through - move to other side
          pos.x = barrierPos + tunnelThreshold + 0.1;
          particle.userData.tunneled = true;
          
          // Special effects for tunneled particles
          new TWEEN.Tween(particle.material)
            .to({
              emissiveIntensity: 0.8,
              opacity: 1.0
            }, 500)
            .easing(TWEEN.Easing.Cubic.Out)
            .start();
            
          // Scale up slightly
          new TWEEN.Tween(particle.scale)
            .to({
              x: 1.2,
              y: 1.2,
              z: 1.2
            }, 300)
            .easing(TWEEN.Easing.Back.Out)
            .start();
        } else {
          // Reflect back - reverse velocity
          vel.x = -vel.x;
          
          // Dim particle slightly to show reflection
          new TWEEN.Tween(particle.material)
            .to({
              emissiveIntensity: 0.3,
              opacity: 0.6
            }, 500)
            .easing(TWEEN.Easing.Cubic.Out)
            .start();
        }
      }
    }
    // If particle has already tunneled or is on the right side
    else {
      // Continue moving
      pos.x += vel.x;
      
      // If particle is out of view, deactivate
      if (pos.x > 8 || pos.x < -8) {
        particle.userData.active = false;
        
        // Fade out
        new TWEEN.Tween(particle.material)
          .to({
            opacity: 0
          }, 500)
          .easing(TWEEN.Easing.Cubic.Out)
          .start();
      }
    }
    
    // Particle wave behavior - more pronounced at higher frequencies
    particle.userData.waveAmplitude = (particle.userData.tunneled ? 0.3 : 0.1) * 
                                      getQuantumIntensity(currentFrequency);
                                      
    // Apply wave motion to y position
    if (particle.userData.waveAmplitude > 0) {
      particle.position.y += Math.sin(particleSystem.userData.time * 5) * 
                           particle.userData.waveAmplitude * 0.1;
    }
    
    // Rotate particle
    particle.rotation.x += 0.02;
    particle.rotation.y += 0.02;
  });
  
  // Update wave function visualization
  if (waveSystem.children.length >= 2) {
    const waveLine = waveSystem.children[0];
    const waveField = waveSystem.children[1];
    
    if (waveLine && waveLine.geometry && waveField && waveField.geometry) {
      const linePositions = waveLine.geometry.attributes.position;
      const fieldPositions = waveField.geometry.attributes.position;
      
      // Calculate wave parameters
      const time = waveSystem.userData.time;
      const amplitude = waveSystem.userData.waveAmplitude;
      const period = waveSystem.userData.wavePeriod;
      
      // Update line and field geometries
      for (let i = 0; i < linePositions.count; i++) {
        const x = linePositions.getX(i);
        
        // Calculate wave height - more complex for higher frequencies
        let y = 0;
        
        // Ground state: simple sine wave
        if (currentFrequency === FREQUENCIES.GROUND) {
          y = amplitude * Math.sin(x * 2 + time * 3);
        }
        // Creation state: amplitude modulated wave
        else if (currentFrequency === FREQUENCIES.CREATION) {
          y = amplitude * Math.sin(x * 3 + time * 3) * Math.sin(x * 0.5 + time);
        }
        // Heart state: pulsing amplitude
        else if (currentFrequency === FREQUENCIES.HEART) {
          y = amplitude * Math.sin(x * 3 + time * 3) * (0.5 + 0.5 * Math.sin(time * 2));
        }
        // Voice state: complex harmonics
        else if (currentFrequency === FREQUENCIES.VOICE) {
          y = amplitude * (
            0.6 * Math.sin(x * 3 + time * 3) + 
            0.3 * Math.sin(x * 6 + time * 6) +
            0.1 * Math.sin(x * 9 + time * 9)
          );
        }
        // Vision state: complex phase shifts
        else if (currentFrequency === FREQUENCIES.VISION) {
          y = amplitude * Math.sin(x * 4 + time * 4 + Math.sin(time));
        }
        // Unity state: multiple interacting frequencies
        else if (currentFrequency === FREQUENCIES.UNITY) {
          y = amplitude * (
            0.4 * Math.sin(x * 2 + time * 2) + 
            0.4 * Math.sin(x * 3 + time * 3) +
            0.2 * Math.sin(x * 5 + time * 5)
          );
        }
        
        // Barrier effect - wave attenuates through barrier
        const distToBarrier = Math.abs(x - barrierPos);
        if (distToBarrier < barrierWidth / 2) {
          // Calculate attenuation based on energy/potential ratio
          const energyRatio = particleEnergy / potentialHeight;
          const attenuation = Math.exp(-barrierWidth * (1 - energyRatio) * 2);
          
          // Attenuate amplitude in barrier
          y *= attenuation;
        }
        
        // Apply height to geometry
        linePositions.setY(i, y);
        
        // Update field geometry (at same x position)
        // Use absolute value of wave for probability field
        if (i < fieldPositions.count) {
          fieldPositions.setY(i, Math.abs(y) * 0.5);
        }
      }
      
      linePositions.needsUpdate = true;
      fieldPositions.needsUpdate = true;
    }
  }
}

/**
 * Update demo when frequency changes
 * @param {number} oldFrequency - Previous frequency
 * @param {number} newFrequency - New frequency
 */
function updateTunnelingFrequency(oldFrequency, newFrequency) {
  console.log(`Updating tunneling demo from ${oldFrequency} to ${newFrequency} Hz`);
  
  // Re-initialize with new frequency
  initTunnelingDemo(newFrequency);
}

// Export functions
window.initTunnelingDemo = initTunnelingDemo;
window.updateTunnelingDemo = updateTunnelingDemo;
window.updateTunnelingFrequency = updateTunnelingFrequency;
