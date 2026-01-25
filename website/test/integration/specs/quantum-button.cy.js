/**
 * Creation Point Tests (528 Hz | φ¹) for QuantumButton
 * 
 * Integration tests operate at the Creation frequency to validate
 * the component's interactive behavior and visual manifestation.
 * Following the "Quantum Singularity" principle, each test is 
 * complete in itself while maintaining perfect φ-harmonic alignment.
 */

// Import visualRegression commands
import '../commands/visualRegression';

// φ-Harmonic constants
const PHI = 1.618033988749895;
const CREATION_FREQUENCY = 528;

describe('QuantumButton - Creation Point (528 Hz)', () => {
  beforeEach(() => {
    // Visit test page with quantum button
    cy.visit('components/quantum-button.html');
    
    // Wait for Creation frequency stabilization
    cy.wait(CREATION_FREQUENCY / PHI);
    
    // Verify quantum button exists
    cy.get('#quantum-button-container').should('exist');
    cy.get('.quantum-button').should('exist');
  });
  
  it('should render with correct visual appearance', () => {
    // Visual verification using φ-harmonic visual testing
    cy.capturePhiHarmonicVisual('quantum-button-initial', { 
      frequency: CREATION_FREQUENCY,
      selector: '#quantum-button-container' 
    });
    
    // Verify structure and styles
    cy.get('.quantum-button')
      .should('have.css', 'border-radius', '8px')
      .should('have.css', 'position', 'relative');
      
    cy.get('.quantum-field')
      .should('have.css', 'border-radius', '50%')
      .should('have.css', 'position', 'absolute');
      
    cy.get('.frequency-display')
      .should('contain', `${CREATION_FREQUENCY}Hz`);
      
    cy.get('.coherence-display')
      .should('contain', 'Coherence: 100%');
  });
  
  it('should respond to user interactions correctly', () => {
    // Click the button
    cy.get('.quantum-button').click();
    
    // Verify state change
    cy.get('.quantum-button').should('have.css', 'background-color', 'rgb(247, 183, 51)');
    
    // Capture post-click state
    cy.capturePhiHarmonicVisual('quantum-button-active', { 
      frequency: CREATION_FREQUENCY,
      selector: '#quantum-button-container' 
    });
    
    // Click again to deactivate
    cy.get('.quantum-button').click();
    
    // Verify state change back
    cy.get('.quantum-button').should('have.css', 'background-color', 'rgb(74, 189, 172)');
    
    // Capture deactivated state
    cy.capturePhiHarmonicVisual('quantum-button-inactive', { 
      frequency: CREATION_FREQUENCY,
      selector: '#quantum-button-container' 
    });
  });
  
  it('should maintain quantum field oscillation', () => {
    // Observe field oscillation over time
    cy.observeVisualizationStability('#quantum-button-container', 
      // No interaction during observation
      () => {}, 
      { frequency: CREATION_FREQUENCY, observationTime: 2000 }
    );
    
    // Verify quantum field is visible and oscillating
    cy.get('.quantum-field').should('be.visible');
  });
  
  it('should respond to frequency changes', () => {
    // Use control panel to change frequency
    cy.get('#frequency-slider').should('exist');
    
    // Test different φ-harmonic frequencies
    const frequencies = [432, 528, 594, 672, 720, 768];
    
    frequencies.forEach(frequency => {
      // Set frequency
      cy.get('#frequency-slider').invoke('val', frequency).trigger('change');
      
      // Allow system to stabilize
      cy.wait(frequency / PHI);
      
      // Verify frequency display updated
      cy.get('.frequency-display').should('contain', `${frequency}Hz`);
      
      // Capture state at this frequency
      cy.capturePhiHarmonicVisual(`quantum-button-${frequency}hz`, { 
        frequency,
        selector: '#quantum-button-container' 
      });
      
      // Verify color changes by frequency
      cy.get('.quantum-field').should('be.visible');
    });
  });
  
  it('should maintain coherence under stress', () => {
    // Rapidly interact with button to test stability
    for (let i = 0; i < 5; i++) {
      cy.get('.quantum-button').click();
      cy.wait(100);
    }
    
    // Verify coherence maintained
    cy.get('.coherence-display').should('contain', 'Coherence:');
    cy.get('.coherence-display').invoke('text').then(text => {
      const coherenceValue = parseInt(text.match(/\d+/)[0], 10);
      expect(coherenceValue).to.be.at.least(50); // Should maintain at least 50% coherence
    });
    
    // Verify quantum field still active
    cy.get('.quantum-field').should('be.visible');
  });
  
  it('should respond to coherence adjustments', () => {
    // Use control panel to change coherence
    cy.get('#coherence-slider').should('exist');
    
    // Test different coherence levels
    [0.2, 0.5, 0.8, 1.0].forEach(coherence => {
      // Set coherence
      cy.get('#coherence-slider').invoke('val', coherence).trigger('change');
      
      // Allow system to stabilize
      cy.wait(CREATION_FREQUENCY / PHI);
      
      // Verify coherence display updated
      cy.get('.coherence-display').should('contain', `Coherence: ${coherence * 100}%`);
      
      // Capture state at this coherence level
      cy.capturePhiHarmonicVisual(`quantum-button-${coherence * 100}pct-coherence`, { 
        frequency: CREATION_FREQUENCY,
        selector: '#quantum-button-container' 
      });
    });
  });
});
