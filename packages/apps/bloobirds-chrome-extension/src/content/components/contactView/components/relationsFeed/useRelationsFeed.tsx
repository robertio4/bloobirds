import { ExtensionBobject } from '@bloobirds-it/types';
import { api, getSobjectTypeFromId } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { useExtensionContext } from '../../../context';

interface RelationsDataProps {
  [key: string]: {
    title: string;
    salesforceUrl: string;
    icon: string;
    display: boolean;
    fields: {
      apiName: string;
      value: string;
      label: string;
      order: number;
      fieldType: string;
      urlReferencedObject: string;
    }[];
    objectType: string;
    objectTypeFieldRelated: string;
    lastModifiedDate: string;
  }[];
}

interface RelationsFeedProps {
  relations: RelationsDataProps;
  loading: boolean;
}

export const useRelationsFeed = (): RelationsFeedProps => {
  const { useGetActiveBobject } = useExtensionContext();
  const activeBobject = useGetActiveBobject() as ExtensionBobject;

  const sobjectId = activeBobject.salesforceId;
  const sobjectType = getSobjectTypeFromId(sobjectId);

  const { data: relations, isLoading } = useSWR<RelationsDataProps>(
    sobjectType && sobjectId
      ? `/utils/service/salesforce/related/${sobjectType}/${sobjectId}`
      : null,
    (url: string) => api.get(url).then(data => data?.data),
  );

  return {
    relations,
    loading: isLoading,
  };
};
