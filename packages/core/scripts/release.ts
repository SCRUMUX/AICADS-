/**
 * release.ts
 * Bumps @ai-ds/core version and generates a CHANGELOG entry.
 *
 * Detects change scope automatically:
 *   - tokens changes    → minor bump (new design tokens)
 *   - contract changes  → minor bump (new/changed components)
 *   - component changes → patch bump (implementation fixes)
 *   - spec changes      → minor bump
 *
 * Usage:
 *   npx tsx scripts/release.ts              # auto-detect bump type
 *   npx tsx scripts/release.ts patch        # force patch
 *   npx tsx scripts/release.ts minor        # force minor
 *   npx tsx scripts/release.ts major        # force major
 *
 * Output:
 *   - Updates version in package.json
 *   - Appends entry to CHANGELOG.md
 *   - Writes .release-hashes.json for next diff
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PKG_PATH = join(ROOT, 'package.json');
const CHANGELOG_PATH = join(ROOT, 'CHANGELOG.md');
const HASHES_PATH = join(ROOT, '.release-hashes.json');

interface Hashes {
  spec: string;
  tokens: string;
  contracts: string;
  components: string;
  version: string;
}

function hashFile(path: string): string {
  if (!existsSync(path)) return '';
  return createHash('sha256').update(readFileSync(path)).digest('hex').slice(0, 12);
}

function hashDir(dir: string, exts: string[]): string {
  if (!existsSync(dir)) return '';
  const h = createHash('sha256');
  function walk(d: string) {
    for (const entry of readdirSync(d).sort()) {
      const full = join(d, entry);
      if (statSync(full).isDirectory()) {
        if (entry === 'node_modules' || entry === 'dist') continue;
        walk(full);
      } else if (exts.some(e => full.endsWith(e))) {
        h.update(readFileSync(full));
      }
    }
  }
  walk(dir);
  return h.digest('hex').slice(0, 12);
}

function computeHashes(version: string): Hashes {
  return {
    spec: hashFile(join(ROOT, 'ai-ds-spec.json')),
    tokens: hashFile(join(ROOT, 'config', 'css-variables', 'tokens.css')),
    contracts: hashDir(join(ROOT, 'contracts', 'components'), ['.contract.json']),
    components: hashDir(join(ROOT, 'components', 'primitives'), ['.tsx', '.ts']),
    version,
  };
}

function bumpVersion(current: string, type: 'major' | 'minor' | 'patch'): string {
  const [maj, min, pat] = current.split('.').map(Number);
  switch (type) {
    case 'major': return `${maj + 1}.0.0`;
    case 'minor': return `${maj}.${min + 1}.0`;
    case 'patch': return `${maj}.${min}.${pat + 1}`;
  }
}

function detectBumpType(prev: Hashes, curr: Hashes): 'major' | 'minor' | 'patch' {
  if (prev.spec !== curr.spec) return 'minor';
  if (prev.tokens !== curr.tokens) return 'minor';
  if (prev.contracts !== curr.contracts) return 'minor';
  if (prev.components !== curr.components) return 'patch';
  return 'patch';
}

function detectChanges(prev: Hashes, curr: Hashes): string[] {
  const changes: string[] = [];
  if (prev.spec !== curr.spec) changes.push('Spec (ai-ds-spec.json) updated');
  if (prev.tokens !== curr.tokens) changes.push('Design tokens updated');
  if (prev.contracts !== curr.contracts) changes.push('Component contracts updated');
  if (prev.components !== curr.components) changes.push('Component implementations updated');
  return changes;
}

function formatDate(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function main() {
  const forceType = process.argv[2] as 'major' | 'minor' | 'patch' | undefined;
  if (forceType && !['major', 'minor', 'patch'].includes(forceType)) {
    console.error('Usage: npx tsx scripts/release.ts [major|minor|patch]');
    process.exit(1);
  }

  const pkg = JSON.parse(readFileSync(PKG_PATH, 'utf-8'));
  const currentVersion = pkg.version;

  const currHashes = computeHashes(currentVersion);

  let prevHashes: Hashes | null = null;
  if (existsSync(HASHES_PATH)) {
    try {
      prevHashes = JSON.parse(readFileSync(HASHES_PATH, 'utf-8'));
    } catch { /* first run */ }
  }

  const changes = prevHashes ? detectChanges(prevHashes, currHashes) : ['Initial release'];
  const bumpType = forceType || (prevHashes ? detectBumpType(prevHashes, currHashes) : 'minor');
  const newVersion = bumpVersion(currentVersion, bumpType);

  if (changes.length === 0 && !forceType) {
    console.log(`No changes detected since v${currentVersion}. Use "npx tsx scripts/release.ts patch" to force.`);
    process.exit(0);
  }

  // Update package.json
  pkg.version = newVersion;
  writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');

  // Generate changelog entry
  const date = formatDate();
  const entry = [
    `## [${newVersion}] — ${date}`,
    '',
    ...changes.map(c => `- ${c}`),
    '',
  ].join('\n');

  let changelog = '';
  if (existsSync(CHANGELOG_PATH)) {
    changelog = readFileSync(CHANGELOG_PATH, 'utf-8');
  }

  if (!changelog.startsWith('# Changelog')) {
    changelog = `# Changelog\n\nAll notable changes to @ai-ds/core are documented here.\nFormat follows [Semantic Versioning](https://semver.org/).\n\n${changelog}`;
  }

  // Insert new entry after header block (before first ## version entry)
  const firstVersionIdx = changelog.indexOf('\n## ');
  if (firstVersionIdx !== -1) {
    changelog = changelog.slice(0, firstVersionIdx) + '\n' + entry + '\n' + changelog.slice(firstVersionIdx + 1);
  } else {
    changelog = changelog.trimEnd() + '\n\n' + entry;
  }

  writeFileSync(CHANGELOG_PATH, changelog + '\n', 'utf-8');

  // Save hashes for next release
  const newHashes = computeHashes(newVersion);
  writeFileSync(HASHES_PATH, JSON.stringify(newHashes, null, 2) + '\n', 'utf-8');

  console.log(`\n  Release: v${currentVersion} → v${newVersion} (${bumpType})`);
  console.log(`  Changes:`);
  for (const c of changes) console.log(`    • ${c}`);
  console.log(`\n  Updated: package.json, CHANGELOG.md, .release-hashes.json`);
  console.log('');
}

main();
