# AICADS — AI Component Architecture Design System

Универсальная система автоматической генерации дизайн-системы в Figma по стилям любого сайта.

## Быстрый старт (Figma pipeline)

```
1. git clone https://github.com/SCRUMUX/AICADS-.git
2. Откройте проект в Cursor
3. Напишите "старт" в чат агента
4. Вставьте ссылку на сайт-референс
5. Утвердите палитру
6. Скопируйте готовый ai-ds-spec.json в Figma-плагин
```

Агент автоматически установит зависимости, извлечёт стили, покажет отчёт и соберёт файл.
Вы не запускаете ни одной команды вручную.

## Установка как npm-пакет

```bash
npm install git+https://github.com/SCRUMUX/AICADS-.git
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
