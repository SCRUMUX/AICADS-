/**
 * figma-to-structures.ts
 * Parses figma-ai-ds-code.js (the Figma plugin source) to extract layout
 * metadata that only exists in the 47 build*Layout functions and the
 * COMPONENT_CONTEXT_CONFIG block.
 *
 * Enriches component-structures.json with:
 *   - defaultWidth / defaultHeight (from comp.resize)
 *   - heightConstraint ("fixed" when minHeight === maxHeight)
 *   - borderWidthToken (from resolveBorderWidth calls)
 *   - iconSizeMap (from iconSizeForButtonSize + overrides)
 *   - clipsContent (from comp.clipsContent = true)
 *
 * Run: npx tsx scripts/figma-to-structures.ts
 * Sources: ../figma-ai-ds-code.js, ../component-structures.json
 * Output:  ../component-structures.json (merged in-place)
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const FIGMA_CODE_PATH = join(ROOT, 'figma-plugin', 'figma-ai-ds-code.js');
const STRUCTURES_PATH = join(ROOT, 'component-structures.json');

interface IconSizeMap {
  [size: string]: number;
}

interface ExtractedMeta {
  defaultWidth?: number | null;
  defaultHeight?: number | null;
  heightConstraint?: 'fixed' | 'hug';
  borderWidthToken?: string;
  iconSizeMap?: IconSizeMap;
  clipsContent?: boolean;
}

/* ── Parse the default iconSizeForButtonSize function ── */

function parseDefaultIconSizeFunc(code: string): ((size: string) => number) {
  const m = code.match(
    /function iconSizeForButtonSize\(size\)\s*\{([^}]+)\}/
  );
  if (!m) return (size: string) => (size === 'lg' ? 24 : 20);

  const body = m[1];
  const pairs: Array<[string, number]> = [];
  const ifs = body.matchAll(/size\s*===\s*'(\w+)'\)\s*return\s+(\d+)/g);
  for (const im of ifs) pairs.push([im[1], Number(im[2])]);

  // Find the standalone return (not in an if) - match return at start of line
  const allReturns = [...body.matchAll(/^\s*return\s+(\d+)\s*;?\s*$/gm)];
  const standalone = allReturns.filter(r => !/if\s*\(/.test(r.input!.slice(Math.max(0, (r.index ?? 0) - 40), r.index)));
  const lastReturn = standalone.length > 0 ? standalone[standalone.length - 1] : allReturns[allReturns.length - 1];
  const defaultVal = lastReturn ? Number(lastReturn[1]) : 20;

  return (size: string) => {
    for (const [s, v] of pairs) if (s === size) return v;
    return defaultVal;
  };
}

/* ── Parse COMPONENT_CONTEXT_CONFIG for iconSizeOverride ── */

function parseIconOverrides(
  code: string
): Record<string, (size: string) => number> {
  const overrides: Record<string, (size: string) => number> = {};
  const configBlock = code.match(
    /var COMPONENT_CONTEXT_CONFIG\s*=\s*\{([\s\S]*?)\n\s*\};/
  );
  if (!configBlock) return overrides;

  const block = configBlock[1];
  const entries = block.matchAll(
    /'(@UI\/[^']+)'\s*:\s*\{[^}]*iconSizeOverride\s*:\s*function\s*\(size\)\s*\{([^}]+)\}/g
  );
  for (const e of entries) {
    const name = e[1];
    const body = e[2];
    const pairs: Array<[string, number]> = [];
    const ifs = body.matchAll(/size\s*===\s*'(\w+)'\s*\?\s*(\d+)/g);
    for (const im of ifs) pairs.push([im[1], Number(im[2])]);
    const fallback = body.match(/:\s*(\d+)\s*;?\s*$/);
    const defaultVal = fallback ? Number(fallback[1]) : 20;

    overrides[name] = (size: string) => {
      for (const [s, v] of pairs) if (s === size) return v;
      return defaultVal;
    };
  }
  return overrides;
}

/* ── Extract builder names → component names from the COMPONENT_LAYOUT_BUILDERS map ── */

function parseBuilderMap(
  code: string
): Array<{ compName: string; funcName: string }> {
  const entries: Array<{ compName: string; funcName: string }> = [];
  const re =
    /COMPONENT_LAYOUT_BUILDERS\['(@UI\/[^']+)'\]\s*=\s*(build\w+Layout)/g;
  let m;
  while ((m = re.exec(code)) !== null) {
    entries.push({ compName: m[1], funcName: m[2] });
  }
  return entries;
}

/* ── Extract a single builder function body ── */

function extractFunctionBody(code: string, funcName: string): string {
  const start = code.indexOf(`async function ${funcName}(`);
  if (start < 0) return '';
  let depth = 0;
  let bodyStart = -1;
  for (let i = start; i < code.length; i++) {
    if (code[i] === '{') {
      if (depth === 0) bodyStart = i;
      depth++;
    } else if (code[i] === '}') {
      depth--;
      if (depth === 0) return code.slice(bodyStart, i + 1);
    }
  }
  return '';
}

/* ── Analyze a builder function body ── */

function analyzeBuilder(
  body: string,
  defaultIconFn: (s: string) => number,
  iconOverride: ((s: string) => number) | undefined
): ExtractedMeta {
  const meta: ExtractedMeta = {};

  // defaultWidth from comp.resize(W, H)
  const resizeMatch = body.match(/comp\.resize\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
  if (resizeMatch) {
    meta.defaultWidth = Number(resizeMatch[1]);
    meta.defaultHeight = Number(resizeMatch[2]);
  }

  // heightConstraint: detect comp.minHeight = X; comp.maxHeight = X;
  const hasMinH = /comp\.minHeight\s*=/.test(body);
  const hasMaxH = /comp\.maxHeight\s*=/.test(body);
  meta.heightConstraint = hasMinH && hasMaxH ? 'fixed' : 'hug';

  // borderWidthToken from resolveBorderWidth(spec, 'TOKEN')
  const bwMatch = body.match(/resolveBorderWidth\(spec,\s*'([^']+)'\)/);
  if (bwMatch) meta.borderWidthToken = bwMatch[1];

  // clipsContent
  if (/comp\.clipsContent\s*=\s*true/.test(body)) {
    meta.clipsContent = true;
  }

  // iconSizeMap: derive from the iconSizeForButtonSize function
  const usesIcons =
    /iconSizeForButtonSize/.test(body) || /iconPx/.test(body);
  if (usesIcons) {
    const fn = iconOverride || defaultIconFn;
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    const map: IconSizeMap = {};
    for (const s of sizes) {
      const px = fn(s);
      map[s] = px;
    }
    meta.iconSizeMap = map;
  }

  return meta;
}

/* ── Main ── */

function main() {
  const code = readFileSync(FIGMA_CODE_PATH, 'utf-8');
  const structures = JSON.parse(readFileSync(STRUCTURES_PATH, 'utf-8'));
  const comps: Record<string, any> = structures.components || {};

  const defaultIconFn = parseDefaultIconSizeFunc(code);
  const iconOverrides = parseIconOverrides(code);
  const builders = parseBuilderMap(code);

  let enriched = 0;
  for (const { compName, funcName } of builders) {
    const body = extractFunctionBody(code, funcName);
    if (!body) continue;

    const override = iconOverrides[compName];
    const meta = analyzeBuilder(body, defaultIconFn, override);

    if (comps[compName]) {
      if (meta.defaultWidth != null) comps[compName].defaultWidth = meta.defaultWidth;
      if (meta.defaultHeight != null) comps[compName].defaultHeight = meta.defaultHeight;
      if (meta.heightConstraint) comps[compName].heightConstraint = meta.heightConstraint;
      if (meta.borderWidthToken) comps[compName].borderWidthToken = meta.borderWidthToken;
      if (meta.clipsContent) comps[compName].clipsContent = meta.clipsContent;
      if (meta.iconSizeMap) comps[compName].iconSizeMap = meta.iconSizeMap;
      enriched++;
    }
  }

  writeFileSync(STRUCTURES_PATH, JSON.stringify(structures, null, 2) + '\n', 'utf-8');
  console.log(`Enriched ${enriched} component(s) in ${STRUCTURES_PATH}`);
}

main();
