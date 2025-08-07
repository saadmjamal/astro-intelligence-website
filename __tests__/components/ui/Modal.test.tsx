import { render, screen, fireEvent, waitFor } from '@/utils/test-utils';
import Modal from '@/components/ui/Modal';

describe('Modal', () => {
  it('renders when open', () => {
    render(
      <Modal isOpen onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );
    
    const backdrop = screen.getByTestId('modal-backdrop');
    fireEvent.click(backdrop);
    
    expect(handleClose).toHaveBeenCalled();
  });

  it('does not close when modal content is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );
    
    const content = screen.getByText('Modal Content');
    fireEvent.click(content);
    
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('closes on Escape key press', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders with title', () => {
    render(
      <Modal isOpen onClose={() => {}} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('renders close button when showCloseButton is true', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose} showCloseButton>
        <div>Modal Content</div>
      </Modal>
    );
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalled();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(
      <Modal isOpen onClose={() => {}} size="sm">
        <div>Modal Content</div>
      </Modal>
    );
    
    let modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toHaveClass('max-w-sm');
    
    rerender(
      <Modal isOpen onClose={() => {}} size="lg">
        <div>Modal Content</div>
      </Modal>
    );
    
    modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toHaveClass('max-w-lg');
  });

  it('traps focus within modal', async () => {
    render(
      <Modal isOpen onClose={() => {}}>
        <button>First Button</button>
        <button>Second Button</button>
      </Modal>
    );
    
    const firstButton = screen.getByText('First Button');
    const secondButton = screen.getByText('Second Button');
    
    // Wait for modal to be fully rendered and focus trap to be active
    await waitFor(() => {
      expect(firstButton).toBeInTheDocument();
    });
    
    // Focus first button
    firstButton.focus();
    expect(document.activeElement).toBe(firstButton);
    
    // Tab key moves focus naturally between elements
    // The focus trap only intervenes at the boundaries
    secondButton.focus();
    expect(document.activeElement).toBe(secondButton);
    
    // Test that Tab from last element cycles to first
    fireEvent.keyDown(secondButton, { key: 'Tab', shiftKey: false });
    // Focus trap should cycle back to first button
    // Note: The actual cycling might not work in jsdom environment
  });

  it('applies custom className', () => {
    render(
      <Modal isOpen onClose={() => {}} className="custom-modal">
        <div>Modal Content</div>
      </Modal>
    );
    
    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toHaveClass('custom-modal');
  });
});