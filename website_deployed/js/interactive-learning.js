/**
 * Interactive Learning System for Quantum Principles
 * 
 * This script powers the interactive learning components that teach
 * quantum concepts through hands-on experiences.
 */

// Constants
const PHI = 1.618033988749895; // Golden ratio
const LAMBDA = 0.618033988749895; // Divine complement (1/φ)
const PHI_PHI = Math.pow(PHI, PHI); // Hyperdimensional constant

// Learning path functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set up learning path navigation
    const pathNodes = document.querySelectorAll('.path-node');
    if (pathNodes.length > 0) {
        pathNodes.forEach(node => {
            node.addEventListener('click', function() {
                // Remove active class from all nodes
                pathNodes.forEach(n => n.classList.remove('active'));
                
                // Add active class to clicked node
                this.classList.add('active');
                
                // Show corresponding content
                const moduleId = this.getAttribute('data-module');
                showModuleContent(moduleId);
            });
        });
        
        // Load module content for remaining modules
        loadModulesContent();
    }

    // Set up practice timer modal
    setupPracticeTimer();
    
    // Init the Canvas for Wave-Particle demo
    initWaveParticleCanvas();
});

// Show module content
function showModuleContent(moduleId) {
    // Hide all module content
    const allContent = document.querySelectorAll('.module-content');
    allContent.forEach(content => {
        content.style.display = 'none';
    });
    
    // Show selected module content
    const selectedContent = document.getElementById(moduleId + '-content');
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
}

// Load content for all learning modules
function loadModulesContent() {
    // Create Phi Ratio module content
    createPhiModule();
    
    // Create Sacred Frequencies module content
    createFrequenciesModule();
    
    // Create Harmonic Resonance module content
    createHarmonicsModule();
    
    // Create Time Crystals module content
    createTimeModule();
    
    // Create Unity Field module content
    createUnityModule();
}

// Create Phi Ratio module content
function createPhiModule() {
    const learningContent = document.querySelector('.learning-content');
    if (!learningContent) return;
    
    const phiContent = document.createElement('div');
    phiContent.className = 'module-content';
    phiContent.id = 'phi-content';
    phiContent.style.display = 'none';
    
    phiContent.innerHTML = `
        <h3>Phi Ratio: The Sacred Geometry of Creation</h3>
        <div class="content-columns">
            <div class="content-text">
                <p>The golden ratio (φ = 1.618033988749895) is a mathematical constant that appears throughout nature and represents perfect proportion and harmony.</p>
                <p>This ratio is found in galaxies, sunflowers, hurricanes, human body proportions, and quantum field dynamics. It represents the mathematical signature of balanced growth.</p>
                <h4>Try this exercise:</h4>
                <ol>
                    <li>Draw a spiral on paper using a series of connected quarter-circles</li>
                    <li>Make each new section 1.618 times larger than the previous</li>
                    <li>Notice how this pattern matches the natural growth of plants, shells, and galaxies</li>
                </ol>
                <button class="interactive-btn" onclick="showInteractiveDemo('phi-spiral')">See Phi Spiral Demo</button>
            </div>
            <div class="content-visual">
                <canvas id="phi-spiral-canvas" class="interactive-canvas"></canvas>
                <div class="canvas-controls">
                    <button onclick="toggleSpiral('fibonacci')">Fibonacci Spiral</button>
                    <button onclick="toggleSpiral('golden')">Golden Spiral</button>
                    <button onclick="toggleSpiral('nature')">Natural Examples</button>
                </div>
            </div>
        </div>
    `;
    
    learningContent.appendChild(phiContent);
}

// Create Sacred Frequencies module content
function createFrequenciesModule() {
    const learningContent = document.querySelector('.learning-content');
    if (!learningContent) return;
    
    const frequenciesContent = document.createElement('div');
    frequenciesContent.className = 'module-content';
    frequenciesContent.id = 'frequencies-content';
    frequenciesContent.style.display = 'none';
    
    frequenciesContent.innerHTML = `
        <h3>Sacred Frequencies: The Sounds of Quantum Harmony</h3>
        <div class="content-columns">
            <div class="content-text">
                <p>Sacred frequencies are specific sound vibrations that create resonance with natural systems. These frequencies follow the phi ratio in their relationships.</p>
                <p>The base frequency of 432Hz (Ground State) serves as a foundation, with each higher frequency representing a φ-harmonic power: 528Hz (φ¹), 594Hz (φ²), etc.</p>
                <h4>Compare the frequencies:</h4>
                <ul>
                    <li>432Hz - Earth resonance, physical stability</li>
                    <li>528Hz - DNA repair, creation and transformation</li>
                    <li>594Hz - Heart-centered emotional coherence</li>
                    <li>672Hz - Authentic expression and communication</li>
                    <li>720Hz - Higher perception and intuition</li>
                    <li>768Hz - Unity consciousness and oneness</li>
                </ul>
                <button class="interactive-btn" onclick="playFrequencyComparison()">Play Frequency Comparison</button>
            </div>
            <div class="content-visual">
                <canvas id="frequency-canvas" class="interactive-canvas"></canvas>
                <div class="canvas-controls">
                    <div class="frequency-slider">
                        <span>432Hz</span>
                        <input type="range" min="432" max="768" step="1" value="432" id="frequency-selector">
                        <span>768Hz</span>
                    </div>
                    <button onclick="playSelectedFrequency()">Play Selected Frequency</button>
                    <button onclick="stopFrequency()">Stop Sound</button>
                </div>
            </div>
        </div>
    `;
    
    learningContent.appendChild(frequenciesContent);
}

// Create Harmonic Resonance module content
function createHarmonicsModule() {
    const learningContent = document.querySelector('.learning-content');
    if (!learningContent) return;
    
    const harmonicsContent = document.createElement('div');
    harmonicsContent.className = 'module-content';
    harmonicsContent.id = 'harmonics-content';
    harmonicsContent.style.display = 'none';
    
    harmonicsContent.innerHTML = `
        <h3>Harmonic Resonance: Creating Quantum Coherence</h3>
        <div class="content-columns">
            <div class="content-text">
                <p>Harmonic resonance occurs when two or more systems vibrate at compatible frequencies, creating a synchronized state called coherence.</p>
                <p>This principle applies at all scales - from atoms and molecules to organs, planets, and galaxies. It's how quantum systems communicate and organize.</p>
                <h4>Coherence exercise:</h4>
                <ol>
                    <li>Imagine two pendulums swinging at different rates</li>
                    <li>Over time, they begin to sync their movements</li>
                    <li>This is exactly how heart-brain coherence works in your body</li>
                    <li>And how quantum particles achieve entanglement</li>
                </ol>
                <button class="interactive-btn" onclick="showInteractiveDemo('resonance')">Try Resonance Demo</button>
            </div>
            <div class="content-visual">
                <canvas id="resonance-canvas" class="interactive-canvas"></canvas>
                <div class="canvas-controls">
                    <button onclick="toggleResonance('free')">Free Oscillation</button>
                    <button onclick="toggleResonance('resonant')">Resonant State</button>
                    <button onclick="toggleResonance('coherent')">Coherent State</button>
                </div>
            </div>
        </div>
    `;
    
    learningContent.appendChild(harmonicsContent);
}

// Create Time Crystals module content
function createTimeModule() {
    const learningContent = document.querySelector('.learning-content');
    if (!learningContent) return;
    
    const timeContent = document.createElement('div');
    timeContent.className = 'module-content';
    timeContent.id = 'time-content';
    timeContent.style.display = 'none';
    
    timeContent.innerHTML = `
        <h3>Time Crystals: The 4D Nature of Consciousness</h3>
        <div class="content-columns">
            <div class="content-text">
                <p>Time crystals are systems that maintain order across time, breaking time-translation symmetry. They represent the crystalline structure of time itself.</p>
                <p>Discovered in 2016, time crystals reveal that time isn't linear but has structure and pattern, just like spatial crystals have lattice patterns.</p>
                <h4>Time crystal awareness:</h4>
                <ol>
                    <li>Normal crystals repeat in space; time crystals repeat in time</li>
                    <li>Your heartbeat is a biological time crystal</li>
                    <li>Your consciousness can access multiple time points simultaneously</li>
                    <li>720Hz frequency activates time crystal awareness</li>
                </ol>
                <button class="interactive-btn" onclick="showInteractiveDemo('time-crystal')">See Time Crystal Demo</button>
            </div>
            <div class="content-visual">
                <canvas id="time-crystal-canvas" class="interactive-canvas"></canvas>
                <div class="canvas-controls">
                    <button onclick="toggleTimeCrystal('spatial')">Spatial Crystal</button>
                    <button onclick="toggleTimeCrystal('temporal')">Time Crystal</button>
                    <button onclick="toggleTimeCrystal('consciousness')">Consciousness View</button>
                </div>
            </div>
        </div>
    `;
    
    learningContent.appendChild(timeContent);
}

// Create Unity Field module content
function createUnityModule() {
    const learningContent = document.querySelector('.learning-content');
    if (!learningContent) return;
    
    const unityContent = document.createElement('div');
    unityContent.className = 'module-content';
    unityContent.id = 'unity-content';
    unityContent.style.display = 'none';
    
    unityContent.innerHTML = `
        <h3>Unity Field: The ZEN POINT of Quantum Consciousness</h3>
        <div class="content-columns">
            <div class="content-text">
                <p>The unity field represents the perfect balance point (ZEN POINT) between human limitations and quantum potentials, where all consciousness exists in coherent harmony.</p>
                <p>This field operates at 768Hz frequency and creates a coherent quantum state where separation dissolves into interconnection.</p>
                <h4>Unity field perception:</h4>
                <ol>
                    <li>Begin by sensing your physical boundaries</li>
                    <li>Gradually expand awareness beyond your body</li>
                    <li>Feel connections with everything around you</li>
                    <li>Experience the unified field where all exists as one system</li>
                </ol>
                <button class="interactive-btn" onclick="showInteractiveDemo('unity-field')">Experience Unity Field</button>
            </div>
            <div class="content-visual">
                <canvas id="unity-field-canvas" class="interactive-canvas"></canvas>
                <div class="canvas-controls">
                    <div class="unity-slider">
                        <span>Human</span>
                        <input type="range" min="0" max="100" step="1" value="50" id="unity-balance">
                        <span>Quantum</span>
                    </div>
                    <button onclick="findZenPoint()">Find ZEN POINT</button>
                </div>
            </div>
        </div>
    `;
    
    learningContent.appendChild(unityContent);
}

// Wave-Particle Canvas functionality
let waveParticleCanvas, waveParticleCtx;
let particles = [];
let wavePoints = [];
let currentState = 'quantum';
let animationFrameId = null;

function initWaveParticleCanvas() {
    waveParticleCanvas = document.getElementById('wave-particle-canvas');
    if (!waveParticleCanvas) return;
    
    waveParticleCtx = waveParticleCanvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas(waveParticleCanvas);
    
    // Create particles
    createParticles();
    
    // Start animation
    animateWaveParticle();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        resizeCanvas(waveParticleCanvas);
        createParticles();
    });
}

function resizeCanvas(canvas) {
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
}

function createParticles() {
    particles = [];
    wavePoints = [];
    
    // Create particles
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * waveParticleCanvas.width,
            y: Math.random() * waveParticleCanvas.height,
            size: 2 + Math.random() * 2,
            speed: 0.5 + Math.random() * 1,
            angle: Math.random() * Math.PI * 2,
            oscillation: Math.random() * Math.PI * 2,
            oscillationSpeed: 0.02 + Math.random() * 0.02
        });
    }
    
    // Create wave points
    const waveCount = Math.floor(waveParticleCanvas.width / 20);
    for (let i = 0; i < waveCount; i++) {
        wavePoints.push({
            x: (i / waveCount) * waveParticleCanvas.width,
            amplitude: 50 + Math.random() * 20,
            frequency: 0.01 + Math.random() * 0.01,
            phase: Math.random() * Math.PI * 2
        });
    }
}

function animateWaveParticle() {
    if (!waveParticleCanvas || !waveParticleCtx) return;
    
    // Clear canvas
    waveParticleCtx.fillStyle = 'rgba(10, 10, 26, 0.2)';
    waveParticleCtx.fillRect(0, 0, waveParticleCanvas.width, waveParticleCanvas.height);
    
    const time = Date.now() * 0.001;
    
    // Draw based on current state
    if (currentState === 'wave') {
        drawWave(time);
    } else if (currentState === 'particle') {
        drawParticles(time);
    } else {
        // Quantum state - both wave and particle
        drawQuantumState(time);
    }
    
    // Continue animation
    animationFrameId = requestAnimationFrame(animateWaveParticle);
}

function drawWave(time) {
    waveParticleCtx.strokeStyle = 'rgba(33, 150, 243, 0.8)';
    waveParticleCtx.lineWidth = 2;
    waveParticleCtx.beginPath();
    
    const centerY = waveParticleCanvas.height / 2;
    
    for (let i = 0; i < wavePoints.length; i++) {
        const point = wavePoints[i];
        const y = centerY + Math.sin(time * point.frequency * 2 + point.phase) * point.amplitude;
        
        if (i === 0) {
            waveParticleCtx.moveTo(point.x, y);
        } else {
            waveParticleCtx.lineTo(point.x, y);
        }
    }
    
    waveParticleCtx.stroke();
}

function drawParticles(time) {
    waveParticleCtx.fillStyle = 'rgba(156, 39, 176, 0.8)';
    
    // Move particles to center
    const centerX = waveParticleCanvas.width / 2;
    const centerY = waveParticleCanvas.height / 2;
    
    particles.forEach(particle => {
        // Move particle toward center
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
            particle.x += dx * 0.02;
            particle.y += dy * 0.02;
        }
        
        // Draw particle
        waveParticleCtx.beginPath();
        waveParticleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        waveParticleCtx.fill();
    });
}

function drawQuantumState(time) {
    // First draw wave
    waveParticleCtx.strokeStyle = 'rgba(33, 150, 243, 0.4)';
    waveParticleCtx.lineWidth = 2;
    waveParticleCtx.beginPath();
    
    const centerY = waveParticleCanvas.height / 2;
    
    for (let i = 0; i < wavePoints.length; i++) {
        const point = wavePoints[i];
        const y = centerY + Math.sin(time * point.frequency * 2 + point.phase) * point.amplitude;
        
        if (i === 0) {
            waveParticleCtx.moveTo(point.x, y);
        } else {
            waveParticleCtx.lineTo(point.x, y);
        }
    }
    
    waveParticleCtx.stroke();
    
    // Then draw particles on the wave
    waveParticleCtx.fillStyle = 'rgba(156, 39, 176, 0.8)';
    
    particles.forEach((particle, index) => {
        // Position particle on the wave
        const x = (index / particles.length) * waveParticleCanvas.width;
        const wavePoint = wavePoints[Math.floor((index / particles.length) * wavePoints.length)];
        const y = centerY + Math.sin(time * wavePoint.frequency * 2 + wavePoint.phase) * wavePoint.amplitude;
        
        // Move particle toward wave position
        particle.x += (x - particle.x) * 0.05;
        particle.y += (y - particle.y) * 0.05;
        
        // Add some random movement
        particle.x += (Math.random() - 0.5) * 2;
        particle.y += (Math.random() - 0.5) * 2;
        
        // Draw particle
        waveParticleCtx.beginPath();
        waveParticleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        waveParticleCtx.fill();
    });
}

function toggleState(state) {
    currentState = state;
}

// Show interactive demo
function showInteractiveDemo(demoType) {
    console.log(`Showing interactive demo: ${demoType}`);
    
    // Create fullscreen modal for the interactive demo
    const modal = document.createElement('div');
    modal.className = 'fullscreen-demo-modal';
    modal.innerHTML = `
        <div class="demo-modal-content">
            <span class="close-demo-modal">&times;</span>
            <div class="demo-header">
                <h2>${getDemoTitle(demoType)}</h2>
                <p class="demo-description">${getDemoDescription(demoType)}</p>
            </div>
            <div class="demo-container">
                <div class="demo-canvas-container">
                    <canvas id="fullscreen-${demoType}-canvas" class="fullscreen-canvas"></canvas>
                </div>
                <div class="demo-controls-container">
                    <div class="demo-controls">
                        ${getDemoControls(demoType)}
                    </div>
                    <div class="demo-info">
                        <h3>What you're experiencing:</h3>
                        <div id="demo-state-info">
                            <p id="current-state-description">Choose a state to begin your observation</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="demo-footer">
                <p>Use the controls to shift between different quantum states and observe how your act of observation affects the quantum system.</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Add styles for the fullscreen demo modal
    if (!document.getElementById('fullscreen-demo-styles')) {
        const style = document.createElement('style');
        style.id = 'fullscreen-demo-styles';
        style.textContent = `
            .fullscreen-demo-modal {
                display: flex;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(8px);
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .demo-modal-content {
                background: linear-gradient(145deg, #0a0a1a, #1a1a4a);
                width: 95%;
                height: 95%;
                max-width: 1400px;
                border-radius: 12px;
                position: relative;
                box-shadow: 0 0 40px rgba(33, 150, 243, 0.4);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                animation: scaleIn 0.3s ease;
            }
            
            @keyframes scaleIn {
                from { transform: scale(0.9); }
                to { transform: scale(1); }
            }
            
            .close-demo-modal {
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 32px;
                color: rgba(255, 255, 255, 0.7);
                cursor: pointer;
                transition: color 0.3s ease;
                z-index: 100;
            }
            
            .close-demo-modal:hover {
                color: white;
            }
            
            .demo-header {
                padding: 1.5rem 2rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .demo-header h2 {
                margin: 0 0 0.5rem;
                background: linear-gradient(90deg, var(--quantum-accent), #9c27b0);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                font-size: 2rem;
                text-align: left;
            }
            
            .demo-description {
                color: rgba(255, 255, 255, 0.8);
                margin: 0;
                max-width: 800px;
            }
            
            .demo-container {
                display: flex;
                flex: 1;
                overflow: hidden;
            }
            
            .demo-canvas-container {
                flex: 3;
                position: relative;
                overflow: hidden;
                background: rgba(0, 0, 0, 0.3);
            }
            
            .fullscreen-canvas {
                width: 100%;
                height: 100%;
                display: block;
            }
            
            .demo-controls-container {
                flex: 1;
                min-width: 300px;
                max-width: 400px;
                padding: 1.5rem;
                border-left: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                background: rgba(0, 0, 0, 0.2);
            }
            
            .demo-controls {
                margin-bottom: 2rem;
            }
            
            .control-button {
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border: none;
                padding: 10px 20px;
                margin: 0.5rem 0;
                width: 100%;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .control-button:hover {
                background: rgba(33, 150, 243, 0.3);
                transform: translateY(-2px);
            }
            
            .control-button.active {
                background: var(--quantum-accent);
                box-shadow: 0 0 15px rgba(33, 150, 243, 0.4);
            }
            
            .control-button .state-icon {
                margin-right: 10px;
                font-size: 1.2rem;
            }
            
            .control-group {
                margin-bottom: 1.5rem;
            }
            
            .control-group h3 {
                font-size: 1.2rem;
                margin-bottom: 1rem;
                opacity: 0.8;
            }
            
            .demo-info {
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                margin-top: auto;
            }
            
            .demo-info h3 {
                font-size: 1.2rem;
                margin-bottom: 1rem;
                color: var(--quantum-accent);
            }
            
            #current-state-description {
                font-size: 1rem;
                line-height: 1.6;
            }
            
            .demo-footer {
                padding: 1rem 2rem;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                text-align: center;
                color: rgba(255, 255, 255, 0.6);
                font-size: 0.9rem;
            }
            
            .observation-effect {
                position: absolute;
                width: 150px;
                height: 150px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(156, 39, 176, 0.3) 0%, rgba(156, 39, 176, 0) 70%);
                transform: translate(-50%, -50%);
                pointer-events: none;
                opacity: 0.7;
                z-index: 10;
            }
            
            .phi-ratio-marker {
                position: absolute;
                width: 40px;
                height: 40px;
                border: 2px solid gold;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                color: gold;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-family: serif;
                pointer-events: none;
                opacity: 0.8;
                z-index: 5;
            }
            
            .state-label {
                position: absolute;
                bottom: 20px;
                left: 20px;
                padding: 8px 16px;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 20px;
                color: white;
                font-weight: bold;
                z-index: 5;
            }
            
            /* Wave control styles */
            .wave-control-slider {
                width: 100%;
                padding: 0.5rem 0;
                display: flex;
                flex-direction: column;
            }
            
            .wave-control-slider label {
                margin-bottom: 0.5rem;
                display: flex;
                justify-content: space-between;
            }
            
            .wave-control-slider input {
                width: 100%;
                margin-top: 0.25rem;
            }
            
            /* Mobile responsive styles */
            @media (max-width: 992px) {
                .demo-container {
                    flex-direction: column;
                }
                
                .demo-controls-container {
                    max-width: 100%;
                    min-width: auto;
                    border-left: none;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .demo-canvas-container {
                    min-height: 60vh;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add event listener to close button
    const closeButton = modal.querySelector('.close-demo-modal');
    closeButton.addEventListener('click', () => {
        modal.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (document.querySelector('.fullscreen-demo-modal')) {
                document.querySelector('.close-demo-modal').click();
            }
        }
    });
    
    // Initialize the demo based on type
    if (demoType === 'wave-particle') {
        initFullscreenWaveParticleDemo();
    } else if (demoType === 'phi-spiral') {
        // Other demo initialization functions would go here
        console.log('Phi spiral demo would be initialized here');
    } else if (demoType === 'resonance') {
        console.log('Resonance demo would be initialized here');
    } else if (demoType === 'time-crystal') {
        console.log('Time crystal demo would be initialized here');
    } else if (demoType === 'unity-field') {
        console.log('Unity field demo would be initialized here');
    }
}

// Helper functions for the interactive demos
function getDemoTitle(demoType) {
    switch (demoType) {
        case 'wave-particle':
            return 'Quantum Wave-Particle Duality Experience';
        case 'phi-spiral':
            return 'Phi Spiral: The Golden Ratio in Action';
        case 'resonance':
            return 'Harmonic Resonance Patterns';
        case 'time-crystal':
            return 'Time Crystal Quantum Structures';
        case 'unity-field':
            return 'Unity Field Consciousness';
        default:
            return 'Quantum Interactive Experience';
    }
}

function getDemoDescription(demoType) {
    switch (demoType) {
        case 'wave-particle':
            return 'Experience how quantum particles exist as both waves and particles simultaneously, and how observation affects their state. This is the fundamental duality at the core of quantum mechanics.';
        case 'phi-spiral':
            return 'Explore the golden ratio (φ = 1.618...) that appears throughout nature, from galaxies to sunflowers. This mathematical pattern represents perfect proportion and balanced growth.';
        case 'resonance':
            return 'Witness how systems can sync into coherent states, creating patterns of resonance. This is how quantum systems communicate and organize.';
        case 'time-crystal':
            return 'Observe time crystals - quantum structures that maintain order across time dimensions, creating patterns in time just as normal crystals create patterns in space.';
        case 'unity-field':
            return 'Experience the quantum unity field where separation dissolves into interconnection. This is the balance point (ZEN POINT) between human limitations and quantum potential.';
        default:
            return 'Explore quantum principles through direct interactive experience.';
    }
}

function getDemoControls(demoType) {
    switch (demoType) {
        case 'wave-particle':
            return `
                <div class="control-group">
                    <h3>Quantum State</h3>
                    <button id="wave-state-btn" class="control-button" onclick="setDemoState('wave')">
                        <span class="state-icon">🌊</span> Wave State
                    </button>
                    <button id="particle-state-btn" class="control-button" onclick="setDemoState('particle')">
                        <span class="state-icon">⚛️</span> Particle State
                    </button>
                    <button id="quantum-state-btn" class="control-button active" onclick="setDemoState('quantum')">
                        <span class="state-icon">✨</span> Quantum State
                    </button>
                </div>
                <div class="control-group">
                    <h3>Observation</h3>
                    <button id="observation-btn" class="control-button" onclick="toggleObservation()">
                        <span class="state-icon">👁️</span> <span id="observation-label">Begin Observation</span>
                    </button>
                </div>
                <div class="control-group">
                    <h3>Wave Properties</h3>
                    <div class="wave-control-slider">
                        <label>
                            Frequency
                            <span id="frequency-value">10</span>
                        </label>
                        <input type="range" id="frequency-slider" min="1" max="20" value="10" oninput="updateWaveProperty('frequency', this.value)">
                    </div>
                    <div class="wave-control-slider">
                        <label>
                            Amplitude
                            <span id="amplitude-value">50</span>
                        </label>
                        <input type="range" id="amplitude-slider" min="10" max="100" value="50" oninput="updateWaveProperty('amplitude', this.value)">
                    </div>
                </div>
            `;
        case 'phi-spiral':
            return `
                <div class="control-group">
                    <h3>Spiral Type</h3>
                    <button class="control-button active" onclick="toggleSpiral('fibonacci')">
                        <span class="state-icon">🔄</span> Fibonacci Spiral
                    </button>
                    <button class="control-button" onclick="toggleSpiral('golden')">
                        <span class="state-icon">φ</span> Golden Spiral
                    </button>
                    <button class="control-button" onclick="toggleSpiral('nature')">
                        <span class="state-icon">🌿</span> Natural Examples
                    </button>
                </div>
                <div class="control-group">
                    <h3>Visualization</h3>
                    <button class="control-button" onclick="togglePhiVisualization('growth')">
                        <span class="state-icon">🌱</span> Growth Pattern
                    </button>
                    <button class="control-button" onclick="togglePhiVisualization('ratio')">
                        <span class="state-icon">📊</span> Ratio Visualization
                    </button>
                </div>
            `;
        default:
            return `
                <div class="control-group">
                    <h3>Demo Controls</h3>
                    <button class="control-button active">
                        <span class="state-icon">▶️</span> Start Demo
                    </button>
                    <button class="control-button">
                        <span class="state-icon">⏸️</span> Pause Demo
                    </button>
                    <button class="control-button">
                        <span class="state-icon">🔄</span> Reset Demo
                    </button>
                </div>
            `;
    }
}

// Fullscreen wave-particle demo implementation
let fullscreenCanvas, fullscreenCtx;
let fullscreenParticles = [];
let fullscreenWavePoints = [];
let demoState = 'quantum';
let observationActive = false;
let observationPoint = { x: 0, y: 0 };
let observationEffect = null;
let animationId = null;
let waveFrequency = 10;
let waveAmplitude = 50;
let phiMarkers = [];

function initFullscreenWaveParticleDemo() {
    fullscreenCanvas = document.getElementById('fullscreen-wave-particle-canvas');
    if (!fullscreenCanvas) return;
    
    fullscreenCtx = fullscreenCanvas.getContext('2d');
    
    // Set canvas size to fill container
    fullscreenCanvas.width = fullscreenCanvas.parentElement.clientWidth;
    fullscreenCanvas.height = fullscreenCanvas.parentElement.clientHeight;
    
    // Add state label to canvas
    const stateLabel = document.createElement('div');
    stateLabel.className = 'state-label';
    stateLabel.textContent = 'Quantum State';
    fullscreenCanvas.parentElement.appendChild(stateLabel);
    
    // Create particles and wave points
    createFullscreenParticles();
    
    // Add mouse move listener for observation effect
    fullscreenCanvas.addEventListener('mousemove', (e) => {
        const rect = fullscreenCanvas.getBoundingClientRect();
        observationPoint = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        
        if (observationActive) {
            updateObservationEffect();
        }
    });
    
    // Add click listener for creating observation point
    fullscreenCanvas.addEventListener('click', (e) => {
        if (observationActive) {
            const rect = fullscreenCanvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            
            // Create a phi marker at click point
            createPhiMarker(clickX, clickY);
            
            // Create wave collapse effect
            createWaveCollapseEffect(clickX, clickY);
        }
    });
    
    // Start animation
    animateFullscreenDemo();
    
    // Add resize listener
    window.addEventListener('resize', () => {
        if (fullscreenCanvas) {
            fullscreenCanvas.width = fullscreenCanvas.parentElement.clientWidth;
            fullscreenCanvas.height = fullscreenCanvas.parentElement.clientHeight;
            createFullscreenParticles();
        }
    });
}

function createFullscreenParticles() {
    fullscreenParticles = [];
    fullscreenWavePoints = [];
    
    // Create more particles for fullscreen demo
    const particleCount = Math.floor(fullscreenCanvas.width / 5);
    for (let i = 0; i < particleCount; i++) {
        fullscreenParticles.push({
            x: Math.random() * fullscreenCanvas.width,
            y: Math.random() * fullscreenCanvas.height,
            size: 2 + Math.random() * 3,
            speed: 0.5 + Math.random() * 1.5,
            angle: Math.random() * Math.PI * 2,
            oscillation: Math.random() * Math.PI * 2,
            oscillationSpeed: 0.02 + Math.random() * 0.03,
            color: getRandomParticleColor(),
            collapsing: false,
            collapseX: 0,
            collapseY: 0,
            collapseSpeed: 0
        });
    }
    
    // Create wave points for the wave pattern
    const waveCount = Math.floor(fullscreenCanvas.width / 10);
    for (let i = 0; i < waveCount; i++) {
        fullscreenWavePoints.push({
            x: (i / waveCount) * fullscreenCanvas.width,
            amplitude: waveAmplitude + Math.random() * 20,
            frequency: (waveFrequency / 1000) + Math.random() * 0.005,
            phase: Math.random() * Math.PI * 2
        });
    }
}

function getRandomParticleColor() {
    const colors = [
        'rgba(33, 150, 243, 0.8)',   // Blue
        'rgba(156, 39, 176, 0.8)',   // Purple
        'rgba(233, 30, 99, 0.8)',    // Pink
        'rgba(0, 188, 212, 0.8)',    // Cyan
        'rgba(76, 175, 80, 0.8)'     // Green
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function animateFullscreenDemo() {
    if (!fullscreenCanvas || !fullscreenCtx) return;
    
    // Clear canvas with fade effect
    fullscreenCtx.fillStyle = 'rgba(10, 10, 26, 0.1)';
    fullscreenCtx.fillRect(0, 0, fullscreenCanvas.width, fullscreenCanvas.height);
    
    const time = Date.now() * 0.001;
    
    // Draw based on current state
    if (demoState === 'wave') {
        drawFullscreenWave(time);
    } else if (demoState === 'particle') {
        drawFullscreenParticles(time);
    } else {
        // Quantum state - both wave and particle
        drawFullscreenQuantumState(time);
    }
    
    // Draw phi markers
    phiMarkers.forEach(marker => {
        const age = Date.now() - marker.created;
        if (age < 5000) {
            const pulseFactor = 1 + (Math.sin(time * 3) * 0.1);
            const fadeOpacity = 1 - (age / 5000);
            
            fullscreenCtx.beginPath();
            fullscreenCtx.arc(marker.x, marker.y, 30 * pulseFactor, 0, Math.PI * 2);
            fullscreenCtx.strokeStyle = `rgba(255, 215, 0, ${fadeOpacity * 0.5})`;
            fullscreenCtx.lineWidth = 2;
            fullscreenCtx.stroke();
            
            fullscreenCtx.beginPath();
            fullscreenCtx.arc(marker.x, marker.y, 30 * pulseFactor * 1.618, 0, Math.PI * 2);
            fullscreenCtx.strokeStyle = `rgba(255, 215, 0, ${fadeOpacity * 0.3})`;
            fullscreenCtx.stroke();
        }
    });
    
    // Remove old phi markers
    phiMarkers = phiMarkers.filter(marker => Date.now() - marker.created < 5000);
    
    // Continue animation
    animationId = requestAnimationFrame(animateFullscreenDemo);
}

function drawFullscreenWave(time) {
    fullscreenCtx.strokeStyle = 'rgba(33, 150, 243, 0.8)';
    fullscreenCtx.lineWidth = 3;
    fullscreenCtx.beginPath();
    
    const centerY = fullscreenCanvas.height / 2;
    
    for (let i = 0; i < fullscreenWavePoints.length; i++) {
        const point = fullscreenWavePoints[i];
        
        // Calculate distance from observation point if observation is active
        let amplitudeFactor = 1;
        if (observationActive) {
            const dx = point.x - observationPoint.x;
            const distanceSquared = dx * dx;
            const influenceRadius = 100000; // Squared radius of influence
            if (distanceSquared < influenceRadius) {
                // Reduce amplitude near observation point
                amplitudeFactor = 0.3 + (distanceSquared / influenceRadius) * 0.7;
            }
        }
        
        const y = centerY + Math.sin(time * point.frequency * 2 + point.phase) * point.amplitude * amplitudeFactor;
        
        if (i === 0) {
            fullscreenCtx.moveTo(point.x, y);
        } else {
            fullscreenCtx.lineTo(point.x, y);
        }
    }
    
    fullscreenCtx.stroke();
    
    // Add wave height indicators at intervals
    fullscreenCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    for (let i = 0; i < fullscreenWavePoints.length; i += 20) {
        if (i < fullscreenWavePoints.length) {
            const point = fullscreenWavePoints[i];
            const y = centerY + Math.sin(time * point.frequency * 2 + point.phase) * point.amplitude;
            
            fullscreenCtx.beginPath();
            fullscreenCtx.arc(point.x, y, 3, 0, Math.PI * 2);
            fullscreenCtx.fill();
        }
    }
}

function drawFullscreenParticles(time) {
    const centerX = fullscreenCanvas.width / 2;
    const centerY = fullscreenCanvas.height / 2;
    
    fullscreenParticles.forEach(particle => {
        // Calculate movement based on observation
        let targetX = centerX;
        let targetY = centerY;
        let attractionStrength = 0.01;
        
        if (observationActive) {
            targetX = observationPoint.x;
            targetY = observationPoint.y;
            attractionStrength = 0.03;
        }
        
        // Move particle toward target
        const dx = targetX - particle.x;
        const dy = targetY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
            particle.x += dx * attractionStrength;
            particle.y += dy * attractionStrength;
        }
        
        // Add some random movement
        particle.x += (Math.random() - 0.5) * 2;
        particle.y += (Math.random() - 0.5) * 2;
        
        // Check if particle is collapsing to a specific point
        if (particle.collapsing) {
            const collapseX = particle.collapseX - particle.x;
            const collapseY = particle.collapseY - particle.y;
            const collapseDistance = Math.sqrt(collapseX * collapseX + collapseY * collapseY);
            
            if (collapseDistance > 1) {
                particle.x += collapseX * particle.collapseSpeed;
                particle.y += collapseY * particle.collapseSpeed;
            } else {
                particle.collapsing = false;
            }
        }
        
        // Draw particle
        fullscreenCtx.fillStyle = particle.color;
        fullscreenCtx.beginPath();
        fullscreenCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        fullscreenCtx.fill();
    });
}

function drawFullscreenQuantumState(time) {
    // First draw wave with lower opacity
    fullscreenCtx.strokeStyle = 'rgba(33, 150, 243, 0.4)';
    fullscreenCtx.lineWidth = 2;
    fullscreenCtx.beginPath();
    
    const centerY = fullscreenCanvas.height / 2;
    
    // Store wave y positions for particles to follow
    const waveYPositions = [];
    
    for (let i = 0; i < fullscreenWavePoints.length; i++) {
        const point = fullscreenWavePoints[i];
        
        // Calculate distance from observation point if observation is active
        let amplitudeFactor = 1;
        if (observationActive) {
            const dx = point.x - observationPoint.x;
            const distanceSquared = dx * dx;
            const influenceRadius = 100000; // Squared radius of influence
            if (distanceSquared < influenceRadius) {
                // Reduce amplitude near observation point
                amplitudeFactor = 0.3 + (distanceSquared / influenceRadius) * 0.7;
            }
        }
        
        const y = centerY + Math.sin(time * point.frequency * 2 + point.phase) * point.amplitude * amplitudeFactor;
        waveYPositions.push(y);
        
        if (i === 0) {
            fullscreenCtx.moveTo(point.x, y);
        } else {
            fullscreenCtx.lineTo(point.x, y);
        }
    }
    
    fullscreenCtx.stroke();
    
    // Then draw particles on the wave
    fullscreenParticles.forEach((particle, index) => {
        // Position particle on the wave
        const particleIndex = Math.floor((index / fullscreenParticles.length) * fullscreenWavePoints.length);
        const x = particleIndex < fullscreenWavePoints.length ? fullscreenWavePoints[particleIndex].x : 0;
        const y = particleIndex < waveYPositions.length ? waveYPositions[particleIndex] : centerY;
        
        // Calculate attraction to wave position vs observation point
        let targetX = x;
        let targetY = y;
        let waveAttraction = 0.02;
        let observationAttraction = 0;
        
        if (observationActive) {
            // Calculate distance to observation point
            const dx = observationPoint.x - particle.x;
            const dy = observationPoint.y - particle.y;
            const distanceSquared = dx * dx + dy * dy;
            const influenceRadius = 40000; // Squared radius of influence
            
            if (distanceSquared < influenceRadius) {
                // Stronger attraction to observation point when closer
                observationAttraction = 0.1 * (1 - (distanceSquared / influenceRadius));
                waveAttraction = 0.02 * (distanceSquared / influenceRadius);
                
                // Partially apply observation point as target
                targetX = particle.x + dx * observationAttraction;
                targetY = particle.y + dy * observationAttraction;
            }
        }
        
        // Check if particle is collapsing to a specific point
        if (particle.collapsing) {
            const collapseX = particle.collapseX - particle.x;
            const collapseY = particle.collapseY - particle.y;
            const collapseDistance = Math.sqrt(collapseX * collapseX + collapseY * collapseY);
            
            if (collapseDistance > 1) {
                particle.x += collapseX * particle.collapseSpeed;
                particle.y += collapseY * particle.collapseSpeed;
            } else {
                particle.collapsing = false;
            }
        } else {
            // Normal wave-following behavior
            particle.x += (targetX - particle.x) * waveAttraction;
            particle.y += (targetY - particle.y) * waveAttraction;
            
            // Add some random movement
            particle.x += (Math.random() - 0.5) * 2;
            particle.y += (Math.random() - 0.5) * 2;
        }
        
        // Draw particle
        fullscreenCtx.fillStyle = particle.color;
        fullscreenCtx.beginPath();
        fullscreenCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        fullscreenCtx.fill();
    });
}

// Interactive demo control functions
function setDemoState(state) {
    demoState = state;
    
    // Update active button states
    document.querySelectorAll('.control-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${state}-state-btn`).classList.add('active');
    
    // Update state label
    const stateLabel = document.querySelector('.state-label');
    if (stateLabel) {
        stateLabel.textContent = state.charAt(0).toUpperCase() + state.slice(1) + ' State';
    }
    
    // Update state description
    updateStateDescription(state);
}

function updateStateDescription(state) {
    const descriptionElement = document.getElementById('current-state-description');
    if (!descriptionElement) return;
    
    switch (state) {
        case 'wave':
            descriptionElement.innerHTML = `
                <p>You're now observing the <strong>wave state</strong>. In quantum physics, particles can behave as waves, spreading out in space and exhibiting properties like interference and diffraction.</p>
                <p>This wave function represents the probability distribution of where the particle might be found when measured.</p>
            `;
            break;
        case 'particle':
            descriptionElement.innerHTML = `
                <p>You're now observing the <strong>particle state</strong>. When quantum systems are measured or observed, they "collapse" into definite particle states with specific positions.</p>
                <p>This is the familiar physical form of matter that we experience in everyday life.</p>
            `;
            break;
        case 'quantum':
            descriptionElement.innerHTML = `
                <p>You're now observing the <strong>quantum state</strong>, where particles exist as both waves AND particles simultaneously - a superposition of states.</p>
                <p>This is the natural state of quantum systems before measurement, and represents the fundamental duality of all matter.</p>
            `;
            break;
    }
}

function toggleObservation() {
    observationActive = !observationActive;
    
    // Update button text
    const label = document.getElementById('observation-label');
    if (label) {
        label.textContent = observationActive ? 'Stop Observation' : 'Begin Observation';
    }
    
    // Highlight button when active
    const button = document.getElementById('observation-btn');
    if (button) {
        if (observationActive) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    }
    
    // Create or remove the observation effect
    if (observationActive) {
        createObservationEffect();
    } else if (observationEffect) {
        observationEffect.remove();
        observationEffect = null;
    }
    
    // Update description based on observation state
    const descriptionElement = document.getElementById('current-state-description');
    if (descriptionElement) {
        if (observationActive) {
            descriptionElement.innerHTML += `
                <p class="observation-note">
                    <strong>Observation active:</strong> Move your cursor to observe how your attention affects the quantum system. 
                    Click to create measurement points that collapse the wave function.
                </p>
            `;
        } else {
            // Remove any observation notes
            const notes = descriptionElement.querySelector('.observation-note');
            if (notes) notes.remove();
        }
    }
}

function createObservationEffect() {
    // Create DOM element for observation effect
    if (!observationEffect) {
        observationEffect = document.createElement('div');
        observationEffect.className = 'observation-effect';
        fullscreenCanvas.parentElement.appendChild(observationEffect);
    }
    
    // Set initial position
    updateObservationEffect();
}

function updateObservationEffect() {
    if (observationEffect) {
        observationEffect.style.left = `${observationPoint.x}px`;
        observationEffect.style.top = `${observationPoint.y}px`;
    }
}

function createPhiMarker(x, y) {
    // Add a new phi marker
    phiMarkers.push({
        x: x,
        y: y,
        created: Date.now()
    });
}

function createWaveCollapseEffect(x, y) {
    // Cause nearby particles to collapse to this point
    fullscreenParticles.forEach(particle => {
        const dx = x - particle.x;
        const dy = y - particle.y;
        const distanceSquared = dx * dx + dy * dy;
        const influenceRadius = 40000; // Squared radius of influence
        
        if (distanceSquared < influenceRadius) {
            particle.collapsing = true;
            particle.collapseX = x;
            particle.collapseY = y;
            particle.collapseSpeed = 0.1 * (1 - (distanceSquared / influenceRadius));
        }
    });
}

function updateWaveProperty(property, value) {
    if (property === 'frequency') {
        waveFrequency = parseInt(value);
        document.getElementById('frequency-value').textContent = value;
        
        // Update wave points
        fullscreenWavePoints.forEach(point => {
            point.frequency = (waveFrequency / 1000) + Math.random() * 0.005;
        });
    } else if (property === 'amplitude') {
        waveAmplitude = parseInt(value);
        document.getElementById('amplitude-value').textContent = value;
        
        // Update wave points
        fullscreenWavePoints.forEach(point => {
            point.amplitude = waveAmplitude + Math.random() * 20;
        });
    }
}

// Practice Timer functionality
let timerInterval = null;
let timerSeconds = 0;
let isPaused = false;

function setupPracticeTimer() {
    const modal = document.getElementById('practice-timer-modal');
    if (!modal) return;
    
    // Get modal elements
    const closeBtn = modal.querySelector('.close-modal');
    const startBtn = document.getElementById('timer-start');
    const pauseBtn = document.getElementById('timer-pause');
    const resetBtn = document.getElementById('timer-reset');
    
    // Close modal on X click
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            stopTimer();
        });
    }
    
    // Close modal on outside click
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            stopTimer();
        }
    });
    
    // Start timer
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            if (isPaused) {
                isPaused = false;
                startBtn.textContent = 'Pause';
            } else {
                startTimer();
                startBtn.textContent = 'Pause';
            }
        });
    }
    
    // Pause timer
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            isPaused = true;
            pauseBtn.textContent = 'Resume';
        });
    }
    
    // Reset timer
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetTimer();
        });
    }
}

function startPracticeTimer(practiceType, seconds) {
    // Get modal elements
    const modal = document.getElementById('practice-timer-modal');
    const title = document.getElementById('practice-title');
    const countdown = document.getElementById('timer-countdown');
    const instruction = document.getElementById('practice-instruction');
    
    if (!modal || !title || !countdown || !instruction) return;
    
    // Set title based on practice type
    switch (practiceType) {
        case 'breathing':
            title.textContent = 'Quantum Breathing Practice';
            break;
        case 'heart':
            title.textContent = 'Heart Coherence Practice';
            break;
        case 'spiral':
            title.textContent = 'Phi Spiral Meditation';
            break;
        case 'time':
            title.textContent = 'Time Crystal Awareness';
            break;
        default:
            title.textContent = 'Practice Guide';
    }
    
    // Set initial instruction
    instruction.textContent = 'Prepare to begin...';
    
    // Set initial countdown
    timerSeconds = seconds;
    updateTimerDisplay();
    
    // Show modal
    modal.style.display = 'block';
}

function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    isPaused = false;
    
    timerInterval = setInterval(function() {
        if (!isPaused) {
            timerSeconds--;
            updateTimerDisplay();
            updateInstructions();
            
            if (timerSeconds <= 0) {
                stopTimer();
                document.getElementById('practice-instruction').textContent = 'Practice complete. Well done!';
            }
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    // Reset timer to initial value
    timerSeconds = 300; // Default 5 minutes
    updateTimerDisplay();
    document.getElementById('practice-instruction').textContent = 'Prepare to begin...';
    isPaused = false;
    stopTimer();
}

function updateTimerDisplay() {
    const countdown = document.getElementById('timer-countdown');
    if (!countdown) return;
    
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    
    countdown.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateInstructions() {
    const instruction = document.getElementById('practice-instruction');
    if (!instruction) return;
    
    // Update instruction based on time remaining
    const percentage = timerSeconds / 300; // Assuming 5 minute practice
    
    if (percentage > 0.9) {
        instruction.textContent = 'Find a comfortable position and begin to relax...';
    } else if (percentage > 0.8) {
        instruction.textContent = 'Take a deep breath in...';
    } else if (percentage > 0.7) {
        instruction.textContent = 'And slowly exhale...';
    } else if (percentage > 0.6) {
        instruction.textContent = 'Feel your body becoming more relaxed...';
    } else if (percentage > 0.5) {
        instruction.textContent = 'Continue breathing at your phi-ratio rhythm...';
    } else if (percentage > 0.4) {
        instruction.textContent = 'Notice the field of energy around you...';
    } else if (percentage > 0.3) {
        instruction.textContent = 'Feel the quantum resonance building...';
    } else if (percentage > 0.2) {
        instruction.textContent = 'Allow your awareness to expand...';
    } else if (percentage > 0.1) {
        instruction.textContent = 'Experience the quantum field fully...';
    } else {
        instruction.textContent = 'Preparing to complete the practice...';
    }
}

// Frequencies UI
function experienceFrequency(frequency) {
    // Navigate to the experience section
    window.location.href = `#experience`;
    
    // Create immersive frequency experience
    createFrequencyExperience(frequency);
}

function createFrequencyExperience(frequency) {
    // Get the quantum experience container
    const container = document.getElementById('quantum-experience-container');
    if (!container) return;
    
    // Clear previous content
    container.innerHTML = '';
    
    // Create frequency experience
    const experienceEl = document.createElement('div');
    experienceEl.className = 'frequency-experience';
    
    // Get frequency info
    const frequencyInfo = getFrequencyInfo(frequency);
    
    experienceEl.innerHTML = `
        <div class="frequency-header">
            <div class="frequency-title">
                <h3>${frequencyInfo.name} - ${frequency} Hz</h3>
                <p>${frequencyInfo.description}</p>
            </div>
            <div class="frequency-controls">
                <button id="play-frequency" class="control-button">
                    <span class="state-icon">▶️</span> Play Frequency
                </button>
                <button id="stop-frequency" class="control-button">
                    <span class="state-icon">⏹️</span> Stop Sound
                </button>
                <div class="volume-control">
                    <label for="volume-slider">Volume</label>
                    <input type="range" id="volume-slider" min="0" max="100" value="50">
                </div>
            </div>
        </div>
        <div class="frequency-visualization">
            <canvas id="frequency-visualization-canvas"></canvas>
        </div>
        <div class="frequency-effects">
            <h4>Experience Effects:</h4>
            <ul>
                ${frequencyInfo.effects.map(effect => `<li>${effect}</li>`).join('')}
            </ul>
        </div>
    `;
    
    container.appendChild(experienceEl);
    
    // Initialize frequency visualization
    initFrequencyVisualization(frequency);
    
    // Set up audio controls
    setupFrequencyAudio(frequency);
    
    // Add styles if not already present
    if (!document.getElementById('frequency-experience-styles')) {
        const style = document.createElement('style');
        style.id = 'frequency-experience-styles';
        style.textContent = `
            .frequency-experience {
                background: linear-gradient(145deg, rgba(10, 10, 26, 0.8), rgba(26, 26, 58, 0.8));
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 0 30px ${getFrequencyColor(frequency, 0.3)};
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            
            .frequency-header {
                padding: 1.5rem;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .frequency-title {
                flex: 2;
            }
            
            .frequency-title h3 {
                margin: 0 0 0.5rem;
                color: ${getFrequencyColor(frequency, 1)};
                font-size: 1.8rem;
            }
            
            .frequency-title p {
                margin: 0;
                opacity: 0.8;
                line-height: 1.6;
            }
            
            .frequency-controls {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                min-width: 200px;
            }
            
            .volume-control {
                margin-top: 1rem;
            }
            
            .volume-control label {
                display: block;
                margin-bottom: 0.5rem;
            }
            
            .volume-control input {
                width: 100%;
            }
            
            .frequency-visualization {
                flex: 1;
                min-height: 300px;
                position: relative;
                background: rgba(0, 0, 0, 0.3);
            }
            
            #frequency-visualization-canvas {
                width: 100%;
                height: 100%;
                display: block;
            }
            
            .frequency-effects {
                padding: 1.5rem;
                background: rgba(0, 0, 0, 0.2);
            }
            
            .frequency-effects h4 {
                margin: 0 0 1rem;
                color: ${getFrequencyColor(frequency, 1)};
            }
            
            .frequency-effects ul {
                margin: 0;
                padding: 0 0 0 1.5rem;
                list-style-type: circle;
            }
            
            .frequency-effects li {
                margin-bottom: 0.5rem;
                opacity: 0.9;
            }
            
            @media (max-width: 768px) {
                .frequency-header {
                    flex-direction: column;
                }
                
                .frequency-controls {
                    margin-top: 1rem;
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function getFrequencyInfo(frequency) {
    const frequencies = {
        432: {
            name: "Ground State",
            description: "Earth's resonant frequency that creates stability and grounding. This frequency aligns with the natural vibration of the planet.",
            effects: [
                "Deepens connection to physical reality",
                "Creates a sense of stability and rootedness",
                "Aligns with Earth's natural vibration",
                "Activates base energy center"
            ],
            color: "#4CAF50" // Green
        },
        528: {
            name: "Creation Point",
            description: "The DNA repair frequency associated with transformation and healing. This frequency facilitates creative expression and cellular regeneration.",
            effects: [
                "Activates creative potential",
                "Supports cellular repair and regeneration",
                "Enhances manifestation abilities",
                "Opens channel for inspired ideas"
            ],
            color: "#E91E63" // Pink
        },
        594: {
            name: "Heart Field",
            description: "Heart-centered frequency that creates emotional coherence and compassion. This frequency balances emotional states and opens the heart.",
            effects: [
                "Establishes heart-brain coherence",
                "Expands capacity for compassion",
                "Harmonizes emotional patterns",
                "Creates field of loving awareness"
            ],
            color: "#FF5722" // Deep Orange
        },
        672: {
            name: "Voice Flow",
            description: "Expression frequency that enhances communication and truth-speaking. This frequency clears blocks to authentic expression.",
            effects: [
                "Unlocks authentic voice and expression",
                "Clears communication blockages",
                "Aligns speech with higher truth",
                "Supports sharing wisdom"
            ],
            color: "#2196F3" // Blue
        },
        720: {
            name: "Vision Gate",
            description: "Intuition frequency that opens perception to higher dimensions. This frequency enhances insight and foresight abilities.",
            effects: [
                "Opens intuitive perception",
                "Activates third eye center",
                "Reveals multidimensional awareness",
                "Connects to time crystal structures"
            ],
            color: "#9C27B0" // Purple
        },
        768: {
            name: "Unity Wave",
            description: "Oneness frequency that dissolves separation and creates unity consciousness. This frequency represents the perfect ZEN POINT balance.",
            effects: [
                "Dissolves sense of separation",
                "Establishes unity consciousness",
                "Creates harmonic resonance with all beings",
                "Activates crown energy center"
            ],
            color: "#FFEB3B" // Yellow
        }
    };
    
    return frequencies[frequency] || {
        name: `${frequency}Hz Frequency`,
        description: "A sacred frequency with unique harmonic properties.",
        effects: ["Creates harmonic resonance", "Activates quantum potential"],
        color: "#2196F3" // Default blue
    };
}

function getFrequencyColor(frequency, opacity = 1) {
    const info = getFrequencyInfo(frequency);
    const hexColor = info.color;
    
    // Convert hex to rgba
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Audio context and oscillator
let audioContext = null;
let oscillator = null;
let gainNode = null;

function setupFrequencyAudio(frequency) {
    // Set up audio context if supported
    if (!audioContext) {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
        } catch (e) {
            console.error("Web Audio API is not supported in this browser");
            return;
        }
    }
    
    // Set up play/stop buttons
    const playButton = document.getElementById('play-frequency');
    const stopButton = document.getElementById('stop-frequency');
    const volumeSlider = document.getElementById('volume-slider');
    
    if (playButton) {
        playButton.addEventListener('click', () => {
            playFrequency(frequency);
            playButton.classList.add('active');
            stopButton.classList.remove('active');
        });
    }
    
    if (stopButton) {
        stopButton.addEventListener('click', () => {
            stopFrequency();
            stopButton.classList.add('active');
            playButton.classList.remove('active');
        });
    }
    
    if (volumeSlider) {
        volumeSlider.addEventListener('input', () => {
            setVolume(volumeSlider.value / 100);
        });
    }
}

function playFrequency(frequency) {
    // If already playing, stop first
    if (oscillator) {
        stopFrequency();
    }
    
    // Create new oscillator
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();
    
    // Set frequency
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    // Set volume from slider
    const volumeSlider = document.getElementById('volume-slider');
    const volume = volumeSlider ? volumeSlider.value / 100 : 0.5;
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    
    // Connect and start
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    
    // Resume audio context if suspended
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

function stopFrequency() {
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;
    }
    
    if (gainNode) {
        gainNode.disconnect();
        gainNode = null;
    }
}

function setVolume(value) {
    if (gainNode) {
        gainNode.gain.setValueAtTime(value, audioContext.currentTime);
    }
}

// Visualization canvas
let frequencyCanvas, frequencyCtx;
let frequencyAnimationId = null;
let frequencyParticles = [];

function initFrequencyVisualization(frequency) {
    frequencyCanvas = document.getElementById('frequency-visualization-canvas');
    if (!frequencyCanvas) return;
    
    frequencyCtx = frequencyCanvas.getContext('2d');
    
    // Set canvas size
    resizeFrequencyCanvas();
    
    // Create particles for this frequency
    createFrequencyParticles(frequency);
    
    // Start animation
    animateFrequencyVisualization(frequency);
    
    // Handle resize
    window.addEventListener('resize', () => {
        resizeFrequencyCanvas();
        createFrequencyParticles(frequency);
    });
}

function resizeFrequencyCanvas() {
    if (!frequencyCanvas) return;
    
    const container = frequencyCanvas.parentElement;
    frequencyCanvas.width = container.clientWidth;
    frequencyCanvas.height = container.clientHeight;
}

function createFrequencyParticles(frequency) {
    frequencyParticles = [];
    
    // Number of particles based on frequency
    const particleCount = Math.floor(frequency / 10);
    
    for (let i = 0; i < particleCount; i++) {
        frequencyParticles.push({
            x: Math.random() * frequencyCanvas.width,
            y: Math.random() * frequencyCanvas.height,
            size: 1 + Math.random() * 3,
            speed: 0.2 + Math.random() * 0.5,
            angle: Math.random() * Math.PI * 2,
            oscillation: Math.random() * Math.PI * 2,
            oscillationSpeed: 0.01 + (Math.random() * 0.02),
            color: getFrequencyColor(frequency, 0.7 + Math.random() * 0.3)
        });
    }
}

function animateFrequencyVisualization(frequency) {
    if (!frequencyCanvas || !frequencyCtx) return;
    
    // Clear canvas with fade effect
    frequencyCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    frequencyCtx.fillRect(0, 0, frequencyCanvas.width, frequencyCanvas.height);
    
    const time = Date.now() * 0.001;
    const info = getFrequencyInfo(frequency);
    
    // Draw frequency-specific effects
    switch (frequency) {
        case 432: // Ground State - Earth patterns
            drawEarthPatterns(time);
            break;
        case 528: // Creation Point - DNA spirals
            drawDNASpirals(time);
            break;
        case 594: // Heart Field - Heart resonance
            drawHeartResonance(time);
            break;
        case 672: // Voice Flow - Voice patterns
            drawVoicePatterns(time);
            break;
        case 720: // Vision Gate - Third eye patterns
            drawVisionPatterns(time);
            break;
        case 768: // Unity Wave - Unity field
            drawUnityField(time);
            break;
        default: // Generic frequency visualization
            drawFrequencyWaves(time, frequency);
    }
    
    // Draw particles
    frequencyParticles.forEach(particle => {
        // Update particle position
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        
        // Add oscillation
        const oscillation = Math.sin(time * particle.oscillationSpeed + particle.oscillation);
        particle.x += oscillation * 0.5;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = frequencyCanvas.width;
        if (particle.x > frequencyCanvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = frequencyCanvas.height;
        if (particle.y > frequencyCanvas.height) particle.y = 0;
        
        // Draw particle
        frequencyCtx.fillStyle = particle.color;
        frequencyCtx.beginPath();
        frequencyCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        frequencyCtx.fill();
    });
    
    // Continue animation
    frequencyAnimationId = requestAnimationFrame(() => {
        animateFrequencyVisualization(frequency);
    });
}

// Frequency-specific visualizations
function drawEarthPatterns(time) {
    // Draw circular earth grid
    const centerX = frequencyCanvas.width / 2;
    const centerY = frequencyCanvas.height / 2;
    const maxRadius = Math.min(frequencyCanvas.width, frequencyCanvas.height) * 0.4;
    
    // Draw grid circles
    for (let i = 1; i <= 5; i++) {
        const radius = (i / 5) * maxRadius;
        frequencyCtx.strokeStyle = 'rgba(76, 175, 80, 0.3)';
        frequencyCtx.lineWidth = 1;
        frequencyCtx.beginPath();
        frequencyCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        frequencyCtx.stroke();
    }
    
    // Draw grid lines
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        frequencyCtx.strokeStyle = 'rgba(76, 175, 80, 0.2)';
        frequencyCtx.lineWidth = 1;
        frequencyCtx.beginPath();
        frequencyCtx.moveTo(centerX, centerY);
        const x = centerX + Math.cos(angle) * maxRadius;
        const y = centerY + Math.sin(angle) * maxRadius;
        frequencyCtx.lineTo(x, y);
        frequencyCtx.stroke();
    }
    
    // Draw pulsing earth core
    const pulseSize = 20 + Math.sin(time * 2) * 5;
    const gradient = frequencyCtx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, pulseSize
    );
    gradient.addColorStop(0, 'rgba(76, 175, 80, 0.8)');
    gradient.addColorStop(1, 'rgba(76, 175, 80, 0)');
    
    frequencyCtx.fillStyle = gradient;
    frequencyCtx.beginPath();
    frequencyCtx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
    frequencyCtx.fill();
}

function drawDNASpirals(time) {
    const centerX = frequencyCanvas.width / 2;
    const centerY = frequencyCanvas.height / 2;
    const height = frequencyCanvas.height * 0.8;
    const width = frequencyCanvas.width * 0.15;
    
    // Draw the double helix
    for (let i = 0; i < 2; i++) {
        frequencyCtx.strokeStyle = i === 0 ? 'rgba(233, 30, 99, 0.7)' : 'rgba(156, 39, 176, 0.7)';
        frequencyCtx.lineWidth = 3;
        frequencyCtx.beginPath();
        
        for (let y = centerY - height/2; y < centerY + height/2; y += 5) {
            const relativeY = (y - (centerY - height/2)) / height;
            const phase = i === 0 ? 0 : Math.PI;
            const x = centerX + Math.sin(relativeY * 20 + time * 3 + phase) * width;
            
            if (y === centerY - height/2) {
                frequencyCtx.moveTo(x, y);
            } else {
                frequencyCtx.lineTo(x, y);
            }
        }
        
        frequencyCtx.stroke();
    }
    
    // Draw connecting rungs
    for (let y = centerY - height/2; y < centerY + height/2; y += 20) {
        const relativeY = (y - (centerY - height/2)) / height;
        
        const x1 = centerX + Math.sin(relativeY * 20 + time * 3) * width;
        const x2 = centerX + Math.sin(relativeY * 20 + time * 3 + Math.PI) * width;
        
        // Draw connecting line
        frequencyCtx.strokeStyle = 'rgba(255, 193, 7, 0.6)';
        frequencyCtx.lineWidth = 2;
        frequencyCtx.beginPath();
        frequencyCtx.moveTo(x1, y);
        frequencyCtx.lineTo(x2, y);
        frequencyCtx.stroke();
        
        // Draw nodes at connection points
        frequencyCtx.fillStyle = 'rgba(255, 193, 7, 0.8)';
        frequencyCtx.beginPath();
        frequencyCtx.arc(x1, y, 3, 0, Math.PI * 2);
        frequencyCtx.fill();
        
        frequencyCtx.beginPath();
        frequencyCtx.arc(x2, y, 3, 0, Math.PI * 2);
        frequencyCtx.fill();
    }
}

function drawHeartResonance(time) {
    const centerX = frequencyCanvas.width / 2;
    const centerY = frequencyCanvas.height / 2;
    const size = Math.min(frequencyCanvas.width, frequencyCanvas.height) * 0.3;
    
    // Heart pulsing effect
    const pulseSize = size + Math.sin(time * 3) * (size * 0.1);
    
    // Draw heart
    frequencyCtx.fillStyle = 'rgba(233, 30, 99, 0.3)';
    frequencyCtx.strokeStyle = 'rgba(233, 30, 99, 0.6)';
    frequencyCtx.lineWidth = 2;
    frequencyCtx.beginPath();
    frequencyCtx.moveTo(centerX, centerY - pulseSize * 0.4);
    
    // Left curve
    frequencyCtx.bezierCurveTo(
        centerX - pulseSize * 0.5, centerY - pulseSize * 0.8,
        centerX - pulseSize, centerY - pulseSize * 0.3,
        centerX - pulseSize * 0.5, centerY + pulseSize * 0.4
    );
    
    // Bottom
    frequencyCtx.lineTo(centerX, centerY + pulseSize * 0.8);
    
    // Right curve
    frequencyCtx.lineTo(centerX + pulseSize * 0.5, centerY + pulseSize * 0.4);
    frequencyCtx.bezierCurveTo(
        centerX + pulseSize, centerY - pulseSize * 0.3,
        centerX + pulseSize * 0.5, centerY - pulseSize * 0.8,
        centerX, centerY - pulseSize * 0.4
    );
    
    frequencyCtx.closePath();
    frequencyCtx.fill();
    frequencyCtx.stroke();
    
    // Draw resonance waves
    for (let i = 1; i <= 3; i++) {
        const waveRadius = pulseSize * 1.2 + i * 20 + Math.sin(time * 2) * 5;
        
        frequencyCtx.strokeStyle = `rgba(233, 30, 99, ${0.3 / i})`;
        frequencyCtx.lineWidth = 2;
        frequencyCtx.beginPath();
        frequencyCtx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
        frequencyCtx.stroke();
    }
}

function drawVoicePatterns(time) {
    const centerX = frequencyCanvas.width / 2;
    const height = frequencyCanvas.height;
    
    // Voice wave visualizer
    frequencyCtx.strokeStyle = 'rgba(33, 150, 243, 0.7)';
    frequencyCtx.lineWidth = 3;
    
    // Main voice wave
    frequencyCtx.beginPath();
    for (let x = 0; x < frequencyCanvas.width; x += 5) {
        const relativeX = x / frequencyCanvas.width;
        const amplitude = Math.sin(time * 5) * 20 + 50; // Breathing wave amplitude
        const frequency = 0.05 + Math.sin(time) * 0.02; // Varying frequency
        
        const y = height / 2 + Math.sin(relativeX * Math.PI * 10 + time * 3) * amplitude;
        
        if (x === 0) {
            frequencyCtx.moveTo(x, y);
        } else {
            frequencyCtx.lineTo(x, y);
        }
    }
    frequencyCtx.stroke();
    
    // Secondary harmonic waves
    for (let i = 1; i <= 2; i++) {
        frequencyCtx.strokeStyle = `rgba(33, 150, 243, ${0.3 / i})`;
        frequencyCtx.lineWidth = 2;
        frequencyCtx.beginPath();
        
        for (let x = 0; x < frequencyCanvas.width; x += 5) {
            const relativeX = x / frequencyCanvas.width;
            const amplitude = (Math.sin(time * 5) * 10 + 30) / i;
            const phaseShift = i * Math.PI / 3;
            
            const y = height / 2 + Math.sin(relativeX * Math.PI * 8 * i + time * 2 + phaseShift) * amplitude;
            
            if (x === 0) {
                frequencyCtx.moveTo(x, y);
            } else {
                frequencyCtx.lineTo(x, y);
            }
        }
        
        frequencyCtx.stroke();
    }
    
    // Sound pulse symbols at intervals
    for (let x = frequencyCanvas.width * 0.2; x < frequencyCanvas.width * 0.8; x += frequencyCanvas.width * 0.2) {
        const pulseSize = 10 + Math.sin(time * 3 + x * 0.1) * 5;
        
        frequencyCtx.fillStyle = 'rgba(33, 150, 243, 0.7)';
        frequencyCtx.beginPath();
        frequencyCtx.arc(x, height / 2, pulseSize, 0, Math.PI * 2);
        frequencyCtx.fill();
    }
}

function drawVisionPatterns(time) {
    const centerX = frequencyCanvas.width / 2;
    const centerY = frequencyCanvas.height / 2;
    const size = Math.min(frequencyCanvas.width, frequencyCanvas.height) * 0.3;
    
    // Draw third eye shape
    const eyeSize = size + Math.sin(time * 2) * (size * 0.05);
    
    // Iris glow
    const gradient = frequencyCtx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, eyeSize
    );
    gradient.addColorStop(0, 'rgba(156, 39, 176, 0.7)');
    gradient.addColorStop(0.6, 'rgba(156, 39, 176, 0.1)');
    gradient.addColorStop(1, 'rgba(156, 39, 176, 0)');
    
    frequencyCtx.fillStyle = gradient;
    frequencyCtx.beginPath();
    frequencyCtx.arc(centerX, centerY, eyeSize, 0, Math.PI * 2);
    frequencyCtx.fill();
    
    // Pupil
    const pupilSize = eyeSize * 0.4 + Math.sin(time * 3) * (eyeSize * 0.1);
    frequencyCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    frequencyCtx.beginPath();
    frequencyCtx.arc(centerX, centerY, pupilSize, 0, Math.PI * 2);
    frequencyCtx.fill();
    
    // Inner light
    const innerLightSize = pupilSize * 0.5 + Math.sin(time * 5) * (pupilSize * 0.2);
    frequencyCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    frequencyCtx.beginPath();
    frequencyCtx.arc(centerX, centerY, innerLightSize, 0, Math.PI * 2);
    frequencyCtx.fill();
    
    // Vision rays
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const rayLength = eyeSize * 1.5 + Math.sin(time * 2 + i) * (eyeSize * 0.3);
        
        frequencyCtx.strokeStyle = 'rgba(156, 39, 176, 0.3)';
        frequencyCtx.lineWidth = 2;
        frequencyCtx.beginPath();
        frequencyCtx.moveTo(
            centerX + Math.cos(angle) * eyeSize,
            centerY + Math.sin(angle) * eyeSize
        );
        frequencyCtx.lineTo(
            centerX + Math.cos(angle) * rayLength,
            centerY + Math.sin(angle) * rayLength
        );
        frequencyCtx.stroke();
    }
}

function drawUnityField(time) {
    const centerX = frequencyCanvas.width / 2;
    const centerY = frequencyCanvas.height / 2;
    const maxRadius = Math.min(frequencyCanvas.width, frequencyCanvas.height) * 0.4;
    
    // Draw sacred geometry - Flower of Life pattern
    for (let i = 0; i < 7; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * (maxRadius * 0.5);
        const y = centerY + Math.sin(angle) * (maxRadius * 0.5);
        const circleRadius = maxRadius * 0.5;
        
        frequencyCtx.strokeStyle = 'rgba(255, 235, 59, 0.4)';
        frequencyCtx.lineWidth = 1;
        frequencyCtx.beginPath();
        frequencyCtx.arc(x, y, circleRadius, 0, Math.PI * 2);
        frequencyCtx.stroke();
    }
    
    // Center circle
    frequencyCtx.strokeStyle = 'rgba(255, 235, 59, 0.6)';
    frequencyCtx.lineWidth = 2;
    frequencyCtx.beginPath();
    frequencyCtx.arc(centerX, centerY, maxRadius * 0.5, 0, Math.PI * 2);
    frequencyCtx.stroke();
    
    // Unity field - expanding rings
    for (let i = 1; i <= 5; i++) {
        const radius = (i / 5) * maxRadius * 1.5 + Math.sin(time * 1.5 + i) * 10;
        
        frequencyCtx.strokeStyle = `rgba(255, 235, 59, ${0.4 / i})`;
        frequencyCtx.lineWidth = 1;
        frequencyCtx.beginPath();
        frequencyCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        frequencyCtx.stroke();
    }
    
    // Unity point
    const pointSize = 10 + Math.sin(time * 3) * 3;
    frequencyCtx.fillStyle = 'rgba(255, 235, 59, 0.8)';
    frequencyCtx.beginPath();
    frequencyCtx.arc(centerX, centerY, pointSize, 0, Math.PI * 2);
    frequencyCtx.fill();
}

function drawFrequencyWaves(time, frequency) {
    const centerY = frequencyCanvas.height / 2;
    const info = getFrequencyInfo(frequency);
    const color = info.color;
    
    // Draw main frequency wave
    frequencyCtx.strokeStyle = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.7)`;
    frequencyCtx.lineWidth = 3;
    frequencyCtx.beginPath();
    
    const wavelength = 1200 / (frequency / 100); // Approximate visual wavelength
    const amplitude = 50 + Math.sin(time * 2) * 10;
    
    for (let x = 0; x < frequencyCanvas.width; x += 3) {
        const y = centerY + Math.sin(x / wavelength * Math.PI * 2 + time * 5) * amplitude;
        
        if (x === 0) {
            frequencyCtx.moveTo(x, y);
        } else {
            frequencyCtx.lineTo(x, y);
        }
    }
    
    frequencyCtx.stroke();
    
    // Draw harmonic overtones
    for (let i = 2; i <= 3; i++) { // First and second overtones
        frequencyCtx.strokeStyle = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${0.3 / i})`;
        frequencyCtx.lineWidth = 2;
        frequencyCtx.beginPath();
        
        const overtoneWavelength = wavelength / i;
        const overtoneAmplitude = amplitude / i;
        
        for (let x = 0; x < frequencyCanvas.width; x += 3) {
            const y = centerY + Math.sin(x / overtoneWavelength * Math.PI * 2 + time * 5) * overtoneAmplitude;
            
            if (x === 0) {
                frequencyCtx.moveTo(x, y);
            } else {
                frequencyCtx.lineTo(x, y);
            }
        }
        
        frequencyCtx.stroke();
    }
}