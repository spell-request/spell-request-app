import { type InputHTMLAttributes, forwardRef, useId } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    const containerClassNames = [
      'input-container',
      error && 'input-container--error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClassNames}>
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}

        <div className="input-wrapper">
          {leftIcon && <span className="input-icon input-icon--left">{leftIcon}</span>}

          <input
            ref={ref}
            id={inputId}
            className="input-field"
            aria-invalid={!!error}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            {...props}
          />

          {rightIcon && <span className="input-icon input-icon--right">{rightIcon}</span>}
        </div>

        {error && (
          <span id={errorId} className="input-error" role="alert">
            {error}
          </span>
        )}

        {hint && !error && (
          <span id={hintId} className="input-hint">
            {hint}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
