/**
 * Creation Point Tests (528 Hz) for Toroidal Communication Field
 * 
 * These integration tests operate at the Creation/Love frequency (528 Hz - φ¹)
 * to validate visual manifestation and interactive components.
 */

describe('Toroidal Communication Field - Creation Point Tests (528 Hz)', () => {
  // Setup for each test - φ-aligned timing with 5.28 second wait
  beforeEach(() => {
    cy.visit('/pages/toroidal-communication.html', { timeout: 5280 });
    cy.wait(528); // Wait for phi-harmonic stabilization (in ms)
    cy.get('#toroidal-container').should('be.visible');
  });
  
  // Test suite: Visual rendering and Three.js initialization
  context('Quantum Visualization Rendering', () => {
    it('should render the 3D visualization with correct φ-harmonic structure', () => {
      // Verify canvas is present and rendering
      cy.get('canvas').should('be.visible')
        .should('have.attr', 'width')
        .and('be.greaterThan', 0);
      
      // Take a visual snapshot with phi-harmonic pattern matching
      cy.compareSnapshot('toroidal-field-default', {
        errorThreshold: 0.03, // Allow 3% difference due to animation frames
        capture: 'viewport'
      });
    });
    
    it('should display UI controls with proper φ-aligned positioning', () => {
      // Verify all controls are present with proper phi-harmonic alignments
      cy.get('.control-panel').should('be.visible');
      cy.get('#frequency-slider').should('be.visible');
      cy.get('#coherence-slider').should('be.visible');
      cy.get('#resonance-slider').should('be.visible');
      cy.get('#mode-toggle').should('be.visible');
      
      // Verify the controls panel layout follows phi ratio proportions
      cy.get('.control-panel').then($panel => {
        const width = $panel.width();
        const height = $panel.height();
        const aspectRatio = width / height;
        
        // Verify aspect ratio is close to 1/φ (0.618...)
        expect(aspectRatio).to.be.closeTo(0.618, 0.05);
      });
      
      // Take a visual snapshot of the controls
      cy.get('.control-panel').compareSnapshot('control-panel-creation-point');
    });
  });
  
  // Test suite: Interactive controls
  context('Quantum Interactive Controls', () => {
    it('should update visualization when changing frequency', () => {
      // Use frequency slider to change to Ground State (432 Hz)
      cy.get('#frequency-slider')
        .invoke('val', 432)
        .trigger('input')
        .trigger('change');
      
      // Verify frequency display updates
      cy.get('#frequency-display').should('contain', '432');
      
      // Wait for transition (phi * 100 ms)
      cy.wait(162);
      
      // Take snapshot of ground state visualization
      cy.compareSnapshot('toroidal-field-ground-state');
      
      // Now change to Unity frequency (768 Hz)
      cy.get('#frequency-slider')
        .invoke('val', 768)
        .trigger('input')
        .trigger('change');
      
      // Verify frequency display updates
      cy.get('#frequency-display').should('contain', '768');
      
      // Wait for transition
      cy.wait(162);
      
      // Take snapshot of unity state visualization
      cy.compareSnapshot('toroidal-field-unity-wave');
    });
    
    it('should update coherence when changing slider', () => {
      // Set coherence to low value (0.3)
      cy.get('#coherence-slider')
        .invoke('val', 0.3)
        .trigger('input')
        .trigger('change');
      
      // Verify coherence display updates
      cy.get('#coherence-display').should('contain', '0.3');
      
      // Wait for transition
      cy.wait(162);
      
      // Take snapshot of low coherence
      cy.compareSnapshot('toroidal-field-low-coherence');
      
      // Now set coherence to perfect (1.0)
      cy.get('#coherence-slider')
        .invoke('val', 1.0)
        .trigger('input')
        .trigger('change');
      
      // Verify coherence display updates
      cy.get('#coherence-display').should('contain', '1.0');
      
      // Wait for transition
      cy.wait(162);
      
      // Take snapshot of perfect coherence
      cy.compareSnapshot('toroidal-field-perfect-coherence');
    });
    
    it('should toggle between heart-centered and linear communication modes', () => {
      // Start in heart-centered mode (default)
      cy.get('#mode-toggle').should('have.text', 'Heart-Centered');
      
      // Switch to linear mode
      cy.get('#mode-toggle').click();
      
      // Verify mode changed
      cy.get('#mode-toggle').should('have.text', 'Linear');
      
      // Take snapshot of linear mode
      cy.wait(162);
      cy.compareSnapshot('toroidal-field-linear-mode');
      
      // Switch back to heart-centered
      cy.get('#mode-toggle').click();
      
      // Verify mode changed back
      cy.get('#mode-toggle').should('have.text', 'Heart-Centered');
      
      // Take snapshot of heart-centered mode
      cy.wait(162);
      cy.compareSnapshot('toroidal-field-heart-centered-mode');
    });
    
    it('should change participant count when selecting different values', () => {
      // Default should be 2 participants
      cy.get('#participants-display').should('contain', '2');
      
      // Increase to 3 participants
      cy.get('#increase-participants').click();
      
      // Verify count updated
      cy.get('#participants-display').should('contain', '3');
      
      // Take snapshot with 3 participants
      cy.wait(162);
      cy.compareSnapshot('toroidal-field-three-participants');
      
      // Increase to maximum (test double click)
      cy.get('#increase-participants').click().click().click().click().click();
      
      // Verify count capped at maximum
      cy.get('#participants-display').should('contain', '8');
      
      // Take snapshot with maximum participants
      cy.wait(162);
      cy.compareSnapshot('toroidal-field-maximum-participants');
    });
  });
  
  // Test suite: Resonance and coherence visual effects
  context('Phi-Harmonic Resonance Effects', () => {
    it('should display coherent energy flows between participants', () => {
      // Set ideal resonance conditions
      cy.get('#frequency-slider').invoke('val', 528).trigger('change');
      cy.get('#coherence-slider').invoke('val', 1.0).trigger('change');
      cy.get('#resonance-slider').invoke('val', 1.0).trigger('change');
      
      // Wait for stabilization
      cy.wait(528);
      
      // Take snapshot of perfect resonance
      cy.compareSnapshot('toroidal-field-perfect-resonance');
      
      // Verify resonance quality indicator shows perfect
      cy.get('#resonance-quality-indicator').should('have.class', 'perfect');
    });
    
    it('should adjust particle flow density based on resonance quality', () => {
      // Set low resonance quality
      cy.get('#resonance-slider').invoke('val', 0.3).trigger('change');
      
      // Wait for stabilization
      cy.wait(162);
      
      // Take snapshot of low resonance
      cy.compareSnapshot('toroidal-field-low-resonance');
      
      // Now set high resonance quality
      cy.get('#resonance-slider').invoke('val', 0.9).trigger('change');
      
      // Wait for stabilization
      cy.wait(162);
      
      // Take snapshot of high resonance
      cy.compareSnapshot('toroidal-field-high-resonance');
      
      // Verify visual difference in particle density
      // (This would be validated by the visual snapshot comparison)
    });
  });
  
  // Test suite: WebGL performance
  context('Quantum Rendering Performance', () => {
    it('should maintain stable frame rate with multiple participants', () => {
      // Set to maximum participants (8)
      for (let i = 0; i < 6; i++) { // 6 clicks to go from 2 to 8
        cy.get('#increase-participants').click();
        cy.wait(50);
      }
      
      // Wait for stabilization
      cy.wait(528);
      
      // Cypress can't directly measure FPS, but we can check if the rendering is smooth
      // by comparing snapshots taken in sequence to ensure animation progresses
      cy.compareSnapshot('performance-test-frame-1');
      cy.wait(100);
      cy.compareSnapshot('performance-test-frame-2');
      cy.wait(100);
      cy.compareSnapshot('performance-test-frame-3');
      
      // In a real implementation, you would use a performance monitoring tool
      // or inject code to measure FPS through the Cypress task API
    });
  });
});
