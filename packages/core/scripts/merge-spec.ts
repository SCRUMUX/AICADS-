/**
 * merge-spec.ts
 *
 * Собирает ai-ds-spec.json из трёх частей:
 *   ai-ds-styles.json     — токены, iconRoles, componentsConfig, avatarPhoto
 *   ai-ds-components.json — массив компонентов
 *   ai-ds-blocks.json     — массив блоков
 *
 * Перед записью запускает валидацию стилей.
 * Использование:
 *   npx tsx scripts/merge-spec.ts            — собрать с валидацией
 *   npx tsx scripts/merge-spec.ts --force    — собрать даже при ошибках валидации
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const STYLES_PATH = path.join(ROOT, 'ai-ds-styles.json');
const COMPONENTS_PATH = path.join(ROOT, 'ai-ds-components.json');
const BLOCKS_PATH = path.join(ROOT, 'ai-ds-blocks.json');
const OUT_PATH = path.join(ROOT, 'ai-ds-spec.json');

const force = process.argv.includes('--force');

/* ---------- helpers ---------- */

function readJson(filePath: string): unknown {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (e: any) {
    console.error(`JSON parse error in ${path.basename(filePath)}: ${e.message}`);
    process.exit(1);
  }
}

const HEX_RE = /^#[0-9A-Fa-f]{6}$/;

interface ValidationResult {
  errors: string[];
  warnings: string[];
}

/* ---------- validation ---------- */

function validateStyles(styles: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const tokens = styles.tokens;
  if (!tokens || typeof tokens !== 'object') {
    errors.push('tokens: section missing or not an object');
    return { errors, warnings };
  }

  const color = tokens.color;
  if (!color || typeof color !== 'object') {
    errors.push('tokens.color: section missing');
    return { errors, warnings };
  }

  const primitives: Record<string, string> = color.primitives || {};
  const primitiveNames = new Set(Object.keys(primitives));

  // 1. Validate primitive hex values
  for (const [name, value] of Object.entries(primitives)) {
    if (typeof value !== 'string') {
      errors.push(`primitives.${name}: expected hex string, got ${typeof value}`);
    } else if (!HEX_RE.test(value)) {
      errors.push(`primitives.${name}: invalid hex "${value}" — expected #RRGGBB`);
    }
  }

  // 2. Validate semantic tokens → primitives references
  const semanticGroups = ['backgroundSurface', 'text', 'tooltip', 'brandLinkFocus', 'borderDivide', 'semanticStates', 'icon'];
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
          warnings.push(`${groupName}.${tokenName}.${mode}: missing`);
          continue;
        }
        if (ref.startsWith('#')) {
          if (!HEX_RE.test(ref)) {
            errors.push(`${groupName}.${tokenName}.${mode}: invalid hex "${ref}"`);
          }
        } else if (!primitiveNames.has(ref)) {
          errors.push(`${groupName}.${tokenName}.${mode}: references primitive "${ref}" which does not exist`);
        }
      }
    }
  }

  // 3. Validate iconRoles format
  const iconRoles = styles.iconRoles;
  if (iconRoles && typeof iconRoles === 'object') {
    for (const [role, value] of Object.entries(iconRoles)) {
      if (Array.isArray(value)) {
        if (value.length === 0) warnings.push(`iconRoles.${role}: empty array`);
        for (const item of value) {
          if (typeof item !== 'string') {
            errors.push(`iconRoles.${role}: array items must be strings, got ${typeof item}`);
          }
        }
      } else if (value && typeof value === 'object') {
        const v = value as Record<string, unknown>;
        if (v.nodeId) {
          warnings.push(`iconRoles.${role}: uses nodeId "${v.nodeId}" — will only work in the original Figma file. Consider using name-based matching ["name1", "name2"] instead.`);
        } else if (!v.include && !v.exclude) {
          errors.push(`iconRoles.${role}: object must have "include"/"exclude" or be an array`);
        }
      } else {
        errors.push(`iconRoles.${role}: expected array or {include/exclude} object`);
      }
    }
  }

  // 4. Validate space tokens (semantic can reference both primitives and other semantics)
  if (tokens.space) {
    const spPrim = tokens.space.primitives || {};
    const spSem = tokens.space.semantic || {};
    const spAll = new Set([...Object.keys(spPrim), ...Object.keys(spSem)]);
    for (const [name, ref] of Object.entries(spSem)) {
      if (typeof ref === 'string' && !spAll.has(ref)) {
        errors.push(`space.semantic.${name}: references "${ref}" which is not in space.primitives or space.semantic`);
      }
    }
  }

  // 5. Validate radius tokens (semantic can reference both primitives and other semantics)
  if (tokens.radius) {
    const rPrim = tokens.radius.primitives || {};
    const rSem = tokens.radius.semantic || {};
    const rAll = new Set([...Object.keys(rPrim), ...Object.keys(rSem)]);
    for (const [name, ref] of Object.entries(rSem)) {
      if (typeof ref === 'string' && !rAll.has(ref)) {
        errors.push(`radius.semantic.${name}: references "${ref}" which is not in radius.primitives or radius.semantic`);
      }
    }
  }

  return { errors, warnings };
}

function validateComponentTokenRefs(
  components: any[],
  styles: Record<string, any>,
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const allColorTokens = new Set<string>();
  const color = styles.tokens?.color || {};
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
      const style = rule?.style;
      if (!style) continue;
      const colorKeys = ['bg', 'background', 'textColor', 'iconColor', 'borderColor', 'underlineColor',
        'trackBg', 'thumbBg', 'thumbBorderColor', 'activeBg', 'itemTextColor', 'itemIconColor', 'itemBg'];
      for (const key of colorKeys) {
        const val = style[key];
        if (val && typeof val === 'string' && val !== 'transparent' && val !== 'none') {
          if (!allColorTokens.has(val)) {
            warnings.push(`${comp.name} variantRule style.${key}: references color token "${val}" not found in styles`);
          }
        }
      }
    }
  }

  return { errors, warnings };
}

/* ---------- main ---------- */

const styles = readJson(STYLES_PATH) as Record<string, any>;
const components = readJson(COMPONENTS_PATH) as any[];
const blocks = readJson(BLOCKS_PATH) as any[];

if (!Array.isArray(components)) {
  console.error('ai-ds-components.json must be a JSON array');
  process.exit(1);
}
if (!Array.isArray(blocks)) {
  console.error('ai-ds-blocks.json must be a JSON array');
  process.exit(1);
}

console.log('Validating styles...\n');

const styleResult = validateStyles(styles);
const compResult = validateComponentTokenRefs(components, styles);

const allErrors = [...styleResult.errors, ...compResult.errors];
const allWarnings = [...styleResult.warnings, ...compResult.warnings];

if (allWarnings.length) {
  console.log(`⚠  ${allWarnings.length} warning(s):`);
  for (const w of allWarnings) console.log(`   WARN: ${w}`);
  console.log();
}

if (allErrors.length) {
  console.log(`✗  ${allErrors.length} error(s):`);
  for (const e of allErrors) console.log(`   ERR:  ${e}`);
  console.log();
  if (!force) {
    console.log('Fix errors or run with --force to override.');
    process.exit(1);
  }
  console.log('--force flag set, continuing despite errors.\n');
}

if (!allErrors.length && !allWarnings.length) {
  console.log('✓  All validations passed.\n');
}

const merged = {
  ...styles,
  components,
  blocks,
};

fs.writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2) + '\n', 'utf-8');

const lineCount = JSON.stringify(merged, null, 2).split('\n').length;
console.log(`ai-ds-spec.json written — ${lineCount} lines, ${components.length} components, ${blocks.length} blocks.`);
