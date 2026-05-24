/**
 * Named spacing recipes for AICADS pattern blocks.
 * Marketing sections use `--space-section-*` tokens (page rhythm), not component `layout` scale.
 */

import type { CSSProperties } from 'react';

export type SpacingRecipeId =
  | 'section.hero'
  | 'section.features'
  | 'section.pricing'
  | 'section.cta'
  | 'section.footer'
  | 'section.navbar'
  | 'section.logos'
  | 'section.stats'
  | 'section.testimonials'
  | 'section.faq'
  | 'section.steps'
  | 'section.newsletter'
  | 'section.app-shell';

export type RecipeMaxWidth = 'mobile' | 'tablet' | 'desktop' | 'full';

export interface SpacingRecipe {
  /** Vertical section padding (top + bottom). */
  sectionPaddingY: string;
  /** Gap between major stacks inside the section (header → grid → actions). */
  innerGap: string;
  maxWidth: RecipeMaxWidth;
}

export const SPACING_RECIPES: Record<SpacingRecipeId, SpacingRecipe> = {
  'section.hero': {
    sectionPaddingY: 'var(--space-section-y-xl)',
    innerGap: 'var(--space-section-content-l)',
    maxWidth: 'desktop',
  },
  'section.features': {
    sectionPaddingY: 'var(--space-section-y-l)',
    innerGap: 'var(--space-section-content-l)',
    maxWidth: 'desktop',
  },
  'section.pricing': {
    sectionPaddingY: 'var(--space-section-y-l)',
    innerGap: 'var(--space-section-content-m)',
    maxWidth: 'desktop',
  },
  'section.cta': {
    sectionPaddingY: 'var(--space-section-y-l)',
    innerGap: 'var(--space-section-content-m)',
    maxWidth: 'desktop',
  },
  'section.footer': {
    sectionPaddingY: 'var(--space-section-y-m)',
    innerGap: 'var(--space-section-content-m)',
    maxWidth: 'desktop',
  },
  'section.navbar': {
    sectionPaddingY: 'var(--space-section-y-xs)',
    innerGap: 'var(--space-section-stack-s)',
    maxWidth: 'desktop',
  },
  'section.logos': {
    sectionPaddingY: 'var(--space-section-y-s)',
    innerGap: 'var(--space-section-content-m)',
    maxWidth: 'desktop',
  },
  'section.stats': {
    sectionPaddingY: 'var(--space-section-y-m)',
    innerGap: 'var(--space-section-content-l)',
    maxWidth: 'desktop',
  },
  'section.testimonials': {
    sectionPaddingY: 'var(--space-section-y-l)',
    innerGap: 'var(--space-section-content-l)',
    maxWidth: 'desktop',
  },
  'section.faq': {
    sectionPaddingY: 'var(--space-section-y-l)',
    innerGap: 'var(--space-section-content-l)',
    maxWidth: 'desktop',
  },
  'section.steps': {
    sectionPaddingY: 'var(--space-section-y-l)',
    innerGap: 'var(--space-section-content-l)',
    maxWidth: 'desktop',
  },
  'section.newsletter': {
    sectionPaddingY: 'var(--space-section-y-m)',
    innerGap: 'var(--space-section-content-m)',
    maxWidth: 'desktop',
  },
  'section.app-shell': {
    sectionPaddingY: 'var(--space-layout-s)',
    innerGap: 'var(--space-content-s)',
    maxWidth: 'full',
  },
};

export interface ResolvedRecipe {
  className: string;
  style: CSSProperties;
  innerStyle: CSSProperties;
  maxWidth: RecipeMaxWidth;
}

/** Resolve a recipe id to styles + maxWidth for SectionShell. */
export function resolveRecipe(id: SpacingRecipeId): ResolvedRecipe {
  const recipe = SPACING_RECIPES[id];

  return {
    className: 'w-full',
    style: {
      paddingTop: recipe.sectionPaddingY,
      paddingBottom: recipe.sectionPaddingY,
    },
    innerStyle: { gap: recipe.innerGap },
    maxWidth: recipe.maxWidth,
  };
}

/** Tailwind-only class string for a recipe (documentation / AI hints). */
export function getRecipeTailwind(id: SpacingRecipeId): string {
  const recipe = SPACING_RECIPES[id];
  return `py-[${recipe.sectionPaddingY}] w-full gap-[${recipe.innerGap}]`.trim();
}

export function listRecipeIds(): SpacingRecipeId[] {
  return Object.keys(SPACING_RECIPES) as SpacingRecipeId[];
}
