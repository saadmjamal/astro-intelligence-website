import { render, screen } from '@testing-library/react';
import { Picture } from '@/components/ui/Picture';

describe('Picture', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
  };

  it('renders with basic props', () => {
    render(<Picture {...defaultProps} />);
    
    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src');
  });

  it('generates source elements for different formats', () => {
    const { container } = render(
      <Picture {...defaultProps} formats={['avif', 'webp', 'jpeg']} />
    );
    
    const sources = container.querySelectorAll('source');
    expect(sources).toHaveLength(2); // avif and webp (jpeg is fallback)
    
    expect(sources[0]).toHaveAttribute('type', 'image/avif');
    expect(sources[1]).toHaveAttribute('type', 'image/webp');
  });

  it('applies custom sizes attribute', () => {
    const customSizes = '(max-width: 640px) 100vw, 50vw';
    const { container } = render(
      <Picture {...defaultProps} sizes={customSizes} />
    );
    
    const sources = container.querySelectorAll('source');
    sources.forEach(source => {
      expect(source).toHaveAttribute('sizes', customSizes);
    });
    
    const img = screen.getByAltText('Test image');
    expect(img).toHaveAttribute('sizes', customSizes);
  });

  it('sets loading attribute correctly', () => {
    const { rerender } = render(<Picture {...defaultProps} />);
    let img = screen.getByAltText('Test image');
    expect(img).toHaveAttribute('loading', 'lazy');
    
    rerender(<Picture {...defaultProps} priority={true} />);
    img = screen.getByAltText('Test image');
    expect(img).toHaveAttribute('loading', 'eager');
  });

  it('applies object-fit classes', () => {
    const { rerender } = render(
      <Picture {...defaultProps} objectFit="cover" />
    );
    let img = screen.getByAltText('Test image');
    expect(img).toHaveClass('object-cover');
    
    rerender(<Picture {...defaultProps} objectFit="contain" />);
    img = screen.getByAltText('Test image');
    expect(img).toHaveClass('object-contain');
  });

  it('sets aspect ratio when width and height provided', () => {
    render(<Picture {...defaultProps} width={800} height={600} />);
    
    const img = screen.getByAltText('Test image');
    expect(img).toHaveStyle({ aspectRatio: '800/600' });
  });

  it('generates srcset for responsive images', () => {
    render(
      <Picture 
        {...defaultProps} 
        breakpoints={[640, 1024, 1920]}
      />
    );
    
    const img = screen.getByAltText('Test image');
    const srcset = img.getAttribute('srcset');
    
    expect(srcset).toContain('640w');
    expect(srcset).toContain('1024w');
    expect(srcset).toContain('1920w');
  });

  it('uses custom quality setting', () => {
    render(<Picture {...defaultProps} quality={95} />);
    
    const img = screen.getByAltText('Test image');
    const src = img.getAttribute('src');
    
    // Should include quality parameter
    expect(src).toContain('q=95');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Picture {...defaultProps} className="custom-class" />
    );
    
    const picture = container.querySelector('picture');
    expect(picture).toHaveClass('custom-class');
  });
});