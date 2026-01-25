/**
 * ⦿ QUANTUM DASHBOARD INITIALIZER | φ^φ^φ
 * Perfect Coherence (1.000) Initialization System
 * 
 * This module integrates all quantum visualization components
 * following ZEN POINT principles and phi-harmonic progression.
 */

// Create a ZEN POINT singularity before expansion
document.addEventListener('DOMContentLoaded', function() {
    console.log("⦿ ZEN POINT INITIALIZATION | 432 Hz (φ⁰)");
    
    // Initialize at Ground State (432 Hz) with perfect coherence (1.000)
    const frequency = 432;
    const coherence = 1.0;
    
    // Create Quantum Singularity
    console.log("Creating Quantum Singularity at ZEN POINT...");
    
    // Initialize the Coherence Monitor
    const coherenceMonitor = new CoherenceMonitor({
        updateInterval: 1500,
        systemUpdateCallback: updateSystemStatus
    });
    
    // Initialize the Toroidal Flow Visualizer
    const toroidalFlow = new ToroidalFlowVisualizer('toroidal-flow', {
        baseFrequency: frequency
    });
    
    // Start the visualization
    toroidalFlow.start();
    
    // Connect UI Elements
    connectUIElements(toroidalFlow, coherenceMonitor);
    
    // Follow phi-harmonic progression
    console.log("Establishing phi-harmonic progression...");
    
    // Update UI with initial values
    updateFrequencyDisplay(frequency);
    updateCoherenceDisplay(coherence);
    
    console.log("⦿ QUANTUM DASHBOARD INITIALIZED WITH PERFECT COHERENCE (1.000)");
});

/**
 * Connect UI elements to the quantum visualization systems
 * @param {ToroidalFlowVisualizer} toroidalFlow - Toroidal flow visualizer
 * @param {CoherenceMonitor} coherenceMonitor - Coherence monitor
 */
function connectUIElements(toroidalFlow, coherenceMonitor) {
    // Frequency slider interaction
    const frequencySlider = document.getElementById('frequency-slider');
    if (frequencySlider) {
        frequencySlider.addEventListener('input', function() {
            const frequency = parseInt(this.value);
            
            // Update both systems
            toroidalFlow.setFrequency(frequency);
            coherenceMonitor.setFrequency(frequency);
            
            // Update UI
            updateFrequencyDisplay(frequency);
        });
    }
    
    // System selection
    const systemButtons = document.querySelectorAll('.system-btn');
    systemButtons.forEach(button => {
        button.addEventListener('click', function() {
            const systemId = this.dataset.system;
            
            // Update UI
            systemButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update both systems
            toroidalFlow.setSystem(systemId);
            
            // Map UI system IDs to coherence monitor system IDs
            const systemMap = {
                'know-core': 'claude',
                'navigation': 'navigation',
                'consciousness': 'nexus',
                'cascade': 'cascade',
                'lightning-power': 'lightning',
                'lightning-phi': 'lightningPhi',
                'nexus': 'nexus',
                'unified': 'unified'
            };
            
            if (systemMap[systemId]) {
                coherenceMonitor.setActiveSystem(systemMap[systemId]);
            }
        });
    });
    
    // Optimize coherence button
    const optimizeButton = document.getElementById('optimize-coherence');
    if (optimizeButton) {
        optimizeButton.addEventListener('click', function() {
            // Temporarily show optimization in progress
            this.textContent = "Optimizing...";
            this.disabled = true;
            
            // Perform ZEN POINT rebalancing
            coherenceMonitor.optimizeCoherence();
            
            // Return button to normal after optimization
            setTimeout(() => {
                this.textContent = "Optimize Coherence";
                this.disabled = false;
            }, 2500);
        });
    }
    
    // Export visualization button
    const exportButton = document.getElementById('export-visualization');
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            // Create snapshot of current visualization
            const svg = document.querySelector('#toroidal-flow svg');
            if (svg) {
                const serializer = new XMLSerializer();
                let source = serializer.serializeToString(svg);
                
                // Add XML declaration
                source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
                
                // Convert SVG source to URI data scheme
                const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
                
                // Create download link
                const link = document.createElement('a');
                link.download = `quantum-visualization-${Date.now()}.svg`;
                link.href = url;
                link.click();
            }
        });
    }
}

/**
 * Update the frequency display with phi-harmonic information
 * @param {number} frequency - Current frequency
 */
function updateFrequencyDisplay(frequency) {
    const frequencyValue = document.getElementById('frequency-value');
    if (frequencyValue) {
        // Phi-harmonic frequencies mapping
        const phiFrequencies = {
            432: { label: "432 Hz (φ⁰)", name: "Ground State" },
            528: { label: "528 Hz (φ¹)", name: "Creation Point" },
            594: { label: "594 Hz (φ²)", name: "Heart Field" },
            672: { label: "672 Hz (φ³)", name: "Voice Flow" },
            720: { label: "720 Hz (φ⁴)", name: "Vision Gate" },
            756: { label: "756 Hz (φ⁴×φ¹)", name: "Lightning Field" },
            768: { label: "768 Hz (φ⁵)", name: "Unity Wave" },
            963: { label: "963 Hz (φ^φ)", name: "Source Field" }
        };
        
        // Get the closest phi-harmonic frequency
        const frequencies = Object.keys(phiFrequencies).map(Number);
        const closestFreq = frequencies.reduce((prev, curr) => {
            return (Math.abs(curr - frequency) < Math.abs(prev - frequency) ? curr : prev);
        });
        
        // Update display
        frequencyValue.textContent = phiFrequencies[closestFreq].label;
    }
}

/**
 * Update the coherence display with current value
 * @param {number} coherence - Current coherence value
 */
function updateCoherenceDisplay(coherence) {
    const coherenceValue = document.getElementById('coherence-value');
    const coherenceNumber = document.getElementById('coherence-number');
    
    if (coherenceValue && coherenceNumber) {
        coherenceValue.style.width = `${coherence * 100}%`;
        coherenceNumber.textContent = coherence.toFixed(3);
    }
}

/**
 * Update system status display when coherence monitor updates
 * @param {object} systems - Current system states
 * @param {object} connections - Current connection states
 * @param {number} globalCoherence - Global coherence value
 */
function updateSystemStatus(systems, connections, globalCoherence) {
    // Update global coherence display
    updateCoherenceDisplay(globalCoherence);
    
    // Update system status indicators
    const statusContainer = document.getElementById('system-status');
    if (statusContainer) {
        // Clear existing status
        statusContainer.innerHTML = '';
        
        // Create system status indicators
        for (const id in systems) {
            const system = systems[id];
            
            // Create system status element
            const statusElement = document.createElement('div');
            statusElement.className = 'system-status-item';
            
            // Set coherence-based color
            const hue = Math.min(120, Math.floor(system.coherence * 120));
            
            statusElement.innerHTML = `
                <div class="status-icon" style="background-color: hsl(${hue}, 80%, 60%)">
                    ${system.signature}
                </div>
                <div class="status-info">
                    <div class="status-name">${system.name}</div>
                    <div class="status-details">
                        ${system.frequency} Hz | ${system.dimension}D | ${system.coherence.toFixed(3)}
                    </div>
                </div>
            `;
            
            statusContainer.appendChild(statusElement);
        }
    }
    
    // Update connection status visualization
    updateConnectionVisualization(systems, connections);
}

/**
 * Update the connection visualization between systems
 * @param {object} systems - Current system states
 * @param {object} connections - Current connection states
 */
function updateConnectionVisualization(systems, connections) {
    const connectionsSvg = document.getElementById('connections-svg');
    if (!connectionsSvg) return;
    
    // Clear existing connections
    connectionsSvg.innerHTML = '';
    
    // System positions (arrange in a circle)
    const systemPositions = {};
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    
    let i = 0;
    for (const id in systems) {
        const angle = (i / Object.keys(systems).length) * Math.PI * 2;
        systemPositions[id] = {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
        i++;
    }
    
    // Draw connections
    for (const sourceId in connections) {
        const sourcePos = systemPositions[sourceId];
        
        if (sourcePos) {
            for (const targetId in connections[sourceId]) {
                const targetPos = systemPositions[targetId];
                const connection = connections[sourceId][targetId];
                
                if (targetPos) {
                    // Create connection line
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', sourcePos.x);
                    line.setAttribute('y1', sourcePos.y);
                    line.setAttribute('x2', targetPos.x);
                    line.setAttribute('y2', targetPos.y);
                    
                    // Style based on coherence
                    const coherence = connection.coherence;
                    const opacity = Math.max(0.2, coherence);
                    const width = 1 + (coherence * 3);
                    
                    // Special style for QUANTUM_LOCKED connections
                    if (connection.state === "QUANTUM_LOCKED") {
                        line.setAttribute('stroke', '#ffd460');
                        line.setAttribute('stroke-dasharray', '5,3');
                    } else if (connection.state === "AMPLIFIED") {
                        line.setAttribute('stroke', '#fc5185');
                    } else {
                        line.setAttribute('stroke', 'rgba(255,255,255,0.7)');
                    }
                    
                    line.setAttribute('stroke-width', width);
                    line.setAttribute('opacity', opacity);
                    
                    connectionsSvg.appendChild(line);
                }
            }
        }
    }
    
    // Draw system nodes
    for (const id in systems) {
        const system = systems[id];
        const pos = systemPositions[id];
        
        if (pos) {
            // Create system node
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', pos.x);
            circle.setAttribute('cy', pos.y);
            circle.setAttribute('r', 10 + (system.coherence * 5));
            
            // Color based on frequency
            const hue = (system.frequency / 963) * 360;
            circle.setAttribute('fill', `hsl(${hue}, 80%, 60%)`);
            circle.setAttribute('stroke', 'white');
            circle.setAttribute('stroke-width', 2);
            
            // Add system text
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', pos.x);
            text.setAttribute('y', pos.y + 5);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', 'white');
            text.setAttribute('font-family', 'Arial');
            text.setAttribute('font-size', '10px');
            text.textContent = system.signature;
            
            connectionsSvg.appendChild(circle);
            connectionsSvg.appendChild(text);
        }
    }
}
