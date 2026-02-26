/**
 * validate-pipeline.ts
 * Cross-validates the entire pipeline output:
 * 1. tokens.css has all CSS variables referenced by contracts
 * 2. Every spec style key has a Tailwind mapping
 * 3. Component coverage: spec vs structures vs generated files
 * 4. responsiveProps tokens exist in tokens.css
 * 5. Z-index tokens completeness
 * 6. Template file existence for "template" strategy contracts
 * 7. Barrel export resolution (components/index.ts, hooks/index.ts)
 *
 * Run: npx tsx scripts/validate-pipeline.ts
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TOKENS_PATH = join(ROOT, 'config', 'css-variables', 'tokens.css');
const CONTRACTS_DIR = join(ROOT, 'contracts', 'components');
const COMPONENTS_DIR = join(ROOT, 'components', 'primitives');
const SPEC_PATH = join(ROOT, 'ai-ds-spec.json');
const STRUCTURES_PATH = join(ROOT, 'component-structures.json');
const TEMPLATES_DIR = join(ROOT, 'scripts', 'templates');
const HOOKS_DIR = join(ROOT, 'hooks');

let errors = 0;
let warnings = 0;

function error(msg: string) { console.error(`  ❌ ${msg}`); errors++; }
function warn(msg: string) { console.warn(`  ⚠️  ${msg}`); warnings++; }
function ok(msg: string) { console.log(`  ✅ ${msg}`); }

// Extract all CSS variable names from tokens.css
function extractCssVars(css: string): Set<string> {
  const vars = new Set<string>();
  const re = /--([a-z0-9_-]+)\s*:/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    vars.add(`--${m[1]}`);
  }
  return vars;
}

// Extract var(--xxx) references from contract tailwindClasses
function extractVarReferences(classes: string[]): string[] {
  const refs: string[] = [];
  for (const cls of classes) {
    const matches = cls.matchAll(/var\((--[a-z0-9_-]+)/g);
    for (const m of matches) refs.push(m[1]);
  }
  return refs;
}

function main() {
  console.log('\n=== Pipeline Validation ===\n');

  // ── 1. Load tokens.css ──
  console.log('1. Checking tokens.css completeness...');
  if (!existsSync(TOKENS_PATH)) {
    error('tokens.css not found! Run: npx tsx scripts/spec-to-tokens.ts');
    return;
  }
  const tokensCss = readFileSync(TOKENS_PATH, 'utf-8');
  const cssVars = extractCssVars(tokensCss);
  ok(`tokens.css has ${cssVars.size} CSS variables`);

  // ── 2. Load contracts and check variable references ──
  console.log('\n2. Checking contract → tokens.css references...');
  const contractFiles = readdirSync(CONTRACTS_DIR, { withFileTypes: true })
    .filter(f => f.isFile() && f.name.endsWith('.contract.json'))
    .map(f => f.name);

  let totalRefs = 0;
  let missingRefs = 0;
  const missingVars = new Set<string>();

  for (const file of contractFiles) {
    const contract = JSON.parse(readFileSync(join(CONTRACTS_DIR, file), 'utf-8'));
    const allClasses: string[] = [];

    for (const rule of contract.variantRules || []) {
      allClasses.push(...(rule.tailwindClasses || []));
    }

    const refs = extractVarReferences(allClasses);
    totalRefs += refs.length;

    for (const ref of refs) {
      if (!cssVars.has(ref)) {
        missingVars.add(ref);
        missingRefs++;
      }
    }

    // Check responsiveProps (skip textStyle entries - they map to Tailwind classes, not CSS vars)
    const rp = contract.responsiveProps || {};
    const textStyleKeys = new Set(['textStyle', 'titleStyle', 'subtitleStyle', 'descriptionStyle', 'contentTextStyle', 'paragraphStyle']);
    for (const [prop, sizes] of Object.entries(rp)) {
      if (textStyleKeys.has(prop)) continue;
      for (const [size, token] of Object.entries(sizes as Record<string, string>)) {
        const cssVar = `--${(token as string).replace(/_/g, '-')}`;
        if (!cssVars.has(cssVar)) {
          missingVars.add(cssVar);
          missingRefs++;
        }
      }
    }
  }

  if (missingVars.size > 0) {
    warn(`${missingVars.size} CSS variable(s) referenced in contracts but missing from tokens.css:`);
    for (const v of [...missingVars].sort()) warn(`  ${v}`);
  } else {
    ok(`All ${totalRefs} CSS variable references in contracts exist in tokens.css`);
  }

  // ── 3. Check style key coverage ──
  console.log('\n3. Checking spec style key → Tailwind mapping coverage...');
  const spec = JSON.parse(readFileSync(SPEC_PATH, 'utf-8'));
  const allStyleKeys = new Set<string>();
  for (const comp of spec.components || []) {
    for (const rule of comp.variantRules || []) {
      for (const key of Object.keys(rule.style || {})) {
        allStyleKeys.add(key);
      }
    }
  }

  // Check which style keys produce at least one tailwind class
  const keysTested = new Set<string>();
  for (const file of contractFiles) {
    const contract = JSON.parse(readFileSync(join(CONTRACTS_DIR, file), 'utf-8'));
    for (const rule of contract.variantRules || []) {
      if (rule.tailwindClasses && rule.tailwindClasses.length > 0) {
        for (const key of Object.keys(rule.style || {})) {
          keysTested.add(key);
        }
      }
    }
  }

  const unmappedKeys = [...allStyleKeys].filter(k => !keysTested.has(k));
  if (unmappedKeys.length > 0) {
    warn(`${unmappedKeys.length} style key(s) in spec produce no Tailwind classes:`);
    for (const k of unmappedKeys.sort()) warn(`  ${k}`);
  } else {
    ok(`All ${allStyleKeys.size} style keys in spec have Tailwind mappings`);
  }

  // ── 4. Component coverage ──
  console.log('\n4. Checking component coverage...');
  const specComponents = new Set<string>((spec.components || []).map((c: any) => c.name));
  const structures = JSON.parse(readFileSync(STRUCTURES_PATH, 'utf-8'));
  const structureComponents = new Set<string>(Object.keys(structures.components || {}));
  const contractComponents = new Set<string>(
    contractFiles.map(f => {
      const c = JSON.parse(readFileSync(join(CONTRACTS_DIR, f), 'utf-8'));
      return c.name;
    })
  );

  const componentDirNames = readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  // Spec → Structures
  const missingInStructures = [...specComponents].filter(c => !structureComponents.has(c));
  if (missingInStructures.length > 0) {
    warn(`${missingInStructures.length} component(s) in spec but NOT in component-structures.json:`);
    for (const c of missingInStructures) warn(`  ${c}`);
  } else {
    ok(`All ${specComponents.size} spec components have structures`);
  }

  // Spec → Contracts
  const missingContracts = [...specComponents].filter(c => !contractComponents.has(c));
  if (missingContracts.length > 0) {
    warn(`${missingContracts.length} component(s) in spec but NOT generated as contracts:`);
    for (const c of missingContracts) warn(`  ${c}`);
  } else {
    ok(`All ${specComponents.size} spec components have contracts`);
  }

  // Contracts → Generated files
  ok(`${contractComponents.size} contracts, ${componentDirNames.length} generated component dirs`);

  // ── 5. Z-index tokens completeness ──
  console.log('\n5. Checking z-index tokens...');
  const requiredZIndex = ['--z-header', '--z-popover', '--z-modal', '--z-tooltip', '--z-toast'];
  const missingZ: string[] = [];
  for (const z of requiredZIndex) {
    if (!cssVars.has(z)) missingZ.push(z);
  }
  if (missingZ.length > 0) {
    error(`${missingZ.length} required z-index token(s) missing from tokens.css:`);
    for (const z of missingZ) error(`  ${z}`);
  } else {
    ok(`All ${requiredZIndex.length} z-index tokens present (header, popover, modal, tooltip, toast)`);
  }

  // ── 6. Template file existence for "template" strategy ──
  console.log('\n6. Checking template files for "template" strategy contracts...');
  let templateOk = 0;
  let templateMissing = 0;
  for (const file of contractFiles) {
    const contract = JSON.parse(readFileSync(join(CONTRACTS_DIR, file), 'utf-8'));
    if (contract.generatorStrategy === 'template' && contract.template) {
      const templatePath = join(TEMPLATES_DIR, `${contract.template}.template.tsx`);
      if (!existsSync(templatePath)) {
        error(`Template missing for ${contract.name}: ${contract.template}.template.tsx`);
        templateMissing++;
      } else {
        templateOk++;
      }
    }
  }
  if (templateMissing === 0) {
    ok(`All ${templateOk} "template" strategy contracts have matching .template.tsx files`);
  }

  // ── 7. Barrel export resolution ──
  console.log('\n7. Checking barrel exports...');
  const barrels: Array<{ file: string; dir: string; ext: string[] }> = [
    { file: join(ROOT, 'hooks', 'index.ts'), dir: HOOKS_DIR, ext: ['.ts'] },
    { file: join(ROOT, 'components', 'index.ts'), dir: join(ROOT, 'components'), ext: ['.ts', '.tsx'] },
  ];

  for (const barrel of barrels) {
    if (!existsSync(barrel.file)) {
      warn(`Barrel file not found: ${barrel.file}`);
      continue;
    }
    const content = readFileSync(barrel.file, 'utf-8');
    const exportRe = /from\s+['"]\.\/([^'"]+)['"]/g;
    let match;
    let resolved = 0;
    let unresolved = 0;
    while ((match = exportRe.exec(content)) !== null) {
      const ref = match[1];
      const candidates = [
        join(barrel.dir, ref + '.ts'),
        join(barrel.dir, ref + '.tsx'),
        join(barrel.dir, ref, 'index.ts'),
        join(barrel.dir, ref, 'index.tsx'),
      ];
      if (candidates.some(c => existsSync(c))) {
        resolved++;
      } else {
        error(`Barrel ${barrel.file}: unresolved export "${ref}"`);
        unresolved++;
      }
    }
    if (unresolved === 0 && resolved > 0) {
      const shortPath = barrel.file.replace(ROOT, '').replace(/\\/g, '/').replace(/^\//, '');
      ok(`${shortPath}: all ${resolved} exports resolve`);
    }
  }

  // ── Summary ──
  console.log('\n=== Summary ===');
  console.log(`  Errors: ${errors}`);
  console.log(`  Warnings: ${warnings}`);
  if (errors === 0 && warnings === 0) {
    console.log('  🎉 Pipeline is fully valid!');
  } else if (errors === 0) {
    console.log('  ⚠️  Pipeline is mostly valid, review warnings above.');
  } else {
    console.log('  ❌ Pipeline has errors that need fixing.');
  }
  console.log('');

  process.exit(errors > 0 ? 1 : 0);
}

main();
