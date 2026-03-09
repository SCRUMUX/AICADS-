/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run blocks:generate-components
 */

import React from 'react';
import type { ProductCardProps } from './ProductCard.types';

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  meta,
  className,
  children,
}) => {
  return (
    <div className={`flex flex-col flex-1 min-w-0 bg-[var(--color-surface-1)]${className ? ' ' + className : ''}`} style={{ boxShadow: 'var(--effect-elevation-1)' }}>
      <div className="">
        {badge}
      </div>
      <div className="flex flex-col gap-[var(--space-4)] px-[var(--space-12)] py-[var(--space-12)]">
        {title != null && <div className="text-style-body text-[var(--color-text-primary)] font-semibold">{title}</div>}
        {price != null && <div className="text-style-body-lg text-[var(--color-brand-primary)] font-semibold">{price}</div>}
        {meta != null && <div className="text-style-caption-xs text-[var(--color-text-muted)]">{meta}</div>}
      </div>
      {children}
    </div>
  );
};

export default ProductCard;
