import { Suspense, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { CRTEffect } from './effects/CRTEffect.tsx';
import './SceneManager.css';

export type SceneType = 'intro' | 'mission' | 'profile' | 'books';

interface SceneManagerProps {
  scene: SceneType;
  children?: ReactNode;
  showEffects?: boolean;
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color="#33FF33" wireframe />
    </mesh>
  );
}

export function SceneManager({
  children,
  showEffects = true,
}: SceneManagerProps) {
  return (
    <div className="scene-manager">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: false, // Pixelated look for retro aesthetic
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]} // Responsive DPR
      >
        {/* Global lighting */}
        <ambientLight intensity={0.1} />
        <pointLight
          position={[10, 10, 10]}
          color="#33FF33"
          intensity={0.5}
        />
        <pointLight
          position={[-10, -10, -10]}
          color="#33FF33"
          intensity={0.2}
        />

        {/* Scene content with suspense boundary */}
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>

        {/* Post-processing effects */}
        {showEffects && (
          <EffectComposer>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <CRTEffect
              scanlineIntensity={0.04}
              vignetteIntensity={0.25}
              curvature={0.02}
              flickerIntensity={0.015}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
