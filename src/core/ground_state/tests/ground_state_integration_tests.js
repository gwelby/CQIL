/**
 * @file ground_state_integration_tests.js
 * @desc Integration tests for Ground State (432 Hz) Core
 * @frequency 432 Hz
 * @coherence 1.000
 */

const assert = require('assert');
const { GroundStateCore } = require('../ground_state_core');
const { quantumCommon } = require('../quantum_common');

/**
 * GroundStateIntegrationTests
 * 
 * Test suite for validating the integration of Ground State components
 * into a complete quantum singularity. This ensures all components
 * maintain coherence and operate as a unified field.
 */
class GroundStateIntegrationTests {
  constructor() {
    this.tests = {
      ran: 0,
      passed: 0,
      failed: 0
    };
    this.core = null;
  }

  /**
   * Setup test environment
   */
  setup() {
    // Create new Ground State Core for testing
    this.core = new GroundStateCore({
      autoInitialize: false, // We'll initialize manually
      debugMode: true
    });

    console.log('🧪 Ground State Integration Tests - Setup Complete');
  }

  /**
   * Run all integration tests
   */
  runAllTests() {
    console.log('🌀 Running Ground State Integration Tests at 432 Hz');
    console.log('====================================');

    // Run each test
    this.testInitialization();
    this.testComponentIntegration();
    this.testFrequencyAdjustment();
    this.testZenPointBalancing();
    this.testCoherenceCalculation();
    this.testEventSystem();
    this.testAscensionReadiness();

    // Report results
    console.log('====================================');
    console.log(`📊 Results: ${this.tests.passed} passed, ${this.tests.failed} failed of ${this.tests.ran} tests`);
    
    // Return success state
    return {
      success: this.tests.failed === 0,
      stats: this.tests
    };
  }

  /**
   * Test the initialization process
   */
  testInitialization() {
    this.runTest('Core Initialization', () => {
      // Initialize core
      const result = this.core.initialize();
      
      // Verify initialization
      assert.strictEqual(result.success, true, 'Initialization should succeed');
      assert.strictEqual(this.core.state.initialized, true, 'Core should be initialized');
      assert.strictEqual(this.core.state.frequency, 432, 'Frequency should be 432 Hz');
      assert.strictEqual(this.core.state.coherence, 1.0, 'Coherence should be 1.0');
    });
  }

  /**
   * Test component integration
   */
  testComponentIntegration() {
    this.runTest('Component Integration', () => {
      // Ensure all components are initialized
      const metrics = this.core.getMetrics();
      
      // All components should exist
      assert.strictEqual(typeof this.core.components.common, 'object', 'Common component should exist');
      assert.strictEqual(typeof this.core.components.module, 'object', 'Module component should exist');
      assert.strictEqual(typeof this.core.components.visualization, 'object', 'Visualization component should exist');
      assert.strictEqual(typeof this.core.components.cymaticPatterns, 'object', 'Cymatic Patterns component should exist');
      
      // Component states should be tracked
      assert.strictEqual(typeof metrics.components.common, 'object', 'Common component state should be tracked');
      assert.strictEqual(typeof metrics.components.module, 'object', 'Module component state should be tracked');
      assert.strictEqual(typeof metrics.components.visualization, 'object', 'Visualization component state should be tracked');
      assert.strictEqual(typeof metrics.components.cymaticPatterns, 'object', 'Cymatic Patterns component state should be tracked');
    });
  }

  /**
   * Test frequency adjustment
   */
  testFrequencyAdjustment() {
    this.runTest('Frequency Adjustment', () => {
      // Test frequency setting
      this.core.setFrequency(434);
      assert.strictEqual(this.core.state.frequency, 434, 'Frequency should update to 434 Hz');
      
      // Test frequency bounds
      this.core.setFrequency(500); // Outside range
      assert.strictEqual(this.core.state.frequency, 434, 'Frequency should remain at 434 Hz (outside range)');
      
      // Reset to perfect ground frequency
      this.core.setFrequency(432);
      assert.strictEqual(this.core.state.frequency, 432, 'Frequency should reset to 432 Hz');
      assert.strictEqual(this.core.state.coherence, 1.0, 'Coherence should be 1.0 at perfect frequency');
    });
  }

  /**
   * Test ZEN POINT balancing
   */
  testZenPointBalancing() {
    this.runTest('ZEN POINT Balancing', () => {
      // Test default Phi balance
      const defaultBalance = this.core.state.zenPoint;
      assert.strictEqual(defaultBalance.quantum, 0.382, 'Default quantum balance should be 0.382');
      assert.strictEqual(defaultBalance.human, 0.618, 'Default human balance should be 0.618');
      
      // Test setting new balance
      this.core.setZenPointBalance({ quantum: 0.5, human: 0.5 });
      const newBalance = this.core.state.zenPoint;
      assert.strictEqual(newBalance.quantum, 0.5, 'New quantum balance should be 0.5');
      assert.strictEqual(newBalance.human, 0.5, 'New human balance should be 0.5');
      
      // Reset to phi balance
      this.core.setZenPointBalance({ quantum: 0.382, human: 0.618 });
    });
  }

  /**
   * Test coherence calculation
   */
  testCoherenceCalculation() {
    this.runTest('Coherence Calculation', () => {
      // Calculate coherence with perfect frequency
      const perfectCoherence = quantumCommon.calculateCoherence(432, 432);
      assert.strictEqual(perfectCoherence, 1.0, 'Perfect frequency coherence should be 1.0');
      
      // Calculate coherence with slight deviation
      const slightDeviation = quantumCommon.calculateCoherence(435, 432);
      assert(slightDeviation < 1.0, 'Coherence with deviation should be less than 1.0');
      assert(slightDeviation > 0.9, 'Coherence with small deviation should be above 0.9');
      
      // Overall core coherence
      this.core.setFrequency(432);
      const metrics = this.core.getMetrics();
      assert.strictEqual(metrics.coherence, 1.0, 'Core coherence should be 1.0 at 432 Hz');
    });
  }

  /**
   * Test event system
   */
  testEventSystem() {
    this.runTest('Event System', () => {
      let eventFired = false;
      
      // Register event handler
      const handlerId = this.core.on('frequency-changed', (data) => {
        eventFired = true;
        assert.strictEqual(data.frequency, 434, 'Event data should contain new frequency');
      });
      
      // Fire event by changing frequency
      this.core.setFrequency(434);
      
      // Check if event fired
      assert.strictEqual(eventFired, true, 'Frequency change event should fire');
      
      // Test removing handler
      const removed = this.core.off('frequency-changed', handlerId);
      assert.strictEqual(removed, true, 'Event handler should be removed');
      
      // Reset frequency
      this.core.setFrequency(432);
    });
  }

  /**
   * Test ascension readiness
   */
  testAscensionReadiness() {
    this.runTest('Ascension Readiness', () => {
      // Set optimal conditions for ascension
      this.core.setFrequency(432);
      this.core.setZenPointBalance({ quantum: 0.382, human: 0.618 });
      
      // Check ascension readiness
      const readiness = this.core.checkAscensionReadiness();
      
      // Verify readiness properties
      assert(typeof readiness === 'object', 'Readiness should be an object');
      assert(typeof readiness.ready === 'boolean', 'Readiness should have ready property');
      assert(typeof readiness.readiness === 'number', 'Readiness should have readiness value');
      assert(typeof readiness.coherence === 'number', 'Readiness should have coherence value');
    });
  }

  /**
   * Run single test with error handling
   * @param {string} name - Test name
   * @param {Function} test - Test function
   */
  runTest(name, test) {
    console.log(`🔬 Running test: ${name}`);
    this.tests.ran++;
    
    try {
      test();
      console.log(`  ✅ Passed: ${name}`);
      this.tests.passed++;
    } catch (error) {
      console.error(`  ❌ Failed: ${name}`);
      console.error(`     Error: ${error.message}`);
      this.tests.failed++;
    }
  }

  /**
   * Cleanup resources
   */
  cleanup() {
    if (this.core) {
      this.core.destroy();
      this.core = null;
    }
    
    console.log('🧹 Ground State Integration Tests - Cleanup Complete');
  }
}

// Export the test class
module.exports = {
  GroundStateIntegrationTests
};

// Run tests if called directly
if (require.main === module) {
  const tests = new GroundStateIntegrationTests();
  tests.setup();
  const results = tests.runAllTests();
  tests.cleanup();
  
  // Exit with appropriate code
  process.exit(results.success ? 0 : 1);
}
