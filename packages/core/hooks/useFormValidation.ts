import { useState, useCallback, useRef } from 'react';

export type ValidationRule<T = string> = {
  /** Validation function — return error message string or null/undefined for valid */
  validate: (value: T) => string | null | undefined;
  /** When to run this rule: 'change' | 'blur' | 'submit' (default 'submit') */
  trigger?: 'change' | 'blur' | 'submit';
};

export type FieldConfig<T = string> = {
  initialValue: T;
  rules?: ValidationRule<T>[];
};

export type FieldState<T = string> = {
  value: T;
  error: string | null;
  touched: boolean;
  dirty: boolean;
};

/**
 * Form validation hook for managing field values, errors, and validation rules.
 * Supports per-field validation triggers (onChange, onBlur, onSubmit).
 */
export function useFormValidation<F extends Record<string, FieldConfig>>(fields: F) {
  type FieldName = keyof F & string;
  type Values = { [K in FieldName]: F[K]['initialValue'] };
  type Errors = { [K in FieldName]: string | null };
  type Touched = { [K in FieldName]: boolean };

  const configRef = useRef(fields);

  const initialValues = {} as Values;
  const initialErrors = {} as Errors;
  const initialTouched = {} as Touched;
  for (const key of Object.keys(fields) as FieldName[]) {
    initialValues[key] = fields[key].initialValue as Values[typeof key];
    initialErrors[key] = null as Errors[typeof key];
    initialTouched[key] = false as Touched[typeof key];
  }

  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>(initialErrors);
  const [touched, setTouched] = useState<Touched>(initialTouched);

  const validateField = useCallback(
    (name: FieldName, value: unknown, trigger: 'change' | 'blur' | 'submit'): string | null => {
      const rules = configRef.current[name]?.rules ?? [];
      for (const rule of rules) {
        const ruleTrigger = rule.trigger ?? 'submit';
        if (trigger === 'submit' || ruleTrigger === trigger || ruleTrigger === 'change') {
          const error = rule.validate(value as never);
          if (error) return error;
        }
      }
      return null;
    },
    [],
  );

  const setValue = useCallback(
    (name: FieldName, value: unknown) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      const error = validateField(name, value, 'change');
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField],
  );

  const setFieldTouched = useCallback(
    (name: FieldName) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, values[name], 'blur'),
      }));
    },
    [validateField, values],
  );

  const validateAll = useCallback((): boolean => {
    const nextErrors = {} as Errors;
    let valid = true;
    for (const name of Object.keys(configRef.current) as FieldName[]) {
      const error = validateField(name, values[name], 'submit');
      nextErrors[name] = error as Errors[typeof name];
      if (error) valid = false;
    }
    setErrors(nextErrors);
    const allTouched = {} as Touched;
    for (const name of Object.keys(configRef.current) as FieldName[]) {
      allTouched[name] = true as Touched[typeof name];
    }
    setTouched(allTouched);
    return valid;
  }, [validateField, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors(initialErrors);
    setTouched(initialTouched);
  }, []);

  const isValid = Object.values(errors).every((e) => e === null);
  const isDirty = Object.keys(fields).some(
    (key) => values[key as FieldName] !== initialValues[key as FieldName],
  );

  return {
    values,
    errors,
    touched,
    isValid,
    isDirty,
    setValue,
    setFieldTouched,
    validateAll,
    reset,
  };
}
