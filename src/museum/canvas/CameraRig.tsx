/* ═══════════════════════════════════════════════════════════════
   CameraRig — GSAP-driven 3D Camera Choreography & Mouse Parallax
   ═══════════════════════════════════════════════════════════════ */

import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useMuseumStore } from '@/engine/useMuseumStore';
import { EXHIBITS_DATA } from '@/data/exhibits';

export const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const currentSector = useMuseumStore((s) => s.currentSector);
  const activeArtifactId = useMuseumStore((s) => s.activeArtifactId);
  const reducedMotion = useMuseumStore((s) => s.reducedMotion);

  // Target vectors
  const targetPos = useRef(new THREE.Vector3(0, 0, 45));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Mouse parallax coordinates (normalized -1 to 1)
  const mouseNorm = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseNorm.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNorm.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Compute camera position based on sector and active artifact
  useEffect(() => {
    const duration = reducedMotion ? 0.05 : 1.8;
    const ease = 'power3.inOut';

    let destPos = new THREE.Vector3(0, 0, 45);
    let destLook = new THREE.Vector3(0, 0, 0);

    if (currentSector === 'VOID') {
      destPos.set(0, 0, 42);
      destLook.set(0, 0, 0);
    } else if (currentSector === 'ENTRANCE') {
      destPos.set(0, 0, 16);
      destLook.set(0, 0, 0);
    } else if (currentSector === 'ATRIUM') {
      destPos.set(0, 5.2, 23);
      destLook.set(0, 1.4, 0);
    } else if (currentSector === 'INSPECT' && activeArtifactId) {
      const idx = EXHIBITS_DATA.findIndex((e) => e.id === activeArtifactId);
      const total = EXHIBITS_DATA.length;
      const angle = (idx / total) * Math.PI * 2;
      const ax = Math.sin(angle) * 12.5;
      const az = Math.cos(angle) * 10.5;

      // Close macro inspection: camera positions in front of artifact
      destPos.set(ax * 0.72, 2.0, az * 0.72);
      destLook.set(ax, 1.6, az);
    } else if (currentSector === 'FORK') {
      destPos.set(-2, 3, 14);
      destLook.set(1.5, 1, 0);
    } else if (currentSector === 'ARCHIVE') {
      destPos.set(0, 0, 55);
      destLook.set(0, 0, 0);
    } else if (currentSector === 'TIMELINE') {
      destPos.set(0, 8, 26);
      destLook.set(0, 0, 0);
    } else if (currentSector === 'LAB') {
      destPos.set(0, 2, 12);
      destLook.set(0, 0, 0);
    }

    gsap.to(targetPos.current, {
      x: destPos.x,
      y: destPos.y,
      z: destPos.z,
      duration,
      ease,
    });

    gsap.to(targetLookAt.current, {
      x: destLook.x,
      y: destLook.y,
      z: destLook.z,
      duration,
      ease,
    });
  }, [currentSector, activeArtifactId, reducedMotion]);

  useFrame((_, delta) => {
    // Parallax damping
    const parallaxFactor = currentSector === 'VOID' ? 1.2 : currentSector === 'INSPECT' ? 0.3 : 0.8;
    const px = mouseNorm.current.x * parallaxFactor;
    const py = mouseNorm.current.y * (parallaxFactor * 0.5);

    // Smooth camera position lerp
    camera.position.x += (targetPos.current.x + px - camera.position.x) * Math.min(delta * 4, 1);
    camera.position.y += (targetPos.current.y + py - camera.position.y) * Math.min(delta * 4, 1);
    camera.position.z += (targetPos.current.z - camera.position.z) * Math.min(delta * 4, 1);

    // Smooth look-at lerp
    currentLookAt.current.lerp(targetLookAt.current, Math.min(delta * 5, 1));
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
