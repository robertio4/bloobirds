import React from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';

import styles from './emptyFieldsList.module.css';

const EmptyFieldsList = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'accountSettings.relatedObjects.noFieldsAdded',
  });

  return (
    <div className={styles._container}>
      <Icon name="addCircle" color="softPeanut" />
      <div>
        <Text weight="bold" size="s" align="center" color="softPeanut">
          {t('title')}
        </Text>
        <Text size="s" align="center" color="softPeanut">
          {t('subtitle')}
        </Text>
      </div>
    </div>
  );
};

export default EmptyFieldsList;
