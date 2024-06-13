import React from 'react';
import { Skeleton } from '@bloobirds-it/flamingo-ui';
import { StatsItem } from '../../../../components/statsItem/statsItem';
import styles from './../../homePage.module.css';
import { TIME_WINDOW } from '../../typings/home';
import { useTasksStatistics } from '../../hooks/useActivityEvolution';
import { useMediaQuery } from '../../../../hooks';

export const TasksStatistics = ({ timeWindow }: { timeWindow: TIME_WINDOW }) => {
  const { data } = useTasksStatistics(timeWindow);
  const { isSmallDesktop } = useMediaQuery();
  const prospectMetrics = data?.metrics?.find(metric => metric?.label === 'ALL_PROSPECT_CADENCE');
  const scheduledMetrics = data?.metrics?.find(metric => metric?.label === 'ALL_NEXT_STEP');
  const meetingMetrics = data?.metrics?.find(
    metric => metric?.label === 'ALL_CONTACT_BEFORE_MEETING',
  );
  const overdueMetrics = data?.metrics?.find(metric => metric?.label === 'OVERDUE');

  return (
    <div className={data ? styles.statisticsContainer : styles.statisticsContainerSkeleton}>
      {!data ? (
        <div className={styles.skeleton}>
          <Skeleton height={50} width={isSmallDesktop ? 300 : 600} variant="rect" />
        </div>
      ) : (
        <>
          <StatsItem
            value={prospectMetrics?.value}
            percentage={prospectMetrics?.change}
            name="ON CADENCE"
            size="small"
          />
          <StatsItem
            value={scheduledMetrics?.value}
            percentage={scheduledMetrics?.change}
            name="SCHEDULED"
            size="small"
          />
          <StatsItem
            value={meetingMetrics?.value}
            percentage={meetingMetrics?.change}
            name="MEETING TASKS"
            size="small"
          />
          <StatsItem
            value={overdueMetrics?.value}
            percentage={overdueMetrics?.change}
            name="OVERDUE"
            size="small"
            shouldHavePercentage={false}
          />
        </>
      )}
    </div>
  );
};
