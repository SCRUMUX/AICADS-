/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run blocks:generate-components
 */

import React from 'react';
import type { MetricRowProps } from './MetricRow.types';

export const MetricRow: React.FC<MetricRowProps> = ({
  label,
  value,
  delta,
  description,
  className,
  children,
}) => {
  return (
    <div className={`flex flex-col flex-1 min-w-0 gap-[var(--space-2)]${className ? ' ' + className : ''}`}>
      {label != null && <div className="text-style-caption text-[var(--color-text-muted)]">{label}</div>}
      <div className="flex items-center gap-[var(--space-4)] items-baseline">
        {value != null && <div className="text-style-body-lg text-[var(--color-brand-primary)] font-semibold">{value}</div>}
        {delta != null && <div className="text-style-caption-xs">{delta}</div>}
      </div>
      {description != null && <div className="text-style-caption-xs text-[var(--color-text-muted)]">{description}</div>}
      {children}
    </div>
  );
};

export default MetricRow;
