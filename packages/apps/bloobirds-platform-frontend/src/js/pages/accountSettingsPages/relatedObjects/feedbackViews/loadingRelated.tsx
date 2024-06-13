import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';

import styles from '../relatedObjects.module.css';

const LoadingRelated = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'accountSettings.relatedObjects.loadingRelated',
  });

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.circleBackgroundIcon}>
        <div className={styles.loader} />
      </div>
      <Text size="xxl" weight="bold" align="center" color="peanut">
        {t('title')}
      </Text>
      <div className={styles.description}>
        <Text size="l" align="center" color="peanut">
          {t('subtitle')}
        </Text>
      </div>
      <Text size="m" align="center" color="peanut">
        {t('description')}
      </Text>
    </div>
  );
};

export default LoadingRelated;
