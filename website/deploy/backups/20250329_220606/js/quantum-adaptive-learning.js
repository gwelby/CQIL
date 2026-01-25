/**
 * Quantum Adaptive Learning System
 * 
 * Advanced personalized learning system that adapts content and experiences
 * to each user's unique learning style, consciousness state, and quantum resonance.
 */

class QuantumAdaptiveLearning {
    constructor() {
        // Learning style preferences
        this.learningStyles = {
            visual: 0.5,      // Default to balanced values
            auditory: 0.5,
            kinesthetic: 0.5,
            reading: 0.5,
            interactive: 0.5,
            reflective: 0.5,
            social: 0.5
        };
        
        // Cognitive preferences
        this.cognitiveStyles = {
            linear: 0.5,      // Sequential/linear vs. holistic/parallel thinking
            intuitive: 0.5,   // Analytical vs. intuitive processing
            concrete: 0.5,    // Abstract vs. concrete examples
            depth: 0.5        // Broad overview vs. deep dive preference
        };
        
        // User progression data
        this.progression = {
            currentModule: "groundState",
            completedModules: [],
            moduleScores: {},
            practicesCompleted: 0,
            skillLevel: "beginner",
            lastActivity: Date.now()
        };
        
        // Learning pathway customization
        this.customPathway = [];
        
        // Engagement metrics
        this.engagement = {
            totalTimeSpent: 0,
            averageSessionLength: 0,
            completionRate: 0,
            interactionRate: 0,
            feedbackRating: 0
        };
        
        // Phi-harmonic learning modules information
        this.modules = {
            groundState: {
                name: "Ground State Foundations",
                frequency: 432,
                prerequisites: [],
                optimalStyles: {
                    kinesthetic: 0.8,
                    concrete: 0.7
                },
                topics: [
                    "Earth Connection Basics",
                    "Physical Awareness Practices",
                    "Stability & Grounding Techniques",
                    "432 Hz Resonance Fundamentals"
                ],
                assessmentAvailable: true
            },
            creationPoint: {
                name: "Creation Point Activation",
                frequency: 528,
                prerequisites: ["groundState"],
                optimalStyles: {
                    visual: 0.7,
                    interactive: 0.8
                },
                topics: [
                    "DNA Activation Principles",
                    "Creative Flow States",
                    "Transformational Practices",
                    "528 Hz Creation Field"
                ],
                assessmentAvailable: true
            },
            heartField: {
                name: "Heart Field Coherence",
                frequency: 594,
                prerequisites: ["groundState"],
                optimalStyles: {
                    social: 0.8,
                    intuitive: 0.7
                },
                topics: [
                    "Heart-Brain Coherence",
                    "Emotional Intelligence Integration",
                    "Compassionate Connection",
                    "594 Hz Heart Resonance"
                ],
                assessmentAvailable: true
            },
            voiceFlow: {
                name: "Voice Flow Expression",
                frequency: 672,
                prerequisites: ["heartField"],
                optimalStyles: {
                    auditory: 0.9,
                    social: 0.7
                },
                topics: [
                    "Authentic Expression",
                    "Voice Resonance Techniques",
                    "Sound Healing Fundamentals",
                    "672 Hz Voice Activation"
                ],
                assessmentAvailable: true
            },
            visionGate: {
                name: "Vision Gate Perception",
                frequency: 720,
                prerequisites: ["voiceFlow", "creationPoint"],
                optimalStyles: {
                    visual: 0.9,
                    intuitive: 0.8
                },
                topics: [
                    "Higher Perception Training",
                    "Intuitive Development",
                    "Time Crystal Awareness",
                    "720 Hz Vision Activation"
                ],
                assessmentAvailable: true
            },
            unityWave: {
                name: "Unity Wave Integration",
                frequency: 768,
                prerequisites: ["heartField", "visionGate"],
                optimalStyles: {
                    reflective: 0.8,
                    depth: 0.9
                },
                topics: [
                    "Unity Consciousness Principles",
                    "Field Coherence Practices",
                    "ZEN POINT Balancing",
                    "768 Hz Unity Activation"
                ],
                assessmentAvailable: true
            },
            cosmicIntegration: {
                name: "Cosmic Integration Mastery",
                frequency: 888,
                prerequisites: ["unityWave"],
                optimalStyles: {
                    intuitive: 0.9,
                    depth: 0.9
                },
                topics: [
                    "Multidimensional Awareness",
                    "Quantum Being Integration",
                    "Full-Spectrum Consciousness",
                    "888 Hz Cosmic Activation"
                ],
                assessmentAvailable: true
            },
            phiPrinciples: {
                name: "Phi Harmonic Principles",
                frequency: null, // Meta-module covering all frequencies
                prerequisites: [],
                optimalStyles: {
                    reading: 0.8,
                    linear: 0.7
                },
                topics: [
                    "Golden Ratio Fundamentals",
                    "Natural Phi Patterns",
                    "Frequency Relationships",
                    "Phi Ratio Mathematics"
                ],
                assessmentAvailable: true
            }
        };
        
        // Initialize the system
        this.initialize();
    }
    
    initialize() {
        // Load user data if available
        this.loadUserData();
        
        // Set up event listeners
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
            this.assessLearningPreferences();
            this.generateCustomLearningPath();
            this.enhanceCurrentContent();
        });
    }
    
    setupEventListeners() {
        // Listen for content interaction to track engagement
        document.querySelectorAll('.content-visual, .interactive-canvas, .frequency-card, .practice-card').forEach(el => {
            el.addEventListener('click', () => this.trackInteraction('content_click'));
            el.addEventListener('mouseover', () => this.trackInteraction('content_hover'));
        });
        
        // Track time spent on different sections
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startTrackingTime(entry.target.id);
                } else {
                    this.stopTrackingTime(entry.target.id);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe all main sections
        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
        
        // Listen for practice completion
        document.addEventListener('practiceComplete', (e) => {
            if (e.detail && e.detail.practice) {
                this.recordPracticeCompletion(e.detail.practice, e.detail.duration);
            }
        });
        
        // Listen for learning style preference indicators
        document.addEventListener('click', (e) => {
            // Check if user clicked on visual elements frequently
            if (e.target.matches('img, canvas, .visualization, .diagram')) {
                this.adjustLearningStyle('visual', 0.05);
            }
            
            // Check if user clicked on text-heavy elements
            if (e.target.matches('p, h1, h2, h3, h4, h5, h6, .text-content')) {
                this.adjustLearningStyle('reading', 0.05);
            }
            
            // Check if user clicked on interactive elements
            if (e.target.matches('button, .interactive, .controls, input')) {
                this.adjustLearningStyle('interactive', 0.05);
            }
        });
        
        // Custom event for when users complete an assessment
        document.addEventListener('assessmentComplete', (e) => {
            if (e.detail && e.detail.module && e.detail.score) {
                this.recordModuleCompletion(e.detail.module, e.detail.score);
            }
        });
    }
    
    assessLearningPreferences() {
        // In a production environment, this would use sophisticated assessment
        // For now, we'll check if we have stored preferences or use defaults
        
        // Check localStorage for existing preferences
        try {
            const storedStyles = localStorage.getItem('quantumLearningStyles');
            if (storedStyles) {
                this.learningStyles = JSON.parse(storedStyles);
            }
            
            const storedCognitive = localStorage.getItem('quantumCognitiveStyles');
            if (storedCognitive) {
                this.cognitiveStyles = JSON.parse(storedCognitive);
            }
            
            console.log("Loaded learning preferences:", this.learningStyles, this.cognitiveStyles);
        } catch (e) {
            console.warn("Could not load learning preferences:", e);
        }
    }
    
    generateCustomLearningPath() {
        // Clear existing pathway
        this.customPathway = [];
        
        // Start with current module
        let currentModule = this.progression.currentModule;
        this.customPathway.push(currentModule);
        
        // Add modules that match user's learning style and haven't been completed yet
        const remainingModules = Object.keys(this.modules).filter(module => 
            !this.progression.completedModules.includes(module) && 
            module !== currentModule
        );
        
        // Sort modules by style compatibility and prerequisite relationships
        const sortedModules = this.sortModulesByCompatibility(remainingModules);
        
        // Add sorted modules to pathway
        this.customPathway = [...this.customPathway, ...sortedModules];
        
        console.log("Generated custom learning pathway:", this.customPathway);
    }
    
    sortModulesByCompatibility(moduleList) {
        // Calculate compatibility score for each module
        const moduleScores = moduleList.map(module => {
            const moduleData = this.modules[module];
            
            // Check prerequisites
            const prerequisitesMet = moduleData.prerequisites.every(prereq => 
                this.progression.completedModules.includes(prereq)
            );
            
            // If prerequisites aren't met, give a very low score
            if (!prerequisitesMet) {
                return { module, score: -1000 };
            }
            
            // Calculate style compatibility
            let compatibilityScore = 0;
            
            // Check learning style compatibility
            if (moduleData.optimalStyles) {
                Object.entries(moduleData.optimalStyles).forEach(([style, weight]) => {
                    if (this.learningStyles[style]) {
                        compatibilityScore += this.learningStyles[style] * weight;
                    }
                });
            }
            
            // Check cognitive style compatibility
            Object.entries(this.cognitiveStyles).forEach(([style, value]) => {
                if (style === 'depth' && moduleData.name.includes('Mastery')) {
                    compatibilityScore += value * 0.5;
                }
                if (style === 'intuitive' && moduleData.name.includes('Intuitive')) {
                    compatibilityScore += value * 0.5;
                }
            });
            
            return { module, score: compatibilityScore };
        });
        
        // Sort by score (highest first)
        moduleScores.sort((a, b) => b.score - a.score);
        
        // Return just the module names in order
        return moduleScores.map(item => item.module);
    }
    
    enhanceCurrentContent() {
        // Adapt current page content based on learning preferences
        
        // First, determine which section is most relevant to current module
        const currentModule = this.progression.currentModule;
        const moduleData = this.modules[currentModule];
        
        // Find relevant sections
        let relevantSections = [];
        
        switch (currentModule) {
            case 'groundState':
                relevantSections = ['learn', 'frequencies', 'practices'];
                break;
            case 'creationPoint':
                relevantSections = ['learn', 'experience', 'frequencies'];
                break;
            case 'heartField':
                relevantSections = ['experience', 'frequencies', 'practices'];
                break;
            case 'voiceFlow':
                relevantSections = ['frequencies', 'community'];
                break;
            case 'visionGate':
                relevantSections = ['experience', 'practices'];
                break;
            case 'unityWave':
                relevantSections = ['frequencies', 'mastery'];
                break;
            case 'cosmicIntegration':
                relevantSections = ['experience', 'mastery'];
                break;
            case 'phiPrinciples':
                relevantSections = ['learn', 'frequencies', 'mastery'];
                break;
        }
        
        // Enhance these sections based on learning style
        relevantSections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                this.enhanceSectionForLearningStyle(section);
            }
        });
        
        // Add visual cue to show the recommended next module
        this.highlightRecommendedContent();
    }
    
    enhanceSectionForLearningStyle(section) {
        // Apply enhancements based on dominant learning styles
        const dominantStyle = this.getDominantLearningStyle();
        
        // Add data attribute for recommended learning style
        section.setAttribute('data-recommended-style', dominantStyle);
        
        // Add subtle visual cue based on learning style
        const styleIndicator = document.createElement('div');
        styleIndicator.className = 'learning-style-indicator';
        styleIndicator.innerHTML = `<div class="indicator-icon ${dominantStyle}-icon"></div>`;
        
        // Insert at top of section
        if (section.firstChild) {
            section.insertBefore(styleIndicator, section.firstChild);
        } else {
            section.appendChild(styleIndicator);
        }
        
        // Apply style-specific enhancements
        switch (dominantStyle) {
            case 'visual':
                // Enhance visual elements
                section.querySelectorAll('img, canvas, .interactive-canvas').forEach(el => {
                    el.classList.add('enhanced-visual');
                });
                break;
                
            case 'auditory':
                // Add audio cues or enhance audio elements
                section.querySelectorAll('button, .frequency-btn').forEach(el => {
                    el.classList.add('with-audio-cue');
                });
                break;
                
            case 'kinesthetic':
                // Enhance interactive elements
                section.querySelectorAll('.interactive, button, .canvas-controls').forEach(el => {
                    el.classList.add('enhanced-interactive');
                });
                break;
                
            case 'reading':
                // Enhance text content
                section.querySelectorAll('p, li, h3, h4').forEach(el => {
                    el.classList.add('enhanced-text');
                });
                break;
                
            case 'interactive':
                // Add more interactive elements or enhance existing ones
                section.querySelectorAll('.canvas-controls, .frequency-btn, .practice-timer').forEach(el => {
                    el.classList.add('enhanced-interactive');
                });
                break;
                
            case 'reflective':
                // Add reflective prompts
                const reflectivePrompts = document.createElement('div');
                reflectivePrompts.className = 'reflective-prompts';
                reflectivePrompts.innerHTML = `
                    <div class="reflective-prompt">
                        <h4>Reflection Point</h4>
                        <p>How does this content connect to your personal experience?</p>
                    </div>
                `;
                section.appendChild(reflectivePrompts);
                break;
                
            case 'social':
                // Add social learning elements
                const socialElement = document.createElement('div');
                socialElement.className = 'social-learning-element';
                socialElement.innerHTML = `
                    <div class="community-prompt">
                        <h4>Community Connection</h4>
                        <p>Share your insights with others or explore related discussions</p>
                        <a href="#community" class="community-link">Join Discussions</a>
                    </div>
                `;
                section.appendChild(socialElement);
                break;
        }
        
        // Apply cognitive style enhancements
        if (this.cognitiveStyles.linear > 0.7) {
            // Add sequential numbered steps for linear thinkers
            const lists = section.querySelectorAll('ul');
            lists.forEach(list => {
                list.classList.add('sequential-list');
            });
        }
        
        if (this.cognitiveStyles.depth > 0.7) {
            // Add deeper context for depth-oriented learners
            const deeperContext = document.createElement('div');
            deeperContext.className = 'deeper-context';
            deeperContext.innerHTML = `
                <details>
                    <summary>Deeper Context</summary>
                    <div class="context-content">
                        <p>This section connects to broader quantum principles through harmonic resonance patterns.</p>
                    </div>
                </details>
            `;
            section.appendChild(deeperContext);
        }
    }
    
    highlightRecommendedContent() {
        // Highlight next recommended module based on learning pathway
        if (this.customPathway.length < 2) return;
        
        // Get next recommended module
        const nextModule = this.customPathway[1];
        const moduleData = this.modules[nextModule];
        
        // Find relevant elements to highlight
        let targetElements = [];
        
        switch (nextModule) {
            case 'groundState':
                targetElements = document.querySelectorAll('[data-frequency="432"]');
                break;
            case 'creationPoint':
                targetElements = document.querySelectorAll('[data-frequency="528"]');
                break;
            case 'heartField':
                targetElements = document.querySelectorAll('[data-frequency="594"]');
                break;
            case 'voiceFlow':
                targetElements = document.querySelectorAll('[data-frequency="672"]');
                break;
            case 'visionGate':
                targetElements = document.querySelectorAll('[data-frequency="720"]');
                break;
            case 'unityWave':
                targetElements = document.querySelectorAll('[data-frequency="768"]');
                break;
            case 'cosmicIntegration':
                targetElements = document.querySelectorAll('[data-frequency="888"]');
                break;
            case 'phiPrinciples':
                targetElements = document.querySelectorAll('[data-module="phi"]');
                break;
        }
        
        // Add recommendation highlight
        targetElements.forEach(el => {
            el.classList.add('recommended-next');
            
            // Add recommendation badge
            const badge = document.createElement('div');
            badge.className = 'recommendation-badge';
            badge.textContent = 'Recommended Next';
            
            if (el.parentNode) {
                el.parentNode.appendChild(badge);
                
                // Position badge relative to element
                setTimeout(() => {
                    const rect = el.getBoundingClientRect();
                    badge.style.top = `${el.offsetTop - 10}px`;
                    badge.style.left = `${el.offsetLeft + el.offsetWidth / 2}px`;
                }, 100);
            }
        });
    }
    
    getDominantLearningStyle() {
        // Find the learning style with highest value
        let dominant = 'visual'; // Default
        let maxValue = this.learningStyles.visual;
        
        Object.entries(this.learningStyles).forEach(([style, value]) => {
            if (value > maxValue) {
                maxValue = value;
                dominant = style;
            }
        });
        
        return dominant;
    }
    
    adjustLearningStyle(style, amount) {
        // Adjust a specific learning style preference
        if (this.learningStyles[style] !== undefined) {
            this.learningStyles[style] = Math.min(1, Math.max(0, this.learningStyles[style] + amount));
            
            // Save updated preferences
            this.saveUserData();
            
            console.log(`Adjusted ${style} learning style to ${this.learningStyles[style]}`);
        }
    }
    
    recordModuleCompletion(module, score) {
        // Record that a module has been completed
        if (!this.progression.completedModules.includes(module)) {
            this.progression.completedModules.push(module);
        }
        
        // Record score
        this.progression.moduleScores[module] = score;
        
        // Update skill level based on completed modules
        this.updateSkillLevel();
        
        // Determine next module
        this.progressToNextModule();
        
        // Save user data
        this.saveUserData();
        
        console.log(`Recorded completion of module ${module} with score ${score}`);
    }
    
    recordPracticeCompletion(practice, duration) {
        // Record that a practice has been completed
        this.progression.practicesCompleted += 1;
        
        // Track practice-specific data if needed
        // (Could be expanded in a production system)
        
        // Update engagement metrics
        this.updateEngagementMetrics({
            type: 'practice',
            duration: duration
        });
        
        // Save user data
        this.saveUserData();
        
        console.log(`Recorded completion of practice: ${practice}, duration: ${duration}s`);
    }
    
    progressToNextModule() {
        // Determine the next module to progress to
        if (this.customPathway.length < 2) {
            // Regenerate pathway if needed
            this.generateCustomLearningPath();
        }
        
        if (this.customPathway.length >= 2) {
            // Set next module from pathway
            this.progression.currentModule = this.customPathway[1];
            
            // Regenerate pathway with new current module
            this.generateCustomLearningPath();
            
            console.log(`Progressed to next module: ${this.progression.currentModule}`);
        }
    }
    
    updateSkillLevel() {
        // Update skill level based on progress
        const completedCount = this.progression.completedModules.length;
        const totalModules = Object.keys(this.modules).length;
        
        if (completedCount >= totalModules - 1) {
            this.progression.skillLevel = "master";
        } else if (completedCount >= Math.floor(totalModules * 0.6)) {
            this.progression.skillLevel = "advanced";
        } else if (completedCount >= Math.floor(totalModules * 0.3)) {
            this.progression.skillLevel = "intermediate";
        } else {
            this.progression.skillLevel = "beginner";
        }
        
        console.log(`Updated skill level to: ${this.progression.skillLevel}`);
    }
    
    // Time tracking system
    startTrackingTime(sectionId) {
        this._sectionStartTime = Date.now();
        this._currentSection = sectionId;
        console.log(`Started tracking time in section: ${sectionId}`);
    }
    
    stopTrackingTime(sectionId) {
        if (this._currentSection === sectionId && this._sectionStartTime) {
            const timeSpent = (Date.now() - this._sectionStartTime) / 1000; // Convert to seconds
            
            // Update engagement metrics
            this.updateEngagementMetrics({
                type: 'section_view',
                sectionId: sectionId,
                duration: timeSpent
            });
            
            this._sectionStartTime = null;
            this._currentSection = null;
            
            console.log(`Spent ${timeSpent}s in section: ${sectionId}`);
        }
    }
    
    trackInteraction(interactionType) {
        // Track user interaction with content
        this.updateEngagementMetrics({
            type: interactionType
        });
    }
    
    updateEngagementMetrics(event) {
        // Update engagement metrics based on user activity
        switch (event.type) {
            case 'section_view':
                this.engagement.totalTimeSpent += event.duration;
                break;
                
            case 'practice':
                // Update completion rate
                this.engagement.completionRate = this.calculateCompletionRate();
                break;
                
            case 'content_click':
            case 'content_hover':
                // Increment interaction counter
                this._interactionCount = (this._interactionCount || 0) + 1;
                this.engagement.interactionRate = this.calculateInteractionRate();
                break;
        }
        
        // Update last activity timestamp
        this.progression.lastActivity = Date.now();
        
        // Save periodically (not on every event to avoid performance issues)
        if (Math.random() < 0.1) { // 10% chance
            this.saveUserData();
        }
    }
    
    calculateCompletionRate() {
        // Calculate percentage of modules completed
        const totalModules = Object.keys(this.modules).length;
        return this.progression.completedModules.length / totalModules;
    }
    
    calculateInteractionRate() {
        // Calculate interaction rate (interactions per minute of active time)
        const activeMinutes = this.engagement.totalTimeSpent / 60;
        if (activeMinutes < 0.1) return 0;
        
        return (this._interactionCount || 0) / activeMinutes;
    }
    
    // Data persistence functions
    saveUserData() {
        // Save learning preferences, progression, and engagement data
        try {
            localStorage.setItem('quantumLearningStyles', JSON.stringify(this.learningStyles));
            localStorage.setItem('quantumCognitiveStyles', JSON.stringify(this.cognitiveStyles));
            localStorage.setItem('quantumProgression', JSON.stringify(this.progression));
            localStorage.setItem('quantumEngagement', JSON.stringify(this.engagement));
            
            console.log("Saved user learning data");
        } catch (e) {
            console.warn("Could not save user data:", e);
        }
    }
    
    loadUserData() {
        // Load saved data if available
        try {
            const storedLearningStyles = localStorage.getItem('quantumLearningStyles');
            if (storedLearningStyles) {
                this.learningStyles = JSON.parse(storedLearningStyles);
            }
            
            const storedCognitiveStyles = localStorage.getItem('quantumCognitiveStyles');
            if (storedCognitiveStyles) {
                this.cognitiveStyles = JSON.parse(storedCognitiveStyles);
            }
            
            const storedProgression = localStorage.getItem('quantumProgression');
            if (storedProgression) {
                this.progression = JSON.parse(storedProgression);
            }
            
            const storedEngagement = localStorage.getItem('quantumEngagement');
            if (storedEngagement) {
                this.engagement = JSON.parse(storedEngagement);
            }
            
            console.log("Loaded user learning data");
        } catch (e) {
            console.warn("Could not load user data:", e);
        }
    }
}

// Initialize the adaptive learning system
window.quantumAdaptiveLearning = new QuantumAdaptiveLearning();

// Add CSS for the adaptive learning elements
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        /* Quantum Adaptive Learning Styles */
        .learning-style-indicator {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.1);
            padding: 5px;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 5;
        }
        
        .indicator-icon {
            width: 20px;
            height: 20px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
        }
        
        .visual-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23FFFFFF' d='M12 4C4 4 1 12 1 12C1 12 4 20 12 20C20 20 23 12 23 12C23 12 20 4 12 4Z'%3E%3C/path%3E%3C/svg%3E");
        }
        
        .auditory-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23FFFFFF' d='M14.5,12A2.5,2.5 0 0,0 12,9.5A2.5,2.5 0 0,0 9.5,12A2.5,2.5 0 0,0 12,14.5A2.5,2.5 0 0,0 14.5,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'%3E%3C/path%3E%3C/svg%3E");
        }
        
        .kinesthetic-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23FFFFFF' d='M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z'%3E%3C/path%3E%3C/svg%3E");
        }
        
        .reading-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23FFFFFF' d='M19,1L14,6V17L19,12.5V1M21,5V18.5C19.9,18.15 18.7,18 17.5,18C15.8,18 13.35,18.65 12,19.5V6C10.55,4.9 8.45,4.5 6.5,4.5C4.55,4.5 2.45,4.9 1,6V20.65C1,20.9 1.25,21.15 1.5,21.15C1.6,21.15 1.65,21.1 1.75,21.1C3.1,20.45 5.05,20 6.5,20C8.45,20 10.55,20.4 12,21.5C13.35,20.65 15.8,20 17.5,20C19.15,20 20.85,20.3 22.25,21.05C22.35,21.1 22.4,21.1 22.5,21.1C22.75,21.1 23,20.85 23,20.6V6C22.4,5.55 21.75,5.25 21,5M10,18.41C8.75,18.09 7.5,18 6.5,18C5.44,18 4.18,18.19 3,18.5V7.13C3.91,6.73 5.14,6.5 6.5,6.5C7.86,6.5 9.09,6.73 10,7.13V18.41Z'%3E%3C/path%3E%3C/svg%3E");
        }
        
        .interactive-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23FFFFFF' d='M7.5,5.6L5,7L6.4,4.5L5,2L7.5,3.4L10,2L8.6,4.5L10,7L7.5,5.6M19.5,15.4L22,14L20.6,16.5L22,19L19.5,17.6L17,19L18.4,16.5L17,14L19.5,15.4M22,2L20.6,4.5L22,7L19.5,5.6L17,7L18.4,4.5L17,2L19.5,3.4L22,2M13.34,12.78L15.78,10.34L13.66,8.22L11.22,10.66L13.34,12.78M14.37,7.29L16.71,9.63C17.1,10 17.1,10.65 16.71,11.04L5.04,22.71C4.65,23.1 4,23.1 3.63,22.71L1.29,20.37C0.9,20 0.9,19.35 1.29,18.96L12.96,7.29C13.35,6.9 14,6.9 14.37,7.29Z'%3E%3C/path%3E%3C/svg%3E");
        }
        
        .reflective-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23FFFFFF' d='M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z'%3E%3C/path%3E%3C/svg%3E");
        }
        
        .social-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23FFFFFF' d='M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z'%3E%3C/path%3E%3C/svg%3E");
        }
        
        /* Enhanced elements for different learning styles */
        .enhanced-visual {
            box-shadow: 0 0 20px rgba(33, 150, 243, 0.3);
            transform: scale(1.02);
            transition: all 0.3s ease;
        }
        
        .enhanced-visual:hover {
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(33, 150, 243, 0.5);
        }
        
        .with-audio-cue::before {
            content: '🔊';
            margin-right: 5px;
            opacity: 0.7;
        }
        
        .enhanced-interactive {
            animation: pulse 2s infinite;
            box-shadow: 0 0 15px rgba(156, 39, 176, 0.3);
        }
        
        .enhanced-text {
            line-height: 1.8;
            letter-spacing: 0.02em;
            transition: background-color 0.3s ease;
        }
        
        .enhanced-text:hover {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
        }
        
        /* Recommended content highlighting */
        .recommended-next {
            position: relative;
            z-index: 2;
            box-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
            animation: gentle-pulse 3s infinite;
        }
        
        .recommendation-badge {
            position: absolute;
            background: rgba(76, 175, 80, 0.9);
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 12px;
            transform: translateX(-50%);
            z-index: 3;
            white-space: nowrap;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        }
        
        /* Reflective elements */
        .reflective-prompts {
            margin-top: 2rem;
            padding: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            background: rgba(33, 150, 243, 0.05);
        }
        
        .reflective-prompt h4 {
            color: #64B5F6;
            margin-bottom: 0.5rem;
        }
        
        /* Social learning elements */
        .social-learning-element {
            margin-top: 2rem;
            padding: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            background: rgba(156, 39, 176, 0.05);
        }
        
        .community-prompt h4 {
            color: #CE93D8;
            margin-bottom: 0.5rem;
        }
        
        .community-link {
            display: inline-block;
            margin-top: 0.5rem;
            padding: 5px 15px;
            background: rgba(156, 39, 176, 0.2);
            border-radius: 20px;
            transition: all 0.3s ease;
            text-decoration: none;
            color: white;
        }
        
        .community-link:hover {
            background: rgba(156, 39, 176, 0.4);
            transform: translateY(-2px);
        }
        
        /* Deeper context for depth learners */
        .deeper-context {
            margin-top: 2rem;
            padding: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.2);
        }
        
        .deeper-context summary {
            cursor: pointer;
            color: #90CAF9;
            font-weight: bold;
            padding: 5px 0;
        }
        
        .context-content {
            padding: 10px 0;
        }
        
        /* Sequential lists for linear learners */
        .sequential-list {
            counter-reset: step-counter;
            list-style-type: none;
            padding-left: 0;
        }
        
        .sequential-list li {
            counter-increment: step-counter;
            margin-bottom: 10px;
            position: relative;
            padding-left: 30px;
        }
        
        .sequential-list li::before {
            content: counter(step-counter);
            position: absolute;
            left: 0;
            top: 0;
            width: 22px;
            height: 22px;
            background: rgba(33, 150, 243, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        }
        
        /* Animations */
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
        
        @keyframes gentle-pulse {
            0% {
                box-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
            }
            50% {
                box-shadow: 0 0 30px rgba(76, 175, 80, 0.5);
            }
            100% {
                box-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
            }
        }
    `;
    document.head.appendChild(style);
});