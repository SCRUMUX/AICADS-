/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RangeSlider } from './RangeSlider';

const SIZES = ['sm', 'md', 'lg'] as const;

const meta: Meta<typeof RangeSlider> = {
  title: 'Primitives/RangeSlider',
  component: RangeSlider,
  parameters: {
    docs: {
      description: {
        component:
          'Dual-thumb range slider for min/max value selection. 3 sizes (sm/md/lg), states base/hover/disabled.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: SIZES },
    disabled: { control: 'boolean' },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    step: { control: { type: 'number' } },
  },
  args: { size: 'md', min: 0, max: 100, step: 1 },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
  render: (args) => {
    const [val, setVal] = useState<[number, number]>([25, 75]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <RangeSlider {...args} value={val} onChange={setVal} />
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
          Range: {val[0]} — {val[1]}
        </div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}>
      {SIZES.map((s) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 24, fontSize: 12, color: 'var(--color-text-muted)', flexShrink: 0 }}>{s}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <RangeSlider {...args} size={s} value={[25, 75]} onChange={() => {}} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, value: [30, 70] },
};
