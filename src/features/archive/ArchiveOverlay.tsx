/* ═══════════════════════════════════════════════════════════════
   ArchiveOverlay — Spatial Concept & Specimen Exploration
   ═══════════════════════════════════════════════════════════════ */

import React, { useState } from 'react';
import { useMuseumStore } from '@/engine/useMuseumStore';
import { EXHIBITS_DATA } from '@/data/exhibits';
import type { FutureCategory } from '@/types/museum';
import { SpeculativeLabel } from '@/components/common/SpeculativeLabel';
import { MuseumButton } from '@/components/common/MuseumButton';
import './archive.css';

export const ArchiveOverlay: React.FC = () => {
  const currentSector = useMuseumStore((s) => s.currentSector);
  const setSector = useMuseumStore((s) => s.setSector);
  const setActiveArtifact = useMuseumStore((s) => s.setActiveArtifact);
  const setCursorState = useMuseumStore((s) => s.setCursorState);

  const [filter, setFilter] = useState<FutureCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (currentSector !== 'ARCHIVE') return null;

  const filteredExhibits = EXHIBITS_DATA.filter((ex) => {
    const matchesCategory = filter === 'all' || ex.category === filter;
    const matchesSearch =
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.codename.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectArtifact = (id: string) => {
    setActiveArtifact(id);
    setSector('INSPECT');
  };

  return (
    <div className="archive-overlay" role="dialog" aria-label="Impossible Archive">
      <div className="archive-container">
        <div className="archive-header">
          <div>
            <div className="archive-supertitle">SECTOR 08 // IMPOSSIBLE ARCHIVE</div>
            <h2 className="archive-title">Speculative Specimen Index</h2>
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

        {/* ─── Search & Filter Controls ─── */}
        <div className="archive-controls">
          <input
            type="text"
            placeholder="SEARCH SPECIMEN MATRIX..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="archive-search-input"
            aria-label="Search speculative specimens"
          />

          <div className="archive-filter-tabs">
            {(['all', 'nature', 'ai', 'space', 'culture', 'unknown'] as const).map((cat) => (
              <button
                key={cat}
                className={`archive-filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
                onMouseEnter={() => setCursorState('interactive')}
                onMouseLeave={() => setCursorState('normal')}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Specimen Grid ─── */}
        <div className="archive-grid">
          {filteredExhibits.map((artifact) => (
            <div
              key={artifact.id}
              className="archive-card"
              onClick={() => handleSelectArtifact(artifact.id)}
              onMouseEnter={() => setCursorState('inspect')}
              onMouseLeave={() => setCursorState('normal')}
              role="button"
              tabIndex={0}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="archive-card-number">{artifact.exhibitNumber}</span>
                <SpeculativeLabel classification={artifact.metrics.probability.classification} category={artifact.category} />
              </div>

              <h3 className="archive-card-title">{artifact.title}</h3>
              <p className="archive-card-tagline">{artifact.tagline}</p>

              <div className="archive-card-meta">
                <span>YEAR: {artifact.year}</span>
                <span style={{ color: artifact.accentColor }}>// {artifact.category.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <MuseumButton onClick={() => setSector('ATRIUM')}>
            RETURN TO CENTRAL ATRIUM
          </MuseumButton>
        </div>
      </div>
    </div>
  );
};
