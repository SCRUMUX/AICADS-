interface UseControllableStateParams<T> {
    value?: T;
    defaultValue: T;
    onChange?: (value: T) => void;
}
/**
 * Manages a state value that can be either controlled or uncontrolled.
 * When `value` is provided, the component is controlled.
 * Otherwise it manages its own internal state starting from `defaultValue`.
 */
export declare function useControllableState<T>({ value: controlledValue, defaultValue, onChange, }: UseControllableStateParams<T>): [T, (next: T | ((prev: T) => T)) => void];
export {};
//# sourceMappingURL=useControllableState.d.ts.map