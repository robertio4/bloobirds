import { getI18n } from 'react-i18next';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import {
  CustomUserHelperKeys,
  ExtensionHelperKeys,
  getAdminQuickStartGuideBlocks,
  getQuickStartGuideBlocks,
  UserHelperKeys,
  UserHelperTooltipsKeys,
  UserPermission,
} from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import isObject from 'lodash/isObject';
import useSWR, { SWRResponse } from 'swr';

import { useActiveAccountId, useIsOTOAccount } from './useActiveAccount';
import { useActiveUserId, useActiveUserSettings } from './useActiveUser';
import { useCadenceV2Enabled } from './useFeatureFlags';

export type HelperKey = {
  [key in UserHelperKeys | ExtensionHelperKeys | CustomUserHelperKeys]: string;
};

export interface HelpersResponse {
  helpers: HelperKey;
}

export const useGetUserHelpers = () => {
  const userId = useActiveUserId();
  const { data }: SWRResponse<HelpersResponse> = useSWR<HelpersResponse>(
    `/utils/helpers/${userId}`,
    () => api.get('/utils/users/helpers').then(res => res.data),
    {
      revalidateOnFocus: false,
    },
  );
  return { helpers: data?.helpers };
};

export const useUserHelpers = (onGoalClick?: () => void) => {
  const userId = useActiveUserId();
  const accountId = useActiveAccountId();
  const isLoggedIn = !!accountId;
  const { data, mutate, isLoading }: SWRResponse<HelpersResponse> = useSWR<HelpersResponse>(
    userId && isLoggedIn ? `/utils/helpers/${userId}` : null,
    () => api.get('/utils/users/helpers').then(res => res.data),
    {
      revalidateOnFocus: false,
    },
  );
  const { createToast } = useToasts();
  const i18n = getI18n();

  const has = (key: UserHelperKeys | UserHelperTooltipsKeys | ExtensionHelperKeys) => {
    return (
      !isLoading &&
      isObject(data?.helpers) &&
      Object.prototype.hasOwnProperty.call(data?.helpers, key)
    );
  };

  const get = (
    key: UserHelperKeys | UserHelperTooltipsKeys | CustomUserHelperKeys | ExtensionHelperKeys,
  ) => {
    return isObject(data?.helpers) && data?.helpers[key];
  };

  const deleteHelper = (
    key: UserHelperKeys | UserHelperTooltipsKeys | CustomUserHelperKeys | ExtensionHelperKeys,
  ) => {
    return api.delete('utils/users/helpers?helperKeys=' + key);
  };

  const { settings } = useActiveUserSettings(isLoggedIn);
  const cadencesV2Enabled = useCadenceV2Enabled(settings?.account?.id);
  const isOTOAccount = useIsOTOAccount();
  const isAccountAdmin = settings?.user?.accountAdmin;
  const hasCadencePermission = settings?.user?.permissions?.includes(UserPermission.VIEW_CADENCES);

  const quickStartGuideBlocks = getQuickStartGuideBlocks(hasCadencePermission, cadencesV2Enabled);
  const adminQuickStartGuideBlocks = getAdminQuickStartGuideBlocks(
    hasCadencePermission,
    cadencesV2Enabled,
  );

  function saveCustom(data: { [x: string]: string }) {
    api.post('/utils/users/helpers/custom', data).then(() => mutate());
  }

  const save = (key: UserHelperKeys | UserHelperTooltipsKeys | ExtensionHelperKeys) => {
    if (!has(key)) {
      api.post('/utils/users/helpers/' + key).then(() => {
        // TODO: Filter also by the users that have to see this quick start guide
        const keys = isAccountAdmin
          ? adminQuickStartGuideBlocks.flatMap(guide => guide.goals)
          : quickStartGuideBlocks.flatMap(guide => guide.goals);
        const keySelected = keys.find(k => k.key === key);
        if (keySelected && !isOTOAccount) {
          createToast({
            message:
              i18n?.t('helperKeys.goals.message') +
              i18n?.t(`helperKeys.goals.${keySelected.i18nKey}`),
            type: 'reminder',
            icon: 'check',
            iconColor: 'extraCall',
            onClick: () => onGoalClick(),
          });
        }
        mutate();
      });
    }
  };

  const forceSave = (key: UserHelperKeys | UserHelperTooltipsKeys | ExtensionHelperKeys) => {
    return api.post('/utils/users/helpers/' + key).then(() => {
      mutate();
    });
  };

  const reset = (key?: UserHelperKeys | ExtensionHelperKeys) => {
    api
      .delete(
        '/utils/users/helpers?helperKeys=' +
          (key
            ? key
            : Object.keys(data?.helpers).filter(
                helper => ![/*'COMPLETE_WELCOME_SCREEN'*/ 'delete'].includes(helper),
              )),
      )
      .then(() => mutate());
  };

  return {
    helpers: data?.helpers,
    mutate,
    save,
    saveCustom,
    has,
    get,
    deleteHelper,
    forceSave,
    reset,
    isLoading,
  };
};
