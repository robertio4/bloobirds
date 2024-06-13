import {
  SuggestedQualifyingQuestion,
  SuggestedScenario,
  SuggestedTargetMarket,
  useCopilot,
  useQualifyingQuestions,
} from '@bloobirds-it/hooks';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { useUserSettings } from '../components/userPermissions/hooks';
import { useEntity } from './entities/useEntity';
import { useBobjectTypes } from './useBobjectTypes';

export const useSuggestedTargetMarkets = () => {
  const { isEnabled } = useCopilot();
  const settings = useUserSettings();
  const currentTargetMarkets = useEntity('targetMarkets')?.all();

  const bobjectTypes = useBobjectTypes();

  const companyBobjectType = bobjectTypes?.findBy('name')('Company');

  const cadences = useEntity('cadences');

  const companyCadences = cadences?.filterBy('bobjectType', companyBobjectType.id);

  const { data, mutate } = useSWR(
    isEnabled &&
      currentTargetMarkets &&
      companyCadences &&
      settings?.account?.id &&
      '/copilot/markets',
    async () => {
      const response = await api.post<SuggestedTargetMarket[]>(`/copilot/target-market/suggest`, {
        existingTargets: currentTargetMarkets.map(market => ({
          name: market.name,
          description: market.description,
          cadence: market.cadence,
          enabled: market.enabled,
        })),
        existingCadences: companyCadences
          ?.filter((cadence: { enabled: any }) => cadence.enabled)
          .map((cadence: { name: any; id: any }) => ({ name: cadence.name, id: cadence.id })),
      });
      return response.data;
    },
  );

  return {
    suggestedTargetMarkets: data ?? [],
  };
};

export const useSuggestedBuyerPersonas = () => {
  const { isEnabled } = useCopilot();
  const settings = useUserSettings();
  const currentBuyerPersonas = useEntity('idealCustomerProfiles')?.all();
  const bobjectTypes = useBobjectTypes();

  const leadBobjectType = bobjectTypes?.findBy('name')('Lead');

  const cadences = useEntity('cadences');

  const leadCadences = cadences?.filterBy('bobjectType', leadBobjectType.id);
  const { data, mutate } = useSWR(
    isEnabled && currentBuyerPersonas && leadCadences && settings?.account?.id && '/copilot/icps',
    async () => {
      const response = await api.post<SuggestedTargetMarket[]>(`/copilot/buyer-persona/suggest`, {
        existingPersonas: currentBuyerPersonas.map(persona => ({
          name: persona.name,
          description: persona.description,
          cadence: persona.cadence,
          enabled: persona.enabled,
        })),
        existingCadences: leadCadences
          ?.filter((cadence: { enabled: any }) => cadence.enabled)
          .map((cadence: { name: any; id: any }) => ({ name: cadence.name, id: cadence.id })),
      });
      return response.data;
    },
  );
  return {
    suggestedBuyerPersonas: data ?? [],
  };
};

export const useSuggestedScenarios = (): { suggestedScenarios: SuggestedScenario[] } => {
  const { isEnabled } = useCopilot();
  const settings = useUserSettings();
  const currentScenarios = useEntity('useCases')?.all();
  const { data, mutate } = useSWR(
    isEnabled && currentScenarios && settings?.account?.id && '/copilot/scenarios',
    async () => {
      const response = await api.post<SuggestedScenario[]>(`/copilot/scenario/suggest`, {
        existingScenarios: currentScenarios.map(scenario => ({
          name: scenario.name,
          description: scenario.description,
          enabled: scenario.enabled,
        })),
      });
      return response.data;
    },
  );
  return {
    suggestedScenarios: data ?? [],
  };
};

export const useSuggestedQualifyingQuestions = (): {
  suggestedQualifyingQuestions: SuggestedQualifyingQuestion[];
} => {
  const { isEnabled } = useCopilot();
  const settings = useUserSettings();
  const { qualifyingQuestions } = useQualifyingQuestions();
  const { data, mutate } = useSWR(
    isEnabled && qualifyingQuestions && settings?.account?.id && '/copilot/questions',
    async () => {
      const response = await api.post<SuggestedQualifyingQuestion[]>(
        `/copilot/qualifying-question/suggest`,
        {
          existingQualifyingQuestions: qualifyingQuestions.map((question: any) => ({
            name: question.question,
            enabled: question.enabled,
            options: question.answers.map((answer: any) => answer.value),
          })),
        },
      );
      return response.data;
    },
  );
  return {
    suggestedQualifyingQuestions: data ?? [],
  };
};
