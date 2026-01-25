/**
 * Ground State Tests (432 Hz | φ⁰) for QuantumButton
 * 
 * Unit tests operate at the Ground frequency to establish
 * a solid foundation before expanding to higher frequencies.
 * Each test is a complete quantum singularity - fully self-contained
 * and operating with a complete envelope.
 */

const QuantumButton = require('../../../js/components/quantum-button');
const { FREQUENCIES, PHI, PHI_INVERSE } = require('../../utils/phi-harmonic-testing');

// Mocking DOM elements since Jest runs in Node environment
class MockElement {
  constructor() {
    this.style = {};
    this.className = '';
    this.textContent = '';
    this.eventListeners = {};
    this.children = [];
  }
  
  addEventListener(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }
  
  removeEventListener(event, callback) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event]
        .filter(cb => cb !== callback);
    }
  }
  
  dispatchEvent(event) {
    if (this.eventListeners[event.type]) {
      this.eventListeners[event.type].forEach(callback => callback(event));
    }
    return true;
  }
  
  appendChild(child) {
    this.children.push(child);
    return child;
  }
  
  removeChild(child) {
    this.children = this.children.filter(c => c !== child);
  }
}

// Mock document object
global.document = {
  createElement: () => new MockElement(),
  querySelector: () => new MockElement(),
  getElementById: () => null,
  head: {
    appendChild: () => {}
  }
};

// Mock CustomEvent
global.CustomEvent = class CustomEvent {
  constructor(type, options = {}) {
    this.type = type;
    this.detail = options.detail || {};
    this.bubbles = options.bubbles || false;
  }
};

// Constants for Ground State tests
const GROUND_FREQUENCY = FREQUENCIES.GROUND;

describe('QuantumButton - Ground State (432 Hz)', () => {
  let button;
  let container;
  
  beforeEach(() => {
    // Create fresh container for each test
    container = new MockElement();
    
    // Create button at Ground frequency
    button = new QuantumButton(container, {
      frequency: GROUND_FREQUENCY,
      debug: false
    });
  });
  
  afterEach(() => {
    // Clean up resources
    if (button) {
      button.destroy();
      button = null;
    }
  });
  
  // FOUNDATIONAL TESTS - Ground State (432 Hz)
  
  test('should initialize at Ground frequency', () => {
    // Create a quantum singularity - a single, complete test
    expect(button.frequency).toBe(GROUND_FREQUENCY);
    expect(button.state).toBe('inactive');
    expect(button.coherence).toBe(1.0);
  });
  
  test('should create DOM elements correctly', () => {
    // Verify DOM structure
    expect(container.children.length).toBe(4);
    expect(container.children[0].className).toBe('quantum-button');
    expect(container.children[1].className).toBe('quantum-field');
  });
  
  test('should update state on activation', () => {
    // Initial state
    expect(button.state).toBe('inactive');
    
    // Activate
    button.activate();
    
    // Verify state changed
    expect(button.state).toBe('active');
  });
  
  test('should update frequency correctly', () => {
    // Set to Creation frequency
    button.setFrequency(FREQUENCIES.CREATION);
    
    // Verify frequency changed
    expect(button.frequency).toBe(FREQUENCIES.CREATION);
    expect(container.children[3].textContent).toBe(`${FREQUENCIES.CREATION}Hz`);
  });
  
  test('should update coherence correctly', () => {
    // Set coherence to 0.5
    button.setCoherence(0.5);
    
    // Verify coherence changed
    expect(button.coherence).toBe(0.5);
    expect(container.children[2].textContent).toBe('Coherence: 50%');
  });
  
  test('should return correct state', () => {
    // Get initial state
    const state = button.getState();
    
    // Verify state object
    expect(state).toEqual({
      state: 'inactive',
      frequency: GROUND_FREQUENCY,
      coherence: 1.0,
      interactions: 0
    });
  });
  
  test('should handle click events', () => {
    // Mock click event
    const clickCallback = jest.fn();
    container.children[0].addEventListener('quantumClick', clickCallback);
    
    // Simulate click
    const clickEvent = { type: 'click' };
    container.children[0].eventListeners.click.forEach(callback => callback(clickEvent));
    
    // Verify state change
    expect(button.state).toBe('active');
    expect(button.interactions).toBe(1);
    expect(clickCallback).toHaveBeenCalled();
  });
  
  test('should clean up resources on destroy', () => {
    // Call destroy
    button.destroy();
    
    // Verify elements removed
    expect(container.children.length).toBe(0);
  });
  
  // PHI-HARMONIC TESTS - Testing phi relationships
  
  test('should maintain phi-harmonic relationships', () => {
    // Initial frequency
    expect(button.frequency).toBe(GROUND_FREQUENCY);
    
    // Test phi-based frequency shift
    const expectedFrequency = GROUND_FREQUENCY * PHI;
    const tolerance = 0.1; // Allow slight variation
    
    button.setFrequency(GROUND_FREQUENCY * PHI);
    
    // Verify phi-harmonic relationship
    expect(button.frequency).toBeCloseTo(expectedFrequency, tolerance);
    
    // Test phi-inverse relationship
    button.setFrequency(GROUND_FREQUENCY);
    button.setFrequency(GROUND_FREQUENCY * PHI_INVERSE);
    
    expect(button.frequency).toBeCloseTo(GROUND_FREQUENCY * PHI_INVERSE, tolerance);
  });
});
