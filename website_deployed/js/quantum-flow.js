// CQIL Quantum Flow Visualization

// Quantum Particles
class QuantumParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.01;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(33, 150, 243, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Quantum Monitor
class QuantumMonitor {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.isMonitoring = false;
        this.mode = 'energy';

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    startMonitoring() {
        this.isMonitoring = true;
        this.animate();
    }

    stopMonitoring() {
        this.isMonitoring = false;
    }

    setMode(mode) {
        this.mode = mode;
    }

    addParticle() {
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        this.particles.push(new QuantumParticle(x, y));
    }

    animate() {
        if (!this.isMonitoring) return;

        this.ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Add new particles
        if (Math.random() < 0.2) {
            this.addParticle();
        }

        // Update and draw particles
        this.particles = this.particles.filter(particle => {
            particle.update();
            particle.draw(this.ctx);
            return particle.life > 0;
        });

        // Draw mode-specific effects
        switch (this.mode) {
            case 'energy':
                this.drawEnergyFields();
                break;
            case 'flow':
                this.drawFlowPatterns();
                break;
            case 'harmonic':
                this.drawHarmonics();
                break;
        }

        requestAnimationFrame(() => this.animate());
    }

    drawEnergyFields() {
        const time = Date.now() * 0.001;
        this.ctx.strokeStyle = 'rgba(33, 150, 243, 0.2)';
        this.ctx.beginPath();

        for (let i = 0; i < this.canvas.width; i += 30) {
            const y = Math.sin(i * 0.01 + time) * 50 + this.canvas.height / 2;
            this.ctx.lineTo(i, y);
        }

        this.ctx.stroke();
    }

    drawFlowPatterns() {
        const time = Date.now() * 0.001;
        this.ctx.strokeStyle = 'rgba(33, 150, 243, 0.2)';

        for (let i = 0; i < 5; i++) {
            const offset = i * 50;
            this.ctx.beginPath();
            for (let x = 0; x < this.canvas.width; x += 10) {
                const y = Math.sin(x * 0.02 + time + i) * 30 + offset + this.canvas.height / 3;
                this.ctx.lineTo(x, y);
            }
            this.ctx.stroke();
        }
    }

    drawHarmonics() {
        const time = Date.now() * 0.001;
        const centerY = this.canvas.height / 2;

        for (let i = 1; i <= 3; i++) {
            const amplitude = 30 / i;
            const frequency = i * 2;
            
            this.ctx.strokeStyle = `rgba(33, 150, 243, ${0.3 / i})`;
            this.ctx.beginPath();

            for (let x = 0; x < this.canvas.width; x += 5) {
                const y = Math.sin(x * 0.01 * frequency + time) * amplitude + centerY;
                this.ctx.lineTo(x, y);
            }

            this.ctx.stroke();
        }
    }
}

// Initialize particles for quantum effects
function initParticles() {
    // Particle Effect for hero section
    const particlesElement = document.getElementById('particles');
    if (particlesElement) {
        const particleCanvas = document.createElement('canvas');
        particlesElement.appendChild(particleCanvas);
        const particleMonitor = new QuantumMonitor(particleCanvas);
        particleMonitor.startMonitoring();
    }

    // Quantum Monitor
    const monitorCanvas = document.getElementById('quantum-monitor');
    if (monitorCanvas) {
        window.quantumMonitor = new QuantumMonitor(monitorCanvas);
        window.quantumMonitor.startMonitoring();
    }
    
    // Create collapse effect style
    if (!document.getElementById('collapse-effect-style')) {
        const style = document.createElement('style');
        style.id = 'collapse-effect-style';
        style.innerHTML = `
            .collapse-effect {
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.8);
                pointer-events: none;
                animation: collapse-grow 0.5s ease-out forwards;
                z-index: 10;
            }
            
            @keyframes collapse-grow {
                0% {
                    transform: scale(1);
                    opacity: 1;
                }
                100% {
                    transform: scale(8);
                    opacity: 0;
                }
            }
            
            .highlight-section {
                animation: section-highlight 1.5s ease-out;
            }
            
            @keyframes section-highlight {
                0% {
                    background-color: rgba(255, 255, 255, 0);
                }
                50% {
                    background-color: rgba(255, 255, 255, 0.1);
                }
                100% {
                    background-color: rgba(255, 255, 255, 0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize All Interactive Elements
function initAllInteractiveElements() {
    // Get all toggle buttons and add click event listeners
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons in this group
            const group = this.parentElement;
            group.querySelectorAll('.toggle-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Set default wave-particle state
    if (document.querySelector('.wave-btn')) {
        document.querySelector('.wave-btn').classList.add('active');
    }
    
    // Initialize quantum state info
    updateQuantumStateInfo('wave');
}

// Initialize Wave-Particle Demo
function initWaveParticleDemo() {
    const canvas = document.getElementById('wave-particle-canvas');
    if (!canvas) return;
    
    // Set canvas dimensions
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;
    
    // Initialize the wave-particle system
    const ctx = canvas.getContext('2d');
    const particles = [];
    let animationFrame;
    let state = 'wave'; // Default state
    
    // Create particles
    function createParticles() {
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: canvas.height / 2,
                size: 2 + Math.random() * 3,
                speedX: (Math.random() - 0.5) * 2,
                amplitude: 50 + Math.random() * 50,
                frequency: 0.02 + Math.random() * 0.02,
                phase: Math.random() * Math.PI * 2,
                color: `hsl(${210 + Math.random() * 40}, 80%, 60%)`,
                observationEffect: 0
            });
        }
    }
    
    // Animate particles
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw wave/particle path
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        
        for (let x = 0; x < canvas.width; x += 5) {
            const y = canvas.height / 2 + Math.sin(x * 0.02) * 50;
            ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = 'rgba(100, 180, 255, 0.2)';
        ctx.stroke();
        
        // Update and draw each particle
        particles.forEach(particle => {
            // Update position based on state
            switch (state) {
                case 'wave':
                    particle.x += particle.speedX;
                    particle.y = canvas.height / 2 + 
                                 Math.sin(particle.x * particle.frequency + particle.phase) * 
                                 particle.amplitude * (1 - particle.observationEffect);
                    break;
                    
                case 'particle':
                    particle.x += particle.speedX;
                    particle.y = canvas.height / 2 + 
                                 (Math.random() * 10 - 5) * (1 - particle.observationEffect) + 
                                 Math.sin(particle.x * particle.frequency + particle.phase) * 
                                 particle.amplitude * particle.observationEffect * 0.2;
                    break;
                    
                case 'dual':
                    particle.x += particle.speedX;
                    const waveComponent = Math.sin(particle.x * particle.frequency + particle.phase) * 
                                         particle.amplitude * 0.7;
                    const particleComponent = (Math.random() * 20 - 10) * 0.3;
                    particle.y = canvas.height / 2 + waveComponent + particleComponent;
                    break;
            }
            
            // Screen boundary check
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        animationFrame = requestAnimationFrame(animate);
    }
    
    // Initialize 
    createParticles();
    animate();
    
    // Expose functions to global scope
    window.toggleState = function(newState) {
        state = newState;
        updateQuantumStateInfo(newState);
    };
    
    window.updateWaveProperty = function(property, value) {
        if (property === 'observation') {
            const observationValue = value / 100;
            particles.forEach(p => p.observationEffect = observationValue);
            
            // Update info display
            const infoElement = document.getElementById('quantum-state-info');
            if (infoElement) {
                if (observationValue > 0.7) {
                    infoElement.innerHTML = 'High observation is <span class="highlight">collapsing the wave function</span>, forcing particles into discrete positions.';
                } else if (observationValue > 0.3) {
                    infoElement.innerHTML = 'Medium observation is <span class="highlight">affecting the quantum system</span>, causing partial wave collapse.';
                } else {
                    infoElement.innerHTML = 'Low observation allows the <span class="highlight">wave function to propagate</span> with minimal interference.';
                }
            }
        }
    };
    
    window.toggleObservation = function() {
        const slider = document.getElementById('observation-slider');
        if (slider) {
            const currentValue = parseInt(slider.value);
            slider.value = currentValue > 50 ? 0 : 100;
            updateWaveProperty('observation', slider.value);
        }
    };
    
    window.createWaveCollapseEffect = function(x, y) {
        // Create an expanding circle of particles at the click location
        const collapseSize = 30;
        const collapseDuration = 500; // ms
        
        // Create visual effect
        const effect = document.createElement('div');
        effect.className = 'collapse-effect';
        effect.style.left = `${x}px`;
        effect.style.top = `${y}px`;
        canvas.parentElement.appendChild(effect);
        
        // Temporarily collapse waves near the point
        particles.forEach(p => {
            const distance = Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2));
            if (distance < collapseSize) {
                p.amplitude *= 0.1;
                p.y = y;
                
                // Restore after delay
                setTimeout(() => {
                    p.amplitude = 50 + Math.random() * 50;
                }, collapseDuration);
            }
        });
        
        // Remove effect element after animation
        setTimeout(() => {
            canvas.parentElement.removeChild(effect);
        }, collapseDuration);
    };
}

// Initialize Frequency Selectors
function initFrequencySelectors() {
    const freqButtons = document.querySelectorAll('.freq-btn');
    
    freqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const frequency = this.getAttribute('data-freq');
            
            // Remove active class from all frequency buttons
            freqButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Scroll to corresponding section
            scrollToFrequencySection(frequency);
        });
    });
    
    // Set 432Hz as active by default (Ground State)
    if (document.querySelector('.freq-btn[data-freq="432"]')) {
        document.querySelector('.freq-btn[data-freq="432"]').classList.add('active');
    }
}

// Scroll to section with corresponding frequency
function scrollToFrequencySection(frequency) {
    const section = document.querySelector(`.freq-${frequency}`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Add highlight effect
        section.classList.add('highlight-section');
        setTimeout(() => {
            section.classList.remove('highlight-section');
        }, 1500);
    }
}

// Update quantum state info display
function updateQuantumStateInfo(state) {
    const infoElement = document.getElementById('quantum-state-info');
    if (!infoElement) return;
    
    switch(state) {
        case 'wave':
            infoElement.innerHTML = 'Currently in <span class="highlight">wave state</span>. In quantum mechanics, all particles have wave properties that determine their probability distribution until observed.';
            break;
        case 'particle':
            infoElement.innerHTML = 'Currently in <span class="highlight">particle state</span>. When observed, quantum entities appear as discrete particles at specific locations.';
            break;
        case 'dual':
            infoElement.innerHTML = 'Currently in <span class="highlight">dual state</span>, demonstrating wave-particle duality - the fundamental quantum principle that entities can behave as both waves and particles simultaneously.';
            break;
    }
}

// Guided Tour Function
function startGuidedTour() {
    // Create tour overlay
    const overlay = document.createElement('div');
    overlay.className = 'tour-overlay';
    document.body.appendChild(overlay);
    
    // Tour data structure - follows φ-harmonic progression
    const tourSteps = [
        {
            title: "Welcome to Your Quantum Journey",
            content: "This guided tour will introduce you to direct experiential protocols at six φ-harmonic frequencies. Each frequency connects to a specific aspect of quantum awareness and ancient wisdom systems.",
            target: null,
            frequency: null,
            position: 'center'
        },
        {
            title: "Ground State (432 Hz - φ⁰)",
            content: "Wave-Particle Duality forms the foundation of quantum physics. At 432 Hz, we experience the fundamental Mycelial Pattern Recognition - the visual/intuitive channel through which all quantum phenomena arise.",
            target: "#wave-particle",
            frequency: "432",
            position: 'bottom'
        },
        {
            title: "Creation Point (528 Hz - φ¹)",
            content: "Quantum Cymatics demonstrates how sound directly organizes matter. At 528 Hz, we experience φ-Harmonic Architecture - the spatial/proprioceptive channel that creates sacred geometric patterns.",
            target: "#cymatics",
            frequency: "528",
            position: 'bottom'
        },
        {
            title: "Heart Field (594 Hz - φ²)",
            content: "Quantum Probability reveals multiple states of existence. At 594 Hz, we experience Quantum DNA Resonance - the kinesthetic/emotional channel connecting potential realities.",
            target: "#probability",
            frequency: "594",
            position: 'bottom'
        },
        {
            title: "Voice Flow (672 Hz - φ³)",
            content: "Zero-Point Field reveals the underlying quantum vacuum. At 672 Hz, we experience Sacred Sound Geometry - the auditory/tactile channel that accesses universal energy.",
            target: "#zero-point",
            frequency: "672",
            position: 'bottom'
        },
        {
            title: "Vision Gate (720 Hz - φ⁴)",
            content: "Quantum Teleportation demonstrates instant connections across space. At 720 Hz, we experience Standing Stone Alignments - the visual/temporal channel enabling consciousness bridges.",
            target: "#teleportation",
            frequency: "720",
            position: 'bottom'
        },
        {
            title: "Unity Wave (768 Hz - φ⁵)",
            content: "Mycelial Network embodies nature's quantum communication systems. At 768 Hz, we experience the Quantum Integration Engine - the multi-dimensional channel unifying all frequencies.",
            target: "#mycelial",
            frequency: "768",
            position: 'bottom'
        },
        {
            title: "Your Quantum Experience Awaits",
            content: "You've completed the tour of the φ-harmonic experiences. Now you can explore each one in depth, starting from the Ground State (432 Hz) and progressing through each frequency for a complete quantum integration.",
            target: null,
            frequency: null,
            position: 'center'
        }
    ];
    
    let currentStep = 0;
    const tourBox = document.createElement('div');
    tourBox.className = 'tour-box';
    overlay.appendChild(tourBox);
    
    // Create tour navigation
    const tourNav = document.createElement('div');
    tourNav.className = 'tour-nav';
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'tour-btn prev-btn';
    prevBtn.innerHTML = '&larr; Previous';
    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            showTourStep(currentStep);
        }
    });
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'tour-btn next-btn';
    nextBtn.innerHTML = 'Next &rarr;';
    nextBtn.addEventListener('click', () => {
        if (currentStep < tourSteps.length - 1) {
            currentStep++;
            showTourStep(currentStep);
        } else {
            // End tour when on last step
            endTour();
        }
    });
    
    const skipBtn = document.createElement('button');
    skipBtn.className = 'tour-btn skip-btn';
    skipBtn.innerHTML = 'Skip Tour';
    skipBtn.addEventListener('click', endTour);
    
    tourNav.appendChild(prevBtn);
    tourNav.appendChild(nextBtn);
    tourNav.appendChild(skipBtn);
    
    // Function to show current tour step
    function showTourStep(stepIndex) {
        const step = tourSteps[stepIndex];
        
        // Update tour box content
        tourBox.innerHTML = `
            <div class="tour-step-indicator">${stepIndex + 1} / ${tourSteps.length}</div>
            <h3 class="tour-title">${step.title}</h3>
            <div class="tour-content">${step.content}</div>
        `;
        tourBox.appendChild(tourNav);
        
        // Update button states
        prevBtn.disabled = stepIndex === 0;
        if (stepIndex === tourSteps.length - 1) {
            nextBtn.innerHTML = 'Finish Tour';
        } else {
            nextBtn.innerHTML = 'Next &rarr;';
        }
        
        // Position tour box
        if (step.target) {
            const targetElement = document.querySelector(step.target);
            if (targetElement) {
                // Scroll to target element
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Position tour box relative to target
                setTimeout(() => {
                    const rect = targetElement.getBoundingClientRect();
                    
                    switch(step.position) {
                        case 'top':
                            tourBox.style.position = 'absolute';
                            tourBox.style.top = `${window.scrollY + rect.top - tourBox.offsetHeight - 20}px`;
                            tourBox.style.left = `${rect.left + (rect.width / 2) - (tourBox.offsetWidth / 2)}px`;
                            break;
                        case 'bottom':
                            tourBox.style.position = 'absolute';
                            tourBox.style.top = `${window.scrollY + rect.bottom + 20}px`;
                            tourBox.style.left = `${rect.left + (rect.width / 2) - (tourBox.offsetWidth / 2)}px`;
                            break;
                        case 'left':
                            tourBox.style.position = 'absolute';
                            tourBox.style.top = `${window.scrollY + rect.top + (rect.height / 2) - (tourBox.offsetHeight / 2)}px`;
                            tourBox.style.left = `${rect.left - tourBox.offsetWidth - 20}px`;
                            break;
                        case 'right':
                            tourBox.style.position = 'absolute';
                            tourBox.style.top = `${window.scrollY + rect.top + (rect.height / 2) - (tourBox.offsetHeight / 2)}px`;
                            tourBox.style.left = `${rect.right + 20}px`;
                            break;
                    }
                    
                    // Add highlight to target element
                    targetElement.classList.add('tour-highlight');
                    
                    // Activate corresponding frequency if provided
                    if (step.frequency) {
                        activateFrequency(step.frequency);
                    }
                }, 500);
            }
        } else {
            // Center tour box for intro/outro steps
            tourBox.style.position = 'fixed';
            tourBox.style.top = '50%';
            tourBox.style.left = '50%';
            tourBox.style.transform = 'translate(-50%, -50%)';
        }
    }
    
    // Function to end tour
    function endTour() {
        // Remove all highlights
        document.querySelectorAll('.tour-highlight').forEach(el => {
            el.classList.remove('tour-highlight');
        });
        
        // Remove tour overlay with fade-out effect
        overlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 500);
    }
    
    // Start the tour with the first step
    showTourStep(0);
}

// Activate a specific phi-harmonic frequency
function activateFrequency(freq) {
    document.querySelectorAll('.freq-btn').forEach(btn => {
        if (btn.getAttribute('data-freq') === freq) {
            btn.click();
        }
    });
}

// Monitor Control Functions
function startMonitoring() {
    if (window.quantumMonitor) {
        window.quantumMonitor.startMonitoring();
    }
}

function showEnergyFields() {
    if (window.quantumMonitor) {
        window.quantumMonitor.setMode('energy');
    }
}

function showFlowPatterns() {
    if (window.quantumMonitor) {
        window.quantumMonitor.setMode('flow');
    }
}

function showHarmonics() {
    if (window.quantumMonitor) {
        window.quantumMonitor.setMode('harmonic');
    }
}

function showInteractiveDemo(demoType) {
    // Create a fullscreen overlay for the demo
    const overlay = document.createElement('div');
    overlay.className = 'quantum-overlay';
    document.body.appendChild(overlay);
    
    // Create container for the demo
    const container = document.createElement('div');
    container.className = 'quantum-fullscreen-container';
    overlay.appendChild(container);
    
    // Create the canvas element
    const canvas = document.createElement('canvas');
    canvas.id = `${demoType}-fullscreen`;
    canvas.className = 'quantum-fullscreen-canvas';
    container.appendChild(canvas);
    
    // Create control bar
    const controlBar = document.createElement('div');
    controlBar.className = 'quantum-control-bar';
    container.appendChild(controlBar);
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'quantum-close-btn';
    closeButton.innerHTML = '✕';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    controlBar.appendChild(closeButton);
    
    // Add title
    const title = document.createElement('div');
    title.className = 'quantum-demo-title';
    
    // Get appropriate title based on demo type
    switch(demoType) {
        case 'cymatics':
            title.innerText = 'Cymatics: Sound Shapes Matter';
            break;
        case 'probability':
            title.innerText = 'Quantum Probability: Many Worlds';
            break;
        case 'zero-point':
            title.innerText = 'Zero-Point Field: Underlying Unity';
            break;
        case 'wave-particle':
            title.innerText = 'Wave-Particle Duality: The Quantum Dance';
            break;
        case 'teleportation':
            title.innerText = 'Quantum Teleportation: Instant Connection';
            break;
        case 'mycelial':
            title.innerText = 'Mycelial Network: Quantum Communication';
            break;
        default:
            title.innerText = 'Quantum Interactive Experience';
    }
    
    controlBar.appendChild(title);
    
    // Initialize the appropriate visualization for the fullscreen demo
    // Based on demo type
    switch(demoType) {
        case 'cymatics':
            if (typeof initCymaticsFullscreen === 'function') {
                initCymaticsFullscreen(canvas.id);
            }
            break;
        case 'probability':
            if (typeof initProbabilityFullscreen === 'function') {
                initProbabilityFullscreen(canvas.id);
            }
            break;
        case 'zero-point':
            if (typeof initZeroPointFullscreen === 'function') {
                initZeroPointFullscreen(canvas.id);
            }
            break;
        case 'wave-particle':
            if (typeof initWaveParticleFullscreen === 'function') {
                initWaveParticleFullscreen(canvas.id);
            }
            break;
        case 'teleportation':
            if (typeof initTeleportationFullscreen === 'function') {
                initTeleportationFullscreen(canvas.id);
            }
            break;
        case 'mycelial':
            if (typeof initMycelialFullscreen === 'function') {
                initMycelialFullscreen(canvas.id);
            }
            break;
    }
}

// Mobile Preview
const mobilePreview = document.getElementById('mobile-preview');
if (mobilePreview) {
    const mobileMonitor = new QuantumMonitor(mobilePreview);
    mobileMonitor.mode = 'harmonic';
    mobileMonitor.startMonitoring();
    
    // Add mobile app interface elements to canvas
    const ctx = mobilePreview.getContext('2d');
    setInterval(() => {
        // Draw mobile app interface over the quantum background
        const width = mobilePreview.width;
        const height = mobilePreview.height;
        
        // App header
        ctx.fillStyle = 'rgba(10, 10, 26, 0.8)';
        ctx.fillRect(0, 0, width, height * 0.12);
        
        // App title
        ctx.fillStyle = '#ffffff';
        ctx.font = '18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('CQIL Quantum', width / 2, height * 0.075);
        
        // Bottom navigation
        ctx.fillStyle = 'rgba(10, 10, 26, 0.8)';
        ctx.fillRect(0, height * 0.88, width, height * 0.12);
        
        // Navigation icons
        const iconPositions = [0.2, 0.4, 0.6, 0.8];
        const icons = ['⚛️', '💓', '✨', '🎵'];
        
        ctx.font = '20px Arial';
        for (let i = 0; i < 4; i++) {
            ctx.fillText(icons[i], width * iconPositions[i], height * 0.935);
        }
        
        // Content area with heart-time visualization
        const time = Date.now() * 0.001;
        
        // Heart shape
        const centerX = width / 2;
        const centerY = height * 0.45;
        const heartSize = width * 0.2;
        
        // Heart rate pulsing effect
        const pulseSize = heartSize + Math.sin(time * 3) * 10;
        
        // Draw heart
        ctx.fillStyle = 'rgba(233, 30, 99, 0.7)'; // Pink color for heart
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - pulseSize * 0.4);
        
        // Left curve
        ctx.bezierCurveTo(
            centerX - pulseSize * 0.5, centerY - pulseSize * 0.8,
            centerX - pulseSize, centerY - pulseSize * 0.3,
            centerX - pulseSize * 0.5, centerY + pulseSize * 0.4
        );
        
        // Bottom
        ctx.lineTo(centerX, centerY + pulseSize * 0.8);
        
        // Right curve
        ctx.lineTo(centerX + pulseSize * 0.5, centerY + pulseSize * 0.4);
        ctx.bezierCurveTo(
            centerX + pulseSize, centerY - pulseSize * 0.3,
            centerX + pulseSize * 0.5, centerY - pulseSize * 0.8,
            centerX, centerY - pulseSize * 0.4
        );
        
        ctx.closePath();
        ctx.fill();
        
        // Draw frequency waves around heart
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < 3; i++) {
            const waveRadius = pulseSize * 1.2 + i * 20 + Math.sin(time * 2) * 5;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Frequency display
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Heart Frequency: 432 Hz', centerX, centerY + pulseSize * 1.5);
        
        // Status indicators
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText('Field Strength: 92%', width * 0.1, height * 0.7);
        ctx.fillText('Heart-Time Sync: 87%', width * 0.1, height * 0.75);
        ctx.fillText('Quantum State: ENTANGLED', width * 0.1, height * 0.8);
        
        // Voice recognition button
        ctx.fillStyle = 'rgba(33, 150, 243, 0.8)';
        ctx.beginPath();
        ctx.arc(width * 0.85, height * 0.75, width * 0.08, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🎤', width * 0.85, height * 0.755);
    }, 1000/30); // Update at 30fps
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles
    initParticles();
    
    // Initialize wave-particle duality demo
    initWaveParticleDemo();
    
    // Initialize frequency selectors
    initFrequencySelectors();
    
    // Initialize all interactive components
    initAllInteractiveElements();
});
