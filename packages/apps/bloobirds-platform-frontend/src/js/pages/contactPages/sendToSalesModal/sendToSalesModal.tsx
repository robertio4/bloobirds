import React, { useState } from 'react';

import { Modal, ModalCloseIcon, ModalHeader, ModalTitle } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';

import useOpportunityControl from '../../../hooks/useOpportunityControl';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import { Bobject } from '../../../typings/bobjects';
import ConvertToSalesStep from './convertToSalesStep/convertToSalesStep';
import FeedbackStep from './feedbackStep/feedbackStep';
import styles from './sendToSalesModal.module.css';

const SendToSalesModal = ({ onClose, open }: { onClose: () => void; open: boolean }) => {
  const [data, setData] = useState({
    step: 0,
    leads: [],
    assignedTo: undefined,
  });
  const { openModal: openOpportunityControlModal } = useOpportunityControl();
  const isFirstStep = data.step === 0;
  const helpers = useUserHelpers();
  const openFeedbackStep = !helpers.has(UserHelperKeys.SEND_TO_SALSES_MODAL_FEEDBACK_STEP);

  return (
    <Modal open={open} onClose={onClose} width={isFirstStep ? 656 : 512}>
      {data.step === 0 && (
        <>
          <ModalHeader size="small" className={styles.header}>
            <ModalTitle size="small" icon="fileOpportunity">
              Send to sales
            </ModalTitle>
            <ModalCloseIcon size="small" onClick={onClose} />
          </ModalHeader>
          <ConvertToSalesStep
            onClose={onClose}
            onNext={(
              openOpportunityModal: boolean,
              leads?: Array<Bobject>,
              userSelected?: string,
            ) => {
              if (openFeedbackStep) {
                setData({ step: !openOpportunityModal ? 1 : 2, leads, assignedTo: userSelected });
              } else {
                onClose();
                if (openOpportunityModal) {
                  openOpportunityControlModal(leads, userSelected);
                }
              }
            }}
          />
        </>
      )}
      {data.step > 0 && (
        <FeedbackStep
          onClose={onClose}
          openOpportunityModal={data.step === 2}
          leads={data.leads}
          assignedTo={data.assignedTo}
        />
      )}
    </Modal>
  );
};

export default SendToSalesModal;
