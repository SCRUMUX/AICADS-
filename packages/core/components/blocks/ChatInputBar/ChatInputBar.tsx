/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run blocks:generate-components
 */

import React from 'react';
import type { ChatInputBarProps } from './ChatInputBar.types';

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  attachButton,
  input,
  sendButton,
  className,
  children,
}) => {
  return (
    <div className={`flex items-center flex-1 min-w-0 px-[var(--space-24)] py-[var(--space-12)] gap-[var(--space-8)] bg-[var(--color-surface-1)] border-t border-t-[var(--color-border-base)]${className ? ' ' + className : ''}`}>
      {attachButton}
      {input}
      {sendButton}
      {children}
    </div>
  );
};

export default ChatInputBar;
