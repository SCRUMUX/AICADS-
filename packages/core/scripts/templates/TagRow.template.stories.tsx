/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TagRow } from './TagRow';
import { Tag } from '../Tag/Tag';

const meta: Meta<typeof TagRow> = {
  title: 'Primitives/TagRow',
  component: TagRow,
  parameters: {
    docs: {
      description: {
        component: 'Компонент-сет: один вариант — ряд из 3 тегов (@UI/Tag) в ряд. Генерируется после @UI/Tag.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof TagRow>;

export const Default: Story = {
  render: (args) => (
    <TagRow>
      <Tag appearance="base" size="sm">Tag 1</Tag>
      <Tag appearance="base" size="sm">Tag 2</Tag>
      <Tag appearance="base" size="sm">Tag 3</Tag>
    </TagRow>
  ),
};

export const MixedAppearances: Story = {
  render: (args) => (
    <TagRow>
      <Tag appearance="brand" size="sm">Brand</Tag>
      <Tag appearance="base" size="sm">Base</Tag>
      <Tag appearance="outline" size="sm">Outline</Tag>
    </TagRow>
  ),
};
