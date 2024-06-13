import {
  Bobject,
  ExtensionBobject,
  BobjectTypes,
  SALESFORCE_LOGIC_ROLES,
} from '@bloobirds-it/types';

import { api } from './api';
import { isLead, getValueFromLogicRole, getFieldByLogicRole } from './bobjects.utils';

export type Sobject = 'Account' | 'Opportunity' | 'Lead' | 'Contact';

export async function getSalesforceSobject(sobjectType: Sobject, id: string) {
  try {
    const { data } = await api.get(`/utils/service/salesforce/sobject/${sobjectType}/${id}`);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getSalesforceListDefinition(sobjectType: Sobject, id: string) {
  try {
    const { data } = await api.get(`/utils/service/salesforce/total/${sobjectType}/${id}`);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function querySalesforce(query) {
  try {
    const { data } = await api.post(`/utils/service/salesforce/query`, {
      query: query,
    });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function createBobjectInSfdc(composedBobjectId: string, createContact?: boolean) {
  try {
    const { data } = await api.post(
      `/utils/service/salesforce/sync/${composedBobjectId}${
        createContact ? '?createContact=true' : ''
      }`,
      {},
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export function getSobjectTypeFromId(
  sobjectId: string,
): 'Account' | 'Contact' | 'Lead' | 'Opportunity' | 'Other' {
  const startingSobjectId = sobjectId?.slice(0, 3);
  switch (startingSobjectId) {
    case '001':
      return 'Account';
    case '003':
      return 'Contact';
    case '00Q':
      return 'Lead';
    case '006':
      return 'Opportunity';
    default:
      return 'Other';
  }
}

export enum SALESFORCE_ID_FIELDS {
  LEAD_ID_FIELD = 'SALESFORCE_LEAD_ID',
  CONTACT_ID_FIELD = 'SALESFORCE_CONTACT_ID',
  ACCOUNT_ID_FIELD = 'SALESFORCE_ACCOUNT_ID',
  OPPORTUNITY_ID_FIELD = 'SALESFORCE_OPPORTUNITY_ID',
}

export function getSobjectIdLogicRoleFromId(sobjectId: string): SALESFORCE_ID_FIELDS {
  const startingSobjectId = sobjectId?.slice(0, 3);
  switch (startingSobjectId) {
    case '001':
      return SALESFORCE_ID_FIELDS.ACCOUNT_ID_FIELD;
    case '003':
      return SALESFORCE_ID_FIELDS.CONTACT_ID_FIELD;
    case '00Q':
      return SALESFORCE_ID_FIELDS.LEAD_ID_FIELD;
    case '006':
      return SALESFORCE_ID_FIELDS.OPPORTUNITY_ID_FIELD;
    default:
      return null;
  }
}

export function isSyncableSobject(id: string) {
  return ['001', '003', '00Q', '006'].includes(id?.slice(0, 3));
}

export const isContactSalesforce = (bobject): boolean => {
  return (
    isLead(bobject) &&
    (getValueFromLogicRole(bobject, SALESFORCE_LOGIC_ROLES.CONTACT_ID_FIELD) != null ||
      getSobjectIdLogicRoleFromId(bobject?.salesforceId) === SALESFORCE_ID_FIELDS.CONTACT_ID_FIELD)
  );
};

export const getSobjectTypeFromBobject = (bobject: Bobject | ExtensionBobject): string => {
  switch (bobject?.id?.typeName) {
    case BobjectTypes.Company:
      return 'Account';
    case BobjectTypes.Lead:
      return isContactSalesforce(bobject) ? 'Contact' : 'Lead';
    case BobjectTypes.Opportunity:
      return 'Opportunity';
    default:
      return null;
  }
};

export const getSalesforceStatusApiNameField = bobjectType => {
  switch (bobjectType) {
    case BobjectTypes.Company:
      return SALESFORCE_LOGIC_ROLES.SALESFORCE_COMPANY_STATUS;
    case BobjectTypes.Lead:
      return SALESFORCE_LOGIC_ROLES.SALESFORCE_LEAD_STATUS;
    case BobjectTypes.Opportunity:
      return SALESFORCE_LOGIC_ROLES.SALESFORCE_OPPORTUNITY_STAGE;
    default:
      return null;
  }
};

export const getCurrentSalesforceStatusField = bobject => {
  if (!bobject) {
    return null;
  }
  const bobjectType = bobject.id.typeName;
  if (!bobject.fields) {
    const isOpp = bobjectType === BobjectTypes.Opportunity;
    return { value: bobject[isOpp ? 'salesforceStage' : 'salesforceStatus'] };
  }
  const salesforceStatusLogicRole = getSalesforceStatusApiNameField(bobjectType);
  return salesforceStatusLogicRole && getFieldByLogicRole(bobject, salesforceStatusLogicRole);
};
