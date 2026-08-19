/* ═══════════════════════════════════════════════════════════════
   NavigationMatrix — Sector Switcher & Instrumentation
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import { useMuseumStore } from '@/engine/useMuseumStore';
import type { MuseumSector } from '@/types/museum';
import { AudioController } from './AudioController';
import './hud.css';

export const NavigationMatrix: React.FC = () => {
  const currentSector = useMuseumStore((s) => s.currentSector);
  const setSector = useMuseumStore((s) => s.setSector);
  const setActiveArtifact = useMuseumStore((s) => s.setActiveArtifact);
  const setCursorState = useMuseumStore((s) => s.setCursorState);
  const hasEntered = useMuseumStore((s) => s.hasEntered);

  if (!hasEntered) return null;

  const handleSectorChange = (sector: MuseumSector) => {
    if (sector === 'ATRIUM') {
      setActiveArtifact(null);
    }
    setSector(sector);
  };

  const sectors: { id: MuseumSector; label: string }[] = [
    { id: 'ATRIUM', label: '01 // ATRIUM' },
    { id: 'FORK', label: '02 // FUTURE FORK' },
    { id: 'ARCHIVE', label: '03 // ARCHIVE' },
    { id: 'TIMELINE', label: '04 // TIMELINE' },
    { id: 'LAB', label: '05 // LABORATORY' },
  ];

  return (
    <nav className="navigation-matrix" aria-label="Museum sector navigation">
      <div className="nav-sector-pills" role="tablist">
        {sectors.map((sec) => (
          <button
            key={sec.id}
            role="tab"
            aria-selected={currentSector === sec.id}
            className={`nav-sector-btn ${currentSector === sec.id ? 'active' : ''}`}
            onClick={() => handleSectorChange(sec.id)}
            onMouseEnter={() => setCursorState('interactive')}
            onMouseLeave={() => setCursorState('normal')}
          >
            {sec.label}
          </button>
        ))}
      </div>

      <AudioController />
    </nav>
  );
};
