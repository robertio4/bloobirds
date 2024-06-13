import { createContext, useContext, useEffect, useState } from 'react';

import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  ActivityInsights,
  ActivityTranscript,
  Bobject,
  CRMUpdates,
} from '@bloobirds-it/types';
import { api, getFieldByLogicRole, getTextFromLogicRole } from '@bloobirds-it/utils';

import { useActiveAccountId } from './useActiveAccount';
import { useCopilotEnabled } from './useFeatureFlags';
import useInterval from './useInterval';

type OverlayType = 'transcript' | 'analysis' | 'actions';

export interface CopilotActivityContext {
  overlay: OverlayType;
  setOverlay: (overlay: OverlayType) => void;
  hasOverlay: boolean;
  transcript: ActivityTranscript;
  insights: ActivityInsights;
  crmUpdates: CRMUpdates;
  resetOverlay: () => void;
  regenerateAnalysis: () => void;
  regenerateUpdates: () => void;
  clearAllSubscriptions: () => void;
  reloadTranscript: () => Promise<void>;
  activity: Bobject;
}

const CopilotActivityContext = createContext<Partial<CopilotActivityContext>>({});

export const CopilotActivityContextProvider = ({
  activity,
  children,
}: {
  activity: Bobject;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    setTranscript(undefined);
    resumeTranscriptInterval();
    setInsights(undefined);
    resumeInsightsInterval();
    setCRMUpdates(undefined);
    resumeUpdatesInterval();
  }, [activity?.id?.objectId]);

  const accountId = useActiveAccountId();
  const isCopilotEnabled = useCopilotEnabled(accountId);

  const type = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)
    ?.valueLogicRole as ACTIVITY_TYPES_VALUES_LOGIC_ROLE;
  const recording = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RECORD_URL);
  const botId = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.BOT_ID);
  const hasRecording = !!recording;
  const hasBot = !!botId;
  const canGetCallTranscript = hasRecording && type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;

  const canGetMeetingTranscript = hasBot && type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING;

  const canGetTranscript = canGetCallTranscript || canGetMeetingTranscript;

  const [overlay, setOverlay] = useState<OverlayType>();

  const hasOverlay = !!overlay;

  const [transcript, setTranscript] = useState<ActivityTranscript>();
  const [insights, setInsights] = useState<ActivityInsights>();
  const [crmUpdates, setCRMUpdates] = useState<CRMUpdates>();

  const [canGetInsights, setCanGetInsights] = useState<boolean>(transcript?.status === 'GENERATED');

  useEffect(() => {
    if (transcript?.status === 'GENERATED') {
      setCanGetInsights(true);
    }
  }, [transcript]);

  const [
    isTranscriptIntervalCleared,
    cancelTranscriptInterval,
    resumeTranscriptInterval,
  ] = useInterval(
    () => {
      if (isCopilotEnabled && canGetTranscript) {
        api
          .get<ActivityTranscript>(
            `/copilot/transcript/${
              type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL ? 'call' : 'meeting'
            }/${activity?.id.objectId}`,
          )
          .then(response => {
            setTranscript(response.data);
          });
      }
    },
    15000,
    activity?.id.objectId,
  );

  const [isInsightsIntervalCleared, cancelInsightsInterval, resumeInsightsInterval] = useInterval(
    () => {
      if (isCopilotEnabled) {
        api
          .get<ActivityInsights>(`/copilot/transcript/insights/${activity?.id.objectId}`)
          .then(response => {
            setInsights(response.data);
          });
      }
    },
    15000,
    activity?.id.objectId,
  );

  const [isUpdatesIntervalCleared, cancelUpdatesInterval, resumeUpdatesInterval] = useInterval(
    () => {
      if (isCopilotEnabled) {
        api
          .get<CRMUpdates>(`/copilot/transcript/crm-updates/${activity?.id.objectId}`)
          .then(response => {
            setCRMUpdates(response.data);
          });
      }
    },
    15000,
    activity?.id.objectId,
  );

  useEffect(() => {
    if (
      (transcript?.status === 'GENERATED' || transcript?.status === 'ERROR') &&
      !isTranscriptIntervalCleared
    ) {
      cancelTranscriptInterval();
    }
  }, [transcript, cancelTranscriptInterval, isTranscriptIntervalCleared]);

  useEffect(() => {
    if (
      (insights?.status === 'GENERATED' || insights?.status === 'ERROR') &&
      !isInsightsIntervalCleared
    ) {
      cancelInsightsInterval();
    }
  }, [insights, isInsightsIntervalCleared, cancelInsightsInterval]);

  useEffect(() => {
    if (
      (crmUpdates?.status === 'GENERATED' || crmUpdates?.status === 'ERROR') &&
      !isUpdatesIntervalCleared
    ) {
      cancelUpdatesInterval();
    }
  }, [crmUpdates, isUpdatesIntervalCleared, cancelUpdatesInterval]);

  const regenerateAnalysis = () => {
    if (isCopilotEnabled && canGetInsights) {
      api
        .get<ActivityInsights>(
          `/copilot/transcript/insights/${activity?.id.objectId}?regenerate=true`,
        )
        .then(response => {
          setInsights(response.data);
          resumeInsightsInterval();
        });
    }
  };

  const regenerateUpdates = () => {
    if (isCopilotEnabled && canGetInsights) {
      api
        .get<CRMUpdates>(`/copilot/transcript/crm-updates/${activity?.id.objectId}?regenerate=true`)
        .then(response => {
          setCRMUpdates(response.data);
          resumeUpdatesInterval();
        });
    }
  };

  const value: CopilotActivityContext = {
    hasOverlay,
    overlay,
    resetOverlay: () => setOverlay(undefined),
    transcript,
    insights,
    crmUpdates,
    setOverlay,
    regenerateAnalysis,
    regenerateUpdates,
    clearAllSubscriptions: () => {
      cancelUpdatesInterval();
      cancelInsightsInterval();
      cancelTranscriptInterval();
    },
    activity,
    reloadTranscript: () =>
      api
        .get<ActivityTranscript>(
          `/copilot/transcript/${
            type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL ? 'call' : 'meeting'
          }/${activity?.id.objectId}`,
        )
        .then(response => {
          setTranscript(response.data);
        }),
  };

  return (
    <CopilotActivityContext.Provider value={value}>{children}</CopilotActivityContext.Provider>
  );
};

export const useCopilotActivity = (): Partial<CopilotActivityContext> => {
  return useContext(CopilotActivityContext);
};
