/**
 * spec-to-block-components.ts
 * Reads block contracts and generates React block components + Storybook stories.
 * Blocks are compositions of DS primitives — they import from @ai-ds/core/components.
 *
 * Run after: npm run blocks:generate-contracts
 * Run: npm run blocks:generate-components
 * Output: ../components/blocks/<BlockName>/
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTRACTS_DIR = join(ROOT, 'contracts', 'blocks');
const OUTPUT_DIR = join(ROOT, 'components', 'blocks');

const BANNER = `/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run blocks:generate-components
 */`;

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
  padding?: string | Record<string, string>;
  children?: SlotSpec[];
  itemSlots?: SlotSpec[];
  variants?: Record<string, Record<string, string>>;
}

interface BlockContract {
  name: string;
  description?: string;
  category?: string;
  layout: string;
  sizing?: { width: number | string; height: string };
  tailwindClasses: string[];
  tokens?: Record<string, string>;
  slots: SlotSpec[];
  dependencies: string[];
  padding?: string | Record<string, string>;
  gap?: string;
  minHeight?: string;
  dataTheme?: string;
  responsiveRules?: Array<Record<string, unknown>>;
}

function toPascal(s: string): string {
  return s.replace(/(?:^|[-_/])([a-z0-9])/gi, (_, c: string) => c.toUpperCase());
}

function blockName(fullName: string): string {
  return fullName.replace(/^@Block\//, '');
}

function componentImportName(comp: string): string {
  return comp.replace(/^@UI\//, '').replace(/\//g, '');
}

function tokenToCssVar(t: string): string {
  return '--' + t.replace(/_/g, '-');
}

function collectProps(slots: SlotSpec[], prefix = ''): Array<{ name: string; type: string; optional: boolean; default?: string }> {
  const props: Array<{ name: string; type: string; optional: boolean; default?: string }> = [];
  for (const slot of slots) {
    const propName = prefix ? `${prefix}${toPascal(slot.name)}` : slot.name;

    if (slot.type === 'text') {
      props.push({ name: propName, type: 'string', optional: slot.optional !== false, default: slot.default });
    } else if (slot.repeat) {
      const itemType = slot.component ? `React.ReactNode` : `React.ReactNode`;
      props.push({ name: propName, type: `${itemType}[]`, optional: slot.optional === true });
    } else if (slot.component) {
      props.push({ name: propName, type: 'React.ReactNode', optional: slot.optional === true });
    } else if (slot.children) {
      for (const child of slot.children) {
        const childProps = collectProps([child], '');
        props.push(...childProps);
      }
    } else {
      props.push({ name: propName, type: 'React.ReactNode', optional: slot.optional !== false });
    }
  }
  return props;
}

function generateTypesFile(name: string, contract: BlockContract): string {
  const props = collectProps(contract.slots);
  const lines: string[] = [
    BANNER, '',
    `export interface ${name}Props {`,
  ];

  for (const p of props) {
    const opt = p.optional ? '?' : '';
    lines.push(`  ${p.name}${opt}: ${p.type};`);
  }

  lines.push(`  className?: string;`);
  lines.push(`  children?: React.ReactNode;`);
  lines.push(`}`);

  return lines.join('\n') + '\n';
}

function slotToJsx(slot: SlotSpec, indent: string): string[] {
  const lines: string[] = [];
  const propName = slot.name;

  if (slot.type === 'text') {
    const cls = buildTextClasses(slot);
    lines.push(`${indent}{${propName} != null && <div className="${cls}">{${propName}}</div>}`);
  } else if (slot.repeat) {
    lines.push(`${indent}<div className="flex flex-col ${slot.gap ? `gap-[var(${tokenToCssVar(slot.gap)})]` : 'gap-2'}">`);
    lines.push(`${indent}  {${propName}}`);
    lines.push(`${indent}</div>`);
  } else if (slot.children) {
    const cls = buildContainerClasses(slot);
    lines.push(`${indent}<div className="${cls}">`);
    for (const child of slot.children) {
      lines.push(...slotToJsx(child, indent + '  '));
    }
    lines.push(`${indent}</div>`);
  } else {
    lines.push(`${indent}{${propName}}`);
  }

  return lines;
}

function buildTextClasses(slot: SlotSpec): string {
  const classes: string[] = [];
  if (slot.textStyle === 'Text/Caption/XS') classes.push('text-style-caption-xs');
  else if (slot.textStyle === 'Text/Caption/Base') classes.push('text-style-caption');
  else if (slot.textStyle === 'Text/Body/SM') classes.push('text-style-body-sm');
  else if (slot.textStyle === 'Text/Body/Base') classes.push('text-style-body');
  else if (slot.textStyle === 'Text/Body/LG') classes.push('text-style-body-lg');
  else if (slot.textStyle === 'Text/Heading/H2') classes.push('text-style-h2');
  else if (slot.textStyle === 'Text/Heading/H3') classes.push('text-style-h3');
  if (slot.textColor) classes.push(`text-[var(${tokenToCssVar(slot.textColor)})]`);
  if (slot.fontWeight === 'semibold') classes.push('font-semibold');
  else if (slot.fontWeight === 'medium') classes.push('font-medium');
  if (slot.textAlign === 'center') classes.push('text-center');
  return classes.join(' ');
}

function buildContainerClasses(slot: SlotSpec): string {
  const classes: string[] = [];
  if (slot.layout === 'horizontal') {
    classes.push('flex', 'items-center');
    if (slot.justify === 'between') classes.push('justify-between');
    else if (slot.justify === 'end') classes.push('justify-end');
  } else if (slot.layout === 'vertical') {
    classes.push('flex', 'flex-col');
  }
  if (slot.gap) classes.push(`gap-[var(${tokenToCssVar(slot.gap)})]`);
  if (slot.grow) classes.push('flex-1');
  if (slot.align === 'center') classes.push('items-center');
  if (slot.align === 'baseline') classes.push('items-baseline');
  if (slot.maxWidth) classes.push(`max-w-[${slot.maxWidth}px]`);
  if (slot.padding) {
    if (typeof slot.padding === 'string') {
      classes.push(`p-[var(${tokenToCssVar(slot.padding)})]`);
    } else {
      if (slot.padding.x) classes.push(`px-[var(${tokenToCssVar(slot.padding.x)})]`);
      if (slot.padding.y) classes.push(`py-[var(${tokenToCssVar(slot.padding.y)})]`);
    }
  }
  return classes.join(' ');
}

function generateComponentFile(name: string, contract: BlockContract): string {
  const props = collectProps(contract.slots);
  const lines: string[] = [BANNER, ''];

  lines.push(`import React from 'react';`);
  lines.push(`import type { ${name}Props } from './${name}.types';`);
  lines.push('');

  const rootClasses = contract.tailwindClasses.join(' ');
  const dataThemeAttr = contract.dataTheme ? ` data-theme="${contract.dataTheme}"` : '';
  const styleAttrs: string[] = [];
  if (contract.tokens?.elevation) {
    styleAttrs.push(`boxShadow: 'var(${tokenToCssVar(contract.tokens.elevation)})'`);
  }
  const styleStr = styleAttrs.length > 0 ? ` style={{ ${styleAttrs.join(', ')} }}` : '';

  const propNames = props.map(p => p.name);
  const defaultValues = props.filter(p => p.default).map(p => `${p.name} = '${p.default}'`);
  const destructured = props.map(p => {
    if (p.default) return `${p.name} = '${p.default}'`;
    return p.name;
  });

  lines.push(`export const ${name}: React.FC<${name}Props> = ({`);
  for (const d of destructured) {
    lines.push(`  ${d},`);
  }
  lines.push(`  className,`);
  lines.push(`  children,`);
  lines.push(`}) => {`);
  lines.push(`  return (`);
  lines.push(`    <div className={\`${rootClasses}\${className ? ' ' + className : ''}\`}${dataThemeAttr}${styleStr}>`);

  for (const slot of contract.slots) {
    const slotLines = slotToJsx(slot, '      ');
    lines.push(...slotLines);
  }

  lines.push(`      {children}`);
  lines.push(`    </div>`);
  lines.push(`  );`);
  lines.push(`};`);
  lines.push('');
  lines.push(`export default ${name};`);
  lines.push('');

  return lines.join('\n');
}

function generateStoryFile(name: string, contract: BlockContract): string {
  const lines: string[] = [
    BANNER, '',
    `import type { Meta, StoryObj } from '@storybook/react';`,
    `import { ${name} } from './${name}';`,
    '',
    `const meta: Meta<typeof ${name}> = {`,
    `  title: 'Blocks/${name}',`,
    `  component: ${name},`,
    `  parameters: {`,
    `    layout: 'padded',`,
    `  },`,
    `};`,
    '',
    `export default meta;`,
    `type Story = StoryObj<typeof ${name}>;`,
    '',
    `export const Default: Story = {`,
    `  args: {},`,
    `};`,
    '',
  ];

  return lines.join('\n');
}

function generateIndexFile(name: string): string {
  return [
    BANNER, '',
    `export { ${name} } from './${name}';`,
    `export type { ${name}Props } from './${name}.types';`,
    '',
  ].join('\n');
}

function main() {
  if (!existsSync(CONTRACTS_DIR)) {
    console.warn(`Block contracts directory not found: ${CONTRACTS_DIR}. Run blocks:generate-contracts first.`);
    return;
  }

  const files = readdirSync(CONTRACTS_DIR).filter(f => f.endsWith('.block-contract.json'));
  if (files.length === 0) {
    console.warn('No block contracts found.');
    return;
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });

  let count = 0;
  const exportLines: string[] = [BANNER, ''];

  for (const file of files) {
    const contract: BlockContract = JSON.parse(readFileSync(join(CONTRACTS_DIR, file), 'utf-8'));
    const name = blockName(contract.name);
    const dir = join(OUTPUT_DIR, name);
    mkdirSync(dir, { recursive: true });

    writeFileSync(join(dir, `${name}.types.ts`), generateTypesFile(name, contract), 'utf-8');
    writeFileSync(join(dir, `${name}.tsx`), generateComponentFile(name, contract), 'utf-8');
    writeFileSync(join(dir, `${name}.stories.tsx`), generateStoryFile(name, contract), 'utf-8');
    writeFileSync(join(dir, 'index.ts'), generateIndexFile(name), 'utf-8');

    exportLines.push(`export { ${name} } from './${name}';`);
    exportLines.push(`export type { ${name}Props } from './${name}';`);

    count++;
  }

  writeFileSync(join(OUTPUT_DIR, 'index.ts'), exportLines.join('\n') + '\n', 'utf-8');

  console.log(`Generated ${count} block components in ${OUTPUT_DIR}`);
}

main();
