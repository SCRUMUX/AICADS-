#!/usr/bin/env node
/**
 * Validates Storybook prerequisites before dev/build.
 * Usage: node scripts/storybook-prep.mjs [projectDir]
 * Default projectDir: playground/
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectArg = process.argv[2];
const projectRoot = projectArg
  ? path.resolve(repoRoot, projectArg)
  : path.join(repoRoot, 'playground');

const requireFromProject = createRequire(path.join(projectRoot, 'package.json'));

function resolveVaulCss(req) {
  try {
    const entry = req.resolve('vaul');
    const cssFile = path.join(path.dirname(entry), '..', 'style.css');
    return fs.existsSync(cssFile) ? cssFile : null;
  } catch {
    return null;
  }
}

const missing = [];

try {
  requireFromProject.resolve('@ai-ds/core/package.json');
} catch {
  missing.push('@ai-ds/core');
}

try {
  requireFromProject.resolve('sonner/dist/styles.css');
} catch {
  missing.push('sonner (Toast engine CSS)');
}

if (!resolveVaulCss(requireFromProject)) {
  missing.push('vaul (Drawer engine CSS)');
}

try {
  requireFromProject.resolve('@storybook/addon-viewport');
} catch {
  missing.push('@storybook/addon-viewport');
}

if (missing.length > 0) {
  console.error(`\nStorybook prerequisites missing in ${projectRoot}:\n`);
  for (const item of missing) {
    console.error(`  - ${item}`);
  }
  console.error('\nFrom the repo root run:\n');
  console.error('  npm ci');
  console.error(`  cd ${path.relative(repoRoot, projectRoot) || '.'} && npm ci\n`);
  process.exit(1);
}

console.log(`Storybook prerequisites OK (${path.relative(repoRoot, projectRoot) || 'playground'})`);
