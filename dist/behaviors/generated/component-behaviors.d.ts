/**
 * AUTO-GENERATED from contracts. Do not edit by hand.
 * Regenerate: npm run behaviors:generate
 *
 * Behavior layer: import this in your app and call registerComponentBehaviors()
 * to seed the behavior registry with component state machines and focus config.
 */
export declare const COMPONENT_IDS: string[];
export declare const COMPONENT_STATE_MACHINES: Record<string, {
    initial: string;
    states: string[];
    transitions: Array<{
        from: string;
        to: string;
        trigger: string;
    }>;
}>;
export declare const COMPONENT_FOCUS_RINGS: Record<string, {
    focusRing: string;
    focusRingDanger: string;
}>;
export declare function getComponentStateMachine(componentId: string): {
    initial: string;
    states: string[];
    transitions: Array<{
        from: string;
        to: string;
        trigger: string;
    }>;
};
export declare function getComponentFocusRing(componentId: string, isDanger?: boolean): string;
/** Call at app bootstrap to register component behaviors with the registry (if needed). */
export declare function registerComponentBehaviors(): void;
//# sourceMappingURL=component-behaviors.d.ts.map