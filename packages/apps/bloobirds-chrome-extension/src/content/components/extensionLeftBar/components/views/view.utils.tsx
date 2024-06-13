import { Trans } from 'react-i18next';

export const scheduledFilterValues = [
  { id: 'until_now', value: <Trans i18nKey="leftBar.dateFilter.today" /> },
  { id: 'since_today', value: <Trans i18nKey="leftBar.dateFilter.sinceToday" /> },
  { id: 'next_7_days', value: <Trans i18nKey="leftBar.dateFilter.next7days" /> },
  { id: 'next_30_days', value: <Trans i18nKey="leftBar.dateFilter.next30days" /> },
  { id: 'all_time', value: <Trans i18nKey="leftBar.dateFilter.allTime" /> },
];

export type Stage = 'PROSPECT' | 'SALES';
export type Stages = Stage | 'ALL';

export const BASE_SEARCH_REQUEST = {
  formFields: true,
  injectReferences: true,
};
