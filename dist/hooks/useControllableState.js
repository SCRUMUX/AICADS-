import { useState, useCallback, useRef } from "react";
function useControllableState({
  value: controlledValue,
  defaultValue,
  onChange
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? controlledValue : internalValue;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const setValue = useCallback(
    (next) => {
      const resolved = typeof next === "function" ? next(value) : next;
      if (!isControlled) {
        setInternalValue(resolved);
      }
      onChangeRef.current?.(resolved);
    },
    [isControlled, value]
  );
  return [value, setValue];
}
export {
  useControllableState
};
