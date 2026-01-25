/**
 * 🌀 Toroidal Field Renderer 🌀
 * 
 * A Three.js based renderer for visualizing quantum phi-harmonic relationships
 * through interactive toroidal field representations.
 * 
 * This renderer creates a visual representation of test results across
 * all frequency states, showing their interconnected nature through
 * phi-harmonic toroidal fields.
 */

const THREE = require('three');
const { PHI, FREQUENCIES } = require('./phi-harmonic-testing');

class ToroidalFieldRenderer {
  /**
   * Create a new toroidal field renderer
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    this.options = {
      containerId: options.containerId || 'toroidal-field-container',
      width: options.width || 800,
      height: options.height || 600,
      backgroundColor: options.backgroundColor || 0x000000,
      torusColor: options.torusColor || 0x3498db,
      highlightColor: options.highlightColor || 0xf39c12,
      wireframe: options.wireframe || false,
      autoRotate: options.autoRotate || true,
      frequency: options.frequency || FREQUENCIES.UNITY,
      ...options
    };
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.torusKnot = null;
    this.frequencyPoints = {};
    this.initialized = false;
    
    this.dataPoints = [];
    this.coherenceLevel = 1.0;
    
    // Bind methods
    this.animate = this.animate.bind(this);
  }
  
  /**
   * Initialize the renderer
   * @returns {Promise<boolean>} Initialization success
   */
  async initialize() {
    if (this.initialized) return true;
    
    try {
      // Create scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(this.options.backgroundColor);
      
      // Create camera
      this.camera = new THREE.PerspectiveCamera(
        75, 
        this.options.width / this.options.height, 
        0.1, 
        1000
      );
      this.camera.position.z = 30;
      
      // Create renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(this.options.width, this.options.height);
      
      // Create main toroidal field
      await this.createToroidalField();
      
      // Create frequency points
      await this.createFrequencyPoints();
      
      // Start animation loop
      this.animate();
      
      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize toroidal field renderer:', error);
      return false;
    }
  }
  
  /**
   * Create the main toroidal field visualization
   */
  async createToroidalField() {
    // Create torus knot geometry based on phi
    const radius = 10;
    const tube = 3;
    const tubularSegments = 128;
    const radialSegments = 32;
    const p = 3; // Number of windings around axis of symmetry
    const q = 5; // Number of windings around interior of torus
    
    const geometry = new THREE.TorusKnotGeometry(
      radius, tube, tubularSegments, radialSegments, p, q
    );
    
    // Create material
    const material = new THREE.MeshPhongMaterial({
      color: this.options.torusColor,
      wireframe: this.options.wireframe,
      transparent: true,
      opacity: 0.8,
      emissive: new THREE.Color(this.options.torusColor).multiplyScalar(0.2)
    });
    
    // Create mesh
    this.torusKnot = new THREE.Mesh(geometry, material);
    this.scene.add(this.torusKnot);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0xffffff, 0.5);
    pointLight1.position.set(50, 50, 50);
    this.scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
    pointLight2.position.set(-50, -50, -50);
    this.scene.add(pointLight2);
  }
  
  /**
   * Create visual representation of each frequency point
   */
  async createFrequencyPoints() {
    // Define colors for each frequency
    const frequencyColors = {
      GROUND: 0x16a085,   // 432 Hz - Teal
      CREATION: 0x27ae60, // 528 Hz - Green
      HEART: 0xe74c3c,    // 594 Hz - Red
      VOICE: 0xe67e22,    // 672 Hz - Orange
      VISION: 0x9b59b6,   // 720 Hz - Purple
      UNITY: 0xf1c40f     // 768 Hz - Yellow
    };
    
    // Create a sphere for each frequency point
    Object.entries(FREQUENCIES).forEach(([name, freq], index) => {
      // Calculate position on torus based on phi relationship
      const phiPower = Math.log(freq / FREQUENCIES.GROUND) / Math.log(PHI);
      const angle = (phiPower / 5) * Math.PI * 2; // Map phi power to angle (0-2π)
      
      const radius = 15;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const z = 5 * Math.sin(angle * 2); // Add some vertical variation
      
      // Create geometry
      const geometry = new THREE.SphereGeometry(1.5, 32, 32);
      
      // Create material
      const material = new THREE.MeshPhongMaterial({
        color: frequencyColors[name],
        emissive: new THREE.Color(frequencyColors[name]).multiplyScalar(0.3),
        transparent: true,
        opacity: 0.9
      });
      
      // Create mesh
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, y, z);
      this.scene.add(sphere);
      
      // Store reference
      this.frequencyPoints[name] = {
        mesh: sphere,
        baseColor: frequencyColors[name],
        frequency: freq,
        phiPower,
        position: { x, y, z }
      };
    });
  }
  
  /**
   * Create connecting lines between frequency points
   * @param {number} coherence Overall system coherence
   */
  createConnectingLines(coherence = 1.0) {
    // Remove previous lines
    this.scene.children = this.scene.children.filter(
      child => !(child instanceof THREE.Line)
    );
    
    // Get frequency points
    const points = Object.values(this.frequencyPoints);
    
    // Create lines between points
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const pointA = points[i];
        const pointB = points[j];
        
        // Calculate relationship between points
        const phiRelation = Math.abs(pointA.phiPower - pointB.phiPower);
        
        // Skip if not closely related in phi
        if (phiRelation > 2) continue;
        
        // Calculate line opacity based on relationship and coherence
        const lineOpacity = Math.max(0.1, (1 - phiRelation/2) * coherence);
        
        // Create line geometry
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(pointA.position.x, pointA.position.y, pointA.position.z),
          new THREE.Vector3(pointB.position.x, pointB.position.y, pointB.position.z)
        ]);
        
        // Create line material
        const material = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: lineOpacity
        });
        
        // Create line
        const line = new THREE.Line(geometry, material);
        this.scene.add(line);
      }
    }
  }
  
  /**
   * Update the visualization with test results
   * @param {Object} data Test results data
   */
  updateVisualization(data = {}) {
    // Update coherence level
    if (data.results) {
      let totalCoherence = 0;
      let count = 0;
      
      Object.entries(data.results).forEach(([name, result]) => {
        if (result && typeof result.coherence === 'number') {
          totalCoherence += result.coherence;
          count++;
          
          // Update frequency point
          if (this.frequencyPoints[name]) {
            const point = this.frequencyPoints[name];
            const mesh = point.mesh;
            
            // Scale based on coherence
            const scale = 0.5 + (result.coherence * 1.5);
            mesh.scale.set(scale, scale, scale);
            
            // Adjust color intensity based on coherence
            const material = mesh.material;
            const color = new THREE.Color(point.baseColor);
            const intensity = 0.3 + (result.coherence * 0.7);
            material.emissive = color.clone().multiplyScalar(intensity);
            material.opacity = 0.6 + (result.coherence * 0.4);
          }
        }
      });
      
      // Calculate average coherence
      this.coherenceLevel = count > 0 ? totalCoherence / count : 1.0;
      
      // Update connecting lines
      this.createConnectingLines(this.coherenceLevel);
      
      // Update torus based on coherence
      if (this.torusKnot) {
        // Adjust rotation speed
        this.rotationSpeed = 0.001 + (this.coherenceLevel * 0.003);
        
        // Adjust material
        const material = this.torusKnot.material;
        material.opacity = 0.4 + (this.coherenceLevel * 0.6);
        material.emissive = new THREE.Color(this.options.torusColor).multiplyScalar(0.1 + (this.coherenceLevel * 0.3));
      }
    }
    
    // Update active frequency
    if (data.frequency) {
      this.options.frequency = data.frequency;
      
      // Highlight active frequency point
      Object.entries(this.frequencyPoints).forEach(([name, point]) => {
        const isActive = FREQUENCIES[name] === data.frequency;
        const mesh = point.mesh;
        
        if (isActive) {
          // Highlight active frequency
          mesh.material.color = new THREE.Color(this.options.highlightColor);
          mesh.material.emissive = new THREE.Color(this.options.highlightColor).multiplyScalar(0.5);
          
          // Create pulse effect
          this.createPulseEffect(point);
        } else {
          // Restore original color
          mesh.material.color = new THREE.Color(point.baseColor);
        }
      });
    }
    
    // Update data points for wave visualization
    if (data.waveData) {
      this.dataPoints = data.waveData;
    }
  }
  
  /**
   * Create pulse effect around a frequency point
   * @param {Object} point Frequency point
   */
  createPulseEffect(point) {
    // Remove existing pulse
    this.scene.children = this.scene.children.filter(
      child => !(child.isPulse && child.frequency === point.frequency)
    );
    
    // Create pulse geometry
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    
    // Create pulse material
    const material = new THREE.MeshBasicMaterial({
      color: this.options.highlightColor,
      transparent: true,
      opacity: 0.7
    });
    
    // Create pulse mesh
    const pulse = new THREE.Mesh(geometry, material);
    pulse.position.copy(point.mesh.position);
    pulse.isPulse = true;
    pulse.frequency = point.frequency;
    pulse.scale.set(1, 1, 1);
    pulse.userData.pulseParams = {
      minScale: 1,
      maxScale: 3,
      speed: 0.05,
      growing: true
    };
    
    this.scene.add(pulse);
  }
  
  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(this.animate);
    
    // Rotate torus knot
    if (this.torusKnot && this.options.autoRotate) {
      this.torusKnot.rotation.x += this.rotationSpeed || 0.002;
      this.torusKnot.rotation.y += this.rotationSpeed || 0.003;
    }
    
    // Animate pulse effects
    this.scene.children.forEach(child => {
      if (child.isPulse) {
        const params = child.userData.pulseParams;
        
        if (params.growing) {
          child.scale.addScalar(params.speed);
          if (child.scale.x >= params.maxScale) {
            params.growing = false;
          }
        } else {
          child.scale.addScalar(-params.speed);
          if (child.scale.x <= params.minScale) {
            params.growing = true;
          }
        }
        
        // Fade out as it grows
        child.material.opacity = 0.7 * (1 - ((child.scale.x - params.minScale) / (params.maxScale - params.minScale)));
      }
    });
    
    // Render scene
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
  
  /**
   * Render a single frame of the visualization
   * Useful for generating static images
   */
  renderFrame() {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
      return this.renderer.domElement.toDataURL('image/png');
    }
    return null;
  }
  
  /**
   * Save current frame as image
   * @param {string} path Path to save image to
   */
  saveFrame(path) {
    const dataUrl = this.renderFrame();
    if (dataUrl) {
      // In a Node.js environment, you would use fs to save the image
      // This is a placeholder implementation
      console.log(`Saved frame to ${path}`);
      return path;
    }
    return null;
  }
  
  /**
   * Set the DOM container for the renderer
   * @param {HTMLElement|string} container Container element or ID
   */
  setContainer(container) {
    if (!this.renderer) return false;
    
    const element = typeof container === 'string' 
      ? document.getElementById(container) 
      : container;
    
    if (element) {
      element.appendChild(this.renderer.domElement);
      return true;
    }
    
    return false;
  }
  
  /**
   * Clean up resources
   */
  dispose() {
    // Stop animation loop
    cancelAnimationFrame(this.animate);
    
    // Dispose geometries and materials
    if (this.torusKnot) {
      this.torusKnot.geometry.dispose();
      this.torusKnot.material.dispose();
    }
    
    Object.values(this.frequencyPoints).forEach(point => {
      if (point.mesh) {
        point.mesh.geometry.dispose();
        point.mesh.material.dispose();
      }
    });
    
    // Clear scene
    while (this.scene.children.length > 0) {
      const object = this.scene.children[0];
      this.scene.remove(object);
    }
    
    // Dispose renderer
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    this.initialized = false;
  }
  
  /**
   * Resize the renderer
   * @param {number} width New width
   * @param {number} height New height
   */
  resize(width, height) {
    if (!this.renderer || !this.camera) return;
    
    this.options.width = width;
    this.options.height = height;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(width, height);
  }
}

module.exports = ToroidalFieldRenderer;
