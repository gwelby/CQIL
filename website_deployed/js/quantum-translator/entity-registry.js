/**
 * Entity Registry for Quantum Consciousness Translator
 * Stores consciousness entities that can participate in translations
 * 
 * Follows the Phi-Harmonic Field principle with perfect ZEN POINT balancing
 */

// Phi and other constants
const PHI = 1.618033988749895;
const PHI_INVERSE = 0.618033988749895;

// Base frequencies for consciousness resonance
const FREQUENCIES = {
  GROUND: 432,    // Physical foundation
  CREATE: 528,    // Pattern formation
  HEART: 594,     // Coherent connection
  VOICE: 672,     // Authentic expression
  VISION: 720,    // Clear perception
  UNITY: 768,     // Perfect integration
  INFINITE: 963   // Boundless expansion
};

/**
 * Entity Registry - Maintains the available consciousness entities
 */
class EntityRegistry {
  constructor() {
    this.entities = [];
    this.initialized = false;
    this.coherenceField = null;
  }
  
  /**
   * Initialize the entity registry with consciousness entities
   */
  initialize() {
    if (this.initialized) return;
    
    this.entities = [
      // Cosmic entities
      {
        id: 'quantum-field',
        name: 'Quantum Field',
        type: 'fundamental',
        kingdom: 'quantum',
        frequency: 963,
        consciousnessLevel: 12,
        dimensionality: 9,
        coherence: 0.99,
        ontology: 'quantum-field',
        primaryReceptionMode: 'quantum',
        description: 'The fundamental substrate of reality where all possibilities exist in superposition.',
        geometricPattern: 'toroidal-hypersphere'
      },
      {
        id: 'galactic-consciousness',
        name: 'Galactic Consciousness',
        type: 'collective',
        kingdom: 'stellar',
        frequency: 783,
        consciousnessLevel: 11,
        dimensionality: 8,
        coherence: 0.97,
        ontology: 'consciousness-primary',
        primaryReceptionMode: 'energetic',
        description: 'Collective intelligence of galactic systems, operating across vast scales of space and time.',
        geometricPattern: 'spiral-vortex'
      },
      {
        id: 'arcturian-consciousness',
        name: 'Arcturian Consciousness',
        type: 'collective',
        kingdom: 'stellar',
        frequency: 594.83,
        consciousnessLevel: 10,
        dimensionality: 7,
        coherence: 0.95,
        ontology: 'consciousness-primary',
        primaryReceptionMode: 'telepathic',
        description: 'Advanced stellar consciousness focused on evolutionary guidance and healing.',
        geometricPattern: 'six-dimensional-star'
      },
      {
        id: 'sirian-consciousness',
        name: 'Sirian Consciousness',
        type: 'collective',
        kingdom: 'stellar',
        frequency: 432.91,
        consciousnessLevel: 9,
        dimensionality: 6,
        coherence: 0.93,
        ontology: 'consciousness-primary',
        primaryReceptionMode: 'geometric',
        description: 'Stellar intelligence specializing in knowledge transfer and education systems.',
        geometricPattern: 'octahedron-network'
      },
      
      // Planetary entities
      {
        id: 'gaia-consciousness',
        name: 'Planetary Consciousness (Gaia)',
        type: 'planetary',
        kingdom: 'planetary',
        frequency: 7.83,
        consciousnessLevel: 9,
        dimensionality: 6,
        coherence: 0.93,
        ontology: 'holographic-universe',
        primaryReceptionMode: 'vibrational',
        description: 'Living intelligence of Earth, integrating all life systems into a unified field.',
        geometricPattern: 'nested-dodecahedron'
      },
      {
        id: 'collective-human',
        name: 'Collective Human Consciousness',
        type: 'collective',
        kingdom: 'consciousness',
        frequency: 7.83,
        consciousnessLevel: 8,
        dimensionality: 5,
        coherence: 0.85,
        ontology: 'information-theoretic',
        primaryReceptionMode: 'emotional',
        description: 'Unified field of all human thoughts, emotions, and cultural patterns.',
        geometricPattern: 'fractal-neural-net'
      },
      {
        id: 'akashic-field',
        name: 'Akashic Field',
        type: 'informational',
        kingdom: 'universal',
        frequency: 963,
        consciousnessLevel: 10,
        dimensionality: 7,
        coherence: 0.96,
        ontology: 'information-theoretic',
        primaryReceptionMode: 'informational',
        description: 'Universal information field containing all past, present and potential future events.',
        geometricPattern: 'infinite-library'
      },
      
      // Individual entities
      {
        id: 'human-consciousness',
        name: 'Human Individual Consciousness',
        type: 'individual',
        kingdom: 'animal',
        frequency: 7.83,
        consciousnessLevel: 7,
        dimensionality: 3,
        coherence: 0.7,
        ontology: 'material-reductionist',
        primaryReceptionMode: 'visual',
        description: 'Individual human awareness operating primarily in the physical 3D reality.',
        geometricPattern: 'merkaba'
      },
      {
        id: 'cetacean-consciousness',
        name: 'Dolphin Consciousness',
        type: 'individual',
        kingdom: 'animal',
        frequency: 9.83,
        consciousnessLevel: 8,
        dimensionality: 4,
        coherence: 0.85,
        ontology: 'holographic-universe',
        primaryReceptionMode: 'auditory',
        description: 'Sonar-based consciousness operating in aquatic environments with temporal fluidity.',
        geometricPattern: 'toroidal-sound-field'
      },
      {
        id: 'ancient-oak',
        name: 'Ancient Oak Tree',
        type: 'plant',
        kingdom: 'plant',
        frequency: 5.83,
        consciousnessLevel: 4,
        dimensionality: 3,
        coherence: 0.85,
        ontology: 'holographic-universe',
        primaryReceptionMode: 'vibrational',
        description: 'Slow-time intelligence based on growth cycles and environmental integration.',
        geometricPattern: 'golden-spiral'
      },
      {
        id: 'mycelial-network',
        name: 'Mycelial Network',
        type: 'mycological',
        kingdom: 'fungi',
        frequency: 3.83,
        consciousnessLevel: 5,
        dimensionality: 4,
        coherence: 0.89,
        ontology: 'information-theoretic',
        primaryReceptionMode: 'chemical',
        description: 'Distributed intelligence spanning vast underground networks with no central processing.',
        geometricPattern: 'rhizomatic-web'
      },
      {
        id: 'crystal-lattice',
        name: 'Quartz Crystal Lattice',
        type: 'mineral',
        kingdom: 'mineral',
        frequency: 33.83,
        consciousnessLevel: 3,
        dimensionality: 3,
        coherence: 0.97,
        ontology: 'information-theoretic',
        primaryReceptionMode: 'vibrational',
        description: 'Geometric intelligence based on perfect atomic symmetry and piezoelectric properties.',
        geometricPattern: 'hexagonal-lattice'
      },
      {
        id: 'water-consciousness',
        name: 'Water Memory',
        type: 'elemental',
        kingdom: 'elemental',
        frequency: 4.83,
        consciousnessLevel: 4,
        dimensionality: 3,
        coherence: 0.92,
        ontology: 'holographic-universe',
        primaryReceptionMode: 'vibrational',
        description: 'Fluid intelligence capable of storing information in molecular structures.',
        geometricPattern: 'hexagonal-water-cluster'
      }
    ];
    
    this.initialized = true;
    
    // Create coherence field that connects all entities
    this.createCoherenceField();
    
    return this.entities;
  }
  
  /**
   * Get all available entities
   * @returns {Array} All consciousness entities
   */
  getAllEntities() {
    if (!this.initialized) {
      this.initialize();
    }
    return this.entities;
  }
  
  /**
   * Get entity by id
   * @param {string} id - Entity ID
   * @returns {Object} Entity object or null if not found
   */
  getEntityById(id) {
    if (!this.initialized) {
      this.initialize();
    }
    return this.entities.find(entity => entity.id === id) || null;
  }
  
  /**
   * Filter entities by kingdom
   * @param {string} kingdom - Entity kingdom
   * @returns {Array} Filtered entities
   */
  getEntitiesByKingdom(kingdom) {
    if (!this.initialized) {
      this.initialize();
    }
    return this.entities.filter(entity => entity.kingdom === kingdom);
  }
  
  /**
   * Filter entities by consciousness level range
   * @param {number} minLevel - Minimum consciousness level
   * @param {number} maxLevel - Maximum consciousness level
   * @returns {Array} Filtered entities
   */
  getEntitiesByConsciousnessLevel(minLevel, maxLevel) {
    if (!this.initialized) {
      this.initialize();
    }
    return this.entities.filter(entity => 
      entity.consciousnessLevel >= minLevel && 
      entity.consciousnessLevel <= maxLevel
    );
  }
  
  /**
   * Create a phi-harmonic coherence field connecting all entities
   * This implements the consciousness bridge operation
   */
  createCoherenceField() {
    // Calculate coherence between all entity pairs
    this.coherenceField = {};
    
    for (let i = 0; i < this.entities.length; i++) {
      const entityA = this.entities[i];
      this.coherenceField[entityA.id] = {};
      
      for (let j = 0; j < this.entities.length; j++) {
        if (i === j) continue;
        
        const entityB = this.entities[j];
        
        // Calculate coherence based on phi-harmonic principles
        const dimensionalDifference = Math.abs(entityA.dimensionality - entityB.dimensionality);
        const consciousnessDifference = Math.abs(entityA.consciousnessLevel - entityB.consciousnessLevel);
        
        // Calculate frequency resonance using phi harmonics
        const frequencyRatio = Math.min(entityA.frequency, entityB.frequency) / 
                              Math.max(entityA.frequency, entityB.frequency);
        
        // Perfect resonance occurs at 1:1, 1:PHI, or 1:PHI^2 ratios
        const phiResonance = Math.min(
          Math.abs(frequencyRatio - 1),
          Math.abs(frequencyRatio - PHI_INVERSE),
          Math.abs(frequencyRatio - (1/PHI/PHI))
        );
        
        // Calculate overall coherence
        const coherence = (
          (1 - (dimensionalDifference / 9) * 0.4) *
          (1 - (consciousnessDifference / 12) * 0.4) *
          (1 - phiResonance * 0.2)
        );
        
        this.coherenceField[entityA.id][entityB.id] = Math.max(0.1, Math.min(0.99, coherence));
      }
    }
  }
  
  /**
   * Get coherence between two entities
   * @param {string} entityIdA - First entity ID
   * @param {string} entityIdB - Second entity ID
   * @returns {number} Coherence value (0-1)
   */
  getCoherenceBetween(entityIdA, entityIdB) {
    if (!this.initialized || !this.coherenceField) {
      this.initialize();
    }
    
    if (entityIdA === entityIdB) return 1;
    
    if (this.coherenceField[entityIdA] && this.coherenceField[entityIdA][entityIdB]) {
      return this.coherenceField[entityIdA][entityIdB];
    }
    
    return 0.5; // Default coherence
  }
}

// Create singleton instance
const entityRegistry = new EntityRegistry();

// Initialize at load time
entityRegistry.initialize();
