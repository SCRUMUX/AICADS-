export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectState = 'base' | 'hover' | 'open' | 'disabled';
export type SelectAppearance = 'base' | 'ghost' | 'outline';

export interface SelectOption {
  value: string;
  label?: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  appearance?: SelectAppearance;
  size?: SelectSize;
  options?: SelectOption[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  badge?: React.ReactNode;
  chevron?: React.ReactNode;
  showIconLeft?: boolean;
  showBadge?: boolean;
  onOpenChange?: (open: boolean) => void;
  'aria-label'?: string;
}
