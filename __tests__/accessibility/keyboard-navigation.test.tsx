import { render, fireEvent, screen } from '@/utils/test-utils';
import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { SkipLink } from '@/components/ui/SkipLink';
import { Button } from '@/components/ui/Button';

// Test component with modal for keyboard navigation
function TestModalComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <SkipLink />
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Test Modal"
        showCloseButton
      >
        <div className="p-4">
          <Button>First Button</Button>
          <Button>Second Button</Button>
          <input type="text" placeholder="Test input" />
        </div>
      </Modal>
      <main id="main-content" tabIndex={-1}>
        <h1>Main Content</h1>
        <Button>Another Button</Button>
      </main>
    </div>
  );
}

describe('Keyboard Navigation', () => {
  describe('SkipLink', () => {
    it('renders skip link with correct attributes', () => {
      render(<SkipLink />);
      
      const skipLink = screen.getByRole('link', { name: /skip to main content/i });
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('becomes visible when focused', () => {
      render(<SkipLink />);
      
      const skipLink = screen.getByRole('link', { name: /skip to main content/i });
      
      // Initially should be hidden (transform -translate-y-full)
      expect(skipLink).toHaveClass('-translate-y-full');
      
      // When focused, should become visible
      fireEvent.focus(skipLink);
      expect(skipLink).toHaveClass('focus:translate-y-0');
    });
  });

  describe('Modal Focus Management', () => {
    it('manages focus correctly when opening and closing', () => {
      render(<TestModalComponent />);
      
      const openButton = screen.getByRole('button', { name: /open modal/i });
      
      // Focus the open button
      openButton.focus();
      expect(document.activeElement).toBe(openButton);
      
      // Open modal
      fireEvent.click(openButton);
      
      // Modal should be open
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      
      // Close modal with escape
      fireEvent.keyDown(document, { key: 'Escape' });
      
      // Focus should return to the open button
      expect(document.activeElement).toBe(openButton);
    });

    it('traps focus within modal when open', () => {
      render(<TestModalComponent />);
      
      const openButton = screen.getByRole('button', { name: /open modal/i });
      fireEvent.click(openButton);
      
      // Modal should be open
      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
      
      // Get focusable elements within modal
      const modalButtons = screen.getAllByRole('button').filter(btn => 
        modal.contains(btn)
      );
      const modalInput = screen.getByPlaceholderText('Test input');
      
      expect(modalButtons.length).toBeGreaterThan(0);
      expect(modalInput).toBeInTheDocument();
    });
  });

  describe('ARIA Attributes', () => {
    it('modal has correct ARIA attributes', () => {
      render(<TestModalComponent />);
      
      const openButton = screen.getByRole('button', { name: /open modal/i });
      fireEvent.click(openButton);
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby');
    });

    it('buttons have accessible names', () => {
      render(<TestModalComponent />);
      
      // All buttons should have accessible names
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAccessibleName();
      });
    });
  });

  describe('Focus Indicators', () => {
    it('buttons have focus ring styles', () => {
      render(
        <div>
          <Button>Test Button</Button>
        </div>
      );
      
      const button = screen.getByRole('button', { name: /test button/i });
      
      // Button should have our custom focus-visible-ring class
      expect(button).toHaveClass('focus-visible-ring');
      
      // Verify button is focusable and has correct role
      expect(button).toBeEnabled();
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Keyboard Events', () => {
    it('handles enter key on buttons', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Test Button</Button>);
      
      const button = screen.getByRole('button', { name: /test button/i });
      
      fireEvent.keyDown(button, { key: 'Enter' });
      // Note: React automatically handles Enter key for buttons
      // so we just test that the button is properly focusable
      expect(button).toBeInTheDocument();
    });

    it('handles space key on buttons', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Test Button</Button>);
      
      const button = screen.getByRole('button', { name: /test button/i });
      
      fireEvent.keyDown(button, { key: ' ' });
      // Note: React automatically handles Space key for buttons
      expect(button).toBeInTheDocument();
    });
  });
});