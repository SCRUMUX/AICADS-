/**
 * Shared utilities for all primitive components.
 * Single source of truth — import from this file instead of duplicating in each component.
 */
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          'text-style': [
            'display', 'h1', 'h2', 'h3', 'h4',
            'body-lg', 'body', 'body-strong', 'body-sm', 'body-xs',
            'caption', 'caption-xs', 'mono',
          ],
        },
      ],
    },
  },
});

export type VR = { when: Record<string, string>; tailwindClasses: string[] };

/** Returns all tailwindClasses from rules where all `when` fields match `args`. */
export function findClasses(rules: VR[], args: Record<string, string>): string[] {
  return rules
    .filter((r) => {
      for (const k of Object.keys(r.when)) {
        if (r.when[k] !== args[k]) return false;
      }
      return true;
    })
    .flatMap((r) => r.tailwindClasses);
}

/** Joins class names with tailwind-merge to resolve conflicting utilities. */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return twMerge(classes.filter(Boolean).join(' '));
}

/** Determines the correct focus ring class based on appearance. */
export function getFocusRing(
  contract: Record<string, unknown>,
  appearance?: string,
): string {
  if (appearance?.includes('danger')) {
    return (contract.focusRingDanger as string) ?? '';
  }
  return (contract.focusRing as string) ?? '';
}
