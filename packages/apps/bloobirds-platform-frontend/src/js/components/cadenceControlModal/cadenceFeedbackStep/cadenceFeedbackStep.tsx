import React, { useEffect } from 'react';
import { Button, ModalContent, ModalFooter, Text } from '@bloobirds-it/flamingo-ui';
import styles from './cadenceFeedbackStep.module.css';
import { CadenceFeedback } from '../../../../assets/svg';
import { useCadenceControl, useLeads } from '../../../hooks';
import { isCompany, isOpportunity } from '../../../utils/bobjects.utils';

interface CadenceFeedbackStepProps {
  handleNext: (hasleads: boolean) => void;
}

const CadenceFeedbackStep = (props: CadenceFeedbackStepProps) => {
  const { handleNext } = props || {};
  const { bobject } = useCadenceControl();
  const { leads, updateLeadsByCompany, updateLeadsByOpportunity } = useLeads('cadenceControl');
  const isBulkAction = Array.isArray(bobject);

  useEffect(() => {
    if (bobject && !isBulkAction) {
      if (isCompany(bobject)) {
        updateLeadsByCompany(bobject?.id.value);
      } else if (isOpportunity(bobject)) {
        updateLeadsByOpportunity(bobject);
      }
    }
  }, [bobject]);

  return (
    <>
      <ModalContent>
        <div className={styles.content}>
          <CadenceFeedback />
          <Text size="m" weight="bold">
            The cadence tasks will appear in the next few minutes in the on cadence tab.
          </Text>

          <Text size="m">
            🕒 This process may take several minutes, close this window while the process is being
            completed.
          </Text>
        </div>
      </ModalContent>
      <ModalFooter className={styles.footer}>
        <Button onClick={() => handleNext(!isBulkAction && leads?.length > 0)}>Accept</Button>
      </ModalFooter>
    </>
  );
};

export default CadenceFeedbackStep;
