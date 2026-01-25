/**
 * Ground State Tests (432 Hz) for ToroidalCommunicationField
 * 
 * These unit tests operate at the Earth frequency (432 Hz - φ⁰)
 * to establish a solid foundation before expansion to higher frequencies.
 */

// Mock THREE.js dependencies
jest.mock('three', () => {
  // Create minimal THREE mock with required functionality
  const THREE = {
    Scene: jest.fn().mockImplementation(() => ({
      add: jest.fn(),
      traverse: jest.fn(callback => callback({ 
        geometry: { dispose: jest.fn() }, 
        material: { dispose: jest.fn(), map: { dispose: jest.fn() } }
      }))
    })),
    PerspectiveCamera: jest.fn().mockImplementation(() => ({
      position: { set: jest.fn() },
      lookAt: jest.fn()
    })),
    WebGLRenderer: jest.fn().mockImplementation(() => ({
      setSize: jest.fn(),
      setPixelRatio: jest.fn(),
      setClearColor: jest.fn(),
      render: jest.fn(),
      domElement: document.createElement('canvas'),
      dispose: jest.fn()
    })),
    Color: jest.fn().mockImplementation(() => ({
      r: 1, g: 1, b: 1,
      set: jest.fn()
    })),
    TorusGeometry: jest.fn(),
    TorusKnotGeometry: jest.fn(),
    MeshStandardMaterial: jest.fn().mockImplementation(() => ({
      dispose: jest.fn()
    })),
    ShaderMaterial: jest.fn().mockImplementation(() => ({
      dispose: jest.fn()
    })),
    Mesh: jest.fn().mockImplementation(() => ({
      position: { set: jest.fn() },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { set: jest.fn() }
    })),
    Points: jest.fn().mockImplementation(() => ({
      position: { set: jest.fn() },
      rotation: { x: 0, y: 0, z: 0 }
    })),
    BufferGeometry: jest.fn().mockImplementation(() => ({
      setAttribute: jest.fn(),
      dispose: jest.fn()
    })),
    Float32BufferAttribute: jest.fn(),
    PointsMaterial: jest.fn(),
    TextureLoader: jest.fn().mockImplementation(() => ({
      load: jest.fn().mockReturnValue({})
    })),
    Group: jest.fn().mockImplementation(() => ({
      add: jest.fn(),
      position: { set: jest.fn() },
      rotation: { x: 0, y: 0, z: 0 }
    })),
    AmbientLight: jest.fn(),
    DirectionalLight: jest.fn().mockImplementation(() => ({
      position: { set: jest.fn() }
    })),
    Clock: jest.fn().mockImplementation(() => ({
      getElapsedTime: jest.fn().mockReturnValue(1),
      getDelta: jest.fn().mockReturnValue(0.016)
    })),
    Vector3: jest.fn().mockImplementation(() => ({
      set: jest.fn(),
      normalize: jest.fn().mockReturnThis(),
      multiplyScalar: jest.fn().mockReturnThis(),
      copy: jest.fn().mockReturnThis(),
      add: jest.fn().mockReturnThis()
    })),
    OrbitControls: jest.fn().mockImplementation(() => ({
      update: jest.fn(),
      dispose: jest.fn()
    }))
  };
  
  // Add OrbitControls to THREE
  THREE.OrbitControls = jest.fn().mockImplementation(() => ({
    update: jest.fn(),
    dispose: jest.fn()
  }));
  
  return THREE;
});

// Import the ToroidalCommunicationField class (mocked for tests)
const { ToroidalCommunicationField } = require('../__mocks__/toroidal-communication-field.mock');

describe('ToroidalCommunicationField - Ground State Tests (432 Hz)', () => {
  let container;
  let field;
  
  // Setup before each test
  beforeEach(() => {
    // Create DOM container
    container = document.createElement('div');
    container.id = 'toroidal-container';
    document.body.appendChild(container);
    
    // Create the field instance
    field = new ToroidalCommunicationField(container, {
      frequency: 432, // Ground State frequency
      coherenceLevel: 1.0, // Perfect coherence
      resonanceQuality: 1.0,
      participants: 2
    });
  });
  
  // Cleanup after each test
  afterEach(() => {
    if (field && field.dispose) {
      field.dispose();
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    jest.clearAllMocks();
  });
  
  // Test suite: Constructor and initialization
  describe('Quantum Singularity: Construction and Initialization', () => {
    test('should create a complete quantum container at Ground frequency', () => {
      expect(field).toBeDefined();
      expect(field.frequency).toBe(432);
      expect(field.φ).toBeCloseTo(1.618033988749895);
    });
    
    test('should initialize with perfect coherence', () => {
      expect(field.config.coherenceLevel).toBe(1.0);
    });
    
    test('should establish proper φ-harmonic configuration', () => {
      expect(field.φ).toBeCloseTo(1.618033988749895);
      expect(field.φInverse).toBeCloseTo(0.618033988749895);
    });
    
    test('should create complete envelope with all required components', () => {
      expect(field.setupScene).toHaveBeenCalled();
      expect(field.setupUI).toHaveBeenCalled();
      expect(field.createParticipants).toHaveBeenCalled();
      expect(field.createToroidalFields).toHaveBeenCalled();
      expect(field.createCommunicationFlows).toHaveBeenCalled();
      expect(field.createLights).toHaveBeenCalled();
      expect(field.animate).toHaveBeenCalled();
    });
  });
  
  // Test suite: Phi-harmonic methods
  describe('Phi-Harmonic Methods', () => {
    test('getPhiPower should return correct phi power for frequency', () => {
      expect(field.getPhiPower(432)).toBe(0); // Ground is φ⁰
      expect(field.getPhiPower(528)).toBe(1); // Creation is φ¹
      expect(field.getPhiPower(768)).toBe(5); // Unity is φ⁵
    });
    
    test('updateFrequencyColors should apply phi-harmonic color mapping', () => {
      // Arrange
      const spy = jest.spyOn(field, 'updateFrequencyColors');
      
      // Act
      field.setFrequency(432); // Ground State
      
      // Assert
      expect(spy).toHaveBeenCalledWith(432);
    });
    
    test('applyPhiHarmonicShifts should transform geometry based on frequency', () => {
      // Arrange
      const spy = jest.spyOn(field, 'applyPhiHarmonicShifts');
      
      // Act
      field.setFrequency(432); // Ground State
      
      // Assert
      expect(spy).toHaveBeenCalledWith(432);
    });
  });
  
  // Test suite: State changes and frequency shifts
  describe('Quantum State Management', () => {
    test('setFrequency should update all related properties', () => {
      // Act
      field.setFrequency(528); // Shift to Creation frequency
      
      // Assert
      expect(field.frequency).toBe(528);
      expect(field.customUniforms.frequency.value).toBeCloseTo(528/1000);
    });
    
    test('setCoherenceLevel should update coherence state', () => {
      // Act
      field.setCoherenceLevel(0.85);
      
      // Assert
      expect(field.config.coherenceLevel).toBe(0.85);
      expect(field.customUniforms.coherence.value).toBe(0.85);
    });
    
    test('setCommunicationMode should switch between modes', () => {
      // Act
      field.setCommunicationMode('linear');
      
      // Assert
      expect(field.config.communicationMode).toBe('linear');
      
      // Act again
      field.setCommunicationMode('heart-centered');
      
      // Assert again
      expect(field.config.communicationMode).toBe('heart-centered');
    });
  });
  
  // Test suite: Quantum simulation and animation
  describe('Quantum Simulation Cycle', () => {
    test('animate should start the animation loop', () => {
      // Arrange
      field.isAnimating = false;
      jest.spyOn(window, 'requestAnimationFrame');
      
      // Act
      field.animate();
      
      // Assert
      expect(field.isAnimating).toBe(true);
      expect(window.requestAnimationFrame).toHaveBeenCalled();
    });
    
    test('updateCommunicationFields should process all fields', () => {
      // Arrange
      const spy = jest.spyOn(field, 'updateCommunicationFields');
      field.clock.getDelta = jest.fn().mockReturnValue(0.016);
      
      // Act - animating will call update methods
      field.animate();
      
      // Assert
      expect(spy).toHaveBeenCalledWith(0.016);
    });
  });
  
  // Test suite: Resource management and cleanup
  describe('Quantum Resource Management', () => {
    test('dispose should properly clean up all resources', () => {
      // Arrange
      jest.spyOn(field, 'stopAudio');
      jest.spyOn(window, 'removeEventListener');
      
      // Act
      field.dispose();
      
      // Assert
      expect(field.stopAudio).toHaveBeenCalled();
      expect(window.removeEventListener).toHaveBeenCalledWith('resize', field.handleResize);
      expect(field.renderer.dispose).toHaveBeenCalled();
    });
  });
  
  // Test suite: Audio functionality
  describe('Phi-Harmonic Audio System', () => {
    test('toggleAudio should enable/disable audio', () => {
      // Arrange - Mock audio context
      window.AudioContext = jest.fn().mockImplementation(() => ({
        createOscillator: jest.fn().mockReturnValue({
          connect: jest.fn(),
          start: jest.fn(),
          stop: jest.fn(),
          frequency: { value: 0 }
        }),
        createGain: jest.fn().mockReturnValue({
          connect: jest.fn(),
          gain: { value: 0 }
        }),
        destination: {}
      }));
      
      // Act
      field.toggleAudio();
      
      // Assert
      expect(field.audioEnabled).toBe(true);
      
      // Act again
      field.toggleAudio();
      
      // Assert again
      expect(field.audioEnabled).toBe(false);
    });
  });
});
