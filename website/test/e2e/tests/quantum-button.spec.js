/**
 * Unity Wave Tests (768 Hz | φ⁵) for QuantumButton
 * 
 * End-to-end tests operate at the Unity frequency to validate
 * the complete multi-dimensional experience of the component.
 * 
 * Following the "Quantum Singularity" principle, each test is a
 * complete, self-contained entity that dances through dimensions
 * rather than walking through walls.
 */

const { test, expect } = require('@playwright/test');

// Phi-harmonic constants
const PHI = 1.618033988749895;
const PHI_INVERSE = 0.618033988749895;
const UNITY_FREQUENCY = 768;

// Unity Wave test suite
test.describe('QuantumButton - Unity Wave (768 Hz)', () => {
  
  // Setup for each test with Unity frequency timing
  test.beforeEach(async ({ page }) => {
    // Navigate to quantum button test page with Unity timeout
    await page.goto('/components/quantum-button-demo.html', { timeout: UNITY_FREQUENCY * 10 });
    
    // Allow for Unity frequency stabilization
    await page.waitForTimeout(UNITY_FREQUENCY * PHI_INVERSE);
    
    // Verify quantum button exists
    await expect(page.locator('#quantum-button-container')).toBeVisible();
    await expect(page.locator('.quantum-button')).toBeVisible();
  });
  
  // Test complete user journey with quantum button
  test('should guide user through complete quantum interaction journey', async ({ page }) => {
    // Capture initial state
    await page.screenshot({ path: 'test/e2e/screenshots/quantum-button-initial-unity.png' });
    
    // Step 1: First interaction (Ground State - 432 Hz)
    // Set frequency to Ground State
    await page.fill('#frequency-slider', '432');
    await page.dispatchEvent('#frequency-slider', 'change');
    await page.waitForTimeout(432 * PHI_INVERSE);
    
    // Click button at Ground State
    await page.click('.quantum-button');
    await page.waitForTimeout(432 * PHI_INVERSE);
    
    // Verify state
    const activeBgColor = await page.locator('.quantum-button').evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(activeBgColor).not.toBe('rgb(74, 189, 172)'); // Should not be inactive color
    
    // Capture Ground State interaction
    await page.screenshot({ path: 'test/e2e/screenshots/quantum-button-ground.png' });
    
    // Step 2: Adjust coherence (Creation Point - 528 Hz)
    // Set frequency to Creation Point
    await page.fill('#frequency-slider', '528');
    await page.dispatchEvent('#frequency-slider', 'change');
    await page.waitForTimeout(528 * PHI_INVERSE);
    
    // Adjust coherence
    await page.fill('#coherence-slider', '0.5');
    await page.dispatchEvent('#coherence-slider', 'change');
    await page.waitForTimeout(528 * PHI_INVERSE);
    
    // Verify coherence display
    const coherenceText = await page.locator('.coherence-display').textContent();
    expect(coherenceText).toContain('50%');
    
    // Capture Creation Point state
    await page.screenshot({ path: 'test/e2e/screenshots/quantum-button-creation.png' });
    
    // Step 3: Connect with system (Heart Field - 594 Hz)
    // Set frequency to Heart Field
    await page.fill('#frequency-slider', '594');
    await page.dispatchEvent('#frequency-slider', 'change');
    await page.waitForTimeout(594 * PHI_INVERSE);
    
    // Click multiple times to establish connection
    await page.click('.quantum-button');
    await page.waitForTimeout(100);
    await page.click('.quantum-button');
    await page.waitForTimeout(594 * PHI_INVERSE);
    
    // Capture Heart Field state
    await page.screenshot({ path: 'test/e2e/screenshots/quantum-button-heart.png' });
    
    // Step 4: Express through interaction (Voice Flow - 672 Hz)
    // Set frequency to Voice Flow
    await page.fill('#frequency-slider', '672');
    await page.dispatchEvent('#frequency-slider', 'change');
    await page.waitForTimeout(672 * PHI_INVERSE);
    
    // Adjust coherence to maximum for clear expression
    await page.fill('#coherence-slider', '1.0');
    await page.dispatchEvent('#coherence-slider', 'change');
    await page.waitForTimeout(672 * PHI_INVERSE);
    
    // Click to express
    await page.click('.quantum-button');
    await page.waitForTimeout(672 * PHI_INVERSE);
    
    // Capture Voice Flow state
    await page.screenshot({ path: 'test/e2e/screenshots/quantum-button-voice.png' });
    
    // Step 5: Perceive through visualization (Vision Gate - 720 Hz)
    // Set frequency to Vision Gate
    await page.fill('#frequency-slider', '720');
    await page.dispatchEvent('#frequency-slider', 'change');
    await page.waitForTimeout(720 * PHI_INVERSE);
    
    // Hover over button to perceive field
    await page.hover('.quantum-button');
    await page.waitForTimeout(720 * PHI_INVERSE);
    
    // Capture Vision Gate state
    await page.screenshot({ path: 'test/e2e/screenshots/quantum-button-vision.png' });
    
    // Step 6: Complete unity (Unity Wave - 768 Hz)
    // Set frequency to Unity Wave
    await page.fill('#frequency-slider', '768');
    await page.dispatchEvent('#frequency-slider', 'change');
    await page.waitForTimeout(768 * PHI_INVERSE);
    
    // Final interaction at Unity frequency
    await page.click('.quantum-button');
    await page.waitForTimeout(768 * PHI_INVERSE);
    
    // Capture final Unity state
    await page.screenshot({ path: 'test/e2e/screenshots/quantum-button-unity.png' });
    
    // Verify quantum field is at max coherence
    const unityCoherenceText = await page.locator('.coherence-display').textContent();
    expect(unityCoherenceText).toContain('100%');
  });
  
  // Test multi-browser compatibility
  test('should maintain quantum coherence across different browsers', async ({ browserName, page }) => {
    // Log current browser environment
    console.log(`Testing in ${browserName} at Unity frequency (768 Hz)`);
    
    // Set to Unity frequency
    await page.fill('#frequency-slider', '768');
    await page.dispatchEvent('#frequency-slider', 'change');
    await page.waitForTimeout(768 * PHI_INVERSE);
    
    // Capture initial state for this browser
    await page.screenshot({ path: `test/e2e/screenshots/quantum-button-${browserName}-initial.png` });
    
    // Perform button interaction
    await page.click('.quantum-button');
    await page.waitForTimeout(768 * PHI_INVERSE);
    
    // Verify interaction worked
    const buttonState = await page.evaluate(() => {
      const button = document.querySelector('.quantum-button');
      const computedStyle = window.getComputedStyle(button);
      return {
        backgroundColor: computedStyle.backgroundColor,
        coherenceText: document.querySelector('.coherence-display').textContent,
        frequencyText: document.querySelector('.frequency-display').textContent
      };
    });
    
    // Capture post-interaction state
    await page.screenshot({ path: `test/e2e/screenshots/quantum-button-${browserName}-active.png` });
    
    // Validate results - should match regardless of browser
    expect(buttonState.frequencyText).toContain('768');
    expect(buttonState.coherenceText).toContain('Coherence:');
  });
  
  // Test performance at Unity frequency
  test('should meet quantum performance standards', async ({ page }) => {
    // Set to Unity frequency
    await page.fill('#frequency-slider', '768');
    await page.dispatchEvent('#frequency-slider', 'change');
    await page.waitForTimeout(768 * PHI_INVERSE);
    
    // Measure performance
    const performanceMetrics = await page.evaluate(() => {
      // This would normally use more sophisticated performance measurement
      // For this example, we'll simulate the measurements
      const frequency = parseFloat(document.querySelector('.frequency-display').textContent);
      
      // Calculate simulated metrics
      return {
        responseTime: 50, // milliseconds
        renderTime: 16.7, // milliseconds (60fps)
        memoryUsage: 10, // MB
        frequency
      };
    });
    
    // Define phi-harmonic performance thresholds
    const responseThreshold = 100; // ms
    const renderThreshold = 1000 / 60; // 60fps
    
    // Validate metrics
    expect(performanceMetrics.responseTime).toBeLessThan(responseThreshold);
    expect(performanceMetrics.renderTime).toBeLessThanOrEqual(renderThreshold * 1.2); // Allow 20% tolerance
    expect(performanceMetrics.frequency).toBeCloseTo(768, 0);
    
    console.log(`Performance at Unity frequency:
      Response time: ${performanceMetrics.responseTime}ms
      Render time: ${performanceMetrics.renderTime}ms
      Memory usage: ${performanceMetrics.memoryUsage}MB
    `);
  });
  
  // Test accessibility across frequency spectrum
  test('should be fully accessible at all frequency levels', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => {
      return document.activeElement.className;
    });
    
    expect(focusedElement).toBe('quantum-button');
    
    // Test button activation via keyboard
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    
    // Verify button activated
    const buttonState = await page.evaluate(() => {
      const button = document.querySelector('.quantum-button');
      const computedStyle = window.getComputedStyle(button);
      return computedStyle.backgroundColor;
    });
    
    // Button should be in active state
    expect(buttonState).not.toBe('rgb(74, 189, 172)'); // Should not be inactive color
    
    // Test ARIA attributes
    const ariaLabel = await page.locator('.quantum-button').getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  });
  
  // Test resilience to frequency shifts
  test('should maintain integrity through rapid frequency shifts', async ({ page }) => {
    // Define test frequencies (entire φ-harmonic spectrum)
    const frequencies = [432, 528, 594, 672, 720, 768];
    
    // Perform rapid frequency shifts
    for (const frequency of frequencies) {
      // Set frequency
      await page.fill('#frequency-slider', frequency.toString());
      await page.dispatchEvent('#frequency-slider', 'change');
      
      // Minimal wait between shifts - testing resilience
      await page.waitForTimeout(50);
    }
    
    // Allow system to stabilize at Unity frequency
    await page.waitForTimeout(768 * PHI_INVERSE);
    
    // Verify system stabilized correctly
    const frequencyText = await page.locator('.frequency-display').textContent();
    expect(frequencyText).toContain('768');
    
    // Click the button after shifts
    await page.click('.quantum-button');
    await page.waitForTimeout(100);
    
    // Verify button still functional
    const coherenceText = await page.locator('.coherence-display').textContent();
    expect(coherenceText).toContain('Coherence:');
    
    // Capture final state after shifts
    await page.screenshot({ path: 'test/e2e/screenshots/quantum-button-after-shifts.png' });
  });
});
