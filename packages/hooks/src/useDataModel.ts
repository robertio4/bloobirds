import {
  BobjectFieldDataModel,
  BobjectPicklistValueEntity,
  BobjectTypes,
  DataModel,
  DataModelResponse,
} from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

if (typeof chrome !== 'undefined') {
  chrome.storage?.sync?.set({ dataBackendUrl: 'https://bobject-api.bloobirds.com' });
}

export function useDataModel(key = '/utils/service/datamodel', isLoggedIn = true) {
  const { data } = useSWR(isLoggedIn ? key : null, getDataModel, {
    revalidateOnFocus: false,
  });
  return data;
}

const accountDataModel: (dataModel: DataModel) => DataModelResponse = (dataModel: DataModel) => {
  return {
    getAccountId: (): string => dataModel?.accountId,
    getFieldsByBobjectType: (bobjectType): BobjectFieldDataModel[] =>
      dataModel?.types?.find(type => type?.name === bobjectType)?.fields,
    findValueById: (id): BobjectPicklistValueEntity =>
      dataModel?.types
        ?.flatMap(type => type?.fields)
        ?.flatMap(field => field?.values)
        ?.find(value => value?.id === id),
    findValueByLabel: (label): BobjectPicklistValueEntity =>
      dataModel?.types
        ?.flatMap(type => type?.fields)
        ?.flatMap(field => field?.values)
        ?.find(value => value?.name === label),
    findValueByLogicRole: (logicRole): BobjectPicklistValueEntity =>
      dataModel?.types
        ?.flatMap(type => type?.fields)
        ?.flatMap(field => field?.values)
        ?.find(value => value?.logicRole === logicRole),
    findValuesByFieldId: (fieldId): BobjectPicklistValueEntity[] =>
      dataModel?.types?.flatMap(type => type?.fields)?.find(field => field?.id === fieldId)?.values,
    findValuesByFieldLogicRole: (fieldLogicRole): BobjectPicklistValueEntity[] =>
      dataModel?.types
        ?.flatMap(type => type?.fields)
        ?.find(field => field?.logicRole === fieldLogicRole)?.values,
    findFieldById: (id): BobjectFieldDataModel =>
      dataModel?.types?.flatMap(type => type?.fields)?.find(field => field?.id === id),
    findFieldByLogicRole: (logicRole): BobjectFieldDataModel =>
      dataModel?.types
        ?.flatMap(type => type?.fields)
        ?.find(field => field?.logicRole === logicRole),
    findFieldsByTypeAndBobjectType: (bobjectType, fieldType) =>
      dataModel?.types
        ?.find(type => type?.name === bobjectType)
        ?.fields?.filter(field => field?.fieldType === fieldType),
    findMainBobjectTypes: () =>
      dataModel?.types?.filter(type =>
        [BobjectTypes.Company, BobjectTypes.Lead, BobjectTypes.Opportunity].includes(
          type?.name as BobjectTypes,
        ),
      ),
    all: () => dataModel?.types,
  };
};

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
