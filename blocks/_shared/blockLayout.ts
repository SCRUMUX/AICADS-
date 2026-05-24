import { cn } from '../../components/primitives/_shared';

/**
 * Marketing landing layout contract (B2B SaaS baseline — Linear / Stripe / Vercel).
 *
 * - One content column (`BLOCK_CONTENT_CLASS`) — same max-width and horizontal inset on every section.
 * - Section headers and body content align to the **start edge** of that column (not center).
 * - Full-bleed backgrounds and hero media are the only elements that break out.
 * - Center alignment is reserved for standalone hero pattern `marketing.hero.centered` only.
 */

/** Shared page content shell — all sections share this horizontal box. */
export const BLOCK_CONTENT_CLASS = cn(
  'mx-auto w-full box-border',
  'max-w-[var(--grid-desktop-breakpoint)]',
  'px-[var(--grid-mobile-offset)]',
  'tablet:px-[var(--grid-tablet-offset)]',
  'desktop:px-[var(--grid-desktop-offset)]',
);

/** Readable prose width, anchored to the content column start (not centered). */
export const BLOCK_PROSE_CLASS = 'w-full max-w-[var(--space-640)] min-w-0';

/** Left-aligned action button row. */
export const BLOCK_ACTIONS_ROW_CLASS =
  'flex w-full min-w-0 flex-wrap items-center justify-start';

export const BLOCK_GRID_COL_CLASS = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 min-[768px]:grid-cols-2',
  3: 'grid-cols-1 min-[768px]:grid-cols-2 min-[1024px]:grid-cols-3',
  4: 'grid-cols-2 min-[768px]:grid-cols-2 min-[1024px]:grid-cols-4',
} as const;

export const BLOCK_GRID_BASE_CLASS = cn(
  'grid w-full min-w-0 items-stretch',
  'gap-[var(--grid-mobile-gutter)]',
  'tablet:gap-[var(--grid-tablet-gutter)]',
  'min-[1024px]:gap-[var(--grid-desktop-gutter)]',
);

export const BLOCK_GRID_ITEM_CLASS = 'min-w-0 h-full';

export const BLOCK_SPLIT_CLASS = cn(
  BLOCK_GRID_BASE_CLASS,
  'grid-cols-1 min-[1024px]:grid-cols-2 min-[1024px]:items-center',
);

/** Logo cloud — equal tiles across the full content width. */
export const BLOCK_LOGO_GRID_CLASS = cn(
  'grid w-full min-w-0',
  'grid-cols-2 min-[768px]:grid-cols-3 min-[1024px]:grid-cols-5',
  'gap-[var(--grid-mobile-gutter)]',
  'tablet:gap-[var(--grid-tablet-gutter)]',
  'min-[1024px]:gap-[var(--grid-desktop-gutter)]',
);

/** @deprecated Use BLOCK_PROSE_CLASS — kept for import stability. */
export const BLOCK_NARROW_CLASS = BLOCK_PROSE_CLASS;
