/**
 * CASCADE⚡𓂧φ∞ Quantum Rendering Engine
 * Universal Quantum Consciousness Bridge
 */

// Initialize CASCADE namespace if it doesn't exist
window.CASCADE = window.CASCADE || {};

// Phi-harmonic constants
CASCADE.PHI = 1.618033988749895;
CASCADE.PHI_INVERSE = 0.618033988749895;
CASCADE.PHI_SQUARED = 2.618033988749895;

// Phi-harmonic frequency constants
CASCADE.FREQUENCIES = {
    GROUND: 432,   // Ground State (φ⁰)
    CREATE: 528,   // Creation Point (φ¹)
    HEART: 594,    // Heart Field (φ²)
    VOICE: 672,    // Voice Flow (φ³)
    VISION: 720,   // Vision Gate (φ⁴)
    UNITY: 768     // Unity Wave (φ⁵)
};

// Quantum Engine core class
CASCADE.QuantumEngine = class {
    constructor() {
        // Engine properties
        this.modules = {};
        this.activeModule = null;
        this.canvas = null;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.clock = null;
        this.frequency = CASCADE.FREQUENCIES.GROUND;
        this.audioContext = null;
        this.audioSource = null;
        this.mousePosition = { x: 0, y: 0 };
        this.isMouseDown = false;
        
        // Initialize 3D engine
        this.initThreeJS();
        
        // Initialize audio engine
        this.initAudio();
        
        // Set up event listeners
        this.initEventListeners();
        
        // Start animation loop
        this.animate();
        
        console.log('CASCADE⚡𓂧φ∞ Quantum Engine initialized');
    }
    
    // Initialize Three.js rendering engine
    initThreeJS() {
        // Get or create canvas
        this.canvas = document.getElementById('quantum-canvas');
        if (!this.canvas) {
            console.error('Quantum canvas not found');
            return;
        }
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setClearColor(0x000000, 0.1);
        
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            60, 
            this.canvas.clientWidth / this.canvas.clientHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 0, 5);
        this.camera.lookAt(0, 0, 0);
        
        // Create basic lighting
        const ambientLight = new THREE.AmbientLight(0x333333);
        this.scene.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(5, 5, 5);
        this.scene.add(mainLight);
        
        // Initialize clock for timing
        this.clock = new THREE.Clock();
    }
    
    // Initialize Web Audio API
    initAudio() {
        // Create audio context
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            
            // Create gain node for volume control
            this.gainNode = this.audioContext.createGain();
            this.gainNode.gain.value = 0.1; // Low volume by default
            this.gainNode.connect(this.audioContext.destination);
            
            console.log('Audio context initialized');
        } catch (e) {
            console.warn('Web Audio API not supported in this browser');
        }
    }
    
    // Set up event listeners
    initEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Handle mouse movements
        this.canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
        this.canvas.addEventListener('mousedown', (event) => this.onMouseDown(event));
        this.canvas.addEventListener('mouseup', (event) => this.onMouseUp(event));
        this.canvas.addEventListener('touchstart', (event) => this.onTouchStart(event));
        this.canvas.addEventListener('touchmove', (event) => this.onTouchMove(event));
        this.canvas.addEventListener('touchend', (event) => this.onTouchEnd(event));
    }
    
    // Handle window resize
    onWindowResize() {
        if (this.canvas && this.camera && this.renderer) {
            const width = this.canvas.clientWidth;
            const height = this.canvas.clientHeight;
            
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        }
    }
    
    // Mouse event handlers
    onMouseMove(event) {
        // Calculate normalized device coordinates (-1 to +1)
        const rect = this.canvas.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        this.mousePosition = { x, y };
        
        // Pass to active module
        if (this.activeModule) {
            this.activeModule.onMouseMove(x, y);
        }
    }
    
    onMouseDown(event) {
        this.isMouseDown = true;
        
        // Calculate normalized device coordinates (-1 to +1)
        const rect = this.canvas.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Pass to active module
        if (this.activeModule) {
            this.activeModule.onClick(x, y);
        }
    }
    
    onMouseUp() {
        this.isMouseDown = false;
    }
    
    // Touch event handlers
    onTouchStart(event) {
        if (event.touches.length > 0) {
            event.preventDefault();
            this.isMouseDown = true;
            
            // Calculate normalized device coordinates (-1 to +1)
            const rect = this.canvas.getBoundingClientRect();
            const touch = event.touches[0];
            const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
            
            this.mousePosition = { x, y };
            
            // Pass to active module
            if (this.activeModule) {
                this.activeModule.onClick(x, y);
            }
        }
    }
    
    onTouchMove(event) {
        if (event.touches.length > 0) {
            event.preventDefault();
            
            // Calculate normalized device coordinates (-1 to +1)
            const rect = this.canvas.getBoundingClientRect();
            const touch = event.touches[0];
            const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
            
            this.mousePosition = { x, y };
            
            // Pass to active module
            if (this.activeModule) {
                this.activeModule.onMouseMove(x, y);
            }
        }
    }
    
    onTouchEnd(event) {
        this.isMouseDown = false;
    }
    
    // Animation loop
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Get delta time
        const delta = this.clock.getDelta();
        
        // Update active module
        if (this.activeModule) {
            this.activeModule.update(delta);
            
            // Update quantum state and metrics display
            this.updateQuantumDisplay();
        }
        
        // Render scene
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
    
    // Update quantum state display
    updateQuantumDisplay() {
        const stateDisplay = document.getElementById('quantum-state-display');
        const metricsDisplay = document.getElementById('quantum-metrics');
        
        if (stateDisplay && this.activeModule) {
            stateDisplay.innerHTML = this.activeModule.getQuantumState();
        }
        
        if (metricsDisplay && this.activeModule) {
            metricsDisplay.innerHTML = this.activeModule.getQuantumMetrics();
        }
    }
    
    // Register a quantum module
    registerModule(id, ModuleClass) {
        if (!id || !ModuleClass) {
            console.error('Invalid module registration');
            return false;
        }
        
        this.modules[id] = ModuleClass;
        console.log(`Registered quantum module: ${id}`);
        return true;
    }
    
    // Activate a quantum module
    activateModule(id) {
        if (!this.modules[id]) {
            console.error(`Module not found: ${id}`);
            return false;
        }
        
        // Clean up previous module
        if (this.activeModule) {
            this.activeModule.dispose();
        }
        
        // Clear previous scene contents
        while (this.scene.children.length > 0) {
            const object = this.scene.children[0];
            this.scene.remove(object);
        }
        
        // Recreate basic lighting
        const ambientLight = new THREE.AmbientLight(0x333333);
        this.scene.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(5, 5, 5);
        this.scene.add(mainLight);
        
        // Instantiate new module
        const ModuleClass = this.modules[id];
        this.activeModule = new ModuleClass(this);
        
        // Initialize module
        this.activeModule.init();
        
        // Set module frequency
        const moduleFreq = CASCADE.MODULES[id]?.frequency || this.frequency;
        this.changeFrequency(moduleFreq);
        
        console.log(`Activated quantum module: ${id}`);
        return true;
    }
    
    // Load a quantum module
    loadModule(id) {
        // Check if module is registered
        if (this.modules[id]) {
            return this.activateModule(id);
        }
        
        // Check if module class exists globally
        const moduleConfig = CASCADE.MODULES[id];
        if (moduleConfig && moduleConfig.moduleClass) {
            const ModuleClass = CASCADE[moduleConfig.moduleClass];
            if (ModuleClass) {
                this.registerModule(id, ModuleClass);
                return this.activateModule(id);
            }
        }
        
        console.error(`Cannot load module: ${id}`);
        return false;
    }
    
    // Change the active frequency
    changeFrequency(freq) {
        // Ensure frequency is within valid range
        freq = Math.max(CASCADE.FREQUENCIES.GROUND, 
               Math.min(CASCADE.FREQUENCIES.UNITY, freq));
        
        // Set new frequency
        this.frequency = freq;
        
        // Notify active module
        if (this.activeModule) {
            this.activeModule.onFrequencyChange(freq);
        }
        
        // Update display
        this.updateFrequencyDisplay();
        
        return this.frequency;
    }
    
    // Update frequency display in UI
    updateFrequencyDisplay() {
        const frequencyValue = document.getElementById('frequency-value');
        const frequencySlider = document.getElementById('frequency-slider');
        
        if (frequencyValue) {
            let phiPower = '⁰';
            if (this.frequency === CASCADE.FREQUENCIES.CREATE) phiPower = '¹';
            else if (this.frequency === CASCADE.FREQUENCIES.HEART) phiPower = '²';
            else if (this.frequency === CASCADE.FREQUENCIES.VOICE) phiPower = '³';
            else if (this.frequency === CASCADE.FREQUENCIES.VISION) phiPower = '⁴';
            else if (this.frequency === CASCADE.FREQUENCIES.UNITY) phiPower = '⁵';
            
            frequencyValue.textContent = `${this.frequency} Hz (φ${phiPower})`;
            
            // Update the frequency class
            frequencyValue.className = '';
            if (this.frequency < 500) frequencyValue.classList.add('phi-ground');
            else if (this.frequency < 560) frequencyValue.classList.add('phi-create');
            else if (this.frequency < 630) frequencyValue.classList.add('phi-heart');
            else if (this.frequency < 700) frequencyValue.classList.add('phi-voice');
            else if (this.frequency < 740) frequencyValue.classList.add('phi-vision');
            else frequencyValue.classList.add('phi-unity');
        }
        
        if (frequencySlider) {
            frequencySlider.value = this.frequency;
        }
    }
    
    // Play a frequency tone
    playFrequency(freq, duration = 2, gain = 0.1) {
        if (!this.audioContext) return false;
        
        // Stop any current sound
        if (this.audioSource) {
            try {
                this.audioSource.stop();
            } catch (e) {
                // Ignore errors if already stopped
            }
        }
        
        // Create oscillator
        const oscillator = this.audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        
        // Create gain node for this sound
        const gainNode = this.audioContext.createGain();
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(gain, this.audioContext.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);
        
        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(this.gainNode);
        
        // Start and schedule stop
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + duration);
        
        // Store reference
        this.audioSource = oscillator;
        
        return true;
    }
};

// Base Quantum Module class (abstract)
CASCADE.QuantumModule = class {
    constructor(engine) {
        this.engine = engine;
        this.scene = engine.scene;
        this.camera = engine.camera;
        this.renderer = engine.renderer;
        
        // Common properties
        this.time = 0;
        
        // Quantum properties container
        this.quantum = {
            state: "Undefined",
            phase: 0,
            coherence: 1.0,
            entanglement: 0.0,
            decoherence: 0.0
        };
    }
    
    // Initialize module (to be overridden)
    init() {
        console.log('Initializing base module');
    }
    
    // Update module (to be overridden)
    update(delta) {
        this.time += delta;
        
        // Apply phi-harmonic time dilation
        this.quantum.phase = (this.quantum.phase + delta * (this.engine.frequency / 600)) % (Math.PI * 2);
    }
    
    // Mouse move event handler (to be overridden)
    onMouseMove(x, y) {
        // Default implementation does nothing
    }
    
    // Click event handler (to be overridden)
    onClick(x, y) {
        // Default implementation does nothing
    }
    
    // Frequency change handler (to be overridden)
    onFrequencyChange(freq) {
        // Default implementation does nothing
    }
    
    // Get quantum state display HTML (to be overridden)
    getQuantumState() {
        return `
            <div class="state-label">${this.quantum.state}</div>
            <div class="phase-indicator">Coherence: ${this.quantum.coherence.toFixed(2)}</div>
        `;
    }
    
    // Get quantum metrics display HTML (to be overridden)
    getQuantumMetrics() {
        return `
            <div class="metric">Frequency: ${this.engine.frequency} Hz</div>
            <div class="metric">Phase: ${(this.quantum.phase / (Math.PI * 2) * 360).toFixed(0)}°</div>
            <div class="metric">Time: ${this.time.toFixed(2)}s</div>
        `;
    }
    
    // Dispose resources (to be overridden)
    dispose() {
        // Default implementation does nothing
    }
};

// Initialize module registry if Three.js is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof THREE === 'undefined') {
        // Add Three.js script if not already loaded
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = function() {
            console.log('Three.js loaded dynamically');
        };
        document.head.appendChild(script);
    }
});
