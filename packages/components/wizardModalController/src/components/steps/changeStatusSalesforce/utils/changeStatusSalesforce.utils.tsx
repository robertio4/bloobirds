import {
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  SALESFORCE_LOGIC_ROLES,
} from '@bloobirds-it/types';
import { getValueFromLogicRole, isContactSalesforce } from '@bloobirds-it/utils';

export const getBobjectName = referenceBobject => {
  switch (referenceBobject?.id?.typeName) {
    case BobjectTypes.Lead:
      return (
        getValueFromLogicRole(referenceBobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) ||
        referenceBobject.fullName
      );
    case BobjectTypes.Company:
      return (
        getValueFromLogicRole(referenceBobject, COMPANY_FIELDS_LOGIC_ROLE.NAME) ||
        referenceBobject.name
      );
    case BobjectTypes.Opportunity:
      return (
        getValueFromLogicRole(referenceBobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME) ||
        referenceBobject.name
      );
    default:
      return undefined;
  }
};

export const getSalesforceIdField = (
  bobject,
  isOpportunityBased,
  hasOpenOpportunity,
): { crmObject: string; crmId: SALESFORCE_LOGIC_ROLES } => {
  const isContact = isOpportunityBased ? hasOpenOpportunity : isContactSalesforce(bobject);
  switch (bobject?.id?.typeName) {
    case BobjectTypes.Lead:
      return isContact
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

export const getIconName = bobject => {
  switch (bobject?.id?.typeName) {
    case BobjectTypes.Company:
      return 'company';
    case BobjectTypes.Lead:
      return isContactSalesforce(bobject) ? 'sfdcContacts' : 'personBody';
    case BobjectTypes.Opportunity:
      return 'sfdcOpp';
  }
};
