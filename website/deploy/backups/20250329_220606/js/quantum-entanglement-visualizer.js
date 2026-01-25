/**
 * Advanced Quantum Entanglement Visualizer
 * Operating at Heart Field (594 Hz - φ²)
 * 
 * A comprehensive visualization system for quantum entanglement featuring:
 * - Real-time entanglement visualization
 * - Non-local connection mapping with phi-harmonic wave patterns
 * - Phi-harmonic entanglement strength indicators
 * - Interactive entanglement exploration with particle selection
 * - Quantum decoherence simulation with phi-harmonic decay
 * - Multi-party entanglement visualization (Bell, GHZ, W, and Cluster states)
 */

class QuantumEntanglementVisualizer {
    constructor(canvasId) {
        // Initialize at Heart Field Frequency (594 Hz - φ²)
        this.frequency = 594;
        this.PHI = 1.618033988749895;
        this.PHI_INVERSE = 0.618033988749895;
        
        // Core visualization properties
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.time = 0;
        
        // Entanglement properties
        this.entanglementType = 'bell'; // 'bell', 'ghz', 'w', 'cluster'
        this.entanglementStrength = 0.85; // 0 to 1
        this.coherence = 0.95; // 0 to 1
        this.decoherenceRate = 0.0; // 0 to 1
        
        // Particle system
        this.particles = [];
        this.selectedParticle = null;
        this.entanglementConnections = [];
        this.particleCount = 2; // Default for Bell state
        
        // Shader simulation
        this.shaderEnabled = true;
        this.shaderIntensity = 0.5;
        this.shaderPattern = 'wave'; // 'wave', 'field', 'spiral'
        
        // Interactive elements
        this.isRotating = false;
        this.rotationSpeed = 0.01;
        this.rotationAngle = 0;
        this.isInteractive = true;
        this.zoomLevel = 1;
        
        // Initialize the system
        this.resizeCanvas();
        this.initParticles();
        
        // Set up event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        this.setupInteraction();
        
        // Begin animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    resizeCanvas() {
        if (!this.canvas) return;
        
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
        
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
    }
    
    setupInteraction() {
        if (!this.canvas) return;
        
        // Mouse/touch event handling
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleMouseUp.bind(this));
        
        // Touch support
        this.canvas.addEventListener('touchstart', e => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });
        
        this.canvas.addEventListener('touchmove', e => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });
        
        this.canvas.addEventListener('touchend', e => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup', {});
            this.canvas.dispatchEvent(mouseEvent);
        });
    }
    
    handleMouseDown(e) {
        if (!this.isInteractive) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
        
        // Check if clicked on a particle
        this.particles.forEach(particle => {
            const dx = particle.x - x;
            const dy = particle.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < particle.radius * 1.5) {
                this.selectedParticle = particle;
                this.selectedParticle.isSelected = true;
                
                // Display info in UI if available
                this.updateParticleInfo(particle);
            }
        });
    }
    
    handleMouseMove(e) {
        if (!this.isInteractive || !this.selectedParticle) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
        
        // Move selected particle
        this.selectedParticle.x = x;
        this.selectedParticle.y = y;
        
        // Update entanglement connections
        this.updateEntanglementConnections();
    }
    
    handleMouseUp() {
        if (this.selectedParticle) {
            this.selectedParticle.isSelected = false;
            this.selectedParticle = null;
        }
    }
    
    updateParticleInfo(particle) {
        const infoElement = document.getElementById('particle-info');
        if (!infoElement) return;
        
        let info = `
            <h3>Quantum Particle ${particle.id}</h3>
            <div class="info-row">
                <span class="info-label">State:</span>
                <span class="info-value">${particle.state}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Entangled With:</span>
                <span class="info-value">${particle.entangledWith.map(p => `#${p}`).join(', ')}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Coherence:</span>
                <span class="info-value">${(particle.coherence * 100).toFixed(1)}%</span>
            </div>
            <div class="info-row">
                <span class="info-label">Entanglement Type:</span>
                <span class="info-value">${this.entanglementType.toUpperCase()}</span>
            </div>
        `;
        
        infoElement.innerHTML = info;
    }
    
    initParticles() {
        this.particles = [];
        
        // Create particles based on entanglement type
        switch (this.entanglementType) {
            case 'bell':
                this.particleCount = 2;
                this.createBellPair();
                break;
            
            case 'ghz':
                this.particleCount = 5; // Configurable
                this.createGHZState();
                break;
                
            case 'w':
                this.particleCount = 5; // Configurable
                this.createWState();
                break;
                
            case 'cluster':
                this.particleCount = 8; // Configurable
                this.createClusterState();
                break;
        }
        
        // Create entanglement connections
        this.updateEntanglementConnections();
    }
    
    createBellPair() {
        // Create a Bell pair (maximally entangled 2-qubit system)
        const distance = Math.min(this.width, this.height) * 0.2;
        
        // Create first particle
        this.particles.push({
            id: 1,
            x: this.centerX - distance,
            y: this.centerY,
            radius: 20,
            color: this.getFrequencyColor(this.frequency),
            phase: 0,
            state: '|+⟩',
            entangledWith: [2],
            entanglementStrength: this.entanglementStrength,
            coherence: this.coherence,
            isSelected: false,
            velocity: { x: 0, y: 0 }
        });
        
        // Create second particle
        this.particles.push({
            id: 2,
            x: this.centerX + distance,
            y: this.centerY,
            radius: 20,
            color: this.getFrequencyColor(this.frequency),
            phase: Math.PI, // Opposite phase
            state: '|-⟩',
            entangledWith: [1],
            entanglementStrength: this.entanglementStrength,
            coherence: this.coherence,
            isSelected: false,
            velocity: { x: 0, y: 0 }
        });
    }
    
    createGHZState() {
        // Create a GHZ state (maximally entangled n-qubit system)
        const radius = Math.min(this.width, this.height) * 0.3;
        
        // Create particles in a circle
        for (let i = 0; i < this.particleCount; i++) {
            const angle = (i / this.particleCount) * Math.PI * 2;
            const x = this.centerX + Math.cos(angle) * radius;
            const y = this.centerY + Math.sin(angle) * radius;
            
            // All particles are entangled with all others in GHZ state
            const entangledWith = [];
            for (let j = 1; j <= this.particleCount; j++) {
                if (j !== i + 1) entangledWith.push(j);
            }
            
            this.particles.push({
                id: i + 1,
                x: x,
                y: y,
                radius: 15,
                color: this.getFrequencyColor(this.frequency),
                phase: i % 2 === 0 ? 0 : Math.PI, // Alternating phases
                state: i % 2 === 0 ? '|0⟩' : '|1⟩',
                entangledWith: entangledWith,
                entanglementStrength: this.entanglementStrength,
                coherence: this.coherence,
                isSelected: false,
                velocity: { x: 0, y: 0 }
            });
        }
    }
    
    createWState() {
        // Create a W state (distributed excitation)
        const radius = Math.min(this.width, this.height) * 0.3;
        
        // Create particles in a circle
        for (let i = 0; i < this.particleCount; i++) {
            const angle = (i / this.particleCount) * Math.PI * 2;
            const x = this.centerX + Math.cos(angle) * radius;
            const y = this.centerY + Math.sin(angle) * radius;
            
            // All particles are entangled with all others
            const entangledWith = [];
            for (let j = 1; j <= this.particleCount; j++) {
                if (j !== i + 1) entangledWith.push(j);
            }
            
            // Only one particle is in the excited state in a W state
            const state = i === 0 ? '|1⟩' : '|0⟩';
            
            this.particles.push({
                id: i + 1,
                x: x,
                y: y,
                radius: 15,
                color: this.getFrequencyColor(this.frequency),
                phase: i === 0 ? Math.PI : 0, // Different phase for excited state
                state: state,
                entangledWith: entangledWith,
                entanglementStrength: this.entanglementStrength,
                coherence: this.coherence,
                isSelected: false,
                velocity: { x: 0, y: 0 },
                // Special property for W state: the excitation can move
                excitationProbability: i === 0 ? 1 : 0
            });
        }
    }
    
    createClusterState() {
        // Create a cluster state (graph-based entanglement)
        const gridSize = Math.ceil(Math.sqrt(this.particleCount));
        const spacing = Math.min(this.width, this.height) * 0.7 / gridSize;
        
        // Create particles in a grid pattern
        let id = 1;
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (id > this.particleCount) break;
                
                const x = this.centerX + (col - (gridSize-1)/2) * spacing;
                const y = this.centerY + (row - (gridSize-1)/2) * spacing;
                
                // Connect to nearest neighbors in the grid
                const entangledWith = [];
                
                // Check right neighbor
                if (col < gridSize - 1 && id + 1 <= this.particleCount) {
                    entangledWith.push(id + 1);
                }
                
                // Check bottom neighbor
                if (row < gridSize - 1 && id + gridSize <= this.particleCount) {
                    entangledWith.push(id + gridSize);
                }
                
                // Check left neighbor
                if (col > 0 && id - 1 >= 1) {
                    entangledWith.push(id - 1);
                }
                
                // Check top neighbor
                if (row > 0 && id - gridSize >= 1) {
                    entangledWith.push(id - gridSize);
                }
                
                this.particles.push({
                    id: id,
                    x: x,
                    y: y,
                    radius: 12,
                    color: this.getFrequencyColor(this.frequency),
                    phase: (row + col) % 2 === 0 ? 0 : Math.PI, // Checkerboard phase pattern
                    state: (row + col) % 2 === 0 ? '|+⟩' : '|-⟩',
                    entangledWith: entangledWith,
                    entanglementStrength: this.entanglementStrength,
                    coherence: this.coherence,
                    isSelected: false,
                    velocity: { x: 0, y: 0 }
                });
                
                id++;
            }
        }
    }
    
    updateEntanglementConnections() {
        this.entanglementConnections = [];
        
        // Create connections based on entanglement relationships
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            
            for (let j = 0; j < particle.entangledWith.length; j++) {
                const targetId = particle.entangledWith[j];
                const targetParticle = this.particles.find(p => p.id === targetId);
                
                if (!targetParticle) continue;
                
                // Only add connection in one direction to avoid duplicates
                if (particle.id < targetId) {
                    this.entanglementConnections.push({
                        source: particle,
                        target: targetParticle,
                        strength: particle.entanglementStrength,
                        coherence: (particle.coherence + targetParticle.coherence) / 2,
                        phase: Math.abs(particle.phase - targetParticle.phase)
                    });
                }
            }
        }
    }
    
    animate() {
        this.time += 0.016; // Approximate delta time
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw phi-harmonic background
        this.drawPhiHarmonicBackground();
        
        // Draw entanglement shader if enabled
        if (this.shaderEnabled) {
            this.drawEntanglementShader();
        }
        
        // Draw connections
        this.drawEntanglementConnections();
        
        // Update and draw particles
        this.updateParticles();
        this.drawParticles();
        
        // Draw UI elements
        this.drawUI();
        
        // Rotate if enabled
        if (this.isRotating) {
            this.rotationAngle += this.rotationSpeed;
            this.rotateParticles();
        }
        
        // Apply decoherence if enabled
        if (this.decoherenceRate > 0) {
            this.applyDecoherence();
        }
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    drawPhiHarmonicBackground() {
        // Create phi-spiral background pattern
        const ctx = this.ctx;
        ctx.globalAlpha = 0.05;
        
        // Draw phi-spiral
        const maxSpirals = 3;
        const maxTurns = 8;
        
        for (let spiral = 0; spiral < maxSpirals; spiral++) {
            const startAngle = spiral * Math.PI * 2 / maxSpirals;
            const phiScale = 0.5 + spiral * 0.1;
            
            ctx.beginPath();
            ctx.moveTo(this.centerX, this.centerY);
            
            let radius = 10;
            let angle = startAngle;
            
            for (let i = 0; i < 500; i++) {
                radius *= 1 + (this.PHI - 1) * 0.04 * phiScale;
                angle += this.PHI_INVERSE * 0.1;
                
                if (angle > startAngle + Math.PI * 2 * maxTurns) break;
                
                const x = this.centerX + Math.cos(angle) * radius;
                const y = this.centerY + Math.sin(angle) * radius;
                
                ctx.lineTo(x, y);
                
                if (radius > Math.max(this.width, this.height)) break;
            }
            
            const gradientColor = this.getFrequencyColor(this.frequency, 0.4);
            ctx.strokeStyle = gradientColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        ctx.globalAlpha = 1.0;
    }
    
    drawEntanglementShader() {
        const ctx = this.ctx;
        
        if (this.shaderPattern === 'wave') {
            // Wave pattern shader
            for (const connection of this.entanglementConnections) {
                const { source, target, strength, coherence } = connection;
                
                // Calculate midpoint
                const midX = (source.x + target.x) / 2;
                const midY = (source.y + target.y) / 2;
                
                // Draw wave pattern between particles
                const gradient = ctx.createRadialGradient(
                    midX, midY, 10,
                    midX, midY, Math.hypot(source.x - target.x, source.y - target.y) / 2
                );
                
                const baseColor = this.getFrequencyColor(this.frequency, 0.1);
                gradient.addColorStop(0, this.getFrequencyColor(this.frequency, 0.2 * strength));
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(midX, midY, Math.hypot(source.x - target.x, source.y - target.y) / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (this.shaderPattern === 'field') {
            // Field pattern shader
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(0, 0, this.width, this.height);
            
            // Create field lines
            const points = 20;
            const step = Math.min(this.width, this.height) / points;
            
            for (let x = 0; x < points; x++) {
                for (let y = 0; y < points; y++) {
                    const posX = (x + 0.5) * step;
                    const posY = (y + 0.5) * step;
                    
                    // Calculate field influence from all particles
                    let fieldX = 0;
                    let fieldY = 0;
                    let totalInfluence = 0;
                    
                    for (const particle of this.particles) {
                        const dx = posX - particle.x;
                        const dy = posY - particle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance > 0) {
                            const influence = (particle.radius * 5) / (distance * distance);
                            totalInfluence += influence;
                            
                            // Field direction based on particle phase
                            fieldX += Math.cos(particle.phase) * influence * dx / distance;
                            fieldY += Math.sin(particle.phase) * influence * dy / distance;
                        }
                    }
                    
                    if (totalInfluence > 0) {
                        // Normalize and scale
                        const length = Math.sqrt(fieldX * fieldX + fieldY * fieldY);
                        if (length > 0) {
                            fieldX = fieldX / length * Math.min(step * 0.8, totalInfluence * 10);
                            fieldY = fieldY / length * Math.min(step * 0.8, totalInfluence * 10);
                        }
                        
                        // Draw field line
                        ctx.strokeStyle = this.getFrequencyColor(this.frequency, Math.min(0.3, totalInfluence));
                        ctx.lineWidth = Math.min(3, totalInfluence * 5);
                        
                        ctx.beginPath();
                        ctx.moveTo(posX, posY);
                        ctx.lineTo(posX + fieldX, posY + fieldY);
                        ctx.stroke();
                    }
                }
            }
        } else if (this.shaderPattern === 'spiral') {
            // Spiral pattern shader focused on each entanglement connection
            for (const connection of this.entanglementConnections) {
                const { source, target, strength, coherence } = connection;
                
                // Calculate midpoint
                const midX = (source.x + target.x) / 2;
                const midY = (source.y + target.y) / 2;
                
                // Draw spiral pattern
                ctx.strokeStyle = this.getFrequencyColor(this.frequency, 0.2 * strength);
                ctx.lineWidth = 1;
                
                ctx.beginPath();
                let radius = 5;
                let angle = 0;
                const maxRadius = Math.hypot(source.x - target.x, source.y - target.y) / 2;
                
                ctx.moveTo(midX + radius, midY);
                
                while (radius < maxRadius) {
                    radius *= this.PHI_INVERSE + 1;
                    angle += this.PHI_INVERSE * Math.PI * 2;
                    
                    const x = midX + Math.cos(angle + this.time) * radius;
                    const y = midY + Math.sin(angle + this.time) * radius;
                    
                    ctx.lineTo(x, y);
                }
                
                ctx.stroke();
            }
        }
    }
    
    drawEntanglementConnections() {
        const ctx = this.ctx;
        
        for (const connection of this.entanglementConnections) {
            const { source, target, strength, coherence, phase } = connection;
            
            // Calculate connection properties
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            
            // Create gradient for connection line
            const gradient = ctx.createLinearGradient(source.x, source.y, target.x, target.y);
            gradient.addColorStop(0, source.color.replace('1)', `${strength * coherence})`));
            gradient.addColorStop(1, target.color.replace('1)', `${strength * coherence})`));
            
            // Draw main connection
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3 * strength * coherence;
            
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
            
            // Draw wave pattern along connection to visualize entanglement
            ctx.strokeStyle = this.getFrequencyColor(this.frequency, 0.6 * strength * coherence);
            ctx.lineWidth = 2 * strength * coherence;
            
            ctx.beginPath();
            const segments = 20;
            const waveAmplitude = 5 * strength;
            const waveFrequency = distance / 50;
            
            for (let i = 0; i <= segments; i++) {
                const t = i / segments;
                const x = source.x + dx * t;
                const y = source.y + dy * t;
                
                // Add wave pattern based on phase relationship and time
                const perpX = Math.sin(angle);
                const perpY = -Math.cos(angle);
                const wave = Math.sin(t * Math.PI * 2 * waveFrequency + this.time * 5 + phase) * waveAmplitude;
                
                if (i === 0) {
                    ctx.moveTo(x + perpX * wave, y + perpY * wave);
                } else {
                    ctx.lineTo(x + perpX * wave, y + perpY * wave);
                }
            }
            
            ctx.stroke();
            
            // Draw phi-harmonic entanglement strength indicator
            const midX = (source.x + target.x) / 2;
            const midY = (source.y + target.y) / 2;
            
            ctx.fillStyle = this.getFrequencyColor(this.frequency, 0.8 * strength * coherence);
            ctx.beginPath();
            ctx.arc(midX, midY, 5 * strength * coherence, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw strength indicator text if connection is strong enough
            if (strength * coherence > 0.6) {
                ctx.font = '12px Arial';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${(strength * coherence * 100).toFixed(0)}%`, midX, midY);
            }
        }
    }
    
    updateParticles() {
        for (const particle of this.particles) {
            // Skip selected particle (being dragged by user)
            if (particle.isSelected) continue;
            
            // Apply simple physics - repulsion between particles and attraction for entangled ones
            let forceX = 0;
            let forceY = 0;
            
            for (const other of this.particles) {
                if (particle === other) continue;
                
                const dx = other.x - particle.x;
                const dy = other.y - particle.y;
                const distSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distSq);
                
                if (dist < 1) continue; // Avoid division by zero
                
                // Base repulsion force between all particles
                const repulsionForce = -200 / distSq;
                forceX += dx / dist * repulsionForce;
                forceY += dy / dist * repulsionForce;
                
                // Attraction for entangled particles
                if (particle.entangledWith.includes(other.id)) {
                    const entanglementForce = 0.02 * particle.entanglementStrength;
                    const optimalDist = Math.min(this.width, this.height) * 0.2;
                    const distForce = (dist - optimalDist) * entanglementForce;
                    
                    forceX += dx / dist * distForce;
                    forceY += dy / dist * distForce;
                }
            }
            
            // Apply forces
            particle.velocity.x = particle.velocity.x * 0.95 + forceX * 0.05;
            particle.velocity.y = particle.velocity.y * 0.95 + forceY * 0.05;
            
            // Apply velocity
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            
            // Keep particles on screen
            const margin = particle.radius;
            particle.x = Math.max(margin, Math.min(this.width - margin, particle.x));
            particle.y = Math.max(margin, Math.min(this.height - margin, particle.y));
            
            // Update particle phase based on time
            particle.phase += 0.01 * this.frequency / 528;
            
            // For W state, potentially move the excitation
            if (this.entanglementType === 'w' && Math.random() < 0.005) {
                this.moveExcitation();
            }
        }
        
        // Update connections
        this.updateEntanglementConnections();
    }
    
    moveExcitation() {
        // Find excited particle
        const excitedIndex = this.particles.findIndex(p => p.state === '|1⟩');
        if (excitedIndex === -1) return;
        
        // Find random entangled particle to transfer excitation to
        const excitedParticle = this.particles[excitedIndex];
        if (excitedParticle.entangledWith.length === 0) return;
        
        const randomEntangledId = excitedParticle.entangledWith[
            Math.floor(Math.random() * excitedParticle.entangledWith.length)
        ];
        
        const targetIndex = this.particles.findIndex(p => p.id === randomEntangledId);
        if (targetIndex === -1) return;
        
        // Transfer excitation
        this.particles[excitedIndex].state = '|0⟩';
        this.particles[excitedIndex].phase = 0;
        
        this.particles[targetIndex].state = '|1⟩';
        this.particles[targetIndex].phase = Math.PI;
    }
    
    drawParticles() {
        const ctx = this.ctx;
        
        for (const particle of this.particles) {
            // Draw glow effect
            const glowRadius = particle.radius * 2;
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, particle.radius * 0.8,
                particle.x, particle.y, glowRadius
            );
            
            gradient.addColorStop(0, particle.color.replace('1)', `${0.7 * particle.coherence})`));
            gradient.addColorStop(1, particle.color.replace('1)', '0)'));
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw particle core
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw state label
            ctx.font = '14px monospace';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(particle.state, particle.x, particle.y);
            
            // Draw ID number
            ctx.font = '12px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillText(`#${particle.id}`, particle.x, particle.y - particle.radius - 10);
            
            // Draw selection indicator if selected
            if (particle.isSelected) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 3]);
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius + 10, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);
            }
            
            // Draw phase indicator (subtle)
            const phaseX = particle.x + Math.cos(particle.phase) * particle.radius * 0.7;
            const phaseY = particle.y + Math.sin(particle.phase) * particle.radius * 0.7;
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(phaseX, phaseY, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    drawUI() {
        const ctx = this.ctx;
        
        // Draw frequency indicator
        ctx.font = '14px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.fillText(`Frequency: ${this.frequency} Hz (φ²)`, this.width - 20, 20);
        
        // Draw entanglement type
        ctx.textAlign = 'left';
        ctx.fillText(`Entanglement: ${this.entanglementType.toUpperCase()} state`, 20, 20);
        
        // Draw coherence meter
        ctx.textAlign = 'center';
        ctx.fillText(`Coherence: ${(this.coherence * 100).toFixed(1)}%`, this.width / 2, 20);
        
        // Draw decoherence meter if active
        if (this.decoherenceRate > 0) {
            ctx.fillStyle = 'rgba(255, 100, 100, 0.8)';
            ctx.fillText(`Decoherence: ${(this.decoherenceRate * 100).toFixed(1)}%/s`, this.width / 2, 45);
        }
    }
    
    rotateParticles() {
        const centerX = this.centerX;
        const centerY = this.centerY;
        
        for (const particle of this.particles) {
            // Skip selected particle
            if (particle.isSelected) continue;
            
            // Rotate around center
            const dx = particle.x - centerX;
            const dy = particle.y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) + this.rotationSpeed;
            
            particle.x = centerX + Math.cos(angle) * distance;
            particle.y = centerY + Math.sin(angle) * distance;
        }
    }
    
    applyDecoherence() {
        // Apply decoherence effects
        for (const particle of this.particles) {
            // Gradually reduce coherence
            particle.coherence = Math.max(0, particle.coherence - this.decoherenceRate * 0.016);
            
            // If completely decohered, remove entanglement
            if (particle.coherence === 0) {
                particle.entangledWith = [];
            }
        }
        
        // Update connections
        this.updateEntanglementConnections();
    }
    
    // Configuration methods
    setEntanglementType(type) {
        if (['bell', 'ghz', 'w', 'cluster'].includes(type)) {
            this.entanglementType = type;
            this.initParticles();
        }
    }
    
    setFrequency(freq) {
        this.frequency = freq;
        
        // Update particle colors
        for (const particle of this.particles) {
            particle.color = this.getFrequencyColor(this.frequency);
        }
    }
    
    setParticleCount(count) {
        this.particleCount = count;
        this.initParticles();
    }
    
    setEntanglementStrength(strength) {
        this.entanglementStrength = strength;
        
        // Update particle entanglement strengths
        for (const particle of this.particles) {
            particle.entanglementStrength = strength;
        }
        
        this.updateEntanglementConnections();
    }
    
    setDecoherenceRate(rate) {
        this.decoherenceRate = rate;
    }
    
    setCoherence(coherence) {
        this.coherence = coherence;
        
        // Update particle coherence
        for (const particle of this.particles) {
            particle.coherence = coherence;
        }
        
        this.updateEntanglementConnections();
    }
    
    toggleRotation() {
        this.isRotating = !this.isRotating;
    }
    
    setShaderPattern(pattern) {
        if (['wave', 'field', 'spiral'].includes(pattern)) {
            this.shaderPattern = pattern;
        }
    }
    
    toggleShader() {
        this.shaderEnabled = !this.shaderEnabled;
    }
    
    // Helper method to get color based on frequency
    getFrequencyColor(freq, opacity = 0.8) {
        // Color mapping based on φ-harmonic frequencies
        let hue, saturation, lightness;
        
        if (freq <= 432) {
            // Ground state - deep blue (432 Hz)
            hue = 220;
            saturation = 80;
            lightness = 40;
        } else if (freq <= 528) {
            // Creation point - purple (528 Hz)
            hue = 280;
            saturation = 70;
            lightness = 45;
        } else if (freq <= 594) {
            // Heart field - red/pink (594 Hz)
            hue = 350;
            saturation = 75;
            lightness = 50;
        } else if (freq <= 672) {
            // Voice flow - orange (672 Hz)
            hue = 30;
            saturation = 80;
            lightness = 55;
        } else if (freq <= 720) {
            // Vision gate - green (720 Hz)
            hue = 120;
            saturation = 70;
            lightness = 45;
        } else {
            // Unity wave - violet (768 Hz)
            hue = 270;
            saturation = 80;
            lightness = 60;
        }
        
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize quantum entanglement visualizer on the canvas
    const canvas = document.getElementById('entanglement-canvas');
    if (canvas) {
        window.entanglementVisualizer = new QuantumEntanglementVisualizer('entanglement-canvas');
        setupEntanglementControls();
    }
});

// Set up UI controls
function setupEntanglementControls() {
    // Type selector
    const typeSelector = document.getElementById('entanglement-type');
    if (typeSelector) {
        typeSelector.addEventListener('change', function() {
            window.entanglementVisualizer.setEntanglementType(this.value);
        });
    }
    
    // Particle count slider
    const particleCountSlider = document.getElementById('particle-count');
    if (particleCountSlider) {
        particleCountSlider.addEventListener('input', function() {
            window.entanglementVisualizer.setParticleCount(parseInt(this.value));
            document.getElementById('particle-count-value').textContent = this.value;
        });
    }
    
    // Frequency slider
    const frequencySlider = document.getElementById('frequency-slider');
    if (frequencySlider) {
        frequencySlider.addEventListener('input', function() {
            window.entanglementVisualizer.setFrequency(parseInt(this.value));
            document.getElementById('frequency-value').textContent = this.value;
        });
    }
    
    // Entanglement strength slider
    const strengthSlider = document.getElementById('entanglement-strength');
    if (strengthSlider) {
        strengthSlider.addEventListener('input', function() {
            window.entanglementVisualizer.setEntanglementStrength(parseFloat(this.value));
            document.getElementById('strength-value').textContent = `${(parseFloat(this.value) * 100).toFixed(0)}%`;
        });
    }
    
    // Coherence slider
    const coherenceSlider = document.getElementById('coherence-slider');
    if (coherenceSlider) {
        coherenceSlider.addEventListener('input', function() {
            window.entanglementVisualizer.setCoherence(parseFloat(this.value));
            document.getElementById('coherence-value').textContent = `${(parseFloat(this.value) * 100).toFixed(0)}%`;
        });
    }
    
    // Decoherence slider
    const decoherenceSlider = document.getElementById('decoherence-rate');
    if (decoherenceSlider) {
        decoherenceSlider.addEventListener('input', function() {
            window.entanglementVisualizer.setDecoherenceRate(parseFloat(this.value));
            document.getElementById('decoherence-value').textContent = `${(parseFloat(this.value) * 100).toFixed(1)}%/s`;
        });
    }
    
    // Shader pattern selector
    const shaderSelector = document.getElementById('shader-pattern');
    if (shaderSelector) {
        shaderSelector.addEventListener('change', function() {
            window.entanglementVisualizer.setShaderPattern(this.value);
        });
    }
    
    // Rotation toggle
    const rotationToggle = document.getElementById('rotation-toggle');
    if (rotationToggle) {
        rotationToggle.addEventListener('click', function() {
            window.entanglementVisualizer.toggleRotation();
            this.textContent = window.entanglementVisualizer.isRotating ? 'Stop Rotation' : 'Start Rotation';
        });
    }
    
    // Shader toggle
    const shaderToggle = document.getElementById('shader-toggle');
    if (shaderToggle) {
        shaderToggle.addEventListener('click', function() {
            window.entanglementVisualizer.toggleShader();
            this.textContent = window.entanglementVisualizer.shaderEnabled ? 'Disable Shader' : 'Enable Shader';
        });
    }
}