import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@/components/ui/Select';
import { useState } from 'react';

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

export const Default: Story = {
  args: {
    options,
    placeholder: 'Select a framework',
  },
};

export const WithValue: Story = {
  args: {
    options,
    value: 'react',
    placeholder: 'Select a framework',
  },
};

export const Controlled: Story = {
  args: {
    options,
    placeholder: 'Select a framework',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    
    return (
      <div className="w-64 stack">
        <Select
          {...args}
          value={value}
          onChange={setValue}
        />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Selected value: {value || 'none'}
        </p>
      </div>
    );
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue', disabled: true },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte', disabled: true },
    ],
    placeholder: 'Some options are disabled',
  },
};

export const Error: Story = {
  args: {
    options,
    error: true,
    placeholder: 'Select a framework',
  },
};

export const Disabled: Story = {
  args: {
    options,
    disabled: true,
    value: 'react',
    placeholder: 'Select a framework',
  },
};

export const LongLabels: Story = {
  args: {
    options: [
      { value: 'option1', label: 'This is a very long option label that might need to be truncated' },
      { value: 'option2', label: 'Another extremely long option label to test the component behavior' },
      { value: 'option3', label: 'Short label' },
    ],
    placeholder: 'Select an option',
    className: 'w-64',
  },
};