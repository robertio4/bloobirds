import React from 'react';

import { useAggregationSubscription } from '@bloobirds-it/plover';
import { BOBJECT_TYPES } from '@bloobirds-it/types';

import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  DIRECTION_VALUES_LOGIC_ROLE,
} from '../../../constants/activity';
import {
  aggregationToStackedChartData,
  customActivitiesStackedData,
  mergeStacks,
} from '../../../utils/aggregations.utils';
import { getRangeByType } from '../../dashboardPages/utils/getDashboardTimeRange';
import { TIME_WINDOW } from '../typings/home';

export const useTeamActivitiesChart = (timeWindow: TIME_WINDOW) => {
  const query = getRangeByType(timeWindow);

  const activitiesRequest = React.useMemo(
    () => ({
      query: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.TIME]: {
          query: {
            gte: query?.start,
            lte: query?.end,
          },
          searchMode: 'RANGE__SEARCH',
        },
        [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [
          ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL,
          ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL,
          ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN,
        ],
        [ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION]: [DIRECTION_VALUES_LOGIC_ROLE.OUTGOING],
      },
      aggregations: [ACTIVITY_FIELDS_LOGIC_ROLE.USER, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE],
      formFields: true,
      page: 0,
      pageSize: 5000,
    }),
    [timeWindow],
  );

  const customActivitiesRequest = React.useMemo(
    () => ({
      query: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.TIME]: {
          query: {
            gte: query?.start,
            lte: query?.end,
          },
          searchMode: 'RANGE__SEARCH',
        },
        [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK],
      },
      aggregations: [ACTIVITY_FIELDS_LOGIC_ROLE.USER, ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK],
      formFields: true,
      page: 0,
      pageSize: 5000,
    }),
    [timeWindow],
  );
  const { data: activitiesData } = useAggregationSubscription(
    activitiesRequest,
    BOBJECT_TYPES.ACTIVITY,
  );
  const { data: customActivitiesData } = useAggregationSubscription(
    customActivitiesRequest,
    BOBJECT_TYPES.ACTIVITY,
  );

  const stackedActivities = aggregationToStackedChartData({
    data: activitiesData?.data?.contents,
    activityLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
  });
  const stackedCustomActivities = customActivitiesStackedData({
    data: customActivitiesData?.data?.contents,
  });
  const mergedStacks = mergeStacks([stackedCustomActivities, stackedActivities]);
  return {
    chartData: mergedStacks,
    data: [
      ...(activitiesData?.data?.contents ?? []),
      ...(customActivitiesData?.data?.contents ?? []),
    ],
    values: activitiesData?.data?.contents?.flatMap((x: { fieldDataList: any }) => x.fieldDataList),
  };
};
