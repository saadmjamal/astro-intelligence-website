import { render, screen } from '@/utils/test-utils';
import { Heading, Text } from '@/components/ui/Typography';

describe('Typography Components', () => {
  describe('Heading', () => {
    it('renders h1 variant correctly', () => {
      render(<Heading variant="h1">Test Heading</Heading>);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Heading');
    });

    it('renders h2 variant correctly', () => {
      render(<Heading variant="h2" as="h2">Test Heading</Heading>);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Heading');
    });

    it('renders h3 variant correctly', () => {
      render(<Heading variant="h3" as="h3">Test Heading</Heading>);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Heading');
    });

    it('renders h4 variant correctly', () => {
      render(<Heading variant="h4" as="h4">Test Heading</Heading>);
      const heading = screen.getByRole('heading', { level: 4 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Heading');
    });

    it('applies custom className', () => {
      render(<Heading variant="h1" className="custom-class">Test</Heading>);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('custom-class');
    });

    it('renders with correct default element', () => {
      render(<Heading variant="h1">Test</Heading>);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.tagName).toBe('H1');
    });

    it('allows custom element with as prop', () => {
      render(<Heading variant="h2" as="h3">Test</Heading>);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading.tagName).toBe('H3');
    });
  });

  describe('Text', () => {
    it('renders default variant correctly', () => {
      render(<Text>Test Text</Text>);
      const text = screen.getByText('Test Text');
      expect(text).toBeInTheDocument();
      expect(text.tagName).toBe('P');
    });

    it('renders small variant correctly', () => {
      render(<Text variant="small">Small Text</Text>);
      const text = screen.getByText('Small Text');
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass('text-sm');
    });

    it('renders caption variant correctly', () => {
      render(<Text variant="caption">Caption Text</Text>);
      const text = screen.getByText('Caption Text');
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass('font-body');
      expect(text).toHaveClass('leading-tight');
    });

    it('applies custom className', () => {
      render(<Text className="custom-class">Test</Text>);
      const text = screen.getByText('Test');
      expect(text).toHaveClass('custom-class');
    });

    it('allows custom element with as prop', () => {
      render(<Text as="span">Test</Text>);
      const text = screen.getByText('Test');
      expect(text.tagName).toBe('SPAN');
    });

    it('renders lead variant with correct styling', () => {
      render(<Text variant="lead">Lead Text</Text>);
      const text = screen.getByText('Lead Text');
      expect(text).toHaveClass('text-lg');
    });
  });
});