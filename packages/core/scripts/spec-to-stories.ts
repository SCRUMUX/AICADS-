/**
 * spec-to-stories.ts
 * Reads contracts (with structural info) and generates comprehensive
 * Storybook stories including slot combinations, variant matrix,
 * interactive states, and real icons from the generated icon barrel.
 *
 * Run after: npm run components:generate
 * Run: npm run stories:generate
 * Output: ../components/primitives/<ComponentName>/<Component>.stories.tsx
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTRACTS_DIR = join(ROOT, 'contracts', 'components');
const OUTPUT_DIR = join(ROOT, 'components', 'primitives');
const ICONS_INDEX = join(ROOT, 'components', 'icons', 'index.tsx');
const TEMPLATES_DIR = join(__dirname, 'templates');

const BANNER = `/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run stories:generate
 */`;

interface Slot {
  name: string;
  type: string;
  optional?: boolean;
  default?: string;
  children?: Slot[];
  collapsible?: boolean;
  visibleWhen?: string;
}

interface BooleanProp {
  name: string;
  controls: string;
  default: boolean;
}

interface TextProp {
  name: string;
  default: string;
}

interface Contract {
  name: string;
  description?: string;
  variantProps?: string[];
  variantAxes?: Record<string, string[]>;
  stateMachine?: { stateAxis?: string; states: string[] };
  slots?: Slot[];
  booleanProps?: BooleanProp[];
  textProps?: TextProp[];
  htmlInput?: boolean;
  inputType?: string;
  customStructure?: string;
  composite?: boolean;
  defaultContent?: string;
  element?: string;
  /** Generator strategy: 'preserve' skips, 'generate' uses codegen, 'template' uses template files */
  generatorStrategy?: 'preserve' | 'generate' | 'template';
  /** Template name when generatorStrategy is 'template' */
  template?: string;
  manualImplementation?: boolean;
}

function toPascal(s: string): string {
  return s.replace(/(?:^|[-_/])([a-z0-9])/gi, (_, c) => c.toUpperCase());
}
function toCamel(s: string): string {
  const p = toPascal(s);
  return p.slice(0, 1).toLowerCase() + p.slice(1);
}
function componentDir(name: string): string {
  return name.replace(/^@UI\//, '').replace(/\//g, '-').replace(/-/g, '');
}

const ICON_NAMES_FOR_ROLES: Record<string, string> = {
  iconLeft: 'SearchIcon',
  iconRight: 'ChevronRightIcon',
  iconLeft1: 'BellIcon',
  iconLeft2: 'GearIcon',
  chevron: 'CaretUpFillIcon',
  closeButton: 'CloseXIcon',
  closeIcon: 'CloseXIcon',
  icon: 'SearchIcon',
  actionIcon: 'PencilIcon',
  sortIcon: 'ChevronDownIcon',
};

const ICON_MAPPING_POOL = ['SearchIcon', 'BellIcon', 'GearIcon', 'AicaIcon', 'ChevronRightIcon', 'CloseXIcon'] as const;

interface InstanceSlotInfo {
  slotName: string;
  importComponent: string;
  importPath: string;
  jsx: string;
}

const INSTANCE_SLOT_MAP: Record<string, Omit<InstanceSlotInfo, 'slotName'>> = {
  badge:           { importComponent: 'Badge',    importPath: '../Badge/Badge',       jsx: `<Badge appearance="outline" size="sm">5</Badge>` },
  badge1:          { importComponent: 'Badge',    importPath: '../Badge/Badge',       jsx: `<Badge appearance="outline" size="sm">1</Badge>` },
  badge2:          { importComponent: 'Badge',    importPath: '../Badge/Badge',       jsx: `<Badge appearance="success" size="sm">2</Badge>` },
  badge3:          { importComponent: 'Badge',    importPath: '../Badge/Badge',       jsx: `<Badge appearance="warning" size="sm">3</Badge>` },
  trailingBadge:   { importComponent: 'Badge',    importPath: '../Badge/Badge',       jsx: `<Badge appearance="outline" size="sm">5</Badge>` },
  tagRow:          { importComponent: 'Tag',      importPath: '../Tag/Tag',           jsx: `<><Tag appearance="base" size="sm">Tag 1</Tag><Tag appearance="base" size="sm">Tag 2</Tag></>` },
  checkbox:        { importComponent: 'Checkbox', importPath: '../Checkbox/Checkbox', jsx: `<Checkbox size="sm" />` },
  leadingCheckbox: { importComponent: 'Checkbox', importPath: '../Checkbox/Checkbox', jsx: `<Checkbox size="sm" />` },
  leadingAvatar:   { importComponent: 'Avatar',   importPath: '../Avatar/Avatar',     jsx: `<Avatar size="sm" />` },
  trailingAction:  { importComponent: 'Button',   importPath: '../Button/Button',     jsx: `<Button appearance="ghost" size="sm">Action</Button>` },
  ctaButton:       { importComponent: 'Button',   importPath: '../Button/Button',     jsx: `<Button appearance="brand" size="sm">OK</Button>` },
  secondaryButton: { importComponent: 'Button',   importPath: '../Button/Button',     jsx: `<Button appearance="ghost" size="sm">Cancel</Button>` },
  confirmButton:   { importComponent: 'Button',   importPath: '../Button/Button',     jsx: `<Button appearance="brand" size="sm">Confirm</Button>` },
  cancelButton:    { importComponent: 'Button',   importPath: '../Button/Button',     jsx: `<Button appearance="ghost" size="sm">Cancel</Button>` },
};

const COMPONENT_ICON_OVERRIDES: Record<string, Record<string, string>> = {
  '@UI/Accordion': { iconLeft1: 'AicaIcon', iconLeft2: 'AicaIcon' },
};

function getIconForSlot(slotName: string, componentName?: string): string {
  const overrides = componentName && COMPONENT_ICON_OVERRIDES[componentName];
  if (overrides && overrides[slotName]) return overrides[slotName];
  return ICON_NAMES_FOR_ROLES[slotName] || 'SearchIcon';
}

function hasCollapsibleContent(slots: Slot[]): boolean {
  for (const s of slots) {
    if (s.collapsible) return true;
    if (s.children && hasCollapsibleContent(s.children)) return true;
  }
  return false;
}

function generateStory(c: Contract): string {
  const dir = componentDir(c.name);
  const pascal = toPascal(dir);
  const axes = c.variantAxes || {};
  const stateAxis = c.stateMachine?.stateAxis;
  const isInput = !!c.htmlInput;
  const isComposite = !!c.composite;
  const slots = c.slots || [];
  const boolProps = c.booleanProps || [];
  const textProps = c.textProps || [];

  const allIconSlots: Slot[] = [];
  const allInstanceSlots: Slot[] = [];
  function collectSlots(sl: Slot[]) {
    for (const s of sl) {
      if (s.type === 'icon') allIconSlots.push(s);
      if (s.type === 'component' && INSTANCE_SLOT_MAP[s.name]) allInstanceSlots.push(s);
      if (s.children) collectSlots(s.children);
    }
  }
  collectSlots(slots);

  const hasIcons = allIconSlots.length > 0;
  const hasInstances = allInstanceSlots.length > 0;
  const hasCollapsible = hasCollapsibleContent(slots);
  const collapsibleStateAxis = hasCollapsible
    ? (c.variantProps || []).find(p => axes[p]?.includes('open') && axes[p]?.includes('closed'))
    : undefined;
  const labelDefault = textProps.find(t => t.name === 'label')?.default;
  const defaultLabel = hasCollapsible
    ? (labelDefault ?? pascal)
    : (c.defaultContent || labelDefault || pascal);

  const usedIcons = new Set<string>();
  for (const is of allIconSlots) {
    usedIcons.add(getIconForSlot(is.name, c.name));
  }

  const instanceImports = new Map<string, string>();
  for (const is of allInstanceSlots) {
    const info = INSTANCE_SLOT_MAP[is.name];
    if (info && !instanceImports.has(info.importComponent)) {
      instanceImports.set(info.importComponent, info.importPath);
    }
  }

  const argTypes: string[] = [];
  for (const [axis, values] of Object.entries(axes)) {
    argTypes.push(`    ${toCamel(axis)}: { control: 'select', options: ${JSON.stringify(values)} },`);
  }
  for (const bp of boolProps) {
    argTypes.push(`    ${bp.name}: { control: 'boolean' },`);
  }
  for (const is of allIconSlots) {
    argTypes.push(`    ${is.name}: { options: ICON_KEYS, mapping: ICON_MAP, control: { type: 'select' } },`);
  }
  for (const is of allInstanceSlots) {
    argTypes.push(`    ${is.name}: { control: false },`);
  }
  const mainTextNames = new Set(['label', 'content', 'hint']);
  const htmlInputTextNames = new Set(['placeholder', 'value', 'defaultValue']);
  for (const tp of textProps) {
    if (mainTextNames.has(tp.name) && !hasCollapsible) continue;
    if (tp.name === 'content' && hasCollapsible) {
      argTypes.push(`    content: { control: 'text' },`);
      continue;
    }
    if (mainTextNames.has(tp.name)) continue;
    if (isInput && htmlInputTextNames.has(tp.name)) continue;
    argTypes.push(`    ${tp.name}: { control: 'text' },`);
  }

  const defaultArgs: Record<string, string> = {};
  for (const [axis, values] of Object.entries(axes)) {
    if (axis === stateAxis) continue;
    if (axis === collapsibleStateAxis) continue;
    defaultArgs[toCamel(axis)] = values[0];
  }
  const defaultArgStr = Object.entries(defaultArgs).map(([k, v]) => `${k}: '${v}'`).join(', ');

  const childProp = isInput
    ? `placeholder: '${defaultLabel}'`
    : `children: '${defaultLabel}'`;

  const iconStyleForSlot = (slotName: string) =>
    (c as { iconButtonsInHeader?: string[] }).iconButtonsInHeader?.includes(slotName)
      ? "style={{ width: '100%', height: '100%' }}"
      : "style={{ width: '1em', height: '1em' }}";
  const iconArgsForDefault = allIconSlots
    .filter(s => !s.optional || boolProps.some(b => b.controls === s.name))
    .map(s => `${s.name}: <${getIconForSlot(s.name, c.name)} ${iconStyleForSlot(s.name)} />`)
    .join(', ');

  const showArgsForDefault = boolProps
    .filter(bp =>
      allIconSlots.some(s => s.name === bp.controls) ||
      allInstanceSlots.some(s => s.name === bp.controls)
    )
    .map(bp => `${bp.name}: true`)
    .join(', ');

  const instanceArgsForDefault = allInstanceSlots
    .filter(s => !s.optional || boolProps.some(b => b.controls === s.name))
    .map(s => `${s.name}: ${INSTANCE_SLOT_MAP[s.name].jsx}`)
    .join(', ');

  const contentArg = hasCollapsible
    ? `, content: '${(textProps.find(t => t.name === 'content')?.default || 'Content text...').replace(/'/g, "\\'")}'`
    : '';

  const compositeArgs = isComposite
    ? `, items: [{ label: 'Option 1' }, { label: 'Option 2' }, { label: 'Option 3', danger: true }]`
    : '';

  const allMappingIcons = new Set<string>([...usedIcons]);
  if (hasIcons) {
    for (const n of ICON_MAPPING_POOL) allMappingIcons.add(n);
  }

  const iconImport = allMappingIcons.size > 0
    ? `import { ${[...allMappingIcons].join(', ')} } from '../../icons';\n`
    : '';

  const instanceImportLines: string[] = [];
  for (const [comp, path] of instanceImports) {
    instanceImportLines.push(`import { ${comp} } from '${path}';`);
  }
  const instanceImport = instanceImportLines.length > 0
    ? instanceImportLines.join('\n') + '\n'
    : '';

  const iconMapConst = hasIcons
    ? `\nconst ICON_MAP: Record<string, React.ReactNode> = {\n  none: undefined as unknown as React.ReactNode,\n${[...ICON_MAPPING_POOL].map(n => `  ${n}: <${n} style={{ width: '1em', height: '1em' }} />,`).join('\n')}\n};\nconst ICON_KEYS = Object.keys(ICON_MAP);\n`
    : '';

  let story = `${BANNER}
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ${pascal} } from './${pascal}';
${iconImport}${instanceImport}${iconMapConst}
const meta: Meta<typeof ${pascal}> = {
  title: 'Primitives/${pascal}',
  component: ${pascal},
  parameters: {
    docs: { description: { component: ${JSON.stringify(c.description || pascal)} } },
  },
  argTypes: {
${argTypes.join('\n')}
  },
};
export default meta;
type Story = StoryObj<typeof ${pascal}>;

export const Default: Story = {
  args: { ${childProp}, ${defaultArgStr}${iconArgsForDefault ? ', ' + iconArgsForDefault : ''}${instanceArgsForDefault ? ', ' + instanceArgsForDefault : ''}${showArgsForDefault ? ', ' + showArgsForDefault : ''}${contentArg}${compositeArgs} },
};
`;

  // Boolean prop toggle stories (all on / all off)
  if (boolProps.length > 0 && (hasIcons || hasInstances)) {
    const allOn = boolProps.map(bp => `${bp.name}: true`).join(', ');
    const allIconArgs = allIconSlots.map(s => `${s.name}: <${getIconForSlot(s.name, c.name)} ${iconStyleForSlot(s.name)} />`).join(', ');
    const allInstanceArgs = allInstanceSlots.map(s => `${s.name}: ${INSTANCE_SLOT_MAP[s.name].jsx}`).join(', ');
    const combinedSlotArgs = [allIconArgs, allInstanceArgs].filter(Boolean).join(', ');
    story += `
export const AllSlotsVisible: Story = {
  args: { ${childProp}, ${defaultArgStr}, ${allOn}, ${combinedSlotArgs}${contentArg}${compositeArgs} },
};
`;
  }

  // AllAppearances
  const appearances = axes.appearance;
  if (appearances && appearances.length > 1) {
    const hasGhostAppearance = appearances.some((a: string) => a.includes('ghost'));
    const wrapperStyle = hasGhostAppearance
      ? `display: 'flex', flexWrap: 'wrap' as const, gap: 12, alignItems: 'center', padding: 16, background: 'var(--color-surface-2, #f5f5f5)', borderRadius: 8`
      : `display: 'flex', flexWrap: 'wrap' as const, gap: 12, alignItems: 'center'`;
    story += `
export const AllAppearances: Story = {
  render: (args) => (
    <div style={{ ${wrapperStyle} }}>
      {${JSON.stringify(appearances)}.map((a) => (
        <${pascal} key={a} {...args} appearance={a as any}>${isInput ? '' : '{a}'}</${pascal}>
      ))}
    </div>
  ),
  args: { ${defaultArgStr}${iconArgsForDefault ? ', ' + iconArgsForDefault : ''}${instanceArgsForDefault ? ', ' + instanceArgsForDefault : ''}${showArgsForDefault ? ', ' + showArgsForDefault : ''}${contentArg}${compositeArgs} },
};
`;
  }

  // AllSizes
  const sizes = axes.size;
  if (sizes && sizes.length > 1) {
    story += `
export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {${JSON.stringify(sizes)}.map((s) => (
        <${pascal} key={s} {...args} size={s as any}>${isInput ? '' : '{s}'}</${pascal}>
      ))}
    </div>
  ),
  args: { ${defaultArgStr}${iconArgsForDefault ? ', ' + iconArgsForDefault : ''}${instanceArgsForDefault ? ', ' + instanceArgsForDefault : ''}${showArgsForDefault ? ', ' + showArgsForDefault : ''}${contentArg}${compositeArgs} },
};
`;
  }

  // AllStates
  if (stateAxis && axes[stateAxis]) {
    const states = axes[stateAxis];
    story += `
export const AllStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {${JSON.stringify(states)}.map((st) => (
        <${pascal} key={st} {...args} ${toCamel(stateAxis)}={st as any}>${isInput ? '' : '{st}'}</${pascal}>
      ))}
    </div>
  ),
  args: { ${defaultArgStr}${iconArgsForDefault ? ', ' + iconArgsForDefault : ''}${instanceArgsForDefault ? ', ' + instanceArgsForDefault : ''}${showArgsForDefault ? ', ' + showArgsForDefault : ''}${contentArg}${compositeArgs} },
};
`;
  }

  // VariantMatrix: appearance x size
  if (appearances && appearances.length > 1 && sizes && sizes.length > 1) {
    story += `
export const VariantMatrix: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(${sizes.length}, auto)', gap: 8, alignItems: 'center' }}>
      {${JSON.stringify(appearances)}.flatMap((a) =>
        ${JSON.stringify(sizes)}.map((s) => (
          <${pascal} key={a + s} {...args} appearance={a as any} size={s as any}>${isInput ? '' : `{a + ' ' + s}`}</${pascal}>
        ))
      )}
    </div>
  ),
  args: { ${defaultArgStr}${iconArgsForDefault ? ', ' + iconArgsForDefault : ''}${instanceArgsForDefault ? ', ' + instanceArgsForDefault : ''}${showArgsForDefault ? ', ' + showArgsForDefault : ''}${contentArg}${compositeArgs} },
};
`;
  }

  // AllStatesMatrix: appearance x state
  if (appearances && appearances.length > 1 && stateAxis && axes[stateAxis] && axes[stateAxis].length > 1) {
    const states = axes[stateAxis];
    const hasGhost = appearances.some((a: string) => a.includes('ghost'));
    const wrapperBg = hasGhost ? `padding: 16, background: 'var(--color-surface-2, #f5f5f5)', borderRadius: 8, ` : '';
    story += `
export const AllStatesMatrix: Story = {
  render: (args) => (
    <div style={{ ${wrapperBg}display: 'grid', gridTemplateColumns: 'repeat(${states.length}, auto)', gap: 8, alignItems: 'center' }}>
      {${JSON.stringify(appearances)}.flatMap((a) =>
        ${JSON.stringify(states)}.map((st) => (
          <${pascal} key={a + st} {...args} appearance={a as any} ${toCamel(stateAxis)}={st as any}>${isInput ? '' : `{a + ' ' + st}`}</${pascal}>
        ))
      )}
    </div>
  ),
  args: { ${defaultArgStr}${iconArgsForDefault ? ', ' + iconArgsForDefault : ''}${instanceArgsForDefault ? ', ' + instanceArgsForDefault : ''}${showArgsForDefault ? ', ' + showArgsForDefault : ''}${contentArg}${compositeArgs} },
};
`;
  }

  // Other variant axes
  for (const [axis, values] of Object.entries(axes)) {
    if (['appearance', 'size', 'state', 'interaction'].includes(axis)) continue;
    if (axis === stateAxis) continue;
    if (values.length < 2) continue;
    const storyName = `All${toPascal(axis)}s`;
    story += `
export const ${storyName}: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {${JSON.stringify(values.map(String))}.map((v) => (
        <${pascal} key={v} {...args} ${toCamel(axis)}={v as any}>${isInput ? '' : '{v}'}</${pascal}>
      ))}
    </div>
  ),
  args: { ${defaultArgStr}${iconArgsForDefault ? ', ' + iconArgsForDefault : ''}${instanceArgsForDefault ? ', ' + instanceArgsForDefault : ''}${showArgsForDefault ? ', ' + showArgsForDefault : ''}${contentArg}${compositeArgs} },
};
`;
  }

  return story;
}

function main() {
  if (!existsSync(ICONS_INDEX)) {
    console.warn('Icons barrel not found. Run npm run icons:generate first.');
  }

  const files = readdirSync(CONTRACTS_DIR, { withFileTypes: true })
    .filter(f => f.isFile() && f.name.endsWith('.contract.json'))
    .map(f => f.name);

  let count = 0;
  let skipped = 0;
  let templated = 0;
  for (const file of files) {
    const c: Contract = JSON.parse(readFileSync(join(CONTRACTS_DIR, file), 'utf-8'));

    if (c.generatorStrategy === 'preserve' || c.manualImplementation) {
      console.log(`  ⏭  Skipping ${c.name} stories (manualImplementation — generatorStrategy: preserve)`);
      skipped++;
      continue;
    }

    const dir = componentDir(c.name);
    const pascal = toPascal(dir);
    const outDir = join(OUTPUT_DIR, dir);
    mkdirSync(outDir, { recursive: true });

    if (c.generatorStrategy === 'template') {
      const templateName = c.template || pascal;
      const templateStoryPath = join(TEMPLATES_DIR, `${templateName}.template.stories.tsx`);
      if (existsSync(templateStoryPath)) {
        const templateContent = readFileSync(templateStoryPath, 'utf-8');
        writeFileSync(join(outDir, `${pascal}.stories.tsx`), templateContent, 'utf-8');
        templated++;
        count++;
        continue;
      }
      console.log(`  ⚠  Template story not found for ${c.name}, falling back to standard generation`);
    }

    writeFileSync(join(outDir, `${pascal}.stories.tsx`), generateStory(c), 'utf-8');
    count++;
  }

  console.log(`Generated ${count} story file(s) (${templated} from templates), skipped ${skipped} manual → ${OUTPUT_DIR}`);
}

main();
