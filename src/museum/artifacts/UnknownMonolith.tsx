/* ═══════════════════════════════════════════════════════════════
   UnknownMonolith (Exhibit 000) — Redacted Non-Euclidean Anomaly
   ═══════════════════════════════════════════════════════════════ */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const UnknownMonolith: React.FC = () => {
  const monolithRef = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (monolithRef.current) {
      monolithRef.current.rotation.y += delta * 0.1;
      monolithRef.current.rotation.x = Math.sin(time * 0.3) * 0.05;
    }
    if (auraRef.current) {
      auraRef.current.rotation.y -= delta * 0.2;
      const s = 1 + Math.sin(time * 4) * 0.03;
      auraRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      {/* Void Monolith Core (Absorbs light) */}
      <mesh ref={monolithRef}>
        <boxGeometry args={[0.7, 1.6, 0.25]} />
        <meshStandardMaterial
          color="#000000"
          roughness={0.0}
          metalness={0.0}
          emissive="#000000"
        />
      </mesh>

      {/* Wireframe Distortion Shell */}
      <mesh ref={auraRef}>
        <boxGeometry args={[0.78, 1.68, 0.32]} />
        <meshBasicMaterial
          color="#ec4899"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Anomaly Aura Point Light */}
      <pointLight color="#ec4899" intensity={1.2} distance={2.5} />
    </group>
  );
};
