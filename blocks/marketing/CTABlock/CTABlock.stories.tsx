import type { Meta, StoryObj } from '@storybook/react';
import { CTABlock } from './CTABlock';

const meta: Meta<typeof CTABlock> = {
  title: 'Blocks/Marketing/CTABlock',
  component: CTABlock,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof CTABlock>;

export const Banner: Story = {
  args: {
    title: 'Ready to ship consistent UIs?',
    description: 'Use AICADS pattern blocks in your next Replit project.',
    action: { label: 'Start building', onClick: () => {} },
  },
};
