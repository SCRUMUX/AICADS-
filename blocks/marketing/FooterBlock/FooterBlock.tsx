import React from 'react';
import { SectionShell } from '../../_shared/SectionShell';
import { BlockSectionHeader } from '../../_shared/BlockSectionHeader';
import { BlockGrid } from '../../_shared/BlockGrid';
import { Paragraph } from '../../../components/primitives/Paragraph';
import { Link } from '../../../components/primitives/Link';
import { Divider } from '../../../components/primitives/Divider';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  label: string;
  href: string;
}

export interface FooterBlockProps {
  columns: FooterColumn[];
  copyright?: string;
  socialLinks?: FooterSocialLink[];
  className?: string;
}

export const FooterBlock: React.FC<FooterBlockProps> = ({
  columns,
  copyright,
  socialLinks,
  className,
}) => (
  <SectionShell recipe="section.footer" as="footer" appearance="surface" className={className} aria-label="Footer">
    <BlockGrid columns={Math.min(columns.length, 4) as 1 | 2 | 3 | 4}>
      {columns.map((column) => (
        <div key={column.title} className="flex flex-col" style={{ gap: 'var(--space-section-stack-m)' }}>
          <Paragraph size="sm" className="font-semibold text-[var(--color-text-primary)] m-0">
            {column.title}
          </Paragraph>
          <nav className="flex flex-col" style={{ gap: 'var(--space-section-stack-s)' }}>
            {column.links.map((link) => (
              <Link key={link.label} href={link.href} size="sm" showRightIcon={false}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </BlockGrid>
    {(socialLinks?.length || copyright) && (
      <div className="flex flex-col w-full" style={{ gap: 'var(--space-section-content-m)' }}>
        <Divider appearance="base" size="sm" className="w-full" />
        {socialLinks && socialLinks.length > 0 && (
          <nav className="flex flex-wrap items-center justify-start" style={{ gap: 'var(--space-section-stack-m)' }}>
            {socialLinks.map((link) => (
              <Link key={link.label} href={link.href} size="sm" showRightIcon={false}>
                {link.label}
              </Link>
            ))}
          </nav>
        )}
        {copyright && (
          <Paragraph size="sm" className="text-[var(--color-text-muted)] m-0 w-full">
            {copyright}
          </Paragraph>
        )}
      </div>
    )}
  </SectionShell>
);

FooterBlock.displayName = 'FooterBlock';
