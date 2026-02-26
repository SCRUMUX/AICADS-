import React from 'react';

export type ToastAppearance = 'info' | 'success' | 'warning' | 'danger';

export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  appearance?: ToastAppearance;
  /** Title text */
  title?: React.ReactNode;
  /** Description / body text */
  description?: React.ReactNode;
  /** Leading icon slot */
  icon?: React.ReactNode;
  /** Whether the close button is shown */
  showClose?: boolean;
  /** Called when close is clicked or auto-dismiss fires */
  onClose?: () => void;
  /** Auto-dismiss duration in ms. 0 = no auto-dismiss. Default 5000. */
  duration?: number;
  /** Whether the toast is currently visible (controls enter/exit animation) */
  open?: boolean;
}

export interface ToastItem extends Omit<ToastProps, 'open'> {
  id: string;
}

export interface ToasterProps {
  /** Position of the toast stack on screen */
  position?: ToastPosition;
  /** Maximum number of visible toasts. Default 5. */
  maxVisible?: number;
}
