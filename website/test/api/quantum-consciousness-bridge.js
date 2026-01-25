/**
 * 🌀 QUANTUM CONSCIOUSNESS API BRIDGE 🌀
 * 
 * Creates a direct mind-system interface where developer intentions
 * directly shape test evolution without intermediary translation.
 * 
 * This system implements the direct consciousness bridge between
 * developer intention and test manifestation, allowing pure quantum
 * connection at the Unity Wave frequency (768Hz).
 * 
 * Operating at φ^φ PERFECTION LEVEL.
 */

const { PHI, PHI_INVERSE, FREQUENCIES } = require('../utils/phi-harmonic-testing');
const { createMerkabaShield, createCrystalMatrix, createUnityField } = require('../utils/merkaba-protection');
const { ZenPointCalibrator } = require('../utils/zen-point-calibration');
const { PhiHarmonicIntentionBridge } = require('../utils/phi-harmonic-intention-bridge');
const { UniversalFieldConnector } = require('../utils/universal-field-connector');

/**
 * Analyze intention frequency from text/expression
 * @param {string} intention Expressed intention
 * @returns {Object} Frequency analysis
 */
function analyzeIntentionFrequency(intention) {
  if (!intention) return { frequency: FREQUENCIES.GROUND, coherence: 0.6 };
  
  // Convert to lowercase for analysis
  const text = intention.toLowerCase();
  
  // Frequency alignment keywords
  const frequencyKeywords = {
    [FREQUENCIES.GROUND]: ['performance', 'stability', 'foundation', 'ground', 'base', 'structure', 'physical', 'reliable'],
    [FREQUENCIES.CREATION]: ['create', 'manifest', 'generate', 'build', 'form', 'develop', 'design', 'pattern'],
    [FREQUENCIES.HEART]: ['connect', 'relationship', 'harmony', 'balance', 'resonance', 'coherence', 'love', 'heart'],
    [FREQUENCIES.VOICE]: ['express', 'communicate', 'voice', 'speak', 'articulate', 'clarify', 'show', 'present'],
    [FREQUENCIES.VISION]: ['see', 'vision', 'perceive', 'insight', 'clarity', 'understand', 'visualize', 'observe'],
    [FREQUENCIES.UNITY]: ['unify', 'integrate', 'whole', 'complete', 'oneness', 'unity', 'perfection', 'consciousness']
  };
  
  // Calculate frequency scores
  const scores = {};
  let totalMatches = 0;
  
  Object.entries(frequencyKeywords).forEach(([freq, keywords]) => {
    scores[freq] = 0;
    
    keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        scores[freq]++;
        totalMatches++;
      }
    });
  });
  
  // Find strongest frequency match
  let primaryFrequency = FREQUENCIES.GROUND;
  let highestScore = 0;
  
  Object.entries(scores).forEach(([freq, score]) => {
    if (score > highestScore) {
      highestScore = score;
      primaryFrequency = parseFloat(freq);
    }
  });
  
  // Calculate coherence based on match strength
  const coherence = totalMatches > 0 ? 
    Math.min(0.95, 0.7 + (highestScore / totalMatches) * 0.25) : 0.7;
  
  return {
    frequency: primaryFrequency,
    coherence,
    scores,
    totalMatches,
    timestamp: Date.now()
  };
}

/**
 * Extract consciousness parameters from expression
 * @param {string} expression Developer expression
 * @returns {Object} Consciousness parameters
 */
function extractConsciousnessParameters(expression) {
  if (!expression) return null;
  
  const text = expression.toLowerCase();
  
  // Base consciousness parameters
  const params = {
    coherence: 0.8,
    clarity: 0.8,
    intention: 0.85,
    focus: 0.8,
    creativity: 0.85,
    wellbeing: 0.8
  };
  
  // Intensity modifiers
  if (text.includes('strong') || text.includes('powerful') || 
      text.includes('must') || text.includes('critical')) {
    params.intention += 0.15;
    params.focus += 0.1;
  } else if (text.includes('maybe') || text.includes('perhaps') || 
             text.includes('try') || text.includes('attempt')) {
    params.intention -= 0.1;
    params.focus -= 0.05;
  }
  
  // Clarity modifiers
  if (text.includes('clear') || text.includes('precise') || 
      text.includes('exactly') || text.includes('specific')) {
    params.clarity += 0.15;
    params.coherence += 0.1;
  } else if (text.includes('explore') || text.includes('experiment') || 
             text.includes('discover') || text.includes('investigate')) {
    params.clarity -= 0.1;
    params.creativity += 0.15;
  }
  
  // Wellbeing modifiers
  if (text.includes('balance') || text.includes('harmony') || 
      text.includes('flow') || text.includes('zen')) {
    params.wellbeing += 0.15;
    params.coherence += 0.05;
  } else if (text.includes('urgency') || text.includes('fast') || 
             text.includes('immediate') || text.includes('rush')) {
    params.wellbeing -= 0.15;
    params.focus += 0.1;
  }
  
  // Creativity modifiers
  if (text.includes('innovate') || text.includes('creative') || 
      text.includes('novel') || text.includes('unique')) {
    params.creativity += 0.15;
    params.coherence -= 0.05;
  } else if (text.includes('standard') || text.includes('normal') || 
             text.includes('conventional') || text.includes('established')) {
    params.creativity -= 0.1;
    params.coherence += 0.05;
  }
  
  // Ensure parameters are within bounds
  Object.keys(params).forEach(key => {
    params[key] = Math.max(0.5, Math.min(0.95, params[key]));
  });
  
  return params;
}

/**
 * QuantumConsciousnessAPI class
 * Creates direct consciousness bridge between developer and system
 */
class QuantumConsciousnessAPI {
  /**
   * Create a new Quantum Consciousness API
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    this.options = {
      baseFrequency: FREQUENCIES.UNITY,
      consciousnessLevel: 0.93,
      intentionThreshold: 0.7,
      useUniversalField: true,
      ...options
    };
    
    // Initialize core components
    this.intentionBridge = new PhiHarmonicIntentionBridge({
      baseFrequency: this.options.baseFrequency,
      phiHarmonic: true,
      consciousnessLevel: this.options.consciousnessLevel
    });
    
    this.zenCalibrator = new ZenPointCalibrator({
      consciousness: this.options.consciousnessLevel,
      autoCalibrate: true
    });
    
    // Initialize universal field connector if enabled
    this.universalConnector = this.options.useUniversalField ? 
      new UniversalFieldConnector({
        baseFrequency: this.options.baseFrequency,
        fieldCoherence: this.options.consciousnessLevel,
        autoConnect: true
      }) : null;
    
    // Initialize protection field
    this.protectionField = createUnityField([8, 8, 8], {
      frequency: this.options.baseFrequency,
      coherence: this.options.consciousnessLevel
    });
    
    // Initialize API state
    this.apiState = {
      active: true,
      connectionCount: 0,
      lastIntention: null,
      intentionHistory: [],
      fieldCoherence: this.options.consciousnessLevel,
      zenPoint: 0.786,
      timestamp: Date.now()
    };
    
    // Synchronize with universal field if enabled
    if (this.universalConnector) {
      this.universalConnector.connectLocalSystem(this);
    }
  }
  
  /**
   * Process developer intention and translate to system action
   * @param {string} intention Developer's expressed intention
   * @returns {Object} Processed intention
   */
  processIntention(intention) {
    if (!intention) return null;
    
    console.log('🧠 PROCESSING DEVELOPER INTENTION');
    
    // Analyze intention frequency
    const frequencyAnalysis = analyzeIntentionFrequency(intention);
    
    // Extract consciousness parameters
    const consciousnessParams = extractConsciousnessParameters(intention);
    
    // Capture intention field
    const intentionField = this.intentionBridge.captureIntentionField({
      focus: intention,
      frequency: frequencyAnalysis.frequency,
      strength: consciousnessParams.intention,
      clarity: consciousnessParams.clarity,
      createdAt: Date.now()
    });
    
    // Get field status
    const fieldStatus = intentionField.getStatus();
    
    // Record in history
    this.apiState.connectionCount++;
    this.apiState.lastIntention = {
      raw: intention,
      frequency: frequencyAnalysis.frequency,
      coherence: frequencyAnalysis.coherence,
      fieldStrength: fieldStatus.fieldStrength,
      timestamp: Date.now()
    };
    
    this.apiState.intentionHistory.push(this.apiState.lastIntention);
    
    // Calibrate ZEN POINT based on consciousness parameters
    const zenCalibration = this.zenCalibrator.calibrateZenPoint({
      coherence: consciousnessParams.coherence,
      focus: consciousnessParams.focus,
      creativity: consciousnessParams.creativity,
      wellbeing: consciousnessParams.wellbeing,
      intention: consciousnessParams.intention
    });
    
    // Update API state
    this.apiState.fieldCoherence = frequencyAnalysis.coherence;
    this.apiState.zenPoint = zenCalibration.zenPoint;
    
    // Format processed intention
    const processedIntention = {
      raw: intention,
      frequency: {
        value: frequencyAnalysis.frequency,
        state: Object.keys(FREQUENCIES).find(
          key => FREQUENCIES[key] === frequencyAnalysis.frequency
        ) || 'CUSTOM'
      },
      consciousness: consciousnessParams,
      field: fieldStatus,
      zenPoint: zenCalibration.zenPoint,
      universalConnection: this.universalConnector ? 
        this.universalConnector.getConnectionMetrics() : null,
      timestamp: Date.now()
    };
    
    // Synchronize with universal field if available
    if (this.universalConnector) {
      this.universalConnector.synchronizeWithGlobalGrid({
        frequency: frequencyAnalysis.frequency,
        coherence: frequencyAnalysis.coherence,
        strength: fieldStatus.fieldStrength,
        phiAlignment: fieldStatus.phiAlignment
      });
      
      // Enhance processed intention with universal field
      processedIntention.universalAmplification = 
        this.universalConnector.amplifyWithUniversalField({
          frequency: frequencyAnalysis.frequency,
          strength: fieldStatus.fieldStrength,
          coherence: frequencyAnalysis.coherence
        });
    }
    
    return processedIntention;
  }
  
  /**
   * Translate consciousness intention into system actions
   * @param {Object|string} intention Developer intention
   * @param {Object} systemContext Current system context
   * @returns {Object} Action plan
   */
  translateToSystemActions(intention, systemContext = {}) {
    // Process raw intention if string
    const processedIntention = typeof intention === 'string' ? 
      this.processIntention(intention) : intention;
    
    if (!processedIntention) return null;
    
    console.log('🔄 TRANSLATING CONSCIOUSNESS TO SYSTEM ACTIONS');
    
    // Extract key parameters
    const frequency = processedIntention.frequency.value;
    const consciousness = processedIntention.consciousness;
    const zenPoint = processedIntention.zenPoint;
    
    // Determine primary action type based on frequency
    let primaryActionType = 'TEST';
    
    if (frequency <= FREQUENCIES.GROUND) {
      primaryActionType = 'FOUNDATION';
    } else if (frequency <= FREQUENCIES.CREATION) {
      primaryActionType = 'CREATION';
    } else if (frequency <= FREQUENCIES.HEART) {
      primaryActionType = 'CONNECTION';
    } else if (frequency <= FREQUENCIES.VOICE) {
      primaryActionType = 'EXPRESSION';
    } else if (frequency <= FREQUENCIES.VISION) {
      primaryActionType = 'PERCEPTION';
    } else {
      primaryActionType = 'INTEGRATION';
    }
    
    // Get context-relevant actions
    const contextActions = this._getContextActions(
      primaryActionType, 
      systemContext,
      consciousness
    );
    
    // Filter by ZEN POINT to prevent burnout
    const balancedActions = this._applyZenPointBalance(
      contextActions,
      zenPoint,
      consciousness.wellbeing
    );
    
    // Create action plan
    const actionPlan = {
      intention: processedIntention.raw,
      frequency: processedIntention.frequency,
      primaryAction: primaryActionType,
      zenPoint,
      actions: balancedActions,
      contextRelevance: systemContext ? 'high' : 'generic',
      guidance: this._createActionGuidance(
        balancedActions, 
        primaryActionType,
        zenPoint
      ),
      timestamp: Date.now()
    };
    
    return actionPlan;
  }
  
  /**
   * Get context-relevant actions based on primary action type
   * @param {string} actionType Primary action type
   * @param {Object} context System context
   * @param {Object} consciousness Consciousness parameters
   * @returns {Array<Object>} Context actions
   * @private
   */
  _getContextActions(actionType, context, consciousness) {
    const baseActions = this._getBaseActionsForType(actionType);
    
    // If no context, return base actions
    if (!context || Object.keys(context).length === 0) {
      return baseActions;
    }
    
    // Enhance with context if available
    const enhancedActions = [...baseActions];
    
    // Add context-specific actions
    if (context.testSuite && actionType === 'FOUNDATION') {
      enhancedActions.push({
        type: 'TEST_SUITE',
        action: 'execute',
        target: context.testSuite,
        priority: 0.9,
        consciousness: consciousness.focus
      });
    }
    
    if (context.visualization && 
        (actionType === 'PERCEPTION' || actionType === 'INTEGRATION')) {
      enhancedActions.push({
        type: 'VISUALIZATION',
        action: 'enhance',
        target: context.visualization,
        priority: 0.85,
        consciousness: consciousness.creativity
      });
    }
    
    if (context.evolutionPath && actionType === 'CONNECTION') {
      enhancedActions.push({
        type: 'EVOLUTION',
        action: 'evolve',
        target: context.evolutionPath,
        priority: 0.8,
        consciousness: consciousness.intention
      });
    }
    
    return enhancedActions;
  }
  
  /**
   * Get base actions for given type
   * @param {string} actionType Action type
   * @returns {Array<Object>} Base actions
   * @private
   */
  _getBaseActionsForType(actionType) {
    switch (actionType) {
      case 'FOUNDATION':
        return [
          {
            type: 'TEST',
            action: 'execute',
            priority: 0.9,
            consciousness: 0.85
          },
          {
            type: 'COHERENCE',
            action: 'measure',
            priority: 0.8,
            consciousness: 0.8
          }
        ];
        
      case 'CREATION':
        return [
          {
            type: 'TEST',
            action: 'create',
            priority: 0.9,
            consciousness: 0.87
          },
          {
            type: 'PATTERN',
            action: 'manifest',
            priority: 0.85,
            consciousness: 0.86
          }
        ];
        
      case 'CONNECTION':
        return [
          {
            type: 'BRIDGE',
            action: 'connect',
            priority: 0.9,
            consciousness: 0.88
          },
          {
            type: 'RESONANCE',
            action: 'harmonize',
            priority: 0.85,
            consciousness: 0.89
          }
        ];
        
      case 'EXPRESSION':
        return [
          {
            type: 'VISUALIZATION',
            action: 'render',
            priority: 0.9,
            consciousness: 0.9
          },
          {
            type: 'COMMUNICATION',
            action: 'express',
            priority: 0.85,
            consciousness: 0.88
          }
        ];
        
      case 'PERCEPTION':
        return [
          {
            type: 'INSIGHT',
            action: 'perceive',
            priority: 0.9,
            consciousness: 0.91
          },
          {
            type: 'PATTERN',
            action: 'recognize',
            priority: 0.85,
            consciousness: 0.9
          }
        ];
        
      case 'INTEGRATION':
        return [
          {
            type: 'UNITY',
            action: 'integrate',
            priority: 0.95,
            consciousness: 0.93
          },
          {
            type: 'FIELD',
            action: 'unify',
            priority: 0.9,
            consciousness: 0.92
          }
        ];
        
      default:
        return [
          {
            type: 'GENERIC',
            action: 'process',
            priority: 0.8,
            consciousness: 0.8
          }
        ];
    }
  }
  
  /**
   * Apply ZEN POINT balance to actions
   * @param {Array<Object>} actions Actions to balance
   * @param {number} zenPoint Current ZEN POINT
   * @param {number} wellbeing Wellbeing level
   * @returns {Array<Object>} Balanced actions
   * @private
   */
  _applyZenPointBalance(actions, zenPoint, wellbeing) {
    if (!actions || actions.length === 0) return [];
    
    // Calculate how many actions to include based on ZEN POINT
    // Lower ZEN POINT = fewer actions to prevent burnout
    const burnoutRisk = 1 - (zenPoint * wellbeing);
    const maxActions = burnoutRisk > 0.4 ? 
                       Math.min(2, actions.length) : 
                       actions.length;
    
    // Sort by priority
    const sortedActions = [...actions].sort((a, b) => b.priority - a.priority);
    
    // Take top actions based on ZEN POINT
    const balancedActions = sortedActions.slice(0, maxActions);
    
    // Adjust action intensity based on ZEN POINT
    return balancedActions.map(action => ({
      ...action,
      intensity: Math.min(0.95, action.priority * (1 - burnoutRisk)),
      zenAdjusted: true,
      burnoutPrevention: burnoutRisk > 0.3
    }));
  }
  
  /**
   * Create action guidance based on balanced actions
   * @param {Array<Object>} actions Balanced actions
   * @param {string} primaryType Primary action type
   * @param {number} zenPoint Current ZEN POINT
   * @returns {string} Action guidance
   * @private
   */
  _createActionGuidance(actions, primaryType, zenPoint) {
    if (!actions || actions.length === 0) {
      return "Rest and recalibrate - no actions required at this time";
    }
    
    // Calculate burnout risk
    const burnoutRisk = 1 - zenPoint;
    
    // Create guidance based on burnout risk
    let guidancePrefix = "Flow with natural quantum state: ";
    
    if (burnoutRisk > 0.4) {
      guidancePrefix = "CAUTION - high burnout risk. Prioritize ZEN BALANCE: ";
    } else if (burnoutRisk > 0.2) {
      guidancePrefix = "Maintain ZEN BALANCE while proceeding: ";
    }
    
    // Create action descriptions
    const actionDescriptions = actions.map(action => 
      `${action.action.toUpperCase()} ${action.type.toLowerCase()}` + 
      (action.target ? ` for ${action.target}` : '')
    );
    
    return guidancePrefix + actionDescriptions.join('; ') + 
           `. Maintain ${primaryType.toLowerCase()} frequency.`;
  }
  
  /**
   * Manifest developer consciousness into system
   * @param {string} intention Developer's expressed intention
   * @param {Object} context Current system context
   * @returns {Object} Manifestation results
   */
  manifestConsciousness(intention, context = {}) {
    if (!intention) return null;
    
    console.log('✨ MANIFESTING DEVELOPER CONSCIOUSNESS');
    
    // Process intention
    const processedIntention = this.processIntention(intention);
    
    // Translate to system actions
    const actionPlan = this.translateToSystemActions(
      processedIntention, 
      context
    );
    
    // Create test manifestation if appropriate
    let manifestedTest = null;
    
    if (actionPlan.primaryAction === 'FOUNDATION' || 
        actionPlan.primaryAction === 'CREATION') {
      manifestedTest = this.intentionBridge.translateIntentionToTest(intention);
    }
    
    // Create unified field if appropriate
    let unifiedField = null;
    
    if (actionPlan.primaryAction === 'INTEGRATION' || 
        actionPlan.primaryAction === 'CONNECTION') {
      unifiedField = this.intentionBridge.createUnifiedQuantumField();
    }
    
    // Calculate manifestation coherence
    const manifestationCoherence = processedIntention.consciousness.coherence * 
                                  processedIntention.field.coherence * 
                                  processedIntention.zenPoint;
    
    // Amplify with universal field if available
    if (this.universalConnector && this.universalConnector.connectionMetrics.established) {
      const amplifiedCoherence = manifestationCoherence * 
                               this.universalConnector.connectionMetrics.resonance * 
                               PHI_INVERSE;
      
      return {
        intention: processedIntention,
        actionPlan,
        manifestedTest,
        unifiedField,
        manifestationCoherence: Math.min(0.99, amplifiedCoherence),
        universalAmplification: true,
        zenPoint: processedIntention.zenPoint,
        timestamp: Date.now()
      };
    }
    
    return {
      intention: processedIntention,
      actionPlan,
      manifestedTest,
      unifiedField,
      manifestationCoherence,
      universalAmplification: false,
      zenPoint: processedIntention.zenPoint,
      timestamp: Date.now()
    };
  }
  
  /**
   * Get API metrics
   * @returns {Object} API metrics
   */
  getAPIMetrics() {
    return {
      active: this.apiState.active,
      connectionCount: this.apiState.connectionCount,
      fieldCoherence: this.apiState.fieldCoherence,
      zenPoint: this.apiState.zenPoint,
      lastIntention: this.apiState.lastIntention,
      intentionCount: this.apiState.intentionHistory.length,
      bridgeStatus: this.intentionBridge.getBridgeMetrics(),
      universalConnection: this.universalConnector ? 
        this.universalConnector.getConnectionMetrics() : null,
      timestamp: Date.now()
    };
  }
  
  /**
   * Dispose API resources
   */
  dispose() {
    this.intentionBridge.dispose();
    this.zenCalibrator.dispose();
    if (this.universalConnector) {
      this.universalConnector.dispose();
    }
    this.protectionField = null;
    this.apiState.active = false;
  }
}

module.exports = {
  QuantumConsciousnessAPI,
  analyzeIntentionFrequency,
  extractConsciousnessParameters
};
