import type { HTMLAttributes, ReactNode } from 'react';
import './GlowText.css';

export type GlowIntensity = 'low' | 'medium' | 'high';

interface GlowTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  intensity?: GlowIntensity;
  pulse?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'error';
}

export function GlowText({
  children,
  as: Component = 'span',
  intensity = 'medium',
  pulse = false,
  color = 'primary',
  className = '',
  ...props
}: GlowTextProps) {
  const classNames = [
    'glow-text',
    `glow-text--${intensity}`,
    `glow-text--${color}`,
    pulse && 'glow-text--pulse',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
}
