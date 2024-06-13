import React from 'react';

import { useAggregationSubscription } from '@bloobirds-it/plover';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../constants/opportunity';
import { useActiveUser } from '../../../hooks';
import { aggregationToChartData } from '../../../utils/aggregations.utils';

export const usePipelineChart = (filter: { filter: string }) => {
  const { activeUser } = useActiveUser();

  const assignedToField: any = {
    COMPANY: COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
    LEAD: LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
    OPPORTUNITY: OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  };

  const statusField: any = {
    COMPANY: COMPANY_FIELDS_LOGIC_ROLE.STATUS,
    LEAD: LEAD_FIELDS_LOGIC_ROLE.STATUS,
    OPPORTUNITY: OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
  };

  const bobjectType: any = {
    COMPANY: 'Company',
    LEAD: 'Lead',
    OPPORTUNITY: 'Opportunity',
  };

  const companiesRequest = React.useMemo(
    () => ({
      query: {
        [assignedToField[filter.filter]]: [activeUser?.id],
      },
      aggregations: [statusField[filter.filter]],
      formFields: true,
      page: 0,
      pageSize: 5000,
    }),
    [activeUser, filter],
  );
  const { data } = useAggregationSubscription(companiesRequest, bobjectType[filter.filter]);

  return {
    chartData: aggregationToChartData({ data: data?.data?.contents }),
    data: data?.data?.contents,
    values: data?.data?.contents?.flatMap((x: { fieldDataList: any }) => x.fieldDataList),
  };
};
