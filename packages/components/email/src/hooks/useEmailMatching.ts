import { Bobject } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

interface EmailMatchingResponse {
  company?: Bobject;
  lead?: Bobject;
  opportunity?: Bobject;
}

export function useEmailMatching(emails: Array<string>) {
  const { data, error, isValidating } = useSWR('/messaging/emails/matchEmails', async url => {
    const response = await api.post<EmailMatchingResponse>(url, { emails });
    return response.data;
  });

  return {
    company: data?.company,
    lead: data?.lead,
    opportunity: data?.opportunity,
    error,
    isLoading: isValidating,
  };
}
