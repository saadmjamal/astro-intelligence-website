// Astro Intelligence Mobile Service Worker
// Enhanced PWA functionality with offline support and performance optimization

const CACHE_NAME = 'astro-intelligence-v1.2.0';
const OFFLINE_URL = '/offline.html';

// Critical resources to cache for offline functionality
const CORE_CACHE_RESOURCES = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/app/globals.css',
  '/app/mobile-accessibility.css',
  // Core pages
  '/about',
  '/portfolio', 
  '/lab',
  '/contact',
  '/services',
  // Mobile optimized pages
  '/about/mobile-optimized',
  '/portfolio/mobile-optimized',
  '/lab/mobile-optimized',
  // API endpoints
  '/api/analytics',
  '/api/contact'
];

// Network-first cache strategy for dynamic content
const NETWORK_FIRST_ROUTES = [
  '/api/',
  '/lab/research/',
  '/portfolio/case-study/'
];

// Cache-first strategy for static assets
const CACHE_FIRST_ROUTES = [
  '/icons/',
  '/images/', 
  '/screenshots/',
  '/_next/static/',
  '/favicon'
];

// Install event - cache core resources
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...');
  
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        console.log('[ServiceWorker] Caching core resources');
        await cache.addAll(CORE_CACHE_RESOURCES);
        
        // Skip waiting to activate immediately
        await self.skipWaiting();
      } catch (error) {
        console.error('[ServiceWorker] Install failed:', error);
      }
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating...');
  
  event.waitUntil(
    (async () => {
      try {
        // Clean up old caches
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
        
        // Take control of all clients immediately
        await self.clients.claim();
      } catch (error) {
        console.error('[ServiceWorker] Activation failed:', error);
      }
    })()
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  const requestURL = new URL(event.request.url);
  
  // Handle offline page specially
  if (requestURL.pathname === OFFLINE_URL) {
    event.respondWith(caches.match(OFFLINE_URL));
    return;
  }
  
  // Network-first strategy for dynamic content
  if (NETWORK_FIRST_ROUTES.some(route => requestURL.pathname.startsWith(route))) {
    event.respondWith(networkFirstStrategy(event.request));
    return;
  }
  
  // Cache-first strategy for static assets
  if (CACHE_FIRST_ROUTES.some(route => requestURL.pathname.startsWith(route))) {
    event.respondWith(cacheFirstStrategy(event.request));
    return;
  }
  
  // Default: Stale-while-revalidate for pages
  event.respondWith(staleWhileRevalidateStrategy(event.request));
});

// Network-first strategy with fallback
async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request);
    
    // Cache successful responses
    if (response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[ServiceWorker] Network failed, trying cache:', request.url);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_URL);
    }
    
    throw error;
  }
}

// Cache-first strategy with network fallback
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const response = await fetch(request);
    
    if (response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('[ServiceWorker] Cache-first failed:', error);
    throw error;
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  // Fetch from network in background
  const fetchPromise = fetch(request).then(response => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(error => {
    console.log('[ServiceWorker] Background fetch failed:', error);
  });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Wait for network if no cache
  try {
    return await fetchPromise;
  } catch (error) {
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_URL);
    }
    throw error;
  }
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForms());
  }
  
  if (event.tag === 'analytics') {
    event.waitUntil(syncAnalytics());
  }
});

// Sync contact form submissions
async function syncContactForms() {
  try {
    const cache = await caches.open(CACHE_NAME + '-data');
    const requests = await cache.keys();
    
    for (const request of requests) {
      if (request.url.includes('contact-form-sync')) {
        const formData = await cache.match(request);
        if (formData) {
          try {
            await fetch('/api/contact', {
              method: 'POST',
              body: await formData.json()
            });
            await cache.delete(request);
          } catch (error) {
            console.log('[ServiceWorker] Contact form sync failed, will retry');
          }
        }
      }
    }
  } catch (error) {
    console.error('[ServiceWorker] Contact form sync error:', error);
  }
}

// Sync analytics data
async function syncAnalytics() {
  try {
    const cache = await caches.open(CACHE_NAME + '-data');
    const requests = await cache.keys();
    
    for (const request of requests) {
      if (request.url.includes('analytics-sync')) {
        const analyticsData = await cache.match(request);
        if (analyticsData) {
          try {
            await fetch('/api/analytics', {
              method: 'POST',
              body: await analyticsData.json()
            });
            await cache.delete(request);
          } catch (error) {
            console.log('[ServiceWorker] Analytics sync failed, will retry');
          }
        }
      }
    }
  } catch (error) {
    console.error('[ServiceWorker] Analytics sync error:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: 'New AI research updates available',
    icon: '/favicon-192x192.png',
    badge: '/favicon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 'astro-ai-update'
    },
    actions: [
      {
        action: 'explore',
        title: 'View Updates',
        icon: '/icons/explore-96x96.png'
      },
      {
        action: 'close',
        title: 'Dismiss',
        icon: '/icons/close-96x96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Astro Intelligence', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/lab')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open main page
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Error handling
self.addEventListener('error', (event) => {
  console.error('[ServiceWorker] Error:', event.error);
});

// Unhandled rejection handling
self.addEventListener('unhandledrejection', (event) => {
  console.error('[ServiceWorker] Unhandled rejection:', event.reason);
});

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PERFORMANCE_MARK') {
    console.log('[ServiceWorker] Performance mark:', event.data.mark);
  }
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[ServiceWorker] Service Worker registered successfully');