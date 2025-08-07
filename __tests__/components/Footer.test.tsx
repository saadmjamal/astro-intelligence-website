import { render, screen } from '@/utils/test-utils';
import Footer from '@/components/Footer';

describe('Footer', () => {
  it('renders footer with all sections', () => {
    render(<Footer />);
    
    // Check main sections exist
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Footer />);
    
    // Company links
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /careers/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
    
    // Service links
    expect(screen.getByRole('link', { name: /ai consulting/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cloud architecture/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ml engineering/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /strategic partnerships/i })).toBeInTheDocument();
    
    // Resources links
    expect(screen.getByRole('link', { name: /scripts/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /research lab/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /case studies/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /documentation/i })).toBeInTheDocument();
    
    // Legal links
    expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /terms of service/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cookie policy/i })).toBeInTheDocument();
  });

  it('renders social links', () => {
    const { container } = render(<Footer />);
    
    // Check that social links exist using their href attributes
    const githubLink = container.querySelector('a[href="https://github.com/astro-intelligence"]');
    const linkedinLink = container.querySelector('a[href="https://linkedin.com/company/astro-intelligence"]');
    
    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    
    // Verify they have the correct target and rel attributes for external links
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders copyright notice', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear} Astro Intelligence Inc`, 'i'))).toBeInTheDocument();
  });

  it('has proper semantic HTML structure', () => {
    const { container } = render(<Footer />);
    
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
    
    const navElements = container.querySelectorAll('nav');
    expect(navElements.length).toBeGreaterThan(0);
  });

  it('renders company logo', () => {
    render(<Footer />);
    
    const logo = screen.getByTestId('footer-logo');
    expect(logo).toBeInTheDocument();
  });
});