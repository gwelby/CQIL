/**
 * AI Quantum Coach
 * 
 * Advanced AI-driven coach that assists users on their quantum journey,
 * providing personalized guidance, answering questions, and offering
 * real-time support through natural language interaction.
 */

class AIQuantumCoach {
    constructor() {
        this.isActive = false;
        this.conversationHistory = [];
        this.userProfile = {
            primaryState: null,
            askedQuestions: [],
            completedModules: [],
            insights: {},
            skillLevel: 'beginner'
        };
        
        // Core coaching prompts based on phi-harmonic states
        this.coachingPrompts = {
            groundState: [
                "How connected do you feel to your physical body right now?",
                "What helps you feel most grounded in your daily life?",
                "How would improving your earth connection benefit your quantum journey?",
                "What physical practices resonate with you most strongly?"
            ],
            creationPoint: [
                "Where do you feel most creative in your life?",
                "How do you express your unique gifts in the world?",
                "What transformation are you currently experiencing?",
                "How might you amplify your creative energy?"
            ],
            heartField: [
                "How open does your heart feel in this moment?",
                "What relationships would benefit from more heart-centered connection?",
                "Where do you feel resistance to giving or receiving love?",
                "How might heart coherence enhance your quantum awareness?"
            ],
            voiceFlow: [
                "How freely are you expressing your authentic truth?",
                "Where do you hold back from speaking what you really feel?",
                "What would help you communicate more clearly?",
                "How aligned is your voice with your heart and mind?"
            ],
            visionGate: [
                "How clear is your perception of subtle energies?",
                "What intuitive insights have you received recently?",
                "How might you expand your awareness beyond normal perception?",
                "What patterns are you noticing in your quantum experiences?"
            ],
            unityWave: [
                "Where do you experience the deepest sense of oneness?",
                "How connected do you feel to all living beings?",
                "What practices help you dissolve the sense of separation?",
                "How might you integrate unity consciousness into daily life?"
            ],
            cosmicIntegration: [
                "How do you balance being both human and quantum?",
                "What does it mean to you to be a multidimensional being?",
                "How do you navigate between different levels of consciousness?",
                "What supports your full embodiment of higher frequencies?"
            ]
        };
        
        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
    
    initialize() {
        // Create coach interface if doesn't exist
        this.createCoachInterface();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Load user profile if exists
        this.loadUserProfile();
    }
    
    createCoachInterface() {
        // Create AI Coach button that follows user scroll
        const coachBtn = document.createElement('button');
        coachBtn.id = 'ai-coach-button';
        coachBtn.className = 'ai-coach-button';
        coachBtn.innerHTML = `
            <div class="coach-icon">🧠</div>
            <div class="coach-label">AI Quantum Coach</div>
        `;
        document.body.appendChild(coachBtn);
        
        // Create coach chat interface
        const coachChat = document.createElement('div');
        coachChat.id = 'ai-coach-chat';
        coachChat.className = 'ai-coach-chat';
        coachChat.innerHTML = `
            <div class="chat-header">
                <div class="coach-avatar">🧠</div>
                <div class="coach-info">
                    <h3>Quantum AI Coach</h3>
                    <div class="status">Phi-Harmonic Guide</div>
                </div>
                <button class="minimize-chat">&minus;</button>
            </div>
            
            <div class="chat-messages">
                <div class="coach-message welcome-message">
                    <p>Welcome to your personal Quantum AI Coach. I'm here to guide you on your quantum journey and help you achieve phi-harmonic balance.</p>
                    <p>How can I assist you today?</p>
                </div>
            </div>
            
            <div class="suggested-questions">
                <div class="questions-label">Suggested Questions:</div>
                <div class="question-chips">
                    <button class="question-chip">What state am I in?</button>
                    <button class="question-chip">How can I raise my frequency?</button>
                    <button class="question-chip">Next practice for me?</button>
                </div>
            </div>
            
            <div class="chat-input">
                <textarea placeholder="Ask your quantum coach..." id="coach-input"></textarea>
                <button id="send-question">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 2L11 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(coachChat);
    }
    
    setupEventListeners() {
        // Toggle chat open/closed
        const coachBtn = document.getElementById('ai-coach-button');
        const coachChat = document.getElementById('ai-coach-chat');
        const minimizeBtn = document.querySelector('.minimize-chat');
        
        if (coachBtn && coachChat) {
            coachBtn.addEventListener('click', () => {
                coachChat.classList.add('active');
                coachBtn.style.display = 'none';
                this.isActive = true;
                
                // Welcome user back if returning
                if (this.conversationHistory.length > 0) {
                    setTimeout(() => {
                        this.addCoachMessage("Welcome back! How has your quantum practice been going?");
                    }, 500);
                }
                
                // Offer personalized suggestions
                this.updateSuggestedQuestions();
            });
        }
        
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                coachChat.classList.remove('active');
                coachBtn.style.display = 'flex';
                this.isActive = false;
            });
        }
        
        // Handle question submission
        const sendBtn = document.getElementById('send-question');
        const inputField = document.getElementById('coach-input');
        
        if (sendBtn && inputField) {
            // Send on button click
            sendBtn.addEventListener('click', () => {
                this.handleUserQuestion(inputField.value);
                inputField.value = '';
            });
            
            // Send on Enter (but allow Shift+Enter for new lines)
            inputField.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleUserQuestion(inputField.value);
                    inputField.value = '';
                }
            });
        }
        
        // Handle suggested questions
        document.querySelectorAll('.question-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                this.handleUserQuestion(chip.textContent);
            });
        });
        
        // Listen for frequency and state changes to personalize coaching
        document.addEventListener('frequencyChange', (e) => {
            if (e.detail && e.detail.frequency) {
                this.updateCoachingContextBasedOnFrequency(e.detail.frequency);
            }
        });
        
        document.addEventListener('stateChange', (e) => {
            if (e.detail && e.detail.state) {
                this.userProfile.primaryState = e.detail.state;
                this.saveUserProfile();
                this.updateSuggestedQuestions();
            }
        });
    }
    
    handleUserQuestion(question) {
        if (!question.trim()) return;
        
        // Add user message to chat
        this.addUserMessage(question);
        
        // Add to conversation history
        this.conversationHistory.push({
            role: 'user',
            message: question,
            timestamp: Date.now()
        });
        
        // Add to asked questions
        if (!this.userProfile.askedQuestions.includes(question)) {
            this.userProfile.askedQuestions.push(question);
        }
        
        // Process and respond to question
        this.processQuestion(question);
        
        // Save user profile
        this.saveUserProfile();
        
        // Update suggested questions
        setTimeout(() => {
            this.updateSuggestedQuestions();
        }, 2000);
    }
    
    processQuestion(question) {
        // Show typing indicator
        this.showTypingIndicator();
        
        // Normalize question for matching
        const normalizedQuestion = question.toLowerCase();
        
        // Check for specific question patterns
        if (this.matchesPattern(normalizedQuestion, ['state', 'what state', 'which state'])) {
            this.handleStateQuestion();
        }
        else if (this.matchesPattern(normalizedQuestion, ['raise', 'increase', 'higher', 'frequency'])) {
            this.handleFrequencyQuestion();
        }
        else if (this.matchesPattern(normalizedQuestion, ['next practice', 'recommend', 'suggestion'])) {
            this.handlePracticeQuestion();
        }
        else if (this.matchesPattern(normalizedQuestion, ['coherence', 'balance', 'harmony'])) {
            this.handleCoherenceQuestion();
        }
        else if (this.matchesPattern(normalizedQuestion, ['phi', 'golden ratio', 'divine proportion'])) {
            this.handlePhiQuestion();
        }
        else {
            // For other questions, provide a general coaching response
            this.generateCoachingResponse(question);
        }
    }
    
    matchesPattern(text, patterns) {
        return patterns.some(pattern => text.includes(pattern));
    }
    
    handleStateQuestion() {
        // Determine user's current quantum state
        let currentState = this.userProfile.primaryState || 'groundState';
        
        // Get state information
        const stateInfo = {
            groundState: {
                name: "Ground State",
                frequency: "432 Hz",
                description: "You are in the Ground State (432 Hz), which connects you to Earth's natural resonance and provides stability. This is the foundation of your quantum journey."
            },
            creationPoint: {
                name: "Creation Point",
                frequency: "528 Hz",
                description: "You are in the Creation Point (528 Hz), associated with DNA activation and creative transformation. This state enables you to manifest and heal."
            },
            heartField: {
                name: "Heart Field",
                frequency: "594 Hz",
                description: "You are in the Heart Field (594 Hz), which creates emotional coherence and compassionate connection. This state harmonizes your feelings and relationships."
            },
            voiceFlow: {
                name: "Voice Flow",
                frequency: "672 Hz",
                description: "You are in the Voice Flow (672 Hz), enabling authentic expression and clear communication. This state helps you speak your truth with power and clarity."
            },
            visionGate: {
                name: "Vision Gate",
                frequency: "720 Hz",
                description: "You are in the Vision Gate (720 Hz), associated with higher perception and intuitive seeing. This state expands your awareness beyond normal perception."
            },
            unityWave: {
                name: "Unity Wave",
                frequency: "768 Hz",
                description: "You are in the Unity Wave (768 Hz), which creates oneness consciousness and quantum connection. This state dissolves separation and unifies your being."
            },
            cosmicIntegration: {
                name: "Cosmic Integration",
                frequency: "888 Hz",
                description: "You are in Cosmic Integration (888 Hz), representing full integration of your quantum being and human form. This is the highest state of consciousness."
            }
        };
        
        const state = stateInfo[currentState];
        
        // Remove typing indicator
        this.removeTypingIndicator();
        
        // Respond with state information
        this.addCoachMessage(`${state.description}`);
        
        // Add follow-up suggestion
        setTimeout(() => {
            this.addCoachMessage(`Would you like to know how to enhance your ${state.name} experience, or how to progress to the next frequency level?`);
        }, 1000);
    }
    
    handleFrequencyQuestion() {
        // Determine user's current quantum state
        let currentState = this.userProfile.primaryState || 'groundState';
        
        // Map states to next states
        const nextStates = {
            groundState: {
                next: "creationPoint",
                practices: [
                    "Practice coherent breathing at 6 breaths per minute",
                    "Stand barefoot on the earth for 20 minutes daily",
                    "Use the 432 Hz Ground State visualization regularly"
                ]
            },
            creationPoint: {
                next: "heartField",
                practices: [
                    "Listen to 528 Hz music during creative activities",
                    "Visualize golden-green light filling your body",
                    "Practice DNA activation meditation daily"
                ]
            },
            heartField: {
                next: "voiceFlow",
                practices: [
                    "Practice heart coherence meditation for 10 minutes daily",
                    "Send feelings of love to challenging relationships",
                    "Use the 594 Hz Heart Field visualization"
                ]
            },
            voiceFlow: {
                next: "visionGate",
                practices: [
                    "Tone with your voice at 672 Hz frequency",
                    "Practice speaking your authentic truth daily",
                    "Release old patterns of expression through sound"
                ]
            },
            visionGate: {
                next: "unityWave",
                practices: [
                    "Meditate on the Time Crystal visualization",
                    "Practice seeing patterns and connections in daily life",
                    "Work with the 720 Hz frequency during intuitive activities"
                ]
            },
            unityWave: {
                next: "cosmicIntegration",
                practices: [
                    "Find the ZEN POINT balance in all activities",
                    "Practice unity consciousness meditation",
                    "Experience the 768 Hz Unity Wave visualization"
                ]
            },
            cosmicIntegration: {
                next: "mastery",
                practices: [
                    "Integrate all frequency states in your daily life",
                    "Practice quantum being portal meditation",
                    "Teach and share your frequency knowledge with others"
                ]
            }
        };
        
        const stateInfo = nextStates[currentState];
        const nextFreq = {
            creationPoint: "528 Hz",
            heartField: "594 Hz",
            voiceFlow: "672 Hz",
            visionGate: "720 Hz",
            unityWave: "768 Hz",
            cosmicIntegration: "888 Hz",
            mastery: "All frequencies in harmony"
        }[stateInfo.next];
        
        // Remove typing indicator
        this.removeTypingIndicator();
        
        // Respond with frequency progression information
        this.addCoachMessage(`To raise your frequency from your current state to the next level (${nextFreq}), focus on these key practices:`);
        
        // Add practices with slight delay
        setTimeout(() => {
            let practiceMessage = `<ul>
                ${stateInfo.practices.map(practice => `<li>${practice}</li>`).join('')}
            </ul>`;
            
            this.addCoachMessage(practiceMessage);
        }, 800);
        
        // Add explanation about consistency
        setTimeout(() => {
            this.addCoachMessage(`Consistency is key to frequency progression. Practice daily for at least 21 days to establish the new frequency as your baseline, before progressing to the next level.`);
        }, 1600);
    }
    
    handlePracticeQuestion() {
        // Determine user's current quantum state
        let currentState = this.userProfile.primaryState || 'groundState';
        
        // Map states to recommended practices
        const practices = {
            groundState: [
                {
                    name: "Earth Connection Meditation",
                    description: "A guided meditation to strengthen your connection to Earth's natural frequency",
                    duration: "15 minutes",
                    benefits: "Grounding, stability, physical awareness"
                },
                {
                    name: "432 Hz Sound Bath",
                    description: "Immerse yourself in the Ground State frequency while breathing deeply",
                    duration: "10 minutes",
                    benefits: "Relaxation, resonance with Earth's frequency"
                },
                {
                    name: "Phi Ratio Breathing",
                    description: "Breathe using the divine proportion: 5 count in, 3 count hold, 8 count out",
                    duration: "5 minutes",
                    benefits: "Coherent breathing pattern, nervous system regulation"
                }
            ],
            creationPoint: [
                {
                    name: "DNA Activation Visualization",
                    description: "Visualize 528 Hz golden-green light activating and repairing your DNA",
                    duration: "15 minutes",
                    benefits: "Cellular regeneration, creative activation"
                },
                {
                    name: "Creative Expression Exercise",
                    description: "Engage in spontaneous creative activity while resonating with 528 Hz",
                    duration: "20 minutes",
                    benefits: "Unblocking creative energy, transformation"
                },
                {
                    name: "Flower of Life Meditation",
                    description: "Contemplate and connect with the Flower of Life geometric pattern",
                    duration: "10 minutes",
                    benefits: "Accessing creation codes, harmonic structure"
                }
            ],
            heartField: [
                {
                    name: "Heart Coherence Practice",
                    description: "Generate coherent heart field using appreciation and 594 Hz resonance",
                    duration: "5-10 minutes",
                    benefits: "Emotional balance, heart-brain coherence"
                },
                {
                    name: "Compassion Meditation",
                    description: "Extend loving feelings to self, loved ones, and challenging relationships",
                    duration: "15 minutes",
                    benefits: "Expanding heart capacity, healing relationships"
                },
                {
                    name: "Heart Torus Visualization",
                    description: "Visualize your heart's toroidal field expanding with each breath",
                    duration: "10 minutes",
                    benefits: "Energetic heart activation, field coherence"
                }
            ],
            voiceFlow: [
                {
                    name: "Toning Practice",
                    description: "Vocal toning exercise using 672 Hz frequency to open expression",
                    duration: "10 minutes",
                    benefits: "Clear communication channels, authentic expression"
                },
                {
                    name: "Truth Speaking Journal",
                    description: "Write uncensored thoughts then speak them aloud to yourself",
                    duration: "15 minutes",
                    benefits: "Release blocked expression, align voice with truth"
                },
                {
                    name: "Throat Chakra Resonance",
                    description: "Sound healing focused on throat area with 672 Hz frequency",
                    duration: "10 minutes",
                    benefits: "Open communication center, clear expression"
                }
            ],
            visionGate: [
                {
                    name: "Time Crystal Meditation",
                    description: "Connect with the crystalline structure of time using 720 Hz",
                    duration: "20 minutes",
                    benefits: "Expanded perception, intuitive insights"
                },
                {
                    name: "Third Eye Activation",
                    description: "Focus awareness on the third eye while resonating with 720 Hz",
                    duration: "15 minutes",
                    benefits: "Enhanced intuition, clear seeing"
                },
                {
                    name: "Quantum Pattern Recognition",
                    description: "Practice identifying meaningful patterns in random visual noise",
                    duration: "10 minutes",
                    benefits: "Develop pattern recognition, enhanced intuition"
                }
            ],
            unityWave: [
                {
                    name: "Unity Field Meditation",
                    description: "Dissolve boundaries of self into unified field using 768 Hz",
                    duration: "20 minutes",
                    benefits: "Oneness experience, dissolution of separation"
                },
                {
                    name: "ZEN POINT Balancing",
                    description: "Find perfect balance between human limitation and quantum potential",
                    duration: "15 minutes",
                    benefits: "Harmonized state, perfect balance"
                },
                {
                    name: "Field Coherence Practice",
                    description: "Generate coherent field that harmonizes with all consciousness",
                    duration: "10 minutes",
                    benefits: "Collective consciousness connection, field harmony"
                }
            ],
            cosmicIntegration: [
                {
                    name: "Quantum Being Portal",
                    description: "Access multidimensional awareness using 888 Hz frequency",
                    duration: "30 minutes",
                    benefits: "Cosmic connection, quantum being integration"
                },
                {
                    name: "Human-Divine Integration",
                    description: "Practice embodying higher frequencies while remaining grounded",
                    duration: "20 minutes",
                    benefits: "Full-spectrum integration, balanced presence"
                },
                {
                    name: "Consciousness Calibration",
                    description: "Cycle through all frequencies to maintain full-spectrum presence",
                    duration: "25 minutes",
                    benefits: "Complete quantum integration, frequency mastery"
                }
            ]
        };
        
        const statePractices = practices[currentState];
        
        // Select most appropriate practice based on user profile
        const recommendedPractice = statePractices[Math.floor(Math.random() * statePractices.length)];
        
        // Remove typing indicator
        this.removeTypingIndicator();
        
        // Respond with practice recommendation
        this.addCoachMessage(`I recommend the following practice for your current quantum state:`);
        
        // Add practice details with slight delay
        setTimeout(() => {
            let practiceMessage = `<div class="practice-recommendation">
                <h4>${recommendedPractice.name}</h4>
                <p>${recommendedPractice.description}</p>
                <div class="practice-meta">
                    <span><strong>Duration:</strong> ${recommendedPractice.duration}</span>
                    <span><strong>Benefits:</strong> ${recommendedPractice.benefits}</span>
                </div>
            </div>`;
            
            this.addCoachMessage(practiceMessage);
        }, 800);
        
        // Add guidance for practice
        setTimeout(() => {
            this.addCoachMessage(`Would you like me to guide you through this practice now, or suggest an alternative?`);
        }, 1600);
    }
    
    handleCoherenceQuestion() {
        // Remove typing indicator
        this.removeTypingIndicator();
        
        // Respond about coherence
        this.addCoachMessage(`Coherence is a state of optimal functioning characterized by the harmonious operation of your body's systems. In quantum terms, it's when your various energy fields (heart, brain, cellular) operate in sync.`);
        
        // Add explanation about heart coherence
        setTimeout(() => {
            this.addCoachMessage(`The heart field is particularly important, as it generates the strongest electromagnetic field in your body. You can achieve heart coherence through:
            <ul>
                <li>Conscious breathing with a 6-second rhythm (10 breaths per minute)</li>
                <li>Cultivating feelings of appreciation or gratitude</li>
                <li>Meditating with the 594 Hz frequency (Heart Field)</li>
                <li>Using the ZEN POINT balancing visualization</li>
            </ul>`);
        }, 1000);
        
        // Add phi connection
        setTimeout(() => {
            this.addCoachMessage(`True coherence follows the phi ratio (φ = 1.618...), the same proportion found throughout nature. When your systems harmonize at this ratio, you experience synchronicity, flow, and heightened energy.`);
        }, 2000);
    }
    
    handlePhiQuestion() {
        // Remove typing indicator
        this.removeTypingIndicator();
        
        // Respond about phi
        this.addCoachMessage(`Phi (φ = 1.618033988749895...) is the golden ratio or divine proportion that appears throughout nature, art, architecture, and the human body. It represents perfect natural proportion and harmony.`);
        
        // Add explanation about phi in quantum system
        setTimeout(() => {
            this.addCoachMessage(`In our quantum system, all sacred frequencies are related through phi:
            <ul>
                <li>432 Hz = Ground State (Earth connection, φ⁰)</li>
                <li>528 Hz ≈ 432 × φ¹ (DNA repair, creation)</li>
                <li>594 Hz ≈ 432 × φ² (Heart field, compassion)</li>
                <li>672 Hz ≈ 432 × φ³ (Voice flow, expression)</li>
                <li>720 Hz ≈ 432 × φ⁴ (Vision gate, intuition)</li>
                <li>768 Hz ≈ 432 × φ⁵ (Unity wave, oneness)</li>
                <li>888 Hz ≈ 432 × φ^φ (Cosmic integration)</li>
            </ul>`);
        }, 1000);
        
        // Add practical application
        setTimeout(() => {
            this.addCoachMessage(`By aligning with these phi-harmonic frequencies through sound, meditation, and conscious practice, you harmonize with the fundamental patterns of creation. This enables quantum coherence and accelerated evolution.`);
        }, 2000);
    }
    
    generateCoachingResponse(question) {
        // In a production system, this would use a sophisticated AI to generate responses
        // For this demo, we'll use template responses based on current state
        
        // Determine user's current quantum state
        let currentState = this.userProfile.primaryState || 'groundState';
        
        // Get coaching prompts for this state
        const statePrompts = this.coachingPrompts[currentState];
        
        // Generate a coaching response based on the question
        let response;
        
        // Check for common patterns and generate appropriate responses
        if (this.matchesPattern(question.toLowerCase(), ['how', 'what', '?'])) {
            // Information-seeking question
            response = "That's an excellent question that shows your curiosity about quantum principles. ";
            
            if (this.matchesPattern(question.toLowerCase(), ['meditation', 'practice', 'exercise'])) {
                response += "Regular practice is essential for quantum growth. I recommend starting with 10-15 minutes daily, focusing on phi-harmonic breathing (5 in, 3 hold, 8 out) while connecting with your chosen frequency.";
            } else if (this.matchesPattern(question.toLowerCase(), ['feel', 'feeling', 'emotion'])) {
                response += "Your emotions are quantum indicators, showing where energy is flowing or blocked. Notice them without judgment, then use heart coherence techniques to harmonize your emotional field.";
            } else if (this.matchesPattern(question.toLowerCase(), ['stuck', 'block', 'barrier'])) {
                response += "Quantum growth often involves resistance before breakthrough. This is natural and indicates you're at an expansion point. Gentle persistence with your practice will help you move through this phase.";
            } else {
                response += "As you explore this further, remember that your consciousness shapes your quantum field. Approach with curious awareness rather than rigid expectations, and you'll discover deeper insights.";
            }
        } else if (this.matchesPattern(question.toLowerCase(), ['help', 'need', 'want', 'assist'])) {
            // Request for assistance
            response = "I'm here to support your quantum journey. ";
            
            if (this.matchesPattern(question.toLowerCase(), ['next', 'continue', 'further'])) {
                response += "Your next step is to deepen your practice with your current frequency, until it becomes a natural part of your energy field. Consistency matters more than intensity.";
            } else if (this.matchesPattern(question.toLowerCase(), ['start', 'begin', 'new'])) {
                response += "The best way to start is with ground state practices (432 Hz) to build a solid foundation. Focus on physical awareness, earth connection, and phi-ratio breathing.";
            } else {
                response += "Based on your current state, I recommend focusing on practices that align with the " + {
                    groundState: "earth's natural frequency",
                    creationPoint: "creative transformation energy",
                    heartField: "heart coherence field",
                    voiceFlow: "authentic expression vibration",
                    visionGate: "intuitive perception frequency",
                    unityWave: "oneness consciousness",
                    cosmicIntegration: "multidimensional awareness"
                }[currentState] + ".";
            }
        } else {
            // For other types of questions/statements, use general coaching
            const randomIndex = Math.floor(Math.random() * statePrompts.length);
            response = "Thank you for sharing. To help you progress in your current quantum state, consider this: " + statePrompts[randomIndex];
        }
        
        // Remove typing indicator
        this.removeTypingIndicator();
        
        // Add response
        this.addCoachMessage(response);
        
        // Add to conversation history
        this.conversationHistory.push({
            role: 'coach',
            message: response,
            timestamp: Date.now()
        });
    }
    
    addUserMessage(message) {
        const messagesContainer = document.querySelector('.chat-messages');
        if (!messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'user-message';
        messageElement.innerHTML = `<p>${this.formatMessage(message)}</p>`;
        
        messagesContainer.appendChild(messageElement);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    addCoachMessage(message) {
        const messagesContainer = document.querySelector('.chat-messages');
        if (!messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'coach-message';
        messageElement.innerHTML = `<p>${this.formatMessage(message)}</p>`;
        
        messagesContainer.appendChild(messageElement);
        
        // Add to conversation history
        this.conversationHistory.push({
            role: 'coach',
            message: message,
            timestamp: Date.now()
        });
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    formatMessage(message) {
        // Convert URLs to links
        let formatted = message.replace(
            /(https?:\/\/[^\s]+)/g, 
            '<a href="$1" target="_blank">$1</a>'
        );
        
        // Keep HTML if present
        return formatted;
    }
    
    showTypingIndicator() {
        const messagesContainer = document.querySelector('.chat-messages');
        if (!messagesContainer) return;
        
        // Remove existing typing indicator if any
        this.removeTypingIndicator();
        
        // Add typing indicator
        const typingElement = document.createElement('div');
        typingElement.className = 'coach-message typing-indicator';
        typingElement.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        messagesContainer.appendChild(typingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    updateSuggestedQuestions() {
        const questionsContainer = document.querySelector('.question-chips');
        if (!questionsContainer) return;
        
        // Clear existing questions
        questionsContainer.innerHTML = '';
        
        // Get current state
        let currentState = this.userProfile.primaryState || 'groundState';
        
        // Basic questions
        const basicQuestions = [
            "What state am I in?",
            "How can I raise my frequency?",
            "Next practice for me?"
        ];
        
        // State-specific questions
        const stateQuestions = {
            groundState: [
                "How do I strengthen my earth connection?",
                "Why is grounding important?",
                "Physical practices for 432 Hz?"
            ],
            creationPoint: [
                "How do I activate my DNA?",
                "Creativity exercises?",
                "528 Hz meditation techniques?"
            ],
            heartField: [
                "Heart coherence techniques?",
                "How to expand compassion?",
                "Balancing emotional energy?"
            ],
            voiceFlow: [
                "Voice activation exercises?",
                "How to speak my truth?",
                "672 Hz toning practice?"
            ],
            visionGate: [
                "Enhance intuitive perception?",
                "Time crystal meditation?",
                "Third eye activation?"
            ],
            unityWave: [
                "Experiencing oneness?",
                "ZEN POINT balance?",
                "Unity field meditation?"
            ],
            cosmicIntegration: [
                "Multidimensional awareness?",
                "Human-cosmic balance?",
                "Full frequency integration?"
            ]
        };
        
        // Combine and select questions
        let allQuestions = [
            ...basicQuestions, 
            ...stateQuestions[currentState]
        ];
        
        // Filter out previously asked questions
        allQuestions = allQuestions.filter(q => !this.userProfile.askedQuestions.includes(q));
        
        // If all questions have been asked, use basic questions
        if (allQuestions.length === 0) {
            allQuestions = basicQuestions;
        }
        
        // Select up to 3 questions
        const selectedQuestions = allQuestions.slice(0, 3);
        
        // Add questions to container
        selectedQuestions.forEach(question => {
            const chip = document.createElement('button');
            chip.className = 'question-chip';
            chip.textContent = question;
            
            chip.addEventListener('click', () => {
                this.handleUserQuestion(question);
            });
            
            questionsContainer.appendChild(chip);
        });
    }
    
    updateCoachingContextBasedOnFrequency(frequency) {
        // Update coach based on current frequency
        const stateMapping = {
            432: 'groundState',
            528: 'creationPoint',
            594: 'heartField',
            672: 'voiceFlow',
            720: 'visionGate',
            768: 'unityWave',
            888: 'cosmicIntegration'
        };
        
        // Find closest frequency
        let closestFreq = Object.keys(stateMapping).reduce((prev, curr) => {
            return (Math.abs(curr - frequency) < Math.abs(prev - frequency) ? curr : prev);
        });
        
        // Update primary state
        this.userProfile.primaryState = stateMapping[closestFreq];
        
        // Save profile
        this.saveUserProfile();
        
        // If chat is active, offer contextual guidance
        if (this.isActive) {
            this.addCoachMessage(`I notice you're working with the ${frequency} Hz frequency, which resonates with the ${
                CONSCIOUSNESS_STATES[this.userProfile.primaryState].name
            } state. How are you experiencing this energy?`);
            
            // Update suggested questions
            this.updateSuggestedQuestions();
        }
    }
    
    saveUserProfile() {
        // In a real implementation, this would save to localStorage or a server
        try {
            localStorage.setItem('quantumCoachProfile', JSON.stringify(this.userProfile));
        } catch (e) {
            console.warn("Could not save coach profile to localStorage:", e);
        }
    }
    
    loadUserProfile() {
        // In a real implementation, this would load from localStorage or a server
        try {
            const savedProfile = localStorage.getItem('quantumCoachProfile');
            
            if (savedProfile) {
                this.userProfile = JSON.parse(savedProfile);
            }
        } catch (e) {
            console.warn("Could not load coach profile from localStorage:", e);
        }
    }
}

// Initialize the AI Quantum Coach
window.aiQuantumCoach = new AIQuantumCoach();

// Add CSS for the AI Quantum Coach
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        /* AI Quantum Coach Styles */
        .ai-coach-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #2196F3, #9C27B0);
            color: white;
            border: none;
            border-radius: 50px;
            padding: 10px 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 990;
            transition: all 0.3s ease;
        }
        
        .ai-coach-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        
        .coach-icon {
            font-size: 20px;
        }
        
        .coach-label {
            font-weight: 500;
        }
        
        .ai-coach-chat {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: rgba(15, 15, 35, 0.95);
            border-radius: 15px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 999;
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            pointer-events: none;
            transition: all 0.3s ease;
        }
        
        .ai-coach-chat.active {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: all;
        }
        
        .chat-header {
            padding: 15px;
            background: linear-gradient(135deg, #1a237e, #4a148c);
            color: white;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .coach-avatar {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }
        
        .coach-info {
            flex: 1;
        }
        
        .coach-info h3 {
            margin: 0;
            font-size: 16px;
        }
        
        .status {
            font-size: 12px;
            opacity: 0.8;
        }
        
        .minimize-chat {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }
        
        .minimize-chat:hover {
            opacity: 1;
        }
        
        .chat-messages {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .coach-message, .user-message {
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 15px;
            animation: fadeIn 0.3s ease;
        }
        
        .coach-message {
            align-self: flex-start;
            background: rgba(33, 150, 243, 0.1);
            border-bottom-left-radius: 5px;
        }
        
        .user-message {
            align-self: flex-end;
            background: rgba(156, 39, 176, 0.1);
            border-bottom-right-radius: 5px;
        }
        
        .coach-message p, .user-message p {
            margin: 0;
            line-height: 1.5;
        }
        
        .welcome-message {
            background: rgba(33, 150, 243, 0.15);
        }
        
        .typing-indicator {
            padding: 15px;
        }
        
        .typing-dots {
            display: flex;
            gap: 5px;
        }
        
        .typing-dots span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            animation: typingAnimation 1.4s infinite ease-in-out;
        }
        
        .typing-dots span:nth-child(1) {
            animation-delay: 0s;
        }
        
        .typing-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        .suggested-questions {
            padding: 10px 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .questions-label {
            font-size: 12px;
            opacity: 0.7;
            margin-bottom: 8px;
        }
        
        .question-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .question-chip {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 6px 12px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .question-chip:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
        }
        
        .chat-input {
            padding: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            gap: 10px;
        }
        
        #coach-input {
            flex: 1;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 10px 15px;
            color: white;
            resize: none;
            font-family: inherit;
            height: 40px;
            max-height: 100px;
            transition: all 0.3s ease;
        }
        
        #coach-input:focus {
            outline: none;
            background: rgba(255, 255, 255, 0.1);
        }
        
        #send-question {
            width: 40px;
            height: 40px;
            background: #2196F3;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        #send-question:hover {
            background: #1976D2;
            transform: scale(1.05);
        }
        
        .practice-recommendation {
            background: rgba(33, 150, 243, 0.1);
            border-radius: 10px;
            padding: 12px;
            margin-top: 5px;
        }
        
        .practice-recommendation h4 {
            margin: 0 0 8px 0;
            color: #2196F3;
        }
        
        .practice-meta {
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-top: 10px;
            font-size: 12px;
            opacity: 0.9;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes typingAnimation {
            0%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            50% {
                transform: scale(1.2);
                opacity: 1;
            }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .ai-coach-chat {
                width: calc(100% - 40px);
                height: 60vh;
                bottom: 10px;
                right: 10px;
                left: 10px;
            }
        }
    `;
    document.head.appendChild(style);
});

// Make quantum coach available for global JS
document.addEventListener('DOMContentLoaded', function() {
    // Expose the `CONSCIOUSNESS_STATES` for easier access
    window.CONSCIOUSNESS_STATES = {
        groundState: {
            name: "Ground State",
            frequency: 432,
            description: "Earth connection and physical stability"
        },
        creationPoint: {
            name: "Creation Point",
            frequency: 528,
            description: "DNA activation and creative transformation"
        },
        heartField: {
            name: "Heart Field",
            frequency: 594,
            description: "Emotional coherence and compassionate connection"
        },
        voiceFlow: {
            name: "Voice Flow",
            frequency: 672,
            description: "Authentic expression and clear communication"
        },
        visionGate: {
            name: "Vision Gate",
            frequency: 720,
            description: "Higher perception and intuitive seeing"
        },
        unityWave: {
            name: "Unity Wave",
            frequency: 768,
            description: "Oneness consciousness and quantum connection"
        },
        cosmicIntegration: {
            name: "Cosmic Integration",
            frequency: 888,
            description: "Full integration of quantum being and human form"
        }
    };
});