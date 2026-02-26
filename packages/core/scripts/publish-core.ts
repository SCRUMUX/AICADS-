/**
 * publish-core.ts
 * Builds @ai-ds/core and publishes it to a separate git repository
 * that consumers can install from.
 *
 * Usage:
 *   npx tsx packages/core/scripts/publish-core.ts <target-repo-dir>
 *
 * Example:
 *   npx tsx packages/core/scripts/publish-core.ts ../ai-ds-core-publish
 *
 * What it does:
 *   1. Runs full core:build + build:dist
 *   2. Copies publishable files to target directory
 *   3. Generates consumer-ready package.json (no monorepo-specific fields)
 *   4. Copies CHANGELOG.md and generates README.md
 *   5. Reports git commands for tagging (does not auto-push)
 */

import {
  existsSync, mkdirSync, copyFileSync, readFileSync,
  writeFileSync, readdirSync, statSync, rmSync,
} from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CORE_ROOT = join(__dirname, '..');
const REPO_ROOT = join(CORE_ROOT, '..', '..');

const targetDir = process.argv[2];
if (!targetDir) {
  console.error('Usage: npx tsx packages/core/scripts/publish-core.ts <target-repo-dir>');
  console.error('Example: npx tsx packages/core/scripts/publish-core.ts ../ai-ds-core-publish');
  process.exit(1);
}

const TARGET = join(REPO_ROOT, targetDir);

// ── Step 1: Build ──
console.log('1/5  Building @ai-ds/core...');
execSync('npm run build -w @ai-ds/core', { cwd: REPO_ROOT, stdio: 'inherit' });
console.log('\n     Building dist (JS + d.ts)...');
execSync('npm run build:dist -w @ai-ds/core', { cwd: REPO_ROOT, stdio: 'inherit' });

// ── Step 2: Prepare target ──
console.log('\n2/5  Preparing target directory...');
if (!existsSync(TARGET)) {
  mkdirSync(TARGET, { recursive: true });
}

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

// Clean previous publishable content (keep .git if exists)
for (const entry of readdirSync(TARGET)) {
  if (entry === '.git' || entry === 'node_modules') continue;
  const full = join(TARGET, entry);
  rmSync(full, { recursive: true, force: true });
}

// ── Step 3: Copy publishable files ──
console.log('3/5  Copying publishable files...');

// dist/ — compiled JS + d.ts
copyDirRecursive(join(CORE_ROOT, 'dist'), join(TARGET, 'dist'));
console.log('     dist/');

// config/ — tokens.css + tailwind config
copyDirRecursive(join(CORE_ROOT, 'config'), join(TARGET, 'config'));
console.log('     config/');

// contracts/ — component contracts
copyDirRecursive(join(CORE_ROOT, 'contracts'), join(TARGET, 'contracts'));
console.log('     contracts/');

// images/
const imagesDir = join(CORE_ROOT, 'images');
if (existsSync(imagesDir)) {
  copyDirRecursive(imagesDir, join(TARGET, 'images'));
  console.log('     images/');
}

// Root files
const rootFiles = [
  'ai-ds-spec.json',
  'component-structures.json',
  'postcss.config.cjs',
  'CHANGELOG.md',
];
for (const f of rootFiles) {
  const src = join(CORE_ROOT, f);
  if (existsSync(src)) {
    copyFileSync(src, join(TARGET, f));
    console.log(`     ${f}`);
  }
}

// ── Step 4: Generate consumer package.json ──
console.log('\n4/5  Generating package.json...');
const corePkg = JSON.parse(readFileSync(join(CORE_ROOT, 'package.json'), 'utf-8'));

const publishPkg = {
  name: corePkg.name,
  version: corePkg.version,
  description: corePkg.description,
  type: corePkg.type,
  main: corePkg.main,
  types: corePkg.types,
  exports: corePkg.exports,
  files: corePkg.files,
  peerDependencies: corePkg.peerDependencies,
  keywords: corePkg.keywords,
  license: corePkg.license,
};

writeFileSync(join(TARGET, 'package.json'), JSON.stringify(publishPkg, null, 2) + '\n', 'utf-8');

// ── Step 5: Generate README ──
console.log('5/5  Generating README.md...');
const version = corePkg.version;
const readme = `# @ai-ds/core v${version}

AI Design System — reusable architectural core.

## Installation

\`\`\`bash
# From git repository:
npm install git+https://github.com/YOUR_ORG/ai-ds-core.git#v${version}

# Or from local .tgz:
npm install ./ai-ds-core-${version}.tgz
\`\`\`

## Quick Start

\`\`\`bash
npm install
npx storybook dev -p 6006
\`\`\`

## Importing Components

\`\`\`tsx
import { Button } from '@ai-ds/core/components/Button';
import { Badge }  from '@ai-ds/core/components/Badge';
import { SearchIcon } from '@ai-ds/core/icons';
\`\`\`

## Available Exports

| Import path | What |
|---|---|
| \`@ai-ds/core/components/Button\` | Individual component |
| \`@ai-ds/core/icons\` | All SVG icon components |
| \`@ai-ds/core/tokens\` | CSS variables (colors, spacing, typography) |
| \`@ai-ds/core/hooks\` | React hooks (useBreakpoint, useClickOutside, etc.) |
| \`@ai-ds/core/shared\` | Shared utilities (cn, findClasses) |

## Design Tokens

All styling uses CSS custom properties:

\`\`\`css
/* Colors */    var(--color-text-primary), var(--color-brand-primary)
/* Spacing */   var(--space-4), var(--space-8), var(--space-16)
/* Typography */ text-style-body, text-style-h2, text-style-body-sm
/* Radius */    var(--radius-default), var(--radius-medium)
/* Z-index */   var(--z-header), var(--z-popover), var(--z-modal)
\`\`\`

## Updating

When a new version is available:

\`\`\`bash
# If installed from git:
npm install git+https://github.com/YOUR_ORG/ai-ds-core.git#v<NEW_VERSION>

# If installed from .tgz:
# Replace the old .tgz with the new one, then:
npm install
\`\`\`

See [CHANGELOG.md](./CHANGELOG.md) for details on each release.
`;

writeFileSync(join(TARGET, 'README.md'), readme, 'utf-8');

// ── Done ──
console.log('');
console.log(`Published @ai-ds/core v${version} to: ${relative(REPO_ROOT, TARGET)}/`);
console.log('');
console.log('Next steps:');
console.log(`  cd ${relative(REPO_ROOT, TARGET)}`);
console.log('  git init                              # if first time');
console.log('  git add .');
console.log(`  git commit -m "release: @ai-ds/core v${version}"`);
console.log(`  git tag v${version}`);
console.log('  git remote add origin <repo-url>      # if first time');
console.log('  git push -u origin main --tags');
console.log('');
