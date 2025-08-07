import { render, screen } from '@/utils/test-utils';
import Badge from '@/components/ui/Badge';

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-gray-100');
  });

  it('renders with default variant', () => {
    render(<Badge variant="default">Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-primary');
  });

  it('renders with outline variant', () => {
    render(<Badge variant="outline">Outline Badge</Badge>);
    const badge = screen.getByText('Outline Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('border');
  });

  it('renders with destructive variant', () => {
    render(<Badge variant="destructive">Destructive Badge</Badge>);
    const badge = screen.getByText('Destructive Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-100');
  });

  it('renders with success variant', () => {
    render(<Badge variant="success">Success Badge</Badge>);
    const badge = screen.getByText('Success Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-100');
  });

  it('renders with small size', () => {
    render(<Badge size="sm">Small Badge</Badge>);
    const badge = screen.getByText('Small Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-xs');
  });

  it('renders with medium size', () => {
    render(<Badge size="md">Medium Badge</Badge>);
    const badge = screen.getByText('Medium Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-sm');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('renders with secondary variant', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badge = screen.getByText('Secondary Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-gray-100');
  });

  it('combines variant and size classes correctly', () => {
    render(
      <Badge variant="outline" size="sm">
        Combined Badge
      </Badge>
    );
    const badge = screen.getByText('Combined Badge');
    expect(badge).toHaveClass('border');
    expect(badge).toHaveClass('text-xs');
  });
});