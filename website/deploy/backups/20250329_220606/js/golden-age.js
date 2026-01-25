// Golden Age JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all Golden Age features
    initGoldenParticles();
    initUnityField();
    initFrequencies();
    initHeartTime();
    initCommunityMap();
    setupEventListeners();
});

// Golden Particles
function initGoldenParticles() {
    const particles = document.getElementById('golden-particles');
    if (!particles) return;
    
    const canvas = document.createElement('canvas');
    particles.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = particles.offsetWidth;
        canvas.height = particles.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle properties
    const particleCount = 100;
    const particleList = [];
    
    class GoldenParticle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(255, 215, 0, ${Math.random() * 0.5 + 0.2})`;
            this.life = Math.random() * 0.5 + 0.5;
            this.maxLife = this.life;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 0.001;
            
            // Reset particle if it's dead or out of bounds
            if (this.life <= 0 || 
                this.x < 0 || this.x > canvas.width || 
                this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            const alpha = (this.life / this.maxLife) * 0.5;
            ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particleList.push(new GoldenParticle());
    }
    
    // Draw phi symbols occasionally
    let phiTimer = 0;
    function drawPhiSymbol() {
        phiTimer++;
        if (phiTimer % 100 === 0) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 30 + 20;
            
            ctx.font = `${size}px serif`;
            ctx.fillStyle = 'rgba(255, 215, 0, 0.1)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('φ', x, y);
        }
    }
    
    // Animation loop
    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (const particle of particleList) {
            particle.update();
            particle.draw();
        }
        
        drawPhiSymbol();
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Unity Field
function initUnityField() {
    const canvas = document.getElementById('unity-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let fieldStrength = 0;
    let isConnected = false;
    let nodes = [];
    let connections = [];
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Generate nodes in PHI spiral pattern
    function generateNodes() {
        nodes = [];
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const PHI = 1.618033988749895;
        const nodeCount = 21; // Fibonacci number
        
        // Create main center node
        nodes.push({
            x: centerX,
            y: centerY,
            size: 15,
            color: 'rgba(255, 215, 0, 0.8)',
            vx: 0,
            vy: 0,
            connected: true
        });
        
        // Create nodes in PHI spiral
        for (let i = 1; i < nodeCount; i++) {
            const angle = i * PHI * Math.PI;
            const radius = Math.sqrt(i) * 15;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            nodes.push({
                x,
                y,
                size: 5 + Math.random() * 5,
                color: `rgba(255, 215, 0, ${0.3 + Math.random() * 0.5})`,
                vx: 0,
                vy: 0,
                connected: false
            });
        }
    }
    
    // Generate connections between nodes
    function generateConnections() {
        connections = [];
        
        // Golden ratio connections
        const PHI = 1.618033988749895;
        
        // Connect center to all
        for (let i = 1; i < nodes.length; i++) {
            if (Math.random() < fieldStrength / 100) {
                connections.push([0, i]);
                nodes[i].connected = true;
            }
        }
        
        // Connect nodes based on PHI relationship
        for (let i = 1; i < nodes.length; i++) {
            const next = Math.floor(i * PHI) % nodes.length;
            if (next !== i && Math.random() < fieldStrength / 200) {
                connections.push([i, next]);
            }
        }
    }
    
    // Draw the field
    function drawField() {
        ctx.fillStyle = 'rgba(10, 10, 26, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw phi symbol in background
        ctx.font = '140px serif';
        ctx.fillStyle = 'rgba(255, 215, 0, 0.03)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('φ', canvas.width / 2, canvas.height / 2);
        
        // Draw connections
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.2)';
        ctx.lineWidth = 1;
        
        for (const [i, j] of connections) {
            const nodeA = nodes[i];
            const nodeB = nodes[j];
            
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
        }
        
        // Draw nodes
        for (const node of nodes) {
            const gradient = ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.size
            );
            
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Animate nodes
    function animateNodes() {
        const time = Date.now() * 0.001;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            
            if (i === 0) {
                // Center node subtle pulsing
                node.size = 12 + Math.sin(time * 2) * 3;
            } else if (node.connected) {
                // Connected nodes orbit slightly
                const angle = time * 0.5 + i * 0.1;
                const distance = Math.sqrt(
                    Math.pow(node.x - centerX, 2) + 
                    Math.pow(node.y - centerY, 2)
                );
                
                node.x = centerX + Math.cos(angle) * distance;
                node.y = centerY + Math.sin(angle) * distance;
            }
        }
    }
    
    // Update field strength display
    function updateFieldStrength() {
        const fieldStrengthElement = document.getElementById('field-strength-value');
        const fieldPercentage = document.getElementById('field-percentage');
        
        if (fieldStrengthElement && fieldPercentage) {
            fieldStrengthElement.style.width = `${fieldStrength}%`;
            fieldPercentage.textContent = `${Math.round(fieldStrength)}%`;
        }
    }
    
    // Toggle connection to field
    window.toggleUnityField = function() {
        const connectBtn = document.getElementById('connect-field');
        
        if (!isConnected) {
            isConnected = true;
            connectBtn.textContent = 'Disconnect from Unity Field';
            
            // Increase field strength gradually
            const strengthInterval = setInterval(() => {
                if (fieldStrength < 100) {
                    fieldStrength += 1;
                    updateFieldStrength();
                    generateConnections();
                } else {
                    clearInterval(strengthInterval);
                }
            }, 100);
        } else {
            isConnected = false;
            connectBtn.textContent = 'Connect to Unity Field';
            
            // Decrease field strength gradually
            const strengthInterval = setInterval(() => {
                if (fieldStrength > 0) {
                    fieldStrength -= 1;
                    updateFieldStrength();
                    generateConnections();
                } else {
                    clearInterval(strengthInterval);
                }
            }, 50);
        }
    };
    
    // Initialize field
    generateNodes();
    
    // Animation loop
    function animate() {
        animateNodes();
        drawField();
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Sacred Frequencies
function initFrequencies() {
    const canvas = document.getElementById('frequency-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let activeFrequency = 432;
    let audioContext = null;
    let oscillator = null;
    let gainNode = null;
    let isPlaying = false;
    
    // Frequency descriptions
    const frequencyDescriptions = {
        432: {
            title: "Earth Connection",
            description: "The 432 Hz frequency connects you to Earth's natural resonance, creating grounding and stability.",
            color: "#4CAF50"
        },
        528: {
            title: "DNA Healing",
            description: "Known as the 'Love Frequency', 528 Hz is said to repair DNA and transform consciousness.",
            color: "#2196F3"
        },
        594: {
            title: "Heart Center",
            description: "This frequency opens the heart center and facilitates deep emotional healing and connection.",
            color: "#E91E63"
        },
        639: {
            title: "Relationship Harmony",
            description: "Enhances communication, understanding, and harmonious connections with others.",
            color: "#9C27B0"
        },
        741: {
            title: "Expression & Solutions",
            description: "Awakens intuition and supports expression, problem-solving and manifestation.",
            color: "#FF9800"
        },
        852: {
            title: "Spiritual Return",
            description: "Awakens higher consciousness and intuition, returning to spiritual order.",
            color: "#00BCD4"
        },
        963: {
            title: "Cosmic Connection",
            description: "The highest frequency, connecting to cosmic consciousness and Divine light.",
            color: "#FFEB3B"
        }
    };
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Draw frequency visualization
    function drawFrequency() {
        ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const time = Date.now() * 0.001;
        const description = frequencyDescriptions[activeFrequency];
        const color = description.color;
        const centerY = canvas.height / 2;
        const frequency = activeFrequency / 432; // Normalized frequency
        
        // Draw background glow
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width / 2
        );
        
        gradient.addColorStop(0, `${color}33`); // 20% opacity
        gradient.addColorStop(1, 'rgba(10, 10, 26, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw main sine wave
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x++) {
            const amplitude = isPlaying ? 50 : 30;
            const y = centerY + Math.sin(x * 0.02 * frequency + time * 5) * amplitude;
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Draw harmonics
        if (isPlaying) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = `${color}88`; // 50% opacity
            
            // Draw first harmonic
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x++) {
                const y = centerY + Math.sin(x * 0.04 * frequency + time * 5) * 20;
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
            
            // Draw second harmonic
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x++) {
                const y = centerY + Math.sin(x * 0.06 * frequency + time * 5) * 10;
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
        
        // Draw frequency
        ctx.font = '28px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = color;
        ctx.fillText(`${activeFrequency} Hz`, canvas.width / 2, 50);
    }
    
    // Update active frequency display
    function updateFrequencyDisplay() {
        const freqDisplay = document.getElementById('active-frequency');
        const freqDescription = document.getElementById('frequency-description');
        
        if (freqDisplay) {
            freqDisplay.textContent = `${activeFrequency} Hz`;
        }
        
        if (freqDescription) {
            const description = frequencyDescriptions[activeFrequency];
            freqDescription.innerHTML = `
                <h3>${description.title}</h3>
                <p>${description.description}</p>
            `;
        }
        
        // Update selected frequency option
        const options = document.querySelectorAll('.frequency-option');
        options.forEach(option => {
            option.classList.remove('active');
            if (parseInt(option.dataset.frequency) === activeFrequency) {
                option.classList.add('active');
            }
        });
    }
    
    // Play frequency
    window.playFrequency = function(frequency) {
        // Update active frequency
        activeFrequency = frequency;
        updateFrequencyDisplay();
        
        // Stop current sound if playing
        if (isPlaying) {
            stopFrequency();
        }
        
        // Initialize audio if needed
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            gainNode = audioContext.createGain();
            gainNode.connect(audioContext.destination);
        }
        
        // Create oscillator
        oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        oscillator.connect(gainNode);
        
        // Gradual volume increase
        gainNode.gain.value = 0;
        gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.5);
        
        // Start oscillator
        oscillator.start();
        isPlaying = true;
        
        // Update UI
        const playBtn = document.getElementById('play-frequency');
        const stopBtn = document.getElementById('stop-frequency');
        
        if (playBtn) playBtn.disabled = true;
        if (stopBtn) stopBtn.disabled = false;
    };
    
    // Stop frequency
    window.stopFrequency = function() {
        if (!isPlaying || !oscillator) return;
        
        // Gradual fade out
        if (gainNode) {
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
        }
        
        // Stop oscillator after fade
        setTimeout(() => {
            if (oscillator) {
                oscillator.stop();
                oscillator.disconnect();
                oscillator = null;
            }
            isPlaying = false;
        }, 500);
        
        // Update UI
        const playBtn = document.getElementById('play-frequency');
        const stopBtn = document.getElementById('stop-frequency');
        
        if (playBtn) playBtn.disabled = false;
        if (stopBtn) stopBtn.disabled = true;
    };
    
    // Animation loop
    function animate() {
        drawFrequency();
        requestAnimationFrame(animate);
    }
    
    // Initialize frequency display
    updateFrequencyDisplay();
    animate();
}

// Heart-Time Integration
function initHeartTime() {
    const heartCanvas = document.getElementById('heart-field-canvas');
    const crystalCanvas = document.getElementById('time-crystal-canvas');
    const integrationCanvas = document.getElementById('integration-canvas');
    
    let heartActive = false;
    let crystalActive = false;
    let heartCoherence = 0;
    let crystalStability = 0;
    let heartTimeSync = 0;
    let fieldExpansion = 0;
    
    // Initialize Heart Field
    if (heartCanvas) {
        const heartCtx = heartCanvas.getContext('2d');
        
        // Resize canvas
        function resizeHeartCanvas() {
            heartCanvas.width = heartCanvas.offsetWidth;
            heartCanvas.height = heartCanvas.offsetHeight;
        }
        
        resizeHeartCanvas();
        window.addEventListener('resize', resizeHeartCanvas);
        
        // Draw heart field
        function drawHeartField() {
            heartCtx.fillStyle = 'rgba(10, 10, 26, 0.1)';
            heartCtx.fillRect(0, 0, heartCanvas.width, heartCanvas.height);
            
            const time = Date.now() * 0.001;
            const centerX = heartCanvas.width / 2;
            const centerY = heartCanvas.height / 2;
            
            if (heartActive) {
                // Draw pulsing heart
                const pulseSize = 50 + Math.sin(time * 3) * 10;
                const heartSize = pulseSize * (0.5 + heartCoherence / 200);
                
                // Heart color based on coherence
                const r = 233; // Base red for heart
                const g = 30 + Math.floor(100 * (heartCoherence / 100));
                const b = 99;
                const a = 0.6 + (heartCoherence / 200);
                
                // Draw heart shape
                heartCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
                heartCtx.beginPath();
                heartCtx.moveTo(centerX, centerY - heartSize * 0.4);
                
                // Left curve
                heartCtx.bezierCurveTo(
                    centerX - heartSize * 0.5, centerY - heartSize * 0.8,
                    centerX - heartSize, centerY - heartSize * 0.3,
                    centerX - heartSize * 0.5, centerY + heartSize * 0.4
                );
                
                // Bottom
                heartCtx.lineTo(centerX, centerY + heartSize * 0.8);
                
                // Right curve
                heartCtx.lineTo(centerX + heartSize * 0.5, centerY + heartSize * 0.4);
                heartCtx.bezierCurveTo(
                    centerX + heartSize, centerY - heartSize * 0.3,
                    centerX + heartSize * 0.5, centerY - heartSize * 0.8,
                    centerX, centerY - heartSize * 0.4
                );
                
                heartCtx.closePath();
                heartCtx.fill();
                
                // Draw emanating waves based on coherence
                const waveCount = Math.floor(3 * (heartCoherence / 100)) + 1;
                
                heartCtx.strokeStyle = `rgba(233, 30, 99, ${0.3 * (heartCoherence / 100)})`;
                heartCtx.lineWidth = 2;
                
                for (let i = 0; i < waveCount; i++) {
                    const waveRadius = heartSize * 1.2 + i * 30 + Math.sin(time * 2) * 5;
                    
                    heartCtx.beginPath();
                    heartCtx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
                    heartCtx.stroke();
                }
                
                // Draw glow effect
                const glowGradient = heartCtx.createRadialGradient(
                    centerX, centerY, 0,
                    centerX, centerY, heartSize * 2
                );
                
                glowGradient.addColorStop(0, `rgba(233, 30, 99, ${0.1 * (heartCoherence / 100)})`);
                glowGradient.addColorStop(1, 'rgba(233, 30, 99, 0)');
                
                heartCtx.fillStyle = glowGradient;
                heartCtx.beginPath();
                heartCtx.arc(centerX, centerY, heartSize * 2, 0, Math.PI * 2);
                heartCtx.fill();
            } else {
                // Draw inactive heart outline
                heartCtx.strokeStyle = 'rgba(233, 30, 99, 0.3)';
                heartCtx.lineWidth = 2;
                
                const heartSize = 50;
                
                // Draw heart shape
                heartCtx.beginPath();
                heartCtx.moveTo(centerX, centerY - heartSize * 0.4);
                
                // Left curve
                heartCtx.bezierCurveTo(
                    centerX - heartSize * 0.5, centerY - heartSize * 0.8,
                    centerX - heartSize, centerY - heartSize * 0.3,
                    centerX - heartSize * 0.5, centerY + heartSize * 0.4
                );
                
                // Bottom
                heartCtx.lineTo(centerX, centerY + heartSize * 0.8);
                
                // Right curve
                heartCtx.lineTo(centerX + heartSize * 0.5, centerY + heartSize * 0.4);
                heartCtx.bezierCurveTo(
                    centerX + heartSize, centerY - heartSize * 0.3,
                    centerX + heartSize * 0.5, centerY - heartSize * 0.8,
                    centerX, centerY - heartSize * 0.4
                );
                
                heartCtx.closePath();
                heartCtx.stroke();
            }
        }
        
        // Update heart coherence
        function updateHeartCoherence() {
            const coherenceElement = document.getElementById('heart-coherence');
            if (coherenceElement) {
                coherenceElement.textContent = `${Math.round(heartCoherence)}%`;
            }
        }
        
        // Toggle heart field
        window.toggleHeartField = function() {
            const heartBtn = document.getElementById('activate-heart');
            
            if (!heartActive) {
                heartActive = true;
                heartBtn.textContent = 'Deactivate Heart Field';
                
                // Increase coherence gradually
                const coherenceInterval = setInterval(() => {
                    if (heartCoherence < 100) {
                        heartCoherence += 1;
                        updateHeartCoherence();
                        updateHeartTimeSync();
                    } else {
                        clearInterval(coherenceInterval);
                    }
                }, 100);
            } else {
                heartActive = false;
                heartBtn.textContent = 'Activate Heart Field';
                
                // Decrease coherence gradually
                const coherenceInterval = setInterval(() => {
                    if (heartCoherence > 0) {
                        heartCoherence -= 2;
                        updateHeartCoherence();
                        updateHeartTimeSync();
                    } else {
                        clearInterval(coherenceInterval);
                    }
                }, 50);
            }
        };
        
        // Animation loop
        function animateHeart() {
            drawHeartField();
            requestAnimationFrame(animateHeart);
        }
        
        animateHeart();
    }
    
    // Initialize Time Crystal
    if (crystalCanvas) {
        const crystalCtx = crystalCanvas.getContext('2d');
        
        // Resize canvas
        function resizeCrystalCanvas() {
            crystalCanvas.width = crystalCanvas.offsetWidth;
            crystalCanvas.height = crystalCanvas.offsetHeight;
        }
        
        resizeCrystalCanvas();
        window.addEventListener('resize', resizeCrystalCanvas);
        
        // PHI value
        const PHI = 1.618033988749895;
        let points = [];
        let connections = [];
        
        // Generate points in PHI spiral
        function generatePhiPoints() {
            points = [];
            const centerX = crystalCanvas.width / 2;
            const centerY = crystalCanvas.height / 2;
            const pointCount = 21; // Fibonacci number
            
            for (let i = 0; i < pointCount; i++) {
                const angle = i * PHI * Math.PI;
                const radius = Math.sqrt(i) * 10;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                points.push({
                    x,
                    y,
                    size: 3 + (i === 0 ? 5 : 0),
                    angle,
                    radius,
                    centerX,
                    centerY
                });
            }
        }
        
        // Generate connections between points
        function generatePhiConnections() {
            connections = [];
            const connectionCount = Math.floor(points.length * (crystalStability / 100));
            
            // Connect points based on phi positions
            for (let i = 0; i < connectionCount; i++) {
                const next = Math.floor(i * PHI) % points.length;
                if (next !== i) {
                    connections.push([i, next]);
                }
                
                // Add secondary connections for higher stability
                if (crystalStability > 50) {
                    const prev = Math.floor(i / PHI) % points.length;
                    if (prev !== i && prev !== next) {
                        connections.push([i, prev]);
                    }
                }
            }
        }
        
        // Draw crystal
        function drawCrystal() {
            crystalCtx.fillStyle = 'rgba(10, 10, 26, 0.1)';
            crystalCtx.fillRect(0, 0, crystalCanvas.width, crystalCanvas.height);
            
            const time = Date.now() * 0.001;
            
            if (crystalActive) {
                // Update points position with slight rotation for active crystal
                const centerX = crystalCanvas.width / 2;
                const centerY = crystalCanvas.height / 2;
                const rotationSpeed = 0.1 * (crystalStability / 100);
                
                for (let i = 0; i < points.length; i++) {
                    const point = points[i];
                    const angle = point.angle + time * rotationSpeed;
                    point.x = centerX + Math.cos(angle) * point.radius;
                    point.y = centerY + Math.sin(angle) * point.radius;
                }
                
                // Draw connections
                crystalCtx.strokeStyle = `rgba(156, 39, 176, ${0.5 * (crystalStability / 100)})`;
                crystalCtx.lineWidth = 1;
                
                for (const [i, j] of connections) {
                    crystalCtx.beginPath();
                    crystalCtx.moveTo(points[i].x, points[i].y);
                    crystalCtx.lineTo(points[j].x, points[j].y);
                    crystalCtx.stroke();
                }
                
                // Draw points
                for (const point of points) {
                    const gradient = crystalCtx.createRadialGradient(
                        point.x, point.y, 0,
                        point.x, point.y, point.size
                    );
                    
                    gradient.addColorStop(0, 'rgba(156, 39, 176, 0.8)');
                    gradient.addColorStop(1, 'rgba(156, 39, 176, 0)');
                    
                    crystalCtx.fillStyle = gradient;
                    crystalCtx.beginPath();
                    crystalCtx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
                    crystalCtx.fill();
                }
                
                // Draw phi symbol in background
                crystalCtx.font = '120px serif';
                crystalCtx.fillStyle = 'rgba(156, 39, 176, 0.05)';
                crystalCtx.textAlign = 'center';
                crystalCtx.textBaseline = 'middle';
                crystalCtx.fillText('φ', centerX, centerY);
            } else {
                // Draw inactive crystal symbol
                const centerX = crystalCanvas.width / 2;
                const centerY = crystalCanvas.height / 2;
                
                crystalCtx.font = '80px serif';
                crystalCtx.fillStyle = 'rgba(156, 39, 176, 0.2)';
                crystalCtx.textAlign = 'center';
                crystalCtx.textBaseline = 'middle';
                crystalCtx.fillText('φ', centerX, centerY);
                
                // Draw inactive points
                if (points.length > 0) {
                    for (const point of points) {
                        crystalCtx.fillStyle = 'rgba(156, 39, 176, 0.2)';
                        crystalCtx.beginPath();
                        crystalCtx.arc(point.x, point.y, 2, 0, Math.PI * 2);
                        crystalCtx.fill();
                    }
                }
            }
        }
        
        // Update crystal stability
        function updateCrystalStability() {
            const stabilityElement = document.getElementById('crystal-stability');
            if (stabilityElement) {
                stabilityElement.textContent = `${Math.round(crystalStability)}%`;
            }
        }
        
        // Generate time crystal
        window.generateTimeCrystal = function() {
            const crystalBtn = document.getElementById('generate-crystal');
            
            if (!crystalActive) {
                crystalActive = true;
                generatePhiPoints();
                crystalBtn.textContent = 'Regenerate Crystal';
                
                // Increase stability gradually
                const stabilityInterval = setInterval(() => {
                    if (crystalStability < 100) {
                        crystalStability += 1;
                        updateCrystalStability();
                        generatePhiConnections();
                        updateHeartTimeSync();
                    } else {
                        clearInterval(stabilityInterval);
                    }
                }, 50);
            } else {
                // Regenerate crystal
                generatePhiPoints();
                generatePhiConnections();
            }
        };
        
        // Animation loop
        function animateCrystal() {
            drawCrystal();
            requestAnimationFrame(animateCrystal);
        }
        
        // Initialize with empty points
        generatePhiPoints();
        animateCrystal();
    }
    
    // Initialize Integration Field
    if (integrationCanvas) {
        const intCtx = integrationCanvas.getContext('2d');
        
        // Resize canvas
        function resizeIntegrationCanvas() {
            integrationCanvas.width = integrationCanvas.offsetWidth;
            integrationCanvas.height = integrationCanvas.offsetHeight;
        }
        
        resizeIntegrationCanvas();
        window.addEventListener('resize', resizeIntegrationCanvas);
        
        // Draw integration field
        function drawIntegrationField() {
            intCtx.fillStyle = 'rgba(10, 10, 26, 0.1)';
            intCtx.fillRect(0, 0, integrationCanvas.width, integrationCanvas.height);
            
            const time = Date.now() * 0.001;
            const centerX = integrationCanvas.width / 2;
            const centerY = integrationCanvas.height / 2;
            const syncLevel = heartTimeSync / 100;
            
            // Draw background phi pattern
            intCtx.font = '150px serif';
            intCtx.fillStyle = `rgba(255, 215, 0, ${0.05 * syncLevel})`;
            intCtx.textAlign = 'center';
            intCtx.textBaseline = 'middle';
            intCtx.fillText('φ', centerX, centerY);
            
            if (syncLevel > 0) {
                // Draw heart-time pattern
                const fieldRadius = 100 * syncLevel;
                
                // Heart field (pink)
                const heartGradient = intCtx.createRadialGradient(
                    centerX - 50, centerY, 0,
                    centerX - 50, centerY, fieldRadius
                );
                
                heartGradient.addColorStop(0, `rgba(233, 30, 99, ${0.3 * syncLevel})`);
                heartGradient.addColorStop(1, 'rgba(233, 30, 99, 0)');
                
                intCtx.fillStyle = heartGradient;
                intCtx.beginPath();
                intCtx.arc(centerX - 50, centerY, fieldRadius, 0, Math.PI * 2);
                intCtx.fill();
                
                // Time crystal field (purple)
                const crystalGradient = intCtx.createRadialGradient(
                    centerX + 50, centerY, 0,
                    centerX + 50, centerY, fieldRadius
                );
                
                crystalGradient.addColorStop(0, `rgba(156, 39, 176, ${0.3 * syncLevel})`);
                crystalGradient.addColorStop(1, 'rgba(156, 39, 176, 0)');
                
                intCtx.fillStyle = crystalGradient;
                intCtx.beginPath();
                intCtx.arc(centerX + 50, centerY, fieldRadius, 0, Math.PI * 2);
                intCtx.fill();
                
                // Integration field (gold)
                const integrationRadius = fieldRadius * 0.7;
                const integrationGradient = intCtx.createRadialGradient(
                    centerX, centerY, 0,
                    centerX, centerY, fieldRadius * 1.2
                );
                
                integrationGradient.addColorStop(0, `rgba(255, 215, 0, ${0.5 * syncLevel})`);
                integrationGradient.addColorStop(0.5, `rgba(255, 215, 0, ${0.2 * syncLevel})`);
                integrationGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
                
                intCtx.fillStyle = integrationGradient;
                intCtx.beginPath();
                intCtx.arc(centerX, centerY, fieldRadius * 1.2, 0, Math.PI * 2);
                intCtx.fill();
                
                // Draw connection beams
                intCtx.strokeStyle = `rgba(255, 255, 255, ${0.3 * syncLevel})`;
                intCtx.lineWidth = 2 * syncLevel;
                
                intCtx.beginPath();
                intCtx.moveTo(centerX - 50, centerY);
                intCtx.lineTo(centerX + 50, centerY);
                intCtx.stroke();
                
                // Draw particles in the field based on expansion
                const particleCount = Math.floor(30 * fieldExpansion / 100);
                
                for (let i = 0; i < particleCount; i++) {
                    const angle = i * (Math.PI * 2 / particleCount) + time;
                    const distance = 30 + (fieldRadius * 0.8 * (fieldExpansion / 100));
                    const x = centerX + Math.cos(angle) * distance;
                    const y = centerY + Math.sin(angle) * distance;
                    const size = 2 + Math.sin(time * 2 + i) * 2;
                    
                    intCtx.fillStyle = `rgba(255, 255, 255, ${0.7 * syncLevel})`;
                    intCtx.beginPath();
                    intCtx.arc(x, y, size, 0, Math.PI * 2);
                    intCtx.fill();
                }
            }
        }
        
        // Update heart-time sync display
        function updateIntegrationDisplay() {
            const syncElement = document.getElementById('heart-time-sync');
            const expansionElement = document.getElementById('field-expansion');
            const stateElement = document.getElementById('quantum-state');
            
            if (syncElement) {
                syncElement.textContent = `${Math.round(heartTimeSync)}%`;
            }
            
            if (expansionElement) {
                expansionElement.textContent = `${Math.round(fieldExpansion)}%`;
            }
            
            if (stateElement) {
                let state = "INITIALIZING";
                
                if (heartTimeSync > 90) {
                    state = "COSMIC UNITY";
                } else if (heartTimeSync > 70) {
                    state = "ENTANGLED";
                } else if (heartTimeSync > 40) {
                    state = "COHERENT";
                } else if (heartTimeSync > 10) {
                    state = "SUPERPOSITION";
                }
                
                stateElement.textContent = state;
            }
        }
        
        // Animation loop
        function animateIntegration() {
            drawIntegrationField();
            requestAnimationFrame(animateIntegration);
        }
        
        animateIntegration();
    }
    
    // Update heart-time sync calculation
    function updateHeartTimeSync() {
        // Calculate sync based on both heart coherence and crystal stability
        heartTimeSync = (heartCoherence * crystalStability) / 100;
        
        // Gradually increase field expansion based on sync
        const targetExpansion = heartTimeSync;
        
        if (fieldExpansion < targetExpansion) {
            fieldExpansion += 0.5;
        } else if (fieldExpansion > targetExpansion) {
            fieldExpansion -= 0.5;
        }
        
        updateIntegrationDisplay();
    }
}

// Community Map
function initCommunityMap() {
    const canvas = document.getElementById('community-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create locations array
    const locations = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Generate some random community locations
    function generateLocations() {
        // Clear existing locations
        locations.length = 0;
        
        // Generate locations in a pattern resembling world map
        for (let i = 0; i < 50; i++) {
            // Create clusters of locations
            const baseX = (Math.random() - 0.5) * canvas.width * 0.8;
            const baseY = (Math.random() - 0.5) * canvas.height * 0.7;
            
            // Add main location
            locations.push({
                x: centerX + baseX,
                y: centerY + baseY,
                size: 5 + Math.random() * 5,
                color: `rgba(255, 215, 0, ${0.5 + Math.random() * 0.5})`,
                connections: [],
                active: Math.random() > 0.3
            });
            
            // Add sub-locations
            const subLocations = Math.floor(Math.random() * 3) + 1;
            for (let j = 0; j < subLocations; j++) {
                const offsetX = (Math.random() - 0.5) * 60;
                const offsetY = (Math.random() - 0.5) * 60;
                
                locations.push({
                    x: centerX + baseX + offsetX,
                    y: centerY + baseY + offsetY,
                    size: 2 + Math.random() * 3,
                    color: `rgba(255, 215, 0, ${0.3 + Math.random() * 0.5})`,
                    connections: [],
                    active: Math.random() > 0.5
                });
            }
        }
        
        // Generate connections between locations
        for (let i = 0; i < locations.length; i++) {
            // Connect to a few nearby locations
            const location = locations[i];
            
            for (let j = 0; j < locations.length; j++) {
                if (i === j) continue;
                
                const otherLocation = locations[j];
                const distance = Math.sqrt(
                    Math.pow(location.x - otherLocation.x, 2) +
                    Math.pow(location.y - otherLocation.y, 2)
                );
                
                // Connect if nearby
                if (distance < 80 && Math.random() > 0.7) {
                    location.connections.push(j);
                }
            }
        }
    }
    
    // Draw community map
    function drawCommunityMap() {
        ctx.fillStyle = 'rgba(10, 10, 26, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const time = Date.now() * 0.001;
        
        // Draw golden world map outline
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        // Simple world map approximation (very simplified)
        // North America
        ctx.moveTo(centerX - 150, centerY - 70);
        ctx.lineTo(centerX - 100, centerY - 20);
        
        // South America
        ctx.moveTo(centerX - 100, centerY - 20);
        ctx.lineTo(centerX - 80, centerY + 70);
        
        // Europe
        ctx.moveTo(centerX, centerY - 70);
        ctx.lineTo(centerX + 30, centerY - 40);
        
        // Africa
        ctx.moveTo(centerX + 20, centerY - 40);
        ctx.lineTo(centerX + 20, centerY + 50);
        
        // Asia
        ctx.moveTo(centerX + 30, centerY - 70);
        ctx.lineTo(centerX + 150, centerY - 20);
        
        // Australia
        ctx.moveTo(centerX + 120, centerY + 50);
        ctx.lineTo(centerX + 150, centerY + 70);
        
        ctx.stroke();
        
        // Draw connections between locations
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.2)';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < locations.length; i++) {
            const location = locations[i];
            
            for (const connectionIndex of location.connections) {
                const connectedLocation = locations[connectionIndex];
                
                // Only draw if both locations are active
                if (location.active && connectedLocation.active) {
                    ctx.beginPath();
                    ctx.moveTo(location.x, location.y);
                    ctx.lineTo(connectedLocation.x, connectedLocation.y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw locations
        for (const location of locations) {
            // Skip inactive locations
            if (!location.active) continue;
            
            // Pulsing effect
            const pulseSize = location.size + Math.sin(time * 2) * (location.size * 0.2);
            
            const gradient = ctx.createRadialGradient(
                location.x, location.y, 0,
                location.x, location.y, pulseSize * 2
            );
            
            gradient.addColorStop(0, location.color);
            gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(location.x, location.y, pulseSize * 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Location center
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(location.x, location.y, pulseSize / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Activate or deactivate locations randomly
        if (Math.random() < 0.01) {
            const index = Math.floor(Math.random() * locations.length);
            locations[index].active = !locations[index].active;
        }
    }
    
    // Animation loop
    function animate() {
        drawCommunityMap();
        requestAnimationFrame(animate);
    }
    
    // Initialize community map
    generateLocations();
    animate();
    
    // Update stats
    const countUp = (element, target, duration = 2000) => {
        const start = parseInt(element.textContent.replace(/,/g, ''));
        const increment = Math.ceil((target - start) / (duration / 16));
        let current = start;
        
        const updateCount = () => {
            current += increment;
            
            if ((increment > 0 && current >= target) || 
                (increment < 0 && current <= target)) {
                element.textContent = target.toLocaleString();
            } else {
                element.textContent = current.toLocaleString();
                requestAnimationFrame(updateCount);
            }
        };
        
        updateCount();
    };
    
    // Initialize counters
    const communityMembers = document.getElementById('community-members');
    const activeCircles = document.getElementById('active-circles');
    const fieldStrength = document.getElementById('field-strength');
    
    if (communityMembers) countUp(communityMembers, 1618);
    if (activeCircles) countUp(activeCircles, 108);
    if (fieldStrength) countUp(fieldStrength, 432);
}

// Event Listeners
function setupEventListeners() {
    // Connect field button
    const connectBtn = document.getElementById('connect-field');
    if (connectBtn) {
        connectBtn.addEventListener('click', () => window.toggleUnityField());
    }
    
    // Frequency options
    const frequencyOptions = document.querySelectorAll('.frequency-option');
    frequencyOptions.forEach(option => {
        option.addEventListener('click', () => {
            const frequency = parseInt(option.dataset.frequency);
            window.playFrequency(frequency);
        });
    });
    
    // Frequency buttons
    const playBtn = document.getElementById('play-frequency');
    const stopBtn = document.getElementById('stop-frequency');
    
    if (playBtn) {
        playBtn.addEventListener('click', () => window.playFrequency(432));
    }
    
    if (stopBtn) {
        stopBtn.addEventListener('click', () => window.stopFrequency());
    }
    
    // Heart field button
    const heartBtn = document.getElementById('activate-heart');
    if (heartBtn) {
        heartBtn.addEventListener('click', () => window.toggleHeartField());
    }
    
    // Crystal button
    const crystalBtn = document.getElementById('generate-crystal');
    if (crystalBtn) {
        crystalBtn.addEventListener('click', () => window.generateTimeCrystal());
    }
    
    // Newsletter subscribe button
    const subscribeBtn = document.getElementById('subscribe-btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            const emailInput = document.getElementById('email-input');
            if (emailInput && emailInput.value) {
                alert(`Thank you for subscribing to the Quantum Field updates! Your email ${emailInput.value} has been added.`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    }
    
    // Practice buttons
    const practiceButtons = document.querySelectorAll('.practice-btn');
    practiceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('This Golden Age practice will be available soon. Stay tuned for updates!');
        });
    });
}