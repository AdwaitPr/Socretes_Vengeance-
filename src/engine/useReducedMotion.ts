/* ═══════════════════════════════════════════════════════════════
   useReducedMotion — Respects prefers-reduced-motion
   ═══════════════════════════════════════════════════════════════ */

import { useEffect } from 'react';
import { useMuseumStore } from './useMuseumStore';

export function useReducedMotion(): boolean {
  const reducedMotion = useMuseumStore((s) => s.reducedMotion);
  const setReducedMotion = useMuseumStore((s) => s.setReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [setReducedMotion]);

  return reducedMotion;
}
