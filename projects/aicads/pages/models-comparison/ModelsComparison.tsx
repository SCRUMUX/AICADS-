/**
 * Модели: сравнение и арбитраж
 * Layout 100% по Figma node 218:101548 (file CdeU8e5QAnPmEDOfvhOMR5).
 * Sidebar: 260px, padding 12/16, itemSpacing 8. Tab: padding 16/4, minHeight 32.
 * TopBar: height 72, padding 12/24, itemSpacing 24.
 * SubHeader: height 72, padding 12/24, itemSpacing 24, justify-between.
 * CardZone: padding 16, Section "Модель" + Table.
 * Только компоненты ДС и токены.
 */
import React, { useState } from 'react';
import { Tab } from '@ai-ds/core/components/Tab';
import { Button } from '@ai-ds/core/components/Button';
import { Input } from '@ai-ds/core/components/Input';
import { Avatar } from '@ai-ds/core/components/Avatar';
import { Card } from '@ai-ds/core/components/Card';
import { SectionHeader } from '@ai-ds/core/components/SectionHeader';
import { Dropdown } from '@ai-ds/core/components/Dropdown';
import { Table } from '@ai-ds/core/components/Table';

const IconSearch = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M14 14l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
);
const IconBell = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M10 2a5 5 0 00-5 5v3l-1.5 2h13L15 10V7a5 5 0 00-5-5zM8.5 17a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IconChevron = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IconMonitor = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M6 18h8M10 14v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
);
const IconCalendar = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M3 8h14M7 2v4M13 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
);
const IconFilter = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M2 4h16M4 10h12M6 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
);
const IconSettings = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5"/><path d="M16 10a1 1 0 01.2.6l-.8 1.2a1 1 0 01-1.4.2 6 6 0 01-1.2-1.2 1 1 0 01-.2-1.4l1.2-.8a1 1 0 01.6-.2 1 1 0 011 1zM4 10a1 1 0 01-.2.6l.8 1.2a1 1 0 001.4.2 6 6 0 001.2-1.2 1 1 0 00.2-1.4l-1.2-.8a1 1 0 00-.6-.2 1 1 0 00-1 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
);

const sidebarItems = [
  { emoji: '📚', label: 'Модели', active: true },
  { emoji: '💬', label: 'Диалог' },
  { emoji: '🧩', label: 'Сценарии' },
  { emoji: '📈', label: 'Аналитика' },
  { emoji: '🛡️', label: 'Безопасность' },
  { emoji: '🛒', label: 'Паттерны' },
  { emoji: '🚀', label: 'Проект' },
  { emoji: '🔔', label: 'Новости' },
  { emoji: '❓', label: 'Подсказки' },
];

const cardContentClass = 'flex flex-col gap-[var(--space-content-m)] min-w-0';

interface ModelRow {
  model: string;
  cost: string;
  speed: string;
  errors: string;
  context: string;
}

const sampleRows: ModelRow[] = [
  { model: 'GPT-4 Turbo', cost: '$2.00', speed: '12.5', errors: '0.1%', context: '128K' },
  { model: 'Claude 3.5 Sonnet', cost: '$3.00', speed: '15.2', errors: '0.05%', context: '200K' },
  { model: 'Gemini 1.5 Pro', cost: '$1.25', speed: '18.0', errors: '0.08%', context: '1M' },
  { model: 'Llama 3.1 70B', cost: '$0.52', speed: '22.1', errors: '0.12%', context: '128K' },
  { model: 'Mixtral 8x22B', cost: '$0.65', speed: '20.5', errors: '0.15%', context: '64K' },
];

export default function ModelsComparison() {
  const [roleOpen, setRoleOpen] = useState(false);
  const [orgOpen, setOrgOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div
      className="flex w-full h-screen overflow-hidden bg-[var(--color-bg-base)]"
      style={{ boxShadow: 'var(--effect-elevation-3)' }}
    >
      {/* ─── Sidebar (Figma 218:101549) ─── */}
      <aside
        className="flex flex-col w-[260px] min-w-[260px] scroll-area shrink-0"
        style={{
          backgroundColor: 'var(--color-bg-base)',
          boxShadow: 'var(--effect-elevation-1)',
        }}
      >
        <div
          className="flex flex-col gap-[var(--space-8)] flex-1 py-[var(--space-16)] px-[var(--space-12)]"
        >
          <nav className="flex flex-col gap-[var(--space-8)] flex-1">
            {sidebarItems.map((item) => (
              <Tab
                key={item.label}
                appearance={item.active ? 'brand' : 'ghost'}
                size="md"
                className="min-h-[var(--space-32)] px-[var(--space-16)] py-[var(--space-4)] gap-[var(--space-4)] justify-start"
              >
                <span className="w-5 h-5 shrink-0 flex items-center justify-center text-base" aria-hidden>{item.emoji}</span>
                {item.label}
              </Tab>
            ))}
          </nav>

          {/* Help bubble */}
          <Card
            variant="base"
            size="md"
            className={cardContentClass}
            style={{
              padding: 'var(--space-12) var(--space-16)',
              gap: 'var(--space-12)',
              borderRadius: 'var(--radius-medium)',
              border: '1px solid var(--color-border-base)',
              backgroundColor: 'var(--color-surface-2)',
            }}
          >
            <div className="text-[length:var(--font-size-20)] font-[var(--font-weight-semibold)] leading-[var(--line-height-28)] text-[var(--color-text-primary)]">Hello! I&apos;m AI ORCHESTRATOR.</div>
            <div className="text-[length:var(--font-size-12)] leading-[var(--line-height-16)] text-[var(--color-text-muted)]">
              I help you design, test, and scale AI-driven interfaces.
            </div>
            <div className="flex gap-[var(--space-content-xs)]">
              <Button appearance="outline" size="sm">Закрыть подсказки</Button>
              <Button appearance="brand" size="sm">Получить API</Button>
            </div>
          </Card>

          <div className="flex flex-col gap-[var(--space-8)] mt-0">
            <Tab appearance="ghost" size="md" className="min-h-[var(--space-32)] px-[var(--space-16)] py-[var(--space-4)] gap-[var(--space-4)] justify-start text-[var(--color-text-muted)]">
              <span className="w-5 h-5 shrink-0 flex items-center justify-center text-base" aria-hidden>⚙️</span>
              Dev Tools
            </Tab>
            <div className="text-[length:var(--font-size-12)] text-[var(--color-text-muted)] px-[var(--space-16)] pt-[var(--space-4)]">
              AI ORCHESTRATOR
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Main ─── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* TopBar — Figma: height 72, padding 12/24, itemSpacing 24 */}
        <header
          className="flex items-center gap-[var(--space-24)] shrink-0 min-h-[var(--space-72)] py-[var(--space-12)] px-[var(--space-24)] border-b border-[var(--color-border-base)] bg-[var(--color-surface-1)]"
        >
          <div className="flex flex-col gap-[var(--space-8)]">
            <span className="text-[length:var(--font-size-10)] leading-[var(--line-height-12)] text-[var(--color-text-muted)] uppercase">Рабочий контур</span>
            <div className="flex gap-[var(--space-6)] items-center">
              <Button appearance="brand" size="sm">Смешанный</Button>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-8)]">
            <span className="text-[length:var(--font-size-10)] leading-[var(--line-height-12)] text-[var(--color-text-muted)] uppercase">Роль</span>
            <Dropdown
              size="sm"
              chevron={<IconChevron />}
              state={roleOpen ? 'open' : 'closed'}
              onOpenChange={setRoleOpen}
              items={[{ children: '👤 Руководитель' }]}
              className="min-w-[140px]"
            >
              👤 Руководитель
            </Dropdown>
          </div>
          <div className="flex-1 max-w-[424px] relative min-w-0">
            <span className="absolute left-[var(--space-12)] top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none [--icon-size:20px] flex items-center justify-center w-5 h-5">
              <IconSearch />
            </span>
            <Input
              appearance="base"
              size="md"
              placeholder="Введите название ассистента или сценария"
              className="pl-[var(--space-40)] h-[var(--space-40)] rounded-[var(--radius-medium)]"
            />
          </div>
          <Button appearance="brand" size="md" className="shrink-0">
            Получить API
          </Button>
          <div className="flex items-center gap-[var(--space-12)] shrink-0">
            <button type="button" className="w-6 h-6 flex items-center justify-center text-[var(--color-text-muted)] cursor-pointer" title="Уведомления" aria-label="Уведомления">
              <IconBell />
            </button>
            <div className="flex items-center gap-[var(--space-12)]">
              <Avatar variant="registered-no-photo" size="sm" initials="VK" />
              <div className="text-right">
                <div className="text-[length:var(--font-size-10)] leading-[var(--line-height-12)] text-[var(--color-text-muted)]">Сформировано 2 НОЯБРЯ 2025, 10:14</div>
                <div className="text-[length:var(--font-size-10)] leading-[var(--line-height-12)] text-[var(--color-text-muted)]">Версия 1.4.2</div>
              </div>
            </div>
          </div>
        </header>

        {/* SubHeader — Figma 218:101570: height 72, padding 12/24, itemSpacing 24, justify-between */}
        <div
          className="flex items-center justify-between gap-[var(--space-24)] shrink-0 min-h-[var(--space-72)] py-[var(--space-12)] px-[var(--space-24)] border-b border-[var(--color-border-base)] bg-[var(--color-surface-1)]"
        >
          <div className="flex items-center gap-[var(--space-24)]">
            {/* Frame 58: OpenRouter + Сортировка */}
            <div className="flex flex-col gap-[var(--space-4)]">
              <span className="text-[length:var(--font-size-12)] leading-[var(--line-height-16)] text-[var(--color-text-muted)]">Организация</span>
              <Dropdown
                size="sm"
                chevron={<IconChevron />}
                state={orgOpen ? 'open' : 'closed'}
                onOpenChange={setOrgOpen}
                items={[{ children: 'OpenRouter' }]}
                className="min-w-[200px]"
              >
                OpenRouter
              </Dropdown>
            </div>
            <div className="flex flex-col gap-[var(--space-4)]">
              <span className="text-[length:var(--font-size-12)] leading-[var(--line-height-16)] text-[var(--color-text-muted)]">Сортировка</span>
              <Dropdown
                size="sm"
                chevron={<IconChevron />}
                state={sortOpen ? 'open' : 'closed'}
                onOpenChange={setSortOpen}
                items={[{ children: 'По скорости' }]}
                className="min-w-[140px]"
              >
                По скорости
              </Dropdown>
            </div>
            <Button appearance="brand" size="md" className="shrink-0">
              <span className="flex items-center gap-[var(--space-content-s)]">
                <IconMonitor />
                Мониторинг
              </span>
            </Button>
          </div>
          <div className="flex items-center gap-[var(--space-24)]">
            <Dropdown
              size="md"
              chevron={<IconChevron />}
              state="closed"
              items={[{ children: '1-31 октябрь 2025' }]}
              className="min-w-[180px]"
            >
              <span className="flex items-center gap-[var(--space-content-s)]">
                <IconCalendar />
                1-31 октябрь 2025
              </span>
            </Dropdown>
            <div className="flex items-center gap-[var(--space-8)]">
              <button type="button" className="w-6 h-6 flex items-center justify-center text-[var(--color-text-muted)] cursor-pointer" title="Фильтр" aria-label="Фильтр">
                <IconFilter />
              </button>
              <button type="button" className="w-6 h-6 flex items-center justify-center text-[var(--color-text-muted)] cursor-pointer" title="Настройки" aria-label="Настройки">
                <IconSettings />
              </button>
            </div>
          </div>
        </div>

        {/* CardZone — Figma 218:101592: scrollable, padding 16 */}
        <main className="flex-1 scroll-area p-[var(--space-16)] bg-[var(--color-bg-base)]">
          <h1 className="text-[length:var(--font-size-20)] font-[var(--font-weight-semibold)] leading-[var(--line-height-28)] text-[var(--color-text-primary)] mb-[var(--space-inset-l)]">
            Модели: сравнение и арбитраж
          </h1>

          {/* Section "Модель" — Figma 218:101594 */}
          <div className="mb-[var(--space-16)]">
            <SectionHeader size="md" appearance="base" className="mb-[var(--space-8)] px-[var(--space-16)] py-[var(--space-2)]">
              Модель
            </SectionHeader>
            <Table<ModelRow>
              size="md"
              appearance="base"
              columns={[
                { key: 'model', label: 'Модель', width: '20%' },
                { key: 'cost', label: 'Стоимость 1M токенов', width: '20%' },
                { key: 'speed', label: 'Скорость ток/сек', width: '20%' },
                { key: 'errors', label: 'Процент ошибок', width: '20%' },
                { key: 'context', label: 'Контекстное окно', width: '20%' },
              ]}
              rows={sampleRows}
              getRowKey={(row) => row.model}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
