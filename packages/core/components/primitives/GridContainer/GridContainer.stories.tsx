/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GridContainer } from './GridContainer';

const meta: Meta<typeof GridContainer> = {
  title: 'Primitives/GridContainer',
  component: GridContainer,
  parameters: {
    docs: { description: { component: "Responsive grid container (4→8→12 columns). Includes GridItem for column placement. Layout utility, no variant styles." } },
  },
  argTypes: {

  },
};
export default meta;
type Story = StoryObj<typeof GridContainer>;

export const Default: Story = {
  args: { children: 'GridContainer',  },
};
