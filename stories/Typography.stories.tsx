import type { Meta, StoryObj } from '@storybook/nextjs';
import { Heading, Text } from '@/components/ui/Typography';

const meta = {
  title: 'UI/Typography',
  component: Heading,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  render: () => (
    <div className="stack">
      <Heading as="h1" variant="h1">
        Heading 1
      </Heading>
      <Heading as="h2" variant="h2">
        Heading 2
      </Heading>
      <Heading as="h3" variant="h3">
        Heading 3
      </Heading>
      <Heading as="h4" variant="h4">
        Heading 4
      </Heading>
      <Heading as="h5" variant="h5">
        Heading 5
      </Heading>
      <Heading as="h6" variant="h6">
        Heading 6
      </Heading>
    </div>
  ),
};

export const HeadingColors: Story = {
  render: () => (
    <div className="stack">
      <Heading as="h2" variant="h2" color="default">
        Default Color
      </Heading>
      <Heading as="h2" variant="h2" color="accent">
        Accent Color
      </Heading>
      <Heading as="h2" variant="h2" color="gradient">
        Gradient Color
      </Heading>
    </div>
  ),
};

export const TextVariants: Story = {
  render: () => (
    <div className="stack">
      <Text variant="lead">
        This is lead text. It's larger and draws attention to important introductory content.
      </Text>
      <Text variant="body">
        This is body text. It's the default text style used for most content throughout the
        application.
      </Text>
      <Text variant="small">
        This is small text. It's used for secondary information or fine print.
      </Text>
      <Text variant="caption">
        This is caption text. It's the smallest text size, used for labels or supporting
        information.
      </Text>
    </div>
  ),
};
