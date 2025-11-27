/**
 * TerminalButton Component
 * CRT-styled terminal button with gothic/dramatic Warhammer 40k-inspired aesthetic
 */

import { type ButtonHTMLAttributes } from 'react';
import './TerminalButton.css';

export interface TerminalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary';
}

export function TerminalButton({
  children,
  isLoading = false,
  fullWidth = false,
  variant = 'primary',
  disabled,
  type = 'button',
  ...props
}: TerminalButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`
        terminal-button
        terminal-button--${variant}
        ${fullWidth ? 'terminal-button--full-width' : ''}
        ${isDisabled ? 'terminal-button--disabled' : ''}
        ${isLoading ? 'terminal-button--loading' : ''}
      `.trim()}
      {...props}
    >
      <span className="terminal-button__bracket terminal-button__bracket--left">
        {isLoading ? '.......' : '>>>>>>>'}
      </span>
      <span className="terminal-button__text">
        {isLoading ? 'AUTHENTICATING' : children}
      </span>
      <span className="terminal-button__bracket terminal-button__bracket--right">
        {isLoading ? '.......' : '<<<<<<<'}
      </span>
    </button>
  );
}
