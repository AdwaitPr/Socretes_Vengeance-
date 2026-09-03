/* ═══════════════════════════════════════════════════════════════
   AtmosphereSystem — Volumetric Fog & Responsive Cosmic Particle Field
   ═══════════════════════════════════════════════════════════════ */

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMuseumStore } from '@/engine/useMuseumStore';

export const AtmosphereSystem: React.FC = () => {
  const env = useMuseumStore((s) => s.computedEnvironment);
  const qualityTier = useMuseumStore((s) => s.qualityTier);
  const pointsRef = useRef<THREE.Points>(null);

  // Particle count adapted to quality tier
  const particleCount = useMemo(() => {
    switch (qualityTier) {
      case 'ultra':
        return 10000;
      case 'high':
        return 6000;
      case 'medium':
        return 3000;
      case 'low':
        return 1200;
    }
  }, [qualityTier]);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Cylindrical distribution around museum atrium
      const radius = 10 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 40;

      pos[i * 3] = Math.sin(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.cos(theta) * radius;

      spd[i] = 0.05 + Math.random() * 0.15;
    }

    return [pos, spd];
  }, [particleCount]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    const count = array.length / 3;
    const driftSpeed = 0.4 * env.particleDensityMultiplier;

    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 1; // Y coordinate
      array[idx] += speeds[i] * driftSpeed * delta;

      if (array[idx] > 20) {
        array[idx] = -20;
      }
    }

    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.015;
  });

  const particleColor = useMemo(() => new THREE.Color(env.particleColor), [env.particleColor]);
  const fogColor = useMemo(() => new THREE.Color(env.ambientColor), [env.ambientColor]);

  const currentSector = useMuseumStore((s) => s.currentSector);
  const isVoid = currentSector === 'VOID' || currentSector === 'ENTRANCE';
  const voidOpacity = isVoid ? 0.1 : 0.6;

  return (
    <>
      <color attach="background" args={[env.ambientColor]} />
      <fogExp2 attach="fog" args={[fogColor, env.fogDensity]} />

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={qualityTier === 'ultra' ? 0.08 : 0.06}
          color={particleColor}
          transparent
          opacity={voidOpacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
};
