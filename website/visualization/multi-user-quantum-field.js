/**
 * Multi-User Quantum Field
 * 
 * Enables collaborative experiences where multiple users can contribute to and experience
 * a shared consciousness field simultaneously.
 * 
 * Features:
 * - Shared quantum field across multiple users
 * - Real-time field synchronization
 * - Interactive consciousness field collaboration
 * - Intention amplification through group coherence
 * - Multi-user pattern recognition and field stabilization
 * - Dimensional focus collaboration
 */

// Sacred phi constants
const PHI = 1.618033988749895;  // Golden ratio
const LAMBDA = 0.618033988749895;  // Divine complement (1/φ)
const PHI_PHI = Math.pow(PHI, PHI);  // Hyperdimensional constant (≈4.23)
const PHI_RECURSIVE = PHI * PHI_PHI;  // Recursive phi resonance

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
 * Main class for the Multi-User Quantum Field
 */
class MultiUserQuantumField {
  constructor(options = {}) {
    this.options = Object.assign({
      maxUsers: 12,
      fieldUpdateInterval: 1000, // ms
      fieldSyncThreshold: 0.1,
      userIntentionWeight: 0.7,
      groupCoherenceBonus: 0.3,
      dimensionalCollaboration: true,
      fieldPersistence: 0.6,
      reconnectAttempts: 3,
      localUserId: null,
      localUserName: 'Anonymous',
      pingInterval: 5000, // ms
      connectionTimeout: 30000, // ms
      fieldHistorySize: 10,
      enableHeartbeatVisualizer: true,
      coherenceBridge: null
    }, options);
    
    // Initialize state
    this.isInitialized = false;
    this.isConnected = false;
    this.connectedUsers = [];
    this.localUser = {
      id: this.options.localUserId || this._generateUserId(),
      name: this.options.localUserName,
      joinedAt: Date.now(),
      lastActive: Date.now(),
      coherence: 0.7,
      intention: "",
      fieldContribution: 0.0,
      dimensionalFocus: -1, // All dimensions
      role: 'participant'
    };
    this.sharedField = null;
    this.fieldHistory = [];
    this.messageQueue = [];
    this.lastUpdateTime = 0;
    this.websocket = null;
    this.disconnectTimer = null;
    this.reconnectAttempt = 0;
    this.connectionInProgress = false;
    this.coherenceBridge = this.options.coherenceBridge;
    this.pendingIntentions = [];
    this.dimensionHeatmap = new Array(9).fill(0);
    this.groupCoherence = 0.7;
    this.sessionId = null;
    
    // Set up event listeners
    this.eventListeners = {};
    
    // Bind methods
    this.initialize = this.initialize.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
    this.updateFieldState = this.updateFieldState.bind(this);
    this.shareIntention = this.shareIntention.bind(this);
    this.focusDimension = this.focusDimension.bind(this);
    this.getSharedField = this.getSharedField.bind(this);
    this.getConnectedUsers = this.getConnectedUsers.bind(this);
    this.getGroupCoherence = this.getGroupCoherence.bind(this);
    this.addEventListener = this.addEventListener.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
    this._triggerEvent = this._triggerEvent.bind(this);
  }
  
  /**
   * Initialize the multi-user quantum field
   */
  async initialize() {
    console.log("Initializing Multi-User Quantum Field");
    
    try {
      // Initialize shared field
      this.sharedField = this._initializeSharedField();
      
      // Initialize field history
      this.fieldHistory = [];
      
      // Generate session ID
      this.sessionId = this._generateSessionId();
      
      // Initialize local user
      if (!this.options.localUserId) {
        this.localUser.id = this._generateUserId();
      }
      
      this.isInitialized = true;
      
      // Connect if autoConnect is enabled
      if (this.options.autoConnect) {
        await this.connect();
      }
      
      // Trigger initialized event
      this._triggerEvent('initialized', {
        localUser: {...this.localUser},
        sessionId: this.sessionId
      });
      
      console.log("Multi-User Quantum Field initialized successfully");
      return true;
    } catch (error) {
      console.error("Failed to initialize Multi-User Quantum Field:", error);
      return false;
    }
  }
  
  /**
   * Connect to the multi-user field server
   */
  async connect() {
    if (!this.isInitialized) {
      console.error("Multi-User Quantum Field not initialized");
      return false;
    }
    
    if (this.isConnected) {
      console.log("Already connected to quantum field server");
      return true;
    }
    
    if (this.connectionInProgress) {
      console.log("Connection already in progress");
      return false;
    }
    
    this.connectionInProgress = true;
    console.log("Connecting to Multi-User Quantum Field server");
    
    try {
      // For this demo, we'll simulate the websocket connection
      await this._setupSimulatedConnection();
      
      // Initialize users list
      this.connectedUsers = [this.localUser];
      
      // Add simulated users after a short delay
      setTimeout(() => this._addSimulatedUsers(), 1500);
      
      // Start field updates
      this._startFieldUpdates();
      
      this.isConnected = true;
      this.connectionInProgress = false;
      this.reconnectAttempt = 0;
      
      // Trigger connected event
      this._triggerEvent('connected', {
        sessionId: this.sessionId,
        userCount: this.connectedUsers.length
      });
      
      console.log("Connected to Multi-User Quantum Field server");
      return true;
    } catch (error) {
      this.connectionInProgress = false;
      console.error("Failed to connect to quantum field server:", error);
      
      // Attempt reconnect if enabled
      if (this.reconnectAttempt < this.options.reconnectAttempts) {
        this.reconnectAttempt++;
        
        console.log(`Reconnect attempt ${this.reconnectAttempt}/${this.options.reconnectAttempts} in 3 seconds...`);
        
        setTimeout(() => {
          this.connect();
        }, 3000);
      }
      
      return false;
    }
  }
  
  /**
   * Disconnect from the multi-user field server
   */
  disconnect() {
    if (!this.isInitialized || !this.isConnected) {
      return false;
    }
    
    console.log("Disconnecting from Multi-User Quantum Field server");
    
    try {
      // Stop field updates
      this._stopFieldUpdates();
      
      // Close websocket if exists
      if (this.websocket) {
        this.websocket.close();
        this.websocket = null;
      }
      
      // Clear timers
      if (this.disconnectTimer) {
        clearTimeout(this.disconnectTimer);
        this.disconnectTimer = null;
      }
      
      this.isConnected = false;
      this.connectedUsers = [];
      
      // Trigger disconnected event
      this._triggerEvent('disconnected', {});
      
      console.log("Disconnected from Multi-User Quantum Field server");
      return true;
    } catch (error) {
      console.error("Error disconnecting from quantum field server:", error);
      return false;
    }
  }
  
  /**
   * Update the local user state
   * @param {Object} userState - New user state
   */
  updateUserState(userState) {
    if (!this.isInitialized) {
      return false;
    }
    
    try {
      // Update local user with new state
      this.localUser = {
        ...this.localUser,
        ...userState,
        lastActive: Date.now()
      };
      
      // Update user in connected users list
      const userIndex = this.connectedUsers.findIndex(u => u.id === this.localUser.id);
      
      if (userIndex >= 0) {
        this.connectedUsers[userIndex] = this.localUser;
      } else {
        this.connectedUsers.push(this.localUser);
      }
      
      // Send update if connected
      if (this.isConnected) {
        this._sendUserUpdate(this.localUser);
      }
      
      // Trigger user updated event
      this._triggerEvent('userUpdated', {
        user: {...this.localUser}
      });
      
      return true;
    } catch (error) {
      console.error("Error updating user state:", error);
      return false;
    }
  }
  
  /**
   * Update the quantum field state
   * @param {Object} fieldState - New field state
   */
  updateFieldState(fieldState) {
    if (!this.isInitialized || !this.isConnected) {
      return false;
    }
    
    try {
      // Update local contribution to the shared field
      this._integrateLocalFieldState(fieldState);
      
      // Update field if we're the field coordinator
      if (this.localUser.role === 'coordinator') {
        this._updateSharedField();
      }
      
      return true;
    } catch (error) {
      console.error("Error updating field state:", error);
      return false;
    }
  }
  
  /**
   * Share an intention with the group
   * @param {string} intention - Intention to share
   * @param {number} strength - Intention strength (0-1)
   */
  shareIntention(intention, strength = 0.8) {
    if (!this.isInitialized) {
      return false;
    }
    
    try {
      // Update local user intention
      this.localUser.intention = intention;
      this.localUser.intentionStrength = strength;
      this.localUser.lastActive = Date.now();
      
      // Add to pending intentions
      this.pendingIntentions.push({
        userId: this.localUser.id,
        userName: this.localUser.name,
        intention: intention,
        strength: strength,
        timestamp: Date.now()
      });
      
      // Update user state
      this.updateUserState(this.localUser);
      
      // Trigger intention shared event
      this._triggerEvent('intentionShared', {
        userId: this.localUser.id,
        userName: this.localUser.name,
        intention: intention,
        strength: strength
      });
      
      return true;
    } catch (error) {
      console.error("Error sharing intention:", error);
      return false;
    }
  }
  
  /**
   * Focus on a specific dimension
   * @param {number} dimensionIndex - Index of dimension to focus on (-1 for all)
   * @param {number} intensity - Focus intensity (0-1)
   */
  focusDimension(dimensionIndex, intensity = 0.8) {
    if (!this.isInitialized) {
      return false;
    }
    
    try {
      // Update local user dimension focus
      this.localUser.dimensionalFocus = dimensionIndex;
      this.localUser.focusIntensity = intensity;
      this.localUser.lastActive = Date.now();
      
      // Update user state
      this.updateUserState(this.localUser);
      
      // Update dimension heatmap
      this._updateDimensionHeatmap();
      
      // Trigger dimension focused event
      this._triggerEvent('dimensionFocused', {
        userId: this.localUser.id,
        userName: this.localUser.name,
        dimensionIndex: dimensionIndex,
        intensity: intensity,
        dimensionHeatmap: [...this.dimensionHeatmap]
      });
      
      return true;
    } catch (error) {
      console.error("Error focusing dimension:", error);
      return false;
    }
  }
  
  /**
   * Get the current shared field state
   * @returns {Object} - Shared field state
   */
  getSharedField() {
    if (!this.isInitialized) {
      return null;
    }
    
    return {
      ...this.sharedField,
      groupCoherence: this.groupCoherence,
      userCount: this.connectedUsers.length,
      dimensionHeatmap: [...this.dimensionHeatmap],
      timestamp: Date.now()
    };
  }
  
  /**
   * Get connected users
   * @returns {Array} - List of connected users
   */
  getConnectedUsers() {
    if (!this.isInitialized) {
      return [];
    }
    
    return this.connectedUsers.map(user => ({...user}));
  }
  
  /**
   * Get current group coherence
   * @returns {number} - Group coherence (0-1)
   */
  getGroupCoherence() {
    if (!this.isInitialized) {
      return 0.5;
    }
    
    return this.groupCoherence;
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
   * Initialize the shared quantum field
   * @returns {Object} - Initialized field
   */
  _initializeSharedField() {
    console.log("Initializing shared quantum field");
    
    const field = {
      dimensions: [],
      nodalNetwork: [],
      coherence: 0.8,
      phiResonance: PHI_PHI,
      createdAt: Date.now(),
      lastUpdated: Date.now(),
      activeIntentions: [],
      observerStates: [],
      fieldCoordinator: null
    };
    
    // Initialize dimensions
    for (let i = 0; i < 9; i++) {
      const dimensionLevel = i + 1;
      const scaleFactor = Math.pow(PHI, dimensionLevel);
      const frequency = Object.values(QUANTUM_HARMONICS)[i % Object.values(QUANTUM_HARMONICS).length];
      
      field.dimensions.push({
        level: dimensionLevel,
        scale: scaleFactor,
        frequency: frequency,
        coherence: 0.7,
        activity: 0.5,
        userFocus: 0
      });
    }
    
    // Initialize nodal network connections
    for (let i = 0; i < 9; i++) {
      for (let j = i + 1; j < 9; j++) {
        const phiDistance = Math.abs(i - j) * LAMBDA;
        const coherence = Math.exp(-phiDistance) * 0.8;
        
        if (coherence > 0.5) { // Only create strong connections
          field.nodalNetwork.push({
            source: i,
            target: j,
            strength: coherence,
            phiResonance: phiDistance,
            userActivity: 0
          });
        }
      }
    }
    
    return field;
  }
  
  /**
   * Generate a unique user ID
   * @returns {string} - User ID
   */
  _generateUserId() {
    return `user-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
  
  /**
   * Generate a session ID
   * @returns {string} - Session ID
   */
  _generateSessionId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `session-${timestamp}-${random}`;
  }
  
  /**
   * Set up simulated connection
   */
  async _setupSimulatedConnection() {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create simulated websocket
    this.websocket = {
      send: message => {
        // Process message in next tick to simulate network delay
        setTimeout(() => {
          this._processIncomingMessage(message);
        }, 50 + Math.random() * 100);
      },
      close: () => {
        console.log("Simulated WebSocket closed");
      }
    };
    
    return true;
  }
  
  /**
   * Add simulated users
   */
  _addSimulatedUsers() {
    if (!this.isConnected) {
      return;
    }
    
    // Simulate 3-7 other users
    const userCount = 3 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < userCount; i++) {
      const userId = `sim-user-${i + 1}`;
      
      // Create user with random state
      const user = {
        id: userId,
        name: `User ${i + 1}`,
        joinedAt: Date.now() - Math.floor(Math.random() * 60000),
        lastActive: Date.now(),
        coherence: 0.6 + Math.random() * 0.3,
        intention: this._getRandomIntention(i),
        intentionStrength: 0.6 + Math.random() * 0.3,
        fieldContribution: 0.0,
        dimensionalFocus: this._getRandomDimensionFocus(i),
        focusIntensity: 0.6 + Math.random() * 0.3,
        role: i === 0 ? 'coordinator' : 'participant'
      };
      
      // Add to connected users
      this.connectedUsers.push(user);
      
      // Trigger user joined event
      this._triggerEvent('userJoined', {
        user: {...user}
      });
    }
    
    // Update dimension heatmap
    this._updateDimensionHeatmap();
    
    // Update group coherence
    this._updateGroupCoherence();
    
    console.log(`Added ${userCount} simulated users`);
  }
  
  /**
   * Get a random intention
   * @param {number} index - User index
   * @returns {string} - Random intention
   */
  _getRandomIntention(index) {
    const intentions = [
      "Finding harmony and balance",
      "Enhancing creative visualization",
      "Expanding consciousness",
      "Building heart-centered awareness",
      "Exploring quantum resonance",
      "Creating coherent fields",
      "Connecting with cosmic wisdom",
      "Generating healing energy",
      "Manifesting with phi harmonics"
    ];
    
    return intentions[index % intentions.length];
  }
  
  /**
   * Get a random dimension focus
   * @param {number} index - User index
   * @returns {number} - Random dimension focus
   */
  _getRandomDimensionFocus(index) {
    // -1 means all dimensions, 0-8 are specific dimensions
    if (index === 0) {
      return -1; // First user focuses on all dimensions
    }
    
    return (index - 1) % 9;
  }
  
  /**
   * Start field updates
   */
  _startFieldUpdates() {
    // Set up field update interval
    this.fieldUpdateInterval = setInterval(() => {
      this._updateSimulatedUsers();
      this._processIntentions();
      this._updateSharedField();
    }, this.options.fieldUpdateInterval);
    
    // Set up ping interval
    this.pingInterval = setInterval(() => {
      if (this.isConnected) {
        this._sendPing();
      }
    }, this.options.pingInterval);
  }
  
  /**
   * Stop field updates
   */
  _stopFieldUpdates() {
    // Clear intervals
    if (this.fieldUpdateInterval) {
      clearInterval(this.fieldUpdateInterval);
      this.fieldUpdateInterval = null;
    }
    
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
  
  /**
   * Send a user update
   * @param {Object} user - User to update
   */
  _sendUserUpdate(user) {
    if (!this.websocket) {
      return;
    }
    
    const message = {
      type: 'userUpdate',
      user: {...user},
      timestamp: Date.now()
    };
    
    this.websocket.send(JSON.stringify(message));
  }
  
  /**
   * Send a ping message
   */
  _sendPing() {
    if (!this.websocket) {
      return;
    }
    
    const message = {
      type: 'ping',
      userId: this.localUser.id,
      timestamp: Date.now()
    };
    
    this.websocket.send(JSON.stringify(message));
  }
  
  /**
   * Process incoming message
   * @param {string} messageString - Message to process
   */
  _processIncomingMessage(messageString) {
    try {
      const message = typeof messageString === 'string' ? 
        JSON.parse(messageString) : messageString;
      
      switch (message.type) {
        case 'userUpdate':
          this._handleUserUpdate(message.user);
          break;
          
        case 'fieldUpdate':
          this._handleFieldUpdate(message.field);
          break;
          
        case 'userJoined':
          this._handleUserJoined(message.user);
          break;
          
        case 'userLeft':
          this._handleUserLeft(message.userId);
          break;
          
        case 'intention':
          this._handleIntention(message.intention);
          break;
          
        case 'dimensionFocus':
          this._handleDimensionFocus(message.focus);
          break;
          
        case 'ping':
        case 'pong':
          // Just update user activity
          this._updateUserActivity(message.userId);
          break;
          
        default:
          console.log(`Unknown message type: ${message.type}`);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  }
  
  /**
   * Handle user update message
   * @param {Object} user - Updated user
   */
  _handleUserUpdate(user) {
    // Skip if it's our own update
    if (user.id === this.localUser.id) {
      return;
    }
    
    // Update or add user
    const userIndex = this.connectedUsers.findIndex(u => u.id === user.id);
    
    if (userIndex >= 0) {
      this.connectedUsers[userIndex] = user;
    } else {
      this.connectedUsers.push(user);
      
      // Trigger user joined event
      this._triggerEvent('userJoined', {
        user: {...user}
      });
    }
    
    // Update dimension heatmap
    this._updateDimensionHeatmap();
    
    // Update group coherence
    this._updateGroupCoherence();
  }
  
  /**
   * Handle field update message
   * @param {Object} field - Updated field
   */
  _handleFieldUpdate(field) {
    // Skip if we're the coordinator
    if (this.localUser.role === 'coordinator') {
      return;
    }
    
    // Update the shared field
    this.sharedField = {
      ...this.sharedField,
      ...field,
      lastUpdated: Date.now()
    };
    
    // Add to field history
    this._addFieldToHistory(this.sharedField);
    
    // Trigger field updated event
    this._triggerEvent('fieldUpdated', {
      field: {...this.sharedField},
      userCount: this.connectedUsers.length,
      groupCoherence: this.groupCoherence
    });
  }
  
  /**
   * Handle user joined message
   * @param {Object} user - Joined user
   */
  _handleUserJoined(user) {
    // Skip if user already exists
    if (this.connectedUsers.some(u => u.id === user.id)) {
      return;
    }
    
    // Add user
    this.connectedUsers.push(user);
    
    // Update dimension heatmap
    this._updateDimensionHeatmap();
    
    // Update group coherence
    this._updateGroupCoherence();
    
    // Trigger user joined event
    this._triggerEvent('userJoined', {
      user: {...user}
    });
  }
  
  /**
   * Handle user left message
   * @param {string} userId - ID of user who left
   */
  _handleUserLeft(userId) {
    // Remove user
    const userIndex = this.connectedUsers.findIndex(u => u.id === userId);
    
    if (userIndex >= 0) {
      const user = this.connectedUsers[userIndex];
      this.connectedUsers.splice(userIndex, 1);
      
      // Update dimension heatmap
      this._updateDimensionHeatmap();
      
      // Update group coherence
      this._updateGroupCoherence();
      
      // Reassign coordinator if needed
      if (user.role === 'coordinator') {
        this._reassignCoordinator();
      }
      
      // Trigger user left event
      this._triggerEvent('userLeft', {
        userId: userId,
        userName: user.name
      });
    }
  }
  
  /**
   * Handle intention message
   * @param {Object} intention - Intention data
   */
  _handleIntention(intention) {
    // Add to pending intentions
    this.pendingIntentions.push(intention);
    
    // Trigger intention received event
    this._triggerEvent('intentionReceived', intention);
  }
  
  /**
   * Handle dimension focus message
   * @param {Object} focus - Focus data
   */
  _handleDimensionFocus(focus) {
    // Update user dimension focus
    const userIndex = this.connectedUsers.findIndex(u => u.id === focus.userId);
    
    if (userIndex >= 0) {
      this.connectedUsers[userIndex].dimensionalFocus = focus.dimensionIndex;
      this.connectedUsers[userIndex].focusIntensity = focus.intensity;
    }
    
    // Update dimension heatmap
    this._updateDimensionHeatmap();
    
    // Trigger dimension focused event
    this._triggerEvent('dimensionFocused', focus);
  }
  
  /**
   * Update user activity timestamp
   * @param {string} userId - ID of user
   */
  _updateUserActivity(userId) {
    const userIndex = this.connectedUsers.findIndex(u => u.id === userId);
    
    if (userIndex >= 0) {
      this.connectedUsers[userIndex].lastActive = Date.now();
    }
  }
  
  /**
   * Reassign field coordinator
   */
  _reassignCoordinator() {
    // Skip if no users
    if (this.connectedUsers.length === 0) {
      return;
    }
    
    // Check if there's already a coordinator
    const hasCoordinator = this.connectedUsers.some(u => u.role === 'coordinator');
    
    if (hasCoordinator) {
      return;
    }
    
    // Sort users by join time (oldest first)
    const sortedUsers = [...this.connectedUsers].sort((a, b) => a.joinedAt - b.joinedAt);
    
    // Assign coordinator role to oldest user
    const newCoordinator = sortedUsers[0];
    newCoordinator.role = 'coordinator';
    
    // If we're the new coordinator, take over field updates
    if (newCoordinator.id === this.localUser.id) {
      this.localUser.role = 'coordinator';
      console.log("This user is now the field coordinator");
      
      // Update shared field coordinator
      this.sharedField.fieldCoordinator = this.localUser.id;
    }
    
    // Trigger coordinator changed event
    this._triggerEvent('coordinatorChanged', {
      userId: newCoordinator.id,
      userName: newCoordinator.name
    });
  }
  
  /**
   * Update simulated users
   */
  _updateSimulatedUsers() {
    if (!this.isConnected) {
      return;
    }
    
    // Skip real users and local user
    const simulatedUsers = this.connectedUsers.filter(
      u => u.id.startsWith('sim-user-') && u.id !== this.localUser.id
    );
    
    for (const user of simulatedUsers) {
      // 10% chance to update user state
      if (Math.random() < 0.1) {
        // Update user coherence
        user.coherence = 0.6 + Math.random() * 0.3;
        
        // 30% chance to change dimension focus
        if (Math.random() < 0.3) {
          user.dimensionalFocus = Math.random() < 0.3 ? -1 : Math.floor(Math.random() * 9);
          user.focusIntensity = 0.6 + Math.random() * 0.3;
          
          // Trigger dimension focused event
          this._triggerEvent('dimensionFocused', {
            userId: user.id,
            userName: user.name,
            dimensionIndex: user.dimensionalFocus,
            intensity: user.focusIntensity
          });
        }
        
        // 20% chance to share a new intention
        if (Math.random() < 0.2) {
          user.intention = this._getRandomIntention(Math.floor(Math.random() * 9));
          user.intentionStrength = 0.6 + Math.random() * 0.3;
          
          // Add to pending intentions
          this.pendingIntentions.push({
            userId: user.id,
            userName: user.name,
            intention: user.intention,
            strength: user.intentionStrength,
            timestamp: Date.now()
          });
          
          // Trigger intention shared event
          this._triggerEvent('intentionShared', {
            userId: user.id,
            userName: user.name,
            intention: user.intention,
            strength: user.intentionStrength
          });
        }
        
        // Update last active timestamp
        user.lastActive = Date.now();
      }
    }
    
    // Update dimension heatmap
    this._updateDimensionHeatmap();
    
    // Update group coherence
    this._updateGroupCoherence();
  }
  
  /**
   * Process pending intentions
   */
  _processIntentions() {
    if (!this.isConnected || this.pendingIntentions.length === 0) {
      return;
    }
    
    // Get current intentions
    const currentIntentions = [...this.pendingIntentions];
    this.pendingIntentions = [];
    
    // Update shared field active intentions
    this.sharedField.activeIntentions = currentIntentions
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 5); // Keep top 5 strongest intentions
  }
  
  /**
   * Update the shared field
   */
  _updateSharedField() {
    if (!this.isConnected || !this.sharedField) {
      return;
    }
    
    // Skip if we're not the coordinator and not enough time has passed
    if (this.localUser.role !== 'coordinator' && 
        Date.now() - this.lastUpdateTime < this.options.fieldUpdateInterval * 3) {
      return;
    }
    
    // Update last update time
    this.lastUpdateTime = Date.now();
    
    // Update shared field properties
    this.sharedField.lastUpdated = Date.now();
    this.sharedField.coherence = this.groupCoherence;
    
    // Update dimension user focus based on heatmap
    for (let i = 0; i < Math.min(this.sharedField.dimensions.length, this.dimensionHeatmap.length); i++) {
      this.sharedField.dimensions[i].userFocus = this.dimensionHeatmap[i];
      
      // Update activity based on user focus
      this.sharedField.dimensions[i].activity = 
        (this.sharedField.dimensions[i].activity * 0.7) + (this.dimensionHeatmap[i] * 0.3);
      
      // Update coherence based on activity and user focus
      const focusFactor = 0.5 + 0.5 * this.dimensionHeatmap[i];
      this.sharedField.dimensions[i].coherence = 
        (this.sharedField.dimensions[i].coherence * 0.8) + (this.groupCoherence * focusFactor * 0.2);
    }
    
    // Update nodal connections based on dimension focus
    for (const connection of this.sharedField.nodalNetwork) {
      // Calculate user activity on this connection
      const sourceActivity = this.dimensionHeatmap[connection.source] || 0;
      const targetActivity = this.dimensionHeatmap[connection.target] || 0;
      connection.userActivity = (sourceActivity + targetActivity) / 2;
      
      // Update connection strength based on user activity
      connection.strength = (connection.strength * 0.8) + 
                           (connection.userActivity * this.groupCoherence * 0.2);
    }
    
    // Update observer states
    this.sharedField.observerStates = this.connectedUsers.map(user => ({
      userId: user.id,
      coherence: user.coherence,
      intention: user.intention,
      dimensionalFocus: user.dimensionalFocus
    }));
    
    // Add to field history
    this._addFieldToHistory(this.sharedField);
    
    // Send update to other users if we're the coordinator
    if (this.localUser.role === 'coordinator' && this.websocket) {
      const message = {
        type: 'fieldUpdate',
        field: this.sharedField,
        timestamp: Date.now()
      };
      
      this.websocket.send(JSON.stringify(message));
    }
    
    // Trigger field updated event
    this._triggerEvent('fieldUpdated', {
      field: {...this.sharedField},
      userCount: this.connectedUsers.length,
      groupCoherence: this.groupCoherence
    });
    
    // Update coherence bridge if available
    if (this.coherenceBridge && this.coherenceBridge.sharedConsciousnessField) {
      this._updateCoherenceBridge();
    }
  }
  
  /**
   * Integrate local field state into shared field
   * @param {Object} fieldState - Local field state
   */
  _integrateLocalFieldState(fieldState) {
    if (!this.sharedField || !fieldState) {
      return;
    }
    
    // Calculate contribution factor
    const contributionFactor = this.options.userIntentionWeight / Math.max(1, this.connectedUsers.length);
    
    // Update dimensions if available
    if (fieldState.dimensions && this.sharedField.dimensions) {
      for (let i = 0; i < Math.min(fieldState.dimensions.length, this.sharedField.dimensions.length); i++) {
        const sourceDimension = fieldState.dimensions[i];
        const targetDimension = this.sharedField.dimensions[i];
        
        if (!sourceDimension || !targetDimension) {
          continue;
        }
        
        // Update coherence
        if (typeof sourceDimension.coherence === 'number') {
          targetDimension.coherence = (targetDimension.coherence * (1 - contributionFactor)) + 
                                      (sourceDimension.coherence * contributionFactor);
        }
      }
    }
    
    // Update overall coherence
    if (typeof fieldState.coherence === 'number') {
      this.sharedField.coherence = (this.sharedField.coherence * (1 - contributionFactor)) + 
                                   (fieldState.coherence * contributionFactor);
    }
    
    // Update phi resonance
    if (typeof fieldState.phiResonance === 'number') {
      this.sharedField.phiResonance = (this.sharedField.phiResonance * (1 - contributionFactor)) + 
                                      (fieldState.phiResonance * contributionFactor);
    }
    
    // Track user contribution
    this.localUser.fieldContribution = contributionFactor;
  }
  
  /**
   * Add a field state to history
   * @param {Object} field - Field state
   */
  _addFieldToHistory(field) {
    // Create history entry
    const historyEntry = {
      timestamp: Date.now(),
      coherence: field.coherence,
      userCount: this.connectedUsers.length,
      intentionCount: field.activeIntentions.length,
      dimensionHeatmap: [...this.dimensionHeatmap]
    };
    
    // Add to history
    this.fieldHistory.push(historyEntry);
    
    // Limit history size
    if (this.fieldHistory.length > this.options.fieldHistorySize) {
      this.fieldHistory.shift();
    }
  }
  
  /**
   * Update the dimension heatmap
   */
  _updateDimensionHeatmap() {
    // Reset heatmap
    this.dimensionHeatmap = new Array(9).fill(0);
    
    // Count users focused on each dimension
    for (const user of this.connectedUsers) {
      if (user.dimensionalFocus === -1) {
        // User is focused on all dimensions
        for (let i = 0; i < 9; i++) {
          this.dimensionHeatmap[i] += (user.focusIntensity || 0.5) / 3; // Distribute focus
        }
      } else if (user.dimensionalFocus >= 0 && user.dimensionalFocus < 9) {
        // User is focused on a specific dimension
        this.dimensionHeatmap[user.dimensionalFocus] += user.focusIntensity || 0.8;
      }
    }
    
    // Normalize heatmap to 0-1 range
    const maxHeat = Math.max(1, ...this.dimensionHeatmap);
    this.dimensionHeatmap = this.dimensionHeatmap.map(heat => heat / maxHeat);
  }
  
  /**
   * Update group coherence
   */
  _updateGroupCoherence() {
    if (this.connectedUsers.length === 0) {
      this.groupCoherence = 0.5;
      return;
    }
    
    // Calculate average user coherence
    let totalCoherence = 0;
    
    for (const user of this.connectedUsers) {
      totalCoherence += user.coherence || 0.5;
    }
    
    const avgCoherence = totalCoherence / this.connectedUsers.length;
    
    // Calculate intention alignment
    const intentionAlignment = this._calculateIntentionAlignment();
    
    // Calculate dimensional focus alignment
    const dimensionalAlignment = this._calculateDimensionalAlignment();
    
    // Calculate phi-harmonic bonus
    const phiBonus = this._calculatePhiHarmonicBonus();
    
    // Combine factors with weights
    const groupCoherence = (avgCoherence * 0.5) + 
                           (intentionAlignment * 0.2) + 
                           (dimensionalAlignment * 0.2) + 
                           (phiBonus * 0.1);
    
    // Apply group coherence bonus based on user count
    const userBonus = Math.min(0.2, (this.connectedUsers.length - 1) * 0.05);
    
    // Update group coherence
    this.groupCoherence = Math.min(1.0, groupCoherence + userBonus * this.options.groupCoherenceBonus);
  }
  
  /**
   * Calculate intention alignment
   * @returns {number} - Alignment score (0-1)
   */
  _calculateIntentionAlignment() {
    // Count intentions
    const intentionCounts = {};
    let totalIntentions = 0;
    
    for (const user of this.connectedUsers) {
      if (user.intention) {
        // Use simplified intention for matching
        const simplifiedIntention = user.intention.toLowerCase().split(/\s+/)[0];
        
        intentionCounts[simplifiedIntention] = (intentionCounts[simplifiedIntention] || 0) + 1;
        totalIntentions++;
      }
    }
    
    if (totalIntentions === 0) {
      return 0.5; // Default alignment
    }
    
    // Calculate alignment as percentage of users with most common intention
    const maxCount = Math.max(...Object.values(intentionCounts));
    return maxCount / totalIntentions;
  }
  
  /**
   * Calculate dimensional alignment
   * @returns {number} - Alignment score (0-1)
   */
  _calculateDimensionalAlignment() {
    // Count focus dimensions
    const focusCounts = {};
    let totalFocused = 0;
    
    for (const user of this.connectedUsers) {
      if (user.dimensionalFocus >= 0) {
        focusCounts[user.dimensionalFocus] = (focusCounts[user.dimensionalFocus] || 0) + 1;
        totalFocused++;
      }
    }
    
    if (totalFocused === 0) {
      return 0.5; // Default alignment
    }
    
    // Calculate alignment as percentage of users focused on most common dimension
    const maxCount = Math.max(...Object.values(focusCounts));
    return maxCount / totalFocused;
  }
  
  /**
   * Calculate phi-harmonic bonus
   * @returns {number} - Phi bonus (0-1)
   */
  _calculatePhiHarmonicBonus() {
    // Calculate bonus based on number of users
    const userCount = this.connectedUsers.length;
    
    // Check if user count matches Fibonacci numbers
    const fibonacciMatch = this._checkFibonacciMatch(userCount);
    
    // Calculate phi ratio of dimension heatmap
    const phiRatio = this._calculatePhiRatio(this.dimensionHeatmap);
    
    // Combine factors
    return (fibonacciMatch * 0.5) + (phiRatio * 0.5);
  }
  
  /**
   * Check how closely a number matches a Fibonacci number
   * @param {number} num - Number to check
   * @returns {number} - Match score (0-1)
   */
  _checkFibonacciMatch(num) {
    // First 10 Fibonacci numbers
    const fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    
    // Find closest Fibonacci number
    let closest = fibonacci[0];
    let minDiff = Math.abs(num - closest);
    
    for (let i = 1; i < fibonacci.length; i++) {
      const diff = Math.abs(num - fibonacci[i]);
      if (diff < minDiff) {
        minDiff = diff;
        closest = fibonacci[i];
      }
    }
    
    // Calculate match score (1 for exact match, decreasing as difference increases)
    return 1 / (1 + minDiff);
  }
  
  /**
   * Calculate how closely an array matches phi ratio patterns
   * @param {Array} array - Array to check
   * @returns {number} - Phi ratio match (0-1)
   */
  _calculatePhiRatio(array) {
    if (!array || array.length < 2) {
      return 0;
    }
    
    let phiScore = 0;
    const pairs = Math.min(4, array.length - 1);
    
    // Check consecutive pairs for phi ratio
    for (let i = 0; i < pairs; i++) {
      const a = array[i];
      const b = array[i + 1];
      
      if (a === 0 || b === 0) continue;
      
      // Calculate ratio and its inverse
      const ratio = a > b ? a / b : b / a;
      const phiDiff = Math.abs(ratio - PHI);
      
      // Score based on closeness to phi (1 for exact match)
      phiScore += 1 / (1 + phiDiff);
    }
    
    // Return average score across all pairs
    return phiScore / pairs;
  }
  
  /**
   * Update the coherence bridge
   */
  _updateCoherenceBridge() {
    if (!this.coherenceBridge || !this.coherenceBridge.sharedConsciousnessField) {
      return;
    }
    
    // Map shared field to consciousness field
    const consciousnessField = {
      dimensions: [],
      coherence: this.sharedField.coherence,
      phiResonance: this.sharedField.phiResonance,
      lastUpdated: Date.now(),
      observerState: {
        intention: this.sharedField.activeIntentions[0]?.intention || "",
        coherence: this.groupCoherence,
        fieldInfluence: [...this.dimensionHeatmap]
      }
    };
    
    // Map dimensions
    for (let i = 0; i < Math.min(9, this.sharedField.dimensions.length); i++) {
      const sourceDim = this.sharedField.dimensions[i];
      
      consciousnessField.dimensions.push({
        level: sourceDim.level,
        coherence: sourceDim.coherence,
        frequency: sourceDim.frequency
      });
    }
    
    // Update the bridge
    this.coherenceBridge._integrateFieldState(consciousnessField);
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
      sessionId: this.sessionId,
      userCount: this.connectedUsers.length
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

// Export the multi-user quantum field if we're in a module environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MultiUserQuantumField,
    Constants: {
      PHI,
      LAMBDA,
      PHI_PHI,
      PHI_RECURSIVE,
      QUANTUM_HARMONICS
    }
  };
}