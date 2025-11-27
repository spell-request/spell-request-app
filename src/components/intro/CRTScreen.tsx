/**
 * CRTScreen Component
 * A full-screen retro CRT terminal display with phosphor glow,
 * scanlines, static, and glitch effects
 */

import { useEffect, useState, useRef, useCallback, type ReactNode } from 'react';
import './CRTScreen.css';

interface CRTScreenProps {
  children: ReactNode;
  className?: string;
  /** Enable scanline effect */
  scanlines?: boolean;
  /** Enable screen flicker */
  flicker?: boolean;
  /** Enable CRT curvature */
  curvature?: boolean;
  /** Screen power state */
  powered?: boolean;
  /** Static/noise intensity (0-1) */
  staticIntensity?: number;
  /** Glitch probability (0-1) */
  glitchChance?: number;
  /** Phosphor glow intensity */
  glowIntensity?: 'low' | 'medium' | 'high';
  /** Callback when power on animation completes */
  onPowerOn?: () => void;
}

export function CRTScreen({
  children,
  className = '',
  scanlines = true,
  flicker = true,
  curvature = true,
  powered = true,
  staticIntensity = 0.02,
  glitchChance = 0.005,
  glowIntensity = 'medium',
  onPowerOn,
}: CRTScreenProps) {
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [staticLines, setStaticLines] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Power on sequence
  useEffect(() => {
    if (powered && !isPoweredOn) {
      // Simulate CRT warmup delay
      const warmupTimer = setTimeout(() => {
        setIsPoweredOn(true);
        onPowerOn?.();
      }, 800);
      return () => clearTimeout(warmupTimer);
    } else if (!powered) {
      setIsPoweredOn(false);
    }
  }, [powered, isPoweredOn, onPowerOn]);

  // Random glitch effect
  useEffect(() => {
    if (!isPoweredOn || glitchChance <= 0) return;

    const glitchInterval = setInterval(() => {
      if (Math.random() < glitchChance) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 50 + Math.random() * 150);
      }
    }, 100);

    return () => clearInterval(glitchInterval);
  }, [isPoweredOn, glitchChance]);

  // Random static lines
  useEffect(() => {
    if (!isPoweredOn || staticIntensity <= 0) return;

    const staticInterval = setInterval(() => {
      const numLines = Math.floor(Math.random() * 3 * staticIntensity * 10);
      const lines: number[] = [];
      for (let i = 0; i < numLines; i++) {
        lines.push(Math.random() * 100);
      }
      setStaticLines(lines);
    }, 50);

    return () => clearInterval(staticInterval);
  }, [isPoweredOn, staticIntensity]);

  const classNames = [
    'crt-screen',
    isPoweredOn && 'crt-screen--powered',
    scanlines && 'crt-screen--scanlines',
    flicker && 'crt-screen--flicker',
    curvature && 'crt-screen--curved',
    isGlitching && 'crt-screen--glitch',
    `crt-screen--glow-${glowIntensity}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className={classNames}>
      {/* CRT bezel frame */}
      <div className="crt-screen__bezel">
        {/* Screen curvature overlay */}
        {curvature && <div className="crt-screen__curvature" />}

        {/* Main content area */}
        <div className="crt-screen__display">
          {/* Power-on animation overlay */}
          {!isPoweredOn && powered && (
            <div className="crt-screen__warmup">
              <div className="crt-screen__warmup-line" />
            </div>
          )}

          {/* Content */}
          <div className="crt-screen__content">
            {isPoweredOn ? children : null}
          </div>

          {/* Static noise lines */}
          {staticLines.map((pos, i) => (
            <div
              key={i}
              className="crt-screen__static-line"
              style={{ top: `${pos}%` }}
            />
          ))}

          {/* Scanline overlay */}
          {scanlines && <div className="crt-screen__scanlines" />}

          {/* Phosphor glow overlay */}
          <div className="crt-screen__glow" />

          {/* Vignette */}
          <div className="crt-screen__vignette" />
        </div>
      </div>

      {/* Screen reflection */}
      <div className="crt-screen__reflection" />
    </div>
  );
}

// Hook for triggering glitch effects programmatically
export function useGlitchEffect() {
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerGlitch = useCallback((duration: number = 200) => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), duration);
  }, []);

  return { isGlitching, triggerGlitch };
}
