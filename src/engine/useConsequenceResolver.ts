/* ═══════════════════════════════════════════════════════════════
   useConsequenceResolver — Composable Consequence Calculator
   ═══════════════════════════════════════════════════════════════ */

import type {
  EnvironmentState,
  DecisionHistoryEntry,
  ConsequenceModifier,
  FutureGraphData,
} from '@/types/futureGraph';
import { DEFAULT_ENVIRONMENT } from '@/types/futureGraph';

export function resolveEnvironmentState(
  graphData: FutureGraphData,
  currentNodeId: string,
  history: DecisionHistoryEntry[]
): EnvironmentState {
  const currentNode = graphData.nodes[currentNodeId];
  const base: EnvironmentState = currentNode
    ? { ...currentNode.baseEnvironment }
    : { ...DEFAULT_ENVIRONMENT };

  // Map to track the winning priority for each property
  const propertyPriorities: Partial<Record<keyof EnvironmentState, number>> = {};

  for (const entry of history) {
    const decision = graphData.decisions[entry.decisionNodeId];
    if (!decision) continue;

    const option = decision.options.find((o) => o.id === entry.selectedOptionId);
    if (!option) continue;

    for (const modifier of option.consequenceModifiers) {
      applyModifier(base, modifier, propertyPriorities);
    }
  }

  return base;
}

function applyModifier(
  state: EnvironmentState,
  modifier: ConsequenceModifier,
  priorities: Partial<Record<keyof EnvironmentState, number>>
) {
  const currentPriority = priorities[modifier.property] ?? -1;

  if (modifier.priority >= currentPriority) {
    priorities[modifier.property] = modifier.priority;

    const prop = modifier.property;
    if (typeof state[prop] === 'number') {
      const currentVal = state[prop] as number;
      const modVal = Number(modifier.value);

      if (modifier.operation === 'set') {
        (state[prop] as number) = modVal;
      } else if (modifier.operation === 'add') {
        (state[prop] as number) = currentVal + modVal;
      } else if (modifier.operation === 'multiply') {
        (state[prop] as number) = currentVal * modVal;
      }
    } else if (typeof state[prop] === 'string') {
      (state[prop] as string) = String(modifier.value);
    }
  }
}
