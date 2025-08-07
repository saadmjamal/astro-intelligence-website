import { render, screen, waitFor } from '@testing-library/react';
import { OptimizedImage } from '../OptimizedImage';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, onLoad, onError, ...props }: any) {
    return (
      <button
        data-testid="mock-image"
        data-src={src}
        aria-label={alt}
        {...props}
        onClick={() => {
          // Simulate different events based on src
          if (src.includes('invalid')) {
            setTimeout(() => onError?.(), 100);
          } else {
            setTimeout(() => onLoad?.(), 100);
          }
        }}
        onError={() => onError?.()}
      />
    );
  };
});

// Mock intersection observer
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('OptimizedImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with basic props', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={800}
        height={600}
        lazy={false}
      />
    );

    expect(screen.getByLabelText('Test image')).toBeInTheDocument();
  });

  it('shows loading skeleton when lazy loading', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={800}
        height={600}
        lazy={true}
      />
    );

    // Should show loading skeleton initially
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
  });

  it('loads immediately when lazy is false', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={800}
        height={600}
        lazy={false}
      />
    );

    expect(screen.getByLabelText('Test image')).toBeInTheDocument();
  });

  it('loads immediately when priority is true', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={800}
        height={600}
        priority={true}
      />
    );

    expect(screen.getByLabelText('Test image')).toBeInTheDocument();
  });

  it('shows error state when image fails to load', async () => {
    render(
      <OptimizedImage
        src="/invalid-image.jpg"
        alt="Test image"
        width={800}
        height={600}
        lazy={false}
      />
    );

    const image = screen.getByLabelText('Test image');
    
    // Simulate error by clicking the mock image
    image.click();

    await waitFor(() => {
      expect(screen.getByText('Image unavailable')).toBeInTheDocument();
    });
  });

  it('calls onLoad callback when image loads', async () => {
    const onLoad = jest.fn();
    
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={800}
        height={600}
        lazy={false}
        onLoad={onLoad}
      />
    );

    const image = screen.getByLabelText('Test image');
    image.click();

    await waitFor(() => {
      expect(onLoad).toHaveBeenCalled();
    });
  });

  it('calls onError callback when image fails', async () => {
    const onError = jest.fn();
    
    render(
      <OptimizedImage
        src="/invalid-image.jpg"
        alt="Test image"
        width={800}
        height={600}
        lazy={false}
        onError={onError}
      />
    );

    const image = screen.getByLabelText('Test image');
    image.click();

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });

  it('applies custom className', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={800}
        height={600}
        className="custom-class"
        lazy={false}
      />
    );

    const container = screen.getByLabelText('Test image').closest('div');
    expect(container).toHaveClass('custom-class');
  });

  it('supports fill mode', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        fill={true}
        lazy={false}
      />
    );

    expect(screen.getByLabelText('Test image')).toBeInTheDocument();
  });

  it('uses custom blur placeholder when provided', () => {
    const customBlur = 'data:image/jpeg;base64,custom';
    
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={800}
        height={600}
        blurDataURL={customBlur}
        lazy={false}
      />
    );

    expect(screen.getByLabelText('Test image')).toBeInTheDocument();
  });

  it('handles intersection observer fallback', () => {
    // Mock unsupported intersection observer
    const originalIntersectionObserver = window.IntersectionObserver;
    (window as any).IntersectionObserver = undefined;

    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={800}
        height={600}
        lazy={true}
      />
    );

    // Should load immediately when IntersectionObserver is not supported
    expect(screen.getByLabelText('Test image')).toBeInTheDocument();

    // Restore
    window.IntersectionObserver = originalIntersectionObserver;
  });
});