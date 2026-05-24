import React from 'react';
import { cn } from '../../components/primitives/_shared';
import { GridContainer } from '../../components/primitives/GridContainer';
import { resolveRecipe, type SpacingRecipeId } from '../../recipes/spacing-recipes';

export interface SectionShellProps extends React.HTMLAttributes<HTMLElement> {
  /** Named spacing recipe — enforces visual rhythm across blocks. */
  recipe: SpacingRecipeId;
  as?: 'section' | 'div' | 'footer' | 'header';
  /** Inner content column uses recipe innerGap via flex column. */
  children: React.ReactNode;
}

/**
 * Token-driven section wrapper for all AICADS pattern blocks.
 * Applies layout recipe padding + max-width grid container.
 */
export const SectionShell = React.forwardRef<HTMLElement, SectionShellProps>(
  ({ recipe, as: Tag = 'section', className, children, ...rest }, ref) => {
    const resolved = resolveRecipe(recipe);

    return (
      <Tag
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(resolved.className, className)}
        {...rest}
      >
        <GridContainer maxWidth={resolved.maxWidth} centered={resolved.maxWidth !== 'full'}>
          <div className={cn('flex flex-col w-full', resolved.innerGapClassName)}>
            {children}
          </div>
        </GridContainer>
      </Tag>
    );
  },
);

SectionShell.displayName = 'SectionShell';
