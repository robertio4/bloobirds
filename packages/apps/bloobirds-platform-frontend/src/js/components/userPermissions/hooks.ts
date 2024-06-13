import { useContext, useMemo } from 'react';

import { useIsOTOAccount } from '@bloobirds-it/hooks';
import { Bobject } from '@bloobirds-it/utils';

import { useActiveUser } from '../../hooks';
import { useFullSalesEnabled } from '../../hooks/useFeatureFlags';
import { getValueFromLogicRole } from '../../utils/bobjects.utils';
import { USER_PERMISSIONS } from './constants';
import UserSettingsContext from './context';

const {
  EDIT_ALL,
  VIEW_ADD_LEADS_TAB,
  VIEW_ADD_QC_TAB,
  VIEW_ASSIGN_TAB,
  VIEW_INBOUND_TAB,
  VIEW_INBOX,
  VIEW_MEETING_TAB,
  VIEW_PROSPECT_TAB,
  VIEW_SCHEDULED_TAB,
  VIEW_DASHBOARDS_TAB,
  VIEW_SALES_TAB,
  VIEW_OUTBOX_TAB,
  BULK_ACTIONS,
  VIEW_REPORTS,
  USER_ACTIVITY_VISIBILITY,
} = USER_PERMISSIONS;

export const useUserSettingsContext = () => useContext(UserSettingsContext);
export const useUserSettings = () => {
  const {
    state: { data: settings },
  } = useUserSettingsContext();

  return settings;
};

export const useUserSettingsReload = () => {
  const { reloadUserSettings } = useUserSettingsContext();
  return reloadUserSettings;
};

export const useUserPermissions = () => {
  const settings = useUserSettings();
  const isFullSalesEnabled = useFullSalesEnabled();
  const isOTOAccount = useIsOTOAccount();

  return useMemo(() => {
    const { user: { permissions: userPermissions } = {} } = settings || {};

    return {
      inbound: userPermissions?.includes(VIEW_INBOUND_TAB),
      inbox: userPermissions?.includes(VIEW_INBOX),
      addQC: userPermissions?.includes(VIEW_ADD_QC_TAB),
      assign: userPermissions?.includes(VIEW_ASSIGN_TAB),
      addLeads: userPermissions?.includes(VIEW_ADD_LEADS_TAB),
      prospect: userPermissions?.includes(VIEW_PROSPECT_TAB),
      scheduled: userPermissions?.includes(VIEW_SCHEDULED_TAB),
      meeting: userPermissions?.includes(VIEW_MEETING_TAB),
      editAll: userPermissions?.includes(EDIT_ALL),
      sales: userPermissions?.includes(VIEW_SALES_TAB) && isFullSalesEnabled,
      outbox: userPermissions?.includes(VIEW_OUTBOX_TAB),
      bulkActions: userPermissions?.includes(BULK_ACTIONS),
      dashboards: settings?.user.permissions.includes(VIEW_DASHBOARDS_TAB),
      reports: !isOTOAccount || settings?.user.permissions.includes(VIEW_REPORTS),
      othersActivities:
        !isOTOAccount || settings?.user.permissions.includes(USER_ACTIVITY_VISIBILITY),
    };
  }, [settings, isOTOAccount]);
};

export const useBobjectPermissions = () => {
  const userPermissions = useUserPermissions();
  const { activeUser } = useActiveUser();

  const checkPermissions = (bobject: Bobject) => {
    const author = getValueFromLogicRole(bobject, `${bobject?.id?.typeName.toUpperCase()}__AUTHOR`);
    const assignee = getValueFromLogicRole(
      bobject,
      `${bobject?.id?.typeName.toUpperCase()}__ASSIGNED_TO`,
    );
    const isTheAuthor = author === activeUser.id;
    return userPermissions.editAll || activeUser.id === assignee ? true : isTheAuthor;
  };

  return { checkPermissions };
};
