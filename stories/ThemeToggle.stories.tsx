import type { Meta, StoryObj } from '@storybook/nextjs';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="card-padding">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContext: Story = {
  render: () => (
    <div className="stack-lg">
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Theme Settings</h3>
        <ThemeToggle />
      </div>
      
      <div className="card-padding-sm bg-gray-100 dark:bg-gray-900 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Content Area</h3>
        <p className="text-muted-foreground">
          This content adapts to the selected theme. Toggle the theme to see the colors change.
        </p>
      </div>
    </div>
  ),
};

export const MultipleInstances: Story = {
  render: () => (
    <div className="stack">
      <div className="flex items-center gap-4">
        <span>Header:</span>
        <ThemeToggle />
      </div>
      <div className="flex items-center gap-4">
        <span>Settings:</span>
        <ThemeToggle />
      </div>
      <div className="flex items-center gap-4">
        <span>Footer:</span>
        <ThemeToggle />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        All toggles are synchronized through the ThemeProvider context.
      </p>
    </div>
  ),
};