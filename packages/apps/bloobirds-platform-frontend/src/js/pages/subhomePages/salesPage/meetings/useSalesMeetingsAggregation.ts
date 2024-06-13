import { useAggregationSubscription } from '@bloobirds-it/plover';
import { keepPreviousResponse } from '@bloobirds-it/utils';

import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  MEETING_MAIN_TYPE_VALUES,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../../constants/activity';
import { BobjectTypes } from '@bloobirds-it/types';
import SessionManagerFactory from '../../../../misc/session';

const SessionManager = SessionManagerFactory();

export const useSalesMeetingsAggregation = () => {
  const taskAggregationQuery = {
    query: {
      [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING,
      [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: [
        '__MATCH_EMPTY_ROWS__',
        REPORTED_VALUES_LOGIC_ROLE.NO,
      ],
      [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE]: ['__MATCH_FULL_ROWS__'],
    },
    formFields: false,
  };
  taskAggregationQuery.queries = [
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO]: SessionManager?.getUser()?.id,
    },
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: SessionManager?.getUser()?.id,
    },
  ];
  const { data } = useAggregationSubscription(taskAggregationQuery, BobjectTypes.Activity, [
    keepPreviousResponse,
  ]);

  return data?.data?.contents[0]?.value;
};
