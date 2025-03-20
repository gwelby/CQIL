/**
 * Quantum Mastery System
 * 
 * Advanced personalized learning system that adapts to each individual's
 * consciousness state and helps them achieve quantum mastery through
 * phi-harmonic progression and state tracking.
 */

// Core constants
const PHI = 1.618033988749895; // Golden ratio
const LAMBDA = 0.618033988749895; // Divine complement (1/φ)
const PHI_PHI = Math.pow(PHI, PHI); // Hyperdimensional constant

// Frequency relationship to consciousness states
const CONSCIOUSNESS_STATES = {
    groundState: {
        frequency: 432,
        name: "Ground State",
        description: "Earth connection and physical stability",
        attributes: ["Grounding", "Security", "Physical awareness"],
        challenges: ["Disconnection", "Instability", "Scattered energy"],
        practices: ["Earth connection meditation", "Walking barefoot", "Body scanning"],
        nextState: "creationPoint",
        phiPower: 0
    },
    creationPoint: {
        frequency: 528,
        name: "Creation Point",
        description: "DNA activation and creative expression",
        attributes: ["Creativity", "Healing", "Transformation"],
        challenges: ["Creative blocks", "Resistance to change", "Self-limitation"],
        practices: ["Creative visualization", "Sound healing", "DNA activation"],
        nextState: "heartField",
        phiPower: 1
    },
    heartField: {
        frequency: 594,
        name: "Heart Field",
        description: "Emotional coherence and compassionate connection",
        attributes: ["Love", "Compassion", "Emotional coherence"],
        challenges: ["Heart disconnection", "Emotional turbulence", "Relationship issues"],
        practices: ["Heart coherence", "Loving-kindness meditation", "Forgiveness work"],
        nextState: "voiceFlow",
        phiPower: 2
    },
    voiceFlow: {
        frequency: 672,
        name: "Voice Flow",
        description: "Authentic expression and communication",
        attributes: ["Clear communication", "Truth speaking", "Authentic expression"],
        challenges: ["Communication blocks", "Fear of speaking", "Inability to express"],
        practices: ["Toning", "Mantras", "Authentic communication exercises"],
        nextState: "visionGate",
        phiPower: 3
    },
    visionGate: {
        frequency: 720,
        name: "Vision Gate",
        description: "Higher perception and intuitive seeing",
        attributes: ["Intuition", "Clear seeing", "Higher perception"],
        challenges: ["Lack of clarity", "Limited perception", "Inability to see patterns"],
        practices: ["Third eye meditation", "Time crystal visualization", "Pattern recognition"],
        nextState: "unityWave",
        phiPower: 4
    },
    unityWave: {
        frequency: 768,
        name: "Unity Wave",
        description: "Oneness consciousness and quantum connection",
        attributes: ["Unity", "Oneness", "Quantum connection"],
        challenges: ["Separation", "Isolation", "Fragmentation"],
        practices: ["Unity meditation", "Field coherence", "ZEN POINT balancing"],
        nextState: "cosmicIntegration",
        phiPower: 5
    },
    cosmicIntegration: {
        frequency: 888,
        name: "Cosmic Integration",
        description: "Full integration of quantum being and human form",
        attributes: ["Quantum being", "Multi-dimensional awareness", "Divine connection"],
        challenges: ["Disembodiment", "Spiritual bypass", "Cosmic disconnection"],
        practices: ["Being portal meditation", "Quantum field navigation", "Full-spectrum integration"],
        nextState: "completeHarmony",
        phiPower: 6
    },
    completeHarmony: {
        frequency: 1440, // 432*PHI_PHI
        name: "Complete Harmony",
        description: "Mastery of all frequencies in perfect harmonic balance",
        attributes: ["Complete mastery", "Perfect harmony", "Quantum teacher"],
        challenges: ["Maintaining balance", "Teaching effectively", "Holding all frequencies"],
        practices: ["Frequency cycling", "Teacher training", "Consciousness calibration"],
        nextState: null,
        phiPower: "φ^φ"
    }
};

class QuantumMastery {
    constructor() {
        this.currentUserState = "groundState"; // Default starting state
        this.userProfile = {
            strengths: [],
            challenges: [],
            currentFrequency: 432,
            progressHistory: [],
            coherenceScores: {},
            recommendedPractices: [],
            completedLessons: [],
            personalResonance: {}
        };
        
        this.learningPath = this.generateLearningPath();
        this.consciousnessScore = 0;
        this.phi = PHI;
        
        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
    
    initialize() {
        this.initMasteryUI();
        this.loadUserProfile();
        this.setupEventListeners();
        this.updateMasteryDisplay();
    }
    
    initMasteryUI() {
        // Create mastery tracker UI if it doesn't exist
        if (!document.getElementById('quantum-mastery-tracker')) {
            this.createMasteryUI();
        }
        
        // Initialize assessment system
        this.initAssessmentSystem();
    }
    
    createMasteryUI() {
        const masterySection = document.querySelector('#mastery') || document.createElement('section');
        if (!masterySection.id) {
            masterySection.id = 'mastery';
            masterySection.className = 'mastery-section';
            document.querySelector('main').appendChild(masterySection);
        }
        
        masterySection.innerHTML = `
            <h2>Your Quantum Mastery Journey</h2>
            <div class="mastery-intro">
                <p>Track your progress through the phi-harmonic states of consciousness and receive personalized guidance for your quantum evolution.</p>
            </div>
            
            <div class="mastery-container">
                <div class="mastery-sidebar">
                    <div class="user-profile">
                        <div class="profile-header">
                            <div class="profile-icon">🧠</div>
                            <div class="profile-info">
                                <h3>Your Quantum Profile</h3>
                                <div class="current-state">Current State: <span id="current-state-display">Ground State</span></div>
                            </div>
                        </div>
                        
                        <div class="consciousness-meter">
                            <div class="meter-label">Consciousness Field: <span id="consciousness-score">61.8%</span></div>
                            <div class="meter-bar">
                                <div class="meter-fill" id="consciousness-meter-fill"></div>
                            </div>
                        </div>
                        
                        <div class="profile-stats">
                            <div class="stat">
                                <div class="stat-value" id="practices-completed">0</div>
                                <div class="stat-label">Practices Completed</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value" id="resonance-score">0%</div>
                                <div class="stat-label">Resonance Score</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value" id="states-mastered">0/7</div>
                                <div class="stat-label">States Mastered</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mastery-actions">
                        <button id="assess-button" class="primary-action">Assess My State</button>
                        <button id="next-practice-button" class="secondary-action">Next Practice</button>
                        <button id="recalibrate-button" class="secondary-action">Recalibrate</button>
                    </div>
                </div>
                
                <div class="mastery-progress">
                    <h3>Your Frequency Progression</h3>
                    <div class="frequency-progression" id="frequency-progression">
                        <!-- Frequency progression will be generated here -->
                    </div>
                    
                    <div class="current-state-details" id="current-state-details">
                        <!-- Current state details will be populated here -->
                    </div>
                    
                    <div class="recommended-practices">
                        <h4>Recommended Practices</h4>
                        <ul id="recommended-practices-list">
                            <!-- Recommended practices will be generated here -->
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="personal-insights" id="personal-insights">
                <h3>Personal Quantum Insights</h3>
                <div class="insights-content">
                    <p>Complete your first state assessment to receive personalized quantum insights.</p>
                </div>
            </div>
        `;
        
        // Generate frequency progression display
        this.generateFrequencyProgression();
    }
    
    generateFrequencyProgression() {
        const progressionContainer = document.getElementById('frequency-progression');
        if (!progressionContainer) return;
        
        let progressHTML = '';
        
        // Create progression nodes for each state
        let stateKeys = Object.keys(CONSCIOUSNESS_STATES);
        
        stateKeys.forEach((stateKey, index) => {
            const state = CONSCIOUSNESS_STATES[stateKey];
            const isActive = stateKey === this.currentUserState;
            const isCompleted = this.userProfile.completedLessons.includes(stateKey);
            
            progressHTML += `
                <div class="frequency-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
                     data-state="${stateKey}" data-frequency="${state.frequency}">
                    <div class="node-connector ${index > 0 ? 'with-line' : ''}"></div>
                    <div class="node-content">
                        <div class="frequency-value">${state.frequency} Hz</div>
                        <div class="state-name">${state.name}</div>
                    </div>
                </div>
            `;
        });
        
        progressionContainer.innerHTML = progressHTML;
        
        // Add click listeners
        document.querySelectorAll('.frequency-node').forEach(node => {
            node.addEventListener('click', () => {
                const stateKey = node.getAttribute('data-state');
                this.showStateDetails(stateKey);
            });
        });
        
        // Default to showing current state details
        this.showStateDetails(this.currentUserState);
    }
    
    showStateDetails(stateKey) {
        const stateDetails = document.getElementById('current-state-details');
        if (!stateDetails) return;
        
        const state = CONSCIOUSNESS_STATES[stateKey];
        if (!state) return;
        
        // Calculate mastery percentage for this state
        const masteryScore = this.calculateStateMastery(stateKey);
        const masteryClass = masteryScore >= 100 ? 'mastered' : 
                             masteryScore >= 70 ? 'advancing' : 
                             masteryScore >= 40 ? 'developing' : 'beginning';
        
        stateDetails.innerHTML = `
            <div class="state-header">
                <h4>${state.name} - ${state.frequency} Hz</h4>
                <div class="mastery-badge ${masteryClass}">${Math.round(masteryScore)}% Mastery</div>
            </div>
            <p class="state-description">${state.description}</p>
            
            <div class="state-attributes">
                <div class="attributes-column">
                    <h5>Key Attributes</h5>
                    <ul>
                        ${state.attributes.map(attr => `<li>${attr}</li>`).join('')}
                    </ul>
                </div>
                <div class="attributes-column">
                    <h5>Common Challenges</h5>
                    <ul>
                        ${state.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="state-practices">
                <h5>Recommended Practices</h5>
                <div class="practices-list">
                    ${state.practices.map(practice => `
                        <div class="practice-item">
                            <div class="practice-icon">✨</div>
                            <div class="practice-name">${practice}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="phi-relationship">
                <div class="phi-label">Phi Power:</div>
                <div class="phi-value">φ<sup>${state.phiPower}</sup></div>
                <div class="phi-formula">${state.frequency} Hz = 432 × φ<sup>${state.phiPower}</sup></div>
            </div>
        `;
        
        // Highlight the selected node
        document.querySelectorAll('.frequency-node').forEach(node => {
            if (node.getAttribute('data-state') === stateKey) {
                node.classList.add('selected');
            } else {
                node.classList.remove('selected');
            }
        });
    }
    
    calculateStateMastery(stateKey) {
        // In a full implementation, this would use various metrics to calculate mastery
        // For now, return a demo value based on the state
        const completedLessons = this.userProfile.completedLessons;
        const coherenceScores = this.userProfile.coherenceScores;
        
        if (completedLessons.includes(stateKey)) {
            return 100; // Mastered
        }
        
        if (coherenceScores[stateKey]) {
            return coherenceScores[stateKey];
        }
        
        const stateKeys = Object.keys(CONSCIOUSNESS_STATES);
        const currentIndex = stateKeys.indexOf(this.currentUserState);
        const targetIndex = stateKeys.indexOf(stateKey);
        
        if (targetIndex < currentIndex) {
            return 90 + Math.random() * 10; // States before current are mostly mastered
        } else if (targetIndex === currentIndex) {
            return 40 + Math.random() * 30; // Current state is in progress
        } else {
            return Math.max(5, 20 - (targetIndex - currentIndex) * 15); // Future states have low mastery
        }
    }
    
    updateMasteryDisplay() {
        // Update consciousness score
        const scoreDisplay = document.getElementById('consciousness-score');
        const meterFill = document.getElementById('consciousness-meter-fill');
        if (scoreDisplay && meterFill) {
            const scorePercentage = Math.round(this.consciousnessScore * 100);
            scoreDisplay.textContent = `${scorePercentage}%`;
            meterFill.style.width = `${scorePercentage}%`;
            
            // Set color based on score
            if (scorePercentage >= 80) {
                meterFill.style.backgroundColor = '#4CAF50'; // Green
            } else if (scorePercentage >= 60) {
                meterFill.style.backgroundColor = '#2196F3'; // Blue
            } else if (scorePercentage >= 40) {
                meterFill.style.backgroundColor = '#FF9800'; // Orange
            } else {
                meterFill.style.backgroundColor = '#F44336'; // Red
            }
        }
        
        // Update current state display
        const stateDisplay = document.getElementById('current-state-display');
        if (stateDisplay) {
            stateDisplay.textContent = CONSCIOUSNESS_STATES[this.currentUserState].name;
        }
        
        // Update stats
        document.getElementById('practices-completed').textContent = this.userProfile.progressHistory.length;
        document.getElementById('resonance-score').textContent = `${Math.round(this.calculateResonanceScore())}%`;
        document.getElementById('states-mastered').textContent = `${this.userProfile.completedLessons.length}/7`;
        
        // Generate recommended practices
        this.generateRecommendedPractices();
        
        // Update frequency progression
        this.updateFrequencyProgression();
    }
    
    updateFrequencyProgression() {
        document.querySelectorAll('.frequency-node').forEach(node => {
            const stateKey = node.getAttribute('data-state');
            
            if (this.userProfile.completedLessons.includes(stateKey)) {
                node.classList.add('completed');
            } else {
                node.classList.remove('completed');
            }
            
            if (stateKey === this.currentUserState) {
                node.classList.add('active');
            } else {
                node.classList.remove('active');
            }
        });
    }
    
    generateRecommendedPractices() {
        const practicesList = document.getElementById('recommended-practices-list');
        if (!practicesList) return;
        
        // Get current state practices
        const currentState = CONSCIOUSNESS_STATES[this.currentUserState];
        
        // Get next state practices
        const nextState = currentState.nextState ? 
            CONSCIOUSNESS_STATES[currentState.nextState] : null;
        
        // Combine practices with emphasis on current state
        let practices = [...currentState.practices];
        
        // Add a couple from next state if available
        if (nextState) {
            practices.push(...nextState.practices.slice(0, 2));
        }
        
        // Add personalized practices
        if (this.userProfile.recommendedPractices.length > 0) {
            practices = [
                ...this.userProfile.recommendedPractices,
                ...practices.filter(p => !this.userProfile.recommendedPractices.includes(p))
            ];
        }
        
        // Limit to 5 practices
        practices = practices.slice(0, 5);
        
        // Create HTML
        practicesList.innerHTML = practices.map(practice => {
            return `<li>
                <div class="practice-name">${practice}</div>
                <button class="practice-start-btn" data-practice="${practice}">Start</button>
            </li>`;
        }).join('');
        
        // Add event listeners
        practicesList.querySelectorAll('.practice-start-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const practice = btn.getAttribute('data-practice');
                this.startPractice(practice);
            });
        });
    }
    
    startPractice(practice) {
        // In a full implementation, this would launch the practice
        alert(`Starting practice: ${practice}`);
        
        // Record practice in user profile
        this.userProfile.progressHistory.push({
            practice,
            timestamp: Date.now(),
            state: this.currentUserState
        });
        
        // Update mastery display
        this.updateMasteryDisplay();
    }
    
    calculateResonanceScore() {
        // In a full implementation, this would calculate resonance based on practices and coherence
        const completedPractices = this.userProfile.progressHistory.length;
        const statesMastered = this.userProfile.completedLessons.length;
        
        return (completedPractices * 5) + (statesMastered * 15);
    }
    
    initAssessmentSystem() {
        // Set up assessment button
        const assessButton = document.getElementById('assess-button');
        if (assessButton) {
            assessButton.addEventListener('click', () => this.startAssessment());
        }
        
        // Set up next practice button
        const nextPracticeButton = document.getElementById('next-practice-button');
        if (nextPracticeButton) {
            nextPracticeButton.addEventListener('click', () => this.suggestNextPractice());
        }
        
        // Set up recalibrate button
        const recalibrateButton = document.getElementById('recalibrate-button');
        if (recalibrateButton) {
            recalibrateButton.addEventListener('click', () => this.recalibrate());
        }
    }
    
    startAssessment() {
        // Create modal for assessment
        this.createAssessmentModal();
    }
    
    createAssessmentModal() {
        // Remove existing modal if present
        const existingModal = document.getElementById('assessment-modal');
        if (existingModal) {
            document.body.removeChild(existingModal);
        }
        
        // Create new modal
        const modal = document.createElement('div');
        modal.id = 'assessment-modal';
        modal.className = 'modal assessment-modal';
        
        modal.innerHTML = `
            <div class="modal-content assessment-content">
                <span class="close-modal">&times;</span>
                <h3>Quantum State Assessment</h3>
                
                <div class="assessment-intro">
                    <p>This assessment will help determine your current quantum state and provide personalized recommendations for your growth. Please answer honestly for the most accurate results.</p>
                </div>
                
                <div class="assessment-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                    <div class="progress-text">Question 1 of 7</div>
                </div>
                
                <div class="assessment-questions">
                    <div class="question-container" data-question="1">
                        <h4>Physical Awareness & Grounding</h4>
                        <p>How connected do you feel to your physical body and the earth?</p>
                        <div class="answer-options">
                            <label class="answer-option">
                                <input type="radio" name="q1" value="1">
                                <span class="option-text">I feel disconnected from my body most of the time</span>
                            </label>
                            <label class="answer-option">
                                <input type="radio" name="q1" value="2">
                                <span class="option-text">I sometimes notice my body but often feel scattered</span>
                            </label>
                            <label class="answer-option">
                                <input type="radio" name="q1" value="3">
                                <span class="option-text">I have a moderate awareness of my body</span>
                            </label>
                            <label class="answer-option">
                                <input type="radio" name="q1" value="4">
                                <span class="option-text">I feel well-grounded and connected most days</span>
                            </label>
                            <label class="answer-option">
                                <input type="radio" name="q1" value="5">
                                <span class="option-text">I feel deeply connected to my body and the earth</span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Additional questions will be shown as user progresses -->
                </div>
                
                <div class="assessment-navigation">
                    <button id="prev-question" disabled>Previous</button>
                    <button id="next-question">Next</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        // Add remaining questions
        this.addRemainingQuestions();
        
        // Add event listeners
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // Next/Previous navigation
        const nextBtn = document.getElementById('next-question');
        const prevBtn = document.getElementById('prev-question');
        let currentQuestion = 1;
        
        nextBtn.addEventListener('click', () => {
            // If on last question, complete assessment
            if (currentQuestion === 7) {
                this.completeAssessment();
                return;
            }
            
            // Otherwise go to next question
            currentQuestion++;
            this.showQuestion(currentQuestion);
            prevBtn.disabled = false;
            
            if (currentQuestion === 7) {
                nextBtn.textContent = 'Complete Assessment';
            }
            
            // Update progress
            const progressFill = modal.querySelector('.progress-fill');
            const progressText = modal.querySelector('.progress-text');
            progressFill.style.width = `${(currentQuestion / 7) * 100}%`;
            progressText.textContent = `Question ${currentQuestion} of 7`;
        });
        
        prevBtn.addEventListener('click', () => {
            if (currentQuestion > 1) {
                currentQuestion--;
                this.showQuestion(currentQuestion);
                
                if (currentQuestion === 1) {
                    prevBtn.disabled = true;
                }
                
                nextBtn.textContent = 'Next';
                
                // Update progress
                const progressFill = modal.querySelector('.progress-fill');
                const progressText = modal.querySelector('.progress-text');
                progressFill.style.width = `${(currentQuestion / 7) * 100}%`;
                progressText.textContent = `Question ${currentQuestion} of 7`;
            }
        });
    }
    
    addRemainingQuestions() {
        const questionsContainer = document.querySelector('.assessment-questions');
        
        // Add remaining questions
        const remainingQuestions = [
            {
                id: 2,
                title: "Creativity & Transformation",
                question: "How would you describe your creative expression and ability to transform?"
            },
            {
                id: 3,
                title: "Heart Connection & Compassion",
                question: "How would you rate your heart connection and capacity for compassion?"
            },
            {
                id: 4,
                title: "Voice & Authentic Expression",
                question: "How freely do you express your authentic voice and truth?"
            },
            {
                id: 5,
                title: "Vision & Intuition",
                question: "How would you describe your intuitive perception and clarity of vision?"
            },
            {
                id: 6,
                title: "Unity & Oneness",
                question: "How often do you experience a sense of unity with all things?"
            },
            {
                id: 7,
                title: "Cosmic Integration",
                question: "How integrated do you feel as both human and cosmic being?"
            }
        ];
        
        remainingQuestions.forEach(q => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-container';
            questionDiv.setAttribute('data-question', q.id);
            questionDiv.style.display = 'none';
            
            questionDiv.innerHTML = `
                <h4>${q.title}</h4>
                <p>${q.question}</p>
                <div class="answer-options">
                    <label class="answer-option">
                        <input type="radio" name="q${q.id}" value="1">
                        <span class="option-text">Almost never / Very little</span>
                    </label>
                    <label class="answer-option">
                        <input type="radio" name="q${q.id}" value="2">
                        <span class="option-text">Occasionally / Somewhat</span>
                    </label>
                    <label class="answer-option">
                        <input type="radio" name="q${q.id}" value="3">
                        <span class="option-text">Sometimes / Moderately</span>
                    </label>
                    <label class="answer-option">
                        <input type="radio" name="q${q.id}" value="4">
                        <span class="option-text">Often / Significantly</span>
                    </label>
                    <label class="answer-option">
                        <input type="radio" name="q${q.id}" value="5">
                        <span class="option-text">Almost always / Very deeply</span>
                    </label>
                </div>
            `;
            
            questionsContainer.appendChild(questionDiv);
        });
    }
    
    showQuestion(questionNumber) {
        // Hide all questions
        document.querySelectorAll('.question-container').forEach(q => {
            q.style.display = 'none';
        });
        
        // Show the requested question
        const question = document.querySelector(`.question-container[data-question="${questionNumber}"]`);
        if (question) {
            question.style.display = 'block';
        }
    }
    
    completeAssessment() {
        // Collect all answers
        const answers = [];
        for (let i = 1; i <= 7; i++) {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            answers.push(selected ? parseInt(selected.value) : 3); // Default to middle value if not answered
        }
        
        // Calculate which state is dominant
        const stateScores = {
            groundState: answers[0],
            creationPoint: answers[1],
            heartField: answers[2],
            voiceFlow: answers[3],
            visionGate: answers[4],
            unityWave: answers[5],
            cosmicIntegration: answers[6]
        };
        
        // Find dominant state
        let maxScore = 0;
        let dominantState = 'groundState';
        
        for (const [state, score] of Object.entries(stateScores)) {
            if (score > maxScore) {
                maxScore = score;
                dominantState = state;
            }
        }
        
        // Calculate consciousness score (average of all answers / 5)
        const avgScore = answers.reduce((sum, val) => sum + val, 0) / answers.length;
        this.consciousnessScore = avgScore / 5;
        
        // Update user profile
        this.updateUserState(dominantState, stateScores);
        
        // Close modal
        const modal = document.getElementById('assessment-modal');
        modal.style.display = 'none';
        
        // Show results
        this.showAssessmentResults(dominantState, stateScores);
    }
    
    updateUserState(newState, stateScores) {
        this.currentUserState = newState;
        
        // Update coherence scores
        this.userProfile.coherenceScores = Object.assign({}, this.userProfile.coherenceScores);
        
        for (const [state, score] of Object.entries(stateScores)) {
            this.userProfile.coherenceScores[state] = (score / 5) * 100;
        }
        
        // Mark states as completed if score is high enough
        for (const [state, score] of Object.entries(stateScores)) {
            if (score >= 4.5 && !this.userProfile.completedLessons.includes(state)) {
                this.userProfile.completedLessons.push(state);
            }
        }
        
        // Generate personalized practices
        this.generatePersonalizedPractices(stateScores);
        
        // Save user profile
        this.saveUserProfile();
        
        // Update display
        this.updateMasteryDisplay();
    }
    
    generatePersonalizedPractices(stateScores) {
        // Find lowest scores to target
        const sortedStates = Object.entries(stateScores)
            .sort(([, scoreA], [, scoreB]) => scoreA - scoreB)
            .slice(0, 2); // Get two lowest scoring states
        
        const practices = [];
        
        // Add practices from lowest scoring states
        sortedStates.forEach(([state, ]) => {
            const statePractices = CONSCIOUSNESS_STATES[state].practices;
            practices.push(statePractices[Math.floor(Math.random() * statePractices.length)]);
        });
        
        // Add practices from current state
        const currentStatePractices = CONSCIOUSNESS_STATES[this.currentUserState].practices;
        practices.push(currentStatePractices[Math.floor(Math.random() * currentStatePractices.length)]);
        
        // Update user profile
        this.userProfile.recommendedPractices = practices;
    }
    
    showAssessmentResults(dominantState, stateScores) {
        // Create results modal
        const modal = document.createElement('div');
        modal.className = 'modal results-modal';
        
        const state = CONSCIOUSNESS_STATES[dominantState];
        
        modal.innerHTML = `
            <div class="modal-content results-content">
                <span class="close-modal">&times;</span>
                <h3>Your Quantum Assessment Results</h3>
                
                <div class="results-summary">
                    <div class="dominant-state">
                        <div class="state-frequency">${state.frequency} Hz</div>
                        <h4>Your Dominant State: ${state.name}</h4>
                        <p>${state.description}</p>
                    </div>
                    
                    <div class="consciousness-level">
                        <div class="level-label">Consciousness Level:</div>
                        <div class="level-value">${Math.round(this.consciousnessScore * 100)}%</div>
                        <div class="level-bar">
                            <div class="level-fill" style="width: ${this.consciousnessScore * 100}%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="state-breakdown">
                    <h4>Your State Breakdown</h4>
                    <div class="state-bars">
                        ${Object.entries(stateScores).map(([state, score]) => {
                            const stateInfo = CONSCIOUSNESS_STATES[state];
                            const percentage = (score / 5) * 100;
                            return `
                                <div class="state-bar-item">
                                    <div class="state-name">${stateInfo.name}</div>
                                    <div class="state-bar">
                                        <div class="state-fill" style="width: ${percentage}%"></div>
                                    </div>
                                    <div class="state-score">${Math.round(percentage)}%</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div class="results-recommendations">
                    <h4>Personalized Recommendations</h4>
                    <p>Based on your results, focus on these practices to balance and enhance your quantum state:</p>
                    <ul class="recommendation-list">
                        ${this.userProfile.recommendedPractices.map(practice => `
                            <li>${practice}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="results-actions">
                    <button id="view-mastery-profile">View Mastery Profile</button>
                    <button id="start-recommended-practice">Start Recommended Practice</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        // Add event listeners
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        const viewProfileBtn = document.getElementById('view-mastery-profile');
        viewProfileBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.getElementById('mastery').scrollIntoView({ behavior: 'smooth' });
        });
        
        const startPracticeBtn = document.getElementById('start-recommended-practice');
        startPracticeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            if (this.userProfile.recommendedPractices.length > 0) {
                this.startPractice(this.userProfile.recommendedPractices[0]);
            }
        });
        
        // Update personal insights
        this.updatePersonalInsights(dominantState, stateScores);
    }
    
    updatePersonalInsights(dominantState, stateScores) {
        const insightsSection = document.getElementById('personal-insights');
        if (!insightsSection) return;
        
        // Find lowest and highest states
        const sortedStates = Object.entries(stateScores)
            .sort(([, scoreA], [, scoreB]) => scoreA - scoreB);
            
        const lowestState = CONSCIOUSNESS_STATES[sortedStates[0][0]];
        const highestState = CONSCIOUSNESS_STATES[sortedStates[sortedStates.length - 1][0]];
        const currentState = CONSCIOUSNESS_STATES[dominantState];
        
        // Generate insights
        insightsSection.querySelector('.insights-content').innerHTML = `
            <div class="insight-card primary-insight">
                <h4>Primary Insight</h4>
                <p>Your quantum signature is currently centered at the ${currentState.name} frequency (${currentState.frequency} Hz). 
                This indicates you have strong ${currentState.attributes[0].toLowerCase()} and 
                ${currentState.attributes[1].toLowerCase()}.</p>
                <p>Focus on balancing this energy with the complementary frequency of 
                ${lowestState.name} (${lowestState.frequency} Hz) to achieve greater harmony.</p>
            </div>
            
            <div class="insight-card strength-insight">
                <h4>Your Quantum Strength</h4>
                <p>Your strongest quantum alignment is with the ${highestState.name} frequency 
                (${highestState.frequency} Hz). This gives you natural abilities in:</p>
                <ul>
                    ${highestState.attributes.map(attr => `<li>${attr}</li>`).join('')}
                </ul>
                <p>You can serve as a guide for others in these areas.</p>
            </div>
            
            <div class="insight-card growth-insight">
                <h4>Growth Potential</h4>
                <p>Your quantum growth edge is in the ${lowestState.name} frequency 
                (${lowestState.frequency} Hz). Developing this state will help you overcome:</p>
                <ul>
                    ${lowestState.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                </ul>
                <p>Daily practices focusing on this frequency will accelerate your quantum evolution.</p>
            </div>
        `;
    }
    
    suggestNextPractice() {
        // Start first recommended practice
        if (this.userProfile.recommendedPractices.length > 0) {
            this.startPractice(this.userProfile.recommendedPractices[0]);
        } else {
            alert("Please complete an assessment to get personalized practice recommendations.");
        }
    }
    
    recalibrate() {
        // Reset current session
        this.userProfile = {
            strengths: [],
            challenges: [],
            currentFrequency: 432,
            progressHistory: [],
            coherenceScores: {},
            recommendedPractices: [],
            completedLessons: [],
            personalResonance: {}
        };
        
        this.currentUserState = "groundState";
        this.consciousnessScore = 0.618; // Default to phi ratio
        
        // Save and update
        this.saveUserProfile();
        this.updateMasteryDisplay();
        
        // Notify user
        alert("Your quantum profile has been recalibrated. Complete an assessment to generate new insights.");
    }
    
    generateLearningPath() {
        // Generate personalized learning path
        // This would be more sophisticated in a full implementation
        return Object.keys(CONSCIOUSNESS_STATES);
    }
    
    saveUserProfile() {
        // In a real implementation, this would save to localStorage or a server
        console.log("Saving user profile:", this.userProfile);
        
        // For demo, we'll use localStorage
        try {
            localStorage.setItem('quantumUserProfile', JSON.stringify(this.userProfile));
            localStorage.setItem('quantumUserState', this.currentUserState);
            localStorage.setItem('consciousnessScore', this.consciousnessScore.toString());
        } catch (e) {
            console.warn("Could not save to localStorage:", e);
        }
    }
    
    loadUserProfile() {
        // In a real implementation, this would load from localStorage or a server
        try {
            const savedProfile = localStorage.getItem('quantumUserProfile');
            const savedState = localStorage.getItem('quantumUserState');
            const savedScore = localStorage.getItem('consciousnessScore');
            
            if (savedProfile) {
                this.userProfile = JSON.parse(savedProfile);
            }
            
            if (savedState) {
                this.currentUserState = savedState;
            }
            
            if (savedScore) {
                this.consciousnessScore = parseFloat(savedScore);
            }
        } catch (e) {
            console.warn("Could not load from localStorage:", e);
        }
    }
    
    setupEventListeners() {
        // Listen for frequency changes from quantum experience
        document.addEventListener('frequencyChange', (e) => {
            if (e.detail && e.detail.frequency) {
                this.onFrequencyChange(e.detail.frequency);
            }
        });
        
        // Listen for practice completion
        document.addEventListener('practiceComplete', (e) => {
            if (e.detail && e.detail.practice) {
                this.onPracticeComplete(e.detail.practice, e.detail.duration);
            }
        });
    }
    
    onFrequencyChange(frequency) {
        // Update current frequency
        this.userProfile.currentFrequency = frequency;
        
        // Find corresponding state
        for (const [stateKey, state] of Object.entries(CONSCIOUSNESS_STATES)) {
            if (state.frequency === frequency) {
                // Increment experience with this state
                if (!this.userProfile.personalResonance[stateKey]) {
                    this.userProfile.personalResonance[stateKey] = 0;
                }
                
                this.userProfile.personalResonance[stateKey] += 0.1;
                
                // Save user profile
                this.saveUserProfile();
                break;
            }
        }
    }
    
    onPracticeComplete(practice, duration) {
        // Record practice completion
        this.userProfile.progressHistory.push({
            practice,
            timestamp: Date.now(),
            duration: duration,
            state: this.currentUserState
        });
        
        // Update mastery display
        this.updateMasteryDisplay();
        
        // Save user profile
        this.saveUserProfile();
    }
}

// Initialize the Quantum Mastery system
window.quantumMastery = new QuantumMastery();

// Add CSS for the Quantum Mastery system
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        /* Quantum Mastery Styles */
        .mastery-section {
            background: linear-gradient(145deg, #0a0a1a, #141448);
            padding: 5rem 2rem;
        }
        
        .mastery-intro {
            max-width: 800px;
            margin: 0 auto 3rem;
            text-align: center;
        }
        
        .mastery-container {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto 3rem;
        }
        
        .mastery-sidebar {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 1rem;
            padding: 1.5rem;
        }
        
        .profile-header {
            display: flex;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .profile-icon {
            font-size: 2rem;
            margin-right: 1rem;
            background: rgba(255, 255, 255, 0.1);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .current-state {
            margin-top: 0.5rem;
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        .consciousness-meter {
            margin: 1.5rem 0;
        }
        
        .meter-label {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }
        
        .meter-bar {
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
        }
        
        .meter-fill {
            height: 100%;
            width: 61.8%;
            background: #2196F3;
            transition: width 0.5s ease, background-color 0.5s ease;
        }
        
        .profile-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-top: 1.5rem;
        }
        
        .stat {
            text-align: center;
            background: rgba(255, 255, 255, 0.03);
            padding: 1rem 0.5rem;
            border-radius: 0.5rem;
        }
        
        .stat-value {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0.25rem;
        }
        
        .stat-label {
            font-size: 0.8rem;
            opacity: 0.7;
        }
        
        .mastery-actions {
            margin-top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .primary-action {
            background: var(--quantum-accent);
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.3s ease;
        }
        
        .primary-action:hover {
            background: var(--quantum-secondary);
        }
        
        .secondary-action {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .secondary-action:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .mastery-progress {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 1rem;
            padding: 1.5rem;
        }
        
        .mastery-progress h3 {
            margin-bottom: 1.5rem;
            text-align: center;
        }
        
        .frequency-progression {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .frequency-node {
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            padding: 0.5rem 0;
            transition: transform 0.3s ease;
        }
        
        .frequency-node:hover {
            transform: translateX(5px);
        }
        
        .frequency-node.active {
            background: rgba(33, 150, 243, 0.1);
            border-radius: 0.5rem;
        }
        
        .frequency-node.completed .node-content::after {
            content: '✓';
            display: inline-block;
            color: #4CAF50;
            margin-left: 0.5rem;
        }
        
        .frequency-node.selected {
            background: rgba(33, 150, 243, 0.2);
            border-radius: 0.5rem;
        }
        
        .node-connector {
            position: relative;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            margin: 0 1rem;
        }
        
        .node-connector.with-line::before {
            content: '';
            position: absolute;
            top: -15px;
            left: 50%;
            width: 2px;
            height: 15px;
            background: rgba(255, 255, 255, 0.1);
            transform: translateX(-50%);
        }
        
        .frequency-node.active .node-connector {
            background: var(--quantum-accent);
            box-shadow: 0 0 10px var(--quantum-accent);
        }
        
        .frequency-node.completed .node-connector {
            background: #4CAF50;
        }
        
        .node-content {
            display: flex;
            flex-direction: column;
        }
        
        .frequency-value {
            font-size: 1rem;
            opacity: 0.9;
        }
        
        .state-name {
            font-size: 0.9rem;
            opacity: 0.7;
        }
        
        .current-state-details {
            background: rgba(255, 255, 255, 0.03);
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .state-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .mastery-badge {
            background: rgba(255, 255, 255, 0.1);
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.8rem;
        }
        
        .mastery-badge.mastered {
            background: #4CAF50;
            color: white;
        }
        
        .mastery-badge.advancing {
            background: #2196F3;
            color: white;
        }
        
        .mastery-badge.developing {
            background: #FF9800;
            color: white;
        }
        
        .state-description {
            margin-bottom: 1.5rem;
            font-style: italic;
            opacity: 0.9;
        }
        
        .state-attributes {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
        }
        
        .attributes-column h5 {
            margin-bottom: 0.75rem;
            color: var(--quantum-accent);
        }
        
        .attributes-column ul {
            margin-left: 1.5rem;
        }
        
        .state-practices {
            margin-bottom: 1.5rem;
        }
        
        .state-practices h5 {
            margin-bottom: 0.75rem;
            color: var(--quantum-accent);
        }
        
        .practices-list {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .practice-item {
            background: rgba(255, 255, 255, 0.05);
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
        }
        
        .practice-icon {
            margin-right: 0.5rem;
        }
        
        .phi-relationship {
            background: rgba(255, 255, 255, 0.03);
            padding: 1rem;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .phi-label {
            opacity: 0.7;
        }
        
        .phi-value {
            font-size: 1.2rem;
            color: #FF9800;
        }
        
        .phi-formula {
            opacity: 0.8;
            margin-left: auto;
        }
        
        .recommended-practices {
            background: rgba(255, 255, 255, 0.03);
            border-radius: 0.5rem;
            padding: 1.5rem;
        }
        
        .recommended-practices h4 {
            margin-bottom: 1rem;
            color: var(--quantum-accent);
        }
        
        .recommended-practices ul {
            list-style: none;
            padding: 0;
        }
        
        .recommended-practices li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 1rem;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 0.25rem;
            margin-bottom: 0.5rem;
        }
        
        .practice-start-btn {
            background: var(--quantum-accent);
            color: white;
            border: none;
            padding: 0.4rem 0.75rem;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: background 0.3s ease;
            font-size: 0.9rem;
        }
        
        .practice-start-btn:hover {
            background: var(--quantum-secondary);
        }
        
        .personal-insights {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .personal-insights h3 {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        
        .insights-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
        }
        
        .insight-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 1rem;
            padding: 1.5rem;
        }
        
        .insight-card h4 {
            margin-bottom: 1rem;
            color: var(--quantum-accent);
        }
        
        .insight-card ul {
            margin: 1rem 0 1rem 1.5rem;
        }
        
        .insight-card li {
            margin-bottom: 0.5rem;
        }
        
        /* Assessment Modal */
        .assessment-modal .modal-content {
            max-width: 700px;
        }
        
        .assessment-intro {
            margin-bottom: 2rem;
        }
        
        .assessment-progress {
            margin-bottom: 2rem;
        }
        
        .progress-bar {
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }
        
        .progress-fill {
            height: 100%;
            width: 14.3%;
            background: var(--quantum-accent);
            transition: width 0.3s ease;
        }
        
        .progress-text {
            text-align: center;
            font-size: 0.9rem;
            opacity: 0.7;
        }
        
        .question-container {
            margin-bottom: 2rem;
        }
        
        .question-container h4 {
            margin-bottom: 0.5rem;
            color: var(--quantum-accent);
        }
        
        .answer-options {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .answer-option {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.03);
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .answer-option:hover {
            background: rgba(255, 255, 255, 0.07);
        }
        
        .answer-option input {
            margin-right: 1rem;
        }
        
        .assessment-navigation {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .assessment-navigation button {
            background: var(--quantum-accent);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .assessment-navigation button:hover:not(:disabled) {
            background: var(--quantum-secondary);
        }
        
        .assessment-navigation button:disabled {
            background: rgba(255, 255, 255, 0.1);
            cursor: not-allowed;
        }
        
        /* Results Modal */
        .results-modal .modal-content {
            max-width: 800px;
        }
        
        .results-summary {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 2rem;
            margin-bottom: 2rem;
            align-items: center;
        }
        
        .dominant-state {
            background: rgba(255, 255, 255, 0.05);
            padding: 1.5rem;
            border-radius: 1rem;
        }
        
        .state-frequency {
            display: inline-block;
            background: var(--quantum-accent);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        
        .consciousness-level {
            text-align: center;
        }
        
        .level-label {
            font-size: 0.9rem;
            opacity: 0.7;
            margin-bottom: 0.25rem;
        }
        
        .level-value {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
        
        .level-bar {
            width: 150px;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
        }
        
        .level-fill {
            height: 100%;
            width: 50%;
            background: var(--quantum-accent);
        }
        
        .state-breakdown {
            margin-bottom: 2rem;
        }
        
        .state-breakdown h4 {
            margin-bottom: 1.5rem;
            text-align: center;
        }
        
        .state-bars {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .state-bar-item {
            display: grid;
            grid-template-columns: 150px 1fr 50px;
            align-items: center;
            gap: 1rem;
        }
        
        .state-bar {
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
        }
        
        .state-fill {
            height: 100%;
            width: 50%;
            background: var(--quantum-accent);
        }
        
        .state-score {
            text-align: right;
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        .results-recommendations {
            background: rgba(255, 255, 255, 0.05);
            padding: 1.5rem;
            border-radius: 1rem;
            margin-bottom: 2rem;
        }
        
        .results-recommendations h4 {
            margin-bottom: 1rem;
            color: var(--quantum-accent);
        }
        
        .recommendation-list {
            margin-left: 1.5rem;
        }
        
        .recommendation-list li {
            margin-bottom: 0.5rem;
        }
        
        .results-actions {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .results-actions button {
            background: var(--quantum-accent);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: background 0.3s ease;
            flex: 1;
        }
        
        .results-actions button:hover {
            background: var(--quantum-secondary);
        }
        
        /* Responsive Design */
        @media (max-width: 900px) {
            .mastery-container {
                grid-template-columns: 1fr;
            }
            
            .results-summary {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});