/**
 * Org Dashboard / Live Ops Console — по макету Figma (node 832:7566)
 * https://www.figma.com/design/ZPhjQ4vsxxZGRz7ttXIyIx/Synaptik-DS-Library-Core?node-id=832-7566
 *
 * Структура из Figma API:
 * - Root: HORIZONTAL, bg white. Дети: Sidebar (260px), TopBar&SubHeader (flex).
 * - Sidebar: VERTICAL, padding 12/12/16/16, itemSpacing 8, bg dark, shadow. Дети: Navbar (layoutGrow 1), Frame 53.
 * - Navbar: внутри табы + Bubble + таб (по полному дереву).
 * - TopBar&SubHeader: VERTICAL. Дети: SubHeader (padding 24/12, itemSpacing 24, HORIZONTAL), SubHeader (24/12, 24, SPACE_BETWEEN), CardZone (padding 24/48, itemSpacing 16, WRAP).
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tab } from './Tab';
import { Badge } from '../Badge';
import { Card } from '../Card';
import { Button } from '../Button';
import { SectionHeader } from '../SectionHeader';
import { Input } from '../Input';
import { Diagram3Icon, AicaIcon } from '../../icons';

const iconStyle = { width: '100%', height: '100%' };
const navIcon = <Diagram3Icon style={iconStyle} />;

const sidebarTabClass =
  'w-full justify-start pl-[var(--space-16)] pr-[var(--space-16)] min-h-[var(--space-32)] max-h-[var(--space-40)]';

const meta: Meta = {
  title: 'Screens/Org Dashboard (Figma 832:7566)',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Экран по макету Synaptik DS — Org Dashboard / Live Ops Console (node 832:7566).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen flex flex-row bg-[var(--color-bg-base)]" style={{ fontFamily: 'var(--font-sans, inherit)' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <>
      {/* Sidebar: 260px, padding 12/12/16/16, gap 8, dark theme, shadow */}
      <div data-theme="dark">
        <aside
          className="flex flex-col w-[260px] shrink-0 pt-[var(--space-16)] pb-[var(--space-16)] pl-[var(--space-12)] pr-[var(--space-12)] gap-[var(--space-8)] bg-[var(--color-surface-2)] border-r border-solid border-[var(--color-border-base)]"
          style={{ boxShadow: 'var(--effect-elevation-1)' }}
        >
          {/* Navbar: flex-1, vertical, gap 8 — табы + Bubble + таб */}
          <nav className="flex flex-col gap-[var(--space-8)] flex-1 min-h-0">
            <Tab size="lg" appearance="brand" iconLeft={navIcon} showLeftIcon showBadge={false} showRightIcon={false} className={sidebarTabClass}>Dashboard</Tab>
            <Tab size="lg" appearance="base" iconLeft={navIcon} badge={<Badge appearance="outline" size="sm">3</Badge>} showLeftIcon showBadge showRightIcon={false} className={sidebarTabClass}>Analytics</Tab>
            <Tab size="lg" appearance="base" iconLeft={navIcon} badge={<Badge appearance="outline" size="sm">3</Badge>} showLeftIcon showBadge showRightIcon={false} className={sidebarTabClass}>Live Ops</Tab>
            <Tab size="lg" appearance="base" iconLeft={navIcon} showLeftIcon showBadge={false} showRightIcon={false} className={sidebarTabClass}>Reports</Tab>
            <Tab size="lg" appearance="base" iconLeft={navIcon} badge={<Badge appearance="outline" size="sm">3</Badge>} showLeftIcon showBadge showRightIcon={false} className={sidebarTabClass}>Campaigns</Tab>
            <Tab size="lg" appearance="base" iconLeft={navIcon} showLeftIcon showBadge={false} showRightIcon={false} className={sidebarTabClass}>Audience</Tab>
            <Tab size="lg" appearance="base" iconLeft={navIcon} showLeftIcon showBadge={false} showRightIcon={false} className={sidebarTabClass}>Content</Tab>
            <Tab size="lg" appearance="base" iconLeft={navIcon} showLeftIcon showBadge={false} showRightIcon={false} className={sidebarTabClass}>Settings</Tab>
            <Tab size="lg" appearance="base" iconLeft={navIcon} showLeftIcon showBadge={false} showRightIcon={false} className={sidebarTabClass}>Integrations</Tab>

            <Card variant="filled" size="sm" title="Quick actions" className="w-full shrink-0">
              <div className="flex flex-col gap-[var(--space-4)]">
                <Button appearance="brand" size="sm" className="w-full justify-center">New campaign</Button>
                <Button appearance="outline" size="sm" className="w-full justify-center">Export</Button>
                <Button appearance="base" size="sm" className="w-full justify-center">View all</Button>
              </div>
            </Card>

            <Tab size="lg" appearance="base" iconLeft={navIcon} showLeftIcon showBadge={false} showRightIcon={false} className={sidebarTabClass}>Help</Tab>
          </nav>

          {/* Frame 53: icon + "AI ORCHESTRATOR", itemSpacing 8, icon 28px, text 20/28/500 */}
          <div
            className="flex flex-row items-center gap-[var(--space-8)] p-[var(--space-4)] shrink-0"
            style={{ fontSize: 'var(--font-size-20)', lineHeight: 'var(--line-height-28)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-muted)' }}
          >
            <span className="shrink-0 flex items-center justify-center w-[var(--space-28)] h-[var(--space-28)] [color:inherit]">
              <AicaIcon style={iconStyle} />
            </span>
            <span className="m-0">AI ORCHESTRATOR</span>
          </div>
        </aside>
      </div>

      {/* Main: TopBar&SubHeader — SubHeader (24/12, gap 24) + SubHeader (space-between) + CardZone (24/48, gap 16, wrap) */}
      <main className="flex flex-col flex-1 min-w-0 bg-[var(--color-surface-1)]">
        {/* Первая строка: заголовок + кнопки + поиск */}
        <header className="flex flex-row flex-wrap items-center gap-[var(--space-24)] px-[var(--space-24)] py-[var(--space-12)] border-b border-solid border-[var(--color-border-base)]">
          <SectionHeader size="lg" appearance="base" className="text-style-display shrink-0">
            Live Ops Console
          </SectionHeader>
          <div className="flex flex-row items-center gap-[var(--space-24)] shrink-0">
            <Button appearance="brand" size="md">Create</Button>
            <Button appearance="outline" size="md">Filter</Button>
          </div>
          <Input appearance="base" size="md" placeholder="OpenRouter" className="min-w-[var(--space-200)] flex-1 max-w-[var(--space-320)]" />
        </header>

        {/* Вторая строка: space-between (фильтры/табы) */}
        <div className="flex flex-row items-center justify-between gap-[var(--space-24)] px-[var(--space-24)] py-[var(--space-12)] border-b border-solid border-[var(--color-border-base)]">
          <div className="flex flex-row items-center gap-[var(--space-24)]">
            <Button appearance="base" size="sm">All</Button>
            <Button appearance="ghost" size="sm">Active</Button>
            <Button appearance="ghost" size="sm">Archived</Button>
          </div>
          <Input appearance="base" size="sm" placeholder="Search..." className="w-[var(--space-280)]" />
        </div>

        {/* CardZone: padding 24/48, gap 16, wrap */}
        <div className="flex flex-row flex-wrap gap-[var(--space-16)] p-[var(--space-24)] pt-[var(--space-48)] pb-[var(--space-48)] overflow-auto">
          <Card variant="outlined" size="md" title="Overview" className="w-full min-w-[var(--space-280)] max-w-[var(--space-360)]">
            <p className="m-0 text-[var(--font-size-14)] leading-[var(--line-height-20)] text-[var(--color-text-primary)]">Metrics and summary.</p>
          </Card>
          <Card variant="outlined" size="md" title="Recent activity" className="w-full min-w-[var(--space-280)] max-w-[var(--space-360)]">
            <p className="m-0 text-[var(--font-size-14)] leading-[var(--line-height-20)] text-[var(--color-text-primary)]">Latest events and changes.</p>
          </Card>
          <Card variant="outlined" size="md" title="Campaigns" className="w-full min-w-[var(--space-280)] max-w-[var(--space-360)]">
            <p className="m-0 text-[var(--font-size-14)] leading-[var(--line-height-20)] text-[var(--color-text-primary)]">Active and scheduled campaigns.</p>
          </Card>
        </div>
      </main>
    </>
  ),
};
