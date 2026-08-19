/* ═══════════════════════════════════════════════════════════════
   YearMachine — Temporal Continuum Navigation (2026—2150)
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import { useMuseumStore } from '@/engine/useMuseumStore';
import { MuseumButton } from '@/components/common/MuseumButton';
import { ScrambleText } from '@/components/transitions/ScrambleText';
import './timeline.css';

const KEY_YEARS = [2026, 2040, 2065, 2085, 2100, 2150];

export const YearMachine: React.FC = () => {
  const currentSector = useMuseumStore((s) => s.currentSector);
  const setSector = useMuseumStore((s) => s.setSector);
  const timelineYear = useMuseumStore((s) => s.timelineYear);
  const setTimelineYear = useMuseumStore((s) => s.setTimelineYear);
  const setCursorState = useMuseumStore((s) => s.setCursorState);

  if (currentSector !== 'TIMELINE') return null;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimelineYear(Number(e.target.value));
  };

  const handleYearJump = (year: number) => {
    setTimelineYear(year);
  };

  const getEraDescription = (year: number) => {
    if (year < 2035) return 'Proto-Cognitive Era — Initial convergence of LLM architectures and automated logistics.';
    if (year < 2070) return 'Divergence Era — Post-work transitions, synthetic biology emergence, lunar infrastructure.';
    if (year < 2110) return 'Ecological & Orbital Maturity — Climate geo-reconstruction and planetary biospheres.';
    return 'Post-Physical Horizon — Monolith anomalies, crystalline cognition, solar-scale computing.';
  };

  return (
    <div className="year-machine-overlay" role="dialog" aria-label="Year Machine Temporal Navigation">
      <div className="year-machine-container">
        <div className="year-machine-header">
          <div>
            <div className="year-machine-supertitle">TEMPORAL CONTINUUM SCRUBBER // 2026—2150</div>
            <h2 className="year-machine-display-year">
              YEAR <ScrambleText text={`${timelineYear}`} trigger={timelineYear} durationMs={300} />
            </h2>
          </div>
          <button
            className="dossier-close-btn"
            onClick={() => setSector('ATRIUM')}
            onMouseEnter={() => setCursorState('interactive')}
            onMouseLeave={() => setCursorState('normal')}
          >
            [ ESC // RETURN ]
          </button>
        </div>

        <p className="year-machine-description">{getEraDescription(timelineYear)}</p>

        {/* ─── Horizontal Slider ─── */}
        <div className="year-slider-wrapper">
          <input
            type="range"
            min={2026}
            max={2150}
            step={1}
            value={timelineYear}
            onChange={handleSliderChange}
            className="year-range-input"
            aria-label="Scrub temporal year"
          />

          {/* Key Decade Tick Markers */}
          <div className="year-ticks-row">
            {KEY_YEARS.map((y) => (
              <button
                key={y}
                className={`year-tick-btn ${timelineYear === y ? 'active' : ''}`}
                onClick={() => handleYearJump(y)}
                onMouseEnter={() => setCursorState('interactive')}
                onMouseLeave={() => setCursorState('normal')}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <MuseumButton onClick={() => setSector('ATRIUM')}>
            CONFIRM TEMPORAL HORIZON & ENTER ATRIUM
          </MuseumButton>
        </div>
      </div>
    </div>
  );
};
