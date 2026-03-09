import React from 'react';
import type { MetricRowProps, MetricRowSize, DeltaVariant } from './MetricRow.types';

const gapClass: Record<MetricRowSize, string> = {
  sm: 'gap-[var(--space-2)]',
  md: 'gap-[var(--space-4)]',
};

const labelClass: Record<MetricRowSize, string> = {
  sm: 'text-style-caption-xs text-[var(--color-text-muted)]',
  md: 'text-style-caption text-[var(--color-text-muted)]',
};

const valueClass: Record<MetricRowSize, string> = {
  sm: 'text-style-body text-[var(--color-brand-primary)] font-semibold',
  md: 'text-style-body-lg text-[var(--color-brand-primary)] font-semibold',
};

const deltaBaseClass: Record<MetricRowSize, string> = {
  sm: 'text-style-caption-xs',
  md: 'text-style-body-sm',
};

const deltaColorClass: Record<DeltaVariant, string> = {
  positive: 'text-[var(--color-success-base)]',
  negative: 'text-[var(--color-danger-base)]',
  muted: 'text-[var(--color-text-muted)]',
};

const descriptionClass: Record<MetricRowSize, string> = {
  sm: 'text-style-caption-xs text-[var(--color-text-muted)]',
  md: 'text-style-body-sm text-[var(--color-text-muted)]',
};

export const MetricRow: React.FC<MetricRowProps> = ({
  size = 'md',
  label,
  value,
  delta,
  deltaVariant = 'muted',
  description,
  className,
  children,
}) => {
  return (
    <div
      className={`flex flex-col flex-1 min-w-0 ${gapClass[size]}${className ? ' ' + className : ''}`}
    >
      {label != null && (
        <span className={labelClass[size]}>{label}</span>
      )}

      <div className="flex items-baseline gap-[var(--space-4)]">
        {value != null && (
          <span className={valueClass[size]}>{value}</span>
        )}
        {delta != null && (
          <span className={`${deltaBaseClass[size]} ${deltaColorClass[deltaVariant]}`}>
            {delta}
          </span>
        )}
      </div>

      {description != null && (
        <span className={descriptionClass[size]}>{description}</span>
      )}

      {children}
    </div>
  );
};

export default MetricRow;
