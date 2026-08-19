/* ═══════════════════════════════════════════════════════════════
   LightingRig — Responsive Architectural Museum Lighting
   ═══════════════════════════════════════════════════════════════ */

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useMuseumStore } from '@/engine/useMuseumStore';

export const LightingRig: React.FC = () => {
  const env = useMuseumStore((s) => s.computedEnvironment);

  // Compute key light color based on lighting temperature (0 = cool cyan/blue, 1 = warm amber/gold)
  const keyColor = useMemo(() => {
    const cool = new THREE.Color('#38bdf8');
    const neutral = new THREE.Color('#f2f4f8');
    const warm = new THREE.Color('#f59e0b');

    if (env.lightingTemperature < 0.5) {
      return cool.clone().lerp(neutral, env.lightingTemperature * 2);
    } else {
      return neutral.clone().lerp(warm, (env.lightingTemperature - 0.5) * 2);
    }
  }, [env.lightingTemperature]);

  return (
    <>
      <ambientLight intensity={0.25 * env.lightingIntensity} color="#ffffff" />

      {/* Primary Key Architectural Light */}
      <directionalLight
        position={[12, 18, 10]}
        intensity={1.2 * env.lightingIntensity}
        color={keyColor}
        castShadow={false}
      />

      {/* Fill Light */}
      <directionalLight
        position={[-12, -6, -8]}
        intensity={0.4 * env.lightingIntensity}
        color="#8e95a5"
      />

      {/* Central Atrium Spotlight */}
      <spotLight
        position={[0, 20, 0]}
        target-position={[0, 0, 0]}
        intensity={1.5 * env.lightingIntensity}
        color={keyColor}
        angle={Math.PI / 4}
        penumbra={0.8}
      />
    </>
  );
};
