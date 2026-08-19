/* ═══════════════════════════════════════════════════════════════
   FutureForkOverlay — Decision Prompt & Civilizational Fork Matrix
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import { useMuseumStore } from '@/engine/useMuseumStore';
import { FUTURE_GRAPH } from '@/data/futureGraph';
import { resolveEnvironmentState } from '@/engine/useConsequenceResolver';
import { DecisionDAGView } from './DecisionDAGView';
import { MuseumButton } from '@/components/common/MuseumButton';
import { ScrambleText } from '@/components/transitions/ScrambleText';
import { synth } from '@/engine/useAudioEngine';
import './fork.css';

export const FutureForkOverlay: React.FC = () => {
  const currentSector = useMuseumStore((s) => s.currentSector);
  const setSector = useMuseumStore((s) => s.setSector);
  const makeDecision = useMuseumStore((s) => s.makeDecision);
  const currentFutureNodeId = useMuseumStore((s) => s.currentFutureNodeId);
  const decisionHistory = useMuseumStore((s) => s.decisionHistory);
  const setCursorState = useMuseumStore((s) => s.setCursorState);

  if (currentSector !== 'FORK') return null;

  const decision = FUTURE_GRAPH.decisions['fork-post-work'];
  if (!decision) return null;

  const handleSelectOption = (optionId: string, targetNodeId: string) => {
    synth.playChime(587.33, 'triangle', 1.0); // D5 chime

    const newHistoryEntry = {
      decisionNodeId: decision.id,
      selectedOptionId: optionId,
      timestamp: Date.now(),
      resultingFutureNodeId: targetNodeId,
    };

    const newHistory = [...decisionHistory, newHistoryEntry];
    const newEnv = resolveEnvironmentState(FUTURE_GRAPH, targetNodeId, newHistory);

    makeDecision(newHistoryEntry, newEnv);

    // Return user to the Central Atrium to experience transformed world state
    setSector('ATRIUM');
  };

  const handleClose = () => {
    setSector('ATRIUM');
  };

  return (
    <div className="fork-overlay-container" role="dialog" aria-label="Future Fork Simulation">
      <div className="fork-content-wrapper">
        <div className="fork-header">
          <div>
            <div className="fork-supertitle">CIVILIZATIONAL DECISION FORK // NODE 01</div>
            <h2 className="fork-scenario-title">
              <ScrambleText text={decision.scenario} durationMs={600} />
            </h2>
          </div>
          <button
            className="dossier-close-btn"
            onClick={handleClose}
            onMouseEnter={() => setCursorState('interactive')}
            onMouseLeave={() => setCursorState('normal')}
            aria-label="Exit future fork simulator"
          >
            [ ESC // RETURN ]
          </button>
        </div>

        <div className="fork-context-box">
          <p>{decision.context}</p>
        </div>

        <div className="fork-options-grid">
          {decision.options.map((opt) => {
            const isCurrentlySelected = currentFutureNodeId === opt.targetFutureNodeId;
            return (
              <div
                key={opt.id}
                className={`fork-option-card ${isCurrentlySelected ? 'active' : ''}`}
                onClick={() => handleSelectOption(opt.id, opt.targetFutureNodeId)}
                onMouseEnter={() => setCursorState('interactive')}
                onMouseLeave={() => setCursorState('normal')}
                role="button"
                tabIndex={0}
              >
                <div>
                  <div className="fork-card-shortlabel">{opt.shortLabel}</div>
                  <div className="fork-card-title">{opt.label}</div>
                  <p className="fork-card-desc">{opt.description}</p>
                </div>

                <div className="fork-consequence-preview">
                  <span>→ SHIFTS ATMOSPHERE & RECONFIGURES ATRIUM</span>
                </div>
              </div>
            );
          })}
        </div>

        <DecisionDAGView />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <MuseumButton onClick={handleClose}>
            RETURN TO CENTRAL ATRIUM
          </MuseumButton>
        </div>
      </div>
    </div>
  );
};
