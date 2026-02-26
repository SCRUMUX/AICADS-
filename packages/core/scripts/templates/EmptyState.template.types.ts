import React from 'react';

/**
 * @UI/EmptyState
 * Пустое состояние с иконкой, заголовком, описанием и CTA.
 * Оси: size (sm/md/lg) × appearance (base/info/success/warning/danger) × layout (vertical/horizontal).
 * Boolean props: showIcon, showCta, showSecondary.
 */

export type EmptyStateSize = 'sm' | 'md' | 'lg';

export type EmptyStateAppearance = 'base' | 'info' | 'success' | 'warning' | 'danger';

/** vertical — icon + text + actions stacked; horizontal — icon on left, content on right */
export type EmptyStateLayout = 'vertical' | 'horizontal';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: EmptyStateSize;
  appearance?: EmptyStateAppearance;
  layout?: EmptyStateLayout;

  /** Icon node (will be sized automatically based on size) */
  icon?: React.ReactNode;

  /** Primary title text */
  title?: string;
  /** Secondary description text */
  description?: string;

  /** Primary CTA button instance (takes priority over ctaLabel/onCtaClick) */
  ctaButton?: React.ReactNode;
  /** Secondary action button instance (takes priority over secondaryLabel/onSecondaryClick) */
  secondaryButton?: React.ReactNode;

  /** Shorthand: primary CTA label — auto-renders a Button when ctaButton is not provided */
  ctaLabel?: string;
  /** Shorthand: primary CTA click handler */
  onCtaClick?: () => void;
  /** Shorthand: secondary action label — auto-renders a Button when secondaryButton is not provided */
  secondaryLabel?: string;
  /** Shorthand: secondary action click handler */
  onSecondaryClick?: () => void;

  showIcon?: boolean;
  showCta?: boolean;
  showSecondary?: boolean;
}
