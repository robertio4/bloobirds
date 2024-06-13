import React from 'react';
import { Skeleton } from '@bloobirds-it/flamingo-ui';
import { StatsItem } from '../../../../components/statsItem/statsItem';
import styles from './../../homePage.module.css';
import { TIME_WINDOW } from '../../typings/home';
import { useEmailsStatistics } from '../../hooks/useActivityEvolution';
import { useMediaQuery } from '../../../../hooks';

export const EmailsStatistics = ({ timeWindow }: { timeWindow: TIME_WINDOW }) => {
  const { data } = useEmailsStatistics(timeWindow);
  const { isSmallDesktop } = useMediaQuery();
  const sentMetrics = data?.metrics?.find(metric => metric?.label === 'OUTGOING_EMAILS');
  const receivedMetrics = data?.metrics?.find(metric => metric?.label === 'INCOMING_EMAILS');
  const openedMetrics = data?.metrics?.find(
    metric => metric?.label === 'ACTIVITY__EMAIL_TIMES_OPEN',
  );
  const clickedMetrics = data?.metrics?.find(
    metric => metric?.label === 'ACTIVITY__EMAIL_TIMES_CLICK',
  );
  const bouncedMetrics = data?.metrics?.find(metric => metric?.label === 'BOUNCED');
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
            name="SENT"
            size="small"
          />
          <StatsItem
            value={receivedMetrics?.value}
            percentage={receivedMetrics?.change}
            name="RECEIVED"
            size="small"
          />
          <StatsItem
            value={openedMetrics?.value}
            percentage={openedMetrics?.change}
            name="OPENED"
            size="small"
          />
          <StatsItem
            value={clickedMetrics?.value}
            percentage={clickedMetrics?.change}
            name="CLICKED"
            size="small"
          />
          <StatsItem
            value={bouncedMetrics?.value}
            percentage={bouncedMetrics?.change}
            name="BOUNCED"
            size="small"
          />
        </>
      )}
    </div>
  );
};
