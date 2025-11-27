import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

interface WizardAvatarProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

export function WizardAvatar({
  position = [0, 0, 0],
  scale = 1,
  color = '#33FF33',
}: WizardAvatarProps) {
  const groupRef = useRef<Group>(null);

  // Subtle breathing animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.scale.y = scale * (1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Wizard body - simple cone shape */}
      <mesh position={[0, -0.3, 0]}>
        <coneGeometry args={[0.6 * scale, 1.5 * scale, 8]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Wizard hat */}
      <mesh position={[0, 0.7, 0]}>
        <coneGeometry args={[0.4 * scale, 0.8 * scale, 8]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Hat brim */}
      <mesh position={[0, 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3 * scale, 0.6 * scale, 8]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Face area - simple circle */}
      <mesh position={[0, 0.1, 0.35]}>
        <circleGeometry args={[0.2 * scale, 8]} />
        <meshBasicMaterial
          color="#0a0a0a"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.08 * scale, 0.15, 0.36]}>
        <circleGeometry args={[0.03 * scale, 6]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0.08 * scale, 0.15, 0.36]}>
        <circleGeometry args={[0.03 * scale, 6]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}
