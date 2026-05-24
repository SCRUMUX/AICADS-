import React from 'react';
import { SectionShell } from '../../_shared/SectionShell';
import { BlockAction } from '../../_shared/BlockAction';
import { SectionHeader } from '../../../components/primitives/SectionHeader';
import { Paragraph } from '../../../components/primitives/Paragraph';
import { Card } from '../../../components/primitives/Card';

export interface CTABlockAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface CTABlockProps {
  title: string;
  description?: string;
  action?: CTABlockAction;
  className?: string;
}

export const CTABlock: React.FC<CTABlockProps> = ({
  title,
  description,
  action,
  className,
}) => (
  <SectionShell recipe="section.cta" className={className} aria-label="Call to action">
    <Card variant="filled" size="lg" className="w-full">
      <div className="flex flex-col items-center text-center gap-[var(--space-content-m)] py-[var(--space-content-l)]">
        <SectionHeader size="lg" appearance="base" className="justify-center">
          {title}
        </SectionHeader>
        {description && (
          <Paragraph size="md" align="center" className="text-[var(--color-text-secondary)] max-w-[var(--space-container-content-max)]">
            {description}
          </Paragraph>
        )}
        {action && (
          <BlockAction
            label={action.label}
            onClick={action.onClick}
            href={action.href}
            appearance="brand"
            size="lg"
          />
        )}
      </div>
    </Card>
  </SectionShell>
);

CTABlock.displayName = 'CTABlock';
