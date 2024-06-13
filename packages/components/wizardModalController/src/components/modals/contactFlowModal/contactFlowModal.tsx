import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CadenceControlModal } from '@bloobirds-it/cadence';
import { useBuildCRMUpdates } from '@bloobirds-it/copilot';
import { Modal, ModalCloseIcon, ModalHeader, ModalTitle } from '@bloobirds-it/flamingo-ui';
import {
  useCopilotEnabled,
  useFullSalesEnabled,
  useIsNoStatusPlanAccount,
  useMinimizableModals,
  useUserSettings,
} from '@bloobirds-it/hooks';
import {
  BobjectTypes,
  FIELDS_LOGIC_ROLE,
  ACTIVITY_MODE,
  COMPANY_FIELDS_LOGIC_ROLE,
  ExtensionBobject,
  LEAD_FIELDS_LOGIC_ROLE,
  MainBobjectTypes,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
  DIRECTION_VALUES_LOGIC_ROLE,
  MinimizableModalType,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_STATUS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  companyUrl,
  getValueFromLogicRole,
  getFieldByLogicRole,
  leadUrl,
  api,
  getTextFromLogicRole,
  injectReferencesGetProcess,
} from '@bloobirds-it/utils';
import {
  EVENTS,
  STEPS,
  useWizardContext,
  ButtonsStepConfig,
  CustomObjectModalConfig,
  STEPS_PROPS,
  StepsKey,
} from '@bloobirds-it/wizard-modal-context';
import { useMachine } from '@xstate/react';

import { useActivityRelatedInfo } from '../../../hooks/useActivityRelatedInfo';
import {
  searchOppByLeadOrCompany,
  searchReferenceLeadBobject,
} from '../../../utils/customWizards.utils';
import { WizardStepFactory } from '../../wizardStepFactory';
import styles from './contactFlow.module.css';
import { modalStepsMachine, MODAL_STEPS } from './contactFlowModal.machine';

const visibilityHandler = Component => ({ ...props }) => {
  const { getWizardProperties } = useWizardContext();
  const { wizardKey } = props;
  const wizardContext = getWizardProperties(wizardKey);
  return wizardContext && wizardContext.visible && <Component wizardKey={wizardKey} {...props} />;
};

const invalidOppStatuses = {
  [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]: [
    OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST,
    OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_WON,
  ],
  SALESFORCE_OPPPORTUNITY__STAGE: ['Closed Lost', 'Closed Won'],
} as const;

const ContactFlow = ({ ...props }) => {
  const { wizardKey } = props;
  const userId = useUserSettings()?.user?.id;

  const {
    getWizardProperties,
    getMachine,
    hasCustomWizardsEnabled,
    getMetaInfoStep,
    accountId,
    addMetaToWizardProperties,
  } = useWizardContext();
  const {
    activityLead,
    activityCompany,
    activityOpportunity,
    referenceBobjectIsSales,
  } = useActivityRelatedInfo(wizardKey);
  const { openMinimizableModal } = useMinimizableModals();

  const {
    handleClose,
    referenceBobject,
    bobject: activity,
    openAtStep: contactFlowStep,
  } = getWizardProperties(wizardKey);
  const [isCadenceControlOpen, setIsCadenceControlOpen] = useState<boolean>(true);
  const [opportunityChecked, setOpportunityChecked] = useState<boolean>(false);
  const [referenceObjectChecked, setReferenceObjectChecked] = useState<boolean>(false);
  const [updatedObjects, setUpdatedObjects] = useState({
    activityUpdated: activity,
    referenceBobjectUpdated: referenceBobject,
  });
  const [{ value: modalStep }, modalControlSend] = useMachine(modalStepsMachine, {
    context: {
      handleClose: handleClose,
    },
  });
  const hasSalesFeatureEnabled = useFullSalesEnabled(accountId);
  const hasNoStatusPlanEnabled = useIsNoStatusPlanAccount();
  const { t } = useTranslation('translation', { keyPrefix: 'wizards' });
  const markAsReported = () => {
    if (hasCustomWizardsEnabled && wizardConfig?.markReportedAtStart === false) {
      api
        .patch(`/bobjects/${accountId}/${activity?.id?.typeName}/${activity?.id?.objectId}/raw`, {
          [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES,
        })
        .then(() => {
          window.dispatchEvent(
            new CustomEvent('ACTIVE_BOBJECT_UPDATED', { detail: { type: BobjectTypes.Activity } }),
          );
        });
    }
  };

  function checkExistingOpportunity() {
    searchOppByLeadOrCompany(
      accountId,
      activityLead?.id?.value,
      activityCompany?.id?.value,
      userId,
    ).then(response => {
      if (response?.data?.totalMatching > 0) {
        const idealOpps = response?.data?.contents?.filter(opp => {
          return !Object.entries(invalidOppStatuses).some(([key, value]: [any, any]) => {
            return value.includes(getFieldByLogicRole(opp, key)?.valueLogicRole);
          });
        });
        send?.('UPDATE_CONTEXT_OPP', {
          selectedOpportunityObject: idealOpps[0],
          ...(idealOpps?.length > 1 && { selectedOpportunityArray: idealOpps }),
        });
      }
    });
    setOpportunityChecked(true);
  }

  function checkReferenceBobject(phoneNumber) {
    searchReferenceLeadBobject(phoneNumber)?.then(referenceBobjectFound => {
      if (referenceBobjectFound) {
        api
          .patch(`/bobjects/${activity?.id?.value}/raw`, {
            [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: referenceBobjectFound?.id?.value,
          })
          .then(() => {
            api
              .get(`/bobjects/${activity?.id?.value}/form?injectReferences=true`, {})
              .then(updatedActivity => {
                if (updatedActivity?.data) {
                  const activityBobjectUpdated = injectReferencesGetProcess(updatedActivity?.data);
                  setUpdatedObjects({
                    activityUpdated: activityBobjectUpdated,
                    referenceBobjectUpdated: referenceBobjectFound,
                  });
                }
              });
          });

        send?.('UPDATE_REFERENCE_BOBJECT', {
          referenceBobjectSelected: referenceBobjectFound,
        });
      }
    });
    setReferenceObjectChecked(true);
  }
  const handleOpenMinimizableModal = (type: MinimizableModalType) => {
    const bobjectType = activity?.id?.typeName;
    const relatedCompany = getFieldByLogicRole(
      activity,
      FIELDS_LOGIC_ROLE[bobjectType as Exclude<MainBobjectTypes, 'Company'>]?.COMPANY,
    )?.referencedBobject;
    const relatedLead = getFieldByLogicRole(
      activity,
      FIELDS_LOGIC_ROLE[bobjectType as Exclude<BobjectTypes, MainBobjectTypes>]?.LEAD,
    )?.referencedBobject;

    const companyName = relatedCompany
      ? getValueFromLogicRole(relatedCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME)
      : '';
    openMinimizableModal({
      type,
      title:
        companyName && companyName !== '' ? companyName.slice(0, 10) : t('common.untitledCompany'),
      data: {
        mode: ACTIVITY_MODE.CREATE,
        company: {
          name: getValueFromLogicRole(relatedCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME),
          url: companyUrl(relatedCompany),
          data: relatedCompany,
        },
        lead: relatedLead && {
          name: getValueFromLogicRole(relatedLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
          url: leadUrl(relatedLead, null),
          data: relatedLead,
        },
      },
    });
  };

  const isCopilotEnabled = useCopilotEnabled(accountId);
  const machineDefinition = getMachine(wizardKey);

  const [
    {
      value: step,
      // @ts-ignore
      context: { convertedLeads, ...machineContext },
    },
    send,
    service,
  ] = useMachine(machineDefinition, {
    context: {
      referenceBobject,
      hasSalesFeatureEnabled,
      handleClose: handleClose,
      openCadenceControl: () => {
        modalControlSend(MODAL_STEPS.CADENCE_CONTROL);
      },
      handleOpenMinimizableModal,
      isCalendarEnabled: true,
      isCopilotEnabled,
      markAsReported: markAsReported,
      hasNoStatusPlanEnabled,
    },
  });
  let buttonStepConfig: ButtonsStepConfig = null;
  let customObjectConfig: CustomObjectModalConfig = null;
  let wizardConfig = null;

  useBuildCRMUpdates(activity, hasUpdates => {
    send('CRM_UPDATES_LOADED', { hasCRMUpdates: hasUpdates });
  });

  if (hasCustomWizardsEnabled) {
    service.onTransition(state => {
      const metaInfoStep = getMetaInfoStep(state.meta);
      buttonStepConfig = metaInfoStep?.buttonStepConfig;
      if (buttonStepConfig) {
        buttonStepConfig.hasPreviousStep = state.can(EVENTS.PREVIOUS);
        buttonStepConfig.hasNextStep = state.can(EVENTS.NEXT);
        buttonStepConfig.hideSaveButton = metaInfoStep.buttonStepConfig.hideSaveButton;
      }
      customObjectConfig = metaInfoStep?.customObjectConfig;
      wizardConfig = machineContext?.wizardConfig;
    });

    if (buttonStepConfig?.checkExistingOpportunity && !opportunityChecked) {
      checkExistingOpportunity();
    }

    if (buttonStepConfig?.checkReferenceBobject && !referenceBobject && !referenceObjectChecked) {
      const phone = getTextFromLogicRole(
        activity,
        ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER,
      );
      checkReferenceBobject(phone);
    }
  }
  const direction = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION)
    ?.valueLogicRole;
  useLayoutEffect(() => {
    if (contactFlowStep && send) {
      send(contactFlowStep, {
        activityDirection: direction,
      });
    }
  }, [send, contactFlowStep]);

  useLayoutEffect(() => {
    if (referenceBobject && send) {
      let callResultUpdated = null;
      if (direction !== DIRECTION_VALUES_LOGIC_ROLE.OUTGOING) {
        callResultUpdated = 'ACTIVITY__CALL_RESULT__CORRECT_CONTACT';
        const dataToUpdate = {
          [ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT]: callResultUpdated,
        };
        if (
          !hasCustomWizardsEnabled ||
          machineContext?.wizardConfig?.markReportedAtStart === true
        ) {
          dataToUpdate[ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED] = REPORTED_VALUES_LOGIC_ROLE.YES;
        }
        api.patch(`/bobjects/${activity?.id?.value}/raw`, dataToUpdate);
      }
      const payloadStep = {
        activityDirection: direction,
        callResult: callResultUpdated,
      };
      if (referenceBobjectIsSales) {
        send(STEPS.CALL_RESULTS_OPP, payloadStep);
      } else {
        activityOpportunity
          ? send(STEPS.CHANGE_STATUS, payloadStep)
          : send(STEPS.CALL_RESULTS, payloadStep);
      }
    } else {
      send(STEPS.CALL_RESULTS);
    }
  }, [send, activityLead, activityCompany]);

  useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);

  addMetaToWizardProperties(
    wizardKey,
    buttonStepConfig?.checkReferenceBobject && !referenceBobject
      ? {
          referenceBobject: updatedObjects.referenceBobjectUpdated,
          bobject: updatedObjects.activityUpdated,
        }
      : {},
  );

  const otherProps = STEPS_PROPS[step as keyof typeof STEPS_PROPS];
  const cadenceEnded =
    referenceBobject?.cadenceEnded ||
    getValueFromLogicRole(
      referenceBobject,
      FIELDS_LOGIC_ROLE[referenceBobject?.id?.typeName as MainBobjectTypes]?.CADENCE_ENDED,
      true,
    );
  const cadence =
    referenceBobject?.cadence ||
    getValueFromLogicRole(
      referenceBobject,
      FIELDS_LOGIC_ROLE[referenceBobject?.id?.typeName as MainBobjectTypes]?.CADENCE,
      true,
    );

  return (
    <>
      {modalStep === MODAL_STEPS.CONTACT_FLOW && (
        <Modal open onClose={handleClose} width={otherProps?.width}>
          <ModalHeader variant="gradient" className={styles.ccfModalHeader}>
            <ModalTitle>
              {buttonStepConfig?.modalTitle || t(`titles.${otherProps?.titleKey}`)}
            </ModalTitle>
            <ModalCloseIcon onClick={handleClose} size="small" color="peanut" />
          </ModalHeader>
          <WizardStepFactory
            step={step as StepsKey}
            send={send}
            buttonsConfig={buttonStepConfig}
            bobject={activity}
            wizardKey={wizardKey as string}
            convertedLeads={convertedLeads}
            machineContext={machineContext}
            customObjectConfig={customObjectConfig}
            wizardConfig={wizardConfig}
            {...props}
          />
        </Modal>
      )}
      {modalStep === MODAL_STEPS.CADENCE_CONTROL && isCadenceControlOpen && (
        <CadenceControlModal
          bobject={
            machineContext?.selectedOpportunityObject
              ? machineContext?.selectedOpportunityObject
              : (referenceBobject as ExtensionBobject)
          }
          initialStep={{
            step: 'NEXT_STEPS',
            hadStartedCadence: !(cadence && cadenceEnded !== 'true' && cadenceEnded !== 'Yes'),
          }}
          setIsOpen={setIsCadenceControlOpen}
          callbackOnClose={handleClose}
        />
      )}
    </>
  );
};

export const ContactFlowModal = visibilityHandler(React.memo(ContactFlow));
