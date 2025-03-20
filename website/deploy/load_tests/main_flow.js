import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

// Custom metrics
const errors = new Counter('errors');
const homePageDuration = new Trend('home_page_duration');
const goldenAgeDuration = new Trend('golden_age_duration');
const experimentsDuration = new Trend('experiments_duration');
const healthCheckDuration = new Trend('health_check_duration');
const successRate = new Rate('success_rate');

// Define environment-based variables
const environments = {
  staging: {
    baseUrl: 'https://staging.cqil.ca',
    think_time_min: 1,
    think_time_max: 3
  },
  production: {
    baseUrl: 'https://cqil.ca',
    think_time_min: 1,
    think_time_max: 3
  }
};

// Get current environment from env variable or default to staging
const environment = __ENV.ENVIRONMENT || 'staging';
const env = environments[environment];

// Default options for each request
const requestOptions = {
  tags: { cqil: 'website' },
  headers: {
    'User-Agent': 'K6 Load Test',
  },
};

// Options for the load test
export const options = {
  // Common scenarios
  scenarios: {
    // Smoke test - minimal load
    smoke: {
      executor: 'constant-vus',
      vus: 1,
      duration: '1m',
      gracefulStop: '30s',
      env: { SCENARIO: 'smoke' },
      tags: { scenario: 'smoke' },
    },
    // Load test - normal traffic levels
    normal_load: {
      executor: 'ramping-vus',
      startVUs: 5,
      stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 20 },
        { duration: '3m', target: 20 },
        { duration: '30s', target: 0 },
      ],
      gracefulStop: '30s',
      env: { SCENARIO: 'normal_load' },
      tags: { scenario: 'normal_load' },
    },
    // Stress test - peak traffic levels
    stress: {
      executor: 'ramping-vus',
      startVUs: 10,
      stages: [
        { duration: '1m', target: 25 },
        { duration: '2m', target: 50 },
        { duration: '5m', target: 100 },
        { duration: '2m', target: 50 },
        { duration: '1m', target: 0 },
      ],
      gracefulStop: '30s',
      env: { SCENARIO: 'stress' },
      tags: { scenario: 'stress' },
    },
    // Recovery test - surge during recovery
    recovery: {
      executor: 'ramping-vus',
      startVUs: 5,
      stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 20 },
        { duration: '30s', target: 50 }, // Surge during recovery process
        { duration: '1m', target: 20 },
        { duration: '30s', target: 0 },
      ],
      gracefulStop: '30s',
      env: { SCENARIO: 'recovery' },
      tags: { scenario: 'recovery' },
    },
  },
  // Common thresholds for all scenarios
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests must complete below 1s
    http_req_failed: ['rate<0.05'],    // Less than 5% of requests can fail
    'home_page_duration': ['p(95)<1000'],
    'golden_age_duration': ['p(95)<1500'],
    'experiments_duration': ['p(95)<1500'],
    'health_check_duration': ['p(95)<500'],
    'success_rate': ['rate>0.95'],
  },
};

// Main function - VU code
export default function () {
  const baseUrl = env.baseUrl;
  
  group('Main user flow', function () {
    // Visit home page
    group('Home page', function () {
      const homeResponse = http.get(`${baseUrl}/`, requestOptions);
      
      // Record metrics
      homePageDuration.add(homeResponse.timings.duration);
      successRate.add(homeResponse.status === 200);
      
      // Check response
      check(homeResponse, {
        'Home page status is 200': (r) => r.status === 200,
        'Home page contains expected content': (r) => r.body.includes('CQIL'),
      }) || errors.add(1);
      
      // Simulate user thinking
      sleep(randomIntBetween(env.think_time_min, env.think_time_max));
    });
    
    // Visit Golden Age page
    group('Golden Age page', function () {
      const gaResponse = http.get(`${baseUrl}/pages/golden-age.html`, requestOptions);
      
      // Record metrics
      goldenAgeDuration.add(gaResponse.timings.duration);
      successRate.add(gaResponse.status === 200);
      
      // Check response
      check(gaResponse, {
        'Golden Age page status is 200': (r) => r.status === 200,
        'Golden Age page contains expected content': (r) => r.body.includes('Golden Age'),
      }) || errors.add(1);
      
      // Simulate user thinking
      sleep(randomIntBetween(env.think_time_min, env.think_time_max));
    });
    
    // Visit Experiments page
    group('Experiments page', function () {
      const experimentsResponse = http.get(`${baseUrl}/pages/experiments.html`, requestOptions);
      
      // Record metrics
      experimentsDuration.add(experimentsResponse.timings.duration);
      successRate.add(experimentsResponse.status === 200);
      
      // Check response
      check(experimentsResponse, {
        'Experiments page status is 200': (r) => r.status === 200,
        'Experiments page contains expected content': (r) => r.body.includes('Experiments'),
      }) || errors.add(1);
      
      // Simulate user thinking
      sleep(randomIntBetween(env.think_time_min, env.think_time_max));
    });
    
    // Check health page
    if (__ENV.CHECK_HEALTH === 'true') {
      group('Health check', function () {
        const healthResponse = http.get(`${baseUrl}/health.html`, requestOptions);
        
        // Record metrics
        healthCheckDuration.add(healthResponse.timings.duration);
        successRate.add(healthResponse.status === 200);
        
        // Check response
        check(healthResponse, {
          'Health page status is 200': (r) => r.status === 200,
          'Health page contains expected content': (r) => r.body.includes('health-status'),
        }) || errors.add(1);
      });
    }
    
    // Check API endpoints
    if (__ENV.CHECK_API === 'true') {
      group('API endpoints', function () {
        const apiHealthResponse = http.get(`${baseUrl}/api/health`, requestOptions);
        
        // Check response
        check(apiHealthResponse, {
          'API health status is 200': (r) => r.status === 200,
          'API returns JSON': (r) => r.headers['Content-Type'].includes('application/json'),
        }) || errors.add(1);
        
        // Get self-healing status
        const selfHealingResponse = http.get(`${baseUrl}/api/self-healing`, requestOptions);
        
        // Check response
        check(selfHealingResponse, {
          'Self-healing API status is 200': (r) => r.status === 200,
          'Self-healing API returns JSON': (r) => r.headers['Content-Type'].includes('application/json'),
        }) || errors.add(1);
        
        sleep(1);
      });
    }
  });
}

// Helper function to get random integer between min and max (inclusive)
function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// This setup code runs once before the test
export function setup() {
  console.log(`Starting load test in ${environment} environment`);
  console.log(`Base URL: ${env.baseUrl}`);
  
  // Verify environment is responsive before starting
  const checkResponse = http.get(`${env.baseUrl}/health-check.html`);
  if (checkResponse.status !== 200) {
    console.error(`Environment check failed. Status: ${checkResponse.status}`);
  } else {
    console.log('Environment is responsive, starting test');
  }
  
  return { startTime: new Date().toISOString() };
}

// This teardown code runs once after the test
export function teardown(data) {
  const endTime = new Date().toISOString();
  console.log(`Test completed. Started: ${data.startTime}, Ended: ${endTime}`);
}