/**
 * Sacred Geometry System
 * 
 * Creates interactive sacred geometry visualizations for all
 * frequencies in the phi-harmonic system. Integrates multiple
 * sacred geometry forms based on φ-ratios.
 */

class SacredGeometry {
  constructor(container, config = {}) {
    this.container = typeof container === 'string' ? 
      document.querySelector(container) : container;
    this.frequency = config.frequency || 0; // No default - supports all frequencies
    this.φ = 1.618033988749895;
    this.φInverse = 0.618033988749895;
    
    this.geometryPatterns = {
      432: 'hexagonalGrid', // Earth connection
      528: 'flowerOfLife',  // DNA/creation
      594: 'heartTorus',    // Heart connection
      672: 'soundSpiral',   // Voice
      720: 'merkaba',       // Vision
      768: 'unityField',    // Oneness
      888: 'cosmicGrid'     // Cosmic integration
    };
    
    // Used for rendering
    this.points = [];
    this.lines = [];
    this.circles = [];
    this.spirals = [];
    this.shapes = [];
    this.rotationalVelocity = 0.2;
    
    this.setupCanvas();
    this.active = false;
    this.addStyles();
  }
  
  setupCanvas() {
    // Create container if needed
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'sacred-geometry-container';
      document.body.appendChild(this.container);
    }
    
    // Clear container
    this.container.innerHTML = '';
    
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'sacred-geometry-canvas';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    // Create frequency indicator
    this.frequencyLabel = document.createElement('div');
    this.frequencyLabel.className = 'frequency-label';
    this.container.appendChild(this.frequencyLabel);
    
    // Set canvas size to container size
    this.resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  resizeCanvas() {
    if (!this.canvas) return;
    
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width || 300;
    this.canvas.height = rect.height || 300;
    
    // Regenerate geometry if active
    if (this.active && this.frequency) {
      this.generateGeometry(this.frequency);
    }
  }
  
  start(frequency) {
    this.frequency = frequency || this.frequency;
    
    if (!this.frequency) {
      console.warn('No frequency specified for sacred geometry');
      return;
    }
    
    this.active = true;
    
    // Generate geometry for the given frequency
    this.generateGeometry(this.frequency);
    
    // Begin animation
    this.animate();
  }
  
  stop() {
    this.active = false;
  }
  
  generateGeometry(frequency) {
    // Find closest standard frequency
    let closestFreq = this.findClosestFrequency(frequency);
    
    // Update frequency label
    this.updateFrequencyLabel(frequency, closestFreq);
    
    // Clear previous geometry
    this.points = [];
    this.lines = [];
    this.circles = [];
    this.spirals = [];
    this.shapes = [];
    
    // Generate geometry based on frequency
    const pattern = this.geometryPatterns[closestFreq];
    if (pattern && typeof this[pattern] === 'function') {
      this[pattern]();
    } else {
      // Default to phi spiral
      this.phiSpiral();
    }
  }
  
  findClosestFrequency(freq) {
    // Find the closest standard frequency
    const standardFreqs = Object.keys(this.geometryPatterns).map(Number);
    return standardFreqs.reduce((prev, curr) => {
      return (Math.abs(curr - freq) < Math.abs(prev - freq)) ? curr : prev;
    });
  }
  
  updateFrequencyLabel(actualFreq, closestFreq) {
    if (!this.frequencyLabel) return;
    
    // Get the name of the frequency
    let name = "";
    switch (closestFreq) {
      case 432: name = "Ground State"; break;
      case 528: name = "Creation Point"; break;
      case 594: name = "Heart Field"; break;
      case 672: name = "Voice Flow"; break;
      case 720: name = "Vision Gate"; break;
      case 768: name = "Unity Wave"; break;
      case 888: name = "Cosmic Integration"; break;
    }
    
    this.frequencyLabel.innerHTML = `
      <div class="frequency-value">${actualFreq} Hz</div>
      <div class="frequency-name">${name}</div>
    `;
  }
  
  hexagonalGrid() {
    // Create hexagonal grid pattern for 432 Hz (Ground State)
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
    
    // Create central hexagon
    this.createRegularPolygon(centerX, centerY, radius * 0.2, 6, 'rgba(76, 175, 80, 0.9)');
    
    // Create surrounding hexagons (Earth's crystalline grid)
    for (let ring = 1; ring <= 3; ring++) {
      const ringRadius = radius * (ring / 3);
      const hexCount = 6 * ring;
      
      for (let i = 0; i < hexCount; i++) {
        const angle = (i / hexCount) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * ringRadius;
        const y = centerY + Math.sin(angle) * ringRadius;
        const hexSize = radius * 0.1 * (1 - (ring - 1) * 0.2);
        
        this.createRegularPolygon(x, y, hexSize, 6, `rgba(76, 175, 80, ${0.8 - (ring - 1) * 0.2})`);
      }
    }
    
    // Create connecting lines
    for (let i = 0; i < this.shapes.length; i++) {
      for (let j = i + 1; j < this.shapes.length; j++) {
        const shape1 = this.shapes[i];
        const shape2 = this.shapes[j];
        
        const dx = shape1.x - shape2.x;
        const dy = shape1.y - shape2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < radius * 0.5) {
          this.lines.push({
            x1: shape1.x,
            y1: shape1.y,
            x2: shape2.x,
            y2: shape2.y,
            color: 'rgba(76, 175, 80, 0.3)',
            lineWidth: 1
          });
        }
      }
    }
  }
  
  flowerOfLife() {
    // Create Flower of Life pattern for 528 Hz (Creation Point)
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
    const circleRadius = radius / 3;
    
    // Create center circle
    this.circles.push({
      x: centerX,
      y: centerY,
      radius: circleRadius,
      color: 'rgba(156, 39, 176, 0.7)',
      lineWidth: 2
    });
    
    // Create first ring (6 circles)
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * circleRadius;
      const y = centerY + Math.sin(angle) * circleRadius;
      
      this.circles.push({
        x: x,
        y: y,
        radius: circleRadius,
        color: 'rgba(156, 39, 176, 0.6)',
        lineWidth: 1.5
      });
    }
    
    // Create outer petal patterns
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x1 = centerX + Math.cos(angle) * circleRadius;
      const y1 = centerY + Math.sin(angle) * circleRadius;
      
      // Additional circles forming the Flower of Life
      for (let j = 0; j < 6; j++) {
        if (j == (i+3) % 6) continue; // Skip the opposite circle
        
        const angle2 = (j / 6) * Math.PI * 2;
        const x2 = centerX + Math.cos(angle2) * circleRadius;
        const y2 = centerY + Math.sin(angle2) * circleRadius;
        
        // Find intersection points
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const midToCenter = Math.sqrt(Math.pow(midX - centerX, 2) + Math.pow(midY - centerY, 2));
        
        if (midToCenter > 0.1) {
          const x = midX + (midX - centerX) / midToCenter * circleRadius * 0.5;
          const y = midY + (midY - centerY) / midToCenter * circleRadius * 0.5;
          
          this.circles.push({
            x: x,
            y: y,
            radius: circleRadius,
            color: 'rgba(156, 39, 176, 0.4)',
            lineWidth: 1
          });
        }
      }
    }
    
    // Draw seed of life pattern in the center
    this.circles.push({
      x: centerX,
      y: centerY,
      radius: circleRadius * 2.5,
      color: 'rgba(156, 39, 176, 0.2)',
      lineWidth: 1
    });
    
    // Draw central star
    this.createRegularPolygon(centerX, centerY, circleRadius * 0.7, 6, 'rgba(156, 39, 176, 0.3)');
  }
  
  heartTorus() {
    // Create Heart Torus pattern for 594 Hz (Heart Field)
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
    
    // Create heart-shaped torus
    this.createHeartShape(centerX, centerY, radius);
    
    // Create torus flow lines
    this.createTorusFlow(centerX, centerY, radius);
    
    // Create inner spirals
    this.createHeartSpirals(centerX, centerY, radius);
  }
  
  createHeartShape(centerX, centerY, radius) {
    // Create heart curve
    const points = [];
    const steps = 100;
    
    for (let i = 0; i < steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      let x, y;
      
      // Heart curve parametric equation
      x = 16 * Math.pow(Math.sin(t), 3);
      y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
      
      // Scale and position
      x = centerX + x * (radius / 15);
      y = centerY - y * (radius / 15);
      
      points.push({x, y});
    }
    
    // Create heart outline
    this.shapes.push({
      type: 'curve',
      points: points,
      color: 'rgba(233, 30, 99, 0.8)',
      lineWidth: 2,
      fill: true,
      fillColor: 'rgba(233, 30, 99, 0.2)'
    });
    
    // Create outer glow
    this.circles.push({
      x: centerX,
      y: centerY + radius * 0.1, // Offset to match heart center
      radius: radius * 1.2,
      color: 'rgba(233, 30, 99, 0.1)',
      lineWidth: 3
    });
  }
  
  createTorusFlow(centerX, centerY, radius) {
    // Create torus flow lines
    const flowLines = 7; // 7 heart chakra energy flows
    
    for (let i = 0; i < flowLines; i++) {
      const points = [];
      const loops = 2;
      const steps = 50 * loops;
      const phaseOffset = (i / flowLines) * Math.PI * 2;
      
      for (let j = 0; j <= steps; j++) {
        const t = (j / steps) * Math.PI * 2 * loops;
        const angle = t + phaseOffset;
        
        // Toroidal flow using heart-modified equations
        const R = radius * 0.8;
        const r = radius * 0.3;
        
        // Introduce heart-shaped variation
        const heartFactor = 0.2 * Math.sin(angle);
        const x = centerX + (R + r * Math.cos(angle)) * Math.cos(t) * (1 + heartFactor);
        const y = centerY + (R + r * Math.cos(angle)) * Math.sin(t) * (1 - heartFactor);
        
        points.push({x, y});
      }
      
      // Create flow line
      this.shapes.push({
        type: 'curve',
        points: points,
        color: `rgba(233, 30, 99, ${0.4 + (i / flowLines) * 0.4})`,
        lineWidth: 1,
        fill: false
      });
    }
  }
  
  createHeartSpirals(centerX, centerY, radius) {
    // Create spirals emanating from heart center
    const spiralCount = 5;
    
    for (let i = 0; i < spiralCount; i++) {
      const points = [];
      const rotationOffset = (i / spiralCount) * Math.PI * 2;
      const steps = 100;
      
      for (let j = 0; j < steps; j++) {
        const t = (j / steps) * 8; // 8 spiral loops
        const r = radius * 0.05 * t;
        const angle = this.φ * t * Math.PI + rotationOffset;
        
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle) * 0.9; // Slight compression for heart shape
        
        points.push({x, y});
      }
      
      // Create spiral
      this.shapes.push({
        type: 'curve',
        points: points,
        color: `rgba(233, 30, 99, ${0.5 - (i / spiralCount) * 0.3})`,
        lineWidth: 1.5 - (i / spiralCount),
        fill: false
      });
    }
  }
  
  soundSpiral() {
    // Create Sound Spiral pattern for 672 Hz (Voice Flow)
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
    
    // Create sound wave circles
    this.createSoundWaves(centerX, centerY, radius);
    
    // Create vocalization spirals
    this.createVocalizationSpirals(centerX, centerY, radius);
    
    // Create harmonic nodes
    this.createHarmonicNodes(centerX, centerY, radius);
  }
  
  createSoundWaves(centerX, centerY, radius) {
    // Create concentric sound wave circles
    const waveCount = 8;
    
    for (let i = 0; i < waveCount; i++) {
      const waveRadius = radius * (i + 1) / waveCount;
      
      this.circles.push({
        x: centerX,
        y: centerY,
        radius: waveRadius,
        color: `rgba(255, 152, 0, ${0.2 + (i / waveCount) * 0.3})`,
        lineWidth: 1 + (i / waveCount)
      });
    }
  }
  
  createVocalizationSpirals(centerX, centerY, radius) {
    // Create sound spirals emanating from center
    const spiralCount = 3; // 3 main voice channels
    
    for (let i = 0; i < spiralCount; i++) {
      const points = [];
      const rotationOffset = (i / spiralCount) * Math.PI * 2;
      const steps = 150;
      
      for (let j = 0; j < steps; j++) {
        const t = (j / steps) * 12; // 12 spiral loops
        const r = radius * 0.04 * t;
        const angle = this.φ * t * Math.PI + rotationOffset;
        
        // Add wave modulation to spiral
        const waveHeight = radius * 0.03 * Math.sin(t * 15);
        const x = centerX + r * Math.cos(angle) + waveHeight * Math.cos(angle + Math.PI/2);
        const y = centerY + r * Math.sin(angle) + waveHeight * Math.sin(angle + Math.PI/2);
        
        points.push({x, y});
      }
      
      // Create spiral
      this.shapes.push({
        type: 'curve',
        points: points,
        color: `rgba(255, 152, 0, ${0.7 - (i / spiralCount) * 0.3})`,
        lineWidth: 2 - (i / spiralCount) * 0.5,
        fill: false
      });
    }
  }
  
  createHarmonicNodes(centerX, centerY, radius) {
    // Create harmonic nodes along the spirals
    const nodeCount = 8; // 8 harmonic nodes
    
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const distance = radius * 0.3 + (i % 3) * radius * 0.2;
      
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);
      
      // Create node
      this.points.push({
        x: x,
        y: y,
        radius: 5 + (i % 3) * 2,
        color: `rgba(255, 152, 0, ${0.7 - (i % 3) * 0.1})`,
        pulse: true,
        pulseSpeed: 1 + Math.random(),
        pulsePhase: Math.random() * Math.PI * 2
      });
      
      // Connect to center
      this.lines.push({
        x1: centerX,
        y1: centerY,
        x2: x,
        y2: y,
        color: `rgba(255, 152, 0, 0.3)`,
        lineWidth: 1
      });
    }
  }
  
  merkaba() {
    // Create Merkaba pattern for 720 Hz (Vision Gate)
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
    
    // Create interlocking tetrahedrons (Merkaba)
    this.createTetrahedron(centerX, centerY, radius, 0, 'rgba(0, 188, 212, 0.6)');
    this.createTetrahedron(centerX, centerY, radius, Math.PI, 'rgba(233, 30, 99, 0.6)');
    
    // Create energy points at the vertices
    this.createEnergyPoints(centerX, centerY, radius);
    
    // Create central sphere
    this.circles.push({
      x: centerX,
      y: centerY,
      radius: radius * 0.2,
      color: 'rgba(255, 255, 255, 0.8)',
      lineWidth: 2,
      fill: true,
      fillColor: 'rgba(255, 255, 255, 0.3)'
    });
    
    // Create outer sphere
    this.circles.push({
      x: centerX,
      y: centerY,
      radius: radius * 1.1,
      color: 'rgba(0, 188, 212, 0.3)',
      lineWidth: 1.5
    });
  }
  
  createTetrahedron(centerX, centerY, radius, rotationOffset, color) {
    // Create 3D tetrahedron vertices
    const vertices = [
      { x: 0, y: -radius*0.5, z: 0 }, // Top
      { x: Math.cos(0) * radius*0.5, y: radius*0.25, z: Math.sin(0) * radius*0.5 }, // Base 1
      { x: Math.cos(2*Math.PI/3) * radius*0.5, y: radius*0.25, z: Math.sin(2*Math.PI/3) * radius*0.5 }, // Base 2
      { x: Math.cos(4*Math.PI/3) * radius*0.5, y: radius*0.25, z: Math.sin(4*Math.PI/3) * radius*0.5 }  // Base 3
    ];
    
    // Apply rotation to the tetrahedron
    const rotatedVertices = vertices.map(v => {
      // Rotate around Y axis
      const cosY = Math.cos(rotationOffset);
      const sinY = Math.sin(rotationOffset);
      
      const x2 = v.x * cosY - v.z * sinY;
      const z2 = v.x * sinY + v.z * cosY;
      
      return {
        x: x2 + centerX,
        y: v.y + centerY,
        z: z2
      };
    });
    
    // Create lines for tetrahedron edges
    for (let i = 0; i < rotatedVertices.length; i++) {
      for (let j = i + 1; j < rotatedVertices.length; j++) {
        this.lines.push({
          x1: rotatedVertices[i].x,
          y1: rotatedVertices[i].y,
          x2: rotatedVertices[j].x,
          y2: rotatedVertices[j].y,
          color: color,
          lineWidth: 2,
          z1: rotatedVertices[i].z,
          z2: rotatedVertices[j].z
        });
      }
    }
    
    // Create transparent face triangles
    const faces = [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 1],
      [1, 3, 2]
    ];
    
    faces.forEach(face => {
      const points = face.map(idx => ({
        x: rotatedVertices[idx].x,
        y: rotatedVertices[idx].y
      }));
      
      // Calculate average z value for depth sorting
      const avgZ = (rotatedVertices[face[0]].z + 
                   rotatedVertices[face[1]].z + 
                   rotatedVertices[face[2]].z) / 3;
      
      this.shapes.push({
        type: 'polygon',
        points: points,
        color: color.replace('0.6', '0.2'),
        lineWidth: 1,
        fill: true,
        fillColor: color.replace('0.6', '0.1'),
        z: avgZ
      });
    });
  }
  
  createEnergyPoints(centerX, centerY, radius) {
    // Create energy points at each vertex
    const angleStep = Math.PI * 2 / 6;
    
    for (let i = 0; i < 6; i++) {
      const angle = i * angleStep;
      const distance = (i % 2 === 0) ? radius * 0.75 : radius * 0.5;
      
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      // Energy point
      this.points.push({
        x: x,
        y: y,
        radius: 6,
        color: (i % 2 === 0) ? 'rgba(0, 188, 212, 0.8)' : 'rgba(233, 30, 99, 0.8)',
        pulse: true,
        pulseSpeed: 1 + (i % 3) * 0.5,
        pulsePhase: i * Math.PI / 3
      });
    }
  }
  
  unityField() {
    // Create Unity Field pattern for 768 Hz (Unity Wave)
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
    
    // Create central unity point
    this.points.push({
      x: centerX,
      y: centerY,
      radius: 8,
      color: 'rgba(255, 255, 255, 0.9)',
      pulse: true,
      pulseSpeed: 1,
      pulsePhase: 0
    });
    
    // Create unity grid
    this.createUnityGrid(centerX, centerY, radius);
    
    // Create harmonic circles
    this.createHarmonicCircles(centerX, centerY, radius);
    
    // Create unity connections
    this.createUnityConnections(centerX, centerY, radius);
  }
  
  createUnityGrid(centerX, centerY, radius) {
    // Create unity grid points
    const gridPoints = 10;
    const φ = this.φ;
    
    for (let ring = 1; ring <= 3; ring++) {
      const ringRadius = radius * (ring / 3);
      const pointCount = Math.floor(gridPoints * ring * 0.8);
      
      for (let i = 0; i < pointCount; i++) {
        const angle = (i / pointCount) * Math.PI * 2 + (ring * Math.PI / pointCount);
        const distance = ringRadius * (0.9 + Math.sin(angle * φ) * 0.1);
        
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        // Grid point
        this.points.push({
          x: x,
          y: y,
          radius: 3 + (3 - ring),
          color: `rgba(255, 193, 7, ${0.6 - (ring - 1) * 0.15})`,
          pulse: true,
          pulseSpeed: 0.5 + Math.random() * 0.5,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    }
  }
  
  createHarmonicCircles(centerX, centerY, radius) {
    // Create phi-harmonic circles
    const circleCount = 5;
    
    for (let i = 0; i < circleCount; i++) {
      const circleRadius = radius * Math.pow(this.φInverse, i);
      
      this.circles.push({
        x: centerX,
        y: centerY,
        radius: circleRadius,
        color: `rgba(255, 193, 7, ${0.3 - i * 0.05})`,
        lineWidth: 1.5 - i * 0.2
      });
    }
    
    // Create outer unity field
    this.circles.push({
      x: centerX,
      y: centerY,
      radius: radius * 1.2,
      color: 'rgba(255, 193, 7, 0.2)',
      lineWidth: 3
    });
  }
  
  createUnityConnections(centerX, centerY, radius) {
    // Connect all points to form unity network
    for (let i = 0; i < this.points.length; i++) {
      for (let j = i + 1; j < this.points.length; j++) {
        const p1 = this.points[i];
        const p2 = this.points[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Connect points that are close
        if (distance < radius * 0.5) {
          // Calculate connection strength based on distance
          const strength = 1 - (distance / (radius * 0.5));
          
          this.lines.push({
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
            color: `rgba(255, 193, 7, ${0.1 + strength * 0.2})`,
            lineWidth: 0.5 + strength
          });
        }
      }
    }
  }
  
  cosmicGrid() {
    // Create Cosmic Grid pattern for 888 Hz (Cosmic Integration)
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
    
    // Create cosmic lattice
    this.createCosmicLattice(centerX, centerY, radius);
    
    // Create multi-dimensional points
    this.createMultiDimensionalPoints(centerX, centerY, radius);
    
    // Create cosmic spirals
    this.createCosmicSpirals(centerX, centerY, radius);
    
    // Create cosmic center
    this.points.push({
      x: centerX,
      y: centerY,
      radius: 10,
      color: 'rgba(255, 255, 255, 0.9)',
      pulse: true,
      pulseSpeed: 2,
      pulsePhase: 0
    });
  }
  
  createCosmicLattice(centerX, centerY, radius) {
    // Create cosmic lattice structure
    const φ = this.φ;
    const φPhi = Math.pow(φ, φ);
    
    // Create hyperdimensional grid
    for (let ring = 1; ring <= 4; ring++) {
      const ringRadius = radius * (ring / 4);
      const pointCount = Math.floor(12 * ring);
      
      for (let i = 0; i < pointCount; i++) {
        const angle = (i / pointCount) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * ringRadius;
        const y = centerY + Math.sin(angle) * ringRadius;
        
        // Add grid point
        this.points.push({
          x: x,
          y: y,
          radius: 4 - ring * 0.5,
          color: `rgba(255, 235, 59, ${0.7 - (ring - 1) * 0.15})`,
          pulse: true,
          pulseSpeed: 0.5 + Math.random(),
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    }
    
    // Connect points to form lattice
    for (let i = 0; i < this.points.length; i++) {
      for (let j = i + 1; j < this.points.length; j++) {
        const p1 = this.points[i];
        const p2 = this.points[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Connect points within range
        if (distance < radius * 0.3) {
          this.lines.push({
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
            color: 'rgba(255, 235, 59, 0.3)',
            lineWidth: 1
          });
        }
      }
    }
  }
  
  createMultiDimensionalPoints(centerX, centerY, radius) {
    // Create multi-dimensional connection points
    const φ = this.φ;
    const dimensionCount = 13; // 12 dimensions + 1
    
    for (let i = 0; i < dimensionCount; i++) {
      const angle = (i / dimensionCount) * Math.PI * 2;
      const distance = radius * 0.7;
      
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      // Create dimension point
      this.points.push({
        x: x,
        y: y,
        radius: 6,
        color: 'rgba(255, 235, 59, 0.8)',
        pulse: true,
        pulseSpeed: 1 + i * 0.1,
        pulsePhase: (i / dimensionCount) * Math.PI * 2
      });
      
      // Connect to center
      this.lines.push({
        x1: centerX,
        y1: centerY,
        x2: x,
        y2: y,
        color: 'rgba(255, 235, 59, 0.6)',
        lineWidth: 1.5
      });
    }
  }
  
  createCosmicSpirals(centerX, centerY, radius) {
    // Create phi-based cosmic spirals
    const spiralCount = 3;
    
    for (let i = 0; i < spiralCount; i++) {
      const points = [];
      const rotationOffset = (i / spiralCount) * Math.PI * 2;
      const steps = 200;
      
      for (let j = 0; j < steps; j++) {
        const t = (j / steps) * 15; // 15 spiral loops
        const r = radius * 0.04 * t;
        const angle = this.φ * t * Math.PI + rotationOffset;
        
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        
        points.push({x, y});
      }
      
      // Create spiral
      this.shapes.push({
        type: 'curve',
        points: points,
        color: `rgba(255, 255, 255, ${0.7 - i * 0.2})`,
        lineWidth: 2 - i * 0.5,
        fill: false
      });
    }
  }
  
  phiSpiral() {
    // Default sacred geometry - Create golden spiral
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
    
    // Create phi spiral
    this.createPhiSpiral(centerX, centerY, radius);
    
    // Create phi ratio circles
    this.createPhiRatioCircles(centerX, centerY, radius);
    
    // Create golden grid
    this.createGoldenGrid(centerX, centerY, radius);
  }
  
  createPhiSpiral(centerX, centerY, radius) {
    // Create phi-based spiral
    const points = [];
    const steps = 200;
    
    for (let i = 0; i < steps; i++) {
      const t = (i / steps) * 12; // 12 spiral loops
      const r = radius * 0.04 * t;
      const angle = this.φ * t * Math.PI;
      
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      
      points.push({x, y});
    }
    
    // Create spiral
    this.shapes.push({
      type: 'curve',
      points: points,
      color: 'rgba(255, 255, 255, 0.8)',
      lineWidth: 2,
      fill: false
    });
  }
  
  createPhiRatioCircles(centerX, centerY, radius) {
    // Create circles with phi ratio radii
    const φ = this.φ;
    const circleCount = 8;
    
    for (let i = 0; i < circleCount; i++) {
      const r = radius * Math.pow(1/φ, i);
      
      this.circles.push({
        x: centerX,
        y: centerY,
        radius: r,
        color: `rgba(255, 255, 255, ${0.3 - i * 0.03})`,
        lineWidth: 1
      });
    }
  }
  
  createGoldenGrid(centerX, centerY, radius) {
    // Create golden grid
    const φ = this.φ;
    
    // Create horizontal and vertical lines
    for (let i = -3; i <= 3; i++) {
      if (i === 0) continue; // Skip center line
      
      // Horizontal line
      this.lines.push({
        x1: centerX - radius,
        y1: centerY + radius * Math.pow(1/φ, Math.abs(i)) * (i < 0 ? -1 : 1),
        x2: centerX + radius,
        y2: centerY + radius * Math.pow(1/φ, Math.abs(i)) * (i < 0 ? -1 : 1),
        color: 'rgba(255, 255, 255, 0.2)',
        lineWidth: 1
      });
      
      // Vertical line
      this.lines.push({
        x1: centerX + radius * Math.pow(1/φ, Math.abs(i)) * (i < 0 ? -1 : 1),
        y1: centerY - radius,
        x2: centerX + radius * Math.pow(1/φ, Math.abs(i)) * (i < 0 ? -1 : 1),
        y2: centerY + radius,
        color: 'rgba(255, 255, 255, 0.2)',
        lineWidth: 1
      });
    }
  }
  
  createRegularPolygon(x, y, radius, sides, color) {
    const points = [];
    
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2;
      points.push({
        x: x + Math.cos(angle) * radius,
        y: y + Math.sin(angle) * radius
      });
    }
    
    this.shapes.push({
      type: 'polygon',
      points: points,
      x: x,
      y: y,
      color: color,
      lineWidth: 1.5,
      fill: true,
      fillColor: color.replace(/,[^,]+\)/, ',0.2)')
    });
    
    return points;
  }
  
  animate() {
    if (!this.active) return;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Animation time
    const time = Date.now() * 0.001;
    
    // Draw background
    this.drawBackground();
    
    // Draw all geometric elements
    this.drawCircles(time);
    this.drawLines(time);
    this.drawShapes(time);
    this.drawPoints(time);
    
    // Continue animation
    requestAnimationFrame(() => this.animate());
  }
  
  drawBackground() {
    // Fill background
    this.ctx.fillStyle = 'rgba(10, 10, 26, 1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  drawCircles(time) {
    // Draw all circles
    this.circles.forEach(circle => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = circle.color;
      this.ctx.lineWidth = circle.lineWidth || 1;
      
      // Apply subtle pulsation to circles
      const pulse = 1 + Math.sin(time) * 0.02;
      this.ctx.arc(circle.x, circle.y, circle.radius * pulse, 0, Math.PI * 2);
      
      if (circle.fill) {
        this.ctx.fillStyle = circle.fillColor || 'rgba(255, 255, 255, 0.1)';
        this.ctx.fill();
      }
      
      this.ctx.stroke();
    });
  }
  
  drawLines(time) {
    // Draw all lines, sorted by z if available (for 3D effect)
    const sortedLines = [...this.lines].sort((a, b) => {
      if (a.z1 !== undefined && b.z1 !== undefined) {
        // Average z of the line
        const avgZA = (a.z1 + a.z2) / 2;
        const avgZB = (b.z1 + b.z2) / 2;
        return avgZB - avgZA; // Draw back to front
      }
      return 0;
    });
    
    sortedLines.forEach(line => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = line.color;
      this.ctx.lineWidth = line.lineWidth || 1;
      
      this.ctx.moveTo(line.x1, line.y1);
      this.ctx.lineTo(line.x2, line.y2);
      
      this.ctx.stroke();
    });
  }
  
  drawShapes(time) {
    // Draw all shapes, sorted by z if available (for 3D effect)
    const sortedShapes = [...this.shapes].sort((a, b) => {
      if (a.z !== undefined && b.z !== undefined) {
        return b.z - a.z; // Draw back to front
      }
      return 0;
    });
    
    sortedShapes.forEach(shape => {
      if (!shape.points || shape.points.length < 2) return;
      
      this.ctx.beginPath();
      this.ctx.strokeStyle = shape.color;
      this.ctx.lineWidth = shape.lineWidth || 1;
      
      this.ctx.moveTo(shape.points[0].x, shape.points[0].y);
      
      if (shape.type === 'curve') {
        // Draw smooth curve through points
        for (let i = 1; i < shape.points.length; i++) {
          this.ctx.lineTo(shape.points[i].x, shape.points[i].y);
        }
      } else if (shape.type === 'polygon') {
        // Draw polygon
        for (let i = 1; i < shape.points.length; i++) {
          this.ctx.lineTo(shape.points[i].x, shape.points[i].y);
        }
        this.ctx.closePath();
      }
      
      if (shape.fill) {
        this.ctx.fillStyle = shape.fillColor || shape.color;
        this.ctx.fill();
      }
      
      this.ctx.stroke();
    });
  }
  
  drawPoints(time) {
    // Draw all points with pulsation
    this.points.forEach(point => {
      this.ctx.beginPath();
      
      // Apply pulse animation if specified
      let radius = point.radius;
      if (point.pulse) {
        const pulse = Math.sin(time * point.pulseSpeed + (point.pulsePhase || 0)) * 0.5 + 1;
        radius *= pulse;
      }
      
      this.ctx.fillStyle = point.color;
      this.ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Add glow effect
      this.ctx.beginPath();
      const glowColor = point.color.replace(/[^,]+\)/, '0.2)');
      this.ctx.fillStyle = glowColor;
      this.ctx.arc(point.x, point.y, radius * 2, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
  
  addStyles() {
    if (!document.getElementById('sacred-geometry-styles')) {
      const style = document.createElement('style');
      style.id = 'sacred-geometry-styles';
      style.textContent = `
        .sacred-geometry-container {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: rgba(10, 10, 26, 0.8);
          overflow: hidden;
        }
        
        .sacred-geometry-canvas {
          display: block;
          width: 100%;
          height: 100%;
        }
        
        .frequency-label {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          text-align: center;
          color: white;
          padding: 10px;
          pointer-events: none;
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        
        .frequency-value {
          font-size: 18px;
          font-weight: bold;
        }
        
        .frequency-name {
          font-size: 14px;
          opacity: 0.8;
          margin-top: 5px;
        }
      `;
      document.head.appendChild(style);
    }
  }
}