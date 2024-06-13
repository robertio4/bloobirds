import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ModalContent, ModalFooter, Text } from '@bloobirds-it/flamingo-ui';

import { CadenceFeedback } from '../../../assets/svg';
import styles from './cadenceFeedbackStep.module.css';

interface CadenceFeedbackStepProps {
  handleNext: () => void;
}

const CadenceFeedbackStep = (props: CadenceFeedbackStepProps) => {
  const { handleNext } = props || {};
  const { t } = useTranslation('translation', {
    keyPrefix: 'cadence.cadenceControlModal.feedbackStep',
  });

  return (
    <>
      <ModalContent>
        <div className={styles.content}>
          <img src={CadenceFeedback} alt="Cadence Feedback" />
          <Text size="m" weight="bold">
            {t('title')}
          </Text>

          <Text size="m">{t('subtitle')}</Text>
        </div>
      </ModalContent>
      <ModalFooter className={styles.footer}>
        <Button onClick={handleNext}>{t('accept')}</Button>
      </ModalFooter>
    </>
  );
};

export default CadenceFeedbackStep;
