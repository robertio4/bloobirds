import { useEffect, useState } from 'react';

import { api, getAccountId } from '@bloobirds-it/utils';
import useSWRImmutable from 'swr/immutable';

export const useRawActiveAccountId = () => {
  const [accountId, setAccountId] = useState('');

  useEffect(() => {
    getAccountId()?.then(id => setAccountId(id));
  }, []);

  return accountId;
};

export const useRawAccountSettings = () => {
  const accountId = useRawActiveAccountId();
  const isLoggedIn = !!accountId;
  const { data: settings } = useSWRImmutable(
    isLoggedIn ? '/utils/service/accounts/settings' : null,
    () => api.get('/utils/service/accounts/settings').then(res => res.data),
  );

  const getRawAccountSetting = setting => {
    return settings ? settings[setting] : false;
  };

  return { getRawAccountSetting, settings, isLoading: !settings };
};
