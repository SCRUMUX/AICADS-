import React from 'react';
import { SectionShell } from '../../_shared/SectionShell';
import { SectionHeader } from '../../../components/primitives/SectionHeader';
import { Paragraph } from '../../../components/primitives/Paragraph';
import { Card } from '../../../components/primitives/Card';
import { GridContainer, GridItem } from '../../../components/primitives/GridContainer';

export interface FeatureItem {
  title: string;
  description: string;
}

export interface FeaturesBlockProps {
  title?: string;
  subtitle?: string;
  features: FeatureItem[];
  columns?: 2 | 3;
  className?: string;
}

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({
  title = 'Features',
  subtitle,
  features,
  columns = 3,
  className,
}) => {
  const span = columns === 2 ? 6 : 4;

  return (
    <SectionShell recipe="section.features" className={className} aria-label="Features">
      <div className="flex flex-col w-full gap-[var(--space-content-l)]">
        <div className="flex flex-col gap-[var(--space-content-s)] items-center text-center">
          <SectionHeader size="lg" appearance="base" className="justify-center">
            {title}
          </SectionHeader>
          {subtitle && (
            <Paragraph size="md" align="center" className="text-[var(--color-text-secondary)] max-w-[var(--space-container-content-max)]">
              {subtitle}
            </Paragraph>
          )}
        </div>
        <GridContainer maxWidth="desktop" centered className="w-full">
          {features.map((feature) => (
            <GridItem
              key={feature.title}
              span={{ mobile: 4, tablet: 4, desktop: span }}
            >
              <Card variant="outlined" size="md" title={feature.title} className="h-full w-full">
                <Paragraph size="sm" className="text-[var(--color-text-secondary)]">
                  {feature.description}
                </Paragraph>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    </SectionShell>
  );
};

FeaturesBlock.displayName = 'FeaturesBlock';
