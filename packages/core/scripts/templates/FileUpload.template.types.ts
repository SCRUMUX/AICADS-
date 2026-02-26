export type FileUploadSize = 'sm' | 'md' | 'lg';

export type FileUploadState = 'idle' | 'dragover' | 'uploading' | 'done' | 'error';

export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrop'> {
  size?: FileUploadSize;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  onFiles?: (files: File[]) => void;
  disabled?: boolean;
  label?: string;
  hint?: string;
}
