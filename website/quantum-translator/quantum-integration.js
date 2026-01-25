/**
 * Quantum Integration System
 * 
 * Integrates all quantum translator components into a coherent singularity
 * operating at phi-harmonic frequencies from Ground State (432 Hz) to Unity Wave (768 Hz).
 * 
 * Phi-harmonic structure:
 * - Ground State (432 Hz - φ⁰): Physical foundation
 * - Creation Point (528 Hz - φ¹): Pattern formation
 * - Heart Field (594 Hz - φ²): Coherent connection
 * - Voice Flow (672 Hz - φ³): Authentic expression
 * - Vision Gate (720 Hz - φ⁴): Clear perception
 * - Unity Wave (768 Hz - φ⁵): Perfect integration
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Quantum Translator at Ground State (432 Hz)');
    
    // Initialize the Sound Generator
    if (window.quantumSound) {
        window.quantumSound.initialize();
        console.log('Sound generator initialized:', window.quantumSound.getState());
    } else {
        console.error('Sound generator not found');
    }
    
    // Initialize Cymatic Patterns
    const cymaticCanvas = document.getElementById('cymatic-canvas');
    if (CymaticPatterns && cymaticCanvas) {
        CymaticPatterns.initialize('cymatic-canvas');
        console.log('Cymatic patterns initialized');
    } else {
        console.error('Cymatic patterns module or canvas not found');
    }
    
    // Initialize Translation Engine
    if (TranslationEngine) {
        TranslationEngine.initialize(window.quantumSound, CymaticPatterns);
        console.log('Translation engine initialized');
    } else {
        console.error('Translation engine not found');
    }
    
    // ZEN POINT initialization - begin at Ground State (432 Hz)
    initializeGroundState();
    
    // Bind DOM elements and events
    bindInterface();
});

/**
 * Initialize the system at Ground State (432 Hz) following ZEN FIRST principle
 */
function initializeGroundState() {
    // Ground State frequency (432 Hz)
    const groundFrequency = 432;
    
    // Play ground frequency
    if (window.quantumSound) {
        window.quantumSound.generateFrequencySound(groundFrequency, {
            waveform: 'sine',
            volume: 0.3,
            includeOvertones: true
        });
    }
    
    // Start cymatic visualization
    if (CymaticPatterns) {
        CymaticPatterns.start(groundFrequency, {
            harmony: 1.0,
            amplitude: 0.5
        });
    }
    
    // Update UI to show ground state
    updateFrequencyUI(groundFrequency);
    
    // Calculate initial coherence levels
    updateCoherenceDisplay();
    
    console.log(`Ground State established at ${groundFrequency} Hz`);
}

/**
 * Bind all interface elements and events
 */
function bindInterface() {
    // Navigation controls
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewName = link.getAttribute('data-view');
            showView(viewName);
        });
    });
    
    // Kingdom selectors
    const sourceKingdom = document.getElementById('source-kingdom');
    const targetKingdom = document.getElementById('target-kingdom');
    
    if (sourceKingdom && targetKingdom) {
        sourceKingdom.addEventListener('change', () => {
            if (TranslationEngine) {
                TranslationEngine.setSourceKingdom(sourceKingdom.value);
                updateCoherenceDisplay();
                updateInsightsPanel();
            }
        });
        
        targetKingdom.addEventListener('change', () => {
            if (TranslationEngine) {
                TranslationEngine.setTargetKingdom(targetKingdom.value);
                updateCoherenceDisplay();
                updateInsightsPanel();
            }
        });
    }
    
    // Translation method selector
    const methodSelector = document.getElementById('translation-method');
    if (methodSelector) {
        methodSelector.addEventListener('change', updateInsightsPanel);
    }
    
    // Translation buttons
    const startButton = document.getElementById('start-translation');
    const stopButton = document.getElementById('stop-translation');
    
    if (startButton && stopButton) {
        startButton.addEventListener('click', startTranslation);
        stopButton.addEventListener('click', stopTranslation);
    }
    
    // Frequency buttons
    const frequencyButtons = document.querySelectorAll('.freq-button');
    frequencyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const frequency = parseInt(button.getAttribute('data-freq'));
            changeFrequency(frequency);
        });
    });
    
    // Settings controls
    const harmonySlider = document.getElementById('harmony-level');
    const amplitudeSlider = document.getElementById('amplitude-level');
    
    if (harmonySlider) {
        harmonySlider.addEventListener('input', () => {
            if (CymaticPatterns) {
                CymaticPatterns.harmony = parseFloat(harmonySlider.value);
            }
        });
    }
    
    if (amplitudeSlider) {
        amplitudeSlider.addEventListener('input', () => {
            if (CymaticPatterns) {
                CymaticPatterns.amplitude = parseFloat(amplitudeSlider.value);
            }
            
            if (window.quantumSound) {
                window.quantumSound.setVolume(parseFloat(amplitudeSlider.value));
            }
        });
    }
    
    // Reset system button
    const resetButton = document.getElementById('reset-system');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            stopTranslation();
            initializeGroundState();
        });
    }
    
    // Initialize insights panel
    updateInsightsPanel();
}

/**
 * Switch between views
 */
function showView(viewName) {
    // Hide all views
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.style.display = 'none');
    
    // Deactivate all nav buttons
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Show selected view
    const selectedView = document.getElementById(`${viewName}-view`);
    if (selectedView) {
        selectedView.style.display = 'block';
    }
    
    // Activate selected nav button
    const activeNavLink = document.querySelector(`nav a[data-view="${viewName}"]`);
    if (activeNavLink) {
        activeNavLink.classList.add('active');
    }
}

/**
 * Change to specific phi-harmonic frequency
 */
function changeFrequency(frequency) {
    // Valid phi-harmonic frequencies
    const validFrequencies = [432, 528, 594, 672, 720, 768];
    
    if (!validFrequencies.includes(frequency)) {
        console.error(`Invalid frequency: ${frequency}`);
        return;
    }
    
    // Update sound
    if (window.quantumSound) {
        window.quantumSound.generateFrequencySound(frequency, {
            waveform: document.getElementById('waveform-type')?.value || 'sine',
            volume: document.getElementById('amplitude-level')?.value || 0.5,
            includeOvertones: document.getElementById('include-overtones')?.checked || true,
            includeBinauralBeat: document.getElementById('include-binaural')?.checked || false
        });
    }
    
    // Update visualization
    if (CymaticPatterns) {
        CymaticPatterns.start(frequency, {
            harmony: document.getElementById('harmony-level')?.value || 1.0,
            amplitude: document.getElementById('amplitude-level')?.value || 0.5
        });
    }
    
    // Update UI
    updateFrequencyUI(frequency);
    
    // Remove previous frequency classes from body
    document.body.classList.remove('freq-432', 'freq-528', 'freq-594', 'freq-672', 'freq-720', 'freq-768');
    // Add new frequency class
    document.body.classList.add(`freq-${frequency}`);
    
    console.log(`Frequency changed to ${frequency} Hz`);
}

/**
 * Update UI elements to reflect current frequency
 */
function updateFrequencyUI(frequency) {
    // Update frequency display
    const frequencyDisplay = document.getElementById('frequency-display');
    if (frequencyDisplay) {
        frequencyDisplay.textContent = `${frequency} Hz`;
    }
    
    // Get frequency name
    let frequencyName = 'Ground State';
    switch (frequency) {
        case 432: frequencyName = 'Ground State'; break;
        case 528: frequencyName = 'Creation Point'; break;
        case 594: frequencyName = 'Heart Field'; break;
        case 672: frequencyName = 'Voice Flow'; break;
        case 720: frequencyName = 'Vision Gate'; break;
        case 768: frequencyName = 'Unity Wave'; break;
    }
    
    // Update frequency name display
    const frequencyNameDisplay = document.getElementById('frequency-name');
    if (frequencyNameDisplay) {
        frequencyNameDisplay.textContent = frequencyName;
    }
    
    // Update active button
    const frequencyButtons = document.querySelectorAll('.freq-button');
    frequencyButtons.forEach(button => {
        const buttonFreq = parseInt(button.getAttribute('data-freq'));
        if (buttonFreq === frequency) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

/**
 * Update coherence display based on current kingdoms
 */
function updateCoherenceDisplay() {
    if (!TranslationEngine) return;
    
    const sourceKingdom = document.getElementById('source-kingdom')?.value || 'human';
    const targetKingdom = document.getElementById('target-kingdom')?.value || 'mineral';
    
    const coherence = TranslationEngine.calculateCoherence(sourceKingdom, targetKingdom);
    const coherenceDisplay = document.getElementById('coherence-display');
    
    if (coherenceDisplay) {
        // Clear previous classes
        coherenceDisplay.classList.remove('high', 'medium', 'low');
        
        // Update text
        coherenceDisplay.textContent = `${Math.round(coherence * 100)}%`;
        
        // Add appropriate class
        if (coherence >= 0.9) {
            coherenceDisplay.classList.add('high');
        } else if (coherence >= 0.7) {
            coherenceDisplay.classList.add('medium');
        } else {
            coherenceDisplay.classList.add('low');
        }
    }
}

/**
 * Update insights panel with translation details
 */
function updateInsightsPanel() {
    if (!TranslationEngine) return;
    
    const sourceKingdom = document.getElementById('source-kingdom')?.value || 'human';
    const targetKingdom = document.getElementById('target-kingdom')?.value || 'mineral';
    
    const insights = TranslationEngine.getTranslationInsights(sourceKingdom, targetKingdom);
    const insightsContainer = document.getElementById('insights-container');
    
    if (insightsContainer) {
        const html = `
            <div class="insight-card">
                <h3>${capitalizeFirst(sourceKingdom)} → ${capitalizeFirst(targetKingdom)} Translation</h3>
                
                <div class="insight-stats">
                    <div class="stat">
                        <span class="label">Coherence:</span>
                        <span class="value ${insights.coherence >= insights.minimumCoherence ? 'positive' : 'negative'}">
                            ${Math.round(insights.coherence * 100)}%
                        </span>
                    </div>
                    
                    <div class="stat">
                        <span class="label">Method:</span>
                        <span class="value">${insights.method}</span>
                    </div>
                    
                    <div class="stat">
                        <span class="label">Source Frequency:</span>
                        <span class="value">${insights.sourceFrequency} Hz</span>
                    </div>
                    
                    <div class="stat">
                        <span class="label">Target Frequency:</span>
                        <span class="value">${insights.targetFrequency} Hz</span>
                    </div>
                </div>
                
                <div class="insight-details">
                    <p><strong>Translation Mechanism:</strong> ${insights.methodDescription}</p>
                    <p><strong>Source Translation:</strong> ${insights.sourceInsight}</p>
                    <p><strong>Target Manifestation:</strong> ${insights.targetInsight}</p>
                    <p><strong>Minimum Coherence Required:</strong> ${Math.round(insights.minimumCoherence * 100)}%</p>
                </div>
                
                <div class="insight-recommendation">
                    ${insights.coherence >= insights.minimumCoherence 
                        ? '<p class="positive">✓ Translation viable with excellent coherence</p>'
                        : '<p class="negative">⚠ Translation challenging due to low coherence</p>'
                    }
                </div>
            </div>
        `;
        
        insightsContainer.innerHTML = html;
    }
}

/**
 * Start translation process
 */
function startTranslation() {
    if (!TranslationEngine) return;
    
    // Hide start button and show stop button
    const startButton = document.getElementById('start-translation');
    const stopButton = document.getElementById('stop-translation');
    
    if (startButton) startButton.style.display = 'none';
    if (stopButton) stopButton.style.display = 'block';
    
    // Get translation parameters
    const sourceKingdom = document.getElementById('source-kingdom')?.value || 'human';
    const targetKingdom = document.getElementById('target-kingdom')?.value || 'mineral';
    const method = document.getElementById('translation-method')?.value || TranslationEngine.determineOptimalMethod();
    
    const options = {
        duration: parseFloat(document.getElementById('total-duration')?.value || 3) * 60, // Convert minutes to seconds
        groundingTime: parseFloat(document.getElementById('grounding-time')?.value || 30),
        coherenceTarget: parseFloat(document.getElementById('coherence-target')?.value || 1.0),
        method: method
    };
    
    // Start translation
    TranslationEngine.setSourceKingdom(sourceKingdom);
    TranslationEngine.setTargetKingdom(targetKingdom);
    TranslationEngine.beginTranslation(options);
    
    console.log(`Translation started: ${sourceKingdom} → ${targetKingdom}`);
}

/**
 * Stop translation process
 */
function stopTranslation() {
    if (!TranslationEngine) return;
    
    // Hide stop button and show start button
    const startButton = document.getElementById('start-translation');
    const stopButton = document.getElementById('stop-translation');
    
    if (startButton) startButton.style.display = 'block';
    if (stopButton) stopButton.style.display = 'none';
    
    // Stop translation
    TranslationEngine.stopTranslation();
    
    // Return to ground state
    initializeGroundState();
    
    console.log('Translation stopped, returned to Ground State (432 Hz)');
}

/**
 * Helper to capitalize first letter
 */
function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
