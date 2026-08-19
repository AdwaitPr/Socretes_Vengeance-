/* ═══════════════════════════════════════════════════════════════
   AtriumScene — Sector 03: Central Atrium & Orbital Carousel
   ═══════════════════════════════════════════════════════════════ */

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useMuseumStore } from '@/engine/useMuseumStore';
import { EXHIBITS_DATA } from '@/data/exhibits';
import { ArtifactHost } from '../artifacts/ArtifactHost';
import { SyntheticMemory } from '../artifacts/SyntheticMemory';
import { PostWorkSociety } from '../artifacts/PostWorkSociety';
import { TheLastForest } from '../artifacts/TheLastForest';
import { ArtificialLife } from '../artifacts/ArtificialLife';
import { LunarColony } from '../artifacts/LunarColony';
import { UnknownMonolith } from '../artifacts/UnknownMonolith';

export const AtriumScene: React.FC = () => {
  const currentSector = useMuseumStore((s) => s.currentSector);
  const timelineYear = useMuseumStore((s) => s.timelineYear);
  const activeFilter = useMuseumStore((s) => s.activeFilter);
  const carouselGroupRef = useRef<THREE.Group>(null);

  const isVisible = currentSector !== 'VOID' && currentSector !== 'ENTRANCE';

  // Compute 3D positions for the exhibits along an orbit ellipse
  const exhibitPositions = useMemo(() => {
    const total = EXHIBITS_DATA.length;
    const radiusX = 12.5;
    const radiusZ = 10.5;

    return EXHIBITS_DATA.map((exhibit, idx) => {
      const angle = (idx / total) * Math.PI * 2;
      return {
        exhibit,
        position: [
          Math.sin(angle) * radiusX,
          1.5,
          Math.cos(angle) * radiusZ,
        ] as [number, number, number],
      };
    });
  }, []);

  // Monumental architectural columns around perimeter with open front sightline
  const columns = useMemo(() => {
    const cols = [];
    const count = 18;
    const r = 25;
    for (let i = 0; i < count; i++) {
      // Offset so no column is right at angle 0 (front sightline)
      const angle = (i / count) * Math.PI * 2 + Math.PI / count;
      cols.push([Math.sin(angle) * r, 0, Math.cos(angle) * r] as [number, number, number]);
    }
    return cols;
  }, []);

  useFrame((_, delta) => {
    if (carouselGroupRef.current && currentSector === 'ATRIUM') {
      // Gentle orbital drift
      carouselGroupRef.current.rotation.y += delta * 0.015;
    }
  });

  if (!isVisible) return null;

  const renderArtifact = (id: string) => {
    switch (id) {
      case 'synthetic-memory':
        return <SyntheticMemory />;
      case 'post-work-society':
        return <PostWorkSociety />;
      case 'the-last-forest':
        return <TheLastForest />;
      case 'artificial-life':
        return <ArtificialLife />;
      case 'lunar-civilization':
        return <LunarColony />;
      case 'unknown-exhibit':
        return <UnknownMonolith />;
      default:
        return <SyntheticMemory />;
    }
  };

  return (
    <group>
      {/* ─── Architectural Floor Grid ─── */}
      <gridHelper
        args={[50, 50, '#2b303d', '#0d111a']}
        position={[0, -2, 0]}
      />

      {/* ─── Concentric Ground Energy Rings ─── */}
      <mesh position={[0, -1.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[10.4, 10.6, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -1.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[13.8, 14.0, 64]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.14} side={THREE.DoubleSide} />
      </mesh>

      {/* ─── Architectural Colonnades ─── */}
      {columns.map((pos, i) => (
        <mesh key={i} position={[pos[0], 4, pos[2]]}>
          <cylinderGeometry args={[0.2, 0.35, 14, 8]} />
          <meshStandardMaterial
            color="#131824"
            roughness={0.8}
            metalness={0.3}
          />
        </mesh>
      ))}

      {/* ─── Central Atrium Energy Core ─── */}
      <group position={[0, 1.8, 0]}>
        <mesh>
          <sphereGeometry args={[0.7, 24, 24]} />
          <meshStandardMaterial
            color="#f2f4f8"
            emissive="#38bdf8"
            emissiveIntensity={0.9}
            roughness={0.2}
            metalness={0.8}
            wireframe
          />
        </mesh>
        <pointLight color="#38bdf8" intensity={2} distance={12} />
      </group>

      {/* ─── Orbital Exhibit Carousel ─── */}
      <group ref={carouselGroupRef}>
        {exhibitPositions.map(({ exhibit, position }) => {
          // Filter by category if set
          if (activeFilter !== 'all' && exhibit.category !== activeFilter) return null;
          // Filter by year if outside range
          if (timelineYear < exhibit.yearRange[0] || timelineYear > exhibit.yearRange[1]) return null;

          return (
            <group key={exhibit.id}>
              <ArtifactHost
                artifact={exhibit}
                position={position}
              >
                {renderArtifact(exhibit.id)}
              </ArtifactHost>

              {/* 3D Holographic Label Under Pedestal */}
              <Text
                position={[position[0], position[1] - 2.2, position[2]]}
                fontSize={0.28}
                color="#8e95a5"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.08}
              >
                {`${exhibit.exhibitNumber} // ${exhibit.title.toUpperCase()}`}
              </Text>
            </group>
          );
        })}
      </group>
    </group>
  );
};
