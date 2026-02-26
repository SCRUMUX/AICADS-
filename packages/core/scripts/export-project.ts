/**
 * export-project.ts
 * Exports a project from the monorepo into a standalone directory
 * that can be handed off to another developer.
 *
 * Usage:
 *   npx tsx packages/core/scripts/export-project.ts <project-name> <output-dir>
 *
 * Example:
 *   npx tsx packages/core/scripts/export-project.ts aicads ./export/encar-project
 *
 * What it does:
 *   1. Runs core:build to ensure tokens/contracts are fresh
 *   2. npm pack @ai-ds/core → creates .tgz
 *   3. Copies project dir (pages, .storybook, configs) to output
 *   4. Patches package.json: removes monorepo-specific bits, adds .tgz dep
 *   5. Patches tsconfig.json: removes monorepo paths
 *   6. Patches .storybook/main.ts: keeps only standalone story path
 *   7. Generates README with setup instructions
 */

import {
  mkdirSync, copyFileSync, readdirSync, readFileSync,
  writeFileSync, existsSync, statSync,
} from 'fs';
import { join, dirname, basename, relative } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CORE_ROOT = join(__dirname, '..');
const REPO_ROOT = join(CORE_ROOT, '..', '..');

const projectName = process.argv[2];
const outputDir = process.argv[3];

if (!projectName || !outputDir) {
  console.error('Usage: npx tsx packages/core/scripts/export-project.ts <project-name> <output-dir>');
  console.error('Example: npx tsx packages/core/scripts/export-project.ts aicads ./export/encar');
  process.exit(1);
}

const PROJECT_SRC = join(REPO_ROOT, 'projects', projectName);
if (!existsSync(PROJECT_SRC)) {
  console.error(`Project "${projectName}" not found at ${PROJECT_SRC}`);
  process.exit(1);
}

const OUTPUT = join(REPO_ROOT, outputDir);
if (existsSync(OUTPUT)) {
  console.error(`Output directory already exists: ${OUTPUT}`);
  console.error('Remove it first or choose a different path.');
  process.exit(1);
}

// ── Step 1: Build core (generate + compile) ──
console.log('1/7  Building @ai-ds/core (generate + compile to JS)...');
execSync('npm run build -w @ai-ds/core && npm run build:dist -w @ai-ds/core', {
  cwd: REPO_ROOT,
  stdio: 'inherit',
});

// ── Step 2: Pack core ──
console.log('\n2/7  Packing @ai-ds/core...');
const packOutput = execSync('npm pack --json -w @ai-ds/core', {
  cwd: REPO_ROOT,
  encoding: 'utf-8',
});
const packInfo = JSON.parse(packOutput);
const tgzFilename = packInfo[0]?.filename || 'ai-ds-core-0.1.0.tgz';
const tgzSource = join(REPO_ROOT, tgzFilename);

const corePkg = JSON.parse(readFileSync(join(CORE_ROOT, 'package.json'), 'utf-8'));
const coreVersion = corePkg.version;

console.log(`   Packed: ${tgzFilename} (v${coreVersion})`);

// ── Step 3: Copy project ──
console.log('\n3/7  Copying project files...');
mkdirSync(OUTPUT, { recursive: true });

function copyDirRecursive(src: string, dest: string, excludes: string[] = []) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    if (excludes.includes(entry)) continue;
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath, excludes);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

copyDirRecursive(PROJECT_SRC, OUTPUT, ['node_modules', 'dist', 'storybook-static']);

// Copy .tgz into output
const tgzDest = join(OUTPUT, tgzFilename);
copyFileSync(tgzSource, tgzDest);
console.log(`   Included: ${tgzFilename}`);

// Copy images from core into output for static serving
const coreImagesDir = join(CORE_ROOT, 'images');
const outputImagesDir = join(OUTPUT, 'images');
if (existsSync(coreImagesDir)) {
  copyDirRecursive(coreImagesDir, outputImagesDir, []);
  console.log('   Included: images/');
}

// ── Step 4: Patch package.json ──
console.log('\n4/7  Patching package.json...');
const projPkgPath = join(OUTPUT, 'package.json');
const projPkg = JSON.parse(readFileSync(projPkgPath, 'utf-8'));

projPkg.name = projPkg.name.replace('@ai-ds/', '');
projPkg.dependencies = projPkg.dependencies || {};
projPkg.dependencies['@ai-ds/core'] = `file:./${tgzFilename}`;
delete projPkg.scripts?.prestorybook;
projPkg.scripts = projPkg.scripts || {};
projPkg.scripts.setup = 'npm install && npx storybook dev -p 6006';

writeFileSync(projPkgPath, JSON.stringify(projPkg, null, 2) + '\n', 'utf-8');

// ── Step 5: Patch tsconfig.json ──
console.log('5/7  Patching tsconfig.json...');
const tsconfigPath = join(OUTPUT, 'tsconfig.json');
if (existsSync(tsconfigPath)) {
  const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
  delete tsconfig.compilerOptions?.paths;
  writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + '\n', 'utf-8');
}

// ── Step 6: Patch .storybook/main.ts ──
console.log('6/7  Patching .storybook/main.ts for standalone...');
const mainTsPath = join(OUTPUT, '.storybook', 'main.ts');
if (existsSync(mainTsPath)) {
  const standaloneMain = `import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: [
    '../node_modules/@ai-ds/core/dist/components/**/*.stories.js',
    '../pages/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-themes',
  ],
  staticDirs: [
    { from: '../images', to: '/images' },
  ],
  typescript: {
    reactDocgen: 'react-docgen',
  },
};

export default config;
`;
  writeFileSync(mainTsPath, standaloneMain, 'utf-8');
}

// ── Step 7: Generate README ──
console.log('7/7  Generating README...');
const readmePath = join(OUTPUT, 'README.md');
const readme = `# ${projPkg.description || projectName}

## Quick Start

\`\`\`bash
npm install
npx storybook dev -p 6006
\`\`\`

## Design System: @ai-ds/core v${coreVersion}

This project uses the **@ai-ds/core** design system.
The package is included as \`${tgzFilename}\`.

### Importing components

\`\`\`tsx
import { Button } from '@ai-ds/core/components/Button';
import { Badge }  from '@ai-ds/core/components/Badge';
import { SearchIcon } from '@ai-ds/core/icons';
\`\`\`

### Available exports

| Import path | What |
|---|---|
| \`@ai-ds/core/components/Button\` | Individual component |
| \`@ai-ds/core/icons\` | All SVG icon components |
| \`@ai-ds/core/tokens\` | CSS variables (colors, spacing, typography) |
| \`@ai-ds/core/hooks\` | React hooks (useBreakpoint, useClickOutside, etc.) |
| \`@ai-ds/core/shared\` | Shared utilities (cn, findClasses) |

### Design tokens

All styling uses CSS custom properties (design tokens).
Never use hardcoded colors or pixel values — use tokens:

\`\`\`tsx
// Colors:    var(--color-text-primary), var(--color-brand-primary), ...
// Spacing:   var(--space-4), var(--space-8), var(--space-16), ...
// Typography: text-style-body, text-style-h2, text-style-body-sm, ...
// Radius:    var(--radius-default), var(--radius-medium), ...
// Effects:   shadow-elevation-1, shadow-elevation-2, ...
\`\`\`

## Updating @ai-ds/core

When a new version is available, you'll receive an updated \`.tgz\` file.

\`\`\`bash
# Replace the old .tgz with the new one, then:
npm install
npx storybook dev -p 6006   # verify everything works
\`\`\`

## Project structure

\`\`\`
pages/               ← Your page components
  <page-name>/
    PageName.tsx           ← Page component
    PageName.stories.tsx   ← Storybook story
images/              ← Static assets (avatars, logos)
.storybook/          ← Storybook configuration
  main.ts            ← Framework & stories config
  preview.ts         ← Theme, tokens, global styles
  storybook.css      ← Tailwind + base styles
tailwind.config.cjs  ← Tailwind (extends core config)
postcss.config.cjs   ← PostCSS
tsconfig.json        ← TypeScript
\`\`\`
`;

writeFileSync(readmePath, readme, 'utf-8');

// Cleanup: remove the .tgz from repo root
try {
  const { unlinkSync } = await import('fs');
  unlinkSync(tgzSource);
} catch { /* ignore */ }

console.log('');
console.log(`Export complete: ${relative(REPO_ROOT, OUTPUT)}/`);
console.log('');
console.log('Contents:');
console.log(`  ${tgzFilename}    ← design system package`);
console.log('  pages/                 ← project pages');
console.log('  .storybook/            ← Storybook config');
console.log('  README.md              ← setup instructions');
console.log('');
console.log('Hand off to developer:');
console.log(`  1. Send the "${basename(OUTPUT)}" folder`);
console.log('  2. Developer runs: npm install && npx storybook dev -p 6006');
console.log('');
