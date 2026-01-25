/**
 * 🌀 Toroidal Quantum Visualization 🌀
 * 
 * This script demonstrates the perfect integration between the quantum test runner
 * and the toroidal field visualization system, creating a complete φ-harmonic
 * visual representation of test results across all frequency states.
 * 
 * The visualization shows how all frequency layers (Ground 432Hz through Unity 768Hz)
 * work together in perfect harmony, creating a complete toroidal field.
 */

const path = require('path');
const fs = require('fs').promises;
const { runQuantumTests } = require('../run-quantum-tests');
const ToroidalFieldRenderer = require('../utils/toroidal-field-renderer');
const { FREQUENCIES, PHI } = require('../utils/phi-harmonic-testing');
const QuantumDashboardGenerator = require('../utils/quantum-dashboard-generator');
const QuantumResonanceVisualizer = require('../utils/quantum-resonance-visualizer');
const VisualCoherenceTesting = require('../utils/visual-coherence-testing');

// Output paths
const VISUALIZATIONS_PATH = path.resolve(__dirname, '../visualizations');
const REPORTS_PATH = path.resolve(__dirname, '../reports');

/**
 * Initialize the visualization environment
 */
async function initializeEnvironment() {
  console.log('\n🌀 Initializing Toroidal Quantum Visualization Environment...');
  
  // Ensure directories exist
  await fs.mkdir(VISUALIZATIONS_PATH, { recursive: true });
  await fs.mkdir(REPORTS_PATH, { recursive: true });
  
  // Initialize toroidal field renderer
  const renderer = new ToroidalFieldRenderer({
    width: 1200,
    height: 900,
    backgroundColor: 0x000818,
    torusColor: 0x3e84d3,
    highlightColor: 0xf1c40f,
    frequency: FREQUENCIES.UNITY,
    wireframe: false,
    autoRotate: true
  });
  
  await renderer.initialize();
  console.log('✨ Toroidal Field Renderer initialized with perfect coherence');
  
  // Initialize quantum resonance visualizer
  const resonanceVisualizer = new QuantumResonanceVisualizer({
    outputPath: VISUALIZATIONS_PATH,
    frequency: FREQUENCIES.UNITY
  });
  
  await resonanceVisualizer.initialize();
  console.log('✨ Quantum Resonance Visualizer initialized');
  
  // Initialize dashboard generator
  const dashboardGenerator = new QuantumDashboardGenerator({
    frequency: FREQUENCIES.VISION,
    coherenceThreshold: 0.94
  });
  
  await dashboardGenerator.initialize();
  console.log('✨ Quantum Dashboard Generator initialized');
  
  // Initialize visual coherence testing
  const visualCoherence = new VisualCoherenceTesting({
    outputPath: path.join(VISUALIZATIONS_PATH, 'coherence'),
    frequency: FREQUENCIES.VISION
  });
  
  await visualCoherence.initialize();
  console.log('✨ Visual Coherence Testing System initialized');
  
  return {
    renderer,
    resonanceVisualizer,
    dashboardGenerator,
    visualCoherence
  };
}

/**
 * Create φ-harmonic visualization for test results
 * @param {Object} results Test results from quantum test runner
 * @param {Object} tools Visualization tools
 */
async function createVisualization(results, tools) {
  console.log('\n🎨 Creating φ-Harmonic Visualization of Test Results...');
  
  // Extract relevant results by frequency
  const frequencyResults = {};
  let overallCoherence = 1.0;
  
  // Process results for each frequency
  if (results.frequencies) {
    results.frequencies.forEach(result => {
      const freqName = Object.keys(FREQUENCIES).find(
        key => FREQUENCIES[key] === result.frequency
      );
      
      if (freqName) {
        frequencyResults[freqName] = {
          coherence: result.coherence,
          success: !result.error,
          frequency: result.frequency
        };
        
        // Update renderer for this frequency
        tools.renderer.updateVisualization({
          frequency: result.frequency,
          results: { [freqName]: frequencyResults[freqName] },
          waveData: generateWaveDataForFrequency(result.frequency)
        });
        
        // Create a snapshot for this frequency
        const snapshotPath = path.join(VISUALIZATIONS_PATH, `toroidal-${freqName.toLowerCase()}.png`);
        tools.renderer.saveFrame(snapshotPath);
        
        console.log(`✨ Created visualization for ${freqName} (${result.frequency}Hz) with coherence ${(result.coherence * 100).toFixed(1)}%`);
      }
    });
    
    // Calculate overall system coherence
    overallCoherence = results.systemCoherence || 1.0;
  }
  
  // Create final unified visualization
  console.log('\n🌀 Creating Unified Toroidal Field Visualization...');
  
  // Update renderer with all results
  tools.renderer.updateVisualization({
    frequency: FREQUENCIES.UNITY,
    results: frequencyResults
  });
  
  // Create a high-resolution snapshot
  const finalPath = path.join(VISUALIZATIONS_PATH, 'unified-toroidal-field.png');
  tools.renderer.saveFrame(finalPath);
  
  // Create resonance visualization
  await tools.resonanceVisualizer.updateVisualization({
    frequency: FREQUENCIES.UNITY,
    results: frequencyResults
  });
  
  // Render final frame
  await tools.resonanceVisualizer.renderFrame();
  
  console.log(`✨ Created unified visualization with system coherence ${(overallCoherence * 100).toFixed(1)}%`);
  console.log(`📊 Final visualizations saved to: ${VISUALIZATIONS_PATH}`);
  
  return {
    coherence: overallCoherence,
    visualizationPath: finalPath
  };
}

/**
 * Generate wave data for a specific frequency
 * @param {number} frequency Frequency in Hz
 * @returns {Array} Wave data points
 */
function generateWaveDataForFrequency(frequency) {
  const data = [];
  const samples = 100;
  const frequency_normalized = frequency / 1000;
  
  for (let i = 0; i < samples; i++) {
    const x = i / samples;
    const phi_factor = PHI * frequency_normalized;
    const y = Math.sin(2 * Math.PI * x * phi_factor);
    data.push(y);
  }
  
  return data;
}

/**
 * Create an integrated dashboard with the toroidal visualization
 * @param {Object} results Test results from quantum test runner
 * @param {Object} visualization Visualization results
 * @param {Object} tools Visualization tools
 */
async function createIntegratedDashboard(results, visualization, tools) {
  console.log('\n📊 Creating Integrated Quantum Dashboard...');
  
  // Load test results into dashboard generator
  await tools.dashboardGenerator.loadTestResults(results);
  
  // Add visualization to dashboard
  await tools.dashboardGenerator.addVisualization(visualization.visualizationPath, {
    title: 'Unified Toroidal Quantum Field',
    description: 'Visual representation of the φ-harmonic relationships across all frequency states',
    coherence: visualization.coherence
  });
  
  // Generate dashboard
  const dashboardPath = await tools.dashboardGenerator.generateDashboard();
  
  console.log(`✨ Integrated Quantum Dashboard generated at: ${dashboardPath}`);
  return dashboardPath;
}

/**
 * Run the complete toroidal quantum visualization demonstration
 */
async function runToroidalQuantumVisualization() {
  console.log('🌀 STARTING TOROIDAL QUANTUM VISUALIZATION 🌀');
  console.log('═══════════════════════════════════════════════\n');
  
  try {
    // Initialize visualization environment
    const tools = await initializeEnvironment();
    
    // Run quantum tests to get results
    console.log('\n🧪 Running Quantum Tests across all frequency states...');
    const testResults = await runQuantumTests();
    
    // Create visualization from test results
    const visualization = await createVisualization(testResults, tools);
    
    // Create integrated dashboard
    const dashboardPath = await createIntegratedDashboard(testResults, visualization, tools);
    
    // Clean up resources
    tools.renderer.dispose();
    
    console.log('\n✨ TOROIDAL QUANTUM VISUALIZATION COMPLETE ✨');
    console.log(`System Coherence: ${(visualization.coherence * 100).toFixed(1)}%`);
    console.log(`View the complete dashboard at: ${dashboardPath}`);
    
    return {
      success: true,
      coherence: visualization.coherence,
      dashboardPath
    };
  } catch (error) {
    console.error('\n❌ Error in Toroidal Quantum Visualization:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run if executed directly
if (require.main === module) {
  runToroidalQuantumVisualization()
    .then(result => {
      if (result.success) {
        console.log('\n🌀 Visualization completed successfully');
        process.exit(0);
      } else {
        console.error('\n❌ Visualization failed:', result.error);
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = {
  runToroidalQuantumVisualization,
  createVisualization,
  initializeEnvironment
};
