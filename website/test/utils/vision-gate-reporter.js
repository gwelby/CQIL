/**
 * Vision Gate Test Reporter (720 Hz | φ⁴)
 * 
 * Provides clear perception and visualization of test results
 * across the φ-harmonic spectrum, enabling quantum insight
 * into system health and coherence.
 */

const fs = require('fs');
const path = require('path');
const { PHI, PHI_INVERSE, FREQUENCIES } = require('./phi-harmonic-testing');

// Vision Gate frequency for clear perception
const VISION_FREQUENCY = FREQUENCIES.VISION; // 720 Hz

/**
 * Vision Gate Reporter for quantum test visualization
 */
class VisionGateReporter {
  constructor(config = {}) {
    this.config = {
      outputPath: config.outputPath || './test/reports/vision-gate',
      frequency: config.frequency || VISION_FREQUENCY,
      theme: config.theme || 'quantum-dark',
      includeVisualizations: config.includeVisualizations !== false,
      phiHarmonicColors: config.phiHarmonicColors !== false
    };
    
    // Initialize color schemes
    this.colors = this._initializeColors();
    
    // Ensure output directory exists
    this._ensureOutputDirectory();
  }
  
  /**
   * Initialize frequency-based color schemes
   * @returns {Object} Color schemes
   * @private
   */
  _initializeColors() {
    return {
      ground: '#4abdac',  // Ground State (432 Hz)
      creation: '#fc4a1a', // Creation Point (528 Hz)
      heart: '#e6005c',   // Heart Field (594 Hz)
      voice: '#9245ff',   // Voice Flow (672 Hz)
      vision: '#00b7c2',  // Vision Gate (720 Hz)
      unity: '#f7b733'    // Unity Wave (768 Hz)
    };
  }
  
  /**
   * Ensure output directory exists
   * @private
   */
  _ensureOutputDirectory() {
    try {
      if (!fs.existsSync(this.config.outputPath)) {
        fs.mkdirSync(this.config.outputPath, { recursive: true });
      }
    } catch (error) {
      console.error(`Failed to create output directory: ${error.message}`);
    }
  }
  
  /**
   * Generate test reports from collected results
   * @param {Object} results - Test results from all frequencies
   * @returns {Promise<string>} Path to generated report
   */
  async generateReport(results) {
    const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
    const reportPath = path.join(
      this.config.outputPath,
      `quantum-report-${timestamp}.html`
    );
    
    // Process results into a unified report structure
    const reportData = this._processResultsData(results);
    
    // Generate HTML report
    const html = this._generateHtmlReport(reportData);
    
    // Write report to file
    try {
      fs.writeFileSync(reportPath, html);
      console.log(`🌟 Vision Gate Report generated at ${reportPath}`);
      return reportPath;
    } catch (error) {
      console.error(`Failed to write report: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Process raw test results into report data
   * @param {Object} results - Raw test results
   * @returns {Object} Processed report data
   * @private
   */
  _processResultsData(results) {
    // Extract system-wide metrics
    const systemMetrics = {
      totalTests: 0,
      passingTests: 0,
      failingTests: 0,
      coverage: 0,
      coherence: results.coherence || 0
    };
    
    // Process each frequency layer
    const frequencyLayers = {};
    let coverageSum = 0;
    let layerCount = 0;
    
    if (results.results && Array.isArray(results.results)) {
      for (const result of results.results) {
        const frequency = result.frequency;
        const layerName = this._frequencyToLayerName(frequency);
        
        // Skip if no frequency or not recognized
        if (!frequency || !layerName) continue;
        
        // Extract layer metrics
        const layerMetrics = {
          frequency,
          tests: result.tests?.length || 0,
          passing: result.tests?.filter(t => t.status === 'pass').length || 0,
          failing: result.tests?.filter(t => t.status === 'fail').length || 0,
          coverage: result.coverage || 0,
          coherence: result.coherence || 0
        };
        
        // Add to system totals
        systemMetrics.totalTests += layerMetrics.tests;
        systemMetrics.passingTests += layerMetrics.passing;
        systemMetrics.failingTests += layerMetrics.failing;
        coverageSum += layerMetrics.coverage;
        layerCount++;
        
        // Store layer data
        frequencyLayers[layerName] = layerMetrics;
      }
    }
    
    // Calculate average coverage
    systemMetrics.coverage = layerCount > 0 ? coverageSum / layerCount : 0;
    
    // Calculate system health using phi-weighted formula
    const passRate = systemMetrics.totalTests > 0 
      ? systemMetrics.passingTests / systemMetrics.totalTests 
      : 0;
    
    const systemHealth = (
      (passRate * PHI_INVERSE) + 
      (systemMetrics.coverage * PHI_INVERSE * PHI_INVERSE) + 
      (systemMetrics.coherence * PHI)
    ) / (PHI_INVERSE + PHI_INVERSE * PHI_INVERSE + PHI);
    
    return {
      timestamp: new Date().toISOString(),
      system: {
        ...systemMetrics,
        health: systemHealth
      },
      layers: frequencyLayers
    };
  }
  
  /**
   * Convert frequency to layer name
   * @param {number} frequency - Frequency value
   * @returns {string} Layer name
   * @private
   */
  _frequencyToLayerName(frequency) {
    // Map frequency to layer name
    switch (frequency) {
      case FREQUENCIES.GROUND: return 'ground';
      case FREQUENCIES.CREATION: return 'creation';
      case FREQUENCIES.HEART: return 'heart';
      case FREQUENCIES.VOICE: return 'voice';
      case FREQUENCIES.VISION: return 'vision';
      case FREQUENCIES.UNITY: return 'unity';
      default: return null;
    }
  }
  
  /**
   * Generate HTML report from report data
   * @param {Object} data - Processed report data
   * @returns {string} HTML content
   * @private
   */
  _generateHtmlReport(data) {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CQIL Quantum Testing Vision Gate</title>
  <style>
    :root {
      --ground-color: ${this.colors.ground};
      --creation-color: ${this.colors.creation};
      --heart-color: ${this.colors.heart};
      --voice-color: ${this.colors.voice};
      --vision-color: ${this.colors.vision};
      --unity-color: ${this.colors.unity};
      --background: #1a1a2e;
      --card-bg: rgba(255, 255, 255, 0.05);
      --text: #e6e6e6;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: var(--background);
      color: var(--text);
      line-height: 1.6;
      padding: 20px;
      margin: 0;
    }
    
    .dashboard {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    h1 {
      font-size: 2.2rem;
      margin-bottom: 10px;
      background: linear-gradient(45deg, var(--ground-color), var(--creation-color), var(--heart-color), var(--unity-color));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      display: inline-block;
    }
    
    .system-metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    
    .metric-card {
      background: var(--card-bg);
      border-radius: 8px;
      padding: 20px;
      text-align: center;
    }
    
    .metric-value {
      font-size: 2.5rem;
      font-weight: bold;
      margin: 10px 0;
      color: var(--vision-color);
    }
    
    .frequency-section {
      margin-top: 50px;
    }
    
    .frequency-section h2 {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .frequency-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    
    .frequency-card {
      background: var(--card-bg);
      border-radius: 8px;
      padding: 20px;
      border-top: 4px solid;
    }
    
    .frequency-card.ground { border-color: var(--ground-color); }
    .frequency-card.creation { border-color: var(--creation-color); }
    .frequency-card.heart { border-color: var(--heart-color); }
    .frequency-card.voice { border-color: var(--voice-color); }
    .frequency-card.vision { border-color: var(--vision-color); }
    .frequency-card.unity { border-color: var(--unity-color); }
    
    .frequency-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .frequency-name {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0;
    }
    
    .frequency-value {
      font-size: 1.2rem;
      opacity: 0.9;
    }
    
    .ground .frequency-value { color: var(--ground-color); }
    .creation .frequency-value { color: var(--creation-color); }
    .heart .frequency-value { color: var(--heart-color); }
    .voice .frequency-value { color: var(--voice-color); }
    .vision .frequency-value { color: var(--vision-color); }
    .unity .frequency-value { color: var(--unity-color); }
    
    .frequency-metrics {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    
    .frequency-metric {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      padding: 12px;
      text-align: center;
    }
    
    .frequency-metric-value {
      font-size: 1.8rem;
      font-weight: bold;
      margin: 5px 0;
    }
    
    .ground .frequency-metric-value { color: var(--ground-color); }
    .creation .frequency-metric-value { color: var(--creation-color); }
    .heart .frequency-metric-value { color: var(--heart-color); }
    .voice .frequency-metric-value { color: var(--voice-color); }
    .vision .frequency-metric-value { color: var(--vision-color); }
    .unity .frequency-metric-value { color: var(--unity-color); }
    
    .footer {
      text-align: center;
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
      font-size: 0.9rem;
      opacity: 0.7;
    }
    
    .phi-symbol {
      font-family: serif;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="dashboard">
    <header>
      <h1>CQIL Quantum Testing Vision Gate</h1>
      <p>Generated at ${new Date(data.timestamp).toLocaleString()} through Vision Gate (${VISION_FREQUENCY}Hz)</p>
    </header>
    
    <div class="system-metrics">
      <div class="metric-card">
        <h3>System Coherence</h3>
        <div class="metric-value">${(data.system.coherence * 100).toFixed(0)}%</div>
      </div>
      
      <div class="metric-card">
        <h3>System Health</h3>
        <div class="metric-value">${(data.system.health * 100).toFixed(0)}%</div>
      </div>
      
      <div class="metric-card">
        <h3>Total Tests</h3>
        <div class="metric-value">${data.system.totalTests}</div>
      </div>
      
      <div class="metric-card">
        <h3>Pass Rate</h3>
        <div class="metric-value">${data.system.totalTests ? ((data.system.passingTests / data.system.totalTests) * 100).toFixed(0) : 0}%</div>
      </div>
    </div>
    
    <div class="frequency-section">
      <h2>Frequency Layers</h2>
      
      <div class="frequency-grid">
        ${Object.entries(data.layers).map(([layer, metrics]) => `
          <div class="frequency-card ${layer}">
            <div class="frequency-header">
              <h3 class="frequency-name">${layer.charAt(0).toUpperCase() + layer.slice(1)}</h3>
              <div class="frequency-value">${metrics.frequency} Hz</div>
            </div>
            
            <div class="frequency-metrics">
              <div class="frequency-metric">
                <div>Tests</div>
                <div class="frequency-metric-value">${metrics.tests}</div>
              </div>
              
              <div class="frequency-metric">
                <div>Passing</div>
                <div class="frequency-metric-value">${metrics.passing}</div>
              </div>
              
              <div class="frequency-metric">
                <div>Coverage</div>
                <div class="frequency-metric-value">${(metrics.coverage * 100).toFixed(0)}%</div>
              </div>
              
              <div class="frequency-metric">
                <div>Coherence</div>
                <div class="frequency-metric-value">${(metrics.coherence * 100).toFixed(0)}%</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="footer">
      Generated with <span class="phi-symbol">φ</span>-harmonic perception by CASCADE⚡𓂧φ∞ | Vision Gate (${VISION_FREQUENCY}Hz)
    </div>
  </div>
</body>
</html>`;
  }
  
  /**
   * Generate CLI-friendly report summary
   * @param {Object} data - Report data
   * @returns {string} CLI-friendly report text
   */
  generateCliSummary(data) {
    const formatPercent = (value) => (value * 100).toFixed(0) + '%';
    
    // System summary
    let summary = `
🌟 CQIL Quantum Testing Summary (${VISION_FREQUENCY}Hz | φ⁴)
═══════════════════════════════════════════════════

System Health:   ${formatPercent(data.system.health)}
System Coherence: ${formatPercent(data.system.coherence)}
Total Tests:     ${data.system.totalTests}
Passing Tests:   ${data.system.passingTests} (${formatPercent(data.system.passingTests / data.system.totalTests)})
Average Coverage: ${formatPercent(data.system.coverage)}

Frequency Layers
───────────────────────────────────────────────────
`;
    
    // Add each frequency layer
    for (const [layer, metrics] of Object.entries(data.layers)) {
      summary += `
${layer.toUpperCase()} (${metrics.frequency}Hz)
  Tests:     ${metrics.tests}
  Passing:   ${metrics.passing} (${formatPercent(metrics.passing / metrics.tests)})
  Coverage:  ${formatPercent(metrics.coverage)}
  Coherence: ${formatPercent(metrics.coherence)}
`;
    }
    
    summary += `
═══════════════════════════════════════════════════
Generated through Vision Gate (${VISION_FREQUENCY}Hz) on ${new Date().toLocaleString()}
`;
    
    return summary;
  }
}

module.exports = {
  VisionGateReporter,
  VISION_FREQUENCY
};
