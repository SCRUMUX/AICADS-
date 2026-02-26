/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { SearchIcon, ChevronDownIcon, CloseXIcon, BellIcon, GearIcon, AicaIcon } from '../../icons';
import { Tag } from '../Tag/Tag';
import { Badge } from '../Badge/Badge';
import { Checkbox } from '../Checkbox/Checkbox';

const ICON_MAP: Record<string, React.ReactNode> = {
  none: undefined as unknown as React.ReactNode,
  SearchIcon: <SearchIcon style={{ width: '100%', height: '100%' }} />,
  BellIcon: <BellIcon style={{ width: '100%', height: '100%' }} />,
  GearIcon: <GearIcon style={{ width: '100%', height: '100%' }} />,
  AicaIcon: <AicaIcon style={{ width: '100%', height: '100%' }} />,
  CloseXIcon: <CloseXIcon style={{ width: '100%', height: '100%' }} />,
};
const ICON_KEYS = Object.keys(ICON_MAP);

const SIZES = ['sm', 'md', 'lg'] as const;

const structuredOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
  { value: 'next', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
];

const defaultItems = [
  { children: 'Option 1', appearance: 'default' as const },
  { children: 'Option 2', appearance: 'default' as const },
  { children: 'Option 3', appearance: 'primary' as const },
  { children: 'Delete', appearance: 'danger' as const },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Primitives/Dropdown',
  component: Dropdown,
  parameters: {
    docs: { description: { component: "Dropdown: выпадающее меню. state: closed/open. Trigger: Icon (left), Label, Badge, TagRow, Chevron. Popover: DropdownItem пункты." } },
  },
  argTypes: {
    state: { control: 'select', options: ['closed', 'open'] },
    size: { control: 'select', options: SIZES },
    appearance: { control: 'select', options: ['brand', 'base', 'ghost', 'outline'] },
    showIconLeft: { control: 'boolean' },
    showBadge: { control: 'boolean' },
    showTagRow: { control: 'boolean' },
    multiple: { control: 'boolean' },
    allowExclude: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
    placeholder: { control: 'text' },
    iconLeft: { options: ICON_KEYS, mapping: ICON_MAP, control: { type: 'select' } },
    chevron: { options: ICON_KEYS, mapping: ICON_MAP, control: { type: 'select' } },
    tagRow: { control: false },
    badge: { control: false },
    items: { control: false, table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string>('');
    return (
      <div style={{ padding: 16, minHeight: 280, maxWidth: 400 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>
          Single-select. Выбрано: <strong>{value || 'ничего'}</strong>
        </p>
        <Dropdown
          {...args}
          options={structuredOptions.slice(0, 5)}
          value={value}
          onChange={(v) => setValue(v as string)}
        />
      </div>
    );
  },
  args: {
    size: 'md',
    placeholder: 'Выберите...',
    fullWidth: true,
  },
};

export const ActionMenu: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: 16, minHeight: 200 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>
          Action menu (items API) — клик по пункту выполняет действие, а не выбирает значение.
        </p>
        <Dropdown {...args} state={open ? 'open' : 'closed'} onOpenChange={setOpen} />
      </div>
    );
  },
  args: {
    children: 'Действия',
    size: 'md',
    items: defaultItems,
  },
};

export const WithAllSlots: Story = {
  args: {
    children: 'With all slots',
    state: 'closed',
    size: 'md',
    iconLeft: <SearchIcon style={{ width: '100%', height: '100%' }} />,
    badge: <Badge appearance="outline" size="sm">5</Badge>,
    tagRow: <><Tag appearance="base" size="sm">Tag 1</Tag><Tag appearance="base" size="sm">Tag 2</Tag></>,
    showIconLeft: true,
    showBadge: true,
    showTagRow: false,
    items: defaultItems,
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16 }}>
      {SIZES.map((s) => (
        <Dropdown key={s} {...args} size={s}>{s}</Dropdown>
      ))}
    </div>
  ),
  args: {
    items: defaultItems.slice(0, 3),
  },
};

export const ControlledValue: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string>('react');
    return (
      <div style={{ padding: 16, minHeight: 320, maxWidth: 400 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>
          Controlled single-select. Текущее: <strong>{value || 'нет'}</strong>
        </p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <button onClick={() => setValue('vue')} style={{ fontSize: 12 }}>Set Vue</button>
          <button onClick={() => setValue('angular')} style={{ fontSize: 12 }}>Set Angular</button>
          <button onClick={() => setValue('')} style={{ fontSize: 12 }}>Clear</button>
        </div>
        <Dropdown
          {...args}
          options={structuredOptions}
          value={value}
          onChange={(v) => setValue(v as string)}
        >
          {structuredOptions.find(o => o.value === value)?.label ?? 'Выберите...'}
        </Dropdown>
      </div>
    );
  },
  args: {
    size: 'md',
    placeholder: 'Выберите...',
    fullWidth: true,
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <div style={{ padding: 16, minHeight: 200 }}>
      <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>fullWidth=true</p>
      <Dropdown {...args} options={structuredOptions.slice(0, 4)} fullWidth>Выберите</Dropdown>
      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>fullWidth=false</p>
        <Dropdown {...args} options={structuredOptions.slice(0, 4)} fullWidth={false}>Выберите</Dropdown>
      </div>
    </div>
  ),
  args: { size: 'md', placeholder: 'Dropdown...' },
};

export const MultiSelect: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<string[]>(['react', 'vue', 'angular']);
    return (
      <div style={{ padding: 16, minHeight: 360, maxWidth: 400 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>
          Выбрано: {selected.join(', ') || 'ничего'}
        </p>
        <Dropdown
          {...args}
          multiple
          options={structuredOptions}
          value={selected}
          onChange={(v) => setSelected(v as string[])}
        >
          Фреймворки
        </Dropdown>
      </div>
    );
  },
  args: {
    size: 'md',
    placeholder: 'Выберите фреймворки...',
    fullWidth: true,
  },
};

export const MultiSelectOverflow: Story = {
  render: (args) => {
    const allValues = structuredOptions.map(o => o.value);
    const [selected, setSelected] = React.useState<string[]>(allValues);
    return (
      <div style={{ padding: 16, minHeight: 360, maxWidth: 280 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>
          Все {selected.length} значений выбраны. Chips overflow + counter.
        </p>
        <Dropdown
          {...args}
          multiple
          options={structuredOptions}
          value={selected}
          onChange={(v) => setSelected(v as string[])}
        >
          Фреймворки
        </Dropdown>
      </div>
    );
  },
  args: {
    size: 'sm',
    placeholder: 'Все выбраны...',
    fullWidth: true,
  },
};

export const ExcludeMode: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<string[]>(['react', 'vue']);
    const [excluded, setExcluded] = React.useState<string[]>(['angular']);
    return (
      <div style={{ padding: 16, minHeight: 360, maxWidth: 400 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>
          Tri-state: click → selected, click again → excluded, click again → off.
          <br />Selected: <strong>{selected.join(', ') || '—'}</strong>
          <br />Excluded: <strong>{excluded.join(', ') || '—'}</strong>
        </p>
        <Dropdown
          {...args}
          multiple
          allowExclude
          options={structuredOptions}
          value={selected}
          excludedValues={excluded}
          onChange={(v) => setSelected(v as string[])}
          onExcludedChange={setExcluded}
          showClearButton
          onClear={() => { setSelected([]); setExcluded([]); }}
        >
          Фреймворки
        </Dropdown>
      </div>
    );
  },
  args: {
    size: 'md',
    placeholder: 'Фреймворки...',
    fullWidth: true,
  },
};

export const ChipsInClosedControl: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<string[]>(['react', 'vue', 'angular', 'svelte', 'solid']);
    return (
      <div style={{ padding: 16, minHeight: 360, maxWidth: 300 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>
          Multi-select: Chip + Badge. Выбрано: {selected.length}
        </p>
        <Dropdown
          {...args}
          multiple
          options={structuredOptions}
          value={selected}
          onChange={(v) => setSelected(v as string[])}
          showClearButton
          onClear={() => setSelected([])}
        >
          Фреймворки
        </Dropdown>
      </div>
    );
  },
  args: {
    size: 'sm',
    placeholder: 'Фреймворки...',
    fullWidth: true,
  },
};

export const WithSubmenu: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: 16, minHeight: 280 }}>
        <Dropdown
          {...args}
          state={open ? 'open' : 'closed'}
          onOpenChange={setOpen}
          items={[
            { children: 'Файл', appearance: 'default' as const },
            {
              children: 'Экспорт',
              appearance: 'default' as const,
              submenuItems: [
                { children: 'PDF', appearance: 'default' as const, onClick: () => {} },
                { children: 'PNG', appearance: 'default' as const, onClick: () => {} },
                { children: 'SVG', appearance: 'primary' as const, onClick: () => {} },
              ],
            },
            { children: 'Настройки', appearance: 'default' as const },
            { children: 'Удалить', appearance: 'danger' as const },
          ]}
        >
          Действия
        </Dropdown>
      </div>
    );
  },
  args: { size: 'md' },
};

const compositeMenuItems = [
  {
    children: 'Поиск',
    showIconLeft: true,
    iconLeft: <SearchIcon style={{ width: '1em', height: '1em' }} />,
    onClick: () => {},
  },
  {
    children: 'Уведомления',
    showIconLeft: true,
    iconLeft: <BellIcon style={{ width: '1em', height: '1em' }} />,
    showBadge: true,
    badge: <Badge appearance="danger" size="sm">3</Badge>,
    onClick: () => {},
  },
  {
    children: 'Настройки',
    showIconLeft: true,
    iconLeft: <GearIcon style={{ width: '1em', height: '1em' }} />,
    submenuItems: [
      {
        children: 'Профиль',
        showIconLeft: true,
        iconLeft: <AicaIcon style={{ width: '1em', height: '1em' }} />,
        onClick: () => {},
      },
      {
        children: 'Безопасность',
        showBadge: true,
        badge: <Badge appearance="warning" size="sm">!</Badge>,
        onClick: () => {},
      },
    ],
  },
  {
    children: 'Удалить',
    appearance: 'danger' as const,
    showIconLeft: true,
    iconLeft: <CloseXIcon style={{ width: '1em', height: '1em' }} />,
    onClick: () => {},
  },
];

export const CompositeItems: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: 16, minHeight: 320 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>
          DropdownItem с иконками, бейджами, чекбоксами и вложенным сабменю.
        </p>
        <Dropdown
          {...args}
          state={open ? 'open' : 'closed'}
          onOpenChange={setOpen}
          items={compositeMenuItems}
        >
          Меню
        </Dropdown>
      </div>
    );
  },
  args: { size: 'md' },
};
