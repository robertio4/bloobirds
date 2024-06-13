import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
  BobjectTypes,
  StrDict,
} from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';
import { useParams } from 'react-router';
import {
  ChangeStatusModalProps,
  HandleSaveParams,
  isQueuedBulkQuery,
  Reasons,
  Status,
} from '../changeStatusModal';
import useChangeStatus from '../useChangeStatus';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';
import { getFieldByLogicRole, getTextFromLogicRole } from '../../../utils/bobjects.utils';
import { useCompany, useEntity, usePicklistValues } from '../../../hooks';
import { MIXPANEL_EVENTS } from '../../../constants/mixpanel';
import { useChangeStatusCommonFunctions } from './useChangeStatusCommonFunctions';
import { api } from '../../../utils/api';

const AVAILABLE_COMPANY_STATUSES = [
  COMPANY_STATUS_LOGIC_ROLE.NEW,
  COMPANY_STATUS_LOGIC_ROLE.BACKLOG,
  COMPANY_STATUS_LOGIC_ROLE.DELIVERED,
  COMPANY_STATUS_LOGIC_ROLE.ON_PROSPECTION,
  COMPANY_STATUS_LOGIC_ROLE.CONTACTED,
  COMPANY_STATUS_LOGIC_ROLE.ENGAGED,
  COMPANY_STATUS_LOGIC_ROLE.MEETING,
  COMPANY_STATUS_LOGIC_ROLE.NURTURING,
  COMPANY_STATUS_LOGIC_ROLE.ON_HOLD,
  COMPANY_STATUS_LOGIC_ROLE.DISCARDED,
  COMPANY_STATUS_LOGIC_ROLE.ACCOUNT,
  COMPANY_STATUS_LOGIC_ROLE.CLIENT,
];

const AVAILABLE_COMPANY_SALES_STATUSES = [
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ACTIVE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.CLIENT,
];

const UNAVAILABLE_COMPANY_STATUSES = [
  COMPANY_STATUS_LOGIC_ROLE.READY_TO_PROSPECT,
  COMPANY_STATUS_LOGIC_ROLE.FINDING_LEADS,
];

const STOPPABLE_CADENCE_STATUSES = [
  COMPANY_STATUS_LOGIC_ROLE.MEETING,
  COMPANY_STATUS_LOGIC_ROLE.ACCOUNT,
  COMPANY_STATUS_LOGIC_ROLE.NURTURING,
  COMPANY_STATUS_LOGIC_ROLE.DISCARDED,
];

const statusToReasonLR = {
  [COMPANY_STATUS_LOGIC_ROLE.NURTURING]: COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS,
  [COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING]:
    COMPANY_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
  [COMPANY_STATUS_LOGIC_ROLE.DISCARDED]: COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS,
  [COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED]:
    COMPANY_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS,
  [COMPANY_STATUS_LOGIC_ROLE.ON_HOLD]: COMPANY_FIELDS_LOGIC_ROLE.ON_HOLD_REASONS,
  [COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD]: COMPANY_FIELDS_LOGIC_ROLE.SALES_ON_HOLD_REASONS,
};

export const useCompanyStatus = (): ChangeStatusModalProps => {
  const { bobject: company } = useChangeStatus();
  const hasSalesEnabled = useFullSalesEnabled();
  const bobjectFields = useEntity('bobjectFields');
  const { fetchNurturingAndDiscardedReasons, getStatusReason } = useChangeStatusCommonFunctions();
  const { slug }: any = useParams();
  const { updateCompany, updateCompanies } = useCompany('change-status');

  // COMPANY INFO

  const isBulkAction = Array.isArray(company);
  const sampleBobject = isBulkAction ? company[0] : company;
  const companyName =
    sampleBobject && getTextFromLogicRole(sampleBobject, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const companyAssigned =
    sampleBobject &&
    getFieldByLogicRole(sampleBobject, COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.value;
  const companyStage =
    sampleBobject &&
    getFieldByLogicRole(sampleBobject, COMPANY_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole;
  const stageStatusFieldLogicRole =
    companyStage === COMPANY_STAGE_LOGIC_ROLE.SALES
      ? COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS
      : COMPANY_FIELDS_LOGIC_ROLE.STATUS;
  const companyStatus =
    sampleBobject && getFieldByLogicRole(sampleBobject, stageStatusFieldLogicRole)?.valueLogicRole;

  // SALES STAGE

  const isInSalesStage = hasSalesEnabled && companyStage === COMPANY_STAGE_LOGIC_ROLE.SALES;

  // STATUS

  const statuses: Status[] = usePicklistValues({
    picklistLogicRole: isInSalesStage
      ? COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS
      : COMPANY_FIELDS_LOGIC_ROLE.STATUS,
  })
    .filter((fieldStatus: any) =>
      isInSalesStage
        ? true
        : !UNAVAILABLE_COMPANY_STATUSES.includes(fieldStatus.logicRole) && fieldStatus.enabled,
    )
    .sort((a: any, b: any) =>
      isInSalesStage
        ? AVAILABLE_COMPANY_SALES_STATUSES.indexOf(a.logicRole) -
          AVAILABLE_COMPANY_SALES_STATUSES.indexOf(b.logicRole)
        : AVAILABLE_COMPANY_STATUSES.indexOf(a.logicRole) -
          AVAILABLE_COMPANY_STATUSES.indexOf(b.logicRole),
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
    return status === COMPANY_STATUS_LOGIC_ROLE.BACKLOG || status === COMPANY_STATUS_LOGIC_ROLE.NEW;
  };
  const isNewOrBacklog = (status: string) => {
    return (
      isStatusNewOrBacklog(status) &&
      companyStatus !== COMPANY_STATUS_LOGIC_ROLE.BACKLOG &&
      companyStatus !== COMPANY_STATUS_LOGIC_ROLE.NEW
    );
  };
  const isStoppedCadenceStatus = (status: string) => {
    return STOPPABLE_CADENCE_STATUSES.includes(<COMPANY_STATUS_LOGIC_ROLE>status);
  };

  // ADDITIONAL FIELDS (REASONS & ASSIGNED TO)

  const getCompanyStatusReason = (status: string): string => {
    if (!isBulkAction) {
      return getStatusReason(company, 'Company', status);
    } else return undefined;
  };
  const getReasons = () => {
    return fetchNurturingAndDiscardedReasons('Company', isInSalesStage);
  };
  const getReasonsByStatus = (reasons: { [key: string]: Reasons }, status: string): Reasons => {
    // @ts-ignore
    return reasons[statusToReasonLR[status]] ?? [];
  };
  const isNurturing = (status: string) => {
    return isInSalesStage
      ? status === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING
      : status === COMPANY_STATUS_LOGIC_ROLE.NURTURING;
  };
  const isDiscarded = (status: string) => {
    return isInSalesStage
      ? status === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED
      : status === COMPANY_STATUS_LOGIC_ROLE.DISCARDED;
  };
  const isOnHold = (status: string) => {
    return isInSalesStage
      ? status === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD
      : status === COMPANY_STATUS_LOGIC_ROLE.ON_HOLD;
  };
  const isStatusWithReason = (status: string) => {
    return isNurturing(status) || isDiscarded(status) || isOnHold(status);
  };
  const isNurturingRequired = bobjectFields?.findByLogicRole(
    isInSalesStage
      ? COMPANY_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS
      : COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS,
  )?.required;
  const isDiscardedRequired = bobjectFields?.findByLogicRole(
    isInSalesStage
      ? COMPANY_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS
      : COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS,
  )?.required;
  const isOnHoldRequired = bobjectFields?.findByLogicRole(
    isInSalesStage
      ? COMPANY_FIELDS_LOGIC_ROLE.SALES_ON_HOLD_REASONS
      : COMPANY_FIELDS_LOGIC_ROLE.ON_HOLD_REASONS,
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
  const isAssignedToRequired = bobjectFields?.findByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO)
    ?.required;
  const shouldHaveAssigned = (status: string) => {
    // @ts-ignore
    return AVAILABLE_COMPANY_STATUSES.indexOf(status) > 1 && !companyAssigned;
  };

  // SAVE

  const handleSave = (save: HandleSaveParams) => {
    if (slug) {
      mixpanel.track(`${MIXPANEL_EVENTS.CHANGED_STATUS_ON_ + slug}_TAB`, {
        'Status changed to': save.selectedStatus,
      });
    } else {
      mixpanel.track(MIXPANEL_EVENTS.CHANGED_STATUS_ON_COMPANY_VIEW, {
        'Status changed to': save.selectedStatus,
      });
    }

    if (save.isQueuedBulk && isBulkAction) {
      const allItems = isQueuedBulkQuery(save.isQueuedBulk);
      const fieldKey = COMPANY_FIELDS_LOGIC_ROLE[isInSalesStage ? 'SALES_STATUS' : 'STATUS'];
      const contents = {
        [fieldKey]: save.selectedStatus,
        [COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: isStatusNewOrBacklog(save.selectedStatus)
          ? null
          : save?.selectedUser?.id,
      };
      if (save.selectedReason) {
        if (isNurturing(save.selectedStatus)) {
          contents[
            isInSalesStage
              ? COMPANY_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS
              : COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS
          ] = save.selectedReason?.value;
        } else if (isDiscarded(save.selectedStatus)) {
          contents[
            isInSalesStage
              ? COMPANY_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS
              : COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS
          ] = save.selectedReason?.value;
        } else if (isOnHold(save.selectedStatus)) {
          contents[
            isInSalesStage
              ? COMPANY_FIELDS_LOGIC_ROLE.SALES_ON_HOLD_REASONS
              : COMPANY_FIELDS_LOGIC_ROLE.ON_HOLD_REASONS
          ] = save.selectedReason?.value;
        }
      }
      api
        .post(`/bobjects/bulkAction/createBulk${allItems ? 'ByQuery' : ''}`, {
          importName: `Update Status in ${
            isQueuedBulkQuery(save.isQueuedBulk) ? save.isQueuedBulk?.totalItems : company?.length
          } companies`,
          actionType: 'UPDATE',
          bobjectType: BobjectTypes.Company,
          ...(isQueuedBulkQuery(save.isQueuedBulk)
            ? {
                query: { query: save.isQueuedBulk.query },
              }
            : {
                bobjectIds: company?.map(bobject => bobject?.id?.objectId),
              }),
          contents,
        })
        .then(() => {
          save.closeModal(true);
        });
    } else {
      // Save status
      const data: StrDict = isInSalesStage
        ? { [COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS]: save.selectedStatus }
        : { [COMPANY_FIELDS_LOGIC_ROLE.STATUS]: save.selectedStatus };
      // TODO extract this
      //  Save reason
      if (save.selectedReason) {
        if (isNurturing(save.selectedStatus)) {
          data[
            isInSalesStage
              ? COMPANY_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS
              : COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS
          ] = save.selectedReason?.value;
        } else if (isDiscarded(save.selectedStatus)) {
          data[
            isInSalesStage
              ? COMPANY_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS
              : COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS
          ] = save.selectedReason?.value;
        } else if (isOnHold(save.selectedStatus)) {
          data[
            isInSalesStage
              ? COMPANY_FIELDS_LOGIC_ROLE.SALES_ON_HOLD_REASONS
              : COMPANY_FIELDS_LOGIC_ROLE.ON_HOLD_REASONS
          ] = save.selectedReason?.value;
        }
      }
      // Save assigned to
      if (
        save.selectedStatus === COMPANY_STATUS_LOGIC_ROLE.NEW ||
        save.selectedStatus === COMPANY_STATUS_LOGIC_ROLE.BACKLOG
      ) {
        data[COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO] = null;
      }
      if (save.selectedUser && shouldHaveAssigned(save.selectedStatus)) {
        data[COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO] = save.selectedUser.id;
      }
      // Save
      if (isBulkAction) {
        let companiesData = {};
        company.forEach(company => {
          companiesData = { ...companiesData, [company?.id.objectId]: data };
        });
        updateCompanies(companiesData).then(() => {
          save.closeModal();
        });
      } else {
        updateCompany(company?.id.objectId, data).then(() => {
          save.closeModal();
        });
      }
    }
  };
  return {
    handleSave,
    layoutOptions: {
      bobjectType: 'company',
      bobjectTypeBulk: 'companies',
      iconTitle: 'chat',
      iconBobjectName: 'company',
    },
    bobjectName: companyName,
    bobjectStatus: companyStatus,
    getStatusReason: getCompanyStatusReason,
    shouldHaveAssigned,
    isAssignedToRequired,
    isInSalesStage,
    statuses,
    showUnassignedWarning: isNewOrBacklog,
    showStopCadenceWarning: isStoppedCadenceStatus,
    getReasons,
    getReasonsByStatus,
    isStatusWithReason,
    isRequiredAReasonByStatus,
    reasonPlaceholder,
  };
};
