import { api } from '@bloobirds-it/utils';
import hash from 'object-hash';
import useSWR from 'swr';

type SyncStatus = {
  syncStatusOk: boolean;
  syncStatusList: any[];
  bobjectId: string;
};

export const fetch = (accountId, typeName, bobjectsIds): Promise<SyncStatus[]> => {
  if (accountId && bobjectsIds.length > 0 && typeName) {
    const response = api
      .post<SyncStatus[]>('/logging/v2/logs/integrations/getSyncStatus', {
        bobjectType: typeName,
        bobjectIdsList: bobjectsIds,
        accountId: accountId,
        integrationType: ['SALESFORCE', 'INBOUND_SALESFORCE'],
      })
      .then(res => res?.data);
    return response;
  }
};

export const useSyncBobjectStatus = (accountId, bobjects) => {
  const bobjectsIds = bobjects?.map(bobject => bobject?.id?.objectId);
  const { data: bobjectsSync } = useSWR(
    bobjectsIds?.length > 0 && bobjectsIds[0] && `getSyncStatus/${accountId}/${hash(bobjectsIds)}`,
    () => fetch(accountId, bobjects?.[0]?.id?.typeName, bobjectsIds),
    { revalidateOnFocus: true },
  );

  const isAllSync = bobjectsSync?.every(bobject => bobject?.syncStatusOk);

  return {
    syncStatus: isAllSync,
    bobjectsSync,
  };
};
