/**
 * AntikytheraQuantumMechanism Visualization Module - Part 2
 * Continues the visualization methods for the AntikytheraQuantumMechanism class
 * Implements phi-harmonic principles in the visual representation
 */

// Extend the AntikytheraQuantumMechanism prototype with more visualization methods
(function() {
    // Reference to the prototype
    const proto = AntikytheraQuantumMechanism.prototype;
    
    // Constants
    const PHI = 1.618033988749895;  // Golden ratio (φ)
    const PHI_SQUARED = 2.618033988749895; // φ²
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
     * Create zodiac ring
     * @private
     */
    proto._createZodiacRing = function() {
        const zodiacGroup = new THREE.Group();
        
        // Create the zodiac ring
        const ringGeometry = new THREE.RingGeometry(50, 55, 12, 12);
        const ringMaterial = new THREE.MeshPhongMaterial({
            color: 0x4b7f52, // Creation state color (528 Hz)
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7
        });
        
        const zodiacRing = new THREE.Mesh(ringGeometry, ringMaterial);
        zodiacRing.rotation.x = Math.PI / 2;
        zodiacRing.position.z = 20;
        zodiacGroup.add(zodiacRing);
        
        // Create zodiac symbols
        const zodiacNames = [
            "♈", "♉", "♊", "♋", "♌", "♍", 
            "♎", "♏", "♐", "♑", "♒", "♓"
        ];
        
        const loader = new THREE.FontLoader();
        
        // Use a function to create text with default font
        const createZodiacSymbol = (text, angle) => {
            // Create a canvas for the symbol
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const context = canvas.getContext('2d');
            
            // Draw the symbol
            context.fillStyle = '#ffffff';
            context.font = 'bold 40px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(text, 32, 32);
            
            // Create texture and sprite
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
            
            // Position the sprite
            const radius = 52.5;
            sprite.position.x = radius * Math.cos(angle);
            sprite.position.y = radius * Math.sin(angle);
            sprite.position.z = 20.5;
            sprite.scale.set(5, 5, 1);
            
            return sprite;
        };
        
        // Add zodiac symbols
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * TWO_PI;
            const symbol = createZodiacSymbol(zodiacNames[i], angle);
            zodiacGroup.add(symbol);
        }
        
        // Add markers for phi-harmonic points on the zodiac
        for (let i = 0; i < 6; i++) {
            const angle = (i * PHI) % 1 * TWO_PI;
            
            const markerGeometry = new THREE.BoxGeometry(2, 2, 0.5);
            const markerMaterial = new THREE.MeshPhongMaterial({
                color: PHI_COLORS[i],
                emissive: PHI_COLORS[i],
                emissiveIntensity: 0.5
            });
            
            const marker = new THREE.Mesh(markerGeometry, markerMaterial);
            const radius = 52.5;
            marker.position.x = radius * Math.cos(angle);
            marker.position.y = radius * Math.sin(angle);
            marker.position.z = 20.5;
            
            zodiacGroup.add(marker);
        }
        
        this.threeD.zodiacRing = zodiacRing;
        this.threeD.scene.add(zodiacGroup);
    };
    
    /**
     * Create dials for the mechanism
     * @private
     */
    proto._createDials = function() {
        const dialGroup = new THREE.Group();
        
        // Create main calendar dial
        const calendarDialGeometry = new THREE.RingGeometry(35, 45, 24, 1);
        const calendarDialMaterial = new THREE.MeshPhongMaterial({
            color: 0xdddddd,
            side: THREE.DoubleSide
        });
        
        const calendarDial = new THREE.Mesh(calendarDialGeometry, calendarDialMaterial);
        calendarDial.rotation.x = Math.PI / 2;
        calendarDial.position.z = 18;
        dialGroup.add(calendarDial);
        
        // Create month markers
        const monthNames = [
            "JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
        ];
        
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * TWO_PI;
            const radius = 40;
            
            // Create canvas for the month text
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 32;
            const context = canvas.getContext('2d');
            
            // Draw the month name
            context.fillStyle = '#000000';
            context.font = 'bold 20px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(monthNames[i], 32, 16);
            
            // Create texture and sprite
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
            
            // Position the sprite
            sprite.position.x = radius * Math.cos(angle);
            sprite.position.y = radius * Math.sin(angle);
            sprite.position.z = 18.5;
            sprite.scale.set(5, 2.5, 1);
            
            // Rotate the sprite to face outward
            sprite.rotation.z = -angle;
            
            dialGroup.add(sprite);
        }
        
        // Create lunar phase dial
        const lunarDialGeometry = new THREE.RingGeometry(20, 30, 8, 1);
        const lunarDialMaterial = new THREE.MeshPhongMaterial({
            color: 0x8888aa,
            side: THREE.DoubleSide
        });
        
        const lunarDial = new THREE.Mesh(lunarDialGeometry, lunarDialMaterial);
        lunarDial.rotation.x = Math.PI / 2;
        lunarDial.position.z = 15;
        dialGroup.add(lunarDial);
        
        // Create lunar phase indicators
        const phases = ["🌑", "🌓", "🌕", "🌗"];
        for (let i = 0; i < phases.length; i++) {
            const angle = (i / phases.length) * TWO_PI;
            const radius = 25;
            
            // Create canvas for the phase symbol
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const context = canvas.getContext('2d');
            
            // Draw the phase symbol
            context.fillStyle = '#ffffff';
            context.font = 'bold 40px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(phases[i], 32, 32);
            
            // Create texture and sprite
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
            
            // Position the sprite
            sprite.position.x = radius * Math.cos(angle);
            sprite.position.y = radius * Math.sin(angle);
            sprite.position.z = 15.5;
            sprite.scale.set(4, 4, 1);
            
            dialGroup.add(sprite);
        }
        
        // Create pointers
        this._createPointers(dialGroup);
        
        // Add dial group to scene
        this.threeD.scene.add(dialGroup);
    };
    
    /**
     * Create pointers for the dials
     * @param {THREE.Group} dialGroup - Group to add pointers to
     * @private
     */
    proto._createPointers = function(dialGroup) {
        // Create sun pointer
        const sunPointerGeometry = new THREE.ConeGeometry(1.5, 10, 8);
        const sunPointerMaterial = new THREE.MeshPhongMaterial({
            color: 0xd4af37, // Gold color for sun
            metalness: 0.7,
            roughness: 0.3
        });
        
        const sunPointer = new THREE.Mesh(sunPointerGeometry, sunPointerMaterial);
        sunPointer.rotation.x = Math.PI;
        sunPointer.position.z = 17;
        
        // Create decorative base for sun pointer
        const sunBaseGeometry = new THREE.SphereGeometry(2, 16, 16);
        const sunBase = new THREE.Mesh(sunBaseGeometry, sunPointerMaterial);
        sunBase.position.z = 17;
        
        // Create sun pointer group
        const sunPointerGroup = new THREE.Group();
        sunPointerGroup.add(sunPointer);
        sunPointerGroup.add(sunBase);
        sunPointerGroup.position.z = 1;
        dialGroup.add(sunPointerGroup);
        
        this.threeD.pointers.push({
            mesh: sunPointerGroup,
            type: 'sun',
            length: 10,
            angle: 0,
            speed: 1 / 365.25 // 1 full rotation per year
        });
        
        // Create moon pointer
        const moonPointerGeometry = new THREE.ConeGeometry(1.2, 8, 8);
        const moonPointerMaterial = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa, // Silver color for moon
            metalness: 0.7,
            roughness: 0.3
        });
        
        const moonPointer = new THREE.Mesh(moonPointerGeometry, moonPointerMaterial);
        moonPointer.rotation.x = Math.PI;
        moonPointer.position.z = 14;
        
        // Create decorative base for moon pointer
        const moonBaseGeometry = new THREE.SphereGeometry(1.5, 16, 16);
        const moonBase = new THREE.Mesh(moonBaseGeometry, moonPointerMaterial);
        moonBase.position.z = 14;
        
        // Create moon pointer group
        const moonPointerGroup = new THREE.Group();
        moonPointerGroup.add(moonPointer);
        moonPointerGroup.add(moonBase);
        moonPointerGroup.position.z = 1;
        dialGroup.add(moonPointerGroup);
        
        this.threeD.pointers.push({
            mesh: moonPointerGroup,
            type: 'moon',
            length: 8,
            angle: 0,
            speed: 1 / 29.5305 // 1 full rotation per synodic month
        });
        
        // Create metonic cycle indicator
        const metonicIndicatorGeometry = new THREE.RingGeometry(30, 31, 19, 1);
        const metonicIndicatorMaterial = new THREE.MeshPhongMaterial({
            color: PHI_COLORS[2], // DNA Resonance color (594 Hz)
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
        });
        
        const metonicIndicator = new THREE.Mesh(metonicIndicatorGeometry, metonicIndicatorMaterial);
        metonicIndicator.rotation.x = Math.PI / 2;
        metonicIndicator.position.z = 16;
        dialGroup.add(metonicIndicator);
        
        this.threeD.metonicIndicator = metonicIndicator;
    };
    
    /**
     * Create celestial bodies (planets)
     * @private
     */
    proto._createPlanets = function() {
        const planetGroup = new THREE.Group();
        
        // Planet data and positions
        const planets = [
            { name: 'Mercury', size: 2, color: 0xbbbbbb, orbit: 12 },
            { name: 'Venus', size: 2.5, color: 0xeedd99, orbit: 16 },
            { name: 'Mars', size: 2.2, color: 0xdd4422, orbit: 20 },
            { name: 'Jupiter', size: 3.5, color: 0xddaa88, orbit: 24 },
            { name: 'Saturn', size: 3, color: 0xccbb99, orbit: 28 }
        ];
        
        // Create planets
        planets.forEach((planet, index) => {
            // Create planet geometry
            const planetGeometry = new THREE.SphereGeometry(planet.size, 16, 16);
            const planetMaterial = new THREE.MeshPhongMaterial({
                color: planet.color,
                emissive: planet.color,
                emissiveIntensity: 0.2
            });
            
            const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
            
            // Create orbit
            const orbitGeometry = new THREE.RingGeometry(planet.orbit - 0.2, planet.orbit + 0.2, 64);
            const orbitMaterial = new THREE.MeshBasicMaterial({
                color: 0x444455,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            });
            
            const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbit.rotation.x = Math.PI / 2;
            
            // Add orbit to group
            planetGroup.add(orbit);
            
            // Initial position on orbit
            const angle = (index / planets.length) * TWO_PI;
            planetMesh.position.x = planet.orbit * Math.cos(angle);
            planetMesh.position.y = planet.orbit * Math.sin(angle);
            planetMesh.position.z = 5;
            
            // Add planet to group
            planetGroup.add(planetMesh);
            
            // Store planet data for animation
            this.threeD.planets = this.threeD.planets || [];
            this.threeD.planets.push({
                mesh: planetMesh,
                name: planet.name,
                orbit: planet.orbit,
                angle: angle,
                speed: 0 // Will be set based on astronomical calculations
            });
        });
        
        // Position planet group
        planetGroup.position.z = 15;
        
        // Add planet group to scene
        this.threeD.scene.add(planetGroup);
    };
    
    /**
     * Create decorative elements for the mechanism
     * @private
     */
    proto._createDecorativeElements = function() {
        // Create flower of life pattern on the back plate
        this._createFlowerOfLife();
        
        // Create phi spirals
        this._createPhiSpirals();
        
        // Create sacred geometry elements
        this._createSacredGeometry();
    };
    
    /**
     * Create Flower of Life pattern
     * @private
     */
    proto._createFlowerOfLife = function() {
        const folGroup = new THREE.Group();
        
        // Parameters for the Flower of Life
        const radius = 2.5;
        const layers = 3;
        const lineColor = 0x4b7f52; // 528 Hz Creation color
        
        // Function to create a circle
        const createCircle = (x, y) => {
            const circleGeometry = new THREE.RingGeometry(radius - 0.1, radius, 36);
            const circleMaterial = new THREE.MeshBasicMaterial({
                color: lineColor,
                transparent: true,
                opacity: 0.5,
                side: THREE.DoubleSide
            });
            
            const circle = new THREE.Mesh(circleGeometry, circleMaterial);
            circle.position.set(x, y, 0);
            return circle;
        };
        
        // Create central circle
        folGroup.add(createCircle(0, 0));
        
        // Create first layer (6 circles around center)
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * TWO_PI;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            
            folGroup.add(createCircle(x, y));
        }
        
        // Create outer layers
        if (layers >= 2) {
            // Second layer - 12 circles
            for (let i = 0; i < 6; i++) {
                const angle1 = (i / 6) * TWO_PI;
                const angle2 = ((i + 0.5) / 6) * TWO_PI;
                
                const x1 = 2 * radius * Math.cos(angle1);
                const y1 = 2 * radius * Math.sin(angle1);
                
                const x2 = 2 * radius * Math.cos(angle2);
                const y2 = 2 * radius * Math.sin(angle2);
                
                folGroup.add(createCircle(x1, y1));
                folGroup.add(createCircle(x2, y2));
            }
        }
        
        // Position the group
        folGroup.position.z = 5.5;
        folGroup.rotation.x = Math.PI / 2;
        
        // Add to scene
        this.threeD.scene.add(folGroup);
    };
    
    /**
     * Create phi spirals decoration
     * @private
     */
    proto._createPhiSpirals = function() {
        const spiralGroup = new THREE.Group();
        
        // Create a golden spiral
        const createGoldenSpiral = (color, startRadius, rotations, segments) => {
            const points = [];
            
            for (let i = 0; i <= segments; i++) {
                const t = (i / segments) * rotations * TWO_PI;
                const radius = startRadius * Math.pow(Math.E, 0.3066 * t); // Approximation of golden spiral
                
                const x = radius * Math.cos(t);
                const y = radius * Math.sin(t);
                
                points.push(new THREE.Vector3(x, y, 0));
            }
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color: color });
            
            return new THREE.Line(geometry, material);
        };
        
        // Create multiple phi spirals with different orientations
        for (let i = 0; i < 6; i++) {
            const color = PHI_COLORS[i];
            const spiral = createGoldenSpiral(color, 5, 3, 200);
            
            // Rotate and position each spiral
            const angle = (i / 6) * TWO_PI;
            spiral.rotation.z = angle;
            spiral.rotation.x = Math.PI / 2;
            
            // Scale the spiral
            spiral.scale.set(0.5, 0.5, 0.5);
            
            // Position at different depths
            spiral.position.z = 7 + (i * 0.1);
            
            spiralGroup.add(spiral);
        }
        
        // Add spiral group to scene
        this.threeD.scene.add(spiralGroup);
    };
    
    /**
     * Create sacred geometry elements
     * @private
     */
    proto._createSacredGeometry = function() {
        // Create a group for sacred geometry
        const geometryGroup = new THREE.Group();
        
        // Create a Metatron's Cube
        const createMetatronsCube = () => {
            const group = new THREE.Group();
            
            // Vertices of a regular icosahedron (approximated)
            const vertices = [
                new THREE.Vector3(0, 0, 5),  // Top
                new THREE.Vector3(0, 0, -5), // Bottom
            ];
            
            // Add middle vertices in a pentagon pattern
            for (let i = 0; i < 5; i++) {
                const angle1 = (i / 5) * TWO_PI;
                const angle2 = ((i + 0.5) / 5) * TWO_PI;
                
                // Upper pentagon
                vertices.push(new THREE.Vector3(
                    4 * Math.cos(angle1),
                    4 * Math.sin(angle1),
                    2
                ));
                
                // Lower pentagon
                vertices.push(new THREE.Vector3(
                    4 * Math.cos(angle2),
                    4 * Math.sin(angle2),
                    -2
                ));
            }
            
            // Create lines connecting vertices
            const connections = [
                // Connect top to upper pentagon
                [0, 2], [0, 4], [0, 6], [0, 8], [0, 10],
                // Connect bottom to lower pentagon
                [1, 3], [1, 5], [1, 7], [1, 9], [1, 11],
                // Connect upper pentagon
                [2, 4], [4, 6], [6, 8], [8, 10], [10, 2],
                // Connect lower pentagon
                [3, 5], [5, 7], [7, 9], [9, 11], [11, 3],
                // Connect upper to lower
                [2, 3], [4, 5], [6, 7], [8, 9], [10, 11]
            ];
            
            // Create lines
            connections.forEach(([from, to], index) => {
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                    vertices[from],
                    vertices[to]
                ]);
                
                const color = PHI_COLORS[index % PHI_COLORS.length];
                const lineMaterial = new THREE.LineBasicMaterial({ color: color });
                
                const line = new THREE.Line(lineGeometry, lineMaterial);
                group.add(line);
            });
            
            // Add spheres at vertices for a cleaner look
            vertices.forEach((vertex, index) => {
                const sphereGeometry = new THREE.SphereGeometry(0.2, 8, 8);
                const sphereMaterial = new THREE.MeshBasicMaterial({
                    color: PHI_COLORS[index % PHI_COLORS.length]
                });
                
                const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                sphere.position.copy(vertex);
                group.add(sphere);
            });
            
            return group;
        };
        
        // Create and scale sacred geometry
        const metatronsCube = createMetatronsCube();
        metatronsCube.scale.set(0.5, 0.5, 0.5);
        metatronsCube.position.z = 6;
        
        // Add it to the group
        geometryGroup.add(metatronsCube);
        
        // Add the group to the scene
        this.threeD.scene.add(geometryGroup);
    };
    
    // TO BE CONTINUED IN PART 3
})();
