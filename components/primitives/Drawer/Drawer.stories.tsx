/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Primitives/Drawer',
  component: Drawer,
  parameters: {
    docs: { description: { component: "Side panel overlay. Slides from left/right. Sizes sm (320px), md (480px), lg (640px). Has close button, header, body." } },
  },
  argTypes: {
    size: { control: 'select', options: ["sm","md","lg"] },
    side: { control: 'select', options: ["left","right"] },
  },
};
export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: { children: 'Drawer', size: 'sm', side: 'left' },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {["sm","md","lg"].map((s) => (
        <Drawer key={s} {...args} size={s as any}>{s}</Drawer>
      ))}
    </div>
  ),
  args: { size: 'sm', side: 'left' },
};

export const AllSides: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {["left","right"].map((v) => (
        <Drawer key={v} {...args} side={v as any}>{v}</Drawer>
      ))}
    </div>
  ),
  args: { size: 'sm', side: 'left' },
};
