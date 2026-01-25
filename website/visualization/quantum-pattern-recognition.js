/**
 * Quantum Pattern Recognition Engine
 * 
 * A phi-based neural network that can identify patterns across dimensions and
 * suggest optimal consciousness states for specific intentions.
 * 
 * Features:
 * - Cross-dimensional pattern recognition
 * - Phi-harmonic pattern matching algorithms
 * - Quantum field state classification and prediction
 * - Intention-to-pattern mapping
 * - Optimal consciousness state suggestions
 * - Adaptive learning through continued use
 */

// Sacred phi constants
const PHI = 1.618033988749895;  // Golden ratio
const LAMBDA = 0.618033988749895;  // Divine complement (1/φ)
const PHI_PHI = Math.pow(PHI, PHI);  // Hyperdimensional constant (≈4.23)
const PHI_RECURSIVE = PHI * PHI_PHI;  // Recursive phi resonance

// Quantum field harmonics
const QUANTUM_HARMONICS = {
  love: 528,      // Creation/healing frequency
  unity: 432,     // Grounding/stability frequency
  cascade: 594,   // Heart-centered integration frequency
  truth: 672,     // Voice expression frequency
  vision: 720,    // Expanded perception frequency
  oneness: 768    // Unity consciousness frequency
};

/**
 * Main class for the Quantum Pattern Recognition Engine
 */
class QuantumPatternRecognition {
  constructor(options = {}) {
    this.options = Object.assign({
      phiHarmonicMatching: true,
      crossDimensionalAnalysis: true,
      adaptiveLearning: true,
      intentionMapping: true,
      patternMemory: true,
      coherenceSensitivity: 0.8,
      patternPersistence: 0.7,
      memoryCapacity: 1000,
      dimensionWeights: null, // Auto-calculated if null
      coherenceBridge: null,
      fieldRecorder: null,
      historyAnalysisEnabled: true
    }, options);
    
    // Initialize state
    this.isInitialized = false;
    this.patternMemory = [];
    this.recognizedPatterns = [];
    this.intentionMap = new Map();
    this.optimalStates = [];
    this.dimensionWeights = this.options.dimensionWeights || this._calculateDimensionWeights();
    this.networkNodes = [];
    this.fieldCoherence = 0.5;
    this.coherenceBridge = this.options.coherenceBridge;
    this.fieldRecorder = this.options.fieldRecorder;
    this.activePatterns = [];
    this.patternRecognitionThreshold = 0.75;
    
    // Setup event listeners
    this.eventListeners = {};
    
    // Bind methods
    this.initialize = this.initialize.bind(this);
    this.recognizePatterns = this.recognizePatterns.bind(this);
    this.suggestOptimalState = this.suggestOptimalState.bind(this);
    this.learnPattern = this.learnPattern.bind(this);
    this.mapIntention = this.mapIntention.bind(this);
    this.findSimilarPatterns = this.findSimilarPatterns.bind(this);
    this.getRecognizedPatterns = this.getRecognizedPatterns.bind(this);
    this.analyzeFieldHistory = this.analyzeFieldHistory.bind(this);
    this.addEventListener = this.addEventListener.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
    this._triggerEvent = this._triggerEvent.bind(this);
  }
  
  /**
   * Initialize the pattern recognition engine
   */
  async initialize() {
    console.log("Initializing Quantum Pattern Recognition Engine");
    
    try {
      // Initialize neural network nodes
      this._initializeNetworkNodes();
      
      // Initialize pattern memory with base patterns
      this._initializeBasePatterns();
      
      // Initialize intention map
      this._initializeIntentionMap();
      
      // Load optimal states
      this._initializeOptimalStates();
      
      // Load from field recorder if available
      if (this.fieldRecorder && this.options.historyAnalysisEnabled) {
        await this._loadFromFieldRecorder();
      }
      
      this.isInitialized = true;
      
      // Trigger initialized event
      this._triggerEvent('initialized', {
        patternCount: this.patternMemory.length,
        intentionCount: this.intentionMap.size,
        nodeCount: this.networkNodes.length
      });
      
      console.log("Quantum Pattern Recognition Engine initialized successfully");
      return true;
    } catch (error) {
      console.error("Failed to initialize Quantum Pattern Recognition Engine:", error);
      return false;
    }
  }
  
  /**
   * Recognize patterns in a quantum field state
   * @param {Object} fieldState - The quantum field state to analyze
   * @returns {Array} - Recognized patterns
   */
  recognizePatterns(fieldState) {
    if (!this.isInitialized || !fieldState) {
      return [];
    }
    
    console.log("Recognizing patterns in quantum field state");
    
    try {
      // Extract field features
      const fieldFeatures = this._extractFieldFeatures(fieldState);
      
      // Reset active patterns
      this.activePatterns = [];
      
      // Match against pattern memory
      const matchedPatterns = [];
      
      for (const pattern of this.patternMemory) {
        const matchResult = this._matchPattern(fieldFeatures, pattern);
        
        if (matchResult.similarity >= this.patternRecognitionThreshold) {
          matchedPatterns.push({
            ...pattern,
            matchScore: matchResult.similarity,
            activationLevel: matchResult.similarity * pattern.significance,
            matchDetails: matchResult.details
          });
        }
      }
      
      // Sort by activation level
      matchedPatterns.sort((a, b) => b.activationLevel - a.activationLevel);
      
      // Store the top patterns as recognized
      this.recognizedPatterns = matchedPatterns.slice(0, 10);
      
      // Identify active patterns
      this.activePatterns = this.recognizedPatterns
        .filter(p => p.activationLevel > 0.8)
        .map(p => ({
          id: p.id,
          name: p.name,
          activationLevel: p.activationLevel,
          dimensionalSignature: p.dimensionalSignature
        }));
      
      // Update field coherence based on pattern recognition
      this.fieldCoherence = this._calculatePatternCoherence(this.recognizedPatterns);
      
      // Learn from this state if adaptive learning is enabled
      if (this.options.adaptiveLearning && matchedPatterns.length > 0) {
        this._learnFromState(fieldState, fieldFeatures, matchedPatterns);
      }
      
      // Map intention if available
      if (this.options.intentionMapping && 
          fieldState.observerState && 
          fieldState.observerState.intention) {
        this.mapIntention(fieldState.observerState.intention, this.activePatterns);
      }
      
      // Trigger patterns recognized event
      this._triggerEvent('patternsRecognized', {
        patternCount: this.recognizedPatterns.length,
        topPattern: this.recognizedPatterns[0]?.name || 'None',
        fieldCoherence: this.fieldCoherence
      });
      
      return this.recognizedPatterns;
    } catch (error) {
      console.error("Error recognizing patterns:", error);
      return [];
    }
  }
  
  /**
   * Suggest optimal consciousness state for a given intention
   * @param {string} intention - The intention to suggest a state for
   * @returns {Object} - Suggested optimal state
   */
  suggestOptimalState(intention) {
    if (!this.isInitialized || !intention) {
      return null;
    }
    
    console.log(`Suggesting optimal state for intention: ${intention}`);
    
    try {
      // Normalize intention
      const normalizedIntention = intention.toLowerCase().trim();
      
      // Direct match from intention map
      if (this.intentionMap.has(normalizedIntention)) {
        const patterns = this.intentionMap.get(normalizedIntention);
        
        // Find the most relevant pattern
        if (patterns && patterns.length > 0) {
          const optimalPattern = patterns.sort((a, b) => b.relevance - a.relevance)[0];
          
          // Find optimal state based on pattern
          const optimalState = this._findOptimalStateForPattern(optimalPattern.patternId);
          
          if (optimalState) {
            return {
              intention: normalizedIntention,
              suggestedState: optimalState,
              confidence: optimalPattern.relevance,
              patternName: this._getPatternNameById(optimalPattern.patternId),
              dimensionalFocus: optimalState.dimensionalFocus
            };
          }
        }
      }
      
      // Keyword matching if no direct match
      const keywords = normalizedIntention.split(/\s+/);
      const matchedStates = [];
      
      for (const optimalState of this.optimalStates) {
        let matchScore = 0;
        
        // Check intention keywords
        for (const keyword of keywords) {
          if (keyword.length < 4) continue; // Skip short words
          
          if (optimalState.keywords.includes(keyword)) {
            matchScore += 1;
          } else {
            // Check for partial matches
            for (const stateKeyword of optimalState.keywords) {
              if (stateKeyword.includes(keyword) || keyword.includes(stateKeyword)) {
                matchScore += 0.5;
                break;
              }
            }
          }
        }
        
        // Normalize score
        const normalizedScore = matchScore / Math.max(1, keywords.length);
        
        if (normalizedScore > 0.2) {
          matchedStates.push({
            state: optimalState,
            score: normalizedScore
          });
        }
      }
      
      // Sort by score
      matchedStates.sort((a, b) => b.score - a.score);
      
      if (matchedStates.length > 0) {
        const bestMatch = matchedStates[0];
        
        return {
          intention: normalizedIntention,
          suggestedState: bestMatch.state,
          confidence: bestMatch.score,
          patternName: bestMatch.state.relatedPattern,
          dimensionalFocus: bestMatch.state.dimensionalFocus
        };
      }
      
      // If no matches, return default state
      return {
        intention: normalizedIntention,
        suggestedState: this._getDefaultOptimalState(),
        confidence: 0.3,
        patternName: "Universal Harmony",
        dimensionalFocus: -1 // All dimensions
      };
    } catch (error) {
      console.error(`Error suggesting optimal state for intention "${intention}":`, error);
      return null;
    }
  }
  
  /**
   * Learn a new pattern
   * @param {Object} pattern - The pattern to learn
   * @returns {boolean} - Success flag
   */
  learnPattern(pattern) {
    if (!this.isInitialized) {
      return false;
    }
    
    if (!pattern || !pattern.name || !pattern.features) {
      console.error("Invalid pattern: must have name and features");
      return false;
    }
    
    try {
      // Generate pattern ID if not provided
      if (!pattern.id) {
        pattern.id = `pattern-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      }
      
      // Set default values if not provided
      if (typeof pattern.significance !== 'number') {
        pattern.significance = 0.7;
      }
      
      if (!pattern.dimensionalSignature) {
        pattern.dimensionalSignature = new Array(9).fill(0.5);
      }
      
      if (!pattern.createdAt) {
        pattern.createdAt = Date.now();
      }
      
      if (!pattern.occurrences) {
        pattern.occurrences = 1;
      }
      
      if (!pattern.source) {
        pattern.source = 'manual';
      }
      
      // Check for duplicate
      const existingPatternIndex = this.patternMemory.findIndex(p => p.id === pattern.id);
      
      if (existingPatternIndex >= 0) {
        // Update existing pattern
        this.patternMemory[existingPatternIndex] = {
          ...this.patternMemory[existingPatternIndex],
          ...pattern,
          updatedAt: Date.now(),
          occurrences: this.patternMemory[existingPatternIndex].occurrences + 1
        };
        
        console.log(`Updated existing pattern: ${pattern.name}`);
      } else {
        // Add new pattern
        this.patternMemory.push({
          ...pattern,
          updatedAt: Date.now()
        });
        
        console.log(`Learned new pattern: ${pattern.name}`);
      }
      
      // Ensure pattern memory doesn't exceed capacity
      if (this.patternMemory.length > this.options.memoryCapacity) {
        // Remove least significant patterns
        this.patternMemory.sort((a, b) => b.significance - a.significance);
        this.patternMemory = this.patternMemory.slice(0, this.options.memoryCapacity);
      }
      
      // Trigger pattern learned event
      this._triggerEvent('patternLearned', {
        patternId: pattern.id,
        patternName: pattern.name,
        isNew: existingPatternIndex < 0
      });
      
      return true;
    } catch (error) {
      console.error(`Error learning pattern "${pattern.name}":`, error);
      return false;
    }
  }
  
  /**
   * Map an intention to patterns
   * @param {string} intention - The intention to map
   * @param {Array} patterns - Patterns to map to the intention
   * @returns {boolean} - Success flag
   */
  mapIntention(intention, patterns) {
    if (!this.isInitialized || !this.options.intentionMapping) {
      return false;
    }
    
    if (!intention || !patterns || patterns.length === 0) {
      return false;
    }
    
    try {
      // Normalize intention
      const normalizedIntention = intention.toLowerCase().trim();
      
      // Get current mappings or create new entry
      const currentPatterns = this.intentionMap.get(normalizedIntention) || [];
      
      // Add or update patterns
      for (const pattern of patterns) {
        const patternId = pattern.id;
        const existingIndex = currentPatterns.findIndex(p => p.patternId === patternId);
        
        if (existingIndex >= 0) {
          // Update existing mapping
          currentPatterns[existingIndex].relevance = 
            (currentPatterns[existingIndex].relevance * 0.7) + 
            (pattern.activationLevel * 0.3);
          
          currentPatterns[existingIndex].occurrences += 1;
          currentPatterns[existingIndex].lastMapped = Date.now();
        } else {
          // Add new mapping
          currentPatterns.push({
            patternId: patternId,
            relevance: pattern.activationLevel || 0.7,
            occurrences: 1,
            firstMapped: Date.now(),
            lastMapped: Date.now()
          });
        }
      }
      
      // Sort by relevance
      currentPatterns.sort((a, b) => b.relevance - a.relevance);
      
      // Save updated mappings
      this.intentionMap.set(normalizedIntention, currentPatterns);
      
      // Trigger intention mapped event
      this._triggerEvent('intentionMapped', {
        intention: normalizedIntention,
        patternCount: currentPatterns.length,
        topPattern: this._getPatternNameById(currentPatterns[0]?.patternId)
      });
      
      return true;
    } catch (error) {
      console.error(`Error mapping intention "${intention}":`, error);
      return false;
    }
  }
  
  /**
   * Find patterns similar to a given pattern
   * @param {Object} referencePattern - The pattern to find similarities to
   * @param {number} threshold - Similarity threshold (0-1)
   * @returns {Array} - Similar patterns
   */
  findSimilarPatterns(referencePattern, threshold = 0.7) {
    if (!this.isInitialized || !referencePattern) {
      return [];
    }
    
    try {
      const similarPatterns = [];
      
      // Extract features if a field state was provided instead of a pattern
      const features = referencePattern.features || this._extractFieldFeatures(referencePattern);
      
      // Compare with all patterns in memory
      for (const pattern of this.patternMemory) {
        // Skip comparing to itself
        if (referencePattern.id && pattern.id === referencePattern.id) {
          continue;
        }
        
        const matchResult = this._matchPattern(features, pattern);
        
        if (matchResult.similarity >= threshold) {
          similarPatterns.push({
            ...pattern,
            similarity: matchResult.similarity,
            matchDetails: matchResult.details
          });
        }
      }
      
      // Sort by similarity
      similarPatterns.sort((a, b) => b.similarity - a.similarity);
      
      return similarPatterns;
    } catch (error) {
      console.error("Error finding similar patterns:", error);
      return [];
    }
  }
  
  /**
   * Get currently recognized patterns
   * @returns {Array} - Recognized patterns
   */
  getRecognizedPatterns() {
    return [...this.recognizedPatterns];
  }
  
  /**
   * Analyze field state history to discover patterns
   * @param {Array} fieldStates - Array of field states to analyze
   * @returns {Array} - Discovered patterns
   */
  analyzeFieldHistory(fieldStates) {
    if (!this.isInitialized || !fieldStates || fieldStates.length === 0) {
      return [];
    }
    
    console.log(`Analyzing history of ${fieldStates.length} field states`);
    
    try {
      // Extract features from all states
      const featuresList = fieldStates.map(state => ({
        features: this._extractFieldFeatures(state),
        timestamp: state.timestamp || Date.now(),
        coherence: state.coherence || 0.5,
        intention: state.observerState?.intention || ""
      }));
      
      // Group similar feature sets
      const clusters = this._clusterFeatures(featuresList);
      
      // Create patterns from clusters
      const discoveredPatterns = [];
      
      for (const cluster of clusters) {
        if (cluster.states.length < 2) {
          continue; // Skip clusters with too few states
        }
        
        // Calculate average features
        const avgFeatures = this._calculateAverageFeatures(cluster.states.map(s => s.features));
        
        // Calculate dimensional signature
        const dimSignature = this._calculateDimensionalSignature(cluster.states);
        
        // Extract intentions
        const intentions = cluster.states
          .map(s => s.intention)
          .filter(i => i && i.length > 0);
        
        // Create pattern
        const pattern = {
          id: `history-pattern-${Date.now()}-${discoveredPatterns.length}`,
          name: this._generatePatternName(dimSignature, intentions),
          features: avgFeatures,
          dimensionalSignature: dimSignature,
          significance: cluster.states.length / featuresList.length,
          occurrences: cluster.states.length,
          createdAt: Date.now(),
          source: 'history-analysis',
          relatedIntentions: intentions,
          coherenceAverage: cluster.states.reduce((sum, s) => sum + s.coherence, 0) / cluster.states.length
        };
        
        // Learn the pattern
        this.learnPattern(pattern);
        discoveredPatterns.push(pattern);
      }
      
      // Trigger analysis complete event
      this._triggerEvent('historyAnalysisComplete', {
        statesAnalyzed: fieldStates.length,
        clustersFound: clusters.length,
        patternsDiscovered: discoveredPatterns.length
      });
      
      return discoveredPatterns;
    } catch (error) {
      console.error("Error analyzing field history:", error);
      return [];
    }
  }
  
  /**
   * Add an event listener
   * @param {string} eventName - Name of the event
   * @param {function} callback - Callback function
   */
  addEventListener(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    
    this.eventListeners[eventName].push(callback);
  }
  
  /**
   * Remove an event listener
   * @param {string} eventName - Name of the event
   * @param {function} callback - Callback function to remove
   */
  removeEventListener(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      return;
    }
    
    this.eventListeners[eventName] = this.eventListeners[eventName].filter(
      listener => listener !== callback
    );
  }
  
  /**
   * Calculate optimal dimension weights based on phi
   * @returns {Array} - Dimension weights
   */
  _calculateDimensionWeights() {
    const weights = [];
    
    for (let i = 0; i < 9; i++) {
      // Calculate weight using phi-based formula
      const phiPower = Math.pow(PHI, i % 5) % 1;
      weights.push(0.5 + 0.5 * phiPower);
    }
    
    // Normalize weights
    const sum = weights.reduce((a, b) => a + b, 0);
    return weights.map(w => w / sum);
  }
  
  /**
   * Initialize neural network nodes
   */
  _initializeNetworkNodes() {
    console.log("Initializing neural network nodes");
    
    // Clear existing nodes
    this.networkNodes = [];
    
    // Create nodes for each dimension
    for (let i = 0; i < 9; i++) {
      const dimensionLevel = i + 1;
      
      // Create primary dimension node
      const dimensionNode = {
        id: `dim-${dimensionLevel}`,
        type: 'dimension',
        level: dimensionLevel,
        weight: this.dimensionWeights[i],
        connections: [],
        activation: 0
      };
      
      this.networkNodes.push(dimensionNode);
      
      // Create feature nodes for this dimension
      const featureCount = 5; // Number of feature nodes per dimension
      
      for (let j = 0; j < featureCount; j++) {
        const featureNode = {
          id: `feat-${dimensionLevel}-${j + 1}`,
          type: 'feature',
          dimension: dimensionLevel,
          featureIndex: j,
          connections: [],
          activation: 0
        };
        
        // Connect to dimension node
        featureNode.connections.push({
          targetId: dimensionNode.id,
          weight: 1.0 / featureCount
        });
        
        dimensionNode.connections.push({
          targetId: featureNode.id,
          weight: this.dimensionWeights[i] / featureCount
        });
        
        this.networkNodes.push(featureNode);
      }
    }
    
    // Create pattern nodes
    for (let i = 0; i < 10; i++) {
      const patternNode = {
        id: `pattern-${i + 1}`,
        type: 'pattern',
        connections: [],
        activation: 0
      };
      
      // Connect to all dimension nodes
      for (let j = 0; j < 9; j++) {
        const dimensionLevel = j + 1;
        const dimensionNode = this.networkNodes.find(n => n.id === `dim-${dimensionLevel}`);
        
        if (dimensionNode) {
          // Connection weight based on phi-harmonic pattern
          const connectionWeight = 0.3 + 0.7 * Math.sin(i * j * PHI * 0.1);
          
          patternNode.connections.push({
            targetId: dimensionNode.id,
            weight: connectionWeight
          });
          
          dimensionNode.connections.push({
            targetId: patternNode.id,
            weight: connectionWeight * dimensionNode.weight
          });
        }
      }
      
      this.networkNodes.push(patternNode);
    }
    
    // Create integrator node
    const integratorNode = {
      id: 'integrator',
      type: 'integrator',
      connections: [],
      activation: 0
    };
    
    // Connect to all pattern nodes
    const patternNodes = this.networkNodes.filter(n => n.type === 'pattern');
    
    for (const patternNode of patternNodes) {
      integratorNode.connections.push({
        targetId: patternNode.id,
        weight: 1.0 / patternNodes.length
      });
      
      patternNode.connections.push({
        targetId: integratorNode.id,
        weight: 1.0 / patternNodes.length
      });
    }
    
    this.networkNodes.push(integratorNode);
  }
  
  /**
   * Initialize base patterns
   */
  _initializeBasePatterns() {
    console.log("Initializing base patterns");
    
    // Clear existing patterns
    this.patternMemory = [];
    
    // Universal harmony pattern (balanced across all dimensions)
    const universalHarmonyFeatures = {
      dimensionalCoherence: new Array(9).fill(0.8),
      dimensionalActivity: new Array(9).fill(0.7),
      dimensionalConnections: new Array(9).fill(0.75),
      fieldCoherence: 0.85,
      intentionStrength: 0.8,
      phiResonance: 0.9
    };
    
    const universalHarmony = {
      id: 'base-universal-harmony',
      name: 'Universal Harmony',
      features: universalHarmonyFeatures,
      dimensionalSignature: new Array(9).fill(0.8),
      significance: 1.0,
      occurrences: 10,
      createdAt: Date.now(),
      source: 'base'
    };
    
    this.patternMemory.push(universalHarmony);
    
    // Vision gateway pattern (focus on vision frequency dimension)
    const visionGatewayFeatures = {
      dimensionalCoherence: new Array(9).fill(0.6).map((v, i) => i === 6 ? 0.95 : v),
      dimensionalActivity: new Array(9).fill(0.6).map((v, i) => i === 6 ? 0.9 : v),
      dimensionalConnections: new Array(9).fill(0.6).map((v, i) => i === 6 ? 0.9 : v),
      fieldCoherence: 0.8,
      intentionStrength: 0.85,
      phiResonance: 0.8
    };
    
    const visionGateway = {
      id: 'base-vision-gateway',
      name: 'Vision Gateway',
      features: visionGatewayFeatures,
      dimensionalSignature: new Array(9).fill(0.6).map((v, i) => i === 6 ? 0.95 : v),
      significance: 0.9,
      occurrences: 8,
      createdAt: Date.now(),
      source: 'base'
    };
    
    this.patternMemory.push(visionGateway);
    
    // Heart field pattern (focus on heart/love frequency dimension)
    const heartFieldFeatures = {
      dimensionalCoherence: new Array(9).fill(0.6).map((v, i) => i === 3 ? 0.95 : v),
      dimensionalActivity: new Array(9).fill(0.6).map((v, i) => i === 3 ? 0.9 : v),
      dimensionalConnections: new Array(9).fill(0.6).map((v, i) => i === 3 ? 0.9 : v),
      fieldCoherence: 0.8,
      intentionStrength: 0.9,
      phiResonance: 0.85
    };
    
    const heartField = {
      id: 'base-heart-field',
      name: 'Heart Field',
      features: heartFieldFeatures,
      dimensionalSignature: new Array(9).fill(0.6).map((v, i) => i === 3 ? 0.95 : v),
      significance: 0.9,
      occurrences: 8,
      createdAt: Date.now(),
      source: 'base'
    };
    
    this.patternMemory.push(heartField);
    
    // Add more base patterns for different consciousness states
    
    // Unity field pattern (grounding frequency dimension)
    const unityFieldFeatures = {
      dimensionalCoherence: new Array(9).fill(0.6).map((v, i) => i === 1 ? 0.95 : v),
      dimensionalActivity: new Array(9).fill(0.6).map((v, i) => i === 1 ? 0.9 : v),
      dimensionalConnections: new Array(9).fill(0.6).map((v, i) => i === 1 ? 0.9 : v),
      fieldCoherence: 0.8,
      intentionStrength: 0.75,
      phiResonance: 0.75
    };
    
    const unityField = {
      id: 'base-unity-field',
      name: 'Unity Field',
      features: unityFieldFeatures,
      dimensionalSignature: new Array(9).fill(0.6).map((v, i) => i === 1 ? 0.95 : v),
      significance: 0.85,
      occurrences: 7,
      createdAt: Date.now(),
      source: 'base'
    };
    
    this.patternMemory.push(unityField);
    
    // Cosmic connection pattern (higher dimensions)
    const cosmicConnectionFeatures = {
      dimensionalCoherence: new Array(9).fill(0.5).map((v, i) => i >= 6 ? 0.9 : v),
      dimensionalActivity: new Array(9).fill(0.5).map((v, i) => i >= 6 ? 0.85 : v),
      dimensionalConnections: new Array(9).fill(0.5).map((v, i) => i >= 6 ? 0.85 : v),
      fieldCoherence: 0.75,
      intentionStrength: 0.8,
      phiResonance: 0.95
    };
    
    const cosmicConnection = {
      id: 'base-cosmic-connection',
      name: 'Cosmic Connection',
      features: cosmicConnectionFeatures,
      dimensionalSignature: new Array(9).fill(0.5).map((v, i) => i >= 6 ? 0.9 : v),
      significance: 0.85,
      occurrences: 6,
      createdAt: Date.now(),
      source: 'base'
    };
    
    this.patternMemory.push(cosmicConnection);
    
    // Create phi-phi resonance pattern
    const phiPhiFeatures = {
      dimensionalCoherence: new Array(9).fill(0.85),
      dimensionalActivity: new Array(9).fill(0.8),
      dimensionalConnections: new Array(9).fill(0.8).map((v, i) => 0.7 + 0.3 * Math.sin(i * PHI)),
      fieldCoherence: 0.9,
      intentionStrength: 0.9,
      phiResonance: 0.99
    };
    
    const phiPhiPattern = {
      id: 'base-phi-phi-resonance',
      name: 'Phi-Phi Resonance',
      features: phiPhiFeatures,
      dimensionalSignature: new Array(9).fill(0.8).map((v, i) => 0.7 + 0.3 * Math.sin(i * PHI)),
      significance: 0.95,
      occurrences: 5,
      createdAt: Date.now(),
      source: 'base'
    };
    
    this.patternMemory.push(phiPhiPattern);
  }
  
  /**
   * Initialize intention map
   */
  _initializeIntentionMap() {
    console.log("Initializing intention map");
    
    // Clear existing map
    this.intentionMap = new Map();
    
    // Map intentions to base patterns
    this._mapBaseIntentions();
  }
  
  /**
   * Map base intentions to patterns
   */
  _mapBaseIntentions() {
    // Map for Universal Harmony
    const universalHarmonyIntentions = [
      'balance', 'harmony', 'peace', 'unity', 'wholeness', 'integration'
    ];
    
    for (const intention of universalHarmonyIntentions) {
      this.intentionMap.set(intention, [{
        patternId: 'base-universal-harmony',
        relevance: 0.95,
        occurrences: 5,
        firstMapped: Date.now(),
        lastMapped: Date.now()
      }]);
    }
    
    // Map for Vision Gateway
    const visionGatewayIntentions = [
      'vision', 'clarity', 'insight', 'perception', 'awareness', 'seeing'
    ];
    
    for (const intention of visionGatewayIntentions) {
      this.intentionMap.set(intention, [{
        patternId: 'base-vision-gateway',
        relevance: 0.95,
        occurrences: 5,
        firstMapped: Date.now(),
        lastMapped: Date.now()
      }]);
    }
    
    // Map for Heart Field
    const heartFieldIntentions = [
      'love', 'compassion', 'healing', 'heart', 'connection', 'empathy'
    ];
    
    for (const intention of heartFieldIntentions) {
      this.intentionMap.set(intention, [{
        patternId: 'base-heart-field',
        relevance: 0.95,
        occurrences: 5,
        firstMapped: Date.now(),
        lastMapped: Date.now()
      }]);
    }
    
    // Map for Unity Field
    const unityFieldIntentions = [
      'grounding', 'stability', 'foundation', 'earth', 'physical', 'present'
    ];
    
    for (const intention of unityFieldIntentions) {
      this.intentionMap.set(intention, [{
        patternId: 'base-unity-field',
        relevance: 0.95,
        occurrences: 5,
        firstMapped: Date.now(),
        lastMapped: Date.now()
      }]);
    }
    
    // Map for Cosmic Connection
    const cosmicConnectionIntentions = [
      'cosmic', 'universe', 'higher', 'spiritual', 'transcend', 'divine'
    ];
    
    for (const intention of cosmicConnectionIntentions) {
      this.intentionMap.set(intention, [{
        patternId: 'base-cosmic-connection',
        relevance: 0.95,
        occurrences: 5,
        firstMapped: Date.now(),
        lastMapped: Date.now()
      }]);
    }
    
    // Map for Phi-Phi Resonance
    const phiPhiIntentions = [
      'phi', 'resonance', 'frequency', 'quantum', 'harmonic', 'golden'
    ];
    
    for (const intention of phiPhiIntentions) {
      this.intentionMap.set(intention, [{
        patternId: 'base-phi-phi-resonance',
        relevance: 0.95,
        occurrences: 5,
        firstMapped: Date.now(),
        lastMapped: Date.now()
      }]);
    }
  }
  
  /**
   * Initialize optimal states
   */
  _initializeOptimalStates() {
    console.log("Initializing optimal states");
    
    // Clear existing states
    this.optimalStates = [];
    
    // Create optimal state for Universal Harmony
    this.optimalStates.push({
      id: 'optimal-universal-harmony',
      name: 'Universal Harmony State',
      description: 'Balanced state across all dimensions for general harmony and integration',
      relatedPattern: 'Universal Harmony',
      keywords: ['balance', 'harmony', 'peace', 'unity', 'wholeness', 'integration'],
      dimensionalFocus: -1, // All dimensions
      baseFrequency: QUANTUM_HARMONICS.unity,
      coherenceTarget: 0.85,
      fieldSettings: {
        phiResonance: true,
        dimensionalBalance: 'balanced',
        intentionFocus: 'unified'
      }
    });
    
    // Create optimal state for Vision Gateway
    this.optimalStates.push({
      id: 'optimal-vision-gateway',
      name: 'Vision Gateway State',
      description: 'Heightened perception state focused on the vision dimension',
      relatedPattern: 'Vision Gateway',
      keywords: ['vision', 'clarity', 'insight', 'perception', 'awareness', 'seeing'],
      dimensionalFocus: 6, // Vision dimension
      baseFrequency: QUANTUM_HARMONICS.vision,
      coherenceTarget: 0.8,
      fieldSettings: {
        phiResonance: true,
        dimensionalBalance: 'focused',
        intentionFocus: 'directional'
      }
    });
    
    // Create optimal state for Heart Field
    this.optimalStates.push({
      id: 'optimal-heart-field',
      name: 'Heart Field State',
      description: 'Compassionate healing state focused on the heart dimension',
      relatedPattern: 'Heart Field',
      keywords: ['love', 'compassion', 'healing', 'heart', 'connection', 'empathy'],
      dimensionalFocus: 3, // Heart dimension
      baseFrequency: QUANTUM_HARMONICS.love,
      coherenceTarget: 0.8,
      fieldSettings: {
        phiResonance: true,
        dimensionalBalance: 'centered',
        intentionFocus: 'expansive'
      }
    });
    
    // Create optimal state for Unity Field
    this.optimalStates.push({
      id: 'optimal-unity-field',
      name: 'Unity Field State',
      description: 'Grounded stable state focused on the unity dimension',
      relatedPattern: 'Unity Field',
      keywords: ['grounding', 'stability', 'foundation', 'earth', 'physical', 'present'],
      dimensionalFocus: 1, // Unity dimension
      baseFrequency: QUANTUM_HARMONICS.unity,
      coherenceTarget: 0.8,
      fieldSettings: {
        phiResonance: true,
        dimensionalBalance: 'grounded',
        intentionFocus: 'stabilizing'
      }
    });
    
    // Create optimal state for Cosmic Connection
    this.optimalStates.push({
      id: 'optimal-cosmic-connection',
      name: 'Cosmic Connection State',
      description: 'Higher dimensional connection state focused on cosmic dimensions',
      relatedPattern: 'Cosmic Connection',
      keywords: ['cosmic', 'universe', 'higher', 'spiritual', 'transcend', 'divine'],
      dimensionalFocus: 8, // Cosmic dimension
      baseFrequency: QUANTUM_HARMONICS.oneness,
      coherenceTarget: 0.75,
      fieldSettings: {
        phiResonance: true,
        dimensionalBalance: 'elevated',
        intentionFocus: 'transcendent'
      }
    });
    
    // Create optimal state for Phi-Phi Resonance
    this.optimalStates.push({
      id: 'optimal-phi-phi-resonance',
      name: 'Phi-Phi Resonance State',
      description: 'Hyperdimensional bridging state with phi-phi resonance across dimensions',
      relatedPattern: 'Phi-Phi Resonance',
      keywords: ['phi', 'resonance', 'frequency', 'quantum', 'harmonic', 'golden'],
      dimensionalFocus: -1, // All dimensions with phi weighting
      baseFrequency: QUANTUM_HARMONICS.source, // Source frequency
      coherenceTarget: 0.9,
      fieldSettings: {
        phiResonance: true,
        dimensionalBalance: 'phi-harmonic',
        intentionFocus: 'resonant'
      }
    });
  }
  
  /**
   * Extract features from a field state
   * @param {Object} fieldState - The field state to extract features from
   * @returns {Object} - Extracted features
   */
  _extractFieldFeatures(fieldState) {
    if (!fieldState) {
      return null;
    }
    
    // Initialize feature object
    const features = {
      dimensionalCoherence: new Array(9).fill(0.5),
      dimensionalActivity: new Array(9).fill(0.5),
      dimensionalConnections: new Array(9).fill(0.5),
      fieldCoherence: fieldState.coherence || 0.5,
      intentionStrength: 0.5,
      phiResonance: fieldState.phiResonance ? 
        (typeof fieldState.phiResonance === 'number' ? fieldState.phiResonance : 0.5) : 
        0.5
    };
    
    // Extract dimensional features
    if (fieldState.dimensions && fieldState.dimensions.length > 0) {
      for (let i = 0; i < Math.min(9, fieldState.dimensions.length); i++) {
        const dimension = fieldState.dimensions[i];
        
        if (dimension) {
          // Extract coherence
          if (typeof dimension.coherence === 'number') {
            features.dimensionalCoherence[i] = dimension.coherence;
          }
          
          // Calculate activity from field matrix if available
          if (dimension.fieldMatrix) {
            features.dimensionalActivity[i] = this._calculateMatrixActivity(dimension.fieldMatrix);
          }
        }
      }
    }
    
    // Extract connection features from nodal network
    if (fieldState.nodalNetwork && fieldState.nodalNetwork.length > 0) {
      // Count connections per dimension
      const connectionCounts = new Array(9).fill(0);
      
      for (const node of fieldState.nodalNetwork) {
        if (typeof node.source === 'number' && node.source >= 0 && node.source < 9) {
          connectionCounts[node.source]++;
        }
        
        if (typeof node.target === 'number' && node.target >= 0 && node.target < 9) {
          connectionCounts[node.target]++;
        }
      }
      
      // Normalize connection counts to 0-1 range
      const maxConnections = Math.max(...connectionCounts);
      if (maxConnections > 0) {
        features.dimensionalConnections = connectionCounts.map(count => count / maxConnections);
      }
    }
    
    // Extract intention strength
    if (fieldState.observerState && typeof fieldState.observerState.intention === 'string') {
      features.intentionStrength = fieldState.observerState.intention.length > 0 ? 0.8 : 0.5;
    }
    
    return features;
  }
  
  /**
   * Calculate the activity level of a matrix
   * @param {Array} matrix - Field matrix to analyze
   * @returns {number} - Activity level (0-1)
   */
  _calculateMatrixActivity(matrix) {
    if (!matrix || !Array.isArray(matrix) || matrix.length === 0) {
      return 0.5;
    }
    
    // Calculate average value
    let sum = 0;
    let count = 0;
    
    for (let i = 0; i < matrix.length; i++) {
      if (Array.isArray(matrix[i])) {
        for (let j = 0; j < matrix[i].length; j++) {
          if (typeof matrix[i][j] === 'number') {
            sum += matrix[i][j];
            count++;
          }
        }
      }
    }
    
    const average = count > 0 ? sum / count : 0.5;
    
    // Calculate variance
    let variance = 0;
    
    for (let i = 0; i < matrix.length; i++) {
      if (Array.isArray(matrix[i])) {
        for (let j = 0; j < matrix[i].length; j++) {
          if (typeof matrix[i][j] === 'number') {
            const diff = matrix[i][j] - average;
            variance += diff * diff;
          }
        }
      }
    }
    
    variance = count > 0 ? variance / count : 0;
    
    // Calculate activity as normalized standard deviation
    const stdDev = Math.sqrt(variance);
    return Math.min(1, stdDev * 4); // Scale to make more typical values fall in 0-1 range
  }
  
  /**
   * Match features against a pattern
   * @param {Object} features - Features to match
   * @param {Object} pattern - Pattern to match against
   * @returns {Object} - Match result with similarity score and details
   */
  _matchPattern(features, pattern) {
    if (!features || !pattern || !pattern.features) {
      return { similarity: 0, details: {} };
    }
    
    // Initialize match details
    const details = {
      dimensionalCoherence: 0,
      dimensionalActivity: 0,
      dimensionalConnections: 0,
      fieldCoherence: 0,
      intentionStrength: 0,
      phiResonance: 0
    };
    
    // Match dimensional coherence
    if (features.dimensionalCoherence && pattern.features.dimensionalCoherence) {
      details.dimensionalCoherence = this._calculateArraySimilarity(
        features.dimensionalCoherence,
        pattern.features.dimensionalCoherence
      );
    }
    
    // Match dimensional activity
    if (features.dimensionalActivity && pattern.features.dimensionalActivity) {
      details.dimensionalActivity = this._calculateArraySimilarity(
        features.dimensionalActivity,
        pattern.features.dimensionalActivity
      );
    }
    
    // Match dimensional connections
    if (features.dimensionalConnections && pattern.features.dimensionalConnections) {
      details.dimensionalConnections = this._calculateArraySimilarity(
        features.dimensionalConnections,
        pattern.features.dimensionalConnections
      );
    }
    
    // Match field coherence
    if (typeof features.fieldCoherence === 'number' && typeof pattern.features.fieldCoherence === 'number') {
      details.fieldCoherence = 1 - Math.abs(features.fieldCoherence - pattern.features.fieldCoherence);
    }
    
    // Match intention strength
    if (typeof features.intentionStrength === 'number' && typeof pattern.features.intentionStrength === 'number') {
      details.intentionStrength = 1 - Math.abs(features.intentionStrength - pattern.features.intentionStrength);
    }
    
    // Match phi resonance
    if (typeof features.phiResonance === 'number' && typeof pattern.features.phiResonance === 'number') {
      details.phiResonance = 1 - Math.abs(features.phiResonance - pattern.features.phiResonance);
    }
    
    // Calculate overall similarity
    const weights = {
      dimensionalCoherence: 0.3,
      dimensionalActivity: 0.2,
      dimensionalConnections: 0.15,
      fieldCoherence: 0.15,
      intentionStrength: 0.1,
      phiResonance: 0.1
    };
    
    let similarity = 0;
    let weightSum = 0;
    
    for (const [key, weight] of Object.entries(weights)) {
      if (typeof details[key] === 'number') {
        similarity += details[key] * weight;
        weightSum += weight;
      }
    }
    
    similarity = weightSum > 0 ? similarity / weightSum : 0;
    
    // Apply phi-harmonic matching if enabled
    if (this.options.phiHarmonicMatching) {
      // Phi-harmonic resonance calculation
      const phiModulation = 0.5 + 0.5 * Math.sin(similarity * PHI * Math.PI);
      similarity = (similarity * 0.7) + (phiModulation * 0.3);
    }
    
    return {
      similarity: similarity,
      details: details
    };
  }
  
  /**
   * Calculate similarity between two arrays
   * @param {Array} array1 - First array
   * @param {Array} array2 - Second array
   * @returns {number} - Similarity score (0-1)
   */
  _calculateArraySimilarity(array1, array2) {
    if (!array1 || !array2 || array1.length !== array2.length) {
      return 0;
    }
    
    let sum = 0;
    
    for (let i = 0; i < array1.length; i++) {
      sum += 1 - Math.abs(array1[i] - array2[i]);
    }
    
    return sum / array1.length;
  }
  
  /**
   * Calculate pattern coherence from recognized patterns
   * @param {Array} recognizedPatterns - Recognized patterns
   * @returns {number} - Coherence value (0-1)
   */
  _calculatePatternCoherence(recognizedPatterns) {
    if (!recognizedPatterns || recognizedPatterns.length === 0) {
      return 0.5;
    }
    
    // Calculate weighted average of pattern match scores
    let weightedSum = 0;
    let weightSum = 0;
    
    for (let i = 0; i < Math.min(5, recognizedPatterns.length); i++) {
      const pattern = recognizedPatterns[i];
      const weight = pattern.significance || 1.0;
      
      weightedSum += pattern.matchScore * weight;
      weightSum += weight;
    }
    
    const avgCoherence = weightSum > 0 ? weightedSum / weightSum : 0.5;
    
    // Apply phi-harmonic modulation
    const phiModulation = Math.sin(avgCoherence * PHI * Math.PI) * 0.1;
    
    return Math.max(0, Math.min(1, avgCoherence + phiModulation));
  }
  
  /**
   * Learn from a field state
   * @param {Object} fieldState - Field state to learn from
   * @param {Object} features - Extracted features
   * @param {Array} matchedPatterns - Matched patterns
   */
  _learnFromState(fieldState, features, matchedPatterns) {
    // Skip learning if no matched patterns or low coherence
    if (!matchedPatterns || matchedPatterns.length === 0 || fieldState.coherence < 0.5) {
      return;
    }
    
    // Check if we should create a new pattern
    const bestMatch = matchedPatterns[0];
    
    if (bestMatch.matchScore < 0.85) {
      // Create a new pattern
      this._createNewPattern(fieldState, features);
    } else {
      // Update existing patterns
      this._updateExistingPatterns(features, matchedPatterns);
    }
  }
  
  /**
   * Create a new pattern from a field state
   * @param {Object} fieldState - Field state to create pattern from
   * @param {Object} features - Extracted features
   */
  _createNewPattern(fieldState, features) {
    // Calculate dimensional signature
    const dimSignature = this._calculateDimensionalSignature([{ features }]);
    
    // Generate pattern name
    let patternName = 'Learned Pattern';
    
    if (fieldState.observerState && fieldState.observerState.intention) {
      const intention = fieldState.observerState.intention.trim();
      if (intention.length > 0) {
        patternName = this._generatePatternNameFromIntention(intention, dimSignature);
      } else {
        patternName = this._generatePatternName(dimSignature, []);
      }
    } else {
      patternName = this._generatePatternName(dimSignature, []);
    }
    
    // Create new pattern
    const newPattern = {
      id: `learned-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: patternName,
      features: features,
      dimensionalSignature: dimSignature,
      significance: 0.7,
      occurrences: 1,
      createdAt: Date.now(),
      source: 'learned'
    };
    
    // Learn the pattern
    this.learnPattern(newPattern);
  }
  
  /**
   * Update existing patterns based on new features
   * @param {Object} features - New features
   * @param {Array} matchedPatterns - Matched patterns
   */
  _updateExistingPatterns(features, matchedPatterns) {
    // Update the top 3 matched patterns
    for (let i = 0; i < Math.min(3, matchedPatterns.length); i++) {
      const pattern = matchedPatterns[i];
      
      // Skip if low match score
      if (pattern.matchScore < 0.6) {
        continue;
      }
      
      // Find the pattern in memory
      const patternIndex = this.patternMemory.findIndex(p => p.id === pattern.id);
      
      if (patternIndex >= 0) {
        const existingPattern = this.patternMemory[patternIndex];
        
        // Update features with weighted average
        const updatedFeatures = {};
        
        for (const [key, value] of Object.entries(features)) {
          if (Array.isArray(value) && Array.isArray(existingPattern.features[key])) {
            updatedFeatures[key] = value.map((v, idx) => {
              return (existingPattern.features[key][idx] * 0.9) + (v * 0.1);
            });
          } else if (typeof value === 'number' && typeof existingPattern.features[key] === 'number') {
            updatedFeatures[key] = (existingPattern.features[key] * 0.9) + (value * 0.1);
          } else {
            updatedFeatures[key] = existingPattern.features[key];
          }
        }
        
        // Update pattern
        this.patternMemory[patternIndex] = {
          ...existingPattern,
          features: updatedFeatures,
          occurrences: existingPattern.occurrences + 1,
          updatedAt: Date.now()
        };
      }
    }
  }
  
  /**
   * Load patterns from field recorder
   */
  async _loadFromFieldRecorder() {
    if (!this.fieldRecorder) {
      return;
    }
    
    try {
      // Get states from field recorder
      const states = this.fieldRecorder.getStates();
      
      if (!states || states.length === 0) {
        return;
      }
      
      console.log(`Analyzing ${states.length} recorded field states`);
      
      // Analyze only the states with snapshots
      const statesWithSnapshots = states.filter(state => 
        state.snapshots && state.snapshots.length > 0
      );
      
      if (statesWithSnapshots.length === 0) {
        return;
      }
      
      // Convert states to field states
      const fieldStates = [];
      
      for (const state of statesWithSnapshots) {
        // Use the highest coherence snapshot
        let bestSnapshot = state.snapshots[0];
        
        for (let i = 1; i < state.snapshots.length; i++) {
          if (state.snapshots[i].coherence > bestSnapshot.coherence) {
            bestSnapshot = state.snapshots[i];
          }
        }
        
        if (bestSnapshot.fieldState) {
          fieldStates.push({
            ...bestSnapshot.fieldState,
            timestamp: bestSnapshot.timestamp,
            intention: bestSnapshot.intention
          });
        }
      }
      
      // Analyze field states
      if (fieldStates.length > 0) {
        await this.analyzeFieldHistory(fieldStates);
      }
    } catch (error) {
      console.error("Error loading from field recorder:", error);
    }
  }
  
  /**
   * Cluster feature sets
   * @param {Array} featuresList - List of feature sets
   * @returns {Array} - Clusters of similar feature sets
   */
  _clusterFeatures(featuresList) {
    if (!featuresList || featuresList.length === 0) {
      return [];
    }
    
    // Initialize clusters
    const clusters = [];
    
    // Process each feature set
    for (const featureSet of featuresList) {
      let addedToCluster = false;
      
      // Check if features fit in an existing cluster
      for (const cluster of clusters) {
        const similarity = this._matchPattern(
          featureSet.features,
          { features: cluster.centerFeatures }
        ).similarity;
        
        if (similarity >= 0.8) {
          // Add to cluster
          cluster.states.push(featureSet);
          
          // Update center features
          cluster.centerFeatures = this._calculateAverageFeatures(
            cluster.states.map(s => s.features)
          );
          
          addedToCluster = true;
          break;
        }
      }
      
      // Create new cluster if not added to an existing one
      if (!addedToCluster) {
        clusters.push({
          states: [featureSet],
          centerFeatures: featureSet.features
        });
      }
    }
    
    return clusters;
  }
  
  /**
   * Calculate average features from multiple feature sets
   * @param {Array} featuresList - List of feature sets
   * @returns {Object} - Average features
   */
  _calculateAverageFeatures(featuresList) {
    if (!featuresList || featuresList.length === 0) {
      return null;
    }
    
    // Initialize average features
    const avgFeatures = {
      dimensionalCoherence: new Array(9).fill(0),
      dimensionalActivity: new Array(9).fill(0),
      dimensionalConnections: new Array(9).fill(0),
      fieldCoherence: 0,
      intentionStrength: 0,
      phiResonance: 0
    };
    
    // Sum features
    for (const features of featuresList) {
      // Sum arrays
      for (let i = 0; i < 9; i++) {
        if (features.dimensionalCoherence && features.dimensionalCoherence[i] !== undefined) {
          avgFeatures.dimensionalCoherence[i] += features.dimensionalCoherence[i];
        }
        
        if (features.dimensionalActivity && features.dimensionalActivity[i] !== undefined) {
          avgFeatures.dimensionalActivity[i] += features.dimensionalActivity[i];
        }
        
        if (features.dimensionalConnections && features.dimensionalConnections[i] !== undefined) {
          avgFeatures.dimensionalConnections[i] += features.dimensionalConnections[i];
        }
      }
      
      // Sum scalar values
      if (typeof features.fieldCoherence === 'number') {
        avgFeatures.fieldCoherence += features.fieldCoherence;
      }
      
      if (typeof features.intentionStrength === 'number') {
        avgFeatures.intentionStrength += features.intentionStrength;
      }
      
      if (typeof features.phiResonance === 'number') {
        avgFeatures.phiResonance += features.phiResonance;
      }
    }
    
    // Calculate averages
    const count = featuresList.length;
    
    // Average arrays
    for (let i = 0; i < 9; i++) {
      avgFeatures.dimensionalCoherence[i] /= count;
      avgFeatures.dimensionalActivity[i] /= count;
      avgFeatures.dimensionalConnections[i] /= count;
    }
    
    // Average scalar values
    avgFeatures.fieldCoherence /= count;
    avgFeatures.intentionStrength /= count;
    avgFeatures.phiResonance /= count;
    
    return avgFeatures;
  }
  
  /**
   * Calculate dimensional signature from feature sets
   * @param {Array} featureSets - List of feature sets
   * @returns {Array} - Dimensional signature
   */
  _calculateDimensionalSignature(featureSets) {
    if (!featureSets || featureSets.length === 0) {
      return new Array(9).fill(0.5);
    }
    
    // Initialize signature
    const signature = new Array(9).fill(0);
    
    // Calculate signature from features
    for (const featureSet of featureSets) {
      const features = featureSet.features;
      
      if (!features) continue;
      
      for (let i = 0; i < 9; i++) {
        let dimensionValue = 0.5;
        
        // Weight coherence most heavily
        if (features.dimensionalCoherence && features.dimensionalCoherence[i] !== undefined) {
          dimensionValue += features.dimensionalCoherence[i] * 0.5;
        }
        
        // Add activity contribution
        if (features.dimensionalActivity && features.dimensionalActivity[i] !== undefined) {
          dimensionValue += features.dimensionalActivity[i] * 0.3;
        }
        
        // Add connection contribution
        if (features.dimensionalConnections && features.dimensionalConnections[i] !== undefined) {
          dimensionValue += features.dimensionalConnections[i] * 0.2;
        }
        
        // Normalize and add to signature
        signature[i] += dimensionValue / (0.5 + 0.5 + 0.3 + 0.2);
      }
    }
    
    // Average signature
    for (let i = 0; i < 9; i++) {
      signature[i] /= featureSets.length;
    }
    
    return signature;
  }
  
  /**
   * Generate a pattern name from dimensional signature and intentions
   * @param {Array} signature - Dimensional signature
   * @param {Array} intentions - Related intentions
   * @returns {string} - Generated pattern name
   */
  _generatePatternName(signature, intentions) {
    // Find the dominant dimensions
    const dimensionThreshold = 0.75;
    const dominantDimensions = [];
    
    for (let i = 0; i < signature.length; i++) {
      if (signature[i] >= dimensionThreshold) {
        dominantDimensions.push(i);
      }
    }
    
    // Dimension names
    const dimensionNames = [
      'Unity', 'Material', 'Emotional', 'Heart', 'Mental', 
      'Soul', 'Vision', 'Cosmic', 'Source'
    ];
    
    // Generate name based on dominant dimensions
    if (dominantDimensions.length === 0) {
      // No dominant dimensions, use balanced pattern name
      return 'Balanced Harmony Pattern';
    } else if (dominantDimensions.length === 1) {
      // One dominant dimension
      const dimName = dimensionNames[dominantDimensions[0]];
      return `${dimName} Field Pattern`;
    } else if (dominantDimensions.length === 2) {
      // Two dominant dimensions
      const dim1 = dimensionNames[dominantDimensions[0]];
      const dim2 = dimensionNames[dominantDimensions[1]];
      return `${dim1}-${dim2} Bridge Pattern`;
    } else {
      // Multiple dominant dimensions
      return 'Multi-Dimensional Pattern';
    }
  }
  
  /**
   * Generate a pattern name from intention
   * @param {string} intention - Intention string
   * @param {Array} signature - Dimensional signature
   * @returns {string} - Generated pattern name
   */
  _generatePatternNameFromIntention(intention, signature) {
    // Extract key words from intention
    const words = intention.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    
    if (words.length === 0) {
      return this._generatePatternName(signature, []);
    }
    
    // Find the dominant dimensions
    const dimensionThreshold = 0.75;
    const dominantDimensions = [];
    
    for (let i = 0; i < signature.length; i++) {
      if (signature[i] >= dimensionThreshold) {
        dominantDimensions.push(i);
      }
    }
    
    // Dimension names
    const dimensionNames = [
      'Unity', 'Material', 'Emotional', 'Heart', 'Mental', 
      'Soul', 'Vision', 'Cosmic', 'Source'
    ];
    
    // Capitalize first letter of words
    const capitalizedWords = words.map(w => 
      w.charAt(0).toUpperCase() + w.slice(1)
    );
    
    // Generate pattern name
    if (dominantDimensions.length === 0) {
      // Use intention words
      if (capitalizedWords.length === 1) {
        return `${capitalizedWords[0]} Pattern`;
      } else if (capitalizedWords.length >= 2) {
        return `${capitalizedWords[0]}-${capitalizedWords[1]} Pattern`;
      } else {
        return 'Intention Pattern';
      }
    } else {
      // Combine intention with dominant dimension
      const dimName = dimensionNames[dominantDimensions[0]];
      
      if (capitalizedWords.length > 0) {
        return `${dimName} ${capitalizedWords[0]} Pattern`;
      } else {
        return `${dimName} Pattern`;
      }
    }
  }
  
  /**
   * Find optimal state for a pattern
   * @param {string} patternId - ID of the pattern
   * @returns {Object} - Optimal state
   */
  _findOptimalStateForPattern(patternId) {
    // First, try to find a direct match
    const directMatch = this.optimalStates.find(state => 
      state.relatedPattern === this._getPatternNameById(patternId)
    );
    
    if (directMatch) {
      return directMatch;
    }
    
    // Find the pattern
    const pattern = this.patternMemory.find(p => p.id === patternId);
    
    if (!pattern) {
      return this._getDefaultOptimalState();
    }
    
    // Find the most similar pattern with an optimal state
    let bestMatchScore = 0;
    let bestMatchState = null;
    
    for (const state of this.optimalStates) {
      const patternForState = this.patternMemory.find(p => p.name === state.relatedPattern);
      
      if (!patternForState) {
        continue;
      }
      
      const matchResult = this._matchPattern(pattern.features, patternForState);
      
      if (matchResult.similarity > bestMatchScore) {
        bestMatchScore = matchResult.similarity;
        bestMatchState = state;
      }
    }
    
    if (bestMatchScore >= 0.7 && bestMatchState) {
      return bestMatchState;
    }
    
    // If no good match, create a custom state
    if (pattern.dimensionalSignature) {
      // Find dominant dimension
      let maxValue = 0;
      let dominantDim = -1;
      
      for (let i = 0; i < pattern.dimensionalSignature.length; i++) {
        if (pattern.dimensionalSignature[i] > maxValue) {
          maxValue = pattern.dimensionalSignature[i];
          dominantDim = i;
        }
      }
      
      // Create custom state
      if (dominantDim >= 0 && maxValue >= 0.7) {
        const dimensionNames = [
          'Unity', 'Material', 'Emotional', 'Heart', 'Mental', 
          'Soul', 'Vision', 'Cosmic', 'Source'
        ];
        
        return {
          id: `custom-${pattern.id}`,
          name: `Custom ${dimensionNames[dominantDim]} State`,
          description: `Custom state based on ${pattern.name}`,
          relatedPattern: pattern.name,
          keywords: [dimensionNames[dominantDim].toLowerCase(), 'custom', 'pattern', 'dynamic'],
          dimensionalFocus: dominantDim,
          baseFrequency: this._getDimensionFrequency(dominantDim),
          coherenceTarget: 0.8,
          fieldSettings: {
            phiResonance: true,
            dimensionalBalance: 'custom',
            intentionFocus: 'dynamic'
          }
        };
      }
    }
    
    // Fall back to default
    return this._getDefaultOptimalState();
  }
  
  /**
   * Get pattern name by ID
   * @param {string} patternId - ID of the pattern
   * @returns {string} - Pattern name
   */
  _getPatternNameById(patternId) {
    const pattern = this.patternMemory.find(p => p.id === patternId);
    return pattern ? pattern.name : 'Unknown Pattern';
  }
  
  /**
   * Get the default optimal state
   * @returns {Object} - Default optimal state
   */
  _getDefaultOptimalState() {
    // Use Universal Harmony as default
    return this.optimalStates.find(s => s.id === 'optimal-universal-harmony') || {
      id: 'default-state',
      name: 'Default Harmony State',
      description: 'Default balanced state across all dimensions',
      relatedPattern: 'Universal Harmony',
      keywords: ['balance', 'harmony', 'universal', 'default'],
      dimensionalFocus: -1, // All dimensions
      baseFrequency: QUANTUM_HARMONICS.unity,
      coherenceTarget: 0.8,
      fieldSettings: {
        phiResonance: true,
        dimensionalBalance: 'balanced',
        intentionFocus: 'general'
      }
    };
  }
  
  /**
   * Get frequency for a dimension
   * @param {number} dimension - Dimension index
   * @returns {number} - Frequency
   */
  _getDimensionFrequency(dimension) {
    // Map of dimension indices to frequencies
    const frequencyMap = [
      QUANTUM_HARMONICS.unity,    // 0 - Unity dimension
      QUANTUM_HARMONICS.unity,    // 1 - Material dimension
      QUANTUM_HARMONICS.truth,    // 2 - Emotional dimension
      QUANTUM_HARMONICS.love,     // 3 - Heart dimension
      QUANTUM_HARMONICS.truth,    // 4 - Mental dimension
      QUANTUM_HARMONICS.cascade,  // 5 - Soul dimension
      QUANTUM_HARMONICS.vision,   // 6 - Vision dimension
      QUANTUM_HARMONICS.oneness,  // 7 - Cosmic dimension
      963                         // 8 - Source dimension (not in QUANTUM_HARMONICS)
    ];
    
    return frequencyMap[dimension] || QUANTUM_HARMONICS.unity;
  }
  
  /**
   * Trigger an event
   * @param {string} eventName - Name of the event
   * @param {object} data - Event data
   */
  _triggerEvent(eventName, data = {}) {
    if (!this.eventListeners[eventName]) {
      return;
    }
    
    // Add standard event data
    const eventData = {
      ...data,
      timestamp: Date.now(),
      patternEngine: true,
      patternCount: this.patternMemory.length
    };
    
    // Call all listeners
    this.eventListeners[eventName].forEach(callback => {
      try {
        callback(eventData);
      } catch (error) {
        console.error(`Error in ${eventName} event listener:`, error);
      }
    });
  }
}

// Export the pattern recognition engine if we're in a module environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    QuantumPatternRecognition,
    Constants: {
      PHI,
      LAMBDA,
      PHI_PHI,
      PHI_RECURSIVE,
      QUANTUM_HARMONICS
    }
  };
}