import useSWR from 'swr';
import mixpanel from 'mixpanel-browser';
import { api } from '../../../../utils/api';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { Metric } from './subhomeStats';
import { keepPreviousResponse } from '../../../../utils/swr.utils';

const statsURLs = {
  prospectCompanyDelivered: 'prospect/Company/DELIVERED',
  prospectLeadDelivered: 'prospect/Lead/DELIVERED',
  prospectOnCadence: 'prospect/Task/ON_CADENCE',
  prospectMeetings: 'prospect/Task/MEETINGS',
  prospectScheduled: 'prospect/Task/SCHEDULED',
  salesAllOpportunities: 'sales/Opportunity/ALL_OPPORTUNITIES',
};
export type StatsTab = keyof typeof statsURLs;

const mixpanelEvent: Record<StatsTab, string> = {
  prospectCompanyDelivered: MIXPANEL_EVENTS.STATS_TIME_WINDOW_CHANGED_COMPANY_DELIVERED_TAB,
  prospectLeadDelivered: MIXPANEL_EVENTS.STATS_TIME_WINDOW_CHANGED_LEAD_DELIVERED_TAB,
  prospectOnCadence: MIXPANEL_EVENTS.STATS_TIME_WINDOW_CHANGED_ON_CADENCE_TAB,
  prospectMeetings: MIXPANEL_EVENTS.STATS_TIME_WINDOW_CHANGED_MEETING_TAB,
  prospectScheduled: MIXPANEL_EVENTS.STATS_TIME_WINDOW_CHANGED_SCHEDULED_TAB,
  salesAllOpportunities: MIXPANEL_EVENTS.STATS_TIME_WINDOW_CHANGED_ALL_OPPORTUNITIES_TAB,
};

export interface timeWindowInterface {
  windows: { logicRole: string; label: string }[];
  default: string;
}

const prospectingTimeWindow: timeWindowInterface = {
  windows: [
    { logicRole: 'LAST_7_DAYS', label: 'Last 7 days' },
    { logicRole: 'LAST_30_DAYS', label: 'Last 30 days' },
    { logicRole: 'LAST_90_DAYS', label: 'Last 90 days' },
    { logicRole: 'THIS_WEEK', label: 'This week' },
    { logicRole: 'THIS_MONTH', label: 'This month' },
    { logicRole: 'THIS_QUARTER', label: 'This quarter' },
  ],
  default: 'LAST_30_DAYS',
};

const forecastTimeWindow: timeWindowInterface = {
  windows: [
    { logicRole: 'THIS_MONTH', label: 'This month' },
    { logicRole: 'NEXT_MONTH', label: 'Next month' },
    { logicRole: 'THIS_QUARTER', label: 'This quarter' },
    { logicRole: 'NEXT_QUARTER', label: 'Next quarter' },
    { logicRole: 'IN_2_MONTHS', label: 'In 2 months' },
    { logicRole: 'IN_3_MONTHS', label: 'In 3 months' },
    { logicRole: 'IN_4_MONTHS', label: 'In 4 months' },
  ],
  default: 'THIS_MONTH',
};

export const timeWindowsByTab: Record<StatsTab, timeWindowInterface> = {
  prospectCompanyDelivered: prospectingTimeWindow,
  prospectLeadDelivered: prospectingTimeWindow,
  prospectOnCadence: prospectingTimeWindow,
  prospectMeetings: prospectingTimeWindow,
  prospectScheduled: prospectingTimeWindow,
  salesAllOpportunities: forecastTimeWindow,
};

export const useStatsMetrics = (
  tab: StatsTab,
  timeWindow: string,
  assignedTo: string[] = [],
): Metric[] => {
  const assignedParam = assignedTo.length ? `&assignedTo=${assignedTo}` : '';
  const {
    data,
  } = useSWR(
    `/statistics/metrics/${statsURLs[tab]}?timeWindow=${timeWindow}${assignedParam}`,
    url => api.get(url),
    { use: [keepPreviousResponse] },
  );
  return data?.data.metrics;
};

export const trackMixpanel = (tab: StatsTab, timeWindow: string) => {
  mixpanel.track(mixpanelEvent[tab], { 'Time Window': timeWindow });
};
