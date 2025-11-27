/**
 * SasquatchPortrait Component
 * RPG-style Sasquatch portrait with magical effects
 * Uses actual image instead of ASCII art
 */

import { useState, useEffect } from 'react';
import sasquatchImage from '../../assets/sasquatch_intro.png';
import './WizardPortrait.css';

interface SasquatchPortraitProps {
  /** Show materialization animation */
  materializing?: boolean;
  /** Callback when materialization completes */
  onMaterialize?: () => void;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Enable glow effect */
  glow?: boolean;
  /** Enable subtle animation */
  animated?: boolean;
  /** CSS class name */
  className?: string;
}

export function SasquatchPortrait({
  materializing = false,
  onMaterialize,
  size = 'medium',
  glow = true,
  animated = true,
  className = '',
}: SasquatchPortraitProps) {
  const [phase, setPhase] = useState<'hidden' | 'particles' | 'forming' | 'visible'>(
    materializing ? 'hidden' : 'visible'
  );

  // Materialization sequence
  useEffect(() => {
    if (!materializing) {
      setPhase('visible');
      return;
    }

    // Phase 1: Particles gather (longer for effect)
    const particlesTimer = setTimeout(() => setPhase('particles'), 500);

    // Phase 2: Form appears (slower materialization)
    const formingTimer = setTimeout(() => setPhase('forming'), 2500);

    // Phase 3: Fully visible (complete materialization)
    const visibleTimer = setTimeout(() => {
      setPhase('visible');
      onMaterialize?.();
    }, 4500);

    return () => {
      clearTimeout(particlesTimer);
      clearTimeout(formingTimer);
      clearTimeout(visibleTimer);
    };
  }, [materializing, onMaterialize]);

  const classNames = [
    'sasquatch-portrait',
    `sasquatch-portrait--${size}`,
    `sasquatch-portrait--${phase}`,
    glow && 'sasquatch-portrait--glow',
    animated && 'sasquatch-portrait--animated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {/* Magical particles effect */}
      <div className="sasquatch-portrait__particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="sasquatch-portrait__particle"
            style={{
              '--particle-index': i,
              '--particle-delay': `${i * 0.1}s`,
              '--particle-x': `${Math.cos((i / 12) * Math.PI * 2) * 50}%`,
              '--particle-y': `${Math.sin((i / 12) * Math.PI * 2) * 50}%`,
            } as React.CSSProperties}
          >
            {['*', '+', '.', '*', '+', '.'][i % 6]}
          </span>
        ))}
      </div>

      {/* Portrait image */}
      <img
        src={sasquatchImage}
        alt="Sasquatch the Archmage"
        className="sasquatch-portrait__image"
      />

      {/* Magical aura */}
      <div className="sasquatch-portrait__aura" />
    </div>
  );
}

// Keep WizardPortrait as alias for backwards compatibility
export const WizardPortrait = SasquatchPortrait;

/**
 * SasquatchDialogue Component
 * Speech display for Archmage Sasquatch with RPG styling
 */
interface SasquatchDialogueProps {
  /** Speaker name */
  speaker?: string;
  /** Dialogue text */
  text: string;
  /** Typing animation */
  typing?: boolean;
  /** Typing speed (ms per char) */
  speed?: number;
  /** Callback when typing completes */
  onComplete?: () => void;
  /** Show blinking cursor */
  showCursor?: boolean;
  /** CSS class name */
  className?: string;
}

export function SasquatchDialogue({
  speaker = 'SASQUATCH',
  text,
  typing = true,
  speed = 50,
  onComplete,
  showCursor = true,
  className = '',
}: SasquatchDialogueProps) {
  const [displayedText, setDisplayedText] = useState(typing ? '' : text);
  const [isComplete, setIsComplete] = useState(!typing);

  useEffect(() => {
    if (!typing) {
      setDisplayedText(text);
      setIsComplete(true);
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
  }, [text, typing, speed, onComplete]);

  const classNames = [
    'sasquatch-dialogue',
    isComplete && 'sasquatch-dialogue--complete',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <div className="sasquatch-dialogue__speaker">{speaker}:</div>
      <div className="sasquatch-dialogue__text">
        <span className="sasquatch-dialogue__quote">"</span>
        {displayedText}
        {showCursor && (
          <span className={`sasquatch-dialogue__cursor ${isComplete ? 'sasquatch-dialogue__cursor--blink' : ''}`}>
            _
          </span>
        )}
        {isComplete && <span className="sasquatch-dialogue__quote">"</span>}
      </div>
    </div>
  );
}

// Keep WizardDialogue as alias for backwards compatibility
export const WizardDialogue = SasquatchDialogue;
