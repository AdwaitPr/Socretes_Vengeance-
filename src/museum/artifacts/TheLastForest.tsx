/* ═══════════════════════════════════════════════════════════════
   TheLastForest (Exhibit 002) — Bioluminescent Seed Core
   ═══════════════════════════════════════════════════════════════ */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const TheLastForest: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const sporesRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
      const scale = 1 + Math.sin(time * 2) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(time * 0.6) * 0.4;
      ringRef.current.rotation.y += delta * 0.5;
    }
    if (sporesRef.current) {
      sporesRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Bioluminescent Organic Seed Core */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#059669"
          emissiveIntensity={0.6}
          roughness={0.4}
          metalness={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Cryogenic Quantum Containment Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.25, 0.03, 16, 64]} />
        <meshPhysicalMaterial
          color="#34d399"
          emissive="#10b981"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Spore Atmosphere Particles */}
      <points ref={sporesRef}>
        <sphereGeometry args={[1.3, 16, 16]} />
        <pointsMaterial
          size={0.03}
          color="#6ee7b7"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <pointLight color="#10b981" intensity={2} distance={4} />
    </group>
  );
};
