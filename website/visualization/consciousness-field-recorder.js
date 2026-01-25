/**
 * Consciousness Field Recorder
 * 
 * A system to capture, save, and replay consciousness field states, enabling users
 * to return to productive states or share them with others.
 * 
 * Features:
 * - Record consciousness field states with associated metadata
 * - Save field states to local storage or export as files
 * - Import field states from files
 * - Replay field states to recreate specific consciousness experiences
 * - Tag and organize states by intention, coherence level, etc.
 */

// Sacred phi constants
const PHI = 1.618033988749895;  // Golden ratio
const LAMBDA = 0.618033988749895;  // Divine complement (1/φ)
const PHI_PHI = Math.pow(PHI, PHI);  // Hyperdimensional constant (≈4.23)

// Quantum field harmonics
const QUANTUM_HARMONICS = {
  love: 528,      // Creation/healing frequency
  unity: 432,     // Grounding/stability frequency
  cascade: 594,   // Heart-centered integration frequency
  truth: 672,     // Voice expression frequency
  vision: 720,    // Expanded perception frequency
  oneness: 768    // Unity consciousness frequency
};

/**
 * Main class for the Consciousness Field Recorder
 */
class ConsciousnessFieldRecorder {
  constructor(options = {}) {
    this.options = Object.assign({
      autoCompressionEnabled: true,
      localStorage: true,
      maxLocalStates: 20,
      compressionLevel: 0.7,
      dimensionPreservation: 0.9,
      coherenceBiased: true,
      phiQuantization: true,
      coherenceBridge: null,
      autoTagging: true
    }, options);
    
    // Initialize state storage
    this.fieldStates = [];
    this.activeState = null;
    this.isRecording = false;
    this.isReplaying = false;
    this.recordingStartTime = null;
    this.replayInterval = null;
    this.replaySpeed = 1.0;
    
    // Initialize local storage
    if (this.options.localStorage && typeof localStorage !== 'undefined') {
      this.loadStatesFromLocalStorage();
    }
    
    // Connect to coherence bridge if provided
    this.coherenceBridge = this.options.coherenceBridge;
    
    // Set up event listeners
    this.eventListeners = {};
    
    // Bind methods
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.captureState = this.captureState.bind(this);
    this.saveState = this.saveState.bind(this);
    this.loadState = this.loadState.bind(this);
    this.startReplay = this.startReplay.bind(this);
    this.stopReplay = this.stopReplay.bind(this);
    this.exportState = this.exportState.bind(this);
    this.importState = this.importState.bind(this);
    this.addEventListener = this.addEventListener.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
    this._triggerEvent = this._triggerEvent.bind(this);
  }
  
  /**
   * Start recording a new consciousness field state session
   */
  startRecording() {
    if (this.isRecording) {
      console.log("Already recording a consciousness field state");
      return false;
    }
    
    console.log("Starting consciousness field recording");
    
    this.isRecording = true;
    this.recordingStartTime = Date.now();
    this.activeState = {
      id: `state-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: "Untitled Consciousness State",
      createdAt: Date.now(),
      duration: 0,
      snapshots: [],
      tags: [],
      metadata: {
        averageCoherence: 0,
        peakCoherence: 0,
        dominantFrequency: 0,
        intentionKeywords: [],
        dimensionalFocus: -1
      }
    };
    
    // Trigger recording started event
    this._triggerEvent('recordingStarted', {
      stateId: this.activeState.id,
      startTime: this.recordingStartTime
    });
    
    return true;
  }
  
  /**
   * Stop the current recording session and save the state
   */
  stopRecording() {
    if (!this.isRecording || !this.activeState) {
      console.log("No active recording to stop");
      return false;
    }
    
    console.log("Stopping consciousness field recording");
    
    // Calculate duration
    this.activeState.duration = Date.now() - this.recordingStartTime;
    
    // Process the recording
    this._processRecording();
    
    // Add auto-tags if enabled
    if (this.options.autoTagging) {
      this._generateTags();
    }
    
    // Save the state
    this.fieldStates.unshift(this.activeState);
    
    // Save to local storage if enabled
    if (this.options.localStorage && typeof localStorage !== 'undefined') {
      this._saveStateToLocalStorage(this.activeState);
    }
    
    // Reset recording state
    const completedState = this.activeState;
    this.isRecording = false;
    this.recordingStartTime = null;
    this.activeState = null;
    
    // Trigger recording stopped event
    this._triggerEvent('recordingStopped', {
      state: completedState,
      duration: completedState.duration,
      snapshotCount: completedState.snapshots.length
    });
    
    return completedState;
  }
  
  /**
   * Capture the current consciousness field state
   * @param {Object} fieldState - The consciousness field state to capture
   */
  captureState(fieldState) {
    if (!this.isRecording || !this.activeState) {
      console.log("No active recording session");
      return false;
    }
    
    if (!fieldState) {
      console.error("No field state provided to capture");
      return false;
    }
    
    console.log("Capturing consciousness field snapshot");
    
    // Create a snapshot from the field state
    const snapshot = {
      timestamp: Date.now(),
      relativeTime: Date.now() - this.recordingStartTime,
      fieldState: this._compressFieldState(fieldState),
      coherence: fieldState.coherence || 0,
      intention: fieldState.observerState?.intention || ""
    };
    
    // Add to snapshots array
    this.activeState.snapshots.push(snapshot);
    
    // Update metadata
    this._updateStateMetadata(snapshot);
    
    // Trigger state captured event
    this._triggerEvent('stateCaptured', {
      stateId: this.activeState.id,
      snapshot: snapshot,
      snapshotCount: this.activeState.snapshots.length
    });
    
    return true;
  }
  
  /**
   * Save the current field state with a name and optional tags
   * @param {string} name - Name for the state
   * @param {Array} tags - Array of tags for the state
   */
  saveState(name, tags = []) {
    if (!this.activeState && !this.isRecording) {
      console.error("No active state to save");
      return false;
    }
    
    let stateToSave;
    
    if (this.isRecording) {
      // Stop the current recording and save it
      stateToSave = this.stopRecording();
    } else {
      stateToSave = this.activeState;
    }
    
    if (!stateToSave) {
      console.error("Failed to get state to save");
      return false;
    }
    
    // Update name and tags
    stateToSave.name = name || stateToSave.name;
    stateToSave.tags = tags.length > 0 ? tags : stateToSave.tags;
    
    // Ensure state is in field states list
    if (!this.fieldStates.find(state => state.id === stateToSave.id)) {
      this.fieldStates.unshift(stateToSave);
    }
    
    // Save to local storage if enabled
    if (this.options.localStorage && typeof localStorage !== 'undefined') {
      this._saveStateToLocalStorage(stateToSave);
    }
    
    // Trigger state saved event
    this._triggerEvent('stateSaved', {
      state: stateToSave,
      name: stateToSave.name,
      tags: stateToSave.tags
    });
    
    return stateToSave;
  }
  
  /**
   * Load a saved field state to become the active state
   * @param {string} stateId - ID of the state to load
   */
  loadState(stateId) {
    const state = this.fieldStates.find(s => s.id === stateId);
    
    if (!state) {
      console.error(`State with ID ${stateId} not found`);
      return false;
    }
    
    console.log(`Loading consciousness field state: ${state.name}`);
    
    // Stop any active recording or replay
    if (this.isRecording) {
      this.stopRecording();
    }
    
    if (this.isReplaying) {
      this.stopReplay();
    }
    
    // Set as active state
    this.activeState = state;
    
    // Trigger state loaded event
    this._triggerEvent('stateLoaded', {
      state: state,
      name: state.name,
      snapshotCount: state.snapshots.length
    });
    
    return state;
  }
  
  /**
   * Start replaying a field state
   * @param {string} stateId - ID of the state to replay (or active state if not provided)
   * @param {number} speed - Replay speed multiplier
   */
  startReplay(stateId, speed = 1.0) {
    // If stateId provided, load that state first
    if (stateId) {
      const loadResult = this.loadState(stateId);
      if (!loadResult) {
        return false;
      }
    }
    
    if (!this.activeState) {
      console.error("No active state to replay");
      return false;
    }
    
    if (this.isReplaying) {
      console.log("Already replaying a state");
      return false;
    }
    
    console.log(`Starting replay of state: ${this.activeState.name}`);
    
    this.isReplaying = true;
    this.replaySpeed = speed;
    
    // Get the snapshots sorted by relativeTime
    const snapshots = [...this.activeState.snapshots].sort((a, b) => a.relativeTime - b.relativeTime);
    
    if (snapshots.length === 0) {
      console.error("No snapshots to replay");
      this.isReplaying = false;
      return false;
    }
    
    // Set up the replay
    let snapshotIndex = 0;
    const startTime = Date.now();
    
    // Create replay interval
    this.replayInterval = setInterval(() => {
      // Calculate elapsed time with speed adjustment
      const elapsedTime = (Date.now() - startTime) * this.replaySpeed;
      
      // Find the snapshot that should be active at this time
      while (snapshotIndex < snapshots.length - 1 && 
             snapshots[snapshotIndex + 1].relativeTime <= elapsedTime) {
        snapshotIndex++;
      }
      
      // Check if we've reached the end
      if (snapshotIndex >= snapshots.length - 1 && 
          elapsedTime >= snapshots[snapshots.length - 1].relativeTime) {
        // End of replay
        this.stopReplay();
        return;
      }
      
      // Get the current snapshot
      const currentSnapshot = snapshots[snapshotIndex];
      
      // Apply the field state
      this._applyFieldState(currentSnapshot.fieldState);
      
      // Trigger snapshot applied event
      this._triggerEvent('replayProgress', {
        stateId: this.activeState.id,
        snapshot: currentSnapshot,
        progress: elapsedTime / this.activeState.duration,
        snapshotIndex: snapshotIndex,
        totalSnapshots: snapshots.length
      });
    }, 50); // Update at 20fps
    
    // Trigger replay started event
    this._triggerEvent('replayStarted', {
      stateId: this.activeState.id,
      stateName: this.activeState.name,
      speed: this.replaySpeed,
      duration: this.activeState.duration,
      snapshotCount: snapshots.length
    });
    
    return true;
  }
  
  /**
   * Stop the current replay
   */
  stopReplay() {
    if (!this.isReplaying) {
      console.log("No active replay to stop");
      return false;
    }
    
    console.log("Stopping consciousness field replay");
    
    // Clear the replay interval
    if (this.replayInterval) {
      clearInterval(this.replayInterval);
      this.replayInterval = null;
    }
    
    this.isReplaying = false;
    
    // Trigger replay stopped event
    this._triggerEvent('replayStopped', {
      stateId: this.activeState?.id,
      stateName: this.activeState?.name
    });
    
    return true;
  }
  
  /**
   * Export a field state to a JSON string
   * @param {string} stateId - ID of the state to export
   * @returns {string} - JSON string of the exported state
   */
  exportState(stateId) {
    const state = stateId ? 
      this.fieldStates.find(s => s.id === stateId) : 
      this.activeState;
    
    if (!state) {
      console.error("No state to export");
      return null;
    }
    
    console.log(`Exporting consciousness field state: ${state.name}`);
    
    // Create export object with metadata
    const exportData = {
      version: "1.0",
      exportedAt: Date.now(),
      format: "quantum-phi-field",
      state: state
    };
    
    // Trigger state exported event
    this._triggerEvent('stateExported', {
      stateId: state.id,
      stateName: state.name,
      exportSize: JSON.stringify(exportData).length
    });
    
    return JSON.stringify(exportData);
  }
  
  /**
   * Import a field state from a JSON string
   * @param {string} jsonString - JSON string of the state to import
   * @returns {Object} - The imported state
   */
  importState(jsonString) {
    if (!jsonString) {
      console.error("No JSON string provided for import");
      return false;
    }
    
    try {
      // Parse the JSON string
      const importData = JSON.parse(jsonString);
      
      if (!importData.state) {
        console.error("Invalid import data: no state found");
        return false;
      }
      
      // Verify state format
      if (importData.format !== "quantum-phi-field") {
        console.warn(`Importing non-standard format: ${importData.format}`);
      }
      
      const state = importData.state;
      
      // Generate a new ID to avoid collisions
      state.id = `state-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      state.importedAt = Date.now();
      
      // Add to field states
      this.fieldStates.unshift(state);
      
      // Set as active state
      this.activeState = state;
      
      // Save to local storage if enabled
      if (this.options.localStorage && typeof localStorage !== 'undefined') {
        this._saveStateToLocalStorage(state);
      }
      
      console.log(`Imported consciousness field state: ${state.name}`);
      
      // Trigger state imported event
      this._triggerEvent('stateImported', {
        stateId: state.id,
        stateName: state.name,
        snapshotCount: state.snapshots.length
      });
      
      return state;
    } catch (error) {
      console.error("Error importing state:", error);
      return false;
    }
  }
  
  /**
   * Get all saved field states
   */
  getStates() {
    return this.fieldStates;
  }
  
  /**
   * Get a state by ID
   * @param {string} stateId - ID of the state to get
   */
  getState(stateId) {
    return this.fieldStates.find(s => s.id === stateId);
  }
  
  /**
   * Delete a saved field state
   * @param {string} stateId - ID of the state to delete
   */
  deleteState(stateId) {
    const stateIndex = this.fieldStates.findIndex(s => s.id === stateId);
    
    if (stateIndex === -1) {
      console.error(`State with ID ${stateId} not found`);
      return false;
    }
    
    const state = this.fieldStates[stateIndex];
    
    // Remove from field states
    this.fieldStates.splice(stateIndex, 1);
    
    // If this is the active state, clear it
    if (this.activeState && this.activeState.id === stateId) {
      this.activeState = null;
    }
    
    // Remove from local storage if enabled
    if (this.options.localStorage && typeof localStorage !== 'undefined') {
      this._removeStateFromLocalStorage(stateId);
    }
    
    console.log(`Deleted consciousness field state: ${state.name}`);
    
    // Trigger state deleted event
    this._triggerEvent('stateDeleted', {
      stateId: stateId,
      stateName: state.name
    });
    
    return true;
  }
  
  /**
   * Add an event listener
   * @param {string} eventName - Name of the event
   * @param {function} callback - Callback function
   */
  addEventListener(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    
    this.eventListeners[eventName].push(callback);
  }
  
  /**
   * Remove an event listener
   * @param {string} eventName - Name of the event
   * @param {function} callback - Callback function to remove
   */
  removeEventListener(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      return;
    }
    
    this.eventListeners[eventName] = this.eventListeners[eventName].filter(
      listener => listener !== callback
    );
  }
  
  /**
   * Load states from local storage
   */
  loadStatesFromLocalStorage() {
    if (typeof localStorage === 'undefined') {
      return;
    }
    
    try {
      // Get state IDs
      const stateIds = JSON.parse(localStorage.getItem('consciousness-field-states') || '[]');
      
      // Load each state
      for (const stateId of stateIds) {
        const stateJson = localStorage.getItem(`consciousness-field-state-${stateId}`);
        
        if (stateJson) {
          try {
            const state = JSON.parse(stateJson);
            this.fieldStates.push(state);
          } catch (error) {
            console.error(`Error parsing state ${stateId}:`, error);
          }
        }
      }
      
      // Sort by creation date
      this.fieldStates.sort((a, b) => b.createdAt - a.createdAt);
      
      console.log(`Loaded ${this.fieldStates.length} consciousness field states from local storage`);
    } catch (error) {
      console.error("Error loading states from local storage:", error);
    }
  }
  
  /**
   * Compress a field state for storage
   * @param {Object} fieldState - The field state to compress
   * @returns {Object} - The compressed field state
   */
  _compressFieldState(fieldState) {
    if (!fieldState) {
      return null;
    }
    
    // If compression is disabled, just clone the state
    if (!this.options.autoCompressionEnabled) {
      return JSON.parse(JSON.stringify(fieldState));
    }
    
    const compressed = {
      dimensions: [],
      coherence: fieldState.coherence,
      phiResonance: fieldState.phiResonance,
      observerState: fieldState.observerState ? {...fieldState.observerState} : null
    };
    
    // Compress dimensions
    if (Array.isArray(fieldState.dimensions)) {
      for (let i = 0; i < fieldState.dimensions.length; i++) {
        const dimension = fieldState.dimensions[i];
        
        // Only include dimensions with high coherence if coherenceBiased is enabled
        if (this.options.coherenceBiased && 
            dimension.coherence < this.options.dimensionPreservation) {
          continue;
        }
        
        const compressedDimension = {
          level: dimension.level,
          coherence: dimension.coherence,
          frequency: dimension.frequency
        };
        
        // Compress field matrix if present
        if (dimension.fieldMatrix) {
          compressedDimension.fieldMatrix = this._compressFieldMatrix(
            dimension.fieldMatrix, 
            this.options.compressionLevel
          );
        }
        
        compressed.dimensions.push(compressedDimension);
      }
    }
    
    // Include a subset of the nodal network if present
    if (Array.isArray(fieldState.nodalNetwork)) {
      // Only include strong connections
      compressed.nodalNetwork = fieldState.nodalNetwork
        .filter(node => node.strength > 0.7)
        .map(node => ({
          source: node.source,
          target: node.target,
          strength: node.strength,
          phiResonance: node.phiResonance
        }));
    }
    
    return compressed;
  }
  
  /**
   * Compress a field matrix
   * @param {Array} matrix - The field matrix to compress
   * @param {number} level - Compression level (0-1)
   * @returns {Array} - The compressed matrix
   */
  _compressFieldMatrix(matrix, level) {
    if (!matrix || !Array.isArray(matrix)) {
      return null;
    }
    
    // Calculate reduced size based on compression level
    const originalSize = matrix.length;
    const reducedSize = Math.max(4, Math.ceil(originalSize * (1 - level)));
    
    // If phi quantization is enabled, adjust size to a phi-based value
    const finalSize = this.options.phiQuantization ? 
      Math.ceil(reducedSize * PHI) / PHI : 
      reducedSize;
    
    // Skip compression if the reduction is minimal
    if (finalSize >= originalSize * 0.9) {
      return JSON.parse(JSON.stringify(matrix));
    }
    
    // Create compressed matrix
    const compressed = [];
    const scale = originalSize / finalSize;
    
    for (let i = 0; i < finalSize; i++) {
      compressed[i] = [];
      
      for (let j = 0; j < finalSize; j++) {
        // Get average of the corresponding area in the original matrix
        let sum = 0;
        let count = 0;
        
        const startI = Math.floor(i * scale);
        const endI = Math.min(originalSize - 1, Math.floor((i + 1) * scale));
        const startJ = Math.floor(j * scale);
        const endJ = Math.min(originalSize - 1, Math.floor((j + 1) * scale));
        
        for (let ii = startI; ii <= endI; ii++) {
          for (let jj = startJ; jj <= endJ; jj++) {
            if (matrix[ii] && typeof matrix[ii][jj] === 'number') {
              sum += matrix[ii][jj];
              count++;
            }
          }
        }
        
        compressed[i][j] = count > 0 ? sum / count : 0;
      }
    }
    
    return compressed;
  }
  
  /**
   * Process a recording for final storage
   */
  _processRecording() {
    if (!this.activeState) {
      return;
    }
    
    // Calculate metadata
    this._calculateFinalMetadata();
    
    // Reduce snapshot count if there are too many
    if (this.activeState.snapshots.length > 100) {
      this._reduceSnapshots();
    }
  }
  
  /**
   * Calculate final metadata for a completed recording
   */
  _calculateFinalMetadata() {
    if (!this.activeState || !this.activeState.snapshots.length) {
      return;
    }
    
    // Calculate average coherence
    let totalCoherence = 0;
    let maxCoherence = 0;
    let frequencyCounts = {};
    let intentionWords = {};
    
    for (const snapshot of this.activeState.snapshots) {
      // Update coherence stats
      totalCoherence += snapshot.coherence;
      maxCoherence = Math.max(maxCoherence, snapshot.coherence);
      
      // Count dominant frequencies
      if (snapshot.fieldState && snapshot.fieldState.dimensions) {
        for (const dimension of snapshot.fieldState.dimensions) {
          if (dimension.frequency) {
            frequencyCounts[dimension.frequency] = (frequencyCounts[dimension.frequency] || 0) + 1;
          }
        }
      }
      
      // Extract intention keywords
      if (snapshot.intention) {
        const words = snapshot.intention.toLowerCase().split(/\s+/);
        for (const word of words) {
          if (word.length > 3) { // Skip short words
            intentionWords[word] = (intentionWords[word] || 0) + 1;
          }
        }
      }
    }
    
    // Update metadata
    this.activeState.metadata.averageCoherence = totalCoherence / this.activeState.snapshots.length;
    this.activeState.metadata.peakCoherence = maxCoherence;
    
    // Find dominant frequency
    let maxCount = 0;
    for (const [freq, count] of Object.entries(frequencyCounts)) {
      if (count > maxCount) {
        maxCount = count;
        this.activeState.metadata.dominantFrequency = parseInt(freq);
      }
    }
    
    // Extract top intention keywords
    this.activeState.metadata.intentionKeywords = Object.entries(intentionWords)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(entry => entry[0]);
  }
  
  /**
   * Reduce the number of snapshots in a recording
   */
  _reduceSnapshots() {
    if (!this.activeState || this.activeState.snapshots.length <= 100) {
      return;
    }
    
    // Sort snapshots by time
    const sortedSnapshots = [...this.activeState.snapshots].sort((a, b) => a.relativeTime - b.relativeTime);
    
    // Keep important snapshots (first, last, high coherence)
    const firstSnapshot = sortedSnapshots[0];
    const lastSnapshot = sortedSnapshots[sortedSnapshots.length - 1];
    
    // Find high coherence snapshots
    const highCoherenceSnapshots = sortedSnapshots
      .filter(s => s.coherence > this.activeState.metadata.averageCoherence * 1.2)
      .slice(0, 10);
    
    // Calculate intervals for regular sampling
    const duration = this.activeState.duration;
    const targetCount = 90 - highCoherenceSnapshots.length;
    const interval = duration / targetCount;
    
    // Select snapshots at regular intervals
    const selectedSnapshots = [];
    for (let i = 0; i < targetCount; i++) {
      const targetTime = i * interval;
      
      // Find snapshot closest to target time
      let closestSnapshot = null;
      let minTimeDiff = Infinity;
      
      for (const snapshot of sortedSnapshots) {
        const timeDiff = Math.abs(snapshot.relativeTime - targetTime);
        if (timeDiff < minTimeDiff) {
          minTimeDiff = timeDiff;
          closestSnapshot = snapshot;
        }
      }
      
      if (closestSnapshot) {
        selectedSnapshots.push(closestSnapshot);
      }
    }
    
    // Combine all selected snapshots
    const finalSnapshots = [
      firstSnapshot,
      ...highCoherenceSnapshots,
      ...selectedSnapshots,
      lastSnapshot
    ];
    
    // Remove duplicates
    const uniqueSnapshots = [];
    const seenIds = new Set();
    
    for (const snapshot of finalSnapshots) {
      if (!seenIds.has(snapshot.timestamp)) {
        seenIds.add(snapshot.timestamp);
        uniqueSnapshots.push(snapshot);
      }
    }
    
    // Sort by time
    uniqueSnapshots.sort((a, b) => a.relativeTime - b.relativeTime);
    
    // Update snapshots
    this.activeState.snapshots = uniqueSnapshots;
    
    console.log(`Reduced snapshots from ${sortedSnapshots.length} to ${uniqueSnapshots.length}`);
  }
  
  /**
   * Generate tags for a recorded state
   */
  _generateTags() {
    if (!this.activeState) {
      return;
    }
    
    const tags = [];
    
    // Add coherence level tag
    const avgCoherence = this.activeState.metadata.averageCoherence;
    if (avgCoherence > 0.9) {
      tags.push('high-coherence');
    } else if (avgCoherence > 0.7) {
      tags.push('medium-coherence');
    } else {
      tags.push('low-coherence');
    }
    
    // Add frequency tag
    const dominantFreq = this.activeState.metadata.dominantFrequency;
    for (const [name, freq] of Object.entries(QUANTUM_HARMONICS)) {
      if (Math.abs(dominantFreq - freq) < 20) {
        tags.push(`frequency-${name}`);
        break;
      }
    }
    
    // Add intention tags from keywords
    for (const keyword of this.activeState.metadata.intentionKeywords.slice(0, 2)) {
      tags.push(`intent-${keyword}`);
    }
    
    // Add duration tag
    const durationMinutes = this.activeState.duration / 60000;
    if (durationMinutes < 1) {
      tags.push('quick-state');
    } else if (durationMinutes > 10) {
      tags.push('extended-state');
    }
    
    // Update state tags
    this.activeState.tags = [...new Set([...this.activeState.tags, ...tags])];
  }
  
  /**
   * Update state metadata with a new snapshot
   * @param {Object} snapshot - The new snapshot
   */
  _updateStateMetadata(snapshot) {
    if (!this.activeState || !snapshot) {
      return;
    }
    
    // Update coherence stats
    this.activeState.metadata.peakCoherence = Math.max(
      this.activeState.metadata.peakCoherence,
      snapshot.coherence
    );
    
    // Extract intention keywords
    if (snapshot.intention) {
      const words = snapshot.intention.toLowerCase().split(/\s+/);
      
      // Track unique keywords
      const currentKeywords = new Set(this.activeState.metadata.intentionKeywords);
      
      for (const word of words) {
        if (word.length > 3) { // Skip short words
          currentKeywords.add(word);
        }
      }
      
      this.activeState.metadata.intentionKeywords = [...currentKeywords];
    }
    
    // Track dominant frequency
    if (snapshot.fieldState && snapshot.fieldState.dimensions) {
      const frequencies = snapshot.fieldState.dimensions
        .filter(d => d.coherence > 0.7)
        .map(d => d.frequency);
      
      if (frequencies.length > 0) {
        // Simple average for now
        const avgFreq = frequencies.reduce((sum, freq) => sum + freq, 0) / frequencies.length;
        
        // Weighted average with existing value
        if (this.activeState.metadata.dominantFrequency) {
          this.activeState.metadata.dominantFrequency = 
            (this.activeState.metadata.dominantFrequency * 0.9) + (avgFreq * 0.1);
        } else {
          this.activeState.metadata.dominantFrequency = avgFreq;
        }
      }
    }
  }
  
  /**
   * Apply a field state to connected systems
   * @param {Object} fieldState - The field state to apply
   */
  _applyFieldState(fieldState) {
    if (!fieldState) {
      return;
    }
    
    // If connected to a coherence bridge, apply through that
    if (this.coherenceBridge && this.coherenceBridge.sharedConsciousnessField) {
      // Integrate field state into the bridge
      this.coherenceBridge._integrateFieldState(fieldState);
      
      // Transfer to connected systems
      this.coherenceBridge.transferFieldState();
    }
    
    // Trigger field state applied event
    this._triggerEvent('fieldStateApplied', {
      fieldState: fieldState,
      coherence: fieldState.coherence
    });
  }
  
  /**
   * Save a state to local storage
   * @param {Object} state - The state to save
   */
  _saveStateToLocalStorage(state) {
    if (typeof localStorage === 'undefined' || !state) {
      return;
    }
    
    try {
      // Get existing state IDs
      const stateIds = JSON.parse(localStorage.getItem('consciousness-field-states') || '[]');
      
      // Add this state ID if not already present
      if (!stateIds.includes(state.id)) {
        stateIds.unshift(state.id);
        
        // Limit number of states
        if (stateIds.length > this.options.maxLocalStates) {
          const removedIds = stateIds.splice(this.options.maxLocalStates);
          
          // Remove excess states
          for (const id of removedIds) {
            localStorage.removeItem(`consciousness-field-state-${id}`);
          }
        }
        
        // Save updated state IDs
        localStorage.setItem('consciousness-field-states', JSON.stringify(stateIds));
      }
      
      // Save state
      localStorage.setItem(`consciousness-field-state-${state.id}`, JSON.stringify(state));
    } catch (error) {
      console.error("Error saving state to local storage:", error);
    }
  }
  
  /**
   * Remove a state from local storage
   * @param {string} stateId - The ID of the state to remove
   */
  _removeStateFromLocalStorage(stateId) {
    if (typeof localStorage === 'undefined') {
      return;
    }
    
    try {
      // Get existing state IDs
      const stateIds = JSON.parse(localStorage.getItem('consciousness-field-states') || '[]');
      
      // Remove this state ID
      const updatedIds = stateIds.filter(id => id !== stateId);
      
      // Save updated state IDs
      localStorage.setItem('consciousness-field-states', JSON.stringify(updatedIds));
      
      // Remove state
      localStorage.removeItem(`consciousness-field-state-${stateId}`);
    } catch (error) {
      console.error("Error removing state from local storage:", error);
    }
  }
  
  /**
   * Trigger an event
   * @param {string} eventName - Name of the event
   * @param {object} data - Event data
   */
  _triggerEvent(eventName, data = {}) {
    if (!this.eventListeners[eventName]) {
      return;
    }
    
    // Add standard event data
    const eventData = {
      ...data,
      timestamp: Date.now(),
      recorderId: this.id,
      isRecording: this.isRecording,
      isReplaying: this.isReplaying
    };
    
    // Call all listeners
    this.eventListeners[eventName].forEach(callback => {
      try {
        callback(eventData);
      } catch (error) {
        console.error(`Error in ${eventName} event listener:`, error);
      }
    });
  }
}

// Export the recorder if we're in a module environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ConsciousnessFieldRecorder,
    Constants: {
      PHI,
      LAMBDA,
      PHI_PHI,
      QUANTUM_HARMONICS
    }
  };
}