import { api } from '@bloobirds-it/utils';
import useSWR, { SWRResponse } from 'swr';

export type TimezoneType = {
  id: string;
  name: string;
  location: string | undefined;
  abbreviation: string;
  utcOffset: string;
};

export const useTimeZones = () => {
  const { data }: SWRResponse<TimezoneType[]> = useSWR<TimezoneType[]>(
    '/utils/service/timezones',
    () => api.get('/utils/service/timezones/gmt').then(res => res?.data),
  );
  return data;
};
