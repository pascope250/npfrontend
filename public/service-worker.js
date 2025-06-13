const NOTIFICATION_CACHE = 'notification-cache-v2';

// Basic install event with cache initialization
self.addEventListener('install', (event) => {
  
  event.waitUntil(
    (async () => {
      // Initialize cache
      const cache = await caches.open(NOTIFICATION_CACHE);
      await cache.addAll([]); // Initialize with empty cache
      
      // Force activate immediately
      self.skipWaiting();
      // console.log('Service Worker installed and ready to activate');
    })()
  );
});

// Enhanced activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating');
  
  event.waitUntil(
    (async () => {
      // Take control of all clients immediately
      await clients.claim();
      
      // Clean up old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => name !== NOTIFICATION_CACHE)
          .map(name => caches.delete(name))
      );
      
      console.log('Service Worker activated and controlling clients');
    })()
  );
});

// Enhanced push handler with better storage
self.addEventListener('push', async (event) => {
  const payload = event.data?.json();
  if (!payload) return;

  // Ensure we have required fields
  const completePayload = {
    id: payload.id || `temp-${Date.now()}`,
    title: payload.title || 'New Notification',
    message: payload.message || '',
    url: payload.url || '/',
    timestamp: new Date().toISOString()
  };

  // Store notification in cache
  const cache = await caches.open(NOTIFICATION_CACHE);
  await cache.put(
    `notification-${completePayload.id}`,
    new Response(JSON.stringify(completePayload))
  );

  // Show notification immediately if possible
  event.waitUntil(
    self.registration.showNotification(completePayload.title, {
      body: completePayload.message,
      data: completePayload,
      tag: completePayload.id // Group similar notifications
    })
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const payload = event.notification.data;
  
  // Mark as read when clicked
  event.waitUntil(
    (async () => {
      const clients = await self.clients.matchAll();
      if (clients.length > 0) {
        clients[0].postMessage({
          type: 'NOTIFICATION_CLICKED',
          id: payload.id
        });
        clients[0].focus();
      }
      
      if (payload.url) {
        clients.openWindow(payload.url);
      }
    })()
  );
});

// Enhanced message handling
self.addEventListener('message', async (event) => {
  const cache = await caches.open(NOTIFICATION_CACHE);

  switch (event.data.type) {
    case 'GET_CACHED_NOTIFICATIONS':  // <-- Add this case
      const allRequests = await cache.keys();
      const allNotifications = await Promise.all(
        allRequests.map(async (request) => {
          const response = await cache.match(request);
          return response?.json();
        })
      );

      // Respond via MessageChannel (event.ports[0])
      if (event.ports?.[0]) {
        event.ports[0].postMessage({
          type: 'CACHED_NOTIFICATIONS_RESPONSE',
          notifications: allNotifications.filter(Boolean), // Filter out undefined
        });
      }
      break;

    case 'GET_PENDING_NOTIFICATIONS':
      const pendingRequests = await cache.keys();
      const pendingNotifications = await Promise.all(
        pendingRequests.map(async (request) => {
          const response = await cache.match(request);
          return response?.json();
        })
      );

      event.source.postMessage({
        type: 'PENDING_NOTIFICATIONS',
        notifications: pendingNotifications.filter(n => n && !n.isRead),
      });
      break;

    case 'MARK_NOTIFICATION_READ':
      await cache.delete(`notification-${event.data.id}`);
      break;

    case 'CLEAR_ALL_NOTIFICATIONS':
      const keys = await cache.keys();
      await Promise.all(keys.map(key => cache.delete(key)));
      break;
  }
});