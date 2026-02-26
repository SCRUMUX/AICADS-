/**
 * spec-to-behaviors.ts
 * Reads contracts and generates a behavior seed file: state machines and focus
 * config per component. The app can import this and register at bootstrap.
 *
 * Run after: npm run contracts:generate
 * Run: npm run behaviors:generate
 * Output: ../behaviors/generated/component-behaviors.ts
 *
 * Behavior layer insertion: at app bootstrap, call registerComponentBehaviors()
 * (or use getComponentStateMachine / getComponentFocusRing from this module).
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTRACTS_DIR = join(ROOT, 'contracts', 'components');
const OUTPUT_FILE = join(ROOT, 'behaviors', 'generated', 'component-behaviors.ts');

interface Contract {
  name: string;
  stateMachine?: { initial?: string; states?: string[]; transitions?: Array<{ from: string; to: string; trigger: string }> };
  focusRing?: string;
  focusRingDanger?: string;
}

function main() {
  const files = readdirSync(CONTRACTS_DIR, { withFileTypes: true })
    .filter((f) => f.isFile() && f.name.endsWith('.contract.json'))
    .map((f) => f.name);

  const componentIds: string[] = [];
  const stateMachines: string[] = [];
  const focusRings: string[] = [];

  for (const file of files) {
    const contract: Contract = JSON.parse(
      readFileSync(join(CONTRACTS_DIR, file), 'utf-8')
    );
    const id = contract.name;

    componentIds.push(`  '${id}',`);

    if (contract.stateMachine?.states?.length) {
      const sm = contract.stateMachine;
      const states = JSON.stringify(sm.states);
      const transitions = JSON.stringify(sm.transitions || []);
      stateMachines.push(`  ['${id}']: { initial: '${sm.initial || 'base'}', states: ${states}, transitions: ${transitions} },`);
    }

    if (contract.focusRing || contract.focusRingDanger) {
      focusRings.push(`  ['${id}']: { focusRing: ${JSON.stringify(contract.focusRing || '')}, focusRingDanger: ${JSON.stringify(contract.focusRingDanger || '')} },`);
    }
  }

  const out = `/**
 * AUTO-GENERATED from contracts. Do not edit by hand.
 * Regenerate: npm run behaviors:generate
 *
 * Behavior layer: import this in your app and call registerComponentBehaviors()
 * to seed the behavior registry with component state machines and focus config.
 */

export const COMPONENT_IDS = [
${componentIds.join('\n')}
];

export const COMPONENT_STATE_MACHINES: Record<string, { initial: string; states: string[]; transitions: Array<{ from: string; to: string; trigger: string }> }> = {
${stateMachines.join('\n')}
};

export const COMPONENT_FOCUS_RINGS: Record<string, { focusRing: string; focusRingDanger: string }> = {
${focusRings.join('\n')}
};

export function getComponentStateMachine(componentId: string) {
  return COMPONENT_STATE_MACHINES[componentId];
}

export function getComponentFocusRing(componentId: string, isDanger = false) {
  const c = COMPONENT_FOCUS_RINGS[componentId];
  if (!c) return '';
  return isDanger ? c.focusRingDanger : c.focusRing;
}

/** Call at app bootstrap to register component behaviors with the registry (if needed). */
export function registerComponentBehaviors() {
  // Optional: register each component's state machine with behaviorRegistry
  // for layout-driven or backend-driven UI that references components by ID.
  // Example: registerBehavior('@UI/Button', { type: 'custom', stateMachine: COMPONENT_STATE_MACHINES['@UI/Button'] });
}
`;

  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(OUTPUT_FILE, out, 'utf-8');
  console.log(`Wrote ${OUTPUT_FILE}`);
}

main();
