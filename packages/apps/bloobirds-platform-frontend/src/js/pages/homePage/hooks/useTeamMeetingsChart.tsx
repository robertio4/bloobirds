import React from 'react';

import { useAggregationSubscription } from '@bloobirds-it/plover';
import { BobjectTypes } from '@bloobirds-it/types';

import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES } from '../../../constants/activity';
import { aggregationToStackedChartData, mergeStacks } from '../../../utils/aggregations.utils';
import { getRangeByType } from '../../dashboardPages/utils/getDashboardTimeRange';
import { TeamMeetingsProps } from '../components/teamMeetings/teamMeetings';

export const useTeamMeetingsChart = ({
  timeWindow,
  selectedValue: meetingTypesValue,
  secondarySelectedValue: meetingResultsValue,
}: TeamMeetingsProps) => {
  const query = getRangeByType(timeWindow);

  const meetingsRequest = React.useMemo(
    () => ({
      query: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: {
          query: {
            gte: query?.start,
            lte: query?.end,
          },
          searchMode: 'RANGE__SEARCH',
        },
        [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES.MEETING,
        ...(meetingResultsValue?.length > 0
          ? { [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT]: meetingResultsValue }
          : {}),
        ...(meetingTypesValue?.length > 0
          ? { [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE]: meetingTypesValue }
          : {}),
      },
      aggregations: [
        ACTIVITY_FIELDS_LOGIC_ROLE.USER,
        ...(meetingTypesValue?.length > 0 ? [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE] : []),
      ],
      formFields: true,
      page: 0,
      pageSize: 5000,
    }),
    [timeWindow, meetingTypesValue, meetingResultsValue],
  );
  const { data } = useAggregationSubscription(meetingsRequest, BobjectTypes.Activity);
  return {
    groupedByType: meetingTypesValue?.length > 0,
    chartData: mergeStacks([
      aggregationToStackedChartData({
        data: data?.data?.contents,
        activityLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
      }),
    ]),
    data: data?.data?.contents,
    values: data?.data?.contents?.flatMap((x: { fieldDataList: any }) => x.fieldDataList),
  };
};
