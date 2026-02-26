import type { Meta, StoryObj } from '@storybook/react';
import ModelsComparison from './ModelsComparison';

const meta: Meta<typeof ModelsComparison> = {
  title: 'Pages/ModelsComparison',
  component: ModelsComparison,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ModelsComparison>;

export const Default: Story = {};
