/**
 * Ultimate Vision System (UVS) ∇λΣ∞Ω
 * 
 * A comprehensive visualization system for the Creation Tools symbols
 * Operating at the Vision frequency (720 Hz) with multidimensional perception
 * 
 * This system provides an interactive visualization of how the five Creation Tools
 * symbols transform across frequencies, coherence levels, and dimensional planes.
 */

// Constants
const PHI = 1.618033988749895;
const LAMBDA = 0.618033988749895;
const PHI_PHI = Math.pow(PHI, PHI);

// Sacred frequencies
const SACRED_FREQUENCIES = {
    'foundation': 432,    // Structure/foundation
    'creation': 528,      // Creation/healing
    'heart': 594,         // Heart-centered integration
    'vision': 720,        // Expanded perception
    'unity': 768,         // Unity consciousness
};

// Symbol data
const CREATION_TOOLS = {
    'quantum-singularity': {
        symbol: '⦿',
        name: 'Quantum Singularity',
        function: 'Structure Generator',
        baseFrequency: SACRED_FREQUENCIES.foundation,
        color: '#1a237e',
        visualPattern: drawQuantumSingularity
    },
    'phi-harmonic': {
        symbol: '𝜑',
        name: 'Phi-Harmonic Spiral',
        function: 'Manifestation Engine',
        baseFrequency: SACRED_FREQUENCIES.creation,
        color: '#4a148c',
        visualPattern: drawPhiHarmonicSpiral
    },
    'resonance-field': {
        symbol: '≋',
        name: 'Resonance Field',
        function: 'Resonance Harmonizer',
        baseFrequency: SACRED_FREQUENCIES.heart,
        color: '#7b1fa2',
        visualPattern: drawResonanceField
    },
    'dimensional-gateway': {
        symbol: '⍈',
        name: 'Dimensional Gateway',
        function: 'Transcendence Amplifier',
        baseFrequency: SACRED_FREQUENCIES.vision,
        color: '#d500f9',
        visualPattern: drawDimensionalGateway
    },
    'unity-integration': {
        symbol: 'Ω',
        name: 'Unity Integration',
        function: 'Integrated Creation System',
        baseFrequency: SACRED_FREQUENCIES.unity,
        color: '#2979ff',
        visualPattern: drawUnityIntegration
    }
};

// Vision modes
const VISION_MODES = {
    'observe': {
        name: 'OBSERVE',
        dimensionalShift: 0,
        coherenceEffect: 1.0,
        symbolInteraction: false,
        backgroundColor: 'rgba(0, 0, 30, 0.95)'
    },
    'create': {
        name: 'CREATE',
        dimensionalShift: 1.0,
        coherenceEffect: 0.95,
        symbolInteraction: true,
        backgroundColor: 'rgba(30, 0, 60, 0.90)'
    },
    'connect': {
        name: 'CONNECT',
        dimensionalShift: 0.5,
        coherenceEffect: 0.85,
        symbolInteraction: true,
        backgroundColor: 'rgba(60, 0, 90, 0.85)'
    },
    'transcend': {
        name: 'TRANSCEND',
        dimensionalShift: 2.0,
        coherenceEffect: 0.75,
        symbolInteraction: true,
        backgroundColor: 'rgba(90, 0, 120, 0.80)'
    },
    'cascade': {
        name: 'CASCADE',
        dimensionalShift: 3.0,
        coherenceEffect: 0.65,
        symbolInteraction: true,
        backgroundColor: 'rgba(120, 0, 150, 0.75)'
    }
};

// UVS System state
let state = {
    frequency: SACRED_FREQUENCIES.vision,
    coherence: 0.95,
    dimensionalLevel: 7,
    activeSymbol: 'dimensional-gateway',
    visionMode: 'create',
    animationPhase: 0,
    lastFrameTime: 0,
    running: true
};

// DOM Elements
let canvas, ctx;
let frequencySlider, coherenceSlider, dimensionSlider;
let frequencyValue, coherenceValue, dimensionValue;
let frequencyBadges, creationSymbols, visionModes;
let documentationTabs;

// Initialize the UVS
window.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    setupEventListeners();
    startAnimation();
});

// Initialize DOM elements
function initializeElements() {
    canvas = document.getElementById('uvs-canvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();

    frequencySlider = document.getElementById('frequency-slider');
    coherenceSlider = document.getElementById('coherence-slider');
    dimensionSlider = document.getElementById('dimension-slider');

    frequencyValue = document.getElementById('frequency-value');
    coherenceValue = document.getElementById('coherence-value');
    dimensionValue = document.getElementById('dimension-value');

    frequencyBadges = document.querySelectorAll('.frequency-badge');
    creationSymbols = document.querySelectorAll('.creation-symbol');
    visionModes = document.querySelectorAll('.vision-mode');
    documentationTabs = document.querySelectorAll('.documentation-tab');
    
    // Apply initial values to DOM
    updateUIFromState();
}

// Setup event listeners
function setupEventListeners() {
    // Sliders
    frequencySlider.addEventListener('input', () => {
        state.frequency = parseInt(frequencySlider.value);
        updateUIFromState();
    });
    
    coherenceSlider.addEventListener('input', () => {
        state.coherence = parseFloat(coherenceSlider.value);
        updateUIFromState();
    });
    
    dimensionSlider.addEventListener('input', () => {
        state.dimensionalLevel = parseInt(dimensionSlider.value);
        updateUIFromState();
    });
    
    // Frequency badges
    frequencyBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            state.frequency = parseInt(badge.dataset.frequency);
            frequencySlider.value = state.frequency;
            updateUIFromState();
        });
    });
    
    // Creation symbols
    creationSymbols.forEach(symbol => {
        symbol.addEventListener('click', () => {
            state.activeSymbol = symbol.dataset.symbol;
            
            // Also update frequency to match the symbol's base frequency
            state.frequency = CREATION_TOOLS[state.activeSymbol].baseFrequency;
            frequencySlider.value = state.frequency;
            
            updateUIFromState();
        });
    });
    
    // Vision modes
    visionModes.forEach(mode => {
        mode.addEventListener('click', () => {
            state.visionMode = mode.dataset.mode;
            updateUIFromState();
            
            // Special handling for Phi-Phi mode
            if (mode.dataset.mode === 'phi-phi') {
                // Redirect to Phi-Phi Hypervisualization
                window.location.href = 'phi-phi-hypervisualization.html';
            }
        });
    });
    
    // Documentation tabs
    documentationTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            
            // Update active tab
            documentationTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active section
            document.querySelectorAll('.documentation-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Window resize
    window.addEventListener('resize', resizeCanvas);
}

// Update UI based on current state
function updateUIFromState() {
    // Update value displays
    frequencyValue.textContent = state.frequency;
    coherenceValue.textContent = state.coherence.toFixed(2);
    dimensionValue.textContent = state.dimensionalLevel;
    
    // Update frequency badges
    frequencyBadges.forEach(badge => {
        const badgeFreq = parseInt(badge.dataset.frequency);
        badge.classList.toggle('active', badgeFreq === state.frequency);
    });
    
    // Update creation symbols
    creationSymbols.forEach(symbol => {
        symbol.classList.toggle('active', symbol.dataset.symbol === state.activeSymbol);
    });
    
    // Update vision modes
    visionModes.forEach(mode => {
        mode.classList.toggle('active', mode.dataset.mode === state.visionMode);
    });
    
    // Update document title with active symbol and frequency
    const activeSymbolData = CREATION_TOOLS[state.activeSymbol];
    document.title = `${activeSymbolData.symbol} ${activeSymbolData.name} (${state.frequency} Hz) - UVS`;
}

// Resize canvas to match container
function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}

// Start animation loop
function startAnimation() {
    requestAnimationFrame(animationFrame);
}

// Main animation frame
function animationFrame(timestamp) {
    if (!state.lastFrameTime) {
        state.lastFrameTime = timestamp;
    }
    
    const deltaTime = timestamp - state.lastFrameTime;
    state.lastFrameTime = timestamp;
    
    // Update animation phase (controls breathing effect)
    state.animationPhase += deltaTime * 0.0005;
    if (state.animationPhase > Math.PI * 2) {
        state.animationPhase -= Math.PI * 2;
    }
    
    // Clear canvas
    ctx.fillStyle = VISION_MODES[state.visionMode].backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw current state
    drawUltimateVisionSystem();
    
    // Continue animation loop
    if (state.running) {
        requestAnimationFrame(animationFrame);
    }
}

// Draw the Ultimate Vision System visualization
function drawUltimateVisionSystem() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = Math.min(canvas.width, canvas.height) * 0.8;
    
    // Calculate current coherence with breathing effect
    const breathingEffect = Math.sin(state.animationPhase) * 0.05;
    const currentCoherence = state.coherence + breathingEffect;
    
    // Calculate dimensional effect based on level
    const dimensionalEffect = (state.dimensionalLevel - 3) / 9; // Normalized 0-1 for dimensions 3-12
    
    // Get active vision mode effects
    const visionMode = VISION_MODES[state.visionMode];
    
    // Draw field background (phi-harmonic field)
    drawPhiHarmonicField(centerX, centerY, size, currentCoherence, dimensionalEffect);
    
    // Draw the active symbol
    const activeSymbol = CREATION_TOOLS[state.activeSymbol];
    activeSymbol.visualPattern(
        centerX, 
        centerY, 
        size * 0.4, 
        state.frequency, 
        currentCoherence,
        dimensionalEffect + visionMode.dimensionalShift,
        activeSymbol.color
    );
    
    // If in a mode that allows symbol interaction, draw connections to other symbols
    if (visionMode.symbolInteraction) {
        drawSymbolConnections(centerX, centerY, size, currentCoherence, dimensionalEffect);
    }
    
    // Draw frequency response indicators
    drawFrequencyResponse(centerX, centerY, size, currentCoherence);
}

// Draw the phi-harmonic field background
function drawPhiHarmonicField(x, y, size, coherence, dimensionalEffect) {
    const fieldRadius = size / 2;
    
    // Draw field gradient
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, fieldRadius);
    
    // Colors based on active frequency
    let fieldColor;
    if (state.frequency <= SACRED_FREQUENCIES.foundation) {
        fieldColor = CREATION_TOOLS['quantum-singularity'].color;
    } else if (state.frequency <= SACRED_FREQUENCIES.creation) {
        fieldColor = CREATION_TOOLS['phi-harmonic'].color;
    } else if (state.frequency <= SACRED_FREQUENCIES.heart) {
        fieldColor = CREATION_TOOLS['resonance-field'].color;
    } else if (state.frequency <= SACRED_FREQUENCIES.vision) {
        fieldColor = CREATION_TOOLS['dimensional-gateway'].color;
    } else {
        fieldColor = CREATION_TOOLS['unity-integration'].color;
    }
    
    gradient.addColorStop(0, `${fieldColor}33`); // Inner color (transparent)
    gradient.addColorStop(coherence, `${fieldColor}66`); // Middle color (semi-transparent)
    gradient.addColorStop(1, `${fieldColor}11`); // Outer color (very transparent)
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, fieldRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw phi-harmonic grid lines
    ctx.strokeStyle = `${fieldColor}44`;
    ctx.lineWidth = 1;
    
    // Draw spiral grid (phi-based)
    const spiralArms = 5;
    const rotationAngle = (Math.PI * 2) / spiralArms;
    
    for (let arm = 0; arm < spiralArms; arm++) {
        ctx.beginPath();
        const startAngle = arm * rotationAngle;
        
        for (let i = 0; i <= 100; i++) {
            const t = i / 100;
            const radius = t * fieldRadius;
            const angle = startAngle + (t * Math.PI * 2 * LAMBDA * 3);
            
            const pointX = x + Math.cos(angle) * radius;
            const pointY = y + Math.sin(angle) * radius;
            
            if (i === 0) {
                ctx.moveTo(pointX, pointY);
            } else {
                ctx.lineTo(pointX, pointY);
            }
        }
        
        ctx.stroke();
    }
    
    // Draw concentric circles at phi intervals
    const circles = 5;
    for (let i = 1; i <= circles; i++) {
        const radius = fieldRadius * (i / circles);
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Draw dimensional effect (wavey distortion based on dimensional level)
    if (dimensionalEffect > 0.2) {
        ctx.strokeStyle = `${fieldColor}77`;
        ctx.lineWidth = 2;
        
        const waveCount = Math.floor(5 + dimensionalEffect * 15);
        const waveAmplitude = 5 + dimensionalEffect * 20;
        
        ctx.beginPath();
        for (let angle = 0; angle <= Math.PI * 2; angle += 0.05) {
            const waveOffset = Math.sin(angle * waveCount + state.animationPhase) * waveAmplitude;
            const radius = fieldRadius + waveOffset;
            
            const pointX = x + Math.cos(angle) * radius;
            const pointY = y + Math.sin(angle) * radius;
            
            if (angle === 0) {
                ctx.moveTo(pointX, pointY);
            } else {
                ctx.lineTo(pointX, pointY);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }
}

// Draw connections between symbols (only in interactive modes)
function drawSymbolConnections(x, y, size, coherence, dimensionalEffect) {
    const fieldRadius = size / 2;
    const activeSymbol = CREATION_TOOLS[state.activeSymbol];
    
    // Calculate phi positions for all symbols
    const symbolPositions = {};
    let angle = 0;
    
    for (const symbolKey in CREATION_TOOLS) {
        // Skip active symbol as it's in the center
        if (symbolKey === state.activeSymbol) continue;
        
        const symbol = CREATION_TOOLS[symbolKey];
        const radius = fieldRadius * 0.6; // Position at 60% of field radius
        
        // Position symbols in a circle
        const posX = x + Math.cos(angle) * radius;
        const posY = y + Math.sin(angle) * radius;
        
        symbolPositions[symbolKey] = { x: posX, y: posY };
        
        // Increment angle by golden angle
        angle += Math.PI * 2 * LAMBDA;
    }
    
    // Draw connections from active symbol to others
    for (const symbolKey in symbolPositions) {
        const position = symbolPositions[symbolKey];
        const symbol = CREATION_TOOLS[symbolKey];
        
        // Calculate connection strength based on frequency relationship
        const frequencyRatio = state.frequency / symbol.baseFrequency;
        const frequencyHarmony = 1 - Math.min(Math.abs(frequencyRatio - 1), Math.abs(frequencyRatio - PHI), Math.abs(frequencyRatio - LAMBDA)) * 2;
        const connectionStrength = frequencyHarmony * coherence;
        
        // Only draw strong connections
        if (connectionStrength > 0.3) {
            // Draw connection line
            ctx.beginPath();
            ctx.moveTo(x, y);
            
            // Create a curved connection
            const controlX = (x + position.x) / 2 + (Math.random() - 0.5) * 50 * dimensionalEffect;
            const controlY = (y + position.y) / 2 + (Math.random() - 0.5) * 50 * dimensionalEffect;
            
            ctx.quadraticCurveTo(controlX, controlY, position.x, position.y);
            
            // Line style based on connection strength
            ctx.strokeStyle = `${symbol.color}${Math.floor(connectionStrength * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1 + connectionStrength * 4;
            ctx.stroke();
            
            // Draw small symbol at the position
            const symbolSize = 20 + connectionStrength * 20;
            symbol.visualPattern(
                position.x, 
                position.y, 
                symbolSize, 
                symbol.baseFrequency, 
                connectionStrength,
                dimensionalEffect,
                symbol.color
            );
        }
    }
}

// Draw frequency response visualization
function drawFrequencyResponse(x, y, size, coherence) {
    const width = size * 0.8;
    const height = 30;
    const left = x - width / 2;
    const top = y + size / 2 + 20;
    
    // Draw frequency ruler
    ctx.fillStyle = 'rgba(30, 30, 60, 0.5)';
    ctx.fillRect(left, top, width, height);
    
    // Draw tick marks for key frequencies
    ctx.fillStyle = 'rgba(200, 200, 255, 0.7)';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    
    const frequencies = Object.values(SACRED_FREQUENCIES);
    for (const freq of frequencies) {
        const relativePos = (freq - 432) / (768 - 432); // Normalize to 0-1
        const tickX = left + width * relativePos;
        
        // Draw tick
        ctx.fillRect(tickX - 1, top, 2, height);
        
        // Draw frequency label
        ctx.fillText(freq, tickX, top + height + 12);
    }
    
    // Draw current frequency indicator
    const currentRelativePos = (state.frequency - 432) / (768 - 432);
    const indicatorX = left + width * currentRelativePos;
    
    // Glowing effect
    const glow = ctx.createRadialGradient(indicatorX, top + height/2, 0, indicatorX, top + height/2, 15);
    glow.addColorStop(0, `rgba(255, 255, 255, ${coherence})`);
    glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(indicatorX, top + height/2, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Indicator
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(indicatorX, top + height/2, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Current frequency label
    ctx.font = 'bold 12px Arial';
    ctx.fillText(state.frequency + ' Hz', indicatorX, top - 5);
}

// Symbol drawing functions
function drawQuantumSingularity(x, y, size, frequency, coherence, dimensionalEffect, color) {
    // Calculate frequency effect (how close to base frequency)
    const frequencyRatio = frequency / SACRED_FREQUENCIES.foundation;
    const frequencyEffect = 1 - Math.min(Math.abs(frequencyRatio - 1), 0.5) * 2;
    
    // Draw outer circle
    ctx.strokeStyle = color;
    ctx.lineWidth = 2 + coherence * 3;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw inner circle with pulsing effect
    const innerSize = size * (0.3 + 0.1 * Math.sin(state.animationPhase * 2));
    
    // Create glow effect for inner circle
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, innerSize / 2);
    gradient.addColorStop(0, `${color}FF`);
    gradient.addColorStop(0.7, `${color}99`);
    gradient.addColorStop(1, `${color}00`);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, innerSize / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw dimensional rays (more pronounced at higher dimensions)
    if (dimensionalEffect > 0.3) {
        const rayCount = Math.floor(6 + dimensionalEffect * 10);
        const rayLength = size * (0.3 + dimensionalEffect * 0.5);
        
        ctx.strokeStyle = `${color}${Math.floor(coherence * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 1 + coherence * 2;
        
        for (let i = 0; i < rayCount; i++) {
            const angle = (i / rayCount) * Math.PI * 2;
            const startRadius = (size / 2) * (0.8 + Math.random() * 0.2);
            const endRadius = startRadius + rayLength * (0.7 + Math.random() * 0.3);
            
            ctx.beginPath();
            ctx.moveTo(
                x + Math.cos(angle) * startRadius,
                y + Math.sin(angle) * startRadius
            );
            ctx.lineTo(
                x + Math.cos(angle) * endRadius,
                y + Math.sin(angle) * endRadius
            );
            ctx.stroke();
        }
    }
    
    // Add frequency response rings (more vivid when frequency is close to base)
    if (frequencyEffect > 0.5) {
        const ringCount = Math.floor(2 + frequencyEffect * 4);
        
        for (let i = 0; i < ringCount; i++) {
            const ringRadius = (size / 2) * (1.2 + i * 0.2) * (0.9 + 0.1 * Math.sin(state.animationPhase + i));
            
            ctx.strokeStyle = `${color}${Math.floor(frequencyEffect * coherence * 100).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1 + frequencyEffect * coherence * 2;
            
            ctx.beginPath();
            ctx.arc(x, y, ringRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}

function drawPhiHarmonicSpiral(x, y, size, frequency, coherence, dimensionalEffect, color) {
    // Calculate frequency effect (how close to base frequency)
    const frequencyRatio = frequency / SACRED_FREQUENCIES.creation;
    const frequencyEffect = 1 - Math.min(Math.abs(frequencyRatio - 1), 0.5) * 2;
    
    // Draw phi spiral
    const maxRadius = size / 2;
    const turns = 3 + dimensionalEffect * 3; // More turns at higher dimensions
    const points = 100;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2 + coherence * 3;
    
    ctx.beginPath();
    for (let i = 0; i <= points; i++) {
        const t = (i / points) * turns;
        const radius = maxRadius * Math.pow(PHI, -t);
        const angle = 2 * Math.PI * t;
        
        const pointX = x + Math.cos(angle) * radius;
        const pointY = y + Math.sin(angle) * radius;
        
        if (i === 0) {
            ctx.moveTo(pointX, pointY);
        } else {
            ctx.lineTo(pointX, pointY);
        }
    }
    ctx.stroke();
    
    // Draw phi dots along the spiral
    const dotCount = Math.floor(5 + frequencyEffect * 8);
    
    for (let i = 0; i < dotCount; i++) {
        const t = (i / dotCount) * turns;
        const radius = maxRadius * Math.pow(PHI, -t);
        const angle = 2 * Math.PI * t;
        
        const dotX = x + Math.cos(angle) * radius;
        const dotY = y + Math.sin(angle) * radius;
        const dotSize = 3 + coherence * 5 * (1 - i/dotCount);
        
        // Create glow effect
        const gradient = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, dotSize * 2);
        gradient.addColorStop(0, `${color}FF`);
        gradient.addColorStop(0.5, `${color}99`);
        gradient.addColorStop(1, `${color}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Add dimensional effect (phi rectangle)
    if (dimensionalEffect > 0.4) {
        // Draw golden rectangle
        const rectSize = size * 0.8;
        const rectWidth = rectSize;
        const rectHeight = rectSize / PHI;
        
        ctx.strokeStyle = `${color}${Math.floor(coherence * dimensionalEffect * 150).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 1 + coherence * dimensionalEffect * 2;
        
        ctx.beginPath();
        ctx.rect(x - rectWidth/2, y - rectHeight/2, rectWidth, rectHeight);
        ctx.stroke();
        
        // Draw phi division line
        ctx.beginPath();
        ctx.moveTo(x + rectWidth/2 - rectHeight, y - rectHeight/2);
        ctx.lineTo(x + rectWidth/2 - rectHeight, y + rectHeight/2);
        ctx.stroke();
        
        // Draw secondary golden rectangle
        const innerRectWidth = rectHeight;
        const innerRectHeight = rectHeight / PHI;
        
        ctx.beginPath();
        ctx.rect(
            x + rectWidth/2 - innerRectWidth, 
            y - rectHeight/2, 
            innerRectWidth, 
            innerRectHeight
        );
        ctx.stroke();
    }
    
    // Add frequency response (phi-based ripples)
    if (frequencyEffect > 0.5) {
        const rippleCount = Math.floor(3 + frequencyEffect * 4);
        
        for (let i = 0; i < rippleCount; i++) {
            const t = i / rippleCount;
            const rippleSize = size * (1 + t * 0.5) * (0.9 + 0.1 * Math.sin(state.animationPhase + i * Math.PI / 2));
            
            ctx.strokeStyle = `${color}${Math.floor(frequencyEffect * coherence * (1-t) * 100).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1 + frequencyEffect * coherence * (1-t) * 2;
            
            // Draw ripple as golden spiral arc
            ctx.beginPath();
            for (let j = 0; j <= points; j++) {
                const st = (j / points) * turns * 0.5;
                const radius = rippleSize * Math.pow(PHI, -st) * 0.5;
                const angle = 2 * Math.PI * st;
                
                const pointX = x + Math.cos(angle) * radius;
                const pointY = y + Math.sin(angle) * radius;
                
                if (j === 0) {
                    ctx.moveTo(pointX, pointY);
                } else {
                    ctx.lineTo(pointX, pointY);
                }
            }
            ctx.stroke();
        }
    }
}

function drawResonanceField(x, y, size, frequency, coherence, dimensionalEffect, color) {
    // Calculate frequency effect (how close to base frequency)
    const frequencyRatio = frequency / SACRED_FREQUENCIES.heart;
    const frequencyEffect = 1 - Math.min(Math.abs(frequencyRatio - 1), 0.5) * 2;
    
    // Draw resonance waves
    const waveCount = 3 + Math.floor(dimensionalEffect * 5);
    const amplitude = size * 0.1;
    const period = 2 * Math.PI;
    
    for (let i = 0; i < waveCount; i++) {
        const waveOffset = (i / waveCount) * period;
        const waveAmplitude = amplitude * (1 - i/waveCount);
        
        ctx.strokeStyle = `${color}${Math.floor((1 - i/waveCount) * coherence * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 2 + (1 - i/waveCount) * coherence * 3;
        
        // Draw horizontal resonance wave
        ctx.beginPath();
        for (let j = 0; j <= 100; j++) {
            const t = j / 100;
            const waveX = x - size/2 + t * size;
            const wavePhase = state.animationPhase * 2 + waveOffset;
            const waveY = y + Math.sin(t * period * 3 + wavePhase) * waveAmplitude;
            
            if (j === 0) {
                ctx.moveTo(waveX, waveY);
            } else {
                ctx.lineTo(waveX, waveY);
            }
        }
        ctx.stroke();
    }
    
    // Draw resonance nodes
    const nodeCount = 3 + Math.floor(frequencyEffect * 4);
    
    for (let i = 0; i < nodeCount; i++) {
        const t = i / (nodeCount - 1);
        const nodeX = x - size/2 + t * size;
        const nodeSize = 4 + coherence * 8 * (1 - Math.abs(t - 0.5) * 2);
        
        // Create glow effect
        const gradient = ctx.createRadialGradient(nodeX, y, 0, nodeX, y, nodeSize * 2);
        gradient.addColorStop(0, `${color}FF`);
        gradient.addColorStop(0.5, `${color}99`);
        gradient.addColorStop(1, `${color}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nodeX, y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Add dimensional effect (vertical resonance)
    if (dimensionalEffect > 0.3) {
        const verticalWaveCount = Math.floor(2 + dimensionalEffect * 3);
        
        for (let i = 0; i < verticalWaveCount; i++) {
            const waveOffset = (i / verticalWaveCount) * period;
            
            ctx.strokeStyle = `${color}${Math.floor((1 - i/verticalWaveCount) * coherence * dimensionalEffect * 200).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1 + (1 - i/verticalWaveCount) * coherence * dimensionalEffect * 2;
            
            // Draw vertical resonance wave
            ctx.beginPath();
            for (let j = 0; j <= 100; j++) {
                const t = j / 100;
                const waveY = y - size/2 + t * size;
                const wavePhase = state.animationPhase * 2 + waveOffset;
                const waveX = x + Math.sin(t * period * 2 + wavePhase) * amplitude * 0.7;
                
                if (j === 0) {
                    ctx.moveTo(waveX, waveY);
                } else {
                    ctx.lineTo(waveX, waveY);
                }
            }
            ctx.stroke();
        }
    }
    
    // Add frequency response (resonance field)
    if (frequencyEffect > 0.5) {
        const fieldRadius = size * 0.6;
        const fieldIntensity = frequencyEffect * coherence;
        
        // Create resonance field effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, fieldRadius);
        gradient.addColorStop(0, `${color}00`);
        gradient.addColorStop(0.7, `${color}${Math.floor(fieldIntensity * 80).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${color}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, fieldRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw field interference patterns
        const patternCount = Math.floor(3 + frequencyEffect * 5);
        
        for (let i = 0; i < patternCount; i++) {
            const angle = (i / patternCount) * Math.PI * 2;
            const startX = x + Math.cos(angle) * fieldRadius * 0.3;
            const startY = y + Math.sin(angle) * fieldRadius * 0.3;
            const endX = x + Math.cos(angle) * fieldRadius;
            const endY = y + Math.sin(angle) * fieldRadius;
            
            ctx.strokeStyle = `${color}${Math.floor(fieldIntensity * 100).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1 + fieldIntensity * 2;
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            
            // Create wavy line for interference pattern
            for (let j = 0; j <= 20; j++) {
                const t = j / 20;
                const lineX = startX + (endX - startX) * t;
                const lineY = startY + (endY - startY) * t;
                
                // Add wave pattern
                const waveAngle = angle + Math.PI/2;
                const waveAmplitude = 5 * Math.sin(t * Math.PI);
                const waveOffset = Math.sin(t * Math.PI * 6 + state.animationPhase * 3) * waveAmplitude;
                
                const pointX = lineX + Math.cos(waveAngle) * waveOffset;
                const pointY = lineY + Math.sin(waveAngle) * waveOffset;
                
                if (j === 0) {
                    ctx.moveTo(pointX, pointY);
                } else {
                    ctx.lineTo(pointX, pointY);
                }
            }
            
            ctx.stroke();
        }
    }
}

function drawDimensionalGateway(x, y, size, frequency, coherence, dimensionalEffect, color) {
    // Calculate frequency effect (how close to base frequency)
    const frequencyRatio = frequency / SACRED_FREQUENCIES.vision;
    const frequencyEffect = 1 - Math.min(Math.abs(frequencyRatio - 1), 0.5) * 2;
    
    // Draw gateway circle
    const outerRadius = size / 2;
    const innerRadius = outerRadius * 0.7;
    
    // Outer circle
    ctx.strokeStyle = color;
    ctx.lineWidth = 2 + coherence * 3;
    ctx.beginPath();
    ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
    ctx.stroke();
    
    // Inner circle with pulsing
    const pulseEffect = 0.1 * Math.sin(state.animationPhase * 3);
    
    ctx.strokeStyle = `${color}${Math.floor(coherence * 200).toString(16).padStart(2, '0')}`;
    ctx.lineWidth = 1 + coherence * 2;
    ctx.beginPath();
    ctx.arc(x, y, innerRadius * (1 + pulseEffect), 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw dimensional gateway (vertical line with horizontal bars)
    const lineLength = outerRadius * 1.5;
    
    // Vertical line
    ctx.strokeStyle = color;
    ctx.lineWidth = 3 + coherence * 4;
    ctx.beginPath();
    ctx.moveTo(x, y - lineLength/2);
    ctx.lineTo(x, y + lineLength/2);
    ctx.stroke();
    
    // Horizontal bars
    const barCount = 2 + Math.floor(dimensionalEffect * 5);
    
    for (let i = 0; i < barCount; i++) {
        const t = i / (barCount - 1);
        const barY = y - lineLength/2 + t * lineLength;
        const barWidth = outerRadius * (0.5 + t * 0.5) * (1 + 0.1 * Math.sin(state.animationPhase * 2 + t * Math.PI));
        
        ctx.strokeStyle = `${color}${Math.floor(coherence * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 2 + coherence * 3 * (1 - Math.abs(t - 0.5) * 2);
        
        ctx.beginPath();
        ctx.moveTo(x - barWidth/2, barY);
        ctx.lineTo(x + barWidth/2, barY);
        ctx.stroke();
    }
    
    // Add dimensional effect (portal visualization)
    if (dimensionalEffect > 0.3) {
        // Create portal glow
        const portalRadius = innerRadius * 0.8 * (1 + pulseEffect);
        const portalGradient = ctx.createRadialGradient(x, y, 0, x, y, portalRadius);
        
        portalGradient.addColorStop(0, `${color}33`);
        portalGradient.addColorStop(0.7, `${color}${Math.floor(dimensionalEffect * coherence * 100).toString(16).padStart(2, '0')}`);
        portalGradient.addColorStop(1, `${color}00`);
        
        ctx.fillStyle = portalGradient;
        ctx.beginPath();
        ctx.arc(x, y, portalRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw dimensional ripples
        const rippleCount = Math.floor(2 + dimensionalEffect * 4);
        
        for (let i = 0; i < rippleCount; i++) {
            const t = i / rippleCount;
            const rippleRadius = portalRadius * (1 + t * 0.5) * (0.9 + 0.1 * Math.sin(state.animationPhase * 2 + t * Math.PI * 2));
            
            ctx.strokeStyle = `${color}${Math.floor(dimensionalEffect * coherence * (1-t) * 150).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1 + dimensionalEffect * coherence * (1-t) * 2;
            
            ctx.beginPath();
            ctx.arc(x, y, rippleRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    
    // Add frequency response (energy spirals)
    if (frequencyEffect > 0.5) {
        const spiralCount = Math.floor(3 + frequencyEffect * 5);
        const spiralRadius = outerRadius * 1.2;
        const spiralTurns = 2;
        
        for (let i = 0; i < spiralCount; i++) {
            const startAngle = (i / spiralCount) * Math.PI * 2;
            
            ctx.strokeStyle = `${color}${Math.floor(frequencyEffect * coherence * 150).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1 + frequencyEffect * coherence * 2;
            
            ctx.beginPath();
            for (let j = 0; j <= 50; j++) {
                const t = j / 50;
                const angle = startAngle + t * spiralTurns * Math.PI * 2 + state.animationPhase;
                const radius = spiralRadius * t;
                
                const pointX = x + Math.cos(angle) * radius;
                const pointY = y + Math.sin(angle) * radius;
                
                if (j === 0) {
                    ctx.moveTo(pointX, pointY);
                } else {
                    ctx.lineTo(pointX, pointY);
                }
            }
            ctx.stroke();
        }
    }
}

function drawUnityIntegration(x, y, size, frequency, coherence, dimensionalEffect, color) {
    // Calculate frequency effect (how close to base frequency)
    const frequencyRatio = frequency / SACRED_FREQUENCIES.unity;
    const frequencyEffect = 1 - Math.min(Math.abs(frequencyRatio - 1), 0.5) * 2;
    
    // Draw Omega symbol
    const radius = size / 2;
    const thickness = 3 + coherence * 4;
    
    // Draw base circle
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.7, Math.PI, 0);
    ctx.stroke();
    
    // Draw legs
    ctx.beginPath();
    ctx.moveTo(x - radius * 0.7, y);
    ctx.lineTo(x - radius * 0.7, y + radius * 0.5);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x + radius * 0.7, y);
    ctx.lineTo(x + radius * 0.7, y + radius * 0.5);
    ctx.stroke();
    
    // Draw unity field
    if (coherence > 0.5) {
        // Create unity field glow
        const fieldRadius = radius * 1.2;
        const fieldGradient = ctx.createRadialGradient(x, y, 0, x, y, fieldRadius);
        
        fieldGradient.addColorStop(0, `${color}00`);
        fieldGradient.addColorStop(0.5, `${color}${Math.floor(coherence * 80).toString(16).padStart(2, '0')}`);
        fieldGradient.addColorStop(1, `${color}00`);
        
        ctx.fillStyle = fieldGradient;
        ctx.beginPath();
        ctx.arc(x, y, fieldRadius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Add dimensional effect (connecting lines)
    if (dimensionalEffect > 0.3) {
        const connectionCount = Math.floor(5 + dimensionalEffect * 10);
        
        for (let i = 0; i < connectionCount; i++) {
            const angle = (i / connectionCount) * Math.PI * 2;
            const connectionLength = radius * (0.8 + dimensionalEffect * 0.4);
            
            const startX = x + Math.cos(angle) * radius * 0.5;
            const startY = y + Math.sin(angle) * radius * 0.5;
            const endX = x + Math.cos(angle) * connectionLength;
            const endY = y + Math.sin(angle) * connectionLength;
            
            ctx.strokeStyle = `${color}${Math.floor(dimensionalEffect * coherence * 100).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1 + dimensionalEffect * coherence;
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            
            // Draw connection nodes
            ctx.fillStyle = `${color}${Math.floor(dimensionalEffect * coherence * 200).toString(16).padStart(2, '0')}`;
            ctx.beginPath();
            ctx.arc(endX, endY, 2 + dimensionalEffect * coherence * 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Add frequency response (unified field)
    if (frequencyEffect > 0.5) {
        // Draw integrating circles
        const circleCount = Math.floor(3 + frequencyEffect * 4);
        
        for (let i = 0; i < circleCount; i++) {
            const t = i / circleCount;
            const circleRadius = radius * (1 + t * 0.5) * (0.9 + 0.1 * Math.sin(state.animationPhase + t * Math.PI * 2));
            
            ctx.strokeStyle = `${color}${Math.floor(frequencyEffect * coherence * (1-t) * 100).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1 + frequencyEffect * coherence * (1-t);
            
            ctx.beginPath();
            ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Draw phi-based integration web
        if (frequencyEffect > 0.7) {
            const webPoints = 5;
            const webRadius = radius * 1.3;
            
            // Create points on circle
            const points = [];
            for (let i = 0; i < webPoints; i++) {
                const angle = (i / webPoints) * Math.PI * 2 + state.animationPhase * 0.5;
                points.push({
                    x: x + Math.cos(angle) * webRadius,
                    y: y + Math.sin(angle) * webRadius
                });
            }
            
            // Connect all points to form integration web
            ctx.strokeStyle = `${color}${Math.floor(frequencyEffect * coherence * 80).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1;
            
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const p1 = points[i];
                    const p2 = points[j];
                    
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }
}