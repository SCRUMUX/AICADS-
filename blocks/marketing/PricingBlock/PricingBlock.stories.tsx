import type { Meta, StoryObj } from '@storybook/react';
import { PricingBlock } from './PricingBlock';

const meta: Meta<typeof PricingBlock> = {
  title: 'Blocks/Marketing/PricingBlock',
  component: PricingBlock,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof PricingBlock>;

export const ThreeTier: Story = {
  args: {
    title: 'Simple pricing',
    subtitle: 'Choose the plan that fits your team.',
    tiers: [
      {
        name: 'Starter',
        price: '$0',
        period: 'mo',
        description: 'For experiments',
        features: ['5 projects', 'Community support'],
        actionLabel: 'Start free',
      },
      {
        name: 'Pro',
        price: '$29',
        period: 'mo',
        description: 'For growing teams',
        features: ['Unlimited projects', 'Pattern manifest', 'Priority support'],
        actionLabel: 'Get Pro',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For organizations',
        features: ['SSO', 'Dedicated support', 'Custom patterns'],
        actionLabel: 'Contact sales',
      },
    ],
    highlightedIndex: 1,
  },
};
