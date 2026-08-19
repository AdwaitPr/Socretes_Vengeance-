/* ═══════════════════════════════════════════════════════════════
   THE MUSEUM OF POSSIBLE FUTURES — Master App Layout
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import { MuseumCanvas } from '@/museum/canvas/MuseumCanvas';
import { MuseumCursor } from '@/components/cursor/MuseumCursor';
import { MuseumHUD } from '@/components/hud/MuseumHUD';
import { VoidEntranceOverlay } from '@/features/entrance/VoidEntranceOverlay';
import { DossierPanel } from '@/components/common/DossierPanel';
import { FutureForkOverlay } from '@/features/fork/FutureForkOverlay';
import { YearMachine } from '@/features/timeline/YearMachine';
import { ArchiveOverlay } from '@/features/archive/ArchiveOverlay';
import { LabOverlay } from '@/features/laboratory/LabOverlay';
import { useAudioEngine } from '@/engine/useAudioEngine';
import { useReducedMotion } from '@/engine/useReducedMotion';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';

export const App: React.FC = () => {
  // Initialize reactive engines
  useAudioEngine();
  useReducedMotion();
  useKeyboardNav();

  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* WebGL Spatial World */}
      <MuseumCanvas />

      {/* Hardware-Accelerated Precision Cursor */}
      <MuseumCursor />

      {/* Permanent Foreground Museum HUD */}
      <MuseumHUD />

      {/* Sector Overlays */}
      <VoidEntranceOverlay />
      <DossierPanel />
      <FutureForkOverlay />
      <YearMachine />
      <ArchiveOverlay />
      <LabOverlay />
    </main>
  );
};
