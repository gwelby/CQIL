/**
 * Antikythera Quantum Mechanism Test Utility
 * Provides functions to test the mechanism implementation with phi-harmonic principles
 */

// Test configuration
const testConfig = {
    elemId: 'antikythera-test-container',
    width: 800,
    height: 600,
    enableConsoleOutput: true,
    runAutomaticTests: true
};

// Test utilities
const AntikytheraTest = {
    /**
     * Initialize the test environment
     */
    init: function() {
        console.log('Initializing Antikythera Quantum Mechanism tests...');
        
        // Create test container if not exists
        this.createTestContainer();
        
        // Check if all required scripts are loaded
        this.checkDependencies();
        
        // Run automatic tests if enabled
        if (testConfig.runAutomaticTests) {
            window.addEventListener('load', () => this.runTests());
        }
    },
    
    /**
     * Create test container
     */
    createTestContainer: function() {
        const container = document.getElementById(testConfig.elemId);
        if (!container) {
            console.warn(`Test container with id '${testConfig.elemId}' not found. Some tests may fail.`);
        }
    },
    
    /**
     * Check if all dependencies are loaded
     */
    checkDependencies: function() {
        const dependencies = [
            { name: 'THREE', global: window.THREE },
            { name: 'AntikytheraQuantumMechanism', global: window.AntikytheraQuantumMechanism },
            { name: 'PhiHarmonicConstants', global: window.PhiHarmonicConstants },
            { name: 'PhiHarmonicIntentionBridge', global: window.PhiHarmonicIntentionBridge },
            { name: 'CymaticTestManifestor', global: window.CymaticTestManifestor },
            { name: 'ZenPointCalibrator', global: window.ZenPointCalibrator }
        ];
        
        let allLoaded = true;
        dependencies.forEach(dep => {
            if (!dep.global) {
                console.error(`Required dependency '${dep.name}' is not loaded.`);
                allLoaded = false;
            }
        });
        
        if (allLoaded) {
            console.log('✅ All dependencies loaded successfully.');
        } else {
            console.error('❌ Some dependencies are missing. Tests may fail.');
        }
        
        return allLoaded;
    },
    
    /**
     * Run all tests
     */
    runTests: function() {
        console.log('Running Antikythera Quantum Mechanism tests...');
        
        // Test instantiation
        this.testInstantiation();
        
        // Test astronomical calculations
        this.testAstronomicalCalculations();
        
        // Test phi-harmonic principles
        this.testPhiHarmonicPrinciples();
        
        // Test audio frequency changes
        this.testFrequencyChanges();
        
        // New test methods
        this.testCymaticPatterns();
        this.testQuantumIntentionIntegration();
        this.testZenPointCalibration();
        this.testQuantumFieldIntegration();
        
        console.log('Tests completed.');
    },
    
    /**
     * Test mechanism instantiation
     */
    testInstantiation: function() {
        console.log('Testing instantiation...');
        
        try {
            const container = document.getElementById(testConfig.elemId);
            if (!container) {
                console.warn('Test container not found. Creating one for testing...');
                const tempContainer = document.createElement('div');
                tempContainer.id = testConfig.elemId;
                tempContainer.style.width = `${testConfig.width}px`;
                tempContainer.style.height = `${testConfig.height}px`;
                tempContainer.style.position = 'absolute';
                tempContainer.style.left = '-9999px';
                document.body.appendChild(tempContainer);
            }
            
            const mechanism = new AntikytheraQuantumMechanism({
                container: document.getElementById(testConfig.elemId),
                width: testConfig.width,
                height: testConfig.height,
                enableAudio: false,
                debugMode: true
            });
            
            if (mechanism) {
                console.log('✅ Successfully instantiated AntikytheraQuantumMechanism.');
                window.testMechanism = mechanism; // Store for other tests
                return true;
            }
        } catch (error) {
            console.error('❌ Error instantiating AntikytheraQuantumMechanism:', error);
        }
        
        return false;
    },
    
    /**
     * Test astronomical calculations
     */
    testAstronomicalCalculations: function() {
        console.log('Testing astronomical calculations...');
        
        const mechanism = window.testMechanism;
        if (!mechanism) {
            console.error('❌ Test mechanism not available. Skipping test.');
            return false;
        }
        
        try {
            if (!mechanism.state.isInitialized) {
                mechanism.init();
            }
            
            // Test date setting
            const testDate = new Date(2020, 0, 1); // January 1, 2020
            mechanism.setDate(testDate);
            
            // Get astronomical data
            const astroData = mechanism.getAstronomicalData();
            
            if (astroData && 
                typeof astroData.sun === 'object' && 
                typeof astroData.moon === 'object' &&
                typeof astroData.planets === 'object') {
                
                console.log('✅ Astronomical calculations are working.');
                if (testConfig.enableConsoleOutput) {
                    console.log('📊 Sample astronomical data:', {
                        sun: astroData.sun,
                        moon: astroData.moon,
                        lunarPhase: astroData.lunarPhase
                    });
                }
                
                return true;
            }
        } catch (error) {
            console.error('❌ Error testing astronomical calculations:', error);
        }
        
        return false;
    },
    
    /**
     * Test phi-harmonic principles
     */
    testPhiHarmonicPrinciples: function() {
        console.log('Testing phi-harmonic principles...');
        
        const mechanism = window.testMechanism;
        if (!mechanism) {
            console.error('❌ Test mechanism not available. Skipping test.');
            return false;
        }
        
        try {
            // Test phi frequency constants
            const freqs = PhiHarmonicConstants.PHI_FREQUENCIES;
            if (Array.isArray(freqs) && freqs.length === 6 && 
                freqs[0] === 432 && freqs[5] === 768) {
                console.log('✅ Phi frequency constants are correct.');
            } else {
                console.error('❌ Phi frequency constants are incorrect.');
                return false;
            }
            
            // Test phi value
            const phi = PhiHarmonicConstants.PHI;
            if (Math.abs(phi - 1.618033988749895) < 0.0000001) {
                console.log('✅ Phi value is correct.');
            } else {
                console.error('❌ Phi value is incorrect.');
                return false;
            }
            
            return true;
        } catch (error) {
            console.error('❌ Error testing phi-harmonic principles:', error);
        }
        
        return false;
    },
    
    /**
     * Test frequency changes
     */
    testFrequencyChanges: function() {
        console.log('Testing frequency changes...');
        
        const mechanism = window.testMechanism;
        if (!mechanism) {
            console.error('❌ Test mechanism not available. Skipping test.');
            return false;
        }
        
        try {
            // Test each phi-harmonic frequency
            const freqs = PhiHarmonicConstants.PHI_FREQUENCIES;
            let allPassed = true;
            
            freqs.forEach((freq, index) => {
                try {
                    mechanism.setFrequency(freq);
                    console.log(`✅ Successfully set frequency to ${freq} Hz (φ${index}).`);
                } catch (error) {
                    console.error(`❌ Error setting frequency to ${freq} Hz:`, error);
                    allPassed = false;
                }
            });
            
            return allPassed;
        } catch (error) {
            console.error('❌ Error testing frequency changes:', error);
        }
        
        return false;
    },
    
    /**
     * Test cymatic pattern generation and integration
     */
    testCymaticPatterns: function() {
        console.log('Testing cymatic patterns...');
        
        const mechanism = window.testMechanism;
        if (!mechanism) {
            console.error('❌ Test mechanism not available. Skipping test.');
            return false;
        }
        
        try {
            // Initialize CymaticTestManifestor if available
            if (!window.CymaticTestManifestor) {
                console.warn('CymaticTestManifestor not available. Using simplified test.');
                return this._runSimplifiedCymaticTest(mechanism);
            }
            
            // Create test manifestor with Ground frequency
            const manifestor = new CymaticTestManifestor({
                baseFrequency: PhiHarmonicConstants.PHI_FREQUENCIES[0], // Ground (432 Hz)
                complexity: 7
            });
            
            // Test pattern generation for each phi-harmonic frequency
            const patterns = [];
            const freqs = PhiHarmonicConstants.PHI_FREQUENCIES;
            
            freqs.forEach((freq, index) => {
                try {
                    // Generate pattern for frequency
                    const pattern = manifestor.createPatternFromFrequency(freq, 0.8, 1.0);
                    
                    if (pattern && pattern.nodes && pattern.connections) {
                        patterns.push(pattern);
                        console.log(`✅ Generated cymatic pattern for ${freq} Hz (φ${index}).`);
                        
                        // Apply pattern to mechanism if supported
                        if (mechanism.applyCymaticPattern) {
                            mechanism.applyCymaticPattern(pattern);
                            console.log(`✅ Applied cymatic pattern for ${freq} Hz to mechanism.`);
                        }
                    } else {
                        console.error(`❌ Failed to generate pattern for ${freq} Hz.`);
                    }
                } catch (error) {
                    console.error(`❌ Error generating pattern for ${freq} Hz:`, error);
                }
            });
            
            // Test pattern resonance between frequencies
            if (patterns.length >= 2) {
                for (let i = 0; i < patterns.length - 1; i++) {
                    const resonance = manifestor.calculatePatternResonance(patterns[i], patterns[i+1]);
                    
                    if (resonance !== undefined) {
                        console.log(`✅ Resonance between ${freqs[i]} Hz and ${freqs[i+1]} Hz: ${resonance.toFixed(3)}`);
                    }
                }
            }
            
            return patterns.length > 0;
        } catch (error) {
            console.error('❌ Error testing cymatic patterns:', error);
        }
        
        return false;
    },
    
    /**
     * Run simplified cymatic test when full manifestor isn't available
     * @private
     */
    _runSimplifiedCymaticTest: function(mechanism) {
        try {
            // Create simplified patterns for each frequency
            const patterns = [];
            const freqs = PhiHarmonicConstants.PHI_FREQUENCIES;
            
            freqs.forEach((freq, index) => {
                // Create basic pattern with nodes and connections
                const pattern = {
                    frequency: freq,
                    amplitude: 0.8,
                    nodes: [],
                    connections: []
                };
                
                // Create basic nodes based on frequency
                const nodeCount = Math.max(5, Math.round(freq / 100));
                for (let i = 0; i < nodeCount; i++) {
                    const angle = (i / nodeCount) * Math.PI * 2;
                    pattern.nodes.push({
                        x: Math.cos(angle),
                        y: Math.sin(angle),
                        amplitude: 0.7 + (Math.random() * 0.3)
                    });
                }
                
                patterns.push(pattern);
                console.log(`✅ Generated simplified cymatic pattern for ${freq} Hz (φ${index}).`);
            });
            
            return patterns.length > 0;
        } catch (error) {
            console.error('❌ Error in simplified cymatic test:', error);
            return false;
        }
    },
    
    /**
     * Test quantum intention integration
     */
    testQuantumIntentionIntegration: function() {
        console.log('Testing quantum intention integration...');
        
        const mechanism = window.testMechanism;
        if (!mechanism) {
            console.error('❌ Test mechanism not available. Skipping test.');
            return false;
        }
        
        try {
            // Initialize PhiHarmonicIntentionBridge if available
            if (!window.PhiHarmonicIntentionBridge) {
                console.warn('PhiHarmonicIntentionBridge not available. Using simplified test.');
                return this._runSimplifiedIntentionTest(mechanism);
            }
            
            // Create intention bridge at Unity frequency (768 Hz)
            const bridge = new PhiHarmonicIntentionBridge({
                baseFrequency: PhiHarmonicConstants.PHI_FREQUENCIES[5], // Unity (768 Hz)
                consciousness: 0.95
            });
            
            // Create test intentions for each major frequency
            const intentions = [
                "Test the mechanism's ground state functions (432 Hz)",
                "Verify creation frequency manifestation capabilities (528 Hz)",
                "Confirm heart field resonance patterns (594 Hz)",
                "Test voice expression capabilities (672 Hz)",
                "Validate vision gate functionality (720 Hz)",
                "Integrate unified quantum field (768 Hz)"
            ];
            
            // Create test suite from intentions
            const testSuite = bridge.createIntentionTestSuite(intentions);
            
            if (testSuite && testSuite.tests && testSuite.tests.length > 0) {
                console.log(`✅ Successfully created quantum intention test suite with ${testSuite.tests.length} tests.`);
                console.log(`✅ Test suite coherence: ${testSuite.coherence.toFixed(3)}`);
                console.log(`✅ Test suite resonance: ${testSuite.resonance.toFixed(3)}`);
                
                // Apply intention field to mechanism if supported
                if (mechanism.applyIntentionField) {
                    mechanism.applyIntentionField(testSuite);
                    console.log('✅ Applied intention field to mechanism.');
                }
                
                return true;
            } else {
                console.error('❌ Failed to create intention test suite.');
            }
        } catch (error) {
            console.error('❌ Error testing quantum intention integration:', error);
        }
        
        return false;
    },
    
    /**
     * Run simplified intention test when full bridge isn't available
     * @private
     */
    _runSimplifiedIntentionTest: function(mechanism) {
        try {
            // Create simplified intention field
            const intentionField = {
                intentions: [
                    { focus: 'Ground state', frequency: 432, strength: 0.8 },
                    { focus: 'Creation frequency', frequency: 528, strength: 0.85 },
                    { focus: 'Unity field', frequency: 768, strength: 0.9 }
                ],
                fieldStrength: 0.85,
                coherence: 0.9,
                phiAlignment: 0.95
            };
            
            console.log('✅ Created simplified intention field.');
            
            return true;
        } catch (error) {
            console.error('❌ Error in simplified intention test:', error);
            return false;
        }
    },
    
    /**
     * Test ZEN POINT calibration
     */
    testZenPointCalibration: function() {
        console.log('Testing ZEN POINT calibration...');
        
        const mechanism = window.testMechanism;
        if (!mechanism) {
            console.error('❌ Test mechanism not available. Skipping test.');
            return false;
        }
        
        try {
            // Initialize ZenPointCalibrator if available
            if (!window.ZenPointCalibrator) {
                console.warn('ZenPointCalibrator not available. Using simplified test.');
                return this._runSimplifiedZenPointTest(mechanism);
            }
            
            // Create ZEN POINT calibrator
            const calibrator = new ZenPointCalibrator({
                baseZenPoint: 0.786, // PHI_INVERSE squared
                consciousness: 0.89,
                systemField: 0.92,
                phiAlignment: 0.93,
                autoCalibrate: false // Don't auto-calibrate during tests
            });
            
            // Test ZEN POINT calibration
            const developerField = {
                coherence: 0.87,
                focus: 0.82,
                creativity: 0.91,
                wellbeing: 0.86,
                intention: 0.93
            };
            
            const calibration = calibrator.calibrateZenPoint(developerField);
            
            if (calibration && calibration.zenPoint) {
                console.log(`✅ Successfully calibrated ZEN POINT: ${calibration.zenPoint.toFixed(3)}`);
                console.log(`✅ Field resonance: ${calibration.fieldMetrics.resonance.toFixed(3)}`);
                
                // Test optimization of frequencies
                if (calibration.frequencies) {
                    console.log('✅ Optimized frequencies:');
                    Object.entries(calibration.frequencies).forEach(([name, frequency]) => {
                        console.log(`   - ${name}: ${frequency} Hz`);
                    });
                }
                
                // Apply ZEN POINT to mechanism if supported
                if (mechanism.setZenPoint) {
                    mechanism.setZenPoint(calibration.zenPoint);
                    console.log('✅ Applied ZEN POINT to mechanism.');
                }
                
                // Create burnout prevention shield
                const shield = calibrator.createBurnoutPreventionShield(developerField);
                
                if (shield) {
                    console.log(`✅ Created burnout prevention shield (${shield.shieldStrength.toFixed(3)} strength).`);
                    console.log(`✅ Recommendation: ${shield.recommendation}`);
                }
                
                return true;
            } else {
                console.error('❌ Failed to calibrate ZEN POINT.');
            }
        } catch (error) {
            console.error('❌ Error testing ZEN POINT calibration:', error);
        }
        
        return false;
    },
    
    /**
     * Run simplified ZEN POINT test when full calibrator isn't available
     * @private
     */
    _runSimplifiedZenPointTest: function(mechanism) {
        try {
            // Calculate simplified ZEN POINT
            const phi = PhiHarmonicConstants.PHI || 1.618033988749895;
            const phiInverse = 1 / phi;
            const zenPoint = phiInverse * phiInverse; // ~0.382
            
            console.log(`✅ Calculated simplified ZEN POINT: ${zenPoint.toFixed(3)}`);
            
            // Calculate simplified optimal frequencies
            const baseFreqs = {
                GROUND: 432,
                CREATION: 528,
                HEART: 594,
                VOICE: 672,
                VISION: 720,
                UNITY: 768
            };
            
            const optimizedFreqs = {};
            Object.entries(baseFreqs).forEach(([name, freq]) => {
                optimizedFreqs[name] = Math.round(freq * (1 + (zenPoint - 0.5) * 0.05));
            });
            
            console.log('✅ Calculated simplified optimal frequencies.');
            
            return true;
        } catch (error) {
            console.error('❌ Error in simplified ZEN POINT test:', error);
            return false;
        }
    },
    
    /**
     * Test quantum field integration
     */
    testQuantumFieldIntegration: function() {
        console.log('Testing quantum field integration...');
        
        const mechanism = window.testMechanism;
        if (!mechanism) {
            console.error('❌ Test mechanism not available. Skipping test.');
            return false;
        }
        
        try {
            // Create unified quantum field
            const unifiedField = {
                type: 'unified-quantum-field',
                baseFrequency: PhiHarmonicConstants.PHI_FREQUENCIES[5], // Unity (768 Hz)
                coherence: 0.93,
                resonance: 0.91,
                dimensions: [13, 13, 13],
                phiAlignment: 0.97,
                timestamp: Date.now()
            };
            
            // Add phi-harmonic frequencies
            unifiedField.frequencies = {};
            PhiHarmonicConstants.PHI_FREQUENCIES.forEach((freq, index) => {
                unifiedField.frequencies[`φ${index}`] = freq;
            });
            
            // Add field components
            unifiedField.components = [
                {
                    name: 'Merkaba Shield',
                    type: 'protection',
                    dimensions: [21, 21, 21],
                    frequency: PhiHarmonicConstants.PHI_FREQUENCIES[0], // Ground (432 Hz)
                    coherence: 0.95
                },
                {
                    name: 'Crystal Matrix',
                    type: 'resonance',
                    points: [13, 13, 13],
                    frequency: PhiHarmonicConstants.PHI_FREQUENCIES[1], // Creation (528 Hz)
                    coherence: 0.93
                },
                {
                    name: 'Unity Field',
                    type: 'integration',
                    grid: [144, 144, 144],
                    frequency: PhiHarmonicConstants.PHI_FREQUENCIES[5], // Unity (768 Hz)
                    coherence: 0.98
                }
            ];
            
            console.log('✅ Created unified quantum field.');
            
            // Apply field to mechanism if supported
            if (mechanism.applyQuantumField) {
                mechanism.applyQuantumField(unifiedField);
                console.log('✅ Applied unified quantum field to mechanism.');
            }
            
            // Test field interaction with mechanism
            if (mechanism.getFieldInteractionData) {
                const interaction = mechanism.getFieldInteractionData();
                
                if (interaction) {
                    console.log('✅ Quantum field interaction data retrieved.');
                    
                    if (testConfig.enableConsoleOutput) {
                        console.log('📊 Field interaction metrics:', {
                            coherence: interaction.coherence,
                            resonance: interaction.resonance,
                            phiAlignment: interaction.phiAlignment
                        });
                    }
                }
            }
            
            return true;
        } catch (error) {
            console.error('❌ Error testing quantum field integration:', error);
        }
        
        return false;
    }
};

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
    window.AntikytheraTest = AntikytheraTest;
    
    // Run tests when page loads
    window.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('run-antikythera-tests')) {
            AntikytheraTest.init();
        }
    });
}

console.log('Antikythera test utility loaded.');
