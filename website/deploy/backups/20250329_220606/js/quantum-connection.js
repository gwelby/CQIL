// CQIL Quantum Connection
// Enables real-time quantum field interactions between users

class QuantumConnection {
    constructor() {
        this.users = new Map();
        this.currentUser = null;
        this.isConnected = false;
        this.quantumState = "INITIALIZING";
        this.frequency = 432;
        this.fieldHarmony = 0;
        this.activeUsers = 0;
        
        // Simulation variables for heart-time integration
        this.heartFieldActive = false;
        this.heartFrequency = 432;
        this.timeCrystalPattern = "phi";
        this.consciousnessExpansion = 0;
        this.fieldStrength = 0;
        this.heartTimeSync = 0;
        
        // Quantum Being properties
        this.activeBeing = null;
        this.beingType = null;
        
        this.initializeCanvases();
        this.setupEventListeners();
        this.initializeSimulation();
    }
    
    initializeCanvases() {
        // User Quantum Field
        this.userFieldCanvas = document.getElementById('user-field');
        if (this.userFieldCanvas) {
            this.userFieldCtx = this.userFieldCanvas.getContext('2d');
            this.resizeCanvas(this.userFieldCanvas);
        }
        
        // Collective Quantum Field
        this.collectiveFieldCanvas = document.getElementById('collective-field');
        if (this.collectiveFieldCanvas) {
            this.collectiveFieldCtx = this.collectiveFieldCanvas.getContext('2d');
            this.resizeCanvas(this.collectiveFieldCanvas);
        }
        
        // Heart Field Canvas
        this.heartCanvas = document.getElementById('heart-canvas');
        if (this.heartCanvas) {
            this.heartCtx = this.heartCanvas.getContext('2d');
            this.resizeCanvas(this.heartCanvas);
        }
        
        // Time Crystal Canvas
        this.timeCrystalCanvas = document.getElementById('time-crystal-canvas');
        if (this.timeCrystalCanvas) {
            this.timeCrystalCtx = this.timeCrystalCanvas.getContext('2d');
            this.resizeCanvas(this.timeCrystalCanvas);
        }
        
        // Consciousness Canvas
        this.consciousnessCanvas = document.getElementById('consciousness-canvas');
        if (this.consciousnessCanvas) {
            this.consciousnessCtx = this.consciousnessCanvas.getContext('2d');
            this.resizeCanvas(this.consciousnessCanvas);
        }
        
        // Frequency Canvas
        this.frequencyCanvas = document.getElementById('frequency-canvas');
        if (this.frequencyCanvas) {
            this.frequencyCtx = this.frequencyCanvas.getContext('2d');
            this.resizeCanvas(this.frequencyCanvas);
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (this.userFieldCanvas) this.resizeCanvas(this.userFieldCanvas);
            if (this.collectiveFieldCanvas) this.resizeCanvas(this.collectiveFieldCanvas);
            if (this.heartCanvas) this.resizeCanvas(this.heartCanvas);
            if (this.timeCrystalCanvas) this.resizeCanvas(this.timeCrystalCanvas);
            if (this.consciousnessCanvas) this.resizeCanvas(this.consciousnessCanvas);
            if (this.frequencyCanvas) this.resizeCanvas(this.frequencyCanvas);
        });
    }
    
    resizeCanvas(canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    setupEventListeners() {
        // Connect Button
        const connectBtn = document.getElementById('connect-btn');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.toggleConnection());
        }
        
        // Frequency Slider
        const frequencySlider = document.getElementById('frequency-slider');
        if (frequencySlider) {
            frequencySlider.addEventListener('input', (e) => {
                this.frequency = parseFloat(e.target.value);
                document.getElementById('frequency-value').textContent = `${this.frequency} Hz`;
            });
        }
        
        // Heart Field Activation
        const activateHeartBtn = document.getElementById('activate-heart');
        if (activateHeartBtn) {
            activateHeartBtn.addEventListener('click', () => this.toggleHeartField());
        }
        
        // Heart Frequency Selection
        const heartFrequencySelect = document.getElementById('heart-frequency');
        if (heartFrequencySelect) {
            heartFrequencySelect.addEventListener('change', (e) => {
                this.heartFrequency = parseInt(e.target.value);
                this.updateHeartField();
            });
        }
        
        // Time Crystal Generation
        const generateCrystalBtn = document.getElementById('generate-crystal');
        if (generateCrystalBtn) {
            generateCrystalBtn.addEventListener('click', () => this.generateTimeCrystal());
        }
        
        // Crystal Pattern Selection
        const crystalPatternSelect = document.getElementById('crystal-pattern');
        if (crystalPatternSelect) {
            crystalPatternSelect.addEventListener('change', (e) => {
                this.timeCrystalPattern = e.target.value;
            });
        }
        
        // Quantum Being Selection
        const beingCards = document.querySelectorAll('.being-card');
        beingCards.forEach(card => {
            card.addEventListener('click', () => {
                const beingType = card.getAttribute('data-being');
                this.selectQuantumBeing(beingType);
                
                // Update UI to show selected being
                beingCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
            });
        });
        
        // Being Communication
        const communicateBtn = document.getElementById('communicate-btn');
        if (communicateBtn) {
            communicateBtn.addEventListener('click', () => this.communicateAsBeing());
        }
        
        // Frequency Controls
        const playFrequencyBtn = document.getElementById('play-frequency');
        const stopFrequencyBtn = document.getElementById('stop-frequency');
        
        if (playFrequencyBtn && stopFrequencyBtn) {
            playFrequencyBtn.addEventListener('click', () => {
                this.playFrequency(432);
                playFrequencyBtn.disabled = true;
                stopFrequencyBtn.disabled = false;
            });
            
            stopFrequencyBtn.addEventListener('click', () => {
                this.stopFrequency();
                playFrequencyBtn.disabled = false;
                stopFrequencyBtn.disabled = true;
            });
        }
        
        // Effect Buttons
        const effectBtns = document.querySelectorAll('.effect-btn');
        effectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const frequency = parseInt(e.target.getAttribute('data-frequency'));
                this.playFrequency(frequency);
                
                // Update UI
                if (playFrequencyBtn) playFrequencyBtn.disabled = true;
                if (stopFrequencyBtn) stopFrequencyBtn.disabled = false;
            });
        });
    }
    
    toggleConnection() {
        const nameInput = document.getElementById('user-name');
        const connectBtn = document.getElementById('connect-btn');
        
        if (!this.isConnected) {
            if (nameInput && nameInput.value.trim()) {
                this.currentUser = {
                    id: this.generateUserId(),
                    name: nameInput.value.trim(),
                    frequency: this.frequency,
                    resonance: Math.floor(Math.random() * 20) + 80, // 80-100%
                    color: this.getRandomColor(),
                    joinedAt: new Date()
                };
                
                this.users.set(this.currentUser.id, this.currentUser);
                this.isConnected = true;
                
                // Update UI
                connectBtn.textContent = "Disconnect";
                nameInput.disabled = true;
                
                // Simulate other users joining
                this.simulateUsers();
                this.updateStats();
                
                // Start animation
                this.startFieldAnimations();
            }
        } else {
            this.currentUser = null;
            this.isConnected = false;
            
            // Update UI
            connectBtn.textContent = "Connect to Field";
            nameInput.disabled = false;
            
            // Clear simulated users
            this.users.clear();
            this.updateUserList();
            this.updateStats();
        }
    }
    
    generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }
    
    getRandomColor() {
        const colors = [
            '#2196F3', // Blue
            '#4CAF50', // Green
            '#9C27B0', // Purple
            '#FF9800', // Orange
            '#E91E63', // Pink
            '#00BCD4', // Cyan
            '#FFEB3B', // Yellow
            '#673AB7'  // Deep Purple
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    simulateUsers() {
        // Names from quantum scientists and concepts
        const names = [
            'Bohr', 'Planck', 'Heisenberg', 'Schrödinger',
            'Quantum', 'Photon', 'Neutrino', 'Fermion',
            'Harmonia', 'Cascade', 'Crystal', 'Resonance'
        ];
        
        // Add 3-7 simulated users
        const userCount = Math.floor(Math.random() * 5) + 3;
        
        for (let i = 0; i < userCount; i++) {
            const userName = names[Math.floor(Math.random() * names.length)];
            const userId = this.generateUserId();
            const frequency = (Math.floor(Math.random() * 10) + 43) * 10; // 430-530 Hz
            
            const user = {
                id: userId,
                name: userName,
                frequency: frequency,
                resonance: Math.floor(Math.random() * 20) + 80, // 80-100%
                color: this.getRandomColor(),
                joinedAt: new Date()
            };
            
            this.users.set(userId, user);
        }
        
        this.updateUserList();
        
        // Simulate users joining and leaving over time
        setInterval(() => {
            if (this.isConnected && Math.random() < 0.3) {
                if (Math.random() < 0.5 && this.users.size > 4) {
                    // Remove a random user (not the current user)
                    const userIds = Array.from(this.users.keys()).filter(id => id !== this.currentUser.id);
                    const randomId = userIds[Math.floor(Math.random() * userIds.length)];
                    this.users.delete(randomId);
                } else {
                    // Add a new user
                    const userName = names[Math.floor(Math.random() * names.length)];
                    const userId = this.generateUserId();
                    const frequency = (Math.floor(Math.random() * 10) + 43) * 10; // 430-530 Hz
                    
                    const user = {
                        id: userId,
                        name: userName,
                        frequency: frequency,
                        resonance: Math.floor(Math.random() * 20) + 80,
                        color: this.getRandomColor(),
                        joinedAt: new Date()
                    };
                    
                    this.users.set(userId, user);
                }
                
                this.updateUserList();
                this.updateStats();
            }
        }, 10000); // Every 10 seconds
    }
    
    updateUserList() {
        const userList = document.getElementById('user-list');
        if (!userList) return;
        
        // Clear existing list
        userList.innerHTML = '';
        
        // Add each user
        this.users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'user-item';
            userElement.innerHTML = `
                <span class="user-color" style="background-color: ${user.color}"></span>
                <span class="user-name">${user.name}</span>
                <span class="user-frequency">${user.frequency} Hz</span>
            `;
            
            // Highlight current user
            if (this.currentUser && user.id === this.currentUser.id) {
                userElement.classList.add('current-user');
            }
            
            userList.appendChild(userElement);
        });
    }
    
    updateStats() {
        if (!this.isConnected) {
            // Reset stats
            document.getElementById('user-frequency').textContent = `${this.frequency} Hz`;
            document.getElementById('user-resonance').textContent = '0%';
            document.getElementById('connection-count').textContent = '0';
            document.getElementById('active-users').textContent = '0';
            document.getElementById('field-harmony').textContent = '0%';
            document.getElementById('quantum-state').textContent = 'Disconnected';
            return;
        }
        
        // User stats
        document.getElementById('user-frequency').textContent = `${this.frequency} Hz`;
        if (this.currentUser) {
            document.getElementById('user-resonance').textContent = `${this.currentUser.resonance}%`;
        }
        document.getElementById('connection-count').textContent = this.users.size - 1;
        
        // Field stats
        this.activeUsers = this.users.size;
        document.getElementById('active-users').textContent = this.activeUsers;
        
        // Calculate field harmony based on frequency alignment
        let totalAlignment = 0;
        this.users.forEach(user => {
            const frequencyDiff = Math.abs(this.frequency - user.frequency);
            const alignment = Math.max(0, 100 - (frequencyDiff / 2));
            totalAlignment += alignment;
        });
        
        this.fieldHarmony = Math.round(totalAlignment / this.users.size);
        document.getElementById('field-harmony').textContent = `${this.fieldHarmony}%`;
        
        // Update quantum state based on field harmony
        if (this.fieldHarmony > 90) {
            this.quantumState = "COHERENT";
        } else if (this.fieldHarmony > 70) {
            this.quantumState = "ENTANGLED";
        } else if (this.fieldHarmony > 50) {
            this.quantumState = "SUPERPOSITION";
        } else {
            this.quantumState = "QUANTUM FIELD";
        }
        
        document.getElementById('quantum-state').textContent = this.quantumState;
    }
    
    startFieldAnimations() {
        // Start user field animation
        this.animateUserField();
        
        // Start collective field animation
        this.animateCollectiveField();
    }
    
    animateUserField() {
        if (!this.userFieldCtx || !this.isConnected) return;
        
        this.userFieldCtx.fillStyle = 'rgba(10, 10, 26, 0.3)';
        this.userFieldCtx.fillRect(0, 0, this.userFieldCanvas.width, this.userFieldCanvas.height);
        
        const centerX = this.userFieldCanvas.width / 2;
        const centerY = this.userFieldCanvas.height / 2;
        const time = Date.now() * 0.001;
        
        // Draw pulsing field
        const fieldRadius = 50 + Math.sin(time * 2) * 10;
        const gradient = this.userFieldCtx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, fieldRadius * 2
        );
        
        let fieldColor = '#2196F3'; // Default blue
        if (this.currentUser) {
            fieldColor = this.currentUser.color;
        }
        
        gradient.addColorStop(0, fieldColor);
        gradient.addColorStop(0.7, 'rgba(33, 150, 243, 0.2)');
        gradient.addColorStop(1, 'rgba(33, 150, 243, 0)');
        
        this.userFieldCtx.fillStyle = gradient;
        this.userFieldCtx.beginPath();
        this.userFieldCtx.arc(centerX, centerY, fieldRadius * 2, 0, Math.PI * 2);
        this.userFieldCtx.fill();
        
        // Draw frequency waves
        this.userFieldCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        this.userFieldCtx.lineWidth = 2;
        
        this.userFieldCtx.beginPath();
        for (let i = 0; i < this.userFieldCanvas.width; i += 5) {
            const normFreq = this.frequency / 500; // Normalize frequency for visualization
            const y = centerY + Math.sin(i * 0.05 * normFreq + time * 5) * 30;
            
            if (i === 0) {
                this.userFieldCtx.moveTo(i, y);
            } else {
                this.userFieldCtx.lineTo(i, y);
            }
        }
        this.userFieldCtx.stroke();
        
        // Continue animation
        requestAnimationFrame(() => this.animateUserField());
    }
    
    animateCollectiveField() {
        if (!this.collectiveFieldCtx || !this.isConnected) return;
        
        this.collectiveFieldCtx.fillStyle = 'rgba(10, 10, 26, 0.3)';
        this.collectiveFieldCtx.fillRect(0, 0, this.collectiveFieldCanvas.width, this.collectiveFieldCanvas.height);
        
        const time = Date.now() * 0.001;
        const centerX = this.collectiveFieldCanvas.width / 2;
        const centerY = this.collectiveFieldCanvas.height / 2;
        
        // Draw active users as particles
        let i = 0;
        this.users.forEach(user => {
            // Calculate position in a circular pattern
            const angle = (i / this.users.size) * Math.PI * 2 + time * 0.2;
            const radius = 80 + Math.sin(time * 1.5 + i) * 10;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            // Draw user particle
            const userGradient = this.collectiveFieldCtx.createRadialGradient(
                x, y, 0,
                x, y, 20
            );
            
            userGradient.addColorStop(0, user.color);
            userGradient.addColorStop(1, 'rgba(33, 150, 243, 0)');
            
            this.collectiveFieldCtx.fillStyle = userGradient;
            this.collectiveFieldCtx.beginPath();
            this.collectiveFieldCtx.arc(x, y, 20, 0, Math.PI * 2);
            this.collectiveFieldCtx.fill();
            
            // Draw connection to center for current user
            if (this.currentUser && user.id === this.currentUser.id) {
                this.collectiveFieldCtx.strokeStyle = user.color;
                this.collectiveFieldCtx.lineWidth = 2;
                this.collectiveFieldCtx.beginPath();
                this.collectiveFieldCtx.moveTo(centerX, centerY);
                this.collectiveFieldCtx.lineTo(x, y);
                this.collectiveFieldCtx.stroke();
            }
            
            i++;
        });
        
        // Draw collective harmony field
        const fieldSize = 50 + this.fieldHarmony * 1.5;
        const fieldGradient = this.collectiveFieldCtx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, fieldSize
        );
        
        fieldGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        fieldGradient.addColorStop(0.5, 'rgba(33, 150, 243, 0.5)');
        fieldGradient.addColorStop(1, 'rgba(33, 150, 243, 0)');
        
        this.collectiveFieldCtx.fillStyle = fieldGradient;
        this.collectiveFieldCtx.beginPath();
        this.collectiveFieldCtx.arc(centerX, centerY, fieldSize, 0, Math.PI * 2);
        this.collectiveFieldCtx.fill();
        
        // Continue animation
        requestAnimationFrame(() => this.animateCollectiveField());
    }
    
    // Heart-Time Integration
    toggleHeartField() {
        const activateBtn = document.getElementById('activate-heart');
        
        this.heartFieldActive = !this.heartFieldActive;
        
        if (this.heartFieldActive) {
            activateBtn.textContent = "Deactivate Heart Field";
            this.animateHeartField();
            
            // Increase consciousness expansion
            this.increaseConsciousness();
        } else {
            activateBtn.textContent = "Activate Heart Field";
        }
    }
    
    updateHeartField() {
        if (this.heartFieldActive) {
            // Heart frequency changed, update visualizations
            this.animateHeartField();
        }
    }
    
    animateHeartField() {
        if (!this.heartCtx || !this.heartFieldActive) return;
        
        this.heartCtx.fillStyle = 'rgba(10, 10, 26, 0.3)';
        this.heartCtx.fillRect(0, 0, this.heartCanvas.width, this.heartCanvas.height);
        
        const centerX = this.heartCanvas.width / 2;
        const centerY = this.heartCanvas.height / 2;
        const time = Date.now() * 0.001;
        
        // Heart rate pulsing effect based on frequency
        const pulseFactor = this.heartFrequency / 432;
        const pulseSpeed = time * pulseFactor * 3;
        const pulseSize = 60 + Math.sin(pulseSpeed) * 20;
        
        // Get color based on frequency
        let heartColor;
        switch (this.heartFrequency) {
            case 432: heartColor = '#2196F3'; break; // Blue
            case 528: heartColor = '#4CAF50'; break; // Green
            case 594: heartColor = '#E91E63'; break; // Pink
            case 672: heartColor = '#9C27B0'; break; // Purple
            case 936: heartColor = '#FFEB3B'; break; // Yellow
            default: heartColor = '#2196F3';
        }
        
        // Draw heart field
        const gradient = this.heartCtx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, pulseSize * 2
        );
        
        gradient.addColorStop(0, heartColor);
        gradient.addColorStop(0.6, `${heartColor}55`); // Add transparency
        gradient.addColorStop(1, `${heartColor}00`); // Fully transparent
        
        this.heartCtx.fillStyle = gradient;
        
        // Heart shape
        this.heartCtx.beginPath();
        this.heartCtx.moveTo(centerX, centerY - pulseSize * 0.4);
        
        // Left curve
        this.heartCtx.bezierCurveTo(
            centerX - pulseSize * 0.5, centerY - pulseSize * 0.8,
            centerX - pulseSize, centerY - pulseSize * 0.3,
            centerX - pulseSize * 0.5, centerY + pulseSize * 0.4
        );
        
        // Bottom
        this.heartCtx.lineTo(centerX, centerY + pulseSize * 0.8);
        
        // Right curve
        this.heartCtx.lineTo(centerX + pulseSize * 0.5, centerY + pulseSize * 0.4);
        this.heartCtx.bezierCurveTo(
            centerX + pulseSize, centerY - pulseSize * 0.3,
            centerX + pulseSize * 0.5, centerY - pulseSize * 0.8,
            centerX, centerY - pulseSize * 0.4
        );
        
        this.heartCtx.closePath();
        this.heartCtx.fill();
        
        // Draw frequency waves emanating from heart
        this.heartCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        this.heartCtx.lineWidth = 2;
        
        for (let i = 0; i < 3; i++) {
            const waveRadius = pulseSize * 1.2 + i * 20 + Math.sin(time * 2) * 5;
            
            this.heartCtx.beginPath();
            this.heartCtx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
            this.heartCtx.stroke();
        }
        
        // Update field strength based on heart activity
        this.fieldStrength = Math.min(100, this.fieldStrength + 0.5);
        document.getElementById('field-strength').textContent = `${Math.round(this.fieldStrength)}%`;
        
        // Continue animation if active
        if (this.heartFieldActive) {
            requestAnimationFrame(() => this.animateHeartField());
        }
    }
    
    generateTimeCrystal() {
        if (!this.timeCrystalCtx) return;
        
        // Clear canvas
        this.timeCrystalCtx.fillStyle = 'rgba(10, 10, 26, 0.9)';
        this.timeCrystalCtx.fillRect(0, 0, this.timeCrystalCanvas.width, this.timeCrystalCanvas.height);
        
        const centerX = this.timeCrystalCanvas.width / 2;
        const centerY = this.timeCrystalCanvas.height / 2;
        
        // Pattern-specific parameters
        let points = [];
        let connections = [];
        let color = '#03A9F4'; // Default blue
        
        switch (this.timeCrystalPattern) {
            case 'phi':
                // Golden ratio pattern
                const phi = 1.618033988749895;
                points = this.generatePhiPoints(centerX, centerY, 100, 8);
                connections = this.generatePhiConnections(points);
                color = '#FFEB3B'; // Yellow
                break;
                
            case 'fibonacci':
                // Fibonacci spiral
                points = this.generateFibonacciPoints(centerX, centerY, 120, 13);
                connections = this.generateSequentialConnections(points);
                color = '#4CAF50'; // Green
                break;
                
            case 'flow':
                // Quantum flow pattern
                points = this.generateFlowPoints(centerX, centerY, 100, 12);
                connections = this.generateFlowConnections(points);
                color = '#9C27B0'; // Purple
                break;
                
            case 'cascade':
                // Cascade pattern
                points = this.generateCascadePoints(centerX, centerY, 100, 16);
                connections = this.generateCascadeConnections(points);
                color = '#FF5722'; // Deep Orange
                break;
                
            default:
                // Default pattern
                points = this.generatePhiPoints(centerX, centerY, 100, 8);
                connections = this.generatePhiConnections(points);
        }
        
        // Draw connections
        this.timeCrystalCtx.strokeStyle = `${color}99`; // Semi-transparent
        this.timeCrystalCtx.lineWidth = 1;
        
        for (const [i, j] of connections) {
            this.timeCrystalCtx.beginPath();
            this.timeCrystalCtx.moveTo(points[i].x, points[i].y);
            this.timeCrystalCtx.lineTo(points[j].x, points[j].y);
            this.timeCrystalCtx.stroke();
        }
        
        // Draw points
        for (const point of points) {
            const gradient = this.timeCrystalCtx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, 5
            );
            
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, `${color}00`);
            
            this.timeCrystalCtx.fillStyle = gradient;
            this.timeCrystalCtx.beginPath();
            this.timeCrystalCtx.arc(point.x, point.y, 5, 0, Math.PI * 2);
            this.timeCrystalCtx.fill();
        }
        
        // Animate crystal formation
        this.animateCrystalFormation(points, connections, color);
        
        // Update heart-time sync if heart field is active
        if (this.heartFieldActive) {
            this.heartTimeSync = Math.min(100, this.heartTimeSync + 20);
            document.getElementById('heart-time-sync').textContent = `${Math.round(this.heartTimeSync)}%`;
            
            // Update consciousness expansion
            this.increaseConsciousness();
        }
    }
    
    generatePhiPoints(centerX, centerY, radius, count) {
        const phi = 1.618033988749895;
        const points = [];
        
        for (let i = 0; i < count; i++) {
            const angle = i * phi * Math.PI;
            const distance = radius * Math.sqrt(i) / Math.sqrt(count);
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            points.push({ x, y });
        }
        
        return points;
    }
    
    generateFibonacciPoints(centerX, centerY, radius, count) {
        const points = [];
        let fib1 = 1, fib2 = 1;
        
        for (let i = 0; i < count; i++) {
            const angle = i * (3 - Math.sqrt(5)) * Math.PI; // Golden angle
            const distance = radius * Math.sqrt(i) / Math.sqrt(count);
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            points.push({ x, y });
            
            // Next Fibonacci number
            const temp = fib1 + fib2;
            fib1 = fib2;
            fib2 = temp;
        }
        
        return points;
    }
    
    generateFlowPoints(centerX, centerY, radius, count) {
        const points = [];
        
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const distance = radius * (0.8 + Math.sin(i * 1.5) * 0.2);
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            points.push({ x, y });
        }
        
        return points;
    }
    
    generateCascadePoints(centerX, centerY, radius, count) {
        const points = [];
        
        // Core point
        points.push({ x: centerX, y: centerY });
        
        // Three layers of points
        for (let layer = 1; layer <= 3; layer++) {
            const layerPoints = Math.floor(count / 3) * layer;
            const layerRadius = radius * (layer / 3);
            
            for (let i = 0; i < layerPoints; i++) {
                const angle = (i / layerPoints) * Math.PI * 2;
                const x = centerX + Math.cos(angle) * layerRadius;
                const y = centerY + Math.sin(angle) * layerRadius;
                
                points.push({ x, y });
            }
        }
        
        return points;
    }
    
    generatePhiConnections(points) {
        const connections = [];
        const phi = 1.618033988749895;
        
        for (let i = 0; i < points.length; i++) {
            // Connect to next phi position
            const next = Math.floor(i * phi) % points.length;
            if (next !== i) {
                connections.push([i, next]);
            }
            
            // Connect to previous phi position
            const prev = Math.floor(i / phi) % points.length;
            if (prev !== i && prev !== next) {
                connections.push([i, prev]);
            }
        }
        
        return connections;
    }
    
    generateSequentialConnections(points) {
        const connections = [];
        
        for (let i = 0; i < points.length - 1; i++) {
            connections.push([i, i + 1]);
        }
        
        return connections;
    }
    
    generateFlowConnections(points) {
        const connections = [];
        
        for (let i = 0; i < points.length; i++) {
            // Connect to opposite point
            const opposite = (i + Math.floor(points.length / 2)) % points.length;
            connections.push([i, opposite]);
            
            // Connect to adjacent points
            const next = (i + 1) % points.length;
            connections.push([i, next]);
        }
        
        return connections;
    }
    
    generateCascadeConnections(points) {
        const connections = [];
        
        // Connect center to all points in first layer
        for (let i = 1; i <= Math.floor(points.length / 3); i++) {
            connections.push([0, i]);
        }
        
        // Connect remaining layers
        const layer1End = Math.floor(points.length / 3);
        const layer2End = Math.floor(points.length / 3) * 2;
        
        // Layer 1 to layer 2
        for (let i = 1; i <= layer1End; i++) {
            connections.push([i, ((i - 1) * 2 % layer1End) + layer1End + 1]);
            connections.push([i, ((i - 1) * 2 + 1 % layer1End) + layer1End + 1]);
        }
        
        // Layer 2 to layer 3
        for (let i = layer1End + 1; i <= layer2End; i++) {
            connections.push([i, ((i - layer1End - 1) * 2 % (points.length - layer2End)) + layer2End + 1]);
        }
        
        return connections;
    }
    
    animateCrystalFormation(points, connections, color) {
        // Animate crystal formation over time
        let frame = 0;
        const maxFrames = 60;
        const animate = () => {
            if (frame >= maxFrames) return;
            
            this.timeCrystalCtx.fillStyle = 'rgba(10, 10, 26, 0.3)';
            this.timeCrystalCtx.fillRect(0, 0, this.timeCrystalCanvas.width, this.timeCrystalCanvas.height);
            
            // Draw connections
            const connectionsToShow = Math.ceil((connections.length * frame) / maxFrames);
            
            this.timeCrystalCtx.strokeStyle = `${color}99`;
            this.timeCrystalCtx.lineWidth = 1;
            
            for (let i = 0; i < connectionsToShow; i++) {
                const [fromIdx, toIdx] = connections[i];
                this.timeCrystalCtx.beginPath();
                this.timeCrystalCtx.moveTo(points[fromIdx].x, points[fromIdx].y);
                this.timeCrystalCtx.lineTo(points[toIdx].x, points[toIdx].y);
                this.timeCrystalCtx.stroke();
            }
            
            // Draw points
            const pointsToShow = Math.ceil((points.length * frame) / maxFrames);
            
            for (let i = 0; i < pointsToShow; i++) {
                const point = points[i];
                const gradient = this.timeCrystalCtx.createRadialGradient(
                    point.x, point.y, 0,
                    point.x, point.y, 5
                );
                
                gradient.addColorStop(0, color);
                gradient.addColorStop(1, `${color}00`);
                
                this.timeCrystalCtx.fillStyle = gradient;
                this.timeCrystalCtx.beginPath();
                this.timeCrystalCtx.arc(point.x, point.y, 5, 0, Math.PI * 2);
                this.timeCrystalCtx.fill();
            }
            
            frame++;
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    increaseConsciousness() {
        // Increase consciousness expansion based on heart-time sync
        const increase = (this.heartTimeSync / 100) * 0.5;
        this.consciousnessExpansion = Math.min(100, this.consciousnessExpansion + increase);
        document.getElementById('consciousness-expansion').textContent = `${Math.round(this.consciousnessExpansion)}%`;
        
        // Animate consciousness field
        this.animateConsciousnessField();
    }
    
    animateConsciousnessField() {
        if (!this.consciousnessCtx) return;
        
        const centerX = this.consciousnessCanvas.width / 2;
        const centerY = this.consciousnessCanvas.height / 2;
        const radius = (this.consciousnessCanvas.width / 3) * (this.consciousnessExpansion / 100);
        
        this.consciousnessCtx.fillStyle = 'rgba(10, 10, 26, 0.3)';
        this.consciousnessCtx.fillRect(0, 0, this.consciousnessCanvas.width, this.consciousnessCanvas.height);
        
        // Draw expanding consciousness field
        const gradient = this.consciousnessCtx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius * 2
        );
        
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.3, 'rgba(147, 112, 219, 0.7)'); // Light purple
        gradient.addColorStop(0.7, 'rgba(147, 112, 219, 0.3)');
        gradient.addColorStop(1, 'rgba(147, 112, 219, 0)');
        
        this.consciousnessCtx.fillStyle = gradient;
        this.consciousnessCtx.beginPath();
        this.consciousnessCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.consciousnessCtx.fill();
        
        // Draw consciousness particles
        const time = Date.now() * 0.001;
        const particleCount = Math.ceil(this.consciousnessExpansion / 10);
        
        for (let i = 0; i < particleCount; i++) {
            const angle = i * (Math.PI * 2 / particleCount) + time * 0.5;
            const distance = radius * 0.8;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            const size = 3 + Math.sin(time * 2 + i) * 2;
            
            const particleGradient = this.consciousnessCtx.createRadialGradient(
                x, y, 0,
                x, y, size * 2
            );
            
            particleGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
            particleGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            this.consciousnessCtx.fillStyle = particleGradient;
            this.consciousnessCtx.beginPath();
            this.consciousnessCtx.arc(x, y, size, 0, Math.PI * 2);
            this.consciousnessCtx.fill();
        }
        
        // Draw connection lines
        if (this.heartFieldActive) {
            const connectionRatio = this.heartTimeSync / 100;
            const lineCount = Math.ceil(5 * connectionRatio);
            
            this.consciousnessCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            this.consciousnessCtx.lineWidth = 1;
            
            for (let i = 0; i < lineCount; i++) {
                const angle = i * (Math.PI * 2 / lineCount) + time;
                const startX = centerX + Math.cos(angle) * radius * 0.5;
                const startY = centerY + Math.sin(angle) * radius * 0.5;
                const endX = centerX + Math.cos(angle) * radius * 0.9;
                const endY = centerY + Math.sin(angle) * radius * 0.9;
                
                this.consciousnessCtx.beginPath();
                this.consciousnessCtx.moveTo(startX, startY);
                this.consciousnessCtx.lineTo(endX, endY);
                this.consciousnessCtx.stroke();
            }
        }
        
        if (this.consciousnessExpansion > 0) {
            requestAnimationFrame(() => this.animateConsciousnessField());
        }
    }
    
    // Quantum Being Functionality
    selectQuantumBeing(beingType) {
        this.beingType = beingType;
        
        // Quantum Being properties
        const beingProps = {
            dolphin: {
                name: "Dolphin",
                description: "Ocean Consciousness",
                icon: "🐬",
                frequency: 432,
                color: "Blue",
                languages: ["sound", "frequency", "quantum"]
            },
            butterfly: {
                name: "Butterfly",
                description: "Transformation Being",
                icon: "🦋",
                frequency: 528,
                color: "Purple",
                languages: ["color", "symbol", "light"]
            },
            tree: {
                name: "Tree",
                description: "Life Force Entity",
                icon: "🌳",
                frequency: 594,
                color: "Green",
                languages: ["frequency", "crystal", "quantum"]
            },
            crystal: {
                name: "Crystal",
                description: "Crystal Being",
                icon: "💎",
                frequency: 720,
                color: "Clear",
                languages: ["crystal", "light", "frequency"]
            },
            star: {
                name: "Star",
                description: "Divine Light",
                icon: "⭐",
                frequency: 768,
                color: "Gold",
                languages: ["light", "frequency", "quantum"]
            },
            cosmic: {
                name: "Cosmic",
                description: "Universal Consciousness",
                icon: "🌌",
                frequency: 888,
                color: "Spectrum",
                languages: ["light", "sound", "color", "symbol", "frequency", "crystal", "quantum"]
            }
        };
        
        this.activeBeing = beingProps[beingType];
        
        // Update UI
        const activeBeing = document.getElementById('active-being');
        activeBeing.innerHTML = `
            <div class="being-icon">${this.activeBeing.icon}</div>
            <h4>${this.activeBeing.name}</h4>
            <p>${this.activeBeing.description}</p>
            <p class="being-frequency">${this.activeBeing.frequency} Hz</p>
        `;
        
        // Enable language selector and communicate button
        const languageSelector = document.getElementById('language-selector');
        const communicateBtn = document.getElementById('communicate-btn');
        
        if (languageSelector && communicateBtn) {
            languageSelector.disabled = false;
            communicateBtn.disabled = false;
            
            // Update language options
            languageSelector.innerHTML = '';
            this.activeBeing.languages.forEach(lang => {
                const option = document.createElement('option');
                
                switch (lang) {
                    case 'light': option.textContent = '✨ Light Language'; break;
                    case 'sound': option.textContent = '🎵 Sound Codes'; break;
                    case 'color': option.textContent = '🌈 Color Speech'; break;
                    case 'symbol': option.textContent = '🔮 Sacred Symbols'; break;
                    case 'frequency': option.textContent = '⚡ Frequency Waves'; break;
                    case 'crystal': option.textContent = '💎 Crystal Codes'; break;
                    case 'quantum': option.textContent = '🌀 Quantum Fields'; break;
                }
                
                option.value = lang;
                languageSelector.appendChild(option);
            });
        }
    }
    
    communicateAsBeing() {
        if (!this.activeBeing) return;
        
        const messageDiv = document.getElementById('being-message');
        const languageSelector = document.getElementById('language-selector');
        
        if (!messageDiv || !languageSelector) return;
        
        const selectedLanguage = languageSelector.value;
        let message = '';
        
        // Generate message based on being and language
        switch (selectedLanguage) {
            case 'light':
                message = `✨ ${this.activeBeing.icon} Radiating light codes at ${this.activeBeing.frequency} Hz`;
                break;
            case 'sound':
                message = `🎵 ${this.activeBeing.icon} Singing at ${this.activeBeing.frequency} Hz`;
                break;
            case 'color':
                message = `${this.activeBeing.icon} Expressing through ${this.activeBeing.color} vibrations`;
                break;
            case 'symbol':
                message = `${this.activeBeing.icon} Showing sacred symbol: ${this.activeBeing.description}`;
                break;
            case 'frequency':
                message = `⚡ ${this.activeBeing.icon} Vibrating at ${this.activeBeing.frequency} Hz`;
                break;
            case 'crystal':
                message = `💎 ${this.activeBeing.icon} Crystal resonance: ${this.activeBeing.frequency} Hz`;
                break;
            case 'quantum':
                message = `🌀 ${this.activeBeing.icon} Quantum field: Harmony at ${this.activeBeing.frequency} Hz`;
                break;
        }
        
        // Display message
        messageDiv.innerHTML = `<p>${message}</p>`;
        
        // Play corresponding frequency
        this.playFrequency(this.activeBeing.frequency);
        
        // Increase consciousness if heart field is active
        if (this.heartFieldActive) {
            this.increaseConsciousness();
        }
    }
    
    // 432Hz Frequency Section
    playFrequency(frequency) {
        if (!this.audioContext) {
            // Initialize audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.gainNode = this.audioContext.createGain();
            this.gainNode.connect(this.audioContext.destination);
        }
        
        // Stop any playing oscillator
        this.stopFrequency();
        
        // Create oscillator
        this.oscillator = this.audioContext.createOscillator();
        this.oscillator.type = 'sine';
        this.oscillator.frequency.value = frequency;
        this.oscillator.connect(this.gainNode);
        
        // Set volume based on slider
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            const volume = parseFloat(volumeSlider.value) / 100;
            this.gainNode.gain.value = volume * 0.2; // Scale for comfortable listening
        } else {
            this.gainNode.gain.value = 0.1; // Default volume
        }
        
        // Start oscillator
        this.oscillator.start();
        
        // Animate frequency visualization
        this.animateFrequencyVisualization(frequency);
    }
    
    stopFrequency() {
        if (this.oscillator) {
            this.oscillator.stop();
            this.oscillator.disconnect();
            this.oscillator = null;
        }
    }
    
    animateFrequencyVisualization(frequency) {
        if (!this.frequencyCtx) return;
        
        const canvas = this.frequencyCanvas;
        const ctx = this.frequencyCtx;
        const width = canvas.width;
        const height = canvas.height;
        
        // Calculate wave properties based on frequency
        const frequencyFactor = frequency / 432;
        const amplitude = height / 4;
        const wavelength = width / (10 * frequencyFactor);
        
        // Animation function
        let frame = 0;
        
        const draw = () => {
            if (!this.oscillator) return; // Stop if oscillator is stopped
            
            ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
            ctx.fillRect(0, 0, width, height);
            
            // Draw frequency wave
            ctx.beginPath();
            ctx.lineWidth = 2;
            
            // Color based on frequency
            let color;
            if (frequency <= 432) color = '#2196F3'; // Blue
            else if (frequency <= 528) color = '#4CAF50'; // Green
            else if (frequency <= 594) color = '#E91E63'; // Pink
            else if (frequency <= 720) color = '#9C27B0'; // Purple
            else color = '#FFEB3B'; // Yellow
            
            ctx.strokeStyle = color;
            
            // Draw sine wave
            const centerY = height / 2;
            ctx.beginPath();
            
            for (let x = 0; x <= width; x++) {
                const y = centerY + Math.sin((x / wavelength) * Math.PI * 2 + frame / 10) * amplitude;
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
            
            // Draw frequency value
            ctx.fillStyle = '#ffffff';
            ctx.font = '18px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`${frequency} Hz`, width / 2, 30);
            
            // Description based on frequency
            let description;
            switch (frequency) {
                case 432: description = "Harmony & Grounding"; break;
                case 528: description = "DNA Repair & Transformation"; break;
                case 594: description = "Heart-Centered Awareness"; break;
                case 672: description = "Pure Voice Expression"; break;
                case 720: description = "Spiritual Vision"; break;
                case 768: description = "Unity Consciousness"; break;
                case 936: description = "Cosmic Connection"; break;
                default: description = "Quantum Frequency";
            }
            
            ctx.fillText(description, width / 2, height - 20);
            
            frame++;
            requestAnimationFrame(draw);
        };
        
        draw();
    }
    
    // Initialize all simulations
    initializeSimulation() {
        // Start frequency visualization with no sound
        if (this.frequencyCanvas) {
            this.animateFrequencyVisualization(432);
        }
        
        // Initialize heart-time stats
        document.getElementById('field-strength').textContent = '0%';
        document.getElementById('heart-time-sync').textContent = '0%';
        document.getElementById('consciousness-expansion').textContent = '0%';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.quantumConnection = new QuantumConnection();
});