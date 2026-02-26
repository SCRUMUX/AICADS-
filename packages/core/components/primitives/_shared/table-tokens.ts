export type TableSize = 'sm' | 'md' | 'lg';

export interface TableSizeSpec {
  padding: string;
  gap: string;
  iconSize: number;
  cellFont: string;
  headerFont: string;
  rowH: number;
  checkboxColWidth: number;
}

export const TABLE_SIZE_MAP: Record<TableSize, TableSizeSpec> = {
  sm: {
    padding: 'px-[var(--space-12)] py-[var(--space-6)]',
    gap: 'gap-[var(--space-6)]',
    iconSize: 16,
    cellFont: 'text-[12px] font-medium leading-4',
    headerFont: 'text-[12px] font-medium leading-4',
    rowH: 32,
    checkboxColWidth: 40,
  },
  md: {
    padding: 'px-[var(--space-16)] py-[var(--space-10)]',
    gap: 'gap-[var(--space-8)]',
    iconSize: 16,
    cellFont: 'text-[14px] font-normal leading-5',
    headerFont: 'text-[14px] font-semibold leading-5',
    rowH: 44,
    checkboxColWidth: 48,
  },
  lg: {
    padding: 'px-[var(--space-20)] py-[var(--space-14)]',
    gap: 'gap-[var(--space-8)]',
    iconSize: 20,
    cellFont: 'text-[14px] font-normal leading-5',
    headerFont: 'text-[14px] font-semibold leading-5',
    rowH: 52,
    checkboxColWidth: 56,
  },
};
