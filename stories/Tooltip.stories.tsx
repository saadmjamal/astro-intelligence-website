import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '@/components/ui/Tooltip';
import { Button } from '@/components/ui/Button';

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const Positions: Story = {
  args: {
    content: 'Tooltip content',
    children: <Button variant="secondary">Hover me</Button>,
  },
  render: (args) => (
    <div className="flex grid-gap-md items-center justify-center p-20">
      <Tooltip {...args} content="Top tooltip" side="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip {...args} content="Right tooltip" side="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
      <Tooltip {...args} content="Bottom tooltip" side="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip {...args} content="Left tooltip" side="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    content: 'This is a much longer tooltip content that demonstrates how the tooltip handles longer text',
    children: <Button>Hover for long tooltip</Button>,
  },
};

export const CustomDelay: Story = {
  args: {
    content: 'This tooltip has a longer delay',
    delayDuration: 1000,
    children: <Button>Hover and wait</Button>,
  },
};