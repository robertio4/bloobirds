import React, { useState } from 'react';
import { BarChart } from '@bloobirds-it/flamingo-ui';
import {
  isCustomColor,
  preprocessRegularBarChartData,
  preprocessStackedBarChartData,
} from '../../utils/dataPreprocessors';
import { DataScope } from './shared/DataScope';
import { EmptyStatePanel } from './EmptyStatePanel';
import { useReportData } from './shared/useReportData';
import { useDashboard, useDrillDownModal } from '../../../../hooks';

const containsStacks = data => Object.keys(data[0] || []).some(key => key.match(/_stack|_group/));

export const BarChartPanel = ({
  report,
  title,
  options,
  keysColors,
  hasSingleNumber,
  visibleBars,
  allBars,
}) => {
  const [data, response] = useReportData(report) ?? [];

  const { groupBy } = useDashboard();
  const { setOpenDrillDown, updateDrillDown } = useDrillDownModal();
  const isStacked = containsStacks(data);
  const [dataScopeOffset, setDataScopeOffset] = useState(0);

  const props = isStacked
    ? preprocessStackedBarChartData(report, data, options)
    : preprocessRegularBarChartData(report, data, options);

  if (data.length === 0) {
    return <EmptyStatePanel />;
  }
  const valuesInformation = response?.valuesInformation;
  const stackValuesInformation = response?.stackValuesInformation;

  let finalPoints = props.points;

  if (visibleBars) {
    if (!response.hasGrouped) {
      finalPoints = props.points.filter(point => {
        const pointRole = allBars.find(bar => bar.label === point._label)?.logicRole;
        return point._label === 'No Value' || (pointRole && visibleBars.includes(pointRole));
      });
    } else {
      const notSelectedLabels = allBars
        .filter(bar => !visibleBars.includes(bar.logicRole))
        .map(bar => bar.label);
      finalPoints = props.points.map(stackedPoint => {
        notSelectedLabels.forEach(lab => delete stackedPoint[lab]);
        return stackedPoint;
      });
    }
  }

  const getDataKeyColor = (dataKey, index) => {
    if (keysColors) {
      const color = keysColors[props.points[index]._label];
      if (color) return color;
      return 'var(--softBloobirds)';
    } else {
      return props &&
        valuesInformation[props.points[index + (dataScopeOffset || 0)]?._label]?.color !== 'None'
        ? valuesInformation[props.points[index + (dataScopeOffset || 0)]?._label]?.color
        : 'var(--softBloobirds)';
    }
  };

  const getDataKeyColorStack = dataKey => {
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

  const canDrillDown = valuesInformation;
  const drillDown = bar => {
    if (canDrillDown) {
      const localFilters = {};
      let nullField;
      let chartTitle = `${title} → ${bar._label || bar._label_group}`;
      if (groupBy && stackValuesInformation && Object.keys(stackValuesInformation).length !== 0) {
        chartTitle = `${title} → ${bar._label_group}`;
        const barInformation = stackValuesInformation[bar._label_group];
        if (bar._label_group === 'Null') {
          nullField = barInformation.fieldId;
        } else {
          localFilters[barInformation.fieldId] = [barInformation.valueId];
        }
      } else if (Object.keys(valuesInformation).length !== 0) {
        const barInformation = valuesInformation[bar._label];
        localFilters[barInformation.fieldId] = [barInformation.valueId];
      }

      if (!('None' in localFilters)) {
        setOpenDrillDown(true);
        updateDrillDown([report], chartTitle, localFilters, nullField, 10, 0);
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
