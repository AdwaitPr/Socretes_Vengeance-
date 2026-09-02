/* ═══════════════════════════════════════════════════════════════
   VoidEntranceOverlay — Initial Entrance Experience
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import { useMuseumStore } from '@/engine/useMuseumStore';
import { MuseumButton } from '@/components/common/MuseumButton';
import { ScrambleText } from '@/components/transitions/ScrambleText';
import { synth } from '@/engine/useAudioEngine';
import { WireThroat } from '@/components/originkit/wire-throat';
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
      <WireThroat />
      <div className="entrance-content">
        <div className="entrance-institution-code">
          <span className="code-bracket">[</span>
          <ScrambleText text="EXHIBITION HORIZON // 2026—2150" durationMs={800} />
          <span className="code-bracket">]</span>
        </div>

        <h1 className="entrance-title">
          <span className="title-line">THE MUSEUM</span>
          <span className="title-line">OF POSSIBLE</span>
          <span className="title-line title-highlight">FUTURES</span>
        </h1>

        <p className="entrance-tagline">
          "The future is not one destination. It is a collection of possibilities created by human decisions."
        </p>

        <div className="entrance-cta">
          <MuseumButton
            variant="primary"
            telemetryCode="WARP // ATRIUM"
            onClick={handleEnter}
            onMouseEnter={() => setCursorState('enter')}
            onMouseLeave={() => setCursorState('normal')}
          >
            ENTER THE MUSEUM
          </MuseumButton>
        </div>

        <div className="entrance-footer-meta">
          <span>SPECULATIVE ARCHIVE</span>
          <span className="meta-separator">·</span>
          <span>BRANCHING SIMULATION</span>
          <span className="meta-separator">·</span>
          <span>AUTONOMOUS SPATIAL MATRIX</span>
        </div>
      </div>
    </div>
  );
};
