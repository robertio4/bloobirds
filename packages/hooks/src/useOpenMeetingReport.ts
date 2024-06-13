import { ACTIVITY_FIELDS_LOGIC_ROLE, REPORTED_VALUES_LOGIC_ROLE } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import { atom, useRecoilState } from 'recoil';

import { useDataModel } from './useDataModel';
import { useFieldDependencies } from './useDependencies';

const meetingResultModalVisibilityAtom = atom({
  key: 'meetingResultModalVisibilityAtom',
  default: false,
});

const activityAtom = atom({
  key: 'meetingResultModalActivityAtom',
  default: null,
});

const mutateAtom = atom({
  key: 'meetingResultMutateAtom',
  default: null,
});

const reportResult = (activity, meetingType, meetingResult = null, markAsReported = false) => {
  const accountId = activity.id.accountId;
  const activityId = activity.id.objectId;
  const activityData = {
    [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE]: meetingType,
  };
  if (meetingResult) {
    activityData[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT] = meetingResult;
  }
  if (markAsReported) {
    activityData[ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED] = meetingResult
      ? REPORTED_VALUES_LOGIC_ROLE.YES
      : REPORTED_VALUES_LOGIC_ROLE.NO;
  }
  return api.patch(`/bobjects/${accountId}/Activity/${activityId}/raw`, activityData);
};

export const useMarkAsReported = () => {
  const markAsReported = activity => {
    const accountId = activity.id.accountId;
    const activityId = activity.id.objectId;
    const activityData = {
      [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES,
    };
    return api.patch(`/bobjects/${accountId}/Activity/${activityId}/raw`, activityData);
  };

  return {
    markAsReported,
  };
};

export const useMeetingReportResult = (dataModel, meetingTypeId) => {
  const defaultMeetingResults = dataModel
    ?.getFieldsByBobjectType('Activity')
    ?.find(datamodelField => datamodelField.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT)
    ?.values?.filter(value => value?.isEnabled)
    ?.sort((a, b) => a.ordering - b.ordering);

  const dependencies = useFieldDependencies(
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT,
  );

  const dependenciesOfSelectedType = dependencies?.find(
    dependency => dependency.requiredValue.name === meetingTypeId,
  );

  const meetingResults = dependenciesOfSelectedType
    ? defaultMeetingResults?.filter(
        result =>
          dependenciesOfSelectedType?.fieldValuesToDisplay.filter(fvd => fvd.name === result.id)
            .length > 0,
      )
    : defaultMeetingResults;

  return {
    reportResult,
    meetingResults,
  };
};

export const useOpenMeetingReportResult = () => {
  const dataModel = useDataModel();
  const [activity, setActivity] = useRecoilState(activityAtom);
  const [meetingResultModalVisibility, setMeetingResultModalVisibility] = useRecoilState(
    meetingResultModalVisibilityAtom,
  );
  const [onSave, setOnSave] = useRecoilState(mutateAtom);

  return {
    openMeetingReportResult: (activity, mutate?) => {
      setActivity(activity);
      setMeetingResultModalVisibility(true);
      if (mutate) {
        setOnSave({ fn: () => mutate() });
      }
    },
    meetingResultModalVisibility,
    closeMeetingResultModal: () => {
      setMeetingResultModalVisibility(false);
      setActivity(null);
    },
    activity,
    dataModel,
    onSave,
  };
};
