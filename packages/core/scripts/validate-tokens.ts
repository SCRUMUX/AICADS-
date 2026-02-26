/**
 * validate-tokens.ts
 * Verifies that tokens.css exists and was generated from ai-ds-spec.json.
 *
 * Run: npm run tokens:validate
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SPEC_PATH = join(ROOT, 'ai-ds-spec.json');
const TOKENS_PATH = join(ROOT, 'config', 'css-variables', 'tokens.css');

function main() {
  let ok = true;

  if (!existsSync(SPEC_PATH)) {
    console.error('Error: ai-ds-spec.json not found at', SPEC_PATH);
    ok = false;
  }

  if (!existsSync(TOKENS_PATH)) {
    console.error('Error: tokens.css not found. Run: npm run tokens:build');
    ok = false;
  } else {
    const content = readFileSync(TOKENS_PATH, 'utf-8');
    if (!content.includes('AUTO-GENERATED FROM ai-ds-spec.json')) {
      console.error('Warning: tokens.css may be manually edited. Run: npm run tokens:build to regenerate.');
    }
    if (!content.includes('--color-bg-base')) {
      console.error('Error: tokens.css missing expected color tokens.');
      ok = false;
    }
  }

  if (ok) {
    console.log('Tokens validation passed.');
  } else {
    process.exit(1);
  }
}

main();
