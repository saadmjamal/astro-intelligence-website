/**
 * EMERGENCY SERVICE WORKER CLEANUP SCRIPT
 * Copy and paste these commands in browser console for immediate fixes
 */

// ==== IMMEDIATE CONSOLE COMMANDS ====

// 1. UNREGISTER ALL SERVICE WORKERS
navigator.serviceWorker.getRegistrations().then(function(registrations) {
    console.log('🔍 Found', registrations.length, 'service worker registrations');
    for(let registration of registrations) {
        console.log('🗑️ Unregistering SW:', registration.scope);
        registration.unregister().then(() => {
            console.log('✅ Successfully unregistered SW:', registration.scope);
        }).catch(err => {
            console.error('❌ Failed to unregister SW:', registration.scope, err);
        });
    }
    if (registrations.length === 0) {
        console.log('✅ No service workers found to unregister');
    }
});

// 2. CLEAR ALL CACHES
caches.keys().then(function(cacheNames) {
    console.log('🔍 Found', cacheNames.length, 'caches:', cacheNames);
    return Promise.all(
        cacheNames.map(function(cacheName) {
            console.log('🗑️ Deleting cache:', cacheName);
            return caches.delete(cacheName).then(() => {
                console.log('✅ Successfully deleted cache:', cacheName);
            }).catch(err => {
                console.error('❌ Failed to delete cache:', cacheName, err);
            });
        })
    );
}).then(() => {
    console.log('✅ All caches cleared');
}).catch(err => {
    console.error('❌ Error clearing caches:', err);
});

// 3. FORCE RELOAD WITHOUT CACHE
setTimeout(() => {
    console.log('🔄 Force reloading page without cache...');
    location.reload(true);
}, 2000);

// ==== SINGLE COMMAND VERSION ====
console.log('🚨 EMERGENCY SW CLEANUP - Starting...');

(async function emergencyCleanup() {
    try {
        // Clear service workers
        const registrations = await navigator.serviceWorker.getRegistrations();
        console.log('🔍 Found', registrations.length, 'service workers');
        
        for (const registration of registrations) {
            await registration.unregister();
            console.log('✅ Unregistered:', registration.scope);
        }
        
        // Clear caches
        const cacheNames = await caches.keys();
        console.log('🔍 Found', cacheNames.length, 'caches');
        
        for (const cacheName of cacheNames) {
            await caches.delete(cacheName);
            console.log('✅ Deleted cache:', cacheName);
        }
        
        // Clear storage
        localStorage.clear();
        sessionStorage.clear();
        console.log('✅ Cleared local/session storage');
        
        // Clear IndexedDB (basic cleanup)
        if ('indexedDB' in window) {
            console.log('🔍 IndexedDB cleanup available');
        }
        
        console.log('✅ EMERGENCY CLEANUP COMPLETE');
        console.log('🔄 Reloading in 3 seconds...');
        
        setTimeout(() => {
            location.reload(true);
        }, 3000);
        
    } catch (error) {
        console.error('❌ Emergency cleanup failed:', error);
        console.log('🔄 Force reloading anyway...');
        location.reload(true);
    }
})();