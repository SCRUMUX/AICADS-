import type { Meta, StoryObj } from '@storybook/react';
import { FAQBlock } from './FAQBlock';

const meta: Meta<typeof FAQBlock> = {
  title: 'Blocks/Marketing/FAQBlock',
  component: FAQBlock,
  parameters: { layout: 'fullscreen' },
  args: {
    subtitle: 'Everything you need to know about AICADS pattern blocks.',
    items: [
      {
        question: 'What are pattern blocks?',
        answer:
          'Pre-composed marketing sections built from AICADS primitives with fixed spacing recipes and ai-patterns.json metadata for AI assemblers.',
      },
      {
        question: 'Can I customize spacing?',
        answer:
          'Section rhythm uses `--space-section-*` tokens. Override tokens in your theme or pass className on the block shell.',
      },
      {
        question: 'Do blocks work in consumer Storybook?',
        answer:
          'Yes — import stories from `@ai-ds/core/blocks/**` via the consumer Storybook template.',
      },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof FAQBlock>;

export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };
export const Tablet: Story = { parameters: { viewport: { defaultViewport: 'tablet' } } };
export const Desktop: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } };
