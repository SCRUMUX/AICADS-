import type { Meta, StoryObj } from '@storybook/react';
import { FeaturesBlock } from './FeaturesBlock';

const meta: Meta<typeof FeaturesBlock> = {
  title: 'Blocks/Marketing/FeaturesBlock',
  component: FeaturesBlock,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof FeaturesBlock>;

const sampleFeatures = [
  { title: 'Pattern manifest', description: 'Replit picks blocks from ai-patterns.json — no improvised layout.' },
  { title: 'Token recipes', description: 'Section spacing is fixed by named recipes, not magic numbers.' },
  { title: 'Distributable', description: 'Import blocks in any consumer via @ai-ds/core/blocks/*.' },
];

export const ThreeColumn: Story = {
  args: {
    title: 'Why AICADS patterns',
    subtitle: 'Consistent rhythm across every generated landing page.',
    features: sampleFeatures,
    columns: 3,
  },
};

export const TwoColumn: Story = {
  args: {
    title: 'Core capabilities',
    features: sampleFeatures.slice(0, 2),
    columns: 2,
  },
};
