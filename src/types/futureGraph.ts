/* ═══════════════════════════════════════════════════════════════
   Future Graph Types — DAG with Convergence & Composable Consequences
   ═══════════════════════════════════════════════════════════════ */

import type { FutureCategory } from './museum';

/* ─── Environment State (the "world" that decisions transform) ─── */

export interface EnvironmentState {
  ambientColor: string;
  fogDensity: number;
  particleDensityMultiplier: number;
  particleColor: string;
  lightingIntensity: number;
  lightingTemperature: number; // 0 = cool, 1 = warm
  glitchIntensity: number;
  architecturalComplexity: number;
  typographyWeight: number;
  audioFrequencyBase: number;
}

export const DEFAULT_ENVIRONMENT: EnvironmentState = {
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
};

/* ─── Composable Consequence System ─── */

export type EnvironmentProperty = keyof EnvironmentState;

export type ConsequenceOperation = 'set' | 'add' | 'multiply';

export interface ConsequenceModifier {
  property: EnvironmentProperty;
  operation: ConsequenceOperation;
  value: number | string;
  priority: number; // Higher priority wins on conflict
}

/* ─── Graph Nodes ─── */

export interface FutureNode {
  id: string;
  title: string;
  year: number;
  category: FutureCategory;
  description: string;
  parentNodeIds: string[]; // Empty for root
  childNodeIds: string[]; // Empty for terminal futures
  depth: number; // Distance from root node
  availableArtifactIds: string[];
  baseEnvironment: EnvironmentState;
}

export interface DecisionOption {
  id: string;
  label: string;
  shortLabel: string; // e.g. "A — ABUNDANCE"
  description: string;
  consequenceModifiers: ConsequenceModifier[];
  targetFutureNodeId: string;
}

export interface DecisionNode {
  id: string;
  parentFutureNodeId: string;
  scenario: string;
  context: string;
  options: DecisionOption[];
}

/* ─── Decision History ─── */

export interface DecisionHistoryEntry {
  decisionNodeId: string;
  selectedOptionId: string;
  timestamp: number;
  resultingFutureNodeId: string;
}

/* ─── Future Graph Data Container ─── */

export interface FutureGraphData {
  rootNodeId: string;
  nodes: Record<string, FutureNode>;
  decisions: Record<string, DecisionNode>;
}
