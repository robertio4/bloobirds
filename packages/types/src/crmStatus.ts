export interface CrmStatusResponse {
  id: string;
  crmObjectType: string;
  crmField: string;
  crmStatusMappingList: CrmStatusMapping[];
}

export interface CrmStatusMapping {
  id: string;
  creationDatetime: string;
  updateDatetime: string;
  createdBy: string;
  updatedBy: string;
  crmStatusName: string;
  crmStatusLabel: string;
  statusCategoryId: string;
  textColor: string;
  backgroundColor: string;
  ordering: number;
  active: boolean;
}

export interface SalesforceStatus {
  id: string;
  name: string;
  logicRole: string;
  backgroundColor: string;
  textColor: string;
  salesforceObjectType: 'Lead' | 'Company' | 'Opportunity' | 'Contact';
  salesforceLabel: string;
  isEnabled: boolean;
  ordering: number;
}
