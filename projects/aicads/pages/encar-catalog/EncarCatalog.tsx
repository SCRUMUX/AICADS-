/**
 * Encar Korea — Car Catalog
 * Фильтры: аккордионы с чекбоксами + чипсы в заголовке + badge overflow
 * Hero: full-width, параллакс, динамические подписи, sticky header
 */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@ai-ds/core/components/Button';
import { Badge }  from '@ai-ds/core/components/Badge';
import { Input }  from '@ai-ds/core/components/Input';
import { Dropdown } from '@ai-ds/core/components/Dropdown';
import { Divider } from '@ai-ds/core/components/Divider';
import { Link }    from '@ai-ds/core/components/Link';
import { Image }   from '@ai-ds/core/components/Image';
import EncarCarCardPage from './EncarCarCardPage';
import type { CarCardData } from './EncarCarCardPage';

/* ─── Icons ─── */
const IconChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M13 4L7 10l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconInfo = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.25"/>
    <path d="M7 6.5v4M7 4.5v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconEngine = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="2" y="4" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M5 4V2.5M9 4V2.5M2 7H1M13 7H12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M5.5 7a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);
const IconFilter = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconShieldCheck = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <path d="M40 6L68 18v20c0 16-11.2 30.8-28 36C23.2 68.8 12 54 12 38V18L40 6z" stroke="var(--color-danger-base)" strokeWidth="3" fill="none"/>
    <path d="M40 6L68 18v20c0 16-11.2 30.8-28 36C23.2 68.8 12 54 12 38V18L40 6z" fill="var(--color-surface-2)" opacity="0.15"/>
    <path d="M27 40l9 9 17-17" stroke="var(--color-danger-base)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Data ─── */
const TRIM_OPTIONS = ['Base', 'Comfort', 'Sport', 'Luxury', 'Premium', 'Executive', 'M Sport', 'xLine', 'AMG Line', 'Maybach'];
const BODY_COLORS = ['Белый', 'Чёрный', 'Серебристый', 'Серый', 'Синий', 'Красный', 'Коричневый', 'Бежевый', 'Зелёный'];
const INTERIOR_COLORS = ['Чёрный', 'Бежевый', 'Коричневый', 'Серый', 'Белый'];
const SEATS_OPTIONS = ['2', '4', '5', '6', '7', '8'];
const DRIVE_OPTIONS = ['4WD', '2WD', 'AWD'];
const FUEL_OPTIONS = ['Бензин', 'Дизель', 'Гибрид', 'Электро'];
const TRANS_OPTIONS = ['Автомат', 'Механика', 'Робот'];

const INSURANCE_OPTIONS = [
  { value: '', label: 'Все' },
  { value: '25', label: 'до 25 000 ₽' },
  { value: '50', label: 'до 50 000 ₽' },
  { value: '75', label: 'до 75 000 ₽' },
  { value: '100', label: 'до 100 000 ₽' },
  { value: '150', label: 'до 150 000 ₽' },
  { value: '200', label: 'до 200 000 ₽' },
  { value: '250', label: 'до 250 000 ₽' },
  { value: '300', label: 'до 300 000 ₽' },
];

const CARS: CarCardData[] = [
  { id: 1, name: 'BMW X5 xDrive 30d xLine', price: '9 265 490 ₽', badge: 'Отличная цена', extraBadge: 'Расчет без УС', yearMonth: '2025.01', mileage: '22 425 км', drive: '4WD', engine: '2 993 см³ (249 л.с.)', fuel: 'Дизель', transmission: 'АКПП', insurancePayout: '725 703 ₽', firstRegistration: '2025.01', bodyColor: 'Чёрный', interiorColor: 'Чёрный', seats: '5', trim: 'xLine', src: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=480&q=75', photos: ['https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=75', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=75', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=75'], options: ['ABS', 'Навигация', 'Кожаный салон', 'Подогрев сидений', 'Парктроник', 'Камера 360°', 'Климат-контроль', 'Круиз-контроль'] },
  { id: 2, name: 'BMW 5-Series 520i M Sport', price: '6 291 020 ₽', badge: 'Отличная цена', yearMonth: '2024.06', mileage: '26 440 км', drive: '2WD', engine: '1 998 см³ (188 л.с.)', fuel: 'Бензин', transmission: 'АКПП', bodyColor: 'Белый', interiorColor: 'Бежевый', seats: '5', trim: 'M Sport', src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=480&q=75', photos: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=75'], options: ['ABS', 'Навигация', 'Подогрев сидений'] },
  { id: 3, name: 'Mercedes-Benz GLE-Class GLE450', price: '9 199 920 ₽', badge: 'Хорошая цена', yearMonth: '2021.02', mileage: '69 952 км', drive: '4WD', engine: '2 925 см³ (330 л.с.)', fuel: 'Бензин', transmission: 'АКПП', bodyColor: 'Серебристый', seats: '5', trim: 'AMG Line', src: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=480&q=75', photos: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=75'], options: ['ABS', 'Навигация', 'Кожаный салон', 'Парктроник'] },
  { id: 4, name: 'BMW 5-Series 530i M Sport', price: '8 389 920 ₽', badge: 'Хорошая цена', yearMonth: '2024.11', mileage: '12 154 км', drive: '4WD', engine: '1 998 см³ (255 л.с.)', fuel: 'Бензин', transmission: 'АКПП', bodyColor: 'Синий', seats: '5', trim: 'M Sport', src: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=480&q=75', photos: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=75'], options: ['ABS', 'Навигация'] },
  { id: 5, name: 'Jeep Cherokee WK2', price: '8 216 500 ₽', badge: 'Высокая цена', yearMonth: '2020.06', mileage: '100 000 км', drive: '4WD', engine: '3 604 см³ (295 л.с.)', fuel: 'Бензин', transmission: 'АКПП', bodyColor: 'Красный', seats: '5', trim: 'Sport', src: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=480&q=75', photos: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=75'], options: ['ABS', 'Кондиционер'] },
  { id: 6, name: 'Mercedes-Benz GLE-Class GLE300', price: '9 864 740 ₽', badge: 'Хорошая цена', yearMonth: '2021.02', mileage: '24 000 км', drive: '2WD', engine: '2 925 см³ (330 л.с.)', fuel: 'Бензин', transmission: 'АКПП', bodyColor: 'Серый', seats: '5', src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=480&q=75', photos: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=75'], options: ['ABS', 'Навигация', 'Кожаный салон'] },
  { id: 7, name: 'Kia K5 Signature', price: '2 648 640 ₽', badge: 'Отличная цена', yearMonth: '2023.02', mileage: '47 774 км', drive: '2WD', engine: '1 999 см³ (158 л.с.)', fuel: 'Бензин', transmission: 'АКПП', bodyColor: 'Белый', seats: '5', trim: 'Comfort', src: 'https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?auto=format&fit=crop&w=480&q=75', photos: ['https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?auto=format&fit=crop&w=800&q=75'], options: ['ABS', 'Подогрев сидений', 'Камера заднего вида'] },
  { id: 8, name: 'Kia Morning Best Selection', price: '978 829 ₽', badge: 'Нормальная цена', yearMonth: '2022.04', mileage: '87 700 км', drive: '2WD', engine: '998 см³ (76 л.с.)', fuel: 'Бензин', transmission: 'АКПП', bodyColor: 'Бежевый', seats: '4', trim: 'Base', src: 'https://images.unsplash.com/photo-1501066927591-314112b5888e?auto=format&fit=crop&w=480&q=75', photos: ['https://images.unsplash.com/photo-1501066927591-314112b5888e?auto=format&fit=crop&w=800&q=75'], options: ['ABS'] },
];

const HERO_SLIDES = [
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=75', title: 'Персональная гарантия\nна заказанный автомобиль', subtitle: '6 месяцев' },
  { src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1920&q=75', title: 'Автомобили напрямую\nиз Южной Кореи', subtitle: 'Доставка во Владивосток' },
  { src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=75', title: 'Подбор и осмотр\nперед покупкой', subtitle: 'Полная прозрачность' },
];

/* ─── Helpers ─── */
function priceBadgeAppearance(badge?: CarCardData['badge']): 'success' | 'brand' | 'danger' | 'warning' {
  switch (badge) {
    case 'Отличная цена':   return 'success';
    case 'Хорошая цена':    return 'brand';
    case 'Высокая цена':    return 'danger';
    case 'Нормальная цена': return 'warning';
    default:               return 'brand';
  }
}

function FilterLabel({ children }: { children: React.ReactNode }) {
  return <span className="block text-style-body-xs text-[var(--color-text-muted)] mb-[var(--space-4)]">{children}</span>;
}

function RangePairNarrow({ labelFrom = 'от', labelTo = 'до' }: { labelFrom?: string; labelTo?: string }) {
  return (
    <div className="grid grid-cols-2 gap-[var(--space-8)]">
      <Input appearance="base" size="sm" placeholder={labelFrom} type="number" inputProps={{ inputMode: 'numeric' }} fullWidth />
      <Input appearance="base" size="sm" placeholder={labelTo} type="number" inputProps={{ inputMode: 'numeric' }} fullWidth />
    </div>
  );
}

/* ─── MultiSelectFilter: Dropdown with multiple selection ─── */
function MultiSelectFilter({
  title,
  options,
  selected,
  onChange,
  allowExclude = false,
  excluded = [],
  onExcludedChange,
}: {
  title: string;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  allowExclude?: boolean;
  excluded?: string[];
  onExcludedChange?: (v: string[]) => void;
}) {
  const dropdownOptions = options.map((o) => ({ value: o, label: o }));

  return (
    <Dropdown
      size="sm"
      fullWidth
      multiple
      allowExclude={allowExclude}
      options={dropdownOptions}
      value={selected}
      onChange={(v) => onChange(v as string[])}
      excludedValues={excluded}
      onExcludedChange={onExcludedChange}
      placeholder={title}
      showClearButton
      onClear={() => { onChange([]); onExcludedChange?.([]); }}
    >
      {title}
    </Dropdown>
  );
}

/* ─── Car Card (uniform height via flex) ─── */
function CarCard({ car, onClick }: { car: CarCardData; onClick?: () => void }) {
  const [imgState, setImgState] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <button
      type="button"
      className="text-left w-full border-0 bg-transparent p-0 cursor-pointer flex"
      onClick={onClick}
    >
      <article className="flex flex-col rounded-[var(--radius-medium)] overflow-hidden border border-[var(--color-border-base)] bg-[var(--color-surface-1)] shadow-elevation-1 transition-shadow hover:shadow-elevation-2 w-full">
        <div className="relative w-full">
          <Image
            size="sm"
            ratio="4:3"
            state={imgState}
            src={car.src}
            alt={car.name}
            onLoad={() => setImgState('loaded')}
            onError={() => setImgState('error')}
            className="!rounded-none"
            style={{ width: '100%' }}
          />
          {car.extraBadge && (
            <div className="absolute top-[var(--space-8)] left-[var(--space-8)] z-[1]">
              <Badge appearance="base" size="sm">{car.extraBadge}</Badge>
            </div>
          )}
          {car.badge && (
            <div className="absolute bottom-[var(--space-8)] right-[var(--space-8)] z-[1]">
              <Badge appearance={priceBadgeAppearance(car.badge)} size="sm">{car.badge}</Badge>
            </div>
          )}
        </div>
        <div className="p-[var(--space-12)] flex flex-col gap-[var(--space-6)] flex-1">
          <p className="text-style-body-strong truncate">{car.name}</p>
          <span className="text-[length:var(--font-size-16)] leading-[var(--line-height-24)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">
            {car.price}
          </span>
          <div className="flex items-center gap-[var(--space-8)] flex-wrap">
            <Badge appearance="warning" size="sm">{car.yearMonth}</Badge>
            <span className="text-style-body-sm text-[var(--color-text-muted)]">{car.mileage}</span>
            <span className="text-style-body-sm text-[var(--color-text-muted)]">{car.drive}</span>
          </div>
          <div className="flex items-center gap-[var(--space-6)] mt-auto">
            <span className="text-[var(--color-text-muted)]"><IconEngine /></span>
            <span className="text-style-body-sm text-[var(--color-text-muted)]">{car.engine}</span>
          </div>
        </div>
      </article>
    </button>
  );
}

/* ─── Filter panel ─── */
function FilterContent() {
  const years = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'];
  const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const yearOpts = years.map((y) => ({ value: y, label: y }));
  const monthOpts = months.map((m) => ({ value: m, label: m }));

  const [insurance, setInsurance] = useState('');
  const [drive, setDrive] = useState<string[]>([]);
  const [fuel, setFuel] = useState<string[]>([]);
  const [trans, setTrans] = useState<string[]>([]);
  const [trim, setTrim] = useState<string[]>([]);
  const [bodyColor, setBodyColor] = useState<string[]>([]);
  const [interiorColor, setInteriorColor] = useState<string[]>([]);
  const [seats, setSeats] = useState<string[]>([]);

  const [driveEx, setDriveEx] = useState<string[]>([]);
  const [fuelEx, setFuelEx] = useState<string[]>([]);
  const [transEx, setTransEx] = useState<string[]>([]);
  const [trimEx, setTrimEx] = useState<string[]>([]);
  const [bodyColorEx, setBodyColorEx] = useState<string[]>([]);
  const [interiorColorEx, setInteriorColorEx] = useState<string[]>([]);
  const [seatsEx, setSeatsEx] = useState<string[]>([]);

  const resetAll = useCallback(() => {
    setInsurance(''); setDrive([]); setFuel([]); setTrans([]);
    setTrim([]); setBodyColor([]); setInteriorColor([]); setSeats([]);
    setDriveEx([]); setFuelEx([]); setTransEx([]);
    setTrimEx([]); setBodyColorEx([]); setInteriorColorEx([]); setSeatsEx([]);
  }, []);

  return (
    <div className="flex flex-col gap-[var(--space-10)]">
      {/* Марка / Модель */}
      <div>
        <FilterLabel>Марка</FilterLabel>
        <Dropdown size="sm" options={[{ value: '', label: 'Все' }, { value: 'bmw', label: 'BMW' }, { value: 'mercedes', label: 'Mercedes-Benz' }, { value: 'kia', label: 'Kia' }, { value: 'hyundai', label: 'Hyundai' }]} value="" onChange={() => {}} fullWidth placeholder="Все">Все</Dropdown>
      </div>
      <div>
        <FilterLabel>Модель</FilterLabel>
        <Dropdown size="sm" options={[{ value: '', label: 'Все' }]} fullWidth placeholder="Все">Все</Dropdown>
      </div>

      {/* Дата выпуска */}
      <div>
        <FilterLabel>Дата выпуска от</FilterLabel>
        <div className="grid grid-cols-2 gap-[var(--space-8)]">
          <Dropdown size="sm" options={yearOpts} value="" onChange={() => {}} fullWidth placeholder="Год">Год</Dropdown>
          <Dropdown size="sm" options={monthOpts} value="" onChange={() => {}} fullWidth placeholder="Мес.">Мес.</Dropdown>
        </div>
      </div>
      <div>
        <FilterLabel>Дата выпуска до</FilterLabel>
        <div className="grid grid-cols-2 gap-[var(--space-8)]">
          <Dropdown size="sm" options={yearOpts} value="" onChange={() => {}} fullWidth placeholder="Год">Год</Dropdown>
          <Dropdown size="sm" options={monthOpts} value="" onChange={() => {}} fullWidth placeholder="Мес.">Мес.</Dropdown>
        </div>
      </div>

      <Divider orientation="horizontal" size="sm" />

      {/* Числовые диапазоны */}
      <div><FilterLabel>Цена, ₽</FilterLabel><RangePairNarrow /></div>
      <div><FilterLabel>Пробег, км</FilterLabel><RangePairNarrow /></div>
      <div><FilterLabel>Двигатель, см³</FilterLabel><RangePairNarrow /></div>
      <div><FilterLabel>Мощность, л.с.</FilterLabel><RangePairNarrow /></div>

      <Divider orientation="horizontal" size="sm" />

      {/* Страховые — single select */}
      <div>
        <FilterLabel>Сумма страховых выплат</FilterLabel>
        <Dropdown size="sm" options={INSURANCE_OPTIONS} value={insurance} onChange={(v) => setInsurance(v as string)} fullWidth placeholder="Все" showClearButton onClear={() => setInsurance('')}>
          {INSURANCE_OPTIONS.find((o) => o.value === insurance)?.label ?? 'Все'}
        </Dropdown>
      </div>

      <Divider orientation="horizontal" size="sm" />

      {/* Мультиселект — привод, топливо, трансмиссия */}
      <MultiSelectFilter title="Привод" options={DRIVE_OPTIONS} selected={drive} onChange={setDrive} allowExclude excluded={driveEx} onExcludedChange={setDriveEx} />
      <MultiSelectFilter title="Топливо" options={FUEL_OPTIONS} selected={fuel} onChange={setFuel} allowExclude excluded={fuelEx} onExcludedChange={setFuelEx} />
      <MultiSelectFilter title="Трансмиссия" options={TRANS_OPTIONS} selected={trans} onChange={setTrans} allowExclude excluded={transEx} onExcludedChange={setTransEx} />

      <Divider orientation="horizontal" size="sm" />

      {/* Класс */}
      <div>
        <FilterLabel>Класс автомобиля</FilterLabel>
        <Dropdown size="sm" options={[{ value: '', label: 'Все' }, { value: 'sedan', label: 'Седан' }, { value: 'suv', label: 'SUV / Кроссовер' }, { value: 'hatch', label: 'Хэтчбек' }, { value: 'coupe', label: 'Купе' }, { value: 'minivan', label: 'Минивэн' }]} value="" onChange={() => {}} fullWidth placeholder="Все">Все</Dropdown>
      </div>

      {/* Мультиселект — комплектация, цвета, места */}
      <MultiSelectFilter title="Комплектация" options={TRIM_OPTIONS} selected={trim} onChange={setTrim} allowExclude excluded={trimEx} onExcludedChange={setTrimEx} />
      <MultiSelectFilter title="Цвет кузова" options={BODY_COLORS} selected={bodyColor} onChange={setBodyColor} allowExclude excluded={bodyColorEx} onExcludedChange={setBodyColorEx} />
      <MultiSelectFilter title="Цвет салона" options={INTERIOR_COLORS} selected={interiorColor} onChange={setInteriorColor} allowExclude excluded={interiorColorEx} onExcludedChange={setInteriorColorEx} />
      <MultiSelectFilter title="Кол-во мест" options={SEATS_OPTIONS} selected={seats} onChange={setSeats} allowExclude excluded={seatsEx} onExcludedChange={setSeatsEx} />

      <div><FilterLabel>Опции</FilterLabel><Input appearance="base" size="sm" fullWidth showClearButton placeholder="Поиск опций" /></div>

      <Divider orientation="horizontal" size="sm" />

      {/* Кнопки */}
      <div className="flex flex-col gap-[var(--space-8)]">
        <Button appearance="outline" size="sm" fullWidth onClick={resetAll}>Сбросить все</Button>
        <Button appearance="brand" size="sm" fullWidth>Применить</Button>
      </div>
    </div>
  );
}

/* ─── Grid icons ─── */
const GridIcon2 = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1" y="2" width="6" height="12" rx="1" stroke="currentColor" strokeWidth="1.3"/>
    <rect x="9" y="2" width="6" height="12" rx="1" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
);
const GridIcon3 = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="0.5" y="2" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="6" y="2" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="11.5" y="2" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);
const GridIcon4 = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="0.5" y="2" width="3" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.1"/>
    <rect x="4.5" y="2" width="3" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.1"/>
    <rect x="8.5" y="2" width="3" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.1"/>
    <rect x="12.5" y="2" width="3" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.1"/>
  </svg>
);

const GRID_OPTIONS = [
  { cols: 2, icon: <GridIcon2 /> },
  { cols: 3, icon: <GridIcon3 /> },
  { cols: 4, icon: <GridIcon4 /> },
] as const;

/* ═══════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════ */
export default function EncarCatalog() {
  const [slide, setSlide] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [gridCols, setGridCols] = useState(3);
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  const totalSlides = HERO_SLIDES.length;
  const prevSlide = useCallback(() => setSlide((s) => (s - 1 + totalSlides) % totalSlides), [totalSlides]);
  const nextSlide = useCallback(() => setSlide((s) => (s + 1) % totalSlides), [totalSlides]);

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % totalSlides), 6000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  useEffect(() => {
    const frame = heroRef.current?.closest('iframe')?.contentDocument?.defaultView ?? window;
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height, 1)));
      setParallaxY(progress * 40);
    };
    frame.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => frame.removeEventListener('scroll', onScroll);
  }, []);

  const selectedCar = selectedCarId != null ? CARS.find((c) => c.id === selectedCarId) ?? null : null;
  if (selectedCar) {
    return (
      <EncarCarCardPage
        car={selectedCar}
        similarCars={CARS.filter((c) => c.id !== selectedCar.id)}
        onBack={() => setSelectedCarId(null)}
        onSimilarClick={(car) => { setSelectedCarId(car.id); window.scrollTo({ top: 0 }); }}
      />
    );
  }

  const currentSlide = HERO_SLIDES[slide];

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] overflow-x-clip w-full">

      {/* ── HEADER (sticky) ── */}
      <header data-theme="dark" className="sticky top-0 z-header flex items-center justify-between bg-[var(--color-bg-base)] px-[var(--space-16)] tablet:px-[var(--space-24)] py-[var(--space-10)] shrink-0 border-b border-[var(--color-border-base)]">
        <nav className="hidden tablet:flex items-center gap-[var(--space-16)] desktop:gap-[var(--space-24)]">
          {['Автомобили', 'Кейсы', 'Отзывы'].map((n) => (
            <Link key={n} href="#" size="sm" showRightIcon={false}>{n}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-[var(--space-8)]">
          <div className="flex items-center justify-center rounded-full w-8 h-8 bg-[var(--color-danger-base)]" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3l2.5 5H6.5L9 3z" fill="white"/><path d="M3 12h12M6 8l-3 4M12 8l3 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <span className="text-[length:var(--font-size-16)] font-[var(--font-weight-semibold)] leading-none tracking-wider text-[var(--color-text-primary)] uppercase">AB&nbsp;Korea</span>
        </div>
        <nav className="hidden tablet:flex items-center gap-[var(--space-16)] desktop:gap-[var(--space-24)]">
          {['Вопросы', 'О нас', 'Контакты'].map((n) => (
            <Link key={n} href="#" size="sm" showRightIcon={false}>{n}</Link>
          ))}
        </nav>
        <button type="button" className="tablet:hidden p-[var(--space-4)] text-[var(--color-text-primary)] bg-transparent border-0 cursor-pointer" aria-label="Меню">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </header>

      {/* ── HERO (full-width, parallax, dynamic labels) ── */}
      <section ref={heroRef} data-theme="dark" className="relative w-screen left-0 overflow-hidden select-none" style={{ height: 'clamp(280px, 36vw, 480px)', marginLeft: 'calc(-50vw + 50%)', width: '100vw' }}>
        {HERO_SLIDES.map((s, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === slide ? 1 : 0 }}>
            <img src={s.src} alt="" className="w-full h-full object-cover will-change-transform" draggable={false} style={{ transform: `translateY(${parallaxY}px) scale(1.08)` }} />
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.65) 100%)' }} />

        <button type="button" onClick={prevSlide} aria-label="Назад" className="absolute left-[var(--space-12)] tablet:left-[var(--space-24)] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full text-[var(--color-text-primary)] cursor-pointer border-0 w-10 h-10" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)' }}>
          <IconChevronLeft />
        </button>

        <div className="absolute inset-0 z-10 flex items-center justify-center px-[var(--space-16)] tablet:px-[var(--space-48)]">
          <div className="flex flex-col tablet:flex-row items-center gap-[var(--space-16)] tablet:gap-[var(--space-32)]">
            <div className="flex flex-col gap-[var(--space-8)] tablet:gap-[var(--space-12)] text-center tablet:text-left">
              <p className="text-[var(--color-text-primary)] uppercase tracking-wide leading-tight whitespace-pre-line" style={{ fontSize: 'clamp(15px, 2.2vw, 28px)', fontWeight: 'var(--font-weight-semibold)', maxWidth: 520 }}>
                {currentSlide.title}
              </p>
              <p className="text-[var(--color-danger-base)] uppercase tracking-wider leading-none" style={{ fontSize: 'clamp(24px, 4.5vw, 56px)', fontWeight: 'var(--font-weight-semibold)' }}>
                {currentSlide.subtitle}
              </p>
            </div>
            <div className="hidden tablet:flex items-center justify-center shrink-0"><IconShieldCheck /></div>
          </div>
        </div>

        <button type="button" onClick={nextSlide} aria-label="Вперёд" className="absolute right-[var(--space-12)] tablet:right-[var(--space-24)] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full text-[var(--color-text-primary)] cursor-pointer border-0 w-10 h-10" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)' }}>
          <IconChevronRight />
        </button>

        <div className="absolute bottom-[var(--space-12)] left-1/2 -translate-x-1/2 z-10 flex gap-[var(--space-8)]">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} type="button" onClick={() => setSlide(i)} aria-label={`Слайд ${i + 1}`} className="rounded-full transition-all cursor-pointer border-0 p-0" style={{ width: i === slide ? 20 : 8, height: 8, background: i === slide ? 'var(--color-text-primary)' : 'rgba(255,255,255,0.4)' }} />
          ))}
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="w-full max-w-[1440px] mx-auto px-[var(--space-16)] tablet:px-[var(--space-24)] pt-[var(--space-24)] pb-[var(--space-32)]">
        <h2 className="text-center text-style-h2 text-[var(--color-text-primary)] mb-[var(--space-24)]">
          Автомобили в продаже
        </h2>

        <div className="flex flex-col tablet:flex-row gap-[var(--space-24)] items-start">

          {/* ── Filter panel ── */}
          {/* Mobile: toggle + collapsible panel */}
          <div className="tablet:hidden w-full">
            <Button
              appearance={filtersOpen ? 'outline' : 'brand'}
              size="sm"
              fullWidth
              iconLeft={<IconFilter />}
              showLeftIcon
              onClick={() => setFiltersOpen((p) => !p)}
            >
              {filtersOpen ? 'Скрыть фильтры' : 'Фильтры'}
            </Button>
            {filtersOpen && (
              <div className="mt-[var(--space-12)] rounded-[var(--radius-medium)] border border-[var(--color-border-base)] bg-[var(--color-surface-1)] p-[var(--space-12)]">
                <FilterContent />
              </div>
            )}
          </div>

          {/* Tablet+: sidebar = mobile-frame parity (358px, no internal scroll) */}
          <aside className="hidden tablet:block w-[358px] shrink-0">
            <div className="rounded-[var(--radius-medium)] border border-[var(--color-border-base)] bg-[var(--color-surface-1)] p-[var(--space-12)]">
              <FilterContent />
            </div>
          </aside>

          {/* ── Cards area ── */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-[var(--space-16)] flex-wrap gap-[var(--space-8)]">
              <span className="text-[length:var(--font-size-16)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">
                51&nbsp;279 авто
              </span>
              <div className="flex items-center gap-[var(--space-12)]">
                {/* Grid column switcher */}
                <div className="hidden tablet:flex items-center gap-[var(--space-4)] rounded-[var(--radius-default)] border border-[var(--color-border-base)] p-[var(--space-2)]">
                  {GRID_OPTIONS.map(({ cols, icon }) => (
                    <button
                      key={cols}
                      type="button"
                      onClick={() => setGridCols(cols)}
                      aria-label={`${cols} в ряд`}
                      className={`flex items-center justify-center w-7 h-7 rounded-[var(--radius-subtle)] border-0 cursor-pointer transition-colors ${
                        gridCols === cols
                          ? 'bg-[var(--color-brand-primary)] text-white'
                          : 'bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                <Dropdown size="sm" items={[{ children: 'Сначала новые' }, { children: 'Цена ↑' }, { children: 'Цена ↓' }, { children: 'Пробег ↑' }, { children: 'Пробег ↓' }]} style={{ minWidth: 160 }}>Сначала новые</Dropdown>
              </div>
            </div>

            <div className={`grid gap-[var(--space-16)] auto-rows-fr grid-cols-1 ${
              gridCols === 2 ? 'tablet:grid-cols-2' :
              gridCols === 3 ? 'tablet:grid-cols-3' :
              'tablet:grid-cols-4'
            }`}>
              {CARS.map((car) => (
                <CarCard key={car.id} car={car} onClick={() => setSelectedCarId(car.id)} />
              ))}
            </div>

            <div className="mt-[var(--space-32)] rounded-[var(--radius-large)] bg-[var(--color-surface-2)] border border-[var(--color-border-base)] p-[var(--space-24)] tablet:p-[var(--space-32)] text-center">
              <p className="text-style-h3 text-[var(--color-text-primary)] mb-[var(--space-8)]">Подберём оптимальное предложение</p>
              <p className="text-style-body text-[var(--color-text-muted)] mb-[var(--space-16)]">на рынке Южной Кореи с персональной гарантией.</p>
              <Button appearance="danger" size="md">Связаться</Button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[var(--color-surface-2)] border-t border-[var(--color-border-base)] px-[var(--space-16)] tablet:px-[var(--space-24)] py-[var(--space-24)]">
        <div className="max-w-[1320px] mx-auto flex flex-col tablet:flex-row items-center justify-between gap-[var(--space-16)]">
          <span className="text-style-body-strong text-[var(--color-text-primary)] uppercase tracking-wider">AB Korea</span>
          <div className="flex gap-[var(--space-16)]">
            <Link href="#" size="sm" showRightIcon={false}>Соглашение</Link>
            <Link href="#" size="sm" showRightIcon={false}>Правовая информация</Link>
          </div>
          <div className="flex flex-col items-center tablet:items-end gap-[var(--space-4)]">
            <span className="text-style-body-sm text-[var(--color-text-muted)]">+7 (937) 771-72-70</span>
            <span className="text-style-body-sm text-[var(--color-text-muted)]">ab.korea.kr@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
