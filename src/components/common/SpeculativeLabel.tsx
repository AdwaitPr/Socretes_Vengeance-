/* ═══════════════════════════════════════════════════════════════
   SpeculativeLabel — Content Authenticity Badge
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import type { MetricClassification, FutureCategory } from '@/types/museum';
import './common.css';

interface SpeculativeLabelProps {
  classification: MetricClassification;
  category?: FutureCategory;
}

export const SpeculativeLabel: React.FC<SpeculativeLabelProps> = ({
  classification,
  category = 'ai',
}) => {
  const getDisplayText = () => {
    switch (classification) {
      case 'speculative-probability':
        return 'SPECULATIVE PROBABILITY';
      case 'curatorial-estimate':
        return 'CURATORIAL ESTIMATE';
      case 'scenario-confidence':
        return 'SCENARIO CONFIDENCE';
      default:
        return 'FICTIONAL PROJECTION';
    }
  };

  return (
    <div className="speculative-label" title="Fictional speculative metric — not a scientific prediction">
      <span className="speculative-label-dot" data-type={category} />
      <span>{getDisplayText()}</span>
    </div>
  );
};
