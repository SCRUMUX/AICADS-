import React from 'react';
import { SectionShell } from '../../_shared/SectionShell';
import { BlockAction } from '../../_shared/BlockAction';
import { Link } from '../../../components/primitives/Link';
import { cn } from '../../../components/primitives/_shared';

export interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarBlockProps {
  logo: string;
  links: NavbarLink[];
  cta?: { label: string; href?: string; onClick?: () => void };
  sticky?: boolean;
  className?: string;
}

export const NavbarBlock: React.FC<NavbarBlockProps> = ({
  logo,
  links,
  cta,
  sticky = false,
  className,
}) => (
  <SectionShell
    recipe="section.navbar"
    as="header"
    appearance="base"
    className={cn(sticky && 'sticky top-0 z-[var(--z-header)] border-b border-[var(--color-border-base)]', className)}
    aria-label="Site navigation"
  >
    <div
      className="flex w-full min-w-0 flex-col min-[768px]:flex-row min-[768px]:items-center"
      style={{ gap: 'var(--space-section-stack-m)' }}
    >
      <div className="flex w-full min-w-0 items-center justify-between min-[768px]:contents">
        <span className="text-style-h4 font-semibold text-[var(--color-text-primary)] shrink-0">
          {logo}
        </span>
        {cta && (
          <BlockAction
            label={cta.label}
            href={cta.href}
            onClick={cta.onClick}
            appearance="brand"
            size="sm"
            className="shrink-0 min-[768px]:order-3 min-[768px]:ml-auto"
          />
        )}
      </div>
      <nav
        className="flex min-w-0 flex-wrap items-center justify-start min-[768px]:flex-1"
        style={{ gap: 'var(--space-section-stack-l)' }}
      >
        {links.map((link) => (
          <Link key={link.label} href={link.href} size="sm" showRightIcon={false}>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  </SectionShell>
);

NavbarBlock.displayName = 'NavbarBlock';
