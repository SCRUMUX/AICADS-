import type { Meta, StoryObj } from '@storybook/react';
import OrgDashboard from './OrgDashboard';

const meta: Meta<typeof OrgDashboard> = {
  title: 'Pages/OrgDashboard',
  component: OrgDashboard,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof OrgDashboard>;

export const Default: Story = {};
