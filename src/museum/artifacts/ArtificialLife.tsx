/* ═══════════════════════════════════════════════════════════════
   ArtificialLife (Exhibit 005) — Organic Cellular Lattice
   ═══════════════════════════════════════════════════════════════ */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ArtificialLife: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = Math.sin(time * 0.8) * 0.3;
      const s = 1 + Math.sin(time * 2.5) * 0.08;
      meshRef.current.scale.set(s, s * 0.9, s);
    }
    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.2;
      shellRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group>
      {/* Cellular Core Blob */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshPhysicalMaterial
          color="#10b981"
          emissive="#047857"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.1}
          transmission={0.6}
          thickness={0.8}
        />
      </mesh>

      {/* Outer Synthetic Lattice Membrane */}
      <mesh ref={shellRef}>
        <dodecahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial
          color="#34d399"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      <pointLight color="#34d399" intensity={1.8} distance={3.5} />
    </group>
  );
};
