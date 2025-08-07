import type { Meta, StoryObj } from '@storybook/nextjs';

import Input from '@/components/ui/Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled', 'ghost'],
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters long',
  },
};

export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    error: true,
    helperText: 'Username is already taken',
    defaultValue: 'admin',
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-[350px]">
      <Input
        label="Search"
        placeholder="Search..."
        leftIcon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
      />
      <Input
        label="Amount"
        placeholder="0.00"
        leftIcon={<span>$</span>}
        rightIcon={<span>USD</span>}
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-[350px]">
      <Input variant="default" label="Default" placeholder="Default input" />
      <Input variant="outlined" label="Outlined" placeholder="Outlined input" />
      <Input variant="filled" label="Filled" placeholder="Filled input" />
      <Input variant="ghost" label="Ghost" placeholder="Ghost input" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-[350px]">
      <Input label="Normal" placeholder="Normal state" />
      <Input label="Focused" placeholder="Click to focus" />
      <Input label="Disabled" placeholder="Disabled input" disabled />
      <Input label="Read Only" placeholder="Read only input" readOnly value="Read only value" />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-[350px]">
      <Input type="text" label="Text" placeholder="Text input" />
      <Input type="email" label="Email" placeholder="email@example.com" />
      <Input type="password" label="Password" placeholder="Password" />
      <Input type="number" label="Number" placeholder="123" />
      <Input type="tel" label="Phone" placeholder="+1 (555) 000-0000" />
      <Input type="url" label="URL" placeholder="https://example.com" />
    </div>
  ),
};