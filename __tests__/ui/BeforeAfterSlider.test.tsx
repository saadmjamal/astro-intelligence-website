import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';

const mockBeforeImage = {
  src: '/before-image.jpg',
  alt: 'Before Image',
  caption: 'Before caption',
};

const mockAfterImage = {
  src: '/after-image.jpg',
  alt: 'After Image',
  caption: 'After caption',
};

describe('BeforeAfterSlider', () => {
  it('renders both before and after images', () => {
    render(
      <BeforeAfterSlider
        before={mockBeforeImage}
        after={mockAfterImage}
      />
    );
    
    expect(screen.getByAltText('Before Image')).toBeInTheDocument();
    expect(screen.getByAltText('After Image')).toBeInTheDocument();
  });

  it('displays before and after labels', () => {
    render(
      <BeforeAfterSlider
        before={mockBeforeImage}
        after={mockAfterImage}
      />
    );
    
    expect(screen.getByText('Before')).toBeInTheDocument();
    expect(screen.getByText('After')).toBeInTheDocument();
  });

  it('displays captions when provided', () => {
    render(
      <BeforeAfterSlider
        before={mockBeforeImage}
        after={mockAfterImage}
      />
    );
    
    expect(screen.getByText(/Before caption/)).toBeInTheDocument();
    expect(screen.getByText(/After caption/)).toBeInTheDocument();
  });

  it('has correct initial slider position', () => {
    render(
      <BeforeAfterSlider
        before={mockBeforeImage}
        after={mockAfterImage}
        initialPosition={60}
      />
    );
    
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '60');
  });

  it('handles mouse interaction to change position', () => {
    render(
      <BeforeAfterSlider
        before={mockBeforeImage}
        after={mockAfterImage}
      />
    );
    
    const container = screen.getByRole('slider');
    const sliderButton = screen.getByLabelText('Drag to compare before and after');
    
    // Mock getBoundingClientRect
    Object.defineProperty(container, 'getBoundingClientRect', {
      value: () => ({
        left: 0,
        width: 800,
        top: 0,
        height: 400,
      }),
    });
    
    // Start dragging
    fireEvent.mouseDown(sliderButton);
    
    // Move mouse
    fireEvent.mouseMove(container, { clientX: 400 });
    
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });

  it('handles keyboard navigation', () => {
    render(
      <BeforeAfterSlider
        before={mockBeforeImage}
        after={mockAfterImage}
        initialPosition={50}
      />
    );
    
    const slider = screen.getByRole('slider');
    
    // Test right arrow key
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider).toHaveAttribute('aria-valuenow', '55');
    
    // Test left arrow key
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });

  it('applies correct aspect ratio class', () => {
    const { container } = render(
      <BeforeAfterSlider
        before={mockBeforeImage}
        after={mockAfterImage}
        aspectRatio="square"
      />
    );
    
    const sliderContainer = container.querySelector('[class*="aspect-square"]');
    expect(sliderContainer).toBeInTheDocument();
  });

  it('handles touch events', () => {
    render(
      <BeforeAfterSlider
        before={mockBeforeImage}
        after={mockAfterImage}
      />
    );
    
    const sliderButton = screen.getByLabelText('Drag to compare before and after');
    
    // Test touch start
    fireEvent.touchStart(sliderButton);
    
    // Should set dragging state (tested indirectly through cursor class)
    const container = screen.getByRole('slider');
    expect(container).toHaveClass('cursor-grabbing');
  });

  it('clamps position values within bounds', () => {
    render(
      <BeforeAfterSlider
        before={mockBeforeImage}
        after={mockAfterImage}
        initialPosition={50}
      />
    );
    
    const slider = screen.getByRole('slider');
    
    // Test going beyond right bound
    for (let i = 0; i < 20; i++) {
      fireEvent.keyDown(slider, { key: 'ArrowRight' });
    }
    expect(slider).toHaveAttribute('aria-valuenow', '100');
    
    // Test going beyond left bound
    for (let i = 0; i < 25; i++) {
      fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    }
    expect(slider).toHaveAttribute('aria-valuenow', '0');
  });

  it('renders without captions when not provided', () => {
    const beforeNoCaption = { ...mockBeforeImage, caption: undefined };
    const afterNoCaption = { ...mockAfterImage, caption: undefined };
    
    render(
      <BeforeAfterSlider
        before={beforeNoCaption}
        after={afterNoCaption}
      />
    );
    
    expect(screen.queryByText('Before caption')).not.toBeInTheDocument();
    expect(screen.queryByText('After caption')).not.toBeInTheDocument();
  });
});