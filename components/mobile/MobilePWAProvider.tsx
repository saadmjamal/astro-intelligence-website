'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Progressive Web App Provider for Mobile
interface PWAContextType {
  // Installation
  isInstallable: boolean;
  isInstalled: boolean;
  promptInstall: () => void;
  
  // Offline support
  isOnline: boolean;
  offlineCapable: boolean;
  
  // Push notifications
  notificationsEnabled: boolean;
  requestNotifications: () => Promise<boolean>;
  
  // App updates
  updateAvailable: boolean;
  updateApp: () => void;
  
  // Performance monitoring
  networkSpeed: 'slow' | 'medium' | 'fast';
  batteryLevel: number | null;
  memoryUsage: number | null;
  
  // Data saver mode
  dataSaverMode: boolean;
  toggleDataSaver: () => void;
  
  // Background sync
  backgroundSyncEnabled: boolean;
  enableBackgroundSync: () => void;
}

const PWAContext = createContext<PWAContextType | null>(null);

export function MobilePWAProvider({ children }: { children: React.ReactNode }) {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [networkSpeed, setNetworkSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null);
  const [dataSaverMode, setDataSaverMode] = useState(false);
  const [backgroundSyncEnabled, setBackgroundSyncEnabled] = useState(false);

  // Initialize PWA features
  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone || 
        document.referrer.includes('android-app://')) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Monitor network speed
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const updateNetworkSpeed = () => {
        const effectiveType = connection.effectiveType;
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          setNetworkSpeed('slow');
        } else if (effectiveType === '3g') {
          setNetworkSpeed('medium');
        } else {
          setNetworkSpeed('fast');
        }
      };

      updateNetworkSpeed();
      connection.addEventListener('change', updateNetworkSpeed);

      return () => {
        connection.removeEventListener('change', updateNetworkSpeed);
      };
    }
  }, []);

  // Monitor battery level
  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => setBatteryLevel(Math.round(battery.level * 100));
        updateBattery();
        
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);

        return () => {
          battery.removeEventListener('levelchange', updateBattery);
          battery.removeEventListener('chargingchange', updateBattery);
        };
      });
    }
  }, []);

  // Monitor memory usage
  useEffect(() => {
    if ('memory' in performance) {
      const updateMemoryUsage = () => {
        const memoryInfo = (performance as any).memory;
        const usagePercentage = (memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100;
        setMemoryUsage(Math.round(usagePercentage));
      };

      updateMemoryUsage();
      const interval = setInterval(updateMemoryUsage, 10000); // Update every 10 seconds

      return () => clearInterval(interval);
    }
  }, []);

  // Check for app updates
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
              }
            });
          }
        });
      });
    }
  }, []);

  // Load saved preferences
  useEffect(() => {
    try {
      const savedPrefs = localStorage.getItem('mobile-pwa-prefs');
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        setDataSaverMode(prefs.dataSaverMode || false);
        setBackgroundSyncEnabled(prefs.backgroundSyncEnabled || false);
      }

      // Check notification permission
      if ('Notification' in window) {
        setNotificationsEnabled(Notification.permission === 'granted');
      }
    } catch (error) {
      console.warn('Failed to load PWA preferences:', error);
    }
  }, []);

  // Save preferences
  const savePreferences = useCallback(() => {
    try {
      const prefs = {
        dataSaverMode,
        backgroundSyncEnabled
      };
      localStorage.setItem('mobile-pwa-prefs', JSON.stringify(prefs));
    } catch (error) {
      console.warn('Failed to save PWA preferences:', error);
    }
  }, [dataSaverMode, backgroundSyncEnabled]);

  useEffect(() => {
    savePreferences();
  }, [savePreferences]);

  // Install app
  const promptInstall = useCallback(() => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
        setIsInstallable(false);
      });
    }
  }, [deferredPrompt]);

  // Request notification permission
  const requestNotifications = useCallback(async (): Promise<boolean> => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';
      setNotificationsEnabled(granted);
      
      if (granted) {
        // Register for push notifications
        if ('serviceWorker' in navigator && 'PushManager' in window) {
          try {
            const registration = await navigator.serviceWorker.ready;
            await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: process.env.NEXT_PUBLIC_VAPID_KEY
            });
          } catch (error) {
            console.warn('Failed to subscribe for push notifications:', error);
          }
        }
      }
      
      return granted;
    }
    return false;
  }, []);

  // Update app
  const updateApp = useCallback(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      });
    }
  }, []);

  // Toggle data saver mode
  const toggleDataSaver = useCallback(() => {
    setDataSaverMode(prev => !prev);
    
    // Apply data saver optimizations
    if (!dataSaverMode) {
      // Enable data saving features
      document.documentElement.classList.add('data-saver-mode');
    } else {
      document.documentElement.classList.remove('data-saver-mode');
    }
  }, [dataSaverMode]);

  // Enable background sync
  const enableBackgroundSync = useCallback(() => {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then(registration => {
        return registration.sync.register('background-sync');
      }).then(() => {
        setBackgroundSyncEnabled(true);
      }).catch(error => {
        console.warn('Background sync registration failed:', error);
      });
    }
  }, []);

  const value: PWAContextType = {
    isInstallable,
    isInstalled,
    promptInstall,
    isOnline,
    offlineCapable: true, // Our service worker provides offline support
    notificationsEnabled,
    requestNotifications,
    updateAvailable,
    updateApp,
    networkSpeed,
    batteryLevel,
    memoryUsage,
    dataSaverMode,
    toggleDataSaver,
    backgroundSyncEnabled,
    enableBackgroundSync
  };

  return (
    <PWAContext.Provider value={value}>
      {children}
      <MobilePWAUI />
    </PWAContext.Provider>
  );
}

function MobilePWAUI() {
  const pwa = useContext(PWAContext);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);
  const [showDataSaverPrompt, setShowDataSaverPrompt] = useState(false);

  if (!pwa) return null;

  // Show install prompt
  useEffect(() => {
    if (pwa.isInstallable && !pwa.isInstalled) {
      const hasSeenPrompt = localStorage.getItem('pwa-install-prompt-seen');
      if (!hasSeenPrompt) {
        setTimeout(() => setShowInstallPrompt(true), 3000);
      }
    }
  }, [pwa.isInstallable, pwa.isInstalled]);

  // Show update prompt
  useEffect(() => {
    if (pwa.updateAvailable) {
      setShowUpdatePrompt(true);
    }
  }, [pwa.updateAvailable]);

  // Show offline banner
  useEffect(() => {
    if (!pwa.isOnline) {
      setShowOfflineBanner(true);
    } else {
      setShowOfflineBanner(false);
    }
  }, [pwa.isOnline]);

  // Show data saver prompt on slow network
  useEffect(() => {
    if (pwa.networkSpeed === 'slow' && !pwa.dataSaverMode) {
      const hasSeenPrompt = localStorage.getItem('data-saver-prompt-seen');
      if (!hasSeenPrompt) {
        setTimeout(() => setShowDataSaverPrompt(true), 2000);
      }
    }
  }, [pwa.networkSpeed, pwa.dataSaverMode]);

  const dismissInstallPrompt = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-prompt-seen', 'true');
  };

  const dismissDataSaverPrompt = () => {
    setShowDataSaverPrompt(false);
    localStorage.setItem('data-saver-prompt-seen', 'true');
  };

  return (
    <>
      {/* Offline Banner */}
      <AnimatePresence>
        {showOfflineBanner && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 bg-orange-600 text-white p-3 text-center text-sm font-medium"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            📵 You're offline. Some features may be limited.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Install App Prompt */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            className="fixed bottom-4 left-4 right-4 z-40 bg-gradient-to-r from-tech-green to-magenta p-4 rounded-2xl shadow-2xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between text-black">
              <div className="flex-1">
                <h3 className="font-bold text-lg">Install Astro Intelligence</h3>
                <p className="text-sm opacity-90">Get the full mobile experience with offline access</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={dismissInstallPrompt}
                  className="px-3 py-1 bg-black/20 text-black rounded-lg text-sm mobile-haptic-light"
                >
                  Later
                </button>
                <button
                  onClick={() => {
                    pwa.promptInstall();
                    setShowInstallPrompt(false);
                  }}
                  className="px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold mobile-haptic-medium"
                >
                  Install
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Available Prompt */}
      <AnimatePresence>
        {showUpdatePrompt && (
          <motion.div
            className="fixed bottom-4 left-4 right-4 z-40 bg-blue-600 text-white p-4 rounded-2xl shadow-2xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold">Update Available</h3>
                <p className="text-sm opacity-90">New features and improvements are ready</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => setShowUpdatePrompt(false)}
                  className="px-3 py-1 bg-white/20 text-white rounded-lg text-sm mobile-haptic-light"
                >
                  Later
                </button>
                <button
                  onClick={() => {
                    pwa.updateApp();
                    setShowUpdatePrompt(false);
                  }}
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-semibold mobile-haptic-medium"
                >
                  Update
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Saver Prompt */}
      <AnimatePresence>
        {showDataSaverPrompt && (
          <motion.div
            className="fixed bottom-4 left-4 right-4 z-40 bg-orange-600 text-white p-4 rounded-2xl shadow-2xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold">Slow Network Detected</h3>
                <p className="text-sm opacity-90">Enable data saver mode to improve performance?</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={dismissDataSaverPrompt}
                  className="px-3 py-1 bg-white/20 text-white rounded-lg text-sm mobile-haptic-light"
                >
                  No
                </button>
                <button
                  onClick={() => {
                    pwa.toggleDataSaver();
                    setShowDataSaverPrompt(false);
                  }}
                  className="px-4 py-2 bg-white text-orange-600 rounded-lg text-sm font-semibold mobile-haptic-medium"
                >
                  Enable
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Network Speed Indicator */}
      {pwa.networkSpeed === 'slow' && (
        <div className="fixed top-4 left-4 z-30 bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          🐌 Slow Network
        </div>
      )}

      {/* Battery Level Indicator (when low) */}
      {pwa.batteryLevel !== null && pwa.batteryLevel < 20 && (
        <div className="fixed top-4 right-4 z-30 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          🔋 {pwa.batteryLevel}%
        </div>
      )}

      {/* Data Saver Mode Indicator */}
      {pwa.dataSaverMode && (
        <div className="fixed top-16 left-4 z-30 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          💾 Data Saver
        </div>
      )}
    </>
  );
}

export function usePWA() {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('usePWA must be used within MobilePWAProvider');
  }
  return context;
}