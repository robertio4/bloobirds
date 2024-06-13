import {OPPORTUNITY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_STATUS_LOGIC_ROLE,
  StrDict,
  BobjectTypes,
} from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { MIXPANEL_EVENTS } from '../../../constants/mixpanel';
import { useEntity, useOpportunity, usePicklistValues } from '../../../hooks';
import { Bobject } from '../../../typings/bobjects';
import { api } from '../../../utils/api';
import { getFieldByLogicRole, getTextFromLogicRole } from '../../../utils/bobjects.utils';
import {
  ChangeStatusModalProps,
  HandleSaveParams,
  isQueuedBulkQuery,
  Reason,
  Reasons,
  Status,
} from '../changeStatusModal';
import useChangeStatus from '../useChangeStatus';
import { useChangeStatusCommonFunctions } from './useChangeStatusCommonFunctions';

const statusToReasonLR = {
  [OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST]: 'closedLostReasons',
};

export const useOpportunityStatus = (): ChangeStatusModalProps => {
  const bobjectFields = useEntity('bobjectFields');
  const { fetchNurturingAndDiscardedReasons } = useChangeStatusCommonFunctions();
  const { updateOpportunity, updateOpportunities } = useOpportunity('opportunityStatusModal');

  // OPPORTUNITY INFO

  const { bobject } = useChangeStatus();
  const isBulkAction = Array.isArray(bobject);
  const sampleBobject = isBulkAction ? bobject[0] : bobject;
  const opportunityName =
    sampleBobject && getTextFromLogicRole(sampleBobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);
  const opportunityStatus =
    sampleBobject &&
    getFieldByLogicRole(sampleBobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;

  // STATUS

  const statuses: Status[] = usePicklistValues({
    picklistLogicRole: OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
  })
    ?.filter((status: any) => status.enabled)
    ?.sort((a: any, b: any) => a?.ordering - b?.ordering)
    .map((fieldStatus: any) => ({
      name: fieldStatus.value,
      logicRole: fieldStatus.logicRole || fieldStatus.id,
      backgroundColor: fieldStatus.backgroundColor,
      outlineColor: fieldStatus.outlineColor,
      textColor: fieldStatus.textColor,
    }));

  // ADDITIONAL FIELDS

  const closedLostReasons = usePicklistValues({
    picklistLogicRole: OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSED_LOST_REASON,
  }).map(
    (reason: any): Reason => ({
      id: reason.id,
      label: reason.value,
      value: reason.id,
      logicRole: reason.logicRole,
    }),
  );

  const getStatusReason = (status: string): string => {
    if (!isBulkAction) {
      const reasonField =
        status === OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST
          ? getFieldByLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSED_LOST_REASON)
          : undefined;
      return reasonField?.value;
    } else return undefined;
  };
  const isClosedLostRequired = bobjectFields?.findByLogicRole(
    OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSED_LOST_REASON,
  )?.required;
  const isStatusClosedLost = (status: string) => {
    return status === OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST;
  };
  const getReasons = () => {
    fetchNurturingAndDiscardedReasons('Opportunity', true); // useless, but solves the esc oops due to hook calls
    return { closedLostReasons };
  };
  const getReasonsByStatus = (reasons: { [key: string]: Reasons }, status: string): Reasons => {
    // @ts-ignore
    return reasons[statusToReasonLR[status]] ?? [];
  };
  const isStatusWithReason = (status: string) => {
    return isStatusClosedLost(status);
  };
  const isRequiredAReasonByStatus = (status: string): boolean => {
    if (isStatusClosedLost(status)) {
      return isClosedLostRequired;
    } else return false;
  };
  const reasonPlaceholder = (status: string) => {
    if (isStatusClosedLost(status)) {
      return 'closed lost';
    } else return '';
  };

  // SAVE

  const handleSave = (save: HandleSaveParams) => {
    if (save.isQueuedBulk && isBulkAction) {
      const allItems = isQueuedBulkQuery(save.isQueuedBulk);
      const contents = {
        [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]: save.selectedStatus,
        [OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: save?.selectedUser?.id,
      };
      if (save.selectedReason) {
        if (save.selectedStatus === OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST) {
          contents[OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSED_LOST_REASON] = save.selectedReason?.value;
        }
      }
      api.post(`/bobjects/bulkAction/createBulk${allItems ? 'ByQuery' : ''}`, {
        importName: `Update Status in ${
          isQueuedBulkQuery(save.isQueuedBulk) ? save.isQueuedBulk?.totalItems : bobject?.length
        } opportunities`,
        actionType: 'UPDATE',
        bobjectType: BobjectTypes.Opportunity,
        ...(isQueuedBulkQuery(save.isQueuedBulk)
          ? {
              query: { query: save.isQueuedBulk.query },
            }
          : {
              bobjectIds: bobject?.map(bobject => bobject?.id?.objectId),
            }),
        contents,
      });
      save.closeModal(true); // should be in .then() but gives error with hooks
    } else {
      const isClosedLost = save.selectedStatus === OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST;
      const data: StrDict = { [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]: save.selectedStatus };
      if (isClosedLost)
        data[OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSED_LOST_REASON] = save.selectedReason?.id;
      mixpanel.track(MIXPANEL_EVENTS.CHANGED_STATUS_ON_OPPORTUNITY_VIEW, {
        'Status changed to': save.selectedStatus,
      });

      if (isBulkAction) {
        let bobjectsData = {};
        bobject?.forEach((bobject: Bobject) => {
          bobjectsData = { ...bobjectsData, [bobject.id.objectId]: data };
        });
        updateOpportunities(bobjectsData); //.then(() => { this gives error, but shouldn't
        save.closeModal();
        //});
      } else {
        updateOpportunity(bobject.id.objectId, data); //.then(() => { same error with hooks
        save.closeModal();
        //});
      }
    }
  };

  return {
    handleSave,
    layoutOptions: {
      bobjectType: 'opportunity',
      bobjectTypeBulk: 'opportunities',
      iconTitle: 'fileOpportunity',
      iconBobjectName: 'fileOpportunity',
      labelWidth: '370px',
    },
    bobjectName: opportunityName,
    bobjectStatus: opportunityStatus,
    getStatusReason,
    isInSalesStage: true,
    statuses,
    getReasons,
    getReasonsByStatus,
    isStatusWithReason,
    isRequiredAReasonByStatus,
    reasonPlaceholder,
  };
};
