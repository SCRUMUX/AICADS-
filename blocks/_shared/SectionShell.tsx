import React from 'react';
import { cn } from '../../components/primitives/_shared';
import { resolveRecipe, type SpacingRecipeId } from '../../recipes/spacing-recipes';
import { BLOCK_CONTENT_CLASS } from './blockLayout';

export type SectionAppearance = 'base' | 'surface' | 'muted' | 'brand' | 'inverse';

export interface SectionShellProps extends React.HTMLAttributes<HTMLElement> {
  /** Named spacing recipe — enforces vertical rhythm across blocks. */
  recipe: SpacingRecipeId;
  as?: 'section' | 'div' | 'footer' | 'header' | 'nav';
  /** Full-bleed background treatment on the outer section. */
  appearance?: SectionAppearance;
  /** Optional media/background slot rendered edge-to-edge above the content column. */
  bleedMedia?: React.ReactNode;
  children: React.ReactNode;
}

const APPEARANCE_CLASS: Record<SectionAppearance, string> = {
  base: 'bg-[var(--color-bg-base)] text-[var(--color-text-primary)]',
  surface: 'bg-[var(--color-surface-1)] text-[var(--color-text-primary)]',
  muted: 'bg-[var(--color-surface-2)] text-[var(--color-text-primary)]',
  brand: 'bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)]',
  inverse: 'bg-[var(--color-text-primary)] text-[var(--color-bg-base)]',
};

/**
 * Full-bleed section background + unified content column for marketing blocks.
 * Background spans the viewport; content uses `--grid-*-offset` on every section.
 */
export const SectionShell = React.forwardRef<HTMLElement, SectionShellProps>(
  (
    {
      recipe,
      as: Tag = 'section',
      appearance = 'base',
      bleedMedia,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const resolved = resolveRecipe(recipe);

    return (
      <Tag
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn('w-full', APPEARANCE_CLASS[appearance], className)}
        style={{
          ...resolved.style,
          ...style,
        }}
        {...rest}
      >
        {bleedMedia ? <div className="w-full">{bleedMedia}</div> : null}
        <div className={BLOCK_CONTENT_CLASS}>
          <div className="flex flex-col w-full min-w-0" style={resolved.innerStyle}>
            {children}
          </div>
        </div>
      </Tag>
    );
  },
);

SectionShell.displayName = 'SectionShell';
