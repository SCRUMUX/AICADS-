import React, { useState, useCallback, useRef } from 'react';
import type { FileUploadProps, FileUploadSize, FileUploadState } from './FileUpload.types';
import { cn } from '../_shared/utils';

const SIZE_CONFIG: Record<FileUploadSize, { minH: string; text: string; iconSize: string; padY: string; padX: string; gap: string }> = {
  sm: { minH: 'min-h-[var(--space-64)]',  text: 'text-style-caption',   iconSize: 'var(--space-20)', padY: 'py-[var(--space-12)]', padX: 'px-[var(--space-16)]', gap: 'gap-[var(--space-4)]' },
  md: { minH: 'min-h-[var(--space-120)]', text: 'text-style-body-sm',   iconSize: 'var(--space-28)', padY: 'py-[var(--space-16)]', padX: 'px-[var(--space-24)]', gap: 'gap-[var(--space-8)]' },
  lg: { minH: 'min-h-[var(--space-180)]', text: 'text-style-body',      iconSize: 'var(--space-36)', padY: 'py-[var(--space-24)]', padX: 'px-[var(--space-32)]', gap: 'gap-[var(--space-12)]' },
};

const STATE_STYLES: Record<FileUploadState, string> = {
  idle:      'bg-[var(--color-surface-2)] border-[var(--color-border-base)] text-[var(--color-text-secondary)]',
  dragover:  'bg-[var(--color-brand-subtle)] border-[var(--color-brand-primary)] text-[var(--color-brand-primary)]',
  uploading: 'bg-[var(--color-surface-2)] border-[var(--color-brand-primary)] text-[var(--color-text-secondary)]',
  done:      'bg-[var(--color-success-subtle)] border-[var(--color-success-base)] text-[var(--color-success-base)]',
  error:     'bg-[var(--color-danger-subtle)] border-[var(--color-danger-base)] text-[var(--color-danger-base)]',
};

const UploadIcon: React.FC<{ size: string }> = ({ size }) => (
  <svg style={{ width: size, height: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>((props, ref) => {
  const {
    size = 'md',
    accept,
    multiple = false,
    maxSizeMB,
    onFiles,
    disabled = false,
    label,
    hint,
    className,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<FileUploadState>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const { minH, text, iconSize, padY, padX, gap } = SIZE_CONFIG[size];

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (maxSizeMB) {
      const tooBig = Array.from(files).find(f => f.size > maxSizeMB * 1024 * 1024);
      if (tooBig) {
        setState('error');
        setFileName(`${tooBig.name} exceeds ${maxSizeMB}MB`);
        return;
      }
    }
    setState('done');
    setFileName(files.length === 1 ? files[0].name : `${files.length} files`);
    onFiles?.(Array.from(files));
  }, [maxSizeMB, onFiles]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setState('dragover');
  }, [disabled]);

  const onDragLeave = useCallback(() => setState('idle'), []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setState('idle');
    if (!disabled) handleFiles(e.dataTransfer.files);
  }, [disabled, handleFiles]);

  const onClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = '';
  }, [handleFiles]);

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={onClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={cn(
        'flex flex-col items-center justify-center rounded-[var(--radius-medium)] border-2 border-dashed cursor-pointer transition-colors outline-none',
        'focus-visible:ring-1 focus-visible:ring-[var(--color-brand-primary)]',
        minH, text, padY, padX, gap,
        STATE_STYLES[state],
        disabled && 'opacity-[var(--opacity-disabled)] cursor-not-allowed',
        className,
      )}
      aria-label={label || 'Upload file'}
      {...rest}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onInputChange}
        className="sr-only"
        tabIndex={-1}
      />
      <UploadIcon size={iconSize} />
      <span>{fileName || label || 'Click or drag files here'}</span>
      {hint && <span className="text-style-caption-xs opacity-70">{hint}</span>}
    </div>
  );
});

FileUpload.displayName = 'FileUpload';
