import React, { useState } from 'react';

import {
  Button,
  Checkbox,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';

import { ConvertToSales } from '../../../../../assets/svg';
import useOpportunityControl from '../../../../hooks/useOpportunityControl';
import { useUserHelpers } from '../../../../hooks/useUserHelpers';
import { Bobject } from '../../../../typings/bobjects';
import styles from './feedbackStep.module.css';

const FeedbackStep = ({
  onClose,
  openOpportunityModal,
  leads,
  assignedTo,
}: {
  onClose: () => void;
  openOpportunityModal: boolean;
  leads?: Array<Bobject>;
  assignedTo?: string;
}) => {
  const { openModal: openOpportunityControlModal } = useOpportunityControl();
  const [shouldSaveSetting, setShouldSaveSetting] = useState<boolean>();
  const { save } = useUserHelpers();

  const saveSettings = () => {
    save(UserHelperKeys.SEND_TO_SALSES_MODAL_FEEDBACK_STEP);
  };

  return (
    <>
      <ModalHeader className={styles.header}>
        <ModalTitle>Succesfully sent!</ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <div className={styles.content}>
          <ConvertToSales />
          <Text size="m">
            From now on, these prospects can be managed <b>from the sales tab</b> 🚀
          </Text>
        </div>
      </ModalContent>
      <ModalFooter className={styles.footer}>
        <div className={styles.actionButtons}>
          <div className={styles.checkbox}>
            <Text size="s">Don’t show me this information again</Text>
            <Checkbox
              size="small"
              onClick={(isChecked: boolean) => {
                setShouldSaveSetting(isChecked);
              }}
            />
          </div>
          <Button
            onClick={() => {
              if (shouldSaveSetting) {
                saveSettings();
              }
              onClose();
              if (openOpportunityModal) {
                openOpportunityControlModal(leads, assignedTo);
              }
            }}
          >
            Got it!
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default FeedbackStep;
