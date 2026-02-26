/**
 * AI Assistant / Chat — три колонки по референсу.
 * Только компоненты ДС и токены (--space-*, --color-*, --font-*, --radius-*, --effect-*).
 */
import React, { useState } from 'react';
import { Button } from '@ai-ds/core/components/Button';
import { Input } from '@ai-ds/core/components/Input';
import { Dropdown } from '@ai-ds/core/components/Dropdown';
import { Switch } from '@ai-ds/core/components/Switch';
import { Accordion } from '@ai-ds/core/components/Accordion';
import { Link } from '@ai-ds/core/components/Link';
import { ListItem } from '@ai-ds/core/components/ListItem';
import {
  FileEarmarkIcon,
  SearchIcon,
  FolderIcon,
  FolderPlusIcon,
  GripHorizontalIcon,
  GearIcon,
  BoxArrowRightIcon,
  ChevronDownIcon,
  InfoLgIcon,
  SendIcon,
  Diagram3Icon,
  PersonIcon,
} from '@ai-ds/core/icons';

const iconSize = 20;

/* ── Left sidebar (~18%) ── */
function LeftSidebar() {
  const [projectsOpen, setProjectsOpen] = useState(true);
  const [corpOpen, setCorpOpen] = useState(true);
  const [personalOpen, setPersonalOpen] = useState(true);
  const [chatsOpen, setChatsOpen] = useState(true);

  return (
    <aside
      className="flex flex-col w-[240px] tablet:w-[18%] min-w-[200px] max-w-[280px] shrink-0 scroll-area border-r border-[var(--color-border-base)]"
      style={{ backgroundColor: 'var(--color-surface-2)' }}
    >
      <header className="flex items-center justify-between gap-[var(--space-8)] px-[var(--space-12)] py-[var(--space-12)] border-b border-[var(--color-border-base)]">
        <span className="text-[length:var(--font-size-14)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)] truncate">
          LHT.SU LAB HI TECH
        </span>
        <button type="button" className="p-[var(--space-4)] rounded-[var(--radius-default)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-3)]" aria-label="Меню">
          <GripHorizontalIcon size={iconSize} />
        </button>
      </header>

      <div className="flex flex-col gap-[var(--space-8)] p-[var(--space-12)] flex-1 min-h-0">
        <Button appearance="brand" size="sm" iconLeft={<FileEarmarkIcon size={iconSize} />} showLeftIcon className="w-full justify-start">
          Новый чат
        </Button>
        <Input
          appearance="base"
          size="sm"
          placeholder="Поиск по чатам"
          iconLeft1={<SearchIcon size={iconSize} />}
          showIconLeft1
          className="w-full"
        />

        <div className="flex flex-col gap-[var(--space-4)]">
          <Accordion size="sm" state={projectsOpen ? 'open' : 'closed'} onToggle={() => setProjectsOpen((p) => !p)} content={
            <div className="flex flex-col gap-[var(--space-4)] pt-[var(--space-4)]">
              <Link href="#" size="sm" className="flex items-center gap-[var(--space-8)]">
                <FolderPlusIcon size={iconSize} style={{ color: 'var(--color-text-muted)' }} />
                Создать проект
              </Link>
              <Accordion size="sm" state={corpOpen ? 'open' : 'closed'} onToggle={() => setCorpOpen((p) => !p)} content={
                <div className="flex flex-col gap-[var(--space-2)] pl-0 pt-[var(--space-4)]">
                  <Link href="#" size="sm" className="flex items-center gap-[var(--space-8)] text-[var(--color-text-primary)]">
                    <FolderIcon size={iconSize} style={{ color: 'var(--color-text-muted)' }} />
                    <span className="truncate">Кей-Клининг (Логистика...</span>
                  </Link>
                  <Link href="#" size="sm" className="flex items-center gap-[var(--space-8)]">Помощник ОМ</Link>
                  <Link href="#" size="sm" className="flex items-center gap-[var(--space-8)]">СИВМА - Толстый клиент</Link>
                </div>
              }>
                Корпоративные
              </Accordion>
              <Accordion size="sm" state={personalOpen ? 'open' : 'closed'} onToggle={() => setPersonalOpen((p) => !p)} content={
                <div className="pt-[var(--space-4)]">
                  <Link href="#" size="sm" className="flex items-center gap-[var(--space-8)]">
                    <FolderIcon size={iconSize} style={{ color: 'var(--color-text-muted)' }} />
                    AI orchestrator
                  </Link>
                </div>
              }>
                Личные
              </Accordion>
            </div>
          }>
            Проекты
          </Accordion>

          <Accordion size="sm" state={chatsOpen ? 'open' : 'closed'} onToggle={() => setChatsOpen((p) => !p)} iconLeft1={<GripHorizontalIcon size={iconSize} />} showIconLeft1 content={
            <div className="flex flex-col gap-0 pt-[var(--space-4)]">
              <ListItem size="sm" variant="iconMeta" state="base" label="Транскрибация:" trailingBadge={<span className="text-[length:var(--font-size-12)] text-[var(--color-text-muted)]">16:33/10.02.26</span>} showDivider={false} />
              <ListItem size="sm" variant="iconMeta" state="selected" label="Что возможно ну..." trailingBadge={<span className="text-[length:var(--font-size-12)] text-[var(--color-text-muted)]">17:08/16.01.26</span>} showDivider={false} className="rounded-[var(--radius-default)]" />
              <ListItem size="sm" variant="iconMeta" state="base" label="## Базовые экон..." trailingBadge={<span className="text-[length:var(--font-size-12)] text-[var(--color-text-muted)]">16:49/15.01.26</span>} showDivider={false} />
            </div>
          }>
            Чаты
          </Accordion>
        </div>
      </div>

      <footer className="flex items-center justify-between gap-[var(--space-8)] px-[var(--space-12)] py-[var(--space-12)] border-t border-[var(--color-border-base)]">
        <span className="text-[length:var(--font-size-14)] text-[var(--color-text-primary)]">Владимир</span>
        <div className="flex items-center gap-[var(--space-4)]">
          <button type="button" className="p-[var(--space-4)] rounded-[var(--radius-default)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-3)]" aria-label="Настройки">
            <GearIcon size={iconSize} />
          </button>
          <button type="button" className="p-[var(--space-4)] rounded-[var(--radius-default)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-3)]" aria-label="Выход">
            <BoxArrowRightIcon size={iconSize} />
          </button>
        </div>
      </footer>
    </aside>
  );
}

/* ── Center (~55%) ── */
function CenterContent() {
  const [analyticsOn, setAnalyticsOn] = useState(true);

  return (
    <main className="flex flex-col flex-1 min-w-0 overflow-hidden bg-[var(--color-bg-base)]">
      <header className="flex items-center gap-[var(--space-16)] shrink-0 px-[var(--space-24)] py-[var(--space-12)] border-b border-[var(--color-border-base)]">
        <div className="flex items-center gap-[var(--space-8)]">
          <span className="text-[length:var(--font-size-14)] text-[var(--color-text-primary)]">AI Модель:</span>
          <Dropdown size="sm" chevron={<ChevronDownIcon size={iconSize} />} items={[{ children: 'Google Gemini 2.5 Flash Lite' }]}>
            Google Gemini 2.5 Flash Lite
          </Dropdown>
        </div>
        <div className="flex items-center gap-[var(--space-8)]">
          <span className="text-[length:var(--font-size-14)] text-[var(--color-text-primary)]">Режим аналитика</span>
          <Switch size="sm" defaultChecked={analyticsOn} onToggle={() => setAnalyticsOn((p) => !p)} />
        </div>
        <button type="button" className="p-[var(--space-4)] rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)]" aria-label="Информация">
          <InfoLgIcon size={iconSize} />
        </button>
      </header>

      <article className="flex-1 scroll-area px-[var(--space-24)] py-[var(--space-24)]">
        <h1 className="text-[length:var(--font-size-24)] font-[var(--font-weight-semibold)] leading-[var(--line-height-28)] text-[var(--color-text-primary)] mb-[var(--space-16)]">
          AI Assistant Prompts
        </h1>
        <div className="flex flex-col gap-[var(--space-16)] text-[length:var(--font-size-14)] leading-[var(--line-height-20)] text-[var(--color-text-primary)]">
          <section>
            <h2 className="text-[length:var(--font-size-16)] font-[var(--font-weight-semibold)] mb-[var(--space-8)]">Al Assistant Prompts:</h2>
            <p className="mb-[var(--space-12)]">
              Вводный текст с описанием рекомендаций по промптам и разработке.
            </p>
          </section>
          <section>
            <h3 className="text-[length:var(--font-size-14)] font-[var(--font-weight-semibold)] mb-[var(--space-8)]">3. Как вести разработку:</h3>
            <ul className="list-disc pl-[var(--space-24)] space-y-[var(--space-4)] mb-[var(--space-12)]">
              <li>Итеративный подход:</li>
              <li>Регулярные код-ревью:</li>
              <li>Feature branching (ветвление по фичам):</li>
              <li>CI/CD (Continuous Integration/Continuous Deployment):</li>
            </ul>
            <p className="mb-[var(--space-8)] font-[var(--font-weight-medium)]">Используйте Al-помощник Cursor:</p>
            <ul className="list-disc pl-[var(--space-24)] space-y-[var(--space-4)] mb-[var(--space-12)]">
              <li>Генерация boilerplate кода:</li>
              <li>Написание тестов:</li>
              <li>Рефакторинг и оптимизация:</li>
              <li>Поиск багов:</li>
            </ul>
            <p className="mb-[var(--space-8)] font-[var(--font-weight-medium)]">Джоберти (Job Alignment):</p>
            <p className="mb-[var(--space-12)]">Описание выравнивания задач и ролей.</p>
            <p className="mb-[var(--space-12)]">
              Резюмируя: следование рекомендациям ускоряет разработку и повышает качество.
            </p>
            <p className="mb-[var(--space-12)]">
              Я готов помочь с подготовкой ТЗ, как только у нас будут утверждены макеты.
            </p>
            <p className="text-[length:var(--font-size-12)] text-[var(--color-text-muted)]">16.01.26, 17:08</p>
          </section>
        </div>
      </article>

      <footer className="shrink-0 flex items-center gap-[var(--space-8)] px-[var(--space-24)] py-[var(--space-12)] border-t border-[var(--color-border-base)] bg-[var(--color-surface-1)]">
        <button type="button" className="p-[var(--space-8)] rounded-[var(--radius-default)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)]" aria-label="Добавить">
          <span className="text-[length:var(--font-size-18)] leading-none">+</span>
        </button>
        <button type="button" className="p-[var(--space-8)] rounded-[var(--radius-default)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)]" aria-label="Вложение">
          <span className="w-5 h-5 border border-[var(--color-border-base)] rounded-[var(--radius-default)]" />
        </button>
        <Input appearance="base" size="md" placeholder="Введите ваше сообщение..." fullWidth showClearButton className="flex-1 min-w-0" />
        <Button appearance="brand" size="sm" iconLeft={<SendIcon size={iconSize} />} showLeftIcon showLabel={false} aria-label="Отправить" />
      </footer>
    </main>
  );
}

/* ── Right sidebar (~27%) ── */
const rightLinks = [
  { icon: FileEarmarkIcon, label: 'Документы' },
  { icon: FileEarmarkIcon, label: 'Проверка договоров' },
  { icon: Diagram3Icon, label: 'База знаний' },
  { icon: PersonIcon, label: 'Пользователи' },
  { icon: Diagram3Icon, label: 'АЛЬТ' },
  { icon: Diagram3Icon, label: 'Статистика' },
  { icon: FileEarmarkIcon, label: 'Список изменений' },
];

function RightSidebar() {
  const [themeOn, setThemeOn] = useState(true);

  return (
    <aside
      className="hidden tablet:flex flex-col w-[280px] tablet:w-[27%] min-w-[200px] max-w-[320px] shrink-0 scroll-area border-l border-[var(--color-border-base)]"
      style={{ backgroundColor: 'var(--color-surface-2)' }}
    >
      <header className="flex items-center gap-[var(--space-8)] px-[var(--space-16)] py-[var(--space-12)] border-b border-[var(--color-border-base)]">
        <span className="text-[length:var(--font-size-16)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">ЛВТ</span>
        <Diagram3Icon size={iconSize} style={{ color: 'var(--color-text-muted)' }} />
      </header>

      <nav className="flex flex-col gap-[var(--space-2)] p-[var(--space-16)] flex-1">
        {rightLinks.map(({ icon: Icon, label }) => (
          <Link key={label} href="#" size="md" className="flex items-center gap-[var(--space-12)] py-[var(--space-8)] px-[var(--space-8)] rounded-[var(--radius-default)] hover:bg-[var(--color-surface-3)] text-[var(--color-text-primary)]">
            <Icon size={iconSize} style={{ color: 'var(--color-text-muted)' }} />
            {label}
          </Link>
        ))}
      </nav>

      <footer className="flex items-center justify-between gap-[var(--space-8)] px-[var(--space-16)] py-[var(--space-12)] border-t border-[var(--color-border-base)]">
        <span className="text-[length:var(--font-size-14)] text-[var(--color-text-primary)]">Светлая тема</span>
        <Switch size="sm" defaultChecked={themeOn} onToggle={() => setThemeOn((p) => !p)} />
      </footer>
    </aside>
  );
}

export default function ChatAssistant() {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-[var(--color-bg-base)]">
      <LeftSidebar />
      <CenterContent />
      <RightSidebar />
    </div>
  );
}
