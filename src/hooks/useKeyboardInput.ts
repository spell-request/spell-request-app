import { useEffect, useCallback, useRef } from 'react';

type KeyHandler = () => void;
type KeyHandlers = Record<string, KeyHandler>;

interface UseKeyboardInputOptions {
  enabled?: boolean;
  preventDefault?: boolean;
  target?: 'window' | 'document';
}

export function useKeyboardInput(
  handlers: KeyHandlers,
  options: UseKeyboardInputOptions = {}
): void {
  const {
    enabled = true,
    preventDefault = true,
    target = 'window',
  } = options;

  // Use ref to avoid stale closure issues
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Check if we're in an input/textarea to avoid interfering with typing
      const activeElement = document.activeElement;
      const isInputActive =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.getAttribute('contenteditable') === 'true';

      // If user is typing in an input, don't trigger keyboard shortcuts
      // Exception: Allow Escape key to work even in inputs
      if (isInputActive && event.key !== 'Escape') {
        return;
      }

      const handler = handlersRef.current[event.key];
      if (handler) {
        if (preventDefault) {
          event.preventDefault();
        }
        handler();
      }
    },
    [preventDefault]
  );

  useEffect(() => {
    if (!enabled) return;

    const targetElement = target === 'window' ? window : document;
    targetElement.addEventListener('keydown', handleKeyDown as EventListener);

    return () => {
      targetElement.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, [enabled, target, handleKeyDown]);
}

// Predefined key constants for common keys
export const Keys = {
  Enter: 'Enter',
  Escape: 'Escape',
  Space: ' ',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Tab: 'Tab',
  Backspace: 'Backspace',
  Delete: 'Delete',
} as const;
