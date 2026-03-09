export type MetricRowSize = 'sm' | 'md';

export type DeltaVariant = 'positive' | 'negative' | 'muted';

export interface MetricRowProps {
  size?: MetricRowSize;
  label?: string;
  value?: string;
  delta?: string;
  deltaVariant?: DeltaVariant;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}
