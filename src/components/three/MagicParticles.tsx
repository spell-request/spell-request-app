import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Object3D, InstancedMesh, Color } from 'three';

interface MagicParticlesProps {
  count?: number;
  spread?: number;
  size?: number;
  color?: string;
  speed?: number;
}

export function MagicParticles({
  count = 100,
  spread = 10,
  size = 0.02,
  color = '#33FF33',
  speed = 0.5,
}: MagicParticlesProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const colorObj = useMemo(() => new Color(color), [color]);

  // Initial positions and velocities
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * spread,
      y: (Math.random() - 0.5) * spread,
      z: (Math.random() - 0.5) * (spread / 2),
      vx: (Math.random() - 0.5) * 0.01,
      vy: (Math.random() - 0.5) * 0.01 + 0.005, // Slight upward drift
      vz: (Math.random() - 0.5) * 0.01,
      scale: 0.5 + Math.random() * 0.5,
      opacity: 0.3 + Math.random() * 0.7,
    }));
  }, [count, spread]);

  // Initialize particle positions
  useEffect(() => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [particles, dummy]);

  // Animate particles
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    particles.forEach((particle, i) => {
      // Update position with sine wave motion
      const newX = particle.x + Math.sin(time * speed + i * 0.1) * 0.02;
      const newY = particle.y + Math.cos(time * speed * 0.7 + i * 0.15) * 0.02;
      const newZ = particle.z + Math.sin(time * speed * 0.5 + i * 0.2) * 0.01;

      // Pulsing scale
      const scale = particle.scale * (0.8 + Math.sin(time * 2 + i) * 0.2);

      dummy.position.set(newX, newY, newZ);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <circleGeometry args={[size, 6]} />
      <meshBasicMaterial
        color={colorObj}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}
