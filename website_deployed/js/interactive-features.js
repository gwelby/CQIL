// CQIL Interactive Features

class QuantumInteractive {
    constructor() {
        this.initializeFeatures();
        this.setupEventListeners();
        this.initializeCanvases();
    }

    initializeFeatures() {
        // Initialize all interactive features
        this.initializeScrollEffects();
        this.initializeParallax();
        this.initializeQuantumCursor();
        this.initializeFlowTransitions();
    }

    // Smooth Scroll Effects
    initializeScrollEffects() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Parallax Effects
    initializeParallax() {
        window.addEventListener('scroll', () => {
            const parallaxElements = document.querySelectorAll('.parallax');
            parallaxElements.forEach(element => {
                const scrolled = window.pageYOffset;
                const rate = element.dataset.rate || 0.5;
                element.style.transform = `translate3d(0px, ${scrolled * rate}px, 0px)`;
            });
        });
    }

    // Quantum Cursor Effect
    initializeQuantumCursor() {
        // Skip on mobile devices
        if (window.innerWidth <= 768) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'quantum-cursor';
        document.body.appendChild(cursor);

        let particles = [];
        const particleCount = 5;

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // Create quantum particles
            for (let i = 0; i < particleCount; i++) {
                createParticle(e.clientX, e.clientY);
            }
        });

        function createParticle(x, y) {
            const particle = document.createElement('div');
            particle.className = 'quantum-particle';
            document.body.appendChild(particle);

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 2 + 1;
            const size = Math.random() * 5 + 3;
            let life = 1;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            particles.push({
                element: particle,
                x,
                y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life
            });
        }

        function updateParticles() {
            particles = particles.filter(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life -= 0.02;

                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
                particle.element.style.opacity = particle.life;

                if (particle.life <= 0) {
                    particle.element.remove();
                    return false;
                }
                return true;
            });

            requestAnimationFrame(updateParticles);
        }

        updateParticles();
    }

    // Flow Transitions
    initializeFlowTransitions() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('flow-visible');
                }
            });
        });

        document.querySelectorAll('.flow-card, .system-card, .feature-card').forEach(element => {
            observer.observe(element);
        });
    }

    // Initialize feature demo canvases
    initializeCanvases() {
        const canvases = document.querySelectorAll('.feature-demo');
        
        canvases.forEach(canvas => {
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            const id = canvas.id;
            
            // Set canvas dimensions
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            // Initialize the appropriate visualization based on canvas ID
            switch(id) {
                case 'energy-field':
                    this.initEnergyField(canvas, ctx);
                    break;
                case 'flow-pattern':
                    this.initFlowPattern(canvas, ctx);
                    break;
                case 'harmonics':
                    this.initHarmonics(canvas, ctx);
                    break;
                case 'time-crystal':
                    this.initTimeCrystal(canvas, ctx);
                    break;
            }
        });
        
        // Initialize main demo canvas if it exists
        const demoCanvas = document.getElementById('demo-canvas');
        if (demoCanvas) {
            demoCanvas.width = demoCanvas.offsetWidth;
            demoCanvas.height = demoCanvas.offsetHeight;
            this.initEnergyField(demoCanvas, demoCanvas.getContext('2d'));
        }
    }

    // Energy Field visualization
    initEnergyField(canvas, ctx) {
        if (!canvas || !ctx) return;
        
        const particles = [];
        const particleCount = 50;
        const colors = ['#4285f4', '#34a853', '#fbbc05', '#ea4335'];
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 1 + 0.5,
                angle: Math.random() * Math.PI * 2
            });
        }
        
        // Animation function
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Move particle
                particle.x += Math.cos(particle.angle) * particle.speed;
                particle.y += Math.sin(particle.angle) * particle.speed;
                
                // Boundary check
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // Flow Pattern visualization
    initFlowPattern(canvas, ctx) {
        if (!canvas || !ctx) return;
        
        const lines = [];
        const lineCount = 20;
        
        // Create lines
        for (let i = 0; i < lineCount; i++) {
            lines.push({
                points: [{
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height
                }],
                color: `hsl(${Math.random() * 360}, 80%, 60%)`,
                maxPoints: 50
            });
        }
        
        // Animation function
        function animate() {
            ctx.fillStyle = 'rgba(10, 10, 26, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            lines.forEach(line => {
                // Add new point
                if (line.points.length > 0) {
                    const lastPoint = line.points[line.points.length - 1];
                    const newPoint = {
                        x: lastPoint.x + (Math.random() * 10 - 5),
                        y: lastPoint.y + (Math.random() * 10 - 5)
                    };
                    
                    // Boundary check
                    if (newPoint.x > 0 && newPoint.x < canvas.width && 
                        newPoint.y > 0 && newPoint.y < canvas.height) {
                        line.points.push(newPoint);
                    } else {
                        // Reset line if out of bounds
                        line.points = [{
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height
                        }];
                    }
                    
                    // Limit points
                    if (line.points.length > line.maxPoints) {
                        line.points.shift();
                    }
                }
                
                // Draw line
                if (line.points.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(line.points[0].x, line.points[0].y);
                    
                    for (let i = 1; i < line.points.length; i++) {
                        ctx.lineTo(line.points[i].x, line.points[i].y);
                    }
                    
                    ctx.strokeStyle = line.color;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // Harmonics visualization
    initHarmonics(canvas, ctx) {
        if (!canvas || !ctx) return;
        
        const waveforms = [
            { frequency: 1, amplitude: 15, phase: 0, color: '#4285f4' },
            { frequency: 2, amplitude: 10, phase: Math.PI / 4, color: '#34a853' },
            { frequency: 3, amplitude: 7, phase: Math.PI / 2, color: '#fbbc05' },
            { frequency: 4, amplitude: 5, phase: Math.PI * 3/4, color: '#ea4335' }
        ];
        
        let time = 0;
        
        // Animation function
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw center line
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.stroke();
            
            // Draw each waveform
            waveforms.forEach(wave => {
                ctx.beginPath();
                
                for (let x = 0; x < canvas.width; x++) {
                    const y = canvas.height / 2 + 
                              wave.amplitude * 
                              Math.sin(x * wave.frequency * 0.01 + time + wave.phase);
                    
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                
                ctx.strokeStyle = wave.color;
                ctx.lineWidth = 2;
                ctx.stroke();
            });
            
            // Draw combined waveform
            ctx.beginPath();
            
            for (let x = 0; x < canvas.width; x++) {
                let y = canvas.height / 2;
                
                waveforms.forEach(wave => {
                    y += wave.amplitude * 
                         Math.sin(x * wave.frequency * 0.01 + time + wave.phase);
                });
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            time += 0.05;
            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // Time Crystal visualization
    initTimeCrystal(canvas, ctx) {
        if (!canvas || !ctx) return;
        
        const center = {
            x: canvas.width / 2,
            y: canvas.height / 2
        };
        
        const layers = 5;
        const dotsPerLayer = 8;
        let rotation = 0;
        
        // Animation function
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw layers
            for (let layer = 1; layer <= layers; layer++) {
                const radius = layer * (Math.min(canvas.width, canvas.height) / 12);
                const layerRotation = rotation * (layer % 2 === 0 ? -1 : 1);
                
                for (let i = 0; i < dotsPerLayer; i++) {
                    const angle = (i / dotsPerLayer) * Math.PI * 2 + layerRotation;
                    const x = center.x + radius * Math.cos(angle);
                    const y = center.y + radius * Math.sin(angle);
                    
                    // Draw dot
                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = `hsl(${(i / dotsPerLayer) * 360}, 80%, 60%)`;
                    ctx.fill();
                    
                    // Draw connection to next dot
                    const nextI = (i + 1) % dotsPerLayer;
                    const nextAngle = (nextI / dotsPerLayer) * Math.PI * 2 + layerRotation;
                    const nextX = center.x + radius * Math.cos(nextAngle);
                    const nextY = center.y + radius * Math.sin(nextAngle);
                    
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(nextX, nextY);
                    ctx.strokeStyle = `hsla(${(i / dotsPerLayer) * 360}, 80%, 60%, 0.5)`;
                    ctx.stroke();
                }
            }
            
            rotation += 0.005;
            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // Event Listeners
    setupEventListeners() {
        // Mobile Menu Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.quantum-nav');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
            });
            
            // Close menu when clicking on a nav link
            document.querySelectorAll('.quantum-nav a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                });
            });
        }

        // Flow Card Hover Effects
        document.querySelectorAll('.flow-card').forEach(card => {
            card.addEventListener('mouseenter', this.createFlowEffect);
            card.addEventListener('mouseleave', this.removeFlowEffect);
        });
        
        // Demo switcher buttons
        document.querySelectorAll('.demo-controls button').forEach(button => {
            button.addEventListener('click', (e) => {
                const demoType = e.target.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
                if (demoType) this.startDemo(demoType);
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    // Demo switcher function
    startDemo(type) {
        const demoCanvas = document.getElementById('demo-canvas');
        if (!demoCanvas) return;
        
        const ctx = demoCanvas.getContext('2d');
        ctx.clearRect(0, 0, demoCanvas.width, demoCanvas.height);
        
        switch(type) {
            case 'energy':
                this.initEnergyField(demoCanvas, ctx);
                break;
            case 'flow':
                this.initFlowPattern(demoCanvas, ctx);
                break;
            case 'harmonic':
                this.initHarmonics(demoCanvas, ctx);
                break;
            case 'crystal':
                this.initTimeCrystal(demoCanvas, ctx);
                break;
        }
    }
    
    // Handle window resize
    handleResize() {
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        });
        
        // Reinitialize canvases
        this.initializeCanvases();
    }

    createFlowEffect(e) {
        const card = e.currentTarget;
        const flowEffect = document.createElement('div');
        flowEffect.className = 'flow-effect';
        card.appendChild(flowEffect);

        setTimeout(() => flowEffect.remove(), 1000);
    }

    removeFlowEffect(e) {
        const card = e.currentTarget;
        const flowEffect = card.querySelector('.flow-effect');
        if (flowEffect) {
            flowEffect.remove();
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.quantumInteractive = new QuantumInteractive();
});
