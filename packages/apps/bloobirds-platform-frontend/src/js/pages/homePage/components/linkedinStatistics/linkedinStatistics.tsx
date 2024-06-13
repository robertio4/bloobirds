import React from 'react';
import { Skeleton } from '@bloobirds-it/flamingo-ui';
import { StatsItem } from '../../../../components/statsItem/statsItem';
import styles from './../../homePage.module.css';
import { useLinkedInStatistics } from '../../hooks/useActivityEvolution';
import { TIME_WINDOW } from '../../typings/home';
import { useMediaQuery } from '../../../../hooks';

export const LinkedinStatistics = ({ timeWindow }: { timeWindow: TIME_WINDOW }) => {
  const { data } = useLinkedInStatistics(timeWindow);
  const { isSmallDesktop } = useMediaQuery();
  const sentMetrics = data?.metrics?.find(metric => metric?.label === 'OUTGOING_LINKEDIN');
  const receivedMetrics = data?.metrics?.find(metric => metric?.label === 'INCOMING_LINKEDIN');
  const conversations = data?.metrics?.find(metric => metric?.label === 'LINKEDIN_CONVERSATIONS');
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
            value={conversations?.value}
            percentage={conversations?.change}
            name={isSmallDesktop ? 'CONVERSATIONS' : 'TOTAL CONVERSATIONS'}
            size="small"
          />
        </>
      )}
    </div>
  );
};
