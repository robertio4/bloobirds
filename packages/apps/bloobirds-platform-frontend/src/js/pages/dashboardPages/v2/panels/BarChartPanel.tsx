import React, { useState } from 'react';
import { BarChart } from '@bloobirds-it/flamingo-ui';
import {
  isCustomColor,
  preprocessRegularBarChartData,
  preprocessStackedBarChartData,
} from '../../utils/dataPreprocessors';
import { useNewDrillDownModal } from '../../../../hooks/useNewDrillDownModal';
import { ExtendedChartData, Point } from '../../../../constants/newDashboards';
import { DataScope } from '../../v1/panels/shared/DataScope';
import useDashboardFilters from '../../../../hooks/useDashboardFilters';
import { EmptyStatePanel } from '../../v1/panels/EmptyStatePanel';

const containsStacks = (data: Point[]) =>
  Object.keys(data[0] || []).some(key => key.match(/_stack|_group/));

interface BarChartPanelProps {
  report: string;
  title: string;
  options: any;
  isTimeline: boolean;
  keysColors: any;
  hasSingleNumber: boolean;
  visibleBars: string[];
  allBars: { label: string; logicRole: string; id: string }[];
  chartData: ExtendedChartData;
}

export const BarChartPanel = ({
  report,
  title,
  options,
  keysColors,
  hasSingleNumber,
  visibleBars,
  allBars,
  chartData,
}: BarChartPanelProps) => {
  const { groupBy } = useDashboardFilters();
  const { setOpenDrillDown, updateDrillDown } = useNewDrillDownModal();
  const data = chartData?.result;
  const [dataScopeOffset, setDataScopeOffset] = useState(0);
  const isStacked = containsStacks(data);

  const props = isStacked
    ? preprocessStackedBarChartData(report, data, options)
    : preprocessRegularBarChartData(report, data, options);

  const valuesInformation = chartData?.valuesInformation;
  const stackValuesInformation = chartData?.stackValuesInformation;

  let finalPoints = props.points;

  if (visibleBars) {
    if (!chartData.hasGrouped) {
      finalPoints = props.points.filter((point: Point) => {
        const pointRole = allBars.find(bar => bar.label === point._label)?.logicRole;
        return point._label === 'No Value' || (pointRole && visibleBars?.includes(pointRole));
      });
    } else {
      const notSelectedLabels = allBars
        ?.filter(bar => !visibleBars?.includes(bar.logicRole))
        .map(bar => bar.label);
      finalPoints = props.points.map((stackedPoint: { [key: string]: any }) => {
        notSelectedLabels.forEach(lab => delete stackedPoint[lab]);
        return stackedPoint;
      });
    }
  }

  const getDataKeyColor = (dataKey: string, index: number) => {
    if (keysColors) {
      const color = keysColors[props.points[index]._label];
      if (color) return color;
      return 'var(--softBloobirds)';
    } else {
      return props &&
        valuesInformation[finalPoints[index + (dataScopeOffset || 0)]?._label]?.color !== 'None'
        ? valuesInformation[finalPoints[index + (dataScopeOffset || 0)]?._label]?.color
        : 'var(--softBloobirds)';
    }
  };

  const getDataKeyColorStack = (dataKey: string) => {
    if (keysColors) {
      const color = keysColors[dataKey];
      if (color) return color;
      return 'var(--softBloobirds)';
    } else {
      return props && valuesInformation[dataKey]?.color !== 'None'
        ? valuesInformation[dataKey]?.color
        : 'var(--softBloobirds)';
    }
  };

  const dataKeyColor = isStacked ? getDataKeyColorStack : getDataKeyColor;

  const canDrillDown = valuesInformation && chartData?.canDrillDown;
  const drillDown = (bar: any) => {
    if (canDrillDown) {
      const localFilters: { [key: string]: [string] | '__MATCH_EMPTY_ROWS__' } = {};
      let nullField;
      let chartTitle = `${title} → ${bar._label || bar._label_group}`;
      if (groupBy && stackValuesInformation && Object.keys(stackValuesInformation).length !== 0) {
        chartTitle = `${title} → ${bar._label_group}`;
        const barInformation = stackValuesInformation[bar._label_group];
        if (bar._label_group === 'Null') {
          nullField = barInformation.fieldId;
        } else if (bar._label_group === 'No Value') {
          localFilters[stackValuesInformation['No Value'].fieldId] = '__MATCH_EMPTY_ROWS__';
        } else {
          localFilters[barInformation.fieldId] = [barInformation.valueId];
        }
      } else if (Object.keys(valuesInformation).length !== 0) {
        const barInformation = valuesInformation[bar._label];
        if (bar._label === 'No Value') {
          localFilters[barInformation.fieldId] = '__MATCH_EMPTY_ROWS__';
        } else {
          localFilters[barInformation.fieldId] = [barInformation.valueId];
        }
      }

      if (!('None' in localFilters)) {
        setOpenDrillDown(true);
        updateDrillDown(
          report,
          chartTitle,
          localFilters,
          nullField,
          10,
          0,
          visibleBars?.length > 0
            ? allBars?.filter(bar => !visibleBars?.includes(bar.logicRole)).map(bar => bar.id)
            : [],
        );
      }
    }
  };

  if (finalPoints.length === 0) {
    return <EmptyStatePanel />;
  }

  return (
    <DataScope max={8} data={finalPoints}>
      {({ visibleData, offset }) => {
        setDataScopeOffset(offset);
        return (
          <BarChart
            {...props}
            points={visibleData}
            getDataKeyColor={
              isCustomColor(valuesInformation, keysColors) ? dataKeyColor : undefined
            }
            isSingleNumberChart={!isStacked && hasSingleNumber}
            singleNumberKey={'count'}
            onBarClick={canDrillDown ? drillDown : undefined}
          />
        );
      }}
    </DataScope>
  );
};
