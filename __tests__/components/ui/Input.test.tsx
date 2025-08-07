import { render, screen, fireEvent } from '@/utils/test-utils';
import Input from '@/components/ui/Input';

describe('Input', () => {
  it('renders input with label', () => {
    render(<Input label="Test Label" name="test" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders input without label', () => {
    render(<Input name="test" placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Input name="test" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays error message', () => {
    render(<Input name="test" error={true} helperText="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('applies error styling when error is present', () => {
    render(<Input name="test" error={true} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');
  });

  it('renders required indicator', () => {
    render(<Input label="Test Label" name="test" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<Input name="test" helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('supports different input types', () => {
    render(<Input name="test" type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('supports disabled state', () => {
    render(<Input name="test" disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('supports different variants', () => {
    render(<Input name="test" variant="outlined" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-2');
  });

  it('applies custom className', () => {
    render(<Input name="test" className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Input name="test" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('renders with left icon', () => {
    const Icon = () => <svg data-testid="test-icon" />;
    render(<Input name="test" leftIcon={<Icon />} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    const Icon = () => <svg data-testid="test-icon" />;
    render(<Input name="test" rightIcon={<Icon />} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });
});