/**
 * Mobile Optimization Utilities
 * Performance and UX optimizations for mobile devices
 */

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  hasTouch: boolean;
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio: number;
  supportsHover: boolean;
  prefersReducedMotion: boolean;
}

/**
 * Detect device capabilities and characteristics
 */
export function detectDevice(): DeviceInfo {
  if (typeof window === 'undefined') {
    // Server-side defaults
    return {
      isMobile: false,
      isTablet: false,
      isIOS: false,
      isAndroid: false,
      hasTouch: false,
      viewportWidth: 1280,
      viewportHeight: 720,
      devicePixelRatio: 1,
      supportsHover: true,
      prefersReducedMotion: false,
    };
  }

  const userAgent = navigator.userAgent;
  const isMobile = /iPhone|iPod|Android|BlackBerry|Opera Mini|IEMobile/i.test(userAgent);
  const isTablet = /iPad|Android(?!.*Mobile)|Kindle|Silk/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {
    isMobile,
    isTablet,
    isIOS,
    isAndroid,
    hasTouch,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio || 1,
    supportsHover,
    prefersReducedMotion,
  };
}

/**
 * Optimize images for mobile devices
 */
export function optimizeImageForDevice(src: string, device: DeviceInfo): string {
  // Return optimized image URL based on device capabilities
  const params = new URLSearchParams();
  
  // Adjust quality based on device
  if (device.isMobile) {
    params.set('q', '80'); // Lower quality for mobile
  } else {
    params.set('q', '90'); // Higher quality for desktop
  }
  
  // Adjust size based on viewport and DPR
  const optimalWidth = Math.min(device.viewportWidth * device.devicePixelRatio, 2048);
  params.set('w', optimalWidth.toString());
  
  // Use WebP if supported (most modern browsers)
  if (typeof window !== 'undefined' && window.CSS?.supports?.('(width: 1px)')) {
    params.set('f', 'webp');
  }
  
  return `${src}?${params.toString()}`;
}

/**
 * Preload critical resources for mobile
 */
export function preloadCriticalResources(device: DeviceInfo): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  const head = document.head;
  
  // Preload key CSS for mobile
  if (device.isMobile) {
    const mobileCSS = document.createElement('link');
    mobileCSS.rel = 'preload';
    mobileCSS.as = 'style';
    mobileCSS.href = '/mobile-enhancements.css';
    head.appendChild(mobileCSS);
  }
  
  // Preconnect to external domains
  const preconnects = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];
  
  preconnects.forEach(url => {
    if (!head.querySelector(`link[href="${url}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      head.appendChild(link);
    }
  });
}

/**
 * Handle viewport meta tag for mobile optimization
 */
export function optimizeViewport(device: DeviceInfo): void {
  if (typeof document === 'undefined') return;
  
  let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
  
  if (!viewport) {
    viewport = document.createElement('meta');
    viewport.name = 'viewport';
    document.head.appendChild(viewport);
  }
  
  // Base viewport settings
  let content = 'width=device-width, initial-scale=1';
  
  // iOS-specific optimizations
  if (device.isIOS) {
    content += ', viewport-fit=cover'; // Support notched devices
    content += ', user-scalable=no'; // Prevent zoom for better UX
  }
  
  // Android-specific optimizations
  if (device.isAndroid) {
    content += ', shrink-to-fit=no';
  }
  
  viewport.content = content;
}

/**
 * Optimize animations based on device capabilities
 */
export function getAnimationConfig(device: DeviceInfo): {
  duration: number;
  easing: string;
  shouldAnimate: boolean;
} {
  if (device.prefersReducedMotion) {
    return {
      duration: 0,
      easing: 'none',
      shouldAnimate: false,
    };
  }
  
  // Reduce animation complexity on mobile
  if (device.isMobile) {
    return {
      duration: 200, // Shorter duration
      easing: 'ease-out',
      shouldAnimate: true,
    };
  }
  
  return {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    shouldAnimate: true,
  };
}

/**
 * Handle mobile-specific touch events
 */
export class MobileGestureHandler {
  private element: HTMLElement;
  private startX: number = 0;
  private startY: number = 0;
  private startTime: number = 0;
  private isScrolling: boolean = false;

  constructor(element: HTMLElement) {
    this.element = element;
    this.bindEvents();
  }

  private bindEvents(): void {
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
  }

  private handleTouchStart(e: TouchEvent): void {
    const touch = e.touches[0];
    if (!touch) return;
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    this.startTime = Date.now();
    this.isScrolling = false;
  }

  private handleTouchMove(e: TouchEvent): void {
    if (this.isScrolling) return;
    
    const touch = e.touches[0];
    if (!touch) return;
    const deltaX = Math.abs(touch.clientX - this.startX);
    const deltaY = Math.abs(touch.clientY - this.startY);
    
    // Determine scroll direction
    if (deltaY > deltaX) {
      this.isScrolling = true;
    }
  }

  private handleTouchEnd(e: TouchEvent): void {
    if (this.isScrolling) return;
    
    const touch = e.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - this.startX;
    const deltaY = touch.clientY - this.startY;
    const deltaTime = Date.now() - this.startTime;
    
    // Detect swipe gestures
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;
    
    if (Math.abs(deltaX) > minSwipeDistance && deltaTime < maxSwipeTime) {
      const direction = deltaX > 0 ? 'right' : 'left';
      this.element.dispatchEvent(new CustomEvent('swipe', {
        detail: { direction, deltaX, deltaY, deltaTime }
      }));
    }
    
    // Detect tap gesture
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < 200) {
      this.element.dispatchEvent(new CustomEvent('tap', {
        detail: { x: touch?.clientX ?? 0, y: touch?.clientY ?? 0, deltaTime }
      }));
    }
  }

  destroy(): void {
    this.element.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    this.element.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    this.element.removeEventListener('touchend', this.handleTouchEnd.bind(this));
  }
}

/**
 * Optimize scroll performance for mobile
 */
export function optimizeScrollPerformance(): void {
  if (typeof window === 'undefined') return;
  
  // Use passive event listeners for better scroll performance
  const passiveOptions = { passive: true };
  
  // Throttle scroll events
  let isScrolling = false;
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      requestAnimationFrame(() => {
        // Handle scroll event
        isScrolling = false;
      });
      isScrolling = true;
    }
  }, passiveOptions);
  
  // Optimize momentum scrolling on iOS
  if ('webkitOverflowScrolling' in document.body.style) {
    (document.body.style as any).webkitOverflowScrolling = 'touch';
  }
}

/**
 * Handle orientation changes
 */
export function handleOrientationChange(callback: (orientation: 'portrait' | 'landscape') => void): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const handleChange = () => {
    const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    
    // Delay execution to allow viewport to update
    setTimeout(() => {
      callback(orientation);
    }, 100);
  };
  
  window.addEventListener('orientationchange', handleChange);
  window.addEventListener('resize', handleChange);
  
  // Initial call
  handleChange();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('orientationchange', handleChange);
    window.removeEventListener('resize', handleChange);
  };
}

/**
 * Manage focus for mobile accessibility
 */
export class MobileFocusManager {
  private focusableSelector = `
    button:not([disabled]), 
    [href], 
    input:not([disabled]), 
    select:not([disabled]), 
    textarea:not([disabled]), 
    [tabindex]:not([tabindex="-1"]), 
    [role="button"]:not([disabled])
  `;

  trapFocus(container: HTMLElement): () => void {
    const focusableElements = container.querySelectorAll(this.focusableSelector) as NodeListOf<HTMLElement>;
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
      
      if (e.key === 'Escape') {
        this.restoreFocus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    
    // Focus first element
    if (firstFocusable) {
      firstFocusable.focus();
    }

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }

  private previousFocus: HTMLElement | null = null;

  saveFocus(): void {
    this.previousFocus = document.activeElement as HTMLElement;
  }

  restoreFocus(): void {
    if (this.previousFocus && this.previousFocus.focus) {
      this.previousFocus.focus();
      this.previousFocus = null;
    }
  }
}

/**
 * Initialize mobile optimizations
 */
export function initializeMobileOptimizations(): {
  device: DeviceInfo;
  cleanup: () => void;
} {
  const device = detectDevice();
  const cleanup: (() => void)[] = [];
  
  // Apply viewport optimizations
  optimizeViewport(device);
  
  // Preload critical resources
  preloadCriticalResources(device);
  
  // Optimize scroll performance
  if (device.isMobile) {
    optimizeScrollPerformance();
  }
  
  // Handle orientation changes
  if (device.isMobile) {
    const orientationCleanup = handleOrientationChange((orientation) => {
      document.body.setAttribute('data-orientation', orientation);
    });
    cleanup.push(orientationCleanup);
  }
  
  // Add device classes to body
  document.body.classList.toggle('mobile', device.isMobile);
  document.body.classList.toggle('tablet', device.isTablet);
  document.body.classList.toggle('ios', device.isIOS);
  document.body.classList.toggle('android', device.isAndroid);
  document.body.classList.toggle('touch', device.hasTouch);
  document.body.classList.toggle('no-hover', !device.supportsHover);
  document.body.classList.toggle('reduced-motion', device.prefersReducedMotion);
  
  return {
    device,
    cleanup: () => cleanup.forEach(fn => fn()),
  };
}

const _mobileOptimizationUtils = {
  detectDevice,
  optimizeImageForDevice,
  getAnimationConfig,
  MobileGestureHandler,
  MobileFocusManager,
  initializeMobileOptimizations,
};