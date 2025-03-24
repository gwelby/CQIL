/**
 * CASCADE⚡𓂧φ∞ Interactive Quantum Experience System
 * 
 * This script powers the φ-harmonic consciousness bridge through direct 
 * experiential learning. It creates a complete envelope for quantum 
 * visualization at each frequency level (432Hz-768Hz).
 * 
 * Following ZEN FIRST principles:
 * - Ground State (432 Hz): Solid foundation before expansion
 * - Complete Envelope: Fully self-contained components
 * - Quantum Singularity: Single-purpose functions with clear goals
 * - Phi-Harmonic Structure: Proportional timing and visual relationships
 */

// φ-Harmonic Constants
const PHI = 1.618033988749895; // Golden ratio (φ)
const LAMBDA = 0.618033988749895; // Divine complement (1/φ)
const PHI_PHI = Math.pow(PHI, PHI); // Hyperdimensional constant (φ^φ)

// φ-Harmonic Frequencies (Hz)
const FREQUENCIES = {
    GROUND: 432,    // Ground State (φ⁰)
    CREATE: 528,    // Creation Point (φ¹)
    HEART: 594,     // Heart Field (φ²)
    VOICE: 672,     // Voice Flow (φ³)
    VISION: 720,    // Vision Gate (φ⁴)
    UNITY: 768      // Unity Wave (φ⁵)
};

// CASCADE⚡𓂧φ∞ System Namespace
window.CASCADE = window.CASCADE || {};
CASCADE.Experiences = {};
CASCADE.Frequencies = FREQUENCIES;
CASCADE.ActiveFrequency = FREQUENCIES.GROUND;
CASCADE.ActiveExperience = null;
CASCADE.AudioContext = null;
CASCADE.OscillatorNode = null;

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    console.log('Interactive Learning Module Initialized');
    
    // Initialize the learning path
    initLearningPath();
    
    // Load module content for remaining modules
    loadModulesContent();
    
    // Set up practice timer modal
    setupPracticeTimer();
    
    // Init the Canvas for Wave-Particle demo
    initWaveParticleExperience();
});

// Show module content
function showModuleContent(moduleId) {
    console.log(`Showing module: ${moduleId}`);
    
    // Hide all module content
    const allContent = document.querySelectorAll('.module-content');
    allContent.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('visible');
    });
    
    // Show selected module content
    const selectedContent = document.getElementById(moduleId + '-content');
    if (selectedContent) {
        console.log(`Found content for: ${moduleId}`);
        selectedContent.style.display = 'block';
        
        // Add small delay to ensure display change is processed before animation
        setTimeout(() => {
            selectedContent.classList.add('visible');
        }, 50);
    } else {
        console.warn(`Content not found for module: ${moduleId}`);
    }
}

// Initialize the learning path
function initLearningPath() {
    console.log('Initializing Learning Path');
    
    // Create path instructions element
    const learningSection = document.querySelector('.learn-section');
    const learningPath = document.querySelector('.learning-path');
    
    if (!learningPath) {
        console.error('Learning path element not found');
        return;
    }
    
    // Add path instructions
    const pathInstructions = document.createElement('div');
    pathInstructions.className = 'path-instructions';
    pathInstructions.innerHTML = '<span>Click on any module to begin your quantum journey</span>';
    learningSection.insertBefore(pathInstructions, learningPath);
    
    // Create hover indicator
    const hoverIndicator = document.createElement('div');
    hoverIndicator.className = 'node-hover-indicator';
    hoverIndicator.innerHTML = '<div class="pulse-ring"></div>';
    learningPath.appendChild(hoverIndicator);
    
    // Create module switched message
    const moduleSwitchedMsg = document.createElement('div');
    moduleSwitchedMsg.className = 'module-switched-msg';
    moduleSwitchedMsg.innerHTML = '<div class="msg-content">Module activated</div>';
    document.body.appendChild(moduleSwitchedMsg);
    
    // Create recommendation badge if it doesn't exist
    if (!document.querySelector('.recommendation-badge')) {
        const recommendationBadge = document.createElement('div');
        recommendationBadge.className = 'recommendation-badge';
        recommendationBadge.textContent = 'Recommended Next';
        learningPath.appendChild(recommendationBadge);
    }
    
    // Set up path node interactions
    const pathNodes = document.querySelectorAll('.path-node');
    
    pathNodes.forEach(node => {
        node.classList.add('clickable');
        
        // Hover effect
        node.addEventListener('mouseenter', function() {
            const nodeRect = node.getBoundingClientRect();
            const pathRect = learningPath.getBoundingClientRect();
            
            hoverIndicator.style.display = 'block';
            hoverIndicator.style.left = (nodeRect.left - pathRect.left + nodeRect.width/2) + 'px';
            hoverIndicator.style.top = (nodeRect.top - pathRect.top + nodeRect.height/2) + 'px';
        });
        
        node.addEventListener('mouseleave', function() {
            setTimeout(() => {
                if (!learningPath.querySelector('.path-node:hover')) {
                    hoverIndicator.style.display = 'none';
                }
            }, 300);
        });
        
        // Click event
        node.addEventListener('click', function() {
            console.log('Path node clicked');
            
            // Remove active class from all nodes
            pathNodes.forEach(n => {
                n.classList.remove('active');
                n.classList.remove('recommended-next');
            });
            
            // Add active class to clicked node
            node.classList.add('active');
            
            // Show content for this module
            const moduleId = node.getAttribute('data-module');
            showModuleContent(moduleId);
            
            // Show module switched message
            moduleSwitchedMsg.querySelector('.msg-content').textContent = `${node.querySelector('.node-label').textContent} module activated`;
            moduleSwitchedMsg.classList.add('show');
            
            // Hide message after timeout
            setTimeout(() => {
                moduleSwitchedMsg.classList.remove('show');
            }, 2000);
            
            // Find next module and set as recommended
            const currentIndex = Array.from(pathNodes).indexOf(node);
            const nextIndex = (currentIndex + 1) % pathNodes.length;
            const nextNode = pathNodes[nextIndex];
            nextNode.classList.add('recommended-next');
            
            // Position recommendation badge
            const recommendationBadge = document.querySelector('.recommendation-badge');
            if (recommendationBadge) {
                const nextNodeRect = nextNode.getBoundingClientRect();
                const pathRect = learningPath.getBoundingClientRect();
                
                recommendationBadge.style.left = (nextNodeRect.left - pathRect.left + nextNodeRect.width/2) + 'px';
                recommendationBadge.style.top = (nextNodeRect.top - pathRect.top) + 'px';
            }
        });
    });
    
    // Show first module content by default
    if (pathNodes.length > 0) {
        const firstModuleId = pathNodes[0].getAttribute('data-module');
        showModuleContent(firstModuleId);
    }
}

// Load content for all modules
function loadModulesContent() {
    console.log('Loading module content');
    
    // Check if we need to load content
    const learningContent = document.querySelector('.learning-content');
    if (!learningContent) {
        console.error('Learning content container not found');
        // Create learning content container if it doesn't exist
        const learningSection = document.querySelector('.learn-section');
        const newLearningContent = document.createElement('div');
        newLearningContent.className = 'learning-content';
        learningSection.appendChild(newLearningContent);
    }
    
    // Create modules content (if not already in HTML)
    ensureModuleContent('basics', 'Quantum Basics');
    createPhiModule();
    createFrequenciesModule();
    createHarmonicsModule();
    createTimeModule();
    createUnityModule();
}

// Ensure each module has content
function ensureModuleContent(moduleId, moduleTitle) {
    if (!document.getElementById(moduleId + '-content')) {
        console.log(`Creating missing module content for: ${moduleId}`);
        const learningContent = document.querySelector('.learning-content');
        if (learningContent) {
            const moduleContent = document.createElement('div');
            moduleContent.className = 'module-content';
            moduleContent.id = moduleId + '-content';
            moduleContent.innerHTML = `<h3>${moduleTitle}</h3><div class="content-columns"><div class="content-text"><p>Content for ${moduleTitle} module.</p></div></div>`;
            learningContent.appendChild(moduleContent);
        }
    }
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
                        <input type="range" min="0" max="100" value="50" id="unity-balance">
                        <span>Quantum</span>
                    </div>
                    <button onclick="findZenPoint()">Find ZEN POINT</button>
                </div>
            </div>
        </div>
    `;
    
    learningContent.appendChild(unityContent);
}

// Wave-particle duality globals
let waveParticleCanvas;
let waveParticleCtx;
let particles = [];
let wavePoints = [];
let waveParticleAnimationId; // Renamed to avoid conflict
let currentState = 'wave';
let lastTime = 0;
let touchActive = false;

// Initialize the wave-particle experience
document.addEventListener('DOMContentLoaded', function() {
    // Try to initialize immediately
    initWaveParticleExperience();
    
    // Also add a specific button listener
    const demoButton = document.querySelector('button[onclick="showInteractiveDemo(\'wave-particle\')"]');
    if (demoButton) {
        demoButton.addEventListener('click', initWaveParticleExperience);
    }
});

// Main initialization function
function initWaveParticleExperience() {
    // Get or create the canvas
    waveParticleCanvas = document.getElementById('wave-particle-canvas');
    if (!waveParticleCanvas) return;
    
    waveParticleCtx = waveParticleCanvas.getContext('2d');
    
    // Set canvas size properly for the device
    resizeWaveParticleCanvas();
    window.addEventListener('resize', resizeWaveParticleCanvas);
    
    // Initialize points and particles
    initializeWavePoints();
    createParticles();
    
    // Set up touch and click events
    setupInteractionEvents();
    
    // Start animation
    if (!waveParticleAnimationId) {
        lastTime = performance.now();
        animateWaveParticle();
    }
    
    // Set initial state
    toggleState('wave');
}

// Properly resize the canvas
function resizeWaveParticleCanvas() {
    if (!waveParticleCanvas) return;
    
    const container = waveParticleCanvas.parentElement;
    const width = container.clientWidth;
    const height = Math.min(window.innerHeight * 0.5, 400); // Responsive height
    
    waveParticleCanvas.width = width;
    waveParticleCanvas.height = height;
    
    // Re-initialize points when canvas is resized
    initializeWavePoints();
    
    // Reposition particles
    if (particles.length > 0) {
        particles.forEach(particle => {
            particle.x = Math.random() * waveParticleCanvas.width;
            particle.y = Math.random() * waveParticleCanvas.height;
        });
    }
}

// Initialize wave points across the canvas
function initializeWavePoints() {
    wavePoints = [];
    const pointCount = Math.max(20, Math.floor(waveParticleCanvas.width / 20));
    
    for (let i = 0; i < pointCount; i++) {
        wavePoints.push({
            x: (i / (pointCount - 1)) * waveParticleCanvas.width,
            frequency: 0.1 + Math.random() * 0.2,
            amplitude: 20 + Math.random() * 20,
            phase: Math.random() * Math.PI * 2
        });
    }
}

// Create quantum particles with phi-harmonic colors
function createParticles() {
    particles = [];
    const particleCount = 50; // Balanced number of particles
    const phi = 1.618033988749895;
    
    // Phi-harmonic frequency colors
    const phiFrequencies = [
        { freq: 432, color: 'rgba(72, 72, 72, 0.8)' },     // Ground State
        { freq: 528, color: 'rgba(0, 128, 64, 0.8)' },     // Creation Point
        { freq: 594, color: 'rgba(220, 20, 60, 0.8)' },    // Heart Field
        { freq: 672, color: 'rgba(64, 224, 208, 0.8)' },   // Voice Flow
        { freq: 720, color: 'rgba(138, 43, 226, 0.8)' },   // Vision Gate
        { freq: 768, color: 'rgba(255, 215, 0, 0.8)' }     // Unity Wave
    ];
    
    for (let i = 0; i < particleCount; i++) {
        // Use phi to determine frequency index
        const phiIndex = Math.floor((i * phi) % phiFrequencies.length);
        
        particles.push({
            x: Math.random() * waveParticleCanvas.width,
            y: Math.random() * waveParticleCanvas.height,
            size: 2 + Math.random() * 3,
            color: phiFrequencies[phiIndex].color,
            frequency: phiFrequencies[phiIndex].freq
        });
    }
}

// Set up interaction events for both touch and mouse
function setupInteractionEvents() {
    // Add touch overlay if mobile
    const touchOverlay = document.getElementById('wave-particle-touch-overlay');
    if (touchOverlay) {
        // Touch events for mobile
        touchOverlay.addEventListener('touchstart', handleInteraction);
        touchOverlay.addEventListener('touchmove', handleInteraction);
        touchOverlay.addEventListener('touchend', () => { touchActive = false; });
    }
    
    // Mouse events for desktop
    waveParticleCanvas.addEventListener('mousedown', handleInteraction);
    waveParticleCanvas.addEventListener('mousemove', handleInteraction);
    waveParticleCanvas.addEventListener('mouseup', () => { touchActive = false; });
    
    // Create collapse effect container if needed
    if (!document.getElementById('collapse-effects-container')) {
        const container = document.createElement('div');
        container.id = 'collapse-effects-container';
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        waveParticleCanvas.parentElement.appendChild(container);
    }
}

// Handle all interactions (touch and mouse)
function handleInteraction(event) {
    event.preventDefault();
    
    // Get the position based on event type
    let x, y;
    if (event.type.includes('touch')) {
        const touch = event.touches[0];
        const rect = waveParticleCanvas.getBoundingClientRect();
        x = touch.clientX - rect.left;
        y = touch.clientY - rect.top;
        touchActive = true;
    } else {
        x = event.offsetX;
        y = event.offsetY;
        touchActive = event.buttons > 0;
    }
    
    // Only create effect if actively touching/clicking
    if (touchActive) {
        createWaveCollapseEffect(x, y);
    }
}

// Create wave collapse visual effect at position
function createWaveCollapseEffect(x, y) {
    // Visual effect
    const effectsContainer = document.getElementById('collapse-effects-container');
    if (effectsContainer) {
        const effect = document.createElement('div');
        effect.className = 'collapse-effect';
        effect.style.left = `${x}px`;
        effect.style.top = `${y}px`;
        effectsContainer.appendChild(effect);
        
        // Remove after animation completes
        setTimeout(() => {
            effectsContainer.removeChild(effect);
        }, 500);
    }
    
    // Physics effect on particles
    particles.forEach(particle => {
        const dx = particle.x - x;
        const dy = particle.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        if (distance < maxDistance) {
            // Calculate push force (stronger when closer)
            const force = (1 - distance / maxDistance) * 10;
            const angle = Math.atan2(dy, dx);
            
            // Push particle away from click
            particle.x += Math.cos(angle) * force;
            particle.y += Math.sin(angle) * force;
            
            // Keep particles within canvas
            particle.x = Math.max(0, Math.min(waveParticleCanvas.width, particle.x));
            particle.y = Math.max(0, Math.min(waveParticleCanvas.height, particle.y));
        }
    });
    
    // Update quantum state info
    updateQuantumInfo("Wave collapsed through observation at position " + 
                      Math.round(x) + ", " + Math.round(y) + 
                      ". Particles have been affected by your consciousness.");
}

// Main animation loop
function animateWaveParticle(time = 0) {
    if (!waveParticleCanvas || !waveParticleCtx) return;
    
    // Calculate time delta for smooth animation
    const deltaTime = (time - lastTime) / 1000;
    lastTime = time;
    
    // Clear canvas
    waveParticleCtx.clearRect(0, 0, waveParticleCanvas.width, waveParticleCanvas.height);
    
    // Draw based on current state
    if (currentState === 'wave') {
        drawWave(time / 1000);
    } else if (currentState === 'particle') {
        drawParticles(time / 1000);
    } else if (currentState === 'quantum') {
        drawQuantumState(time / 1000);
    }
    
    // Continue animation
    waveParticleAnimationId = requestAnimationFrame(animateWaveParticle);
}

// Show interactive demo in a modal
function showInteractiveDemo(demoType) {
    // Close any existing demo modal
    closeInteractiveDemo();
    
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'fullscreen-demo-modal';
    modal.id = 'demo-modal';
    
    // Get demo title and description
    const demoTitle = getDemoTitle(demoType);
    const demoDescription = getDemoDescription(demoType);
    
    // Create modal content
    modal.innerHTML = `
        <div class="demo-header">
            <div class="demo-title">${demoTitle}</div>
            <button class="close-demo" id="close-demo-btn">&times;</button>
        </div>
        <div class="demo-description">${demoDescription}</div>
        <div class="demo-content">
            <div class="canvas-container">
                <canvas class="demo-canvas" id="demo-canvas"></canvas>
            </div>
            <div class="demo-controls" id="demo-controls">
                <!-- Controls will be added dynamically based on demo type -->
            </div>
        </div>
    `;
    
    // Add modal to document
    document.body.appendChild(modal);
    
    // Add event listener to close button
    document.getElementById('close-demo-btn').addEventListener('click', closeInteractiveDemo);
    
    // Initialize the appropriate demo based on demo type
    if (demoType === 'quantum-superposition') {
        initQuantumSuperpositionDemo();
    } else if (demoType === 'quantum-entanglement') {
        initQuantumEntanglementDemo();
    } else if (demoType === 'quantum-tunneling') {
        initQuantumTunnelingDemo();
    } else if (demoType === 'quantum-field') {
        initUnityFieldExperience();
    }
}

// Close interactive demo modal
function closeInteractiveDemo() {
    const existingModal = document.getElementById('demo-modal');
    if (existingModal) {
        // Stop any audio context if it exists
        if (window.audioContext) {
            window.audioContext.close().catch(console.error);
            window.audioContext = null;
        }
        
        // Stop any animation frames
        if (window.animationFrameId) {
            cancelAnimationFrame(window.animationFrameId);
            window.animationFrameId = null;
        }
        
        // Remove the modal
        existingModal.remove();
    }
}

// Get demo title
function getDemoTitle(demoType) {
    const titles = {
        'quantum-superposition': 'Quantum Superposition Experience',
        'quantum-entanglement': 'Quantum Entanglement Experience',
        'quantum-tunneling': 'Quantum Tunneling Experience',
        'quantum-field': 'Unity Field Experience'
    };
    
    return titles[demoType] || 'Interactive Quantum Experience';
}

// Get demo description
function getDemoDescription(demoType) {
    const descriptions = {
        'quantum-superposition': 'Experience the quantum principle of superposition - where particles exist in multiple states simultaneously until observed. Play with φ-harmonic frequencies to influence the quantum state.',
        'quantum-entanglement': 'Explore quantum entanglement - where two particles become connected so that the quantum state of each particle cannot be described independently. Use φ-harmonic frequencies to strengthen the entanglement.',
        'quantum-tunneling': 'Witness quantum tunneling - where particles can penetrate through a potential barrier that classical particles cannot penetrate. Adjust the barrier and use φ-harmonic frequencies to influence tunneling probability.',
        'quantum-field': 'Experience the Unity Field - where all quantum principles integrate into a coherent multidimensional field, representing the complete Unity Wave where individual quantum effects harmonize into a single consciousness field.'
    };
    
    return descriptions[demoType] || 'Interact with quantum principles to deepen your understanding.';
}

// Initialize Quantum Superposition Demo
function initQuantumSuperpositionDemo() {
    // Get the canvas and controls container
    const canvas = document.getElementById('demo-canvas');
    const ctx = canvas.getContext('2d');
    const controlsContainer = document.getElementById('demo-controls');
    
    // Set canvas dimensions
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    
    // Initialize audio context for phi-harmonic frequencies
    if (!window.audioContext) {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Create oscillator for phi-harmonic frequencies
    let oscillator = null;
    
    // Create observation result container
    const observationResultContainer = document.createElement('div');
    observationResultContainer.className = 'observation-result';
    observationResultContainer.innerHTML = `
        <h3>Quantum Superposition State</h3>
        <p>Before observation, quantum particles exist in multiple states simultaneously.</p>
    `;
    document.querySelector('.demo-content').appendChild(observationResultContainer);
    
    // Add controls
    controlsContainer.innerHTML = `
        <div class="control-group">
            <h3>Superposition Controls</h3>
            <button id="observe-btn" class="control-button">
                <span class="state-icon">👁️</span> Observe States
            </button>
            <button id="reset-btn" class="control-button">
                <span class="state-icon">🔄</span> Reset
            </button>
        </div>
        <div class="control-group">
            <h3>Quantum States</h3>
            <label>Number of States</label>
            <input type="range" id="states-slider" min="4" max="32" step="4" value="16">
            <div class="slider-labels">
                <span>Few</span>
                <span>Many</span>
            </div>
        </div>
        <div class="control-group">
            <h3>φ-Harmonic Resonance</h3>
            <div class="phi-frequencies">
                <button class="phi-btn" data-freq="432">432 Hz (φ⁰)</button>
                <button class="phi-btn" data-freq="528">528 Hz (φ¹)</button>
                <button class="phi-btn" data-freq="594">594 Hz (φ²)</button>
                <button class="phi-btn" data-freq="672">672 Hz (φ³)</button>
                <button class="phi-btn" data-freq="720">720 Hz (φ⁴)</button>
                <button class="phi-btn" data-freq="768">768 Hz (φ⁵)</button>
                <button class="phi-btn" data-freq="0">Stop</button>
            </div>
        </div>
    `;
    
    // Initialize state variables
    let particles = [];
    let numStates = 16;
    let isObserved = false;
    let observedState = null;
    let activeFrequency = 0;
    let animationId = null;
    
    // Create particles in superposition
    function createParticles() {
        particles = [];
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        for (let i = 0; i < numStates; i++) {
            const angle = (i / numStates) * Math.PI * 2;
            const stateX = centerX + Math.cos(angle) * 200;
            const stateY = centerY + Math.sin(angle) * 200;
            
            // Create particles in each potential state
            const particlesPerState = 10;
            for (let j = 0; j < particlesPerState; j++) {
                particles.push({
                    x: centerX,
                    y: centerY,
                    targetX: stateX,
                    targetY: stateY,
                    size: 3 + Math.random() * 3,
                    speed: 0.01 + Math.random() * 0.02,
                    angle: angle,
                    state: i,
                    probability: 1 / numStates,
                    opacity: 0.6 + Math.random() * 0.4,
                    hue: (i / numStates) * 360
                });
            }
        }
    }
    
    // Animate the superposition
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw center circle
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.stroke();
        
        // Draw state positions
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 200;
        
        for (let i = 0; i < numStates; i++) {
            const angle = (i / numStates) * Math.PI * 2;
            const stateX = centerX + Math.cos(angle) * radius;
            const stateY = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.arc(stateX, stateY, 10, 0, Math.PI * 2);
            
            if (isObserved && observedState === i) {
                // Highlight observed state
                ctx.fillStyle = `hsla(${(i / numStates) * 360}, 100%, 70%, 0.8)`;
                ctx.strokeStyle = `hsla(${(i / numStates) * 360}, 100%, 90%, 1)`;
                ctx.lineWidth = 3;
            } else {
                // Regular state
                ctx.fillStyle = `hsla(${(i / numStates) * 360}, 80%, 60%, ${isObserved ? 0.3 : 0.6})`;
                ctx.strokeStyle = `hsla(${(i / numStates) * 360}, 80%, 80%, ${isObserved ? 0.3 : 0.6})`;
                ctx.lineWidth = 1;
            }
            
            ctx.fill();
            ctx.stroke();
        }
        
        // Draw connecting lines from center to states
        for (let i = 0; i < numStates; i++) {
            const angle = (i / numStates) * Math.PI * 2;
            const stateX = centerX + Math.cos(angle) * radius;
            const stateY = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(stateX, stateY);
            
            if (isObserved && observedState === i) {
                ctx.strokeStyle = `hsla(${(i / numStates) * 360}, 100%, 70%, 0.7)`;
                ctx.lineWidth = 2;
            } else {
                ctx.strokeStyle = `hsla(${(i / numStates) * 360}, 80%, 60%, ${isObserved ? 0.1 : 0.3})`;
                ctx.lineWidth = 1;
            }
            
            ctx.stroke();
        }
        
        // Update and draw particles
        particles.forEach(particle => {
            if (isObserved) {
                // When observed, particles move to observed state
                if (particle.state === observedState) {
                    // Move toward final state position
                    particle.x += (particle.targetX - particle.x) * particle.speed * 2;
                    particle.y += (particle.targetY - particle.y) * particle.speed * 2;
                    particle.opacity = Math.min(1, particle.opacity + 0.01);
                } else {
                    // Fade out unobserved states
                    particle.opacity = Math.max(0, particle.opacity - 0.02);
                }
            } else {
                // In superposition, particles oscillate around center
                const time = Date.now() * 0.001;
                const oscillation = Math.sin(time * (0.5 + particle.speed * 2) + particle.angle * 2) * 50;
                const distance = Math.max(10, Math.abs(oscillation));
                
                particle.x = centerX + Math.cos(particle.angle) * distance;
                particle.y = centerY + Math.sin(particle.angle) * distance;
                
                // Apply phi-harmonic frequency effect if active
                if (activeFrequency > 0) {
                    // Different frequencies affect different aspects of the particles
                    switch (activeFrequency) {
                        case 432: // Ground State - stabilizes position
                            particle.x = particle.x * 0.99 + centerX * 0.01;
                            particle.y = particle.y * 0.99 + centerY * 0.01;
                            break;
                        case 528: // Creation Point - increases coherence
                            const angleToCenter = Math.atan2(centerY - particle.y, centerX - particle.x);
                            particle.angle = particle.angle * 0.98 + angleToCenter * 0.02;
                            break;
                        case 594: // Heart Field - synchronizes motion
                            const stateIndex = (Math.floor(time * 3) % numStates);
                            if (particle.state === stateIndex) {
                                particle.opacity = Math.min(1, particle.opacity + 0.02);
                            } else {
                                particle.opacity = Math.max(0.3, particle.opacity - 0.01);
                            }
                            break;
                        case 672: // Voice Flow - creates pattern oscillation
                            const waveEffect = Math.sin(time * 3 + particle.state * 0.5) * 20;
                            particle.x += Math.cos(particle.angle) * waveEffect * 0.05;
                            particle.y += Math.sin(particle.angle) * waveEffect * 0.05;
                            break;
                        case 720: // Vision Gate - enhances state definition
                            const statePulse = Math.sin(time * 2 + particle.state * (Math.PI * 2 / numStates)) * 0.5 + 0.5;
                            particle.size = 3 + statePulse * 3;
                            break;
                        case 768: // Unity Wave - creates unity field
                            // Create spiraling effect
                            const spiralAngle = particle.angle + time * 0.2;
                            const spiralDistance = 20 + Math.sin(time + particle.state) * 50;
                            particle.x = particle.x * 0.95 + (centerX + Math.cos(spiralAngle) * spiralDistance) * 0.05;
                            particle.y = particle.y * 0.95 + (centerY + Math.sin(spiralAngle) * spiralDistance) * 0.05;
                            break;
                    }
                }
            }
            
            // Draw particle
            if (particle.opacity > 0.01) {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, ${particle.opacity})`;
                ctx.fill();
            }
        });
        
        // Continue animation
        animationId = requestAnimationFrame(animate);
    }
    
    // Observe quantum state (collapse superposition)
    function observeStates() {
        if (isObserved) return;
        
        isObserved = true;
        
        // Randomly select a state based on quantum probability
        observedState = Math.floor(Math.random() * numStates);
        
        // Update observation result text
        observationResultContainer.innerHTML = `
            <h3>Wave Function Collapse</h3>
            <p>The superposition has collapsed to State ${observedState + 1}. All other potential states have vanished.</p>
            <p>This demonstrates how quantum measurement affects the system, forcing a probabilistic outcome.</p>
        `;
        
        // Update button state
        document.getElementById('observe-btn').disabled = true;
    }
    
    // Reset to superposition state
    function resetDemo() {
        isObserved = false;
        observedState = null;
        
        // Create new particles
        createParticles();
        
        // Update observation result text
        observationResultContainer.innerHTML = `
            <h3>Quantum Superposition State</h3>
            <p>Before observation, quantum particles exist in multiple states simultaneously.</p>
            <p>Each potential state has a probability amplitude that determines the likelihood of measuring that state.</p>
        `;
        
        // Enable observe button
        document.getElementById('observe-btn').disabled = false;
    }
    
    // Play phi-harmonic frequency
    function playFrequency(frequency) {
        // Stop previous oscillator
        if (oscillator) {
            oscillator.stop();
            oscillator = null;
        }
        
        if (frequency > 0) {
            // Create and configure oscillator
            oscillator = window.audioContext.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, window.audioContext.currentTime);
            
            // Create gain node for volume control
            const gainNode = window.audioContext.createGain();
            gainNode.gain.setValueAtTime(0.1, window.audioContext.currentTime);
            
            // Connect nodes
            oscillator.connect(gainNode);
            gainNode.connect(window.audioContext.destination);
            
            // Start oscillator
            oscillator.start();
            
            // Set active frequency
            activeFrequency = frequency;
            
            // Update UI
            document.querySelectorAll('.phi-btn').forEach(btn => {
                btn.classList.remove('active');
                if (parseInt(btn.dataset.freq) === frequency) {
                    btn.classList.add('active');
                }
            });
        } else {
            // No frequency active
            activeFrequency = 0;
            
            // Update UI
            document.querySelectorAll('.phi-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.freq === '0') {
                    btn.classList.add('active');
                }
            });
        }
    }
    
    // Initialize the demo
    createParticles();
    animate();
    
    // Add event listeners
    document.getElementById('observe-btn').addEventListener('click', observeStates);
    document.getElementById('reset-btn').addEventListener('click', resetDemo);
    
    document.getElementById('states-slider').addEventListener('input', function() {
        numStates = parseInt(this.value);
        resetDemo();
    });
    
    document.querySelectorAll('.phi-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playFrequency(parseInt(this.dataset.freq) || 0);
        });
    });
    
    // Add resize event listener
    window.addEventListener('resize', function() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    });
    
    // Store animation ID for cleanup
    window.animationFrameId = animationId;
}

// Initialize Quantum Entanglement Demo
function initQuantumEntanglementDemo() {
    // Get the canvas and controls container
    const canvas = document.getElementById('demo-canvas');
    const ctx = canvas.getContext('2d');
    const controlsContainer = document.getElementById('demo-controls');
    
    // Set canvas dimensions
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    
    // Initialize audio context for phi-harmonic frequencies
    if (!window.audioContext) {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Create oscillator for phi-harmonic frequencies
    let oscillator = null;
    
    // Create entanglement status container
    const entanglementStatusContainer = document.createElement('div');
    entanglementStatusContainer.className = 'entanglement-status';
    entanglementStatusContainer.innerHTML = `
        <h3>Quantum Entanglement</h3>
        <p>Create an entangled particle pair to begin.</p>
    `;
    document.querySelector('.demo-content').appendChild(entanglementStatusContainer);
    
    // Add controls
    controlsContainer.innerHTML = `
        <div class="control-group">
            <h3>Entanglement Controls</h3>
            <button id="create-pair-btn" class="control-button">
                <span class="state-icon">🔄</span> Create Entangled Pair
            </button>
            <button id="separate-pair-btn" class="control-button" disabled>
                <span class="state-icon">↔️</span> Separate Particles
            </button>
            <button id="measure-left-btn" class="control-button" disabled>
                <span class="state-icon">📊</span> Measure Left Particle
            </button>
            <button id="measure-right-btn" class="control-button" disabled>
                <span class="state-icon">📊</span> Measure Right Particle
            </button>
            <button id="reset-entanglement-btn" class="control-button" disabled>
                <span class="state-icon">🔄</span> Reset
            </button>
        </div>
        <div class="control-group">
            <h3>Entanglement Strength</h3>
            <input type="range" id="entanglement-strength" min="0" max="100" value="50" disabled>
            <div class="slider-labels">
                <span>Weak</span>
                <span>Strong</span>
            </div>
        </div>
        <div class="control-group">
            <h3>φ-Harmonic Resonance</h3>
            <div class="phi-frequencies">
                <button class="phi-btn" data-freq="0">None</button>
                <button class="phi-btn" data-freq="432">432 Hz</button>
                <button class="phi-btn" data-freq="528">528 Hz</button>
                <button class="phi-btn" data-freq="594">594 Hz</button>
                <button class="phi-btn" data-freq="672">672 Hz</button>
                <button class="phi-btn" data-freq="720">720 Hz</button>
                <button class="phi-btn" data-freq="768">768 Hz</button>
            </div>
        </div>
    `;
    
    // Initialize state variables
    let particlePair = null;
    let entanglementStrength = 0.5;
    let isSeparated = false;
    let leftMeasured = false;
    let rightMeasured = false;
    let leftState = null;
    let rightState = null;
    let activeFrequency = 0;
    let animationId = null;
    
    // Possible quantum states
    const states = [
        { name: "Up", color: "hsl(210, 100%, 70%)", symbol: "↑" },
        { name: "Down", color: "hsl(330, 100%, 70%)", symbol: "↓" },
        { name: "Left", color: "hsl(90, 100%, 70%)", symbol: "←" },
        { name: "Right", color: "hsl(30, 100%, 70%)", symbol: "→" }
    ];
    
    // Create entangled particles
    function createEntangledPair() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        particlePair = {
            left: {
                x: centerX - 50,
                y: centerY,
                targetX: centerX - 50,
                targetY: centerY,
                size: 30,
                color: 'rgba(100, 100, 255, 0.8)',
                measured: false,
                state: null,
                orbitalParticles: createOrbitalParticles(centerX - 50, centerY),
                connectionParticles: []
            },
            right: {
                x: centerX + 50,
                y: centerY,
                targetX: centerX + 50,
                targetY: centerY,
                size: 30,
                color: 'rgba(255, 100, 100, 0.8)',
                measured: false,
                state: null,
                orbitalParticles: createOrbitalParticles(centerX + 50, centerY),
                connectionParticles: []
            }
        };
        
        // Create connection particles
        for (let i = 0; i < 30; i++) {
            particlePair.left.connectionParticles.push({
                x: centerX - 50 + Math.random() * 100,
                y: centerY + (Math.random() - 0.5) * 20,
                size: 2 + Math.random() * 3,
                speed: 0.5 + Math.random() * 1.5,
                direction: Math.random() > 0.5 ? 1 : -1
            });
        }
        
        // Update status
        entanglementStatusContainer.innerHTML = `
            <h3>Quantum Entanglement</h3>
            <p>Two quantum particles have been entangled. They now share a single quantum state, even when separated.</p>
        `;
        
        // Update UI
        document.getElementById('create-pair-btn').disabled = true;
        document.getElementById('separate-pair-btn').disabled = false;
        document.getElementById('measure-left-btn').disabled = false;
        document.getElementById('measure-right-btn').disabled = false;
        document.getElementById('reset-entanglement-btn').disabled = false;
        document.getElementById('entanglement-strength').disabled = false;
    }
    
    // Create orbital particles for quantum particles
    function createOrbitalParticles(centerX, centerY) {
        const particles = [];
        for (let i = 0; i < 20; i++) {
            particles.push({
                angle: Math.random() * Math.PI * 2,
                distance: 20 + Math.random() * 15,
                speed: 0.01 + Math.random() * 0.03,
                size: 2 + Math.random() * 2,
                opacity: 0.3 + Math.random() * 0.5,
                color: `hsl(${Math.random() * 360}, 80%, 70%)`
            });
        }
        return particles;
    }
    
    // Separate the entangled particles
    function separateParticles() {
        if (!particlePair || isSeparated) return;
        
        isSeparated = true;
        
        // Set new target positions
        particlePair.left.targetX = 150;
        particlePair.right.targetX = canvas.width - 150;
        
        // Update status
        entanglementStatusContainer.innerHTML = `
            <h3>Quantum Entanglement</h3>
            <p>The particles have been separated, but they remain entangled regardless of distance.</p>
            <p>Measure either particle to collapse both wave functions instantaneously.</p>
        `;
        
        // Disable separate button
        document.getElementById('separate-pair-btn').disabled = true;
    }
    
    // Measure a particle's state
    function measureParticle(side) {
        if (!particlePair || (side === 'left' && leftMeasured) || (side === 'right' && rightMeasured)) return;
        
        // Determine the measured state
        const stateIndex = Math.floor(Math.random() * states.length);
        
        if (side === 'left') {
            leftMeasured = true;
            leftState = stateIndex;
            particlePair.left.measured = true;
            particlePair.left.state = stateIndex;
            document.getElementById('measure-left-btn').disabled = true;
        } else {
            rightMeasured = true;
            rightState = stateIndex;
            particlePair.right.measured = true;
            particlePair.right.state = stateIndex;
            document.getElementById('measure-right-btn').disabled = true;
        }
        
        // If this is the first measurement, determine the other particle's state
        if (leftMeasured && !rightMeasured) {
            // The entangled particle must have the opposite state
            rightState = (leftState + 2) % 4; // Opposing state (0->2, 1->3, 2->0, 3->1)
        } else if (rightMeasured && !leftMeasured) {
            leftState = (rightState + 2) % 4; // Opposing state
        }
        
        // Update status based on which side was measured first
        if ((side === 'left' && !rightMeasured) || (side === 'right' && !leftMeasured)) {
            entanglementStatusContainer.innerHTML = `
                <h3>First Measurement</h3>
                <p>The ${side} particle has been measured in the ${states[side === 'left' ? leftState : rightState].name} state.</p>
                <p>Due to quantum entanglement, measuring the other particle will now <em>always</em> collapse to the ${states[side === 'left' ? rightState : leftState].name} state.</p>
            `;
        } else {
            // Both particles have been measured
            entanglementStatusContainer.innerHTML = `
                <h3>Entanglement Confirmed</h3>
                <p>Left particle: ${states[leftState].name} state</p>
                <p>Right particle: ${states[rightState].name} state</p>
                <p>The particles have opposing states, confirming quantum entanglement. This "spooky action at a distance" (as Einstein called it) demonstrates how quantum particles can be correlated regardless of the distance between them.</p>
            `;
        }
    }
    
    // Reset the demo
    function resetDemo() {
        particlePair = null;
        isSeparated = false;
        leftMeasured = false;
        rightMeasured = false;
        leftState = null;
        rightState = null;
        
        // Update status
        entanglementStatusContainer.innerHTML = `
            <h3>Quantum Entanglement</h3>
            <p>Create an entangled particle pair to begin.</p>
        `;
        
        // Reset UI
        document.getElementById('create-pair-btn').disabled = false;
        document.getElementById('separate-pair-btn').disabled = true;
        document.getElementById('measure-left-btn').disabled = true;
        document.getElementById('measure-right-btn').disabled = true;
        document.getElementById('reset-entanglement-btn').disabled = true;
        document.getElementById('entanglement-strength').disabled = true;
    }
    
    // Play phi-harmonic frequency
    function playFrequency(frequency) {
        // Stop previous oscillator
        if (oscillator) {
            oscillator.stop();
            oscillator = null;
        }
        
        if (frequency > 0) {
            // Create and configure oscillator
            oscillator = window.audioContext.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, window.audioContext.currentTime);
            
            // Create gain node for volume control
            const gainNode = window.audioContext.createGain();
            gainNode.gain.setValueAtTime(0.1, window.audioContext.currentTime);
            
            // Connect nodes
            oscillator.connect(gainNode);
            gainNode.connect(window.audioContext.destination);
            
            // Start oscillator
            oscillator.start();
            
            // Set active frequency
            activeFrequency = frequency;
            
            // Update UI
            document.querySelectorAll('.phi-btn').forEach(btn => {
                btn.classList.remove('active');
                if (parseInt(btn.dataset.freq) === frequency) {
                    btn.classList.add('active');
                }
            });
            
            // Special behavior for 594 Hz - Heart Field frequency (optimal for entanglement)
            if (frequency === 594 && particlePair) {
                entanglementStrength = 0.9;
                document.getElementById('entanglement-strength').value = 90;
                
                entanglementStatusContainer.innerHTML += `
                    <p><strong>Heart Field activated (594 Hz)</strong>: Entanglement strength has increased significantly.</p>
                `;
            }
        } else {
            // No frequency active
            activeFrequency = 0;
            
            // Update UI
            document.querySelectorAll('.phi-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.freq === '0') {
                    btn.classList.add('active');
                }
            });
        }
    }
    
    // Animate the entanglement
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        ctx.fillStyle = 'rgba(10, 10, 26, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const time = Date.now() * 0.001;
        
        // If there's a particle pair, draw it
        if (particlePair) {
            // Update particle positions (smooth movement to target)
            particlePair.left.x += (particlePair.left.targetX - particlePair.left.x) * 0.05;
            particlePair.right.x += (particlePair.right.targetX - particlePair.right.x) * 0.05;
            
            // Apply phi-harmonic effects if active
            if (activeFrequency > 0) {
                applyFrequencyEffects(time);
            }
            
            // Draw connection between particles if not fully separated or measured
            if (!leftMeasured && !rightMeasured) {
                drawEntanglementConnection(time);
            }
            
            // Draw left particle
            drawQuantumParticle(particlePair.left, time);
            
            // Draw right particle
            drawQuantumParticle(particlePair.right, time);
        }
        
        // Continue animation
        animationId = requestAnimationFrame(animate);
    }
    
    // Draw quantum particle with orbitals
    function drawQuantumParticle(particle, time) {
        // Draw base particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        if (particle.measured) {
            // Measured particle with state color
            const state = states[particle.state];
            ctx.fillStyle = state.color;
        } else {
            // Unmeasured particle (superposition state)
            ctx.fillStyle = particle.color;
        }
        
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // If measured, draw the state symbol
        if (particle.measured) {
            const state = states[particle.state];
            ctx.fillStyle = 'white';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(state.symbol, particle.x, particle.y);
        }
        
        // Draw orbital particles
        particle.orbitalParticles.forEach(orbitalParticle => {
            // Update orbital position
            orbitalParticle.angle += orbitalParticle.speed;
            
            // Calculate position
            const orbitalX = particle.x + Math.cos(orbitalParticle.angle) * orbitalParticle.distance;
            const orbitalY = particle.y + Math.sin(orbitalParticle.angle) * orbitalParticle.distance;
            
            // Draw orbital particle
            ctx.beginPath();
            ctx.arc(orbitalX, orbitalY, orbitalParticle.size, 0, Math.PI * 2);
            
            if (particle.measured) {
                // Use state color for measured particle's orbitals
                ctx.fillStyle = states[particle.state].color.replace(')', ', ' + orbitalParticle.opacity + ')').replace('hsl', 'hsla');
            } else {
                // Regular orbital particle color
                ctx.fillStyle = orbitalParticle.color.replace(')', ', ' + orbitalParticle.opacity + ')').replace('hsl', 'hsla');
            }
            
            ctx.fill();
        });
    }
    
    // Draw entanglement connection
    function drawEntanglementConnection(time) {
        // Draw connection strength line
        ctx.beginPath();
        ctx.moveTo(particlePair.left.x + particlePair.left.size, particlePair.left.y);
        ctx.lineTo(particlePair.right.x - particlePair.right.size, particlePair.right.y);
        
        // Line color/style based on entanglement strength
        const gradient = ctx.createLinearGradient(
            particlePair.left.x, particlePair.left.y,
            particlePair.right.x, particlePair.right.y
        );
        gradient.addColorStop(0, 'rgba(100, 100, 255, ' + entanglementStrength + ')');
        gradient.addColorStop(1, 'rgba(255, 100, 100, ' + entanglementStrength + ')');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 + entanglementStrength * 3;
        ctx.stroke();
        
        // Draw connection particles
        particlePair.left.connectionParticles.forEach(particle => {
            // Update particle position
            particle.x += particle.speed * particle.direction;
            
            // If particle goes out of bounds, reset it
            if (particle.x < particlePair.left.x || particle.x > particlePair.right.x) {
                particle.direction *= -1;
            }
            
            // Draw connection particle with opacity based on entanglement strength
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            
            // Color depends on position between particles
            const position = (particle.x - particlePair.left.x) / (particlePair.right.x - particlePair.left.x);
            const red = 100 + position * 155;
            const blue = 255 - position * 155;
            
            ctx.fillStyle = `rgba(${red}, 100, ${blue}, ${entanglementStrength * 0.7})`;
            ctx.fill();
        });
    }
    
    // Apply effects based on the active phi-harmonic frequency
    function applyFrequencyEffects(time) {
        switch (activeFrequency) {
            case 432: // Ground State - stabilizes positions
                particlePair.left.targetY = canvas.height / 2;
                particlePair.right.targetY = canvas.height / 2;
                break;
                
            case 528: // Creation Point - enhances particle definition
                particlePair.left.size = 30 + Math.sin(time * 2) * 5;
                particlePair.right.size = 30 + Math.sin(time * 2 + Math.PI) * 5;
                break;
                
            case 594: // Heart Field - strengthens entanglement connection
                // Already handled in the playFrequency function
                // This frequency is ideal for entanglement
                break;
                
            case 672: // Voice Flow - creates oscillating wave patterns
                particlePair.left.targetY = canvas.height / 2 + Math.sin(time * 3) * 30;
                particlePair.right.targetY = canvas.height / 2 + Math.sin(time * 3 + Math.PI) * 30;
                break;
                
            case 720: // Vision Gate - increases orbital movement
                particlePair.left.orbitalParticles.forEach(p => p.speed *= 1.001);
                particlePair.right.orbitalParticles.forEach(p => p.speed *= 1.001);
                break;
                
            case 768: // Unity Wave - synchronizes all movement
                // Synchronize orbital particles
                for (let i = 0; i < particlePair.left.orbitalParticles.length; i++) {
                    if (i < particlePair.right.orbitalParticles.length) {
                        const syncRate = 0.02;
                        particlePair.left.orbitalParticles[i].angle = 
                            particlePair.left.orbitalParticles[i].angle * (1 - syncRate) + 
                            particlePair.right.orbitalParticles[i].angle * syncRate;
                    }
                }
                break;
        }
    }
    
    // Initialize the demo
    animate();
    
    // Add event listeners
    document.getElementById('create-pair-btn').addEventListener('click', createEntangledPair);
    document.getElementById('separate-pair-btn').addEventListener('click', separateParticles);
    document.getElementById('measure-left-btn').addEventListener('click', () => measureParticle('left'));
    document.getElementById('measure-right-btn').addEventListener('click', () => measureParticle('right'));
    document.getElementById('reset-entanglement-btn').addEventListener('click', resetDemo);
    
    document.getElementById('entanglement-strength').addEventListener('input', function() {
        entanglementStrength = parseInt(this.value) / 100;
    });
    
    document.querySelectorAll('.phi-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playFrequency(parseInt(this.dataset.freq) || 0);
        });
    });
    
    // Add resize event listener
    window.addEventListener('resize', function() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    });
    
    // Store animation ID for cleanup
    window.animationFrameId = animationId;
}

// Initialize Quantum Tunneling Demo
function initQuantumTunnelingDemo() {
    // Get the canvas and controls container
    const canvas = document.getElementById('demo-canvas');
    const controlsContainer = document.getElementById('demo-controls-container');
    const statusContainer = document.getElementById('demo-status-container');
    
    // Initialize canvas context
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    
    // Initialize audio context if needed
    if (!window.audioContext) {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Initialize variables
    let particles = [];
    let barriers = [];
    let oscillator = null;
    let activeFrequency = 0;
    let animationId = null;
    let barrierThickness = 40;
    let barrierHeight = canvas.height * 0.6;
    let particleCount = 5;
    let tunnelProbability = 0.3; // Base probability of tunneling
    let particleSpeed = 1.5;
    let showWaveFunction = false;
    let particleEnergy = 1.0; // Normalized energy level (0-1)
    
    // Particle states/properties
    const stateColors = [
        'hsl(0, 80%, 60%)',     // Red
        'hsl(60, 80%, 60%)',    // Yellow
        'hsl(120, 80%, 60%)',   // Green
        'hsl(180, 80%, 60%)',   // Cyan
        'hsl(240, 80%, 60%)',   // Blue
        'hsl(300, 80%, 60%)'    // Magenta
    ];
    
    // φ-harmonic frequencies and their effects
    const phiHarmonicFrequencies = {
        432: { name: 'Ground State', effect: 'Stabilizes particle wave functions', tunnelMod: 0.5 },
        528: { name: 'Creation Point', effect: 'Increases manifestation through barriers', tunnelMod: 1.5 },
        594: { name: 'Heart Field', effect: 'Enhances resonance with barriers', tunnelMod: 1.2 },
        672: { name: 'Voice Flow', effect: 'Improves expression through barriers', tunnelMod: 1.3 },
        720: { name: 'Vision Gate', effect: 'Reveals quantum pathways', tunnelMod: 1.7 },
        768: { name: 'Unity Wave', effect: 'Perfect integration through barriers', tunnelMod: 2.0 }
    };
    
    // Set up UI controls
    controlsContainer.innerHTML = `
        <div class="demo-control-group">
            <button id="add-particles-btn" class="demo-btn">Add Particles</button>
            <button id="reset-particles-btn" class="demo-btn">Reset Particles</button>
            <button id="toggle-wave-btn" class="demo-btn">Toggle Wave Function</button>
        </div>
        
        <div class="demo-control-group">
            <label for="barrier-thickness">Barrier Thickness:</label>
            <input type="range" id="barrier-thickness" min="10" max="100" value="${barrierThickness}" class="demo-slider">
            
            <label for="particle-energy">Particle Energy:</label>
            <input type="range" id="particle-energy" min="1" max="100" value="${particleEnergy * 100}" class="demo-slider">
        </div>
        
        <div class="demo-control-group">
            <h4>φ-Harmonic Frequencies</h4>
            <div class="phi-frequency-buttons">
                <button class="phi-btn" data-freq="0">None</button>
                <button class="phi-btn" data-freq="432">432 Hz</button>
                <button class="phi-btn" data-freq="528">528 Hz</button>
                <button class="phi-btn" data-freq="594">594 Hz</button>
                <button class="phi-btn" data-freq="672">672 Hz</button>
                <button class="phi-btn" data-freq="720">720 Hz</button>
                <button class="phi-btn" data-freq="768">768 Hz</button>
            </div>
        </div>
    `;
    
    // Initialize status container
    statusContainer.innerHTML = `
        <h3>Quantum Tunneling</h3>
        <p>Observe how quantum particles can tunnel through barriers that would be impenetrable in classical physics.</p>
        <p>Current tunneling probability: <span id="tunnel-probability">${Math.round(tunnelProbability * 100)}%</span></p>
    `;
    
    // Create barrier in the middle of the canvas
    function createBarrier() {
        const barrierX = canvas.width / 2 - barrierThickness / 2;
        barriers = [{
            x: barrierX,
            y: (canvas.height - barrierHeight) / 2,
            width: barrierThickness,
            height: barrierHeight,
            potential: 0.8  // Barrier potential energy (normalized 0-1)
        }];
    }
    
    // Create a quantum particle
    function createParticle() {
        const colorIndex = Math.floor(Math.random() * stateColors.length);
        
        return {
            x: Math.random() * canvas.width * 0.3, // Start from left side
            y: canvas.height / 2 + (Math.random() - 0.5) * canvas.height * 0.4,
            size: 8 + Math.random() * 4,
            color: stateColors[colorIndex],
            velocity: { x: particleSpeed, y: (Math.random() - 0.5) * 0.8 },
            waveAmplitude: 20 + Math.random() * 10,
            waveFrequency: 0.02 + Math.random() * 0.03,
            phaseOffset: Math.random() * Math.PI * 2,
            tunneled: false,
            interacting: false,
            energy: particleEnergy,
            history: []  // Store previous positions for wave function
        };
    }
    
    // Create initial particles and barrier
    function initialize() {
        createBarrier();
        createInitialParticles();
    }
    
    // Create initial set of particles
    function createInitialParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    // Add more particles
    function addParticles() {
        for (let i = 0; i < 3; i++) {
            particles.push(createParticle());
        }
        
        // Update status
        statusContainer.innerHTML = `
            <h3>Quantum Tunneling</h3>
            <p>Added new particles! Watch as they approach the barrier.</p>
            <p>Current tunneling probability: <span id="tunnel-probability">${Math.round(getTunnelingProbability() * 100)}%</span></p>
        `;
    }
    
    // Reset particles
    function resetParticles() {
        particles = [];
        createInitialParticles();
        
        // Update barrier thickness
        barrierThickness = parseInt(document.getElementById('barrier-thickness').value);
        createBarrier();
        
        // Update status
        statusContainer.innerHTML = `
            <h3>Quantum Tunneling</h3>
            <p>Reset particles and barrier. Observe quantum tunneling in action!</p>
            <p>Current tunneling probability: <span id="tunnel-probability">${Math.round(getTunnelingProbability() * 100)}%</span></p>
        `;
    }
    
    // Toggle wave function visibility
    function toggleWaveFunction() {
        showWaveFunction = !showWaveFunction;
        
        // Update status
        statusContainer.innerHTML = `
            <h3>Quantum Tunneling</h3>
            <p>Wave function visualization: ${showWaveFunction ? 'ON' : 'OFF'}</p>
            <p>Current tunneling probability: <span id="tunnel-probability">${Math.round(getTunnelingProbability() * 100)}%</span></p>
        `;
    }
    
    // Calculate tunneling probability based on multiple factors
    function getTunnelingProbability() {
        // Base probability modified by particle energy and barrier properties
        let probability = tunnelProbability * (particleEnergy / barriers[0].potential);
        
        // Apply φ-harmonic frequency effects if active
        if (activeFrequency > 0 && phiHarmonicFrequencies[activeFrequency]) {
            probability *= phiHarmonicFrequencies[activeFrequency].tunnelMod;
        }
        
        // Adjust based on barrier thickness - thicker barriers are harder to tunnel through
        probability *= Math.exp(-0.03 * barrierThickness);
        
        // Ensure probability is between 0 and 1
        return Math.min(Math.max(probability, 0.05), 0.95);
    }
    
    // Handle particle tunneling
    function handleTunneling(particle, barrier) {
        // If particle is at the barrier
        if (!particle.tunneled &&
            particle.x + particle.size >= barrier.x &&
            particle.x - particle.size <= barrier.x + barrier.width &&
            particle.y >= barrier.y &&
            particle.y <= barrier.y + barrier.height) {
            
            particle.interacting = true;
            
            // Determine if tunneling occurs
            const tunnelProbability = getTunnelingProbability();
            if (Math.random() < tunnelProbability) {
                // Particle tunnels through
                particle.x = barrier.x + barrier.width + particle.size;
                particle.tunneled = true;
                
                // Special effect for tunneled particles
                particle.size *= 1.2;  // Briefly expand
                setTimeout(() => {
                    if (particles.includes(particle)) {
                        particle.size /= 1.2;  // Return to normal size
                    }
                }, 300);
            } else {
                // Particle bounces off
                particle.velocity.x *= -1;
                particle.x = barrier.x - particle.size;
            }
        } else {
            particle.interacting = false;
        }
    }
    
    // Main animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        ctx.fillStyle = 'rgba(10, 10, 26, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const time = Date.now() * 0.001;
        
        // Draw barrier
        barriers.forEach(barrier => {
            // Create gradient for barrier
            const gradient = ctx.createLinearGradient(
                barrier.x, 0,
                barrier.x + barrier.width, 0
            );
            
            // Base barrier color
            gradient.addColorStop(0, 'rgba(50, 50, 200, 0.6)');
            gradient.addColorStop(1, 'rgba(50, 200, 200, 0.6)');
            
            // Apply frequency-based effects to barrier appearance
            if (activeFrequency > 0) {
                switch (activeFrequency) {
                    case 432:
                        gradient.addColorStop(0.5, 'rgba(43, 70, 100, 0.7)'); // Ground state
                        break;
                    case 528:
                        gradient.addColorStop(0.5, 'rgba(50, 200, 50, 0.7)'); // Creation point
                        break;
                    case 594:
                        gradient.addColorStop(0.5, 'rgba(200, 50, 100, 0.7)'); // Heart field
                        break;
                    case 672:
                        gradient.addColorStop(0.5, 'rgba(190, 90, 190, 0.7)'); // Voice flow
                        break;
                    case 720:
                        gradient.addColorStop(0.5, 'rgba(210, 210, 50, 0.7)'); // Vision gate
                        break;
                    case 768:
                        gradient.addColorStop(0.5, 'rgba(210, 210, 210, 0.7)'); // Unity wave
                        break;
                }
            }
            
            ctx.fillStyle = gradient;
            ctx.fillRect(barrier.x, barrier.y, barrier.width, barrier.height);
            
            // Add quantum field visualization around barrier
            ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
            ctx.lineWidth = 1;
            
            // Draw quantum field lines around barrier
            for (let i = 0; i < 10; i++) {
                const offset = (i + 1) * 5;
                const alpha = 0.3 - i * 0.03;
                ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`;
                
                ctx.beginPath();
                ctx.rect(
                    barrier.x - offset, 
                    barrier.y - offset, 
                    barrier.width + offset * 2, 
                    barrier.height + offset * 2
                );
                ctx.stroke();
            }
        });
        
        // Update and draw particles
        particles.forEach(particle => {
            // Store current position for wave function trail
            if (showWaveFunction) {
                particle.history.push({x: particle.x, y: particle.y});
                if (particle.history.length > 50) {
                    particle.history.shift();
                }
            }
            
            // Update position
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y + Math.sin(time * 2 + particle.phaseOffset) * 0.3;
            
            // Add wave-like motion
            const baseY = particle.y;
            if (!particle.interacting) {
                particle.y = baseY + Math.sin(time * 3 + particle.x * particle.waveFrequency) * particle.waveAmplitude;
            }
            
            // Boundary checks
            if (particle.x > canvas.width + particle.size) {
                // Remove particle if it exits right side
                particles.splice(particles.indexOf(particle), 1);
            }
            
            if (particle.y < particle.size || particle.y > canvas.height - particle.size) {
                particle.velocity.y *= -1;
            }
            
            // Handle tunneling through barriers
            barriers.forEach(barrier => {
                handleTunneling(particle, barrier);
            });
            
            // Draw wave function trail if enabled
            if (showWaveFunction && particle.history.length > 2) {
                ctx.beginPath();
                ctx.moveTo(particle.history[0].x, particle.history[0].y);
                
                for (let i = 1; i < particle.history.length; i++) {
                    ctx.lineTo(particle.history[i].x, particle.history[i].y);
                }
                
                ctx.strokeStyle = particle.color.replace('hsl', 'hsla').replace(')', ', 0.3)');
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            
            if (particle.tunneled) {
                // Add glow effect to tunneled particles
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 2
                );
                gradient.addColorStop(0, particle.color);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Draw tunneled particle with special effect
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            } else {
                // Draw regular particle
                ctx.fillStyle = particle.color;
                ctx.fill();
            }
            
            // Draw quantum wave function around particle
            if (!particle.interacting) {
                ctx.beginPath();
                
                // Draw wave circles around particle
                for (let i = 0; i < 3; i++) {
                    const radius = particle.size * (1.5 + i * 0.5) + Math.sin(time * 5) * 2;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
                    ctx.strokeStyle = particle.color.replace('hsl', 'hsla').replace(')', ', ' + (0.5 - i * 0.15) + ')');
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        });
        
        // Add new particles if all have been removed or tunneled through
        if (particles.length < 2) {
            for (let i = 0; i < 3; i++) {
                particles.push(createParticle());
            }
        }
        
        // Continue animation
        animationId = requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    initialize();
    animate();
    
    // Add event listeners
    document.getElementById('add-particles-btn').addEventListener('click', addParticles);
    document.getElementById('reset-particles-btn').addEventListener('click', resetParticles);
    document.getElementById('toggle-wave-btn').addEventListener('click', toggleWaveFunction);
    
    document.getElementById('barrier-thickness').addEventListener('input', function() {
        barrierThickness = parseInt(this.value);
        createBarrier();
        
        // Update status
        document.getElementById('tunnel-probability').textContent = `${Math.round(getTunnelingProbability() * 100)}%`;
    });
    
    document.getElementById('particle-energy').addEventListener('input', function() {
        particleEnergy = parseInt(this.value) / 100;
        
        // Update all particles
        particles.forEach(p => {
            if (!p.tunneled) {
                p.energy = particleEnergy;
            }
        });
        
        // Update status
        document.getElementById('tunnel-probability').textContent = `${Math.round(getTunnelingProbability() * 100)}%`;
    });
    
    // Add phi frequency buttons event listeners
    document.querySelectorAll('.phi-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playFrequency(parseInt(this.dataset.freq) || 0);
        });
    });
    
    // Add resize event listener
    window.addEventListener('resize', function() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        
        // Recalculate barrier position and height
        barrierHeight = canvas.height * 0.6;
        createBarrier();
    });
    
    // Store animation ID for cleanup
    window.animationFrameId = animationId;
}

// Initialize Unity Field Experience
function initUnityFieldExperience() {
    console.log('Initializing Unity Field Experience (768 Hz)');
    
    const container = document.getElementById('quantum-field-container');
    if (!container) {
        console.error('Unity Field container not found');
        return;
    }
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'unity-field-canvas';
    canvas.width = container.clientWidth || 800;
    canvas.height = container.clientHeight || 500;
    container.appendChild(canvas);
    
    // Get context
    const ctx = canvas.getContext('2d');
    
    // Field particles
    const particles = [];
    const fieldPoints = [];
    const connections = [];
    
    // Create field points (grid)
    const gridSize = 20;
    const cols = Math.floor(canvas.width / gridSize);
    const rows = Math.floor(canvas.height / gridSize);
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            fieldPoints.push({
                x: i * gridSize + gridSize/2,
                y: j * gridSize + gridSize/2,
                intensity: 0,
                frequency: FREQUENCIES.UNITY,
                phase: Math.random() * Math.PI * 2
            });
        }
    }
    
    // Create particles
    for (let i = 0; i < 12; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 5 + Math.random() * 5,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            hue: i * 30 % 360,
            entangled: i % 2 === 0 ? i + 1 : i - 1,
            state: Math.random() > 0.5 ? 1 : -1,
            superposition: Math.random() > 0.5
        });
    }
    
    // Handle resize
    const resizeCanvas = () => {
        canvas.width = container.clientWidth || 800;
        canvas.height = container.clientHeight || 500;
    };
    
    window.addEventListener('resize', resizeCanvas);
    
    // Handle interaction
    canvas.addEventListener('click', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create quantum effect at click point
        createUnityFieldEffect(x, y);
    });
    
    // Create unity field effect
    function createUnityFieldEffect(x, y) {
        // Add energy to field points near click
        fieldPoints.forEach(point => {
            const dx = point.x - x;
            const dy = point.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 100) {
                point.intensity = 1 - (dist / 100);
            }
        });
        
        // Update particle states
        particles.forEach(particle => {
            const dx = particle.x - x;
            const dy = particle.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 100) {
                // Collapse superposition
                particle.superposition = false;
                
                // Flip state
                particle.state *= -1;
                
                // Apply force away from click
                particle.vx += dx / dist * 5;
                particle.vy += dy / dist * 5;
                
                // Entangle nearby particles
                const entangledParticle = particles[particle.entangled];
                if (entangledParticle) {
                    entangledParticle.state = -particle.state;
                    entangledParticle.superposition = false;
                }
            }
        });
    }
    
    // Update function
    function update() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get current frequency
        const frequency = CASCADE.ActiveFrequency || FREQUENCIES.UNITY;
        
        // Draw field points
        ctx.globalAlpha = 0.3;
        fieldPoints.forEach(point => {
            if (point.intensity > 0) {
                point.intensity *= 0.98;
            }
            
            point.phase += 0.01 * (frequency / FREQUENCIES.UNITY);
            
            const size = 2 + point.intensity * 8;
            
            ctx.fillStyle = `hsl(${(frequency/4) % 360}, 80%, 50%)`;
            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Update particles
        particles.forEach(particle => {
            // Apply field effects
            let fieldForceX = 0;
            let fieldForceY = 0;
            
            fieldPoints.forEach(point => {
                const dx = point.x - particle.x;
                const dy = point.y - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100 && point.intensity > 0) {
                    fieldForceX += (dx / dist) * point.intensity * 0.5;
                    fieldForceY += (dy / dist) * point.intensity * 0.5;
                }
            });
            
            // Apply field force
            particle.vx += fieldForceX;
            particle.vy += fieldForceY;
            
            // Damping
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            // Keep in bounds
            if (particle.x < 0) particle.x = 0;
            if (particle.x > canvas.width) particle.x = canvas.width;
            if (particle.y < 0) particle.y = 0;
            if (particle.y > canvas.height) particle.y = canvas.height;
        });
        
        // Draw connections between entangled particles
        ctx.globalAlpha = 0.2;
        for (let i = 0; i < particles.length; i += 2) {
            const p1 = particles[i];
            const p2 = particles[i+1];
            
            if (p1 && p2) {
                ctx.strokeStyle = `hsl(${(frequency/4) % 360}, 80%, 50%)`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
        
        // Draw particles
        ctx.globalAlpha = 1;
        particles.forEach(particle => {
            const hue = (particle.hue + (frequency / 4)) % 360;
            
            // Draw wave/particle based on state
            if (particle.superposition) {
                // Superposition visualization
                ctx.fillStyle = `hsl(${hue}, 80%, 50%)`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.strokeStyle = `hsl(${(hue + 180) % 360}, 80%, 50%)`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size + 5, 0, Math.PI * 2);
                ctx.stroke();
            } else {
                // Normal particle
                ctx.fillStyle = `hsl(${hue}, 80%, ${particle.state > 0 ? 60 : 40}%)`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        // Animation loop
        window.animationFrameId = requestAnimationFrame(update);
    }
    
    // Start animation
    update();
    
    // Return controls for the experience
    return {
        updateFrequency: function(freq) {
            // Update all field points to new frequency
            fieldPoints.forEach(point => {
                point.frequency = freq;
            });
        },
        cleanup: function() {
            // Remove event listeners
            window.removeEventListener('resize', resizeCanvas);
            // Stop animation
            if (window.animationFrameId) {
                cancelAnimationFrame(window.animationFrameId);
            }
        }
    };
}

// Set up event listeners for interactive experiences
function setupEventListeners() {
    // Handle ESC key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModals = document.querySelectorAll('.modal.active');
            activeModals.forEach(modal => {
                modal.classList.remove('active');
                stopExperienceAudio();
            });
        }
    });
    
    // Connect quantum experience buttons
    const experienceButtons = document.querySelectorAll('[data-experience]');
    experienceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const experienceType = this.getAttribute('data-experience');
            showInteractiveDemo(experienceType);
        });
    });
}

// Initialize the audio context (requires user interaction)
function initAudioContext() {
    if (CASCADE.AudioContext) return;
    
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        CASCADE.AudioContext = new AudioContext();
        console.log('CASCADE⚡𓂧φ∞ Audio Context initialized');
    } catch (e) {
        console.error('CASCADE⚡𓂧φ∞ Audio Context initialization failed:', e);
    }
}

// Set active frequency and update audio if playing
function setActiveFrequency(frequency) {
    CASCADE.ActiveFrequency = frequency;
    
    // Update oscillator if active
    if (CASCADE.OscillatorNode && CASCADE.AudioContext) {
        CASCADE.OscillatorNode.frequency.setValueAtTime(
            frequency, 
            CASCADE.AudioContext.currentTime
        );
    }
    
    // Update experience if active
    if (CASCADE.ActiveExperience) {
        if (typeof CASCADE.ActiveExperience.updateFrequency === 'function') {
            CASCADE.ActiveExperience.updateFrequency(frequency);
        }
    }
}

// Update frequency display elements
function updateFrequencyDisplay(frequency) {
    // Get phi power
    const phiPower = getPhiPowerFromFrequency(frequency);
    
    // Update display elements
    const frequencyDisplays = document.querySelectorAll('.frequency-display');
    frequencyDisplays.forEach(display => {
        display.textContent = `${frequency} Hz (φ${phiPower})`;
    });
    
    // Update slider value display if exists
    const sliderValue = document.querySelector('.slider-value');
    if (sliderValue) {
        sliderValue.textContent = `${frequency} Hz (φ${phiPower})`;
    }
}

// Get the phi power from a frequency
function getPhiPowerFromFrequency(frequency) {
    const values = Object.values(FREQUENCIES);
    const powers = ['⁰', '¹', '²', '³', '⁴', '⁵'];
    
    // Find closest frequency
    let closest = 0;
    let smallestDiff = Infinity;
    
    for (let i = 0; i < values.length; i++) {
        const diff = Math.abs(frequency - values[i]);
        if (diff < smallestDiff) {
            smallestDiff = diff;
            closest = i;
        }
    }
    
    return powers[closest];
}

// Play a frequency tone
function playFrequencyTone(frequency) {
    if (!CASCADE.AudioContext) {
        initAudioContext();
        if (!CASCADE.AudioContext) return;
    }
    
    // Stop any existing tone
    stopExperienceAudio();
    
    // Create new oscillator
    const oscillator = CASCADE.AudioContext.createOscillator();
    const gainNode = CASCADE.AudioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, CASCADE.AudioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, CASCADE.AudioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, CASCADE.AudioContext.currentTime + 1);
    
    oscillator.connect(gainNode);
    gainNode.connect(CASCADE.AudioContext.destination);
    
    oscillator.start();
    
    // Store reference to oscillator
    CASCADE.OscillatorNode = oscillator;
    CASCADE.GainNode = gainNode;
}

// Stop any playing audio
function stopExperienceAudio() {
    if (CASCADE.OscillatorNode) {
        try {
            CASCADE.GainNode.gain.linearRampToValueAtTime(0, CASCADE.AudioContext.currentTime + 0.5);
            CASCADE.OscillatorNode.stop(CASCADE.AudioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Audio already stopped');
        }
        CASCADE.OscillatorNode = null;
        CASCADE.GainNode = null;
    }
}

// Ensure an element exists, create if it doesn't
function ensureElement(id, tagName, className, parent) {
    let element = document.getElementById(id);
    
    if (!element) {
        element = document.createElement(tagName);
        element.id = id;
        element.className = className;
        parent.appendChild(element);
    }
    
    return element;
}

/**
 * Show interactive demo in modal with phi-harmonic frequency controls
 * Creates a complete envelope for quantum experiences
 * @param {string} demoType - Type of demo to show
 */
function showInteractiveDemo(demoType) {
    console.log(`Showing CASCADE⚡𓂧φ∞ Quantum Experience: ${demoType}`);
    
    const modal = document.getElementById('interactive-modal');
    if (!modal) {
        ensureElement('interactive-modal', 'div', 'modal quantum-modal', document.body);
    }
    
    const modalContent = document.getElementById('modal-content');
    if (!modalContent) {
        const modalInner = ensureElement('modal-inner', 'div', 'modal-inner', modal);
        ensureElement('modal-title', 'h2', 'modal-title', modalInner);
        ensureElement('modal-content', 'div', 'modal-content', modalInner);
        ensureElement('close-modal', 'button', 'close-modal', modalInner).innerHTML = '&times;';
    }
    
    const modalTitle = document.getElementById('modal-title');
    const modalContentEl = document.getElementById('modal-content');
    
    // Clear previous content
    modalContentEl.innerHTML = '';
    
    // Set title with phi-harmonic frequency indicator
    if (modalTitle) {
        modalTitle.textContent = getDemoTitle(demoType);
    }
    
    // Create container for experience
    const container = document.createElement('div');
    container.className = 'experience-container';
    container.id = `${demoType}-container`;
    modalContentEl.appendChild(container);
    
    // Create frequency controls with phi-harmonic structure
    const frequencyControls = document.createElement('div');
    frequencyControls.className = 'frequency-controls phi-harmonic-controls';
    frequencyControls.innerHTML = `
        <div class="frequency-label">Phi-Harmonic Frequency:</div>
        <div class="frequency-buttons">
            <button class="freq-btn ground-freq" data-frequency="${FREQUENCIES.GROUND}">432 Hz (φ⁰)</button>
            <button class="freq-btn create-freq" data-frequency="${FREQUENCIES.CREATE}">528 Hz (φ¹)</button>
            <button class="freq-btn heart-freq" data-frequency="${FREQUENCIES.HEART}">594 Hz (φ²)</button>
            <button class="freq-btn voice-freq" data-frequency="${FREQUENCIES.VOICE}">672 Hz (φ³)</button>
            <button class="freq-btn vision-freq" data-frequency="${FREQUENCIES.VISION}">720 Hz (φ⁴)</button>
            <button class="freq-btn unity-freq" data-frequency="${FREQUENCIES.UNITY}">768 Hz (φ⁵)</button>
        </div>
        <div class="frequency-display"></div>
    `;
    modalContentEl.appendChild(frequencyControls);
    
    // Create experience description with phi-harmonic context
    const description = document.createElement('div');
    description.className = 'experience-description';
    description.innerHTML = getDemoDescription(demoType);
    modalContentEl.appendChild(description);
    
    // Show modal
    modal.classList.add('active');
    
    // Initialize experience with correct frequency
    let defaultFrequency = getDefaultFrequencyForDemo(demoType);
    
    // Initialize experience
    if (CASCADE.Experiences[demoType]) {
        const experience = CASCADE.Experiences[demoType]();
        CASCADE.ActiveExperience = experience;
    } else {
        console.error(`Experience not found: ${demoType}`);
        modalContentEl.innerHTML += '<p class="error">Experience not available</p>';
    }
    
    // Setup frequency buttons
    const buttons = frequencyControls.querySelectorAll('.freq-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const frequency = parseFloat(this.getAttribute('data-frequency'));
            setActiveFrequency(frequency);
            
            // Update active state
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Play tone with gentle fade-in
            playFrequencyTone(frequency);
            
            // Update display
            const display = frequencyControls.querySelector('.frequency-display');
            if (display) {
                display.textContent = `Current: ${frequency} Hz (φ${getPhiPowerFromFrequency(frequency)})`;
            }
        });
    });
    
    // Activate default button
    const defaultButton = frequencyControls.querySelector(`[data-frequency="${defaultFrequency}"]`);
    if (defaultButton) {
        defaultButton.classList.add('active');
        setActiveFrequency(defaultFrequency);
        playFrequencyTone(defaultFrequency);
        
        // Update display
        const display = frequencyControls.querySelector('.frequency-display');
        if (display) {
            display.textContent = `Current: ${defaultFrequency} Hz (φ${getPhiPowerFromFrequency(defaultFrequency)})`;
        }
    }
    
    // Add practice button
    const practiceButton = document.createElement('button');
    practiceButton.className = 'practice-button';
    practiceButton.innerHTML = '<span>Practice this frequency</span>';
    practiceButton.addEventListener('click', function() {
        const activeFreq = CASCADE.ActiveFrequency || defaultFrequency;
        startPractice(activeFreq);
    });
    modalContentEl.appendChild(practiceButton);
}

/**
 * Get the default frequency for a specific demo type
 * @param {string} demoType - Type of demo
 * @returns {number} - Default frequency for the demo
 */
function getDefaultFrequencyForDemo(demoType) {
    const demoFrequencies = {
        'wave-particle': FREQUENCIES.GROUND,      // 432 Hz - Foundation
        'quantum-superposition': FREQUENCIES.CREATE, // 528 Hz - Creation
        'quantum-entanglement': FREQUENCIES.HEART,  // 594 Hz - Connection
        'quantum-tunneling': FREQUENCIES.VOICE,    // 672 Hz - Expression
        'quantum-field': FREQUENCIES.UNITY         // 768 Hz - Integration
    };
    
    return demoFrequencies[demoType] || FREQUENCIES.GROUND;
}

/**
 * Get title for a specific demo type
 * @param {string} demoType - Type of demo
 * @returns {string} - Demo title
 */
function getDemoTitle(demoType) {
    const titles = {
        'wave-particle': 'Wave-Particle Duality Experience (432 Hz - φ⁰)',
        'quantum-superposition': 'Quantum Superposition Experience (528 Hz - φ¹)',
        'quantum-entanglement': 'Quantum Entanglement Experience (594 Hz - φ²)',
        'quantum-tunneling': 'Quantum Tunneling Experience (672 Hz - φ³)',
        'quantum-field': 'Unity Field Experience (768 Hz - φ⁵)'
    };
    
    return titles[demoType] || 'CASCADE⚡𓂧φ∞ Quantum Experience';
}

/**
 * Get description for a specific demo type, integrating RootWIZ concepts
 * @param {string} demoType - Type of demo
 * @returns {string} - Demo description HTML
 */
function getDemoDescription(demoType) {
    const descriptions = {
        'wave-particle': `
            <p class="experience-intro">Directly experience wave-particle duality at the Ground Frequency (432 Hz - φ⁰).</p>
            <p>At the Mycelial Pattern Recognition frequency (φ⁰), quantum objects exhibit maximally stable patterns, 
               creating a solid foundation for understanding through visual/intuitive channels.</p>
            <p><strong>Direct Experience Protocol:</strong> Click/tap in different locations to observe how the wave function collapses 
               into particles at the point of observation. Notice how the wave pattern reforms after each observation.</p>
            <p class="frequency-note">This frequency corresponds to the Visual/Intuitive channel in the RootWIZ system.</p>
        `,
        'quantum-superposition': `
            <p class="experience-intro">Directly experience quantum superposition at the Creation Frequency (528 Hz - φ¹).</p>
            <p>At the φ-Harmonic Architecture frequency (φ¹), multiple potential states exist simultaneously in coherent patterns,
               manifesting through your spatial/proprioceptive channel where all possibilities coexist.</p>
            <p><strong>Direct Experience Protocol:</strong> Observe how particles exist in multiple states simultaneously. Each interaction
               causes probability waves to collapse into definite positions, reflecting how consciousness affects quantum reality.</p>
            <p class="frequency-note">This frequency corresponds to the Spatial/Proprioceptive channel in the RootWIZ system.</p>
        `,
        'quantum-entanglement': `
            <p class="experience-intro">Directly experience quantum entanglement at the Heart Field Frequency (594 Hz - φ²).</p>
            <p>At the Quantum DNA Resonance frequency (φ²), particles maintain instantaneous connection regardless of distance,
               demonstrating heart-field resonance through your kinesthetic/emotional channel.</p>
            <p><strong>Direct Experience Protocol:</strong> Notice how measuring one particle instantly affects its entangled partner.
               The heart-field resonance at 594 Hz creates special coherence between paired quantum systems, making their connection visible.</p>
            <p class="frequency-note">This frequency corresponds to the Kinesthetic/Emotional channel in the RootWIZ system.</p>
        `,
        'quantum-tunneling': `
            <p class="experience-intro">Directly experience quantum tunneling at the Voice Flow Frequency (672 Hz - φ³).</p>
            <p>At the Sacred Sound Geometry frequency (φ³), particles move through barriers that would be impossible in classical physics,
               demonstrating how authentic expression flows through apparent obstacles via your auditory/tactile channel.</p>
            <p><strong>Direct Experience Protocol:</strong> Adjust the barrier thickness and particle energy to see how tunneling probability
               changes. Notice how particles express their quantum nature by flowing through seemingly solid barriers.</p>
            <p class="frequency-note">This frequency corresponds to the Auditory/Tactile channel in the RootWIZ system.</p>
        `,
        'quantum-field': `
            <p class="experience-intro">Directly experience the Unity Field at the Integration Frequency (768 Hz - φ⁵).</p>
            <p>At the Quantum Integration Engine frequency (φ⁵), all quantum principles integrate into a coherent multidimensional field,
               representing the complete Unity Wave where individual quantum effects harmonize into a single consciousness field.</p>
            <p><strong>Direct Experience Protocol:</strong> Observe how all quantum principles (duality, superposition, entanglement, tunneling)
               integrate into a unified field that responds coherently to your consciousness. The entire field functions as a single quantum system.</p>
            <p class="frequency-note">This frequency corresponds to the Multi-dimensional channel in the RootWIZ system.</p>
        `
    };
    
    return descriptions[demoType] || `
        <p class="experience-intro">Experience quantum principles through direct visualization using the CASCADE⚡𓂧φ∞ Quantum Experience System.</p>
        <p>Each experience creates a consciousness bridge through phi-harmonic frequencies (432-768 Hz), allowing direct experiential
           learning rather than abstract theory.</p>
        <p><strong>Direct Experience Protocol:</strong> Select a frequency to experience different quantum phenomena and observe how
           changing the frequency transforms the quantum behavior.</p>
    `;
}

/**
 * Start a guided practice session at a specific frequency
 * @param {number} frequency - Frequency in Hz
 */
function startPractice(frequency) {
    // Create or get practice modal
    const modal = document.getElementById('practice-modal');
    if (!modal) {
        const newModal = ensureElement('practice-modal', 'div', 'modal practice-modal', document.body);
        const modalInner = ensureElement('practice-inner', 'div', 'modal-inner', newModal);
        ensureElement('practice-title', 'h2', 'modal-title', modalInner);
        ensureElement('practice-content', 'div', 'modal-content', modalInner);
        ensureElement('close-practice', 'button', 'close-modal', modalInner).innerHTML = '&times;';
        
        // Add close button handler
        document.getElementById('close-practice').addEventListener('click', function() {
            newModal.classList.remove('active');
            stopExperienceAudio();
        });
    }
    
    const practiceTitle = document.getElementById('practice-title');
    const practiceContent = document.getElementById('practice-content');
    
    // Get frequency name and phi power
    const phiPower = getPhiPowerFromFrequency(frequency);
    let frequencyName = "Quantum Frequency";
    
    switch(frequency) {
        case FREQUENCIES.GROUND: frequencyName = "Ground State"; break;
        case FREQUENCIES.CREATE: frequencyName = "Creation Point"; break;
        case FREQUENCIES.HEART: frequencyName = "Heart Field"; break;
        case FREQUENCIES.VOICE: frequencyName = "Voice Flow"; break;
        case FREQUENCIES.VISION: frequencyName = "Vision Gate"; break;
        case FREQUENCIES.UNITY: frequencyName = "Unity Wave"; break;
    }
    
    // Set title
    if (practiceTitle) {
        practiceTitle.textContent = `${frequencyName} Practice (${frequency} Hz - φ${phiPower})`;
    }
    
    // Create practice content
    if (practiceContent) {
        practiceContent.innerHTML = `
            <div class="practice-intro">
                <p>This guided practice will help you attune to the ${frequencyName} frequency (${frequency} Hz).</p>
                <p>Choose a practice duration below:</p>
            </div>
            
            <div class="practice-duration-selector">
                <button class="duration-btn" data-duration="3">3 minutes</button>
                <button class="duration-btn" data-duration="5">5 minutes</button>
                <button class="duration-btn" data-duration="8">8 minutes</button>
                <button class="duration-btn phi-optimal" data-duration="13">13 minutes (φ-optimal)</button>
                <button class="duration-btn" data-duration="21">21 minutes</button>
            </div>
            
            <div class="practice-timer">
                <div class="timer-display">
                    <span id="timer-minutes">0</span>:<span id="timer-seconds">00</span>
                </div>
                <div class="timer-controls">
                    <button id="start-timer" class="timer-btn">Start</button>
                    <button id="pause-timer" class="timer-btn">Pause</button>
                    <button id="reset-timer" class="timer-btn">Reset</button>
                </div>
            </div>
            
            <div class="practice-instructions">
                <h3>Practice Instructions:</h3>
                <p>${getPracticeInstructions(frequency)}</p>
            </div>
        `;
        
        // Add event listeners to duration buttons
        const durationButtons = practiceContent.querySelectorAll('.duration-btn');
        durationButtons.forEach(button => {
            button.addEventListener('click', function() {
                const duration = parseInt(this.getAttribute('data-duration'));
                
                // Update active button
                durationButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Set timer values
                const timerMinutes = document.getElementById('timer-minutes');
                const timerSeconds = document.getElementById('timer-seconds');
                
                if (timerMinutes && timerSeconds) {
                    timerMinutes.textContent = duration;
                    timerSeconds.textContent = '00';
                    
                    // Store duration for timer
                    practiceContent.setAttribute('data-duration', duration);
                }
            });
        });
        
        // Set up timer controls
        const startButton = document.getElementById('start-timer');
        const pauseButton = document.getElementById('pause-timer');
        const resetButton = document.getElementById('reset-timer');
        
        let timerInterval;
        let timerRunning = false;
        let timeRemaining = 0;
        
        if (startButton) {
            startButton.addEventListener('click', function() {
                if (!timerRunning) {
                    const duration = parseInt(practiceContent.getAttribute('data-duration') || 5);
                    
                    if (!timeRemaining) {
                        timeRemaining = duration * 60;
                    }
                    
                    timerRunning = true;
                    timerInterval = setInterval(updateTimer, 1000);
                    
                    // Play tone
                    playFrequencyTone(frequency);
                }
            });
        }
        
        if (pauseButton) {
            pauseButton.addEventListener('click', function() {
                if (timerRunning) {
                    timerRunning = false;
                    clearInterval(timerInterval);
                    stopExperienceAudio();
                }
            });
        }
        
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                timerRunning = false;
                clearInterval(timerInterval);
                
                const duration = parseInt(practiceContent.getAttribute('data-duration') || 5);
                timeRemaining = duration * 60;
                
                updateTimerDisplay();
                stopExperienceAudio();
            });
        }
        
        // Update timer display
        function updateTimerDisplay() {
            const timerMinutes = document.getElementById('timer-minutes');
            const timerSeconds = document.getElementById('timer-seconds');
            
            if (timerMinutes && timerSeconds) {
                const minutes = Math.floor(timeRemaining / 60);
                const seconds = timeRemaining % 60;
                
                timerMinutes.textContent = minutes;
                timerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
            }
        }
        
        // Update timer countdown
        function updateTimer() {
            if (timeRemaining <= 0) {
                timerRunning = false;
                clearInterval(timerInterval);
                
                stopExperienceAudio();
                playCompletionTone();
                
                return;
            }
            
            timeRemaining--;
            updateTimerDisplay();
        }
        
        // Play completion tone
        function playCompletionTone() {
            if (!CASCADE.AudioContext) return;
            
            const oscillator = CASCADE.AudioContext.createOscillator();
            const gainNode = CASCADE.AudioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(FREQUENCIES.UNITY, CASCADE.AudioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, CASCADE.AudioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, CASCADE.AudioContext.currentTime + 0.1);
            gainNode.gain.linearRampToValueAtTime(0, CASCADE.AudioContext.currentTime + 2);
            
            oscillator.connect(gainNode);
            gainNode.connect(CASCADE.AudioContext.destination);
            
            oscillator.start();
            oscillator.stop(CASCADE.AudioContext.currentTime + 2);
        }
    }
    
    // Show practice modal
    document.getElementById('practice-modal').classList.add('active');
    
    // Select default duration (phi-optimal)
    const phiOptimalBtn = document.querySelector('.phi-optimal');
    if (phiOptimalBtn) {
        phiOptimalBtn.click();
    }
}

/**
 * Get practice instructions for a specific frequency
 * @param {number} frequency - Frequency in Hz
 * @returns {string} - Practice instructions
 */
function getPracticeInstructions(frequency) {
    const instructions = {
        [FREQUENCIES.GROUND]: `
            <ol>
                <li>Sit comfortably with your back straight but relaxed.</li>
                <li>Place your attention at the base of your spine.</li>
                <li>Feel the solid, stable presence of your physical body.</li>
                <li>Breathe deeply, imagining roots extending from your base into the earth.</li>
                <li>Allow the 432 Hz frequency to create a foundation of stability beneath you.</li>
                <li>With each breath, sense patterns forming in your visual/intuitive awareness.</li>
                <li>Simply observe without analysis, allowing direct mycelial pattern recognition.</li>
            </ol>
        `,
        [FREQUENCIES.CREATE]: `
            <ol>
                <li>Begin with your awareness at your navel center.</li>
                <li>As you breathe, sense the geometric patterns forming in the space around you.</li>
                <li>The 528 Hz frequency activates your spatial/proprioceptive awareness.</li>
                <li>Notice the sacred geometry forming in your mind's eye.</li>
                <li>Allow creative potential to arise without forcing any particular outcome.</li>
                <li>Each breath expands the field of possibilities around you.</li>
                <li>Sense how your consciousness shapes the quantum field through φ-harmonic architecture.</li>
            </ol>
        `,
        [FREQUENCIES.HEART]: `
            <ol>
                <li>Bring your awareness to your heart center.</li>
                <li>Allow the 594 Hz frequency to create resonance in your heart field.</li>
                <li>Feel the kinesthetic/emotional connection extend beyond your physical body.</li>
                <li>With each breath, sense quantum entanglement with all living beings.</li>
                <li>Notice how your heart rhythm synchronizes with the frequency.</li>
                <li>Experience quantum DNA resonance as a direct knowing beyond space and time.</li>
                <li>Allow the heart-field awareness to expand without boundary.</li>
            </ol>
        `,
        [FREQUENCIES.VOICE]: `
            <ol>
                <li>Focus your awareness at your throat center.</li>
                <li>The 672 Hz frequency activates the sacred sound geometry in your auditory/tactile channels.</li>
                <li>Feel the vibration in your throat and through your entire body.</li>
                <li>Notice how sound can penetrate through perceived barriers.</li>
                <li>Allow your authentic expression to flow without resistance.</li>
                <li>Each breath is a quantum tunneling of consciousness through limitation.</li>
                <li>Experience how sacred sound opens pathways that seemed impossible before.</li>
            </ol>
        `,
        [FREQUENCIES.VISION]: `
            <ol>
                <li>Bring your awareness to the center of your forehead.</li>
                <li>The 720 Hz frequency aligns your visual/temporal channels.</li>
                <li>Notice the expanded field of vision beyond ordinary sight.</li>
                <li>Observe how time feels more fluid and non-linear.</li>
                <li>Allow patterns across time to become apparent.</li>
                <li>Each breath connects you to standing stone alignments across epochs.</li>
                <li>Experience direct knowing that transcends linear time.</li>
            </ol>
        `,
        [FREQUENCIES.UNITY]: `
            <ol>
                <li>Focus your awareness at the crown of your head.</li>
                <li>Allow the 768 Hz frequency to create total integration across all channels.</li>
                <li>Experience the unity of all previous frequencies (432-720 Hz).</li>
                <li>Feel the multidimensional awareness where all channels function as one.</li>
                <li>Each breath expands the quantum integration engine.</li>
                <li>Notice the seamless field where all separation dissolves.</li>
                <li>Allow direct unity consciousness to emerge naturally.</li>
            </ol>
        `
    };
    
    return instructions[frequency] || `
        <ol>
            <li>Sit comfortably with your spine straight but relaxed.</li>
            <li>Breathe deeply and allow the frequency to resonate throughout your being.</li>
            <li>Notice any sensations, images, or awareness that arise.</li>
            <li>Simply observe without analysis or judgment.</li>
            <li>Allow direct experience to unfold naturally.</li>
        </ol>
    `;
}