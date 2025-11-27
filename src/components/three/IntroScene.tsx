import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { WizardAvatar } from './WizardAvatar.tsx';
import { FloatingOrb } from './FloatingOrb.tsx';
import { MagicParticles } from './MagicParticles.tsx';
import type { Mesh } from 'three';

interface IntroSceneProps {
  onEnterPressed?: () => void;
}

export function IntroScene({ onEnterPressed }: IntroSceneProps) {
  return (
    <group>
      {/* Wizard silhouette */}
      <WizardAvatar position={[0, -0.5, 0]} scale={1.2} />

      {/* Floating magical orb */}
      <FloatingOrb
        position={[1.5, 0.8, 0]}
        size={0.4}
        rotationSpeed={0.8}
        floatAmplitude={0.3}
      />

      {/* Additional smaller orb */}
      <FloatingOrb
        position={[-1.2, 0.5, 0.5]}
        size={0.25}
        rotationSpeed={-0.6}
        floatAmplitude={0.2}
        floatSpeed={1.3}
      />

      {/* Magic particles background */}
      <MagicParticles count={80} spread={12} size={0.015} speed={0.3} />

      {/* GRIMOIRE title */}
      <GrimoireTitle position={[0, 1.8, 0]} />

      {/* Press Enter text */}
      <PressEnterText position={[0, -2.2, 0]} onEnterPressed={onEnterPressed} />
    </group>
  );
}

interface GrimoireTitleProps {
  position: [number, number, number];
}

function GrimoireTitle({ position }: GrimoireTitleProps) {
  const textRef = useRef<Mesh>(null);

  // Subtle glow pulse
  useFrame((state) => {
    if (textRef.current && textRef.current.material) {
      const material = textRef.current.material as { opacity?: number };
      if (material.opacity !== undefined) {
        material.opacity = 0.9 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      }
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.5}
      color="#33FF33"
      anchorX="center"
      anchorY="middle"
      letterSpacing={0.15}
    >
      GRIMOIRE
    </Text>
  );
}

interface PressEnterTextProps {
  position: [number, number, number];
  onEnterPressed?: () => void;
}

function PressEnterText({ position, onEnterPressed }: PressEnterTextProps) {
  const textRef = useRef<Mesh>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pulsing fade animation
  useFrame((state) => {
    if (textRef.current && textRef.current.material) {
      const material = textRef.current.material as { opacity?: number };
      if (material.opacity !== undefined) {
        // Smooth fade in/out
        material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.4;
      }
    }
  });

  // Listen for Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        setIsVisible(false);
        onEnterPressed?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEnterPressed]);

  if (!isVisible) return null;

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.18}
      color="#33FF33"
      anchorX="center"
      anchorY="middle"
      letterSpacing={0.08}
    >
      PRESS ENTER TO BEGIN
    </Text>
  );
}
