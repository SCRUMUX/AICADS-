import React from 'react';

/**
 * @UI/Captcha
 * Placeholder-виджет для встраивания reCAPTCHA / hCaptcha.
 * Фиксированный размер 160×72px.
 * Состояния: idle, loading, success, error.
 */

export type CaptchaState = 'idle' | 'loading' | 'success' | 'error';

export interface CaptchaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled CAPTCHA state. When omitted, state is managed internally. */
  state?: CaptchaState;
  /** Placeholder label text shown in the widget area */
  placeholder?: string;
  /** Called when the CAPTCHA is successfully solved */
  onVerify?: (token: string) => void;
  /** Called when the CAPTCHA expires */
  onExpire?: () => void;
  /** Simulated verification delay in ms (default 1500) */
  verifyDelay?: number;
  /** Time in ms before the captcha expires after success (default 120000) */
  expireTimeout?: number;
  /** Disable interaction */
  disabled?: boolean;
}
