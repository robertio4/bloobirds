import {
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
  StrDict,
  BobjectTypes,
} from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';
import { useEntity, useLeads, usePicklistValues } from '../../../hooks';
import { getFieldByLogicRole, getTextFromLogicRole } from '../../../utils/bobjects.utils';
import { MIXPANEL_EVENTS } from '../../../constants/mixpanel';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';
import {
  ChangeStatusModalProps,
  HandleSaveParams,
  isQueuedBulkQuery,
  Reasons,
} from '../changeStatusModal';
import useChangeStatus from '../useChangeStatus';
import { useChangeStatusCommonFunctions } from './useChangeStatusCommonFunctions';
import { api } from '../../../utils/api';

const AVAILABLE_LEAD_STATUSES = [
  LEAD_STATUS_LOGIC_ROLE.NEW,
  LEAD_STATUS_LOGIC_ROLE.BACKLOG,
  LEAD_STATUS_LOGIC_ROLE.DELIVERED,
  LEAD_STATUS_LOGIC_ROLE.ON_PROSPECTION,
  LEAD_STATUS_LOGIC_ROLE.CONTACTED,
  LEAD_STATUS_LOGIC_ROLE.ENGAGED,
  LEAD_STATUS_LOGIC_ROLE.MEETING,
  LEAD_STATUS_LOGIC_ROLE.CONTACT,
  LEAD_STATUS_LOGIC_ROLE.NURTURING,
  LEAD_STATUS_LOGIC_ROLE.ON_HOLD,
  LEAD_STATUS_LOGIC_ROLE.DISCARDED,
];

const AVAILABLE_LEAD_SALES_STATUSES = [
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ACTIVE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.CLIENT,
];

const STOPPABLE_CADENCE_LEAD_STATUS = [
  LEAD_STATUS_LOGIC_ROLE.MEETING,
  LEAD_STATUS_LOGIC_ROLE.CONTACT,
  LEAD_STATUS_LOGIC_ROLE.NURTURING,
  LEAD_STATUS_LOGIC_ROLE.DISCARDED,
];

const statusToReasonLR = {
  [LEAD_STATUS_LOGIC_ROLE.NURTURING]: LEAD_FIELDS_LOGIC_ROLE.NURTURING_REASONS,
  [LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING]: LEAD_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
  [LEAD_STATUS_LOGIC_ROLE.DISCARDED]: LEAD_FIELDS_LOGIC_ROLE.DISCARDED_REASONS,
  [LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED]: LEAD_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS,
  [LEAD_STATUS_LOGIC_ROLE.ON_HOLD]: LEAD_FIELDS_LOGIC_ROLE.ON_HOLD_REASONS,
  [LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD]: LEAD_FIELDS_LOGIC_ROLE.SALES_ON_HOLD_REASONS,
};

export const useLeadStatus = (): ChangeStatusModalProps => {
  const bobjectFields = useEntity('bobjectFields');
  const hasSalesEnabled = useFullSalesEnabled();
  const { fetchNurturingAndDiscardedReasons, getStatusReason } = useChangeStatusCommonFunctions();

  // LEAD INFO

  const { bobject } = useChangeStatus();
  const { patchLead, patchLeads } = useLeads('changeLeadStatus');
  const isBulkAction = Array.isArray(bobject);
  const sampleBobject = isBulkAction ? bobject[0] : bobject;
  const leadName =
    sampleBobject && getTextFromLogicRole(sampleBobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  const leadStage =
    sampleBobject &&
    getFieldByLogicRole(sampleBobject, LEAD_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole;
  const leadAssigned =
    sampleBobject && getFieldByLogicRole(sampleBobject, LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.value;
  const stageStatusFieldLogicRole =
    leadStage === LEAD_STAGE_LOGIC_ROLE.SALES
      ? LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS
      : LEAD_FIELDS_LOGIC_ROLE.STATUS;
  const leadStatus =
    sampleBobject && getFieldByLogicRole(sampleBobject, stageStatusFieldLogicRole)?.valueLogicRole;

  // SALES STAGE

  const isInSalesStage = hasSalesEnabled && leadStage === LEAD_STAGE_LOGIC_ROLE.SALES;

  // STATUS

  const statuses = usePicklistValues({
    picklistLogicRole: isInSalesStage
      ? LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS
      : LEAD_FIELDS_LOGIC_ROLE.STATUS,
  })
    .filter((fieldStatus: any) =>
      isInSalesStage
        ? AVAILABLE_LEAD_SALES_STATUSES.includes(fieldStatus.logicRole) && fieldStatus.enabled
        : AVAILABLE_LEAD_STATUSES.includes(fieldStatus.logicRole) && fieldStatus.enabled,
    )
    .sort((a: any, b: any) =>
      isInSalesStage
        ? AVAILABLE_LEAD_SALES_STATUSES.indexOf(a.logicRole) -
          AVAILABLE_LEAD_SALES_STATUSES.indexOf(b.logicRole)
        : AVAILABLE_LEAD_STATUSES.indexOf(a.logicRole) -
          AVAILABLE_LEAD_STATUSES.indexOf(b.logicRole),
    )
    .map((fieldStatus: any) => ({
      name: fieldStatus.value,
      logicRole: fieldStatus.logicRole,
      backgroundColor: fieldStatus.backgroundColor,
      outlineColor: fieldStatus.outlineColor,
      textColor: fieldStatus.textColor,
    }));

  // MODAL WARNINGS

  const isStatusNewOrBacklog = (status: string) => {
    return status === LEAD_STATUS_LOGIC_ROLE.BACKLOG || status === LEAD_STATUS_LOGIC_ROLE.NEW;
  };
  const isStoppedCadenceStatus = (status: string) =>
    STOPPABLE_CADENCE_LEAD_STATUS.includes(<LEAD_STATUS_LOGIC_ROLE>status);

  // ADDITIONAL FIELDS

  const getLeadStatusReason = (status: string): string => {
    if (!isBulkAction) {
      return getStatusReason(bobject, 'Lead', status);
    } else return undefined;
  };
  const getReasons = () => {
    return fetchNurturingAndDiscardedReasons('Lead', isInSalesStage);
  };
  const getReasonsByStatus = (reasons: { [key: string]: Reasons }, status: string): Reasons => {
    // @ts-ignore
    return reasons[statusToReasonLR[status]] ?? [];
  };
  const isNurturing = (status: string) => {
    return isInSalesStage
      ? status === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING
      : status === LEAD_STATUS_LOGIC_ROLE.NURTURING;
  };
  const isDiscarded = (status: string) => {
    return isInSalesStage
      ? status === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED
      : status === LEAD_STATUS_LOGIC_ROLE.DISCARDED;
  };
  const isOnHold = (status: string) => {
    return isInSalesStage
      ? status === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD
      : status === LEAD_STATUS_LOGIC_ROLE.ON_HOLD;
  };
  const isStatusWithReason = (status: string) => {
    return isNurturing(status) || isDiscarded(status) || isOnHold(status);
  };
  const isNurturingRequired = bobjectFields?.findByLogicRole(
    isInSalesStage
      ? LEAD_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS
      : LEAD_FIELDS_LOGIC_ROLE.NURTURING_REASONS,
  )?.required;
  const isDiscardedRequired = bobjectFields?.findByLogicRole(
    isInSalesStage
      ? LEAD_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS
      : LEAD_FIELDS_LOGIC_ROLE.DISCARDED_REASONS,
  )?.required;

  const isOnHoldRequired = bobjectFields?.findByLogicRole(
    isInSalesStage
      ? LEAD_FIELDS_LOGIC_ROLE.SALES_ON_HOLD_REASONS
      : LEAD_FIELDS_LOGIC_ROLE.ON_HOLD_REASONS,
  )?.required;
  const isRequiredAReasonByStatus = (status: string): boolean => {
    if (isNurturing(status)) {
      return isNurturingRequired;
    } else if (isDiscarded(status)) {
      return isDiscardedRequired;
    } else if (isOnHold(status)) {
      return isOnHoldRequired;
    } else return false;
  };
  const reasonPlaceholder = (status: string) => {
    if (isNurturing(status)) {
      return 'nurturing';
    } else if (isDiscarded(status)) {
      return 'discarding';
    } else if (isOnHold(status)) {
      return 'on hold';
    } else return '';
  };
  const isAssignedToRequired = bobjectFields?.findByLogicRole(LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO)
    ?.required;
  const shouldHaveAssigned = (status: string) => {
    // @ts-ignore
    return AVAILABLE_LEAD_STATUSES.indexOf(status) > 1 && !leadAssigned;
  };

  // SAVE

  const handleSave = (save: HandleSaveParams) => {
    if (save.isQueuedBulk && isBulkAction) {
      const allItems = isQueuedBulkQuery(save.isQueuedBulk);
      const fieldKey = LEAD_FIELDS_LOGIC_ROLE[isInSalesStage ? 'SALES_STATUS' : 'STATUS'];
      const contents = {
        [fieldKey]: save.selectedStatus,
        [LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: isStatusNewOrBacklog(save.selectedStatus)
          ? null
          : save?.selectedUser?.id,
      };
      if (save.selectedReason) {
        if (isNurturing(save.selectedStatus)) {
          contents[
            isInSalesStage
              ? LEAD_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS
              : LEAD_FIELDS_LOGIC_ROLE.NURTURING_REASONS
          ] = save.selectedReason?.value;
        } else if (isDiscarded(save.selectedStatus)) {
          contents[
            isInSalesStage
              ? LEAD_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS
              : LEAD_FIELDS_LOGIC_ROLE.DISCARDED_REASONS
          ] = save.selectedReason?.value;
        } else if (isOnHold(save.selectedStatus)) {
          contents[
            isInSalesStage
              ? LEAD_FIELDS_LOGIC_ROLE.SALES_ON_HOLD_REASONS
              : LEAD_FIELDS_LOGIC_ROLE.ON_HOLD_REASONS
          ] = save.selectedReason?.value;
        }
      }
      api
        .post(`/bobjects/bulkAction/createBulk${allItems ? 'ByQuery' : ''}`, {
          importName: `Update Status in ${
            isQueuedBulkQuery(save.isQueuedBulk) ? save.isQueuedBulk?.totalItems : bobject?.length
          } leads`,
          actionType: 'UPDATE',
          bobjectType: BobjectTypes.Lead,
          ...(isQueuedBulkQuery(save.isQueuedBulk)
            ? {
                query: { query: save.isQueuedBulk.query },
              }
            : {
                bobjectIds: bobject?.map(bobject => bobject?.id?.objectId),
              }),
          contents,
        })
        .then(() => {
          save.closeModal(true);
        });
    } else {
      const data: StrDict = isInSalesStage
        ? { [LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS]: save.selectedStatus }
        : { [LEAD_FIELDS_LOGIC_ROLE.STATUS]: save.selectedStatus };

      if (
        save.selectedStatus === LEAD_STATUS_LOGIC_ROLE.NEW ||
        save.selectedStatus === LEAD_STATUS_LOGIC_ROLE.BACKLOG
      ) {
        data[LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO] = null;
      }
      if (save.selectedUser && shouldHaveAssigned(save.selectedStatus)) {
        data[LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO] = save.selectedUser.id;
      }

      if (isBulkAction) {
        let leadsData = {};

        bobject.forEach(lead => {
          leadsData = { ...leadsData, [lead?.id.objectId]: data };
        });
        patchLeads(leadsData).then(() => {
          save.closeModal();
        });
      } else {
        mixpanel.track(MIXPANEL_EVENTS.CHANGED_STATUS_ON_LEAD_VIEW, {
          'Status changed to': save.selectedStatus,
        });
        if (save.selectedStatus === LEAD_STATUS_LOGIC_ROLE.NEW) {
          data[LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO] = null;
        }

        if (isNurturing(save.selectedStatus)) {
          data[
            isInSalesStage
              ? LEAD_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS
              : LEAD_FIELDS_LOGIC_ROLE.NURTURING_REASONS
          ] = save.selectedReason?.value;
        } else if (isDiscarded(save.selectedStatus)) {
          data[
            isInSalesStage
              ? LEAD_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS
              : LEAD_FIELDS_LOGIC_ROLE.DISCARDED_REASONS
          ] = save.selectedReason?.value;
        } else if (isOnHold(save.selectedStatus)) {
          data[
            isInSalesStage
              ? LEAD_FIELDS_LOGIC_ROLE.SALES_ON_HOLD_REASONS
              : LEAD_FIELDS_LOGIC_ROLE.ON_HOLD_REASONS
          ] = save.selectedReason?.value;
        }

        patchLead(bobject?.id.objectId, data).then(() => {
          save.closeModal();
        });
      }
    }
  };

  return {
    handleSave,
    layoutOptions: {
      bobjectType: 'lead',
      bobjectTypeBulk: 'leads',
      iconTitle: 'phone',
      iconBobjectName: 'person',
    },
    bobjectName: leadName,
    bobjectStatus: leadStatus,
    getStatusReason: getLeadStatusReason,
    isInSalesStage,
    statuses,
    shouldHaveAssigned,
    isAssignedToRequired,
    showStopCadenceWarning: isStoppedCadenceStatus,
    getReasons,
    getReasonsByStatus,
    isStatusWithReason,
    isRequiredAReasonByStatus,
    reasonPlaceholder,
  };
};
