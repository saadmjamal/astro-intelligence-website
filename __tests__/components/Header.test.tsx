import { render } from '@/utils/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import Header from '@/components/Header';

expect.extend(toHaveNoViolations);

describe('Header Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper navigation landmarks', () => {
    const { container } = render(<Header />);
    
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label');
  });

  it('should have accessible mobile menu button', () => {
    const { getByRole } = render(<Header />);
    
    const menuButton = getByRole('button', { name: /open navigation menu/i });
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});