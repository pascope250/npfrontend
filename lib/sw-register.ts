// lib/sw-register.ts
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  // Only register in production and if supported
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
        type: 'classic' // Explicitly set to classic if not using modules
      });

      // Wait for the service worker to be ready
      await navigator.serviceWorker.ready;
      
      console.log('ServiceWorker registration successful with scope:', registration.scope);
      return registration;
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
      return null;
    }
  }
  return null;
}