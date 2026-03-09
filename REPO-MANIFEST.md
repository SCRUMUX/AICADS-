# AICADS Repository Manifest

This file describes the complete structure of the repository.
The agent MUST consult this before every commit (see CONTRACT 0).

## Root structure

```
.cursor/rules/                   ← Agent rules (ONLY location — no copies in subfolders!)
  CONTRACT 0 — PRE-COMMIT AUDIT.mdc    (alwaysApply: true)
  CONTR1 — STRATEGY & PIPELINE.mdc
  CONTRACT 2 — TACTICAL IMPLEMENTATION.mdc
  CONTRACT 3 — DEFAULT LAYOUT RULES.mdc
  CONTRACT 4 — SAFE JSON CHANGES & PROTECTION.mdc
  CONTRACT 5 — PROJECT START & LAYOUT WORKFLOW.mdc
  CONTRACT 6 — COMPONENT GENERATION ARCHITECTURE.mdc
  CONTRACT 7 — FIGMA STYLE PIPELINE.mdc
  language.mdc                          (alwaysApply: true)

packages/core/                   ← Design system core package
  ai-ds-spec.json                ← GENERATED — assembled from 3 modules. Paste into Figma plugin.
  ai-ds-styles.json              ← EDITABLE — style tokens (colors, fonts, space, radius, iconRoles)
  ai-ds-components.json          ← Component definitions (do not edit for style changes)
  ai-ds-blocks.json              ← Block definitions (do not edit for style changes)
  blocks-spec.json               ← Block specifications
  component-structures.json      ← Enriched component structures from Figma
  package.json                   ← Scripts, dependencies

  scripts/                       ← Build & pipeline scripts
    extract-styles.ts            ← Scrapes website → updates ai-ds-styles.json
    split-spec.ts                ← ai-ds-spec.json → 3 module files
    merge-spec.ts                ← 3 module files → ai-ds-spec.json (with validation)
    validate-spec.ts             ← Validates token references, iconRoles, hex values
    spec-to-tokens.ts            ← Generates CSS variables from spec
    spec-to-contracts.ts         ← Generates component contracts from spec
    spec-to-components.ts        ← Generates React components from contracts
    spec-to-behaviors.ts         ← Generates behavior hooks
    spec-to-stories.ts           ← Generates Storybook stories
    spec-to-block-contracts.ts   ← Generates block contracts
    spec-to-block-components.ts  ← Generates block components
    icons-to-components.ts       ← Generates icon components
    figma-to-structures.ts       ← Enriches component structures
    validate-tokens.ts           ← Validates generated tokens
    validate-pipeline.ts         ← Validates entire build pipeline
    build-dist.ts                ← Builds distribution package
    publish-core.ts              ← Publishes to npm
    release.ts                   ← Release automation
    scaffold-project.ts          ← Creates new project scaffolding
    export-project.ts            ← Exports project for delivery

  components/
    primitives/                  ← Atomic UI components (Button, Input, Checkbox, etc.)
    blocks/                      ← Composite components (AppSidebar, MetricCard, etc.)
    icons/                       ← Icon components

  contracts/
    components/                  ← Component contracts (*.contract.json)
    blocks/                      ← Block contracts (*.block-contract.json)

  config/                        ← Tailwind, PostCSS, CSS variables
  figma-plugin/                  ← Figma plugin source (figma-ai-ds-code.js, figma-ai-ds-ui.html)
  hooks/                         ← Shared React hooks
  images/                        ← Static images

projects/                        ← User projects
  aicads/                        ← Demo project
    pages/                       ← Page implementations
    .storybook/                  ← Storybook config
    .cursor/rules/               ← MUST BE EMPTY (rules inherited from root)

.gitignore                       ← Must exclude: *.backup.json, *.extracted.json, *.zip, debug logs
REPO-MANIFEST.md                 ← THIS FILE
```

## File relationships (dependency map)

```
ai-ds-styles.json ──────┐
ai-ds-components.json ──┼── merge-spec.ts ──→ ai-ds-spec.json
ai-ds-blocks.json ──────┘

ai-ds-spec.json ──→ split-spec.ts ──→ ai-ds-styles.json
                                      ai-ds-components.json
                                      ai-ds-blocks.json

URL reference ──→ extract-styles.ts ──→ ai-ds-styles.json (updates primitives + auto-fixes semantics)
                                        ai-ds-styles.backup.json (auto-created, gitignored)
                                        ai-ds-styles.extracted.json (report, gitignored)
```

## Files that MUST NOT be on GitHub

| Pattern | Reason |
|---------|--------|
| `*.backup.json` | Temporary backup before style extraction |
| `*.extracted.json` | Extraction report (regeneratable) |
| `*.zip` | Archive artifacts |
| `.cursor/debug-*.log` | Debug logs |
| `node_modules/` | Dependencies |
| `packages/core/dist/` | Build output |

## Rules location policy

**All `.mdc` rule files MUST exist ONLY in `.cursor/rules/` at repository root.**

Subdirectory rules (`projects/*/.cursor/rules/`) are FORBIDDEN because:
1. They get out of sync with root rules
2. Cursor may pick up the stale local version instead of the updated root version
3. There is no mechanism to keep them synchronized automatically

If a project needs project-specific rules, create a NEW file (not a copy of an existing CONTRACT).

## npm scripts reference (packages/core)

| Script | Command | Description |
|--------|---------|-------------|
| `spec:split` | `npx tsx scripts/split-spec.ts` | Split spec → 3 modules |
| `spec:merge` | `npx tsx scripts/merge-spec.ts` | Merge 3 modules → spec |
| `spec:validate` | `npx tsx scripts/validate-spec.ts` | Validate full spec |
| `spec:validate-styles` | `npx tsx scripts/validate-spec.ts --styles-only` | Validate styles only |
| `spec:extract` | `npx tsx scripts/extract-styles.ts` | Extract styles from URL |
| `tokens:build` | `npx tsx scripts/spec-to-tokens.ts` | Generate CSS tokens |
| `contracts:generate` | `npx tsx scripts/spec-to-contracts.ts` | Generate contracts |
| `components:generate` | `npx tsx scripts/spec-to-components.ts` | Generate components |
| `build` | Full pipeline | All generators + validation |
