import React from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';

import styles from './transcript.module.css';

function NoResultsFound() {
  const { t } = useTranslation();

  return (
    <div className={styles.noResults}>
      <Icon name="searchNone" size={32} color="softPeanut" />
      <Text size="m">{t('ai.aiAnalysis.noTranscript')}</Text>
      <Text size="s" color="softPeanut" align="center">
        {t('ai.aiAnalysis.noTranscriptDescription')}
      </Text>
    </div>
  );
}

export default NoResultsFound;
