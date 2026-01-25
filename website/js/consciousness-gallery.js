/**
 * CQIL Consciousness Gallery
 * Implements interactive phi-harmonic gallery with frequency filtering and animations
 * Based on quantum flow principles and sacred ratios (φ = 1.618033988749895)
 */

document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    hideLoading();
    initParticleEffects();
    initFrequencyFilters();
});

/**
 * Initialize the gallery with animations and interactions
 */
function initGallery() {
    // Add shimmer animation triggers
    const cards = document.querySelectorAll('.exhibit-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const shimmer = card.querySelector('.card-shimmer');
            if (shimmer) {
                /** @type {HTMLElement} */ (shimmer).style.left = '-150%';
                /** @type {HTMLElement} */ (shimmer).style.animation = 'none';
                setTimeout(() => {
                    if (shimmer) {
                        /** @type {HTMLElement} */ (shimmer).style.animation = 'shimmer 1.5s forwards';
                    }
                }, 50);
            }
        });
    });

    // Initialize frequency badges with phi-harmonic hover effects
    const badges = document.querySelectorAll('.frequency-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            /** @type {HTMLElement} */ (badge).style.transform = 'scale(1.1)';
        });
        badge.addEventListener('mouseleave', () => {
            /** @type {HTMLElement} */ (badge).style.transform = 'scale(1)';
        });
    });

    // Initialize mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.quantum-nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Phi-harmonic scroll animations
    const scrollElements = document.querySelectorAll('.section-header, .upcoming-section');
    
    /**
     * Check if element is in view
     * @param {Element} el - Element to check
     * @param {number} percentageScroll - Percentage of element that must be visible
     * @returns {boolean} Whether element is in view
     */
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100)
        );
    };
    
    /**
     * Add scrolled class to element that comes into view
     * @param {Element} element - Element to display
     */
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 85)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Trigger initial animation check
    handleScrollAnimation();
}

/**
 * Initialize frequency filters for exhibit cards
 */
function initFrequencyFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const cards = document.querySelectorAll('.exhibit-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter') || 'all';
            
            // Filter cards based on the selected frequency
            cards.forEach(card => {
                if (filter === 'all') {
                    /** @type {HTMLElement} */ (card).style.display = 'flex';
                    setTimeout(() => {
                        /** @type {HTMLElement} */ (card).style.opacity = '1';
                        /** @type {HTMLElement} */ (card).style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    const frequencies = card.getAttribute('data-frequency');
                    if (frequencies && frequencies.includes(filter)) {
                        /** @type {HTMLElement} */ (card).style.display = 'flex';
                        setTimeout(() => {
                            /** @type {HTMLElement} */ (card).style.opacity = '1';
                            /** @type {HTMLElement} */ (card).style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        /** @type {HTMLElement} */ (card).style.opacity = '0';
                        /** @type {HTMLElement} */ (card).style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            /** @type {HTMLElement} */ (card).style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

/**
 * Initialize particle effects in the resonance pattern visualization
 */
function initParticleEffects() {
    const resonancePattern = document.querySelector('.resonance-pattern');
    if (!resonancePattern) return;
    
    // Phi-based parameters (φ = 1.618033988749895)
    const phi = 1.618033988749895;
    const baseRadius = 100;
    const baseParticleCount = 5; // We already have 5 static particles
    
    // Create dynamic particles based on phi
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'visual-particle';
        
        // Position based on phi spiral
        const angle = i * phi * Math.PI;
        const distance = (i + 1) * (baseRadius / baseParticleCount / phi);
        const x = Math.cos(angle) * distance + baseRadius;
        const y = Math.sin(angle) * distance + baseRadius;
        
        // Set styles
        particle.style.top = `${y}px`;
        particle.style.left = `${x}px`;
        particle.style.width = `${6 / (i * 0.3 + 1)}px`;
        particle.style.height = `${6 / (i * 0.3 + 1)}px`;
        particle.style.backgroundColor = getFrequencyColor(i);
        
        // Add animation with phi-based timing
        const animDuration = 5 + (i * phi);
        particle.style.animation = `orbit ${animDuration}s infinite linear`;
        
        resonancePattern.appendChild(particle);
    }
    
    // Animate the entanglement demo if present
    animateEntanglementDemo();
}

/**
 * Get color based on frequency index using phi-harmonic proportions
 * @param {number} index - Index to determine color
 * @returns {string} CSS color value
 */
function getFrequencyColor(index) {
    const colors = [
        'rgba(66, 133, 244, 0.8)',   // Ground (432 Hz)
        'rgba(251, 188, 5, 0.8)',     // Creation (528 Hz)
        'rgba(234, 67, 53, 0.8)',     // Heart (594 Hz)
        'rgba(153, 51, 255, 0.8)'     // Unity (768 Hz)
    ];
    
    return colors[index % colors.length];
}

/**
 * Animate the quantum entanglement demonstration
 */
function animateEntanglementDemo() {
    const demo = document.querySelector('.entanglement-demo');
    if (!demo) return;
    
    /** @type {HTMLElement|null} */
    const particleA = demo.querySelector('.particle-a');
    /** @type {HTMLElement|null} */
    const particleB = demo.querySelector('.particle-b');
    /** @type {HTMLElement|null} */
    const line = demo.querySelector('.entanglement-line');
    
    if (!particleA || !particleB || !line) return;
    
    // Simulate quantum state changes
    setInterval(() => {
        // Random state change with 30% probability
        if (Math.random() < 0.3) {
            const newOpacity = 0.3 + Math.random() * 0.7;
            const newSize = 20 + Math.random() * 20;
            
            // Change both particles in sync (entangled)
            particleA.style.opacity = newOpacity.toString();
            particleB.style.opacity = newOpacity.toString();
            
            particleA.style.width = `${newSize}px`;
            particleA.style.height = `${newSize}px`;
            
            particleB.style.width = `${newSize}px`;
            particleB.style.height = `${newSize}px`;
            
            // Pulse the entanglement line
            line.style.opacity = newOpacity.toString();
            line.style.height = `${2 + (newSize / 15)}px`;
            
            // Add pulse animation to the line
            const pulse = document.createElement('div');
            pulse.className = 'pulse-effect';
            pulse.style.position = 'absolute';
            pulse.style.top = '-5px';
            pulse.style.height = '10px';
            pulse.style.width = '10px';
            pulse.style.borderRadius = '50%';
            pulse.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            pulse.style.animation = 'pulse-across 1s linear forwards';
            
            line.appendChild(pulse);
            
            // Remove pulse after animation completes
            setTimeout(() => {
                if (line.contains(pulse)) {
                    line.removeChild(pulse);
                }
            }, 1000);
        }
    }, 2000);
}

/**
 * Hide the loading screen
 */
function hideLoading() {
    // Hide loading screen after content loads
    const loading = document.getElementById('page-loading');
    if (loading) {
        // Give items a chance to initialize first
        setTimeout(() => {
            /** @type {HTMLElement} */ (loading).style.opacity = '0';
            setTimeout(() => {
                if (loading.parentNode) {
                    loading.parentNode.removeChild(loading);
                }
            }, 500);
        }, 800);
    }
}
