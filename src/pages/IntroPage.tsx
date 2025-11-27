import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SceneManager } from '@/components/three/SceneManager.tsx';
import { IntroScene } from '@/components/three/IntroScene.tsx';
import { useKeyboardInput, Keys } from '@/hooks/useKeyboardInput.ts';
import { useAuthStore } from '@/stores/authStore.ts';
import './IntroPage.css';

export function IntroPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setPageReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Add exit transition delay
    setTimeout(() => {
      if (isAuthenticated) {
        navigate('/books');
      } else {
        navigate('/login');
      }
    }, 300);
  }, [navigate, isAuthenticated, isTransitioning]);

  // Keyboard shortcuts
  useKeyboardInput({
    [Keys.Enter]: handleEnter,
    [Keys.Space]: handleEnter,
  });

  return (
    <div
      className={`intro-page ${pageReady ? 'intro-page--ready' : ''} ${
        isTransitioning ? 'intro-page--transitioning' : ''
      }`}
      role="main"
      aria-label="Grimoire Introduction"
    >
      {/* Screen reader announcement */}
      <div className="visually-hidden" role="status" aria-live="polite">
        Welcome to Grimoire. Press Enter or Space to begin your journey.
      </div>

      {/* Three.js Scene */}
      <SceneManager scene="intro">
        <IntroScene onEnterPressed={handleEnter} />
      </SceneManager>

      {/* Interactive overlay with enhanced accessibility */}
      <div
        className="intro-page__overlay"
        onClick={handleEnter}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleEnter();
          }
        }}
        aria-label="Press Enter, Space, or click anywhere to begin"
        aria-describedby="intro-instructions"
      >
        {/* Visual focus indicator for keyboard users */}
        <span className="intro-page__focus-indicator" aria-hidden="true" />
      </div>

      {/* Hidden instructions for screen readers */}
      <p id="intro-instructions" className="visually-hidden">
        This is the introduction page for Grimoire, a spell learning application.
        Use Enter or Space key, or click anywhere on the screen to proceed.
      </p>

      {/* Corner decorations for visual interest */}
      <div className="intro-page__corner intro-page__corner--top-left" aria-hidden="true" />
      <div className="intro-page__corner intro-page__corner--top-right" aria-hidden="true" />
      <div className="intro-page__corner intro-page__corner--bottom-left" aria-hidden="true" />
      <div className="intro-page__corner intro-page__corner--bottom-right" aria-hidden="true" />

      {/* Vignette overlay for depth */}
      <div className="intro-page__vignette" aria-hidden="true" />
    </div>
  );
}
