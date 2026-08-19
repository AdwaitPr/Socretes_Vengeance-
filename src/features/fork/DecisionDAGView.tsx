/* ═══════════════════════════════════════════════════════════════
   DecisionDAGView — Visual Path of Decisions & Active Node
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import { useMuseumStore } from '@/engine/useMuseumStore';
import { FUTURE_GRAPH } from '@/data/futureGraph';
import './fork.css';

export const DecisionDAGView: React.FC = () => {
  const currentFutureNodeId = useMuseumStore((s) => s.currentFutureNodeId);
  const decisionHistory = useMuseumStore((s) => s.decisionHistory);
  const resetSimulation = useMuseumStore((s) => s.resetSimulation);

  const currentNode = FUTURE_GRAPH.nodes[currentFutureNodeId];

  return (
    <div className="dag-visualizer-box">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="text-label">CIVILIZATION TRAJECTORY DAG:</span>
        {decisionHistory.length > 0 && (
          <button
            onClick={resetSimulation}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-unknown)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              cursor: 'pointer',
            }}
          >
            [ RESET SIMULATION TO 2026 ]
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
        <span className="dag-step-pill">
          <strong>2026 // BASELINE</strong>
        </span>

        {decisionHistory.map((entry, idx) => {
          const node = FUTURE_GRAPH.nodes[entry.resultingFutureNodeId];
          return (
            <React.Fragment key={idx}>
              <span className="dag-arrow" aria-hidden="true">→</span>
              <span className="dag-step-pill" style={{ color: 'var(--accent-ai)' }}>
                {node?.title ?? entry.selectedOptionId}
              </span>
            </React.Fragment>
          );
        })}

        {currentNode && decisionHistory.length === 0 && (
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            (Horizon awaiting fork decision)
          </span>
        )}
      </div>
    </div>
  );
};
