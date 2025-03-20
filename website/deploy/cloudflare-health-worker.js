/**
 * CQIL Website Zero-Downtime Health Router
 * 
 * This Cloudflare Worker provides intelligent routing between multiple platforms
 * based on health checks. It acts as a lightweight load balancer without requiring
 * the Enterprise plan.
 */

// Event listener for incoming requests
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Check the health of a specific origin
 * @param {string} url - URL to health check endpoint
 * @returns {Promise<boolean>} - Whether the origin is healthy
 */
async function checkOriginHealth(url) {
  try {
    const response = await fetch(url, {
      cf: {
        cacheTtl: 60,
        cacheEverything: false
      }
    })
    
    if (response.status === 200) {
      const text = await response.text()
      return text.includes('data-status="healthy"')
    }
    return false
  } catch (e) {
    console.error(`Health check failed for ${url}: ${e.message}`)
    return false
  }
}

/**
 * Main request handler
 * @param {Request} request - Incoming request
 * @returns {Promise<Response>} - Response to return
 */
async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Health check endpoint
  if (url.pathname === '/api/health') {
    return handleHealthCheckRequest()
  }
  
  // For all other requests, route based on health status
  return routeBasedOnHealth(request, url)
}

/**
 * Handle health check API requests
 * @returns {Promise<Response>} - Health check response
 */
async function handleHealthCheckRequest() {
  const origins = [
    {
      name: 'github',
      url: 'https://gwelby.github.io/cqil-website/health-check.html',
      priority: 2
    },
    {
      name: 'cloudflare',
      url: 'https://cqil.pages.dev/health-check.html',
      priority: 1
    },
    {
      name: 'traditional',
      url: 'https://cqil.ca/health-check.html',
      priority: 3
    }
  ]
  
  const results = await Promise.all(
    origins.map(async (origin) => {
      const healthy = await checkOriginHealth(origin.url)
      return {
        name: origin.name,
        url: origin.url,
        healthy,
        priority: origin.priority,
        timestamp: new Date().toISOString()
      }
    })
  )
  
  // Find the highest priority healthy origin
  const healthyOrigins = results.filter(r => r.healthy)
  healthyOrigins.sort((a, b) => a.priority - b.priority)
  const primaryOrigin = healthyOrigins.length > 0 ? healthyOrigins[0] : null
  
  return new Response(JSON.stringify({
    status: primaryOrigin ? 'healthy' : 'unhealthy',
    primaryOrigin: primaryOrigin ? {
      name: primaryOrigin.name,
      url: primaryOrigin.url.replace('/health-check.html', '')
    } : null,
    origins: results,
    timestamp: new Date().toISOString()
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=60'
    }
  })
}

/**
 * Route requests based on health status
 * @param {Request} request - Original request
 * @param {URL} url - Parsed URL
 * @returns {Promise<Response>} - Response from healthy origin
 */
async function routeBasedOnHealth(request, url) {
  // Special case for health-check.html
  if (url.pathname === '/health-check.html') {
    return fetch(request)
  }
  
  // Check current health status
  const healthCheck = await fetch(`${url.origin}/api/health`, {
    cf: {
      cacheTtl: 60
    }
  })
  
  if (!healthCheck.ok) {
    return new Response('Health check service unavailable', { 
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
  
  const healthData = await healthCheck.json()
  
  if (healthData.primaryOrigin) {
    // Construct the full URL to the resource on the healthy origin
    const targetUrl = `${healthData.primaryOrigin.url}${url.pathname}${url.search}`
    
    // Clone the request to modify it
    const newRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow'
    })
    
    // Add debugging header
    newRequest.headers.set('X-Routed-By', 'CQIL-Health-Router')
    newRequest.headers.set('X-Primary-Origin', healthData.primaryOrigin.name)
    
    return fetch(newRequest)
  }
  
  // Fallback - all origins are unhealthy
  return new Response('Service temporarily unavailable. Our team has been notified.', { 
    status: 503,
    headers: { 
      'Content-Type': 'text/plain',
      'Retry-After': '60'
    }
  })
}