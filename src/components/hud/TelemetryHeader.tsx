/* ═══════════════════════════════════════════════════════════════
   TelemetryHeader — Top Architectural Information Header
   ═══════════════════════════════════════════════════════════════ */

import React, { useState, useEffect } from 'react';
import { useMuseumStore } from '@/engine/useMuseumStore';
import { ScrambleText } from '@/components/transitions/ScrambleText';
import './hud.css';

export const TelemetryHeader: React.FC = () => {
  const currentSector = useMuseumStore((s) => s.currentSector);
  const timelineYear = useMuseumStore((s) => s.timelineYear);
  const activeBranchId = useMuseumStore((s) => s.currentFutureNodeId);
  const [coords, setCoords] = useState({ lat: '37.7749° N', lon: '122.4194° W' });

  useEffect(() => {
    const interval = setInterval(() => {
      // Subtle micro-telemetry drift to feel alive
      setCoords({
        lat: `37.77${Math.abs(Math.floor(Math.random() * 90))}° N`,
        lon: `122.41${Math.abs(Math.floor(Math.random() * 90))}° W`,
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="telemetry-header" role="banner">
      <div className="telemetry-block">
        <h1 className="telemetry-institution">The Museum of Possible Futures</h1>
        <div className="telemetry-subline">
          <span>SPATIAL ARCHIVE // TEMPORAL HORIZON: </span>
          <ScrambleText text={`${timelineYear}`} trigger={timelineYear} durationMs={400} />
        </div>
      </div>

      <div className="telemetry-status" aria-label="System status">
        <span className="status-dot" aria-hidden="true" />
        <span className="font-mono">
          SECTOR: <strong style={{ color: 'var(--text-primary)' }}>{currentSector}</strong>
        </span>
        <span className="font-mono" style={{ opacity: 0.5 }}>
          | POS: {coords.lat}
        </span>
        {activeBranchId !== 'root' && (
          <span className="font-mono" style={{ color: 'var(--accent-ai)', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '8px' }}>
            BRANCH: {activeBranchId.toUpperCase()}
          </span>
        )}
      </div>
    </header>
  );
};
