/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { BellIcon, SearchIcon, CloseXIcon, GearIcon, AicaIcon } from '../../icons';
import { Badge } from '../Badge/Badge';
import { Tag } from '../Tag/Tag';

const icon1 = <SearchIcon style={{ width: '100%', height: '100%' }} />;
const icon2 = <BellIcon style={{ width: '100%', height: '100%' }} />;
const iconClear = <CloseXIcon style={{ width: '100%', height: '100%' }} />;

const ICON_MAP: Record<string, React.ReactNode> = {
  none: undefined as unknown as React.ReactNode,
  SearchIcon: <SearchIcon style={{ width: '100%', height: '100%' }} />,
  BellIcon: <BellIcon style={{ width: '100%', height: '100%' }} />,
  GearIcon: <GearIcon style={{ width: '100%', height: '100%' }} />,
  AicaIcon: <AicaIcon style={{ width: '100%', height: '100%' }} />,
  CloseXIcon: <CloseXIcon style={{ width: '100%', height: '100%' }} />,
};
const ICON_KEYS = Object.keys(ICON_MAP);

const APPEARANCES = ['brand', 'base', 'ghost', 'outline'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;
const STATES = ['base', 'hover', 'focus', 'filled', 'disabled'] as const;

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          '`@UI/Input` — текстовое поле. appearance: brand / base / ghost / outline.\n\n' +
          'Ghost — только нижний бордер. Размеры sm/md/lg.\n\n' +
          'Опционально: 2 иконки слева, Badge, TagRow, 2 иконки справа.',
      },
    },
  },
  argTypes: {
    appearance:     { control: 'select',  options: APPEARANCES, description: 'Визуальный стиль' },
    size:           { control: 'select',  options: SIZES,       description: 'Размер' },
    state:          { control: 'select',  options: STATES,      description: 'Принудительное состояние' },
    showIconLeft1:  { control: 'boolean', description: 'Иконка 1 слева' },
    showIconLeft2:  { control: 'boolean', description: 'Иконка 2 слева' },
    showBadge:      { control: 'boolean', description: 'Бейдж' },
    showTagRow:     { control: 'boolean', description: 'Тэги' },
    showIconRight1: { control: 'boolean', description: 'Иконка 1 справа' },
    showIconRight2: { control: 'boolean', description: 'Иконка 2 справа' },
    placeholder:    { control: 'text',    description: 'Placeholder' },
    disabled:       { control: 'boolean', description: 'Заблокировано' },
    readOnly:       { control: 'boolean', description: 'Только чтение' },
    invalid:        { control: 'boolean', description: 'Невалидное значение (danger border)' },
    showClearButton:{ control: 'boolean', description: 'Кнопка очистки' },
    clearAlwaysVisible: { control: 'boolean', description: 'Кнопка очистки всегда видна' },
    fullWidth:      { control: 'boolean', description: 'Растянуть на ширину контейнера' },
    badge:     { control: false },
    tagRow:    { control: false },
    iconLeft1: { options: ICON_KEYS, mapping: ICON_MAP, control: { type: 'select' } },
    iconLeft2: { options: ICON_KEYS, mapping: ICON_MAP, control: { type: 'select' } },
    iconRight1:{ options: ICON_KEYS, mapping: ICON_MAP, control: { type: 'select' } },
    iconRight2:{ options: ICON_KEYS, mapping: ICON_MAP, control: { type: 'select' } },
    onChange:  { action: 'changed', description: 'onChange' },
    onFocus:   { action: 'focused', description: 'onFocus' },
    onBlur:    { action: 'blurred', description: 'onBlur' },
  },
  args: {
    appearance: 'base',
    size: 'md',
    placeholder: 'Placeholder text',
    showIconLeft1: false,
    showIconLeft2: false,
    showBadge: false,
    showTagRow: false,
    showIconRight1: false,
    showIconRight2: false,
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Placeholder text',
    appearance: 'base',
    size: 'md',
    iconLeft1: icon1,
    showIconLeft1: true,
    defaultValue: 'Default text',
    showClearButton: true,
    clearAlwaysVisible: true,
  },
};

export const WithAllSlots: Story = {
  args: {
    placeholder: 'Placeholder',
    appearance: 'base',
    size: 'md',
    iconLeft1: icon1,
    iconLeft2: icon2,
    iconRight1: iconClear,
    iconRight2: icon2,
    badge: <Badge appearance="outline" size="sm">5</Badge>,
    tagRow: <><Tag appearance="base" size="sm">Tag 1</Tag><Tag appearance="base" size="sm">Tag 2</Tag></>,
    showIconLeft1: true,
    showIconLeft2: false,
    showBadge: false,
    showTagRow: false,
    showIconRight1: true,
    showIconRight2: false,
  },
};

export const AllAppearances: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16 }}>
      {APPEARANCES.map((a) => (
        <Input key={a} {...args} appearance={a} placeholder={a} defaultValue={a} />
      ))}
    </div>
  ),
  args: {
    size: 'md',
    iconLeft1: icon1,
    showIconLeft1: true,
    showClearButton: true,
    clearAlwaysVisible: true,
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16 }}>
      {SIZES.map((s) => (
        <Input key={s} {...args} size={s} placeholder={`Size ${s}`} defaultValue={`Size ${s}`} />
      ))}
    </div>
  ),
  args: {
    appearance: 'base',
    iconLeft1: icon1,
    showIconLeft1: true,
    showClearButton: true,
    clearAlwaysVisible: true,
  },
};

export const AllStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16 }}>
      {STATES.map((st) => (
        <Input key={st} {...args} state={st} placeholder={`State: ${st}`} defaultValue={`State: ${st}`} />
      ))}
    </div>
  ),
  args: {
    appearance: 'base',
    size: 'md',
    iconLeft1: icon1,
    showIconLeft1: true,
    showClearButton: true,
    clearAlwaysVisible: true,
  },
};

/** Матрица appearance × state */
export const AllAppearancesAllStates: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${STATES.length}, 200px)`, gap: 6, padding: 16 }}>
      {APPEARANCES.flatMap((a) =>
        STATES.map((st) => (
          <Input key={a + st} {...args} appearance={a} state={st} placeholder={`${a} / ${st}`} defaultValue={`${a} / ${st}`} />
        ))
      )}
    </div>
  ),
  args: {
    size: 'sm',
    iconLeft1: icon1,
    showIconLeft1: true,
    showClearButton: true,
    clearAlwaysVisible: true,
  },
};

export const GhostVariant: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16 }}>
      {STATES.map((st) => (
        <Input key={st} {...args} appearance="ghost" state={st} placeholder={`ghost / ${st}`} defaultValue={`ghost / ${st}`} />
      ))}
    </div>
  ),
  args: {
    size: 'md',
    iconLeft1: icon1,
    showIconLeft1: true,
    showClearButton: true,
    clearAlwaysVisible: true,
  },
};

export const WithClearButton: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('Clear me');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, maxWidth: 320 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
          showClearButton — appears on hover when input has value
        </p>
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          showClearButton
          onClear={() => setValue('')}
        />
      </div>
    );
  },
  args: { size: 'md', appearance: 'base', placeholder: 'Type something...' },
};

export const ClearAlwaysVisible: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('Always visible clear');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, maxWidth: 320 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
          clearAlwaysVisible — clear button stays visible without hover
        </p>
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          showClearButton
          clearAlwaysVisible
          onClear={() => setValue('')}
        />
      </div>
    );
  },
  args: { size: 'md', appearance: 'base', placeholder: 'Type something...' },
};

export const FullWidth: Story = {
  render: (args) => (
    <div style={{ padding: 16 }}>
      <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>
        fullWidth=true stretches the input to fill its container
      </p>
      <Input
        size="md"
        appearance="base"
        fullWidth
        placeholder="Full width input..."
        iconLeft1={icon1}
        showIconLeft1
      />
      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>
          fullWidth=false (default) — intrinsic width
        </p>
        <Input
          size="md"
          appearance="base"
          placeholder="Default width..."
          iconLeft1={icon1}
          showIconLeft1
        />
      </div>
    </div>
  ),
};

export const InvalidState: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, maxWidth: 320 }}>
      <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
        invalid=true — danger border and focus ring
      </p>
      {(['base', 'brand', 'outline', 'ghost'] as const).map((a) => (
        <Input
          key={a}
          size="md"
          appearance={a}
          invalid
          placeholder={`${a} / invalid`}
          defaultValue="Bad value"
          showClearButton
          clearAlwaysVisible
        />
      ))}
    </div>
  ),
};
