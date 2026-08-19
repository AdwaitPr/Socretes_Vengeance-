/* ═══════════════════════════════════════════════════════════════
   Museum Domain Types — Core Exhibit & Artifact System
   ═══════════════════════════════════════════════════════════════ */

export type FutureCategory = 'nature' | 'ai' | 'space' | 'culture' | 'unknown';

export type InteractionCapability = 'rotate' | 'zoom' | 'dissect' | 'mutate' | 'fork' | 'inspect';

export type GeometryStrategy = 'procedural' | 'glb-model';

export type MetricClassification =
  | 'speculative-probability'
  | 'curatorial-estimate'
  | 'scenario-confidence';

export interface SpeculativeMetric {
  label: string;
  value: number; // 0–100
  classification: MetricClassification;
}

export interface ExhibitMetrics {
  probability: SpeculativeMetric;
  technologicalFeasibility: SpeculativeMetric;
  economicFeasibility: SpeculativeMetric;
  environmentalImpact: SpeculativeMetric;
  societalTransformation: SpeculativeMetric;
}

export interface ExhibitGeometry {
  strategy: GeometryStrategy;
  modelPath?: string;
  fallbackGeometry: string;
  mobileVariant?: string;
}

export interface ExhibitArtifact {
  id: string;
  exhibitNumber: string; // "EXHIBIT 001"
  title: string;
  codename: string;
  year: number; // 2026–2150
  category: FutureCategory;
  tagline: string;
  abstract: string;
  curatorNotes: string;
  metrics: ExhibitMetrics;
  geometry: ExhibitGeometry;
  accentColor: string;
  interactiveCapabilities: InteractionCapability[];
  forkScenarioId?: string;
  yearRange: [number, number];
}

/** Museum sector identifiers — each maps to a camera state + environment config */
export type MuseumSector =
  | 'VOID'
  | 'ENTRANCE'
  | 'ATRIUM'
  | 'INSPECT'
  | 'FORK'
  | 'ARCHIVE'
  | 'TIMELINE'
  | 'LAB'
  | 'UNKNOWN';

/** Cursor interaction states */
export type CursorState =
  | 'normal'
  | 'interactive'
  | 'inspect'
  | 'enter'
  | 'drag'
  | 'zoom'
  | 'anomaly';

/** Quality tier for adaptive rendering */
export type QualityTier = 'ultra' | 'high' | 'medium' | 'low';
