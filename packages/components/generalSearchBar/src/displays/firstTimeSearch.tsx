import React from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';

import styles from '../generalSearchBar.module.css';

export function FirstTimeSearch() {
  const { t } = useTranslation('translation', { keyPrefix: 'generalSearchBar.firstTimeSearch' });

  return (
    <div className={styles.firstTime}>
      <div className={styles.firstTimeTitle}>
        <Text color="peanut" weight={'bold'}>
          {t('header')}
        </Text>
      </div>
      <div className={styles.firstTimeBody}>
        <Text color="peanut" size={'m'} className={styles.firstTimeBodyTitle}>
          {t('title1')}
        </Text>
        <div className={styles.firstTimeBodyIconText}>
          <Icon name="search" size={24} color="bloobirds" className={styles.firstTimeBodyIcon} />
          <Text color="softPeanut" size={'s'}>
            {t('subtitle1')}
          </Text>
        </div>
        <Text color="peanut" size={'m'} className={styles.firstTimeBodyTitle}>
          {t('title2')}
        </Text>
        <div className={styles.firstTimeBodyIconText}>
          <Icon name="filter" size={24} color="bloobirds" className={styles.firstTimeBodyIcon} />
          <Text color="softPeanut" size={'s'}>
            {t('subtitle2')}
          </Text>
        </div>
      </div>
    </div>
  );
}

export function FirstTimeSearchCompressed() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'generalSearchBar.firstTimeSearchCompressed',
  });

  return (
    <div className={styles.firstTime}>
      <div className={styles.firstTimeTitle}>
        <Text color="peanut" weight={'bold'}>
          {t('header')}
        </Text>
      </div>
      <div className={styles.firstTimeBody}>
        <Text color="peanut" size={'m'} className={styles.firstTimeBodyTitle}>
          {t('title1')}
        </Text>
        <div className={styles.firstTimeBodyIconText}>
          <Icon name="quote" size={24} color="bloobirds" className={styles.firstTimeBodyIcon} />
          <Text color="softPeanut" size={'s'}>
            {t('subtitle1')}
          </Text>
        </div>
        <Text color="peanut" size={'m'} className={styles.firstTimeBodyTitle}>
          {t('title2')}
        </Text>
        <div className={styles.firstTimeBodyIconText}>
          <Icon name="filter" size={24} color="bloobirds" className={styles.firstTimeBodyIcon} />
          <Text color="softPeanut" size={'s'}>
            {t('subtitle2')}
          </Text>
        </div>
      </div>
    </div>
  );
}
