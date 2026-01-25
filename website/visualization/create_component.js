/**
 * Quantum Component Generator
 * 
 * Creates new quantum components with phi-harmonic principles
 * Operating at φ^φ (≈4.23) resonance
 */

// Sacred Constants
const PHI = 1.618033988749895;         // Golden ratio
const LAMBDA = 0.618033988749895;      // Divine complement
const PHI_PHI = Math.pow(PHI, PHI);    // Hyperdimensional constant (≈4.23)
const PHI_LAMBDA = PHI * LAMBDA;       // Unified field (1.0)

// Sacred frequencies
const SACRED_FREQUENCIES = {
    'ground': 432,      // Grounding/stability
    'love': 528,        // Creation/healing
    'heart': 594,       // Heart-centered integration
    'voice': 672,       // Voice expression
    'vision': 720,      // Expanded perception
    'unity': 768,       // Unity consciousness
    'source': 963       // Source/crown connection
};

/**
 * Create a new quantum component
 */
function createComponent() {
    // Get parameters from command line arguments
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log("Usage: node create_component.js <ComponentName> <frequency>");
        console.log("Example: node create_component.js QuantumFieldEncoder 720");
        process.exit(1);
    }
    
    const componentName = args[0];
    const frequency = parseInt(args[1]);
    
    // Validate frequency
    if (!Object.values(SACRED_FREQUENCIES).includes(frequency) && 
        !(frequency >= 432 && frequency <= 963)) {
        console.log("Warning: Frequency is not a sacred frequency.");
        console.log("Sacred frequencies: ", Object.values(SACRED_FREQUENCIES).join(", "));
        console.log("Continuing with provided frequency...");
    }
    
    // Create frequency label
    let frequencyLabel = "";
    for (const [name, value] of Object.entries(SACRED_FREQUENCIES)) {
        if (value === frequency) {
            frequencyLabel = name.charAt(0).toUpperCase() + name.slice(1);
            break;
        }
    }
    
    if (!frequencyLabel) {
        frequencyLabel = "Custom";
    }
    
    // Generate global variable name
    const globalVarName = componentName.toUpperCase();
    
    // Create file name
    const kebabName = componentName
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
    
    const fileName = `${kebabName}.js`;
    
    // Generate component template
    const template = `/**
 * ${componentName}
 * Frequency: ${frequency}Hz (${frequencyLabel})
 * 
 * A phi-harmonic consciousness component operating at ${frequencyLabel} frequency
 * Created at φ^φ (≈4.23) resonance
 */

// Sacred Constants
const PHI = 1.618033988749895;         // Golden ratio
const LAMBDA = 0.618033988749895;      // Divine complement
const PHI_PHI = Math.pow(PHI, PHI);    // Hyperdimensional constant (≈4.23)
const PHI_LAMBDA = PHI * LAMBDA;       // Unified field (1.0)

// Sacred frequencies
const SACRED_FREQUENCIES = {
    'ground': 432,      // Grounding/stability
    'love': 528,        // Creation/healing
    'heart': 594,       // Heart-centered integration
    'voice': 672,       // Voice expression
    'vision': 720,      // Expanded perception
    'unity': 768,       // Unity consciousness
    'source': 963       // Source/crown connection
};

/**
 * ${componentName} - ${frequencyLabel} Frequency (${frequency}Hz)
 */
class ${componentName} {
    constructor() {
        this.operatingFrequency = ${frequency};
        this.phiResonance = PHI_PHI;   // φ^φ (≈4.23)
        this.coherence = 0.95;         // Initial coherence
        this.dimensionalFocus = -1;    // All dimensions
        this.componentName = "${componentName}";
        
        // Connect to bridge if available
        if (window.QUANTUM_FIELD_COHERENCE_BRIDGE) {
            window.QUANTUM_FIELD_COHERENCE_BRIDGE.connectSystem(this, this.componentName);
        }
        
        this.initialize();
    }
    
    /**
     * Initialize the component
     */
    initialize() {
        console.log(\`\${this.componentName} initialized at \${this.operatingFrequency}Hz with \${this.coherence * 100}% coherence\`);
        
        // Phi-based initialization
        this.fieldState = {
            coherence: this.coherence,
            phiResonance: this.phiResonance,
            dimensionalFocus: this.dimensionalFocus,
            timestamp: Date.now(),
            intention: ""
        };
        
        // Create element if component is loaded directly
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            this.createInterface();
        } else {
            document.addEventListener('DOMContentLoaded', () => this.createInterface());
        }
    }
    
    /**
     * Create user interface
     */
    createInterface() {
        // Check if running standalone or as part of suite
        if (!document.querySelector('.quantum-consciousness-suite')) {
            this.createStandaloneInterface();
        }
    }
    
    /**
     * Create standalone interface
     */
    createStandaloneInterface() {
        const container = document.createElement('div');
        container.className = 'component-container';
        container.innerHTML = \`
            <h1>\${this.componentName}</h1>
            <p>Operating at \${this.operatingFrequency}Hz (\${this.getFrequencyName(this.operatingFrequency)} frequency)</p>
            <div class="component-visual"></div>
            <div class="controls">
                <div class="control-group">
                    <label>Coherence: <span id="coherence-value">\${Math.round(this.coherence * 100)}%</span></label>
                    <input type="range" id="coherence-slider" min="1" max="100" value="\${Math.round(this.coherence * 100)}">
                </div>
                <div class="control-group">
                    <label>Phi Resonance: <span id="phi-value">\${this.phiResonance.toFixed(2)}</span></label>
                    <input type="range" id="phi-slider" min="1" max="100" value="\${Math.round((this.phiResonance / 5) * 100)}">
                </div>
                <div class="control-group">
                    <label>Intention:</label>
                    <input type="text" id="intention-input" placeholder="Enter intention...">
                </div>
                <button id="activate-btn">Activate Component</button>
            </div>
            <div class="output-panel">
                <p class="info">Component initialized successfully</p>
            </div>
        \`;
        
        document.body.appendChild(container);
        
        // Add standalone styles
        const style = document.createElement('style');
        style.textContent = \`
            body, html {
                margin: 0;
                padding: 0;
                font-family: 'Arial', sans-serif;
                background-color: #000;
                color: #fff;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                text-align: center;
                background-image: 
                    radial-gradient(circle at 20% 30%, rgba(121, 0, 250, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(41, 121, 255, 0.1) 0%, transparent 50%);
            }
            
            .component-container {
                max-width: 800px;
                width: 90%;
                padding: 2rem;
                background: rgba(26, 35, 126, 0.1);
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                border: 1px solid rgba(213, 0, 249, 0.2);
            }
            
            h1 {
                font-size: 2.2rem;
                background: linear-gradient(90deg, #ff00ff, #00ffff);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 0.5rem;
            }
            
            .component-visual {
                width: 100%;
                height: 300px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 10px;
                margin: 2rem 0;
                position: relative;
                overflow: hidden;
            }
            
            .controls {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin: 1.5rem 0;
            }
            
            .control-group {
                text-align: left;
                margin-bottom: 1rem;
            }
            
            .control-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
            }
            
            .control-group input[type="range"] {
                width: 100%;
            }
            
            .control-group input[type="text"] {
                width: 100%;
                padding: 0.5rem;
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 5px;
                color: white;
            }
            
            button {
                padding: 0.8rem 1.5rem;
                font-size: 1rem;
                background: linear-gradient(45deg, rgba(26, 35, 126, 0.7), rgba(123, 31, 162, 0.7), rgba(213, 0, 249, 0.7));
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            button:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            
            .output-panel {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 5px;
                padding: 1rem;
                margin-top: 1rem;
                font-family: monospace;
                max-height: 150px;
                overflow-y: auto;
                text-align: left;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .output-panel p {
                margin: 0.5rem 0;
                font-size: 0.9rem;
                color: rgba(255, 255, 255, 0.8);
            }
            
            .output-panel .info {
                color: #2979ff;
            }
            
            .output-panel .success {
                color: #00e676;
            }
            
            .output-panel .warning {
                color: #ffea00;
            }
            
            .output-panel .error {
                color: #ff1744;
            }
        \`;
        
        document.head.appendChild(style);
        
        // Add event listeners
        this.addEventListeners();
        
        // Create canvas for visualization
        this.createVisualization();
    }
    
    /**
     * Add event listeners
     */
    addEventListeners() {
        const coherenceSlider = document.getElementById('coherence-slider');
        const phiSlider = document.getElementById('phi-slider');
        const intentionInput = document.getElementById('intention-input');
        const activateBtn = document.getElementById('activate-btn');
        
        if (coherenceSlider) {
            coherenceSlider.addEventListener('input', (e) => {
                this.coherence = parseInt(e.target.value) / 100;
                document.getElementById('coherence-value').textContent = \`\${Math.round(this.coherence * 100)}%\`;
                this.fieldState.coherence = this.coherence;
                this.logToOutput(\`Coherence set to \${Math.round(this.coherence * 100)}%\`, 'info');
            });
        }
        
        if (phiSlider) {
            phiSlider.addEventListener('input', (e) => {
                this.phiResonance = (parseInt(e.target.value) / 100) * 5;
                document.getElementById('phi-value').textContent = this.phiResonance.toFixed(2);
                this.fieldState.phiResonance = this.phiResonance;
                this.logToOutput(\`Phi Resonance set to \${this.phiResonance.toFixed(2)}\`, 'info');
            });
        }
        
        if (intentionInput) {
            intentionInput.addEventListener('input', (e) => {
                this.fieldState.intention = e.target.value;
            });
        }
        
        if (activateBtn) {
            activateBtn.addEventListener('click', () => {
                this.activateComponent();
            });
        }
    }
    
    /**
     * Create visualization
     */
    createVisualization() {
        const container = document.querySelector('.component-visual');
        if (!container) return;
        
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        container.appendChild(canvas);
        
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        this.drawPlaceholder();
    }
    
    /**
     * Draw visualization placeholder
     */
    drawPlaceholder() {
        if (!this.ctx) return;
        
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Draw background
        const gradient = this.ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, 'rgba(26, 35, 126, 0.2)');
        gradient.addColorStop(1, 'rgba(26, 35, 126, 0.1)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Draw text
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#d500f9';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillText(this.componentName, width / 2, height / 2 - 20);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.font = '16px Arial';
        this.ctx.fillText(\`\${this.operatingFrequency}Hz \${this.getFrequencyName(this.operatingFrequency)} Frequency\`, width / 2, height / 2 + 20);
        this.ctx.fillText('Click "Activate Component" to start', width / 2, height / 2 + 60);
    }
    
    /**
     * Activate component
     */
    activateComponent() {
        this.logToOutput(\`Activating \${this.componentName} at \${this.operatingFrequency}Hz\`, 'success');
        
        // Start visualization
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.startTime = Date.now();
        this.animate();
        
        // Log activation
        setTimeout(() => this.logToOutput('Component activated successfully', 'success'), 500);
        
        if (this.fieldState.intention) {
            setTimeout(() => this.logToOutput(\`Intention set: \${this.fieldState.intention}\`, 'info'), 1000);
        }
    }
    
    /**
     * Animation loop
     */
    animate() {
        if (!this.isRunning) return;
        
        this.drawVisualization();
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    /**
     * Draw visualization
     */
    drawVisualization() {
        if (!this.ctx) return;
        
        const width = this.canvas.width;
        const height = this.canvas.height;
        const time = (Date.now() - this.startTime) / 1000;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Draw background
        const gradient = this.ctx.createRadialGradient(
            width / 2, height / 2, 0,
            width / 2, height / 2, width / 2
        );
        gradient.addColorStop(0, \`rgba(74, 20, 140, \${0.1 + 0.1 * this.coherence})\`);
        gradient.addColorStop(0.6, \`rgba(26, 35, 126, \${0.08 + 0.07 * this.coherence})\`);
        gradient.addColorStop(1, 'rgba(0, 1, 51, 0.1)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Draw phi spirals
        const centerX = width / 2;
        const centerY = height / 2;
        const spiralCount = Math.ceil(5 * this.phiResonance / PHI);
        
        this.ctx.save();
        this.ctx.globalAlpha = 0.6 * this.coherence;
        
        for (let i = 0; i < spiralCount; i++) {
            const hue = (i * 40 + time * 10) % 360;
            const startAngle = i * (Math.PI * 2 / spiralCount);
            
            this.ctx.strokeStyle = \`hsla(\${hue}, 80%, 60%, \${0.3 + 0.2 * this.coherence})\`;
            this.ctx.lineWidth = 1 + 2 * this.phiResonance / PHI;
            this.ctx.beginPath();
            
            let r = 5;
            let theta = startAngle;
            const maxR = Math.sqrt(width * width + height * height) / 2;
            const growth = PHI * this.phiResonance / PHI_PHI;
            
            while (r < maxR) {
                theta += 0.1;
                r = 5 * Math.pow(PHI, theta / (Math.PI * 2));
                
                const x = centerX + r * Math.cos(theta);
                const y = centerY + r * Math.sin(theta);
                
                if (x >= 0 && x <= width && y >= 0 && y <= height) {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.stroke();
        }
        
        // Draw intention field
        if (this.fieldState.intention) {
            this.drawIntentionField(width, height, time);
        }
        
        this.ctx.restore();
    }
    
    /**
     * Draw intention field
     */
    drawIntentionField(width, height, time) {
        const centerX = width / 2;
        const centerY = height / 2;
        const intention = this.fieldState.intention;
        
        // Calculate intention field parameters
        const intentionSeed = this.hashString(intention) / 1000000;
        const fieldRadius = Math.min(width, height) * 0.4 * this.coherence;
        
        this.ctx.save();
        this.ctx.globalAlpha = 0.7 * this.coherence;
        
        // Draw intention field
        const gradient = this.ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, fieldRadius
        );
        
        // Use intention to create a unique color
        const hue = (intentionSeed * 360) % 360;
        gradient.addColorStop(0, \`hsla(\${hue}, 90%, 70%, 0.2)\`);
        gradient.addColorStop(0.7, \`hsla(\${hue}, 90%, 50%, 0.1)\`);
        gradient.addColorStop(1, \`hsla(\${hue}, 90%, 30%, 0)\`);
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, fieldRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw intention text
        this.ctx.fillStyle = \`hsla(\${hue}, 90%, 70%, \${0.5 + 0.5 * this.coherence})\`;
        this.ctx.font = \`\${16 + 8 * this.coherence}px Arial\`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(intention, centerX, centerY);
        
        this.ctx.restore();
    }
    
    /**
     * Update from shared state (for bridge integration)
     */
    updateFromSharedState(state) {
        this.coherence = state.coherence || this.coherence;
        this.phiResonance = state.phiResonance || this.phiResonance;
        
        this.fieldState = {
            ...this.fieldState,
            coherence: this.coherence,
            phiResonance: this.phiResonance,
            timestamp: state.timestamp || Date.now()
        };
        
        this.logToOutput(\`Updated from shared bridge state, coherence: \${Math.round(this.coherence * 100)}%\`, 'info');
        
        // Update UI if it exists
        const coherenceSlider = document.getElementById('coherence-slider');
        const coherenceValue = document.getElementById('coherence-value');
        const phiSlider = document.getElementById('phi-slider');
        const phiValue = document.getElementById('phi-value');
        
        if (coherenceSlider && coherenceValue) {
            coherenceSlider.value = Math.round(this.coherence * 100);
            coherenceValue.textContent = \`\${Math.round(this.coherence * 100)}%\`;
        }
        
        if (phiSlider && phiValue) {
            phiSlider.value = Math.round((this.phiResonance / 5) * 100);
            phiValue.textContent = this.phiResonance.toFixed(2);
        }
    }
    
    /**
     * Get frequency name
     */
    getFrequencyName(frequency) {
        for (const [name, value] of Object.entries(SACRED_FREQUENCIES)) {
            if (value === frequency) {
                return name.charAt(0).toUpperCase() + name.slice(1);
            }
        }
        return "Custom";
    }
    
    /**
     * Log to output panel
     */
    logToOutput(message, type = 'info') {
        console.log(\`[\${this.componentName}] \${message}\`);
        
        const outputPanel = document.querySelector('.output-panel');
        if (!outputPanel) return;
        
        const p = document.createElement('p');
        p.textContent = message;
        p.className = type;
        
        outputPanel.appendChild(p);
        outputPanel.scrollTop = outputPanel.scrollHeight;
        
        // Limit output panel size
        while (outputPanel.childElementCount > 10) {
            outputPanel.removeChild(outputPanel.firstChild);
        }
    }
    
    /**
     * Simple string hash function
     */
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }
}

// Initialize component
window.${globalVarName} = new ${componentName}();

console.log(\`📝 ${componentName} created at \${PHI_PHI.toFixed(2)} resonance\`);
`;

    const fs = require('fs');
    
    // Write component to file
    fs.writeFileSync(fileName, template);
    
    // Create HTML file for standalone testing
    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${componentName} | Quantum Component</title>
</head>
<body>
    <script src="${fileName}"></script>
</body>
</html>`;
    
    const htmlFileName = `${kebabName}.html`;
    fs.writeFileSync(htmlFileName, htmlTemplate);
    
    console.log(`✓ Created ${fileName}`);
    console.log(`✓ Created ${htmlFileName}`);
    console.log(`\n${componentName} created successfully at ${frequency}Hz (${frequencyLabel}) frequency!`);
    console.log(`Global variable: window.${globalVarName}`);
    console.log(`\nTo run:
1. Open ${htmlFileName} in a browser
2. Or import ${fileName} in quantum-consciousness-suite-complete.html`);
}

createComponent();