/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Primitives/Rating',
  component: Rating,
  parameters: {
    docs: { description: { component: "Star rating component. 3 sizes (sm/md/lg), readonly or interactive, values 0-5." } },
  },
  argTypes: {
    size: { control: 'select', options: ["sm","md","lg"] },
    value: { control: 'select', options: ["0","1","2","3","4","5"] },
  },
};
export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: { children: 'Rating', size: 'sm', value: '0' },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {["sm","md","lg"].map((s) => (
        <Rating key={s} {...args} size={s as any}>{s}</Rating>
      ))}
    </div>
  ),
  args: { size: 'sm', value: '0' },
};

export const AllValues: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {["0","1","2","3","4","5"].map((v) => (
        <Rating key={v} {...args} value={v as any}>{v}</Rating>
      ))}
    </div>
  ),
  args: { size: 'sm', value: '0' },
};
