import { CrmStatusResponse } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

export const useCrmStatus = (
  accountId: string,
  crmObjectTypes: string[],
  crm: string,
  hasNoStatusPlanEnabled: boolean,
) => {
  const fetcher = params =>
    api
      .post(params[0], {
        crmObjects: crmObjectTypes,
        crm: crm,
      })
      .then(response => {
        return response?.data;
      });

  const { data: crmStatusList, mutate: mutateList, isLoading } = useSWR<CrmStatusResponse[]>(
    hasNoStatusPlanEnabled && [`/utils/crmStatus/getCrmStatusList/` + accountId, crmObjectTypes],
    fetcher,
  );

  return { crmStatusList, mutateList, isLoading };
};
