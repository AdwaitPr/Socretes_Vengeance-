/* ═══════════════════════════════════════════════════════════════
   ArtifactHost — Reusable 3D Interaction Container
   ═══════════════════════════════════════════════════════════════ */

import React, { useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { useMuseumStore } from '@/engine/useMuseumStore';
import { synth } from '@/engine/useAudioEngine';
import type { ExhibitArtifact } from '@/types/museum';

interface ArtifactHostProps {
  artifact: ExhibitArtifact;
  position: [number, number, number];
  children: React.ReactNode;
}

export const ArtifactHost: React.FC<ArtifactHostProps> = ({
  artifact,
  position,
  children,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const isDragging = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });

  const activeArtifactId = useMuseumStore((s) => s.activeArtifactId);
  const setActiveArtifact = useMuseumStore((s) => s.setActiveArtifact);
  const setSector = useMuseumStore((s) => s.setSector);
  const setCursorState = useMuseumStore((s) => s.setCursorState);
  const reducedMotion = useMuseumStore((s) => s.reducedMotion);

  const isSelected = activeArtifactId === artifact.id;

  // Continuous hover oscillation and rotation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      // Gentle buoyancy floating
      const time = state.clock.getElapsedTime();
      const floatOffset = Math.sin(time * 1.5 + position[0]) * 0.12;
      groupRef.current.position.y = position[1] + floatOffset;

      // Slow idle rotation unless user is dragging
      if (!isDragging.current) {
        const speed = hovered ? 0.6 : 0.2;
        groupRef.current.rotation.y += delta * speed;
      }
    }
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    setCursorState('inspect');
    synth.playChime(520, 'sine', 0.4);
  };

  const handlePointerOut = () => {
    setHovered(false);
    setCursorState('normal');
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setActiveArtifact(artifact.id);
    setSector('INSPECT');
    synth.playChime(660, 'triangle', 0.6);
  };

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (isSelected) {
      e.stopPropagation();
      isDragging.current = true;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
      setCursorState('drag');
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    if (hovered) setCursorState('inspect');
    else setCursorState('normal');
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (isDragging.current && groupRef.current) {
      const deltaX = e.clientX - prevMousePos.current.x;
      const deltaY = e.clientY - prevMousePos.current.y;
      groupRef.current.rotation.y += deltaX * 0.01;
      groupRef.current.rotation.x += deltaY * 0.01;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {children}

      {/* Pedestal Base Ring */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.25, 32]} />
        <meshBasicMaterial
          color={hovered || isSelected ? '#ffffff' : '#4e5566'}
          transparent
          opacity={hovered || isSelected ? 0.6 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Specimen Index Number Tag */}
      {hovered && (
        <mesh position={[0, -2.1, 0]}>
          {/* Subtle pedestal indicator point */}
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={artifact.accentColor} />
        </mesh>
      )}
    </group>
  );
};
