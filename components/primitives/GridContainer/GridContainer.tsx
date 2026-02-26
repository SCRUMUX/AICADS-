import React from 'react';
import type { GridContainerProps, GridItemProps, GridContainerMaxWidth } from './GridContainer.types';
import { cn } from '../_shared';

const MAX_WIDTH_CLASSES: Record<GridContainerMaxWidth, string> = {
  mobile: 'max-w-[767px]',
  tablet: 'max-w-[1439px]',
  desktop: 'max-w-[1440px]',
  full: '',
};

/**
 * Responsive grid container that auto-switches 4→8→12 columns at breakpoints.
 * Uses the `.grid-container` Tailwind utility under the hood.
 */
export const GridContainer = React.forwardRef<HTMLDivElement, GridContainerProps>(
  (props, ref) => {
    const {
      maxWidth = 'desktop',
      centered = true,
      columns,
      as: Tag = 'div',
      className,
      style,
      children,
      ...rest
    } = props;

    const customCols = columns
      ? {
          '--gc-mobile-cols': columns.mobile ?? 4,
          '--gc-tablet-cols': columns.tablet ?? 8,
          '--gc-desktop-cols': columns.desktop ?? 12,
        } as React.CSSProperties
      : undefined;

    return (
      <Tag
        ref={ref}
        className={cn(
          'grid-container',
          MAX_WIDTH_CLASSES[maxWidth],
          centered && maxWidth !== 'full' && 'mx-auto',
          className,
        )}
        style={{ ...customCols, ...style }}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);

GridContainer.displayName = 'GridContainer';

/**
 * Grid item that accepts responsive span/start props.
 * Generates Tailwind responsive classes for grid-column placement.
 */
export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (props, ref) => {
    const { span, start, as: Tag = 'div', className, style, children, ...rest } = props;

    const spanStyle: React.CSSProperties = {};

    if (typeof span === 'number') {
      spanStyle.gridColumn = `span ${span}`;
    } else if (span) {
      if (span.mobile) spanStyle.gridColumn = `span ${span.mobile}`;
    }

    if (typeof start === 'number') {
      spanStyle.gridColumnStart = start;
    } else if (start) {
      if (start.mobile) spanStyle.gridColumnStart = start.mobile;
    }

    const responsiveClasses: string[] = [];
    if (typeof span === 'object') {
      if (span.tablet) responsiveClasses.push(`tablet:col-span-${span.tablet}`);
      if (span.desktop) responsiveClasses.push(`desktop:col-span-${span.desktop}`);
    }
    if (typeof start === 'object') {
      if (start.tablet) responsiveClasses.push(`tablet:col-start-${start.tablet}`);
      if (start.desktop) responsiveClasses.push(`desktop:col-start-${start.desktop}`);
    }

    return (
      <Tag
        ref={ref}
        className={cn(...responsiveClasses, className)}
        style={{ ...spanStyle, ...style }}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);

GridItem.displayName = 'GridItem';
