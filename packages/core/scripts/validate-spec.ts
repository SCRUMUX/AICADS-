/**
 * validate-spec.ts
 *
 * Validates ai-ds-spec.json (or ai-ds-styles.json + components) before Figma generation.
 * Checks:
 *   1. All primitive hex values are valid #RRGGBB
 *   2. All semantic color tokens reference existing primitives
 *   3. iconRoles format (warns on nodeId usage)
 *   4. Space/radius semantic→primitive reference chains
 *   5. Component variantRules reference existing color tokens
 *   6. Typography references are valid
 *
 * Usage:
 *   npx tsx scripts/validate-spec.ts                    — validate full ai-ds-spec.json
 *   npx tsx scripts/validate-spec.ts --styles-only      — validate only ai-ds-styles.json
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const stylesOnly = process.argv.includes('--styles-only');

const HEX_RE = /^#[0-9A-Fa-f]{6}$/;

let styles: Record<string, any>;
let components: any[] = [];

if (stylesOnly) {
  const p = path.join(ROOT, 'ai-ds-styles.json');
  if (!fs.existsSync(p)) { console.error('ai-ds-styles.json not found'); process.exit(1); }
  styles = JSON.parse(fs.readFileSync(p, 'utf-8'));
} else {
  const specPath = path.join(ROOT, 'ai-ds-spec.json');
  if (!fs.existsSync(specPath)) { console.error('ai-ds-spec.json not found'); process.exit(1); }
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf-8'));
  const { components: c, blocks: b, ...rest } = spec;
  styles = rest;
  components = c || [];
}

const errors: string[] = [];
const warnings: string[] = [];
let checksRun = 0;

function check(label: string, fn: () => void) {
  checksRun++;
  process.stdout.write(`  Checking ${label}...`);
  const errBefore = errors.length;
  const warnBefore = warnings.length;
  fn();
  const newErr = errors.length - errBefore;
  const newWarn = warnings.length - warnBefore;
  if (newErr) console.log(` ${newErr} error(s)`);
  else if (newWarn) console.log(` ${newWarn} warning(s)`);
  else console.log(' OK');
}

const tokens = styles.tokens || {};
const color = tokens.color || {};
const primitives: Record<string, string> = color.primitives || {};
const primitiveNames = new Set(Object.keys(primitives));

/* ---------- 1. Primitive hex values ---------- */
check('primitive hex values', () => {
  for (const [name, value] of Object.entries(primitives)) {
    if (typeof value !== 'string') {
      errors.push(`primitives.${name}: expected hex string, got ${typeof value} (${JSON.stringify(value)})`);
    } else if (!HEX_RE.test(value)) {
      errors.push(`primitives.${name}: invalid hex "${value}" — expected #RRGGBB (6 hex digits)`);
    }
  }
});

/* ---------- 2. Semantic → primitive references ---------- */
check('semantic color references', () => {
  for (const groupName of Object.keys(color)) {
    if (groupName === 'primitives') continue;
    const group = color[groupName];
    if (!group || typeof group !== 'object') continue;
    for (const [tokenName, entry] of Object.entries(group)) {
      if (!entry || typeof entry !== 'object') {
        warnings.push(`${groupName}.${tokenName}: expected {light, dark} object`);
        continue;
      }
      const e = entry as Record<string, string>;
      for (const mode of ['light', 'dark']) {
        const ref = e[mode];
        if (!ref) {
          warnings.push(`${groupName}.${tokenName}.${mode}: missing mode value`);
          continue;
        }
        if (ref.startsWith('#')) {
          if (!HEX_RE.test(ref)) {
            errors.push(`${groupName}.${tokenName}.${mode}: inline hex "${ref}" is invalid`);
          }
        } else if (!primitiveNames.has(ref)) {
          errors.push(`${groupName}.${tokenName}.${mode}: references primitive "${ref}" — NOT FOUND in primitives`);
        }
      }
    }
  }
});

/* ---------- 3. iconRoles ---------- */
check('iconRoles format', () => {
  const iconRoles = styles.iconRoles;
  if (!iconRoles) { warnings.push('iconRoles: section missing'); return; }
  const requiredRoles = ['brand', 'check', 'close-x', 'accordion-chevron', 'chevron-down', 'search'];
  for (const req of requiredRoles) {
    if (!(req in iconRoles)) warnings.push(`iconRoles: recommended role "${req}" missing`);
  }
  for (const [role, value] of Object.entries(iconRoles)) {
    if (Array.isArray(value)) {
      if (value.length === 0) warnings.push(`iconRoles.${role}: empty array — no icons will match`);
    } else if (value && typeof value === 'object') {
      const v = value as Record<string, unknown>;
      if (v.nodeId) {
        warnings.push(`iconRoles.${role}: uses nodeId "${v.nodeId}" — only works in the original Figma file! Use ["name1", "name2"] for portability.`);
      }
    } else {
      errors.push(`iconRoles.${role}: invalid format (expected string[] or {include/exclude})`);
    }
  }
});

/* ---------- 4. Space / radius chains ---------- */
check('space token references', () => {
  if (!tokens.space) return;
  const spPrim = tokens.space.primitives || {};
  const spSem = tokens.space.semantic || {};
  const spAll = new Set([...Object.keys(spPrim), ...Object.keys(spSem)]);
  for (const [name, ref] of Object.entries(spSem)) {
    if (typeof ref === 'string' && !spAll.has(ref)) {
      errors.push(`space.semantic.${name}: → "${ref}" — NOT FOUND`);
    }
  }
  // detect circular references
  for (const name of Object.keys(spSem)) {
    const visited = new Set<string>();
    let cur = name;
    while (typeof spSem[cur] === 'string') {
      if (visited.has(cur)) { errors.push(`space.semantic.${name}: circular reference detected`); break; }
      visited.add(cur);
      cur = spSem[cur] as string;
    }
  }
});

check('radius token references', () => {
  if (!tokens.radius) return;
  const rPrim = tokens.radius.primitives || {};
  const rSem = tokens.radius.semantic || {};
  const rAll = new Set([...Object.keys(rPrim), ...Object.keys(rSem)]);
  for (const [name, ref] of Object.entries(rSem)) {
    if (typeof ref === 'string' && !rAll.has(ref)) {
      errors.push(`radius.semantic.${name}: → "${ref}" — NOT FOUND`);
    }
  }
});

/* ---------- 5. Typography ---------- */
check('typography tokens', () => {
  if (!tokens.typography) { warnings.push('tokens.typography: missing'); return; }
  const typo = tokens.typography;
  const textStyles = typo.textStyles || typo.styles || {};
  const styleCount = Object.keys(textStyles).length;
  if (styleCount === 0) {
    warnings.push('typography: no text styles defined');
  } else {
    for (const [name, def] of Object.entries(textStyles)) {
      const d = def as Record<string, unknown>;
      if (!d.fontSize) warnings.push(`typography.textStyles.${name}: missing fontSize`);
      if (!d.fontFamily) warnings.push(`typography.textStyles.${name}: missing fontFamily`);
    }
  }
});

/* ---------- 6. Effect tokens ---------- */
check('effect tokens', () => {
  if (!tokens.effect) { warnings.push('tokens.effect: missing'); return; }
  const eff = tokens.effect;
  if (eff.opacity_disabled == null) warnings.push('effect.opacity_disabled: missing');
  const hasShadow = Object.keys(eff).some(k => k.startsWith('effect_elevation'));
  if (!hasShadow) warnings.push('effect: no elevation/shadow effects defined');
  const hasFocus = Object.keys(eff).some(k => k.startsWith('effect_focus'));
  if (!hasFocus) warnings.push('effect: no focus ring effects defined');
});

/* ---------- 7. Component variant rules → color tokens ---------- */
if (components.length) {
  check('component color token references', () => {
    const allColorTokens = new Set<string>();
    for (const groupName of Object.keys(color)) {
      if (groupName === 'primitives') {
        for (const name of Object.keys(color.primitives)) allColorTokens.add(name);
      } else {
        const group = color[groupName];
        if (group && typeof group === 'object') {
          for (const name of Object.keys(group)) allColorTokens.add(name);
        }
      }
    }
    for (const comp of components) {
      if (!comp?.name || !Array.isArray(comp.variantRules)) continue;
      for (const rule of comp.variantRules) {
        const st = rule?.style;
        if (!st) continue;
        const colorKeys = ['bg', 'background', 'textColor', 'iconColor', 'borderColor',
          'underlineColor', 'trackBg', 'thumbBg', 'thumbBorderColor', 'activeBg',
          'itemTextColor', 'itemIconColor', 'itemBg'];
        for (const key of colorKeys) {
          const val = st[key];
          if (val && typeof val === 'string' && val !== 'transparent' && val !== 'none') {
            if (!allColorTokens.has(val)) {
              warnings.push(`${comp.name} style.${key}: "${val}" — not found in color tokens`);
            }
          }
        }
      }
    }
  });
}

/* ---------- Summary ---------- */
console.log(`\n${'─'.repeat(50)}`);
console.log(`  ${checksRun} checks run`);
console.log(`  ${primitiveNames.size} color primitives`);

const allSemanticCount = Object.keys(color).filter(k => k !== 'primitives')
  .reduce((sum, g) => sum + Object.keys(color[g] || {}).length, 0);
console.log(`  ${allSemanticCount} semantic color tokens`);
console.log(`  ${components.length} components`);

if (errors.length) {
  console.log(`\n  ✗ ${errors.length} ERROR(S) — must fix before Figma generation:`);
  for (const e of errors) console.log(`    ERR:  ${e}`);
}
if (warnings.length) {
  console.log(`\n  ⚠ ${warnings.length} WARNING(S):`);
  for (const w of warnings) console.log(`    WARN: ${w}`);
}
if (!errors.length && !warnings.length) {
  console.log(`\n  ✓ All checks passed — spec is valid for Figma generation.`);
}
console.log();

process.exit(errors.length ? 1 : 0);
