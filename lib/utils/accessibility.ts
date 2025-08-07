/**
 * Accessibility utilities for testing and validation
 */

export interface AccessibilityCheck {
  element: HTMLElement;
  issues: string[];
  level: 'error' | 'warning' | 'info';
}

/**
 * Check if an element has proper ARIA attributes
 */
export function checkARIAAttributes(element: HTMLElement): AccessibilityCheck {
  const issues: string[] = [];
  const tagName = element.tagName.toLowerCase();

  // Check for missing alt text on images
  if (tagName === 'img' && !element.getAttribute('alt')) {
    issues.push('Image missing alt attribute');
  }

  // Check for buttons without accessible names
  if (tagName === 'button') {
    const hasText = element.textContent?.trim();
    const hasAriaLabel = element.getAttribute('aria-label');
    const hasAriaLabelledBy = element.getAttribute('aria-labelledby');
    
    if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push('Button missing accessible name');
    }
  }

  // Check for form controls without labels
  if (['input', 'textarea', 'select'].includes(tagName)) {
    const hasLabel = element.getAttribute('aria-label') || 
                    element.getAttribute('aria-labelledby') ||
                    document.querySelector(`label[for="${element.id}"]`);
    
    if (!hasLabel) {
      issues.push('Form control missing label');
    }
  }

  // Check for interactive elements without proper roles
  const isInteractive = element.onclick || 
                        element.onkeydown || 
                        element.getAttribute('tabindex') === '0';
  
  if (isInteractive && !['button', 'a', 'input', 'textarea', 'select'].includes(tagName)) {
    const role = element.getAttribute('role');
    if (!role || !['button', 'link', 'menuitem', 'tab'].includes(role)) {
      issues.push('Interactive element missing appropriate role');
    }
  }

  return {
    element,
    issues,
    level: issues.length > 0 ? 'error' : 'info'
  };
}

/**
 * Check color contrast (simplified check)
 */
export function checkColorContrast(element: HTMLElement): AccessibilityCheck {
  const issues: string[] = [];
  const computedStyle = window.getComputedStyle(element);
  const color = computedStyle.color;
  const backgroundColor = computedStyle.backgroundColor;

  // This is a simplified check - in a real app you'd use a proper contrast calculation
  if (color === backgroundColor) {
    issues.push('Text and background colors are the same');
  }

  return {
    element,
    issues,
    level: issues.length > 0 ? 'warning' : 'info'
  };
}

/**
 * Check keyboard navigation
 */
export function checkKeyboardNavigation(container: HTMLElement): AccessibilityCheck[] {
  const issues: AccessibilityCheck[] = [];
  
  const interactiveElements = container.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );

  interactiveElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    const tabIndex = htmlElement.getAttribute('tabindex');
    
    // Check if interactive elements are keyboard accessible
    if (tabIndex === '-1') {
      issues.push({
        element: htmlElement,
        issues: ['Interactive element not keyboard accessible'],
        level: 'error'
      });
    }

    // Check for focus indicators
    const computedStyle = window.getComputedStyle(htmlElement, ':focus');
    if (!computedStyle.outline && !computedStyle.boxShadow) {
      issues.push({
        element: htmlElement,
        issues: ['Missing focus indicator'],
        level: 'warning'
      });
    }
  });

  return issues;
}

/**
 * Generate accessibility report for a container
 */
export function generateAccessibilityReport(container: HTMLElement): {
  errors: AccessibilityCheck[];
  warnings: AccessibilityCheck[];
  info: AccessibilityCheck[];
  summary: string;
} {
  const allElements = container.querySelectorAll('*');
  const checks: AccessibilityCheck[] = [];

  // Run ARIA checks on all elements
  allElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    checks.push(checkARIAAttributes(htmlElement));
    checks.push(checkColorContrast(htmlElement));
  });

  // Add keyboard navigation checks
  checks.push(...checkKeyboardNavigation(container));

  // Filter out checks with no issues for cleaner report
  const checksWithIssues = checks.filter(check => check.issues.length > 0);

  const errors = checksWithIssues.filter(check => check.level === 'error');
  const warnings = checksWithIssues.filter(check => check.level === 'warning');
  const info = checksWithIssues.filter(check => check.level === 'info');

  const summary = `Accessibility Report: ${errors.length} errors, ${warnings.length} warnings, ${info.length} info items`;

  return {
    errors,
    warnings,
    info,
    summary
  };
}

/**
 * Test keyboard navigation programmatically
 */
export async function testKeyboardNavigation(container: HTMLElement): Promise<boolean> {
  const focusableElements = container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>;

  if (focusableElements.length === 0) return true;

  // Test Tab navigation
  for (let i = 0; i < focusableElements.length; i++) {
    const element = focusableElements[i];
    if (!element) continue;
    element.focus();
    
    // Simulate Tab key
    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      code: 'Tab',
      bubbles: true
    });
    
    container.dispatchEvent(tabEvent);
    
    // Check if focus moved correctly
    await new Promise(resolve => setTimeout(resolve, 10));
    
    const expectedNext = focusableElements[i + 1] || focusableElements[0];
    if (document.activeElement !== expectedNext) {
      console.warn('Tab navigation issue detected');
      return false;
    }
  }

  return true;
}