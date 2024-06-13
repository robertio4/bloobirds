import React from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';

import styles from './pastActivity.module.css';

export const NoDataPage = ({ objectName }: { objectName: string }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.components.noDataPage',
  });
  return (
    <div className={styles._no_results_container}>
      <Icon name="searchNone" color="softPeanut" size={36} />
      <div>
        <Text size="m" align="center" color="softPeanut" weight="bold">
          {t('title', { objectName })}
        </Text>
        <Text size="s" align="center" color="softPeanut">
          {t('subtitle')}
        </Text>
      </div>
    </div>
  );
};

export const NoResultsPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.components.noResultsPage',
  });
  return (
    <div className={styles._no_results_container}>
      <Icon name="historyNonFlipped" color="bloobirds" size={36} />
      <div>
        <Text size="m" align="center" color="softPeanut" weight="bold">
          {t('title')}
        </Text>
        <Text size="s" align="center" color="softPeanut">
          {t('subtitle')}{' '}
        </Text>
      </div>
    </div>
  );
};
