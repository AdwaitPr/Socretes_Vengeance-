/* ═══════════════════════════════════════════════════════════════
   MuseumCursor — Precision Custom Interaction Instrument
   ═══════════════════════════════════════════════════════════════ */

import React, { useEffect, useRef, useState } from 'react';
import { useMuseumStore } from '@/engine/useMuseumStore';
import './MuseumCursor.css';

export const MuseumCursor: React.FC = () => {
  const cursorState = useMuseumStore((s) => s.cursorState);
  const reducedMotion = useMuseumStore((s) => s.reducedMotion);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      if (reducedMotion && ringRef.current) {
        ringRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let rafId: number;

    const render = () => {
      if (!reducedMotion && ringRef.current) {
        // High-damping smooth lerp
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible, reducedMotion]);

  if (!isVisible) return null;

  const getLabel = () => {
    switch (cursorState) {
      case 'inspect':
        return 'INSPECT 3D';
      case 'enter':
        return 'ENTER';
      case 'drag':
        return 'ROTATE 360°';
      case 'zoom':
        return 'DEEP FOCUS';
      case 'anomaly':
        return 'ANOMALY DETECTED';
      default:
        return '';
    }
  };

  const label = getLabel();

  return (
    <div className="museum-cursor" aria-hidden="true">
      <div
        ref={ringRef}
        className="cursor-ring"
        data-state={cursorState}
      >
        <span className="cursor-label" data-visible={!!label}>
          {label}
        </span>
      </div>
      <div
        ref={dotRef}
        className="cursor-dot"
        data-state={cursorState}
      />
    </div>
  );
};
