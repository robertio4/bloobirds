import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Icon, Text } from '@bloobirds-it/flamingo-ui';

import styles from '../relatedObjects.module.css';

const NoRelatedFound = ({ onReload }: { onReload: () => void }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'accountSettings.relatedObjects.noRelatedFound',
  });

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.circleBackgroundIcon}>
        <Icon name="searchNone" size={48} color="softPeanut" />
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
    </div>
  );
};

export default NoRelatedFound;
