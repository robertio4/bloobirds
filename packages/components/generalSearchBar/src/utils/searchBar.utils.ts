import {
  DataModelResponse,
  MainBobjectTypes,
  PluralBobjectTypes,
  SearchBobjectType,
  StrDict,
  TypeFilterType,
} from '@bloobirds-it/types';

export function getStage(bobject: SearchBobjectType): 'prospecting' | 'sales' {
  return bobject?.bobjectType === 'Opportunity' || bobject?.stage?.includes('SALES')
    ? 'sales'
    : 'prospecting';
}

function getHitByName(hits: StrDict, nameFieldId: any) {
  return hits && nameFieldId ? hits[nameFieldId] : undefined;
}

export function getName(dataModel: DataModelResponse, bobject: SearchBobjectType, hits: StrDict) {
  const nameField = dataModel.findFieldByLogicRole(
    `${
      bobject?.bobjectType.toUpperCase() + (bobject?.bobjectType === 'Lead' ? '__FULL' : '_')
    }_NAME`,
  );
  const hitByName = getHitByName(hits, nameField?.id);
  let name;
  switch (bobject?.bobjectType) {
    case 'Lead':
      name = bobject.fullName;
      break;
    case 'Company':
      name = bobject.companyName;
      break;
    case 'Opportunity':
      name = bobject.name;
      break;
  }
  return {
    name: nameField ? hitByName || name : `Unnamed ${bobject?.bobjectType}`,
    hitByName: nameField?.id,
  };
}

export function getSubtitle(bobject: SearchBobjectType) {
  if (bobject?.bobjectType === 'Lead') {
    return bobject.jobTitle || bobject.email || bobject.phone;
  }
  if (bobject?.bobjectType === 'Company') {
    return bobject.website;
  }
  if (bobject?.bobjectType === 'Opportunity') {
    return bobject.amount;
  }
  return '';
}

export function getStatus(
  type: MainBobjectTypes,
  stage: 'prospecting' | 'sales',
  bobject: SearchBobjectType,
  dataModel: DataModelResponse,
) {
  const salesLR = type === 'Opportunity' || stage === 'prospecting' ? '' : 'SALES_';
  const statusField = dataModel.findFieldByLogicRole(`${type.toUpperCase()}__${salesLR}STATUS`);

  if (!statusField) {
    return undefined;
  }

  const statusValues = dataModel.findValuesByFieldId(statusField.id);
  const statusId = bobject.rawBobject.contents[statusField.id];

  if (!statusId) {
    return undefined;
  }
  return statusValues.filter(status => status.id === statusId)[0];
}

export function getFieldMatch(bobject: any, dataModel: DataModelResponse, searchQuery: string) {
  const matches = Object.values(bobject.contents).filter(value => {
    if (!value) {
      return false;
    }
    return (value as string).toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (matches.length === 0) {
    return undefined;
  }

  const match = matches[0];
  const field = dataModel.all().find((field: any) => bobject.contents[field.id] === match);

  return {
    name: field?.name,
    value: match,
  };
}

export function searchBobjectTypeName(search: string): TypeFilterType | false {
  if (!search) {
    return false;
  }
  const types: TypeFilterType[] = ['All', 'Lead', 'Company', 'Opportunity'];
  const match = types.find(type => {
    if (type.toLowerCase().startsWith(search.toLowerCase())) {
      return type;
    }
    if (type !== 'All') {
      if (PluralBobjectTypes[type].toLowerCase().startsWith(search.toLowerCase())) {
        return type;
      }
    }
    return false;
  });
  return match ? match : false;
}
