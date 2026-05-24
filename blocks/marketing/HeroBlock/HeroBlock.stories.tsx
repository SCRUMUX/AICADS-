import type { Meta, StoryObj } from '@storybook/react';
import { HeroBlock } from './HeroBlock';
import { marketingBlockParameters } from '../../_shared/blockStoryViewports';

const mediaPlaceholder = (
  <div
    className="flex aspect-[4/3] w-full items-center justify-center bg-[var(--color-surface-3)] text-style-body-sm text-[var(--color-text-muted)]"
    aria-hidden="true"
  >
    Product screenshot
  </div>
);

const meta: Meta<typeof HeroBlock> = {
  title: 'Blocks/Marketing/HeroBlock',
  component: HeroBlock,
  parameters: marketingBlockParameters,
  args: {
    badge: 'New',
    title: 'Build consistent interfaces with AICADS',
    subtitle: 'Token-driven pattern blocks so Replit and AI never improvise layout or spacing.',
    align: 'center',
    variant: 'centered',
    primaryAction: { label: 'Get started', href: '#' },
    secondaryAction: { label: 'View docs', href: '#' },
  },
};
export default meta;

type Story = StoryObj<typeof HeroBlock>;

export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };
export const Tablet: Story = { parameters: { viewport: { defaultViewport: 'tablet' } } };
export const Desktop: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } };

export const SplitWithMedia: Story = {
  args: {
    variant: 'split',
    align: 'left',
    badge: 'Pattern Layer v0.7',
    media: mediaPlaceholder,
    stats: [
      { value: '12', label: 'Marketing blocks' },
      { value: '57', label: 'Primitives' },
      { value: '14', label: 'Patterns' },
    ],
  },
  parameters: { viewport: { defaultViewport: 'desktop' } },
};
