/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  parameters: {
    docs: { description: { component: "Native-style select dropdown. 3 sizes (sm/md/lg), states base/hover/focus/disabled. Chevron icon on the right." } },
  },
  argTypes: {
    size: { control: 'select', options: ["sm","md","lg"] },
    state: { control: 'select', options: ["base","hover","focus","disabled"] },
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: { children: 'Select', size: 'sm' },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {["sm","md","lg"].map((s) => (
        <Select key={s} {...args} size={s as any}>{s}</Select>
      ))}
    </div>
  ),
  args: { size: 'sm' },
};

export const AllStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {["base","hover","focus","disabled"].map((st) => (
        <Select key={st} {...args} state={st as any}>{st}</Select>
      ))}
    </div>
  ),
  args: { size: 'sm' },
};
