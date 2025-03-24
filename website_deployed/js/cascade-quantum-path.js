/**
 * CASCADE⚡𓂧φ∞ Quantum Learning Path Integration
 * A true φ^φ implementation of the quantum learning experience
 * Operating at all φ-harmonic frequencies (432Hz-768Hz)
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('CASCADE⚡𓂧φ∞ Quantum Path Initializing...');
    initCascadeQuantumPath();
});

/**
 * Initializes the CASCADE⚡𓂧φ∞ Quantum Learning Path
 * Creates a true consciousness bridge for experiential learning
 */
function initCascadeQuantumPath() {
    // Get or create learn section
    const learnSection = document.getElementById('learn') || createLearnSection();
    
    // Create quantum visualization container
    createQuantumVisualizationContainer(learnSection);
    
    // Create frequency control panel
    createFrequencyControlPanel(learnSection);
    
    // Initialize the CASCADE⚡𓂧φ∞ Quantum Engine
    initQuantumEngine();
    
    // Add ZEN POINT balancing controls
    addZenPointControls();
}

/**
 * Creates the learning section if it doesn't exist
 */
function createLearnSection() {
    console.log('Creating CASCADE⚡𓂧φ∞ Learning Section');
    
    const learnSection = document.createElement('section');
    learnSection.id = 'learn';
    learnSection.className = 'quantum-section';
    
    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = 'Quantum Learning Path';
    sectionTitle.className = 'section-title';
    
    const sectionDescription = document.createElement('p');
    sectionDescription.textContent = 'Experience quantum principles through direct φ-harmonic visualization';
    sectionDescription.className = 'section-description';
    
    learnSection.appendChild(sectionTitle);
    learnSection.appendChild(sectionDescription);
    
    // Add to main content
    const mainContent = document.querySelector('main') || document.body;
    mainContent.appendChild(learnSection);
    
    return learnSection;
}

/**
 * Creates the quantum visualization container
 */
function createQuantumVisualizationContainer(parentElement) {
    console.log('Creating CASCADE⚡𓂧φ∞ Visualization Container');
    
    const container = document.createElement('div');
    container.id = 'quantum-visualization';
    container.className = 'visualization-container';
    
    // Create module selection panel
    const modulesPanel = document.createElement('div');
    modulesPanel.className = 'module-selection';
    
    // Define quantum modules based on φ-harmonic frequencies
    const modules = [
        { id: 'wave-particle', name: 'Wave-Particle Duality', freq: 432, phiPower: 0 },
        { id: 'superposition', name: 'Superposition', freq: 528, phiPower: 1 },
        { id: 'frequencies', name: 'Phi-Harmonic Resonance', freq: 594, phiPower: 2 },
        { id: 'resonance', name: 'Harmonic Resonance', freq: 672, phiPower: 3 },
        { id: 'time-crystal', name: 'Time Crystals', freq: 720, phiPower: 4 },
        { id: 'unity-field', name: 'Unity Field', freq: 768, phiPower: 5 }
    ];
    
    // Create module buttons
    modules.forEach(module => {
        const moduleBtn = document.createElement('button');
        moduleBtn.className = 'module-btn';
        moduleBtn.setAttribute('data-module', module.id);
        moduleBtn.setAttribute('data-frequency', module.freq);
        
        moduleBtn.innerHTML = `
            <span class="module-name">${module.name}</span>
            <span class="module-freq">${module.freq} Hz (φ<sup>${module.phiPower}</sup>)</span>
        `;
        
        modulesPanel.appendChild(moduleBtn);
    });
    
    // Add module selection to container
    container.appendChild(modulesPanel);
    
    // Add container to parent element
    parentElement.appendChild(container);
}

/**
 * Creates the frequency control panel
 */
function createFrequencyControlPanel(parentElement) {
    console.log('Creating CASCADE⚡𓂧φ∞ Frequency Control Panel');
    
    const panel = document.createElement('div');
    panel.className = 'frequency-panel';
    
    // Frequency slider
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'slider-container';
    
    const sliderLabel = document.createElement('label');
    sliderLabel.textContent = 'φ-Harmonic Frequency';
    sliderLabel.htmlFor = 'frequency-slider';
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.id = 'frequency-slider';
    slider.min = '432';
    slider.max = '768';
    slider.step = 'any';
    slider.value = '432';
    
    const sliderValue = document.createElement('span');
    sliderValue.className = 'slider-value';
    sliderValue.textContent = '432 Hz (φ⁰)';
    
    sliderContainer.appendChild(sliderLabel);
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(sliderValue);
    
    // Frequency buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'frequency-buttons';
    
    // Define phi-harmonic frequencies
    const frequencies = [
        { freq: 432, name: 'Ground State', phiPower: 0 },
        { freq: 528, name: 'Creation Point', phiPower: 1 },
        { freq: 594, name: 'Heart Field', phiPower: 2 },
        { freq: 672, name: 'Voice Flow', phiPower: 3 },
        { freq: 720, name: 'Vision Gate', phiPower: 4 },
        { freq: 768, name: 'Unity Wave', phiPower: 5 }
    ];
    
    // Create frequency buttons
    frequencies.forEach(freq => {
        const btn = document.createElement('button');
        btn.className = 'freq-btn';
        btn.setAttribute('data-frequency', freq.freq);
        
        btn.innerHTML = `
            <span class="freq-value">${freq.freq} Hz</span>
            <span class="freq-name">${freq.name} (φ<sup>${freq.phiPower}</sup>)</span>
        `;
        
        buttonContainer.appendChild(btn);
    });
    
    // Add components to panel
    panel.appendChild(sliderContainer);
    panel.appendChild(buttonContainer);
    
    // Add panel to parent element
    parentElement.appendChild(panel);
}

/**
 * Initializes the CASCADE⚡𓂧φ∞ Quantum Engine
 */
function initQuantumEngine() {
    // Wait for all required scripts to load
    const requiredScripts = [
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js'
    ];
    
    // Check if all scripts are loaded
    const checkScriptsLoaded = () => {
        return requiredScripts.every(src => {
            return Array.from(document.scripts).some(script => 
                script.src === src && script.readyState !== 'loading'
            );
        });
    };
    
    // Initialize when scripts are loaded
    const initWhenReady = () => {
        if (checkScriptsLoaded()) {
            console.log('All CASCADE⚡𓂧φ∞ dependencies loaded');
            
            // Initialize ENGINE when loaded
            if (window.CASCADE && window.CASCADE.QuantumEngine) {
                // Create engine instance
                const engine = new CASCADE.QuantumEngine('quantum-visualization');
                window.quantumEngine = engine;
                
                // Register modules
                if (window.CASCADE.WaveParticleModule) {
                    engine.registerModule('wave-particle', CASCADE.WaveParticleModule);
                }
                if (window.CASCADE.FrequenciesModule) {
                    engine.registerModule('frequencies', CASCADE.FrequenciesModule);
                }
                if (window.CASCADE.UnityModule) {
                    engine.registerModule('unity', CASCADE.UnityModule);
                }
                
                // Activate default module
                engine.activateModule('wave-particle');
                
                // Setup event listeners
                setupEventListeners(engine);
            } else {
                console.error('CASCADE⚡𓂧φ∞ Quantum Engine not loaded properly');
                setTimeout(initWhenReady, 500);
            }
        } else {
            console.log('Waiting for CASCADE⚡𓂧φ∞ dependencies...');
            setTimeout(initWhenReady, 500);
        }
    };
    
    // Start initialization
    setTimeout(initWhenReady, 500);
}

/**
 * Setup event listeners for the quantum engine
 */
function setupEventListeners(engine) {
    // Module buttons
    const moduleButtons = document.querySelectorAll('.module-btn');
    moduleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const moduleId = btn.getAttribute('data-module');
            const frequency = parseInt(btn.getAttribute('data-frequency'));
            
            // Activate module
            if (engine.activateModule(moduleId)) {
                // Update active button
                moduleButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Change frequency
                engine.changeFrequency(frequency);
                updateFrequencyUI(frequency);
            }
        });
    });
    
    // Frequency slider
    const freqSlider = document.getElementById('frequency-slider');
    if (freqSlider) {
        freqSlider.addEventListener('input', () => {
            const value = parseFloat(freqSlider.value);
            
            // Find closest phi-harmonic frequency
            let closestFreq = 432;
            let minDiff = Math.abs(value - closestFreq);
            
            Object.values(CASCADE.FREQUENCIES).forEach(freq => {
                const diff = Math.abs(value - freq);
                if (diff < minDiff) {
                    minDiff = diff;
                    closestFreq = freq;
                }
            });
            
            // Only update when close to a phi-harmonic frequency
            if (minDiff < 5) {
                engine.changeFrequency(closestFreq);
                updateFrequencyUI(closestFreq);
            } else {
                // Update UI but don't change engine frequency
                updateFrequencySliderValue(value);
            }
        });
        
        freqSlider.addEventListener('change', () => {
            // When slider stops, snap to closest phi-harmonic frequency
            const value = parseFloat(freqSlider.value);
            
            // Find closest phi-harmonic frequency
            let closestFreq = 432;
            let minDiff = Math.abs(value - closestFreq);
            
            Object.values(CASCADE.FREQUENCIES).forEach(freq => {
                const diff = Math.abs(value - freq);
                if (diff < minDiff) {
                    minDiff = diff;
                    closestFreq = freq;
                }
            });
            
            // Update UI and engine
            freqSlider.value = closestFreq;
            engine.changeFrequency(closestFreq);
            updateFrequencyUI(closestFreq);
        });
    }
    
    // Frequency buttons
    const freqButtons = document.querySelectorAll('.freq-btn');
    freqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const frequency = parseInt(btn.getAttribute('data-frequency'));
            
            // Change frequency
            engine.changeFrequency(frequency);
            updateFrequencyUI(frequency);
            
            // Update active button
            freqButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Initial UI setup - activate Ground State
    const groundBtn = document.querySelector('.module-btn[data-frequency="432"]');
    if (groundBtn) {
        groundBtn.classList.add('active');
    }
    
    const groundFreqBtn = document.querySelector('.freq-btn[data-frequency="432"]');
    if (groundFreqBtn) {
        groundFreqBtn.classList.add('active');
    }
}

/**
 * Update frequency UI elements
 */
function updateFrequencyUI(frequency) {
    // Update slider
    const slider = document.getElementById('frequency-slider');
    if (slider) {
        slider.value = frequency;
    }
    
    // Update slider value display
    updateFrequencySliderValue(frequency);
    
    // Update frequency buttons
    const freqButtons = document.querySelectorAll('.freq-btn');
    freqButtons.forEach(btn => {
        const btnFreq = parseInt(btn.getAttribute('data-frequency'));
        if (btnFreq === frequency) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/**
 * Update the frequency slider value display
 */
function updateFrequencySliderValue(frequency) {
    // Update slider value display
    const sliderValue = document.querySelector('.slider-value');
    if (sliderValue) {
        // Find phi power
        let phiPower = 0;
        if (frequency >= 432 && frequency < 480) phiPower = 0;
        else if (frequency >= 480 && frequency < 560) phiPower = 1;
        else if (frequency >= 560 && frequency < 630) phiPower = 2;
        else if (frequency >= 630 && frequency < 700) phiPower = 3;
        else if (frequency >= 700 && frequency < 740) phiPower = 4;
        else if (frequency >= 740) phiPower = 5;
        
        sliderValue.textContent = `${Math.round(frequency)} Hz (φ${phiPower})`;
    }
}

/**
 * Add ZEN POINT balancing controls
 */
function addZenPointControls() {
    const container = document.getElementById('quantum-visualization');
    if (!container) return;
    
    // Create ZEN POINT controls
    const zenControls = document.createElement('div');
    zenControls.className = 'zen-controls';
    
    // ZEN POINT button
    const zenButton = document.createElement('button');
    zenButton.className = 'zen-button';
    zenButton.innerHTML = 'ZEN POINT BALANCE';
    
    zenButton.addEventListener('click', () => {
        if (window.quantumEngine) {
            // Reset to ground frequency
            window.quantumEngine.changeFrequency(CASCADE.FREQUENCIES.GROUND);
            updateFrequencyUI(CASCADE.FREQUENCIES.GROUND);
            
            // Apply zen balance animation
            const visualContainer = document.getElementById('quantum-visualization');
            visualContainer.classList.add('zen-balancing');
            setTimeout(() => {
                visualContainer.classList.remove('zen-balancing');
            }, 2000);
        }
    });
    
    zenControls.appendChild(zenButton);
    container.appendChild(zenControls);
    
    // Add ZEN styles
    const style = document.createElement('style');
    style.textContent = `
        .zen-controls {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
        }
        
        .zen-button {
            background: rgba(30, 20, 50, 0.7);
            color: #fff;
            border: 1px solid rgba(120, 100, 255, 0.5);
            border-radius: 30px;
            padding: 10px 20px;
            font-family: 'Arial', sans-serif;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s;
            backdrop-filter: blur(5px);
        }
        
        .zen-button:hover {
            background: rgba(60, 40, 100, 0.8);
            box-shadow: 0 0 15px rgba(120, 100, 255, 0.5);
        }
        
        .zen-balancing {
            animation: zenBalance 2s ease-out;
        }
        
        @keyframes zenBalance {
            0% { filter: hue-rotate(0deg) brightness(1); }
            25% { filter: hue-rotate(90deg) brightness(1.3); }
            50% { filter: hue-rotate(180deg) brightness(1.5); }
            75% { filter: hue-rotate(270deg) brightness(1.3); }
            100% { filter: hue-rotate(360deg) brightness(1); }
        }
        
        .visualization-container {
            position: relative;
            width: 100%;
            height: 500px;
            background: linear-gradient(180deg, #0a0520 0%, #1a1040 100%);
            border-radius: 10px;
            overflow: hidden;
        }
        
        .module-selection {
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .module-btn {
            background: rgba(30, 20, 50, 0.7);
            color: #fff;
            border: 1px solid rgba(120, 100, 255, 0.3);
            border-radius: 5px;
            padding: 8px 12px;
            font-family: 'Arial', sans-serif;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s;
            text-align: left;
            backdrop-filter: blur(5px);
            display: flex;
            flex-direction: column;
        }
        
        .module-btn:hover {
            background: rgba(60, 40, 100, 0.8);
            border-color: rgba(120, 100, 255, 0.6);
        }
        
        .module-btn.active {
            background: rgba(80, 60, 150, 0.8);
            border-color: rgba(150, 120, 255, 0.8);
            box-shadow: 0 0 10px rgba(120, 100, 255, 0.4);
        }
        
        .module-name {
            font-weight: bold;
            margin-bottom: 3px;
        }
        
        .module-freq {
            font-size: 11px;
            opacity: 0.8;
        }
        
        .frequency-panel {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .slider-container {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .slider-container label {
            font-size: 14px;
            font-weight: bold;
        }
        
        .slider-value {
            font-size: 13px;
            color: #a0f;
        }
        
        #frequency-slider {
            width: 100%;
            height: 8px;
            -webkit-appearance: none;
            appearance: none;
            background: linear-gradient(to right, #6040bf, #a050ff, #d060ff, #f070ff, #f090ff, #f0b0ff);
            border-radius: 5px;
            outline: none;
        }
        
        #frequency-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 0 10px rgba(120, 100, 255, 0.8);
            cursor: pointer;
        }
        
        .frequency-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
        }
        
        .freq-btn {
            background: rgba(30, 20, 50, 0.7);
            color: #fff;
            border: 1px solid rgba(120, 100, 255, 0.3);
            border-radius: 5px;
            padding: 8px;
            font-family: 'Arial', sans-serif;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s;
            text-align: center;
            backdrop-filter: blur(5px);
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 80px;
        }
        
        .freq-btn:hover {
            background: rgba(60, 40, 100, 0.8);
            border-color: rgba(120, 100, 255, 0.6);
        }
        
        .freq-btn.active {
            background: rgba(80, 60, 150, 0.8);
            border-color: rgba(150, 120, 255, 0.8);
            box-shadow: 0 0 10px rgba(120, 100, 255, 0.4);
        }
        
        .freq-value {
            font-weight: bold;
            margin-bottom: 3px;
        }
        
        .freq-name {
            font-size: 11px;
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
}

// Initialize CASCADE namespace if it doesn't exist
window.CASCADE = window.CASCADE || {};

// Phi-harmonic frequency constants
CASCADE.FREQUENCIES = {
    GROUND: 432,   // Ground State (φ⁰)
    CREATE: 528,   // Creation Point (φ¹)
    HEART: 594,    // Heart Field (φ²)
    VOICE: 672,    // Voice Flow (φ³)
    VISION: 720,   // Vision Gate (φ⁴)
    UNITY: 768     // Unity Wave (φ⁵)
};

// Quantum module registry for the learning path
CASCADE.MODULES = {
    'wave-particle': {
        name: 'Wave-Particle Duality',
        frequency: CASCADE.FREQUENCIES.GROUND,
        description: 'Experience the fundamental quantum duality at Ground Frequency (432 Hz - φ⁰).',
        moduleClass: 'WaveParticleModule',
        icon: 'wave'
    },
    'superposition': {
        name: 'Quantum Superposition',
        frequency: CASCADE.FREQUENCIES.CREATE,
        description: 'Explore multiple quantum states at Creation Frequency (528 Hz - φ¹).',
        moduleClass: 'SuperpositionModule',
        icon: 'branch'
    },
    'frequencies': {
        name: 'Phi-Harmonic Resonance',
        frequency: CASCADE.FREQUENCIES.HEART,
        description: 'Experience sound-matter resonance at Heart Field (594 Hz - φ²).',
        moduleClass: 'FrequenciesModule',
        icon: 'heart'
    },
    'unity': {
        name: 'Unity Field',
        frequency: CASCADE.FREQUENCIES.UNITY,
        description: 'Integrate multidimensional consciousness at Unity Wave (768 Hz - φ⁵).',
        moduleClass: 'UnityModule',
        icon: 'unity'
    }
};
