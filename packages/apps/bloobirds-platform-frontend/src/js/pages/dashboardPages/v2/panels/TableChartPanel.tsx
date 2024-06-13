import { TableChart } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import { formatRange } from '../../utils/formatRange';
import { preprocessTableChartData } from '../../utils/dataPreprocessors';
import { DataScope } from '../../v1/panels/shared/DataScope';
import { ExtendedChartData } from '../../../../constants/newDashboards';
import useDashboardFilters from '../../../../hooks/useDashboardFilters';

const renderCellContent = (row: { [key: string]: any }, label: string, interval: string) => {
  const value = row[label];

  if (label === '__timestamp') {
    return formatRange(value, interval);
  }

  return value;
};

interface TableChartPanelProps {
  report: string;
  timeColumnTitle: string;
  chartData: ExtendedChartData;
}

export const TableChartPanel = ({ report, timeColumnTitle, chartData }: TableChartPanelProps) => {
  const { intervalFilter, dateRangeTypeFilter } = useDashboardFilters();
  const { labels, rows } = preprocessTableChartData(
    chartData?.result,
    dateRangeTypeFilter === 'all_time',
  );
  const headerName = (value: string) =>
    value === '__timestamp' && timeColumnTitle ? timeColumnTitle : value;
  return (
    <>
      <DataScope data={rows} max={6}>
        {({ visibleData }) => (
          <TableChart>
            <thead>
              <tr>
                {labels.map(label => (
                  <th key={`${report}_${label}`}>{headerName(label)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleData.map((row: { __timestamp: number }) => (
                <tr key={`${report}_${row.__timestamp}`}>
                  {labels.map(label => (
                    <td key={`${report}_${row.__timestamp}-${label}`}>
                      {renderCellContent(row, label, intervalFilter)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </TableChart>
        )}
      </DataScope>
    </>
  );
};
