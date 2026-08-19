/* ═══════════════════════════════════════════════════════════════
   useKeyboardNav — Accessible Museum Keyboard Shortcuts
   ═══════════════════════════════════════════════════════════════ */

import { useEffect } from 'react';
import { useMuseumStore } from '@/engine/useMuseumStore';

export function useKeyboardNav() {
  const currentSector = useMuseumStore((s) => s.currentSector);
  const setSector = useMuseumStore((s) => s.setSector);
  const setActiveArtifact = useMuseumStore((s) => s.setActiveArtifact);
  const toggleSound = useMuseumStore((s) => s.toggleSound);
  const timelineYear = useMuseumStore((s) => s.timelineYear);
  const setTimelineYear = useMuseumStore((s) => s.setTimelineYear);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'Escape':
          if (currentSector !== 'ATRIUM' && currentSector !== 'VOID') {
            setActiveArtifact(null);
            setSector('ATRIUM');
          }
          break;

        case '1':
          setSector('ATRIUM');
          break;

        case '2':
          setSector('FORK');
          break;

        case '3':
          setSector('ARCHIVE');
          break;

        case '4':
          setSector('TIMELINE');
          break;

        case '5':
          setSector('LAB');
          break;

        case 'm':
        case 'M':
          toggleSound();
          break;

        case 'ArrowLeft':
          if (currentSector === 'TIMELINE') {
            setTimelineYear(Math.max(2026, timelineYear - 10));
          }
          break;

        case 'ArrowRight':
          if (currentSector === 'TIMELINE') {
            setTimelineYear(Math.min(2150, timelineYear + 10));
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSector, setSector, setActiveArtifact, toggleSound, timelineYear, setTimelineYear]);
}
