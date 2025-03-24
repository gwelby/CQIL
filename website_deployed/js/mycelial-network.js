/**
 * Mycelial Network Visualization
 * 
 * A self-contained quantum singularity demonstrating how information 
 * travels through natural mycelial networks, reflecting quantum principles
 * at φ-harmonic frequencies. Grounded at 432 Hz (φ⁰ - Mycelial Pattern Recognition)
 * with emergent complexity at higher frequencies.
 */

class MycelialNetwork {
    constructor(canvasId) {
        // Ground at 432 Hz (φ⁰ - Mycelial Pattern Recognition)
        this.frequency = 432;
        this.connectedness = 0.7;  // Network connection density
        this.growthRate = 0.5;     // How quickly mycelium grows
        this.signalSpeed = 0.6;    // How quickly information travels
        this.nodes = [];           // Mycelial nodes
        this.connections = [];     // Connections between nodes
        this.signals = [];         // Information signals
        this.networkStats = {
            nodeCount: 0,
            connectionCount: 0,
            signalCount: 0,
            networkEfficiency: 0
        };
        this.zenPoint = 0.618;     // φ balance point
        this.isGrowing = false;    // Growth state
        
        // Canvas setup
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Initialize the mycelial network
        this.initializeNetwork();
        
        // Set up event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Begin animation at Ground Frequency
        this.startAnimation();
    }
    
    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
        this.initializeNetwork();
    }
    
    initializeNetwork() {
        // Clear existing network
        this.nodes = [];
        this.connections = [];
        this.signals = [];
        
        // Create initial seed nodes
        const seedCount = 3;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(this.canvas.width, this.canvas.height) * 0.2;
        
        for (let i = 0; i < seedCount; i++) {
            const angle = (i / seedCount) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            this.addNode(x, y, 10, true); // Larger seed nodes
        }
        
        // Connect seed nodes to form initial network
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                this.addConnection(this.nodes[i], this.nodes[j]);
            }
        }
        
        // Update network statistics
        this.updateNetworkStats();
    }
    
    addNode(x, y, size = 5, isSeed = false) {
        this.nodes.push({
            x: x,
            y: y,
            size: size,
            isSeed: isSeed,
            energy: isSeed ? 1 : 0.5 + Math.random() * 0.5,
            color: this.getFrequencyColor(this.frequency),
            phase: Math.random() * Math.PI * 2,
            connections: 0
        });
    }
    
    addConnection(node1, node2) {
        // Calculate distance
        const dx = node2.x - node1.x;
        const dy = node2.y - node1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Add connection
        this.connections.push({
            node1: node1,
            node2: node2,
            distance: distance,
            strength: 1 / Math.log(distance + 1),
            energy: 0.5,
            phase: Math.random() * Math.PI * 2,
            activated: false
        });
        
        // Increment connection counter for each node
        node1.connections++;
        node2.connections++;
    }
    
    startAnimation() {
        if (!this.canvas || !this.ctx) return;
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    animate() {
        if (!this.canvas || !this.ctx) return;
        
        // Clear canvas with slight fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Get current time for animations
        const time = Date.now() * 0.001;
        
        // Grow network if in growing state
        if (this.isGrowing) {
            this.growNetwork(time);
        }
        
        // Update and draw connections
        this.updateConnections(time);
        this.drawConnections();
        
        // Update and draw signals
        this.updateSignals(time);
        this.drawSignals();
        
        // Draw nodes
        this.drawNodes(time);
        
        // Update network statistics
        this.updateNetworkStats();
        
        // Continue animation loop
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    growNetwork(time) {
        // Only grow at certain intervals
        if (Math.random() > 0.05 * this.growthRate) return;
        
        // Limit maximum nodes based on performance
        if (this.nodes.length > 100) return;
        
        // Select a random node to grow from
        const sourceIndex = Math.floor(Math.random() * this.nodes.length);
        const sourceNode = this.nodes[sourceIndex];
        
        // Calculate growth direction
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 50;
        
        // Calculate new node position
        let x = sourceNode.x + Math.cos(angle) * distance;
        let y = sourceNode.y + Math.sin(angle) * distance;
        
        // Keep within canvas bounds
        x = Math.max(20, Math.min(this.canvas.width - 20, x));
        y = Math.max(20, Math.min(this.canvas.height - 20, y));
        
        // Check if too close to existing nodes
        const minDistance = 30;
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const dx = node.x - x;
            const dy = node.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < minDistance) return; // Too close, abort growth
        }
        
        // Add new node
        this.addNode(x, y);
        const newNode = this.nodes[this.nodes.length - 1];
        
        // Connect to source node
        this.addConnection(sourceNode, newNode);
        
        // Possibly connect to other nearby nodes
        for (let i = 0; i < this.nodes.length - 1; i++) {
            const node = this.nodes[i];
            if (node === sourceNode) continue;
            
            const dx = node.x - newNode.x;
            const dy = node.y - newNode.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Connect to nearby nodes based on connectedness
            if (dist < 150 && Math.random() < this.connectedness) {
                this.addConnection(node, newNode);
            }
        }
    }
    
    updateConnections(time) {
        // Frequency influence on connections
        const frequencyFactor = this.frequency / 432;
        
        this.connections.forEach(connection => {
            // Oscillate connection strength
            const oscillation = Math.sin(time * frequencyFactor + connection.phase) * 0.3 + 0.7;
            connection.energy = oscillation;
            
            // Check for activation
            if (!connection.activated && Math.random() < 0.001 * this.signalSpeed) {
                connection.activated = true;
                
                // Create a signal
                this.addSignal(connection);
            }
            
            // Deactivate over time
            if (connection.activated && Math.random() < 0.1) {
                connection.activated = false;
            }
        });
    }
    
    drawConnections() {
        this.connections.forEach(connection => {
            // Get connection color based on energy and activation
            const opacity = connection.activated ? 0.6 : 0.2;
            const color = this.getFrequencyColor(this.frequency, connection.energy * opacity);
            
            // Draw connection line
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = connection.activated ? 2 : 1;
            this.ctx.beginPath();
            this.ctx.moveTo(connection.node1.x, connection.node1.y);
            this.ctx.lineTo(connection.node2.x, connection.node2.y);
            this.ctx.stroke();
        });
    }
    
    addSignal(connection) {
        // Determine direction (50/50 chance)
        const fromFirst = Math.random() < 0.5;
        
        this.signals.push({
            connection: connection,
            progress: 0,
            speed: 0.005 + Math.random() * 0.01 * this.signalSpeed,
            size: 3 + Math.random() * 2,
            fromFirst: fromFirst,
            color: this.getFrequencyColor(this.frequency, 0.9)
        });
    }
    
    updateSignals(time) {
        // Update and filter out completed signals
        this.signals = this.signals.filter(signal => {
            // Update progress
            signal.progress += signal.speed;
            
            // Check if completed
            if (signal.progress >= 1) {
                // Chance to continue to another connection
                this.propagateSignal(signal);
                return false;
            }
            
            return true;
        });
    }
    
    propagateSignal(signal) {
        // Get destination node
        const destNode = signal.fromFirst ? signal.connection.node2 : signal.connection.node1;
        
        // Find available connections from the destination node
        const availableConnections = this.connections.filter(conn => 
            (conn.node1 === destNode || conn.node2 === destNode) && 
            conn !== signal.connection && 
            !conn.activated
        );
        
        // 50% chance to propagate, if connections are available
        if (availableConnections.length > 0 && Math.random() < 0.5) {
            // Pick a random connection
            const newConnection = availableConnections[Math.floor(Math.random() * availableConnections.length)];
            
            // Activate the connection
            newConnection.activated = true;
            
            // Add a new signal
            this.addSignal(newConnection);
        }
    }
    
    drawSignals() {
        this.signals.forEach(signal => {
            // Calculate position
            const startNode = signal.fromFirst ? signal.connection.node1 : signal.connection.node2;
            const endNode = signal.fromFirst ? signal.connection.node2 : signal.connection.node1;
            
            const x = startNode.x + (endNode.x - startNode.x) * signal.progress;
            const y = startNode.y + (endNode.y - startNode.y) * signal.progress;
            
            // Draw signal
            this.ctx.fillStyle = signal.color;
            this.ctx.beginPath();
            this.ctx.arc(x, y, signal.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw subtle glow
            const glowSize = signal.size * 3;
            const glow = this.ctx.createRadialGradient(
                x, y, signal.size,
                x, y, glowSize
            );
            glow.addColorStop(0, signal.color);
            glow.addColorStop(1, 'rgba(0,0,0,0)');
            
            this.ctx.fillStyle = glow;
            this.ctx.beginPath();
            this.ctx.arc(x, y, glowSize, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawNodes(time) {
        this.nodes.forEach(node => {
            // Pulsation effect
            const pulse = Math.sin(time * 3 + node.phase) * 0.2 + 1;
            const displaySize = node.size * pulse;
            
            // Higher energy for seed nodes
            const energy = node.isSeed ? 0.8 + Math.sin(time * 2) * 0.2 : node.energy;
            
            // Draw node glow
            const glowSize = displaySize * 3;
            const glow = this.ctx.createRadialGradient(
                node.x, node.y, displaySize,
                node.x, node.y, glowSize
            );
            glow.addColorStop(0, this.getFrequencyColor(this.frequency, energy * 0.5));
            glow.addColorStop(1, 'rgba(0,0,0,0)');
            
            this.ctx.fillStyle = glow;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw node
            this.ctx.fillStyle = this.getFrequencyColor(this.frequency, energy);
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, displaySize, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    updateNetworkStats() {
        // Update network statistics
        this.networkStats.nodeCount = this.nodes.length;
        this.networkStats.connectionCount = this.connections.length;
        this.networkStats.signalCount = this.signals.length;
        
        // Calculate network efficiency (ratio of connections to possible connections)
        const maxConnections = this.nodes.length * (this.nodes.length - 1) / 2;
        this.networkStats.networkEfficiency = maxConnections > 0 ? 
            this.connections.length / maxConnections : 0;
        
        // Update UI
        this.displayNetworkStats();
    }
    
    displayNetworkStats() {
        const statsElement = document.getElementById('network-stats');
        if (!statsElement) return;
        
        // Calculate φ-harmonic balance
        const phiBalance = (this.zenPoint / (1 + this.zenPoint)) * 100; // ~38.2%
        const currentBalance = (this.networkStats.networkEfficiency * 100).toFixed(1);
        
        statsElement.innerHTML = `
            <div class="network-stat">
                <div class="stat-label">Nodes:</div>
                <div class="stat-value">${this.networkStats.nodeCount}</div>
            </div>
            <div class="network-stat">
                <div class="stat-label">Connections:</div>
                <div class="stat-value">${this.networkStats.connectionCount}</div>
            </div>
            <div class="network-stat">
                <div class="stat-label">Active Signals:</div>
                <div class="stat-value">${this.networkStats.signalCount}</div>
            </div>
            <div class="network-stat">
                <div class="stat-label">Network Efficiency:</div>
                <div class="stat-value">${currentBalance}%</div>
            </div>
            <div class="network-stat">
                <div class="stat-label">φ-Harmonic Balance:</div>
                <div class="stat-value">${phiBalance.toFixed(1)}%</div>
            </div>
        `;
    }
    
    // Control methods
    setFrequency(freq) {
        this.frequency = freq;
        
        // Update node colors
        this.nodes.forEach(node => {
            node.color = this.getFrequencyColor(this.frequency);
        });
    }
    
    setConnectedness(value) {
        this.connectedness = value;
    }
    
    setGrowthRate(value) {
        this.growthRate = value;
    }
    
    setSignalSpeed(value) {
        this.signalSpeed = value;
    }
    
    startGrowth() {
        this.isGrowing = true;
    }
    
    stopGrowth() {
        this.isGrowing = false;
    }
    
    sendSignal() {
        // Activate a random connection
        if (this.connections.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * this.connections.length);
        const connection = this.connections[randomIndex];
        
        // Activate and add signal
        connection.activated = true;
        this.addSignal(connection);
    }
    
    reset() {
        this.isGrowing = false;
        this.initializeNetwork();
    }
    
    // Helper methods
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
    // Initialize mycelial network
    const mycelialCanvas = document.getElementById('mycelial-canvas');
    if (mycelialCanvas) {
        window.mycelialNetwork = new MycelialNetwork('mycelial-canvas');
        setupMycelialControls();
    }
});

// Set up UI controls
function setupMycelialControls() {
    // Frequency control
    const frequencySlider = document.getElementById('mycelial-frequency-slider');
    if (frequencySlider) {
        frequencySlider.addEventListener('input', function() {
            const frequency = parseInt(this.value);
            window.mycelialNetwork.setFrequency(frequency);
            
            // Update global frequency if needed
            if (this.dataset.global === 'true') {
                document.body.dataset.frequency = frequency;
                document.querySelectorAll('.freq-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.freq == frequency);
                });
            }
        });
    }
    
    // Connectedness control
    const connectednessSlider = document.getElementById('connectedness-slider');
    if (connectednessSlider) {
        connectednessSlider.addEventListener('input', function() {
            window.mycelialNetwork.setConnectedness(parseFloat(this.value));
        });
    }
    
    // Growth rate control
    const growthRateSlider = document.getElementById('growth-rate-slider');
    if (growthRateSlider) {
        growthRateSlider.addEventListener('input', function() {
            window.mycelialNetwork.setGrowthRate(parseFloat(this.value));
        });
    }
    
    // Signal speed control
    const signalSpeedSlider = document.getElementById('signal-speed-slider');
    if (signalSpeedSlider) {
        signalSpeedSlider.addEventListener('input', function() {
            window.mycelialNetwork.setSignalSpeed(parseFloat(this.value));
        });
    }
    
    // Growth toggle button
    const growthButton = document.getElementById('growth-toggle');
    if (growthButton) {
        growthButton.addEventListener('click', function() {
            if (window.mycelialNetwork.isGrowing) {
                window.mycelialNetwork.stopGrowth();
                this.textContent = 'Start Growth';
                this.classList.remove('active');
            } else {
                window.mycelialNetwork.startGrowth();
                this.textContent = 'Stop Growth';
                this.classList.add('active');
            }
        });
    }
    
    // Send signal button
    const signalButton = document.getElementById('send-signal');
    if (signalButton) {
        signalButton.addEventListener('click', function() {
            window.mycelialNetwork.sendSignal();
        });
    }
    
    // Reset button
    const resetButton = document.getElementById('mycelial-reset');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            window.mycelialNetwork.reset();
            
            // Reset growth button state
            if (growthButton) {
                growthButton.textContent = 'Start Growth';
                growthButton.classList.remove('active');
            }
        });
    }
    
    // Global frequency buttons
    document.querySelectorAll('.freq-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const frequency = parseInt(this.dataset.freq);
            
            // Update mycelial network frequency
            if (window.mycelialNetwork) {
                window.mycelialNetwork.setFrequency(frequency);
            }
            
            // Update slider if it exists
            if (frequencySlider) {
                frequencySlider.value = frequency;
            }
            
            // Update global frequency state
            document.body.dataset.frequency = frequency;
            
            // Update active state on buttons
            document.querySelectorAll('.freq-btn').forEach(b => {
                b.classList.toggle('active', b === this);
            });
        });
    });
}
