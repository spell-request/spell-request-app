/**
 * TerminalBox Component
 * Self-drawing ASCII box with animation effects
 */

import { useEffect, useState, type ReactNode } from 'react';
import './TerminalBox.css';

interface TerminalBoxProps {
  /** Box title */
  title?: string;
  /** Box content */
  children?: ReactNode;
  /** Width in characters (approximate) */
  width?: number;
  /** Draw animation enabled */
  animate?: boolean;
  /** Animation delay before starting */
  delay?: number;
  /** Draw speed in ms */
  drawSpeed?: number;
  /** Callback when draw completes */
  onDrawComplete?: () => void;
  /** CSS class name */
  className?: string;
  /** Box style variant */
  variant?: 'default' | 'double' | 'rounded' | 'simple';
  /** Glow effect */
  glow?: boolean;
  /** Slide in direction */
  slideFrom?: 'left' | 'right' | 'top' | 'bottom' | 'none';
}

// Box drawing characters
const BOX_CHARS = {
  default: {
    tl: '+',
    tr: '+',
    bl: '+',
    br: '+',
    h: '-',
    v: '|',
  },
  double: {
    tl: '\u2554',
    tr: '\u2557',
    bl: '\u255A',
    br: '\u255D',
    h: '\u2550',
    v: '\u2551',
  },
  rounded: {
    tl: '\u256D',
    tr: '\u256E',
    bl: '\u2570',
    br: '\u256F',
    h: '\u2500',
    v: '\u2502',
  },
  simple: {
    tl: '\u250C',
    tr: '\u2510',
    bl: '\u2514',
    br: '\u2518',
    h: '\u2500',
    v: '\u2502',
  },
};

type DrawPhase = 'idle' | 'top' | 'sides' | 'bottom' | 'content' | 'complete';

export function TerminalBox({
  title,
  children,
  width = 40,
  animate = true,
  delay = 0,
  drawSpeed = 20,
  onDrawComplete,
  className = '',
  variant = 'simple',
  glow = true,
  slideFrom = 'none',
}: TerminalBoxProps) {
  const [phase, setPhase] = useState<DrawPhase>(animate ? 'idle' : 'complete');
  const [topProgress, setTopProgress] = useState(0);
  const [, setSidesProgress] = useState(0);
  const [bottomProgress, setBottomProgress] = useState(0);
  const [showContent, setShowContent] = useState(!animate);

  const chars = BOX_CHARS[variant];
  const innerWidth = width - 2;

  // Start animation after delay
  useEffect(() => {
    if (!animate) {
      setPhase('complete');
      setShowContent(true);
      return;
    }

    const timer = setTimeout(() => {
      setPhase('top');
    }, delay);

    return () => clearTimeout(timer);
  }, [animate, delay]);

  // Top line animation
  useEffect(() => {
    if (phase !== 'top') return;

    const interval = setInterval(() => {
      setTopProgress((prev) => {
        if (prev >= innerWidth) {
          clearInterval(interval);
          setPhase('sides');
          return prev;
        }
        return prev + 1;
      });
    }, drawSpeed);

    return () => clearInterval(interval);
  }, [phase, innerWidth, drawSpeed]);

  // Sides animation (simplified - just show after top completes)
  useEffect(() => {
    if (phase !== 'sides') return;

    const interval = setInterval(() => {
      setSidesProgress((prev) => {
        if (prev >= 4) {
          // 4 steps for sides
          clearInterval(interval);
          setPhase('bottom');
          return prev;
        }
        return prev + 1;
      });
    }, drawSpeed * 3);

    return () => clearInterval(interval);
  }, [phase, drawSpeed]);

  // Bottom line animation
  useEffect(() => {
    if (phase !== 'bottom') return;

    const interval = setInterval(() => {
      setBottomProgress((prev) => {
        if (prev >= innerWidth) {
          clearInterval(interval);
          setPhase('content');
          return prev;
        }
        return prev + 1;
      });
    }, drawSpeed);

    return () => clearInterval(interval);
  }, [phase, innerWidth, drawSpeed]);

  // Show content
  useEffect(() => {
    if (phase !== 'content') return;

    const timer = setTimeout(() => {
      setShowContent(true);
      setPhase('complete');
      onDrawComplete?.();
    }, 100);

    return () => clearTimeout(timer);
  }, [phase, onDrawComplete]);

  // Generate top line
  const renderTopLine = () => {
    if (phase === 'idle') return null;

    let line = chars.tl;
    const titleText = title ? ` ${title} ` : '';
    const titleStart = Math.floor((innerWidth - titleText.length) / 2);

    for (let i = 0; i < innerWidth; i++) {
      if (i < topProgress) {
        if (title && i >= titleStart && i < titleStart + titleText.length) {
          line += titleText[i - titleStart];
        } else {
          line += chars.h;
        }
      } else if (i === topProgress && phase === 'top') {
        line += '\u2588'; // Drawing cursor
      } else {
        line += ' ';
      }
    }

    if (topProgress >= innerWidth) {
      line += chars.tr;
    }

    return line;
  };

  // Generate bottom line
  const renderBottomLine = () => {
    if (phase === 'idle' || phase === 'top' || phase === 'sides') return null;

    let line = chars.bl;

    for (let i = 0; i < innerWidth; i++) {
      if (i < bottomProgress) {
        line += chars.h;
      } else if (i === bottomProgress && phase === 'bottom') {
        line += '\u2588';
      } else {
        line += ' ';
      }
    }

    if (bottomProgress >= innerWidth) {
      line += chars.br;
    }

    return line;
  };

  const showSides = phase !== 'idle' && phase !== 'top';

  const classNames = [
    'terminal-box',
    phase === 'complete' && 'terminal-box--complete',
    glow && 'terminal-box--glow',
    slideFrom !== 'none' && `terminal-box--slide-${slideFrom}`,
    phase !== 'idle' && 'terminal-box--visible',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={{ '--box-width': `${width}ch` } as React.CSSProperties}>
      {/* Top border */}
      <div className="terminal-box__line terminal-box__line--top">
        {renderTopLine()}
      </div>

      {/* Content area with side borders */}
      <div
        className={`terminal-box__body ${showSides ? 'terminal-box__body--visible' : ''}`}
      >
        {showSides && (
          <span className="terminal-box__border-left">{chars.v}</span>
        )}
        <div className="terminal-box__content">
          {showContent && children}
        </div>
        {showSides && (
          <span className="terminal-box__border-right">{chars.v}</span>
        )}
      </div>

      {/* Bottom border */}
      <div className="terminal-box__line terminal-box__line--bottom">
        {renderBottomLine()}
      </div>
    </div>
  );
}

/**
 * ProgressBar Component
 * ASCII-style progress bar
 */
interface ProgressBarProps {
  /** Progress value (0-1) */
  progress: number;
  /** Width in characters */
  width?: number;
  /** Show percentage */
  showPercent?: boolean;
  /** Label text */
  label?: string;
  /** Animated fill */
  animated?: boolean;
  /** CSS class name */
  className?: string;
}

export function ProgressBar({
  progress,
  width = 20,
  showPercent = true,
  label,
  animated = true,
  className = '',
}: ProgressBarProps) {
  const [displayProgress, setDisplayProgress] = useState(animated ? 0 : progress);

  useEffect(() => {
    if (!animated) {
      setDisplayProgress(progress);
      return;
    }

    // Animate to target progress
    const step = (progress - displayProgress) / 10;
    if (Math.abs(progress - displayProgress) < 0.01) {
      setDisplayProgress(progress);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayProgress((prev) => prev + step);
    }, 50);

    return () => clearTimeout(timer);
  }, [progress, displayProgress, animated]);

  const filled = Math.floor(displayProgress * width);
  const empty = width - filled;
  const percent = Math.floor(displayProgress * 100);

  const filledChar = '\u2588';
  const emptyChar = '\u2591';

  return (
    <div className={`progress-bar ${className}`}>
      {label && <span className="progress-bar__label">{label}</span>}
      <span className="progress-bar__track">
        [
        <span className="progress-bar__filled">
          {filledChar.repeat(filled)}
        </span>
        <span className="progress-bar__empty">
          {emptyChar.repeat(empty)}
        </span>
        ]
      </span>
      {showPercent && (
        <span className="progress-bar__percent">{percent}%</span>
      )}
    </div>
  );
}

/**
 * CommandLine Component
 * Interactive command line with blinking cursor
 */
interface CommandLineProps {
  /** Prompt character */
  prompt?: string;
  /** Current input value */
  value?: string;
  /** Cursor visible */
  showCursor?: boolean;
  /** Blinking cursor */
  blinkCursor?: boolean;
  /** CSS class name */
  className?: string;
}

export function CommandLine({
  prompt = '>',
  value = '',
  showCursor = true,
  blinkCursor = true,
  className = '',
}: CommandLineProps) {
  return (
    <div className={`command-line ${className}`}>
      <span className="command-line__prompt">{prompt}</span>
      <span className="command-line__input">{value}</span>
      {showCursor && (
        <span
          className={`command-line__cursor ${
            blinkCursor ? 'command-line__cursor--blink' : ''
          }`}
        >
          {'\u2588'}
        </span>
      )}
    </div>
  );
}
