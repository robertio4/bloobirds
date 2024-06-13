import { getI18n } from 'react-i18next';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import { useIsOTOAccount } from '@bloobirds-it/hooks';
import isObject from 'lodash/isObject';
import useSWR from 'swr';

import { api } from '../utils/api';
import { useUserSettings } from './useUserSettings';

export enum UserHelperKeys {
  DOWNLOAD_CHROME_EXTENSION = 'DOWNLOAD_CHROME_EXTENSION',
  CREATE_LEAD_FROM_LINKEDIN = 'CREATE_LEAD_FROM_LINKEDIN',
  LINK_FIRST_MESSAGE_LINKEDIN = 'LINK_FIRST_MESSAGE_LINKEDIN',
}

const helpersLabel = Object.freeze({
  DOWNLOAD_CHROME_EXTENSION: 'downloadChromeExtension',
  CREATE_LEAD_FROM_LINKEDIN: 'createLeadFromLinkedIn',
  LINK_FIRST_MESSAGE_LINKEDIN: 'linkFirstMessageLinkedIn',
});

export type HelperKey = {
  [key in UserHelperKeys]: string;
};

export interface HelpersResponse {
  helpers: HelperKey;
}

export const useUserHelpers = () => {
  const userData = useUserSettings();
  const { data, mutate } = useSWR<HelpersResponse>(
    userData?.user?.id && `/utils/helpers/${userData?.user?.id}`,
    () => api.get('utils/users/helpers').then(res => res.data),
    {
      revalidateOnFocus: false,
    },
  );
  const { createToast } = useToasts();
  const isOTOAccount = useIsOTOAccount();
  const i18n = getI18n();

  const has = (key: UserHelperKeys) => {
    return isObject(data?.helpers) && Object.prototype.hasOwnProperty.call(data?.helpers, key);
  };

  const save = (key: UserHelperKeys) => {
    if (data && !has(key)) {
      api.post('/utils/users/helpers/' + key).then(() => {
        // TODO: Filter also by the users that have to see this quick start guide
        const keySelected = helpersLabel[key];
        if (keySelected && !isOTOAccount) {
          createToast({
            message:
              i18n?.t('helperKeys.goals.message') + i18n?.t(`helperKeys.goals.${keySelected}`),
            type: 'reminder',
            icon: 'check',
            iconColor: 'extraCall',
          });
        }
        mutate();
      });
    }
  };

  const reset = () => {
    api
      .delete(
        '/utils/users/helpers?helperKeys=' +
          Object.keys(data?.helpers).filter(
            helper => !['COMPLETE_WELCOME_SCREEN', 'delete'].includes(helper),
          ),
      )
      .then(() => mutate());
  };

  return {
    helpers: data?.helpers,
    mutate,
    save,
    has,
    reset,
  };
};
