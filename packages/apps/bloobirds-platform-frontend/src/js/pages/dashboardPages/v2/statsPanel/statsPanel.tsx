import React from 'react';

import { Skeleton } from '@bloobirds-it/flamingo-ui';

import { StatsPanelDefinition } from '../../../../constants/newDashboards';
import { usePerformanceData } from '../../v1/panels/shared/usePerformanceData';
import { StatsError } from './statsError/statsError';
import styles from './statsPanel.module.css';
import StatsPanelItem from './statsPanelItem/statsPanelItem';

interface MetricType {
  title: string;
  value: number;
  percentage: number;
  valueIsPercentage?: boolean;
}

const getPercentageChange = (oldNumber: number, newNumber: number) => {
  if (oldNumber === 0) return 0;
  const decreaseValue = oldNumber - newNumber;
  const percentage = (decreaseValue / oldNumber) * 100;

  return Math.round(percentage * 10) / 10;
};

const getPercentage = (total: number, value: number) => {
  if (total == 0) return 0;
  return Math.round((value / total) * 100 * 10) / 10;
};
const StatsPanel = ({ definition }: { definition: StatsPanelDefinition }) => {
  const { data, loading, error } = usePerformanceData(definition.report);
  return !loading && data?.currentMetrics ? (
    <div className={styles._stats_content}>
      {error && <StatsError />}
      {!error &&
        definition.stats.map(metric => (
          <StatsPanelItem
            key={metric.name}
            name={metric.name}
            value={
              metric.isPercentage
                ? getPercentage(
                    data.currentMetrics[definition.stats.find(stat => stat.isTotal).name],
                    data.currentMetrics[metric.name],
                  )
                : data.currentMetrics[metric.name]
            }
            percentage={
              metric.isTotal
                ? getPercentageChange(
                    data.currentMetrics[metric.name],
                    data.previousMetrics[metric.name],
                  )
                : getPercentage(
                    data.currentMetrics[definition.stats.find(stat => stat.isTotal).name],
                    data.currentMetrics[metric.name],
                  ) -
                  getPercentage(
                    data.previousMetrics[definition.stats.find(stat => stat.isTotal).name],
                    data.previousMetrics[metric.name],
                  )
            }
            valueIsPercentage={metric.isPercentage}
          />
        ))}
    </div>
  ) : (
    <div className={styles._stats_skeleton_content}>
      <Skeleton width="100%" variant="rect" height={56} />
    </div>
  );
};

export default StatsPanel;
