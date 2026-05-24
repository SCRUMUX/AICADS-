import React from 'react';
import { HeroBlock, type HeroBlockProps } from '../HeroBlock';
import { FeaturesBlock, type FeaturesBlockProps } from '../FeaturesBlock';
import { PricingBlock, type PricingBlockProps } from '../PricingBlock';
import { CTABlock, type CTABlockProps } from '../CTABlock';
import { FooterBlock, type FooterBlockProps } from '../FooterBlock';

export interface LandingPageTemplateProps {
  hero: HeroBlockProps;
  features: FeaturesBlockProps;
  pricing: PricingBlockProps;
  cta: CTABlockProps;
  footer: FooterBlockProps;
  className?: string;
}

/**
 * Full marketing landing page — fixed section order from
 * pageTemplates.marketing.landing.default in ai-patterns.json.
 */
export const LandingPageTemplate: React.FC<LandingPageTemplateProps> = ({
  hero,
  features,
  pricing,
  cta,
  footer,
  className,
}) => (
  <div className={className}>
    <HeroBlock {...hero} />
    <FeaturesBlock {...features} />
    <PricingBlock {...pricing} />
    <CTABlock {...cta} />
    <FooterBlock {...footer} />
  </div>
);

LandingPageTemplate.displayName = 'LandingPageTemplate';
