import {
  BobjectType,
  LinkedInLead,
  LinkedInQueryResponse,
  BobjectId,
  ExtensionCompanyQueryResponse,
  ExtensionOpportunityQueryResponse,
} from '@bloobirds-it/types';

import { DataModel } from '../types/dataModel';
import { ExtensionCompanyQuery, LinkedInLeadQuery } from '../types/entities';
import { api } from './api';

// TODO: Check if this is the best way to do this
if (typeof chrome !== 'undefined') {
  chrome?.storage?.sync?.set({ dataBackendUrl: 'https://bobject-api.bloobirds.com' });
}

const accountDataModel = (dataModel: DataModel) => ({
  getAccountId: () => dataModel?.accountId,
  getFieldsByBobjectType: (bobjectType: BobjectType) =>
    dataModel?.types?.find(type => type?.name === bobjectType),
  findValueById: (id: string) =>
    dataModel?.types
      ?.flatMap(type => type?.fields)
      ?.flatMap(field => field?.values)
      ?.find(value => value?.id === id),
  findValueByLabel: (label: string) =>
    dataModel?.types
      ?.flatMap(type => type?.fields)
      ?.flatMap(field => field?.values)
      ?.find(value => value?.name === label),
  findValueByLogicRole: (logicRole: string) =>
    dataModel?.types
      ?.flatMap(type => type?.fields)
      ?.flatMap(field => field?.values)
      ?.find(value => value?.id === logicRole),
  findValuesByFieldId: (fieldId: string) =>
    dataModel?.types?.flatMap(type => type?.fields)?.find(field => field?.id === fieldId)?.values,
  findValuesByFieldLogicRole: (fieldLogicRole: string) =>
    dataModel?.types
      ?.flatMap(type => type?.fields)
      ?.find(field => field?.logicRole === fieldLogicRole)?.values,
  findFieldById: (id: string) =>
    dataModel?.types?.flatMap(type => type?.fields)?.find(field => field?.id === id),
  findFieldByLogicRole: (logicRole: string) =>
    dataModel?.types?.flatMap(type => type?.fields)?.find(field => field?.logicRole === logicRole),
});

export async function getDataModel() {
  try {
    const { data } = await api.get('/utils/service/datamodel', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: {},
    });
    return accountDataModel(data);
  } catch (e) {
    return null;
  }
}

export async function getBuyerPersonas() {
  try {
    const { data } = await api.get('/utils/service/view/idealCustomerProfile', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: {},
    });
    return data;
  } catch (e) {
    return null;
  }
}

export async function getTargetMarkets() {
  try {
    const { data } = await api.get('/utils/service/view/targetMarket', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: {},
    });
    return data;
  } catch (e) {
    return null;
  }
}

export async function searchUsers() {
  try {
    const { data } = await api.post('/utils/service/users/search', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: {
        active: true,
      },
    });
    return data;
  } catch (e) {
    return null;
  }
}

export async function searchLead(linkedInUrl: string): Promise<LinkedInLead | null> {
  try {
    const { data } = await api.get<LinkedInLead>('/linkedin/search/leads', {
      params: { linkedInUrl },
    });
    return data;
  } catch (e) {
    return null;
  }
}

export async function searchLeadByQuery(
  query: LinkedInLeadQuery,
): Promise<LinkedInQueryResponse | null> {
  try {
    const { data } = await api.post<LinkedInQueryResponse>('/linkedin/leads/query', {
      ...query,
    });
    return data;
  } catch (e) {
    return null;
  }
}

export async function searchCompaniesByQuery(
  query: ExtensionCompanyQuery,
): Promise<ExtensionCompanyQueryResponse | null> {
  try {
    const { data } = await api.post<ExtensionCompanyQueryResponse>('/linkedin/companies/query', {
      ...query,
    });
    return data;
  } catch (e) {
    return null;
  }
}

export async function searchOppsByQuery(
  query: LinkedInLeadQuery,
): Promise<ExtensionOpportunityQueryResponse | null> {
  try {
    const { data } = await api.post<ExtensionOpportunityQueryResponse>(
      '/linkedin/opportunities/query',
      {
        ...query,
      },
    );
    return data;
  } catch (e) {
    return null;
  }
}

export async function updateLeadSalesNavigatorUrl(bobjectId: BobjectId, salesNavigatorUrl: string) {
  return api.put<LinkedInLead>(`/linkedin/leads/${bobjectId.objectId}/setSalesNavigatorUrl`, {
    salesNavigatorUrl,
  });
}

export async function updateLeadLinkedInUrl(bobjectId: BobjectId, linkedInUrl: string) {
  return api.put<LinkedInLead>(`/linkedin/leads/${bobjectId.objectId}/setLinkedInUrl`, {
    linkedInUrl,
  });
}

export async function updateLead(
  bobjectId: BobjectId,
  linkedInUrl: string,
  salesNavigatorURL: string,
) {
  return api.put('/linkedin/leads/' + bobjectId?.objectId, {
    salesNavigatorUrl: salesNavigatorURL || null,
    linkedInUrl: linkedInUrl || null,
  });
}
