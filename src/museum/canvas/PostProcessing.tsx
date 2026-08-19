/* ═══════════════════════════════════════════════════════════════
   PostProcessing — Quality-Tier Aware Cinematic Render Passes
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useMuseumStore } from '@/engine/useMuseumStore';

export const PostProcessing: React.FC = () => {
  const qualityTier = useMuseumStore((s) => s.qualityTier);
  const reducedMotion = useMuseumStore((s) => s.reducedMotion);
  const glitchIntensity = useMuseumStore((s) => s.computedEnvironment.glitchIntensity);

  if (qualityTier === 'low' || reducedMotion) {
    return null;
  }

  const chromaticOffset = new THREE.Vector2(
    0.0008 + glitchIntensity * 0.004,
    0.0008 + glitchIntensity * 0.004
  );

  return (
    <EffectComposer multisampling={qualityTier === 'ultra' ? 4 : 2}>
      <Bloom
        intensity={qualityTier === 'ultra' ? 0.6 : 0.4}
        luminanceThreshold={0.7}
        luminanceSmoothing={0.3}
        mipmapBlur
      />
      {(qualityTier === 'ultra' || glitchIntensity > 0) && (
        <ChromaticAberration
          offset={chromaticOffset}
        />
      )}
    </EffectComposer>
  );
};
