import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal, ModalCloseIcon, ModalHeader, ModalTitle } from '@bloobirds-it/flamingo-ui';
import { recoverScrollOfBox, removeScrollOfBox } from '@bloobirds-it/utils';
import {
  useWizardContext,
  EVENTS,
  ButtonsStepConfig,
  CustomObjectModalConfig,
  StepsKey,
} from '@bloobirds-it/wizard-modal-context';
import { useMachine } from '@xstate/react';

import { WizardStepFactory } from '../../wizardStepFactory';
import styles from './inactiveHandlingModal.module.css';

const visibilityHandler = Component => ({ ...props }) => {
  const { getWizardProperties } = useWizardContext();
  const { wizardKey } = props;
  const wizardContext = getWizardProperties(wizardKey);
  return wizardContext && wizardContext.visible && <Component {...props} />;
};

const InactiveHandlingModal = props => {
  const { wizardKey } = props;
  const {
    getMachine,
    hasCustomWizardsEnabled,
    getWizardProperties,
    getMetaInfoStep,
    resetWizardProperties,
  } = useWizardContext();
  const { bobject } = getWizardProperties(wizardKey);
  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards.modals.inactiveHandlingModal',
  });
  const { t: bobjectT } = useTranslation('translation', { keyPrefix: 'bobjectTypes' });

  /*const hasOnHoldReasons =
    useGlobalPicklistValues({
      logicRole: GLOBAL_PICKLISTS.ON_HOLD_REASONS,
    })?.filter(reason => reason.enabled)?.length !== 0;*/

  useEffect(() => {
    removeScrollOfBox();
    return () => {
      recoverScrollOfBox();
      handleClose();
    };
  }, []);
  function handleClose() {
    resetWizardProperties(wizardKey);
  }

  const machineDefinition = getMachine(wizardKey);
  const [{ value: step }, send, service] = useMachine(machineDefinition, {
    context: {},
    actions: {
      handleSkip: handleClose,
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

  return (
    <>
      <Modal width={680} open onClose={handleClose}>
        <div className={styles._modal_wrapper}>
          <ModalHeader className={styles._modal_header}>
            <ModalTitle color="peanut" icon="rewind" size="small">
              {t('title', { bobjectType: bobjectT(bobject?.id?.typeName.toLowerCase()) })}
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
  );
};

export const InactiveModal = visibilityHandler(InactiveHandlingModal);
