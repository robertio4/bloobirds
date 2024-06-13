import useSWR from 'swr';

import { MessagingTemplate } from '../typings/messaging';

type UseLatestThreadMessagingTemplateOptions = {
  cadenceId: string;
  dayNumber: number;
  isAutomatedStep?: boolean;
};

function useLatestThreadMessagingTemplate({
  cadenceId,
  dayNumber,
  isAutomatedStep = true,
}: UseLatestThreadMessagingTemplateOptions) {
  const url = `/messaging/cadences/${cadenceId}/lastThreadMessagingTemplate?dayNumber=${dayNumber}`;
  const { data, isValidating } = useSWR<MessagingTemplate>(isAutomatedStep && url);
  return {
    messagingTemplate: data,
    loading: isValidating,
  };
}

export default useLatestThreadMessagingTemplate;
