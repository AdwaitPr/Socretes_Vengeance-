/* ═══════════════════════════════════════════════════════════════
   SyntheticMemory (Exhibit 001) — Crystalline Synaptic Prism
   ═══════════════════════════════════════════════════════════════ */

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SyntheticMemory: React.FC = () => {
  const crystalOuterRef = useRef<THREE.Mesh>(null);
  const crystalInnerRef = useRef<THREE.Mesh>(null);
  const neuronsRef = useRef<THREE.Points>(null);

  // Neuron particles inside the crystal
  const particleCount = 120;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.2 + Math.random() * 0.55;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }

    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (crystalOuterRef.current) {
      crystalOuterRef.current.rotation.y += delta * 0.3;
      crystalOuterRef.current.rotation.x = Math.sin(time * 0.5) * 0.15;
    }

    if (crystalInnerRef.current) {
      crystalInnerRef.current.rotation.y -= delta * 0.5;
      crystalInnerRef.current.rotation.z = Math.cos(time * 0.7) * 0.2;
    }

    if (neuronsRef.current) {
      neuronsRef.current.rotation.y += delta * 0.4;
      const mat = neuronsRef.current.material as THREE.PointsMaterial;
      mat.size = 0.035 + Math.sin(time * 3) * 0.01;
    }
  });

  return (
    <group>
      {/* Outer Translucent Crystal Shell */}
      <mesh ref={crystalOuterRef}>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshPhysicalMaterial
          color="#8b5cf6"
          emissive="#4c1d95"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.1}
          transmission={0.8}
          thickness={1.2}
          transparent
          opacity={0.7}
          wireframe={false}
        />
      </mesh>

      {/* Outer Wireframe Cage */}
      <mesh>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial
          color="#c084fc"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Inner Core Octahedron */}
      <mesh ref={crystalInnerRef}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#e879f9"
          emissive="#a855f7"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Synaptic Neuron Particles */}
      <points ref={neuronsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#f472b6"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Internal Point Light Emitter */}
      <pointLight color="#a855f7" intensity={2} distance={4} />
    </group>
  );
};
