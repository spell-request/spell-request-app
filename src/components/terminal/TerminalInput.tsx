/**
 * TerminalInput Component
 * CRT-styled terminal input with blinking cursor and retro aesthetics
 */

import { useState, useRef, useEffect, type InputHTMLAttributes } from 'react';
import './TerminalInput.css';

export interface TerminalInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export function TerminalInput({
  label,
  value,
  onChange,
  error = false,
  type = 'text',
  placeholder = '',
  autoFocus = false,
  autoComplete,
  ...props
}: TerminalInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={`terminal-input ${error ? 'terminal-input--error' : ''}`}>
      {label && (
        <label className="terminal-input__label">
          {label.toUpperCase()}:
        </label>
      )}
      <div className="terminal-input__wrapper">
        <span className="terminal-input__prompt">&gt;</span>
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="terminal-input__field"
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...props}
        />
        {isFocused && (
          <span className="terminal-input__cursor">█</span>
        )}
      </div>
    </div>
  );
}
