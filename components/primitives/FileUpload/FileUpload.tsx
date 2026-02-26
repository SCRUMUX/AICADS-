/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */
import React, { useState, useCallback } from 'react';
import type { FileUploadProps, FileUploadSize, FileUploadState } from './FileUpload.types';
import { cn, findClasses, getFocusRing, type VR } from '../_shared';
import contract from '../../../contracts/components/FileUpload.contract.json';

const rules = (contract.variantRules || []) as unknown as VR[];

const SIZE_CLASSES: Record<FileUploadSize, string> = {
  sm: 'text-style-body-sm',
  md: '',
  lg: 'text-style-body-lg',
};

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>((props, ref) => {
  const {
    size = 'sm',
    state = 'idle',
    children,
    className,
    ...rest
  } = props;

  const vc = findClasses(rules, { size: size, state: state });
  const focusRing = getFocusRing(contract);

  return (
    <div
      ref={ref as any}
      className={cn(
        'transition-colors duration-150 font-base box-border',
        SIZE_CLASSES[size],
        ...vc,
        focusRing,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

FileUpload.displayName = 'FileUpload';
