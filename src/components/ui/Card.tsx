import type { HTMLAttributes, ReactNode } from 'react';
import './Card.css';

export type CardVariant = 'default' | 'elevated' | 'bordered' | 'interactive';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  glowEffect?: boolean;
  children: ReactNode;
}

export function Card({
  variant = 'default',
  glowEffect = false,
  children,
  className = '',
  ...props
}: CardProps) {
  const classNames = [
    'card',
    `card--${variant}`,
    glowEffect && 'card--glow',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ children, className = '', ...props }: CardHeaderProps) {
  return (
    <div className={`card__header ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({ children, className = '', ...props }: CardContentProps) {
  return (
    <div className={`card__content ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({ children, className = '', ...props }: CardFooterProps) {
  return (
    <div className={`card__footer ${className}`} {...props}>
      {children}
    </div>
  );
}
