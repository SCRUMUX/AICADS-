import type { Meta, StoryObj } from '@storybook/react';
import CarMarketplace from './CarMarketplace';

const meta: Meta<typeof CarMarketplace> = {
  title: 'Pages/CarMarketplace',
  component: CarMarketplace,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CarMarketplace>;

export const Default: Story = {};
