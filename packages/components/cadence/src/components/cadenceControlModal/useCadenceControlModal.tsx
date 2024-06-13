import React, { createContext, useContext, useState } from 'react';

import {
  BobjectTypes,
  BulkActions,
  FIELDS_LOGIC_ROLE,
  IMPORT_THRESHOLD,
  LEAD_FIELDS_LOGIC_ROLE,
  MainBobjectTypes,
  MIXPANEL_EVENTS,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  PluralBobjectTypes,
} from '@bloobirds-it/types';
import {
  api,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isCompany,
  isLead,
  isOpportunity,
} from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

import { useHasCadenceStarted } from '../../hooks/useHasCadenceStarted';
import {
  ContextProps,
  ProviderProps,
  QueuedBulkProps,
  StepInfo,
} from '../../typings/cadenceControl/cadenceControl.typings';

export const CadenceControlModalProvider = ({ children, ...props }: ProviderProps) => {
  const { bobject, initialStep } = props;
  const [stepInfo, setStepInfo] = useState<StepInfo>(initialStep);
  const opportunityBobject = isOpportunity(bobject);
  const leadBobject = isLead(bobject);
  const companyBobject = isCompany(bobject);
  const {
    hasStarted: cadenceWasStarted,
    isLoading: isLoadingCadenceStarted,
  } = useHasCadenceStarted({
    id: bobject?.id,
    companyId: opportunityBobject
      ? getValueFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY)
      : undefined,
  });

  const cadenceManagement = useCadenceControlData(bobject);
  const bobjectName = leadBobject
    ? bobject?.fullName || getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME)
    : bobject?.name ||
      getTextFromLogicRole(
        bobject,
        FIELDS_LOGIC_ROLE[bobject?.id?.typeName as MainBobjectTypes]?.NAME,
      );

  return (
    !isLoadingCadenceStarted && (
      <CadenceControlModalContext.Provider
        value={{
          ...props,
          isOpportunity: opportunityBobject,
          isLead: leadBobject,
          isCompany: companyBobject,
          bobjectName,
          stepInfo,
          setStepInfo,
          cadenceManagement,
          cadenceWasStarted,
        }}
      >
        {children}
      </CadenceControlModalContext.Provider>
    )
  );
};

const CadenceControlModalContext = createContext<ContextProps>(null);

export const useCadenceControlModal = () => {
  const context = useContext(CadenceControlModalContext);

  if (context === undefined) {
    throw new Error('useInactiveHandlingModal must be used within the modal provider');
  }

  return context;
};

const putStartCadence = ({ bobjectId, bobjectType, startCadence, cadenceId }) => {
  return api.put(`/messaging/cadences/${cadenceId}/start`, {
    bobjectId,
    bobjectType,
    startCadence,
  });
};

const launchQueuedBulkAction = ({
  action,
  query,
  params,
  total,
  bobjectType,
  bobjectIds,
  contents,
}: QueuedBulkProps) => {
  const isStartCadence = action === BulkActions.START_CADENCE;
  const isByQuery = !!query;

  return api.post(`/bobjects/bulkAction/${isByQuery ? 'createBulkByQuery' : 'createBulk'}`, {
    importName: `${isStartCadence ? 'Start' : 'Stop'} cadence in ${total} ${
      PluralBobjectTypes[bobjectType]
    }`,
    actionType: action,
    bobjectIds,
    ...(isByQuery
      ? {
          query,
        }
      : {}),
    bobjectType,
    contents,
    ...(isStartCadence ? params : {}),
  });
};

const putBulkCadence = ({ startCadence, cadenceId, bobjects }) => {
  const body = bobjects.map(bobject => ({
    bobjectId: bobject?.id.objectId,
    bobjectType: bobject?.id.typeName,
    startCadence,
    cadenceId,
  }));
  return api.put(`/messaging/cadences/start`, body);
};

const putBulkStopCadence = ({ bobjects }) => {
  const body = bobjects.map(bobject => ({
    bobjectId: bobject?.id.objectId,
    bobjectType: bobject?.id.typeName,
  }));
  return api.put(`/messaging/cadences/stop`, body);
};

const putStopCadence = ({ bobjectId, bobjectType }) => {
  return (
    bobjectType !== BobjectTypes.Activity &&
    api.put(`/messaging/cadences/${bobjectType}/${bobjectId}/stop`)
  );
};

const isBulkAction = bobjectToCheck => Array.isArray(bobjectToCheck);

export const useCadenceControlData = bobject => {
  const [isSaving, setIsSaving] = useState(false);
  const bobjectType = isBulkAction(bobject) ? bobject[0]?.id.typeName : bobject?.id.typeName;
  const baseQueuedProps = { bobjectType, contents: {} };

  const stopCadence = (callback, useEveryBobject, subhomeTab) => {
    setIsSaving(true);
    const { isActive, total, query } = useEveryBobject || {};

    const handleCallback = () => {
      setIsSaving(false);
      callback?.();
    };

    if (isBulkAction(bobject)) {
      // Queued bulk with all bobjects
      if (isActive && total >= IMPORT_THRESHOLD && bobject?.length < total) {
        launchQueuedBulkAction({
          action: BulkActions.STOP_CADENCE,
          total,
          query: query ?? {},
          ...baseQueuedProps,
        }).then(handleCallback);
      } // Queued bulk with selected bobjects
      else if (bobject?.length >= IMPORT_THRESHOLD) {
        const bobjectIds = bobject.map(bob => bob.id.value);
        launchQueuedBulkAction({
          action: BulkActions.STOP_CADENCE,
          total: bobject?.length,
          bobjectIds,
          ...baseQueuedProps,
        }).then(handleCallback);
        mixpanel.track(
          MIXPANEL_EVENTS.STOP_CADENCE_IMPORT_BULK_ACTION_CLICKED_ON_ +
            bobjectType.toUpperCase() +
            '_ON' +
            subhomeTab?.toUpperCase() +
            '_TAB',
        );
      } else {
        putBulkStopCadence({ bobjects: bobject }).then(handleCallback);
        mixpanel.track(
          MIXPANEL_EVENTS.STOP_CADENCE_BASIC_BULK_ACTION_CLICKED_ON_ +
            bobjectType?.toUpperCase() +
            '_ON' +
            subhomeTab?.toUpperCase() +
            '_TAB',
        );
      }
    } else {
      putStopCadence({
        bobjectId: bobject?.id.objectId,
        bobjectType,
      })?.then(handleCallback);
    }
  };

  const saveCadence = (cadence, callback, date, useEveryBobject, subhomeTab) => {
    setIsSaving(true);
    const { isActive, total, query } = useEveryBobject || {};
    const params = { startCadenceDate: date, cadenceId: cadence };

    const handleCallback = () => {
      setIsSaving(false);
      callback?.();
    };
    if (isBulkAction(bobject)) {
      // Queued bulk with all bobjects
      if (isActive && total >= IMPORT_THRESHOLD && bobject?.length < total) {
        launchQueuedBulkAction({
          action: BulkActions.START_CADENCE,
          total,
          query: query ?? {},
          params,
          ...baseQueuedProps,
        }).then(handleCallback);
      } // Queued bulk with selected bobjects
      else if (bobject?.length >= IMPORT_THRESHOLD) {
        const bobjectIds = bobject.map(bob => bob.id.value);
        launchQueuedBulkAction({
          action: BulkActions.START_CADENCE,
          total: bobject?.length,
          bobjectIds,
          params,
          ...baseQueuedProps,
        }).then(handleCallback);
        mixpanel.track(
          MIXPANEL_EVENTS.SET_CADENCE_IMPORT_BULK_ACTION_CLICKED_ON_ +
            bobjectType?.toUpperCase() +
            subhomeTab
            ? '_ON' + subhomeTab?.toUpperCase() + '_TAB'
            : '',
        );
      } else {
        putBulkCadence({ startCadence: date, cadenceId: cadence, bobjects: bobject }).then(
          handleCallback,
        );
        mixpanel.track(
          MIXPANEL_EVENTS.SET_CADENCE_BASIC_BULK_ACTION_CLICKED_ON_ +
            bobjectType?.toUpperCase() +
            subhomeTab
            ? '_ON' + subhomeTab?.toUpperCase() + '_TAB'
            : '',
        );
      }
    } else {
      putStartCadence({
        bobjectId: bobject?.id.objectId,
        bobjectType,
        startCadence: date,
        cadenceId: cadence,
      }).then(handleCallback);
    }
  };

  return {
    isSaving,
    saveCadence,
    stopCadence,
  };
};
