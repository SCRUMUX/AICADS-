import React from 'react';
import { SectionShell } from '../../_shared/SectionShell';
import { BlockAction } from '../../_shared/BlockAction';
import { SectionHeader } from '../../../components/primitives/SectionHeader';
import { Paragraph } from '../../../components/primitives/Paragraph';
import { Card } from '../../../components/primitives/Card';
import { Badge } from '../../../components/primitives/Badge';
import { Divider } from '../../../components/primitives/Divider';
import { GridContainer, GridItem } from '../../../components/primitives/GridContainer';
import { cn } from '../../../components/primitives/_shared';

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  actionLabel?: string;
  onAction?: () => void;
  href?: string;
}

export interface PricingBlockProps {
  title?: string;
  subtitle?: string;
  tiers: PricingTier[];
  highlightedIndex?: number;
  className?: string;
}

export const PricingBlock: React.FC<PricingBlockProps> = ({
  title = 'Pricing',
  subtitle,
  tiers,
  highlightedIndex = 1,
  className,
}) => (
  <SectionShell recipe="section.pricing" className={className} aria-label="Pricing">
    <div className="flex flex-col w-full gap-[var(--space-content-l)]">
      <div className="flex flex-col gap-[var(--space-content-s)] items-center text-center">
        <SectionHeader size="lg" appearance="base" className="justify-center">
          {title}
        </SectionHeader>
        {subtitle && (
          <Paragraph size="md" align="center" className="text-[var(--color-text-secondary)]">
            {subtitle}
          </Paragraph>
        )}
      </div>
      <GridContainer maxWidth="desktop" centered className="w-full">
        {tiers.map((tier, index) => {
          const highlighted = index === highlightedIndex;
          return (
            <GridItem key={tier.name} span={{ mobile: 4, tablet: 4, desktop: 4 }}>
              <Card
                variant={highlighted ? 'filled' : 'outlined'}
                size="md"
                title={tier.name}
                className={cn(
                  'h-full w-full flex flex-col',
                  highlighted && 'ring-1 ring-[var(--color-brand-primary)]',
                )}
              >
                <div className="flex flex-col gap-[var(--space-content-m)] flex-1">
                  {highlighted && (
                    <Badge appearance="brand" size="sm" className="self-start">
                      Popular
                    </Badge>
                  )}
                  <div className="flex items-baseline gap-[var(--space-2)]">
                    <span className="text-style-h2 text-[var(--color-text-primary)]">{tier.price}</span>
                    {tier.period && (
                      <span className="text-style-body-sm text-[var(--color-text-muted)]">/{tier.period}</span>
                    )}
                  </div>
                  {tier.description && (
                    <Paragraph size="sm" className="text-[var(--color-text-secondary)]">
                      {tier.description}
                    </Paragraph>
                  )}
                  <Divider appearance="base" size="sm" />
                  <ul className="flex flex-col gap-[var(--space-content-xs)] m-0 p-0 list-none">
                    {tier.features.map((f) => (
                      <li key={f} className="text-style-body-sm text-[var(--color-text-primary)]">
                        {f}
                      </li>
                    ))}
                  </ul>
                  {tier.actionLabel && (
                    <BlockAction
                      label={tier.actionLabel}
                      onClick={tier.onAction}
                      href={tier.href}
                      appearance={highlighted ? 'brand' : 'outline'}
                      size="md"
                      className="w-full justify-center mt-auto"
                    />
                  )}
                </div>
              </Card>
            </GridItem>
          );
        })}
      </GridContainer>
    </div>
  </SectionShell>
);

PricingBlock.displayName = 'PricingBlock';
