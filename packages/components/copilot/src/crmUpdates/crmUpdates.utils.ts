import {
  CRMFieldUpdate,
  Dictionary,
  StrDict,
  TaskOrContactOrOpportunityOrEventOrLeadOrAccount,
} from '@bloobirds-it/types';

import { ConfiguredCRMField, SuggestedFieldUpdate } from './crmUpdates.types';

export const buildSobjectUpdates = (
  sobjectCurrentData: StrDict,
  sfdcDataModel: TaskOrContactOrOpportunityOrEventOrLeadOrAccount,
  crmUpdates: CRMFieldUpdate[],
  entity,
): SuggestedFieldUpdate[] => {
  return crmUpdates?.reduce<SuggestedFieldUpdate[]>((finalUpdates, proposedUpdate) => {
    const sobjectField = sfdcDataModel?.fields.find(field => field.name === proposedUpdate.name);
    const currentValue = sobjectCurrentData ? sobjectCurrentData[proposedUpdate.name] : undefined;
    if (currentValue !== proposedUpdate.value) {
      finalUpdates.push({
        status: 'base',
        suggestedValue: proposedUpdate.value,
        name: proposedUpdate.name,
        label: sobjectField?.label,
        currentValue: currentValue,
        acceptedValue: undefined,
        values: sobjectField?.picklistValues.map(value => ({
          name: value.value,
          label: value.label,
        })),
        objectId: sobjectCurrentData['Id'],
        entity,
      });
    }

    return finalUpdates;
  }, []);
};

export const buildSobjectListUpdates = (
  sobjectCurrentData: StrDict[],
  sfdcDataModel: TaskOrContactOrOpportunityOrEventOrLeadOrAccount,
  crmUpdates: CRMFieldUpdate[],
  objectMap: Dictionary<{ name: string }>,
  entity,
): Dictionary<{ updates: SuggestedFieldUpdate[]; name: string; objectId: string }> => {
  return (
    sobjectCurrentData?.reduce<
      Dictionary<{ updates: SuggestedFieldUpdate[]; name: string; objectId: string }>
    >((finalUpdates, sfdcObject) => {
      finalUpdates[sfdcObject['Id']] = {
        updates: buildSobjectUpdates(sfdcObject, sfdcDataModel, crmUpdates, entity),
        name: objectMap[sfdcObject['Id']]?.name,
        objectId: sfdcObject['Id'],
      };
      return finalUpdates;
    }, {}) ?? {}
  );
};

export const sobjectArrayQuery = (
  sobjectSuggestedFields: CRMFieldUpdate[],
  sobjectType: string,
  sobjectIds: string[],
) => {
  const fieldNames = sobjectSuggestedFields?.map(field => field.name) ?? [];
  return `SELECT ${['Id', ...fieldNames]?.join(
    ',',
  )} FROM ${sobjectType} WHERE Id in (${sobjectIds.map(id => `'${id}'`).join(',')})`;
};
