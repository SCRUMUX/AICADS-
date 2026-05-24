# AICADS Pattern Layer

Distributable **blocks**, **spacing recipes**, and **pattern manifest** so Replit/AI assemble pages without improvising layout.

## Architecture

```
@ai-ds/core/patterns          → ai-patterns.json (AI catalog)
@ai-ds/core/blocks/HeroBlock  → React section components
@ai-ds/core/recipes           → named spacing recipes (section.hero, …)
@ai-ds/core/components/*      → primitives (Button, Card, …)
```

Generated consumer pages **must** import blocks from `@ai-ds/core/blocks/*`. Do not compose marketing sections from raw `<div>` layout.

## Spacing recipes

Marketing sections use **`--space-section-*`** tokens (page rhythm), not the component `layout` scale (6–9px).

| Recipe ID | Use for |
|-----------|---------|
| `section.hero` | Above-the-fold hero — largest vertical padding |
| `section.navbar` | Sticky top navigation |
| `section.logos` | Logo cloud / social proof strip |
| `section.stats` | Metrics band |
| `section.features` | Feature grids |
| `section.steps` | How-it-works numbered steps |
| `section.pricing` | Pricing tiers |
| `section.testimonials` | Quote cards |
| `section.faq` | FAQ accordion list |
| `section.cta` | Call-to-action card or brand band |
| `section.newsletter` | Email capture |
| `section.footer` | Site footer |
| `section.app-shell` | Dashboard sidebar + main |

All blocks wrap content in [`SectionShell`](../blocks/_shared/SectionShell.tsx) with the matching recipe. Horizontal inset follows `--grid-*-offset` for full-bleed backgrounds with aligned content.

### Landing layout contract

Defined in [`blockLayout.ts`](../blocks/_shared/blockLayout.ts) — B2B SaaS baseline (Linear / Stripe / Vercel):

- **One content column** — `BLOCK_CONTENT_CLASS` on every section (navbar → footer)
- **Start alignment** — headers, grids, CTAs, stats, footer meta align to the **left edge** of that column
- **Prose width** — subtitles and forms use `BLOCK_PROSE_CLASS` (`640px` max) but stay **left-anchored**, not centered
- **Logo cloud** — equal-height tiles in a 5-column grid (`LogoMark`), not floating uppercase labels
- **Exception** — `marketing.hero.centered` uses `align="center"` on hero only; `marketing.landing.saas` uses split/start hero throughout

Grids use 3-up from **1024px** so cards never orphan on typical desktop widths.

## Pattern manifest

[`ai-patterns.json`](../ai-patterns.json) lists:

- **patterns** — block name, recipe, primitives, Storybook reference, `whenToUse`
- **pageTemplates** — ordered section lists (e.g. `marketing.landing.default`, `marketing.landing.saas`)

```ts
import patterns from '@ai-ds/core/patterns' assert { type: 'json' };
```

## Consumer usage

```tsx
import { HeroBlock } from '@ai-ds/core/blocks/HeroBlock';
import { LandingPageTemplate } from '@ai-ds/core/blocks/LandingPageTemplate';
import '@ai-ds/core/tokens';

// Single section
<HeroBlock title="..." primaryAction={{ label: 'Start', onClick }} />

// Full landing (pageTemplates.marketing.landing.default or .saas)
<LandingPageTemplate hero={...} features={...} pricing={...} cta={...} footer={...} navbar={...} />
```

## Storybook

- **Blocks/Marketing/** — individual blocks
- **Screens/Marketing Landing (Default)** — full landing reference
- **Blocks/_shared/RecipeShowcase** — spacing recipes

## CI

```bash
npm run patterns:check   # manifest ↔ block folders
npm run lint             # includes blocks/
```

## Replit / Cursor rule (consumer)

Add to your project rules:

> For marketing pages, select a pattern from `@ai-ds/core/patterns`. Import the matching block from `@ai-ds/core/blocks/*`. Never hand-roll section spacing — use blocks + recipes.

See [docs/migrations/v0.5-to-v0.6.md](./migrations/v0.5-to-v0.6.md) for upgrade notes.
