/**
 * spec-to-block-contracts.ts
 * Reads blocks-spec.json and generates block contracts that describe
 * reusable UI sections composed of DS primitives.
 *
 * Run: npm run blocks:generate-contracts
 * Source: ../blocks-spec.json
 * Output: ../contracts/blocks/*.block-contract.json
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOCKS_SPEC_PATH = join(ROOT, 'blocks-spec.json');
const OUTPUT_DIR = join(ROOT, 'contracts', 'blocks');

interface SlotSpec {
  name: string;
  description?: string;
  type?: string;
  layout?: string;
  gap?: string;
  grow?: boolean;
  maxWidth?: number;
  repeat?: boolean;
  optional?: boolean;
  component?: string;
  defaultProps?: Record<string, unknown>;
  itemClassName?: string;
  textStyle?: string;
  textColor?: string;
  fontWeight?: string;
  textAlign?: string;
  default?: string;
  align?: string;
  justify?: string;
  position?: string;
  offset?: Record<string, string>;
  aspectRatio?: string;
  padding?: string | Record<string, string>;
  children?: SlotSpec[];
  itemSlots?: SlotSpec[];
  variants?: Record<string, Record<string, string>>;
  visibleWhen?: string;
}

interface BlockSpec {
  name: string;
  description?: string;
  category?: string;
  layout: string;
  sizing?: { width: number | string; height: string };
  padding?: string | Record<string, string>;
  gap?: string;
  minHeight?: string;
  tokens?: Record<string, string>;
  dataTheme?: string;
  slots: SlotSpec[];
  responsiveRules?: Array<Record<string, unknown>>;
}

function tokenToCssVar(tokenName: string): string {
  return '--' + tokenName.replace(/_/g, '-');
}

function buildLayoutClasses(block: BlockSpec): string[] {
  const classes: string[] = [];

  if (block.layout === 'vertical') classes.push('flex', 'flex-col');
  else if (block.layout === 'horizontal') classes.push('flex', 'items-center');

  if (block.sizing) {
    if (typeof block.sizing.width === 'number') {
      classes.push(`w-[${block.sizing.width}px]`, `min-w-[${block.sizing.width}px]`, 'shrink-0');
    } else if (block.sizing.width === 'fill') {
      classes.push('flex-1', 'min-w-0');
    }
    if (block.sizing.height === 'fill') classes.push('h-full');
  }

  if (block.padding && block.padding !== 'none') {
    if (typeof block.padding === 'string') {
      classes.push(`p-[var(${tokenToCssVar(block.padding)})]`);
    } else {
      if (block.padding.x) classes.push(`px-[var(${tokenToCssVar(block.padding.x)})]`);
      if (block.padding.y) classes.push(`py-[var(${tokenToCssVar(block.padding.y)})]`);
    }
  }

  if (block.gap && block.gap !== 'none') classes.push(`gap-[var(${tokenToCssVar(block.gap)})]`);

  if (block.minHeight) classes.push(`min-h-[var(${tokenToCssVar(block.minHeight)})]`);

  if (block.tokens?.background) {
    classes.push(`bg-[var(${tokenToCssVar(block.tokens.background)})]`);
  }
  if (block.tokens?.borderBottom) {
    classes.push('border-b', `border-b-[var(${tokenToCssVar(block.tokens.borderBottom)})]`);
  }
  if (block.tokens?.borderRight) {
    classes.push('border-r', `border-r-[var(${tokenToCssVar(block.tokens.borderRight)})]`);
  }
  if (block.tokens?.borderTop) {
    classes.push('border-t', `border-t-[var(${tokenToCssVar(block.tokens.borderTop)})]`);
  }

  return classes;
}

function collectDependencies(slots: SlotSpec[]): string[] {
  const deps = new Set<string>();
  function walk(items: SlotSpec[]) {
    for (const slot of items) {
      if (slot.component && slot.component.startsWith('@UI/')) {
        deps.add(slot.component);
      }
      if (slot.children) walk(slot.children);
      if (slot.itemSlots) walk(slot.itemSlots);
    }
  }
  walk(slots);
  return [...deps].sort();
}

function buildBlockContract(block: BlockSpec): Record<string, unknown> {
  const contract: Record<string, unknown> = {
    name: block.name,
    description: block.description || '',
    category: block.category || 'general',
    layout: block.layout,
    sizing: block.sizing,
    tailwindClasses: buildLayoutClasses(block),
    tokens: block.tokens || {},
    slots: block.slots,
    dependencies: collectDependencies(block.slots),
  };

  if (block.padding) contract.padding = block.padding;
  if (block.gap) contract.gap = block.gap;
  if (block.minHeight) contract.minHeight = block.minHeight;
  if (block.dataTheme) contract.dataTheme = block.dataTheme;
  if (block.responsiveRules) contract.responsiveRules = block.responsiveRules;

  return contract;
}

function main() {
  if (!existsSync(BLOCKS_SPEC_PATH)) {
    console.warn('blocks-spec.json not found, skipping block contracts generation.');
    return;
  }

  const spec = JSON.parse(readFileSync(BLOCKS_SPEC_PATH, 'utf-8'));
  const blocks: BlockSpec[] = spec.blocks || [];

  mkdirSync(OUTPUT_DIR, { recursive: true });

  let count = 0;
  for (const block of blocks) {
    if (!block?.name) continue;
    const contract = buildBlockContract(block);
    const safeName = block.name.replace(/^@Block\//, '');
    const outPath = join(OUTPUT_DIR, `${safeName}.block-contract.json`);

    writeFileSync(outPath, JSON.stringify(contract, null, 2), 'utf-8');
    count++;
  }

  console.log(`Wrote ${count} block contracts to ${OUTPUT_DIR}`);
}

main();
