import { BobjectField } from '../../../../typings/bobjects';

export const SCHEDULED_DATES_VALUES: Omit<BobjectField, 'name' | 'type'>[] = [
  { id: 'until_now', value: 'Today' },
  { id: 'next_7_days', value: 'Next 7 days' },
  { id: 'next_30_days', value: 'Next 30 days' },
  { id: 'since_today', value: 'Since today' },
  { id: 'all_time', value: 'All time' },
];

export const SCHEDULED_DATES_FOOTER_LABELS: { id: string; preLabel: string; label: string }[] = [
  { id: 'until_now', preLabel: 'of ', label: 'today' },
  { id: 'next_7_days', preLabel: 'of the ', label: 'next 7 days' },
  { id: 'next_30_days', preLabel: 'of the ', label: 'next 30 days' },
  { id: 'since_today', preLabel: '', label: 'since today' },
  { id: 'next_6_months', preLabel: '', label: 'Next 6 months' },
  { id: 'all_time', preLabel: 'of ', label: 'all time' },
];

export const SCHEDULED_DATES_IDS: string[] = SCHEDULED_DATES_VALUES.map(({ id }) => id);
