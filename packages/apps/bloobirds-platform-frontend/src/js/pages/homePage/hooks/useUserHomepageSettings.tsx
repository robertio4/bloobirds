import useSWR from 'swr';

import { ServiceApi } from '../../../misc/api/service';
import { api } from '../../../utils/api';
import { keepPreviousResponse } from '../../../utils/swr.utils';
import { ConfigType, UserHomeConfig } from '../typings/home';

export const useUserHomepageSettings = () => {
  const { data: userSettings, mutate } = useSWR(
    '/utils/service/users/home',
    async () =>
      ServiceApi.request({
        url: '/service/users/home',
        method: 'GET',
      }).then(res => res),
    { use: [keepPreviousResponse] },
  );

  const { data: availableSettings } = useSWR(
    '/utils/service/users/home/availableConfig',
    async () =>
      ServiceApi.request({
        url: '/service/users/home/availableConfig',
        method: 'GET',
      }).then(res => res),
    { use: [keepPreviousResponse] },
  );

  const handleUpdateHome = (body: any) => {
    api
      .patch('/utils/service/users/home', body)
      .then(() => {
        mutate();
      })
      .catch(e => {
        // TODO: Make toast
        console.log(e);
      });
  };

  /**
   * @description - This function changes the config's values for the config type
   * @param userConfig
   * @param configType
   */
  const updateHomeSettings = (userConfig: UserHomeConfig[], configType: ConfigType) => {
    const body = {
      configType: configType,
      configs: userConfig?.map(config => ({
        id: config.id,
        ordering: config.ordering,
        enabled: config.enabled,
        extraConfig: config.extraConfig,
      })),
    };
    handleUpdateHome(body);
  };

  const parseOrderingRequest = ({ list, takeIndex }: any) =>
    list.map((el: any, i: any) => ({
      id: el.id,
      ordering: takeIndex ? i + 1 : list.ordering,
      enabled: el?.enabled,
    }));

  return {
    availableSettings,
    userSettings,
    updateHomeSettings,
    parseOrderingRequest,
  };
};
