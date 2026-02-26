# Changelog

All notable changes to @ai-ds/core are documented here.
Format follows [Semantic Versioning](https://semver.org/).

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

