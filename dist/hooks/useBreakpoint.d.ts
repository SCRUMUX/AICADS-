import { type BreakpointName } from '../utils/breakpoint-utils';
/**
 * React hook that returns the current responsive breakpoint ('mobile' | 'tablet' | 'desktop').
 * Uses useSyncExternalStore for tear-free reads.
 */
export declare function useBreakpoint(): BreakpointName;
/**
 * Returns true when the viewport is at least the given breakpoint.
 */
export declare function useMinBreakpoint(bp: BreakpointName): boolean;
//# sourceMappingURL=useBreakpoint.d.ts.map