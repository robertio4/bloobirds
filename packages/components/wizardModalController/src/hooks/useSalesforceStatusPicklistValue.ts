import { useDataModel } from '@bloobirds-it/hooks';
import { SalesforceStatus, SALESFORCE_LOGIC_ROLES, DataModelResponse } from '@bloobirds-it/types';

interface UseStatusPicklistValueInterface {
  companyCrmStatusValues: SalesforceStatus[];
  leadCrmStatusValues: SalesforceStatus[];
  opportunityCrmStatusValues: SalesforceStatus[];
}
//If we need more entities, we can add them here
const handledEntities = {
  companyCrmStatusValues: SALESFORCE_LOGIC_ROLES.SALESFORCE_COMPANY_STATUS,
  leadCrmStatusValues: SALESFORCE_LOGIC_ROLES.SALESFORCE_LEAD_STATUS,
  opportunityCrmStatusValues: SALESFORCE_LOGIC_ROLES.SALESFORCE_OPPORTUNITY_STAGE,
};

function parseFields(dataModel: DataModelResponse, entityLogicRole: string) {
  const crmStatusField = dataModel.findFieldByLogicRole(entityLogicRole);
  return crmStatusField.values
    ?.filter(crmStatus => crmStatus.isEnabled)
    .sort((a, b) => (a.ordering < b.ordering ? -1 : 1));
}

function parseAccountFields(dataModel: DataModelResponse) {
  return Object.keys(handledEntities).reduce((acc, key) => {
    acc[key] = parseFields(dataModel, handledEntities[key]);
    return acc;
  }, {} as UseStatusPicklistValueInterface);
}

export const useSalesforceStatusPicklistValue = (): UseStatusPicklistValueInterface => {
  const dataModel = useDataModel();

  return { ...parseAccountFields(dataModel) };
};
