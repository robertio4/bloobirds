import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { Icon, IconButton, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useCopilotActivity } from '@bloobirds-it/hooks';

import NoResultsFound from './noResultsFound';
import styles from './summary.module.css';

const Summary = () => {
  const { insights } = useCopilotActivity();
  const { t } = useTranslation();
  const [copyTooltip, setCopyTooltip] = useState(t('copyText.copyToClipboard'));
  const { activityType } = useParams<{ activityType: string }>();

  const onCopy = () => {
    navigator.clipboard.writeText(insights?.summary).then(() => {
      setCopyTooltip(t('copyText.copied'));
      setTimeout(() => setCopyTooltip(t('copyText.copyToClipboard')), 1000);
    });
  };

  return (
    <div className={styles.summary}>
      <div className={styles.summaryTitle}>
        <div className={styles.titleSection}>
          <Icon name="stars" color="purple" />
          <Text size="s" weight="heavy">
            {activityType === 'call'
              ? t('ai.aiAnalysis.callSummary')
              : t('ai.aiAnalysis.meetingSummary')}
          </Text>
        </div>
        {insights?.summary && (
          <div className={styles.titleSection}>
            <Tooltip title={copyTooltip} position="top">
              <IconButton name="copy" color="purple" onClick={onCopy} size={16} />
            </Tooltip>
          </div>
        )}
      </div>

      {insights?.summary ? (
        <Text size="xs" color="peanut">
          {insights?.summary}
        </Text>
      ) : (
        <NoResultsFound />
      )}
    </div>
  );
};

export default Summary;
