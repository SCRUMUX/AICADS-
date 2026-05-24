import React from 'react';
import { HeroBlock, type HeroBlockProps } from '../HeroBlock';
import { FeaturesBlock, type FeaturesBlockProps } from '../FeaturesBlock';
import { PricingBlock, type PricingBlockProps } from '../PricingBlock';
import { CTABlock, type CTABlockProps } from '../CTABlock';
import { FooterBlock, type FooterBlockProps } from '../FooterBlock';
import { NavbarBlock, type NavbarBlockProps } from '../NavbarBlock';
import { LogoCloudBlock, type LogoCloudBlockProps } from '../LogoCloudBlock';
import { StatsBlock, type StatsBlockProps } from '../StatsBlock';
import { TestimonialsBlock, type TestimonialsBlockProps } from '../TestimonialsBlock';
import { FAQBlock, type FAQBlockProps } from '../FAQBlock';
import { HowItWorksBlock, type HowItWorksBlockProps } from '../HowItWorksBlock';
import { NewsletterBlock, type NewsletterBlockProps } from '../NewsletterBlock';

export interface LandingPageTemplateProps {
  hero: HeroBlockProps;
  features: FeaturesBlockProps;
  pricing: PricingBlockProps;
  cta: CTABlockProps;
  footer: FooterBlockProps;
  navbar?: NavbarBlockProps;
  logoCloud?: LogoCloudBlockProps;
  stats?: StatsBlockProps;
  testimonials?: TestimonialsBlockProps;
  howItWorks?: HowItWorksBlockProps;
  faq?: FAQBlockProps;
  newsletter?: NewsletterBlockProps;
  className?: string;
}

/**
 * Full marketing landing page — section order from ai-patterns.json pageTemplates.
 * `marketing.landing.default` uses core five sections; `marketing.landing.saas` adds optional blocks.
 */
export const LandingPageTemplate: React.FC<LandingPageTemplateProps> = ({
  hero,
  features,
  pricing,
  cta,
  footer,
  navbar,
  logoCloud,
  stats,
  testimonials,
  howItWorks,
  faq,
  newsletter,
  className,
}) => (
  <div className={className}>
    {navbar && <NavbarBlock {...navbar} />}
    <HeroBlock {...hero} />
    {logoCloud && <LogoCloudBlock {...logoCloud} />}
    {stats && <StatsBlock {...stats} />}
    <FeaturesBlock {...features} />
    {howItWorks && <HowItWorksBlock {...howItWorks} />}
    <PricingBlock {...pricing} />
    {testimonials && <TestimonialsBlock {...testimonials} />}
    {faq && <FAQBlock {...faq} />}
    <CTABlock {...cta} />
    {newsletter && <NewsletterBlock {...newsletter} />}
    <FooterBlock {...footer} />
  </div>
);

LandingPageTemplate.displayName = 'LandingPageTemplate';
