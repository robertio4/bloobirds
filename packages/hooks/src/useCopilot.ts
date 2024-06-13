import { useEffect, useState } from 'react';

import { CustomUserHelperKeys, UserHelperTooltipsKeys } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';

import { useActiveUserSettings } from './useActiveUser';
import { useCopilotEnabled } from './useFeatureFlags';
import { useUserHelpers } from './useUserHelpers';

export const COPILOT__HOSTNAME = 'http://localhost:8000';
type SUGGESTION_TYPE =
  | 'TARGET_MARKET'
  | 'BUYER_PERSONA'
  | 'SCENARIO'
  | 'QUALIFYING_QUESTION'
  | 'EMAIL_TEMPLATE';
export interface Suggestion {
  _id: string;
  accountId: string;
  type: SUGGESTION_TYPE;
  creationDate: Date;
  rating: 'pending' | 'discarded' | 'accepted';
}

export interface BuyerPersonaAffinity extends Suggestion {
  grade: number;
  positivePoints: string[];
  negativePoints: string[];
  comments: string;
}

export interface TemplateInsights extends Suggestion {
  grade: number;
  positivePoints: string[];
  negativePoints: string[];
  comments: string;
}

export interface SuggestedQualifyingQuestion extends Suggestion {
  content: {
    name: string;
    description: string;
    type: 'text' | 'picklist' | 'multipicklist';
    choices: string[];
  };
}

export interface SuggestedTargetMarket extends Suggestion {
  content: {
    name: string;
    cadence: string;
    description: string;
  };
}

export interface SuggestedBuyerPersona extends Suggestion {
  content: {
    name: string;
    cadence: string;
    description: string;
  };
}

export interface SuggestedScenario extends Suggestion {
  content: {
    name: string;
    description: string;
  };
}

export const useTemplateInsights = ({
  content,
  templateId,
  store,
}: {
  content?: string;
  templateId: string;
  store: boolean;
}): { insights?: TemplateInsights; isLoading: boolean; refresh: () => void } => {
  const { isEnabled } = useCopilot();
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<TemplateInsights>(undefined);

  const [refresh, setRefresh] = useState(false);

  const [reload, setReload] = useState(true);
  useEffect(() => {
    if (isEnabled && reload) {
      setIsLoading(true);
      api
        .post<TemplateInsights>(
          `/copilot/templates/similarity?store=${store ? 'true' : 'false'}&refresh=${refresh}`,
          {
            asset_id: templateId ?? null,
            content: content ?? null,
          },
        )
        .then(response => {
          setIsLoading(false);
          setInsights(response.data);
          setReload(false);
          setRefresh(false);
          return response.data;
        });
    }
  }, [reload, isEnabled]);

  useEffect(() => {
    if (refresh) {
      setReload(true);
    }
  }, [refresh]);

  return {
    insights,
    isLoading,
    refresh: () => {
      setRefresh(true);
    },
  };
};

export const useCopilot = () => {
  const { save, has, deleteHelper, mutate, saveCustom, helpers } = useUserHelpers();
  const { settings } = useActiveUserSettings();
  const isFlagEnabled = useCopilotEnabled(settings?.account?.id);
  useEffect(() => {
    if (helpers && helpers[CustomUserHelperKeys.COPILOT_LANGUAGE]) {
      setLanguage(helpers[CustomUserHelperKeys.COPILOT_LANGUAGE]);
    }
  }, [helpers]);
  const [language, setLanguage] = useState<string>(
    helpers && helpers[CustomUserHelperKeys.COPILOT_LANGUAGE]
      ? helpers[CustomUserHelperKeys.COPILOT_LANGUAGE]
      : 'english',
  );

  const enabled = has(UserHelperTooltipsKeys.COPILOT_ENABLED);

  return {
    isEnabled: isFlagEnabled && enabled,
    setEnabled: (value: boolean) => {
      if (value) {
        save(UserHelperTooltipsKeys.COPILOT_ENABLED);
      } else {
        deleteHelper(UserHelperTooltipsKeys.COPILOT_ENABLED).then(() => {
          mutate();
        });
      }
    },
    language,
    setLanguage: (newLanguage: string) => {
      saveCustom({ key: CustomUserHelperKeys.COPILOT_LANGUAGE, data: newLanguage });
      setLanguage(newLanguage);
    },
  };
};
