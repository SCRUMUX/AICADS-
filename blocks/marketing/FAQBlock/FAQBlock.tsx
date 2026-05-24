import React from 'react';
import { SectionShell } from '../../_shared/SectionShell';
import { BlockSectionHeader } from '../../_shared/BlockSectionHeader';
import { cn } from '../../../components/primitives/_shared';
import { Accordion } from '../../../components/primitives/Accordion';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQBlockProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  className?: string;
}

export const FAQBlock: React.FC<FAQBlockProps> = ({
  title = 'Frequently asked questions',
  subtitle,
  items,
  className,
}) => (
  <SectionShell recipe="section.faq" className={className} aria-label="FAQ">
    <BlockSectionHeader title={title} subtitle={subtitle} />
    <div className={cn('flex w-full min-w-0 flex-col')} style={{ gap: 'var(--space-section-stack-s)' }}>
      {items.map((item) => (
        <Accordion key={item.question} size="md" fullWidth content={item.answer}>
          {item.question}
        </Accordion>
      ))}
    </div>
  </SectionShell>
);

FAQBlock.displayName = 'FAQBlock';
