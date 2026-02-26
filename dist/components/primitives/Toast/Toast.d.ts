import React from 'react';
import type { ToastProps, ToastItem, ToasterProps } from './Toast.types';
export declare const Toast: React.ForwardRefExoticComponent<ToastProps & React.RefAttributes<HTMLDivElement>>;
export declare function toast(config: Omit<ToastItem, 'id'>): void;
export declare const Toaster: React.FC<ToasterProps>;
//# sourceMappingURL=Toast.d.ts.map