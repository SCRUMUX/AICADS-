import React from 'react';
import type { TagRowProps } from './TagRow.types';
import { cn } from '../_shared';

export const TagRow = React.forwardRef<HTMLDivElement, TagRowProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-row flex-wrap items-center gap-[var(--space-4,4px)]',
        className,
      )}
      role="list"
      {...rest}
    >
      {children}
    </div>
  );
});

TagRow.displayName = 'TagRow';
