import useSWR from "swr";
import { api } from "../utils/api";
import { useActiveUserSettings } from "@bloobirds-it/hooks";

export const useCadences = (bobjectTypeName: string | Array<string>) => {
  const { settings } = useActiveUserSettings();

  const getBobjectTypesNames = () => {
    if (bobjectTypeName) {
      return Array.isArray(bobjectTypeName) ? bobjectTypeName : [bobjectTypeName];
    }
    return null;
  };
  const fetchCadences = ([url, ...filters]: [url: string, ...filters: Array<string>]) =>
    api.get(`${url}/?bobjectTypes=${filters[0]}`, {});

  const markAsDefault = (cadenceId: string) =>
    // eslint-disable-next-line prettier/prettier
    api.put(`/messaging/cadences/${cadenceId}/markAsDefault`);

  const clone = ({
    cadenceId,
    bobjectTypeToClone,
    name,
  }: {
    cadenceId: string;
    bobjectTypeToClone: string;
    name: string;
  }) =>
    api.post(`/messaging/cadences/${cadenceId}/clone`, {
      name,
      bobjectType: bobjectTypeToClone,
    });

  const deleteCadence = (cadenceId: string) => api.delete(`/messaging/cadences/${cadenceId}`);

  const bobjectTypesToRequest = getBobjectTypesNames();
  const { data: entities, mutate } = useSWR(
    bobjectTypesToRequest ? ['/messaging/cadences', bobjectTypesToRequest.join(',')] : null,
    fetchCadences,
    {},
  );

  const getUsesCadence = async (cadenceId: string, bobjectTypeName: string) => {
    const query = {
      [`${bobjectTypeName.toUpperCase()}__CADENCE`]: cadenceId,
    };
    const searchQuery = {
      query,
      page: 0,
      formFields: true,
      pageSize: 1000,
      injectReferences: true,
      sort: [] as Array<string>,
    };
    const response = await api.post(
      `/bobjects/${settings?.account?.id}/${bobjectTypeName}/aggregation`,
      searchQuery,
    );

    const count = response?.data?.contents[0]?.value;

    return count || 0;
  };

  return {
    cadences: entities?.data?.cadences,
    refreshCadences: mutate,
    markAsDefault,
    clone,
    delete: deleteCadence,
    getUsesCadence,
  };
};
