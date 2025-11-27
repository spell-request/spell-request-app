import { useEffect, useState, useCallback } from 'react';
import './TypingText.css';

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
  className?: string;
}

export function TypingText({
  text,
  speed = 30,
  delay = 0,
  showCursor = true,
  cursorChar = '\u258C', // Block cursor character
  onComplete,
  className = '',
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startTyping = useCallback(() => {
    setHasStarted(true);
  }, []);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(startTyping, delay);
      return () => clearTimeout(delayTimer);
    } else {
      startTyping();
    }
  }, [delay, startTyping]);

  useEffect(() => {
    if (!hasStarted) return;

    // If speed is 0, show text immediately
    if (speed === 0) {
      setDisplayedText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    let currentIndex = 0;
    setDisplayedText('');
    setIsComplete(false);

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, hasStarted, onComplete]);

  const classNames = [
    'typing-text',
    isComplete && 'typing-text--complete',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames}>
      {displayedText}
      {showCursor && (
        <span
          className={`typing-text__cursor ${isComplete ? 'typing-text__cursor--blink' : ''}`}
          aria-hidden="true"
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}
