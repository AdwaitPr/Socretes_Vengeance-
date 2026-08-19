/* ═══════════════════════════════════════════════════════════════
   MuseumButton — Architectural Button Primitive
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import { useMuseumStore } from '@/engine/useMuseumStore';
import './common.css';

interface MuseumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost';
  telemetryCode?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const MuseumButton: React.FC<MuseumButtonProps> = ({
  variant = 'default',
  telemetryCode,
  children,
  icon,
  className = '',
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const setCursorState = useMuseumStore((s) => s.setCursorState);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCursorState('interactive');
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCursorState('normal');
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <button
      className={`museum-button ${variant === 'primary' ? 'museum-button-primary' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{children}</span>
      {telemetryCode && (
        <span className="text-label" style={{ opacity: 0.6, fontSize: '9px', marginLeft: '6px' }}>
          // {telemetryCode}
        </span>
      )}
    </button>
  );
};
