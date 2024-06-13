import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useBuildCRMUpdates } from '@bloobirds-it/copilot';
import { Modal, ModalCloseIcon, ModalHeader, ModalTitle } from '@bloobirds-it/flamingo-ui';
import {
  useCopilotEnabled,
  useFullSalesEnabled,
  useIsNoStatusPlanAccount,
  useMarkAsReported,
  useUserSettings,
} from '@bloobirds-it/hooks';
import {
  BobjectTypes,
  MIXPANEL_EVENTS,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_STATUS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { getFieldByLogicRole } from '@bloobirds-it/utils';
import {
  useWizardContext,
  ButtonsStepConfig,
  EVENTS,
  CustomObjectModalConfig,
  StepsKey,
} from '@bloobirds-it/wizard-modal-context';
import { useMachine } from '@xstate/react';
import mixpanel from 'mixpanel-browser';

import { useActivityRelatedInfo } from '../../../hooks/useActivityRelatedInfo';
import { searchOppByLeadOrCompany } from '../../../utils/customWizards.utils';
import { WizardStepFactory } from '../../wizardStepFactory';

const invalidOppStatuses = {
  [OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS]: [
    OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST,
    OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_WON,
  ],
  SALESFORCE_OPPPORTUNITY__STAGE: ['Closed Lost', 'Closed Won'],
} as const;

const visibilityHandler = Component => props => {
  const { getWizardProperties } = useWizardContext();
  const { wizardKey } = props;
  const wizardContext = getWizardProperties(wizardKey);
  return wizardContext && wizardContext.visible && <Component {...props} />;
};

/**
 * Meeting result modal, used to report a meeting, all props required.
 * @constructor
 */
export const MeetingReportResultModal = ({ ...props }) => {
  const {
    resetWizardProperties,
    getWizardProperties,
    addMetaToWizardProperties,
    getMachine,
    hasCustomWizardsEnabled,
    getMetaInfoStep,
    wizardsMap,
    accountId,
  } = useWizardContext();
  const userId = useUserSettings()?.user?.id;

  const [opportunityChecked, setOpportunityChecked] = useState<boolean>(false);
  const isCopilotEnabled = useCopilotEnabled(accountId);
  const hasNoStatusPlanEnabled = useIsNoStatusPlanAccount();
  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards.modals.meetingReportResultModal',
  });
  const { wizardKey } = props;
  const { bobject: activity, onSaveCallback, referenceBobject } = getWizardProperties(wizardKey);

  const { activityLead, activityCompany, referenceBobjectIsSales } = useActivityRelatedInfo(
    wizardKey,
  );
  const hasSalesFeatureEnabled = useFullSalesEnabled(accountId);
  const { markAsReported } = useMarkAsReported();

  function handleCloseWithoutSave() {
    resetWizardProperties(wizardKey);
  }

  function checkExistingOpportunity() {
    searchOppByLeadOrCompany(
      accountId,
      activityLead?.id?.value,
      activityCompany?.id?.value,
      userId,
    ).then(response => {
      if (response?.data?.totalMatching > 0) {
        const idealOpp = response?.data?.contents?.find(opp => {
          return !Object.entries(invalidOppStatuses).some(([key, value]: [any, any]) => {
            return value.includes(getFieldByLogicRole(opp, key)?.valueLogicRole);
          });
        });
        send?.('UPDATE_CONTEXT_OPP', {
          selectedOpportunityObject: idealOpp,
        });
      }
    });
    setOpportunityChecked(true);
  }

  function handleClose() {
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CLOSE_IN_WIZARD_STEP_ + wizardKey);
    markAsReported?.(activity).then(() => {
      window.dispatchEvent(
        new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: { type: BobjectTypes.Activity },
        }),
      );
      resetWizardProperties(wizardKey);
      setTimeout(() => {
        onSaveCallback?.();
      }, 500);
    });
  }

  useEffect(() => {
    return () => {
      handleCloseWithoutSave();
    };
  }, []);

  addMetaToWizardProperties(wizardKey, {
    handleClose,
  });

  const machineDefinition = getMachine(wizardKey);

  const [{ value: step, context: machineContext }, send, service] = useMachine(machineDefinition, {
    context: {
      hasNoStatusPlanEnabled,
      referenceBobject,
      hasSalesFeatureEnabled,
      isCopilotEnabled,
      isReferencedObjectInSales: referenceBobjectIsSales,
      handleClose,
    },
  });

  useBuildCRMUpdates(activity, hasUpdates => {
    send('CRM_UPDATES_LOADED', { hasCRMUpdates: hasUpdates });
  });

  let buttonStepConfig: ButtonsStepConfig = null;
  let customObjectConfig: CustomObjectModalConfig = null;
  if (hasCustomWizardsEnabled) {
    service.onTransition(state => {
      const metaInfoStep = getMetaInfoStep(state.meta);
      buttonStepConfig = metaInfoStep?.buttonStepConfig;
      if (buttonStepConfig) {
        buttonStepConfig.hasPreviousStep = state.can(EVENTS.PREVIOUS);
        buttonStepConfig.hasNextStep = state.can(EVENTS.NEXT);
        buttonStepConfig.hideSaveButton = metaInfoStep.buttonStepConfig.hideSaveButton;
      }
      if (buttonStepConfig?.checkExistingOpportunity && !opportunityChecked) {
        checkExistingOpportunity();
      }
      customObjectConfig = metaInfoStep?.customObjectConfig;
    });
  }
  const showModalHeader =
    buttonStepConfig?.showModalHeader === undefined || buttonStepConfig?.showModalHeader === true;
  return !hasCustomWizardsEnabled || !!wizardsMap ? (
    showModalHeader ? (
      <>
        <Modal width={972} open onClose={handleCloseWithoutSave} key={activity?.id?.value}>
          <ModalHeader>
            <ModalTitle color="peanut" icon="company" size="small">
              {t('title')}
            </ModalTitle>
            <ModalCloseIcon color="peanut" size="small" onClick={handleCloseWithoutSave} />
          </ModalHeader>
          <WizardStepFactory
            step={step as StepsKey}
            send={send}
            buttonsConfig={buttonStepConfig}
            bobject={activity}
            wizardKey={wizardKey as string}
            customObjectConfig={customObjectConfig}
            machineContext={machineContext}
          />
        </Modal>
      </>
    ) : (
      <WizardStepFactory
        step={step as StepsKey}
        send={send}
        buttonsConfig={buttonStepConfig}
        bobject={activity}
        wizardKey={wizardKey as string}
        customObjectConfig={customObjectConfig}
        machineContext={machineContext}
      />
    )
  ) : (
    <></>
  );
};

export const MeetingReportResultWizard = visibilityHandler(MeetingReportResultModal);
