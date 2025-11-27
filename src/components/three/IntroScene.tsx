import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { WizardAvatar } from './WizardAvatar.tsx';
import { FloatingOrb } from './FloatingOrb.tsx';
import { MagicParticles } from './MagicParticles.tsx';
import type { Mesh, Group } from 'three';

interface IntroSceneProps {
  onEnterPressed?: () => void;
}

export function IntroScene({ onEnterPressed }: IntroSceneProps) {
  const [sceneReady, setSceneReady] = useState(false);
  const groupRef = useRef<Group>(null);

  // Staggered entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setSceneReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Subtle scene-wide breathing effect
  useFrame((state) => {
    if (groupRef.current) {
      const breathe = Math.sin(state.clock.elapsedTime * 0.3) * 0.005;
      groupRef.current.scale.setScalar(1 + breathe);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Atmospheric background particles - deeper layer */}
      <MagicParticles
        count={50}
        spread={20}
        size={0.008}
        speed={0.15}
        color="#1a801a"
      />

      {/* Main magic particles - mid layer */}
      <MagicParticles count={100} spread={12} size={0.015} speed={0.3} />

      {/* Close sparkle particles - foreground */}
      <MagicParticles
        count={30}
        spread={8}
        size={0.025}
        speed={0.5}
        color="#66FF66"
      />

      {/* Wizard silhouette - centered focal point */}
      <WizardAvatar position={[0, -0.3, 0]} scale={1.4} />

      {/* Primary floating orb - right side */}
      <FloatingOrb
        position={[1.8, 0.6, -0.5]}
        size={0.45}
        rotationSpeed={0.6}
        floatAmplitude={0.35}
        floatSpeed={0.8}
      />

      {/* Secondary orb - left side */}
      <FloatingOrb
        position={[-1.5, 0.3, 0.3]}
        size={0.3}
        rotationSpeed={-0.5}
        floatAmplitude={0.25}
        floatSpeed={1.1}
      />

      {/* Tertiary small orb - accent */}
      <FloatingOrb
        position={[0.8, 1.4, 0.8]}
        size={0.15}
        rotationSpeed={1.2}
        floatAmplitude={0.15}
        floatSpeed={1.5}
        color="#66FF66"
      />

      {/* GRIMOIRE title with enhanced typography */}
      <GrimoireTitle position={[0, 2.0, 0]} ready={sceneReady} />

      {/* Tagline subtitle */}
      <Tagline position={[0, 1.4, 0]} ready={sceneReady} />

      {/* Press Enter prompt with enhanced animation */}
      <PressEnterText
        position={[0, -2.4, 0]}
        onEnterPressed={onEnterPressed}
        ready={sceneReady}
      />

      {/* Decorative corner runes */}
      <CornerRunes ready={sceneReady} />
    </group>
  );
}

interface GrimoireTitleProps {
  position: [number, number, number];
  ready?: boolean;
}

function GrimoireTitle({ position, ready = true }: GrimoireTitleProps) {
  const groupRef = useRef<Group>(null);
  const textRef = useRef<Mesh>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Entrance animation
  useEffect(() => {
    if (ready) {
      let start: number | null = null;
      const duration = 1200; // ms

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setAnimationProgress(eased);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [ready]);

  // Continuous glow pulse and subtle movement
  useFrame((state) => {
    if (textRef.current && textRef.current.material) {
      const material = textRef.current.material as { opacity?: number };
      if (material.opacity !== undefined) {
        // Layered pulse effect for more organic feel
        const pulse1 = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
        const pulse2 = Math.sin(state.clock.elapsedTime * 2.4) * 0.03;
        material.opacity = 0.85 + pulse1 + pulse2;
      }
    }

    // Subtle float
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={animationProgress}
    >
      {/* Main title */}
      <Text
        ref={textRef}
        position={[0, 0, 0]}
        fontSize={0.65}
        color="#33FF33"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.25}
        font="/fonts/VT323-Regular.ttf"
      >
        GRIMOIRE
      </Text>

      {/* Subtle shadow/depth effect */}
      <Text
        position={[0.015, -0.015, -0.1]}
        fontSize={0.65}
        color="#0d400d"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.25}
        font="/fonts/VT323-Regular.ttf"
      >
        GRIMOIRE
      </Text>
    </group>
  );
}

interface TaglineProps {
  position: [number, number, number];
  ready?: boolean;
}

function Tagline({ position, ready = true }: TaglineProps) {
  const textRef = useRef<Mesh>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Delayed entrance animation
  useEffect(() => {
    if (ready) {
      const delay = setTimeout(() => {
        let start: number | null = null;
        const duration = 800;

        const animate = (timestamp: number) => {
          if (!start) start = timestamp;
          const elapsed = timestamp - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 2);
          setAnimationProgress(eased);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }, 400);
      return () => clearTimeout(delay);
    }
  }, [ready]);

  // Subtle opacity animation
  useFrame((state) => {
    if (textRef.current && textRef.current.material) {
      const material = textRef.current.material as { opacity?: number };
      if (material.opacity !== undefined) {
        material.opacity =
          animationProgress * (0.6 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1);
      }
    }
  });

  return (
    <Text
      ref={textRef}
      position={[
        position[0],
        position[1] + (1 - animationProgress) * 0.3,
        position[2],
      ]}
      fontSize={0.12}
      color="#1a801a"
      anchorX="center"
      anchorY="middle"
      letterSpacing={0.3}
      font="/fonts/VT323-Regular.ttf"
    >
      MASTER THE ARCANE ARTS
    </Text>
  );
}

interface PressEnterTextProps {
  position: [number, number, number];
  onEnterPressed?: () => void;
  ready?: boolean;
}

function PressEnterText({
  position,
  onEnterPressed,
  ready = true,
}: PressEnterTextProps) {
  const groupRef = useRef<Group>(null);
  const textRef = useRef<Mesh>(null);
  const bracketLeftRef = useRef<Mesh>(null);
  const bracketRightRef = useRef<Mesh>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Delayed entrance animation
  useEffect(() => {
    if (ready) {
      const delay = setTimeout(() => {
        let start: number | null = null;
        const duration = 600;

        const animate = (timestamp: number) => {
          if (!start) start = timestamp;
          const elapsed = timestamp - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 2);
          setAnimationProgress(eased);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }, 800);
      return () => clearTimeout(delay);
    }
  }, [ready]);

  // Pulsing animation with hover state
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (textRef.current && textRef.current.material) {
      const material = textRef.current.material as { opacity?: number };
      if (material.opacity !== undefined) {
        // Base pulse with hover enhancement
        const basePulse = 0.5 + Math.sin(time * 2.5) * 0.3;
        const hoverBoost = isHovered ? 0.3 : 0;
        material.opacity = animationProgress * Math.min(basePulse + hoverBoost, 1);
      }
    }

    // Animate decorative brackets
    if (bracketLeftRef.current) {
      const spread = isHovered ? 0.08 : 0;
      bracketLeftRef.current.position.x =
        -1.2 - spread - Math.sin(time * 1.5) * 0.02;
    }
    if (bracketRightRef.current) {
      const spread = isHovered ? 0.08 : 0;
      bracketRightRef.current.position.x =
        1.2 + spread + Math.sin(time * 1.5) * 0.02;
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

  const bracketOpacity = animationProgress * 0.6;

  return (
    <group
      ref={groupRef}
      position={[
        position[0],
        position[1] + (1 - animationProgress) * 0.5,
        position[2],
      ]}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Left decorative bracket */}
      <Text
        ref={bracketLeftRef}
        position={[-1.2, 0, 0]}
        fontSize={0.2}
        color="#1a801a"
        anchorX="center"
        anchorY="middle"
        font="/fonts/VT323-Regular.ttf"
      >
        {'['}
      </Text>

      {/* Main text */}
      <Text
        ref={textRef}
        position={[0, 0, 0]}
        fontSize={0.16}
        color="#33FF33"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
        font="/fonts/VT323-Regular.ttf"
      >
        PRESS ENTER TO BEGIN
      </Text>

      {/* Right decorative bracket */}
      <Text
        ref={bracketRightRef}
        position={[1.2, 0, 0]}
        fontSize={0.2}
        color="#1a801a"
        anchorX="center"
        anchorY="middle"
        font="/fonts/VT323-Regular.ttf"
      >
        {']'}
      </Text>

      {/* Underline accent */}
      <mesh position={[0, -0.15, 0]}>
        <planeGeometry args={[animationProgress * 1.8, 0.008]} />
        <meshBasicMaterial
          color="#1a801a"
          transparent
          opacity={bracketOpacity * 0.5}
        />
      </mesh>
    </group>
  );
}

interface CornerRunesProps {
  ready?: boolean;
}

function CornerRunes({ ready = true }: CornerRunesProps) {
  const [animationProgress, setAnimationProgress] = useState(0);
  const runeRefs = useRef<(Mesh | null)[]>([]);

  // Staggered entrance animation
  useEffect(() => {
    if (ready) {
      const delay = setTimeout(() => {
        let start: number | null = null;
        const duration = 1000;

        const animate = (timestamp: number) => {
          if (!start) start = timestamp;
          const elapsed = timestamp - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setAnimationProgress(eased);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }, 600);
      return () => clearTimeout(delay);
    }
  }, [ready]);

  // Animate individual runes
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    runeRefs.current.forEach((ref, i) => {
      if (ref && ref.material) {
        const material = ref.material as { opacity?: number };
        if (material.opacity !== undefined) {
          const phase = i * 0.5;
          material.opacity =
            animationProgress * (0.3 + Math.sin(time * 0.8 + phase) * 0.15);
        }
      }
    });
  });

  const runePositions: [number, number, number][] = [
    [-3.5, 2.2, 0],
    [3.5, 2.2, 0],
    [-3.5, -2.2, 0],
    [3.5, -2.2, 0],
  ];

  const runeSymbols = ['*', '*', '*', '*'];

  return (
    <group>
      {runePositions.map((pos, i) => (
        <Text
          key={i}
          ref={(el) => (runeRefs.current[i] = el)}
          position={pos}
          fontSize={0.25}
          color="#0d400d"
          anchorX="center"
          anchorY="middle"
          font="/fonts/VT323-Regular.ttf"
        >
          {runeSymbols[i]}
        </Text>
      ))}
    </group>
  );
}
