# Changelog

All notable changes to @ai-ds/core are documented here.
Format follows [Semantic Versioning](https://semver.org/).

## [0.7.0] — 2026-05-24

> **Marketing blocks v0.7** — 12 landing sections, unified layout contract, consumer Storybook parity.

### Added

- **7 Tier-1 blocks** — `NavbarBlock`, `LogoCloudBlock`, `StatsBlock`, `TestimonialsBlock`, `FAQBlock`, `HowItWorksBlock`, `NewsletterBlock`.
- **Layout contract** — `blockLayout.ts` (`BLOCK_CONTENT_CLASS`, start-aligned sections, logo tiles via `LogoMark`).
- **Page template** — `marketing.landing.saas` in `ai-patterns.json` (14 patterns).
- **Storybook** — `engine-styles`, `marketingViewports`, `storybook-dev.mjs`, GitHub Pages deploy workflow.
- **CI** — consumer fixture `prebuild-storybook` gate with `@storybook/addon-viewport`.

### Changed

- **SectionShell / BlockGrid** — unified 1440px content column; 3-up grids from 1024px.
- **All marketing blocks** — left-aligned headers (center reserved for `marketing.hero.centered` only).
- **LogoCloudBlock** — grid of `LogoMark` tiles instead of uppercase text labels.
- **Hero / Features / Pricing / CTA / Footer** — enriched props and stories.

### Removed

- **`AppShellBlock` / `AppSidebarBlock`** — deferred from pattern manifest (marketing focus).

## [0.6.0] — 2026-05-23

> **Pattern Layer** — distributable marketing/app blocks, spacing recipes, and AI pattern manifest.

### Added

- **`blocks/`** — `HeroBlock`, `FeaturesBlock`, `PricingBlock`, `CTABlock`, `FooterBlock`, `LandingPageTemplate`, `AppShellBlock`, `AppSidebarBlock` with Storybook stories.
- **`recipes/`** — named spacing recipes (`section.hero`, …) + `resolveRecipe()` for token-driven section rhythm.
- **`ai-patterns.json`** — pattern catalog + `marketing.landing.default` page template for Replit/AI.
- **Exports** — `@ai-ds/core/blocks/*`, `@ai-ds/core/recipes`, `@ai-ds/core/patterns`.
- **CI** — `npm run patterns:check`.
- **Docs** — [docs/pattern-layer.md](./docs/pattern-layer.md), [docs/migrations/v0.5-to-v0.6.md](./docs/migrations/v0.5-to-v0.6.md).

### Changed

- Storybook kit globs include `blocks/**/*.stories.*` (monorepo + consumer).
- `src/index.ts` re-exports layout, blocks, recipes from repo root (fixes broken `./layout` path).

## [0.5.1] — 2026-05-23

> **Storybook parity release** — distributable Storybook kit, token build pipeline, CI storybook gates.

### Features

- **`@ai-ds/core/storybook` kit** — `createMainConfig`, `createPreview`, `StoryFrame`, Tailwind/PostCSS wrappers for monorepo and consumer modes.
- **Consumer template** — [`templates/consumer-storybook/`](./templates/consumer-storybook/) + CI fixture proving npm-install parity.
- **Tokens pipeline** — `npm run tokens:build` / `tokens:check` regenerate and verify `config/css-variables/tokens.css` from `ai-ds-spec.json` (includes tooltip inverted tokens).
- **CI** — `build-storybook` jobs for playground and consumer fixture; `tokens:check` in guard pipeline.
- **Clean publish** — `files` whitelist in `package.json`; `dist/` removed from repo.

### Fixes

- **Tooltip** — theme-inverted tokens and unified arrow/bubble color via shared CSS variables on wrapper.

See [docs/storybook-parity.md](./docs/storybook-parity.md) for consumer setup checklists.

## [0.5.0] — 2026-05-22

> Phase 10 — **System Optimization Layer.** v0.5.0 makes AICADS
> strictly token-driven, single-Radix-aligned and visually deterministic,
> and locks every architectural invariant behind a CI guard.

### Breaking

- **`<Toast>` component removed.** The custom presentational `<Toast>`
  primitive was a duplicate of the sonner-backed surface. The public
  Toast API is now **`toast()` + `<Toaster>` only** (sonner-powered).

  ```diff
  - import { Toast } from '@ai-ds/core/components/Toast';
  - <Toast appearance="info" title="Hello" />
  + import { toast, Toaster } from '@ai-ds/core/components/Toast';
  + toast.info('Hello');
  + // Mount <Toaster /> once near the app root.
  ```

- **`<ScrollBar>` primitive is `@deprecated`** and emits a runtime
  `console.warn` at import time. Use
  [`@ai-ds/core/shared#ScrollArea`](./components/primitives/_shared/ScrollArea.tsx)
  (Radix-powered). Scheduled for removal in **v0.6.0**.

  ```diff
  - import { ScrollBar } from '@ai-ds/core/components/ScrollBar';
  + import { ScrollArea } from '@ai-ds/core/shared';
  ```

  Internal usages in `Dropdown`, `Autocomplete`, `Select`,
  `CommandPalette`, `Modal` and `Drawer` were already migrated.

### Features

- **AI manifest is now generated + verified by CI.** New
  [`scripts/build-manifest.mjs`](./scripts/build-manifest.mjs) and
  [`scripts/check-manifest-sync.mjs`](./scripts/check-manifest-sync.mjs)
  with `npm run manifest:build` / `npm run manifest:check`. The Figma
  plugin now ships an embedded snapshot of the manifest (refresh with
  `npm run figma:embed-manifest`) and validates every generation spec
  against it (warn by default, abort in **Strict mode**).
- **Single Skeleton contract.** New
  [`contracts/components/Skeleton.contract.json`](./contracts/components/Skeleton.contract.json)
  drives `SkeletonCard / Chart / List / Page / Table` from one source
  via `findClasses(rules, { component, size })`.
- **Tab × Tabs decoupling.** `Tab.contract.json` now models the
  `data-state ∈ { active, inactive }` axis against every `appearance`,
  and the runtime no longer hard-codes `brand` active-state when nested
  in `<Tabs>`. New Storybook matrix `TabGroupAppearanceMatrix` shows
  base / ghost / outline / brand active states.
- **Shareable consumer ESLint config** at
  [`aicads.eslintrc.shared.cjs`](./aicads.eslintrc.shared.cjs), exported
  as `@ai-ds/core/eslint-config`. Blocks direct imports of Radix /
  cmdk / vaul / sonner / Floating UI / input-otp / cva from consumer
  code.
- **VRT pipeline.** Chromatic + storybook test-runner + Playwright,
  threshold `0.002` (0.2%), see [`docs/vrt.md`](./docs/vrt.md) and the
  [Chromatic workflow](./.github/workflows/chromatic.yml).
- **Frozen public API surface.** `@microsoft/api-extractor` with
  [`api-extractor.json`](./api-extractor.json) and the snapshot at
  [`etc/ai-ds-core.api.md`](./etc/ai-ds-core.api.md). New scripts
  `api:extract` and `api:check`. See [`docs/api-surface.md`](./docs/api-surface.md).

### Fixes — token compliance (100%)

- **Avatar:** badge overlay rewritten on top of `Badge` tokens, no
  inline `style` left.
- **CircularProgress:** outer dimensions are now `var(--space-N)`
  classes; only SVG-internal `strokeWidth`/`fontSize` stay numeric
  (those are SVG units, not CSS pixels).
- **Modal / Drawer:** widths use `w-[var(--space-N)]`,
  `max-w-[calc(100vw-var(--space-32))]` and route body scroll through
  `<ScrollArea>` instead of native overflow.
- **EmptyState / Switch / Toaster / Tooltip / CommandPalette / Select /
  Autocomplete / Image / Pagination / Table / ListItem / DropdownItem /
  Chip / GridContainer / Textarea / Divider / table-tokens** — all
  inline pixel literals replaced with `var(--space-*)` / `var(--radius-*)`
  / `var(--font-size-*)` / `var(--line-height-*)`.
- **Storybook palette cleanup:** every hardcoded hex/RGB color in
  `components/primitives/**/*.stories.tsx` swapped for design-token
  CSS variables. New
  [`playground/.storybook/StoryFrame.tsx`](./playground/.storybook/StoryFrame.tsx)
  wrapper standardises story chrome.

### Architecture — CI guards

- **Token enforcement lint.** New custom rule
  [`eslint-rules/no-hardcoded-tokens.cjs`](./eslint-rules/no-hardcoded-tokens.cjs)
  forbids numeric pixel literals in `style={{...}}`, Tailwind arbitrary
  values without `var(--*)`, and hex colors in primitive components.
  Enabled at error level via `npm run lint`.
- **Single CI workflow.** [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)
  chains `lint` → `manifest:check` → `api:check`. VRT runs in a
  parallel [`chromatic.yml`](./.github/workflows/chromatic.yml).
- **Tokens.** Added `--space-400`, `--breakpoint-mobile-max`,
  `--breakpoint-tablet-max`, `--breakpoint-desktop` to back the
  remaining inline literals without forcing a visual diff.
- **Cursor rule** [`.cursor/rules/aicads-imports.mdc`](./.cursor/rules/aicads-imports.mdc)
  mirrors the shareable ESLint config for AI-assisted editors.

### Migration

See [`docs/migrations/v0.4-to-v0.5.md`](./docs/migrations/v0.4-to-v0.5.md)
for a single-page upgrade guide (Toast hard-delete + ScrollBar
deprecation are the only consumer-visible breakages).

## [0.4.0] — 2026-05-22

### Added — Radix-powered behavior engine

AICADS now uses **Radix UI / cmdk / vaul / sonner** as the internal
behavior substrate for form, overlay, navigation and disclosure
primitives. The public component surface, props, tokens and contracts
are **unchanged** — every existing import keeps working.

- New `_internal/` adapter layer (`components/primitives/_internal/`) —
  the only place in the repo where Radix UI / cmdk / vaul / sonner /
  Floating UI may be imported. Enforced by ESLint `no-restricted-imports`
  in the new root `.eslintrc.cjs`.
- `Popover`, `Tooltip`, `Modal`, `Dropdown` → `@radix-ui/react-popover` /
  `react-tooltip` / `react-dialog`.
- `Checkbox`, `RadioButton`+`RadioGroup`, `Switch`, `Slider`,
  `RangeSlider`, `Select` → corresponding Radix form primitives.
- `Autocomplete`, new `CommandPalette` → cmdk.
- `Accordion`, `Tab`+`Tabs`+`TabList`+`TabPanel` → `@radix-ui/react-accordion`
  / `react-tabs`.
- `Drawer` (was a stub) → vaul with full open/onClose/side API.
- `Toaster` + `toast()` → sonner.
- `ScrollArea` (in `_shared/`) → `@radix-ui/react-scroll-area`.
- New components: `CommandPalette`, `RadioGroup`, `Tabs`, `TabList`,
  `TabPanel`.
- New shared utility: `cn()` now uses `clsx + tailwind-merge` (replaces
  19 local copies).
- New `ai-manifest.json` at the repo root — machine-readable mapping
  `<primitive> → { role, engine, contract }` for AI tools.
- New `playground/` workspace with Storybook 8 for local verification.
- New `figma-plugin/README.md` documenting the Radix mapping.
- New `ARCHITECTURE.md` documenting the isolation contract.

### Changed

- `components/index.ts` now re-exports **all 57 primitives** (was only
  `Button`).
- `src/index.ts` re-exports the full components barrel.
- `package.json` exports a new `"./manifest"` subpath for
  `ai-manifest.json`.
- Card `lg` padding fix: `p-3` → `p-12` (Figma spec).
- Several primitives had local `cn()` declarations unified to import
  from `_shared`.
- Contract colors hardened: `Checkbox.contract.json`,
  `Avatar.contract.json`, `RadioButton.contract.json` had `style.bg`
  rules but missing `bg-[var(...)]` Tailwind classes — fixed.

### Architecture

- **Isolation contract.** No public file may `import '@radix-ui/...'`,
  `'cmdk'`, `'vaul'`, `'sonner'`, `'@floating-ui/...'` or
  `'class-variance-authority'`. ESLint enforces this; the only override
  is for `components/primitives/_internal/**`.
- **Source-first stays.** No build step changes; consumers still import
  TypeScript directly.

## [0.3.0] — 2026-02-26

### Added
- 5 new primitives: Select, RangeSlider, Rating, Drawer, FileUpload (spec, contracts, templates, components)
- 5 new hooks: useDebounce, useLocalStorage, useMediaQuery, useScrollLock, useIntersectionObserver
- Figma plugin builders for Select, RangeSlider, Rating, Drawer, FileUpload
- New semantic tokens: color_brand_subtle, color_success_subtle, color_danger_subtle

## [0.2.0] — 2026-02-26

### Added
- Z-index design tokens in core spec and tokens.css (header:30, popover:40, modal:50, tooltip:60, toast:70)
- TypeScript declaration files (.d.ts) generation in build pipeline
- Contract regeneration now preserves `generatorStrategy`, `manualImplementation`, `template`, `enhancements`
- Release script with auto-versioning and changelog generation (`npm run release`)
- Extended pipeline validation (z-index, preserve/template, barrel exports)

### Fixed
- Z-index tokens were missing from core package — exported projects had broken header/popover layering
- `build-dist.ts` now generates .d.ts files — consumers get full TypeScript autocomplete
- `spec-to-contracts.ts` no longer overwrites manually set metadata fields

## [0.1.0] — 2026-02-25

### Added
- 50 primitive components (Button, Input, Dropdown, Card, Table, Badge, etc.)
- Design token pipeline: ai-ds-spec.json → tokens.css + Tailwind config
- 48 component contracts (JSON-driven variant rules)
- SVG icon pack with React component wrappers
- Tailwind CSS configuration (token-driven, responsive breakpoints)
- React hooks: useBreakpoint, useClickOutside, useFocusTrap, etc.
- Layout system and behavior modules
- Figma plugin for design sync
- Cursor rules (5 contracts for AI-assisted development)
- Storybook stories for all primitives
- Light/dark theme support via data-theme attribute

### Architecture
- Package exports map for clean `@ai-ds/core/components/Button` imports
- Source-first distribution (TypeScript source, processed by consumer's Vite)
- Compatible with npm workspaces (monorepo) and standalone (npm pack)

