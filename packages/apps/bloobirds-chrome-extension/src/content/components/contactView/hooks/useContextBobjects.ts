import { ExtensionCompany, LinkedInLead, MainBobjectTypes } from '@bloobirds-it/types';
import useSWR from 'swr';

import { api } from '../../../../utils/api';
import { keepPreviousResponse } from '../../../../utils/swr';
import { useExtensionContext } from '../../context';

export interface ContextBobjects {
  company: ExtensionCompany;
  parentCompany: ExtensionCompany;
  childCompanies: ExtensionCompany[];
  leads: LinkedInLead[];
  // TODO: Make opp interface
  opportunities: any;
  numberOfLeads: number;
  numberOfChildCompanies: number;
  numberOfOpportunities: number;
  bobjectIds: string[];
}

export interface ContextBobjectsResponse {
  data: ContextBobjects;
  mutate: () => void;
  contextBobjectIds: string[];
}

function getBobjectKey(bobjectType: MainBobjectTypes) {
  switch (bobjectType) {
    case 'Company':
      return 'company';
    case 'Lead':
      return 'leads';
    case 'Opportunity':
      return 'opportunities';
    default:
      return '';
  }
}

export const useContextBobjects = () => {
  const { useGetActiveBobject, setActiveBobject } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const activeBobjectId = activeBobject?.id;
  const { data, mutate, isValidating } = useSWR<ContextBobjectsResponse>(
    activeBobject && `/context/bobjects/${activeBobjectId?.value}`,
    () => api.get(`/linkedin/context/${activeBobjectId?.typeName}/${activeBobjectId?.objectId}`),
    { use: [keepPreviousResponse] },
  );
  function handleMutateAndRefresh() {
    return mutate()?.then(({ data }) => {
      const activeEntity = data[getBobjectKey(activeBobjectId.typeName)];
      const bobjectToSet = Array.isArray(activeEntity)
        ? activeEntity.find(bobject => bobject.id.value === activeBobjectId.value)
        : activeEntity;
      setActiveBobject(bobjectToSet);
      return bobjectToSet;
    });
  }

  return {
    data: data?.data,
    mutate,
    handleMutateAndRefresh,
    isValidating,
  };
};
