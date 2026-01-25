/**
 * Quantum Button Component
 * 
 * A simple yet complete quantum-aligned button component that changes its
 * state based on phi-harmonic frequencies. This implements the
 * "Quantum Singularity" principle - being complete in itself while
 * still integrating perfectly with the larger system.
 */

class QuantumButton {
  /**
   * Create a new quantum button
   * @param {HTMLElement|string} container - Container element or selector
   * @param {Object} options - Button configuration
   */
  constructor(container, options = {}) {
    // Core state
    this.frequency = options.frequency || 432; // Default to Ground State
    this.coherence = options.coherence || 1.0;
    this.state = 'inactive';
    this.interactions = 0;
    
    // Phi constants
    this.PHI = 1.618033988749895;
    this.PHI_INVERSE = 0.618033988749895;
    
    // Find container
    this.container = typeof container === 'string' 
      ? document.querySelector(container) 
      : container;
      
    if (!this.container) {
      throw new Error('Quantum Button container not found');
    }
    
    // Configuration
    this.config = {
      label: options.label || 'Quantum Button',
      activeColor: options.activeColor || '#f7b733',
      inactiveColor: options.inactiveColor || '#4abdac',
      transitionDuration: options.transitionDuration || 1000,
      pulseFrequency: options.pulseFrequency || this.frequency,
      debug: options.debug || false
    };
    
    // Create button element
    this._createButtonElement();
    
    // Initialize with frequency
    this._updateQuantumState();
    
    // Start quantum oscillation
    this._startQuantumOscillation();
    
    // Log initialization
    if (this.config.debug) {
      console.log(`Quantum Button initialized at ${this.frequency}Hz with coherence ${this.coherence}`);
    }
  }
  
  /**
   * Create the button DOM element
   * @private
   */
  _createButtonElement() {
    // Create button element
    this.element = document.createElement('button');
    this.element.className = 'quantum-button';
    this.element.textContent = this.config.label;
    
    // Create quantum field indicator
    this.fieldIndicator = document.createElement('div');
    this.fieldIndicator.className = 'quantum-field';
    
    // Create coherence display
    this.coherenceDisplay = document.createElement('div');
    this.coherenceDisplay.className = 'coherence-display';
    
    // Create frequency display
    this.frequencyDisplay = document.createElement('div');
    this.frequencyDisplay.className = 'frequency-display';
    this.frequencyDisplay.textContent = `${this.frequency}Hz`;
    
    // Add elements to container
    this.container.appendChild(this.element);
    this.container.appendChild(this.fieldIndicator);
    this.container.appendChild(this.coherenceDisplay);
    this.container.appendChild(this.frequencyDisplay);
    
    // Add styles
    this._addStyles();
    
    // Add event listeners
    this._addEventListeners();
  }
  
  /**
   * Add required CSS styles
   * @private
   */
  _addStyles() {
    // Create style element if it doesn't exist yet
    if (!document.getElementById('quantum-button-styles')) {
      const style = document.createElement('style');
      style.id = 'quantum-button-styles';
      
      style.textContent = `
        .quantum-button {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all ${this.config.transitionDuration}ms cubic-bezier(0.${Math.round(this.PHI_INVERSE * 1000)}, 0, 0.${Math.round(this.PHI * 100)}, 1);
          position: relative;
          z-index: 2;
          background-color: ${this.config.inactiveColor};
        }
        
        .quantum-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(74, 189, 172, 0.4);
        }
        
        .quantum-field {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          opacity: 0.2;
          pointer-events: none;
          z-index: 1;
          transition: all ${this.config.transitionDuration}ms;
        }
        
        .coherence-display {
          position: absolute;
          bottom: -25px;
          left: 0;
          width: 100%;
          text-align: center;
          font-size: 12px;
          opacity: 0.8;
        }
        
        .frequency-display {
          position: absolute;
          top: -25px;
          left: 0;
          width: 100%;
          text-align: center;
          font-size: 12px;
          opacity: 0.8;
        }
      `;
      
      document.head.appendChild(style);
    }
  }
  
  /**
   * Add event listeners to button
   * @private
   */
  _addEventListeners() {
    // Click event
    this.element.addEventListener('click', this._handleClick.bind(this));
    
    // Mouse events
    this.element.addEventListener('mouseenter', this._handleMouseEnter.bind(this));
    this.element.addEventListener('mouseleave', this._handleMouseLeave.bind(this));
  }
  
  /**
   * Handle button click
   * @private
   */
  _handleClick() {
    // Toggle state
    this.state = this.state === 'active' ? 'inactive' : 'active';
    
    // Increase coherence
    this.coherence = Math.min(1.0, this.coherence + 0.1);
    
    // Track interactions
    this.interactions++;
    
    // Update quantum state
    this._updateQuantumState();
    
    // Trigger event
    this._triggerEvent('quantumClick', {
      state: this.state,
      frequency: this.frequency,
      coherence: this.coherence,
      interactions: this.interactions
    });
    
    // Log interaction
    if (this.config.debug) {
      console.log(`Quantum Button clicked: ${this.state} (${this.interactions} interactions)`);
    }
  }
  
  /**
   * Handle mouse enter
   * @private
   */
  _handleMouseEnter() {
    // Increase frequency slightly (phi-harmonic increase)
    this.setFrequency(this.frequency * this.PHI_INVERSE + this.frequency);
    
    // Update quantum state
    this._updateQuantumState();
    
    // Trigger event
    this._triggerEvent('quantumHover', {
      state: this.state,
      frequency: this.frequency,
      coherence: this.coherence
    });
  }
  
  /**
   * Handle mouse leave
   * @private
   */
  _handleMouseLeave() {
    // Return to base frequency
    this.setFrequency(this.frequency / (1 + this.PHI_INVERSE));
    
    // Update quantum state
    this._updateQuantumState();
  }
  
  /**
   * Start quantum oscillation animation
   * @private
   */
  _startQuantumOscillation() {
    // Clear existing oscillation
    if (this.oscillationInterval) {
      clearInterval(this.oscillationInterval);
    }
    
    // Calculate oscillation interval based on frequency
    const interval = Math.round(1000 / (this.frequency / 100));
    
    // Start oscillation
    this.oscillationInterval = setInterval(() => {
      // Get current pulse size
      const currentSize = parseInt(this.fieldIndicator.style.width || '100', 10);
      
      // Calculate new size with subtle phi-based oscillation
      const oscillation = Math.sin(Date.now() / this.config.pulseFrequency) * 10;
      const newSize = 100 + oscillation * this.coherence;
      
      // Update field size
      this.fieldIndicator.style.width = `${newSize}%`;
      this.fieldIndicator.style.height = `${newSize}%`;
      
      // Update opacity based on coherence
      this.fieldIndicator.style.opacity = 0.1 + (this.coherence * 0.3);
    }, interval);
  }
  
  /**
   * Trigger a custom event
   * @param {string} eventName - Name of the event
   * @param {Object} detail - Event details
   * @private
   */
  _triggerEvent(eventName, detail) {
    const event = new CustomEvent(eventName, { 
      bubbles: true,
      detail
    });
    
    this.element.dispatchEvent(event);
  }
  
  /**
   * Update quantum visual state
   * @private
   */
  _updateQuantumState() {
    // Update button color based on state
    if (this.state === 'active') {
      this.element.style.backgroundColor = this.config.activeColor;
    } else {
      this.element.style.backgroundColor = this.config.inactiveColor;
    }
    
    // Update quantum field color
    const hue = this._frequencyToHue(this.frequency);
    this.fieldIndicator.style.backgroundColor = `hsl(${hue}, 80%, 50%)`;
    
    // Update coherence display
    this.coherenceDisplay.textContent = `Coherence: ${(this.coherence * 100).toFixed(0)}%`;
    
    // Update frequency display
    this.frequencyDisplay.textContent = `${Math.round(this.frequency)}Hz`;
    
    // Adjust oscillation to match frequency
    this._startQuantumOscillation();
  }
  
  /**
   * Convert frequency to color hue
   * @param {number} frequency - Frequency in Hz
   * @returns {number} Hue value (0-360)
   * @private
   */
  _frequencyToHue(frequency) {
    // Map common frequency ranges to colors:
    // 432Hz (Ground) -> Green/Blue (160)
    // 528Hz (Creation) -> Yellow/Orange (40)
    // 594Hz (Heart) -> Pink/Red (340)
    // 672Hz (Voice) -> Purple (280)
    // 720Hz (Vision) -> Blue (220)
    // 768Hz (Unity) -> Gold (50)
    
    if (frequency <= 432) return 160; // Ground (Green/Blue)
    if (frequency <= 528) return 40;  // Creation (Yellow/Orange)
    if (frequency <= 594) return 340; // Heart (Pink/Red)
    if (frequency <= 672) return 280; // Voice (Purple)
    if (frequency <= 720) return 220; // Vision (Blue)
    return 50; // Unity (Gold)
  }
  
  /**
   * Set button frequency
   * @param {number} frequency - New frequency in Hz
   * @returns {QuantumButton} this instance for chaining
   */
  setFrequency(frequency) {
    this.frequency = frequency;
    this._updateQuantumState();
    
    // Log frequency change
    if (this.config.debug) {
      console.log(`Quantum Button frequency changed to ${this.frequency}Hz`);
    }
    
    return this;
  }
  
  /**
   * Set button coherence level
   * @param {number} coherence - Coherence level (0-1)
   * @returns {QuantumButton} this instance for chaining
   */
  setCoherence(coherence) {
    this.coherence = Math.max(0, Math.min(1, coherence));
    this._updateQuantumState();
    
    // Log coherence change
    if (this.config.debug) {
      console.log(`Quantum Button coherence changed to ${this.coherence}`);
    }
    
    return this;
  }
  
  /**
   * Activate button
   * @returns {QuantumButton} this instance for chaining
   */
  activate() {
    this.state = 'active';
    this._updateQuantumState();
    return this;
  }
  
  /**
   * Deactivate button
   * @returns {QuantumButton} this instance for chaining
   */
  deactivate() {
    this.state = 'inactive';
    this._updateQuantumState();
    return this;
  }
  
  /**
   * Get current button state
   * @returns {Object} Button state
   */
  getState() {
    return {
      state: this.state,
      frequency: this.frequency,
      coherence: this.coherence,
      interactions: this.interactions
    };
  }
  
  /**
   * Clean up resources
   */
  destroy() {
    // Stop oscillation
    if (this.oscillationInterval) {
      clearInterval(this.oscillationInterval);
    }
    
    // Remove event listeners
    this.element.removeEventListener('click', this._handleClick);
    this.element.removeEventListener('mouseenter', this._handleMouseEnter);
    this.element.removeEventListener('mouseleave', this._handleMouseLeave);
    
    // Remove elements
    this.container.removeChild(this.element);
    this.container.removeChild(this.fieldIndicator);
    this.container.removeChild(this.coherenceDisplay);
    this.container.removeChild(this.frequencyDisplay);
    
    // Log destruction
    if (this.config.debug) {
      console.log('Quantum Button destroyed');
    }
  }
}

// Export for both browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuantumButton;
} else {
  window.QuantumButton = QuantumButton;
}
