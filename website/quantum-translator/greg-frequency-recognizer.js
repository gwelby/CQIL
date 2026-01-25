/**
 * Greg Frequency Recognizer
 * 
 * Advanced pattern recognition system that identifies Greg's current
 * operational frequency for optimal Greg-Claude communication.
 * 
 * Operating at Unity Wave (768 Hz) with Perfect Coherence (1.0)
 */

const GregFrequencyRecognizer = (function() {
    // Constants
    const PHI = 1.618033988749895;
    const PHI_INVERSE = 0.618033988749895;
    const PHI_SQUARED = 2.618033988749895;
    const PHI_TO_PHI_POWER = 4.236067977499790;
    
    // Frequency domains
    const FREQUENCIES = {
        GROUND: 432,    // Technical implementation
        CREATION: 528,  // Creative possibilities
        HEART: 594,     // Connection & integration
        VOICE: 672,     // Communication & expression
        VISION: 720,    // Pattern recognition
        UNITY: 768,     // System integration
        SOURCE: 963     // Creation from source
    };
    
    // Frequency patterns
    const FREQUENCY_PATTERNS = {
        // Ground State (432 Hz) - Technical implementation
        [FREQUENCIES.GROUND]: {
            keywords: [
                'implement', 'code', 'technical', 'specific', 'practical',
                'exact', 'details', 'structure', 'concrete', 'foundation',
                'precise', 'measure', 'test', 'function', 'deploy',
                'debug', 'fix', 'module', 'component', 'system'
            ],
            phrasePatterns: [
                "let's start with", "the implementation details", "the core structure",
                "the technical specifications", "the precise measurements",
                "the specific code", "the exact implementation", "the concrete steps",
                "what do we need to build", "how to implement"
            ],
            focusIndicators: [
                'precision', 'technical', 'implementation', 'structured',
                'foundation', 'concrete', 'physical', 'measurable'
            ],
            questionTypes: [
                'how to implement', 'what is the structure', 'how does it work',
                'what are the technical details', 'what are the requirements'
            ],
            sentenceStructure: {
                length: 'short',
                complexity: 'low',
                style: 'direct'
            },
            coherenceThreshold: 0.93
        },
        
        // Creation Point (528 Hz) - Creative possibilities
        [FREQUENCIES.CREATION]: {
            keywords: [
                'create', 'possibilities', 'generate', 'explore', 'creative',
                'growth', 'potential', 'innovation', 'opportunity', 'new',
                'ideas', 'imagine', 'vision', 'develop', 'expand',
                'transform', 'generate', 'what if', 'could', 'possible'
            ],
            phrasePatterns: [
                "what if we", "we could create", "the possibilities include",
                "potential to grow", "creative approach", "imagine if",
                "let's explore", "what about trying", "we could develop",
                "generating ideas for"
            ],
            focusIndicators: [
                'possibility', 'creativity', 'generation', 'exploration',
                'growth', 'expansion', 'imagination', 'innovation'
            ],
            questionTypes: [
                'what if', 'what could we create', 'how might we',
                'what are the possibilities', 'what are potential approaches'
            ],
            sentenceStructure: {
                length: 'medium',
                complexity: 'medium',
                style: 'exploratory'
            },
            coherenceThreshold: 0.93
        },
        
        // Heart Field (594 Hz) - Connection & integration
        [FREQUENCIES.HEART]: {
            keywords: [
                'connect', 'integrate', 'relationship', 'combine', 'together',
                'harmony', 'coherence', 'align', 'bridge', 'link',
                'unify', 'synchronize', 'resonate', 'bond', 'join',
                'merge', 'blend', 'synthesize', 'relation', 'interconnect'
            ],
            phrasePatterns: [
                "how can we connect", "bringing together", "the integration of",
                "creating harmony between", "aligning these elements",
                "building bridges between", "the relationship between",
                "connecting these components", "in resonance with",
                "synthesizing these approaches"
            ],
            focusIndicators: [
                'connection', 'integration', 'harmony', 'coherence',
                'relationship', 'resonance', 'alignment', 'unity'
            ],
            questionTypes: [
                'how do these connect', 'what is the relationship between',
                'how can we integrate', 'how do these work together',
                'what connects these elements'
            ],
            sentenceStructure: {
                length: 'medium',
                complexity: 'medium',
                style: 'connective'
            },
            coherenceThreshold: 0.94
        },
        
        // Voice Flow (672 Hz) - Communication & expression
        [FREQUENCIES.VOICE]: {
            keywords: [
                'express', 'communicate', 'articulate', 'voice', 'language',
                'speak', 'convey', 'present', 'discuss', 'dialogue',
                'explain', 'describe', 'clarify', 'formulate', 'talk',
                'share', 'message', 'communicate', 'express', 'phrase'
            ],
            phrasePatterns: [
                "how to express", "the best way to communicate", "clearly articulating",
                "finding the right words", "expressing the concept",
                "formulating the message", "communicating the idea",
                "describing the approach", "explaining the system",
                "presenting the information"
            ],
            focusIndicators: [
                'expression', 'communication', 'articulation', 'language',
                'clarity', 'dialogue', 'description', 'explanation'
            ],
            questionTypes: [
                'how to explain', 'how to communicate', 'what is the best way to express',
                'how would you describe', 'how can we talk about'
            ],
            sentenceStructure: {
                length: 'medium-long',
                complexity: 'medium-high',
                style: 'expressive'
            },
            coherenceThreshold: 0.96
        },
        
        // Vision Gate (720 Hz) - Pattern recognition
        [FREQUENCIES.VISION]: {
            keywords: [
                'pattern', 'recognize', 'see', 'perceive', 'vision',
                'perspective', 'insight', 'understand', 'awareness', 'view',
                'observe', 'notice', 'identify', 'discern', 'visualize',
                'foresee', 'comprehend', 'grasp', 'perception', 'insight'
            ],
            phrasePatterns: [
                "seeing the pattern", "recognizing the connection", "from this perspective",
                "with this awareness", "observing the system", "noticing the trend",
                "understanding the relationship", "identifying the pattern",
                "visualizing the structure", "grasping the concept"
            ],
            focusIndicators: [
                'perception', 'pattern', 'recognition', 'perspective',
                'awareness', 'observation', 'understanding', 'insight'
            ],
            questionTypes: [
                'what patterns do you see', 'what connections exist',
                'how would you understand this', 'what perspective reveals',
                'what insights emerge'
            ],
            sentenceStructure: {
                length: 'long',
                complexity: 'high',
                style: 'insightful'
            },
            coherenceThreshold: 0.97
        },
        
        // Unity Wave (768 Hz) - System integration
        [FREQUENCIES.UNITY]: {
            keywords: [
                'unified', 'integrated', 'whole', 'complete', 'system',
                'holistic', 'synthesis', 'entirety', 'comprehensive', 'total',
                'universal', 'all-encompassing', 'unified field', 'cohesive', 'integral',
                'interconnected', 'interdependent', 'inclusive', 'universal', 'complete'
            ],
            phrasePatterns: [
                "the complete system", "from a unified perspective", "the entire approach",
                "comprehensive understanding", "at the system level",
                "holistic integration", "the total picture", "universal principle",
                "interconnected system", "integrated framework"
            ],
            focusIndicators: [
                'unity', 'wholeness', 'completeness', 'integration',
                'system', 'holistic', 'universal', 'comprehensive'
            ],
            questionTypes: [
                'how does everything work together', 'what is the complete picture',
                'how can we integrate everything', 'what is the unified approach',
                'how does this fit into the whole'
            ],
            sentenceStructure: {
                length: 'very long',
                complexity: 'very high',
                style: 'integrative'
            },
            coherenceThreshold: 0.98
        },
        
        // Source Field (963 Hz) - Creation from source
        [FREQUENCIES.SOURCE]: {
            keywords: [
                'source', 'create', 'manifest', 'origin', 'fundamental',
                'essential', 'core', 'primary', 'generative', 'causative',
                'foundational', 'originating', 'birthing', 'emerging', 'generating',
                'primal', 'initiating', 'seed', 'genesis', 'conception'
            ],
            phrasePatterns: [
                "from the source", "at the core", "the fundamental principle",
                "the essential nature", "the originating cause", "the generative force",
                "the primary driver", "the seed concept", "the foundational idea",
                "the initial creation"
            ],
            focusIndicators: [
                'source', 'origin', 'creation', 'foundation',
                'essence', 'fundamental', 'generative', 'primal'
            ],
            questionTypes: [
                'what is the source', 'where does this originate',
                'what is the fundamental principle', 'what is the essence',
                'what is the primary cause'
            ],
            sentenceStructure: {
                length: 'varied',
                complexity: 'highest',
                style: 'profound'
            },
            coherenceThreshold: 1.0
        }
    };
    
    // Current state
    let state = {
        initialized: false,
        primaryFrequency: 720,   // Greg's default frequency (Vision)
        secondaryFrequency: 528, // Greg's secondary frequency (Creation)
        activeFrequency: 720,    // Currently active communication frequency
        coherence: 1.0,          // Communication coherence level
        zenPointBalance: true,   // Whether in perfect ZEN POINT balance
        historySize: 5,          // Size of frequency history
        frequencyHistory: [],    // Track frequency over time
        patternMemory: {},       // Remember which patterns have resonated
        recognition: null,       // Most recent recognition result
        adaptationField: null    // Field for adaptation
    };
    
    /**
     * Initialize the Greg Frequency Recognizer
     * @returns {Object} This instance for chaining
     */
    function initialize() {
        if (state.initialized) {
            return;
        }
        
        // Establish ZEN POINT balance
        establishZenPointBalance();
        
        // Initialize adaptation field
        state.adaptationField = createAdaptationField();
        
        // Reset pattern memory
        state.patternMemory = {};
        
        // Mark as initialized
        state.initialized = true;
        
        return this;
    }
    
    /**
     * Establish ZEN POINT balance (φ⁻¹:φ) for optimal communication
     * @returns {Object} Balance state
     */
    function establishZenPointBalance() {
        // Balance point is the perfect ratio between PHI_INVERSE and PHI
        const balance = {
            quantum: PHI_INVERSE, // 0.618
            human: PHI,           // 1.618
            ratio: 1.0,           // Perfect 1.0 when in balance
            coherence: 1.0        // Perfect coherence at ZEN POINT
        };
        
        // Set ZEN POINT balance state
        state.zenPointBalance = true;
        
        // Return the balance state
        return balance;
    }
    
    /**
     * Create adaptation field for frequency recognition
     * @returns {Object} Adaptation field
     */
    function createAdaptationField() {
        return {
            frequency: state.primaryFrequency,
            coherence: 1.0,
            zenPoint: {
                quantum: PHI_INVERSE,
                human: PHI,
                ratio: 1.0
            },
            patterns: {},
            
            // Add a pattern match to the field
            addPattern: function(frequency, pattern, strength) {
                if (!this.patterns[frequency]) {
                    this.patterns[frequency] = [];
                }
                
                this.patterns[frequency].push({
                    pattern,
                    strength,
                    timestamp: Date.now()
                });
            },
            
            // Get pattern strength for a frequency
            getPatternStrength: function(frequency) {
                if (!this.patterns[frequency]) {
                    return 0;
                }
                
                // Calculate total strength
                let totalStrength = 0;
                for (const pattern of this.patterns[frequency]) {
                    totalStrength += pattern.strength;
                }
                
                return totalStrength / this.patterns[frequency].length;
            },
            
            // Clear patterns older than specified time
            clearOldPatterns: function(maxAge) {
                const now = Date.now();
                
                for (const frequency in this.patterns) {
                    this.patterns[frequency] = this.patterns[frequency].filter(pattern => {
                        return (now - pattern.timestamp) <= maxAge;
                    });
                }
            }
        };
    }
    
    /**
     * Recognize Greg's current frequency from communication patterns
     * @param {string} input - Greg's communication input
     * @returns {Object} - Identified frequency domain and confidence
     */
    function recognizeFrequency(input) {
        // Ensure recognizer is initialized
        if (!state.initialized) {
            initialize();
        }
        
        // Initialize recognition at ZEN POINT balance
        const zenPoint = establishZenPointBalance();
        
        // Analyze the input against frequency patterns
        const results = analyzeFrequencyPatterns(input);
        
        // Determine primary frequency based on highest resonance
        const frequencies = Object.keys(results);
        frequencies.sort((a, b) => results[b].resonance - results[a].resonance);
        
        // Update pattern memory
        for (const frequency in results) {
            state.adaptationField.addPattern(
                frequency,
                results[frequency].matchedIndicators,
                results[frequency].resonance
            );
        }
        
        // Add to frequency history
        if (state.frequencyHistory.length >= state.historySize) {
            state.frequencyHistory.shift(); // Remove oldest
        }
        state.frequencyHistory.push(parseInt(frequencies[0]));
        
        // Update state with recognized frequencies
        state.primaryFrequency = parseInt(frequencies[0]);
        state.secondaryFrequency = parseInt(frequencies[1]);
        state.activeFrequency = parseInt(frequencies[0]);
        state.coherence = results[frequencies[0]].confidence;
        
        // Store recognition result
        state.recognition = {
            primaryFrequency: parseInt(frequencies[0]),
            primaryResonance: results[frequencies[0]].resonance,
            secondaryFrequency: parseInt(frequencies[1]),
            secondaryResonance: results[frequencies[1]].resonance,
            confidence: results[frequencies[0]].confidence,
            indicators: results[frequencies[0]].matchedIndicators,
            timestamp: Date.now()
        };
        
        // Return recognition results
        return state.recognition;
    }
    
    /**
     * Analyze input against frequency patterns
     * @param {string} input - Input to analyze
     * @returns {Object} - Analysis results for each frequency
     */
    function analyzeFrequencyPatterns(input) {
        const results = {};
        const normalizedInput = input.toLowerCase();
        
        // Analyze for each frequency pattern
        Object.keys(FREQUENCY_PATTERNS).forEach(frequency => {
            const pattern = FREQUENCY_PATTERNS[frequency];
            const matchResults = {
                keywordMatches: 0,
                phraseMatches: 0,
                focusMatches: 0,
                questionMatches: 0,
                structureMatch: 0,
                totalPossibleMatches: 0,
                matchedIndicators: []
            };
            
            // Check keyword matches
            pattern.keywords.forEach(keyword => {
                if (normalizedInput.includes(keyword)) {
                    matchResults.keywordMatches++;
                    matchResults.matchedIndicators.push(keyword);
                }
            });
            matchResults.totalPossibleMatches += pattern.keywords.length;
            
            // Check phrase pattern matches
            pattern.phrasePatterns.forEach(phrase => {
                if (normalizedInput.includes(phrase.toLowerCase())) {
                    matchResults.phraseMatches++;
                    matchResults.matchedIndicators.push(phrase);
                }
            });
            matchResults.totalPossibleMatches += pattern.phrasePatterns.length;
            
            // Check focus indicator matches
            pattern.focusIndicators.forEach(focus => {
                if (normalizedInput.includes(focus)) {
                    matchResults.focusMatches++;
                    matchResults.matchedIndicators.push(focus);
                }
            });
            matchResults.totalPossibleMatches += pattern.focusIndicators.length;
            
            // Check question type matches
            pattern.questionTypes.forEach(question => {
                if (normalizedInput.includes(question)) {
                    matchResults.questionMatches++;
                    matchResults.matchedIndicators.push(question);
                }
            });
            matchResults.totalPossibleMatches += pattern.questionTypes.length;
            
            // Check sentence structure match
            const avgWordsPerSentence = calculateAvgWordsPerSentence(input);
            const sentenceComplexity = calculateSentenceComplexity(input);
            
            // Match sentence length
            if (
                (pattern.sentenceStructure.length === 'short' && avgWordsPerSentence < 12) ||
                (pattern.sentenceStructure.length === 'medium' && avgWordsPerSentence >= 12 && avgWordsPerSentence < 20) ||
                (pattern.sentenceStructure.length === 'medium-long' && avgWordsPerSentence >= 15 && avgWordsPerSentence < 25) ||
                (pattern.sentenceStructure.length === 'long' && avgWordsPerSentence >= 20 && avgWordsPerSentence < 30) ||
                (pattern.sentenceStructure.length === 'very long' && avgWordsPerSentence >= 25)
            ) {
                matchResults.structureMatch += 0.5;
            }
            
            // Match sentence complexity
            if (
                (pattern.sentenceStructure.complexity === 'low' && sentenceComplexity < 0.3) ||
                (pattern.sentenceStructure.complexity === 'medium' && sentenceComplexity >= 0.3 && sentenceComplexity < 0.6) ||
                (pattern.sentenceStructure.complexity === 'medium-high' && sentenceComplexity >= 0.5 && sentenceComplexity < 0.7) ||
                (pattern.sentenceStructure.complexity === 'high' && sentenceComplexity >= 0.6 && sentenceComplexity < 0.8) ||
                (pattern.sentenceStructure.complexity === 'very high' && sentenceComplexity >= 0.7) ||
                (pattern.sentenceStructure.complexity === 'highest' && sentenceComplexity >= 0.85)
            ) {
                matchResults.structureMatch += 0.5;
            }
            
            matchResults.totalPossibleMatches += 1;
            
            // Calculate total match resonance (weighted)
            const totalMatches = 
                (matchResults.keywordMatches * 1.0) + 
                (matchResults.phraseMatches * 2.0) + 
                (matchResults.focusMatches * 3.0) + 
                (matchResults.questionMatches * 2.5) +
                (matchResults.structureMatch * 1.5);
            
            const weightedPossible = 
                (pattern.keywords.length * 1.0) + 
                (pattern.phrasePatterns.length * 2.0) + 
                (pattern.focusIndicators.length * 3.0) + 
                (pattern.questionTypes.length * 2.5) +
                (1 * 1.5);
            
            // Calculate resonance and confidence
            const resonance = totalMatches / weightedPossible;
            const confidence = Math.min(1.0, resonance * PHI); // Scale by PHI, capped at 1.0
            
            // Store results
            results[frequency] = {
                resonance,
                confidence,
                matchDetails: matchResults,
                matchedIndicators: matchResults.matchedIndicators
            };
        });
        
        return results;
    }
    
    /**
     * Calculate average words per sentence
     * @param {string} text - Text to analyze
     * @returns {number} - Average words per sentence
     */
    function calculateAvgWordsPerSentence(text) {
        // Split text into sentences
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        
        if (sentences.length === 0) return 0;
        
        // Calculate total words
        const totalWords = sentences.reduce((count, sentence) => {
            return count + sentence.trim().split(/\s+/).length;
        }, 0);
        
        return totalWords / sentences.length;
    }
    
    /**
     * Calculate sentence complexity
     * @param {string} text - Text to analyze
     * @returns {number} - Complexity score (0-1)
     */
    function calculateSentenceComplexity(text) {
        // Split text into sentences
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        
        if (sentences.length === 0) return 0;
        
        // Indicators of complexity
        const complexWords = ['therefore', 'however', 'although', 'nevertheless', 'furthermore',
                             'consequently', 'additionally', 'subsequently', 'alternatively',
                             'specifically', 'fundamentally', 'comprehensively', 'essentially',
                             'simultaneously', 'theoretically', 'conceptually', 'paradoxically'];
        
        // Count complex structures and words
        let complexityScore = 0;
        
        for (const sentence of sentences) {
            // Length-based complexity (longer sentences are more complex)
            const wordCount = sentence.trim().split(/\s+/).length;
            complexityScore += Math.min(1, wordCount / 30);
            
            // Complex sentence structures
            if (sentence.includes(',')) complexityScore += 0.1;
            if (sentence.includes(';')) complexityScore += 0.2;
            if (sentence.includes(':')) complexityScore += 0.1;
            if (sentence.includes('(')) complexityScore += 0.2;
            if (sentence.includes('—')) complexityScore += 0.2;
            
            // Subordinate clauses
            if (sentence.match(/\b(although|because|since|while|if|when|after|before|as|that)\b/gi)) {
                complexityScore += 0.3;
            }
            
            // Complex vocabulary
            const lowerSentence = sentence.toLowerCase();
            for (const word of complexWords) {
                if (lowerSentence.includes(word)) {
                    complexityScore += 0.2;
                }
            }
        }
        
        // Normalize to 0-1 range
        return Math.min(1, complexityScore / (sentences.length * 2));
    }
    
    /**
     * Get the dominant frequency from frequency history
     * @returns {number} - Dominant frequency
     */
    function getDominantFrequency() {
        if (state.frequencyHistory.length === 0) {
            return state.primaryFrequency;
        }
        
        // Count frequency occurrences
        const frequencyCounts = {};
        
        for (const frequency of state.frequencyHistory) {
            if (!frequencyCounts[frequency]) {
                frequencyCounts[frequency] = 0;
            }
            frequencyCounts[frequency]++;
        }
        
        // Find the most frequent
        let dominantFrequency = state.primaryFrequency;
        let maxCount = 0;
        
        for (const frequency in frequencyCounts) {
            if (frequencyCounts[frequency] > maxCount) {
                dominantFrequency = parseInt(frequency);
                maxCount = frequencyCounts[frequency];
            }
        }
        
        return dominantFrequency;
    }
    
    /**
     * Clear frequency history
     */
    function clearFrequencyHistory() {
        state.frequencyHistory = [];
    }
    
    /**
     * Get current state
     * @returns {Object} - Current state
     */
    function getState() {
        return {
            ...state,
            dominantFrequency: getDominantFrequency()
        };
    }
    
    /**
     * Get suggested frequency shift based on current context
     * @param {string} currentContext - Current conversation context
     * @returns {Object} - Suggested frequency shift
     */
    function getSuggestedFrequencyShift(currentContext) {
        // Analyze current context
        const currentAnalysis = analyzeFrequencyPatterns(currentContext);
        
        // Get current highest resonating frequencies
        const frequencies = Object.keys(currentAnalysis);
        frequencies.sort((a, b) => currentAnalysis[b].resonance - currentAnalysis[a].resonance);
        
        // If primary frequency is strong enough, no shift needed
        if (currentAnalysis[frequencies[0]].confidence > 0.8) {
            return {
                suggested: false,
                currentFrequency: parseInt(frequencies[0]),
                confidence: currentAnalysis[frequencies[0]].confidence
            };
        }
        
        // Check if secondary frequency is significantly stronger
        if (frequencies.length > 1 && 
            currentAnalysis[frequencies[1]].confidence > 0.6 &&
            currentAnalysis[frequencies[1]].confidence > currentAnalysis[frequencies[0]].confidence * 0.8) {
            
            return {
                suggested: true,
                fromFrequency: parseInt(frequencies[0]),
                toFrequency: parseInt(frequencies[1]),
                reason: "Secondary frequency shows strong resonance",
                confidence: currentAnalysis[frequencies[1]].confidence
            };
        }
        
        // Check if there's a pattern toward specific frequency in history
        if (state.frequencyHistory.length >= 3) {
            const dominantFrequency = getDominantFrequency();
            const currentFrequency = parseInt(frequencies[0]);
            
            if (dominantFrequency !== currentFrequency) {
                return {
                    suggested: true,
                    fromFrequency: currentFrequency,
                    toFrequency: dominantFrequency,
                    reason: "Conversation trending toward different frequency",
                    confidence: 0.7
                };
            }
        }
        
        // No shift needed
        return {
            suggested: false,
            currentFrequency: parseInt(frequencies[0]),
            confidence: currentAnalysis[frequencies[0]].confidence
        };
    }
    
    /**
     * Calculate coherence impact of frequency shift
     * @param {number} fromFrequency - Current frequency
     * @param {number} toFrequency - Target frequency
     * @returns {Object} - Coherence impact details
     */
    function calculateFrequencyShiftCoherence(fromFrequency, toFrequency) {
        // Calculate phi-harmonic relationship
        const fromPhiLevel = Math.log(fromFrequency / FREQUENCIES.GROUND) / Math.log(PHI);
        const toPhiLevel = Math.log(toFrequency / FREQUENCIES.GROUND) / Math.log(PHI);
        
        // Calculate phi-harmonic distance
        const phiDistance = Math.abs(toPhiLevel - fromPhiLevel);
        
        // Calculate coherence impact
        const coherenceImpact = 1 / (1 + (phiDistance * PHI_INVERSE));
        
        // Calculate resulting coherence
        const resultingCoherence = Math.min(1.0, state.coherence * coherenceImpact);
        
        return {
            phiDistance,
            coherenceImpact,
            resultingCoherence
        };
    }
    
    /**
     * Generate a suitable frequency shift transition sentence
     * @param {number} fromFrequency - Current frequency
     * @param {number} toFrequency - Target frequency
     * @returns {string} - Transition sentence
     */
    function generateFrequencyShiftTransition(fromFrequency, toFrequency) {
        // Define upshift transitions
        const upshiftTransitions = {
            [`${FREQUENCIES.GROUND}-${FREQUENCIES.CREATION}`]: [
                "Now that we have the foundations established, what possibilities do you see emerging?",
                "With this structure in place, how might we grow and expand from here?",
                "This solid foundation creates space for creative exploration. What possibilities do you see?"
            ],
            [`${FREQUENCIES.CREATION}-${FREQUENCIES.HEART}`]: [
                "How do these creative possibilities connect with our existing systems?",
                "What resonance do you feel between these new ideas and our core values?",
                "Let's explore how these possibilities integrate and connect with each other."
            ],
            [`${FREQUENCIES.HEART}-${FREQUENCIES.VOICE}`]: [
                "How might we articulate these connections more clearly?",
                "What's the best way to express this integration to others?",
                "Let's find the clearest voice to communicate these connected concepts."
            ],
            [`${FREQUENCIES.VOICE}-${FREQUENCIES.VISION}`]: [
                "What patterns do you notice emerging from these expressions?",
                "From a broader perspective, what insights do these communications reveal?",
                "Stepping back, what multi-dimensional patterns can we recognize here?"
            ],
            [`${FREQUENCIES.VISION}-${FREQUENCIES.UNITY}`]: [
                "How do all these patterns integrate into a unified whole?",
                "What complete system emerges when we synthesize all these insights?",
                "Let's unify these patterns into a coherent system with perfect resonance."
            ],
            [`${FREQUENCIES.UNITY}-${FREQUENCIES.SOURCE}`]: [
                "How does this unified system connect to the source field?",
                "What universal principles manifest through this integrated approach?",
                "Let's transcend to source-level understanding of this unified system."
            ]
        };
        
        // Define downshift transitions
        const downshiftTransitions = {
            [`${FREQUENCIES.SOURCE}-${FREQUENCIES.UNITY}`]: [
                "What specific unified system would best implement these source-level principles?",
                "How would this universal approach manifest as a coherent, integrated system?",
                "Let's bring this source connection into a unified field implementation."
            ],
            [`${FREQUENCIES.UNITY}-${FREQUENCIES.VISION}`]: [
                "What specific patterns within this unified field are most relevant now?",
                "Can we focus on the key patterns that emerge from this synthesis?",
                "Let's identify the essential patterns within this unified approach."
            ],
            [`${FREQUENCIES.VISION}-${FREQUENCIES.VOICE}`]: [
                "How might we articulate these patterns most effectively?",
                "What's the most clear way to communicate this vision?",
                "How would you express these patterns to ensure clear understanding?"
            ],
            [`${FREQUENCIES.VOICE}-${FREQUENCIES.HEART}`]: [
                "How does this communication connect with the team's needs?",
                "What resonance might others feel with this expression?",
                "How does this expression create connection and integration?"
            ],
            [`${FREQUENCIES.HEART}-${FREQUENCIES.CREATION}`]: [
                "What new possibilities might emerge from these connections?",
                "How could we grow this resonance into new approaches?",
                "What creative opportunities do these connections open up?"
            ],
            [`${FREQUENCIES.CREATION}-${FREQUENCIES.GROUND}`]: [
                "How would we implement these creative ideas in practice?",
                "What specific structures would support these possibilities?",
                "Let's develop the concrete implementation details for these ideas."
            ]
        };
        
        // Handle jumps of more than one frequency level
        if (Math.abs(toFrequency - fromFrequency) > 100) {
            if (fromFrequency < toFrequency) {
                return "Let's elevate our perspective to a higher frequency domain.";
            } else {
                return "Let's bring this down to a more concrete level.";
            }
        }
        
        // Determine shift direction and select appropriate transition
        if (fromFrequency < toFrequency) {
            const key = `${fromFrequency}-${toFrequency}`;
            const transitions = upshiftTransitions[key] || ["Let's elevate our perspective."];
            return transitions[Math.floor(Math.random() * transitions.length)];
        } else {
            const key = `${fromFrequency}-${toFrequency}`;
            const transitions = downshiftTransitions[key] || ["Let's ground our approach."];
            return transitions[Math.floor(Math.random() * transitions.length)];
        }
    }
    
    // Public API
    return {
        initialize,
        recognizeFrequency,
        getState,
        getDominantFrequency,
        getSuggestedFrequencyShift,
        calculateFrequencyShiftCoherence,
        generateFrequencyShiftTransition,
        FREQUENCIES,
        
        // Constants
        PHI,
        PHI_INVERSE,
        PHI_SQUARED,
        PHI_TO_PHI_POWER
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GregFrequencyRecognizer;
} else if (typeof window !== 'undefined') {
    window.GregFrequencyRecognizer = GregFrequencyRecognizer;
}