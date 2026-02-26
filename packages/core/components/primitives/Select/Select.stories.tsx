/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
];

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  parameters: {
    docs: { description: { component: 'Select dropdown styled identically to Dropdown/Input. appearance (base, ghost, outline), 3 sizes (sm/md/lg).' } },
  },
  argTypes: {
    appearance: { control: 'select', options: ['base', 'ghost', 'outline'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    size: 'sm',
    appearance: 'base',
    options: sampleOptions,
    placeholder: 'Choose a fruit...',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [val, setVal] = useState('banana');
    return (
      <div style={{ padding: 16, minHeight: 240, maxWidth: 320 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>
          Controlled: <strong>{val || 'нет'}</strong>
        </p>
        <Select {...args} options={sampleOptions} value={val} onChange={setVal} />
      </div>
    );
  },
  args: { size: 'sm' },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)', padding: 'var(--space-16)', maxWidth: 320 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)' }}>
          <span style={{ width: 28, fontSize: 12, color: 'var(--color-text-muted)' }}>{s}</span>
          <Select {...args} size={s} placeholder={`Size ${s}`} />
        </div>
      ))}
    </div>
  ),
  args: { options: sampleOptions },
};

export const Appearances: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)', padding: 'var(--space-16)', maxWidth: 320 }}>
      {(['base', 'ghost', 'outline'] as const).map((a) => (
        <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)' }}>
          <span style={{ width: 56, fontSize: 12, color: 'var(--color-text-muted)' }}>{a}</span>
          <Select {...args} appearance={a} placeholder={`${a} appearance`} />
        </div>
      ))}
    </div>
  ),
  args: { size: 'sm', options: sampleOptions },
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)', padding: 'var(--space-16)', maxWidth: 320 }}>
      <Select {...args} placeholder="Default" />
      <Select {...args} placeholder="Disabled" disabled />
      <Select {...args} placeholder="Error" error />
    </div>
  ),
  args: { size: 'sm', options: sampleOptions },
};

export const FullWidth: Story = {
  render: (args) => (
    <div style={{ padding: 'var(--space-16)', width: 400 }}>
      <Select {...args} fullWidth />
    </div>
  ),
  args: { size: 'sm', options: sampleOptions, placeholder: 'Full width select' },
};

