/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import type { Meta, StoryObj } from '@storybook/react';
import { RangeSlider } from './RangeSlider';

const meta: Meta<typeof RangeSlider> = {
  title: 'Primitives/RangeSlider',
  component: RangeSlider,
  parameters: {
    docs: { description: { component: "Dual-thumb range slider for min/max value selection. 3 sizes (sm/md/lg), states base/hover/disabled." } },
  },
  argTypes: {
    size: { control: 'select', options: ["sm","md","lg"] },
    state: { control: 'select', options: ["base","hover","disabled"] },
  },
};
export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
  args: { children: 'RangeSlider', size: 'sm' },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {["sm","md","lg"].map((s) => (
        <RangeSlider key={s} {...args} size={s as any}>{s}</RangeSlider>
      ))}
    </div>
  ),
  args: { size: 'sm' },
};

export const AllStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {["base","hover","disabled"].map((st) => (
        <RangeSlider key={st} {...args} state={st as any}>{st}</RangeSlider>
      ))}
    </div>
  ),
  args: { size: 'sm' },
};
