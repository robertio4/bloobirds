import { useEffect, useState } from 'react';

import { getColorByIndex } from '@bloobirds-it/utils';

import {
  FunnelData,
  FunnelDataResponse,
  FunnelNode,
  ReportFilters,
} from '../../../../../constants/newDashboards';
import { useEntity } from '../../../../../hooks';
import useDashboardFilters, { URLFilters } from '../../../../../hooks/useDashboardFilters';
import { api } from '../../../../../utils/api';
import { dateRangeToApiFilter } from '../../../utils/dateUtils';
import { getDashboardTimeRange } from '../../../utils/getDashboardTimeRange';

interface FunnelDataOptions {
  entity: string;
  startingStatus: string;
  steps: { prev: number; later: number };
  colorKeys?: Record<string, string>;
  salesforceStage?: boolean;
}

interface UseFunnelData {
  data: FunnelData;
  loading: boolean;
  error: boolean;
}

export const useFunnelData = ({
  entity,
  startingStatus,
  steps,
  colorKeys,
  salesforceStage,
}: FunnelDataOptions): UseFunnelData => {
  const [data, setData] = useState<FunnelData>({ total: 0, nodes: [], links: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const picklistFieldValues = useEntity('bobjectPicklistFieldValues');

  const [currentFilters, setCurrentFilters] = useState<URLFilters>();

  const { intervalFilter, getTranslatedFilters, rangeParams, filters } = useDashboardFilters();

  const [currentStartingStatus, setCurrentStartingStatus] = useState<string>();
  const [currentSteps, setCurrentSteps] = useState<{ prev: number; later: number }>();
  const dateRange = getDashboardTimeRange({ ...rangeParams, withPadding: false });
  const buildFilters = (): ReportFilters => {
    return {
      timeWindow: intervalFilter,
      newMoreFilters: { ...getTranslatedFilters() },
      ...dateRangeToApiFilter(dateRange.start, dateRange.end),
    };
  };

  const [currentRange, setCurrentRange] = useState<{
    start: Date;
    end: Date;
    interval: string;
    type: string;
  }>();

  const stringToColour = function (str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  };

  const getColor = (
    picklistValue: {
      backgroundColor?: string;
      logicRole?: string;
      value?: string;
    },
    index: number,
  ) => {
    if (colorKeys && picklistValue.logicRole && colorKeys[picklistValue.logicRole]) {
      return colorKeys[picklistValue.logicRole];
    }

    if (colorKeys && picklistValue.logicRole && !colorKeys[picklistValue.logicRole]) {
      return getColorByIndex(index);
    }

    if (!colorKeys && picklistValue.backgroundColor) {
      return picklistValue.backgroundColor;
    }

    if (!colorKeys && !picklistValue.backgroundColor) {
      return getColorByIndex(index);
    }
  };

  const filtersHaveChanged = (newFilters: URLFilters) => {
    const change = JSON.stringify(newFilters) !== JSON.stringify(currentFilters);

    if (change) {
      setCurrentFilters({ ...newFilters });
    }
    return change;
  };

  const rangeChanged = (newRange: { start: Date; end: Date; interval: string; type: string }) => {
    const change = JSON.stringify(newRange) !== JSON.stringify(currentRange);

    if (change) {
      setCurrentRange(newRange);
    }
    return change;
  };

  const stepsChanged = (newSteps: { prev: number; later: number }) => {
    const change = JSON.stringify(newSteps) !== JSON.stringify(currentSteps);

    if (change) {
      setCurrentSteps(newSteps);
    }
    return change;
  };

  const statusChanged = (newStatus: string) => {
    const change = newStatus !== currentStartingStatus;

    if (change) {
      setCurrentStartingStatus(newStatus);
    }
    return change;
  };

  const findTargetOfNode = (
    funnelData: FunnelData,
    nodeIndex: number,
    currentDepth: number,
  ): FunnelNode => {
    const possibleTargets = funnelData.nodes
      .map((node, index) => ({ ...node, originalIndex: index }))
      .filter(node => node.nodeDepth > currentDepth)
      .map(node => node.originalIndex);

    const target = funnelData.links.find(
      link => possibleTargets.includes(link.target) && link.source === nodeIndex,
    );
    return funnelData.nodes[target.target];
  };

  const transformResponse = (resData: FunnelData) => {
    const { nodes } = resData;
    const colorNodes = nodes.map((node, index) => {
      if (node.name === null) {
        const target = findTargetOfNode(resData, index, node.nodeDepth);
        const starting = picklistFieldValues.findBy('id')(target.name);
        return {
          ...node,
          name: `Created as ${target.name === 'No Value' ? 'No Value' : starting.value}`,
          customName: `${target.name === 'No Value' ? 'No Value' : starting.value}`,
          color: target.name === 'No Value' ? '#464F57' : getColor(starting, index),
          isCreationNode: true,
          valueId: null,
        };
      }
      const picklistValue = picklistFieldValues.findBy('id')(node.name);
      if (picklistValue) {
        return {
          ...node,
          name: picklistValue.value,
          color: getColor(picklistValue, index),
          valueId: picklistValue.id,
        };
      } else {
        return {
          ...node,
          color: node.name ? getColor({ value: node.name }, index) : '#464F57',
          valueId: node.name ?? 'No Value',
        };
      }
    });
    return { ...resData, nodes: colorNodes };
  };
  useEffect(() => {
    if (!loading && startingStatus) {
      if (
        statusChanged(startingStatus) ||
        filtersHaveChanged(filters) ||
        rangeChanged(rangeParams) ||
        stepsChanged(steps)
      ) {
        setLoading(true);
        setError(false);
        const filters = buildFilters();
        const historicAssignedTo = { ...filters.newMoreFilters['HISTORIC_ASSIGNED_TO'] };
        delete filters.newMoreFilters['HISTORIC_ASSIGNED_TO'];

        api
          .post<FunnelDataResponse>('/analytics/dashboard/funnel', {
            entity,
            startingStatus: startingStatus,
            filters,
            historicAssignedTo,
            laterSteps: steps.later,
            previousSteps: steps.prev,
            salesforceStage,
          })
          .then(res => {
            setData(transformResponse(res.data.data));
          })
          .catch(e => {
            setError(true);
          })
          .finally(() => setLoading(false));
      }
    }
  }, [startingStatus, steps, rangeParams, filters]);

  return { data, loading, error };
};
