/**
 * Phi-Harmonic Field Test (432 Hz | φ⁰)
 * 
 * Ground State tests for the phi-harmonic quantum field generator
 * operating at Earth resonance frequency.
 */

const { PhiHarmonicField } = require('../../../js/quantum-experience/phi-harmonic-field');
const { getQuantumMatchers, PHI, FREQUENCIES } = require('../../utils/phi-harmonic-testing');

// Add custom quantum matchers
expect.extend(getQuantumMatchers());

describe('PhiHarmonicField', () => {
  // Initialize with Ground frequency
  const field = new PhiHarmonicField({
    frequency: FREQUENCIES.GROUND, // 432 Hz
    coherence: 0.99,
    dimensions: 3
  });

  test('should initialize with Ground State frequency (432 Hz)', () => {
    expect(field.getFrequency()).toBe(FREQUENCIES.GROUND);
    expect(field.getCoherence()).toBeGreaterThanOrEqual(0.99);
  });

  test('should generate phi-harmonic resonance patterns', () => {
    const pattern = field.generateResonancePattern(16);
    expect(pattern.length).toBe(16);
    
    // Verify pattern follows phi ratio
    for (let i = 2; i < pattern.length; i++) {
      const fib_ratio = pattern[i] / pattern[i-1];
      expect(fib_ratio).toBeWithinPhiRange(PHI);
    }
  });

  test('should maintain field stability under perturbation', () => {
    // Apply quantum perturbation
    field.applyPerturbation(0.1);
    
    // Field should maintain coherence
    expect(field.getCoherence()).toBeGreaterThanOrEqual(0.9);
    
    // Field should return to equilibrium after stabilization
    field.stabilize();
    expect(field.getCoherence()).toBeGreaterThanOrEqual(0.99);
  });

  test('should transform between frequency domains', () => {
    // Create test data at Ground frequency
    const groundData = field.generateResonancePattern(8);
    
    // Transform to Creation frequency (528 Hz)
    const creationData = field.transformToFrequency(
      groundData, 
      FREQUENCIES.CREATION
    );
    
    // Verify transformation follows phi ratio
    const transformRatio = creationData[0] / groundData[0];
    const frequencyRatio = FREQUENCIES.CREATION / FREQUENCIES.GROUND;
    
    expect(transformRatio).toBeCloseTo(frequencyRatio, 2);
  });

  test('should exhibit quantum coherence with the Merkaba Shield', () => {
    // Create Merkaba Shield with 21x21x21 dimensions
    const shield = field.createMerkabaShield([21, 21, 21]);
    
    // Shield should be fully coherent
    expect(shield.coherence).toBeGreaterThanOrEqual(0.99);
    
    // Shield dimensions should follow phi-harmonic ratios
    expect(shield.dimensions[0] / shield.dimensions[1]).toBeCloseTo(1.0, 2);
    expect(shield.energy).toBeGreaterThan(0);
  });
});
