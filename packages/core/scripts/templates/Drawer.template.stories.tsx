/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Button } from '../Button/Button';

const SIZES = ['sm', 'md', 'lg'] as const;
const SIDES = ['left', 'right'] as const;

const meta: Meta<typeof Drawer> = {
  title: 'Primitives/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component:
          'Side panel overlay. Slides from left/right. Sizes sm (320px), md (480px), lg (640px). Has close button, header, body.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    size: { control: 'select', options: SIZES },
    side: { control: 'select', options: SIDES },
    open: { control: 'boolean' },
    title: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Drawer>;

const DrawerDemo: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  side?: 'left' | 'right';
  title?: string;
  children?: React.ReactNode;
}> = ({ size = 'md', side = 'right', title = 'Drawer', children = 'Drawer content' }) => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ padding: 24, minHeight: 300, background: '#f1f5f9' }}>
      {!open && (
        <Button appearance="brand" size="sm" onClick={() => setOpen(true)}>
          Open drawer
        </Button>
      )}
      <Drawer open={open} onClose={() => setOpen(false)} size={size} side={side} title={title}>
        {children}
      </Drawer>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <DrawerDemo title="Drawer" children="Drawer content goes here." />,
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, background: '#f1f5f9' }}>
      {SIZES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#666' }}>size={s}</span>
          <DrawerDemo size={s} title={`Size ${s}`} children={`Drawer with size "${s}".`} />
        </div>
      ))}
    </div>
  ),
};

export const AllSides: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, background: '#f1f5f9' }}>
      {SIDES.map((v) => (
        <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#666' }}>side={v}</span>
          <DrawerDemo side={v} title={`Side ${v}`} children={`Drawer from ${v}.`} />
        </div>
      ))}
    </div>
  ),
};
