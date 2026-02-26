/**
 * Страница карточки автомобиля — полная информация
 * Mobile-first, группированные спецификации, галерея, похожие авто
 */
import React from 'react';
import { Button } from '@ai-ds/core/components/Button';
import { Badge } from '@ai-ds/core/components/Badge';
import { Tag } from '@ai-ds/core/components/Tag';
import { Link } from '@ai-ds/core/components/Link';
import { Image } from '@ai-ds/core/components/Image';

type PriceBadge = 'Отличная цена' | 'Хорошая цена' | 'Высокая цена' | 'Нормальная цена';

export interface CarCardData {
  id: number;
  name: string;
  price: string;
  badge?: PriceBadge;
  extraBadge?: string;
  yearMonth: string;
  mileage: string;
  drive: string;
  engine: string;
  fuel?: string;
  transmission?: string;
  insurancePayout?: string;
  firstRegistration?: string;
  bodyColor?: string;
  interiorColor?: string;
  seats?: string;
  trim?: string;
  options?: string[];
  photos: string[];
  src: string;
}

function priceBadgeAppearance(badge?: PriceBadge): 'success' | 'brand' | 'danger' | 'warning' {
  switch (badge) {
    case 'Отличная цена': return 'success';
    case 'Хорошая цена': return 'brand';
    case 'Высокая цена': return 'danger';
    case 'Нормальная цена': return 'warning';
    default: return 'brand';
  }
}

/* ─── Compact car card (same as catalog, uniform size) ─── */
function CarCard({ car, onClick }: { car: CarCardData; onClick?: () => void }) {
  const [imgState, setImgState] = React.useState<'loading' | 'loaded' | 'error'>('loading');
  return (
    <button type="button" className="text-left w-full border-0 bg-transparent p-0 cursor-pointer flex" onClick={onClick}>
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
          {car.badge && (
            <div className="absolute bottom-[var(--space-8)] right-[var(--space-8)] z-[1]">
              <Badge appearance={priceBadgeAppearance(car.badge)} size="sm">{car.badge}</Badge>
            </div>
          )}
        </div>
        <div className="p-[var(--space-12)] flex flex-col gap-[var(--space-6)] flex-1">
          <p className="text-style-body-strong truncate">{car.name}</p>
          <span className="text-[length:var(--font-size-16)] leading-[var(--line-height-24)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">{car.price}</span>
          <div className="flex items-center gap-[var(--space-8)] flex-wrap">
            <Badge appearance="warning" size="sm">{car.yearMonth}</Badge>
            <span className="text-style-body-sm text-[var(--color-text-muted)]">{car.mileage}</span>
            <span className="text-style-body-sm text-[var(--color-text-muted)]">{car.drive}</span>
          </div>
          <span className="text-style-body-sm text-[var(--color-text-muted)] mt-auto">{car.engine}</span>
        </div>
      </article>
    </button>
  );
}

/* ─── Spec helpers ─── */
function SpecSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-medium)] border border-[var(--color-border-base)] bg-[var(--color-surface-1)] overflow-hidden">
      <div className="px-[var(--space-16)] py-[var(--space-12)] bg-[var(--color-surface-2)] border-b border-[var(--color-border-base)]">
        <h3 className="text-style-body-strong text-[var(--color-text-primary)] m-0">{title}</h3>
      </div>
      <div className="divide-y divide-[var(--color-border-base)]">{children}</div>
    </div>
  );
}

function SpecRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-baseline px-[var(--space-16)] py-[var(--space-10)] gap-[var(--space-12)] transition-colors duration-150 hover:bg-[var(--color-surface-2)] cursor-default">
      <span className="text-style-body-sm text-[var(--color-text-muted)] shrink-0">{label}</span>
      <span className={`text-style-body-sm text-right ${highlight ? 'font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]' : 'text-[var(--color-text-primary)]'}`}>{value}</span>
    </div>
  );
}

/* ─── Gallery navigation icons ─── */
const ArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M13 4L7 10l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface EncarCarCardPageProps {
  car: CarCardData;
  similarCars: CarCardData[];
  onBack: () => void;
  onSimilarClick?: (car: CarCardData) => void;
}

export default function EncarCarCardPage({ car, similarCars, onBack, onSimilarClick }: EncarCarCardPageProps) {
  const [photoIndex, setPhotoIndex] = React.useState(0);
  const photos = car.photos?.length ? car.photos : [car.src];

  const prevPhoto = () => setPhotoIndex((p) => (p - 1 + photos.length) % photos.length);
  const nextPhoto = () => setPhotoIndex((p) => (p + 1) % photos.length);

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)]">
      {/* Sticky header */}
      <header data-theme="dark" className="sticky top-0 z-header flex items-center justify-between bg-[var(--color-bg-base)] px-[var(--space-16)] tablet:px-[var(--space-24)] py-[var(--space-10)] border-b border-[var(--color-border-base)]">
        <button type="button" onClick={onBack} className="flex items-center gap-[var(--space-8)] text-[var(--color-text-primary)] bg-transparent border-0 cursor-pointer text-style-body">
          <ArrowLeft /> В каталог
        </button>
        <div className="flex items-center gap-[var(--space-8)]">
          <div className="flex items-center justify-center rounded-full w-8 h-8 bg-[var(--color-danger-base)]" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3l2.5 5H6.5L9 3z" fill="white"/><path d="M3 12h12M6 8l-3 4M12 8l3 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <span className="text-[length:var(--font-size-16)] font-[var(--font-weight-semibold)] leading-none tracking-wider text-[var(--color-text-primary)] uppercase">AB&nbsp;Korea</span>
        </div>
        <div className="w-[80px]" />
      </header>

      <main className="w-full max-w-[960px] mx-auto px-[var(--space-16)] tablet:px-[var(--space-24)] py-[var(--space-24)]">
        {/* Title + badges */}
        <div className="mb-[var(--space-16)]">
          <h1 className="text-style-h3 tablet:text-style-h2 text-[var(--color-text-primary)] mb-[var(--space-8)]">{car.name}</h1>
          <div className="flex items-center gap-[var(--space-8)] flex-wrap">
            <Badge appearance="warning" size="sm">{car.yearMonth}</Badge>
            <span className="text-style-body-sm text-[var(--color-text-muted)]">{car.mileage}</span>
            {car.trim && <Badge appearance="base" size="sm">{car.trim}</Badge>}
          </div>
        </div>

        {/* Gallery */}
        <div className="relative w-full overflow-hidden rounded-[var(--radius-medium)] mb-[var(--space-24)]" style={{ paddingBottom: '60%' }}>
          {photos.map((src, i) => (
            <div key={i} className="absolute inset-0 transition-opacity duration-300" style={{ opacity: i === photoIndex ? 1 : 0 }}>
              <img src={src} alt={`${car.name} — фото ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {photos.length > 1 && (
            <>
              <button type="button" onClick={prevPhoto} aria-label="Назад" className="absolute left-[var(--space-8)] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full text-white cursor-pointer border-0 w-9 h-9" style={{ background: 'rgba(0,0,0,0.4)' }}>
                <ArrowLeft />
              </button>
              <button type="button" onClick={nextPhoto} aria-label="Вперёд" className="absolute right-[var(--space-8)] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full text-white cursor-pointer border-0 w-9 h-9" style={{ background: 'rgba(0,0,0,0.4)' }}>
                <ArrowRight />
              </button>
            </>
          )}

          <div className="absolute bottom-[var(--space-8)] left-1/2 -translate-x-1/2 z-10 flex gap-[var(--space-4)]">
            {photos.map((_, i) => (
              <button key={i} type="button" onClick={() => setPhotoIndex(i)} aria-label={`Фото ${i + 1}`} className="rounded-full border-0 p-0 cursor-pointer transition-all" style={{ width: i === photoIndex ? 20 : 8, height: 8, background: i === photoIndex ? 'white' : 'rgba(255,255,255,0.5)' }} />
            ))}
          </div>

          <div className="absolute top-[var(--space-8)] right-[var(--space-8)] z-10 bg-black/50 text-white text-style-body-xs rounded-full px-[var(--space-8)] py-[var(--space-2)]">
            {photoIndex + 1} / {photos.length}
          </div>
        </div>

        {/* Thumbnail strip */}
        {photos.length > 1 && (
          <div className="flex gap-[var(--space-6)] mb-[var(--space-24)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {photos.map((src, i) => (
              <button key={i} type="button" onClick={() => setPhotoIndex(i)} className={`shrink-0 w-16 h-12 rounded-[var(--radius-default)] overflow-hidden border-2 p-0 cursor-pointer transition-all ${i === photoIndex ? 'border-[var(--color-brand-primary)] opacity-100' : 'border-transparent opacity-60 hover:opacity-90'}`}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Price block */}
        <div className="rounded-[var(--radius-medium)] border border-[var(--color-border-base)] bg-[var(--color-surface-1)] p-[var(--space-16)] tablet:p-[var(--space-24)] mb-[var(--space-16)] flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-[var(--space-12)]">
          <div>
            <span className="text-[length:var(--font-size-28)] tablet:text-[length:var(--font-size-32)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)] block mb-[var(--space-4)]">
              {car.price}
            </span>
            <div className="flex items-center gap-[var(--space-8)] flex-wrap">
              {car.badge && <Badge appearance={priceBadgeAppearance(car.badge)} size="md">{car.badge}</Badge>}
              {car.extraBadge && <Badge appearance="base" size="md">{car.extraBadge}</Badge>}
            </div>
          </div>
          <div className="flex flex-col tablet:flex-row gap-[var(--space-8)] w-full tablet:w-auto">
            <Button appearance="brand" size="md">Написать в Telegram</Button>
            <Button appearance="outline" size="md">Написать в WhatsApp</Button>
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-[var(--space-16)] mb-[var(--space-24)]">
          <SpecSection title="Общая информация">
            <SpecRow label="Марка / Модель" value={car.name} highlight />
            <SpecRow label="Комплектация" value={car.trim ?? '—'} />
            <SpecRow label="Год выпуска" value={car.yearMonth} />
            <SpecRow label="Первая регистрация" value={car.firstRegistration ?? car.yearMonth} />
            <SpecRow label="Пробег" value={car.mileage} highlight />
          </SpecSection>

          <SpecSection title="Двигатель и трансмиссия">
            <SpecRow label="Двигатель" value={car.engine} highlight />
            <SpecRow label="Топливо" value={car.fuel ?? '—'} />
            <SpecRow label="Привод" value={car.drive} />
            <SpecRow label="Трансмиссия" value={car.transmission ?? '—'} />
          </SpecSection>

          <SpecSection title="Кузов и салон">
            <SpecRow label="Цвет кузова" value={car.bodyColor ?? '—'} />
            <SpecRow label="Цвет салона" value={car.interiorColor ?? '—'} />
            <SpecRow label="Количество мест" value={car.seats ?? '—'} />
          </SpecSection>

          <SpecSection title="Страхование">
            <SpecRow label="Страховые выплаты" value={car.insurancePayout ?? '0 ₽'} highlight />
          </SpecSection>
        </div>

        {/* Options */}
        {car.options && car.options.length > 0 && (
          <div className="mb-[var(--space-24)]">
            <h3 className="text-style-body-strong text-[var(--color-text-primary)] mb-[var(--space-12)]">Опции и оснащение</h3>
            <div className="flex flex-wrap gap-[var(--space-6)]">
              {car.options.map((opt, i) => (
                <Tag key={i} size="sm" appearance="outline">{opt}</Tag>
              ))}
            </div>
          </div>
        )}

        {/* CTA bottom */}
        <div className="rounded-[var(--radius-large)] bg-[var(--color-surface-2)] border border-[var(--color-border-base)] p-[var(--space-24)] text-center mb-[var(--space-32)]">
          <p className="text-style-h3 text-[var(--color-text-primary)] mb-[var(--space-8)]">Заинтересовал этот автомобиль?</p>
          <p className="text-style-body text-[var(--color-text-muted)] mb-[var(--space-16)]">Свяжитесь с нами для бронирования и расчёта доставки</p>
          <Button appearance="danger" size="lg">Связаться с менеджером</Button>
        </div>

        {/* Similar cars */}
        {similarCars.length > 0 && (
          <section>
            <h2 className="text-style-h3 text-[var(--color-text-primary)] mb-[var(--space-16)]">Похожие автомобили</h2>
            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-[var(--space-16)] auto-rows-fr">
              {similarCars.slice(0, 6).map((c) => (
                <CarCard key={c.id} car={c} onClick={onSimilarClick ? () => onSimilarClick(c) : undefined} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-[var(--color-surface-2)] border-t border-[var(--color-border-base)] px-[var(--space-16)] tablet:px-[var(--space-24)] py-[var(--space-24)] mt-[var(--space-32)]">
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
