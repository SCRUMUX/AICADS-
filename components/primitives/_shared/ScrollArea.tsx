import React from 'react';
import { cn } from './utils';

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: string;
  children: React.ReactNode;
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ maxHeight, className, style, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('scroll-area', className)}
      style={{ maxHeight, ...style }}
      {...rest}
    >
      {children}
    </div>
  ),
);

ScrollArea.displayName = 'ScrollArea';
