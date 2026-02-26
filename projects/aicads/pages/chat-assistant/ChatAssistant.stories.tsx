import type { Meta, StoryObj } from '@storybook/react';
import ChatAssistant from './ChatAssistant';

const meta: Meta<typeof ChatAssistant> = {
  title: 'Pages/ChatAssistant',
  component: ChatAssistant,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ChatAssistant>;

export const Default: Story = {};
