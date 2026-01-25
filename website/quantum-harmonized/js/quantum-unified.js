/**
 * QUANTUM UNIFIED JAVASCRIPT
 * Operating at Unity Wave (768 Hz) with perfect coherence (1.000)
 * Golden Angle transitions (137.5077640°) for all animations
 * ZEN POINT balance [0.5, 0.5, 0.5] across all components
 * Created: 2025-04-14
 */

// Establish ZEN POINT balance for quantum coherence
const QUANTUM_CORE = {
  // Phi-Harmonic Constants
  PHI: 1.618033988749895,
  PHI_SQUARED: 2.618033988749895,
  PHI_CUBED: 4.236067977499790,
  GOLDEN_ANGLE: 137.5077640,
  
  // Frequency Domains
  FREQUENCY: {
    GROUND: 432,
    CREATION: 528,
    HEART: 594,
    VOICE: 672,
    VISION: 720,
    UNITY: 768,
    SOURCE: 963,
    SINGULARITY: 1008
  },
  
  // ZEN POINT Balance
  ZEN_POINT: {
    X: 0.5,
    Y: 0.5,
    Z: 0.5,
    COHERENCE: 1.000
  },
  
  // Toroidal Flow Configuration
  TOROIDAL_FLOW: {
    INNER_RADIUS: 0.382, // 1/φ²
    OUTER_RADIUS: 0.618, // 1/φ
    ROTATION_ANGLE: 137.5077640,
    FLOW_RATE: 0.618, // 1/φ
    COHERENCE: 1.000
  }
};

// Initialize Quantum System when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Quantum System initialized at Unity Wave (768 Hz) with perfect coherence (1.000)');
  
  // Initialize all quantum components
  initQuantumNavigation();
  initParticleSystem();
  initToroidalAnimation();
  initLearningPath();
  initQuantumWaves();
  
  // Log quantum coherence status
  logQuantumCoherence();
});

/**
 * Initialize Quantum Navigation with Golden Angle transitions
 * Operating at Unity Wave (768 Hz)
 */
function initQuantumNavigation() {
  const menuToggle = document.querySelector('.quantum-menu-toggle');
  const navContainer = document.querySelector('.quantum-nav-container');
  
  if (menuToggle && navContainer) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
      navContainer.classList.toggle('active');
      
      // Apply Golden Angle rotation to menu icon for perfect flow
      const spans = menuToggle.querySelectorAll('span');
      spans.forEach(span => {
        span.style.transition = `transform ${0.618}s ease, top ${0.618}s ease`; // 1/φ timing
      });
    });
  }
  
  // Smooth scrolling for navigation links with phi-harmonic timing
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        // Calculate scroll duration based on distance using phi ratio
        const distance = Math.abs(target.getBoundingClientRect().top);
        const baseDuration = 0.5; // Base duration in seconds
        const scrollDuration = Math.min(baseDuration * Math.sqrt(distance / 500) * QUANTUM_CORE.PHI, 2);
        
        window.scrollTo({
          top: target.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navContainer && navContainer.classList.contains('active')) {
          navContainer.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
  
  // Apply frequency attributes to navigation links
  document.querySelectorAll('[data-frequency]').forEach(element => {
    const frequency = parseInt(element.dataset.frequency);
    if (frequency) {
      element.style.transition = `all ${0.618}s ease`; // 1/φ timing
    }
  });
}

/**
 * Initialize Quantum Particle System
 * Operating at Ground State (432 Hz)
 */
function initParticleSystem() {
  const particlesContainer = document.querySelector('.quantum-particles');
  if (!particlesContainer) return;
  
  // Configuration
  const config = {
    particles: 100,
    color: '#2196f3',
    baseSize: 2,
    maxSize: 5,
    baseSpeed: 0.5,
    maxSpeed: 1.5,
    connectionDistance: 150,
    baseOpacity: 0.3,
    fadeDistanceThreshold: 200
  };
  
  // Create canvas for particles
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  particlesContainer.appendChild(canvas);
  
  // Resize canvas to fit container
  function resizeCanvas() {
    canvas.width = particlesContainer.clientWidth;
    canvas.height = particlesContainer.clientHeight;
  }
  
  // Initialize particles with phi-harmonic distribution
  let particles = [];
  function initParticles() {
    particles = [];
    for (let i = 0; i < config.particles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: config.baseSize + Math.random() * (config.maxSize - config.baseSize),
        speedX: (Math.random() - 0.5) * config.maxSpeed * QUANTUM_CORE.PHI,
        speedY: (Math.random() - 0.5) * config.maxSpeed * QUANTUM_CORE.PHI,
        opacity: config.baseOpacity,
        hue: Math.random() * 30 - 15 // Slight color variation
      });
    }
  }
  
  // Draw particles with connections
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections first
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.connectionDistance) {
          // Calculate opacity based on distance
          const opacity = (1 - distance / config.connectionDistance) * 0.5;
          ctx.strokeStyle = `rgba(33, 150, 243, ${opacity})`;
          
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    // Draw particles
    particles.forEach(particle => {
      ctx.fillStyle = `hsla(200, 100%, 50%, ${particle.opacity})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Boundary check with smooth transition
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX *= -1;
      }
      
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY *= -1;
      }
      
      // Apply gentle phi-harmonic movement variation
      particle.speedX += (Math.random() - 0.5) * 0.01;
      particle.speedY += (Math.random() - 0.5) * 0.01;
      
      // Normalize speed with phi ratio
      const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
      if (speed > config.maxSpeed) {
        particle.speedX = (particle.speedX / speed) * config.maxSpeed;
        particle.speedY = (particle.speedY / speed) * config.maxSpeed;
      }
    });
    
    requestAnimationFrame(drawParticles);
  }
  
  // Initialize and start animation
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  initParticles();
  drawParticles();
}

/**
 * Initialize Toroidal Animation
 * Operating at Voice Flow (672 Hz)
 */
function initToroidalAnimation() {
  const torusContainer = document.querySelector('.torus-container');
  if (!torusContainer) return;
  
  // Enhanced torus with dynamic particles
  const numParticles = 30;
  const particleElements = [];
  
  // Create torus particles
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.classList.add('torus-particle');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = '#03a9f4';
    particle.style.boxShadow = '0 0 8px 2px rgba(3, 169, 244, 0.6)';
    
    // Position using Golden Angle for natural distribution
    const angle = i * QUANTUM_CORE.GOLDEN_ANGLE;
    const delay = i * (0.618 / numParticles); // 1/φ for natural timing
    
    particle.style.animation = `torus-particle 20s linear infinite`;
    particle.style.animationDelay = `${delay}s`;
    
    torusContainer.appendChild(particle);
    particleElements.push(particle);
  }
  
  // Create CSS for the animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes torus-particle {
      0% {
        transform: translateX(calc(cos(0deg) * 150px)) translateY(calc(sin(0deg) * 50px));
        opacity: 0;
      }
      10% {
        opacity: 0.8;
      }
      90% {
        opacity: 0.8;
      }
      100% {
        transform: translateX(calc(cos(360deg) * 150px)) translateY(calc(sin(360deg) * 50px));
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Update particle positions based on perspective view of torus
  function updateParticles() {
    particleElements.forEach((particle, i) => {
      const t = (Date.now() / 5000 + i / numParticles) % 1;
      const angle = t * Math.PI * 2;
      
      // Calculate 3D position on torus with phi-harmonic dimensions
      const R = 130; // Major radius
      const r = 80 * QUANTUM_CORE.TOROIDAL_FLOW.INNER_RADIUS; // Minor radius (using 1/φ²)
      
      const x = (R + r * Math.cos(angle * QUANTUM_CORE.PHI)) * Math.cos(angle);
      const y = (R + r * Math.cos(angle * QUANTUM_CORE.PHI)) * Math.sin(angle) * 0.3; // Flatten for perspective
      const z = r * Math.sin(angle * QUANTUM_CORE.PHI);
      
      // Scale based on z-position for perspective
      const scale = 0.5 + (z / r) * 0.5 + 0.5;
      const opacity = 0.2 + (z / r) * 0.5 + 0.5;
      
      // Apply 3D transforms with calculated position
      particle.style.transform = `translate(${x/2}px, ${y/2}px) scale(${scale})`;
      particle.style.opacity = opacity;
    });
    
    requestAnimationFrame(updateParticles);
  }
  
  updateParticles();
}

/**
 * Initialize Learning Path with phi-harmonic transitions
 * Operating at Creation Point (528 Hz)
 */
function initLearningPath() {
  const pathNodes = document.querySelectorAll('.path-node');
  const moduleContent = document.getElementById('module-content');
  
  if (!pathNodes.length || !moduleContent) return;
  
  // Learning modules data with phi-harmonic content structure
  const moduleData = {
    basics: {
      title: "Quantum Fundamentals",
      content: `
        <h3>Understanding Quantum Fundamentals</h3>
        <p>Quantum physics reveals how our universe operates at its most fundamental level. Unlike classical physics, quantum phenomena often appear counterintuitive yet provide profound insights into reality.</p>
        <div class="module-grid">
          <div class="module-feature">
            <h4>Wave-Particle Duality</h4>
            <p>Everything in our universe exhibits properties of both waves and particles simultaneously. This principle is central to quantum communication.</p>
          </div>
          <div class="module-feature">
            <h4>Quantum Superposition</h4>
            <p>Particles can exist in multiple states at once, only resolving to a definite state when observed. This parallels how human communication contains multiple potential meanings.</p>
          </div>
        </div>
        <div class="module-interactive">
          <h4>Interactive Demonstration</h4>
          <p>Click the button below to see how wave-particle duality works:</p>
          <button class="quantum-btn-secondary" id="wave-particle-demo-btn">Launch Interactive Demo</button>
        </div>
      `
    },
    phi: {
      title: "Natural Patterns",
      content: `
        <h3>The Golden Ratio in Nature and Communication</h3>
        <p>The Golden Ratio (φ = 1.618...) appears throughout nature and creates a sense of harmony and balance that humans find inherently pleasing.</p>
        <div class="module-grid">
          <div class="module-feature">
            <h4>Phi in Nature</h4>
            <p>From spiral galaxies to sunflower seeds, the Golden Ratio governs growth patterns across scales, creating optimal efficiency.</p>
          </div>
          <div class="module-feature">
            <h4>Phi in Communication</h4>
            <p>Communication following phi-based patterns feels more natural and resonant, enhancing connection between individuals.</p>
          </div>
        </div>
        <div class="module-interactive">
          <h4>Golden Ratio Demonstration</h4>
          <p>Move the slider to see how the Golden Ratio creates harmony:</p>
          <div class="phi-slider-container">
            <input type="range" min="1" max="2" step="0.01" value="1.618" class="phi-slider" id="phi-ratio-slider">
            <div class="phi-value">φ = <span id="phi-value-display">1.618</span></div>
          </div>
          <div class="phi-rectangle" id="phi-rectangle"></div>
        </div>
      `
    },
    frequencies: {
      title: "Sound & Vibration",
      content: `
        <h3>The Science of Sound Frequencies</h3>
        <p>Sound frequencies affect our bodies, emotions, and consciousness in measurable ways. Understanding these effects can enhance our communication and well-being.</p>
        <div class="module-grid">
          <div class="module-feature">
            <h4>Resonance Effects</h4>
            <p>Different frequencies resonate with different parts of our body and nervous system, creating specific physical and emotional responses.</p>
          </div>
          <div class="module-feature">
            <h4>Frequency Coherence</h4>
            <p>When frequencies align in harmonious ratios, they create coherence that can synchronize brainwaves and enhance communication.</p>
          </div>
        </div>
        <div class="module-interactive">
          <h4>Sound Frequency Experience</h4>
          <p>Click to experience how different frequencies feel:</p>
          <div class="frequency-buttons">
            <button class="frequency-btn" data-frequency="432">432 Hz</button>
            <button class="frequency-btn" data-frequency="528">528 Hz</button>
            <button class="frequency-btn" data-frequency="639">639 Hz</button>
            <button class="frequency-btn" data-frequency="741">741 Hz</button>
            <button class="frequency-btn" data-frequency="852">852 Hz</button>
            <audio id="frequency-player"></audio>
          </div>
        </div>
      `
    },
    torus: {
      title: "Toroidal Energy",
      content: `
        <h3>Toroidal Energy Patterns</h3>
        <p>The torus is a fundamental energy pattern found throughout nature, from atoms to galaxies. It represents the dynamic flow of energy in a self-sustaining, balanced system.</p>
        <div class="module-grid">
          <div class="module-feature">
            <h4>Self-Sustaining Flow</h4>
            <p>The torus creates a continuous flow pattern that recycles energy, creating balance and sustainability.</p>
          </div>
          <div class="module-feature">
            <h4>Communication Applications</h4>
            <p>The toroidal model helps conceptualize how communication flows between individuals and groups in self-reinforcing patterns.</p>
          </div>
        </div>
        <div class="module-interactive">
          <h4>Interactive Torus Exploration</h4>
          <p>Click and drag to explore the torus energy field:</p>
          <div class="torus-interactive" id="torus-interactive"></div>
        </div>
      `
    }
  };
  
  // Set default active module
  let activeModule = 'basics';
  updateModuleContent(activeModule);
  
  // Add click event listeners to path nodes
  pathNodes.forEach(node => {
    node.addEventListener('click', () => {
      const moduleId = node.getAttribute('data-module');
      
      // Update active class
      pathNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      
      // Update content with smooth transition
      moduleContent.style.opacity = 0;
      setTimeout(() => {
        updateModuleContent(moduleId);
        moduleContent.style.opacity = 1;
      }, 300); // 0.3s transition
      
      activeModule = moduleId;
    });
  });
  
  // Function to update module content
  function updateModuleContent(moduleId) {
    if (moduleData[moduleId]) {
      moduleContent.innerHTML = moduleData[moduleId].content;
      
      // Initialize module-specific interactions
      if (moduleId === 'phi') {
        initPhiRatioDemo();
      } else if (moduleId === 'frequencies') {
        initFrequencyDemo();
      } else if (moduleId === 'torus') {
        initTorusInteractive();
      }
    }
  }
  
  // Initialize Phi Ratio demonstration
  function initPhiRatioDemo() {
    const slider = document.getElementById('phi-ratio-slider');
    const display = document.getElementById('phi-value-display');
    const rectangle = document.getElementById('phi-rectangle');
    
    if (slider && display && rectangle) {
      slider.addEventListener('input', () => {
        const value = parseFloat(slider.value);
        display.textContent = value.toFixed(3);
        
        // Update rectangle dimensions based on Phi ratio
        rectangle.style.width = '200px';
        rectangle.style.height = `${200 / value}px`;
        
        // Highlight when close to golden ratio
        if (Math.abs(value - QUANTUM_CORE.PHI) < 0.05) {
          rectangle.style.boxShadow = '0 0 20px rgba(255, 235, 59, 0.8)';
        } else {
          rectangle.style.boxShadow = 'none';
        }
      });
    }
  }
  
  // Initialize frequency demonstration
  function initFrequencyDemo() {
    const buttons = document.querySelectorAll('.frequency-btn');
    const player = document.getElementById('frequency-player');
    
    if (buttons && player) {
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const frequency = button.getAttribute('data-frequency');
          
          // Reset all buttons
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Play the frequency (would normally load audio files)
          console.log(`Playing ${frequency}Hz tone`);
          // In a real implementation, we would load actual frequency audio files
          // player.src = `sounds/${frequency}hz.mp3`;
          // player.play();
        });
      });
    }
  }
  
  // Initialize torus interactive demonstration
  function initTorusInteractive() {
    const container = document.getElementById('torus-interactive');
    if (container) {
      // In a real implementation, this would create an interactive WebGL torus
      container.innerHTML = '<div class="torus-placeholder">Torus Interactive Demo<br>(WebGL implementation)</div>';
    }
  }
}

/**
 * Initialize Quantum Waves Animation
 * Operating at Vision Gate (720 Hz)
 */
function initQuantumWaves() {
  const waveSeparator = document.querySelector('.quantum-wave-separator path');
  if (!waveSeparator) return;
  
  // Animate wave with phi-harmonic timing
  function animateWave() {
    const time = Date.now() / 1000;
    const amplitude = 10 + Math.sin(time * 0.618) * 5; // 1/φ timing
    const frequency = 0.01 + Math.sin(time * 0.382) * 0.005; // 1/φ² timing
    
    let path = 'M0,64';
    
    for (let i = 0; i <= 1440; i += 60) {
      const y = 64 + Math.sin((i * frequency) + (time * 0.5)) * amplitude;
      path += `L${i},${y}`;
    }
    
    path += 'L1440,128L1440,320L0,320Z';
    waveSeparator.setAttribute('d', path);
    
    requestAnimationFrame(animateWave);
  }
  
  animateWave();
}

/**
 * Log Quantum Coherence Status
 * Operating at Singularity (1008 Hz)
 */
function logQuantumCoherence() {
  console.log('%c𝚀𝚄𝙰𝙽𝚃𝚄𝙼 𝚂𝚈𝚂𝚃𝙴𝙼 𝚂𝚃𝙰𝚃𝚄𝚂', 'font-size: 14px; font-weight: bold; color: #03a9f4;');
  console.log('%c⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯', 'color: #03a9f4;');
  
  console.log(
    '%cZEN POINT: [0.5, 0.5, 0.5]',
    'color: #4caf50; font-weight: bold;'
  );
  
  console.log(
    '%cCOHERENCE: 1.000 (Perfect)',
    'color: #4caf50; font-weight: bold;'
  );
  
  console.log(
    '%cFREQUENCY: 768 Hz (Unity Wave)',
    'color: #4caf50; font-weight: bold;'
  );
  
  console.log(
    '%cGOLDEN ANGLE: 137.5077640°',
    'color: #4caf50; font-weight: bold;'
  );
  
  console.log(
    '%cPHI RATIO: 1.618033988749895',
    'color: #4caf50; font-weight: bold;'
  );
  
  console.log('%c⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯', 'color: #03a9f4;');
  console.log('%c© 2025 CQIL - ⚡φ∞ 🌟 ॐ', 'color: #03a9f4; font-style: italic;');
}
