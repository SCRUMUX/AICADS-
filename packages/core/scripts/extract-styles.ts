/**
 * extract-styles.ts — Brand-only style extractor
 *
 * Scans a live website, detects the dominant brand color, generates a brand
 * scale (6 primitives), and replaces ONLY the brand-related tokens in
 * ai-ds-styles.json.  All other tokens (gray scale, danger/red, warning/yellow,
 * success/green, info/cyan, borders, surfaces, etc.) are NEVER touched.
 *
 * What changes:
 *   - Brand primitives: core_brand_50/60/70/5/10/95
 *   - Brand semantics:  color_brand_*, color_link_*, color_focus_*, color_active,
 *                        color_icon_on_outline, color_viz_categorical_1
 *   - Effect colors:    effect_focus_brand, effect_elevation_glow
 *   - Typography:       fontFamily in all text styles
 *   - Contrast guard:   color_text_on_brand flips dark/light if brand is too light
 *
 * What NEVER changes:
 *   - Neutral/gray primitives and their semantics (bg, surface, text, border, divider)
 *   - Semantic states: danger(red), warning(yellow), success(green), info(cyan)
 *   - Icon tokens (except color_icon_on_outline)
 *   - Space, radius, ratio, borderWidth, effect (non-brand), layout, zIndex
 *   - Components, blocks, iconRoles, avatarPhoto, componentsConfig
 *
 * Usage:
 *   npx tsx scripts/extract-styles.ts --url "https://example.com"
 *   npx tsx scripts/extract-styles.ts --url "https://example.com" --pages "/" "/about"
 */
import { chromium, type Page } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const STYLES_PATH = path.join(ROOT, 'ai-ds-styles.json');
const BACKUP_PATH = path.join(ROOT, 'ai-ds-styles.backup.json');
const REPORT_PATH = path.join(ROOT, 'ai-ds-styles.extracted.json');

/* ────────────────── CLI ────────────────── */

function getArg(name: string): string | undefined {
  const idx = process.argv.indexOf(name);
  return idx >= 0 && idx + 1 < process.argv.length ? process.argv[idx + 1] : undefined;
}

function getArgList(name: string): string[] {
  const result: string[] = [];
  let idx = process.argv.indexOf(name);
  while (idx >= 0 && idx + 1 < process.argv.length) {
    const next = process.argv[idx + 1];
    if (next.startsWith('--')) break;
    result.push(next);
    idx++;
  }
  return result;
}

const baseUrl = getArg('--url');
if (!baseUrl) {
  console.error('Usage: npx tsx scripts/extract-styles.ts --url "https://example.com" [--pages "/" "/about"]');
  process.exit(1);
}
const pagePaths = getArgList('--pages');
if (!pagePaths.length) pagePaths.push('/');

/* ────────────────── Color math ────────────────── */

interface RgbColor { r: number; g: number; b: number; a: number }

function parseColor(raw: string): RgbColor | null {
  const m = raw?.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
  return m ? { r: +m[1], g: +m[2], b: +m[3], a: m[4] != null ? +m[4] : 1 } : null;
}

function rgbToHex(c: RgbColor): string {
  const h = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0').toUpperCase();
  return `#${h(c.r)}${h(c.g)}${h(c.b)}`;
}

function hexToRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const [r, g, b] = hexToRgb(hex).map(v => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: h * 360, s, l };
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function mixHex(hex1: string, hex2: string, weight: number): string {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const mix = (a: number, b: number) => Math.round(a * (1 - weight) + b * weight);
  const h = (n: number) => Math.min(255, Math.max(0, n)).toString(16).padStart(2, '0').toUpperCase();
  return `#${h(mix(r1, r2))}${h(mix(g1, g2))}${h(mix(b1, b2))}`;
}

function tint(hex: string, percent: number): string {
  return mixHex(hex, '#FFFFFF', percent / 100);
}

function shade(hex: string, percent: number): string {
  return mixHex(hex, '#000000', percent / 100);
}

/* ────────────────── Brand scale generator ────────────────── */

interface BrandScale {
  core_brand_50: string;
  core_brand_60: string;
  core_brand_70: string;
  core_brand_5: string;
  core_brand_10: string;
  core_brand_95: string;
}

function generateBrandScale(brandHex: string): BrandScale {
  return {
    core_brand_50: brandHex,
    core_brand_60: shade(brandHex, 15),
    core_brand_70: shade(brandHex, 28),
    core_brand_5:  tint(brandHex, 92),
    core_brand_10: tint(brandHex, 85),
    core_brand_95: shade(brandHex, 85),
  };
}

/* ────────────────── Page scraping ────────────────── */

interface ExtractedColor { hex: string; count: number; contexts: string[]; hsl: { h: number; s: number; l: number } }

const EXTRACT_SCRIPT = `
(function() {
  var colors = {};
  var fonts = {};
  var fontSizes = {};
  var lineHeights = {};
  var borderRadii = {};

  var all = document.querySelectorAll('*');
  for (var i = 0; i < all.length; i++) {
    var el = all[i];
    var cs = getComputedStyle(el);
    var tag = el.tagName.toLowerCase();

    var colorProps = [
      [cs.color, 'text(' + tag + ')'],
      [cs.backgroundColor, 'bg(' + tag + ')'],
      [cs.borderTopColor, 'border(' + tag + ')'],
      [cs.borderBottomColor, 'border(' + tag + ')'],
      [cs.outlineColor, 'outline(' + tag + ')']
    ];
    for (var ci = 0; ci < colorProps.length; ci++) {
      var raw = colorProps[ci][0];
      var ctx = colorProps[ci][1];
      if (!raw || raw === 'rgba(0, 0, 0, 0)' || raw === 'transparent') continue;
      if (!colors[raw]) colors[raw] = { count: 0, contexts: [] };
      colors[raw].count++;
      if (colors[raw].contexts.length < 5 && colors[raw].contexts.indexOf(ctx) === -1) {
        colors[raw].contexts.push(ctx);
      }
    }

    var font = cs.fontFamily.split(',')[0].trim().replace(/['"]/g, '');
    if (font) fonts[font] = (fonts[font] || 0) + 1;

    var fs = parseFloat(cs.fontSize);
    if (fs > 0) fontSizes[fs] = (fontSizes[fs] || 0) + 1;

    var lh = parseFloat(cs.lineHeight);
    if (lh > 0 && !isNaN(lh)) lineHeights[lh] = (lineHeights[lh] || 0) + 1;

    var br = parseFloat(cs.borderRadius);
    if (br > 0 && !isNaN(br) && br < 10000) borderRadii[br] = (borderRadii[br] || 0) + 1;
  }

  return { colors: colors, fonts: fonts, fontSizes: fontSizes,
           lineHeights: lineHeights, borderRadii: borderRadii };
})()
`;

interface RawExtraction {
  colors: Map<string, { count: number; contexts: string[] }>;
  fonts: Map<string, number>;
  fontSizes: Map<number, number>;
  lineHeights: Map<number, number>;
  borderRadii: Map<number, number>;
}

async function extractFromPage(page: Page): Promise<RawExtraction> {
  const raw: any = await page.evaluate(EXTRACT_SCRIPT);
  const colors = new Map<string, { count: number; contexts: string[] }>();
  for (const [k, v] of Object.entries(raw.colors as Record<string, any>)) colors.set(k, v);
  const toNum = (o: Record<string, number>) => { const m = new Map<number, number>(); for (const [k, v] of Object.entries(o)) m.set(Number(k), v); return m; };
  const toStr = (o: Record<string, number>) => { const m = new Map<string, number>(); for (const [k, v] of Object.entries(o)) m.set(k, v); return m; };
  return { colors, fonts: toStr(raw.fonts), fontSizes: toNum(raw.fontSizes), lineHeights: toNum(raw.lineHeights), borderRadii: toNum(raw.borderRadii) };
}

function mergeExtractions(a: RawExtraction, b: RawExtraction): RawExtraction {
  for (const [key, val] of b.colors) {
    const ex = a.colors.get(key);
    if (ex) { ex.count += val.count; for (const c of val.contexts) { if (ex.contexts.length < 5 && !ex.contexts.includes(c)) ex.contexts.push(c); } }
    else a.colors.set(key, { ...val });
  }
  for (const [k, v] of b.fonts) a.fonts.set(k, (a.fonts.get(k) || 0) + v);
  for (const [k, v] of b.fontSizes) a.fontSizes.set(k, (a.fontSizes.get(k) || 0) + v);
  for (const [k, v] of b.lineHeights) a.lineHeights.set(k, (a.lineHeights.get(k) || 0) + v);
  for (const [k, v] of b.borderRadii) a.borderRadii.set(k, (a.borderRadii.get(k) || 0) + v);
  return a;
}

/* ────────────────── Brand color detection ────────────────── */

const BRAND_CONTEXTS = ['bg(button)', 'bg(a)', 'border(button)', 'text(a)', 'bg(input)', 'border(a)'];

function detectBrandColor(raw: Map<string, { count: number; contexts: string[] }>): ExtractedColor | null {
  const candidates: ExtractedColor[] = [];

  for (const [rawStr, info] of raw) {
    const c = parseColor(rawStr);
    if (!c || c.a < 0.5) continue;
    const hex = rgbToHex(c);
    const hsl = hexToHsl(hex);
    if (hsl.s < 0.25) continue;
    if (hsl.l < 0.1 || hsl.l > 0.9) continue;

    const existing = candidates.find(e => e.hex === hex);
    if (existing) {
      existing.count += info.count;
      for (const ctx of info.contexts) {
        if (existing.contexts.length < 10 && !existing.contexts.includes(ctx)) existing.contexts.push(ctx);
      }
    } else {
      candidates.push({ hex, count: info.count, contexts: [...info.contexts], hsl });
    }
  }

  // Score candidates: prefer colors that appear in brand-relevant contexts
  let best: ExtractedColor | null = null;
  let bestScore = -1;
  for (const c of candidates) {
    const contextBonus = c.contexts.some(ctx => BRAND_CONTEXTS.some(bc => ctx.includes(bc.split('(')[1].replace(')', '')))) ? 3 : 0;
    const score = c.count + contextBonus * c.count;
    if (score > bestScore) { bestScore = score; best = c; }
  }

  return best;
}

/* ────────────────── Apply brand to spec ────────────────── */

const OLD_BRAND_PRIMITIVES = [
  'core_blue_50', 'core_blue_60', 'core_blue_70', 'core_blue_5', 'core_ui_hover_bg',
];

const BRAND_SEMANTIC_MAP: Record<string, { light: string; dark: string }> = {
  'color_brand_primary':   { light: 'core_brand_50', dark: 'core_brand_50' },
  'color_brand_hover':     { light: 'core_brand_60', dark: 'core_brand_60' },
  'color_brand_pressed':   { light: 'core_brand_70', dark: 'core_brand_70' },
  'color_brand_muted':     { light: 'core_brand_5',  dark: 'core_brand_95' },
  'color_brand_hover_bg':  { light: 'core_brand_10', dark: 'core_brand_95' },
  'color_link_default':    { light: 'core_brand_50', dark: 'core_brand_50' },
  'color_link_hover':      { light: 'core_brand_60', dark: 'core_brand_60' },
  'color_focus_outline':   { light: 'core_brand_50', dark: 'core_brand_50' },
  'color_active':          { light: 'core_brand_50', dark: 'core_brand_50' },
};

const BRAND_ICON_MAP: Record<string, { light: string; dark: string }> = {
  'color_icon_on_outline': { light: 'core_brand_50', dark: 'core_brand_50' },
};

const BRAND_VIZ_MAP: Record<string, { light: string; dark: string }> = {
  'color_viz_categorical_1': { light: 'core_brand_50', dark: 'core_brand_50' },
};

function applyBrandToSpec(spec: any, scale: BrandScale, brandHex: string): string[] {
  const changes: string[] = [];
  const color = spec.tokens?.color;
  if (!color) return changes;

  // 1. Remove old brand primitives, add new ones
  const prims = color.primitives as Record<string, string>;
  for (const old of OLD_BRAND_PRIMITIVES) {
    if (prims[old]) {
      delete prims[old];
      changes.push(`  removed primitive: ${old}`);
    }
  }
  for (const [name, hex] of Object.entries(scale)) {
    prims[name] = hex;
    changes.push(`  added primitive: ${name} = ${hex}`);
  }

  // 2. Update brand semantics across all groups
  const allSemanticMaps = { ...BRAND_SEMANTIC_MAP, ...BRAND_ICON_MAP, ...BRAND_VIZ_MAP };
  for (const groupName of Object.keys(color)) {
    if (groupName === 'primitives') continue;
    const group = color[groupName];
    if (!group || typeof group !== 'object') continue;
    for (const [tokenName, mapping] of Object.entries(allSemanticMaps)) {
      if (group[tokenName]) {
        const old = JSON.stringify(group[tokenName]);
        group[tokenName] = { ...mapping };
        changes.push(`  ${tokenName}: ${old} → ${JSON.stringify(mapping)}`);
      }
    }
  }

  // 3. Contrast guard: flip color_text_on_brand if brand is too light
  const brandLum = relativeLuminance(brandHex);
  const needDarkText = brandLum > 0.4;
  for (const groupName of Object.keys(color)) {
    if (groupName === 'primitives') continue;
    const group = color[groupName];
    if (!group?.color_text_on_brand) continue;
    const textPrim = needDarkText ? 'core_gray_95' : 'core_white';
    const fallbackDark = needDarkText ? 'core_gray_95' : 'core_white';
    // Ensure these primitives exist
    if (!prims[textPrim] && textPrim === 'core_gray_95') prims['core_gray_95'] = '#353535';
    group.color_text_on_brand = { light: textPrim, dark: fallbackDark };
    changes.push(`  color_text_on_brand → ${textPrim} (luminance=${brandLum.toFixed(2)}, needDarkText=${needDarkText})`);
  }

  // 4. Update effects that reference brand
  const effects = spec.tokens?.effect;
  if (effects) {
    for (const [effName, effVal] of Object.entries(effects)) {
      if (!Array.isArray(effVal)) continue;
      for (const layer of effVal as any[]) {
        if (layer.colorToken === 'color_brand_primary') {
          layer.color = brandHex;
          changes.push(`  effect ${effName}: color → ${brandHex}`);
        }
      }
    }
  }

  return changes;
}

/* ────────────────── Typography ────────────────── */

function updateTypography(spec: any, primaryFont: string): string[] {
  const changes: string[] = [];
  const typo = spec.tokens?.typography;
  if (!typo) return changes;

  const oldFont = typo.fontFamily || '';
  if (oldFont === primaryFont) return changes;

  typo.fontFamily = primaryFont;
  changes.push(`  fontFamily: "${oldFont}" → "${primaryFont}"`);

  const textStyles = typo.textStyles || {};
  for (const [name, style] of Object.entries(textStyles)) {
    if (style && typeof style === 'object') {
      (style as any).fontFamily = primaryFont;
    }
  }
  changes.push(`  updated ${Object.keys(textStyles).length} text styles`);

  return changes;
}

/* ────────────────── Classify (for report only) ────────────────── */

function classifyForReport(raw: Map<string, { count: number; contexts: string[] }>): ExtractedColor[] {
  const parsed: ExtractedColor[] = [];
  for (const [rawStr, info] of raw) {
    const c = parseColor(rawStr);
    if (!c || c.a < 0.05) continue;
    const hex = rgbToHex(c);
    const hsl = hexToHsl(hex);
    const existing = parsed.find(p => p.hex === hex);
    if (existing) {
      existing.count += info.count;
      for (const ctx of info.contexts) { if (existing.contexts.length < 5 && !existing.contexts.includes(ctx)) existing.contexts.push(ctx); }
    } else {
      parsed.push({ hex, count: info.count, contexts: [...info.contexts], hsl });
    }
  }
  parsed.sort((a, b) => b.count - a.count);
  return parsed;
}

/* ────────────────── Main ────────────────── */

async function main() {
  console.log(`\n=== AICADS Brand Style Extractor ===`);
  console.log(`URL:   ${baseUrl}`);
  console.log(`Pages: ${pagePaths.join(', ')}`);
  console.log(`\nPrinciple: ONLY brand colors change. Danger/warning/success/info are constants.\n`);

  // 1. Check existing styles file
  if (!fs.existsSync(STYLES_PATH)) {
    console.error(`ERROR: ${STYLES_PATH} not found.`);
    console.error(`This script requires an existing ai-ds-styles.json as a template.`);
    console.error(`Run "npm run spec:split" first to create it from ai-ds-spec.json.`);
    process.exit(1);
  }

  // 2. Backup
  fs.copyFileSync(STYLES_PATH, BACKUP_PATH);
  console.log(`Backup: ai-ds-styles.backup.json`);

  // 3. Scan website
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  });

  let combined: RawExtraction = {
    colors: new Map(), fonts: new Map(), fontSizes: new Map(),
    lineHeights: new Map(), borderRadii: new Map(),
  };

  for (const p of pagePaths) {
    const url = new URL(p, baseUrl).toString();
    process.stdout.write(`  Scanning ${url} ... `);
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      const extraction = await extractFromPage(page);
      combined = mergeExtractions(combined, extraction);
      console.log(`${extraction.colors.size} colors, ${extraction.fonts.size} fonts`);
    } catch (e: any) {
      console.log(`ERROR: ${e.message}`);
    } finally {
      await page.close();
    }
  }
  await browser.close();

  // 4. Detect brand color
  const brandColor = detectBrandColor(combined.colors);
  if (!brandColor) {
    console.error(`\nERROR: Could not detect a brand color from the website.`);
    console.error(`The site may not have enough saturated colors in buttons/links.`);
    process.exit(1);
  }

  console.log(`\n--- Detected brand color ---`);
  console.log(`  HEX: ${brandColor.hex}`);
  console.log(`  HSL: h=${Math.round(brandColor.hsl.h)} s=${Math.round(brandColor.hsl.s * 100)}% l=${Math.round(brandColor.hsl.l * 100)}%`);
  console.log(`  Occurrences: ${brandColor.count}`);
  console.log(`  Contexts: ${brandColor.contexts.join(', ')}`);

  // 5. Generate brand scale
  const scale = generateBrandScale(brandColor.hex);
  console.log(`\n--- Generated brand scale ---`);
  for (const [name, hex] of Object.entries(scale)) {
    console.log(`  ${name.padEnd(18)} ${hex}`);
  }

  // 6. Font
  const topFonts = [...combined.fonts.entries()].sort((a, b) => b[1] - a[1]);
  const primaryFont = topFonts[0]?.[0] || 'Inter';
  console.log(`\n--- Font ---`);
  console.log(`  Primary: ${primaryFont}`);

  // 7. Apply to spec
  const spec = JSON.parse(fs.readFileSync(STYLES_PATH, 'utf-8'));

  console.log(`\n--- Applying changes ---`);
  const brandChanges = applyBrandToSpec(spec, scale, brandColor.hex);
  for (const c of brandChanges) console.log(c);

  const typoChanges = updateTypography(spec, primaryFont);
  for (const c of typoChanges) console.log(c);

  // 8. Write updated spec
  fs.writeFileSync(STYLES_PATH, JSON.stringify(spec, null, 2) + '\n', 'utf-8');
  console.log(`\nWrote: ai-ds-styles.json`);
  console.log(`Total changes: ${brandChanges.length + typoChanges.length}`);

  // 9. Save extraction report
  const allColors = classifyForReport(combined.colors);
  const topSizes = [...combined.fontSizes.entries()].sort((a, b) => b[1] - a[1]);
  const topRadii = [...combined.borderRadii.entries()].sort((a, b) => b[1] - a[1]);

  const report = {
    url: baseUrl,
    pages: pagePaths,
    extractedAt: new Date().toISOString(),
    detectedBrand: {
      hex: brandColor.hex,
      hsl: { h: Math.round(brandColor.hsl.h), s: Math.round(brandColor.hsl.s * 100), l: Math.round(brandColor.hsl.l * 100) },
      count: brandColor.count,
      contexts: brandColor.contexts,
    },
    generatedScale: scale,
    contrastGuard: {
      brandLuminance: relativeLuminance(brandColor.hex).toFixed(3),
      textOnBrand: relativeLuminance(brandColor.hex) > 0.4 ? 'dark (core_gray_95)' : 'white (core_white)',
    },
    summary: {
      totalColorsFound: allColors.length,
      primaryFont,
      fontSizes: topSizes.slice(0, 10).map(([s]) => s),
      borderRadii: topRadii.slice(0, 8).map(([r]) => r),
    },
    allExtractedColors: allColors.slice(0, 30).map(c => ({
      hex: c.hex, count: c.count, contexts: c.contexts,
      hsl: { h: Math.round(c.hsl.h), s: Math.round(c.hsl.s * 100), l: Math.round(c.hsl.l * 100) },
    })),
    fonts: topFonts.slice(0, 10).map(([name, count]) => ({ name, count })),
    changes: [...brandChanges, ...typoChanges],
  };
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + '\n', 'utf-8');
  console.log(`Report: ai-ds-styles.extracted.json`);

  // 10. Summary
  console.log(`\n=== DONE ===`);
  console.log(`Brand: ${brandColor.hex} → 6 primitives (core_brand_50..95)`);
  console.log(`Font:  ${primaryFont}`);
  console.log(`\nSemantic states (danger/warning/success/info) were NOT modified.`);
  console.log(`Neutral grays, borders, surfaces were NOT modified.`);
  console.log(`\nNext step: run "npm run spec:merge" to rebuild ai-ds-spec.json`);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
