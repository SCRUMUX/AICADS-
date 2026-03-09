import type { Meta, StoryObj } from '@storybook/react';
import { MetricRow } from './MetricRow';

const meta: Meta<typeof MetricRow> = {
  title: 'Blocks/MetricRow',
  component: MetricRow,
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
      description: 'Размер: sm — мобильный/компактный, md — десктоп',
    },
    deltaVariant: {
      control: 'inline-radio',
      options: ['positive', 'negative', 'muted'],
    },
  },
  args: {
    size: 'md',
    label: 'Revenue',
    value: '$12,480',
    delta: '+8.2%',
    deltaVariant: 'positive',
    description: 'vs. last month',
  },
};

export default meta;
type Story = StoryObj<typeof MetricRow>;

export const Default: Story = {};

export const SizeSm: Story = {
  name: 'Size SM (mobile)',
  args: {
    size: 'sm',
    label: 'Revenue',
    value: '$12,480',
    delta: '+8.2%',
    deltaVariant: 'positive',
    description: 'vs. last month',
  },
};

export const SizeMd: Story = {
  name: 'Size MD (desktop)',
  args: {
    size: 'md',
    label: 'Revenue',
    value: '$12,480',
    delta: '+8.2%',
    deltaVariant: 'positive',
    description: 'vs. last month',
  },
};

export const NegativeDelta: Story = {
  args: {
    label: 'Churn rate',
    value: '4.3%',
    delta: '+1.1%',
    deltaVariant: 'negative',
    description: 'increased from 3.2%',
  },
};

export const MutedDelta: Story = {
  args: {
    label: 'Active users',
    value: '1,024',
    delta: '0%',
    deltaVariant: 'muted',
  },
};

export const NoDescription: Story = {
  args: {
    label: 'Conversion',
    value: '3.7%',
    delta: '+0.5%',
    deltaVariant: 'positive',
    description: undefined,
  },
};

export const ValueOnly: Story = {
  args: {
    label: 'Total orders',
    value: '842',
    delta: undefined,
    description: undefined,
  },
};

export const ResponsiveComparison: Story = {
  name: 'SM vs MD (side by side)',
  render: () => (
    <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, padding: 16, border: '1px dashed var(--color-border-base, #e5e7eb)', borderRadius: 8 }}>
        <div style={{ marginBottom: 8, fontSize: 11, color: '#999' }}>size=&quot;sm&quot; (mobile)</div>
        <MetricRow size="sm" label="Revenue" value="$12,480" delta="+8.2%" deltaVariant="positive" description="vs. last month" />
      </div>
      <div style={{ flex: 1, padding: 16, border: '1px dashed var(--color-border-base, #e5e7eb)', borderRadius: 8 }}>
        <div style={{ marginBottom: 8, fontSize: 11, color: '#999' }}>size=&quot;md&quot; (desktop)</div>
        <MetricRow size="md" label="Revenue" value="$12,480" delta="+8.2%" deltaVariant="positive" description="vs. last month" />
      </div>
    </div>
  ),
};
