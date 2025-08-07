/**
 * EMERGENCY SERVICE WORKER UNREGISTRATION SCRIPT
 * This script removes ALL service workers and clears ALL caches
 * Run this immediately to clear the wrong site cache
 */

(async function emergencyServiceWorkerCleanup() {
  console.log('🚨 EMERGENCY SERVICE WORKER CLEANUP INITIATED');
  
  if ('serviceWorker' in navigator) {
    try {
      // Get all service worker registrations
      const registrations = await navigator.serviceWorker.getRegistrations();
      console.log(`Found ${registrations.length} service worker registrations`);
      
      // Unregister all service workers
      for (const registration of registrations) {
        console.log('Unregistering service worker:', registration.scope);
        await registration.unregister();
        console.log('✅ Service worker unregistered:', registration.scope);
      }
      
      // Clear all caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        console.log(`Found ${cacheNames.length} caches to clear`);
        
        for (const cacheName of cacheNames) {
          console.log('Deleting cache:', cacheName);
          await caches.delete(cacheName);
          console.log('✅ Cache deleted:', cacheName);
        }
      }
      
      console.log('🎉 ALL SERVICE WORKERS AND CACHES CLEARED');
      console.log('Please hard refresh the page (Ctrl+Shift+R / Cmd+Shift+R)');
      
    } catch (error) {
      console.error('❌ Error during cleanup:', error);
    }
  } else {
    console.log('Service workers not supported in this browser');
  }
})();