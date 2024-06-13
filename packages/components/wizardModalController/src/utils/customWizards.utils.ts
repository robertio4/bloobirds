import {
  Bobject,
  BobjectId,
  BobjectTypes,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  SALESFORCE_LOGIC_ROLES,
} from '@bloobirds-it/types';
import { api, isContactSalesforce } from '@bloobirds-it/utils';

const relatedLeadFields = [
  'OPPORTUNITY__LEAD_USER',
  'OPPORTUNITY__LEAD_PRIMARY_CONTACT',
  'OPPORTUNITY__LEAD_INFLUENCER',
  'OPPORTUNITY__LEAD_DECISION_MAKER',
  'OPPORTUNITY__LEAD_APPROVER',
  'OPPORTUNITY__LEAD_BUYER',
  'OPPORTUNITY__LEAD_GATEKEEPER',
  'OPPORTUNITY__LEAD_OTHER',
];
const relatedCompanyFields = ['OPPORTUNITY__COMPANY'];

export const searchOppByLeadOrCompany = (
  accountId: string,
  leadId: BobjectId<BobjectTypes.Lead>['value'],
  companyId: BobjectId<BobjectTypes.Company>['value'],
  userId: string,
) => {
  const queries = [];
  if (leadId) {
    relatedLeadFields.forEach(field => {
      queries.push({
        [field]: [leadId],
      });
    });
  }
  if (!leadId && companyId) {
    relatedCompanyFields.forEach(field => {
      queries.push({
        [field]: [companyId],
      });
    });
  }
  return api.post(`/bobjects/${accountId}/Opportunity/search`, {
    query: {
      [OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: userId,
    },
    queries: queries,
    formFields: true,
    pageSize: 50,
    injectReferences: false,
    /* TODO check columns needed
    columns: [
      'OPPORTUNITY__NAME',
      'OPPORTUNITY__STATUS',
      'OPPORTUNITY__STAGE',
      SALESFORCE_LOGIC_ROLES.SALESFORCE_OPPORTUNITY_STAGE,
    ],*/
  });
};

export const getSalesforceIdField = (
  bobject,
): { crmObject: string; crmId: SALESFORCE_LOGIC_ROLES } => {
  switch (bobject?.id?.typeName) {
    case BobjectTypes.Lead:
      return isContactSalesforce(bobject)
        ? { crmId: SALESFORCE_LOGIC_ROLES.CONTACT_ID_FIELD, crmObject: 'Contact' }
        : {
            crmId: SALESFORCE_LOGIC_ROLES.LEAD_ID_FIELD,
            crmObject: 'Lead',
          };
    case BobjectTypes.Company:
      return { crmId: SALESFORCE_LOGIC_ROLES.ACCOUNT_ID_FIELD, crmObject: 'Account' };
    case BobjectTypes.Opportunity:
      return { crmId: SALESFORCE_LOGIC_ROLES.OPPORTUNITY_ID_FIELD, crmObject: 'Opportunity' };
    default:
      return { crmId: undefined, crmObject: undefined };
  }
};

export const searchReferenceLeadBobject = async (phoneNumber: string) => {
  const response = await api.post('/calls/whiteLabel/search', {
    phoneNumber,
    includeTypes: ['LEAD'],
  });
  if (response.status !== 200) {
    return;
  }
  const bobjects: Bobject[] = response.data;
  if (bobjects.length === 0) {
    return;
  }
  return bobjects[0];
};
