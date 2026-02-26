/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';

const SIZES = ['sm', 'md', 'lg'] as const;

const meta: Meta<typeof Rating> = {
  title: 'Primitives/Rating',
  component: Rating,
  parameters: {
    docs: {
      description: {
        component: 'Star rating component. 3 sizes (sm/md/lg), readonly or interactive, values 0-5.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: SIZES },
    readonly: { control: 'boolean' },
    max: { control: { type: 'number' } },
  },
  args: { size: 'md', max: 5 },
};
export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  render: (args) => {
    const [val, setVal] = useState(3);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Rating {...args} value={val} onChange={setVal} />
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Value: {val}</div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
      {SIZES.map((s) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 28, fontSize: 12, color: 'var(--color-text-muted)' }}>{s}</span>
          <Rating {...args} size={s} value={3} onChange={() => {}} />
        </div>
      ))}
    </div>
  ),
};

export const Readonly: Story = {
  args: { readonly: true, value: 4 },
};

export const Values: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24 }}>
      {[0, 1, 2, 3, 4, 5].map((v) => (
        <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 20, fontSize: 12, color: 'var(--color-text-muted)' }}>{v}</span>
          <Rating size="md" value={v} readonly />
        </div>
      ))}
    </div>
  ),
};
