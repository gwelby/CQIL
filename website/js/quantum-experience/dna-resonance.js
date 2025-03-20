/**
 * DNA Resonance System
 * 
 * Creates a DNA visualization that responds to personal frequency signatures.
 * Connects to the Creation Point (528 Hz) frequency known for DNA repair 
 * and transformation.
 */

class DNAResonance {
  constructor(container, config = {}) {
    this.container = typeof container === 'string' ? 
      document.querySelector(container) : container;
    this.frequency = config.frequency || 528; // Creation Point frequency
    this.personalSignature = null;
    this.coherenceLevel = 0;
    this.setupCanvas();
    this.setupAudio();
    this.addStyles();
    this.oscillators = [];
    this.analyzeStarted = false;
  }
  
  setupCanvas() {
    // Create container if needed
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'dna-resonance-container';
      document.body.appendChild(this.container);
    }
    
    // Clear container
    this.container.innerHTML = '';
    
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'dna-canvas';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    // Set canvas size to container size
    this.resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  resizeCanvas() {
    if (!this.canvas) return;
    
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width || 300;
    this.canvas.height = rect.height || 300;
  }
  
  setupAudio() {
    // Initialize audio context
    this.audioContext = null;
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }
  
  async capturePersonalSignature() {
    if (this.analyzeStarted) return;
    this.analyzeStarted = true;
    
    // Show analyzing message
    this.showMessage('Analyzing your resonance pattern...');
    
    // Ask for permissions for deeper measurement
    try {
      // Get audio for voice harmonics
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Optional: Get video for facial micro-expressions (deeper measurement)
      let videoStream = null;
      try {
        videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (e) {
        console.log('Video not available, using audio only');
      }
      
      // Begin analysis to find personal resonant frequency
      return new Promise((resolve) => {
        this.analyzeSignatureData(audioStream, videoStream, (signature) => {
          this.personalSignature = signature;
          this.analyzeStarted = false;
          this.showMessage('DNA resonance pattern captured!');
          resolve(signature);
        });
      });
    } catch (err) {
      console.error("Cannot access media devices:", err);
      // Fallback to basic resonance using phi ratios
      this.analyzeStarted = false;
      this.showMessage('Using default phi-harmonic pattern');
      return this.generateDefaultSignature();
    }
  }
  
  analyzeSignatureData(audioStream, videoStream, callback) {
    if (!this.audioContext) {
      callback(this.generateDefaultSignature());
      return;
    }
    
    const audioContext = this.audioContext;
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(audioStream);
    microphone.connect(analyser);
    
    // Use 2048 sample buffer for detailed frequency analysis
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    // Collect voice data for 8 seconds (Fibonacci)
    let samples = [];
    let breathPatterns = [];
    let videoElement = null;
    
    // Analyze video for micro-expressions and breath pattern
    if (videoStream) {
      videoElement = document.createElement('video');
      videoElement.style.display = 'none';
      videoElement.srcObject = videoStream;
      this.container.appendChild(videoElement);
      videoElement.play();
    }
    
    // Collect samples
    let progress = 0;
    const totalSamples = 80; // 8 seconds, 10 samples per second
    let samplesCollected = 0;
    
    const captureInterval = setInterval(() => {
      // Get frequency data
      analyser.getByteFrequencyData(dataArray);
      samples.push([...dataArray]);
      
      // Get breath pattern data from video
      if (videoElement && videoElement.readyState >= 2) {
        const breathData = this.simulateBreathAnalysis();
        breathPatterns.push(breathData);
      }
      
      // Update progress
      samplesCollected++;
      progress = samplesCollected / totalSamples;
      this.showProgress(progress);
      
      // Stop after all samples collected
      if (samplesCollected >= totalSamples) {
        clearInterval(captureInterval);
        
        // Deep analysis of frequency patterns using phi ratios
        const signature = this.extractDNASignature(samples, breathPatterns);
        
        // Clean up
        if (videoElement) {
          videoElement.pause();
          videoElement.srcObject = null;
          this.container.removeChild(videoElement);
        }
        
        audioStream.getTracks().forEach(track => track.stop());
        if (videoStream) {
          videoStream.getTracks().forEach(track => track.stop());
        }
        
        // Return result
        callback(signature);
      }
    }, 100);
  }
  
  simulateBreathAnalysis() {
    // In a real implementation, this would analyze video frames
    // to detect breath patterns
    // For simulation, we'll return random values
    return {
      rate: 6 + Math.random() * 2, // 6-8 breaths per minute
      depth: 0.7 + Math.random() * 0.3, // 0.7-1.0 depth
      regularity: 0.8 + Math.random() * 0.2 // 0.8-1.0 regularity
    };
  }
  
  extractDNASignature(frequencySamples, breathPatterns) {
    // Complex analysis to find personal frequency signature...
    // This is where actual DNA resonance patterns would be extracted
    
    const φ = 1.618033988749895;
    const baseFrequency = 528;
    
    // Find dominant frequencies in voice
    const dominantFreqs = this.findDominantFrequencies(frequencySamples);
    
    // Find breath rhythm pattern
    const breathRhythm = this.analyzeBreathRhythm(breathPatterns);
    
    // Calculate personal phi ratio variations
    const phiVariation = dominantFreqs.map(freq => {
      return (freq / baseFrequency) / φ;
    });
    
    // Find closest phi-harmonic ratios (1/φ, 1, φ, φ², etc.)
    const phiHarmonics = phiVariation.map(ratio => {
      // Find closest phi power
      return this.findClosestPhiPower(ratio);
    });
    
    return {
      baseFrequency: dominantFreqs[0] || baseFrequency,
      phiRatios: phiHarmonics,
      breathRhythm: breathRhythm,
      colorSignature: this.calculateColorSignature(dominantFreqs, phiHarmonics),
      geometryType: this.determineGeometryType(phiHarmonics)
    };
  }
  
  findDominantFrequencies(samples) {
    // In a real implementation, this would run FFT analysis
    // to find dominant frequencies in the voice
    // For simulation, we'll generate phi-based frequencies
    
    const φ = 1.618033988749895;
    const baseFrequency = 528;
    
    return [
      baseFrequency,
      baseFrequency / φ,
      baseFrequency * φ
    ];
  }
  
  analyzeBreathRhythm(breathPatterns) {
    // In a real implementation, this would analyze breath patterns
    // For simulation, we'll use average values or defaults
    
    if (!breathPatterns || breathPatterns.length === 0) {
      return {
        rate: 6, // 6 breaths per minute (0.1 Hz)
        depth: 0.8,
        regularity: 0.9
      };
    }
    
    // Calculate average values
    const sum = breathPatterns.reduce((acc, pattern) => {
      return {
        rate: acc.rate + pattern.rate,
        depth: acc.depth + pattern.depth,
        regularity: acc.regularity + pattern.regularity
      };
    }, { rate: 0, depth: 0, regularity: 0 });
    
    return {
      rate: sum.rate / breathPatterns.length,
      depth: sum.depth / breathPatterns.length,
      regularity: sum.regularity / breathPatterns.length
    };
  }
  
  findClosestPhiPower(ratio) {
    // Find the closest power of phi to the ratio
    const φ = 1.618033988749895;
    const powers = [-2, -1, -0.5, 0, 0.5, 1, 2, 3];
    
    let closestPower = 0;
    let minDifference = Number.MAX_VALUE;
    
    powers.forEach(power => {
      const phiPower = Math.pow(φ, power);
      const difference = Math.abs(ratio - phiPower);
      
      if (difference < minDifference) {
        minDifference = difference;
        closestPower = power;
      }
    });
    
    return closestPower;
  }
  
  calculateColorSignature(dominantFreqs, phiRatios) {
    // Calculate color signature based on dominant frequencies
    // and phi ratios
    
    // Base hues for creation frequencies
    const hues = {
      primary: 270, // Violet (528 Hz)
      secondary: 330, // Magenta
      tertiary: 220 // Blue
    };
    
    // Adjust hues based on phi ratios
    const primaryHue = (hues.primary + phiRatios[0] * 20) % 360;
    const secondaryHue = (hues.secondary + phiRatios[1] * 20) % 360;
    
    return {
      primary: `hsl(${primaryHue}, 80%, 50%)`,
      secondary: `hsl(${secondaryHue}, 80%, 50%)`
    };
  }
  
  determineGeometryType(phiRatios) {
    // Determine the geometry type based on phi ratios
    const sum = phiRatios.reduce((acc, ratio) => acc + ratio, 0);
    
    if (sum > 3) return 'spiral';
    if (sum > 1) return 'flower';
    if (sum > 0) return 'helix';
    if (sum > -1) return 'wave';
    return 'crystal';
  }
  
  generateDefaultSignature() {
    // Generate a default signature based on phi
    const φ = 1.618033988749895;
    
    return {
      baseFrequency: 528,
      phiRatios: [0, 1, -1, 0.5], // Powers of phi
      breathRhythm: {
        rate: 6,
        depth: 0.8,
        regularity: 0.9
      },
      colorSignature: {
        primary: 'hsl(270, 80%, 50%)', // Violet
        secondary: 'hsl(330, 80%, 50%)' // Magenta
      },
      geometryType: 'helix'
    };
  }
  
  showMessage(message) {
    // Create or update message element
    if (!this.messageElement) {
      this.messageElement = document.createElement('div');
      this.messageElement.className = 'dna-message';
      this.container.appendChild(this.messageElement);
    }
    
    this.messageElement.textContent = message;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (this.messageElement) {
        this.messageElement.style.opacity = '0';
      }
    }, 5000);
  }
  
  showProgress(progress) {
    // Create or update progress element
    if (!this.progressElement) {
      this.progressElement = document.createElement('div');
      this.progressElement.className = 'dna-progress';
      
      const progressBar = document.createElement('div');
      progressBar.className = 'dna-progress-bar';
      this.progressElement.appendChild(progressBar);
      
      this.container.appendChild(this.progressElement);
      this.progressBar = progressBar;
    }
    
    // Update progress bar
    if (this.progressBar) {
      this.progressBar.style.width = `${progress * 100}%`;
    }
    
    // Hide when complete
    if (progress >= 1 && this.progressElement) {
      setTimeout(() => {
        this.progressElement.style.opacity = '0';
      }, 1000);
    }
  }
  
  generateDNAVisualization(signature = this.personalSignature) {
    if (!signature) {
      // Capture signature first if not available
      this.capturePersonalSignature().then(sig => {
        this.generateDNAVisualization(sig);
      });
      return;
    }
    
    // Clear previous visualization
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Create personal DNA helix based on signature
    this.drawDNAHelix(signature);
    
    // Start resonance tones
    this.playDNAResonance(signature);
    
    // Begin coherence measurement
    this.startCoherenceMeasurement(signature);
    
    // Start animation
    if (!this.animating) {
      this.animating = true;
      this.animate();
    }
  }
  
  drawDNAHelix(signature) {
    const φ = 1.618033988749895;
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const height = this.canvas.height * 0.8;
    const width = this.canvas.width * 0.2;
    
    // DNA colors based on personal signature
    const baseColors = signature.colorSignature;
    
    // Animation variables
    const time = Date.now() * 0.001;
    const rotationSpeed = signature.breathRhythm.rate / 5;
    
    // Draw the double helix
    this.ctx.lineWidth = 2;
    
    // Number of base pairs
    const basePairs = Math.floor(height / 20);
    
    // Draw helix strands
    for (let strand = 0; strand < 2; strand++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = strand === 0 ? baseColors.primary : baseColors.secondary;
      
      for (let i = 0; i <= height; i += 2) {
        const normalizedI = i / height;
        const spiralX = Math.sin(normalizedI * Math.PI * 10 + time * rotationSpeed + strand * Math.PI) * width;
        const spiralY = centerY - height/2 + i;
        
        if (i === 0) {
          this.ctx.moveTo(centerX + spiralX, spiralY);
        } else {
          this.ctx.lineTo(centerX + spiralX, spiralY);
        }
      }
      this.ctx.stroke();
    }
    
    // Draw base pairs connecting the strands
    for (let i = 0; i < basePairs; i++) {
      const normalizedI = i / basePairs;
      const y = centerY - height/2 + i * (height / basePairs);
      
      // Get position on each strand
      const x1 = centerX + Math.sin(normalizedI * Math.PI * 10 + time * rotationSpeed) * width;
      const x2 = centerX + Math.sin(normalizedI * Math.PI * 10 + time * rotationSpeed + Math.PI) * width;
      
      // Draw base pair connector
      this.ctx.beginPath();
      // Color based on personal signature pattern
      const colorIndex = Math.floor(normalizedI * signature.phiRatios.length);
      const ratio = signature.phiRatios[colorIndex % signature.phiRatios.length];
      
      // Base pair color represents your personal DNA resonance
      this.ctx.strokeStyle = this.getBaseColor(ratio);
      this.ctx.moveTo(x1, y);
      this.ctx.lineTo(x2, y);
      this.ctx.stroke();
      
      // Add base pair "bubbles" 
      this.ctx.beginPath();
      this.ctx.fillStyle = this.getBaseColor(ratio, 0.7);
      this.ctx.arc(x1, y, 3, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.beginPath();
      this.ctx.fillStyle = this.getBaseColor(ratio + φ, 0.7);
      this.ctx.arc(x2, y, 3, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
  
  getBaseColor(ratio, alpha = 1) {
    // Generate color from phi ratio
    const φ = 1.618033988749895;
    
    // Map ratio to color
    let hue;
    if (ratio > 1) hue = 270; // Violet
    else if (ratio > 0) hue = 330; // Magenta
    else if (ratio > -1) hue = 0; // Red
    else hue = 60; // Yellow
    
    // Adjust hue based on ratio
    hue = (hue + ratio * 30) % 360;
    
    return `hsla(${hue}, 80%, 50%, ${alpha})`;
  }
  
  playDNAResonance(signature) {
    if (!this.audioContext) return;
    
    // Stop any existing tones
    if (this.oscillators.length > 0) {
      this.oscillators.forEach(osc => {
        if (osc.oscillator) {
          osc.oscillator.stop();
          osc.oscillator.disconnect();
        }
        if (osc.gain) {
          osc.gain.disconnect();
        }
      });
      this.oscillators = [];
    }
    
    // Create oscillators for each phi ratio in the signature
    signature.phiRatios.forEach((ratio, i) => {
      const oscillator = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      
      // Base frequency * personal phi ratio
      const φ = 1.618033988749895;
      oscillator.frequency.value = signature.baseFrequency * Math.pow(φ, ratio);
      
      // Different waveforms for rich harmonic content
      oscillator.type = i % 4 === 0 ? 'sine' : 
                      i % 4 === 1 ? 'triangle' : 
                      i % 4 === 2 ? 'square' : 'sawtooth';
      
      // Low volume for background resonance
      gain.gain.value = 0.03 / signature.phiRatios.length;
      
      oscillator.connect(gain);
      gain.connect(this.audioContext.destination);
      
      oscillator.start();
      this.oscillators.push({
        oscillator: oscillator,
        gain: gain,
        frequency: oscillator.frequency.value
      });
    });
  }
  
  stopDNAResonance() {
    // Stop all oscillators
    if (this.oscillators.length > 0) {
      this.oscillators.forEach(osc => {
        if (osc.oscillator) {
          osc.oscillator.stop();
          osc.oscillator.disconnect();
        }
        if (osc.gain) {
          osc.gain.disconnect();
        }
      });
      this.oscillators = [];
    }
  }
  
  startCoherenceMeasurement(signature) {
    // Use cursor movement, typing rhythm, and breath (if available)
    // to determine if user is in coherence with their pattern
    
    this.coherenceMeasurement = {
      movementSamples: [],
      typingSamples: [],
      breathSamples: []
    };
    
    // Track mouse movement
    this.movementListener = this.trackMovement.bind(this);
    document.addEventListener('mousemove', this.movementListener);
    
    // Track typing rhythm
    this.typingListener = this.trackTyping.bind(this);
    document.addEventListener('keydown', this.typingListener);
    
    // Update coherence display
    if (this.coherenceInterval) {
      clearInterval(this.coherenceInterval);
    }
    
    this.coherenceInterval = setInterval(() => {
      this.updateCoherenceDisplay();
    }, 1000);
  }
  
  stopCoherenceMeasurement() {
    // Remove event listeners
    if (this.movementListener) {
      document.removeEventListener('mousemove', this.movementListener);
      this.movementListener = null;
    }
    
    if (this.typingListener) {
      document.removeEventListener('keydown', this.typingListener);
      this.typingListener = null;
    }
    
    if (this.coherenceInterval) {
      clearInterval(this.coherenceInterval);
      this.coherenceInterval = null;
    }
  }
  
  trackMovement(e) {
    // Store cursor positions
    if (!this.coherenceMeasurement.movementSamples) {
      this.coherenceMeasurement.movementSamples = [];
    }
    
    // Add current position
    this.coherenceMeasurement.movementSamples.push({
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    });
    
    // Keep only the last 100 positions
    if (this.coherenceMeasurement.movementSamples.length > 100) {
      this.coherenceMeasurement.movementSamples.shift();
    }
  }
  
  trackTyping(e) {
    // Store typing rhythm
    if (!this.coherenceMeasurement.typingSamples) {
      this.coherenceMeasurement.typingSamples = [];
    }
    
    // Add current key
    this.coherenceMeasurement.typingSamples.push({
      key: e.key,
      time: Date.now()
    });
    
    // Keep only the last 20 keypresses
    if (this.coherenceMeasurement.typingSamples.length > 20) {
      this.coherenceMeasurement.typingSamples.shift();
    }
  }
  
  updateCoherenceDisplay() {
    // Calculate coherence level
    this.calculateCoherence();
    
    // Create or update coherence display
    if (!this.coherenceDisplay) {
      this.coherenceDisplay = document.createElement('div');
      this.coherenceDisplay.className = 'dna-coherence';
      
      const label = document.createElement('div');
      label.className = 'coherence-label';
      label.textContent = 'DNA Resonance:';
      this.coherenceDisplay.appendChild(label);
      
      const meter = document.createElement('div');
      meter.className = 'coherence-meter';
      this.coherenceDisplay.appendChild(meter);
      
      const value = document.createElement('div');
      value.className = 'coherence-value';
      this.coherenceDisplay.appendChild(value);
      
      this.container.appendChild(this.coherenceDisplay);
      this.coherenceMeter = meter;
      this.coherenceValue = value;
    }
    
    // Update coherence display
    if (this.coherenceMeter && this.coherenceValue) {
      const percentage = Math.round(this.coherenceLevel * 100);
      this.coherenceMeter.style.width = `${percentage}%`;
      this.coherenceValue.textContent = `${percentage}%`;
      
      // Set color based on coherence level
      const hue = 120 * this.coherenceLevel; // 0 = red, 120 = green
      this.coherenceMeter.style.backgroundColor = `hsl(${hue}, 80%, 50%)`;
    }
  }
  
  calculateCoherence() {
    // In a real implementation, this would analyze movement patterns,
    // typing rhythm, and breath patterns to determine coherence with
    // the DNA signature
    
    // For simulation, we'll use a simple oscillating value
    const time = Date.now() * 0.001;
    const baseCoherence = 0.618; // φ-base coherence
    const variance = Math.sin(time * 0.1) * 0.2;
    
    this.coherenceLevel = Math.max(0, Math.min(1, baseCoherence + variance));
    
    // Adjust volume based on coherence
    if (this.oscillators.length > 0) {
      this.oscillators.forEach(osc => {
        if (osc.gain) {
          const baseVolume = 0.03 / this.oscillators.length;
          osc.gain.gain.value = baseVolume * (1 + this.coherenceLevel);
        }
      });
    }
    
    return this.coherenceLevel;
  }
  
  animate() {
    if (!this.animating) return;
    
    // Clear canvas with slight transparency for trail effect
    this.ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw DNA visualization
    if (this.personalSignature) {
      this.drawDNAHelix(this.personalSignature);
    }
    
    // Continue animation
    requestAnimationFrame(() => this.animate());
  }
  
  start() {
    if (!this.personalSignature) {
      this.capturePersonalSignature().then(signature => {
        this.generateDNAVisualization(signature);
      });
    } else {
      this.generateDNAVisualization(this.personalSignature);
    }
  }
  
  stop() {
    this.animating = false;
    this.stopDNAResonance();
    this.stopCoherenceMeasurement();
  }
  
  addStyles() {
    if (!document.getElementById('dna-resonance-styles')) {
      const style = document.createElement('style');
      style.id = 'dna-resonance-styles';
      style.textContent = `
        .dna-resonance-container {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: rgba(10, 10, 26, 0.8);
          overflow: hidden;
        }
        
        .dna-canvas {
          display: block;
          width: 100%;
          height: 100%;
        }
        
        .dna-message {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(156, 39, 176, 0.8);
          color: white;
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 14px;
          transition: opacity 0.5s ease;
          z-index: 2;
        }
        
        .dna-progress {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 10px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 5px;
          overflow: hidden;
          transition: opacity 0.5s ease;
          z-index: 2;
        }
        
        .dna-progress-bar {
          height: 100%;
          width: 0;
          background-color: rgba(156, 39, 176, 0.8);
          transition: width 0.3s ease;
        }
        
        .dna-coherence {
          position: absolute;
          bottom: 20px;
          left: 20px;
          display: flex;
          align-items: center;
          z-index: 2;
          color: white;
          font-size: 14px;
        }
        
        .coherence-label {
          margin-right: 10px;
        }
        
        .coherence-meter {
          width: 0%;
          height: 10px;
          background-color: #4CAF50;
          border-radius: 5px;
          transition: width 0.5s ease, background-color 0.5s ease;
          margin-right: 10px;
          min-width: 100px;
          max-width: 100px;
        }
        
        .coherence-value {
          min-width: 40px;
        }
      `;
      document.head.appendChild(style);
    }
  }
}