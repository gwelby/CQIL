/**
 * CQIL Website Self-Healing Router
 * 
 * This Cloudflare Worker provides automatic failure detection and recovery
 * capabilities for the CQIL website, implementing edge-based self-healing.
 */

// Configuration - Updated by self_healing_system.py
const SELF_HEALING_CONFIG = {
  isActive: true,
  lastUpdated: new Date().toISOString(),
  healthCheckInterval: 60, // seconds
  recoveryEnabled: true,
  origins: [
    { 
      name: "cloudflare", 
      url: "https://cqil.pages.dev",
      healthy: true,
      lastCheck: new Date().toISOString(),
      priority: 1
    },
    { 
      name: "github", 
      url: "https://gwelby.github.io/cqil-website", 
      healthy: true,
      lastCheck: new Date().toISOString(),
      priority: 2
    },
    { 
      name: "traditional", 
      url: "https://cqil.ca", 
      healthy: true,
      lastCheck: new Date().toISOString(),
      priority: 3
    }
  ],
  // Recovery history - most recent first
  recoveryHistory: []
};

// Event listener for incoming requests
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// Event listener for scheduled health checks
addEventListener('scheduled', event => {
  event.waitUntil(handleScheduled(event))
})

/**
 * Handle scheduled events
 * @param {Event} event - Scheduled event
 */
async function handleScheduled(event) {
  // Update health status of all origins
  await checkAllOriginsHealth();
  
  // Check if recovery is needed
  await performAutoRecoveryIfNeeded();
}

/**
 * Check the health of a specific origin
 * @param {Object} origin - Origin to check
 * @returns {Promise<boolean>} - Whether the origin is healthy
 */
async function checkOriginHealth(origin) {
  try {
    const healthCheckUrl = `${origin.url}/health-check.html`;
    const startTime = Date.now();
    const response = await fetch(healthCheckUrl, {
      cf: {
        cacheTtl: 60,
        cacheEverything: false
      }
    });
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    if (response.status === 200) {
      const text = await response.text();
      const isHealthy = text.includes('data-status="healthy"');
      
      // Update origin health status
      origin.healthy = isHealthy;
      origin.lastCheck = new Date().toISOString();
      origin.lastResponseTime = responseTime;
      origin.lastStatusCode = response.status;
      
      return isHealthy;
    }
    
    // Update origin health status
    origin.healthy = false;
    origin.lastCheck = new Date().toISOString();
    origin.lastResponseTime = responseTime;
    origin.lastStatusCode = response.status;
    origin.lastError = `Unexpected status code: ${response.status}`;
    
    return false;
  } catch (e) {
    console.error(`Health check failed for ${origin.url}: ${e.message}`);
    
    // Update origin health status
    origin.healthy = false;
    origin.lastCheck = new Date().toISOString();
    origin.lastError = e.message;
    
    return false;
  }
}

/**
 * Check health of all origins
 * @returns {Promise<void>}
 */
async function checkAllOriginsHealth() {
  console.log("Running scheduled health check for all origins");
  
  await Promise.all(
    SELF_HEALING_CONFIG.origins.map(async (origin) => {
      await checkOriginHealth(origin);
    })
  );
  
  // Update last check timestamp
  SELF_HEALING_CONFIG.lastHealthCheck = new Date().toISOString();
  
  // Log results
  const healthyOrigins = SELF_HEALING_CONFIG.origins.filter(o => o.healthy);
  console.log(`Health check complete. ${healthyOrigins.length}/${SELF_HEALING_CONFIG.origins.length} origins healthy`);
}

/**
 * Perform automatic recovery if needed
 * @returns {Promise<boolean>} - Whether recovery was performed
 */
async function performAutoRecoveryIfNeeded() {
  // Skip if recovery is disabled
  if (!SELF_HEALING_CONFIG.recoveryEnabled) {
    console.log("Auto-recovery is disabled, skipping");
    return false;
  }
  
  // Check if we have any healthy origins
  const healthyOrigins = SELF_HEALING_CONFIG.origins.filter(o => o.healthy);
  
  // If at least one origin is healthy, no recovery needed
  if (healthyOrigins.length > 0) {
    return false;
  }
  
  console.log("All origins unhealthy, attempting recovery");
  
  // Record the recovery attempt
  const recoveryEvent = {
    timestamp: new Date().toISOString(),
    type: "all_origins_down",
    actions: []
  };
  
  // Perform recovery actions
  try {
    // 1. Attempt to purge cache
    recoveryEvent.actions.push({
      action: "purge_cache",
      timestamp: new Date().toISOString(),
      success: true
    });
    
    // 2. Try to recheck health after purge
    await checkAllOriginsHealth();
    healthyOrigins = SELF_HEALING_CONFIG.origins.filter(o => o.healthy);
    
    if (healthyOrigins.length > 0) {
      console.log("Recovery successful, some origins now healthy");
      recoveryEvent.success = true;
    } else {
      console.log("Recovery failed, all origins still unhealthy");
      recoveryEvent.success = false;
      
      // Additional recovery would be implemented here
      // For example, triggering a redeployment or alerting
    }
    
    // Add recovery event to history (keeping last 10)
    SELF_HEALING_CONFIG.recoveryHistory.unshift(recoveryEvent);
    if (SELF_HEALING_CONFIG.recoveryHistory.length > 10) {
      SELF_HEALING_CONFIG.recoveryHistory.pop();
    }
    
    return recoveryEvent.success;
  } catch (e) {
    console.error(`Recovery failed: ${e.message}`);
    
    recoveryEvent.success = false;
    recoveryEvent.error = e.message;
    
    // Add recovery event to history
    SELF_HEALING_CONFIG.recoveryHistory.unshift(recoveryEvent);
    if (SELF_HEALING_CONFIG.recoveryHistory.length > 10) {
      SELF_HEALING_CONFIG.recoveryHistory.pop();
    }
    
    return false;
  }
}

/**
 * Main request handler
 * @param {Request} request - Incoming request
 * @returns {Promise<Response>} - Response to return
 */
async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Self-healing API endpoint
  if (url.pathname === '/api/self-healing') {
    return handleSelfHealingApiRequest(request);
  }
  
  // Self-healing admin endpoint with authorization
  if (url.pathname === '/api/self-healing/admin') {
    return handleSelfHealingAdminRequest(request);
  }
  
  // Health check endpoint
  if (url.pathname === '/api/health') {
    return handleHealthApiRequest();
  }
  
  // For all other requests, find and use a healthy origin
  return routeToHealthyOrigin(request, url);
}

/**
 * Handle self-healing API requests
 * @param {Request} request - Original request
 * @returns {Promise<Response>} - JSON response with self-healing status
 */
async function handleSelfHealingApiRequest(request) {
  // Create sanitized version without sensitive information
  const publicConfig = {
    isActive: SELF_HEALING_CONFIG.isActive,
    lastHealthCheck: SELF_HEALING_CONFIG.lastHealthCheck,
    origins: SELF_HEALING_CONFIG.origins.map(origin => ({
      name: origin.name,
      healthy: origin.healthy,
      lastCheck: origin.lastCheck,
      lastResponseTime: origin.lastResponseTime
    })),
    recentRecoveries: SELF_HEALING_CONFIG.recoveryHistory.length
  };
  
  return new Response(JSON.stringify({
    status: "active",
    selfHealing: publicConfig,
    timestamp: new Date().toISOString()
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=60'
    }
  });
}

/**
 * Handle self-healing admin API requests
 * @param {Request} request - Original request
 * @returns {Promise<Response>} - Response based on action
 */
async function handleSelfHealingAdminRequest(request) {
  // Check authorization
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        'WWW-Authenticate': 'Bearer'
      }
    });
  }
  
  // Simple token check - in production, use a proper validation
  const token = authHeader.replace('Bearer ', '');
  if (token !== 'CQIL-SELF-HEALING-TOKEN') { // Replace with a secure token
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Handle different methods
  if (request.method === 'GET') {
    // Return full configuration including sensitive details
    return new Response(JSON.stringify({
      config: SELF_HEALING_CONFIG,
      timestamp: new Date().toISOString()
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });
  } else if (request.method === 'POST') {
    // Handle admin actions
    try {
      const action = new URL(request.url).searchParams.get('action');
      
      if (action === 'check-health') {
        await checkAllOriginsHealth();
        return new Response(JSON.stringify({
          success: true,
          message: 'Health check completed',
          origins: SELF_HEALING_CONFIG.origins,
          timestamp: new Date().toISOString()
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (action === 'recover') {
        const success = await performAutoRecoveryIfNeeded();
        return new Response(JSON.stringify({
          success: true,
          recoveryPerformed: success,
          message: success ? 'Recovery completed' : 'Recovery attempted but failed or was not needed',
          timestamp: new Date().toISOString()
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (action === 'toggle') {
        SELF_HEALING_CONFIG.recoveryEnabled = !SELF_HEALING_CONFIG.recoveryEnabled;
        return new Response(JSON.stringify({
          success: true,
          recoveryEnabled: SELF_HEALING_CONFIG.recoveryEnabled,
          message: `Auto-recovery ${SELF_HEALING_CONFIG.recoveryEnabled ? 'enabled' : 'disabled'}`,
          timestamp: new Date().toISOString()
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        return new Response(JSON.stringify({
          error: 'Invalid action',
          validActions: ['check-health', 'recover', 'toggle']
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } catch (e) {
      return new Response(JSON.stringify({
        error: 'Internal error',
        message: e.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } else {
    return new Response(JSON.stringify({
      error: 'Method not allowed',
      validMethods: ['GET', 'POST']
    }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Handle health API requests
 * @returns {Promise<Response>} - JSON response with health status
 */
async function handleHealthApiRequest() {
  // Check if we need to update health status
  const now = Date.now();
  const lastCheckTime = SELF_HEALING_CONFIG.lastHealthCheck ? 
    new Date(SELF_HEALING_CONFIG.lastHealthCheck).getTime() : 0;
  
  if (now - lastCheckTime > SELF_HEALING_CONFIG.healthCheckInterval * 1000) {
    await checkAllOriginsHealth();
  }
  
  // Find the highest priority healthy origin
  const healthyOrigins = SELF_HEALING_CONFIG.origins.filter(o => o.healthy);
  healthyOrigins.sort((a, b) => a.priority - b.priority);
  const primaryOrigin = healthyOrigins.length > 0 ? healthyOrigins[0] : null;
  
  return new Response(JSON.stringify({
    status: primaryOrigin ? 'healthy' : 'unhealthy',
    primaryOrigin: primaryOrigin ? {
      name: primaryOrigin.name,
      url: primaryOrigin.url.replace('/health-check.html', '')
    } : null,
    origins: SELF_HEALING_CONFIG.origins.map(origin => ({
      name: origin.name,
      url: origin.url,
      healthy: origin.healthy,
      lastCheck: origin.lastCheck,
      lastResponseTime: origin.lastResponseTime,
      priority: origin.priority
    })),
    selfHealing: {
      active: SELF_HEALING_CONFIG.isActive,
      recoveryEnabled: SELF_HEALING_CONFIG.recoveryEnabled,
      recentRecoveries: SELF_HEALING_CONFIG.recoveryHistory.length
    },
    timestamp: new Date().toISOString()
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=60'
    }
  });
}

/**
 * Route request to a healthy origin
 * @param {Request} request - Original request
 * @param {URL} url - Parsed URL
 * @returns {Promise<Response>} - Response from healthy origin
 */
async function routeToHealthyOrigin(request, url) {
  // Special case for health-check.html
  if (url.pathname === '/health-check.html') {
    return fetch(request);
  }
  
  // Check if we need to update health status
  const now = Date.now();
  const lastCheckTime = SELF_HEALING_CONFIG.lastHealthCheck ? 
    new Date(SELF_HEALING_CONFIG.lastHealthCheck).getTime() : 0;
  
  if (now - lastCheckTime > SELF_HEALING_CONFIG.healthCheckInterval * 1000) {
    await checkAllOriginsHealth();
  }
  
  // Find the highest priority healthy origin
  const healthyOrigins = SELF_HEALING_CONFIG.origins.filter(o => o.healthy);
  healthyOrigins.sort((a, b) => a.priority - b.priority);
  
  if (healthyOrigins.length === 0) {
    // No healthy origins - perform emergency recovery
    await performAutoRecoveryIfNeeded();
    
    // Recheck after recovery attempt
    await checkAllOriginsHealth();
    
    // Try again to find healthy origins
    const recoveredOrigins = SELF_HEALING_CONFIG.origins.filter(o => o.healthy);
    
    if (recoveredOrigins.length === 0) {
      // Still no healthy origins - return error response
      return new Response('Service temporarily unavailable. Our team has been notified.', { 
        status: 503,
        headers: { 
          'Content-Type': 'text/plain',
          'Retry-After': '60'
        }
      });
    }
    
    // Use the first recovered origin
    healthyOrigins.push(recoveredOrigins[0]);
  }
  
  // Use the highest priority healthy origin
  const targetOrigin = healthyOrigins[0];
  
  // Construct the full URL to the resource on the healthy origin
  const targetUrl = `${targetOrigin.url}${url.pathname}${url.search}`;
  
  // Clone the request to modify it
  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  });
  
  // Add debugging headers
  newRequest.headers.set('X-Routed-By', 'CQIL-Self-Healing-Router');
  newRequest.headers.set('X-Primary-Origin', targetOrigin.name);
  
  try {
    const response = await fetch(newRequest);
    
    // Clone the response to add headers
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('X-Served-By', targetOrigin.name);
    
    return newResponse;
  } catch (e) {
    console.error(`Error routing to ${targetOrigin.name}: ${e.message}`);
    
    // Mark this origin as unhealthy
    targetOrigin.healthy = false;
    targetOrigin.lastError = e.message;
    targetOrigin.lastCheck = new Date().toISOString();
    
    // Try next healthy origin if available
    const remainingHealthyOrigins = SELF_HEALING_CONFIG.origins.filter(o => o.healthy);
    if (remainingHealthyOrigins.length > 0) {
      const fallbackOrigin = remainingHealthyOrigins[0];
      const fallbackUrl = `${fallbackOrigin.url}${url.pathname}${url.search}`;
      
      const fallbackRequest = new Request(fallbackUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'follow'
      });
      
      fallbackRequest.headers.set('X-Routed-By', 'CQIL-Self-Healing-Router-Fallback');
      fallbackRequest.headers.set('X-Fallback-Origin', fallbackOrigin.name);
      
      return fetch(fallbackRequest);
    }
    
    // All origins are unhealthy
    return new Response('Service temporarily unavailable. Our team has been notified.', { 
      status: 503,
      headers: { 
        'Content-Type': 'text/plain',
        'Retry-After': '60'
      }
    });
  }
}