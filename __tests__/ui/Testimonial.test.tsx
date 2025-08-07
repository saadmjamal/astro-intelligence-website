import React from 'react';
import { render, screen, fireEvent, waitFor } from '@/utils/test-utils';
import {
  TestimonialCard,
  TestimonialCarousel,
  TestimonialGrid,
  TestimonialSection,
  type Testimonial,
} from '@/components/ui/Testimonial';

const mockTestimonial: Testimonial = {
  id: '1',
  content: 'This is a great testimonial content',
  author: {
    name: 'John Doe',
    title: 'CEO',
    company: 'Tech Corp',
    image: '/images/john.jpg',
  },
  rating: 5,
  project: 'Cloud Migration',
  featured: true,
};

const mockTestimonials: Testimonial[] = [
  mockTestimonial,
  {
    id: '2',
    content: 'Another amazing testimonial',
    author: {
      name: 'Jane Smith',
      title: 'CTO',
      company: 'StartUp Inc',
    },
    rating: 4,
    project: 'AI Implementation',
  },
  {
    id: '3',
    content: 'Third testimonial content',
    author: {
      name: 'Bob Johnson',
      title: 'VP Engineering',
      company: 'Enterprise Co',
    },
    rating: 5,
  },
];

describe('TestimonialCard', () => {
  it('renders testimonial content correctly', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    expect(screen.getByText('"This is a great testimonial content"')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('CEO at Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Cloud Migration')).toBeInTheDocument();
  });

  it('renders rating stars correctly', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    // Find the rating container by class and check for stars
    const ratingContainer = document.querySelector('.flex.gap-1.mb-4');
    const stars = ratingContainer?.querySelectorAll('svg');
    expect(stars?.length).toBe(5);
  });

  it('renders author image when provided', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    const image = screen.getByAltText('John Doe');
    expect(image).toBeInTheDocument();
    // Next.js Image component transforms the src, so just check it includes the path
    expect(image.getAttribute('src')).toContain('/images/john.jpg');
  });

  it('renders initials when no image provided', () => {
    const testimonialNoImage = { ...mockTestimonial, author: { ...mockTestimonial.author, image: undefined } };
    render(<TestimonialCard testimonial={testimonialNoImage} />);
    
    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});

describe('TestimonialCarousel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders all testimonials in carousel', () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} autoPlay={false} />);
    
    expect(screen.getByText('"This is a great testimonial content"')).toBeInTheDocument();
  });

  it('shows navigation buttons when multiple testimonials', () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} autoPlay={false} />);
    
    expect(screen.getByLabelText('Previous testimonial')).toBeInTheDocument();
    expect(screen.getByLabelText('Next testimonial')).toBeInTheDocument();
  });

  it('navigates to next testimonial on button click', () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} autoPlay={false} />);
    
    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton);
    
    // The carousel should now show the second testimonial
    expect(screen.getByText('"Another amazing testimonial"')).toBeInTheDocument();
  });

  it('navigates to previous testimonial on button click', () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} autoPlay={false} />);
    
    const prevButton = screen.getByLabelText('Previous testimonial');
    fireEvent.click(prevButton);
    
    // Should wrap to last testimonial
    expect(screen.getByText('"Third testimonial content"')).toBeInTheDocument();
  });

  it('auto-advances testimonials when autoPlay is true', async () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} autoPlay={true} interval={1000} />);
    
    expect(screen.getByText('"This is a great testimonial content"')).toBeInTheDocument();
    
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByText('"Another amazing testimonial"')).toBeInTheDocument();
    });
  });

  it('shows indicators for each testimonial', () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} autoPlay={false} />);
    
    const indicators = screen.getAllByLabelText(/Go to testimonial/);
    expect(indicators).toHaveLength(3);
  });
});

describe('TestimonialGrid', () => {
  it('renders all testimonials in grid layout', () => {
    render(<TestimonialGrid testimonials={mockTestimonials} />);
    
    expect(screen.getByText('"This is a great testimonial content"')).toBeInTheDocument();
    expect(screen.getByText('"Another amazing testimonial"')).toBeInTheDocument();
    expect(screen.getByText('"Third testimonial content"')).toBeInTheDocument();
  });

  it('applies correct grid columns class', () => {
    const { container } = render(<TestimonialGrid testimonials={mockTestimonials} columns={2} />);
    
    const grid = container.firstChild;
    expect(grid).toHaveClass('md:grid-cols-2');
  });
});

describe('TestimonialSection', () => {
  it('renders section with title and subtitle', () => {
    render(
      <TestimonialSection
        title="Customer Reviews"
        subtitle="See what people say"
        testimonials={mockTestimonials}
      />
    );
    
    expect(screen.getByText('Customer Reviews')).toBeInTheDocument();
    expect(screen.getByText('See what people say')).toBeInTheDocument();
  });

  it('renders carousel variant by default', () => {
    render(<TestimonialSection testimonials={mockTestimonials} />);
    
    expect(screen.getByLabelText('Previous testimonial')).toBeInTheDocument();
  });

  it('renders grid variant when specified', () => {
    render(<TestimonialSection testimonials={mockTestimonials} variant="grid" />);
    
    // Should not have carousel navigation
    expect(screen.queryByLabelText('Previous testimonial')).not.toBeInTheDocument();
    
    // Should show all testimonials at once
    expect(screen.getByText('"This is a great testimonial content"')).toBeInTheDocument();
    expect(screen.getByText('"Another amazing testimonial"')).toBeInTheDocument();
    expect(screen.getByText('"Third testimonial content"')).toBeInTheDocument();
  });
});