/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run blocks:generate-components
 */

import React from 'react';
import type { ProgressCardProps } from './ProgressCard.types';

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  action,
  items,
  className,
  children,
}) => {
  return (
    <div className={`flex flex-col flex-1 min-w-0 p-[var(--space-inset-l)] gap-[var(--space-content-m)] bg-[var(--color-surface-1)]${className ? ' ' + className : ''}`} style={{ boxShadow: 'var(--effect-elevation-1)' }}>
      <div className="flex items-center justify-between items-center">
        {title != null && <div className="text-style-body-lg text-[var(--color-text-primary)] font-semibold">{title}</div>}
        {action}
      </div>
      <div className="flex flex-col gap-[var(--space-content-m)]">
        {items}
      </div>
      {children}
    </div>
  );
};

export default ProgressCard;
