import useSWR from 'swr';
import { api } from '@bloobirds-it/utils';

export const useCadencesUsingTemplate = templateId => {
  const { data: cadences, isValidating } = useSWR(
    templateId ? `/messaging/messagingTemplates/${templateId}/cadences` : null,
    url =>
      api.get(url, {
        headers: { 'Content-Type': 'application/json' },
        data: {},
      }),
  );
  const cadencesUsingTemplate = cadences?.data?.cadences;
  return { cadencesUsingTemplate, isValidating };
};
