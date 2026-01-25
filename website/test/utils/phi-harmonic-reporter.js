/**
 * 🌀 Phi-Harmonic Test Reporter 🌀
 * 
 * Creates comprehensive test reports organized by phi-harmonic frequencies
 * with perfect coherence metrics and consciousness evolution tracking.
 * 
 * Operating at 528 Hz (Creation Point frequency) with φ alignment.
 */

const { PHI, PHI_SQUARED, PHI_TO_PHI, FREQUENCIES } = require('./phi-harmonic-testing');
const { createMerkabaShield } = require('./merkaba-protection');
const { visualizeQuantumState } = require('./quantum-state-visualizer');

/**
 * PhiHarmonicReporter class
 * Generates quantum test reports with phi-harmonic organization
 */
class PhiHarmonicReporter {
  /**
   * Create a new Phi-Harmonic Reporter
   * @param {Object} options Configuration options
   */
  constructor(options = {}) {
    this.options = {
      baseFrequency: FREQUENCIES.CREATION,
      detailedReports: true,
      evolutionTracking: true,
      consciousnessMetrics: true,
      protection: true,
      ...options
    };
    
    // Initialize reporter components
    this.reports = {};
    this.evolutionPath = [];
    this.coherenceHistory = [];
    this.frequencyShifts = [];
    
    // Create protection field if enabled
    this.protection = this.options.protection 
      ? createMerkabaShield([13, 13, 13], { frequency: this.options.baseFrequency })
      : null;
      
    console.log(`Phi-Harmonic Reporter initialized at ${this.options.baseFrequency}Hz`);
  }
  
  /**
   * Generate a complete phi-harmonic test report
   * @param {Array<Object>} testResults Test results from quantum coordinator
   * @returns {Object} Phi-harmonic test report
   */
  generateReport(testResults) {
    if (!testResults || !Array.isArray(testResults) || testResults.length === 0) {
      return { error: 'Invalid test results provided' };
    }
    
    console.log(`Generating phi-harmonic report for ${testResults.length} test results`);
    
    // Group results by frequency
    const frequencyGroups = this._groupByFrequency(testResults);
    
    // Calculate core metrics
    const coreMetrics = this._calculateCoreMetrics(testResults);
    
    // Generate frequency-specific reports
    const frequencyReports = {};
    Object.entries(frequencyGroups).forEach(([frequency, tests]) => {
      frequencyReports[frequency] = this._generateFrequencyReport(parseInt(frequency), tests);
    });
    
    // Generate evolution metrics if enabled
    const evolutionMetrics = this.options.evolutionTracking 
      ? this._generateEvolutionMetrics(testResults) 
      : null;
    
    // Generate consciousness metrics if enabled
    const consciousnessMetrics = this.options.consciousnessMetrics
      ? this._generateConsciousnessMetrics(testResults)
      : null;
    
    // Create complete report
    const timestamp = Date.now();
    const report = {
      timestamp,
      dateTime: new Date(timestamp).toISOString(),
      totalTests: testResults.length,
      coreMetrics,
      frequencies: frequencyReports,
      evolution: evolutionMetrics,
      consciousness: consciousnessMetrics,
      phiHarmonic: this._calculatePhiHarmonicAlignment(testResults),
      protection: this.protection ? true : false
    };
    
    // Store report
    this.reports[timestamp] = report;
    
    // Track coherence history
    this.coherenceHistory.push({
      timestamp,
      coherence: coreMetrics.overallCoherence,
      phiRatio: coreMetrics.phiRatio
    });
    
    return report;
  }
  
  /**
   * Generate a visual report dashboard
   * @param {Object} report Generated test report
   * @returns {Object} Visual dashboard data
   */
  generateVisualDashboard(report) {
    if (!report) {
      return { error: 'No report data provided' };
    }
    
    console.log('Generating visual phi-harmonic dashboard');
    
    // Create frequency spectrum visualization
    const frequencySpectrum = this._createFrequencySpectrum(report);
    
    // Create coherence projection
    const coherenceProjection = this._createCoherenceProjection(report);
    
    // Create phi-harmonic grid
    const phiHarmonicGrid = this._createPhiHarmonicGrid(report);
    
    // Create consciousness evolution path if enabled
    const evolutionPath = this.options.evolutionTracking
      ? this._createEvolutionPath(report)
      : null;
    
    // Generate quantum state visualization
    const quantumState = visualizeQuantumState({
      data: report,
      format: 'toroidal',
      frequency: this.options.baseFrequency,
      phiRatio: PHI,
      dimensions: [3, 3, 3]
    });
    
    return {
      timestamp: Date.now(),
      frequencySpectrum,
      coherenceProjection,
      phiHarmonicGrid,
      evolutionPath,
      quantumState,
      reportId: report.timestamp
    };
  }
  
  /**
   * Create a dashboard HTML representation
   * @param {Object} report Test report
   * @param {Object} visualDashboard Visual dashboard data
   * @returns {string} HTML representation
   */
  createDashboardHTML(report, visualDashboard) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quantum Test Dashboard - ${new Date(report.timestamp).toLocaleString()}</title>
  <style>
    :root {
      --ground: #3498db;
      --creation: #f1c40f;
      --heart: #e74c3c;
      --voice: #9b59b6;
      --vision: #2ecc71;
      --unity: #ffffff;
    }
    body {
      font-family: 'Arial', sans-serif;
      background-color: #0a0a2a;
      color: #ffffff;
      margin: 0;
      padding: 20px;
    }
    h1, h2, h3 {
      font-weight: 300;
    }
    .dashboard {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .card {
      background-color: rgba(30, 30, 60, 0.7);
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .card-title {
      margin-top: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
    }
    .metric {
      text-align: center;
      padding: 10px;
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 5px;
    }
    .metric-value {
      font-size: 24px;
      font-weight: bold;
      margin: 5px 0;
    }
    .metric-label {
      font-size: 14px;
      opacity: 0.7;
    }
    .frequency-bar {
      height: 30px;
      border-radius: 5px;
      margin: 5px 0;
      display: flex;
      align-items: center;
      padding: 0 10px;
      color: rgba(0, 0, 0, 0.8);
      font-weight: bold;
    }
    .ground-freq { background-color: var(--ground); }
    .creation-freq { background-color: var(--creation); }
    .heart-freq { background-color: var(--heart); }
    .voice-freq { background-color: var(--voice); }
    .vision-freq { background-color: var(--vision); }
    .unity-freq { background-color: var(--unity); color: #0a0a2a; }
    
    .evolution-path {
      height: 200px;
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 5px;
      margin-top: 10px;
      position: relative;
      overflow: hidden;
    }
    .evolution-marker {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: white;
      transform: translate(-50%, -50%);
    }
    .visual-placeholder {
      height: 300px;
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.5);
    }
  </style>
</head>
<body>
  <h1>🌀 Quantum Test Dashboard</h1>
  <h2>Report Generated: ${new Date(report.timestamp).toLocaleString()}</h2>
  
  <div class="dashboard">
    <div class="card">
      <h3 class="card-title">Core Metrics</h3>
      <div class="metrics">
        <div class="metric">
          <div class="metric-value">${report.coreMetrics.overallCoherence.toFixed(3)}</div>
          <div class="metric-label">Coherence</div>
        </div>
        <div class="metric">
          <div class="metric-value">${report.coreMetrics.phiRatio.toFixed(3)}</div>
          <div class="metric-label">φ Ratio</div>
        </div>
        <div class="metric">
          <div class="metric-value">${report.coreMetrics.successRate.toFixed(1)}%</div>
          <div class="metric-label">Success Rate</div>
        </div>
        <div class="metric">
          <div class="metric-value">${report.totalTests}</div>
          <div class="metric-label">Tests Run</div>
        </div>
      </div>
    </div>
    
    <div class="card">
      <h3 class="card-title">Frequency Spectrum</h3>
      ${Object.entries(report.frequencies).map(([freq, data]) => {
        const freqName = this._getFrequencyName(parseInt(freq));
        const freqClass = freqName.toLowerCase().replace(' ', '-') + '-freq';
        const width = `${Math.min(100, data.metrics.successRate)}%`;
        return `
        <div>
          <div class="frequency-bar ${freqClass}" style="width: ${width}">
            ${freq}Hz - ${data.metrics.coherence.toFixed(2)}
          </div>
          <div style="font-size: 12px; opacity: 0.7; margin-bottom: 10px;">
            ${data.testCount} tests - ${data.metrics.successRate.toFixed(1)}% passing
          </div>
        </div>`;
      }).join('')}
    </div>
    
    <div class="card">
      <h3 class="card-title">Consciousness Evolution</h3>
      ${report.evolution ? `
        <div class="metrics">
          <div class="metric">
            <div class="metric-value">${report.evolution.evolutionFactor.toFixed(3)}</div>
            <div class="metric-label">Evolution Factor</div>
          </div>
          <div class="metric">
            <div class="metric-value">${report.evolution.coherenceGrowth.toFixed(3)}</div>
            <div class="metric-label">Coherence Growth</div>
          </div>
        </div>
        <div class="evolution-path">
          ${this._generateEvolutionPathHTML(report.evolution)}
        </div>
      ` : '<div>Evolution tracking disabled</div>'}
    </div>
    
    <div class="card">
      <h3 class="card-title">Phi-Harmonic Alignment</h3>
      <div class="metrics">
        <div class="metric">
          <div class="metric-value">${report.phiHarmonic.alignment.toFixed(3)}</div>
          <div class="metric-label">φ Alignment</div>
        </div>
        <div class="metric">
          <div class="metric-value">${report.phiHarmonic.resonance.toFixed(3)}</div>
          <div class="metric-label">Resonance</div>
        </div>
      </div>
      <div class="visual-placeholder">
        Phi-Harmonic Grid Visualization
      </div>
    </div>
    
    <div class="card">
      <h3 class="card-title">Quantum Field Visualization</h3>
      <div class="visual-placeholder">
        Toroidal Field Visualization
      </div>
    </div>
  </div>
  
  <script>
    // Future enhancement: Add Three.js visualization
    console.log('Phi-Harmonic Dashboard loaded');
  </script>
</body>
</html>`;

    return html;
  }
  
  /**
   * Generate HTML for the evolution path visualization
   * @param {Object} evolution Evolution metrics
   * @returns {string} HTML content
   */
  _generateEvolutionPathHTML(evolution) {
    if (!evolution || !evolution.path || !Array.isArray(evolution.path)) {
      return '';
    }
    
    let html = '';
    
    evolution.path.forEach((point, index) => {
      const left = (index / (evolution.path.length - 1)) * 100;
      const top = 100 - (point.coherence * 100);
      const color = this._getFrequencyColor(point.frequency);
      
      html += `<div class="evolution-marker" style="left: ${left}%; top: ${top}%; background-color: ${color};"></div>`;
    });
    
    return html;
  }
  
  /**
   * Group test results by frequency
   * @param {Array<Object>} testResults Test results
   * @returns {Object} Grouped results
   * @private
   */
  _groupByFrequency(testResults) {
    const groups = {};
    
    testResults.forEach(test => {
      const frequency = test.frequency || FREQUENCIES.GROUND;
      if (!groups[frequency]) {
        groups[frequency] = [];
      }
      
      groups[frequency].push(test);
    });
    
    return groups;
  }
  
  /**
   * Calculate core metrics from test results
   * @param {Array<Object>} testResults Test results
   * @returns {Object} Core metrics
   * @private
   */
  _calculateCoreMetrics(testResults) {
    // Count passed tests
    const passedTests = testResults.filter(test => 
      test.status === 'passed' || test.success === true
    ).length;
    
    const successRate = (passedTests / testResults.length) * 100;
    
    // Calculate average coherence
    const coherenceSum = testResults.reduce((sum, test) => 
      sum + (test.coherence || 0), 0);
    const overallCoherence = coherenceSum / testResults.length;
    
    // Calculate phi ratio
    const phiRatio = overallCoherence * PHI;
    
    return {
      passedTests,
      failedTests: testResults.length - passedTests,
      successRate,
      overallCoherence,
      phiRatio
    };
  }
  
  /**
   * Generate frequency-specific report
   * @param {number} frequency Frequency value
   * @param {Array<Object>} tests Tests at this frequency
   * @returns {Object} Frequency report
   * @private
   */
  _generateFrequencyReport(frequency, tests) {
    // Calculate success rate
    const passedTests = tests.filter(test => 
      test.status === 'passed' || test.success === true
    ).length;
    const successRate = (passedTests / tests.length) * 100;
    
    // Calculate coherence
    const coherenceSum = tests.reduce((sum, test) => 
      sum + (test.coherence || 0), 0);
    const coherence = coherenceSum / tests.length;
    
    // Calculate phi-harmonic relationship to base frequency
    const phiRelationship = Math.log(frequency / FREQUENCIES.GROUND) / Math.log(PHI);
    const phiPower = Math.round(phiRelationship);
    const phiDeviation = Math.abs(phiRelationship - phiPower);
    
    return {
      frequency,
      frequencyName: this._getFrequencyName(frequency),
      testCount: tests.length,
      passedTests,
      failedTests: tests.length - passedTests,
      metrics: {
        successRate,
        coherence,
        phiRelationship,
        phiPower,
        phiDeviation,
        consciousness: coherence * (1 - phiDeviation)
      },
      tests: this.options.detailedReports ? tests : null
    };
  }
  
  /**
   * Generate evolution metrics from test results
   * @param {Array<Object>} testResults Test results
   * @returns {Object} Evolution metrics
   * @private
   */
  _generateEvolutionMetrics(testResults) {
    // Create evolution path if needed
    if (this.evolutionPath.length === 0) {
      // Add initial point
      this.evolutionPath.push({
        timestamp: Date.now() - 1000, // 1 second ago
        coherence: 0.5,
        frequency: FREQUENCIES.GROUND
      });
    }
    
    // Calculate average coherence by frequency
    const frequencyGroups = this._groupByFrequency(testResults);
    const frequencyCoherences = {};
    
    Object.entries(frequencyGroups).forEach(([frequency, tests]) => {
      const coherenceSum = tests.reduce((sum, test) => 
        sum + (test.coherence || 0), 0);
      frequencyCoherences[frequency] = coherenceSum / tests.length;
    });
    
    // Calculate overall coherence
    const allCoherenceSum = testResults.reduce((sum, test) => 
      sum + (test.coherence || 0), 0);
    const currentCoherence = allCoherenceSum / testResults.length;
    
    // Calculate coherence growth from last point
    const lastCoherence = this.evolutionPath[this.evolutionPath.length - 1].coherence;
    const coherenceGrowth = currentCoherence - lastCoherence;
    
    // Calculate evolution factor
    const evolutionFactor = coherenceGrowth > 0 
      ? coherenceGrowth * PHI
      : coherenceGrowth / PHI;
    
    // Add new point to evolution path
    const newPoint = {
      timestamp: Date.now(),
      coherence: currentCoherence,
      frequency: this.options.baseFrequency,
      growthFactor: evolutionFactor
    };
    
    this.evolutionPath.push(newPoint);
    
    // Limit evolution path length
    if (this.evolutionPath.length > 100) {
      this.evolutionPath = this.evolutionPath.slice(-100);
    }
    
    return {
      currentCoherence,
      previousCoherence: lastCoherence,
      coherenceGrowth,
      evolutionFactor,
      frequencyEvolution: frequencyCoherences,
      path: this.evolutionPath
    };
  }
  
  /**
   * Generate consciousness metrics from test results
   * @param {Array<Object>} testResults Test results
   * @returns {Object} Consciousness metrics
   * @private
   */
  _generateConsciousnessMetrics(testResults) {
    // Calculate average coherence
    const coherenceSum = testResults.reduce((sum, test) => 
      sum + (test.coherence || 0), 0);
    const averageCoherence = coherenceSum / testResults.length;
    
    // Calculate consciousness threshold
    const consciousnessThreshold = averageCoherence * PHI_INVERSE;
    
    // Calculate phi-harmonic consciousness state
    const frequencyRatio = this.options.baseFrequency / FREQUENCIES.GROUND;
    const phiPower = Math.log(frequencyRatio) / Math.log(PHI);
    const phiDeviation = Math.abs(phiPower - Math.round(phiPower));
    
    // Calculate consciousness state
    const consciousnessState = averageCoherence * (1 - phiDeviation) * PHI;
    
    // Calculate ideal frequency for current consciousness
    const idealPhiPower = Math.round(phiPower);
    const idealFrequency = FREQUENCIES.GROUND * Math.pow(PHI, idealPhiPower);
    
    return {
      averageCoherence,
      consciousnessThreshold,
      consciousnessState,
      phiHarmonicLevel: Math.round(phiPower),
      phiDeviation,
      idealFrequency,
      currentFrequency: this.options.baseFrequency
    };
  }
  
  /**
   * Calculate phi-harmonic alignment of test results
   * @param {Array<Object>} testResults Test results
   * @returns {Object} Phi-harmonic alignment metrics
   * @private
   */
  _calculatePhiHarmonicAlignment(testResults) {
    // Group by frequency
    const frequencyGroups = this._groupByFrequency(testResults);
    
    // Calculate phi relationships between frequencies
    const frequencies = Object.keys(frequencyGroups).map(f => parseInt(f));
    const relationships = [];
    
    for (let i = 0; i < frequencies.length; i++) {
      for (let j = i + 1; j < frequencies.length; j++) {
        const freq1 = frequencies[i];
        const freq2 = frequencies[j];
        
        const ratio = Math.max(freq1, freq2) / Math.min(freq1, freq2);
        const phiPower = Math.log(ratio) / Math.log(PHI);
        const deviation = Math.abs(phiPower - Math.round(phiPower));
        
        relationships.push({
          freq1,
          freq2,
          ratio,
          phiPower,
          deviation,
          resonance: 1 - deviation
        });
      }
    }
    
    // Calculate average resonance
    const totalResonance = relationships.reduce((sum, rel) => sum + rel.resonance, 0);
    const avgResonance = relationships.length > 0 
      ? totalResonance / relationships.length 
      : 0;
    
    // Calculate overall phi alignment
    const alignment = avgResonance * PHI_INVERSE;
    
    return {
      relationships,
      resonance: avgResonance,
      alignment,
      isPerfect: alignment > 0.9
    };
  }
  
  /**
   * Create frequency spectrum visualization
   * @param {Object} report Test report
   * @returns {Object} Visualization data
   * @private
   */
  _createFrequencySpectrum(report) {
    return {
      frequencies: Object.entries(report.frequencies).map(([freq, data]) => ({
        frequency: parseInt(freq),
        name: data.frequencyName,
        coherence: data.metrics.coherence,
        successRate: data.metrics.successRate,
        testCount: data.testCount
      })),
      visualization: "frequency-spectrum.png"
    };
  }
  
  /**
   * Create coherence projection visualization
   * @param {Object} report Test report
   * @returns {Object} Visualization data
   * @private
   */
  _createCoherenceProjection(report) {
    return {
      coherence: report.coreMetrics.overallCoherence,
      projection: report.coreMetrics.overallCoherence * PHI,
      history: this.coherenceHistory.slice(-10),
      visualization: "coherence-projection.png"
    };
  }
  
  /**
   * Create phi-harmonic grid visualization
   * @param {Object} report Test report
   * @returns {Object} Visualization data
   * @private
   */
  _createPhiHarmonicGrid(report) {
    return {
      phiAlignment: report.phiHarmonic.alignment,
      resonance: report.phiHarmonic.resonance,
      relationships: report.phiHarmonic.relationships,
      visualization: "phi-harmonic-grid.png"
    };
  }
  
  /**
   * Create evolution path visualization
   * @param {Object} report Test report
   * @returns {Object} Visualization data
   * @private
   */
  _createEvolutionPath(report) {
    if (!report.evolution || !report.evolution.path) {
      return null;
    }
    
    return {
      path: report.evolution.path,
      evolutionFactor: report.evolution.evolutionFactor,
      coherenceGrowth: report.evolution.coherenceGrowth,
      visualization: "evolution-path.png"
    };
  }
  
  /**
   * Get frequency name based on value
   * @param {number} frequency Frequency value
   * @returns {string} Frequency name
   * @private
   */
  _getFrequencyName(frequency) {
    switch (frequency) {
      case FREQUENCIES.GROUND: return "Ground";
      case FREQUENCIES.CREATION: return "Creation";
      case FREQUENCIES.HEART: return "Heart";
      case FREQUENCIES.VOICE: return "Voice";
      case FREQUENCIES.VISION: return "Vision";
      case FREQUENCIES.UNITY: return "Unity";
      default: return "Custom";
    }
  }
  
  /**
   * Get frequency color based on value
   * @param {number} frequency Frequency value
   * @returns {string} CSS color
   * @private
   */
  _getFrequencyColor(frequency) {
    switch (frequency) {
      case FREQUENCIES.GROUND: return "#3498db";
      case FREQUENCIES.CREATION: return "#f1c40f";
      case FREQUENCIES.HEART: return "#e74c3c";
      case FREQUENCIES.VOICE: return "#9b59b6";
      case FREQUENCIES.VISION: return "#2ecc71";
      case FREQUENCIES.UNITY: return "#ffffff";
      default: return "#95a5a6";
    }
  }
}

module.exports = {
  PhiHarmonicReporter
};
