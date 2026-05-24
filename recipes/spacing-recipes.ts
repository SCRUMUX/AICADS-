/**
 * Named spacing recipes for AICADS pattern blocks.
 * Maps semantic section types to token-driven padding/gap/max-width.
 */

import type { SpaceCategory, SpaceSize } from '../layout/spacing/spacing-system';
import { getSpaceVar } from '../layout/spacing/spacing-system';

export type SpacingRecipeId =
  | 'section.hero'
  | 'section.features'
  | 'section.pricing'
  | 'section.cta'
  | 'section.footer'
  | 'section.app-shell';

export type RecipeMaxWidth = 'mobile' | 'tablet' | 'desktop' | 'full';

export interface SpacingIntentRef {
  category: SpaceCategory;
  size: SpaceSize;
}

export interface SpacingRecipe {
  sectionPaddingY: SpacingIntentRef;
  sectionPaddingX?: SpacingIntentRef;
  innerGap: SpacingIntentRef;
  maxWidth: RecipeMaxWidth;
}

export const SPACING_RECIPES: Record<SpacingRecipeId, SpacingRecipe> = {
  'section.hero': {
    sectionPaddingY: { category: 'layout', size: 'xl' },
    sectionPaddingX: { category: 'inset', size: 'l' },
    innerGap: { category: 'content', size: 'l' },
    maxWidth: 'desktop',
  },
  'section.features': {
    sectionPaddingY: { category: 'layout', size: 'l' },
    sectionPaddingX: { category: 'inset', size: 'l' },
    innerGap: { category: 'content', size: 'l' },
    maxWidth: 'desktop',
  },
  'section.pricing': {
    sectionPaddingY: { category: 'layout', size: 'l' },
    sectionPaddingX: { category: 'inset', size: 'l' },
    innerGap: { category: 'content', size: 'm' },
    maxWidth: 'desktop',
  },
  'section.cta': {
    sectionPaddingY: { category: 'layout', size: 'l' },
    sectionPaddingX: { category: 'inset', size: 'l' },
    innerGap: { category: 'content', size: 'm' },
    maxWidth: 'desktop',
  },
  'section.footer': {
    sectionPaddingY: { category: 'layout', size: 'm' },
    sectionPaddingX: { category: 'inset', size: 'l' },
    innerGap: { category: 'content', size: 'm' },
    maxWidth: 'full',
  },
  'section.app-shell': {
    sectionPaddingY: { category: 'layout', size: 's' },
    sectionPaddingX: { category: 'inset', size: 'm' },
    innerGap: { category: 'content', size: 's' },
    maxWidth: 'full',
  },
};

export interface ResolvedRecipe {
  className: string;
  style: Record<string, string>;
  maxWidth: RecipeMaxWidth;
  innerGapClassName: string;
}

function paddingClass(prefix: 'py' | 'px', ref: SpacingIntentRef): string {
  return `${prefix}-[${getSpaceVar(ref.category, ref.size)}]`;
}

function gapClass(ref: SpacingIntentRef): string {
  return `gap-[${getSpaceVar(ref.category, ref.size)}]`;
}

/** Resolve a recipe id to Tailwind token classes + maxWidth for SectionShell. */
export function resolveRecipe(id: SpacingRecipeId): ResolvedRecipe {
  const recipe = SPACING_RECIPES[id];
  const py = paddingClass('py', recipe.sectionPaddingY);
  const px = recipe.sectionPaddingX
    ? paddingClass('px', recipe.sectionPaddingX)
    : 'px-[var(--space-inset-l)]';

  return {
    className: `${py} ${px} w-full bg-[var(--color-bg-base)]`,
    style: {},
    maxWidth: recipe.maxWidth,
    innerGapClassName: gapClass(recipe.innerGap),
  };
}

/** Tailwind-only class string for a recipe (documentation / AI hints). */
export function getRecipeTailwind(id: SpacingRecipeId): string {
  const r = resolveRecipe(id);
  return `${r.className} ${r.innerGapClassName}`.trim();
}

export function listRecipeIds(): SpacingRecipeId[] {
  return Object.keys(SPACING_RECIPES) as SpacingRecipeId[];
}
