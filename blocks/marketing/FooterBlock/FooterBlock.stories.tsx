import type { Meta, StoryObj } from '@storybook/react';
import { FooterBlock } from './FooterBlock';
import { marketingBlockParameters } from '../../_shared/blockStoryViewports';

const meta: Meta<typeof FooterBlock> = {
  title: 'Blocks/Marketing/FooterBlock',
  component: FooterBlock,
  parameters: marketingBlockParameters,
  args: {
    columns: [
      { title: 'Product', links: [{ label: 'Blocks', href: '#' }, { label: 'Docs', href: '#' }] },
      { title: 'Resources', links: [{ label: 'Storybook', href: '#' }, { label: 'GitHub', href: '#' }] },
      { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Contact', href: '#' }] },
    ],
    socialLinks: [
      { label: 'Twitter', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'Discord', href: '#' },
    ],
    copyright: '© 2026 AICADS',
  },
};
export default meta;

type Story = StoryObj<typeof FooterBlock>;

export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };
export const Tablet: Story = { parameters: { viewport: { defaultViewport: 'tablet' } } };
export const Desktop: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } };
