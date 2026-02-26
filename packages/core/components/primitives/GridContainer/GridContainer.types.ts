import React from 'react';

export type GridContainerMaxWidth = 'mobile' | 'tablet' | 'desktop' | 'full';

export interface GridContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: GridContainerMaxWidth;
  centered?: boolean;
  columns?: { mobile?: number; tablet?: number; desktop?: number };
  as?: React.ElementType;
}

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number | { mobile?: number; tablet?: number; desktop?: number };
  start?: number | { mobile?: number; tablet?: number; desktop?: number };
  as?: React.ElementType;
}
