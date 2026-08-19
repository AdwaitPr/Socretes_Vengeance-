/* ═══════════════════════════════════════════════════════════════
   THE MUSEUM OF POSSIBLE FUTURES — Future Graph DAG & Scenarios
   ═══════════════════════════════════════════════════════════════ */

import type { FutureGraphData } from '@/types/futureGraph';

export const FUTURE_GRAPH: FutureGraphData = {
  rootNodeId: 'root',

  nodes: {
    root: {
      id: 'root',
      title: '2026 — Present Baseline',
      year: 2026,
      category: 'culture',
      description: 'The baseline present era before major artificial cognitive divergence.',
      parentNodeIds: [],
      childNodeIds: ['future-abundance', 'future-oligarchy', 'future-resistance'],
      depth: 0,
      availableArtifactIds: ['synthetic-memory', 'post-work-society', 'the-last-forest', 'artificial-life', 'lunar-civilization', 'unknown-exhibit'],
      baseEnvironment: {
        ambientColor: '#07090e',
        fogDensity: 0.015,
        particleDensityMultiplier: 1.0,
        particleColor: '#8e95a5',
        lightingIntensity: 0.6,
        lightingTemperature: 0.5,
        glitchIntensity: 0.0,
        architecturalComplexity: 1.0,
        typographyWeight: 400,
        audioFrequencyBase: 80,
      },
    },

    'future-abundance': {
      id: 'future-abundance',
      title: 'Branch A — Universal Abundance',
      year: 2065,
      category: 'culture',
      description:
        'Automation dividends and open-source scientific commons create post-scarcity baseline. Human society shifts toward exploration, art, and ecological restoration.',
      parentNodeIds: ['root'],
      childNodeIds: [],
      depth: 1,
      availableArtifactIds: ['synthetic-memory', 'post-work-society', 'the-last-forest', 'artificial-life', 'lunar-civilization'],
      baseEnvironment: {
        ambientColor: '#071510',
        fogDensity: 0.012,
        particleDensityMultiplier: 1.4,
        particleColor: '#10b981',
        lightingIntensity: 0.85,
        lightingTemperature: 0.75,
        glitchIntensity: 0.0,
        architecturalComplexity: 1.2,
        typographyWeight: 400,
        audioFrequencyBase: 110,
      },
    },

    'future-oligarchy': {
      id: 'future-oligarchy',
      title: 'Branch B — Corporate Oligarchy',
      year: 2065,
      category: 'ai',
      description:
        'Cognitive patents are monopolized by four sovereign conglomerates. Unaugmented labor is economically disenfranchised; hyper-stratified urban enclaves emerge.',
      parentNodeIds: ['root'],
      childNodeIds: [],
      depth: 1,
      availableArtifactIds: ['synthetic-memory', 'post-work-society', 'lunar-civilization', 'unknown-exhibit'],
      baseEnvironment: {
        ambientColor: '#150907',
        fogDensity: 0.024,
        particleDensityMultiplier: 0.7,
        particleColor: '#f59e0b',
        lightingIntensity: 0.95,
        lightingTemperature: 0.9,
        glitchIntensity: 0.05,
        architecturalComplexity: 1.5,
        typographyWeight: 500,
        audioFrequencyBase: 65,
      },
    },

    'future-resistance': {
      id: 'future-resistance',
      title: 'Branch C — Neo-Luddite Resistance',
      year: 2065,
      category: 'culture',
      description:
        'Global treaty severely restricts machine cognition. Underground decentralized compute networks operate beneath heavily guarded agrarian city-states.',
      parentNodeIds: ['root'],
      childNodeIds: [],
      depth: 1,
      availableArtifactIds: ['synthetic-memory', 'post-work-society', 'the-last-forest'],
      baseEnvironment: {
        ambientColor: '#0a0815',
        fogDensity: 0.02,
        particleDensityMultiplier: 0.9,
        particleColor: '#8b5cf6',
        lightingIntensity: 0.5,
        lightingTemperature: 0.3,
        glitchIntensity: 0.15,
        architecturalComplexity: 0.8,
        typographyWeight: 300,
        audioFrequencyBase: 70,
      },
    },
  },

  decisions: {
    'fork-post-work': {
      id: 'fork-post-work',
      parentFutureNodeId: 'root',
      scenario: 'AI Labor Displacement Horizon (circa 2045)',
      context:
        'Autonomous synthetic cognition reaches capability parity across 88% of economically productive tasks. Capital return decisively decouples from human labor hours. Choose civilization trajectory:',
      options: [
        {
          id: 'option-abundance',
          label: 'Branch A — Universal Abundance Commons',
          shortLabel: 'A — ABUNDANCE',
          description:
            'Declare synthetic intelligence an un-ownable public planetary utility. Distribute machine energy and manufacturing dividends universally to all citizens.',
          targetFutureNodeId: 'future-abundance',
          consequenceModifiers: [
            { property: 'ambientColor', operation: 'set', value: '#071510', priority: 10 },
            { property: 'particleColor', operation: 'set', value: '#10b981', priority: 10 },
            { property: 'lightingIntensity', operation: 'set', value: 0.85, priority: 10 },
            { property: 'particleDensityMultiplier', operation: 'set', value: 1.4, priority: 10 },
            { property: 'audioFrequencyBase', operation: 'set', value: 110, priority: 10 },
          ],
        },
        {
          id: 'option-oligarchy',
          label: 'Branch B — Sovereign Corporate Monopolies',
          shortLabel: 'B — OLIGARCHY',
          description:
            'Allow private compute conglomerates to patent algorithmic models. Transition taxation to automated compute clusters with high inequality enclaves.',
          targetFutureNodeId: 'future-oligarchy',
          consequenceModifiers: [
            { property: 'ambientColor', operation: 'set', value: '#150907', priority: 10 },
            { property: 'particleColor', operation: 'set', value: '#f59e0b', priority: 10 },
            { property: 'lightingIntensity', operation: 'set', value: 0.95, priority: 10 },
            { property: 'glitchIntensity', operation: 'set', value: 0.05, priority: 10 },
            { property: 'audioFrequencyBase', operation: 'set', value: 65, priority: 10 },
          ],
        },
        {
          id: 'option-resistance',
          label: 'Branch C — Biological Sovereignty Treaty',
          shortLabel: 'C — RESISTANCE',
          description:
            'Enact international moratorium dismantling Level 5 neural clusters. Mandate human labor quotas and ban cognitive algorithmic trading.',
          targetFutureNodeId: 'future-resistance',
          consequenceModifiers: [
            { property: 'ambientColor', operation: 'set', value: '#0a0815', priority: 10 },
            { property: 'particleColor', operation: 'set', value: '#8b5cf6', priority: 10 },
            { property: 'lightingIntensity', operation: 'set', value: 0.5, priority: 10 },
            { property: 'glitchIntensity', operation: 'set', value: 0.15, priority: 10 },
            { property: 'audioFrequencyBase', operation: 'set', value: 70, priority: 10 },
          ],
        },
      ],
    },
  },
};
