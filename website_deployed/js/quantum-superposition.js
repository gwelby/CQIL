// ======================================================
// Quantum Superposition Demo Implementation
// ======================================================
let superpositionCanvas, superpositionCtx;
let superpositionParticles = [];
let superpositionMode = 'bloch'; // 'bloch', 'wave', 'stats'
let superpositionCoherence = 100;
let superpositionStates = 2;
let superpositionActive = true;
let superpositionAnimationId = null;
let measurementResults = [];
let superpositionRotationAngle = 0;
let superpositionCreated = false;
let superpositionMeasured = false;
let blochSphere = { x: 0, y: 0, z: 1 };

// Initialize quantum superposition demo
function initQuantumSuperpositionDemo() {
    superpositionCanvas = document.getElementById('fullscreen-quantum-superposition-canvas');
    if (!superpositionCanvas) return;
    
    superpositionCtx = superpositionCanvas.getContext('2d');
    
    // Set canvas size
    superpositionCanvas.width = superpositionCanvas.parentElement.clientWidth;
    superpositionCanvas.height = superpositionCanvas.parentElement.clientHeight;
    
    // Initialize demo state
    superpositionMeasured = false;
    superpositionCreated = false;
    superpositionParticles = [];
    measurementResults = [];
    superpositionRotationAngle = 0;
    superpositionCoherence = 100;
    superpositionStates = 2;
    superpositionMode = 'bloch';
    blochSphere = { x: 0, y: 0, z: 1 }; // Start at |0⟩ state
    
    // Start the animation
    animateSuperposition();
    createSuperposition();
    
    // Add info labels to the description area
    updateSuperpositionDescription();
}

// Create a superposition state
function createSuperposition() {
    // Reset if already in superposition
    if (superpositionCreated) {
        superpositionParticles = [];
        measurementResults = [];
        superpositionMeasured = false;
    }
    
    // Set button states
    const createBtn = document.getElementById('create-superposition-btn');
    const rotateBtn = document.getElementById('rotate-superposition-btn');
    const measureBtn = document.getElementById('measure-superposition-btn');
    
    if (createBtn) createBtn.classList.add('active');
    if (rotateBtn) rotateBtn.classList.remove('active');
    if (measureBtn) measureBtn.classList.remove('active');
    
    // Create particles based on number of states
    const centerX = superpositionCanvas.width / 2;
    const centerY = superpositionCanvas.height / 2;
    const radius = Math.min(superpositionCanvas.width, superpositionCanvas.height) * 0.35;
    
    superpositionParticles = [];
    
    // Create main qubit particle
    const mainParticle = {
        x: centerX,
        y: centerY,
        radius: 25,
        color: 'rgba(66, 165, 245, 0.9)',
        phase: 0,
        amplitude: 1,
        states: []
    };
    
    // Add states based on the number of states parameter
    for (let i = 0; i < superpositionStates; i++) {
        const angle = (i / superpositionStates) * Math.PI * 2;
        const amplitude = 1 / Math.sqrt(superpositionStates); // Equal superposition
        const phase = 0;
        
        mainParticle.states.push({
            id: i,
            label: `|${i}⟩`,
            amplitude: amplitude,
            phase: phase,
            color: `hsl(${(i / superpositionStates) * 360}, 80%, 60%)`,
            position: {
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius
            },
            probability: amplitude * amplitude
        });
    }
    
    superpositionParticles.push(mainParticle);
    superpositionCreated = true;
    
    // Set the Bloch sphere for 2 states
    if (superpositionStates === 2) {
        // Initialize to equal superposition (on equator of Bloch sphere)
        blochSphere = { x: 1, y: 0, z: 0 };
    }
    
    updateSuperpositionDescription();
}

// Rotate the superposition state
function rotateSuperposition() {
    if (!superpositionCreated || superpositionMeasured) return;
    
    // Set button states
    const createBtn = document.getElementById('create-superposition-btn');
    const rotateBtn = document.getElementById('rotate-superposition-btn');
    const measureBtn = document.getElementById('measure-superposition-btn');
    
    if (createBtn) createBtn.classList.remove('active');
    if (rotateBtn) rotateBtn.classList.add('active');
    if (measureBtn) measureBtn.classList.remove('active');
    
    // For two-state system, rotate on the Bloch sphere
    if (superpositionStates === 2) {
        // Apply a Hadamard-like rotation (around Y axis)
        const currentX = blochSphere.x;
        const currentZ = blochSphere.z;
        
        blochSphere.x = currentZ;
        blochSphere.z = currentX;
        
        // Update amplitudes based on new Bloch sphere coordinates
        if (superpositionParticles.length > 0 && superpositionParticles[0].states.length >= 2) {
            const state0 = superpositionParticles[0].states[0];
            const state1 = superpositionParticles[0].states[1];
            
            // Calculate new amplitudes based on Bloch sphere
            state0.amplitude = Math.sqrt((1 + blochSphere.z) / 2);
            state1.amplitude = Math.sqrt((1 - blochSphere.z) / 2);
            if (blochSphere.x < 0) {
                state1.phase = Math.PI; // Add a phase of π for negative x
            } else {
                state1.phase = 0;
            }
            
            // Update probabilities
            state0.probability = state0.amplitude * state0.amplitude;
            state1.probability = state1.amplitude * state1.amplitude;
        }
    } else {
        // For multi-state systems, simply rotate phases
        superpositionRotationAngle += Math.PI / 4;
        
        if (superpositionParticles.length > 0) {
            for (let i = 0; i < superpositionParticles[0].states.length; i++) {
                const state = superpositionParticles[0].states[i];
                state.phase = (i * superpositionRotationAngle) % (Math.PI * 2);
            }
        }
    }
    
    updateSuperpositionDescription();
}

// Measure the superposition state
function measureSuperposition() {
    if (!superpositionCreated || superpositionMeasured) return;
    
    // Set button states
    const createBtn = document.getElementById('create-superposition-btn');
    const rotateBtn = document.getElementById('rotate-superposition-btn');
    const measureBtn = document.getElementById('measure-superposition-btn');
    
    if (createBtn) createBtn.classList.remove('active');
    if (rotateBtn) rotateBtn.classList.remove('active');
    if (measureBtn) measureBtn.classList.add('active');
    
    superpositionMeasured = true;
    
    // Perform measurement
    if (superpositionParticles.length > 0) {
        const states = superpositionParticles[0].states;
        let totalProbability = 0;
        const probabilities = [];
        
        // Calculate cumulative probabilities
        for (let i = 0; i < states.length; i++) {
            const state = states[i];
            totalProbability += state.probability;
            probabilities.push({
                state: i,
                cumulativeProbability: totalProbability
            });
        }
        
        // Select a state based on probabilities
        const random = Math.random();
        let selectedState = states.length - 1;
        
        for (let i = 0; i < probabilities.length; i++) {
            if (random <= probabilities[i].cumulativeProbability) {
                selectedState = probabilities[i].state;
                break;
            }
        }
        
        // Collapse to the selected state
        for (let i = 0; i < states.length; i++) {
            if (i === selectedState) {
                states[i].amplitude = 1;
                states[i].probability = 1;
            } else {
                states[i].amplitude = 0;
                states[i].probability = 0;
            }
        }
        
        // Record the measurement result
        measurementResults.push(selectedState);
        
        // Update Bloch sphere for 2-state system
        if (superpositionStates === 2) {
            blochSphere = {
                x: 0,
                y: 0,
                z: selectedState === 0 ? 1 : -1
            };
        }
    }
    
    updateSuperpositionDescription();
}

// Update superposition properties
function updateSuperpositionProperty(property, value) {
    if (property === 'coherence') {
        superpositionCoherence = parseInt(value);
        document.getElementById('superposition-coherence-value').textContent = value;
    } else if (property === 'states') {
        superpositionStates = parseInt(value);
        document.getElementById('superposition-states-value').textContent = value;
        // Recreate superposition with new number of states
        if (superpositionCreated) {
            createSuperposition();
        }
    }
    
    updateSuperpositionDescription();
}

// Set visualization mode
function setSuperpositionMode(mode) {
    superpositionMode = mode;
    
    // Update button states
    const buttons = document.querySelectorAll('.control-button');
    buttons.forEach(button => {
        if (button.textContent.toLowerCase().includes(mode)) {
            button.classList.add('active');
        } else if (button.textContent.toLowerCase().includes('bloch') || 
                  button.textContent.toLowerCase().includes('wave') || 
                  button.textContent.toLowerCase().includes('stats')) {
            button.classList.remove('active');
        }
    });
    
    updateSuperpositionDescription();
}

// Animation loop
function animateSuperposition() {
    if (!superpositionCanvas) return;
    
    // Clear canvas
    superpositionCtx.clearRect(0, 0, superpositionCanvas.width, superpositionCanvas.height);
    
    // Draw based on current mode
    if (superpositionMode === 'bloch') {
        drawBlochSphere();
    } else if (superpositionMode === 'wave') {
        drawWaveFunction();
    } else if (superpositionMode === 'stats') {
        drawStatistics();
    }
    
    // Continue animation
    superpositionAnimationId = requestAnimationFrame(animateSuperposition);
}

// Draw Bloch sphere (for 2-state systems)
function drawBlochSphere() {
    if (!superpositionCanvas || !superpositionCtx || superpositionStates !== 2) return;
    
    const ctx = superpositionCtx;
    const width = superpositionCanvas.width;
    const height = superpositionCanvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.3;
    
    // Clear the canvas with a dark background
    ctx.fillStyle = 'rgba(5, 5, 20, 0.95)';
    ctx.fillRect(0, 0, width, height);
    
    // Draw phi-harmonic grid
    drawPhiHarmonicGrid(ctx, width, height);
    
    // Draw sphere
    ctx.save();
    ctx.translate(centerX, centerY);
    
    // Draw equator (xy-plane)
    ctx.beginPath();
    ctx.ellipse(0, 0, radius, radius * 0.4, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(100, 100, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw vertical circle (xz-plane)
    ctx.beginPath();
    ctx.ellipse(0, 0, radius, radius, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(100, 255, 100, 0.5)';
    ctx.stroke();
    
    // Draw axes
    const axisLength = radius * 1.2;
    
    // z-axis
    ctx.beginPath();
    ctx.moveTo(0, -axisLength);
    ctx.lineTo(0, axisLength);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.stroke();
    
    // x-axis
    ctx.beginPath();
    ctx.moveTo(-axisLength, 0);
    ctx.lineTo(axisLength, 0);
    ctx.stroke();
    
    // y-axis (foreshortened for perspective)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(axisLength * 0.4, -axisLength * 0.2);
    ctx.stroke();
    
    // Draw axis labels
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('|0⟩', 0, -axisLength - 10);
    ctx.fillText('|1⟩', 0, axisLength + 20);
    ctx.fillText('+', axisLength + 10, 5);
    ctx.fillText('−', -axisLength - 10, 5);
    
    // Draw current quantum state vector
    const {x, y, z} = blochSphere;
    
    // Calculate projected coordinates
    const projectedX = x * radius;
    const projectedY = -z * radius;  // Negate for correct orientation
    
    // Draw state vector
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(projectedX, projectedY);
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.9)';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw point at the end of the vector
    ctx.beginPath();
    ctx.arc(projectedX, projectedY, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    
    // Draw quantum state information
    if (superpositionParticles.length > 0 && superpositionParticles[0].states.length >= 2) {
        const state0 = superpositionParticles[0].states[0];
        const state1 = superpositionParticles[0].states[1];
        
        // Math representation with phi-harmonics
        const amplitude0 = state0.amplitude.toFixed(3);
        const amplitude1 = state1.amplitude.toFixed(3);
        const phase1 = state1.phase === 0 ? '' : 'e^(iπ)';
        
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#FFD700';
        ctx.textAlign = 'center';
        ctx.fillText(`|ψ⟩ = ${amplitude0}|0⟩ + ${amplitude1}${phase1}|1⟩`, 0, radius * 1.5);
        
        // Draw probability info
        ctx.font = '14px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(`P(|0⟩) = ${(state0.probability * 100).toFixed(1)}%`, -radius * 0.8, radius * 1.7);
        ctx.fillText(`P(|1⟩) = ${(state1.probability * 100).toFixed(1)}%`, radius * 0.8, radius * 1.7);
    }
    
    // Draw phi-harmonic frequency marker
    const freq = CASCADE.ActiveFrequency || FREQUENCIES.CREATION;
    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'right';
    ctx.fillText(`φ-Frequency: ${freq} Hz`, width/2 - 20, -height/2 + 20);
    
    ctx.restore();
}

// Helper function to draw phi-harmonic grid
function drawPhiHarmonicGrid(ctx, width, height) {
    const phi = 1.618033988749895;
    const gridSpacing = height / 10;
    
    ctx.strokeStyle = 'rgba(80, 80, 160, 0.15)';
    ctx.lineWidth = 1;
    
    // Draw horizontal phi-harmonic lines
    for (let i = 0; i < 10; i++) {
        const y = i * gridSpacing;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Draw vertical phi-harmonic lines
    for (let i = 0; i < 15; i++) {
        const x = i * gridSpacing * phi / 2;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // Draw phi-spiral (subtle background element)
    ctx.strokeStyle = 'rgba(100, 100, 255, 0.1)';
    ctx.beginPath();
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.4;
    let radius = 5;
    let angle = 0;
    
    ctx.moveTo(centerX + radius, centerY);
    
    for (let i = 0; i < 10; i++) {
        angle += 0.5;
        radius *= phi / 2;
        if (radius > maxRadius) break;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}

// Draw wave function representation
function drawWaveFunction() {
    const width = superpositionCanvas.width;
    const height = superpositionCanvas.height;
    const time = performance.now() / 1000;
    
    // Draw axis
    superpositionCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    superpositionCtx.lineWidth = 1;
    superpositionCtx.beginPath();
    superpositionCtx.moveTo(0, height / 2);
    superpositionCtx.lineTo(width, height / 2);
    superpositionCtx.stroke();
    
    // Draw reference points at 0, π, and 2π
    superpositionCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    superpositionCtx.textAlign = 'center';
    superpositionCtx.font = '12px Arial';
    
    const divisions = 4;
    for (let i = 0; i <= divisions; i++) {
        const x = (width / divisions) * i;
        superpositionCtx.beginPath();
        superpositionCtx.moveTo(x, height / 2 - 5);
        superpositionCtx.lineTo(x, height / 2 + 5);
        superpositionCtx.stroke();
        
        // Draw point labels (0, π/2, π, 3π/2, 2π)
        let label;
        if (i === 0) label = '0';
        else if (i === divisions / 4) label = 'π/2';
        else if (i === divisions / 2) label = 'π';
        else if (i === (divisions * 3) / 4) label = '3π/2';
        else if (i === divisions) label = '2π';
        
        if (label) {
            superpositionCtx.fillText(label, x, height / 2 + 20);
        }
    }
    
    // Draw phase reference line
    superpositionCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    for (let x = 0; x < width; x += 20) {
        superpositionCtx.beginPath();
        superpositionCtx.moveTo(x, 0);
        superpositionCtx.lineTo(x, height);
        superpositionCtx.stroke();
    }
    
    // Only proceed if we have particles
    if (superpositionParticles.length === 0) return;
    
    const states = superpositionParticles[0].states;
    const centerY = height / 2;
    const amplitude = height * 0.3; // Scale for visualization
    
    // Draw each state's wave function component
    for (let i = 0; i < states.length; i++) {
        const state = states[i];
        const stateAmplitude = state.amplitude * amplitude;
        const statePhase = state.phase;
        const coherenceFactor = superpositionCoherence / 100;
        
        // Set line color based on state
        superpositionCtx.strokeStyle = state.color;
        superpositionCtx.lineWidth = 2;
        
        // Draw wave function for this state
        superpositionCtx.beginPath();
        
        for (let x = 0; x < width; x++) {
            const xNormalized = x / width; // 0 to 1
            const xPhase = xNormalized * Math.PI * 2; // 0 to 2π
            
            // Calculate wave function value (simplification for visualization)
            // Use a combination of sine waves to create a more quantum-like appearance
            const phaseOffset = statePhase;
            const frequency = 1 + i * 0.2; // Different frequency for each state
            
            // Coherence affects how "clean" the wave appears
            const noise = (1 - coherenceFactor) * Math.random() * 20;
            const waveValue = Math.sin(xPhase * frequency + phaseOffset + time) * stateAmplitude + noise;
            
            const y = centerY - waveValue * state.amplitude;
            
            if (x === 0) {
                superpositionCtx.moveTo(x, y);
            } else {
                superpositionCtx.lineTo(x, y);
            }
        }
        
        superpositionCtx.stroke();
        
        // Draw state label
        superpositionCtx.fillStyle = state.color;
        superpositionCtx.textAlign = 'left';
        superpositionCtx.font = '14px Arial';
        superpositionCtx.fillText(
            `${state.label}: ${Math.round(state.probability * 100)}%`,
            20,
            40 + i * 25
        );
    }
    
    // Draw composite wave function (sum of all states)
    if (states.length > 1 && !superpositionMeasured) {
        superpositionCtx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        superpositionCtx.lineWidth = 3;
        superpositionCtx.beginPath();
        
        for (let x = 0; x < width; x++) {
            const xNormalized = x / width;
            const xPhase = xNormalized * Math.PI * 2;
            
            // Sum all wave functions
            let sumValue = 0;
            for (let i = 0; i < states.length; i++) {
                const state = states[i];
                const stateAmplitude = state.amplitude * amplitude;
                const phaseOffset = state.phase;
                const frequency = 1 + i * 0.2;
                
                sumValue += Math.sin(xPhase * frequency + phaseOffset + time) * stateAmplitude * state.amplitude;
            }
            
            const y = centerY - sumValue;
            
            if (x === 0) {
                superpositionCtx.moveTo(x, y);
            } else {
                superpositionCtx.lineTo(x, y);
            }
        }
        
        superpositionCtx.stroke();
        
        // Label for composite wave
        superpositionCtx.fillStyle = 'white';
        superpositionCtx.textAlign = 'left';
        superpositionCtx.font = 'bold 14px Arial';
        superpositionCtx.fillText('Composite Wave Function', 20, 20);
    }
    
    // Draw measurement effect
    if (superpositionMeasured) {
        const selectedState = states.find(s => s.amplitude > 0);
        if (selectedState) {
            superpositionCtx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            superpositionCtx.fillRect(0, 0, width, height);
            
            superpositionCtx.strokeStyle = selectedState.color;
            superpositionCtx.lineWidth = 4;
            superpositionCtx.beginPath();
            
            for (let x = 0; x < width; x++) {
                const xNormalized = x / width;
                const xPhase = xNormalized * Math.PI * 2;
                
                // Use the selected state's wave function
                const stateAmplitude = amplitude;
                const phaseOffset = selectedState.phase;
                const frequency = 1 + selectedState.id * 0.2;
                
                const waveValue = Math.sin(xPhase * frequency + phaseOffset + time) * stateAmplitude;
                const y = centerY - waveValue;
                
                if (x === 0) {
                    superpositionCtx.moveTo(x, y);
                } else {
                    superpositionCtx.lineTo(x, y);
                }
            }
            
            superpositionCtx.stroke();
            
            // Draw "measured" label
            superpositionCtx.fillStyle = 'white';
            superpositionCtx.textAlign = 'center';
            superpositionCtx.font = 'bold 20px Arial';
            superpositionCtx.fillText(`Measured: ${selectedState.label}`, width / 2, 40);
        }
    }
}

// Draw measurement statistics
function drawStatistics() {
    const width = superpositionCanvas.width;
    const height = superpositionCanvas.height;
    
    // Draw title
    superpositionCtx.fillStyle = 'white';
    superpositionCtx.textAlign = 'center';
    superpositionCtx.font = 'bold 20px Arial';
    superpositionCtx.fillText('Quantum State Probabilities', width / 2, 40);
    
    // Only proceed if we have particles
    if (superpositionParticles.length === 0) return;
    
    const states = superpositionParticles[0].states;
    const chartWidth = width * 0.8;
    const chartHeight = height * 0.6;
    const chartX = (width - chartWidth) / 2;
    const chartY = height * 0.2;
    
    // Draw chart axes
    superpositionCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    superpositionCtx.lineWidth = 2;
    superpositionCtx.beginPath();
    superpositionCtx.moveTo(chartX, chartY);
    superpositionCtx.lineTo(chartX, chartY + chartHeight);
    superpositionCtx.lineTo(chartX + chartWidth, chartY + chartHeight);
    superpositionCtx.stroke();
    
    // Draw axis labels
    superpositionCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    superpositionCtx.textAlign = 'center';
    superpositionCtx.font = '14px Arial';
    superpositionCtx.fillText('Quantum States', chartX + chartWidth / 2, chartY + chartHeight + 30);
    
    superpositionCtx.save();
    superpositionCtx.translate(chartX - 30, chartY + chartHeight / 2);
    superpositionCtx.rotate(-Math.PI / 2);
    superpositionCtx.fillText('Probability', 0, 0);
    superpositionCtx.restore();
    
    // Draw probability grid lines
    superpositionCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    superpositionCtx.lineWidth = 1;
    
    for (let i = 0; i <= 10; i++) {
        const y = chartY + chartHeight - (i / 10) * chartHeight;
        superpositionCtx.beginPath();
        superpositionCtx.moveTo(chartX, y);
        superpositionCtx.lineTo(chartX + chartWidth, y);
        superpositionCtx.stroke();
        
        // Draw percentage labels
        superpositionCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        superpositionCtx.textAlign = 'right';
        superpositionCtx.fillText(`${i * 10}%`, chartX - 10, y + 5);
    }
    
    // Draw bars for each state
    const barWidth = chartWidth / states.length;
    const barPadding = barWidth * 0.2;
    
    for (let i = 0; i < states.length; i++) {
        const state = states[i];
        const barHeight = chartHeight * state.probability;
        const barX = chartX + i * barWidth + barPadding;
        const barY = chartY + chartHeight - barHeight;
        
        // Draw bar
        superpositionCtx.fillStyle = state.color;
        superpositionCtx.fillRect(barX, barY, barWidth - barPadding * 2, barHeight);
        
        // Draw state label
        superpositionCtx.fillStyle = 'white';
        superpositionCtx.textAlign = 'center';
        superpositionCtx.font = '14px Arial';
        superpositionCtx.fillText(state.label, barX + (barWidth - barPadding * 2) / 2, chartY + chartHeight + 20);
        
        // Draw probability percentage
        superpositionCtx.fillText(
            `${Math.round(state.probability * 100)}%`,
            barX + (barWidth - barPadding * 2) / 2,
            barY - 10
        );
    }
    
    // Draw measurement results if available
    if (measurementResults.length > 0) {
        const stateCounts = {};
        
        // Count occurrences of each state
        for (const result of measurementResults) {
            if (!stateCounts[result]) {
                stateCounts[result] = 0;
            }
            stateCounts[result]++;
        }
        
        // Draw measurement statistics
        superpositionCtx.fillStyle = 'white';
        superpositionCtx.textAlign = 'left';
        superpositionCtx.font = 'bold 16px Arial';
        superpositionCtx.fillText('Measurement Results:', 50, height - 80);
        
        superpositionCtx.font = '14px Arial';
        let resultText = '';
        
        for (let i = 0; i < states.length; i++) {
            const count = stateCounts[i] || 0;
            const percentage = measurementResults.length > 0 ? (count / measurementResults.length) * 100 : 0;
            resultText += `${states[i].label}: ${count} (${Math.round(percentage)}%) `;
        }
        
        superpositionCtx.fillText(resultText, 50, height - 50);
        superpositionCtx.fillText(`Total measurements: ${measurementResults.length}`, 50, height - 20);
    }
}

// Update state description
function updateSuperpositionDescription() {
    const stateInfo = document.getElementById('current-state-description');
    if (!stateInfo) return;
    
    let description = '';
    
    if (!superpositionCreated) {
        description = 'Click "Create Superposition" to start the demo.';
    } else if (superpositionMeasured) {
        const selectedState = superpositionParticles[0].states.find(s => s.amplitude > 0);
        if (selectedState) {
            description = `The system has collapsed to state ${selectedState.label} upon measurement. This demonstrates how measurement forces a quantum system to choose a single state from its superposition.`;
        } else {
            description = 'The system has been measured, but no state was selected.';
        }
    } else {
        // Different descriptions based on mode
        if (superpositionMode === 'bloch') {
            if (superpositionStates === 2) {
                description = `The Bloch sphere represents a qubit - the fundamental unit of quantum computing. The sphere's surface shows all possible states of a quantum system. The north pole is |0⟩, the south pole is |1⟩, and points on the equator represent equal superpositions with different phases.`;
            } else {
                description = `This visualization shows a ${superpositionStates}-dimensional quantum system with each basis state represented as a point. The central particle represents the complete quantum system, and the connections show the amplitude and phase relationship to each basis state.`;
            }
        } else if (superpositionMode === 'wave') {
            description = `The wave function visualization shows the probability amplitude waves for each state component and their combined effect. The horizontal axis represents position (or phase), and the vertical displacement shows the amplitude at each point.`;
        } else if (superpositionMode === 'stats') {
            description = `This graph shows the probability of measuring each basis state. In quantum mechanics, measuring a system in superposition will randomly collapse it to one of its basis states according to these probabilities.`;
        }
    }
    
    stateInfo.textContent = description;
}