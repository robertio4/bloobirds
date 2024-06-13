import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Icon, Text } from '@bloobirds-it/flamingo-ui';

import styles from '../relatedObjects.module.css';

const ErrorRelated = ({ onReload }: { onReload: () => void }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'accountSettings.relatedObjects.errorRelated',
  });

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.errorCircleBackgroundIcon}>
        <Icon name="cross" size={48} color="extraMeeting" />
      </div>
      <Text size="xxl" weight="bold" align="center" color="peanut">
        {t('title')}
      </Text>
      <div className={styles.description}>
        <Text size="l" align="center" color="peanut">
          {t('subtitle')}
        </Text>
      </div>
      <Button iconLeft="refresh" variant="primary" size="medium" onClick={onReload}>
        {t('button')}
      </Button>
      <Text size="s" align="center" color="peanut">
        {t('description')}
      </Text>
    </div>
  );
};

export default ErrorRelated;
