// Torus Animation for CQIL Main Page
// Implements phi-harmonic toroidal flow animation based on 
// the golden ratio (φ = 1.618033988749895)

class TorusAnimation {
    constructor() {
        this.phi = 1.618033988749895;
        /** @type {HTMLElement|null} */
        this.torusElement = document.querySelector('.torus-shape');
        /** @type {HTMLElement|null} */
        this.particlesElement = document.querySelector('.torus-particles');
        /** @type {HTMLElement|null} */
        this.glowElement = document.querySelector('.torus-glow');
        this.isAnimating = false;
        /** @type {Array<{element: HTMLElement, angle: number, tubeAngle: number, speed: number}>} */
        this.particles = [];
        this.frequency = 432; // Start at Ground State (φ⁰)
        this.rotationSpeed = 0.005;
        this.flowSpeed = 0.02;
        this.particleCount = 144; // 12² (phi-harmonic)
        this.lastTime = 0;
        this.coherenceLevel = 0.5;
    }

    initialize() {
        if (!this.torusElement || !this.particlesElement) return;
        
        // Create particles
        this.createParticles();
        
        // Start animation
        this.start();
        
        // Add frequency evolution
        this.startFrequencyEvolution();
        
        // Add interaction
        this.addInteractionEvents();
    }
    
    createParticles() {
        if (!this.particlesElement) return;
        
        this.particlesElement.innerHTML = '';
        
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'torus-particle';
            
            // Calculate initial position on torus
            const angle = (i / this.particleCount) * Math.PI * 2 * this.phi;
            // Calculate position using our method
            const position = this.calculateTorusPosition(angle, i / this.particleCount * Math.PI * 2);
            
            // Apply position
            particle.style.left = `${position.x}px`;
            particle.style.top = `${position.y}px`;
            
            // Vary size based on phi harmonics
            const sizeIndex = i % 5;
            const sizeFactors = [0.5, 0.8, 1, 1.3, 1.618];
            particle.style.width = `${sizeFactors[sizeIndex] * 6}px`;
            particle.style.height = `${sizeFactors[sizeIndex] * 6}px`;
            
            // Add different colors based on frequency states
            const colorIndex = Math.floor(i / (this.particleCount / 5));
            const colors = [
                'rgba(66, 133, 244, 0.8)',  // Blue (Ground State)
                'rgba(52, 168, 83, 0.8)',   // Green (Transition)
                'rgba(251, 188, 5, 0.8)',   // Yellow (Creation State)
                'rgba(234, 67, 53, 0.8)',   // Red (Heart Field)
                'rgba(153, 51, 255, 0.8)'   // Purple (Unity State)
            ];
            particle.style.backgroundColor = colors[colorIndex];
            particle.style.boxShadow = `0 0 8px ${colors[colorIndex]}`;
            
            // Store particle data
            this.particles.push({
                element: particle,
                angle: angle,
                tubeAngle: i / this.particleCount * Math.PI * 2,
                speed: 0.01 + Math.random() * 0.01
            });
            
            this.particlesElement.appendChild(particle);
        }
    }
    
    /**
     * Calculate position on the torus based on angles
     * @param {number} angle - Angle around the main circle of the torus
     * @param {number} tubeAngle - Angle around the tube cross-section
     * @returns {{x: number, y: number}} - Position coordinates
     */
    calculateTorusPosition(angle, tubeAngle) {
        const torusRadius = 80; // Main torus radius
        const tubeRadius = 25;  // Tube radius
        const center = { x: 100, y: 100 }; // Center coordinates
        
        // Calculate position on torus
        const x = center.x + (torusRadius + tubeRadius * Math.cos(tubeAngle)) * Math.cos(angle);
        const y = center.y + (torusRadius + tubeRadius * Math.cos(tubeAngle)) * Math.sin(angle);
        
        return { x, y };
    }
    
    start() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.lastTime = performance.now();
        this.animate();
        
        // Add dynamic glowing effect
        if (this.glowElement) {
            this.glowElement.classList.add('active');
        }
    }
    
    stop() {
        this.isAnimating = false;
        if (this.glowElement) {
            this.glowElement.classList.remove('active');
        }
    }
    
    /**
     * Animate the torus particles
     * @param {number} currentTime - Current timestamp for animation
     */
    animate(currentTime = performance.now()) {
        if (!this.isAnimating) return;
        
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        // Update each particle
        this.particles.forEach((particle, index) => {
            // Update angles
            particle.angle += this.flowSpeed * (1 + index % 3 * 0.1) * (deltaTime / 16);
            particle.tubeAngle += this.rotationSpeed * (deltaTime / 16);
            
            // Calculate new position
            const position = this.calculateTorusPosition(particle.angle, particle.tubeAngle);
            
            // Apply new position
            particle.element.style.left = `${position.x}px`;
            particle.element.style.top = `${position.y}px`;
            
            // Scale based on z-position for 3D effect (based on tube angle)
            const scale = 0.7 + Math.abs(Math.sin(particle.tubeAngle)) * 0.6;
            particle.element.style.transform = `scale(${scale})`;
            
            // Adjust opacity based on position
            const opacity = 0.4 + Math.abs(Math.sin(particle.tubeAngle)) * 0.6;
            particle.element.style.opacity = opacity.toString();
        });
        
        // Pulse the torus based on frequency
        const pulseFactor = 1 + Math.sin(currentTime * 0.002 * (this.frequency/432)) * 0.05;
        if (this.torusElement) {
            this.torusElement.style.transform = `scale(${pulseFactor})`;
        }
        
        // Adjust glow intensity based on frequency
        const glowIntensity = 0.5 + (this.frequency - 432) / 672; // 432 to 768 range mapped to 0.5-1
        if (this.glowElement) {
            this.glowElement.style.opacity = (this.coherenceLevel * glowIntensity).toString();
        }
        
        requestAnimationFrame(time => this.animate(time));
    }
    
    startFrequencyEvolution() {
        // Gradually increase frequency based on phi-harmonic states
        const frequencyStates = [
            432,  // Ground State (φ⁰)
            528,  // Creation State (φ¹)
            594,  // Heart Field (φ²)
            768   // Unity State (φ^φ)
        ];
        
        let currentStateIndex = 0;
        
        const evolveFrequency = () => {
            if (currentStateIndex >= frequencyStates.length - 1) return;
            
            const currentFreq = this.frequency;
            const targetFreq = frequencyStates[currentStateIndex + 1];
            const duration = 8000; // 8 seconds per transition
            const startTime = performance.now();
            
            /**
             * Update frequency based on time
             * @param {number} timestamp - Current timestamp
             */
            const updateFrequency = (timestamp) => {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Use phi-harmonic curve for smooth transition
                const phiCurve = progress < 0.5 
                    ? 2 * Math.pow(progress, 2) 
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                
                this.frequency = currentFreq + (targetFreq - currentFreq) * phiCurve;
                
                // Update coherence level based on frequency state
                this.coherenceLevel = 0.5 + ((this.frequency - 432) / (768 - 432)) * 0.5;
                
                // Adjust animation speeds based on frequency
                this.flowSpeed = 0.02 * (this.frequency / 432);
                this.rotationSpeed = 0.005 * (this.frequency / 432);
                
                if (progress < 1) {
                    requestAnimationFrame(updateFrequency);
                } else {
                    // Move to next state after completion
                    currentStateIndex++;
                    
                    // Continue evolution if not at final state
                    if (currentStateIndex < frequencyStates.length - 1) {
                        setTimeout(evolveFrequency, 5000); // Wait 5 seconds before next evolution
                    }
                }
            };
            
            requestAnimationFrame(updateFrequency);
        };
        
        // Start evolution after 10 seconds
        setTimeout(evolveFrequency, 10000);
    }
    
    addInteractionEvents() {
        /** @type {HTMLElement|null} */
        const torusContainer = document.querySelector('.torus-preview');
        if (!torusContainer) return;
        
        // Add interaction effect
        torusContainer.addEventListener('mousemove', /** @param {MouseEvent} e */ (e) => {
            if (!this.torusElement) return;
            
            const rect = torusContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            // Tilt based on mouse position
            this.torusElement.style.transform = `scale(${1 + Math.sin(this.lastTime * 0.002) * 0.05}) 
                rotateX(${y * 20}deg) rotateY(${-x * 20}deg)`;
                
            // Accelerate particles in mouse direction
            this.flowSpeed = 0.02 + Math.abs(x) * 0.02 + Math.abs(y) * 0.02;
        });
        
        // Reset on mouse leave
        torusContainer.addEventListener('mouseleave', () => {
            if (!this.torusElement) return;
            
            this.torusElement.style.transform = '';
            this.flowSpeed = 0.02 * (this.frequency / 432);
        });
        
        // Pulse effect on click
        torusContainer.addEventListener('click', () => {
            if (!this.particlesElement) return;
            
            // Create pulse wave
            const pulse = document.createElement('div');
            pulse.className = 'torus-pulse';
            this.particlesElement.appendChild(pulse);
            
            // Remove after animation completes
            setTimeout(() => {
                if (pulse.parentNode) {
                    pulse.parentNode.removeChild(pulse);
                }
            }, 1000);
            
            // Temporarily accelerate particles
            const originalSpeed = this.flowSpeed;
            this.flowSpeed *= 3;
            setTimeout(() => {
                this.flowSpeed = originalSpeed;
            }, 1000);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const torusAnimation = new TorusAnimation();
    torusAnimation.initialize();
    
    // Make globally accessible
    /** @type {any} */ (window).torusAnimation = torusAnimation;
});
