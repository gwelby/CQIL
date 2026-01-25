/**
 * AntikytheraQuantumMechanism Visualization Module - Part 3
 * Final part of visualization methods including quantum effects and updates
 * Implements phi-harmonic principles and quantum flow rules
 */

// Extend the AntikytheraQuantumMechanism prototype with final visualization methods
(function() {
    // Reference to the prototype
    const proto = AntikytheraQuantumMechanism.prototype;
    
    // Constants
    const PHI = 1.618033988749895;  // Golden ratio (φ)
    const PHI_SQUARED = 2.618033988749895; // φ²
    const PHI_CUBED = 4.236067977499790; // φ³
    const TWO_PI = Math.PI * 2;
    
    // Phi-harmonic frequencies and colors
    const PHI_FREQUENCIES = [432, 528, 594, 672, 720, 768]; // φ⁰ to φ⁵
    const PHI_COLORS = [
        0x1a1a2e, // 432 Hz - Ground State - φ⁰
        0x4b7f52, // 528 Hz - Creation State - φ¹
        0xa97142, // 594 Hz - DNA Resonance - φ²
        0x8a2be2, // 672 Hz - Sacred Geometry - φ³
        0x00bfff, // 720 Hz - Vision Gate - φ⁴
        0xd4af37  // 768 Hz - Unity Wave - φ⁵
    ];
    
    /**
     * Create quantum field effects
     * @private
     */
    proto._createQuantumField = function() {
        // Create resonance field (toroidal field)
        this._createResonanceField();
        
        // Create quantum particle system
        this._createQuantumParticles();
        
        // Create phi-harmonic wave pattern
        this._createPhiHarmonicWaves();
    };
    
    /**
     * Create toroidal resonance field
     * @private
     */
    proto._createResonanceField = function() {
        // Create a torus as base for the resonance field
        const torusGeometry = new THREE.TorusGeometry(30, 15, 16, 100);
        const torusMaterial = new THREE.MeshPhongMaterial({
            color: PHI_COLORS[1], // Creation State color (528 Hz)
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide,
            wireframe: true
        });
        
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        
        // Create an additional solid torus with lower opacity
        const solidTorusGeometry = new THREE.TorusGeometry(30, 15, 16, 100);
        const solidTorusMaterial = new THREE.MeshPhongMaterial({
            color: PHI_COLORS[1],
            transparent: true,
            opacity: 0.05,
            side: THREE.DoubleSide
        });
        
        const solidTorus = new THREE.Mesh(solidTorusGeometry, solidTorusMaterial);
        
        // Create the resonance field group
        const resonanceField = new THREE.Group();
        resonanceField.add(torus);
        resonanceField.add(solidTorus);
        
        // Make it surround the mechanism
        resonanceField.rotation.x = Math.PI / 2;
        
        // Store reference for animation
        this.threeD.resonanceField = resonanceField;
        
        // Add to scene
        this.threeD.scene.add(resonanceField);
    };
    
    /**
     * Create quantum particles
     * @private
     */
    proto._createQuantumParticles = function() {
        // Create particles with phi-distribution
        const particleCount = 500;
        const particles = new THREE.BufferGeometry();
        
        // Create arrays for particle positions, colors, and sizes
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        // Helper function to distribute particles in a phi-harmonic pattern
        const distributeInPhiPattern = (index) => {
            const i = index * 3;
            const t = index / particleCount;
            const phiRatio = t * PHI * TWO_PI;
            
            // Distribute in a toroidal spiral pattern
            const radius = 30 + (5 * Math.sin(t * TWO_PI * 5));
            const tubeRadius = 15 * (0.5 + 0.5 * Math.sin(phiRatio * 3));
            
            // Calculate position on torus
            const u = phiRatio;
            const v = t * TWO_PI * 8;
            
            positions[i] = (radius + tubeRadius * Math.cos(v)) * Math.cos(u);
            positions[i + 1] = (radius + tubeRadius * Math.cos(v)) * Math.sin(u);
            positions[i + 2] = tubeRadius * Math.sin(v);
            
            // Determine color based on position in the phi distribution
            const colorIndex = Math.floor(t * 6) % 6;
            const nextColorIndex = (colorIndex + 1) % 6;
            const colorBlend = (t * 6) % 1;
            
            // Convert hex colors to RGB
            const color1 = new THREE.Color(PHI_COLORS[colorIndex]);
            const color2 = new THREE.Color(PHI_COLORS[nextColorIndex]);
            
            // Interpolate between the two colors
            const finalColor = color1.clone().lerp(color2, colorBlend);
            
            colors[i] = finalColor.r;
            colors[i + 1] = finalColor.g;
            colors[i + 2] = finalColor.b;
            
            // Vary sizes based on phi pattern
            sizes[index] = 1 + 2 * Math.sin(phiRatio);
        };
        
        // Generate particles
        for (let i = 0; i < particleCount; i++) {
            distributeInPhiPattern(i);
        }
        
        // Set attributes
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Create particle material
        const particleMaterial = new THREE.PointsMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            size: 2,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });
        
        // Create points system
        const particleSystem = new THREE.Points(particles, particleMaterial);
        
        // Store for animation
        this.threeD.particles = {
            system: particleSystem,
            geometry: particles,
            positions: positions,
            colors: colors,
            sizes: sizes,
            count: particleCount
        };
        
        // Add to scene
        this.threeD.scene.add(particleSystem);
    };
    
    /**
     * Create phi-harmonic wave patterns
     * @private
     */
    proto._createPhiHarmonicWaves = function() {
        // Create a group for the waves
        const waveGroup = new THREE.Group();
        
        // Create concentric circles representing harmonic waves
        for (let i = 0; i < 6; i++) {
            const radius = 10 + (i * 10);
            const waveGeometry = new THREE.RingGeometry(radius - 0.5, radius + 0.5, 64);
            const waveMaterial = new THREE.MeshBasicMaterial({
                color: PHI_COLORS[i],
                transparent: true,
                opacity: 0.2,
                side: THREE.DoubleSide
            });
            
            const wave = new THREE.Mesh(waveGeometry, waveMaterial);
            wave.rotation.x = Math.PI / 2;
            wave.userData = {
                originalScale: 1,
                pulseSpeed: 0.05 + (i * 0.01),
                pulsePhase: 0
            };
            
            waveGroup.add(wave);
        }
        
        // Store the wave group
        this.threeD.waves = waveGroup;
        
        // Add to scene
        this.threeD.scene.add(waveGroup);
    };
    
    /**
     * Create a resonance ripple effect at the specified position
     * @param {Number} x - Normalized x coordinate (0-1)
     * @param {Number} y - Normalized y coordinate (0-1)
     * @param {Number} strength - Intensity of the ripple (0-1)
     * @private
     */
    proto._createResonanceRipple = function(x, y, strength) {
        // Convert normalized coordinates to world coordinates
        const worldX = (x * 2 - 1) * 50;
        const worldY = (y * 2 - 1) * 50;
        
        // Create ripple ring geometry
        const rippleGeometry = new THREE.RingGeometry(0.5, 1.5, 32);
        const rippleMaterial = new THREE.MeshBasicMaterial({
            color: PHI_COLORS[1], // Creation state color (528 Hz)
            transparent: true,
            opacity: 0.8 * strength,
            side: THREE.DoubleSide
        });
        
        const ripple = new THREE.Mesh(rippleGeometry, rippleMaterial);
        ripple.position.set(worldX, worldY, 20);
        ripple.rotation.x = Math.PI / 2;
        
        // Store animation data in userData
        ripple.userData = {
            creationTime: Date.now(),
            expandTime: 1000 + (strength * 1000), // Duration in ms
            maxScale: 10 + (strength * 20)
        };
        
        // Add ripple to the scene
        this.threeD.scene.add(ripple);
        
        // Store ripple in a collection for animation
        if (!this.threeD.ripples) {
            this.threeD.ripples = [];
        }
        this.threeD.ripples.push(ripple);
        
        // Limit the number of ripples to avoid performance issues
        if (this.threeD.ripples.length > 10) {
            const oldestRipple = this.threeD.ripples.shift();
            this.threeD.scene.remove(oldestRipple);
        }
    };
    
    /**
     * Update the visualization based on astronomical calculations
     * @private
     */
    proto._updateVisualization = function() {
        // Update gears rotation
        this._updateGears();
        
        // Update pointer rotation
        this._updatePointers();
        
        // Update planet positions
        this._updatePlanets();
        
        // Update quantum effects if enabled
        if (this.config.enableQuantumEffects) {
            this._updateQuantumEffects();
        }
    };
    
    /**
     * Update gear rotations
     * @private
     */
    proto._updateGears = function() {
        if (!this.threeD.gears || !this.threeD.gears.length) return;
        
        // Get elapsed days
        const elapsedDays = this._getElapsedDays();
        
        // Update each gear
        this.threeD.gears.forEach(gear => {
            // Calculate rotation angle
            const rotationAngle = elapsedDays * gear.speed * TWO_PI;
            
            // Apply rotation to the gear
            gear.mesh.rotation.z = gear.angle + rotationAngle;
        });
    };
    
    /**
     * Update pointer rotations
     * @private
     */
    proto._updatePointers = function() {
        if (!this.threeD.pointers || !this.threeD.pointers.length) return;
        
        // Get elapsed days
        const elapsedDays = this._getElapsedDays();
        
        // Update each pointer
        this.threeD.pointers.forEach(pointer => {
            // Calculate rotation angle
            const rotationAngle = elapsedDays * pointer.speed * TWO_PI;
            
            // Apply rotation to the pointer
            pointer.mesh.rotation.z = pointer.angle + rotationAngle;
        });
        
        // Update metonic cycle indicator if present
        if (this.threeD.metonicIndicator && typeof this.state.metonicYear === 'number') {
            // Rotate indicator to match metonic year
            const metonicAngle = ((this.state.metonicYear - 1) / 19) * TWO_PI;
            this.threeD.metonicIndicator.rotation.z = metonicAngle;
        }
    };
    
    /**
     * Update planet positions
     * @private
     */
    proto._updatePlanets = function() {
        if (!this.threeD.planets || !this.astronomy || !this.astronomy.positions) return;
        
        const positions = this.astronomy.positions;
        
        // Map planets to astronomical data
        const planetMap = {
            'Mercury': positions.planets.mercury,
            'Venus': positions.planets.venus,
            'Mars': positions.planets.mars,
            'Jupiter': positions.planets.jupiter,
            'Saturn': positions.planets.saturn
        };
        
        // Update each planet
        this.threeD.planets.forEach(planet => {
            const planetData = planetMap[planet.name];
            
            if (planetData) {
                // Calculate position on orbit
                const angle = (planetData.longitude * Math.PI / 180);
                
                // Set planet position
                planet.mesh.position.x = planet.orbit * Math.cos(angle);
                planet.mesh.position.y = planet.orbit * Math.sin(angle);
                
                // Update speed
                // Planets further from the sun move slower (approximate)
                planet.speed = 1 / (planet.orbit * 20); // Simplified for visualization
            }
        });
    };
    
    /**
     * Update quantum effects
     * @private
     */
    proto._updateQuantumEffects = function() {
        // Update resonance field
        this._updateResonanceField();
        
        // Update particles
        this._updateParticles();
        
        // Update phi-harmonic waves
        this._updatePhiWaves();
        
        // Update ripples
        this._updateRipples();
        
        // Apply coherence effects
        this._applyCoherenceEffects();
    };
    
    /**
     * Update toroidal resonance field
     * @private
     */
    proto._updateResonanceField = function() {
        if (!this.threeD.resonanceField) return;
        
        // Pulse the resonance field with phi-harmonic oscillation
        const time = Date.now() / 1000;
        const pulseFactor = 0.95 + 0.1 * Math.sin(time * PHI);
        
        // Scale the resonance field
        this.threeD.resonanceField.scale.set(
            pulseFactor, 
            pulseFactor, 
            1 + 0.2 * Math.sin(time * PHI_SQUARED)
        );
        
        // Rotate the field slowly with phi-based speed
        this.threeD.resonanceField.rotation.z += 0.001 / PHI;
    };
    
    /**
     * Update quantum particles
     * @private
     */
    proto._updateParticles = function() {
        if (!this.threeD.particles) return;
        
        const particles = this.threeD.particles;
        const time = Date.now() / 1000;
        
        // Get position and size arrays
        const positions = particles.positions;
        const sizes = particles.sizes;
        
        // Update position and size of each particle
        for (let i = 0; i < particles.count; i++) {
            const i3 = i * 3;
            
            // Apply phi-harmonic movement
            const offset = i / particles.count;
            const phiTime = time * (0.1 + (0.1 * Math.sin(offset * PHI * TWO_PI)));
            
            // Calculate position on torus
            const u = offset * PHI * TWO_PI + phiTime * 0.2;
            const v = offset * TWO_PI * 8 + phiTime * 0.5;
            
            const radius = 30 + (5 * Math.sin(offset * TWO_PI * 5 + time * 0.2));
            const tubeRadius = 15 * (0.5 + 0.5 * Math.sin(u * 3));
            
            // Update positions with toroidal flow
            positions[i3] = (radius + tubeRadius * Math.cos(v)) * Math.cos(u);
            positions[i3 + 1] = (radius + tubeRadius * Math.cos(v)) * Math.sin(u);
            positions[i3 + 2] = tubeRadius * Math.sin(v);
            
            // Pulse sizes with phi-harmonic rhythm
            sizes[i] = 1 + 2 * Math.sin(offset * PHI * TWO_PI + time);
        }
        
        // Mark attributes for update
        particles.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.size.needsUpdate = true;
        
        // Slowly rotate the particle system
        particles.system.rotation.z += 0.0005;
        particles.system.rotation.x += 0.0002;
    };
    
    /**
     * Update phi-harmonic waves
     * @private
     */
    proto._updatePhiWaves = function() {
        if (!this.threeD.waves) return;
        
        // Update each wave
        this.threeD.waves.children.forEach((wave, index) => {
            // Get wave data
            const { originalScale, pulseSpeed, pulsePhase } = wave.userData;
            
            // Calculate new pulse phase
            wave.userData.pulsePhase = (pulsePhase + pulseSpeed) % TWO_PI;
            
            // Calculate scale factor
            const scaleFactor = originalScale * (1 + 0.2 * Math.sin(wave.userData.pulsePhase));
            
            // Apply scale
            wave.scale.set(scaleFactor, scaleFactor, 1);
            
            // Rotate waves alternately
            if (index % 2 === 0) {
                wave.rotation.z += 0.002 / PHI;
            } else {
                wave.rotation.z -= 0.002 / PHI;
            }
            
            // Adjust opacity based on coherence
            const opacity = 0.1 + (0.3 * this.state.coherence);
            wave.material.opacity = opacity * (0.5 + 0.5 * Math.sin(wave.userData.pulsePhase));
        });
    };
    
    /**
     * Update ripple animations
     * @private
     */
    proto._updateRipples = function() {
        if (!this.threeD.ripples || !this.threeD.ripples.length) return;
        
        const now = Date.now();
        const toRemove = [];
        
        // Update each ripple
        this.threeD.ripples.forEach(ripple => {
            const elapsed = now - ripple.userData.creationTime;
            const progress = Math.min(1, elapsed / ripple.userData.expandTime);
            
            // Scale the ripple
            const scale = progress * ripple.userData.maxScale;
            ripple.scale.set(scale, scale, 1);
            
            // Fade out
            ripple.material.opacity = (1 - progress) * 0.8;
            
            // Mark for removal if complete
            if (progress >= 1) {
                toRemove.push(ripple);
            }
        });
        
        // Remove completed ripples
        toRemove.forEach(ripple => {
            const index = this.threeD.ripples.indexOf(ripple);
            if (index !== -1) {
                this.threeD.ripples.splice(index, 1);
                this.threeD.scene.remove(ripple);
            }
        });
    };
    
    /**
     * Apply coherence effects based on celestial alignment
     * @private
     */
    proto._applyCoherenceEffects = function() {
        // Skip if coherence is not calculated
        if (typeof this.state.coherence !== 'number') return;
        
        // Get coherence value (0-1)
        const coherence = this.state.coherence;
        
        // Apply to particle system
        if (this.threeD.particles) {
            // Adjust particle size based on coherence
            const sizes = this.threeD.particles.sizes;
            const baseSize = 1 + (3 * coherence);
            
            for (let i = 0; i < this.threeD.particles.count; i++) {
                sizes[i] *= (0.5 + 0.5 * coherence);
            }
            
            // Mark for update
            this.threeD.particles.geometry.attributes.size.needsUpdate = true;
            
            // Adjust particle opacity
            this.threeD.particles.system.material.opacity = 0.4 + (0.6 * coherence);
        }
        
        // Apply to resonance field
        if (this.threeD.resonanceField) {
            // Adjust field intensity
            this.threeD.resonanceField.children.forEach(child => {
                if (child.material) {
                    child.material.opacity = 0.05 + (0.2 * coherence);
                }
            });
        }
        
        // Apply to wave opacity
        if (this.threeD.waves) {
            this.threeD.waves.children.forEach(wave => {
                wave.material.opacity = 0.1 + (0.3 * coherence);
            });
        }
    };
    
    /**
     * Get elapsed days from J2000 epoch
     * @returns {Number} - Days elapsed
     * @private
     */
    proto._getElapsedDays = function() {
        // Calculate days since J2000.0 (a common astronomical epoch)
        const j2000 = new Date(2000, 0, 1, 12, 0, 0);
        const elapsed = this.state.currentDate - j2000;
        return elapsed / (1000 * 60 * 60 * 24);
    };
    
    /**
     * Update the frequency of the mechanism
     * @param {Number} frequency - New frequency (432, 528, 594, 672, 720, or 768 Hz)
     * @public
     */
    proto.setFrequency = function(frequency) {
        // Validate the frequency
        if (!PHI_FREQUENCIES.includes(frequency)) {
            console.warn(`Invalid frequency: ${frequency}. Using 528 Hz instead.`);
            frequency = 528;
        }
        
        // Get the frequency index (0-5)
        const freqIndex = PHI_FREQUENCIES.indexOf(frequency);
        
        // Update audio oscillators if enabled
        if (this.config.enableAudio && this.audioNodes.oscillators) {
            // Adjust base frequency
            this._updateAudioFrequency(frequency);
        }
        
        // Update visual elements
        this._updateVisualsForFrequency(frequency, freqIndex);
        
        // Update data attributes on canvas
        if (this.elements.canvas) {
            this.elements.canvas.setAttribute('data-phi-frequency', frequency.toString());
            this.elements.canvas.setAttribute('data-phi-power', freqIndex.toString());
            
            // Map frequency to state names
            const stateNames = [
                'ground', 'creation', 'resonance', 'sacred', 'vision', 'unity'
            ];
            this.elements.canvas.setAttribute('data-phi-state', stateNames[freqIndex]);
        }
        
        // Update coherence calculation
        this.state.coherence = 0.3 + (0.1 * freqIndex) + (0.3 * this.state.celestialAlignment);
        
        // Render the scene
        this._renderScene();
    };
    
    /**
     * Update visual elements for the new frequency
     * @param {Number} frequency - New frequency
     * @param {Number} freqIndex - Index of the frequency in PHI_FREQUENCIES
     * @private
     */
    proto._updateVisualsForFrequency = function(frequency, freqIndex) {
        // Get the color for this frequency
        const color = PHI_COLORS[freqIndex];
        
        // Update resonance field color
        if (this.threeD.resonanceField) {
            this.threeD.resonanceField.children.forEach(child => {
                if (child.material) {
                    child.material.color.setHex(color);
                }
            });
        }
        
        // Update wave colors
        if (this.threeD.waves && this.threeD.waves.children[freqIndex]) {
            // Emphasize the current frequency's wave
            this.threeD.waves.children.forEach((wave, i) => {
                if (i === freqIndex) {
                    wave.material.opacity = 0.4;
                    wave.material.color.setHex(color);
                } else {
                    wave.material.opacity = 0.15;
                }
            });
        }
    };
    
    /**
     * Update audio frequency
     * @param {Number} frequency - Base frequency
     * @private
     */
    proto._updateAudioFrequency = function(frequency) {
        if (!this.audioNodes.context || !this.audioNodes.oscillators) return;
        
        // Calculate related frequencies based on phi-harmonic ratios
        const frequencies = [
            frequency / PHI_SQUARED, // Lower harmonic
            frequency / PHI,         // Lower harmonic
            frequency,               // Base frequency
            frequency * PHI,         // Upper harmonic
            frequency * PHI_SQUARED  // Upper harmonic
        ];
        
        // Update oscillators
        this.audioNodes.oscillators.forEach((osc, i) => {
            if (osc.oscillator && osc.oscillator.frequency) {
                // Get the appropriate frequency for this oscillator
                const oscFreq = frequencies[i % frequencies.length];
                
                // Smooth transition to new frequency
                osc.oscillator.frequency.linearRampToValueAtTime(
                    oscFreq,
                    this.audioNodes.context.currentTime + 0.5
                );
            }
        });
    };
    
    /**
     * Update visibility of various elements
     * @private
     */
    proto._updateVisibility = function() {
        // Update zodiac signs visibility
        if (this.threeD.zodiacRing) {
            this.threeD.zodiacRing.visible = this.state.zodiacSignsVisible;
        }
        
        // Update phi-harmonic relationships visibility
        if (this.threeD.waves) {
            this.threeD.waves.visible = this.state.phiHarmonicVisible;
        }
    };
    
    /**
     * Cleanup 3D resources
     * @private
     */
    proto._disposeThreeJSResources = function(obj) {
        if (!obj) return;
        
        // Dispose of geometries and materials recursively
        if (obj.geometry) {
            obj.geometry.dispose();
        }
        
        if (obj.material) {
            if (Array.isArray(obj.material)) {
                obj.material.forEach(material => material.dispose());
            } else {
                obj.material.dispose();
            }
        }
        
        // Recursively process children
        if (obj.children && obj.children.length > 0) {
            obj.children.forEach(child => this._disposeThreeJSResources(child));
        }
    };
    
})();
