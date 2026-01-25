/**
 * 🌀 MYCELIAL PATTERN RECOGNITION DEMO 🌟
 * 
 * Visualization of nature's quantum communication network through
 * mycelial consciousness patterns at the Ground State frequency (432 Hz).
 * 
 * This demo connects with the Visual/Intuitive channel of the RootWIZ system.
 * 
 * CASCADE⚡𓂧φ∞ Day+30: March 31, 2025
 */

/**
 * Initialize the Mycelial Pattern Demo
 * @param {number} frequency - Current phi-harmonic frequency
 */
function initMycelialDemo(frequency) {
  console.log(`Initializing Mycelial Pattern Demo at ${frequency} Hz`);
  
  // Clear any existing demo
  clearDemo();
  
  // Set up camera position
  camera.position.set(0, 5, 10);
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Get quantum intensity based on frequency
  const quantumIntensity = getQuantumIntensity(frequency);
  
  // Create ground plane
  createGroundPlane(frequency);
  
  // Create mycelial network
  createMycelialNetwork(frequency, quantumIntensity);
  
  // Add interaction controls
  addMycelialControls();
}

/**
 * Create ground plane for mycelial network
 * @param {number} frequency - Current frequency
 */
function createGroundPlane(frequency) {
  // Create a natural ground
  const groundGeometry = new THREE.PlaneGeometry(20, 20, 50, 50);
  
  // Create an earthy material based on frequency
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: frequency === FREQUENCIES.GROUND ? 0x51B14F : 0x654321,
    roughness: 0.8,
    metalness: 0.1,
    wireframe: false
  });
  
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1;
  ground.userData = {
    type: 'ground',
    frequency
  };
  
  scene.add(ground);
  activeObjects.push(ground);
  
  // Add subtle terrain to ground
  const positions = ground.geometry.attributes.position;
  const count = positions.count;
  
  for (let i = 0; i < count; i++) {
    const x = positions.getX(i);
    const z = positions.getZ(i);
    
    // Create subtle natural terrain
    const height = 0.2 * Math.sin(x * 0.5) * Math.cos(z * 0.5) +
                  0.1 * Math.sin(x * 1.0 + 0.5) * Math.cos(z * 1.0 + 0.5);
    
    positions.setY(i, height);
  }
  
  ground.geometry.computeVertexNormals();
  positions.needsUpdate = true;
}

/**
 * Create mycelial network
 * @param {number} frequency - Current frequency
 * @param {number} intensity - Quantum intensity (0-1)
 */
function createMycelialNetwork(frequency, intensity) {
  // Create mycelial system container
  const mycelialSystem = new THREE.Group();
  mycelialSystem.userData = {
    type: 'mycelialSystem',
    frequency,
    intensity,
    time: 0,
    growthRate: 0.02 + intensity * 0.03,
    maxConnections: 5 + Math.floor(intensity * 10),
    connectionDistance: 3 + intensity * 2,
    connectionThreshold: 0.6 - intensity * 0.3, // Lower threshold = more connections
    activeNodes: [],
    growthComplete: false
  };
  
  scene.add(mycelialSystem);
  activeObjects.push(mycelialSystem);
  
  // Create initial nodes
  const initialNodeCount = 3 + Math.floor(intensity * 5);
  
  for (let i = 0; i < initialNodeCount; i++) {
    // Random position on ground
    const x = (Math.random() - 0.5) * 16;
    const z = (Math.random() - 0.5) * 16;
    
    createMycelialNode(mycelialSystem, x, z, 1.0, true);
  }
  
  // Create mycelium energy field
  createMyceliumField(frequency, intensity);
}

/**
 * Create a mycelial node
 * @param {THREE.Group} system - The mycelial system
 * @param {number} x - X position
 * @param {number} z - Z position
 * @param {number} size - Node size
 * @param {boolean} isRoot - Whether this is a root node
 * @returns {THREE.Object3D} The created node
 */
function createMycelialNode(system, x, z, size, isRoot = false) {
  // Calculate y position based on ground height
  const y = 0;
  
  // Create node geometry based on frequency
  let geometry;
  let nodeSize = size * (0.3 + Math.random() * 0.2);
  const frequency = system.userData.frequency;
  
  // Different node shapes for different frequencies
  switch(frequency) {
    case FREQUENCIES.GROUND:
      geometry = new THREE.SphereGeometry(nodeSize, 8, 8);
      break;
    case FREQUENCIES.CREATION:
      geometry = new THREE.OctahedronGeometry(nodeSize);
      break;
    case FREQUENCIES.HEART:
      geometry = new THREE.IcosahedronGeometry(nodeSize, 0);
      break;
    case FREQUENCIES.VOICE:
      geometry = new THREE.TetrahedronGeometry(nodeSize);
      break;
    case FREQUENCIES.VISION:
      geometry = new THREE.DodecahedronGeometry(nodeSize);
      break;
    case FREQUENCIES.UNITY:
      geometry = new THREE.TorusKnotGeometry(nodeSize * 0.8, nodeSize * 0.3, 16, 8);
      break;
    default:
      geometry = new THREE.SphereGeometry(nodeSize, 8, 8);
  }
  
  // Create node material
  const nodeMaterial = new THREE.MeshPhongMaterial({
    color: getFrequencyColor(frequency),
    emissive: getFrequencyColor(frequency),
    emissiveIntensity: isRoot ? 0.7 : 0.4,
    transparent: true,
    opacity: isRoot ? 0.9 : 0.7
  });
  
  // Create node mesh
  const node = new THREE.Mesh(geometry, nodeMaterial);
  node.position.set(x, y, z);
  
  // Node metadata
  node.userData = {
    type: 'mycelialNode',
    isRoot,
    size: nodeSize,
    energy: isRoot ? 1.0 : 0.7,
    connections: [],
    growth: 0,
    maxConnections: Math.floor(3 + Math.random() * system.userData.maxConnections),
    pulsing: true,
    active: true
  };
  
  // Add to system
  system.add(node);
  
  // Track active nodes
  system.userData.activeNodes.push(node);
  
  return node;
}

/**
 * Create mycelium energy field
 * @param {number} frequency - Current frequency
 * @param {number} intensity - Quantum intensity
 */
function createMyceliumField(frequency, intensity) {
  // Create particle system for mycelial field
  const particleCount = 1000 + Math.floor(intensity * 2000);
  const particles = new THREE.BufferGeometry();
  
  // Create particle positions
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  
  // Field color based on frequency
  const fieldColor = new THREE.Color(getFrequencyColor(frequency));
  
  // Generate random particles in a dome shape above ground
  for (let i = 0; i < particleCount; i++) {
    // Random angles for sphere distribution
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI / 2; // Half sphere (dome)
    
    // Random radius
    const radius = 8 * Math.pow(Math.random(), 0.5);
    
    // Convert to cartesian coordinates
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = Math.abs(radius * Math.cos(phi)); // Keep y positive (above ground)
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    // Set positions
    positions[i * 3] = x;
    positions[i * 3 + 1] = y - 0.5; // Adjust to start from ground
    positions[i * 3 + 2] = z;
    
    // Set colors with slight variations
    colors[i * 3] = fieldColor.r * (0.8 + Math.random() * 0.4);
    colors[i * 3 + 1] = fieldColor.g * (0.8 + Math.random() * 0.4);
    colors[i * 3 + 2] = fieldColor.b * (0.8 + Math.random() * 0.4);
    
    // Random sizes - smaller for more natural look
    sizes[i] = 0.03 + Math.random() * 0.05;
  }
  
  // Set attributes
  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  
  // Create material
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.4,
    depthWrite: false
  });
  
  // Create particle system
  const particleSystem = new THREE.Points(particles, particleMaterial);
  particleSystem.userData = {
    type: 'myceliumField',
    frequency,
    intensity,
    time: 0
  };
  
  scene.add(particleSystem);
  activeObjects.push(particleSystem);
}

/**
 * Create a connection between two mycelial nodes
 * @param {THREE.Group} system - The mycelial system
 * @param {THREE.Object3D} source - Source node
 * @param {THREE.Object3D} target - Target node
 */
function createMycelialConnection(system, source, target) {
  // Don't connect if already connected
  if (source.userData.connections.includes(target) || 
      target.userData.connections.includes(source)) {
    return null;
  }
  
  // Create curve for natural mycelial growth
  const midPoint = new THREE.Vector3(
    (source.position.x + target.position.x) / 2,
    (source.position.y + target.position.y) / 2 + (Math.random() * 0.5),
    (source.position.z + target.position.z) / 2
  );
  
  const curve = new THREE.QuadraticBezierCurve3(
    source.position.clone(),
    midPoint,
    target.position.clone()
  );
  
  // Create tube geometry along curve
  const tubeGeometry = new THREE.TubeGeometry(
    curve, 
    8,                                // tubular segments
    0.03 + Math.random() * 0.04,      // tube radius
    4,                                // radial segments
    false                             // closed
  );
  
  // Create material based on frequency
  const tubeMaterial = new THREE.MeshPhongMaterial({
    color: getFrequencyColor(system.userData.frequency),
    emissive: getFrequencyColor(system.userData.frequency),
    emissiveIntensity: 0.4,
    transparent: true,
    opacity: 0.7
  });
  
  // Create tube mesh
  const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
  tube.userData = {
    type: 'mycelialConnection',
    source,
    target,
    energy: 0.5,
    active: true,
    age: 0
  };
  
  // Add to system
  system.add(tube);
  
  // Register connection in nodes
  source.userData.connections.push(target);
  target.userData.connections.push(source);
  
  return tube;
}

/**
 * Add controls for mycelial interaction
 */
function addMycelialControls() {
  const controlsContainer = document.getElementById('demo-controls');
  if (!controlsContainer) return;
  
  // Create grow button
  const growButton = document.createElement('button');
  growButton.textContent = 'Stimulate Growth';
  growButton.className = 'grow-button quantum-button';
  growButton.style.marginLeft = '1rem';
  growButton.style.backgroundColor = '#4CAF50';
  
  growButton.addEventListener('click', () => {
    stimulateMycelialGrowth();
  });
  
  controlsContainer.appendChild(growButton);
  
  // Create pulse button
  const pulseButton = document.createElement('button');
  pulseButton.textContent = 'Pulse Network';
  pulseButton.className = 'pulse-button quantum-button';
  pulseButton.style.backgroundColor = '#FF9800';
  
  pulseButton.addEventListener('click', () => {
    pulseMycelialNetwork();
  });
  
  controlsContainer.appendChild(pulseButton);
  
  // Create reset button
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset Network';
  resetButton.className = 'reset-button quantum-button';
  resetButton.style.backgroundColor = '#2196F3';
  
  resetButton.addEventListener('click', () => {
    resetMycelialNetwork();
  });
  
  controlsContainer.appendChild(resetButton);
}

/**
 * Stimulate growth in the mycelial network
 */
function stimulateMycelialGrowth() {
  console.log("Stimulating mycelial growth");
  
  // Get mycelial system
  const mycelialSystem = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'mycelialSystem');
    
  if (!mycelialSystem) return;
  
  // Get active nodes
  const activeNodes = mycelialSystem.userData.activeNodes;
  
  // Create new nodes if not too many
  if (activeNodes.length < 50) {
    // Select random nodes to grow from
    const sourceNodes = activeNodes.filter(node => 
      node.userData.connections.length < node.userData.maxConnections);
      
    const nodesToGrow = Math.min(
      sourceNodes.length, 
      1 + Math.floor(Math.random() * 3)
    );
    
    for (let i = 0; i < nodesToGrow; i++) {
      // Random source node
      const sourceIndex = Math.floor(Math.random() * sourceNodes.length);
      const source = sourceNodes[sourceIndex];
      
      // Skip if at max connections
      if (source.userData.connections.length >= source.userData.maxConnections) {
        continue;
      }
      
      // Random direction for new node
      const angle = Math.random() * Math.PI * 2;
      const distance = 1 + Math.random() * 2;
      
      const newX = source.position.x + Math.cos(angle) * distance;
      const newZ = source.position.z + Math.sin(angle) * distance;
      
      // Create new node
      const newNode = createMycelialNode(mycelialSystem, newX, newZ, 0.8, false);
      
      // Create connection
      createMycelialConnection(mycelialSystem, source, newNode);
      
      // Create energy pulse
      createEnergyPulse(source, newNode);
    }
  }
  
  // Create new connections between existing nodes
  const connectionCount = Math.floor(Math.random() * 3) + 1;
  
  for (let i = 0; i < connectionCount; i++) {
    // Choose random source node
    const sourceIndex = Math.floor(Math.random() * activeNodes.length);
    const source = activeNodes[sourceIndex];
    
    // Skip if at max connections
    if (source.userData.connections.length >= source.userData.maxConnections) {
      continue;
    }
    
    // Find closest unconnected node
    const unconnectedNodes = activeNodes.filter(node => 
      node !== source && !source.userData.connections.includes(node));
      
    if (unconnectedNodes.length === 0) continue;
    
    // Find nodes within connection distance
    const nodesInRange = unconnectedNodes.filter(node => {
      const distance = source.position.distanceTo(node.position);
      return distance < mycelialSystem.userData.connectionDistance;
    });
    
    if (nodesInRange.length === 0) continue;
    
    // Choose random target from nodes in range
    const targetIndex = Math.floor(Math.random() * nodesInRange.length);
    const target = nodesInRange[targetIndex];
    
    // Create connection
    createMycelialConnection(mycelialSystem, source, target);
    
    // Create energy pulse
    createEnergyPulse(source, target);
  }
}

/**
 * Create energy pulse between nodes
 * @param {THREE.Object3D} source - Source node
 * @param {THREE.Object3D} target - Target node
 */
function createEnergyPulse(source, target) {
  // Get system
  const system = source.parent;
  
  // Create energy pulse geometry
  const pulseGeometry = new THREE.SphereGeometry(0.1, 8, 8);
  const pulseMaterial = new THREE.MeshBasicMaterial({
    color: getFrequencyColor(system.userData.frequency),
    transparent: true,
    opacity: 0.8
  });
  
  const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
  pulse.position.copy(source.position);
  
  pulse.userData = {
    type: 'energyPulse',
    source,
    target,
    progress: 0,
    speed: 0.02 + Math.random() * 0.02
  };
  
  system.add(pulse);
  
  // Create pulse animation with TWEEN
  const sourcePos = source.position.clone();
  const targetPos = target.position.clone();
  
  // Add slight arc to path
  const midPoint = new THREE.Vector3(
    (sourcePos.x + targetPos.x) / 2,
    (sourcePos.y + targetPos.y) / 2 + 0.5,
    (sourcePos.z + targetPos.z) / 2
  );
  
  // Create tween for position
  const tween = new TWEEN.Tween(pulse.position)
    .to(targetPos, 2000)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onComplete(() => {
      // Remove pulse on completion
      system.remove(pulse);
      pulse.geometry.dispose();
      pulse.material.dispose();
      
      // Energize target node
      new TWEEN.Tween(target.material)
        .to({
          emissiveIntensity: 0.8
        }, 500)
        .easing(TWEEN.Easing.Cubic.Out)
        .yoyo(true)
        .repeat(1)
        .start();
        
      // Scale target node
      new TWEEN.Tween(target.scale)
        .to({
          x: 1.3,
          y: 1.3,
          z: 1.3
        }, 500)
        .easing(TWEEN.Easing.Cubic.Out)
        .yoyo(true)
        .repeat(1)
        .start();
    });
  
  // Use path for curve motion
  tween.interpolation((k) => {
    // Quadratic bezier interpolation
    const t = k;
    const t2 = 1 - t;
    return new THREE.Vector3(
      t2*t2 * sourcePos.x + 2*t2*t * midPoint.x + t*t * targetPos.x,
      t2*t2 * sourcePos.y + 2*t2*t * midPoint.y + t*t * targetPos.y,
      t2*t2 * sourcePos.z + 2*t2*t * midPoint.z + t*t * targetPos.z
    );
  });
  
  tween.start();
  
  // Animate pulse size
  new TWEEN.Tween(pulse.scale)
    .to({
      x: 1.5,
      y: 1.5,
      z: 1.5
    }, 1000)
    .easing(TWEEN.Easing.Cubic.Out)
    .yoyo(true)
    .repeat(1)
    .start();
}

/**
 * Pulse energy through the mycelial network
 */
function pulseMycelialNetwork() {
  console.log("Pulsing mycelial network");
  
  // Get mycelial system
  const mycelialSystem = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'mycelialSystem');
    
  if (!mycelialSystem) return;
  
  // Get root nodes
  const rootNodes = mycelialSystem.children.filter(
    node => node.userData && 
    node.userData.type === 'mycelialNode' && 
    node.userData.isRoot
  );
  
  if (rootNodes.length === 0) return;
  
  // Send pulses from root nodes
  rootNodes.forEach(root => {
    // Pulse the root node
    new TWEEN.Tween(root.material)
      .to({
        emissiveIntensity: 1.0
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .yoyo(true)
      .repeat(1)
      .start();
      
    // Scale the root node
    new TWEEN.Tween(root.scale)
      .to({
        x: 1.5,
        y: 1.5,
        z: 1.5
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .yoyo(true)
      .repeat(1)
      .start();
    
    // Send pulses to connected nodes (recursive)
    pulseThroughConnections(root, []);
  });
  
  // Also pulse the mycelium field
  const myceliumField = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'myceliumField');
    
  if (myceliumField) {
    new TWEEN.Tween(myceliumField.material)
      .to({
        opacity: 0.8
      }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .yoyo(true)
      .repeat(1)
      .start();
      
    // Scale the field particles
    const sizes = myceliumField.geometry.attributes.size;
    const originalSizes = Array.from({length: sizes.count}, (_, i) => sizes.getX(i));
    
    new TWEEN.Tween({scale: 1.0})
      .to({scale: 2.0}, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .yoyo(true)
      .repeat(1)
      .onUpdate(obj => {
        for (let i = 0; i < sizes.count; i++) {
          sizes.setX(i, originalSizes[i] * obj.scale);
        }
        sizes.needsUpdate = true;
      })
      .start();
  }
}

/**
 * Recursively pulse through connections with delay
 * @param {THREE.Object3D} node - Current node
 * @param {Array} visited - Already visited nodes
 * @param {number} delay - Delay before pulse
 */
function pulseThroughConnections(node, visited, delay = 0) {
  // Mark as visited
  visited.push(node);
  
  // Get connected nodes not yet visited
  const connections = node.userData.connections.filter(
    conn => !visited.includes(conn)
  );
  
  connections.forEach((target, index) => {
    // Delay based on network depth
    const pulseDelay = delay + 300 + index * 100;
    
    // Create energy pulse after delay
    setTimeout(() => {
      createEnergyPulse(node, target);
      
      // Continue through network
      pulseThroughConnections(target, visited, pulseDelay);
    }, pulseDelay);
  });
}

/**
 * Reset the mycelial network to initial state
 */
function resetMycelialNetwork() {
  console.log("Resetting mycelial network");
  
  // Get mycelial system
  const mycelialSystem = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'mycelialSystem');
    
  if (!mycelialSystem) return;
  
  // Re-initialize with same frequency
  initMycelialDemo(mycelialSystem.userData.frequency);
}

/**
 * Update the Mycelial Pattern Demo per frame
 */
function updateMycelialDemo() {
  // Update TWEEN animations
  if (TWEEN) TWEEN.update();
  
  // Get mycelial system
  const mycelialSystem = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'mycelialSystem');
    
  if (mycelialSystem) {
    mycelialSystem.userData.time += 0.01;
    const time = mycelialSystem.userData.time;
    
    // Natural growth over time (very slow)
    if (Math.random() < 0.003) {
      stimulateMycelialGrowth();
    }
    
    // Update nodes
    mycelialSystem.children.forEach(child => {
      if (child.userData && child.userData.type === 'mycelialNode') {
        // Subtle pulsing
        if (child.userData.pulsing) {
          const pulseScale = 1.0 + 0.05 * Math.sin(time * 2 + child.userData.size * 10);
          child.scale.set(pulseScale, pulseScale, pulseScale);
        }
        
        // Subtle glow change
        child.material.emissiveIntensity = 
          (child.userData.isRoot ? 0.7 : 0.4) + 
          0.1 * Math.sin(time * 1.5 + child.userData.size * 5);
      }
    });
  }
  
  // Update mycelium field
  const myceliumField = activeObjects.find(obj => 
    obj.userData && obj.userData.type === 'myceliumField');
    
  if (myceliumField) {
    myceliumField.userData.time += 0.01;
    const time = myceliumField.userData.time;
    
    // Subtle field movement
    const positions = myceliumField.geometry.attributes.position;
    const originalPositions = myceliumField.geometry.attributes.position.array.slice();
    
    for (let i = 0; i < positions.count; i++) {
      const i3 = i * 3;
      const x = originalPositions[i3];
      const y = originalPositions[i3 + 1];
      const z = originalPositions[i3 + 2];
      
      // Add subtle wave motion
      positions.setX(i, x + Math.sin(time + y) * 0.02);
      positions.setY(i, y + Math.cos(time + x) * 0.02);
      positions.setZ(i, z + Math.sin(time + z) * 0.02);
    }
    
    positions.needsUpdate = true;
  }
}

/**
 * Update demo when frequency changes
 * @param {number} oldFrequency - Previous frequency
 * @param {number} newFrequency - New frequency
 */
function updateMycelialFrequency(oldFrequency, newFrequency) {
  console.log(`Updating mycelial demo from ${oldFrequency} to ${newFrequency} Hz`);
  
  // Re-initialize with new frequency
  initMycelialDemo(newFrequency);
}

// Export functions
window.initMycelialDemo = initMycelialDemo;
window.updateMycelialDemo = updateMycelialDemo;
window.updateMycelialFrequency = updateMycelialFrequency;
