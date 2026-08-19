/* ═══════════════════════════════════════════════════════════════
   PostWorkSociety (Exhibit 003) — Kinetic Autonomous Labor Engine
   ═══════════════════════════════════════════════════════════════ */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const PostWorkSociety: React.FC = () => {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.x += delta * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.y += delta * 0.6;
    if (ring3Ref.current) ring3Ref.current.rotation.z += delta * 0.3;
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.8;
  });

  return (
    <group>
      {/* Outer Golden Kinetic Ring */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[1.2, 0.04, 16, 64]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#d97706"
            emissiveIntensity={0.2}
            roughness={0.25}
            metalness={0.9}
          />
        </mesh>
        {/* Ring Satellite Nodes */}
        <mesh position={[1.2, 0, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} />
        </mesh>
      </group>

      {/* Middle Kinetic Ring */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[0.9, 0.035, 16, 64]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#b45309"
            emissiveIntensity={0.3}
            roughness={0.3}
            metalness={0.85}
          />
        </mesh>
      </group>

      {/* Inner Kinetic Ring */}
      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[0.65, 0.03, 16, 48]} />
          <meshStandardMaterial
            color="#d97706"
            roughness={0.2}
            metalness={0.95}
          />
        </mesh>
      </group>

      {/* Central Autonomous Core Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#fef3c7"
          emissive="#f59e0b"
          emissiveIntensity={0.9}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>

      {/* Concentric Golden Point Light */}
      <pointLight color="#f59e0b" intensity={1.8} distance={3.5} />
    </group>
  );
};
