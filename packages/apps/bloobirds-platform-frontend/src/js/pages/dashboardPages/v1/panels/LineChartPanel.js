import React from 'react';
import { LineChart } from '@bloobirds-it/flamingo-ui';
import { isCustomColor, preprocessLineChartData } from '../../utils/dataPreprocessors';
import { useDashboard } from '../../../../hooks';
import { formatRange } from '../../utils/formatRange';
import { useReportData } from './shared/useReportData';
import { EmptyStatePanel } from './EmptyStatePanel';

export const LineChartPanel = ({ report, options }) => {
  const [data, response] = useReportData(report) ?? [];

  const { intervalFilter, dateRangeEndFilter, dateRangeTypeFilter } = useDashboard();
  const preprocessedData = preprocessLineChartData(
    data,
    report,
    dateRangeTypeFilter === 'all_time',
    options,
  );

  if (preprocessedData.points.length === 0) {
    return <EmptyStatePanel />;
  }

  const customInformation = response?.valuesInformation;

  const getDataKeyColor = dataKey =>
    customInformation[dataKey]?.color !== 'None'
      ? customInformation[dataKey]?.color
      : 'var(--softBloobirds)';
  return (
    <LineChart
      {...preprocessedData}
      getGroupLabel={value => formatRange(value, intervalFilter, dateRangeEndFilter || Date.now())}
      getDataKeyColor={isCustomColor(customInformation) ? getDataKeyColor : undefined}
    />
  );
};
