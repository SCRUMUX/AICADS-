import React from 'react';
import { SectionShell } from '../../_shared/SectionShell';
import { BlockAction } from '../../_shared/BlockAction';
import { BlockSectionHeader } from '../../_shared/BlockSectionHeader';
import { BlockGrid } from '../../_shared/BlockGrid';
import { BLOCK_ACTIONS_ROW_CLASS, BLOCK_SPLIT_CLASS } from '../../_shared/blockLayout';
import { Badge } from '../../../components/primitives/Badge';
import { cn } from '../../../components/primitives/_shared';

export interface HeroBlockAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroBlockProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'center' | 'left';
  variant?: 'centered' | 'split';
  /** Shown in split layout or as bleedMedia in centered layout. */
  media?: React.ReactNode;
  stats?: HeroStat[];
  primaryAction?: HeroBlockAction;
  secondaryAction?: HeroBlockAction;
  className?: string;
}

export const HeroBlock: React.FC<HeroBlockProps> = ({
  title,
  subtitle,
  badge,
  align = 'center',
  variant = 'centered',
  media,
  stats,
  primaryAction,
  secondaryAction,
  className,
}) => {
  const centered = variant === 'centered' && align === 'center';
  const split = variant === 'split';

  const actions = (primaryAction || secondaryAction) && (
    <div
      className={cn(BLOCK_ACTIONS_ROW_CLASS, centered && 'justify-center')}
      style={{ gap: 'var(--space-section-stack-m)' }}
    >
      {primaryAction && (
        <BlockAction
          label={primaryAction.label}
          onClick={primaryAction.onClick}
          href={primaryAction.href}
          appearance="brand"
          size="lg"
        />
      )}
      {secondaryAction && (
        <BlockAction
          label={secondaryAction.label}
          onClick={secondaryAction.onClick}
          href={secondaryAction.href}
          appearance="outline"
          size="lg"
        />
      )}
    </div>
  );

  const statsRow = stats && stats.length > 0 && (
    <BlockGrid columns={Math.min(stats.length, 4) as 1 | 2 | 3 | 4}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn('flex flex-col', centered && 'items-center text-center')}
          style={{ gap: 'var(--space-section-stack-s)' }}
        >
          <span className="text-style-h2 font-semibold text-[var(--color-text-primary)]">
            {stat.value}
          </span>
          <span className="text-style-body-sm text-[var(--color-text-secondary)]">
            {stat.label}
          </span>
        </div>
      ))}
    </BlockGrid>
  );

  const copy = (
    <div
      className={cn(
        'flex flex-col w-full min-w-0',
        centered ? 'items-center text-center' : 'items-start text-left',
      )}
      style={{ gap: 'var(--space-section-content-m)' }}
    >
      {badge && !split && (
        <Badge appearance="brand" size="md">
          {badge}
        </Badge>
      )}
      <BlockSectionHeader
        eyebrow={split ? badge : undefined}
        title={title}
        subtitle={subtitle}
        align={centered ? 'center' : 'left'}
        titleScale="display"
      />
      {actions}
      {statsRow}
    </div>
  );

  return (
    <SectionShell
      recipe="section.hero"
      className={className}
      aria-label="Hero"
      bleedMedia={!split && media ? media : undefined}
    >
      {split ? (
        <div className={BLOCK_SPLIT_CLASS}>
          {copy}
          {media && (
            <div className="w-full min-w-0 rounded-[var(--radius-medium)] overflow-hidden border border-[var(--color-border-base)] bg-[var(--color-surface-2)]">
              {media}
            </div>
          )}
        </div>
      ) : (
        copy
      )}
    </SectionShell>
  );
};

HeroBlock.displayName = 'HeroBlock';
