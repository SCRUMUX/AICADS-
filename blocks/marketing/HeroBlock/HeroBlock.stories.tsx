import type { Meta, StoryObj } from '@storybook/react';
import { HeroBlock } from './HeroBlock';

const meta: Meta<typeof HeroBlock> = {
  title: 'Blocks/Marketing/HeroBlock',
  component: HeroBlock,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof HeroBlock>;

export const Centered: Story = {
  args: {
    badge: 'New',
    title: 'Build consistent interfaces with AICADS',
    subtitle: 'Token-driven pattern blocks so Replit and AI never improvise layout or spacing.',
    align: 'center',
    primaryAction: { label: 'Get started', onClick: () => {} },
    secondaryAction: { label: 'View docs', href: '#' },
  },
};

export const LeftAligned: Story = {
  args: {
    title: 'Semantic design orchestration',
    subtitle: 'Compose landing pages from distributable blocks — not raw divs.',
    align: 'left',
    primaryAction: { label: 'Start free trial', onClick: () => {} },
  },
};
