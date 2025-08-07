import { render, screen, waitFor } from '@testing-library/react';
import { ProgressiveImage } from '@/components/ui/ProgressiveImage';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ 
    src, 
    alt, 
    onLoad, 
    onError,
    fill,
    priority,
    quality,
    sizes,
    placeholder,
    blurDataURL,
    ...props 
  }: any) {
    // Filter out Next.js specific props that shouldn't go on img element
    return (
      <img
        src={src}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        {...props}
        data-testid="mock-image"
      />
    );
  };
});

// Mock intersection observer hook
jest.mock('@/hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: jest.fn((ref, callback) => {
    // Default implementation - trigger intersection immediately
    setTimeout(() => callback(true), 0);
  }),
}));

// Mock image preloader hook
jest.mock('@/hooks/useImagePreloader', () => ({
  useImagePreloader: () => ({
    preloadImage: jest.fn().mockResolvedValue({}),
  }),
}));

// Mock generateBlurDataURL function
jest.mock('@/lib/utils/image-optimization', () => ({
  generateSizes: jest.fn(() => '100vw'),
  IMAGE_BREAKPOINTS: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
  },
  generateImageUrl: jest.fn((src, options) => `${src}?q=${options?.quality || 85}`),
  generateBlurDataURL: jest.fn(() => 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...'),
}));

describe('ProgressiveImage', () => {
  const mockProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
    width: 800,
    height: 600,
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with basic props', async () => {
    render(<ProgressiveImage {...mockProps} priority={true} />);
    
    // With priority=true, image should render immediately
    await waitFor(() => {
      const images = screen.getAllByAltText('Test image');
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it('shows loading skeleton when lazy loading and not yet visible', () => {
    // Import the mock so we can override it
    const { useIntersectionObserver } = require('@/hooks/useIntersectionObserver');
    useIntersectionObserver.mockImplementation(() => {
      // Don't call callback - element is not visible
    });

    const { container } = render(<ProgressiveImage {...mockProps} lazy={true} />);
    
    // Check for skeleton div with class
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('loads immediately when priority is true', () => {
    render(<ProgressiveImage {...mockProps} priority={true} />);
    
    // Should have at least one image (may have 2 if progressive loading)
    const images = screen.getAllByAltText('Test image');
    expect(images.length).toBeGreaterThan(0);
  });

  it('shows progressive loading with low quality image first', async () => {
    render(
      <ProgressiveImage 
        {...mockProps} 
        progressive={true}
        lowQualitySrc="/test-image-low.jpg"
        priority={true}
      />
    );

    // Should render both low and high quality images
    const images = screen.getAllByTestId('mock-image');
    expect(images).toHaveLength(2);
  });

  it('handles image load error gracefully', async () => {
    render(<ProgressiveImage {...mockProps} priority={true} />);
    
    const images = screen.getAllByAltText('Test image');
    
    // Simulate error on all images
    images.forEach(img => {
      img.dispatchEvent(new Event('error'));
    });
    
    await waitFor(() => {
      expect(screen.getByText('Image unavailable')).toBeInTheDocument();
    });
  });

  it('calls onLoad callback when image loads', () => {
    const onLoad = jest.fn();
    render(<ProgressiveImage {...mockProps} onLoad={onLoad} priority={true} />);
    
    const images = screen.getAllByAltText('Test image');
    // Trigger load on the high quality image (last one)
    const lastImage = images[images.length - 1];
    if (lastImage) {
      lastImage.dispatchEvent(new Event('load'));
    }
    
    expect(onLoad).toHaveBeenCalled();
  });

  it('calls onError callback when image fails to load', () => {
    const onError = jest.fn();
    render(<ProgressiveImage {...mockProps} onError={onError} priority={true} />);
    
    const images = screen.getAllByAltText('Test image');
    // Trigger error on first image
    const firstImage = images[0];
    if (firstImage) {
      firstImage.dispatchEvent(new Event('error'));
    }
    
    expect(onError).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProgressiveImage {...mockProps} className="custom-class" priority={true} />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles fill prop correctly', () => {
    render(<ProgressiveImage {...mockProps} fill={true} priority={true} />);
    
    const images = screen.getAllByAltText('Test image');
    // Check the high quality image has the correct src
    const highQualityImage = images.find(img => img.getAttribute('src') === '/test-image.jpg');
    expect(highQualityImage).toBeInTheDocument();
  });

  it('applies correct quality settings', () => {
    render(
      <ProgressiveImage 
        {...mockProps} 
        quality={95}
        lowQuality={10}
        priority={true}
      />
    );
    
    const images = screen.getAllByAltText('Test image');
    // Check that we have both low and high quality images when progressive loading
    expect(images.length).toBeGreaterThan(0);
    // Check low quality image has query param
    const lowQualityImage = images.find(img => img.getAttribute('src')?.includes('?q='));
    expect(lowQualityImage).toBeInTheDocument();
  });
});