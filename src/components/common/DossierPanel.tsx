/* ═══════════════════════════════════════════════════════════════
   DossierPanel — Slide-out Specimen Information & Metrics
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import { useMuseumStore } from '@/engine/useMuseumStore';
import { EXHIBITS_DATA } from '@/data/exhibits';
import { SpeculativeLabel } from './SpeculativeLabel';
import { MuseumButton } from './MuseumButton';
import { ScrambleText } from '@/components/transitions/ScrambleText';
import { synth } from '@/engine/useAudioEngine';
import './dossier.css';

export const DossierPanel: React.FC = () => {
  const activeArtifactId = useMuseumStore((s) => s.activeArtifactId);
  const setActiveArtifact = useMuseumStore((s) => s.setActiveArtifact);
  const currentSector = useMuseumStore((s) => s.currentSector);
  const setSector = useMuseumStore((s) => s.setSector);
  const setCursorState = useMuseumStore((s) => s.setCursorState);

  if (currentSector !== 'INSPECT' || !activeArtifactId) return null;

  const artifact = EXHIBITS_DATA.find((e) => e.id === activeArtifactId);
  if (!artifact) return null;

  const handleClose = () => {
    setActiveArtifact(null);
    setSector('ATRIUM');
  };

  const handleOpenFork = () => {
    synth.playChime(780, 'triangle', 0.8);
    setSector('FORK');
  };

  return (
    <aside className="dossier-overlay-container" aria-label={`Dossier for ${artifact.title}`}>
      <div className="dossier-header">
        <span className="dossier-number-tag">{artifact.exhibitNumber} // {artifact.codename}</span>
        <button
          className="dossier-close-btn"
          onClick={handleClose}
          onMouseEnter={() => setCursorState('interactive')}
          onMouseLeave={() => setCursorState('normal')}
          aria-label="Close dossier panel and return to Atrium"
        >
          [ ESC // CLOSE ]
        </button>
      </div>

      <h2 className="dossier-title">
        <ScrambleText text={artifact.title} durationMs={500} />
      </h2>

      <p className="dossier-tagline">{artifact.tagline}</p>

      <div className="dossier-section">
        <span className="dossier-section-heading">Curatorial Abstract // Year {artifact.year}</span>
        <p className="dossier-text">{artifact.abstract}</p>
      </div>

      <div className="dossier-section">
        <span className="dossier-section-heading">Curator Notes</span>
        <div className="dossier-curator-note">{artifact.curatorNotes}</div>
      </div>

      <div className="dossier-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span className="dossier-section-heading">Speculative Metrics</span>
          <SpeculativeLabel classification={artifact.metrics.probability.classification} category={artifact.category} />
        </div>

        {Object.entries(artifact.metrics).map(([key, metric]) => (
          <div key={key} className="metric-row">
            <div className="metric-row-header">
              <span>{metric.label}</span>
              <span>{metric.value}%</span>
            </div>
            <div className="metric-track" aria-hidden="true">
              <div
                className="metric-fill"
                style={{
                  width: `${metric.value}%`,
                  backgroundColor: artifact.accentColor,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="dossier-actions">
        {artifact.forkScenarioId && (
          <MuseumButton
            variant="primary"
            telemetryCode="DAG // FORK"
            onClick={handleOpenFork}
          >
            ENTER FUTURE FORK SIMULATOR
          </MuseumButton>
        )}
        <MuseumButton onClick={handleClose}>
          RETURN TO ATRIUM
        </MuseumButton>
      </div>
    </aside>
  );
};
