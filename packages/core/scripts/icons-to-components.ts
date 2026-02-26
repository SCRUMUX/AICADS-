/**
 * icons-to-components.ts
 * Reads SVG files from ../../icons/ and generates a barrel file
 * of React icon components at ../components/icons/index.tsx
 *
 * Run: npx tsx scripts/icons-to-components.ts
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ICONS_DIR = join(__dirname, '..', 'icons');
const OUTPUT_DIR = join(__dirname, '..', 'components', 'icons');

function toPascal(filename: string): string {
  return filename
    .replace(/\.svg$/, '')
    .split(/[-_\s]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function cleanSvg(raw: string): string {
  return raw
    .replace(/fill="#[0-9a-fA-F]{3,8}"/g, 'fill="currentColor"')
    .replace(/stroke="#[0-9a-fA-F]{3,8}"/g, 'stroke="currentColor"')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-dasharray=/g, 'strokeDasharray=')
    .replace(/stroke-dashoffset=/g, 'strokeDashoffset=')
    .replace(/xmlns="[^"]*"/g, '')
    .replace(/<svg\s/, '<svg ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractInner(svg: string): string {
  const m = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  return m ? m[1].trim() : '';
}

function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const files = readdirSync(ICONS_DIR)
    .filter(f => f.endsWith('.svg'))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const lines: string[] = [
    `/**`,
    ` * AUTO-GENERATED icon components from SVG files.`,
    ` * Do not edit. Regenerate: npx tsx scripts/icons-to-components.ts`,
    ` */`,
    `import React from 'react';`,
    ``,
    `interface IconProps {`,
    `  size?: number | string;`,
    `  className?: string;`,
    `  style?: React.CSSProperties;`,
    `}`,
    ``,
  ];

  const exports: string[] = [];

  for (const file of files) {
    const name = toPascal(file) + 'Icon';
    const raw = readFileSync(join(ICONS_DIR, file), 'utf-8');
    const cleaned = cleanSvg(raw);
    const inner = extractInner(cleaned);
    if (!inner) continue;

    lines.push(
      `export const ${name}: React.FC<IconProps> = ({ size = 16, className, style }) => (`,
      `  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={style}>`,
      `    ${inner}`,
      `  </svg>`,
      `);`,
      ``
    );
    exports.push(name);
  }

  const slugMap: Record<string, string> = {};
  for (const file of files) {
    const slug = file.replace(/\.svg$/, '').toLowerCase();
    const name = toPascal(file) + 'Icon';
    if (exports.includes(name)) {
      slugMap[slug] = name;
    }
  }

  lines.push(`export const ICON_MAP: Record<string, React.FC<IconProps>> = {`);
  for (const [slug, name] of Object.entries(slugMap)) {
    lines.push(`  '${slug}': ${name},`);
  }
  lines.push(`};`);
  lines.push(``);
  lines.push(`export function getIcon(name: string): React.FC<IconProps> | undefined {`);
  lines.push(`  return ICON_MAP[name.toLowerCase()];`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export type { IconProps };`);

  writeFileSync(join(OUTPUT_DIR, 'index.tsx'), lines.join('\n'), 'utf-8');
  console.log(`Generated ${exports.length} icon components → ${OUTPUT_DIR}/index.tsx`);
}

main();
