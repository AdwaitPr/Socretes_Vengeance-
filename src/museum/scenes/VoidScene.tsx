/* ═══════════════════════════════════════════════════════════════
   VoidScene — Sector 01: The Cosmic Void & Materializing Portal
   ═══════════════════════════════════════════════════════════════ */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMuseumStore } from '@/engine/useMuseumStore';

export const VoidScene: React.FC = () => {
  const monolithRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const material1Ref = useRef<THREE.MeshStandardMaterial>(null);
  const material2Ref = useRef<THREE.MeshBasicMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const currentSector = useMuseumStore((s) => s.currentSector);
  const isVoid = currentSector === 'VOID' || currentSector === 'ENTRANCE';

  useFrame((state, delta) => {
    if (!isVoid) return;
    const time = state.clock.getElapsedTime();

    if (monolithRef.current) {
      monolithRef.current.rotation.y += delta * 0.25;
      monolithRef.current.rotation.x = Math.sin(time * 0.4) * 0.2;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.3;
      ringRef.current.rotation.x = Math.cos(time * 0.5) * 0.3;
    }

    // Slow reveal over 6 seconds
    const revealFactor = Math.min(time / 6.0, 1.0);

    if (material1Ref.current) {
      material1Ref.current.opacity = revealFactor * 0.8;
    }

    if (material2Ref.current) {
      material2Ref.current.opacity = revealFactor * 0.1;
    }

    if (lightRef.current) {
      lightRef.current.intensity = revealFactor * 0.5;
    }
  });

  if (!isVoid) return null;

  return (
    <group position={[0, 0, 20]}>
      {/* Mysterious Floating Quantum Polyhedron */}
      <mesh ref={monolithRef}>
        <octahedronGeometry args={[2.2, 0]} />
        <meshStandardMaterial
          ref={material1Ref}
          color="#111111"
          emissive="#8b5cf6"
          emissiveIntensity={0.05}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Rotating Alignment Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[3.4, 0.02, 16, 64]} />
        <meshBasicMaterial
          ref={material2Ref}
          color="#8b5cf6"
          transparent
          opacity={0}
        />
      </mesh>

      {/* Central Core Glow */}
      <pointLight ref={lightRef} color="#8b5cf6" intensity={0} distance={8} />
    </group>
  );
};
