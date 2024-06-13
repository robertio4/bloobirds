import React from 'react';

import { Skeleton, Text, toRgba } from '@bloobirds-it/flamingo-ui';

import { TagMetric } from '../../../../components/tagMetric/tagMetric';
import { useMediaQuery } from '../../../../hooks';
import { useActivityEvolution } from '../../hooks/useActivityEvolution';
import { HomeMetricsResponse, PREVIOUS_TIME_WINDOW, TIME_WINDOW } from '../../typings/home';
import styles from './activity.module.css';

export const getMetricValue = (metric: string, data: HomeMetricsResponse) => {
  return data?.metrics.find(m => m?.label === metric);
};

export const Activity = ({ timeWindow }: { timeWindow: TIME_WINDOW }) => {
  const { data } = useActivityEvolution(timeWindow);
  const { isSmallDesktop } = useMediaQuery();

  const meetingValue = getMetricValue('MEETINGS_CREATED', data);
  const emailsValue = getMetricValue('OUTGOING_EMAIL', data);
  const callsValue = getMetricValue('OUTGOING_CALL', data);
  const linkedinValue = getMetricValue('OUTGOING_LINKEDIN', data);
  const tasksValue = getMetricValue('TASKS', data);
  const customActivityValue = getMetricValue('CUSTOM_TASKS', data);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Text size="s" color="softPeanut" className={styles.title}>
          {/*@ts-ignore */}
          {timeWindow ? TIME_WINDOW[timeWindow] : 'Loading...'}
        </Text>
        {data?.metrics ? (
          <div className={styles.metrics_container}>
            <TagMetric value={meetingValue.value} color={toRgba('extraMeeting', 1)} />
            <TagMetric value={emailsValue.value} color={toRgba('tangerine', 1)} />
            <TagMetric value={callsValue.value} color={toRgba('extraCall', 1)} />
            <TagMetric value={linkedinValue.value} color={toRgba('darkBloobirds', 1)} />
            <TagMetric value={customActivityValue.value} color={toRgba('softPurple', 1)} />
            <TagMetric value={tasksValue.value} color={toRgba('bloobirds', 1)} />
          </div>
        ) : (
          <div className={styles.skeleton}>
            <Skeleton height={50} width={isSmallDesktop ? 300 : 600} variant="rect" />
          </div>
        )}
      </div>
      <div className={styles.row}>
        <Text size="s" color="softPeanut" className={styles.title}>
          {/*@ts-ignore */}
          {timeWindow ? PREVIOUS_TIME_WINDOW[timeWindow] : 'Loading...'}
        </Text>
        {data?.metrics ? (
          <div className={styles.metrics_container}>
            <TagMetric
              value={meetingValue.previousValue}
              color={toRgba('softTomato', 1)}
              title="Meetings"
            />
            <TagMetric
              value={emailsValue.previousValue}
              color={toRgba('softTangerine', 1)}
              title="Emails"
            />
            <TagMetric
              value={callsValue.previousValue}
              color={toRgba('softMelon', 1)}
              title="Calls"
            />
            <TagMetric
              value={linkedinValue.previousValue}
              color={toRgba('softBloobirds', 1)}
              title="Linkedin"
            />
            <TagMetric
              value={customActivityValue.previousValue}
              color={toRgba('lightPurple', 1)}
              title="C. Activity"
            />
            <TagMetric
              value={tasksValue.previousValue}
              color={toRgba('verySoftBloobirds', 1)}
              title="Tasks"
            />
          </div>
        ) : (
          <div className={styles.skeleton}>
            <Skeleton height={50} width={isSmallDesktop ? 300 : 600} variant="rect" />
          </div>
        )}
      </div>
    </div>
  );
};
