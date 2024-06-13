import { LineChart } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import { isCustomColor, preprocessLineChartData } from '../../utils/dataPreprocessors';
import { formatRange } from '../../utils/formatRange';
import { ExtendedChartData } from '../../../../constants/newDashboards';
import useDashboardFilters from '../../../../hooks/useDashboardFilters';

interface LineChartPanelProps {
  report: string;
  options: any;
  chartData: ExtendedChartData;
}

export const LineChartPanel = ({ report, options, chartData }: LineChartPanelProps) => {
  const { intervalFilter, dateRangeEndFilter, dateRangeTypeFilter } = useDashboardFilters();

  const preprocessedData = preprocessLineChartData(
    chartData?.result,
    report,
    dateRangeTypeFilter === 'all_time',
    options,
  );

  const customInformation = chartData?.valuesInformation;

  const getDataKeyColor = (dataKey: string) =>
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
