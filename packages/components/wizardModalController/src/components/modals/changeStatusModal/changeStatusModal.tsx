import React, { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal, ModalCloseIcon, ModalHeader, ModalTitle } from '@bloobirds-it/flamingo-ui';
import { useIsNoStatusPlanAccount } from '@bloobirds-it/hooks';
import { recoverScrollOfBox, removeScrollOfBox } from '@bloobirds-it/utils';
import {
  useWizardContext,
  EVENTS,
  STEPS,
  ButtonsStepConfig,
  CustomObjectModalConfig,
  StepsKey,
} from '@bloobirds-it/wizard-modal-context';
import { useMachine } from '@xstate/react';

import { WizardStepFactory } from '../../wizardStepFactory';
import styles from './changeStatusModal.module.css';

const visibilityHandler = Component => props => {
  const { getWizardProperties } = useWizardContext();
  const { wizardKey } = props;
  const wizardContext = getWizardProperties(wizardKey);
  return wizardContext && wizardContext.visible && <Component {...props} />;
};

const ChangeStatusModal = props => {
  const { wizardKey } = props;
  const {
    getMachine,
    hasCustomWizardsEnabled,
    getWizardProperties,
    getMetaInfoStep,
  } = useWizardContext();
  const { bobject, handleClose } = getWizardProperties(wizardKey);
  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards.modals.changeStatusModal',
  });
  const hasNoStatusPlanEnabled = useIsNoStatusPlanAccount();

  useEffect(() => {
    removeScrollOfBox();
    return () => {
      recoverScrollOfBox();
      handleClose();
    };
  }, []);

  const machineDefinition = getMachine(wizardKey);
  const [{ value: step }, send, service] = useMachine(machineDefinition, {
    context: {
      hasNoStatusPlanEnabled,
    },
    actions: {
      handleSkip: handleClose,
      handleClose: handleClose,
    },
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
      }
      customObjectConfig = metaInfoStep?.customObjectConfig;
    });
  }
  useLayoutEffect(() => {
    send(
      hasNoStatusPlanEnabled
        ? STEPS.CHANGE_STATUS_SALESFORCE
        : STEPS.ORIGINAL_CHANGE_STATUS_COMPONENT,
    );
  }, [send]);

  return hasNoStatusPlanEnabled ? (
    <>
      <Modal width="100%" open onClose={handleClose}>
        <div className={styles._modal_wrapper}>
          <ModalHeader className={styles._modal_header}>
            <ModalTitle color="peanut" icon="salesforceOutlined" size="small">
              {t('title')}
            </ModalTitle>
            <ModalCloseIcon color="peanut" size="small" onClick={handleClose} />
          </ModalHeader>
          <WizardStepFactory
            step={step as StepsKey}
            send={send}
            buttonsConfig={buttonStepConfig}
            bobject={bobject}
            wizardKey={wizardKey}
            customObjectConfig={customObjectConfig}
          />
        </div>
      </Modal>
    </>
  ) : (
    <WizardStepFactory
      step={step as StepsKey}
      send={send}
      buttonsConfig={buttonStepConfig}
      bobject={bobject}
      wizardKey={wizardKey}
      customObjectConfig={customObjectConfig}
    />
  );
};

export const ChangeStatusWizard = visibilityHandler(ChangeStatusModal);
