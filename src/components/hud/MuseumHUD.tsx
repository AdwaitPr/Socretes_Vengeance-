/* ═══════════════════════════════════════════════════════════════
   MuseumHUD — Master Foreground Instrumentation Frame
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import { TelemetryHeader } from './TelemetryHeader';
import { NavigationMatrix } from './NavigationMatrix';
import { useMuseumStore } from '@/engine/useMuseumStore';
import './hud.css';

export const MuseumHUD: React.FC = () => {
  const hasEntered = useMuseumStore((s) => s.hasEntered);

  return (
    <div className="museum-hud-container" aria-live="polite">
      {hasEntered && <TelemetryHeader />}
      <div style={{ flex: 1 }} />
      <NavigationMatrix />
    </div>
  );
};
