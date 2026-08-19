/* ═══════════════════════════════════════════════════════════════
   useMuseumStore — Global Museum State (Zustand)
   
   Manages: sector navigation, active artifact, future graph
   traversal, timeline year, system preferences, quality tier.
   ═══════════════════════════════════════════════════════════════ */

import { create } from 'zustand';
import type { MuseumSector, CursorState, QualityTier, FutureCategory } from '@/types/museum';
import type {
  EnvironmentState,
  DecisionHistoryEntry,
} from '@/types/futureGraph';
import { DEFAULT_ENVIRONMENT } from '@/types/futureGraph';

export interface MuseumStore {
  /* ─── Scene Navigation ─── */
  currentSector: MuseumSector;
  previousSector: MuseumSector | null;
  activeArtifactId: string | null;
  setSector: (sector: MuseumSector) => void;
  setActiveArtifact: (id: string | null) => void;

  /* ─── Cursor ─── */
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;

  /* ─── Future Graph ─── */
  currentFutureNodeId: string;
  decisionHistory: DecisionHistoryEntry[];
  visitedNodeIds: string[];
  computedEnvironment: EnvironmentState;
  makeDecision: (entry: DecisionHistoryEntry, newEnvironment: EnvironmentState) => void;
  resetSimulation: () => void;

  /* ─── Timeline ─── */
  timelineYear: number;
  setTimelineYear: (year: number) => void;

  /* ─── System ─── */
  soundEnabled: boolean;
  reducedMotion: boolean;
  qualityTier: QualityTier;
  activeFilter: FutureCategory | 'all';
  toggleSound: () => void;
  setReducedMotion: (value: boolean) => void;
  setQualityTier: (tier: QualityTier) => void;
  setActiveFilter: (filter: FutureCategory | 'all') => void;

  /* ─── Entrance ─── */
  hasEntered: boolean;
  enterMuseum: () => void;
}

export const useMuseumStore = create<MuseumStore>((set) => ({
  /* ─── Scene Navigation ─── */
  currentSector: 'VOID',
  previousSector: null,
  activeArtifactId: null,

  setSector: (sector) =>
    set((state) => ({
      currentSector: sector,
      previousSector: state.currentSector,
    })),

  setActiveArtifact: (id) => set({ activeArtifactId: id }),

  /* ─── Cursor ─── */
  cursorState: 'normal',
  setCursorState: (cursorState) => set({ cursorState }),

  /* ─── Future Graph ─── */
  currentFutureNodeId: 'root',
  decisionHistory: [],
  visitedNodeIds: ['root'],
  computedEnvironment: { ...DEFAULT_ENVIRONMENT },

  makeDecision: (entry, newEnvironment) =>
    set((state) => ({
      currentFutureNodeId: entry.resultingFutureNodeId,
      decisionHistory: [...state.decisionHistory, entry],
      visitedNodeIds: [...state.visitedNodeIds, entry.resultingFutureNodeId],
      computedEnvironment: newEnvironment,
    })),

  resetSimulation: () =>
    set({
      currentFutureNodeId: 'root',
      decisionHistory: [],
      visitedNodeIds: ['root'],
      computedEnvironment: { ...DEFAULT_ENVIRONMENT },
    }),

  /* ─── Timeline ─── */
  timelineYear: 2026,
  setTimelineYear: (timelineYear) => set({ timelineYear }),

  /* ─── System ─── */
  soundEnabled: false,
  reducedMotion: false,
  qualityTier: 'high',
  activeFilter: 'all',
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setQualityTier: (qualityTier) => set({ qualityTier }),
  setActiveFilter: (activeFilter) => set({ activeFilter }),

  /* ─── Entrance ─── */
  hasEntered: false,
  enterMuseum: () => set({ hasEntered: true, currentSector: 'ENTRANCE' }),
}));
