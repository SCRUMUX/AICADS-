import type { Meta, StoryObj } from '@storybook/react';
import { NavbarBlock } from './NavbarBlock';

const meta: Meta<typeof NavbarBlock> = {
  title: 'Blocks/Marketing/NavbarBlock',
  component: NavbarBlock,
  parameters: { layout: 'fullscreen' },
  args: {
    logo: 'AICADS',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Docs', href: '#' },
    ],
    cta: { label: 'Get started', href: '#' },
    sticky: true,
  },
};
export default meta;

type Story = StoryObj<typeof NavbarBlock>;

export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };
export const Tablet: Story = { parameters: { viewport: { defaultViewport: 'tablet' } } };
export const Desktop: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } };
