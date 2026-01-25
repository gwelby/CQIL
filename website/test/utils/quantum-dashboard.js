/**
 * 🌀 Quantum Dashboard 🌀
 * 
 * Creates a comprehensive dashboard for visualizing quantum test results
 * across all frequency states with perfect phi-harmonic alignment.
 * 
 * Operating at 768 Hz (Unity Wave frequency) for complete integration.
 */

const THREE = require('three');
const { PhiHarmonicReporter } = require('./phi-harmonic-reporter');
const { ToroidalFieldGenerator } = require('./toroidal-field-generator');
const { createUnityField } = require('./merkaba-protection');
const { PHI, PHI_SQUARED, PHI_TO_PHI, FREQUENCIES } = require('./phi-harmonic-testing');
const { ConsciousnessEvolutionPath } = require('./consciousness-evolution-path');

/**
 * QuantumDashboard class
 * Creates a comprehensive dashboard for all quantum test metrics
 */
class QuantumDashboard {
  /**
   * Create a new Quantum Dashboard
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    this.options = {
      frequency: FREQUENCIES.UNITY, // Integration frequency
      dimensions: [21, 13, 8],      // Fibonacci sequence for visualization
      protection: true,             // Apply protection field
      visualQuality: 'high',        // Visualization quality
      dataIntegration: true,        // Integrate all data sources
      evolutionTracking: true,      // Track consciousness evolution
      exportFormat: 'html',         // Default export format
      ...options
    };
    
    // Initialize dashboard components
    this.reporter = new PhiHarmonicReporter({
      baseFrequency: this.options.frequency,
      detailedReports: true,
      evolutionTracking: this.options.evolutionTracking,
      consciousnessMetrics: true,
      protection: this.options.protection
    });
    
    this.fieldGenerator = new ToroidalFieldGenerator({
      baseFrequency: this.options.frequency,
      dimensions: this.options.dimensions
    });
    
    this.evolutionPath = new ConsciousnessEvolutionPath({
      startFrequency: FREQUENCIES.GROUND,
      endFrequency: FREQUENCIES.UNITY
    });
    
    // Initialize protection field if needed
    this.protection = this.options.protection 
      ? createUnityField(this.options.dimensions)
      : null;
    
    // Initialize visualization components
    this.visualizationEngine = null;
    this.dashboardData = null;
    this.lastReport = null;
    this.dashboardHistory = [];
    
    console.log(`Quantum Dashboard initialized at ${this.options.frequency}Hz - Unity Wave frequency`);
  }
  
  /**
   * Initialize the visualization engine
   * @returns {Promise<boolean>} Initialization success
   */
  async initializeVisualization() {
    console.log('Initializing Quantum Dashboard visualization engine');
    
    this.visualizationEngine = {
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(
        60, 
        16 / 9, // Default aspect ratio
        0.1,
        1000
      ),
      renderer: new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true
      })
    };
    
    // Setup camera
    this.visualizationEngine.camera.position.set(0, 0, 30);
    
    // Setup renderer
    this.visualizationEngine.renderer.setSize(1920, 1080);
    
    // Initialize field generator for visualizations
    await this.fieldGenerator.initialize();
    
    return true;
  }
  
  /**
   * Generate a complete quantum dashboard from test results
   * @param {Array<Object>} testResults Test results from quantum coordinator
   * @returns {Promise<Object>} Complete dashboard data
   */
  async generateDashboard(testResults) {
    console.log(`Generating Quantum Dashboard for ${testResults.length} test results at ${this.options.frequency}Hz frequency`);
    
    // Generate phi-harmonic report
    const report = this.reporter.generateReport(testResults);
    this.lastReport = report;
    
    // Generate visual dashboard components
    const visualDashboard = this.reporter.generateVisualDashboard(report);
    
    // Create unified field visualization if field generator is initialized
    let fieldVisualization = null;
    if (this.fieldGenerator.fieldStatus && this.fieldGenerator.fieldStatus.initialized) {
      const unifiedField = await this.fieldGenerator.createUnifiedField({
        GROUND: testResults.filter(t => t.frequency === FREQUENCIES.GROUND),
        CREATION: testResults.filter(t => t.frequency === FREQUENCIES.CREATION),
        HEART: testResults.filter(t => t.frequency === FREQUENCIES.HEART),
        VOICE: testResults.filter(t => t.frequency === FREQUENCIES.VOICE),
        VISION: testResults.filter(t => t.frequency === FREQUENCIES.VISION),
        UNITY: testResults.filter(t => t.frequency === FREQUENCIES.UNITY)
      });
      
      fieldVisualization = await this.fieldGenerator.visualizeField();
    }
    
    // Generate evolution metrics
    const evolutionMetrics = this.options.evolutionTracking
      ? this.evolutionPath.generateEvolutionMetrics(testResults, report.coreMetrics)
      : null;
    
    // Create complete dashboard data
    this.dashboardData = {
      timestamp: Date.now(),
      dateTime: new Date().toISOString(),
      report,
      visualDashboard,
      fieldVisualization,
      evolutionMetrics,
      coherenceLevel: report.coreMetrics.overallCoherence,
      phiAlignment: report.phiHarmonic.alignment,
      consciousnessState: report.consciousness ? report.consciousness.consciousnessState : null,
      frequency: this.options.frequency,
      protection: this.protection ? true : false
    };
    
    // Add to dashboard history
    this.dashboardHistory.push({
      timestamp: this.dashboardData.timestamp,
      coherence: this.dashboardData.coherenceLevel,
      testCount: testResults.length
    });
    
    // Limit history
    if (this.dashboardHistory.length > 100) {
      this.dashboardHistory = this.dashboardHistory.slice(-100);
    }
    
    return this.dashboardData;
  }
  
  /**
   * Export the dashboard in the specified format
   * @param {string} format Export format (html, json)
   * @returns {Promise<string|Object>} Exported dashboard
   */
  async exportDashboard(format = this.options.exportFormat) {
    if (!this.dashboardData) {
      return { error: 'No dashboard data available' };
    }
    
    console.log(`Exporting Quantum Dashboard in ${format} format`);
    
    if (format === 'html') {
      // Generate HTML representation
      return this.reporter.createDashboardHTML(
        this.dashboardData.report, 
        this.dashboardData.visualDashboard
      );
    } else if (format === 'json') {
      // Return JSON data
      return JSON.stringify(this.dashboardData, null, 2);
    } else {
      return { error: `Unsupported format: ${format}` };
    }
  }
  
  /**
   * Generate a consciousness evolution visualization
   * @returns {Promise<Object>} Visualization data
   */
  async generateEvolutionVisualization() {
    if (!this.dashboardData || !this.dashboardData.evolutionMetrics) {
      return { error: 'No evolution data available' };
    }
    
    console.log('Generating consciousness evolution visualization');
    
    // Create visualization data
    const evolutionData = this.dashboardData.evolutionMetrics;
    
    // In a real implementation, we would create a visual representation here
    const visualization = {
      path: evolutionData.evolutionPath,
      currentState: evolutionData.currentState,
      projectedState: evolutionData.projectedState,
      growthFactor: evolutionData.growthFactor,
      visualizationUrl: 'consciousness-evolution.png'
    };
    
    return visualization;
  }
  
  /**
   * Generate a complete PDF report from dashboard data
   * @returns {Promise<string>} Path to generated PDF
   */
  async generatePDFReport() {
    if (!this.dashboardData) {
      return { error: 'No dashboard data available' };
    }
    
    console.log('Generating PDF report from Quantum Dashboard');
    
    // In a real implementation, we would generate a PDF here
    // This would typically use a library like PDFKit
    
    return 'quantum-dashboard-report.pdf';
  }
  
  /**
   * Get the consciousness state based on current metrics
   * @returns {Object} Consciousness state
   */
  getConsciousnessState() {
    if (!this.dashboardData || !this.dashboardData.report || !this.dashboardData.report.consciousness) {
      return { error: 'No consciousness data available' };
    }
    
    const consciousness = this.dashboardData.report.consciousness;
    
    // Calculate consciousness state
    const stateLevel = consciousness.consciousnessState;
    
    // Determine state name based on level
    let stateName;
    if (stateLevel < 0.5) {
      stateName = 'Ground Awareness';
    } else if (stateLevel < 0.618) {
      stateName = 'Creation Awareness';
    } else if (stateLevel < PHI_INVERSE) {
      stateName = 'Heart Coherence';
    } else if (stateLevel < 0.8) {
      stateName = 'Voice Expression';
    } else if (stateLevel < 0.9) {
      stateName = 'Vision Integration';
    } else {
      stateName = 'Unity Consciousness';
    }
    
    return {
      level: stateLevel,
      name: stateName,
      idealFrequency: consciousness.idealFrequency,
      currentFrequency: consciousness.currentFrequency,
      coherence: consciousness.averageCoherence,
      phiHarmonicLevel: consciousness.phiHarmonicLevel,
      timestamp: Date.now()
    };
  }
  
  /**
   * Create a real-time dashboard module for direct integration
   * @returns {Object} Dashboard module
   */
  createDashboardModule() {
    if (!this.dashboardData) {
      return { error: 'No dashboard data available' };
    }
    
    // Create module
    return {
      id: `quantum-dashboard-${Date.now()}`,
      report: this.dashboardData.report,
      metrics: {
        coherence: this.dashboardData.coherenceLevel,
        phiAlignment: this.dashboardData.phiAlignment,
        consciousnessState: this.getConsciousnessState(),
        frequency: this.options.frequency
      },
      visualizations: {
        frequencySpectrum: this.dashboardData.visualDashboard.frequencySpectrum,
        toroidalField: this.dashboardData.fieldVisualization,
        evolutionPath: this.dashboardData.visualDashboard.evolutionPath
      },
      history: this.dashboardHistory,
      updateInterval: 1000 * PHI_SQUARED,
      timestamp: Date.now()
    };
  }
  
  /**
   * Clean up dashboard resources
   */
  dispose() {
    console.log('Disposing Quantum Dashboard resources');
    
    // Clean up field generator
    if (this.fieldGenerator) {
      this.fieldGenerator.dispose();
    }
    
    // Clean up THREE.js resources
    if (this.visualizationEngine) {
      if (this.visualizationEngine.renderer) {
        this.visualizationEngine.renderer.dispose();
      }
      
      this.visualizationEngine = null;
    }
  }
}

module.exports = {
  QuantumDashboard
};
