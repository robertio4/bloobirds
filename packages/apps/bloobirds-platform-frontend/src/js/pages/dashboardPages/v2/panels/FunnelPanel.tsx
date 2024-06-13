import { BarChart } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import { ExtendedChartData } from '../../../../constants/newDashboards';

interface FunnelPanelProps {
  chartData: ExtendedChartData;
}
export const FunnelPanel = ({ chartData }: FunnelPanelProps) => {
  const data = chartData?.result;

  return <BarChart groupKey="_label" dataKeys={['count']} points={data} showFunnel />;
};
