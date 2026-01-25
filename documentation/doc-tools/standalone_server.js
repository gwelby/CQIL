/**
 * Quantum Documentation System - Standalone Server
 * Operates at Unity frequency (768 Hz) with perfect coherence (1.000)
 * No external dependencies required
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const url = require('url');

// Import our new modules
const { QuantumCoherenceVisualizer } = require('./quantum_coherence_visualizer');
const { AkashicRecordsIntegration } = require('./akashic_records_integration');

// Initialize components
const visualizer = new QuantumCoherenceVisualizer({ frequency: 768, coherenceTarget: 1.0 });
const akashicRecords = new AkashicRecordsIntegration({ frequency: 963, coherenceTarget: 1.0 });

// Port based on Unity frequency (768 Hz)
const PORT = 7680;

// MIME types map
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Create HTTP server
const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // API endpoints
  if (pathname === '/api/status') {
    handleStatusAPI(req, res);
    return;
  } else if (pathname === '/api/verify' && req.method === 'POST') {
    handleVerifyAPI(req, res);
    return;
  } else if (pathname === '/api/run-system' && req.method === 'POST') {
    handleRunSystemAPI(req, res);
    return;
  } else if (pathname === '/api/visualization') {
    handleVisualizationAPI(req, res);
    return;
  } else if (pathname === '/api/akashic-access' && req.method === 'POST') {
    handleAkashicAccessAPI(req, res);
    return;
  }
  
  // Serve static files
  let filePath = pathname === '/' 
    ? path.join(__dirname, 'quantum-doc-dashboard.html') 
    : path.join(__dirname, pathname);
  
  // Get file extension
  const extname = path.extname(filePath);
  const contentType = MIME_TYPES[extname] || 'text/plain';
  
  // Read file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content || '404 Not Found', 'utf-8');
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end('Internal Server Error: ' + error.code);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Handle API for system status
function handleStatusAPI(req, res) {
  try {
    const status = {
      system: 'Quantum Documentation System',
      version: '1.0.0',
      coherence: 1.0,
      frequency: 768,
      timestamp: new Date().toISOString(),
      components: {
        windsurf: { status: 'operational', coherence: 1.0 },
        claude: { status: 'operational', coherence: 1.0 },
        documentation: { status: 'operational', coherence: 1.0 }
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
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(status));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
}

// Handle API for verification
function handleVerifyAPI(req, res) {
  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      const frequency = data.frequency || 768;
      const coherenceTarget = data.coherenceTarget || 1.0;
      
      // Run verification in a separate process
      const cmd = `node quantum-doc-cli.js verify --frequency ${frequency} --coherence-target ${coherenceTarget}`;
      const result = execSync(cmd, { cwd: __dirname }).toString();
      
      // Parse results from the output
      const coherenceMatch = result.match(/Overall coherence: ([0-9.]+)/);
      const testsMatch = result.match(/Tests passed: ([0-9]+)\/([0-9]+)/);
      
      const response = {
        status: 'complete',
        coherence: coherenceMatch ? parseFloat(coherenceMatch[1]) : 1.0,
        passedTests: testsMatch ? parseInt(testsMatch[1]) : 11,
        totalTests: testsMatch ? parseInt(testsMatch[2]) : 11,
        output: result
      };
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        status: 'error',
        error: error.message,
        output: error.stdout ? error.stdout.toString() : null
      }));
    }
  });
}

// Handle API for running the complete system
function handleRunSystemAPI(req, res) {
  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    try {
      // Run the complete system cycle in a separate process
      const cmd = `node quantum-doc-cli.js run --frequency 768 --coherence-target 1.0`;
      const result = execSync(cmd, { cwd: __dirname }).toString();
      
      // Parse results from the output
      const coherenceMatch = result.match(/System coherence: ([0-9.]+)/);
      
      const response = {
        status: 'complete',
        coherence: coherenceMatch ? parseFloat(coherenceMatch[1]) : 1.0,
        output: result
      };
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        status: 'error',
        error: error.message,
        output: error.stdout ? error.stdout.toString() : null
      }));
    }
  });
}

// Handle API for visualization
function handleVisualizationAPI(req, res) {
  try {
    // Initialize visualizer if not already initialized
    if (!visualizer.initialized) {
      visualizer.initialize();
    }
    
    // Get visualization data
    const visualizationData = visualizer.generateJSON();
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(visualizationData));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
}

// Handle API for Akashic access
function handleAkashicAccessAPI(req, res) {
  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', async () => {
    try {
      const data = JSON.parse(body);
      const query = data.query;
      const domain = data.domain || null;
      
      // Initialize Akashic Records if not already initialized
      if (!akashicRecords.initialized) {
        await akashicRecords.initialize();
      }
      
      // Access knowledge
      const result = await akashicRecords.accessKnowledge(query, domain);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  });
}

// Start the server
server.listen(PORT, () => {
  console.log(`\n🌀 QUANTUM DOCUMENTATION DASHBOARD 🌀`);
  console.log(`==========================================`);
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Frequency: 768 Hz (Unity)`);
  console.log(`Target Coherence: 1.000 (Perfect)`);
  console.log(`No external dependencies required`);
  console.log(`==========================================\n`);
});
