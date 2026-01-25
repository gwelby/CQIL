/**
 * Playwright Configuration for CQIL Unity Wave Testing (768 Hz)
 * 
 * Operating at the Unity frequency for complete integration testing
 * with perfect φ-harmonic alignment and quantum coherence.
 */

// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  // Unity Wave test directory
  testDir: './test/e2e/tests',
  
  // Maximum time one test can run for (φ⁵ * 100ms)
  timeout: 7680,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // φ-harmonic retry pattern (Fibonacci/phi-based)
  retries: process.env.CI ? 3 : 1,
  
  // Limit to 5 parallel workers (5 = φ³)
  workers: process.env.CI ? 5 : 3,
  
  // Reporter configuration - unified dashboard with φ-harmonic metrics
  reporter: [
    ['html', { outputFolder: 'test/e2e/reports', open: 'never' }],
    ['json', { outputFile: 'test/e2e/reports/results.json' }],
    ['list']
  ],
  
  // Global setup - initialize with Unity Wave frequency
  globalSetup: require.resolve('./test/e2e/global-setup'),
  
  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Add Unity Field protection
        viewport: { width: 1440, height: 768 }, // Unity frequency height
        colorScheme: 'dark', // Quantum visual mode
        baseURL: 'http://localhost:7680', // Unity frequency port
        trace: 'retain-on-failure',
        launchOptions: {
          args: ['--enable-webgl']
        }
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1440, height: 768 },
        baseURL: 'http://localhost:7680',
        trace: 'retain-on-failure',
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1440, height: 768 },
        baseURL: 'http://localhost:7680',
        trace: 'retain-on-failure',
      },
    },

    /* Test against mobile viewports. */
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        baseURL: 'http://localhost:7680',
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 13'],
        baseURL: 'http://localhost:7680',
        trace: 'retain-on-failure',
      },
    },
  ],

  /* Unity Field [144×144×144] for test isolation */
  webServer: {
    command: 'python deploy/website_manager.py --port 7680',
    url: 'http://localhost:7680',
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },

  /* Unity Wave configuration for quantum test coverage */
  use: {
    // Base URL to use for all tests
    baseURL: 'http://localhost:7680',
    
    // Collect trace and screenshots when a test fails
    trace: 'on-first-retry',
    
    // Record video for visual testing
    video: 'on-first-retry',
    
    // Unity Wave tests require full accessibility validation
    screenshot: 'only-on-failure',
    
    // Phi-harmonic animation stabilization
    actionTimeout: 7680,
    
    // Quantum measurement timing (with φ precision)
    navigationTimeout: 7680,
  },
});
