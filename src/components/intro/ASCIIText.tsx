/**
 * ASCIIText Component
 * Renders text with typing animation and terminal effects
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import './ASCIIText.css';

interface ASCIITextProps {
  /** Text to display */
  text: string;
  /** Typing speed in ms per character */
  speed?: number;
  /** Delay before starting in ms */
  delay?: number;
  /** Show blinking cursor */
  showCursor?: boolean;
  /** Cursor character */
  cursorChar?: string;
  /** Enable glitch effect on characters */
  glitchOnType?: boolean;
  /** Callback when typing completes */
  onComplete?: () => void;
  /** CSS class name */
  className?: string;
  /** Speaker prefix (e.g., "GONZO: ") */
  speaker?: string;
  /** Instant display without animation */
  instant?: boolean;
  /** Sound effect on type (visual feedback) */
  visualClick?: boolean;
}

export function ASCIIText({
  text,
  speed = 40,
  delay = 0,
  showCursor = true,
  cursorChar = '\u2588',
  glitchOnType = false,
  onComplete,
  className = '',
  speaker,
  instant = false,
  visualClick = true,
}: ASCIITextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentCharGlitch, setCurrentCharGlitch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Start typing after delay
  useEffect(() => {
    if (instant) {
      setDisplayedText(text);
      setIsComplete(true);
      setHasStarted(true);
      onComplete?.();
      return;
    }

    const delayTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay, instant, text, onComplete]);

  // Typing animation
  useEffect(() => {
    if (!hasStarted || instant) return;

    let currentIndex = 0;
    setDisplayedText('');
    setIsComplete(false);

    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        const nextChar = text[currentIndex];
        setDisplayedText(text.slice(0, currentIndex + 1));

        // Trigger glitch on type
        if (glitchOnType && nextChar !== ' ') {
          setCurrentCharGlitch(true);
          setTimeout(() => setCurrentCharGlitch(false), 30);
        }

        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [text, speed, hasStarted, glitchOnType, instant, onComplete]);

  const classNames = [
    'ascii-text',
    isComplete && 'ascii-text--complete',
    currentCharGlitch && 'ascii-text--char-glitch',
    visualClick && !isComplete && hasStarted && 'ascii-text--clicking',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className={classNames}>
      {speaker && <span className="ascii-text__speaker">{speaker}</span>}
      <span className="ascii-text__content">{displayedText}</span>
      {showCursor && (
        <span
          className={`ascii-text__cursor ${
            isComplete ? 'ascii-text__cursor--blink' : ''
          }`}
        >
          {cursorChar}
        </span>
      )}
    </div>
  );
}

/**
 * ASCIIBlock Component
 * Renders multi-line ASCII art with reveal animation
 */
interface ASCIIBlockProps {
  /** ASCII art string (multi-line) */
  art: string;
  /** Reveal speed in ms per line */
  lineSpeed?: number;
  /** Reveal speed in ms per character within line */
  charSpeed?: number;
  /** Delay before starting */
  delay?: number;
  /** Callback when reveal completes */
  onComplete?: () => void;
  /** CSS class name */
  className?: string;
  /** Reveal mode */
  revealMode?: 'lines' | 'chars' | 'instant';
  /** Center the block */
  centered?: boolean;
}

export function ASCIIBlock({
  art,
  lineSpeed = 100,
  charSpeed = 10,
  delay = 0,
  onComplete,
  className = '',
  revealMode = 'lines',
  centered = false,
}: ASCIIBlockProps) {
  const lines = art.split('\n');
  const [revealedLines, setRevealedLines] = useState<string[]>([]);
  const [currentLineChars, setCurrentLineChars] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Start after delay
  useEffect(() => {
    if (revealMode === 'instant') {
      setRevealedLines(lines);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => setHasStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay, revealMode, lines, onComplete]);

  // Line-by-line reveal
  useEffect(() => {
    if (!hasStarted || revealMode !== 'lines') return;

    const interval = setInterval(() => {
      setRevealedLines((prev) => {
        if (prev.length < lines.length) {
          return [...prev, lines[prev.length]];
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
          return prev;
        }
      });
    }, lineSpeed);

    return () => clearInterval(interval);
  }, [hasStarted, lines, lineSpeed, revealMode, onComplete]);

  // Character-by-character reveal
  useEffect(() => {
    if (!hasStarted || revealMode !== 'chars') return;

    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const currentLine = lines[currentLineIndex];
    let charIndex = 0;

    const charInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setCurrentLineChars(currentLine.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(charInterval);
        setRevealedLines((prev) => [...prev, currentLine]);
        setCurrentLineChars('');
        setCurrentLineIndex((prev) => prev + 1);
      }
    }, charSpeed);

    return () => clearInterval(charInterval);
  }, [hasStarted, currentLineIndex, lines, charSpeed, revealMode, onComplete]);

  const displayLines =
    revealMode === 'chars'
      ? [...revealedLines, currentLineChars].filter(Boolean)
      : revealedLines;

  const classNames = [
    'ascii-block',
    isComplete && 'ascii-block--complete',
    centered && 'ascii-block--centered',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <pre className={classNames}>
      {displayLines.map((line, i) => (
        <div key={i} className="ascii-block__line">
          {line}
        </div>
      ))}
    </pre>
  );
}

/**
 * StaticNoise Component
 * Renders animated static/noise effect
 */
interface StaticNoiseProps {
  /** Width in characters */
  width?: number;
  /** Height in lines */
  height?: number;
  /** Update interval in ms */
  interval?: number;
  /** Noise character set */
  chars?: string;
  /** CSS class name */
  className?: string;
}

const DEFAULT_NOISE_CHARS = '\u2591\u2592\u2593\u2588';

export function StaticNoise({
  width = 40,
  height = 5,
  interval = 50,
  chars = DEFAULT_NOISE_CHARS,
  className = '',
}: StaticNoiseProps) {
  const [noise, setNoise] = useState<string[]>([]);

  const generateNoise = useCallback(() => {
    const lines: string[] = [];
    for (let y = 0; y < height; y++) {
      let line = '';
      for (let x = 0; x < width; x++) {
        line += chars[Math.floor(Math.random() * chars.length)];
      }
      lines.push(line);
    }
    return lines;
  }, [width, height, chars]);

  useEffect(() => {
    setNoise(generateNoise());
    const noiseInterval = setInterval(() => {
      setNoise(generateNoise());
    }, interval);

    return () => clearInterval(noiseInterval);
  }, [generateNoise, interval]);

  return (
    <pre className={`static-noise ${className}`}>
      {noise.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </pre>
  );
}

/**
 * GlitchText Component
 * Text with random glitch/corruption effect
 */
interface GlitchTextProps {
  text: string;
  /** Glitch intensity (0-1) */
  intensity?: number;
  /** Glitch interval in ms */
  interval?: number;
  /** CSS class name */
  className?: string;
}

const GLITCH_CHARS = '@#$%&*!?<>[]{}|/\\';

export function GlitchText({
  text,
  intensity = 0.1,
  interval = 100,
  className = '',
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      let glitched = '';
      for (let i = 0; i < text.length; i++) {
        if (Math.random() < intensity && text[i] !== ' ') {
          glitched += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        } else {
          glitched += text[i];
        }
      }
      setDisplayText(glitched);
    }, interval);

    return () => clearInterval(glitchInterval);
  }, [text, intensity, interval]);

  return <span className={`glitch-text ${className}`}>{displayText}</span>;
}
