/**
 * spec-to-components.ts
 * Reads contracts (generated from spec + structures) and produces
 * React component files that reflect the full visual structure from Figma.
 *
 * Enhanced generator — imports shared utilities (_shared), wires hooks,
 * renders proper behavioral templates for composite / custom components.
 *
 * Run after: npm run contracts:generate
 * Run: npm run components:generate
 * Output: ../components/primitives/<ComponentName>/
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTRACTS_DIR = join(ROOT, 'contracts', 'components');
const OUTPUT_DIR = join(ROOT, 'components', 'primitives');
const HASHES_FILE = join(ROOT, '.component-hashes.json');

const BANNER = `/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */`;

/* ── Contract types ── */

interface Slot {
  name: string;
  figmaName?: string;
  type: string;
  optional?: boolean;
  defaultVisible?: boolean;
  sizing?: string;
  default?: string;
  component?: string;
  layout?: string;
  children?: Slot[];
  collapsible?: boolean;
  slotCount?: number;
  slotComponent?: string;
  visibleWhen?: string;
}

interface BooleanProp {
  name: string;
  figmaName?: string;
  controls: string;
  default: boolean;
}

interface InstanceSwapProp {
  name: string;
  figmaName?: string;
  slot: string;
  role: string;
}

interface TextPropDef {
  name: string;
  figmaName?: string;
  default: string;
}

interface VariantRule {
  when: Record<string, string>;
  style: Record<string, string | number | boolean>;
  tailwindClasses: string[];
}

interface Contract {
  name: string;
  description?: string;
  variantProps?: string[];
  variantAxes?: Record<string, string[]>;
  variantRules?: VariantRule[];
  stateMachine?: { stateAxis?: string; states: string[] };
  focusRing?: string;
  focusRingDanger?: string;
  responsiveProps?: Record<string, Record<string, string>>;
  element?: string;
  rootLayout?: string;
  rootSizing?: { main: string; cross: string };
  rootAlign?: { main: string; cross: string };
  htmlInput?: boolean;
  inputType?: string;
  composite?: boolean;
  customStructure?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  sizeHeightMap?: Record<string, string>;
  slots?: Slot[];
  booleanProps?: BooleanProp[];
  instanceSwapProps?: InstanceSwapProp[];
  textProps?: TextPropDef[];
  conditionalSlots?: Record<string, unknown>;
  styleKeys?: string[];
  defaultContent?: string;
  heightConstraint?: 'fixed' | 'hug';
  borderWidthToken?: string;
  iconSizeMap?: Record<string, number>;
  clipsContent?: boolean;
  stateSwappedIconSlots?: Record<string, { open: string; closed: string }>;
  iconButtonsInHeader?: string[];
  /** Generator strategy: 'preserve' skips, 'generate' uses standard codegen, 'template' uses template files */
  generatorStrategy?: 'preserve' | 'generate' | 'template';
  /** Template file name (without extension) when generatorStrategy is 'template' */
  template?: string;
  manualImplementation?: boolean;
  /** Declarative enhancements the generator should wire in */
  enhancements?: string[];
}

/* ── Helpers ── */

function toPascal(s: string): string {
  return s.replace(/(?:^|[-_/])([a-z0-9])/gi, (_, c) => c.toUpperCase());
}
function toCamel(s: string): string {
  const p = toPascal(s);
  return p.slice(0, 1).toLowerCase() + p.slice(1);
}
function safeName(compName: string): string {
  return compName.replace(/^@UI\//, '').replace(/\//g, '-');
}
function componentDir(compName: string): string {
  return compName.replace(/^@UI\//, '').replace(/\//g, '-').replace(/-/g, '');
}
function tokenToCssVar(t: string): string {
  return '--' + t.replace(/_/g, '-');
}
function has(c: Contract, enhancement: string): boolean {
  return c.enhancements?.includes(enhancement) ?? false;
}

function rootClasses(c: Contract): string[] {
  const cls: string[] = ['transition-colors', 'duration-150', 'font-base', 'box-border'];
  if (c.rootLayout === 'horizontal') cls.push('flex', 'flex-row');
  else if (c.rootLayout === 'vertical') cls.push('flex', 'flex-col');
  else if (c.rootLayout === 'dynamic') cls.push('flex');

  if (c.rootAlign) {
    const main = c.rootAlign.main;
    const cross = c.rootAlign.cross;
    if (main === 'center') cls.push('justify-center');
    else if (main === 'start') cls.push('justify-start');
    else if (main === 'end') cls.push('justify-end');
    else if (main === 'space-between') cls.push('justify-between');
    if (cross === 'center') cls.push('items-center');
    else if (cross === 'start') cls.push('items-start');
    else if (cross === 'end') cls.push('items-end');
  }

  if (c.rootSizing?.main === 'hug') { /* default */ }
  else if (c.rootSizing?.main === 'fill') cls.push('flex-1');

  if (c.borderWidthToken) {
    cls.push(`border-[var(${tokenToCssVar(c.borderWidthToken)})]`);
    cls.push('border-solid');
  }

  if (c.defaultWidth) {
    cls.push(`w-[${c.defaultWidth}px]`);
  }

  if (c.clipsContent) {
    cls.push('overflow-hidden');
  }

  const sk = c.styleKeys || [];
  if (sk.includes('trackBg')) cls.push('bg-[var(--track-bg,transparent)]');
  if (sk.includes('trackColor')) cls.push('bg-[var(--track-color,transparent)]');
  if (sk.includes('fillColor') && !sk.includes('trackBg')) cls.push('[--fill:var(--fill-color)]');
  if (sk.includes('underlineColor')) cls.push('[&>*]:decoration-[var(--underline-color)]');

  const bps = c.booleanProps || [];
  if (bps.some(b => b.name === 'showTopBorder')) cls.push('relative');

  return cls;
}

function getElement(c: Contract): string {
  const el = c.element || 'div';
  if (el === 'button') return 'button';
  if (el === 'a') return 'a';
  if (el === 'span') return 'span';
  if (el === 'nav') return 'nav';
  return 'div';
}

function getRefType(el: string): string {
  if (el === 'button') return 'HTMLButtonElement';
  if (el === 'a') return 'HTMLAnchorElement';
  if (el === 'span') return 'HTMLSpanElement';
  if (el === 'nav') return 'HTMLElement';
  return 'HTMLDivElement';
}

function getHtmlAttrs(el: string): string {
  if (el === 'button') return 'React.ButtonHTMLAttributes<HTMLButtonElement>';
  if (el === 'a') return 'React.AnchorHTMLAttributes<HTMLAnchorElement>';
  if (el === 'span') return 'React.HTMLAttributes<HTMLSpanElement>';
  return 'React.HTMLAttributes<HTMLDivElement>';
}

const TEXT_STYLE_MAP: Record<string, string> = {
  'Text/Caption/XS': 'text-style-caption-xs',
  'Text/Caption/Base': 'text-style-caption',
  'Text/Body/SM': 'text-style-body-sm',
  'Text/Body/Base': 'text-style-body',
  'Text/Body/Strong': 'text-style-body-strong',
  'Text/Body/LG': 'text-style-body-lg',
  'Text/Heading/H4': 'text-style-h4',
  'Text/Heading/H3': 'text-style-h3',
  'Text/Heading/H2': 'text-style-h2',
  'Text/Heading/H1': 'text-style-h1',
  'Text/Display': 'text-style-display',
  'Text/Mono': 'text-style-mono',
};

const TEXT_SLOT_CLASS_MAP: Record<string, string> = {
  title: 'titleTextCls',
  subtitle: 'subtitleTextCls',
  description: 'descTextCls',
  paragraph: 'paragraphTextCls',
};

/* ── Analysis helpers ── */

function hasCollapsibleContent(slots: Slot[]): boolean {
  for (const s of slots) {
    if (s.collapsible) return true;
    if (s.children && hasCollapsibleContent(s.children)) return true;
  }
  return false;
}

function findCollapsibleSlot(slots: Slot[]): Slot | undefined {
  for (const s of slots) {
    if (s.collapsible) return s;
    if (s.children) {
      const found = findCollapsibleSlot(s.children);
      if (found) return found;
    }
  }
  return undefined;
}

function hasCompositePopover(slots: Slot[]): boolean {
  return slots.some(s => s.visibleWhen || s.name === 'popover' || s.name === 'submenu');
}

function hasIconSlots(slots: Slot[]): boolean {
  for (const s of slots) {
    if (s.type === 'icon') return true;
    if (s.children && hasIconSlots(s.children)) return true;
  }
  return false;
}

/* ── Size classes from responsiveProps ── */

function generateSizeClasses(c: Contract, pascal: string): string {
  const sizeAxis = c.variantAxes?.size;
  if (!sizeAxis || sizeAxis.length === 0) return '';
  const rp = c.responsiveProps;
  if (!rp) return '';

  const sizeType = `${pascal}Size`;
  const heightFixed = c.heightConstraint === 'fixed';
  const iconSizeMap = c.iconSizeMap;
  const lines: string[] = [`const SIZE_CLASSES: Record<${sizeType}, string> = {`];
  for (const s of sizeAxis) {
    const parts: string[] = [];
    const px = rp.paddingX?.[s]; if (px) parts.push(`px-[var(${tokenToCssVar(px)})]`);
    const py = rp.paddingY?.[s]; if (py) parts.push(`py-[var(${tokenToCssVar(py)})]`);
    const mh = rp.minHeight?.[s]; if (mh) {
      parts.push(`min-h-[var(${tokenToCssVar(mh)})]`);
      if (heightFixed) parts.push(`max-h-[var(${tokenToCssVar(mh)})]`);
    }
    const mw = rp.minWidth?.[s]; if (mw) {
      parts.push(`min-w-[var(${tokenToCssVar(mw)})]`);
    } else if (heightFixed && mh) {
      parts.push(`min-w-[var(${tokenToCssVar(mh)})]`);
    }
    const xw = rp.maxWidth?.[s]; if (xw) parts.push(`max-w-[var(${tokenToCssVar(xw)})]`);
    const g = rp.gap?.[s]; if (g) parts.push(`gap-[var(${tokenToCssVar(g)})]`);
    const ts = rp.textStyle?.[s]; if (ts && TEXT_STYLE_MAP[ts]) parts.push(TEXT_STYLE_MAP[ts]);
    const br = rp.borderRadius?.[s]; if (br) parts.push(`rounded-[var(${tokenToCssVar(br)})]`);
    const bs = rp.boxSize?.[s]; if (bs) { parts.push(`w-[var(${tokenToCssVar(bs)})]`); parts.push(`h-[var(${tokenToCssVar(bs)})]`); }
    const tw = rp.trackW?.[s]; if (tw) parts.push(`w-[var(${tokenToCssVar(tw)})]`);
    const th = rp.trackH?.[s]; if (th) parts.push(`h-[var(${tokenToCssVar(th)})]`);
    const ts2 = rp.thumbSize?.[s]; if (ts2) parts.push(`[--thumb-size:var(${tokenToCssVar(ts2)})]`);
    const is2 = rp.iconSize?.[s]; if (is2) parts.push(`[--icon-size:var(${tokenToCssVar(is2)})]`);
    if (!rp.iconSize?.[s] && iconSizeMap && iconSizeMap[s]) {
      parts.push(`[--icon-size:${iconSizeMap[s]}px]`);
    }
    lines.push(`  ${s}: '${parts.join(' ')}',`);
  }
  lines.push('};');

  const hasContentText = rp.contentTextStyle && Object.keys(rp.contentTextStyle).length > 0;
  if (hasContentText) {
    lines.push('');
    lines.push(`const CONTENT_TEXT_MAP: Record<${sizeType}, string> = {`);
    for (const s of sizeAxis) {
      const cts = rp.contentTextStyle?.[s];
      const cls = cts && TEXT_STYLE_MAP[cts] ? TEXT_STYLE_MAP[cts] : '';
      lines.push(`  ${s}: '${cls}',`);
    }
    lines.push('};');
  }

  return lines.join('\n');
}

/* ── Recursive slot extraction for props ── */

function collectNodeSlots(slots: Slot[]): Slot[] {
  const result: Slot[] = [];
  for (const s of slots) {
    if (s.type === 'icon' || s.type === 'component') result.push(s);
    if (s.children) result.push(...collectNodeSlots(s.children));
  }
  return result;
}

function collectTextSlots(slots: Slot[]): Slot[] {
  const result: Slot[] = [];
  const skip = new Set(['label', 'content', 'hint']);
  for (const s of slots) {
    if (s.type === 'text' && !skip.has(s.name)) result.push(s);
    if (s.children) result.push(...collectTextSlots(s.children));
  }
  return result;
}

function hasInputSlot(slots: Slot[]): boolean {
  for (const s of slots) {
    if (s.type === 'input') return true;
    if (s.children && hasInputSlot(s.children)) return true;
  }
  return false;
}

/* ── Types generation ── */

function generateTypes(c: Contract, pascal: string): string {
  const axes = c.variantAxes || {};
  const el = getElement(c);
  const stateAxis = c.stateMachine?.stateAxis;
  const lines: string[] = [BANNER, '', `/** ${c.description || pascal} */`, ''];

  for (const [axis, values] of Object.entries(axes)) {
    if (axis === stateAxis) {
      lines.push(`/** Interactive state — auto-managed via hover/focus/active */`);
    }
    const typeName = `${pascal}${toPascal(axis)}`;
    lines.push(`export type ${typeName} = ${values.map(v => `'${v}'`).join(' | ')};`);
    lines.push('');
  }

  const slots = c.slots || [];
  const boolProps = c.booleanProps || [];
  const textPropsArr = c.textProps || [];
  const hasCollapsible = hasCollapsibleContent(slots);

  const htmlAttrs = getHtmlAttrs(el);
  const omitFields: string[] = [];
  if (c.htmlInput) omitFields.push("'onChange'");
  if (hasCollapsible) omitFields.push("'content'");
  const baseType = omitFields.length > 0
    ? `Omit<${c.htmlInput ? 'React.HTMLAttributes<HTMLDivElement>' : htmlAttrs}, ${omitFields.join(' | ')}>`
    : htmlAttrs;

  lines.push(`export interface ${pascal}Props extends ${baseType} {`);

  for (const [axis] of Object.entries(axes)) {
    const typeName = `${pascal}${toPascal(axis)}`;
    lines.push(`  ${toCamel(axis)}?: ${typeName};`);
  }

  const emittedProps = new Set<string>();
  const nodeSlots = collectNodeSlots(slots);
  for (const ns of nodeSlots) {
    if (!emittedProps.has(ns.name)) {
      lines.push(`  ${ns.name}?: React.ReactNode;`);
      emittedProps.add(ns.name);
    }
  }

  const textSlots = collectTextSlots(slots);
  for (const ts of textSlots) {
    if (!emittedProps.has(ts.name)) {
      lines.push(`  ${ts.name}?: string;`);
      emittedProps.add(ts.name);
    }
  }

  for (const bp of boolProps) {
    if (!emittedProps.has(bp.name)) {
      lines.push(`  ${bp.name}?: boolean;`);
      emittedProps.add(bp.name);
    }
  }

  const htmlInputTextNames = new Set(['placeholder', 'value', 'defaultValue']);
  for (const tp of textPropsArr) {
    const isMainText = tp.name === 'label' || tp.name === 'hint';
    if (isMainText) continue;
    if (tp.name === 'content' && !hasCollapsible) continue;
    if (c.htmlInput && htmlInputTextNames.has(tp.name)) continue;
    if (!emittedProps.has(tp.name)) {
      if (tp.name === 'content' && hasCollapsible) {
        lines.push(`  content?: React.ReactNode;`);
      } else {
        lines.push(`  ${tp.name}?: string;`);
      }
      emittedProps.add(tp.name);
    }
  }

  if (hasCollapsible && !emittedProps.has('content')) {
    lines.push(`  content?: React.ReactNode;`);
    emittedProps.add('content');
  }

  if (hasCollapsible && !emittedProps.has('onToggle')) {
    lines.push(`  onToggle?: () => void;`);
  }

  if (c.htmlInput) {
    lines.push(`  value?: string;`);
    lines.push(`  defaultValue?: string;`);
    lines.push(`  placeholder?: string;`);
    lines.push(`  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;`);
    lines.push(`  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>;`);
    if (c.inputType === 'textarea') {
      lines.push(`  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;`);
    }
  }

  if (c.composite) {
    if (!emittedProps.has('items')) {
      lines.push(`  items?: Array<{ label: string; icon?: React.ReactNode; danger?: boolean; onClick?: () => void }>;`);
    }
    if (!emittedProps.has('onOpenChange')) {
      lines.push(`  onOpenChange?: (open: boolean) => void;`);
    }
    if (hasInputSlot(slots) && !emittedProps.has('placeholder')) {
      lines.push(`  placeholder?: string;`);
    }
  }

  if (el === 'button') {
    lines.push(`  disabled?: boolean;`);
  }

  // Enhancement-driven extra props
  if (has(c, 'loading')) {
    lines.push(`  loading?: boolean;`);
  }
  if (has(c, 'imgTag')) {
    lines.push(`  src?: string;`);
    lines.push(`  onLoad?: () => void;`);
    lines.push(`  onError?: () => void;`);
  }
  if (has(c, 'portal')) {
    lines.push(`  open?: boolean;`);
    lines.push(`  onClose?: () => void;`);
  }
  if (has(c, 'clearButton') && !emittedProps.has('onClear')) {
    lines.push(`  onClear?: () => void;`);
  }

  lines.push('}');
  return lines.join('\n');
}

/* ── Render icon slot via IconSlot ── */

function renderIconSlot(name: string, showProp: string | null, optional: boolean, indent: string): string {
  if (showProp) {
    return `${indent}{${showProp} && ${name} && <IconSlot icon={${name}} />}\n`;
  }
  if (optional) {
    return `${indent}{${name} && <IconSlot icon={${name}} />}\n`;
  }
  return `${indent}<IconSlot icon={${name}} />\n`;
}

/* ── Render slot children recursively (within a frame) ── */

function renderSlotChildren(
  children: Slot[],
  boolProps: BooleanProp[],
  textPropsArr: TextPropDef[],
  indentLevel: number,
  hasCollapsible: boolean,
  iconButtonsInHeader?: string[],
  stateSwappedIconSlots?: Record<string, { open: string; closed: string }>
): string {
  let code = '';
  const indent = ' '.repeat(indentLevel);
  const iconBtnCls = 'shrink-0 flex items-center justify-center rounded cursor-pointer hover:bg-black/5 hover:opacity-100 active:bg-black/10 active:opacity-100 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none transition-colors';

  for (const ch of children) {
    if (ch.collapsible) continue;

    const chBp = boolProps.find(b => b.controls === ch.name);
    const chShow = chBp ? chBp.name : null;

    if (ch.type === 'icon') {
      const swapped = stateSwappedIconSlots?.[ch.name];
      const asButton = iconButtonsInHeader?.includes(ch.name);

      if (swapped) {
        const iconExpr = `isOpen ? <${swapped.open} /> : <${swapped.closed} />`;
        if (asButton) {
          code += `${indent}<button type="button" onClick={(e) => e.stopPropagation()} disabled={effectiveState === 'disabled'} className="${iconBtnCls}" style={{ width: 'var(--icon-size, 20px)', height: 'var(--icon-size, 20px)' }}><IconSlot icon={${iconExpr}} /></button>\n`;
        } else {
          code += `${indent}<IconSlot icon={${iconExpr}} />\n`;
        }
      } else if (asButton) {
        if (chShow) {
          code += `${indent}{${chShow} && ${ch.name} && <button type="button" onClick={(e) => e.stopPropagation()} disabled={effectiveState === 'disabled'} className="${iconBtnCls}" style={{ width: 'var(--icon-size, 20px)', height: 'var(--icon-size, 20px)' }}><IconSlot icon={${ch.name}} /></button>}\n`;
        } else if (ch.optional) {
          code += `${indent}{${ch.name} && <button type="button" onClick={(e) => e.stopPropagation()} disabled={effectiveState === 'disabled'} className="${iconBtnCls}" style={{ width: 'var(--icon-size, 20px)', height: 'var(--icon-size, 20px)' }}><IconSlot icon={${ch.name}} /></button>}\n`;
        } else {
          code += `${indent}<button type="button" onClick={(e) => e.stopPropagation()} disabled={effectiveState === 'disabled'} className="${iconBtnCls}" style={{ width: 'var(--icon-size, 20px)', height: 'var(--icon-size, 20px)' }}><IconSlot icon={${ch.name}} /></button>\n`;
        }
      } else {
        code += renderIconSlot(ch.name, chShow, !!ch.optional, indent);
      }
    } else if (ch.type === 'text') {
      const isMainLabel = ch.name === 'label' || ch.name === 'hint';
      const isContent = ch.name === 'content';
      const src = isMainLabel ? 'children' : (isContent && !hasCollapsible ? 'children' : ch.name);
      const textClassVar = TEXT_SLOT_CLASS_MAP[ch.name] || '';
      const colorAttr = ch.name === 'subtitle' ? `color: 'var(--subtitle-color, currentColor)'` :
                         ch.name === 'description' ? `color: 'var(--description-color, currentColor)'` :
                         ch.name === 'title' ? `color: 'var(--title-color, currentColor)'` :
                         ch.name === 'meta' ? `color: 'var(--meta-color, currentColor)'` : '';
      const hasStyle = colorAttr || textClassVar;
      const styleStr = hasStyle ? ` style={{ ${colorAttr}${colorAttr && textClassVar ? ', ' : ''} }}` : '';
      const fillCls = ch.sizing === 'fill' ? ' flex-1 min-w-0' : '';
      const classStr = textClassVar ? ` className={\`${fillCls ? fillCls.trim() + ' ' : ''}\${${textClassVar}}\`}` : (fillCls ? ` className="${fillCls.trim()}"` : '');
      if (chShow) {
        code += `${indent}{${chShow} && <span${classStr}${styleStr}>${src === 'children' ? '{children}' : `{${src}}`}</span>}\n`;
      } else {
        code += `${indent}<span${classStr}${styleStr}>${src === 'children' ? '{children}' : `{${src}}`}</span>\n`;
      }
    } else if (ch.type === 'component') {
      if (chShow) {
        code += `${indent}{${chShow} && ${ch.name} && <div className="shrink-0">{${ch.name}}</div>}\n`;
      } else if (ch.optional) {
        code += `${indent}{${ch.name} && <div className="shrink-0">{${ch.name}}</div>}\n`;
      }
    } else if (ch.type === 'input') {
      code += `${indent}<input className="flex-1 min-w-0 bg-transparent outline-none text-[inherit] font-[inherit] leading-[inherit] cursor-[inherit]" placeholder={placeholder} value={value} onChange={handleInputChange} {...(inputProps || {})} />\n`;
    } else if (ch.type === 'frame' && ch.children) {
      const dir = ch.layout === 'vertical' ? 'flex-col' : '';
      const fill = ch.sizing === 'fill' ? 'flex-1 min-w-0' : '';
      const alignCls = ch.layout === 'vertical' ? 'items-start' : 'items-center';
      code += `${indent}<div className="flex ${dir} ${fill} ${alignCls} gap-[inherit]">\n`;
      code += renderSlotChildren(ch.children, boolProps, textPropsArr, indentLevel + 2, hasCollapsible, iconButtonsInHeader, stateSwappedIconSlots);
      code += `${indent}</div>\n`;
    }
  }
  return code;
}

/* ── Component TSX generation ── */

function generateComponent(c: Contract, pascal: string): string {
  const safe = safeName(c.name);
  const el = getElement(c);
  const refType = getRefType(el);
  const stateAxis = c.stateMachine?.stateAxis;
  const hasStateMachine = !!stateAxis;
  const stateValues = c.stateMachine?.states || [];
  const hasActive = stateValues.includes('active');
  const isButton = el === 'button';
  const isHtmlInput = !!c.htmlInput;
  const isCustom = !!c.customStructure;
  const isComposite = !!c.composite;

  const slots = c.slots || [];
  const boolProps = c.booleanProps || [];
  const textPropsArr = c.textProps || [];
  const collapsibleSlot = findCollapsibleSlot(slots);
  const hasCollapsible = !!collapsibleSlot;
  const hasPopover = isComposite && hasCompositePopover(slots);

  const axes = c.variantAxes || {};
  const collapsibleStateAxis = hasCollapsible
    ? c.variantProps?.find(p => axes[p]?.includes('open') && axes[p]?.includes('closed'))
    : undefined;
  const typeExports = Object.keys(axes).map(a => `${pascal}${toPascal(a)}`);

  const needsIconSlot = hasIconSlots(slots) || (c.stateSwappedIconSlots && Object.keys(c.stateSwappedIconSlots).length > 0);
  const needsPopover = isComposite && hasPopover;
  const needsClearButton = has(c, 'clearButton');
  const needsSkeletonBlock = has(c, 'skeleton');
  const needsLoading = has(c, 'loading');
  const needsPortal = has(c, 'portal');
  const compositeHasInput = isComposite && hasInputSlot(slots);

  // Determine React hooks needed
  const reactHooks = new Set(['useState', 'useCallback']);
  if (needsPopover || needsPortal) reactHooks.add('useRef');
  if (needsPortal) reactHooks.add('useEffect');

  // State-swapped icon imports
  const stateSwappedIcons = c.stateSwappedIconSlots && Object.keys(c.stateSwappedIconSlots).length > 0
    ? [...new Set(Object.values(c.stateSwappedIconSlots).flatMap(v => [v.open, v.closed]))]
    : [];
  const stateSwappedImport = stateSwappedIcons.length > 0
    ? `\nimport { ${stateSwappedIcons.join(', ')} } from '../../icons';`
    : '';

  // Build _shared imports
  const sharedImports: string[] = ['cn', 'findClasses', 'getFocusRing', 'type VR'];
  if (needsIconSlot) sharedImports.push('IconSlot');
  if (needsClearButton) sharedImports.push('ClearButton');
  if (needsSkeletonBlock) sharedImports.push('SkeletonBlock');

  // Build hook imports
  const hookImports: string[] = [];
  if (needsPopover) {
    hookImports.push(`import { useClickOutside } from '../../../hooks/useClickOutside';`);
    hookImports.push(`import { useEscapeKey } from '../../../hooks/useEscapeKey';`);
    hookImports.push(`import { usePopoverState } from '../../../hooks/usePopoverState';`);
  }
  if (needsPortal) {
    hookImports.push(`import { useEscapeKey } from '../../../hooks/useEscapeKey';`);
    hookImports.push(`import { useFocusTrap } from '../../../hooks/useFocusTrap';`);
  }

  // Build component imports
  const componentImports: string[] = [];
  if (needsPopover) componentImports.push(`import { Popover } from '../Popover';`);
  if (needsLoading) componentImports.push(`import { Spinner } from '../Spinner';`);
  if (needsPortal) componentImports.push(`import ReactDOM from 'react-dom';`);

  // Deduplicate hook imports
  const uniqueHookImports = [...new Set(hookImports)];

  let code = `${BANNER}
import React, { ${[...reactHooks].join(', ')} } from 'react';
import type { ${pascal}Props${typeExports.length ? ', ' + typeExports.join(', ') : ''} } from './${pascal}.types';
import { ${sharedImports.join(', ')} } from '../_shared';
import contract from '../../../contracts/components/${safe}.contract.json';${stateSwappedImport}
${uniqueHookImports.length > 0 ? uniqueHookImports.join('\n') + '\n' : ''}${componentImports.length > 0 ? componentImports.join('\n') + '\n' : ''}
const rules = (contract.variantRules || []) as unknown as VR[];
`;

  const sizeClasses = generateSizeClasses(c, pascal);
  if (sizeClasses) code += `\n${sizeClasses}\n`;

  code += `
export const ${pascal} = React.forwardRef<${refType}, ${pascal}Props>((props, ref) => {
  const {
`;

  const variantPropsArr = (c.variantProps || []).filter(p => p !== stateAxis);
  for (const p of variantPropsArr) {
    if (p === collapsibleStateAxis) {
      code += `    ${toCamel(p)}: ${toCamel(p)}Prop,\n`;
    } else {
      const defaultVal = axes[p]?.[0] || 'undefined';
      code += `    ${toCamel(p)} = '${defaultVal}',\n`;
    }
  }

  if (hasStateMachine && stateAxis) {
    code += `    ${toCamel(stateAxis)}: controlledState,\n`;
  }

  if (isButton) code += `    disabled = false,\n`;
  if (needsLoading) code += `    loading = false,\n`;

  const emittedDestructured = new Set<string>();
  const allNodeSlots = collectNodeSlots(slots);
  for (const ns of allNodeSlots) {
    if (!emittedDestructured.has(ns.name)) {
      code += `    ${ns.name},\n`;
      emittedDestructured.add(ns.name);
    }
  }

  for (const bp of boolProps) {
    if (!emittedDestructured.has(bp.name)) {
      code += `    ${bp.name} = ${bp.default},\n`;
      emittedDestructured.add(bp.name);
    }
  }

  if (hasCollapsible && !emittedDestructured.has('content')) {
    code += `    content,\n`;
    emittedDestructured.add('content');
  }
  if (hasCollapsible) {
    code += `    onToggle,\n`;
  }

  const allTextSlots = collectTextSlots(slots);
  for (const ts of allTextSlots) {
    if (!emittedDestructured.has(ts.name)) {
      const tp = textPropsArr.find(t => t.name === ts.name);
      const defaultVal = tp?.default ? ` = '${tp.default.replace(/'/g, "\\'")}'` : '';
      code += `    ${ts.name}${defaultVal},\n`;
      emittedDestructured.add(ts.name);
    }
  }

  const htmlInputTextNames = new Set(['placeholder', 'value', 'defaultValue']);
  for (const tp of textPropsArr) {
    const isMainText = tp.name === 'label' || tp.name === 'hint';
    if (isMainText) continue;
    if (tp.name === 'content') continue;
    if (isHtmlInput && htmlInputTextNames.has(tp.name)) continue;
    if (!emittedDestructured.has(tp.name)) {
      code += `    ${tp.name} = '${tp.default.replace(/'/g, "\\'")}',\n`;
      emittedDestructured.add(tp.name);
    }
  }

  if (isHtmlInput) {
    code += `    value: valueProp,\n`;
    code += `    defaultValue,\n`;
    code += `    placeholder = '${(c.textProps?.[0]?.default || 'Enter...').replace(/'/g, "\\'")}',\n`;
    code += `    onChange,\n`;
    if (c.inputType === 'textarea') {
      code += `    textareaProps,\n`;
    } else {
      code += `    inputProps,\n`;
    }
  }

  if (isComposite) {
    code += `    items,\n`;
    code += `    onOpenChange,\n`;
    if (compositeHasInput && !emittedDestructured.has('placeholder')) {
      code += `    placeholder = '',\n`;
      emittedDestructured.add('placeholder');
    }
  }

  // Enhancement-specific props
  if (has(c, 'imgTag')) {
    code += `    src,\n`;
    code += `    onLoad: onLoadProp,\n`;
    code += `    onError: onErrorProp,\n`;
  }
  if (has(c, 'portal')) {
    code += `    open = false,\n`;
    code += `    onClose,\n`;
  }
  if (has(c, 'clearButton')) {
    code += `    onClear,\n`;
  }

  if (!isHtmlInput) {
    code += `    children,\n`;
  }

  code += `    className,\n`;

  if (hasStateMachine) {
    code += `    onMouseEnter, onMouseLeave, onFocus, onBlur,\n`;
    if (hasActive) code += `    onMouseDown, onMouseUp,\n`;
  }

  code += `    ...rest\n  } = props;\n`;

  // Internal open/close state for collapsible
  if (hasCollapsible && collapsibleStateAxis) {
    const camelAxis = toCamel(collapsibleStateAxis);
    code += `\n  const [internalOpen, setInternalOpen] = useState<boolean>(false);\n`;
    code += `  const isOpen = ${camelAxis}Prop !== undefined ? ${camelAxis}Prop === 'open' : internalOpen;\n`;
    code += `  const handleToggle = useCallback(() => { if (${camelAxis}Prop === undefined) setInternalOpen(p => !p); onToggle?.(); }, [${camelAxis}Prop, onToggle]);\n`;
  }

  // Composite popover state via hooks
  if (needsPopover) {
    code += `\n  const triggerRef = React.useRef<HTMLDivElement>(null);\n`;
    code += `  const popoverRef = React.useRef<HTMLDivElement>(null);\n`;
    code += `  const { isOpen, toggle, close } = usePopoverState({ onOpenChange });\n`;
    code += `  useClickOutside([triggerRef, popoverRef], close, isOpen);\n`;
    code += `  useEscapeKey(close, isOpen);\n`;
    if (compositeHasInput) {
      code += `  const [inputValue, setInputValue] = useState('');\n`;
      code += `  const value = inputValue;\n`;
      code += `  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => { setInputValue(e.target.value); if (!isOpen) toggle(); }, [isOpen, toggle]);\n`;
      code += `  const inputProps = {};\n`;
    }
  }

  // Portal state for Modal
  if (needsPortal) {
    code += `\n  const modalRef = React.useRef<HTMLDivElement>(null);\n`;
    code += `  useEscapeKey(() => onClose?.(), open);\n`;
    code += `  useFocusTrap(modalRef, open);\n`;
    code += `  useEffect(() => {\n`;
    code += `    if (open) document.body.style.overflow = 'hidden';\n`;
    code += `    return () => { document.body.style.overflow = ''; };\n`;
    code += `  }, [open]);\n`;
    code += `  if (!open) return null;\n`;
  }

  // State management for interactive states (hover/focus)
  if (hasStateMachine && stateAxis) {
    const stateType = `${pascal}${toPascal(stateAxis)}`;
    const hasDisabledState = stateValues.includes('disabled');
    code += `\n  const [internalState, setInternalState] = useState<${stateType}>('base');\n`;
    if (hasDisabledState) {
      const disabledCheck = isButton ? 'disabled' : `controlledState === 'disabled'`;
      code += `  const effectiveState: ${stateType} = ${disabledCheck} ? 'disabled' : controlledState ?? internalState;\n`;
    } else {
      code += `  const effectiveState: ${stateType} = controlledState ?? internalState;\n`;
    }
  }

  if (isHtmlInput) {
    code += `\n  const [internalValue, setInternalValue] = useState(defaultValue ?? '');\n`;
    code += `  const value = valueProp ?? internalValue;\n`;
    if (c.inputType === 'textarea') {
      code += `  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {\n`;
      code += `    setInternalValue(e.target.value); onChange?.(e);\n  }, [onChange]);\n`;
    } else {
      code += `  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {\n`;
      code += `    setInternalValue(e.target.value); onChange?.(e as any);\n  }, [onChange]);\n`;
    }
  }

  // Image state management
  if (has(c, 'imgTag')) {
    const ratioAxis = axes['ratio'];
    code += `\n  const [imgState, setImgState] = useState(src ? 'loading' : 'empty');\n`;
    if (ratioAxis) {
      code += `  const RATIO_MAP: Record<string, string> = { '1:1': '1/1', '4:3': '4/3', '16:9': '16/9', '3:2': '3/2' };\n`;
      code += `  const aspectRatio = RATIO_MAP[ratio] ?? '1/1';\n`;
    }
  }

  // findClasses call
  const hasFocusInStates = stateValues.includes('focus');
  const findArgsArr = (c.variantProps || []).map(p => {
    if (p === stateAxis && hasStateMachine && hasFocusInStates) return `${p}: effectiveState === 'focus' ? 'base' : effectiveState`;
    if (p === stateAxis && hasStateMachine) return `${p}: effectiveState`;
    if (hasCollapsible && axes[p]?.includes('open') && axes[p]?.includes('closed')) {
      return `${p}: isOpen ? 'open' : 'closed'`;
    }
    if (needsPopover && axes[p]?.includes('open') && axes[p]?.includes('closed')) {
      return `${p}: isOpen ? 'open' : 'closed'`;
    }
    if (has(c, 'imgTag') && p === 'state') {
      return `${p}: imgState as any`;
    }
    return `${p}: ${toCamel(p)}`;
  });
  code += `\n  const vc = findClasses(rules, { ${findArgsArr.join(', ')} });\n`;

  // Focus ring via shared utility
  const hasAppearanceAxis = !!axes['appearance'];
  if (hasAppearanceAxis) {
    code += `  const focusRing = getFocusRing(contract, appearance);\n`;
  } else {
    code += `  const focusRing = getFocusRing(contract);\n`;
  }

  // Per-slot text style class variables
  const textSlotNames = ['title', 'subtitle', 'description', 'paragraph', 'meta'];
  function hasTextSlotDeep(slots: Slot[]): boolean {
    for (const s of slots) {
      if (textSlotNames.includes(s.name)) return true;
      if (s.children && hasTextSlotDeep(s.children)) return true;
    }
    return false;
  }
  if (hasTextSlotDeep(c.slots || [])) {
    code += `  const titleTextCls = vc.find(c => c.startsWith('[--title-text-class:'))?.match(/\\[--title-text-class:([^\\]]+)\\]/)?.[1] || '';\n`;
    code += `  const subtitleTextCls = vc.find(c => c.startsWith('[--subtitle-text-class:'))?.match(/\\[--subtitle-text-class:([^\\]]+)\\]/)?.[1] || '';\n`;
    code += `  const descTextCls = vc.find(c => c.startsWith('[--desc-text-class:'))?.match(/\\[--desc-text-class:([^\\]]+)\\]/)?.[1] || '';\n`;
    code += `  const paragraphTextCls = vc.find(c => c.startsWith('[--paragraph-text-class:'))?.match(/\\[--paragraph-text-class:([^\\]]+)\\]/)?.[1] || '';\n`;
  }

  // Event handlers
  if (hasStateMachine) {
    const hasFocus = stateValues.includes('focus');
    const hasHover = stateValues.includes('hover');
    const hoverState = hasHover ? "'hover'" : "'base'";
    const focusState = hasFocus ? "'focus'" : (hasHover ? "'hover'" : "'base'");
    code += `\n  const he = useCallback((e: React.MouseEvent) => { ${isButton ? 'if (!disabled) ' : ''}setInternalState(${hoverState}); onMouseEnter?.(e as any); }, [${isButton ? 'disabled, ' : ''}onMouseEnter]);\n`;
    code += `  const hl = useCallback((e: React.MouseEvent) => { setInternalState('base'); onMouseLeave?.(e as any); }, [onMouseLeave]);\n`;
    code += `  const hf = useCallback((e: React.FocusEvent) => { ${isButton ? 'if (!disabled) ' : ''}setInternalState(${focusState}); onFocus?.(e as any); }, [${isButton ? 'disabled, ' : ''}onFocus]);\n`;
    code += `  const hb = useCallback((e: React.FocusEvent) => { setInternalState('base'); onBlur?.(e as any); }, [onBlur]);\n`;
    if (hasActive) {
      code += `  const hmd = useCallback((e: React.MouseEvent) => { ${isButton ? 'if (!disabled) ' : ''}setInternalState('active'); onMouseDown?.(e as any); }, [${isButton ? 'disabled, ' : ''}onMouseDown]);\n`;
      code += `  const hmu = useCallback((e: React.MouseEvent) => { setInternalState(${hoverState}); onMouseUp?.(e as any); }, [onMouseUp]);\n`;
    }
  }

  // Build root class
  const rootCls = rootClasses(c);
  const rootClsStr = rootCls.join(' ');

  // ── COMPOSITE COMPONENT (Dropdown, Combobox) ──
  if (isComposite && hasPopover) {
    code += generateCompositeJsx(c, pascal, rootClsStr, sizeClasses);
    code += `\n${pascal}.displayName = '${pascal}';\n`;
    return code;
  }

  // ── PORTAL COMPONENT (Modal) ──
  if (needsPortal) {
    code += generatePortalJsx(c, pascal, rootClsStr, sizeClasses);
    code += `\n${pascal}.displayName = '${pascal}';\n`;
    return code;
  }

  // ── STANDARD COMPONENT JSX ──
  const actualEl = isCustom && c.customStructure === 'switch' ? 'button' : el;
  code += `\n  return (\n    <${actualEl}\n      ref={ref as any}\n`;
  if (isButton || (isCustom && c.customStructure === 'switch')) code += `      disabled={${needsLoading ? 'disabled || loading' : 'disabled'}}\n`;

  if (isCustom && c.customStructure === 'switch') {
    code += `      role="switch"\n`;
    code += `      aria-checked={${getSwitchOnState(c)}}\n`;
  }

  code += `      className={cn(\n        '${rootClsStr}',\n`;
  if (sizeClasses && c.variantAxes?.size) code += `        SIZE_CLASSES[size],\n`;
  code += `        ...vc,\n`;
  if (isButton || (isCustom && c.customStructure === 'switch')) {
    code += `        !disabled && focusRing,\n`;
    code += `        disabled && 'cursor-not-allowed pointer-events-none',\n`;
  } else if (isHtmlInput) {
    code += `        focusRing,\n`;
    code += `        'cursor-text',\n`;
  } else {
    code += `        focusRing,\n`;
  }
  code += `        className\n      )}\n`;

  if (hasStateMachine) {
    code += `      onMouseEnter={he}\n      onMouseLeave={hl}\n      onFocus={hf}\n      onBlur={hb}\n`;
    if (hasActive) code += `      onMouseDown={hmd}\n      onMouseUp={hmu}\n`;
  }

  if (hasCollapsible) {
    code += `      data-state={isOpen ? 'open' : 'closed'}\n`;
    code += `      onClick={handleToggle}\n`;
    code += `      style={{ cursor: 'pointer', ...(isOpen ? { ['--icon-color' as string]: 'var(--color-brand-primary)' } : {}), ...rest.style }}\n`;
  }

  // Image aspect ratio via style
  if (has(c, 'imgTag') && axes['ratio']) {
    code += `      style={{ aspectRatio, position: 'relative', ...rest.style }}\n`;
  }

  code += `      {...rest}\n    >\n`;

  // Body -- based on structure
  if (isCustom) {
    code += generateCustomJsx(c, pascal);
  } else if (slots.length > 0) {
    code += generateSlotsJsx(c, slots, boolProps, textPropsArr, hasCollapsible);
  } else {
    code += `      {children}\n`;
  }

  const hasTopBorder = boolProps.some(bp => bp.name === 'showTopBorder');
  if (hasTopBorder) {
    if (hasCollapsible && collapsibleStateAxis) {
      code += `      {showTopBorder && <div className="absolute top-0 left-0 right-0 h-px" style={{ background: isOpen ? 'var(--color-brand-primary)' : 'var(--color-border-base)' }} />}\n`;
    } else {
      code += `      {showTopBorder && <div className="absolute top-0 left-0 right-0 h-px bg-[var(--color-border-base)]" />}\n`;
    }
  }

  code += `    </${actualEl}>\n  );\n});\n\n${pascal}.displayName = '${pascal}';\n`;
  return code;
}

/* ── Generate JSX for slots ── */

function generateSlotsJsx(c: Contract, slots: Slot[], boolProps: BooleanProp[], textPropsArr: TextPropDef[], hasCollapsible: boolean): string {
  const needsLoading = has(c, 'loading');
  let code = '';

  for (const slot of slots) {
    if (slot.collapsible) {
      const hasContentTextMap = c.responsiveProps?.contentTextStyle && Object.keys(c.responsiveProps.contentTextStyle).length > 0;
      const contentCls = hasContentTextMap ? `\${CONTENT_TEXT_MAP[size] || ''}` : '';
      code += `      {isOpen && (\n`;
      code += `        <div className={\`w-full${contentCls ? ' ' + contentCls : ''}\`}>\n`;
      code += `          {content ?? '${(slot.default || '').replace(/'/g, "\\'")}'}\n`;
      code += `        </div>\n`;
      code += `      )}\n`;
      continue;
    }

    const bp = boolProps.find(b => b.controls === slot.name);
    const showProp = bp ? bp.name : null;

    if (slot.type === 'icon') {
      // Button loading: replace left icon with spinner when loading
      if (needsLoading && slot.name === 'iconLeft') {
        code += `      {loading && <Spinner size="xs" className="shrink-0" />}\n`;
        code += `      {!loading && ${showProp ? `${showProp} && ` : ''}${slot.name} && <IconSlot icon={${slot.name}} />}\n`;
      } else {
        code += renderIconSlot(slot.name, showProp, !!slot.optional, '      ');
      }
    } else if (slot.type === 'text') {
      const isMainLabel = slot.name === 'label' || slot.name === 'hint';
      const isContent = slot.name === 'content';
      const src = isMainLabel ? 'children' : (isContent && !hasCollapsible ? 'children' : slot.name);
      const textClassVar = TEXT_SLOT_CLASS_MAP[slot.name] || '';
      const colorStyle = slot.name === 'title' ? `color: 'var(--title-color, currentColor)'` :
                        slot.name === 'subtitle' ? `color: 'var(--subtitle-color, currentColor)'` :
                        slot.name === 'description' ? `color: 'var(--description-color, currentColor)'` :
                        slot.name === 'meta' ? `color: 'var(--meta-color, currentColor)'` : '';
      const hasStyle = colorStyle || textClassVar;
      const styleStr = hasStyle ? ` style={{ ${colorStyle}${colorStyle && textClassVar ? ', ' : ''} }}` : '';
      const classStr = textClassVar ? ` className={${textClassVar}}` : '';
      if (showProp) {
        code += `      {${showProp} && <span${classStr}${styleStr}>${src === 'children' ? '{children}' : `{${src}}`}</span>}\n`;
      } else {
        code += `      <span${classStr}${styleStr}>${src === 'children' ? '{children}' : `{${src}}`}</span>\n`;
      }
    } else if (slot.type === 'component') {
      if (showProp) {
        code += `      {${showProp} && ${slot.name} && <div className="shrink-0">{${slot.name}}</div>}\n`;
      } else if (slot.optional) {
        code += `      {${slot.name} && <div className="shrink-0">{${slot.name}}</div>}\n`;
      }
    } else if (slot.type === 'input') {
      code += `      <input className="flex-1 min-w-0 bg-transparent outline-none text-[inherit] font-[inherit] leading-[inherit] cursor-[inherit]" placeholder={placeholder} value={value} onChange={handleInputChange} {...(inputProps || {})} />\n`;
      // ClearButton after input if enhanced
      if (has(c, 'clearButton')) {
        code += `      <ClearButton onClick={() => { setInternalValue(''); onChange?.({ target: { value: '' } } as any); onClear?.(); }} visible={!!value} />\n`;
      }
    } else if (slot.type === 'textarea') {
      code += `      <textarea className="flex-1 min-w-0 bg-transparent outline-none resize-y min-h-[64px] text-[inherit] font-[inherit] leading-[inherit] cursor-[inherit]" placeholder={placeholder} value={value as string} onChange={handleTextareaChange} {...(textareaProps || {})} />\n`;
    } else if (slot.type === 'frame' && slot.children) {
      const dir = slot.layout === 'vertical' ? 'flex-col' : '';
      const fill = slot.sizing === 'fill' ? 'flex-1 min-w-0' : '';
      const alignCls = slot.layout === 'vertical' ? 'items-start' : 'items-center';
      if (hasCollapsible && slot.name === 'header') {
        code += `      <div className="flex ${dir} ${fill} ${alignCls} gap-[inherit] cursor-pointer w-full" role="button" tabIndex={0}>\n`;
      } else {
        code += `      <div className="flex ${dir} ${fill} ${alignCls} gap-[inherit]">\n`;
      }
      code += renderSlotChildren(slot.children, boolProps, textPropsArr, 8, hasCollapsible, c.iconButtonsInHeader, c.stateSwappedIconSlots);
      code += `      </div>\n`;
    } else if (slot.type === 'overlay') {
      code += `      <div className="absolute inset-0 bg-[var(--color-scrim-light)]" />\n`;
    }
  }
  return code;
}

/* ── Composite JSX (Dropdown, Combobox) with proper behavioral hooks ── */

function generateCompositeJsx(c: Contract, pascal: string, rootClsStr: string, sizeClasses: string): string {
  const boolProps = c.booleanProps || [];
  const textPropsArr = c.textProps || [];
  const slots = c.slots || [];
  const compositeHasInput = hasInputSlot(slots);

  const triggerSlot = slots.find(s => s.name === 'trigger');
  const popoverSlot = slots.find(s => s.name === 'popover');

  let code = `\n  return (\n    <div ref={ref as any} className={cn('relative inline-block', className)} {...rest}>\n`;

  // Trigger
  code += `      <div\n`;
  code += `        ref={triggerRef}\n`;
  code += `        className={cn(\n          '${rootClsStr}',\n`;
  if (sizeClasses && c.variantAxes?.size) code += `          SIZE_CLASSES[size],\n`;
  code += `          ...vc,\n          focusRing,\n          'cursor-pointer select-none'\n        )}\n`;
  code += `        onClick={toggle}\n`;
  code += `        role="combobox"\n`;
  code += `        aria-expanded={isOpen}\n`;
  code += `        tabIndex={0}\n`;
  code += `      >\n`;

  if (triggerSlot?.children) {
    code += renderSlotChildren(triggerSlot.children, boolProps, textPropsArr, 8, false);
  } else {
    code += `        <span className="flex-1 min-w-0 truncate">{children}</span>\n`;
  }
  code += `      </div>\n`;

  // Popover
  if (popoverSlot) {
    code += `      <Popover anchorRef={triggerRef} open={isOpen} ref={popoverRef}>\n`;

    if (compositeHasInput) {
      code += `        <div className="p-[var(--popover-pad,4px)]">\n`;
      code += `          <input className="w-full bg-transparent outline-none text-[inherit] font-[inherit] leading-[inherit] px-[var(--space-button-x-sm)] py-[var(--space-4)]" placeholder={placeholder} value={value} onChange={handleInputChange} autoFocus />\n`;
      if (has(c, 'clearButton')) {
        code += `          {value && <ClearButton onClick={() => { setInputValue(''); }} />}\n`;
      }
      code += `        </div>\n`;
    }

    code += `        {items ? items.map((item, i) => (\n`;
    code += `          <div\n`;
    code += `            key={i}\n`;
    code += `            className={cn(\n`;
    code += `              'flex items-center gap-[var(--item-gap,6px)] cursor-pointer',\n`;
    code += `              'rounded-[var(--radius-default)]',\n`;
    code += `              'hover:bg-[var(--item-bg,var(--color-brand-hover-bg))]',\n`;
    code += `              item.danger && 'text-[var(--color-danger-base)]'\n`;
    code += `            )}\n`;
    code += `            style={{ padding: 'var(--item-py, 6px) var(--item-px, 12px)' }}\n`;
    code += `            onClick={() => { item.onClick?.(); close(); }}\n`;
    code += `          >\n`;
    code += `            {item.icon && <IconSlot icon={item.icon} />}\n`;
    code += `            <span className="flex-1 truncate">{item.label}</span>\n`;
    code += `          </div>\n`;
    code += `        )) : children}\n`;
    code += `      </Popover>\n`;
  }

  code += `    </div>\n  );\n});\n`;
  return code;
}

/* ── Portal JSX (Modal) with overlay, escape key, focus trap ── */

function generatePortalJsx(c: Contract, pascal: string, rootClsStr: string, sizeClasses: string): string {
  const slots = c.slots || [];
  const boolProps = c.booleanProps || [];
  const textPropsArr = c.textProps || [];
  const hasCollapsible = false;

  // Filter out overlay slot — we render our own backdrop
  const contentSlots = slots.filter(s => s.type !== 'overlay');

  let code = `\n  return ReactDOM.createPortal(\n`;
  code += `    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>\n`;
  code += `      <div className="fixed inset-0 bg-[var(--color-scrim-light)] animate-fade-in" />\n`;
  code += `      <div\n`;
  code += `        ref={modalRef}\n`;
  code += `        className={cn(\n`;
  code += `          '${rootClsStr}',\n`;
  code += `          'relative z-10 shadow-elevation-3 animate-scale-in',\n`;
  if (sizeClasses && c.variantAxes?.size) code += `          SIZE_CLASSES[size],\n`;
  code += `          ...vc,\n`;
  code += `          focusRing,\n`;
  code += `          className\n`;
  code += `        )}\n`;
  code += `        role="dialog"\n`;
  code += `        aria-modal="true"\n`;
  code += `        {...rest}\n`;
  code += `      >\n`;

  // Render content slots (excluding overlay)
  for (const slot of contentSlots) {
    const bp = boolProps.find(b => b.controls === slot.name);
    const showProp = bp ? bp.name : null;

    if (slot.type === 'icon') {
      code += renderIconSlot(slot.name, showProp, !!slot.optional, '        ');
    } else if (slot.type === 'text') {
      const textClassVar = TEXT_SLOT_CLASS_MAP[slot.name] || '';
      const colorStyle = slot.name === 'title' ? `color: 'var(--title-color, currentColor)'` :
                        slot.name === 'subtitle' ? `color: 'var(--subtitle-color, currentColor)'` :
                        slot.name === 'description' ? `color: 'var(--description-color, currentColor)'` : '';
      const styleStr = colorStyle ? ` style={{ ${colorStyle} }}` : '';
      const classStr = textClassVar ? ` className={${textClassVar}}` : '';
      const src = (slot.name === 'label' || slot.name === 'hint') ? 'children' : slot.name;
      code += `        <span${classStr}${styleStr}>${src === 'children' ? '{children}' : `{${src}}`}</span>\n`;
    } else if (slot.type === 'component') {
      if (showProp) {
        code += `        {${showProp} && ${slot.name} && <div className="shrink-0">{${slot.name}}</div>}\n`;
      } else if (slot.optional) {
        code += `        {${slot.name} && <div className="shrink-0">{${slot.name}}</div>}\n`;
      }
    } else if (slot.type === 'frame' && slot.children) {
      const dir = slot.layout === 'vertical' ? 'flex-col' : '';
      const fill = slot.sizing === 'fill' ? 'flex-1 min-w-0' : '';
      const alignCls = slot.layout === 'vertical' ? 'items-start' : 'items-center';
      code += `        <div className="flex ${dir} ${fill} ${alignCls} gap-[inherit]">\n`;
      code += renderSlotChildren(slot.children, boolProps, textPropsArr, 10, hasCollapsible, c.iconButtonsInHeader, c.stateSwappedIconSlots);
      code += `        </div>\n`;
    }
  }

  code += `      </div>\n`;
  code += `    </div>,\n`;
  code += `    document.body\n`;
  code += `  );\n});\n`;
  return code;
}

/* ── Switch on-state detection ── */

function getSwitchOnState(c: Contract): string {
  const axes = c.variantAxes || {};
  for (const [axis, vals] of Object.entries(axes)) {
    if (vals.includes('on') && vals.includes('off')) {
      return `${toCamel(axis)} === 'on'`;
    }
  }
  return 'false';
}

/* ── Custom structure JSX for special components ── */

function generateCustomJsx(c: Contract, _pascal: string): string {
  const cs = c.customStructure;
  let jsx = '';

  if (cs === 'switch') {
    const onCheck = getSwitchOnState(c);
    jsx += `      <span className="flex-1" style={{ display: ${onCheck} ? 'block' : 'none' }} />\n`;
    jsx += `      <span className="rounded-full bg-[var(--thumb-bg,white)] border border-[var(--thumb-border,transparent)] shrink-0 transition-all" style={{ width: 'var(--thumb-size, 16px)', height: 'var(--thumb-size, 16px)' }} />\n`;
    jsx += `      <span className="flex-1" style={{ display: ${onCheck} ? 'none' : 'block' }} />\n`;
  } else if (cs === 'checkbox') {
    jsx += `      <svg className="w-full h-full" viewBox="0 0 16 16" fill="none">\n`;
    jsx += `        <path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" fill="currentColor"/>\n`;
    jsx += `      </svg>\n`;
  } else if (cs === 'radioButton') {
    jsx += `      <div className="rounded-full w-full h-full flex items-center justify-center">\n`;
    jsx += `        <div className="rounded-full bg-current" style={{ width: '40%', height: '40%' }} />\n`;
    jsx += `      </div>\n`;
  } else if (cs === 'spinner') {
    jsx += `      <svg className="animate-spin w-full h-full" viewBox="0 0 24 24" fill="none">\n`;
    jsx += `        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />\n`;
    jsx += `        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />\n`;
    jsx += `      </svg>\n`;
  } else if (cs === 'circularProgress') {
    jsx += `      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">\n`;
    jsx += `        <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--track-color, #E5E7EB)" strokeWidth="3" />\n`;
    jsx += `        <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--fill-color, currentColor)" strokeWidth="3" strokeDasharray="97.4" strokeDashoffset="48.7" strokeLinecap="round" />\n`;
    jsx += `      </svg>\n`;
  } else if (cs === 'linearProgress') {
    jsx += `      <div className="h-full rounded-[inherit] bg-[var(--fill-color,currentColor)] transition-all" style={{ width: '50%' }} />\n`;
  } else if (cs === 'divider') {
    jsx += `      <div className="w-full h-full bg-[var(--line-color,var(--color-divider))] rounded-[inherit]" />\n`;
  } else if (cs === 'slider') {
    jsx += `      <div className="relative w-full">\n`;
    jsx += `        <div className="w-full h-1.5 rounded-full bg-[var(--track-bg,#E5E7EB)]" />\n`;
    jsx += `        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 rounded-full bg-[var(--thumb-bg,white)] border-2 border-[var(--thumb-border,currentColor)] cursor-pointer" style={{ width: 'var(--thumb-size, 16px)', height: 'var(--thumb-size, 16px)' }} />\n`;
    jsx += `      </div>\n`;
  } else if (cs === 'scrollbar') {
    jsx += `      {children}\n`;
  } else if (cs === 'pinInput') {
    jsx += `      {children}\n`;
  } else if (cs === 'tooltip') {
    jsx += `      <span>{children}</span>\n`;
  } else if (cs === 'avatar') {
    jsx += `      {children}\n`;
  } else if (cs === 'image') {
    // Enhanced image with <img>, skeleton, and aspect ratio
    if (has(c, 'imgTag')) {
      jsx += `      {imgState === 'loading' && <SkeletonBlock shimmer className="absolute inset-0" style={{ width: '100%', height: '100%' }} />}\n`;
      jsx += `      {src && (\n`;
      jsx += `        <img\n`;
      jsx += `          src={src}\n`;
      jsx += `          alt={alt || ''}\n`;
      jsx += `          onLoad={() => { setImgState('loaded'); onLoadProp?.(); }}\n`;
      jsx += `          onError={() => { setImgState('error'); onErrorProp?.(); }}\n`;
      jsx += `          className="w-full h-full object-cover"\n`;
      jsx += `          style={{ display: imgState === 'loaded' ? 'block' : 'none' }}\n`;
      jsx += `        />\n`;
      jsx += `      )}\n`;
      jsx += `      {imgState === 'error' && (\n`;
      jsx += `        <div className="w-full h-full flex items-center justify-center bg-[var(--color-surface-3)] text-[var(--color-text-muted)] text-style-caption">\n`;
      jsx += `          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>\n`;
      jsx += `        </div>\n`;
      jsx += `      )}\n`;
      jsx += `      {children}\n`;
    } else {
      jsx += `      {children}\n`;
    }
  } else if (cs === 'breadcrumb') {
    jsx += `      {children}\n`;
  } else if (cs?.startsWith('skeleton')) {
    jsx += `      <div className="animate-pulse bg-[var(--color-surface-3)] rounded w-full h-full" />\n`;
  } else {
    jsx += `      {children}\n`;
  }

  return jsx;
}

/* ── Index file ── */

function generateIndex(c: Contract, pascal: string): string {
  const axes = c.variantAxes || {};
  const types = Object.keys(axes).map(a => `${pascal}${toPascal(a)}`).join(', ');
  return `${BANNER}\nexport { ${pascal} } from './${pascal}';\nexport type { ${pascal}Props${types ? ', ' + types : ''} } from './${pascal}.types';\n`;
}

/* ── Hash guard ── */

function loadHashes(): Record<string, string> {
  if (existsSync(HASHES_FILE)) {
    try { return JSON.parse(readFileSync(HASHES_FILE, 'utf-8')); } catch { return {}; }
  }
  return {};
}

function saveHashes(hashes: Record<string, string>): void {
  writeFileSync(HASHES_FILE, JSON.stringify(hashes, null, 2), 'utf-8');
}

function sha256(content: string): string {
  return createHash('sha256').update(content, 'utf-8').digest('hex');
}

/* ── Template-based generation ── */

const TEMPLATES_DIR = join(__dirname, 'templates');

function generateFromTemplate(c: Contract, pascal: string): { component: string; types: string; index: string } | null {
  const templateName = c.template || pascal;
  const tsxTemplatePath = join(TEMPLATES_DIR, `${templateName}.template.tsx`);
  const typesTemplatePath = join(TEMPLATES_DIR, `${templateName}.template.types.ts`);

  if (!existsSync(tsxTemplatePath)) {
    console.log(`  ⚠  Template not found: ${tsxTemplatePath}`);
    return null;
  }

  let tsxContent = readFileSync(tsxTemplatePath, 'utf-8');
  let typesContent: string;

  if (existsSync(typesTemplatePath)) {
    typesContent = readFileSync(typesTemplatePath, 'utf-8');
  } else {
    typesContent = generateTypes(c, pascal);
  }

  const sizeClasses = generateTemplateSizeClasses(c, pascal);
  tsxContent = tsxContent.replace(/\{\{SIZE_CLASSES\}\}/g, sizeClasses);
  tsxContent = tsxContent.replace(/\{\{COMPONENT_NAME\}\}/g, pascal);

  const indexTemplatePath = join(TEMPLATES_DIR, `${templateName}.template.index.ts`);
  let indexContent: string;
  if (existsSync(indexTemplatePath)) {
    indexContent = readFileSync(indexTemplatePath, 'utf-8');
  } else {
    const axes = c.variantAxes || {};
    const typeExports = Object.keys(axes).map(a => `${pascal}${toPascal(a)}`);
    indexContent = `${BANNER}\nexport { ${pascal} } from './${pascal}';\nexport type { ${pascal}Props${typeExports.length ? ', ' + typeExports.join(', ') : ''} } from './${pascal}.types';\n`;
  }

  return { component: tsxContent, types: typesContent, index: indexContent };
}

function generateTemplateSizeClasses(c: Contract, pascal: string): string {
  const sizeAxis = c.variantAxes?.size;
  if (!sizeAxis || sizeAxis.length === 0) return '';
  const rp = c.responsiveProps;
  if (!rp) return '';

  const sizeType = `${pascal}Size`;
  const heightFixed = c.heightConstraint === 'fixed';
  const iconSizeMap = c.iconSizeMap;
  const lines: string[] = [`const SIZE_CLASSES: Record<${sizeType}, string> = {`];

  for (const s of sizeAxis) {
    const parts: string[] = [];
    const px = rp.paddingX?.[s]; if (px) parts.push(`px-[var(${tokenToCssVar(px)})]`);
    const py = rp.paddingY?.[s]; if (py) parts.push(`py-[var(${tokenToCssVar(py)})]`);
    const mh = rp.minHeight?.[s]; if (mh) {
      parts.push(`min-h-[var(${tokenToCssVar(mh)})]`);
      if (heightFixed) parts.push(`max-h-[var(${tokenToCssVar(mh)})]`);
    }
    const mw = rp.minWidth?.[s]; if (mw) {
      parts.push(`min-w-[var(${tokenToCssVar(mw)})]`);
    } else if (heightFixed && mh) {
      parts.push(`min-w-[var(${tokenToCssVar(mh)})]`);
    }
    const xw = rp.maxWidth?.[s]; if (xw) parts.push(`max-w-[var(${tokenToCssVar(xw)})]`);
    const g = rp.gap?.[s]; if (g) parts.push(`gap-[var(${tokenToCssVar(g)})]`);
    const ts = rp.textStyle?.[s]; if (ts && TEXT_STYLE_MAP[ts]) parts.push(TEXT_STYLE_MAP[ts]);
    const br = rp.borderRadius?.[s]; if (br) parts.push(`rounded-[var(${tokenToCssVar(br)})]`);
    const bs = rp.boxSize?.[s]; if (bs) { parts.push(`w-[var(${tokenToCssVar(bs)})]`); parts.push(`h-[var(${tokenToCssVar(bs)})]`); }
    const tw = rp.trackW?.[s]; if (tw) parts.push(`w-[var(${tokenToCssVar(tw)})]`);
    const th = rp.trackH?.[s]; if (th) parts.push(`h-[var(${tokenToCssVar(th)})]`);
    const ts2 = rp.thumbSize?.[s]; if (ts2) parts.push(`[--thumb-size:var(${tokenToCssVar(ts2)})]`);
    const is2 = rp.iconSize?.[s]; if (is2) parts.push(`[--icon-size:var(${tokenToCssVar(is2)})]`);
    if (!rp.iconSize?.[s] && iconSizeMap && iconSizeMap[s]) {
      parts.push(`[--icon-size:${iconSizeMap[s]}px]`);
    }
    lines.push(`  ${s}: '${parts.join(' ')}',`);
  }
  lines.push('};');
  return lines.join('\n');
}

/* ── Main ── */

function main() {
  const forceFlag = process.argv.includes('--force');
  const files = readdirSync(CONTRACTS_DIR, { withFileTypes: true })
    .filter(f => f.isFile() && f.name.endsWith('.contract.json'))
    .map(f => f.name);

  const hashes = loadHashes();
  let count = 0;
  let skipped = 0;
  let guarded = 0;
  let templated = 0;

  for (const file of files) {
    const c: Contract = JSON.parse(readFileSync(join(CONTRACTS_DIR, file), 'utf-8'));

    if (c.generatorStrategy === 'preserve' || c.manualImplementation) {
      console.log(`  ⏭  Skipping ${c.name} (manualImplementation)`);
      skipped++;
      continue;
    }

    const dir = componentDir(c.name);
    const pascal = toPascal(dir);
    const outDir = join(OUTPUT_DIR, dir);
    mkdirSync(outDir, { recursive: true });

    let filesToWrite: Array<{ name: string; content: string }>;

    if (c.generatorStrategy === 'template') {
      const result = generateFromTemplate(c, pascal);
      if (!result) {
        console.log(`  ⚠  Template generation failed for ${c.name}, falling back to standard`);
        const typesContent = generateTypes(c, pascal);
        const componentContent = generateComponent(c, pascal);
        const indexContent = generateIndex(c, pascal);
        filesToWrite = [
          { name: `${pascal}.types.ts`, content: typesContent },
          { name: `${pascal}.tsx`, content: componentContent },
          { name: 'index.ts', content: indexContent },
        ];
      } else {
        filesToWrite = [
          { name: `${pascal}.types.ts`, content: result.types },
          { name: `${pascal}.tsx`, content: result.component },
          { name: 'index.ts', content: result.index },
        ];
        templated++;
      }
    } else {
      const typesContent = generateTypes(c, pascal);
      const componentContent = generateComponent(c, pascal);
      const indexContent = generateIndex(c, pascal);
      filesToWrite = [
        { name: `${pascal}.types.ts`, content: typesContent },
        { name: `${pascal}.tsx`, content: componentContent },
        { name: 'index.ts', content: indexContent },
      ];
    }

    let componentGuarded = false;

    for (const fw of filesToWrite) {
      const filePath = join(outDir, fw.name);
      const hashKey = `${dir}/${fw.name}`;

      if (!forceFlag && existsSync(filePath)) {
        const existingContent = readFileSync(filePath, 'utf-8');
        const existingHash = sha256(existingContent);
        const storedHash = hashes[hashKey];

        if (storedHash && existingHash !== storedHash) {
          console.log(`  ⚠  Guard: ${dir}/${fw.name} was manually edited — skipping (use --force to override)`);
          componentGuarded = true;
          continue;
        }
      }

      writeFileSync(filePath, fw.content, 'utf-8');
      hashes[hashKey] = sha256(fw.content);
    }

    if (componentGuarded) {
      guarded++;
    } else {
      count++;
    }
  }

  saveHashes(hashes);
  console.log(`Generated ${count} component(s) (${templated} from templates), skipped ${skipped} manual, ${guarded} guarded → ${OUTPUT_DIR}`);
}

main();
