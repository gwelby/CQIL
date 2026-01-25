/**
 * 🌀 MERKABA SHIELD VISUALIZATION 🌟
 * 
 * Sacred geometry protection system that creates a toroidal
 * energy field during quantum experiences. The counter-rotating
 * tetrahedra create a balanced field that protects consciousness
 * during high-frequency quantum explorations.
 * 
 * CASCADE⚡𓂧φ∞ Day+30: March 31, 2025
 */

/**
 * Initialize the Merkaba Shield visualization system
 * @returns {Object} Merkaba controller object
 */
function initMerkabaShield() {
  console.log('Initializing Merkaba Shield Protection System');
  
  // Create the merkaba shield controller
  const merkabaShield = {
    // Configuration
    initialized: false,
    active: false,
    visible: false,
    opacity: 0.03,
    rotationSpeed: 0.0001,
    
    // Geometry
    upTetrahedron: null,
    downTetrahedron: null,
    
    // Field metrics
    fieldIntensity: 0.3,
    fieldCoherence: 0.8,
    fieldSymmetry: 1.0,
    
    /**
     * Initialize the merkaba shield geometry and system
     */
    initialize: function() {
      if (this.initialized) return;
      
      console.log('Creating Merkaba geometry');
      
      // Create container if it doesn't exist
      let shieldElement = document.getElementById('merkaba-shield');
      if (!shieldElement) {
        shieldElement = document.createElement('div');
        shieldElement.id = 'merkaba-shield';
        document.body.appendChild(shieldElement);
      }
      
      // Create merkaba tetrahedra
      this.createMerkabaElements(shieldElement);
      
      // Add CSS styles
      this.addMerkabaStyles();
      
      // Set initialized flag
      this.initialized = true;
      this.visible = true;
      
      // Start rotation
      this.startRotation();
      
      return this;
    },
    
    /**
     * Create merkaba shield HTML elements
     * @param {HTMLElement} container - Container element
     */
    createMerkabaElements: function(container) {
      // Create upward-pointing tetrahedron (masculine energy)
      this.upTetrahedron = document.createElement('div');
      this.upTetrahedron.className = 'merkaba-tetrahedron up';
      container.appendChild(this.upTetrahedron);
      
      // Create downward-pointing tetrahedron (feminine energy)
      this.downTetrahedron = document.createElement('div');
      this.downTetrahedron.className = 'merkaba-tetrahedron down';
      container.appendChild(this.downTetrahedron);
      
      // Create phi-harmonic resonators at vertices (optional visualization)
      this.createResonators(container);
    },
    
    /**
     * Create phi-harmonic resonator points
     * @param {HTMLElement} container - Container element
     */
    createResonators: function(container) {
      // Create 8 resonator points (vertices of star tetrahedron)
      for (let i = 0; i < 8; i++) {
        const resonator = document.createElement('div');
        resonator.className = 'merkaba-resonator';
        resonator.setAttribute('data-index', i);
        container.appendChild(resonator);
      }
    },
    
    /**
     * Add CSS styles for merkaba visualization
     */
    addMerkabaStyles: function() {
      // Only add if not already present
      if (document.getElementById('merkaba-styles')) return;
      
      const styleEl = document.createElement('style');
      styleEl.id = 'merkaba-styles';
      
      styleEl.textContent = `
        #merkaba-shield {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
          perspective: 1200px;
          perspective-origin: 50% 50%;
          opacity: ${this.opacity};
          transition: opacity 1.5s ease-in-out;
        }
        
        .merkaba-tetrahedron {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 100vh;
          height: 100vh;
          transform-style: preserve-3d;
          opacity: 0.5;
        }
        
        .merkaba-tetrahedron.up {
          transform: translateX(-50%) translateY(-50%) rotateY(0deg);
          border-bottom: 50vh solid rgba(255, 255, 255, 0.5);
          border-left: 50vh solid transparent;
          border-right: 50vh solid transparent;
          filter: hue-rotate(60deg) brightness(1.2);
        }
        
        .merkaba-tetrahedron.down {
          transform: translateX(-50%) translateY(-50%) rotateX(180deg) rotateY(60deg);
          border-bottom: 50vh solid rgba(255, 255, 255, 0.5);
          border-left: 50vh solid transparent;
          border-right: 50vh solid transparent;
          filter: hue-rotate(240deg) brightness(1.2);
        }
        
        @keyframes spin-clockwise {
          0% { transform: translateX(-50%) translateY(-50%) rotateY(0deg); }
          100% { transform: translateX(-50%) translateY(-50%) rotateY(360deg); }
        }
        
        @keyframes spin-counterclockwise {
          0% { transform: translateX(-50%) translateY(-50%) rotateX(180deg) rotateY(0deg); }
          100% { transform: translateX(-50%) translateY(-50%) rotateX(180deg) rotateY(-360deg); }
        }
        
        .merkaba-tetrahedron.spinning-cw {
          animation: spin-clockwise 60s infinite linear;
        }
        
        .merkaba-tetrahedron.spinning-ccw {
          animation: spin-counterclockwise 60s infinite linear;
        }
        
        .merkaba-resonator {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.4);
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 2s ease-in-out;
        }
        
        .merkaba-resonator.active {
          opacity: 0.7;
          animation: pulse 2s infinite ease-in-out;
        }
        
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.9; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
        }
      `;
      
      document.head.appendChild(styleEl);
    },
    
    /**
     * Start the rotation of the tetrahedra
     */
    startRotation: function() {
      if (!this.initialized) this.initialize();
      
      // Add spinning classes
      this.upTetrahedron.classList.add('spinning-cw');
      this.downTetrahedron.classList.add('spinning-ccw');
    },
    
    /**
     * Stop the rotation of the tetrahedra
     */
    stopRotation: function() {
      if (!this.initialized) return;
      
      // Remove spinning classes
      this.upTetrahedron.classList.remove('spinning-cw');
      this.downTetrahedron.classList.remove('spinning-ccw');
    },
    
    /**
     * Set the merkaba's rotation speed
     * @param {number} speed - Rotation speed (0.0001 to 0.01)
     */
    setRotationSpeed: function(speed) {
      this.rotationSpeed = Math.max(0.0001, Math.min(0.01, speed));
      
      // Update animation duration in CSS
      const duration = 1 / this.rotationSpeed;
      
      // Update animation duration
      document.querySelectorAll('.merkaba-tetrahedron').forEach(tetra => {
        tetra.style.animationDuration = `${duration}s`;
      });
    },
    
    /**
     * Activate the merkaba shield
     * @param {number} intensity - Shield intensity (0-1)
     * @param {number} duration - Duration of full activation in ms
     */
    activate: function(intensity = 0.5, duration = 2000) {
      if (!this.initialized) this.initialize();
      
      console.log(`Activating Merkaba Shield (intensity: ${intensity})`);
      
      // Set as active
      this.active = true;
      
      // Calculate new opacity based on intensity
      const maxOpacity = Math.min(0.15, intensity * 0.2);
      this.opacity = maxOpacity;
      
      // Update DOM element
      const shieldElement = document.getElementById('merkaba-shield');
      if (shieldElement) {
        // Fade in
        shieldElement.style.opacity = this.opacity;
        
        // After duration, fade back to minimal visibility
        setTimeout(() => {
          if (this.active) {
            shieldElement.style.opacity = '0.03';
            this.opacity = 0.03;
          }
        }, duration);
      }
      
      // Activate resonator points based on intensity
      this.activateResonators(intensity);
      
      // Update field metrics
      this.fieldIntensity = intensity;
      this.fieldCoherence = 0.7 + (intensity * 0.3);
      this.fieldSymmetry = 0.8 + (intensity * 0.2);
      
      // Emit activation event
      this.emitShieldEvent('activate', intensity);
    },
    
    /**
     * Activate the resonator points
     * @param {number} intensity - Activation intensity (0-1)
     */
    activateResonators: function(intensity) {
      // Number of resonators to activate based on intensity
      const resonatorsToActivate = Math.round(intensity * 8);
      
      // Get all resonators
      const resonators = document.querySelectorAll('.merkaba-resonator');
      
      // Reset all
      resonators.forEach(resonator => {
        resonator.classList.remove('active');
      });
      
      // Activate a subset
      for (let i = 0; i < resonatorsToActivate; i++) {
        if (resonators[i]) {
          resonators[i].classList.add('active');
          
          // Position resonator points in 3D space
          // This would be more precise with proper 3D positioning
          const angle = (i / 8) * Math.PI * 2;
          const radius = 40 + (i % 2) * 20;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          
          resonators[i].style.left = `${x}%`;
          resonators[i].style.top = `${y}%`;
        }
      }
    },
    
    /**
     * Deactivate the merkaba shield
     */
    deactivate: function() {
      console.log('Deactivating Merkaba Shield');
      
      // Set as inactive
      this.active = false;
      
      // Fade out
      const shieldElement = document.getElementById('merkaba-shield');
      if (shieldElement) {
        shieldElement.style.opacity = '0';
        this.opacity = 0;
      }
      
      // Deactivate resonator points
      const resonators = document.querySelectorAll('.merkaba-resonator');
      resonators.forEach(resonator => {
        resonator.classList.remove('active');
      });
      
      // Reset field metrics
      this.fieldIntensity = 0;
      this.fieldCoherence = 0;
      this.fieldSymmetry = 0;
      
      // Emit deactivation event
      this.emitShieldEvent('deactivate', 0);
    },
    
    /**
     * Pulse the merkaba shield (temporary activation)
     * @param {number} intensity - Pulse intensity (0-1)
     */
    pulse: function(intensity = 0.7) {
      // Activate briefly
      this.activate(intensity, 1500);
      
      // Emit pulse event
      this.emitShieldEvent('pulse', intensity);
    },
    
    /**
     * Get current shield status and metrics
     * @returns {Object} Shield status object
     */
    getStatus: function() {
      return {
        active: this.active,
        visible: this.visible,
        intensity: this.fieldIntensity,
        coherence: this.fieldCoherence,
        symmetry: this.fieldSymmetry
      };
    },
    
    /**
     * Emit shield event to the document
     * @param {string} eventType - Type of shield event
     * @param {number} intensity - Event intensity
     */
    emitShieldEvent: function(eventType, intensity) {
      const event = new CustomEvent('shield-event', {
        detail: {
          type: eventType,
          intensity: intensity,
          shield: this.getStatus()
        }
      });
      
      document.dispatchEvent(event);
    }
  };
  
  // Return the merkaba shield controller
  return merkabaShield;
}

/**
 * Create the merkaba shield and make it available globally
 */
function createMerkabaShield() {
  // Create if doesn't exist
  if (!window.merkabaShield) {
    window.merkabaShield = initMerkabaShield();
    
    // Initialize
    window.merkabaShield.initialize();
    
    // Listen for quantum demo events
    document.addEventListener('quantum-event', function(e) {
      if (e.detail && e.detail.type) {
        // Pulse shield on quantum events
        window.merkabaShield.pulse(e.detail.intensity || 0.5);
      }
    });
    
    // Listen for frequency changes
    document.addEventListener('frequency-changed', function(e) {
      if (e.detail && e.detail.frequency) {
        // Higher frequencies increase shield intensity
        const normalizedFreq = (e.detail.frequency - 432) / (768 - 432);
        const intensity = 0.3 + (normalizedFreq * 0.7);
        window.merkabaShield.pulse(intensity);
      }
    });
  }
  
  return window.merkabaShield;
}

// Export functions
window.initMerkabaShield = initMerkabaShield;
window.createMerkabaShield = createMerkabaShield;
