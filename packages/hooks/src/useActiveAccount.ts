import { useEffect } from 'react';

import { api, getAccountId } from '@bloobirds-it/utils';
import { atom, useRecoilState } from 'recoil';
import useSWRImmutable from 'swr/immutable';

import { useUserSettings } from './useUserSettings';

const accountIdAtom = atom({
  key: 'accountIdAtom',
  default: null,
});

export const useActiveAccountId = () => {
  const [accountId, setAccountId] = useRecoilState(accountIdAtom);

  useEffect(() => {
    getAccountId()?.then(id => setAccountId(id));
  }, []);

  return accountId;
};

export const useActiveAccountSettings = () => {
  const accountId = useActiveAccountId();
  const isLoggedIn = !!accountId;
  const { data: settings } = useSWRImmutable(
    isLoggedIn ? '/utils/service/accounts/settings' : null,
    () => api.get('/utils/service/accounts/settings').then(res => res.data),
  );
  const getAccountSetting = setting => {
    return settings ? settings[setting] : false;
  };

  return { settings, getAccountSetting, isLoading: !settings };
};

export const useNoStatusOppSetting = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  return getAccountSetting('NO_STATUS_OPP');
};

export const useB2CShowAccountPhonesSetting = () => {
  const { getAccountSetting, isLoading } = useActiveAccountSettings();
  return isLoading ? null : getAccountSetting('B2C_SHOW_ACCOUNT_PHONES');
};

export const useIsOTOAccount = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  const userData = useUserSettings();
  return getAccountSetting('OTO_ACCOUNT') || userData?.user?.otoUser;
};

export const useEmailIntegrationMode = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  const accountSetting = getAccountSetting('EMAIL_INTEGRATION_MODE');

  return {
    userIntegrationMode: accountSetting === 'user_integration',
    accountIntegrationMode: accountSetting !== 'user_integration',
  };
};

export const useIsB2CAccount = () => {
  const { getAccountSetting, isLoading } = useActiveAccountSettings();
  return isLoading ? null : getAccountSetting('B2C_ACCOUNT');
};

export const useIsNoStatusPlanAccount = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  return getAccountSetting('NO_STATUS_PLAN');
};

export const useIsPersonAccountAsAccount = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  return getAccountSetting('PERSONACCOUNT_AS_ACCOUNT');
};

export const useAircallPhoneLinkEnabled = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  return getAccountSetting('AIRCALL_PHONE_LINK');
};

export const useOpenCCFWithoutObject = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  return getAccountSetting('OPEN_CCF_WITHOUT_OBJECT');
};

export const useIsAutoSyncFromDifferentOwner = () => {
  const { getAccountSetting } = useActiveAccountSettings();
  return getAccountSetting('AUTO_SYNC_FROM_DIFFERENT_OWNER');
};
