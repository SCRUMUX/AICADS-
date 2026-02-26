/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';

const SIZES = ['sm', 'md', 'lg'] as const;

const meta: Meta<typeof FileUpload> = {
  title: 'Primitives/FileUpload',
  component: FileUpload,
  parameters: {
    docs: {
      description: {
        component:
          'File upload zone with drag-and-drop. States: idle, hover/dragover, uploading, done, error. Sizes sm/md/lg.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: SIZES },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    label: { control: 'text' },
    hint: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    size: 'md',
    label: 'Click or drag files here',
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, maxWidth: 400 }}>
      {SIZES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>size={s}</span>
          <FileUpload {...args} size={s} label={`Upload (${s})`} />
        </div>
      ))}
    </div>
  ),
  args: { label: 'Click or drag files here' },
};

export const WithHint: Story = {
  args: {
    size: 'md',
    label: 'Upload documents',
    hint: 'Max 10MB, PDF or images',
  },
};

export const Disabled: Story = {
  args: {
    size: 'md',
    label: 'Upload disabled',
    disabled: true,
  },
};
