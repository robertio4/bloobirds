import React, { useLayoutEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CadenceControlModal } from '@bloobirds-it/cadence';
import { Modal, ModalCloseIcon, ModalHeader, ModalTitle } from '@bloobirds-it/flamingo-ui';
import { useActiveAccountId, useCustomWizards, useCustomWizardsEnabled } from '@bloobirds-it/hooks';
import { ExtensionBobject } from '@bloobirds-it/types';

import { ContactFlowModalProvider, useContactFlow } from '../hooks';
import { STEPS_PROPS } from './callResult/contactFlowConstants';
import styles from './contactFlow.module.css';
import { MODAL_STEPS, STEPS } from './contactFlowModal.machine';
import { WizardModalContent } from './wizardComponents/wizardModalContent';

const withProvider = Component => props => {
  const accountId = useActiveAccountId();
  const hasCustomWizardsEnabled = useCustomWizardsEnabled(accountId);
  const { handleClose, initialStep, openCadenceControl, ...providerProps } = props;
  const { availableCustomWizards: wizardsMap } = useCustomWizards(
    accountId,
    hasCustomWizardsEnabled,
  );
  return (
    (!hasCustomWizardsEnabled || !!wizardsMap) && (
      <ContactFlowModalProvider
        hasCustomWizardsEnabled={hasCustomWizardsEnabled}
        wizardsMap={wizardsMap}
        {...props}
      >
        <Component
          handleClose={handleClose}
          initialStep={initialStep}
          openCadenceControl={openCadenceControl}
        />
      </ContactFlowModalProvider>
    )
  );
};

const ContactFlow = ({ handleClose }) => {
  const {
    referenceBobject,
    activityLead,
    activityCompany,
    activityOpportunity,
    referenceBobjectIsSales,
    step,
    send,
    modalStep,
  } = useContactFlow();

  const [isCadenceControlOpen, setIsCadenceControlOpen] = useState<boolean>(true);

  useLayoutEffect(() => {
    if (referenceBobject && send) {
      if (referenceBobjectIsSales) {
        send(STEPS.CALL_RESULTS_OPP);
      } else {
        activityOpportunity ? send(STEPS.CHANGE_STATUS) : send(STEPS.CALL_RESULTS);
      }
    } else {
      send(STEPS.CALL_RESULTS);
    }
  }, [send, activityLead, activityCompany]);

  const { t } = useTranslation('translation', { keyPrefix: 'contactFlowModal.titles' });
  const otherProps: { title: string; width: number } = STEPS_PROPS(t)[
    step as keyof typeof STEPS_PROPS
  ];

  return (
    <>
      {modalStep === MODAL_STEPS.CONTACT_FLOW && (
        <Modal open onClose={handleClose} width={otherProps?.width}>
          <ModalHeader variant="gradient" className={styles.ccfModalHeader}>
            <ModalTitle>{otherProps?.title}</ModalTitle>
            <ModalCloseIcon onClick={handleClose} size="small" color="peanut" />
          </ModalHeader>
          <WizardModalContent />
        </Modal>
      )}
      {modalStep === MODAL_STEPS.CADENCE_CONTROL && isCadenceControlOpen && (
        <CadenceControlModal
          bobject={referenceBobject as ExtensionBobject}
          initialStep={{
            step: 'NEXT_STEPS',
            hadStartedCadence: !(
              (referenceBobject as ExtensionBobject).cadence &&
              (referenceBobject as ExtensionBobject).cadenceEnded !== 'true'
            ),
          }}
          setIsOpen={setIsCadenceControlOpen}
          callbackOnClose={handleClose}
        />
      )}
    </>
  );
};

export const ContactFlowModal = withProvider(React.memo(ContactFlow));
