import { ExtensionCompany, ExtensionOpportunity, LinkedInLead } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';

export interface SyncSalesforceSobjectProps {
  sobjectType: string;
  sobjectId: string;
}

const isNewId = (sobjectId: string): boolean => {
  return sobjectId?.startsWith('new');
};

export const useSyncSalesforceSobject = (props: SyncSalesforceSobjectProps) => {
  const { sobjectId, sobjectType } = props;
  const { data, mutate } = useSWR<
    AxiosResponse<ExtensionCompany | LinkedInLead | ExtensionOpportunity>
  >(
    sobjectId &&
      !isNewId(sobjectId) &&
      `/utils/service/salesforce/sync/${sobjectType}/${sobjectId}`,
    key => api.get(key),
  );

  return {
    data: data?.data,
    mutate,
  };
};

export interface SyncWithParentsResponse {
  lead: LinkedInLead;
  company: ExtensionCompany;
  opportunity: ExtensionOpportunity;
}

export const useSyncWithParentsSalesforceSobject = (props: SyncSalesforceSobjectProps) => {
  const { sobjectId, sobjectType } = props;
  const { data, mutate } = useSWR<AxiosResponse<SyncWithParentsResponse>>(
    sobjectId &&
      !isNewId(sobjectId) &&
      `/utils/service/salesforce/syncParents/${sobjectType}/${sobjectId}`,
    key => api.get(key),
  );

  return {
    data: data?.data,
    mutate,
  };
};
