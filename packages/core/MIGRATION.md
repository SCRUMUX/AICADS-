# Core Package — Migration Complete

## Structure

```
packages/core/                  (@ai-ds/core)
├── ai-ds-spec.json             ← Source of truth for all tokens
├── component-structures.json   ← Figma component structures
├── package.json
├── tsconfig.json
├── postcss.config.cjs
│
├── icons/                      ← SVG icon source files
├── figma-plugin/               ← Figma plugin (manifest + code + UI)
├── cursor-rules/               ← All CONTRACT rules (portable)
│
├── scripts/                    ← Pipeline generators
│   ├── spec-to-tokens.ts
│   ├── spec-to-contracts.ts
│   ├── spec-to-components.ts
│   ├── spec-to-behaviors.ts
│   ├── spec-to-stories.ts
│   ├── icons-to-components.ts
│   ├── figma-to-structures.ts
│   ├── scaffold-project.ts     ← New project generator
│   ├── validate-pipeline.ts
│   └── validate-tokens.ts
│
├── config/
│   ├── css-variables/tokens.css
│   └── tailwind/tailwind.config.cjs
│
├── contracts/components/       ← Generated component contracts
├── components/
│   ├── primitives/             ← 50+ UI components
│   ├── icons/index.tsx         ← Generated icon components
│   └── index.ts
│
├── hooks/                      ← React hooks
├── layout/                     ← Layout system
├── behaviors/                  ← Behavioral rules
├── tokens/transformers/        ← Token transformers
├── utils/                      ← Utilities
├── schemas/                    ← JSON schemas
└── src/index.ts                ← Main entry point
```

## Projects Structure

```
projects/
├── aicads/                     ← AICADS project
│   ├── pages/                  ← Project-specific pages
│   ├── .storybook/             ← Project-specific Storybook config
│   ├── .cursor/rules/          ← Copied from core
│   ├── package.json            ← depends on @ai-ds/core
│   ├── tsconfig.json
│   ├── postcss.config.cjs
│   └── tailwind.config.cjs
│
└── <new-project>/              ← Created by scaffold-project.ts
```

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run core:build` | Full pipeline build (tokens → contracts → components) |
| `npm run core:icons` | Regenerate icon components from SVGs |
| `npm run new-project -- <name>` | Scaffold a new project |
| `npm run storybook -w @ai-ds/<project>` | Launch Storybook for a project |
| `npm run healthcheck` | Validate pipeline integrity |
