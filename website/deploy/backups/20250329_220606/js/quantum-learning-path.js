/**
 * Quantum Learning Path
 * A complete self-contained learning path system implementing
 * phi-harmonic principles with full error recovery
 */

// Animation controllers for each canvas
let animationFrames = {
    basics: null,
    superposition: null,
    frequencies: null,
    harmonic: null,
    time: null,
    unity: null
};

// Initialize canvases when modules are activated
function initWaveParticleCanvas() {
    const canvas = document.getElementById('basics-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    let wavePhase = 0;
    let particlePhase = 0;
    
    function drawWaveParticle() {
        ctx.clearRect(0, 0, width, height);
        
        // Wave function drawing
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(70, 130, 180, 0.8)';
        ctx.lineWidth = 3;
        
        for (let x = 0; x < width; x += 5) {
            const y = height * 0.3 + Math.sin(x * 0.02 + wavePhase) * 30;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Draw wave circle
        const waveCenterX = width * 0.25;
        const waveCenterY = height * 0.3;
        const waveRadius = 40;
        
        ctx.beginPath();
        ctx.arc(waveCenterX, waveCenterY, waveRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(70, 130, 180, 0.6)';
        ctx.fill();
        
        // Particle drawing
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(70, 180, 130, 0.8)';
        ctx.lineWidth = 3;
        
        for (let x = 0; x < width; x += 5) {
            const y = height * 0.6 + Math.sin(x * 0.02 + particlePhase) * 10;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Draw particle circle
        const particleCenterX = width * 0.55;
        const particleCenterY = height * 0.6;
        const particleRadius = 40;
        
        ctx.beginPath();
        ctx.arc(particleCenterX, particleCenterY, particleRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(70, 180, 130, 0.6)';
        ctx.fill();
        
        wavePhase += 0.05;
        particlePhase += 0.1;
        
        animationFrames.basics = requestAnimationFrame(drawWaveParticle);
    }
    
    drawWaveParticle();
}

function initSuperpositionCanvas() {
    const canvas = document.getElementById('superposition-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const states = [
        { 
            x: width * 0.25, 
            y: height * 0.3, 
            phase: 0, 
            color: 'rgba(70, 130, 180, 0.7)',
            phaseSpeed: 0.05,
            waveAmplitude: 30
        },
        { 
            x: width * 0.7, 
            y: height * 0.5, 
            phase: Math.PI / 3, 
            color: 'rgba(147, 112, 219, 0.7)',
            phaseSpeed: 0.08,
            waveAmplitude: 35
        },
        { 
            x: width * 0.4, 
            y: height * 0.7, 
            phase: Math.PI / 1.5, 
            color: 'rgba(220, 160, 255, 0.7)',
            phaseSpeed: 0.06,
            waveAmplitude: 40
        }
    ];
    
    function drawSuperposition() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw each quantum state
        states.forEach(state => {
            // Draw wave
            ctx.beginPath();
            ctx.strokeStyle = state.color;
            ctx.lineWidth = 3;
            
            for (let x = 0; x < width; x += 5) {
                const y = state.y + Math.sin(x * 0.02 + state.phase) * state.waveAmplitude;
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
            
            // Draw circle
            ctx.beginPath();
            ctx.arc(state.x, state.y, 40, 0, Math.PI * 2);
            ctx.fillStyle = state.color;
            ctx.fill();
            
            // Update phase
            state.phase += state.phaseSpeed;
        });
        
        animationFrames.superposition = requestAnimationFrame(drawSuperposition);
    }
    
    drawSuperposition();
}

function initFrequenciesCanvas() {
    const canvas = document.getElementById('frequencies-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const frequencies = [
        { freq: "432", color: "rgba(70, 130, 180, 0.8)", x: width * 0.15, y: height * 0.25, phase: 0, speed: 0.03, amp: 20 },
        { freq: "528", color: "rgba(60, 179, 113, 0.8)", x: width * 0.35, y: height * 0.4, phase: Math.PI/5, speed: 0.05, amp: 25 },
        { freq: "594", color: "rgba(255, 69, 0, 0.8)", x: width * 0.55, y: height * 0.55, phase: Math.PI/2.5, speed: 0.06, amp: 30 },
        { freq: "672", color: "rgba(147, 112, 219, 0.8)", x: width * 0.75, y: height * 0.7, phase: Math.PI/1.5, speed: 0.08, amp: 35 },
        { freq: "768", color: "rgba(255, 215, 0, 0.8)", x: width * 0.85, y: height * 0.35, phase: Math.PI, speed: 0.1, amp: 40 }
    ];
    
    function drawFrequencies() {
        ctx.clearRect(0, 0, width, height);
        
        frequencies.forEach(freq => {
            // Draw wave
            ctx.beginPath();
            ctx.strokeStyle = freq.color;
            ctx.lineWidth = 3;
            
            for (let x = 0; x < width; x += 5) {
                // Use freq value to adjust wavelength
                const wavelength = 0.02 - (parseInt(freq.freq) - 432) * 0.00005;
                const y = freq.y + Math.sin(x * wavelength + freq.phase) * freq.amp;
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
            
            // Draw circle
            ctx.beginPath();
            ctx.arc(freq.x, freq.y, 30, 0, Math.PI * 2);
            ctx.fillStyle = freq.color;
            ctx.fill();
            
            // Update phase
            freq.phase += freq.speed;
        });
        
        animationFrames.frequencies = requestAnimationFrame(drawFrequencies);
    }
    
    drawFrequencies();
}

function initHarmonicCanvas() {
    const canvas = document.getElementById('harmonic-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    let phase = 0;
    let resonanceRadius = 150;
    
    function drawHarmonic() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw resonance field
        ctx.beginPath();
        ctx.arc(centerX, centerY, resonanceRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(147, 112, 219, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw pulsing ring
        const pulseRadius = resonanceRadius + Math.sin(phase) * 20;
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(147, 112, 219, 0.6)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw harmonic nodes
        const nodeCount = 8;
        for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * Math.PI * 2 + phase;
            const x = centerX + Math.cos(angle) * resonanceRadius;
            const y = centerY + Math.sin(angle) * resonanceRadius;
            const nodeRadius = 15 + Math.sin(phase + i) * 5;
            
            ctx.beginPath();
            ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(147, 112, 219, 0.7)';
            ctx.fill();
            
            // Draw connection lines
            for (let j = i+1; j < nodeCount; j++) {
                const angle2 = (j / nodeCount) * Math.PI * 2 + phase;
                const x2 = centerX + Math.cos(angle2) * resonanceRadius;
                const y2 = centerY + Math.sin(angle2) * resonanceRadius;
                
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = `rgba(147, 112, 219, ${0.2 + Math.sin(phase + i + j) * 0.1})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
        
        phase += 0.01;
        
        animationFrames.harmonic = requestAnimationFrame(drawHarmonic);
    }
    
    drawHarmonic();
}

function initTimeCanvas() {
    const canvas = document.getElementById('time-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    let phase = 0;
    
    function drawTimeCrystal() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw concentric rings
        const ringCount = 5;
        for (let i = 0; i < ringCount; i++) {
            const radius = 50 + i * 40;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(147, 112, 219, ${0.2 + (ringCount-i)/ringCount * 0.5})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw particles on each ring
            const particleCount = 6 + i * 2;
            for (let j = 0; j < particleCount; j++) {
                const particlePhase = phase * (i % 2 === 0 ? 1 : -1); // Alternate directions
                const angle = (j / particleCount) * Math.PI * 2 + particlePhase;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(147, 112, 219, 0.8)';
                ctx.fill();
            }
        }
        
        phase += 0.01;
        
        animationFrames.time = requestAnimationFrame(drawTimeCrystal);
    }
    
    drawTimeCrystal();
}

function initUnityCanvas() {
    const canvas = document.getElementById('unity-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    let phase = 0;
    let nodes = [];
    
    // Generate nodes
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 120 + Math.random() * 30;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        nodes.push({
            x, 
            y,
            originalX: x,
            originalY: y,
            radius: 5 + Math.random() * 5,
            phase: Math.random() * Math.PI * 2,
            pulseFactor: 0.5 + Math.random() * 0.5
        });
    }
    
    // Add center node
    nodes.push({
        x: centerX,
        y: centerY,
        originalX: centerX,
        originalY: centerY,
        radius: 15,
        phase: 0,
        pulseFactor: 1
    });
    
    function drawUnityField() {
        ctx.clearRect(0, 0, width, height);
        
        // Create radial gradient for background
        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, 200
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Connect all nodes
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const node1 = nodes[i];
                const node2 = nodes[j];
                
                // Calculate distance
                const dx = node2.x - node1.x;
                const dy = node2.y - node1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Draw connection if within distance threshold
                if (distance < 200) {
                    const opacity = 1 - distance / 200;
                    ctx.beginPath();
                    ctx.moveTo(node1.x, node1.y);
                    ctx.lineTo(node2.x, node2.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        
        // Draw and update nodes
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            
            // Update position with slight movement
            node.x = node.originalX + Math.cos(node.phase + phase) * 5 * node.pulseFactor;
            node.y = node.originalY + Math.sin(node.phase + phase * 1.5) * 5 * node.pulseFactor;
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
        }
        
        phase += 0.01;
        
        animationFrames.unity = requestAnimationFrame(drawUnityField);
    }
    
    drawUnityField();
}

// Setup module switching
function activateModule(moduleId) {
    // Cancel all animations
    Object.keys(animationFrames).forEach(key => {
        if (animationFrames[key]) {
            cancelAnimationFrame(animationFrames[key]);
            animationFrames[key] = null;
        }
    });
    
    // Hide all modules
    const modules = document.querySelectorAll('.visual-module');
    modules.forEach(module => module.classList.remove('active'));
    
    // Deactivate all nodes
    const nodes = document.querySelectorAll('.path-node');
    nodes.forEach(node => node.classList.remove('active'));
    
    // Activate selected module and node
    const targetModule = document.getElementById(`${moduleId}-visual`);
    const targetNode = document.querySelector(`.path-node[data-module="${moduleId}"]`);
    
    if (targetModule) targetModule.classList.add('active');
    if (targetNode) targetNode.classList.add('active');
    
    // Initialize canvas for the active module
    switch (moduleId) {
        case 'basics':
            initWaveParticleCanvas();
            break;
        case 'superposition':
            initSuperpositionCanvas();
            break;
        case 'frequencies':
            initFrequenciesCanvas();
            break;
        case 'harmonic':
            initHarmonicCanvas();
            break;
        case 'time':
            initTimeCanvas();
            break;
        case 'unity':
            initUnityField();
            break;
    }
}

// Initialize path interactions
function setupPathInteractions() {
    const pathNodes = document.querySelectorAll('.path-node');
    pathNodes.forEach(node => {
        node.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-module');
            activateModule(moduleId);
        });
    });
    
    // Setup frequency points
    const freqPoints = document.querySelectorAll('.freq-point');
    freqPoints.forEach(point => {
        point.addEventListener('click', function() {
            const freq = this.getAttribute('data-freq');
            // Deactivate all frequency points
            freqPoints.forEach(p => p.classList.remove('active'));
            // Activate selected frequency
            this.classList.add('active');
            
            // TODO: Apply frequency to active visualizations
            console.log(`Frequency changed to ${freq} Hz`);
        });
    });
}

// Initialize quantum learning path
function initQuantumLearningPath() {
    // Create learning path HTML structure
    const learnSection = document.getElementById('learn');
    if (!learnSection) return;
    
    // Setup HTML structure
    learnSection.innerHTML = `
        <div class="quantum-path-container">
            <div class="visual-modules">
                <!-- Visual-focused modules -->
                <div id="basics-visual" class="visual-module active">
                    <div class="canvas-container">
                        <canvas id="basics-canvas" class="quantum-canvas"></canvas>
                        <div class="in-viz-label" style="top: 30%; left: 25%;">Wave Form</div>
                        <div class="in-viz-label" style="top: 60%; left: 55%;">Particle Form</div>
                    </div>
                </div>
                
                <div id="superposition-visual" class="visual-module">
                    <div class="canvas-container">
                        <canvas id="superposition-canvas" class="quantum-canvas"></canvas>
                        <div class="in-viz-label" style="top: 20%; left: 10%;">State 1</div>
                        <div class="in-viz-label" style="top: 40%; left: 70%;">State 2</div>
                        <div class="in-viz-label" style="top: 65%; left: 40%;">State 3</div>
                    </div>
                </div>
                
                <div id="frequencies-visual" class="visual-module">
                    <div class="canvas-container">
                        <canvas id="frequencies-canvas" class="quantum-canvas"></canvas>
                        <div class="in-viz-label" style="top: 15%; left: 15%;">432 Hz</div>
                        <div class="in-viz-label" style="top: 15%; left: 35%;">528 Hz</div>
                        <div class="in-viz-label" style="top: 15%; left: 55%;">594 Hz</div>
                        <div class="in-viz-label" style="top: 15%; left: 75%;">672 Hz</div>
                        <div class="in-viz-label" style="top: 35%; left: 85%;">768 Hz</div>
                    </div>
                </div>
                
                <div id="harmonic-visual" class="visual-module">
                    <div class="canvas-container">
                        <canvas id="harmonic-canvas" class="quantum-canvas"></canvas>
                        <div class="in-viz-label" style="top: 25%; left: 30%;">Resonance Field</div>
                        <div class="in-viz-label" style="top: 65%; left: 65%;">Harmonic Node</div>
                    </div>
                </div>
                
                <div id="time-visual" class="visual-module">
                    <div class="canvas-container">
                        <canvas id="time-canvas" class="quantum-canvas"></canvas>
                        <div class="in-viz-label" style="top: 20%; left: 30%;">Time Crystal</div>
                        <div class="in-viz-label" style="top: 50%; left: 65%;">Temporal Loop</div>
                    </div>
                </div>
                
                <div id="unity-visual" class="visual-module">
                    <div class="canvas-container">
                        <canvas id="unity-canvas" class="quantum-canvas"></canvas>
                        <div class="in-viz-label" style="top: 20%; left: 40%;">Unity Field</div>
                    </div>
                </div>
            </div>
            
            <div class="frequency-bar">
                <div class="freq-point" data-freq="432">
                    <div class="freq-marker"></div>
                    <div class="freq-tooltip">432 Hz (φ⁰)</div>
                </div>
                <div class="freq-point" data-freq="528">
                    <div class="freq-marker"></div>
                    <div class="freq-tooltip">528 Hz (φ¹)</div>
                </div>
                <div class="freq-point" data-freq="594">
                    <div class="freq-marker"></div>
                    <div class="freq-tooltip">594 Hz (φ²)</div>
                </div>
                <div class="freq-point" data-freq="672">
                    <div class="freq-marker"></div>
                    <div class="freq-tooltip">672 Hz (φ³)</div>
                </div>
                <div class="freq-point" data-freq="720">
                    <div class="freq-marker"></div>
                    <div class="freq-tooltip">720 Hz (φ⁴)</div>
                </div>
                <div class="freq-point" data-freq="768">
                    <div class="freq-marker"></div>
                    <div class="freq-tooltip">768 Hz (φ⁵)</div>
                </div>
            </div>
            
            <div class="path-navigation">
                <div class="path-node active" data-module="basics">
                    <div class="node-icon">🌊</div>
                    <div class="node-label">Wave-Particle</div>
                </div>
                <div class="path-node" data-module="superposition">
                    <div class="node-icon">⚛️</div>
                    <div class="node-label">Superposition</div>
                </div>
                <div class="path-node" data-module="frequencies">
                    <div class="node-icon">🔊</div>
                    <div class="node-label">Frequencies</div>
                </div>
                <div class="path-node" data-module="harmonic">
                    <div class="node-icon">🔄</div>
                    <div class="node-label">Resonance</div>
                </div>
                <div class="path-node" data-module="time">
                    <div class="node-icon">⏱️</div>
                    <div class="node-label">Time Crystals</div>
                </div>
                <div class="path-node" data-module="unity">
                    <div class="node-icon">🔯</div>
                    <div class="node-label">Unity Field</div>
                </div>
            </div>
        </div>
    `;
    
    // Initialize all interactions
    setupPathInteractions();
    
    // Initialize the first visualization
    initWaveParticleCanvas();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Get active module
        const activeModule = document.querySelector('.visual-module.active');
        if (activeModule) {
            const moduleId = activeModule.id.replace('-visual', '');
            activateModule(moduleId);
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initQuantumLearningPath();
});

// Export functions for external use
window.quantum = window.quantum || {};
window.quantum.learning = {
    activateModule,
    initQuantumLearningPath
};
