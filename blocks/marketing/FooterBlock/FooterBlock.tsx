import React from 'react';
import { SectionShell } from '../../_shared/SectionShell';
import { Paragraph } from '../../../components/primitives/Paragraph';
import { Link } from '../../../components/primitives/Link';
import { Divider } from '../../../components/primitives/Divider';
import { GridContainer, GridItem } from '../../../components/primitives/GridContainer';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterBlockProps {
  columns: FooterColumn[];
  copyright?: string;
  className?: string;
}

export const FooterBlock: React.FC<FooterBlockProps> = ({
  columns,
  copyright,
  className,
}) => (
  <SectionShell recipe="section.footer" as="footer" className={className} aria-label="Footer">
    <GridContainer maxWidth="desktop" centered className="w-full">
      {columns.map((column) => (
        <GridItem key={column.title} span={{ mobile: 4, tablet: 4, desktop: 3 }}>
          <div className="flex flex-col gap-[var(--space-content-s)]">
            <Paragraph size="sm" className="font-semibold text-[var(--color-text-primary)]">
              {column.title}
            </Paragraph>
            <nav className="flex flex-col gap-[var(--space-content-xs)]">
              {column.links.map((link) => (
                <Link key={link.label} href={link.href} size="sm" showRightIcon={false}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </GridItem>
      ))}
    </GridContainer>
    {copyright && (
      <>
        <Divider appearance="base" size="sm" className="w-full" />
        <Paragraph size="sm" align="center" className="text-[var(--color-text-muted)] w-full">
          {copyright}
        </Paragraph>
      </>
    )}
  </SectionShell>
);

FooterBlock.displayName = 'FooterBlock';
