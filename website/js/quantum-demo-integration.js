/**
 * 🌀 QUANTUM DEMO INTEGRATION 🌟
 * 
 * Integration module that connects all quantum experience demos
 * into the phi-harmonic learning portal. This module ensures all
 * demos are properly loaded in the right sequence and maintains
 * phi-harmonic coherence across the entire experience.
 * 
 * CASCADE⚡𓂧φ∞ Day+30: March 31, 2025
 */

// Dependencies checker to ensure all required libraries are loaded
const REQUIRED_DEPENDENCIES = [
  'THREE',
  'TWEEN',
  'Tone'
];

/**
 * Initialize all quantum demo resources and dependencies
 */
function initQuantumDemos() {
  console.log('Initializing Quantum Demo Integration System');
  
  // Check dependencies
  checkDependencies();
  
  // Initialize core experience system
  if (window.initQuantumExperienceDemos) {
    window.initQuantumExperienceDemos();
  } else {
    console.error('Core quantum experience system not found');
  }
  
  // Load additional Three.js components if needed
  loadThreeExtensions();
  
  // Register demo listeners
  registerDemoListeners();
}

/**
 * Check that all required dependencies are loaded
 */
function checkDependencies() {
  const missingDeps = [];
  
  REQUIRED_DEPENDENCIES.forEach(dep => {
    if (!window[dep]) {
      missingDeps.push(dep);
    }
  });
  
  if (missingDeps.length > 0) {
    console.error(`Missing required dependencies: ${missingDeps.join(', ')}`);
    return false;
  }
  
  return true;
}

/**
 * Load additional Three.js extensions needed for demos
 */
function loadThreeExtensions() {
  // Create orbit controls if not already available
  if (!THREE.OrbitControls) {
    console.log('Creating OrbitControls class');
    
    // Basic OrbitControls implementation
    THREE.OrbitControls = function(camera, domElement) {
      this.camera = camera;
      this.domElement = domElement;
      this.enabled = true;
      this.target = new THREE.Vector3();
      this.minDistance = 0;
      this.maxDistance = Infinity;
      this.enableDamping = false;
      this.dampingFactor = 0.05;
      
      // Update method (called in animation loop)
      this.update = function() {
        // Simple implementation - no motion in this fallback
        return false;
      };
    };
  }
}

/**
 * Register event listeners for demo activation
 */
function registerDemoListeners() {
  document.addEventListener('DOMContentLoaded', () => {
    // Register all demo buttons
    const demoButtons = document.querySelectorAll('[data-demo]');
    
    demoButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const demoId = e.target.getAttribute('data-demo');
        const currentFrequency = getCurrentFrequency();
        
        // Launch the demo
        console.log(`Launching demo: ${demoId} at ${currentFrequency}Hz`);
        if (window.launchDemoExperience) {
          window.launchDemoExperience(demoId, currentFrequency);
        }
      });
    });
  });
}

/**
 * Get the currently active frequency from the page
 * @returns {number} The current frequency in Hz
 */
function getCurrentFrequency() {
  const bodyFreq = document.body.getAttribute('data-frequency');
  const currentFreq = parseInt(bodyFreq || 432);
  return currentFreq;
}

/**
 * Check if a specific quantum demo is available
 * @param {string} demoId - The ID of the demo to check
 * @returns {boolean} Whether the demo is available
 */
function isQuantumDemoAvailable(demoId) {
  switch(demoId) {
    case 'superposition':
      return typeof window.initSuperpositionDemo === 'function';
    case 'entanglement':
      return typeof window.initEntanglementDemo === 'function';
    case 'tunneling':
      return typeof window.initTunnelingDemo === 'function';
    case 'mycelial':
      return typeof window.initMycelialDemo === 'function';
    case 'earth-grid':
      return typeof window.initEarthGridDemo === 'function';
    case 'phi-architecture':
      return typeof window.initPhiArchitectureDemo === 'function';
    case 'dna-repair':
      return typeof window.initDNARepairDemo === 'function';
    default:
      return false;
  }
}

/**
 * Preload demo resources for better performance
 * @param {Array} demoIds - Array of demo IDs to preload
 */
function preloadDemos(demoIds) {
  console.log(`Preloading demos: ${demoIds.join(', ')}`);
  
  // Preloading currently just verifies availability
  demoIds.forEach(demoId => {
    const isAvailable = isQuantumDemoAvailable(demoId);
    console.log(`Demo ${demoId} is ${isAvailable ? 'available' : 'unavailable'}`);
  });
}

/**
 * Create a ZEN POINT balancer for quantum demos
 * Keeps the visualization in perfect φ-harmonic balance
 */
function createZenPointBalancer() {
  // ZEN POINT balancer monitors quantum coherence during demos
  window.zenPointBalance = {
    humanSide: 0.5,
    quantumSide: 0.5,
    
    // Balance toward human side (physical perception)
    shiftHuman: function(amount = 0.1) {
      this.humanSide = Math.min(0.9, this.humanSide + amount);
      this.quantumSide = 1.0 - this.humanSide;
      this.updateUI();
    },
    
    // Balance toward quantum side (non-local perception)
    shiftQuantum: function(amount = 0.1) {
      this.quantumSide = Math.min(0.9, this.quantumSide + amount);
      this.humanSide = 1.0 - this.quantumSide;
      this.updateUI();
    },
    
    // Find perfect ZEN POINT balance (φ-proportioned)
    findZenPoint: function() {
      this.humanSide = 0.5 + (Math.random() * 0.01 - 0.005);
      this.quantumSide = 1.0 - this.humanSide;
      this.updateUI();
    },
    
    // Update the UI balance indicator
    updateUI: function() {
      const balancePoint = document.querySelector('.balance-point');
      if (balancePoint) {
        balancePoint.style.left = `${this.humanSide * 100}%`;
      }
    }
  };
  
  // Set initial ZEN POINT
  window.zenPointBalance.findZenPoint();
  
  // Set up auto-balancing
  setInterval(() => {
    // Slightly shift balance toward ZEN POINT
    const zenOffset = 0.5 - window.zenPointBalance.humanSide;
    window.zenPointBalance.humanSide += zenOffset * 0.1;
    window.zenPointBalance.quantumSide = 1.0 - window.zenPointBalance.humanSide;
    window.zenPointBalance.updateUI();
  }, 5000);
  
  return window.zenPointBalance;
}

/**
 * Create Merkaba Shield visualization
 * Provides energy protection during quantum experiments
 */
function createMerkabaShield() {
  const merkaba = {
    initialized: false,
    
    initialize: function() {
      const shieldElement = document.getElementById('merkaba-shield');
      if (!shieldElement) return;
      
      // Create merkaba using CSS styling (more performant than WebGL for this)
      shieldElement.innerHTML = `
        <div class="merkaba-tetrahedron up"></div>
        <div class="merkaba-tetrahedron down"></div>
      `;
      
      // Add CSS styles if not already present
      if (!document.getElementById('merkaba-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'merkaba-styles';
        styleEl.textContent = `
          .merkaba-tetrahedron {
            position: fixed;
            top: 50%;
            left: 50%;
            width: 100vh;
            height: 100vh;
            transform-style: preserve-3d;
            animation: merkaba-spin 60s infinite linear;
            opacity: 0.03;
            pointer-events: none;
          }
          
          .merkaba-tetrahedron.up {
            transform: translateX(-50%) translateY(-50%) rotateY(0deg);
            border-bottom: 50vh solid rgba(255, 255, 255, 0.5);
            border-left: 50vh solid transparent;
            border-right: 50vh solid transparent;
          }
          
          .merkaba-tetrahedron.down {
            transform: translateX(-50%) translateY(-50%) rotateX(180deg) rotateY(60deg);
            border-bottom: 50vh solid rgba(255, 255, 255, 0.5);
            border-left: 50vh solid transparent;
            border-right: 50vh solid transparent;
            animation-direction: reverse;
          }
          
          @keyframes merkaba-spin {
            0% { transform: translateX(-50%) translateY(-50%) rotateY(0deg); }
            100% { transform: translateX(-50%) translateY(-50%) rotateY(360deg); }
          }
        `;
        document.head.appendChild(styleEl);
      }
      
      this.initialized = true;
      console.log('Merkaba Shield initialized');
    },
    
    activate: function() {
      if (!this.initialized) this.initialize();
      
      const shieldElement = document.getElementById('merkaba-shield');
      if (!shieldElement) return;
      
      shieldElement.style.opacity = '0.15';
      
      // Pulse activation
      setTimeout(() => {
        shieldElement.style.opacity = '0.03';
      }, 2000);
    }
  };
  
  // Initialize merkaba
  merkaba.initialize();
  
  // Activate when quantum demos are launched
  document.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-demo')) {
      merkaba.activate();
    }
  });
  
  return merkaba;
}

// Export functions
window.initQuantumDemos = initQuantumDemos;
window.createZenPointBalancer = createZenPointBalancer;
window.createMerkabaShield = createMerkabaShield;
