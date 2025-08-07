'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// WCAG 2.1 AA Compliance System for Mobile
interface AccessibilityContextType {
  // Font size controls
  fontSize: 'small' | 'normal' | 'large' | 'extra-large';
  setFontSize: (size: 'small' | 'normal' | 'large' | 'extra-large') => void;
  
  // Contrast controls
  highContrast: boolean;
  toggleHighContrast: () => void;
  
  // Motion controls
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  
  // Focus management
  focusVisible: boolean;
  setFocusVisible: (visible: boolean) => void;
  
  // Screen reader support
  announcements: string[];
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  
  // Touch target size
  largeTargets: boolean;
  toggleLargeTargets: () => void;
  
  // Color adjustments
  colorBlindMode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia';
  setColorBlindMode: (mode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia') => void;
  
  // Mobile-specific
  oneHandedMode: boolean;
  toggleOneHandedMode: () => void;
  
  // Voice navigation
  voiceControlEnabled: boolean;
  toggleVoiceControl: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function MobileAccessibilityProvider({ children }: { children: React.ReactNode }) {
  // Persistent state using localStorage
  const [fontSize, setFontSizeState] = useState<'small' | 'normal' | 'large' | 'extra-large'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [largeTargets, setLargeTargets] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState<'none' | 'deuteranopia' | 'protanopia' | 'tritanopia'>('none');
  const [oneHandedMode, setOneHandedMode] = useState(false);
  const [voiceControlEnabled, setVoiceControlEnabled] = useState(false);

  // Initialize from localStorage and system preferences
  useEffect(() => {
    try {
      const savedPrefs = localStorage.getItem('mobile-accessibility-prefs');
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        setFontSizeState(prefs.fontSize || 'normal');
        setHighContrast(prefs.highContrast || false);
        setReduceMotion(prefs.reduceMotion || false);
        setLargeTargets(prefs.largeTargets || false);
        setColorBlindMode(prefs.colorBlindMode || 'none');
        setOneHandedMode(prefs.oneHandedMode || false);
        setVoiceControlEnabled(prefs.voiceControlEnabled || false);
      }

      // Detect system preferences
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setReduceMotion(true);
      }
      
      if (window.matchMedia('(prefers-contrast: high)').matches) {
        setHighContrast(true);
      }

      // Detect mobile device capabilities
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile && window.innerWidth < 768) {
        // Enable mobile-specific defaults
        setLargeTargets(true);
      }
    } catch (error) {
      console.warn('Failed to load accessibility preferences:', error);
    }
  }, []);

  // Save preferences to localStorage
  const savePreferences = useCallback(() => {
    try {
      const prefs = {
        fontSize,
        highContrast,
        reduceMotion,
        largeTargets,
        colorBlindMode,
        oneHandedMode,
        voiceControlEnabled
      };
      localStorage.setItem('mobile-accessibility-prefs', JSON.stringify(prefs));
    } catch (error) {
      console.warn('Failed to save accessibility preferences:', error);
    }
  }, [fontSize, highContrast, reduceMotion, largeTargets, colorBlindMode, oneHandedMode, voiceControlEnabled]);

  useEffect(() => {
    savePreferences();
  }, [savePreferences]);

  // Apply CSS custom properties for accessibility
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size scaling
    const fontScales = {
      small: '0.875',
      normal: '1',
      large: '1.125',
      'extra-large': '1.25'
    };
    root.style.setProperty('--font-scale', fontScales[fontSize]);

    // High contrast mode
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Reduced motion
    if (reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Large touch targets
    if (largeTargets) {
      root.classList.add('large-targets');
    } else {
      root.classList.remove('large-targets');
    }

    // Color blind modes
    root.className = root.className.replace(/colorblind-\w+/g, '');
    if (colorBlindMode !== 'none') {
      root.classList.add(`colorblind-${colorBlindMode}`);
    }

    // One-handed mode
    if (oneHandedMode) {
      root.classList.add('one-handed-mode');
    } else {
      root.classList.remove('one-handed-mode');
    }

    // Focus visible
    if (focusVisible) {
      root.classList.add('focus-visible-enabled');
    } else {
      root.classList.remove('focus-visible-enabled');
    }
  }, [fontSize, highContrast, reduceMotion, largeTargets, colorBlindMode, oneHandedMode, focusVisible]);

  // Keyboard navigation detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setFocusVisible(true);
      }
    };

    const handleMouseDown = () => {
      setFocusVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('touchstart', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('touchstart', handleMouseDown);
    };
  }, []);

  // Voice control setup
  useEffect(() => {
    if (voiceControlEnabled && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        handleVoiceCommand(command);
      };

      recognition.start();

      return () => {
        recognition.stop();
      };
    }
  }, [voiceControlEnabled]);

  const handleVoiceCommand = (command: string) => {
    if (command.includes('scroll up')) {
      window.scrollBy(0, -200);
      announce('Scrolled up');
    } else if (command.includes('scroll down')) {
      window.scrollBy(0, 200);
      announce('Scrolled down');
    } else if (command.includes('go back')) {
      window.history.back();
      announce('Navigated back');
    } else if (command.includes('larger text')) {
      const sizes: Array<'small' | 'normal' | 'large' | 'extra-large'> = ['small', 'normal', 'large', 'extra-large'];
      const currentIndex = sizes.indexOf(fontSize);
      if (currentIndex < sizes.length - 1) {
        setFontSize(sizes[currentIndex + 1]);
        announce(`Text size increased to ${sizes[currentIndex + 1]}`);
      }
    } else if (command.includes('smaller text')) {
      const sizes: Array<'small' | 'normal' | 'large' | 'extra-large'> = ['small', 'normal', 'large', 'extra-large'];
      const currentIndex = sizes.indexOf(fontSize);
      if (currentIndex > 0) {
        setFontSize(sizes[currentIndex - 1]);
        announce(`Text size decreased to ${sizes[currentIndex - 1]}`);
      }
    } else if (command.includes('high contrast')) {
      toggleHighContrast();
      announce(`High contrast ${!highContrast ? 'enabled' : 'disabled'}`);
    }
  };

  const setFontSize = (size: 'small' | 'normal' | 'large' | 'extra-large') => {
    setFontSizeState(size);
    announce(`Font size changed to ${size.replace('-', ' ')}`);
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    announce(`High contrast ${!highContrast ? 'enabled' : 'disabled'}`);
  };

  const toggleReduceMotion = () => {
    setReduceMotion(!reduceMotion);
    announce(`Motion ${!reduceMotion ? 'reduced' : 'enabled'}`);
  };

  const toggleLargeTargets = () => {
    setLargeTargets(!largeTargets);
    announce(`Large touch targets ${!largeTargets ? 'enabled' : 'disabled'}`);
  };

  const toggleOneHandedMode = () => {
    setOneHandedMode(!oneHandedMode);
    announce(`One-handed mode ${!oneHandedMode ? 'enabled' : 'disabled'}`);
  };

  const toggleVoiceControl = () => {
    setVoiceControlEnabled(!voiceControlEnabled);
    announce(`Voice control ${!voiceControlEnabled ? 'enabled' : 'disabled'}`);
  };

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncements(prev => [...prev, message]);
    
    // Create ARIA live region announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);

    // Clean up announcements array
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(a => a !== message));
    }, 5000);
  };

  const value: AccessibilityContextType = {
    fontSize,
    setFontSize,
    highContrast,
    toggleHighContrast,
    reduceMotion,
    toggleReduceMotion,
    focusVisible,
    setFocusVisible,
    announcements,
    announce,
    largeTargets,
    toggleLargeTargets,
    colorBlindMode,
    setColorBlindMode,
    oneHandedMode,
    toggleOneHandedMode,
    voiceControlEnabled,
    toggleVoiceControl
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      
      {/* Screen Reader Announcements */}
      <div id="mobile-announcements" className="sr-only" aria-live="polite" aria-atomic="true">
        {announcements.map((announcement, index) => (
          <div key={index}>{announcement}</div>
        ))}
      </div>

      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-tech-green focus:text-black focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Mobile Accessibility Menu */}
      <MobileAccessibilityMenu />
    </AccessibilityContext.Provider>
  );
}

function MobileAccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const accessibility = useContext(AccessibilityContext);

  if (!accessibility) return null;

  return (
    <>
      {/* Accessibility Menu Button */}
      <button
        className="fixed bottom-4 right-4 z-40 w-14 h-14 bg-tech-green text-black rounded-full shadow-lg flex items-center justify-center mobile-haptic-medium focus:outline-none focus:ring-2 focus:ring-tech-green focus:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open accessibility menu"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </button>

      {/* Accessibility Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className="fixed bottom-20 right-4 w-80 max-w-[calc(100vw-2rem)] bg-gray-900 border border-tech-green/20 rounded-2xl p-6 z-40 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Accessibility</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 mobile-haptic-light"
                  aria-label="Close accessibility menu"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Text Size
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['small', 'normal', 'large', 'extra-large'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => accessibility.setFontSize(size)}
                        className={`px-3 py-2 text-xs rounded-lg border transition-colors mobile-haptic-light ${
                          accessibility.fontSize === size
                            ? 'bg-tech-green text-black border-tech-green'
                            : 'bg-gray-800 text-white border-gray-700 hover:border-tech-green/50'
                        }`}
                      >
                        {size === 'extra-large' ? 'XL' : size.charAt(0).toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggle Controls */}
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">High Contrast</span>
                    <button
                      onClick={accessibility.toggleHighContrast}
                      className={`w-12 h-6 rounded-full transition-colors mobile-haptic-medium ${
                        accessibility.highContrast ? 'bg-tech-green' : 'bg-gray-600'
                      }`}
                      aria-pressed={accessibility.highContrast}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          accessibility.highContrast ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">Reduce Motion</span>
                    <button
                      onClick={accessibility.toggleReduceMotion}
                      className={`w-12 h-6 rounded-full transition-colors mobile-haptic-medium ${
                        accessibility.reduceMotion ? 'bg-tech-green' : 'bg-gray-600'
                      }`}
                      aria-pressed={accessibility.reduceMotion}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          accessibility.reduceMotion ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">Large Touch Targets</span>
                    <button
                      onClick={accessibility.toggleLargeTargets}
                      className={`w-12 h-6 rounded-full transition-colors mobile-haptic-medium ${
                        accessibility.largeTargets ? 'bg-tech-green' : 'bg-gray-600'
                      }`}
                      aria-pressed={accessibility.largeTargets}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          accessibility.largeTargets ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">One-Handed Mode</span>
                    <button
                      onClick={accessibility.toggleOneHandedMode}
                      className={`w-12 h-6 rounded-full transition-colors mobile-haptic-medium ${
                        accessibility.oneHandedMode ? 'bg-tech-green' : 'bg-gray-600'
                      }`}
                      aria-pressed={accessibility.oneHandedMode}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          accessibility.oneHandedMode ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </label>

                  {/* Voice Control - only show if supported */}
                  {'webkitSpeechRecognition' in window && (
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-300">Voice Control</span>
                      <button
                        onClick={accessibility.toggleVoiceControl}
                        className={`w-12 h-6 rounded-full transition-colors mobile-haptic-medium ${
                          accessibility.voiceControlEnabled ? 'bg-tech-green' : 'bg-gray-600'
                        }`}
                        aria-pressed={accessibility.voiceControlEnabled}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            accessibility.voiceControlEnabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </label>
                  )}
                </div>

                {/* Color Blind Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Color Vision
                  </label>
                  <select
                    value={accessibility.colorBlindMode}
                    onChange={(e) => accessibility.setColorBlindMode(e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:border-tech-green focus:outline-none"
                  >
                    <option value="none">Normal</option>
                    <option value="deuteranopia">Deuteranopia</option>
                    <option value="protanopia">Protanopia</option>
                    <option value="tritanopia">Tritanopia</option>
                  </select>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  accessibility.setFontSize('normal');
                  accessibility.toggleHighContrast();
                  if (accessibility.reduceMotion) accessibility.toggleReduceMotion();
                  if (accessibility.largeTargets) accessibility.toggleLargeTargets();
                  accessibility.setColorBlindMode('none');
                  if (accessibility.oneHandedMode) accessibility.toggleOneHandedMode();
                  if (accessibility.voiceControlEnabled) accessibility.toggleVoiceControl();
                }}
                className="w-full mt-6 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg hover:border-tech-green/50 transition-colors mobile-haptic-light"
              >
                Reset to Defaults
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within MobileAccessibilityProvider');
  }
  return context;
}