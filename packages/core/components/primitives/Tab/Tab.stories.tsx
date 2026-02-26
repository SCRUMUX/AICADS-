/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tab } from './Tab';
import { SearchIcon, ChevronRightIcon } from '../../icons';
import { Badge } from '../Badge/Badge';

const iconL = <SearchIcon style={{ width: '100%', height: '100%' }} />;
const iconR = <ChevronRightIcon style={{ width: '100%', height: '100%' }} />;
const badge = <Badge appearance="outline" size="sm">5</Badge>;

const APPEARANCES = ['brand', 'base', 'ghost', 'outline'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;
const STATES = ['base', 'hover', 'active', 'focus', 'disabled'] as const;

const meta: Meta<typeof Tab> = {
  title: 'Primitives/Tab',
  component: Tab,
  parameters: {
    docs: { description: { component: "Tab: appearance (brand/base/ghost/outline), size (sm/md/lg), state (base/hover/active/focus/disabled). Иконки слева/справа и Badge — опциональны." } },
  },
  argTypes: {
    appearance: { control: 'select', options: APPEARANCES },
    size: { control: 'select', options: SIZES },
    state: { control: 'select', options: STATES },
    showLeftIcon: { control: 'boolean' },
    showBadge: { control: 'boolean' },
    showRightIcon: { control: 'boolean' },
    badge: { control: false },
    iconLeft: { control: false },
    iconRight: { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  args: {
    children: 'Tab',
    appearance: 'brand',
    size: 'md',
    iconLeft: iconL,
    badge,
    showLeftIcon: true,
    showBadge: true,
    showRightIcon: false,
  },
};

export const AllAppearances: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', padding: 16 }}>
      {APPEARANCES.map((a) => (
        <Tab key={a} {...args} appearance={a}>{a}</Tab>
      ))}
    </div>
  ),
  args: { size: 'md', iconLeft: iconL, showLeftIcon: true, showBadge: false },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 16 }}>
      {SIZES.map((s) => (
        <Tab key={s} {...args} size={s}>{s}</Tab>
      ))}
    </div>
  ),
  args: { appearance: 'brand', iconLeft: iconL, showLeftIcon: true, showBadge: false },
};

export const AllStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 16 }}>
      {STATES.map((st) => (
        <Tab key={st} {...args} state={st}>{st}</Tab>
      ))}
    </div>
  ),
  args: { appearance: 'brand', size: 'md', iconLeft: iconL, showLeftIcon: true, showBadge: false },
};

/** Полная матрица appearance × state */
export const AllAppearancesAllStates: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${STATES.length}, auto)`, gap: 6, padding: 16 }}>
      {APPEARANCES.flatMap((a) =>
        STATES.map((st) => (
          <Tab key={a + st} {...args} appearance={a} state={st}>{a}</Tab>
        ))
      )}
    </div>
  ),
  args: { size: 'sm', showLeftIcon: false, showBadge: false },
};

export const VariantMatrix: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${SIZES.length}, auto)`, gap: 8, padding: 16 }}>
      {APPEARANCES.flatMap((a) =>
        SIZES.map((s) => (
          <Tab key={a + s} {...args} appearance={a} size={s}>{a}</Tab>
        ))
      )}
    </div>
  ),
  args: { showLeftIcon: false, showBadge: false },
};

export const WithBadgeAndIcons: Story = {
  args: {
    children: 'Tab label',
    appearance: 'brand',
    size: 'md',
    iconLeft: iconL,
    iconRight: iconR,
    badge,
    showLeftIcon: true,
    showBadge: true,
    showRightIcon: true,
  },
};
