import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GenerationInsight, ExtractionInsight, DecisionInsight } from '@bloobirds-it/copilot';
import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useCopilotActivity } from '@bloobirds-it/hooks';
import { Insight, InsightType } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

import styles from './insights.module.css';
import NoResultsFound from './noResultsFound';

interface Props {
  activity: Bobject;
}

interface InsightProps {
  activity: Bobject;
  insight: Insight;
  insightDefinition: CoreInsightDefinition;
}

const insightComponents: Record<InsightType, (props: InsightProps) => JSX.Element> = {
  DECISION: DecisionInsight,
  EXTRACTION: ExtractionInsight,
  GENERATION: GenerationInsight,
};

const Insights = ({ activity }: Props) => {
  const { t } = useTranslation();
  const { insights: data } = useCopilotActivity();

  const { data: coreInsights } = useSWR<CoreInsightDefinition[]>(
    '/utils/service/copilot-insights',
    key => api.get<CoreInsightDefinition[]>(key).then(res => res.data),
  );

  return (
    <div className={styles.insights}>
      <div className={styles.insightsTitle}>
        <div className={styles.titleSection}>
          <Icon name="snippet" color="purple" />
          <Text size="s" weight="heavy">
            {t('ai.aiAnalysis.insightsFor')}
          </Text>
        </div>
      </div>

      {coreInsights && data?.insights?.length > 0 ? (
        data?.insights?.map(i => {
          const Insight = insightComponents[i.insight_type];
          return (
            <Insight
              key={i.pk}
              activity={activity}
              insight={i}
              insightDefinition={coreInsights?.find(ci => ci.versionIdentifier === i.insightId)}
            />
          );
        })
      ) : (
        <NoResultsFound />
      )}
    </div>
  );
};

export default Insights;
