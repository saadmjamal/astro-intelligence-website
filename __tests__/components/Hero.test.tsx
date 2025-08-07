import { render, screen } from '@/utils/test-utils';
import Hero from '@/components/Hero';

describe('Hero', () => {
  it('renders the main heading', () => {
    render(<Hero />);
    expect(screen.getByText(/Human-First AI for Cloud Operations/i)).toBeInTheDocument();
  });

  it('renders the value proposition', () => {
    render(<Hero />);
    expect(screen.getByText(/Orchestrate your infrastructure/i)).toBeInTheDocument();
    expect(screen.getByText(/cut cloud costs by up to 30%/i)).toBeInTheDocument();
    expect(screen.getByText(/automate VDI with ethical AI/i)).toBeInTheDocument();
  });

  it('renders the CTA buttons', () => {
    render(<Hero />);
    const consultationButton = screen.getByRole('link', { name: /Schedule a Consultation/i });
    const caseStudiesButton = screen.getByRole('link', { name: /View Case Studies/i });
    
    expect(consultationButton).toBeInTheDocument();
    expect(consultationButton).toHaveAttribute('href', '/contact');
    expect(caseStudiesButton).toBeInTheDocument();
    expect(caseStudiesButton).toHaveAttribute('href', '/portfolio');
  });

  it('renders the subtitle description', () => {
    render(<Hero />);
    expect(screen.getByText(/Trusted by enterprises to deliver intelligent automation/i)).toBeInTheDocument();
    expect(screen.getByText(/reduce operational costs/i)).toBeInTheDocument();
  });

  it('renders key benefit metrics', () => {
    render(<Hero />);
    // Check for metric values
    expect(screen.getByText(/30% Cost Reduction/i)).toBeInTheDocument();
    expect(screen.getByText(/5× Faster Deployment/i)).toBeInTheDocument();
    
    // Look for the specific metric element, not the paragraph text
    const metricsSection = screen.getByText(/30% Cost Reduction/i).closest('div')?.parentElement;
    expect(metricsSection).toHaveTextContent('Ethical AI Practices');
  });

  it('renders professional badge', () => {
    render(<Hero />);
    expect(screen.getByText(/Cloud Engineer & AI Specialist/i)).toBeInTheDocument();
  });

  it('renders trust indicators', () => {
    render(<Hero />);
    expect(screen.getByText(/Free initial consultation/i)).toBeInTheDocument();
    expect(screen.getByText(/No commitment required/i)).toBeInTheDocument();
    expect(screen.getByText(/100% confidential/i)).toBeInTheDocument();
  });

  it('renders decorative elements', () => {
    const { container } = render(<Hero />);
    // Check for gradient backgrounds
    const gradients = container.querySelectorAll('[class*="gradient"]');
    expect(gradients.length).toBeGreaterThan(0);
  });

  it('has proper semantic structure', () => {
    const { container } = render(<Hero />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    
    // Check for main heading
    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();
  });

  it('renders with non-personal brand variant', () => {
    render(<Hero showPersonalBrand={false} tagline="Custom tagline" />);
    expect(screen.getByText(/Astro Intelligence/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom tagline/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book a Discovery Call/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore Services/i })).toBeInTheDocument();
  });
});