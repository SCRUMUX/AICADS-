/**
 * spec-to-contracts.ts
 * Reads ai-ds-spec.json + component-structures.json and generates
 * component contracts that include BOTH style rules AND structural info.
 *
 * Run: npm run contracts:generate
 * Source: ../ai-ds-spec.json, ../component-structures.json
 * Output: ../contracts/components/*.contract.json
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SPEC_PATH = join(ROOT, 'ai-ds-spec.json');
const STRUCTURES_PATH = join(ROOT, 'component-structures.json');
const OUTPUT_DIR = join(ROOT, 'contracts', 'components');

interface VariantRule {
  when: Record<string, string>;
  style: Record<string, string | number | boolean>;
}

interface ComponentSpec {
  name: string;
  description?: string;
  variantProps?: string[];
  variantAxes?: Record<string, string[]>;
  variantRules?: VariantRule[];
  interaction?: { focus?: Record<string, string> };
  defaultContent?: string;
  popoverSlotCount?: number;
  submenuSlotCount?: number;
  layoutRules?: Record<string, string>;
}

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

interface TextProp {
  name: string;
  figmaName?: string;
  default: string;
}

interface ComponentStructure {
  element: string;
  htmlInput?: boolean;
  inputType?: string;
  composite?: boolean;
  customStructure?: string;
  rootLayout: string;
  rootSizing?: { main: string; cross: string };
  rootAlign?: { main: string; cross: string };
  styleKeys?: string[];
  defaultWidth?: number;
  sizeHeightMap?: Record<string, string>;
  slots: Slot[];
  booleanProps: BooleanProp[];
  instanceSwapProps: InstanceSwapProp[];
  textProps: TextProp[];
  conditionalSlots?: Record<string, unknown>;
  levelsCount?: number;
  columnCount?: number;
  columnComponent?: string;
  headerComponent?: string;
  rowComponent?: string;
  rowCount?: number;
}

interface Structures {
  components: Record<string, ComponentStructure>;
}

function tokenToTwName(tokenName: string): string {
  return tokenName.replace(/^color_/, '').replace(/_/g, '-');
}

function tokenToCssVar(tokenName: string): string {
  return '--' + tokenName.replace(/_/g, '-');
}

function colorClass(prefix: string, tokenName: string): string {
  if (tokenName === 'transparent') return `${prefix}-transparent`;
  return `${prefix}-[var(${tokenToCssVar(tokenName)})]`;
}

function spaceClass(prefix: string, tokenName: string): string {
  return `${prefix}-[var(${tokenToCssVar(tokenName)})]`;
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

const RADIUS_MAP: Record<string, string> = {
  radius_none: 'rounded-none',
  radius_subtle: 'rounded-subtle',
  radius_default: 'rounded-default',
  radius_medium: 'rounded-medium',
  radius_large: 'rounded-large',
  radius_xl: 'rounded-xl',
  radius_2xl: 'rounded-2xl',
  radius_3xl: 'rounded-3xl',
  radius_section: 'rounded-section',
  radius_pill: 'rounded-pill',
  radius_button: 'rounded-pill',
};

function styleToTailwindClasses(style: Record<string, string | number | boolean>): string[] {
  const classes: string[] = [];
  const s = style;

  const bgVal = (s.bg ?? s.background) as string | undefined;
  if (bgVal === 'transparent') classes.push('bg-transparent');
  else if (typeof bgVal === 'string' && bgVal) classes.push(colorClass('bg', bgVal));

  if (typeof s.textColor === 'string' && s.textColor) classes.push(colorClass('text', s.textColor));
  if (typeof s.titleColor === 'string') classes.push(`[--title-color:var(${tokenToCssVar(s.titleColor)})]`);
  if (typeof s.subtitleColor === 'string') classes.push(`[--subtitle-color:var(${tokenToCssVar(s.subtitleColor)})]`);
  if (typeof s.descriptionColor === 'string') classes.push(`[--description-color:var(${tokenToCssVar(s.descriptionColor)})]`);
  if (typeof s.metaColor === 'string') classes.push(`[--meta-color:var(${tokenToCssVar(s.metaColor)})]`);
  if (typeof s.labelColor === 'string') classes.push(`[--label-color:var(${tokenToCssVar(s.labelColor)})]`);
  if (typeof s.iconColor === 'string') classes.push(`[--icon-color:var(${tokenToCssVar(s.iconColor)})]`);
  if (typeof s.lineColor === 'string') classes.push(`[--line-color:var(${tokenToCssVar(s.lineColor)})]`);
  if (typeof s.dividerColor === 'string') classes.push(`[--divider-color:var(${tokenToCssVar(s.dividerColor)})]`);
  if (typeof s.fillColor === 'string') classes.push(`[--fill-color:var(${tokenToCssVar(s.fillColor)})]`);
  if (typeof s.trackBg === 'string') classes.push(`[--track-bg:var(${tokenToCssVar(s.trackBg)})]`);
  if (typeof s.trackColor === 'string') classes.push(`[--track-color:var(${tokenToCssVar(s.trackColor)})]`);
  if (typeof s.thumbBg === 'string') classes.push(`[--thumb-bg:var(${tokenToCssVar(s.thumbBg)})]`);
  if (typeof s.thumbBorderColor === 'string') classes.push(`[--thumb-border:var(${tokenToCssVar(s.thumbBorderColor)})]`);
  if (typeof s.underlineColor === 'string') classes.push(`[--underline-color:var(${tokenToCssVar(s.underlineColor)})]`);
  if (typeof s.initialsColor === 'string') classes.push(`[--initials-color:var(${tokenToCssVar(s.initialsColor)})]`);
  if (typeof s.itemBg === 'string') classes.push(`[--item-bg:var(${tokenToCssVar(s.itemBg)})]`);
  if (typeof s.itemTextColor === 'string') classes.push(`[--item-text:var(${tokenToCssVar(s.itemTextColor)})]`);
  if (typeof s.itemIconColor === 'string') classes.push(`[--item-icon:var(${tokenToCssVar(s.itemIconColor)})]`);
  if (typeof s.popoverBg === 'string') classes.push(`[--popover-bg:var(${tokenToCssVar(s.popoverBg)})]`);
  if (typeof s.popoverBorder === 'string') classes.push(`[--popover-border:var(${tokenToCssVar(s.popoverBorder)})]`);
  if (typeof s.sortIconColor === 'string') classes.push(`[--sort-icon-color:var(${tokenToCssVar(s.sortIconColor)})]`);
  if (typeof s.closeIconColor === 'string') classes.push(`[--close-icon:var(${tokenToCssVar(s.closeIconColor)})]`);
  if (typeof s.filledTextColor === 'string') classes.push(`[--filled-text:var(${tokenToCssVar(s.filledTextColor)})]`);

  if (typeof s.borderColor === 'string' && s.borderColor && s.borderSide !== 'none') {
    if (s.borderSide === 'bottom') {
      classes.push('border-0', 'border-b', `border-b-[var(${tokenToCssVar(s.borderColor)})]`);
    } else if (s.borderSide === 'top') {
      classes.push('border-0', 'border-t', `border-t-[var(${tokenToCssVar(s.borderColor)})]`);
    } else if (s.borderSide === 'left') {
      classes.push('border-0', 'border-l', `border-l-[var(${tokenToCssVar(s.borderColor)})]`);
    } else if (s.borderSide === 'right') {
      classes.push('border-0', 'border-r', `border-r-[var(${tokenToCssVar(s.borderColor)})]`);
    } else {
      classes.push('border', colorClass('border', s.borderColor));
    }
  } else if (s.borderSide === 'none') {
    // Use transparent border instead of border-0 to prevent layout shift on hover transitions
    classes.push('border', 'border-transparent');
  } else if (!s.borderColor && typeof s.borderSide === 'string' && s.borderSide !== 'none') {
    if (s.borderSide === 'bottom') classes.push('border-0', 'border-b');
    else if (s.borderSide === 'top') classes.push('border-0', 'border-t');
    else if (s.borderSide === 'left') classes.push('border-0', 'border-l');
    else if (s.borderSide === 'right') classes.push('border-0', 'border-r');
  }

  if (typeof s.paddingX === 'string') classes.push(spaceClass('px', s.paddingX));
  if (typeof s.paddingY === 'string') classes.push(spaceClass('py', s.paddingY));
  if (typeof s.paddingBottom === 'string') classes.push(spaceClass('pb', s.paddingBottom));
  if (typeof s.gap === 'string') classes.push(spaceClass('gap', s.gap));
  if (typeof s.itemPaddingX === 'string') classes.push(`[--item-px:var(${tokenToCssVar(s.itemPaddingX)})]`);
  if (typeof s.itemPaddingY === 'string') classes.push(`[--item-py:var(${tokenToCssVar(s.itemPaddingY)})]`);
  if (typeof s.itemGap === 'string') classes.push(`[--item-gap:var(${tokenToCssVar(s.itemGap)})]`);
  if (typeof s.popoverPadding === 'string') classes.push(`[--popover-pad:var(${tokenToCssVar(s.popoverPadding)})]`);
  if (typeof s.submenuOffset === 'string') classes.push(`[--submenu-offset:var(${tokenToCssVar(s.submenuOffset)})]`);
  if (typeof s.submenuPadding === 'string') classes.push(`[--submenu-pad:var(${tokenToCssVar(s.submenuPadding)})]`);
  if (typeof s.separatorGap === 'string') classes.push(`[--separator-gap:var(${tokenToCssVar(s.separatorGap)})]`);
  if (typeof s.textBlockGap === 'string') classes.push(`[--text-block-gap:var(${tokenToCssVar(s.textBlockGap)})]`);
  if (typeof s.actionsGap === 'string') classes.push(`[--actions-gap:var(${tokenToCssVar(s.actionsGap)})]`);

  if (typeof s.minWidth === 'string') classes.push(spaceClass('min-w', s.minWidth));
  if (typeof s.maxWidth === 'string') classes.push(spaceClass('max-w', s.maxWidth));
  if (typeof s.minHeight === 'string') classes.push(spaceClass('min-h', s.minHeight));
  if (typeof s.maxHeight === 'string') classes.push(spaceClass('max-h', s.maxHeight));
  if (typeof s.boxSize === 'string') {
    classes.push(spaceClass('w', s.boxSize));
    classes.push(spaceClass('h', s.boxSize));
  }
  if (typeof s.iconSize === 'string') classes.push(`[--icon-size:var(${tokenToCssVar(s.iconSize)})]`);
  if (typeof s.iconWrapperSize === 'string') classes.push(`[--icon-wrap-size:var(${tokenToCssVar(s.iconWrapperSize)})]`);
  if (typeof s.badgeSize === 'string') classes.push(`[--badge-size:var(${tokenToCssVar(s.badgeSize)})]`);
  if (typeof s.thumbSize === 'string') classes.push(`[--thumb-size:var(${tokenToCssVar(s.thumbSize)})]`);
  if (typeof s.trackW === 'string') classes.push(`w-[var(${tokenToCssVar(s.trackW)})]`);
  if (typeof s.trackH === 'string') classes.push(`h-[var(${tokenToCssVar(s.trackH)})]`);
  if (typeof s.lineThickness === 'string') classes.push(`[--line-thickness:var(${tokenToCssVar(s.lineThickness)})]`);
  if (typeof s.lineLength === 'string') classes.push(`[--line-length:var(${tokenToCssVar(s.lineLength)})]`);
  if (typeof s.widthPx === 'number') classes.push(`w-[${s.widthPx}px]`);
  if (typeof s.minWidthPx === 'number') classes.push(`min-w-[${s.minWidthPx}px]`);
  if (typeof s.maxWidthPx === 'number') classes.push(`max-w-[${s.maxWidthPx}px]`);
  if (typeof s.popoverMaxHeight === 'string') classes.push(`[--popover-max-h:var(${tokenToCssVar(s.popoverMaxHeight)})]`);
  if (typeof s.popoverRadius === 'string') classes.push(`[--popover-radius:var(${tokenToCssVar(s.popoverRadius)})]`);
  if (typeof s.innerSize === 'string') classes.push(`[--inner-size:var(${tokenToCssVar(s.innerSize)})]`);
  if (typeof s.cellSize === 'string') classes.push(`[--cell-size:var(${tokenToCssVar(s.cellSize)})]`);

  if (typeof s.borderRadius === 'string') {
    const cls = RADIUS_MAP[s.borderRadius];
    if (cls) classes.push(cls);
    else classes.push(`rounded-[var(${tokenToCssVar(s.borderRadius)})]`);
  }

  if (typeof s.textStyle === 'string') {
    const cls = TEXT_STYLE_MAP[s.textStyle];
    if (cls) classes.push(cls);
  }
  if (typeof s.titleStyle === 'string') {
    const cls = TEXT_STYLE_MAP[s.titleStyle];
    if (cls) classes.push(`[--title-text-class:${cls}]`);
  }
  if (typeof s.paragraphStyle === 'string') {
    const cls = TEXT_STYLE_MAP[s.paragraphStyle];
    if (cls) classes.push(`[--paragraph-text-class:${cls}]`);
  }
  if (typeof s.subtitleStyle === 'string') {
    const cls = TEXT_STYLE_MAP[s.subtitleStyle];
    if (cls) classes.push(`[--subtitle-text-class:${cls}]`);
  }
  if (typeof s.descriptionStyle === 'string') {
    const cls = TEXT_STYLE_MAP[s.descriptionStyle];
    if (cls) classes.push(`[--desc-text-class:${cls}]`);
  }
  if (typeof s.contentTextStyle === 'string') {
    const cls = TEXT_STYLE_MAP[s.contentTextStyle];
    if (cls) classes.push(`[--content-text-class:${cls}]`);
  }
  if (typeof s.contentMinWidth === 'string') classes.push(spaceClass('min-w', s.contentMinWidth));
  if (typeof s.contentMaxWidth === 'string') classes.push(spaceClass('max-w', s.contentMaxWidth));

  if (typeof s.opacityToken === 'string') classes.push(`opacity-[var(${tokenToCssVar(s.opacityToken)})]`);
  if (typeof s.elevationToken === 'string') {
    const eName = s.elevationToken.replace('effect_', '').replace(/_/g, '-');
    classes.push(`shadow-${eName}`);
  }

  if (typeof s.activeBg === 'string') classes.push(`[--active-bg:var(${tokenToCssVar(s.activeBg)})]`);
  if (typeof s.activeBorder === 'string') classes.push(`[--active-border:var(${tokenToCssVar(s.activeBorder)})]`);
  if (typeof s.activeIcon === 'string') classes.push(`[--active-icon:var(${tokenToCssVar(s.activeIcon)})]`);
  if (typeof s.activeText === 'string') classes.push(`[--active-text:var(${tokenToCssVar(s.activeText)})]`);
  if (typeof s.underlineSide === 'string') classes.push(`[data-underline-side="${s.underlineSide}"]`);
  if (typeof s.layoutDirection === 'string') classes.push(s.layoutDirection === 'vertical' ? 'flex-col' : 'flex-row');
  if (typeof s.arrowSide === 'string') classes.push(`[data-arrow-side="${s.arrowSide}"]`);
  if (typeof s.arrowAlign === 'string') classes.push(`[data-arrow-align="${s.arrowAlign}"]`);
  if (typeof s.thumbShape === 'string') classes.push(`[data-thumb-shape="${s.thumbShape}"]`);
  if (typeof s.chartMode === 'string') classes.push(`[data-chart-mode="${s.chartMode}"]`);
  if (typeof s.areaOpacity === 'number') classes.push(`[--area-opacity:${s.areaOpacity}]`);
  if (typeof s.donutInnerRadius === 'number') classes.push(`[--donut-inner:${s.donutInnerRadius}]`);
  if (typeof s.trackLength === 'string') classes.push(`[--track-length:var(${tokenToCssVar(s.trackLength)})]`);
  if (typeof s.valueMin === 'number') classes.push(`[data-min="${s.valueMin}"]`);
  if (typeof s.valueMax === 'number') classes.push(`[data-max="${s.valueMax}"]`);
  if (typeof s.counterAxisAlignItems === 'string') classes.push(`[data-counter-align="${s.counterAxisAlignItems}"]`);
  if (typeof s.primaryAxisAlignItems === 'string') classes.push(`[data-primary-align="${s.primaryAxisAlignItems}"]`);

  if (typeof s.icon === 'string') classes.push(`[data-icon="${s.icon}"]`);
  if (typeof s.iconRole === 'string') classes.push(`[data-icon-role="${s.iconRole}"]`);
  if (typeof s.inner === 'string') classes.push(`[data-inner="${s.inner}"]`);

  if (typeof s.value === 'number') classes.push(`[data-value="${s.value}"]`);
  if (typeof s.showLabel === 'boolean') classes.push(`[data-show-label="${s.showLabel}"]`);
  if (typeof s.showContent === 'boolean') classes.push(`[data-show-content="${s.showContent}"]`);
  if (typeof s.heroMode === 'boolean') classes.push(`[data-hero="${s.heroMode}"]`);
  if (typeof s.shimmer === 'boolean') classes.push(`[data-shimmer="${s.shimmer}"]`);

  return classes;
}

function extractResponsiveProps(
  comp: ComponentSpec,
  structure?: ComponentStructure
): Record<string, Record<string, string>> | undefined {
  const sizeAxis = comp.variantAxes?.size;
  if (!sizeAxis) return undefined;

  const propKeys = ['paddingX', 'paddingY', 'gap', 'minHeight', 'minWidth', 'maxHeight', 'maxWidth',
    'textStyle', 'borderRadius', 'boxSize', 'trackW', 'trackH', 'thumbSize',
    'iconSize', 'iconWrapperSize', 'cellSize', 'lineThickness', 'lineLength',
    'itemPaddingX', 'itemPaddingY', 'itemGap', 'badgeSize',
    'contentMinWidth', 'contentMaxWidth', 'contentTextStyle'];

  const result: Record<string, Record<string, string>> = {};

  for (const rule of comp.variantRules || []) {
    const sz = rule.when.size;
    if (!sz || Object.keys(rule.when).length !== 1) continue;

    for (const key of propKeys) {
      const val = rule.style[key];
      if (typeof val === 'string' && val) {
        if (!result[key]) result[key] = {};
        result[key][sz] = val;
      }
    }
  }

  if (structure?.sizeHeightMap) {
    if (!result.minHeight) result.minHeight = {};
    for (const [sz, token] of Object.entries(structure.sizeHeightMap)) {
      if (!result.minHeight[sz]) result.minHeight[sz] = token;
    }
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

function buildContract(
  comp: ComponentSpec,
  structure?: ComponentStructure
): Record<string, unknown> {
  const variantRules = (comp.variantRules || []).map((r) => ({
    when: r.when,
    style: r.style,
    tailwindClasses: styleToTailwindClasses(r.style),
  }));

  const axes = comp.variantAxes || {};
  const stateAxis = Object.entries(axes).find(
    ([, vals]) => vals.includes('hover') || vals.includes('focus')
  );
  const stateAxisName = stateAxis?.[0];
  const stateValues = stateAxis?.[1] || ['base'];

  const stateMachine = stateAxisName ? {
    initial: 'base',
    stateAxis: stateAxisName,
    states: stateValues,
    transitions: [
      { from: 'base', to: 'hover', trigger: 'mouseenter' },
      { from: 'hover', to: 'base', trigger: 'mouseleave' },
      { from: 'base', to: 'focus', trigger: 'focus' },
      { from: 'focus', to: 'base', trigger: 'blur' },
      ...(stateValues.includes('active')
        ? [
            { from: 'hover', to: 'active', trigger: 'mousedown' },
            { from: 'active', to: 'hover', trigger: 'mouseup' },
          ]
        : []),
    ],
  } : undefined;

  const focusRing = comp.interaction?.focus?.default || 'effect_focus_brand';
  const focusRingDanger = comp.interaction?.focus?.danger || 'effect_focus_danger';
  const focusRingClass = 'focus-' + focusRing.replace('effect_focus_', '').replace(/_/g, '-');
  const focusRingDangerClass = 'focus-' + focusRingDanger.replace('effect_focus_', '').replace(/_/g, '-');

  const responsiveProps = extractResponsiveProps(comp, structure);

  const contract: Record<string, unknown> = {
    name: comp.name,
    description: comp.description,
    variantProps: comp.variantProps,
    variantAxes: Object.fromEntries(
      Object.entries(comp.variantAxes || {}).map(([k, vals]) => [k, vals.map(v => String(v))])
    ),
    variantRules,
    stateMachine,
    focusRing: `focus-visible:outline-none focus-visible:shadow-${focusRingClass}`,
    focusRingDanger: `focus-visible:outline-none focus-visible:shadow-${focusRingDangerClass}`,
    responsiveProps,
  };

  if (comp.defaultContent) contract.defaultContent = comp.defaultContent;
  if (comp.popoverSlotCount) contract.popoverSlotCount = comp.popoverSlotCount;
  if (comp.submenuSlotCount) contract.submenuSlotCount = comp.submenuSlotCount;
  if (comp.layoutRules) contract.layoutRules = comp.layoutRules;

  if (structure) {
    contract.element = structure.element;
    contract.rootLayout = structure.rootLayout;
    if (structure.rootSizing) contract.rootSizing = structure.rootSizing;
    if (structure.rootAlign) contract.rootAlign = structure.rootAlign;
    if (structure.htmlInput) contract.htmlInput = structure.htmlInput;
    if (structure.inputType) contract.inputType = structure.inputType;
    if (structure.composite) contract.composite = structure.composite;
    if (structure.customStructure) contract.customStructure = structure.customStructure;
    if (structure.defaultWidth) contract.defaultWidth = structure.defaultWidth;
    if (structure.sizeHeightMap) contract.sizeHeightMap = structure.sizeHeightMap;
    if (structure.slots.length > 0) contract.slots = structure.slots;
    if (structure.booleanProps.length > 0) contract.booleanProps = structure.booleanProps;
    if (structure.instanceSwapProps.length > 0) contract.instanceSwapProps = structure.instanceSwapProps;
    if (structure.textProps.length > 0) contract.textProps = structure.textProps;
    if (structure.conditionalSlots) contract.conditionalSlots = structure.conditionalSlots;
    if (structure.styleKeys) contract.styleKeys = structure.styleKeys;
    if (structure.levelsCount) contract.levelsCount = structure.levelsCount;
    if (structure.columnCount) contract.columnCount = structure.columnCount;
    if (structure.columnComponent) contract.columnComponent = structure.columnComponent;
    if (structure.headerComponent) contract.headerComponent = structure.headerComponent;
    if (structure.rowComponent) contract.rowComponent = structure.rowComponent;
    if (structure.rowCount) contract.rowCount = structure.rowCount;

    // Enriched fields from figma-to-structures extractor
    const enriched = structure as any;
    if (enriched.heightConstraint) contract.heightConstraint = enriched.heightConstraint;
    if (enriched.borderWidthToken) contract.borderWidthToken = enriched.borderWidthToken;
    if (enriched.iconSizeMap) contract.iconSizeMap = enriched.iconSizeMap;
    if (enriched.clipsContent) contract.clipsContent = enriched.clipsContent;
    if (enriched.defaultHeight) contract.defaultHeight = enriched.defaultHeight;
  }

  return contract;
}

const PRESERVED_KEYS = [
  'generatorStrategy', 'manualImplementation', 'template', 'enhancements',
] as const;

function main() {
  const spec = JSON.parse(readFileSync(SPEC_PATH, 'utf-8'));
  const components: ComponentSpec[] = spec.components || [];

  let structures: Structures = { components: {} };
  try {
    structures = JSON.parse(readFileSync(STRUCTURES_PATH, 'utf-8'));
  } catch {
    console.warn('component-structures.json not found, generating contracts without structure.');
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });

  let count = 0;
  let merged = 0;
  for (const comp of components) {
    if (!comp?.name) continue;
    const structure = structures.components[comp.name];
    const contract = buildContract(comp, structure);
    const safeName = comp.name.replace(/^@UI\//, '').replace(/\//g, '-');
    const outPath = join(OUTPUT_DIR, `${safeName}.contract.json`);

    if (existsSync(outPath)) {
      try {
        const existing = JSON.parse(readFileSync(outPath, 'utf-8'));
        for (const key of PRESERVED_KEYS) {
          if (existing[key] !== undefined && contract[key] === undefined) {
            contract[key] = existing[key];
            merged++;
          }
        }
      } catch { /* corrupted file — overwrite */ }
    }

    writeFileSync(outPath, JSON.stringify(contract, null, 2), 'utf-8');
    count++;
  }

  console.log(`Wrote ${count} component contracts to ${OUTPUT_DIR}`);
  if (merged > 0) console.log(`  Preserved ${merged} metadata field(s) from existing contracts.`);
}

main();
