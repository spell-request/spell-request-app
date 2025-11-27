/**
 * GrimoireAnimation Component
 * Three.js animated spellbook for Beat 4 of the intro sequence
 * Features:
 * - 3D animated grimoire/spellbook that opens
 * - Floating magical particles and runes
 * - Glowing pages with arcane symbols
 * - CRT-compatible green phosphor aesthetic
 */

import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

interface GrimoireAnimationProps {
  /** Current loading step (0-5) */
  loadingStep: number;
  /** Total loading steps */
  totalSteps: number;
  /** Whether the grimoire should be fully open */
  isComplete: boolean;
  /** Enable reduced motion for accessibility */
  reducedMotion?: boolean;
  /** Custom class name */
  className?: string;
}

export function GrimoireAnimation({
  loadingStep,
  totalSteps,
  isComplete,
  reducedMotion = false,
  className = '',
}: GrimoireAnimationProps) {
  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (reducedMotion) return true;
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }, [reducedMotion]);

  return (
    <div className={`grimoire-animation ${className}`} style={{ width: '100%', height: '300px' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#000000']} />

        {/* Subtle ambient light */}
        <ambientLight intensity={0.1} color="#003300" />

        {/* Main green point light for grimoire glow */}
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#00ff00" distance={10} />

        {/* Secondary rim light */}
        <pointLight position={[2, 2, 2]} intensity={0.3} color="#00cc00" distance={8} />

        <Suspense fallback={null}>
          {/* Main Grimoire Book */}
          <GrimoireBook
            progress={loadingStep / totalSteps}
            isComplete={isComplete}
            reducedMotion={prefersReducedMotion}
          />

          {/* Floating Magical Particles */}
          {!prefersReducedMotion && (
            <MagicalParticles count={30} isComplete={isComplete} />
          )}

          {/* Floating Rune Symbols */}
          <FloatingRunes
            count={6}
            visible={loadingStep >= 2}
            reducedMotion={prefersReducedMotion}
          />

          {/* Page glow effect when loading */}
          {loadingStep > 0 && !isComplete && (
            <PageGlow progress={loadingStep / totalSteps} />
          )}
        </Suspense>

        {/* Post-processing for CRT-like glow */}
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Noise opacity={0.08} />
          <Vignette eskil={false} offset={0.3} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

// ============================================
// Grimoire Book Component
// ============================================

interface GrimoireBookProps {
  progress: number;
  isComplete: boolean;
  reducedMotion: boolean;
}

function GrimoireBook({ progress, isComplete, reducedMotion }: GrimoireBookProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftCoverRef = useRef<THREE.Mesh>(null);
  const rightCoverRef = useRef<THREE.Mesh>(null);
  const [targetOpenAngle, setTargetOpenAngle] = useState(0);
  const currentAngle = useRef(0);

  // Calculate target open angle based on progress
  useEffect(() => {
    if (isComplete) {
      setTargetOpenAngle(Math.PI * 0.4); // Fully open
    } else if (progress > 0) {
      setTargetOpenAngle(Math.PI * 0.15 + progress * Math.PI * 0.2); // Gradually opening
    } else {
      setTargetOpenAngle(0); // Closed
    }
  }, [progress, isComplete]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth angle interpolation
    const lerpSpeed = reducedMotion ? 0.3 : 0.08;
    currentAngle.current += (targetOpenAngle - currentAngle.current) * lerpSpeed;

    // Apply opening animation to covers
    if (leftCoverRef.current) {
      leftCoverRef.current.rotation.y = -currentAngle.current;
    }
    if (rightCoverRef.current) {
      rightCoverRef.current.rotation.y = currentAngle.current;
    }

    // Subtle floating animation
    if (!reducedMotion) {
      const time = state.clock.elapsedTime;
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.05;
      groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.02;
    }
  });

  const bookWidth = 1.2;
  const bookHeight = 1.6;
  const bookDepth = 0.15;
  const coverThickness = 0.03;

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.2, 0, 0]}>
      {/* Book spine */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, bookHeight, bookDepth]} />
        <meshStandardMaterial
          color="#0a2a0a"
          roughness={0.8}
          metalness={0.2}
          emissive="#001a00"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Left cover (opens to left) */}
      <group position={[-0.05, 0, 0]}>
        <mesh
          ref={leftCoverRef}
          position={[-bookWidth / 2, 0, 0]}
        >
          <group position={[bookWidth / 2, 0, 0]}>
            {/* Cover */}
            <mesh>
              <boxGeometry args={[bookWidth, bookHeight, coverThickness]} />
              <meshStandardMaterial
                color="#0d3d0d"
                roughness={0.7}
                metalness={0.3}
                emissive="#003300"
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Cover decoration - arcane symbol */}
            <Text
              position={[0, 0, coverThickness / 2 + 0.001]}
              fontSize={0.3}
              color="#00ff00"
              anchorX="center"
              anchorY="middle"
              font="/fonts/VT323-Regular.ttf"
            >
              {'*'}
            </Text>

            {/* Inner page */}
            <mesh position={[0, 0, -coverThickness / 2 - 0.01]}>
              <planeGeometry args={[bookWidth * 0.9, bookHeight * 0.9]} />
              <meshStandardMaterial
                color="#001a00"
                emissive="#002200"
                emissiveIntensity={progress * 0.5}
                side={THREE.BackSide}
              />
            </mesh>
          </group>
        </mesh>
      </group>

      {/* Right cover (opens to right) */}
      <group position={[0.05, 0, 0]}>
        <mesh
          ref={rightCoverRef}
          position={[bookWidth / 2, 0, 0]}
        >
          <group position={[-bookWidth / 2, 0, 0]}>
            {/* Cover */}
            <mesh>
              <boxGeometry args={[bookWidth, bookHeight, coverThickness]} />
              <meshStandardMaterial
                color="#0d3d0d"
                roughness={0.7}
                metalness={0.3}
                emissive="#003300"
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Cover title */}
            <Text
              position={[0, 0.4, coverThickness / 2 + 0.001]}
              fontSize={0.12}
              color="#00ff00"
              anchorX="center"
              anchorY="middle"
              font="/fonts/VT323-Regular.ttf"
              maxWidth={1}
              textAlign="center"
            >
              GRIMOIRE
            </Text>

            {/* Inner page with content */}
            <mesh position={[0, 0, -coverThickness / 2 - 0.01]}>
              <planeGeometry args={[bookWidth * 0.9, bookHeight * 0.9]} />
              <meshStandardMaterial
                color="#001a00"
                emissive="#002200"
                emissiveIntensity={progress * 0.5}
                side={THREE.BackSide}
              />
            </mesh>

            {/* Page runes (visible when open) */}
            {progress > 0.3 && (
              <group position={[0, 0, -coverThickness / 2 - 0.02]}>
                {[0, 1, 2].map((row) => (
                  <Text
                    key={row}
                    position={[0, 0.3 - row * 0.25, 0]}
                    fontSize={0.08}
                    color="#00cc00"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/VT323-Regular.ttf"
                    rotation={[0, Math.PI, 0]}
                  >
                    {'~'.repeat(8 + row * 2)}
                  </Text>
                ))}
              </group>
            )}
          </group>
        </mesh>
      </group>

      {/* Pages stack in the middle */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[bookWidth * 0.95, bookHeight * 0.95, bookDepth * 0.6]} />
        <meshStandardMaterial
          color="#001a00"
          emissive="#002200"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Glowing edge effect */}
      <mesh position={[0, 0, bookDepth / 2 + 0.001]}>
        <planeGeometry args={[bookWidth * 0.95, bookHeight * 0.95]} />
        <meshBasicMaterial
          color="#00ff00"
          transparent
          opacity={isComplete ? 0.15 : progress * 0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// ============================================
// Magical Particles
// ============================================

interface MagicalParticlesProps {
  count: number;
  isComplete: boolean;
}

function MagicalParticles({ count, isComplete }: MagicalParticlesProps) {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return pos;
  }, [count]);

  const velocities = useMemo(() => {
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = Math.random() * 0.01 + 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return vel;
  }, [count]);

  useFrame(() => {
    if (!particlesRef.current) return;

    const positionAttr = particlesRef.current.geometry.attributes.position;
    const posArray = positionAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Update positions
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Reset if too far
      if (posArray[i * 3 + 1] > 2) {
        posArray[i * 3] = (Math.random() - 0.5) * 4;
        posArray[i * 3 + 1] = -1.5;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 2;
      }

      // Attract to center when complete
      if (isComplete) {
        posArray[i * 3] *= 0.99;
        posArray[i * 3 + 2] *= 0.99;
      }
    }

    positionAttr.needsUpdate = true;
  });

  // Create buffer geometry with positions
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#00ff00"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ============================================
// Floating Runes
// ============================================

interface FloatingRunesProps {
  count: number;
  visible: boolean;
  reducedMotion: boolean;
}

function FloatingRunes({ count, visible, reducedMotion }: FloatingRunesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const runeSymbols = ['*', '+', '#', '@', '%', '&'];

  const runeData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 2 + Math.random() * 0.5,
      height: (Math.random() - 0.5) * 1.5,
      speed: 0.2 + Math.random() * 0.3,
      symbol: runeSymbols[i % runeSymbols.length],
    }));
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current || !visible) return;

    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      const data = runeData[i];
      if (data && !reducedMotion) {
        const angle = data.angle + time * data.speed;
        child.position.x = Math.cos(angle) * data.radius;
        child.position.z = Math.sin(angle) * data.radius * 0.5;
        child.position.y = data.height + Math.sin(time * 2 + i) * 0.1;
        child.rotation.y = -angle;
      }
    });

    // Fade in effect
    groupRef.current.children.forEach((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = visible ? Math.min(mat.opacity + 0.02, 0.4) : Math.max(mat.opacity - 0.02, 0);
      }
    });
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {runeData.map((data, i) => (
        <Text
          key={i}
          position={[
            Math.cos(data.angle) * data.radius,
            data.height,
            Math.sin(data.angle) * data.radius * 0.5,
          ]}
          fontSize={0.2}
          color="#00ff00"
          anchorX="center"
          anchorY="middle"
          font="/fonts/VT323-Regular.ttf"
        >
          {data.symbol}
        </Text>
      ))}
    </group>
  );
}

// ============================================
// Page Glow Effect
// ============================================

interface PageGlowProps {
  progress: number;
}

function PageGlow({ progress }: PageGlowProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const pulse = Math.sin(time * 3) * 0.1 + 0.9;
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity = progress * 0.15 * pulse;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.2]}>
      <planeGeometry args={[2, 2.5]} />
      <meshBasicMaterial
        color="#00ff00"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default GrimoireAnimation;
