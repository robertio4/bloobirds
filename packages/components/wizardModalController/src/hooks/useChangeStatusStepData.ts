import React, { useState } from 'react';

import { useDataModel } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
  Bobject,
  BobjectPicklistValueEntity,
  REPORTED_VALUES_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { api, getValueFromLogicRole } from '@bloobirds-it/utils';
import { useWizardContext } from '@bloobirds-it/wizard-modal-context';

const bulkUpdateActivity = (activitiesData: object, accountId: string) => {
  api.patch(`/bobjects/${accountId}/Activity/bulk`, activitiesData);
};

const updateActivity = (activityId: string, data: object, accountId: string) =>
  api.patch(`/bobjects/${accountId}/Activity/${activityId}/raw`, data);

interface Reason {
  label: string;
  value: string;
}

export interface ChangeStatusStepDataProps {
  companyStatus: string;
  leadStatus: string;
  opportunityStatus: string;
  contactStatus?: string;
  leadReasonToDiscard?: Reason;
  companyReasonToDiscard?: Reason;
}

interface ChangeStatusStepDataInterface {
  changeStatusStepData: ChangeStatusStepDataProps;
  setChangeStatusStepData: (data: ChangeStatusStepDataProps) => void;
  bulkReportedActivityResult: ({ valueLogicRole, activitiesId }) => void;
  reportedActivityResult: ({ valueLogicRole, activityId, activity }) => void;
}
export const useChangeStatusStepData = (): ChangeStatusStepDataInterface => {
  const dataModel = useDataModel();
  const { accountId } = useWizardContext();
  const [changeStatusStepData, setChangeStatusStepData] = useState({
    companyStatus: undefined,
    leadStatus: undefined,
    opportunityStatus: undefined,
  });

  const reportedValues = dataModel.findValuesByFieldLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED);
  const meetingReportValues = dataModel.findValuesByFieldLogicRole(
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT,
  );
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
    bulkUpdateActivity(activitiesData, accountId);
  };

  const reportedActivityResult = ({
    valueLogicRole,
    activityId,
    activity,
  }: {
    valueLogicRole?: string;
    activityId: string;
    activity: Bobject;
  }) => {
    const activityType = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE);
    let updateData;
    if (activityType && activityType === ACTIVITY_TYPES.MEETING) {
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
    const activityIdToUpdate = activity?.id.objectId || activityId;

    updateActivity(activityIdToUpdate, updateData, accountId);
  };

  return {
    changeStatusStepData,
    setChangeStatusStepData,
    bulkReportedActivityResult,
    reportedActivityResult,
  };
};
