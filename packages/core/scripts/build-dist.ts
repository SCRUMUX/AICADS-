/**
 * build-dist.ts
 * Compiles TypeScript → JavaScript using esbuild API, then copies non-TS assets.
 * Produces a dist/ directory ready for npm pack.
 *
 * Usage: npx tsx scripts/build-dist.ts
 */

import {
  existsSync, mkdirSync, rmSync,
  readdirSync, statSync, copyFileSync, readFileSync, writeFileSync,
} from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { build } from 'esbuild';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CORE_ROOT = join(__dirname, '..');
const DIST = join(CORE_ROOT, 'dist');

console.log('Cleaning dist/...');
if (existsSync(DIST)) rmSync(DIST, { recursive: true });
mkdirSync(DIST, { recursive: true });

// ── Find all TS/TSX source files ──
function findFiles(dir: string, exts: string[]): string[] {
  const results: string[] = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === 'node_modules' || entry === 'dist' || entry === 'scripts') continue;
      results.push(...findFiles(full, exts));
    } else if (exts.some(e => full.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}

const TS_DIRS = ['components', 'hooks', 'layout', 'behaviors', 'tokens', 'utils', 'src'];
const allTsFiles: string[] = [];
for (const dir of TS_DIRS) {
  allTsFiles.push(...findFiles(join(CORE_ROOT, dir), ['.ts', '.tsx']));
}

console.log(`Found ${allTsFiles.length} TypeScript files to compile.`);

// ── Compile with esbuild API ──
console.log('Compiling TypeScript → JavaScript...');

await build({
  entryPoints: allTsFiles,
  outdir: DIST,
  outbase: CORE_ROOT,
  format: 'esm',
  jsx: 'automatic',
  target: 'es2020',
  platform: 'browser',
  bundle: false,
  sourcemap: false,
  logLevel: 'warning',
});

// ── Generate TypeScript declarations (.d.ts) ──
console.log('Generating TypeScript declarations...');
try {
  execSync(
    'npx tsc --project tsconfig.build.json --emitDeclarationOnly --declaration --declarationMap',
    { cwd: CORE_ROOT, stdio: 'pipe' }
  );
  console.log('  Declarations generated successfully.');
} catch (e: any) {
  console.warn('  Warning: tsc declaration generation had issues (non-critical):');
  const stderr = e.stderr?.toString()?.trim();
  if (stderr) {
    const lines = stderr.split('\n').slice(0, 5);
    for (const l of lines) console.warn(`    ${l}`);
    if (stderr.split('\n').length > 5) console.warn(`    ... and ${stderr.split('\n').length - 5} more`);
  }
}

// ── Fix esbuild default exports for Storybook CSF ──
// esbuild converts `export default X` → `var X_default = meta; ... export { X_default as default }`
// Storybook's CSF parser requires explicit `export default meta;` syntax.
console.log('Fixing default exports in story files...');
const storyFiles = findFiles(DIST, ['.stories.js']);
let fixedCount = 0;
for (const sf of storyFiles) {
  let code = readFileSync(sf, 'utf-8');
  // Pattern: var XXX_stories_default = meta;
  const varMatch = code.match(/var\s+(\w+_stories_default)\s*=\s*meta;/);
  if (!varMatch) continue;
  const alias = varMatch[1];
  // Replace `var XXX_default = meta;` with `export default meta;`
  code = code.replace(
    new RegExp(`var\\s+${alias}\\s*=\\s*meta;`),
    'export default meta;'
  );
  // Remove alias from the export block
  code = code.replace(
    new RegExp(`\\b${alias}\\s+as\\s+default`),
    ''
  );
  // Clean up trailing/leading commas in export block
  code = code.replace(/export\s*\{([^}]*)\}/, (full, inner) => {
    const cleaned = inner
      .split(',')
      .map((s: string) => s.trim())
      .filter(Boolean)
      .join(',\n  ');
    return cleaned ? `export {\n  ${cleaned}\n}` : '';
  });
  writeFileSync(sf, code, 'utf-8');
  fixedCount++;
}
console.log(`  Fixed ${fixedCount} story files.`);

// ── Copy non-TS assets ──
function copyDirRecursive(src: string, dest: string) {
  if (!existsSync(src)) return;
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

const ASSET_DIRS = ['contracts', 'config', 'icons', 'schemas', 'figma-plugin'];
for (const dir of ASSET_DIRS) {
  console.log(`Copying ${dir}/...`);
  copyDirRecursive(join(CORE_ROOT, dir), join(DIST, dir));
}

console.log('Copying root assets...');
const ROOT_FILES = ['ai-ds-spec.json', 'component-structures.json', 'postcss.config.cjs'];
for (const f of ROOT_FILES) {
  const src = join(CORE_ROOT, f);
  if (existsSync(src)) copyFileSync(src, join(DIST, f));
}

// ── Verify key files exist ──
const CHECK_FILES = [
  'components/index.js',
  'components/primitives/Button/index.js',
  'components/icons/index.js',
  'hooks/index.js',
  'config/css-variables/tokens.css',
  'contracts/components/Button.contract.json',
];

let ok = true;
for (const f of CHECK_FILES) {
  if (!existsSync(join(DIST, f))) {
    console.error(`  MISSING: dist/${f}`);
    ok = false;
  }
}

if (ok) {
  console.log(`\nBuild successful. dist/ is ready for npm pack.`);
} else {
  console.error('\nBuild completed with missing files!');
  process.exit(1);
}
