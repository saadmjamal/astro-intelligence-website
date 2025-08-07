import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { useState } from 'react';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default alert message.',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="stack">
      <Alert variant="default">
        <AlertDescription>This is a default alert with neutral styling.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertDescription>This is an informational alert.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertDescription>This is a success alert.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertDescription>This is a warning alert.</AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertDescription>This is an error alert.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithTitles: Story = {
  render: () => (
    <div className="stack">
      <Alert variant="info" title="Information">
        <AlertDescription>This alert has a title and description.</AlertDescription>
      </Alert>
      <Alert variant="success" title="Success!">
        <AlertDescription>Your changes have been saved successfully.</AlertDescription>
      </Alert>
      <Alert variant="warning" title="Warning">
        <AlertDescription>Please review your input before continuing.</AlertDescription>
      </Alert>
      <Alert variant="error" title="Error">
        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [alerts, setAlerts] = useState([
      { id: 1, variant: 'info' as const, title: 'Info', message: 'This alert can be dismissed.' },
      { id: 2, variant: 'success' as const, title: 'Success', message: 'Operation completed successfully.' },
      { id: 3, variant: 'warning' as const, title: 'Warning', message: 'Please be careful.' },
      { id: 4, variant: 'error' as const, title: 'Error', message: 'An error occurred.' },
    ]);

    const dismissAlert = (id: number) => {
      setAlerts(alerts.filter(alert => alert.id !== id));
    };

    return (
      <div className="stack">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.variant}
            title={alert.title}
            dismissible
            onDismiss={() => dismissAlert(alert.id)}
          >
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        ))}
        {alerts.length === 0 && (
          <p className="text-muted-foreground text-center py-8">
            All alerts have been dismissed!
          </p>
        )}
      </div>
    );
  },
};

export const ComplexContent: Story = {
  args: {
    variant: 'info',
    title: 'New features available',
    children: (
      <div className="space-y-2">
        <AlertDescription>We've added several new features to improve your experience:</AlertDescription>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Enhanced search functionality</li>
          <li>Improved performance metrics</li>
          <li>New collaboration tools</li>
        </ul>
      </div>
    ),
  },
};