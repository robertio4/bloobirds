import { Text } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import styles from '../stepCard.module.css';
import { CadenceStepStatistics } from '@bloobirds-it/types';

const stepDescriptionDictionary: {
  [key: string]: { value: string; type: string };
} = {
  clickRate: { value: 'Clicks', type: '%' },
  openRate: { value: 'Opened', type: '%' },
  replyRate: { value: 'Reply', type: '%' },
  totalEmailsSent: { value: 'Sent', type: '' },
};

export type StepDescriptionTypes = keyof typeof stepDescriptionDictionary;

export const StepStatisticsModule = ({
  stepStatistics,
}: {
  stepStatistics: CadenceStepStatistics;
}) => (
  <>
    {stepStatistics &&
      Object.entries(stepStatistics).map(
        (cadenceStepStatistic: Array<StepDescriptionTypes | number>) => {
          const key: StepDescriptionTypes | number = cadenceStepStatistic[0];
          const value: StepDescriptionTypes | number = cadenceStepStatistic[1];

          return (
            <div key={`${key}-step-statistics`} className={styles._cadence_step_statistic}>
              <Text align="center" weight="bold" color="softBloobirds">
                {value}
                {stepDescriptionDictionary[key]?.type}
              </Text>
              <Text size="s" color="softBloobirds" uppercase={false}>
                {stepDescriptionDictionary[key]?.value}
              </Text>
            </div>
          );
        },
      )}
  </>
);
