import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { createToast } from '@bloobirds-it/flamingo-ui';
import { useMemo } from 'react';
import { useUserSettings } from '../userPermissions/hooks';
import { useEntity, useLeads } from '../../hooks';
import { INACTIVE_HANDLING_OPTIONS } from './inactiveHandling.constant';
import { useCadenceTable } from '../../hooks/useCadenceTable';
import {
  Bobject,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
  FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
  MainBobjectTypes,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_STATUS_LOGIC_ROLE,
  SALES_STATUS_VALUES_LOGIC_ROLES,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import { api, getFieldByLogicRole, getTextFromLogicRole } from '@bloobirds-it/utils';
import { STATUS_VALUES_LOGIC_ROLES } from '@bloobirds-it/types';

const modalStateAtom = atom<{ visible: boolean; bobject?: Bobject }>({
  key: 'inactiveHandlingModalVisibility',
  default: { visible: false, bobject: undefined },
});

export const useInactiveHandlingModal = (data?: { type: INACTIVE_HANDLING_OPTIONS; data: any }) => {
  const { patchLeads } = useLeads();
  const settings = useUserSettings();
  const accountId = settings.account.id;
  const [modalState, setModalState] = useRecoilState(modalStateAtom);
  const { defaultCadence } = useCadenceTable(modalState?.bobject);
  const resetModalState = useResetRecoilState(modalStateAtom);
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const { type, data: actionData } = data || {};
  const bobject = modalState?.bobject;
  const bobjectIdFields = bobject?.id;
  const bobjectType = bobjectIdFields?.typeName as MainBobjectTypes;
  const isInSalesStage =
    getTextFromLogicRole(
      bobject,
      FIELDS_LOGIC_ROLE[bobjectType as Exclude<MainBobjectTypes, 'Opportunity'>]?.STAGE,
    ) === 'Sales';
  const bobjectCadence = getFieldByLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType]?.CADENCE)
    ?.value;

  function generateRequestInfo(): { url: string; body: any; toastMessage: string } {
    const cadenceId = actionData?.cadenceId || bobjectCadence || defaultCadence?.id;
    const nextStepId = bobjectPicklistFieldValues?.findByLogicRole(TASK_TYPE.NEXT_STEP)?.id;
    const backlogStatusId = bobjectPicklistFieldValues?.findByLogicRole(
      STATUS_VALUES_LOGIC_ROLES[bobjectType as Exclude<MainBobjectTypes, 'Opportunity'>].BACKLOG,
    )?.id;
    const toDoId = bobjectPicklistFieldValues?.findByLogicRole(TASK_STATUS_VALUE_LOGIC_ROLE.TODO)
      ?.id;
    const bobjectTypeLR = FIELDS_LOGIC_ROLE[bobjectType];

    const generateReasonedStatusesBody = (selectedStatus: 'ON_HOLD' | 'DISCARDED') => {
      const isDiscarded = selectedStatus === 'DISCARDED';
      switch (bobjectType) {
        case 'Company':
          return isInSalesStage
            ? {
                [COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS]:
                  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE[selectedStatus],
                [COMPANY_FIELDS_LOGIC_ROLE[
                  isDiscarded ? 'SALES_DISCARDED_REASONS' : 'SALES_ON_HOLD_REASONS'
                ]]: isDiscarded ? actionData?.discardedValue : actionData?.onHoldedValue,
              }
            : {
                [COMPANY_FIELDS_LOGIC_ROLE.STATUS]: COMPANY_STATUS_LOGIC_ROLE[selectedStatus],
                [COMPANY_FIELDS_LOGIC_ROLE[
                  isDiscarded ? 'DISCARDED_REASONS' : 'ON_HOLD_REASONS'
                ]]: isDiscarded ? actionData?.discardedValue : actionData?.onHoldedValue,
              };
        case 'Lead':
          return isInSalesStage
            ? {
                [LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS]:
                  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE[selectedStatus],
                [LEAD_FIELDS_LOGIC_ROLE[
                  isDiscarded ? 'SALES_DISCARDED_REASONS' : 'SALES_ON_HOLD_REASONS'
                ]]: isDiscarded ? actionData?.discardedValue : actionData?.onHoldedValue,
              }
            : {
                [LEAD_FIELDS_LOGIC_ROLE.STATUS]: LEAD_STATUS_LOGIC_ROLE[selectedStatus],
                [LEAD_FIELDS_LOGIC_ROLE[
                  isDiscarded ? 'DISCARDED_REASONS' : 'ON_HOLD_REASONS'
                ]]: isDiscarded ? actionData?.discardedValue : actionData?.onHoldedValue,
              };
        case 'Opportunity':
          return {
            [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]: OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST,
            [OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSED_LOST_REASON]: actionData?.discardedValue,
          };
        default:
          throw new Error('Invalid bobject type passed to discarded req body generator');
      }
    };
    const discardBody = generateReasonedStatusesBody('DISCARDED');
    const onHoldBody = generateReasonedStatusesBody('ON_HOLD');

    switch (type) {
      case INACTIVE_HANDLING_OPTIONS.NEXT_STEP:
        return {
          url: `/bobjects/${accountId}/Task`,
          body: {
            contents: {
              [TASK_FIELDS_LOGIC_ROLE[bobjectType.toUpperCase() as Uppercase<MainBobjectTypes>]]:
                bobjectIdFields.value,
              [TASK_FIELDS_LOGIC_ROLE.TITLE]: actionData?.title,
              [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: actionData?.assignedTo || settings?.user?.id,
              [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: actionData?.date || new Date(),
              [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: nextStepId,
              [TASK_FIELDS_LOGIC_ROLE.STATUS]: toDoId,
            },
            params: {
              duplicateValidation: true,
            },
          },
          toastMessage: 'Task created!',
        };
      case INACTIVE_HANDLING_OPTIONS.NEW_CADENCE:
      case INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING:
        return {
          url: `/messaging/cadences/${cadenceId}/start`,
          body: {
            bobjectId: bobjectIdFields.objectId,
            bobjectType,
            startCadence: actionData?.startCadenceDate || new Date(),
          },
          toastMessage:
            type === INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING
              ? `Nurturing cadence scheduled for the ${bobjectType}`
              : 'Cadence has been scheduled',
        };
      case INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG:
        return {
          url: `/bobjects/${bobjectIdFields.value}/raw`,
          body: {
            [FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO]: null,
            [bobjectTypeLR.STATUS]: backlogStatusId,
          },
          toastMessage: `${bobjectType} sent to backlog and unassigned`,
        };
      case INACTIVE_HANDLING_OPTIONS.REASSIGN:
        return {
          url: `/bobjects/${bobjectIdFields.value}/raw`,
          body: {
            [FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO]: actionData?.assignedTo,
          },
          toastMessage: `${bobjectType} has been reassigned to the selected user`,
        };
      case INACTIVE_HANDLING_OPTIONS.DISCARD:
        return {
          url: `/bobjects/${bobjectIdFields.value}/raw`,
          body: discardBody,
          toastMessage:
            bobjectType === 'Company'
              ? 'Company and leads have been discarded'
              : `The ${bobjectType} has been discarded`,
        };
      case INACTIVE_HANDLING_OPTIONS.ON_HOLD:
        return {
          url: `/bobjects/${bobjectIdFields.value}/raw`,
          body: onHoldBody,
          toastMessage:
            bobjectType === 'Company'
              ? 'Company and leads status have changed to status On Hold'
              : `The ${bobjectType} status has changed to status On Hold`,
        };
      default:
        throw new Error('Invalid action type');
    }
  }

  function handleSubmit() {
    const { url, body, toastMessage } = generateRequestInfo();
    const { type } = data;
    switch (type) {
      case INACTIVE_HANDLING_OPTIONS.NEW_CADENCE:
      case INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING:
        if (INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING === data?.type) {
          api.patch(`/bobjects/${bobjectIdFields.value}/raw`, {
            [FIELDS_LOGIC_ROLE[bobjectType as Exclude<MainBobjectTypes, 'Opportunity'>][
              isInSalesStage ? 'SALES_STATUS' : 'STATUS'
            ]]: isInSalesStage
              ? SALES_STATUS_VALUES_LOGIC_ROLES[
                  bobjectType as Exclude<MainBobjectTypes, 'Opportunity'>
                ].NURTURING
              : bobjectType === 'Opportunity'
              ? data?.data?.nurturingStage
              : STATUS_VALUES_LOGIC_ROLES[bobjectType as Exclude<MainBobjectTypes, 'Opportunity'>]
                  .NURTURING,
          });
        }
        api.put(url, body).then(() => {
          createToast({
            type: 'success',
            message: toastMessage,
          });
          resetModalState();
        });
        break;
      case INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG:
      case INACTIVE_HANDLING_OPTIONS.REASSIGN:
        api.patch(url, body).then(() => {
          createToast({
            type: 'success',
            message: toastMessage,
          });
          resetModalState();
        });
        break;
      case INACTIVE_HANDLING_OPTIONS.DISCARD:
        api.patch(url, body).then(() => {
          if (bobjectType === BobjectTypes.Company) {
            //get leads related to the company
            api
              .post(`/bobjects/${accountId}/Lead/search`, {
                query: { [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: [bobjectIdFields?.value] },
                formFields: true,
                pageSize: 50,
              })
              .then(({ data: { contents } }) => {
                const data = {
                  [LEAD_FIELDS_LOGIC_ROLE.STATUS]: LEAD_STATUS_LOGIC_ROLE.DISCARDED,
                };
                let leadsData = {};
                contents.forEach((element: Bobject) => {
                  leadsData = { ...leadsData, [element?.id?.objectId]: data };
                });
                return patchLeads(leadsData);
              })
              .then(() => {
                createToast({
                  type: 'success',
                  message: toastMessage,
                });
                resetModalState();
              });
          } else {
            createToast({
              type: 'success',
              message: toastMessage,
            });
            resetModalState();
          }
        });
        break;
      case INACTIVE_HANDLING_OPTIONS.ON_HOLD:
        api.patch(url, body).then(() => {
          if (bobjectType === BobjectTypes.Company) {
            //get leads related to the company
            api
              .post(`/bobjects/${accountId}/Lead/search`, {
                query: { [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: [bobjectIdFields?.value] },
                formFields: true,
                pageSize: 50,
              })
              .then(({ data: { contents } }) => {
                const data = {
                  [LEAD_FIELDS_LOGIC_ROLE.STATUS]: LEAD_STATUS_LOGIC_ROLE.ON_HOLD,
                };
                let leadsData = {};
                contents.forEach((element: Bobject) => {
                  leadsData = { ...leadsData, [element?.id?.objectId]: data };
                });
                return patchLeads(leadsData);
              })
              .then(() => {
                createToast({
                  type: 'success',
                  message: toastMessage,
                });
                resetModalState();
              });
          } else {
            createToast({
              type: 'success',
              message: toastMessage,
            });
            resetModalState();
          }
        });
        break;
      case INACTIVE_HANDLING_OPTIONS.NEXT_STEP:
        api.post(url, body).then(() => {
          createToast({
            type: 'success',
            message: toastMessage,
          });
          resetModalState();
        });
        break;
      default:
        throw new Error('Action not supported');
    }
  }

  const modalTextByBobjectType = useMemo(() => {
    switch (bobjectType) {
      case 'Company':
        return 'company and its leads';
      case 'Opportunity':
      case 'Lead':
        return `${bobjectType.toLowerCase()}`;
      default:
        return 'Invalid bobjectType';
    }
  }, [bobjectType]);

  return {
    modalState,
    setModalState,
    handleSubmit,
    isInSalesStage,
    cadenceInfo: { bobjectCadence, defaultCadence },
    modalTextByBobjectType,
  };
};
