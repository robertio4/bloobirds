import React from 'react';
import { Skeleton } from '@bloobirds-it/flamingo-ui';
import { StatsItem } from '../../../../components/statsItem/statsItem';
import styles from './../../homePage.module.css';
import { TIME_WINDOW } from '../../typings/home';
import { useCallsStatistics } from '../../hooks/useActivityEvolution';
import { useMediaQuery } from '../../../../hooks';

export const CallsStatistics = ({ timeWindow }: { timeWindow: TIME_WINDOW }) => {
  const { data } = useCallsStatistics(timeWindow);
  const { isSmallDesktop } = useMediaQuery();
  const sentMetrics = data?.metrics?.find(metric => metric?.label === 'OUTGOING_CALLS');
  const receivedMetrics = data?.metrics?.find(metric => metric?.label === 'INCOMING_CALLS');
  const correctContactMetrics = data?.metrics?.find(metric => metric?.label === 'MISSED_CALLS');
  const pendingToReportMetrics = data?.metrics?.find(
    metric => metric?.label === 'PENDING_REPORTED',
  );
  return (
    <div className={styles.statisticsContainer}>
      {!data ? (
        <div className={styles.skeleton}>
          <Skeleton height={50} width={isSmallDesktop ? 300 : 600} variant="rect" />
        </div>
      ) : (
        <>
          <StatsItem
            value={sentMetrics?.value}
            percentage={sentMetrics?.change}
            name="OUTGOING"
            size="small"
          />
          <StatsItem
            value={receivedMetrics?.value}
            percentage={receivedMetrics?.change}
            name="INCOMING"
            size="small"
          />
          <StatsItem
            value={correctContactMetrics?.value}
            percentage={correctContactMetrics?.change}
            isNegativeAsPositive={true}
            name="MISSED CALLS"
            size="small"
          />
          <StatsItem
            value={pendingToReportMetrics?.value}
            percentage={pendingToReportMetrics?.change}
            name="NOT REPORTED"
            size="small"
            shouldHavePercentage={false}
          />
        </>
      )}
    </div>
  );
};
