import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { createToast } from '@bloobirds-it/flamingo-ui';
import { useActiveUserId, useBobject, useCadenceInfo, useDataModel } from '@bloobirds-it/hooks';
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
  STATUS_VALUES_LOGIC_ROLES,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import {
  api,
  getBobjectFromLogicRole,
  getFieldByLogicRole,
  getTextFromLogicRole,
  toSentenceCase,
} from '@bloobirds-it/utils';
import { useWizardContext } from '@bloobirds-it/wizard-modal-context';
import mixpanel from 'mixpanel-browser';

import {
  INACTIVE_HANDLING_OPTIONS,
  InactiveHandlingModalDataInterface,
} from '../types/inactiveHandling.constant';

enum INACTIVE_HANDLING_OPTIONS_KEYS {
  createNextStep = 'NEXT_STEP',
  startNewCadence = 'START_NEW_CADENCE',
  sendToNurturingAndSetCadence = 'SEND_TO_NURTURING_AND_SET_CADENCE',
  discardCompanyAndLeads = 'DISCARD',
  setBacklogAndUnassign = 'BACK_TO_BACKLOG',
  reassign = 'REASSIGN',
  keepOnHold = 'ON_HOLD',
}

function getMixpanelKey(type, bobjectType) {
  let info = `ACTION_SET_IN_INACTIVE_MODAL_${INACTIVE_HANDLING_OPTIONS_KEYS[type]}`;
  if (type === INACTIVE_HANDLING_OPTIONS.DISCARD) {
    info = `ACTION_SET_IN_INACTIVE_MODAL_${
      INACTIVE_HANDLING_OPTIONS_KEYS[type]
    }_${bobjectType.toUpperCase()}`;
  }
  return `ACTION_SET_IN_INACTIVE_MODAL_${info}`;
}

function getFieldValues(dataModel, logicRole) {
  const dataModelFields = dataModel?.getFieldsByBobjectType(getBobjectFromLogicRole(logicRole));
  return dataModelFields?.find(datamodelField => datamodelField.logicRole === logicRole)?.values;
}

export const useInactiveHandlingModalInfo = () => {
  const activeUserId = useActiveUserId();
  const dataModel = useDataModel();
  const discardedReasons = getFieldValues(dataModel, COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS);
  const closedLostReason = getFieldValues(
    dataModel,
    OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSED_LOST_REASON,
  );
  const onHoldReasons = getFieldValues(dataModel, COMPANY_FIELDS_LOGIC_ROLE.ON_HOLD_REASONS);
  const users = getFieldValues(dataModel, COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO)
    .filter(user => !user.name.includes('Deleted') && user.isEnabled)
    ?.sort((a, b) => (a.name < b.name ? -1 : 1));
  return { users, discardedReasons, closedLostReason, onHoldReasons, activeUserId };
};

export const useInactiveHandlingModalData = () => {
  const activeUserId = useActiveUserId();
  const dataModel = useDataModel();
  const accountId = dataModel?.getAccountId();
  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards.steps.inactiveHandling.toasts',
  });
  const { t: bobjectT } = useTranslation('translation', { keyPrefix: 'bobjectTypes' });

  const { bulkPatchBobjects } = useBobject(BobjectTypes.Lead, accountId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getWizardProperties } = useWizardContext();
  const wizardContext = getWizardProperties('NEXT_STEP');
  const bobject = wizardContext.bobject;
  const onSave = wizardContext.onSaveCallback;

  const [selectedOptionData, setSelectedOptionData] = useState<InactiveHandlingModalDataInterface>({
    type: INACTIVE_HANDLING_OPTIONS.NEXT_STEP,
    data: {},
  });
  // const { getPicklistValues } = useFieldsData(modalState?.bobject?.id?.typeName);
  // const cadence = getPicklistValues({logicRole: COMPANY_FIELDS_LOGIC_ROLE.CADENCE})
  const resetModalState = () => {
    setTimeout(() => {
      onSave?.();
    }, 500);
    // resetWizardProperties('NEXT_STEP');
  };
  const { type, data: actionData } = selectedOptionData || {};
  const bobjectIdFields = bobject?.id;
  const bobjectType = bobjectIdFields?.typeName as MainBobjectTypes;
  const { defaultCadence } = useCadenceInfo(bobject);
  const isInSalesStage =
    getTextFromLogicRole(
      bobject,
      FIELDS_LOGIC_ROLE[bobjectType as Exclude<MainBobjectTypes, 'Opportunity'>]?.STAGE,
    ) === 'Sales' || bobjectType === BobjectTypes.Opportunity;
  const bobjectCadence = getFieldByLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType]?.CADENCE)
    ?.value;

  function generateRequestInfo(): { url: string; body: any; toastMessage: string } {
    const cadenceId = actionData?.cadenceId || bobjectCadence || defaultCadence?.id;
    const generateReasonedStatusesBody = (selectedStatus: 'ON_HOLD' | 'DISCARDED') => {
      const isDiscarded = selectedStatus === 'DISCARDED';
      switch (bobjectType as MainBobjectTypes) {
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
              [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: actionData?.assignedTo || activeUserId,
              [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: actionData?.date || new Date(),
              [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: TASK_TYPE.NEXT_STEP,
              [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
            },
            params: {
              duplicateValidation: true,
            },
          },
          toastMessage: t('nextStep'),
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
              ? t('sendToNurturing', { bobjectType: bobjectT(bobjectType.toLowerCase()) })
              : t('newCadence'),
        };
      case INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG:
        return {
          url: `/bobjects/${bobjectIdFields.value}/raw`,
          body: {
            [FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO]: null,
            [FIELDS_LOGIC_ROLE[bobjectType].STATUS]:
              STATUS_VALUES_LOGIC_ROLES[bobjectType as 'Company' | 'Lead'].BACKLOG,
          },
          toastMessage: t('backToBacklog', {
            bobjectType: toSentenceCase(bobjectT(bobjectType.toLowerCase())),
          }),
        };
      case INACTIVE_HANDLING_OPTIONS.REASSIGN:
        return {
          url: `/bobjects/${bobjectIdFields.value}/raw`,
          body: {
            [FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO]: actionData?.assignedTo,
          },
          toastMessage: t('reassign', {
            bobjectType: toSentenceCase(bobjectT(bobjectType.toLowerCase())),
          }),
        };
      case INACTIVE_HANDLING_OPTIONS.DISCARD:
        return {
          url: `/bobjects/${bobjectIdFields.value}/raw`,
          body: discardBody,
          toastMessage:
            bobjectType === 'Company'
              ? t('discardCompany')
              : t('discard', { bobjectType: bobjectT(bobjectType.toLowerCase()) }),
        };
      case INACTIVE_HANDLING_OPTIONS.ON_HOLD:
        return {
          url: `/bobjects/${bobjectIdFields.value}/raw`,
          body: onHoldBody,
          toastMessage:
            bobjectType === 'Company'
              ? t('onHoldCompany')
              : t('onHold', { bobjectType: bobjectT(bobjectType.toLowerCase()) }),
        };
      default:
        throw new Error('Invalid action type');
    }
  }

  function handleSubmit() {
    const { url, body, toastMessage } = generateRequestInfo();
    const { type } = selectedOptionData;
    setIsSubmitting(true);
    function onComplete() {
      const mixpanelKey = getMixpanelKey(type, bobjectType);
      mixpanel.track(mixpanelKey);
      createToast({
        type: 'success',
        message: toastMessage,
      });
      resetModalState();
      setIsSubmitting(false);
    }

    onSave?.();

    switch (type) {
      case INACTIVE_HANDLING_OPTIONS.NEW_CADENCE:
      case INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING:
        // eslint-disable-next-line no-case-declarations
        const hasPreviousStep =
          INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING === selectedOptionData?.type ||
          selectedOptionData?.data?.previousAssign === 'assignToMe';

        // eslint-disable-next-line no-case-declarations
        const patchOptions = {
          ...(INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING === selectedOptionData?.type
            ? {
                [FIELDS_LOGIC_ROLE[bobjectType as Exclude<MainBobjectTypes, 'Opportunity'>][
                  isInSalesStage ? 'SALES_STATUS' : 'STATUS'
                ]]: isInSalesStage
                  ? SALES_STATUS_VALUES_LOGIC_ROLES[
                      bobjectType as Exclude<MainBobjectTypes, 'Opportunity'>
                    ].NURTURING
                  : (bobjectType as MainBobjectTypes) === 'Opportunity'
                  ? selectedOptionData?.data?.nurturingStage
                  : STATUS_VALUES_LOGIC_ROLES[
                      bobjectType as Exclude<MainBobjectTypes, 'Opportunity'>
                    ].NURTURING,
              }
            : {}),
          ...(selectedOptionData?.data?.previousAssign === 'assignToMe'
            ? {
                [bobjectType?.toUpperCase() + '__ASSIGNED_TO']: activeUserId,
              }
            : {}),
        };

        // eslint-disable-next-line no-case-declarations
        const patchPromise = hasPreviousStep
          ? api.patch(`/bobjects/${bobjectIdFields.value}/raw`, patchOptions)
          : Promise.resolve();

        patchPromise.then(() => api.put(url, body).then(onComplete));
        break;
      case INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG:
      case INACTIVE_HANDLING_OPTIONS.REASSIGN:
        api
          .patch(url, body)
          .then(onComplete)
          .catch(() => setIsSubmitting(false));
        break;
      case INACTIVE_HANDLING_OPTIONS.DISCARD:
        api.patch(url, body).then(() => {
          if (bobjectType === 'Company') {
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
                return bulkPatchBobjects(leadsData);
              })
              .then(onComplete)
              .catch(() => setIsSubmitting(false));
          } else {
            onComplete();
          }
        });
        break;
      case INACTIVE_HANDLING_OPTIONS.ON_HOLD:
        api.patch(url, body).then(() => {
          if (bobjectType === 'Company') {
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
                //TODO this should be optional
                let leadsData = {};
                contents.forEach((element: Bobject) => {
                  leadsData = { ...leadsData, [element?.id?.objectId]: data };
                });
                return bulkPatchBobjects(leadsData);
              })
              .then(onComplete)
              .catch(() => setIsSubmitting(false));
          } else {
            onComplete();
          }
        });
        break;
      case INACTIVE_HANDLING_OPTIONS.NEXT_STEP:
        api
          .post(url, body)
          .then(onComplete)
          .catch(() => setIsSubmitting(false));
        break;
      default:
        throw new Error('Action not supported');
    }
  }

  const modalTextByBobjectType = useMemo(() => {
    switch (bobjectType) {
      case 'Company':
        return t('companyAndLeads');
      case 'Opportunity':
      case 'Lead':
        return `${bobjectType.toLowerCase()}`;
      default:
        return 'Invalid bobjectType';
    }
  }, [bobjectType]);

  function getIsMissingInfo({
    selectedOptionData: { type, data },
    hasNeededNurturingInfo,
    hasOnHoldReasons,
  }: {
    selectedOptionData: InactiveHandlingModalDataInterface;
    hasNeededNurturingInfo: boolean;
    hasOnHoldReasons: boolean;
  }) {
    switch (type) {
      case INACTIVE_HANDLING_OPTIONS.DISCARD:
        return !data?.discardedValue;
      case INACTIVE_HANDLING_OPTIONS.ON_HOLD:
        return isInSalesStage ? false : hasOnHoldReasons ? !data?.onHoldedValue : false;
      case INACTIVE_HANDLING_OPTIONS.NEXT_STEP:
        return !data?.title;
      case INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING:
        return !hasNeededNurturingInfo;
      case INACTIVE_HANDLING_OPTIONS.REASSIGN:
        return !data?.assignedTo;
      default:
        return false;
    }
  }

  return {
    handleSubmit,
    getIsMissingInfo,
    isInSalesStage,
    cadenceInfo: { bobjectCadence, defaultCadence: '' },
    modalTextByBobjectType,
    isSubmitting,
    activeUserId,
    selectedOptionData,
    setSelectedOptionData,
  };
};
