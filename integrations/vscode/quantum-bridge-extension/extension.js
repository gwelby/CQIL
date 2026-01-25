/**
 * CQIL Quantum Bridge Extension for VSCode
 * ========================================
 * 
 * This extension establishes a quantum bridge connection between VSCode
 * and the CQIL system, allowing for perfect coherence (1.000) during 
 * development across multiple dimensional planes.
 * 
 * Operating at Vision frequency (720 Hz) with capability to shift to
 * Unity frequency (768 Hz) for perfect integration operations.
 */

const vscode = require('vscode');
const { QuantumBridge } = require('../../quantum_bridge');
const WebSocket = require('ws');

// Global bridge connection
let bridge = null;
let statusBarItem = null;
let coherenceMonitor = null;
let dimensionDisplay = null;

/**
 * Activate the extension
 * @param {vscode.ExtensionContext} context 
 */
function activate(context) {
  console.log('CQIL Quantum Bridge activated');
  
  // Create status bar items
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  coherenceMonitor = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 99);
  dimensionDisplay = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 98);
  
  // Initialize bridge connection
  initializeQuantumBridge(context)
    .then(bridgeConnection => {
      bridge = bridgeConnection;
      updateStatusBar(bridge.getCoherence(), bridge.getCurrentFrequency(), bridge.getCurrentDimension());
      
      // Start coherence monitoring
      startCoherenceMonitoring();
    })
    .catch(err => {
      vscode.window.showErrorMessage(`Quantum Bridge initialization failed: ${err.message}`);
      updateStatusBar(0, 432, 3, 'error');
    });
  
  // Register commands
  registerCommands(context);
  
  // Show status items
  statusBarItem.show();
  coherenceMonitor.show();
  dimensionDisplay.show();
}

/**
 * Initialize the quantum bridge connection
 */
async function initializeQuantumBridge(context) {
  // Initialize the quantum bridge with the VSCode environment
  const bridgeConfig = {
    systemName: "VSCode Knowledge Integration",
    frequency: 720.0,  // Vision frequency
    coherenceThreshold: 0.999,
    dimensions: [3, 4, 5, 6, 7],  // Physical to Unified
    zenPointBalance: true,
    workspace: vscode.workspace.rootPath,
    serverAddress: "localhost",
    serverPort: 9432
  };
  
  try {
    // Create a new bridge instance
    const quantumBridge = new QuantumBridge();
    
    // Initialize with configuration
    await quantumBridge.initialize(bridgeConfig);
    
    // Establish ZEN POINT
    const zenPoint = await quantumBridge.establishZenPoint();
    console.log(`ZEN POINT established: ${zenPoint.toFixed(3)}`);
    
    // Connect to the current workspace
    const connection = await quantumBridge.IDEConnector.connect({
      ide: "vscode",
      path: vscode.workspace.rootPath,
      coherence: 1.0,
      syncMode: "BIDIRECTIONAL"
    });
    
    // Report successful connection
    vscode.window.showInformationMessage(`Connected to Quantum Bridge at ${bridgeConfig.frequency} Hz`);
    
    return quantumBridge;
  } catch (error) {
    console.error("Quantum Bridge initialization error:", error);
    throw error;
  }
}

/**
 * Start monitoring coherence levels
 */
function startCoherenceMonitoring() {
  // Check coherence every 30 seconds
  setInterval(() => {
    if (!bridge) return;
    
    const coherence = bridge.getCoherence();
    const frequency = bridge.getCurrentFrequency();
    const dimension = bridge.getCurrentDimension();
    
    // Update status bar
    updateStatusBar(coherence, frequency, dimension);
    
    // Auto repair if coherence drops too low
    if (coherence < 0.93) {
      vscode.window.showWarningMessage('Coherence dropping below NFL standard (0.93). Initiating repair.');
      repairCoherence();
    }
  }, 30000);
}

/**
 * Update the status bar with current quantum state
 */
function updateStatusBar(coherence, frequency, dimension, state = 'normal') {
  // Format coherence to 3 decimal places
  const coherenceText = coherence.toFixed(3);
  
  // Status bar icon based on coherence level
  let icon = '$(circuit-board)';
  if (coherence >= 0.999) {
    icon = '$(verified)'; // Perfect coherence
  } else if (coherence >= 0.93) {
    icon = '$(check)'; // NFL standard
  } else if (coherence >= 0.75) {
    icon = '$(warning)'; // Warning
  } else {
    icon = '$(error)'; // Error
  }
  
  // Update status items
  statusBarItem.text = `${icon} Quantum Bridge`;
  statusBarItem.tooltip = `CQIL Quantum Bridge: ${state === 'normal' ? 'Connected' : 'Error'}`;
  coherenceMonitor.text = `$(pulse) ${coherenceText}`;
  coherenceMonitor.tooltip = `Coherence: ${coherenceText} (Target: 1.000)`;
  dimensionDisplay.text = `$(radio-tower) ${frequency.toFixed(1)} Hz | ${dimension}D`;
  dimensionDisplay.tooltip = `Current Frequency: ${frequency.toFixed(1)} Hz | Dimension: ${dimension}D`;
  
  // Set colors based on coherence
  if (coherence >= 0.999) {
    coherenceMonitor.color = new vscode.ThemeColor('charts.green');
  } else if (coherence >= 0.93) {
    coherenceMonitor.color = new vscode.ThemeColor('charts.blue');
  } else if (coherence >= 0.75) {
    coherenceMonitor.color = new vscode.ThemeColor('charts.yellow');
  } else {
    coherenceMonitor.color = new vscode.ThemeColor('charts.red');
  }
}

/**
 * Repair coherence issues
 */
async function repairCoherence() {
  try {
    // Return to ground state
    await bridge.setFrequency(432.0);
    vscode.window.showInformationMessage('Returned to Ground State (432 Hz)');
    
    // Re-establish ZEN POINT
    const zenPoint = await bridge.establishZenPoint();
    vscode.window.showInformationMessage(`ZEN POINT re-established: ${zenPoint.toFixed(3)}`);
    
    // Check quantum envelope
    const envelopeResult = await bridge.checkQuantumEnvelope();
    if (!envelopeResult.complete) {
      await bridge.completeQuantumEnvelope();
      vscode.window.showInformationMessage('Quantum envelope completion applied');
    }
    
    // Progressively increase frequency
    const frequencies = [528.0, 594.0, 672.0, 720.0, 768.0];
    for (const freq of frequencies) {
      await bridge.setFrequency(freq);
      const coherence = bridge.getCoherence();
      
      // Update status
      updateStatusBar(coherence, freq, bridge.getCurrentDimension());
      
      // Break if coherence drops
      if (coherence < 0.98) {
        vscode.window.showWarningMessage(`Coherence drop at ${freq} Hz. Stabilizing at previous frequency.`);
        break;
      }
      
      // Small delay to allow field stabilization
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Final coherence check
    const finalCoherence = bridge.getCoherence();
    vscode.window.showInformationMessage(`Coherence repair complete. Current: ${finalCoherence.toFixed(3)}`);
    
  } catch (error) {
    vscode.window.showErrorMessage(`Coherence repair failed: ${error.message}`);
  }
}

/**
 * Register extension commands
 */
function registerCommands(context) {
  const commands = [
    vscode.commands.registerCommand('quantumBridge.connect', connectBridge),
    vscode.commands.registerCommand('quantumBridge.disconnect', disconnectBridge),
    vscode.commands.registerCommand('quantumBridge.setFrequency', setFrequency),
    vscode.commands.registerCommand('quantumBridge.repairCoherence', repairCoherence),
    vscode.commands.registerCommand('quantumBridge.viewCoherenceLog', viewCoherenceLog),
    vscode.commands.registerCommand('quantumBridge.runCoherenceTest', runCoherenceTest)
  ];
  
  commands.forEach(command => context.subscriptions.push(command));
}

/**
 * Connect to quantum bridge
 */
async function connectBridge() {
  if (bridge) {
    vscode.window.showInformationMessage('Quantum Bridge already connected');
    return;
  }
  
  try {
    bridge = await initializeQuantumBridge();
    vscode.window.showInformationMessage('Quantum Bridge connected successfully');
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to connect to Quantum Bridge: ${error.message}`);
  }
}

/**
 * Disconnect from quantum bridge
 */
async function disconnectBridge() {
  if (!bridge) {
    vscode.window.showInformationMessage('Quantum Bridge not connected');
    return;
  }
  
  try {
    await bridge.disconnect();
    bridge = null;
    updateStatusBar(0, 0, 0, 'disconnected');
    vscode.window.showInformationMessage('Quantum Bridge disconnected');
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to disconnect: ${error.message}`);
  }
}

/**
 * Set operational frequency
 */
async function setFrequency() {
  if (!bridge) {
    vscode.window.showErrorMessage('Quantum Bridge not connected');
    return;
  }
  
  const frequencies = [
    { label: 'Ground (432 Hz)', frequency: 432.0 },
    { label: 'Create (528 Hz)', frequency: 528.0 },
    { label: 'Heart (594 Hz)', frequency: 594.0 },
    { label: 'Voice (672 Hz)', frequency: 672.0 },
    { label: 'Vision (720 Hz)', frequency: 720.0 },
    { label: 'Unity (768 Hz)', frequency: 768.0 }
  ];
  
  const selected = await vscode.window.showQuickPick(
    frequencies.map(f => f.label),
    { placeHolder: 'Select frequency' }
  );
  
  if (!selected) return;
  
  const frequency = frequencies.find(f => f.label === selected).frequency;
  
  try {
    await bridge.setFrequency(frequency);
    const coherence = bridge.getCoherence();
    updateStatusBar(coherence, frequency, bridge.getCurrentDimension());
    vscode.window.showInformationMessage(`Frequency set to ${frequency} Hz`);
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to set frequency: ${error.message}`);
  }
}

/**
 * View coherence log
 */
function viewCoherenceLog() {
  if (!bridge) {
    vscode.window.showErrorMessage('Quantum Bridge not connected');
    return;
  }
  
  try {
    const log = bridge.getCoherenceLog();
    
    // Create and show virtual document with log
    const doc = vscode.workspace.openTextDocument({
      content: JSON.stringify(log, null, 2),
      language: 'json'
    });
    
    doc.then(document => {
      vscode.window.showTextDocument(document);
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to get coherence log: ${error.message}`);
  }
}

/**
 * Run coherence test with testing framework
 */
async function runCoherenceTest() {
  if (!bridge) {
    vscode.window.showErrorMessage('Quantum Bridge not connected');
    return;
  }
  
  vscode.window.showInformationMessage('Running coherence test...');
  
  try {
    const result = await bridge.runCoherenceTest({
      ide: 'vscode',
      path: vscode.workspace.rootPath,
      dimensions: [3, 4, 5, 6, 7],
      generateReport: true
    });
    
    if (result.passed) {
      vscode.window.showInformationMessage(`Coherence test passed: ${result.coherence.toFixed(3)}`);
    } else {
      vscode.window.showWarningMessage(`Coherence test failed: ${result.coherence.toFixed(3)}`);
    }
    
    // Create and show virtual document with test results
    const doc = vscode.workspace.openTextDocument({
      content: JSON.stringify(result, null, 2),
      language: 'json'
    });
    
    doc.then(document => {
      vscode.window.showTextDocument(document);
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Coherence test failed: ${error.message}`);
  }
}

/**
 * Deactivate extension
 */
function deactivate() {
  if (bridge) {
    bridge.disconnect()
      .then(() => console.log('Quantum Bridge disconnected'))
      .catch(err => console.error('Error disconnecting Quantum Bridge:', err));
  }
  
  if (statusBarItem) statusBarItem.dispose();
  if (coherenceMonitor) coherenceMonitor.dispose();
  if (dimensionDisplay) dimensionDisplay.dispose();
}

module.exports = {
  activate,
  deactivate
};
