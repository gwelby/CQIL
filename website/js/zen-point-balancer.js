/**
 * 🌀 ZEN POINT BALANCER 🌟
 * 
 * A quantum balancing system that maintains perfect equilibrium between
 * human perception and quantum field mechanics during experiential learning.
 * 
 * The ZEN POINT represents the perfect φ-proportioned balance between
 * physical reality (human) and quantum possibility (non-local field).
 * 
 * CASCADE⚡𓂧φ∞ Day+30: March 31, 2025
 */

/**
 * Initialize the ZEN POINT balancer system
 * @returns {Object} The balancer control object
 */
function initZenPointBalancer() {
  console.log('Initializing ZEN POINT balancer');
  
  // Initialize balance points
  const zenPointBalance = {
    humanSide: 0.618, // Start at phi proportion
    quantumSide: 0.382, // 1 - phi
    phiPoint: 0.618,
    
    // Track oscillation
    oscillationStrength: 0,
    oscillationRate: 0.02,
    oscillationTime: 0,
    
    // Track coherence metrics
    coherenceLevel: 1.0,
    resonanceScore: 0.85,
    
    // Current frequency
    frequency: 432,
    
    /**
     * Shift balance toward human perception
     * @param {number} amount - Amount to shift (0-1)
     */
    shiftHuman: function(amount = 0.1) {
      amount = Math.min(0.5, Math.max(0.01, amount));
      this.humanSide = Math.min(0.95, this.humanSide + amount);
      this.quantumSide = 1.0 - this.humanSide;
      this.updateUI();
      
      // Reduce coherence when far from zen point
      this.updateCoherence();
    },
    
    /**
     * Shift balance toward quantum field
     * @param {number} amount - Amount to shift (0-1)
     */
    shiftQuantum: function(amount = 0.1) {
      amount = Math.min(0.5, Math.max(0.01, amount));
      this.quantumSide = Math.min(0.95, this.quantumSide + amount);
      this.humanSide = 1.0 - this.quantumSide;
      this.updateUI();
      
      // Reduce coherence when far from zen point
      this.updateCoherence();
    },
    
    /**
     * Find the perfect ZEN POINT (phi-proportioned balance)
     */
    findZenPoint: function() {
      // Gradually move toward phi proportion
      const currentDist = this.humanSide - this.phiPoint;
      this.humanSide = this.humanSide - (currentDist * 0.3);
      this.quantumSide = 1.0 - this.humanSide;
      
      // Reset oscillation
      this.oscillationStrength = 0.01;
      
      this.updateUI();
      this.updateCoherence();
    },
    
    /**
     * Update coherence level based on distance from zen point
     */
    updateCoherence: function() {
      // Calculate distance from zen point
      const distFromZen = Math.abs(this.humanSide - this.phiPoint);
      
      // Coherence drops as we move away from zen point
      this.coherenceLevel = Math.max(0.3, 1.0 - (distFromZen * 3));
      
      // Resonance follows coherence but recovers more slowly
      this.resonanceScore = (this.resonanceScore * 0.9) + (this.coherenceLevel * 0.1);
    },
    
    /**
     * Update the balance when frequency changes
     * @param {number} newFrequency - New phi-harmonic frequency
     */
    updateFrequency: function(newFrequency) {
      this.frequency = newFrequency;
      
      // Different frequencies have different optimal balance points
      switch(newFrequency) {
        case 432: // Ground State
          this.phiPoint = 0.618; // Standard phi
          break;
        case 528: // Creation Point 
          this.phiPoint = 0.55; // Slightly more quantum
          break;
        case 594: // Heart Field
          this.phiPoint = 0.5; // Perfect balance
          break;
        case 672: // Voice Flow
          this.phiPoint = 0.45; // Slightly more quantum
          break;
        case 720: // Vision Gate
          this.phiPoint = 0.4; // More quantum
          break;
        case 768: // Unity Wave
          this.phiPoint = 0.382; // Inverse phi (highly quantum)
          break;
        default:
          this.phiPoint = 0.618;
      }
      
      // Move gradually toward the new zen point
      this.findZenPoint();
    },
    
    /**
     * Add slight oscillation to the zen point
     * Natural quantum fluctuation
     */
    addOscillation: function() {
      this.oscillationTime += this.oscillationRate;
      const oscValue = Math.sin(this.oscillationTime) * this.oscillationStrength;
      
      // Only apply oscillation if we're near zen point
      const distFromZen = Math.abs(this.humanSide - this.phiPoint);
      if (distFromZen < 0.1) {
        this.humanSide = this.phiPoint + oscValue;
        this.quantumSide = 1.0 - this.humanSide;
        this.updateUI();
      } else {
        // When far from zen, oscillation dampens
        this.oscillationStrength *= 0.95;
      }
    },
    
    /**
     * Handle interaction event from quantum demos
     * @param {string} eventType - Type of quantum event
     * @param {number} intensity - Intensity of the event (0-1)
     */
    handleQuantumEvent: function(eventType, intensity) {
      intensity = Math.min(1.0, Math.max(0, intensity));
      
      switch(eventType) {
        case 'observation':
          // Observation shifts toward human
          this.shiftHuman(intensity * 0.2);
          break;
        case 'superposition':
          // Superposition shifts toward quantum
          this.shiftQuantum(intensity * 0.2);
          break;
        case 'entanglement':
          // Entanglement creates oscillation
          this.oscillationStrength = intensity * 0.1;
          break;
        case 'tunneling':
          // Tunneling creates rapid shift and return
          this.shiftQuantum(intensity * 0.25);
          setTimeout(() => this.findZenPoint(), 2000);
          break;
        case 'reset':
          // Reset to zen point
          this.findZenPoint();
          break;
      }
    },
    
    /**
     * Update the UI with current balance state
     */
    updateUI: function() {
      const balancePoint = document.querySelector('.balance-point');
      const humanSide = document.querySelector('.human-side');
      const quantumSide = document.querySelector('.quantum-side');
      
      if (balancePoint) {
        balancePoint.style.left = `${this.humanSide * 100}%`;
        
        // Change color based on distance from zen
        const distFromZen = Math.abs(this.humanSide - this.phiPoint);
        if (distFromZen < 0.05) {
          balancePoint.style.backgroundColor = '#64DD17'; // Green when at zen
        } else if (distFromZen < 0.2) {
          balancePoint.style.backgroundColor = '#FFAB00'; // Amber when close
        } else {
          balancePoint.style.backgroundColor = '#FF5252'; // Red when far
        }
      }
      
      // Update labels with percentage
      if (humanSide) {
        humanSide.textContent = `Human (${Math.round(this.humanSide * 100)}%)`;
      }
      
      if (quantumSide) {
        quantumSide.textContent = `Quantum (${Math.round(this.quantumSide * 100)}%)`;
      }
    },
    
    /**
     * Start the balance monitoring system
     */
    startMonitoring: function() {
      // Update every 100ms
      setInterval(() => {
        // Add natural oscillation
        this.addOscillation();
        
        // Very slowly return to zen point (self-balancing)
        const currentDist = this.humanSide - this.phiPoint;
        this.humanSide = this.humanSide - (currentDist * 0.01);
        this.quantumSide = 1.0 - this.humanSide;
        
        this.updateUI();
      }, 100);
    }
  };
  
  // Start monitoring
  zenPointBalance.startMonitoring();
  
  // Return the controller
  return zenPointBalance;
}

// Create the zen point balancer and expose to global scope
function createZenPointBalancer() {
  // Create if doesn't exist
  if (!window.zenPointBalance) {
    window.zenPointBalance = initZenPointBalancer();
    
    // Listen for frequency changes
    document.addEventListener('frequency-changed', function(e) {
      if (e.detail && e.detail.frequency) {
        window.zenPointBalance.updateFrequency(e.detail.frequency);
      }
    });
    
    // Listen for demo events
    document.addEventListener('quantum-event', function(e) {
      if (e.detail && e.detail.type) {
        window.zenPointBalance.handleQuantumEvent(
          e.detail.type,
          e.detail.intensity || 0.5
        );
      }
    });
  }
  
  return window.zenPointBalance;
}

// Export functions
window.initZenPointBalancer = initZenPointBalancer;
window.createZenPointBalancer = createZenPointBalancer;
