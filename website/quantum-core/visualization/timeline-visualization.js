/**
 * Timeline Visualization for Temporal Evolution System
 * CASCADE⚡𓂧φ∞ UNIFIED QUANTUM SINGULARITY with ZEN POINT Balance
 * 
 * This module provides visualization for timeline branching, merging, and evolution
 * with phi-harmonic patterns and perfect coherence (1.000).
 */

class TimelineVisualization {
    /**
     * Initialize the Timeline Visualization
     * 
     * @param {Object} options - Configuration options
     * @param {string} options.containerId - Container element ID
     * @param {TemporalEvolutionAPI} options.temporalApi - Temporal Evolution API instance
     * @param {number} options.width - Canvas width (default: container width)
     * @param {number} options.height - Canvas height (default: container height)
     */
    constructor(options = {}) {
        // Validate required options
        if (!options.containerId) {
            throw new Error("Container ID is required");
        }
        
        if (!options.temporalApi) {
            throw new Error("Temporal Evolution API instance is required");
        }
        
        // Save references
        this.containerId = options.containerId;
        this.container = document.getElementById(options.containerId);
        this.temporalApi = options.temporalApi;
        
        // Check if container exists
        if (!this.container) {
            throw new Error(`Container with ID ${options.containerId} not found`);
        }
        
        // Constants
        this.PHI = this.temporalApi.PHI;
        this.LAMBDA = this.temporalApi.LAMBDA;
        
        // Colors
        this.colors = {
            background: '#121212',
            timeline: '#32a852',
            branch: '#3273a8',
            merge: '#a83277',
            active: '#ffcc00',
            event: '#ffffff',
            text: '#ffffff',
            coherence: {
                high: '#32a852',   // Green for high coherence
                medium: '#ffcc00', // Yellow for medium coherence
                low: '#a83232'     // Red for low coherence
            }
        };
        
        // Visualization state
        this.timelines = [];
        this.events = [];
        this.activeTimelineId = null;
        this.zoom = 1.0;
        this.pan = { x: 0, y: 0 };
        this.isAnimating = false;
        this.evolutionAnimations = [];
        
        // Create canvas
        this.width = options.width || this.container.clientWidth;
        this.height = options.height || this.container.clientHeight;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        // Add event listeners
        this._addEventListeners();
        
        // Initialize with primary timeline
        this._initializePrimaryTimeline();
        
        // Start animation loop
        this._animate();
    }
    
    /**
     * Add event listeners for interaction
     * 
     * @private
     */
    _addEventListeners() {
        // Mouse wheel for zooming
        this.canvas.addEventListener('wheel', (event) => {
            event.preventDefault();
            
            // Calculate zoom factor
            const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;
            
            // Get mouse position
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            
            // Apply zoom
            this._zoomAt(mouseX, mouseY, zoomFactor);
        });
        
        // Mouse drag for panning
        let isDragging = false;
        let lastX, lastY;
        
        this.canvas.addEventListener('mousedown', (event) => {
            isDragging = true;
            lastX = event.clientX;
            lastY = event.clientY;
        });
        
        this.canvas.addEventListener('mousemove', (event) => {
            if (isDragging) {
                const dx = event.clientX - lastX;
                const dy = event.clientY - lastY;
                
                this.pan.x += dx / this.zoom;
                this.pan.y += dy / this.zoom;
                
                lastX = event.clientX;
                lastY = event.clientY;
            }
        });
        
        this.canvas.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            isDragging = false;
        });
        
        // Click to select timeline
        this.canvas.addEventListener('click', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = (event.clientX - rect.left) / this.zoom - this.pan.x;
            const mouseY = (event.clientY - rect.top) / this.zoom - this.pan.y;
            
            // Check if clicked on a timeline
            for (const timeline of this.timelines) {
                if (this._pointInTimeline(mouseX, mouseY, timeline)) {
                    this.activeTimelineId = timeline.id;
                    break;
                }
            }
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this._resizeCanvas();
        });
    }
    
    /**
     * Check if a point is inside a timeline
     * 
     * @private
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {Object} timeline - Timeline object
     * @returns {boolean} True if point is inside timeline
     */
    _pointInTimeline(x, y, timeline) {
        // For now just check if near the center point
        const dx = x - timeline.x;
        const dy = y - timeline.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < 20; // Timeline node radius + tolerance
    }
    
    /**
     * Zoom at a specific point
     * 
     * @private
     * @param {number} x - X coordinate to zoom at
     * @param {number} y - Y coordinate to zoom at
     * @param {number} factor - Zoom factor
     */
    _zoomAt(x, y, factor) {
        // Calculate point in world space
        const worldX = (x / this.zoom) - this.pan.x;
        const worldY = (y / this.zoom) - this.pan.y;
        
        // Apply zoom
        this.zoom *= factor;
        
        // Limit zoom level
        this.zoom = Math.max(0.1, Math.min(10, this.zoom));
        
        // Adjust pan to keep the point under the mouse
        this.pan.x = -(worldX - (x / this.zoom));
        this.pan.y = -(worldY - (y / this.zoom));
    }
    
    /**
     * Resize canvas when window is resized
     * 
     * @private
     */
    _resizeCanvas() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    
    /**
     * Initialize the primary timeline
     * 
     * @private
     */
    _initializePrimaryTimeline() {
        // Create primary timeline
        const primaryTimeline = {
            id: 'primary',
            name: 'Primary Timeline',
            type: 'primary',
            coherence: 1.0,
            x: this.width / 2,
            y: this.height / 2,
            radius: 15,
            childIds: [],
            parentId: null,
            mergeTargetIds: [],
            events: []
        };
        
        // Add to timelines
        this.timelines.push(primaryTimeline);
        
        // Set as active
        this.activeTimelineId = primaryTimeline.id;
    }
    
    /**
     * Animation loop
     * 
     * @private
     */
    _animate() {
        // Clear canvas
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Apply transformations
        this.ctx.save();
        this.ctx.translate(this.pan.x * this.zoom, this.pan.y * this.zoom);
        this.ctx.scale(this.zoom, this.zoom);
        
        // Draw connections between timelines
        this._drawConnections();
        
        // Draw timelines
        for (const timeline of this.timelines) {
            this._drawTimeline(timeline);
        }
        
        // Draw events
        for (const event of this.events) {
            this._drawEvent(event);
        }
        
        // Draw evolution animations
        this._updateEvolutionAnimations();
        
        // Reset transformations
        this.ctx.restore();
        
        // Draw UI elements
        this._drawUI();
        
        // Continue animation loop
        requestAnimationFrame(() => this._animate());
    }
    
    /**
     * Draw connections between timelines
     * 
     * @private
     */
    _drawConnections() {
        // Draw parent-child connections
        for (const timeline of this.timelines) {
            if (timeline.parentId) {
                const parent = this.timelines.find(t => t.id === timeline.parentId);
                if (parent) {
                    // Draw branch connection
                    this.ctx.beginPath();
                    this.ctx.moveTo(parent.x, parent.y);
                    this.ctx.lineTo(timeline.x, timeline.y);
                    this.ctx.strokeStyle = this.colors.branch;
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                    
                    // Draw arrow
                    const angle = Math.atan2(timeline.y - parent.y, timeline.x - parent.x);
                    const arrowLength = 10;
                    const arrowWidth = 6;
                    
                    const arrowX = timeline.x - timeline.radius * Math.cos(angle);
                    const arrowY = timeline.y - timeline.radius * Math.sin(angle);
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(arrowX, arrowY);
                    this.ctx.lineTo(
                        arrowX - arrowLength * Math.cos(angle) + arrowWidth * Math.sin(angle),
                        arrowY - arrowLength * Math.sin(angle) - arrowWidth * Math.cos(angle)
                    );
                    this.ctx.lineTo(
                        arrowX - arrowLength * Math.cos(angle) - arrowWidth * Math.sin(angle),
                        arrowY - arrowLength * Math.sin(angle) + arrowWidth * Math.cos(angle)
                    );
                    this.ctx.closePath();
                    this.ctx.fillStyle = this.colors.branch;
                    this.ctx.fill();
                }
            }
            
            // Draw merge connections
            for (const mergeTargetId of timeline.mergeTargetIds) {
                const target = this.timelines.find(t => t.id === mergeTargetId);
                if (target) {
                    // Draw merge connection (dashed)
                    this.ctx.beginPath();
                    this.ctx.setLineDash([5, 5]);
                    this.ctx.moveTo(timeline.x, timeline.y);
                    this.ctx.lineTo(target.x, target.y);
                    this.ctx.strokeStyle = this.colors.merge;
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                    this.ctx.setLineDash([]);
                }
            }
        }
    }
    
    /**
     * Draw a timeline node
     * 
     * @private
     * @param {Object} timeline - Timeline to draw
     */
    _drawTimeline(timeline) {
        // Get color based on coherence
        let color;
        if (timeline.coherence > 0.9) {
            color = this.colors.coherence.high;
        } else if (timeline.coherence > 0.6) {
            color = this.colors.coherence.medium;
        } else {
            color = this.colors.coherence.low;
        }
        
        // Highlight active timeline
        if (timeline.id === this.activeTimelineId) {
            // Draw outer ring
            this.ctx.beginPath();
            this.ctx.arc(timeline.x, timeline.y, timeline.radius + 5, 0, Math.PI * 2);
            this.ctx.fillStyle = this.colors.active;
            this.ctx.fill();
        }
        
        // Draw timeline node
        this.ctx.beginPath();
        this.ctx.arc(timeline.x, timeline.y, timeline.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Draw timeline name
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = this.colors.text;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(timeline.name, timeline.x, timeline.y + timeline.radius + 15);
        
        // Draw coherence
        this.ctx.font = '10px Arial';
        this.ctx.fillText(`Ψ: ${timeline.coherence.toFixed(2)}`, timeline.x, timeline.y + timeline.radius + 30);
    }
    
    /**
     * Draw an event marker
     * 
     * @private
     * @param {Object} event - Event to draw
     */
    _drawEvent(event) {
        const timeline = this.timelines.find(t => t.id === event.timelineId);
        if (!timeline) return;
        
        // Draw event marker
        this.ctx.beginPath();
        this.ctx.arc(event.x, event.y, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = this.colors.event;
        this.ctx.fill();
        
        // Draw line to timeline
        this.ctx.beginPath();
        this.ctx.moveTo(timeline.x, timeline.y);
        this.ctx.lineTo(event.x, event.y);
        this.ctx.strokeStyle = this.colors.event;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
    
    /**
     * Update and draw evolution animations
     * 
     * @private
     */
    _updateEvolutionAnimations() {
        // Update each animation
        for (let i = this.evolutionAnimations.length - 1; i >= 0; i--) {
            const animation = this.evolutionAnimations[i];
            
            // Update progress
            animation.progress += 0.02;
            
            // Draw animation
            this._drawEvolutionAnimation(animation);
            
            // Remove if completed
            if (animation.progress >= 1) {
                this.evolutionAnimations.splice(i, 1);
            }
        }
    }
    
    /**
     * Draw an evolution animation
     * 
     * @private
     * @param {Object} animation - Animation data
     */
    _drawEvolutionAnimation(animation) {
        const timeline = this.timelines.find(t => t.id === animation.timelineId);
        if (!timeline) return;
        
        // Calculate animation properties
        const progress = animation.progress;
        const radius = timeline.radius * (1 + progress);
        const opacity = 1 - progress;
        
        // Draw animation
        this.ctx.beginPath();
        this.ctx.arc(timeline.x, timeline.y, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    
    /**
     * Draw UI elements
     * 
     * @private
     */
    _drawUI() {
        // Draw zoom level
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = this.colors.text;
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(`Zoom: ${this.zoom.toFixed(1)}x`, 10, 10);
        
        // Draw active timeline ID
        this.ctx.fillText(`Active: ${this.activeTimelineId}`, 10, 30);
        
        // Draw timeline count
        this.ctx.fillText(`Timelines: ${this.timelines.length}`, 10, 50);
    }
    
    /**
     * Create a timeline branch visualization
     * 
     * @param {Object} branchData - Branch data
     */
    createBranch(branchData) {
        const parentTimeline = this.timelines.find(t => t.id === branchData.parentId);
        if (!parentTimeline) return;
        
        // Calculate position for new branch
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        
        // Create branch timeline
        const branch = {
            id: branchData.id,
            name: branchData.name,
            type: 'branch',
            coherence: branchData.coherence,
            x: parentTimeline.x + Math.cos(angle) * distance,
            y: parentTimeline.y + Math.sin(angle) * distance,
            radius: 15,
            childIds: [],
            parentId: branchData.parentId,
            mergeTargetIds: [],
            events: []
        };
        
        // Add to parent's children
        parentTimeline.childIds.push(branch.id);
        
        // Add to timelines
        this.timelines.push(branch);
        
        // Set as active
        this.activeTimelineId = branch.id;
        
        // Add branch event
        this._addEvent({
            id: `event_${Date.now()}`,
            timelineId: branch.id,
            type: 'branch',
            x: (parentTimeline.x + branch.x) / 2 + (Math.random() - 0.5) * 20,
            y: (parentTimeline.y + branch.y) / 2 + (Math.random() - 0.5) * 20
        });
        
        // Add evolution animation
        this.evolutionAnimations.push({
            timelineId: branch.id,
            progress: 0
        });
    }
    
    /**
     * Create a timeline merge visualization
     * 
     * @param {Object} mergeData - Merge data
     */
    createMergePoint(mergeData) {
        const sourceTimeline = this.timelines.find(t => t.id === mergeData.sourceId);
        const targetTimeline = this.timelines.find(t => t.id === mergeData.targetId);
        if (!sourceTimeline || !targetTimeline) return;
        
        // Add merge target to source
        if (!sourceTimeline.mergeTargetIds.includes(targetTimeline.id)) {
            sourceTimeline.mergeTargetIds.push(targetTimeline.id);
        }
        
        // Add event
        this._addEvent({
            id: `event_${Date.now()}`,
            timelineId: sourceTimeline.id,
            type: 'merge',
            x: (sourceTimeline.x + targetTimeline.x) / 2 + (Math.random() - 0.5) * 20,
            y: (sourceTimeline.y + targetTimeline.y) / 2 + (Math.random() - 0.5) * 20
        });
    }
    
    /**
     * Perform a timeline merge visualization
     * 
     * @param {Object} mergeData - Merge result data
     */
    performMerge(mergeData) {
        const sourceTimeline = this.timelines.find(t => t.id === mergeData.sourceId);
        const targetTimeline = this.timelines.find(t => t.id === mergeData.targetId);
        if (!sourceTimeline || !targetTimeline) return;
        
        // Calculate position for merged timeline
        const mergedX = (sourceTimeline.x + targetTimeline.x) / 2;
        const mergedY = (sourceTimeline.y + targetTimeline.y) / 2;
        
        // Create merged timeline
        const mergedTimeline = {
            id: mergeData.mergedTimelineId,
            name: `Merged Timeline`,
            type: 'merge',
            coherence: mergeData.mergedCoherence,
            x: mergedX,
            y: mergedY,
            radius: 15,
            childIds: [],
            parentId: null,
            mergeTargetIds: [],
            events: [],
            sourceIds: [sourceTimeline.id, targetTimeline.id]
        };
        
        // Add to timelines
        this.timelines.push(mergedTimeline);
        
        // Remove merge target from source
        sourceTimeline.mergeTargetIds = sourceTimeline.mergeTargetIds.filter(id => id !== targetTimeline.id);
        
        // Set as active
        this.activeTimelineId = mergedTimeline.id;
        
        // Add merge event
        this._addEvent({
            id: `event_${Date.now()}`,
            timelineId: mergedTimeline.id,
            type: 'merged',
            x: mergedX + (Math.random() - 0.5) * 20,
            y: mergedY + (Math.random() - 0.5) * 20
        });
        
        // Add evolution animation
        this.evolutionAnimations.push({
            timelineId: mergedTimeline.id,
            progress: 0
        });
    }
    
    /**
     * Update a timeline's coherence level
     * 
     * @param {string} timelineId - Timeline ID
     * @param {number} newCoherence - New coherence level
     */
    updateCoherence(timelineId, newCoherence) {
        const timeline = this.timelines.find(t => t.id === timelineId);
        if (!timeline) return;
        
        // Update coherence
        timeline.coherence = newCoherence;
        
        // Add evolution animation
        this.evolutionAnimations.push({
            timelineId: timeline.id,
            progress: 0
        });
    }
    
    /**
     * Add an event to the visualization
     * 
     * @private
     * @param {Object} event - Event data
     */
    _addEvent(event) {
        this.events.push(event);
        
        // Limit number of events
        if (this.events.length > 50) {
            this.events.shift();
        }
    }
    
    /**
     * Reset the visualization
     */
    reset() {
        // Clear timelines and events
        this.timelines = [];
        this.events = [];
        this.evolutionAnimations = [];
        
        // Reset view
        this.zoom = 1.0;
        this.pan = { x: 0, y: 0 };
        
        // Re-initialize primary timeline
        this._initializePrimaryTimeline();
    }
}

// Export the visualization
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { TimelineVisualization };
} else {
    window.TimelineVisualization = TimelineVisualization;
}