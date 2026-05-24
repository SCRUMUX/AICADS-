import type { Meta, StoryObj } from '@storybook/react';
import { FooterBlock } from './FooterBlock';

const meta: Meta<typeof FooterBlock> = {
  title: 'Blocks/Marketing/FooterBlock',
  component: FooterBlock,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof FooterBlock>;

export const Minimal: Story = {
  args: {
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '#' },
          { label: 'Pricing', href: '#' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '#' },
          { label: 'Contact', href: '#' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
        ],
      },
    ],
    copyright: '© 2026 AICADS. All rights reserved.',
  },
};
