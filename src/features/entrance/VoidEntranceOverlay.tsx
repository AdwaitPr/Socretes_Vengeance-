/* ═══════════════════════════════════════════════════════════════
   VoidEntranceOverlay — Initial Entrance Experience
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import { useMuseumStore } from '@/engine/useMuseumStore';
import { MuseumButton } from '@/components/common/MuseumButton';
import { synth } from '@/engine/useAudioEngine';
import './entrance.css';

export const VoidEntranceOverlay: React.FC = () => {
  const hasEntered = useMuseumStore((s) => s.hasEntered);
  const enterMuseum = useMuseumStore((s) => s.enterMuseum);
  const setSector = useMuseumStore((s) => s.setSector);
  const setCursorState = useMuseumStore((s) => s.setCursorState);

  if (hasEntered) return null;

  const handleEnter = () => {
    synth.init();
    synth.playChime(440, 'triangle', 1.2);
    enterMuseum();
    setSector('ENTRANCE');

    // Camera will sweep forward to Atrium after entrance warp
    setTimeout(() => {
      setSector('ATRIUM');
    }, 1800);
  };

  return (
    <div className="void-entrance-overlay">
      <div className="entrance-content">
        <h1 className="entrance-title">
          <span className="title-line">THE MUSEUM</span>
          <span className="title-line">OF POSSIBLE</span>
          <span className="title-line title-highlight">FUTURES</span>
        </h1>

        <p className="entrance-tagline">
          Some futures are waiting to be discovered.
        </p>

        <div className="entrance-cta">
          <MuseumButton
            variant="ghost"
            onClick={handleEnter}
            onMouseEnter={() => setCursorState('enter')}
            onMouseLeave={() => setCursorState('normal')}
          >
            ENTER THE MUSEUM
          </MuseumButton>
        </div>
      </div>
    </div>
  );
};
