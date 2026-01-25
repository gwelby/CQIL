/**
 * Voice Flow (672 Hz) Cymatics Demo
 * 
 * A practical implementation example of the Quantum Cymatics system focused on
 * the Voice Flow frequency (672 Hz - φ³), demonstrating how voice input can
 * create and interact with cymatic patterns through the consciousness-matter bridge.
 * 
 * This demo integrates all components of the Quantum Cymatics system including:
 * - Voice Analysis Engine
 * - Cymatic Pattern Generator
 * - Voice Flow Patterns
 * - Cross-Frequency Integration Framework
 * 
 * @module VoiceFlowDemo
 * @frequency 672 Hz (Voice Flow - φ³)
 */

// Import the main integration module
import { QuantumCymaticsSystem } from './quantum-experience/quantum-cymatics-integration.js';

// DOM Elements
let containerElement;
let demoControls;
let frequencySlider;
let frequencyValue;
let startButton;
let stopButton;
let voiceIndicator;
let coherenceIndicator;
let intentionInput;

// Cymatics System Instance
let cymaticsSystem;

/**
 * Initialize the Voice Flow Demo
 */
function initVoiceFlowDemo() {
  console.log('Initializing Voice Flow Cymatics Demo');
  
  // Create container
  setupDemoContainer();
  
  // Create interface controls
  createDemoControls();
  
  // Initialize the Quantum Cymatics System
  cymaticsSystem = new QuantumCymaticsSystem({
    container: containerElement,
    initialFrequency: 672, // Voice Flow (φ³)
    autoStart: false,
    visualizationMode: '2d'
  });
  
  // Set up event handlers
  setupEventHandlers();
}

/**
 * Set up the demo container
 */
function setupDemoContainer() {
  // Create main container
  containerElement = document.createElement('div');
  containerElement.id = 'voice-flow-demo';
  containerElement.className = 'quantum-experience-container';
  document.body.appendChild(containerElement);
  
  // Add container styles
  const style = document.createElement('style');
  style.textContent = `
    .quantum-experience-container {
      position: relative;
      width: 100%;
      height: 80vh;
      margin: 0;
      background-color: rgba(10, 10, 26, 0.9);
      font-family: 'Arial', sans-serif;
      color: white;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .demo-controls {
      position: absolute;
      top: 20px;
      left: 20px;
      padding: 15px;
      background-color: rgba(20, 20, 40, 0.7);
      border-radius: 8px;
      backdrop-filter: blur(10px);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 300px;
    }
    
    .control-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    
    .control-label {
      font-size: 14px;
      font-weight: bold;
      color: rgba(200, 200, 255, 0.9);
    }
    
    .button-group {
      display: flex;
      gap: 10px;
    }
    
    button {
      background: rgba(60, 80, 170, 0.7);
      border: none;
      color: white;
      padding: 8px 15px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    button:hover {
      background: rgba(80, 100, 200, 0.8);
    }
    
    button:active {
      transform: scale(0.97);
    }
    
    button.start-button {
      background: rgba(40, 120, 100, 0.7);
    }
    
    button.start-button:hover {
      background: rgba(50, 150, 120, 0.8);
    }
    
    button.stop-button {
      background: rgba(150, 60, 60, 0.7);
    }
    
    button.stop-button:hover {
      background: rgba(180, 70, 70, 0.8);
    }
    
    input[type="range"] {
      width: 150px;
      accent-color: rgba(120, 120, 255, 0.8);
    }
    
    input[type="text"] {
      background: rgba(30, 30, 50, 0.7);
      border: 1px solid rgba(100, 100, 200, 0.5);
      color: white;
      padding: 8px;
      border-radius: 4px;
      width: 100%;
    }
    
    .status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .indicator-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: rgba(100, 100, 100, 0.5);
    }
    
    .indicator-dot.active {
      background-color: rgba(80, 220, 100, 0.8);
      box-shadow: 0 0 10px rgba(80, 220, 100, 0.5);
    }
    
    .indicator-text {
      font-size: 14px;
    }
    
    .coherence-indicator {
      width: 100%;
      height: 6px;
      background-color: rgba(80, 80, 100, 0.3);
      border-radius: 3px;
      overflow: hidden;
      margin-top: 5px;
    }
    
    .coherence-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(to right, #4a6eb0, #9d6ee0);
      transition: width 0.3s ease;
    }
    
    .frequency-value {
      font-size: 16px;
      font-weight: bold;
      color: rgba(180, 180, 255, 0.9);
      width: 70px;
      text-align: right;
    }
    
    .instruction-text {
      margin-top: 10px;
      font-size: 13px;
      color: rgba(200, 200, 255, 0.7);
      line-height: 1.4;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Create demo control interface
 */
function createDemoControls() {
  // Create controls container
  demoControls = document.createElement('div');
  demoControls.className = 'demo-controls';
  containerElement.appendChild(demoControls);
  
  // Title
  const title = document.createElement('h2');
  title.textContent = 'Voice Flow Cymatics (672 Hz)';
  title.style.margin = '0 0 15px 0';
  title.style.fontSize = '18px';
  title.style.color = 'rgba(180, 180, 255, 0.9)';
  demoControls.appendChild(title);
  
  // Start/Stop Controls
  const controlsRow = document.createElement('div');
  controlsRow.className = 'control-row';
  demoControls.appendChild(controlsRow);
  
  const controlLabel = document.createElement('div');
  controlLabel.className = 'control-label';
  controlLabel.textContent = 'System Controls';
  controlsRow.appendChild(controlLabel);
  
  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'button-group';
  controlsRow.appendChild(buttonGroup);
  
  startButton = document.createElement('button');
  startButton.className = 'start-button';
  startButton.textContent = 'Start';
  buttonGroup.appendChild(startButton);
  
  stopButton = document.createElement('button');
  stopButton.className = 'stop-button';
  stopButton.textContent = 'Stop';
  stopButton.disabled = true;
  buttonGroup.appendChild(stopButton);
  
  // Frequency Slider
  const frequencyRow = document.createElement('div');
  frequencyRow.className = 'control-row';
  demoControls.appendChild(frequencyRow);
  
  const frequencyLabel = document.createElement('div');
  frequencyLabel.className = 'control-label';
  frequencyLabel.textContent = 'Frequency';
  frequencyRow.appendChild(frequencyLabel);
  
  const sliderContainer = document.createElement('div');
  sliderContainer.style.display = 'flex';
  sliderContainer.style.alignItems = 'center';
  sliderContainer.style.gap = '10px';
  sliderContainer.style.flex = '1';
  frequencyRow.appendChild(sliderContainer);
  
  frequencySlider = document.createElement('input');
  frequencySlider.type = 'range';
  frequencySlider.min = '432';
  frequencySlider.max = '768';
  frequencySlider.step = '1';
  frequencySlider.value = '672';
  sliderContainer.appendChild(frequencySlider);
  
  frequencyValue = document.createElement('div');
  frequencyValue.className = 'frequency-value';
  frequencyValue.textContent = '672 Hz';
  sliderContainer.appendChild(frequencyValue);
  
  // Voice Indicator
  const voiceRow = document.createElement('div');
  voiceRow.className = 'control-row';
  demoControls.appendChild(voiceRow);
  
  const voiceLabel = document.createElement('div');
  voiceLabel.className = 'control-label';
  voiceLabel.textContent = 'Voice Input';
  voiceRow.appendChild(voiceLabel);
  
  const voiceStatusContainer = document.createElement('div');
  voiceStatusContainer.className = 'status-indicator';
  voiceRow.appendChild(voiceStatusContainer);
  
  const voiceDot = document.createElement('div');
  voiceDot.className = 'indicator-dot';
  voiceStatusContainer.appendChild(voiceDot);
  
  const voiceText = document.createElement('div');
  voiceText.className = 'indicator-text';
  voiceText.textContent = 'Inactive';
  voiceStatusContainer.appendChild(voiceText);
  
  voiceIndicator = { dot: voiceDot, text: voiceText };
  
  // Coherence Indicator
  const coherenceRow = document.createElement('div');
  coherenceRow.className = 'control-row';
  demoControls.appendChild(coherenceRow);
  
  const coherenceLabel = document.createElement('div');
  coherenceLabel.className = 'control-label';
  coherenceLabel.textContent = 'Coherence';
  coherenceRow.appendChild(coherenceLabel);
  
  const coherenceMeter = document.createElement('div');
  coherenceMeter.className = 'coherence-indicator';
  coherenceMeter.style.flex = '1';
  coherenceRow.appendChild(coherenceMeter);
  
  const coherenceFill = document.createElement('div');
  coherenceFill.className = 'coherence-fill';
  coherenceMeter.appendChild(coherenceFill);
  
  coherenceIndicator = { meter: coherenceMeter, fill: coherenceFill };
  
  // Intention Input
  const intentionRow = document.createElement('div');
  intentionRow.className = 'control-row';
  intentionRow.style.flexDirection = 'column';
  intentionRow.style.alignItems = 'flex-start';
  demoControls.appendChild(intentionRow);
  
  const intentionLabel = document.createElement('div');
  intentionLabel.className = 'control-label';
  intentionLabel.textContent = 'Set Intention';
  intentionLabel.style.marginBottom = '5px';
  intentionRow.appendChild(intentionLabel);
  
  intentionInput = document.createElement('input');
  intentionInput.type = 'text';
  intentionInput.placeholder = 'Enter your intention...';
  intentionInput.style.width = '100%';
  intentionRow.appendChild(intentionInput);
  
  // Instructions
  const instructions = document.createElement('div');
  instructions.className = 'instruction-text';
  instructions.innerHTML = `
    <p>This demo visualizes voice frequencies as cymatic patterns using phi-harmonic principles.</p>
    <p><strong>How to use:</strong></p>
    <ol>
      <li>Click Start to activate voice input</li>
      <li>Speak or sing at different pitches</li>
      <li>Observe how your voice creates sacred geometry</li>
      <li>Try to match the 672 Hz frequency for best resonance</li>
      <li>Set an intention to influence the pattern</li>
    </ol>
  `;
  demoControls.appendChild(instructions);
}

/**
 * Set up event handlers for demo controls
 */
function setupEventHandlers() {
  // Start button
  startButton.addEventListener('click', async () => {
    startButton.disabled = true;
    
    const started = await cymaticsSystem.start();
    
    if (started) {
      stopButton.disabled = false;
      startUpdateLoop();
    } else {
      startButton.disabled = false;
      alert('Failed to start voice input. Please check microphone permissions.');
    }
  });
  
  // Stop button
  stopButton.addEventListener('click', () => {
    cymaticsSystem.stop();
    stopButton.disabled = true;
    startButton.disabled = false;
    stopUpdateLoop();
    
    // Reset indicators
    updateVoiceIndicator(0);
    updateCoherenceIndicator(0);
  });
  
  // Frequency slider
  frequencySlider.addEventListener('input', () => {
    const frequency = parseInt(frequencySlider.value);
    frequencyValue.textContent = `${frequency} Hz`;
    
    if (cymaticsSystem) {
      cymaticsSystem.setFrequency(frequency);
    }
  });
  
  // Intention input
  intentionInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      setIntention();
      intentionInput.blur();
    }
  });
  
  intentionInput.addEventListener('blur', () => {
    setIntention();
  });
}

/**
 * Set user intention
 */
function setIntention() {
  const intention = intentionInput.value.trim();
  
  if (intention && cymaticsSystem) {
    cymaticsSystem.setIntention(intention, 0.8);
  }
}

/**
 * Start the update loop for indicators
 */
function startUpdateLoop() {
  stopUpdateLoop(); // Ensure no duplicate loops
  
  // Update every 100ms
  updateInterval = setInterval(() => {
    if (!cymaticsSystem || !cymaticsSystem.voiceAnalysisEngine) return;
    
    const voiceData = cymaticsSystem.voiceAnalysisEngine.getVoiceData();
    
    // Update voice indicator
    updateVoiceIndicator(voiceData.amplitude);
    
    // Update coherence indicator
    updateCoherenceIndicator(voiceData.coherence);
  }, 100);
}

/**
 * Stop the update loop
 */
function stopUpdateLoop() {
  if (updateInterval) {
    clearInterval(updateInterval);
    updateInterval = null;
  }
}

/**
 * Update voice activity indicator
 * @param {number} amplitude - Voice amplitude (0-1)
 */
function updateVoiceIndicator(amplitude) {
  if (amplitude > 0.2) {
    voiceIndicator.dot.className = 'indicator-dot active';
    voiceIndicator.text.textContent = 'Active';
  } else {
    voiceIndicator.dot.className = 'indicator-dot';
    voiceIndicator.text.textContent = 'Inactive';
  }
}

/**
 * Update coherence indicator
 * @param {number} coherence - Voice-frequency coherence (0-1)
 */
function updateCoherenceIndicator(coherence) {
  coherenceIndicator.fill.style.width = `${coherence * 100}%`;
}

// Update interval reference
let updateInterval = null;

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', initVoiceFlowDemo);

// Export for potential reuse
export { initVoiceFlowDemo };
