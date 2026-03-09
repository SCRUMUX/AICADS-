/**
 * extract-styles.ts
 *
 * Extracts color palette, typography and dimensions from a live website,
 * then updates ai-ds-styles.json with the extracted primitives.
 *
 * Always:
 *   - Creates backup: ai-ds-styles.backup.json
 *   - Writes report:  ai-ds-styles.extracted.json
 *   - Updates in-place: ai-ds-styles.json (primitives + font)
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

/* ---------- CLI ---------- */

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

/* ---------- Color utilities ---------- */

interface RgbColor { r: number; g: number; b: number; a: number }

function parseColor(raw: string): RgbColor | null {
  if (!raw) return null;
  const m = raw.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
  if (m) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] != null ? +m[4] : 1 };
  return null;
}

function rgbToHex(c: RgbColor): string {
  const h = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0').toUpperCase();
  return `#${h(c.r)}${h(c.g)}${h(c.b)}`;
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
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

function colorDistance(a: string, b: string): number {
  const ha = hexToHsl(a), hb = hexToHsl(b);
  const dh = Math.min(Math.abs(ha.h - hb.h), 360 - Math.abs(ha.h - hb.h)) / 180;
  const ds = Math.abs(ha.s - hb.s);
  const dl = Math.abs(ha.l - hb.l);
  return Math.sqrt(dh * dh + ds * ds + dl * dl);
}

/* ---------- Page scraping ---------- */

interface RawExtraction {
  colors: Map<string, { count: number; contexts: string[] }>;
  fonts: Map<string, number>;
  fontSizes: Map<number, number>;
  lineHeights: Map<number, number>;
  borderRadii: Map<number, number>;
}

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
      if (colors[raw].contexts.length < 3 && colors[raw].contexts.indexOf(ctx) === -1) {
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

/* ---------- Classification ---------- */

interface ColorGroup { name: string; hex: string; hsl: { h: number; s: number; l: number }; count: number; contexts: string[] }

function classifyColors(raw: Map<string, { count: number; contexts: string[] }>): ColorGroup[] {
  const parsed: ColorGroup[] = [];
  for (const [rawStr, info] of raw) {
    const c = parseColor(rawStr);
    if (!c || c.a < 0.05) continue;
    const hex = rgbToHex(c);
    const hsl = hexToHsl(hex);
    const existing = parsed.find(p => p.hex === hex);
    if (existing) { existing.count += info.count; for (const ctx of info.contexts) { if (existing.contexts.length < 5 && !existing.contexts.includes(ctx)) existing.contexts.push(ctx); } }
    else parsed.push({ name: '', hex, hsl, count: info.count, contexts: info.contexts });
  }
  parsed.sort((a, b) => b.count - a.count);

  const deduped: ColorGroup[] = [];
  for (const color of parsed) {
    const close = deduped.find(d => colorDistance(d.hex, color.hex) < 0.015);
    if (close) close.count += color.count;
    else deduped.push(color);
  }

  for (const c of deduped) {
    const { h, s, l } = c.hsl;
    if (s < 0.08) {
      if (l > 0.97) c.name = 'core_white';
      else if (l < 0.08) c.name = 'core_black';
      else c.name = `core_gray_${Math.round(l * 100)}`;
    } else {
      let hue = '';
      if (h < 15 || h >= 345) hue = 'red';
      else if (h < 45) hue = 'orange';
      else if (h < 70) hue = 'yellow';
      else if (h < 160) hue = 'green';
      else if (h < 190) hue = 'teal';
      else if (h < 210) hue = 'cyan';
      else if (h < 270) hue = 'blue';
      else if (h < 310) hue = 'violet';
      else hue = 'rose';
      c.name = `core_${hue}_${Math.round(l * 100)}`;
    }
  }

  const seen = new Map<string, number>();
  for (const c of deduped) {
    const base = c.name;
    const count = seen.get(base) || 0;
    if (count > 0) c.name = `${base}_alt${count}`;
    seen.set(base, count + 1);
  }

  return deduped;
}

/* ---------- Main ---------- */

async function main() {
  console.log(`\n=== AICADS Style Extractor ===`);
  console.log(`URL:   ${baseUrl}`);
  console.log(`Pages: ${pagePaths.join(', ')}\n`);

  // Step 1: Backup existing styles
  if (fs.existsSync(STYLES_PATH)) {
    fs.copyFileSync(STYLES_PATH, BACKUP_PATH);
    console.log(`Backup: ai-ds-styles.backup.json`);
  }

  // Step 2: Scan website
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

  // Step 3: Classify
  const colors = classifyColors(combined.colors);
  const topFonts = [...combined.fonts.entries()].sort((a, b) => b[1] - a[1]);
  const topSizes = [...combined.fontSizes.entries()].sort((a, b) => b[1] - a[1]);
  const topRadii = [...combined.borderRadii.entries()].sort((a, b) => b[1] - a[1]);
  const primaryFont = topFonts[0]?.[0] || 'Inter';

  // Step 4: Save report
  const report = {
    url: baseUrl,
    pages: pagePaths,
    extractedAt: new Date().toISOString(),
    summary: {
      totalColors: colors.length,
      primaryFont,
      fontSizes: topSizes.slice(0, 10).map(([s]) => s),
      borderRadii: topRadii.slice(0, 8).map(([r]) => r),
    },
    colors: colors.map(c => ({
      name: c.name, hex: c.hex, count: c.count, contexts: c.contexts,
      hsl: { h: Math.round(c.hsl.h), s: Math.round(c.hsl.s * 100), l: Math.round(c.hsl.l * 100) },
    })),
    fonts: topFonts.slice(0, 10).map(([name, count]) => ({ name, count })),
  };
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + '\n', 'utf-8');

  // Step 5: Build primitives
  const newPrimitives: Record<string, string> = {};
  for (const c of colors) newPrimitives[c.name] = c.hex;

  // Step 6: Update or create ai-ds-styles.json
  if (fs.existsSync(STYLES_PATH)) {
    const existing = JSON.parse(fs.readFileSync(STYLES_PATH, 'utf-8'));

    // Build mapping: old primitive HEX → new primitive name (for semantic fixup)
    const oldPrimitives: Record<string, string> = existing.tokens?.color?.primitives || {};
    const oldNameToHex = new Map(Object.entries(oldPrimitives));
    const hexToNewName = new Map(colors.map(c => [c.hex, c.name]));

    // Replace primitives
    if (!existing.tokens) existing.tokens = {};
    if (!existing.tokens.color) existing.tokens.color = {};
    existing.tokens.color.primitives = newPrimitives;

    // Auto-fix semantic references: find closest new primitive for each broken ref
    let fixedCount = 0;
    for (const groupName of Object.keys(existing.tokens.color)) {
      if (groupName === 'primitives') continue;
      const group = existing.tokens.color[groupName];
      if (!group || typeof group !== 'object') continue;
      for (const [tokenName, entry] of Object.entries(group)) {
        if (!entry || typeof entry !== 'object') continue;
        const e = entry as Record<string, string>;
        for (const mode of ['light', 'dark']) {
          const ref = e[mode];
          if (!ref || ref.startsWith('#')) continue;
          if (newPrimitives[ref]) continue; // still valid
          // Broken reference — try to find closest match
          const oldHex = oldNameToHex.get(ref);
          if (oldHex) {
            // Find closest new primitive by color distance
            let bestName = '';
            let bestDist = Infinity;
            for (const nc of colors) {
              const dist = colorDistance(oldHex, nc.hex);
              if (dist < bestDist) { bestDist = dist; bestName = nc.name; }
            }
            if (bestName) {
              e[mode] = bestName;
              fixedCount++;
            }
          }
        }
      }
    }

    // Update font
    if (existing.tokens.typography) {
      existing.tokens.typography.fontFamily = primaryFont;
      const textStyles = existing.tokens.typography.textStyles || {};
      for (const style of Object.values(textStyles)) {
        if (style && typeof style === 'object') (style as any).fontFamily = primaryFont;
      }
    }

    fs.writeFileSync(STYLES_PATH, JSON.stringify(existing, null, 2) + '\n', 'utf-8');
    console.log(`\nUpdated ai-ds-styles.json:`);
    console.log(`  ${Object.keys(newPrimitives).length} color primitives`);
    console.log(`  ${fixedCount} semantic references auto-fixed`);
    console.log(`  Font: ${primaryFont}`);
  } else {
    // No existing file — create from scratch with default iconRoles and structure
    const fresh: Record<string, any> = {
      componentsConfig: { useSingleTheme: false, themeMode: 'light' },
      avatarPhoto: { fileKey: '', nodeId: '', componentKey: '' },
      iconRoles: {
        brand: ['aica'],
        'close-x': ['close-x', 'close', 'x-mark'],
        check: ['check', 'check-lg', 'checkmark'],
        check2: ['check2'],
        'accordion-chevron': ['chevron-down', 'caret-down-fill', 'arrow-down'],
        'accordion-chevron-open': ['caret-up-fill'],
        'chevron-right': ['chevron-right', 'angle-right'],
        'chevron-left': ['chevron-left', 'angle-left'],
        'chevron-down': ['chevron-down', 'caret-down-fill'],
        'caret-left-fill': ['caret-left-fill'],
        'caret-right-fill': ['caret-right-fill'],
        'caret-up-fill': ['caret-up-fill'],
        'caret-down-fill': ['caret-down-fill'],
        search: ['search', 'magnifying-glass'],
        filter: ['filter', 'funnel', 'sliders'],
        link: ['link-45deg', 'link'],
        resizer: ['resizer', 'arrows-expand', 'arrows-fullscreen'],
        user: ['user', 'person', 'account'],
        'person-circle': ['person-circle'],
        'exclamation-diamond-fill': ['exclamation-diamond-fill', 'exclamation-diamond', 'alert'],
      },
      tokens: {
        color: { primitives: newPrimitives },
        typography: { textStyles: buildTextStyles(primaryFont, topSizes) },
      },
    };
    fs.writeFileSync(STYLES_PATH, JSON.stringify(fresh, null, 2) + '\n', 'utf-8');
    console.log(`\nCreated ai-ds-styles.json from scratch (${Object.keys(newPrimitives).length} primitives).`);
  }

  // Step 7: Summary
  console.log(`\nReport: ai-ds-styles.extracted.json`);
  console.log(`\n--- Extracted palette (top 10) ---`);
  for (const c of colors.slice(0, 10)) {
    console.log(`  ${c.hex}  ${c.name.padEnd(24)} (${c.count}x) ${c.contexts.join(', ')}`);
  }
  console.log(`  ... ${Math.max(0, colors.length - 10)} more`);
  console.log(`\nFont: ${primaryFont}`);
  console.log(`Sizes: ${topSizes.slice(0, 8).map(([s]) => s + 'px').join(', ')}`);
  console.log(`Radii: ${topRadii.slice(0, 5).map(([r]) => r + 'px').join(', ')}`);
}

function buildTextStyles(fontFamily: string, sizes: [number, number][]): Record<string, any> {
  const sizeList = sizes.map(([s]) => s).sort((a, b) => b - a);
  const styles: Record<string, any> = {};
  const headingSizes = sizeList.filter(s => s >= 18);
  const bodySizes = sizeList.filter(s => s >= 12 && s < 18);
  const captionSizes = sizeList.filter(s => s >= 8 && s < 12);

  const headingNames = ['H1', 'H2', 'H3', 'H4'];
  for (let i = 0; i < Math.min(headingSizes.length, 4); i++) {
    const fs = headingSizes[i];
    styles[`Text/Heading/${headingNames[i]}`] = { fontFamily, fontSize: fs, lineHeight: Math.round(fs * 1.35), fontWeight: 600 };
  }
  if (bodySizes.length >= 1) {
    const base = bodySizes.find(s => s >= 13 && s <= 15) || bodySizes[0];
    styles['Text/Body/Base'] = { fontFamily, fontSize: base, lineHeight: Math.round(base * 1.45), fontWeight: 400 };
    styles['Text/Body/Strong'] = { fontFamily, fontSize: base, lineHeight: Math.round(base * 1.45), fontWeight: 600 };
  }
  const sm = bodySizes.find(s => s >= 11 && s <= 13);
  if (sm) styles['Text/Body/SM'] = { fontFamily, fontSize: sm, lineHeight: Math.round(sm * 1.35), fontWeight: 400 };
  const lg = bodySizes.find(s => s >= 15 && s <= 17);
  if (lg) styles['Text/Body/LG'] = { fontFamily, fontSize: lg, lineHeight: Math.round(lg * 1.5), fontWeight: 400 };
  if (captionSizes.length) {
    styles['Text/Caption/Base'] = { fontFamily, fontSize: captionSizes[0], lineHeight: Math.round(captionSizes[0] * 1.35), fontWeight: 500 };
    if (captionSizes.length > 1) styles['Text/Caption/XS'] = { fontFamily, fontSize: captionSizes[1], lineHeight: Math.round(captionSizes[1] * 1.3), fontWeight: 500 };
  }
  return styles;
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
