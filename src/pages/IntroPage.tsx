import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RetroIntroScene } from '@/components/intro';
import { useKeyboardInput, Keys } from '@/hooks/useKeyboardInput.ts';
import { useAuthStore } from '@/stores/authStore.ts';
import './IntroPage.css';

// Feature flag to toggle between old and new intro
const USE_RETRO_INTRO = true;

export function IntroPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setPageReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Handle navigation after intro completes
  const handleIntroComplete = useCallback(() => {
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

  // Legacy handler for non-retro intro
  const handleEnter = useCallback(() => {
    if (USE_RETRO_INTRO) {
      // In retro mode, Enter/Space skips the intro
      setSkipIntro(true);
      handleIntroComplete();
    } else {
      handleIntroComplete();
    }
  }, [handleIntroComplete]);

  // Keyboard shortcuts
  useKeyboardInput({
    [Keys.Enter]: handleEnter,
    [Keys.Space]: handleEnter,
    [Keys.Escape]: () => setSkipIntro(true), // Allow Escape to skip
  });

  // Retro terminal intro mode
  if (USE_RETRO_INTRO) {
    return (
      <div
        className={`intro-page intro-page--retro ${pageReady ? 'intro-page--ready' : ''} ${
          isTransitioning ? 'intro-page--transitioning' : ''
        }`}
        role="main"
        aria-label="Spell Request Introduction"
      >
        {/* Screen reader announcement */}
        <div className="visually-hidden" role="status" aria-live="polite">
          Welcome to Spell Request. The arcane terminal is initializing. Press Escape to skip.
        </div>

        {/* Retro CRT Terminal Intro */}
        <RetroIntroScene
          onComplete={handleIntroComplete}
          skip={skipIntro}
        />

        {/* Skip hint */}
        <div className="intro-page__skip-hint" aria-hidden="true">
          Press ESC to skip
        </div>

        {/* Hidden instructions for screen readers */}
        <p id="intro-instructions" className="visually-hidden">
          This is the introduction page for Spell Request, a spell learning application.
          The intro sequence will play automatically. Press Escape to skip.
        </p>
      </div>
    );
  }

  // Legacy Three.js intro (kept for fallback)
  return (
    <div
      className={`intro-page ${pageReady ? 'intro-page--ready' : ''} ${
        isTransitioning ? 'intro-page--transitioning' : ''
      }`}
      role="main"
      aria-label="Spell Request Introduction"
    >
      {/* Screen reader announcement */}
      <div className="visually-hidden" role="status" aria-live="polite">
        Welcome to Spell Request. Press Enter or Space to begin your journey.
      </div>

      {/* Placeholder for legacy scene - import if needed */}
      <div className="intro-page__legacy-placeholder">
        <h1>SPELL REQUEST</h1>
        <p>Press Enter to Begin</p>
      </div>

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
        This is the introduction page for Spell Request, a spell learning application.
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
