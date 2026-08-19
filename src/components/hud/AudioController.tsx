/* ═══════════════════════════════════════════════════════════════
   AudioController — Web Audio API Ambient Sound Toggle
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import { useMuseumStore } from '@/engine/useMuseumStore';
import { Volume2, VolumeX } from 'lucide-react';
import './hud.css';

export const AudioController: React.FC = () => {
  const soundEnabled = useMuseumStore((s) => s.soundEnabled);
  const toggleSound = useMuseumStore((s) => s.toggleSound);
  const setCursorState = useMuseumStore((s) => s.setCursorState);

  return (
    <button
      className="audio-controller"
      onClick={toggleSound}
      onMouseEnter={() => setCursorState('interactive')}
      onMouseLeave={() => setCursorState('normal')}
      aria-label={soundEnabled ? 'Mute museum ambient audio' : 'Enable museum ambient audio'}
      title="Ambient generative synthesizer (Web Audio API)"
    >
      {soundEnabled ? (
        <>
          <Volume2 size={13} aria-hidden="true" />
          <span>AUDIO: ON</span>
          <div className="audio-bars" aria-hidden="true">
            <span className="audio-bar playing" />
            <span className="audio-bar playing" />
            <span className="audio-bar playing" />
          </div>
        </>
      ) : (
        <>
          <VolumeX size={13} aria-hidden="true" />
          <span>AUDIO: MUTED</span>
          <div className="audio-bars" aria-hidden="true">
            <span className="audio-bar" />
            <span className="audio-bar" />
            <span className="audio-bar" />
          </div>
        </>
      )}
    </button>
  );
};
