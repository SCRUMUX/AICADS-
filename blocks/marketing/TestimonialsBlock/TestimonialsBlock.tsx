import React from 'react';
import { SectionShell } from '../../_shared/SectionShell';
import { BlockSectionHeader } from '../../_shared/BlockSectionHeader';
import { BlockGrid } from '../../_shared/BlockGrid';
import { Paragraph } from '../../../components/primitives/Paragraph';

export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
}

export interface TestimonialsBlockProps {
  title?: string;
  subtitle?: string;
  testimonials: TestimonialItem[];
  className?: string;
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  title = 'What teams say',
  subtitle,
  testimonials,
  className,
}) => (
  <SectionShell recipe="section.testimonials" className={className} aria-label="Testimonials">
    <BlockSectionHeader title={title} subtitle={subtitle} />
    <BlockGrid columns={3}>
      {testimonials.map((item) => (
        <figure
          key={item.author}
          className="flex flex-col h-full w-full min-w-0 rounded-[var(--radius-medium)] border border-[var(--color-border-base)] bg-[var(--color-surface-1)]"
          style={{ padding: 'var(--space-inset-xl)', gap: 'var(--space-section-stack-m)' }}
        >
          <blockquote className="m-0 text-style-body-md text-[var(--color-text-primary)]">
            &ldquo;{item.quote}&rdquo;
          </blockquote>
          <figcaption className="flex flex-col" style={{ gap: 'var(--space-content-xs)' }}>
            <Paragraph size="sm" className="m-0 font-semibold text-[var(--color-text-primary)]">
              {item.author}
            </Paragraph>
            {item.role && (
              <Paragraph size="sm" className="m-0 text-[var(--color-text-muted)]">
                {item.role}
              </Paragraph>
            )}
          </figcaption>
        </figure>
      ))}
    </BlockGrid>
  </SectionShell>
);

TestimonialsBlock.displayName = 'TestimonialsBlock';
