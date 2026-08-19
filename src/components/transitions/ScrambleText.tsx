/* ═══════════════════════════════════════════════════════════════
   ScrambleText — Bespoke Character Decipher Engine
   ═══════════════════════════════════════════════════════════════ */

import React, { useEffect, useState, useRef } from 'react';
import { useMuseumStore } from '@/engine/useMuseumStore';

interface ScrambleTextProps {
  text: string;
  trigger?: boolean | string | number;
  durationMs?: number;
  className?: string;
  characters?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789//_—<>[]+=*#';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  trigger = true,
  durationMs = 600,
  className = '',
  characters = GLYPHS,
  as: Component = 'span',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const reducedMotion = useMuseumStore((s) => s.reducedMotion);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion || !trigger) {
      setDisplayText(text);
      return;
    }

    const length = text.length;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Number of characters resolved
      const resolvedCount = Math.floor(progress * length);

      let scrambled = '';
      for (let i = 0; i < length; i++) {
        if (text[i] === ' ' || text[i] === '\n') {
          scrambled += text[i];
        } else if (i < resolvedCount) {
          scrambled += text[i];
        } else {
          scrambled += characters[Math.floor(Math.random() * characters.length)];
        }
      }

      setDisplayText(scrambled);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, trigger, durationMs, reducedMotion, characters]);

  return <Component className={className}>{displayText}</Component>;
};
