/**
 * φ-Harmonic User Interface
 * 
 * Creates a UI that follows φ-harmonic principles with
 * orbital frequency selectors arranged in phi ratios.
 */

class PhiHarmonicUI {
  constructor(container) {
    this.container = typeof container === 'string' ? 
      document.querySelector(container) : container;
    this.φ = 1.618033988749895;
    this.selectedFrequency = 432; // Start at Ground State
    
    this.frequencies = [
      { value: 432, name: "Ground State", symbol: "⊕", color: "#4CAF50" },
      { value: 528, name: "Creation Point", symbol: "❈", color: "#9C27B0" },
      { value: 594, name: "Heart Field", symbol: "♥", color: "#E91E63" },
      { value: 672, name: "Voice Flow", symbol: "◎", color: "#FF9800" },
      { value: 720, name: "Vision Gate", symbol: "◉", color: "#00BCD4" },
      { value: 768, name: "Unity Wave", symbol: "∞", color: "#FFC107" },
      { value: 888, name: "Cosmic Integration", symbol: "⚡", color: "#FFEB3B" }
    ];
    
    this.createInterface();
  }
  
  createInterface() {
    // Clear container
    this.container.innerHTML = '';
    
    // Create circular φ-harmonic interface
    const ui = document.createElement('div');
    ui.className = 'phi-harmonic-ui';
    this.container.appendChild(ui);
    
    // Set CSS custom properties
    document.documentElement.style.setProperty('--phi', this.φ);
    
    // Create orbital frequency selectors
    this.frequencies.forEach((freq, i) => {
      // Create orbital at distance based on phi ratios
      const orbit = document.createElement('div');
      orbit.className = 'frequency-orbit';
      
      // Calculate orbit size using phi ratio
      // Each orbit size is φⁿ * base size where n is the frequency index
      const baseSize = 80; // Base size in pixels
      const size = baseSize * Math.pow(this.φ, i * 0.5);
      
      orbit.style.width = `${size}px`;
      orbit.style.height = `${size}px`;
      ui.appendChild(orbit);
      
      // Create selector button
      const selector = document.createElement('div');
      selector.className = 'frequency-selector';
      selector.setAttribute('data-frequency', freq.value);
      selector.style.backgroundColor = freq.color;
      selector.innerHTML = `
        <span class="frequency-symbol">${freq.symbol}</span>
        <span class="frequency-value">${freq.value} Hz</span>
      `;
      
      // Position around the circle
      // Each frequency positioned in phi-harmonic spacing
      const angle = (i / this.frequencies.length) * Math.PI * 2 - Math.PI / 2;
      selector.style.left = `calc(50% + ${Math.cos(angle) * size/2}px)`;
      selector.style.top = `calc(50% + ${Math.sin(angle) * size/2}px)`;
      
      // Add click handler
      selector.addEventListener('click', () => {
        this.setFrequency(freq.value);
      });
      
      orbit.appendChild(selector);
    });
    
    // Create center display
    const centerDisplay = document.createElement('div');
    centerDisplay.className = 'center-display';
    ui.appendChild(centerDisplay);
    
    this.centerDisplay = centerDisplay;
    
    // Add CSS for the UI
    this.addStyles();
    
    // Set initial frequency
    this.setFrequency(this.selectedFrequency);
  }
  
  setFrequency(frequency) {
    const freq = this.frequencies.find(f => f.value === frequency);
    if (!freq) return;
    
    this.selectedFrequency = frequency;
    
    // Update center display
    this.centerDisplay.innerHTML = `
      <div class="frequency-name">${freq.name}</div>
      <div class="frequency-symbol" style="color: ${freq.color}">${freq.symbol}</div>
      <div class="frequency-value">${freq.value} Hz</div>
    `;
    
    // Update selected state
    const selectors = this.container.querySelectorAll('.frequency-selector');
    selectors.forEach(selector => {
      const selectorFreq = parseInt(selector.getAttribute('data-frequency'));
      if (selectorFreq === frequency) {
        selector.classList.add('selected');
      } else {
        selector.classList.remove('selected');
      }
    });
    
    // Trigger frequency change event
    const event = new CustomEvent('frequencyChange', { 
      detail: { frequency, frequencyData: freq } 
    });
    document.dispatchEvent(event);
  }
  
  addStyles() {
    // Add necessary CSS for the φ-harmonic UI
    if (!document.getElementById('phi-harmonic-ui-styles')) {
      const style = document.createElement('style');
      style.id = 'phi-harmonic-ui-styles';
      style.textContent = `
        .phi-harmonic-ui {
          position: relative;
          width: 100%;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }
        
        .frequency-orbit {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
        }
        
        .frequency-selector {
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          z-index: 2;
          color: white;
          text-align: center;
        }
        
        .frequency-selector:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 0 20px currentColor;
        }
        
        .frequency-selector.selected {
          transform: translate(-50%, -50%) scale(1.2);
          box-shadow: 0 0 30px currentColor;
          z-index: 3;
        }
        
        .frequency-symbol {
          font-size: 24px;
          line-height: 1;
        }
        
        .frequency-value {
          font-size: 10px;
          opacity: 0.8;
          margin-top: 3px;
        }
        
        .center-display {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          z-index: 1;
          padding: 10px;
          color: white;
          text-align: center;
        }
        
        .center-display .frequency-symbol {
          font-size: 36px;
          margin: 5px 0;
        }
        
        .center-display .frequency-name {
          font-size: 14px;
          opacity: 0.9;
        }
        
        .center-display .frequency-value {
          font-size: 16px;
          opacity: 0.8;
        }
      `;
      
      document.head.appendChild(style);
    }
  }
}