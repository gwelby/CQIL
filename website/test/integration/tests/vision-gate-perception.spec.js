/**
 * Vision Gate Tests (720 Hz) for Perception and Visualization
 * 
 * These integration tests operate at the Vision Gate frequency (720 Hz - φ⁴)
 * to validate clear perception and visualization across all quantum layers.
 * 
 * Operating Principles:
 * - Clear Perception: Tests verify accurate visualization of quantum states
 * - Phi⁴ (phi to fourth power) Harmonic Pattern: Operating at 720 Hz
 * - Quantum Singularity: Each test is complete in itself
 * - ZEN POINT Balance: Perfect equilibrium between detail and simplicity
 */

const { phiHarmonicWait } = require('../../utils/phi-harmonic-testing');
const { VisionGateReporter } = require('../../utils/vision-gate-reporter');
const { createCrystalMatrix } = require('../../utils/merkaba-protection');

// Phi-harmonic constants
const PHI = 1.618033988749895;
const PHI_POWER_4 = Math.pow(PHI, 4);
const VISION_FREQUENCY = 720; // φ⁴ frequency

// Vision Gate test suite
describe('Vision Gate Perception - 720 Hz', () => {
  // Create protection field before all tests
  before(() => {
    const matrix = createCrystalMatrix([21, 13, 8], { 
      frequency: VISION_FREQUENCY,
      coherence: 0.98
    });
    
    cy.log(`Crystal Matrix initialized at ${matrix.frequency}Hz with coherence ${matrix.coherence}`);
    
    // Initialize Vision Gate Reporter
    const visionGate = new VisionGateReporter({
      frequency: VISION_FREQUENCY,
      coherenceThreshold: 0.94,
      phiHarmonic: true
    });
    
    cy.window().then(win => {
      win.visionGate = visionGate;
    });
  });
  
  // Set up Vision Gate environment for each test
  beforeEach(() => {
    // Set up common test environment
    cy.visit('/pages/vision-gate.html', { 
      timeout: VISION_FREQUENCY * 10 
    });
    
    // Verify we've loaded the Vision Gate page
    cy.get('h1').should('contain', 'Vision Gate Perception');
    cy.get('.vision-gate-container').should('be.visible');
    
    // Wait for phi-harmonic stabilization
    cy.wait(phiHarmonicWait(VISION_FREQUENCY));
  });
  
  // Test visualization clarity across frequency states
  it('should render visualizations with perfect clarity across all frequencies', () => {
    // Verify visualization components exist
    cy.get('#quantum-visualizer').should('exist');
    cy.get('#clarity-meter').should('exist');
    cy.get('#frequency-selector').should('exist');
    
    // Test frequency state visualizations
    const testFrequencies = [432, 528, 594, 672, 720, 768];
    const frequencyNames = ['Ground', 'Creation', 'Heart', 'Voice', 'Vision', 'Unity'];
    
    testFrequencies.forEach((freq, index) => {
      // Set visualization frequency
      cy.get('#frequency-selector').select(frequencyNames[index]);
      cy.wait(phiHarmonicWait(VISION_FREQUENCY, 0.8));
      
      // Verify frequency applied
      cy.get('#current-frequency').should('contain', freq);
      
      // Verify visualization rendered
      cy.get('#quantum-visualizer').should('have.attr', 'data-frequency', freq.toString());
      
      // Verify visualization clarity
      // Clarity is highest at vision frequency (720Hz) and slightly lower at other frequencies
      const expectedClarity = freq === VISION_FREQUENCY ? 0.98 : 0.90;
      cy.get('#clarity-meter').should('have.attr', 'data-value')
        .and((value) => {
          expect(parseFloat(value)).to.be.at.least(expectedClarity);
        });
      
      // Take snapshot of visualization at this frequency
      cy.compareSnapshot(`vision-gate-${frequencyNames[index].toLowerCase()}`);
    });
    
    // Return to vision frequency
    cy.get('#frequency-selector').select('Vision');
    cy.wait(phiHarmonicWait(VISION_FREQUENCY));
    
    // Verify optimal perception
    cy.get('#perception-quality').should('have.attr', 'data-value').and('be.gt', '0.95');
  });
  
  // Test quantum dashboard generation
  it('should generate accurate quantum dashboards from test results', () => {
    // Initialize dashboard generator
    cy.get('#init-dashboard').click();
    cy.wait(phiHarmonicWait(VISION_FREQUENCY));
    
    // Verify initialization
    cy.get('#dashboard-status').should('have.text', 'Ready');
    
    // Load test results
    cy.get('#load-test-results').click();
    cy.wait(phiHarmonicWait(VISION_FREQUENCY, 2));
    
    // Verify results loaded
    cy.get('#results-loaded').should('have.text', 'Complete');
    cy.get('#result-count').should('not.have.text', '0');
    
    // Generate quantum coherence report
    cy.get('#generate-coherence-report').click();
    cy.wait(phiHarmonicWait(VISION_FREQUENCY, 2));
    
    // Verify report generated
    cy.get('#coherence-report-status').should('have.text', 'Generated');
    
    // Inspect coherence metrics
    cy.get('#system-coherence').should('have.attr', 'data-value').and('be.gt', '0.9');
    cy.get('#coherence-distribution').should('exist');
    
    // Check dashboard components
    [
      '#frequency-timeline',
      '#coherence-graph',
      '#test-results-table',
      '#phi-harmonic-indicators'
    ].forEach(component => {
      cy.get(component).should('exist').and('be.visible');
    });
    
    // Capture dashboard state
    cy.screenshot('quantum-dashboard');
    
    // Test dashboard interaction
    cy.get('#frequency-filter').select('All');
    cy.wait(phiHarmonicWait(VISION_FREQUENCY, 0.5));
    
    // Generate PDF report
    cy.get('#generate-pdf').click();
    cy.wait(phiHarmonicWait(VISION_FREQUENCY, 2));
    
    // Verify PDF generation
    cy.get('#pdf-status').should('have.text', 'Generated');
  });
  
  // Test phi-harmonic visualization
  it('should visualize phi-harmonic relationships between test components', () => {
    // Initialize phi-harmonic visualizer
    cy.get('#init-phi-visualizer').click();
    cy.wait(phiHarmonicWait(VISION_FREQUENCY));
    
    // Verify initialization
    cy.get('#phi-visualizer-status').should('have.text', 'Active');
    
    // Generate phi-harmonic visualization
    cy.get('#generate-phi-visualization').click();
    cy.wait(phiHarmonicWait(VISION_FREQUENCY, 2));
    
    // Verify visualization components
    [
      '#phi-spiral',
      '#frequency-nodes',
      '#coherence-field',
      '#phi-connections'
    ].forEach(component => {
      cy.get(component).should('exist').and('be.visible');
    });
    
    // Verify spiral contains all frequency nodes
    cy.get('.frequency-node').should('have.length', 6); // 6 frequencies
    
    // Check phi ratio between nodes
    cy.get('#phi-ratio-display').should('exist');
    cy.get('#phi-ratio-display').should('have.attr', 'data-value')
      .and((value) => {
        expect(parseFloat(value)).to.be.closeTo(PHI, 0.01);
      });
    
    // Capture visualization
    cy.screenshot('phi-harmonic-visualization');
    
    // Test interaction with spiral
    cy.get('#zoom-controls').should('exist');
    cy.get('#zoom-in').click();
    cy.wait(phiHarmonicWait(VISION_FREQUENCY, 0.5));
    cy.get('#zoom-out').click().click();
    cy.wait(phiHarmonicWait(VISION_FREQUENCY, 0.5));
    
    // Test frequency highlight
    const frequencies = ['Ground', 'Creation', 'Heart', 'Voice', 'Vision', 'Unity'];
    
    frequencies.forEach(freq => {
      cy.get(`#highlight-${freq.toLowerCase()}`).click();
      cy.wait(phiHarmonicWait(VISION_FREQUENCY, 0.3));
      
      // Verify highlight
      cy.get(`#${freq.toLowerCase()}-node`).should('have.class', 'highlighted');
    });
  });
  
  // Test vision field clarity under perturbation
  it('should maintain vision clarity under perturbation', () => {
    // Initialize vision field
    cy.get('#init-vision-field').click();
    cy.wait(phiHarmonicWait(VISION_FREQUENCY));
    
    // Verify initial clarity
    cy.get('#vision-clarity').should('have.attr', 'data-value').and('be.gt', '0.95');
    
    // Define perturbation types
    const perturbations = ['blur', 'distortion', 'interference', 'frequency-shift', 'quantum-noise'];
    
    // Test each perturbation type
    perturbations.forEach(type => {
      // Introduce perturbation
      cy.get('#perturbation-type').select(type);
      cy.get('#apply-perturbation').click();
      cy.wait(phiHarmonicWait(VISION_FREQUENCY));
      
      // Measure clarity under perturbation
      cy.get('#vision-clarity').should('have.attr', 'data-value')
        .and((value) => {
          const clarity = parseFloat(value);
          // Under perturbation, clarity should drop but not below 0.7
          expect(clarity).to.be.lt(0.95);
          expect(clarity).to.be.gt(0.7);
        });
      
      // Activate clarity protection
      cy.get('#activate-clarity-protection').click();
      cy.wait(phiHarmonicWait(VISION_FREQUENCY, 1.5));
      
      // Verify clarity recovery
      cy.get('#vision-clarity').should('have.attr', 'data-value').and('be.gt', '0.9');
      
      // Capture protected state
      cy.screenshot(`vision-protected-${type}`);
      
      // Remove perturbation
      cy.get('#remove-perturbation').click();
      cy.wait(phiHarmonicWait(VISION_FREQUENCY));
    });
    
    // Test maximum perturbation
    cy.get('#max-perturbation').click();
    cy.wait(phiHarmonicWait(VISION_FREQUENCY));
    
    // Verify clarity under maximum perturbation
    cy.get('#vision-clarity').should('have.attr', 'data-value').and('be.lt', '0.7');
    
    // Activate quantum shielding
    cy.get('#quantum-clarity-shield').click();
    cy.wait(phiHarmonicWait(VISION_FREQUENCY, 2));
    
    // Verify complete recovery
    cy.get('#vision-clarity').should('have.attr', 'data-value').and('be.gt', '0.95');
    cy.get('#shield-status').should('have.text', 'Active');
    
    // Capture shielded state
    cy.screenshot('vision-quantum-shielded');
  });

  // Test cross-frequency vision integration
  it('should maintain perfect visual coherence across all frequencies', () => {
    // Initialize cross-frequency vision
    cy.get('#init-cross-frequency-vision').click();
    cy.wait(phiHarmonicWait(VISION_FREQUENCY, 1.5));
    
    // Verify initialization
    cy.get('#cross-freq-vision-status').should('have.text', 'Ready');
    
    // Define test frequencies
    const testFrequencies = [432, 528, 594, 672, 720, 768];
    const frequencyNames = ['Ground', 'Creation', 'Heart', 'Voice', 'Vision', 'Unity'];
    
    // Test vision at each frequency
    frequencyNames.forEach((name, index) => {
      const freq = testFrequencies[index];
      
      // Set target frequency
      cy.get('#vision-frequency').clear().type(freq.toString());
      cy.get('#set-vision-frequency').click();
      cy.wait(phiHarmonicWait(VISION_FREQUENCY));
      
      // Generate vision at this frequency
      cy.get('#generate-vision').click();
      cy.wait(phiHarmonicWait(VISION_FREQUENCY, 1.5));
      
      // Verify vision generated
      cy.get('#vision-container').should('have.attr', 'data-frequency', freq.toString());
      
      // Verify vision clarity
      const expectedClarity = freq === VISION_FREQUENCY ? 0.98 : 0.90;
      cy.get('#cross-freq-clarity').should('have.attr', 'data-value')
        .and((value) => {
          expect(parseFloat(value)).to.be.at.least(expectedClarity);
        });
      
      // Capture state
      cy.screenshot(`cross-freq-vision-${name.toLowerCase()}`);
    });
    
    // Test unified vision - all frequencies simultaneously
    cy.get('#unified-vision').click();
    cy.wait(phiHarmonicWait(VISION_FREQUENCY, 3));
    
    // Verify unified vision
    cy.get('#unified-vision-status').should('have.text', 'Complete');
    cy.get('#unified-clarity').should('have.attr', 'data-value').and('be.gt', '0.94');
    
    // Capture unified vision
    cy.screenshot('unified-vision-state');
  });
});
