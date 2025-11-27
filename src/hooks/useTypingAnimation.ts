import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTypingAnimationOptions {
  speed?: number; // ms per character
  delay?: number; // initial delay before typing starts
  onComplete?: () => void;
  autoStart?: boolean;
}

interface UseTypingAnimationReturn {
  displayedText: string;
  isComplete: boolean;
  isTyping: boolean;
  start: () => void;
  reset: () => void;
  skip: () => void;
}

export function useTypingAnimation(
  text: string,
  options: UseTypingAnimationOptions = {}
): UseTypingAnimationReturn {
  const {
    speed = 30,
    delay = 0,
    onComplete,
    autoStart = true,
  } = options;

  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [shouldStart, setShouldStart] = useState(autoStart);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up timers
  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Start typing
  const start = useCallback(() => {
    setShouldStart(true);
  }, []);

  // Reset to initial state
  const reset = useCallback(() => {
    clearTimers();
    setDisplayedText('');
    setIsComplete(false);
    setIsTyping(false);
    setShouldStart(false);
  }, [clearTimers]);

  // Skip to end
  const skip = useCallback(() => {
    clearTimers();
    setDisplayedText(text);
    setIsComplete(true);
    setIsTyping(false);
    onComplete?.();
  }, [text, onComplete, clearTimers]);

  useEffect(() => {
    if (!shouldStart) return;

    // If speed is 0, show text immediately
    if (speed === 0) {
      setDisplayedText(text);
      setIsComplete(true);
      setIsTyping(false);
      onComplete?.();
      return;
    }

    // Delay before starting
    timeoutRef.current = setTimeout(() => {
      let currentIndex = 0;
      setDisplayedText('');
      setIsComplete(false);
      setIsTyping(true);

      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearTimers();
          setIsComplete(true);
          setIsTyping(false);
          onComplete?.();
        }
      }, speed);
    }, delay);

    return clearTimers;
  }, [text, speed, delay, shouldStart, onComplete, clearTimers]);

  // Reset when text changes
  useEffect(() => {
    if (autoStart) {
      setDisplayedText('');
      setIsComplete(false);
      setShouldStart(true);
    }
  }, [text, autoStart]);

  return {
    displayedText,
    isComplete,
    isTyping,
    start,
    reset,
    skip,
  };
}
