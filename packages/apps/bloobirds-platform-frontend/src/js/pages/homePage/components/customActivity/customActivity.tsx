import React from 'react';

import { Text, toRgba } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks } from '@bloobirds-it/hooks';

import { TagMetric } from '../../../../components/tagMetric/tagMetric';
import { DataScope } from '../../../dashboardPages/v1/panels/shared/DataScope';
import { useCustomActivityStatistics } from '../../hooks/useActivityEvolution';
import { HomeMetric, PREVIOUS_TIME_WINDOW, TIME_WINDOW } from '../../typings/home';
import styles from './customActivity.module.css';

export const CustomActivity = ({ timeWindow }: { timeWindow: TIME_WINDOW }) => {
  const { data } = useCustomActivityStatistics(timeWindow);

  const { customTasks } = useCustomTasks({ disabled: false });

  return (
    <>
      {data && data.metrics && (
        <div className={styles.container}>
          <DataScope max={6} data={data.metrics} sliceSize={6}>
            {({ visibleData }: { visibleData: HomeMetric[] }) => {
              return (
                <>
                  <div className={styles.row}>
                    <Text size="s" color="softPeanut" className={styles.title}>
                      {timeWindow ? TIME_WINDOW[timeWindow] : 'Loading...'}
                    </Text>

                    <div className={styles.metrics_container}>
                      {visibleData.map(metric => {
                        if (!metric) return <></>;
                        const task = customTasks?.find(ct => ct.id === metric.label);
                        if (!task) return <></>;
                        return (
                          <TagMetric
                            key={task.id}
                            value={metric.value}
                            color={task?.iconColor && toRgba(task?.iconColor, 1)}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles.row}>
                    <Text size="s" color="softPeanut" className={styles.title}>
                      {timeWindow ? PREVIOUS_TIME_WINDOW[timeWindow] : 'Loading...'}
                    </Text>
                    <div className={styles.metrics_container}>
                      {visibleData.map(metric => {
                        if (!metric) return <></>;
                        const task = customTasks?.find(ct => ct.id === metric.label);
                        if (!task) return <></>;
                        return (
                          <TagMetric
                            key={task.id}
                            value={metric.previousValue}
                            color={task.iconColor && toRgba(task.iconColor, 0.6)}
                            title={task.name}
                          />
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            }}
          </DataScope>
        </div>
      )}
    </>
  );
};
