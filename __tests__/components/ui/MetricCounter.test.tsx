import { render, screen } from '@/utils/test-utils';
import { MetricCounter } from '@/components/ui/MetricCounter';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    span: ({ children }: any) => <span>{children}</span>,
  },
  useInView: () => true,
  animate: jest.fn((_from, to, options) => {
    // Immediately call onUpdate with the final value
    if (options?.onUpdate) {
      options.onUpdate(to);
    }
    // Return a mock controls object with stop method
    return {
      stop: jest.fn(),
    };
  }),
}));

describe('MetricCounter', () => {
  it('renders with value and label', () => {
    render(<MetricCounter value={100} label="Test Metric" />);
    
    expect(screen.getByText('100')).toBeInTheDocument(); // Mocked animate shows final value immediately
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
  });

  it('renders with suffix', () => {
    render(<MetricCounter value={95} label="Success Rate" suffix="%" />);
    
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('95%');
  });

  it('renders with prefix', () => {
    render(<MetricCounter value={1000} label="Revenue" prefix="$" />);
    
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('$1,000');
  });

  it('renders with custom duration', () => {
    render(<MetricCounter value={50} label="Projects" duration={3} />);
    
    // Value should still be rendered (mocked animate shows end value immediately)
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('renders label correctly', () => {
    render(<MetricCounter value={75} label="Clients" />);
    
    expect(screen.getByText('Clients')).toBeInTheDocument();
  });

  it('renders as a div with text-center class', () => {
    const { container } = render(
      <MetricCounter value={42} label="Answer" />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.tagName).toBe('DIV');
    expect(wrapper).toHaveClass('text-center');
  });

  it('formats large numbers with separator', () => {
    render(<MetricCounter value={1000000} label="Large Number" />);
    
    // The component uses toLocaleString to format numbers
    expect(screen.getByText('1,000,000')).toBeInTheDocument();
  });

  it('renders with suffix and prefix together', () => {
    render(<MetricCounter value={99} label="Percentage" prefix="~" suffix="%" />);
    
    // All parts are rendered within the same heading element
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('~99%');
  });

  it('uses default duration when not specified', () => {
    render(<MetricCounter value={123} label="Default Duration" />);
    
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('handles zero value', () => {
    render(<MetricCounter value={0} label="Zero Metric" />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});