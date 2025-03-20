/**
 * CQIL Website Canary Release Router
 * 
 * This Cloudflare Worker routes a percentage of traffic to the canary version
 * of the website, allowing for gradual rollout of new versions.
 */

// Current canary settings - Updated by canary_deploy.py
const CANARY_CONFIG = {
  isActive: false,
  percentage: 0,
  version: "none",
  startTime: "",
  canaryOrigins: [
    { name: "cloudflare", url: "https://canary.cqil.pages.dev" },
    { name: "github", url: "https://gwelby.github.io/cqil-website-canary" },
    { name: "traditional", url: "https://canary.cqil.ca" }
  ],
  stableOrigins: [
    { name: "cloudflare", url: "https://cqil.pages.dev" },
    { name: "github", url: "https://gwelby.github.io/cqil-website" },
    { name: "traditional", url: "https://cqil.ca" }
  ]
};

// Event listener for incoming requests
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Determine if the request should go to canary
 * @param {Request} request - Incoming request
 * @returns {boolean} - Whether to route to canary
 */
function shouldRouteToCanary(request) {
  if (!CANARY_CONFIG.isActive || CANARY_CONFIG.percentage <= 0) {
    return false;
  }
  
  // Always route to canary if the cookie is set
  const cookie = request.headers.get('cookie') || '';
  if (cookie.includes('canary=true')) {
    return true;
  }
  
  // Always route to stable if the cookie is explicitly set to false
  if (cookie.includes('canary=false')) {
    return false;
  }

  // Check if user is in the canary percentage
  const clientIP = request.headers.get('cf-connecting-ip') || '';
  const userAgent = request.headers.get('user-agent') || '';
  
  // Create a deterministic but random-seeming value from the IP and user agent
  const combinedString = clientIP + userAgent + CANARY_CONFIG.version;
  
  // Generate a hash of the string and take modulo 100
  // Simple hash for demonstration
  let hash = 0;
  for (let i = 0; i < combinedString.length; i++) {
    hash = ((hash << 5) - hash) + combinedString.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  const value = Math.abs(hash % 100);
  
  // If value is less than the percentage, route to canary
  return value < CANARY_CONFIG.percentage;
}

/**
 * Check the health of a specific origin
 * @param {string} url - URL to health check endpoint
 * @returns {Promise<boolean>} - Whether the origin is healthy
 */
async function checkOriginHealth(url) {
  try {
    const healthCheckUrl = `${url}/health-check.html`;
    const response = await fetch(healthCheckUrl, {
      cf: {
        cacheTtl: 60,
        cacheEverything: false
      }
    });
    
    if (response.status === 200) {
      const text = await response.text();
      return text.includes('data-status="healthy"');
    }
    return false;
  } catch (e) {
    console.error(`Health check failed for ${url}: ${e.message}`);
    return false;
  }
}

/**
 * Get healthy origins for a group (canary or stable)
 * @param {Array} origins - List of origins to check
 * @returns {Promise<Array>} - List of healthy origins
 */
async function getHealthyOrigins(origins) {
  const results = await Promise.all(
    origins.map(async (origin) => {
      const healthy = await checkOriginHealth(origin.url);
      return {
        ...origin,
        healthy
      };
    })
  );
  
  return results.filter(origin => origin.healthy);
}

/**
 * Main request handler
 * @param {Request} request - Incoming request
 * @returns {Promise<Response>} - Response to return
 */
async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Handle canary API endpoint
  if (url.pathname === '/api/canary') {
    return handleCanaryApiRequest();
  }
  
  // Set canary cookie if requested
  if (url.pathname === '/set-canary') {
    const params = url.searchParams;
    const enabled = params.get('enabled') === 'true';
    return handleSetCanaryRequest(request, enabled);
  }
  
  // Determine if this request should go to canary
  const useCanary = shouldRouteToCanary(request);
  
  // Get healthy origins for the selected environment
  const targetOrigins = useCanary ? 
    CANARY_CONFIG.canaryOrigins : 
    CANARY_CONFIG.stableOrigins;
  
  const healthyOrigins = await getHealthyOrigins(targetOrigins);
  
  // If no healthy origins in the selected environment, fallback to the other
  if (healthyOrigins.length === 0) {
    console.log(`No healthy origins found for ${useCanary ? 'canary' : 'stable'}, trying fallback`);
    const fallbackOrigins = useCanary ? 
      CANARY_CONFIG.stableOrigins : 
      CANARY_CONFIG.canaryOrigins;
    
    const fallbackHealthyOrigins = await getHealthyOrigins(fallbackOrigins);
    
    if (fallbackHealthyOrigins.length === 0) {
      // Both environments are unhealthy, return error
      return new Response('Service temporarily unavailable. Our team has been notified.', { 
        status: 503,
        headers: { 
          'Content-Type': 'text/plain',
          'Retry-After': '60'
        }
      });
    }
    
    // Use the fallback healthy origin
    const targetOrigin = fallbackHealthyOrigins[0];
    return routeToOrigin(request, url, targetOrigin, !useCanary);
  }
  
  // Use a healthy origin from the selected environment
  const targetOrigin = healthyOrigins[0];
  return routeToOrigin(request, url, targetOrigin, useCanary);
}

/**
 * Route request to a specific origin
 * @param {Request} request - Original request
 * @param {URL} url - Parsed URL
 * @param {Object} origin - Target origin
 * @param {boolean} isCanary - Whether this is a canary origin
 * @returns {Promise<Response>} - Response from origin
 */
async function routeToOrigin(request, url, origin, isCanary) {
  // Construct the full URL to the resource on the target origin
  const targetUrl = `${origin.url}${url.pathname}${url.search}`;
  
  // Clone the request to modify it
  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  });
  
  // Add debugging headers
  newRequest.headers.set('X-Routed-By', 'CQIL-Canary-Router');
  newRequest.headers.set('X-Environment', isCanary ? 'canary' : 'stable');
  newRequest.headers.set('X-Origin', origin.name);
  
  const response = await fetch(newRequest);
  
  // Clone the response to add headers
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('X-Served-By', origin.name);
  newResponse.headers.set('X-Environment', isCanary ? 'canary' : 'stable');
  
  return newResponse;
}

/**
 * Handle canary API request
 * @returns {Promise<Response>} - Canary status response
 */
async function handleCanaryApiRequest() {
  // Check health of all origins
  const canaryOrigins = await Promise.all(
    CANARY_CONFIG.canaryOrigins.map(async (origin) => {
      const healthy = await checkOriginHealth(origin.url);
      return {
        name: origin.name,
        url: origin.url,
        healthy
      };
    })
  );
  
  const stableOrigins = await Promise.all(
    CANARY_CONFIG.stableOrigins.map(async (origin) => {
      const healthy = await checkOriginHealth(origin.url);
      return {
        name: origin.name,
        url: origin.url,
        healthy
      };
    })
  );
  
  return new Response(JSON.stringify({
    canary: {
      active: CANARY_CONFIG.isActive,
      percentage: CANARY_CONFIG.percentage,
      version: CANARY_CONFIG.version,
      startTime: CANARY_CONFIG.startTime,
      origins: canaryOrigins
    },
    stable: {
      origins: stableOrigins
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
 * Handle setting the canary cookie
 * @param {Request} request - Original request
 * @param {boolean} enabled - Whether to enable canary
 * @returns {Promise<Response>} - Response with cookie set
 */
async function handleSetCanaryRequest(request, enabled) {
  // Get the referrer or default to the root
  const referrer = request.headers.get('referer') || '/';
  
  // Create response that redirects back to the referrer
  const response = new Response(null, {
    status: 302,
    headers: {
      'Location': referrer,
      'Set-Cookie': `canary=${enabled ? 'true' : 'false'}; path=/; max-age=86400; Secure;`,
      'Cache-Control': 'no-store'
    }
  });
  
  return response;
}