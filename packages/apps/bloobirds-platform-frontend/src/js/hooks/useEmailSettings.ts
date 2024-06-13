import useSWR from 'swr';

import { EmailSettings } from '../typings/messaging';
import { api } from '../utils/api';

export function useEmailSettings() {
  const { data, error, mutate, isValidating } = useSWR<EmailSettings>('/messaging/settings/email');

  const updateSettings = async (settings: EmailSettings) => {
    mutate(settings, false);
    await api.put('/messaging/settings/email', settings);
    mutate(settings);
  };

  return {
    settings: data,
    loading: isValidating,
    updateSettings,
  };
}
