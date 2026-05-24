import type { Meta, StoryObj } from '@storybook/react';
import { LandingPageTemplate } from './LandingPageTemplate';

const meta: Meta<typeof LandingPageTemplate> = {
  title: 'Screens/Marketing Landing (Default)',
  component: LandingPageTemplate,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof LandingPageTemplate>;

export const Default: Story = {
  args: {
    hero: {
      badge: 'Pattern Layer',
      title: 'Build consistent interfaces with AICADS',
      subtitle: 'Distributable marketing blocks with token-driven spacing recipes.',
      align: 'center',
      primaryAction: { label: 'Get started', onClick: () => {} },
      secondaryAction: { label: 'View patterns', href: '#' },
    },
    features: {
      title: 'Why patterns',
      subtitle: 'Replit selects blocks from ai-patterns.json — never improvises layout.',
      columns: 3,
      features: [
        { title: 'Pattern manifest', description: 'Machine-readable catalog for AI assemblers.' },
        { title: 'Layout recipes', description: 'Named spacing for hero, pricing, footer sections.' },
        { title: 'Consumer-ready', description: 'Import @ai-ds/core/blocks/* in any project.' },
      ],
    },
    pricing: {
      title: 'Pricing',
      subtitle: 'Start free, scale when you need more.',
      highlightedIndex: 1,
      tiers: [
        { name: 'Free', price: '$0', period: 'mo', features: ['Core primitives', '5 blocks'], actionLabel: 'Start' },
        { name: 'Pro', price: '$29', period: 'mo', features: ['All blocks', 'Pattern manifest', 'Storybook kit'], actionLabel: 'Upgrade' },
        { name: 'Team', price: '$99', period: 'mo', features: ['SSO', 'Custom patterns'], actionLabel: 'Contact' },
      ],
    },
    cta: {
      title: 'Ship your next landing in minutes',
      description: 'One import. Five sections. Consistent rhythm.',
      action: { label: 'Create project', onClick: () => {} },
    },
    footer: {
      columns: [
        { title: 'Product', links: [{ label: 'Blocks', href: '#' }, { label: 'Docs', href: '#' }] },
        { title: 'Resources', links: [{ label: 'Storybook', href: '#' }, { label: 'GitHub', href: '#' }] },
      ],
      copyright: '© 2026 AICADS',
    },
  },
};
