import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SceneManager } from '@/components/three/SceneManager.tsx';
import { IntroScene } from '@/components/three/IntroScene.tsx';
import { useKeyboardInput, Keys } from '@/hooks/useKeyboardInput.ts';
import { useAuthStore } from '@/stores/authStore.ts';
import './IntroPage.css';

export function IntroPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleEnter = useCallback(() => {
    if (isAuthenticated) {
      navigate('/books');
    } else {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  // Keyboard shortcuts
  useKeyboardInput({
    [Keys.Enter]: handleEnter,
    [Keys.Space]: handleEnter,
  });

  return (
    <div className="intro-page">
      {/* Three.js Scene */}
      <SceneManager scene="intro">
        <IntroScene onEnterPressed={handleEnter} />
      </SceneManager>

      {/* Click anywhere overlay */}
      <div
        className="intro-page__overlay"
        onClick={handleEnter}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleEnter();
          }
        }}
        aria-label="Press Enter or click to begin"
      />
    </div>
  );
}
