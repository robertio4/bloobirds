import {
  BobjectPicklistValueEntity,
  COMPANY_FIELDS_LOGIC_ROLE,
  DataModelResponse,
  LEAD_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';

interface UseStatusPicklistValueInterface {
  companyStatusPicklistValues: BobjectPicklistValueEntity[];
  companySalesStatusPicklistValues: BobjectPicklistValueEntity[];
  leadStatusPicklistValues: BobjectPicklistValueEntity[];
  leadSalesStatusPicklistValues: BobjectPicklistValueEntity[];
}
export const useStatusPicklistValue = (dataModel): UseStatusPicklistValueInterface => {
  const getStatusPicklistValues = (dataModel: DataModelResponse) => {
    const companyStatusPicklistValues = dataModel
      .findValuesByFieldLogicRole(COMPANY_FIELDS_LOGIC_ROLE.STATUS)
      ?.filter(companyStatus => companyStatus.isEnabled)
      ?.sort((a, b) => (a.value < b.value ? -1 : 1));
    const leadStatusPicklistValues = dataModel
      .findValuesByFieldLogicRole(LEAD_FIELDS_LOGIC_ROLE.STATUS)
      ?.filter(leadStatus => leadStatus.isEnabled)
      ?.sort((a, b) => (a.value < b.value ? -1 : 1));
    const companySalesStatusPicklistValues = dataModel
      .findValuesByFieldLogicRole(COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS)
      ?.filter(companyStatus => companyStatus.isEnabled)
      ?.sort((a, b) => (a.value < b.value ? -1 : 1));
    const leadSalesStatusPicklistValues = dataModel
      .findValuesByFieldLogicRole(LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS)
      ?.filter(leadStatus => leadStatus.isEnabled)
      ?.sort((a, b) => (a.value < b.value ? -1 : 1));
    return {
      companyStatusPicklistValues,
      leadStatusPicklistValues,
      companySalesStatusPicklistValues,
      leadSalesStatusPicklistValues,
    };
  };

  const picklistValues = getStatusPicklistValues(dataModel);
  return { ...picklistValues };
};
