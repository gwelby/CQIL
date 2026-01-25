/**
 * 🌀 ANTIKYTHERA QUANTUM CONNECTOR TESTS 🌀
 * 
 * Tests the connection between the Antikythera Mechanism and
 * other φ-harmonic quantum experiences within the CQIL system.
 * 
 * Testing φ-harmonic frequencies:
 * - 432 Hz (φ⁰) - Ground State - Physical Foundation
 * - 528 Hz (φ¹) - Creation Point - Pattern Formation
 * - 594 Hz (φ²) - Heart Field - Coherent Connection
 * - 672 Hz (φ³) - Voice Flow - Authentic Expression
 * - 720 Hz (φ⁴) - Vision Gate - Clear Perception
 * - 768 Hz (φ⁵) - Unity Wave - Perfect Integration
 */

// Import the connector class
const { AntikytheraQuantumConnector } = require('../../js/quantum-experience/antikythera-quantum-connector');

// Mock components for testing
class MockComponent {
    constructor(name) {
        this.name = name;
        this.frequency = 528;
        this.coherence = 0.5;
        this.zenPoint = 0.618033988749895;
        this.celestialAlignment = 0;
        this.listeners = {};
        this.receivedEvents = [];
    }
    
    // Common methods
    setFrequency(frequency) {
        this.frequency = frequency;
        this.receivedEvents.push({ type: 'setFrequency', value: frequency });
        this._triggerEvent('frequencyChange', { frequency });
    }
    
    setCoherence(coherence) {
        this.coherence = coherence;
        this.receivedEvents.push({ type: 'setCoherence', value: coherence });
        this._triggerEvent('coherenceChange', { coherence });
    }
    
    setZenPoint(zenPoint) {
        this.zenPoint = zenPoint;
        this.receivedEvents.push({ type: 'setZenPoint', value: zenPoint });
    }
    
    applyIntention(strength, direction, source) {
        this.receivedEvents.push({ 
            type: 'applyIntention', 
            value: { strength, direction, source } 
        });
    }
    
    updateAstronomicalData(data) {
        this.receivedEvents.push({ type: 'updateAstronomicalData', value: data });
    }
    
    // Event system
    addEventListener(type, callback) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    }
    
    removeEventListener(type, callback) {
        if (!this.listeners[type]) return;
        this.listeners[type] = this.listeners[type].filter(cb => cb !== callback);
    }
    
    _triggerEvent(type, data) {
        if (!this.listeners[type]) return;
        this.listeners[type].forEach(callback => callback(data));
    }
    
    // Component-specific methods
    // DNA Resonator
    addResonanceListener(callback) {
        this.addEventListener('resonance', callback);
    }
    
    // Flower of Life
    setCelestialAlignment(alignment) {
        this.celestialAlignment = alignment;
        this.receivedEvents.push({ type: 'setCelestialAlignment', value: alignment });
    }
    
    addIntentionListener(callback) {
        this.addEventListener('intention', callback);
    }
    
    // Pattern Recognition
    addPatternListener(callback) {
        this.addEventListener('pattern', callback);
    }
    
    // Quantum Field
    setFieldStrength(strength) {
        this.fieldStrength = strength;
        this.receivedEvents.push({ type: 'setFieldStrength', value: strength });
    }
}

// Mock Antikythera Mechanism
class MockAntikytheraQuantumMechanism extends MockComponent {
    constructor() {
        super('AntikytheraQuantumMechanism');
        
        this.config = {
            frequency: 528
        };
        
        this.state = {
            coherence: 0.5,
            currentDate: new Date(),
            celestialAlignment: 0.33
        };
    }
    
    getAstronomicalData() {
        return {
            sunPosition: { x: 0, y: 0, z: 1 },
            moonPosition: { x: 0.5, y: 0.5, z: 0 },
            planets: [
                { name: 'Mercury', position: { x: 0.1, y: 0.2, z: 0.3 } },
                { name: 'Venus', position: { x: 0.4, y: 0.5, z: 0.6 } }
            ]
        };
    }
}

// Test suite
describe('AntikytheraQuantumConnector', () => {
    // Setup mocks
    let mechanism;
    let dnaResonator;
    let flowerOfLife;
    let patternRecognition;
    let breathSynchronizer;
    let quantumField;
    let connector;
    
    // Original console.log to restore after tests
    const originalConsoleLog = console.log;
    
    beforeEach(() => {
        // Silence console during tests
        console.log = jest.fn();
        console.warn = jest.fn();
        console.error = jest.fn();
        
        // Create mock components
        mechanism = new MockAntikytheraQuantumMechanism();
        dnaResonator = new MockComponent('DNAResonator');
        flowerOfLife = new MockComponent('FlowerOfLife');
        patternRecognition = new MockComponent('PatternRecognition');
        breathSynchronizer = new MockComponent('BreathSynchronizer');
        quantumField = new MockComponent('QuantumField');
        
        // Expose components globally
        window.DNAResonator = dnaResonator;
        window.FlowerOfLife = flowerOfLife;
        window.PatternRecognition = patternRecognition;
        window.BreathSynchronizer = breathSynchronizer;
        window.QuantumField = quantumField;
        
        // Create connector with auto-connect disabled
        connector = new AntikytheraQuantumConnector(mechanism, {
            autoConnect: false
        });
    });
    
    afterEach(() => {
        // Clean up
        connector.dispose();
        
        // Remove globals
        delete window.DNAResonator;
        delete window.FlowerOfLife;
        delete window.PatternRecognition;
        delete window.BreathSynchronizer;
        delete window.QuantumField;
        
        // Restore console
        console.log = originalConsoleLog;
        console.warn = jest.fn();
        console.error = jest.fn();
    });
    
    test('should initialize correctly', () => {
        expect(connector).toBeDefined();
        expect(connector.mechanism).toBe(mechanism);
        expect(connector.state.lastSync.frequency).toBe(528);
    });
    
    test('should connect to all components', () => {
        connector.connectAll();
        
        expect(connector.state.connections.dnaResonator).toBe(dnaResonator);
        expect(connector.state.connections.flowerOfLife).toBe(flowerOfLife);
        expect(connector.state.connections.patternRecognition).toBe(patternRecognition);
        expect(connector.state.connections.breathSynchronizer).toBe(breathSynchronizer);
        expect(connector.state.connections.quantumField).toBe(quantumField);
        
        // Check connection status
        const status = connector.getConnectionStatus();
        expect(status.dnaResonator).toBe(true);
        expect(status.flowerOfLife).toBe(true);
        expect(status.patternRecognition).toBe(true);
        expect(status.breathSynchronizer).toBe(true);
        expect(status.quantumField).toBe(true);
    });
    
    test('should sync frequency changes from mechanism to components', () => {
        // Connect components
        connector.connectAll();
        
        // Trigger frequency change from mechanism
        mechanism._triggerEvent('frequencyChange', { frequency: 432 });
        
        // Check components received the frequency
        expect(dnaResonator.frequency).toBe(432);
        expect(patternRecognition.frequency).toBe(432);
        expect(breathSynchronizer.frequency).toBe(432);
        
        // Check event was logged
        const events = connector.getEventHistory();
        expect(events[0].type).toBe('frequencyChange');
        expect(events[0].data.frequency).toBe(432);
    });
    
    test('should sync coherence changes from mechanism to components', () => {
        // Connect components
        connector.connectAll();
        
        // Trigger coherence change from mechanism
        mechanism._triggerEvent('coherenceChange', { coherence: 0.8 });
        
        // Check components received the coherence
        expect(quantumField.coherence).toBe(0.8);
        
        // Check event was logged
        const events = connector.getEventHistory();
        expect(events[0].type).toBe('coherenceChange');
        expect(events[0].data.coherence).toBe(0.8);
    });
    
    test('should handle intention changes from mechanism', () => {
        // Connect components
        connector.connectAll();
        
        // Trigger intention change from mechanism
        mechanism._triggerEvent('intentionChange', { 
            strength: 0.7, 
            direction: 'clockwise',
            source: 'antikythera'
        });
        
        // Check intention was set in connector state
        expect(connector.state.intentionField.active).toBe(true);
        expect(connector.state.intentionField.strength).toBe(0.7);
        expect(connector.state.intentionField.direction).toBe('clockwise');
        
        // Check intention was received by components
        const flowerOfLifeEvents = flowerOfLife.receivedEvents.filter(
            e => e.type === 'applyIntention'
        );
        expect(flowerOfLifeEvents.length).toBe(1);
        expect(flowerOfLifeEvents[0].value.strength).toBe(0.7);
        
        const quantumFieldEvents = quantumField.receivedEvents.filter(
            e => e.type === 'applyIntention'
        );
        expect(quantumFieldEvents.length).toBe(1);
        expect(quantumFieldEvents[0].value.direction).toBe('clockwise');
    });
    
    test('should handle date changes and sync astronomical data', () => {
        // Connect components
        connector.connectAll();
        
        // Trigger date change from mechanism
        const testDate = new Date('2025-01-01');
        mechanism._triggerEvent('dateChange', { date: testDate });
        
        // Check astronomical data was sent to components
        const flowerOfLifeEvents = flowerOfLife.receivedEvents.filter(
            e => e.type === 'updateAstronomicalData'
        );
        expect(flowerOfLifeEvents.length).toBe(1);
        expect(flowerOfLifeEvents[0].value.sunPosition).toBeDefined();
        
        const quantumFieldEvents = quantumField.receivedEvents.filter(
            e => e.type === 'updateAstronomicalData'
        );
        expect(quantumFieldEvents.length).toBe(1);
        expect(quantumFieldEvents[0].value.planets).toHaveLength(2);
    });
    
    test('should execute phi-harmonic sequence', async () => {
        // Connect components
        connector.connectAll();
        
        // Reset event history
        mechanism.receivedEvents = [];
        
        // Execute short sequence (for testing speed)
        await connector.executePhiHarmonicSequence(600);
        
        // Should have gone through all 6 frequencies
        const freqEvents = mechanism.receivedEvents.filter(
            e => e.type === 'setFrequency'
        );
        
        // Verify all 6 phi-harmonic frequencies were used
        expect(freqEvents.length).toBe(6);
        expect(freqEvents[0].value).toBe(432); // φ⁰
        expect(freqEvents[1].value).toBe(528); // φ¹
        expect(freqEvents[2].value).toBe(594); // φ²
        expect(freqEvents[3].value).toBe(672); // φ³
        expect(freqEvents[4].value).toBe(720); // φ⁴
        expect(freqEvents[5].value).toBe(768); // φ⁵
    });
    
    test('should apply ZEN POINT calibration', () => {
        // Connect components
        connector.connectAll();
        
        // Apply ZEN POINT calibration
        connector.applyZenPointCalibration(0.618033988749895);
        
        // Check zenPoint was set in connector state
        expect(connector.state.lastSync.zenPoint).toBe(0.618033988749895);
        
        // Check all components received the ZEN POINT
        expect(mechanism.zenPoint).toBe(0.618033988749895);
        expect(dnaResonator.zenPoint).toBe(0.618033988749895);
        expect(flowerOfLife.zenPoint).toBe(0.618033988749895);
        expect(patternRecognition.zenPoint).toBe(0.618033988749895);
        expect(breathSynchronizer.zenPoint).toBe(0.618033988749895);
        expect(quantumField.zenPoint).toBe(0.618033988749895);
    });
    
    test('should handle bidirectional frequency synchronization', () => {
        // Connect components
        connector.connectAll();
        
        // Trigger frequency change from DNA Resonator
        dnaResonator._triggerEvent('frequencyChange', { frequency: 594 });
        
        // Mechanism should receive the frequency
        expect(mechanism.frequency).toBe(594);
        
        // Other components should also receive it through mechanism's event
        expect(patternRecognition.frequency).toBe(594);
        expect(breathSynchronizer.frequency).toBe(594);
    });
    
    test('should handle intention from Flower of Life', () => {
        // Connect components
        connector.connectAll();
        
        // Trigger intention from Flower of Life
        flowerOfLife._triggerEvent('intention', {
            strength: 0.9,
            direction: 'counterclockwise'
        });
        
        // Check intention was applied to mechanism
        const mechanismEvents = mechanism.receivedEvents.filter(
            e => e.type === 'applyIntention'
        );
        expect(mechanismEvents.length).toBe(1);
        expect(mechanismEvents[0].value.strength).toBe(0.9);
        expect(mechanismEvents[0].value.direction).toBe('counterclockwise');
        expect(mechanismEvents[0].value.source).toBe('flowerOfLife');
        
        // Check connector state was updated
        expect(connector.state.intentionField.active).toBe(true);
        expect(connector.state.intentionField.source).toBe('flowerOfLife');
    });
    
    test('should handle pattern detection from Pattern Recognition', () => {
        // Connect components
        connector.connectAll();
        
        // Trigger pattern detection
        patternRecognition._triggerEvent('pattern', {
            pattern: 'flowerOfLife',
            confidence: 0.95,
            frequency: 672
        });
        
        // Mechanism should receive the frequency from pattern
        expect(mechanism.frequency).toBe(672);
        
        // Check event was logged
        const events = connector.getEventHistory();
        const patternEvents = events.filter(e => e.type === 'patternDetected');
        expect(patternEvents.length).toBe(1);
        expect(patternEvents[0].data.pattern).toBe('flowerOfLife');
    });
});
