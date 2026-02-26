/**
 * spec-to-tokens.ts
 * Reads ai-ds-spec.json and generates tokens.css with ALL token categories.
 *
 * Run: npm run tokens:build (from packages/core/)
 * Source: ../ai-ds-spec.json
 * Output: ../config/css-variables/tokens.css
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SPEC_PATH = join(ROOT, 'ai-ds-spec.json');
const OUTPUT_PATH = join(ROOT, 'config', 'css-variables', 'tokens.css');

interface TextStyle {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
}

interface Spec {
  tokens?: {
    color?: {
      primitives?: Record<string, string>;
      [group: string]: Record<string, unknown> | undefined;
    };
    space?: {
      primitives?: Record<string, number>;
      semantic?: Record<string, string>;
    };
    radius?: {
      primitives?: Record<string, number>;
      semantic?: Record<string, string>;
    };
    borderWidth?: Record<string, number>;
    ratio?: Record<string, number>;
    typography?: {
      textStyles?: Record<string, TextStyle>;
    };
    effect?: Record<string, unknown>;
    opacity?: Record<string, number>;
    layout?: Record<string, {
      columns?: number;
      gutterSize?: number;
      offset?: number;
      breakpoint?: { min?: number };
    }>;
    zIndex?: Record<string, number>;
  };
}

function resolveHex(primitives: Record<string, string>, ref: string): string {
  if (ref.startsWith('#')) return ref;
  return primitives[ref] || '#000000';
}

function rgba(hex: string, opacityPercent: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacityPercent / 100})`;
}

function tokenToCssName(tokenName: string): string {
  return tokenName.replace(/_/g, '-');
}

function main() {
  const spec: Spec = JSON.parse(readFileSync(SPEC_PATH, 'utf-8'));
  const tokens = spec.tokens || {};
  const lines: string[] = [
    '/**',
    ' * DESIGN TOKENS - CSS CUSTOM PROPERTIES',
    ' * AUTO-GENERATED FROM ai-ds-spec.json',
    ' * DO NOT EDIT MANUALLY. Run: npm run tokens:build',
    ' */',
    '',
    ':root {',
  ];

  // ── Color primitives ──
  const colorPrim = tokens.color?.primitives || {};
  lines.push('  /* Color primitives */');
  for (const [k, v] of Object.entries(colorPrim).sort(([a], [b]) => a.localeCompare(b))) {
    if (typeof v === 'string' && v.startsWith('#')) {
      lines.push(`  --${tokenToCssName(k)}: ${v};`);
    }
  }
  lines.push('');

  // ── Space primitives ──
  const spacePrim = tokens.space?.primitives || {};
  lines.push('  /* Space primitives */');
  for (const [k, v] of Object.entries(spacePrim)) {
    if (typeof v === 'number') lines.push(`  --${tokenToCssName(k)}: ${v}px;`);
  }
  lines.push('');

  // ── Space semantic ──
  const spaceSem = tokens.space?.semantic || {};
  lines.push('  /* Space semantic */');
  for (const [k, v] of Object.entries(spaceSem)) {
    if (typeof v === 'string') lines.push(`  --${tokenToCssName(k)}: var(--${tokenToCssName(v)});`);
  }
  lines.push('');

  // ── Radius primitives ──
  const radiusPrim = tokens.radius?.primitives || {};
  lines.push('  /* Radius primitives */');
  for (const [k, v] of Object.entries(radiusPrim)) {
    if (typeof v === 'number') lines.push(`  --${tokenToCssName(k)}: ${v}px;`);
  }
  lines.push('');

  // ── Radius semantic ──
  const radiusSem = tokens.radius?.semantic || {};
  lines.push('  /* Radius semantic */');
  for (const [k, v] of Object.entries(radiusSem)) {
    if (typeof v === 'string') lines.push(`  --${tokenToCssName(k)}: var(--${tokenToCssName(v)});`);
  }
  lines.push('');

  // ── BorderWidth ──
  const borderWidth = tokens.borderWidth || {};
  lines.push('  /* Border width */');
  for (const [k, v] of Object.entries(borderWidth)) {
    if (typeof v === 'number') lines.push(`  --${tokenToCssName(k)}: ${v}px;`);
  }
  lines.push('');

  // ── Ratio tokens ──
  const ratio = tokens.ratio || {};
  if (Object.keys(ratio).length) {
    lines.push('  /* Ratio (aspect ratios) */');
    for (const [k, v] of Object.entries(ratio)) {
      if (typeof v === 'number') lines.push(`  --${tokenToCssName(k)}: ${v};`);
    }
    lines.push('');
  }

  // ── Typography ──
  const typo = tokens.typography?.textStyles || {};
  const fontFamilies = new Set<string>();
  const fontSizes = new Set<number>();
  const lineHeights = new Set<number>();
  const fontWeights = new Set<number>();
  for (const t of Object.values(typo)) {
    if (t.fontFamily) fontFamilies.add(t.fontFamily);
    if (t.fontSize) fontSizes.add(t.fontSize);
    if (t.lineHeight) lineHeights.add(t.lineHeight);
    if (t.fontWeight) fontWeights.add(t.fontWeight);
  }

  // Ensure complete typographic scale referenced by Tailwind config
  for (const guaranteed of [8, 10, 12, 14, 16, 18, 20, 24, 32]) fontSizes.add(guaranteed);
  for (const guaranteed of [12, 16, 20, 24, 28, 32, 40]) lineHeights.add(guaranteed);
  for (const guaranteed of [400, 500, 600]) fontWeights.add(guaranteed);

  lines.push('  /* Typography */');
  const familyArr = Array.from(fontFamilies);
  const baseFam = familyArr[0] || 'Inter';
  lines.push(`  --font-family-base: '${baseFam}', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;`);
  lines.push(`  --font-family-mono: 'Roboto Mono', 'SF Mono', 'Monaco', monospace;`);
  for (const s of Array.from(fontSizes).sort((a, b) => a - b)) {
    lines.push(`  --font-size-${s}: ${s}px;`);
  }
  for (const lh of Array.from(lineHeights).sort((a, b) => a - b)) {
    lines.push(`  --line-height-${lh}: ${lh}px;`);
  }
  for (const fw of Array.from(fontWeights).sort((a, b) => a - b)) {
    const name = fw === 400 ? 'regular' : fw === 500 ? 'medium' : fw === 600 ? 'semibold' : fw === 700 ? 'bold' : String(fw);
    lines.push(`  --font-weight-${name}: ${fw};`);
  }
  lines.push('');

  // ── Layout ──
  const layout = tokens.layout || {};
  lines.push('  /* Layout / Grid */');
  for (const [key, val] of Object.entries(layout)) {
    const prefix = `grid-${key}`;
    if (val.columns) lines.push(`  --${prefix}-columns: ${val.columns};`);
    if (val.gutterSize) lines.push(`  --${prefix}-gutter: ${val.gutterSize}px;`);
    if (val.offset != null) lines.push(`  --${prefix}-offset: ${val.offset}px;`);
    if (val.breakpoint?.min != null) lines.push(`  --${prefix}-breakpoint: ${val.breakpoint.min}px;`);
  }
  lines.push('');

  // ── Z-index scale ──
  const zIndex = tokens.zIndex || {};
  if (Object.keys(zIndex).length) {
    lines.push('  /* Z-index scale */');
    for (const [k, v] of Object.entries(zIndex)) {
      if (typeof v === 'number') lines.push(`  --z-${k}: ${v};`);
    }
    lines.push('');
  }

  // ── Effect tokens (numeric = opacity 0–100 → CSS 0–1) ──
  const effect = tokens.effect || {};
  lines.push('  /* Effect / opacity */');
  for (const [k, v] of Object.entries(effect)) {
    if (typeof v === 'number') {
      const cssName = tokenToCssName(k);
      lines.push(`  --${cssName}: ${v / 100};`);
    }
  }

  // ── Explicit opacity tokens (spec.tokens.opacity if present) ──
  const opacityTokens = (spec as any).tokens?.opacity || {};
  for (const [k, v] of Object.entries(opacityTokens)) {
    if (typeof v === 'number') {
      lines.push(`  --${tokenToCssName(k)}: ${v > 1 ? v / 100 : v};`);
    }
  }
  lines.push('}');
  lines.push('');

  // ── LIGHT THEME ──
  lines.push(':root,');
  lines.push('[data-theme="light"] {');
  const colorGroups = tokens.color || {};
  for (const [groupName, group] of Object.entries(colorGroups)) {
    if (groupName === 'primitives' || typeof group !== 'object') continue;
    for (const [tokenName, entry] of Object.entries(group as Record<string, unknown>)) {
      const e = entry as Record<string, string> | undefined;
      if (!e) continue;
      const ref = e.light || e.hex;
      if (typeof ref === 'string') {
        const hex = ref.startsWith('#') ? ref : resolveHex(colorPrim, ref);
        lines.push(`  --${tokenToCssName(tokenName)}: ${hex};`);
      }
    }
  }

  lines.push('');
  lines.push('  /* Effect tokens */');

  const shadowArr = (arr: Array<{ x?: number; y?: number; blur?: number; spread?: number; color?: string; opacity?: number }>) =>
    arr.map(l => `${l.x ?? 0}px ${l.y ?? 0}px ${l.blur ?? 0}px ${l.spread ?? 0}px ${rgba(l.color || '#000000', l.opacity ?? 100)}`).join(', ');

  for (const [k, v] of Object.entries(effect)) {
    const cssName = tokenToCssName(k);
    if (Array.isArray(v)) {
      if (k.startsWith('effect_elevation_') || k === 'effect_elevation_glow') {
        if (k === 'effect_elevation_glow') {
          const g = (v as Array<{ colorToken?: string; blur?: number; opacity?: number }>)?.[0];
          if (g?.colorToken) {
            lines.push(`  --${cssName}: 0px 0px ${g.blur ?? 12}px 0px color-mix(in srgb, var(--color-brand-primary) ${g.opacity ?? 35}%, transparent);`);
          }
        } else {
          const layers = v as Array<{ x?: number; y?: number; blur?: number; spread?: number; color?: string; opacity?: number }>;
          if (layers.length) lines.push(`  --${cssName}: ${shadowArr(layers)};`);
        }
      } else if (k.startsWith('effect_focus_')) {
        const f = (v as Array<{ colorToken?: string; spread?: number }>)?.[0];
        if (f?.colorToken) {
          const colorVar = f.colorToken.startsWith('color_') ? `var(--${tokenToCssName(f.colorToken)})` : `var(--color-brand-primary)`;
          lines.push(`  --${cssName}: 0px 0px 0px ${f.spread ?? 2}px ${colorVar};`);
        }
      } else if (k.startsWith('effect_scrim_')) {
        const s = (v as Array<{ color?: string; opacity?: number }>)?.[0];
        if (s) lines.push(`  --${cssName}: ${rgba(s.color || '#000000', s.opacity ?? 30)};`);
      }
    } else if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      const obj = v as Record<string, unknown>;
      if (obj.backdropBlur) {
        lines.push(`  --${cssName}: ${obj.backdropBlur}px;`);
      }
    }
  }

  lines.push('');
  lines.push('  --color-surface-hover: var(--color-surface-3);');
  lines.push('  --color-surface-active: var(--color-surface-3);');
  lines.push('}');
  lines.push('');

  // ── DARK THEME ──
  lines.push('[data-theme="dark"] {');
  for (const [groupName, group] of Object.entries(colorGroups)) {
    if (groupName === 'primitives' || typeof group !== 'object') continue;
    for (const [tokenName, entry] of Object.entries(group as Record<string, unknown>)) {
      const e = entry as Record<string, string> | undefined;
      if (!e?.dark) continue;
      const hex = e.dark.startsWith('#') ? e.dark : resolveHex(colorPrim, e.dark);
      lines.push(`  --${tokenToCssName(tokenName)}: ${hex};`);
    }
  }

  lines.push('');
  lines.push('  /* Dark effect tokens */');
  for (const [k, v] of Object.entries(effect)) {
    const cssName = tokenToCssName(k);
    if (Array.isArray(v)) {
      if (k.startsWith('effect_elevation_') && k !== 'effect_elevation_glow') {
        const layers = v as Array<{ x?: number; y?: number; blur?: number; spread?: number; color?: string; opacity?: number }>;
        if (layers.length) {
          const darkLayers = layers.map(l => ({
            ...l,
            opacity: Math.min(100, (l.opacity ?? 25) * 2),
          }));
          lines.push(`  --${cssName}: ${shadowArr(darkLayers)};`);
        }
      } else if (k === 'effect_elevation_glow') {
        const g = (v as Array<{ colorToken?: string; blur?: number; opacity?: number }>)?.[0];
        if (g?.colorToken) {
          lines.push(`  --${cssName}: 0px 0px ${g.blur ?? 12}px 0px color-mix(in srgb, var(--color-brand-primary) ${g.opacity ?? 35}%, transparent);`);
        }
      } else if (k.startsWith('effect_focus_')) {
        const f = (v as Array<{ colorToken?: string; spread?: number }>)?.[0];
        if (f?.colorToken) {
          const colorVar = f.colorToken.startsWith('color_') ? `var(--${tokenToCssName(f.colorToken)})` : `var(--color-brand-primary)`;
          lines.push(`  --${cssName}: 0px 0px 0px ${f.spread ?? 2}px ${colorVar};`);
        }
      } else if (k.startsWith('effect_scrim_')) {
        const s = (v as Array<{ color?: string; opacity?: number }>)?.[0];
        if (s) {
          const darkOpacity = Math.min(100, (s.opacity ?? 30) * 1.5);
          lines.push(`  --${cssName}: ${rgba('#000000', darkOpacity)};`);
        }
      }
    }
  }

  lines.push('');
  lines.push('  --color-surface-hover: var(--color-surface-3);');
  lines.push('  --color-surface-active: var(--color-surface-3);');
  lines.push('}');
  lines.push('');

  // ── System dark preference ──
  lines.push('@media (prefers-color-scheme: dark) {');
  lines.push('  :root:not([data-theme="light"]) {');
  for (const [groupName, group] of Object.entries(colorGroups)) {
    if (groupName === 'primitives' || typeof group !== 'object') continue;
    for (const [tokenName, entry] of Object.entries(group as Record<string, unknown>)) {
      const e = entry as Record<string, string> | undefined;
      if (!e?.dark) continue;
      const hex = e.dark.startsWith('#') ? e.dark : resolveHex(colorPrim, e.dark);
      lines.push(`    --${tokenToCssName(tokenName)}: ${hex};`);
    }
  }
  lines.push('  }');
  lines.push('}');

  writeFileSync(OUTPUT_PATH, lines.join('\n'), 'utf-8');
  console.log(`Wrote ${OUTPUT_PATH}`);
}

main();
