import React from 'react';
import { SectionShell } from '../../_shared/SectionShell';
import { BlockAction } from '../../_shared/BlockAction';
import { SectionHeader } from '../../../components/primitives/SectionHeader';
import { Paragraph } from '../../../components/primitives/Paragraph';
import { Badge } from '../../../components/primitives/Badge';
import { cn } from '../../../components/primitives/_shared';

export interface HeroBlockAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface HeroBlockProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'center' | 'left';
  primaryAction?: HeroBlockAction;
  secondaryAction?: HeroBlockAction;
  className?: string;
}

export const HeroBlock: React.FC<HeroBlockProps> = ({
  title,
  subtitle,
  badge,
  align = 'center',
  primaryAction,
  secondaryAction,
  className,
}) => {
  const centered = align === 'center';

  return (
    <SectionShell recipe="section.hero" className={className} aria-label="Hero">
      <div
        className={cn(
          'flex flex-col w-full max-w-[var(--space-container-wide-max)]',
          centered ? 'items-center text-center mx-auto' : 'items-start text-left',
        )}
      >
        {badge && (
          <Badge appearance="brand" size="md">
            {badge}
          </Badge>
        )}
        <SectionHeader size="lg" appearance="base" className={cn(centered && 'justify-center')}>
          {title}
        </SectionHeader>
        {subtitle && (
          <Paragraph
            size="lg"
            align={align}
            className="text-[var(--color-text-secondary)] max-w-[var(--space-container-content-max)]"
          >
            {subtitle}
          </Paragraph>
        )}
        {(primaryAction || secondaryAction) && (
          <div
            className={cn(
              'flex flex-wrap gap-[var(--space-content-m)]',
              centered ? 'justify-center' : 'justify-start',
            )}
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
        )}
      </div>
    </SectionShell>
  );
};

HeroBlock.displayName = 'HeroBlock';
