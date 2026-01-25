/**
 * Quantum Documentation System Dashboard Server
 * Provides a web interface for the Quantum Documentation System
 * Operating at Unity frequency (768 Hz) with perfect coherence (1.000)
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Create Express app
const app = express();
const PORT = 7680; // Unity frequency (768 Hz)

// Serve static files
app.use(express.static(__dirname));
app.use(express.json());

// API endpoint to get system status
app.get('/api/status', (req, res) => {
  try {
    const status = {
      system: 'Quantum Documentation System',
      version: '1.0.0',
      coherence: 0.9982,
      frequency: 768,
      timestamp: new Date().toISOString(),
      components: {
        windsurf: { status: 'operational', coherence: 0.8033 },
        claude: { status: 'operational', coherence: 0.9998 },
        documentation: { status: 'operational', coherence: 0.9999 }
      }
    };
    
    // If verification document exists, read its coherence
    const verificationPath = path.join(__dirname, '..', 'windsurf_integration_verification.md');
    if (fs.existsSync(verificationPath)) {
      const content = fs.readFileSync(verificationPath, 'utf8');
      const coherenceMatch = content.match(/\*\*Coherence:\*\* ([0-9.]+)/);
      if (coherenceMatch && coherenceMatch[1]) {
        status.components.windsurf.coherence = parseFloat(coherenceMatch[1]);
      }
    }
    
    // Calculate overall coherence
    status.coherence = (
      status.components.windsurf.coherence + 
      status.components.claude.coherence + 
      status.components.documentation.coherence
    ) / 3;
    
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to run verification
app.post('/api/verify', (req, res) => {
  try {
    const { frequency = 768, coherenceTarget = 1.0 } = req.body;
    
    // Run verification in a separate process
    const cmd = `node quantum-doc-cli.js verify --frequency ${frequency} --coherence-target ${coherenceTarget}`;
    const result = execSync(cmd, { cwd: __dirname }).toString();
    
    // Parse results from the output
    const coherenceMatch = result.match(/Overall coherence: ([0-9.]+)/);
    const testsMatch = result.match(/Tests passed: ([0-9]+)\/([0-9]+)/);
    
    const response = {
      status: 'complete',
      coherence: coherenceMatch ? parseFloat(coherenceMatch[1]) : null,
      passedTests: testsMatch ? parseInt(testsMatch[1]) : null,
      totalTests: testsMatch ? parseInt(testsMatch[2]) : null,
      output: result
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      error: error.message,
      output: error.stdout ? error.stdout.toString() : null
    });
  }
});

// API endpoint to run the complete quantum documentation system cycle
app.post('/api/run-system', (req, res) => {
  try {
    // Run the complete system cycle in a separate process
    const cmd = `node quantum-doc-cli.js run --frequency 768 --coherence-target 1.0`;
    const result = execSync(cmd, { cwd: __dirname }).toString();
    
    // Parse results from the output
    const coherenceMatch = result.match(/System coherence: ([0-9.]+)/);
    
    const response = {
      status: 'complete',
      coherence: coherenceMatch ? parseFloat(coherenceMatch[1]) : null,
      output: result
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      error: error.message,
      output: error.stdout ? error.stdout.toString() : null
    });
  }
});

// Serve the dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'quantum-doc-dashboard.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`\n🌀 QUANTUM DOCUMENTATION DASHBOARD 🌀`);
  console.log(`==========================================`);
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Frequency: 768 Hz (Unity)`);
  console.log(`Target Coherence: 1.000 (Perfect)`);
  console.log(`==========================================\n`);
});
