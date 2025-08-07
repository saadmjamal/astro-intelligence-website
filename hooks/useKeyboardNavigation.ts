import { useEffect, useRef } from 'react';

interface KeyboardNavigationOptions {
  onEscape?: () => void;
  onEnter?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onTab?: (event: KeyboardEvent) => void;
  trapFocus?: boolean;
}

export function useKeyboardNavigation(options: KeyboardNavigationOptions = {}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          options.onEscape?.();
          break;
        case 'Enter':
          options.onEnter?.();
          break;
        case 'ArrowUp':
          options.onArrowUp?.();
          break;
        case 'ArrowDown':
          options.onArrowDown?.();
          break;
        case 'ArrowLeft':
          options.onArrowLeft?.();
          break;
        case 'ArrowRight':
          options.onArrowRight?.();
          break;
        case 'Tab':
          if (options.trapFocus && containerRef.current) {
            const focusableElements = containerRef.current.querySelectorAll(
              'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (event.shiftKey && document.activeElement === firstElement) {
              event.preventDefault();
              lastElement?.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
              event.preventDefault();
              firstElement?.focus();
            }
          }
          options.onTab?.(event);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [options]);

  return containerRef;
}

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    
    // Enhanced selector to catch more focusable elements
    const focusableElements = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], iframe, embed, object, summary'
    );
    
    const focusableElementsArray = Array.from(focusableElements) as HTMLElement[];
    const firstElement = focusableElementsArray[0];
    const lastElement = focusableElementsArray[focusableElementsArray.length - 1];

    // Focus first element when trap is activated, with fallback
    if (firstElement) {
      firstElement.focus();
    } else {
      // If no focusable elements, focus the container itself
      container.setAttribute('tabindex', '-1');
      container.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      // If no focusable elements, prevent tabbing
      if (focusableElementsArray.length === 0) {
        event.preventDefault();
        return;
      }

      const currentActiveElement = document.activeElement as HTMLElement;
      const currentIndex = focusableElementsArray.indexOf(currentActiveElement);

      if (event.shiftKey) {
        // Shift + Tab (backwards)
        if (currentIndex <= 0) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab (forwards)
        if (currentIndex >= focusableElementsArray.length - 1) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      // Clean up temporary tabindex
      if (container.getAttribute('tabindex') === '-1' && focusableElementsArray.length === 0) {
        container.removeAttribute('tabindex');
      }
    };
  }, [isActive]);

  return containerRef;
}