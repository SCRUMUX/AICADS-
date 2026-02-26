# @ai-ds/core v0.2.0

AI Design System — reusable architectural core.

## Installation

```bash
npm install git+https://github.com/SCRUMUX/AICADS-.git#v0.2.0
```

## Importing Components

```tsx
import { Button } from '@ai-ds/core/components/Button';
import { Badge }  from '@ai-ds/core/components/Badge';
import { SearchIcon } from '@ai-ds/core/icons';
```

## Available Exports

| Import path | What |
|---|---|
| `@ai-ds/core/components/Button` | Individual component |
| `@ai-ds/core/components` | All components barrel |
| `@ai-ds/core/icons` | All SVG icon components |
| `@ai-ds/core/tokens` | CSS variables (colors, spacing, typography) |
| `@ai-ds/core/hooks` | React hooks (useBreakpoint, useClickOutside, etc.) |
| `@ai-ds/core/shared` | Shared utilities (cn, findClasses) |
| `@ai-ds/core/layout` | Layout system |
| `@ai-ds/core/behaviors` | Component behaviors |

## Design Tokens

```css
/* Colors */    var(--color-text-primary), var(--color-brand-primary)
/* Spacing */   var(--space-4), var(--space-8), var(--space-16)
/* Z-index */   var(--z-header: 30), var(--z-popover: 40), var(--z-modal: 50)
```

## Architecture

Source-first: consumers import TypeScript source, processed by their Vite/bundler.

See [CHANGELOG.md](./CHANGELOG.md) for release history.
