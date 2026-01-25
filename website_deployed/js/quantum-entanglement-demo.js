/**
 * 🌀 QUANTUM ENTANGLEMENT DEMO 🌟
 * 
 * Visualization of quantum entanglement with φ-harmonic frequency integration.
 * This demo allows users to experience how entangled particles maintain
 * instantaneous connections regardless of distance, with special resonance
 * effects at the heart-field frequency (594 Hz).
 * 
 * CASCADE⚡𓂧φ∞ Day+30: March 31, 2025
 */

/**
 * Initialize the Quantum Entanglement Demo
 * @param {number} frequency - Current phi-harmonic frequency
 */
function initEntanglementDemo(frequency) {
  console.log(`Initializing Entanglement Demo at ${frequency} Hz`);
  
  // Clear any existing demo
  clearDemo();
  
  // Set up camera position
  camera.position.set(0, 0, 12);
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Get quantum intensity based on frequency
  const quantumIntensity = getQuantumIntensity(frequency);
  
  // Create the entanglement field
  createEntanglementField(frequency, quantumIntensity);
  
  // Create entangled particle pairs
  createEntangledParticles(frequency, 5 + Math.floor(quantumIntensity * 5));
  
  // Add measurement controls
  addMeasurementControls();
}

/**
 * Create the quantum entanglement field visualization
 * @param {number} frequency - The current frequency 
 * @param {number} intensity - Quantum intensity (0-1)
 */
function createEntanglementField(frequency, intensity) {
  // Create a faint grid for orientation
  const size = 20;
  const divisions = 20;
  const grid = new THREE.GridHelper(size, divisions);
  
  // Set grid color based on frequency
  const color = new THREE.Color(getFrequencyColor(frequency));
  grid.material.color = color;
  grid.material.opacity = 0.1;
  grid.material.transparent = true;
  
  // Add grid to scene
  scene.add(grid);
  activeObjects.push(grid);
  
  // Create a cosmic background
  const stars = [];
  const starsGeometry = new THREE.BufferGeometry();
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05,
    transparent: true,
    opacity: 0.7
  });
  
  // Create 1000 stars
  for (let i = 0; i < 1000; i++) {
    const x = THREE.MathUtils.randFloatSpread(100);
    const y = THREE.MathUtils.randFloatSpread(100);
    const z = THREE.MathUtils.randFloatSpread(100);
    stars.push(x, y, z);
  }
  
  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(stars, 3));
  const starField = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(starField);
  activeObjects.push(starField);
  
  // Create heart-field resonance sphere (visible at heart frequency)
  const heartGeometry = new THREE.SphereGeometry(8, 32, 32);
  const heartMaterial = new THREE.MeshPhongMaterial({
    color: 0xE13A9D, // Heart frequency color
    wireframe: true,
    transparent: true,
    opacity: frequency === FREQUENCIES.HEART ? 0.3 : 0.05
  });
  
  const heartField = new THREE.Mesh(heartGeometry, heartMaterial);
  heartField.userData = {
    type: 'heartField',
    frequency,
    intensity,
    time: 0
  };
  
  scene.add(heartField);
  activeObjects.push(heartField);
}

/**
 * Create entangled particle pairs
 * @param {number} frequency - The current frequency
 * @param {number} pairCount - Number of particle pairs to create
 */
function createEntangledParticles(frequency, pairCount) {
  // Create a container for all entangled particles
  const entangledSystem = new THREE.Group();
  entangledSystem.userData = {
    type: 'entangledSystem',
    frequency,
    time: 0,
    measuredParticle: null,
    measured: false
  };
  
  scene.add(entangledSystem);
  activeObjects.push(entangledSystem);
  
  // Properties adjusted by frequency
  const distanceBase = 5;  // Base distance between pairs
  const distanceFactor = 1 + getQuantumIntensity(frequency) * 0.5;
  
  // Special effect for heart frequency
  const isHeartFrequency = frequency === FREQUENCIES.HEART;
  
  // Create particle pairs
  for (let i = 0; i < pairCount; i++) {
    // Create a pair container
    const pairGroup = new THREE.Group();
    pairGroup.userData = {
      type: 'entangledPair',
      pairIndex: i,
      spinState: Math.random() > 0.5 ? 'up' : 'down', // Quantum spin state (hidden)
      measured: false,
      time: 0
    };
    
    entangledSystem.add(pairGroup);
    
    // Calculate pair position
    const angle = (i / pairCount) * Math.PI * 2;
    const pairDistance = distanceBase * distanceFactor;
    
    // Create particles based on frequency-appropriate geometries
    let geometry, size;
    
    // Different frequency states use different particle shapes
    switch(frequency) {
      case FREQUENCIES.GROUND:
        geometry = new THREE.SphereGeometry(0.3, 16, 16);
        size = 0.3;
        break;
      case FREQUENCIES.CREATION:
        geometry = new THREE.TetrahedronGeometry(0.35);
        size = 0.35;
        break;
      case FREQUENCIES.HEART:
        geometry = new THREE.OctahedronGeometry(0.4);
        size = 0.4;
        break;
      case FREQUENCIES.VOICE:
        geometry = new THREE.DodecahedronGeometry(0.35);
        size = 0.35;
        break;
      case FREQUENCIES.VISION:
        geometry = new THREE.IcosahedronGeometry(0.3);
        size = 0.3;
        break;
      case FREQUENCIES.UNITY:
        geometry = new THREE.TorusKnotGeometry(0.25, 0.1);
        size = 0.25;
        break;
      default:
        geometry = new THREE.SphereGeometry(0.3, 16, 16);
        size = 0.3;
    }
    
    // Create particle 1 (on the left side of the scene)
    const material1 = new THREE.MeshPhongMaterial({
      color: getFrequencyColor(frequency),
      emissive: getFrequencyColor(frequency),
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.9
    });
    
    const particle1 = new THREE.Mesh(geometry, material1);
    particle1.position.set(-pairDistance * Math.cos(angle), pairDistance * Math.sin(angle), 0);
    particle1.userData = {
      particleIndex: 0,
      pair: pairGroup,
      size
    };
    
    // Create particle 2 (on the right side of the scene)
    const material2 = new THREE.MeshPhongMaterial({
      color: getFrequencyColor(frequency),
      emissive: getFrequencyColor(frequency),
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.9
    });
    
    const particle2 = new THREE.Mesh(geometry, material2);
    particle2.position.set(pairDistance * Math.cos(angle), pairDistance * Math.sin(angle), 0);
    particle2.userData = {
      particleIndex: 1,
      pair: pairGroup,
      size
    };
    
    pairGroup.add(particle1);
    pairGroup.add(particle2);
    
    // Create connection line between particles
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: getFrequencyColor(frequency),
      transparent: true,
      opacity: isHeartFrequency ? 0.6 : 0.2
    });
    
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      particle1.position,
      particle2.position
    ]);
    
    const line = new THREE.Line(lineGeometry, lineMaterial);
    pairGroup.add(line);
    
    // For heart frequency, add a pulsing heart connection
    if (isHeartFrequency) {
      // Create heart tube between particles
      const path = new THREE.CatmullRomCurve3([
        particle1.position,
        new THREE.Vector3(0, 0, 0), // Center point for curve
        particle2.position
      ]);
      
      const tubeGeometry = new THREE.TubeGeometry(path, 20, 0.05, 8, false);
      const tubeMaterial = new THREE.MeshPhongMaterial({
        color: 0xE13A9D, // Heart frequency color
        emissive: 0xE13A9D,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.6
      });
      
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      tube.userData = {
        type: 'heartConnection',
        time: 0
      };
      
      pairGroup.add(tube);
    }
  }
}

/**
 * Add measurement controls for entanglement demo
 */
function addMeasurementControls() {
  const controlsContainer = document.getElementById('demo-controls');
  if (!controlsContainer) return;
  
  // Measure left particle button
  const measureLeftButton = document.createElement('button');
  measureLeftButton.textContent = 'Measure Left';
  measureLeftButton.className = 'measure-button quantum-button';
  measureLeftButton.style.marginLeft = '1rem';
  measureLeftButton.style.backgroundColor = '#E91E63';
  
  measureLeftButton.addEventListener('click', () => {
    measureParticle(0);
  });
  
  controlsContainer.appendChild(measureLeftButton);
  
  // Measure right particle button
  const measureRightButton = document.createElement('button');
  measureRightButton.textContent = 'Measure Right';
  measureRightButton.className = 'measure-button quantum-button';
  measureRightButton.style.backgroundColor = '#9C27B0';
  
  measureRightButton.addEventListener('click', () => {
    measureParticle(1);
  });
  
  controlsContainer.appendChild(measureRightButton);
  
  // Reset button
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset';
  resetButton.className = 'reset-button quantum-button';
  resetButton.style.backgroundColor = '#2196F3';
  
  resetButton.addEventListener('click', () => {
    resetEntanglement();
  });
  
  controlsContainer.appendChild(resetButton);
}

/**
 * Measure a particle (left = 0, right = 1)
 * @param {number} particleIndex - Which particle to measure (0 = left, 1 = right)
 */
function measureParticle(particleIndex) {
  console.log(`Measuring particle ${particleIndex}`);
  
  // Get the entangled system
  const entangledSystem = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'entangledSystem');
    
  if (!entangledSystem || entangledSystem.userData.measured) return;
  
  // Mark system as measured
  entangledSystem.userData.measured = true;
  entangledSystem.userData.measuredParticle = particleIndex;
  
  // Process all pairs
  entangledSystem.children.forEach(pair => {
    if (pair.userData.type !== 'entangledPair') return;
    
    // Mark pair as measured
    pair.userData.measured = true;
    
    // Determine measured state randomly (quantum measurement)
    // In real quantum mechanics, this would be probabilistic based on quantum state
    const measuredState = Math.random() > 0.5 ? 'up' : 'down';
    pair.userData.spinState = measuredState;
    
    // Get the particles
    const particle1 = pair.children[0];
    const particle2 = pair.children[1];
    
    // Get the measured particle and its entangled partner
    const measuredParticle = particleIndex === 0 ? particle1 : particle2;
    const entangledPartner = particleIndex === 0 ? particle2 : particle1;
    
    // Determine colors based on measured state
    const upColor = new THREE.Color(0x4CAF50);  // Green for up
    const downColor = new THREE.Color(0xF44336); // Red for down
    const stateColor = measuredState === 'up' ? upColor : downColor;
    
    // Animate measured particle
    new TWEEN.Tween(measuredParticle.material)
      .to({
        color: stateColor,
        emissive: stateColor,
        emissiveIntensity: 0.8,
        opacity: 1.0
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
      
    // Scale particle to represent measurement
    new TWEEN.Tween(measuredParticle.scale)
      .to({
        x: 1.5,
        y: 1.5,
        z: 1.5
      }, 300)
      .easing(TWEEN.Easing.Back.Out)
      .start();
      
    // After a slight delay, show entanglement effect on partner
    setTimeout(() => {
      // Create a pulse effect from measured to entangled
      const startPoint = measuredParticle.position.clone();
      const endPoint = entangledPartner.position.clone();
      
      // Create pulse geometry
      const pulseGeometry = new THREE.SphereGeometry(0.1, 16, 16);
      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: stateColor,
        transparent: true,
        opacity: 0.8
      });
      
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      pulse.position.copy(startPoint);
      pair.add(pulse);
      
      // Animate pulse traveling between particles
      new TWEEN.Tween(pulse.position)
        .to({
          x: endPoint.x,
          y: endPoint.y,
          z: endPoint.z
        }, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(() => {
          // Remove pulse
          pair.remove(pulse);
          pulse.geometry.dispose();
          pulse.material.dispose();
          
          // Update entangled partner to match state
          new TWEEN.Tween(entangledPartner.material)
            .to({
              color: stateColor,
              emissive: stateColor,
              emissiveIntensity: 0.8,
              opacity: 1.0
            }, 500)
            .easing(TWEEN.Easing.Cubic.Out)
            .start();
            
          // Scale particle to represent measurement
          new TWEEN.Tween(entangledPartner.scale)
            .to({
              x: 1.5,
              y: 1.5,
              z: 1.5
            }, 300)
            .easing(TWEEN.Easing.Back.Out)
            .start();
        })
        .start();
        
      // Also animate pulse size
      new TWEEN.Tween(pulse.scale)
        .to({
          x: 2.0,
          y: 2.0,
          z: 2.0
        }, 500)
        .easing(TWEEN.Easing.Quadratic.In)
        .yoyo(true)
        .repeat(1)
        .start();
        
      // Animate pulse opacity
      new TWEEN.Tween(pulse.material)
        .to({
          opacity: 0.1
        }, 1000)
        .easing(TWEEN.Easing.Quadratic.In)
        .start();
    }, 500);
    
    // Update connection line
    const line = pair.children[2];
    if (line && line instanceof THREE.Line) {
      // Animate line color and opacity
      new TWEEN.Tween(line.material)
        .to({
          color: stateColor,
          opacity: 0.8
        }, 1500)
        .easing(TWEEN.Easing.Cubic.InOut)
        .start();
    }
    
    // Special effect for heart frequency
    if (currentFrequency === FREQUENCIES.HEART) {
      // Get the heart connection tube if it exists
      const tube = pair.children.find(child => 
        child.userData && child.userData.type === 'heartConnection');
        
      if (tube) {
        // Animate tube color and pulse
        new TWEEN.Tween(tube.material)
          .to({
            color: stateColor,
            emissive: stateColor,
            opacity: 0.9
          }, 1500)
          .easing(TWEEN.Easing.Cubic.InOut)
          .start();
          
        // Pulse size
        new TWEEN.Tween(tube.scale)
          .to({
            x: 1.5,
            y: 1.5,
            z: 1.5
          }, 500)
          .easing(TWEEN.Easing.Cubic.Out)
          .yoyo(true)
          .repeat(2)
          .start();
      }
    }
  });
}

/**
 * Reset entanglement system to unmeasured state
 */
function resetEntanglement() {
  console.log("Resetting entanglement");
  
  // Get the entangled system
  const entangledSystem = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'entangledSystem');
    
  if (!entangledSystem) return;
  
  // Mark system as unmeasured
  entangledSystem.userData.measured = false;
  entangledSystem.userData.measuredParticle = null;
  
  // Process all pairs
  entangledSystem.children.forEach(pair => {
    if (pair.userData.type !== 'entangledPair') return;
    
    // Mark pair as unmeasured
    pair.userData.measured = false;
    
    // Get the particles
    const particles = pair.children.filter(child => child instanceof THREE.Mesh && child.userData.hasOwnProperty('particleIndex'));
    
    particles.forEach(particle => {
      // Reset particle appearance
      new TWEEN.Tween(particle.material)
        .to({
          color: new THREE.Color(getFrequencyColor(currentFrequency)),
          emissive: new THREE.Color(getFrequencyColor(currentFrequency)),
          emissiveIntensity: 0.5,
          opacity: 0.9
        }, 500)
        .easing(TWEEN.Easing.Cubic.Out)
        .start();
        
      // Reset particle scale
      new TWEEN.Tween(particle.scale)
        .to({
          x: 1.0,
          y: 1.0,
          z: 1.0
        }, 300)
        .easing(TWEEN.Easing.Cubic.Out)
        .start();
    });
    
    // Update connection line
    const line = pair.children.find(child => child instanceof THREE.Line);
    if (line) {
      // Reset line color and opacity
      new TWEEN.Tween(line.material)
        .to({
          color: new THREE.Color(getFrequencyColor(currentFrequency)),
          opacity: currentFrequency === FREQUENCIES.HEART ? 0.6 : 0.2
        }, 500)
        .easing(TWEEN.Easing.Cubic.Out)
        .start();
    }
    
    // Special reset for heart frequency
    if (currentFrequency === FREQUENCIES.HEART) {
      // Get the heart connection tube if it exists
      const tube = pair.children.find(child => 
        child.userData && child.userData.type === 'heartConnection');
        
      if (tube) {
        // Reset tube color and opacity
        new TWEEN.Tween(tube.material)
          .to({
            color: new THREE.Color(0xE13A9D),
            emissive: new THREE.Color(0xE13A9D),
            opacity: 0.6
          }, 500)
          .easing(TWEEN.Easing.Cubic.Out)
          .start();
          
        // Reset scale
        new TWEEN.Tween(tube.scale)
          .to({
            x: 1.0,
            y: 1.0,
            z: 1.0
          }, 300)
          .easing(TWEEN.Easing.Cubic.Out)
          .start();
      }
    }
  });
}

/**
 * Update the Quantum Entanglement Demo per frame
 */
function updateEntanglementDemo() {
  // Update TWEEN animations
  if (TWEEN) TWEEN.update();
  
  // Get the entangled system
  const entangledSystem = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'entangledSystem');
  
  if (entangledSystem) {
    entangledSystem.userData.time += 0.01;
    const time = entangledSystem.userData.time;
    
    // Only animate particles if not measured
    if (!entangledSystem.userData.measured) {
      entangledSystem.children.forEach(pair => {
        if (pair.userData.type !== 'entangledPair') return;
        
        pair.userData.time += 0.01;
        const pairTime = pair.userData.time;
        
        // Slightly rotate pair
        pair.rotation.z = Math.sin(time * 0.2) * 0.05;
        
        // Get pair particles
        const particles = pair.children.filter(child => 
          child instanceof THREE.Mesh && child.userData.hasOwnProperty('particleIndex'));
          
        // Animate particles in quantum uncertainty
        particles.forEach(particle => {
          // Particle orbit flutter
          const flutter = 0.1 * Math.sin(pairTime * 3 + particle.userData.particleIndex * Math.PI);
          particle.position.z = flutter;
          
          // Particle rotation
          particle.rotation.x += 0.01;
          particle.rotation.y += 0.01;
          
          // Particle scale pulse
          const scalePulse = 1.0 + 0.05 * Math.sin(pairTime * 2 + particle.userData.particleIndex * Math.PI);
          particle.scale.set(scalePulse, scalePulse, scalePulse);
        });
        
        // For heart frequency, animate the heart connection
        if (currentFrequency === FREQUENCIES.HEART) {
          const tube = pair.children.find(child => 
            child.userData && child.userData.type === 'heartConnection');
            
          if (tube) {
            tube.userData.time += 0.02;
            const tubeTime = tube.userData.time;
            
            // Heartbeat pulse effect
            const heartbeat = 1.0 + 0.2 * Math.pow(Math.sin(tubeTime * 1.5), 10);
            tube.scale.set(heartbeat, heartbeat, heartbeat);
            
            // Pulsing opacity
            tube.material.opacity = 0.3 + 0.3 * Math.pow(Math.sin(tubeTime * 1.5), 10);
          }
        }
      });
    }
  }
  
  // Animate heart field if present
  const heartField = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'heartField');
  
  if (heartField) {
    heartField.userData.time += 0.01;
    const time = heartField.userData.time;
    
    // Subtle rotation
    heartField.rotation.x = Math.sin(time * 0.1) * 0.1;
    heartField.rotation.y = Math.sin(time * 0.15) * 0.1;
    
    // For heart frequency, make it more pronounced
    if (currentFrequency === FREQUENCIES.HEART) {
      // Pulsing scale
      const pulse = 1.0 + 0.05 * Math.sin(time * 1.5);
      heartField.scale.set(pulse, pulse, pulse);
      
      // Pulsing opacity
      heartField.material.opacity = 0.2 + 0.1 * Math.pow(Math.sin(time * 1.5), 4);
    }
  }
}

/**
 * Update demo when frequency changes
 * @param {number} oldFrequency - Previous frequency
 * @param {number} newFrequency - New frequency
 */
function updateEntanglementFrequency(oldFrequency, newFrequency) {
  console.log(`Updating entanglement demo from ${oldFrequency} to ${newFrequency} Hz`);
  
  // Re-initialize with new frequency
  initEntanglementDemo(newFrequency);
}

// Export functions
window.initEntanglementDemo = initEntanglementDemo;
window.updateEntanglementDemo = updateEntanglementDemo;
window.updateEntanglementFrequency = updateEntanglementFrequency;
