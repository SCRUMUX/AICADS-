import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SPEC_PATH = path.join(ROOT, 'ai-ds-spec.json');

const raw = fs.readFileSync(SPEC_PATH, 'utf-8');
const spec = JSON.parse(raw);

const styles: Record<string, unknown> = {};
const stylesKeys = ['componentsConfig', 'avatarPhoto', 'iconRoles', 'tokens'];
for (const key of stylesKeys) {
  if (key in spec) styles[key] = spec[key];
}

const components: unknown[] = Array.isArray(spec.components) ? spec.components : [];
const blocks: unknown[] = Array.isArray(spec.blocks) ? spec.blocks : [];

fs.writeFileSync(
  path.join(ROOT, 'ai-ds-styles.json'),
  JSON.stringify(styles, null, 2) + '\n',
  'utf-8',
);
console.log(`ai-ds-styles.json  — ${Object.keys(styles).length} top-level keys`);

fs.writeFileSync(
  path.join(ROOT, 'ai-ds-components.json'),
  JSON.stringify(components, null, 2) + '\n',
  'utf-8',
);
console.log(`ai-ds-components.json — ${components.length} components`);

fs.writeFileSync(
  path.join(ROOT, 'ai-ds-blocks.json'),
  JSON.stringify(blocks, null, 2) + '\n',
  'utf-8',
);
console.log(`ai-ds-blocks.json — ${blocks.length} blocks`);

console.log('\nDone. Edit ai-ds-styles.json for style changes, then run merge-spec to rebuild.');
