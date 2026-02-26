/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { AicaIcon, CaretUpFillIcon } from '../../icons';
import { Badge } from '../Badge/Badge';
import { Chip } from '../Chip/Chip';
import { Checkbox } from '../Checkbox/Checkbox';

const meta: Meta<typeof Accordion> = {
  title: 'Primitives/Accordion',
  component: Accordion,
  parameters: {
    docs: { description: { component: "Accordion: открытый/закрытый (через variant state), hover, disabled. Лейбл с fill. Опционально: иконка1 слева, иконка2 слева, лейбл, badge, иконка справа (closed=chevron, open=caret-up-fill), верхний бордер. В open: бордер и иконки — color_brand_primary." } },
  },
  argTypes: {
    state: { control: 'select', options: ["open","closed"] },
    size: { control: 'select', options: ["sm","md","lg"] },
    interaction: { control: 'select', options: ["base","hover","disabled"] },
    showIconLeft1: { control: 'boolean' },
    showIconLeft2: { control: 'boolean' },
    showBadge: { control: 'boolean' },
    showTopBorder: { control: 'boolean' },
    badge: { control: false },
    content: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: { children: 'Accordion', size: 'sm', iconLeft1: <AicaIcon style={{ width: '100%', height: '100%' }} />, iconLeft2: <AicaIcon style={{ width: '100%', height: '100%' }} />, chevron: <CaretUpFillIcon style={{ width: '1em', height: '1em' }} />, badge: <Badge appearance="outline" size="sm">5</Badge>, showIconLeft1: true, showIconLeft2: true, showBadge: true, content: 'Accordion content...' },
};

export const AllSlotsVisible: Story = {
  args: { children: 'Accordion', size: 'sm', showIconLeft1: true, showIconLeft2: true, showBadge: true, showTopBorder: true, iconLeft1: <AicaIcon style={{ width: '100%', height: '100%' }} />, iconLeft2: <AicaIcon style={{ width: '100%', height: '100%' }} />, chevron: <CaretUpFillIcon style={{ width: '1em', height: '1em' }} />, badge: <Badge appearance="outline" size="sm">5</Badge>, content: 'Accordion content...' },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {["sm","md","lg"].map((s) => (
        <Accordion key={s} {...args} size={s as any}>{s}</Accordion>
      ))}
    </div>
  ),
  args: { size: 'sm', iconLeft1: <AicaIcon style={{ width: '100%', height: '100%' }} />, iconLeft2: <AicaIcon style={{ width: '100%', height: '100%' }} />, chevron: <CaretUpFillIcon style={{ width: '1em', height: '1em' }} />, badge: <Badge appearance="outline" size="sm">5</Badge>, showIconLeft1: true, showIconLeft2: true, showBadge: true, content: 'Accordion content...' },
};

export const AllStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {["base","hover","disabled"].map((st) => (
        <Accordion key={st} {...args} interaction={st as any}>{st}</Accordion>
      ))}
    </div>
  ),
  args: { size: 'sm', iconLeft1: <AicaIcon style={{ width: '100%', height: '100%' }} />, iconLeft2: <AicaIcon style={{ width: '100%', height: '100%' }} />, chevron: <CaretUpFillIcon style={{ width: '1em', height: '1em' }} />, badge: <Badge appearance="outline" size="sm">5</Badge>, showIconLeft1: true, showIconLeft2: true, showBadge: true, content: 'Accordion content...' },
};

export const WithCheckboxSelection: StoryObj = {
  render: (args) => {
    const ALL_OPTIONS = ['React', 'Vue', 'Angular', 'Svelte', 'SolidJS', 'Next.js', 'Remix', 'Astro'];
    const MAX_CHIPS = 2;
    const [selected, setSelected] = React.useState<string[]>(['React', 'Vue', 'Svelte']);
    const toggle = (opt: string) => setSelected((prev) => prev.includes(opt) ? prev.filter((s) => s !== opt) : [...prev, opt]);
    const visibleChips = selected.slice(0, MAX_CHIPS);
    const overflow = Math.max(0, selected.length - MAX_CHIPS);

    const badgeSlot = selected.length > 0 ? (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
        {visibleChips.map((v) => (
          <Chip key={v} size="sm" appearance="base" showCloseIcon onClose={() => toggle(v)}>{v}</Chip>
        ))}
        {overflow > 0 && <Badge appearance="brand" size="sm">+{overflow}</Badge>}
      </div>
    ) : undefined;

    return (
      <div style={{ padding: 16, maxWidth: 320 }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 12 }}>
          Паттерн: Accordion primitive с fullWidth, chips + Badge в badge-слоте. Ритмика идентична Dropdown sm.
        </p>
        <Accordion
          size="sm"
          fullWidth
          showBadge={selected.length > 0}
          badge={badgeSlot}
          className="bg-[var(--color-surface-1)]"
          content={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 4 }}>
              {ALL_OPTIONS.map((opt) => (
                <Checkbox
                  key={opt}
                  size="sm"
                  checked={selected.includes(opt)}
                  label={opt}
                  onChange={() => toggle(opt)}
                />
              ))}
            </div>
          }
        >
          Фреймворки
        </Accordion>
      </div>
    );
  },
};

export const RhythmComparison: StoryObj = {
  render: (args) => (
    <div style={{ padding: 16, maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>
        Accordion и Dropdown sm используют одинаковые size-токены — визуальная ритмика гарантирована на уровне компонентной базы.
      </p>
      <Accordion size="sm" fullWidth content={<span>Content</span>}>
        Accordion sm
      </Accordion>
      <div style={{ border: '1px solid var(--color-border-base)', borderRadius: 'var(--radius-default)', padding: '6px 10px', minHeight: 28, display: 'flex', alignItems: 'center', fontSize: 'var(--font-size-12)', color: 'var(--color-text-muted)' }}>
        ↑ same height as Dropdown sm ↑
      </div>
    </div>
  ),
};
