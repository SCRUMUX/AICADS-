/**
 * AICADS pattern blocks — distributable composed sections for consumer apps.
 *
 * Prefer granular imports:
 *   import { HeroBlock } from '@ai-ds/core/blocks/HeroBlock';
 */

export { HeroBlock } from './marketing/HeroBlock';
export type { HeroBlockProps } from './marketing/HeroBlock';

export { FeaturesBlock } from './marketing/FeaturesBlock';
export type { FeaturesBlockProps, FeatureItem } from './marketing/FeaturesBlock';

export { PricingBlock } from './marketing/PricingBlock';
export type { PricingBlockProps, PricingTier } from './marketing/PricingBlock';

export { CTABlock } from './marketing/CTABlock';
export type { CTABlockProps } from './marketing/CTABlock';

export { FooterBlock } from './marketing/FooterBlock';
export type { FooterBlockProps, FooterColumn } from './marketing/FooterBlock';

export { LandingPageTemplate } from './marketing/LandingPageTemplate';
export type { LandingPageTemplateProps } from './marketing/LandingPageTemplate';

export { AppShellBlock } from './app/AppShellBlock';
export type { AppShellBlockProps } from './app/AppShellBlock';

export { AppSidebarBlock } from './app/AppSidebarBlock';
export type { AppSidebarBlockProps, AppSidebarNavItem } from './app/AppSidebarBlock';
