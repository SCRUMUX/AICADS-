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

| Recipe ID | Use for |
|-----------|---------|
| `section.hero` | Above-the-fold hero — largest vertical padding |
| `section.features` | Feature grids |
| `section.pricing` | Pricing tiers |
| `section.cta` | Call-to-action banner |
| `section.footer` | Site footer |
| `section.app-shell` | Dashboard sidebar + main |

All blocks wrap content in [`SectionShell`](../blocks/_shared/SectionShell.tsx) with the matching recipe.

## Pattern manifest

[`ai-patterns.json`](../ai-patterns.json) lists:

- **patterns** — block name, recipe, primitives, Storybook reference, `whenToUse`
- **pageTemplates** — ordered section lists (e.g. `marketing.landing.default`)

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

// Full landing (pageTemplates.marketing.landing.default)
<LandingPageTemplate hero={...} features={...} pricing={...} cta={...} footer={...} />
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
