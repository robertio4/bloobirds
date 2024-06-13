import { useToasts } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';
import { atom, atomFamily, useRecoilState } from 'recoil';

import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../constants/activity';
import { BobjectApi } from '../misc/api/bobject';
import { BobjectPicklistValueEntity } from '../typings/entities.js';
import { api } from '../utils/api';
import { getValueFromLogicRole } from '../utils/bobjects.utils';
import { usePicklistValues } from './usePicklistValues';

const activityAtom = atomFamily({
  key: 'activityAtom',
  default: {
    data: undefined,
    loaded: false,
    isFetching: false,
  },
});

const activitiesToMarkAsDoneAtom = atom<Bobject | Bobject[]>({
  key: 'activitiesToMarkAsDoneAtom',
  default: [],
});

const activityDoneVisibilityAtom = atom({
  key: 'activityDoneVisibilityAtom',
  default: false,
});

export const fetchActivity = (activityId: string, injectReferences: boolean) =>
  BobjectApi.request()
    .Activity()
    .getForm(activityId, injectReferences ? 'injectReferences=true' : null);

// TODO: Use the new bobjectApi
const updateActivity = (activityId: string, data: object) =>
  BobjectApi.request().bobjectType('Activity').partialSet({ bobjectId: activityId, data });

const assignActivity = (activityId: string, leadId: string) =>
  api.post(`/utils/service/activity/assign/${activityId}`, { leadId });

const bulkUpdateActivity = (activitiesData: object) =>
  BobjectApi.request().bobjectType('Activity').bulkPartialSet(activitiesData);

interface UpdatedBobject {
  data: Bobject;
  loaded: boolean;
  isFetching: boolean;
}

export const useActivity = (family: string, injectReferences = false) => {
  const [activity, setActivity] = useRecoilState<UpdatedBobject>(activityAtom(family));
  const reportedValues = usePicklistValues({
    picklistLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED,
  });

  const meetingReportValues = usePicklistValues({
    picklistLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT,
  });
  const { createToast } = useToasts();

  const resetActivity = () =>
    setActivity({
      data: undefined,
      loaded: false,
      isFetching: false,
    });

  const setActivityWithId = (activityIdToUpdate: string) => {
    if (!activity.isFetching) {
      setActivity({ ...activity, isFetching: true, loaded: false });
      fetchActivity(activityIdToUpdate, injectReferences).then(response => {
        setActivity({
          data: response,
          loaded: true,
          isFetching: false,
        });
      });
    }
  };

  const reportedActivityResult = ({
    valueLogicRole,
    activityId,
    activityType = getValueFromLogicRole(
      activity?.data,
      ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
    ) as keyof typeof ACTIVITY_TYPES,
  }: {
    valueLogicRole?: string;
    activityId: string;
    activityType?: keyof typeof ACTIVITY_TYPES;
  }) => {
    let updateData;
    if (activityType === ACTIVITY_TYPES.MEETING) {
      const reportedResult = meetingReportValues.find(
        (status: BobjectPicklistValueEntity) => status.logicRole === valueLogicRole,
      );
      updateData = {
        [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT]: reportedResult?.id || valueLogicRole,
        [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: valueLogicRole
          ? REPORTED_VALUES_LOGIC_ROLE.YES
          : REPORTED_VALUES_LOGIC_ROLE.NO,
      };
    } else {
      const reported = reportedValues.find(
        (status: BobjectPicklistValueEntity) => status.logicRole === valueLogicRole,
      );
      updateData = {
        [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: reported
          ? reported?.id
          : REPORTED_VALUES_LOGIC_ROLE.NO,
      };
    }
    const activityIdToUpdate = activity.data?.id.objectId || activityId;

    updateActivity(activityIdToUpdate, updateData);
  };

  const bulkReportedActivityResult = ({
    valueLogicRole,
    activitiesId,
  }: {
    valueLogicRole: string;
    activitiesId: string[];
  }) => {
    const reported = reportedValues.find(status => status.logicRole === valueLogicRole);
    let activitiesData = {};
    activitiesId.forEach(activityId => {
      activitiesData = {
        ...activitiesData,
        [activityId]: { [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: reported.id },
      };
    });
    bulkUpdateActivity(activitiesData);
  };

  const setPinned = (bobjectId: string, isPinned: boolean, type: string) => {
    updateActivity(bobjectId, {
      ACTIVITY__IS_PINNED: isPinned ? null : 'ACTIVITY__IS_PINNED__YES',
    }).then(() =>
      createToast({
        message: `${type} ${isPinned ? 'unpinned' : 'pinned'} successfully!`,
        type: 'success',
      }),
    );
  };

  return {
    activity: activity.data,
    isLoaded: activity.loaded,
    isFetching: activity.isFetching,
    setActivityToUse: (activity: Bobject) =>
      setActivity({ data: activity, loaded: true, isFetching: false }),
    reportedActivityResult,
    resetActivity,
    setActivityWithId,
    updateActivity,
    bulkReportedActivityResult,
    setPinned,
    assignActivity,
  };
};

const useActivityDoneVisibility = () => {
  const [activityDoneVisibility, setActivityDoneVisibility] = useRecoilState(
    activityDoneVisibilityAtom,
  );

  const changeVisibility = (show: boolean) => {
    setActivityDoneVisibility(show);
  };
  return {
    isOpen: activityDoneVisibility,
    changeVisibility,
  };
};

export const useActivityDone = () => {
  const { isOpen, changeVisibility } = useActivityDoneVisibility();
  const [activitiesToMarkAsDone, setActivitiesToMarkAsDone] = useRecoilState<Bobject | Bobject[]>(
    activitiesToMarkAsDoneAtom,
  );
  const { bulkReportedActivityResult, reportedActivityResult } = useActivity('activityDone');

  return {
    isOpen,
    activities: activitiesToMarkAsDone,
    showToast: (show: boolean, activities: Bobject[]) => {
      setActivitiesToMarkAsDone(activities);
      changeVisibility(show);
    },
    markAsDone: () => {
      const isBulkAction = Array.isArray(activitiesToMarkAsDone);

      if (isBulkAction) {
        bulkReportedActivityResult({
          valueLogicRole: REPORTED_VALUES_LOGIC_ROLE.YES,
          activitiesId: activitiesToMarkAsDone?.map(activity => activity?.id.objectId),
        });
      } else {
        reportedActivityResult({
          valueLogicRole: REPORTED_VALUES_LOGIC_ROLE.YES,
          activityId: activitiesToMarkAsDone?.id?.objectId,
        });
      }
    },
  };
};
