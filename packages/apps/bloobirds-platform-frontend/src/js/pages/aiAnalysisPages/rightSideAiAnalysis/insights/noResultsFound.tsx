import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Icon, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { useCopilotActivity } from '@bloobirds-it/hooks';

import styles from './insights.module.css';

function NoResultsFound() {
  const { t } = useTranslation();
  const { insights, regenerateAnalysis } = useCopilotActivity();
  const isGenerating = insights?.status === 'GENERATING';

  return (
    <div className={styles.noResults}>
      <Icon name="searchNone" size={32} color="softPeanut" />
      <Text size="m">{t('ai.aiAnalysis.noInsights')}</Text>
      <Text size="s" color="softPeanut" align="center">
        {t('ai.aiAnalysis.noInsightsDescription')}
      </Text>
      <Text size="s" color="softPeanut" align="center">
        {t('ai.aiAnalysis.noInsightsDescriptionTry')}
      </Text>
      <Button
        disabled={isGenerating}
        color="purple"
        uppercase={false}
        size="small"
        variant="secondary"
        // @ts-ignore
        iconLeft={isGenerating ? '' : 'undoRevert'}
        onClick={regenerateAnalysis}
      >
        {isGenerating ? (
          <Spinner name="loadingCircle" color="purple" size={24} />
        ) : (
          <>{t('ai.aiAnalysis.noInsightsButton')}</>
        )}
      </Button>
    </div>
  );
}

export default NoResultsFound;
