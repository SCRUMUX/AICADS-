/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Primitives/FileUpload',
  component: FileUpload,
  parameters: {
    docs: { description: { component: "File upload zone with drag-and-drop. States: idle, hover/dragover, uploading, done, error. Sizes sm/md/lg." } },
  },
  argTypes: {
    size: { control: 'select', options: ["sm","md","lg"] },
    state: { control: 'select', options: ["idle","dragover","uploading","done","error"] },
  },
};
export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: { children: 'FileUpload', size: 'sm', state: 'idle' },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {["sm","md","lg"].map((s) => (
        <FileUpload key={s} {...args} size={s as any}>{s}</FileUpload>
      ))}
    </div>
  ),
  args: { size: 'sm', state: 'idle' },
};
