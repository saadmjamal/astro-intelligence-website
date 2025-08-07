import type { Meta, StoryObj } from '@storybook/nextjs';

import Card, {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated', 'glass'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="card-padding-sm">
        <h3 className="text-xl font-semibold">Default Card</h3>
        <p className="mt-2 text-gray-600">This is a basic card with default styling.</p>
      </div>
    ),
  },
};

export const WithHeader: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card. You can put any content here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    className: 'w-[350px]',
    children: (
      <div className="card-padding-sm">
        <h3 className="text-xl font-semibold">Outlined Card</h3>
        <p className="mt-2 text-gray-600">This card has an outlined border style.</p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    className: 'w-[350px]',
    children: (
      <div className="card-padding-sm">
        <h3 className="text-xl font-semibold">Elevated Card</h3>
        <p className="mt-2 text-gray-600">This card has a shadow for elevation effect.</p>
      </div>
    ),
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    className: 'w-[350px]',
    children: (
      <div className="card-padding-sm">
        <h3 className="text-xl font-semibold">Glass Card</h3>
        <p className="mt-2 text-gray-600">This card has a glassmorphism effect.</p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-to-br from-magenta-500/20 to-purple-500/20 p-20">
        <Story />
      </div>
    ),
  ],
};

export const CustomPadding: Story = {
  args: {
    padding: 'xl',
    className: 'w-[350px]',
    children: (
      <div>
        <h3 className="text-xl font-semibold">Extra Large Padding</h3>
        <p className="mt-2 text-gray-600">This card has extra large padding.</p>
      </div>
    ),
  },
};

export const FullRounded: Story = {
  args: {
    rounded: 'full',
    className: 'w-[350px]',
    children: (
      <div className="card-padding-sm text-center">
        <h3 className="text-xl font-semibold">Fully Rounded Card</h3>
        <p className="mt-2 text-gray-600">This card has fully rounded corners.</p>
      </div>
    ),
  },
};