/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run blocks:generate-components
 */

import React from 'react';
import type { HeroBannerProps } from './HeroBanner.types';

export const HeroBanner: React.FC<HeroBannerProps> = ({
  prevButton,
  icon,
  title,
  subtitle,
  cta,
  nextButton,
  className,
  children,
}) => {
  return (
    <div className={`flex items-center flex-1 min-w-0 px-[var(--space-24)] py-[var(--space-48)] gap-[var(--space-24)] min-h-[var(--space-320)] bg-[var(--color-surface-1)]${className ? ' ' + className : ''}`}>
      {prevButton}
      <div className="flex flex-col gap-[var(--space-8)] flex-1 items-center">
        {icon}
        {title != null && <div className="text-style-h2 text-[var(--color-text-primary)] text-center">{title}</div>}
        {subtitle != null && <div className="text-style-body text-[var(--color-text-muted)] text-center">{subtitle}</div>}
        {cta}
      </div>
      {nextButton}
      {children}
    </div>
  );
};

export default HeroBanner;
