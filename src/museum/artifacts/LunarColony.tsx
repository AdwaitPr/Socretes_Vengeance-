/* ═══════════════════════════════════════════════════════════════
   LunarColony (Exhibit 006) — Orbital Habitat & Biome Model
   ═══════════════════════════════════════════════════════════════ */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const LunarColony: React.FC = () => {
  const moonRef = useRef<THREE.Mesh>(null);
  const orbitalTrackRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (moonRef.current) moonRef.current.rotation.y += delta * 0.15;
    if (orbitalTrackRef.current) orbitalTrackRef.current.rotation.y += delta * 0.4;
  });

  return (
    <group>
      {/* Central Lunar Sphere */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#94a3b8"
          roughness={0.8}
          metalness={0.2}
          emissive="#1e293b"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Surface Habitat Dome Clusters */}
      <mesh position={[0.45, 0.45, 0.45]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.8}
          roughness={0.1}
          transmission={0.9}
        />
      </mesh>

      {/* Orbital Logistics Ring & Transport Satellite */}
      <group ref={orbitalTrackRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.3, 0.015, 16, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
        </mesh>
        <mesh position={[1.3, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={1} />
        </mesh>
      </group>

      <pointLight color="#38bdf8" intensity={1.5} distance={3} />
    </group>
  );
};
