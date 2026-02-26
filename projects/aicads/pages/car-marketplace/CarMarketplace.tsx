/**
 * Каталог автомобилей (encar.ab-korea.ru)
 * Максимальная точность по скриншоту: навбар, hero-баннер, фильтры, сетка карточек.
 * Только компоненты ДС и токены.
 */
import React, { useState } from 'react';
import { Link } from '@ai-ds/core/components/Link';
import { Button } from '@ai-ds/core/components/Button';
import { Dropdown } from '@ai-ds/core/components/Dropdown';
import { Input } from '@ai-ds/core/components/Input';
import { Card } from '@ai-ds/core/components/Card';
import { Badge } from '@ai-ds/core/components/Badge';
import { SectionHeader } from '@ai-ds/core/components/SectionHeader';
import { Image } from '@ai-ds/core/components/Image';

const IconChevron = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IconArrowLeft = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IconArrowRight = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IconInfo = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 7v1M10 13v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
);
const IconShield = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none"><path d="M10 2l6 3v5a6 6 0 01-6 9 6 6 0 01-6-9V5l6-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
);

interface CarCard {
  model: string;
  price: string;
  priceBadge?: { label: string; appearance: 'success' | 'info' | 'danger' | 'warning' };
  yearMonth: string;
  mileage: string;
  drive: string;
  engine: string;
}

const sampleCars: CarCard[] = [
  { model: 'BMW X5 xDrive 30d xLine', price: '9 265 490 ₽', priceBadge: { label: 'Отличная цена', appearance: 'success' }, yearMonth: '2025.01', mileage: '22425 км.', drive: '4WD', engine: '1998 см³ (188 л.с.)' },
  { model: 'BMW 5-Series 520i M Sport', price: '8 120 000 ₽', priceBadge: { label: 'Хорошая цена', appearance: 'info' }, yearMonth: '2024.06', mileage: '26440 км.', drive: '2WD', engine: '1998 см³ (184 л.с.)' },
  { model: 'Audi A6 45 TFSI', price: '7 890 000 ₽', priceBadge: { label: 'Высокая цена', appearance: 'danger' }, yearMonth: '2024.03', mileage: '18500 км.', drive: '2WD', engine: '1984 см³ (245 л.с.)' },
  { model: 'BMW X3 xDrive 20d', price: '6 450 000 ₽', priceBadge: { label: 'Нормальная цена', appearance: 'warning' }, yearMonth: '2023.11', mileage: '32000 км.', drive: '4WD', engine: '1995 см³ (190 л.с.)' },
  { model: 'Mercedes-Benz E 200', price: '8 990 000 ₽', yearMonth: '2024.08', mileage: '12000 км.', drive: '2WD', engine: 'Нет данных' },
  { model: 'Lexus RX 350', price: '10 200 000 ₽', priceBadge: { label: 'Отличная цена', appearance: 'success' }, yearMonth: '2024.01', mileage: '15000 км.', drive: '4WD', engine: '3456 см³ (262 л.с.)' },
];

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[var(--space-4)]">
      <label className="text-[length:var(--font-size-12)] leading-[var(--line-height-16)] text-[var(--color-text-muted)]">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function CarMarketplace() {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg-base)]">
      {/* 1. Top Navigation Bar — тёмный фон */}
      <header
        data-theme="dark"
        className="relative flex items-center justify-between shrink-0 px-[var(--space-24)] py-[var(--space-12)] bg-[var(--color-bg-base)]"
      >
        <nav className="flex items-center gap-[var(--space-24)]">
          <Link href="#" size="md" className="text-[var(--color-text-primary)]">Автомобили в наличии</Link>
          <Link href="#" size="md" className="text-[var(--color-text-primary)]">Кейсы</Link>
          <Link href="#" size="md" className="text-[var(--color-text-primary)]">Отзывы</Link>
        </nav>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-[var(--space-8)]">
          <span className="text-[length:var(--font-size-20)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">AR KOREA</span>
        </div>
        <nav className="flex items-center gap-[var(--space-24)]">
          <Link href="#" size="md" className="text-[var(--color-text-primary)]">Ответы на вопросы</Link>
          <Link href="#" size="md" className="text-[var(--color-text-primary)]">О нас</Link>
          <Link href="#" size="md" className="text-[var(--color-text-primary)]">Контакты</Link>
        </nav>
      </header>

      {/* 2. Hero Banner — тёмный, с гарантией и стрелками */}
      <section
        data-theme="dark"
        className="relative flex items-center justify-between shrink-0 min-h-[var(--space-320)] px-[var(--space-24)] py-[var(--space-48)] bg-[var(--color-bg-base)] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[var(--color-surface-2)] opacity-60" aria-hidden />
        <Button
          appearance="ghost"
          size="md"
          showLabel={false}
          iconLeft={<IconArrowLeft />}
          className="relative z-10 w-[var(--space-40)] h-[var(--space-40)] rounded-full bg-[var(--color-surface-1)]/80 text-[var(--color-text-primary)] shrink-0"
          aria-label="Назад"
        />
        <div className="relative z-10 flex items-center gap-[var(--space-24)] flex-1 justify-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-surface-1)] text-[var(--color-danger-base)] shrink-0">
            <IconShield />
          </div>
          <div className="flex flex-col gap-[var(--space-8)]">
            <span className="text-[length:var(--font-size-18)] font-[var(--font-weight-semibold)] leading-[var(--line-height-28)] text-[var(--color-text-primary)] uppercase">
              Персональная гарантия на заказанный автомобиль
            </span>
            <span className="text-[length:var(--font-size-32)] font-[var(--font-weight-semibold)] leading-[var(--line-height-40)] text-[var(--color-danger-base)]">
              6 месяцев
            </span>
          </div>
        </div>
        <Button
          appearance="ghost"
          size="md"
          showLabel={false}
          iconLeft={<IconArrowRight />}
          className="relative z-10 w-[var(--space-40)] h-[var(--space-40)] rounded-full bg-[var(--color-surface-1)]/80 text-[var(--color-text-primary)] shrink-0"
          aria-label="Вперёд"
        />
      </section>

      {/* 3. Section Title */}
      <div className="w-full py-[var(--space-24)] shrink-0">
        <SectionHeader size="lg" appearance="base" className="justify-center w-full">
          Автомобили в продаже
        </SectionHeader>
      </div>

      {/* 4. Two Columns: Filters + Listings */}
      <div className="flex flex-1 min-h-0">
        {/* 3b. Left Column: Filters Sidebar — 260px */}
        <aside
          className="w-[260px] min-w-[260px] shrink-0 scroll-area border-r border-[var(--color-border-base)] bg-[var(--color-surface-1)] p-[var(--space-16)]"
        >
          <div className="text-[length:var(--font-size-14)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)] mb-[var(--space-16)]">
            Фильтры
          </div>
          <div className="flex flex-col gap-[var(--space-16)]">
            <FilterRow label="Марка">
              <Dropdown size="sm" chevron={<IconChevron />} state="closed" items={[{ children: 'Все' }]} className="w-full">
                Все
              </Dropdown>
            </FilterRow>
            <FilterRow label="Модель">
              <Dropdown size="sm" chevron={<IconChevron />} state="closed" items={[{ children: 'Все' }]} className="w-full">
                Все
              </Dropdown>
            </FilterRow>
            <FilterRow label="Комплектация">
              <Input appearance="base" size="sm" placeholder="" className="w-full" />
            </FilterRow>
            <FilterRow label="Дата выпуска от">
              <div className="flex gap-[var(--space-8)]">
                <Dropdown size="sm" chevron={<IconChevron />} state="closed" items={[{ children: 'Год' }]} className="flex-1 min-w-0">
                  Год
                </Dropdown>
                <Dropdown size="sm" chevron={<IconChevron />} state="closed" items={[{ children: 'Месяц' }]} className="flex-1 min-w-0">
                  Месяц
                </Dropdown>
              </div>
            </FilterRow>
            <FilterRow label="Дата выпуска до">
              <div className="flex gap-[var(--space-8)]">
                <Dropdown size="sm" chevron={<IconChevron />} state="closed" items={[{ children: 'Год' }]} className="flex-1 min-w-0">
                  Год
                </Dropdown>
                <Dropdown size="sm" chevron={<IconChevron />} state="closed" items={[{ children: 'Месяц' }]} className="flex-1 min-w-0">
                  Месяц
                </Dropdown>
              </div>
            </FilterRow>
            <FilterRow label="Цена, ₽">
              <div className="flex gap-[var(--space-8)]">
                <Input appearance="base" size="sm" placeholder="от" className="flex-1 min-w-0" />
                <Input appearance="base" size="sm" placeholder="до" className="flex-1 min-w-0" />
              </div>
            </FilterRow>
            <FilterRow label="Пробег">
              <div className="flex gap-[var(--space-8)]">
                <Input appearance="base" size="sm" placeholder="от" className="flex-1 min-w-0" />
                <Input appearance="base" size="sm" placeholder="до" className="flex-1 min-w-0" />
              </div>
            </FilterRow>
            <FilterRow label="Объём двигателя, см³">
              <div className="flex gap-[var(--space-8)]">
                <Input appearance="base" size="sm" placeholder="от" className="flex-1 min-w-0" />
                <Input appearance="base" size="sm" placeholder="до" className="flex-1 min-w-0" />
              </div>
            </FilterRow>
            <FilterRow label="Мощность двигателя, л.с.">
              <div className="flex gap-[var(--space-8)]">
                <Input appearance="base" size="sm" placeholder="от" className="flex-1 min-w-0" />
                <Input appearance="base" size="sm" placeholder="до" className="flex-1 min-w-0" />
              </div>
            </FilterRow>
            <FilterRow label="Сумма страховых выплат">
              <Dropdown size="sm" chevron={<IconChevron />} state="closed" items={[{ children: 'Все' }, { children: 'до 25 000 ₽' }, { children: 'до 50 000 ₽' }]} className="w-full">
                Все
              </Dropdown>
            </FilterRow>
            <FilterRow label="Привод">
              <Input appearance="base" size="sm" placeholder="" className="w-full" />
            </FilterRow>
            <FilterRow label="Топливо">
              <Input appearance="base" size="sm" placeholder="" className="w-full" />
            </FilterRow>
            <FilterRow label="Трансмиссия">
              <Input appearance="base" size="sm" placeholder="" className="w-full" />
            </FilterRow>
            <FilterRow label="Класс автомобиля">
              <Dropdown size="sm" chevron={<IconChevron />} state="closed" items={[{ children: 'Все' }]} className="w-full">
                Все
              </Dropdown>
            </FilterRow>
            <FilterRow label="Цвет кузова">
              <Input appearance="base" size="sm" placeholder="" className="w-full" />
            </FilterRow>
            <FilterRow label="Цвет салона">
              <Input appearance="base" size="sm" placeholder="" className="w-full" />
            </FilterRow>
            <FilterRow label="Количество мест">
              <Input appearance="base" size="sm" placeholder="" className="w-full" />
            </FilterRow>
            <FilterRow label="Опции">
              <Input appearance="base" size="sm" placeholder="" className="w-full" />
            </FilterRow>
            <div className="flex gap-[var(--space-8)] pt-[var(--space-8)]">
              <Button appearance="outline" size="sm" className="flex-1">Сбросить все</Button>
              <Button appearance="brand" size="sm" className="flex-1">Применить фильтры</Button>
            </div>
          </div>
        </aside>

        {/* 3c. Right Column: Car Listings */}
        <main className="flex-1 min-w-0 scroll-area p-[var(--space-24)] bg-[var(--color-bg-base)]">
          {/* Top bar: count + sort */}
          <div className="flex items-center justify-between mb-[var(--space-16)]">
            <span className="text-[length:var(--font-size-14)] text-[var(--color-text-muted)]">
              51279 авто в каталоге
            </span>
            <div className="flex items-center gap-[var(--space-8)]">
              <span className="text-[length:var(--font-size-14)] text-[var(--color-text-muted)]">Сортировать по:</span>
              <Dropdown
                size="sm"
                chevron={<IconChevron />}
                state={sortOpen ? 'open' : 'closed'}
                onOpenChange={setSortOpen}
                items={[
                  { children: 'Сначала новые авто' },
                  { children: 'Цена по возрастанию' },
                  { children: 'Цена по убыванию' },
                  { children: 'Пробег по возрастанию' },
                  { children: 'Пробег по убыванию' },
                ]}
                className="min-w-[200px]"
              >
                Сначала новые авто
              </Dropdown>
            </div>
          </div>

          {/* Car cards grid — 3 columns */}
          <div className="grid grid-cols-3 gap-[var(--space-16)]">
            {sampleCars.map((car) => (
              <Card
                key={car.model}
                variant="elevated"
                size="md"
                className="overflow-hidden"
                style={{ boxShadow: 'var(--effect-elevation-1)', borderRadius: 'var(--radius-medium)' }}
              >
                <div className="flex flex-col">
                  {/* Image area with badge overlay */}
                  <div className="relative aspect-[4/3] bg-[var(--color-surface-2)] overflow-hidden flex items-center justify-center">
                    <Image size="md" ratio="4:3" state="empty" alt="" emptyText="" style={{ width: '100%', minWidth: '100%', aspectRatio: '4/3' }} className="!w-full !min-w-full" />
                    {car.priceBadge && (
                      <div className="absolute top-[var(--space-8)] left-[var(--space-8)]">
                        <Badge appearance={car.priceBadge.appearance} size="sm">
                          {car.priceBadge.label}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-[var(--space-12)] flex flex-col gap-[var(--space-8)]">
                    <div className="text-[length:var(--font-size-14)] font-[var(--font-weight-semibold)] leading-[var(--line-height-20)] text-[var(--color-text-primary)]">
                      {car.model}
                    </div>
                    <div className="flex items-center gap-[var(--space-4)]">
                      <span className="text-[length:var(--font-size-18)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">
                        {car.price}
                      </span>
                      <button type="button" className="w-4 h-4 flex items-center justify-center text-[var(--color-text-muted)] cursor-pointer" title="Подробнее" aria-label="Подробнее">
                        <IconInfo />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-[var(--space-8)] text-[length:var(--font-size-12)] text-[var(--color-text-muted)]">
                      <span>{car.yearMonth}</span>
                      <span>{car.mileage}</span>
                      <span>{car.drive}</span>
                      <span>{car.engine}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
