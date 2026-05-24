# @ai-ds/core v0.6.0

AI Design System — reusable architectural core. Token-driven,
contract-driven, source-first React primitives **and pattern blocks**
powered by Radix UI / cmdk / vaul / sonner under the hood.

## Installation

```bash
npm install git+https://github.com/SCRUMUX/AICADS-.git#v0.6.0
```

## Importing components

```tsx
import { Button } from '@ai-ds/core/components/Button';
import { Modal } from '@ai-ds/core/components/Modal';
import { Tabs, Tab, TabList, TabPanel } from '@ai-ds/core/components/Tab';
import { SearchIcon } from '@ai-ds/core/icons';

// Or the full barrel:
import { Button, Checkbox, Slider, Toaster } from '@ai-ds/core/components';
```

## Available exports

| Import path | Contents |
|---|---|
| `@ai-ds/core/components/<Name>` | A single primitive (preferred) |
| `@ai-ds/core/components` | Full barrel (all 57 primitives) |
| `@ai-ds/core/icons` | All SVG icon components |
| `@ai-ds/core/tokens` | CSS variables (`tokens.css`) |
| `@ai-ds/core/tailwind` | Tailwind preset |
| `@ai-ds/core/contracts/<Name>` | JSON contract for `<Name>` |
| `@ai-ds/core/manifest` | `ai-manifest.json` — AI semantic registry |
| `@ai-ds/core/patterns` | `ai-patterns.json` — block patterns + page templates |
| `@ai-ds/core/blocks/<Name>` | Composed sections (`HeroBlock`, `LandingPageTemplate`, …) |
| `@ai-ds/core/blocks` | Full blocks barrel |
| `@ai-ds/core/recipes` | Spacing recipes (`resolveRecipe`, `SPACING_RECIPES`) |
| `@ai-ds/core/hooks` | React hooks (`useBreakpoint`, `useClickOutside`, …) |
| `@ai-ds/core/shared` | `cn`, `findClasses`, `IconSlot`, `ScrollArea`, … |
| `@ai-ds/core/layout` | Layout system |
| `@ai-ds/core/behaviors` | Behavior modules |
| `@ai-ds/core/eslint-config` | Shareable ESLint config (blocks direct Radix/cmdk/vaul/sonner imports in consumer code) |
| `@ai-ds/core/storybook` | Storybook kit (`createMainConfig`, `createPreview`, `StoryFrame`) |
| `@ai-ds/core/storybook/tailwind` | Tailwind config for Storybook consumers |
| `@ai-ds/core/storybook/index.css` | Tailwind entry for Storybook |

## Consumer ESLint config

Add the AICADS shareable config to your project to enforce that consumer
code never bypasses the AICADS surface and reaches into the underlying
behavior engines (Radix, cmdk, vaul, sonner, Floating UI, input-otp,
class-variance-authority):

```js
// .eslintrc.cjs in your consumer app
module.exports = {
  extends: [require.resolve('@ai-ds/core/eslint-config')],
};
```

This makes `import { Dialog } from '@radix-ui/react-dialog'` (and similar)
fail with a clear migration message pointing to the AICADS semantic API.

## Design tokens

```css
/* Colors */    var(--color-text-primary), var(--color-brand-primary)
/* Spacing */   var(--space-4), var(--space-8), var(--space-16)
/* Radius */   var(--radius-default), var(--radius-pill), var(--radius-md-plus)
/* Z-index */   var(--z-header: 30), var(--z-popover: 40), var(--z-modal: 50)
```

Theme switch:

```html
<html data-theme="light"> … </html>
<html data-theme="dark">  … </html>
```

## What changed in v0.5.0

v0.5.0 is the **System Optimization Layer** — strict token-driven UI,
single Radix-aligned scrollbar, CI-enforced architectural invariants.

| Area                        | Change                                                                                       |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| Toast                       | Custom `<Toast>` **removed**; only `toast()` + `<Toaster>` (sonner) remain                   |
| ScrollBar                   | `@deprecated`; use [`ScrollArea`](./components/primitives/_shared/ScrollArea.tsx); removal in v0.6 |
| Tokens                      | All inline pixel literals replaced with `var(--space-*)` / `var(--radius-*)` / `var(--font-size-*)` |
| Skeletons                   | One contract drives Card / Chart / List / Page / Table sizes                                 |
| Tab × Tabs                  | Active-state styling fully derives from `Tab.contract.json` × Radix `data-state`             |
| Storybook                   | All hex/RGB literals in stories swapped for design tokens; new `StoryFrame` wrapper          |
| Figma plugin                | Embedded `ai-manifest.json` snapshot + Strict-mode validation of generation specs            |
| ESLint (consumer)           | Shareable config `@ai-ds/core/eslint-config` blocks direct Radix/cmdk/vaul/sonner imports    |
| CI guards                   | `npm run lint` + `manifest:check` + `api:check` + Chromatic VRT (0.2% threshold)             |

See [docs/migrations/v0.4-to-v0.5.md](./docs/migrations/v0.4-to-v0.5.md)
for the one-page migration guide and
[CHANGELOG.md](./CHANGELOG.md#050--2026-05-22) for the full release notes.

### What changed in v0.4.0

The behavior layer of every interactive primitive is now powered by
**Radix UI**, **cmdk**, **vaul** or **sonner** — without changing the
public API. See [CHANGELOG.md](./CHANGELOG.md#040--2026-05-22) for the
full list. The isolation contract that keeps these libraries hidden from
consumers is documented in [ARCHITECTURE.md](./ARCHITECTURE.md).

| Layer | What |
|---|---|
| Form controls (`Checkbox`, `RadioButton`/`RadioGroup`, `Switch`, `Slider`, `RangeSlider`, `Select`) | Radix form primitives |
| Overlays (`Popover`, `Tooltip`, `Modal`, `Dropdown`) | Radix Popover / Tooltip / Dialog |
| Disclosure (`Accordion`, `Tab`+`Tabs`+`TabList`+`TabPanel`) | Radix Accordion / Tabs |
| Search (`Autocomplete`, new `CommandPalette`) | cmdk |
| `Drawer` | vaul |
| `Toaster` / `toast()` | sonner |
| `ScrollArea` | Radix Scroll Area |

## Architecture

Source-first: consumers import TypeScript source, processed by their
Vite/bundler. See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full
layered model (public surface → AICADS primitives → `_internal/`
behavior adapters).

## Playground (Storybook)

Local verification workspace (not published in npm `files`, but stories ship with `@ai-ds/core`):

```bash
npm ci
cd playground
npm ci
npm run storybook   # http://localhost:6006/
```

### Storybook in a consumer project

Copy [`templates/consumer-storybook/`](./templates/consumer-storybook/) into your app, install the pinned Storybook toolchain, and run `build-storybook`. Full parity checklists: [docs/storybook-parity.md](./docs/storybook-parity.md).

CI builds both the monorepo playground and the consumer fixture on every PR.

See also [CHANGELOG.md](./CHANGELOG.md) for release history and
[components/primitives/_internal/README.md](./components/primitives/_internal/README.md)
for the isolation rules.
