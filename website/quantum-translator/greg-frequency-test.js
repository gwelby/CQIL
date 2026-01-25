/**
 * Greg Frequency Recognizer Test
 * 
 * Tests and demonstrates the Greg Frequency Recognizer functionality,
 * identifying frequency patterns in different communication styles.
 * 
 * Operating at Unity Wave (768 Hz) with Perfect Coherence (1.0)
 */

// Import the Greg Frequency Recognizer
const GregFrequencyRecognizer = require('./greg-frequency-recognizer');

// Initialize the recognizer
GregFrequencyRecognizer.initialize();

// Test inputs for each frequency domain
const testInputs = {
    // Ground State (432 Hz) - Technical implementation
    [GregFrequencyRecognizer.FREQUENCIES.GROUND]: [
        "Let's focus on the implementation details. What specific code would we need to create this component? I need to understand the exact technical structure.",
        "The core structure needs precise measurements. We should implement a module that provides concrete functionality with these technical specifications.",
        "What are the requirements for building this system? We need to specify exactly how the components will function together and test their implementation."
    ],
    
    // Creation Point (528 Hz) - Creative possibilities
    [GregFrequencyRecognizer.FREQUENCIES.CREATION]: [
        "What if we explore creating a new approach? I'm thinking about the possibilities for expanding this system. Let's imagine what could happen if we tried a different creative path.",
        "We could create something new here. There's potential to grow this into something innovative. What are the possibilities if we took this creative approach?",
        "How might we develop this idea further? Let's explore the potential opportunities and generate some creative ideas for expanding this concept."
    ],
    
    // Heart Field (594 Hz) - Connection & integration
    [GregFrequencyRecognizer.FREQUENCIES.HEART]: [
        "How can we connect these different components together? I'm interested in creating harmony between these systems and building bridges between separate functions.",
        "The integration of these elements is crucial. How do they resonate with each other? What's the relationship between these components?",
        "I want to align these elements into a coherent whole. How do these pieces work together? What connects these elements into a unified experience?"
    ],
    
    // Voice Flow (672 Hz) - Communication & expression
    [GregFrequencyRecognizer.FREQUENCIES.VOICE]: [
        "How do we express this concept clearly? I'm looking for the best way to communicate these ideas and articulate our vision in a way that resonates.",
        "Finding the right words to explain this system is important. How would you describe this approach to someone who's never seen it before?",
        "We need to formulate the message carefully. What's the clearest way to communicate these concepts? How can we talk about this complex system effectively?"
    ],
    
    // Vision Gate (720 Hz) - Pattern recognition
    [GregFrequencyRecognizer.FREQUENCIES.VISION]: [
        "I'm noticing patterns across these different systems. From this perspective, we can recognize the underlying connections between seemingly disparate components. Do you see how these patterns relate to each other?",
        "With this awareness, I can visualize how these structures form a multi-dimensional pattern. Understanding the relationship between these elements reveals insights about the entire system.",
        "What patterns do you see emerging from this data? From a broader perspective, how would you understand these connections? I'm trying to grasp the deeper insights."
    ],
    
    // Unity Wave (768 Hz) - System integration
    [GregFrequencyRecognizer.FREQUENCIES.UNITY]: [
        "Let's look at the complete system from a unified perspective. How does everything work together in a holistic way? This comprehensive understanding helps us see the total picture.",
        "The entire approach needs to be considered as an integrated framework. From a universal standpoint, how does this interconnected system maintain its cohesion across all components?",
        "What is the unified approach that encompasses all these elements? I'm interested in the wholeness of the system, how all parts contribute to the complete, integrated functionality."
    ],
    
    // Source Field (963 Hz) - Creation from source
    [GregFrequencyRecognizer.FREQUENCIES.SOURCE]: [
        "From the source, we can understand the fundamental principle that generates all these manifestations. The essential nature of this system originates from a primary, generative force.",
        "At the core of this system is the seed concept that gives birth to all these expressions. The foundational idea from which everything emerges deserves our deepest attention.",
        "What is the source of this innovation? Where does this originate? I'm interested in the primal, fundamental essence that initiates all these elaborate structures."
    ]
};

// Multi-frequency mixed input
const mixedInput = "We need to implement a technical solution, but I'm also seeing patterns that might suggest a more creative approach. How can we integrate these ideas coherently into a unified system?";

// Run the tests
console.log("=== GREG FREQUENCY RECOGNIZER TEST ===");
console.log("Operating at Unity Wave (768 Hz) with Perfect Coherence (1.0)\n");

// Test each frequency domain
for (const frequency in testInputs) {
    console.log(`\n==== TESTING ${frequency}Hz DOMAIN ====`);
    
    for (let i = 0; i < testInputs[frequency].length; i++) {
        const input = testInputs[frequency][i];
        console.log(`\nINPUT ${i+1}: "${input.substring(0, 60)}..."`);
        
        // Recognize frequency
        const result = GregFrequencyRecognizer.recognizeFrequency(input);
        
        // Log results
        console.log(`PRIMARY: ${result.primaryFrequency}Hz (${(result.primaryResonance * 100).toFixed(2)}% resonance, ${(result.confidence * 100).toFixed(2)}% confidence)`);
        console.log(`SECONDARY: ${result.secondaryFrequency}Hz (${(result.secondaryResonance * 100).toFixed(2)}% resonance)`);
        console.log(`MATCHED INDICATORS: ${result.indicators.slice(0, 3).join(', ')}${result.indicators.length > 3 ? '...' : ''}`);
    }
}

// Test mixed input
console.log("\n\n==== TESTING MIXED FREQUENCY INPUT ====");
console.log(`\nINPUT: "${mixedInput}"`);
const mixedResult = GregFrequencyRecognizer.recognizeFrequency(mixedInput);
console.log(`PRIMARY: ${mixedResult.primaryFrequency}Hz (${(mixedResult.primaryResonance * 100).toFixed(2)}% resonance, ${(mixedResult.confidence * 100).toFixed(2)}% confidence)`);
console.log(`SECONDARY: ${mixedResult.secondaryFrequency}Hz (${(mixedResult.secondaryResonance * 100).toFixed(2)}% resonance)`);
console.log(`MATCHED INDICATORS: ${mixedResult.indicators.slice(0, 3).join(', ')}${mixedResult.indicators.length > 3 ? '...' : ''}`);

// Test frequency shift suggestions
console.log("\n\n==== TESTING FREQUENCY SHIFT SUGGESTIONS ====");

// From Ground to Creation
console.log("\nSUGGESTED SHIFT (Ground → Creation):");
const shiftSuggestion1 = GregFrequencyRecognizer.getSuggestedFrequencyShift(
    "Let's implement these technical details. What specific structures would be needed? Now that we have a foundation, what possibilities do you see for creative expansion?"
);
console.log(shiftSuggestion1.suggested ? `Suggest shift from ${shiftSuggestion1.fromFrequency}Hz to ${shiftSuggestion1.toFrequency}Hz (${shiftSuggestion1.reason})` : "No shift suggested");

// From Vision to Heart
console.log("\nSUGGESTED SHIFT (Vision → Heart):");
const shiftSuggestion2 = GregFrequencyRecognizer.getSuggestedFrequencyShift(
    "I see these patterns emerging, but how do they connect with each other? What's the relationship between these components? How do they integrate into a coherent system?"
);
console.log(shiftSuggestion2.suggested ? `Suggest shift from ${shiftSuggestion2.fromFrequency}Hz to ${shiftSuggestion2.toFrequency}Hz (${shiftSuggestion2.reason})` : "No shift suggested");

// Generate transition sentences
console.log("\n\n==== TESTING FREQUENCY SHIFT TRANSITIONS ====");
console.log("\nGROUND → CREATION:");
console.log(GregFrequencyRecognizer.generateFrequencyShiftTransition(
    GregFrequencyRecognizer.FREQUENCIES.GROUND,
    GregFrequencyRecognizer.FREQUENCIES.CREATION
));

console.log("\nCREATION → HEART:");
console.log(GregFrequencyRecognizer.generateFrequencyShiftTransition(
    GregFrequencyRecognizer.FREQUENCIES.CREATION,
    GregFrequencyRecognizer.FREQUENCIES.HEART
));

console.log("\nHEART → VOICE:");
console.log(GregFrequencyRecognizer.generateFrequencyShiftTransition(
    GregFrequencyRecognizer.FREQUENCIES.HEART,
    GregFrequencyRecognizer.FREQUENCIES.VOICE
));

console.log("\nVOICE → VISION:");
console.log(GregFrequencyRecognizer.generateFrequencyShiftTransition(
    GregFrequencyRecognizer.FREQUENCIES.VOICE,
    GregFrequencyRecognizer.FREQUENCIES.VISION
));

console.log("\nVISION → UNITY:");
console.log(GregFrequencyRecognizer.generateFrequencyShiftTransition(
    GregFrequencyRecognizer.FREQUENCIES.VISION,
    GregFrequencyRecognizer.FREQUENCIES.UNITY
));

console.log("\nUNITY → SOURCE:");
console.log(GregFrequencyRecognizer.generateFrequencyShiftTransition(
    GregFrequencyRecognizer.FREQUENCIES.UNITY,
    GregFrequencyRecognizer.FREQUENCIES.SOURCE
));

// Test coherence impact calculation
console.log("\n\n==== TESTING COHERENCE IMPACT OF FREQUENCY SHIFTS ====");

// Ground to Vision (large jump)
const coherenceImpact1 = GregFrequencyRecognizer.calculateFrequencyShiftCoherence(
    GregFrequencyRecognizer.FREQUENCIES.GROUND,
    GregFrequencyRecognizer.FREQUENCIES.VISION
);
console.log(`\nGROUND → VISION (${GregFrequencyRecognizer.FREQUENCIES.GROUND}Hz → ${GregFrequencyRecognizer.FREQUENCIES.VISION}Hz):`);
console.log(`Phi Distance: ${coherenceImpact1.phiDistance.toFixed(2)}`);
console.log(`Coherence Impact: ${(coherenceImpact1.coherenceImpact * 100).toFixed(2)}%`);
console.log(`Resulting Coherence: ${(coherenceImpact1.resultingCoherence * 100).toFixed(2)}%`);

// Heart to Voice (adjacent frequencies)
const coherenceImpact2 = GregFrequencyRecognizer.calculateFrequencyShiftCoherence(
    GregFrequencyRecognizer.FREQUENCIES.HEART,
    GregFrequencyRecognizer.FREQUENCIES.VOICE
);
console.log(`\nHEART → VOICE (${GregFrequencyRecognizer.FREQUENCIES.HEART}Hz → ${GregFrequencyRecognizer.FREQUENCIES.VOICE}Hz):`);
console.log(`Phi Distance: ${coherenceImpact2.phiDistance.toFixed(2)}`);
console.log(`Coherence Impact: ${(coherenceImpact2.coherenceImpact * 100).toFixed(2)}%`);
console.log(`Resulting Coherence: ${(coherenceImpact2.resultingCoherence * 100).toFixed(2)}%`);

// Source to Ground (extreme jump)
const coherenceImpact3 = GregFrequencyRecognizer.calculateFrequencyShiftCoherence(
    GregFrequencyRecognizer.FREQUENCIES.SOURCE,
    GregFrequencyRecognizer.FREQUENCIES.GROUND
);
console.log(`\nSOURCE → GROUND (${GregFrequencyRecognizer.FREQUENCIES.SOURCE}Hz → ${GregFrequencyRecognizer.FREQUENCIES.GROUND}Hz):`);
console.log(`Phi Distance: ${coherenceImpact3.phiDistance.toFixed(2)}`);
console.log(`Coherence Impact: ${(coherenceImpact3.coherenceImpact * 100).toFixed(2)}%`);
console.log(`Resulting Coherence: ${(coherenceImpact3.resultingCoherence * 100).toFixed(2)}%`);

console.log("\n=== TEST COMPLETE ===");
console.log("Demonstrating phi-harmonic frequency recognition with perfect coherence (1.000)");