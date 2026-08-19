/* ═══════════════════════════════════════════════════════════════
   MuseumCanvas — Master Three.js / React Three Fiber Root
   ═══════════════════════════════════════════════════════════════ */

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraRig } from './CameraRig';
import { AtmosphereSystem } from './AtmosphereSystem';
import { LightingRig } from './LightingRig';
import { PostProcessing } from './PostProcessing';
import { VoidScene } from '../scenes/VoidScene';
import { AtriumScene } from '../scenes/AtriumScene';
import { useMuseumStore } from '@/engine/useMuseumStore';

export const MuseumCanvas: React.FC = () => {
  const qualityTier = useMuseumStore((s) => s.qualityTier);

  // Dynamic pixel ratio based on quality tier
  const dpr: [number, number] =
    qualityTier === 'ultra'
      ? [1, 2]
      : qualityTier === 'high'
      ? [1, 1.5]
      : [1, 1.25];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 'var(--z-canvas)', background: 'var(--void-black)' }}>
      <Canvas
        camera={{ position: [0, 0, 45], fov: 45 }}
        dpr={dpr}
        gl={{
          antialias: qualityTier !== 'low',
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <Suspense fallback={null}>
          <CameraRig />
          <AtmosphereSystem />
          <LightingRig />
          <VoidScene />
          <AtriumScene />
          <PostProcessing />
        </Suspense>
      </Canvas>
    </div>
  );
};
