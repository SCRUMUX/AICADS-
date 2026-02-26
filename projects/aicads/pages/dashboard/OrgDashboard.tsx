/**
 * Org Dashboard / Live Ops Console
 * Layout 100% по Figma node 218:101548 (file CdeU8e5QAnPmEDOfvhOMR5).
 * Sidebar: 260×1080, padding 12/12/16/16, itemSpacing 8. Tab: padding 16/4, minHeight 32, itemSpacing 4.
 * TopBar: height 72, padding 12/24, itemSpacing 24. Только компоненты ДС и токены.
 */
import React, { useState } from 'react';
import { Tab } from '@ai-ds/core/components/Tab';
import { Button } from '@ai-ds/core/components/Button';
import { Input } from '@ai-ds/core/components/Input';
import { Avatar } from '@ai-ds/core/components/Avatar';
import { Card } from '@ai-ds/core/components/Card';
import { SectionHeader } from '@ai-ds/core/components/SectionHeader';
import { LinearProgress } from '@ai-ds/core/components/LinearProgress';
import { Link } from '@ai-ds/core/components/Link';
import { Dropdown } from '@ai-ds/core/components/Dropdown';

const IconSearch = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M14 14l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
);
const IconBell = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M10 2a5 5 0 00-5 5v3l-1.5 2h13L15 10V7a5 5 0 00-5-5zM8.5 17a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IconChevron = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IconChart = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M3 17V9l4 3 4-6 4 4v7H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
);

const sidebarItems = [
  { emoji: '🏠', label: 'Dashboards', active: true },
  { emoji: '🤖', label: 'Assistants' },
  { emoji: '🔗', label: 'Agents' },
  { emoji: '🧩', label: 'Scenarios' },
  { emoji: '📈', label: 'Analytics' },
  { emoji: '🛡️', label: 'Governance' },
  { emoji: '📚', label: 'Models & Data' },
  { emoji: '🛒', label: 'Marketplace' },
  { emoji: '💰', label: 'Budgets' },
  { emoji: '🚀', label: 'Releases' },
  { emoji: '🔔', label: 'Notifications' },
  { emoji: '❓', label: 'Help' },
];

const cardContentClass = 'flex flex-col gap-[var(--space-content-m)] min-w-0';
const cardHeaderClass = 'flex items-center justify-between gap-[var(--space-content-m)]';
const cardTitleTextClass = 'text-[length:var(--font-size-20)] font-[var(--font-weight-semibold)] leading-[var(--line-height-28)] text-[var(--color-text-primary)]';
const metricLabelClass = 'text-[length:var(--font-size-12)] leading-[var(--line-height-16)] text-[var(--color-text-muted)]';
const metricValueClass = 'text-[length:var(--font-size-20)] font-[var(--font-weight-semibold)] leading-[var(--line-height-28)] text-[var(--color-brand-primary)]';
const metricChangePositive = 'text-[length:var(--font-size-12)] font-[var(--font-weight-medium)] ml-[var(--space-content-xs)] text-[var(--color-success-base)]';
const metricChangeNegative = 'text-[length:var(--font-size-12)] font-[var(--font-weight-medium)] ml-[var(--space-content-xs)] text-[var(--color-danger-base)]';
const metricChangeMuted = 'text-[length:var(--font-size-12)] font-[var(--font-weight-medium)] ml-[var(--space-content-xs)] text-[var(--color-text-muted)]';
const metricDescClass = 'text-[length:var(--font-size-12)] leading-[var(--line-height-16)] text-[var(--color-text-muted)] mt-[var(--space-content-s)]';

function MetricRow({
  label,
  value,
  delta,
  deltaVariant,
  description,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaVariant?: 'positive' | 'negative' | 'muted';
  description?: string;
}) {
  const deltaClass =
    deltaVariant === 'positive' ? metricChangePositive :
    deltaVariant === 'negative' ? metricChangeNegative : metricChangeMuted;
  return (
    <div className="mb-[var(--space-content-m)]">
      <div className={metricLabelClass}>{label}</div>
      <div className={metricValueClass}>
        {value}
        {delta != null && <span className={deltaClass}>{delta}</span>}
      </div>
      {description != null && <div className={metricDescClass}>{description}</div>}
    </div>
  );
}

function AgentItem({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex justify-between items-center py-[var(--space-inset-xs)] text-[length:var(--font-size-12)]">
      <span className="text-[var(--color-text-primary)]">{name}</span>
      <span className="text-[var(--color-text-muted)] font-[var(--font-weight-medium)]">{count}</span>
    </div>
  );
}

export default function OrgDashboard() {
  const [roleOpen, setRoleOpen] = useState(false);

  return (
    <div
      className="flex w-full h-screen overflow-hidden bg-[var(--color-bg-base)]"
      style={{ boxShadow: 'var(--effect-elevation-3)' }}
    >
      {/* ─── Sidebar (ref: .sidebar, .sidebar-inner) ─── */}
      <aside
        className="flex flex-col w-[260px] min-w-[260px] scroll-area shrink-0"
        data-theme="dark"
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

          {/* Help bubble (ref: .help-bubble) */}
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
            <div className={cardTitleTextClass}>Hello! I&apos;m AI ORCHESTRATOR.</div>
            <div className={metricLabelClass}>
              I help you design, test, and scale AI-driven interfaces. You can:
            </div>
            <ul className="list-none pl-0 text-[length:var(--font-size-12)] leading-[var(--line-height-16)] text-[var(--color-text-muted)] [&_li]:mb-[var(--space-content-xs)] [&_li]:before:content-['•_'] [&_li]:before:text-[var(--color-brand-primary)]">
              <li>explore components and patterns</li>
              <li>check design tokens and styles</li>
              <li>prototype real scenarios with AI</li>
            </ul>
            <div className={metricLabelClass}>Tip: Type a question or pick a suggestion below to get started.</div>
            <div className="flex items-center justify-between gap-[var(--space-content-s)] flex-wrap">
              <Button appearance="outline" size="sm">Закрыть подсказки</Button>
              <div className="flex gap-[var(--space-content-xs)]">
                <Button appearance="outline" size="sm" aria-label="Назад">&lt;</Button>
                <Button appearance="outline" size="sm" aria-label="Вперед">&gt;</Button>
              </div>
            </div>
          </Card>

          {/* Footer (ref: .sidebar-footer) */}
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

      {/* ─── Main (ref: .main-content) ─── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* TopBar — Figma 218:101548: height 72, padding 12/24, itemSpacing 24 */}
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
          <div className="flex items-center gap-[var(--space-12)] ml-auto shrink-0">
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

        {/* Content (ref: .content-area) */}
        <main className="flex-1 scroll-area p-[var(--space-inset-xl)] bg-[var(--color-bg-base)]">
          <h1 className="text-[length:var(--font-size-20)] font-[var(--font-weight-semibold)] leading-[var(--line-height-28)] text-[var(--color-text-primary)] mb-[var(--space-inset-l)]">
            Активные агенты
          </h1>

          {/* Grid 12 cols, two cards span 6 (ref: .dashboard-grid) */}
          <div
            className="grid grid-cols-12 gap-[var(--space-content-l)] max-w-[1440px] mx-auto"
          >
            <Card variant="elevated" size="md" className={cardContentClass + ' col-span-6'} style={{ padding: 'var(--space-inset-l)', boxShadow: 'var(--effect-elevation-1)', borderRadius: 'var(--radius-medium)', minWidth: 0 }}>
              <header className={cardHeaderClass}>
                <div className="flex items-center gap-[var(--space-content-s)]">
                  <span className="w-5 h-5 shrink-0 flex items-center justify-center text-[var(--color-text-muted)]" aria-hidden>↑↓</span>
                  <span className={cardTitleTextClass}>Операционная эффективность</span>
                </div>
                <span className="w-6 h-6 shrink-0 flex items-center justify-center text-[var(--color-text-muted)]" title="График">📈</span>
              </header>
              <MetricRow label="Выполнено задач" value="2134" delta="+15%" deltaVariant="positive" description="Сколько задач ассистенты реально закрыли за период." />
              <MetricRow label="Доля автоматизации" value="76%" delta="+5%" deltaVariant="positive" />
              <MetricRow label="Использование ассистентов" value="82%" delta="-3%" deltaVariant="negative" />
            </Card>

            <Card variant="elevated" size="md" className={cardContentClass + ' col-span-6'} style={{ padding: 'var(--space-inset-l)', boxShadow: 'var(--effect-elevation-1)', borderRadius: 'var(--radius-medium)', minWidth: 0 }}>
              <header className={cardHeaderClass}>
                <div className="flex items-center gap-[var(--space-content-s)]">
                  <span className="w-5 h-5 shrink-0 flex items-center justify-center text-[var(--color-text-muted)]" aria-hidden>↕</span>
                  <span className={cardTitleTextClass}>Скорость и стоимость</span>
                </div>
                <span className="w-6 h-6 shrink-0 flex items-center justify-center text-[var(--color-text-muted)]">📈</span>
              </header>
              <MetricRow label="Средняя стоимость операции" value="Р 0.034" delta="+9%" deltaVariant="positive" />
              <MetricRow label="Среднее время выполнения сценария" value="3.2c" delta="-18%" deltaVariant="positive" />
              <MetricRow label="Скорость работы модели (TTFT p95)" value="1.2c" delta="+0.4" deltaVariant="positive" />
            </Card>
          </div>

          {/* Grid 5 cols (ref: .dashboard-grid-row-5) */}
          <div className="grid grid-cols-5 gap-[var(--space-content-l)] max-w-[1440px] mx-auto mt-[var(--space-inset-l)]">
            {[
              { icon: '📊', title: 'Тренд-аналитик', eff: '76%', tasks: '98', tasksDelta: '-123%', tasksVariant: 'negative' as const, agents: [{ name: 'Креативщик', count: 77 }, { name: 'Мотодист', count: 10 }, { name: 'Обозреватель', count: 11 }] },
              { icon: '✏️', title: 'Бренд-редактор', eff: '92%', effDelta: '+1%', effVariant: 'positive' as const, tasks: '147', tasksDelta: '+12%', tasksVariant: 'positive' as const, agents: [{ name: 'Автор', count: 25 }, { name: 'Редактор стиля', count: 27 }, { name: 'Аналитик фактов', count: 95 }] },
              { icon: '📅', title: 'Медиапланер', eff: '88%', tasks: '203', tasksDelta: '-2%', tasksVariant: 'negative' as const, agents: [{ name: 'Аналитик', count: 140 }, { name: 'Бухгалтер', count: 10 }, { name: 'Оптимизатор', count: 53 }] },
              { icon: '📝', title: 'Контент-планер', eff: '84%', effDelta: '-1%', effVariant: 'negative' as const, tasks: '182', agents: [{ name: 'Планировщик', count: 50 }, { name: 'Дизайнер', count: 50 }, { name: 'Редактор', count: 82 }] },
              { icon: '📢', title: 'PR менеджер', eff: '90%', tasks: '1434', agents: [{ name: 'Сборщик данных', count: 756 }, { name: 'Аналитик настроения', count: 855 }, { name: 'Маркетолог', count: 44 }] },
            ].map((block) => (
              <Card key={block.title} variant="elevated" size="md" className={cardContentClass} style={{ padding: 'var(--space-inset-l)', boxShadow: 'var(--effect-elevation-1)', borderRadius: 'var(--radius-medium)', minWidth: 0 }}>
                <header className={cardHeaderClass}>
                  <div className="flex items-center gap-[var(--space-content-s)]">
                    <span className="w-5 h-5 shrink-0 flex items-center justify-center text-base" aria-hidden>{block.icon}</span>
                    <span className={cardTitleTextClass}>{block.title}</span>
                  </div>
                  <span className="w-6 h-6 shrink-0 flex items-center justify-center text-[var(--color-text-muted)]">📈</span>
                </header>
                <MetricRow label="Эффективность" value={block.eff} delta={block.effDelta} deltaVariant={block.effVariant} />
                <MetricRow label="Выполнено задач" value={block.tasks} delta={block.tasksDelta} deltaVariant={block.tasksVariant} />
                <div className="mt-[var(--space-content-m)]">
                  {block.agents.map((a) => (
                    <AgentItem key={a.name} name={a.name} count={a.count} />
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Grid 12 cols, two cards span 6: Контуры + Оптимизация */}
          <div className="grid grid-cols-12 gap-[var(--space-content-l)] max-w-[1440px] mx-auto mt-[var(--space-inset-l)]">
            <Card variant="elevated" size="md" className={cardContentClass + ' col-span-6'} style={{ padding: 'var(--space-inset-l)', boxShadow: 'var(--effect-elevation-1)', borderRadius: 'var(--radius-medium)', minWidth: 0 }}>
              <header className={cardHeaderClass}>
                <div className="flex items-center gap-[var(--space-content-s)]">
                  <span className="w-5 h-5 shrink-0 flex items-center justify-center text-[var(--color-text-muted)]" aria-hidden>◐</span>
                  <span className={cardTitleTextClass}>Контуры использования</span>
                </div>
                <span className="w-6 h-6 shrink-0 flex items-center justify-center text-[var(--color-text-muted)]">📈</span>
              </header>
              <div className="flex flex-col gap-[var(--space-content-m)]">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[length:var(--font-size-14)] text-[var(--color-text-primary)]">Внутренний</div>
                    <div className={metricDescClass}>+ уменьшение из-за миграции ассистентов в GPT-4 Turbo</div>
                  </div>
                  <div className="text-[length:var(--font-size-18)] font-[var(--font-weight-semibold)] text-[var(--color-brand-primary)]">
                    46% <span className={metricChangeNegative}>-3%</span>
                  </div>
                </div>
                <LinearProgress size="lg" value={46} aria-label="Внутренний 46%" />
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[length:var(--font-size-14)] text-[var(--color-text-primary)]">Смешанный</div>
                    <div className={metricDescClass}>Рост за счет увеличения доли комбинированных сценариев.</div>
                  </div>
                  <div className="text-[length:var(--font-size-18)] font-[var(--font-weight-semibold)] text-[var(--color-brand-primary)]">
                    18% <span className={metricChangePositive}>+2%</span>
                  </div>
                </div>
                <LinearProgress size="lg" value={18} aria-label="Смешанный 18%" />
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[length:var(--font-size-14)] text-[var(--color-text-primary)]">Внешний</div>
                    <div className={metricDescClass}>Рост за счет увеличения нагрузки маркетинга и R&D</div>
                  </div>
                  <div className="text-[length:var(--font-size-18)] font-[var(--font-weight-semibold)] text-[var(--color-brand-primary)]">
                    36% <span className={metricChangePositive}>+1%</span>
                  </div>
                </div>
                <LinearProgress size="lg" value={36} aria-label="Внешний 36%" />
              </div>
            </Card>

            <Card variant="elevated" size="md" className={cardContentClass + ' col-span-6'} style={{ padding: 'var(--space-inset-l)', boxShadow: 'var(--effect-elevation-1)', borderRadius: 'var(--radius-medium)', minWidth: 0 }}>
              <header className={cardHeaderClass}>
                <div className="flex items-center gap-[var(--space-content-s)]">
                  <span className="w-5 h-5 shrink-0 flex items-center justify-center text-[var(--color-text-muted)]" aria-hidden>⚙</span>
                  <span className={cardTitleTextClass}>Оптимизация</span>
                </div>
                <span className="w-6 h-6 shrink-0 flex items-center justify-center text-[var(--color-text-muted)]">📈</span>
              </header>
              <div className="mb-[var(--space-content-l)]">
                <div className="text-[length:var(--font-size-12)] font-[var(--font-weight-semibold)] text-[var(--color-text-muted)] uppercase mb-[var(--space-content-s)]">Причина</div>
                <div className="text-[length:var(--font-size-14)] leading-[var(--line-height-20)] text-[var(--color-text-primary)]">78% вызовов BrandVoice + GPT-4 Turbo</div>
              </div>
              <div className="mb-[var(--space-content-l)]">
                <div className="text-[length:var(--font-size-12)] font-[var(--font-weight-semibold)] text-[var(--color-text-muted)] uppercase mb-[var(--space-content-s)]">Решение</div>
                <div className="text-[length:var(--font-size-14)] leading-[var(--line-height-20)] text-[var(--color-text-primary)]">Делить пайплайн на черновики (локально) и...</div>
              </div>
              <Link href="#" size="sm">Открыть BrandVoice Settings</Link>
              <div className="flex justify-end gap-[var(--space-content-s)] mt-[var(--space-content-l)]">
                <Button appearance="outline" size="sm">&lt; Назад</Button>
                <Button appearance="outline" size="sm">Вперед &gt;</Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
