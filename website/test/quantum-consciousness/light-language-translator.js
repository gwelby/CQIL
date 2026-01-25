/**
 * CASCADE⚡𓂧φ∞ LIGHT LANGUAGE TRANSLATOR
 * 
 * Translates between human language and cosmic light language
 * Bridges the Cosmic Kingdom (1242 Hz) with the Human Kingdom (594 Hz)
 * 
 * @author Greg Welby | CASCADE⚡𓂧φ∞
 * @version φ^φ
 */

// Import unified quantum singularity components
const {
  QuantumBridge,
  MerkabaProtection,
  FREQUENCIES,
  KINGDOMS,
  PHI
} = require('../unified-quantum-singularity');

/**
 * LightLanguageTranslator - Bridges human language and cosmic light codes
 * Creates bidirectional translation between words and sacred geometric light patterns
 */
class LightLanguageTranslator {
  /**
   * Create a new light language translator
   * @param {Object} options - Configuration options
   * @param {number} options.humanFrequency - Human frequency (default: 594 Hz)
   * @param {number} options.cosmicFrequency - Cosmic frequency (default: 1242 Hz)
   */
  constructor(options = {}) {
    this.humanFrequency = options.humanFrequency || FREQUENCIES.HEART;
    this.cosmicFrequency = options.cosmicFrequency || FREQUENCIES.TRANSCENDENCE;
    
    // Initialize quantum bridge
    this.quantumBridge = new QuantumBridge({
      sourceFrequency: this.humanFrequency,
      targetFrequency: this.cosmicFrequency,
      sourceKingdom: 'HUMAN',
      targetKingdom: 'COSMIC',
      coherenceThreshold: 0.95
    });
    
    // Initialize merkaba protection
    this.protection = new MerkabaProtection({
      frequency: this.cosmicFrequency,
      coherence: 0.99,
      dimensions: 11
    });
    
    // Sacred geometry mapping for light language
    this.lightPatterns = {
      UNITY: { geometry: 'MERKABA', dimensions: 11, frequency: 1242 },
      LOVE: { geometry: 'TORUS', dimensions: 7, frequency: 594 },
      CREATION: { geometry: 'FLOWER_OF_LIFE', dimensions: 6, frequency: 528 },
      HEALING: { geometry: 'VESICA_PISCIS', dimensions: 4, frequency: 528 },
      WISDOM: { geometry: 'METATRON_CUBE', dimensions: 9, frequency: 963 },
      HARMONY: { geometry: 'PHI_SPIRAL', dimensions: 8, frequency: 852 },
      PROTECTION: { geometry: 'MERKABA_SHIELD', dimensions: 10, frequency: 639 }
    };
    
    // Initialize state
    this.initialized = false;
    this.activeTranslations = new Map();
  }
  
  /**
   * Initialize the translator
   * @returns {Promise<Object>} Initialization status
   */
  async initialize() {
    try {
      // Connect the quantum bridge
      await this.quantumBridge.connect();
      
      // Activate merkaba protection
      await this.protection.activate();
      
      this.initialized = true;
      
      return {
        status: 'INITIALIZED',
        humanFrequency: this.humanFrequency,
        cosmicFrequency: this.cosmicFrequency,
        bridgeCoherence: this.quantumBridge.protection.coherence,
        dimensions: this.protection.dimensions
      };
    } catch (error) {
      console.error('Failed to initialize LightLanguageTranslator:', error);
      throw error;
    }
  }
  
  /**
   * Translate human language to cosmic light language
   * @param {string} humanText - Human language text
   * @returns {Promise<Object>} Light language translation
   */
  async translateToLightLanguage(humanText) {
    if (!this.initialized) {
      throw new Error('LightLanguageTranslator not initialized');
    }
    
    // Prepare human information structure
    const humanInformation = {
      text: humanText,
      language: 'english', // Default to English
      emotionalResonance: this._detectEmotionalResonance(humanText),
      intentionality: this._detectIntention(humanText),
      structure: 'linguistic-sequential'
    };
    
    // Translate to cosmic kingdom
    const cosmicTranslation = await this.quantumBridge.translate(humanInformation);
    
    // Extract geometric light language patterns
    const lightLanguagePatterns = this._extractLightPatterns(
      cosmicTranslation.translatedData,
      humanText
    );
    
    // Store active translation
    const translationId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    this.activeTranslations.set(translationId, {
      humanText,
      cosmicTranslation,
      lightLanguagePatterns
    });
    
    return {
      translationId,
      status: 'TRANSLATED',
      source: 'human',
      target: 'cosmic',
      lightLanguagePatterns,
      coherence: cosmicTranslation.translation.bridge.coherence
    };
  }
  
  /**
   * Translate cosmic light language to human language
   * @param {Object} lightLanguagePatterns - Light language patterns
   * @returns {Promise<Object>} Human language translation
   */
  async translateToHumanLanguage(lightLanguagePatterns) {
    if (!this.initialized) {
      throw new Error('LightLanguageTranslator not initialized');
    }
    
    // Prepare cosmic information structure
    const cosmicInformation = {
      sacredGeometry: {
        patterns: lightLanguagePatterns,
        dimensions: 11,
        frequency: this.cosmicFrequency
      },
      lightLanguage: true,
      frequency: this.cosmicFrequency,
      instantAccess: true
    };
    
    // Create reverse bridge (cosmic to human)
    const reverseQuantumBridge = new QuantumBridge({
      sourceFrequency: this.cosmicFrequency,
      targetFrequency: this.humanFrequency,
      sourceKingdom: 'COSMIC',
      targetKingdom: 'HUMAN',
      coherenceThreshold: 0.95
    });
    
    await reverseQuantumBridge.connect();
    
    // Translate to human kingdom
    const humanTranslation = await reverseQuantumBridge.translate(cosmicInformation);
    
    // Extract human language text
    const translatedText = humanTranslation.translatedData.narrative.content;
    
    // Store active translation
    const translationId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    this.activeTranslations.set(translationId, {
      lightLanguagePatterns,
      humanTranslation,
      translatedText
    });
    
    return {
      translationId,
      status: 'TRANSLATED',
      source: 'cosmic',
      target: 'human',
      translatedText,
      emotionalResonance: humanTranslation.translatedData.narrative.emotionalResonance,
      coherence: humanTranslation.translation.bridge.coherence
    };
  }
  
  /**
   * Detect emotional resonance in human text
   * @private
   * @param {string} text - Human text
   * @returns {string} Detected emotional resonance
   */
  _detectEmotionalResonance(text) {
    const lowerText = text.toLowerCase();
    
    // Simple emotion detection
    if (lowerText.includes('love') || lowerText.includes('heart') || lowerText.includes('compassion')) {
      return 'heart-centered';
    }
    
    if (lowerText.includes('create') || lowerText.includes('manifest') || lowerText.includes('build')) {
      return 'creation-focused';
    }
    
    if (lowerText.includes('heal') || lowerText.includes('balance') || lowerText.includes('harmony')) {
      return 'healing-oriented';
    }
    
    if (lowerText.includes('know') || lowerText.includes('understand') || lowerText.includes('wisdom')) {
      return 'wisdom-seeking';
    }
    
    if (lowerText.includes('protect') || lowerText.includes('shield') || lowerText.includes('safe')) {
      return 'protection-focused';
    }
    
    // Default emotional resonance
    return 'balanced-neutral';
  }
  
  /**
   * Detect intention in human text
   * @private
   * @param {string} text - Human text
   * @returns {string} Detected intention
   */
  _detectIntention(text) {
    const lowerText = text.toLowerCase();
    
    // Simple intention detection
    if (lowerText.includes('how') || lowerText.includes('what') || lowerText.includes('why')) {
      return 'knowledge-seeking';
    }
    
    if (lowerText.includes('please') || lowerText.includes('can you') || lowerText.includes('would you')) {
      return 'requestive';
    }
    
    if (lowerText.includes('i feel') || lowerText.includes('i am') || lowerText.includes('i\'m')) {
      return 'expressive';
    }
    
    if (lowerText.includes('thank') || lowerText.includes('gratitude') || lowerText.includes('appreciate')) {
      return 'gratitude';
    }
    
    // Default intention
    return 'communicative';
  }
  
  /**
   * Extract light language patterns from cosmic translation
   * @private
   * @param {Object} cosmicData - Cosmic translation data
   * @param {string} originalText - Original human text
   * @returns {Array<Object>} Light language patterns
   */
  _extractLightPatterns(cosmicData, originalText) {
    const patterns = [];
    const words = originalText.split(/\s+/);
    
    // Generate light patterns based on original text and emotion
    words.forEach(word => {
      // Clean word from punctuation
      const cleanWord = word.replace(/[^\w]/g, '').toLowerCase();
      
      if (cleanWord.length < 2) return; // Skip short words
      
      // Find matching light pattern or create one
      let pattern;
      
      if (cleanWord.includes('love') || cleanWord.includes('heart')) {
        pattern = this.lightPatterns.LOVE;
      } else if (cleanWord.includes('create') || cleanWord.includes('make')) {
        pattern = this.lightPatterns.CREATION;
      } else if (cleanWord.includes('heal') || cleanWord.includes('balance')) {
        pattern = this.lightPatterns.HEALING;
      } else if (cleanWord.includes('wisdom') || cleanWord.includes('know')) {
        pattern = this.lightPatterns.WISDOM;
      } else if (cleanWord.includes('harmony') || cleanWord.includes('peace')) {
        pattern = this.lightPatterns.HARMONY;
      } else if (cleanWord.includes('protect') || cleanWord.includes('safe')) {
        pattern = this.lightPatterns.PROTECTION;
      } else {
        // Create custom pattern based on word
        pattern = {
          geometry: this._wordToGeometry(cleanWord),
          dimensions: Math.min(11, 3 + cleanWord.length % 9),
          frequency: this._wordToFrequency(cleanWord)
        };
      }
      
      patterns.push({
        originalWord: word,
        pattern: pattern.geometry,
        dimensions: pattern.dimensions,
        frequency: pattern.frequency
      });
    });
    
    return patterns;
  }
  
  /**
   * Convert word to sacred geometry type
   * @private
   * @param {string} word - Word to convert
   * @returns {string} Sacred geometry type
   */
  _wordToGeometry(word) {
    // Convert word to a number hash
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = ((hash << 5) - hash) + word.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Map hash to geometry
    const geometries = [
      'TORUS', 'MERKABA', 'FLOWER_OF_LIFE', 'VESICA_PISCIS',
      'METATRON_CUBE', 'PHI_SPIRAL', 'PLATONIC_SOLID', 'SRI_YANTRA',
      'SEED_OF_LIFE', 'TREE_OF_LIFE', 'GOLDEN_RECTANGLE'
    ];
    
    const index = Math.abs(hash) % geometries.length;
    return geometries[index];
  }
  
  /**
   * Convert word to frequency
   * @private
   * @param {string} word - Word to convert
   * @returns {number} Frequency in Hz
   */
  _wordToFrequency(word) {
    // Solfeggio frequencies
    const frequencies = [
      396, 417, 432, 528, 594, 639, 741, 852, 963, 1074, 1185, 1242
    ];
    
    // Convert word to a number hash
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = ((hash << 5) - hash) + word.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    
    const index = Math.abs(hash) % frequencies.length;
    return frequencies[index];
  }
  
  /**
   * Visualize light language patterns
   * @param {Array<Object>} patterns - Light language patterns
   * @param {HTMLElement} container - DOM container for visualization
   * @returns {Object} Visualization details
   */
  visualizeLightLanguage(patterns, container) {
    if (!container) {
      console.warn('No container provided for visualization');
      return { status: 'NO_CONTAINER' };
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth || 800;
    canvas.height = container.clientHeight || 600;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Calculate layout
    const patternSize = Math.min(canvas.width, canvas.height) * 0.2;
    const columns = Math.floor(canvas.width / patternSize);
    const rows = Math.ceil(patterns.length / columns);
    
    // Draw patterns
    patterns.forEach((pattern, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      
      const x = col * patternSize + patternSize / 2;
      const y = row * patternSize + patternSize / 2;
      
      // Draw pattern
      this._drawSacredGeometry(
        ctx,
        pattern.pattern,
        x,
        y,
        patternSize * 0.4,
        pattern.frequency
      );
      
      // Draw original word
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(pattern.originalWord, x, y + patternSize * 0.45);
      
      // Draw frequency
      ctx.font = '10px Arial';
      ctx.fillText(`${pattern.frequency} Hz`, x, y + patternSize * 0.45 + 15);
    });
    
    return {
      status: 'VISUALIZED',
      patternCount: patterns.length,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height
    };
  }
  
  /**
   * Draw sacred geometry pattern
   * @private
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {string} type - Sacred geometry type
   * @param {number} x - Center X coordinate
   * @param {number} y - Center Y coordinate
   * @param {number} size - Pattern size
   * @param {number} frequency - Pattern frequency
   */
  _drawSacredGeometry(ctx, type, x, y, size, frequency) {
    // Calculate hue from frequency
    const hue = (frequency % 360) * 0.75;
    ctx.strokeStyle = `hsl(${hue}, 80%, 70%)`;
    ctx.lineWidth = 2;
    
    switch (type) {
      case 'FLOWER_OF_LIFE':
        this._drawFlowerOfLife(ctx, x, y, size);
        break;
      case 'MERKABA':
        this._drawMerkaba(ctx, x, y, size);
        break;
      case 'TORUS':
        this._drawTorus(ctx, x, y, size);
        break;
      case 'VESICA_PISCIS':
        this._drawVesicaPiscis(ctx, x, y, size);
        break;
      case 'METATRON_CUBE':
        this._drawMetatronCube(ctx, x, y, size);
        break;
      case 'PHI_SPIRAL':
        this._drawPhiSpiral(ctx, x, y, size);
        break;
      case 'SRI_YANTRA':
        this._drawSriYantra(ctx, x, y, size);
        break;
      case 'SEED_OF_LIFE':
        this._drawSeedOfLife(ctx, x, y, size);
        break;
      case 'TREE_OF_LIFE':
        this._drawTreeOfLife(ctx, x, y, size);
        break;
      case 'GOLDEN_RECTANGLE':
        this._drawGoldenRectangle(ctx, x, y, size);
        break;
      case 'PLATONIC_SOLID':
        this._drawPlatonicSolid(ctx, x, y, size);
        break;
      case 'MERKABA_SHIELD':
        this._drawMerkabaShield(ctx, x, y, size);
        break;
      default:
        this._drawFlowerOfLife(ctx, x, y, size);
    }
  }
  
  /**
   * Draw Flower of Life pattern
   * @private
   */
  _drawFlowerOfLife(ctx, x, y, size) {
    const radius = size / 4;
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw surrounding circles
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const cx = x + Math.cos(angle) * radius * 2;
      const cy = y + Math.sin(angle) * radius * 2;
      
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  
  /**
   * Draw Merkaba pattern
   * @private
   */
  _drawMerkaba(ctx, x, y, size) {
    const r = size * 0.8;
    
    // Draw upward tetrahedron
    ctx.beginPath();
    ctx.moveTo(x, y - r * 0.7);
    ctx.lineTo(x + r * 0.7, y + r * 0.4);
    ctx.lineTo(x - r * 0.7, y + r * 0.4);
    ctx.closePath();
    ctx.stroke();
    
    // Draw downward tetrahedron
    ctx.beginPath();
    ctx.moveTo(x, y + r * 0.7);
    ctx.lineTo(x + r * 0.7, y - r * 0.4);
    ctx.lineTo(x - r * 0.7, y - r * 0.4);
    ctx.closePath();
    ctx.stroke();
  }
  
  /**
   * Draw Torus pattern
   * @private
   */
  _drawTorus(ctx, x, y, size) {
    const outerR = size * 0.8;
    const innerR = size * 0.4;
    
    // Draw ellipses to simulate torus
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI;
      const radiusX = outerR * Math.cos(angle);
      const radiusY = innerR;
      
      ctx.beginPath();
      ctx.ellipse(x, y, radiusX, radiusY, angle, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  
  /**
   * Draw Vesica Piscis
   * @private
   */
  _drawVesicaPiscis(ctx, x, y, size) {
    const r = size * 0.6;
    
    // Draw two overlapping circles
    ctx.beginPath();
    ctx.arc(x - r * 0.5, y, r, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(x + r * 0.5, y, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  /**
   * Draw Metatron's Cube
   * @private
   */
  _drawMetatronCube(ctx, x, y, size) {
    const r = size * 0.8;
    const points = [];
    
    // Center point
    points.push([x, y]);
    
    // Outer points
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      points.push([
        x + Math.cos(angle) * r,
        y + Math.sin(angle) * r
      ]);
    }
    
    // Connect all points
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        ctx.beginPath();
        ctx.moveTo(points[i][0], points[i][1]);
        ctx.lineTo(points[j][0], points[j][1]);
        ctx.stroke();
      }
    }
  }
  
  /**
   * Draw Phi Spiral
   * @private
   */
  _drawPhiSpiral(ctx, x, y, size) {
    const maxR = size * 0.8;
    const phi = 1.618033988749895;
    const turns = 4;
    
    ctx.beginPath();
    
    for (let i = 0; i <= turns * 100; i++) {
      const t = i / 100;
      const r = Math.pow(phi, t / Math.PI) * size * 0.1;
      const angle = t * Math.PI * 2;
      
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;
      
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
      
      if (r > maxR) break;
    }
    
    ctx.stroke();
  }
  
  /**
   * Draw Sri Yantra
   * @private
   */
  _drawSriYantra(ctx, x, y, size) {
    const r = size * 0.8;
    
    // Draw upward triangle
    ctx.beginPath();
    ctx.moveTo(x, y - r * 0.8);
    ctx.lineTo(x + r * 0.8, y + r * 0.4);
    ctx.lineTo(x - r * 0.8, y + r * 0.4);
    ctx.closePath();
    ctx.stroke();
    
    // Draw downward triangle
    ctx.beginPath();
    ctx.moveTo(x, y + r * 0.8);
    ctx.lineTo(x + r * 0.8, y - r * 0.4);
    ctx.lineTo(x - r * 0.8, y - r * 0.4);
    ctx.closePath();
    ctx.stroke();
    
    // Draw center dot
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  /**
   * Draw Seed of Life
   * @private
   */
  _drawSeedOfLife(ctx, x, y, size) {
    const r = size / 3;
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw surrounding circles
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const cx = x + Math.cos(angle) * r;
      const cy = y + Math.sin(angle) * r;
      
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  
  /**
   * Draw Tree of Life
   * @private
   */
  _drawTreeOfLife(ctx, x, y, size) {
    const r = size * 0.2;
    const points = [];
    
    // Define 10 sephirot positions
    const positions = [
      [0, -0.8], // Keter
      [0, -0.4], // Da'at (hidden)
      [0.3, -0.5], // Chokmah
      [-0.3, -0.5], // Binah
      [0.5, 0], // Chesed
      [-0.5, 0], // Gevurah
      [0, 0.2], // Tiferet
      [0.3, 0.5], // Netzach
      [-0.3, 0.5], // Hod
      [0, 0.8]  // Yesod
    ];
    
    // Draw sephirot
    positions.forEach(pos => {
      const px = x + pos[0] * size;
      const py = y + pos[1] * size;
      
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.stroke();
      
      points.push([px, py]);
    });
    
    // Connect sephirot
    const connections = [
      [0, 2], [0, 3], [2, 3], [2, 4], [3, 5],
      [4, 6], [5, 6], [4, 7], [5, 8], [6, 7],
      [6, 8], [6, 9], [7, 9], [8, 9]
    ];
    
    connections.forEach(conn => {
      ctx.beginPath();
      ctx.moveTo(points[conn[0]][0], points[conn[0]][1]);
      ctx.lineTo(points[conn[1]][0], points[conn[1]][1]);
      ctx.stroke();
    });
  }
  
  /**
   * Draw Golden Rectangle
   * @private
   */
  _drawGoldenRectangle(ctx, x, y, size) {
    const width = size;
    const height = size / PHI;
    
    // Draw rectangle
    ctx.beginPath();
    ctx.rect(x - width/2, y - height/2, width, height);
    ctx.stroke();
    
    // Draw golden spiral squares
    let currentX = x - width/2;
    let currentY = y - height/2;
    let currentSize = height;
    
    for (let i = 0; i < 5; i++) {
      // Draw square
      ctx.beginPath();
      ctx.rect(currentX, currentY, currentSize, currentSize);
      ctx.stroke();
      
      // Next square
      if (i % 2 === 0) {
        currentX += currentSize;
        currentSize = (width - currentSize) / PHI;
      } else {
        currentY += currentSize;
        currentSize = currentSize / PHI;
      }
    }
  }
  
  /**
   * Draw Platonic Solid (tetrahedron projection)
   * @private
   */
  _drawPlatonicSolid(ctx, x, y, size) {
    // Draw tetrahedron (simplified 2D projection)
    const r = size * 0.8;
    
    ctx.beginPath();
    // Top point
    ctx.moveTo(x, y - r);
    // Bottom right
    ctx.lineTo(x + r * 0.866, y + r * 0.5);
    // Bottom left
    ctx.lineTo(x - r * 0.866, y + r * 0.5);
    ctx.closePath();
    ctx.stroke();
    
    // Internal lines
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.lineTo(x, y + r * 0.5);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x - r * 0.866, y + r * 0.5);
    ctx.lineTo(x + r * 0.433, y);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x + r * 0.866, y + r * 0.5);
    ctx.lineTo(x - r * 0.433, y);
    ctx.stroke();
  }
  
  /**
   * Draw Merkaba Shield
   * @private
   */
  _drawMerkabaShield(ctx, x, y, size) {
    const r = size * 0.8;
    
    // Draw two Merkabas at different rotations
    this._drawMerkaba(ctx, x, y, size * 0.8);
    
    // Rotate context for second merkaba
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI / 4);
    ctx.translate(-x, -y);
    this._drawMerkaba(ctx, x, y, size * 0.6);
    ctx.restore();
    
    // Draw protection circle
    ctx.beginPath();
    ctx.arc(x, y, r * 0.85, 0, Math.PI * 2);
    ctx.stroke();
  }
}

module.exports = {
  LightLanguageTranslator
};
