import type { Meta, StoryObj } from '@storybook/nextjs';
import Badge from './Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'destructive', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Error',
    variant: 'destructive',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Badge size="sm">Small Badge</Badge>
        <Badge size="md">Medium Badge</Badge>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="outline" size="sm">Small Outline</Badge>
        <Badge variant="outline" size="md">Medium Outline</Badge>
      </div>
    </div>
  ),
};

export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col grid-gap">
      <div className="flex gap-2">
        <Badge variant="default">Premium</Badge>
        <Badge variant="success">Free</Badge>
      </div>
      <div className="flex gap-2">
        <Badge variant="secondary">TypeScript</Badge>
        <Badge variant="secondary">Python</Badge>
        <Badge variant="secondary">Go</Badge>
      </div>
      <div className="flex gap-2">
        <Badge variant="outline">automation</Badge>
        <Badge variant="outline">ml-pipeline</Badge>
        <Badge variant="outline">deployment</Badge>
      </div>
    </div>
  ),
};