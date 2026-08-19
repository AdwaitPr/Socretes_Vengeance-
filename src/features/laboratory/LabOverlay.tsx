/* ═══════════════════════════════════════════════════════════════
   LabOverlay — Future Laboratory Interactive Simulator
   ═══════════════════════════════════════════════════════════════ */

import React, { useState } from 'react';
import { useMuseumStore } from '@/engine/useMuseumStore';
import { MuseumButton } from '@/components/common/MuseumButton';
import { SpeculativeLabel } from '@/components/common/SpeculativeLabel';
import './lab.css';

export const LabOverlay: React.FC = () => {
  const currentSector = useMuseumStore((s) => s.currentSector);
  const setSector = useMuseumStore((s) => s.setSector);
  const setCursorState = useMuseumStore((s) => s.setCursorState);

  // Speculative parameter sliders
  const [neuralBandwidth, setNeuralBandwidth] = useState(42);
  const [syntheticBio, setSyntheticBio] = useState(65);
  const [fusionDistribution, setFusionDistribution] = useState(78);
  const [longevityVelocity, setLongevityVelocity] = useState(54);

  if (currentSector !== 'LAB') return null;

  // Calculated speculative outcomes
  const cognitiveLatencyMs = (120 * (1 - neuralBandwidth / 100)).toFixed(1);
  const planetaryEntropyIndex = ((100 - fusionDistribution) * 0.6 + syntheticBio * 0.4).toFixed(0);
  const lifeExpectancyYears = (82 + (longevityVelocity / 100) * 65).toFixed(0);

  return (
    <div className="lab-overlay" role="dialog" aria-label="Future Laboratory Simulator">
      <div className="lab-container">
        <div className="lab-header">
          <div>
            <div className="lab-supertitle">SECTOR 11 // FUTURE LABORATORY</div>
            <h2 className="lab-title">Speculative Technology Simulator</h2>
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

        <div className="lab-disclaimer-box">
          <SpeculativeLabel classification="scenario-confidence" category="ai" />
          <p style={{ marginTop: '6px' }}>
            <strong>CONCEPTUAL SIMULATION:</strong> Manipulate hypothetical technology adoption parameters to observe theoretical civilizational equilibrium models.
          </p>
        </div>

        <div className="lab-columns">
          {/* Sliders Column */}
          <div className="lab-sliders-col">
            <div className="lab-slider-row">
              <div className="lab-slider-label">
                <span>Neural Bandwidth Integration</span>
                <span className="font-mono">{neuralBandwidth}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={neuralBandwidth}
                onChange={(e) => setNeuralBandwidth(Number(e.target.value))}
                className="lab-range"
              />
            </div>

            <div className="lab-slider-row">
              <div className="lab-slider-label">
                <span>Synthetic Ecological Synthesis</span>
                <span className="font-mono">{syntheticBio}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={syntheticBio}
                onChange={(e) => setSyntheticBio(Number(e.target.value))}
                className="lab-range"
              />
            </div>

            <div className="lab-slider-row">
              <div className="lab-slider-label">
                <span>Fusion Energy Abundance</span>
                <span className="font-mono">{fusionDistribution}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={fusionDistribution}
                onChange={(e) => setFusionDistribution(Number(e.target.value))}
                className="lab-range"
              />
            </div>

            <div className="lab-slider-row">
              <div className="lab-slider-label">
                <span>Longevity Velocity Coefficient</span>
                <span className="font-mono">{longevityVelocity}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={longevityVelocity}
                onChange={(e) => setLongevityVelocity(Number(e.target.value))}
                className="lab-range"
              />
            </div>
          </div>

          {/* Telemetry Output Readout Column */}
          <div className="lab-readout-col">
            <span className="text-label">THEORETICAL CIVILIZATION IMPACT:</span>

            <div className="lab-stat-box">
              <span className="lab-stat-title">Collective Cognitive Latency</span>
              <span className="lab-stat-val" style={{ color: 'var(--accent-ai)' }}>
                {cognitiveLatencyMs} ms
              </span>
              <span className="lab-stat-desc">Direct synaptic peer bandwidth latency.</span>
            </div>

            <div className="lab-stat-box">
              <span className="lab-stat-title">Planetary Entropy Burden</span>
              <span className="lab-stat-val" style={{ color: 'var(--accent-nature)' }}>
                {planetaryEntropyIndex} pts
              </span>
              <span className="lab-stat-desc">Calculated biosphere thermal footprint.</span>
            </div>

            <div className="lab-stat-box">
              <span className="lab-stat-title">Biological Senescence Ceiling</span>
              <span className="lab-stat-val" style={{ color: 'var(--accent-culture)' }}>
                {lifeExpectancyYears} yrs
              </span>
              <span className="lab-stat-desc">Average expected healthy biological horizon.</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <MuseumButton onClick={() => setSector('ATRIUM')}>
            RETURN TO CENTRAL ATRIUM
          </MuseumButton>
        </div>
      </div>
    </div>
  );
};
