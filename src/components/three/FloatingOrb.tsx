import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

interface FloatingOrbProps {
  position?: [number, number, number];
  size?: number;
  color?: string;
  rotationSpeed?: number;
  floatSpeed?: number;
  floatAmplitude?: number;
}

export function FloatingOrb({
  position = [0, 0, 0],
  size = 0.5,
  color = '#33FF33',
  rotationSpeed = 0.5,
  floatSpeed = 1,
  floatAmplitude = 0.2,
}: FloatingOrbProps) {
  const orbRef = useRef<Mesh>(null);
  const baseY = position[1];

  useFrame((state) => {
    if (orbRef.current) {
      // Rotate the orb
      orbRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
      orbRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed * 0.3;

      // Float up and down
      orbRef.current.position.y =
        baseY + Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmplitude;
    }
  });

  return (
    <mesh ref={orbRef} position={position}>
      <icosahedronGeometry args={[size, 1]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}
