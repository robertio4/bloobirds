import { getI18n } from 'react-i18next';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useCadenceV2Enabled, useIsOTOAccount } from '@bloobirds-it/hooks';
import {
  CustomUserHelperKeys,
  ExtensionHelperKeys,
  getAdminQuickStartGuideBlocks,
  getQuickStartGuideBlocks,
  UserHelperKeys,
  UserHelperTooltipsKeys,
  UserPermission,
} from '@bloobirds-it/types';
import { isObject } from 'lodash';
import useSWR, { KeyedMutator, SWRResponse } from 'swr';

import { APP_TASKS } from '../app/_constants/routes';
import SessionManagerFactory from '../misc/session';
import { api } from '../utils/api';
import { useIsAccountAdmin } from './usePermissions';
import { useQuickStartEnabled } from './useQuickStartGuide';
import { useRouter } from './useRouter';

export type HelperKey = {
  [key in UserHelperKeys | UserHelperTooltipsKeys | CustomUserHelperKeys]: string;
};

export interface HelpersResponse {
  helpers: HelperKey;
}

export type UserHelpersType = {
  helpers: HelperKey;
  mutate: KeyedMutator<HelpersResponse>;
  save: (key: UserHelperKeys | UserHelperTooltipsKeys | CustomUserHelperKeys) => void;
  saveCustom: (data: { [x: string]: string }) => void;
  has: (key: UserHelperKeys | UserHelperTooltipsKeys | CustomUserHelperKeys) => boolean;
  get: (key: UserHelperKeys | UserHelperTooltipsKeys | CustomUserHelperKeys) => string;
  deleteHelper: (key: UserHelperKeys | UserHelperTooltipsKeys | CustomUserHelperKeys) => void;
  reset: (key: UserHelperKeys | UserHelperTooltipsKeys | CustomUserHelperKeys) => void;
};

const SessionManager = SessionManagerFactory();

export const useGetUserHelpers = () => {
  const { data }: SWRResponse<HelpersResponse> = useSWR<HelpersResponse>(
    `/utils/helpers/${SessionManager.getUser()?.id}`,
    () => api.get('/utils/users/helpers').then(res => res.data),
    {
      revalidateOnFocus: false,
    },
  );
  return { helpers: data?.helpers };
};

export const useUserHelpers: () => UserHelpersType = () => {
  const { data, mutate }: SWRResponse<HelpersResponse> = useSWR<HelpersResponse>(
    `/utils/helpers/${SessionManager.getUser()?.id}`,
    () => api.get('/utils/users/helpers').then(res => res.data),
  );
  const { createToast } = useToasts();
  const { history } = useRouter();
  const isQuickStartGuideEnabled = useQuickStartEnabled();
  const isOTOAccount = useIsOTOAccount();
  const i18n = getI18n();

  const has = (key: UserHelperKeys | UserHelperTooltipsKeys | CustomUserHelperKeys) => {
    return isObject(data?.helpers) && Object.prototype.hasOwnProperty.call(data?.helpers, key);
  };

  const get = (key: UserHelperKeys | UserHelperTooltipsKeys | CustomUserHelperKeys) => {
    return isObject(data?.helpers) && data?.helpers[key];
  };

  const deleteHelper = (key: UserHelperKeys | UserHelperTooltipsKeys | CustomUserHelperKeys) => {
    return api.delete('utils/users/helpers?helperKeys=' + key);
  };

  const { settings } = useActiveUserSettings();
  const cadencesV2Enabled = useCadenceV2Enabled(settings?.account?.id);
  const isAccountAdmin = useIsAccountAdmin();
  const hasCadencePermission = settings?.user?.permissions?.includes(UserPermission.VIEW_CADENCES);

  const quickStartGuideBlocks = getQuickStartGuideBlocks(hasCadencePermission, cadencesV2Enabled);
  const adminQuickStartGuideBlocks = getAdminQuickStartGuideBlocks(
    hasCadencePermission,
    cadencesV2Enabled,
  );

  function saveCustom(data: { key: ExtensionHelperKeys; data: string }) {
    api.post('/utils/users/helpers/custom', data).then(() => mutate());
  }

  const save = (key: UserHelperKeys | UserHelperTooltipsKeys | CustomUserHelperKeys) => {
    if (!has(key)) {
      api.post('/utils/users/helpers/' + key).then(() => {
        // TODO: Filter also by the users that have to see this quick start guide
        const keys = isAccountAdmin
          ? adminQuickStartGuideBlocks.flatMap(guide => guide.goals)
          : quickStartGuideBlocks.flatMap(guide => guide.goals);
        const keySelected = keys.find(k => k.key === key);
        if (keySelected && isQuickStartGuideEnabled && !isOTOAccount) {
          createToast({
            message:
              i18n?.t('helperKeys.goals.message') +
              i18n?.t(`helperKeys.goals.${keySelected.i18nKey}`),
            type: 'reminder',
            icon: 'check',
            iconColor: 'extraCall',
            onClick: () => history.push(`${APP_TASKS}`),
          });
        }
        mutate();
      });
    }
  };

  const reset = (key?: UserHelperKeys | UserHelperTooltipsKeys | CustomUserHelperKeys) => {
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
    reset,
  };
};
