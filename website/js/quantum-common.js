/**
 * CQIL Website - Enhanced Common JavaScript Functionality
 * Features:
 * - Improved navigation
 * - Animation triggers on scroll
 * - Smooth scrolling
 * - Dark/light mode toggle
 * - Interactive particles
 * - Form validation
 * - Accessibility enhancements
 */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initParticleEffects();
    initModalSystem();
    initAccessibility();
});

/**
 * Navigation Enhancement
 * - Responsive menu toggle
 * - Active link detection
 * - Scroll behavior
 */
function initNavigation() {
    const nav = document.querySelector('.quantum-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.quantum-nav a');
    
    // Handle menu toggle for mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            // Accessibility - set proper aria attributes
            const expanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', expanded);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = expanded ? 'hidden' : '';
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav && nav.classList.contains('active') && !nav.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Handle active state on links
    navLinks.forEach(link => {
        // Set current page link as active
        if (link.href === window.location.href || window.location.href.includes(link.href)) {
            link.classList.add('active');
        }
        
        // For hash links, handle smooth scrolling
        if (link.hash && link.origin + link.pathname === window.location.origin + window.location.pathname) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.hash.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                        document.body.style.overflow = '';
                    }
                    
                    // Smooth scroll to element
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without reload
                    history.pushState(null, null, link.hash);
                }
            });
        }
    });
    
    // Add shadow to nav on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

/**
 * Scroll Effects
 * - Animate elements when they come into view
 * - Parallax effects
 * - Progress indication
 */
function initScrollEffects() {
    // Animation on scroll for elements with .animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .frequency-band, .tool-card');
    
    // Set initial states - add data attributes but don't animate yet
    animatedElements.forEach(element => {
        if (!element.hasAttribute('data-animation-set')) {
            element.style.opacity = '0';
            element.setAttribute('data-animation-set', 'true');
        }
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && element.style.opacity !== '1') {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
                element.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }
        });
    }
    
    // Call it on scroll and on page load
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Initial check
    
    // Re-trigger after a slight delay to catch any lazy-loaded elements
    setTimeout(handleScrollAnimation, 500);
    
    // Progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'scroll-progress';
    progressIndicator.style.position = 'fixed';
    progressIndicator.style.top = '0';
    progressIndicator.style.left = '0';
    progressIndicator.style.height = '3px';
    progressIndicator.style.backgroundColor = '#2196f3';
    progressIndicator.style.zIndex = '1000';
    progressIndicator.style.transition = 'width 0.1s';
    document.body.appendChild(progressIndicator);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = (scrollPosition / windowHeight) * 100;
        progressIndicator.style.width = `${scrollPercentage}%`;
    });
}

/**
 * Particle Effects
 * - Create and manage particle effects for areas with .quantum-particles class
 */
function initParticleEffects() {
    class Particle {
        constructor(canvas, options = {}) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            
            this.x = options.x || Math.random() * canvas.width;
            this.y = options.y || Math.random() * canvas.height;
            this.size = options.size || Math.random() * 3 + 1;
            this.speed = options.speed || 0.5;
            this.speedX = (Math.random() - 0.5) * this.speed;
            this.speedY = (Math.random() - 0.5) * this.speed;
            this.color = options.color || '#2196f3';
            this.opacity = options.opacity || Math.random() * 0.5 + 0.1;
            this.opacitySpeed = Math.random() * 0.01;
            this.opacityDirection = Math.random() > 0.5 ? 1 : -1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges
            if (this.x > this.canvas.width || this.x < 0) {
                this.speedX *= -1;
            }
            
            if (this.y > this.canvas.height || this.y < 0) {
                this.speedY *= -1;
            }
            
            // Pulsate opacity
            this.opacity += this.opacitySpeed * this.opacityDirection;
            if (this.opacity >= 0.5 || this.opacity <= 0.1) {
                this.opacityDirection *= -1;
            }
        }
        
        draw() {
            this.ctx.fillStyle = this.color;
            this.ctx.globalAlpha = this.opacity;
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
        }
    }
    
    class ParticleField {
        constructor(element, options = {}) {
            this.element = element;
            this.options = Object.assign({
                particleCount: 50,
                connectParticles: true,
                connectDistance: 100,
                connectWidth: 1,
                color: '#2196f3',
                responsive: true
            }, options);
            
            this.canvas = document.createElement('canvas');
            this.canvas.style.position = 'absolute';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            this.element.appendChild(this.canvas);
            
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.resizeTimeout = null;
            
            this.init();
        }
        
        init() {
            this.resize();
            this.createParticles();
            this.animate();
            
            if (this.options.responsive) {
                window.addEventListener('resize', () => {
                    clearTimeout(this.resizeTimeout);
                    this.resizeTimeout = setTimeout(() => this.resize(), 200);
                });
            }
        }
        
        resize() {
            this.canvas.width = this.element.offsetWidth;
            this.canvas.height = this.element.offsetHeight;
            
            // Recreate particles when resizing
            if (this.particles.length) {
                this.particles = [];
                this.createParticles();
            }
        }
        
        createParticles() {
            for (let i = 0; i < this.options.particleCount; i++) {
                this.particles.push(new Particle(this.canvas, {
                    color: this.options.color,
                    speed: this.options.speed || 0.5
                }));
            }
        }
        
        animate() {
            // Clear canvas with a slight fade effect
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Update and draw all particles
            this.particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Connect nearby particles
            if (this.options.connectParticles) {
                this.connectParticles();
            }
            
            requestAnimationFrame(() => this.animate());
        }
        
        connectParticles() {
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const p1 = this.particles[i];
                    const p2 = this.particles[j];
                    
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance <= this.options.connectDistance) {
                        // Set opacity based on distance
                        const opacity = 1 - (distance / this.options.connectDistance);
                        
                        this.ctx.strokeStyle = this.options.color;
                        this.ctx.globalAlpha = opacity * 0.5;
                        this.ctx.lineWidth = this.options.connectWidth;
                        
                        this.ctx.beginPath();
                        this.ctx.moveTo(p1.x, p1.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.stroke();
                        this.ctx.globalAlpha = 1;
                    }
                }
            }
        }
    }
    
    // Initialize particle fields
    const particleContainers = document.querySelectorAll('.quantum-particles');
    particleContainers.forEach(container => {
        new ParticleField(container, {
            particleCount: window.innerWidth < 768 ? 30 : 50,
            color: container.dataset.particleColor || '#2196f3',
            connectDistance: container.dataset.connectDistance || 100,
            speed: parseFloat(container.dataset.particleSpeed) || 0.5
        });
    });
    
    // Create phi particles for headers
    const phiParticles = document.querySelector('.phi-particles');
    if (phiParticles) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('phi-particle');
            particle.textContent = 'φ';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            particle.style.fontSize = `${Math.random() * 30 + 10}px`;
            particle.style.position = 'absolute';
            particle.style.color = 'rgba(255, 255, 255, 0.3)';
            particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
            phiParticles.appendChild(particle);
        }
    }
}

/**
 * Modal System
 * - Handle all modal dialogs on the site
 * - Timer modals, demo modals, etc.
 */
function initModalSystem() {
    // Generic modal handler
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.close-modal');
    
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal(modal);
            }
        });
    });
    
    // Timer modal functionality
    const timerModal = document.getElementById('practice-timer-modal');
    if (timerModal) {
        const timerDisplay = document.getElementById('timer-countdown');
        const timerInstruction = document.getElementById('practice-instruction');
        const startButton = document.getElementById('timer-start');
        const pauseButton = document.getElementById('timer-pause');
        const resetButton = document.getElementById('timer-reset');
        
        let timer = null;
        let timerDuration = 0;
        let timerRemaining = 0;
        let timerRunning = false;
        let practiceType = '';
        
        // Practice type-specific instructions
        const practiceInstructions = {
            breathing: [
                'Prepare to begin...',
                'Inhale slowly for 5 seconds',
                'Hold your breath gently for 3 seconds',
                'Exhale slowly for 8 seconds',
                'Continue this pattern'
            ],
            heart: [
                'Prepare to begin...',
                'Place your attention on your heart area',
                'Recall a feeling of appreciation or gratitude',
                'Breathe slowly and gently through this area',
                'Maintain this feeling of appreciation'
            ],
            spiral: [
                'Prepare to begin...',
                'Visualize a small spiral at your center',
                'With each breath, see it expanding outward',
                'Allow the spiral to grow beyond your body',
                'Notice how your awareness expands with it'
            ],
            time: [
                'Prepare to begin...',
                'Close your eyes and focus completely on "now"',
                'Notice the sounds around you',
                'Feel your body in the present moment',
                'When thoughts arise, gently return to now'
            ]
        };
        
        // Function to format time in MM:SS
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
        
        // Timer functions
        function startTimer() {
            if (!timerRunning) {
                timerRunning = true;
                startButton.disabled = true;
                pauseButton.disabled = false;
                
                let instructionIndex = 0;
                
                // Show practice-specific instructions
                if (practiceInstructions[practiceType]) {
                    instructionIndex = 1; // Start with first real instruction
                    timerInstruction.textContent = practiceInstructions[practiceType][instructionIndex];
                }
                
                timer = setInterval(() => {
                    timerRemaining--;
                    timerDisplay.textContent = formatTime(timerRemaining);
                    
                    // Cycle through instructions every 10 seconds
                    if (timerRemaining % 10 === 0 && practiceInstructions[practiceType]) {
                        instructionIndex = (instructionIndex + 1) % practiceInstructions[practiceType].length;
                        if (instructionIndex === 0) instructionIndex = 1; // Skip preparation message
                        
                        // Animate instruction change
                        timerInstruction.style.opacity = '0';
                        setTimeout(() => {
                            timerInstruction.textContent = practiceInstructions[practiceType][instructionIndex];
                            timerInstruction.style.opacity = '1';
                        }, 300);
                    }
                    
                    if (timerRemaining <= 0) {
                        clearInterval(timer);
                        timerRunning = false;
                        startButton.disabled = true;
                        pauseButton.disabled = true;
                        timerInstruction.textContent = 'Practice complete!';
                        
                        // Celebration effect
                        timerDisplay.style.color = '#4CAF50';
                        setTimeout(() => {
                            timerDisplay.style.color = '';
                        }, 3000);
                    }
                }, 1000);
            }
        }
        
        function pauseTimer() {
            if (timerRunning) {
                clearInterval(timer);
                timerRunning = false;
                startButton.disabled = false;
                timerInstruction.textContent = 'Paused - press start to continue';
            }
        }
        
        function resetTimer() {
            clearInterval(timer);
            timerRunning = false;
            timerRemaining = timerDuration;
            timerDisplay.textContent = formatTime(timerRemaining);
            startButton.disabled = false;
            pauseButton.disabled = false;
            timerInstruction.textContent = 'Prepare to begin...';
            timerDisplay.style.color = '';
        }
        
        // Set up timer button events
        if (startButton) startButton.addEventListener('click', startTimer);
        if (pauseButton) pauseButton.addEventListener('click', pauseTimer);
        if (resetButton) resetButton.addEventListener('click', resetTimer);
        
        // Make timer function globally available
        window.startPracticeTimer = function(type, seconds) {
            // Set up timer
            practiceType = type;
            timerDuration = seconds;
            timerRemaining = seconds;
            timerDisplay.textContent = formatTime(timerRemaining);
            
            // Set title based on practice type
            const practiceTitle = document.getElementById('practice-title');
            if (practiceTitle) {
                const titles = {
                    breathing: 'Balanced Breathing Practice',
                    heart: 'Heart-Brain Coherence Practice',
                    spiral: 'Expanding Awareness Practice',
                    time: 'Present Moment Awareness Practice'
                };
                practiceTitle.textContent = titles[type] || 'Practice Guide';
            }
            
            // Reset timer state
            clearInterval(timer);
            timerRunning = false;
            startButton.disabled = false;
            pauseButton.disabled = false;
            timerInstruction.textContent = 'Prepare to begin...';
            timerDisplay.style.color = '';
            
            // Show modal
            openModal(timerModal);
        };
    }
    
    // Frequency experience functionality
    window.experienceFrequency = function(frequency) {
        // Create or get existing modal
        let frequencyModal = document.getElementById('frequency-experience-modal');
        
        if (!frequencyModal) {
            frequencyModal = document.createElement('div');
            frequencyModal.id = 'frequency-experience-modal';
            frequencyModal.className = 'modal';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content frequency-modal-content';
            
            const closeButton = document.createElement('span');
            closeButton.className = 'close-modal';
            closeButton.innerHTML = '&times;';
            closeButton.addEventListener('click', () => closeModal(frequencyModal));
            
            const modalTitle = document.createElement('h3');
            modalTitle.id = 'frequency-title';
            
            const visualizer = document.createElement('div');
            visualizer.className = 'frequency-visualizer';
            
            const canvas = document.createElement('canvas');
            canvas.id = 'frequency-canvas';
            visualizer.appendChild(canvas);
            
            const controls = document.createElement('div');
            controls.className = 'frequency-controls';
            
            const playButton = document.createElement('button');
            playButton.className = 'frequency-btn play-btn';
            playButton.innerHTML = '<span>Play</span>';
            playButton.addEventListener('click', togglePlay);
            
            const volumeControl = document.createElement('div');
            volumeControl.className = 'volume-control';
            volumeControl.innerHTML = `
                <label for="volume-slider">Volume:</label>
                <input type="range" id="volume-slider" min="0" max="100" value="50">
            `;
            
            const infoSection = document.createElement('div');
            infoSection.className = 'frequency-info';
            infoSection.id = 'frequency-info';
            
            controls.appendChild(playButton);
            controls.appendChild(volumeControl);
            
            modalContent.appendChild(closeButton);
            modalContent.appendChild(modalTitle);
            modalContent.appendChild(visualizer);
            modalContent.appendChild(controls);
            modalContent.appendChild(infoSection);
            
            frequencyModal.appendChild(modalContent);
            document.body.appendChild(frequencyModal);
            
            // Set up audio context and visualizer
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            let audioContext;
            let oscillator;
            let gainNode;
            let analyser;
            let isPlaying = false;
            
            function setupAudio() {
                if (!audioContext) {
                    audioContext = new AudioContext();
                    analyser = audioContext.createAnalyser();
                    analyser.fftSize = 2048;
                    gainNode = audioContext.createGain();
                    gainNode.gain.value = 0.5;
                    
                    // Volume control
                    const volumeSlider = document.getElementById('volume-slider');
                    if (volumeSlider) {
                        volumeSlider.addEventListener('input', () => {
                            gainNode.gain.value = volumeSlider.value / 100;
                        });
                    }
                }
            }
            
            function togglePlay() {
                if (isPlaying) {
                    stopSound();
                    playButton.innerHTML = '<span>Play</span>';
                } else {
                    setupAudio();
                    playSound(frequency);
                    playButton.innerHTML = '<span>Stop</span>';
                }
                isPlaying = !isPlaying;
            }
            
            function playSound(freq) {
                if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }
                
                oscillator = audioContext.createOscillator();
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                
                oscillator.connect(gainNode);
                gainNode.connect(analyser);
                analyser.connect(audioContext.destination);
                
                oscillator.start();
                
                // Start visualization
                visualize();
            }
            
            function stopSound() {
                if (oscillator) {
                    oscillator.stop();
                    oscillator.disconnect();
                }
                if (gainNode) {
                    gainNode.disconnect();
                }
                if (analyser) {
                    analyser.disconnect();
                }
                cancelAnimationFrame(animationId);
            }
            
            // Visualization
            const canvas = document.getElementById('frequency-canvas');
            const ctx = canvas.getContext('2d');
            let animationId;
            
            function setupCanvas() {
                canvas.width = visualizer.offsetWidth;
                canvas.height = 200;
            }
            
            window.addEventListener('resize', setupCanvas);
            setupCanvas();
            
            function visualize() {
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                
                function draw() {
                    animationId = requestAnimationFrame(draw);
                    
                    analyser.getByteTimeDomainData(dataArray);
                    
                    ctx.fillStyle = 'rgba(10, 10, 26, 0.2)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = getFrequencyColor(frequency);
                    ctx.beginPath();
                    
                    const sliceWidth = canvas.width / bufferLength;
                    let x = 0;
                    
                    for (let i = 0; i < bufferLength; i++) {
                        const v = dataArray[i] / 128.0;
                        const y = v * canvas.height / 2;
                        
                        if (i === 0) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                        
                        x += sliceWidth;
                    }
                    
                    ctx.lineTo(canvas.width, canvas.height / 2);
                    ctx.stroke();
                    
                    // Draw frequency info
                    ctx.fillStyle = getFrequencyColor(frequency);
                    ctx.font = '14px Arial';
                    ctx.fillText(`${frequency} Hz`, 10, 20);
                }
                
                draw();
            }
        }
        
        // Update modal content for the specific frequency
        const frequencyTitle = document.getElementById('frequency-title');
        const frequencyInfo = document.getElementById('frequency-info');
        
        if (frequencyTitle && frequencyInfo) {
            // Frequency info mapping
            const frequencyData = {
                432: {
                    name: 'Ground State (432 Hz)',
                    color: '#7cb342',
                    description: 'This Earth connection frequency aligns with the planet\'s natural resonance. It creates stability and grounds consciousness in physical reality, serving as the foundation for all other frequencies.',
                    effects: 'Promotes calm, centeredness, and physical stability. Helps with stress reduction and connecting to the natural world.',
                    phiPower: 'φ⁰ = 1.000'
                },
                528: {
                    name: 'Creation Point (528 Hz)',
                    color: '#29b6f6',
                    description: 'Often called the "Miracle Tone" or "DNA repair frequency", this frequency is associated with transformation and healing. It facilitates creative expression and cellular regeneration.',
                    effects: 'Enhances creativity, promotes healing at the cellular level, and helps manifest new possibilities.',
                    phiPower: 'φ¹ = 1.618'
                },
                594: {
                    name: 'Heart Field (594 Hz)',
                    color: '#ec407a',
                    description: 'This heart-centered frequency creates emotional coherence and compassion. It helps balance emotional states and facilitates deeper connections with others.',
                    effects: 'Enhances emotional intelligence, compassion, and heart-centered awareness. Helps heal emotional wounds.',
                    phiPower: 'φ² = 2.618'
                },
                672: {
                    name: 'Voice Flow (672 Hz)',
                    color: '#66bb6a',
                    description: 'This expression frequency enhances communication and truth-speaking. It helps clear blocks to authentic expression and amplifies the power of vocal manifestation.',
                    effects: 'Improves communication clarity, enhances vocal resonance, and helps align speech with deeper truth.',
                    phiPower: 'φ³ = 4.236'
                },
                720: {
                    name: 'Vision Gate (720 Hz)',
                    color: '#26c6da',
                    description: 'This intuition frequency opens perception to higher dimensions. It enhances insight, foresight, and the ability to perceive beyond ordinary reality.',
                    effects: 'Expands perception, enhances intuition, and facilitates access to visionary states of consciousness.',
                    phiPower: 'φ⁴ = 6.854'
                },
                768: {
                    name: 'Unity Wave (768 Hz)',
                    color: '#ab47bc',
                    description: 'This oneness frequency dissolves separation and creates unity consciousness. It represents the perfect balance point where all frequencies integrate harmoniously.',
                    effects: 'Promotes feelings of universal connection, integration of opposites, and holistic awareness.',
                    phiPower: 'φ⁵ = 11.09'
                }
            };
            
            const data = frequencyData[frequency] || {
                name: `${frequency} Hz`,
                color: '#2196f3',
                description: 'This frequency has unique resonant properties that influence consciousness and matter in specific ways.',
                effects: 'The effects of this frequency are being researched and documented.',
                phiPower: 'Phi relationship: exploring'
            };
            
            frequencyTitle.textContent = data.name;
            frequencyTitle.style.color = data.color;
            
            frequencyInfo.innerHTML = `
                <p class="frequency-description">${data.description}</p>
                <div class="frequency-effects">
                    <h4>Effects:</h4>
                    <p>${data.effects}</p>
                </div>
                <div class="frequency-math">
                    <h4>Mathematical relationship:</h4>
                    <p>${data.phiPower}</p>
                </div>
            `;
        }
        
        // Show the modal
        openModal(frequencyModal);
    };
    
    // Function to get color for a frequency
    function getFrequencyColor(frequency) {
        const colors = {
            432: '#7cb342',
            528: '#29b6f6',
            594: '#ec407a',
            672: '#66bb6a',
            720: '#26c6da',
            768: '#ab47bc'
        };
        
        return colors[frequency] || '#2196f3';
    }
    
    // Helper functions for modals
    function openModal(modal) {
        if (modal) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            modal.style.display = 'flex';
            
            // Animate opening
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            
            // Set focus to first focusable element
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElements.length) {
                focusableElements[0].focus();
            }
        }
    }
    
    function closeModal(modal) {
        if (modal) {
            modal.style.opacity = '0';
            
            // Wait for animation to complete
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }, 300);
        }
    }
    
    // Make functions available globally
    window.openModal = openModal;
    window.closeModal = closeModal;
    
    // Demonstrate frequency function
    window.showInteractiveDemo = function(demoType) {
        alert(`The ${demoType} demo would launch here. This feature is coming soon!`);
    };
}

/**
 * Accessibility Enhancements
 * - Focus management
 * - ARIA attributes
 * - Keyboard navigation
 */
function initAccessibility() {
    // Set proper ARIA roles
    document.querySelectorAll('.menu-toggle').forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Toggle navigation menu');
    });
    
    // Add tabindex to interactive elements that may not have it
    document.querySelectorAll('.tool-card, .frequency-card, .practice-card').forEach(card => {
        if (!card.getAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
        }
    });
    
    // Handle keyboard interaction for cards
    document.querySelectorAll('.tool-card, .frequency-card, .practice-card').forEach(card => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                // Find and click the button within this card
                const button = card.querySelector('button');
                if (button) {
                    button.click();
                }
            }
        });
    });
    
    // Skip to content link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ID to main content if not present
    const mainContent = document.querySelector('main');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
    
    // Light/dark mode toggle based on user preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Add animation for wave effect
function addWaveSeparators() {
    const frequencyBands = document.querySelectorAll('.frequency-band');
    
    frequencyBands.forEach(band => {
        const waveDivider = document.createElement('div');
        waveDivider.className = 'wave-divider';
        waveDivider.innerHTML = `
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
            </svg>
        `;
        
        band.appendChild(waveDivider);
    });
}

// Call this after DOM is loaded
document.addEventListener('DOMContentLoaded', addWaveSeparators);

// Lazy loading for images
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// Call this after DOM is loaded
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Make toggleState available globally for wave-particle demo
window.toggleState = function(state) {
    // This will be implemented by specific pages that need it
    if (window.waveParticleDemo) {
        window.waveParticleDemo.setState(state);
    } else {
        console.log(`Setting state to ${state} - demo not fully implemented yet`);
    }
};