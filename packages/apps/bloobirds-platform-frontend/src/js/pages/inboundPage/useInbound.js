import { useAggregationSubscription } from '@bloobirds-it/plover';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_SOURCE_LOGIC_ROLES } from '../../constants/lead';
import { BobjectTypes } from "@bloobirds-it/types";
import { keepPreviousResponse } from "@bloobirds-it/utils";

export const getAggregationQuery = () => ({
  query: {
    [LEAD_FIELDS_LOGIC_ROLE.SOURCE]: LEAD_SOURCE_LOGIC_ROLES.INBOUND,
  },
  queries: [
    {
      [LEAD_FIELDS_LOGIC_ROLE.MQL]: '__MATCH_EMPTY_ROWS__',
      [LEAD_FIELDS_LOGIC_ROLE.SAL]: '__MATCH_EMPTY_ROWS__',
    },
    {
      [LEAD_FIELDS_LOGIC_ROLE.SAL]: '__MATCH_EMPTY_ROWS__',
      [LEAD_FIELDS_LOGIC_ROLE.MQL]: 'LEAD__MQL__ACCEPTED',
    },
  ],
  formFields: false,
  aggregations: [LEAD_FIELDS_LOGIC_ROLE.SOURCE],
});

export const useInboundGlobalAggregation = () => {
  const { data } = useAggregationSubscription(getAggregationQuery(), BobjectTypes.Lead, [keepPreviousResponse]);
  return data?.data?.contents[0]?.value;
};
