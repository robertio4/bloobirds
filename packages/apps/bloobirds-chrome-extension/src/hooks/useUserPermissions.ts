import { useMemo } from 'react';

import { USER_PERMISSIONS } from '../utils/user';
import { useUserSettings } from './useUserSettings';

const { VIEW_INBOX, VIEW_PROSPECT_TAB, VIEW_SALES_TAB, VIEW_OUTBOX_TAB } = USER_PERMISSIONS;

export const useUserPermissions = () => {
  const settings = useUserSettings();

  return useMemo(() => {
    const { user: { permissions: userPermissions = [] } = {} } = settings.data || {};

    return {
      inbox: userPermissions?.includes(VIEW_INBOX),
      sales: userPermissions?.includes(VIEW_SALES_TAB),
      outbox: userPermissions?.includes(VIEW_OUTBOX_TAB),
      prospect: userPermissions?.includes(VIEW_PROSPECT_TAB),
      all: userPermissions,
    };
  }, [settings]);
};
