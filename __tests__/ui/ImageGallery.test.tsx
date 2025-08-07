import React from 'react';
import { render, screen, fireEvent, waitFor } from '@/utils/test-utils';
import { ImageGallery, type GalleryImage } from '@/components/ui/ImageGallery';

const mockImages: GalleryImage[] = [
  {
    src: '/test-image-1.jpg',
    alt: 'Test Image 1',
    caption: 'First test image',
  },
  {
    src: '/test-image-2.jpg',
    alt: 'Test Image 2',
    caption: 'Second test image',
  },
  {
    src: '/test-image-3.jpg',
    alt: 'Test Image 3',
    caption: 'Third test image',
  },
];

describe('ImageGallery', () => {
  it('renders all images correctly', () => {
    render(<ImageGallery images={mockImages} />);
    
    expect(screen.getByAltText('Test Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Test Image 2')).toBeInTheDocument();
    expect(screen.getByAltText('Test Image 3')).toBeInTheDocument();
  });

  it('displays captions correctly', () => {
    render(<ImageGallery images={mockImages} />);
    
    expect(screen.getByText('First test image')).toBeInTheDocument();
    expect(screen.getByText('Second test image')).toBeInTheDocument();
    expect(screen.getByText('Third test image')).toBeInTheDocument();
  });

  it('opens lightbox when image is clicked', () => {
    render(<ImageGallery images={mockImages} />);
    
    const firstImage = screen.getByLabelText('View Test Image 1');
    fireEvent.click(firstImage);
    
    // Should show modal with navigation controls
    expect(screen.getByLabelText('Close gallery')).toBeInTheDocument();
    expect(screen.getByLabelText('Previous image')).toBeInTheDocument();
    expect(screen.getByLabelText('Next image')).toBeInTheDocument();
  });

  it('navigates between images in lightbox', () => {
    render(<ImageGallery images={mockImages} />);
    
    // Open lightbox
    const firstImage = screen.getByLabelText('View Test Image 1');
    fireEvent.click(firstImage);
    
    // Navigate to next image
    const nextButton = screen.getByLabelText('Next image');
    fireEvent.click(nextButton);
    
    // Should show second image in lightbox
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  it('closes lightbox when close button is clicked', async () => {
    render(<ImageGallery images={mockImages} />);
    
    // Open lightbox
    const firstImage = screen.getByLabelText('View Test Image 1');
    fireEvent.click(firstImage);
    
    // Close lightbox
    const closeButton = screen.getByLabelText('Close gallery');
    fireEvent.click(closeButton);
    
    // Wait for animation to complete
    await waitFor(() => {
      expect(screen.queryByLabelText('Close gallery')).not.toBeInTheDocument();
    });
  });

  it('handles keyboard navigation in lightbox', async () => {
    render(<ImageGallery images={mockImages} />);
    
    // Open lightbox
    const firstImage = screen.getByLabelText('View Test Image 1');
    fireEvent.click(firstImage);
    
    // Test right arrow key
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    
    // Test left arrow key
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
    
    // Test escape key - Modal component handles this
    fireEvent.keyDown(document, { key: 'Escape' });
    
    // Wait for animation to complete
    await waitFor(() => {
      expect(screen.queryByLabelText('Close gallery')).not.toBeInTheDocument();
    });
  });

  it('handles zoom controls in lightbox', () => {
    render(<ImageGallery images={mockImages} />);
    
    // Open lightbox
    const firstImage = screen.getByLabelText('View Test Image 1');
    fireEvent.click(firstImage);
    
    const zoomInButton = screen.getByLabelText('Zoom in');
    const zoomOutButton = screen.getByLabelText('Zoom out');
    
    // Test zoom in
    fireEvent.click(zoomInButton);
    expect(screen.getByText('150%')).toBeInTheDocument();
    
    // Test zoom out
    fireEvent.click(zoomOutButton);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('applies correct grid columns class', () => {
    const { container } = render(<ImageGallery images={mockImages} columns={2} />);
    
    const gallery = container.firstChild;
    expect(gallery).toHaveClass('md:grid-cols-2');
  });

  it('applies correct aspect ratio class', () => {
    const { container } = render(<ImageGallery images={mockImages} aspectRatio="square" />);
    
    const imageContainers = container.querySelectorAll('[class*="aspect-square"]');
    expect(imageContainers.length).toBeGreaterThan(0);
  });

  it('renders empty state when no images provided', () => {
    const { container } = render(<ImageGallery images={[]} />);
    
    const gallery = container.firstChild;
    expect((gallery as Element)?.children).toHaveLength(0);
  });
});