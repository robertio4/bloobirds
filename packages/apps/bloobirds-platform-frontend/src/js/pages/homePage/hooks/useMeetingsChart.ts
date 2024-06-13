import React from 'react';

import { SearchRequest, useAggregationSubscription } from '@bloobirds-it/plover';
import { BobjectTypes } from '@bloobirds-it/types';

import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES } from '../../../constants/activity';
import {
  getPreviousRangeByType,
  getRangeByType,
} from '../../dashboardPages/utils/getDashboardTimeRange';
import { MeetingsProps } from '../components/meetingsStatistics/meetingsStatistics';

export const useMeetingsChart = ({
  timeWindow,
  selectedValue: meetingTypesValue,
}: MeetingsProps) => {
  const query = getRangeByType(timeWindow);
  const previousQuery = getPreviousRangeByType(timeWindow);

  const createMeetingRequest = (
    start: Date | null,
    end: Date | null,
    timeWindow: string,
    meetingTypesValue: string[] | undefined,
    queryType: string,
  ) => {
    return React.useMemo(
      () => ({
        query: {
          [ACTIVITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME]: {
            query: {
              gte: start,
              lte: end,
            },
            searchMode: 'RANGE__SEARCH',
          },
          [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES.MEETING,
          ...(meetingTypesValue?.length > 0
            ? { [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE]: meetingTypesValue }
            : {}),
        },
        aggregations: [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT],
        formFields: true,
        page: 0,
        pageSize: 5000,
      }),
      [timeWindow, meetingTypesValue, queryType],
    );
  };

  const meetingsRequest = createMeetingRequest(
    query?.start,
    query?.end,
    timeWindow,
    meetingTypesValue,
    'current',
  );
  const previousPeriodMeetingsRequest = createMeetingRequest(
    previousQuery?.start,
    previousQuery?.end,
    timeWindow,
    meetingTypesValue,
    'previous',
  );

  const { data } = useAggregationSubscription(
    meetingsRequest as SearchRequest,
    BobjectTypes.Activity,
  );
  const { data: previousPeriodData } = useAggregationSubscription(
    previousPeriodMeetingsRequest as SearchRequest,
    BobjectTypes.Activity,
  );

  return {
    data: data?.data?.contents,
    previousPeriodData: previousPeriodData?.data?.contents,
    values: data?.data?.contents?.flatMap((x: { fieldDataList: any }) => x.fieldDataList),
  };
};
