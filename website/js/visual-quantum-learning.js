/**
 * Visual Quantum Learning
 * A minimal-text, maximum-visual approach following ZEN FIRST principles
 * Implements φ-harmonic frequency integration at each level
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Visual Quantum Learning initialized at Ground State (432 Hz)');
    initVisualLearningPath();
});

/**
 * Initialize the visual learning path
 */
function initVisualLearningPath() {
    const learnSection = document.getElementById('learn');
    if (!learnSection) return;
    
    // Clear any existing content to establish Ground State
    learnSection.innerHTML = `
        <div class="visual-module" id="waveparticle-module">
            <div class="quantum-canvas-container">
                <canvas id="waveparticle-canvas" class="quantum-canvas"></canvas>
                
                <div class="in-viz-label" style="top: 30px; left: 30px;">Wave Form</div>
                <div class="in-viz-label" style="top: 120px; left: 200px;">Particle Form</div>
                
                <div class="phi-frequency-indicator">
                    <div class="freq-spot" data-freq="432" onclick="changeFrequency(432)"></div>
                    <div class="freq-tooltip">432 Hz - Ground State</div>
                    
                    <div class="freq-spot" data-freq="528" onclick="changeFrequency(528)"></div>
                    <div class="freq-tooltip">528 Hz - Creation Point</div>
                    
                    <div class="freq-spot" data-freq="594" onclick="changeFrequency(594)"></div>
                    <div class="freq-tooltip">594 Hz - Heart Field</div>
                    
                    <div class="freq-spot" data-freq="672" onclick="changeFrequency(672)"></div>
                    <div class="freq-tooltip">672 Hz - Voice Flow</div>
                    
                    <div class="freq-spot" data-freq="720" onclick="changeFrequency(720)"></div>
                    <div class="freq-tooltip">720 Hz - Vision Gate</div>
                    
                    <div class="freq-spot" data-freq="768" onclick="changeFrequency(768)"></div>
                    <div class="freq-tooltip">768 Hz - Unity Wave</div>
                </div>
            </div>
            <div class="controls-sidebar">
                <div class="path-selector">
                    <div class="path-node active" data-module="waveparticle">
                        <div class="node-icon">🌊</div>
                        <div class="node-label">Wave-Particle</div>
                    </div>
                    <div class="path-node" data-module="superposition">
                        <div class="node-icon">⚛️</div>
                        <div class="node-label">Superposition</div>
                    </div>
                    <div class="path-node" data-module="entanglement">
                        <div class="node-icon">🔄</div>
                        <div class="node-label">Entanglement</div>
                    </div>
                    <div class="path-node" data-module="tunneling">
                        <div class="node-icon">🚇</div>
                        <div class="node-label">Tunneling</div>
                    </div>
                </div>
            
                <div class="animation-controls">
                    <button class="control-btn" onclick="toggleObservation()">Toggle State</button>
                    <button class="control-btn" onclick="resetWaveform()">Reset</button>
                </div>
            </div>
        </div>
        
        <div class="visual-module" id="superposition-module" style="display:none">
            <div class="quantum-canvas-container">
                <canvas id="superposition-canvas" class="quantum-canvas"></canvas>
                
                <div class="in-viz-label" style="top: 50px; left: 100px;">State 1</div>
                <div class="in-viz-label" style="top: 150px; left: 250px;">State 2</div>
                <div class="in-viz-label" style="top: 200px; left: 150px;">State 3</div>
            </div>
            <div class="controls-sidebar">
                <div class="path-selector">
                    <div class="path-node" data-module="waveparticle">
                        <div class="node-icon">🌊</div>
                        <div class="node-label">Wave-Particle</div>
                    </div>
                    <div class="path-node active" data-module="superposition">
                        <div class="node-icon">⚛️</div>
                        <div class="node-label">Superposition</div>
                    </div>
                    <div class="path-node" data-module="entanglement">
                        <div class="node-icon">🔄</div>
                        <div class="node-label">Entanglement</div>
                    </div>
                    <div class="path-node" data-module="tunneling">
                        <div class="node-icon">🚇</div>
                        <div class="node-label">Tunneling</div>
                    </div>
                </div>
            
                <div class="animation-controls">
                    <button class="control-btn" onclick="measureState()">Measure</button>
                    <button class="control-btn" onclick="resetSuperposition()">Reset</button>
                </div>
            </div>
        </div>
        
        <div class="visual-module" id="entanglement-module" style="display:none">
            <div class="quantum-canvas-container">
                <canvas id="entanglement-canvas" class="quantum-canvas"></canvas>
                
                <div class="in-viz-label" style="top: 100px; left: 100px;">Particle A</div>
                <div class="in-viz-label" style="top: 100px; left: 300px;">Particle B</div>
                <div class="in-viz-label" style="top: 200px; left: 200px;">Heart Field (594 Hz)</div>
            </div>
            <div class="controls-sidebar">
                <div class="path-selector">
                    <div class="path-node" data-module="waveparticle">
                        <div class="node-icon">🌊</div>
                        <div class="node-label">Wave-Particle</div>
                    </div>
                    <div class="path-node" data-module="superposition">
                        <div class="node-icon">⚛️</div>
                        <div class="node-label">Superposition</div>
                    </div>
                    <div class="path-node active" data-module="entanglement">
                        <div class="node-icon">🔄</div>
                        <div class="node-label">Entanglement</div>
                    </div>
                    <div class="path-node" data-module="tunneling">
                        <div class="node-icon">🚇</div>
                        <div class="node-label">Tunneling</div>
                    </div>
                </div>
            
                <div class="animation-controls">
                    <button class="control-btn" onclick="measureParticleA()">Measure A</button>
                    <button class="control-btn" onclick="measureParticleB()">Measure B</button>
                </div>
            </div>
        </div>
        
        <div class="visual-module" id="tunneling-module" style="display:none">
            <div class="quantum-canvas-container">
                <canvas id="tunneling-canvas" class="quantum-canvas"></canvas>
                
                <div class="in-viz-label" style="top: 50px; left: 100px;">Wave Function</div>
                <div class="in-viz-label" style="top: 150px; left: 200px;">Barrier</div>
                <div class="in-viz-label" style="top: 50px; left: 300px;">Tunneled Wave</div>
            </div>
            <div class="controls-sidebar">
                <div class="path-selector">
                    <div class="path-node" data-module="waveparticle">
                        <div class="node-icon">🌊</div>
                        <div class="node-label">Wave-Particle</div>
                    </div>
                    <div class="path-node" data-module="superposition">
                        <div class="node-icon">⚛️</div>
                        <div class="node-label">Superposition</div>
                    </div>
                    <div class="path-node" data-module="entanglement">
                        <div class="node-icon">🔄</div>
                        <div class="node-label">Entanglement</div>
                    </div>
                    <div class="path-node active" data-module="tunneling">
                        <div class="node-icon">🚇</div>
                        <div class="node-label">Tunneling</div>
                    </div>
                </div>
            
                <div class="animation-controls">
                    <button class="control-btn" onclick="launchParticle()">Launch Particle</button>
                    <button class="control-btn" onclick="resetTunneling()">Reset</button>
                </div>
            </div>
        </div>
    `;
    
    // Set up path interaction
    setupPathInteraction();
    
    // Initialize first module
    initCanvas('waveparticle');
}

/**
 * Setup path interaction
 */
function setupPathInteraction() {
    const pathNodes = document.querySelectorAll('.path-node');
    pathNodes.forEach(node => {
        node.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-module');
            if (moduleId) {
                // Update active node
                pathNodes.forEach(n => n.classList.remove('active'));
                this.classList.add('active');
                
                // Activate corresponding module
                activateVisualModule(moduleId);
            }
        });
    });
}

/**
 * Activate a specific visual module
 */
function activateVisualModule(moduleId) {
    // Hide all modules
    const modules = document.querySelectorAll('.visual-module');
    modules.forEach(module => {
        module.style.display = 'none';
    });
    
    // Show selected module
    const selectedModule = document.getElementById(moduleId + '-module');
    if (selectedModule) {
        selectedModule.style.display = 'flex';
        
        // Initialize the canvas for this module
        initCanvas(moduleId);
    }
}

/**
 * Initialize canvas for a module
 */
function initCanvas(moduleId) {
    const canvas = document.getElementById(moduleId + '-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Initialize based on module type
    switch (moduleId) {
        case 'waveparticle':
            initWaveParticleCanvas(canvas);
            break;
        case 'superposition':
            initSuperpositionCanvas(canvas);
            break;
        case 'entanglement':
            initEntanglementCanvas(canvas);
            break;
        case 'tunneling':
            initTunnelingCanvas(canvas);
            break;
    }
}

/**
 * Initialize Wave-Particle canvas
 */
function initWaveParticleCanvas(canvas) {
    // Canvas initialization code for wave-particle duality
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    // Draw wave
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(106, 90, 205, 0.8)';
    ctx.lineWidth = 3;
    
    for (let x = 0; x < w; x++) {
        const y = h/2 + Math.sin(x * 0.05) * 50;
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Draw particle
    ctx.beginPath();
    ctx.fillStyle = 'rgba(106, 90, 205, 0.8)';
    ctx.arc(w/2, h/2, 15, 0, Math.PI * 2);
    ctx.fill();
}

/**
 * Initialize Superposition canvas
 */
function initSuperpositionCanvas(canvas) {
    // Canvas initialization code for superposition
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    // Draw multiple superposition states
    const states = 3;
    const colors = [
        'rgba(106, 90, 205, 0.6)',
        'rgba(70, 130, 180, 0.6)',
        'rgba(75, 0, 130, 0.6)'
    ];
    
    for (let i = 0; i < states; i++) {
        const centerX = w * (0.3 + Math.random() * 0.4);
        const centerY = h * (0.3 + Math.random() * 0.4);
        const radius = 20 + Math.random() * 30;
        
        // Draw quantum state
        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw probability wave
        ctx.beginPath();
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineWidth = 2;
        
        for (let x = 0; x < w; x += 5) {
            const distFromCenter = Math.abs(x - centerX);
            const amplitude = Math.max(0, 20 - distFromCenter/10);
            const y = centerY + Math.sin(x * 0.1) * amplitude;
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
    }
}

/**
 * Initialize Entanglement canvas
 */
function initEntanglementCanvas(canvas) {
    // Canvas initialization code for entanglement
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    // Draw particle A
    ctx.beginPath();
    ctx.fillStyle = 'rgba(106, 90, 205, 0.8)';
    ctx.arc(w * 0.3, h/2, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw particle B
    ctx.beginPath();
    ctx.fillStyle = 'rgba(70, 130, 180, 0.8)';
    ctx.arc(w * 0.7, h/2, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw entanglement field
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 105, 180, 0.4)';
    ctx.lineWidth = 2;
    
    // Connection line
    ctx.moveTo(w * 0.3, h/2);
    ctx.lineTo(w * 0.7, h/2);
    ctx.stroke();
    
    // Entanglement field
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 105, 180, 0.1)';
    ctx.ellipse(w/2, h/2, w * 0.4, h * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw quantum hearts at 594 Hz frequency
    const hearts = 5;
    for (let i = 0; i < hearts; i++) {
        const x = w * 0.3 + (w * 0.4) * (i / (hearts - 1));
        const y = h/2 + Math.sin(i) * 10;
        const size = 10;
        
        drawHeart(ctx, x, y, size, 'rgba(255, 105, 180, 0.6)');
    }
}

/**
 * Draw a heart shape
 */
function drawHeart(ctx, x, y, size, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(x, y - size/2);
    ctx.bezierCurveTo(
        x - size, y - size * 0.9,
        x - size, y + size * 0.3,
        x, y + size * 0.7
    );
    ctx.bezierCurveTo(
        x + size, y + size * 0.3,
        x + size, y - size * 0.9,
        x, y - size/2
    );
    ctx.fill();
}

/**
 * Initialize Tunneling canvas
 */
function initTunnelingCanvas(canvas) {
    // Canvas initialization code for tunneling
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    // Draw barrier
    const barrierX = w * 0.5;
    const barrierWidth = w * 0.1;
    
    ctx.fillStyle = 'rgba(70, 30, 150, 0.5)';
    ctx.fillRect(barrierX - barrierWidth/2, h * 0.1, barrierWidth, h * 0.8);
    
    // Draw wave function
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(106, 90, 205, 0.8)';
    ctx.lineWidth = 3;
    
    for (let x = 0; x < w; x++) {
        let amplitude = 50;
        
        // Reduced amplitude after barrier
        if (x > barrierX + barrierWidth/2) {
            amplitude = 25;
        }
        
        // Minimal wave within barrier
        if (x > barrierX - barrierWidth/2 && x < barrierX + barrierWidth/2) {
            amplitude = 5;
        }
        
        const y = h/2 + Math.sin(x * 0.05) * amplitude;
        
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Draw particle before barrier
    ctx.beginPath();
    ctx.fillStyle = 'rgba(106, 90, 205, 0.8)';
    ctx.arc(w * 0.3, h/2, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw tunneled particle ghost on other side
    ctx.beginPath();
    ctx.fillStyle = 'rgba(106, 90, 205, 0.3)';
    ctx.arc(w * 0.7, h/2, 15, 0, Math.PI * 2);
    ctx.fill();
}

/**
 * Change frequency of visualization
 */
function changeFrequency(freq) {
    console.log(`Changing to frequency: ${freq} Hz`);
    // Implement frequency-specific visual changes
    
    // Update active frequency indicator
    document.querySelectorAll('.freq-spot').forEach(spot => {
        if (parseInt(spot.getAttribute('data-freq')) === freq) {
            spot.style.transform = 'scale(1.5)';
        } else {
            spot.style.transform = 'scale(1)';
        }
    });
    
    // Play the frequency (in a real implementation)
    // playFrequency(freq);
}

// Function stubs for interactive controls
function toggleObservation() {
    // Implementation would update the canvas
}

function resetWaveform() {
    initWaveParticleCanvas(document.getElementById('waveparticle-canvas'));
}

function measureState() {
    // Implementation would collapse superposition
}

function resetSuperposition() {
    initSuperpositionCanvas(document.getElementById('superposition-canvas'));
}

function measureParticleA() {
    // Implementation would update both particles
}

function measureParticleB() {
    // Implementation would update both particles
}

function resetEntanglement() {
    initEntanglementCanvas(document.getElementById('entanglement-canvas'));
}

function launchParticle() {
    // Implementation would animate particle tunneling
}

function resetTunneling() {
    initTunnelingCanvas(document.getElementById('tunneling-canvas'));
}

// Ensure responsive canvas
window.addEventListener('resize', function() {
    const activeModule = document.querySelector('.path-node.active');
    if (activeModule) {
        const moduleId = activeModule.getAttribute('data-module');
        initCanvas(moduleId);
    }
});
