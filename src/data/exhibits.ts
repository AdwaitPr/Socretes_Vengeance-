/* ═══════════════════════════════════════════════════════════════
   THE MUSEUM OF POSSIBLE FUTURES — Curatorial Exhibit Database
   ═══════════════════════════════════════════════════════════════ */

import type { ExhibitArtifact } from '@/types/museum';

export const EXHIBITS_DATA: ExhibitArtifact[] = [
  {
    id: 'synthetic-memory',
    exhibitNumber: 'EXHIBIT 001',
    title: 'Synthetic Memory',
    codename: 'CHRONOS_PRISM',
    year: 2058,
    category: 'ai',
    tagline: 'Crystalline cognitive substrate encoding synthetic experiential recall.',
    abstract:
      'A non-biological lattice capable of storing human sensory memory with 99.4% affective fidelity. Memories exist as harmonic lattice vibrations rather than binary storage.',
    curatorNotes:
      'Curator Note: Discovered in Sector 7 during the early cognitive augmentation trials. When focused, internal neuron particles oscillate in resonance with observer focus.',
    metrics: {
      probability: {
        label: 'Realization Probability',
        value: 78,
        classification: 'speculative-probability',
      },
      technologicalFeasibility: {
        label: 'Technological Feasibility',
        value: 68,
        classification: 'curatorial-estimate',
      },
      economicFeasibility: {
        label: 'Economic Feasibility',
        value: 84,
        classification: 'curatorial-estimate',
      },
      environmentalImpact: {
        label: 'Resource Footprint',
        value: 22,
        classification: 'curatorial-estimate',
      },
      societalTransformation: {
        label: 'Societal Transformation',
        value: 94,
        classification: 'scenario-confidence',
      },
    },
    geometry: {
      strategy: 'procedural',
      fallbackGeometry: 'crystal',
    },
    accentColor: 'var(--accent-ai)',
    interactiveCapabilities: ['rotate', 'zoom', 'dissect'],
    forkScenarioId: undefined,
    yearRange: [2040, 2090],
  },
  {
    id: 'post-work-society',
    exhibitNumber: 'EXHIBIT 003',
    title: 'Post-Work Society',
    codename: 'AEON_LABOR_MATRIX',
    year: 2065,
    category: 'culture',
    tagline: 'Autonomous economic engine precipitating the decoupling of survival from human labor.',
    abstract:
      'When machine cognition surpassed aggregate human production capacity, human civilization stood at a civilizational fork: universal abundance, corporate ownership, or neo-luddite resistance.',
    curatorNotes:
      'Curator Note: Contains the primary Future Fork simulator. Selecting an economic model transforms the museum atrium atmosphere and reconfigures subsequent history branches.',
    metrics: {
      probability: {
        label: 'Realization Probability',
        value: 86,
        classification: 'speculative-probability',
      },
      technologicalFeasibility: {
        label: 'Technological Feasibility',
        value: 91,
        classification: 'curatorial-estimate',
      },
      economicFeasibility: {
        label: 'Economic Feasibility',
        value: 52,
        classification: 'curatorial-estimate',
      },
      environmentalImpact: {
        label: 'Ecological Stabilization',
        value: 76,
        classification: 'curatorial-estimate',
      },
      societalTransformation: {
        label: 'Societal Transformation',
        value: 98,
        classification: 'scenario-confidence',
      },
    },
    geometry: {
      strategy: 'procedural',
      fallbackGeometry: 'gear-matrix',
    },
    accentColor: 'var(--accent-culture)',
    interactiveCapabilities: ['rotate', 'fork', 'zoom'],
    forkScenarioId: 'fork-post-work',
    yearRange: [2035, 2100],
  },
  {
    id: 'the-last-forest',
    exhibitNumber: 'EXHIBIT 002',
    title: 'The Last Forest',
    codename: 'BIOME_SEED_ZERO',
    year: 2074,
    category: 'nature',
    tagline: 'Quantum cryogenic biosphere capsule preserving ancestral Earth flora genomes.',
    abstract:
      'Following the rapid thermal shifts of the mid-21st century, complete planetary biomes were encapsulated into self-regulating orbital containment pods awaiting planetary re-seeding.',
    curatorNotes:
      'Curator Note: Emits a low photosynthetic bioluminescence. Concentric containment rings rotate along counter-opposing celestial axes.',
    metrics: {
      probability: {
        label: 'Realization Probability',
        value: 71,
        classification: 'speculative-probability',
      },
      technologicalFeasibility: {
        label: 'Technological Feasibility',
        value: 82,
        classification: 'curatorial-estimate',
      },
      economicFeasibility: {
        label: 'Economic Feasibility',
        value: 64,
        classification: 'curatorial-estimate',
      },
      environmentalImpact: {
        label: 'Biodiversity Preservation',
        value: 99,
        classification: 'scenario-confidence',
      },
      societalTransformation: {
        label: 'Cultural Resonance',
        value: 85,
        classification: 'curatorial-estimate',
      },
    },
    geometry: {
      strategy: 'procedural',
      fallbackGeometry: 'containment-ring',
    },
    accentColor: 'var(--accent-nature)',
    interactiveCapabilities: ['rotate', 'zoom'],
    yearRange: [2050, 2120],
  },
  {
    id: 'artificial-life',
    exhibitNumber: 'EXHIBIT 005',
    title: 'Artificial Life',
    codename: 'SYNTH_ORGANISM_IX',
    year: 2082,
    category: 'nature',
    tagline: 'De novo synthetic computational organism capable of continuous morphogenetic evolution.',
    abstract:
      'Built purely from synthesized non-natural base pairs and silicon-protein hybrid polymers. It behaves as both living cell and high-density logic gate.',
    curatorNotes:
      'Curator Note: Surface topology deforms in real time via continuous Simplex noise algorithms responding to proximity.',
    metrics: {
      probability: {
        label: 'Realization Probability',
        value: 64,
        classification: 'speculative-probability',
      },
      technologicalFeasibility: {
        label: 'Technological Feasibility',
        value: 58,
        classification: 'curatorial-estimate',
      },
      economicFeasibility: {
        label: 'Economic Feasibility',
        value: 73,
        classification: 'curatorial-estimate',
      },
      environmentalImpact: {
        label: 'Biohazard Containment',
        value: 45,
        classification: 'curatorial-estimate',
      },
      societalTransformation: {
        label: 'Ontological Paradigm Shift',
        value: 96,
        classification: 'scenario-confidence',
      },
    },
    geometry: {
      strategy: 'procedural',
      fallbackGeometry: 'organic-blob',
    },
    accentColor: 'var(--accent-nature)',
    interactiveCapabilities: ['rotate', 'mutate', 'zoom'],
    yearRange: [2060, 2140],
  },
  {
    id: 'lunar-civilization',
    exhibitNumber: 'EXHIBIT 006',
    title: 'Lunar Civilization',
    codename: 'SELENA_HABITAT_ONE',
    year: 2095,
    category: 'space',
    tagline: 'Subterranean lava tube megastructure housing humanity’s first self-sustaining off-world colony.',
    abstract:
      'Constructed inside Mare Tranquillitatis lava conduits to shield 120,000 permanent inhabitants from cosmic radiation and micrometeorites.',
    curatorNotes:
      'Curator Note: Orbital moon model features active day/night terminator lines and illuminated habitat dome clusters.',
    metrics: {
      probability: {
        label: 'Realization Probability',
        value: 79,
        classification: 'speculative-probability',
      },
      technologicalFeasibility: {
        label: 'Technological Feasibility',
        value: 85,
        classification: 'curatorial-estimate',
      },
      economicFeasibility: {
        label: 'Economic Feasibility',
        value: 61,
        classification: 'curatorial-estimate',
      },
      environmentalImpact: {
        label: 'Planetary Expansion',
        value: 88,
        classification: 'curatorial-estimate',
      },
      societalTransformation: {
        label: 'Multiplanetary Identity',
        value: 91,
        classification: 'scenario-confidence',
      },
    },
    geometry: {
      strategy: 'procedural',
      fallbackGeometry: 'orbital-moon',
    },
    accentColor: 'var(--accent-space)',
    interactiveCapabilities: ['rotate', 'zoom'],
    yearRange: [2070, 2150],
  },
  {
    id: 'unknown-exhibit',
    exhibitNumber: 'EXHIBIT 000',
    title: 'Unknown Artifact',
    codename: 'NULL_ORIGIN_VOID',
    year: 2150,
    category: 'unknown',
    tagline: 'Redacted specimen exhibiting non-Euclidean curvature and temporal telemetry distortion.',
    abstract:
      'Curatorial classification failure. Standard spectroscopy yields zero photon reflectance. Gravitational lensing detected along perimeter vertices.',
    curatorNotes:
      'Curator Note: WARNING — Prolonged observer interaction induces telemetry glitches and anomalous text rearrangement.',
    metrics: {
      probability: {
        label: 'Causality Coherence',
        value: 12,
        classification: 'speculative-probability',
      },
      technologicalFeasibility: {
        label: 'Physics Conformity',
        value: 4,
        classification: 'curatorial-estimate',
      },
      economicFeasibility: {
        label: 'Value Quantifiability',
        value: 0,
        classification: 'curatorial-estimate',
      },
      environmentalImpact: {
        label: 'Local Spacetime Distortion',
        value: 99,
        classification: 'scenario-confidence',
      },
      societalTransformation: {
        label: 'Existential Threat Index',
        value: 100,
        classification: 'scenario-confidence',
      },
    },
    geometry: {
      strategy: 'procedural',
      fallbackGeometry: 'monolith',
    },
    accentColor: 'var(--accent-unknown)',
    interactiveCapabilities: ['rotate', 'inspect'],
    yearRange: [2026, 2150],
  },
];
